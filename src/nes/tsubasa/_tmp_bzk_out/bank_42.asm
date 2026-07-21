; ===== MMC3 Bank 42 =====
; ROM: 0x054010-0x05600F
; CPU: $8000-$9FFF
; CDL: code=7760 data=0 unaccessed=432

  0x054010 $8000: C-----  00       BRK  
  0x054011 $8001: C-----  00       BRK  
  0x054012 $8002: C-----  00       BRK  
  0x054013 $8003: C-----  00       BRK  
  0x054014 $8004: C-----  00       BRK  
  0x054015 $8005: C-----  00       BRK  
  0x054016 $8006: C-----  00       BRK  
  0x054017 $8007: C-----  00       BRK  
  0x054018 $8008: C-----  00       BRK  
  0x054019 $8009: C-----  00       BRK  
  0x05401A $800A: C-----  00       BRK  
  0x05401B $800B: C-----  00       BRK  
  0x05401C $800C: C-----  00       BRK  
  0x05401D $800D: C-----  00       BRK  
  0x05401E $800E: C-----  00       BRK  
  0x05401F $800F: C-----  00       BRK  
  0x054020 $8010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054021 $8011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054022 $8012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054023 $8013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054024 $8014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054025 $8015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054026 $8016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054027 $8017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054028 $8018: C-----  00       BRK  
  0x054029 $8019: C-----  00       BRK  
  0x05402A $801A: C-----  00       BRK  
  0x05402B $801B: C-----  00       BRK  
  0x05402C $801C: C-----  00       BRK  
  0x05402D $801D: C-----  00       BRK  
  0x05402E $801E: C-----  00       BRK  
  0x05402F $801F: C-----  00       BRK  
  0x054030 $8020: C-----  11 FF    ORA  ($FF),Y
  0x054032 $8022: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054033 $8023: C-----  11 11    ORA  ($11),Y
  0x054035 $8025: C-----  11 3F    ORA  ($3F),Y
  0x054037 $8027: C-----  D1 11    CMP  ($11),Y
  0x054039 $8029: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05403A $802A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05403B $802B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05403C $802C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05403D $802D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05403E $802E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05403F $802F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054040 $8030: C-----  08       PHP  
  0x054041 $8031: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054042 $8032: C-----  08       PHP  
  0x054043 $8033: C-----  08       PHP  
  0x054044 $8034: C-----  84 FF    STY  $FF
  0x054046 $8036: C-----  84 84    STY  $84
  0x054048 $8038: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054049 $8039: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05404A $803A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05404B $803B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05404C $803C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05404D $803D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05404E $803E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05404F $803F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054050 $8040: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x054051 $8041: C-----  A9 1A    LDA  #$1A
  0x054053 $8043: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x054054 $8044: C-----  60       RTS  
  0x054055 $8045: C-----  35 17    AND  $17,X
  0x054057 $8047: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054058 $8048: C-----  00       BRK  
  0x054059 $8049: C-----  00       BRK  
  0x05405A $804A: C-----  21 8A    AND  ($8A,X)
  0x05405C $804C: C-----  69 16    ADC  #$16
  0x05405E $804E: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x05405F $804F: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x054060 $8050: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x054061 $8051: C-----  B9 1B 7F LDA  $7F1B,Y
  0x054064 $8054: C-----  E8       INX  
  0x054065 $8055: C-----  3D DF FC AND  $FCDF,X
  0x054068 $8058: C-----  90 10    BCC  $806A
  0x05406A $805A: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05406B $805B: C-----  FE E9 1E INC  $1EE9,X
  0x05406E $805E: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05406F $805F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x054070 $8060: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054071 $8061: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054072 $8062: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054073 $8063: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054074 $8064: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054075 $8065: C-----  C0 00    CPY  #$00
  0x054077 $8067: C-----  00       BRK  
  0x054078 $8068: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054079 $8069: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05407A $806A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05407B $806B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05407C $806C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05407D $806D: C-----  C0 00    CPY  #$00
  0x05407F $806F: C-----  00       BRK  
  0x054080 $8070: C-----  ED AB 3F SBC  $3FAB
  0x054083 $8073: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054084 $8074: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054085 $8075: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054086 $8076: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054087 $8077: C-----  E0 B0    CPX  #$B0
  0x054089 $8079: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05408A $807A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05408B $807B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05408C $807C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05408D $807D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05408E $807E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05408F $807F: C-----  E0 21    CPX  #$21
  0x054091 $8081: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054092 $8082: C-----  21 21    AND  ($21,X)
  0x054094 $8084: C-----  10 FF    BPL  $8085
  0x054096 $8086: C-----  10 10    BPL  $8098
  0x054098 $8088: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054099 $8089: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05409A $808A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05409B $808B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05409C $808C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05409D $808D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05409E $808E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05409F $808F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540A0 $8090: C-----  84 FF    STY  $FF
  0x0540A2 $8092: C-----  84 84    STY  $84
  0x0540A4 $8094: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0540A5 $8095: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540A6 $8096: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0540A7 $8097: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0540A8 $8098: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540A9 $8099: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540AA $809A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540AB $809B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540AC $809C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540AD $809D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540AE $809E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540AF $809F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540B0 $80A0: C-----  10 FF    BPL  $80A1
  0x0540B2 $80A2: C-----  10 10    BPL  $80B4
  0x0540B4 $80A4: C-----  08       PHP  
  0x0540B5 $80A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540B6 $80A6: C-----  08       PHP  
  0x0540B7 $80A7: C-----  08       PHP  
  0x0540B8 $80A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540B9 $80A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540BA $80AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540BB $80AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540BC $80AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540BD $80AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540BE $80AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540BF $80AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0540C0 $80B0: C-----  20 2F E0 JSR  $E02F
  0x0540C3 $80B3: C-----  20 10 17 JSR  $1710
  0x0540C6 $80B6: C-----  30 D0    BMI  $8088
  0x0540C8 $80B8: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0540C9 $80B9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0540CA $80BA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0540CB $80BB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0540CC $80BC: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0540CD $80BD: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0540CE $80BE: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0540CF $80BF: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0540D0 $80C0: C-----  00       BRK  
  0x0540D1 $80C1: C-----  08       PHP  
  0x0540D2 $80C2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0540D3 $80C3: C-----  FE 6F F5 INC  $F56F,X
  0x0540D6 $80C6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0540D7 $80C7: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0540D8 $80C8: C-----  00       BRK  
  0x0540D9 $80C9: C-----  01 8F    ORA  ($8F,X)
  0x0540DB $80CB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0540DC $80CC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0540DD $80CD: C-----  F6 2F    INC  $2F,X
  0x0540DF $80CF: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0540E0 $80D0: C-----  00       BRK  
  0x0540E1 $80D1: C-----  00       BRK  
  0x0540E2 $80D2: C-----  00       BRK  
  0x0540E3 $80D3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0540E4 $80D4: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0540E5 $80D5: C-----  F5 DF    SBC  $DF,X
  0x0540E7 $80D7: C-----  F0 00    BEQ  $80D9
  0x0540E9 $80D9: C-----  00       BRK  
  0x0540EA $80DA: C-----  00       BRK  
  0x0540EB $80DB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0540EC $80DC: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0540ED $80DD: C-----  F6 2F    INC  $2F,X
  0x0540EF $80DF: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0540F0 $80E0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0540F1 $80E1: C-----  F8       SED  
  0x0540F2 $80E2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0540F3 $80E3: C-----  FE 6F F0 INC  $F06F,X
  0x0540F6 $80E6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0540F7 $80E7: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0540F8 $80E8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0540F9 $80E9: C-----  F1 8F    SBC  ($8F),Y
  0x0540FB $80EB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0540FC $80EC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0540FD $80ED: C-----  F0 03    BEQ  $80F2
  0x0540FF $80EF: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x054100 $80F0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054101 $80F1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054102 $80F2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054103 $80F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054104 $80F4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054105 $80F5: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054106 $80F6: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054107 $80F7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054108 $80F8: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x054109 $80F9: C-----  F6 4F    INC  $4F,X
  0x05410B $80FB: C-----  F1 0F    SBC  ($0F),Y
  0x05410D $80FD: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05410E $80FE: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05410F $80FF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054110 $8100: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x054111 $8101: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054112 $8102: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x054113 $8103: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x054114 $8104: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x054115 $8105: C-----  F5 F5    SBC  $F5,X
  0x054117 $8107: C-----  E1 4F    SBC  ($4F,X)
  0x054119 $8109: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05411A $810A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05411B $810B: C-----  CA       DEX  
  0x05411C $810C: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x05411D $810D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05411E $810E: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x05411F $810F: C-----  75 1A    ADC  $1A,X
  0x054121 $8111: C-----  A9 3E    LDA  #$3E
  0x054123 $8113: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054124 $8114: C-----  E4 B5    CPX  $B5
  0x054126 $8116: C-----  FE C4 08 INC  $08C4,X
  0x054129 $8119: C-----  09 3F    ORA  #$3F
  0x05412B $811B: C-----  CA       DEX  
  0x05412C $811C: C-----  ED 97 BF SBC  $BF97
  0x05412F $811F: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x054130 $8120: C-----  A6 7F    LDX  $7F
  0x054132 $8122: C-----  4A       LSR  A
  0x054133 $8123: C-----  21 9F    AND  ($9F,X)
  0x054135 $8125: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054136 $8126: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054137 $8127: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054138 $8128: C-----  39 CA 84 AND  $84CA,Y
  0x05413B $812B: C-----  59 1F FF EOR  $FF1F,Y
  0x05413E $812E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05413F $812F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054140 $8130: C-----  4C 22 3D JMP  $3D22
  0x054143 $8133: C-----  E6 10    INC  $10
  0x054145 $8135: C-----  C9 2F    CMP  #$2F
  0x054147 $8137: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054148 $8138: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x054149 $8139: C-----  D9 2D 18 CMP  $182D,Y
  0x05414C $813C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05414D $813D: C-----  B1 0F    LDA  ($0F),Y
  0x05414F $813F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054150 $8140: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054151 $8141: C-----  A9 3B    LDA  #$3B
  0x054153 $8143: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054154 $8144: C-----  F8       SED  
  0x054155 $8145: C-----  35 D4    AND  $D4,X
  0x054157 $8147: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054158 $8148: C-----  F9 21 21 SBC  $2121,Y
  0x05415B $814B: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05415C $814C: C-----  F9 16 33 SBC  $3316,Y
  0x05415F $814F: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x054160 $8150: C-----  96 BF    STX  $BF,Y
  0x054162 $8152: C-----  FE DF 62 INC  $62DF,X
  0x054165 $8155: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054166 $8156: C-----  F6 C2    INC  $C2,X
  0x054168 $8158: C-----  84 9F    STY  $9F
  0x05416A $815A: C-----  E5 8E    SBC  $8E
  0x05416C $815C: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x05416D $815D: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x05416E $815E: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05416F $815F: C-----  56 B3    LSR  $B3,X
  0x054171 $8161: C-----  A9 3B    LDA  #$3B
  0x054173 $8163: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054174 $8164: C-----  F0 35    BEQ  $819B
  0x054176 $8166: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054177 $8167: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054178 $8168: C-----  A1 21    LDA  ($21,X)
  0x05417A $816A: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x05417B $816B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05417C $816C: C-----  F9 16 33 SBC  $3316,Y
  0x05417F $816F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x054180 $8170: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x054181 $8171: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054182 $8172: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x054183 $8173: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x054184 $8174: C-----  E4 BF    CPX  $BF
  0x054186 $8176: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x054187 $8177: C-----  84 08    STY  $08
  0x054189 $8179: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05418A $817A: C-----  E9 8A    SBC  #$8A
  0x05418C $817C: C-----  ED 9F E7 SBC  $E79F
  0x05418F $817F: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x054190 $8180: C-----  FE E0 00 INC  $00E0,X
  0x054193 $8183: C-----  00       BRK  
  0x054194 $8184: C-----  00       BRK  
  0x054195 $8185: C-----  05 5F    ORA  $5F
  0x054197 $8187: C-----  F0 FE    BEQ  $8187
  0x054199 $8189: C-----  E0 00    CPX  #$00
  0x05419B $818B: C-----  00       BRK  
  0x05419C $818C: C-----  00       BRK  
  0x05419D $818D: C-----  06 2F    ASL  $2F
  0x05419F $818F: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0541A0 $8190: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541A1 $8191: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541A2 $8192: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541A3 $8193: C-----  F0 00    BEQ  $8195
  0x0541A5 $8195: C-----  00       BRK  
  0x0541A6 $8196: C-----  00       BRK  
  0x0541A7 $8197: C-----  00       BRK  
  0x0541A8 $8198: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541A9 $8199: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541AA $819A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541AB $819B: C-----  F0 00    BEQ  $819D
  0x0541AD $819D: C-----  00       BRK  
  0x0541AE $819E: C-----  00       BRK  
  0x0541AF $819F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0541B0 $81A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541B1 $81A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541B2 $81A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541B3 $81A3: C-----  F8       SED  
  0x0541B4 $81A4: C-----  F0 F0    BEQ  $8196
  0x0541B6 $81A6: C-----  F0 F0    BEQ  $8198
  0x0541B8 $81A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541B9 $81A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541BA $81AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541BB $81AB: C-----  F8       SED  
  0x0541BC $81AC: C-----  FE FE FE INC  $FEFE,X
  0x0541BF $81AF: C-----  FE F0 F0 INC  $F0F0,X
  0x0541C2 $81B2: C-----  F0 F0    BEQ  $81A4
  0x0541C4 $81B4: C-----  F0 F0    BEQ  $81A6
  0x0541C6 $81B6: C-----  F0 F0    BEQ  $81A8
  0x0541C8 $81B8: C-----  FE FE FE INC  $FEFE,X
  0x0541CB $81BB: C-----  FE FE FE INC  $FEFE,X
  0x0541CE $81BE: C-----  FE FE 1F INC  $1FFE,X
  0x0541D1 $81C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541D2 $81C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541D3 $81C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541D4 $81C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541D5 $81C5: C-----  F8       SED  
  0x0541D6 $81C6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0541D7 $81C7: C-----  00       BRK  
  0x0541D8 $81C8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0541D9 $81C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541DA $81CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541DB $81CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541DC $81CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541DD $81CD: C-----  F8       SED  
  0x0541DE $81CE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0541DF $81CF: C-----  00       BRK  
  0x0541E0 $81D0: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0541E1 $81D1: C-----  A9 1F    LDA  #$1F
  0x0541E3 $81D3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0541E4 $81D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541E5 $81D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541E6 $81D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541E7 $81D7: C-----  F8       SED  
  0x0541E8 $81D8: C-----  00       BRK  
  0x0541E9 $81D9: C-----  00       BRK  
  0x0541EA $81DA: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0541EB $81DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541EC $81DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541ED $81DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541EE $81DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541EF $81DF: C-----  F8       SED  
  0x0541F0 $81E0: C-----  00       BRK  
  0x0541F1 $81E1: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0541F2 $81E2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0541F3 $81E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0541F4 $81E4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0541F5 $81E5: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0541F6 $81E6: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0541F7 $81E7: C-----  F8       SED  
  0x0541F8 $81E8: C-----  00       BRK  
  0x0541F9 $81E9: C-----  06 4F    ASL  $4F
  0x0541FB $81EB: C-----  F1 0F    SBC  ($0F),Y
  0x0541FD $81ED: C-----  F6 9F    INC  $9F,X
  0x0541FF $81EF: C-----  F0 C0    BEQ  $81B1
  0x054201 $81F1: C-----  00       BRK  
  0x054202 $81F2: C-----  00       BRK  
  0x054203 $81F3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054204 $81F4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054205 $81F5: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x054206 $81F6: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054207 $81F7: C-----  F8       SED  
  0x054208 $81F8: C-----  C0 00    CPY  #$00
  0x05420A $81FA: C-----  00       BRK  
  0x05420B $81FB: C-----  01 0F    ORA  ($0F,X)
  0x05420D $81FD: C-----  F6 9F    INC  $9F,X
  0x05420F $81FF: C-----  F0 11    BEQ  $8212
  0x054211 $8201: C-----  11 17    ORA  ($17),Y
  0x054213 $8203: C-----  39 D1 11 AND  $11D1,Y
  0x054216 $8206: C-----  11 17    ORA  ($17),Y
  0x054218 $8208: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054219 $8209: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05421A $820A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05421B $820B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05421C $820C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05421D $820D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05421E $820E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05421F $820F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054220 $8210: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054221 $8211: C-----  71 91    ADC  ($91),Y
  0x054223 $8213: C-----  11 11    ORA  ($11),Y
  0x054225 $8215: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054226 $8216: C-----  71 91    ADC  ($91),Y
  0x054228 $8218: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054229 $8219: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05422A $821A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05422B $821B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05422C $821C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05422D $821D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05422E $821E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05422F $821F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054230 $8220: C-----  11 11    ORA  ($11),Y
  0x054232 $8222: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x054233 $8223: C-----  1D F1 11 ORA  $11F1,X
  0x054236 $8226: C-----  11 13    ORA  ($13),Y
  0x054238 $8228: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054239 $8229: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05423A $822A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05423B $822B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05423C $822C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05423D $822D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05423E $822E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05423F $822F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054240 $8230: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x054241 $8231: C-----  1D F1 11 ORA  $11F1,X
  0x054244 $8234: C-----  11 13    ORA  ($13),Y
  0x054246 $8236: C-----  1D F1 FF ORA  $FFF1,X
  0x054249 $8239: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05424A $823A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05424B $823B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05424C $823C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05424D $823D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05424E $823E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05424F $823F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054250 $8240: C-----  9A       TXS  
  0x054251 $8241: C-----  A9 1B    LDA  #$1B
  0x054253 $8243: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054254 $8244: C-----  E4 B5    CPX  $B5
  0x054256 $8246: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054257 $8247: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054258 $8248: C-----  88       DEY  
  0x054259 $8249: C-----  08       PHP  
  0x05425A $824A: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05425B $824B: C-----  FE ED 96 INC  $96ED,X
  0x05425E $824E: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05425F $824F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054260 $8250: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x054261 $8251: C-----  59 11 58 EOR  $5811,Y
  0x054264 $8254: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x054265 $8255: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054266 $8256: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x054267 $8257: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x054268 $8258: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054269 $8259: C-----  B1 99    LDA  ($99),Y
  0x05426B $825B: C-----  99 7B FC STA  $FC7B,Y
  0x05426E $825E: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05426F $825F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x054270 $8260: C-----  11 FF    ORA  ($FF),Y
  0x054272 $8262: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054273 $8263: C-----  1D F1 11 ORA  $11F1,X
  0x054276 $8266: C-----  11 13    ORA  ($13),Y
  0x054278 $8268: C-----  11 FF    ORA  ($FF),Y
  0x05427A $826A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05427B $826B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05427C $826C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05427D $826D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05427E $826E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05427F $826F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054280 $8270: C-----  84 FF    STY  $FF
  0x054282 $8272: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054283 $8273: C-----  84 42    STY  $42
  0x054285 $8275: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054286 $8276: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x054287 $8277: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x054288 $8278: C-----  84 FF    STY  $FF
  0x05428A $827A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05428B $827B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05428C $827C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05428D $827D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05428E $827E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05428F $827F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054290 $8280: C-----  18       CLC  
  0x054291 $8281: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x054292 $8282: C-----  18       CLC  
  0x054293 $8283: C-----  38       SEC  
  0x054294 $8284: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x054295 $8285: C-----  15 14    ORA  $14,X
  0x054297 $8287: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x054298 $8288: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054299 $8289: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05429A $828A: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05429B $828B: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05429C $828C: C-----  FD FD FD SBC  $FDFD,X
  0x05429F $828F: C-----  FD FF FF SBC  $FFFF,X
  0x0542A2 $8292: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542A3 $8293: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542A4 $8294: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542A5 $8295: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542A6 $8296: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542A7 $8297: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542A8 $8298: C-----  1D F1 11 ORA  $11F1,X
  0x0542AB $829B: C-----  11 13    ORA  ($13),Y
  0x0542AD $829D: C-----  1D F1 11 ORA  $11F1,X
  0x0542B0 $82A0: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x0542B1 $82A1: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x0542B2 $82A2: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0542B3 $82A3: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0542B4 $82A4: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0542B5 $82A5: C-----  39 D0 10 AND  $10D0,Y
  0x0542B8 $82A8: C-----  FE FE FE INC  $FEFE,X
  0x0542BB $82AB: C-----  FE FF FF INC  $FFFF,X
  0x0542BE $82AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542BF $82AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542C0 $82B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542C1 $82B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542C2 $82B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542C3 $82B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542C4 $82B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542C5 $82B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542C6 $82B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542C7 $82B7: C-----  00       BRK  
  0x0542C8 $82B8: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0542C9 $82B9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0542CA $82BA: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0542CB $82BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542CC $82BC: C-----  21 21    AND  ($21,X)
  0x0542CE $82BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542CF $82BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542D0 $82C0: C-----  88       DEY  
  0x0542D1 $82C1: C-----  08       PHP  
  0x0542D2 $82C2: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0542D3 $82C3: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0542D4 $82C4: C-----  84 84    STY  $84
  0x0542D6 $82C6: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0542D7 $82C7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0542D8 $82C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542D9 $82C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542DA $82CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542DB $82CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542DC $82CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542DD $82CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542DE $82CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542DF $82CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542E0 $82D0: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0542E1 $82D1: C-----  F1 21    SBC  ($21),Y
  0x0542E3 $82D3: C-----  21 1F    AND  ($1F,X)
  0x0542E5 $82D5: C-----  F0 10    BEQ  $82E7
  0x0542E7 $82D7: C-----  10 FF    BPL  $82D8
  0x0542E9 $82D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542EA $82DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542EB $82DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542EC $82DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542ED $82DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542EE $82DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542EF $82DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0542F0 $82E0: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x0542F1 $82E1: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0542F2 $82E2: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0542F3 $82E3: C-----  7E A1 21 ROR  $21A1,X
  0x0542F6 $82E6: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0542F7 $82E7: C-----  7D C2 42 ADC  $42C2,X
  0x0542FA $82EA: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0542FB $82EB: C-----  7E A1 21 ROR  $21A1,X
  0x0542FE $82EE: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0542FF $82EF: C-----  7D 0F F8 ADC  $F80F,X
  0x054302 $82F2: C-----  08       PHP  
  0x054303 $82F3: C-----  08       PHP  
  0x054304 $82F4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x054305 $82F5: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x054306 $82F6: C-----  84 84    STY  $84
  0x054308 $82F8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054309 $82F9: C-----  F8       SED  
  0x05430A $82FA: C-----  08       PHP  
  0x05430B $82FB: C-----  08       PHP  
  0x05430C $82FC: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05430D $82FD: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05430E $82FE: C-----  84 84    STY  $84
  0x054310 $8300: C-----  3E C0 32 ROL  $32C0,X
  0x054313 $8303: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x054314 $8304: C-----  E9 E3    SBC  #$E3
  0x054316 $8306: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054317 $8307: C-----  F9 BF C0 SBC  $C0BF,Y
  0x05431A $830A: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05431B $830B: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x05431C $830C: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05431D $830D: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05431E $830E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05431F $830F: C-----  F1 1F    SBC  ($1F),Y
  0x054321 $8311: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054322 $8312: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x054323 $8313: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x054324 $8314: C-----  68       PLA  
  0x054325 $8315: C-----  A9 D4    LDA  #$D4
  0x054327 $8317: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x054328 $8318: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054329 $8319: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05432A $831A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05432B $831B: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x05432C $831C: C-----  7D 9A AF ADC  $AF9A,X
  0x05432F $831F: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x054330 $8320: C-----  21 FF    AND  ($FF,X)
  0x054332 $8322: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054333 $8323: C-----  79 90 10 ADC  $1090,Y
  0x054336 $8326: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x054337 $8327: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x054338 $8328: C-----  21 FF    AND  ($FF,X)
  0x05433A $832A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05433B $832B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05433C $832C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05433D $832D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05433E $832E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05433F $832F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054340 $8330: C-----  84 FF    STY  $FF
  0x054342 $8332: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054343 $8333: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x054344 $8334: C-----  F9 21 21 SBC  $2121,Y
  0x054347 $8337: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x054348 $8338: C-----  84 FF    STY  $FF
  0x05434A $833A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05434B $833B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05434C $833C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05434D $833D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05434E $833E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05434F $833F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054350 $8340: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054351 $8341: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054352 $8342: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054353 $8343: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054354 $8344: C-----  F0 03    BEQ  $8349
  0x054356 $8346: C-----  F9 99 8F SBC  $8F99,Y
  0x054359 $8349: C-----  F6 4F    INC  $4F,X
  0x05435B $834B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05435C $834C: C-----  F0 06    BEQ  $8354
  0x05435E $834E: C-----  A5 11    LDA  $11
  0x054360 $8350: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054361 $8351: C-----  F8       SED  
  0x054362 $8352: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054363 $8353: C-----  FE 6F FF INC  $FF6F,X
  0x054366 $8356: C-----  E0 13    CPX  #$13
  0x054368 $8358: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054369 $8359: C-----  F1 8F    SBC  ($8F),Y
  0x05436B $835B: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05436C $835C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05436D $835D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05436E $835E: C-----  E0 14    CPX  #$14
  0x054370 $8360: C-----  10 FF    BPL  $8361
  0x054372 $8362: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054373 $8363: C-----  08       PHP  
  0x054374 $8364: C-----  84 9F    STY  $9F
  0x054376 $8366: C-----  E4 84    CPX  $84
  0x054378 $8368: C-----  10 FF    BPL  $8369
  0x05437A $836A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05437B $836B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05437C $836C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05437D $836D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05437E $836E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05437F $836F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054380 $8370: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054381 $8371: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054382 $8372: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054383 $8373: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054384 $8374: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054385 $8375: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054386 $8376: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054387 $8377: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054388 $8378: C-----  08       PHP  
  0x054389 $8379: C-----  08       PHP  
  0x05438A $837A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05438B $837B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05438C $837C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05438D $837D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05438E $837E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05438F $837F: C-----  00       BRK  
  0x054390 $8380: C-----  84 85    STY  $85
  0x054392 $8382: C-----  BE C4 42 LDX  $42C4,Y
  0x054395 $8385: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x054396 $8386: C-----  7E C2 FF ROR  $FFC2,X
  0x054399 $8389: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05439A $838A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05439B $838B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05439C $838C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05439D $838D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05439E $838E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05439F $838F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543A0 $8390: C-----  F8       SED  
  0x0543A1 $8391: C-----  10 10    BPL  $83A3
  0x0543A3 $8393: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0543A4 $8394: C-----  F8       SED  
  0x0543A5 $8395: C-----  08       PHP  
  0x0543A6 $8396: C-----  08       PHP  
  0x0543A7 $8397: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0543A8 $8398: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543A9 $8399: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543AA $839A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543AB $839B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543AC $839C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543AD $839D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543AE $839E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543AF $839F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543B0 $83A0: C-----  21 21    AND  ($21,X)
  0x0543B2 $83A2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0543B3 $83A3: C-----  E1 10    SBC  ($10,X)
  0x0543B5 $83A5: C-----  11 3E    ORA  ($3E),Y
  0x0543B7 $83A7: C-----  D0 21    BNE  $83CA
  0x0543B9 $83A9: C-----  21 3F    AND  ($3F,X)
  0x0543BB $83AB: C-----  E1 10    SBC  ($10,X)
  0x0543BD $83AD: C-----  11 3E    ORA  ($3E),Y
  0x0543BF $83AF: C-----  D0 FC    BNE  $83AD
  0x0543C1 $83B1: C-----  84 84    STY  $84
  0x0543C3 $83B3: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0543C4 $83B4: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0543C5 $83B5: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0543C6 $83B6: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0543C7 $83B7: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0543C8 $83B8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0543C9 $83B9: C-----  84 84    STY  $84
  0x0543CB $83BB: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0543CC $83BC: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0543CD $83BD: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0543CE $83BE: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0543CF $83BF: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0543D0 $83C0: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0543D1 $83C1: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0543D2 $83C2: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0543D3 $83C3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0543D4 $83C4: C-----  21 3F    AND  ($3F,X)
  0x0543D6 $83C6: C-----  E1 21    SBC  ($21,X)
  0x0543D8 $83C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543D9 $83C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543DA $83CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543DB $83CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543DC $83CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543DD $83CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543DE $83CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543DF $83CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543E0 $83D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543E1 $83D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543E2 $83D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543E3 $83D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543E4 $83D4: C-----  00       BRK  
  0x0543E5 $83D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543E6 $83D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543E7 $83D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543E8 $83D8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0543E9 $83D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543EA $83DA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0543EB $83DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543EC $83DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0543ED $83DD: C-----  00       BRK  
  0x0543EE $83DE: C-----  00       BRK  
  0x0543EF $83DF: C-----  00       BRK  
  0x0543F0 $83E0: C-----  10 1F    BPL  $8401
  0x0543F2 $83E2: C-----  F0 10    BEQ  $83F4
  0x0543F4 $83E4: C-----  08       PHP  
  0x0543F5 $83E5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0543F6 $83E6: C-----  E8       INX  
  0x0543F7 $83E7: C-----  08       PHP  
  0x0543F8 $83E8: C-----  10 1F    BPL  $8409
  0x0543FA $83EA: C-----  F0 10    BEQ  $83FC
  0x0543FC $83EC: C-----  08       PHP  
  0x0543FD $83ED: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0543FE $83EE: C-----  E8       INX  
  0x0543FF $83EF: C-----  08       PHP  
  0x054400 $83F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054401 $83F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054402 $83F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054403 $83F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054404 $83F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054405 $83F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054406 $83F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054407 $83F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054408 $83F8: C-----  11 13    ORA  ($13),Y
  0x05440A $83FA: C-----  1D F1 11 ORA  $11F1,X
  0x05440D $83FD: C-----  11 13    ORA  ($13),Y
  0x05440F $83FF: C-----  1D 22 AF ORA  $AF22,X
  0x054412 $8402: C-----  2A       ROL  A
  0x054413 $8403: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054414 $8404: C-----  70 37    BVS  $843D
  0x054416 $8406: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x054417 $8407: C-----  F0 30    BEQ  $8439
  0x054419 $8409: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05441A $840A: C-----  31 FA    AND  ($FA),Y
  0x05441C $840C: C-----  79 1F 3B ADC  $3B1F,Y
  0x05441F $840F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054420 $8410: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x054421 $8411: C-----  DD 33 FF CMP  $FF33,X
  0x054424 $8414: C-----  99 93 D9 STA  $D993,Y
  0x054427 $8417: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054428 $8418: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x054429 $8419: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x05442A $841A: C-----  59 FF 7B EOR  $7BFF,Y
  0x05442D $841D: C-----  D5 95    CMP  $95,X
  0x05442F $841F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054430 $8420: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x054431 $8421: C-----  BA       TSX  
  0x054432 $8422: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x054433 $8423: C-----  FE 11 35 INC  $3511,X
  0x054436 $8426: C-----  D5 FF    CMP  $FF,X
  0x054438 $8428: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x054439 $8429: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05443A $842A: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05443B $842B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05443C $842C: C-----  99 57 33 STA  $3357,Y
  0x05443F $842F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054440 $8430: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054441 $8431: C-----  F9 3B 7F SBC  $7F3B,Y
  0x054444 $8434: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054445 $8435: C-----  F5 D4    SBC  $D4,X
  0x054447 $8437: C-----  D0 2F    BNE  $8468
  0x054449 $8439: C-----  F1 21    SBC  ($21),Y
  0x05444B $843B: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x05444C $843C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05444D $843D: C-----  F6 33    INC  $33,X
  0x05444F $843F: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x054450 $8440: C-----  96 AD    STX  $AD,Y
  0x054452 $8442: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x054453 $8443: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054454 $8444: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x054455 $8445: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x054456 $8446: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054457 $8447: C-----  FE 84 84 INC  $8484,X
  0x05445A $844A: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05445B $844B: C-----  FE EB 56 INC  $56EB,X
  0x05445E $844E: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05445F $844F: C-----  7E 1F F9 ROR  $F91F,X
  0x054462 $8452: ------  .byte $1A
  0x054463 $8453: ------  .byte $5F
  0x054464 $8454: ------  .byte $6F
  0x054465 $8455: ------  .byte $FD
  0x054466 $8456: ------  .byte $DC
  0x054467 $8457: ------  .byte $C8
  0x054468 $8458: ------  .byte $1F
  0x054469 $8459: ------  .byte $F0
  0x05446A $845A: ------  .byte $31
  0x05446B $845B: ------  .byte $9A
  0x05446C $845C: ------  .byte $6F
  0x05446D $845D: ------  .byte $FE
  0x05446E $845E: ------  .byte $2B
  0x05446F $845F: ------  .byte $5C
  0x054470 $8460: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x054471 $8461: C-----  B9 1A 5F LDA  $5F1A,Y
  0x054474 $8464: C-----  F8       SED  
  0x054475 $8465: C-----  3D DC CF AND  $CFDC,X
  0x054478 $8468: C-----  F8       SED  
  0x054479 $8469: C-----  10 31    BPL  $849C
  0x05447B $846B: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05447C $846C: C-----  F9 1E 2B SBC  $2B1E,Y
  0x05447F $846F: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x054480 $8470: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x054481 $8471: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054482 $8472: C-----  BA       TSX  
  0x054483 $8473: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x054484 $8474: C-----  41 5F    EOR  ($5F,X)
  0x054486 $8476: C-----  D5 C1    CMP  $C1,X
  0x054488 $8478: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x054489 $8479: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05448A $847A: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05448B $847B: C-----  CA       DEX  
  0x05448C $847C: C-----  69 7F    ADC  #$7F
  0x05448E $847E: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05448F $847F: C-----  F5 12    SBC  $12,X
  0x054491 $8481: C-----  A9 1A    LDA  #$1A
  0x054493 $8483: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x054494 $8484: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x054495 $8485: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054496 $8486: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054497 $8487: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054498 $8488: C-----  00       BRK  
  0x054499 $8489: C-----  00       BRK  
  0x05449A $848A: C-----  21 8A    AND  ($8A,X)
  0x05449C $848C: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x05449D $848D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05449E $848E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05449F $848F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544A0 $8490: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0544A1 $8491: C-----  A9 1A    LDA  #$1A
  0x0544A3 $8493: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0544A4 $8494: C-----  60       RTS  
  0x0544A5 $8495: C-----  35 17    AND  $17,X
  0x0544A7 $8497: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544A8 $8498: C-----  00       BRK  
  0x0544A9 $8499: C-----  00       BRK  
  0x0544AA $849A: C-----  21 8A    AND  ($8A,X)
  0x0544AC $849C: C-----  69 16    ADC  #$16
  0x0544AE $849E: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x0544AF $849F: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0544B0 $84A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544B1 $84A1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0544B2 $84A2: C-----  C0 00    CPY  #$00
  0x0544B4 $84A4: C-----  00       BRK  
  0x0544B5 $84A5: C-----  05 DF    ORA  $DF
  0x0544B7 $84A7: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0544B8 $84A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544B9 $84A9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0544BA $84AA: C-----  C0 00    CPY  #$00
  0x0544BC $84AC: C-----  00       BRK  
  0x0544BD $84AD: C-----  06 2F    ASL  $2F
  0x0544BF $84AF: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0544C0 $84B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544C1 $84B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544C2 $84B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544C3 $84B3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0544C4 $84B4: C-----  E0 00    CPX  #$00
  0x0544C6 $84B6: C-----  00       BRK  
  0x0544C7 $84B7: C-----  18       CLC  
  0x0544C8 $84B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544C9 $84B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544CA $84BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544CB $84BB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0544CC $84BC: C-----  E0 00    CPX  #$00
  0x0544CE $84BE: C-----  00       BRK  
  0x0544CF $84BF: C-----  10 23    BPL  $84E4
  0x0544D1 $84C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544D2 $84C2: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x0544D3 $84C3: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0544D4 $84C4: C-----  F8       SED  
  0x0544D5 $84C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544D6 $84C6: C-----  D8       CLD  
  0x0544D7 $84C7: C-----  98       TYA  
  0x0544D8 $84C8: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x0544D9 $84C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544DA $84CA: C-----  69 31    ADC  #$31
  0x0544DC $84CC: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x0544DD $84CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544DE $84CE: C-----  94 10    STY  $10,X
  0x0544E0 $84D0: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0544E1 $84D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544E2 $84D2: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x0544E3 $84D3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0544E4 $84D4: C-----  E8       INX  
  0x0544E5 $84D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544E6 $84D6: C-----  C8       INY  
  0x0544E7 $84D7: C-----  98       TYA  
  0x0544E8 $84D8: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x0544E9 $84D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544EA $84DA: C-----  59 11 0A EOR  $0A11,Y
  0x0544ED $84DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544EE $84DE: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0544EF $84DF: C-----  18       CLC  
  0x0544F0 $84E0: C-----  19 5F FF ORA  $FF5F,Y
  0x0544F3 $84E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544F4 $84E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544F5 $84E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544F6 $84E6: C-----  F0 80    BEQ  $8468
  0x0544F8 $84E8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0544F9 $84E9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0544FA $84EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544FB $84EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544FC $84EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544FD $84ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0544FE $84EE: C-----  F0 80    BEQ  $8470
  0x054500 $84F0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054501 $84F1: C-----  CC 32 0F CPY  $0F32
  0x054504 $84F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054505 $84F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054506 $84F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054507 $84F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054508 $84F8: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x054509 $84F9: C-----  86 49    STX  $49
  0x05450B $84FB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05450C $84FC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05450D $84FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05450E $84FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05450F $84FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054510 $8500: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x054511 $8501: C-----  A9 3F    LDA  #$3F
  0x054513 $8503: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054514 $8504: C-----  70 35    BVS  $853B
  0x054516 $8506: C-----  FE D0 21 INC  $21D0,X
  0x054519 $8509: C-----  21 3F    AND  ($3F,X)
  0x05451B $850B: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05451C $850C: C-----  79 17 3F ADC  $3F17,Y
  0x05451F $850F: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x054520 $8510: ------  .byte $FA
  0x054521 $8511: ------  .byte $A9
  0x054522 $8512: ------  .byte $1A
  0x054523 $8513: ------  .byte $5F
  0x054524 $8514: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054525 $8515: C-----  B5 D4    LDA  $D4,X
  0x054527 $8517: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x054528 $8518: ------  .byte $F8
  0x054529 $8519: ------  .byte $08
  0x05452A $851A: ------  .byte $29
  0x05452B $851B: ------  .byte $8F
  0x05452C $851C: C-----  FD 96 A7 SBC  $A796,X
  0x05452F $851F: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054530 $8520: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054531 $8521: C-----  F9 1A 55 SBC  $551A,Y
  0x054534 $8524: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054535 $8525: C-----  F5 D4    SBC  $D4,X
  0x054537 $8527: C-----  CA       DEX  
  0x054538 $8528: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054539 $8529: C-----  F8       SED  
  0x05453A $852A: C-----  29 8C    AND  #$8C
  0x05453C $852C: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05453D $852D: C-----  F6 A5    INC  $A5,X
  0x05453F $852F: C-----  DE FE AD DEC  $ADFE,X
  0x054542 $8532: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x054543 $8533: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054544 $8534: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x054545 $8535: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x054546 $8536: C-----  D6 C7    DEC  $C7,X
  0x054548 $8538: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054549 $8539: C-----  84 A5    STY  $A5
  0x05454B $853B: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05454C $853C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05454D $853D: C-----  56 63    LSR  $63,X
  0x05454F $853F: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x054550 $8540: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x054551 $8541: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054552 $8542: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054553 $8543: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054554 $8544: C-----  70 3F    BVS  $8585
  0x054556 $8546: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x054557 $8547: C-----  D0 21    BNE  $856A
  0x054559 $8549: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05455A $854A: C-----  E1 AB    SBC  ($AB,X)
  0x05455C $854C: C-----  79 1F F3 ADC  $F31F,Y
  0x05455F $854F: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x054560 $8550: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x054561 $8551: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x054562 $8552: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x054563 $8553: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x054564 $8554: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x054565 $8555: C-----  D5 FC    CMP  $FC,X
  0x054567 $8557: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x054568 $8558: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x054569 $8559: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05456A $855A: C-----  7D DD 1E ADC  $1EDD,X
  0x05456D $855D: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x05456E $855E: C-----  BE F6 D2 LDX  $D2F6,Y
  0x054571 $8561: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x054572 $8562: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x054573 $8563: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054574 $8564: C-----  C1 35    CMP  ($35,X)
  0x054576 $8566: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054577 $8567: C-----  FD C2 42 SBC  $42C2,X
  0x05457A $856A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05457B $856B: C-----  FE C9 37 INC  $37C9,X
  0x05457E $856E: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x05457F $856F: C-----  7D 0B FF ADC  $FF0B,X
  0x054582 $8572: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x054583 $8573: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054584 $8574: C-----  EC FF CC CPX  $CCFF
  0x054587 $8577: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x054588 $8578: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x054589 $8579: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05458A $857A: C-----  49 19    EOR  #$19
  0x05458C $857C: C-----  8E FF 94 STX  $94FF
  0x05458F $857F: C-----  94 43    STY  $43,X
  0x054591 $8581: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054592 $8582: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x054593 $8583: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x054594 $8584: C-----  E9 FF    SBC  #$FF
  0x054596 $8586: C-----  E9 B9    SBC  #$B9
  0x054598 $8588: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054599 $8589: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05459A $858A: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x05459B $858B: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x05459C $858C: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05459D $858D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05459E $858E: C-----  B5 31    LDA  $31,X
  0x0545A0 $8590: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0545A1 $8591: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545A2 $8592: C-----  B6 8F    LDX  $8F,Y
  0x0545A4 $8594: C-----  EA       NOP  
  0x0545A5 $8595: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545A6 $8596: C-----  CA       DEX  
  0x0545A7 $8597: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x0545A8 $8598: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0545A9 $8599: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545AA $859A: C-----  CD 95 4A CMP  $4A95
  0x0545AD $859D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545AE $859E: C-----  D6 52    DEC  $52,X
  0x0545B0 $85A0: C-----  18       CLC  
  0x0545B1 $85A1: C-----  58       CLI  
  0x0545B2 $85A2: C-----  10 5E    BPL  $8602
  0x0545B4 $85A4: C-----  60       RTS  
  0x0545B5 $85A5: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0545B6 $85A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545B7 $85A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545B8 $85A8: C-----  0E B1 89 ASL  $89B1
  0x0545BB $85AB: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0545BC $85AC: C-----  71 17    ADC  ($17),Y
  0x0545BE $85AE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0545BF $85AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545C0 $85B0: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0545C1 $85B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545C2 $85B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545C3 $85B3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0545C4 $85B4: C-----  21 FF    AND  ($FF,X)
  0x0545C6 $85B6: C-----  21 21    AND  ($21,X)
  0x0545C8 $85B8: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0545C9 $85B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545CA $85BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545CB $85BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545CC $85BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545CD $85BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545CE $85BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545CF $85BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545D0 $85C0: C-----  21 FF    AND  ($FF,X)
  0x0545D2 $85C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545D3 $85C3: C-----  21 10    AND  ($10,X)
  0x0545D5 $85C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545D6 $85C6: C-----  10 10    BPL  $85D8
  0x0545D8 $85C8: C-----  21 FF    AND  ($FF,X)
  0x0545DA $85CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545DB $85CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545DC $85CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545DD $85CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545DE $85CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545DF $85CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545E0 $85D0: C-----  10 FF    BPL  $85D1
  0x0545E2 $85D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545E3 $85D3: C-----  10 08    BPL  $85DD
  0x0545E5 $85D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545E6 $85D6: C-----  08       PHP  
  0x0545E7 $85D7: C-----  08       PHP  
  0x0545E8 $85D8: C-----  10 FF    BPL  $85D9
  0x0545EA $85DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545EB $85DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545EC $85DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545ED $85DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545EE $85DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545EF $85DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545F0 $85E0: C-----  08       PHP  
  0x0545F1 $85E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545F2 $85E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545F3 $85E3: C-----  08       PHP  
  0x0545F4 $85E4: C-----  84 FF    STY  $FF
  0x0545F6 $85E6: C-----  84 84    STY  $84
  0x0545F8 $85E8: C-----  08       PHP  
  0x0545F9 $85E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545FA $85EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545FB $85EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545FC $85EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545FD $85ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545FE $85EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0545FF $85EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054600 $85F0: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x054601 $85F1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054602 $85F2: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054603 $85F3: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x054604 $85F4: C-----  41 DF    EOR  ($DF,X)
  0x054606 $85F6: C-----  41 41    EOR  ($41,X)
  0x054608 $85F8: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x054609 $85F9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05460A $85FA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05460B $85FB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05460C $85FC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05460D $85FD: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05460E $85FE: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05460F $85FF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054610 $8600: C-----  84 FF    STY  $FF
  0x054612 $8602: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054613 $8603: C-----  84 4F    STY  $4F
  0x054615 $8605: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x054616 $8606: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x054617 $8607: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x054618 $8608: C-----  84 FF    STY  $FF
  0x05461A $860A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05461B $860B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05461C $860C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05461D $860D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05461E $860E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05461F $860F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054620 $8610: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054621 $8611: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054622 $8612: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054623 $8613: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054624 $8614: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054625 $8615: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054626 $8616: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054627 $8617: C-----  F0 08    BEQ  $8621
  0x054629 $8619: C-----  08       PHP  
  0x05462A $861A: C-----  C8       INY  
  0x05462B $861B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05462C $861C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05462D $861D: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05462E $861E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05462F $861F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054630 $8620: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054631 $8621: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054632 $8622: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054633 $8623: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054634 $8624: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054635 $8625: C-----  00       BRK  
  0x054636 $8626: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054637 $8627: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054638 $8628: C-----  21 F9    AND  ($F9,X)
  0x05463A $862A: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x05463B $862B: C-----  21 FF    AND  ($FF,X)
  0x05463D $862D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05463E $862E: C-----  00       BRK  
  0x05463F $862F: C-----  00       BRK  
  0x054640 $8630: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054641 $8631: C-----  F8       SED  
  0x054642 $8632: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054643 $8633: C-----  10 08    BPL  $863D
  0x054645 $8635: C-----  09 3E    ORA  #$3E
  0x054647 $8637: C-----  C8       INY  
  0x054648 $8638: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054649 $8639: C-----  F8       SED  
  0x05464A $863A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05464B $863B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05464C $863C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05464D $863D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05464E $863E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05464F $863F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054650 $8640: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054651 $8641: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054652 $8642: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054653 $8643: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054654 $8644: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054655 $8645: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054656 $8646: C-----  00       BRK  
  0x054657 $8647: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054658 $8648: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x054659 $8649: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x05465A $864A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05465B $864B: C-----  21 21    AND  ($21,X)
  0x05465D $864D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05465E $864E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05465F $864F: C-----  00       BRK  
  0x054660 $8650: C-----  F8       SED  
  0x054661 $8651: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054662 $8652: C-----  00       BRK  
  0x054663 $8653: C-----  0E 6F F5 ASL  $F56F
  0x054666 $8656: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054667 $8657: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x054668 $8658: C-----  F8       SED  
  0x054669 $8659: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05466A $865A: C-----  00       BRK  
  0x05466B $865B: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05466C $865C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05466D $865D: C-----  F6 2F    INC  $2F,X
  0x05466F $865F: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x054670 $8660: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054671 $8661: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054672 $8662: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054673 $8663: C-----  F0 01    BEQ  $8666
  0x054675 $8665: C-----  21 21    AND  ($21,X)
  0x054677 $8667: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x054678 $8668: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054679 $8669: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05467A $866A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05467B $866B: C-----  F8       SED  
  0x05467C $866C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05467D $866D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05467E $866E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05467F $866F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054680 $8670: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054681 $8671: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054682 $8672: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054683 $8673: C-----  F0 0F    BEQ  $8684
  0x054685 $8675: C-----  E0 04    CPX  #$04
  0x054687 $8677: C-----  84 0F    STY  $0F
  0x054689 $8679: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05468A $867A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05468B $867B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05468C $867C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05468D $867D: C-----  E0 1F    CPX  #$1F
  0x05468F $867F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054690 $8680: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054691 $8681: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054692 $8682: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054693 $8683: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054694 $8684: C-----  F0 FF    BEQ  $8685
  0x054696 $8686: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054697 $8687: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054698 $8688: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054699 $8689: C-----  21 F1    AND  ($F1,X)
  0x05469B $868B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05469C $868C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05469D $868D: C-----  00       BRK  
  0x05469E $868E: C-----  00       BRK  
  0x05469F $868F: C-----  00       BRK  
  0x0546A0 $8690: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0546A1 $8691: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0546A2 $8692: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0546A3 $8693: C-----  C0 3F    CPY  #$3F
  0x0546A5 $8695: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546A6 $8696: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546A7 $8697: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546A8 $8698: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0546A9 $8699: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x0546AA $869A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0546AB $869B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546AC $869C: C-----  C0 00    CPY  #$00
  0x0546AE $869E: C-----  00       BRK  
  0x0546AF $869F: C-----  00       BRK  
  0x0546B0 $86A0: C-----  F0 8F    BEQ  $8631
  0x0546B2 $86A2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0546B3 $86A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546B4 $86A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546B5 $86A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546B6 $86A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546B7 $86A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546B8 $86A8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0546B9 $86A9: C-----  F0 80    BEQ  $862B
  0x0546BB $86AB: C-----  00       BRK  
  0x0546BC $86AC: C-----  00       BRK  
  0x0546BD $86AD: C-----  00       BRK  
  0x0546BE $86AE: C-----  00       BRK  
  0x0546BF $86AF: C-----  00       BRK  
  0x0546C0 $86B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546C1 $86B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546C2 $86B2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0546C3 $86B3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0546C4 $86B4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0546C5 $86B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546C6 $86B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546C7 $86B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546C8 $86B8: C-----  F1 13    SBC  ($13),Y
  0x0546CA $86BA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0546CB $86BB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0546CC $86BC: C-----  E0 00    CPX  #$00
  0x0546CE $86BE: C-----  00       BRK  
  0x0546CF $86BF: C-----  00       BRK  
  0x0546D0 $86C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546D1 $86C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546D2 $86C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546D3 $86C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546D4 $86C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546D5 $86C5: C-----  F8       SED  
  0x0546D6 $86C6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0546D7 $86C7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0546D8 $86C8: C-----  11 17    ORA  ($17),Y
  0x0546DA $86CA: C-----  39 D1 17 AND  $17D1,Y
  0x0546DD $86CD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0546DE $86CE: C-----  F8       SED  
  0x0546DF $86CF: C-----  C0 FF    CPY  #$FF
  0x0546E1 $86D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546E2 $86D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546E3 $86D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546E4 $86D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546E5 $86D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546E6 $86D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546E7 $86D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546E8 $86D8: C-----  71 91    ADC  ($91),Y
  0x0546EA $86DA: C-----  11 11    ORA  ($11),Y
  0x0546EC $86DC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0546ED $86DD: C-----  71 91    ADC  ($91),Y
  0x0546EF $86DF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0546F0 $86E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546F1 $86E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546F2 $86E2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0546F3 $86E3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0546F4 $86E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0546F5 $86E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546F6 $86E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546F7 $86E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0546F8 $86E8: C-----  F0 13    BEQ  $86FD
  0x0546FA $86EA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0546FB $86EB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0546FC $86EC: C-----  E0 00    CPX  #$00
  0x0546FE $86EE: C-----  00       BRK  
  0x0546FF $86EF: C-----  F0 F0    BEQ  $86E1
  0x054701 $86F1: C-----  F0 F0    BEQ  $86E3
  0x054703 $86F3: C-----  F0 F0    BEQ  $86E5
  0x054705 $86F5: C-----  F0 F1    BEQ  $86E8
  0x054707 $86F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054708 $86F8: C-----  FE FE FE INC  $FEFE,X
  0x05470B $86FB: C-----  FE FE FE INC  $FEFE,X
  0x05470E $86FE: C-----  F8       SED  
  0x05470F $86FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054710 $8700: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054711 $8701: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054712 $8702: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054713 $8703: C-----  C0 00    CPY  #$00
  0x054715 $8705: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054716 $8706: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054717 $8707: C-----  F8       SED  
  0x054718 $8708: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054719 $8709: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05471A $870A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05471B $870B: C-----  C0 00    CPY  #$00
  0x05471D $870D: C-----  06 9F    ASL  $9F
  0x05471F $870F: C-----  F0 FF    BEQ  $8710
  0x054721 $8711: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054722 $8712: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054723 $8713: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054724 $8714: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054725 $8715: C-----  E0 00    CPX  #$00
  0x054727 $8717: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054728 $8718: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054729 $8719: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05472A $871A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05472B $871B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05472C $871C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05472D $871D: C-----  E0 01    CPX  #$01
  0x05472F $871F: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x054730 $8720: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054731 $8721: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054732 $8722: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054733 $8723: C-----  F0 0F    BEQ  $8734
  0x054735 $8725: C-----  F0 0E    BEQ  $8735
  0x054737 $8727: C-----  C0 0F    CPY  #$0F
  0x054739 $8729: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05473A $872A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05473B $872B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05473C $872C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05473D $872D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05473E $872E: C-----  FE C1 0F INC  $0FC1,X
  0x054741 $8731: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054742 $8732: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054743 $8733: C-----  F0 0F    BEQ  $8744
  0x054745 $8735: C-----  F0 0F    BEQ  $8746
  0x054747 $8737: C-----  00       BRK  
  0x054748 $8738: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054749 $8739: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05474A $873A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05474B $873B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05474C $873C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05474D $873D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05474E $873E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05474F $873F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054750 $8740: C-----  11 FF    ORA  ($FF),Y
  0x054752 $8742: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054753 $8743: C-----  11 11    ORA  ($11),Y
  0x054755 $8745: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054756 $8746: C-----  71 91    ADC  ($91),Y
  0x054758 $8748: C-----  11 FF    ORA  ($FF),Y
  0x05475A $874A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05475B $874B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05475C $874C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05475D $874D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05475E $874E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05475F $874F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054760 $8750: C-----  11 FF    ORA  ($FF),Y
  0x054762 $8752: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054763 $8753: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x054764 $8754: C-----  1D F1 11 ORA  $11F1,X
  0x054767 $8757: C-----  11 11    ORA  ($11),Y
  0x054769 $8759: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05476A $875A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05476B $875B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05476C $875C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05476D $875D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05476E $875E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05476F $875F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054770 $8760: C-----  01 1F    ORA  ($1F,X)
  0x054772 $8762: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054773 $8763: C-----  F0 0F    BEQ  $8774
  0x054775 $8765: C-----  00       BRK  
  0x054776 $8766: C-----  00       BRK  
  0x054777 $8767: C-----  11 01    ORA  ($01),Y
  0x054779 $8769: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05477A $876A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05477B $876B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05477C $876C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05477D $876D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05477E $876E: C-----  E0 FF    CPX  #$FF
  0x054780 $8770: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054781 $8771: C-----  F0 01    BEQ  $8774
  0x054783 $8773: C-----  08       PHP  
  0x054784 $8774: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054785 $8775: C-----  10 11    BPL  $8788
  0x054787 $8777: C-----  11 FF    ORA  ($FF),Y
  0x054789 $8779: C-----  F0 01    BEQ  $877C
  0x05478B $877B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05478C $877C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05478D $877D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05478E $877E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05478F $877F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054790 $8780: C-----  F0 F0    BEQ  $8772
  0x054792 $8782: C-----  F0 F0    BEQ  $8774
  0x054794 $8784: C-----  F0 F0    BEQ  $8776
  0x054796 $8786: C-----  F0 F0    BEQ  $8778
  0x054798 $8788: C-----  FE FE FE INC  $FEFE,X
  0x05479B $878B: C-----  FE FE FE INC  $FEFE,X
  0x05479E $878E: C-----  FE FE 12 INC  $12FE,X
  0x0547A1 $8791: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0547A2 $8792: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0547A3 $8793: C-----  FE 11 11 INC  $1111,X
  0x0547A6 $8796: C-----  11 FF    ORA  ($FF),Y
  0x0547A8 $8798: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0547A9 $8799: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547AA $879A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547AB $879B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547AC $879C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547AD $879D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547AE $879E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547AF $879F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547B0 $87A0: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0547B1 $87A1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0547B2 $87A2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0547B3 $87A3: C-----  BE 41 41 LDX  $4141,Y
  0x0547B6 $87A6: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0547B7 $87A7: C-----  DD C2 42 CMP  $42C2,X
  0x0547BA $87AA: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0547BB $87AB: C-----  FE 61 61 INC  $6161,X
  0x0547BE $87AE: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0547BF $87AF: C-----  FD 11 11 SBC  $1111,X
  0x0547C2 $87B2: C-----  11 FF    ORA  ($FF),Y
  0x0547C4 $87B4: C-----  11 11    ORA  ($11),Y
  0x0547C6 $87B6: C-----  11 FF    ORA  ($FF),Y
  0x0547C8 $87B8: C-----  11 11    ORA  ($11),Y
  0x0547CA $87BA: C-----  11 FF    ORA  ($FF),Y
  0x0547CC $87BC: C-----  11 11    ORA  ($11),Y
  0x0547CE $87BE: C-----  11 FF    ORA  ($FF),Y
  0x0547D0 $87C0: C-----  11 11    ORA  ($11),Y
  0x0547D2 $87C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547D3 $87C3: C-----  11 11    ORA  ($11),Y
  0x0547D5 $87C5: C-----  11 11    ORA  ($11),Y
  0x0547D7 $87C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547D8 $87C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547D9 $87C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547DA $87CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547DB $87CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547DC $87CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547DD $87CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547DE $87CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547DF $87CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547E0 $87D0: C-----  F1 1F    SBC  ($1F),Y
  0x0547E2 $87D2: C-----  11 11    ORA  ($11),Y
  0x0547E4 $87D4: C-----  11 F1    ORA  ($F1),Y
  0x0547E6 $87D6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0547E7 $87D7: C-----  11 FF    ORA  ($FF),Y
  0x0547E9 $87D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547EA $87DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547EB $87DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547EC $87DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547ED $87DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547EE $87DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547EF $87DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547F0 $87E0: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0547F1 $87E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547F2 $87E2: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x0547F3 $87E3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0547F4 $87E4: C-----  6C 7F 4C JMP  ($4C7F)
  0x0547F7 $87E7: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0547F8 $87E8: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0547F9 $87E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0547FA $87EA: C-----  49 19    EOR  #$19
  0x0547FC $87EC: C-----  8E FF 94 STX  $94FF
  0x0547FF $87EF: C-----  94 00    STY  $00,X
  0x054801 $87F1: ------  .byte $7E
  0x054802 $87F2: ------  .byte $42
  0x054803 $87F3: ------  .byte $42
  0x054804 $87F4: ------  .byte $42
  0x054805 $87F5: ------  .byte $42
  0x054806 $87F6: ------  .byte $7E
  0x054807 $87F7: ------  .byte $00
  0x054808 $87F8: ------  .byte $00
  0x054809 $87F9: ------  .byte $7E
  0x05480A $87FA: ------  .byte $42
  0x05480B $87FB: ------  .byte $42
  0x05480C $87FC: ------  .byte $42
  0x05480D $87FD: ------  .byte $42
  0x05480E $87FE: ------  .byte $7E
  0x05480F $87FF: ------  .byte $00
  0x054810 $8800: C-----  00       BRK  
  0x054811 $8801: C-----  00       BRK  
  0x054812 $8802: C-----  00       BRK  
  0x054813 $8803: C-----  00       BRK  
  0x054814 $8804: C-----  00       BRK  
  0x054815 $8805: C-----  00       BRK  
  0x054816 $8806: C-----  00       BRK  
  0x054817 $8807: C-----  00       BRK  
  0x054818 $8808: C-----  00       BRK  
  0x054819 $8809: C-----  00       BRK  
  0x05481A $880A: C-----  00       BRK  
  0x05481B $880B: C-----  00       BRK  
  0x05481C $880C: C-----  00       BRK  
  0x05481D $880D: C-----  00       BRK  
  0x05481E $880E: C-----  00       BRK  
  0x05481F $880F: C-----  00       BRK  
  0x054820 $8810: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054821 $8811: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054822 $8812: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054823 $8813: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054824 $8814: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054825 $8815: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054826 $8816: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054827 $8817: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054828 $8818: C-----  00       BRK  
  0x054829 $8819: C-----  00       BRK  
  0x05482A $881A: C-----  00       BRK  
  0x05482B $881B: C-----  00       BRK  
  0x05482C $881C: C-----  00       BRK  
  0x05482D $881D: C-----  00       BRK  
  0x05482E $881E: C-----  00       BRK  
  0x05482F $881F: C-----  00       BRK  
  0x054830 $8820: C-----  18       CLC  
  0x054831 $8821: C-----  58       CLI  
  0x054832 $8822: C-----  10 5E    BPL  $8882
  0x054834 $8824: C-----  60       RTS  
  0x054835 $8825: C-----  35 D4    AND  $D4,X
  0x054837 $8827: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x054838 $8828: C-----  0E B1 89 ASL  $89B1
  0x05483B $882B: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x05483C $882C: C-----  71 16    ADC  ($16),Y
  0x05483E $882E: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05483F $882F: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x054840 $8830: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054841 $8831: C-----  CC 32 0F CPY  $0F32
  0x054844 $8834: C-----  E8       INX  
  0x054845 $8835: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x054846 $8836: C-----  C8       INY  
  0x054847 $8837: C-----  98       TYA  
  0x054848 $8838: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x054849 $8839: C-----  86 49    STX  $49
  0x05484B $883B: C-----  11 0A    ORA  ($0A),Y
  0x05484D $883D: C-----  86 94    STX  $94
  0x05484F $883F: C-----  10 00    BPL  $8841
  0x054851 $8841: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054852 $8842: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054853 $8843: C-----  00       BRK  
  0x054854 $8844: C-----  00       BRK  
  0x054855 $8845: C-----  00       BRK  
  0x054856 $8846: C-----  00       BRK  
  0x054857 $8847: C-----  00       BRK  
  0x054858 $8848: C-----  00       BRK  
  0x054859 $8849: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05485A $884A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05485B $884B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05485C $884C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05485D $884D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05485E $884E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05485F $884F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054860 $8850: C-----  00       BRK  
  0x054861 $8851: C-----  00       BRK  
  0x054862 $8852: C-----  00       BRK  
  0x054863 $8853: C-----  00       BRK  
  0x054864 $8854: C-----  00       BRK  
  0x054865 $8855: C-----  00       BRK  
  0x054866 $8856: C-----  00       BRK  
  0x054867 $8857: C-----  00       BRK  
  0x054868 $8858: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054869 $8859: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05486A $885A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05486B $885B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05486C $885C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05486D $885D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05486E $885E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05486F $885F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054870 $8860: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x054871 $8861: C-----  A9 1A    LDA  #$1A
  0x054873 $8863: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x054874 $8864: C-----  60       RTS  
  0x054875 $8865: C-----  35 D4    AND  $D4,X
  0x054877 $8867: C-----  C0 00    CPY  #$00
  0x054879 $8869: C-----  00       BRK  
  0x05487A $886A: C-----  21 8A    AND  ($8A,X)
  0x05487C $886C: C-----  69 16    ADC  #$16
  0x05487E $886E: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x05487F $886F: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x054880 $8870: C-----  00       BRK  
  0x054881 $8871: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054882 $8872: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054883 $8873: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054884 $8874: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054885 $8875: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054886 $8876: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054887 $8877: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054888 $8878: C-----  00       BRK  
  0x054889 $8879: C-----  00       BRK  
  0x05488A $887A: C-----  00       BRK  
  0x05488B $887B: C-----  00       BRK  
  0x05488C $887C: C-----  00       BRK  
  0x05488D $887D: C-----  00       BRK  
  0x05488E $887E: C-----  00       BRK  
  0x05488F $887F: C-----  00       BRK  
  0x054890 $8880: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054891 $8881: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054892 $8882: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054893 $8883: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054894 $8884: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054895 $8885: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054896 $8886: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054897 $8887: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054898 $8888: C-----  00       BRK  
  0x054899 $8889: C-----  00       BRK  
  0x05489A $888A: C-----  00       BRK  
  0x05489B $888B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05489C $888C: C-----  00       BRK  
  0x05489D $888D: C-----  00       BRK  
  0x05489E $888E: C-----  00       BRK  
  0x05489F $888F: C-----  00       BRK  
  0x0548A0 $8890: C-----  18       CLC  
  0x0548A1 $8891: C-----  18       CLC  
  0x0548A2 $8892: C-----  30 30    BMI  $88C4
  0x0548A4 $8894: C-----  60       RTS  
  0x0548A5 $8895: C-----  60       RTS  
  0x0548A6 $8896: C-----  60       RTS  
  0x0548A7 $8897: C-----  60       RTS  
  0x0548A8 $8898: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0548A9 $8899: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0548AA $889A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0548AB $889B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0548AC $889C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548AD $889D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548AE $889E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548AF $889F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548B0 $88A0: C-----  00       BRK  
  0x0548B1 $88A1: C-----  00       BRK  
  0x0548B2 $88A2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0548B3 $88A3: C-----  08       PHP  
  0x0548B4 $88A4: C-----  20 14 32 JSR  $3214
  0x0548B7 $88A7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0548B8 $88A8: C-----  FD FC F3 SBC  $F3FC,X
  0x0548BB $88AB: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x0548BC $88AC: C-----  85 98    STA  $98
  0x0548BE $88AE: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0548BF $88AF: C-----  10 60    BPL  $8911
  0x0548C1 $88B1: C-----  60       RTS  
  0x0548C2 $88B2: C-----  60       RTS  
  0x0548C3 $88B3: C-----  60       RTS  
  0x0548C4 $88B4: C-----  60       RTS  
  0x0548C5 $88B5: C-----  60       RTS  
  0x0548C6 $88B6: C-----  60       RTS  
  0x0548C7 $88B7: C-----  60       RTS  
  0x0548C8 $88B8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548C9 $88B9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548CA $88BA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548CB $88BB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548CC $88BC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548CD $88BD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548CE $88BE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548CF $88BF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548D0 $88C0: C-----  00       BRK  
  0x0548D1 $88C1: C-----  00       BRK  
  0x0548D2 $88C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0548D3 $88C3: C-----  C0 E0    CPY  #$E0
  0x0548D5 $88C5: C-----  F0 F8    BEQ  $88BF
  0x0548D7 $88C7: C-----  F8       SED  
  0x0548D8 $88C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0548D9 $88C9: C-----  00       BRK  
  0x0548DA $88CA: C-----  00       BRK  
  0x0548DB $88CB: C-----  00       BRK  
  0x0548DC $88CC: C-----  00       BRK  
  0x0548DD $88CD: C-----  00       BRK  
  0x0548DE $88CE: C-----  00       BRK  
  0x0548DF $88CF: C-----  00       BRK  
  0x0548E0 $88D0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548E1 $88D1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548E2 $88D2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548E3 $88D3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0548E4 $88D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0548E5 $88D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0548E6 $88D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0548E7 $88D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0548E8 $88D8: C-----  38       SEC  
  0x0548E9 $88D9: C-----  B0 70    BCS  $894B
  0x0548EB $88DB: C-----  60       RTS  
  0x0548EC $88DC: C-----  E0 C0    CPX  #$C0
  0x0548EE $88DE: C-----  C0 C0    CPY  #$C0
  0x0548F0 $88E0: C-----  F8       SED  
  0x0548F1 $88E1: C-----  F8       SED  
  0x0548F2 $88E2: C-----  F8       SED  
  0x0548F3 $88E3: C-----  F8       SED  
  0x0548F4 $88E4: C-----  F8       SED  
  0x0548F5 $88E5: C-----  F8       SED  
  0x0548F6 $88E6: C-----  F8       SED  
  0x0548F7 $88E7: C-----  F8       SED  
  0x0548F8 $88E8: C-----  00       BRK  
  0x0548F9 $88E9: C-----  00       BRK  
  0x0548FA $88EA: C-----  00       BRK  
  0x0548FB $88EB: C-----  00       BRK  
  0x0548FC $88EC: C-----  00       BRK  
  0x0548FD $88ED: C-----  00       BRK  
  0x0548FE $88EE: C-----  00       BRK  
  0x0548FF $88EF: C-----  00       BRK  
  0x054900 $88F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054901 $88F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054902 $88F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054903 $88F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054904 $88F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054905 $88F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054906 $88F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054907 $88F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054908 $88F8: C-----  C0 C0    CPY  #$C0
  0x05490A $88FA: C-----  C0 C0    CPY  #$C0
  0x05490C $88FC: C-----  C0 C0    CPY  #$C0
  0x05490E $88FE: C-----  C0 C0    CPY  #$C0
  0x054910 $8900: C-----  00       BRK  
  0x054911 $8901: C-----  00       BRK  
  0x054912 $8902: C-----  00       BRK  
  0x054913 $8903: C-----  00       BRK  
  0x054914 $8904: C-----  00       BRK  
  0x054915 $8905: C-----  00       BRK  
  0x054916 $8906: C-----  F0 10    BEQ  $8918
  0x054918 $8908: C-----  00       BRK  
  0x054919 $8909: C-----  00       BRK  
  0x05491A $890A: C-----  00       BRK  
  0x05491B $890B: C-----  00       BRK  
  0x05491C $890C: C-----  00       BRK  
  0x05491D $890D: C-----  00       BRK  
  0x05491E $890E: C-----  00       BRK  
  0x05491F $890F: C-----  E0 00    CPX  #$00
  0x054921 $8911: C-----  00       BRK  
  0x054922 $8912: C-----  00       BRK  
  0x054923 $8913: C-----  00       BRK  
  0x054924 $8914: C-----  00       BRK  
  0x054925 $8915: C-----  00       BRK  
  0x054926 $8916: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x054927 $8917: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x054928 $8918: C-----  00       BRK  
  0x054929 $8919: C-----  00       BRK  
  0x05492A $891A: C-----  00       BRK  
  0x05492B $891B: C-----  00       BRK  
  0x05492C $891C: C-----  00       BRK  
  0x05492D $891D: C-----  00       BRK  
  0x05492E $891E: C-----  0E 0B E3 ASL  $E30B
  0x054931 $8921: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x054932 $8922: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x054933 $8923: C-----  11 AA    ORA  ($AA),Y
  0x054935 $8925: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x054936 $8926: C-----  18       CLC  
  0x054937 $8927: C-----  4A       LSR  A
  0x054938 $8928: C-----  E8       INX  
  0x054939 $8929: C-----  CA       DEX  
  0x05493A $892A: C-----  81 C3    STA  ($C3,X)
  0x05493C $892C: C-----  A8       TAY  
  0x05493D $892D: C-----  94 2C    STY  $2C,X
  0x05493F $892F: C-----  00       BRK  
  0x054940 $8930: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x054941 $8931: C-----  58       CLI  
  0x054942 $8932: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x054943 $8933: C-----  70 5F    BVS  $8994
  0x054945 $8935: C-----  60       RTS  
  0x054946 $8936: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054947 $8937: C-----  C0 1F    CPY  #$1F
  0x054949 $8939: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05494A $893A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05494B $893B: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05494C $893C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05494D $893D: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x05494E $893E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05494F $893F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054950 $8940: C-----  00       BRK  
  0x054951 $8941: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054952 $8942: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054953 $8943: C-----  00       BRK  
  0x054954 $8944: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054955 $8945: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054956 $8946: C-----  00       BRK  
  0x054957 $8947: C-----  11 00    ORA  ($00),Y
  0x054959 $8949: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05495A $894A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05495B $894B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05495C $894C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05495D $894D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05495E $894E: C-----  00       BRK  
  0x05495F $894F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054960 $8950: C-----  00       BRK  
  0x054961 $8951: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054962 $8952: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054963 $8953: C-----  00       BRK  
  0x054964 $8954: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054965 $8955: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054966 $8956: C-----  C0 D1    CPY  #$D1
  0x054968 $8958: C-----  00       BRK  
  0x054969 $8959: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05496A $895A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05496B $895B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05496C $895C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05496D $895D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05496E $895E: C-----  C0 DF    CPY  #$DF
  0x054970 $8960: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054971 $8961: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054972 $8962: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054973 $8963: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x054974 $8964: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054975 $8965: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x054976 $8966: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x054977 $8967: C-----  11 FF    ORA  ($FF),Y
  0x054979 $8969: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05497A $896A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05497B $896B: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05497C $896C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05497D $896D: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05497E $896E: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05497F $896F: C-----  11 FF    ORA  ($FF),Y
  0x054981 $8971: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054982 $8972: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054983 $8973: C-----  11 FF    ORA  ($FF),Y
  0x054985 $8975: C-----  00       BRK  
  0x054986 $8976: C-----  88       DEY  
  0x054987 $8977: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054988 $8978: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054989 $8979: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05498A $897A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05498B $897B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05498C $897C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05498D $897D: C-----  00       BRK  
  0x05498E $897E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05498F $897F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054990 $8980: C-----  7E 82 F8 ROR  $F882,X
  0x054993 $8983: C-----  05 FA    ORA  $FA
  0x054995 $8985: C-----  0D F0 10 ORA  $10F0
  0x054998 $8988: C-----  FE 7C F9 INC  $F97C,X
  0x05499B $898B: C-----  F8       SED  
  0x05499C $898C: C-----  F9 F6 F3 SBC  $F3F6,Y
  0x05499F $898F: C-----  E4 01    CPX  $01
  0x0549A1 $8991: C-----  CD 32 0F CMP  $0F32
  0x0549A4 $8994: C-----  ED C6 DF SBC  $DFC6
  0x0549A7 $8997: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0549A8 $8998: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0549A9 $8999: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0549AA $899A: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x0549AB $899B: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0549AC $899C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0549AD $899D: C-----  85 AF    STA  $AF
  0x0549AF $899F: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0549B0 $89A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549B1 $89A1: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0549B2 $89A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549B3 $89A3: C-----  11 FF    ORA  ($FF),Y
  0x0549B5 $89A5: C-----  00       BRK  
  0x0549B6 $89A6: C-----  88       DEY  
  0x0549B7 $89A7: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0549B8 $89A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549B9 $89A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549BA $89AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549BB $89AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549BC $89AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549BD $89AD: C-----  00       BRK  
  0x0549BE $89AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549BF $89AF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0549C0 $89B0: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0549C1 $89B1: C-----  C4 CB    CPY  $CB
  0x0549C3 $89B3: C-----  C9 DA    CMP  #$DA
  0x0549C5 $89B5: C-----  CA       DEX  
  0x0549C6 $89B6: C-----  CE CA CF DEC  $CFCA
  0x0549C9 $89B9: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x0549CA $89BA: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x0549CB $89BB: C-----  DD DE DE CMP  $DEDE,X
  0x0549CE $89BE: C-----  DE DF FF DEC  $FFDF,X
  0x0549D1 $89C1: C-----  B9 1B DF LDA  $DF1B,Y
  0x0549D4 $89C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549D5 $89C5: C-----  BD DC C4 LDA  $C4DC,X
  0x0549D8 $89C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549D9 $89C9: C-----  11 31    ORA  ($31),Y
  0x0549DB $89CB: C-----  8A       TXA  
  0x0549DC $89CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549DD $89CD: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x0549DE $89CE: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x0549DF $89CF: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0549E0 $89D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549E1 $89D1: C-----  4C 76 2F JMP  $2F76
  0x0549E4 $89D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549E5 $89D5: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0549E6 $89D6: C-----  EA       NOP  
  0x0549E7 $89D7: C-----  99 FF C6 STA  $C6FF,Y
  0x0549EA $89DA: C-----  4D 33 FF EOR  $FF33
  0x0549ED $89DD: C-----  A6 B6    LDX  $B6
  0x0549EF $89DF: C-----  11 FF    ORA  ($FF),Y
  0x0549F1 $89E1: C-----  DD 33 8F CMP  $8F33,X
  0x0549F4 $89E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549F5 $89E5: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x0549F6 $89E6: C-----  C8       INY  
  0x0549F7 $89E7: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x0549F8 $89E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0549F9 $89E9: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x0549FA $89EA: C-----  59 99 FF EOR  $FF99,Y
  0x0549FD $89ED: C-----  8E 9C 54 STX  $549C
  0x054A00 $89F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A01 $89F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A02 $89F2: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054A03 $89F3: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x054A04 $89F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A05 $89F5: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x054A06 $89F6: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x054A07 $89F7: C-----  11 FF    ORA  ($FF),Y
  0x054A09 $89F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A0A $89FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A0B $89FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A0C $89FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A0D $89FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A0E $89FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A0F $89FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A10 $8A00: C-----  69 92    ADC  #$92
  0x054A12 $8A02: C-----  01 05    ORA  ($05,X)
  0x054A14 $8A04: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054A15 $8A05: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054A16 $8A06: C-----  01 00    ORA  ($00,X)
  0x054A18 $8A08: C-----  00       BRK  
  0x054A19 $8A09: C-----  C0 E4    CPY  #$E4
  0x054A1B $8A0B: C-----  F0 F8    BEQ  $8A05
  0x054A1D $8A0D: C-----  FE FE FF INC  $FFFE,X
  0x054A20 $8A10: C-----  00       BRK  
  0x054A21 $8A11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A22 $8A12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A23 $8A13: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054A24 $8A14: C-----  06 06    ASL  $06
  0x054A26 $8A16: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x054A27 $8A17: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x054A28 $8A18: C-----  00       BRK  
  0x054A29 $8A19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A2A $8A1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A2B $8A1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A2C $8A1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A2D $8A1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A2E $8A1E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A2F $8A1F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A30 $8A20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A31 $8A21: C-----  11 11    ORA  ($11),Y
  0x054A33 $8A23: C-----  88       DEY  
  0x054A34 $8A24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A35 $8A25: C-----  88       DEY  
  0x054A36 $8A26: C-----  88       DEY  
  0x054A37 $8A27: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054A38 $8A28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A39 $8A29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A3A $8A2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A3B $8A2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A3C $8A2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A3D $8A2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A3E $8A2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A3F $8A2F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A40 $8A30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A41 $8A31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A42 $8A32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A43 $8A33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A44 $8A34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A45 $8A35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A46 $8A36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A47 $8A37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A48 $8A38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A49 $8A39: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054A4A $8A3A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054A4B $8A3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054A4C $8A3C: C-----  00       BRK  
  0x054A4D $8A3D: C-----  00       BRK  
  0x054A4E $8A3E: C-----  00       BRK  
  0x054A4F $8A3F: C-----  00       BRK  
  0x054A50 $8A40: ------  .byte $00
  0x054A51 $8A41: ------  .byte $00
  0x054A52 $8A42: ------  .byte $00
  0x054A53 $8A43: ------  .byte $00
  0x054A54 $8A44: ------  .byte $00
  0x054A55 $8A45: ------  .byte $00
  0x054A56 $8A46: ------  .byte $D0
  0x054A57 $8A47: ------  .byte $30
  0x054A58 $8A48: ------  .byte $00
  0x054A59 $8A49: ------  .byte $00
  0x054A5A $8A4A: ------  .byte $00
  0x054A5B $8A4B: ------  .byte $00
  0x054A5C $8A4C: ------  .byte $00
  0x054A5D $8A4D: ------  .byte $00
  0x054A5E $8A4E: ------  .byte $70
  0x054A5F $8A4F: ------  .byte $D0
  0x054A60 $8A50: C-----  08       PHP  
  0x054A61 $8A51: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x054A62 $8A52: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054A63 $8A53: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x054A64 $8A54: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x054A65 $8A55: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054A66 $8A56: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x054A67 $8A57: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054A68 $8A58: C-----  20 0B 07 JSR  $070B
  0x054A6B $8A5B: C-----  C6 26    DEC  $26
  0x054A6D $8A5D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x054A6E $8A5E: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x054A6F $8A5F: C-----  18       CLC  
  0x054A70 $8A60: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A71 $8A61: C-----  99 9B EF STA  $EF9B,Y
  0x054A74 $8A64: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054A75 $8A65: C-----  AD EC E4 LDA  $E4EC
  0x054A78 $8A68: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A79 $8A69: C-----  91 91    STA  ($91),Y
  0x054A7B $8A6B: C-----  AA       TAX  
  0x054A7C $8A6C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054A7D $8A6D: C-----  AE AB F4 LDX  $F4AB
  0x054A80 $8A70: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054A81 $8A71: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054A82 $8A72: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054A83 $8A73: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A84 $8A74: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054A85 $8A75: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A86 $8A76: C-----  DE DE CA DEC  $CADE,X
  0x054A89 $8A79: C-----  CA       DEX  
  0x054A8A $8A7A: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054A8B $8A7B: C-----  DE CB DE DEC  $DECB,X
  0x054A8E $8A7E: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054A8F $8A7F: C-----  DE DF DF DEC  $DFDF,X
  0x054A92 $8A82: C-----  CA       DEX  
  0x054A93 $8A83: C-----  CA       DEX  
  0x054A94 $8A84: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054A95 $8A85: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054A96 $8A86: C-----  CA       DEX  
  0x054A97 $8A87: C-----  CA       DEX  
  0x054A98 $8A88: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A99 $8A89: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A9A $8A8A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A9B $8A8B: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A9C $8A8C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A9D $8A8D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A9E $8A8E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054A9F $8A8F: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AA0 $8A90: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x054AA1 $8A91: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x054AA2 $8A92: C-----  91 E8    STA  ($E8),Y
  0x054AA4 $8A94: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x054AA5 $8A95: C-----  A8       TAY  
  0x054AA6 $8A96: C-----  A8       TAY  
  0x054AA7 $8A97: C-----  F6 DF    INC  $DF,X
  0x054AA9 $8A99: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AAA $8A9A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AAB $8A9B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054AAC $8A9C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054AAD $8A9D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054AAE $8A9E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054AAF $8A9F: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054AB0 $8AA0: C-----  AE BA EA LDX  $EABA
  0x054AB3 $8AA3: C-----  AA       TAX  
  0x054AB4 $8AA4: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x054AB5 $8AA5: C-----  AE BA EA LDX  $EABA
  0x054AB8 $8AA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AB9 $8AA9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054ABA $8AAA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054ABB $8AAB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054ABC $8AAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054ABD $8AAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054ABE $8AAE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054ABF $8AAF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AC0 $8AB0: C-----  CA       DEX  
  0x054AC1 $8AB1: C-----  CA       DEX  
  0x054AC2 $8AB2: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054AC3 $8AB3: C-----  CE DA CA DEC  $CADA
  0x054AC6 $8AB6: C-----  CA       DEX  
  0x054AC7 $8AB7: C-----  CA       DEX  
  0x054AC8 $8AB8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AC9 $8AB9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054ACA $8ABA: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054ACB $8ABB: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054ACC $8ABC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054ACD $8ABD: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054ACE $8ABE: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054ACF $8ABF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AD0 $8AC0: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054AD1 $8AC1: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054AD2 $8AC2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054AD3 $8AC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AD4 $8AC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AD5 $8AC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AD6 $8AC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AD7 $8AC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AD8 $8AC8: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x054AD9 $8AC9: C-----  A4 A4    LDY  $A4
  0x054ADB $8ACB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054ADC $8ACC: C-----  C0 00    CPY  #$00
  0x054ADE $8ACE: C-----  00       BRK  
  0x054ADF $8ACF: C-----  00       BRK  
  0x054AE0 $8AD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AE1 $8AD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AE2 $8AD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AE3 $8AD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AE4 $8AD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AE5 $8AD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AE6 $8AD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AE7 $8AD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054AE8 $8AD8: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x054AE9 $8AD9: C-----  AE BA EA LDX  $EABA
  0x054AEC $8ADC: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x054AED $8ADD: C-----  AE B8 E0 LDX  $E0B8
  0x054AF0 $8AE0: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AF1 $8AE1: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AF2 $8AE2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AF3 $8AE3: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AF4 $8AE4: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AF5 $8AE5: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AF6 $8AE6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AF7 $8AE7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054AF8 $8AE8: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054AF9 $8AE9: C-----  CE DA CA DEC  $CADA
  0x054AFC $8AEC: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054AFD $8AED: C-----  CE DA CA DEC  $CADA
  0x054B00 $8AF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B01 $8AF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B02 $8AF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B03 $8AF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B04 $8AF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B05 $8AF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B06 $8AF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B07 $8AF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B08 $8AF8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054B09 $8AF9: C-----  00       BRK  
  0x054B0A $8AFA: C-----  00       BRK  
  0x054B0B $8AFB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B0C $8AFC: C-----  00       BRK  
  0x054B0D $8AFD: C-----  00       BRK  
  0x054B0E $8AFE: C-----  00       BRK  
  0x054B0F $8AFF: C-----  00       BRK  
  0x054B10 $8B00: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054B11 $8B01: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054B12 $8B02: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054B13 $8B03: C-----  A2 BF    LDX  #$BF
  0x054B15 $8B05: C-----  A2 A2    LDX  #$A2
  0x054B17 $8B07: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x054B18 $8B08: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054B19 $8B09: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054B1A $8B0A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054B1B $8B0B: C-----  A2 BF    LDX  #$BF
  0x054B1D $8B0D: C-----  A2 A2    LDX  #$A2
  0x054B1F $8B0F: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x054B20 $8B10: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054B21 $8B11: C-----  CA       DEX  
  0x054B22 $8B12: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054B23 $8B13: C-----  CE CB CA DEC  $CACB
  0x054B26 $8B16: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054B27 $8B17: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054B28 $8B18: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054B29 $8B19: C-----  CA       DEX  
  0x054B2A $8B1A: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054B2B $8B1B: C-----  CE CB CA DEC  $CACB
  0x054B2E $8B1E: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054B2F $8B1F: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054B30 $8B20: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054B31 $8B21: C-----  E4 B6    CPX  $B6
  0x054B33 $8B23: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x054B34 $8B24: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054B35 $8B25: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x054B36 $8B26: C-----  EA       NOP  
  0x054B37 $8B27: C-----  B9 F7 A6 LDA  $A6F7,Y
  0x054B3A $8B2A: C-----  E5 BB    SBC  $BB
  0x054B3C $8B2C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054B3D $8B2D: C-----  AA       TAX  
  0x054B3E $8B2E: C-----  BA       TSX  
  0x054B3F $8B2F: C-----  B9 CB CE LDA  $CECB,Y
  0x054B42 $8B32: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054B43 $8B33: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054B44 $8B34: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054B45 $8B35: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054B46 $8B36: C-----  CA       DEX  
  0x054B47 $8B37: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054B48 $8B38: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054B49 $8B39: C-----  CE CB DB DEC  $DBCB
  0x054B4C $8B3C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054B4D $8B3D: C-----  CE DE DA DEC  $DADE
  0x054B50 $8B40: C-----  BD ED B9 LDA  $B9ED,X
  0x054B53 $8B43: C-----  AE EE FA LDX  $FAEE
  0x054B56 $8B46: C-----  EA       NOP  
  0x054B57 $8B47: C-----  BA       TSX  
  0x054B58 $8B48: C-----  BD ED E9 LDA  $E9ED,X
  0x054B5B $8B4B: C-----  B8       CLV  
  0x054B5C $8B4C: C-----  AE FE BE LDX  $BEFE
  0x054B5F $8B4F: C-----  BA       TSX  
  0x054B60 $8B50: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054B61 $8B51: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054B62 $8B52: C-----  DE CF CA DEC  $CACF,X
  0x054B65 $8B55: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054B66 $8B56: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054B67 $8B57: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054B68 $8B58: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054B69 $8B59: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x054B6A $8B5A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054B6B $8B5B: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x054B6C $8B5C: C-----  CA       DEX  
  0x054B6D $8B5D: C-----  CE DF DA DEC  $DADF
  0x054B70 $8B60: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054B71 $8B61: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054B72 $8B62: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054B73 $8B63: C-----  A2 BF    LDX  #$BF
  0x054B75 $8B65: C-----  A2 A2    LDX  #$A2
  0x054B77 $8B67: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x054B78 $8B68: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054B79 $8B69: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054B7A $8B6A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054B7B $8B6B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054B7C $8B6C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054B7D $8B6D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054B7E $8B6E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054B7F $8B6F: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054B80 $8B70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B81 $8B71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B82 $8B72: C-----  AE FA AA LDX  $AAFA
  0x054B85 $8B75: C-----  AA       TAX  
  0x054B86 $8B76: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x054B87 $8B77: C-----  AA       TAX  
  0x054B88 $8B78: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B89 $8B79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B8A $8B7A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B8B $8B7B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B8C $8B7C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B8D $8B7D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B8E $8B7E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B8F $8B7F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B90 $8B80: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054B91 $8B81: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054B92 $8B82: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054B93 $8B83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B94 $8B84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B95 $8B85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B96 $8B86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B97 $8B87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054B98 $8B88: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054B99 $8B89: C-----  CE D8 FF DEC  $FFD8
  0x054B9C $8B8C: C-----  00       BRK  
  0x054B9D $8B8D: C-----  00       BRK  
  0x054B9E $8B8E: C-----  00       BRK  
  0x054B9F $8B8F: C-----  00       BRK  
  0x054BA0 $8B90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BA1 $8B91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BA2 $8B92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BA3 $8B93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BA4 $8B94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BA5 $8B95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BA6 $8B96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BA7 $8B97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BA8 $8B98: C-----  00       BRK  
  0x054BA9 $8B99: C-----  C0 3F    CPY  #$3F
  0x054BAB $8B9B: C-----  00       BRK  
  0x054BAC $8B9C: C-----  00       BRK  
  0x054BAD $8B9D: C-----  00       BRK  
  0x054BAE $8B9E: C-----  00       BRK  
  0x054BAF $8B9F: C-----  00       BRK  
  0x054BB0 $8BA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BB1 $8BA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BB2 $8BA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BB3 $8BA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BB4 $8BA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BB5 $8BA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BB6 $8BA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BB7 $8BA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BB8 $8BA8: C-----  00       BRK  
  0x054BB9 $8BA9: C-----  00       BRK  
  0x054BBA $8BAA: C-----  00       BRK  
  0x054BBB $8BAB: C-----  00       BRK  
  0x054BBC $8BAC: C-----  00       BRK  
  0x054BBD $8BAD: C-----  00       BRK  
  0x054BBE $8BAE: C-----  F8       SED  
  0x054BBF $8BAF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054BC0 $8BB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BC1 $8BB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BC2 $8BB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BC3 $8BB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BC4 $8BB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BC5 $8BB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BC6 $8BB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BC7 $8BB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BC8 $8BB8: C-----  00       BRK  
  0x054BC9 $8BB9: C-----  00       BRK  
  0x054BCA $8BBA: C-----  00       BRK  
  0x054BCB $8BBB: C-----  00       BRK  
  0x054BCC $8BBC: C-----  00       BRK  
  0x054BCD $8BBD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054BCE $8BBE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054BCF $8BBF: C-----  00       BRK  
  0x054BD0 $8BC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BD1 $8BC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BD2 $8BC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BD3 $8BC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BD4 $8BC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BD5 $8BC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BD6 $8BC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BD7 $8BC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BD8 $8BC8: C-----  E0 1F    CPX  #$1F
  0x054BDA $8BCA: C-----  00       BRK  
  0x054BDB $8BCB: C-----  00       BRK  
  0x054BDC $8BCC: C-----  00       BRK  
  0x054BDD $8BCD: C-----  00       BRK  
  0x054BDE $8BCE: C-----  00       BRK  
  0x054BDF $8BCF: C-----  00       BRK  
  0x054BE0 $8BD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BE1 $8BD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BE2 $8BD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BE3 $8BD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BE4 $8BD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BE5 $8BD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BE6 $8BD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BE7 $8BD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BE8 $8BD8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054BE9 $8BD9: C-----  00       BRK  
  0x054BEA $8BDA: C-----  00       BRK  
  0x054BEB $8BDB: C-----  00       BRK  
  0x054BEC $8BDC: C-----  00       BRK  
  0x054BED $8BDD: C-----  00       BRK  
  0x054BEE $8BDE: C-----  00       BRK  
  0x054BEF $8BDF: C-----  00       BRK  
  0x054BF0 $8BE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BF1 $8BE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BF2 $8BE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BF3 $8BE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BF4 $8BE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BF5 $8BE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BF6 $8BE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BF7 $8BE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054BF8 $8BE8: C-----  00       BRK  
  0x054BF9 $8BE9: C-----  00       BRK  
  0x054BFA $8BEA: C-----  00       BRK  
  0x054BFB $8BEB: C-----  00       BRK  
  0x054BFC $8BEC: C-----  FE 01 00 INC  $0001,X
  0x054BFF $8BEF: C-----  00       BRK  
  0x054C00 $8BF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C01 $8BF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C02 $8BF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C03 $8BF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C04 $8BF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C05 $8BF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C06 $8BF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C07 $8BF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C08 $8BF8: C-----  00       BRK  
  0x054C09 $8BF9: C-----  00       BRK  
  0x054C0A $8BFA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054C0B $8BFB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054C0C $8BFC: C-----  00       BRK  
  0x054C0D $8BFD: C-----  00       BRK  
  0x054C0E $8BFE: C-----  00       BRK  
  0x054C0F $8BFF: C-----  00       BRK  
  0x054C10 $8C00: C-----  00       BRK  
  0x054C11 $8C01: C-----  00       BRK  
  0x054C12 $8C02: C-----  00       BRK  
  0x054C13 $8C03: C-----  00       BRK  
  0x054C14 $8C04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C15 $8C05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C16 $8C06: C-----  00       BRK  
  0x054C17 $8C07: C-----  11 00    ORA  ($00),Y
  0x054C19 $8C09: C-----  00       BRK  
  0x054C1A $8C0A: C-----  00       BRK  
  0x054C1B $8C0B: C-----  00       BRK  
  0x054C1C $8C0C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C1D $8C0D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C1E $8C0E: C-----  00       BRK  
  0x054C1F $8C0F: C-----  11 FF    ORA  ($FF),Y
  0x054C21 $8C11: C-----  11 11    ORA  ($11),Y
  0x054C23 $8C13: C-----  88       DEY  
  0x054C24 $8C14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C25 $8C15: C-----  88       DEY  
  0x054C26 $8C16: C-----  88       DEY  
  0x054C27 $8C17: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054C28 $8C18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C29 $8C19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C2A $8C1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C2B $8C1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C2C $8C1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C2D $8C1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C2E $8C1E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C2F $8C1F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054C30 $8C20: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054C31 $8C21: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054C32 $8C22: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054C33 $8C23: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054C34 $8C24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C35 $8C25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C36 $8C26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C37 $8C27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C38 $8C28: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054C39 $8C29: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054C3A $8C2A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054C3B $8C2B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054C3C $8C2C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054C3D $8C2D: C-----  00       BRK  
  0x054C3E $8C2E: C-----  00       BRK  
  0x054C3F $8C2F: C-----  00       BRK  
  0x054C40 $8C30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C41 $8C31: C-----  ED FF 5D SBC  $5DFF
  0x054C44 $8C34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C45 $8C35: C-----  00       BRK  
  0x054C46 $8C36: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x054C47 $8C37: C-----  C4 FF    CPY  $FF
  0x054C49 $8C39: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054C4A $8C3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C4B $8C3B: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x054C4C $8C3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C4D $8C3D: C-----  00       BRK  
  0x054C4E $8C3E: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x054C4F $8C3F: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x054C50 $8C40: C-----  00       BRK  
  0x054C51 $8C41: C-----  00       BRK  
  0x054C52 $8C42: C-----  00       BRK  
  0x054C53 $8C43: C-----  00       BRK  
  0x054C54 $8C44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C55 $8C45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C56 $8C46: C-----  C0 D1    CPY  #$D1
  0x054C58 $8C48: C-----  00       BRK  
  0x054C59 $8C49: C-----  00       BRK  
  0x054C5A $8C4A: C-----  00       BRK  
  0x054C5B $8C4B: C-----  00       BRK  
  0x054C5C $8C4C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C5D $8C4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C5E $8C4E: C-----  C0 D1    CPY  #$D1
  0x054C60 $8C50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C61 $8C51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C62 $8C52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C63 $8C53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C64 $8C54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C65 $8C55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C66 $8C56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C67 $8C57: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054C68 $8C58: C-----  00       BRK  
  0x054C69 $8C59: C-----  00       BRK  
  0x054C6A $8C5A: C-----  00       BRK  
  0x054C6B $8C5B: C-----  00       BRK  
  0x054C6C $8C5C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054C6D $8C5D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054C6E $8C5E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054C6F $8C5F: C-----  FE CF C5 INC  $C5CF,X
  0x054C72 $8C62: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x054C73 $8C63: C-----  DD DA DE CMP  $DEDA,X
  0x054C76 $8C66: C-----  DE CA CF DEC  $CFCA,X
  0x054C79 $8C69: C-----  C4 CB    CPY  $CB
  0x054C7B $8C6B: C-----  C9 DA    CMP  #$DA
  0x054C7D $8C6D: C-----  DE CE DE DEC  $DECE,X
  0x054C80 $8C70: C-----  C0 F0    CPY  #$F0
  0x054C82 $8C72: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054C83 $8C73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C84 $8C74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C85 $8C75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C86 $8C76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C87 $8C77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C88 $8C78: C-----  00       BRK  
  0x054C89 $8C79: C-----  00       BRK  
  0x054C8A $8C7A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x054C8B $8C7B: C-----  08       PHP  
  0x054C8C $8C7C: C-----  D0 30    BNE  $8CAE
  0x054C8E $8C7E: C-----  4C 83 FF JMP  $FF83
  0x054C91 $8C81: C-----  CC 76 2F CPY  $2F76
  0x054C94 $8C84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054C95 $8C85: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x054C96 $8C86: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x054C97 $8C87: C-----  99 FF C6 STA  $C6FF,Y
  0x054C9A $8C8A: C-----  4D 33 FF EOR  $FF33
  0x054C9D $8C8D: C-----  A6 A6    LDX  $A6
  0x054C9F $8C8F: C-----  11 7F    ORA  ($7F),Y
  0x054CA1 $8C91: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x054CA2 $8C92: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x054CA3 $8C93: C-----  BE BF B7 LDX  $B7BF,Y
  0x054CA6 $8C96: C-----  BE 93 7F LDX  $7F93,Y
  0x054CA9 $8C99: C-----  75 4D    ADC  $4D,X
  0x054CAB $8C9B: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x054CAC $8C9C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x054CAD $8C9D: C-----  B6 A3    LDX  $A3,Y
  0x054CAF $8C9F: C-----  95 FF    STA  $FF,X
  0x054CB1 $8CA1: C-----  DD 33 8F CMP  $8F33,X
  0x054CB4 $8CA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CB5 $8CA5: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054CB6 $8CA6: C-----  D8       CLD  
  0x054CB7 $8CA7: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054CB8 $8CA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CB9 $8CA9: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x054CBA $8CAA: C-----  59 99 FF EOR  $FF99,Y
  0x054CBD $8CAD: C-----  8C AC 44 STY  $44AC
  0x054CC0 $8CB0: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054CC1 $8CB1: C-----  DD 93 AF CMP  $AF93,X
  0x054CC4 $8CB4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054CC5 $8CB5: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x054CC6 $8CB6: C-----  E8       INX  
  0x054CC7 $8CB7: C-----  A4 DF    LDY  $DF
  0x054CC9 $8CB9: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x054CCA $8CBA: C-----  D9 A9 EF CMP  $EFA9,Y
  0x054CCD $8CBD: C-----  A8       TAY  
  0x054CCE $8CBE: C-----  A8       TAY  
  0x054CCF $8CBF: C-----  A4 CB    LDY  $CB
  0x054CD1 $8CC1: C-----  CE DA CF DEC  $CFDA
  0x054CD4 $8CC4: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054CD5 $8CC5: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054CD6 $8CC6: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054CD7 $8CC7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054CD8 $8CC8: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054CD9 $8CC9: C-----  CE DB DF DEC  $DFDB
  0x054CDC $8CCC: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054CDD $8CCD: C-----  CE DE CF DEC  $CFDE
  0x054CE0 $8CD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CE1 $8CD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CE2 $8CD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CE3 $8CD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CE4 $8CD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CE5 $8CD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CE6 $8CD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CE7 $8CD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054CE8 $8CD8: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x054CE9 $8CD9: C-----  4C 30 D0 JMP  $D030
  0x054CEC $8CDC: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x054CED $8CDD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x054CEE $8CDE: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x054CEF $8CDF: C-----  C1 DA    CMP  ($DA,X)
  0x054CF1 $8CE1: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054CF2 $8CE2: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x054CF3 $8CE3: C-----  DE DF DF DEC  $DFDF,X
  0x054CF6 $8CE6: C-----  DE CA CE DEC  $CECA,X
  0x054CF9 $8CE9: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x054CFA $8CEA: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054CFB $8CEB: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054CFC $8CEC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054CFD $8CED: C-----  DE CB CA DEC  $CACB,X
  0x054D00 $8CF0: C-----  00       BRK  
  0x054D01 $8CF1: C-----  00       BRK  
  0x054D02 $8CF2: C-----  00       BRK  
  0x054D03 $8CF3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054D04 $8CF4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054D05 $8CF5: C-----  C0 C0    CPY  #$C0
  0x054D07 $8CF7: C-----  C0 00    CPY  #$00
  0x054D09 $8CF9: C-----  00       BRK  
  0x054D0A $8CFA: C-----  00       BRK  
  0x054D0B $8CFB: C-----  00       BRK  
  0x054D0C $8CFC: C-----  00       BRK  
  0x054D0D $8CFD: C-----  00       BRK  
  0x054D0E $8CFE: C-----  00       BRK  
  0x054D0F $8CFF: C-----  00       BRK  
  0x054D10 $8D00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D11 $8D01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D12 $8D02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D13 $8D03: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054D14 $8D04: C-----  F0 C0    BEQ  $8CC6
  0x054D16 $8D06: C-----  00       BRK  
  0x054D17 $8D07: C-----  00       BRK  
  0x054D18 $8D08: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054D19 $8D09: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054D1A $8D0A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054D1B $8D0B: C-----  FE F8 E0 INC  $E0F8,X
  0x054D1E $8D0E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054D1F $8D0F: C-----  00       BRK  
  0x054D20 $8D10: C-----  F0 C0    BEQ  $8CD2
  0x054D22 $8D12: C-----  00       BRK  
  0x054D23 $8D13: C-----  00       BRK  
  0x054D24 $8D14: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054D25 $8D15: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054D26 $8D16: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054D27 $8D17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D28 $8D18: C-----  F8       SED  
  0x054D29 $8D19: C-----  E0 80    CPX  #$80
  0x054D2B $8D1B: C-----  00       BRK  
  0x054D2C $8D1C: C-----  00       BRK  
  0x054D2D $8D1D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x054D2E $8D1E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054D2F $8D1F: C-----  01 0F    ORA  ($0F,X)
  0x054D31 $8D21: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054D32 $8D22: C-----  00       BRK  
  0x054D33 $8D23: C-----  00       BRK  
  0x054D34 $8D24: C-----  C0 F0    CPY  #$F0
  0x054D36 $8D26: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054D37 $8D27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D38 $8D28: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054D39 $8D29: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054D3A $8D2A: C-----  01 00    ORA  ($00,X)
  0x054D3C $8D2C: C-----  00       BRK  
  0x054D3D $8D2D: C-----  20 40 80 JSR  $8040
  0x054D40 $8D30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D41 $8D31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D42 $8D32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D43 $8D33: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054D44 $8D34: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054D45 $8D35: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054D46 $8D36: C-----  00       BRK  
  0x054D47 $8D37: C-----  00       BRK  
  0x054D48 $8D38: C-----  C0 F0    CPY  #$F0
  0x054D4A $8D3A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054D4B $8D3B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054D4C $8D3C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x054D4D $8D3D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054D4E $8D3E: C-----  01 00    ORA  ($00,X)
  0x054D50 $8D40: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054D51 $8D41: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054D52 $8D42: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054D53 $8D43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D54 $8D44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D55 $8D45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D56 $8D46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D57 $8D47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D58 $8D48: C-----  00       BRK  
  0x054D59 $8D49: C-----  00       BRK  
  0x054D5A $8D4A: C-----  20 10 0B JSR  $0B10
  0x054D5D $8D4D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x054D5E $8D4E: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x054D5F $8D4F: C-----  C1 FF    CMP  ($FF,X)
  0x054D61 $8D51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D62 $8D52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D63 $8D53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D64 $8D54: C-----  00       BRK  
  0x054D65 $8D55: C-----  00       BRK  
  0x054D66 $8D56: C-----  00       BRK  
  0x054D67 $8D57: C-----  00       BRK  
  0x054D68 $8D58: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D69 $8D59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D6A $8D5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D6B $8D5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D6C $8D5C: C-----  00       BRK  
  0x054D6D $8D5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D6E $8D5E: C-----  00       BRK  
  0x054D6F $8D5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D70 $8D60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D71 $8D61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D72 $8D62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D73 $8D63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D74 $8D64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D75 $8D65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D76 $8D66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D77 $8D67: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x054D78 $8D68: C-----  00       BRK  
  0x054D79 $8D69: C-----  00       BRK  
  0x054D7A $8D6A: C-----  00       BRK  
  0x054D7B $8D6B: C-----  00       BRK  
  0x054D7C $8D6C: C-----  C0 F0    CPY  #$F0
  0x054D7E $8D6E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x054D7F $8D6F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054D80 $8D70: C-----  EA       NOP  
  0x054D81 $8D71: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054D82 $8D72: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054D83 $8D73: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054D84 $8D74: C-----  00       BRK  
  0x054D85 $8D75: C-----  00       BRK  
  0x054D86 $8D76: C-----  00       BRK  
  0x054D87 $8D77: C-----  00       BRK  
  0x054D88 $8D78: C-----  EA       NOP  
  0x054D89 $8D79: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054D8A $8D7A: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054D8B $8D7B: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054D8C $8D7C: C-----  00       BRK  
  0x054D8D $8D7D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D8E $8D7E: C-----  00       BRK  
  0x054D8F $8D7F: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x054D90 $8D80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D91 $8D81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D92 $8D82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D93 $8D83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D94 $8D84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D95 $8D85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D96 $8D86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D97 $8D87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054D98 $8D88: C-----  C1 32    CMP  ($32,X)
  0x054D9A $8D8A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x054D9B $8D8B: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x054D9C $8D8C: C-----  D0 30    BNE  $8DBE
  0x054D9E $8D8E: C-----  4C 83 FF JMP  $FF83
  0x054DA1 $8D91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DA2 $8D92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DA3 $8D93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DA4 $8D94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DA5 $8D95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DA6 $8D96: C-----  00       BRK  
  0x054DA7 $8D97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DA8 $8D98: C-----  00       BRK  
  0x054DA9 $8D99: C-----  00       BRK  
  0x054DAA $8D9A: C-----  00       BRK  
  0x054DAB $8D9B: C-----  00       BRK  
  0x054DAC $8D9C: C-----  00       BRK  
  0x054DAD $8D9D: C-----  00       BRK  
  0x054DAE $8D9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DAF $8D9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DB0 $8DA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DB1 $8DA1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054DB2 $8DA2: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x054DB3 $8DA3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x054DB4 $8DA4: C-----  E1 E0    SBC  ($E0,X)
  0x054DB6 $8DA6: C-----  00       BRK  
  0x054DB7 $8DA7: C-----  EA       NOP  
  0x054DB8 $8DA8: C-----  C0 D0    CPY  #$D0
  0x054DBA $8DAA: C-----  D8       CLD  
  0x054DBB $8DAB: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x054DBC $8DAC: C-----  DE DF EA DEC  $EADF,X
  0x054DBF $8DAF: C-----  EA       NOP  
  0x054DC0 $8DB0: C-----  00       BRK  
  0x054DC1 $8DB1: C-----  00       BRK  
  0x054DC2 $8DB2: C-----  00       BRK  
  0x054DC3 $8DB3: C-----  00       BRK  
  0x054DC4 $8DB4: C-----  00       BRK  
  0x054DC5 $8DB5: C-----  00       BRK  
  0x054DC6 $8DB6: C-----  00       BRK  
  0x054DC7 $8DB7: C-----  00       BRK  
  0x054DC8 $8DB8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x054DC9 $8DB9: C-----  A0 50    LDY  #$50
  0x054DCB $8DBB: C-----  00       BRK  
  0x054DCC $8DBC: C-----  55 FF    EOR  $FF,X
  0x054DCE $8DBE: C-----  AA       TAX  
  0x054DCF $8DBF: C-----  00       BRK  
  0x054DD0 $8DC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DD1 $8DC1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054DD2 $8DC2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x054DD3 $8DC3: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x054DD4 $8DC4: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x054DD5 $8DC5: C-----  E1 00    SBC  ($00,X)
  0x054DD7 $8DC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DD8 $8DC8: C-----  C0 D0    CPY  #$D0
  0x054DDA $8DCA: C-----  D0 D8    BNE  $8DA4
  0x054DDC $8DCC: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x054DDD $8DCD: C-----  DE FF FF DEC  $FFFF,X
  0x054DE0 $8DD0: C-----  00       BRK  
  0x054DE1 $8DD1: C-----  00       BRK  
  0x054DE2 $8DD2: C-----  00       BRK  
  0x054DE3 $8DD3: C-----  00       BRK  
  0x054DE4 $8DD4: C-----  00       BRK  
  0x054DE5 $8DD5: C-----  00       BRK  
  0x054DE6 $8DD6: C-----  00       BRK  
  0x054DE7 $8DD7: C-----  00       BRK  
  0x054DE8 $8DD8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054DE9 $8DD9: C-----  00       BRK  
  0x054DEA $8DDA: C-----  00       BRK  
  0x054DEB $8DDB: C-----  00       BRK  
  0x054DEC $8DDC: C-----  55 FF    EOR  $FF,X
  0x054DEE $8DDE: C-----  AA       TAX  
  0x054DEF $8DDF: C-----  00       BRK  
  0x054DF0 $8DE0: C-----  00       BRK  
  0x054DF1 $8DE1: C-----  00       BRK  
  0x054DF2 $8DE2: C-----  00       BRK  
  0x054DF3 $8DE3: C-----  00       BRK  
  0x054DF4 $8DE4: C-----  00       BRK  
  0x054DF5 $8DE5: C-----  00       BRK  
  0x054DF6 $8DE6: C-----  00       BRK  
  0x054DF7 $8DE7: C-----  00       BRK  
  0x054DF8 $8DE8: C-----  FD 02 01 SBC  $0102,X
  0x054DFB $8DEB: C-----  00       BRK  
  0x054DFC $8DEC: C-----  55 FF    EOR  $FF,X
  0x054DFE $8DEE: C-----  AA       TAX  
  0x054DFF $8DEF: C-----  00       BRK  
  0x054E00 $8DF0: C-----  00       BRK  
  0x054E01 $8DF1: C-----  01 03    ORA  ($03,X)
  0x054E03 $8DF3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054E04 $8DF4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054E05 $8DF5: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x054E06 $8DF6: C-----  1D 2D 00 ORA  $002D,X
  0x054E09 $8DF9: C-----  00       BRK  
  0x054E0A $8DFA: C-----  00       BRK  
  0x054E0B $8DFB: C-----  00       BRK  
  0x054E0C $8DFC: C-----  00       BRK  
  0x054E0D $8DFD: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x054E0E $8DFE: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x054E0F $8DFF: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x054E10 $8E00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E11 $8E01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E12 $8E02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E13 $8E03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E14 $8E04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E15 $8E05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E16 $8E06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E17 $8E07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E18 $8E08: C-----  00       BRK  
  0x054E19 $8E09: C-----  00       BRK  
  0x054E1A $8E0A: C-----  00       BRK  
  0x054E1B $8E0B: C-----  00       BRK  
  0x054E1C $8E0C: C-----  00       BRK  
  0x054E1D $8E0D: C-----  00       BRK  
  0x054E1E $8E0E: C-----  00       BRK  
  0x054E1F $8E0F: C-----  F0 F7    BEQ  $8E08
  0x054E21 $8E11: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054E22 $8E12: C-----  A4 AA    LDY  $AA
  0x054E24 $8E14: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x054E25 $8E15: C-----  EA       NOP  
  0x054E26 $8E16: C-----  AA       TAX  
  0x054E27 $8E17: C-----  A9 F7    LDA  #$F7
  0x054E29 $8E19: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054E2A $8E1A: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x054E2B $8E1B: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054E2C $8E1C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054E2D $8E1D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054E2E $8E1E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x054E2F $8E1F: C-----  FD 00 00 SBC  $0000,X
  0x054E32 $8E22: C-----  00       BRK  
  0x054E33 $8E23: C-----  00       BRK  
  0x054E34 $8E24: C-----  00       BRK  
  0x054E35 $8E25: C-----  00       BRK  
  0x054E36 $8E26: C-----  00       BRK  
  0x054E37 $8E27: C-----  00       BRK  
  0x054E38 $8E28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E39 $8E29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E3A $8E2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E3B $8E2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E3C $8E2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E3D $8E2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E3E $8E2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054E3F $8E2F: C-----  00       BRK  
  0x054E40 $8E30: C-----  AD B9 E9 LDA  $E9B9
  0x054E43 $8E33: C-----  AA       TAX  
  0x054E44 $8E34: C-----  AA       TAX  
  0x054E45 $8E35: C-----  AE BA EA LDX  $EABA
  0x054E48 $8E38: C-----  FD FD FD SBC  $FDFD,X
  0x054E4B $8E3B: C-----  FE FE FE INC  $FEFE,X
  0x054E4E $8E3E: C-----  FE FF DF INC  $DFFF,X
  0x054E51 $8E41: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054E52 $8E42: C-----  CA       DEX  
  0x054E53 $8E43: C-----  CA       DEX  
  0x054E54 $8E44: C-----  CA       DEX  
  0x054E55 $8E45: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x054E56 $8E46: C-----  DE CA DF DEC  $DFCA,X
  0x054E59 $8E49: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054E5A $8E4A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054E5B $8E4B: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054E5C $8E4C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054E5D $8E4D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054E5E $8E4E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054E5F $8E4F: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x054E60 $8E50: C-----  20 00 00 JSR  $0000
  0x054E63 $8E53: C-----  01 00    ORA  ($00,X)
  0x054E65 $8E55: C-----  10 0E    BPL  $8E65
  0x054E67 $8E57: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054E68 $8E58: C-----  00       BRK  
  0x054E69 $8E59: C-----  00       BRK  
  0x054E6A $8E5A: C-----  00       BRK  
  0x054E6B $8E5B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054E6C $8E5C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054E6D $8E5D: C-----  1E 0F 17 ASL  $170F,X
  0x054E70 $8E60: C-----  00       BRK  
  0x054E71 $8E61: C-----  00       BRK  
  0x054E72 $8E62: C-----  00       BRK  
  0x054E73 $8E63: C-----  00       BRK  
  0x054E74 $8E64: C-----  60       RTS  
  0x054E75 $8E65: C-----  60       RTS  
  0x054E76 $8E66: C-----  70 70    BVS  $8ED8
  0x054E78 $8E68: C-----  00       BRK  
  0x054E79 $8E69: C-----  00       BRK  
  0x054E7A $8E6A: C-----  00       BRK  
  0x054E7B $8E6B: C-----  00       BRK  
  0x054E7C $8E6C: C-----  60       RTS  
  0x054E7D $8E6D: C-----  60       RTS  
  0x054E7E $8E6E: C-----  30 30    BMI  $8EA0
  0x054E80 $8E70: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x054E81 $8E71: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x054E82 $8E72: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x054E83 $8E73: C-----  39 7F AD AND  $AD7F,Y
  0x054E86 $8E76: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x054E87 $8E77: C-----  0A       ASL  A
  0x054E88 $8E78: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x054E89 $8E79: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x054E8A $8E7A: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x054E8B $8E7B: C-----  30 70    BMI  $8EED
  0x054E8D $8E7D: C-----  A0 50    LDY  #$50
  0x054E8F $8E7F: C-----  08       PHP  
  0x054E90 $8E80: C-----  01 08    ORA  ($08,X)
  0x054E92 $8E82: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x054E93 $8E83: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x054E94 $8E84: C-----  11 38    ORA  ($38),Y
  0x054E96 $8E86: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x054E97 $8E87: C-----  39 07 03 AND  $0307,Y
  0x054E9A $8E8A: C-----  00       BRK  
  0x054E9B $8E8B: C-----  06 03    ASL  $03
  0x054E9D $8E8D: C-----  00       BRK  
  0x054E9E $8E8E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054E9F $8E8F: C-----  01 E0    ORA  ($E0,X)
  0x054EA1 $8E91: C-----  00       BRK  
  0x054EA2 $8E92: C-----  20 20 40 JSR  $4020
  0x054EA5 $8E95: C-----  C0 00    CPY  #$00
  0x054EA7 $8E97: C-----  00       BRK  
  0x054EA8 $8E98: C-----  F8       SED  
  0x054EA9 $8E99: C-----  F8       SED  
  0x054EAA $8E9A: C-----  30 20    BMI  $8EBC
  0x054EAC $8E9C: C-----  60       RTS  
  0x054EAD $8E9D: C-----  E0 C2    CPX  #$C2
  0x054EAF $8E9F: C-----  18       CLC  
  0x054EB0 $8EA0: C-----  1E 1C 1C ASL  $1C1C,X
  0x054EB3 $8EA3: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x054EB4 $8EA4: C-----  10 08    BPL  $8EAE
  0x054EB6 $8EA6: C-----  00       BRK  
  0x054EB7 $8EA7: C-----  00       BRK  
  0x054EB8 $8EA8: C-----  00       BRK  
  0x054EB9 $8EA9: C-----  00       BRK  
  0x054EBA $8EAA: C-----  00       BRK  
  0x054EBB $8EAB: C-----  00       BRK  
  0x054EBC $8EAC: C-----  00       BRK  
  0x054EBD $8EAD: C-----  00       BRK  
  0x054EBE $8EAE: C-----  00       BRK  
  0x054EBF $8EAF: C-----  00       BRK  
  0x054EC0 $8EB0: C-----  20 10 80 JSR  $8010
  0x054EC3 $8EB3: C-----  E8       INX  
  0x054EC4 $8EB4: C-----  18       CLC  
  0x054EC5 $8EB5: C-----  00       BRK  
  0x054EC6 $8EB6: C-----  00       BRK  
  0x054EC7 $8EB7: C-----  00       BRK  
  0x054EC8 $8EB8: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x054EC9 $8EB9: C-----  30 10    BMI  $8ECB
  0x054ECB $8EBB: C-----  18       CLC  
  0x054ECC $8EBC: C-----  00       BRK  
  0x054ECD $8EBD: C-----  00       BRK  
  0x054ECE $8EBE: C-----  00       BRK  
  0x054ECF $8EBF: C-----  00       BRK  
  0x054ED0 $8EC0: C-----  00       BRK  
  0x054ED1 $8EC1: C-----  00       BRK  
  0x054ED2 $8EC2: C-----  00       BRK  
  0x054ED3 $8EC3: C-----  00       BRK  
  0x054ED4 $8EC4: C-----  00       BRK  
  0x054ED5 $8EC5: C-----  09 08    ORA  #$08
  0x054ED7 $8EC7: C-----  08       PHP  
  0x054ED8 $8EC8: C-----  00       BRK  
  0x054ED9 $8EC9: C-----  00       BRK  
  0x054EDA $8ECA: C-----  00       BRK  
  0x054EDB $8ECB: C-----  00       BRK  
  0x054EDC $8ECC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054EDD $8ECD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054EDE $8ECE: C-----  08       PHP  
  0x054EDF $8ECF: C-----  08       PHP  
  0x054EE0 $8ED0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x054EE1 $8ED1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054EE2 $8ED2: C-----  00       BRK  
  0x054EE3 $8ED3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054EE4 $8ED4: C-----  05 05    ORA  $05
  0x054EE6 $8ED6: C-----  06 03    ASL  $03
  0x054EE8 $8ED8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x054EE9 $8ED9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054EEA $8EDA: C-----  00       BRK  
  0x054EEB $8EDB: C-----  00       BRK  
  0x054EEC $8EDC: C-----  01 01    ORA  ($01,X)
  0x054EEE $8EDE: C-----  00       BRK  
  0x054EEF $8EDF: C-----  00       BRK  
  0x054EF0 $8EE0: C-----  78       SEI  
  0x054EF1 $8EE1: C-----  30 71    BMI  $8F54
  0x054EF3 $8EE3: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x054EF4 $8EE4: C-----  E0 00    CPX  #$00
  0x054EF6 $8EE6: C-----  01 03    ORA  ($03,X)
  0x054EF8 $8EE8: C-----  00       BRK  
  0x054EF9 $8EE9: C-----  00       BRK  
  0x054EFA $8EEA: C-----  00       BRK  
  0x054EFB $8EEB: C-----  00       BRK  
  0x054EFC $8EEC: C-----  00       BRK  
  0x054EFD $8EED: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054EFE $8EEE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x054EFF $8EEF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054F00 $8EF0: C-----  00       BRK  
  0x054F01 $8EF1: C-----  A0 5A    LDY  #$5A
  0x054F03 $8EF3: C-----  B5 0D    LDA  $0D,X
  0x054F05 $8EF5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F06 $8EF6: C-----  C0 C0    CPY  #$C0
  0x054F08 $8EF8: C-----  00       BRK  
  0x054F09 $8EF9: C-----  00       BRK  
  0x054F0A $8EFA: C-----  00       BRK  
  0x054F0B $8EFB: C-----  00       BRK  
  0x054F0C $8EFC: C-----  00       BRK  
  0x054F0D $8EFD: C-----  C0 E0    CPY  #$E0
  0x054F0F $8EFF: C-----  F0 60    BEQ  $8F61
  0x054F11 $8F01: C-----  40       RTI  
  0x054F12 $8F02: C-----  40       RTI  
  0x054F13 $8F03: C-----  C0 00    CPY  #$00
  0x054F15 $8F05: C-----  A0 A0    LDY  #$A0
  0x054F17 $8F07: C-----  E0 90    CPX  #$90
  0x054F19 $8F09: C-----  B0 A0    BCS  $8EAB
  0x054F1B $8F0B: C-----  E0 60    CPX  #$60
  0x054F1D $8F0D: C-----  B0 F4    BCS  $8F03
  0x054F1F $8F0F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x054F20 $8F10: C-----  00       BRK  
  0x054F21 $8F11: C-----  01 01    ORA  ($01,X)
  0x054F23 $8F13: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054F24 $8F14: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054F25 $8F15: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054F26 $8F16: C-----  01 00    ORA  ($00,X)
  0x054F28 $8F18: C-----  00       BRK  
  0x054F29 $8F19: C-----  00       BRK  
  0x054F2A $8F1A: C-----  00       BRK  
  0x054F2B $8F1B: C-----  00       BRK  
  0x054F2C $8F1C: C-----  00       BRK  
  0x054F2D $8F1D: C-----  00       BRK  
  0x054F2E $8F1E: C-----  00       BRK  
  0x054F2F $8F1F: C-----  00       BRK  
  0x054F30 $8F20: C-----  A8       TAY  
  0x054F31 $8F21: C-----  38       SEC  
  0x054F32 $8F22: C-----  30 D0    BMI  $8EF4
  0x054F34 $8F24: C-----  C0 80    CPY  #$80
  0x054F36 $8F26: C-----  00       BRK  
  0x054F37 $8F27: C-----  00       BRK  
  0x054F38 $8F28: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x054F39 $8F29: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x054F3A $8F2A: C-----  3E 3D 34 ROL  $343D,X
  0x054F3D $8F2D: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x054F3E $8F2E: C-----  41 40    EOR  ($40,X)
  0x054F40 $8F30: C-----  00       BRK  
  0x054F41 $8F31: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x054F42 $8F32: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x054F43 $8F33: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x054F44 $8F34: C-----  1D 1D 1D ORA  $1D1D,X
  0x054F47 $8F37: C-----  1E 00 80 ASL  $8000,X
  0x054F4A $8F3A: C-----  40       RTI  
  0x054F4B $8F3B: C-----  00       BRK  
  0x054F4C $8F3C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054F4D $8F3D: C-----  00       BRK  
  0x054F4E $8F3E: C-----  00       BRK  
  0x054F4F $8F3F: C-----  00       BRK  
  0x054F50 $8F40: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x054F51 $8F41: C-----  AD D9 FA LDA  $FAD9
  0x054F54 $8F44: C-----  F8       SED  
  0x054F55 $8F45: C-----  F0 C0    BEQ  $8F07
  0x054F57 $8F47: C-----  00       BRK  
  0x054F58 $8F48: C-----  28       PLP  
  0x054F59 $8F49: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x054F5A $8F4A: C-----  26 04    ROL  $04
  0x054F5C $8F4C: C-----  00       BRK  
  0x054F5D $8F4D: C-----  00       BRK  
  0x054F5E $8F4E: C-----  00       BRK  
  0x054F5F $8F4F: C-----  00       BRK  
  0x054F60 $8F50: C-----  E0 C0    CPX  #$C0
  0x054F62 $8F52: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054F63 $8F53: C-----  00       BRK  
  0x054F64 $8F54: C-----  00       BRK  
  0x054F65 $8F55: C-----  00       BRK  
  0x054F66 $8F56: C-----  00       BRK  
  0x054F67 $8F57: C-----  00       BRK  
  0x054F68 $8F58: C-----  00       BRK  
  0x054F69 $8F59: C-----  00       BRK  
  0x054F6A $8F5A: C-----  00       BRK  
  0x054F6B $8F5B: C-----  00       BRK  
  0x054F6C $8F5C: C-----  00       BRK  
  0x054F6D $8F5D: C-----  00       BRK  
  0x054F6E $8F5E: C-----  00       BRK  
  0x054F6F $8F5F: C-----  00       BRK  
  0x054F70 $8F60: C-----  00       BRK  
  0x054F71 $8F61: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F72 $8F62: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F73 $8F63: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F74 $8F64: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x054F75 $8F65: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x054F76 $8F66: C-----  00       BRK  
  0x054F77 $8F67: C-----  00       BRK  
  0x054F78 $8F68: C-----  00       BRK  
  0x054F79 $8F69: C-----  00       BRK  
  0x054F7A $8F6A: C-----  00       BRK  
  0x054F7B $8F6B: C-----  00       BRK  
  0x054F7C $8F6C: C-----  00       BRK  
  0x054F7D $8F6D: C-----  00       BRK  
  0x054F7E $8F6E: C-----  00       BRK  
  0x054F7F $8F6F: C-----  00       BRK  
  0x054F80 $8F70: C-----  00       BRK  
  0x054F81 $8F71: C-----  00       BRK  
  0x054F82 $8F72: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F83 $8F73: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F84 $8F74: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F85 $8F75: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F86 $8F76: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054F87 $8F77: C-----  01 00    ORA  ($00,X)
  0x054F89 $8F79: C-----  00       BRK  
  0x054F8A $8F7A: C-----  00       BRK  
  0x054F8B $8F7B: C-----  00       BRK  
  0x054F8C $8F7C: C-----  00       BRK  
  0x054F8D $8F7D: C-----  00       BRK  
  0x054F8E $8F7E: C-----  00       BRK  
  0x054F8F $8F7F: C-----  00       BRK  
  0x054F90 $8F80: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054F91 $8F81: C-----  00       BRK  
  0x054F92 $8F82: C-----  00       BRK  
  0x054F93 $8F83: C-----  01 02    ORA  ($02,X)
  0x054F95 $8F85: C-----  00       BRK  
  0x054F96 $8F86: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054F97 $8F87: C-----  00       BRK  
  0x054F98 $8F88: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054F99 $8F89: C-----  00       BRK  
  0x054F9A $8F8A: C-----  00       BRK  
  0x054F9B $8F8B: C-----  01 83    ORA  ($83,X)
  0x054F9D $8F8D: C-----  00       BRK  
  0x054F9E $8F8E: C-----  00       BRK  
  0x054F9F $8F8F: C-----  00       BRK  
  0x054FA0 $8F90: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x054FA1 $8F91: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x054FA2 $8F92: C-----  48       PHA  
  0x054FA3 $8F93: C-----  00       BRK  
  0x054FA4 $8F94: C-----  00       BRK  
  0x054FA5 $8F95: C-----  00       BRK  
  0x054FA6 $8F96: C-----  00       BRK  
  0x054FA7 $8F97: C-----  00       BRK  
  0x054FA8 $8F98: C-----  00       BRK  
  0x054FA9 $8F99: C-----  00       BRK  
  0x054FAA $8F9A: C-----  40       RTI  
  0x054FAB $8F9B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x054FAC $8F9C: C-----  00       BRK  
  0x054FAD $8F9D: C-----  00       BRK  
  0x054FAE $8F9E: C-----  00       BRK  
  0x054FAF $8F9F: C-----  00       BRK  
  0x054FB0 $8FA0: C-----  70 78    BVS  $901A
  0x054FB2 $8FA2: C-----  78       SEI  
  0x054FB3 $8FA3: C-----  78       SEI  
  0x054FB4 $8FA4: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x054FB5 $8FA5: C-----  30 10    BMI  $8FB7
  0x054FB7 $8FA7: C-----  10 30    BPL  $8FD9
  0x054FB9 $8FA9: C-----  18       CLC  
  0x054FBA $8FAA: C-----  18       CLC  
  0x054FBB $8FAB: C-----  18       CLC  
  0x054FBC $8FAC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x054FBD $8FAD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x054FBE $8FAE: C-----  00       BRK  
  0x054FBF $8FAF: C-----  00       BRK  
  0x054FC0 $8FB0: C-----  00       BRK  
  0x054FC1 $8FB1: C-----  00       BRK  
  0x054FC2 $8FB2: C-----  00       BRK  
  0x054FC3 $8FB3: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x054FC4 $8FB4: C-----  E0 00    CPX  #$00
  0x054FC6 $8FB6: C-----  00       BRK  
  0x054FC7 $8FB7: C-----  18       CLC  
  0x054FC8 $8FB8: C-----  00       BRK  
  0x054FC9 $8FB9: C-----  00       BRK  
  0x054FCA $8FBA: C-----  00       BRK  
  0x054FCB $8FBB: C-----  7E FA C0 ROR  $C0FA,X
  0x054FCE $8FBE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x054FCF $8FBF: C-----  24 00    BIT  $00
  0x054FD1 $8FC1: C-----  00       BRK  
  0x054FD2 $8FC2: C-----  00       BRK  
  0x054FD3 $8FC3: C-----  00       BRK  
  0x054FD4 $8FC4: C-----  08       PHP  
  0x054FD5 $8FC5: C-----  00       BRK  
  0x054FD6 $8FC6: C-----  00       BRK  
  0x054FD7 $8FC7: C-----  10 00    BPL  $8FC9
  0x054FD9 $8FC9: C-----  00       BRK  
  0x054FDA $8FCA: C-----  00       BRK  
  0x054FDB $8FCB: C-----  00       BRK  
  0x054FDC $8FCC: C-----  00       BRK  
  0x054FDD $8FCD: C-----  00       BRK  
  0x054FDE $8FCE: C-----  00       BRK  
  0x054FDF $8FCF: C-----  00       BRK  
  0x054FE0 $8FD0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054FE1 $8FD1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054FE2 $8FD2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x054FE3 $8FD3: C-----  08       PHP  
  0x054FE4 $8FD4: C-----  00       BRK  
  0x054FE5 $8FD5: C-----  00       BRK  
  0x054FE6 $8FD6: C-----  00       BRK  
  0x054FE7 $8FD7: C-----  00       BRK  
  0x054FE8 $8FD8: C-----  00       BRK  
  0x054FE9 $8FD9: C-----  00       BRK  
  0x054FEA $8FDA: C-----  00       BRK  
  0x054FEB $8FDB: C-----  00       BRK  
  0x054FEC $8FDC: C-----  00       BRK  
  0x054FED $8FDD: C-----  00       BRK  
  0x054FEE $8FDE: C-----  00       BRK  
  0x054FEF $8FDF: C-----  00       BRK  
  0x054FF0 $8FE0: C-----  00       BRK  
  0x054FF1 $8FE1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054FF2 $8FE2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x054FF3 $8FE3: C-----  00       BRK  
  0x054FF4 $8FE4: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x054FF5 $8FE5: C-----  00       BRK  
  0x054FF6 $8FE6: C-----  00       BRK  
  0x054FF7 $8FE7: C-----  00       BRK  
  0x054FF8 $8FE8: C-----  00       BRK  
  0x054FF9 $8FE9: C-----  00       BRK  
  0x054FFA $8FEA: C-----  00       BRK  
  0x054FFB $8FEB: C-----  00       BRK  
  0x054FFC $8FEC: C-----  00       BRK  
  0x054FFD $8FED: C-----  00       BRK  
  0x054FFE $8FEE: C-----  00       BRK  
  0x054FFF $8FEF: C-----  00       BRK  
  0x055000 $8FF0: C-----  00       BRK  
  0x055001 $8FF1: C-----  00       BRK  
  0x055002 $8FF2: C-----  00       BRK  
  0x055003 $8FF3: C-----  00       BRK  
  0x055004 $8FF4: C-----  60       RTS  
  0x055005 $8FF5: C-----  00       BRK  
  0x055006 $8FF6: C-----  00       BRK  
  0x055007 $8FF7: C-----  00       BRK  
  0x055008 $8FF8: C-----  00       BRK  
  0x055009 $8FF9: C-----  00       BRK  
  0x05500A $8FFA: C-----  00       BRK  
  0x05500B $8FFB: C-----  00       BRK  
  0x05500C $8FFC: C-----  00       BRK  
  0x05500D $8FFD: C-----  00       BRK  
  0x05500E $8FFE: C-----  00       BRK  
  0x05500F $8FFF: C-----  00       BRK  
  0x055010 $9000: C-----  00       BRK  
  0x055011 $9001: C-----  00       BRK  
  0x055012 $9002: C-----  00       BRK  
  0x055013 $9003: C-----  00       BRK  
  0x055014 $9004: C-----  00       BRK  
  0x055015 $9005: C-----  00       BRK  
  0x055016 $9006: C-----  00       BRK  
  0x055017 $9007: C-----  00       BRK  
  0x055018 $9008: C-----  00       BRK  
  0x055019 $9009: C-----  00       BRK  
  0x05501A $900A: C-----  00       BRK  
  0x05501B $900B: C-----  00       BRK  
  0x05501C $900C: C-----  00       BRK  
  0x05501D $900D: C-----  00       BRK  
  0x05501E $900E: C-----  00       BRK  
  0x05501F $900F: C-----  00       BRK  
  0x055020 $9010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055021 $9011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055022 $9012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055023 $9013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055024 $9014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055025 $9015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055026 $9016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055027 $9017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055028 $9018: C-----  00       BRK  
  0x055029 $9019: C-----  00       BRK  
  0x05502A $901A: C-----  00       BRK  
  0x05502B $901B: C-----  00       BRK  
  0x05502C $901C: C-----  00       BRK  
  0x05502D $901D: C-----  00       BRK  
  0x05502E $901E: C-----  00       BRK  
  0x05502F $901F: C-----  00       BRK  
  0x055030 $9020: C-----  88       DEY  
  0x055031 $9021: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055032 $9022: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055033 $9023: C-----  88       DEY  
  0x055034 $9024: C-----  88       DEY  
  0x055035 $9025: C-----  88       DEY  
  0x055036 $9026: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x055037 $9027: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x055038 $9028: C-----  88       DEY  
  0x055039 $9029: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05503A $902A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05503B $902B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05503C $902C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05503D $902D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05503E $902E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05503F $902F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055040 $9030: C-----  10 FF    BPL  $9031
  0x055042 $9032: C-----  10 10    BPL  $9044
  0x055044 $9034: C-----  21 FF    AND  ($FF,X)
  0x055046 $9036: C-----  21 21    AND  ($21,X)
  0x055048 $9038: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055049 $9039: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05504A $903A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05504B $903B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05504C $903C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05504D $903D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05504E $903E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05504F $903F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055050 $9040: C-----  48       PHA  
  0x055051 $9041: C-----  95 58    STA  $58,X
  0x055053 $9043: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x055054 $9044: C-----  06 AC    ASL  $AC
  0x055056 $9046: C-----  E8       INX  
  0x055057 $9047: C-----  FE 00 00 INC  $0000,X
  0x05505A $904A: C-----  84 51    STY  $51
  0x05505C $904C: C-----  96 68    STX  $68,Y
  0x05505E $904E: C-----  C5 F9    CMP  $F9
  0x055060 $9050: C-----  49 9D    EOR  #$9D
  0x055062 $9052: C-----  D8       CLD  
  0x055063 $9053: C-----  FE 17 BC INC  $BC17,X
  0x055066 $9056: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055067 $9057: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055068 $9058: C-----  09 08    ORA  #$08
  0x05506A $905A: C-----  CC 7F 97 CPY  $977F
  0x05506D $905D: C-----  78       SEI  
  0x05506E $905E: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05506F $905F: C-----  3E FF FF ROL  $FFFF,X
  0x055072 $9062: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055073 $9063: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055074 $9064: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055075 $9065: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055076 $9066: C-----  00       BRK  
  0x055077 $9067: C-----  00       BRK  
  0x055078 $9068: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055079 $9069: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05507A $906A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05507B $906B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05507C $906C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05507D $906D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05507E $906E: C-----  00       BRK  
  0x05507F $906F: C-----  00       BRK  
  0x055080 $9070: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x055081 $9071: C-----  D5 FC    CMP  $FC,X
  0x055083 $9073: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055084 $9074: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055085 $9075: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055086 $9076: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055087 $9077: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055088 $9078: C-----  0D E0 FC ORA  $FCE0
  0x05508B $907B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05508C $907C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05508D $907D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05508E $907E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05508F $907F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055090 $9080: C-----  84 FF    STY  $FF
  0x055092 $9082: C-----  84 84    STY  $84
  0x055094 $9084: C-----  08       PHP  
  0x055095 $9085: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055096 $9086: C-----  08       PHP  
  0x055097 $9087: C-----  08       PHP  
  0x055098 $9088: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055099 $9089: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05509A $908A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05509B $908B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05509C $908C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05509D $908D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05509E $908E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05509F $908F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550A0 $9090: C-----  21 FF    AND  ($FF,X)
  0x0550A2 $9092: C-----  21 21    AND  ($21,X)
  0x0550A4 $9094: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0550A5 $9095: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550A6 $9096: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0550A7 $9097: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0550A8 $9098: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550A9 $9099: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550AA $909A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550AB $909B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550AC $909C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550AD $909D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550AE $909E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550AF $909F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550B0 $90A0: C-----  08       PHP  
  0x0550B1 $90A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550B2 $90A2: C-----  08       PHP  
  0x0550B3 $90A3: C-----  08       PHP  
  0x0550B4 $90A4: C-----  10 FF    BPL  $90A5
  0x0550B6 $90A6: C-----  10 10    BPL  $90B8
  0x0550B8 $90A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550B9 $90A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550BA $90AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550BB $90AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550BC $90AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550BD $90AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550BE $90AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550BF $90AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0550C0 $90B0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0550C1 $90B1: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0550C2 $90B2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0550C3 $90B3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0550C4 $90B4: C-----  08       PHP  
  0x0550C5 $90B5: C-----  E8       INX  
  0x0550C6 $90B6: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0550C7 $90B7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0550C8 $90B8: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0550C9 $90B9: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0550CA $90BA: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0550CB $90BB: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0550CC $90BC: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0550CD $90BD: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0550CE $90BE: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0550CF $90BF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0550D0 $90C0: C-----  00       BRK  
  0x0550D1 $90C1: C-----  10 F8    BPL  $90BB
  0x0550D3 $90C3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0550D4 $90C4: C-----  F6 AF    INC  $AF,X
  0x0550D6 $90C6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0550D7 $90C7: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0550D8 $90C8: C-----  00       BRK  
  0x0550D9 $90C9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0550DA $90CA: C-----  F1 DF    SBC  ($DF),Y
  0x0550DC $90CC: C-----  FE 6F F4 INC  $F46F,X
  0x0550DF $90CF: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0550E0 $90D0: C-----  00       BRK  
  0x0550E1 $90D1: C-----  00       BRK  
  0x0550E2 $90D2: C-----  00       BRK  
  0x0550E3 $90D3: C-----  E0 F6    CPX  #$F6
  0x0550E5 $90D5: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0550E6 $90D6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0550E7 $90D7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0550E8 $90D8: C-----  00       BRK  
  0x0550E9 $90D9: C-----  00       BRK  
  0x0550EA $90DA: C-----  00       BRK  
  0x0550EB $90DB: C-----  40       RTI  
  0x0550EC $90DC: C-----  F6 6F    INC  $6F,X
  0x0550EE $90DE: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0550EF $90DF: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0550F0 $90E0: C-----  F8       SED  
  0x0550F1 $90E1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0550F2 $90E2: C-----  F8       SED  
  0x0550F3 $90E3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0550F4 $90E4: C-----  F6 0F    INC  $0F,X
  0x0550F6 $90E6: C-----  20 D1 F0 JSR  $F0D1
  0x0550F9 $90E9: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0550FA $90EA: C-----  F1 DF    SBC  ($DF),Y
  0x0550FC $90EC: C-----  FE 0F C0 INC  $C00F,X
  0x0550FF $90EF: C-----  39 F0 3F AND  $3FF0,Y
  0x055102 $90F2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x055103 $90F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055104 $90F4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055105 $90F5: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055106 $90F6: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055107 $90F7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055108 $90F8: C-----  F1 6F    SBC  ($6F),Y
  0x05510A $90FA: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05510B $90FB: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05510C $90FC: C-----  F0 4F    BEQ  $914D
  0x05510E $90FE: C-----  F9 DF FA SBC  $FADF,Y
  0x055111 $9101: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x055112 $9102: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x055113 $9103: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x055114 $9104: C-----  F6 AF    INC  $AF,X
  0x055116 $9106: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x055117 $9107: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x055118 $9108: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x055119 $9109: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x05511A $910A: C-----  C6 53    DEC  $53
  0x05511C $910C: C-----  F6 EF    INC  $EF,X
  0x05511E $910E: C-----  C4 AE    CPY  $AE
  0x055120 $9110: C-----  58       CLI  
  0x055121 $9111: C-----  95 7C    STA  $7C,X
  0x055123 $9113: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055124 $9114: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x055125 $9115: C-----  AD 7F 23 LDA  $237F
  0x055128 $9118: C-----  10 90    BPL  $90AA
  0x05512A $911A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05512B $911B: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x05512C $911C: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05512D $911D: C-----  E9 FD    SBC  #$FD
  0x05512F $911F: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x055130 $9120: C-----  65 FE    ADC  $FE
  0x055132 $9122: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x055133 $9123: C-----  84 F9    STY  $F9
  0x055135 $9125: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055136 $9126: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055137 $9127: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055138 $9128: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x055139 $9129: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x05513A $912A: C-----  21 9A    AND  ($9A,X)
  0x05513C $912C: C-----  F8       SED  
  0x05513D $912D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05513E $912E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05513F $912F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055140 $9130: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x055141 $9131: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x055142 $9132: C-----  BC 67 08 LDY  $0867,X
  0x055145 $9135: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x055146 $9136: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x055147 $9137: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055148 $9138: C-----  28       PLP  
  0x055149 $9139: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x05514A $913A: C-----  B4 18    LDY  $18,X
  0x05514C $913C: C-----  40       RTI  
  0x05514D $913D: C-----  8D F0 FF STA  $FFF0
  0x055150 $9140: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x055151 $9141: C-----  95 DC    STA  $DC,X
  0x055153 $9143: C-----  FE 1F AC INC  $AC1F,X
  0x055156 $9146: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x055157 $9147: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055158 $9148: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x055159 $9149: C-----  84 84    STY  $84
  0x05515B $914B: C-----  F5 9F    SBC  $9F,X
  0x05515D $914D: C-----  68       PLA  
  0x05515E $914E: C-----  CC EA 69 CPY  $69EA
  0x055161 $9151: C-----  FD 7F FB SBC  $FB7F,X
  0x055164 $9154: C-----  46 FE    LSR  $FE
  0x055166 $9156: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x055167 $9157: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x055168 $9158: C-----  21 F9    AND  ($F9,X)
  0x05516A $915A: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05516B $915B: C-----  71 D6    ADC  ($D6),Y
  0x05516D $915D: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05516E $915E: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05516F $915F: C-----  6A       ROR  A
  0x055170 $9160: ------  .byte $CD
  0x055171 $9161: ------  .byte $95
  0x055172 $9162: ------  .byte $DC
  0x055173 $9163: ------  .byte $FE
  0x055174 $9164: ------  .byte $0F
  0x055175 $9165: ------  .byte $AC
  0x055176 $9166: ------  .byte $EB
  0x055177 $9167: ------  .byte $3F
  0x055178 $9168: ------  .byte $85
  0x055179 $9169: ------  .byte $84
  0x05517A $916A: ------  .byte $C4
  0x05517B $916B: ------  .byte $FF
  0x05517C $916C: ------  .byte $9F
  0x05517D $916D: ------  .byte $68
  0x05517E $916E: ------  .byte $CC
  0x05517F $916F: ------  .byte $3E
  0x055180 $9170: ------  .byte $58
  0x055181 $9171: ------  .byte $FD
  0x055182 $9172: ------  .byte $5F
  0x055183 $9173: ------  .byte $FA
  0x055184 $9174: ------  .byte $27
  0x055185 $9175: ------  .byte $FD
  0x055186 $9176: ------  .byte $2F
  0x055187 $9177: ------  .byte $21
  0x055188 $9178: ------  .byte $10
  0x055189 $9179: ------  .byte $F8
  0x05518A $917A: ------  .byte $97
  0x05518B $917B: ------  .byte $51
  0x05518C $917C: ------  .byte $B7
  0x05518D $917D: ------  .byte $F9
  0x05518E $917E: ------  .byte $E7
  0x05518F $917F: ------  .byte $2B
  0x055190 $9180: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055191 $9181: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055192 $9182: C-----  00       BRK  
  0x055193 $9183: C-----  00       BRK  
  0x055194 $9184: C-----  00       BRK  
  0x055195 $9185: C-----  A0 FA    LDY  #$FA
  0x055197 $9187: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055198 $9188: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055199 $9189: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05519A $918A: C-----  00       BRK  
  0x05519B $918B: C-----  00       BRK  
  0x05519C $918C: C-----  00       BRK  
  0x05519D $918D: C-----  60       RTS  
  0x05519E $918E: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05519F $918F: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0551A0 $9190: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551A1 $9191: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551A2 $9192: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551A3 $9193: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551A4 $9194: C-----  00       BRK  
  0x0551A5 $9195: C-----  00       BRK  
  0x0551A6 $9196: C-----  00       BRK  
  0x0551A7 $9197: C-----  00       BRK  
  0x0551A8 $9198: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551A9 $9199: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551AA $919A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551AB $919B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551AC $919C: C-----  00       BRK  
  0x0551AD $919D: C-----  00       BRK  
  0x0551AE $919E: C-----  00       BRK  
  0x0551AF $919F: C-----  20 FF FF JSR  $FFFF
  0x0551B2 $91A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551B3 $91A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0551B4 $91A4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551B5 $91A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551B6 $91A6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551B7 $91A7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551B8 $91A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551B9 $91A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551BA $91AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551BB $91AB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0551BC $91AC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551BD $91AD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551BE $91AE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551BF $91AF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551C0 $91B0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551C1 $91B1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551C2 $91B2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551C3 $91B3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551C4 $91B4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551C5 $91B5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551C6 $91B6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551C7 $91B7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0551C8 $91B8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551C9 $91B9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551CA $91BA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551CB $91BB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551CC $91BC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551CD $91BD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551CE $91BE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551CF $91BF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0551D0 $91C0: C-----  F8       SED  
  0x0551D1 $91C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551D2 $91C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551D3 $91C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551D4 $91C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551D5 $91C5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0551D6 $91C6: C-----  01 00    ORA  ($00,X)
  0x0551D8 $91C8: C-----  F0 FF    BEQ  $91C9
  0x0551DA $91CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551DB $91CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551DC $91CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551DD $91CD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0551DE $91CE: C-----  01 00    ORA  ($00,X)
  0x0551E0 $91D0: C-----  48       PHA  
  0x0551E1 $91D1: C-----  95 F8    STA  $F8,X
  0x0551E3 $91D3: C-----  FE FF FF INC  $FFFF,X
  0x0551E6 $91D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551E7 $91D7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0551E8 $91D8: C-----  00       BRK  
  0x0551E9 $91D9: C-----  00       BRK  
  0x0551EA $91DA: C-----  E4 FF    CPX  $FF
  0x0551EC $91DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551ED $91DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551EE $91DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551EF $91DF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0551F0 $91E0: C-----  00       BRK  
  0x0551F1 $91E1: C-----  30 FC    BMI  $91DF
  0x0551F3 $91E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0551F4 $91E4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0551F5 $91E5: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0551F6 $91E6: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0551F7 $91E7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0551F8 $91E8: C-----  00       BRK  
  0x0551F9 $91E9: C-----  60       RTS  
  0x0551FA $91EA: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x0551FB $91EB: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0551FC $91EC: C-----  F0 6F    BEQ  $925D
  0x0551FE $91EE: C-----  F9 0F 03 SBC  $030F,Y
  0x055201 $91F1: C-----  00       BRK  
  0x055202 $91F2: C-----  00       BRK  
  0x055203 $91F3: C-----  F0 F7    BEQ  $91EC
  0x055205 $91F5: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x055206 $91F6: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055207 $91F7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055208 $91F8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055209 $91F9: C-----  00       BRK  
  0x05520A $91FA: C-----  00       BRK  
  0x05520B $91FB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05520C $91FC: C-----  F0 6F    BEQ  $926D
  0x05520E $91FE: C-----  F9 0F 88 SBC  $880F,Y
  0x055211 $9201: C-----  88       DEY  
  0x055212 $9202: C-----  E8       INX  
  0x055213 $9203: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x055214 $9204: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x055215 $9205: C-----  88       DEY  
  0x055216 $9206: C-----  88       DEY  
  0x055217 $9207: C-----  E8       INX  
  0x055218 $9208: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055219 $9209: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05521A $920A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05521B $920B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05521C $920C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05521D $920D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05521E $920E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05521F $920F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055220 $9210: C-----  F8       SED  
  0x055221 $9211: C-----  8E 89 88 STX  $8889
  0x055224 $9214: C-----  88       DEY  
  0x055225 $9215: C-----  F8       SED  
  0x055226 $9216: C-----  8E 89 FF STX  $FF89
  0x055229 $9219: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05522A $921A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05522B $921B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05522C $921C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05522D $921D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05522E $921E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05522F $921F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055230 $9220: C-----  88       DEY  
  0x055231 $9221: C-----  88       DEY  
  0x055232 $9222: C-----  C8       INY  
  0x055233 $9223: C-----  B8       CLV  
  0x055234 $9224: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x055235 $9225: C-----  88       DEY  
  0x055236 $9226: C-----  88       DEY  
  0x055237 $9227: C-----  C8       INY  
  0x055238 $9228: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055239 $9229: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05523A $922A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05523B $922B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05523C $922C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05523D $922D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05523E $922E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05523F $922F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055240 $9230: C-----  C8       INY  
  0x055241 $9231: C-----  B8       CLV  
  0x055242 $9232: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x055243 $9233: C-----  88       DEY  
  0x055244 $9234: C-----  88       DEY  
  0x055245 $9235: C-----  C8       INY  
  0x055246 $9236: C-----  B8       CLV  
  0x055247 $9237: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x055248 $9238: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055249 $9239: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05524A $923A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05524B $923B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05524C $923C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05524D $923D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05524E $923E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05524F $923F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055250 $9240: C-----  59 95 D8 EOR  $D895,Y
  0x055253 $9243: C-----  FE 27 AD INC  $AD27,X
  0x055256 $9246: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055257 $9247: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055258 $9248: C-----  11 10    ORA  ($10),Y
  0x05525A $924A: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05525B $924B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05525C $924C: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05525D $924D: C-----  69 E5    ADC  #$E5
  0x05525F $924F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055260 $9250: C-----  D0 9A    BNE  $91EC
  0x055262 $9252: C-----  88       DEY  
  0x055263 $9253: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x055264 $9254: C-----  D6 FF    DEC  $FF,X
  0x055266 $9256: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x055267 $9257: C-----  D1 F0    CMP  ($F0),Y
  0x055269 $9259: C-----  8D 99 99 STA  $9999
  0x05526C $925C: C-----  DE 3F D4 DEC  $D43F,X
  0x05526F $925F: C-----  38       SEC  
  0x055270 $9260: C-----  88       DEY  
  0x055271 $9261: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055272 $9262: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055273 $9263: C-----  B8       CLV  
  0x055274 $9264: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x055275 $9265: C-----  88       DEY  
  0x055276 $9266: C-----  88       DEY  
  0x055277 $9267: C-----  C8       INY  
  0x055278 $9268: C-----  88       DEY  
  0x055279 $9269: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05527A $926A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05527B $926B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05527C $926C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05527D $926D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05527E $926E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05527F $926F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055280 $9270: C-----  21 FF    AND  ($FF,X)
  0x055282 $9272: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055283 $9273: C-----  21 42    AND  ($42,X)
  0x055285 $9275: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055286 $9276: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x055287 $9277: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x055288 $9278: C-----  21 FF    AND  ($FF,X)
  0x05528A $927A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05528B $927B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05528C $927C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05528D $927D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05528E $927E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05528F $927F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055290 $9280: C-----  18       CLC  
  0x055291 $9281: C-----  D8       CLD  
  0x055292 $9282: C-----  18       CLC  
  0x055293 $9283: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x055294 $9284: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x055295 $9285: C-----  A8       TAY  
  0x055296 $9286: C-----  28       PLP  
  0x055297 $9287: C-----  28       PLP  
  0x055298 $9288: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x055299 $9289: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05529A $928A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05529B $928B: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05529C $928C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05529D $928D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05529E $928E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05529F $928F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0552A0 $9290: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552A1 $9291: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552A2 $9292: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552A3 $9293: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552A4 $9294: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552A5 $9295: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552A6 $9296: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552A7 $9297: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552A8 $9298: C-----  B8       CLV  
  0x0552A9 $9299: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0552AA $929A: C-----  88       DEY  
  0x0552AB $929B: C-----  88       DEY  
  0x0552AC $929C: C-----  C8       INY  
  0x0552AD $929D: C-----  B8       CLV  
  0x0552AE $929E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0552AF $929F: C-----  88       DEY  
  0x0552B0 $92A0: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0552B1 $92A1: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x0552B2 $92A2: C-----  48       PHA  
  0x0552B3 $92A3: C-----  48       PHA  
  0x0552B4 $92A4: C-----  E8       INX  
  0x0552B5 $92A5: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0552B6 $92A6: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0552B7 $92A7: C-----  08       PHP  
  0x0552B8 $92A8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0552B9 $92A9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0552BA $92AA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0552BB $92AB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0552BC $92AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552BD $92AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552BE $92AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552BF $92AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552C0 $92B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552C1 $92B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552C2 $92B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552C3 $92B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552C4 $92B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552C5 $92B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552C6 $92B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552C7 $92B7: C-----  00       BRK  
  0x0552C8 $92B8: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0552C9 $92B9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0552CA $92BA: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0552CB $92BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552CC $92BC: C-----  84 84    STY  $84
  0x0552CE $92BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552CF $92BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552D0 $92C0: C-----  11 10    ORA  ($10),Y
  0x0552D2 $92C2: C-----  D0 3E    BNE  $9302
  0x0552D4 $92C4: C-----  21 21    AND  ($21,X)
  0x0552D6 $92C6: C-----  E1 3F    SBC  ($3F,X)
  0x0552D8 $92C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552D9 $92C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552DA $92CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552DB $92CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552DC $92CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552DD $92CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552DE $92CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552DF $92CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552E0 $92D0: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0552E1 $92D1: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0552E2 $92D2: C-----  84 84    STY  $84
  0x0552E4 $92D4: C-----  F8       SED  
  0x0552E5 $92D5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0552E6 $92D6: C-----  08       PHP  
  0x0552E7 $92D7: C-----  08       PHP  
  0x0552E8 $92D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552E9 $92D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552EA $92DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552EB $92DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552EC $92DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552ED $92DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552EE $92DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552EF $92DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0552F0 $92E0: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0552F1 $92E1: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0552F2 $92E2: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x0552F3 $92E3: C-----  7E 85 84 ROR  $8485,X
  0x0552F6 $92E6: C-----  C4 BE    CPY  $BE
  0x0552F8 $92E8: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0552F9 $92E9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0552FA $92EA: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x0552FB $92EB: C-----  7E 85 84 ROR  $8485,X
  0x0552FE $92EE: C-----  C4 BE    CPY  $BE
  0x055300 $92F0: C-----  F0 1F    BEQ  $9311
  0x055302 $92F2: C-----  10 10    BPL  $9304
  0x055304 $92F4: C-----  F1 2F    SBC  ($2F),Y
  0x055306 $92F6: C-----  21 21    AND  ($21,X)
  0x055308 $92F8: C-----  F0 1F    BEQ  $9319
  0x05530A $92FA: C-----  10 10    BPL  $930C
  0x05530C $92FC: C-----  F1 2F    SBC  ($2F),Y
  0x05530E $92FE: C-----  21 21    AND  ($21,X)
  0x055310 $9300: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x055311 $9301: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055312 $9302: C-----  4C F2 97 JMP  $97F2
  0x055315 $9305: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x055316 $9306: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055317 $9307: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x055318 $9308: C-----  FD 03 D0 SBC  $D003,X
  0x05531B $930B: C-----  CA       DEX  
  0x05531C $930C: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05531D $930D: C-----  E5 FD    SBC  $FD
  0x05531F $930F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x055320 $9310: C-----  F8       SED  
  0x055321 $9311: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x055322 $9312: C-----  3E 41 16 ROL  $1641,X
  0x055325 $9315: C-----  95 2B    STA  $2B,X
  0x055327 $9317: C-----  F5 F0    SBC  $F0,X
  0x055329 $9319: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05532A $931A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05532B $931B: C-----  C1 BE    CMP  ($BE,X)
  0x05532D $931D: C-----  59 F5 FA EOR  $FAF5,Y
  0x055330 $9320: C-----  84 FF    STY  $FF
  0x055332 $9322: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055333 $9323: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x055334 $9324: C-----  09 08    ORA  #$08
  0x055336 $9326: C-----  C8       INY  
  0x055337 $9327: C-----  3E 84 FF ROL  $FF84,X
  0x05533A $932A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05533B $932B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05533C $932C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05533D $932D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05533E $932E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05533F $932F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055340 $9330: C-----  21 FF    AND  ($FF,X)
  0x055342 $9332: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055343 $9333: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x055344 $9334: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x055345 $9335: C-----  84 84    STY  $84
  0x055347 $9337: C-----  E4 21    CPX  $21
  0x055349 $9339: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05534A $933A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05534B $933B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05534C $933C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05534D $933D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05534E $933E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05534F $933F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055350 $9340: C-----  F0 3F    BEQ  $9381
  0x055352 $9342: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x055353 $9343: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055354 $9344: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055355 $9345: C-----  C0 9F    CPY  #$9F
  0x055357 $9347: C-----  99 F1 6F STA  $6FF1,Y
  0x05535A $934A: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05535B $934B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05535C $934C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05535D $934D: C-----  60       RTS  
  0x05535E $934E: C-----  A5 88    LDA  $88
  0x055360 $9350: C-----  F8       SED  
  0x055361 $9351: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055362 $9352: C-----  F8       SED  
  0x055363 $9353: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055364 $9354: C-----  F6 FF    INC  $FF,X
  0x055366 $9356: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055367 $9357: C-----  C8       INY  
  0x055368 $9358: C-----  F0 8F    BEQ  $92E9
  0x05536A $935A: C-----  F1 DF    SBC  ($DF),Y
  0x05536C $935C: C-----  FE FF 07 INC  $07FF,X
  0x05536F $935F: C-----  28       PLP  
  0x055370 $9360: C-----  08       PHP  
  0x055371 $9361: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055372 $9362: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055373 $9363: C-----  10 21    BPL  $9386
  0x055375 $9365: C-----  F9 27 21 SBC  $2127,Y
  0x055378 $9368: C-----  08       PHP  
  0x055379 $9369: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05537A $936A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05537B $936B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05537C $936C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05537D $936D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05537E $936E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05537F $936F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055380 $9370: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055381 $9371: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055382 $9372: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055383 $9373: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055384 $9374: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055385 $9375: C-----  C0 3F    CPY  #$3F
  0x055387 $9377: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055388 $9378: C-----  10 10    BPL  $938A
  0x05538A $937A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05538B $937B: C-----  20 3F FF JSR  $FF3F
  0x05538E $937E: C-----  C0 00    CPY  #$00
  0x055390 $9380: C-----  21 A1    AND  ($A1,X)
  0x055392 $9382: C-----  7D 23 42 ADC  $4223,X
  0x055395 $9385: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x055396 $9386: C-----  7E 43 FF ROR  $FF43,X
  0x055399 $9389: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05539A $938A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05539B $938B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05539C $938C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05539D $938D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05539E $938E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05539F $938F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553A0 $9390: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0553A1 $9391: C-----  08       PHP  
  0x0553A2 $9392: C-----  08       PHP  
  0x0553A3 $9393: C-----  E8       INX  
  0x0553A4 $9394: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0553A5 $9395: C-----  10 10    BPL  $93A7
  0x0553A7 $9397: C-----  F0 FF    BEQ  $9398
  0x0553A9 $9399: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553AA $939A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553AB $939B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553AC $939C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553AD $939D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553AE $939E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553AF $939F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553B0 $93A0: C-----  84 84    STY  $84
  0x0553B2 $93A2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0553B3 $93A3: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0553B4 $93A4: C-----  08       PHP  
  0x0553B5 $93A5: C-----  88       DEY  
  0x0553B6 $93A6: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0553B7 $93A7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0553B8 $93A8: C-----  84 84    STY  $84
  0x0553BA $93AA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0553BB $93AB: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0553BC $93AC: C-----  08       PHP  
  0x0553BD $93AD: C-----  88       DEY  
  0x0553BE $93AE: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0553BF $93AF: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0553C0 $93B0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0553C1 $93B1: C-----  21 21    AND  ($21,X)
  0x0553C3 $93B3: C-----  E1 5F    SBC  ($5F,X)
  0x0553C5 $93B5: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0553C6 $93B6: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0553C7 $93B7: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0553C8 $93B8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0553C9 $93B9: C-----  21 21    AND  ($21,X)
  0x0553CB $93BB: C-----  E1 5F    SBC  ($5F,X)
  0x0553CD $93BD: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0553CE $93BE: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0553CF $93BF: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0553D0 $93C0: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0553D1 $93C1: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0553D2 $93C2: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0553D3 $93C3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0553D4 $93C4: C-----  84 FC    STY  $FC
  0x0553D6 $93C6: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0553D7 $93C7: C-----  84 FF    STY  $FF
  0x0553D9 $93C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553DA $93CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553DB $93CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553DC $93CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553DD $93CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553DE $93CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553DF $93CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553E0 $93D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553E1 $93D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553E2 $93D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553E3 $93D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553E4 $93D4: C-----  00       BRK  
  0x0553E5 $93D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553E6 $93D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553E7 $93D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553E8 $93D8: C-----  20 FF 20 JSR  $20FF
  0x0553EB $93DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553EC $93DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0553ED $93DD: C-----  00       BRK  
  0x0553EE $93DE: C-----  00       BRK  
  0x0553EF $93DF: C-----  00       BRK  
  0x0553F0 $93E0: C-----  08       PHP  
  0x0553F1 $93E1: C-----  F8       SED  
  0x0553F2 $93E2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0553F3 $93E3: C-----  08       PHP  
  0x0553F4 $93E4: C-----  10 F8    BPL  $93DE
  0x0553F6 $93E6: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0553F7 $93E7: C-----  10 08    BPL  $93F1
  0x0553F9 $93E9: C-----  F8       SED  
  0x0553FA $93EA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0553FB $93EB: C-----  08       PHP  
  0x0553FC $93EC: C-----  10 F8    BPL  $93E6
  0x0553FE $93EE: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0553FF $93EF: C-----  10 FF    BPL  $93F0
  0x055401 $93F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055402 $93F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055403 $93F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055404 $93F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055405 $93F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055406 $93F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055407 $93F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055408 $93F8: C-----  88       DEY  
  0x055409 $93F9: C-----  C8       INY  
  0x05540A $93FA: C-----  B8       CLV  
  0x05540B $93FB: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05540C $93FC: C-----  88       DEY  
  0x05540D $93FD: C-----  88       DEY  
  0x05540E $93FE: C-----  C8       INY  
  0x05540F $93FF: C-----  B8       CLV  
  0x055410 $9400: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x055411 $9401: C-----  F5 54    SBC  $54,X
  0x055413 $9403: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055414 $9404: C-----  0E EC 2B ASL  $2BEC
  0x055417 $9407: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055418 $9408: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x055419 $9409: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05541A $940A: C-----  8C 5F 9E STY  $9E5F
  0x05541D $940D: C-----  F8       SED  
  0x05541E $940E: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x05541F $940F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055420 $9410: C-----  C8       INY  
  0x055421 $9411: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x055422 $9412: C-----  CC FF 99 CPY  $99FF
  0x055425 $9415: C-----  C9 9B    CMP  #$9B
  0x055427 $9417: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055428 $9418: C-----  D9 E9 9A CMP  $9AE9,Y
  0x05542B $941B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05542C $941C: C-----  DE AB A9 DEC  $A9AB,X
  0x05542F $941F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055430 $9420: C-----  48       PHA  
  0x055431 $9421: C-----  5D 5C 7F EOR  $7F5C,X
  0x055434 $9424: C-----  88       DEY  
  0x055435 $9425: C-----  AC AB FF LDY  $FFAB
  0x055438 $9428: C-----  C9 C8    CMP  #$C8
  0x05543A $942A: C-----  CC FF 99 CPY  $99FF
  0x05543D $942D: C-----  EA       NOP  
  0x05543E $942E: C-----  CC FF FC CPY  $FCFF
  0x055441 $9431: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x055442 $9432: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x055443 $9433: C-----  FE FE AF INC  $AFFE,X
  0x055446 $9436: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x055447 $9437: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x055448 $9438: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x055449 $9439: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05544A $943A: C-----  84 D5    STY  $D5
  0x05544C $943C: C-----  FE 6F CC INC  $CC6F,X
  0x05544F $943F: C-----  2A       ROL  A
  0x055450 $9440: C-----  69 B5    ADC  #$B5
  0x055452 $9442: C-----  F9 FF 47 SBC  $47FF,Y
  0x055455 $9445: C-----  EE EB 7F INC  $7FEB
  0x055458 $9448: C-----  21 21    AND  ($21,X)
  0x05545A $944A: C-----  E5 7F    SBC  $7F
  0x05545C $944C: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05545D $944D: C-----  6A       ROR  A
  0x05545E $944E: C-----  C6 7E    DEC  $7E
  0x055460 $9450: ------  .byte $F8
  0x055461 $9451: ------  .byte $9F
  0x055462 $9452: ------  .byte $58
  0x055463 $9453: ------  .byte $FA
  0x055464 $9454: ------  .byte $F6
  0x055465 $9455: ------  .byte $BF
  0x055466 $9456: ------  .byte $3B
  0x055467 $9457: ------  .byte $13
  0x055468 $9458: ------  .byte $F8
  0x055469 $9459: ------  .byte $0F
  0x05546A $945A: ------  .byte $8C
  0x05546B $945B: ------  .byte $59
  0x05546C $945C: ------  .byte $F6
  0x05546D $945D: ------  .byte $7F
  0x05546E $945E: ------  .byte $D4
  0x05546F $945F: ------  .byte $3A
  0x055470 $9460: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x055471 $9461: C-----  9D 58 FA STA  $FA58,X
  0x055474 $9464: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055475 $9465: C-----  BC 3B F3 LDY  $F33B,X
  0x055478 $9468: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055479 $9469: C-----  08       PHP  
  0x05547A $946A: C-----  8C F9 9F STY  $9FF9
  0x05547D $946D: C-----  78       SEI  
  0x05547E $946E: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05547F $946F: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x055480 $9470: C-----  49 FD    EOR  #$FD
  0x055482 $9472: C-----  5D F9 82 EOR  $82F9,X
  0x055485 $9475: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x055486 $9476: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x055487 $9477: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x055488 $9478: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x055489 $9479: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05548A $947A: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05548B $947B: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x05548C $947C: C-----  96 FE    STX  $FE,Y
  0x05548E $947E: C-----  C6 AF    DEC  $AF
  0x055490 $9480: C-----  48       PHA  
  0x055491 $9481: C-----  95 58    STA  $58,X
  0x055493 $9483: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x055494 $9484: C-----  E6 FC    INC  $FC
  0x055496 $9486: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055497 $9487: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055498 $9488: C-----  00       BRK  
  0x055499 $9489: C-----  00       BRK  
  0x05549A $948A: C-----  84 51    STY  $51
  0x05549C $948C: C-----  F6 FC    INC  $FC,X
  0x05549E $948E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05549F $948F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554A0 $9490: C-----  48       PHA  
  0x0554A1 $9491: C-----  95 58    STA  $58,X
  0x0554A3 $9493: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0554A4 $9494: C-----  06 AC    ASL  $AC
  0x0554A6 $9496: C-----  E8       INX  
  0x0554A7 $9497: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554A8 $9498: C-----  00       BRK  
  0x0554A9 $9499: C-----  00       BRK  
  0x0554AA $949A: C-----  84 51    STY  $51
  0x0554AC $949C: C-----  96 68    STX  $68,Y
  0x0554AE $949E: C-----  C5 F9    CMP  $F9
  0x0554B0 $94A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554B1 $94A1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0554B2 $94A2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0554B3 $94A3: C-----  00       BRK  
  0x0554B4 $94A4: C-----  00       BRK  
  0x0554B5 $94A5: C-----  A0 FB    LDY  #$FB
  0x0554B7 $94A7: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0554B8 $94A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554B9 $94A9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0554BA $94AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0554BB $94AB: C-----  00       BRK  
  0x0554BC $94AC: C-----  00       BRK  
  0x0554BD $94AD: C-----  60       RTS  
  0x0554BE $94AE: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0554BF $94AF: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0554C0 $94B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554C1 $94B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554C2 $94B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554C3 $94B3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0554C4 $94B4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0554C5 $94B5: C-----  00       BRK  
  0x0554C6 $94B6: C-----  00       BRK  
  0x0554C7 $94B7: C-----  18       CLC  
  0x0554C8 $94B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554C9 $94B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554CA $94BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554CB $94BB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0554CC $94BC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0554CD $94BD: C-----  00       BRK  
  0x0554CE $94BE: C-----  00       BRK  
  0x0554CF $94BF: C-----  08       PHP  
  0x0554D0 $94C0: C-----  C4 FF    CPY  $FF
  0x0554D2 $94C2: C-----  CC F4 1F CPY  $1FF4
  0x0554D5 $94C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554D6 $94C6: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0554D7 $94C7: C-----  19 D5 FF ORA  $FFD5,Y
  0x0554DA $94CA: C-----  96 8C    STX  $8C,Y
  0x0554DC $94CC: C-----  58       CLI  
  0x0554DD $94CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554DE $94CE: C-----  29 08    AND  #$08
  0x0554E0 $94D0: C-----  C8       INY  
  0x0554E1 $94D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554E2 $94D2: C-----  4C F8 17 JMP  $17F8
  0x0554E5 $94D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554E6 $94D6: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0554E7 $94D7: C-----  19 D9 FF ORA  $FFD9,Y
  0x0554EA $94DA: C-----  9A       TXS  
  0x0554EB $94DB: C-----  88       DEY  
  0x0554EC $94DC: C-----  50 FF    BVC  $94DD
  0x0554EE $94DE: C-----  39 18 98 AND  $9818,Y
  0x0554F1 $94E1: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0554F2 $94E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554F3 $94E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554F4 $94E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554F5 $94E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554F6 $94E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0554F7 $94E7: C-----  01 F0    ORA  ($F0,X)
  0x0554F9 $94E9: C-----  FD FF FF SBC  $FFFF,X
  0x0554FC $94EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554FD $94ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0554FE $94EE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0554FF $94EF: C-----  01 C0    ORA  ($C0,X)
  0x055501 $94F1: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x055502 $94F2: C-----  4C F0 FF JMP  $FFF0
  0x055505 $94F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055506 $94F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055507 $94F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055508 $94F8: C-----  D1 61    CMP  ($61),Y
  0x05550A $94FA: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x05550B $94FB: C-----  F8       SED  
  0x05550C $94FC: C-----  FE FF FF INC  $FFFF,X
  0x05550F $94FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055510 $9500: C-----  CC 95 FC CPY  $FC95
  0x055513 $9503: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055514 $9504: C-----  0E AC 7F ASL  $7FAC
  0x055517 $9507: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x055518 $9508: C-----  84 84    STY  $84
  0x05551A $950A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05551B $950B: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05551C $950C: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x05551D $950D: C-----  E8       INX  
  0x05551E $950E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05551F $950F: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x055520 $9510: ------  .byte $5F
  0x055521 $9511: ------  .byte $95
  0x055522 $9512: ------  .byte $58
  0x055523 $9513: ------  .byte $FA
  0x055524 $9514: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055525 $9515: C-----  AD 2B E3 LDA  $E32B
  0x055528 $9518: ------  .byte $1F
  0x055529 $9519: ------  .byte $10
  0x05552A $951A: ------  .byte $94
  0x05552B $951B: ------  .byte $F1
  0x05552C $951C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05552D $951D: C-----  69 E5    ADC  #$E5
  0x05552F $951F: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055530 $9520: C-----  F8       SED  
  0x055531 $9521: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x055532 $9522: C-----  58       CLI  
  0x055533 $9523: C-----  AA       TAX  
  0x055534 $9524: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055535 $9525: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x055536 $9526: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x055537 $9527: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055538 $9528: C-----  F0 1F    BEQ  $9549
  0x05553A $952A: C-----  94 31    STY  $31,X
  0x05553C $952C: C-----  F5 6F    SBC  $6F,X
  0x05553E $952E: C-----  A5 7B    LDA  $7B
  0x055540 $9530: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055541 $9531: C-----  B5 79    LDA  $79,X
  0x055543 $9533: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055544 $9534: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x055545 $9535: C-----  EE 6B E3 INC  $E36B
  0x055548 $9538: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055549 $9539: C-----  21 A5    AND  ($A5,X)
  0x05554B $953B: C-----  F1 DF    SBC  ($DF),Y
  0x05554D $953D: C-----  6A       ROR  A
  0x05554E $953E: C-----  C6 EA    DEC  $EA
  0x055550 $9540: C-----  CC FD DF CPY  $DFFD
  0x055553 $9543: C-----  FE 0E FC INC  $FC0E,X
  0x055556 $9546: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x055557 $9547: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x055558 $9548: C-----  84 FC    STY  $FC
  0x05555A $954A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05555B $954B: C-----  D5 9E    CMP  $9E,X
  0x05555D $954D: C-----  F8       SED  
  0x05555E $954E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05555F $954F: C-----  2A       ROL  A
  0x055560 $9550: C-----  D8       CLD  
  0x055561 $9551: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x055562 $9552: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x055563 $9553: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x055564 $9554: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x055565 $9555: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x055566 $9556: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055567 $9557: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x055568 $9558: C-----  F9 F9 BE SBC  $BEF9,Y
  0x05556B $955B: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x05556C $955C: C-----  78       SEI  
  0x05556D $955D: C-----  E9 7D    SBC  #$7D
  0x05556F $955F: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x055570 $9560: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x055571 $9561: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x055572 $9562: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x055573 $9563: C-----  FE 83 AC INC  $AC83,X
  0x055576 $9566: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055577 $9567: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x055578 $9568: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x055579 $9569: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x05557A $956A: C-----  C6 7F    DEC  $7F
  0x05557C $956C: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x05557D $956D: C-----  EC C4 BE CPX  $BEC4
  0x055580 $9570: C-----  D0 FF    BNE  $9571
  0x055582 $9572: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x055583 $9573: C-----  F0 37    BEQ  $95AC
  0x055585 $9575: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055586 $9576: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x055587 $9577: C-----  39 D1 FF AND  $FFD1,Y
  0x05558A $957A: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x05558B $957B: C-----  98       TYA  
  0x05558C $957C: C-----  71 FF    ADC  ($FF),Y
  0x05558E $957E: C-----  29 29    AND  #$29
  0x055590 $9580: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x055591 $9581: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055592 $9582: C-----  4E F2 97 LSR  $97F2
  0x055595 $9585: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055596 $9586: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x055597 $9587: C-----  9D D3 FF STA  $FFD3,X
  0x05559A $958A: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x05559B $958B: C-----  CA       DEX  
  0x05559C $958C: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05559D $958D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05559E $958E: C-----  AD 8C E1 LDA  $E18C
  0x0555A1 $9591: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555A2 $9592: C-----  6D F1 57 ADC  $57F1
  0x0555A5 $9595: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555A6 $9596: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x0555A7 $9597: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x0555A8 $9598: C-----  F1 FF    SBC  ($FF),Y
  0x0555AA $959A: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x0555AB $959B: C-----  A9 52    LDA  #$52
  0x0555AD $959D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555AE $959E: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x0555AF $959F: C-----  4A       LSR  A
  0x0555B0 $95A0: C-----  18       CLC  
  0x0555B1 $95A1: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x0555B2 $95A2: C-----  08       PHP  
  0x0555B3 $95A3: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x0555B4 $95A4: C-----  06 EC    ASL  $EC
  0x0555B6 $95A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555B7 $95A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555B8 $95A8: C-----  70 8D    BVS  $9537
  0x0555BA $95AA: C-----  91 D1    STA  ($D1),Y
  0x0555BC $95AC: C-----  8E E8 FE STX  $FEE8
  0x0555BF $95AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555C0 $95B0: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0555C1 $95B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555C2 $95B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555C3 $95B3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0555C4 $95B4: C-----  84 FF    STY  $FF
  0x0555C6 $95B6: C-----  84 84    STY  $84
  0x0555C8 $95B8: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0555C9 $95B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555CA $95BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555CB $95BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555CC $95BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555CD $95BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555CE $95BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555CF $95BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555D0 $95C0: C-----  84 FF    STY  $FF
  0x0555D2 $95C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555D3 $95C3: C-----  84 08    STY  $08
  0x0555D5 $95C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555D6 $95C6: C-----  08       PHP  
  0x0555D7 $95C7: C-----  08       PHP  
  0x0555D8 $95C8: C-----  84 FF    STY  $FF
  0x0555DA $95CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555DB $95CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555DC $95CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555DD $95CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555DE $95CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555DF $95CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555E0 $95D0: C-----  08       PHP  
  0x0555E1 $95D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555E2 $95D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555E3 $95D3: C-----  08       PHP  
  0x0555E4 $95D4: C-----  10 FF    BPL  $95D5
  0x0555E6 $95D6: C-----  10 10    BPL  $95E8
  0x0555E8 $95D8: C-----  08       PHP  
  0x0555E9 $95D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555EA $95DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555EB $95DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555EC $95DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555ED $95DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555EE $95DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555EF $95DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555F0 $95E0: C-----  10 FF    BPL  $95E1
  0x0555F2 $95E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555F3 $95E3: C-----  10 21    BPL  $9606
  0x0555F5 $95E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555F6 $95E6: C-----  21 21    AND  ($21,X)
  0x0555F8 $95E8: C-----  10 FF    BPL  $95E9
  0x0555FA $95EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555FB $95EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555FC $95EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555FD $95ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555FE $95EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0555FF $95EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055600 $95F0: C-----  41 FD    EOR  ($FD,X)
  0x055602 $95F2: C-----  FD 41 82 SBC  $8241,X
  0x055605 $95F5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055606 $95F6: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x055607 $95F7: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x055608 $95F8: C-----  41 FD    EOR  ($FD,X)
  0x05560A $95FA: C-----  FD FD FB SBC  $FBFD,X
  0x05560D $95FD: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05560E $95FE: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05560F $95FF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055610 $9600: C-----  21 FF    AND  ($FF,X)
  0x055612 $9602: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055613 $9603: C-----  21 F2    AND  ($F2,X)
  0x055615 $9605: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x055616 $9606: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x055617 $9607: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x055618 $9608: C-----  21 FF    AND  ($FF,X)
  0x05561A $960A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05561B $960B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05561C $960C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05561D $960D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05561E $960E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05561F $960F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055620 $9610: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055621 $9611: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055622 $9612: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055623 $9613: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055624 $9614: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055625 $9615: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055626 $9616: C-----  F0 0F    BEQ  $9627
  0x055628 $9618: C-----  10 10    BPL  $962A
  0x05562A $961A: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05562B $961B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05562C $961C: C-----  20 2F FF JSR  $FF2F
  0x05562F $961F: C-----  F0 FF    BEQ  $9620
  0x055631 $9621: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055632 $9622: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055633 $9623: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055634 $9624: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055635 $9625: C-----  00       BRK  
  0x055636 $9626: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055637 $9627: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055638 $9628: C-----  84 9F    STY  $9F
  0x05563A $962A: C-----  E4 84    CPX  $84
  0x05563C $962C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05563D $962D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05563E $962E: C-----  00       BRK  
  0x05563F $962F: C-----  00       BRK  
  0x055640 $9630: C-----  F8       SED  
  0x055641 $9631: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055642 $9632: C-----  C0 08    CPY  #$08
  0x055644 $9634: C-----  10 90    BPL  $95C6
  0x055646 $9636: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x055647 $9637: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x055648 $9638: C-----  F8       SED  
  0x055649 $9639: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05564A $963A: C-----  E0 FF    CPX  #$FF
  0x05564C $963C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05564D $963D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05564E $963E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05564F $963F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055650 $9640: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055651 $9641: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055652 $9642: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055653 $9643: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055654 $9644: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055655 $9645: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055656 $9646: C-----  00       BRK  
  0x055657 $9647: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055658 $9648: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x055659 $9649: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x05565A $964A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05565B $964B: C-----  84 84    STY  $84
  0x05565D $964D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05565E $964E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05565F $964F: C-----  00       BRK  
  0x055660 $9650: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055661 $9651: C-----  01 00    ORA  ($00,X)
  0x055663 $9653: C-----  70 F6    BVS  $964B
  0x055665 $9655: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x055666 $9656: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055667 $9657: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x055668 $9658: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055669 $9659: C-----  01 00    ORA  ($00,X)
  0x05566B $965B: C-----  D0 FE    BNE  $965B
  0x05566D $965D: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x05566E $965E: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05566F $965F: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x055670 $9660: C-----  F0 FF    BEQ  $9661
  0x055672 $9662: C-----  F0 0F    BEQ  $9673
  0x055674 $9664: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055675 $9665: C-----  84 84    STY  $84
  0x055677 $9667: C-----  E4 F0    CPX  $F0
  0x055679 $9669: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05567A $966A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05567B $966B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05567C $966C: C-----  E0 FF    CPX  #$FF
  0x05567E $966E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05567F $966F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055680 $9670: C-----  F0 FF    BEQ  $9671
  0x055682 $9672: C-----  F0 0F    BEQ  $9683
  0x055684 $9674: C-----  F0 07    BEQ  $967D
  0x055686 $9676: C-----  20 21 F0 JSR  $F021
  0x055689 $9679: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05568A $967A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05568B $967B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05568C $967C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05568D $967D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05568E $967E: C-----  F8       SED  
  0x05568F $967F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055690 $9680: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055691 $9681: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055692 $9682: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055693 $9683: C-----  F0 0F    BEQ  $9694
  0x055695 $9685: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055696 $9686: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055697 $9687: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055698 $9688: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055699 $9689: C-----  84 8F    STY  $8F
  0x05569B $968B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05569C $968C: C-----  F0 00    BEQ  $968E
  0x05569E $968E: C-----  00       BRK  
  0x05569F $968F: C-----  00       BRK  
  0x0556A0 $9690: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0556A1 $9691: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0556A2 $9692: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0556A3 $9693: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0556A4 $9694: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0556A5 $9695: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556A6 $9696: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556A7 $9697: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556A8 $9698: C-----  FE 46 FE INC  $FE46,X
  0x0556AB $969B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556AC $969C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0556AD $969D: C-----  00       BRK  
  0x0556AE $969E: C-----  00       BRK  
  0x0556AF $969F: C-----  00       BRK  
  0x0556B0 $96A0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0556B1 $96A1: C-----  F1 FE    SBC  ($FE),Y
  0x0556B3 $96A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556B4 $96A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556B5 $96A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556B6 $96A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556B7 $96A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556B8 $96A8: C-----  FE 0F 01 INC  $010F,X
  0x0556BB $96AB: C-----  00       BRK  
  0x0556BC $96AC: C-----  00       BRK  
  0x0556BD $96AD: C-----  00       BRK  
  0x0556BE $96AE: C-----  00       BRK  
  0x0556BF $96AF: C-----  00       BRK  
  0x0556C0 $96B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556C1 $96B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556C2 $96B2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0556C3 $96B3: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0556C4 $96B4: C-----  F8       SED  
  0x0556C5 $96B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556C6 $96B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556C7 $96B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556C8 $96B8: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0556C9 $96B9: C-----  C8       INY  
  0x0556CA $96BA: C-----  F8       SED  
  0x0556CB $96BB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0556CC $96BC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0556CD $96BD: C-----  00       BRK  
  0x0556CE $96BE: C-----  00       BRK  
  0x0556CF $96BF: C-----  00       BRK  
  0x0556D0 $96C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556D1 $96C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556D2 $96C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556D3 $96C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556D4 $96C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556D5 $96C5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0556D6 $96C6: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0556D7 $96C7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0556D8 $96C8: C-----  88       DEY  
  0x0556D9 $96C9: C-----  E8       INX  
  0x0556DA $96CA: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0556DB $96CB: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0556DC $96CC: C-----  E8       INX  
  0x0556DD $96CD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0556DE $96CE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0556DF $96CF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0556E0 $96D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556E1 $96D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556E2 $96D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556E3 $96D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556E4 $96D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556E5 $96D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556E6 $96D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556E7 $96D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556E8 $96D8: C-----  8E 89 88 STX  $8889
  0x0556EB $96DB: C-----  88       DEY  
  0x0556EC $96DC: C-----  F8       SED  
  0x0556ED $96DD: C-----  8E 89 F8 STX  $F889
  0x0556F0 $96E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556F1 $96E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556F2 $96E2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0556F3 $96E3: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0556F4 $96E4: C-----  F8       SED  
  0x0556F5 $96E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556F6 $96E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556F7 $96E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0556F8 $96E8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0556F9 $96E9: C-----  C8       INY  
  0x0556FA $96EA: C-----  F8       SED  
  0x0556FB $96EB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0556FC $96EC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0556FD $96ED: C-----  00       BRK  
  0x0556FE $96EE: C-----  00       BRK  
  0x0556FF $96EF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055700 $96F0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055701 $96F1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055702 $96F2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055703 $96F3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055704 $96F4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055705 $96F5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055706 $96F6: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x055707 $96F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055708 $96F8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055709 $96F9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05570A $96FA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05570B $96FB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05570C $96FC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05570D $96FD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05570E $96FE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05570F $96FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055710 $9700: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055711 $9701: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055712 $9702: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055713 $9703: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055714 $9704: C-----  00       BRK  
  0x055715 $9705: C-----  C0 F3    CPY  #$F3
  0x055717 $9707: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055718 $9708: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055719 $9709: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05571A $970A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05571B $970B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05571C $970C: C-----  00       BRK  
  0x05571D $970D: C-----  60       RTS  
  0x05571E $970E: C-----  F9 0F FF SBC  $FF0F,Y
  0x055721 $9711: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055722 $9712: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055723 $9713: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055724 $9714: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055725 $9715: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055726 $9716: C-----  00       BRK  
  0x055727 $9717: C-----  C0 FC    CPY  #$FC
  0x055729 $9719: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05572A $971A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05572B $971B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05572C $971C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05572D $971D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05572E $971E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05572F $971F: C-----  28       PLP  
  0x055730 $9720: C-----  F0 FF    BEQ  $9721
  0x055732 $9722: C-----  F0 0F    BEQ  $9733
  0x055734 $9724: C-----  F0 0F    BEQ  $9735
  0x055736 $9726: C-----  70 03    BVS  $972B
  0x055738 $9728: C-----  F0 FF    BEQ  $9729
  0x05573A $972A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05573B $972B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05573C $972C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05573D $972D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05573E $972E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05573F $972F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x055740 $9730: C-----  F0 FF    BEQ  $9731
  0x055742 $9732: C-----  F0 0F    BEQ  $9743
  0x055744 $9734: C-----  F0 0F    BEQ  $9745
  0x055746 $9736: C-----  F0 00    BEQ  $9738
  0x055748 $9738: C-----  F0 FF    BEQ  $9739
  0x05574A $973A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05574B $973B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05574C $973C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05574D $973D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05574E $973E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05574F $973F: C-----  E0 88    CPX  #$88
  0x055751 $9741: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055752 $9742: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055753 $9743: C-----  88       DEY  
  0x055754 $9744: C-----  88       DEY  
  0x055755 $9745: C-----  F8       SED  
  0x055756 $9746: C-----  8E 89 88 STX  $8889
  0x055759 $9749: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05575A $974A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05575B $974B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05575C $974C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05575D $974D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05575E $974E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05575F $974F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055760 $9750: C-----  88       DEY  
  0x055761 $9751: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055762 $9752: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055763 $9753: C-----  C8       INY  
  0x055764 $9754: C-----  B8       CLV  
  0x055765 $9755: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x055766 $9756: C-----  88       DEY  
  0x055767 $9757: C-----  88       DEY  
  0x055768 $9758: C-----  88       DEY  
  0x055769 $9759: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05576A $975A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05576B $975B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05576C $975C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05576D $975D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05576E $975E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05576F $975F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055770 $9760: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055771 $9761: C-----  F8       SED  
  0x055772 $9762: C-----  F0 0F    BEQ  $9773
  0x055774 $9764: C-----  F0 00    BEQ  $9766
  0x055776 $9766: C-----  00       BRK  
  0x055777 $9767: C-----  88       DEY  
  0x055778 $9768: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055779 $9769: C-----  F8       SED  
  0x05577A $976A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05577B $976B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05577C $976C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05577D $976D: C-----  F8       SED  
  0x05577E $976E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05577F $976F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055780 $9770: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055781 $9771: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055782 $9772: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055783 $9773: C-----  10 C0    BPL  $9735
  0x055785 $9775: C-----  08       PHP  
  0x055786 $9776: C-----  88       DEY  
  0x055787 $9777: C-----  88       DEY  
  0x055788 $9778: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055789 $9779: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05578A $977A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05578B $977B: C-----  F8       SED  
  0x05578C $977C: C-----  C0 3F    CPY  #$3F
  0x05578E $977E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05578F $977F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055790 $9780: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055791 $9781: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055792 $9782: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055793 $9783: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055794 $9784: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055795 $9785: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055796 $9786: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055797 $9787: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055798 $9788: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055799 $9789: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05579A $978A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05579B $978B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05579C $978C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05579D $978D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05579E $978E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05579F $978F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0557A0 $9790: C-----  48       PHA  
  0x0557A1 $9791: C-----  48       PHA  
  0x0557A2 $9792: C-----  48       PHA  
  0x0557A3 $9793: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0557A4 $9794: C-----  88       DEY  
  0x0557A5 $9795: C-----  88       DEY  
  0x0557A6 $9796: C-----  88       DEY  
  0x0557A7 $9797: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557A8 $9798: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0557A9 $9799: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557AA $979A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557AB $979B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557AC $979C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557AD $979D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557AE $979E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557AF $979F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557B0 $97A0: C-----  41 40    EOR  ($40,X)
  0x0557B2 $97A2: C-----  C0 7D    CPY  #$7D
  0x0557B4 $97A4: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0557B5 $97A5: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0557B6 $97A6: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x0557B7 $97A7: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0557B8 $97A8: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0557B9 $97A9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0557BA $97AA: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x0557BB $97AB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0557BC $97AC: C-----  86 86    STX  $86
  0x0557BE $97AE: C-----  C6 BF    DEC  $BF
  0x0557C0 $97B0: C-----  88       DEY  
  0x0557C1 $97B1: C-----  88       DEY  
  0x0557C2 $97B2: C-----  88       DEY  
  0x0557C3 $97B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557C4 $97B4: C-----  88       DEY  
  0x0557C5 $97B5: C-----  88       DEY  
  0x0557C6 $97B6: C-----  88       DEY  
  0x0557C7 $97B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557C8 $97B8: C-----  88       DEY  
  0x0557C9 $97B9: C-----  88       DEY  
  0x0557CA $97BA: C-----  88       DEY  
  0x0557CB $97BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557CC $97BC: C-----  88       DEY  
  0x0557CD $97BD: C-----  88       DEY  
  0x0557CE $97BE: C-----  88       DEY  
  0x0557CF $97BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557D0 $97C0: C-----  88       DEY  
  0x0557D1 $97C1: C-----  88       DEY  
  0x0557D2 $97C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557D3 $97C3: C-----  88       DEY  
  0x0557D4 $97C4: C-----  88       DEY  
  0x0557D5 $97C5: C-----  88       DEY  
  0x0557D6 $97C6: C-----  88       DEY  
  0x0557D7 $97C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557D8 $97C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557D9 $97C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557DA $97CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557DB $97CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557DC $97CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557DD $97CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557DE $97CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557DF $97CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557E0 $97D0: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0557E1 $97D1: C-----  F8       SED  
  0x0557E2 $97D2: C-----  88       DEY  
  0x0557E3 $97D3: C-----  88       DEY  
  0x0557E4 $97D4: C-----  88       DEY  
  0x0557E5 $97D5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0557E6 $97D6: C-----  F8       SED  
  0x0557E7 $97D7: C-----  88       DEY  
  0x0557E8 $97D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557E9 $97D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557EA $97DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557EB $97DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557EC $97DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557ED $97DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557EE $97DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557EF $97DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0557F0 $97E0: C-----  D0 FF    BNE  $97E1
  0x0557F2 $97E2: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0557F3 $97E3: C-----  F0 36    BEQ  $981B
  0x0557F5 $97E5: C-----  FE 32 38 INC  $3832,X
  0x0557F8 $97E8: C-----  D1 FF    CMP  ($FF),Y
  0x0557FA $97EA: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x0557FB $97EB: C-----  98       TYA  
  0x0557FC $97EC: C-----  71 FF    ADC  ($FF),Y
  0x0557FE $97EE: C-----  29 29    AND  #$29
  0x055800 $97F0: ------  .byte $00
  0x055801 $97F1: ------  .byte $7E
  0x055802 $97F2: ------  .byte $42
  0x055803 $97F3: ------  .byte $42
  0x055804 $97F4: ------  .byte $42
  0x055805 $97F5: ------  .byte $42
  0x055806 $97F6: ------  .byte $7E
  0x055807 $97F7: ------  .byte $00
  0x055808 $97F8: ------  .byte $00
  0x055809 $97F9: ------  .byte $7E
  0x05580A $97FA: ------  .byte $42
  0x05580B $97FB: ------  .byte $42
  0x05580C $97FC: ------  .byte $42
  0x05580D $97FD: ------  .byte $42
  0x05580E $97FE: ------  .byte $7E
  0x05580F $97FF: ------  .byte $00
  0x055810 $9800: C-----  00       BRK  
  0x055811 $9801: C-----  00       BRK  
  0x055812 $9802: C-----  00       BRK  
  0x055813 $9803: C-----  00       BRK  
  0x055814 $9804: C-----  00       BRK  
  0x055815 $9805: C-----  00       BRK  
  0x055816 $9806: C-----  00       BRK  
  0x055817 $9807: C-----  00       BRK  
  0x055818 $9808: C-----  00       BRK  
  0x055819 $9809: C-----  00       BRK  
  0x05581A $980A: C-----  00       BRK  
  0x05581B $980B: C-----  00       BRK  
  0x05581C $980C: C-----  00       BRK  
  0x05581D $980D: C-----  00       BRK  
  0x05581E $980E: C-----  00       BRK  
  0x05581F $980F: C-----  00       BRK  
  0x055820 $9810: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055821 $9811: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055822 $9812: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055823 $9813: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055824 $9814: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055825 $9815: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055826 $9816: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055827 $9817: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055828 $9818: C-----  00       BRK  
  0x055829 $9819: C-----  00       BRK  
  0x05582A $981A: C-----  00       BRK  
  0x05582B $981B: C-----  00       BRK  
  0x05582C $981C: C-----  00       BRK  
  0x05582D $981D: C-----  00       BRK  
  0x05582E $981E: C-----  00       BRK  
  0x05582F $981F: C-----  00       BRK  
  0x055830 $9820: C-----  18       CLC  
  0x055831 $9821: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x055832 $9822: C-----  08       PHP  
  0x055833 $9823: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x055834 $9824: C-----  06 AC    ASL  $AC
  0x055836 $9826: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x055837 $9827: C-----  C1 70    CMP  ($70,X)
  0x055839 $9829: C-----  8D 91 D1 STA  $D191
  0x05583C $982C: C-----  8E 68 D4 STX  $D468
  0x05583F $982F: C-----  28       PLP  
  0x055840 $9830: C-----  C0 33    CPY  #$33
  0x055842 $9832: C-----  4C F0 17 JMP  $17F0
  0x055845 $9835: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x055846 $9836: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x055847 $9837: C-----  19 D1 61 ORA  $61D1,Y
  0x05584A $983A: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x05584B $983B: C-----  88       DEY  
  0x05584C $983C: C-----  50 61    BVC  $989F
  0x05584E $983E: C-----  29 08    AND  #$08
  0x055850 $9840: C-----  00       BRK  
  0x055851 $9841: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055852 $9842: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055853 $9843: C-----  00       BRK  
  0x055854 $9844: C-----  00       BRK  
  0x055855 $9845: C-----  00       BRK  
  0x055856 $9846: C-----  00       BRK  
  0x055857 $9847: C-----  00       BRK  
  0x055858 $9848: C-----  00       BRK  
  0x055859 $9849: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05585A $984A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05585B $984B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05585C $984C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05585D $984D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05585E $984E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05585F $984F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055860 $9850: C-----  00       BRK  
  0x055861 $9851: C-----  00       BRK  
  0x055862 $9852: C-----  00       BRK  
  0x055863 $9853: C-----  00       BRK  
  0x055864 $9854: C-----  00       BRK  
  0x055865 $9855: C-----  00       BRK  
  0x055866 $9856: C-----  00       BRK  
  0x055867 $9857: C-----  00       BRK  
  0x055868 $9858: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055869 $9859: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05586A $985A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05586B $985B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05586C $985C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05586D $985D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05586E $985E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05586F $985F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055870 $9860: C-----  48       PHA  
  0x055871 $9861: C-----  95 58    STA  $58,X
  0x055873 $9863: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x055874 $9864: C-----  06 AC    ASL  $AC
  0x055876 $9866: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x055877 $9867: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055878 $9868: C-----  00       BRK  
  0x055879 $9869: C-----  00       BRK  
  0x05587A $986A: C-----  84 51    STY  $51
  0x05587C $986C: C-----  96 68    STX  $68,Y
  0x05587E $986E: C-----  C4 2A    CPY  $2A
  0x055880 $9870: C-----  00       BRK  
  0x055881 $9871: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055882 $9872: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055883 $9873: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055884 $9874: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055885 $9875: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055886 $9876: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055887 $9877: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055888 $9878: C-----  00       BRK  
  0x055889 $9879: C-----  00       BRK  
  0x05588A $987A: C-----  00       BRK  
  0x05588B $987B: C-----  00       BRK  
  0x05588C $987C: C-----  00       BRK  
  0x05588D $987D: C-----  00       BRK  
  0x05588E $987E: C-----  00       BRK  
  0x05588F $987F: C-----  00       BRK  
  0x055890 $9880: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055891 $9881: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055892 $9882: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055893 $9883: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055894 $9884: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055895 $9885: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055896 $9886: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055897 $9887: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055898 $9888: C-----  00       BRK  
  0x055899 $9889: C-----  00       BRK  
  0x05589A $988A: C-----  00       BRK  
  0x05589B $988B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05589C $988C: C-----  00       BRK  
  0x05589D $988D: C-----  00       BRK  
  0x05589E $988E: C-----  00       BRK  
  0x05589F $988F: C-----  00       BRK  
  0x0558A0 $9890: C-----  18       CLC  
  0x0558A1 $9891: C-----  18       CLC  
  0x0558A2 $9892: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0558A3 $9893: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0558A4 $9894: C-----  06 06    ASL  $06
  0x0558A6 $9896: C-----  06 06    ASL  $06
  0x0558A8 $9898: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0558A9 $9899: C-----  F8       SED  
  0x0558AA $989A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0558AB $989B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0558AC $989C: C-----  FE FE FE INC  $FEFE,X
  0x0558AF $989F: C-----  FE 00 00 INC  $0000,X
  0x0558B2 $98A2: C-----  20 10 04 JSR  $0410
  0x0558B5 $98A5: C-----  28       PLP  
  0x0558B6 $98A6: C-----  4C 40 BF JMP  $BF40
  0x0558B9 $98A9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0558BA $98AA: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0558BB $98AB: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x0558BC $98AC: C-----  A1 19    LDA  ($19,X)
  0x0558BE $98AE: C-----  30 08    BMI  $98B8
  0x0558C0 $98B0: C-----  06 06    ASL  $06
  0x0558C2 $98B2: C-----  06 06    ASL  $06
  0x0558C4 $98B4: C-----  06 06    ASL  $06
  0x0558C6 $98B6: C-----  06 06    ASL  $06
  0x0558C8 $98B8: C-----  FE FE FE INC  $FEFE,X
  0x0558CB $98BB: C-----  FE FE FE INC  $FEFE,X
  0x0558CE $98BE: C-----  FE FE 00 INC  $00FE,X
  0x0558D1 $98C1: C-----  00       BRK  
  0x0558D2 $98C2: C-----  01 03    ORA  ($03,X)
  0x0558D4 $98C4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0558D5 $98C5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0558D6 $98C6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558D7 $98C7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558D8 $98C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0558D9 $98C9: C-----  00       BRK  
  0x0558DA $98CA: C-----  00       BRK  
  0x0558DB $98CB: C-----  00       BRK  
  0x0558DC $98CC: C-----  00       BRK  
  0x0558DD $98CD: C-----  00       BRK  
  0x0558DE $98CE: C-----  00       BRK  
  0x0558DF $98CF: C-----  00       BRK  
  0x0558E0 $98D0: C-----  FE FE FE INC  $FEFE,X
  0x0558E3 $98D3: C-----  FE FF FF INC  $FFFF,X
  0x0558E6 $98D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0558E7 $98D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0558E8 $98D8: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0558E9 $98D9: C-----  0D 0E 06 ORA  $060E
  0x0558EC $98DC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0558ED $98DD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0558EE $98DE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0558EF $98DF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0558F0 $98E0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558F1 $98E1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558F2 $98E2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558F3 $98E3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558F4 $98E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558F5 $98E5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558F6 $98E6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558F7 $98E7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0558F8 $98E8: C-----  00       BRK  
  0x0558F9 $98E9: C-----  00       BRK  
  0x0558FA $98EA: C-----  00       BRK  
  0x0558FB $98EB: C-----  00       BRK  
  0x0558FC $98EC: C-----  00       BRK  
  0x0558FD $98ED: C-----  00       BRK  
  0x0558FE $98EE: C-----  00       BRK  
  0x0558FF $98EF: C-----  00       BRK  
  0x055900 $98F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055901 $98F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055902 $98F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055903 $98F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055904 $98F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055905 $98F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055906 $98F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055907 $98F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055908 $98F8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055909 $98F9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05590A $98FA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05590B $98FB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05590C $98FC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05590D $98FD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05590E $98FE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05590F $98FF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055910 $9900: C-----  00       BRK  
  0x055911 $9901: C-----  00       BRK  
  0x055912 $9902: C-----  00       BRK  
  0x055913 $9903: C-----  00       BRK  
  0x055914 $9904: C-----  00       BRK  
  0x055915 $9905: C-----  00       BRK  
  0x055916 $9906: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055917 $9907: C-----  08       PHP  
  0x055918 $9908: C-----  00       BRK  
  0x055919 $9909: C-----  00       BRK  
  0x05591A $990A: C-----  00       BRK  
  0x05591B $990B: C-----  00       BRK  
  0x05591C $990C: C-----  00       BRK  
  0x05591D $990D: C-----  00       BRK  
  0x05591E $990E: C-----  00       BRK  
  0x05591F $990F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055920 $9910: C-----  00       BRK  
  0x055921 $9911: C-----  00       BRK  
  0x055922 $9912: C-----  00       BRK  
  0x055923 $9913: C-----  00       BRK  
  0x055924 $9914: C-----  00       BRK  
  0x055925 $9915: C-----  00       BRK  
  0x055926 $9916: C-----  D0 30    BNE  $9948
  0x055928 $9918: C-----  00       BRK  
  0x055929 $9919: C-----  00       BRK  
  0x05592A $991A: C-----  00       BRK  
  0x05592B $991B: C-----  00       BRK  
  0x05592C $991C: C-----  00       BRK  
  0x05592D $991D: C-----  00       BRK  
  0x05592E $991E: C-----  70 D0    BVS  $98F0
  0x055930 $9920: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x055931 $9921: C-----  20 49 88 JSR  $8849
  0x055934 $9924: C-----  55 D0    EOR  $D0,X
  0x055936 $9926: C-----  18       CLC  
  0x055937 $9927: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x055938 $9928: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x055939 $9929: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x05593A $992A: C-----  81 C3    STA  ($C3,X)
  0x05593C $992C: C-----  15 29    ORA  $29,X
  0x05593E $992E: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05593F $992F: C-----  00       BRK  
  0x055940 $9930: C-----  E8       INX  
  0x055941 $9931: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x055942 $9932: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x055943 $9933: C-----  0E FA 06 ASL  $06FA
  0x055946 $9936: C-----  FD 03 F8 SBC  $F803,X
  0x055949 $9939: C-----  ED FD F5 SBC  $F5FD
  0x05594C $993C: C-----  FE FA FF INC  $FFFA,X
  0x05594F $993F: C-----  FD 00 FF SBC  $FF00,X
  0x055952 $9942: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055953 $9943: C-----  00       BRK  
  0x055954 $9944: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055955 $9945: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055956 $9946: C-----  00       BRK  
  0x055957 $9947: C-----  88       DEY  
  0x055958 $9948: C-----  00       BRK  
  0x055959 $9949: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05595A $994A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05595B $994B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05595C $994C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05595D $994D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05595E $994E: C-----  00       BRK  
  0x05595F $994F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055960 $9950: C-----  00       BRK  
  0x055961 $9951: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055962 $9952: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055963 $9953: C-----  00       BRK  
  0x055964 $9954: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055965 $9955: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055966 $9956: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055967 $9957: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x055968 $9958: C-----  00       BRK  
  0x055969 $9959: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05596A $995A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05596B $995B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05596C $995C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05596D $995D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05596E $995E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05596F $995F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055970 $9960: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055971 $9961: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055972 $9962: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055973 $9963: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x055974 $9964: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055975 $9965: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x055976 $9966: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x055977 $9967: C-----  88       DEY  
  0x055978 $9968: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055979 $9969: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05597A $996A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05597B $996B: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05597C $996C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05597D $996D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05597E $996E: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05597F $996F: C-----  88       DEY  
  0x055980 $9970: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055981 $9971: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055982 $9972: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055983 $9973: C-----  88       DEY  
  0x055984 $9974: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055985 $9975: C-----  00       BRK  
  0x055986 $9976: C-----  11 22    ORA  ($22),Y
  0x055988 $9978: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055989 $9979: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05598A $997A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05598B $997B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05598C $997C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05598D $997D: C-----  00       BRK  
  0x05598E $997E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05598F $997F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055990 $9980: C-----  7E 41 1F ROR  $1F41,X
  0x055993 $9983: C-----  A0 5F    LDY  #$5F
  0x055995 $9985: C-----  B0 0F    BCS  $9996
  0x055997 $9987: C-----  08       PHP  
  0x055998 $9988: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055999 $9989: C-----  3E 9F 1F ROL  $1F9F,X
  0x05599C $998C: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05599D $998D: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x05599E $998E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05599F $998F: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0559A0 $9990: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0559A1 $9991: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x0559A2 $9992: C-----  4C F0 B7 JMP  $B7F0
  0x0559A5 $9995: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0559A6 $9996: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0559A7 $9997: C-----  39 D1 E1 AND  $E1D1,Y
  0x0559AA $999A: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x0559AB $999B: C-----  48       PHA  
  0x0559AC $999C: C-----  F0 A1    BEQ  $993F
  0x0559AE $999E: C-----  F5 D0    SBC  $D0,X
  0x0559B0 $99A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559B1 $99A1: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0559B2 $99A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559B3 $99A3: C-----  88       DEY  
  0x0559B4 $99A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559B5 $99A5: C-----  00       BRK  
  0x0559B6 $99A6: C-----  11 22    ORA  ($22),Y
  0x0559B8 $99A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559B9 $99A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559BA $99AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559BB $99AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559BC $99AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559BD $99AD: C-----  00       BRK  
  0x0559BE $99AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559BF $99AF: C-----  FE F3 23 INC  $23F3,X
  0x0559C2 $99B2: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x0559C3 $99B3: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x0559C4 $99B4: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x0559C5 $99B5: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x0559C6 $99B6: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0559C7 $99B7: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x0559C8 $99B8: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0559C9 $99B9: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x0559CA $99BA: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x0559CB $99BB: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0559CC $99BC: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0559CD $99BD: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0559CE $99BE: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0559CF $99BF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0559D0 $99C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559D1 $99C1: C-----  9D D8 FB STA  $FBD8,X
  0x0559D4 $99C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559D5 $99C5: C-----  BD 3B 23 LDA  $233B,X
  0x0559D8 $99C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559D9 $99C9: C-----  88       DEY  
  0x0559DA $99CA: C-----  8C 51 FF STY  $FF51
  0x0559DD $99CD: C-----  79 D5 2A ADC  $2AD5,Y
  0x0559E0 $99D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559E1 $99D1: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x0559E2 $99D2: C-----  6E F4 FF ROR  $FFF4
  0x0559E5 $99D5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0559E6 $99D6: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x0559E7 $99D7: C-----  99 FF 63 STA  $63FF,Y
  0x0559EA $99DA: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x0559EB $99DB: C-----  CC FF 65 CPY  $65FF
  0x0559EE $99DE: C-----  6D 88 FF ADC  $FF88
  0x0559F1 $99E1: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0559F2 $99E2: C-----  CC F1 FF CPY  $FFF1
  0x0559F5 $99E5: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x0559F6 $99E6: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0559F7 $99E7: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x0559F8 $99E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0559F9 $99E9: C-----  E9 9A    SBC  #$9A
  0x0559FB $99EB: C-----  99 FF 71 STA  $71FF,Y
  0x0559FE $99EE: C-----  39 2A FF AND  $FF2A,Y
  0x055A01 $99F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A02 $99F2: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055A03 $99F3: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x055A04 $99F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A05 $99F5: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x055A06 $99F6: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x055A07 $99F7: C-----  88       DEY  
  0x055A08 $99F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A09 $99F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A0A $99FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A0B $99FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A0C $99FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A0D $99FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A0E $99FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A0F $99FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A10 $9A00: C-----  96 49    STX  $49,Y
  0x055A12 $9A02: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055A13 $9A03: C-----  A0 40    LDY  #$40
  0x055A15 $9A05: C-----  40       RTI  
  0x055A16 $9A06: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055A17 $9A07: C-----  00       BRK  
  0x055A18 $9A08: C-----  00       BRK  
  0x055A19 $9A09: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055A1A $9A0A: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x055A1B $9A0B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055A1C $9A0C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055A1D $9A0D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055A1E $9A0E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055A1F $9A0F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A20 $9A10: C-----  00       BRK  
  0x055A21 $9A11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A22 $9A12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A23 $9A13: C-----  C0 60    CPY  #$60
  0x055A25 $9A15: C-----  60       RTS  
  0x055A26 $9A16: C-----  30 30    BMI  $9A48
  0x055A28 $9A18: C-----  00       BRK  
  0x055A29 $9A19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A2A $9A1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A2B $9A1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A2C $9A1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A2D $9A1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A2E $9A1E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A2F $9A1F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A30 $9A20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A31 $9A21: C-----  88       DEY  
  0x055A32 $9A22: C-----  88       DEY  
  0x055A33 $9A23: C-----  11 FF    ORA  ($FF),Y
  0x055A35 $9A25: C-----  11 11    ORA  ($11),Y
  0x055A37 $9A27: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055A38 $9A28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A39 $9A29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A3A $9A2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A3B $9A2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A3C $9A2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A3D $9A2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A3E $9A2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A3F $9A2F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A40 $9A30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A41 $9A31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A42 $9A32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A43 $9A33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A44 $9A34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A45 $9A35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A46 $9A36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A47 $9A37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A48 $9A38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A49 $9A39: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055A4A $9A3A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055A4B $9A3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055A4C $9A3C: C-----  00       BRK  
  0x055A4D $9A3D: C-----  00       BRK  
  0x055A4E $9A3E: C-----  00       BRK  
  0x055A4F $9A3F: C-----  00       BRK  
  0x055A50 $9A40: ------  .byte $00
  0x055A51 $9A41: ------  .byte $00
  0x055A52 $9A42: ------  .byte $00
  0x055A53 $9A43: ------  .byte $00
  0x055A54 $9A44: ------  .byte $00
  0x055A55 $9A45: ------  .byte $00
  0x055A56 $9A46: ------  .byte $0B
  0x055A57 $9A47: ------  .byte $0C
  0x055A58 $9A48: ------  .byte $00
  0x055A59 $9A49: ------  .byte $00
  0x055A5A $9A4A: ------  .byte $00
  0x055A5B $9A4B: ------  .byte $00
  0x055A5C $9A4C: ------  .byte $00
  0x055A5D $9A4D: ------  .byte $00
  0x055A5E $9A4E: ------  .byte $0E
  0x055A5F $9A4F: ------  .byte $0B
  0x055A60 $9A50: C-----  10 CD    BPL  $9A1F
  0x055A62 $9A52: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055A63 $9A53: C-----  F9 F5 F0 SBC  $F0F5,Y
  0x055A66 $9A56: C-----  F6 FE    INC  $FE,X
  0x055A68 $9A58: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x055A69 $9A59: C-----  D0 E0    BNE  $9A3B
  0x055A6B $9A5B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x055A6C $9A5C: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x055A6D $9A5D: C-----  38       SEC  
  0x055A6E $9A5E: C-----  39 18 FB AND  $FB18,Y
  0x055A71 $9A61: C-----  99 D9 F7 STA  $F7D9,Y
  0x055A74 $9A64: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055A75 $9A65: C-----  B5 37    LDA  $37,X
  0x055A77 $9A67: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x055A78 $9A68: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A79 $9A69: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x055A7A $9A6A: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x055A7B $9A6B: C-----  55 F7    EOR  $F7,X
  0x055A7D $9A6D: C-----  75 D5    ADC  $D5,X
  0x055A7F $9A6F: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x055A80 $9A70: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055A81 $9A71: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055A82 $9A72: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055A83 $9A73: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A84 $9A74: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055A85 $9A75: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A86 $9A76: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055A87 $9A77: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055A88 $9A78: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055A89 $9A79: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055A8A $9A7A: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055A8B $9A7B: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055A8C $9A7C: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055A8D $9A7D: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055A8E $9A7E: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055A8F $9A7F: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055A90 $9A80: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A91 $9A81: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A92 $9A82: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055A93 $9A83: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055A94 $9A84: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055A95 $9A85: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055A96 $9A86: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055A97 $9A87: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055A98 $9A88: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A99 $9A89: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A9A $9A8A: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A9B $9A8B: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A9C $9A8C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A9D $9A8D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A9E $9A8E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055A9F $9A8F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AA0 $9A90: C-----  F9 C9 89 SBC  $89C9,Y
  0x055AA3 $9A93: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x055AA4 $9A94: C-----  F5 15    SBC  $15,X
  0x055AA6 $9A96: C-----  15 6F    ORA  $6F,X
  0x055AA8 $9A98: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AA9 $9A99: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AAA $9A9A: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AAB $9A9B: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055AAC $9A9C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055AAD $9A9D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055AAE $9A9E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055AAF $9A9F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055AB0 $9AA0: C-----  75 5D    ADC  $5D,X
  0x055AB2 $9AA2: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055AB3 $9AA3: C-----  55 D5    EOR  $D5,X
  0x055AB5 $9AA5: C-----  75 5D    ADC  $5D,X
  0x055AB7 $9AA7: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055AB8 $9AA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AB9 $9AA9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055ABA $9AAA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055ABB $9AAB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055ABC $9AAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055ABD $9AAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055ABE $9AAE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055ABF $9AAF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AC0 $9AB0: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055AC1 $9AB1: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055AC2 $9AB2: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055AC3 $9AB3: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055AC4 $9AB4: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055AC5 $9AB5: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055AC6 $9AB6: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055AC7 $9AB7: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055AC8 $9AB8: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AC9 $9AB9: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055ACA $9ABA: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055ACB $9ABB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055ACC $9ABC: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055ACD $9ABD: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055ACE $9ABE: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055ACF $9ABF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AD0 $9AC0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055AD1 $9AC1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055AD2 $9AC2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055AD3 $9AC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AD4 $9AC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AD5 $9AC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AD6 $9AC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AD7 $9AC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AD8 $9AC8: C-----  E5 25    SBC  $25
  0x055ADA $9ACA: C-----  25 FD    AND  $FD
  0x055ADC $9ACC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055ADD $9ACD: C-----  00       BRK  
  0x055ADE $9ACE: C-----  00       BRK  
  0x055ADF $9ACF: C-----  00       BRK  
  0x055AE0 $9AD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AE1 $9AD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AE2 $9AD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AE3 $9AD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AE4 $9AD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AE5 $9AD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AE6 $9AD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AE7 $9AD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055AE8 $9AD8: C-----  D5 75    CMP  $75,X
  0x055AEA $9ADA: C-----  5D 57 D5 EOR  $D557,X
  0x055AED $9ADD: C-----  75 1D    ADC  $1D,X
  0x055AEF $9ADF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055AF0 $9AE0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AF1 $9AE1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AF2 $9AE2: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AF3 $9AE3: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AF4 $9AE4: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AF5 $9AE5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AF6 $9AE6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AF7 $9AE7: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055AF8 $9AE8: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055AF9 $9AE9: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055AFA $9AEA: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055AFB $9AEB: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055AFC $9AEC: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055AFD $9AED: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055AFE $9AEE: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055AFF $9AEF: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055B00 $9AF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B01 $9AF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B02 $9AF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B03 $9AF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B04 $9AF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B05 $9AF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B06 $9AF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B07 $9AF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B08 $9AF8: C-----  01 00    ORA  ($00,X)
  0x055B0A $9AFA: C-----  00       BRK  
  0x055B0B $9AFB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B0C $9AFC: C-----  00       BRK  
  0x055B0D $9AFD: C-----  00       BRK  
  0x055B0E $9AFE: C-----  00       BRK  
  0x055B0F $9AFF: C-----  00       BRK  
  0x055B10 $9B00: C-----  FE 22 22 INC  $2222,X
  0x055B13 $9B03: C-----  45 FD    EOR  $FD
  0x055B15 $9B05: C-----  45 45    EOR  $45
  0x055B17 $9B07: C-----  C9 FE    CMP  #$FE
  0x055B19 $9B09: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055B1A $9B0A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055B1B $9B0B: C-----  45 FD    EOR  $FD
  0x055B1D $9B0D: C-----  45 45    EOR  $45
  0x055B1F $9B0F: C-----  C9 D3    CMP  #$D3
  0x055B21 $9B11: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055B22 $9B12: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B23 $9B13: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055B24 $9B14: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B25 $9B15: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055B26 $9B16: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B27 $9B17: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055B28 $9B18: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B29 $9B19: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055B2A $9B1A: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B2B $9B1B: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055B2C $9B1C: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B2D $9B1D: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055B2E $9B1E: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B2F $9B1F: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055B30 $9B20: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055B31 $9B21: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x055B32 $9B22: C-----  6D D5 DF ADC  $DFD5
  0x055B35 $9B25: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x055B36 $9B26: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055B37 $9B27: C-----  9D EF 65 STA  $65EF,X
  0x055B3A $9B2A: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x055B3B $9B2B: C-----  DD DF 55 CMP  $55DF,X
  0x055B3E $9B2E: C-----  5D 9D D3 EOR  $D39D,X
  0x055B41 $9B31: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055B42 $9B32: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B43 $9B33: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055B44 $9B34: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055B45 $9B35: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B46 $9B36: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055B47 $9B37: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B48 $9B38: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B49 $9B39: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055B4A $9B3A: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B4B $9B3B: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x055B4C $9B3C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055B4D $9B3D: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055B4E $9B3E: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055B4F $9B3F: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B50 $9B40: C-----  BD B7 9D LDA  $9DB7,X
  0x055B53 $9B43: C-----  75 77    ADC  $77,X
  0x055B55 $9B45: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x055B56 $9B46: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055B57 $9B47: C-----  5D BD B7 EOR  $B7BD,X
  0x055B5A $9B4A: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x055B5B $9B4B: C-----  1D 75 7F ORA  $7F75,X
  0x055B5E $9B4E: C-----  7D 5D D3 ADC  $D35D,X
  0x055B61 $9B51: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055B62 $9B52: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055B63 $9B53: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055B64 $9B54: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055B65 $9B55: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B66 $9B56: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055B67 $9B57: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B68 $9B58: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B69 $9B59: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055B6A $9B5A: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055B6B $9B5B: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x055B6C $9B5C: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055B6D $9B5D: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055B6E $9B5E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055B6F $9B5F: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055B70 $9B60: C-----  FE FE 22 INC  $22FE,X
  0x055B73 $9B63: C-----  45 FD    EOR  $FD
  0x055B75 $9B65: C-----  45 45    EOR  $45
  0x055B77 $9B67: C-----  C9 FE    CMP  #$FE
  0x055B79 $9B69: C-----  FE FE FD INC  $FDFE,X
  0x055B7C $9B6C: C-----  FD FD FD SBC  $FDFD,X
  0x055B7F $9B6F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055B80 $9B70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B81 $9B71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B82 $9B72: C-----  75 5F    ADC  $5F,X
  0x055B84 $9B74: C-----  55 55    EOR  $55,X
  0x055B86 $9B76: C-----  D5 55    CMP  $55,X
  0x055B88 $9B78: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B89 $9B79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B8A $9B7A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B8B $9B7B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B8C $9B7C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B8D $9B7D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B8E $9B7E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B8F $9B7F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B90 $9B80: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055B91 $9B81: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055B92 $9B82: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055B93 $9B83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B94 $9B84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B95 $9B85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B96 $9B86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B97 $9B87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B98 $9B88: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055B99 $9B89: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055B9A $9B8A: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x055B9B $9B8B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055B9C $9B8C: C-----  00       BRK  
  0x055B9D $9B8D: C-----  00       BRK  
  0x055B9E $9B8E: C-----  00       BRK  
  0x055B9F $9B8F: C-----  00       BRK  
  0x055BA0 $9B90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BA1 $9B91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BA2 $9B92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BA3 $9B93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BA4 $9B94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BA5 $9B95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BA6 $9B96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BA7 $9B97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BA8 $9B98: C-----  00       BRK  
  0x055BA9 $9B99: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055BAA $9B9A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x055BAB $9B9B: C-----  00       BRK  
  0x055BAC $9B9C: C-----  00       BRK  
  0x055BAD $9B9D: C-----  00       BRK  
  0x055BAE $9B9E: C-----  00       BRK  
  0x055BAF $9B9F: C-----  00       BRK  
  0x055BB0 $9BA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BB1 $9BA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BB2 $9BA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BB3 $9BA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BB4 $9BA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BB5 $9BA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BB6 $9BA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BB7 $9BA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BB8 $9BA8: C-----  00       BRK  
  0x055BB9 $9BA9: C-----  00       BRK  
  0x055BBA $9BAA: C-----  00       BRK  
  0x055BBB $9BAB: C-----  00       BRK  
  0x055BBC $9BAC: C-----  00       BRK  
  0x055BBD $9BAD: C-----  00       BRK  
  0x055BBE $9BAE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055BBF $9BAF: C-----  E0 FF    CPX  #$FF
  0x055BC1 $9BB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BC2 $9BB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BC3 $9BB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BC4 $9BB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BC5 $9BB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BC6 $9BB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BC7 $9BB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BC8 $9BB8: C-----  00       BRK  
  0x055BC9 $9BB9: C-----  00       BRK  
  0x055BCA $9BBA: C-----  00       BRK  
  0x055BCB $9BBB: C-----  00       BRK  
  0x055BCC $9BBC: C-----  00       BRK  
  0x055BCD $9BBD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055BCE $9BBE: C-----  C0 00    CPY  #$00
  0x055BD0 $9BC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BD1 $9BC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BD2 $9BC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BD3 $9BC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BD4 $9BC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BD5 $9BC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BD6 $9BC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BD7 $9BC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BD8 $9BC8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055BD9 $9BC9: C-----  F8       SED  
  0x055BDA $9BCA: C-----  00       BRK  
  0x055BDB $9BCB: C-----  00       BRK  
  0x055BDC $9BCC: C-----  00       BRK  
  0x055BDD $9BCD: C-----  00       BRK  
  0x055BDE $9BCE: C-----  00       BRK  
  0x055BDF $9BCF: C-----  00       BRK  
  0x055BE0 $9BD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BE1 $9BD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BE2 $9BD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BE3 $9BD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BE4 $9BD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BE5 $9BD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BE6 $9BD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BE7 $9BD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BE8 $9BD8: C-----  F0 00    BEQ  $9BDA
  0x055BEA $9BDA: C-----  00       BRK  
  0x055BEB $9BDB: C-----  00       BRK  
  0x055BEC $9BDC: C-----  00       BRK  
  0x055BED $9BDD: C-----  00       BRK  
  0x055BEE $9BDE: C-----  00       BRK  
  0x055BEF $9BDF: C-----  00       BRK  
  0x055BF0 $9BE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BF1 $9BE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BF2 $9BE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BF3 $9BE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BF4 $9BE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BF5 $9BE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BF6 $9BE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BF7 $9BE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055BF8 $9BE8: C-----  00       BRK  
  0x055BF9 $9BE9: C-----  00       BRK  
  0x055BFA $9BEA: C-----  00       BRK  
  0x055BFB $9BEB: C-----  00       BRK  
  0x055BFC $9BEC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055BFD $9BED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055BFE $9BEE: C-----  00       BRK  
  0x055BFF $9BEF: C-----  00       BRK  
  0x055C00 $9BF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C01 $9BF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C02 $9BF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C03 $9BF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C04 $9BF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C05 $9BF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C06 $9BF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C07 $9BF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C08 $9BF8: C-----  00       BRK  
  0x055C09 $9BF9: C-----  00       BRK  
  0x055C0A $9BFA: C-----  01 FE    ORA  ($FE,X)
  0x055C0C $9BFC: C-----  00       BRK  
  0x055C0D $9BFD: C-----  00       BRK  
  0x055C0E $9BFE: C-----  00       BRK  
  0x055C0F $9BFF: C-----  00       BRK  
  0x055C10 $9C00: C-----  00       BRK  
  0x055C11 $9C01: C-----  00       BRK  
  0x055C12 $9C02: C-----  00       BRK  
  0x055C13 $9C03: C-----  00       BRK  
  0x055C14 $9C04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C15 $9C05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C16 $9C06: C-----  00       BRK  
  0x055C17 $9C07: C-----  88       DEY  
  0x055C18 $9C08: C-----  00       BRK  
  0x055C19 $9C09: C-----  00       BRK  
  0x055C1A $9C0A: C-----  00       BRK  
  0x055C1B $9C0B: C-----  00       BRK  
  0x055C1C $9C0C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C1D $9C0D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C1E $9C0E: C-----  00       BRK  
  0x055C1F $9C0F: C-----  88       DEY  
  0x055C20 $9C10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C21 $9C11: C-----  88       DEY  
  0x055C22 $9C12: C-----  88       DEY  
  0x055C23 $9C13: C-----  11 FF    ORA  ($FF),Y
  0x055C25 $9C15: C-----  11 11    ORA  ($11),Y
  0x055C27 $9C17: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055C28 $9C18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C29 $9C19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C2A $9C1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C2B $9C1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C2C $9C1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C2D $9C1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C2E $9C1E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C2F $9C1F: C-----  FE FE FE INC  $FEFE,X
  0x055C32 $9C22: C-----  FE FE FF INC  $FFFE,X
  0x055C35 $9C25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C36 $9C26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C37 $9C27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C38 $9C28: C-----  FE 22 22 INC  $2222,X
  0x055C3B $9C2B: C-----  FE 01 00 INC  $0001,X
  0x055C3E $9C2E: C-----  00       BRK  
  0x055C3F $9C2F: C-----  00       BRK  
  0x055C40 $9C30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C41 $9C31: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x055C42 $9C32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C43 $9C33: C-----  BA       TSX  
  0x055C44 $9C34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C45 $9C35: C-----  00       BRK  
  0x055C46 $9C36: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x055C47 $9C37: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x055C48 $9C38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C49 $9C39: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055C4A $9C3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C4B $9C3B: C-----  C9 FF    CMP  #$FF
  0x055C4D $9C3D: C-----  00       BRK  
  0x055C4E $9C3E: C-----  D5 2A    CMP  $2A,X
  0x055C50 $9C40: C-----  00       BRK  
  0x055C51 $9C41: C-----  00       BRK  
  0x055C52 $9C42: C-----  00       BRK  
  0x055C53 $9C43: C-----  00       BRK  
  0x055C54 $9C44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C55 $9C45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C56 $9C46: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055C57 $9C47: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x055C58 $9C48: C-----  00       BRK  
  0x055C59 $9C49: C-----  00       BRK  
  0x055C5A $9C4A: C-----  00       BRK  
  0x055C5B $9C4B: C-----  00       BRK  
  0x055C5C $9C4C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C5D $9C4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C5E $9C4E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055C5F $9C4F: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x055C60 $9C50: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x055C61 $9C51: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x055C62 $9C52: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055C63 $9C53: C-----  7D 7E 7F ADC  $7F7E,X
  0x055C66 $9C56: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055C67 $9C57: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055C68 $9C58: C-----  D8       CLD  
  0x055C69 $9C59: C-----  CC C6 C3 CPY  $C3C6
  0x055C6C $9C5C: C-----  C1 C0    CMP  ($C0,X)
  0x055C6E $9C5E: C-----  C0 C0    CPY  #$C0
  0x055C70 $9C60: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055C71 $9C61: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x055C72 $9C62: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x055C73 $9C63: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x055C74 $9C64: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055C75 $9C65: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055C76 $9C66: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055C77 $9C67: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055C78 $9C68: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055C79 $9C69: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x055C7A $9C6A: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055C7B $9C6B: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x055C7C $9C6C: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055C7D $9C6D: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055C7E $9C6E: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055C7F $9C6F: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055C80 $9C70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C81 $9C71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C82 $9C72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C83 $9C73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C84 $9C74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C85 $9C75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C86 $9C76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C87 $9C77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C88 $9C78: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055C89 $9C79: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055C8A $9C7A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055C8B $9C7B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055C8C $9C7C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055C8D $9C7D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055C8E $9C7E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055C8F $9C7F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055C90 $9C80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055C91 $9C81: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x055C92 $9C82: C-----  6E F4 FF ROR  $FFF4
  0x055C95 $9C85: C-----  C6 5F    DEC  $5F
  0x055C97 $9C87: C-----  99 FF 63 STA  $63FF,Y
  0x055C9A $9C8A: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x055C9B $9C8B: C-----  CC FF 65 CPY  $65FF
  0x055C9E $9C8E: C-----  65 88    ADC  $88
  0x055CA0 $9C90: C-----  FE 3A 2A INC  $2A3A,X
  0x055CA3 $9C93: C-----  7D FD ED ADC  $EDFD,X
  0x055CA6 $9C96: C-----  7D C9 FE ADC  $FEC9,X
  0x055CA9 $9C99: C-----  AE B2 D5 LDX  $D5B2
  0x055CAC $9C9C: C-----  FD 6D C5 SBC  $C56D,X
  0x055CAF $9C9F: C-----  A9 FF    LDA  #$FF
  0x055CB1 $9CA1: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x055CB2 $9CA2: C-----  CC F1 FF CPY  $FFF1
  0x055CB5 $9CA5: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055CB6 $9CA6: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x055CB7 $9CA7: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x055CB8 $9CA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055CB9 $9CA9: C-----  E9 9A    SBC  #$9A
  0x055CBB $9CAB: C-----  99 FF 31 STA  $31FF,Y
  0x055CBE $9CAE: C-----  35 22    AND  $22,X
  0x055CC0 $9CB0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055CC1 $9CB1: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x055CC2 $9CB2: C-----  C9 F5    CMP  #$F5
  0x055CC4 $9CB4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055CC5 $9CB5: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x055CC6 $9CB6: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x055CC7 $9CB7: C-----  25 FB    AND  $FB
  0x055CC9 $9CB9: C-----  E9 9B    SBC  #$9B
  0x055CCB $9CBB: C-----  95 F7    STA  $F7,X
  0x055CCD $9CBD: C-----  15 15    ORA  $15,X
  0x055CCF $9CBF: C-----  25 D3    AND  $D3
  0x055CD1 $9CC1: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055CD2 $9CC2: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055CD3 $9CC3: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055CD4 $9CC4: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055CD5 $9CC5: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055CD6 $9CC6: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055CD7 $9CC7: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055CD8 $9CC8: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055CD9 $9CC9: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055CDA $9CCA: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x055CDB $9CCB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055CDC $9CCC: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055CDD $9CCD: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055CDE $9CCE: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055CDF $9CCF: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x055CE0 $9CD0: C-----  00       BRK  
  0x055CE1 $9CD1: C-----  00       BRK  
  0x055CE2 $9CD2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x055CE3 $9CD3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x055CE4 $9CD4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x055CE5 $9CD5: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055CE6 $9CD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055CE7 $9CD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055CE8 $9CD8: C-----  FD BD B8 SBC  $B8BD,X
  0x055CEB $9CDB: C-----  18       CLC  
  0x055CEC $9CDC: C-----  10 00    BPL  $9CDE
  0x055CEE $9CDE: C-----  00       BRK  
  0x055CEF $9CDF: C-----  00       BRK  
  0x055CF0 $9CE0: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055CF1 $9CE1: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055CF2 $9CE2: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x055CF3 $9CE3: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055CF4 $9CE4: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055CF5 $9CE5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055CF6 $9CE6: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055CF7 $9CE7: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055CF8 $9CE8: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x055CF9 $9CE9: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x055CFA $9CEA: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055CFB $9CEB: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055CFC $9CEC: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055CFD $9CED: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055CFE $9CEE: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055CFF $9CEF: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055D00 $9CF0: C-----  BC FF EF LDY  $EFFF,X
  0x055D03 $9CF3: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x055D04 $9CF4: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x055D05 $9CF5: C-----  01 00    ORA  ($00,X)
  0x055D07 $9CF7: C-----  00       BRK  
  0x055D08 $9CF8: C-----  00       BRK  
  0x055D09 $9CF9: C-----  00       BRK  
  0x055D0A $9CFA: C-----  00       BRK  
  0x055D0B $9CFB: C-----  10 30    BPL  $9D2D
  0x055D0D $9CFD: C-----  78       SEI  
  0x055D0E $9CFE: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x055D0F $9CFF: C-----  FE FF FF INC  $FFFF,X
  0x055D12 $9D02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D13 $9D03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D14 $9D04: C-----  BE 7D C3 LDX  $C37D,Y
  0x055D17 $9D07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D18 $9D08: C-----  00       BRK  
  0x055D19 $9D09: C-----  00       BRK  
  0x055D1A $9D0A: C-----  00       BRK  
  0x055D1B $9D0B: C-----  01 C3    ORA  ($C3,X)
  0x055D1D $9D0D: C-----  FE 3C 00 INC  $003C,X
  0x055D20 $9D10: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055D21 $9D11: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055D22 $9D12: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x055D23 $9D13: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x055D24 $9D14: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x055D25 $9D15: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055D26 $9D16: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055D27 $9D17: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x055D28 $9D18: C-----  C0 C0    CPY  #$C0
  0x055D2A $9D1A: C-----  E0 F0    CPX  #$F0
  0x055D2C $9D1C: C-----  F0 F0    BEQ  $9D0E
  0x055D2E $9D1E: C-----  F0 D8    BEQ  $9CF8
  0x055D30 $9D20: C-----  FE FE FA INC  $FAFE,X
  0x055D33 $9D23: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x055D34 $9D24: C-----  F6 F8    INC  $F8,X
  0x055D36 $9D26: C-----  F8       SED  
  0x055D37 $9D27: C-----  F6 03    INC  $03,X
  0x055D39 $9D29: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055D3A $9D2A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055D3B $9D2B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055D3C $9D2C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055D3D $9D2D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055D3E $9D2E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055D3F $9D2F: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x055D40 $9D30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D41 $9D31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D42 $9D32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D43 $9D33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D44 $9D34: C-----  7D BE C3 ADC  $C3BE,X
  0x055D47 $9D37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D48 $9D38: C-----  00       BRK  
  0x055D49 $9D39: C-----  00       BRK  
  0x055D4A $9D3A: C-----  00       BRK  
  0x055D4B $9D3B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055D4C $9D3C: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x055D4D $9D3D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055D4E $9D3E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x055D4F $9D3F: C-----  00       BRK  
  0x055D50 $9D40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D51 $9D41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D52 $9D42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D53 $9D43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D54 $9D44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D55 $9D45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D56 $9D46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D57 $9D47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D58 $9D48: C-----  E0 E0    CPX  #$E0
  0x055D5A $9D4A: C-----  E0 E0    CPX  #$E0
  0x055D5C $9D4C: C-----  E0 E0    CPX  #$E0
  0x055D5E $9D4E: C-----  E0 E0    CPX  #$E0
  0x055D60 $9D50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D61 $9D51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D62 $9D52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D63 $9D53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D64 $9D54: C-----  00       BRK  
  0x055D65 $9D55: C-----  00       BRK  
  0x055D66 $9D56: C-----  00       BRK  
  0x055D67 $9D57: C-----  00       BRK  
  0x055D68 $9D58: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D69 $9D59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D6A $9D5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D6B $9D5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D6C $9D5C: C-----  00       BRK  
  0x055D6D $9D5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D6E $9D5E: C-----  00       BRK  
  0x055D6F $9D5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D70 $9D60: C-----  F6 EE    INC  $EE,X
  0x055D72 $9D62: C-----  DE BE 7E DEC  $7EBE,X
  0x055D75 $9D65: C-----  FE FE FE INC  $FEFE,X
  0x055D78 $9D68: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x055D79 $9D69: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x055D7A $9D6A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x055D7B $9D6B: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x055D7C $9D6C: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x055D7D $9D6D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055D7E $9D6E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055D7F $9D6F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055D80 $9D70: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055D81 $9D71: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055D82 $9D72: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055D83 $9D73: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055D84 $9D74: C-----  00       BRK  
  0x055D85 $9D75: C-----  00       BRK  
  0x055D86 $9D76: C-----  00       BRK  
  0x055D87 $9D77: C-----  00       BRK  
  0x055D88 $9D78: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055D89 $9D79: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055D8A $9D7A: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055D8B $9D7B: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x055D8C $9D7C: C-----  00       BRK  
  0x055D8D $9D7D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D8E $9D7E: C-----  00       BRK  
  0x055D8F $9D7F: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x055D90 $9D80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D91 $9D81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D92 $9D82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D93 $9D83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D94 $9D84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D95 $9D85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D96 $9D86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D97 $9D87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D98 $9D88: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D99 $9D89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D9A $9D8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D9B $9D8B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D9C $9D8C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D9D $9D8D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D9E $9D8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055D9F $9D8F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DA0 $9D90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DA1 $9D91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DA2 $9D92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DA3 $9D93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DA4 $9D94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DA5 $9D95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DA6 $9D96: C-----  00       BRK  
  0x055DA7 $9D97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DA8 $9D98: C-----  00       BRK  
  0x055DA9 $9D99: C-----  00       BRK  
  0x055DAA $9D9A: C-----  00       BRK  
  0x055DAB $9D9B: C-----  00       BRK  
  0x055DAC $9D9C: C-----  00       BRK  
  0x055DAD $9D9D: C-----  00       BRK  
  0x055DAE $9D9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DAF $9D9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DB0 $9DA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DB1 $9DA1: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055DB2 $9DA2: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x055DB3 $9DA3: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x055DB4 $9DA4: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x055DB5 $9DA5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055DB6 $9DA6: C-----  00       BRK  
  0x055DB7 $9DA7: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055DB8 $9DA8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055DB9 $9DA9: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x055DBA $9DAA: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x055DBB $9DAB: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x055DBC $9DAC: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055DBD $9DAD: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055DBE $9DAE: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055DBF $9DAF: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055DC0 $9DB0: C-----  00       BRK  
  0x055DC1 $9DB1: C-----  00       BRK  
  0x055DC2 $9DB2: C-----  00       BRK  
  0x055DC3 $9DB3: C-----  00       BRK  
  0x055DC4 $9DB4: C-----  00       BRK  
  0x055DC5 $9DB5: C-----  00       BRK  
  0x055DC6 $9DB6: C-----  00       BRK  
  0x055DC7 $9DB7: C-----  00       BRK  
  0x055DC8 $9DB8: C-----  FE 05 0A INC  $0A05,X
  0x055DCB $9DBB: C-----  00       BRK  
  0x055DCC $9DBC: C-----  AA       TAX  
  0x055DCD $9DBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DCE $9DBE: C-----  55 00    EOR  $00,X
  0x055DD0 $9DC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DD1 $9DC1: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055DD2 $9DC2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x055DD3 $9DC3: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x055DD4 $9DC4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x055DD5 $9DC5: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x055DD6 $9DC6: C-----  00       BRK  
  0x055DD7 $9DC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DD8 $9DC8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055DD9 $9DC9: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x055DDA $9DCA: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x055DDB $9DCB: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x055DDC $9DCC: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x055DDD $9DCD: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055DDE $9DCE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DDF $9DCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DE0 $9DD0: C-----  00       BRK  
  0x055DE1 $9DD1: C-----  00       BRK  
  0x055DE2 $9DD2: C-----  00       BRK  
  0x055DE3 $9DD3: C-----  00       BRK  
  0x055DE4 $9DD4: C-----  00       BRK  
  0x055DE5 $9DD5: C-----  00       BRK  
  0x055DE6 $9DD6: C-----  00       BRK  
  0x055DE7 $9DD7: C-----  00       BRK  
  0x055DE8 $9DD8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DE9 $9DD9: C-----  00       BRK  
  0x055DEA $9DDA: C-----  00       BRK  
  0x055DEB $9DDB: C-----  00       BRK  
  0x055DEC $9DDC: C-----  AA       TAX  
  0x055DED $9DDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DEE $9DDE: C-----  55 00    EOR  $00,X
  0x055DF0 $9DE0: C-----  00       BRK  
  0x055DF1 $9DE1: C-----  00       BRK  
  0x055DF2 $9DE2: C-----  00       BRK  
  0x055DF3 $9DE3: C-----  00       BRK  
  0x055DF4 $9DE4: C-----  00       BRK  
  0x055DF5 $9DE5: C-----  00       BRK  
  0x055DF6 $9DE6: C-----  00       BRK  
  0x055DF7 $9DE7: C-----  00       BRK  
  0x055DF8 $9DE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DF9 $9DE9: C-----  40       RTI  
  0x055DFA $9DEA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055DFB $9DEB: C-----  00       BRK  
  0x055DFC $9DEC: C-----  AA       TAX  
  0x055DFD $9DED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055DFE $9DEE: C-----  55 00    EOR  $00,X
  0x055E00 $9DF0: ------  .byte $00
  0x055E01 $9DF1: ------  .byte $7E
  0x055E02 $9DF2: ------  .byte $42
  0x055E03 $9DF3: ------  .byte $42
  0x055E04 $9DF4: ------  .byte $42
  0x055E05 $9DF5: ------  .byte $42
  0x055E06 $9DF6: ------  .byte $7E
  0x055E07 $9DF7: ------  .byte $00
  0x055E08 $9DF8: ------  .byte $00
  0x055E09 $9DF9: ------  .byte $7E
  0x055E0A $9DFA: ------  .byte $42
  0x055E0B $9DFB: ------  .byte $42
  0x055E0C $9DFC: ------  .byte $42
  0x055E0D $9DFD: ------  .byte $42
  0x055E0E $9DFE: ------  .byte $7E
  0x055E0F $9DFF: ------  .byte $00
  0x055E10 $9E00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E11 $9E01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E12 $9E02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E13 $9E03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E14 $9E04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E15 $9E05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E16 $9E06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E17 $9E07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E18 $9E08: C-----  00       BRK  
  0x055E19 $9E09: C-----  00       BRK  
  0x055E1A $9E0A: C-----  00       BRK  
  0x055E1B $9E0B: C-----  00       BRK  
  0x055E1C $9E0C: C-----  00       BRK  
  0x055E1D $9E0D: C-----  00       BRK  
  0x055E1E $9E0E: C-----  00       BRK  
  0x055E1F $9E0F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055E20 $9E10: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055E21 $9E11: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055E22 $9E12: C-----  25 55    AND  $55
  0x055E24 $9E14: C-----  DD 57 55 CMP  $5557,X
  0x055E27 $9E17: C-----  95 EF    STA  $EF,X
  0x055E29 $9E19: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055E2A $9E1A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x055E2B $9E1B: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x055E2C $9E1C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x055E2D $9E1D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x055E2E $9E1E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x055E2F $9E1F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x055E30 $9E20: C-----  00       BRK  
  0x055E31 $9E21: C-----  00       BRK  
  0x055E32 $9E22: C-----  00       BRK  
  0x055E33 $9E23: C-----  00       BRK  
  0x055E34 $9E24: C-----  00       BRK  
  0x055E35 $9E25: C-----  00       BRK  
  0x055E36 $9E26: C-----  00       BRK  
  0x055E37 $9E27: C-----  00       BRK  
  0x055E38 $9E28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E39 $9E29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E3A $9E2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E3B $9E2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E3C $9E2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E3D $9E2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E3E $9E2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E3F $9E2F: C-----  00       BRK  
  0x055E40 $9E30: C-----  B5 9D    LDA  $9D,X
  0x055E42 $9E32: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x055E43 $9E33: C-----  55 55    EOR  $55,X
  0x055E45 $9E35: C-----  75 5D    ADC  $5D,X
  0x055E47 $9E37: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x055E48 $9E38: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x055E49 $9E39: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x055E4A $9E3A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x055E4B $9E3B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055E4C $9E3C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055E4D $9E3D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055E4E $9E3E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055E4F $9E3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055E50 $9E40: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E51 $9E41: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E52 $9E42: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055E53 $9E43: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055E54 $9E44: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055E55 $9E45: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x055E56 $9E46: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x055E57 $9E47: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x055E58 $9E48: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E59 $9E49: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E5A $9E4A: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E5B $9E4B: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E5C $9E4C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E5D $9E4D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E5E $9E4E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E5F $9E4F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x055E60 $9E50: ------  .byte $00
  0x055E61 $9E51: ------  .byte $7E
  0x055E62 $9E52: ------  .byte $42
  0x055E63 $9E53: ------  .byte $42
  0x055E64 $9E54: ------  .byte $42
  0x055E65 $9E55: ------  .byte $42
  0x055E66 $9E56: ------  .byte $7E
  0x055E67 $9E57: ------  .byte $00
  0x055E68 $9E58: ------  .byte $00
  0x055E69 $9E59: ------  .byte $7E
  0x055E6A $9E5A: ------  .byte $42
  0x055E6B $9E5B: ------  .byte $42
  0x055E6C $9E5C: ------  .byte $42
  0x055E6D $9E5D: ------  .byte $42
  0x055E6E $9E5E: ------  .byte $7E
  0x055E6F $9E5F: ------  .byte $00
  0x055E70 $9E60: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055E71 $9E61: C-----  06 0F    ASL  $0F
  0x055E73 $9E63: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x055E74 $9E64: C-----  06 03    ASL  $03
  0x055E76 $9E66: C-----  01 03    ORA  ($03,X)
  0x055E78 $9E68: C-----  E0 F0    CPX  #$F0
  0x055E7A $9E6A: C-----  C0 E0    CPY  #$E0
  0x055E7C $9E6C: C-----  F0 F8    BEQ  $9E66
  0x055E7E $9E6E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x055E7F $9E6F: C-----  F0 F0    BEQ  $9E61
  0x055E81 $9E71: C-----  F0 F8    BEQ  $9E6B
  0x055E83 $9E73: C-----  78       SEI  
  0x055E84 $9E74: C-----  E0 C0    CPX  #$C0
  0x055E86 $9E76: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055E87 $9E77: C-----  C0 07    CPY  #$07
  0x055E89 $9E79: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055E8A $9E7A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055E8B $9E7B: C-----  00       BRK  
  0x055E8C $9E7C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055E8D $9E7D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055E8E $9E7E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x055E8F $9E7F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x055E90 $9E80: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x055E91 $9E81: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055E92 $9E82: C-----  00       BRK  
  0x055E93 $9E83: C-----  00       BRK  
  0x055E94 $9E84: C-----  00       BRK  
  0x055E95 $9E85: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x055E96 $9E86: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055E97 $9E87: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055E98 $9E88: C-----  00       BRK  
  0x055E99 $9E89: C-----  00       BRK  
  0x055E9A $9E8A: C-----  00       BRK  
  0x055E9B $9E8B: C-----  00       BRK  
  0x055E9C $9E8C: C-----  00       BRK  
  0x055E9D $9E8D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x055E9E $9E8E: C-----  00       BRK  
  0x055E9F $9E8F: C-----  00       BRK  
  0x055EA0 $9E90: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x055EA1 $9E91: C-----  45 01    EOR  $01
  0x055EA3 $9E93: C-----  00       BRK  
  0x055EA4 $9E94: C-----  01 00    ORA  ($00,X)
  0x055EA6 $9E96: C-----  00       BRK  
  0x055EA7 $9E97: C-----  50 00    BVC  $9E99
  0x055EA9 $9E99: C-----  00       BRK  
  0x055EAA $9E9A: C-----  00       BRK  
  0x055EAB $9E9B: C-----  00       BRK  
  0x055EAC $9E9C: C-----  00       BRK  
  0x055EAD $9E9D: C-----  00       BRK  
  0x055EAE $9E9E: C-----  00       BRK  
  0x055EAF $9E9F: C-----  50 09    BVC  $9EAA
  0x055EB1 $9EA1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055EB2 $9EA2: C-----  26 02    ROL  $02
  0x055EB4 $9EA4: C-----  01 00    ORA  ($00,X)
  0x055EB6 $9EA6: C-----  00       BRK  
  0x055EB7 $9EA7: C-----  94 09    STY  $09,X
  0x055EB9 $9EA9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055EBA $9EAA: C-----  26 02    ROL  $02
  0x055EBC $9EAC: C-----  01 00    ORA  ($00,X)
  0x055EBE $9EAE: C-----  00       BRK  
  0x055EBF $9EAF: C-----  00       BRK  
  0x055EC0 $9EB0: C-----  00       BRK  
  0x055EC1 $9EB1: C-----  00       BRK  
  0x055EC2 $9EB2: C-----  11 00    ORA  ($00),Y
  0x055EC4 $9EB4: C-----  00       BRK  
  0x055EC5 $9EB5: C-----  01 83    ORA  ($83,X)
  0x055EC7 $9EB7: C-----  09 00    ORA  #$00
  0x055EC9 $9EB9: C-----  00       BRK  
  0x055ECA $9EBA: C-----  10 00    BPL  $9EBC
  0x055ECC $9EBC: C-----  00       BRK  
  0x055ECD $9EBD: C-----  00       BRK  
  0x055ECE $9EBE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055ECF $9EBF: C-----  00       BRK  
  0x055ED0 $9EC0: C-----  00       BRK  
  0x055ED1 $9EC1: C-----  00       BRK  
  0x055ED2 $9EC2: C-----  00       BRK  
  0x055ED3 $9EC3: C-----  00       BRK  
  0x055ED4 $9EC4: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x055ED5 $9EC5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055ED6 $9EC6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055ED7 $9EC7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055ED8 $9EC8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x055ED9 $9EC9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x055EDA $9ECA: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x055EDB $9ECB: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x055EDC $9ECC: C-----  E0 F0    CPX  #$F0
  0x055EDE $9ECE: C-----  F8       SED  
  0x055EDF $9ECF: C-----  F8       SED  
  0x055EE0 $9ED0: C-----  00       BRK  
  0x055EE1 $9ED1: C-----  00       BRK  
  0x055EE2 $9ED2: C-----  00       BRK  
  0x055EE3 $9ED3: C-----  00       BRK  
  0x055EE4 $9ED4: C-----  48       PHA  
  0x055EE5 $9ED5: C-----  F8       SED  
  0x055EE6 $9ED6: C-----  F0 E0    BEQ  $9EB8
  0x055EE8 $9ED8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x055EE9 $9ED9: C-----  FE DD 91 INC  $91DD,X
  0x055EEC $9EDC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055EED $9EDD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055EEE $9EDE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055EEF $9EDF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055EF0 $9EE0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055EF1 $9EE1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x055EF2 $9EE2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x055EF3 $9EE3: C-----  05 01    ORA  $01
  0x055EF5 $9EE5: C-----  00       BRK  
  0x055EF6 $9EE6: C-----  00       BRK  
  0x055EF7 $9EE7: C-----  00       BRK  
  0x055EF8 $9EE8: C-----  F8       SED  
  0x055EF9 $9EE9: C-----  F8       SED  
  0x055EFA $9EEA: C-----  F0 F0    BEQ  $9EDC
  0x055EFC $9EEC: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x055EFD $9EED: C-----  CE BF 7F DEC  $7FBF
  0x055F00 $9EF0: C-----  A0 10    LDY  #$10
  0x055F02 $9EF2: C-----  00       BRK  
  0x055F03 $9EF3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055F04 $9EF4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x055F05 $9EF5: C-----  00       BRK  
  0x055F06 $9EF6: C-----  00       BRK  
  0x055F07 $9EF7: C-----  00       BRK  
  0x055F08 $9EF8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x055F09 $9EF9: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x055F0A $9EFA: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x055F0B $9EFB: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x055F0C $9EFC: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x055F0D $9EFD: C-----  7D FF FF ADC  $FFFF,X
  0x055F10 $9F00: ------  .byte $00
  0x055F11 $9F01: ------  .byte $7E
  0x055F12 $9F02: ------  .byte $42
  0x055F13 $9F03: ------  .byte $42
  0x055F14 $9F04: ------  .byte $42
  0x055F15 $9F05: ------  .byte $42
  0x055F16 $9F06: ------  .byte $7E
  0x055F17 $9F07: ------  .byte $00
  0x055F18 $9F08: ------  .byte $00
  0x055F19 $9F09: ------  .byte $7E
  0x055F1A $9F0A: ------  .byte $42
  0x055F1B $9F0B: ------  .byte $42
  0x055F1C $9F0C: ------  .byte $42
  0x055F1D $9F0D: ------  .byte $42
  0x055F1E $9F0E: ------  .byte $7E
  0x055F1F $9F0F: ------  .byte $00
  0x055F20 $9F10: ------  .byte $00
  0x055F21 $9F11: ------  .byte $7E
  0x055F22 $9F12: ------  .byte $42
  0x055F23 $9F13: ------  .byte $42
  0x055F24 $9F14: ------  .byte $42
  0x055F25 $9F15: ------  .byte $42
  0x055F26 $9F16: ------  .byte $7E
  0x055F27 $9F17: ------  .byte $00
  0x055F28 $9F18: ------  .byte $00
  0x055F29 $9F19: ------  .byte $7E
  0x055F2A $9F1A: ------  .byte $42
  0x055F2B $9F1B: ------  .byte $42
  0x055F2C $9F1C: ------  .byte $42
  0x055F2D $9F1D: ------  .byte $42
  0x055F2E $9F1E: ------  .byte $7E
  0x055F2F $9F1F: ------  .byte $00
  0x055F30 $9F20: ------  .byte $00
  0x055F31 $9F21: ------  .byte $7E
  0x055F32 $9F22: ------  .byte $42
  0x055F33 $9F23: ------  .byte $42
  0x055F34 $9F24: ------  .byte $42
  0x055F35 $9F25: ------  .byte $42
  0x055F36 $9F26: ------  .byte $7E
  0x055F37 $9F27: ------  .byte $00
  0x055F38 $9F28: ------  .byte $00
  0x055F39 $9F29: ------  .byte $7E
  0x055F3A $9F2A: ------  .byte $42
  0x055F3B $9F2B: ------  .byte $42
  0x055F3C $9F2C: ------  .byte $42
  0x055F3D $9F2D: ------  .byte $42
  0x055F3E $9F2E: ------  .byte $7E
  0x055F3F $9F2F: ------  .byte $00
  0x055F40 $9F30: ------  .byte $00
  0x055F41 $9F31: ------  .byte $7E
  0x055F42 $9F32: ------  .byte $42
  0x055F43 $9F33: ------  .byte $42
  0x055F44 $9F34: ------  .byte $42
  0x055F45 $9F35: ------  .byte $42
  0x055F46 $9F36: ------  .byte $7E
  0x055F47 $9F37: ------  .byte $00
  0x055F48 $9F38: ------  .byte $00
  0x055F49 $9F39: ------  .byte $7E
  0x055F4A $9F3A: ------  .byte $42
  0x055F4B $9F3B: ------  .byte $42
  0x055F4C $9F3C: ------  .byte $42
  0x055F4D $9F3D: ------  .byte $42
  0x055F4E $9F3E: ------  .byte $7E
  0x055F4F $9F3F: ------  .byte $00
  0x055F50 $9F40: ------  .byte $00
  0x055F51 $9F41: ------  .byte $7E
  0x055F52 $9F42: ------  .byte $42
  0x055F53 $9F43: ------  .byte $42
  0x055F54 $9F44: ------  .byte $42
  0x055F55 $9F45: ------  .byte $42
  0x055F56 $9F46: ------  .byte $7E
  0x055F57 $9F47: ------  .byte $00
  0x055F58 $9F48: ------  .byte $00
  0x055F59 $9F49: ------  .byte $7E
  0x055F5A $9F4A: ------  .byte $42
  0x055F5B $9F4B: ------  .byte $42
  0x055F5C $9F4C: ------  .byte $42
  0x055F5D $9F4D: ------  .byte $42
  0x055F5E $9F4E: ------  .byte $7E
  0x055F5F $9F4F: ------  .byte $00
  0x055F60 $9F50: ------  .byte $00
  0x055F61 $9F51: ------  .byte $7E
  0x055F62 $9F52: ------  .byte $42
  0x055F63 $9F53: ------  .byte $42
  0x055F64 $9F54: ------  .byte $42
  0x055F65 $9F55: ------  .byte $42
  0x055F66 $9F56: ------  .byte $7E
  0x055F67 $9F57: ------  .byte $00
  0x055F68 $9F58: ------  .byte $00
  0x055F69 $9F59: ------  .byte $7E
  0x055F6A $9F5A: ------  .byte $42
  0x055F6B $9F5B: ------  .byte $42
  0x055F6C $9F5C: ------  .byte $42
  0x055F6D $9F5D: ------  .byte $42
  0x055F6E $9F5E: ------  .byte $7E
  0x055F6F $9F5F: ------  .byte $00
  0x055F70 $9F60: ------  .byte $00
  0x055F71 $9F61: ------  .byte $7E
  0x055F72 $9F62: ------  .byte $42
  0x055F73 $9F63: ------  .byte $42
  0x055F74 $9F64: ------  .byte $42
  0x055F75 $9F65: ------  .byte $42
  0x055F76 $9F66: ------  .byte $7E
  0x055F77 $9F67: ------  .byte $00
  0x055F78 $9F68: ------  .byte $00
  0x055F79 $9F69: ------  .byte $7E
  0x055F7A $9F6A: ------  .byte $42
  0x055F7B $9F6B: ------  .byte $42
  0x055F7C $9F6C: ------  .byte $42
  0x055F7D $9F6D: ------  .byte $42
  0x055F7E $9F6E: ------  .byte $7E
  0x055F7F $9F6F: ------  .byte $00
  0x055F80 $9F70: ------  .byte $00
  0x055F81 $9F71: ------  .byte $7E
  0x055F82 $9F72: ------  .byte $42
  0x055F83 $9F73: ------  .byte $42
  0x055F84 $9F74: ------  .byte $42
  0x055F85 $9F75: ------  .byte $42
  0x055F86 $9F76: ------  .byte $7E
  0x055F87 $9F77: ------  .byte $00
  0x055F88 $9F78: ------  .byte $00
  0x055F89 $9F79: ------  .byte $7E
  0x055F8A $9F7A: ------  .byte $42
  0x055F8B $9F7B: ------  .byte $42
  0x055F8C $9F7C: ------  .byte $42
  0x055F8D $9F7D: ------  .byte $42
  0x055F8E $9F7E: ------  .byte $7E
  0x055F8F $9F7F: ------  .byte $00
  0x055F90 $9F80: ------  .byte $00
  0x055F91 $9F81: ------  .byte $7E
  0x055F92 $9F82: ------  .byte $42
  0x055F93 $9F83: ------  .byte $42
  0x055F94 $9F84: ------  .byte $42
  0x055F95 $9F85: ------  .byte $42
  0x055F96 $9F86: ------  .byte $7E
  0x055F97 $9F87: ------  .byte $00
  0x055F98 $9F88: ------  .byte $00
  0x055F99 $9F89: ------  .byte $7E
  0x055F9A $9F8A: ------  .byte $42
  0x055F9B $9F8B: ------  .byte $42
  0x055F9C $9F8C: ------  .byte $42
  0x055F9D $9F8D: ------  .byte $42
  0x055F9E $9F8E: ------  .byte $7E
  0x055F9F $9F8F: ------  .byte $00
  0x055FA0 $9F90: ------  .byte $00
  0x055FA1 $9F91: ------  .byte $7E
  0x055FA2 $9F92: ------  .byte $42
  0x055FA3 $9F93: ------  .byte $42
  0x055FA4 $9F94: ------  .byte $42
  0x055FA5 $9F95: ------  .byte $42
  0x055FA6 $9F96: ------  .byte $7E
  0x055FA7 $9F97: ------  .byte $00
  0x055FA8 $9F98: ------  .byte $00
  0x055FA9 $9F99: ------  .byte $7E
  0x055FAA $9F9A: ------  .byte $42
  0x055FAB $9F9B: ------  .byte $42
  0x055FAC $9F9C: ------  .byte $42
  0x055FAD $9F9D: ------  .byte $42
  0x055FAE $9F9E: ------  .byte $7E
  0x055FAF $9F9F: ------  .byte $00
  0x055FB0 $9FA0: ------  .byte $00
  0x055FB1 $9FA1: ------  .byte $7E
  0x055FB2 $9FA2: ------  .byte $42
  0x055FB3 $9FA3: ------  .byte $42
  0x055FB4 $9FA4: ------  .byte $42
  0x055FB5 $9FA5: ------  .byte $42
  0x055FB6 $9FA6: ------  .byte $7E
  0x055FB7 $9FA7: ------  .byte $00
  0x055FB8 $9FA8: ------  .byte $00
  0x055FB9 $9FA9: ------  .byte $7E
  0x055FBA $9FAA: ------  .byte $42
  0x055FBB $9FAB: ------  .byte $42
  0x055FBC $9FAC: ------  .byte $42
  0x055FBD $9FAD: ------  .byte $42
  0x055FBE $9FAE: ------  .byte $7E
  0x055FBF $9FAF: ------  .byte $00
  0x055FC0 $9FB0: ------  .byte $00
  0x055FC1 $9FB1: ------  .byte $7E
  0x055FC2 $9FB2: ------  .byte $42
  0x055FC3 $9FB3: ------  .byte $42
  0x055FC4 $9FB4: ------  .byte $42
  0x055FC5 $9FB5: ------  .byte $42
  0x055FC6 $9FB6: ------  .byte $7E
  0x055FC7 $9FB7: ------  .byte $00
  0x055FC8 $9FB8: ------  .byte $00
  0x055FC9 $9FB9: ------  .byte $7E
  0x055FCA $9FBA: ------  .byte $42
  0x055FCB $9FBB: ------  .byte $42
  0x055FCC $9FBC: ------  .byte $42
  0x055FCD $9FBD: ------  .byte $42
  0x055FCE $9FBE: ------  .byte $7E
  0x055FCF $9FBF: ------  .byte $00
  0x055FD0 $9FC0: ------  .byte $00
  0x055FD1 $9FC1: ------  .byte $7E
  0x055FD2 $9FC2: ------  .byte $42
  0x055FD3 $9FC3: ------  .byte $42
  0x055FD4 $9FC4: ------  .byte $42
  0x055FD5 $9FC5: ------  .byte $42
  0x055FD6 $9FC6: ------  .byte $7E
  0x055FD7 $9FC7: ------  .byte $00
  0x055FD8 $9FC8: ------  .byte $00
  0x055FD9 $9FC9: ------  .byte $7E
  0x055FDA $9FCA: ------  .byte $42
  0x055FDB $9FCB: ------  .byte $42
  0x055FDC $9FCC: ------  .byte $42
  0x055FDD $9FCD: ------  .byte $42
  0x055FDE $9FCE: ------  .byte $7E
  0x055FDF $9FCF: ------  .byte $00
  0x055FE0 $9FD0: ------  .byte $00
  0x055FE1 $9FD1: ------  .byte $7E
  0x055FE2 $9FD2: ------  .byte $42
  0x055FE3 $9FD3: ------  .byte $42
  0x055FE4 $9FD4: ------  .byte $42
  0x055FE5 $9FD5: ------  .byte $42
  0x055FE6 $9FD6: ------  .byte $7E
  0x055FE7 $9FD7: ------  .byte $00
  0x055FE8 $9FD8: ------  .byte $00
  0x055FE9 $9FD9: ------  .byte $7E
  0x055FEA $9FDA: ------  .byte $42
  0x055FEB $9FDB: ------  .byte $42
  0x055FEC $9FDC: ------  .byte $42
  0x055FED $9FDD: ------  .byte $42
  0x055FEE $9FDE: ------  .byte $7E
  0x055FEF $9FDF: ------  .byte $00
  0x055FF0 $9FE0: ------  .byte $00
  0x055FF1 $9FE1: ------  .byte $7E
  0x055FF2 $9FE2: ------  .byte $42
  0x055FF3 $9FE3: ------  .byte $42
  0x055FF4 $9FE4: ------  .byte $42
  0x055FF5 $9FE5: ------  .byte $42
  0x055FF6 $9FE6: ------  .byte $7E
  0x055FF7 $9FE7: ------  .byte $00
  0x055FF8 $9FE8: ------  .byte $00
  0x055FF9 $9FE9: ------  .byte $7E
  0x055FFA $9FEA: ------  .byte $42
  0x055FFB $9FEB: ------  .byte $42
  0x055FFC $9FEC: ------  .byte $42
  0x055FFD $9FED: ------  .byte $42
  0x055FFE $9FEE: ------  .byte $7E
  0x055FFF $9FEF: ------  .byte $00
  0x056000 $9FF0: ------  .byte $00
  0x056001 $9FF1: ------  .byte $7E
  0x056002 $9FF2: ------  .byte $42
  0x056003 $9FF3: ------  .byte $42
  0x056004 $9FF4: ------  .byte $42
  0x056005 $9FF5: ------  .byte $42
  0x056006 $9FF6: ------  .byte $7E
  0x056007 $9FF7: ------  .byte $00
  0x056008 $9FF8: ------  .byte $00
  0x056009 $9FF9: ------  .byte $7E
  0x05600A $9FFA: ------  .byte $42
  0x05600B $9FFB: ------  .byte $42
  0x05600C $9FFC: ------  .byte $42
  0x05600D $9FFD: ------  .byte $42
  0x05600E $9FFE: ------  .byte $7E
  0x05600F $9FFF: ------  .byte $00