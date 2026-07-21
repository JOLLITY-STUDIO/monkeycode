; ===== MMC3 Bank 38 =====
; ROM: 0x04C010-0x04E00F
; CPU: $8000-$9FFF
; CDL: code=7936 data=0 unaccessed=256

  0x04C010 $8000: C-----  00       BRK  
  0x04C011 $8001: C-----  00       BRK  
  0x04C012 $8002: C-----  00       BRK  
  0x04C013 $8003: C-----  00       BRK  
  0x04C014 $8004: C-----  00       BRK  
  0x04C015 $8005: C-----  00       BRK  
  0x04C016 $8006: C-----  00       BRK  
  0x04C017 $8007: C-----  00       BRK  
  0x04C018 $8008: C-----  00       BRK  
  0x04C019 $8009: C-----  00       BRK  
  0x04C01A $800A: C-----  00       BRK  
  0x04C01B $800B: C-----  00       BRK  
  0x04C01C $800C: C-----  00       BRK  
  0x04C01D $800D: C-----  00       BRK  
  0x04C01E $800E: C-----  00       BRK  
  0x04C01F $800F: C-----  00       BRK  
  0x04C020 $8010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C021 $8011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C022 $8012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C023 $8013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C024 $8014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C025 $8015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C026 $8016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C027 $8017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C028 $8018: C-----  00       BRK  
  0x04C029 $8019: C-----  00       BRK  
  0x04C02A $801A: C-----  00       BRK  
  0x04C02B $801B: C-----  00       BRK  
  0x04C02C $801C: C-----  00       BRK  
  0x04C02D $801D: C-----  00       BRK  
  0x04C02E $801E: C-----  00       BRK  
  0x04C02F $801F: C-----  00       BRK  
  0x04C030 $8020: C-----  00       BRK  
  0x04C031 $8021: C-----  00       BRK  
  0x04C032 $8022: C-----  00       BRK  
  0x04C033 $8023: C-----  00       BRK  
  0x04C034 $8024: C-----  00       BRK  
  0x04C035 $8025: C-----  00       BRK  
  0x04C036 $8026: C-----  00       BRK  
  0x04C037 $8027: C-----  00       BRK  
  0x04C038 $8028: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C039 $8029: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C03A $802A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C03B $802B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C03C $802C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C03D $802D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C03E $802E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C03F $802F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C040 $8030: ------  .byte $FF
  0x04C041 $8031: ------  .byte $FF
  0x04C042 $8032: ------  .byte $FF
  0x04C043 $8033: ------  .byte $FF
  0x04C044 $8034: ------  .byte $FF
  0x04C045 $8035: ------  .byte $FF
  0x04C046 $8036: ------  .byte $FF
  0x04C047 $8037: ------  .byte $FF
  0x04C048 $8038: ------  .byte $FF
  0x04C049 $8039: ------  .byte $FF
  0x04C04A $803A: ------  .byte $FF
  0x04C04B $803B: ------  .byte $FF
  0x04C04C $803C: ------  .byte $FF
  0x04C04D $803D: ------  .byte $FF
  0x04C04E $803E: ------  .byte $FF
  0x04C04F $803F: ------  .byte $FF
  0x04C050 $8040: C-----  08       PHP  
  0x04C051 $8041: C-----  11 11    ORA  ($11),Y
  0x04C053 $8043: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C054 $8044: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C055 $8045: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C056 $8046: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C057 $8047: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C058 $8048: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C059 $8049: C-----  0E 0E 01 ASL  $010E
  0x04C05C $804C: C-----  01 05    ORA  ($05,X)
  0x04C05E $804E: C-----  05 05    ORA  $05
  0x04C060 $8050: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04C061 $8051: C-----  EC DC F8 CPX  $F8DC
  0x04C064 $8054: C-----  F8       SED  
  0x04C065 $8055: C-----  F9 FB FB SBC  $FBFB,Y
  0x04C068 $8058: C-----  5D D3 AB EOR  $ABD3,X
  0x04C06B $805B: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04C06C $805C: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04C06D $805D: C-----  B6 B5    LDX  $B5,Y
  0x04C06F $805F: C-----  F5 09    SBC  $09,X
  0x04C071 $8061: C-----  05 05    ORA  $05
  0x04C073 $8063: C-----  05 05    ORA  $05
  0x04C075 $8065: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C076 $8066: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C077 $8067: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C078 $8068: C-----  06 02    ASL  $02
  0x04C07A $806A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C07B $806B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C07C $806C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C07D $806D: C-----  01 01    ORA  ($01,X)
  0x04C07F $806F: C-----  01 FF    ORA  ($FF,X)
  0x04C081 $8071: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C082 $8072: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C083 $8073: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C084 $8074: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C085 $8075: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C086 $8076: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C087 $8077: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C088 $8078: C-----  F9 FC FF SBC  $FFFC,Y
  0x04C08B $807B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C08C $807C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C08D $807D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C08E $807E: C-----  FD FC 30 SBC  $30FC,X
  0x04C091 $8081: C-----  40       RTI  
  0x04C092 $8082: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C093 $8083: C-----  B0 40    BCS  $80C5
  0x04C095 $8085: C-----  86 F8    STX  $F8
  0x04C097 $8087: C-----  90 0F    BCC  $8098
  0x04C099 $8089: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C09A $808A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C09B $808B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C09C $808C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C09D $808D: C-----  79 07 0F ADC  $0F07,Y
  0x04C0A0 $8090: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C0A1 $8091: C-----  84 C4    STY  $C4
  0x04C0A3 $8093: C-----  B4 8E    LDY  $8E,X
  0x04C0A5 $8095: C-----  40       RTI  
  0x04C0A6 $8096: C-----  30 0C    BMI  $80A4
  0x04C0A8 $8098: C-----  00       BRK  
  0x04C0A9 $8099: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C0AA $809A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C0AB $809B: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04C0AC $809C: C-----  71 3F    ADC  ($3F),Y
  0x04C0AE $809E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C0AF $809F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C0B0 $80A0: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04C0B1 $80A1: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04C0B2 $80A2: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C0B3 $80A3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C0B4 $80A4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C0B5 $80A5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C0B6 $80A6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C0B7 $80A7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C0B8 $80A8: C-----  1D 1D 0A ORA  $0A1D,X
  0x04C0BB $80AB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C0BC $80AC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C0BD $80AD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C0BE $80AE: C-----  06 05    ASL  $05
  0x04C0C0 $80B0: C-----  18       CLC  
  0x04C0C1 $80B1: C-----  30 70    BMI  $8123
  0x04C0C3 $80B3: C-----  E0 E0    CPX  #$E0
  0x04C0C5 $80B5: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04C0C6 $80B6: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C0C7 $80B7: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C0C8 $80B8: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C0C9 $80B9: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C0CA $80BA: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04C0CB $80BB: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04C0CC $80BC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C0CD $80BD: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04C0CE $80BE: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x04C0CF $80BF: C-----  EA       NOP  
  0x04C0D0 $80C0: C-----  2C 50 60 BIT  $6050
  0x04C0D3 $80C3: C-----  40       RTI  
  0x04C0D4 $80C4: C-----  00       BRK  
  0x04C0D5 $80C5: C-----  00       BRK  
  0x04C0D6 $80C6: C-----  00       BRK  
  0x04C0D7 $80C7: C-----  00       BRK  
  0x04C0D8 $80C8: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04C0D9 $80C9: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C0DA $80CA: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C0DB $80CB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C0DC $80CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C0DD $80CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C0DE $80CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C0DF $80CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C0E0 $80D0: C-----  00       BRK  
  0x04C0E1 $80D1: C-----  00       BRK  
  0x04C0E2 $80D2: C-----  20 60 C0 JSR  $C060
  0x04C0E5 $80D5: C-----  40       RTI  
  0x04C0E6 $80D6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C0E7 $80D7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C0E8 $80D8: C-----  00       BRK  
  0x04C0E9 $80D9: C-----  00       BRK  
  0x04C0EA $80DA: C-----  00       BRK  
  0x04C0EB $80DB: C-----  00       BRK  
  0x04C0EC $80DC: C-----  00       BRK  
  0x04C0ED $80DD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C0EE $80DE: C-----  00       BRK  
  0x04C0EF $80DF: C-----  00       BRK  
  0x04C0F0 $80E0: C-----  00       BRK  
  0x04C0F1 $80E1: C-----  00       BRK  
  0x04C0F2 $80E2: C-----  00       BRK  
  0x04C0F3 $80E3: C-----  00       BRK  
  0x04C0F4 $80E4: C-----  C0 80    CPY  #$80
  0x04C0F6 $80E6: C-----  08       PHP  
  0x04C0F7 $80E7: C-----  18       CLC  
  0x04C0F8 $80E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C0F9 $80E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C0FA $80EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C0FB $80EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C0FC $80EC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C0FD $80ED: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C0FE $80EE: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C0FF $80EF: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C100 $80F0: C-----  00       BRK  
  0x04C101 $80F1: C-----  10 30    BPL  $8123
  0x04C103 $80F3: C-----  60       RTS  
  0x04C104 $80F4: C-----  A0 40    LDY  #$40
  0x04C106 $80F6: C-----  40       RTI  
  0x04C107 $80F7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C108 $80F8: C-----  00       BRK  
  0x04C109 $80F9: C-----  00       BRK  
  0x04C10A $80FA: C-----  00       BRK  
  0x04C10B $80FB: C-----  00       BRK  
  0x04C10C $80FC: C-----  40       RTI  
  0x04C10D $80FD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C10E $80FE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C10F $80FF: C-----  00       BRK  
  0x04C110 $8100: C-----  00       BRK  
  0x04C111 $8101: C-----  00       BRK  
  0x04C112 $8102: C-----  00       BRK  
  0x04C113 $8103: C-----  20 C0 C8 JSR  $C8C0
  0x04C116 $8106: C-----  90 B0    BCC  $80B8
  0x04C118 $8108: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C119 $8109: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C11A $810A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C11B $810B: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C11C $810C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C11D $810D: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04C11E $810E: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04C11F $810F: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04C120 $8110: C-----  00       BRK  
  0x04C121 $8111: C-----  00       BRK  
  0x04C122 $8112: C-----  00       BRK  
  0x04C123 $8113: C-----  00       BRK  
  0x04C124 $8114: C-----  00       BRK  
  0x04C125 $8115: C-----  00       BRK  
  0x04C126 $8116: C-----  00       BRK  
  0x04C127 $8117: C-----  70 FF    BVS  $8118
  0x04C129 $8119: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C12A $811A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C12B $811B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C12C $811C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C12D $811D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C12E $811E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C12F $811F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C130 $8120: C-----  F0 F9    BEQ  $811B
  0x04C132 $8122: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C133 $8123: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C134 $8124: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C135 $8125: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C136 $8126: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C137 $8127: C-----  01 20    ORA  ($20,X)
  0x04C139 $8129: C-----  90 F8    BCC  $8123
  0x04C13B $812B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C13C $812C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C13D $812D: C-----  F8       SED  
  0x04C13E $812E: C-----  FE FF E3 INC  $E3FF,X
  0x04C141 $8131: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C142 $8132: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C143 $8133: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C144 $8134: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C145 $8135: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C146 $8136: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C147 $8137: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04C148 $8138: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04C149 $8139: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x04C14A $813A: C-----  CE DD C0 DEC  $C0DD
  0x04C14D $813D: C-----  00       BRK  
  0x04C14E $813E: C-----  01 00    ORA  ($00,X)
  0x04C150 $8140: C-----  D0 69    BNE  $81AB
  0x04C152 $8142: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C153 $8143: C-----  00       BRK  
  0x04C154 $8144: C-----  08       PHP  
  0x04C155 $8145: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C156 $8146: C-----  01 00    ORA  ($00,X)
  0x04C158 $8148: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C159 $8149: C-----  06 00    ASL  $00
  0x04C15B $814B: C-----  00       BRK  
  0x04C15C $814C: C-----  00       BRK  
  0x04C15D $814D: C-----  00       BRK  
  0x04C15E $814E: C-----  00       BRK  
  0x04C15F $814F: C-----  00       BRK  
  0x04C160 $8150: C-----  01 01    ORA  ($01,X)
  0x04C162 $8152: C-----  01 02    ORA  ($02,X)
  0x04C164 $8154: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C165 $8155: C-----  01 01    ORA  ($01,X)
  0x04C167 $8157: C-----  01 FE    ORA  ($FE,X)
  0x04C169 $8159: C-----  FE FE FC INC  $FCFE,X
  0x04C16C $815C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C16D $815D: C-----  FE FE FE INC  $FEFE,X
  0x04C170 $8160: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04C171 $8161: C-----  F8       SED  
  0x04C172 $8162: C-----  F0 F0    BEQ  $8154
  0x04C174 $8164: C-----  F0 F0    BEQ  $8156
  0x04C176 $8166: C-----  F9 FF E3 SBC  $E3FF,Y
  0x04C179 $8169: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C17A $816A: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04C17B $816B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C17C $816C: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04C17D $816D: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04C17E $816E: C-----  96 F1    STX  $F1,Y
  0x04C180 $8170: C-----  01 01    ORA  ($01,X)
  0x04C182 $8172: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C183 $8173: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C184 $8174: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C185 $8175: C-----  28       PLP  
  0x04C186 $8176: C-----  C8       INY  
  0x04C187 $8177: C-----  C8       INY  
  0x04C188 $8178: C-----  FE FE FC INC  $FCFE,X
  0x04C18B $817B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C18C $817C: C-----  F8       SED  
  0x04C18D $817D: C-----  D0 30    BNE  $81AF
  0x04C18F $817F: C-----  B0 30    BCS  $81B1
  0x04C191 $8181: C-----  E0 41    CPX  #$41
  0x04C193 $8183: C-----  86 18    STX  $18
  0x04C195 $8185: C-----  FE 8D A6 INC  $A68D,X
  0x04C198 $8188: C-----  00       BRK  
  0x04C199 $8189: C-----  00       BRK  
  0x04C19A $818A: C-----  00       BRK  
  0x04C19B $818B: C-----  00       BRK  
  0x04C19C $818C: C-----  00       BRK  
  0x04C19D $818D: C-----  00       BRK  
  0x04C19E $818E: C-----  10 10    BPL  $81A0
  0x04C1A0 $8190: C-----  58       CLI  
  0x04C1A1 $8191: C-----  E0 00    CPX  #$00
  0x04C1A3 $8193: C-----  00       BRK  
  0x04C1A4 $8194: C-----  00       BRK  
  0x04C1A5 $8195: C-----  00       BRK  
  0x04C1A6 $8196: C-----  00       BRK  
  0x04C1A7 $8197: C-----  00       BRK  
  0x04C1A8 $8198: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04C1A9 $8199: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C1AA $819A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C1AB $819B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C1AC $819C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C1AD $819D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C1AE $819E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C1AF $819F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C1B0 $81A0: C-----  40       RTI  
  0x04C1B1 $81A1: C-----  00       BRK  
  0x04C1B2 $81A2: C-----  00       BRK  
  0x04C1B3 $81A3: C-----  01 02    ORA  ($02,X)
  0x04C1B5 $81A5: C-----  00       BRK  
  0x04C1B6 $81A6: C-----  00       BRK  
  0x04C1B7 $81A7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C1B8 $81A8: C-----  90 60    BCC  $820A
  0x04C1BA $81AA: C-----  00       BRK  
  0x04C1BB $81AB: C-----  00       BRK  
  0x04C1BC $81AC: C-----  00       BRK  
  0x04C1BD $81AD: C-----  00       BRK  
  0x04C1BE $81AE: C-----  00       BRK  
  0x04C1BF $81AF: C-----  00       BRK  
  0x04C1C0 $81B0: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04C1C1 $81B1: C-----  84 F8    STY  $F8
  0x04C1C3 $81B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C1C4 $81B4: C-----  00       BRK  
  0x04C1C5 $81B5: C-----  38       SEC  
  0x04C1C6 $81B6: C-----  7E FF 3C ROR  $3CFF,X
  0x04C1C9 $81B9: C-----  78       SEI  
  0x04C1CA $81BA: C-----  00       BRK  
  0x04C1CB $81BB: C-----  00       BRK  
  0x04C1CC $81BC: C-----  00       BRK  
  0x04C1CD $81BD: C-----  00       BRK  
  0x04C1CE $81BE: C-----  38       SEC  
  0x04C1CF $81BF: C-----  7E 01 01 ROR  $0101,X
  0x04C1D2 $81C2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C1D3 $81C3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C1D4 $81C4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C1D5 $81C5: C-----  05 0A    ORA  $0A
  0x04C1D7 $81C7: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04C1D8 $81C8: C-----  FE FE FC INC  $FCFE,X
  0x04C1DB $81CB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C1DC $81CC: C-----  F8       SED  
  0x04C1DD $81CD: C-----  F8       SED  
  0x04C1DE $81CE: C-----  F1 E3    SBC  ($E3),Y
  0x04C1E0 $81D0: C-----  01 08    ORA  ($08,X)
  0x04C1E2 $81D2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C1E3 $81D3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C1E4 $81D4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C1E5 $81D5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04C1E6 $81D6: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C1E7 $81D7: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04C1E8 $81D8: C-----  FE F7 F4 INC  $F4F7,X
  0x04C1EB $81DB: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C1EC $81DC: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04C1ED $81DD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C1EE $81DE: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04C1EF $81DF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04C1F0 $81E0: C-----  39 61 82 AND  $8261,Y
  0x04C1F3 $81E3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C1F4 $81E4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C1F5 $81E5: C-----  09 16    ORA  #$16
  0x04C1F7 $81E7: C-----  38       SEC  
  0x04C1F8 $81E8: C-----  C6 9E    DEC  $9E
  0x04C1FA $81EA: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04C1FB $81EB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C1FC $81EC: C-----  F8       SED  
  0x04C1FD $81ED: C-----  F0 E1    BEQ  $81D0
  0x04C1FF $81EF: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04C200 $81F0: C-----  F0 F8    BEQ  $81EA
  0x04C202 $81F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C203 $81F3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C204 $81F4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C205 $81F5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C206 $81F6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C207 $81F7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C208 $81F8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C209 $81F9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C20A $81FA: C-----  00       BRK  
  0x04C20B $81FB: C-----  00       BRK  
  0x04C20C $81FC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C20D $81FD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C20E $81FE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C20F $81FF: C-----  00       BRK  
  0x04C210 $8200: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C211 $8201: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C212 $8202: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C213 $8203: C-----  06 06    ASL  $06
  0x04C215 $8205: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C216 $8206: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C217 $8207: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C218 $8208: C-----  05 01    ORA  $01
  0x04C21A $820A: C-----  01 03    ORA  ($03,X)
  0x04C21C $820C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C21D $820D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C21E $820E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C21F $820F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C220 $8210: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C221 $8211: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C222 $8212: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C223 $8213: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C224 $8214: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C225 $8215: C-----  1D 19 0C ORA  $0C19,X
  0x04C228 $8218: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04C229 $8219: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04C22A $821A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C22B $821B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C22C $821C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C22D $821D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C22E $821E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C22F $821F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04C230 $8220: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C231 $8221: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C232 $8222: C-----  01 01    ORA  ($01,X)
  0x04C234 $8224: C-----  00       BRK  
  0x04C235 $8225: C-----  00       BRK  
  0x04C236 $8226: C-----  00       BRK  
  0x04C237 $8227: C-----  00       BRK  
  0x04C238 $8228: C-----  01 01    ORA  ($01,X)
  0x04C23A $822A: C-----  00       BRK  
  0x04C23B $822B: C-----  00       BRK  
  0x04C23C $822C: C-----  00       BRK  
  0x04C23D $822D: C-----  00       BRK  
  0x04C23E $822E: C-----  00       BRK  
  0x04C23F $822F: C-----  00       BRK  
  0x04C240 $8230: C-----  06 02    ASL  $02
  0x04C242 $8232: C-----  08       PHP  
  0x04C243 $8233: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C244 $8234: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C245 $8235: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C246 $8236: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C247 $8237: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04C248 $8238: C-----  F9 FD F7 SBC  $F7FD,Y
  0x04C24B $823B: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04C24C $823C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04C24D $823D: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04C24E $823E: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04C24F $823F: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04C250 $8240: C-----  70 61    BVS  $82A3
  0x04C252 $8242: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C253 $8243: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C254 $8244: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C255 $8245: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C256 $8246: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C257 $8247: C-----  FE 00 00 INC  $0000,X
  0x04C25A $824A: C-----  41 C7    EOR  ($C7,X)
  0x04C25C $824C: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04C25D $824D: C-----  EE F0 FE INC  $FEF0
  0x04C260 $8250: C-----  30 E0    BMI  $8232
  0x04C262 $8252: C-----  C1 87    CMP  ($87,X)
  0x04C264 $8254: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C265 $8255: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C266 $8256: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C267 $8257: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04C268 $8258: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C269 $8259: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C26A $825A: C-----  BE 79 E7 LDX  $E779,Y
  0x04C26D $825D: C-----  01 02    ORA  ($02,X)
  0x04C26F $825F: C-----  01 01    ORA  ($01,X)
  0x04C271 $8261: C-----  00       BRK  
  0x04C272 $8262: C-----  00       BRK  
  0x04C273 $8263: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C274 $8264: C-----  C0 E0    CPY  #$E0
  0x04C276 $8266: C-----  E0 C0    CPX  #$C0
  0x04C278 $8268: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C279 $8269: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C27A $826A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C27B $826B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C27C $826C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C27D $826D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C27E $826E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C27F $826F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C280 $8270: C-----  68       PLA  
  0x04C281 $8271: C-----  98       TYA  
  0x04C282 $8272: C-----  F0 01    BEQ  $8275
  0x04C284 $8274: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C285 $8275: C-----  00       BRK  
  0x04C286 $8276: C-----  00       BRK  
  0x04C287 $8277: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C288 $8278: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04C289 $8279: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C28A $827A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C28B $827B: C-----  FE FD FF INC  $FFFD,X
  0x04C28E $827E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C28F $827F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C290 $8280: C-----  00       BRK  
  0x04C291 $8281: C-----  00       BRK  
  0x04C292 $8282: C-----  00       BRK  
  0x04C293 $8283: C-----  00       BRK  
  0x04C294 $8284: C-----  00       BRK  
  0x04C295 $8285: C-----  C0 30    CPY  #$30
  0x04C297 $8287: C-----  08       PHP  
  0x04C298 $8288: C-----  00       BRK  
  0x04C299 $8289: C-----  00       BRK  
  0x04C29A $828A: C-----  00       BRK  
  0x04C29B $828B: C-----  00       BRK  
  0x04C29C $828C: C-----  00       BRK  
  0x04C29D $828D: C-----  00       BRK  
  0x04C29E $828E: C-----  C0 F0    CPY  #$F0
  0x04C2A0 $8290: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04C2A1 $8291: C-----  E0 F0    CPX  #$F0
  0x04C2A3 $8293: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C2A4 $8294: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C2A5 $8295: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C2A6 $8296: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C2A7 $8297: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C2A8 $8298: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04C2A9 $8299: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C2AA $829A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C2AB $829B: C-----  00       BRK  
  0x04C2AC $829C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C2AD $829D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C2AE $829E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C2AF $829F: C-----  00       BRK  
  0x04C2B0 $82A0: C-----  08       PHP  
  0x04C2B1 $82A1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C2B2 $82A2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C2B3 $82A3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C2B4 $82A4: C-----  01 01    ORA  ($01,X)
  0x04C2B6 $82A6: C-----  01 01    ORA  ($01,X)
  0x04C2B8 $82A8: C-----  F0 F8    BEQ  $82A2
  0x04C2BA $82AA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C2BB $82AB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C2BC $82AC: C-----  FE FE FE INC  $FEFE,X
  0x04C2BF $82AF: C-----  FE 18 04 INC  $0418,X
  0x04C2C2 $82B2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C2C3 $82B3: C-----  01 01    ORA  ($01,X)
  0x04C2C5 $82B5: C-----  00       BRK  
  0x04C2C6 $82B6: C-----  00       BRK  
  0x04C2C7 $82B7: C-----  00       BRK  
  0x04C2C8 $82B8: C-----  E0 F8    CPX  #$F8
  0x04C2CA $82BA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C2CB $82BB: C-----  FE FE FF INC  $FFFE,X
  0x04C2CE $82BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2CF $82BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2D0 $82C0: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04C2D1 $82C1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C2D2 $82C2: C-----  FE FC F8 INC  $F8FC,X
  0x04C2D5 $82C5: C-----  F0 F0    BEQ  $82B7
  0x04C2D7 $82C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2D8 $82C8: C-----  79 E7 1F ADC  $1FE7,Y
  0x04C2DB $82CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2DC $82CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2DD $82CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2DE $82CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2DF $82CF: C-----  00       BRK  
  0x04C2E0 $82D0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C2E1 $82D1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C2E2 $82D2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C2E3 $82D3: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C2E4 $82D4: C-----  0E 1C F0 ASL  $F01C
  0x04C2E7 $82D7: C-----  C0 FE    CPY  #$FE
  0x04C2E9 $82D9: C-----  FE FC FC INC  $FCFC,X
  0x04C2EC $82DC: C-----  F8       SED  
  0x04C2ED $82DD: C-----  E0 00    CPX  #$00
  0x04C2EF $82DF: C-----  00       BRK  
  0x04C2F0 $82E0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C2F1 $82E1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04C2F2 $82E2: C-----  78       SEI  
  0x04C2F3 $82E3: C-----  00       BRK  
  0x04C2F4 $82E4: C-----  00       BRK  
  0x04C2F5 $82E5: C-----  00       BRK  
  0x04C2F6 $82E6: C-----  00       BRK  
  0x04C2F7 $82E7: C-----  00       BRK  
  0x04C2F8 $82E8: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04C2F9 $82E9: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C2FA $82EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2FB $82EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2FC $82EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2FD $82ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2FE $82EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C2FF $82EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C300 $82F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C301 $82F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C302 $82F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C303 $82F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C304 $82F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C305 $82F5: C-----  FE FC F0 INC  $F0FC,X
  0x04C308 $82F8: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04C309 $82F9: C-----  E4 CA    CPX  $CA
  0x04C30B $82FB: C-----  D5 A2    CMP  $A2,X
  0x04C30D $82FD: C-----  FD F3 CF SBC  $CFF3,X
  0x04C310 $8300: C-----  00       BRK  
  0x04C311 $8301: C-----  40       RTI  
  0x04C312 $8302: C-----  C0 88    CPY  #$88
  0x04C314 $8304: C-----  B0 F7    BCS  $82FD
  0x04C316 $8306: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C317 $8307: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C318 $8308: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C319 $8309: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C31A $830A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C31B $830B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04C31C $830C: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04C31D $830D: C-----  28       PLP  
  0x04C31E $830E: C-----  D6 CA    DEC  $CA,X
  0x04C320 $8310: C-----  00       BRK  
  0x04C321 $8311: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C322 $8312: C-----  00       BRK  
  0x04C323 $8313: C-----  00       BRK  
  0x04C324 $8314: C-----  00       BRK  
  0x04C325 $8315: C-----  00       BRK  
  0x04C326 $8316: C-----  00       BRK  
  0x04C327 $8317: C-----  00       BRK  
  0x04C328 $8318: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C329 $8319: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C32A $831A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C32B $831B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C32C $831C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C32D $831D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C32E $831E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C32F $831F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C330 $8320: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C331 $8321: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C332 $8322: C-----  FE FE FC INC  $FCFE,X
  0x04C335 $8325: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04C336 $8326: C-----  E1 5E    SBC  ($5E,X)
  0x04C338 $8328: C-----  AA       TAX  
  0x04C339 $8329: C-----  96 25    STX  $25,Y
  0x04C33B $832B: C-----  4D B3 CC EOR  $CCB3
  0x04C33E $832E: C-----  1E 80 03 ASL  $0380,X
  0x04C341 $8331: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C342 $8332: C-----  08       PHP  
  0x04C343 $8333: C-----  00       BRK  
  0x04C344 $8334: C-----  01 02    ORA  ($02,X)
  0x04C346 $8336: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C347 $8337: C-----  00       BRK  
  0x04C348 $8338: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C349 $8339: C-----  F8       SED  
  0x04C34A $833A: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C34B $833B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C34C $833C: C-----  FE FC F0 INC  $F0FC,X
  0x04C34F $833F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C350 $8340: C-----  E1 81    SBC  ($81,X)
  0x04C352 $8342: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C353 $8343: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C354 $8344: C-----  08       PHP  
  0x04C355 $8345: C-----  10 21    BPL  $8368
  0x04C357 $8347: C-----  C6 1E    DEC  $1E
  0x04C359 $8349: C-----  7E FC F8 ROR  $F8FC,X
  0x04C35C $834C: C-----  F0 E0    BEQ  $832E
  0x04C35E $834E: C-----  C0 00    CPY  #$00
  0x04C360 $8350: C-----  00       BRK  
  0x04C361 $8351: C-----  00       BRK  
  0x04C362 $8352: C-----  C0 E0    CPY  #$E0
  0x04C364 $8354: C-----  F0 F0    BEQ  $8346
  0x04C366 $8356: C-----  E0 C0    CPX  #$C0
  0x04C368 $8358: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C369 $8359: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C36A $835A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C36B $835B: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C36C $835C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C36D $835D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C36E $835E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C36F $835F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C370 $8360: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04C371 $8361: C-----  C8       INY  
  0x04C372 $8362: C-----  10 60    BPL  $83C4
  0x04C374 $8364: C-----  90 60    BCC  $83C6
  0x04C376 $8366: C-----  C0 80    CPY  #$80
  0x04C378 $8368: C-----  00       BRK  
  0x04C379 $8369: C-----  30 E0    BMI  $834B
  0x04C37B $836B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C37C $836C: C-----  00       BRK  
  0x04C37D $836D: C-----  00       BRK  
  0x04C37E $836E: C-----  00       BRK  
  0x04C37F $836F: C-----  00       BRK  
  0x04C380 $8370: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C381 $8371: C-----  3E FC E0 ROL  $E0FC,X
  0x04C384 $8374: C-----  C0 80    CPY  #$80
  0x04C386 $8376: C-----  00       BRK  
  0x04C387 $8377: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C388 $8378: C-----  F9 C7 3F SBC  $3FC7,Y
  0x04C38B $837B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C38C $837C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C38D $837D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C38E $837E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C38F $837F: C-----  00       BRK  
  0x04C390 $8380: C-----  E0 B0    CPX  #$B0
  0x04C392 $8382: C-----  00       BRK  
  0x04C393 $8383: C-----  00       BRK  
  0x04C394 $8384: C-----  00       BRK  
  0x04C395 $8385: C-----  38       SEC  
  0x04C396 $8386: C-----  46 81    LSR  $81
  0x04C398 $8388: C-----  00       BRK  
  0x04C399 $8389: C-----  00       BRK  
  0x04C39A $838A: C-----  00       BRK  
  0x04C39B $838B: C-----  00       BRK  
  0x04C39C $838C: C-----  00       BRK  
  0x04C39D $838D: C-----  00       BRK  
  0x04C39E $838E: C-----  38       SEC  
  0x04C39F $838F: C-----  7E 01 06 ROR  $0601,X
  0x04C3A2 $8392: C-----  38       SEC  
  0x04C3A3 $8393: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04C3A4 $8394: C-----  18       CLC  
  0x04C3A5 $8395: C-----  E0 00    CPX  #$00
  0x04C3A7 $8397: C-----  00       BRK  
  0x04C3A8 $8398: C-----  FE F8 C0 INC  $C0F8,X
  0x04C3AB $839B: C-----  98       TYA  
  0x04C3AC $839C: C-----  E0 00    CPX  #$00
  0x04C3AE $839E: C-----  00       BRK  
  0x04C3AF $839F: C-----  00       BRK  
  0x04C3B0 $83A0: C-----  C8       INY  
  0x04C3B1 $83A1: C-----  C8       INY  
  0x04C3B2 $83A2: C-----  D0 90    BNE  $8334
  0x04C3B4 $83A4: C-----  20 20 40 JSR  $4020
  0x04C3B7 $83A7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C3B8 $83A8: C-----  B0 B0    BCS  $835A
  0x04C3BA $83AA: C-----  A0 60    LDY  #$60
  0x04C3BC $83AC: C-----  C0 C0    CPY  #$C0
  0x04C3BE $83AE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C3BF $83AF: C-----  00       BRK  
  0x04C3C0 $83B0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C3C1 $83B1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C3C2 $83B2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C3C3 $83B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C3C4 $83B4: C-----  0E 1C F0 ASL  $F01C
  0x04C3C7 $83B7: C-----  C0 FE    CPY  #$FE
  0x04C3C9 $83B9: C-----  FE FE FC INC  $FCFE,X
  0x04C3CC $83BC: C-----  F8       SED  
  0x04C3CD $83BD: C-----  E0 00    CPX  #$00
  0x04C3CF $83BF: C-----  00       BRK  
  0x04C3D0 $83C0: C-----  00       BRK  
  0x04C3D1 $83C1: C-----  00       BRK  
  0x04C3D2 $83C2: C-----  00       BRK  
  0x04C3D3 $83C3: C-----  00       BRK  
  0x04C3D4 $83C4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C3D5 $83C5: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04C3D6 $83C6: C-----  08       PHP  
  0x04C3D7 $83C7: C-----  10 00    BPL  $83C9
  0x04C3D9 $83C9: C-----  00       BRK  
  0x04C3DA $83CA: C-----  00       BRK  
  0x04C3DB $83CB: C-----  00       BRK  
  0x04C3DC $83CC: C-----  00       BRK  
  0x04C3DD $83CD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C3DE $83CE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C3DF $83CF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C3E0 $83D0: C-----  8C F0 40 STY  $40F0
  0x04C3E3 $83D3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C3E4 $83D4: C-----  00       BRK  
  0x04C3E5 $83D5: C-----  00       BRK  
  0x04C3E6 $83D6: C-----  00       BRK  
  0x04C3E7 $83D7: C-----  00       BRK  
  0x04C3E8 $83D8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C3E9 $83D9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C3EA $83DA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C3EB $83DB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C3EC $83DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C3ED $83DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C3EE $83DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C3EF $83DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C3F0 $83E0: C-----  10 08    BPL  $83EA
  0x04C3F2 $83E2: C-----  18       CLC  
  0x04C3F3 $83E3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C3F4 $83E4: C-----  18       CLC  
  0x04C3F5 $83E5: C-----  20 38 24 JSR  $2438
  0x04C3F8 $83E8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C3F9 $83E9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C3FA $83EA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C3FB $83EB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C3FC $83EC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C3FD $83ED: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C3FE $83EE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C3FF $83EF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C400 $83F0: C-----  00       BRK  
  0x04C401 $83F1: C-----  00       BRK  
  0x04C402 $83F2: C-----  00       BRK  
  0x04C403 $83F3: C-----  00       BRK  
  0x04C404 $83F4: C-----  00       BRK  
  0x04C405 $83F5: C-----  00       BRK  
  0x04C406 $83F6: C-----  60       RTS  
  0x04C407 $83F7: C-----  40       RTI  
  0x04C408 $83F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C409 $83F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C40A $83FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C40B $83FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C40C $83FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C40D $83FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C40E $83FE: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C40F $83FF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C410 $8400: C-----  08       PHP  
  0x04C411 $8401: C-----  08       PHP  
  0x04C412 $8402: C-----  08       PHP  
  0x04C413 $8403: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04C414 $8404: C-----  06 05    ASL  $05
  0x04C416 $8406: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C417 $8407: C-----  01 00    ORA  ($00,X)
  0x04C419 $8409: C-----  00       BRK  
  0x04C41A $840A: C-----  00       BRK  
  0x04C41B $840B: C-----  00       BRK  
  0x04C41C $840C: C-----  00       BRK  
  0x04C41D $840D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C41E $840E: C-----  01 00    ORA  ($00,X)
  0x04C420 $8410: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04C421 $8411: C-----  A8       TAY  
  0x04C422 $8412: C-----  98       TYA  
  0x04C423 $8413: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C424 $8414: C-----  40       RTI  
  0x04C425 $8415: C-----  C0 00    CPY  #$00
  0x04C427 $8417: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C428 $8418: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C429 $8419: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04C42A $841A: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04C42B $841B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C42C $841C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C42D $841D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C42E $841E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C42F $841F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C430 $8420: C-----  00       BRK  
  0x04C431 $8421: C-----  01 06    ORA  ($06,X)
  0x04C433 $8423: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C434 $8424: C-----  18       CLC  
  0x04C435 $8425: C-----  20 01 02 JSR  $0201
  0x04C438 $8428: C-----  00       BRK  
  0x04C439 $8429: C-----  00       BRK  
  0x04C43A $842A: C-----  01 00    ORA  ($00,X)
  0x04C43C $842C: C-----  00       BRK  
  0x04C43D $842D: C-----  00       BRK  
  0x04C43E $842E: C-----  00       BRK  
  0x04C43F $842F: C-----  01 60    ORA  ($60,X)
  0x04C441 $8431: C-----  C0 00    CPY  #$00
  0x04C443 $8433: C-----  C0 30    CPY  #$30
  0x04C445 $8435: C-----  C0 00    CPY  #$00
  0x04C447 $8437: C-----  F0 1F    BEQ  $8458
  0x04C449 $8439: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C44A $843A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C44B $843B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C44C $843C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C44D $843D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C44E $843E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C44F $843F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C450 $8440: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C451 $8441: C-----  08       PHP  
  0x04C452 $8442: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C453 $8443: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C454 $8444: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C455 $8445: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C456 $8446: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C457 $8447: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04C458 $8448: C-----  FD F7 F4 SBC  $F4F7,X
  0x04C45B $844B: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C45C $844C: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04C45D $844D: C-----  75 37    ADC  $37,X
  0x04C45F $844F: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04C460 $8450: C-----  00       BRK  
  0x04C461 $8451: C-----  E0 F0    CPX  #$F0
  0x04C463 $8453: C-----  F8       SED  
  0x04C464 $8454: C-----  F8       SED  
  0x04C465 $8455: C-----  F8       SED  
  0x04C466 $8456: C-----  F0 E0    BEQ  $8438
  0x04C468 $8458: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C469 $8459: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C46A $845A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C46B $845B: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C46C $845C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C46D $845D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C46E $845E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C46F $845F: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C470 $8460: C-----  E0 E0    CPX  #$E0
  0x04C472 $8462: C-----  F0 7F    BEQ  $84E3
  0x04C474 $8464: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C475 $8465: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C476 $8466: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C477 $8467: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C478 $8468: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C479 $8469: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C47A $846A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C47B $846B: C-----  00       BRK  
  0x04C47C $846C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C47D $846D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C47E $846E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C47F $846F: C-----  00       BRK  
  0x04C480 $8470: C-----  C1 0F    CMP  ($0F,X)
  0x04C482 $8472: C-----  7E F8 E0 ROR  $E0F8,X
  0x04C485 $8475: C-----  C0 00    CPY  #$00
  0x04C487 $8477: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C488 $8478: C-----  3E F1 8F ROL  $8FF1,X
  0x04C48B $847B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C48C $847C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C48D $847D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C48E $847E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C48F $847F: C-----  00       BRK  
  0x04C490 $8480: C-----  05 06    ORA  $06
  0x04C492 $8482: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C493 $8483: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C494 $8484: C-----  00       BRK  
  0x04C495 $8485: C-----  00       BRK  
  0x04C496 $8486: C-----  00       BRK  
  0x04C497 $8487: C-----  00       BRK  
  0x04C498 $8488: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C499 $8489: C-----  00       BRK  
  0x04C49A $848A: C-----  00       BRK  
  0x04C49B $848B: C-----  00       BRK  
  0x04C49C $848C: C-----  00       BRK  
  0x04C49D $848D: C-----  00       BRK  
  0x04C49E $848E: C-----  00       BRK  
  0x04C49F $848F: C-----  00       BRK  
  0x04C4A0 $8490: C-----  20 42 44 JSR  $4442
  0x04C4A3 $8493: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04C4A4 $8494: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04C4A5 $8495: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04C4A6 $8496: C-----  19 07 1F ORA  $1F07,Y
  0x04C4A9 $8499: C-----  3D 3B 3B AND  $3B3B,X
  0x04C4AC $849C: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04C4AD $849D: C-----  1D 06 00 ORA  $0006,X
  0x04C4B0 $84A0: C-----  F8       SED  
  0x04C4B1 $84A1: C-----  71 01    ADC  ($01),Y
  0x04C4B3 $84A3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4B4 $84A4: C-----  00       BRK  
  0x04C4B5 $84A5: C-----  00       BRK  
  0x04C4B6 $84A6: C-----  01 03    ORA  ($03,X)
  0x04C4B8 $84A8: C-----  F8       SED  
  0x04C4B9 $84A9: C-----  70 00    BVS  $84AB
  0x04C4BB $84AB: C-----  00       BRK  
  0x04C4BC $84AC: C-----  00       BRK  
  0x04C4BD $84AD: C-----  00       BRK  
  0x04C4BE $84AE: C-----  00       BRK  
  0x04C4BF $84AF: C-----  00       BRK  
  0x04C4C0 $84B0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C4C1 $84B1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C4C2 $84B2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C4C3 $84B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C4C4 $84B4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4C5 $84B5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4C6 $84B6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4C7 $84B7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4C8 $84B8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4C9 $84B9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4CA $84BA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4CB $84BB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C4CC $84BC: C-----  01 01    ORA  ($01,X)
  0x04C4CE $84BE: C-----  01 01    ORA  ($01,X)
  0x04C4D0 $84C0: C-----  00       BRK  
  0x04C4D1 $84C1: C-----  20 40 40 JSR  $4040
  0x04C4D4 $84C4: C-----  C0 E0    CPY  #$E0
  0x04C4D6 $84C6: C-----  E0 E1    CPX  #$E1
  0x04C4D8 $84C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C4D9 $84C9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C4DA $84CA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C4DB $84CB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C4DC $84CC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C4DD $84CD: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04C4DE $84CE: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04C4DF $84CF: C-----  DE 00 00 DEC  $0000,X
  0x04C4E2 $84D2: C-----  00       BRK  
  0x04C4E3 $84D3: C-----  00       BRK  
  0x04C4E4 $84D4: C-----  00       BRK  
  0x04C4E5 $84D5: C-----  30 C1    BMI  $8498
  0x04C4E7 $84D7: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04C4E8 $84D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C4E9 $84D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C4EA $84DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C4EB $84DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C4EC $84DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C4ED $84DD: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C4EE $84DE: C-----  3E BD F1 ROL  $F1BD,X
  0x04C4F1 $84E1: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04C4F2 $84E2: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04C4F3 $84E3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C4F4 $84E4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C4F5 $84E5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C4F6 $84E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C4F7 $84E7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C4F8 $84E8: C-----  E0 E1    CPX  #$E1
  0x04C4FA $84EA: C-----  F1 F8    SBC  ($F8),Y
  0x04C4FC $84EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C4FD $84ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C4FE $84EE: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04C4FF $84EF: C-----  F9 86 BE SBC  $BE86,Y
  0x04C502 $84F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C503 $84F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C504 $84F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C505 $84F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C506 $84F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C507 $84F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C508 $84F8: C-----  79 45 38 ADC  $3845,Y
  0x04C50B $84FB: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04C50C $84FC: C-----  F8       SED  
  0x04C50D $84FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C50E $84FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C50F $84FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C510 $8500: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C511 $8501: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C512 $8502: C-----  01 03    ORA  ($03,X)
  0x04C514 $8504: C-----  00       BRK  
  0x04C515 $8505: C-----  00       BRK  
  0x04C516 $8506: C-----  01 03    ORA  ($03,X)
  0x04C518 $8508: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C519 $8509: C-----  8E FE FD STX  $FDFE
  0x04C51C $850C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C51D $850D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C51E $850E: C-----  FE FC FF INC  $FFFC,X
  0x04C521 $8511: C-----  FE FC F8 INC  $F8FC,X
  0x04C524 $8514: C-----  F0 C3    BEQ  $84D9
  0x04C526 $8516: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C527 $8517: C-----  00       BRK  
  0x04C528 $8518: C-----  2A       ROL  A
  0x04C529 $8519: C-----  55 8B    EOR  $8B,X
  0x04C52B $851B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04C52C $851C: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C52D $851D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04C52E $851E: C-----  00       BRK  
  0x04C52F $851F: C-----  00       BRK  
  0x04C530 $8520: C-----  00       BRK  
  0x04C531 $8521: C-----  00       BRK  
  0x04C532 $8522: C-----  00       BRK  
  0x04C533 $8523: C-----  00       BRK  
  0x04C534 $8524: C-----  01 06    ORA  ($06,X)
  0x04C536 $8526: C-----  18       CLC  
  0x04C537 $8527: C-----  61 FF    ADC  ($FF,X)
  0x04C539 $8529: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C53A $852A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C53B $852B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C53C $852C: C-----  FE F8 E0 INC  $E0F8,X
  0x04C53F $852F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C540 $8530: C-----  00       BRK  
  0x04C541 $8531: C-----  00       BRK  
  0x04C542 $8532: C-----  00       BRK  
  0x04C543 $8533: C-----  00       BRK  
  0x04C544 $8534: C-----  00       BRK  
  0x04C545 $8535: C-----  38       SEC  
  0x04C546 $8536: C-----  46 81    LSR  $81
  0x04C548 $8538: C-----  00       BRK  
  0x04C549 $8539: C-----  00       BRK  
  0x04C54A $853A: C-----  00       BRK  
  0x04C54B $853B: C-----  00       BRK  
  0x04C54C $853C: C-----  00       BRK  
  0x04C54D $853D: C-----  00       BRK  
  0x04C54E $853E: C-----  38       SEC  
  0x04C54F $853F: C-----  7E 1F 00 ROR  $001F,X
  0x04C552 $8542: C-----  01 06    ORA  ($06,X)
  0x04C554 $8544: C-----  38       SEC  
  0x04C555 $8545: C-----  C0 00    CPY  #$00
  0x04C557 $8547: C-----  00       BRK  
  0x04C558 $8548: C-----  E0 FF    CPX  #$FF
  0x04C55A $854A: C-----  FE F8 C0 INC  $C0F8,X
  0x04C55D $854D: C-----  00       BRK  
  0x04C55E $854E: C-----  00       BRK  
  0x04C55F $854F: C-----  00       BRK  
  0x04C560 $8550: C-----  F8       SED  
  0x04C561 $8551: C-----  60       RTS  
  0x04C562 $8552: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C563 $8553: C-----  00       BRK  
  0x04C564 $8554: C-----  00       BRK  
  0x04C565 $8555: C-----  00       BRK  
  0x04C566 $8556: C-----  00       BRK  
  0x04C567 $8557: C-----  00       BRK  
  0x04C568 $8558: C-----  00       BRK  
  0x04C569 $8559: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C56A $855A: C-----  00       BRK  
  0x04C56B $855B: C-----  00       BRK  
  0x04C56C $855C: C-----  00       BRK  
  0x04C56D $855D: C-----  00       BRK  
  0x04C56E $855E: C-----  00       BRK  
  0x04C56F $855F: C-----  00       BRK  
  0x04C570 $8560: C-----  00       BRK  
  0x04C571 $8561: C-----  00       BRK  
  0x04C572 $8562: C-----  00       BRK  
  0x04C573 $8563: C-----  00       BRK  
  0x04C574 $8564: C-----  00       BRK  
  0x04C575 $8565: C-----  00       BRK  
  0x04C576 $8566: C-----  01 1F    ORA  ($1F,X)
  0x04C578 $8568: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C579 $8569: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C57A $856A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C57B $856B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C57C $856C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C57D $856D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C57E $856E: C-----  FE E0 C0 INC  $C0E0,X
  0x04C581 $8571: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C582 $8572: C-----  00       BRK  
  0x04C583 $8573: C-----  00       BRK  
  0x04C584 $8574: C-----  01 02    ORA  ($02,X)
  0x04C586 $8576: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C587 $8577: C-----  08       PHP  
  0x04C588 $8578: C-----  00       BRK  
  0x04C589 $8579: C-----  C0 FF    CPY  #$FF
  0x04C58B $857B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C58C $857C: C-----  FE FC F8 INC  $F8FC,X
  0x04C58F $857F: C-----  F0 8F    BEQ  $8510
  0x04C591 $8581: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04C592 $8582: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04C593 $8583: C-----  30 C0    BMI  $8545
  0x04C595 $8585: C-----  00       BRK  
  0x04C596 $8586: C-----  00       BRK  
  0x04C597 $8587: C-----  00       BRK  
  0x04C598 $8588: C-----  00       BRK  
  0x04C599 $8589: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04C59A $858A: C-----  F0 C0    BEQ  $854C
  0x04C59C $858C: C-----  00       BRK  
  0x04C59D $858D: C-----  00       BRK  
  0x04C59E $858E: C-----  00       BRK  
  0x04C59F $858F: C-----  00       BRK  
  0x04C5A0 $8590: C-----  10 20    BPL  $85B2
  0x04C5A2 $8592: C-----  40       RTI  
  0x04C5A3 $8593: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5A4 $8594: C-----  00       BRK  
  0x04C5A5 $8595: C-----  00       BRK  
  0x04C5A6 $8596: C-----  40       RTI  
  0x04C5A7 $8597: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5A8 $8598: C-----  E0 C0    CPX  #$C0
  0x04C5AA $859A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5AB $859B: C-----  00       BRK  
  0x04C5AC $859C: C-----  00       BRK  
  0x04C5AD $859D: C-----  00       BRK  
  0x04C5AE $859E: C-----  00       BRK  
  0x04C5AF $859F: C-----  00       BRK  
  0x04C5B0 $85A0: C-----  3D FB FF AND  $FFFB,X
  0x04C5B3 $85A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C5B4 $85A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C5B5 $85A5: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04C5B6 $85A6: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04C5B7 $85A7: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04C5B8 $85A8: C-----  08       PHP  
  0x04C5B9 $85A9: C-----  31 E3    AND  ($E3),Y
  0x04C5BB $85AB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04C5BC $85AC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C5BD $85AD: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04C5BE $85AE: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04C5BF $85AF: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04C5C0 $85B0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5C1 $85B1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5C2 $85B2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5C3 $85B3: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04C5C4 $85B4: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C5C5 $85B5: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C5C6 $85B6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C5C7 $85B7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C5C8 $85B8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C5C9 $85B9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C5CA $85BA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C5CB $85BB: C-----  BC DB B5 LDY  $B5DB,X
  0x04C5CE $85BE: C-----  A9 55    LDA  #$55
  0x04C5D0 $85C0: C-----  00       BRK  
  0x04C5D1 $85C1: C-----  00       BRK  
  0x04C5D2 $85C2: C-----  01 06    ORA  ($06,X)
  0x04C5D4 $85C4: C-----  18       CLC  
  0x04C5D5 $85C5: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04C5D6 $85C6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C5D7 $85C7: C-----  C0 FF    CPY  #$FF
  0x04C5D9 $85C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C5DA $85CA: C-----  FE F8 E0 INC  $E0F8,X
  0x04C5DD $85CD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5DE $85CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C5DF $85CF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C5E0 $85D0: C-----  10 60    BPL  $8632
  0x04C5E2 $85D2: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04C5E3 $85D3: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04C5E4 $85D4: C-----  71 82    ADC  ($82),Y
  0x04C5E6 $85D6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C5E7 $85D7: C-----  08       PHP  
  0x04C5E8 $85D8: C-----  E0 80    CPX  #$80
  0x04C5EA $85DA: C-----  00       BRK  
  0x04C5EB $85DB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C5EC $85DC: C-----  0E 7C F8 ASL  $F87C
  0x04C5EF $85DF: C-----  F0 00    BEQ  $85E1
  0x04C5F1 $85E1: C-----  00       BRK  
  0x04C5F2 $85E2: C-----  00       BRK  
  0x04C5F3 $85E3: C-----  00       BRK  
  0x04C5F4 $85E4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5F5 $85E5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5F6 $85E6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C5F7 $85E7: C-----  81 FF    STA  ($FF,X)
  0x04C5F9 $85E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C5FA $85EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C5FB $85EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C5FC $85EC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C5FD $85ED: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C5FE $85EE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C5FF $85EF: C-----  7E 03 1F ROR  $1F03,X
  0x04C602 $85F2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C603 $85F3: C-----  00       BRK  
  0x04C604 $85F4: C-----  00       BRK  
  0x04C605 $85F5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C606 $85F6: C-----  38       SEC  
  0x04C607 $85F7: C-----  C4 FC    CPY  $FC
  0x04C609 $85F9: C-----  E0 03    CPX  #$03
  0x04C60B $85FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C60C $85FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C60D $85FD: C-----  F8       SED  
  0x04C60E $85FE: C-----  C0 00    CPY  #$00
  0x04C610 $8600: C-----  18       CLC  
  0x04C611 $8601: C-----  30 70    BMI  $8673
  0x04C613 $8603: C-----  E0 E0    CPX  #$E0
  0x04C615 $8605: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04C616 $8606: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C617 $8607: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C618 $8608: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C619 $8609: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C61A $860A: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04C61B $860B: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04C61C $860C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C61D $860D: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04C61E $860E: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x04C61F $860F: C-----  D6 30    DEC  $30,X
  0x04C621 $8611: C-----  E0 41    CPX  #$41
  0x04C623 $8613: C-----  86 18    STX  $18
  0x04C625 $8615: C-----  FD EA EC SBC  $ECEA,X
  0x04C628 $8618: C-----  00       BRK  
  0x04C629 $8619: C-----  00       BRK  
  0x04C62A $861A: C-----  00       BRK  
  0x04C62B $861B: C-----  00       BRK  
  0x04C62C $861C: C-----  00       BRK  
  0x04C62D $861D: C-----  00       BRK  
  0x04C62E $861E: C-----  70 58    BVS  $8678
  0x04C630 $8620: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C631 $8621: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C632 $8622: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C633 $8623: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C634 $8624: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C635 $8625: C-----  1D 19 0C ORA  $0C19,X
  0x04C638 $8628: C-----  E6 F6    INC  $F6
  0x04C63A $862A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C63B $862B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C63C $862C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C63D $862D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C63E $862E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C63F $862F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04C640 $8630: C-----  70 61    BVS  $8693
  0x04C642 $8632: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C643 $8633: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C644 $8634: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C645 $8635: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C646 $8636: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C647 $8637: C-----  FE 8F 9E INC  $9E8F,X
  0x04C64A $863A: C-----  59 C7 DC EOR  $DCC7,Y
  0x04C64D $863D: C-----  EE F0 FE INC  $FEF0
  0x04C650 $8640: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04C651 $8641: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C652 $8642: C-----  09 07    ORA  #$07
  0x04C654 $8644: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C655 $8645: C-----  00       BRK  
  0x04C656 $8646: C-----  00       BRK  
  0x04C657 $8647: C-----  00       BRK  
  0x04C658 $8648: C-----  0D 05 06 ORA  $0605
  0x04C65B $864B: C-----  00       BRK  
  0x04C65C $864C: C-----  00       BRK  
  0x04C65D $864D: C-----  00       BRK  
  0x04C65E $864E: C-----  00       BRK  
  0x04C65F $864F: C-----  00       BRK  
  0x04C660 $8650: C-----  20 22 23 JSR  $2322
  0x04C663 $8653: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04C664 $8654: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04C665 $8655: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04C666 $8656: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C667 $8657: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C668 $8658: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C669 $8659: C-----  1D 1C 1C ORA  $1C1C,X
  0x04C66C $865C: C-----  0D 05 01 ORA  $0105
  0x04C66F $865F: C-----  01 30    ORA  ($30,X)
  0x04C671 $8661: C-----  E0 C1    CPX  #$C1
  0x04C673 $8663: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04C674 $8664: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C675 $8665: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C676 $8666: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C677 $8667: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04C678 $8668: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C679 $8669: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C67A $866A: C-----  BE 79 E7 LDX  $E779,Y
  0x04C67D $866D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C67E $866E: C-----  05 03    ORA  $03
  0x04C680 $8670: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C681 $8671: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C682 $8672: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C683 $8673: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C684 $8674: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C685 $8675: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C686 $8676: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C687 $8677: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04C688 $8678: C-----  05 05    ORA  $05
  0x04C68A $867A: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C68B $867B: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C68C $867C: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C68D $867D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C68E $867E: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C68F $867F: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04C690 $8680: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C691 $8681: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C692 $8682: C-----  FE FE FC INC  $FCFE,X
  0x04C695 $8685: C-----  F0 C1    BEQ  $8648
  0x04C697 $8687: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04C698 $8688: C-----  AA       TAX  
  0x04C699 $8689: C-----  96 25    STX  $25,Y
  0x04C69B $868B: C-----  4D B3 CF EOR  $CFB3
  0x04C69E $868E: C-----  3E BC 01 ROL  $01BC,X
  0x04C6A1 $8691: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C6A2 $8692: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04C6A3 $8693: C-----  08       PHP  
  0x04C6A4 $8694: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C6A5 $8695: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C6A6 $8696: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C6A7 $8697: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C6A8 $8698: C-----  FE FC F0 INC  $F0FC,X
  0x04C6AB $869B: C-----  F0 F8    BEQ  $8695
  0x04C6AD $869D: C-----  F8       SED  
  0x04C6AE $869E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C6AF $869F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C6B0 $86A0: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04C6B1 $86A1: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04C6B2 $86A2: C-----  58       CLI  
  0x04C6B3 $86A3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C6B4 $86A4: C-----  00       BRK  
  0x04C6B5 $86A5: C-----  00       BRK  
  0x04C6B6 $86A6: C-----  00       BRK  
  0x04C6B7 $86A7: C-----  00       BRK  
  0x04C6B8 $86A8: C-----  EC 88 80 CPX  $8088
  0x04C6BB $86AB: C-----  00       BRK  
  0x04C6BC $86AC: C-----  00       BRK  
  0x04C6BD $86AD: C-----  00       BRK  
  0x04C6BE $86AE: C-----  00       BRK  
  0x04C6BF $86AF: C-----  00       BRK  
  0x04C6C0 $86B0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C6C1 $86B1: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04C6C2 $86B2: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04C6C3 $86B3: C-----  94 B8    STY  $B8,X
  0x04C6C5 $86B5: C-----  E0 00    CPX  #$00
  0x04C6C7 $86B7: C-----  00       BRK  
  0x04C6C8 $86B8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C6C9 $86B9: C-----  E8       INX  
  0x04C6CA $86BA: C-----  E8       INX  
  0x04C6CB $86BB: C-----  68       PLA  
  0x04C6CC $86BC: C-----  40       RTI  
  0x04C6CD $86BD: C-----  00       BRK  
  0x04C6CE $86BE: C-----  00       BRK  
  0x04C6CF $86BF: C-----  00       BRK  
  0x04C6D0 $86C0: C-----  60       RTS  
  0x04C6D1 $86C1: C-----  A0 24    LDY  #$24
  0x04C6D3 $86C3: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04C6D4 $86C4: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x04C6D5 $86C5: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04C6D6 $86C6: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x04C6D7 $86C7: C-----  79 00 00 ADC  $0000,Y
  0x04C6DA $86CA: C-----  00       BRK  
  0x04C6DB $86CB: C-----  00       BRK  
  0x04C6DC $86CC: C-----  00       BRK  
  0x04C6DD $86CD: C-----  00       BRK  
  0x04C6DE $86CE: C-----  20 50 00 JSR  $0050
  0x04C6E1 $86D1: C-----  01 0E    ORA  ($0E,X)
  0x04C6E3 $86D3: C-----  30 00    BMI  $86D5
  0x04C6E5 $86D5: C-----  00       BRK  
  0x04C6E6 $86D6: C-----  00       BRK  
  0x04C6E7 $86D7: C-----  00       BRK  
  0x04C6E8 $86D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C6E9 $86D9: C-----  FE F1 CF INC  $CFF1,X
  0x04C6EC $86DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C6ED $86DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C6EE $86DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C6EF $86DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C6F0 $86E0: C-----  7D 7D 3C ADC  $3C7D,X
  0x04C6F3 $86E3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C6F4 $86E4: C-----  00       BRK  
  0x04C6F5 $86E5: C-----  00       BRK  
  0x04C6F6 $86E6: C-----  00       BRK  
  0x04C6F7 $86E7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C6F8 $86E8: C-----  50 48    BVC  $8732
  0x04C6FA $86EA: C-----  20 00 00 JSR  $0000
  0x04C6FD $86ED: C-----  00       BRK  
  0x04C6FE $86EE: C-----  00       BRK  
  0x04C6FF $86EF: C-----  00       BRK  
  0x04C700 $86F0: C-----  2C 50 60 BIT  $6050
  0x04C703 $86F3: C-----  00       BRK  
  0x04C704 $86F4: C-----  00       BRK  
  0x04C705 $86F5: C-----  00       BRK  
  0x04C706 $86F6: C-----  00       BRK  
  0x04C707 $86F7: C-----  00       BRK  
  0x04C708 $86F8: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04C709 $86F9: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C70A $86FA: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C70B $86FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C70C $86FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C70D $86FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C70E $86FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C70F $86FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C710 $8700: C-----  60       RTS  
  0x04C711 $8701: C-----  E0 E4    CPX  #$E4
  0x04C713 $8703: C-----  E4 F6    CPX  $F6
  0x04C715 $8705: C-----  F6 D6    INC  $D6,X
  0x04C717 $8707: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04C718 $8708: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C719 $8709: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04C71A $870A: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04C71B $870B: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04C71C $870C: C-----  6D 0D 8D ADC  $8D0D
  0x04C71F $870F: C-----  86 88    STX  $88
  0x04C721 $8711: C-----  FE 00 00 INC  $0000,X
  0x04C724 $8714: C-----  00       BRK  
  0x04C725 $8715: C-----  38       SEC  
  0x04C726 $8716: C-----  7E FF 70 ROR  $70FF,X
  0x04C729 $8719: C-----  00       BRK  
  0x04C72A $871A: C-----  00       BRK  
  0x04C72B $871B: C-----  00       BRK  
  0x04C72C $871C: C-----  00       BRK  
  0x04C72D $871D: C-----  00       BRK  
  0x04C72E $871E: C-----  38       SEC  
  0x04C72F $871F: C-----  7E AF B7 ROR  $B7AF,X
  0x04C732 $8722: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C733 $8723: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C734 $8724: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C735 $8725: C-----  1D 18 0C ORA  $0C18,X
  0x04C738 $8728: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04C739 $8729: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04C73A $872A: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04C73B $872B: C-----  FD FF FF SBC  $FFFF,X
  0x04C73E $872E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C73F $872F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04C740 $8730: C-----  20 20 B2 JSR  $B220
  0x04C743 $8733: C-----  B9 FC FF LDA  $FFFC,Y
  0x04C746 $8736: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C747 $8737: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C748 $8738: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C749 $8739: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C74A $873A: C-----  6D 56 9B ADC  $9B56
  0x04C74D $873D: C-----  CC E7 FB CPY  $FBE7
  0x04C750 $8740: C-----  00       BRK  
  0x04C751 $8741: C-----  00       BRK  
  0x04C752 $8742: C-----  00       BRK  
  0x04C753 $8743: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C754 $8744: C-----  C0 E1    CPY  #$E1
  0x04C756 $8746: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C757 $8747: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C758 $8748: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C759 $8749: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C75A $874A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C75B $874B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C75C $874C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C75D $874D: C-----  5E 21 9F LSR  $9F21,X
  0x04C760 $8750: C-----  40       RTI  
  0x04C761 $8751: C-----  30 0C    BMI  $875F
  0x04C763 $8753: C-----  10 20    BPL  $8775
  0x04C765 $8755: C-----  C0 80    CPY  #$80
  0x04C767 $8757: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C768 $8758: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C769 $8759: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C76A $875A: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04C76B $875B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C76C $875C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C76D $875D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C76E $875E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C76F $875F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C770 $8760: C-----  01 01    ORA  ($01,X)
  0x04C772 $8762: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C773 $8763: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C774 $8764: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C775 $8765: C-----  08       PHP  
  0x04C776 $8766: C-----  10 3F    BPL  $87A7
  0x04C778 $8768: C-----  00       BRK  
  0x04C779 $8769: C-----  00       BRK  
  0x04C77A $876A: C-----  01 01    ORA  ($01,X)
  0x04C77C $876C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C77D $876D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C77E $876E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C77F $876F: C-----  00       BRK  
  0x04C780 $8770: C-----  00       BRK  
  0x04C781 $8771: C-----  00       BRK  
  0x04C782 $8772: C-----  00       BRK  
  0x04C783 $8773: C-----  00       BRK  
  0x04C784 $8774: C-----  00       BRK  
  0x04C785 $8775: C-----  01 9F    ORA  ($9F,X)
  0x04C787 $8777: C-----  10 FF    BPL  $8778
  0x04C789 $8779: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C78A $877A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C78B $877B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C78C $877C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C78D $877D: C-----  FE 60 E0 INC  $E060,X
  0x04C790 $8780: C-----  C1 FE    CMP  ($FE,X)
  0x04C792 $8782: C-----  00       BRK  
  0x04C793 $8783: C-----  01 01    ORA  ($01,X)
  0x04C795 $8785: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C796 $8786: C-----  05 0E    ORA  $0E
  0x04C798 $8788: C-----  00       BRK  
  0x04C799 $8789: C-----  01 FF    ORA  ($FF,X)
  0x04C79B $878B: C-----  FE FE FC INC  $FCFE,X
  0x04C79E $878E: C-----  F8       SED  
  0x04C79F $878F: C-----  F1 D0    SBC  ($D0),Y
  0x04C7A1 $8791: C-----  90 B0    BCC  $8743
  0x04C7A3 $8793: C-----  30 50    BMI  $87E5
  0x04C7A5 $8795: C-----  A0 20    LDY  #$20
  0x04C7A7 $8797: C-----  20 00 00 JSR  $0000
  0x04C7AA $879A: C-----  00       BRK  
  0x04C7AB $879B: C-----  00       BRK  
  0x04C7AC $879C: C-----  20 40 C0 JSR  $C040
  0x04C7AF $879F: C-----  C0 18    CPY  #$18
  0x04C7B1 $87A1: C-----  60       RTS  
  0x04C7B2 $87A2: C-----  00       BRK  
  0x04C7B3 $87A3: C-----  00       BRK  
  0x04C7B4 $87A4: C-----  00       BRK  
  0x04C7B5 $87A5: C-----  01 01    ORA  ($01,X)
  0x04C7B7 $87A7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C7B8 $87A8: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04C7B9 $87A9: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C7BA $87AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C7BB $87AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C7BC $87AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C7BD $87AD: C-----  FE FE FC INC  $FCFE,X
  0x04C7C0 $87B0: C-----  40       RTI  
  0x04C7C1 $87B1: C-----  40       RTI  
  0x04C7C2 $87B2: C-----  40       RTI  
  0x04C7C3 $87B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C7C4 $87B4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C7C5 $87B5: C-----  00       BRK  
  0x04C7C6 $87B6: C-----  00       BRK  
  0x04C7C7 $87B7: C-----  00       BRK  
  0x04C7C8 $87B8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C7C9 $87B9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C7CA $87BA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C7CB $87BB: C-----  00       BRK  
  0x04C7CC $87BC: C-----  00       BRK  
  0x04C7CD $87BD: C-----  00       BRK  
  0x04C7CE $87BE: C-----  00       BRK  
  0x04C7CF $87BF: C-----  00       BRK  
  0x04C7D0 $87C0: C-----  00       BRK  
  0x04C7D1 $87C1: C-----  00       BRK  
  0x04C7D2 $87C2: C-----  01 06    ORA  ($06,X)
  0x04C7D4 $87C4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C7D5 $87C5: C-----  00       BRK  
  0x04C7D6 $87C6: C-----  00       BRK  
  0x04C7D7 $87C7: C-----  00       BRK  
  0x04C7D8 $87C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C7D9 $87C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C7DA $87CA: C-----  FE F8 E0 INC  $E0F8,X
  0x04C7DD $87CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C7DE $87CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C7DF $87CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C7E0 $87D0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C7E1 $87D1: C-----  05 0B    ORA  $0B
  0x04C7E3 $87D3: C-----  15 2A    ORA  $2A,X
  0x04C7E5 $87D5: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x04C7E6 $87D6: C-----  C4 0A    CPY  $0A
  0x04C7E8 $87D8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C7E9 $87D9: C-----  F8       SED  
  0x04C7EA $87DA: C-----  F0 E2    BEQ  $87BE
  0x04C7EC $87DC: C-----  C4 8C    CPY  $8C
  0x04C7EE $87DE: C-----  38       SEC  
  0x04C7EF $87DF: C-----  F0 1F    BEQ  $8800
  0x04C7F1 $87E1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C7F2 $87E2: C-----  0E 18 E0 ASL  $E018
  0x04C7F5 $87E5: C-----  00       BRK  
  0x04C7F6 $87E6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C7F7 $87E7: C-----  00       BRK  
  0x04C7F8 $87E8: C-----  E0 F8    CPX  #$F8
  0x04C7FA $87EA: C-----  F0 E0    BEQ  $87CC
  0x04C7FC $87EC: C-----  00       BRK  
  0x04C7FD $87ED: C-----  00       BRK  
  0x04C7FE $87EE: C-----  00       BRK  
  0x04C7FF $87EF: C-----  00       BRK  
  0x04C800 $87F0: C-----  16 6C    ASL  $6C,X
  0x04C802 $87F2: C-----  B4 C8    LDY  $C8,X
  0x04C804 $87F4: C-----  10 20    BPL  $8816
  0x04C806 $87F6: C-----  40       RTI  
  0x04C807 $87F7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C808 $87F8: C-----  E0 80    CPX  #$80
  0x04C80A $87FA: C-----  08       PHP  
  0x04C80B $87FB: C-----  30 E0    BMI  $87DD
  0x04C80D $87FD: C-----  C0 80    CPY  #$80
  0x04C80F $87FF: C-----  00       BRK  
  0x04C810 $8800: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C811 $8801: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C812 $8802: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C813 $8803: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C814 $8804: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C815 $8805: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C816 $8806: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C817 $8807: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C818 $8808: C-----  00       BRK  
  0x04C819 $8809: C-----  00       BRK  
  0x04C81A $880A: C-----  00       BRK  
  0x04C81B $880B: C-----  00       BRK  
  0x04C81C $880C: C-----  00       BRK  
  0x04C81D $880D: C-----  00       BRK  
  0x04C81E $880E: C-----  00       BRK  
  0x04C81F $880F: C-----  00       BRK  
  0x04C820 $8810: C-----  C0 C0    CPY  #$C0
  0x04C822 $8812: C-----  61 63    ADC  ($63,X)
  0x04C824 $8814: C-----  7E 38 38 ROR  $3838,X
  0x04C827 $8817: C-----  30 7F    BMI  $8898
  0x04C829 $8819: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C82A $881A: C-----  3E 3C 38 ROL  $383C,X
  0x04C82D $881D: C-----  10 10    BPL  $882F
  0x04C82F $881F: C-----  00       BRK  
  0x04C830 $8820: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C831 $8821: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C832 $8822: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C833 $8823: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C834 $8824: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C835 $8825: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C836 $8826: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C837 $8827: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C838 $8828: C-----  00       BRK  
  0x04C839 $8829: C-----  00       BRK  
  0x04C83A $882A: C-----  00       BRK  
  0x04C83B $882B: C-----  00       BRK  
  0x04C83C $882C: C-----  00       BRK  
  0x04C83D $882D: C-----  00       BRK  
  0x04C83E $882E: C-----  00       BRK  
  0x04C83F $882F: C-----  00       BRK  
  0x04C840 $8830: C-----  7D 7D 3C ADC  $3C7D,X
  0x04C843 $8833: C-----  0A       ASL  A
  0x04C844 $8834: C-----  00       BRK  
  0x04C845 $8835: C-----  00       BRK  
  0x04C846 $8836: C-----  00       BRK  
  0x04C847 $8837: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C848 $8838: C-----  58       CLI  
  0x04C849 $8839: C-----  60       RTS  
  0x04C84A $883A: C-----  38       SEC  
  0x04C84B $883B: C-----  08       PHP  
  0x04C84C $883C: C-----  00       BRK  
  0x04C84D $883D: C-----  00       BRK  
  0x04C84E $883E: C-----  00       BRK  
  0x04C84F $883F: C-----  00       BRK  
  0x04C850 $8840: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C851 $8841: C-----  FE FF FF INC  $FFFF,X
  0x04C854 $8844: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C855 $8845: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C856 $8846: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C857 $8847: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C858 $8848: C-----  00       BRK  
  0x04C859 $8849: C-----  00       BRK  
  0x04C85A $884A: C-----  00       BRK  
  0x04C85B $884B: C-----  00       BRK  
  0x04C85C $884C: C-----  00       BRK  
  0x04C85D $884D: C-----  00       BRK  
  0x04C85E $884E: C-----  00       BRK  
  0x04C85F $884F: C-----  00       BRK  
  0x04C860 $8850: C-----  7E FE FE ROR  $FEFE,X
  0x04C863 $8853: C-----  FE FE FC INC  $FCFE,X
  0x04C866 $8856: C-----  FD FD 00 SBC  $00FD,X
  0x04C869 $8859: C-----  00       BRK  
  0x04C86A $885A: C-----  00       BRK  
  0x04C86B $885B: C-----  00       BRK  
  0x04C86C $885C: C-----  00       BRK  
  0x04C86D $885D: C-----  00       BRK  
  0x04C86E $885E: C-----  00       BRK  
  0x04C86F $885F: C-----  00       BRK  
  0x04C870 $8860: C-----  F8       SED  
  0x04C871 $8861: C-----  F0 E0    BEQ  $8843
  0x04C873 $8863: C-----  C0 80    CPY  #$80
  0x04C875 $8865: C-----  00       BRK  
  0x04C876 $8866: C-----  00       BRK  
  0x04C877 $8867: C-----  00       BRK  
  0x04C878 $8868: C-----  00       BRK  
  0x04C879 $8869: C-----  00       BRK  
  0x04C87A $886A: C-----  00       BRK  
  0x04C87B $886B: C-----  00       BRK  
  0x04C87C $886C: C-----  00       BRK  
  0x04C87D $886D: C-----  00       BRK  
  0x04C87E $886E: C-----  00       BRK  
  0x04C87F $886F: C-----  00       BRK  
  0x04C880 $8870: C-----  F9 FB F7 SBC  $F7FB,Y
  0x04C883 $8873: C-----  FE FE FE INC  $FEFE,X
  0x04C886 $8876: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C887 $8877: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C888 $8878: C-----  00       BRK  
  0x04C889 $8879: C-----  00       BRK  
  0x04C88A $887A: C-----  00       BRK  
  0x04C88B $887B: C-----  00       BRK  
  0x04C88C $887C: C-----  00       BRK  
  0x04C88D $887D: C-----  00       BRK  
  0x04C88E $887E: C-----  00       BRK  
  0x04C88F $887F: C-----  00       BRK  
  0x04C890 $8880: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C891 $8881: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C892 $8882: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C893 $8883: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C894 $8884: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C895 $8885: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C896 $8886: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C897 $8887: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C898 $8888: C-----  00       BRK  
  0x04C899 $8889: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C89A $888A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C89B $888B: C-----  05 05    ORA  $05
  0x04C89D $888D: C-----  05 05    ORA  $05
  0x04C89F $888F: C-----  05 FF    ORA  $FF
  0x04C8A1 $8891: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8A2 $8892: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8A3 $8893: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8A4 $8894: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8A5 $8895: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8A6 $8896: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C8A7 $8897: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04C8A8 $8898: C-----  40       RTI  
  0x04C8A9 $8899: C-----  C0 C0    CPY  #$C0
  0x04C8AB $889B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C8AC $889C: C-----  E4 84    CPX  $84
  0x04C8AE $889E: C-----  A4 D6    LDY  $D6
  0x04C8B0 $88A0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C8B1 $88A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C8B2 $88A2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C8B3 $88A3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C8B4 $88A4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C8B5 $88A5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C8B6 $88A6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C8B7 $88A7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C8B8 $88A8: C-----  05 01    ORA  $01
  0x04C8BA $88AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C8BB $88AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C8BC $88AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C8BD $88AD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C8BE $88AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C8BF $88AF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C8C0 $88B0: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04C8C1 $88B1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C8C2 $88B2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C8C3 $88B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04C8C4 $88B4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04C8C5 $88B5: C-----  1D 18 0C ORA  $0C18,X
  0x04C8C8 $88B8: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04C8C9 $88B9: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04C8CA $88BA: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04C8CB $88BB: C-----  F5 FF    SBC  $FF,X
  0x04C8CD $88BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8CE $88BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8CF $88BF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04C8D0 $88C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8D1 $88C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8D2 $88C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8D3 $88C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8D4 $88C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8D5 $88C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8D6 $88C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8D7 $88C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8D8 $88C8: C-----  00       BRK  
  0x04C8D9 $88C9: C-----  00       BRK  
  0x04C8DA $88CA: C-----  20 10 98 JSR  $9810
  0x04C8DD $88CD: C-----  CC E7 FB CPY  $FBE7
  0x04C8E0 $88D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8E1 $88D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8E2 $88D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8E3 $88D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8E4 $88D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8E5 $88D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8E6 $88D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8E7 $88D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8E8 $88D8: C-----  00       BRK  
  0x04C8E9 $88D9: C-----  00       BRK  
  0x04C8EA $88DA: C-----  00       BRK  
  0x04C8EB $88DB: C-----  00       BRK  
  0x04C8EC $88DC: C-----  00       BRK  
  0x04C8ED $88DD: C-----  40       RTI  
  0x04C8EE $88DE: C-----  21 9F    AND  ($9F,X)
  0x04C8F0 $88E0: C-----  00       BRK  
  0x04C8F1 $88E1: C-----  00       BRK  
  0x04C8F2 $88E2: C-----  00       BRK  
  0x04C8F3 $88E3: C-----  C0 E0    CPY  #$E0
  0x04C8F5 $88E5: C-----  E0 C0    CPX  #$C0
  0x04C8F7 $88E7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C8F8 $88E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8F9 $88E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8FA $88EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C8FB $88EB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C8FC $88EC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C8FD $88ED: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04C8FE $88EE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C8FF $88EF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C900 $88F0: C-----  00       BRK  
  0x04C901 $88F1: C-----  00       BRK  
  0x04C902 $88F2: C-----  01 01    ORA  ($01,X)
  0x04C904 $88F4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C905 $88F5: C-----  00       BRK  
  0x04C906 $88F6: C-----  00       BRK  
  0x04C907 $88F7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04C908 $88F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C909 $88F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C90A $88FA: C-----  FE FE FD INC  $FDFE,X
  0x04C90D $88FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C90E $88FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C90F $88FF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C910 $8900: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C911 $8901: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C912 $8902: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C913 $8903: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C914 $8904: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C915 $8905: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C916 $8906: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C917 $8907: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C918 $8908: C-----  00       BRK  
  0x04C919 $8909: C-----  00       BRK  
  0x04C91A $890A: C-----  00       BRK  
  0x04C91B $890B: C-----  00       BRK  
  0x04C91C $890C: C-----  00       BRK  
  0x04C91D $890D: C-----  00       BRK  
  0x04C91E $890E: C-----  00       BRK  
  0x04C91F $890F: C-----  00       BRK  
  0x04C920 $8910: C-----  F9 F9 F2 SBC  $F2F9,Y
  0x04C923 $8913: C-----  E6 CC    INC  $CC
  0x04C925 $8915: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04C926 $8916: C-----  F8       SED  
  0x04C927 $8917: C-----  F8       SED  
  0x04C928 $8918: C-----  00       BRK  
  0x04C929 $8919: C-----  00       BRK  
  0x04C92A $891A: C-----  00       BRK  
  0x04C92B $891B: C-----  00       BRK  
  0x04C92C $891C: C-----  00       BRK  
  0x04C92D $891D: C-----  00       BRK  
  0x04C92E $891E: C-----  00       BRK  
  0x04C92F $891F: C-----  00       BRK  
  0x04C930 $8920: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C931 $8921: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C932 $8922: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C933 $8923: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C934 $8924: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C935 $8925: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C936 $8926: C-----  F0 C4    BEQ  $88EC
  0x04C938 $8928: C-----  00       BRK  
  0x04C939 $8929: C-----  00       BRK  
  0x04C93A $892A: C-----  00       BRK  
  0x04C93B $892B: C-----  00       BRK  
  0x04C93C $892C: C-----  00       BRK  
  0x04C93D $892D: C-----  00       BRK  
  0x04C93E $892E: C-----  00       BRK  
  0x04C93F $892F: C-----  00       BRK  
  0x04C940 $8930: C-----  F0 E0    BEQ  $8912
  0x04C942 $8932: C-----  C0 80    CPY  #$80
  0x04C944 $8934: C-----  00       BRK  
  0x04C945 $8935: C-----  00       BRK  
  0x04C946 $8936: C-----  00       BRK  
  0x04C947 $8937: C-----  00       BRK  
  0x04C948 $8938: C-----  00       BRK  
  0x04C949 $8939: C-----  00       BRK  
  0x04C94A $893A: C-----  00       BRK  
  0x04C94B $893B: C-----  00       BRK  
  0x04C94C $893C: C-----  00       BRK  
  0x04C94D $893D: C-----  00       BRK  
  0x04C94E $893E: C-----  00       BRK  
  0x04C94F $893F: C-----  00       BRK  
  0x04C950 $8940: C-----  00       BRK  
  0x04C951 $8941: C-----  00       BRK  
  0x04C952 $8942: C-----  00       BRK  
  0x04C953 $8943: C-----  00       BRK  
  0x04C954 $8944: C-----  08       PHP  
  0x04C955 $8945: C-----  30 F0    BMI  $8937
  0x04C957 $8947: C-----  F0 FF    BEQ  $8948
  0x04C959 $8949: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C95A $894A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C95B $894B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C95C $894C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C95D $894D: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04C95E $894E: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04C95F $894F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04C960 $8950: C-----  01 02    ORA  ($02,X)
  0x04C962 $8952: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C963 $8953: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04C964 $8954: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C965 $8955: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C966 $8956: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C967 $8957: C-----  08       PHP  
  0x04C968 $8958: C-----  FE FC FC INC  $FCFC,X
  0x04C96B $895B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C96C $895C: C-----  F8       SED  
  0x04C96D $895D: C-----  F8       SED  
  0x04C96E $895E: C-----  F8       SED  
  0x04C96F $895F: C-----  F0 F8    BEQ  $8959
  0x04C971 $8961: C-----  F8       SED  
  0x04C972 $8962: C-----  F6 FF    INC  $FF,X
  0x04C974 $8964: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C975 $8965: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C976 $8966: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C977 $8967: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C978 $8968: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C979 $8969: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04C97A $896A: C-----  E9 E6    SBC  #$E6
  0x04C97C $896C: C-----  EA       NOP  
  0x04C97D $896D: C-----  CA       DEX  
  0x04C97E $896E: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x04C97F $896F: C-----  AA       TAX  
  0x04C980 $8970: C-----  08       PHP  
  0x04C981 $8971: C-----  10 10    BPL  $8983
  0x04C983 $8973: C-----  20 20 40 JSR  $4020
  0x04C986 $8976: C-----  40       RTI  
  0x04C987 $8977: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C988 $8978: C-----  F0 E0    BEQ  $895A
  0x04C98A $897A: C-----  E0 C0    CPX  #$C0
  0x04C98C $897C: C-----  C0 80    CPY  #$80
  0x04C98E $897E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04C98F $897F: C-----  00       BRK  
  0x04C990 $8980: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C991 $8981: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C992 $8982: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C993 $8983: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C994 $8984: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C995 $8985: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C996 $8986: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C997 $8987: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C998 $8988: C-----  00       BRK  
  0x04C999 $8989: C-----  00       BRK  
  0x04C99A $898A: C-----  00       BRK  
  0x04C99B $898B: C-----  00       BRK  
  0x04C99C $898C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04C99D $898D: C-----  4E 8A 96 LSR  $968A
  0x04C9A0 $8990: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C9A1 $8991: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C9A2 $8992: C-----  FD FA F2 SBC  $F2FA,X
  0x04C9A5 $8995: C-----  E4 C8    CPX  $C8
  0x04C9A7 $8997: C-----  F0 D4    BEQ  $896D
  0x04C9A9 $8999: C-----  CC 9A F4 CPY  $F49A
  0x04C9AC $899C: C-----  EC D8 30 CPX  $30D8
  0x04C9AF $899F: C-----  00       BRK  
  0x04C9B0 $89A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C9B1 $89A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C9B2 $89A2: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04C9B3 $89A3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C9B4 $89A4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04C9B5 $89A5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C9B6 $89A6: C-----  F8       SED  
  0x04C9B7 $89A7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C9B8 $89A8: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04C9B9 $89A9: C-----  2C 54 88 BIT  $8854
  0x04C9BC $89AC: C-----  70 C0    BVS  $896E
  0x04C9BE $89AE: C-----  00       BRK  
  0x04C9BF $89AF: C-----  00       BRK  
  0x04C9C0 $89B0: C-----  E1 07    SBC  ($07,X)
  0x04C9C2 $89B2: C-----  1E 78 F0 ASL  $F078,X
  0x04C9C5 $89B5: C-----  C0 00    CPY  #$00
  0x04C9C7 $89B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C9C8 $89B8: C-----  1E F9 E7 ASL  $E7F9,X
  0x04C9CB $89BB: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04C9CC $89BC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04C9CD $89BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C9CE $89BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C9CF $89BF: C-----  00       BRK  
  0x04C9D0 $89C0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04C9D1 $89C1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04C9D2 $89C2: C-----  0E 0E 0C ASL  $0C0E
  0x04C9D5 $89C5: C-----  18       CLC  
  0x04C9D6 $89C6: C-----  10 3F    BPL  $8A07
  0x04C9D8 $89C8: C-----  FE FE FC INC  $FCFE,X
  0x04C9DB $89CB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04C9DC $89CC: C-----  F8       SED  
  0x04C9DD $89CD: C-----  F0 E0    BEQ  $89AF
  0x04C9DF $89CF: C-----  C0 00    CPY  #$00
  0x04C9E1 $89D1: ------  .byte $00
  0x04C9E2 $89D2: ------  .byte $00
  0x04C9E3 $89D3: ------  .byte $03
  0x04C9E4 $89D4: ------  .byte $07
  0x04C9E5 $89D5: ------  .byte $1F
  0x04C9E6 $89D6: ------  .byte $7F
  0x04C9E7 $89D7: ------  .byte $FF
  0x04C9E8 $89D8: ------  .byte $FF
  0x04C9E9 $89D9: ------  .byte $FF
  0x04C9EA $89DA: ------  .byte $FF
  0x04C9EB $89DB: ------  .byte $FC
  0x04C9EC $89DC: ------  .byte $FB
  0x04C9ED $89DD: ------  .byte $E7
  0x04C9EE $89DE: ------  .byte $9F
  0x04C9EF $89DF: ------  .byte $7F
  0x04C9F0 $89E0: ------  .byte $01
  0x04C9F1 $89E1: ------  .byte $07
  0x04C9F2 $89E2: ------  .byte $0F
  0x04C9F3 $89E3: ------  .byte $1F
  0x04C9F4 $89E4: ------  .byte $7F
  0x04C9F5 $89E5: ------  .byte $FF
  0x04C9F6 $89E6: ------  .byte $FF
  0x04C9F7 $89E7: ------  .byte $FF
  0x04C9F8 $89E8: ------  .byte $FE
  0x04C9F9 $89E9: ------  .byte $F9
  0x04C9FA $89EA: ------  .byte $F7
  0x04C9FB $89EB: ------  .byte $EF
  0x04C9FC $89EC: ------  .byte $9F
  0x04C9FD $89ED: ------  .byte $7F
  0x04C9FE $89EE: ------  .byte $FF
  0x04C9FF $89EF: ------  .byte $FF
  0x04CA00 $89F0: ------  .byte $FF
  0x04CA01 $89F1: ------  .byte $FF
  0x04CA02 $89F2: ------  .byte $FF
  0x04CA03 $89F3: ------  .byte $FF
  0x04CA04 $89F4: ------  .byte $FF
  0x04CA05 $89F5: ------  .byte $FF
  0x04CA06 $89F6: ------  .byte $F8
  0x04CA07 $89F7: ------  .byte $E0
  0x04CA08 $89F8: ------  .byte $FF
  0x04CA09 $89F9: ------  .byte $FF
  0x04CA0A $89FA: ------  .byte $FF
  0x04CA0B $89FB: ------  .byte $FF
  0x04CA0C $89FC: ------  .byte $FF
  0x04CA0D $89FD: ------  .byte $FF
  0x04CA0E $89FE: ------  .byte $FF
  0x04CA0F $89FF: ------  .byte $FF
  0x04CA10 $8A00: C-----  00       BRK  
  0x04CA11 $8A01: C-----  00       BRK  
  0x04CA12 $8A02: C-----  01 1E    ORA  ($1E,X)
  0x04CA14 $8A04: C-----  09 04    ORA  #$04
  0x04CA16 $8A06: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CA17 $8A07: C-----  00       BRK  
  0x04CA18 $8A08: C-----  00       BRK  
  0x04CA19 $8A09: C-----  00       BRK  
  0x04CA1A $8A0A: C-----  00       BRK  
  0x04CA1B $8A0B: C-----  01 06    ORA  ($06,X)
  0x04CA1D $8A0D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CA1E $8A0E: C-----  00       BRK  
  0x04CA1F $8A0F: C-----  00       BRK  
  0x04CA20 $8A10: C-----  06 02    ASL  $02
  0x04CA22 $8A12: C-----  08       PHP  
  0x04CA23 $8A13: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CA24 $8A14: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CA25 $8A15: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CA26 $8A16: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04CA27 $8A17: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04CA28 $8A18: C-----  F9 FD F7 SBC  $F7FD,Y
  0x04CA2B $8A1B: C-----  F0 73    BEQ  $8A90
  0x04CA2D $8A1D: C-----  71 3B    ADC  ($3B),Y
  0x04CA2F $8A1F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04CA30 $8A20: C-----  00       BRK  
  0x04CA31 $8A21: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CA32 $8A22: C-----  F8       SED  
  0x04CA33 $8A23: C-----  00       BRK  
  0x04CA34 $8A24: C-----  C0 38    CPY  #$38
  0x04CA36 $8A26: C-----  00       BRK  
  0x04CA37 $8A27: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CA38 $8A28: C-----  00       BRK  
  0x04CA39 $8A29: C-----  00       BRK  
  0x04CA3A $8A2A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CA3B $8A2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA3C $8A2C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CA3D $8A2D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04CA3E $8A2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA3F $8A2F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CA40 $8A30: C-----  70 80    BVS  $89B2
  0x04CA42 $8A32: C-----  00       BRK  
  0x04CA43 $8A33: C-----  00       BRK  
  0x04CA44 $8A34: C-----  00       BRK  
  0x04CA45 $8A35: C-----  00       BRK  
  0x04CA46 $8A36: C-----  00       BRK  
  0x04CA47 $8A37: C-----  00       BRK  
  0x04CA48 $8A38: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CA49 $8A39: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CA4A $8A3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA4B $8A3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA4C $8A3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA4D $8A3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA4E $8A3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA4F $8A3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA50 $8A40: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CA51 $8A41: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CA52 $8A42: C-----  FE FC F8 INC  $F8FC,X
  0x04CA55 $8A45: C-----  F0 F0    BEQ  $8A37
  0x04CA57 $8A47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA58 $8A48: C-----  F9 C7 3F SBC  $3FC7,Y
  0x04CA5B $8A4B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA5C $8A4C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA5D $8A4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA5E $8A4E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA5F $8A4F: C-----  00       BRK  
  0x04CA60 $8A50: C-----  00       BRK  
  0x04CA61 $8A51: C-----  00       BRK  
  0x04CA62 $8A52: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CA63 $8A53: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CA64 $8A54: C-----  78       SEI  
  0x04CA65 $8A55: C-----  F0 E0    BEQ  $8A37
  0x04CA67 $8A57: C-----  E0 00    CPX  #$00
  0x04CA69 $8A59: C-----  00       BRK  
  0x04CA6A $8A5A: C-----  00       BRK  
  0x04CA6B $8A5B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CA6C $8A5C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CA6D $8A5D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CA6E $8A5E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CA6F $8A5F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CA70 $8A60: C-----  B8       CLV  
  0x04CA71 $8A61: C-----  40       RTI  
  0x04CA72 $8A62: C-----  B0 4E    BCS  $8AB2
  0x04CA74 $8A64: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04CA75 $8A65: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04CA76 $8A66: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CA77 $8A67: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CA78 $8A68: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04CA79 $8A69: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CA7A $8A6A: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04CA7B $8A6B: C-----  31 3A    AND  ($3A),Y
  0x04CA7D $8A6D: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04CA7E $8A6E: C-----  06 05    ASL  $05
  0x04CA80 $8A70: C-----  00       BRK  
  0x04CA81 $8A71: C-----  00       BRK  
  0x04CA82 $8A72: C-----  00       BRK  
  0x04CA83 $8A73: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CA84 $8A74: C-----  F8       SED  
  0x04CA85 $8A75: C-----  C0 F8    CPY  #$F8
  0x04CA87 $8A77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA88 $8A78: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA89 $8A79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA8A $8A7A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CA8B $8A7B: C-----  F8       SED  
  0x04CA8C $8A7C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CA8D $8A7D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04CA8E $8A7E: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04CA8F $8A7F: C-----  F8       SED  
  0x04CA90 $8A80: C-----  70 8F    BVS  $8A11
  0x04CA92 $8A82: C-----  60       RTS  
  0x04CA93 $8A83: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04CA94 $8A84: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04CA95 $8A85: C-----  18       CLC  
  0x04CA96 $8A86: C-----  06 01    ASL  $01
  0x04CA98 $8A88: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CA99 $8A89: C-----  70 1F    BVS  $8AAA
  0x04CA9B $8A8B: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04CA9C $8A8C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CA9D $8A8D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CA9E $8A8E: C-----  01 00    ORA  ($00,X)
  0x04CAA0 $8A90: C-----  00       BRK  
  0x04CAA1 $8A91: C-----  00       BRK  
  0x04CAA2 $8A92: C-----  00       BRK  
  0x04CAA3 $8A93: C-----  00       BRK  
  0x04CAA4 $8A94: C-----  C0 00    CPY  #$00
  0x04CAA6 $8A96: C-----  00       BRK  
  0x04CAA7 $8A97: C-----  C6 FF    DEC  $FF
  0x04CAA9 $8A99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CAAA $8A9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CAAB $8A9B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CAAC $8A9C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CAAD $8A9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CAAE $8A9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CAAF $8A9F: C-----  39 C0 20 AND  $20C0,Y
  0x04CAB2 $8AA2: C-----  10 08    BPL  $8AAC
  0x04CAB4 $8AA4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CAB5 $8AA5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CAB6 $8AA6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CAB7 $8AA7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CAB8 $8AA8: C-----  00       BRK  
  0x04CAB9 $8AA9: C-----  C0 E0    CPY  #$E0
  0x04CABB $8AAB: C-----  F0 F8    BEQ  $8AA5
  0x04CABD $8AAD: C-----  F8       SED  
  0x04CABE $8AAE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CABF $8AAF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CAC0 $8AB0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CAC1 $8AB1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CAC2 $8AB2: C-----  01 01    ORA  ($01,X)
  0x04CAC4 $8AB4: C-----  01 01    ORA  ($01,X)
  0x04CAC6 $8AB6: C-----  01 01    ORA  ($01,X)
  0x04CAC8 $8AB8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CAC9 $8AB9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CACA $8ABA: C-----  FE FE FE INC  $FEFE,X
  0x04CACD $8ABD: C-----  FE FE FE INC  $FEFE,X
  0x04CAD0 $8AC0: C-----  0A       ASL  A
  0x04CAD1 $8AC1: C-----  0A       ASL  A
  0x04CAD2 $8AC2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04CAD3 $8AC3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CAD4 $8AC4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CAD5 $8AC5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CAD6 $8AC6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CAD7 $8AC7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CAD8 $8AC8: C-----  05 05    ORA  $05
  0x04CADA $8ACA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CADB $8ACB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CADC $8ACC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CADD $8ACD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CADE $8ACE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CADF $8ACF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CAE0 $8AD0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CAE1 $8AD1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CAE2 $8AD2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CAE3 $8AD3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CAE4 $8AD4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CAE5 $8AD5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CAE6 $8AD6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CAE7 $8AD7: C-----  01 FF    ORA  ($FF,X)
  0x04CAE9 $8AD9: C-----  FE FF FE INC  $FEFF,X
  0x04CAEC $8ADC: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CAED $8ADD: C-----  FD FC FE SBC  $FEFC,X
  0x04CAF0 $8AE0: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04CAF1 $8AE1: C-----  E6 F9    INC  $F9
  0x04CAF3 $8AE3: C-----  AC B4 CC LDY  $CCB4
  0x04CAF6 $8AE6: C-----  78       SEI  
  0x04CAF7 $8AE7: C-----  00       BRK  
  0x04CAF8 $8AE8: C-----  00       BRK  
  0x04CAF9 $8AE9: C-----  00       BRK  
  0x04CAFA $8AEA: C-----  00       BRK  
  0x04CAFB $8AEB: C-----  78       SEI  
  0x04CAFC $8AEC: C-----  EC FC 78 CPX  $78FC
  0x04CAFF $8AEF: C-----  00       BRK  
  0x04CB00 $8AF0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CB01 $8AF1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CB02 $8AF2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CB03 $8AF3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CB04 $8AF4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CB05 $8AF5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CB06 $8AF6: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04CB07 $8AF7: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04CB08 $8AF8: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CB09 $8AF9: C-----  F6 F7    INC  $F7,X
  0x04CB0B $8AFB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04CB0C $8AFC: C-----  70 71    BVS  $8B6F
  0x04CB0E $8AFE: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04CB0F $8AFF: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04CB10 $8B00: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CB11 $8B01: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CB12 $8B02: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CB13 $8B03: C-----  C0 20    CPY  #$20
  0x04CB15 $8B05: C-----  10 08    BPL  $8B0F
  0x04CB17 $8B07: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CB18 $8B08: C-----  00       BRK  
  0x04CB19 $8B09: C-----  00       BRK  
  0x04CB1A $8B0A: C-----  00       BRK  
  0x04CB1B $8B0B: C-----  00       BRK  
  0x04CB1C $8B0C: C-----  C0 E0    CPY  #$E0
  0x04CB1E $8B0E: C-----  F0 F8    BEQ  $8B08
  0x04CB20 $8B10: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04CB21 $8B11: C-----  E0 F0    CPX  #$F0
  0x04CB23 $8B13: C-----  78       SEI  
  0x04CB24 $8B14: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CB25 $8B15: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CB26 $8B16: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CB27 $8B17: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CB28 $8B18: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CB29 $8B19: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CB2A $8B1A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CB2B $8B1B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CB2C $8B1C: C-----  20 1F 07 JSR  $071F
  0x04CB2F $8B1F: C-----  00       BRK  
  0x04CB30 $8B20: C-----  00       BRK  
  0x04CB31 $8B21: C-----  00       BRK  
  0x04CB32 $8B22: C-----  C0 00    CPY  #$00
  0x04CB34 $8B24: C-----  00       BRK  
  0x04CB35 $8B25: C-----  10 60    BPL  $8B87
  0x04CB37 $8B27: C-----  81 FF    STA  ($FF,X)
  0x04CB39 $8B29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB3A $8B2A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CB3B $8B2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB3C $8B2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB3D $8B2D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04CB3E $8B2E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04CB3F $8B2F: C-----  7E 00 00 ROR  $0000,X
  0x04CB42 $8B32: C-----  00       BRK  
  0x04CB43 $8B33: C-----  00       BRK  
  0x04CB44 $8B34: C-----  00       BRK  
  0x04CB45 $8B35: C-----  18       CLC  
  0x04CB46 $8B36: C-----  70 C3    BVS  $8AFB
  0x04CB48 $8B38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB49 $8B39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB4A $8B3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB4B $8B3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB4C $8B3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB4D $8B3D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04CB4E $8B3E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CB4F $8B3F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04CB50 $8B40: ------  .byte $FF
  0x04CB51 $8B41: ------  .byte $FF
  0x04CB52 $8B42: ------  .byte $FC
  0x04CB53 $8B43: ------  .byte $F0
  0x04CB54 $8B44: ------  .byte $80
  0x04CB55 $8B45: ------  .byte $00
  0x04CB56 $8B46: ------  .byte $0F
  0x04CB57 $8B47: ------  .byte $F0
  0x04CB58 $8B48: ------  .byte $FF
  0x04CB59 $8B49: ------  .byte $FF
  0x04CB5A $8B4A: ------  .byte $FF
  0x04CB5B $8B4B: ------  .byte $FF
  0x04CB5C $8B4C: ------  .byte $FF
  0x04CB5D $8B4D: ------  .byte $FF
  0x04CB5E $8B4E: ------  .byte $F0
  0x04CB5F $8B4F: ------  .byte $0F
  0x04CB60 $8B50: ------  .byte $80
  0x04CB61 $8B51: ------  .byte $00
  0x04CB62 $8B52: ------  .byte $00
  0x04CB63 $8B53: ------  .byte $00
  0x04CB64 $8B54: ------  .byte $03
  0x04CB65 $8B55: ------  .byte $3C
  0x04CB66 $8B56: ------  .byte $C0
  0x04CB67 $8B57: ------  .byte $00
  0x04CB68 $8B58: ------  .byte $FF
  0x04CB69 $8B59: ------  .byte $FF
  0x04CB6A $8B5A: ------  .byte $FF
  0x04CB6B $8B5B: ------  .byte $FF
  0x04CB6C $8B5C: ------  .byte $FC
  0x04CB6D $8B5D: ------  .byte $C3
  0x04CB6E $8B5E: ------  .byte $3F
  0x04CB6F $8B5F: ------  .byte $FF
  0x04CB70 $8B60: ------  .byte $00
  0x04CB71 $8B61: ------  .byte $00
  0x04CB72 $8B62: ------  .byte $00
  0x04CB73 $8B63: ------  .byte $00
  0x04CB74 $8B64: ------  .byte $00
  0x04CB75 $8B65: ------  .byte $80
  0x04CB76 $8B66: ------  .byte $E0
  0x04CB77 $8B67: ------  .byte $FC
  0x04CB78 $8B68: ------  .byte $FF
  0x04CB79 $8B69: ------  .byte $FF
  0x04CB7A $8B6A: ------  .byte $FF
  0x04CB7B $8B6B: ------  .byte $FF
  0x04CB7C $8B6C: ------  .byte $FF
  0x04CB7D $8B6D: ------  .byte $7F
  0x04CB7E $8B6E: ------  .byte $9F
  0x04CB7F $8B6F: ------  .byte $E3
  0x04CB80 $8B70: ------  .byte $00
  0x04CB81 $8B71: ------  .byte $00
  0x04CB82 $8B72: ------  .byte $00
  0x04CB83 $8B73: ------  .byte $00
  0x04CB84 $8B74: ------  .byte $00
  0x04CB85 $8B75: ------  .byte $01
  0x04CB86 $8B76: ------  .byte $07
  0x04CB87 $8B77: ------  .byte $3F
  0x04CB88 $8B78: ------  .byte $FF
  0x04CB89 $8B79: ------  .byte $FF
  0x04CB8A $8B7A: ------  .byte $FF
  0x04CB8B $8B7B: ------  .byte $FF
  0x04CB8C $8B7C: ------  .byte $FF
  0x04CB8D $8B7D: ------  .byte $FE
  0x04CB8E $8B7E: ------  .byte $F9
  0x04CB8F $8B7F: ------  .byte $C7
  0x04CB90 $8B80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB91 $8B81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB92 $8B82: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04CB93 $8B83: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CB94 $8B84: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CB95 $8B85: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CB96 $8B86: C-----  00       BRK  
  0x04CB97 $8B87: C-----  00       BRK  
  0x04CB98 $8B88: C-----  81 F7    STA  ($F7,X)
  0x04CB9A $8B8A: C-----  78       SEI  
  0x04CB9B $8B8B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB9C $8B8C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB9D $8B8D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB9E $8B8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CB9F $8B8F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBA0 $8B90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBA1 $8B91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBA2 $8B92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBA3 $8B93: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04CBA4 $8B94: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04CBA5 $8B95: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CBA6 $8B96: C-----  00       BRK  
  0x04CBA7 $8B97: C-----  00       BRK  
  0x04CBA8 $8B98: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04CBA9 $8B99: C-----  19 06 03 ORA  $0306,Y
  0x04CBAC $8B9C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CBAD $8B9D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CBAE $8B9E: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04CBAF $8B9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBB0 $8BA0: C-----  30 F8    BMI  $8B9A
  0x04CBB2 $8BA2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CBB3 $8BA3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CBB4 $8BA4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CBB5 $8BA5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CBB6 $8BA6: C-----  F8       SED  
  0x04CBB7 $8BA7: C-----  F0 CF    BEQ  $8B78
  0x04CBB9 $8BA9: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04CBBA $8BAA: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CBBB $8BAB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04CBBC $8BAC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CBBD $8BAD: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04CBBE $8BAE: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CBBF $8BAF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04CBC0 $8BB0: C-----  00       BRK  
  0x04CBC1 $8BB1: C-----  00       BRK  
  0x04CBC2 $8BB2: C-----  00       BRK  
  0x04CBC3 $8BB3: C-----  01 01    ORA  ($01,X)
  0x04CBC5 $8BB5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CBC6 $8BB6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CBC7 $8BB7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CBC8 $8BB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBC9 $8BB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBCA $8BBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBCB $8BBB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBCC $8BBC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBCD $8BBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CBCE $8BBE: C-----  FE FE FF INC  $FFFE,X
  0x04CBD1 $8BC1: ------  .byte $7F
  0x04CBD2 $8BC2: ------  .byte $3F
  0x04CBD3 $8BC3: ------  .byte $0F
  0x04CBD4 $8BC4: ------  .byte $C3
  0x04CBD5 $8BC5: ------  .byte $FB
  0x04CBD6 $8BC6: ------  .byte $F3
  0x04CBD7 $8BC7: ------  .byte $E3
  0x04CBD8 $8BC8: ------  .byte $FC
  0x04CBD9 $8BC9: ------  .byte $FE
  0x04CBDA $8BCA: ------  .byte $FF
  0x04CBDB $8BCB: ------  .byte $FF
  0x04CBDC $8BCC: ------  .byte $3F
  0x04CBDD $8BCD: ------  .byte $07
  0x04CBDE $8BCE: ------  .byte $0F
  0x04CBDF $8BCF: ------  .byte $1F
  0x04CBE0 $8BD0: ------  .byte $FF
  0x04CBE1 $8BD1: ------  .byte $FF
  0x04CBE2 $8BD2: ------  .byte $FF
  0x04CBE3 $8BD3: ------  .byte $FF
  0x04CBE4 $8BD4: ------  .byte $DF
  0x04CBE5 $8BD5: ------  .byte $C8
  0x04CBE6 $8BD6: ------  .byte $C0
  0x04CBE7 $8BD7: ------  .byte $C0
  0x04CBE8 $8BD8: ------  .byte $3F
  0x04CBE9 $8BD9: ------  .byte $FF
  0x04CBEA $8BDA: ------  .byte $FF
  0x04CBEB $8BDB: ------  .byte $FF
  0x04CBEC $8BDC: ------  .byte $FF
  0x04CBED $8BDD: ------  .byte $FF
  0x04CBEE $8BDE: ------  .byte $FF
  0x04CBEF $8BDF: ------  .byte $FF
  0x04CBF0 $8BE0: ------  .byte $E7
  0x04CBF1 $8BE1: ------  .byte $67
  0x04CBF2 $8BE2: ------  .byte $67
  0x04CBF3 $8BE3: ------  .byte $32
  0x04CBF4 $8BE4: ------  .byte $30
  0x04CBF5 $8BE5: ------  .byte $19
  0x04CBF6 $8BE6: ------  .byte $0E
  0x04CBF7 $8BE7: ------  .byte $0C
  0x04CBF8 $8BE8: ------  .byte $1F
  0x04CBF9 $8BE9: ------  .byte $9F
  0x04CBFA $8BEA: ------  .byte $9F
  0x04CBFB $8BEB: ------  .byte $CF
  0x04CBFC $8BEC: ------  .byte $CF
  0x04CBFD $8BED: ------  .byte $E6
  0x04CBFE $8BEE: ------  .byte $F1
  0x04CBFF $8BEF: ------  .byte $F3
  0x04CC00 $8BF0: ------  .byte $87
  0x04CC01 $8BF1: ------  .byte $98
  0x04CC02 $8BF2: ------  .byte $10
  0x04CC03 $8BF3: ------  .byte $20
  0x04CC04 $8BF4: ------  .byte $40
  0x04CC05 $8BF5: ------  .byte $80
  0x04CC06 $8BF6: ------  .byte $00
  0x04CC07 $8BF7: ------  .byte $00
  0x04CC08 $8BF8: ------  .byte $F8
  0x04CC09 $8BF9: ------  .byte $E7
  0x04CC0A $8BFA: ------  .byte $EF
  0x04CC0B $8BFB: ------  .byte $DF
  0x04CC0C $8BFC: ------  .byte $BF
  0x04CC0D $8BFD: ------  .byte $7F
  0x04CC0E $8BFE: ------  .byte $FF
  0x04CC0F $8BFF: ------  .byte $FF
  0x04CC10 $8C00: C-----  00       BRK  
  0x04CC11 $8C01: C-----  00       BRK  
  0x04CC12 $8C02: C-----  00       BRK  
  0x04CC13 $8C03: C-----  00       BRK  
  0x04CC14 $8C04: C-----  00       BRK  
  0x04CC15 $8C05: C-----  00       BRK  
  0x04CC16 $8C06: C-----  00       BRK  
  0x04CC17 $8C07: C-----  00       BRK  
  0x04CC18 $8C08: C-----  00       BRK  
  0x04CC19 $8C09: C-----  00       BRK  
  0x04CC1A $8C0A: C-----  00       BRK  
  0x04CC1B $8C0B: C-----  00       BRK  
  0x04CC1C $8C0C: C-----  00       BRK  
  0x04CC1D $8C0D: C-----  00       BRK  
  0x04CC1E $8C0E: C-----  00       BRK  
  0x04CC1F $8C0F: C-----  00       BRK  
  0x04CC20 $8C10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC21 $8C11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC22 $8C12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC23 $8C13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC24 $8C14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC25 $8C15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC26 $8C16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC27 $8C17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC28 $8C18: C-----  00       BRK  
  0x04CC29 $8C19: C-----  00       BRK  
  0x04CC2A $8C1A: C-----  00       BRK  
  0x04CC2B $8C1B: C-----  00       BRK  
  0x04CC2C $8C1C: C-----  00       BRK  
  0x04CC2D $8C1D: C-----  00       BRK  
  0x04CC2E $8C1E: C-----  00       BRK  
  0x04CC2F $8C1F: C-----  00       BRK  
  0x04CC30 $8C20: C-----  0D 1B 3B ORA  $3B1B
  0x04CC33 $8C23: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04CC34 $8C24: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04CC35 $8C25: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04CC36 $8C26: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CC37 $8C27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC38 $8C28: C-----  00       BRK  
  0x04CC39 $8C29: C-----  00       BRK  
  0x04CC3A $8C2A: C-----  00       BRK  
  0x04CC3B $8C2B: C-----  00       BRK  
  0x04CC3C $8C2C: C-----  00       BRK  
  0x04CC3D $8C2D: C-----  00       BRK  
  0x04CC3E $8C2E: C-----  00       BRK  
  0x04CC3F $8C2F: C-----  00       BRK  
  0x04CC40 $8C30: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CC41 $8C31: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CC42 $8C32: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CC43 $8C33: C-----  EE DE BE INC  $BEDE
  0x04CC46 $8C36: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CC47 $8C37: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CC48 $8C38: C-----  00       BRK  
  0x04CC49 $8C39: C-----  00       BRK  
  0x04CC4A $8C3A: C-----  00       BRK  
  0x04CC4B $8C3B: C-----  00       BRK  
  0x04CC4C $8C3C: C-----  00       BRK  
  0x04CC4D $8C3D: C-----  00       BRK  
  0x04CC4E $8C3E: C-----  00       BRK  
  0x04CC4F $8C3F: C-----  00       BRK  
  0x04CC50 $8C40: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CC51 $8C41: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CC52 $8C42: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CC53 $8C43: C-----  0E 1E 1C ASL  $1C1E
  0x04CC56 $8C46: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CC57 $8C47: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CC58 $8C48: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CC59 $8C49: C-----  00       BRK  
  0x04CC5A $8C4A: C-----  01 01    ORA  ($01,X)
  0x04CC5C $8C4C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CC5D $8C4D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CC5E $8C4E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CC5F $8C4F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CC60 $8C50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC61 $8C51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC62 $8C52: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CC63 $8C53: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CC64 $8C54: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CC65 $8C55: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CC66 $8C56: C-----  3E 38 E3 ROL  $E338,X
  0x04CC69 $8C59: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04CC6A $8C5A: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CC6B $8C5B: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CC6C $8C5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC6D $8C5D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CC6E $8C5E: C-----  C9 C7    CMP  #$C7
  0x04CC70 $8C60: C-----  0E 0E 05 ASL  $050E
  0x04CC73 $8C63: C-----  01 00    ORA  ($00,X)
  0x04CC75 $8C65: C-----  00       BRK  
  0x04CC76 $8C66: C-----  00       BRK  
  0x04CC77 $8C67: C-----  00       BRK  
  0x04CC78 $8C68: C-----  01 01    ORA  ($01,X)
  0x04CC7A $8C6A: C-----  00       BRK  
  0x04CC7B $8C6B: C-----  00       BRK  
  0x04CC7C $8C6C: C-----  00       BRK  
  0x04CC7D $8C6D: C-----  00       BRK  
  0x04CC7E $8C6E: C-----  00       BRK  
  0x04CC7F $8C6F: C-----  00       BRK  
  0x04CC80 $8C70: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CC81 $8C71: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CC82 $8C72: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CC83 $8C73: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CC84 $8C74: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04CC85 $8C75: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04CC86 $8C76: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04CC87 $8C77: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04CC88 $8C78: C-----  C0 C7    CPY  #$C7
  0x04CC8A $8C7A: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04CC8B $8C7B: C-----  C0 60    CPY  #$60
  0x04CC8D $8C7D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04CC8E $8C7E: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04CC8F $8C7F: C-----  18       CLC  
  0x04CC90 $8C80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC91 $8C81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC92 $8C82: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CC93 $8C83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC94 $8C84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC95 $8C85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CC96 $8C86: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04CC97 $8C87: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CC98 $8C88: C-----  00       BRK  
  0x04CC99 $8C89: C-----  00       BRK  
  0x04CC9A $8C8A: C-----  00       BRK  
  0x04CC9B $8C8B: C-----  00       BRK  
  0x04CC9C $8C8C: C-----  00       BRK  
  0x04CC9D $8C8D: C-----  00       BRK  
  0x04CC9E $8C8E: C-----  00       BRK  
  0x04CC9F $8C8F: C-----  00       BRK  
  0x04CCA0 $8C90: C-----  F9 F9 F2 SBC  $F2F9,Y
  0x04CCA3 $8C93: C-----  E6 CC    INC  $CC
  0x04CCA5 $8C95: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04CCA6 $8C96: C-----  F8       SED  
  0x04CCA7 $8C97: C-----  F8       SED  
  0x04CCA8 $8C98: C-----  00       BRK  
  0x04CCA9 $8C99: C-----  00       BRK  
  0x04CCAA $8C9A: C-----  00       BRK  
  0x04CCAB $8C9B: C-----  00       BRK  
  0x04CCAC $8C9C: C-----  00       BRK  
  0x04CCAD $8C9D: C-----  00       BRK  
  0x04CCAE $8C9E: C-----  00       BRK  
  0x04CCAF $8C9F: C-----  00       BRK  
  0x04CCB0 $8CA0: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04CCB1 $8CA1: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04CCB2 $8CA2: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04CCB3 $8CA3: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04CCB4 $8CA4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CCB5 $8CA5: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04CCB6 $8CA6: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04CCB7 $8CA7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04CCB8 $8CA8: C-----  00       BRK  
  0x04CCB9 $8CA9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CCBA $8CAA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CCBB $8CAB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CCBC $8CAC: C-----  05 05    ORA  $05
  0x04CCBE $8CAE: C-----  05 05    ORA  $05
  0x04CCC0 $8CB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCC1 $8CB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCC2 $8CB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCC3 $8CB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCC4 $8CB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCC5 $8CB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCC6 $8CB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCC7 $8CB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCC8 $8CB8: C-----  00       BRK  
  0x04CCC9 $8CB9: C-----  40       RTI  
  0x04CCCA $8CBA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CCCB $8CBB: C-----  90 B0    BCC  $8C6D
  0x04CCCD $8CBD: C-----  A0 A0    LDY  #$A0
  0x04CCCF $8CBF: C-----  E1 06    SBC  ($06,X)
  0x04CCD1 $8CC1: C-----  0A       ASL  A
  0x04CCD2 $8CC2: C-----  0A       ASL  A
  0x04CCD3 $8CC3: C-----  0D 0B 04 ORA  $040B
  0x04CCD6 $8CC6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CCD7 $8CC7: C-----  0A       ASL  A
  0x04CCD8 $8CC8: C-----  01 01    ORA  ($01,X)
  0x04CCDA $8CCA: C-----  01 00    ORA  ($00,X)
  0x04CCDC $8CCC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CCDD $8CCD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CCDE $8CCE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CCDF $8CCF: C-----  01 A0    ORA  ($A0,X)
  0x04CCE1 $8CD1: C-----  70 1A    BVS  $8CED
  0x04CCE3 $8CD3: C-----  05 03    ORA  $03
  0x04CCE5 $8CD5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CCE6 $8CD6: C-----  01 00    ORA  ($00,X)
  0x04CCE8 $8CD8: C-----  00       BRK  
  0x04CCE9 $8CD9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CCEA $8CDA: C-----  E0 F8    CPX  #$F8
  0x04CCEC $8CDC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CCED $8CDD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CCEE $8CDE: C-----  FE FF 7F INC  $7FFF,X
  0x04CCF1 $8CE1: C-----  FE FC F9 INC  $F9FC,X
  0x04CCF4 $8CE4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CCF5 $8CE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCF6 $8CE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCF7 $8CE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CCF8 $8CE8: C-----  00       BRK  
  0x04CCF9 $8CE9: C-----  00       BRK  
  0x04CCFA $8CEA: C-----  00       BRK  
  0x04CCFB $8CEB: C-----  00       BRK  
  0x04CCFC $8CEC: C-----  00       BRK  
  0x04CCFD $8CED: C-----  00       BRK  
  0x04CCFE $8CEE: C-----  00       BRK  
  0x04CCFF $8CEF: C-----  00       BRK  
  0x04CD00 $8CF0: C-----  3E 7E FE ROL  $FE7E,X
  0x04CD03 $8CF3: C-----  FE FE FC INC  $FCFE,X
  0x04CD06 $8CF6: C-----  FD FD 00 SBC  $00FD,X
  0x04CD09 $8CF9: C-----  00       BRK  
  0x04CD0A $8CFA: C-----  00       BRK  
  0x04CD0B $8CFB: C-----  00       BRK  
  0x04CD0C $8CFC: C-----  00       BRK  
  0x04CD0D $8CFD: C-----  00       BRK  
  0x04CD0E $8CFE: C-----  00       BRK  
  0x04CD0F $8CFF: C-----  00       BRK  
  0x04CD10 $8D00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD11 $8D01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD12 $8D02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD13 $8D03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD14 $8D04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD15 $8D05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD16 $8D06: C-----  21 00    AND  ($00,X)
  0x04CD18 $8D08: C-----  10 30    BPL  $8D3A
  0x04CD1A $8D0A: C-----  70 F9    BVS  $8D05
  0x04CD1C $8D0C: C-----  BC C0 FC LDY  $FCC0,X
  0x04CD1F $8D0F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CD20 $8D10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD21 $8D11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD22 $8D12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD23 $8D13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD24 $8D14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD25 $8D15: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04CD26 $8D16: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04CD27 $8D17: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04CD28 $8D18: C-----  00       BRK  
  0x04CD29 $8D19: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04CD2A $8D1A: C-----  C0 01    CPY  #$01
  0x04CD2C $8D1C: C-----  08       PHP  
  0x04CD2D $8D1D: C-----  A4 D6    LDY  $D6
  0x04CD2F $8D1F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CD30 $8D20: C-----  E1 F0    SBC  ($F0,X)
  0x04CD32 $8D22: C-----  F8       SED  
  0x04CD33 $8D23: C-----  F8       SED  
  0x04CD34 $8D24: C-----  F8       SED  
  0x04CD35 $8D25: C-----  F0 F0    BEQ  $8D17
  0x04CD37 $8D27: C-----  C0 1F    CPY  #$1F
  0x04CD39 $8D29: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CD3A $8D2A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04CD3B $8D2B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CD3C $8D2C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04CD3D $8D2D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04CD3E $8D2E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04CD3F $8D2F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CD40 $8D30: C-----  F0 E0    BEQ  $8D12
  0x04CD42 $8D32: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CD43 $8D33: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CD44 $8D34: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CD45 $8D35: C-----  1E 3C 73 ASL  $733C,X
  0x04CD48 $8D38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD49 $8D39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CD4A $8D3A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CD4B $8D3B: C-----  F8       SED  
  0x04CD4C $8D3C: C-----  F0 E1    BEQ  $8D1F
  0x04CD4E $8D3E: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04CD4F $8D3F: C-----  8C 08 3C STY  $3C08
  0x04CD52 $8D42: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04CD53 $8D43: C-----  3E 3F 3E ROL  $3E3F,X
  0x04CD56 $8D46: C-----  3E 3E 00 ROL  $003E,X
  0x04CD59 $8D49: C-----  00       BRK  
  0x04CD5A $8D4A: C-----  10 28    BPL  $8D74
  0x04CD5C $8D4C: C-----  2A       ROL  A
  0x04CD5D $8D4D: C-----  26 32    ROL  $32
  0x04CD5F $8D4F: C-----  3E 3F 3F ROL  $3F3F,X
  0x04CD62 $8D52: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CD63 $8D53: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CD64 $8D54: C-----  3E 3E 1C ROL  $1C3E,X
  0x04CD67 $8D57: C-----  00       BRK  
  0x04CD68 $8D58: C-----  18       CLC  
  0x04CD69 $8D59: C-----  2A       ROL  A
  0x04CD6A $8D5A: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04CD6B $8D5B: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04CD6C $8D5C: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x04CD6D $8D5D: C-----  3E 1C 00 ROL  $001C,X
  0x04CD70 $8D60: C-----  00       BRK  
  0x04CD71 $8D61: C-----  00       BRK  
  0x04CD72 $8D62: C-----  00       BRK  
  0x04CD73 $8D63: C-----  00       BRK  
  0x04CD74 $8D64: C-----  00       BRK  
  0x04CD75 $8D65: C-----  E0 80    CPX  #$80
  0x04CD77 $8D67: C-----  60       RTS  
  0x04CD78 $8D68: C-----  00       BRK  
  0x04CD79 $8D69: C-----  00       BRK  
  0x04CD7A $8D6A: C-----  00       BRK  
  0x04CD7B $8D6B: C-----  00       BRK  
  0x04CD7C $8D6C: C-----  00       BRK  
  0x04CD7D $8D6D: C-----  00       BRK  
  0x04CD7E $8D6E: C-----  00       BRK  
  0x04CD7F $8D6F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CD80 $8D70: C-----  06 0E    ASL  $0E
  0x04CD82 $8D72: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CD83 $8D73: C-----  38       SEC  
  0x04CD84 $8D74: C-----  F0 E0    BEQ  $8D56
  0x04CD86 $8D76: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CD87 $8D77: C-----  00       BRK  
  0x04CD88 $8D78: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CD89 $8D79: C-----  F8       SED  
  0x04CD8A $8D7A: C-----  F0 C0    BEQ  $8D3C
  0x04CD8C $8D7C: C-----  00       BRK  
  0x04CD8D $8D7D: C-----  00       BRK  
  0x04CD8E $8D7E: C-----  00       BRK  
  0x04CD8F $8D7F: C-----  00       BRK  
  0x04CD90 $8D80: C-----  0A       ASL  A
  0x04CD91 $8D81: C-----  0D 0B 04 ORA  $040B
  0x04CD94 $8D84: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CD95 $8D85: C-----  05 03    ORA  $03
  0x04CD97 $8D87: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CD98 $8D88: C-----  01 00    ORA  ($00,X)
  0x04CD9A $8D8A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CD9B $8D8B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CD9C $8D8C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CD9D $8D8D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CD9E $8D8E: C-----  00       BRK  
  0x04CD9F $8D8F: C-----  00       BRK  
  0x04CDA0 $8D90: C-----  30 78    BMI  $8E0A
  0x04CDA2 $8D92: C-----  7E FF FF ROR  $FFFF,X
  0x04CDA5 $8D95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDA6 $8D96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDA7 $8D97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDA8 $8D98: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04CDA9 $8D99: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04CDAA $8D9A: C-----  B9 7A 7F LDA  $7F7A,Y
  0x04CDAD $8D9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDAE $8D9E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CDAF $8D9F: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04CDB0 $8DA0: C-----  05 05    ORA  $05
  0x04CDB2 $8DA2: C-----  05 05    ORA  $05
  0x04CDB4 $8DA4: C-----  05 09    ORA  $09
  0x04CDB6 $8DA6: C-----  0A       ASL  A
  0x04CDB7 $8DA7: C-----  0A       ASL  A
  0x04CDB8 $8DA8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CDB9 $8DA9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CDBA $8DAA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CDBB $8DAB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CDBC $8DAC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CDBD $8DAD: C-----  06 05    ASL  $05
  0x04CDBF $8DAF: C-----  05 FF    ORA  $FF
  0x04CDC1 $8DB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDC2 $8DB2: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04CDC3 $8DB3: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04CDC4 $8DB4: C-----  15 19    ORA  $19,X
  0x04CDC6 $8DB6: C-----  0D 01 F7 ORA  $F701
  0x04CDC9 $8DB9: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04CDCA $8DBA: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04CDCB $8DBB: C-----  C1 C0    CMP  ($C0,X)
  0x04CDCD $8DBD: C-----  C1 C1    CMP  ($C1,X)
  0x04CDCF $8DBF: C-----  C1 00    CMP  ($00,X)
  0x04CDD1 $8DC1: C-----  00       BRK  
  0x04CDD2 $8DC2: C-----  00       BRK  
  0x04CDD3 $8DC3: C-----  00       BRK  
  0x04CDD4 $8DC4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CDD5 $8DC5: C-----  90 F0    BCC  $8DB7
  0x04CDD7 $8DC7: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04CDD8 $8DC8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDD9 $8DC9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDDA $8DCA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDDB $8DCB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDDC $8DCC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CDDD $8DCD: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04CDDE $8DCE: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CDDF $8DCF: C-----  AD 50 20 LDA  $2050
  0x04CDE2 $8DD2: C-----  10 10    BPL  $8DE4
  0x04CDE4 $8DD4: C-----  08       PHP  
  0x04CDE5 $8DD5: C-----  08       PHP  
  0x04CDE6 $8DD6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CDE7 $8DD7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CDE8 $8DD8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CDE9 $8DD9: C-----  C0 E0    CPY  #$E0
  0x04CDEB $8DDB: C-----  E0 F0    CPX  #$F0
  0x04CDED $8DDD: C-----  F0 F8    BEQ  $8DD7
  0x04CDEF $8DDF: C-----  F8       SED  
  0x04CDF0 $8DE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDF1 $8DE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDF2 $8DE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDF3 $8DE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDF4 $8DE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDF5 $8DE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDF6 $8DE6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CDF7 $8DE7: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04CDF8 $8DE8: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04CDF9 $8DE9: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04CDFA $8DEA: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CDFB $8DEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CDFC $8DEC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CDFD $8DED: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CDFE $8DEE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CDFF $8DEF: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CE00 $8DF0: C-----  38       SEC  
  0x04CE01 $8DF1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CE02 $8DF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE03 $8DF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE04 $8DF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE05 $8DF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE06 $8DF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE07 $8DF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE08 $8DF8: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04CE09 $8DF9: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04CE0A $8DFA: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04CE0B $8DFB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE0C $8DFC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE0D $8DFD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE0E $8DFE: C-----  F0 01    BEQ  $8E01
  0x04CE10 $8E00: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04CE11 $8E01: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CE12 $8E02: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CE13 $8E03: C-----  06 06    ASL  $06
  0x04CE15 $8E05: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CE16 $8E06: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CE17 $8E07: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CE18 $8E08: C-----  05 01    ORA  $01
  0x04CE1A $8E0A: C-----  01 03    ORA  ($03,X)
  0x04CE1C $8E0C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CE1D $8E0D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CE1E $8E0E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CE1F $8E0F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CE20 $8E10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE21 $8E11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE22 $8E12: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CE23 $8E13: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CE24 $8E14: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CE25 $8E15: C-----  1D 19 0C ORA  $0C19,X
  0x04CE28 $8E18: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04CE29 $8E19: C-----  E6 F6    INC  $F6
  0x04CE2B $8E1B: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04CE2C $8E1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE2D $8E1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE2E $8E1E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE2F $8E1F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CE30 $8E20: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CE31 $8E21: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CE32 $8E22: C-----  01 01    ORA  ($01,X)
  0x04CE34 $8E24: C-----  00       BRK  
  0x04CE35 $8E25: C-----  00       BRK  
  0x04CE36 $8E26: C-----  00       BRK  
  0x04CE37 $8E27: C-----  00       BRK  
  0x04CE38 $8E28: C-----  01 01    ORA  ($01,X)
  0x04CE3A $8E2A: C-----  00       BRK  
  0x04CE3B $8E2B: C-----  00       BRK  
  0x04CE3C $8E2C: C-----  00       BRK  
  0x04CE3D $8E2D: C-----  00       BRK  
  0x04CE3E $8E2E: C-----  00       BRK  
  0x04CE3F $8E2F: C-----  00       BRK  
  0x04CE40 $8E30: C-----  06 02    ASL  $02
  0x04CE42 $8E32: C-----  08       PHP  
  0x04CE43 $8E33: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CE44 $8E34: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CE45 $8E35: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CE46 $8E36: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04CE47 $8E37: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04CE48 $8E38: C-----  F9 FD F7 SBC  $F7FD,Y
  0x04CE4B $8E3B: C-----  F0 77    BEQ  $8EB4
  0x04CE4D $8E3D: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04CE4E $8E3E: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04CE4F $8E3F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CE50 $8E40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE51 $8E41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE52 $8E42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE53 $8E43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE54 $8E44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE55 $8E45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE56 $8E46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE57 $8E47: C-----  FE 08 10 INC  $1008,X
  0x04CE5A $8E4A: C-----  30 78    BMI  $8EC4
  0x04CE5C $8E4C: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04CE5D $8E4D: C-----  B8       CLV  
  0x04CE5E $8E4E: C-----  FE FF FF INC  $FFFF,X
  0x04CE61 $8E51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE62 $8E52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE63 $8E53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE64 $8E54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE65 $8E55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE66 $8E56: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04CE67 $8E57: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04CE68 $8E58: C-----  00       BRK  
  0x04CE69 $8E59: C-----  40       RTI  
  0x04CE6A $8E5A: C-----  84 98    STY  $98
  0x04CE6C $8E5C: C-----  A1 06    LDA  ($06,X)
  0x04CE6E $8E5E: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04CE6F $8E5F: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04CE70 $8E60: C-----  01 01    ORA  ($01,X)
  0x04CE72 $8E62: C-----  00       BRK  
  0x04CE73 $8E63: C-----  C0 E0    CPY  #$E0
  0x04CE75 $8E65: C-----  E0 C0    CPX  #$C0
  0x04CE77 $8E67: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CE78 $8E68: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE79 $8E69: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE7A $8E6A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE7B $8E6B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CE7C $8E6C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04CE7D $8E6D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04CE7E $8E6E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04CE7F $8E6F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CE80 $8E70: C-----  F8       SED  
  0x04CE81 $8E71: C-----  F8       SED  
  0x04CE82 $8E72: C-----  F1 01    SBC  ($01),Y
  0x04CE84 $8E74: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04CE85 $8E75: C-----  00       BRK  
  0x04CE86 $8E76: C-----  00       BRK  
  0x04CE87 $8E77: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CE88 $8E78: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04CE89 $8E79: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04CE8A $8E7A: C-----  FE FE FD INC  $FDFE,X
  0x04CE8D $8E7D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE8E $8E7E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CE8F $8E7F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CE90 $8E80: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CE91 $8E81: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CE92 $8E82: C-----  08       PHP  
  0x04CE93 $8E83: C-----  01 03    ORA  ($03,X)
  0x04CE95 $8E85: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CE96 $8E86: C-----  01 01    ORA  ($01,X)
  0x04CE98 $8E88: C-----  00       BRK  
  0x04CE99 $8E89: C-----  00       BRK  
  0x04CE9A $8E8A: C-----  00       BRK  
  0x04CE9B $8E8B: C-----  00       BRK  
  0x04CE9C $8E8C: C-----  00       BRK  
  0x04CE9D $8E8D: C-----  00       BRK  
  0x04CE9E $8E8E: C-----  00       BRK  
  0x04CE9F $8E8F: C-----  00       BRK  
  0x04CEA0 $8E90: C-----  E0 F0    CPX  #$F0
  0x04CEA2 $8E92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CEA3 $8E93: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CEA4 $8E94: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CEA5 $8E95: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CEA6 $8E96: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CEA7 $8E97: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CEA8 $8E98: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CEA9 $8E99: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CEAA $8E9A: C-----  00       BRK  
  0x04CEAB $8E9B: C-----  00       BRK  
  0x04CEAC $8E9C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CEAD $8E9D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CEAE $8E9E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CEAF $8E9F: C-----  00       BRK  
  0x04CEB0 $8EA0: C-----  0A       ASL  A
  0x04CEB1 $8EA1: C-----  0A       ASL  A
  0x04CEB2 $8EA2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04CEB3 $8EA3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CEB4 $8EA4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CEB5 $8EA5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CEB6 $8EA6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CEB7 $8EA7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CEB8 $8EA8: C-----  05 05    ORA  $05
  0x04CEBA $8EAA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CEBB $8EAB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CEBC $8EAC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CEBD $8EAD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CEBE $8EAE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CEBF $8EAF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CEC0 $8EB0: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CEC1 $8EB1: C-----  00       BRK  
  0x04CEC2 $8EB2: C-----  00       BRK  
  0x04CEC3 $8EB3: C-----  00       BRK  
  0x04CEC4 $8EB4: C-----  00       BRK  
  0x04CEC5 $8EB5: C-----  00       BRK  
  0x04CEC6 $8EB6: C-----  01 07    ORA  ($07,X)
  0x04CEC8 $8EB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CEC9 $8EB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CECA $8EBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CECB $8EBB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CECC $8EBC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CECD $8EBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CECE $8EBE: C-----  FE FB 07 INC  $07FB,X
  0x04CED1 $8EC1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CED2 $8EC2: C-----  FE FC F8 INC  $F8FC,X
  0x04CED5 $8EC5: C-----  F0 F0    BEQ  $8EB7
  0x04CED7 $8EC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CED8 $8EC8: C-----  F9 C7 3F SBC  $3FC7,Y
  0x04CEDB $8ECB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CEDC $8ECC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CEDD $8ECD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CEDE $8ECE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CEDF $8ECF: C-----  00       BRK  
  0x04CEE0 $8ED0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CEE1 $8ED1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CEE2 $8ED2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CEE3 $8ED3: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04CEE4 $8ED4: C-----  0E 1C F0 ASL  $F01C
  0x04CEE7 $8ED7: C-----  C0 FE    CPY  #$FE
  0x04CEE9 $8ED9: C-----  FE FC FC INC  $FCFC,X
  0x04CEEC $8EDC: C-----  F8       SED  
  0x04CEED $8EDD: C-----  E0 00    CPX  #$00
  0x04CEEF $8EDF: C-----  00       BRK  
  0x04CEF0 $8EE0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CEF1 $8EE1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CEF2 $8EE2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CEF3 $8EE3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CEF4 $8EE4: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04CEF5 $8EE5: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04CEF6 $8EE6: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04CEF7 $8EE7: C-----  C0 FB    CPY  #$FB
  0x04CEF9 $8EE9: C-----  F9 F8 FB SBC  $FBF8,Y
  0x04CEFC $8EEC: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04CEFD $8EED: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04CEFE $8EEE: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04CEFF $8EEF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CF00 $8EF0: C-----  E0 E0    CPX  #$E0
  0x04CF02 $8EF2: C-----  F0 78    BEQ  $8F6C
  0x04CF04 $8EF4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CF05 $8EF5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CF06 $8EF6: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04CF07 $8EF7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CF08 $8EF8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CF09 $8EF9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CF0A $8EFA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CF0B $8EFB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CF0C $8EFC: C-----  20 1F 07 JSR  $071F
  0x04CF0F $8EFF: C-----  00       BRK  
  0x04CF10 $8F00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF11 $8F01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF12 $8F02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF13 $8F03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF14 $8F04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF15 $8F05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF16 $8F06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF17 $8F07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF18 $8F08: C-----  00       BRK  
  0x04CF19 $8F09: C-----  00       BRK  
  0x04CF1A $8F0A: C-----  00       BRK  
  0x04CF1B $8F0B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CF1C $8F0C: C-----  84 CE    STY  $CE
  0x04CF1E $8F0E: C-----  8A       TXA  
  0x04CF1F $8F0F: C-----  96 FF    STX  $FF,Y
  0x04CF21 $8F11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF22 $8F12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF23 $8F13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF24 $8F14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF25 $8F15: C-----  FE F8 E2 INC  $E2F8,X
  0x04CF28 $8F18: C-----  00       BRK  
  0x04CF29 $8F19: C-----  00       BRK  
  0x04CF2A $8F1A: C-----  00       BRK  
  0x04CF2B $8F1B: C-----  00       BRK  
  0x04CF2C $8F1C: C-----  00       BRK  
  0x04CF2D $8F1D: C-----  00       BRK  
  0x04CF2E $8F1E: C-----  00       BRK  
  0x04CF2F $8F1F: C-----  00       BRK  
  0x04CF30 $8F20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF31 $8F21: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04CF32 $8F22: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04CF33 $8F23: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CF34 $8F24: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04CF35 $8F25: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CF36 $8F26: C-----  F8       SED  
  0x04CF37 $8F27: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CF38 $8F28: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04CF39 $8F29: C-----  2C 54 88 BIT  $8854
  0x04CF3C $8F2C: C-----  70 C0    BVS  $8EEE
  0x04CF3E $8F2E: C-----  00       BRK  
  0x04CF3F $8F2F: C-----  00       BRK  
  0x04CF40 $8F30: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CF41 $8F31: C-----  F0 C0    BEQ  $8EF3
  0x04CF43 $8F33: C-----  00       BRK  
  0x04CF44 $8F34: C-----  C0 80    CPY  #$80
  0x04CF46 $8F36: C-----  00       BRK  
  0x04CF47 $8F37: C-----  00       BRK  
  0x04CF48 $8F38: C-----  00       BRK  
  0x04CF49 $8F39: C-----  00       BRK  
  0x04CF4A $8F3A: C-----  00       BRK  
  0x04CF4B $8F3B: C-----  00       BRK  
  0x04CF4C $8F3C: C-----  00       BRK  
  0x04CF4D $8F3D: C-----  00       BRK  
  0x04CF4E $8F3E: C-----  00       BRK  
  0x04CF4F $8F3F: C-----  00       BRK  
  0x04CF50 $8F40: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x04CF51 $8F41: C-----  81 81    STA  ($81,X)
  0x04CF53 $8F43: C-----  C0 40    CPY  #$40
  0x04CF55 $8F45: C-----  00       BRK  
  0x04CF56 $8F46: C-----  00       BRK  
  0x04CF57 $8F47: C-----  F0 EF    BEQ  $8F38
  0x04CF59 $8F49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF5A $8F4A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CF5B $8F4B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CF5C $8F4C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04CF5D $8F4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF5E $8F4E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF5F $8F4F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04CF60 $8F50: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04CF61 $8F51: C-----  D5 D4    CMP  $D4,X
  0x04CF63 $8F53: C-----  D8       CLD  
  0x04CF64 $8F54: C-----  4C 00 00 JMP  $0000
  0x04CF67 $8F57: C-----  00       BRK  
  0x04CF68 $8F58: C-----  C0 C0    CPY  #$C0
  0x04CF6A $8F5A: C-----  C0 C0    CPY  #$C0
  0x04CF6C $8F5C: C-----  C1 C1    CMP  ($C1,X)
  0x04CF6E $8F5E: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04CF6F $8F5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF70 $8F60: C-----  F8       SED  
  0x04CF71 $8F61: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CF72 $8F62: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CF73 $8F63: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CF74 $8F64: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CF75 $8F65: C-----  F8       SED  
  0x04CF76 $8F66: C-----  F0 C0    BEQ  $8F28
  0x04CF78 $8F68: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CF79 $8F69: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CF7A $8F6A: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04CF7B $8F6B: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04CF7C $8F6C: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04CF7D $8F6D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04CF7E $8F6E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04CF7F $8F6F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CF80 $8F70: C-----  00       BRK  
  0x04CF81 $8F71: C-----  00       BRK  
  0x04CF82 $8F72: C-----  00       BRK  
  0x04CF83 $8F73: C-----  00       BRK  
  0x04CF84 $8F74: C-----  00       BRK  
  0x04CF85 $8F75: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CF86 $8F76: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04CF87 $8F77: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04CF88 $8F78: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF89 $8F79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF8A $8F7A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF8B $8F7B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF8C $8F7C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CF8D $8F7D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CF8E $8F7E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04CF8F $8F7F: C-----  F8       SED  
  0x04CF90 $8F80: C-----  E0 B0    CPX  #$B0
  0x04CF92 $8F82: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04CF93 $8F83: C-----  00       BRK  
  0x04CF94 $8F84: C-----  00       BRK  
  0x04CF95 $8F85: C-----  38       SEC  
  0x04CF96 $8F86: C-----  46 81    LSR  $81
  0x04CF98 $8F88: C-----  00       BRK  
  0x04CF99 $8F89: C-----  00       BRK  
  0x04CF9A $8F8A: C-----  00       BRK  
  0x04CF9B $8F8B: C-----  00       BRK  
  0x04CF9C $8F8C: C-----  00       BRK  
  0x04CF9D $8F8D: C-----  00       BRK  
  0x04CF9E $8F8E: C-----  38       SEC  
  0x04CF9F $8F8F: C-----  7E F0 E0 ROR  $E0F0,X
  0x04CFA2 $8F92: C-----  C0 80    CPY  #$80
  0x04CFA4 $8F94: C-----  00       BRK  
  0x04CFA5 $8F95: C-----  00       BRK  
  0x04CFA6 $8F96: C-----  00       BRK  
  0x04CFA7 $8F97: C-----  00       BRK  
  0x04CFA8 $8F98: C-----  00       BRK  
  0x04CFA9 $8F99: C-----  00       BRK  
  0x04CFAA $8F9A: C-----  00       BRK  
  0x04CFAB $8F9B: C-----  00       BRK  
  0x04CFAC $8F9C: C-----  00       BRK  
  0x04CFAD $8F9D: C-----  00       BRK  
  0x04CFAE $8F9E: C-----  00       BRK  
  0x04CFAF $8F9F: C-----  00       BRK  
  0x04CFB0 $8FA0: C-----  E6 CE    INC  $CE
  0x04CFB2 $8FA2: C-----  FE FE FE INC  $FEFE,X
  0x04CFB5 $8FA5: C-----  FE FF FF INC  $FFFF,X
  0x04CFB8 $8FA8: C-----  19 F5 8D ORA  $8DF5,Y
  0x04CFBB $8FAB: C-----  BD FD FD LDA  $FDFD,X
  0x04CFBE $8FAE: C-----  78       SEI  
  0x04CFBF $8FAF: C-----  31 04    AND  ($04),Y
  0x04CFC1 $8FB1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CFC2 $8FB2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CFC3 $8FB3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CFC4 $8FB4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04CFC5 $8FB5: C-----  C4 E8    CPY  $E8
  0x04CFC7 $8FB7: C-----  F8       SED  
  0x04CFC8 $8FB8: C-----  F8       SED  
  0x04CFC9 $8FB9: C-----  F8       SED  
  0x04CFCA $8FBA: C-----  F8       SED  
  0x04CFCB $8FBB: C-----  F8       SED  
  0x04CFCC $8FBC: C-----  F8       SED  
  0x04CFCD $8FBD: C-----  38       SEC  
  0x04CFCE $8FBE: C-----  D0 E0    BNE  $8FA0
  0x04CFD0 $8FC0: C-----  01 07    ORA  ($07,X)
  0x04CFD2 $8FC2: C-----  1E 78 F0 ASL  $F078,X
  0x04CFD5 $8FC5: C-----  C0 00    CPY  #$00
  0x04CFD7 $8FC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CFD8 $8FC8: C-----  FE F9 E7 INC  $E7F9,X
  0x04CFDB $8FCB: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04CFDC $8FCC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CFDD $8FCD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CFDE $8FCE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04CFDF $8FCF: C-----  00       BRK  
  0x04CFE0 $8FD0: C-----  00       BRK  
  0x04CFE1 $8FD1: C-----  00       BRK  
  0x04CFE2 $8FD2: C-----  00       BRK  
  0x04CFE3 $8FD3: C-----  00       BRK  
  0x04CFE4 $8FD4: C-----  00       BRK  
  0x04CFE5 $8FD5: C-----  38       SEC  
  0x04CFE6 $8FD6: C-----  46 81    LSR  $81
  0x04CFE8 $8FD8: C-----  00       BRK  
  0x04CFE9 $8FD9: C-----  00       BRK  
  0x04CFEA $8FDA: C-----  00       BRK  
  0x04CFEB $8FDB: C-----  00       BRK  
  0x04CFEC $8FDC: C-----  00       BRK  
  0x04CFED $8FDD: C-----  00       BRK  
  0x04CFEE $8FDE: C-----  38       SEC  
  0x04CFEF $8FDF: C-----  7E FF FF ROR  $FFFF,X
  0x04CFF2 $8FE2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04CFF3 $8FE3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CFF4 $8FE4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CFF5 $8FE5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04CFF6 $8FE6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04CFF7 $8FE7: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04CFF8 $8FE8: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04CFF9 $8FE9: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04CFFA $8FEA: C-----  E5 ED    SBC  $ED
  0x04CFFC $8FEC: C-----  E8       INX  
  0x04CFFD $8FED: C-----  D6 E1    DEC  $E1,X
  0x04CFFF $8FEF: C-----  EE F8 F0 INC  $F0F8
  0x04D002 $8FF2: C-----  F0 E0    BEQ  $8FD4
  0x04D004 $8FF4: C-----  E0 C0    CPX  #$C0
  0x04D006 $8FF6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D007 $8FF7: C-----  00       BRK  
  0x04D008 $8FF8: C-----  20 A0 A0 JSR  $A0A0
  0x04D00B $8FFB: C-----  40       RTI  
  0x04D00C $8FFC: C-----  C0 80    CPY  #$80
  0x04D00E $8FFE: C-----  00       BRK  
  0x04D00F $8FFF: C-----  00       BRK  
  0x04D010 $9000: C-----  00       BRK  
  0x04D011 $9001: C-----  00       BRK  
  0x04D012 $9002: C-----  00       BRK  
  0x04D013 $9003: C-----  00       BRK  
  0x04D014 $9004: C-----  00       BRK  
  0x04D015 $9005: C-----  00       BRK  
  0x04D016 $9006: C-----  00       BRK  
  0x04D017 $9007: C-----  00       BRK  
  0x04D018 $9008: C-----  00       BRK  
  0x04D019 $9009: C-----  00       BRK  
  0x04D01A $900A: C-----  00       BRK  
  0x04D01B $900B: C-----  00       BRK  
  0x04D01C $900C: C-----  00       BRK  
  0x04D01D $900D: C-----  00       BRK  
  0x04D01E $900E: C-----  00       BRK  
  0x04D01F $900F: C-----  00       BRK  
  0x04D020 $9010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D021 $9011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D022 $9012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D023 $9013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D024 $9014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D025 $9015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D026 $9016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D027 $9017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D028 $9018: C-----  00       BRK  
  0x04D029 $9019: C-----  00       BRK  
  0x04D02A $901A: C-----  00       BRK  
  0x04D02B $901B: C-----  00       BRK  
  0x04D02C $901C: C-----  00       BRK  
  0x04D02D $901D: C-----  00       BRK  
  0x04D02E $901E: C-----  00       BRK  
  0x04D02F $901F: C-----  00       BRK  
  0x04D030 $9020: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D031 $9021: C-----  05 07    ORA  $07
  0x04D033 $9023: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D034 $9024: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D035 $9025: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D036 $9026: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D037 $9027: C-----  01 00    ORA  ($00,X)
  0x04D039 $9029: C-----  00       BRK  
  0x04D03A $902A: C-----  00       BRK  
  0x04D03B $902B: C-----  00       BRK  
  0x04D03C $902C: C-----  00       BRK  
  0x04D03D $902D: C-----  00       BRK  
  0x04D03E $902E: C-----  00       BRK  
  0x04D03F $902F: C-----  00       BRK  
  0x04D040 $9030: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D041 $9031: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D042 $9032: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D043 $9033: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D044 $9034: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D045 $9035: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D046 $9036: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D047 $9037: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D048 $9038: C-----  08       PHP  
  0x04D049 $9039: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04D04A $903A: C-----  3E 7F 63 ROL  $637F,X
  0x04D04D $903D: C-----  C1 A8    CMP  ($A8,X)
  0x04D04F $903F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D050 $9040: C-----  01 0C    ORA  ($0C,X)
  0x04D052 $9042: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D053 $9043: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04D054 $9044: C-----  0D 07 07 ORA  $0707
  0x04D057 $9047: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D058 $9048: C-----  00       BRK  
  0x04D059 $9049: C-----  00       BRK  
  0x04D05A $904A: C-----  00       BRK  
  0x04D05B $904B: C-----  00       BRK  
  0x04D05C $904C: C-----  00       BRK  
  0x04D05D $904D: C-----  00       BRK  
  0x04D05E $904E: C-----  00       BRK  
  0x04D05F $904F: C-----  00       BRK  
  0x04D060 $9050: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D061 $9051: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D062 $9052: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04D063 $9053: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04D064 $9054: C-----  60       RTS  
  0x04D065 $9055: C-----  70 7F    BVS  $90D6
  0x04D067 $9057: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D068 $9058: C-----  38       SEC  
  0x04D069 $9059: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04D06A $905A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D06B $905B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D06C $905C: C-----  00       BRK  
  0x04D06D $905D: C-----  20 7E 7F JSR  $7F7E
  0x04D070 $9060: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D071 $9061: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D072 $9062: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D073 $9063: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D074 $9064: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D075 $9065: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D076 $9066: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D077 $9067: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D078 $9068: C-----  00       BRK  
  0x04D079 $9069: C-----  00       BRK  
  0x04D07A $906A: C-----  00       BRK  
  0x04D07B $906B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D07C $906C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D07D $906D: C-----  E0 E0    CPX  #$E0
  0x04D07F $906F: C-----  F8       SED  
  0x04D080 $9070: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D081 $9071: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D082 $9072: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04D083 $9073: C-----  C5 26    CMP  $26
  0x04D085 $9075: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04D086 $9076: C-----  00       BRK  
  0x04D087 $9077: C-----  10 F0    BPL  $9069
  0x04D089 $9079: C-----  F0 E0    BEQ  $905B
  0x04D08B $907B: C-----  C0 00    CPY  #$00
  0x04D08D $907D: C-----  00       BRK  
  0x04D08E $907E: C-----  00       BRK  
  0x04D08F $907F: C-----  00       BRK  
  0x04D090 $9080: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D091 $9081: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D092 $9082: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D093 $9083: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D094 $9084: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D095 $9085: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D096 $9086: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D097 $9087: C-----  0A       ASL  A
  0x04D098 $9088: C-----  00       BRK  
  0x04D099 $9089: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D09A $908A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D09B $908B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D09C $908C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D09D $908D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D09E $908E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D09F $908F: C-----  05 0F    ORA  $0F
  0x04D0A1 $9091: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D0A2 $9092: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D0A3 $9093: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D0A4 $9094: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D0A5 $9095: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D0A6 $9096: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D0A7 $9097: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D0A8 $9098: C-----  F0 EE    BEQ  $9088
  0x04D0AA $909A: C-----  D9 D6 F4 CMP  $F4D6,Y
  0x04D0AD $909D: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x04D0AE $909E: C-----  B1 FF    LDA  ($FF),Y
  0x04D0B0 $90A0: C-----  0A       ASL  A
  0x04D0B1 $90A1: C-----  0A       ASL  A
  0x04D0B2 $90A2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04D0B3 $90A3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D0B4 $90A4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D0B5 $90A5: C-----  08       PHP  
  0x04D0B6 $90A6: C-----  08       PHP  
  0x04D0B7 $90A7: C-----  08       PHP  
  0x04D0B8 $90A8: C-----  05 05    ORA  $05
  0x04D0BA $90AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D0BB $90AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D0BC $90AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D0BD $90AD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D0BE $90AE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D0BF $90AF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D0C0 $90B0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D0C1 $90B1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D0C2 $90B2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04D0C3 $90B3: C-----  00       BRK  
  0x04D0C4 $90B4: C-----  00       BRK  
  0x04D0C5 $90B5: C-----  00       BRK  
  0x04D0C6 $90B6: C-----  05 0F    ORA  $0F
  0x04D0C8 $90B8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D0C9 $90B9: C-----  EE F3 FF INC  $FFF3
  0x04D0CC $90BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0CD $90BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0CE $90BE: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04D0CF $90BF: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D0D0 $90C0: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04D0D1 $90C1: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D0D2 $90C2: C-----  C0 C0    CPY  #$C0
  0x04D0D4 $90C4: C-----  E0 D0    CPX  #$D0
  0x04D0D6 $90C6: C-----  81 80    STA  ($80,X)
  0x04D0D8 $90C8: C-----  40       RTI  
  0x04D0D9 $90C9: C-----  60       RTS  
  0x04D0DA $90CA: C-----  30 B8    BMI  $9084
  0x04D0DC $90CC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D0DD $90CD: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04D0DE $90CE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D0DF $90CF: C-----  00       BRK  
  0x04D0E0 $90D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0E1 $90D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0E2 $90D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0E3 $90D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0E4 $90D4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D0E5 $90D5: C-----  01 87    ORA  ($87,X)
  0x04D0E7 $90D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0E8 $90D8: C-----  00       BRK  
  0x04D0E9 $90D9: C-----  C0 D2    CPY  #$D2
  0x04D0EB $90DB: C-----  F6 FF    INC  $FF,X
  0x04D0ED $90DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0EE $90DE: C-----  78       SEI  
  0x04D0EF $90DF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D0F0 $90E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0F1 $90E1: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04D0F2 $90E2: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04D0F3 $90E3: C-----  61 60    ADC  ($60,X)
  0x04D0F5 $90E5: C-----  00       BRK  
  0x04D0F6 $90E6: C-----  00       BRK  
  0x04D0F7 $90E7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D0F8 $90E8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D0F9 $90E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0FA $90EA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D0FB $90EB: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D0FC $90EC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D0FD $90ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0FE $90EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D0FF $90EF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D100 $90F0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D101 $90F1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D102 $90F2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D103 $90F3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D104 $90F4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D105 $90F5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D106 $90F6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D107 $90F7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D108 $90F8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D109 $90F9: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04D10A $90FA: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04D10B $90FB: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04D10C $90FC: C-----  D9 D8 FF CMP  $FFD8,Y
  0x04D10F $90FF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04D110 $9100: C-----  C0 F0    CPY  #$F0
  0x04D112 $9102: C-----  F8       SED  
  0x04D113 $9103: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D114 $9104: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D115 $9105: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D116 $9106: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D117 $9107: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D118 $9108: C-----  00       BRK  
  0x04D119 $9109: C-----  00       BRK  
  0x04D11A $910A: C-----  00       BRK  
  0x04D11B $910B: C-----  00       BRK  
  0x04D11C $910C: C-----  00       BRK  
  0x04D11D $910D: C-----  00       BRK  
  0x04D11E $910E: C-----  00       BRK  
  0x04D11F $910F: C-----  00       BRK  
  0x04D120 $9110: C-----  00       BRK  
  0x04D121 $9111: C-----  00       BRK  
  0x04D122 $9112: C-----  00       BRK  
  0x04D123 $9113: C-----  00       BRK  
  0x04D124 $9114: C-----  00       BRK  
  0x04D125 $9115: C-----  C0 E0    CPY  #$E0
  0x04D127 $9117: C-----  F0 00    BEQ  $9119
  0x04D129 $9119: C-----  00       BRK  
  0x04D12A $911A: C-----  00       BRK  
  0x04D12B $911B: C-----  00       BRK  
  0x04D12C $911C: C-----  00       BRK  
  0x04D12D $911D: C-----  00       BRK  
  0x04D12E $911E: C-----  00       BRK  
  0x04D12F $911F: C-----  00       BRK  
  0x04D130 $9120: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D131 $9121: C-----  78       SEI  
  0x04D132 $9122: C-----  70 60    BVS  $9184
  0x04D134 $9124: C-----  20 20 10 JSR  $1020
  0x04D137 $9127: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04D138 $9128: C-----  00       BRK  
  0x04D139 $9129: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D13A $912A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D13B $912B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D13C $912C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D13D $912D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D13E $912E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D13F $912F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D140 $9130: C-----  F0 F8    BEQ  $912A
  0x04D142 $9132: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D143 $9133: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D144 $9134: C-----  FE FE FE INC  $FEFE,X
  0x04D147 $9137: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D148 $9138: C-----  00       BRK  
  0x04D149 $9139: C-----  00       BRK  
  0x04D14A $913A: C-----  00       BRK  
  0x04D14B $913B: C-----  00       BRK  
  0x04D14C $913C: C-----  00       BRK  
  0x04D14D $913D: C-----  00       BRK  
  0x04D14E $913E: C-----  00       BRK  
  0x04D14F $913F: C-----  00       BRK  
  0x04D150 $9140: C-----  00       BRK  
  0x04D151 $9141: C-----  00       BRK  
  0x04D152 $9142: C-----  00       BRK  
  0x04D153 $9143: C-----  01 03    ORA  ($03,X)
  0x04D155 $9145: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D156 $9146: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D157 $9147: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D158 $9148: C-----  00       BRK  
  0x04D159 $9149: C-----  00       BRK  
  0x04D15A $914A: C-----  00       BRK  
  0x04D15B $914B: C-----  00       BRK  
  0x04D15C $914C: C-----  00       BRK  
  0x04D15D $914D: C-----  00       BRK  
  0x04D15E $914E: C-----  00       BRK  
  0x04D15F $914F: C-----  00       BRK  
  0x04D160 $9150: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D161 $9151: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D162 $9152: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D163 $9153: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D164 $9154: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D165 $9155: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D166 $9156: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D167 $9157: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D168 $9158: C-----  00       BRK  
  0x04D169 $9159: C-----  00       BRK  
  0x04D16A $915A: C-----  00       BRK  
  0x04D16B $915B: C-----  00       BRK  
  0x04D16C $915C: C-----  00       BRK  
  0x04D16D $915D: C-----  00       BRK  
  0x04D16E $915E: C-----  00       BRK  
  0x04D16F $915F: C-----  00       BRK  
  0x04D170 $9160: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D171 $9161: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D172 $9162: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D173 $9163: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D174 $9164: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D175 $9165: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D176 $9166: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D177 $9167: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D178 $9168: C-----  00       BRK  
  0x04D179 $9169: C-----  00       BRK  
  0x04D17A $916A: C-----  01 03    ORA  ($03,X)
  0x04D17C $916C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D17D $916D: C-----  06 04    ASL  $04
  0x04D17F $916F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04D180 $9170: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D181 $9171: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D182 $9172: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D183 $9173: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D184 $9174: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D185 $9175: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D186 $9176: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D187 $9177: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D188 $9178: C-----  00       BRK  
  0x04D189 $9179: C-----  C0 E0    CPY  #$E0
  0x04D18B $917B: C-----  E0 30    CPX  #$30
  0x04D18D $917D: C-----  18       CLC  
  0x04D18E $917E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04D18F $917F: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x04D190 $9180: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D191 $9181: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D192 $9182: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D193 $9183: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D194 $9184: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D195 $9185: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D196 $9186: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D197 $9187: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D198 $9188: C-----  00       BRK  
  0x04D199 $9189: C-----  00       BRK  
  0x04D19A $918A: C-----  40       RTI  
  0x04D19B $918B: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04D19C $918C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D19D $918D: C-----  FE 1E 0F INC  $0F1E,X
  0x04D1A0 $9190: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D1A1 $9191: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D1A2 $9192: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D1A3 $9193: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D1A4 $9194: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D1A5 $9195: C-----  FE FE FE INC  $FEFE,X
  0x04D1A8 $9198: C-----  00       BRK  
  0x04D1A9 $9199: C-----  00       BRK  
  0x04D1AA $919A: C-----  00       BRK  
  0x04D1AB $919B: C-----  00       BRK  
  0x04D1AC $919C: C-----  00       BRK  
  0x04D1AD $919D: C-----  00       BRK  
  0x04D1AE $919E: C-----  00       BRK  
  0x04D1AF $919F: C-----  00       BRK  
  0x04D1B0 $91A0: C-----  B0 C8    BCS  $916A
  0x04D1B2 $91A2: C-----  C1 E1    CMP  ($E1,X)
  0x04D1B4 $91A4: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04D1B5 $91A5: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04D1B6 $91A6: C-----  C5 86    CMP  $86
  0x04D1B8 $91A8: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04D1B9 $91A9: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04D1BA $91AA: C-----  7E 5E DC ROR  $DC5E,X
  0x04D1BD $91AD: C-----  FD BA 79 SBC  $79BA,X
  0x04D1C0 $91B0: C-----  FE FE FC INC  $FCFE,X
  0x04D1C3 $91B3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D1C4 $91B4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D1C5 $91B5: C-----  F8       SED  
  0x04D1C6 $91B6: C-----  F0 E0    BEQ  $9198
  0x04D1C8 $91B8: C-----  00       BRK  
  0x04D1C9 $91B9: C-----  00       BRK  
  0x04D1CA $91BA: C-----  30 70    BMI  $922C
  0x04D1CC $91BC: C-----  F0 20    BEQ  $91DE
  0x04D1CE $91BE: C-----  A0 40    LDY  #$40
  0x04D1D0 $91C0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D1D1 $91C1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D1D2 $91C2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D1D3 $91C3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D1D4 $91C4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D1D5 $91C5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1D6 $91C6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1D7 $91C7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1D8 $91C8: C-----  0D 0F 07 ORA  $070F
  0x04D1DB $91CB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1DC $91CC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1DD $91CD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D1DE $91CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D1DF $91CF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D1E0 $91D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D1E1 $91D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D1E2 $91D2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D1E3 $91D3: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04D1E4 $91D4: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04D1E5 $91D5: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04D1E6 $91D6: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04D1E7 $91D7: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D1E8 $91D8: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04D1E9 $91D9: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04D1EA $91DA: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04D1EB $91DB: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04D1EC $91DC: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x04D1ED $91DD: C-----  C9 E6    CMP  #$E6
  0x04D1EF $91DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D1F0 $91E0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1F1 $91E1: C-----  06 08    ASL  $08
  0x04D1F3 $91E3: C-----  08       PHP  
  0x04D1F4 $91E4: C-----  08       PHP  
  0x04D1F5 $91E5: C-----  10 10    BPL  $91F7
  0x04D1F7 $91E7: C-----  10 03    BPL  $91EC
  0x04D1F9 $91E9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D1FA $91EA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1FB $91EB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1FC $91EC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D1FD $91ED: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D1FE $91EE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D1FF $91EF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D200 $91F0: C-----  38       SEC  
  0x04D201 $91F1: C-----  00       BRK  
  0x04D202 $91F2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04D203 $91F3: C-----  1E 3F 3F ASL  $3F3F,X
  0x04D206 $91F6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D207 $91F7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D208 $91F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D209 $91F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D20A $91FA: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D20B $91FB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04D20C $91FC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D20D $91FD: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D20E $91FE: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04D20F $91FF: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04D210 $9200: C-----  08       PHP  
  0x04D211 $9201: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D212 $9202: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D213 $9203: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D214 $9204: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D215 $9205: C-----  01 01    ORA  ($01,X)
  0x04D217 $9207: C-----  00       BRK  
  0x04D218 $9208: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D219 $9209: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D21A $920A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D21B $920B: C-----  01 01    ORA  ($01,X)
  0x04D21D $920D: C-----  00       BRK  
  0x04D21E $920E: C-----  00       BRK  
  0x04D21F $920F: C-----  00       BRK  
  0x04D220 $9210: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D221 $9211: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D222 $9212: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D223 $9213: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D224 $9214: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D225 $9215: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D226 $9216: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D227 $9217: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D228 $9218: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D229 $9219: C-----  F0 F0    BEQ  $920B
  0x04D22B $921B: C-----  F0 F1    BEQ  $920E
  0x04D22D $921D: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D22E $921E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D22F $921F: C-----  7D 00 FF ADC  $FF00,X
  0x04D232 $9222: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D233 $9223: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D234 $9224: C-----  01 01    ORA  ($01,X)
  0x04D236 $9226: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D237 $9227: C-----  0E 00 00 ASL  $0000
  0x04D23A $922A: C-----  E0 FC    CPX  #$FC
  0x04D23C $922C: C-----  FE FE FC INC  $FCFE,X
  0x04D23F $922F: C-----  F0 C1    BEQ  $91F2
  0x04D241 $9231: C-----  E0 F0    CPX  #$F0
  0x04D243 $9233: C-----  78       SEI  
  0x04D244 $9234: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D245 $9235: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D246 $9236: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D247 $9237: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D248 $9238: C-----  3E 1F 0F ROL  $0F1F,X
  0x04D24B $923B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D24C $923C: C-----  00       BRK  
  0x04D24D $923D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D24E $923E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D24F $923F: C-----  00       BRK  
  0x04D250 $9240: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D251 $9241: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D252 $9242: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D253 $9243: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D254 $9244: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D255 $9245: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D256 $9246: C-----  FE FC FC INC  $FCFC,X
  0x04D259 $9249: C-----  FE 10 7C INC  $7C10,X
  0x04D25C $924C: C-----  FE FE FD INC  $FDFE,X
  0x04D25F $924F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D260 $9250: C-----  06 80    ASL  $80
  0x04D262 $9252: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D263 $9253: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D264 $9254: C-----  00       BRK  
  0x04D265 $9255: C-----  00       BRK  
  0x04D266 $9256: C-----  00       BRK  
  0x04D267 $9257: C-----  00       BRK  
  0x04D268 $9258: C-----  F9 7F 7F SBC  $7F7F,Y
  0x04D26B $925B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D26C $925C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D26D $925D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D26E $925E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D26F $925F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D270 $9260: C-----  F8       SED  
  0x04D271 $9261: C-----  00       BRK  
  0x04D272 $9262: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D273 $9263: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D274 $9264: C-----  FE F8 F0 INC  $F0F8,X
  0x04D277 $9267: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D278 $9268: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D279 $9269: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D27A $926A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D27B $926B: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04D27C $926C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D27D $926D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D27E $926E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D27F $926F: C-----  00       BRK  
  0x04D280 $9270: C-----  01 01    ORA  ($01,X)
  0x04D282 $9272: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D283 $9273: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D284 $9274: C-----  06 1C    ASL  $1C
  0x04D286 $9276: C-----  F0 C0    BEQ  $9238
  0x04D288 $9278: C-----  FE FE FC INC  $FCFE,X
  0x04D28B $927B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D28C $927C: C-----  F8       SED  
  0x04D28D $927D: C-----  E0 00    CPX  #$00
  0x04D28F $927F: C-----  00       BRK  
  0x04D290 $9280: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D291 $9281: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D292 $9282: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D293 $9283: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D294 $9284: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D295 $9285: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D296 $9286: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D297 $9287: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D298 $9288: C-----  00       BRK  
  0x04D299 $9289: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D29A $928A: C-----  C0 FF    CPY  #$FF
  0x04D29C $928C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D29D $928D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04D29E $928E: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04D29F $928F: C-----  F8       SED  
  0x04D2A0 $9290: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2A1 $9291: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2A2 $9292: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2A3 $9293: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2A4 $9294: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2A5 $9295: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2A6 $9296: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2A7 $9297: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D2A8 $9298: C-----  00       BRK  
  0x04D2A9 $9299: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D2AA $929A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2AB $929B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2AC $929C: C-----  F8       SED  
  0x04D2AD $929D: C-----  C0 01    CPY  #$01
  0x04D2AF $929F: C-----  4C C7 C1 JMP  $C1C7
  0x04D2B2 $92A2: C-----  40       RTI  
  0x04D2B3 $92A3: C-----  60       RTS  
  0x04D2B4 $92A4: C-----  21 8C    AND  ($8C,X)
  0x04D2B6 $92A6: C-----  70 00    BVS  $92A8
  0x04D2B8 $92A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2B9 $92A9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D2BA $92AA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D2BB $92AB: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D2BC $92AC: C-----  DE 70 00 DEC  $0070,X
  0x04D2BF $92AF: C-----  00       BRK  
  0x04D2C0 $92B0: C-----  D5 DA    CMP  $DA,X
  0x04D2C2 $92B2: C-----  CC 20 90 CPY  $9020
  0x04D2C5 $92B5: C-----  40       RTI  
  0x04D2C6 $92B6: C-----  20 60 C0 JSR  $C060
  0x04D2C9 $92B9: C-----  C0 C0    CPY  #$C0
  0x04D2CB $92BB: C-----  E0 71    CPX  #$71
  0x04D2CD $92BD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D2CE $92BE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D2CF $92BF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D2D0 $92C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2D1 $92C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2D2 $92C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2D3 $92C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2D4 $92C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2D5 $92C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2D6 $92C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2D7 $92C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2D8 $92C8: C-----  00       BRK  
  0x04D2D9 $92C9: C-----  F0 F8    BEQ  $92C3
  0x04D2DB $92CB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D2DC $92CC: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04D2DD $92CD: C-----  1E CE F4 ASL  $F4CE,X
  0x04D2E0 $92D0: C-----  F8       SED  
  0x04D2E1 $92D1: C-----  F8       SED  
  0x04D2E2 $92D2: C-----  F0 F0    BEQ  $92C4
  0x04D2E4 $92D4: C-----  F0 F0    BEQ  $92C6
  0x04D2E6 $92D6: C-----  E0 E0    CPX  #$E0
  0x04D2E8 $92D8: C-----  00       BRK  
  0x04D2E9 $92D9: C-----  00       BRK  
  0x04D2EA $92DA: C-----  00       BRK  
  0x04D2EB $92DB: C-----  00       BRK  
  0x04D2EC $92DC: C-----  00       BRK  
  0x04D2ED $92DD: C-----  00       BRK  
  0x04D2EE $92DE: C-----  00       BRK  
  0x04D2EF $92DF: C-----  00       BRK  
  0x04D2F0 $92E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2F1 $92E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2F2 $92E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2F3 $92E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2F4 $92E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D2F5 $92E5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D2F6 $92E6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D2F7 $92E7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D2F8 $92E8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04D2F9 $92E9: C-----  79 F9 F2 ADC  $F2F9,Y
  0x04D2FC $92EC: C-----  EC FA F5 CPX  $F5FA
  0x04D2FF $92EF: C-----  FE E0 E0 INC  $E0E0,X
  0x04D302 $92F2: C-----  E0 E0    CPX  #$E0
  0x04D304 $92F4: C-----  C0 C0    CPY  #$C0
  0x04D306 $92F6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D307 $92F7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D308 $92F8: C-----  C0 40    CPY  #$40
  0x04D30A $92FA: C-----  40       RTI  
  0x04D30B $92FB: C-----  C0 80    CPY  #$80
  0x04D30D $92FD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D30E $92FE: C-----  00       BRK  
  0x04D30F $92FF: C-----  00       BRK  
  0x04D310 $9300: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D311 $9301: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D312 $9302: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D313 $9303: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D314 $9304: C-----  1E 7C F0 ASL  $F07C,X
  0x04D317 $9307: C-----  C0 F4    CPY  #$F4
  0x04D319 $9309: C-----  E9 F7    SBC  #$F7
  0x04D31B $930B: C-----  F6 FC    INC  $FC,X
  0x04D31D $930D: C-----  F0 C0    BEQ  $92CF
  0x04D31F $930F: C-----  00       BRK  
  0x04D320 $9310: C-----  E0 C0    CPX  #$C0
  0x04D322 $9312: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D323 $9313: C-----  00       BRK  
  0x04D324 $9314: C-----  00       BRK  
  0x04D325 $9315: C-----  00       BRK  
  0x04D326 $9316: C-----  00       BRK  
  0x04D327 $9317: C-----  00       BRK  
  0x04D328 $9318: C-----  C0 80    CPY  #$80
  0x04D32A $931A: C-----  00       BRK  
  0x04D32B $931B: C-----  00       BRK  
  0x04D32C $931C: C-----  00       BRK  
  0x04D32D $931D: C-----  00       BRK  
  0x04D32E $931E: C-----  00       BRK  
  0x04D32F $931F: C-----  00       BRK  
  0x04D330 $9320: C-----  00       BRK  
  0x04D331 $9321: C-----  00       BRK  
  0x04D332 $9322: C-----  00       BRK  
  0x04D333 $9323: C-----  00       BRK  
  0x04D334 $9324: C-----  00       BRK  
  0x04D335 $9325: C-----  38       SEC  
  0x04D336 $9326: C-----  46 81    LSR  $81
  0x04D338 $9328: C-----  00       BRK  
  0x04D339 $9329: C-----  00       BRK  
  0x04D33A $932A: C-----  00       BRK  
  0x04D33B $932B: C-----  00       BRK  
  0x04D33C $932C: C-----  00       BRK  
  0x04D33D $932D: C-----  00       BRK  
  0x04D33E $932E: C-----  38       SEC  
  0x04D33F $932F: C-----  7E 02 04 ROR  $0402,X
  0x04D342 $9332: C-----  18       CLC  
  0x04D343 $9333: C-----  30 40    BMI  $9375
  0x04D345 $9335: C-----  60       RTS  
  0x04D346 $9336: C-----  60       RTS  
  0x04D347 $9337: C-----  60       RTS  
  0x04D348 $9338: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D349 $9339: C-----  F8       SED  
  0x04D34A $933A: C-----  E0 C0    CPX  #$C0
  0x04D34C $933C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D34D $933D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D34E $933E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D34F $933F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D350 $9340: C-----  10 08    BPL  $934A
  0x04D352 $9342: C-----  08       PHP  
  0x04D353 $9343: C-----  08       PHP  
  0x04D354 $9344: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D355 $9345: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D356 $9346: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D357 $9347: C-----  01 0F    ORA  ($0F,X)
  0x04D359 $9349: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D35A $934A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D35B $934B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D35C $934C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D35D $934D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D35E $934E: C-----  01 00    ORA  ($00,X)
  0x04D360 $9350: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D361 $9351: C-----  78       SEI  
  0x04D362 $9352: C-----  70 60    BVS  $93B4
  0x04D364 $9354: C-----  20 20 10 JSR  $1020
  0x04D367 $9357: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04D368 $9358: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D369 $9359: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D36A $935A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D36B $935B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D36C $935C: C-----  C0 C0    CPY  #$C0
  0x04D36E $935E: C-----  E0 F0    CPX  #$F0
  0x04D370 $9360: C-----  E0 C0    CPX  #$C0
  0x04D372 $9362: C-----  C0 80    CPY  #$80
  0x04D374 $9364: C-----  00       BRK  
  0x04D375 $9365: C-----  38       SEC  
  0x04D376 $9366: C-----  46 81    LSR  $81
  0x04D378 $9368: C-----  00       BRK  
  0x04D379 $9369: C-----  00       BRK  
  0x04D37A $936A: C-----  00       BRK  
  0x04D37B $936B: C-----  00       BRK  
  0x04D37C $936C: C-----  00       BRK  
  0x04D37D $936D: C-----  00       BRK  
  0x04D37E $936E: C-----  38       SEC  
  0x04D37F $936F: C-----  7E 83 C0 ROR  $C083,X
  0x04D382 $9372: C-----  F0 FC    BEQ  $9370
  0x04D384 $9374: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D385 $9375: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D386 $9376: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D387 $9377: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D388 $9378: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04D389 $9379: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D38A $937A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D38B $937B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D38C $937C: C-----  00       BRK  
  0x04D38D $937D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D38E $937E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D38F $937F: C-----  00       BRK  
  0x04D390 $9380: C-----  F8       SED  
  0x04D391 $9381: C-----  FE FF FF INC  $FFFF,X
  0x04D394 $9384: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D395 $9385: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D396 $9386: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D397 $9387: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D398 $9388: C-----  00       BRK  
  0x04D399 $9389: C-----  00       BRK  
  0x04D39A $938A: C-----  00       BRK  
  0x04D39B $938B: C-----  00       BRK  
  0x04D39C $938C: C-----  00       BRK  
  0x04D39D $938D: C-----  00       BRK  
  0x04D39E $938E: C-----  00       BRK  
  0x04D39F $938F: C-----  00       BRK  
  0x04D3A0 $9390: C-----  00       BRK  
  0x04D3A1 $9391: C-----  00       BRK  
  0x04D3A2 $9392: C-----  00       BRK  
  0x04D3A3 $9393: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D3A4 $9394: C-----  C0 E0    CPY  #$E0
  0x04D3A6 $9396: C-----  E0 F0    CPX  #$F0
  0x04D3A8 $9398: C-----  00       BRK  
  0x04D3A9 $9399: C-----  00       BRK  
  0x04D3AA $939A: C-----  00       BRK  
  0x04D3AB $939B: C-----  00       BRK  
  0x04D3AC $939C: C-----  00       BRK  
  0x04D3AD $939D: C-----  00       BRK  
  0x04D3AE $939E: C-----  00       BRK  
  0x04D3AF $939F: C-----  00       BRK  
  0x04D3B0 $93A0: ------  .byte $3F
  0x04D3B1 $93A1: ------  .byte $3F
  0x04D3B2 $93A2: ------  .byte $3F
  0x04D3B3 $93A3: ------  .byte $1F
  0x04D3B4 $93A4: ------  .byte $8E
  0x04D3B5 $93A5: ------  .byte $C0
  0x04D3B6 $93A6: ------  .byte $E0
  0x04D3B7 $93A7: ------  .byte $E0
  0x04D3B8 $93A8: ------  .byte $2A
  0x04D3B9 $93A9: ------  .byte $25
  0x04D3BA $93AA: ------  .byte $33
  0x04D3BB $93AB: ------  .byte $1F
  0x04D3BC $93AC: ------  .byte $0E
  0x04D3BD $93AD: ------  .byte $80
  0x04D3BE $93AE: ------  .byte $C0
  0x04D3BF $93AF: ------  .byte $80
  0x04D3C0 $93B0: C-----  F0 F0    BEQ  $93A2
  0x04D3C2 $93B2: C-----  F8       SED  
  0x04D3C3 $93B3: C-----  F8       SED  
  0x04D3C4 $93B4: C-----  F8       SED  
  0x04D3C5 $93B5: C-----  F8       SED  
  0x04D3C6 $93B6: C-----  F8       SED  
  0x04D3C7 $93B7: C-----  F8       SED  
  0x04D3C8 $93B8: C-----  00       BRK  
  0x04D3C9 $93B9: C-----  00       BRK  
  0x04D3CA $93BA: C-----  00       BRK  
  0x04D3CB $93BB: C-----  00       BRK  
  0x04D3CC $93BC: C-----  00       BRK  
  0x04D3CD $93BD: C-----  00       BRK  
  0x04D3CE $93BE: C-----  00       BRK  
  0x04D3CF $93BF: C-----  00       BRK  
  0x04D3D0 $93C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D3D1 $93C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D3D2 $93C2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D3D3 $93C3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D3D4 $93C4: C-----  01 01    ORA  ($01,X)
  0x04D3D6 $93C6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D3D7 $93C7: C-----  0E FF 00 ASL  $00FF
  0x04D3DA $93CA: C-----  00       BRK  
  0x04D3DB $93CB: C-----  00       BRK  
  0x04D3DC $93CC: C-----  00       BRK  
  0x04D3DD $93CD: C-----  00       BRK  
  0x04D3DE $93CE: C-----  00       BRK  
  0x04D3DF $93CF: C-----  01 F0    ORA  ($F0,X)
  0x04D3E1 $93D1: C-----  F0 F0    BEQ  $93C3
  0x04D3E3 $93D3: C-----  F0 E0    BEQ  $93B5
  0x04D3E5 $93D5: C-----  C0 80    CPY  #$80
  0x04D3E7 $93D7: C-----  00       BRK  
  0x04D3E8 $93D8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D3E9 $93D9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D3EA $93DA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D3EB $93DB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D3EC $93DC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D3ED $93DD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D3EE $93DE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D3EF $93DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D3F0 $93E0: C-----  F0 00    BEQ  $93E2
  0x04D3F2 $93E2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D3F3 $93E3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D3F4 $93E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D3F5 $93E5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D3F6 $93E6: C-----  C1 FF    CMP  ($FF,X)
  0x04D3F8 $93E8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D3F9 $93E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D3FA $93EA: C-----  F8       SED  
  0x04D3FB $93EB: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04D3FC $93EC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D3FD $93ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D3FE $93EE: C-----  FE 00 00 INC  $0000,X
  0x04D401 $93F1: C-----  F0 E1    BEQ  $93D4
  0x04D403 $93F3: C-----  81 07    STA  ($07,X)
  0x04D405 $93F5: C-----  1E F8 C0 ASL  $C0F8,X
  0x04D408 $93F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D409 $93F9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D40A $93FA: C-----  FE FE F8 INC  $F8FE,X
  0x04D40D $93FD: C-----  E0 00    CPX  #$00
  0x04D40F $93FF: C-----  00       BRK  
  0x04D410 $9400: ------  .byte $00
  0x04D411 $9401: ------  .byte $00
  0x04D412 $9402: ------  .byte $00
  0x04D413 $9403: ------  .byte $00
  0x04D414 $9404: ------  .byte $00
  0x04D415 $9405: ------  .byte $00
  0x04D416 $9406: ------  .byte $00
  0x04D417 $9407: ------  .byte $00
  0x04D418 $9408: ------  .byte $00
  0x04D419 $9409: ------  .byte $00
  0x04D41A $940A: ------  .byte $00
  0x04D41B $940B: ------  .byte $00
  0x04D41C $940C: ------  .byte $00
  0x04D41D $940D: ------  .byte $00
  0x04D41E $940E: ------  .byte $00
  0x04D41F $940F: ------  .byte $00
  0x04D420 $9410: ------  .byte $FF
  0x04D421 $9411: ------  .byte $FF
  0x04D422 $9412: ------  .byte $FF
  0x04D423 $9413: ------  .byte $FF
  0x04D424 $9414: ------  .byte $FF
  0x04D425 $9415: ------  .byte $FF
  0x04D426 $9416: ------  .byte $FF
  0x04D427 $9417: ------  .byte $FF
  0x04D428 $9418: ------  .byte $00
  0x04D429 $9419: ------  .byte $00
  0x04D42A $941A: ------  .byte $00
  0x04D42B $941B: ------  .byte $00
  0x04D42C $941C: ------  .byte $00
  0x04D42D $941D: ------  .byte $00
  0x04D42E $941E: ------  .byte $00
  0x04D42F $941F: ------  .byte $00
  0x04D430 $9420: C-----  D0 70    BNE  $9492
  0x04D432 $9422: C-----  40       RTI  
  0x04D433 $9423: C-----  40       RTI  
  0x04D434 $9424: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04D435 $9425: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04D436 $9426: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04D437 $9427: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04D438 $9428: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D439 $9429: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D43A $942A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D43B $942B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D43C $942C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04D43D $942D: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04D43E $942E: C-----  0A       ASL  A
  0x04D43F $942F: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04D440 $9430: C-----  00       BRK  
  0x04D441 $9431: C-----  00       BRK  
  0x04D442 $9432: C-----  00       BRK  
  0x04D443 $9433: C-----  00       BRK  
  0x04D444 $9434: C-----  00       BRK  
  0x04D445 $9435: C-----  00       BRK  
  0x04D446 $9436: C-----  60       RTS  
  0x04D447 $9437: C-----  E4 FF    CPX  $FF
  0x04D449 $9439: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D44A $943A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D44B $943B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D44C $943C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D44D $943D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D44E $943E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D44F $943F: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04D450 $9440: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D451 $9441: C-----  F0 00    BEQ  $9443
  0x04D453 $9443: C-----  00       BRK  
  0x04D454 $9444: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D455 $9445: C-----  40       RTI  
  0x04D456 $9446: C-----  A0 50    LDY  #$50
  0x04D458 $9448: C-----  00       BRK  
  0x04D459 $9449: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D45A $944A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D45B $944B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D45C $944C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D45D $944D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D45E $944E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04D45F $944F: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04D460 $9450: C-----  F0 00    BEQ  $9452
  0x04D462 $9452: C-----  00       BRK  
  0x04D463 $9453: C-----  00       BRK  
  0x04D464 $9454: C-----  00       BRK  
  0x04D465 $9455: C-----  00       BRK  
  0x04D466 $9456: C-----  00       BRK  
  0x04D467 $9457: C-----  00       BRK  
  0x04D468 $9458: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D469 $9459: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D46A $945A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D46B $945B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D46C $945C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D46D $945D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D46E $945E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D46F $945F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D470 $9460: C-----  AA       TAX  
  0x04D471 $9461: C-----  55 0A    EOR  $0A,X
  0x04D473 $9463: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04D474 $9464: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04D475 $9465: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D476 $9466: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04D477 $9467: C-----  39 55 2A AND  $2A55,Y
  0x04D47A $946A: C-----  75 2A    ADC  $2A,X
  0x04D47C $946C: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04D47D $946D: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04D47E $946E: C-----  11 06    ORA  ($06),Y
  0x04D480 $9470: C-----  00       BRK  
  0x04D481 $9471: C-----  10 80    BPL  $93F3
  0x04D483 $9473: C-----  50 A8    BVC  $941D
  0x04D485 $9475: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04D486 $9476: C-----  E8       INX  
  0x04D487 $9477: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04D488 $9478: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D489 $9479: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04D48A $947A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D48B $947B: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04D48C $947C: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04D48D $947D: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04D48E $947E: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04D48F $947F: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x04D490 $9480: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D491 $9481: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D492 $9482: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D493 $9483: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D494 $9484: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D495 $9485: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D496 $9486: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D497 $9487: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D498 $9488: C-----  06 06    ASL  $06
  0x04D49A $948A: C-----  06 02    ASL  $02
  0x04D49C $948C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D49D $948D: C-----  01 01    ORA  ($01,X)
  0x04D49F $948F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D4A0 $9490: C-----  EC FC FC CPX  $FCFC
  0x04D4A3 $9493: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D4A4 $9494: C-----  FE BF AF INC  $AFBF,X
  0x04D4A7 $9497: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04D4A8 $9498: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04D4A9 $9499: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04D4AA $949A: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04D4AB $949B: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04D4AC $949C: C-----  1D 0E 87 ORA  $870E,X
  0x04D4AF $949F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D4B0 $94A0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D4B1 $94A1: C-----  0E 0C 0C ASL  $0C0C
  0x04D4B4 $94A4: C-----  08       PHP  
  0x04D4B5 $94A5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D4B6 $94A6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D4B7 $94A7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D4B8 $94A8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D4B9 $94A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D4BA $94AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D4BB $94AB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D4BC $94AC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D4BD $94AD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D4BE $94AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D4BF $94AF: C-----  01 78    ORA  ($78,X)
  0x04D4C1 $94B1: C-----  38       SEC  
  0x04D4C2 $94B2: C-----  00       BRK  
  0x04D4C3 $94B3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D4C4 $94B4: C-----  06 42    ASL  $42
  0x04D4C6 $94B6: C-----  70 7F    BVS  $9537
  0x04D4C8 $94B8: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04D4C9 $94B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D4CA $94BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D4CB $94BB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D4CC $94BC: C-----  F9 BD 8F SBC  $8FBD,Y
  0x04D4CF $94BF: C-----  B0 11    BCS  $94D2
  0x04D4D1 $94C1: C-----  20 28 3C JSR  $3C28
  0x04D4D4 $94C4: C-----  3E 1F 1F ROL  $1F1F,X
  0x04D4D7 $94C7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D4D8 $94C8: C-----  0E 1F 17 ASL  $171F
  0x04D4DB $94CB: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04D4DC $94CC: C-----  1D 0E 0F ORA  $0F0E,X
  0x04D4DF $94CF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D4E0 $94D0: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04D4E1 $94D1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D4E2 $94D2: C-----  FE 7F 7E INC  $7E7F,X
  0x04D4E5 $94D5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D4E6 $94D6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D4E7 $94D7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D4E8 $94D8: C-----  E5 73    SBC  $73
  0x04D4EA $94DA: C-----  79 BC BD ADC  $BDBC,Y
  0x04D4ED $94DD: C-----  DE 5F AF DEC  $AF5F,X
  0x04D4F0 $94E0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D4F1 $94E1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D4F2 $94E2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D4F3 $94E3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D4F4 $94E4: C-----  38       SEC  
  0x04D4F5 $94E5: C-----  30 60    BMI  $9547
  0x04D4F7 $94E7: C-----  81 07    STA  ($07,X)
  0x04D4F9 $94E9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D4FA $94EA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D4FB $94EB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D4FC $94EC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D4FD $94ED: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D4FE $94EE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D4FF $94EF: C-----  7E FF FF ROR  $FFFF,X
  0x04D502 $94F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D503 $94F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D504 $94F4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D505 $94F5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D506 $94F6: C-----  10 90    BPL  $9488
  0x04D508 $94F8: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04D509 $94F9: C-----  06 C3    ASL  $C3
  0x04D50B $94FB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D50C $94FC: C-----  FD F0 EF SBC  $EFF0,X
  0x04D50F $94FF: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04D510 $9500: C-----  00       BRK  
  0x04D511 $9501: C-----  00       BRK  
  0x04D512 $9502: C-----  00       BRK  
  0x04D513 $9503: C-----  00       BRK  
  0x04D514 $9504: C-----  00       BRK  
  0x04D515 $9505: C-----  00       BRK  
  0x04D516 $9506: C-----  00       BRK  
  0x04D517 $9507: C-----  00       BRK  
  0x04D518 $9508: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D519 $9509: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D51A $950A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D51B $950B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D51C $950C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D51D $950D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D51E $950E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D51F $950F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D520 $9510: C-----  0E 01 00 ASL  $0001
  0x04D523 $9513: C-----  00       BRK  
  0x04D524 $9514: C-----  00       BRK  
  0x04D525 $9515: C-----  00       BRK  
  0x04D526 $9516: C-----  00       BRK  
  0x04D527 $9517: C-----  00       BRK  
  0x04D528 $9518: C-----  F0 FE    BEQ  $9518
  0x04D52A $951A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D52B $951B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D52C $951C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D52D $951D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D52E $951E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D52F $951F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D530 $9520: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D531 $9521: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D532 $9522: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D533 $9523: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D534 $9524: C-----  00       BRK  
  0x04D535 $9525: C-----  01 00    ORA  ($00,X)
  0x04D537 $9527: C-----  00       BRK  
  0x04D538 $9528: C-----  00       BRK  
  0x04D539 $9529: C-----  00       BRK  
  0x04D53A $952A: C-----  01 00    ORA  ($00,X)
  0x04D53C $952C: C-----  01 00    ORA  ($00,X)
  0x04D53E $952E: C-----  00       BRK  
  0x04D53F $952F: C-----  00       BRK  
  0x04D540 $9530: C-----  00       BRK  
  0x04D541 $9531: C-----  00       BRK  
  0x04D542 $9532: C-----  00       BRK  
  0x04D543 $9533: C-----  00       BRK  
  0x04D544 $9534: C-----  00       BRK  
  0x04D545 $9535: C-----  00       BRK  
  0x04D546 $9536: C-----  11 A2    ORA  ($A2),Y
  0x04D548 $9538: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D549 $9539: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D54A $953A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D54B $953B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D54C $953C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D54D $953D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D54E $953E: C-----  EE 5D 00 INC  $005D
  0x04D551 $9541: C-----  C0 38    CPY  #$38
  0x04D553 $9543: C-----  06 01    ASL  $01
  0x04D555 $9545: C-----  00       BRK  
  0x04D556 $9546: C-----  00       BRK  
  0x04D557 $9547: C-----  00       BRK  
  0x04D558 $9548: C-----  00       BRK  
  0x04D559 $9549: C-----  00       BRK  
  0x04D55A $954A: C-----  C0 F8    CPY  #$F8
  0x04D55C $954C: C-----  FE FF FF INC  $FFFF,X
  0x04D55F $954F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D560 $9550: C-----  00       BRK  
  0x04D561 $9551: C-----  00       BRK  
  0x04D562 $9552: C-----  00       BRK  
  0x04D563 $9553: C-----  00       BRK  
  0x04D564 $9554: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D565 $9555: C-----  40       RTI  
  0x04D566 $9556: C-----  20 10 00 JSR  $0010
  0x04D569 $9559: C-----  00       BRK  
  0x04D56A $955A: C-----  00       BRK  
  0x04D56B $955B: C-----  00       BRK  
  0x04D56C $955C: C-----  00       BRK  
  0x04D56D $955D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D56E $955E: C-----  C0 E0    CPY  #$E0
  0x04D570 $9560: C-----  00       BRK  
  0x04D571 $9561: C-----  00       BRK  
  0x04D572 $9562: C-----  01 86    ORA  ($86,X)
  0x04D574 $9564: C-----  78       SEI  
  0x04D575 $9565: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D576 $9566: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D577 $9567: C-----  00       BRK  
  0x04D578 $9568: C-----  00       BRK  
  0x04D579 $9569: C-----  00       BRK  
  0x04D57A $956A: C-----  00       BRK  
  0x04D57B $956B: C-----  00       BRK  
  0x04D57C $956C: C-----  00       BRK  
  0x04D57D $956D: C-----  00       BRK  
  0x04D57E $956E: C-----  C0 E0    CPY  #$E0
  0x04D580 $9570: C-----  08       PHP  
  0x04D581 $9571: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D582 $9572: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D583 $9573: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D584 $9574: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D585 $9575: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D586 $9576: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D587 $9577: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D588 $9578: C-----  F0 F8    BEQ  $9572
  0x04D58A $957A: C-----  F8       SED  
  0x04D58B $957B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D58C $957C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D58D $957D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D58E $957E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D58F $957F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D590 $9580: C-----  05 2A    ORA  $2A
  0x04D592 $9582: C-----  55 2F    EOR  $2F,X
  0x04D594 $9584: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D595 $9585: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D596 $9586: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D597 $9587: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D598 $9588: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04D599 $9589: C-----  D5 AA    CMP  $AA,X
  0x04D59B $958B: C-----  D0 0F    BNE  $959C
  0x04D59D $958D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D59E $958E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D59F $958F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5A0 $9590: C-----  55 AA    EOR  $AA,X
  0x04D5A2 $9592: C-----  55 FF    EOR  $FF,X
  0x04D5A4 $9594: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5A5 $9595: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5A6 $9596: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5A7 $9597: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5A8 $9598: C-----  AA       TAX  
  0x04D5A9 $9599: C-----  55 AA    EOR  $AA,X
  0x04D5AB $959B: C-----  00       BRK  
  0x04D5AC $959C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5AD $959D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5AE $959E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5AF $959F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5B0 $95A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5B1 $95A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5B2 $95A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5B3 $95A3: C-----  FE F8 FF INC  $FFF8,X
  0x04D5B6 $95A6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D5B7 $95A7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D5B8 $95A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5B9 $95A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5BA $95AA: C-----  FE 79 87 INC  $8779,X
  0x04D5BD $95AD: C-----  E0 3C    CPX  #$3C
  0x04D5BF $95AF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D5C0 $95B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5C1 $95B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5C2 $95B2: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04D5C3 $95B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D5C4 $95B4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D5C5 $95B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5C6 $95B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5C7 $95B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5C8 $95B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D5C9 $95B9: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04D5CA $95BA: C-----  39 F9 FC AND  $FCF9,Y
  0x04D5CD $95BD: C-----  01 7D    ORA  ($7D,X)
  0x04D5CF $95BF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D5D0 $95C0: C-----  40       RTI  
  0x04D5D1 $95C1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D5D2 $95C2: C-----  50 A0    BVC  $9564
  0x04D5D4 $95C4: C-----  D0 E0    BNE  $95A6
  0x04D5D6 $95C6: C-----  F0 E0    BEQ  $95A8
  0x04D5D8 $95C8: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D5D9 $95C9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D5DA $95CA: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04D5DB $95CB: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04D5DC $95CC: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04D5DD $95CD: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D5DE $95CE: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04D5DF $95CF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D5E0 $95D0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D5E1 $95D1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D5E2 $95D2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D5E3 $95D3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D5E4 $95D4: C-----  08       PHP  
  0x04D5E5 $95D5: C-----  08       PHP  
  0x04D5E6 $95D6: C-----  08       PHP  
  0x04D5E7 $95D7: C-----  08       PHP  
  0x04D5E8 $95D8: C-----  F8       SED  
  0x04D5E9 $95D9: C-----  F8       SED  
  0x04D5EA $95DA: C-----  F8       SED  
  0x04D5EB $95DB: C-----  F8       SED  
  0x04D5EC $95DC: C-----  F0 F0    BEQ  $95CE
  0x04D5EE $95DE: C-----  F0 F0    BEQ  $95D0
  0x04D5F0 $95E0: C-----  E0 E0    CPX  #$E0
  0x04D5F2 $95E2: C-----  E1 E3    SBC  ($E3,X)
  0x04D5F4 $95E4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04D5F5 $95E5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04D5F6 $95E6: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04D5F7 $95E7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D5F8 $95E8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D5F9 $95E9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D5FA $95EA: C-----  DE DD BB DEC  $BBDD,X
  0x04D5FD $95ED: C-----  BA       TSX  
  0x04D5FE $95EE: C-----  75 AD    ADC  $AD,X
  0x04D600 $95F0: C-----  10 10    BPL  $9602
  0x04D602 $95F2: C-----  10 A0    BPL  $9594
  0x04D604 $95F4: C-----  E0 E0    CPX  #$E0
  0x04D606 $95F6: C-----  C0 C0    CPY  #$C0
  0x04D608 $95F8: C-----  E0 E0    CPX  #$E0
  0x04D60A $95FA: C-----  E0 40    CPX  #$40
  0x04D60C $95FC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D60D $95FD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D60E $95FE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D60F $95FF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D610 $9600: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D611 $9601: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D612 $9602: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D613 $9603: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D614 $9604: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D615 $9605: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D616 $9606: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D617 $9607: C-----  01 01    ORA  ($01,X)
  0x04D619 $9609: C-----  01 03    ORA  ($03,X)
  0x04D61B $960B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D61C $960C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D61D $960D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D61E $960E: C-----  01 00    ORA  ($00,X)
  0x04D620 $9610: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D621 $9611: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D622 $9612: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D623 $9613: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D624 $9614: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D625 $9615: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D626 $9616: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D627 $9617: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D628 $9618: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D629 $9619: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D62A $961A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04D62B $961B: C-----  8C 9F CF STY  $CF9F
  0x04D62E $961E: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04D62F $961F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D630 $9620: C-----  00       BRK  
  0x04D631 $9621: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D632 $9622: C-----  24 98    BIT  $98
  0x04D634 $9624: C-----  A6 58    LDX  $58
  0x04D636 $9626: C-----  40       RTI  
  0x04D637 $9627: C-----  A0 00    LDY  #$00
  0x04D639 $9629: C-----  00       BRK  
  0x04D63A $962A: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04D63B $962B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D63C $962C: C-----  41 27    EOR  ($27,X)
  0x04D63E $962E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D63F $962F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D640 $9630: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D641 $9631: C-----  E0 FC    CPX  #$FC
  0x04D643 $9633: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D644 $9634: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D645 $9635: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D646 $9636: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D647 $9637: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D648 $9638: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D649 $9639: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D64A $963A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D64B $963B: C-----  00       BRK  
  0x04D64C $963C: C-----  00       BRK  
  0x04D64D $963D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D64E $963E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D64F $963F: C-----  00       BRK  
  0x04D650 $9640: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D651 $9641: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04D652 $9642: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04D653 $9643: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04D654 $9644: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04D655 $9645: C-----  21 20    AND  ($20,X)
  0x04D657 $9647: C-----  10 7D    BPL  $96C6
  0x04D659 $9649: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04D65A $964A: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04D65B $964B: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04D65C $964C: C-----  3D 1E 1F AND  $1F1E,X
  0x04D65F $964F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D660 $9650: C-----  D8       CLD  
  0x04D661 $9651: C-----  EE F1 FC INC  $FCF1
  0x04D664 $9654: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D665 $9655: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D666 $9656: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D667 $9657: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D668 $9658: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04D669 $9659: C-----  D1 EE    CMP  ($EE),Y
  0x04D66B $965B: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D66C $965C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D66D $965D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D66E $965E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04D66F $965F: C-----  F1 0C    SBC  ($0C),Y
  0x04D671 $9661: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D672 $9662: C-----  00       BRK  
  0x04D673 $9663: C-----  00       BRK  
  0x04D674 $9664: C-----  00       BRK  
  0x04D675 $9665: C-----  00       BRK  
  0x04D676 $9666: C-----  00       BRK  
  0x04D677 $9667: C-----  00       BRK  
  0x04D678 $9668: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D679 $9669: C-----  00       BRK  
  0x04D67A $966A: C-----  00       BRK  
  0x04D67B $966B: C-----  00       BRK  
  0x04D67C $966C: C-----  00       BRK  
  0x04D67D $966D: C-----  00       BRK  
  0x04D67E $966E: C-----  00       BRK  
  0x04D67F $966F: C-----  00       BRK  
  0x04D680 $9670: C-----  31 0C    AND  ($0C),Y
  0x04D682 $9672: C-----  E0 FE    CPX  #$FE
  0x04D684 $9674: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D685 $9675: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D686 $9676: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D687 $9677: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D688 $9678: C-----  CE F3 1F DEC  $1FF3
  0x04D68B $967B: C-----  01 00    ORA  ($00,X)
  0x04D68D $967D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D68E $967E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D68F $967F: C-----  00       BRK  
  0x04D690 $9680: C-----  60       RTS  
  0x04D691 $9681: C-----  C6 CC    DEC  $CC
  0x04D693 $9683: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04D694 $9684: C-----  EC FE FF CPX  $FFFE
  0x04D697 $9687: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D698 $9688: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D699 $9689: C-----  79 B7 AB ADC  $ABB7,Y
  0x04D69C $968C: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04D69D $968D: C-----  65 FE    ADC  $FE
  0x04D69F $968F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D6A0 $9690: C-----  00       BRK  
  0x04D6A1 $9691: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D6A2 $9692: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04D6A3 $9693: C-----  6E FF FF ROR  $FFFF
  0x04D6A6 $9696: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6A7 $9697: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6A8 $9698: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6A9 $9699: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D6AA $969A: C-----  CA       DEX  
  0x04D6AB $969B: C-----  B5 4F    LDA  $4F,X
  0x04D6AD $969D: C-----  F0 C0    BEQ  $965F
  0x04D6AF $969F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D6B0 $96A0: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04D6B1 $96A1: C-----  1D 01 01 ORA  $0101,X
  0x04D6B4 $96A4: C-----  00       BRK  
  0x04D6B5 $96A5: C-----  00       BRK  
  0x04D6B6 $96A6: C-----  00       BRK  
  0x04D6B7 $96A7: C-----  F8       SED  
  0x04D6B8 $96A8: C-----  00       BRK  
  0x04D6B9 $96A9: C-----  01 FF    ORA  ($FF,X)
  0x04D6BB $96AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6BC $96AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6BD $96AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6BE $96AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6BF $96AF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D6C0 $96B0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D6C1 $96B1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D6C2 $96B2: C-----  F8       SED  
  0x04D6C3 $96B3: C-----  F8       SED  
  0x04D6C4 $96B4: C-----  F0 00    BEQ  $96B6
  0x04D6C6 $96B6: C-----  00       BRK  
  0x04D6C7 $96B7: C-----  00       BRK  
  0x04D6C8 $96B8: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04D6C9 $96B9: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04D6CA $96BA: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04D6CB $96BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6CC $96BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6CD $96BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6CE $96BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6CF $96BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6D0 $96C0: C-----  00       BRK  
  0x04D6D1 $96C1: C-----  18       CLC  
  0x04D6D2 $96C2: C-----  38       SEC  
  0x04D6D3 $96C3: C-----  F8       SED  
  0x04D6D4 $96C4: C-----  F8       SED  
  0x04D6D5 $96C5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D6D6 $96C6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D6D7 $96C7: C-----  FE FF E7 INC  $E7FF,X
  0x04D6DA $96CA: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04D6DB $96CB: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04D6DC $96CC: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04D6DD $96CD: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D6DE $96CE: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04D6DF $96CF: C-----  7D 02 02 ADC  $0202,X
  0x04D6E2 $96D2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D6E3 $96D3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D6E4 $96D4: C-----  08       PHP  
  0x04D6E5 $96D5: C-----  08       PHP  
  0x04D6E6 $96D6: C-----  08       PHP  
  0x04D6E7 $96D7: C-----  D0 FC    BNE  $96D5
  0x04D6E9 $96D9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D6EA $96DA: C-----  F8       SED  
  0x04D6EB $96DB: C-----  F8       SED  
  0x04D6EC $96DC: C-----  F0 F0    BEQ  $96CE
  0x04D6EE $96DE: C-----  F0 20    BEQ  $9700
  0x04D6F0 $96E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6F1 $96E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D6F2 $96E2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D6F3 $96E3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D6F4 $96E4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D6F5 $96E5: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04D6F6 $96E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D6F7 $96E7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D6F8 $96E8: C-----  BC F9 F9 LDY  $F9F9,X
  0x04D6FB $96EB: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04D6FC $96EC: C-----  EC FA F5 CPX  $F5FA
  0x04D6FF $96EF: C-----  FE D0 F0 INC  $F0D0,X
  0x04D702 $96F2: C-----  E0 E0    CPX  #$E0
  0x04D704 $96F4: C-----  C0 C0    CPY  #$C0
  0x04D706 $96F6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D707 $96F7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D708 $96F8: C-----  E0 40    CPX  #$40
  0x04D70A $96FA: C-----  40       RTI  
  0x04D70B $96FB: C-----  C0 80    CPY  #$80
  0x04D70D $96FD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D70E $96FE: C-----  00       BRK  
  0x04D70F $96FF: C-----  00       BRK  
  0x04D710 $9700: C-----  00       BRK  
  0x04D711 $9701: C-----  20 CE 1F JSR  $1FCE
  0x04D714 $9704: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D715 $9705: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D716 $9706: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D717 $9707: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D718 $9708: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D719 $9709: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D71A $970A: C-----  31 EE    AND  ($EE),Y
  0x04D71C $970C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D71D $970D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D71E $970E: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04D71F $970F: C-----  FE 0F 0F INC  $0F0F,X
  0x04D722 $9712: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D723 $9713: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D724 $9714: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04D725 $9715: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D726 $9716: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D727 $9717: C-----  00       BRK  
  0x04D728 $9718: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D729 $9719: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D72A $971A: C-----  FE FF 7F INC  $7FFF,X
  0x04D72D $971D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D72E $971E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D72F $971F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D730 $9720: C-----  FE 00 00 INC  $0000,X
  0x04D733 $9723: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D734 $9724: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D735 $9725: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D736 $9726: C-----  C1 FF    CMP  ($FF,X)
  0x04D738 $9728: C-----  01 FF    ORA  ($FF,X)
  0x04D73A $972A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D73B $972B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D73C $972C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D73D $972D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D73E $972E: C-----  FE 00 00 INC  $0000,X
  0x04D741 $9731: C-----  00       BRK  
  0x04D742 $9732: C-----  E0 81    CPX  #$81
  0x04D744 $9734: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D745 $9735: C-----  1E F8 C0 ASL  $C0F8,X
  0x04D748 $9738: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D749 $9739: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D74A $973A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D74B $973B: C-----  FE F8 E0 INC  $E0F8,X
  0x04D74E $973E: C-----  00       BRK  
  0x04D74F $973F: C-----  00       BRK  
  0x04D750 $9740: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D751 $9741: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D752 $9742: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D753 $9743: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D754 $9744: C-----  3E 0C 18 ROL  $180C,X
  0x04D757 $9747: C-----  20 9A 35 JSR  $359A
  0x04D75A $974A: C-----  75 E2    ADC  $E2,X
  0x04D75C $974C: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04D75D $974D: C-----  F8       SED  
  0x04D75E $974E: C-----  E0 C0    CPX  #$C0
  0x04D760 $9750: C-----  C0 C0    CPY  #$C0
  0x04D762 $9752: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D763 $9753: C-----  00       BRK  
  0x04D764 $9754: C-----  00       BRK  
  0x04D765 $9755: C-----  00       BRK  
  0x04D766 $9756: C-----  00       BRK  
  0x04D767 $9757: C-----  00       BRK  
  0x04D768 $9758: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D769 $9759: C-----  00       BRK  
  0x04D76A $975A: C-----  00       BRK  
  0x04D76B $975B: C-----  00       BRK  
  0x04D76C $975C: C-----  00       BRK  
  0x04D76D $975D: C-----  00       BRK  
  0x04D76E $975E: C-----  00       BRK  
  0x04D76F $975F: C-----  00       BRK  
  0x04D770 $9760: C-----  E0 C0    CPX  #$C0
  0x04D772 $9762: C-----  C0 80    CPY  #$80
  0x04D774 $9764: C-----  00       BRK  
  0x04D775 $9765: C-----  38       SEC  
  0x04D776 $9766: C-----  46 81    LSR  $81
  0x04D778 $9768: C-----  00       BRK  
  0x04D779 $9769: C-----  00       BRK  
  0x04D77A $976A: C-----  00       BRK  
  0x04D77B $976B: C-----  00       BRK  
  0x04D77C $976C: C-----  00       BRK  
  0x04D77D $976D: C-----  00       BRK  
  0x04D77E $976E: C-----  38       SEC  
  0x04D77F $976F: C-----  7E 00 C0 ROR  $C000,X
  0x04D782 $9772: C-----  20 20 10 JSR  $1020
  0x04D785 $9775: C-----  10 08    BPL  $977F
  0x04D787 $9777: C-----  08       PHP  
  0x04D788 $9778: C-----  00       BRK  
  0x04D789 $9779: C-----  00       BRK  
  0x04D78A $977A: C-----  C0 C0    CPY  #$C0
  0x04D78C $977C: C-----  E0 E0    CPX  #$E0
  0x04D78E $977E: C-----  F0 F0    BEQ  $9770
  0x04D790 $9780: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D791 $9781: C-----  FE FE FE INC  $FEFE,X
  0x04D794 $9784: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D795 $9785: C-----  F8       SED  
  0x04D796 $9786: C-----  F0 C0    BEQ  $9748
  0x04D798 $9788: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D799 $9789: C-----  FD FD 01 SBC  $01FD,X
  0x04D79C $978C: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04D79D $978D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04D79E $978E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04D79F $978F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D7A0 $9790: C-----  00       BRK  
  0x04D7A1 $9791: C-----  00       BRK  
  0x04D7A2 $9792: C-----  00       BRK  
  0x04D7A3 $9793: C-----  00       BRK  
  0x04D7A4 $9794: C-----  00       BRK  
  0x04D7A5 $9795: C-----  00       BRK  
  0x04D7A6 $9796: C-----  00       BRK  
  0x04D7A7 $9797: C-----  08       PHP  
  0x04D7A8 $9798: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7A9 $9799: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7AA $979A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7AB $979B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7AC $979C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7AD $979D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7AE $979E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7AF $979F: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04D7B0 $97A0: C-----  00       BRK  
  0x04D7B1 $97A1: C-----  00       BRK  
  0x04D7B2 $97A2: C-----  00       BRK  
  0x04D7B3 $97A3: C-----  81 FF    STA  ($FF,X)
  0x04D7B5 $97A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7B6 $97A6: C-----  C0 FF    CPY  #$FF
  0x04D7B8 $97A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7B9 $97A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7BA $97AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7BB $97AB: C-----  7E 01 FF ROR  $FF01,X
  0x04D7BE $97AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D7BF $97AF: C-----  00       BRK  
  0x04D7C0 $97B0: C-----  18       CLC  
  0x04D7C1 $97B1: C-----  30 60    BMI  $9813
  0x04D7C3 $97B3: C-----  C0 81    CPY  #$81
  0x04D7C5 $97B5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D7C6 $97B6: C-----  3E F8 EF ROL  $EFF8,X
  0x04D7C9 $97B9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D7CA $97BA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D7CB $97BB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D7CC $97BC: C-----  FE F8 C0 INC  $C0F8,X
  0x04D7CF $97BF: C-----  00       BRK  
  0x04D7D0 $97C0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D7D1 $97C1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D7D2 $97C2: C-----  18       CLC  
  0x04D7D3 $97C3: C-----  78       SEI  
  0x04D7D4 $97C4: C-----  70 70    BVS  $9836
  0x04D7D6 $97C6: C-----  60       RTS  
  0x04D7D7 $97C7: C-----  60       RTS  
  0x04D7D8 $97C8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D7D9 $97C9: C-----  F8       SED  
  0x04D7DA $97CA: C-----  E0 80    CPX  #$80
  0x04D7DC $97CC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D7DD $97CD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D7DE $97CE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D7DF $97CF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D7E0 $97D0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D7E1 $97D1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D7E2 $97D2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D7E3 $97D3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D7E4 $97D4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D7E5 $97D5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D7E6 $97D6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D7E7 $97D7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D7E8 $97D8: C-----  F8       SED  
  0x04D7E9 $97D9: C-----  F8       SED  
  0x04D7EA $97DA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D7EB $97DB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D7EC $97DC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D7ED $97DD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D7EE $97DE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D7EF $97DF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D7F0 $97E0: C-----  60       RTS  
  0x04D7F1 $97E1: C-----  60       RTS  
  0x04D7F2 $97E2: C-----  C0 C0    CPY  #$C0
  0x04D7F4 $97E4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D7F5 $97E5: C-----  38       SEC  
  0x04D7F6 $97E6: C-----  46 81    LSR  $81
  0x04D7F8 $97E8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D7F9 $97E9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D7FA $97EA: C-----  00       BRK  
  0x04D7FB $97EB: C-----  00       BRK  
  0x04D7FC $97EC: C-----  00       BRK  
  0x04D7FD $97ED: C-----  00       BRK  
  0x04D7FE $97EE: C-----  38       SEC  
  0x04D7FF $97EF: C-----  7E FF FE ROR  $FEFF,X
  0x04D802 $97F2: C-----  00       BRK  
  0x04D803 $97F3: C-----  00       BRK  
  0x04D804 $97F4: C-----  00       BRK  
  0x04D805 $97F5: C-----  00       BRK  
  0x04D806 $97F6: C-----  00       BRK  
  0x04D807 $97F7: C-----  F8       SED  
  0x04D808 $97F8: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04D809 $97F9: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04D80A $97FA: C-----  00       BRK  
  0x04D80B $97FB: C-----  00       BRK  
  0x04D80C $97FC: C-----  00       BRK  
  0x04D80D $97FD: C-----  00       BRK  
  0x04D80E $97FE: C-----  00       BRK  
  0x04D80F $97FF: C-----  00       BRK  
  0x04D810 $9800: C-----  00       BRK  
  0x04D811 $9801: C-----  00       BRK  
  0x04D812 $9802: C-----  00       BRK  
  0x04D813 $9803: C-----  00       BRK  
  0x04D814 $9804: C-----  00       BRK  
  0x04D815 $9805: C-----  00       BRK  
  0x04D816 $9806: C-----  00       BRK  
  0x04D817 $9807: C-----  00       BRK  
  0x04D818 $9808: C-----  00       BRK  
  0x04D819 $9809: C-----  00       BRK  
  0x04D81A $980A: C-----  00       BRK  
  0x04D81B $980B: C-----  00       BRK  
  0x04D81C $980C: C-----  00       BRK  
  0x04D81D $980D: C-----  00       BRK  
  0x04D81E $980E: C-----  00       BRK  
  0x04D81F $980F: C-----  00       BRK  
  0x04D820 $9810: ------  .byte $FF
  0x04D821 $9811: ------  .byte $FF
  0x04D822 $9812: ------  .byte $FF
  0x04D823 $9813: ------  .byte $FF
  0x04D824 $9814: ------  .byte $FF
  0x04D825 $9815: ------  .byte $FF
  0x04D826 $9816: ------  .byte $FF
  0x04D827 $9817: ------  .byte $FF
  0x04D828 $9818: ------  .byte $00
  0x04D829 $9819: ------  .byte $00
  0x04D82A $981A: ------  .byte $00
  0x04D82B $981B: ------  .byte $00
  0x04D82C $981C: ------  .byte $00
  0x04D82D $981D: ------  .byte $00
  0x04D82E $981E: ------  .byte $00
  0x04D82F $981F: ------  .byte $00
  0x04D830 $9820: C-----  E0 44    CPX  #$44
  0x04D832 $9822: C-----  98       TYA  
  0x04D833 $9823: C-----  A8       TAY  
  0x04D834 $9824: C-----  50 50    BVC  $9876
  0x04D836 $9826: C-----  A0 A0    LDY  #$A0
  0x04D838 $9828: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D839 $9829: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04D83A $982A: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04D83B $982B: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04D83C $982C: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04D83D $982D: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04D83E $982E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D83F $982F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D840 $9830: C-----  00       BRK  
  0x04D841 $9831: C-----  00       BRK  
  0x04D842 $9832: C-----  00       BRK  
  0x04D843 $9833: C-----  00       BRK  
  0x04D844 $9834: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D845 $9835: C-----  09 1F    ORA  #$1F
  0x04D847 $9837: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D848 $9838: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D849 $9839: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D84A $983A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D84B $983B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D84C $983C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D84D $983D: C-----  F6 E9    INC  $E9,X
  0x04D84F $983F: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x04D850 $9840: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D851 $9841: C-----  08       PHP  
  0x04D852 $9842: C-----  08       PHP  
  0x04D853 $9843: C-----  08       PHP  
  0x04D854 $9844: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D855 $9845: C-----  38       SEC  
  0x04D856 $9846: C-----  40       RTI  
  0x04D857 $9847: C-----  B0 03    BCS  $984C
  0x04D859 $9849: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D85A $984A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D85B $984B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D85C $984C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D85D $984D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D85E $984E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D85F $984F: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04D860 $9850: C-----  48       PHA  
  0x04D861 $9851: C-----  90 10    BCC  $9863
  0x04D863 $9853: C-----  60       RTS  
  0x04D864 $9854: C-----  10 78    BPL  $98CE
  0x04D866 $9856: C-----  78       SEI  
  0x04D867 $9857: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04D868 $9858: C-----  00       BRK  
  0x04D869 $9859: C-----  00       BRK  
  0x04D86A $985A: C-----  00       BRK  
  0x04D86B $985B: C-----  00       BRK  
  0x04D86C $985C: C-----  00       BRK  
  0x04D86D $985D: C-----  00       BRK  
  0x04D86E $985E: C-----  20 50 00 JSR  $0050
  0x04D871 $9861: C-----  08       PHP  
  0x04D872 $9862: C-----  30 70    BMI  $98D4
  0x04D874 $9864: C-----  E0 E0    CPX  #$E0
  0x04D876 $9866: C-----  C0 C4    CPY  #$C4
  0x04D878 $9868: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D879 $9869: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04D87A $986A: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04D87B $986B: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04D87C $986C: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04D87D $986D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D87E $986E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04D87F $986F: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04D880 $9870: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04D881 $9871: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04D882 $9872: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04D883 $9873: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04D884 $9874: C-----  00       BRK  
  0x04D885 $9875: C-----  00       BRK  
  0x04D886 $9876: C-----  00       BRK  
  0x04D887 $9877: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D888 $9878: C-----  50 48    BVC  $98C2
  0x04D88A $987A: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04D88B $987B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04D88C $987C: C-----  00       BRK  
  0x04D88D $987D: C-----  00       BRK  
  0x04D88E $987E: C-----  00       BRK  
  0x04D88F $987F: C-----  00       BRK  
  0x04D890 $9880: C-----  24 2E    BIT  $2E
  0x04D892 $9882: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04D893 $9883: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04D894 $9884: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D895 $9885: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D896 $9886: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04D897 $9887: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D898 $9888: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04D899 $9889: C-----  15 14    ORA  $14,X
  0x04D89B $988B: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04D89C $988C: C-----  05 05    ORA  $05
  0x04D89E $988E: C-----  05 05    ORA  $05
  0x04D8A0 $9890: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D8A1 $9891: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8A2 $9892: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8A3 $9893: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8A4 $9894: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8A5 $9895: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8A6 $9896: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D8A7 $9897: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04D8A8 $9898: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04D8A9 $9899: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04D8AA $989A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04D8AB $989B: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D8AC $989C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04D8AD $989D: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04D8AE $989E: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04D8AF $989F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D8B0 $98A0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D8B1 $98A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D8B2 $98A2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D8B3 $98A3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D8B4 $98A4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D8B5 $98A5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D8B6 $98A6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D8B7 $98A7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D8B8 $98A8: C-----  05 03    ORA  $03
  0x04D8BA $98AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D8BB $98AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D8BC $98AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D8BD $98AD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D8BE $98AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D8BF $98AF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D8C0 $98B0: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04D8C1 $98B1: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04D8C2 $98B2: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04D8C3 $98B3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D8C4 $98B4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D8C5 $98B5: C-----  1D 18 0C ORA  $0C18,X
  0x04D8C8 $98B8: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D8C9 $98B9: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D8CA $98BA: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04D8CB $98BB: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04D8CC $98BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8CD $98BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8CE $98BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8CF $98BF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D8D0 $98C0: C-----  CC 98 B8 CPY  $B898
  0x04D8D3 $98C3: C-----  B8       CLV  
  0x04D8D4 $98C4: C-----  B1 B3    LDA  ($B3),Y
  0x04D8D6 $98C6: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x04D8D7 $98C7: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D8D8 $98C8: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x04D8D9 $98C9: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04D8DA $98CA: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04D8DB $98CB: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04D8DC $98CC: C-----  6E 6C 6D ROR  $6D6C
  0x04D8DF $98CF: C-----  AD 00 00 LDA  $0000
  0x04D8E2 $98D2: C-----  00       BRK  
  0x04D8E3 $98D3: C-----  20 20 30 JSR  $3020
  0x04D8E6 $98D6: C-----  B8       CLV  
  0x04D8E7 $98D7: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04D8E8 $98D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8E9 $98D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8EA $98DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8EB $98DB: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D8EC $98DC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D8ED $98DD: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04D8EE $98DE: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04D8EF $98DF: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04D8F0 $98E0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D8F1 $98E1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D8F2 $98E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8F3 $98E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8F4 $98E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D8F5 $98E5: C-----  FE FE FE INC  $FEFE,X
  0x04D8F8 $98E8: C-----  B5 D5    LDA  $D5,X
  0x04D8FA $98EA: C-----  F9 F0 FE SBC  $FEF0,Y
  0x04D8FD $98ED: C-----  FE FE FE INC  $FEFE,X
  0x04D900 $98F0: C-----  DE EF FF DEC  $FFEF,X
  0x04D903 $98F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D904 $98F4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04D905 $98F5: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04D906 $98F6: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04D907 $98F7: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04D908 $98F8: C-----  AD D6 E3 LDA  $E3D6
  0x04D90B $98FB: C-----  09 06    ORA  #$06
  0x04D90D $98FD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D90E $98FE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D90F $98FF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04D910 $9900: C-----  00       BRK  
  0x04D911 $9901: C-----  00       BRK  
  0x04D912 $9902: C-----  00       BRK  
  0x04D913 $9903: C-----  00       BRK  
  0x04D914 $9904: C-----  00       BRK  
  0x04D915 $9905: C-----  01 02    ORA  ($02,X)
  0x04D917 $9907: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04D918 $9908: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D919 $9909: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D91A $990A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D91B $990B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D91C $990C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D91D $990D: C-----  FE FC F0 INC  $F0FC,X
  0x04D920 $9910: C-----  01 02    ORA  ($02,X)
  0x04D922 $9912: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04D923 $9913: C-----  06 18    ASL  $18
  0x04D925 $9915: C-----  00       BRK  
  0x04D926 $9916: C-----  00       BRK  
  0x04D927 $9917: C-----  00       BRK  
  0x04D928 $9918: C-----  FE FC FC INC  $FCFC,X
  0x04D92B $991B: C-----  F9 E7 FF SBC  $FFE7,Y
  0x04D92E $991E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D92F $991F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D930 $9920: C-----  00       BRK  
  0x04D931 $9921: C-----  00       BRK  
  0x04D932 $9922: C-----  00       BRK  
  0x04D933 $9923: C-----  00       BRK  
  0x04D934 $9924: C-----  01 06    ORA  ($06,X)
  0x04D936 $9926: C-----  18       CLC  
  0x04D937 $9927: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x04D938 $9928: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D939 $9929: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D93A $992A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D93B $992B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D93C $992C: C-----  FE F8 E0 INC  $E0F8,X
  0x04D93F $992F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D940 $9930: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04D941 $9931: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04D942 $9932: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D943 $9933: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D944 $9934: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D945 $9935: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D946 $9936: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D947 $9937: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D948 $9938: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04D949 $9939: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04D94A $993A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D94B $993B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D94C $993C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04D94D $993D: C-----  F8       SED  
  0x04D94E $993E: C-----  F8       SED  
  0x04D94F $993F: C-----  F8       SED  
  0x04D950 $9940: C-----  C1 FE    CMP  ($FE,X)
  0x04D952 $9942: C-----  00       BRK  
  0x04D953 $9943: C-----  01 01    ORA  ($01,X)
  0x04D955 $9945: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D956 $9946: C-----  05 0E    ORA  $0E
  0x04D958 $9948: C-----  00       BRK  
  0x04D959 $9949: C-----  01 FF    ORA  ($FF,X)
  0x04D95B $994B: C-----  FE FE FC INC  $FCFE,X
  0x04D95E $994E: C-----  F8       SED  
  0x04D95F $994F: C-----  F1 D0    SBC  ($D0),Y
  0x04D961 $9951: C-----  90 B0    BCC  $9903
  0x04D963 $9953: C-----  30 50    BMI  $99A5
  0x04D965 $9955: C-----  A0 20    LDY  #$20
  0x04D967 $9957: C-----  20 00 00 JSR  $0000
  0x04D96A $995A: C-----  00       BRK  
  0x04D96B $995B: C-----  00       BRK  
  0x04D96C $995C: C-----  20 40 C0 JSR  $C040
  0x04D96F $995F: C-----  C0 18    CPY  #$18
  0x04D971 $9961: C-----  60       RTS  
  0x04D972 $9962: C-----  00       BRK  
  0x04D973 $9963: C-----  00       BRK  
  0x04D974 $9964: C-----  00       BRK  
  0x04D975 $9965: C-----  01 01    ORA  ($01,X)
  0x04D977 $9967: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04D978 $9968: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04D979 $9969: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D97A $996A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D97B $996B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D97C $996C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D97D $996D: C-----  FE FE FC INC  $FCFE,X
  0x04D980 $9970: C-----  40       RTI  
  0x04D981 $9971: C-----  40       RTI  
  0x04D982 $9972: C-----  40       RTI  
  0x04D983 $9973: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D984 $9974: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D985 $9975: C-----  00       BRK  
  0x04D986 $9976: C-----  00       BRK  
  0x04D987 $9977: C-----  00       BRK  
  0x04D988 $9978: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D989 $9979: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D98A $997A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D98B $997B: C-----  00       BRK  
  0x04D98C $997C: C-----  00       BRK  
  0x04D98D $997D: C-----  00       BRK  
  0x04D98E $997E: C-----  00       BRK  
  0x04D98F $997F: C-----  00       BRK  
  0x04D990 $9980: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04D991 $9981: C-----  30 E0    BMI  $9963
  0x04D993 $9983: C-----  00       BRK  
  0x04D994 $9984: C-----  E0 80    CPX  #$80
  0x04D996 $9986: C-----  00       BRK  
  0x04D997 $9987: C-----  00       BRK  
  0x04D998 $9988: C-----  E0 C0    CPX  #$C0
  0x04D99A $998A: C-----  00       BRK  
  0x04D99B $998B: C-----  00       BRK  
  0x04D99C $998C: C-----  00       BRK  
  0x04D99D $998D: C-----  00       BRK  
  0x04D99E $998E: C-----  00       BRK  
  0x04D99F $998F: C-----  00       BRK  
  0x04D9A0 $9990: C-----  08       PHP  
  0x04D9A1 $9991: C-----  0A       ASL  A
  0x04D9A2 $9992: C-----  16 1A    ASL  $1A,X
  0x04D9A4 $9994: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x04D9A5 $9995: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x04D9A6 $9996: C-----  C4 04    CPY  $04
  0x04D9A8 $9998: C-----  F0 F0    BEQ  $998A
  0x04D9AA $999A: C-----  E0 E4    CPX  #$E4
  0x04D9AC $999C: C-----  CC 9C 38 CPY  $389C
  0x04D9AF $999F: C-----  F8       SED  
  0x04D9B0 $99A0: C-----  00       BRK  
  0x04D9B1 $99A1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04D9B2 $99A2: C-----  E0 E4    CPX  #$E4
  0x04D9B4 $99A4: C-----  EE EF DF INC  $DFEF
  0x04D9B7 $99A7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04D9B8 $99A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9B9 $99A9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04D9BA $99AA: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04D9BB $99AB: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04D9BC $99AC: C-----  D5 DE    CMP  $DE,X
  0x04D9BE $99AE: C-----  AA       TAX  
  0x04D9BF $99AF: C-----  B6 09    LDX  $09,Y
  0x04D9C1 $99B1: C-----  09 12    ORA  #$12
  0x04D9C3 $99B3: C-----  26 48    ROL  $48
  0x04D9C5 $99B5: C-----  B4 C8    LDY  $C8,X
  0x04D9C7 $99B7: C-----  08       PHP  
  0x04D9C8 $99B8: C-----  F0 F0    BEQ  $99AA
  0x04D9CA $99BA: C-----  E0 C0    CPX  #$C0
  0x04D9CC $99BC: C-----  84 08    STY  $08
  0x04D9CE $99BE: C-----  30 F0    BMI  $99B0
  0x04D9D0 $99C0: C-----  05 09    ORA  $09
  0x04D9D2 $99C2: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04D9D3 $99C3: C-----  26 48    ROL  $48
  0x04D9D5 $99C5: C-----  B4 C8    LDY  $C8,X
  0x04D9D7 $99C7: C-----  08       PHP  
  0x04D9D8 $99C8: C-----  F8       SED  
  0x04D9D9 $99C9: C-----  F0 E0    BEQ  $99AB
  0x04D9DB $99CB: C-----  C0 84    CPY  #$84
  0x04D9DD $99CD: C-----  08       PHP  
  0x04D9DE $99CE: C-----  30 F0    BMI  $99C0
  0x04D9E0 $99D0: C-----  00       BRK  
  0x04D9E1 $99D1: C-----  01 0E    ORA  ($0E,X)
  0x04D9E3 $99D3: C-----  30 00    BMI  $99D5
  0x04D9E5 $99D5: C-----  00       BRK  
  0x04D9E6 $99D6: C-----  00       BRK  
  0x04D9E7 $99D7: C-----  00       BRK  
  0x04D9E8 $99D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9E9 $99D9: C-----  FE F1 CF INC  $CFF1,X
  0x04D9EC $99DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9ED $99DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9EE $99DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9EF $99DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9F0 $99E0: C-----  00       BRK  
  0x04D9F1 $99E1: C-----  00       BRK  
  0x04D9F2 $99E2: C-----  00       BRK  
  0x04D9F3 $99E3: C-----  00       BRK  
  0x04D9F4 $99E4: C-----  00       BRK  
  0x04D9F5 $99E5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04D9F6 $99E6: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04D9F7 $99E7: C-----  19 FF FF ORA  $FFFF,Y
  0x04D9FA $99EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9FB $99EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9FC $99EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04D9FD $99ED: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04D9FE $99EE: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04D9FF $99EF: C-----  E6 00    INC  $00
  0x04DA01 $99F1: C-----  00       BRK  
  0x04DA02 $99F2: C-----  00       BRK  
  0x04DA03 $99F3: C-----  00       BRK  
  0x04DA04 $99F4: C-----  20 60 C0 JSR  $C060
  0x04DA07 $99F7: C-----  C4 FF    CPY  $FF
  0x04DA09 $99F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA0A $99FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA0B $99FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA0C $99FC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DA0D $99FD: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04DA0E $99FE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DA0F $99FF: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04DA10 $9A00: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DA11 $9A01: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DA12 $9A02: C-----  01 01    ORA  ($01,X)
  0x04DA14 $9A04: C-----  00       BRK  
  0x04DA15 $9A05: C-----  00       BRK  
  0x04DA16 $9A06: C-----  00       BRK  
  0x04DA17 $9A07: C-----  00       BRK  
  0x04DA18 $9A08: C-----  01 01    ORA  ($01,X)
  0x04DA1A $9A0A: C-----  00       BRK  
  0x04DA1B $9A0B: C-----  00       BRK  
  0x04DA1C $9A0C: C-----  00       BRK  
  0x04DA1D $9A0D: C-----  00       BRK  
  0x04DA1E $9A0E: C-----  00       BRK  
  0x04DA1F $9A0F: C-----  00       BRK  
  0x04DA20 $9A10: C-----  06 02    ASL  $02
  0x04DA22 $9A12: C-----  08       PHP  
  0x04DA23 $9A13: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DA24 $9A14: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DA25 $9A15: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DA26 $9A16: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04DA27 $9A17: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04DA28 $9A18: C-----  F9 FD F7 SBC  $F7FD,Y
  0x04DA2B $9A1B: C-----  F0 73    BEQ  $9A90
  0x04DA2D $9A1D: C-----  71 3B    ADC  ($3B),Y
  0x04DA2F $9A1F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DA30 $9A20: C-----  F0 00    BEQ  $9A22
  0x04DA32 $9A22: C-----  01 01    ORA  ($01,X)
  0x04DA34 $9A24: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DA35 $9A25: C-----  00       BRK  
  0x04DA36 $9A26: C-----  00       BRK  
  0x04DA37 $9A27: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DA38 $9A28: C-----  F0 00    BEQ  $9A2A
  0x04DA3A $9A2A: C-----  00       BRK  
  0x04DA3B $9A2B: C-----  00       BRK  
  0x04DA3C $9A2C: C-----  00       BRK  
  0x04DA3D $9A2D: C-----  00       BRK  
  0x04DA3E $9A2E: C-----  00       BRK  
  0x04DA3F $9A2F: C-----  00       BRK  
  0x04DA40 $9A30: C-----  E0 F0    CPX  #$F0
  0x04DA42 $9A32: C-----  F8       SED  
  0x04DA43 $9A33: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DA44 $9A34: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DA45 $9A35: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DA46 $9A36: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DA47 $9A37: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DA48 $9A38: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DA49 $9A39: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DA4A $9A3A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DA4B $9A3B: C-----  00       BRK  
  0x04DA4C $9A3C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DA4D $9A3D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DA4E $9A3E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DA4F $9A3F: C-----  00       BRK  
  0x04DA50 $9A40: C-----  00       BRK  
  0x04DA51 $9A41: C-----  00       BRK  
  0x04DA52 $9A42: C-----  00       BRK  
  0x04DA53 $9A43: C-----  C0 E0    CPY  #$E0
  0x04DA55 $9A45: C-----  E0 C0    CPX  #$C0
  0x04DA57 $9A47: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DA58 $9A48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA59 $9A49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA5A $9A4A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA5B $9A4B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DA5C $9A4C: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04DA5D $9A4D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DA5E $9A4E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DA5F $9A4F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DA60 $9A50: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DA61 $9A51: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DA62 $9A52: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DA63 $9A53: C-----  01 03    ORA  ($03,X)
  0x04DA65 $9A55: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DA66 $9A56: C-----  00       BRK  
  0x04DA67 $9A57: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DA68 $9A58: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DA69 $9A59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA6A $9A5A: C-----  FE FE FD INC  $FDFE,X
  0x04DA6D $9A5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA6E $9A5E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA6F $9A5F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DA70 $9A60: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DA71 $9A61: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DA72 $9A62: C-----  FE FC F8 INC  $F8FC,X
  0x04DA75 $9A65: C-----  F0 F0    BEQ  $9A57
  0x04DA77 $9A67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA78 $9A68: C-----  F9 E7 1F SBC  $1FE7,Y
  0x04DA7B $9A6B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA7C $9A6C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA7D $9A6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA7E $9A6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DA7F $9A6F: C-----  00       BRK  
  0x04DA80 $9A70: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DA81 $9A71: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04DA82 $9A72: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DA83 $9A73: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04DA84 $9A74: C-----  0E 1C F0 ASL  $F01C
  0x04DA87 $9A77: C-----  C0 FE    CPY  #$FE
  0x04DA89 $9A79: C-----  FE FC FC INC  $FCFC,X
  0x04DA8C $9A7C: C-----  F8       SED  
  0x04DA8D $9A7D: C-----  E0 00    CPX  #$00
  0x04DA8F $9A7F: C-----  00       BRK  
  0x04DA90 $9A80: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04DA91 $9A81: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DA92 $9A82: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DA93 $9A83: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DA94 $9A84: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DA95 $9A85: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DA96 $9A86: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04DA97 $9A87: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04DA98 $9A88: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04DA99 $9A89: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04DA9A $9A8A: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04DA9B $9A8B: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04DA9C $9A8C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DA9D $9A8D: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04DA9E $9A8E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DA9F $9A8F: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DAA0 $9A90: C-----  00       BRK  
  0x04DAA1 $9A91: C-----  00       BRK  
  0x04DAA2 $9A92: C-----  00       BRK  
  0x04DAA3 $9A93: C-----  00       BRK  
  0x04DAA4 $9A94: C-----  00       BRK  
  0x04DAA5 $9A95: C-----  01 13    ORA  ($13,X)
  0x04DAA7 $9A97: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04DAA8 $9A98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAA9 $9A99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAAA $9A9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAAB $9A9B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAAC $9A9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAAD $9A9D: C-----  FE ED CB INC  $CBED,X
  0x04DAB0 $9AA0: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04DAB1 $9AA1: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x04DAB2 $9AA2: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04DAB3 $9AA3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DAB4 $9AA4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DAB5 $9AA5: C-----  1D 18 0C ORA  $0C18,X
  0x04DAB8 $9AA8: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DAB9 $9AA9: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DABA $9AAA: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04DABB $9AAB: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04DABC $9AAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DABD $9AAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DABE $9AAE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DABF $9AAF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DAC0 $9AB0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DAC1 $9AB1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DAC2 $9AB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAC3 $9AB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAC4 $9AB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAC5 $9AB5: C-----  FE FE FE INC  $FEFE,X
  0x04DAC8 $9AB8: C-----  B5 D5    LDA  $D5,X
  0x04DACA $9ABA: C-----  F9 F5 F8 SBC  $F8F5,Y
  0x04DACD $9ABD: C-----  FE FE FE INC  $FEFE,X
  0x04DAD0 $9AC0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DAD1 $9AC1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DAD2 $9AC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAD3 $9AC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAD4 $9AC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAD5 $9AC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAD6 $9AC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAD7 $9AC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAD8 $9AC8: C-----  B5 D5    LDA  $D5,X
  0x04DADA $9ACA: C-----  F9 FD FE SBC  $FEFD,Y
  0x04DADD $9ACD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DADE $9ACE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DADF $9ACF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAE0 $9AD0: C-----  06 02    ASL  $02
  0x04DAE2 $9AD2: C-----  08       PHP  
  0x04DAE3 $9AD3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DAE4 $9AD4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DAE5 $9AD5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DAE6 $9AD6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04DAE7 $9AD7: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04DAE8 $9AD8: C-----  F9 FD F7 SBC  $F7FD,Y
  0x04DAEB $9ADB: C-----  F0 73    BEQ  $9B50
  0x04DAED $9ADD: C-----  71 3B    ADC  ($3B),Y
  0x04DAEF $9ADF: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DAF0 $9AE0: C-----  DE EF F7 DEC  $F7EF,X
  0x04DAF3 $9AE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DAF4 $9AE4: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04DAF5 $9AE5: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04DAF6 $9AE6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04DAF7 $9AE7: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04DAF8 $9AE8: C-----  AD D6 CB LDA  $CBD6
  0x04DAFB $9AEB: C-----  19 06 07 ORA  $0706,Y
  0x04DAFE $9AEE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DAFF $9AEF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DB00 $9AF0: C-----  E0 E0    CPX  #$E0
  0x04DB02 $9AF2: C-----  F0 7F    BEQ  $9B73
  0x04DB04 $9AF4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DB05 $9AF5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DB06 $9AF6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DB07 $9AF7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DB08 $9AF8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DB09 $9AF9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DB0A $9AFA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DB0B $9AFB: C-----  00       BRK  
  0x04DB0C $9AFC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DB0D $9AFD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DB0E $9AFE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DB0F $9AFF: C-----  00       BRK  
  0x04DB10 $9B00: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DB11 $9B01: C-----  7E FE FD ROR  $FDFE,X
  0x04DB14 $9B04: C-----  F8       SED  
  0x04DB15 $9B05: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DB16 $9B06: C-----  C8       INY  
  0x04DB17 $9B07: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DB18 $9B08: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x04DB19 $9B09: C-----  AD 55 8A LDA  $8A55
  0x04DB1C $9B0C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04DB1D $9B0D: C-----  C8       INY  
  0x04DB1E $9B0E: C-----  30 E0    BMI  $9AF0
  0x04DB20 $9B10: C-----  10 20    BPL  $9B32
  0x04DB22 $9B12: C-----  40       RTI  
  0x04DB23 $9B13: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DB24 $9B14: C-----  00       BRK  
  0x04DB25 $9B15: C-----  00       BRK  
  0x04DB26 $9B16: C-----  00       BRK  
  0x04DB27 $9B17: C-----  00       BRK  
  0x04DB28 $9B18: C-----  E0 C0    CPX  #$C0
  0x04DB2A $9B1A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DB2B $9B1B: C-----  00       BRK  
  0x04DB2C $9B1C: C-----  00       BRK  
  0x04DB2D $9B1D: C-----  00       BRK  
  0x04DB2E $9B1E: C-----  00       BRK  
  0x04DB2F $9B1F: C-----  00       BRK  
  0x04DB30 $9B20: C-----  E0 B0    CPX  #$B0
  0x04DB32 $9B22: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DB33 $9B23: C-----  00       BRK  
  0x04DB34 $9B24: C-----  00       BRK  
  0x04DB35 $9B25: C-----  38       SEC  
  0x04DB36 $9B26: C-----  46 81    LSR  $81
  0x04DB38 $9B28: C-----  00       BRK  
  0x04DB39 $9B29: C-----  00       BRK  
  0x04DB3A $9B2A: C-----  00       BRK  
  0x04DB3B $9B2B: C-----  00       BRK  
  0x04DB3C $9B2C: C-----  00       BRK  
  0x04DB3D $9B2D: C-----  00       BRK  
  0x04DB3E $9B2E: C-----  38       SEC  
  0x04DB3F $9B2F: C-----  7E 00 00 ROR  $0000,X
  0x04DB42 $9B32: C-----  00       BRK  
  0x04DB43 $9B33: C-----  00       BRK  
  0x04DB44 $9B34: C-----  00       BRK  
  0x04DB45 $9B35: C-----  00       BRK  
  0x04DB46 $9B36: C-----  00       BRK  
  0x04DB47 $9B37: C-----  00       BRK  
  0x04DB48 $9B38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB49 $9B39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB4A $9B3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB4B $9B3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB4C $9B3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB4D $9B3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB4E $9B3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB4F $9B3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB50 $9B40: C-----  24 2E    BIT  $2E
  0x04DB52 $9B42: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04DB53 $9B43: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04DB54 $9B44: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DB55 $9B45: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DB56 $9B46: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DB57 $9B47: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DB58 $9B48: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04DB59 $9B49: C-----  15 14    ORA  $14,X
  0x04DB5B $9B4B: C-----  15 05    ORA  $05,X
  0x04DB5D $9B4D: C-----  05 05    ORA  $05
  0x04DB5F $9B4F: C-----  05 3B    ORA  $3B
  0x04DB61 $9B51: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DB62 $9B52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB63 $9B53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB64 $9B54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB65 $9B55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB66 $9B56: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DB67 $9B57: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04DB68 $9B58: C-----  D5 2B    CMP  $2B,X
  0x04DB6A $9B5A: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04DB6B $9B5B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DB6C $9B5C: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04DB6D $9B5D: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DB6E $9B5E: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DB6F $9B5F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DB70 $9B60: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DB71 $9B61: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DB72 $9B62: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DB73 $9B63: C-----  06 06    ASL  $06
  0x04DB75 $9B65: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DB76 $9B66: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DB77 $9B67: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DB78 $9B68: C-----  05 01    ORA  $01
  0x04DB7A $9B6A: C-----  01 03    ORA  ($03,X)
  0x04DB7C $9B6C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DB7D $9B6D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DB7E $9B6E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DB7F $9B6F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DB80 $9B70: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04DB81 $9B71: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04DB82 $9B72: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04DB83 $9B73: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DB84 $9B74: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DB85 $9B75: C-----  0D 18 0C ORA  $0C18
  0x04DB88 $9B78: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DB89 $9B79: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DB8A $9B7A: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DB8B $9B7B: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04DB8C $9B7C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04DB8D $9B7D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB8E $9B7E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DB8F $9B7F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DB90 $9B80: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04DB91 $9B81: C-----  A8       TAY  
  0x04DB92 $9B82: C-----  28       PLP  
  0x04DB93 $9B83: C-----  68       PLA  
  0x04DB94 $9B84: C-----  08       PHP  
  0x04DB95 $9B85: C-----  68       PLA  
  0x04DB96 $9B86: C-----  70 78    BVS  $9C00
  0x04DB98 $9B88: C-----  00       BRK  
  0x04DB99 $9B89: C-----  00       BRK  
  0x04DB9A $9B8A: C-----  00       BRK  
  0x04DB9B $9B8B: C-----  00       BRK  
  0x04DB9C $9B8C: C-----  00       BRK  
  0x04DB9D $9B8D: C-----  00       BRK  
  0x04DB9E $9B8E: C-----  20 50 2A JSR  $2A50
  0x04DBA1 $9B91: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04DBA2 $9B92: C-----  B8       CLV  
  0x04DBA3 $9B93: C-----  E0 30    CPX  #$30
  0x04DBA5 $9B95: C-----  78       SEI  
  0x04DBA6 $9B96: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DBA7 $9B97: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DBA8 $9B98: C-----  00       BRK  
  0x04DBA9 $9B99: C-----  00       BRK  
  0x04DBAA $9B9A: C-----  00       BRK  
  0x04DBAB $9B9B: C-----  00       BRK  
  0x04DBAC $9B9C: C-----  00       BRK  
  0x04DBAD $9B9D: C-----  00       BRK  
  0x04DBAE $9B9E: C-----  20 58 7C JSR  $7C58
  0x04DBB1 $9BA1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DBB2 $9BA2: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DBB3 $9BA3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DBB4 $9BA4: C-----  00       BRK  
  0x04DBB5 $9BA5: C-----  00       BRK  
  0x04DBB6 $9BA6: C-----  00       BRK  
  0x04DBB7 $9BA7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DBB8 $9BA8: C-----  50 4C    BVC  $9BF6
  0x04DBBA $9BAA: C-----  24 1C    BIT  $1C
  0x04DBBC $9BAC: C-----  00       BRK  
  0x04DBBD $9BAD: C-----  00       BRK  
  0x04DBBE $9BAE: C-----  00       BRK  
  0x04DBBF $9BAF: C-----  00       BRK  
  0x04DBC0 $9BB0: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DBC1 $9BB1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DBC2 $9BB2: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DBC3 $9BB3: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DBC4 $9BB4: C-----  18       CLC  
  0x04DBC5 $9BB5: C-----  00       BRK  
  0x04DBC6 $9BB6: C-----  00       BRK  
  0x04DBC7 $9BB7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DBC8 $9BB8: C-----  50 48    BVC  $9C02
  0x04DBCA $9BBA: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04DBCB $9BBB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DBCC $9BBC: C-----  18       CLC  
  0x04DBCD $9BBD: C-----  00       BRK  
  0x04DBCE $9BBE: C-----  00       BRK  
  0x04DBCF $9BBF: C-----  00       BRK  
  0x04DBD0 $9BC0: C-----  DE EF FF DEC  $FFEF,X
  0x04DBD3 $9BC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBD4 $9BC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBD5 $9BC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBD6 $9BC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBD7 $9BC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBD8 $9BC8: C-----  AD D6 E3 LDA  $E3D6
  0x04DBDB $9BCB: C-----  F9 FE FF SBC  $FFFE,Y
  0x04DBDE $9BCE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBDF $9BCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBE0 $9BD0: C-----  06 02    ASL  $02
  0x04DBE2 $9BD2: C-----  08       PHP  
  0x04DBE3 $9BD3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DBE4 $9BD4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DBE5 $9BD5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DBE6 $9BD6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04DBE7 $9BD7: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04DBE8 $9BD8: C-----  F9 FD F7 SBC  $F7FD,Y
  0x04DBEB $9BDB: C-----  F0 77    BEQ  $9C54
  0x04DBED $9BDD: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04DBEE $9BDE: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04DBEF $9BDF: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DBF0 $9BE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBF1 $9BE1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DBF2 $9BE2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DBF3 $9BE3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DBF4 $9BE4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DBF5 $9BE5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DBF6 $9BE6: C-----  00       BRK  
  0x04DBF7 $9BE7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DBF8 $9BE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBF9 $9BE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBFA $9BEA: C-----  FE FE FD INC  $FDFE,X
  0x04DBFD $9BED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBFE $9BEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DBFF $9BEF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DC00 $9BF0: C-----  E0 E0    CPX  #$E0
  0x04DC02 $9BF2: C-----  F0 7F    BEQ  $9C73
  0x04DC04 $9BF4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DC05 $9BF5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DC06 $9BF6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DC07 $9BF7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DC08 $9BF8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DC09 $9BF9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DC0A $9BFA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DC0B $9BFB: C-----  00       BRK  
  0x04DC0C $9BFC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DC0D $9BFD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DC0E $9BFE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DC0F $9BFF: C-----  00       BRK  
  0x04DC10 $9C00: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04DC11 $9C01: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DC12 $9C02: C-----  01 02    ORA  ($02,X)
  0x04DC14 $9C04: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DC15 $9C05: C-----  05 0F    ORA  $0F
  0x04DC17 $9C07: C-----  31 03    AND  ($03),Y
  0x04DC19 $9C09: C-----  00       BRK  
  0x04DC1A $9C0A: C-----  00       BRK  
  0x04DC1B $9C0B: C-----  01 01    ORA  ($01,X)
  0x04DC1D $9C0D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DC1E $9C0E: C-----  00       BRK  
  0x04DC1F $9C0F: C-----  00       BRK  
  0x04DC20 $9C10: C-----  00       BRK  
  0x04DC21 $9C11: C-----  00       BRK  
  0x04DC22 $9C12: C-----  00       BRK  
  0x04DC23 $9C13: C-----  00       BRK  
  0x04DC24 $9C14: C-----  00       BRK  
  0x04DC25 $9C15: C-----  01 06    ORA  ($06,X)
  0x04DC27 $9C17: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DC28 $9C18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC29 $9C19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC2A $9C1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC2B $9C1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC2C $9C1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC2D $9C1D: C-----  FE F9 E3 INC  $E3F9,X
  0x04DC30 $9C20: C-----  20 22 23 JSR  $2322
  0x04DC33 $9C23: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04DC34 $9C24: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04DC35 $9C25: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04DC36 $9C26: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DC37 $9C27: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DC38 $9C28: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DC39 $9C29: C-----  1D 1C 1C ORA  $1C1C,X
  0x04DC3C $9C2C: C-----  0D 05 01 ORA  $0105
  0x04DC3F $9C2F: C-----  01 79    ORA  ($79,X)
  0x04DC41 $9C31: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04DC42 $9C32: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DC43 $9C33: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DC44 $9C34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC45 $9C35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC46 $9C36: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04DC47 $9C37: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04DC48 $9C38: C-----  96 6D    STX  $6D,Y
  0x04DC4A $9C3A: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04DC4B $9C3B: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04DC4C $9C3C: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04DC4D $9C3D: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DC4E $9C3E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DC4F $9C3F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DC50 $9C40: C-----  00       BRK  
  0x04DC51 $9C41: C-----  00       BRK  
  0x04DC52 $9C42: C-----  00       BRK  
  0x04DC53 $9C43: C-----  00       BRK  
  0x04DC54 $9C44: C-----  00       BRK  
  0x04DC55 $9C45: C-----  00       BRK  
  0x04DC56 $9C46: C-----  60       RTS  
  0x04DC57 $9C47: C-----  E0 FF    CPX  #$FF
  0x04DC59 $9C49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC5A $9C4A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC5B $9C4B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC5C $9C4C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC5D $9C4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC5E $9C4E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04DC5F $9C4F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DC60 $9C50: C-----  00       BRK  
  0x04DC61 $9C51: C-----  00       BRK  
  0x04DC62 $9C52: C-----  00       BRK  
  0x04DC63 $9C53: C-----  00       BRK  
  0x04DC64 $9C54: C-----  00       BRK  
  0x04DC65 $9C55: C-----  00       BRK  
  0x04DC66 $9C56: C-----  00       BRK  
  0x04DC67 $9C57: C-----  C0 FF    CPY  #$FF
  0x04DC69 $9C59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC6A $9C5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC6B $9C5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC6C $9C5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC6D $9C5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC6E $9C5E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC6F $9C5F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DC70 $9C60: C-----  E0 E0    CPX  #$E0
  0x04DC72 $9C62: C-----  E0 E8    CPX  #$E8
  0x04DC74 $9C64: C-----  E8       INX  
  0x04DC75 $9C65: C-----  E8       INX  
  0x04DC76 $9C66: C-----  E8       INX  
  0x04DC77 $9C67: C-----  FD DF DF SBC  $DFDF,X
  0x04DC7A $9C6A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DC7B $9C6B: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04DC7C $9C6C: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04DC7D $9C6D: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04DC7E $9C6E: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04DC7F $9C6F: C-----  CA       DEX  
  0x04DC80 $9C70: C-----  38       SEC  
  0x04DC81 $9C71: C-----  00       BRK  
  0x04DC82 $9C72: C-----  00       BRK  
  0x04DC83 $9C73: C-----  00       BRK  
  0x04DC84 $9C74: C-----  20 71 8F JSR  $8F71
  0x04DC87 $9C77: C-----  00       BRK  
  0x04DC88 $9C78: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04DC89 $9C79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC8A $9C7A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC8B $9C7B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DC8C $9C7C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DC8D $9C7D: C-----  8E 00 00 STX  $0000
  0x04DC90 $9C80: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DC91 $9C81: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DC92 $9C82: C-----  1E 1C 1C ASL  $1C1C,X
  0x04DC95 $9C85: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DC96 $9C86: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DC97 $9C87: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04DC98 $9C88: C-----  01 01    ORA  ($01,X)
  0x04DC9A $9C8A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DC9B $9C8B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DC9C $9C8C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DC9D $9C8D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DC9E $9C8E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DC9F $9C8F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DCA0 $9C90: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04DCA1 $9C91: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04DCA2 $9C92: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04DCA3 $9C93: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DCA4 $9C94: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DCA5 $9C95: C-----  1D 18 0C ORA  $0C18,X
  0x04DCA8 $9C98: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DCA9 $9C99: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DCAA $9C9A: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DCAB $9C9B: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04DCAC $9C9C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04DCAD $9C9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DCAE $9C9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DCAF $9C9F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DCB0 $9CA0: C-----  E0 F0    CPX  #$F0
  0x04DCB2 $9CA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DCB3 $9CA3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DCB4 $9CA4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DCB5 $9CA5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DCB6 $9CA6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DCB7 $9CA7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DCB8 $9CA8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DCB9 $9CA9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DCBA $9CAA: C-----  00       BRK  
  0x04DCBB $9CAB: C-----  00       BRK  
  0x04DCBC $9CAC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DCBD $9CAD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DCBE $9CAE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DCBF $9CAF: C-----  00       BRK  
  0x04DCC0 $9CB0: C-----  06 02    ASL  $02
  0x04DCC2 $9CB2: C-----  08       PHP  
  0x04DCC3 $9CB3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DCC4 $9CB4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DCC5 $9CB5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DCC6 $9CB6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04DCC7 $9CB7: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04DCC8 $9CB8: C-----  F9 FD F7 SBC  $F7FD,Y
  0x04DCCB $9CBB: C-----  F0 77    BEQ  $9D34
  0x04DCCD $9CBD: C-----  76 3B    ROR  $3B,X
  0x04DCCF $9CBF: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DCD0 $9CC0: C-----  FD FC FE SBC  $FEFC,X
  0x04DCD3 $9CC3: C-----  FE FF FF INC  $FFFF,X
  0x04DCD6 $9CC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DCD7 $9CC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DCD8 $9CC8: C-----  CA       DEX  
  0x04DCD9 $9CC9: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04DCDA $9CCA: C-----  E5 F5    SBC  $F5
  0x04DCDC $9CCC: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04DCDD $9CCD: C-----  FE FF FF INC  $FFFF,X
  0x04DCE0 $9CD0: C-----  69 92    ADC  #$92
  0x04DCE2 $9CD2: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04DCE3 $9CD3: C-----  68       PLA  
  0x04DCE4 $9CD4: C-----  B0 78    BCS  $9D4E
  0x04DCE6 $9CD6: C-----  F8       SED  
  0x04DCE7 $9CD7: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DCE8 $9CD8: C-----  00       BRK  
  0x04DCE9 $9CD9: C-----  00       BRK  
  0x04DCEA $9CDA: C-----  00       BRK  
  0x04DCEB $9CDB: C-----  00       BRK  
  0x04DCEC $9CDC: C-----  00       BRK  
  0x04DCED $9CDD: C-----  00       BRK  
  0x04DCEE $9CDE: C-----  60       RTS  
  0x04DCEF $9CDF: C-----  50 00    BVC  $9CE1
  0x04DCF1 $9CE1: C-----  00       BRK  
  0x04DCF2 $9CE2: C-----  00       BRK  
  0x04DCF3 $9CE3: C-----  C0 E0    CPY  #$E0
  0x04DCF5 $9CE5: C-----  E0 C0    CPX  #$C0
  0x04DCF7 $9CE7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DCF8 $9CE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DCF9 $9CE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DCFA $9CEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DCFB $9CEB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DCFC $9CEC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04DCFD $9CED: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04DCFE $9CEE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DCFF $9CEF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DD00 $9CF0: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DD01 $9CF1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DD02 $9CF2: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DD03 $9CF3: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DD04 $9CF4: C-----  18       CLC  
  0x04DD05 $9CF5: C-----  00       BRK  
  0x04DD06 $9CF6: C-----  00       BRK  
  0x04DD07 $9CF7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DD08 $9CF8: C-----  50 48    BVC  $9D42
  0x04DD0A $9CFA: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04DD0B $9CFB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DD0C $9CFC: C-----  18       CLC  
  0x04DD0D $9CFD: C-----  00       BRK  
  0x04DD0E $9CFE: C-----  00       BRK  
  0x04DD0F $9CFF: C-----  00       BRK  
  0x04DD10 $9D00: C-----  1E 04 08 ASL  $0804,X
  0x04DD13 $9D03: C-----  10 E0    BPL  $9CE5
  0x04DD15 $9D05: C-----  00       BRK  
  0x04DD16 $9D06: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DD17 $9D07: C-----  00       BRK  
  0x04DD18 $9D08: C-----  E0 F8    CPX  #$F8
  0x04DD1A $9D0A: C-----  F0 E0    BEQ  $9CEC
  0x04DD1C $9D0C: C-----  00       BRK  
  0x04DD1D $9D0D: C-----  00       BRK  
  0x04DD1E $9D0E: C-----  00       BRK  
  0x04DD1F $9D0F: C-----  00       BRK  
  0x04DD20 $9D10: C-----  00       BRK  
  0x04DD21 $9D11: C-----  00       BRK  
  0x04DD22 $9D12: C-----  00       BRK  
  0x04DD23 $9D13: C-----  00       BRK  
  0x04DD24 $9D14: C-----  00       BRK  
  0x04DD25 $9D15: C-----  00       BRK  
  0x04DD26 $9D16: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DD27 $9D17: C-----  18       CLC  
  0x04DD28 $9D18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD29 $9D19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD2A $9D1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD2B $9D1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD2C $9D1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD2D $9D1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD2E $9D1E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DD2F $9D1F: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04DD30 $9D20: C-----  20 24 24 JSR  $2424
  0x04DD33 $9D23: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04DD34 $9D24: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04DD35 $9D25: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04DD36 $9D26: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04DD37 $9D27: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04DD38 $9D28: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DD39 $9D29: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04DD3A $9D2A: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04DD3B $9D2B: C-----  1D 0C 0D ORA  $0D0C,X
  0x04DD3E $9D2E: C-----  0D 05 39 ORA  $3905
  0x04DD41 $9D31: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04DD42 $9D32: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DD43 $9D33: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DD44 $9D34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD45 $9D35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD46 $9D36: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DD47 $9D37: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DD48 $9D38: C-----  D6 AD    DEC  $AD,X
  0x04DD4A $9D3A: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04DD4B $9D3B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04DD4C $9D3C: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04DD4D $9D3D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DD4E $9D3E: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DD4F $9D3F: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DD50 $9D40: C-----  00       BRK  
  0x04DD51 $9D41: C-----  00       BRK  
  0x04DD52 $9D42: C-----  00       BRK  
  0x04DD53 $9D43: C-----  00       BRK  
  0x04DD54 $9D44: C-----  00       BRK  
  0x04DD55 $9D45: C-----  20 40 C0 JSR  $C040
  0x04DD58 $9D48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD59 $9D49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD5A $9D4A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD5B $9D4B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD5C $9D4C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD5D $9D4D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DD5E $9D4E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DD5F $9D4F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DD60 $9D50: C-----  01 01    ORA  ($01,X)
  0x04DD62 $9D52: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DD63 $9D53: C-----  00       BRK  
  0x04DD64 $9D54: C-----  00       BRK  
  0x04DD65 $9D55: C-----  00       BRK  
  0x04DD66 $9D56: C-----  00       BRK  
  0x04DD67 $9D57: C-----  00       BRK  
  0x04DD68 $9D58: C-----  FE FE FD INC  $FDFE,X
  0x04DD6B $9D5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD6C $9D5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD6D $9D5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD6E $9D5E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD6F $9D5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DD70 $9D60: C-----  C0 C0    CPY  #$C0
  0x04DD72 $9D62: C-----  C0 C0    CPY  #$C0
  0x04DD74 $9D64: C-----  C0 C4    CPY  #$C4
  0x04DD76 $9D66: C-----  E4 E4    CPX  $E4
  0x04DD78 $9D68: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DD79 $9D69: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DD7A $9D6A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DD7B $9D6B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DD7C $9D6C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04DD7D $9D6D: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04DD7E $9D6E: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04DD7F $9D6F: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04DD80 $9D70: C-----  20 20 10 JSR  $1020
  0x04DD83 $9D73: C-----  88       DEY  
  0x04DD84 $9D74: C-----  C4 32    CPY  $32
  0x04DD86 $9D76: C-----  FD FF DF SBC  $DFFF,X
  0x04DD89 $9D79: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DD8A $9D7A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DD8B $9D7B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04DD8C $9D7C: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04DD8D $9D7D: C-----  CD 12 FC CMP  $FC12
  0x04DD90 $9D80: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DD91 $9D81: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DD92 $9D82: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DD93 $9D83: C-----  06 04    ASL  $04
  0x04DD95 $9D85: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DD96 $9D86: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DD97 $9D87: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DD98 $9D88: C-----  01 01    ORA  ($01,X)
  0x04DD9A $9D8A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DD9B $9D8B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DD9C $9D8C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DD9D $9D8D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DD9E $9D8E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DD9F $9D8F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DDA0 $9D90: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DDA1 $9D91: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04DDA2 $9D92: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DDA3 $9D93: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DDA4 $9D94: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DDA5 $9D95: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DDA6 $9D96: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04DDA7 $9D97: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04DDA8 $9D98: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DDA9 $9D99: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DDAA $9D9A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DDAB $9D9B: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04DDAC $9D9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDAD $9D9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDAE $9D9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDAF $9D9F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DDB0 $9DA0: C-----  29 52    AND  #$52
  0x04DDB2 $9DA2: C-----  94 E8    STY  $E8,X
  0x04DDB4 $9DA4: C-----  30 70    BMI  $9E16
  0x04DDB6 $9DA6: C-----  78       SEI  
  0x04DDB7 $9DA7: C-----  58       CLI  
  0x04DDB8 $9DA8: C-----  00       BRK  
  0x04DDB9 $9DA9: C-----  00       BRK  
  0x04DDBA $9DAA: C-----  00       BRK  
  0x04DDBB $9DAB: C-----  00       BRK  
  0x04DDBC $9DAC: C-----  00       BRK  
  0x04DDBD $9DAD: C-----  00       BRK  
  0x04DDBE $9DAE: C-----  20 70 00 JSR  $0070
  0x04DDC1 $9DB1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DDC2 $9DB2: C-----  08       PHP  
  0x04DDC3 $9DB3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DDC4 $9DB4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DDC5 $9DB5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DDC6 $9DB6: C-----  08       PHP  
  0x04DDC7 $9DB7: C-----  11 00    ORA  ($00),Y
  0x04DDC9 $9DB9: C-----  00       BRK  
  0x04DDCA $9DBA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DDCB $9DBB: C-----  00       BRK  
  0x04DDCC $9DBC: C-----  00       BRK  
  0x04DDCD $9DBD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DDCE $9DBE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DDCF $9DBF: C-----  0E E2 F2 ASL  $F2E2
  0x04DDD2 $9DC2: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04DDD3 $9DC3: C-----  F9 FC FF SBC  $FFFC,Y
  0x04DDD6 $9DC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDD7 $9DC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDD8 $9DC8: C-----  DD ED EC CMP  $ECED,X
  0x04DDDB $9DCB: C-----  F6 FB    INC  $FB,X
  0x04DDDD $9DCD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DDDE $9DCE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDDF $9DCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDE0 $9DD0: C-----  01 01    ORA  ($01,X)
  0x04DDE2 $9DD2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DDE3 $9DD3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DDE4 $9DD4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DDE5 $9DD5: C-----  08       PHP  
  0x04DDE6 $9DD6: C-----  10 3F    BPL  $9E17
  0x04DDE8 $9DD8: C-----  00       BRK  
  0x04DDE9 $9DD9: C-----  00       BRK  
  0x04DDEA $9DDA: C-----  01 01    ORA  ($01,X)
  0x04DDEC $9DDC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DDED $9DDD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DDEE $9DDE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DDEF $9DDF: C-----  00       BRK  
  0x04DDF0 $9DE0: C-----  C0 00    CPY  #$00
  0x04DDF2 $9DE2: C-----  78       SEI  
  0x04DDF3 $9DE3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DDF4 $9DE4: C-----  00       BRK  
  0x04DDF5 $9DE5: C-----  00       BRK  
  0x04DDF6 $9DE6: C-----  00       BRK  
  0x04DDF7 $9DE7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DDF8 $9DE8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DDF9 $9DE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDFA $9DEA: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DDFB $9DEB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DDFC $9DEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDFD $9DED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDFE $9DEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DDFF $9DEF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DE00 $9DF0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DE01 $9DF1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DE02 $9DF2: C-----  05 09    ORA  $09
  0x04DE04 $9DF4: C-----  00       BRK  
  0x04DE05 $9DF5: C-----  00       BRK  
  0x04DE06 $9DF6: C-----  00       BRK  
  0x04DE07 $9DF7: C-----  00       BRK  
  0x04DE08 $9DF8: C-----  01 01    ORA  ($01,X)
  0x04DE0A $9DFA: C-----  00       BRK  
  0x04DE0B $9DFB: C-----  00       BRK  
  0x04DE0C $9DFC: C-----  00       BRK  
  0x04DE0D $9DFD: C-----  00       BRK  
  0x04DE0E $9DFE: C-----  00       BRK  
  0x04DE0F $9DFF: C-----  00       BRK  
  0x04DE10 $9E00: C-----  00       BRK  
  0x04DE11 $9E01: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DE12 $9E02: C-----  88       DEY  
  0x04DE13 $9E03: C-----  88       DEY  
  0x04DE14 $9E04: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04DE15 $9E05: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04DE16 $9E06: C-----  A2 F1    LDX  #$F1
  0x04DE18 $9E08: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DE19 $9E09: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DE1A $9E0A: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04DE1B $9E0B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04DE1C $9E0C: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04DE1D $9E0D: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04DE1E $9E0E: C-----  5D AE 00 EOR  $00AE,X
  0x04DE21 $9E11: C-----  00       BRK  
  0x04DE22 $9E12: C-----  00       BRK  
  0x04DE23 $9E13: C-----  00       BRK  
  0x04DE24 $9E14: C-----  00       BRK  
  0x04DE25 $9E15: C-----  38       SEC  
  0x04DE26 $9E16: C-----  46 81    LSR  $81
  0x04DE28 $9E18: C-----  00       BRK  
  0x04DE29 $9E19: C-----  00       BRK  
  0x04DE2A $9E1A: C-----  00       BRK  
  0x04DE2B $9E1B: C-----  00       BRK  
  0x04DE2C $9E1C: C-----  00       BRK  
  0x04DE2D $9E1D: C-----  00       BRK  
  0x04DE2E $9E1E: C-----  38       SEC  
  0x04DE2F $9E1F: C-----  7E 3C 1F ROR  $1F3C,X
  0x04DE32 $9E22: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DE33 $9E23: C-----  06 06    ASL  $06
  0x04DE35 $9E25: C-----  0D 0F 3F ORA  $3F0F
  0x04DE38 $9E28: C-----  F0 FC    BEQ  $9E26
  0x04DE3A $9E2A: C-----  FE FC FC INC  $FCFC,X
  0x04DE3D $9E2D: C-----  F8       SED  
  0x04DE3E $9E2E: C-----  F0 CE    BEQ  $9DFE
  0x04DE40 $9E30: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DE41 $9E31: C-----  08       PHP  
  0x04DE42 $9E32: C-----  08       PHP  
  0x04DE43 $9E33: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04DE44 $9E34: C-----  D8       CLD  
  0x04DE45 $9E35: C-----  D0 A0    BNE  $9DD7
  0x04DE47 $9E37: C-----  C0 7F    CPY  #$7F
  0x04DE49 $9E39: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DE4A $9E3A: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DE4B $9E3B: C-----  B0 20    BCS  $9E5D
  0x04DE4D $9E3D: C-----  20 40 00 JSR  $0040
  0x04DE50 $9E40: C-----  00       BRK  
  0x04DE51 $9E41: C-----  00       BRK  
  0x04DE52 $9E42: C-----  01 06    ORA  ($06,X)
  0x04DE54 $9E44: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DE55 $9E45: C-----  00       BRK  
  0x04DE56 $9E46: C-----  00       BRK  
  0x04DE57 $9E47: C-----  00       BRK  
  0x04DE58 $9E48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DE59 $9E49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DE5A $9E4A: C-----  FE F8 E0 INC  $E0F8,X
  0x04DE5D $9E4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DE5E $9E4E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DE5F $9E4F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DE60 $9E50: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04DE61 $9E51: C-----  05 0B    ORA  $0B
  0x04DE63 $9E53: C-----  15 2A    ORA  $2A,X
  0x04DE65 $9E55: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x04DE66 $9E56: C-----  C4 0A    CPY  $0A
  0x04DE68 $9E58: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DE69 $9E59: C-----  F8       SED  
  0x04DE6A $9E5A: C-----  F0 E2    BEQ  $9E3E
  0x04DE6C $9E5C: C-----  C4 8C    CPY  $8C
  0x04DE6E $9E5E: C-----  38       SEC  
  0x04DE6F $9E5F: C-----  F0 03    BEQ  $9E64
  0x04DE71 $9E61: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04DE72 $9E62: C-----  70 80    BVS  $9DE4
  0x04DE74 $9E64: C-----  00       BRK  
  0x04DE75 $9E65: C-----  00       BRK  
  0x04DE76 $9E66: C-----  00       BRK  
  0x04DE77 $9E67: C-----  00       BRK  
  0x04DE78 $9E68: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DE79 $9E69: C-----  F0 80    BEQ  $9DEB
  0x04DE7B $9E6B: C-----  00       BRK  
  0x04DE7C $9E6C: C-----  00       BRK  
  0x04DE7D $9E6D: C-----  00       BRK  
  0x04DE7E $9E6E: C-----  00       BRK  
  0x04DE7F $9E6F: C-----  00       BRK  
  0x04DE80 $9E70: C-----  16 6C    ASL  $6C,X
  0x04DE82 $9E72: C-----  B4 C8    LDY  $C8,X
  0x04DE84 $9E74: C-----  10 20    BPL  $9E96
  0x04DE86 $9E76: C-----  40       RTI  
  0x04DE87 $9E77: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DE88 $9E78: C-----  E0 80    CPX  #$80
  0x04DE8A $9E7A: C-----  08       PHP  
  0x04DE8B $9E7B: C-----  30 E0    BMI  $9E5D
  0x04DE8D $9E7D: C-----  C0 80    CPY  #$80
  0x04DE8F $9E7F: C-----  00       BRK  
  0x04DE90 $9E80: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DE91 $9E81: C-----  0E 1E 1C ASL  $1C1E
  0x04DE94 $9E84: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DE95 $9E85: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DE96 $9E86: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DE97 $9E87: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DE98 $9E88: C-----  01 01    ORA  ($01,X)
  0x04DE9A $9E8A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DE9B $9E8B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DE9C $9E8C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DE9D $9E8D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DE9E $9E8E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DE9F $9E8F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DEA0 $9E90: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04DEA1 $9E91: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DEA2 $9E92: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DEA3 $9E93: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DEA4 $9E94: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DEA5 $9E95: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DEA6 $9E96: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04DEA7 $9E97: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DEA8 $9E98: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04DEA9 $9E99: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04DEAA $9E9A: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04DEAB $9E9B: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04DEAC $9E9C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DEAD $9E9D: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04DEAE $9E9E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DEAF $9E9F: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DEB0 $9EA0: C-----  1E 0E 0F ASL  $0F0E,X
  0x04DEB3 $9EA3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DEB4 $9EA4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DEB5 $9EA5: C-----  00       BRK  
  0x04DEB6 $9EA6: C-----  00       BRK  
  0x04DEB7 $9EA7: C-----  00       BRK  
  0x04DEB8 $9EA8: C-----  01 01    ORA  ($01,X)
  0x04DEBA $9EAA: C-----  00       BRK  
  0x04DEBB $9EAB: C-----  00       BRK  
  0x04DEBC $9EAC: C-----  00       BRK  
  0x04DEBD $9EAD: C-----  00       BRK  
  0x04DEBE $9EAE: C-----  00       BRK  
  0x04DEBF $9EAF: C-----  00       BRK  
  0x04DEC0 $9EB0: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DEC1 $9EB1: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04DEC2 $9EB2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DEC3 $9EB3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04DEC4 $9EB4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DEC5 $9EB5: C-----  1D 08 0C ORA  $0C08,X
  0x04DEC8 $9EB8: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DEC9 $9EB9: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04DECA $9EBA: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04DECB $9EBB: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04DECC $9EBC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DECD $9EBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DECE $9EBE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DECF $9EBF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DED0 $9EC0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DED1 $9EC1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04DED2 $9EC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DED3 $9EC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DED4 $9EC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DED5 $9EC5: C-----  FE FE FF INC  $FFFE,X
  0x04DED8 $9EC8: C-----  B5 D5    LDA  $D5,X
  0x04DEDA $9ECA: C-----  F9 F5 F8 SBC  $F8F5,Y
  0x04DEDD $9ECD: C-----  FE FE FF INC  $FFFE,X
  0x04DEE0 $9ED0: C-----  DE EF F7 DEC  $F7EF,X
  0x04DEE3 $9ED3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DEE4 $9ED4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DEE5 $9ED5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DEE6 $9ED6: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04DEE7 $9ED7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DEE8 $9ED8: C-----  AD D6 CB LDA  $CBD6
  0x04DEEB $9EDB: C-----  19 06 07 ORA  $0706,Y
  0x04DEEE $9EDE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04DEEF $9EDF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DEF0 $9EE0: C-----  08       PHP  
  0x04DEF1 $9EE1: C-----  68       PLA  
  0x04DEF2 $9EE2: C-----  70 58    BVS  $9F3C
  0x04DEF4 $9EE4: C-----  50 5C    BVC  $9F42
  0x04DEF6 $9EE6: C-----  24 1C    BIT  $1C
  0x04DEF8 $9EE8: C-----  00       BRK  
  0x04DEF9 $9EE9: C-----  00       BRK  
  0x04DEFA $9EEA: C-----  20 70 7C JSR  $7C70
  0x04DEFD $9EED: C-----  6C 3C 1C JMP  ($1C3C)
  0x04DF00 $9EF0: C-----  19 08 40 ORA  $4008,Y
  0x04DF03 $9EF3: C-----  00       BRK  
  0x04DF04 $9EF4: C-----  00       BRK  
  0x04DF05 $9EF5: C-----  00       BRK  
  0x04DF06 $9EF6: C-----  00       BRK  
  0x04DF07 $9EF7: C-----  00       BRK  
  0x04DF08 $9EF8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF09 $9EF9: C-----  A0 80    LDY  #$80
  0x04DF0B $9EFB: C-----  60       RTS  
  0x04DF0C $9EFC: C-----  00       BRK  
  0x04DF0D $9EFD: C-----  00       BRK  
  0x04DF0E $9EFE: C-----  00       BRK  
  0x04DF0F $9EFF: C-----  00       BRK  
  0x04DF10 $9F00: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04DF11 $9F01: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04DF12 $9F02: C-----  60       RTS  
  0x04DF13 $9F03: C-----  38       SEC  
  0x04DF14 $9F04: C-----  00       BRK  
  0x04DF15 $9F05: C-----  00       BRK  
  0x04DF16 $9F06: C-----  00       BRK  
  0x04DF17 $9F07: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04DF18 $9F08: C-----  78       SEI  
  0x04DF19 $9F09: C-----  68       PLA  
  0x04DF1A $9F0A: C-----  78       SEI  
  0x04DF1B $9F0B: C-----  38       SEC  
  0x04DF1C $9F0C: C-----  00       BRK  
  0x04DF1D $9F0D: C-----  00       BRK  
  0x04DF1E $9F0E: C-----  00       BRK  
  0x04DF1F $9F0F: C-----  00       BRK  
  0x04DF20 $9F10: C-----  26 2C    ROL  $2C
  0x04DF22 $9F12: C-----  58       CLI  
  0x04DF23 $9F13: C-----  28       PLP  
  0x04DF24 $9F14: C-----  50 10    BVC  $9F26
  0x04DF26 $9F16: C-----  20 20 19 JSR  $1920
  0x04DF29 $9F19: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04DF2A $9F1A: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04DF2B $9F1B: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04DF2C $9F1C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DF2D $9F1D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DF2E $9F1E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DF2F $9F1F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DF30 $9F20: C-----  1E 04 08 ASL  $0804,X
  0x04DF33 $9F23: C-----  10 E0    BPL  $9F05
  0x04DF35 $9F25: C-----  00       BRK  
  0x04DF36 $9F26: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF37 $9F27: C-----  00       BRK  
  0x04DF38 $9F28: C-----  E0 F8    CPX  #$F8
  0x04DF3A $9F2A: C-----  F0 E0    BEQ  $9F0C
  0x04DF3C $9F2C: C-----  00       BRK  
  0x04DF3D $9F2D: C-----  00       BRK  
  0x04DF3E $9F2E: C-----  00       BRK  
  0x04DF3F $9F2F: C-----  00       BRK  
  0x04DF40 $9F30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF41 $9F31: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DF42 $9F32: C-----  3E 1E 1C ROL  $1C1E,X
  0x04DF45 $9F35: C-----  18       CLC  
  0x04DF46 $9F36: C-----  30 3F    BMI  $9F77
  0x04DF48 $9F38: C-----  FE FE FC INC  $FCFE,X
  0x04DF4B $9F3B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DF4C $9F3C: C-----  F8       SED  
  0x04DF4D $9F3D: C-----  F0 E0    BEQ  $9F1F
  0x04DF4F $9F3F: C-----  C0 39    CPY  #$39
  0x04DF51 $9F41: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04DF52 $9F42: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04DF53 $9F43: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04DF54 $9F44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF55 $9F45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF56 $9F46: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04DF57 $9F47: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DF58 $9F48: C-----  D6 AD    DEC  $AD,X
  0x04DF5A $9F4A: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04DF5B $9F4B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04DF5C $9F4C: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04DF5D $9F4D: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04DF5E $9F4E: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DF5F $9F4F: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04DF60 $9F50: C-----  F8       SED  
  0x04DF61 $9F51: C-----  FE 00 00 INC  $0000,X
  0x04DF64 $9F54: C-----  00       BRK  
  0x04DF65 $9F55: C-----  38       SEC  
  0x04DF66 $9F56: C-----  46 81    LSR  $81
  0x04DF68 $9F58: C-----  00       BRK  
  0x04DF69 $9F59: C-----  00       BRK  
  0x04DF6A $9F5A: C-----  00       BRK  
  0x04DF6B $9F5B: C-----  00       BRK  
  0x04DF6C $9F5C: C-----  00       BRK  
  0x04DF6D $9F5D: C-----  00       BRK  
  0x04DF6E $9F5E: C-----  38       SEC  
  0x04DF6F $9F5F: C-----  7E 00 00 ROR  $0000,X
  0x04DF72 $9F62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF73 $9F63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF74 $9F64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF75 $9F65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF76 $9F66: C-----  00       BRK  
  0x04DF77 $9F67: C-----  00       BRK  
  0x04DF78 $9F68: C-----  00       BRK  
  0x04DF79 $9F69: C-----  00       BRK  
  0x04DF7A $9F6A: C-----  00       BRK  
  0x04DF7B $9F6B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF7C $9F6C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF7D $9F6D: C-----  00       BRK  
  0x04DF7E $9F6E: C-----  00       BRK  
  0x04DF7F $9F6F: C-----  00       BRK  
  0x04DF80 $9F70: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DF81 $9F71: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DF82 $9F72: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DF83 $9F73: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DF84 $9F74: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DF85 $9F75: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DF86 $9F76: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DF87 $9F77: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DF88 $9F78: C-----  18       CLC  
  0x04DF89 $9F79: C-----  18       CLC  
  0x04DF8A $9F7A: C-----  18       CLC  
  0x04DF8B $9F7B: C-----  18       CLC  
  0x04DF8C $9F7C: C-----  18       CLC  
  0x04DF8D $9F7D: C-----  18       CLC  
  0x04DF8E $9F7E: C-----  18       CLC  
  0x04DF8F $9F7F: C-----  18       CLC  
  0x04DF90 $9F80: C-----  00       BRK  
  0x04DF91 $9F81: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF92 $9F82: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF93 $9F83: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF94 $9F84: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF95 $9F85: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF96 $9F86: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF97 $9F87: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04DF98 $9F88: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DF99 $9F89: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DF9A $9F8A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DF9B $9F8B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DF9C $9F8C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DF9D $9F8D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DF9E $9F8E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DF9F $9F8F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04DFA0 $9F90: C-----  00       BRK  
  0x04DFA1 $9F91: C-----  00       BRK  
  0x04DFA2 $9F92: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DFA3 $9F93: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DFA4 $9F94: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DFA5 $9F95: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DFA6 $9F96: C-----  3E 3C 00 ROL  $003C,X
  0x04DFA9 $9F99: C-----  00       BRK  
  0x04DFAA $9F9A: C-----  00       BRK  
  0x04DFAB $9F9B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DFAC $9F9C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DFAD $9F9D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DFAE $9F9E: C-----  18       CLC  
  0x04DFAF $9F9F: C-----  18       CLC  
  0x04DFB0 $9FA0: C-----  00       BRK  
  0x04DFB1 $9FA1: C-----  00       BRK  
  0x04DFB2 $9FA2: C-----  00       BRK  
  0x04DFB3 $9FA3: C-----  00       BRK  
  0x04DFB4 $9FA4: C-----  00       BRK  
  0x04DFB5 $9FA5: C-----  01 9F    ORA  ($9F,X)
  0x04DFB7 $9FA7: C-----  10 FF    BPL  $9FA8
  0x04DFB9 $9FA9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DFBA $9FAA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DFBB $9FAB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DFBC $9FAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04DFBD $9FAD: C-----  FE 60 E0 INC  $E060,X
  0x04DFC0 $9FB0: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DFC1 $9FB1: C-----  3E 3F 3F ROL  $3F3F,X
  0x04DFC4 $9FB4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04DFC5 $9FB5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DFC6 $9FB6: C-----  00       BRK  
  0x04DFC7 $9FB7: C-----  00       BRK  
  0x04DFC8 $9FB8: C-----  18       CLC  
  0x04DFC9 $9FB9: C-----  18       CLC  
  0x04DFCA $9FBA: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04DFCB $9FBB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04DFCC $9FBC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04DFCD $9FBD: C-----  00       BRK  
  0x04DFCE $9FBE: C-----  00       BRK  
  0x04DFCF $9FBF: C-----  00       BRK  
  0x04DFD0 $9FC0: C-----  00       BRK  
  0x04DFD1 $9FC1: C-----  00       BRK  
  0x04DFD2 $9FC2: C-----  F8       SED  
  0x04DFD3 $9FC3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DFD4 $9FC4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DFD5 $9FC5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DFD6 $9FC6: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DFD7 $9FC7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DFD8 $9FC8: C-----  00       BRK  
  0x04DFD9 $9FC9: C-----  00       BRK  
  0x04DFDA $9FCA: C-----  00       BRK  
  0x04DFDB $9FCB: C-----  F0 F8    BEQ  $9FC5
  0x04DFDD $9FCD: C-----  38       SEC  
  0x04DFDE $9FCE: C-----  18       CLC  
  0x04DFDF $9FCF: C-----  18       CLC  
  0x04DFE0 $9FD0: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DFE1 $9FD1: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04DFE2 $9FD2: C-----  8E 8E 8E STX  $8E8E
  0x04DFE5 $9FD5: C-----  8E 7C 00 STX  $007C
  0x04DFE8 $9FD8: C-----  00       BRK  
  0x04DFE9 $9FD9: C-----  00       BRK  
  0x04DFEA $9FDA: C-----  00       BRK  
  0x04DFEB $9FDB: C-----  00       BRK  
  0x04DFEC $9FDC: C-----  00       BRK  
  0x04DFED $9FDD: C-----  00       BRK  
  0x04DFEE $9FDE: C-----  00       BRK  
  0x04DFEF $9FDF: C-----  00       BRK  
  0x04DFF0 $9FE0: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04DFF1 $9FE1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04DFF2 $9FE2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DFF3 $9FE3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DFF4 $9FE4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04DFF5 $9FE5: C-----  F8       SED  
  0x04DFF6 $9FE6: C-----  00       BRK  
  0x04DFF7 $9FE7: C-----  00       BRK  
  0x04DFF8 $9FE8: C-----  18       CLC  
  0x04DFF9 $9FE9: C-----  18       CLC  
  0x04DFFA $9FEA: C-----  38       SEC  
  0x04DFFB $9FEB: C-----  F8       SED  
  0x04DFFC $9FEC: C-----  F0 00    BEQ  $9FEE
  0x04DFFE $9FEE: C-----  00       BRK  
  0x04DFFF $9FEF: C-----  00       BRK  
  0x04E000 $9FF0: C-----  00       BRK  
  0x04E001 $9FF1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04E002 $9FF2: C-----  70 70    BVS  $A064
  0x04E004 $9FF4: C-----  70 70    BVS  $A066
  0x04E006 $9FF6: C-----  00       BRK  
  0x04E007 $9FF7: C-----  00       BRK  
  0x04E008 $9FF8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04E009 $9FF9: C-----  FE FE FE INC  $FEFE,X
  0x04E00C $9FFC: C-----  FE FE 7C INC  $7CFE,X
  0x04E00F $9FFF: C-----  00       BRK  