; ===== MMC3 Bank 47 =====
; ROM: 0x05E010-0x06000F
; CPU: $E000-$FFFF
; CDL: code=7968 data=0 unaccessed=224

  0x05E010 $E000: C-----  00       BRK  
  0x05E011 $E001: C-----  00       BRK  
  0x05E012 $E002: C-----  00       BRK  
  0x05E013 $E003: C-----  00       BRK  
  0x05E014 $E004: C-----  00       BRK  
  0x05E015 $E005: C-----  00       BRK  
  0x05E016 $E006: C-----  00       BRK  
  0x05E017 $E007: C-----  00       BRK  
  0x05E018 $E008: C-----  00       BRK  
  0x05E019 $E009: C-----  00       BRK  
  0x05E01A $E00A: C-----  00       BRK  
  0x05E01B $E00B: C-----  00       BRK  
  0x05E01C $E00C: C-----  00       BRK  
  0x05E01D $E00D: C-----  00       BRK  
  0x05E01E $E00E: C-----  00       BRK  
  0x05E01F $E00F: C-----  00       BRK  
  0x05E020 $E010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E021 $E011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E022 $E012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E023 $E013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E024 $E014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E025 $E015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E026 $E016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E027 $E017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E028 $E018: C-----  00       BRK  
  0x05E029 $E019: C-----  00       BRK  
  0x05E02A $E01A: C-----  00       BRK  
  0x05E02B $E01B: C-----  00       BRK  
  0x05E02C $E01C: C-----  00       BRK  
  0x05E02D $E01D: C-----  00       BRK  
  0x05E02E $E01E: C-----  00       BRK  
  0x05E02F $E01F: C-----  00       BRK  
  0x05E030 $E020: C-----  01 03    ORA  ($03,X)
  0x05E032 $E022: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E033 $E023: C-----  06 04    ASL  $04
  0x05E035 $E025: C-----  05 05    ORA  $05
  0x05E037 $E027: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E038 $E028: C-----  00       BRK  
  0x05E039 $E029: C-----  00       BRK  
  0x05E03A $E02A: C-----  01 01    ORA  ($01,X)
  0x05E03C $E02C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E03D $E02D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E03E $E02E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E03F $E02F: C-----  00       BRK  
  0x05E040 $E030: C-----  81 42    STA  ($42,X)
  0x05E042 $E032: C-----  96 A4    STX  $A4,Y
  0x05E044 $E034: C-----  2D 2D 2F AND  $2F2D
  0x05E047 $E037: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x05E048 $E038: C-----  7E BD 69 ROR  $69BD,X
  0x05E04B $E03B: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x05E04C $E03C: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x05E04D $E03D: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x05E04E $E03E: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05E04F $E03F: C-----  D6 00    DEC  $00,X
  0x05E051 $E041: C-----  00       BRK  
  0x05E052 $E042: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E053 $E043: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05E054 $E044: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x05E055 $E045: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05E056 $E046: C-----  70 C0    BVS  $E008
  0x05E058 $E048: C-----  00       BRK  
  0x05E059 $E049: C-----  00       BRK  
  0x05E05A $E04A: C-----  00       BRK  
  0x05E05B $E04B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E05C $E04C: C-----  00       BRK  
  0x05E05D $E04D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E05E $E04E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E05F $E04F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E060 $E050: C-----  00       BRK  
  0x05E061 $E051: C-----  10 EB    BPL  $E03E
  0x05E063 $E053: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05E064 $E054: C-----  00       BRK  
  0x05E065 $E055: C-----  00       BRK  
  0x05E066 $E056: C-----  08       PHP  
  0x05E067 $E057: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x05E068 $E058: C-----  00       BRK  
  0x05E069 $E059: C-----  00       BRK  
  0x05E06A $E05A: C-----  00       BRK  
  0x05E06B $E05B: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05E06C $E05C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E06D $E05D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E06E $E05E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E06F $E05F: C-----  6D 34 64 ADC  $6434
  0x05E072 $E062: C-----  66 E7    ROR  $E7
  0x05E074 $E064: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05E075 $E065: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05E076 $E066: C-----  F9 FE CB SBC  $CBFE,Y
  0x05E079 $E069: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x05E07A $E06A: C-----  99 58 6C STA  $6C58,Y
  0x05E07D $E06D: C-----  ED F6 F9 SBC  $F9F6
  0x05E080 $E070: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E081 $E071: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x05E082 $E072: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05E083 $E073: C-----  39 9D CE AND  $CE9D,Y
  0x05E086 $E076: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E087 $E077: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05E088 $E078: C-----  F8       SED  
  0x05E089 $E079: C-----  BC CC C6 LDY  $C6CC,X
  0x05E08C $E07C: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x05E08D $E07D: C-----  31 98    AND  ($98),Y
  0x05E08F $E07F: C-----  4C BF 9F JMP  $9FBF
  0x05E092 $E082: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E093 $E083: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E094 $E084: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E095 $E085: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E096 $E086: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E097 $E087: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E098 $E088: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05E099 $E089: C-----  60       RTS  
  0x05E09A $E08A: C-----  C0 80    CPY  #$80
  0x05E09C $E08C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E09D $E08D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E09E $E08E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E09F $E08F: C-----  00       BRK  
  0x05E0A0 $E090: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A1 $E091: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A2 $E092: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A3 $E093: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A4 $E094: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A5 $E095: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A6 $E096: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A7 $E097: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A8 $E098: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0A9 $E099: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E0AA $E09A: C-----  00       BRK  
  0x05E0AB $E09B: C-----  30 00    BMI  $E09D
  0x05E0AD $E09D: C-----  30 30    BMI  $E0CF
  0x05E0AF $E09F: C-----  30 7F    BMI  $E120
  0x05E0B1 $E0A1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E0B2 $E0A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0B3 $E0A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0B4 $E0A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0B5 $E0A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0B6 $E0A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0B7 $E0A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0B8 $E0A8: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x05E0B9 $E0A9: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05E0BA $E0AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E0BB $E0AB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E0BC $E0AC: C-----  FE FE FE INC  $FEFE,X
  0x05E0BF $E0AF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E0C0 $E0B0: C-----  00       BRK  
  0x05E0C1 $E0B1: C-----  00       BRK  
  0x05E0C2 $E0B2: C-----  00       BRK  
  0x05E0C3 $E0B3: C-----  00       BRK  
  0x05E0C4 $E0B4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E0C5 $E0B5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E0C6 $E0B6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E0C7 $E0B7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E0C8 $E0B8: C-----  00       BRK  
  0x05E0C9 $E0B9: C-----  00       BRK  
  0x05E0CA $E0BA: C-----  00       BRK  
  0x05E0CB $E0BB: C-----  00       BRK  
  0x05E0CC $E0BC: C-----  00       BRK  
  0x05E0CD $E0BD: C-----  00       BRK  
  0x05E0CE $E0BE: C-----  00       BRK  
  0x05E0CF $E0BF: C-----  00       BRK  
  0x05E0D0 $E0C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0D1 $E0C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0D2 $E0C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0D3 $E0C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0D4 $E0C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0D5 $E0C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0D6 $E0C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0D7 $E0C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0D8 $E0C8: C-----  E0 08    CPX  #$08
  0x05E0DA $E0CA: C-----  06 03    ASL  $03
  0x05E0DC $E0CC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E0DD $E0CD: C-----  00       BRK  
  0x05E0DE $E0CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E0DF $E0CF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E0E0 $E0D0: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05E0E1 $E0D1: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05E0E2 $E0D2: C-----  EA       NOP  
  0x05E0E3 $E0D3: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x05E0E4 $E0D4: C-----  E6 86    INC  $86
  0x05E0E6 $E0D6: C-----  CA       DEX  
  0x05E0E7 $E0D7: C-----  F6 04    INC  $04,X
  0x05E0E9 $E0D9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E0EA $E0DA: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05E0EB $E0DB: C-----  6C 18 78 JMP  ($7818)
  0x05E0EE $E0DE: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05E0EF $E0DF: C-----  08       PHP  
  0x05E0F0 $E0E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0F1 $E0E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0F2 $E0E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0F3 $E0E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0F4 $E0E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0F5 $E0E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0F6 $E0E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0F7 $E0E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E0F8 $E0E8: C-----  16 3E    ASL  $3E,X
  0x05E0FA $E0EA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E0FB $E0EB: C-----  70 40    BVS  $E12D
  0x05E0FD $E0ED: C-----  00       BRK  
  0x05E0FE $E0EE: C-----  00       BRK  
  0x05E0FF $E0EF: C-----  00       BRK  
  0x05E100 $E0F0: C-----  BE DF EF LDX  $EFDF,Y
  0x05E103 $E0F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E104 $E0F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E105 $E0F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E106 $E0F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E107 $E0F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E108 $E0F8: C-----  CD ED FF CMP  $FFED
  0x05E10B $E0FB: C-----  FE 38 10 INC  $1038,X
  0x05E10E $E0FE: C-----  10 00    BPL  $E100
  0x05E110 $E100: C-----  00       BRK  
  0x05E111 $E101: C-----  00       BRK  
  0x05E112 $E102: C-----  F0 0E    BEQ  $E112
  0x05E114 $E104: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E115 $E105: C-----  10 0C    BPL  $E113
  0x05E117 $E107: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E118 $E108: C-----  00       BRK  
  0x05E119 $E109: C-----  00       BRK  
  0x05E11A $E10A: C-----  00       BRK  
  0x05E11B $E10B: C-----  F0 FC    BEQ  $E109
  0x05E11D $E10D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E11E $E10E: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05E11F $E10F: C-----  F8       SED  
  0x05E120 $E110: C-----  00       BRK  
  0x05E121 $E111: C-----  00       BRK  
  0x05E122 $E112: C-----  00       BRK  
  0x05E123 $E113: C-----  00       BRK  
  0x05E124 $E114: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E125 $E115: C-----  C0 60    CPY  #$60
  0x05E127 $E117: C-----  F0 00    BEQ  $E119
  0x05E129 $E119: C-----  00       BRK  
  0x05E12A $E11A: C-----  00       BRK  
  0x05E12B $E11B: C-----  00       BRK  
  0x05E12C $E11C: C-----  00       BRK  
  0x05E12D $E11D: C-----  00       BRK  
  0x05E12E $E11E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E12F $E11F: C-----  00       BRK  
  0x05E130 $E120: C-----  90 C8    BCC  $E0EA
  0x05E132 $E122: C-----  A8       TAY  
  0x05E133 $E123: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05E134 $E124: C-----  EC E4 F6 CPX  $F6E4
  0x05E137 $E127: C-----  FE 60 30 INC  $3060,X
  0x05E13A $E12A: C-----  50 28    BVC  $E154
  0x05E13C $E12C: C-----  10 18    BPL  $E146
  0x05E13E $E12E: C-----  08       PHP  
  0x05E13F $E12F: C-----  00       BRK  
  0x05E140 $E130: C-----  FE FE 5E INC  $5EFE,X
  0x05E143 $E133: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x05E144 $E134: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E145 $E135: C-----  F0 00    BEQ  $E137
  0x05E147 $E137: C-----  00       BRK  
  0x05E148 $E138: C-----  00       BRK  
  0x05E149 $E139: C-----  00       BRK  
  0x05E14A $E13A: C-----  A0 A0    LDY  #$A0
  0x05E14C $E13C: C-----  00       BRK  
  0x05E14D $E13D: C-----  00       BRK  
  0x05E14E $E13E: C-----  00       BRK  
  0x05E14F $E13F: C-----  00       BRK  
  0x05E150 $E140: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E151 $E141: C-----  06 04    ASL  $04
  0x05E153 $E143: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E154 $E144: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E155 $E145: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E156 $E146: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E157 $E147: C-----  01 01    ORA  ($01,X)
  0x05E159 $E149: C-----  01 03    ORA  ($03,X)
  0x05E15B $E14B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E15C $E14C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E15D $E14D: C-----  01 00    ORA  ($00,X)
  0x05E15F $E14F: C-----  00       BRK  
  0x05E160 $E150: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E161 $E151: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E162 $E152: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E163 $E153: C-----  E5 CB    SBC  $CB
  0x05E165 $E155: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05E166 $E156: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E167 $E157: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E168 $E158: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E169 $E159: C-----  10 00    BPL  $E15B
  0x05E16B $E15B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E16C $E15C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E16D $E15D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E16E $E15E: C-----  38       SEC  
  0x05E16F $E15F: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05E170 $E160: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E171 $E161: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E172 $E162: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E173 $E163: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E174 $E164: C-----  F9 FA FD SBC  $FDFA,Y
  0x05E177 $E167: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05E178 $E168: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E179 $E169: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E17A $E16A: C-----  00       BRK  
  0x05E17B $E16B: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05E17C $E16C: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05E17D $E16D: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05E17E $E16E: C-----  B6 B6    LDX  $B6,Y
  0x05E180 $E170: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E181 $E171: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E182 $E172: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E183 $E173: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E184 $E174: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E185 $E175: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E186 $E176: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E187 $E177: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E188 $E178: C-----  E0 10    CPX  #$10
  0x05E18A $E17A: C-----  00       BRK  
  0x05E18B $E17B: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05E18C $E17C: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05E18D $E17D: C-----  F8       SED  
  0x05E18E $E17E: C-----  38       SEC  
  0x05E18F $E17F: C-----  BA       TSX  
  0x05E190 $E180: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x05E191 $E181: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05E192 $E182: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E193 $E183: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E194 $E184: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E195 $E185: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E196 $E186: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E197 $E187: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E198 $E188: C-----  18       CLC  
  0x05E199 $E189: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05E19A $E18A: C-----  00       BRK  
  0x05E19B $E18B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E19C $E18C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E19D $E18D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E19E $E18E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E19F $E18F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E1A0 $E190: C-----  FE FF FF INC  $FFFF,X
  0x05E1A3 $E193: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1A4 $E194: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1A5 $E195: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1A6 $E196: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1A7 $E197: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1A8 $E198: C-----  79 78 FC ADC  $FC78,Y
  0x05E1AB $E19B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1AC $E19C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E1AD $E19D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E1AE $E19E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1AF $E19F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1B0 $E1A0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E1B1 $E1A1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E1B2 $E1A2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E1B3 $E1A3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E1B4 $E1A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1B5 $E1A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1B6 $E1A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1B7 $E1A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1B8 $E1A8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E1B9 $E1A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E1BA $E1AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E1BB $E1AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E1BC $E1AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E1BD $E1AD: C-----  01 00    ORA  ($00,X)
  0x05E1BF $E1AF: C-----  00       BRK  
  0x05E1C0 $E1B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1C1 $E1B1: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E1C2 $E1B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1C3 $E1B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1C4 $E1B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1C5 $E1B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1C6 $E1B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1C7 $E1B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1C8 $E1B8: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E1C9 $E1B9: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x05E1CA $E1BA: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E1CB $E1BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1CC $E1BC: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E1CD $E1BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1CE $E1BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1CF $E1BF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E1D0 $E1C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1D1 $E1C1: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E1D2 $E1C2: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E1D3 $E1C3: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E1D4 $E1C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1D5 $E1C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1D6 $E1C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1D7 $E1C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1D8 $E1C8: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E1D9 $E1C9: C-----  BD BD DB LDA  $DBBD,X
  0x05E1DC $E1CC: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E1DD $E1CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1DE $E1CE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E1DF $E1CF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E1E0 $E1D0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E1E1 $E1D1: C-----  7E 3D 1F ROR  $1F3D,X
  0x05E1E4 $E1D4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E1E5 $E1D5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E1E6 $E1D6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E1E7 $E1D7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E1E8 $E1D8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E1E9 $E1D9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E1EA $E1DA: C-----  0E 00 0F ASL  $0F00
  0x05E1ED $E1DD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E1EE $E1DE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E1EF $E1DF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E1F0 $E1E0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E1F1 $E1E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1F2 $E1E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1F3 $E1E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1F4 $E1E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1F5 $E1E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1F6 $E1E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1F7 $E1E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1F8 $E1E8: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05E1F9 $E1E9: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05E1FA $E1EA: C-----  79 DC DF ADC  $DFDC,Y
  0x05E1FD $E1ED: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E1FE $E1EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E1FF $E1EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E200 $E1F0: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E201 $E1F1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E202 $E1F2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E203 $E1F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E204 $E1F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E205 $E1F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E206 $E1F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E207 $E1F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E208 $E1F8: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05E209 $E1F9: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05E20A $E1FA: C-----  E6 0E    INC  $0E
  0x05E20C $E1FC: C-----  FE FE FF INC  $FFFE,X
  0x05E20F $E1FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E210 $E200: C-----  FE FD FF INC  $FFFD,X
  0x05E213 $E203: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E214 $E204: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E215 $E205: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E216 $E206: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E217 $E207: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E218 $E208: C-----  FD FB FF SBC  $FFFB,X
  0x05E21B $E20B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E21C $E20C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E21D $E20D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E21E $E20E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E21F $E20F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E220 $E210: ------  .byte $00
  0x05E221 $E211: ------  .byte $00
  0x05E222 $E212: ------  .byte $00
  0x05E223 $E213: ------  .byte $00
  0x05E224 $E214: ------  .byte $00
  0x05E225 $E215: ------  .byte $00
  0x05E226 $E216: ------  .byte $00
  0x05E227 $E217: ------  .byte $00
  0x05E228 $E218: ------  .byte $00
  0x05E229 $E219: ------  .byte $7E
  0x05E22A $E21A: ------  .byte $42
  0x05E22B $E21B: ------  .byte $42
  0x05E22C $E21C: ------  .byte $42
  0x05E22D $E21D: ------  .byte $42
  0x05E22E $E21E: ------  .byte $7E
  0x05E22F $E21F: ------  .byte $00
  0x05E230 $E220: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E231 $E221: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E232 $E222: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E233 $E223: C-----  FE FC F8 INC  $F8FC,X
  0x05E236 $E226: C-----  F0 C0    BEQ  $E1E8
  0x05E238 $E228: C-----  7E FE FE ROR  $FEFE,X
  0x05E23B $E22B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E23C $E22C: C-----  F8       SED  
  0x05E23D $E22D: C-----  F0 C0    BEQ  $E1EF
  0x05E23F $E22F: C-----  00       BRK  
  0x05E240 $E230: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E241 $E231: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E242 $E232: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E243 $E233: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E244 $E234: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05E245 $E235: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05E246 $E236: C-----  4E 83 00 LSR  $0083
  0x05E249 $E239: C-----  00       BRK  
  0x05E24A $E23A: C-----  00       BRK  
  0x05E24B $E23B: C-----  00       BRK  
  0x05E24C $E23C: C-----  00       BRK  
  0x05E24D $E23D: C-----  00       BRK  
  0x05E24E $E23E: C-----  00       BRK  
  0x05E24F $E23F: C-----  00       BRK  
  0x05E250 $E240: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E251 $E241: C-----  C0 C0    CPY  #$C0
  0x05E253 $E243: C-----  C0 C0    CPY  #$C0
  0x05E255 $E245: C-----  40       RTI  
  0x05E256 $E246: C-----  40       RTI  
  0x05E257 $E247: C-----  40       RTI  
  0x05E258 $E248: C-----  00       BRK  
  0x05E259 $E249: C-----  00       BRK  
  0x05E25A $E24A: C-----  00       BRK  
  0x05E25B $E24B: C-----  00       BRK  
  0x05E25C $E24C: C-----  00       BRK  
  0x05E25D $E24D: C-----  00       BRK  
  0x05E25E $E24E: C-----  00       BRK  
  0x05E25F $E24F: C-----  00       BRK  
  0x05E260 $E250: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E261 $E251: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E262 $E252: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E263 $E253: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E264 $E254: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E265 $E255: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E266 $E256: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E267 $E257: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E268 $E258: C-----  BA       TSX  
  0x05E269 $E259: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E26A $E25A: C-----  FE 0E 03 INC  $030E,X
  0x05E26D $E25D: C-----  01 01    ORA  ($01,X)
  0x05E26F $E25F: C-----  00       BRK  
  0x05E270 $E260: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E271 $E261: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x05E272 $E262: C-----  45 25    EOR  $25
  0x05E274 $E264: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E275 $E265: C-----  0E 00 00 ASL  $0000
  0x05E278 $E268: C-----  00       BRK  
  0x05E279 $E269: C-----  30 3A    BMI  $E2A5
  0x05E27B $E26B: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x05E27C $E26C: C-----  00       BRK  
  0x05E27D $E26D: C-----  00       BRK  
  0x05E27E $E26E: C-----  00       BRK  
  0x05E27F $E26F: C-----  00       BRK  
  0x05E280 $E270: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E281 $E271: C-----  EC C4 C6 CPX  $C6C4
  0x05E284 $E274: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x05E285 $E275: C-----  00       BRK  
  0x05E286 $E276: C-----  00       BRK  
  0x05E287 $E277: C-----  00       BRK  
  0x05E288 $E278: C-----  00       BRK  
  0x05E289 $E279: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E28A $E27A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E28B $E27B: C-----  01 00    ORA  ($00,X)
  0x05E28D $E27D: C-----  00       BRK  
  0x05E28E $E27E: C-----  00       BRK  
  0x05E28F $E27F: C-----  00       BRK  
  0x05E290 $E280: C-----  00       BRK  
  0x05E291 $E281: C-----  01 01    ORA  ($01,X)
  0x05E293 $E283: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E294 $E284: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E295 $E285: C-----  08       PHP  
  0x05E296 $E286: C-----  30 C0    BMI  $E248
  0x05E298 $E288: C-----  00       BRK  
  0x05E299 $E289: C-----  00       BRK  
  0x05E29A $E28A: C-----  00       BRK  
  0x05E29B $E28B: C-----  01 03    ORA  ($03,X)
  0x05E29D $E28D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E29E $E28E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E29F $E28F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E2A0 $E290: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E2A1 $E291: C-----  C0 C0    CPY  #$C0
  0x05E2A3 $E293: C-----  E0 E0    CPX  #$E0
  0x05E2A5 $E295: C-----  F0 FC    BEQ  $E293
  0x05E2A7 $E297: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2A8 $E298: C-----  00       BRK  
  0x05E2A9 $E299: C-----  00       BRK  
  0x05E2AA $E29A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E2AB $E29B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E2AC $E29C: C-----  C0 C0    CPY  #$C0
  0x05E2AE $E29E: C-----  B0 7C    BCS  $E31C
  0x05E2B0 $E2A0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E2B1 $E2A1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E2B2 $E2A2: C-----  06 0C    ASL  $0C
  0x05E2B4 $E2A4: C-----  18       CLC  
  0x05E2B5 $E2A5: C-----  B0 40    BCS  $E2E7
  0x05E2B7 $E2A7: C-----  00       BRK  
  0x05E2B8 $E2A8: C-----  FE FD FB INC  $FBFD,X
  0x05E2BB $E2AB: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E2BC $E2AC: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E2BD $E2AD: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x05E2BE $E2AE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E2BF $E2AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2C0 $E2B0: C-----  99 0C 06 STA  $060C,Y
  0x05E2C3 $E2B3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E2C4 $E2B4: C-----  01 00    ORA  ($00,X)
  0x05E2C6 $E2B6: C-----  00       BRK  
  0x05E2C7 $E2B7: C-----  00       BRK  
  0x05E2C8 $E2B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2C9 $E2B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2CA $E2BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2CB $E2BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2CC $E2BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2CD $E2BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2CE $E2BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2CF $E2BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E2D0 $E2C0: C-----  00       BRK  
  0x05E2D1 $E2C1: C-----  00       BRK  
  0x05E2D2 $E2C2: C-----  00       BRK  
  0x05E2D3 $E2C3: C-----  01 03    ORA  ($03,X)
  0x05E2D5 $E2C5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E2D6 $E2C6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E2D7 $E2C7: C-----  0D 00 00 ORA  $0000
  0x05E2DA $E2CA: C-----  00       BRK  
  0x05E2DB $E2CB: C-----  00       BRK  
  0x05E2DC $E2CC: C-----  00       BRK  
  0x05E2DD $E2CD: C-----  01 01    ORA  ($01,X)
  0x05E2DF $E2CF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E2E0 $E2D0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E2E1 $E2D1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E2E2 $E2D2: C-----  3E F8 F4 ROL  $F4F8,X
  0x05E2E5 $E2D5: C-----  E8       INX  
  0x05E2E6 $E2D6: C-----  D0 E0    BNE  $E2B8
  0x05E2E8 $E2D8: C-----  00       BRK  
  0x05E2E9 $E2D9: C-----  01 07    ORA  ($07,X)
  0x05E2EB $E2DB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E2EC $E2DC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E2ED $E2DD: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E2EE $E2DE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E2EF $E2DF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E2F0 $E2E0: C-----  F8       SED  
  0x05E2F1 $E2E1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E2F2 $E2E2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E2F3 $E2E3: C-----  79 F0 F0 ADC  $F0F0,Y
  0x05E2F6 $E2E6: C-----  E0 E0    CPX  #$E0
  0x05E2F8 $E2E8: C-----  00       BRK  
  0x05E2F9 $E2E9: C-----  F0 EE    BEQ  $E2D9
  0x05E2FB $E2EB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E2FC $E2EC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E2FD $E2ED: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E2FE $E2EE: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E2FF $E2EF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E300 $E2F0: C-----  00       BRK  
  0x05E301 $E2F1: C-----  00       BRK  
  0x05E302 $E2F2: C-----  C0 E0    CPY  #$E0
  0x05E304 $E2F4: C-----  60       RTS  
  0x05E305 $E2F5: C-----  70 30    BVS  $E327
  0x05E307 $E2F7: C-----  38       SEC  
  0x05E308 $E2F8: C-----  00       BRK  
  0x05E309 $E2F9: C-----  00       BRK  
  0x05E30A $E2FA: C-----  00       BRK  
  0x05E30B $E2FB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E30C $E2FC: C-----  C0 C0    CPY  #$C0
  0x05E30E $E2FE: C-----  E0 E0    CPX  #$E0
  0x05E310 $E300: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E311 $E301: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E312 $E302: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E313 $E303: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E314 $E304: C-----  BE AE 3C LDX  $3CAE,Y
  0x05E317 $E307: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x05E318 $E308: C-----  00       BRK  
  0x05E319 $E309: C-----  00       BRK  
  0x05E31A $E30A: C-----  00       BRK  
  0x05E31B $E30B: C-----  00       BRK  
  0x05E31C $E30C: C-----  00       BRK  
  0x05E31D $E30D: C-----  00       BRK  
  0x05E31E $E30E: C-----  00       BRK  
  0x05E31F $E30F: C-----  00       BRK  
  0x05E320 $E310: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E321 $E311: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E322 $E312: C-----  BC C3 FF LDY  $FFC3,X
  0x05E325 $E315: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E326 $E316: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E327 $E317: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E328 $E318: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E329 $E319: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05E32A $E31A: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x05E32B $E31B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E32C $E31C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E32D $E31D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E32E $E31E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E32F $E31F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E330 $E320: C-----  00       BRK  
  0x05E331 $E321: C-----  00       BRK  
  0x05E332 $E322: C-----  01 03    ORA  ($03,X)
  0x05E334 $E324: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E335 $E325: C-----  06 1C    ASL  $1C
  0x05E337 $E327: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x05E338 $E328: C-----  00       BRK  
  0x05E339 $E329: C-----  00       BRK  
  0x05E33A $E32A: C-----  00       BRK  
  0x05E33B $E32B: C-----  00       BRK  
  0x05E33C $E32C: C-----  01 01    ORA  ($01,X)
  0x05E33E $E32E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E33F $E32F: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05E340 $E330: C-----  00       BRK  
  0x05E341 $E331: C-----  00       BRK  
  0x05E342 $E332: C-----  00       BRK  
  0x05E343 $E333: C-----  00       BRK  
  0x05E344 $E334: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E345 $E335: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E346 $E336: C-----  40       RTI  
  0x05E347 $E337: C-----  20 00 00 JSR  $0000
  0x05E34A $E33A: C-----  00       BRK  
  0x05E34B $E33B: C-----  00       BRK  
  0x05E34C $E33C: C-----  00       BRK  
  0x05E34D $E33D: C-----  00       BRK  
  0x05E34E $E33E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E34F $E33F: C-----  C0 FE    CPY  #$FE
  0x05E351 $E341: C-----  BE 9C 7C LDX  $7C9C,Y
  0x05E354 $E344: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x05E355 $E345: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x05E356 $E346: C-----  78       SEI  
  0x05E357 $E347: C-----  B8       CLV  
  0x05E358 $E348: C-----  00       BRK  
  0x05E359 $E349: C-----  60       RTS  
  0x05E35A $E34A: C-----  70 90    BVS  $E2DC
  0x05E35C $E34C: C-----  B0 B0    BCS  $E2FE
  0x05E35E $E34E: C-----  A0 60    LDY  #$60
  0x05E360 $E350: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E361 $E351: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E362 $E352: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E363 $E353: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E364 $E354: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E365 $E355: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E366 $E356: C-----  01 00    ORA  ($00,X)
  0x05E368 $E358: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E369 $E359: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E36A $E35A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E36B $E35B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E36C $E35C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E36D $E35D: C-----  01 00    ORA  ($00,X)
  0x05E36F $E35F: C-----  00       BRK  
  0x05E370 $E360: C-----  00       BRK  
  0x05E371 $E361: C-----  00       BRK  
  0x05E372 $E362: C-----  00       BRK  
  0x05E373 $E363: C-----  01 01    ORA  ($01,X)
  0x05E375 $E365: C-----  01 03    ORA  ($03,X)
  0x05E377 $E367: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E378 $E368: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E379 $E369: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E37A $E36A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E37B $E36B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E37C $E36C: C-----  FE FE FE INC  $FEFE,X
  0x05E37F $E36F: C-----  FE FC FC INC  $FCFC,X
  0x05E382 $E372: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E383 $E373: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E384 $E374: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E385 $E375: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E386 $E376: C-----  FE FE 07 INC  $07FE,X
  0x05E389 $E379: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05E38A $E37A: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05E38B $E37B: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05E38C $E37C: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05E38D $E37D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05E38E $E37E: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05E38F $E37F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E390 $E380: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x05E391 $E381: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x05E392 $E382: C-----  01 01    ORA  ($01,X)
  0x05E394 $E384: C-----  00       BRK  
  0x05E395 $E385: C-----  00       BRK  
  0x05E396 $E386: C-----  00       BRK  
  0x05E397 $E387: C-----  00       BRK  
  0x05E398 $E388: C-----  3D FD FE AND  $FEFD,X
  0x05E39B $E38B: C-----  FE FF FF INC  $FFFF,X
  0x05E39E $E38E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E39F $E38F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3A0 $E390: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E3A1 $E391: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05E3A2 $E392: C-----  7E 6F EF ROR  $EF6F,X
  0x05E3A5 $E395: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3A6 $E396: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3A7 $E397: C-----  5E E0 C3 LSR  $C3E0,X
  0x05E3AA $E39A: C-----  81 90    STA  ($90,X)
  0x05E3AC $E39C: C-----  50 43    BVC  $E3E1
  0x05E3AE $E39E: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05E3AF $E39F: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05E3B0 $E3A0: C-----  0D 0D 1B ORA  $1B0D
  0x05E3B3 $E3A3: C-----  19 1D 33 ORA  $331D,Y
  0x05E3B6 $E3A6: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05E3B7 $E3A7: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x05E3B8 $E3A8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E3B9 $E3A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E3BA $E3AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E3BB $E3AB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E3BC $E3AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E3BD $E3AD: C-----  0D 0F 1F ORA  $1F0F
  0x05E3C0 $E3B0: C-----  E0 C0    CPX  #$C0
  0x05E3C2 $E3B2: C-----  C0 80    CPY  #$80
  0x05E3C4 $E3B4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E3C5 $E3B5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E3C6 $E3B6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E3C7 $E3B7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E3C8 $E3B8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3C9 $E3B9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3CA $E3BA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3CB $E3BB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3CC $E3BC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3CD $E3BD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3CE $E3BE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3CF $E3BF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E3D0 $E3C0: C-----  00       BRK  
  0x05E3D1 $E3C1: C-----  00       BRK  
  0x05E3D2 $E3C2: C-----  00       BRK  
  0x05E3D3 $E3C3: C-----  00       BRK  
  0x05E3D4 $E3C4: C-----  00       BRK  
  0x05E3D5 $E3C5: C-----  00       BRK  
  0x05E3D6 $E3C6: C-----  00       BRK  
  0x05E3D7 $E3C7: C-----  00       BRK  
  0x05E3D8 $E3C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3D9 $E3C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3DA $E3CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3DB $E3CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3DC $E3CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3DD $E3CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3DE $E3CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3DF $E3CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E3E0 $E3D0: C-----  60       RTS  
  0x05E3E1 $E3D1: C-----  60       RTS  
  0x05E3E2 $E3D2: C-----  60       RTS  
  0x05E3E3 $E3D3: C-----  66 6C    ROR  $6C
  0x05E3E5 $E3D5: C-----  78       SEI  
  0x05E3E6 $E3D6: C-----  70 70    BVS  $E448
  0x05E3E8 $E3D8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E3E9 $E3D9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E3EA $E3DA: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E3EB $E3DB: C-----  DD DB D7 CMP  $D7DB,X
  0x05E3EE $E3DE: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E3EF $E3DF: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E3F0 $E3E0: C-----  38       SEC  
  0x05E3F1 $E3E1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05E3F2 $E3E2: C-----  6C DE 1E JMP  ($1EDE)
  0x05E3F5 $E3E5: C-----  36 67    ROL  $67,X
  0x05E3F7 $E3E7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E3F8 $E3E8: C-----  E0 C0    CPX  #$C0
  0x05E3FA $E3EA: C-----  D8       CLD  
  0x05E3FB $E3EB: C-----  B0 F4    BCS  $E3E1
  0x05E3FD $E3ED: C-----  EC DC FE CPX  $FEDC
  0x05E400 $E3F0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E401 $E3F1: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E402 $E3F2: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E403 $E3F3: C-----  7E FC F8 ROR  $F8FC,X
  0x05E406 $E3F6: C-----  F0 C0    BEQ  $E3B8
  0x05E408 $E3F8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E409 $E3F9: C-----  3E 7E FC ROL  $FC7E,X
  0x05E40C $E3FC: C-----  F8       SED  
  0x05E40D $E3FD: C-----  F0 C0    BEQ  $E3BF
  0x05E40F $E3FF: C-----  00       BRK  
  0x05E410 $E400: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E411 $E401: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E412 $E402: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E413 $E403: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E414 $E404: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E415 $E405: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E416 $E406: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E417 $E407: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E418 $E408: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E419 $E409: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E41A $E40A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E41B $E40B: C-----  FE FE EE INC  $EEFE,X
  0x05E41E $E40E: C-----  DE BE 70 DEC  $70BE,X
  0x05E421 $E411: C-----  F0 E0    BEQ  $E3F3
  0x05E423 $E413: C-----  C0 80    CPY  #$80
  0x05E425 $E415: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E426 $E416: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E427 $E417: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E428 $E418: C-----  C0 80    CPY  #$80
  0x05E42A $E41A: C-----  00       BRK  
  0x05E42B $E41B: C-----  00       BRK  
  0x05E42C $E41C: C-----  00       BRK  
  0x05E42D $E41D: C-----  00       BRK  
  0x05E42E $E41E: C-----  00       BRK  
  0x05E42F $E41F: C-----  00       BRK  
  0x05E430 $E420: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x05E431 $E421: C-----  84 8D    STY  $8D
  0x05E433 $E423: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x05E434 $E424: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x05E435 $E425: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x05E436 $E426: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x05E437 $E427: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E438 $E428: C-----  3D 7B 72 AND  $727B,X
  0x05E43B $E42B: C-----  E4 C8    CPX  $C8
  0x05E43D $E42D: C-----  91 A7    STA  ($A7),Y
  0x05E43F $E42F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E440 $E430: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05E441 $E431: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E442 $E432: C-----  F9 FF FF SBC  $FFFF,Y
  0x05E445 $E435: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E446 $E436: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E447 $E437: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E448 $E438: C-----  C5 03    CMP  $03
  0x05E44A $E43A: C-----  16 20    ASL  $20,X
  0x05E44C $E43C: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05E44D $E43D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E44E $E43E: C-----  20 FF BE JSR  $BEFF
  0x05E451 $E441: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E452 $E442: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E453 $E443: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E454 $E444: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E455 $E445: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E456 $E446: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E457 $E447: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E458 $E448: C-----  CD ED FF CMP  $FFED
  0x05E45B $E44B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E45C $E44C: C-----  7E 38 7F ROR  $7F38,X
  0x05E45F $E44F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E460 $E450: C-----  00       BRK  
  0x05E461 $E451: C-----  00       BRK  
  0x05E462 $E452: C-----  00       BRK  
  0x05E463 $E453: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E464 $E454: C-----  0E 18 30 ASL  $3018
  0x05E467 $E457: C-----  61 00    ADC  ($00,X)
  0x05E469 $E459: C-----  00       BRK  
  0x05E46A $E45A: C-----  00       BRK  
  0x05E46B $E45B: C-----  00       BRK  
  0x05E46C $E45C: C-----  01 07    ORA  ($07,X)
  0x05E46E $E45E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E46F $E45F: C-----  1E 0E 7E ASL  $7E0E,X
  0x05E472 $E462: C-----  FE FE FF INC  $FFFE,X
  0x05E475 $E465: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E476 $E466: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E477 $E467: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E478 $E468: C-----  F1 85    SBC  ($85),Y
  0x05E47A $E46A: C-----  1D FD FE ORA  $FEFD,X
  0x05E47D $E46D: C-----  FE 9E FF INC  $FF9E,X
  0x05E480 $E470: C-----  CC E4 D6 CPY  $D6E4
  0x05E483 $E473: C-----  EA       NOP  
  0x05E484 $E474: C-----  F6 F3    INC  $F3,X
  0x05E486 $E476: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05E487 $E477: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E488 $E478: C-----  30 18    BMI  $E492
  0x05E48A $E47A: C-----  28       PLP  
  0x05E48B $E47B: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05E48C $E47C: C-----  08       PHP  
  0x05E48D $E47D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05E48E $E47E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E48F $E47F: C-----  00       BRK  
  0x05E490 $E480: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E491 $E481: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E492 $E482: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E493 $E483: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E494 $E484: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E495 $E485: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E496 $E486: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E497 $E487: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x05E498 $E488: C-----  00       BRK  
  0x05E499 $E489: C-----  00       BRK  
  0x05E49A $E48A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E49B $E48B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E49C $E48C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E49D $E48D: C-----  00       BRK  
  0x05E49E $E48E: C-----  88       DEY  
  0x05E49F $E48F: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x05E4A0 $E490: C-----  3E 3F 3F ROL  $3F3F,X
  0x05E4A3 $E493: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E4A4 $E494: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E4A5 $E495: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E4A6 $E496: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E4A7 $E497: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E4A8 $E498: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E4A9 $E499: C-----  16 13    ASL  $13,X
  0x05E4AB $E49B: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05E4AC $E49C: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x05E4AD $E49D: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x05E4AE $E49E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E4AF $E49F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E4B0 $E4A0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E4B1 $E4A1: C-----  F8       SED  
  0x05E4B2 $E4A2: C-----  F8       SED  
  0x05E4B3 $E4A3: C-----  F0 F0    BEQ  $E495
  0x05E4B5 $E4A5: C-----  E0 C0    CPX  #$C0
  0x05E4B7 $E4A7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E4B8 $E4A8: C-----  E0 C0    CPX  #$C0
  0x05E4BA $E4AA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E4BB $E4AB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E4BC $E4AC: C-----  00       BRK  
  0x05E4BD $E4AD: C-----  00       BRK  
  0x05E4BE $E4AE: C-----  00       BRK  
  0x05E4BF $E4AF: C-----  00       BRK  
  0x05E4C0 $E4B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4C1 $E4B1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E4C2 $E4B2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E4C3 $E4B3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E4C4 $E4B4: C-----  F0 FF    BEQ  $E4B5
  0x05E4C6 $E4B6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E4C7 $E4B7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E4C8 $E4B8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E4C9 $E4B9: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x05E4CA $E4BA: C-----  60       RTS  
  0x05E4CB $E4BB: C-----  70 7F    BVS  $E53C
  0x05E4CD $E4BD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E4CE $E4BE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E4CF $E4BF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E4D0 $E4C0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E4D1 $E4C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4D2 $E4C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4D3 $E4C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4D4 $E4C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4D5 $E4C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4D6 $E4C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4D7 $E4C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4D8 $E4C8: C-----  CC 5E BF CPY  $BF5E
  0x05E4DB $E4CB: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05E4DC $E4CC: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E4DD $E4CD: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x05E4DE $E4CE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E4DF $E4CF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E4E0 $E4D0: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E4E1 $E4D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4E2 $E4D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4E3 $E4D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4E4 $E4D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4E5 $E4D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4E6 $E4D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4E7 $E4D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4E8 $E4D8: C-----  FE CD 7B INC  $7BCD,X
  0x05E4EB $E4DB: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05E4EC $E4DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4ED $E4DD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E4EE $E4DE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E4EF $E4DF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E4F0 $E4E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4F1 $E4E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4F2 $E4E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4F3 $E4E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4F4 $E4E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4F5 $E4E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E4F6 $E4E6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05E4F7 $E4E7: C-----  F5 16    SBC  $16,X
  0x05E4F9 $E4E9: C-----  3E 3F 61 ROL  $613F,X
  0x05E4FC $E4EC: C-----  78       SEI  
  0x05E4FD $E4ED: C-----  30 34    BMI  $E523
  0x05E4FF $E4EF: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05E500 $E4F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E501 $E4F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E502 $E4F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E503 $E4F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E504 $E4F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E505 $E4F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E506 $E4F6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E507 $E4F7: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05E508 $E4F8: C-----  BA       TSX  
  0x05E509 $E4F9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E50A $E4FA: C-----  FE C2 0F INC  $0FC2,X
  0x05E50D $E4FD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E50E $E4FE: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x05E50F $E4FF: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05E510 $E500: C-----  00       BRK  
  0x05E511 $E501: C-----  00       BRK  
  0x05E512 $E502: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E513 $E503: C-----  C0 00    CPY  #$00
  0x05E515 $E505: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E516 $E506: C-----  86 1C    STX  $1C
  0x05E518 $E508: C-----  00       BRK  
  0x05E519 $E509: C-----  00       BRK  
  0x05E51A $E50A: C-----  00       BRK  
  0x05E51B $E50B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E51C $E50C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E51D $E50D: C-----  FD 79 E3 SBC  $E379,X
  0x05E520 $E510: C-----  00       BRK  
  0x05E521 $E511: C-----  06 FB    ASL  $FB
  0x05E523 $E513: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E524 $E514: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E525 $E515: C-----  0E 39 62 ASL  $6239
  0x05E528 $E518: C-----  00       BRK  
  0x05E529 $E519: C-----  00       BRK  
  0x05E52A $E51A: C-----  00       BRK  
  0x05E52B $E51B: C-----  F0 F8    BEQ  $E515
  0x05E52D $E51D: C-----  F1 C6    SBC  ($C6),Y
  0x05E52F $E51F: C-----  9D 02 01 STA  $0102,X
  0x05E532 $E522: C-----  01 00    ORA  ($00,X)
  0x05E534 $E524: C-----  00       BRK  
  0x05E535 $E525: C-----  00       BRK  
  0x05E536 $E526: C-----  00       BRK  
  0x05E537 $E527: C-----  00       BRK  
  0x05E538 $E528: C-----  01 00    ORA  ($00,X)
  0x05E53A $E52A: C-----  00       BRK  
  0x05E53B $E52B: C-----  00       BRK  
  0x05E53C $E52C: C-----  00       BRK  
  0x05E53D $E52D: C-----  00       BRK  
  0x05E53E $E52E: C-----  00       BRK  
  0x05E53F $E52F: C-----  00       BRK  
  0x05E540 $E530: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E541 $E531: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E542 $E532: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E543 $E533: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E544 $E534: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E545 $E535: C-----  3D 3D 3C AND  $3C3D,X
  0x05E548 $E538: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E549 $E539: C-----  18       CLC  
  0x05E54A $E53A: C-----  10 07    BPL  $E543
  0x05E54C $E53C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05E54D $E53D: C-----  0A       ASL  A
  0x05E54E $E53E: C-----  0E 0F 00 ASL  $000F
  0x05E551 $E541: C-----  00       BRK  
  0x05E552 $E542: C-----  00       BRK  
  0x05E553 $E543: C-----  00       BRK  
  0x05E554 $E544: C-----  E0 C0    CPX  #$C0
  0x05E556 $E546: C-----  F0 F8    BEQ  $E540
  0x05E558 $E548: C-----  00       BRK  
  0x05E559 $E549: C-----  00       BRK  
  0x05E55A $E54A: C-----  00       BRK  
  0x05E55B $E54B: C-----  00       BRK  
  0x05E55C $E54C: C-----  00       BRK  
  0x05E55D $E54D: C-----  00       BRK  
  0x05E55E $E54E: C-----  00       BRK  
  0x05E55F $E54F: C-----  00       BRK  
  0x05E560 $E550: C-----  00       BRK  
  0x05E561 $E551: C-----  00       BRK  
  0x05E562 $E552: C-----  01 01    ORA  ($01,X)
  0x05E564 $E554: C-----  01 02    ORA  ($02,X)
  0x05E566 $E556: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E567 $E557: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E568 $E558: C-----  00       BRK  
  0x05E569 $E559: C-----  00       BRK  
  0x05E56A $E55A: C-----  00       BRK  
  0x05E56B $E55B: C-----  00       BRK  
  0x05E56C $E55C: C-----  00       BRK  
  0x05E56D $E55D: C-----  01 01    ORA  ($01,X)
  0x05E56F $E55F: C-----  01 FF    ORA  ($FF,X)
  0x05E571 $E561: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E572 $E562: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E573 $E563: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E574 $E564: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E575 $E565: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E576 $E566: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E577 $E567: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E578 $E568: C-----  C1 7F    CMP  ($7F,X)
  0x05E57A $E56A: C-----  1E CC 21 ASL  $21CC,X
  0x05E57D $E56D: C-----  2D AD 6D AND  $6DAD
  0x05E580 $E570: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E581 $E571: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E582 $E572: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E583 $E573: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E584 $E574: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E585 $E575: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E586 $E576: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05E587 $E577: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05E588 $E578: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E589 $E579: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x05E58A $E57A: C-----  01 FC    ORA  ($FC,X)
  0x05E58C $E57C: C-----  86 8A    STX  $8A
  0x05E58E $E57E: C-----  AE DE EF LDX  $EFDE
  0x05E591 $E581: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05E592 $E582: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x05E593 $E583: C-----  D6 D6    DEC  $D6,X
  0x05E595 $E585: C-----  DE DC FC DEC  $FCDC,X
  0x05E598 $E588: C-----  94 94    STY  $94,X
  0x05E59A $E58A: C-----  A4 A8    LDY  $A8
  0x05E59C $E58C: C-----  A8       TAY  
  0x05E59D $E58D: C-----  A8       TAY  
  0x05E59E $E58E: C-----  F0 F0    BEQ  $E580
  0x05E5A0 $E590: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E5A1 $E591: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E5A2 $E592: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E5A3 $E593: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E5A4 $E594: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E5A5 $E595: C-----  01 00    ORA  ($00,X)
  0x05E5A7 $E597: C-----  00       BRK  
  0x05E5A8 $E598: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E5A9 $E599: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E5AA $E59A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E5AB $E59B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E5AC $E59C: C-----  01 00    ORA  ($00,X)
  0x05E5AE $E59E: C-----  00       BRK  
  0x05E5AF $E59F: C-----  00       BRK  
  0x05E5B0 $E5A0: C-----  F9 F8 FC SBC  $FCF8,Y
  0x05E5B3 $E5A3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E5B4 $E5A4: C-----  FE FF FF INC  $FFFF,X
  0x05E5B7 $E5A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5B8 $E5A8: C-----  06 07    ASL  $07
  0x05E5BA $E5AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E5BB $E5AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E5BC $E5AC: C-----  01 00    ORA  ($00,X)
  0x05E5BE $E5AE: C-----  00       BRK  
  0x05E5BF $E5AF: C-----  00       BRK  
  0x05E5C0 $E5B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5C1 $E5B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5C2 $E5B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5C3 $E5B3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E5C4 $E5B4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E5C5 $E5B5: C-----  00       BRK  
  0x05E5C6 $E5B6: C-----  C0 FF    CPY  #$FF
  0x05E5C8 $E5B8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E5C9 $E5B9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E5CA $E5BA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E5CB $E5BB: C-----  8E E0 FF STX  $FFE0
  0x05E5CE $E5BE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E5CF $E5BF: C-----  00       BRK  
  0x05E5D0 $E5C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5D1 $E5C1: C-----  F9 FF FF SBC  $FFFF,Y
  0x05E5D4 $E5C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5D5 $E5C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5D6 $E5C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5D7 $E5C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5D8 $E5C8: C-----  70 76    BVS  $E640
  0x05E5DA $E5CA: C-----  79 FF F9 ADC  $F9FF,Y
  0x05E5DD $E5CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5DE $E5CE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E5DF $E5CF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E5E0 $E5D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5E1 $E5D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5E2 $E5D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5E3 $E5D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5E4 $E5D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5E5 $E5D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5E6 $E5D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5E7 $E5D7: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E5E8 $E5D8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E5E9 $E5D9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E5EA $E5DA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E5EB $E5DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5EC $E5DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5ED $E5DD: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05E5EE $E5DE: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E5EF $E5DF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E5F0 $E5E0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E5F1 $E5E1: C-----  F8       SED  
  0x05E5F2 $E5E2: C-----  F1 C7    SBC  ($C7),Y
  0x05E5F4 $E5E4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E5F5 $E5E5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E5F6 $E5E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5F7 $E5E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E5F8 $E5E8: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05E5F9 $E5E9: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E5FA $E5EA: C-----  8E 38 F0 STX  $F038
  0x05E5FD $E5ED: C-----  C0 00    CPY  #$00
  0x05E5FF $E5EF: C-----  00       BRK  
  0x05E600 $E5F0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E601 $E5F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E602 $E5F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E603 $E5F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E604 $E5F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E605 $E5F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E606 $E5F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E607 $E5F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E608 $E5F8: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E609 $E5F9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E60A $E5FA: C-----  00       BRK  
  0x05E60B $E5FB: C-----  00       BRK  
  0x05E60C $E5FC: C-----  00       BRK  
  0x05E60D $E5FD: C-----  00       BRK  
  0x05E60E $E5FE: C-----  00       BRK  
  0x05E60F $E5FF: C-----  00       BRK  
  0x05E610 $E600: C-----  00       BRK  
  0x05E611 $E601: C-----  00       BRK  
  0x05E612 $E602: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E613 $E603: C-----  18       CLC  
  0x05E614 $E604: C-----  21 41    AND  ($41,X)
  0x05E616 $E606: C-----  40       RTI  
  0x05E617 $E607: C-----  E0 00    CPX  #$00
  0x05E619 $E609: C-----  00       BRK  
  0x05E61A $E60A: C-----  00       BRK  
  0x05E61B $E60B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E61C $E60C: C-----  1E 3E 3F ASL  $3F3E,X
  0x05E61F $E60F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E620 $E610: C-----  00       BRK  
  0x05E621 $E611: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E622 $E612: C-----  C1 87    CMP  ($87,X)
  0x05E624 $E614: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E625 $E615: C-----  08       PHP  
  0x05E626 $E616: C-----  00       BRK  
  0x05E627 $E617: C-----  00       BRK  
  0x05E628 $E618: C-----  00       BRK  
  0x05E629 $E619: C-----  00       BRK  
  0x05E62A $E61A: C-----  3E 78 FB ROL  $FB78,X
  0x05E62D $E61D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E62E $E61E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E62F $E61F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E630 $E620: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E631 $E621: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E632 $E622: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05E633 $E623: C-----  25 2D    AND  $2D
  0x05E635 $E625: C-----  6D 6F 7F ADC  $7F6F
  0x05E638 $E628: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E639 $E629: C-----  FD EB DA SBC  $DAEB,X
  0x05E63C $E62C: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x05E63D $E62D: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x05E63E $E62E: C-----  94 A4    STY  $A4,X
  0x05E640 $E630: C-----  40       RTI  
  0x05E641 $E631: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05E642 $E632: C-----  84 8C    STY  $8C
  0x05E644 $E634: C-----  8D DD DF STA  $DFDD
  0x05E647 $E637: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E648 $E638: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E649 $E639: C-----  7D 7B 73 ADC  $737B,X
  0x05E64C $E63C: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x05E64D $E63D: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05E64E $E63E: C-----  A4 84    LDY  $84
  0x05E650 $E640: C-----  00       BRK  
  0x05E651 $E641: C-----  7E C3 0F ROR  $0FC3,X
  0x05E654 $E644: C-----  18       CLC  
  0x05E655 $E645: C-----  21 03    AND  ($03,X)
  0x05E657 $E647: C-----  06 00    ASL  $00
  0x05E659 $E649: C-----  00       BRK  
  0x05E65A $E64A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05E65B $E64B: C-----  F0 E7    BEQ  $E634
  0x05E65D $E64D: C-----  DE FC F9 DEC  $F9FC,X
  0x05E660 $E650: C-----  00       BRK  
  0x05E661 $E651: C-----  00       BRK  
  0x05E662 $E652: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E663 $E653: C-----  E0 70    CPX  #$70
  0x05E665 $E655: C-----  F8       SED  
  0x05E666 $E656: C-----  18       CLC  
  0x05E667 $E657: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05E668 $E658: C-----  00       BRK  
  0x05E669 $E659: C-----  00       BRK  
  0x05E66A $E65A: C-----  00       BRK  
  0x05E66B $E65B: C-----  00       BRK  
  0x05E66C $E65C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E66D $E65D: C-----  00       BRK  
  0x05E66E $E65E: C-----  E0 80    CPX  #$80
  0x05E670 $E660: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E671 $E661: C-----  20 44 C9 JSR  $C944
  0x05E674 $E664: C-----  CA       DEX  
  0x05E675 $E665: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x05E676 $E666: C-----  DE FF FB DEC  $FBFF,X
  0x05E679 $E669: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E67A $E66A: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x05E67B $E66B: C-----  36 35    ROL  $35,X
  0x05E67D $E66D: C-----  25 A1    AND  $A1
  0x05E67F $E66F: C-----  88       DEY  
  0x05E680 $E670: C-----  CC EE E6 CPY  $E6EE
  0x05E683 $E673: C-----  E6 D6    INC  $D6
  0x05E685 $E675: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05E686 $E676: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05E687 $E677: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E688 $E678: C-----  30 10    BMI  $E68A
  0x05E68A $E67A: C-----  18       CLC  
  0x05E68B $E67B: C-----  18       CLC  
  0x05E68C $E67C: C-----  28       PLP  
  0x05E68D $E67D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05E68E $E67E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E68F $E67F: C-----  08       PHP  
  0x05E690 $E680: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E691 $E681: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E692 $E682: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E693 $E683: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E694 $E684: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E695 $E685: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E696 $E686: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05E697 $E687: C-----  F5 16    SBC  $16,X
  0x05E699 $E689: C-----  3E 31 60 ROL  $6031,X
  0x05E69C $E68C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E69D $E68D: C-----  38       SEC  
  0x05E69E $E68E: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05E69F $E68F: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05E6A0 $E690: C-----  BE DF EF LDX  $EFDF,Y
  0x05E6A3 $E693: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6A4 $E694: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6A5 $E695: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6A6 $E696: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6A7 $E697: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6A8 $E698: C-----  CD ED FF CMP  $FFED
  0x05E6AB $E69B: C-----  7E 38 FF ROR  $FF38,X
  0x05E6AE $E69E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E6AF $E69F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E6B0 $E6A0: C-----  F5 77    SBC  $77,X
  0x05E6B2 $E6A2: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x05E6B3 $E6A3: C-----  78       SEI  
  0x05E6B4 $E6A4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E6B5 $E6A5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E6B6 $E6A6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E6B7 $E6A7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E6B8 $E6A8: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05E6B9 $E6A9: C-----  38       SEC  
  0x05E6BA $E6AA: C-----  3D 1F 1C AND  $1C1F,X
  0x05E6BD $E6AD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E6BE $E6AE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E6BF $E6AF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E6C0 $E6B0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E6C1 $E6B1: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E6C2 $E6B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6C3 $E6B3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E6C4 $E6B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6C5 $E6B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6C6 $E6B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6C7 $E6B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6C8 $E6B8: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E6C9 $E6B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6CA $E6BA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E6CB $E6BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6CC $E6BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6CD $E6BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6CE $E6BE: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E6CF $E6BF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E6D0 $E6C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6D1 $E6C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6D2 $E6C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6D3 $E6C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6D4 $E6C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6D5 $E6C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6D6 $E6C6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E6D7 $E6C7: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05E6D8 $E6C8: C-----  BA       TSX  
  0x05E6D9 $E6C9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E6DA $E6CA: C-----  86 02    STX  $02
  0x05E6DC $E6CC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E6DD $E6CD: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05E6DE $E6CE: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x05E6DF $E6CF: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05E6E0 $E6D0: C-----  FD FD 75 SBC  $75FD,X
  0x05E6E3 $E6D3: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x05E6E4 $E6D4: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05E6E5 $E6D5: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05E6E6 $E6D6: C-----  E6 FC    INC  $FC
  0x05E6E8 $E6D8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E6E9 $E6D9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E6EA $E6DA: C-----  8A       TXA  
  0x05E6EB $E6DB: C-----  76 0C    ROR  $0C,X
  0x05E6ED $E6DD: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05E6EE $E6DE: C-----  18       CLC  
  0x05E6EF $E6DF: C-----  00       BRK  
  0x05E6F0 $E6E0: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05E6F1 $E6E1: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E6F2 $E6E2: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05E6F3 $E6E3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E6F4 $E6E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6F5 $E6E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6F6 $E6E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6F7 $E6E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E6F8 $E6E8: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05E6F9 $E6E9: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05E6FA $E6EA: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E6FB $E6EB: C-----  FE CE FE INC  $FECE,X
  0x05E6FE $E6EE: C-----  FE FD FF INC  $FFFD,X
  0x05E701 $E6F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E702 $E6F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E703 $E6F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E704 $E6F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E705 $E6F5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05E706 $E6F6: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E707 $E6F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E708 $E6F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E709 $E6F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E70A $E6FA: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E70B $E6FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E70C $E6FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E70D $E6FD: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E70E $E6FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E70F $E6FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E710 $E700: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E711 $E701: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E712 $E702: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x05E713 $E703: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E714 $E704: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E715 $E705: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05E716 $E706: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E717 $E707: C-----  05 19    ORA  $19
  0x05E719 $E709: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E71A $E70A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E71B $E70B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E71C $E70C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E71D $E70D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E71E $E70E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E71F $E70F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E720 $E710: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E721 $E711: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E722 $E712: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E723 $E713: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E724 $E714: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E725 $E715: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E726 $E716: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E727 $E717: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E728 $E718: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E729 $E719: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E72A $E71A: C-----  BD BD DB LDA  $DBBD,X
  0x05E72D $E71D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E72E $E71E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E72F $E71F: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E730 $E720: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E731 $E721: C-----  01 01    ORA  ($01,X)
  0x05E733 $E723: C-----  01 03    ORA  ($03,X)
  0x05E735 $E725: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E736 $E726: C-----  1D 79 01 ORA  $0179,X
  0x05E739 $E729: C-----  00       BRK  
  0x05E73A $E72A: C-----  00       BRK  
  0x05E73B $E72B: C-----  00       BRK  
  0x05E73C $E72C: C-----  00       BRK  
  0x05E73D $E72D: C-----  00       BRK  
  0x05E73E $E72E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E73F $E72F: C-----  06 FF    ASL  $FF
  0x05E741 $E731: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E742 $E732: C-----  BC C3 7F LDY  $7FC3,X
  0x05E745 $E735: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05E746 $E736: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x05E747 $E737: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E748 $E738: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E749 $E739: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E74A $E73A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E74B $E73B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05E74C $E73C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E74D $E73D: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E74E $E73E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E74F $E73F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E750 $E740: C-----  FE FC FE INC  $FEFC,X
  0x05E753 $E743: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05E754 $E744: C-----  F5 FF    SBC  $FF,X
  0x05E756 $E746: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05E757 $E747: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E758 $E748: C-----  1D E3 F9 ORA  $F9E3,X
  0x05E75B $E74B: C-----  E5 FA    SBC  $FA
  0x05E75D $E74D: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05E75E $E74E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05E75F $E74F: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E760 $E750: C-----  F0 F8    BEQ  $E74A
  0x05E762 $E752: C-----  F8       SED  
  0x05E763 $E753: C-----  F0 F0    BEQ  $E745
  0x05E765 $E755: C-----  E0 C0    CPX  #$C0
  0x05E767 $E757: C-----  E0 40    CPX  #$40
  0x05E769 $E759: C-----  C0 80    CPY  #$80
  0x05E76B $E75B: C-----  00       BRK  
  0x05E76C $E75C: C-----  00       BRK  
  0x05E76D $E75D: C-----  00       BRK  
  0x05E76E $E75E: C-----  00       BRK  
  0x05E76F $E75F: C-----  00       BRK  
  0x05E770 $E760: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05E771 $E761: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x05E772 $E762: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E773 $E763: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E774 $E764: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E775 $E765: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E776 $E766: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E777 $E767: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E778 $E768: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E779 $E769: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05E77A $E76A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E77B $E76B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E77C $E76C: C-----  FE FE FC INC  $FCFE,X
  0x05E77F $E76F: C-----  F8       SED  
  0x05E780 $E770: C-----  C0 80    CPY  #$80
  0x05E782 $E772: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E783 $E773: C-----  C0 A0    CPY  #$A0
  0x05E785 $E775: C-----  90 0C    BCC  $E783
  0x05E787 $E777: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E788 $E778: C-----  00       BRK  
  0x05E789 $E779: C-----  00       BRK  
  0x05E78A $E77A: C-----  00       BRK  
  0x05E78B $E77B: C-----  00       BRK  
  0x05E78C $E77C: C-----  40       RTI  
  0x05E78D $E77D: C-----  60       RTS  
  0x05E78E $E77E: C-----  F0 CC    BEQ  $E74C
  0x05E790 $E780: C-----  00       BRK  
  0x05E791 $E781: C-----  00       BRK  
  0x05E792 $E782: C-----  00       BRK  
  0x05E793 $E783: C-----  01 07    ORA  ($07,X)
  0x05E795 $E785: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E796 $E786: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E797 $E787: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E798 $E788: C-----  00       BRK  
  0x05E799 $E789: C-----  00       BRK  
  0x05E79A $E78A: C-----  00       BRK  
  0x05E79B $E78B: C-----  00       BRK  
  0x05E79C $E78C: C-----  00       BRK  
  0x05E79D $E78D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E79E $E78E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05E79F $E78F: C-----  08       PHP  
  0x05E7A0 $E790: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7A1 $E791: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E7A2 $E792: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E7A3 $E793: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7A4 $E794: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7A5 $E795: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7A6 $E796: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7A7 $E797: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7A8 $E798: C-----  00       BRK  
  0x05E7A9 $E799: C-----  00       BRK  
  0x05E7AA $E79A: C-----  00       BRK  
  0x05E7AB $E79B: C-----  00       BRK  
  0x05E7AC $E79C: C-----  00       BRK  
  0x05E7AD $E79D: C-----  00       BRK  
  0x05E7AE $E79E: C-----  00       BRK  
  0x05E7AF $E79F: C-----  00       BRK  
  0x05E7B0 $E7A0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E7B1 $E7A1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E7B2 $E7A2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E7B3 $E7A3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E7B4 $E7A4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E7B5 $E7A5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E7B6 $E7A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7B7 $E7A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7B8 $E7A8: C-----  08       PHP  
  0x05E7B9 $E7A9: C-----  18       CLC  
  0x05E7BA $E7AA: C-----  10 10    BPL  $E7BC
  0x05E7BC $E7AC: C-----  31 31    AND  ($31),Y
  0x05E7BE $E7AE: C-----  31 31    AND  ($31),Y
  0x05E7C0 $E7B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7C1 $E7B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7C2 $E7B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7C3 $E7B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7C4 $E7B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7C5 $E7B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7C6 $E7B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7C7 $E7B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7C8 $E7B8: C-----  40       RTI  
  0x05E7C9 $E7B9: C-----  40       RTI  
  0x05E7CA $E7BA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E7CB $E7BB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E7CC $E7BC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E7CD $E7BD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E7CE $E7BE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E7CF $E7BF: C-----  C0 F0    CPY  #$F0
  0x05E7D1 $E7C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7D2 $E7C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7D3 $E7C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7D4 $E7C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7D5 $E7C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7D6 $E7C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7D7 $E7C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7D8 $E7C8: C-----  00       BRK  
  0x05E7D9 $E7C9: C-----  F0 7C    BEQ  $E847
  0x05E7DB $E7CB: C-----  09 01    ORA  #$01
  0x05E7DD $E7CD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7DE $E7CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7DF $E7CF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7E0 $E7D0: C-----  00       BRK  
  0x05E7E1 $E7D1: C-----  00       BRK  
  0x05E7E2 $E7D2: C-----  C0 F0    CPY  #$F0
  0x05E7E4 $E7D4: C-----  F8       SED  
  0x05E7E5 $E7D5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E7E6 $E7D6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E7E7 $E7D7: C-----  FE 00 00 INC  $0000,X
  0x05E7EA $E7DA: C-----  00       BRK  
  0x05E7EB $E7DB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E7EC $E7DC: C-----  00       BRK  
  0x05E7ED $E7DD: C-----  00       BRK  
  0x05E7EE $E7DE: C-----  00       BRK  
  0x05E7EF $E7DF: C-----  00       BRK  
  0x05E7F0 $E7E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7F1 $E7E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7F2 $E7E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7F3 $E7E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7F4 $E7E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7F5 $E7E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7F6 $E7E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7F7 $E7E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E7F8 $E7E8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7F9 $E7E9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7FA $E7EA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7FB $E7EB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E7FC $E7EC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E7FD $E7ED: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7FE $E7EE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E7FF $E7EF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E800 $E7F0: C-----  FE FE FF INC  $FFFE,X
  0x05E803 $E7F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E804 $E7F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E805 $E7F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E806 $E7F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E807 $E7F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E808 $E7F8: C-----  00       BRK  
  0x05E809 $E7F9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E80A $E7FA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E80B $E7FB: C-----  C0 40    CPY  #$40
  0x05E80D $E7FD: C-----  20 10 CC JSR  $CC10
  0x05E810 $E800: ------  .byte $00
  0x05E811 $E801: ------  .byte $00
  0x05E812 $E802: ------  .byte $00
  0x05E813 $E803: ------  .byte $00
  0x05E814 $E804: ------  .byte $00
  0x05E815 $E805: ------  .byte $00
  0x05E816 $E806: ------  .byte $00
  0x05E817 $E807: ------  .byte $00
  0x05E818 $E808: ------  .byte $00
  0x05E819 $E809: ------  .byte $00
  0x05E81A $E80A: ------  .byte $00
  0x05E81B $E80B: ------  .byte $00
  0x05E81C $E80C: ------  .byte $00
  0x05E81D $E80D: ------  .byte $00
  0x05E81E $E80E: ------  .byte $00
  0x05E81F $E80F: ------  .byte $00
  0x05E820 $E810: C-----  00       BRK  
  0x05E821 $E811: C-----  00       BRK  
  0x05E822 $E812: C-----  00       BRK  
  0x05E823 $E813: C-----  00       BRK  
  0x05E824 $E814: C-----  00       BRK  
  0x05E825 $E815: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E826 $E816: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05E827 $E817: C-----  30 00    BMI  $E819
  0x05E829 $E819: C-----  00       BRK  
  0x05E82A $E81A: C-----  00       BRK  
  0x05E82B $E81B: C-----  00       BRK  
  0x05E82C $E81C: C-----  00       BRK  
  0x05E82D $E81D: C-----  00       BRK  
  0x05E82E $E81E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E82F $E81F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E830 $E820: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E831 $E821: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E832 $E822: C-----  08       PHP  
  0x05E833 $E823: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05E834 $E824: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E835 $E825: C-----  00       BRK  
  0x05E836 $E826: C-----  00       BRK  
  0x05E837 $E827: C-----  00       BRK  
  0x05E838 $E828: C-----  00       BRK  
  0x05E839 $E829: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E83A $E82A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E83B $E82B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05E83C $E82C: C-----  00       BRK  
  0x05E83D $E82D: C-----  00       BRK  
  0x05E83E $E82E: C-----  00       BRK  
  0x05E83F $E82F: C-----  00       BRK  
  0x05E840 $E830: C-----  40       RTI  
  0x05E841 $E831: C-----  40       RTI  
  0x05E842 $E832: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E843 $E833: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E844 $E834: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E845 $E835: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E846 $E836: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E847 $E837: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E848 $E838: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E849 $E839: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E84A $E83A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E84B $E83B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E84C $E83C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E84D $E83D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E84E $E83E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E84F $E83F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E850 $E840: C-----  00       BRK  
  0x05E851 $E841: C-----  00       BRK  
  0x05E852 $E842: C-----  00       BRK  
  0x05E853 $E843: C-----  00       BRK  
  0x05E854 $E844: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E855 $E845: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E856 $E846: C-----  00       BRK  
  0x05E857 $E847: C-----  00       BRK  
  0x05E858 $E848: C-----  00       BRK  
  0x05E859 $E849: C-----  00       BRK  
  0x05E85A $E84A: C-----  00       BRK  
  0x05E85B $E84B: C-----  00       BRK  
  0x05E85C $E84C: C-----  00       BRK  
  0x05E85D $E84D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E85E $E84E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E85F $E84F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E860 $E850: C-----  00       BRK  
  0x05E861 $E851: C-----  00       BRK  
  0x05E862 $E852: C-----  00       BRK  
  0x05E863 $E853: C-----  00       BRK  
  0x05E864 $E854: C-----  C0 38    CPY  #$38
  0x05E866 $E856: C-----  06 01    ASL  $01
  0x05E868 $E858: C-----  00       BRK  
  0x05E869 $E859: C-----  00       BRK  
  0x05E86A $E85A: C-----  00       BRK  
  0x05E86B $E85B: C-----  00       BRK  
  0x05E86C $E85C: C-----  00       BRK  
  0x05E86D $E85D: C-----  C0 F8    CPY  #$F8
  0x05E86F $E85F: C-----  FE 00 70 INC  $7000,X
  0x05E872 $E862: C-----  F8       SED  
  0x05E873 $E863: C-----  00       BRK  
  0x05E874 $E864: C-----  F8       SED  
  0x05E875 $E865: C-----  00       BRK  
  0x05E876 $E866: C-----  F8       SED  
  0x05E877 $E867: C-----  00       BRK  
  0x05E878 $E868: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E879 $E869: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05E87A $E86A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E87B $E86B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E87C $E86C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E87D $E86D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E87E $E86E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E87F $E86F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E880 $E870: ------  .byte $00
  0x05E881 $E871: ------  .byte $00
  0x05E882 $E872: ------  .byte $00
  0x05E883 $E873: ------  .byte $00
  0x05E884 $E874: ------  .byte $00
  0x05E885 $E875: ------  .byte $00
  0x05E886 $E876: ------  .byte $00
  0x05E887 $E877: ------  .byte $00
  0x05E888 $E878: ------  .byte $00
  0x05E889 $E879: ------  .byte $7E
  0x05E88A $E87A: ------  .byte $42
  0x05E88B $E87B: ------  .byte $42
  0x05E88C $E87C: ------  .byte $42
  0x05E88D $E87D: ------  .byte $42
  0x05E88E $E87E: ------  .byte $7E
  0x05E88F $E87F: ------  .byte $00
  0x05E890 $E880: C-----  01 01    ORA  ($01,X)
  0x05E892 $E882: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E893 $E883: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05E894 $E884: C-----  30 C0    BMI  $E846
  0x05E896 $E886: C-----  01 1F    ORA  ($1F,X)
  0x05E898 $E888: C-----  00       BRK  
  0x05E899 $E889: C-----  00       BRK  
  0x05E89A $E88A: C-----  00       BRK  
  0x05E89B $E88B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E89C $E88C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E89D $E88D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E89E $E88E: C-----  FE E0 07 INC  $07E0,X
  0x05E8A1 $E891: C-----  78       SEI  
  0x05E8A2 $E892: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E8A3 $E893: C-----  00       BRK  
  0x05E8A4 $E894: C-----  00       BRK  
  0x05E8A5 $E895: C-----  00       BRK  
  0x05E8A6 $E896: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8A7 $E897: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8A8 $E898: C-----  F8       SED  
  0x05E8A9 $E899: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05E8AA $E89A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E8AB $E89B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8AC $E89C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8AD $E89D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8AE $E89E: C-----  00       BRK  
  0x05E8AF $E89F: C-----  00       BRK  
  0x05E8B0 $E8A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8B1 $E8A1: C-----  FE FE 02 INC  $02FE,X
  0x05E8B4 $E8A4: C-----  01 01    ORA  ($01,X)
  0x05E8B6 $E8A6: C-----  01 00    ORA  ($00,X)
  0x05E8B8 $E8A8: C-----  00       BRK  
  0x05E8B9 $E8A9: C-----  01 01    ORA  ($01,X)
  0x05E8BB $E8AB: C-----  01 00    ORA  ($00,X)
  0x05E8BD $E8AD: C-----  00       BRK  
  0x05E8BE $E8AE: C-----  00       BRK  
  0x05E8BF $E8AF: C-----  00       BRK  
  0x05E8C0 $E8B0: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05E8C1 $E8B1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E8C2 $E8B2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E8C3 $E8B3: C-----  F5 F1    SBC  $F1,X
  0x05E8C5 $E8B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8C6 $E8B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8C7 $E8B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8C8 $E8B8: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05E8C9 $E8B9: C-----  35 31    AND  $31,X
  0x05E8CB $E8BB: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05E8CC $E8BC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E8CD $E8BD: C-----  B9 BF 3F LDA  $3FBF,Y
  0x05E8D0 $E8C0: C-----  FE 01 00 INC  $0001,X
  0x05E8D3 $E8C3: C-----  00       BRK  
  0x05E8D4 $E8C4: C-----  00       BRK  
  0x05E8D5 $E8C5: C-----  00       BRK  
  0x05E8D6 $E8C6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E8D7 $E8C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8D8 $E8C8: C-----  01 FE    ORA  ($FE,X)
  0x05E8DA $E8CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8DB $E8CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8DC $E8CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8DD $E8CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8DE $E8CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E8DF $E8CF: C-----  00       BRK  
  0x05E8E0 $E8D0: C-----  00       BRK  
  0x05E8E1 $E8D1: C-----  E0 1C    CPX  #$1C
  0x05E8E3 $E8D3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E8E4 $E8D4: C-----  00       BRK  
  0x05E8E5 $E8D5: C-----  00       BRK  
  0x05E8E6 $E8D6: C-----  00       BRK  
  0x05E8E7 $E8D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8E8 $E8D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8E9 $E8D9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E8EA $E8DA: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05E8EB $E8DB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E8EC $E8DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8ED $E8DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8EE $E8DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8EF $E8DF: C-----  00       BRK  
  0x05E8F0 $E8E0: C-----  E9 E7    SBC  #$E7
  0x05E8F2 $E8E2: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E8F3 $E8E3: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E8F4 $E8E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8F5 $E8E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8F6 $E8E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8F7 $E8E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8F8 $E8E8: C-----  96 DC    STX  $DC,Y
  0x05E8FA $E8EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8FB $E8EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8FC $E8EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8FD $E8ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E8FE $E8EE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E8FF $E8EF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E900 $E8F0: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05E901 $E8F1: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05E902 $E8F2: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05E903 $E8F3: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05E904 $E8F4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05E905 $E8F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E906 $E8F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E907 $E8F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E908 $E8F8: C-----  2A       ROL  A
  0x05E909 $E8F9: C-----  AE 8F DF LDX  $DF8F
  0x05E90C $E8FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E90D $E8FD: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E90E $E8FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E90F $E8FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E910 $E900: C-----  00       BRK  
  0x05E911 $E901: C-----  00       BRK  
  0x05E912 $E902: C-----  00       BRK  
  0x05E913 $E903: C-----  00       BRK  
  0x05E914 $E904: C-----  00       BRK  
  0x05E915 $E905: C-----  E4 1A    CPX  $1A
  0x05E917 $E907: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E918 $E908: C-----  00       BRK  
  0x05E919 $E909: C-----  00       BRK  
  0x05E91A $E90A: C-----  00       BRK  
  0x05E91B $E90B: C-----  00       BRK  
  0x05E91C $E90C: C-----  00       BRK  
  0x05E91D $E90D: C-----  00       BRK  
  0x05E91E $E90E: C-----  E0 F8    CPX  #$F8
  0x05E920 $E910: C-----  60       RTS  
  0x05E921 $E911: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E922 $E912: C-----  00       BRK  
  0x05E923 $E913: C-----  00       BRK  
  0x05E924 $E914: C-----  00       BRK  
  0x05E925 $E915: C-----  00       BRK  
  0x05E926 $E916: C-----  00       BRK  
  0x05E927 $E917: C-----  00       BRK  
  0x05E928 $E918: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E929 $E919: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E92A $E91A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E92B $E91B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E92C $E91C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E92D $E91D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E92E $E91E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E92F $E91F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E930 $E920: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E931 $E921: C-----  40       RTI  
  0x05E932 $E922: C-----  20 20 10 JSR  $1020
  0x05E935 $E925: C-----  10 10    BPL  $E937
  0x05E937 $E927: C-----  08       PHP  
  0x05E938 $E928: C-----  00       BRK  
  0x05E939 $E929: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05E93A $E92A: C-----  C0 C0    CPY  #$C0
  0x05E93C $E92C: C-----  E0 E0    CPX  #$E0
  0x05E93E $E92E: C-----  E0 F0    CPX  #$F0
  0x05E940 $E930: C-----  41 8A    EOR  ($8A,X)
  0x05E942 $E932: C-----  B6 F7    LDX  $F7,Y
  0x05E944 $E934: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E945 $E935: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E946 $E936: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E947 $E937: C-----  E1 BE    SBC  ($BE,X)
  0x05E949 $E939: C-----  75 49    ADC  $49,X
  0x05E94B $E93B: C-----  08       PHP  
  0x05E94C $E93C: C-----  24 AD    BIT  $AD
  0x05E94E $E93E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05E94F $E93F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E950 $E940: C-----  00       BRK  
  0x05E951 $E941: C-----  00       BRK  
  0x05E952 $E942: C-----  00       BRK  
  0x05E953 $E943: C-----  00       BRK  
  0x05E954 $E944: C-----  00       BRK  
  0x05E955 $E945: C-----  00       BRK  
  0x05E956 $E946: C-----  10 30    BPL  $E978
  0x05E958 $E948: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E959 $E949: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E95A $E94A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E95B $E94B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E95C $E94C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E95D $E94D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E95E $E94E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E95F $E94F: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E960 $E950: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E961 $E951: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05E962 $E952: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05E963 $E953: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x05E964 $E954: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05E965 $E955: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05E966 $E956: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05E967 $E957: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x05E968 $E958: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E969 $E959: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05E96A $E95A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05E96B $E95B: C-----  BC DC 0C LDY  $0CDC,X
  0x05E96E $E95E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05E96F $E95F: C-----  4C 74 F4 JMP  $F474
  0x05E972 $E962: C-----  F6 FF    INC  $FF,X
  0x05E974 $E964: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E975 $E965: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E976 $E966: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E977 $E967: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E978 $E968: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x05E979 $E969: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05E97A $E96A: C-----  69 F2    ADC  #$F2
  0x05E97C $E96C: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05E97D $E96D: C-----  F9 FD FF SBC  $FFFD,Y
  0x05E980 $E970: C-----  00       BRK  
  0x05E981 $E971: C-----  90 C8    BCC  $E93B
  0x05E983 $E973: C-----  F6 FF    INC  $FF,X
  0x05E985 $E975: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E986 $E976: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E987 $E977: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E988 $E978: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E989 $E979: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x05E98A $E97A: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x05E98B $E97B: C-----  49 30    EOR  #$30
  0x05E98D $E97D: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x05E98E $E97E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E98F $E97F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E990 $E980: C-----  08       PHP  
  0x05E991 $E981: C-----  08       PHP  
  0x05E992 $E982: C-----  08       PHP  
  0x05E993 $E983: C-----  08       PHP  
  0x05E994 $E984: C-----  C8       INY  
  0x05E995 $E985: C-----  28       PLP  
  0x05E996 $E986: C-----  FE FC F0 INC  $F0FC,X
  0x05E999 $E989: C-----  F0 F0    BEQ  $E97B
  0x05E99B $E98B: C-----  F0 30    BEQ  $E9BD
  0x05E99D $E98D: C-----  D0 00    BNE  $E98F
  0x05E99F $E98F: C-----  00       BRK  
  0x05E9A0 $E990: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E9A1 $E991: C-----  F1 F0    SBC  ($F0),Y
  0x05E9A3 $E993: C-----  F0 F0    BEQ  $E985
  0x05E9A5 $E995: C-----  F8       SED  
  0x05E9A6 $E996: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9A7 $E997: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9A8 $E998: C-----  30 28    BMI  $E9C2
  0x05E9AA $E99A: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x05E9AB $E99B: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x05E9AC $E99C: C-----  5D 5F 59 EOR  $595F,X
  0x05E9AF $E99F: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x05E9B0 $E9A0: C-----  EE C6 D6 INC  $D6C6
  0x05E9B3 $E9A3: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x05E9B4 $E9A4: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05E9B5 $E9A5: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05E9B6 $E9A6: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05E9B7 $E9A7: C-----  CE 10 38 DEC  $3810
  0x05E9BA $E9AA: C-----  28       PLP  
  0x05E9BB $E9AB: C-----  68       PLA  
  0x05E9BC $E9AC: C-----  48       PHA  
  0x05E9BD $E9AD: C-----  58       CLI  
  0x05E9BE $E9AE: C-----  D0 B0    BNE  $E960
  0x05E9C0 $E9B0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E9C1 $E9B1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05E9C2 $E9B2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05E9C3 $E9B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E9C4 $E9B4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05E9C5 $E9B5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E9C6 $E9B6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E9C7 $E9B7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E9C8 $E9B8: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x05E9C9 $E9B9: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x05E9CA $E9BA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E9CB $E9BB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05E9CC $E9BC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E9CD $E9BD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E9CE $E9BE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E9CF $E9BF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05E9D0 $E9C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D1 $E9C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D2 $E9C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D3 $E9C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D4 $E9C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D5 $E9C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D6 $E9C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D7 $E9C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D8 $E9C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9D9 $E9C9: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05E9DA $E9CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9DB $E9CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9DC $E9CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9DD $E9CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9DE $E9CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9DF $E9CF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E9E0 $E9D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9E1 $E9D1: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05E9E2 $E9D2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E9E3 $E9D3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E9E4 $E9D4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E9E5 $E9D5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05E9E6 $E9D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9E7 $E9D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9E8 $E9D8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05E9E9 $E9D9: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05E9EA $E9DA: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05E9EB $E9DB: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05E9EC $E9DC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05E9ED $E9DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9EE $E9DE: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05E9EF $E9DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9F0 $E9E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9F1 $E9E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9F2 $E9E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9F3 $E9E3: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E9F4 $E9E4: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E9F5 $E9E5: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E9F6 $E9E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9F7 $E9E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9F8 $E9E8: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05E9F9 $E9E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05E9FA $E9EA: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05E9FB $E9EB: C-----  BD BD DB LDA  $DBBD,X
  0x05E9FE $E9EE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05E9FF $E9EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA00 $E9F0: C-----  FE FE FC INC  $FCFE,X
  0x05EA03 $E9F3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EA04 $E9F4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EA05 $E9F5: C-----  F8       SED  
  0x05EA06 $E9F6: C-----  F8       SED  
  0x05EA07 $E9F7: C-----  F0 30    BEQ  $EA29
  0x05EA09 $E9F9: C-----  28       PLP  
  0x05EA0A $E9FA: C-----  48       PHA  
  0x05EA0B $E9FB: C-----  68       PLA  
  0x05EA0C $E9FC: C-----  60       RTS  
  0x05EA0D $E9FD: C-----  50 D0    BVC  $E9CF
  0x05EA0F $E9FF: C-----  E0 00    CPX  #$00
  0x05EA11 $EA01: C-----  00       BRK  
  0x05EA12 $EA02: C-----  00       BRK  
  0x05EA13 $EA03: C-----  01 07    ORA  ($07,X)
  0x05EA15 $EA05: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EA16 $EA06: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EA17 $EA07: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EA18 $EA08: C-----  00       BRK  
  0x05EA19 $EA09: C-----  00       BRK  
  0x05EA1A $EA0A: C-----  00       BRK  
  0x05EA1B $EA0B: C-----  00       BRK  
  0x05EA1C $EA0C: C-----  00       BRK  
  0x05EA1D $EA0D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05EA1E $EA0E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05EA1F $EA0F: C-----  0D 7F 7F ORA  $7F7F
  0x05EA22 $EA12: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EA23 $EA13: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EA24 $EA14: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA25 $EA15: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA26 $EA16: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EA27 $EA17: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EA28 $EA18: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA29 $EA19: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA2A $EA1A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA2B $EA1B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA2C $EA1C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EA2D $EA1D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EA2E $EA1E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EA2F $EA1F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EA30 $EA20: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA31 $EA21: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA32 $EA22: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EA33 $EA23: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EA34 $EA24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA35 $EA25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA36 $EA26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA37 $EA27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA38 $EA28: C-----  1D 1D 3D ORA  $3D1D,X
  0x05EA3B $EA2B: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05EA3C $EA2C: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05EA3D $EA2D: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x05EA3E $EA2E: C-----  78       SEI  
  0x05EA3F $EA2F: C-----  78       SEI  
  0x05EA40 $EA30: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EA41 $EA31: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EA42 $EA32: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EA43 $EA33: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EA44 $EA34: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EA45 $EA35: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EA46 $EA36: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EA47 $EA37: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA48 $EA38: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EA49 $EA39: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EA4A $EA3A: C-----  01 00    ORA  ($00,X)
  0x05EA4C $EA3C: C-----  00       BRK  
  0x05EA4D $EA3D: C-----  01 01    ORA  ($01,X)
  0x05EA4F $EA3F: C-----  01 FF    ORA  ($FF,X)
  0x05EA51 $EA41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA52 $EA42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA53 $EA43: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EA54 $EA44: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EA55 $EA45: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EA56 $EA46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA57 $EA47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA58 $EA48: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EA59 $EA49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA5A $EA4A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EA5B $EA4B: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x05EA5C $EA4C: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x05EA5D $EA4D: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05EA5E $EA4E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EA5F $EA4F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA60 $EA50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA61 $EA51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA62 $EA52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA63 $EA53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA64 $EA54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA65 $EA55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA66 $EA56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA67 $EA57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA68 $EA58: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA69 $EA59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA6A $EA5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA6B $EA5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA6C $EA5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA6D $EA5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA6E $EA5E: C-----  FE FE F7 INC  $F7FE,X
  0x05EA71 $EA61: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EA72 $EA62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA73 $EA63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA74 $EA64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA75 $EA65: C-----  FD 7B 87 SBC  $877B,X
  0x05EA78 $EA68: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EA79 $EA69: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA7A $EA6A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA7B $EA6B: C-----  FE 7D 03 INC  $037D,X
  0x05EA7E $EA6E: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EA7F $EA6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA80 $EA70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA81 $EA71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA82 $EA72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA83 $EA73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA84 $EA74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA85 $EA75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA86 $EA76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA87 $EA77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA88 $EA78: C-----  FE BE 7E INC  $7EBE,X
  0x05EA8B $EA7B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EA8C $EA7C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EA8D $EA7D: C-----  F8       SED  
  0x05EA8E $EA7E: C-----  F0 E0    BEQ  $EA60
  0x05EA90 $EA80: C-----  00       BRK  
  0x05EA91 $EA81: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EA92 $EA82: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA93 $EA83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA94 $EA84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EA95 $EA85: C-----  FE F8 F0 INC  $F0F8,X
  0x05EA98 $EA88: C-----  00       BRK  
  0x05EA99 $EA89: C-----  00       BRK  
  0x05EA9A $EA8A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EA9B $EA8B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EA9C $EA8C: C-----  7E F9 F7 ROR  $F7F9,X
  0x05EA9F $EA8F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05EAA0 $EA90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAA1 $EA91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAA2 $EA92: C-----  FD F9 B0 SBC  $B0F9,X
  0x05EAA5 $EA95: C-----  20 00 00 JSR  $0000
  0x05EAA8 $EA98: C-----  00       BRK  
  0x05EAA9 $EA99: C-----  C0 C2    CPY  #$C2
  0x05EAAB $EA9B: C-----  86 4F    STX  $4F
  0x05EAAD $EA9D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EAAE $EA9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAAF $EA9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAB0 $EAA0: C-----  E0 C0    CPX  #$C0
  0x05EAB2 $EAA2: C-----  C0 80    CPY  #$80
  0x05EAB4 $EAA4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EAB5 $EAA5: C-----  00       BRK  
  0x05EAB6 $EAA6: C-----  00       BRK  
  0x05EAB7 $EAA7: C-----  00       BRK  
  0x05EAB8 $EAA8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EAB9 $EAA9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05EABA $EAAA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EABB $EAAB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EABC $EAAC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EABD $EAAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EABE $EAAE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EABF $EAAF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAC0 $EAB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAC1 $EAB1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EAC2 $EAB2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EAC3 $EAB3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EAC4 $EAB4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EAC5 $EAB5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EAC6 $EAB6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EAC7 $EAB7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EAC8 $EAB8: C-----  7D BB DB ADC  $DBBB,X
  0x05EACB $EABB: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05EACC $EABC: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05EACD $EABD: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05EACE $EABE: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05EACF $EABF: C-----  F1 FF    SBC  ($FF),Y
  0x05EAD1 $EAC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAD2 $EAC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAD3 $EAC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAD4 $EAC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAD5 $EAC5: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05EAD6 $EAC6: C-----  00       BRK  
  0x05EAD7 $EAC7: C-----  00       BRK  
  0x05EAD8 $EAC8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAD9 $EAC9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EADA $EACA: C-----  3E 00 00 ROL  $0000,X
  0x05EADD $EACD: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05EADE $EACE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EADF $EACF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAE0 $EAD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAE1 $EAD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAE2 $EAD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAE3 $EAD3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EAE4 $EAD4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EAE5 $EAD5: C-----  01 00    ORA  ($00,X)
  0x05EAE7 $EAD7: C-----  00       BRK  
  0x05EAE8 $EAD8: C-----  C0 80    CPY  #$80
  0x05EAEA $EADA: C-----  00       BRK  
  0x05EAEB $EADB: C-----  30 FC    BMI  $EAD9
  0x05EAED $EADD: C-----  FE FF FF INC  $FFFF,X
  0x05EAF0 $EAE0: C-----  FE FE FE INC  $FEFE,X
  0x05EAF3 $EAE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAF4 $EAE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAF5 $EAE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAF6 $EAE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAF7 $EAE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EAF8 $EAE8: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05EAF9 $EAE9: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05EAFA $EAEA: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05EAFB $EAEB: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05EAFC $EAEC: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05EAFD $EAED: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05EAFE $EAEE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EAFF $EAEF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EB00 $EAF0: C-----  F8       SED  
  0x05EB01 $EAF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB02 $EAF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB03 $EAF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB04 $EAF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB05 $EAF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB06 $EAF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB07 $EAF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB08 $EAF8: C-----  00       BRK  
  0x05EB09 $EAF9: C-----  F0 0F    BEQ  $EB0A
  0x05EB0B $EAFB: C-----  F0 FE    BEQ  $EAFB
  0x05EB0D $EAFD: C-----  FD FD FD SBC  $FDFD,X
  0x05EB10 $EB00: C-----  CE 9E BE DEC  $BE9E
  0x05EB13 $EB03: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05EB14 $EB04: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05EB15 $EB05: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05EB16 $EB06: C-----  B0 A0    BCS  $EAA8
  0x05EB18 $EB08: C-----  F0 E0    BEQ  $EAEA
  0x05EB1A $EB0A: C-----  C0 C0    CPY  #$C0
  0x05EB1C $EB0C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EB1D $EB0D: C-----  00       BRK  
  0x05EB1E $EB0E: C-----  00       BRK  
  0x05EB1F $EB0F: C-----  00       BRK  
  0x05EB20 $EB10: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EB21 $EB11: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EB22 $EB12: C-----  01 07    ORA  ($07,X)
  0x05EB24 $EB14: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EB25 $EB15: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EB26 $EB16: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EB27 $EB17: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EB28 $EB18: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EB29 $EB19: C-----  01 00    ORA  ($00,X)
  0x05EB2B $EB1B: C-----  00       BRK  
  0x05EB2C $EB1C: C-----  00       BRK  
  0x05EB2D $EB1D: C-----  00       BRK  
  0x05EB2E $EB1E: C-----  00       BRK  
  0x05EB2F $EB1F: C-----  00       BRK  
  0x05EB30 $EB20: C-----  00       BRK  
  0x05EB31 $EB21: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EB32 $EB22: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EB33 $EB23: C-----  C0 C0    CPY  #$C0
  0x05EB35 $EB25: C-----  E0 F8    CPX  #$F8
  0x05EB37 $EB27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB38 $EB28: C-----  00       BRK  
  0x05EB39 $EB29: C-----  00       BRK  
  0x05EB3A $EB2A: C-----  00       BRK  
  0x05EB3B $EB2B: C-----  00       BRK  
  0x05EB3C $EB2C: C-----  00       BRK  
  0x05EB3D $EB2D: C-----  00       BRK  
  0x05EB3E $EB2E: C-----  00       BRK  
  0x05EB3F $EB2F: C-----  18       CLC  
  0x05EB40 $EB30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB41 $EB31: C-----  FE FC F8 INC  $F8FC,X
  0x05EB44 $EB34: C-----  B0 20    BCS  $EB56
  0x05EB46 $EB36: C-----  00       BRK  
  0x05EB47 $EB37: C-----  00       BRK  
  0x05EB48 $EB38: C-----  00       BRK  
  0x05EB49 $EB39: C-----  C1 C3    CMP  ($C3,X)
  0x05EB4B $EB3B: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EB4C $EB3C: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x05EB4D $EB3D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EB4E $EB3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB4F $EB3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB50 $EB40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB51 $EB41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB52 $EB42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB53 $EB43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB54 $EB44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB55 $EB45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB56 $EB46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB57 $EB47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB58 $EB48: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05EB59 $EB49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB5A $EB4A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB5B $EB4B: C-----  7E 3D 83 ROR  $833D,X
  0x05EB5E $EB4E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB5F $EB4F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EB60 $EB50: C-----  F0 F0    BEQ  $EB42
  0x05EB62 $EB52: C-----  D0 90    BNE  $EAE4
  0x05EB64 $EB54: C-----  B0 B0    BCS  $EB06
  0x05EB66 $EB56: C-----  60       RTS  
  0x05EB67 $EB57: C-----  A0 E0    LDY  #$E0
  0x05EB69 $EB59: C-----  C0 A0    CPY  #$A0
  0x05EB6B $EB5B: C-----  60       RTS  
  0x05EB6C $EB5C: C-----  40       RTI  
  0x05EB6D $EB5D: C-----  40       RTI  
  0x05EB6E $EB5E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EB6F $EB5F: C-----  00       BRK  
  0x05EB70 $EB60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB71 $EB61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB72 $EB62: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EB73 $EB63: C-----  00       BRK  
  0x05EB74 $EB64: C-----  00       BRK  
  0x05EB75 $EB65: C-----  00       BRK  
  0x05EB76 $EB66: C-----  00       BRK  
  0x05EB77 $EB67: C-----  00       BRK  
  0x05EB78 $EB68: C-----  00       BRK  
  0x05EB79 $EB69: C-----  00       BRK  
  0x05EB7A $EB6A: C-----  C0 FF    CPY  #$FF
  0x05EB7C $EB6C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB7D $EB6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB7E $EB6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB7F $EB6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB80 $EB70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB81 $EB71: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05EB82 $EB72: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EB83 $EB73: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EB84 $EB74: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EB85 $EB75: C-----  01 00    ORA  ($00,X)
  0x05EB87 $EB77: C-----  00       BRK  
  0x05EB88 $EB78: C-----  00       BRK  
  0x05EB89 $EB79: C-----  10 F8    BPL  $EB73
  0x05EB8B $EB7B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EB8C $EB7C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EB8D $EB7D: C-----  FE FF FF INC  $FFFF,X
  0x05EB90 $EB80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB91 $EB81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB92 $EB82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB93 $EB83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB94 $EB84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EB95 $EB85: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05EB96 $EB86: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EB97 $EB87: C-----  01 0F    ORA  ($0F,X)
  0x05EB99 $EB89: C-----  31 3E    AND  ($3E),Y
  0x05EB9B $EB8B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EB9C $EB8C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EB9D $EB8D: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x05EB9E $EB8E: C-----  79 FE 00 ADC  $00FE,Y
  0x05EBA1 $EB91: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EBA2 $EB92: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05EBA3 $EB93: C-----  20 10 7C JSR  $7C10
  0x05EBA6 $EB96: C-----  20 10 00 JSR  $0010
  0x05EBA9 $EB99: C-----  00       BRK  
  0x05EBAA $EB9A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EBAB $EB9B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EBAC $EB9C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EBAD $EB9D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EBAE $EB9E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EBAF $EB9F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EBB0 $EBA0: C-----  00       BRK  
  0x05EBB1 $EBA1: C-----  00       BRK  
  0x05EBB2 $EBA2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EBB3 $EBA3: C-----  E0 F0    CPX  #$F0
  0x05EBB5 $EBA5: C-----  F8       SED  
  0x05EBB6 $EBA6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EBB7 $EBA7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EBB8 $EBA8: C-----  00       BRK  
  0x05EBB9 $EBA9: C-----  00       BRK  
  0x05EBBA $EBAA: C-----  00       BRK  
  0x05EBBB $EBAB: C-----  00       BRK  
  0x05EBBC $EBAC: C-----  60       RTS  
  0x05EBBD $EBAD: C-----  90 C8    BCC  $EB77
  0x05EBBF $EBAF: C-----  E8       INX  
  0x05EBC0 $EBB0: C-----  38       SEC  
  0x05EBC1 $EBB1: C-----  16 08    ASL  $08,X
  0x05EBC3 $EBB3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05EBC4 $EBB4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05EBC5 $EBB5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05EBC6 $EBB6: C-----  01 00    ORA  ($00,X)
  0x05EBC8 $EBB8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EBC9 $EBB9: C-----  09 07    ORA  #$07
  0x05EBCB $EBBB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EBCC $EBBC: C-----  01 01    ORA  ($01,X)
  0x05EBCE $EBBE: C-----  00       BRK  
  0x05EBCF $EBBF: C-----  00       BRK  
  0x05EBD0 $EBC0: C-----  C0 60    CPY  #$60
  0x05EBD2 $EBC2: C-----  10 08    BPL  $EBCC
  0x05EBD4 $EBC4: C-----  08       PHP  
  0x05EBD5 $EBC5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05EBD6 $EBC6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05EBD7 $EBC7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05EBD8 $EBC8: C-----  00       BRK  
  0x05EBD9 $EBC9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EBDA $EBCA: C-----  E0 F0    CPX  #$F0
  0x05EBDC $EBCC: C-----  F0 F8    BEQ  $EBC6
  0x05EBDE $EBCE: C-----  F8       SED  
  0x05EBDF $EBCF: C-----  F8       SED  
  0x05EBE0 $EBD0: ------  .byte $FF
  0x05EBE1 $EBD1: ------  .byte $FF
  0x05EBE2 $EBD2: ------  .byte $FF
  0x05EBE3 $EBD3: ------  .byte $FF
  0x05EBE4 $EBD4: ------  .byte $FF
  0x05EBE5 $EBD5: ------  .byte $FF
  0x05EBE6 $EBD6: ------  .byte $FF
  0x05EBE7 $EBD7: ------  .byte $FF
  0x05EBE8 $EBD8: ------  .byte $7E
  0x05EBE9 $EBD9: ------  .byte $FF
  0x05EBEA $EBDA: ------  .byte $FF
  0x05EBEB $EBDB: ------  .byte $FF
  0x05EBEC $EBDC: ------  .byte $FF
  0x05EBED $EBDD: ------  .byte $FF
  0x05EBEE $EBDE: ------  .byte $FF
  0x05EBEF $EBDF: ------  .byte $DF
  0x05EBF0 $EBE0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EBF1 $EBE1: C-----  F1 F0    SBC  ($F0),Y
  0x05EBF3 $EBE3: C-----  F0 F0    BEQ  $EBD5
  0x05EBF5 $EBE5: C-----  F0 FF    BEQ  $EBE6
  0x05EBF7 $EBE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EBF8 $EBE8: C-----  30 2E    BMI  $EC18
  0x05EBFA $EBEA: C-----  19 5A 5A ORA  $5A5A,Y
  0x05EBFD $EBED: C-----  58       CLI  
  0x05EBFE $EBEE: C-----  59 4F FF EOR  $FF4F,Y
  0x05EC01 $EBF1: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05EC02 $EBF2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EC03 $EBF3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EC04 $EBF4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EC05 $EBF5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EC06 $EBF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC07 $EBF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC08 $EBF8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EC09 $EBF9: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05EC0A $EBFA: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EC0B $EBFB: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05EC0C $EBFC: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05EC0D $EBFD: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05EC0E $EBFE: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EC0F $EBFF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC10 $EC00: ------  .byte $00
  0x05EC11 $EC01: ------  .byte $00
  0x05EC12 $EC02: ------  .byte $00
  0x05EC13 $EC03: ------  .byte $06
  0x05EC14 $EC04: ------  .byte $06
  0x05EC15 $EC05: ------  .byte $06
  0x05EC16 $EC06: ------  .byte $00
  0x05EC17 $EC07: ------  .byte $0F
  0x05EC18 $EC08: ------  .byte $00
  0x05EC19 $EC09: ------  .byte $23
  0x05EC1A $EC0A: ------  .byte $2F
  0x05EC1B $EC0B: ------  .byte $39
  0x05EC1C $EC0C: ------  .byte $3B
  0x05EC1D $EC0D: ------  .byte $1B
  0x05EC1E $EC0E: ------  .byte $0F
  0x05EC1F $EC0F: ------  .byte $09
  0x05EC20 $EC10: ------  .byte $00
  0x05EC21 $EC11: ------  .byte $06
  0x05EC22 $EC12: ------  .byte $06
  0x05EC23 $EC13: ------  .byte $06
  0x05EC24 $EC14: ------  .byte $00
  0x05EC25 $EC15: ------  .byte $07
  0x05EC26 $EC16: ------  .byte $1F
  0x05EC27 $EC17: ------  .byte $3F
  0x05EC28 $EC18: ------  .byte $03
  0x05EC29 $EC19: ------  .byte $2B
  0x05EC2A $EC1A: ------  .byte $3B
  0x05EC2B $EC1B: ------  .byte $39
  0x05EC2C $EC1C: ------  .byte $1F
  0x05EC2D $EC1D: ------  .byte $69
  0x05EC2E $EC1E: ------  .byte $79
  0x05EC2F $EC1F: ------  .byte $3C
  0x05EC30 $EC20: ------  .byte $1F
  0x05EC31 $EC21: ------  .byte $3F
  0x05EC32 $EC22: ------  .byte $1F
  0x05EC33 $EC23: ------  .byte $11
  0x05EC34 $EC24: ------  .byte $7F
  0x05EC35 $EC25: ------  .byte $7F
  0x05EC36 $EC26: ------  .byte $3F
  0x05EC37 $EC27: ------  .byte $00
  0x05EC38 $EC28: ------  .byte $0C
  0x05EC39 $EC29: ------  .byte $1F
  0x05EC3A $EC2A: ------  .byte $7F
  0x05EC3B $EC2B: ------  .byte $6E
  0x05EC3C $EC2C: ------  .byte $0F
  0x05EC3D $EC2D: ------  .byte $0F
  0x05EC3E $EC2E: ------  .byte $06
  0x05EC3F $EC2F: ------  .byte $0E
  0x05EC40 $EC30: ------  .byte $1F
  0x05EC41 $EC31: ------  .byte $1F
  0x05EC42 $EC32: ------  .byte $31
  0x05EC43 $EC33: ------  .byte $3F
  0x05EC44 $EC34: ------  .byte $7F
  0x05EC45 $EC35: ------  .byte $7F
  0x05EC46 $EC36: ------  .byte $6F
  0x05EC47 $EC37: ------  .byte $00
  0x05EC48 $EC38: ------  .byte $1F
  0x05EC49 $EC39: ------  .byte $0F
  0x05EC4A $EC3A: ------  .byte $0E
  0x05EC4B $EC3B: ------  .byte $0F
  0x05EC4C $EC3C: ------  .byte $0F
  0x05EC4D $EC3D: ------  .byte $0F
  0x05EC4E $EC3E: ------  .byte $06
  0x05EC4F $EC3F: ------  .byte $0E
  0x05EC50 $EC40: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05EC51 $EC41: C-----  ED EB EB SBC  $EBEB
  0x05EC54 $EC44: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05EC55 $EC45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC56 $EC46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC57 $EC47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC58 $EC48: C-----  2C 33 35 BIT  $3533
  0x05EC5B $EC4B: C-----  35 B1    AND  $B1,X
  0x05EC5D $EC4D: C-----  B9 BF 3F LDA  $3FBF,Y
  0x05EC60 $EC50: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EC61 $EC51: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EC62 $EC52: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x05EC63 $EC53: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EC64 $EC54: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EC65 $EC55: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EC66 $EC56: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EC67 $EC57: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EC68 $EC58: C-----  00       BRK  
  0x05EC69 $EC59: C-----  00       BRK  
  0x05EC6A $EC5A: C-----  00       BRK  
  0x05EC6B $EC5B: C-----  00       BRK  
  0x05EC6C $EC5C: C-----  00       BRK  
  0x05EC6D $EC5D: C-----  00       BRK  
  0x05EC6E $EC5E: C-----  00       BRK  
  0x05EC6F $EC5F: C-----  00       BRK  
  0x05EC70 $EC60: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05EC71 $EC61: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x05EC72 $EC62: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x05EC73 $EC63: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05EC74 $EC64: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05EC75 $EC65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC76 $EC66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC77 $EC67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC78 $EC68: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x05EC79 $EC69: C-----  CE AF AF DEC  $AFAF
  0x05EC7C $EC6C: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05EC7D $EC6D: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EC7E $EC6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC7F $EC6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EC80 $EC70: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EC81 $EC71: C-----  01 03    ORA  ($03,X)
  0x05EC83 $EC73: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EC84 $EC74: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EC85 $EC75: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EC86 $EC76: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x05EC87 $EC77: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EC88 $EC78: C-----  00       BRK  
  0x05EC89 $EC79: C-----  00       BRK  
  0x05EC8A $EC7A: C-----  00       BRK  
  0x05EC8B $EC7B: C-----  00       BRK  
  0x05EC8C $EC7C: C-----  00       BRK  
  0x05EC8D $EC7D: C-----  00       BRK  
  0x05EC8E $EC7E: C-----  00       BRK  
  0x05EC8F $EC7F: C-----  00       BRK  
  0x05EC90 $EC80: C-----  00       BRK  
  0x05EC91 $EC81: C-----  00       BRK  
  0x05EC92 $EC82: C-----  00       BRK  
  0x05EC93 $EC83: C-----  00       BRK  
  0x05EC94 $EC84: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EC95 $EC85: C-----  01 7F    ORA  ($7F,X)
  0x05EC97 $EC87: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EC98 $EC88: C-----  00       BRK  
  0x05EC99 $EC89: C-----  00       BRK  
  0x05EC9A $EC8A: C-----  00       BRK  
  0x05EC9B $EC8B: C-----  00       BRK  
  0x05EC9C $EC8C: C-----  00       BRK  
  0x05EC9D $EC8D: C-----  00       BRK  
  0x05EC9E $EC8E: C-----  00       BRK  
  0x05EC9F $EC8F: C-----  00       BRK  
  0x05ECA0 $EC90: C-----  00       BRK  
  0x05ECA1 $EC91: C-----  00       BRK  
  0x05ECA2 $EC92: C-----  00       BRK  
  0x05ECA3 $EC93: C-----  00       BRK  
  0x05ECA4 $EC94: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05ECA5 $EC95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECA6 $EC96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECA7 $EC97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECA8 $EC98: C-----  00       BRK  
  0x05ECA9 $EC99: C-----  00       BRK  
  0x05ECAA $EC9A: C-----  00       BRK  
  0x05ECAB $EC9B: C-----  00       BRK  
  0x05ECAC $EC9C: C-----  00       BRK  
  0x05ECAD $EC9D: C-----  00       BRK  
  0x05ECAE $EC9E: C-----  00       BRK  
  0x05ECAF $EC9F: C-----  00       BRK  
  0x05ECB0 $ECA0: C-----  01 00    ORA  ($00,X)
  0x05ECB2 $ECA2: C-----  01 03    ORA  ($03,X)
  0x05ECB4 $ECA4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05ECB5 $ECA5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05ECB6 $ECA6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05ECB7 $ECA7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05ECB8 $ECA8: C-----  00       BRK  
  0x05ECB9 $ECA9: C-----  00       BRK  
  0x05ECBA $ECAA: C-----  00       BRK  
  0x05ECBB $ECAB: C-----  00       BRK  
  0x05ECBC $ECAC: C-----  00       BRK  
  0x05ECBD $ECAD: C-----  00       BRK  
  0x05ECBE $ECAE: C-----  00       BRK  
  0x05ECBF $ECAF: C-----  00       BRK  
  0x05ECC0 $ECB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECC1 $ECB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECC2 $ECB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECC3 $ECB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECC4 $ECB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECC5 $ECB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECC6 $ECB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECC7 $ECB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ECC8 $ECB8: C-----  00       BRK  
  0x05ECC9 $ECB9: C-----  00       BRK  
  0x05ECCA $ECBA: C-----  00       BRK  
  0x05ECCB $ECBB: C-----  00       BRK  
  0x05ECCC $ECBC: C-----  00       BRK  
  0x05ECCD $ECBD: C-----  00       BRK  
  0x05ECCE $ECBE: C-----  20 60 00 JSR  $0060
  0x05ECD1 $ECC1: C-----  00       BRK  
  0x05ECD2 $ECC2: C-----  00       BRK  
  0x05ECD3 $ECC3: C-----  00       BRK  
  0x05ECD4 $ECC4: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x05ECD5 $ECC5: C-----  F9 FF FF SBC  $FFFF,Y
  0x05ECD8 $ECC8: C-----  00       BRK  
  0x05ECD9 $ECC9: C-----  00       BRK  
  0x05ECDA $ECCA: C-----  00       BRK  
  0x05ECDB $ECCB: C-----  00       BRK  
  0x05ECDC $ECCC: C-----  00       BRK  
  0x05ECDD $ECCD: C-----  00       BRK  
  0x05ECDE $ECCE: C-----  00       BRK  
  0x05ECDF $ECCF: C-----  00       BRK  
  0x05ECE0 $ECD0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05ECE1 $ECD1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05ECE2 $ECD2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05ECE3 $ECD3: C-----  1D 3B 33 ORA  $333B,X
  0x05ECE6 $ECD6: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x05ECE7 $ECD7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05ECE8 $ECD8: C-----  00       BRK  
  0x05ECE9 $ECD9: C-----  00       BRK  
  0x05ECEA $ECDA: C-----  00       BRK  
  0x05ECEB $ECDB: C-----  00       BRK  
  0x05ECEC $ECDC: C-----  00       BRK  
  0x05ECED $ECDD: C-----  00       BRK  
  0x05ECEE $ECDE: C-----  00       BRK  
  0x05ECEF $ECDF: C-----  00       BRK  
  0x05ECF0 $ECE0: C-----  F8       SED  
  0x05ECF1 $ECE1: C-----  E0 F8    CPX  #$F8
  0x05ECF3 $ECE3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05ECF4 $ECE4: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05ECF5 $ECE5: C-----  F8       SED  
  0x05ECF6 $ECE6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05ECF7 $ECE7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05ECF8 $ECE8: C-----  00       BRK  
  0x05ECF9 $ECE9: C-----  00       BRK  
  0x05ECFA $ECEA: C-----  00       BRK  
  0x05ECFB $ECEB: C-----  00       BRK  
  0x05ECFC $ECEC: C-----  00       BRK  
  0x05ECFD $ECED: C-----  00       BRK  
  0x05ECFE $ECEE: C-----  00       BRK  
  0x05ECFF $ECEF: C-----  00       BRK  
  0x05ED00 $ECF0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05ED01 $ECF1: C-----  1E 1D 3B ASL  $3B1D,X
  0x05ED04 $ECF4: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x05ED05 $ECF5: C-----  26 0C    ROL  $0C
  0x05ED07 $ECF7: C-----  08       PHP  
  0x05ED08 $ECF8: C-----  00       BRK  
  0x05ED09 $ECF9: C-----  00       BRK  
  0x05ED0A $ECFA: C-----  00       BRK  
  0x05ED0B $ECFB: C-----  00       BRK  
  0x05ED0C $ECFC: C-----  00       BRK  
  0x05ED0D $ECFD: C-----  00       BRK  
  0x05ED0E $ECFE: C-----  00       BRK  
  0x05ED0F $ECFF: C-----  00       BRK  
  0x05ED10 $ED00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED11 $ED01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED12 $ED02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED13 $ED03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED14 $ED04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED15 $ED05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED16 $ED06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED17 $ED07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED18 $ED08: C-----  00       BRK  
  0x05ED19 $ED09: C-----  08       PHP  
  0x05ED1A $ED0A: C-----  09 29    ORA  #$29
  0x05ED1C $ED0C: C-----  2D 7D 7E AND  $7E7D
  0x05ED1F $ED0F: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05ED20 $ED10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED21 $ED11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED22 $ED12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED23 $ED13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED24 $ED14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED25 $ED15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED26 $ED16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED27 $ED17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED28 $ED18: C-----  E0 E4    CPX  #$E4
  0x05ED2A $ED1A: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05ED2B $ED1B: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05ED2C $ED1C: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05ED2D $ED1D: C-----  FD FF FF SBC  $FFFF,X
  0x05ED30 $ED20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED31 $ED21: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05ED32 $ED22: C-----  E1 E1    SBC  ($E1,X)
  0x05ED34 $ED24: C-----  E1 F1    SBC  ($F1,X)
  0x05ED36 $ED26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED37 $ED27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED38 $ED28: C-----  61 50    ADC  ($50,X)
  0x05ED3A $ED2A: C-----  35 35    AND  $35,X
  0x05ED3C $ED2C: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05ED3D $ED2D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05ED3E $ED2E: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05ED3F $ED2F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05ED40 $ED30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED41 $ED31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED42 $ED32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED43 $ED33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED44 $ED34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED45 $ED35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED46 $ED36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED47 $ED37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED48 $ED38: C-----  FE DC EF INC  $EFDC,X
  0x05ED4B $ED3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED4C $ED3C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05ED4D $ED3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED4E $ED3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED4F $ED3F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05ED50 $ED40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED51 $ED41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED52 $ED42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED53 $ED43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED54 $ED44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED55 $ED45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED56 $ED46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED57 $ED47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED58 $ED48: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05ED59 $ED49: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05ED5A $ED4A: C-----  C0 48    CPY  #$48
  0x05ED5C $ED4C: C-----  68       PLA  
  0x05ED5D $ED4D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05ED5E $ED4E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05ED5F $ED4F: C-----  86 FC    STX  $FC
  0x05ED61 $ED51: C-----  FE FE FE INC  $FEFE,X
  0x05ED64 $ED54: C-----  FE FE FE INC  $FEFE,X
  0x05ED67 $ED57: C-----  FE 00 00 INC  $0000,X
  0x05ED6A $ED5A: C-----  00       BRK  
  0x05ED6B $ED5B: C-----  00       BRK  
  0x05ED6C $ED5C: C-----  00       BRK  
  0x05ED6D $ED5D: C-----  00       BRK  
  0x05ED6E $ED5E: C-----  00       BRK  
  0x05ED6F $ED5F: C-----  00       BRK  
  0x05ED70 $ED60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED71 $ED61: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05ED72 $ED62: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05ED73 $ED63: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05ED74 $ED64: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05ED75 $ED65: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05ED76 $ED66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED77 $ED67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED78 $ED68: C-----  0E 16 5E ASL  $5E16
  0x05ED7B $ED6B: C-----  5E BE FC LSR  $FCBE,X
  0x05ED7E $ED6E: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x05ED7F $ED6F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05ED80 $ED70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED81 $ED71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED82 $ED72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED83 $ED73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED84 $ED74: C-----  FD FD FD SBC  $FDFD,X
  0x05ED87 $ED77: C-----  FE 00 00 INC  $0000,X
  0x05ED8A $ED7A: C-----  00       BRK  
  0x05ED8B $ED7B: C-----  00       BRK  
  0x05ED8C $ED7C: C-----  00       BRK  
  0x05ED8D $ED7D: C-----  00       BRK  
  0x05ED8E $ED7E: C-----  00       BRK  
  0x05ED8F $ED7F: C-----  00       BRK  
  0x05ED90 $ED80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED91 $ED81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED92 $ED82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED93 $ED83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED94 $ED84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED95 $ED85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED96 $ED86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED97 $ED87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05ED98 $ED88: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05ED99 $ED89: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05ED9A $ED8A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05ED9B $ED8B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05ED9C $ED8C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05ED9D $ED8D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05ED9E $ED8E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05ED9F $ED8F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EDA0 $ED90: ------  .byte $FF
  0x05EDA1 $ED91: ------  .byte $FF
  0x05EDA2 $ED92: ------  .byte $FF
  0x05EDA3 $ED93: ------  .byte $FF
  0x05EDA4 $ED94: ------  .byte $CF
  0x05EDA5 $ED95: ------  .byte $FF
  0x05EDA6 $ED96: ------  .byte $FF
  0x05EDA7 $ED97: ------  .byte $FF
  0x05EDA8 $ED98: ------  .byte $DF
  0x05EDA9 $ED99: ------  .byte $FF
  0x05EDAA $ED9A: ------  .byte $FF
  0x05EDAB $ED9B: ------  .byte $87
  0x05EDAC $ED9C: ------  .byte $B7
  0x05EDAD $ED9D: ------  .byte $CF
  0x05EDAE $ED9E: ------  .byte $FF
  0x05EDAF $ED9F: ------  .byte $CF
  0x05EDB0 $EDA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDB1 $EDA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDB2 $EDA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDB3 $EDA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDB4 $EDA4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EDB5 $EDA5: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EDB6 $EDA6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05EDB7 $EDA7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EDB8 $EDA8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EDB9 $EDA9: C-----  01 00    ORA  ($00,X)
  0x05EDBB $EDAB: C-----  00       BRK  
  0x05EDBC $EDAC: C-----  01 01    ORA  ($01,X)
  0x05EDBE $EDAE: C-----  01 01    ORA  ($01,X)
  0x05EDC0 $EDB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC1 $EDB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC2 $EDB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC3 $EDB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC4 $EDB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC5 $EDB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC6 $EDB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC7 $EDB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC8 $EDB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDC9 $EDB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDCA $EDBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDCB $EDBB: C-----  7E 39 87 ROR  $8739,X
  0x05EDCE $EDBE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDCF $EDBF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD0 $EDC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD1 $EDC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD2 $EDC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD3 $EDC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD4 $EDC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD5 $EDC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD6 $EDC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD7 $EDC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDD8 $EDC8: C-----  F8       SED  
  0x05EDD9 $EDC9: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05EDDA $EDCA: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05EDDB $EDCB: C-----  F6 FC    INC  $FC,X
  0x05EDDD $EDCD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EDDE $EDCE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EDDF $EDCF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EDE0 $EDD0: C-----  EE F6 B6 INC  $B6F6
  0x05EDE3 $EDD3: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x05EDE4 $EDD4: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x05EDE5 $EDD5: C-----  EA       NOP  
  0x05EDE6 $EDD6: C-----  F8       SED  
  0x05EDE7 $EDD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDE8 $EDD8: C-----  00       BRK  
  0x05EDE9 $EDD9: C-----  00       BRK  
  0x05EDEA $EDDA: C-----  00       BRK  
  0x05EDEB $EDDB: C-----  00       BRK  
  0x05EDEC $EDDC: C-----  00       BRK  
  0x05EDED $EDDD: C-----  00       BRK  
  0x05EDEE $EDDE: C-----  00       BRK  
  0x05EDEF $EDDF: C-----  18       CLC  
  0x05EDF0 $EDE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDF1 $EDE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDF2 $EDE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDF3 $EDE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDF4 $EDE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDF5 $EDE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDF6 $EDE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDF7 $EDE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EDF8 $EDE8: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x05EDF9 $EDE9: C-----  BC 78 F8 LDY  $F878,X
  0x05EDFC $EDEC: C-----  F8       SED  
  0x05EDFD $EDED: C-----  F0 F0    BEQ  $EDDF
  0x05EDFF $EDEF: C-----  E0 00    CPX  #$00
  0x05EE01 $EDF1: C-----  00       BRK  
  0x05EE02 $EDF2: C-----  00       BRK  
  0x05EE03 $EDF3: C-----  00       BRK  
  0x05EE04 $EDF4: C-----  00       BRK  
  0x05EE05 $EDF5: C-----  00       BRK  
  0x05EE06 $EDF6: C-----  00       BRK  
  0x05EE07 $EDF7: C-----  00       BRK  
  0x05EE08 $EDF8: C-----  00       BRK  
  0x05EE09 $EDF9: C-----  00       BRK  
  0x05EE0A $EDFA: C-----  00       BRK  
  0x05EE0B $EDFB: C-----  00       BRK  
  0x05EE0C $EDFC: C-----  00       BRK  
  0x05EE0D $EDFD: C-----  00       BRK  
  0x05EE0E $EDFE: C-----  00       BRK  
  0x05EE0F $EDFF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EE10 $EE00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE11 $EE01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE12 $EE02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE13 $EE03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE14 $EE04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE15 $EE05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE16 $EE06: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05EE17 $EE07: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EE18 $EE08: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EE19 $EE09: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE1A $EE0A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE1B $EE0B: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EE1C $EE0C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE1D $EE0D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE1E $EE0E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EE1F $EE0F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE20 $EE10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE21 $EE11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE22 $EE12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE23 $EE13: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EE24 $EE14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE25 $EE15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE26 $EE16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE27 $EE17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE28 $EE18: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EE29 $EE19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE2A $EE1A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EE2B $EE1B: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x05EE2C $EE1C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EE2D $EE1D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EE2E $EE1E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EE2F $EE1F: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EE30 $EE20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE31 $EE21: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE32 $EE22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE33 $EE23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE34 $EE24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE35 $EE25: C-----  FD 7B 87 SBC  $877B,X
  0x05EE38 $EE28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE39 $EE29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE3A $EE2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE3B $EE2B: C-----  FE 7D 03 INC  $037D,X
  0x05EE3E $EE2E: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EE3F $EE2F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE40 $EE30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE41 $EE31: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05EE42 $EE32: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EE43 $EE33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE44 $EE34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE45 $EE35: C-----  FD 7B 87 SBC  $877B,X
  0x05EE48 $EE38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE49 $EE39: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EE4A $EE3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE4B $EE3B: C-----  FE 7D 03 INC  $037D,X
  0x05EE4E $EE3E: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EE4F $EE3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE50 $EE40: C-----  00       BRK  
  0x05EE51 $EE41: C-----  00       BRK  
  0x05EE52 $EE42: C-----  00       BRK  
  0x05EE53 $EE43: C-----  0A       ASL  A
  0x05EE54 $EE44: C-----  3E 7E 7E ROL  $7E7E,X
  0x05EE57 $EE47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE58 $EE48: C-----  00       BRK  
  0x05EE59 $EE49: C-----  00       BRK  
  0x05EE5A $EE4A: C-----  00       BRK  
  0x05EE5B $EE4B: C-----  00       BRK  
  0x05EE5C $EE4C: C-----  00       BRK  
  0x05EE5D $EE4D: C-----  00       BRK  
  0x05EE5E $EE4E: C-----  00       BRK  
  0x05EE5F $EE4F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05EE60 $EE50: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05EE61 $EE51: C-----  7E 3F 39 ROR  $393F,X
  0x05EE64 $EE54: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05EE65 $EE55: C-----  0E 04 02 ASL  $0204
  0x05EE68 $EE58: C-----  38       SEC  
  0x05EE69 $EE59: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05EE6A $EE5A: C-----  18       CLC  
  0x05EE6B $EE5B: C-----  06 0C    ASL  $0C
  0x05EE6D $EE5D: C-----  01 03    ORA  ($03,X)
  0x05EE6F $EE5F: C-----  01 FC    ORA  ($FC,X)
  0x05EE71 $EE61: C-----  BC D9 41 LDY  $41D9,X
  0x05EE74 $EE64: C-----  C0 E1    CPY  #$E1
  0x05EE76 $EE66: C-----  E1 FC    SBC  ($FC,X)
  0x05EE78 $EE68: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05EE79 $EE69: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x05EE7A $EE6A: C-----  26 3E    ROL  $3E
  0x05EE7C $EE6C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EE7D $EE6D: C-----  5E 5E 63 LSR  $635E,X
  0x05EE80 $EE70: C-----  C0 E0    CPY  #$E0
  0x05EE82 $EE72: C-----  30 D0    BMI  $EE44
  0x05EE84 $EE74: C-----  50 70    BVC  $EEE6
  0x05EE86 $EE76: C-----  F8       SED  
  0x05EE87 $EE77: C-----  F8       SED  
  0x05EE88 $EE78: C-----  00       BRK  
  0x05EE89 $EE79: C-----  00       BRK  
  0x05EE8A $EE7A: C-----  C0 20    CPY  #$20
  0x05EE8C $EE7C: C-----  A0 80    LDY  #$80
  0x05EE8E $EE7E: C-----  60       RTS  
  0x05EE8F $EE7F: C-----  70 FF    BVS  $EE80
  0x05EE91 $EE81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE92 $EE82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE93 $EE83: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05EE94 $EE84: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05EE95 $EE85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE96 $EE86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE97 $EE87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE98 $EE88: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05EE99 $EE89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE9A $EE8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE9B $EE8B: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05EE9C $EE8C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE9D $EE8D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE9E $EE8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EE9F $EE8F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EEA0 $EE90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEA1 $EE91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEA2 $EE92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEA3 $EE93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEA4 $EE94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEA5 $EE95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEA6 $EE96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEA7 $EE97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEA8 $EE98: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05EEA9 $EE99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEAA $EE9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEAB $EE9B: C-----  C1 FF    CMP  ($FF,X)
  0x05EEAD $EE9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEAE $EE9E: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05EEAF $EE9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB0 $EEA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB1 $EEA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB2 $EEA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB3 $EEA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB4 $EEA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB5 $EEA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB6 $EEA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB7 $EEA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEB8 $EEA8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EEB9 $EEA9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEBA $EEAA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEBB $EEAB: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05EEBC $EEAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEBD $EEAD: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05EEBE $EEAE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEBF $EEAF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC0 $EEB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC1 $EEB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC2 $EEB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC3 $EEB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC4 $EEB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC5 $EEB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC6 $EEB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC7 $EEB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC8 $EEB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EEC9 $EEB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EECA $EEBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EECB $EEBB: C-----  7E 3D 83 ROR  $833D,X
  0x05EECE $EEBE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EECF $EEBF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EED0 $EEC0: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05EED1 $EEC1: C-----  70 60    BVS  $EF23
  0x05EED3 $EEC3: C-----  70 7A    BVS  $EF3F
  0x05EED5 $EEC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EED6 $EEC6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EED7 $EEC7: C-----  F8       SED  
  0x05EED8 $EEC8: C-----  28       PLP  
  0x05EED9 $EEC9: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x05EEDA $EECA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EEDB $EECB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EEDC $EECC: C-----  35 38    AND  $38,X
  0x05EEDE $EECE: C-----  78       SEI  
  0x05EEDF $EECF: C-----  70 F8    BVS  $EEC9
  0x05EEE1 $EED1: C-----  78       SEI  
  0x05EEE2 $EED2: C-----  78       SEI  
  0x05EEE3 $EED3: C-----  78       SEI  
  0x05EEE4 $EED4: C-----  78       SEI  
  0x05EEE5 $EED5: C-----  78       SEI  
  0x05EEE6 $EED6: C-----  F8       SED  
  0x05EEE7 $EED7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EEE8 $EED8: C-----  30 B0    BMI  $EE8A
  0x05EEEA $EEDA: C-----  B0 B0    BCS  $EE8C
  0x05EEEC $EEDC: C-----  90 B0    BCC  $EE8E
  0x05EEEE $EEDE: C-----  30 48    BMI  $EF28
  0x05EEF0 $EEE0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EEF1 $EEE1: C-----  1E 26 34 ASL  $3426,X
  0x05EEF4 $EEE4: C-----  2C 44 48 BIT  $4844
  0x05EEF7 $EEE7: C-----  48       PHA  
  0x05EEF8 $EEE8: C-----  0E 04 18 ASL  $1804
  0x05EEFB $EEEB: C-----  08       PHP  
  0x05EEFC $EEEC: C-----  10 38    BPL  $EF26
  0x05EEFE $EEEE: C-----  30 30    BMI  $EF20
  0x05EF00 $EEF0: C-----  05 05    ORA  $05
  0x05EF02 $EEF2: C-----  05 0F    ORA  $0F
  0x05EF04 $EEF4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EF05 $EEF5: C-----  1E 00 00 ASL  $0000,X
  0x05EF08 $EEF8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05EF09 $EEF9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05EF0A $EEFA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05EF0B $EEFB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05EF0C $EEFC: C-----  00       BRK  
  0x05EF0D $EEFD: C-----  00       BRK  
  0x05EF0E $EEFE: C-----  00       BRK  
  0x05EF0F $EEFF: C-----  00       BRK  
  0x05EF10 $EF00: C-----  00       BRK  
  0x05EF11 $EF01: C-----  00       BRK  
  0x05EF12 $EF02: C-----  00       BRK  
  0x05EF13 $EF03: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EF14 $EF04: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EF15 $EF05: C-----  40       RTI  
  0x05EF16 $EF06: C-----  20 20 00 JSR  $0020
  0x05EF19 $EF09: C-----  00       BRK  
  0x05EF1A $EF0A: C-----  00       BRK  
  0x05EF1B $EF0B: C-----  00       BRK  
  0x05EF1C $EF0C: C-----  00       BRK  
  0x05EF1D $EF0D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EF1E $EF0E: C-----  C0 C0    CPY  #$C0
  0x05EF20 $EF10: C-----  00       BRK  
  0x05EF21 $EF11: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EF22 $EF12: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EF23 $EF13: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05EF24 $EF14: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EF25 $EF15: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EF26 $EF16: C-----  06 3F    ASL  $3F
  0x05EF28 $EF18: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05EF29 $EF19: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05EF2A $EF1A: C-----  10 10    BPL  $EF2C
  0x05EF2C $EF1C: C-----  20 20 39 JSR  $3920
  0x05EF2F $EF1F: C-----  40       RTI  
  0x05EF30 $EF20: C-----  10 88    BPL  $EEAA
  0x05EF32 $EF22: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05EF33 $EF23: C-----  2E 1F 0F ROL  $0F1F
  0x05EF36 $EF26: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05EF37 $EF27: C-----  00       BRK  
  0x05EF38 $EF28: C-----  E0 70    CPX  #$70
  0x05EF3A $EF2A: C-----  38       SEC  
  0x05EF3B $EF2B: C-----  10 04    BPL  $EF31
  0x05EF3D $EF2D: C-----  00       BRK  
  0x05EF3E $EF2E: C-----  00       BRK  
  0x05EF3F $EF2F: C-----  00       BRK  
  0x05EF40 $EF30: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EF41 $EF31: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EF42 $EF32: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EF43 $EF33: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x05EF44 $EF34: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05EF45 $EF35: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05EF46 $EF36: C-----  06 3C    ASL  $3C
  0x05EF48 $EF38: C-----  40       RTI  
  0x05EF49 $EF39: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EF4A $EF3A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EF4B $EF3B: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05EF4C $EF3C: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05EF4D $EF3D: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05EF4E $EF3E: C-----  3E 3C 20 ROL  $203C,X
  0x05EF51 $EF41: C-----  88       DEY  
  0x05EF52 $EF42: C-----  E8       INX  
  0x05EF53 $EF43: C-----  D1 C1    CMP  ($C1),Y
  0x05EF55 $EF45: C-----  98       TYA  
  0x05EF56 $EF46: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EF57 $EF47: C-----  BE E0 79 LDX  $79E0,Y
  0x05EF5A $EF4A: C-----  19 32 3E ORA  $3E32,Y
  0x05EF5D $EF4D: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x05EF5E $EF4E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05EF5F $EF4F: C-----  41 06    EOR  ($06,X)
  0x05EF61 $EF51: C-----  E9 ED    SBC  #$ED
  0x05EF63 $EF53: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05EF64 $EF54: C-----  F8       SED  
  0x05EF65 $EF55: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05EF66 $EF56: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x05EF67 $EF57: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05EF68 $EF58: C-----  F9 16 12 SBC  $1216,Y
  0x05EF6B $EF5B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05EF6C $EF5C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05EF6D $EF5D: C-----  C4 C8    CPY  $C8
  0x05EF6F $EF5F: C-----  88       DEY  
  0x05EF70 $EF60: C-----  A5 6C    LDA  $6C
  0x05EF72 $EF62: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x05EF73 $EF63: C-----  65 EB    ADC  $EB
  0x05EF75 $EF65: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05EF76 $EF66: C-----  18       CLC  
  0x05EF77 $EF67: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05EF78 $EF68: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x05EF79 $EF69: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x05EF7A $EF6A: C-----  A4 9E    LDY  $9E
  0x05EF7C $EF6C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05EF7D $EF6D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05EF7E $EF6E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05EF7F $EF6F: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05EF80 $EF70: C-----  71 E3    ADC  ($E3),Y
  0x05EF82 $EF72: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05EF83 $EF73: C-----  EE DE 9D INC  $9DDE
  0x05EF86 $EF76: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05EF87 $EF77: C-----  DE 8E 1C DEC  $1C8E,X
  0x05EF8A $EF7A: C-----  20 11 21 JSR  $2111
  0x05EF8D $EF7D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05EF8E $EF7E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EF8F $EF7F: C-----  DE 00 FB DEC  $FB00,X
  0x05EF92 $EF82: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05EF93 $EF83: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05EF94 $EF84: C-----  00       BRK  
  0x05EF95 $EF85: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05EF96 $EF86: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05EF97 $EF87: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05EF98 $EF88: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EF99 $EF89: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05EF9A $EF8A: C-----  08       PHP  
  0x05EF9B $EF8B: C-----  08       PHP  
  0x05EF9C $EF8C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EF9D $EF8D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05EF9E $EF8E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05EF9F $EF8F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05EFA0 $EF90: C-----  00       BRK  
  0x05EFA1 $EF91: C-----  BE 44 2D LDX  $2D44,Y
  0x05EFA4 $EF94: C-----  00       BRK  
  0x05EFA5 $EF95: C-----  A6 7F    LDX  $7F
  0x05EFA7 $EF97: C-----  4C BF 41 JMP  $41BF
  0x05EFAA $EF9A: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05EFAB $EF9B: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x05EFAC $EF9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EFAD $EF9D: C-----  59 80 B3 EOR  $B380,Y
  0x05EFB0 $EFA0: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x05EFB1 $EFA1: C-----  66 1E    ROR  $1E
  0x05EFB3 $EFA3: C-----  7D BC 3B ADC  $3BBC,X
  0x05EFB6 $EFA6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05EFB7 $EFA7: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05EFB8 $EFA8: C-----  78       SEI  
  0x05EFB9 $EFA9: C-----  F9 E1 82 SBC  $82E1,Y
  0x05EFBC $EFAC: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05EFBD $EFAD: C-----  C4 3F    CPY  $3F
  0x05EFBF $EFAF: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05EFC0 $EFB0: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05EFC1 $EFB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EFC2 $EFB2: C-----  66 FF    ROR  $FF
  0x05EFC4 $EFB4: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05EFC5 $EFB5: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05EFC6 $EFB6: C-----  30 E7    BMI  $EF9F
  0x05EFC8 $EFB8: C-----  CC 00 99 CPY  $9900
  0x05EFCB $EFBB: C-----  00       BRK  
  0x05EFCC $EFBC: C-----  18       CLC  
  0x05EFCD $EFBD: C-----  38       SEC  
  0x05EFCE $EFBE: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05EFCF $EFBF: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05EFD0 $EFC0: C-----  00       BRK  
  0x05EFD1 $EFC1: C-----  F6 2C    INC  $2C,X
  0x05EFD3 $EFC3: C-----  68       PLA  
  0x05EFD4 $EFC4: C-----  18       CLC  
  0x05EFD5 $EFC5: C-----  6C D8 B0 JMP  ($B0D8)
  0x05EFD8 $EFC8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05EFD9 $EFC9: C-----  0E DC 98 ASL  $98DC
  0x05EFDC $EFCC: C-----  F8       SED  
  0x05EFDD $EFCD: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x05EFDE $EFCE: C-----  38       SEC  
  0x05EFDF $EFCF: C-----  70 FF    BVS  $EFD0
  0x05EFE1 $EFD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EFE2 $EFD2: C-----  FE F9 FF INC  $FFF9,X
  0x05EFE5 $EFD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EFE6 $EFD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EFE7 $EFD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EFE8 $EFD8: C-----  70 7F    BVS  $F059
  0x05EFEA $EFDA: C-----  79 FF FF ADC  $FFFF,Y
  0x05EFED $EFDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05EFEE $EFDE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05EFEF $EFDF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05EFF0 $EFE0: C-----  20 F0 60 JSR  $60F0
  0x05EFF3 $EFE3: C-----  B0 60    BCS  $F045
  0x05EFF5 $EFE5: C-----  A0 10    LDY  #$10
  0x05EFF7 $EFE7: C-----  F8       SED  
  0x05EFF8 $EFE8: C-----  E0 70    CPX  #$70
  0x05EFFA $EFEA: C-----  E0 70    CPX  #$70
  0x05EFFC $EFEC: C-----  E0 60    CPX  #$60
  0x05EFFE $EFEE: C-----  F0 F8    BEQ  $EFE8
  0x05F000 $EFF0: C-----  00       BRK  
  0x05F001 $EFF1: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05F002 $EFF2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F003 $EFF3: C-----  25 0E    AND  $0E
  0x05F005 $EFF5: C-----  15 0B    ORA  $0B,X
  0x05F007 $EFF7: C-----  0E 1C 2A ASL  $2A1C
  0x05F00A $EFFA: C-----  7D 5A 71 ADC  $715A,X
  0x05F00D $EFFD: C-----  2A       ROL  A
  0x05F00E $EFFE: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05F00F $EFFF: C-----  00       BRK  
  0x05F010 $F000: C-----  00       BRK  
  0x05F011 $F001: C-----  00       BRK  
  0x05F012 $F002: C-----  00       BRK  
  0x05F013 $F003: C-----  00       BRK  
  0x05F014 $F004: C-----  00       BRK  
  0x05F015 $F005: C-----  00       BRK  
  0x05F016 $F006: C-----  00       BRK  
  0x05F017 $F007: C-----  00       BRK  
  0x05F018 $F008: C-----  00       BRK  
  0x05F019 $F009: C-----  00       BRK  
  0x05F01A $F00A: C-----  00       BRK  
  0x05F01B $F00B: C-----  00       BRK  
  0x05F01C $F00C: C-----  00       BRK  
  0x05F01D $F00D: C-----  00       BRK  
  0x05F01E $F00E: C-----  00       BRK  
  0x05F01F $F00F: C-----  00       BRK  
  0x05F020 $F010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F021 $F011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F022 $F012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F023 $F013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F024 $F014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F025 $F015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F026 $F016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F027 $F017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F028 $F018: C-----  00       BRK  
  0x05F029 $F019: C-----  00       BRK  
  0x05F02A $F01A: C-----  00       BRK  
  0x05F02B $F01B: C-----  00       BRK  
  0x05F02C $F01C: C-----  00       BRK  
  0x05F02D $F01D: C-----  00       BRK  
  0x05F02E $F01E: C-----  00       BRK  
  0x05F02F $F01F: C-----  00       BRK  
  0x05F030 $F020: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F031 $F021: C-----  C6 92    DEC  $92
  0x05F033 $F023: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x05F034 $F024: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x05F035 $F025: C-----  C6 7C    DEC  $7C
  0x05F037 $F027: C-----  00       BRK  
  0x05F038 $F028: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F039 $F029: C-----  C6 93    DEC  $93
  0x05F03B $F02B: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05F03C $F02C: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x05F03D $F02D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05F03E $F02E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F03F $F02F: C-----  3E 38 6C ROL  $6C38,X
  0x05F042 $F032: C-----  C6 C6    DEC  $C6
  0x05F044 $F034: C-----  FE C6 C6 INC  $C6C6,X
  0x05F047 $F037: C-----  00       BRK  
  0x05F048 $F038: C-----  38       SEC  
  0x05F049 $F039: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F04A $F03A: C-----  F6 E7    INC  $E7,X
  0x05F04C $F03C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F04D $F03D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F04E $F03E: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F04F $F03F: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05F050 $F040: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F051 $F041: C-----  C6 C6    DEC  $C6
  0x05F053 $F043: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F054 $F044: C-----  C6 C6    DEC  $C6
  0x05F056 $F046: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F057 $F047: C-----  00       BRK  
  0x05F058 $F048: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F059 $F049: C-----  FE E7 FF INC  $FFE7,X
  0x05F05C $F04C: C-----  FE E7 FF INC  $FFE7,X
  0x05F05F $F04F: C-----  7E 3C 66 ROR  $663C,X
  0x05F062 $F052: C-----  C0 C0    CPY  #$C0
  0x05F064 $F054: C-----  C0 66    CPY  #$66
  0x05F066 $F056: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F067 $F057: C-----  00       BRK  
  0x05F068 $F058: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F069 $F059: C-----  7E F3 E0 ROR  $E0F3,X
  0x05F06C $F05C: C-----  E0 66    CPX  #$66
  0x05F06E $F05E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F06F $F05F: C-----  1E F8 CC ASL  $CCF8,X
  0x05F072 $F062: C-----  C6 C6    DEC  $C6
  0x05F074 $F064: C-----  C6 CC    DEC  $CC
  0x05F076 $F066: C-----  F8       SED  
  0x05F077 $F067: C-----  00       BRK  
  0x05F078 $F068: C-----  F8       SED  
  0x05F079 $F069: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F07A $F06A: C-----  E6 E7    INC  $E7
  0x05F07C $F06C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F07D $F06D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05F07E $F06E: C-----  FE 7C FE INC  $FE7C,X
  0x05F081 $F071: C-----  C0 C0    CPY  #$C0
  0x05F083 $F073: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F084 $F074: C-----  C0 C0    CPY  #$C0
  0x05F086 $F076: C-----  FE 00 FE INC  $FE00,X
  0x05F089 $F079: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F08A $F07A: C-----  E0 FC    CPX  #$FC
  0x05F08C $F07C: C-----  FE E0 FE INC  $FEE0,X
  0x05F08F $F07F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F090 $F080: C-----  FE C0 C0 INC  $C0C0,X
  0x05F093 $F083: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F094 $F084: C-----  C0 C0    CPY  #$C0
  0x05F096 $F086: C-----  C0 00    CPY  #$00
  0x05F098 $F088: C-----  FE FF E0 INC  $E0FF,X
  0x05F09B $F08B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F09C $F08C: C-----  FE E0 E0 INC  $E0E0,X
  0x05F09F $F08F: C-----  60       RTS  
  0x05F0A0 $F090: C-----  3E 60 C0 ROL  $C060,X
  0x05F0A3 $F093: C-----  CE C6 66 DEC  $66C6
  0x05F0A6 $F096: C-----  3E 00 3E ROL  $3E00,X
  0x05F0A9 $F099: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F0AA $F09A: C-----  F0 EE    BEQ  $F08A
  0x05F0AC $F09C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F0AD $F09D: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x05F0AE $F09E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F0AF $F09F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F0B0 $F0A0: C-----  C6 C6    DEC  $C6
  0x05F0B2 $F0A2: C-----  C6 FE    DEC  $FE
  0x05F0B4 $F0A4: C-----  C6 C6    DEC  $C6
  0x05F0B6 $F0A6: C-----  C6 00    DEC  $00
  0x05F0B8 $F0A8: C-----  C6 E7    DEC  $E7
  0x05F0BA $F0AA: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F0BB $F0AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F0BC $F0AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F0BD $F0AD: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F0BE $F0AE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F0BF $F0AF: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05F0C0 $F0B0: C-----  7E 18 18 ROR  $1818,X
  0x05F0C3 $F0B3: C-----  18       CLC  
  0x05F0C4 $F0B4: C-----  18       CLC  
  0x05F0C5 $F0B5: C-----  18       CLC  
  0x05F0C6 $F0B6: C-----  7E 00 7E ROR  $7E00,X
  0x05F0C9 $F0B9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F0CA $F0BA: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F0CB $F0BB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F0CC $F0BC: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F0CD $F0BD: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F0CE $F0BE: C-----  7E 3F C6 ROR  $C63F,X
  0x05F0D1 $F0C1: C-----  CC D8 F0 CPY  $F0D8
  0x05F0D4 $F0C4: C-----  F8       SED  
  0x05F0D5 $F0C5: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x05F0D6 $F0C6: C-----  CE 00 C6 DEC  $C600
  0x05F0D9 $F0C9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05F0DA $F0CA: C-----  FE FC F8 INC  $F8FC,X
  0x05F0DD $F0CD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F0DE $F0CE: C-----  EE 67 C0 INC  $C067
  0x05F0E1 $F0D1: C-----  C0 C0    CPY  #$C0
  0x05F0E3 $F0D3: C-----  C0 C0    CPY  #$C0
  0x05F0E5 $F0D5: C-----  C0 FE    CPY  #$FE
  0x05F0E7 $F0D7: C-----  00       BRK  
  0x05F0E8 $F0D8: C-----  C0 E0    CPY  #$E0
  0x05F0EA $F0DA: C-----  E0 E0    CPX  #$E0
  0x05F0EC $F0DC: C-----  E0 E0    CPX  #$E0
  0x05F0EE $F0DE: C-----  FE 7F C6 INC  $C67F,X
  0x05F0F1 $F0E1: C-----  EE FE FE INC  $FEFE
  0x05F0F4 $F0E4: C-----  D6 C6    DEC  $C6,X
  0x05F0F6 $F0E6: C-----  C6 00    DEC  $00
  0x05F0F8 $F0E8: C-----  C6 EF    DEC  $EF
  0x05F0FA $F0EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F0FB $F0EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F0FC $F0EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F0FD $F0ED: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05F0FE $F0EE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F0FF $F0EF: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05F100 $F0F0: C-----  C6 E6    DEC  $E6
  0x05F102 $F0F2: C-----  F6 FE    INC  $FE,X
  0x05F104 $F0F4: C-----  DE CE C6 DEC  $C6CE,X
  0x05F107 $F0F7: C-----  00       BRK  
  0x05F108 $F0F8: C-----  C6 E7    DEC  $E7
  0x05F10A $F0FA: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05F10B $F0FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F10C $F0FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F10D $F0FD: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05F10E $F0FE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F10F $F0FF: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05F110 $F100: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F111 $F101: C-----  C6 C6    DEC  $C6
  0x05F113 $F103: C-----  C6 C6    DEC  $C6
  0x05F115 $F105: C-----  C6 7C    DEC  $7C
  0x05F117 $F107: C-----  00       BRK  
  0x05F118 $F108: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F119 $F109: C-----  FE E7 E7 INC  $E7E7,X
  0x05F11C $F10C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F11D $F10D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F11E $F10E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F11F $F10F: C-----  3E FC C6 ROL  $C6FC,X
  0x05F122 $F112: C-----  C6 FC    DEC  $FC
  0x05F124 $F114: C-----  C0 C0    CPY  #$C0
  0x05F126 $F116: C-----  C0 00    CPY  #$00
  0x05F128 $F118: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F129 $F119: C-----  FE E7 FF INC  $FFE7,X
  0x05F12C $F11C: C-----  FE E0 E0 INC  $E0E0,X
  0x05F12F $F11F: C-----  60       RTS  
  0x05F130 $F120: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F131 $F121: C-----  C6 C6    DEC  $C6
  0x05F133 $F123: C-----  CE F8 DC DEC  $DCF8
  0x05F136 $F126: C-----  CE 00 FC DEC  $FC00
  0x05F139 $F129: C-----  FE E7 EF INC  $EFE7,X
  0x05F13C $F12C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F13D $F12D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F13E $F12E: C-----  EE 67 78 INC  $7867
  0x05F141 $F131: C-----  CC C0 7C CPY  $7CC0
  0x05F144 $F134: C-----  06 C6    ASL  $C6
  0x05F146 $F136: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F147 $F137: C-----  00       BRK  
  0x05F148 $F138: C-----  78       SEI  
  0x05F149 $F139: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F14A $F13A: C-----  E6 7C    INC  $7C
  0x05F14C $F13C: C-----  3E C7 7F ROL  $7FC7,X
  0x05F14F $F13F: C-----  3E 7E 18 ROL  $187E,X
  0x05F152 $F142: C-----  18       CLC  
  0x05F153 $F143: C-----  18       CLC  
  0x05F154 $F144: C-----  18       CLC  
  0x05F155 $F145: C-----  18       CLC  
  0x05F156 $F146: C-----  18       CLC  
  0x05F157 $F147: C-----  00       BRK  
  0x05F158 $F148: C-----  7E 3F 1C ROR  $1C3F,X
  0x05F15B $F14B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F15C $F14C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F15D $F14D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F15E $F14E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F15F $F14F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F160 $F150: C-----  C6 C6    DEC  $C6
  0x05F162 $F152: C-----  C6 C6    DEC  $C6
  0x05F164 $F154: C-----  C6 C6    DEC  $C6
  0x05F166 $F156: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F167 $F157: C-----  00       BRK  
  0x05F168 $F158: C-----  C6 E7    DEC  $E7
  0x05F16A $F15A: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F16B $F15B: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F16C $F15C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F16D $F15D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F16E $F15E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F16F $F15F: C-----  3E C6 C6 ROL  $C6C6,X
  0x05F172 $F162: C-----  C6 EE    DEC  $EE
  0x05F174 $F164: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F175 $F165: C-----  38       SEC  
  0x05F176 $F166: C-----  10 00    BPL  $F168
  0x05F178 $F168: C-----  C6 E7    DEC  $E7
  0x05F17A $F16A: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F17B $F16B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05F17C $F16C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F17D $F16D: C-----  3E 1C 08 ROL  $081C,X
  0x05F180 $F170: C-----  C6 C6    DEC  $C6
  0x05F182 $F172: C-----  C6 6C    DEC  $6C
  0x05F184 $F174: C-----  38       SEC  
  0x05F185 $F175: C-----  38       SEC  
  0x05F186 $F176: C-----  38       SEC  
  0x05F187 $F177: C-----  00       BRK  
  0x05F188 $F178: C-----  C6 E7    DEC  $E7
  0x05F18A $F17A: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F18B $F17B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F18C $F17C: C-----  3E 3C 3C ROL  $3C3C,X
  0x05F18F $F17F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F190 $F180: C-----  18       CLC  
  0x05F191 $F181: C-----  38       SEC  
  0x05F192 $F182: C-----  18       CLC  
  0x05F193 $F183: C-----  18       CLC  
  0x05F194 $F184: C-----  18       CLC  
  0x05F195 $F185: C-----  18       CLC  
  0x05F196 $F186: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F197 $F187: C-----  00       BRK  
  0x05F198 $F188: C-----  18       CLC  
  0x05F199 $F189: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F19A $F18A: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F19B $F18B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F19C $F18C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F19D $F18D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F19E $F18E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F19F $F18F: C-----  1E 7C C6 ASL  $C67C,X
  0x05F1A2 $F192: C-----  0E 3C 78 ASL  $783C
  0x05F1A5 $F195: C-----  E0 FE    CPX  #$FE
  0x05F1A7 $F197: C-----  00       BRK  
  0x05F1A8 $F198: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F1A9 $F199: C-----  FE 6F 3F INC  $3F6F,X
  0x05F1AC $F19C: C-----  7E FC FE ROR  $FEFC,X
  0x05F1AF $F19F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F1B0 $F1A0: ------  .byte $7E
  0x05F1B1 $F1A1: ------  .byte $0C
  0x05F1B2 $F1A2: ------  .byte $18
  0x05F1B3 $F1A3: ------  .byte $3C
  0x05F1B4 $F1A4: ------  .byte $06
  0x05F1B5 $F1A5: ------  .byte $C6
  0x05F1B6 $F1A6: ------  .byte $7C
  0x05F1B7 $F1A7: ------  .byte $00
  0x05F1B8 $F1A8: ------  .byte $7E
  0x05F1B9 $F1A9: ------  .byte $3F
  0x05F1BA $F1AA: ------  .byte $1E
  0x05F1BB $F1AB: ------  .byte $3C
  0x05F1BC $F1AC: ------  .byte $1E
  0x05F1BD $F1AD: ------  .byte $C7
  0x05F1BE $F1AE: ------  .byte $7F
  0x05F1BF $F1AF: ------  .byte $3E
  0x05F1C0 $F1B0: ------  .byte $1C
  0x05F1C1 $F1B1: ------  .byte $3C
  0x05F1C2 $F1B2: ------  .byte $6C
  0x05F1C3 $F1B3: ------  .byte $CC
  0x05F1C4 $F1B4: ------  .byte $CC
  0x05F1C5 $F1B5: ------  .byte $FE
  0x05F1C6 $F1B6: ------  .byte $0C
  0x05F1C7 $F1B7: ------  .byte $00
  0x05F1C8 $F1B8: ------  .byte $1C
  0x05F1C9 $F1B9: ------  .byte $3E
  0x05F1CA $F1BA: ------  .byte $7E
  0x05F1CB $F1BB: ------  .byte $FE
  0x05F1CC $F1BC: ------  .byte $EE
  0x05F1CD $F1BD: ------  .byte $FE
  0x05F1CE $F1BE: ------  .byte $7F
  0x05F1CF $F1BF: ------  .byte $06
  0x05F1D0 $F1C0: ------  .byte $FC
  0x05F1D1 $F1C1: ------  .byte $C0
  0x05F1D2 $F1C2: ------  .byte $FC
  0x05F1D3 $F1C3: ------  .byte $06
  0x05F1D4 $F1C4: ------  .byte $06
  0x05F1D5 $F1C5: ------  .byte $C6
  0x05F1D6 $F1C6: ------  .byte $7C
  0x05F1D7 $F1C7: ------  .byte $00
  0x05F1D8 $F1C8: ------  .byte $FC
  0x05F1D9 $F1C9: ------  .byte $FE
  0x05F1DA $F1CA: ------  .byte $FC
  0x05F1DB $F1CB: ------  .byte $7E
  0x05F1DC $F1CC: ------  .byte $07
  0x05F1DD $F1CD: ------  .byte $C7
  0x05F1DE $F1CE: ------  .byte $7F
  0x05F1DF $F1CF: ------  .byte $3E
  0x05F1E0 $F1D0: ------  .byte $3C
  0x05F1E1 $F1D1: ------  .byte $60
  0x05F1E2 $F1D2: ------  .byte $C0
  0x05F1E3 $F1D3: ------  .byte $FC
  0x05F1E4 $F1D4: ------  .byte $C6
  0x05F1E5 $F1D5: ------  .byte $C6
  0x05F1E6 $F1D6: ------  .byte $7C
  0x05F1E7 $F1D7: ------  .byte $00
  0x05F1E8 $F1D8: ------  .byte $3C
  0x05F1E9 $F1D9: ------  .byte $7E
  0x05F1EA $F1DA: ------  .byte $F0
  0x05F1EB $F1DB: ------  .byte $FC
  0x05F1EC $F1DC: ------  .byte $FE
  0x05F1ED $F1DD: ------  .byte $E7
  0x05F1EE $F1DE: ------  .byte $7F
  0x05F1EF $F1DF: ------  .byte $3E
  0x05F1F0 $F1E0: C-----  FE C6 0C INC  $0CC6,X
  0x05F1F3 $F1E3: C-----  18       CLC  
  0x05F1F4 $F1E4: C-----  30 30    BMI  $F216
  0x05F1F6 $F1E6: C-----  30 00    BMI  $F1E8
  0x05F1F8 $F1E8: C-----  FE FF 6F INC  $6FFF,X
  0x05F1FB $F1EB: C-----  1E 3C 38 ASL  $383C,X
  0x05F1FE $F1EE: C-----  38       SEC  
  0x05F1FF $F1EF: C-----  18       CLC  
  0x05F200 $F1F0: ------  .byte $7C
  0x05F201 $F1F1: ------  .byte $C6
  0x05F202 $F1F2: ------  .byte $C6
  0x05F203 $F1F3: ------  .byte $7C
  0x05F204 $F1F4: ------  .byte $C6
  0x05F205 $F1F5: ------  .byte $C6
  0x05F206 $F1F6: ------  .byte $7C
  0x05F207 $F1F7: ------  .byte $00
  0x05F208 $F1F8: ------  .byte $7C
  0x05F209 $F1F9: ------  .byte $FE
  0x05F20A $F1FA: ------  .byte $E7
  0x05F20B $F1FB: ------  .byte $7F
  0x05F20C $F1FC: ------  .byte $FE
  0x05F20D $F1FD: ------  .byte $E7
  0x05F20E $F1FE: ------  .byte $7F
  0x05F20F $F1FF: ------  .byte $3E
  0x05F210 $F200: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F211 $F201: C-----  C6 C6    DEC  $C6
  0x05F213 $F203: C-----  7E 06 0C ROR  $0C06,X
  0x05F216 $F206: C-----  78       SEI  
  0x05F217 $F207: C-----  00       BRK  
  0x05F218 $F208: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F219 $F209: C-----  FE E7 7F INC  $7FE7,X
  0x05F21C $F20C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F21D $F20D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F21E $F20E: C-----  7E 3C 06 ROR  $063C,X
  0x05F221 $F211: C-----  06 06    ASL  $06
  0x05F223 $F213: C-----  FE 18 18 INC  $1818,X
  0x05F226 $F216: C-----  18       CLC  
  0x05F227 $F217: C-----  00       BRK  
  0x05F228 $F218: C-----  06 07    ASL  $07
  0x05F22A $F21A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F22B $F21B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F22C $F21C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F22D $F21D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F22E $F21E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F22F $F21F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F230 $F220: C-----  60       RTS  
  0x05F231 $F221: C-----  FE 66 66 INC  $6666,X
  0x05F234 $F224: C-----  66 66    ROR  $66
  0x05F236 $F226: C-----  EE 00 60 INC  $6000
  0x05F239 $F229: C-----  FE 7F 77 INC  $777F,X
  0x05F23C $F22C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05F23D $F22D: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05F23E $F22E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F23F $F22F: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05F240 $F230: C-----  FE 06 0C INC  $0C06,X
  0x05F243 $F233: C-----  18       CLC  
  0x05F244 $F234: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F245 $F235: C-----  66 C3    ROR  $C3
  0x05F247 $F237: C-----  00       BRK  
  0x05F248 $F238: C-----  FE 7F 0E INC  $0E7F,X
  0x05F24B $F23B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F24C $F23C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F24D $F23D: C-----  7E E7 43 ROR  $43E7,X
  0x05F250 $F240: C-----  60       RTS  
  0x05F251 $F241: C-----  60       RTS  
  0x05F252 $F242: C-----  60       RTS  
  0x05F253 $F243: C-----  7E 60 60 ROR  $6060,X
  0x05F256 $F246: C-----  60       RTS  
  0x05F257 $F247: C-----  00       BRK  
  0x05F258 $F248: C-----  60       RTS  
  0x05F259 $F249: C-----  70 70    BVS  $F2BB
  0x05F25B $F24B: C-----  7E 7F 70 ROR  $707F,X
  0x05F25E $F24E: C-----  70 30    BVS  $F280
  0x05F260 $F250: C-----  6C 6C 6C JMP  ($6C6C)
  0x05F263 $F253: C-----  6C C6 C6 JMP  ($C6C6)
  0x05F266 $F256: C-----  C6 00    DEC  $00
  0x05F268 $F258: C-----  6C 6E 7E JMP  ($7E6E)
  0x05F26B $F25B: C-----  7E E7 E7 ROR  $E7E7,X
  0x05F26E $F25E: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F26F $F25F: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x05F270 $F260: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F271 $F261: C-----  00       BRK  
  0x05F272 $F262: C-----  FE 06 06 INC  $0606,X
  0x05F275 $F265: C-----  06 7E    ASL  $7E
  0x05F277 $F267: C-----  00       BRK  
  0x05F278 $F268: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F279 $F269: C-----  3E FE 7F ROL  $7FFE,X
  0x05F27C $F26C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F27D $F26D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F27E $F26E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F27F $F26F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F280 $F270: C-----  00       BRK  
  0x05F281 $F271: C-----  00       BRK  
  0x05F282 $F272: C-----  00       BRK  
  0x05F283 $F273: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F284 $F274: C-----  00       BRK  
  0x05F285 $F275: C-----  00       BRK  
  0x05F286 $F276: C-----  00       BRK  
  0x05F287 $F277: C-----  00       BRK  
  0x05F288 $F278: C-----  00       BRK  
  0x05F289 $F279: C-----  00       BRK  
  0x05F28A $F27A: C-----  00       BRK  
  0x05F28B $F27B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F28C $F27C: C-----  7E 00 00 ROR  $0000,X
  0x05F28F $F27F: C-----  00       BRK  
  0x05F290 $F280: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F291 $F281: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F292 $F282: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F293 $F283: C-----  0E 0E 0E ASL  $0E0E
  0x05F296 $F286: C-----  0E 0E 00 ASL  $000E
  0x05F299 $F289: C-----  00       BRK  
  0x05F29A $F28A: C-----  00       BRK  
  0x05F29B $F28B: C-----  00       BRK  
  0x05F29C $F28C: C-----  00       BRK  
  0x05F29D $F28D: C-----  00       BRK  
  0x05F29E $F28E: C-----  00       BRK  
  0x05F29F $F28F: C-----  00       BRK  
  0x05F2A0 $F290: C-----  E1 E3    SBC  ($E3,X)
  0x05F2A2 $F292: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05F2A3 $F293: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2A4 $F294: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2A5 $F295: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2A6 $F296: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2A7 $F297: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2A8 $F298: C-----  00       BRK  
  0x05F2A9 $F299: C-----  00       BRK  
  0x05F2AA $F29A: C-----  00       BRK  
  0x05F2AB $F29B: C-----  00       BRK  
  0x05F2AC $F29C: C-----  00       BRK  
  0x05F2AD $F29D: C-----  00       BRK  
  0x05F2AE $F29E: C-----  00       BRK  
  0x05F2AF $F29F: C-----  00       BRK  
  0x05F2B0 $F2A0: C-----  0E 0E 0E ASL  $0E0E
  0x05F2B3 $F2A3: C-----  0E 0E 0E ASL  $0E0E
  0x05F2B6 $F2A6: C-----  0E 0E 00 ASL  $000E
  0x05F2B9 $F2A9: C-----  00       BRK  
  0x05F2BA $F2AA: C-----  00       BRK  
  0x05F2BB $F2AB: C-----  00       BRK  
  0x05F2BC $F2AC: C-----  00       BRK  
  0x05F2BD $F2AD: C-----  00       BRK  
  0x05F2BE $F2AE: C-----  00       BRK  
  0x05F2BF $F2AF: C-----  00       BRK  
  0x05F2C0 $F2B0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2C1 $F2B1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2C2 $F2B2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2C3 $F2B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2C4 $F2B4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F2C5 $F2B5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F2C6 $F2B6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F2C7 $F2B7: C-----  01 00    ORA  ($00,X)
  0x05F2C9 $F2B9: C-----  00       BRK  
  0x05F2CA $F2BA: C-----  00       BRK  
  0x05F2CB $F2BB: C-----  00       BRK  
  0x05F2CC $F2BC: C-----  00       BRK  
  0x05F2CD $F2BD: C-----  00       BRK  
  0x05F2CE $F2BE: C-----  00       BRK  
  0x05F2CF $F2BF: C-----  00       BRK  
  0x05F2D0 $F2C0: C-----  FE FE FE INC  $FEFE,X
  0x05F2D3 $F2C3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F2D4 $F2C4: C-----  00       BRK  
  0x05F2D5 $F2C5: C-----  00       BRK  
  0x05F2D6 $F2C6: C-----  FE FE 00 INC  $00FE,X
  0x05F2D9 $F2C9: C-----  00       BRK  
  0x05F2DA $F2CA: C-----  00       BRK  
  0x05F2DB $F2CB: C-----  00       BRK  
  0x05F2DC $F2CC: C-----  00       BRK  
  0x05F2DD $F2CD: C-----  00       BRK  
  0x05F2DE $F2CE: C-----  00       BRK  
  0x05F2DF $F2CF: C-----  00       BRK  
  0x05F2E0 $F2D0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F2E1 $F2D1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F2E2 $F2D2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F2E3 $F2D3: C-----  3E 38 78 ROL  $7838,X
  0x05F2E6 $F2D6: C-----  70 70    BVS  $F348
  0x05F2E8 $F2D8: C-----  00       BRK  
  0x05F2E9 $F2D9: C-----  00       BRK  
  0x05F2EA $F2DA: C-----  00       BRK  
  0x05F2EB $F2DB: C-----  00       BRK  
  0x05F2EC $F2DC: C-----  00       BRK  
  0x05F2ED $F2DD: C-----  00       BRK  
  0x05F2EE $F2DE: C-----  00       BRK  
  0x05F2EF $F2DF: C-----  00       BRK  
  0x05F2F0 $F2E0: C-----  FE 00 00 INC  $0000,X
  0x05F2F3 $F2E3: C-----  00       BRK  
  0x05F2F4 $F2E4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F2F5 $F2E5: C-----  FE FE FE INC  $FEFE,X
  0x05F2F8 $F2E8: C-----  00       BRK  
  0x05F2F9 $F2E9: C-----  00       BRK  
  0x05F2FA $F2EA: C-----  00       BRK  
  0x05F2FB $F2EB: C-----  00       BRK  
  0x05F2FC $F2EC: C-----  00       BRK  
  0x05F2FD $F2ED: C-----  00       BRK  
  0x05F2FE $F2EE: C-----  00       BRK  
  0x05F2FF $F2EF: C-----  00       BRK  
  0x05F300 $F2F0: C-----  70 70    BVS  $F362
  0x05F302 $F2F2: C-----  78       SEI  
  0x05F303 $F2F3: C-----  38       SEC  
  0x05F304 $F2F4: C-----  3E 1F 0F ROL  $0F1F,X
  0x05F307 $F2F7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F308 $F2F8: C-----  00       BRK  
  0x05F309 $F2F9: C-----  00       BRK  
  0x05F30A $F2FA: C-----  00       BRK  
  0x05F30B $F2FB: C-----  00       BRK  
  0x05F30C $F2FC: C-----  00       BRK  
  0x05F30D $F2FD: C-----  00       BRK  
  0x05F30E $F2FE: C-----  00       BRK  
  0x05F30F $F2FF: C-----  00       BRK  
  0x05F310 $F300: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F311 $F301: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F312 $F302: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F313 $F303: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F314 $F304: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F315 $F305: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05F316 $F306: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x05F317 $F307: C-----  00       BRK  
  0x05F318 $F308: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F319 $F309: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F31A $F30A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F31B $F30B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F31C $F30C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F31D $F30D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x05F31E $F30E: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05F31F $F30F: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05F320 $F310: C-----  F0 60    BEQ  $F372
  0x05F322 $F312: C-----  60       RTS  
  0x05F323 $F313: C-----  60       RTS  
  0x05F324 $F314: C-----  60       RTS  
  0x05F325 $F315: C-----  60       RTS  
  0x05F326 $F316: C-----  F0 00    BEQ  $F318
  0x05F328 $F318: C-----  F0 78    BEQ  $F392
  0x05F32A $F31A: C-----  70 70    BVS  $F38C
  0x05F32C $F31C: C-----  70 70    BVS  $F38E
  0x05F32E $F31E: C-----  F0 F8    BEQ  $F318
  0x05F330 $F320: C-----  00       BRK  
  0x05F331 $F321: C-----  00       BRK  
  0x05F332 $F322: C-----  00       BRK  
  0x05F333 $F323: C-----  00       BRK  
  0x05F334 $F324: C-----  00       BRK  
  0x05F335 $F325: C-----  60       RTS  
  0x05F336 $F326: C-----  60       RTS  
  0x05F337 $F327: C-----  00       BRK  
  0x05F338 $F328: C-----  00       BRK  
  0x05F339 $F329: C-----  00       BRK  
  0x05F33A $F32A: C-----  00       BRK  
  0x05F33B $F32B: C-----  00       BRK  
  0x05F33C $F32C: C-----  00       BRK  
  0x05F33D $F32D: C-----  60       RTS  
  0x05F33E $F32E: C-----  70 30    BVS  $F360
  0x05F340 $F330: C-----  00       BRK  
  0x05F341 $F331: C-----  00       BRK  
  0x05F342 $F332: C-----  00       BRK  
  0x05F343 $F333: C-----  18       CLC  
  0x05F344 $F334: C-----  18       CLC  
  0x05F345 $F335: C-----  00       BRK  
  0x05F346 $F336: C-----  00       BRK  
  0x05F347 $F337: C-----  00       BRK  
  0x05F348 $F338: C-----  00       BRK  
  0x05F349 $F339: C-----  00       BRK  
  0x05F34A $F33A: C-----  00       BRK  
  0x05F34B $F33B: C-----  18       CLC  
  0x05F34C $F33C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F34D $F33D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F34E $F33E: C-----  00       BRK  
  0x05F34F $F33F: C-----  00       BRK  
  0x05F350 $F340: C-----  00       BRK  
  0x05F351 $F341: C-----  00       BRK  
  0x05F352 $F342: C-----  00       BRK  
  0x05F353 $F343: C-----  00       BRK  
  0x05F354 $F344: C-----  0E 0A 0E ASL  $0E0A
  0x05F357 $F347: C-----  00       BRK  
  0x05F358 $F348: C-----  00       BRK  
  0x05F359 $F349: C-----  00       BRK  
  0x05F35A $F34A: C-----  00       BRK  
  0x05F35B $F34B: C-----  00       BRK  
  0x05F35C $F34C: C-----  0E 0F 0F ASL  $0F0F
  0x05F35F $F34F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F360 $F350: C-----  00       BRK  
  0x05F361 $F351: C-----  00       BRK  
  0x05F362 $F352: C-----  00       BRK  
  0x05F363 $F353: C-----  00       BRK  
  0x05F364 $F354: C-----  60       RTS  
  0x05F365 $F355: C-----  60       RTS  
  0x05F366 $F356: C-----  40       RTI  
  0x05F367 $F357: C-----  00       BRK  
  0x05F368 $F358: C-----  00       BRK  
  0x05F369 $F359: C-----  00       BRK  
  0x05F36A $F35A: C-----  00       BRK  
  0x05F36B $F35B: C-----  00       BRK  
  0x05F36C $F35C: C-----  60       RTS  
  0x05F36D $F35D: C-----  70 70    BVS  $F3CF
  0x05F36F $F35F: C-----  20 00 00 JSR  $0000
  0x05F372 $F362: C-----  00       BRK  
  0x05F373 $F363: C-----  00       BRK  
  0x05F374 $F364: C-----  00       BRK  
  0x05F375 $F365: C-----  FE 00 00 INC  $0000,X
  0x05F378 $F368: C-----  00       BRK  
  0x05F379 $F369: C-----  00       BRK  
  0x05F37A $F36A: C-----  00       BRK  
  0x05F37B $F36B: C-----  00       BRK  
  0x05F37C $F36C: C-----  00       BRK  
  0x05F37D $F36D: C-----  FE 7F 00 INC  $007F,X
  0x05F380 $F370: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05F381 $F371: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F382 $F372: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F383 $F373: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05F384 $F374: C-----  0E 0E 0E ASL  $0E0E
  0x05F387 $F377: C-----  0E 00 00 ASL  $0000
  0x05F38A $F37A: C-----  00       BRK  
  0x05F38B $F37B: C-----  00       BRK  
  0x05F38C $F37C: C-----  00       BRK  
  0x05F38D $F37D: C-----  00       BRK  
  0x05F38E $F37E: C-----  00       BRK  
  0x05F38F $F37F: C-----  00       BRK  
  0x05F390 $F380: C-----  C1 C3    CMP  ($C3,X)
  0x05F392 $F382: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05F393 $F383: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F394 $F384: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F395 $F385: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F396 $F386: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F397 $F387: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F398 $F388: C-----  00       BRK  
  0x05F399 $F389: C-----  00       BRK  
  0x05F39A $F38A: C-----  00       BRK  
  0x05F39B $F38B: C-----  00       BRK  
  0x05F39C $F38C: C-----  00       BRK  
  0x05F39D $F38D: C-----  00       BRK  
  0x05F39E $F38E: C-----  00       BRK  
  0x05F39F $F38F: C-----  00       BRK  
  0x05F3A0 $F390: C-----  F0 F8    BEQ  $F38A
  0x05F3A2 $F392: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F3A3 $F393: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F3A4 $F394: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3A5 $F395: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3A6 $F396: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3A7 $F397: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3A8 $F398: C-----  00       BRK  
  0x05F3A9 $F399: C-----  00       BRK  
  0x05F3AA $F39A: C-----  00       BRK  
  0x05F3AB $F39B: C-----  00       BRK  
  0x05F3AC $F39C: C-----  00       BRK  
  0x05F3AD $F39D: C-----  00       BRK  
  0x05F3AE $F39E: C-----  00       BRK  
  0x05F3AF $F39F: C-----  00       BRK  
  0x05F3B0 $F3A0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3B1 $F3A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3B2 $F3A2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3B3 $F3A3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3B4 $F3A4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3B5 $F3A5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05F3B6 $F3A6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05F3B7 $F3A7: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05F3B8 $F3A8: C-----  00       BRK  
  0x05F3B9 $F3A9: C-----  00       BRK  
  0x05F3BA $F3AA: C-----  00       BRK  
  0x05F3BB $F3AB: C-----  00       BRK  
  0x05F3BC $F3AC: C-----  00       BRK  
  0x05F3BD $F3AD: C-----  00       BRK  
  0x05F3BE $F3AE: C-----  00       BRK  
  0x05F3BF $F3AF: C-----  00       BRK  
  0x05F3C0 $F3B0: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3C1 $F3B1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3C2 $F3B2: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3C3 $F3B3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3C4 $F3B4: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3C5 $F3B5: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3C6 $F3B6: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3C7 $F3B7: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F3C8 $F3B8: C-----  00       BRK  
  0x05F3C9 $F3B9: C-----  00       BRK  
  0x05F3CA $F3BA: C-----  00       BRK  
  0x05F3CB $F3BB: C-----  00       BRK  
  0x05F3CC $F3BC: C-----  00       BRK  
  0x05F3CD $F3BD: C-----  00       BRK  
  0x05F3CE $F3BE: C-----  00       BRK  
  0x05F3CF $F3BF: C-----  00       BRK  
  0x05F3D0 $F3C0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3D1 $F3C1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F3D2 $F3C2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F3D3 $F3C3: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F3D4 $F3C4: C-----  70 F0    BVS  $F3B6
  0x05F3D6 $F3C6: C-----  E0 E0    CPX  #$E0
  0x05F3D8 $F3C8: C-----  00       BRK  
  0x05F3D9 $F3C9: C-----  00       BRK  
  0x05F3DA $F3CA: C-----  00       BRK  
  0x05F3DB $F3CB: C-----  00       BRK  
  0x05F3DC $F3CC: C-----  00       BRK  
  0x05F3DD $F3CD: C-----  00       BRK  
  0x05F3DE $F3CE: C-----  00       BRK  
  0x05F3DF $F3CF: C-----  00       BRK  
  0x05F3E0 $F3D0: C-----  E0 F8    CPX  #$F8
  0x05F3E2 $F3D2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F3E3 $F3D3: C-----  3E 0E 0F ROL  $0F0E,X
  0x05F3E6 $F3D6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3E7 $F3D7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3E8 $F3D8: C-----  00       BRK  
  0x05F3E9 $F3D9: C-----  00       BRK  
  0x05F3EA $F3DA: C-----  00       BRK  
  0x05F3EB $F3DB: C-----  00       BRK  
  0x05F3EC $F3DC: C-----  00       BRK  
  0x05F3ED $F3DD: C-----  00       BRK  
  0x05F3EE $F3DE: C-----  00       BRK  
  0x05F3EF $F3DF: C-----  00       BRK  
  0x05F3F0 $F3E0: C-----  E0 E0    CPX  #$E0
  0x05F3F2 $F3E2: C-----  F0 70    BEQ  $F454
  0x05F3F4 $F3E4: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F3F5 $F3E5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F3F6 $F3E6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F3F7 $F3E7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F3F8 $F3E8: C-----  00       BRK  
  0x05F3F9 $F3E9: C-----  00       BRK  
  0x05F3FA $F3EA: C-----  00       BRK  
  0x05F3FB $F3EB: C-----  00       BRK  
  0x05F3FC $F3EC: C-----  00       BRK  
  0x05F3FD $F3ED: C-----  00       BRK  
  0x05F3FE $F3EE: C-----  00       BRK  
  0x05F3FF $F3EF: C-----  00       BRK  
  0x05F400 $F3F0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F401 $F3F1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F402 $F3F2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F403 $F3F3: C-----  0E 3E FC ASL  $FC3E
  0x05F406 $F3F6: C-----  F8       SED  
  0x05F407 $F3F7: C-----  E0 00    CPX  #$00
  0x05F409 $F3F9: C-----  00       BRK  
  0x05F40A $F3FA: C-----  00       BRK  
  0x05F40B $F3FB: C-----  00       BRK  
  0x05F40C $F3FC: C-----  00       BRK  
  0x05F40D $F3FD: C-----  00       BRK  
  0x05F40E $F3FE: C-----  00       BRK  
  0x05F40F $F3FF: C-----  00       BRK  
  0x05F410 $F400: C-----  00       BRK  
  0x05F411 $F401: C-----  00       BRK  
  0x05F412 $F402: C-----  00       BRK  
  0x05F413 $F403: C-----  00       BRK  
  0x05F414 $F404: C-----  01 00    ORA  ($00,X)
  0x05F416 $F406: C-----  00       BRK  
  0x05F417 $F407: C-----  00       BRK  
  0x05F418 $F408: C-----  00       BRK  
  0x05F419 $F409: C-----  00       BRK  
  0x05F41A $F40A: C-----  00       BRK  
  0x05F41B $F40B: C-----  00       BRK  
  0x05F41C $F40C: C-----  00       BRK  
  0x05F41D $F40D: C-----  00       BRK  
  0x05F41E $F40E: C-----  00       BRK  
  0x05F41F $F40F: C-----  00       BRK  
  0x05F420 $F410: C-----  00       BRK  
  0x05F421 $F411: C-----  00       BRK  
  0x05F422 $F412: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05F423 $F413: C-----  00       BRK  
  0x05F424 $F414: C-----  00       BRK  
  0x05F425 $F415: C-----  18       CLC  
  0x05F426 $F416: C-----  01 03    ORA  ($03,X)
  0x05F428 $F418: C-----  00       BRK  
  0x05F429 $F419: C-----  00       BRK  
  0x05F42A $F41A: C-----  00       BRK  
  0x05F42B $F41B: C-----  00       BRK  
  0x05F42C $F41C: C-----  00       BRK  
  0x05F42D $F41D: C-----  00       BRK  
  0x05F42E $F41E: C-----  00       BRK  
  0x05F42F $F41F: C-----  00       BRK  
  0x05F430 $F420: C-----  00       BRK  
  0x05F431 $F421: C-----  00       BRK  
  0x05F432 $F422: C-----  00       BRK  
  0x05F433 $F423: C-----  01 00    ORA  ($00,X)
  0x05F435 $F425: C-----  00       BRK  
  0x05F436 $F426: C-----  11 7F    ORA  ($7F),Y
  0x05F438 $F428: C-----  00       BRK  
  0x05F439 $F429: C-----  00       BRK  
  0x05F43A $F42A: C-----  00       BRK  
  0x05F43B $F42B: C-----  01 00    ORA  ($00,X)
  0x05F43D $F42D: C-----  00       BRK  
  0x05F43E $F42E: C-----  11 7F    ORA  ($7F),Y
  0x05F440 $F430: C-----  00       BRK  
  0x05F441 $F431: C-----  00       BRK  
  0x05F442 $F432: C-----  00       BRK  
  0x05F443 $F433: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F444 $F434: C-----  40       RTI  
  0x05F445 $F435: C-----  20 30 30 JSR  $3030
  0x05F448 $F438: C-----  00       BRK  
  0x05F449 $F439: C-----  00       BRK  
  0x05F44A $F43A: C-----  00       BRK  
  0x05F44B $F43B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F44C $F43C: C-----  C0 E0    CPY  #$E0
  0x05F44E $F43E: C-----  F0 F0    BEQ  $F430
  0x05F450 $F440: C-----  00       BRK  
  0x05F451 $F441: C-----  01 01    ORA  ($01,X)
  0x05F453 $F443: C-----  00       BRK  
  0x05F454 $F444: C-----  06 06    ASL  $06
  0x05F456 $F446: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F457 $F447: C-----  00       BRK  
  0x05F458 $F448: C-----  00       BRK  
  0x05F459 $F449: C-----  00       BRK  
  0x05F45A $F44A: C-----  00       BRK  
  0x05F45B $F44B: C-----  00       BRK  
  0x05F45C $F44C: C-----  01 01    ORA  ($01,X)
  0x05F45E $F44E: C-----  01 00    ORA  ($00,X)
  0x05F460 $F450: C-----  00       BRK  
  0x05F461 $F451: C-----  00       BRK  
  0x05F462 $F452: C-----  00       BRK  
  0x05F463 $F453: C-----  E6 BD    INC  $BD
  0x05F465 $F455: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F466 $F456: C-----  84 B8    STY  $B8
  0x05F468 $F458: C-----  00       BRK  
  0x05F469 $F459: C-----  00       BRK  
  0x05F46A $F45A: C-----  00       BRK  
  0x05F46B $F45B: C-----  E6 BD    INC  $BD
  0x05F46D $F45D: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x05F46E $F45E: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x05F46F $F45F: C-----  B8       CLV  
  0x05F470 $F460: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x05F471 $F461: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05F472 $F462: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05F473 $F463: C-----  18       CLC  
  0x05F474 $F464: C-----  18       CLC  
  0x05F475 $F465: C-----  B8       CLV  
  0x05F476 $F466: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x05F477 $F467: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F478 $F468: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F479 $F469: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F47A $F46A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F47B $F46B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F47C $F46C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F47D $F46D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F47E $F46E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x05F47F $F46F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F480 $F470: C-----  78       SEI  
  0x05F481 $F471: C-----  78       SEI  
  0x05F482 $F472: C-----  70 A4    BVS  $F418
  0x05F484 $F474: C-----  C4 E4    CPY  $E4
  0x05F486 $F476: C-----  CC 98 F8 CPY  $F898
  0x05F489 $F479: C-----  F8       SED  
  0x05F48A $F47A: C-----  F8       SED  
  0x05F48B $F47B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F48C $F47C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F48D $F47D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F48E $F47E: C-----  F0 E0    BEQ  $F460
  0x05F490 $F480: C-----  00       BRK  
  0x05F491 $F481: C-----  00       BRK  
  0x05F492 $F482: C-----  00       BRK  
  0x05F493 $F483: C-----  00       BRK  
  0x05F494 $F484: C-----  40       RTI  
  0x05F495 $F485: C-----  00       BRK  
  0x05F496 $F486: C-----  20 10 00 JSR  $0010
  0x05F499 $F489: C-----  00       BRK  
  0x05F49A $F48A: C-----  00       BRK  
  0x05F49B $F48B: C-----  00       BRK  
  0x05F49C $F48C: C-----  00       BRK  
  0x05F49D $F48D: C-----  01 00    ORA  ($00,X)
  0x05F49F $F48F: C-----  20 78 40 JSR  $4078
  0x05F4A2 $F492: C-----  40       RTI  
  0x05F4A3 $F493: C-----  40       RTI  
  0x05F4A4 $F494: C-----  00       BRK  
  0x05F4A5 $F495: C-----  18       CLC  
  0x05F4A6 $F496: C-----  20 00 78 JSR  $7800
  0x05F4A9 $F499: C-----  40       RTI  
  0x05F4AA $F49A: C-----  40       RTI  
  0x05F4AB $F49B: C-----  40       RTI  
  0x05F4AC $F49C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F4AD $F49D: C-----  18       CLC  
  0x05F4AE $F49E: C-----  20 00 07 JSR  $0700
  0x05F4B1 $F4A1: C-----  84 84    STY  $84
  0x05F4B3 $F4A3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05F4B4 $F4A4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F4B5 $F4A5: C-----  00       BRK  
  0x05F4B6 $F4A6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F4B7 $F4A7: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x05F4B8 $F4A8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F4B9 $F4A9: C-----  84 84    STY  $84
  0x05F4BB $F4AB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05F4BC $F4AC: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05F4BD $F4AD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F4BE $F4AE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F4BF $F4AF: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05F4C0 $F4B0: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x05F4C1 $F4B1: C-----  00       BRK  
  0x05F4C2 $F4B2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F4C3 $F4B3: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05F4C4 $F4B4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F4C5 $F4B5: C-----  00       BRK  
  0x05F4C6 $F4B6: C-----  00       BRK  
  0x05F4C7 $F4B7: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F4C8 $F4B8: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x05F4C9 $F4B9: C-----  00       BRK  
  0x05F4CA $F4BA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F4CB $F4BB: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05F4CC $F4BC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F4CD $F4BD: C-----  00       BRK  
  0x05F4CE $F4BE: C-----  00       BRK  
  0x05F4CF $F4BF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F4D0 $F4C0: C-----  10 00    BPL  $F4C2
  0x05F4D2 $F4C2: C-----  00       BRK  
  0x05F4D3 $F4C3: C-----  00       BRK  
  0x05F4D4 $F4C4: C-----  00       BRK  
  0x05F4D5 $F4C5: C-----  08       PHP  
  0x05F4D6 $F4C6: C-----  00       BRK  
  0x05F4D7 $F4C7: C-----  00       BRK  
  0x05F4D8 $F4C8: C-----  00       BRK  
  0x05F4D9 $F4C9: C-----  00       BRK  
  0x05F4DA $F4CA: C-----  00       BRK  
  0x05F4DB $F4CB: C-----  00       BRK  
  0x05F4DC $F4CC: C-----  00       BRK  
  0x05F4DD $F4CD: C-----  08       PHP  
  0x05F4DE $F4CE: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F4DF $F4CF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05F4E0 $F4D0: C-----  00       BRK  
  0x05F4E1 $F4D1: C-----  00       BRK  
  0x05F4E2 $F4D2: C-----  30 30    BMI  $F504
  0x05F4E4 $F4D4: C-----  08       PHP  
  0x05F4E5 $F4D5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F4E6 $F4D6: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05F4E7 $F4D7: C-----  60       RTS  
  0x05F4E8 $F4D8: C-----  00       BRK  
  0x05F4E9 $F4D9: C-----  00       BRK  
  0x05F4EA $F4DA: C-----  30 30    BMI  $F50C
  0x05F4EC $F4DC: C-----  18       CLC  
  0x05F4ED $F4DD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F4EE $F4DE: C-----  4C 64 20 JMP  $2064
  0x05F4F1 $F4E1: C-----  20 21 21 JSR  $2121
  0x05F4F4 $F4E4: C-----  71 55    ADC  ($55),Y
  0x05F4F6 $F4E6: C-----  6E 22 00 ROR  $0022
  0x05F4F9 $F4E9: C-----  01 01    ORA  ($01,X)
  0x05F4FB $F4EB: C-----  01 40    ORA  ($40,X)
  0x05F4FD $F4ED: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x05F4FE $F4EE: C-----  7E 3E C0 ROR  $C03E,X
  0x05F501 $F4F1: C-----  90 80    BCC  $F473
  0x05F503 $F4F3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F504 $F4F4: C-----  40       RTI  
  0x05F505 $F4F5: C-----  A0 40    LDY  #$40
  0x05F507 $F4F7: C-----  40       RTI  
  0x05F508 $F4F8: C-----  08       PHP  
  0x05F509 $F4F9: C-----  10 00    BPL  $F4FB
  0x05F50B $F4FB: C-----  00       BRK  
  0x05F50C $F4FC: C-----  40       RTI  
  0x05F50D $F4FD: C-----  E0 C0    CPX  #$C0
  0x05F50F $F4FF: C-----  C0 06    CPY  #$06
  0x05F511 $F501: C-----  01 00    ORA  ($00,X)
  0x05F513 $F503: C-----  00       BRK  
  0x05F514 $F504: C-----  00       BRK  
  0x05F515 $F505: C-----  00       BRK  
  0x05F516 $F506: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F517 $F507: C-----  00       BRK  
  0x05F518 $F508: C-----  06 03    ASL  $03
  0x05F51A $F50A: C-----  01 01    ORA  ($01,X)
  0x05F51C $F50C: C-----  00       BRK  
  0x05F51D $F50D: C-----  00       BRK  
  0x05F51E $F50E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F51F $F50F: C-----  01 20    ORA  ($20,X)
  0x05F521 $F511: C-----  00       BRK  
  0x05F522 $F512: C-----  00       BRK  
  0x05F523 $F513: C-----  00       BRK  
  0x05F524 $F514: C-----  00       BRK  
  0x05F525 $F515: C-----  00       BRK  
  0x05F526 $F516: C-----  00       BRK  
  0x05F527 $F517: C-----  00       BRK  
  0x05F528 $F518: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05F529 $F519: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x05F52A $F51A: C-----  00       BRK  
  0x05F52B $F51B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F52C $F51C: C-----  88       DEY  
  0x05F52D $F51D: C-----  00       BRK  
  0x05F52E $F51E: C-----  40       RTI  
  0x05F52F $F51F: C-----  00       BRK  
  0x05F530 $F520: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F531 $F521: C-----  00       BRK  
  0x05F532 $F522: C-----  00       BRK  
  0x05F533 $F523: C-----  00       BRK  
  0x05F534 $F524: C-----  00       BRK  
  0x05F535 $F525: C-----  01 01    ORA  ($01,X)
  0x05F537 $F527: C-----  00       BRK  
  0x05F538 $F528: C-----  3E 1E 00 ROL  $001E,X
  0x05F53B $F52B: C-----  01 01    ORA  ($01,X)
  0x05F53D $F52D: C-----  01 01    ORA  ($01,X)
  0x05F53F $F52F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F540 $F530: C-----  40       RTI  
  0x05F541 $F531: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F542 $F532: C-----  00       BRK  
  0x05F543 $F533: C-----  00       BRK  
  0x05F544 $F534: C-----  00       BRK  
  0x05F545 $F535: C-----  00       BRK  
  0x05F546 $F536: C-----  00       BRK  
  0x05F547 $F537: C-----  00       BRK  
  0x05F548 $F538: C-----  C0 80    CPY  #$80
  0x05F54A $F53A: C-----  00       BRK  
  0x05F54B $F53B: C-----  00       BRK  
  0x05F54C $F53C: C-----  00       BRK  
  0x05F54D $F53D: C-----  00       BRK  
  0x05F54E $F53E: C-----  00       BRK  
  0x05F54F $F53F: C-----  00       BRK  
  0x05F550 $F540: C-----  40       RTI  
  0x05F551 $F541: C-----  E0 60    CPX  #$60
  0x05F553 $F543: C-----  20 00 00 JSR  $0000
  0x05F556 $F546: C-----  00       BRK  
  0x05F557 $F547: C-----  00       BRK  
  0x05F558 $F548: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F559 $F549: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F55A $F54A: C-----  00       BRK  
  0x05F55B $F54B: C-----  00       BRK  
  0x05F55C $F54C: C-----  00       BRK  
  0x05F55D $F54D: C-----  00       BRK  
  0x05F55E $F54E: C-----  00       BRK  
  0x05F55F $F54F: C-----  00       BRK  
  0x05F560 $F550: C-----  00       BRK  
  0x05F561 $F551: C-----  00       BRK  
  0x05F562 $F552: C-----  00       BRK  
  0x05F563 $F553: C-----  00       BRK  
  0x05F564 $F554: C-----  00       BRK  
  0x05F565 $F555: C-----  00       BRK  
  0x05F566 $F556: C-----  00       BRK  
  0x05F567 $F557: C-----  21 03    AND  ($03,X)
  0x05F569 $F559: C-----  0E 0E 1C ASL  $1C0E
  0x05F56C $F55C: C-----  38       SEC  
  0x05F56D $F55D: C-----  70 70    BVS  $F5CF
  0x05F56F $F55F: C-----  E0 01    CPX  #$01
  0x05F571 $F561: C-----  01 02    ORA  ($02,X)
  0x05F573 $F563: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F574 $F564: C-----  06 0C    ASL  $0C
  0x05F576 $F566: C-----  08       PHP  
  0x05F577 $F567: C-----  00       BRK  
  0x05F578 $F568: C-----  00       BRK  
  0x05F579 $F569: C-----  00       BRK  
  0x05F57A $F56A: C-----  01 00    ORA  ($00,X)
  0x05F57C $F56C: C-----  00       BRK  
  0x05F57D $F56D: C-----  00       BRK  
  0x05F57E $F56E: C-----  00       BRK  
  0x05F57F $F56F: C-----  00       BRK  
  0x05F580 $F570: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x05F581 $F571: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F582 $F572: C-----  01 00    ORA  ($00,X)
  0x05F584 $F574: C-----  00       BRK  
  0x05F585 $F575: C-----  00       BRK  
  0x05F586 $F576: C-----  00       BRK  
  0x05F587 $F577: C-----  00       BRK  
  0x05F588 $F578: C-----  C1 81    CMP  ($81,X)
  0x05F58A $F57A: C-----  00       BRK  
  0x05F58B $F57B: C-----  00       BRK  
  0x05F58C $F57C: C-----  00       BRK  
  0x05F58D $F57D: C-----  00       BRK  
  0x05F58E $F57E: C-----  00       BRK  
  0x05F58F $F57F: C-----  00       BRK  
  0x05F590 $F580: C-----  00       BRK  
  0x05F591 $F581: C-----  00       BRK  
  0x05F592 $F582: C-----  00       BRK  
  0x05F593 $F583: C-----  00       BRK  
  0x05F594 $F584: C-----  00       BRK  
  0x05F595 $F585: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F596 $F586: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F597 $F587: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F598 $F588: C-----  00       BRK  
  0x05F599 $F589: C-----  00       BRK  
  0x05F59A $F58A: C-----  00       BRK  
  0x05F59B $F58B: C-----  00       BRK  
  0x05F59C $F58C: C-----  00       BRK  
  0x05F59D $F58D: C-----  00       BRK  
  0x05F59E $F58E: C-----  00       BRK  
  0x05F59F $F58F: C-----  00       BRK  
  0x05F5A0 $F590: C-----  00       BRK  
  0x05F5A1 $F591: C-----  00       BRK  
  0x05F5A2 $F592: C-----  00       BRK  
  0x05F5A3 $F593: C-----  00       BRK  
  0x05F5A4 $F594: C-----  00       BRK  
  0x05F5A5 $F595: C-----  10 08    BPL  $F59F
  0x05F5A7 $F597: C-----  A0 00    LDY  #$00
  0x05F5A9 $F599: C-----  00       BRK  
  0x05F5AA $F59A: C-----  00       BRK  
  0x05F5AB $F59B: C-----  00       BRK  
  0x05F5AC $F59C: C-----  00       BRK  
  0x05F5AD $F59D: C-----  10 08    BPL  $F5A7
  0x05F5AF $F59F: C-----  60       RTS  
  0x05F5B0 $F5A0: C-----  08       PHP  
  0x05F5B1 $F5A1: C-----  00       BRK  
  0x05F5B2 $F5A2: C-----  08       PHP  
  0x05F5B3 $F5A3: C-----  00       BRK  
  0x05F5B4 $F5A4: C-----  20 44 0C JSR  $0C44
  0x05F5B7 $F5A7: C-----  5E 08 00 LSR  $0008,X
  0x05F5BA $F5AA: C-----  08       PHP  
  0x05F5BB $F5AB: C-----  08       PHP  
  0x05F5BC $F5AC: C-----  20 60 00 JSR  $0060
  0x05F5BF $F5AF: C-----  60       RTS  
  0x05F5C0 $F5B0: C-----  01 04    ORA  ($04,X)
  0x05F5C2 $F5B2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F5C3 $F5B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F5C4 $F5B4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F5C5 $F5B5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F5C6 $F5B6: C-----  01 00    ORA  ($00,X)
  0x05F5C8 $F5B8: C-----  00       BRK  
  0x05F5C9 $F5B9: C-----  00       BRK  
  0x05F5CA $F5BA: C-----  00       BRK  
  0x05F5CB $F5BB: C-----  01 00    ORA  ($00,X)
  0x05F5CD $F5BD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F5CE $F5BE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F5CF $F5BF: C-----  00       BRK  
  0x05F5D0 $F5C0: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F5D1 $F5C1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F5D2 $F5C2: C-----  A0 C0    LDY  #$C0
  0x05F5D4 $F5C4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F5D5 $F5C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F5D6 $F5C6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F5D7 $F5C7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F5D8 $F5C8: C-----  40       RTI  
  0x05F5D9 $F5C9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F5DA $F5CA: C-----  E0 C0    CPX  #$C0
  0x05F5DC $F5CC: C-----  C0 00    CPY  #$00
  0x05F5DE $F5CE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F5DF $F5CF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F5E0 $F5D0: C-----  F8       SED  
  0x05F5E1 $F5D1: C-----  E0 11    CPX  #$11
  0x05F5E3 $F5D3: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05F5E4 $F5D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F5E5 $F5D5: C-----  ED 06 02 SBC  $0206
  0x05F5E8 $F5D8: C-----  00       BRK  
  0x05F5E9 $F5D9: C-----  10 1C    BPL  $F5F7
  0x05F5EB $F5DB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F5EC $F5DC: C-----  01 0F    ORA  ($0F,X)
  0x05F5EE $F5DE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F5EF $F5DF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F5F0 $F5E0: C-----  00       BRK  
  0x05F5F1 $F5E1: C-----  00       BRK  
  0x05F5F2 $F5E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F5F3 $F5E3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F5F4 $F5E4: C-----  00       BRK  
  0x05F5F5 $F5E5: C-----  C0 80    CPY  #$80
  0x05F5F7 $F5E7: C-----  00       BRK  
  0x05F5F8 $F5E8: C-----  00       BRK  
  0x05F5F9 $F5E9: C-----  00       BRK  
  0x05F5FA $F5EA: C-----  00       BRK  
  0x05F5FB $F5EB: C-----  00       BRK  
  0x05F5FC $F5EC: C-----  00       BRK  
  0x05F5FD $F5ED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F5FE $F5EE: C-----  00       BRK  
  0x05F5FF $F5EF: C-----  00       BRK  
  0x05F600 $F5F0: C-----  00       BRK  
  0x05F601 $F5F1: C-----  00       BRK  
  0x05F602 $F5F2: C-----  00       BRK  
  0x05F603 $F5F3: C-----  01 01    ORA  ($01,X)
  0x05F605 $F5F5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F606 $F5F6: C-----  0E 0C 00 ASL  $000C
  0x05F609 $F5F9: C-----  00       BRK  
  0x05F60A $F5FA: C-----  00       BRK  
  0x05F60B $F5FB: C-----  00       BRK  
  0x05F60C $F5FC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F60D $F5FD: C-----  00       BRK  
  0x05F60E $F5FE: C-----  01 03    ORA  ($03,X)
  0x05F610 $F600: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F611 $F601: C-----  39 EE FE AND  $FEEE,Y
  0x05F614 $F604: C-----  F0 1D    BEQ  $F623
  0x05F616 $F606: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F617 $F607: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05F618 $F608: C-----  00       BRK  
  0x05F619 $F609: C-----  06 1D    ASL  $1D
  0x05F61B $F60B: C-----  01 8F    ORA  ($8F,X)
  0x05F61D $F60D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05F61E $F60E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05F61F $F60F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05F620 $F610: C-----  E0 F8    CPX  #$F8
  0x05F622 $F612: C-----  0E C7 03 ASL  $03C7
  0x05F625 $F615: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x05F626 $F616: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F627 $F617: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F628 $F618: C-----  00       BRK  
  0x05F629 $F619: C-----  38       SEC  
  0x05F62A $F61A: C-----  FE 3F FF INC  $FF3F,X
  0x05F62D $F61D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F62E $F61E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F62F $F61F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F630 $F620: C-----  00       BRK  
  0x05F631 $F621: C-----  00       BRK  
  0x05F632 $F622: C-----  00       BRK  
  0x05F633 $F623: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F634 $F624: C-----  C0 E0    CPY  #$E0
  0x05F636 $F626: C-----  F0 B0    BEQ  $F5D8
  0x05F638 $F628: C-----  00       BRK  
  0x05F639 $F629: C-----  00       BRK  
  0x05F63A $F62A: C-----  00       BRK  
  0x05F63B $F62B: C-----  00       BRK  
  0x05F63C $F62C: C-----  00       BRK  
  0x05F63D $F62D: C-----  00       BRK  
  0x05F63E $F62E: C-----  00       BRK  
  0x05F63F $F62F: C-----  C0 1D    CPY  #$1D
  0x05F641 $F631: C-----  1D 19 37 ORA  $3719,X
  0x05F644 $F634: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x05F645 $F635: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x05F646 $F636: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x05F647 $F637: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x05F648 $F638: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F649 $F639: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F64A $F63A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F64B $F63B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F64C $F63C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F64D $F63D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F64E $F63E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F64F $F63F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F650 $F640: C-----  F9 F8 D4 SBC  $D4F8,Y
  0x05F653 $F643: C-----  66 BB    ROR  $BB
  0x05F655 $F645: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x05F656 $F646: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F657 $F647: C-----  3D 07 17 AND  $1707,X
  0x05F65A $F64A: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05F65B $F64B: C-----  F9 7C FF SBC  $FF7C,Y
  0x05F65E $F64E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F65F $F64F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F660 $F650: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F661 $F651: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F662 $F652: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F663 $F653: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F664 $F654: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F665 $F655: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F666 $F656: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F667 $F657: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F668 $F658: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F669 $F659: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F66A $F65A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F66B $F65B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F66C $F65C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F66D $F65D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F66E $F65E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F66F $F65F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F670 $F660: C-----  B8       CLV  
  0x05F671 $F661: C-----  B8       CLV  
  0x05F672 $F662: C-----  D8       CLD  
  0x05F673 $F663: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F674 $F664: C-----  EC EC F2 CPX  $F2EC
  0x05F677 $F667: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05F678 $F668: C-----  C0 C0    CPY  #$C0
  0x05F67A $F66A: C-----  E0 E0    CPX  #$E0
  0x05F67C $F66C: C-----  F0 F0    BEQ  $F65E
  0x05F67E $F66E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F67F $F66F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F680 $F670: C-----  70 24    BVS  $F696
  0x05F682 $F672: C-----  2E 73 5F ROL  $5F73
  0x05F685 $F675: C-----  2D 2E 33 AND  $332E
  0x05F688 $F678: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F689 $F679: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x05F68A $F67A: C-----  59 4C 64 EOR  $644C,Y
  0x05F68D $F67D: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x05F68E $F67E: C-----  31 3C    AND  ($3C),Y
  0x05F690 $F680: C-----  7D FF FB ADC  $FBFF,X
  0x05F693 $F683: C-----  C5 BD    CMP  $BD
  0x05F695 $F685: C-----  BD 25 BE LDA  $BE25,X
  0x05F698 $F688: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F699 $F689: C-----  7D 7D 7B ADC  $7B7D,X
  0x05F69C $F68C: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05F69D $F68D: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x05F69E $F68E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05F69F $F68F: C-----  41 8F    EOR  ($8F,X)
  0x05F6A1 $F691: C-----  CD CD CD CMP  $CDCD
  0x05F6A4 $F694: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05F6A5 $F695: C-----  E1 FC    SBC  ($FC,X)
  0x05F6A7 $F697: C-----  A6 FF    LDX  $FF
  0x05F6A9 $F699: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F6AA $F69A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F6AB $F69B: C-----  BE 9E 9F LDX  $9F9E,Y
  0x05F6AE $F69E: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x05F6AF $F69F: C-----  CE F2 96 DEC  $96F2
  0x05F6B2 $F6A2: C-----  A6 EE    LDX  $EE
  0x05F6B4 $F6A4: C-----  4A       LSR  A
  0x05F6B5 $F6A5: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x05F6B6 $F6A6: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F6B7 $F6A7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F6B8 $F6A8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F6B9 $F6A9: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05F6BA $F6AA: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05F6BB $F6AB: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05F6BC $F6AC: C-----  F6 E6    INC  $E6,X
  0x05F6BE $F6AE: C-----  E6 CC    INC  $CC
  0x05F6C0 $F6B0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F6C1 $F6B1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F6C2 $F6B2: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05F6C3 $F6B3: C-----  06 0B    ASL  $0B
  0x05F6C5 $F6B5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F6C6 $F6B6: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F6C7 $F6B7: C-----  06 18    ASL  $18
  0x05F6C9 $F6B9: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F6CA $F6BA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05F6CB $F6BB: C-----  09 0D    ORA  #$0D
  0x05F6CD $F6BD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F6CE $F6BE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F6CF $F6BF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F6D0 $F6C0: C-----  EE F6 F2 INC  $F2F6
  0x05F6D3 $F6C3: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x05F6D4 $F6C4: C-----  3E BE DF ROL  $DFBE,X
  0x05F6D7 $F6C7: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05F6D8 $F6C8: C-----  11 79    ORA  ($79),Y
  0x05F6DA $F6CA: C-----  3D BD DD AND  $DDBD,X
  0x05F6DD $F6CD: C-----  CD 6C 76 CMP  $766C
  0x05F6E0 $F6D0: C-----  8D 87 8B STA  $8B87
  0x05F6E3 $F6D3: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x05F6E4 $F6D4: C-----  C6 E2    DEC  $E2
  0x05F6E6 $F6D6: C-----  70 7F    BVS  $F757
  0x05F6E8 $F6D8: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x05F6E9 $F6D9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05F6EA $F6DA: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05F6EB $F6DB: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05F6EC $F6DC: C-----  C8       INY  
  0x05F6ED $F6DD: C-----  EC FF FF CPX  $FFFF
  0x05F6F0 $F6E0: C-----  08       PHP  
  0x05F6F1 $F6E1: C-----  18       CLC  
  0x05F6F2 $F6E2: C-----  18       CLC  
  0x05F6F3 $F6E3: C-----  30 30    BMI  $F715
  0x05F6F5 $F6E5: C-----  70 E0    BVS  $F6C7
  0x05F6F7 $F6E7: C-----  C0 3C    CPY  #$3C
  0x05F6F9 $F6E9: C-----  78       SEI  
  0x05F6FA $F6EA: C-----  78       SEI  
  0x05F6FB $F6EB: C-----  70 F0    BVS  $F6DD
  0x05F6FD $F6ED: C-----  F0 E0    BEQ  $F6CF
  0x05F6FF $F6EF: C-----  E0 07    CPX  #$07
  0x05F701 $F6F1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F702 $F6F2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F703 $F6F3: C-----  05 02    ORA  $02
  0x05F705 $F6F5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F706 $F6F6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F707 $F6F7: C-----  01 0F    ORA  ($0F,X)
  0x05F709 $F6F9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F70A $F6FA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F70B $F6FB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F70C $F6FC: C-----  05 06    ORA  $06
  0x05F70E $F6FE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F70F $F6FF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F710 $F700: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x05F711 $F701: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x05F712 $F702: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x05F713 $F703: C-----  D1 D9    CMP  ($D9),Y
  0x05F715 $F705: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05F716 $F706: C-----  6D A9 BA ADC  $BAA9
  0x05F719 $F709: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x05F71A $F70A: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x05F71B $F70B: C-----  EE EE EF INC  $EFEE
  0x05F71E $F70E: C-----  F6 F6    INC  $F6,X
  0x05F720 $F710: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F721 $F711: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F722 $F712: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05F723 $F713: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05F724 $F714: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05F725 $F715: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05F726 $F716: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05F727 $F717: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05F728 $F718: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F729 $F719: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F72A $F71A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F72B $F71B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F72C $F71C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F72D $F71D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F72E $F71E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F72F $F71F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F730 $F720: C-----  C0 C0    CPY  #$C0
  0x05F732 $F722: C-----  C0 C0    CPY  #$C0
  0x05F734 $F724: C-----  C0 80    CPY  #$80
  0x05F736 $F726: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F737 $F727: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F738 $F728: C-----  E0 C0    CPX  #$C0
  0x05F73A $F72A: C-----  C0 C0    CPY  #$C0
  0x05F73C $F72C: C-----  C0 80    CPY  #$80
  0x05F73E $F72E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F73F $F72F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F740 $F730: C-----  01 00    ORA  ($00,X)
  0x05F742 $F732: C-----  00       BRK  
  0x05F743 $F733: C-----  00       BRK  
  0x05F744 $F734: C-----  00       BRK  
  0x05F745 $F735: C-----  00       BRK  
  0x05F746 $F736: C-----  00       BRK  
  0x05F747 $F737: C-----  00       BRK  
  0x05F748 $F738: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F749 $F739: C-----  01 01    ORA  ($01,X)
  0x05F74B $F73B: C-----  00       BRK  
  0x05F74C $F73C: C-----  00       BRK  
  0x05F74D $F73D: C-----  00       BRK  
  0x05F74E $F73E: C-----  00       BRK  
  0x05F74F $F73F: C-----  00       BRK  
  0x05F750 $F740: C-----  E1 F4    SBC  ($F4,X)
  0x05F752 $F742: C-----  F5 75    SBC  $75,X
  0x05F754 $F744: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x05F755 $F745: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x05F756 $F746: C-----  46 2D    LSR  $2D
  0x05F758 $F748: C-----  FE FB FA INC  $FAFB,X
  0x05F75B $F74B: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05F75C $F74C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F75D $F74D: C-----  7D 39 53 ADC  $5339,X
  0x05F760 $F750: C-----  DE 9F BF DEC  $BF9F,X
  0x05F763 $F753: C-----  3E 7D 73 ROL  $737D,X
  0x05F766 $F756: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05F767 $F757: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05F768 $F758: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F769 $F759: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F76A $F75A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F76B $F75B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F76C $F75C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F76D $F75D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F76E $F75E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05F76F $F75F: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05F770 $F760: C-----  3E 5A 0C ROL  $0C5A,X
  0x05F773 $F763: C-----  50 79    BVC  $F7DE
  0x05F775 $F765: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05F776 $F766: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05F777 $F767: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x05F778 $F768: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x05F779 $F769: C-----  66 74    ROR  $74
  0x05F77B $F76B: C-----  68       PLA  
  0x05F77C $F76C: C-----  48       PHA  
  0x05F77D $F76D: C-----  51 53    EOR  ($53),Y
  0x05F77F $F76F: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x05F780 $F770: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x05F781 $F771: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05F782 $F772: C-----  E6 CC    INC  $CC
  0x05F784 $F774: C-----  D8       CLD  
  0x05F785 $F775: C-----  B8       CLV  
  0x05F786 $F776: C-----  30 EC    BMI  $F764
  0x05F788 $F778: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05F789 $F779: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x05F78A $F77A: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x05F78B $F77B: C-----  3E 3C 74 ROL  $743C,X
  0x05F78E $F77E: C-----  CC 10 00 CPY  $0010
  0x05F791 $F781: C-----  00       BRK  
  0x05F792 $F782: C-----  00       BRK  
  0x05F793 $F783: C-----  01 01    ORA  ($01,X)
  0x05F795 $F785: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F796 $F786: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F797 $F787: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F798 $F788: C-----  00       BRK  
  0x05F799 $F789: C-----  00       BRK  
  0x05F79A $F78A: C-----  00       BRK  
  0x05F79B $F78B: C-----  00       BRK  
  0x05F79C $F78C: C-----  00       BRK  
  0x05F79D $F78D: C-----  01 01    ORA  ($01,X)
  0x05F79F $F78F: C-----  00       BRK  
  0x05F7A0 $F790: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x05F7A1 $F791: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F7A2 $F792: C-----  BE F0 E7 LDX  $E7F0,Y
  0x05F7A5 $F795: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05F7A6 $F796: C-----  08       PHP  
  0x05F7A7 $F797: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05F7A8 $F798: C-----  24 00    BIT  $00
  0x05F7AA $F79A: C-----  41 0F    EOR  ($0F,X)
  0x05F7AC $F79C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F7AD $F79D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F7AE $F79E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F7AF $F79F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05F7B0 $F7A0: C-----  C4 94    CPY  $94
  0x05F7B2 $F7A2: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05F7B3 $F7A3: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x05F7B4 $F7A4: C-----  F6 E6    INC  $E6,X
  0x05F7B6 $F7A6: C-----  4E 3E 38 LSR  $383E
  0x05F7B9 $F7A9: C-----  78       SEI  
  0x05F7BA $F7AA: C-----  F8       SED  
  0x05F7BB $F7AB: C-----  F8       SED  
  0x05F7BC $F7AC: C-----  F8       SED  
  0x05F7BD $F7AD: C-----  F8       SED  
  0x05F7BE $F7AE: C-----  F0 C0    BEQ  $F770
  0x05F7C0 $F7B0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F7C1 $F7B1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05F7C2 $F7B2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F7C3 $F7B3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F7C4 $F7B4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F7C5 $F7B5: C-----  09 04    ORA  #$04
  0x05F7C7 $F7B7: C-----  00       BRK  
  0x05F7C8 $F7B8: C-----  00       BRK  
  0x05F7C9 $F7B9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F7CA $F7BA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F7CB $F7BB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F7CC $F7BC: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05F7CD $F7BD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F7CE $F7BE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F7CF $F7BF: C-----  00       BRK  
  0x05F7D0 $F7C0: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F7D1 $F7C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F7D2 $F7C2: C-----  B8       CLV  
  0x05F7D3 $F7C3: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05F7D4 $F7C4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F7D5 $F7C5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F7D6 $F7C6: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05F7D7 $F7C7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F7D8 $F7C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F7D9 $F7C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F7DA $F7CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F7DB $F7CB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F7DC $F7CC: C-----  F8       SED  
  0x05F7DD $F7CD: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05F7DE $F7CE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F7DF $F7CF: C-----  78       SEI  
  0x05F7E0 $F7D0: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05F7E1 $F7D1: C-----  ED 73 3C SBC  $3C73
  0x05F7E4 $F7D4: C-----  8E FE 3E STX  $3EFE
  0x05F7E7 $F7D7: C-----  98       TYA  
  0x05F7E8 $F7D8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F7E9 $F7D9: C-----  FE FF 30 INC  $30FF,X
  0x05F7EC $F7DC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F7ED $F7DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F7EE $F7DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F7EF $F7DF: C-----  7E 00 00 ROR  $0000,X
  0x05F7F2 $F7E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F7F3 $F7E3: C-----  40       RTI  
  0x05F7F4 $F7E4: C-----  40       RTI  
  0x05F7F5 $F7E5: C-----  C0 80    CPY  #$80
  0x05F7F7 $F7E7: C-----  00       BRK  
  0x05F7F8 $F7E8: C-----  00       BRK  
  0x05F7F9 $F7E9: C-----  00       BRK  
  0x05F7FA $F7EA: C-----  00       BRK  
  0x05F7FB $F7EB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F7FC $F7EC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F7FD $F7ED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F7FE $F7EE: C-----  00       BRK  
  0x05F7FF $F7EF: C-----  00       BRK  
  0x05F800 $F7F0: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F801 $F7F1: C-----  2A       ROL  A
  0x05F802 $F7F2: C-----  7D 5A 71 ADC  $715A,X
  0x05F805 $F7F5: C-----  2A       ROL  A
  0x05F806 $F7F6: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05F807 $F7F7: C-----  00       BRK  
  0x05F808 $F7F8: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05F809 $F7F9: C-----  2A       ROL  A
  0x05F80A $F7FA: C-----  7D 5A 71 ADC  $715A,X
  0x05F80D $F7FD: C-----  2A       ROL  A
  0x05F80E $F7FE: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05F80F $F7FF: C-----  00       BRK  
  0x05F810 $F800: C-----  00       BRK  
  0x05F811 $F801: C-----  00       BRK  
  0x05F812 $F802: C-----  00       BRK  
  0x05F813 $F803: C-----  00       BRK  
  0x05F814 $F804: C-----  00       BRK  
  0x05F815 $F805: C-----  00       BRK  
  0x05F816 $F806: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F817 $F807: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F818 $F808: C-----  00       BRK  
  0x05F819 $F809: C-----  00       BRK  
  0x05F81A $F80A: C-----  00       BRK  
  0x05F81B $F80B: C-----  00       BRK  
  0x05F81C $F80C: C-----  00       BRK  
  0x05F81D $F80D: C-----  00       BRK  
  0x05F81E $F80E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F81F $F80F: C-----  10 03    BPL  $F814
  0x05F821 $F811: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F822 $F812: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F823 $F813: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F824 $F814: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F825 $F815: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F826 $F816: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F827 $F817: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F828 $F818: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F829 $F819: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F82A $F81A: C-----  06 04    ASL  $04
  0x05F82C $F81C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05F82D $F81D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F82E $F81E: C-----  F8       SED  
  0x05F82F $F81F: C-----  00       BRK  
  0x05F830 $F820: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F831 $F821: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F832 $F822: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F833 $F823: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F834 $F824: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F835 $F825: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F836 $F826: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F837 $F827: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F838 $F828: C-----  10 30    BPL  $F85A
  0x05F83A $F82A: C-----  20 20 60 JSR  $6020
  0x05F83D $F82D: C-----  40       RTI  
  0x05F83E $F82E: C-----  40       RTI  
  0x05F83F $F82F: C-----  C0 FF    CPY  #$FF
  0x05F841 $F831: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F842 $F832: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F843 $F833: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F844 $F834: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F845 $F835: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F846 $F836: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F847 $F837: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F848 $F838: C-----  00       BRK  
  0x05F849 $F839: C-----  00       BRK  
  0x05F84A $F83A: C-----  00       BRK  
  0x05F84B $F83B: C-----  00       BRK  
  0x05F84C $F83C: C-----  00       BRK  
  0x05F84D $F83D: C-----  00       BRK  
  0x05F84E $F83E: C-----  00       BRK  
  0x05F84F $F83F: C-----  00       BRK  
  0x05F850 $F840: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F851 $F841: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F852 $F842: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F853 $F843: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F854 $F844: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F855 $F845: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F856 $F846: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F857 $F847: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F858 $F848: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F859 $F849: C-----  00       BRK  
  0x05F85A $F84A: C-----  00       BRK  
  0x05F85B $F84B: C-----  00       BRK  
  0x05F85C $F84C: C-----  00       BRK  
  0x05F85D $F84D: C-----  00       BRK  
  0x05F85E $F84E: C-----  00       BRK  
  0x05F85F $F84F: C-----  00       BRK  
  0x05F860 $F850: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F861 $F851: C-----  FE F8 F0 INC  $F0F8,X
  0x05F864 $F854: C-----  E0 C0    CPX  #$C0
  0x05F866 $F856: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F867 $F857: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F868 $F858: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F869 $F859: C-----  0E 1F 3F ASL  $3F1F
  0x05F86C $F85C: C-----  7E 7C FF ROR  $FF7C,X
  0x05F86F $F85F: C-----  00       BRK  
  0x05F870 $F860: C-----  00       BRK  
  0x05F871 $F861: C-----  00       BRK  
  0x05F872 $F862: C-----  01 01    ORA  ($01,X)
  0x05F874 $F864: C-----  01 03    ORA  ($03,X)
  0x05F876 $F866: C-----  00       BRK  
  0x05F877 $F867: C-----  00       BRK  
  0x05F878 $F868: C-----  00       BRK  
  0x05F879 $F869: C-----  00       BRK  
  0x05F87A $F86A: C-----  01 01    ORA  ($01,X)
  0x05F87C $F86C: C-----  01 03    ORA  ($03,X)
  0x05F87E $F86E: C-----  00       BRK  
  0x05F87F $F86F: C-----  00       BRK  
  0x05F880 $F870: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F881 $F871: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F882 $F872: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F883 $F873: C-----  FE FE FC INC  $FCFE,X
  0x05F886 $F876: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F887 $F877: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F888 $F878: C-----  00       BRK  
  0x05F889 $F879: C-----  01 03    ORA  ($03,X)
  0x05F88B $F87B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F88C $F87C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F88D $F87D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F88E $F87E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F88F $F87F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F890 $F880: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F891 $F881: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F892 $F882: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F893 $F883: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F894 $F884: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F895 $F885: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F896 $F886: C-----  01 03    ORA  ($03,X)
  0x05F898 $F888: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F899 $F889: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F89A $F88A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F89B $F88B: C-----  00       BRK  
  0x05F89C $F88C: C-----  00       BRK  
  0x05F89D $F88D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F89E $F88E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F89F $F88F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8A0 $F890: C-----  00       BRK  
  0x05F8A1 $F891: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F8A2 $F892: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F8A3 $F893: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F8A4 $F894: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F8A5 $F895: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F8A6 $F896: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F8A7 $F897: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F8A8 $F898: C-----  00       BRK  
  0x05F8A9 $F899: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F8AA $F89A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05F8AB $F89B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F8AC $F89C: C-----  08       PHP  
  0x05F8AD $F89D: C-----  08       PHP  
  0x05F8AE $F89E: C-----  18       CLC  
  0x05F8AF $F89F: C-----  10 03    BPL  $F8A4
  0x05F8B1 $F8A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8B2 $F8A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8B3 $F8A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8B4 $F8A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8B5 $F8A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8B6 $F8A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8B7 $F8A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8B8 $F8A8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05F8B9 $F8A9: C-----  FE 00 00 INC  $0000,X
  0x05F8BC $F8AC: C-----  00       BRK  
  0x05F8BD $F8AD: C-----  00       BRK  
  0x05F8BE $F8AE: C-----  00       BRK  
  0x05F8BF $F8AF: C-----  00       BRK  
  0x05F8C0 $F8B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8C1 $F8B1: C-----  00       BRK  
  0x05F8C2 $F8B2: C-----  00       BRK  
  0x05F8C3 $F8B3: C-----  00       BRK  
  0x05F8C4 $F8B4: C-----  00       BRK  
  0x05F8C5 $F8B5: C-----  01 01    ORA  ($01,X)
  0x05F8C7 $F8B7: C-----  01 FF    ORA  ($FF,X)
  0x05F8C9 $F8B9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F8CA $F8BA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F8CB $F8BB: C-----  00       BRK  
  0x05F8CC $F8BC: C-----  00       BRK  
  0x05F8CD $F8BD: C-----  01 01    ORA  ($01,X)
  0x05F8CF $F8BF: C-----  01 FF    ORA  ($FF,X)
  0x05F8D1 $F8C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8D2 $F8C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8D3 $F8C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8D4 $F8C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8D5 $F8C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8D6 $F8C6: C-----  F0 F0    BEQ  $F8B8
  0x05F8D8 $F8C8: C-----  00       BRK  
  0x05F8D9 $F8C9: C-----  00       BRK  
  0x05F8DA $F8CA: C-----  00       BRK  
  0x05F8DB $F8CB: C-----  00       BRK  
  0x05F8DC $F8CC: C-----  00       BRK  
  0x05F8DD $F8CD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F8DE $F8CE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F8DF $F8CF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F8E0 $F8D0: C-----  F8       SED  
  0x05F8E1 $F8D1: C-----  F8       SED  
  0x05F8E2 $F8D2: C-----  F8       SED  
  0x05F8E3 $F8D3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05F8E4 $F8D4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05F8E5 $F8D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8E6 $F8D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8E7 $F8D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8E8 $F8D8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F8E9 $F8D9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F8EA $F8DA: C-----  1E 1F 1C ASL  $1C1F,X
  0x05F8ED $F8DD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F8EE $F8DE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F8EF $F8DF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F8F0 $F8E0: C-----  E0 FF    CPX  #$FF
  0x05F8F2 $F8E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8F3 $F8E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8F4 $F8E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8F5 $F8E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8F6 $F8E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8F7 $F8E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F8F8 $F8E8: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F8F9 $F8E9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F8FA $F8EA: C-----  00       BRK  
  0x05F8FB $F8EB: C-----  00       BRK  
  0x05F8FC $F8EC: C-----  00       BRK  
  0x05F8FD $F8ED: C-----  00       BRK  
  0x05F8FE $F8EE: C-----  00       BRK  
  0x05F8FF $F8EF: C-----  01 FF    ORA  ($FF,X)
  0x05F901 $F8F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F902 $F8F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F903 $F8F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F904 $F8F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F905 $F8F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F906 $F8F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F907 $F8F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F908 $F8F8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F909 $F8F9: C-----  FE 1C 30 INC  $301C,X
  0x05F90C $F8FC: C-----  60       RTS  
  0x05F90D $F8FD: C-----  C0 80    CPY  #$80
  0x05F90F $F8FF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F910 $F900: C-----  00       BRK  
  0x05F911 $F901: C-----  00       BRK  
  0x05F912 $F902: C-----  00       BRK  
  0x05F913 $F903: C-----  00       BRK  
  0x05F914 $F904: C-----  00       BRK  
  0x05F915 $F905: C-----  00       BRK  
  0x05F916 $F906: C-----  F8       SED  
  0x05F917 $F907: C-----  F0 00    BEQ  $F909
  0x05F919 $F909: C-----  00       BRK  
  0x05F91A $F90A: C-----  C0 80    CPY  #$80
  0x05F91C $F90C: C-----  00       BRK  
  0x05F91D $F90D: C-----  00       BRK  
  0x05F91E $F90E: C-----  F8       SED  
  0x05F91F $F90F: C-----  70 FF    BVS  $F910
  0x05F921 $F911: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F922 $F912: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F923 $F913: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F924 $F914: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F925 $F915: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F926 $F916: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F927 $F917: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F928 $F918: C-----  00       BRK  
  0x05F929 $F919: C-----  00       BRK  
  0x05F92A $F91A: C-----  F8       SED  
  0x05F92B $F91B: C-----  00       BRK  
  0x05F92C $F91C: C-----  00       BRK  
  0x05F92D $F91D: C-----  00       BRK  
  0x05F92E $F91E: C-----  00       BRK  
  0x05F92F $F91F: C-----  00       BRK  
  0x05F930 $F920: C-----  C0 80    CPY  #$80
  0x05F932 $F922: C-----  00       BRK  
  0x05F933 $F923: C-----  00       BRK  
  0x05F934 $F924: C-----  00       BRK  
  0x05F935 $F925: C-----  00       BRK  
  0x05F936 $F926: C-----  00       BRK  
  0x05F937 $F927: C-----  00       BRK  
  0x05F938 $F928: C-----  FE FC F0 INC  $F0FC,X
  0x05F93B $F92B: C-----  E0 C0    CPX  #$C0
  0x05F93D $F92D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F93E $F92E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F93F $F92F: C-----  00       BRK  
  0x05F940 $F930: C-----  00       BRK  
  0x05F941 $F931: C-----  00       BRK  
  0x05F942 $F932: C-----  00       BRK  
  0x05F943 $F933: C-----  01 01    ORA  ($01,X)
  0x05F945 $F935: C-----  01 03    ORA  ($03,X)
  0x05F947 $F937: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F948 $F938: C-----  00       BRK  
  0x05F949 $F939: C-----  00       BRK  
  0x05F94A $F93A: C-----  00       BRK  
  0x05F94B $F93B: C-----  01 01    ORA  ($01,X)
  0x05F94D $F93D: C-----  01 03    ORA  ($03,X)
  0x05F94F $F93F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F950 $F940: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F951 $F941: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F952 $F942: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F953 $F943: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F954 $F944: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05F955 $F945: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F956 $F946: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F957 $F947: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05F958 $F948: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F959 $F949: C-----  10 30    BPL  $F97B
  0x05F95B $F94B: C-----  20 20 60 JSR  $6020
  0x05F95E $F94E: C-----  40       RTI  
  0x05F95F $F94F: C-----  40       RTI  
  0x05F960 $F950: C-----  F8       SED  
  0x05F961 $F951: C-----  F0 F0    BEQ  $F943
  0x05F963 $F953: C-----  F0 E0    BEQ  $F935
  0x05F965 $F955: C-----  E0 E0    CPX  #$E0
  0x05F967 $F957: C-----  C0 1F    CPY  #$1F
  0x05F969 $F959: C-----  1E 1E 3C ASL  $3C1E,X
  0x05F96C $F95C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F96D $F95D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05F96E $F95E: C-----  78       SEI  
  0x05F96F $F95F: C-----  78       SEI  
  0x05F970 $F960: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F971 $F961: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F972 $F962: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F973 $F963: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F974 $F964: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F975 $F965: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F976 $F966: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F977 $F967: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F978 $F968: C-----  C0 80    CPY  #$80
  0x05F97A $F96A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F97B $F96B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05F97C $F96C: C-----  00       BRK  
  0x05F97D $F96D: C-----  00       BRK  
  0x05F97E $F96E: C-----  00       BRK  
  0x05F97F $F96F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F980 $F970: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F981 $F971: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F982 $F972: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F983 $F973: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F984 $F974: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F985 $F975: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F986 $F976: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F987 $F977: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F988 $F978: C-----  00       BRK  
  0x05F989 $F979: C-----  00       BRK  
  0x05F98A $F97A: C-----  00       BRK  
  0x05F98B $F97B: C-----  00       BRK  
  0x05F98C $F97C: C-----  00       BRK  
  0x05F98D $F97D: C-----  00       BRK  
  0x05F98E $F97E: C-----  00       BRK  
  0x05F98F $F97F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F990 $F980: C-----  00       BRK  
  0x05F991 $F981: C-----  00       BRK  
  0x05F992 $F982: C-----  00       BRK  
  0x05F993 $F983: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F994 $F984: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F995 $F985: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F996 $F986: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F997 $F987: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F998 $F988: C-----  00       BRK  
  0x05F999 $F989: C-----  00       BRK  
  0x05F99A $F98A: C-----  00       BRK  
  0x05F99B $F98B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F99C $F98C: C-----  00       BRK  
  0x05F99D $F98D: C-----  00       BRK  
  0x05F99E $F98E: C-----  00       BRK  
  0x05F99F $F98F: C-----  00       BRK  
  0x05F9A0 $F990: C-----  00       BRK  
  0x05F9A1 $F991: C-----  00       BRK  
  0x05F9A2 $F992: C-----  00       BRK  
  0x05F9A3 $F993: C-----  F0 E0    BEQ  $F975
  0x05F9A5 $F995: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9A6 $F996: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9A7 $F997: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9A8 $F998: C-----  00       BRK  
  0x05F9A9 $F999: C-----  00       BRK  
  0x05F9AA $F99A: C-----  00       BRK  
  0x05F9AB $F99B: C-----  F0 60    BEQ  $F9FD
  0x05F9AD $F99D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9AE $F99E: C-----  00       BRK  
  0x05F9AF $F99F: C-----  00       BRK  
  0x05F9B0 $F9A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9B1 $F9A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9B2 $F9A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9B3 $F9A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9B4 $F9A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9B5 $F9A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9B6 $F9A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9B7 $F9A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9B8 $F9A8: C-----  00       BRK  
  0x05F9B9 $F9A9: C-----  00       BRK  
  0x05F9BA $F9AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F9BB $F9AB: C-----  00       BRK  
  0x05F9BC $F9AC: C-----  00       BRK  
  0x05F9BD $F9AD: C-----  00       BRK  
  0x05F9BE $F9AE: C-----  00       BRK  
  0x05F9BF $F9AF: C-----  00       BRK  
  0x05F9C0 $F9B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9C1 $F9B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9C2 $F9B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9C3 $F9B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9C4 $F9B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9C5 $F9B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9C6 $F9B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9C7 $F9B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9C8 $F9B8: C-----  00       BRK  
  0x05F9C9 $F9B9: C-----  00       BRK  
  0x05F9CA $F9BA: C-----  C0 00    CPY  #$00
  0x05F9CC $F9BC: C-----  00       BRK  
  0x05F9CD $F9BD: C-----  00       BRK  
  0x05F9CE $F9BE: C-----  00       BRK  
  0x05F9CF $F9BF: C-----  00       BRK  
  0x05F9D0 $F9C0: C-----  00       BRK  
  0x05F9D1 $F9C1: C-----  00       BRK  
  0x05F9D2 $F9C2: C-----  00       BRK  
  0x05F9D3 $F9C3: C-----  00       BRK  
  0x05F9D4 $F9C4: C-----  00       BRK  
  0x05F9D5 $F9C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9D6 $F9C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9D7 $F9C7: C-----  FE FF FF INC  $FFFF,X
  0x05F9DA $F9CA: C-----  00       BRK  
  0x05F9DB $F9CB: C-----  00       BRK  
  0x05F9DC $F9CC: C-----  00       BRK  
  0x05F9DD $F9CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05F9DE $F9CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05F9DF $F9CF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F9E0 $F9D0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F9E1 $F9D1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05F9E2 $F9D2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F9E3 $F9D3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F9E4 $F9D4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F9E5 $F9D5: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05F9E6 $F9D6: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05F9E7 $F9D7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F9E8 $F9D8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F9E9 $F9D9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F9EA $F9DA: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05F9EB $F9DB: C-----  08       PHP  
  0x05F9EC $F9DC: C-----  08       PHP  
  0x05F9ED $F9DD: C-----  D8       CLD  
  0x05F9EE $F9DE: C-----  90 F0    BCC  $F9D0
  0x05F9F0 $F9E0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05F9F1 $F9E1: C-----  F8       SED  
  0x05F9F2 $F9E2: C-----  F0 F0    BEQ  $F9D4
  0x05F9F4 $F9E4: C-----  E0 E0    CPX  #$E0
  0x05F9F6 $F9E6: C-----  E0 C0    CPX  #$C0
  0x05F9F8 $F9E8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05F9F9 $F9E9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F9FA $F9EA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05F9FB $F9EB: C-----  3E 3C 3C ROL  $3C3C,X
  0x05F9FE $F9EE: C-----  78       SEI  
  0x05F9FF $F9EF: C-----  78       SEI  
  0x05FA00 $F9F0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FA01 $F9F1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FA02 $F9F2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FA03 $F9F3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FA04 $F9F4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FA05 $F9F5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FA06 $F9F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA07 $F9F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA08 $F9F8: C-----  F0 A0    BEQ  $F99A
  0x05FA0A $F9FA: C-----  20 60 40 JSR  $4060
  0x05FA0D $F9FD: C-----  40       RTI  
  0x05FA0E $F9FE: C-----  C0 80    CPY  #$80
  0x05FA10 $FA00: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FA11 $FA01: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FA12 $FA02: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FA13 $FA03: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA14 $FA04: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA15 $FA05: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA16 $FA06: C-----  00       BRK  
  0x05FA17 $FA07: C-----  00       BRK  
  0x05FA18 $FA08: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FA19 $FA09: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FA1A $FA0A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FA1B $FA0B: C-----  06 04    ASL  $04
  0x05FA1D $FA0D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA1E $FA0E: C-----  01 01    ORA  ($01,X)
  0x05FA20 $FA10: C-----  00       BRK  
  0x05FA21 $FA11: C-----  00       BRK  
  0x05FA22 $FA12: C-----  00       BRK  
  0x05FA23 $FA13: C-----  00       BRK  
  0x05FA24 $FA14: C-----  00       BRK  
  0x05FA25 $FA15: C-----  00       BRK  
  0x05FA26 $FA16: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA27 $FA17: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FA28 $FA18: C-----  00       BRK  
  0x05FA29 $FA19: C-----  00       BRK  
  0x05FA2A $FA1A: C-----  00       BRK  
  0x05FA2B $FA1B: C-----  00       BRK  
  0x05FA2C $FA1C: C-----  00       BRK  
  0x05FA2D $FA1D: C-----  00       BRK  
  0x05FA2E $FA1E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA2F $FA1F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05FA30 $FA20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA31 $FA21: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FA32 $FA22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA33 $FA23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA34 $FA24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA35 $FA25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA36 $FA26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA37 $FA27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA38 $FA28: C-----  C0 C0    CPY  #$C0
  0x05FA3A $FA2A: C-----  C0 80    CPY  #$80
  0x05FA3C $FA2C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FA3D $FA2D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FA3E $FA2E: C-----  00       BRK  
  0x05FA3F $FA2F: C-----  00       BRK  
  0x05FA40 $FA30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA41 $FA31: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FA42 $FA32: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FA43 $FA33: C-----  F8       SED  
  0x05FA44 $FA34: C-----  F8       SED  
  0x05FA45 $FA35: C-----  F8       SED  
  0x05FA46 $FA36: C-----  F0 F0    BEQ  $FA28
  0x05FA48 $FA38: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA49 $FA39: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA4A $FA3A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FA4B $FA3B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FA4C $FA3C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FA4D $FA3D: C-----  1E 1E 1E ASL  $1E1E,X
  0x05FA50 $FA40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA51 $FA41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA52 $FA42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA53 $FA43: C-----  FE FE FE INC  $FEFE,X
  0x05FA56 $FA46: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FA57 $FA47: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FA58 $FA48: C-----  01 01    ORA  ($01,X)
  0x05FA5A $FA4A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FA5B $FA4B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FA5C $FA4C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FA5D $FA4D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA5E $FA4E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA5F $FA4F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FA60 $FA50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA61 $FA51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA62 $FA52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA63 $FA53: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FA64 $FA54: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FA65 $FA55: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FA66 $FA56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA67 $FA57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA68 $FA58: C-----  00       BRK  
  0x05FA69 $FA59: C-----  00       BRK  
  0x05FA6A $FA5A: C-----  C0 C0    CPY  #$C0
  0x05FA6C $FA5C: C-----  C0 C0    CPY  #$C0
  0x05FA6E $FA5E: C-----  C0 80    CPY  #$80
  0x05FA70 $FA60: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FA71 $FA61: C-----  00       BRK  
  0x05FA72 $FA62: C-----  00       BRK  
  0x05FA73 $FA63: C-----  01 01    ORA  ($01,X)
  0x05FA75 $FA65: C-----  01 01    ORA  ($01,X)
  0x05FA77 $FA67: C-----  01 FF    ORA  ($FF,X)
  0x05FA79 $FA69: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA7A $FA6A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA7B $FA6B: C-----  01 01    ORA  ($01,X)
  0x05FA7D $FA6D: C-----  01 01    ORA  ($01,X)
  0x05FA7F $FA6F: C-----  01 FF    ORA  ($FF,X)
  0x05FA81 $FA71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA82 $FA72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA83 $FA73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA84 $FA74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA85 $FA75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA86 $FA76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA87 $FA77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA88 $FA78: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FA89 $FA79: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FA8A $FA7A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FA8B $FA7B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FA8C $FA7C: C-----  00       BRK  
  0x05FA8D $FA7D: C-----  00       BRK  
  0x05FA8E $FA7E: C-----  00       BRK  
  0x05FA8F $FA7F: C-----  00       BRK  
  0x05FA90 $FA80: C-----  00       BRK  
  0x05FA91 $FA81: C-----  00       BRK  
  0x05FA92 $FA82: C-----  00       BRK  
  0x05FA93 $FA83: C-----  00       BRK  
  0x05FA94 $FA84: C-----  00       BRK  
  0x05FA95 $FA85: C-----  00       BRK  
  0x05FA96 $FA86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA97 $FA87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA98 $FA88: C-----  00       BRK  
  0x05FA99 $FA89: C-----  00       BRK  
  0x05FA9A $FA8A: C-----  00       BRK  
  0x05FA9B $FA8B: C-----  00       BRK  
  0x05FA9C $FA8C: C-----  00       BRK  
  0x05FA9D $FA8D: C-----  00       BRK  
  0x05FA9E $FA8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FA9F $FA8F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAA0 $FA90: C-----  F0 E0    BEQ  $FA72
  0x05FAA2 $FA92: C-----  E0 E0    CPX  #$E0
  0x05FAA4 $FA94: C-----  C0 C0    CPY  #$C0
  0x05FAA6 $FA96: C-----  00       BRK  
  0x05FAA7 $FA97: C-----  00       BRK  
  0x05FAA8 $FA98: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05FAA9 $FA99: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05FAAA $FA9A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05FAAB $FA9B: C-----  78       SEI  
  0x05FAAC $FA9C: C-----  78       SEI  
  0x05FAAD $FA9D: C-----  F8       SED  
  0x05FAAE $FA9E: C-----  F0 F0    BEQ  $FA90
  0x05FAB0 $FAA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB1 $FAA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB2 $FAA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB3 $FAA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB4 $FAA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB5 $FAA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB6 $FAA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB7 $FAA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB8 $FAA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAB9 $FAA9: C-----  00       BRK  
  0x05FABA $FAAA: C-----  00       BRK  
  0x05FABB $FAAB: C-----  00       BRK  
  0x05FABC $FAAC: C-----  00       BRK  
  0x05FABD $FAAD: C-----  FE 04 04 INC  $0404,X
  0x05FAC0 $FAB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAC1 $FAB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAC2 $FAB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAC3 $FAB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAC4 $FAB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAC5 $FAB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAC6 $FAB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAC7 $FAB7: C-----  FE FF 00 INC  $00FF,X
  0x05FACA $FABA: C-----  00       BRK  
  0x05FACB $FABB: C-----  00       BRK  
  0x05FACC $FABC: C-----  01 01    ORA  ($01,X)
  0x05FACE $FABE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FACF $FABF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAD0 $FAC0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAD1 $FAC1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAD2 $FAC2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAD3 $FAC3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAD4 $FAC4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAD5 $FAC5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAD6 $FAC6: C-----  00       BRK  
  0x05FAD7 $FAC7: C-----  00       BRK  
  0x05FAD8 $FAC8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FAD9 $FAC9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FADA $FACA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FADB $FACB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FADC $FACC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FADD $FACD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FADE $FACE: C-----  00       BRK  
  0x05FADF $FACF: C-----  00       BRK  
  0x05FAE0 $FAD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAE1 $FAD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAE2 $FAD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAE3 $FAD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAE4 $FAD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAE5 $FAD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAE6 $FAD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAE7 $FAD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAE8 $FAD8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FAE9 $FAD9: C-----  00       BRK  
  0x05FAEA $FADA: C-----  00       BRK  
  0x05FAEB $FADB: C-----  00       BRK  
  0x05FAEC $FADC: C-----  00       BRK  
  0x05FAED $FADD: C-----  00       BRK  
  0x05FAEE $FADE: C-----  00       BRK  
  0x05FAEF $FADF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FAF0 $FAE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAF1 $FAE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAF2 $FAE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAF3 $FAE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAF4 $FAE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAF5 $FAE5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FAF6 $FAE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAF7 $FAE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAF8 $FAE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAF9 $FAE9: C-----  38       SEC  
  0x05FAFA $FAEA: C-----  60       RTS  
  0x05FAFB $FAEB: C-----  C0 C0    CPY  #$C0
  0x05FAFD $FAED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FAFE $FAEE: C-----  C0 80    CPY  #$80
  0x05FB00 $FAF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB01 $FAF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB02 $FAF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB03 $FAF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB04 $FAF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB05 $FAF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB06 $FAF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB07 $FAF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB08 $FAF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB09 $FAF9: C-----  00       BRK  
  0x05FB0A $FAFA: C-----  00       BRK  
  0x05FB0B $FAFB: C-----  00       BRK  
  0x05FB0C $FAFC: C-----  00       BRK  
  0x05FB0D $FAFD: C-----  C0 80    CPY  #$80
  0x05FB0F $FAFF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FB10 $FB00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB11 $FB01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB12 $FB02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB13 $FB03: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05FB14 $FB04: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05FB15 $FB05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB16 $FB06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB17 $FB07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB18 $FB08: C-----  00       BRK  
  0x05FB19 $FB09: C-----  00       BRK  
  0x05FB1A $FB0A: C-----  1E 1E 1E ASL  $1E1E,X
  0x05FB1D $FB0D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05FB1E $FB0E: C-----  38       SEC  
  0x05FB1F $FB0F: C-----  30 FF    BMI  $FB10
  0x05FB21 $FB11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB22 $FB12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB23 $FB13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB24 $FB14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB25 $FB15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB26 $FB16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB27 $FB17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB28 $FB18: C-----  00       BRK  
  0x05FB29 $FB19: C-----  00       BRK  
  0x05FB2A $FB1A: C-----  00       BRK  
  0x05FB2B $FB1B: C-----  00       BRK  
  0x05FB2C $FB1C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FB2D $FB1D: C-----  18       CLC  
  0x05FB2E $FB1E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05FB2F $FB1F: C-----  06 FF    ASL  $FF
  0x05FB31 $FB21: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB32 $FB22: C-----  E0 E0    CPX  #$E0
  0x05FB34 $FB24: C-----  C0 C0    CPY  #$C0
  0x05FB36 $FB26: C-----  C0 C0    CPY  #$C0
  0x05FB38 $FB28: C-----  60       RTS  
  0x05FB39 $FB29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB3A $FB2A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FB3B $FB2B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FB3C $FB2C: C-----  78       SEI  
  0x05FB3D $FB2D: C-----  78       SEI  
  0x05FB3E $FB2E: C-----  70 70    BVS  $FBA0
  0x05FB40 $FB30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB41 $FB31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB42 $FB32: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FB43 $FB33: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FB44 $FB34: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FB45 $FB35: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FB46 $FB36: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FB47 $FB37: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FB48 $FB38: C-----  06 FE    ASL  $FE
  0x05FB4A $FB3A: C-----  FE FC 04 INC  $04FC,X
  0x05FB4D $FB3D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05FB4E $FB3E: C-----  08       PHP  
  0x05FB4F $FB3F: C-----  08       PHP  
  0x05FB50 $FB40: C-----  C1 C1    CMP  ($C1,X)
  0x05FB52 $FB42: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x05FB53 $FB43: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05FB54 $FB44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB55 $FB45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB56 $FB46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB57 $FB47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB58 $FB48: C-----  79 F1 F3 ADC  $F3F1,Y
  0x05FB5B $FB4B: C-----  FE F8 00 INC  $00F8,X
  0x05FB5E $FB4E: C-----  00       BRK  
  0x05FB5F $FB4F: C-----  00       BRK  
  0x05FB60 $FB50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB61 $FB51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB62 $FB52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB63 $FB53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB64 $FB54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB65 $FB55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB66 $FB56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB67 $FB57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB68 $FB58: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FB69 $FB59: C-----  00       BRK  
  0x05FB6A $FB5A: C-----  00       BRK  
  0x05FB6B $FB5B: C-----  00       BRK  
  0x05FB6C $FB5C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FB6D $FB5D: C-----  00       BRK  
  0x05FB6E $FB5E: C-----  00       BRK  
  0x05FB6F $FB5F: C-----  00       BRK  
  0x05FB70 $FB60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB71 $FB61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB72 $FB62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB73 $FB63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB74 $FB64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB75 $FB65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB76 $FB66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB77 $FB67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB78 $FB68: C-----  C0 00    CPY  #$00
  0x05FB7A $FB6A: C-----  00       BRK  
  0x05FB7B $FB6B: C-----  00       BRK  
  0x05FB7C $FB6C: C-----  00       BRK  
  0x05FB7D $FB6D: C-----  00       BRK  
  0x05FB7E $FB6E: C-----  00       BRK  
  0x05FB7F $FB6F: C-----  00       BRK  
  0x05FB80 $FB70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB81 $FB71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB82 $FB72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB83 $FB73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB84 $FB74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB85 $FB75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB86 $FB76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB87 $FB77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FB88 $FB78: C-----  00       BRK  
  0x05FB89 $FB79: C-----  00       BRK  
  0x05FB8A $FB7A: C-----  00       BRK  
  0x05FB8B $FB7B: C-----  00       BRK  
  0x05FB8C $FB7C: C-----  00       BRK  
  0x05FB8D $FB7D: C-----  01 01    ORA  ($01,X)
  0x05FB8F $FB7F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FB90 $FB80: C-----  C0 80    CPY  #$80
  0x05FB92 $FB82: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FB93 $FB83: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FB94 $FB84: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FB95 $FB85: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FB96 $FB86: C-----  00       BRK  
  0x05FB97 $FB87: C-----  00       BRK  
  0x05FB98 $FB88: C-----  F0 F0    BEQ  $FB7A
  0x05FB9A $FB8A: C-----  F0 E0    BEQ  $FB6C
  0x05FB9C $FB8C: C-----  E0 E0    CPX  #$E0
  0x05FB9E $FB8E: C-----  E0 E0    CPX  #$E0
  0x05FBA0 $FB90: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FBA1 $FB91: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FBA2 $FB92: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FBA3 $FB93: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FBA4 $FB94: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FBA5 $FB95: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FBA6 $FB96: C-----  00       BRK  
  0x05FBA7 $FB97: C-----  00       BRK  
  0x05FBA8 $FB98: C-----  18       CLC  
  0x05FBA9 $FB99: C-----  10 10    BPL  $FBAB
  0x05FBAB $FB9B: C-----  30 20    BMI  $FBBD
  0x05FBAD $FB9D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FBAE $FB9E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FBAF $FB9F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FBB0 $FBA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBB1 $FBA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBB2 $FBA2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FBB3 $FBA3: C-----  F8       SED  
  0x05FBB4 $FBA4: C-----  F0 E0    BEQ  $FB86
  0x05FBB6 $FBA6: C-----  E0 C0    CPX  #$C0
  0x05FBB8 $FBA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBB9 $FBA9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FBBA $FBAA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FBBB $FBAB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FBBC $FBAC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FBBD $FBAD: C-----  3E 7C 78 ROL  $787C,X
  0x05FBC0 $FBB0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FBC1 $FBB1: C-----  00       BRK  
  0x05FBC2 $FBB2: C-----  00       BRK  
  0x05FBC3 $FBB3: C-----  00       BRK  
  0x05FBC4 $FBB4: C-----  00       BRK  
  0x05FBC5 $FBB5: C-----  00       BRK  
  0x05FBC6 $FBB6: C-----  00       BRK  
  0x05FBC7 $FBB7: C-----  00       BRK  
  0x05FBC8 $FBB8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FBC9 $FBB9: C-----  00       BRK  
  0x05FBCA $FBBA: C-----  E0 C0    CPX  #$C0
  0x05FBCC $FBBC: C-----  00       BRK  
  0x05FBCD $FBBD: C-----  00       BRK  
  0x05FBCE $FBBE: C-----  00       BRK  
  0x05FBCF $FBBF: C-----  00       BRK  
  0x05FBD0 $FBC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBD1 $FBC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBD2 $FBC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBD3 $FBC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBD4 $FBC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBD5 $FBC5: C-----  FE FE FF INC  $FFFE,X
  0x05FBD8 $FBC8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FBD9 $FBC9: C-----  00       BRK  
  0x05FBDA $FBCA: C-----  00       BRK  
  0x05FBDB $FBCB: C-----  01 03    ORA  ($03,X)
  0x05FBDD $FBCD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FBDE $FBCE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FBDF $FBCF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FBE0 $FBD0: C-----  FE FE FC INC  $FCFE,X
  0x05FBE3 $FBD3: C-----  F9 F1 C1 SBC  $C1F1,Y
  0x05FBE6 $FBD6: C-----  00       BRK  
  0x05FBE7 $FBD7: C-----  00       BRK  
  0x05FBE8 $FBD8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FBE9 $FBD9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FBEA $FBDA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FBEB $FBDB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FBEC $FBDC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FBED $FBDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBEE $FBDE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FBEF $FBDF: C-----  F0 FF    BEQ  $FBE0
  0x05FBF1 $FBE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBF2 $FBE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBF3 $FBE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBF4 $FBE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBF5 $FBE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBF6 $FBE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBF7 $FBE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FBF8 $FBE8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05FBF9 $FBE9: C-----  08       PHP  
  0x05FBFA $FBEA: C-----  F8       SED  
  0x05FBFB $FBEB: C-----  18       CLC  
  0x05FBFC $FBEC: C-----  10 10    BPL  $FBFE
  0x05FBFE $FBEE: C-----  30 20    BMI  $FC10
  0x05FC00 $FBF0: C-----  FE FF FD INC  $FDFF,X
  0x05FC03 $FBF3: C-----  FD FF FB SBC  $FBFF,X
  0x05FC06 $FBF6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05FC07 $FBF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC08 $FBF8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FC09 $FBF9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FC0A $FBFA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FC0B $FBFB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FC0C $FBFC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FC0D $FBFD: C-----  0E 0E 1E ASL  $1E0E
  0x05FC10 $FC00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC11 $FC01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC12 $FC02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC13 $FC03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC14 $FC04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC15 $FC05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC16 $FC06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC17 $FC07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC18 $FC08: C-----  F0 60    BEQ  $FC6A
  0x05FC1A $FC0A: C-----  60       RTS  
  0x05FC1B $FC0B: C-----  41 43    EOR  ($43,X)
  0x05FC1D $FC0D: C-----  41 60    EOR  ($60,X)
  0x05FC1F $FC0F: C-----  20 FE FC JSR  $FCFE
  0x05FC22 $FC12: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FC23 $FC13: C-----  FD FD FD SBC  $FDFD,X
  0x05FC26 $FC16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC27 $FC17: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05FC28 $FC18: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FC29 $FC19: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FC2A $FC1A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FC2B $FC1B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FC2C $FC1C: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x05FC2D $FC1D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FC2E $FC1E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FC2F $FC1F: C-----  0E FF FF ASL  $FFFF
  0x05FC32 $FC22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC33 $FC23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC34 $FC24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC35 $FC25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC36 $FC26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC37 $FC27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC38 $FC28: C-----  30 1C    BMI  $FC46
  0x05FC3A $FC2A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FC3B $FC2B: C-----  00       BRK  
  0x05FC3C $FC2C: C-----  00       BRK  
  0x05FC3D $FC2D: C-----  00       BRK  
  0x05FC3E $FC2E: C-----  00       BRK  
  0x05FC3F $FC2F: C-----  00       BRK  
  0x05FC40 $FC30: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x05FC41 $FC31: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05FC42 $FC32: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05FC43 $FC33: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05FC44 $FC34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC45 $FC35: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x05FC46 $FC36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC47 $FC37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC48 $FC38: C-----  1E 7E DC ASL  $DC7E,X
  0x05FC4B $FC3B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05FC4C $FC3C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05FC4D $FC3D: C-----  38       SEC  
  0x05FC4E $FC3E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FC4F $FC3F: C-----  60       RTS  
  0x05FC50 $FC40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC51 $FC41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC52 $FC42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC53 $FC43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC54 $FC44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC55 $FC45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC56 $FC46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC57 $FC47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC58 $FC48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC59 $FC49: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FC5A $FC4A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FC5B $FC4B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FC5C $FC4C: C-----  00       BRK  
  0x05FC5D $FC4D: C-----  00       BRK  
  0x05FC5E $FC4E: C-----  00       BRK  
  0x05FC5F $FC4F: C-----  00       BRK  
  0x05FC60 $FC50: C-----  F8       SED  
  0x05FC61 $FC51: C-----  F0 C0    BEQ  $FC13
  0x05FC63 $FC53: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FC64 $FC54: C-----  00       BRK  
  0x05FC65 $FC55: C-----  00       BRK  
  0x05FC66 $FC56: C-----  00       BRK  
  0x05FC67 $FC57: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FC68 $FC58: C-----  F8       SED  
  0x05FC69 $FC59: C-----  70 FE    BVS  $FC59
  0x05FC6B $FC5B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FC6C $FC5C: C-----  F0 E0    BEQ  $FC3E
  0x05FC6E $FC5E: C-----  C0 FC    CPY  #$FC
  0x05FC70 $FC60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC71 $FC61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC72 $FC62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC73 $FC63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC74 $FC64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC75 $FC65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC76 $FC66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC77 $FC67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC78 $FC68: C-----  00       BRK  
  0x05FC79 $FC69: C-----  00       BRK  
  0x05FC7A $FC6A: C-----  00       BRK  
  0x05FC7B $FC6B: C-----  00       BRK  
  0x05FC7C $FC6C: C-----  00       BRK  
  0x05FC7D $FC6D: C-----  00       BRK  
  0x05FC7E $FC6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC7F $FC6F: C-----  00       BRK  
  0x05FC80 $FC70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC81 $FC71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC82 $FC72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC83 $FC73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC84 $FC74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC85 $FC75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC86 $FC76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC87 $FC77: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05FC88 $FC78: C-----  00       BRK  
  0x05FC89 $FC79: C-----  00       BRK  
  0x05FC8A $FC7A: C-----  00       BRK  
  0x05FC8B $FC7B: C-----  00       BRK  
  0x05FC8C $FC7C: C-----  00       BRK  
  0x05FC8D $FC7D: C-----  00       BRK  
  0x05FC8E $FC7E: C-----  7E 7E FF ROR  $FF7E,X
  0x05FC91 $FC81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC92 $FC82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC93 $FC83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC94 $FC84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC95 $FC85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC96 $FC86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC97 $FC87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FC98 $FC88: C-----  00       BRK  
  0x05FC99 $FC89: C-----  00       BRK  
  0x05FC9A $FC8A: C-----  00       BRK  
  0x05FC9B $FC8B: C-----  00       BRK  
  0x05FC9C $FC8C: C-----  00       BRK  
  0x05FC9D $FC8D: C-----  01 01    ORA  ($01,X)
  0x05FC9F $FC8F: C-----  01 FF    ORA  ($FF,X)
  0x05FCA1 $FC91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCA2 $FC92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCA3 $FC93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCA4 $FC94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCA5 $FC95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCA6 $FC96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCA7 $FC97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCA8 $FC98: C-----  40       RTI  
  0x05FCA9 $FC99: C-----  40       RTI  
  0x05FCAA $FC9A: C-----  C0 80    CPY  #$80
  0x05FCAC $FC9C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FCAD $FC9D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FCAE $FC9E: C-----  00       BRK  
  0x05FCAF $FC9F: C-----  00       BRK  
  0x05FCB0 $FCA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCB1 $FCA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCB2 $FCA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCB3 $FCA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCB4 $FCA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCB5 $FCA5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FCB6 $FCA6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FCB7 $FCA7: C-----  F8       SED  
  0x05FCB8 $FCA8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FCB9 $FCA9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FCBA $FCAA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FCBB $FCAB: C-----  06 07    ASL  $07
  0x05FCBD $FCAD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FCBE $FCAE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FCBF $FCAF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FCC0 $FCB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCC1 $FCB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCC2 $FCB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCC3 $FCB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCC4 $FCB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCC5 $FCB5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FCC6 $FCB6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FCC7 $FCB7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FCC8 $FCB8: C-----  00       BRK  
  0x05FCC9 $FCB9: C-----  00       BRK  
  0x05FCCA $FCBA: C-----  00       BRK  
  0x05FCCB $FCBB: C-----  00       BRK  
  0x05FCCC $FCBC: C-----  F8       SED  
  0x05FCCD $FCBD: C-----  F8       SED  
  0x05FCCE $FCBE: C-----  F8       SED  
  0x05FCCF $FCBF: C-----  10 FF    BPL  $FCC0
  0x05FCD1 $FCC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCD2 $FCC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCD3 $FCC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCD4 $FCC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCD5 $FCC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCD6 $FCC6: C-----  FE F0 00 INC  $00F0,X
  0x05FCD9 $FCC9: C-----  00       BRK  
  0x05FCDA $FCCA: C-----  00       BRK  
  0x05FCDB $FCCB: C-----  01 01    ORA  ($01,X)
  0x05FCDD $FCCD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FCDE $FCCE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FCDF $FCCF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FCE0 $FCD0: C-----  F8       SED  
  0x05FCE1 $FCD1: C-----  E0 C0    CPX  #$C0
  0x05FCE3 $FCD3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FCE4 $FCD4: C-----  00       BRK  
  0x05FCE5 $FCD5: C-----  00       BRK  
  0x05FCE6 $FCD6: C-----  00       BRK  
  0x05FCE7 $FCD7: C-----  00       BRK  
  0x05FCE8 $FCD8: C-----  38       SEC  
  0x05FCE9 $FCD9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FCEA $FCDA: C-----  FE F8 F0 INC  $F0F8,X
  0x05FCED $FCDD: C-----  E0 C0    CPX  #$C0
  0x05FCEF $FCDF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FCF0 $FCE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCF1 $FCE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCF2 $FCE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCF3 $FCE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCF4 $FCE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCF5 $FCE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCF6 $FCE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCF7 $FCE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FCF8 $FCE8: C-----  00       BRK  
  0x05FCF9 $FCE9: C-----  00       BRK  
  0x05FCFA $FCEA: C-----  00       BRK  
  0x05FCFB $FCEB: C-----  00       BRK  
  0x05FCFC $FCEC: C-----  00       BRK  
  0x05FCFD $FCED: C-----  00       BRK  
  0x05FCFE $FCEE: C-----  01 01    ORA  ($01,X)
  0x05FD00 $FCF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD01 $FCF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD02 $FCF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD03 $FCF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD04 $FCF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD05 $FCF5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FD06 $FCF6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FD07 $FCF7: C-----  00       BRK  
  0x05FD08 $FCF8: C-----  00       BRK  
  0x05FD09 $FCF9: C-----  00       BRK  
  0x05FD0A $FCFA: C-----  00       BRK  
  0x05FD0B $FCFB: C-----  00       BRK  
  0x05FD0C $FCFC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD0D $FCFD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD0E $FCFE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD0F $FCFF: C-----  E0 FF    CPX  #$FF
  0x05FD11 $FD01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD12 $FD02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD13 $FD03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD14 $FD04: C-----  FE FC FD INC  $FDFC,X
  0x05FD17 $FD07: C-----  F9 FF 00 SBC  $00FF,Y
  0x05FD1A $FD0A: C-----  01 03    ORA  ($03,X)
  0x05FD1C $FD0C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD1D $FD0D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD1E $FD0E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD1F $FD0F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD20 $FD10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD21 $FD11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD22 $FD12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD23 $FD13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD24 $FD14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD25 $FD15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD26 $FD16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD27 $FD17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD28 $FD18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD29 $FD19: C-----  C0 C0    CPY  #$C0
  0x05FD2B $FD1B: C-----  C0 80    CPY  #$80
  0x05FD2D $FD1D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FD2E $FD1E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FD2F $FD1F: C-----  00       BRK  
  0x05FD30 $FD20: C-----  F9 FB F3 SBC  $F3FB,Y
  0x05FD33 $FD23: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x05FD34 $FD24: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05FD35 $FD25: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05FD36 $FD26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD37 $FD27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD38 $FD28: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD39 $FD29: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FD3A $FD2A: C-----  1E 1E 3E ASL  $3E1E,X
  0x05FD3D $FD2D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05FD3E $FD2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD3F $FD2F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD40 $FD30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD41 $FD31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD42 $FD32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD43 $FD33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD44 $FD34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD45 $FD35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD46 $FD36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD47 $FD37: C-----  00       BRK  
  0x05FD48 $FD38: C-----  00       BRK  
  0x05FD49 $FD39: C-----  00       BRK  
  0x05FD4A $FD3A: C-----  00       BRK  
  0x05FD4B $FD3B: C-----  00       BRK  
  0x05FD4C $FD3C: C-----  00       BRK  
  0x05FD4D $FD3D: C-----  00       BRK  
  0x05FD4E $FD3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD4F $FD3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD50 $FD40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD51 $FD41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD52 $FD42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD53 $FD43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD54 $FD44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD55 $FD45: C-----  FE FE FC INC  $FCFE,X
  0x05FD58 $FD48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FD59 $FD49: C-----  00       BRK  
  0x05FD5A $FD4A: C-----  00       BRK  
  0x05FD5B $FD4B: C-----  01 03    ORA  ($03,X)
  0x05FD5D $FD4D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FD5E $FD4E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD5F $FD4F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD60 $FD50: C-----  F9 F1 C3 SBC  $C3F1,Y
  0x05FD63 $FD53: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x05FD64 $FD54: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FD65 $FD55: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD66 $FD56: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD67 $FD57: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD68 $FD58: C-----  F9 71 FF SBC  $FF71,Y
  0x05FD6B $FD5B: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05FD6C $FD5C: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05FD6D $FD5D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05FD6E $FD5E: C-----  C4 84    CPY  $84
  0x05FD70 $FD60: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FD71 $FD61: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FD72 $FD62: C-----  F8       SED  
  0x05FD73 $FD63: C-----  F8       SED  
  0x05FD74 $FD64: C-----  F8       SED  
  0x05FD75 $FD65: C-----  F0 F0    BEQ  $FD57
  0x05FD77 $FD67: C-----  00       BRK  
  0x05FD78 $FD68: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FD79 $FD69: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD7A $FD6A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD7B $FD6B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD7C $FD6C: C-----  1E 1E FE ASL  $FE1E,X
  0x05FD7F $FD6F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FD80 $FD70: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD81 $FD71: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD82 $FD72: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD83 $FD73: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FD84 $FD74: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FD85 $FD75: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FD86 $FD76: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FD87 $FD77: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FD88 $FD78: C-----  8C 08 0F STY  $0F08
  0x05FD8B $FD7B: C-----  18       CLC  
  0x05FD8C $FD7C: C-----  10 10    BPL  $FD8E
  0x05FD8E $FD7E: C-----  30 20    BMI  $FDA0
  0x05FD90 $FD80: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FD91 $FD81: C-----  F8       SED  
  0x05FD92 $FD82: C-----  F0 E0    BEQ  $FD64
  0x05FD94 $FD84: C-----  E0 C0    CPX  #$C0
  0x05FD96 $FD86: C-----  C0 C0    CPY  #$C0
  0x05FD98 $FD88: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FD99 $FD89: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FD9A $FD8A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FD9B $FD8B: C-----  3E 7C 78 ROL  $787C,X
  0x05FD9E $FD8E: C-----  78       SEI  
  0x05FD9F $FD8F: C-----  70 00    BVS  $FD91
  0x05FDA1 $FD91: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FDA2 $FD92: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FDA3 $FD93: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FDA4 $FD94: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FDA5 $FD95: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FDA6 $FD96: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FDA7 $FD97: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FDA8 $FD98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDA9 $FD99: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05FDAA $FD9A: C-----  06 04    ASL  $04
  0x05FDAC $FD9C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05FDAD $FD9D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05FDAE $FD9E: C-----  08       PHP  
  0x05FDAF $FD9F: C-----  08       PHP  
  0x05FDB0 $FDA0: C-----  C0 80    CPY  #$80
  0x05FDB2 $FDA2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FDB3 $FDA3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FDB4 $FDA4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FDB5 $FDA5: C-----  00       BRK  
  0x05FDB6 $FDA6: C-----  00       BRK  
  0x05FDB7 $FDA7: C-----  00       BRK  
  0x05FDB8 $FDA8: C-----  F0 F0    BEQ  $FD9A
  0x05FDBA $FDAA: C-----  F0 E0    BEQ  $FD8C
  0x05FDBC $FDAC: C-----  E0 E0    CPX  #$E0
  0x05FDBE $FDAE: C-----  E0 00    CPX  #$00
  0x05FDC0 $FDB0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FDC1 $FDB1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FDC2 $FDB2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FDC3 $FDB3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FDC4 $FDB4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FDC5 $FDB5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FDC6 $FDB6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FDC7 $FDB7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FDC8 $FDB8: C-----  18       CLC  
  0x05FDC9 $FDB9: C-----  10 10    BPL  $FDCB
  0x05FDCB $FDBB: C-----  30 20    BMI  $FDDD
  0x05FDCD $FDBD: C-----  20 60 40 JSR  $4060
  0x05FDD0 $FDC0: C-----  00       BRK  
  0x05FDD1 $FDC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDD2 $FDC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDD3 $FDC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDD4 $FDC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDD5 $FDC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDD6 $FDC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDD7 $FDC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDD8 $FDC8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FDD9 $FDC9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDDA $FDCA: C-----  00       BRK  
  0x05FDDB $FDCB: C-----  00       BRK  
  0x05FDDC $FDCC: C-----  00       BRK  
  0x05FDDD $FDCD: C-----  00       BRK  
  0x05FDDE $FDCE: C-----  00       BRK  
  0x05FDDF $FDCF: C-----  01 3F    ORA  ($3F,X)
  0x05FDE1 $FDD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDE2 $FDD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDE3 $FDD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDE4 $FDD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDE5 $FDD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDE6 $FDD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDE7 $FDD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDE8 $FDD8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FDE9 $FDD9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FDEA $FDDA: C-----  38       SEC  
  0x05FDEB $FDDB: C-----  60       RTS  
  0x05FDEC $FDDC: C-----  C0 80    CPY  #$80
  0x05FDEE $FDDE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FDEF $FDDF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FDF0 $FDE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDF1 $FDE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDF2 $FDE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDF3 $FDE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDF4 $FDE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDF5 $FDE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDF6 $FDE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDF7 $FDE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FDF8 $FDE8: C-----  01 01    ORA  ($01,X)
  0x05FDFA $FDEA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FDFB $FDEB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FDFC $FDEC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FDFD $FDED: C-----  06 04    ASL  $04
  0x05FDFF $FDEF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05FE00 $FDF0: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x05FE01 $FDF1: C-----  81 81    STA  ($81,X)
  0x05FE03 $FDF3: C-----  00       BRK  
  0x05FE04 $FDF4: C-----  00       BRK  
  0x05FE05 $FDF5: C-----  00       BRK  
  0x05FE06 $FDF6: C-----  00       BRK  
  0x05FE07 $FDF7: C-----  00       BRK  
  0x05FE08 $FDF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE09 $FDF9: C-----  F1 F1    SBC  ($F1),Y
  0x05FE0B $FDFB: C-----  E0 E0    CPX  #$E0
  0x05FE0D $FDFD: C-----  C0 80    CPY  #$80
  0x05FE0F $FDFF: C-----  00       BRK  
  0x05FE10 $FE00: C-----  F8       SED  
  0x05FE11 $FE01: C-----  F8       SED  
  0x05FE12 $FE02: C-----  F0 F1    BEQ  $FDF5
  0x05FE14 $FE04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE15 $FE05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE16 $FE06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE17 $FE07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE18 $FE08: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FE19 $FE09: C-----  1E 1E 1F ASL  $1F1E,X
  0x05FE1C $FE0C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE1D $FE0D: C-----  C0 60    CPY  #$60
  0x05FE1F $FE0F: C-----  70 3F    BVS  $FE50
  0x05FE21 $FE11: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FE22 $FE12: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE23 $FE13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE24 $FE14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE25 $FE15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE26 $FE16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE27 $FE17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE28 $FE18: C-----  30 20    BMI  $FE3A
  0x05FE2A $FE1A: C-----  60       RTS  
  0x05FE2B $FE1B: C-----  C0 00    CPY  #$00
  0x05FE2D $FE1D: C-----  00       BRK  
  0x05FE2E $FE1E: C-----  00       BRK  
  0x05FE2F $FE1F: C-----  00       BRK  
  0x05FE30 $FE20: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05FE31 $FE21: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x05FE32 $FE22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE33 $FE23: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05FE34 $FE24: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x05FE35 $FE25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE36 $FE26: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE37 $FE27: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE38 $FE28: C-----  70 70    BVS  $FE9A
  0x05FE3A $FE2A: C-----  F0 E0    BEQ  $FE0C
  0x05FE3C $FE2C: C-----  E0 E0    CPX  #$E0
  0x05FE3E $FE2E: C-----  C0 C0    CPY  #$C0
  0x05FE40 $FE30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE41 $FE31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE42 $FE32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE43 $FE33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE44 $FE34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE45 $FE35: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE46 $FE36: C-----  00       BRK  
  0x05FE47 $FE37: C-----  00       BRK  
  0x05FE48 $FE38: C-----  00       BRK  
  0x05FE49 $FE39: C-----  00       BRK  
  0x05FE4A $FE3A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FE4B $FE3B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FE4C $FE3C: C-----  C0 7F    CPY  #$7F
  0x05FE4E $FE3E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FE4F $FE3F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FE50 $FE40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE51 $FE41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE52 $FE42: C-----  FE FE FF INC  $FFFE,X
  0x05FE55 $FE45: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FE56 $FE46: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FE57 $FE47: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FE58 $FE48: C-----  01 03    ORA  ($03,X)
  0x05FE5A $FE4A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FE5B $FE4B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FE5C $FE4C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FE5D $FE4D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FE5E $FE4E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FE5F $FE4F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FE60 $FE50: C-----  00       BRK  
  0x05FE61 $FE51: C-----  00       BRK  
  0x05FE62 $FE52: C-----  00       BRK  
  0x05FE63 $FE53: C-----  00       BRK  
  0x05FE64 $FE54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE65 $FE55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE66 $FE56: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE67 $FE57: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FE68 $FE58: C-----  E0 C0    CPX  #$C0
  0x05FE6A $FE5A: C-----  C0 C0    CPY  #$C0
  0x05FE6C $FE5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE6D $FE5D: C-----  C0 E0    CPY  #$E0
  0x05FE6F $FE5F: C-----  30 F8    BMI  $FE59
  0x05FE71 $FE61: C-----  F8       SED  
  0x05FE72 $FE62: C-----  F8       SED  
  0x05FE73 $FE63: C-----  F0 F0    BEQ  $FE55
  0x05FE75 $FE65: C-----  F0 E0    BEQ  $FE47
  0x05FE77 $FE67: C-----  E0 0F    CPX  #$0F
  0x05FE79 $FE69: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FE7A $FE6A: C-----  1E 1E 1E ASL  $1E1E,X
  0x05FE7D $FE6D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05FE7E $FE6E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05FE7F $FE6F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05FE80 $FE70: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FE81 $FE71: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FE82 $FE72: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FE83 $FE73: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FE84 $FE74: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FE85 $FE75: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE86 $FE76: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE87 $FE77: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE88 $FE78: C-----  10 10    BPL  $FE8A
  0x05FE8A $FE7A: C-----  30 20    BMI  $FE9C
  0x05FE8C $FE7C: C-----  20 60 40 JSR  $4060
  0x05FE8F $FE7F: C-----  40       RTI  
  0x05FE90 $FE80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE91 $FE81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE92 $FE82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE93 $FE83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE94 $FE84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE95 $FE85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE96 $FE86: C-----  00       BRK  
  0x05FE97 $FE87: C-----  00       BRK  
  0x05FE98 $FE88: C-----  C0 80    CPY  #$80
  0x05FE9A $FE8A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FE9B $FE8B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FE9C $FE8C: C-----  00       BRK  
  0x05FE9D $FE8D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FE9E $FE8E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FE9F $FE8F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FEA0 $FE90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEA1 $FE91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEA2 $FE92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEA3 $FE93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEA4 $FE94: C-----  FE F8 00 INC  $00F8,X
  0x05FEA7 $FE97: C-----  00       BRK  
  0x05FEA8 $FE98: C-----  00       BRK  
  0x05FEA9 $FE99: C-----  00       BRK  
  0x05FEAA $FE9A: C-----  01 03    ORA  ($03,X)
  0x05FEAC $FE9C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FEAD $FE9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEAE $FE9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEAF $FE9F: C-----  FE FF FF INC  $FFFF,X
  0x05FEB2 $FEA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEB3 $FEA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEB4 $FEA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEB5 $FEA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEB6 $FEA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEB7 $FEA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEB8 $FEA8: C-----  81 81    STA  ($81,X)
  0x05FEBA $FEAA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEBB $FEAB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FEBC $FEAC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FEBD $FEAD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05FEBE $FEAE: C-----  06 04    ASL  $04
  0x05FEC0 $FEB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEC1 $FEB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEC2 $FEB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEC3 $FEB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEC4 $FEB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEC5 $FEB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEC6 $FEB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEC7 $FEB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEC8 $FEB8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FEC9 $FEB9: C-----  00       BRK  
  0x05FECA $FEBA: C-----  00       BRK  
  0x05FECB $FEBB: C-----  00       BRK  
  0x05FECC $FEBC: C-----  01 01    ORA  ($01,X)
  0x05FECE $FEBE: C-----  01 03    ORA  ($03,X)
  0x05FED0 $FEC0: C-----  C0 C0    CPY  #$C0
  0x05FED2 $FEC2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FED3 $FEC3: C-----  01 01    ORA  ($01,X)
  0x05FED5 $FEC5: C-----  01 00    ORA  ($00,X)
  0x05FED7 $FEC7: C-----  00       BRK  
  0x05FED8 $FEC8: C-----  78       SEI  
  0x05FED9 $FEC9: C-----  F8       SED  
  0x05FEDA $FECA: C-----  F0 F1    BEQ  $FEBD
  0x05FEDC $FECC: C-----  E1 C1    SBC  ($C1,X)
  0x05FEDE $FECE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FEDF $FECF: C-----  00       BRK  
  0x05FEE0 $FED0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEE1 $FED1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEE2 $FED2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEE3 $FED3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEE4 $FED4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEE5 $FED5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEE6 $FED6: C-----  00       BRK  
  0x05FEE7 $FED7: C-----  00       BRK  
  0x05FEE8 $FED8: C-----  C0 80    CPY  #$80
  0x05FEEA $FEDA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FEEB $FEDB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FEEC $FEDC: C-----  00       BRK  
  0x05FEED $FEDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FEEE $FEDE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FEEF $FEDF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FEF0 $FEE0: C-----  C0 C0    CPY  #$C0
  0x05FEF2 $FEE2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FEF3 $FEE3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FEF4 $FEE4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FEF5 $FEE5: C-----  00       BRK  
  0x05FEF6 $FEE6: C-----  00       BRK  
  0x05FEF7 $FEE7: C-----  00       BRK  
  0x05FEF8 $FEE8: C-----  78       SEI  
  0x05FEF9 $FEE9: C-----  F0 F0    BEQ  $FEDB
  0x05FEFB $FEEB: C-----  F0 E0    BEQ  $FECD
  0x05FEFD $FEED: C-----  E0 E0    CPX  #$E0
  0x05FEFF $FEEF: C-----  C0 FF    CPY  #$FF
  0x05FF01 $FEF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF02 $FEF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF03 $FEF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF04 $FEF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF05 $FEF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF06 $FEF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF07 $FEF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF08 $FEF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF09 $FEF9: C-----  00       BRK  
  0x05FF0A $FEFA: C-----  00       BRK  
  0x05FF0B $FEFB: C-----  00       BRK  
  0x05FF0C $FEFC: C-----  00       BRK  
  0x05FF0D $FEFD: C-----  3E 00 00 ROL  $0000,X
  0x05FF10 $FF00: C-----  00       BRK  
  0x05FF11 $FF01: C-----  00       BRK  
  0x05FF12 $FF02: C-----  01 07    ORA  ($07,X)
  0x05FF14 $FF04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF15 $FF05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF16 $FF06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF17 $FF07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF18 $FF08: C-----  00       BRK  
  0x05FF19 $FF09: C-----  00       BRK  
  0x05FF1A $FF0A: C-----  01 07    ORA  ($07,X)
  0x05FF1C $FF0C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FF1D $FF0D: C-----  00       BRK  
  0x05FF1E $FF0E: C-----  00       BRK  
  0x05FF1F $FF0F: C-----  00       BRK  
  0x05FF20 $FF10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF21 $FF11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF22 $FF12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF23 $FF13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF24 $FF14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF25 $FF15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF26 $FF16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF27 $FF17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF28 $FF18: C-----  C0 80    CPY  #$80
  0x05FF2A $FF1A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FF2B $FF1B: C-----  00       BRK  
  0x05FF2C $FF1C: C-----  00       BRK  
  0x05FF2D $FF1D: C-----  00       BRK  
  0x05FF2E $FF1E: C-----  00       BRK  
  0x05FF2F $FF1F: C-----  00       BRK  
  0x05FF30 $FF20: C-----  F8       SED  
  0x05FF31 $FF21: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FF32 $FF22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF33 $FF23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF34 $FF24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF35 $FF25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF36 $FF26: C-----  00       BRK  
  0x05FF37 $FF27: C-----  00       BRK  
  0x05FF38 $FF28: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05FF39 $FF29: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05FF3A $FF2A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FF3B $FF2B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05FF3C $FF2C: C-----  00       BRK  
  0x05FF3D $FF2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF3E $FF2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF3F $FF2F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF40 $FF30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF41 $FF31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF42 $FF32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF43 $FF33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF44 $FF34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF45 $FF35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF46 $FF36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF47 $FF37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF48 $FF38: C-----  00       BRK  
  0x05FF49 $FF39: C-----  00       BRK  
  0x05FF4A $FF3A: C-----  00       BRK  
  0x05FF4B $FF3B: C-----  00       BRK  
  0x05FF4C $FF3C: C-----  00       BRK  
  0x05FF4D $FF3D: C-----  00       BRK  
  0x05FF4E $FF3E: C-----  00       BRK  
  0x05FF4F $FF3F: C-----  01 FF    ORA  ($FF,X)
  0x05FF51 $FF41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF52 $FF42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF53 $FF43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF54 $FF44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF55 $FF45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF56 $FF46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF57 $FF47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF58 $FF48: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FF59 $FF49: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05FF5A $FF4A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05FF5B $FF4B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05FF5C $FF4C: C-----  18       CLC  
  0x05FF5D $FF4D: C-----  18       CLC  
  0x05FF5E $FF4E: C-----  38       SEC  
  0x05FF5F $FF4F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FF60 $FF50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF61 $FF51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF62 $FF52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF63 $FF53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF64 $FF54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF65 $FF55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF66 $FF56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF67 $FF57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF68 $FF58: C-----  F0 00    BEQ  $FF5A
  0x05FF6A $FF5A: C-----  00       BRK  
  0x05FF6B $FF5B: C-----  00       BRK  
  0x05FF6C $FF5C: C-----  00       BRK  
  0x05FF6D $FF5D: C-----  00       BRK  
  0x05FF6E $FF5E: C-----  00       BRK  
  0x05FF6F $FF5F: C-----  C0 FF    CPY  #$FF
  0x05FF71 $FF61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF72 $FF62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF73 $FF63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF74 $FF64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF75 $FF65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF76 $FF66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF77 $FF67: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05FF78 $FF68: C-----  20 60 40 JSR  $4060
  0x05FF7B $FF6B: C-----  40       RTI  
  0x05FF7C $FF6C: C-----  C0 80    CPY  #$80
  0x05FF7E $FF6E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FF7F $FF6F: C-----  F8       SED  
  0x05FF80 $FF70: C-----  00       BRK  
  0x05FF81 $FF71: C-----  00       BRK  
  0x05FF82 $FF72: C-----  00       BRK  
  0x05FF83 $FF73: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FF84 $FF74: C-----  E0 F8    CPX  #$F8
  0x05FF86 $FF76: C-----  00       BRK  
  0x05FF87 $FF77: C-----  00       BRK  
  0x05FF88 $FF78: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FF89 $FF79: C-----  00       BRK  
  0x05FF8A $FF7A: C-----  00       BRK  
  0x05FF8B $FF7B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05FF8C $FF7C: C-----  E0 F8    CPX  #$F8
  0x05FF8E $FF7E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05FF8F $FF7F: C-----  FE FF FF INC  $FFFF,X
  0x05FF92 $FF82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF93 $FF83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF94 $FF84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF95 $FF85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF96 $FF86: C-----  00       BRK  
  0x05FF97 $FF87: C-----  00       BRK  
  0x05FF98 $FF88: C-----  00       BRK  
  0x05FF99 $FF89: C-----  00       BRK  
  0x05FF9A $FF8A: C-----  00       BRK  
  0x05FF9B $FF8B: C-----  00       BRK  
  0x05FF9C $FF8C: C-----  00       BRK  
  0x05FF9D $FF8D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF9E $FF8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FF9F $FF8F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFA0 $FF90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFA1 $FF91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFA2 $FF92: C-----  FE FF FF INC  $FFFF,X
  0x05FFA5 $FF95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFA6 $FF96: C-----  00       BRK  
  0x05FFA7 $FF97: C-----  00       BRK  
  0x05FFA8 $FF98: C-----  01 03    ORA  ($03,X)
  0x05FFAA $FF9A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FFAB $FF9B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FFAC $FF9C: C-----  3E FF FC ROL  $FCFF,X
  0x05FFAF $FF9F: C-----  F9 FF FF SBC  $FFFF,Y
  0x05FFB2 $FFA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFB3 $FFA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFB4 $FFA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFB5 $FFA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFB6 $FFA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFB7 $FFA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFB8 $FFA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFB9 $FFA9: C-----  00       BRK  
  0x05FFBA $FFAA: C-----  00       BRK  
  0x05FFBB $FFAB: C-----  00       BRK  
  0x05FFBC $FFAC: C-----  00       BRK  
  0x05FFBD $FFAD: C-----  01 00    ORA  ($00,X)
  0x05FFBF $FFAF: C-----  00       BRK  
  0x05FFC0 $FFB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC1 $FFB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC2 $FFB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC3 $FFB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC4 $FFB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC5 $FFB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC6 $FFB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC7 $FFB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC8 $FFB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFC9 $FFB9: C-----  00       BRK  
  0x05FFCA $FFBA: C-----  00       BRK  
  0x05FFCB $FFBB: C-----  00       BRK  
  0x05FFCC $FFBC: C-----  00       BRK  
  0x05FFCD $FFBD: C-----  F0 00    BEQ  $FFBF
  0x05FFCF $FFBF: C-----  00       BRK  
  0x05FFD0 $FFC0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05FFD1 $FFC1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FFD2 $FFC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFD3 $FFC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFD4 $FFC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFD5 $FFC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFD6 $FFC6: C-----  00       BRK  
  0x05FFD7 $FFC7: C-----  00       BRK  
  0x05FFD8 $FFC8: C-----  F0 E0    BEQ  $FFAA
  0x05FFDA $FFCA: C-----  C0 80    CPY  #$80
  0x05FFDC $FFCC: C-----  00       BRK  
  0x05FFDD $FFCD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFDE $FFCE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05FFDF $FFCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFE0 $FFD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFE1 $FFD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFE2 $FFD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFE3 $FFD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFE4 $FFD4: C-----  FE FC 00 INC  $00FC,X
  0x05FFE7 $FFD7: C-----  00       BRK  
  0x05FFE8 $FFD8: C-----  00       BRK  
  0x05FFE9 $FFD9: C-----  00       BRK  
  0x05FFEA $FFDA: C-----  01 03    ORA  ($03,X)
  0x05FFEC $FFDC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FFED $FFDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFEE $FFDE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFEF $FFDF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFF0 $FFE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFF1 $FFE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFF2 $FFE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFF3 $FFE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFF4 $FFE4: C-----  FE FC FC INC  $FCFC,X
  0x05FFF7 $FFE7: C-----  F8       SED  
  0x05FFF8 $FFE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05FFF9 $FFE9: C-----  00       BRK  
  0x05FFFA $FFEA: C-----  01 03    ORA  ($03,X)
  0x05FFFC $FFEC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FFFD $FFED: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05FFFE $FFEE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05FFFF $FFEF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x060000 $FFF0: C-----  F0 E0    BEQ  $FFD2
  0x060002 $FFF2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x060003 $FFF3: C-----  00       BRK  
  0x060004 $FFF4: C-----  00       BRK  
  0x060005 $FFF5: C-----  00       BRK  
  0x060006 $FFF6: C-----  00       BRK  
  0x060007 $FFF7: C-----  00       BRK  
  0x060008 $FFF8: C-----  F0 E0    BEQ  $FFDA
  0x06000A $FFFA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x06000B $FFFB: C-----  F8       SED  
  0x06000C $FFFC: C-----  E0 C0    CPX  #$C0
  0x06000E $FFFE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x06000F $FFFF: C-----  00       BRK  