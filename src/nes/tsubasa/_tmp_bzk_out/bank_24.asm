; ===== MMC3 Bank 24 =====
; ROM: 0x030010-0x03200F
; CPU: $8000-$9FFF
; CDL: code=2774 data=4686 unaccessed=732

  0x030010 $8000: C-----  4C 0F 80 JMP  $800F
  0x030013 $8003: C-----  4C F8 86 JMP  $86F8
  0x030016 $8006: C-----  4C 79 87 JMP  $8779
  0x030019 $8009: C-----  4C E6 87 JMP  $87E6
  0x03001C $800C: C-----  4C 51 88 JMP  $8851
  0x03001F $800F: C-----  2C 3F 06 BIT  $063F
  0x030022 $8012: C-----  10 03    BPL  $8017
  0x030024 $8014: C-----  4C 12 C5 JMP  $C512
  0x030027 $8017: C-----  A9 20    LDA  #$20
  0x030029 $8019: C-----  85 5F    STA  $5F
  0x03002B $801B: C-----  A9 92    LDA  #$92
  0x03002D $801D: C-----  85 60    STA  $60
  0x03002F $801F: C-----  AD EA 05 LDA  $05EA
  0x030032 $8022: C-----  0A       ASL  A
  0x030033 $8023: C-----  90 02    BCC  $8027
  0x030035 $8025: C-----  E6 60    INC  $60
  0x030037 $8027: C-----  A8       TAY  
  0x030038 $8028: C-----  B1 5F    LDA  ($5F),Y
  0x03003A $802A: C-----  AA       TAX  
  0x03003B $802B: C-----  C8       INY  
  0x03003C $802C: C-----  B1 5F    LDA  ($5F),Y
  0x03003E $802E: C-----  85 60    STA  $60
  0x030040 $8030: C-----  86 5F    STX  $5F
  0x030042 $8032: C-----  A9 00    LDA  #$00
  0x030044 $8034: C-----  8D E9 05 STA  $05E9
  0x030047 $8037: C-----  8D E5 05 STA  $05E5
  0x03004A $803A: C-----  8D E4 05 STA  $05E4
  0x03004D $803D: C-----  8D F4 05 STA  $05F4
  0x030050 $8040: C-----  A9 01    LDA  #$01
  0x030052 $8042: C-----  8D E3 05 STA  $05E3
  0x030055 $8045: C-----  A9 01    LDA  #$01
  0x030057 $8047: C-----  20 15 C5 JSR  $C515
  0x03005A $804A: C-----  20 53 80 JSR  $8053
  0x03005D $804D: C-----  20 60 C5 JSR  $C560
  0x030060 $8050: C-----  4C 45 80 JMP  $8045
  0x030063 $8053: C-----  AD E3 05 LDA  $05E3
  0x030066 $8056: C-----  D0 01    BNE  $8059
  0x030068 $8058: C-----  60       RTS  
  0x030069 $8059: C-----  AD E9 05 LDA  $05E9
  0x03006C $805C: C-----  F0 04    BEQ  $8062
  0x03006E $805E: C-----  CE E9 05 DEC  $05E9
  0x030071 $8061: C-----  60       RTS  
  0x030072 $8062: C-----  AD E4 05 LDA  $05E4
  0x030075 $8065: C-----  20 09 C5 JSR  $C509
  0x030078 $8068: -D0-I-  .byte $6E ; <indirect ref>
  0x030079 $8069: -D0-I-  .byte $80 ; <indirect ref>
  0x03007A $806A: -D0-I-  .byte $18 ; <indirect ref>
  0x03007B $806B: -D0-I-  .byte $82 ; <indirect ref>
  0x03007C $806C: -D0-I-  .byte $F2 ; <indirect ref>
  0x03007D $806D: -D0-I-  .byte $82 ; <indirect ref>
  0x03007E $806E: C--J--  AC E5 05 LDY  $05E5
  0x030081 $8071: C-----  EE E5 05 INC  $05E5
  0x030084 $8074: C-----  B1 5F    LDA  ($5F),Y
  0x030086 $8076: C-----  C9 F0    CMP  #$F0
  0x030088 $8078: C-----  90 06    BCC  $8080
  0x03008A $807A: C-----  20 87 80 JSR  $8087
  0x03008D $807D: C-----  4C 6E 80 JMP  $806E
  0x030090 $8080: C-----  8D E9 05 STA  $05E9
  0x030093 $8083: C-----  EE E4 05 INC  $05E4
  0x030096 $8086: C-----  60       RTS  
  0x030097 $8087: C-----  29 0F    AND  #$0F
  0x030099 $8089: C-----  20 09 C5 JSR  $C509
  0x03009C $808C: -D0-I-  .byte $98 ; <indirect ref>
  0x03009D $808D: -D0-I-  .byte $80 ; <indirect ref>
  0x03009E $808E: ------  .byte $A0
  0x03009F $808F: ------  .byte $80
  0x0300A0 $8090: -D0-I-  .byte $B5 ; <indirect ref>
  0x0300A1 $8091: -D0-I-  .byte $80 ; <indirect ref>
  0x0300A2 $8092: -D0-I-  .byte $B8 ; <indirect ref>
  0x0300A3 $8093: -D0-I-  .byte $80 ; <indirect ref>
  0x0300A4 $8094: -D0-I-  .byte $CB ; <indirect ref>
  0x0300A5 $8095: -D0-I-  .byte $80 ; <indirect ref>
  0x0300A6 $8096: -D0-I-  .byte $FD ; <indirect ref>
  0x0300A7 $8097: -D0-I-  .byte $81 ; <indirect ref>
  0x0300A8 $8098: C--J--  A9 00    LDA  #$00
  0x0300AA $809A: C-----  8D E3 05 STA  $05E3
  0x0300AD $809D: C-----  68       PLA  
  0x0300AE $809E: C-----  68       PLA  
  0x0300AF $809F: C-----  60       RTS  
  0x0300B0 $80A0: ------  .byte $A9
  0x0300B1 $80A1: ------  .byte $01
  0x0300B2 $80A2: ------  .byte $20
  0x0300B3 $80A3: ------  .byte $15
  0x0300B4 $80A4: ------  .byte $C5
  0x0300B5 $80A5: ------  .byte $AD
  0x0300B6 $80A6: ------  .byte $1C
  0x0300B7 $80A7: ------  .byte $00
  0x0300B8 $80A8: ------  .byte $10
  0x0300B9 $80A9: ------  .byte $F6
  0x0300BA $80AA: ------  .byte $A9
  0x0300BB $80AB: ------  .byte $00
  0x0300BC $80AC: ------  .byte $8D
  0x0300BD $80AD: ------  .byte $E9
  0x0300BE $80AE: ------  .byte $05
  0x0300BF $80AF: ------  .byte $EE
  0x0300C0 $80B0: ------  .byte $E4
  0x0300C1 $80B1: ------  .byte $05
  0x0300C2 $80B2: ------  .byte $68
  0x0300C3 $80B3: ------  .byte $68
  0x0300C4 $80B4: ------  .byte $60
  0x0300C5 $80B5: C--J--  4C 2D C5 JMP  $C52D
  0x0300C8 $80B8: C--J--  AC E5 05 LDY  $05E5
  0x0300CB $80BB: C-----  B1 5F    LDA  ($5F),Y
  0x0300CD $80BD: C-----  AA       TAX  
  0x0300CE $80BE: C-----  C8       INY  
  0x0300CF $80BF: C-----  B1 5F    LDA  ($5F),Y
  0x0300D1 $80C1: C-----  85 60    STA  $60
  0x0300D3 $80C3: C-----  86 5F    STX  $5F
  0x0300D5 $80C5: C-----  A9 00    LDA  #$00
  0x0300D7 $80C7: C-----  8D E5 05 STA  $05E5
  0x0300DA $80CA: C-----  60       RTS  
  0x0300DB $80CB: C--J--  AC E5 05 LDY  $05E5
  0x0300DE $80CE: C-----  B1 5F    LDA  ($5F),Y
  0x0300E0 $80D0: C-----  20 EA 80 JSR  $80EA
  0x0300E3 $80D3: C-----  8A       TXA  
  0x0300E4 $80D4: C-----  0A       ASL  A
  0x0300E5 $80D5: C-----  38       SEC  
  0x0300E6 $80D6: C-----  6D E5 05 ADC  $05E5
  0x0300E9 $80D9: C-----  A8       TAY  
  0x0300EA $80DA: C-----  B1 5F    LDA  ($5F),Y
  0x0300EC $80DC: C-----  AA       TAX  
  0x0300ED $80DD: C-----  C8       INY  
  0x0300EE $80DE: C-----  B1 5F    LDA  ($5F),Y
  0x0300F0 $80E0: C-----  86 5F    STX  $5F
  0x0300F2 $80E2: C-----  85 60    STA  $60
  0x0300F4 $80E4: C-----  A9 00    LDA  #$00
  0x0300F6 $80E6: C-----  8D E5 05 STA  $05E5
  0x0300F9 $80E9: C-----  60       RTS  
  0x0300FA $80EA: C-----  20 09 C5 JSR  $C509
  0x0300FD $80ED: ------  .byte $FD
  0x0300FE $80EE: ------  .byte $80
  0x0300FF $80EF: -D0-I-  .byte $06 ; <indirect ref>
  0x030100 $80F0: -D0-I-  .byte $81 ; <indirect ref>
  0x030101 $80F1: -D0-I-  .byte $0E ; <indirect ref>
  0x030102 $80F2: -D0-I-  .byte $81 ; <indirect ref>
  0x030103 $80F3: -D0-I-  .byte $1E ; <indirect ref>
  0x030104 $80F4: -D0-I-  .byte $81 ; <indirect ref>
  0x030105 $80F5: -D0-I-  .byte $22 ; <indirect ref>
  0x030106 $80F6: -D0-I-  .byte $81 ; <indirect ref>
  0x030107 $80F7: -D0-I-  .byte $38 ; <indirect ref>
  0x030108 $80F8: -D0-I-  .byte $81 ; <indirect ref>
  0x030109 $80F9: -D0-I-  .byte $CE ; <indirect ref>
  0x03010A $80FA: -D0-I-  .byte $81 ; <indirect ref>
  0x03010B $80FB: -D0-I-  .byte $E4 ; <indirect ref>
  0x03010C $80FC: -D0-I-  .byte $81 ; <indirect ref>
  0x03010D $80FD: ------  .byte $A2
  0x03010E $80FE: ------  .byte $00
  0x03010F $80FF: ------  .byte $2C
  0x030110 $8100: ------  .byte $3C
  0x030111 $8101: ------  .byte $04
  0x030112 $8102: ------  .byte $10
  0x030113 $8103: ------  .byte $01
  0x030114 $8104: ------  .byte $E8
  0x030115 $8105: ------  .byte $60
  0x030116 $8106: C--J--  AE FB 05 LDX  $05FB
  0x030119 $8109: C-----  F0 02    BEQ  $810D
  0x03011B $810B: C-----  A2 01    LDX  #$01
  0x03011D $810D: C-----  60       RTS  
  0x03011E $810E: C--J--  AE 00 06 LDX  $0600
  0x030121 $8111: C-----  F0 08    BEQ  $811B
  0x030123 $8113: C-----  CA       DEX  
  0x030124 $8114: C-----  E0 03    CPX  #$03
  0x030126 $8116: C-----  90 02    BCC  $811A
  0x030128 $8118: C-----  A2 02    LDX  #$02
  0x03012A $811A: C-----  60       RTS  
  0x03012B $811B: ------  .byte $A2
  0x03012C $811C: ------  .byte $03
  0x03012D $811D: ------  .byte $60
  0x03012E $811E: C--J--  AE 29 06 LDX  $0629
  0x030131 $8121: C-----  60       RTS  
  0x030132 $8122: C--J--  A2 00    LDX  #$00
  0x030134 $8124: C-----  A5 26    LDA  $26
  0x030136 $8126: C-----  DD 31 81 CMP  $8131,X
  0x030139 $8129: C-----  90 05    BCC  $8130
  0x03013B $812B: C-----  F0 03    BEQ  $8130
  0x03013D $812D: C-----  E8       INX  
  0x03013E $812E: C-----  D0 F6    BNE  $8126
  0x030140 $8130: C-----  60       RTS  
  0x030141 $8131: -D0---  .byte $05
  0x030142 $8132: -D0---  .byte $0B
  0x030143 $8133: -D0---  .byte $0F
  0x030144 $8134: -D0---  .byte $15
  0x030145 $8135: -D0---  .byte $16
  0x030146 $8136: -D0---  .byte $1A
  0x030147 $8137: -D0---  .byte $21
  0x030148 $8138: C--J--  A5 27    LDA  $27
  0x03014A $813A: C-----  20 09 C5 JSR  $C509
  0x03014D $813D: -D0-I-  .byte $47 ; <indirect ref>
  0x03014E $813E: -D0-I-  .byte $81 ; <indirect ref>
  0x03014F $813F: -D0-I-  .byte $56 ; <indirect ref>
  0x030150 $8140: -D0-I-  .byte $81 ; <indirect ref>
  0x030151 $8141: -D0-I-  .byte $47 ; <indirect ref>
  0x030152 $8142: -D0-I-  .byte $81 ; <indirect ref>
  0x030153 $8143: -D0-I-  .byte $56 ; <indirect ref>
  0x030154 $8144: -D0-I-  .byte $81 ; <indirect ref>
  0x030155 $8145: -D0-I-  .byte $56 ; <indirect ref>
  0x030156 $8146: -D0-I-  .byte $81 ; <indirect ref>
  0x030157 $8147: C--J--  A2 02    LDX  #$02
  0x030159 $8149: C-----  AD 28 00 LDA  $0028
  0x03015C $814C: C-----  CD 29 00 CMP  $0029
  0x03015F $814F: C-----  F0 04    BEQ  $8155
  0x030161 $8151: C-----  CA       DEX  
  0x030162 $8152: C-----  90 01    BCC  $8155
  0x030164 $8154: C-----  CA       DEX  
  0x030165 $8155: C-----  60       RTS  
  0x030166 $8156: C--J--  A4 26    LDY  $26
  0x030168 $8158: C-----  B9 AC 81 LDA  $81AC,Y
  0x03016B $815B: C-----  85 49    STA  $49
  0x03016D $815D: C-----  AD 28 00 LDA  $0028
  0x030170 $8160: C-----  CD 29 00 CMP  $0029
  0x030173 $8163: C-----  D0 26    BNE  $818B
  0x030175 $8165: C-----  A2 0D    LDX  #$0D
  0x030177 $8167: C-----  AD 27 00 LDA  $0027
  0x03017A $816A: C-----  C9 01    CMP  #$01
  0x03017C $816C: C-----  F0 10    BEQ  $817E
  0x03017E $816E: C-----  24 49    BIT  $49
  0x030180 $8170: C-----  50 02    BVC  $8174
  0x030182 $8172: C-----  E8       INX  
  0x030183 $8173: C-----  60       RTS  
  0x030184 $8174: ------  .byte $AD
  0x030185 $8175: ------  .byte $2B
  0x030186 $8176: ------  .byte $00
  0x030187 $8177: ------  .byte $C9
  0x030188 $8178: ------  .byte $23
  0x030189 $8179: ------  .byte $D0
  0x03018A $817A: ------  .byte $02
  0x03018B $817B: ------  .byte $A2
  0x03018C $817C: ------  .byte $0F
  0x03018D $817D: ------  .byte $60
  0x03018E $817E: C-----  A2 0C    LDX  #$0C
  0x030190 $8180: C-----  24 49    BIT  $49
  0x030192 $8182: C-----  30 06    BMI  $818A
  0x030194 $8184: C-----  E8       INX  
  0x030195 $8185: C-----  24 49    BIT  $49
  0x030197 $8187: C-----  50 01    BVC  $818A
  0x030199 $8189: C-----  E8       INX  
  0x03019A $818A: C-----  60       RTS  
  0x03019B $818B: C-----  B0 0A    BCS  $8197
  0x03019D $818D: C-----  A2 0A    LDX  #$0A
  0x03019F $818F: C-----  A5 27    LDA  $27
  0x0301A1 $8191: C-----  C9 04    CMP  #$04
  0x0301A3 $8193: C-----  D0 01    BNE  $8196
  0x0301A5 $8195: C-----  E8       INX  
  0x0301A6 $8196: C-----  60       RTS  
  0x0301A7 $8197: C-----  A5 49    LDA  $49
  0x0301A9 $8199: C-----  29 07    AND  #$07
  0x0301AB $819B: C-----  18       CLC  
  0x0301AC $819C: C-----  69 03    ADC  #$03
  0x0301AE $819E: C-----  AA       TAX  
  0x0301AF $819F: C-----  E0 03    CPX  #$03
  0x0301B1 $81A1: C-----  D0 08    BNE  $81AB
  0x0301B3 $81A3: C-----  A5 27    LDA  $27
  0x0301B5 $81A5: C-----  C9 03    CMP  #$03
  0x0301B7 $81A7: C-----  D0 02    BNE  $81AB
  0x0301B9 $81A9: C-----  A2 09    LDX  #$09
  0x0301BB $81AB: C-----  60       RTS  
  0x0301BC $81AC: -D0---  .byte $C0
  0x0301BD $81AD: -D0---  .byte $C0
  0x0301BE $81AE: -D0---  .byte $C0
  0x0301BF $81AF: -D0---  .byte $C0
  0x0301C0 $81B0: -D0---  .byte $C1
  0x0301C1 $81B1: -D0---  .byte $C2
  0x0301C2 $81B2: -D0---  .byte $40
  0x0301C3 $81B3: -D0---  .byte $40
  0x0301C4 $81B4: -D0---  .byte $40
  0x0301C5 $81B5: -D0---  .byte $40
  0x0301C6 $81B6: -D0---  .byte $41
  0x0301C7 $81B7: -D0---  .byte $C2
  0x0301C8 $81B8: -D0---  .byte $C0
  0x0301C9 $81B9: -D0---  .byte $C0
  0x0301CA $81BA: -D0---  .byte $C1
  0x0301CB $81BB: -D0---  .byte $C3
  0x0301CC $81BC: -D0---  .byte $C0
  0x0301CD $81BD: -D0---  .byte $C0
  0x0301CE $81BE: -D0---  .byte $C0
  0x0301CF $81BF: -D0---  .byte $C0
  0x0301D0 $81C0: -D0---  .byte $C1
  0x0301D1 $81C1: -D0---  .byte $C2
  0x0301D2 $81C2: -D0---  .byte $00
  0x0301D3 $81C3: -D0---  .byte $C0
  0x0301D4 $81C4: -D0---  .byte $C0
  0x0301D5 $81C5: -D0---  .byte $C0
  0x0301D6 $81C6: -D0---  .byte $C0
  0x0301D7 $81C7: -D0---  .byte $C0
  0x0301D8 $81C8: -D0---  .byte $C0
  0x0301D9 $81C9: -D0---  .byte $C0
  0x0301DA $81CA: -D0---  .byte $C4
  0x0301DB $81CB: -D0---  .byte $C5
  0x0301DC $81CC: -D0---  .byte $86
  0x0301DD $81CD: ------  .byte $C6
  0x0301DE $81CE: C--J--  AD 16 06 LDA  $0616
  0x0301E1 $81D1: C-----  4A       LSR  A
  0x0301E2 $81D2: C-----  A2 00    LDX  #$00
  0x0301E4 $81D4: C-----  C9 01    CMP  #$01
  0x0301E6 $81D6: C-----  90 0B    BCC  $81E3
  0x0301E8 $81D8: C-----  E8       INX  
  0x0301E9 $81D9: C-----  C9 05    CMP  #$05
  0x0301EB $81DB: C-----  90 06    BCC  $81E3
  0x0301ED $81DD: C-----  E8       INX  
  0x0301EE $81DE: C-----  C9 06    CMP  #$06
  0x0301F0 $81E0: C-----  90 01    BCC  $81E3
  0x0301F2 $81E2: C-----  E8       INX  
  0x0301F3 $81E3: C-----  60       RTS  
  0x0301F4 $81E4: C--J--  AD FB 05 LDA  $05FB
  0x0301F7 $81E7: C-----  49 0B    EOR  #$0B
  0x0301F9 $81E9: C-----  20 0C C5 JSR  $C50C
  0x0301FC $81EC: C-----  A2 00    LDX  #$00
  0x0301FE $81EE: C-----  A0 07    LDY  #$07
  0x030200 $81F0: C-----  B1 34    LDA  ($34),Y
  0x030202 $81F2: C-----  C9 19    CMP  #$19
  0x030204 $81F4: C-----  90 06    BCC  $81FC
  0x030206 $81F6: C-----  E8       INX  
  0x030207 $81F7: C-----  C9 36    CMP  #$36
  0x030209 $81F9: C-----  90 01    BCC  $81FC
  0x03020B $81FB: C-----  E8       INX  
  0x03020C $81FC: C-----  60       RTS  
  0x03020D $81FD: C--J--  20 2D C5 JSR  $C52D
  0x030210 $8200: C-----  A9 0D    LDA  #$0D
  0x030212 $8202: C-----  8D F3 05 STA  $05F3
  0x030215 $8205: C-----  A9 80    LDA  #$80
  0x030217 $8207: C-----  8D F4 05 STA  $05F4
  0x03021A $820A: C-----  AC E5 05 LDY  $05E5
  0x03021D $820D: C-----  B1 5F    LDA  ($5F),Y
  0x03021F $820F: C-----  8D E9 05 STA  $05E9
  0x030222 $8212: C-----  EE E5 05 INC  $05E5
  0x030225 $8215: C-----  68       PLA  
  0x030226 $8216: C-----  68       PLA  
  0x030227 $8217: C-----  60       RTS  
  0x030228 $8218: C--J--  AC E5 05 LDY  $05E5
  0x03022B $821B: C-----  B1 5F    LDA  ($5F),Y
  0x03022D $821D: C-----  C9 90    CMP  #$90
  0x03022F $821F: C-----  B0 0D    BCS  $822E
  0x030231 $8221: C-----  29 0F    AND  #$0F
  0x030233 $8223: C-----  8D F3 05 STA  $05F3
  0x030236 $8226: C-----  A9 80    LDA  #$80
  0x030238 $8228: C-----  8D F4 05 STA  $05F4
  0x03023B $822B: C-----  4C 34 82 JMP  $8234
  0x03023E $822E: C-----  20 2D C5 JSR  $C52D
  0x030241 $8231: C-----  AC E5 05 LDY  $05E5
  0x030244 $8234: C-----  B1 5F    LDA  ($5F),Y
  0x030246 $8236: C-----  4A       LSR  A
  0x030247 $8237: C-----  4A       LSR  A
  0x030248 $8238: C-----  4A       LSR  A
  0x030249 $8239: C-----  4A       LSR  A
  0x03024A $823A: C-----  AA       TAX  
  0x03024B $823B: C-----  BD B8 86 LDA  $86B8,X
  0x03024E $823E: C-----  8D E6 05 STA  $05E6
  0x030251 $8241: C-----  8A       TXA  
  0x030252 $8242: C-----  0A       ASL  A
  0x030253 $8243: C-----  48       PHA  
  0x030254 $8244: C-----  AA       TAX  
  0x030255 $8245: C-----  BD C2 8D LDA  $8DC2,X
  0x030258 $8248: C-----  85 61    STA  $61
  0x03025A $824A: C-----  BD C3 8D LDA  $8DC3,X
  0x03025D $824D: C-----  85 62    STA  $62
  0x03025F $824F: C-----  A0 00    LDY  #$00
  0x030261 $8251: C-----  B1 61    LDA  ($61),Y
  0x030263 $8253: C-----  48       PHA  
  0x030264 $8254: C-----  C8       INY  
  0x030265 $8255: C-----  B1 61    LDA  ($61),Y
  0x030267 $8257: C-----  48       PHA  
  0x030268 $8258: C-----  C8       INY  
  0x030269 $8259: C-----  B1 61    LDA  ($61),Y
  0x03026B $825B: C-----  8D E7 05 STA  $05E7
  0x03026E $825E: C-----  C8       INY  
  0x03026F $825F: C-----  A9 06    LDA  #$06
  0x030271 $8261: C-----  8D E8 05 STA  $05E8
  0x030274 $8264: C-----  A9 01    LDA  #$01
  0x030276 $8266: C-----  20 15 C5 JSR  $C515
  0x030279 $8269: C-----  AD 15 05 LDA  $0515
  0x03027C $826C: C-----  D0 F6    BNE  $8264
  0x03027E $826E: C-----  A9 01    LDA  #$01
  0x030280 $8270: C-----  8D 15 05 STA  $0515
  0x030283 $8273: C-----  A9 02    LDA  #$02
  0x030285 $8275: C-----  85 3B    STA  $3B
  0x030287 $8277: C-----  A2 00    LDX  #$00
  0x030289 $8279: C-----  AD E7 05 LDA  $05E7
  0x03028C $827C: C-----  9D A5 04 STA  $04A5,X
  0x03028F $827F: C-----  68       PLA  
  0x030290 $8280: C-----  9D A7 04 STA  $04A7,X
  0x030293 $8283: C-----  68       PLA  
  0x030294 $8284: C-----  9D A6 04 STA  $04A6,X
  0x030297 $8287: C-----  18       CLC  
  0x030298 $8288: C-----  69 20    ADC  #$20
  0x03029A $828A: C-----  48       PHA  
  0x03029B $828B: C-----  BD A7 04 LDA  $04A7,X
  0x03029E $828E: C-----  69 00    ADC  #$00
  0x0302A0 $8290: C-----  48       PHA  
  0x0302A1 $8291: C-----  E8       INX  
  0x0302A2 $8292: C-----  E8       INX  
  0x0302A3 $8293: C-----  E8       INX  
  0x0302A4 $8294: C-----  B1 61    LDA  ($61),Y
  0x0302A6 $8296: C-----  10 11    BPL  $82A9
  0x0302A8 $8298: C-----  29 7F    AND  #$7F
  0x0302AA $829A: C-----  85 3A    STA  $3A
  0x0302AC $829C: C-----  C8       INY  
  0x0302AD $829D: C-----  A9 00    LDA  #$00
  0x0302AF $829F: C-----  9D A5 04 STA  $04A5,X
  0x0302B2 $82A2: C-----  E8       INX  
  0x0302B3 $82A3: C-----  C6 3A    DEC  $3A
  0x0302B5 $82A5: C-----  D0 F8    BNE  $829F
  0x0302B7 $82A7: C-----  F0 0E    BEQ  $82B7
  0x0302B9 $82A9: C-----  85 3A    STA  $3A
  0x0302BB $82AB: C-----  C8       INY  
  0x0302BC $82AC: C-----  B1 61    LDA  ($61),Y
  0x0302BE $82AE: C-----  9D A5 04 STA  $04A5,X
  0x0302C1 $82B1: C-----  C8       INY  
  0x0302C2 $82B2: C-----  E8       INX  
  0x0302C3 $82B3: C-----  C6 3A    DEC  $3A
  0x0302C5 $82B5: C-----  D0 F5    BNE  $82AC
  0x0302C7 $82B7: C-----  8A       TXA  
  0x0302C8 $82B8: C-----  38       SEC  
  0x0302C9 $82B9: C-----  E9 03    SBC  #$03
  0x0302CB $82BB: C-----  CD A5 04 CMP  $04A5
  0x0302CE $82BE: C-----  F0 B9    BEQ  $8279
  0x0302D0 $82C0: C-----  90 D2    BCC  $8294
  0x0302D2 $82C2: C-----  ED A5 04 SBC  $04A5
  0x0302D5 $82C5: C-----  E9 03    SBC  #$03
  0x0302D7 $82C7: C-----  CD A5 04 CMP  $04A5
  0x0302DA $82CA: C-----  90 C8    BCC  $8294
  0x0302DC $82CC: C-----  A9 00    LDA  #$00
  0x0302DE $82CE: C-----  9D A5 04 STA  $04A5,X
  0x0302E1 $82D1: C-----  A9 80    LDA  #$80
  0x0302E3 $82D3: C-----  8D 15 05 STA  $0515
  0x0302E6 $82D6: C-----  CE E8 05 DEC  $05E8
  0x0302E9 $82D9: C-----  D0 89    BNE  $8264
  0x0302EB $82DB: C-----  68       PLA  
  0x0302EC $82DC: C-----  68       PLA  
  0x0302ED $82DD: C-----  68       PLA  
  0x0302EE $82DE: C-----  AA       TAX  
  0x0302EF $82DF: C-----  BD C8 86 LDA  $86C8,X
  0x0302F2 $82E2: C-----  8D E7 05 STA  $05E7
  0x0302F5 $82E5: C-----  BD C9 86 LDA  $86C9,X
  0x0302F8 $82E8: C-----  8D E8 05 STA  $05E8
  0x0302FB $82EB: C-----  EE E5 05 INC  $05E5
  0x0302FE $82EE: C-----  EE E4 05 INC  $05E4
  0x030301 $82F1: C-----  60       RTS  
  0x030302 $82F2: C--J--  A9 01    LDA  #$01
  0x030304 $82F4: C-----  20 15 C5 JSR  $C515
  0x030307 $82F7: C-----  AD 15 05 LDA  $0515
  0x03030A $82FA: C-----  D0 F6    BNE  $82F2
  0x03030C $82FC: C-----  A9 01    LDA  #$01
  0x03030E $82FE: C-----  8D 15 05 STA  $0515
  0x030311 $8301: C-----  AD E6 05 LDA  $05E6
  0x030314 $8304: C-----  0A       ASL  A
  0x030315 $8305: C-----  18       CLC  
  0x030316 $8306: C-----  69 06    ADC  #$06
  0x030318 $8308: C-----  A8       TAY  
  0x030319 $8309: C-----  C8       INY  
  0x03031A $830A: C-----  A2 00    LDX  #$00
  0x03031C $830C: C-----  8A       TXA  
  0x03031D $830D: C-----  9D A5 04 STA  $04A5,X
  0x030320 $8310: C-----  E8       INX  
  0x030321 $8311: C-----  88       DEY  
  0x030322 $8312: C-----  10 F9    BPL  $830D
  0x030324 $8314: C-----  AD E6 05 LDA  $05E6
  0x030327 $8317: C-----  18       CLC  
  0x030328 $8318: C-----  69 03    ADC  #$03
  0x03032A $831A: C-----  85 3A    STA  $3A
  0x03032C $831C: C-----  AA       TAX  
  0x03032D $831D: C-----  AD E6 05 LDA  $05E6
  0x030330 $8320: C-----  8D A5 04 STA  $04A5
  0x030333 $8323: C-----  9D A5 04 STA  $04A5,X
  0x030336 $8326: C-----  AD E7 05 LDA  $05E7
  0x030339 $8329: C-----  0A       ASL  A
  0x03033A $832A: C-----  A8       TAY  
  0x03033B $832B: C-----  B9 E8 86 LDA  $86E8,Y
  0x03033E $832E: C-----  8D A6 04 STA  $04A6
  0x030341 $8331: C-----  18       CLC  
  0x030342 $8332: C-----  69 20    ADC  #$20
  0x030344 $8334: C-----  9D A6 04 STA  $04A6,X
  0x030347 $8337: C-----  B9 E9 86 LDA  $86E9,Y
  0x03034A $833A: C-----  8D A7 04 STA  $04A7
  0x03034D $833D: C-----  69 00    ADC  #$00
  0x03034F $833F: C-----  9D A7 04 STA  $04A7,X
  0x030352 $8342: C-----  A9 00    LDA  #$00
  0x030354 $8344: C-----  85 3B    STA  $3B
  0x030356 $8346: C-----  AC E5 05 LDY  $05E5
  0x030359 $8349: C-----  EE E5 05 INC  $05E5
  0x03035C $834C: C-----  B1 5F    LDA  ($5F),Y
  0x03035E $834E: C-----  C9 E0    CMP  #$E0
  0x030360 $8350: C-----  90 06    BCC  $8358
  0x030362 $8352: C-----  20 5E 83 JSR  $835E
  0x030365 $8355: C-----  4C 46 83 JMP  $8346
  0x030368 $8358: C-----  20 29 86 JSR  $8629
  0x03036B $835B: C-----  4C 46 83 JMP  $8346
  0x03036E $835E: C-----  38       SEC  
  0x03036F $835F: C-----  E9 E0    SBC  #$E0
  0x030371 $8361: C-----  20 09 C5 JSR  $C509
  0x030374 $8364: -D0-I-  .byte $A4 ; <indirect ref>
  0x030375 $8365: -D0-I-  .byte $83 ; <indirect ref>
  0x030376 $8366: -D0-I-  .byte $CA ; <indirect ref>
  0x030377 $8367: -D0-I-  .byte $83 ; <indirect ref>
  0x030378 $8368: -D0-I-  .byte $E2 ; <indirect ref>
  0x030379 $8369: -D0-I-  .byte $83 ; <indirect ref>
  0x03037A $836A: -D0-I-  .byte $43 ; <indirect ref>
  0x03037B $836B: -D0-I-  .byte $84 ; <indirect ref>
  0x03037C $836C: -D0-I-  .byte $67 ; <indirect ref>
  0x03037D $836D: -D0-I-  .byte $84 ; <indirect ref>
  0x03037E $836E: -D0-I-  .byte $6D ; <indirect ref>
  0x03037F $836F: -D0-I-  .byte $84 ; <indirect ref>
  0x030380 $8370: -D0-I-  .byte $75 ; <indirect ref>
  0x030381 $8371: -D0-I-  .byte $84 ; <indirect ref>
  0x030382 $8372: -D0-I-  .byte $8D ; <indirect ref>
  0x030383 $8373: -D0-I-  .byte $84 ; <indirect ref>
  0x030384 $8374: -D0-I-  .byte $93 ; <indirect ref>
  0x030385 $8375: -D0-I-  .byte $84 ; <indirect ref>
  0x030386 $8376: -D0-I-  .byte $99 ; <indirect ref>
  0x030387 $8377: -D0-I-  .byte $84 ; <indirect ref>
  0x030388 $8378: -D0-I-  .byte $9F ; <indirect ref>
  0x030389 $8379: -D0-I-  .byte $84 ; <indirect ref>
  0x03038A $837A: -D0-I-  .byte $A5 ; <indirect ref>
  0x03038B $837B: -D0-I-  .byte $84 ; <indirect ref>
  0x03038C $837C: -D0-I-  .byte $AB ; <indirect ref>
  0x03038D $837D: -D0-I-  .byte $84 ; <indirect ref>
  0x03038E $837E: -D0-I-  .byte $CE ; <indirect ref>
  0x03038F $837F: -D0-I-  .byte $84 ; <indirect ref>
  0x030390 $8380: -D0-I-  .byte $D6 ; <indirect ref>
  0x030391 $8381: -D0-I-  .byte $84 ; <indirect ref>
  0x030392 $8382: ------  .byte $DC
  0x030393 $8383: ------  .byte $84
  0x030394 $8384: -D0-I-  .byte $DC ; <indirect ref>
  0x030395 $8385: -D0-I-  .byte $84 ; <indirect ref>
  0x030396 $8386: -D0-I-  .byte $E6 ; <indirect ref>
  0x030397 $8387: -D0-I-  .byte $84 ; <indirect ref>
  0x030398 $8388: -D0-I-  .byte $EC ; <indirect ref>
  0x030399 $8389: -D0-I-  .byte $84 ; <indirect ref>
  0x03039A $838A: -D0-I-  .byte $FB ; <indirect ref>
  0x03039B $838B: -D0-I-  .byte $84 ; <indirect ref>
  0x03039C $838C: -D0-I-  .byte $07 ; <indirect ref>
  0x03039D $838D: -D0-I-  .byte $85 ; <indirect ref>
  0x03039E $838E: -D0-I-  .byte $B1 ; <indirect ref>
  0x03039F $838F: -D0-I-  .byte $85 ; <indirect ref>
  0x0303A0 $8390: -D0-I-  .byte $B6 ; <indirect ref>
  0x0303A1 $8391: -D0-I-  .byte $85 ; <indirect ref>
  0x0303A2 $8392: -D0-I-  .byte $BB ; <indirect ref>
  0x0303A3 $8393: -D0-I-  .byte $85 ; <indirect ref>
  0x0303A4 $8394: -D0-I-  .byte $D0 ; <indirect ref>
  0x0303A5 $8395: -D0-I-  .byte $85 ; <indirect ref>
  0x0303A6 $8396: ------  .byte $D5
  0x0303A7 $8397: ------  .byte $85
  0x0303A8 $8398: ------  .byte $D5
  0x0303A9 $8399: ------  .byte $85
  0x0303AA $839A: ------  .byte $D5
  0x0303AB $839B: ------  .byte $85
  0x0303AC $839C: -D0-I-  .byte $D6 ; <indirect ref>
  0x0303AD $839D: -D0-I-  .byte $85 ; <indirect ref>
  0x0303AE $839E: ------  .byte $FD
  0x0303AF $839F: ------  .byte $85
  0x0303B0 $83A0: ------  .byte $FE
  0x0303B1 $83A1: ------  .byte $85
  0x0303B2 $83A2: ------  .byte $21
  0x0303B3 $83A3: ------  .byte $86
  0x0303B4 $83A4: C--J--  AD 3B 04 LDA  $043B
  0x0303B7 $83A7: C-----  C9 01    CMP  #$01
  0x0303B9 $83A9: C-----  D0 07    BNE  $83B2
  0x0303BB $83AB: C-----  2C 28 06 BIT  $0628
  0x0303BE $83AE: C-----  10 02    BPL  $83B2
  0x0303C0 $83B0: ------  .byte $A9
  0x0303C1 $83B1: ------  .byte $0A
  0x0303C2 $83B2: C-----  AA       TAX  
  0x0303C3 $83B3: C-----  AD 3C 04 LDA  $043C
  0x0303C6 $83B6: C-----  29 7F    AND  #$7F
  0x0303C8 $83B8: C-----  18       CLC  
  0x0303C9 $83B9: C-----  7D BF 83 ADC  $83BF,X
  0x0303CC $83BC: C-----  4C 3C 86 JMP  $863C
  0x0303CF $83BF: -D0---  .byte $9A
  0x0303D0 $83C0: -D0---  .byte $C4
  0x0303D1 $83C1: -D0---  .byte $BD
  0x0303D2 $83C2: -D0---  .byte $C8
  0x0303D3 $83C3: -D0---  .byte $D9
  0x0303D4 $83C4: -D0---  .byte $DA
  0x0303D5 $83C5: -D0---  .byte $DB
  0x0303D6 $83C6: -D0---  .byte $EC
  0x0303D7 $83C7: -D0---  .byte $EC
  0x0303D8 $83C8: -D0---  .byte $EC
  0x0303D9 $83C9: -D0---  .byte $EB
  0x0303DA $83CA: C--J--  AD 3D 04 LDA  $043D
  0x0303DD $83CD: C-----  29 1F    AND  #$1F
  0x0303DF $83CF: C-----  AA       TAX  
  0x0303E0 $83D0: C-----  AD 3E 04 LDA  $043E
  0x0303E3 $83D3: C-----  29 7F    AND  #$7F
  0x0303E5 $83D5: C-----  18       CLC  
  0x0303E6 $83D6: C-----  7D DC 83 ADC  $83DC,X
  0x0303E9 $83D9: C-----  4C 3C 86 JMP  $863C
  0x0303EC $83DC: -D0---  .byte $CD
  0x0303ED $83DD: -D0---  .byte $D1
  0x0303EE $83DE: ------  .byte $D7
  0x0303EF $83DF: -D0---  .byte $DB
  0x0303F0 $83E0: ------  .byte $DD
  0x0303F1 $83E1: ------  .byte $DF
  0x0303F2 $83E2: C--J--  AD 3C 04 LDA  $043C
  0x0303F5 $83E5: C-----  10 2C    BPL  $8413
  0x0303F7 $83E7: C-----  29 7F    AND  #$7F
  0x0303F9 $83E9: C-----  F0 10    BEQ  $83FB
  0x0303FB $83EB: C-----  AE 3B 04 LDX  $043B
  0x0303FE $83EE: C-----  D0 0B    BNE  $83FB
  0x030400 $83F0: C-----  C9 03    CMP  #$03
  0x030402 $83F2: C-----  B0 1F    BCS  $8413
  0x030404 $83F4: C-----  AA       TAX  
  0x030405 $83F5: C-----  BD 40 84 LDA  $8440,X
  0x030408 $83F8: C-----  4C 10 84 JMP  $8410
  0x03040B $83FB: C-----  AE 3B 04 LDX  $043B
  0x03040E $83FE: C-----  E0 01    CPX  #$01
  0x030410 $8400: C-----  D0 07    BNE  $8409
  0x030412 $8402: C-----  2C 28 06 BIT  $0628
  0x030415 $8405: C-----  10 02    BPL  $8409
  0x030417 $8407: C-----  A2 0A    LDX  #$0A
  0x030419 $8409: C-----  BD 35 84 LDA  $8435,X
  0x03041C $840C: C-----  C9 FF    CMP  #$FF
  0x03041E $840E: C-----  F0 03    BEQ  $8413
  0x030420 $8410: C-----  20 3C 86 JSR  $863C
  0x030423 $8413: C-----  AD 3B 04 LDA  $043B
  0x030426 $8416: C-----  C9 01    CMP  #$01
  0x030428 $8418: C-----  D0 07    BNE  $8421
  0x03042A $841A: C-----  2C 28 06 BIT  $0628
  0x03042D $841D: C-----  10 02    BPL  $8421
  0x03042F $841F: C-----  A9 0A    LDA  #$0A
  0x030431 $8421: C-----  AA       TAX  
  0x030432 $8422: C-----  08       PHP  
  0x030433 $8423: C-----  BD BF 83 LDA  $83BF,X
  0x030436 $8426: C-----  28       PLP  
  0x030437 $8427: C-----  D0 09    BNE  $8432
  0x030439 $8429: C-----  AD 3C 04 LDA  $043C
  0x03043C $842C: C-----  29 03    AND  #$03
  0x03043E $842E: C-----  18       CLC  
  0x03043F $842F: C-----  7D BF 83 ADC  $83BF,X
  0x030442 $8432: C-----  4C 3C 86 JMP  $863C
  0x030445 $8435: -D0---  .byte $E8
  0x030446 $8436: -D0---  .byte $E6
  0x030447 $8437: ------  .byte $FF
  0x030448 $8438: ------  .byte $E6
  0x030449 $8439: -D0---  .byte $E9
  0x03044A $843A: -D0---  .byte $E9
  0x03044B $843B: -D0---  .byte $E7
  0x03044C $843C: ------  .byte $00
  0x03044D $843D: ------  .byte $00
  0x03044E $843E: ------  .byte $00
  0x03044F $843F: -D0---  .byte $E9
  0x030450 $8440: ------  .byte $E8
  0x030451 $8441: -D0---  .byte $EA
  0x030452 $8442: -D0---  .byte $E8
  0x030453 $8443: C--J--  2C 3E 04 BIT  $043E
  0x030456 $8446: C-----  10 0D    BPL  $8455
  0x030458 $8448: C-----  AE 3D 04 LDX  $043D
  0x03045B $844B: C-----  BD 61 84 LDA  $8461,X
  0x03045E $844E: C-----  C9 FF    CMP  #$FF
  0x030460 $8450: C-----  F0 03    BEQ  $8455
  0x030462 $8452: C-----  20 3C 86 JSR  $863C
  0x030465 $8455: C-----  AD 3D 04 LDA  $043D
  0x030468 $8458: C-----  29 3F    AND  #$3F
  0x03046A $845A: C-----  AA       TAX  
  0x03046B $845B: C-----  BD DC 83 LDA  $83DC,X
  0x03046E $845E: C-----  4C 3C 86 JMP  $863C
  0x030471 $8461: -D0---  .byte $E6
  0x030472 $8462: -D0---  .byte $E6
  0x030473 $8463: ------  .byte $FF
  0x030474 $8464: -D0---  .byte $E7
  0x030475 $8465: ------  .byte $FF
  0x030476 $8466: ------  .byte $FF
  0x030477 $8467: C--J--  AD 41 04 LDA  $0441
  0x03047A $846A: C-----  4C 53 86 JMP  $8653
  0x03047D $846D: C--J--  AD FB 05 LDA  $05FB
  0x030480 $8470: C-----  49 0B    EOR  #$0B
  0x030482 $8472: C-----  4C 78 84 JMP  $8478
  0x030485 $8475: C--J--  AD FB 05 LDA  $05FB
  0x030488 $8478: C-----  AC 2A 00 LDY  $002A
  0x03048B $847B: C-----  AA       TAX  
  0x03048C $847C: C-----  F0 08    BEQ  $8486
  0x03048E $847E: C-----  AC 2B 00 LDY  $002B
  0x030491 $8481: C-----  C0 24    CPY  #$24
  0x030493 $8483: C-----  D0 01    BNE  $8486
  0x030495 $8485: ------  .byte $88
  0x030496 $8486: C-----  98       TYA  
  0x030497 $8487: C-----  18       CLC  
  0x030498 $8488: C-----  69 76    ADC  #$76
  0x03049A $848A: C-----  4C 3C 86 JMP  $863C
  0x03049D $848D: C--J--  AD 00 06 LDA  $0600
  0x0304A0 $8490: C-----  4C B2 86 JMP  $86B2
  0x0304A3 $8493: C--J--  AD 01 06 LDA  $0601
  0x0304A6 $8496: C-----  4C 53 86 JMP  $8653
  0x0304A9 $8499: C--J--  AD 02 06 LDA  $0602
  0x0304AC $849C: C-----  4C 53 86 JMP  $8653
  0x0304AF $849F: C--J--  AD 03 06 LDA  $0603
  0x0304B2 $84A2: C-----  4C 53 86 JMP  $8653
  0x0304B5 $84A5: C--J--  AD FC 05 LDA  $05FC
  0x0304B8 $84A8: C-----  4C 53 86 JMP  $8653
  0x0304BB $84AB: C--J--  AE 3D 04 LDX  $043D
  0x0304BE $84AE: C-----  BD C7 84 LDA  $84C7,X
  0x0304C1 $84B1: C-----  F0 13    BEQ  $84C6
  0x0304C3 $84B3: C-----  2C 3E 04 BIT  $043E
  0x0304C6 $84B6: C-----  10 05    BPL  $84BD
  0x0304C8 $84B8: C-----  A9 E6    LDA  #$E6
  0x0304CA $84BA: C-----  20 3C 86 JSR  $863C
  0x0304CD $84BD: C-----  AE 3D 04 LDX  $043D
  0x0304D0 $84C0: C-----  BD C7 84 LDA  $84C7,X
  0x0304D3 $84C3: C-----  4C 3C 86 JMP  $863C
  0x0304D6 $84C6: ------  .byte $60
  0x0304D7 $84C7: -D0---  .byte $E0
  0x0304D8 $84C8: -D0---  .byte $E4
  0x0304D9 $84C9: ------  .byte $00
  0x0304DA $84CA: ------  .byte $00
  0x0304DB $84CB: ------  .byte $00
  0x0304DC $84CC: -D0---  .byte $E0
  0x0304DD $84CD: -D0---  .byte $E0
  0x0304DE $84CE: C--J--  AD FB 05 LDA  $05FB
  0x0304E1 $84D1: C-----  49 0B    EOR  #$0B
  0x0304E3 $84D3: C-----  4C 53 86 JMP  $8653
  0x0304E6 $84D6: C--J--  AD 42 04 LDA  $0442
  0x0304E9 $84D9: C-----  4C 53 86 JMP  $8653
  0x0304EC $84DC: C--J--  AD 16 06 LDA  $0616
  0x0304EF $84DF: C-----  4A       LSR  A
  0x0304F0 $84E0: C-----  18       CLC  
  0x0304F1 $84E1: C-----  69 34    ADC  #$34
  0x0304F3 $84E3: C-----  4C 29 86 JMP  $8629
  0x0304F6 $84E6: C--J--  AD 2A 00 LDA  $002A
  0x0304F9 $84E9: C-----  4C EF 84 JMP  $84EF
  0x0304FC $84EC: C--J--  AD 2B 00 LDA  $002B
  0x0304FF $84EF: C-----  C9 24    CMP  #$24
  0x030501 $84F1: C-----  D0 02    BNE  $84F5
  0x030503 $84F3: ------  .byte $A9
  0x030504 $84F4: ------  .byte $23
  0x030505 $84F5: C-----  18       CLC  
  0x030506 $84F6: C-----  69 76    ADC  #$76
  0x030508 $84F8: C-----  4C 3C 86 JMP  $863C
  0x03050B $84FB: C--J--  AD 41 04 LDA  $0441
  0x03050E $84FE: C-----  20 13 85 JSR  $8513
  0x030511 $8501: C-----  AD 42 04 LDA  $0442
  0x030514 $8504: C-----  4C 34 85 JMP  $8534
  0x030517 $8507: C--J--  AD 42 04 LDA  $0442
  0x03051A $850A: C-----  20 13 85 JSR  $8513
  0x03051D $850D: C-----  AD 41 04 LDA  $0441
  0x030520 $8510: C-----  4C 34 85 JMP  $8534
  0x030523 $8513: C-----  20 0C C5 JSR  $C50C
  0x030526 $8516: C-----  A0 00    LDY  #$00
  0x030528 $8518: C-----  B1 34    LDA  ($34),Y
  0x03052A $851A: C-----  A2 00    LDX  #$00
  0x03052C $851C: C-----  DD 2C 85 CMP  $852C,X
  0x03052F $851F: C-----  F0 07    BEQ  $8528
  0x030531 $8521: C-----  E8       INX  
  0x030532 $8522: C-----  E0 08    CPX  #$08
  0x030534 $8524: C-----  D0 F6    BNE  $851C
  0x030536 $8526: C-----  18       CLC  
  0x030537 $8527: C-----  60       RTS  
  0x030538 $8528: C-----  86 3D    STX  $3D
  0x03053A $852A: C-----  38       SEC  
  0x03053B $852B: C-----  60       RTS  
  0x03053C $852C: -D0---  .byte $01
  0x03053D $852D: -D0---  .byte $11
  0x03053E $852E: -D0---  .byte $44
  0x03053F $852F: -D0---  .byte $34
  0x030540 $8530: -D0---  .byte $45
  0x030541 $8531: -D0---  .byte $15
  0x030542 $8532: -D0---  .byte $42
  0x030543 $8533: -D0---  .byte $38
  0x030544 $8534: C-----  08       PHP  
  0x030545 $8535: C-----  20 0C C5 JSR  $C50C
  0x030548 $8538: C-----  28       PLP  
  0x030549 $8539: C-----  90 37    BCC  $8572
  0x03054B $853B: C-----  A5 3D    LDA  $3D
  0x03054D $853D: C-----  0A       ASL  A
  0x03054E $853E: C-----  AA       TAX  
  0x03054F $853F: C-----  BD 89 85 LDA  $8589,X
  0x030552 $8542: C-----  85 3E    STA  $3E
  0x030554 $8544: C-----  BD 8A 85 LDA  $858A,X
  0x030557 $8547: C-----  85 3F    STA  $3F
  0x030559 $8549: C-----  A0 00    LDY  #$00
  0x03055B $854B: C-----  B1 34    LDA  ($34),Y
  0x03055D $854D: C-----  AA       TAX  
  0x03055E $854E: C-----  A0 00    LDY  #$00
  0x030560 $8550: C-----  B1 3E    LDA  ($3E),Y
  0x030562 $8552: C-----  F0 1E    BEQ  $8572
  0x030564 $8554: C-----  8A       TXA  
  0x030565 $8555: C-----  D1 3E    CMP  ($3E),Y
  0x030567 $8557: C-----  F0 03    BEQ  $855C
  0x030569 $8559: C-----  C8       INY  
  0x03056A $855A: C-----  D0 F4    BNE  $8550
  0x03056C $855C: C-----  8A       TXA  
  0x03056D $855D: C-----  20 3C 86 JSR  $863C
  0x030570 $8560: C-----  A5 3D    LDA  $3D
  0x030572 $8562: C-----  0A       ASL  A
  0x030573 $8563: C-----  AA       TAX  
  0x030574 $8564: C-----  BD 7A 85 LDA  $857A,X
  0x030577 $8567: C-----  48       PHA  
  0x030578 $8568: C-----  BD 79 85 LDA  $8579,X
  0x03057B $856B: C-----  20 29 86 JSR  $8629
  0x03057E $856E: C-----  68       PLA  
  0x03057F $856F: C-----  4C 29 86 JMP  $8629
  0x030582 $8572: C-----  A0 00    LDY  #$00
  0x030584 $8574: C-----  B1 34    LDA  ($34),Y
  0x030586 $8576: C-----  4C 3C 86 JMP  $863C
  0x030589 $8579: ------  .byte $08
  0x03058A $857A: ------  .byte $2E
  0x03058B $857B: -D0---  .byte $08
  0x03058C $857C: -D0---  .byte $2E
  0x03058D $857D: ------  .byte $08
  0x03058E $857E: ------  .byte $2E
  0x03058F $857F: -D0---  .byte $08
  0x030590 $8580: -D0---  .byte $2E
  0x030591 $8581: ------  .byte $08
  0x030592 $8582: ------  .byte $2E
  0x030593 $8583: -D0---  .byte $0B
  0x030594 $8584: -D0---  .byte $2E
  0x030595 $8585: ------  .byte $0B
  0x030596 $8586: ------  .byte $2E
  0x030597 $8587: -D0---  .byte $0B
  0x030598 $8588: -D0---  .byte $2E
  0x030599 $8589: -D0---  .byte $99
  0x03059A $858A: -D0---  .byte $85
  0x03059B $858B: -D0---  .byte $9F
  0x03059C $858C: -D0---  .byte $85
  0x03059D $858D: ------  .byte $9F
  0x03059E $858E: ------  .byte $85
  0x03059F $858F: -D0---  .byte $A2
  0x0305A0 $8590: -D0---  .byte $85
  0x0305A1 $8591: ------  .byte $A2
  0x0305A2 $8592: ------  .byte $85
  0x0305A3 $8593: -D0---  .byte $A5
  0x0305A4 $8594: -D0---  .byte $85
  0x0305A5 $8595: ------  .byte $A5
  0x0305A6 $8596: ------  .byte $85
  0x0305A7 $8597: -D0---  .byte $AE
  0x0305A8 $8598: -D0---  .byte $85
  0x0305A9 $8599: -D0-I-  .byte $44 ; <indirect ref>
  0x0305AA $859A: -D0-I-  .byte $41 ; <indirect ref>
  0x0305AB $859B: -D0-I-  .byte $45 ; <indirect ref>
  0x0305AC $859C: -D0-I-  .byte $4B ; <indirect ref>
  0x0305AD $859D: -D0-I-  .byte $49 ; <indirect ref>
  0x0305AE $859E: -D0-I-  .byte $00 ; <indirect ref>
  0x0305AF $859F: -D0-I-  .byte $01 ; <indirect ref>
  0x0305B0 $85A0: -D0-I-  .byte $34 ; <indirect ref>
  0x0305B1 $85A1: -D0-I-  .byte $00 ; <indirect ref>
  0x0305B2 $85A2: -D0-I-  .byte $01 ; <indirect ref>
  0x0305B3 $85A3: -D0-I-  .byte $11 ; <indirect ref>
  0x0305B4 $85A4: -D0-I-  .byte $00 ; <indirect ref>
  0x0305B5 $85A5: -D0-I-  .byte $01 ; <indirect ref>
  0x0305B6 $85A6: -D0-I-  .byte $36 ; <indirect ref>
  0x0305B7 $85A7: -D0-I-  .byte $34 ; <indirect ref>
  0x0305B8 $85A8: -D0-I-  .byte $35 ; <indirect ref>
  0x0305B9 $85A9: -D0-I-  .byte $32 ; <indirect ref>
  0x0305BA $85AA: -D0-I-  .byte $2E ; <indirect ref>
  0x0305BB $85AB: -D0-I-  .byte $30 ; <indirect ref>
  0x0305BC $85AC: -D0-I-  .byte $31 ; <indirect ref>
  0x0305BD $85AD: -D0-I-  .byte $00 ; <indirect ref>
  0x0305BE $85AE: -D0-I-  .byte $11 ; <indirect ref>
  0x0305BF $85AF: -D0-I-  .byte $15 ; <indirect ref>
  0x0305C0 $85B0: ------  .byte $00
  0x0305C1 $85B1: C--J--  A9 ED    LDA  #$ED
  0x0305C3 $85B3: C-----  4C 3C 86 JMP  $863C
  0x0305C6 $85B6: C--J--  A9 EE    LDA  #$EE
  0x0305C8 $85B8: C-----  4C 3C 86 JMP  $863C
  0x0305CB $85BB: C--J--  AC E5 05 LDY  $05E5
  0x0305CE $85BE: C-----  EE E5 05 INC  $05E5
  0x0305D1 $85C1: C-----  B1 5F    LDA  ($5F),Y
  0x0305D3 $85C3: C-----  48       PHA  
  0x0305D4 $85C4: C-----  A9 7C    LDA  #$7C
  0x0305D6 $85C6: C-----  20 29 86 JSR  $8629
  0x0305D9 $85C9: C-----  68       PLA  
  0x0305DA $85CA: C-----  38       SEC  
  0x0305DB $85CB: C-----  E9 01    SBC  #$01
  0x0305DD $85CD: C-----  D0 F4    BNE  $85C3
  0x0305DF $85CF: C-----  60       RTS  
  0x0305E0 $85D0: C--J--  A9 EF    LDA  #$EF
  0x0305E2 $85D2: C-----  4C 3C 86 JMP  $863C
  0x0305E5 $85D5: ------  .byte $60
  0x0305E6 $85D6: C--J--  A9 80    LDA  #$80
  0x0305E8 $85D8: C-----  8D 15 05 STA  $0515
  0x0305EB $85DB: C-----  AD E7 05 LDA  $05E7
  0x0305EE $85DE: C-----  CD E8 05 CMP  $05E8
  0x0305F1 $85E1: C-----  D0 09    BNE  $85EC
  0x0305F3 $85E3: C-----  A9 00    LDA  #$00
  0x0305F5 $85E5: C-----  8D E4 05 STA  $05E4
  0x0305F8 $85E8: C-----  A9 01    LDA  #$01
  0x0305FA $85EA: C-----  D0 0B    BNE  $85F7
  0x0305FC $85EC: C-----  EE E7 05 INC  $05E7
  0x0305FF $85EF: C-----  AC E5 05 LDY  $05E5
  0x030602 $85F2: C-----  EE E5 05 INC  $05E5
  0x030605 $85F5: C-----  A9 01    LDA  #$01
  0x030607 $85F7: C-----  8D E9 05 STA  $05E9
  0x03060A $85FA: C-----  68       PLA  
  0x03060B $85FB: C-----  68       PLA  
  0x03060C $85FC: C-----  60       RTS  
  0x03060D $85FD: ------  .byte $60
  0x03060E $85FE: ------  .byte $A9
  0x03060F $85FF: ------  .byte $80
  0x030610 $8600: ------  .byte $8D
  0x030611 $8601: ------  .byte $15
  0x030612 $8602: ------  .byte $05
  0x030613 $8603: ------  .byte $AD
  0x030614 $8604: ------  .byte $E3
  0x030615 $8605: ------  .byte $05
  0x030616 $8606: ------  .byte $29
  0x030617 $8607: ------  .byte $BF
  0x030618 $8608: ------  .byte $8D
  0x030619 $8609: ------  .byte $E3
  0x03061A $860A: ------  .byte $05
  0x03061B $860B: ------  .byte $A9
  0x03061C $860C: ------  .byte $01
  0x03061D $860D: ------  .byte $20
  0x03061E $860E: ------  .byte $15
  0x03061F $860F: ------  .byte $C5
  0x030620 $8610: ------  .byte $20
  0x030621 $8611: ------  .byte $60
  0x030622 $8612: ------  .byte $C5
  0x030623 $8613: ------  .byte $2C
  0x030624 $8614: ------  .byte $E3
  0x030625 $8615: ------  .byte $05
  0x030626 $8616: ------  .byte $50
  0x030627 $8617: ------  .byte $F3
  0x030628 $8618: ------  .byte $AD
  0x030629 $8619: ------  .byte $E3
  0x03062A $861A: ------  .byte $05
  0x03062B $861B: ------  .byte $29
  0x03062C $861C: ------  .byte $BF
  0x03062D $861D: ------  .byte $8D
  0x03062E $861E: ------  .byte $E3
  0x03062F $861F: ------  .byte $05
  0x030630 $8620: ------  .byte $60
  0x030631 $8621: ------  .byte $A9
  0x030632 $8622: ------  .byte $00
  0x030633 $8623: ------  .byte $8D
  0x030634 $8624: ------  .byte $E3
  0x030635 $8625: ------  .byte $05
  0x030636 $8626: ------  .byte $68
  0x030637 $8627: ------  .byte $68
  0x030638 $8628: ------  .byte $60
  0x030639 $8629: C-----  20 24 C5 JSR  $C524
  0x03063C $862C: C-----  A6 3A    LDX  $3A
  0x03063E $862E: C-----  9D A8 04 STA  $04A8,X
  0x030641 $8631: C-----  A6 3B    LDX  $3B
  0x030643 $8633: C-----  98       TYA  
  0x030644 $8634: C-----  9D A8 04 STA  $04A8,X
  0x030647 $8637: C-----  E6 3A    INC  $3A
  0x030649 $8639: C-----  E6 3B    INC  $3B
  0x03064B $863B: C-----  60       RTS  
  0x03064C $863C: C-----  20 3C C5 JSR  $C53C
  0x03064F $863F: C-----  A9 00    LDA  #$00
  0x030651 $8641: C-----  85 3C    STA  $3C
  0x030653 $8643: C-----  A4 3C    LDY  $3C
  0x030655 $8645: C-----  B1 30    LDA  ($30),Y
  0x030657 $8647: C-----  C9 E0    CMP  #$E0
  0x030659 $8649: C-----  B0 07    BCS  $8652
  0x03065B $864B: C-----  20 29 86 JSR  $8629
  0x03065E $864E: C-----  E6 3C    INC  $3C
  0x030660 $8650: C-----  D0 F1    BNE  $8643
  0x030662 $8652: C-----  60       RTS  
  0x030663 $8653: C-----  85 3D    STA  $3D
  0x030665 $8655: C-----  20 0C C5 JSR  $C50C
  0x030668 $8658: C-----  A0 00    LDY  #$00
  0x03066A $865A: C-----  B1 34    LDA  ($34),Y
  0x03066C $865C: C-----  F0 0D    BEQ  $866B
  0x03066E $865E: C-----  20 3C 86 JSR  $863C
  0x030671 $8661: C-----  A9 08    LDA  #$08
  0x030673 $8663: C-----  20 29 86 JSR  $8629
  0x030676 $8666: C-----  A9 2E    LDA  #$2E
  0x030678 $8668: C-----  4C 29 86 JMP  $8629
  0x03067B $866B: C-----  A5 3D    LDA  $3D
  0x03067D $866D: C-----  38       SEC  
  0x03067E $866E: C-----  E9 0B    SBC  #$0B
  0x030680 $8670: C-----  0A       ASL  A
  0x030681 $8671: C-----  0A       ASL  A
  0x030682 $8672: C-----  AA       TAX  
  0x030683 $8673: C-----  A0 00    LDY  #$00
  0x030685 $8675: C-----  BD 86 86 LDA  $8686,X
  0x030688 $8678: C-----  99 EE 05 STA  $05EE,Y
  0x03068B $867B: C-----  E8       INX  
  0x03068C $867C: C-----  C8       INY  
  0x03068D $867D: C-----  C0 04    CPY  #$04
  0x03068F $867F: C-----  D0 F4    BNE  $8675
  0x030691 $8681: C-----  A9 00    LDA  #$00
  0x030693 $8683: C-----  4C 3C 86 JMP  $863C
  0x030696 $8686: -D0---  .byte $47
  0x030697 $8687: -D0---  .byte $7D
  0x030698 $8688: -D0---  .byte $CD
  0x030699 $8689: -D0---  .byte $7D
  0x03069A $868A: -D0---  .byte $00
  0x03069B $868B: -D0---  .byte $35
  0x03069C $868C: -D0---  .byte $AF
  0x03069D $868D: -D0---  .byte $2E
  0x03069E $868E: -D0---  .byte $00
  0x03069F $868F: -D0---  .byte $36
  0x0306A0 $8690: -D0---  .byte $AF
  0x0306A1 $8691: -D0---  .byte $2E
  0x0306A2 $8692: -D0---  .byte $00
  0x0306A3 $8693: -D0---  .byte $37
  0x0306A4 $8694: -D0---  .byte $AF
  0x0306A5 $8695: -D0---  .byte $2E
  0x0306A6 $8696: -D0---  .byte $00
  0x0306A7 $8697: -D0---  .byte $38
  0x0306A8 $8698: -D0---  .byte $AF
  0x0306A9 $8699: -D0---  .byte $2E
  0x0306AA $869A: -D0---  .byte $00
  0x0306AB $869B: -D0---  .byte $39
  0x0306AC $869C: -D0---  .byte $AF
  0x0306AD $869D: -D0---  .byte $2E
  0x0306AE $869E: -D0---  .byte $00
  0x0306AF $869F: -D0---  .byte $3A
  0x0306B0 $86A0: -D0---  .byte $AF
  0x0306B1 $86A1: -D0---  .byte $2E
  0x0306B2 $86A2: -D0---  .byte $00
  0x0306B3 $86A3: -D0---  .byte $3B
  0x0306B4 $86A4: -D0---  .byte $AF
  0x0306B5 $86A5: -D0---  .byte $2E
  0x0306B6 $86A6: -D0---  .byte $00
  0x0306B7 $86A7: -D0---  .byte $3C
  0x0306B8 $86A8: -D0---  .byte $AF
  0x0306B9 $86A9: -D0---  .byte $2E
  0x0306BA $86AA: -D0---  .byte $34
  0x0306BB $86AB: -D0---  .byte $33
  0x0306BC $86AC: -D0---  .byte $AF
  0x0306BD $86AD: -D0---  .byte $2E
  0x0306BE $86AE: -D0---  .byte $34
  0x0306BF $86AF: -D0---  .byte $34
  0x0306C0 $86B0: -D0---  .byte $AF
  0x0306C1 $86B1: -D0---  .byte $2E
  0x0306C2 $86B2: C-----  18       CLC  
  0x0306C3 $86B3: C-----  69 33    ADC  #$33
  0x0306C5 $86B5: C-----  4C 29 86 JMP  $8629
  0x0306C8 $86B8: -D0---  .byte $0E
  0x0306C9 $86B9: -D0---  .byte $0E
  0x0306CA $86BA: -D0---  .byte $0E
  0x0306CB $86BB: ------  .byte $0E
  0x0306CC $86BC: -D0---  .byte $0E
  0x0306CD $86BD: -D0---  .byte $0E
  0x0306CE $86BE: -D0---  .byte $0E
  0x0306CF $86BF: -D0---  .byte $0E
  0x0306D0 $86C0: -D0---  .byte $0E
  0x0306D1 $86C1: -D0---  .byte $12
  0x0306D2 $86C2: -D0---  .byte $12
  0x0306D3 $86C3: -D0---  .byte $12
  0x0306D4 $86C4: -D0---  .byte $12
  0x0306D5 $86C5: -D0---  .byte $12
  0x0306D6 $86C6: -D0---  .byte $12
  0x0306D7 $86C7: ------  .byte $12
  0x0306D8 $86C8: -D0---  .byte $01
  0x0306D9 $86C9: -D0---  .byte $01
  0x0306DA $86CA: -D0---  .byte $01
  0x0306DB $86CB: -D0---  .byte $02
  0x0306DC $86CC: -D0---  .byte $00
  0x0306DD $86CD: -D0---  .byte $02
  0x0306DE $86CE: ------  .byte $00
  0x0306DF $86CF: ------  .byte $03
  0x0306E0 $86D0: -D0---  .byte $01
  0x0306E1 $86D1: -D0---  .byte $01
  0x0306E2 $86D2: -D0---  .byte $01
  0x0306E3 $86D3: -D0---  .byte $02
  0x0306E4 $86D4: -D0---  .byte $00
  0x0306E5 $86D5: -D0---  .byte $02
  0x0306E6 $86D6: -D0---  .byte $00
  0x0306E7 $86D7: -D0---  .byte $03
  0x0306E8 $86D8: -D0---  .byte $01
  0x0306E9 $86D9: -D0---  .byte $02
  0x0306EA $86DA: -D0---  .byte $05
  0x0306EB $86DB: -D0---  .byte $05
  0x0306EC $86DC: -D0---  .byte $05
  0x0306ED $86DD: -D0---  .byte $06
  0x0306EE $86DE: -D0---  .byte $04
  0x0306EF $86DF: -D0---  .byte $06
  0x0306F0 $86E0: -D0---  .byte $05
  0x0306F1 $86E1: -D0---  .byte $05
  0x0306F2 $86E2: -D0---  .byte $05
  0x0306F3 $86E3: -D0---  .byte $06
  0x0306F4 $86E4: -D0---  .byte $04
  0x0306F5 $86E5: -D0---  .byte $06
  0x0306F6 $86E6: ------  .byte $04
  0x0306F7 $86E7: ------  .byte $07
  0x0306F8 $86E8: -D0---  .byte $70
  0x0306F9 $86E9: -D0---  .byte $22
  0x0306FA $86EA: -D0---  .byte $B0
  0x0306FB $86EB: -D0---  .byte $22
  0x0306FC $86EC: -D0---  .byte $F0
  0x0306FD $86ED: -D0---  .byte $22
  0x0306FE $86EE: -D0---  .byte $30
  0x0306FF $86EF: -D0---  .byte $23
  0x030700 $86F0: -D0---  .byte $6B
  0x030701 $86F1: -D0---  .byte $22
  0x030702 $86F2: -D0---  .byte $AB
  0x030703 $86F3: -D0---  .byte $22
  0x030704 $86F4: -D0---  .byte $EB
  0x030705 $86F5: -D0---  .byte $22
  0x030706 $86F6: ------  .byte $2B
  0x030707 $86F7: ------  .byte $23
  0x030708 $86F8: C-----  AD 32 05 LDA  $0532
  0x03070B $86FB: C-----  F0 25    BEQ  $8722
  0x03070D $86FD: C-----  10 1B    BPL  $871A
  0x03070F $86FF: C-----  29 7F    AND  #$7F
  0x030711 $8701: C-----  8D 32 05 STA  $0532
  0x030714 $8704: C-----  F0 1C    BEQ  $8722
  0x030716 $8706: C-----  38       SEC  
  0x030717 $8707: C-----  E9 01    SBC  #$01
  0x030719 $8709: C-----  0A       ASL  A
  0x03071A $870A: C-----  AA       TAX  
  0x03071B $870B: C-----  BD 6E AD LDA  $AD6E,X
  0x03071E $870E: C-----  85 79    STA  $79
  0x030720 $8710: C-----  BD 6F AD LDA  $AD6F,X
  0x030723 $8713: C-----  85 7A    STA  $7A
  0x030725 $8715: C-----  A9 00    LDA  #$00
  0x030727 $8717: C-----  8D 33 05 STA  $0533
  0x03072A $871A: C-----  AD 33 05 LDA  $0533
  0x03072D $871D: C-----  F0 04    BEQ  $8723
  0x03072F $871F: C-----  CE 33 05 DEC  $0533
  0x030732 $8722: C-----  60       RTS  
  0x030733 $8723: C-----  A0 00    LDY  #$00
  0x030735 $8725: C-----  B1 79    LDA  ($79),Y
  0x030737 $8727: C-----  29 07    AND  #$07
  0x030739 $8729: C-----  AA       TAX  
  0x03073A $872A: C-----  B1 79    LDA  ($79),Y
  0x03073C $872C: C-----  4A       LSR  A
  0x03073D $872D: C-----  4A       LSR  A
  0x03073E $872E: C-----  4A       LSR  A
  0x03073F $872F: C-----  D0 0B    BNE  $873C
  0x030741 $8731: C-----  E0 00    CPX  #$00
  0x030743 $8733: C-----  F0 30    BEQ  $8765
  0x030745 $8735: C-----  E0 01    CPX  #$01
  0x030747 $8737: C-----  F0 32    BEQ  $876B
  0x030749 $8739: ------  .byte $C8
  0x03074A $873A: ------  .byte $D0
  0x03074B $873B: ------  .byte $E9
  0x03074C $873C: C-----  8D 33 05 STA  $0533
  0x03074F $873F: C-----  B1 79    LDA  ($79),Y
  0x030751 $8741: C-----  29 07    AND  #$07
  0x030753 $8743: C-----  85 3A    STA  $3A
  0x030755 $8745: C-----  C8       INY  
  0x030756 $8746: C-----  B1 79    LDA  ($79),Y
  0x030758 $8748: C-----  AA       TAX  
  0x030759 $8749: C-----  C8       INY  
  0x03075A $874A: C-----  B1 79    LDA  ($79),Y
  0x03075C $874C: C-----  9D 6F 04 STA  $046F,X
  0x03075F $874F: C-----  C8       INY  
  0x030760 $8750: C-----  C6 3A    DEC  $3A
  0x030762 $8752: C-----  D0 F2    BNE  $8746
  0x030764 $8754: C-----  98       TYA  
  0x030765 $8755: C-----  18       CLC  
  0x030766 $8756: C-----  65 79    ADC  $79
  0x030768 $8758: C-----  85 79    STA  $79
  0x03076A $875A: C-----  90 02    BCC  $875E
  0x03076C $875C: C-----  E6 7A    INC  $7A
  0x03076E $875E: C-----  20 33 C5 JSR  $C533
  0x030771 $8761: -D0-I-  .byte $00 ; <indirect ref>
  0x030772 $8762: -D0-I-  .byte $6C ; <indirect ref>
  0x030773 $8763: -D0-I-  .byte $04 ; <indirect ref>
  0x030774 $8764: C-----  60       RTS  
  0x030775 $8765: C-----  A9 00    LDA  #$00
  0x030777 $8767: C-----  8D 32 05 STA  $0532
  0x03077A $876A: C-----  60       RTS  
  0x03077B $876B: C-----  C8       INY  
  0x03077C $876C: C-----  B1 79    LDA  ($79),Y
  0x03077E $876E: C-----  AA       TAX  
  0x03077F $876F: C-----  C8       INY  
  0x030780 $8770: C-----  B1 79    LDA  ($79),Y
  0x030782 $8772: C-----  85 7A    STA  $7A
  0x030784 $8774: C-----  86 79    STX  $79
  0x030786 $8776: C-----  4C 23 87 JMP  $8723
  0x030789 $8779: C-----  AD 34 05 LDA  $0534
  0x03078C $877C: C-----  F0 25    BEQ  $87A3
  0x03078E $877E: C-----  10 1B    BPL  $879B
  0x030790 $8780: C-----  29 7F    AND  #$7F
  0x030792 $8782: C-----  8D 34 05 STA  $0534
  0x030795 $8785: C-----  F0 1C    BEQ  $87A3
  0x030797 $8787: C-----  38       SEC  
  0x030798 $8788: C-----  E9 01    SBC  #$01
  0x03079A $878A: C-----  0A       ASL  A
  0x03079B $878B: C-----  AA       TAX  
  0x03079C $878C: C-----  BD 1C AD LDA  $AD1C,X
  0x03079F $878F: C-----  85 7B    STA  $7B
  0x0307A1 $8791: C-----  BD 1D AD LDA  $AD1D,X
  0x0307A4 $8794: C-----  85 7C    STA  $7C
  0x0307A6 $8796: C-----  A9 00    LDA  #$00
  0x0307A8 $8798: C-----  8D 35 05 STA  $0535
  0x0307AB $879B: C-----  AD 35 05 LDA  $0535
  0x0307AE $879E: C-----  F0 04    BEQ  $87A4
  0x0307B0 $87A0: C-----  CE 35 05 DEC  $0535
  0x0307B3 $87A3: C-----  60       RTS  
  0x0307B4 $87A4: C-----  A0 00    LDY  #$00
  0x0307B6 $87A6: C-----  B1 7B    LDA  ($7B),Y
  0x0307B8 $87A8: C-----  C9 F0    CMP  #$F0
  0x0307BA $87AA: C-----  90 0B    BCC  $87B7
  0x0307BC $87AC: C-----  C9 F0    CMP  #$F0
  0x0307BE $87AE: C-----  F0 22    BEQ  $87D2
  0x0307C0 $87B0: C-----  C9 F1    CMP  #$F1
  0x0307C2 $87B2: C-----  F0 24    BEQ  $87D8
  0x0307C4 $87B4: ------  .byte $C8
  0x0307C5 $87B5: ------  .byte $D0
  0x0307C6 $87B6: ------  .byte $EF
  0x0307C7 $87B7: C-----  8D 35 05 STA  $0535
  0x0307CA $87BA: C-----  C8       INY  
  0x0307CB $87BB: C-----  B1 7B    LDA  ($7B),Y
  0x0307CD $87BD: C-----  8D 90 04 STA  $0490
  0x0307D0 $87C0: C-----  C8       INY  
  0x0307D1 $87C1: C-----  B1 7B    LDA  ($7B),Y
  0x0307D3 $87C3: C-----  8D 91 04 STA  $0491
  0x0307D6 $87C6: C-----  C8       INY  
  0x0307D7 $87C7: C-----  98       TYA  
  0x0307D8 $87C8: C-----  18       CLC  
  0x0307D9 $87C9: C-----  65 7B    ADC  $7B
  0x0307DB $87CB: C-----  85 7B    STA  $7B
  0x0307DD $87CD: C-----  90 02    BCC  $87D1
  0x0307DF $87CF: ------  .byte $E6
  0x0307E0 $87D0: ------  .byte $7C
  0x0307E1 $87D1: C-----  60       RTS  
  0x0307E2 $87D2: ------  .byte $A9
  0x0307E3 $87D3: ------  .byte $00
  0x0307E4 $87D4: ------  .byte $8D
  0x0307E5 $87D5: ------  .byte $34
  0x0307E6 $87D6: ------  .byte $05
  0x0307E7 $87D7: ------  .byte $60
  0x0307E8 $87D8: C-----  C8       INY  
  0x0307E9 $87D9: C-----  B1 7B    LDA  ($7B),Y
  0x0307EB $87DB: C-----  AA       TAX  
  0x0307EC $87DC: C-----  C8       INY  
  0x0307ED $87DD: C-----  B1 7B    LDA  ($7B),Y
  0x0307EF $87DF: C-----  85 7C    STA  $7C
  0x0307F1 $87E1: C-----  86 7B    STX  $7B
  0x0307F3 $87E3: C-----  4C A4 87 JMP  $87A4
  0x0307F6 $87E6: C-----  AD 36 05 LDA  $0536
  0x0307F9 $87E9: C-----  F0 26    BEQ  $8811
  0x0307FB $87EB: C-----  10 1B    BPL  $8808
  0x0307FD $87ED: C-----  29 7F    AND  #$7F
  0x0307FF $87EF: C-----  8D 36 05 STA  $0536
  0x030802 $87F2: C-----  F0 1D    BEQ  $8811
  0x030804 $87F4: C-----  38       SEC  
  0x030805 $87F5: C-----  E9 01    SBC  #$01
  0x030807 $87F7: C-----  0A       ASL  A
  0x030808 $87F8: C-----  AA       TAX  
  0x030809 $87F9: C-----  BD 54 AD LDA  $AD54,X
  0x03080C $87FC: C-----  85 7D    STA  $7D
  0x03080E $87FE: C-----  BD 55 AD LDA  $AD55,X
  0x030811 $8801: C-----  85 7E    STA  $7E
  0x030813 $8803: C-----  A9 00    LDA  #$00
  0x030815 $8805: C-----  8D 37 05 STA  $0537
  0x030818 $8808: C-----  AD 37 05 LDA  $0537
  0x03081B $880B: C-----  F0 08    BEQ  $8815
  0x03081D $880D: C-----  CE 37 05 DEC  $0537
  0x030820 $8810: C-----  60       RTS  
  0x030821 $8811: C-----  8D 38 05 STA  $0538
  0x030824 $8814: C-----  60       RTS  
  0x030825 $8815: C-----  A0 00    LDY  #$00
  0x030827 $8817: C-----  B1 7D    LDA  ($7D),Y
  0x030829 $8819: C-----  C9 F0    CMP  #$F0
  0x03082B $881B: C-----  90 0B    BCC  $8828
  0x03082D $881D: C-----  C9 F0    CMP  #$F0
  0x03082F $881F: C-----  F0 1C    BEQ  $883D
  0x030831 $8821: C-----  C9 F1    CMP  #$F1
  0x030833 $8823: C-----  F0 1E    BEQ  $8843
  0x030835 $8825: ------  .byte $C8
  0x030836 $8826: ------  .byte $D0
  0x030837 $8827: ------  .byte $EF
  0x030838 $8828: C-----  8D 37 05 STA  $0537
  0x03083B $882B: C-----  C8       INY  
  0x03083C $882C: C-----  B1 7D    LDA  ($7D),Y
  0x03083E $882E: C-----  8D 38 05 STA  $0538
  0x030841 $8831: C-----  C8       INY  
  0x030842 $8832: C-----  98       TYA  
  0x030843 $8833: C-----  18       CLC  
  0x030844 $8834: C-----  65 7D    ADC  $7D
  0x030846 $8836: C-----  85 7D    STA  $7D
  0x030848 $8838: C-----  90 02    BCC  $883C
  0x03084A $883A: ------  .byte $E6
  0x03084B $883B: ------  .byte $7E
  0x03084C $883C: C-----  60       RTS  
  0x03084D $883D: ------  .byte $A9
  0x03084E $883E: ------  .byte $00
  0x03084F $883F: ------  .byte $8D
  0x030850 $8840: ------  .byte $36
  0x030851 $8841: ------  .byte $05
  0x030852 $8842: ------  .byte $60
  0x030853 $8843: C-----  C8       INY  
  0x030854 $8844: C-----  B1 7D    LDA  ($7D),Y
  0x030856 $8846: C-----  AA       TAX  
  0x030857 $8847: C-----  C8       INY  
  0x030858 $8848: C-----  B1 7D    LDA  ($7D),Y
  0x03085A $884A: C-----  85 7E    STA  $7E
  0x03085C $884C: C-----  86 7D    STX  $7D
  0x03085E $884E: C-----  4C 15 88 JMP  $8815
  0x030861 $8851: C-----  A8       TAY  
  0x030862 $8852: C-----  0A       ASL  A
  0x030863 $8853: C-----  AA       TAX  
  0x030864 $8854: C-----  BD CF B3 LDA  $B3CF,X
  0x030867 $8857: C-----  85 50    STA  $50
  0x030869 $8859: C-----  BD D0 B3 LDA  $B3D0,X
  0x03086C $885C: C-----  85 51    STA  $51
  0x03086E $885E: C-----  98       TYA  
  0x03086F $885F: C-----  29 03    AND  #$03
  0x030871 $8861: C-----  AA       TAX  
  0x030872 $8862: C-----  98       TYA  
  0x030873 $8863: C-----  4A       LSR  A
  0x030874 $8864: C-----  4A       LSR  A
  0x030875 $8865: C-----  A8       TAY  
  0x030876 $8866: C-----  B9 BD B3 LDA  $B3BD,Y
  0x030879 $8869: C-----  CA       DEX  
  0x03087A $886A: C-----  30 05    BMI  $8871
  0x03087C $886C: C-----  4A       LSR  A
  0x03087D $886D: C-----  4A       LSR  A
  0x03087E $886E: C-----  4C 69 88 JMP  $8869
  0x030881 $8871: C-----  29 03    AND  #$03
  0x030883 $8873: C-----  8D C6 05 STA  $05C6
  0x030886 $8876: C-----  0A       ASL  A
  0x030887 $8877: C-----  0A       ASL  A
  0x030888 $8878: C-----  0A       ASL  A
  0x030889 $8879: C-----  6D C6 05 ADC  $05C6
  0x03088C $887C: C-----  8D C6 05 STA  $05C6
  0x03088F $887F: C-----  A9 00    LDA  #$00
  0x030891 $8881: C-----  8D C5 05 STA  $05C5
  0x030894 $8884: C-----  A9 01    LDA  #$01
  0x030896 $8886: C-----  20 15 C5 JSR  $C515
  0x030899 $8889: C-----  AD 15 05 LDA  $0515
  0x03089C $888C: C-----  D0 F6    BNE  $8884
  0x03089E $888E: C-----  A9 01    LDA  #$01
  0x0308A0 $8890: C-----  8D 15 05 STA  $0515
  0x0308A3 $8893: C-----  A0 02    LDY  #$02
  0x0308A5 $8895: C-----  B1 50    LDA  ($50),Y
  0x0308A7 $8897: C-----  0A       ASL  A
  0x0308A8 $8898: C-----  18       CLC  
  0x0308A9 $8899: C-----  69 06    ADC  #$06
  0x0308AB $889B: C-----  AA       TAX  
  0x0308AC $889C: C-----  A9 00    LDA  #$00
  0x0308AE $889E: C-----  9D A5 04 STA  $04A5,X
  0x0308B1 $88A1: C-----  CA       DEX  
  0x0308B2 $88A2: C-----  10 FA    BPL  $889E
  0x0308B4 $88A4: C-----  A2 00    LDX  #$00
  0x0308B6 $88A6: C-----  20 B9 88 JSR  $88B9
  0x0308B9 $88A9: C-----  F0 0D    BEQ  $88B8
  0x0308BB $88AB: C-----  A0 02    LDY  #$02
  0x0308BD $88AD: C-----  B1 50    LDA  ($50),Y
  0x0308BF $88AF: C-----  18       CLC  
  0x0308C0 $88B0: C-----  69 03    ADC  #$03
  0x0308C2 $88B2: C-----  AA       TAX  
  0x0308C3 $88B3: C-----  20 B9 88 JSR  $88B9
  0x0308C6 $88B6: C-----  D0 CC    BNE  $8884
  0x0308C8 $88B8: C-----  60       RTS  
  0x0308C9 $88B9: C-----  A9 FF    LDA  #$FF
  0x0308CB $88BB: C-----  85 45    STA  $45
  0x0308CD $88BD: C-----  A0 02    LDY  #$02
  0x0308CF $88BF: C-----  B1 50    LDA  ($50),Y
  0x0308D1 $88C1: C-----  9D A5 04 STA  $04A5,X
  0x0308D4 $88C4: C-----  A9 00    LDA  #$00
  0x0308D6 $88C6: C-----  85 3A    STA  $3A
  0x0308D8 $88C8: C-----  AD C5 05 LDA  $05C5
  0x0308DB $88CB: C-----  4A       LSR  A
  0x0308DC $88CC: C-----  66 3A    ROR  $3A
  0x0308DE $88CE: C-----  4A       LSR  A
  0x0308DF $88CF: C-----  66 3A    ROR  $3A
  0x0308E1 $88D1: C-----  4A       LSR  A
  0x0308E2 $88D2: C-----  66 3A    ROR  $3A
  0x0308E4 $88D4: C-----  85 3B    STA  $3B
  0x0308E6 $88D6: C-----  A0 00    LDY  #$00
  0x0308E8 $88D8: C-----  B1 50    LDA  ($50),Y
  0x0308EA $88DA: C-----  18       CLC  
  0x0308EB $88DB: C-----  65 3A    ADC  $3A
  0x0308ED $88DD: C-----  9D A6 04 STA  $04A6,X
  0x0308F0 $88E0: C-----  C8       INY  
  0x0308F1 $88E1: C-----  B1 50    LDA  ($50),Y
  0x0308F3 $88E3: C-----  65 3B    ADC  $3B
  0x0308F5 $88E5: C-----  9D A7 04 STA  $04A7,X
  0x0308F8 $88E8: C-----  C9 22    CMP  #$22
  0x0308FA $88EA: C-----  B0 0D    BCS  $88F9
  0x0308FC $88EC: C-----  AD CE 05 LDA  $05CE
  0x0308FF $88EF: C-----  4A       LSR  A
  0x030900 $88F0: C-----  4A       LSR  A
  0x030901 $88F1: C-----  4A       LSR  A
  0x030902 $88F2: C-----  4A       LSR  A
  0x030903 $88F3: C-----  1D A7 04 ORA  $04A7,X
  0x030906 $88F6: C-----  9D A7 04 STA  $04A7,X
  0x030909 $88F9: C-----  86 3A    STX  $3A
  0x03090B $88FB: C-----  A2 00    LDX  #$00
  0x03090D $88FD: C-----  A0 05    LDY  #$05
  0x03090F $88FF: C-----  B1 50    LDA  ($50),Y
  0x030911 $8901: C-----  CD C5 05 CMP  $05C5
  0x030914 $8904: C-----  F0 12    BEQ  $8918
  0x030916 $8906: C-----  B0 41    BCS  $8949
  0x030918 $8908: C-----  A0 07    LDY  #$07
  0x03091A $890A: C-----  18       CLC  
  0x03091B $890B: C-----  71 50    ADC  ($50),Y
  0x03091D $890D: C-----  A2 06    LDX  #$06
  0x03091F $890F: C-----  CD C5 05 CMP  $05C5
  0x030922 $8912: C-----  F0 04    BEQ  $8918
  0x030924 $8914: C-----  90 33    BCC  $8949
  0x030926 $8916: C-----  A2 03    LDX  #$03
  0x030928 $8918: C-----  A0 06    LDY  #$06
  0x03092A $891A: C-----  B1 50    LDA  ($50),Y
  0x03092C $891C: C-----  38       SEC  
  0x03092D $891D: C-----  E9 02    SBC  #$02
  0x03092F $891F: C-----  85 3B    STA  $3B
  0x030931 $8921: C-----  A5 3A    LDA  $3A
  0x030933 $8923: C-----  A0 04    LDY  #$04
  0x030935 $8925: C-----  18       CLC  
  0x030936 $8926: C-----  71 50    ADC  ($50),Y
  0x030938 $8928: C-----  A8       TAY  
  0x030939 $8929: C-----  86 45    STX  $45
  0x03093B $892B: C-----  8A       TXA  
  0x03093C $892C: C-----  18       CLC  
  0x03093D $892D: C-----  6D C6 05 ADC  $05C6
  0x030940 $8930: C-----  AA       TAX  
  0x030941 $8931: C-----  BD 9E 8D LDA  $8D9E,X
  0x030944 $8934: C-----  99 A8 04 STA  $04A8,Y
  0x030947 $8937: C-----  BD 9F 8D LDA  $8D9F,X
  0x03094A $893A: C-----  C8       INY  
  0x03094B $893B: C-----  99 A8 04 STA  $04A8,Y
  0x03094E $893E: C-----  C8       INY  
  0x03094F $893F: C-----  C6 3B    DEC  $3B
  0x030951 $8941: C-----  D0 F8    BNE  $893B
  0x030953 $8943: C-----  BD A0 8D LDA  $8DA0,X
  0x030956 $8946: C-----  99 A8 04 STA  $04A8,Y
  0x030959 $8949: C-----  A0 08    LDY  #$08
  0x03095B $894B: C-----  B1 50    LDA  ($50),Y
  0x03095D $894D: C-----  F0 27    BEQ  $8976
  0x03095F $894F: C-----  85 3B    STA  $3B
  0x030961 $8951: C-----  C8       INY  
  0x030962 $8952: C-----  A9 00    LDA  #$00
  0x030964 $8954: C-----  85 3C    STA  $3C
  0x030966 $8956: C-----  B1 50    LDA  ($50),Y
  0x030968 $8958: C-----  CD C5 05 CMP  $05C5
  0x03096B $895B: C-----  F0 0A    BEQ  $8967
  0x03096D $895D: C-----  38       SEC  
  0x03096E $895E: C-----  E9 01    SBC  #$01
  0x030970 $8960: C-----  E6 3C    INC  $3C
  0x030972 $8962: C-----  CD C5 05 CMP  $05C5
  0x030975 $8965: C-----  D0 07    BNE  $896E
  0x030977 $8967: C-----  84 48    STY  $48
  0x030979 $8969: C-----  20 86 89 JSR  $8986
  0x03097C $896C: C-----  A4 48    LDY  $48
  0x03097E $896E: C-----  C8       INY  
  0x03097F $896F: C-----  C8       INY  
  0x030980 $8970: C-----  C8       INY  
  0x030981 $8971: C-----  C8       INY  
  0x030982 $8972: C-----  C6 3B    DEC  $3B
  0x030984 $8974: C-----  D0 DC    BNE  $8952
  0x030986 $8976: C-----  A9 80    LDA  #$80
  0x030988 $8978: C-----  8D 15 05 STA  $0515
  0x03098B $897B: C-----  AD C5 05 LDA  $05C5
  0x03098E $897E: C-----  EE C5 05 INC  $05C5
  0x030991 $8981: C-----  A0 03    LDY  #$03
  0x030993 $8983: C-----  D1 50    CMP  ($50),Y
  0x030995 $8985: C-----  60       RTS  
  0x030996 $8986: C-----  C8       INY  
  0x030997 $8987: C-----  B1 50    LDA  ($50),Y
  0x030999 $8989: C-----  18       CLC  
  0x03099A $898A: C-----  65 3A    ADC  $3A
  0x03099C $898C: C-----  85 3D    STA  $3D
  0x03099E $898E: C-----  C8       INY  
  0x03099F $898F: C-----  B1 50    LDA  ($50),Y
  0x0309A1 $8991: C-----  85 3E    STA  $3E
  0x0309A3 $8993: C-----  C8       INY  
  0x0309A4 $8994: C-----  B1 50    LDA  ($50),Y
  0x0309A6 $8996: C-----  85 3F    STA  $3F
  0x0309A8 $8998: C-----  A9 00    LDA  #$00
  0x0309AA $899A: C-----  85 40    STA  $40
  0x0309AC $899C: C-----  A4 40    LDY  $40
  0x0309AE $899E: C-----  E6 40    INC  $40
  0x0309B0 $89A0: C-----  B1 3E    LDA  ($3E),Y
  0x0309B2 $89A2: C-----  C9 E0    CMP  #$E0
  0x0309B4 $89A4: C-----  90 06    BCC  $89AC
  0x0309B6 $89A6: C-----  20 B4 89 JSR  $89B4
  0x0309B9 $89A9: C-----  4C 9C 89 JMP  $899C
  0x0309BC $89AC: C-----  20 24 C5 JSR  $C524
  0x0309BF $89AF: C-----  20 9F 8C JSR  $8C9F
  0x0309C2 $89B2: C-----  D0 E8    BNE  $899C
  0x0309C4 $89B4: C-----  38       SEC  
  0x0309C5 $89B5: C-----  E9 E0    SBC  #$E0
  0x0309C7 $89B7: C-----  20 09 C5 JSR  $C509
  0x0309CA $89BA: -D0-I-  .byte $FA ; <indirect ref>
  0x0309CB $89BB: -D0-I-  .byte $89 ; <indirect ref>
  0x0309CC $89BC: -D0-I-  .byte $00 ; <indirect ref>
  0x0309CD $89BD: -D0-I-  .byte $8A ; <indirect ref>
  0x0309CE $89BE: -D0-I-  .byte $06 ; <indirect ref>
  0x0309CF $89BF: -D0-I-  .byte $8A ; <indirect ref>
  0x0309D0 $89C0: -D0-I-  .byte $0C ; <indirect ref>
  0x0309D1 $89C1: -D0-I-  .byte $8A ; <indirect ref>
  0x0309D2 $89C2: -D0-I-  .byte $12 ; <indirect ref>
  0x0309D3 $89C3: -D0-I-  .byte $8A ; <indirect ref>
  0x0309D4 $89C4: -D0-I-  .byte $86 ; <indirect ref>
  0x0309D5 $89C5: -D0-I-  .byte $8A ; <indirect ref>
  0x0309D6 $89C6: -D0-I-  .byte $93 ; <indirect ref>
  0x0309D7 $89C7: -D0-I-  .byte $8A ; <indirect ref>
  0x0309D8 $89C8: -D0-I-  .byte $AF ; <indirect ref>
  0x0309D9 $89C9: -D0-I-  .byte $8A ; <indirect ref>
  0x0309DA $89CA: -D0-I-  .byte $B8 ; <indirect ref>
  0x0309DB $89CB: -D0-I-  .byte $8A ; <indirect ref>
  0x0309DC $89CC: -D0-I-  .byte $C1 ; <indirect ref>
  0x0309DD $89CD: -D0-I-  .byte $8A ; <indirect ref>
  0x0309DE $89CE: -D0-I-  .byte $C1 ; <indirect ref>
  0x0309DF $89CF: -D0-I-  .byte $8A ; <indirect ref>
  0x0309E0 $89D0: -D0-I-  .byte $D7 ; <indirect ref>
  0x0309E1 $89D1: -D0-I-  .byte $8A ; <indirect ref>
  0x0309E2 $89D2: -D0-I-  .byte $DF ; <indirect ref>
  0x0309E3 $89D3: -D0-I-  .byte $8A ; <indirect ref>
  0x0309E4 $89D4: -D0-I-  .byte $E7 ; <indirect ref>
  0x0309E5 $89D5: -D0-I-  .byte $8A ; <indirect ref>
  0x0309E6 $89D6: -D0-I-  .byte $2F ; <indirect ref>
  0x0309E7 $89D7: -D0-I-  .byte $8B ; <indirect ref>
  0x0309E8 $89D8: -D0-I-  .byte $48 ; <indirect ref>
  0x0309E9 $89D9: -D0-I-  .byte $8B ; <indirect ref>
  0x0309EA $89DA: -D0-I-  .byte $8B ; <indirect ref>
  0x0309EB $89DB: -D0-I-  .byte $8B ; <indirect ref>
  0x0309EC $89DC: -D0-I-  .byte $D5 ; <indirect ref>
  0x0309ED $89DD: -D0-I-  .byte $8B ; <indirect ref>
  0x0309EE $89DE: -D0-I-  .byte $DE ; <indirect ref>
  0x0309EF $89DF: -D0-I-  .byte $8B ; <indirect ref>
  0x0309F0 $89E0: ------  .byte $E4
  0x0309F1 $89E1: ------  .byte $8B
  0x0309F2 $89E2: -D0-I-  .byte $EA ; <indirect ref>
  0x0309F3 $89E3: -D0-I-  .byte $8B ; <indirect ref>
  0x0309F4 $89E4: -D0-I-  .byte $F0 ; <indirect ref>
  0x0309F5 $89E5: -D0-I-  .byte $8B ; <indirect ref>
  0x0309F6 $89E6: -D0-I-  .byte $04 ; <indirect ref>
  0x0309F7 $89E7: -D0-I-  .byte $8C ; <indirect ref>
  0x0309F8 $89E8: -D0-I-  .byte $47 ; <indirect ref>
  0x0309F9 $89E9: -D0-I-  .byte $8C ; <indirect ref>
  0x0309FA $89EA: ------  .byte $52
  0x0309FB $89EB: ------  .byte $8C
  0x0309FC $89EC: ------  .byte $52
  0x0309FD $89ED: ------  .byte $8C
  0x0309FE $89EE: ------  .byte $52
  0x0309FF $89EF: ------  .byte $8C
  0x030A00 $89F0: ------  .byte $52
  0x030A01 $89F1: ------  .byte $8C
  0x030A02 $89F2: -D0-I-  .byte $52 ; <indirect ref>
  0x030A03 $89F3: -D0-I-  .byte $8C ; <indirect ref>
  0x030A04 $89F4: ------  .byte $55
  0x030A05 $89F5: ------  .byte $8C
  0x030A06 $89F6: ------  .byte $55
  0x030A07 $89F7: ------  .byte $8C
  0x030A08 $89F8: ------  .byte $55
  0x030A09 $89F9: ------  .byte $8C
  0x030A0A $89FA: C--J--  AD 41 04 LDA  $0441
  0x030A0D $89FD: C-----  4C DC 8C JMP  $8CDC
  0x030A10 $8A00: C--J--  AD 41 04 LDA  $0441
  0x030A13 $8A03: C-----  4C A5 8C JMP  $8CA5
  0x030A16 $8A06: C--J--  AD FC 05 LDA  $05FC
  0x030A19 $8A09: C-----  4C DC 8C JMP  $8CDC
  0x030A1C $8A0C: C--J--  AD FC 05 LDA  $05FC
  0x030A1F $8A0F: C-----  4C A5 8C JMP  $8CA5
  0x030A22 $8A12: C--J--  AD 3B 04 LDA  $043B
  0x030A25 $8A15: C-----  20 09 C5 JSR  $C509
  0x030A28 $8A18: -D0-I-  .byte $20 ; <indirect ref>
  0x030A29 $8A19: -D0-I-  .byte $8A ; <indirect ref>
  0x030A2A $8A1A: -D0-I-  .byte $34 ; <indirect ref>
  0x030A2B $8A1B: -D0-I-  .byte $8A ; <indirect ref>
  0x030A2C $8A1C: -D0-I-  .byte $39 ; <indirect ref>
  0x030A2D $8A1D: -D0-I-  .byte $8A ; <indirect ref>
  0x030A2E $8A1E: -D0-I-  .byte $3E ; <indirect ref>
  0x030A2F $8A1F: -D0-I-  .byte $8A ; <indirect ref>
  0x030A30 $8A20: C--J--  A4 40    LDY  $40
  0x030A32 $8A22: C-----  B1 3E    LDA  ($3E),Y
  0x030A34 $8A24: C-----  D0 09    BNE  $8A2F
  0x030A36 $8A26: C-----  AD 4E 04 LDA  $044E
  0x030A39 $8A29: C-----  18       CLC  
  0x030A3A $8A2A: C-----  69 9A    ADC  #$9A
  0x030A3C $8A2C: C-----  4C 56 8A JMP  $8A56
  0x030A3F $8A2F: C-----  A9 9A    LDA  #$9A
  0x030A41 $8A31: C-----  4C 43 8A JMP  $8A43
  0x030A44 $8A34: C--J--  A9 C4    LDA  #$C4
  0x030A46 $8A36: C-----  4C 43 8A JMP  $8A43
  0x030A49 $8A39: C--J--  A9 BD    LDA  #$BD
  0x030A4B $8A3B: C-----  4C 43 8A JMP  $8A43
  0x030A4E $8A3E: C--J--  A9 C8    LDA  #$C8
  0x030A50 $8A40: C-----  4C 43 8A JMP  $8A43
  0x030A53 $8A43: C-----  AA       TAX  
  0x030A54 $8A44: C-----  A4 40    LDY  $40
  0x030A56 $8A46: C-----  E6 40    INC  $40
  0x030A58 $8A48: C-----  B1 3E    LDA  ($3E),Y
  0x030A5A $8A4A: C-----  F0 09    BEQ  $8A55
  0x030A5C $8A4C: C-----  A8       TAY  
  0x030A5D $8A4D: C-----  8A       TXA  
  0x030A5E $8A4E: C-----  18       CLC  
  0x030A5F $8A4F: C-----  79 30 04 ADC  $0430,Y
  0x030A62 $8A52: C-----  4C 56 8A JMP  $8A56
  0x030A65 $8A55: C-----  8A       TXA  
  0x030A66 $8A56: C-----  85 47    STA  $47
  0x030A68 $8A58: C-----  20 3C C5 JSR  $C53C
  0x030A6B $8A5B: C-----  A5 47    LDA  $47
  0x030A6D $8A5D: C-----  A0 09    LDY  #$09
  0x030A6F $8A5F: C-----  C9 AA    CMP  #$AA
  0x030A71 $8A61: C-----  F0 0B    BEQ  $8A6E
  0x030A73 $8A63: C-----  A0 00    LDY  #$00
  0x030A75 $8A65: C-----  B1 30    LDA  ($30),Y
  0x030A77 $8A67: C-----  C9 FC    CMP  #$FC
  0x030A79 $8A69: C-----  F0 03    BEQ  $8A6E
  0x030A7B $8A6B: C-----  C8       INY  
  0x030A7C $8A6C: C-----  D0 F7    BNE  $8A65
  0x030A7E $8A6E: C-----  98       TYA  
  0x030A7F $8A6F: C-----  85 49    STA  $49
  0x030A81 $8A71: C-----  A9 00    LDA  #$00
  0x030A83 $8A73: C-----  85 46    STA  $46
  0x030A85 $8A75: C-----  A4 46    LDY  $46
  0x030A87 $8A77: C-----  B1 30    LDA  ($30),Y
  0x030A89 $8A79: C-----  20 24 C5 JSR  $C524
  0x030A8C $8A7C: C-----  20 9F 8C JSR  $8C9F
  0x030A8F $8A7F: C-----  E6 46    INC  $46
  0x030A91 $8A81: C-----  C6 49    DEC  $49
  0x030A93 $8A83: C-----  D0 F0    BNE  $8A75
  0x030A95 $8A85: C-----  60       RTS  
  0x030A96 $8A86: C--J--  A4 40    LDY  $40
  0x030A98 $8A88: C-----  E6 40    INC  $40
  0x030A9A $8A8A: C-----  B1 3E    LDA  ($3E),Y
  0x030A9C $8A8C: C-----  AA       TAX  
  0x030A9D $8A8D: C-----  BD 01 06 LDA  $0601,X
  0x030AA0 $8A90: C-----  4C 1A 8D JMP  $8D1A
  0x030AA3 $8A93: C--J--  A4 40    LDY  $40
  0x030AA5 $8A95: C-----  E6 40    INC  $40
  0x030AA7 $8A97: C-----  B1 3E    LDA  ($3E),Y
  0x030AA9 $8A99: C-----  F0 04    BEQ  $8A9F
  0x030AAB $8A9B: C-----  AA       TAX  
  0x030AAC $8A9C: C-----  BD 30 04 LDA  $0430,X
  0x030AAF $8A9F: C-----  AE 1E 06 LDX  $061E
  0x030AB2 $8AA2: C-----  BC 0B 06 LDY  $060B,X
  0x030AB5 $8AA5: C-----  18       CLC  
  0x030AB6 $8AA6: C-----  79 AC 8A ADC  $8AAC,Y
  0x030AB9 $8AA9: C-----  4C 6C 8D JMP  $8D6C
  0x030ABC $8AAC: -D0---  .byte $CD
  0x030ABD $8AAD: -D0---  .byte $D1
  0x030ABE $8AAE: -D0---  .byte $D7
  0x030ABF $8AAF: C--J--  AE 1E 06 LDX  $061E
  0x030AC2 $8AB2: C-----  BD 01 06 LDA  $0601,X
  0x030AC5 $8AB5: C-----  4C DC 8C JMP  $8CDC
  0x030AC8 $8AB8: C--J--  AE 1E 06 LDX  $061E
  0x030ACB $8ABB: C-----  BD 01 06 LDA  $0601,X
  0x030ACE $8ABE: C-----  4C A5 8C JMP  $8CA5
  0x030AD1 $8AC1: C--J--  A4 40    LDY  $40
  0x030AD3 $8AC3: C-----  E6 40    INC  $40
  0x030AD5 $8AC5: C-----  B1 3E    LDA  ($3E),Y
  0x030AD7 $8AC7: C-----  AA       TAX  
  0x030AD8 $8AC8: C-----  BD 31 04 LDA  $0431,X
  0x030ADB $8ACB: C-----  E8       INX  
  0x030ADC $8ACC: C-----  EC 30 04 CPX  $0430
  0x030ADF $8ACF: C-----  90 03    BCC  $8AD4
  0x030AE1 $8AD1: C-----  F0 01    BEQ  $8AD4
  0x030AE3 $8AD3: C-----  60       RTS  
  0x030AE4 $8AD4: C-----  4C 1A 8D JMP  $8D1A
  0x030AE7 $8AD7: C--J--  AD FB 05 LDA  $05FB
  0x030AEA $8ADA: C-----  49 0B    EOR  #$0B
  0x030AEC $8ADC: C-----  4C DC 8C JMP  $8CDC
  0x030AEF $8ADF: C--J--  AD FB 05 LDA  $05FB
  0x030AF2 $8AE2: C-----  49 0B    EOR  #$0B
  0x030AF4 $8AE4: C-----  4C A5 8C JMP  $8CA5
  0x030AF7 $8AE7: C--J--  A4 40    LDY  $40
  0x030AF9 $8AE9: C-----  E6 40    INC  $40
  0x030AFB $8AEB: C-----  AE 2A 00 LDX  $002A
  0x030AFE $8AEE: C-----  B1 3E    LDA  ($3E),Y
  0x030B00 $8AF0: C-----  F0 03    BEQ  $8AF5
  0x030B02 $8AF2: C-----  AE 2B 00 LDX  $002B
  0x030B05 $8AF5: C-----  BD 0A 8B LDA  $8B0A,X
  0x030B08 $8AF8: C-----  48       PHA  
  0x030B09 $8AF9: C-----  8A       TXA  
  0x030B0A $8AFA: C-----  18       CLC  
  0x030B0B $8AFB: C-----  69 76    ADC  #$76
  0x030B0D $8AFD: C-----  C9 9A    CMP  #$9A
  0x030B0F $8AFF: C-----  90 02    BCC  $8B03
  0x030B11 $8B01: ------  .byte $A9
  0x030B12 $8B02: ------  .byte $99
  0x030B13 $8B03: C-----  20 3C C5 JSR  $C53C
  0x030B16 $8B06: C-----  68       PLA  
  0x030B17 $8B07: C-----  4C 6F 8A JMP  $8A6F
  0x030B1A $8B0A: -D0---  .byte $03
  0x030B1B $8B0B: -D0---  .byte $04
  0x030B1C $8B0C: -D0---  .byte $03
  0x030B1D $8B0D: -D0---  .byte $03
  0x030B1E $8B0E: -D0---  .byte $03
  0x030B1F $8B0F: -D0---  .byte $04
  0x030B20 $8B10: -D0---  .byte $03
  0x030B21 $8B11: -D0---  .byte $04
  0x030B22 $8B12: -D0---  .byte $03
  0x030B23 $8B13: -D0---  .byte $03
  0x030B24 $8B14: -D0---  .byte $03
  0x030B25 $8B15: -D0---  .byte $04
  0x030B26 $8B16: -D0---  .byte $03
  0x030B27 $8B17: -D0---  .byte $03
  0x030B28 $8B18: -D0---  .byte $04
  0x030B29 $8B19: -D0---  .byte $03
  0x030B2A $8B1A: -D0---  .byte $03
  0x030B2B $8B1B: -D0---  .byte $03
  0x030B2C $8B1C: -D0---  .byte $03
  0x030B2D $8B1D: -D0---  .byte $03
  0x030B2E $8B1E: -D0---  .byte $03
  0x030B2F $8B1F: -D0---  .byte $03
  0x030B30 $8B20: -D0---  .byte $03
  0x030B31 $8B21: -D0---  .byte $03
  0x030B32 $8B22: -D0---  .byte $04
  0x030B33 $8B23: -D0---  .byte $03
  0x030B34 $8B24: -D0---  .byte $03
  0x030B35 $8B25: -D0---  .byte $03
  0x030B36 $8B26: -D0---  .byte $04
  0x030B37 $8B27: -D0---  .byte $04
  0x030B38 $8B28: -D0---  .byte $04
  0x030B39 $8B29: -D0---  .byte $04
  0x030B3A $8B2A: -D0---  .byte $04
  0x030B3B $8B2B: -D0---  .byte $03
  0x030B3C $8B2C: -D0---  .byte $03
  0x030B3D $8B2D: -D0---  .byte $04
  0x030B3E $8B2E: ------  .byte $04
  0x030B3F $8B2F: C--J--  A4 40    LDY  $40
  0x030B41 $8B31: C-----  E6 40    INC  $40
  0x030B43 $8B33: C-----  B1 3E    LDA  ($3E),Y
  0x030B45 $8B35: C-----  AA       TAX  
  0x030B46 $8B36: C-----  BD 28 00 LDA  $0028,X
  0x030B49 $8B39: C-----  AC 27 00 LDY  $0027
  0x030B4C $8B3C: C-----  C0 04    CPY  #$04
  0x030B4E $8B3E: C-----  D0 03    BNE  $8B43
  0x030B50 $8B40: C-----  BD 10 06 LDA  $0610,X
  0x030B53 $8B43: C-----  A2 00    LDX  #$00
  0x030B55 $8B45: C-----  4C 55 8C JMP  $8C55
  0x030B58 $8B48: C--J--  A9 00    LDA  #$00
  0x030B5A $8B4A: C-----  85 47    STA  $47
  0x030B5C $8B4C: C-----  AD 27 00 LDA  $0027
  0x030B5F $8B4F: C-----  0A       ASL  A
  0x030B60 $8B50: C-----  0A       ASL  A
  0x030B61 $8B51: C-----  6D 27 00 ADC  $0027
  0x030B64 $8B54: C-----  65 47    ADC  $47
  0x030B66 $8B56: C-----  AA       TAX  
  0x030B67 $8B57: C-----  BD 72 8B LDA  $8B72,X
  0x030B6A $8B5A: C-----  C9 FF    CMP  #$FF
  0x030B6C $8B5C: C-----  F0 09    BEQ  $8B67
  0x030B6E $8B5E: C-----  20 24 C5 JSR  $C524
  0x030B71 $8B61: C-----  20 9F 8C JSR  $8C9F
  0x030B74 $8B64: C-----  4C 69 8B JMP  $8B69
  0x030B77 $8B67: C-----  E6 3D    INC  $3D
  0x030B79 $8B69: C-----  E6 47    INC  $47
  0x030B7B $8B6B: C-----  A5 47    LDA  $47
  0x030B7D $8B6D: C-----  C9 05    CMP  #$05
  0x030B7F $8B6F: C-----  D0 DB    BNE  $8B4C
  0x030B81 $8B71: C-----  60       RTS  
  0x030B82 $8B72: -D0---  .byte $FF
  0x030B83 $8B73: -D0---  .byte $A8
  0x030B84 $8B74: -D0---  .byte $2E
  0x030B85 $8B75: -D0---  .byte $FF
  0x030B86 $8B76: -D0---  .byte $FF
  0x030B87 $8B77: -D0---  .byte $FF
  0x030B88 $8B78: -D0---  .byte $0A
  0x030B89 $8B79: -D0---  .byte $03
  0x030B8A $8B7A: -D0---  .byte $FF
  0x030B8B $8B7B: -D0---  .byte $FF
  0x030B8C $8B7C: -D0---  .byte $04
  0x030B8D $8B7D: -D0---  .byte $2E
  0x030B8E $8B7E: -D0---  .byte $00
  0x030B8F $8B7F: -D0---  .byte $A8
  0x030B90 $8B80: -D0---  .byte $2E
  0x030B91 $8B81: -D0---  .byte $04
  0x030B92 $8B82: -D0---  .byte $2E
  0x030B93 $8B83: -D0---  .byte $00
  0x030B94 $8B84: -D0---  .byte $0A
  0x030B95 $8B85: -D0---  .byte $03
  0x030B96 $8B86: ------  .byte $FF
  0x030B97 $8B87: ------  .byte $8D
  0x030B98 $8B88: ------  .byte $8B
  0x030B99 $8B89: ------  .byte $FF
  0x030B9A $8B8A: ------  .byte $FF
  0x030B9B $8B8B: C--J--  A2 00    LDX  #$00
  0x030B9D $8B8D: C-----  AD F7 05 LDA  $05F7
  0x030BA0 $8B90: C-----  AC F8 05 LDY  $05F8
  0x030BA3 $8B93: C-----  38       SEC  
  0x030BA4 $8B94: C-----  E9 06    SBC  #$06
  0x030BA6 $8B96: C-----  B0 03    BCS  $8B9B
  0x030BA8 $8B98: C-----  88       DEY  
  0x030BA9 $8B99: C-----  30 03    BMI  $8B9E
  0x030BAB $8B9B: C-----  E8       INX  
  0x030BAC $8B9C: C-----  D0 F5    BNE  $8B93
  0x030BAE $8B9E: C-----  69 06    ADC  #$06
  0x030BB0 $8BA0: C-----  0A       ASL  A
  0x030BB1 $8BA1: C-----  A8       TAY  
  0x030BB2 $8BA2: C-----  8A       TXA  
  0x030BB3 $8BA3: C-----  48       PHA  
  0x030BB4 $8BA4: C-----  B9 C9 8B LDA  $8BC9,Y
  0x030BB7 $8BA7: C-----  48       PHA  
  0x030BB8 $8BA8: C-----  B9 CA 8B LDA  $8BCA,Y
  0x030BBB $8BAB: C-----  A0 00    LDY  #$00
  0x030BBD $8BAD: C-----  20 85 8C JSR  $8C85
  0x030BC0 $8BB0: C-----  C6 3D    DEC  $3D
  0x030BC2 $8BB2: C-----  68       PLA  
  0x030BC3 $8BB3: C-----  A0 00    LDY  #$00
  0x030BC5 $8BB5: C-----  20 85 8C JSR  $8C85
  0x030BC8 $8BB8: C-----  C6 3D    DEC  $3D
  0x030BCA $8BBA: C-----  A9 77    LDA  #$77
  0x030BCC $8BBC: C-----  A0 00    LDY  #$00
  0x030BCE $8BBE: C-----  20 85 8C JSR  $8C85
  0x030BD1 $8BC1: C-----  C6 3D    DEC  $3D
  0x030BD3 $8BC3: C-----  68       PLA  
  0x030BD4 $8BC4: C-----  A2 00    LDX  #$00
  0x030BD6 $8BC6: C-----  4C 55 8C JMP  $8C55
  0x030BD9 $8BC9: -D0---  .byte $33
  0x030BDA $8BCA: -D0---  .byte $33
  0x030BDB $8BCB: -D0---  .byte $34
  0x030BDC $8BCC: -D0---  .byte $33
  0x030BDD $8BCD: -D0---  .byte $35
  0x030BDE $8BCE: -D0---  .byte $33
  0x030BDF $8BCF: -D0---  .byte $36
  0x030BE0 $8BD0: -D0---  .byte $33
  0x030BE1 $8BD1: -D0---  .byte $37
  0x030BE2 $8BD2: -D0---  .byte $33
  0x030BE3 $8BD3: -D0---  .byte $38
  0x030BE4 $8BD4: -D0---  .byte $33
  0x030BE5 $8BD5: C--J--  A4 40    LDY  $40
  0x030BE7 $8BD7: C-----  E6 40    INC  $40
  0x030BE9 $8BD9: C-----  B1 3E    LDA  ($3E),Y
  0x030BEB $8BDB: C-----  4C 1A 8D JMP  $8D1A
  0x030BEE $8BDE: C--J--  AD FD 05 LDA  $05FD
  0x030BF1 $8BE1: C-----  4C 1A 8D JMP  $8D1A
  0x030BF4 $8BE4: ------  .byte $AD
  0x030BF5 $8BE5: ------  .byte $FD
  0x030BF6 $8BE6: ------  .byte $05
  0x030BF7 $8BE7: ------  .byte $4C
  0x030BF8 $8BE8: ------  .byte $A5
  0x030BF9 $8BE9: ------  .byte $8C
  0x030BFA $8BEA: C--J--  AD 41 04 LDA  $0441
  0x030BFD $8BED: C-----  4C 1A 8D JMP  $8D1A
  0x030C00 $8BF0: C--J--  A4 40    LDY  $40
  0x030C02 $8BF2: C-----  E6 40    INC  $40
  0x030C04 $8BF4: C-----  B1 3E    LDA  ($3E),Y
  0x030C06 $8BF6: C-----  20 0C C5 JSR  $C50C
  0x030C09 $8BF9: C-----  A0 02    LDY  #$02
  0x030C0B $8BFB: C-----  B1 34    LDA  ($34),Y
  0x030C0D $8BFD: C-----  AA       TAX  
  0x030C0E $8BFE: C-----  88       DEY  
  0x030C0F $8BFF: C-----  B1 34    LDA  ($34),Y
  0x030C11 $8C01: C-----  4C 55 8C JMP  $8C55
  0x030C14 $8C04: C--J--  AD 41 04 LDA  $0441
  0x030C17 $8C07: C-----  85 49    STA  $49
  0x030C19 $8C09: C-----  A5 49    LDA  $49
  0x030C1B $8C0B: C-----  C9 0B    CMP  #$0B
  0x030C1D $8C0D: C-----  F0 37    BEQ  $8C46
  0x030C1F $8C0F: C-----  AE 30 04 LDX  $0430
  0x030C22 $8C12: C-----  F0 0E    BEQ  $8C22
  0x030C24 $8C14: C-----  DD 30 04 CMP  $0430,X
  0x030C27 $8C17: C-----  F0 05    BEQ  $8C1E
  0x030C29 $8C19: C-----  CA       DEX  
  0x030C2A $8C1A: C-----  D0 F8    BNE  $8C14
  0x030C2C $8C1C: C-----  F0 04    BEQ  $8C22
  0x030C2E $8C1E: C-----  E6 49    INC  $49
  0x030C30 $8C20: C-----  D0 E7    BNE  $8C09
  0x030C32 $8C22: C-----  E6 49    INC  $49
  0x030C34 $8C24: C-----  20 1A 8D JSR  $8D1A
  0x030C37 $8C27: C-----  A4 3C    LDY  $3C
  0x030C39 $8C29: C-----  88       DEY  
  0x030C3A $8C2A: C-----  F0 1A    BEQ  $8C46
  0x030C3C $8C2C: C-----  A9 17    LDA  #$17
  0x030C3E $8C2E: C-----  85 3D    STA  $3D
  0x030C40 $8C30: C-----  A5 49    LDA  $49
  0x030C42 $8C32: C-----  38       SEC  
  0x030C43 $8C33: C-----  E9 01    SBC  #$01
  0x030C45 $8C35: C-----  A2 01    LDX  #$01
  0x030C47 $8C37: C-----  20 27 C5 JSR  $C527
  0x030C4A $8C3A: C-----  A5 32    LDA  $32
  0x030C4C $8C3C: C-----  A6 33    LDX  $33
  0x030C4E $8C3E: C-----  20 55 8C JSR  $8C55
  0x030C51 $8C41: C-----  A5 49    LDA  $49
  0x030C53 $8C43: C-----  8D 41 04 STA  $0441
  0x030C56 $8C46: C-----  60       RTS  
  0x030C57 $8C47: C--J--  AD FD 05 LDA  $05FD
  0x030C5A $8C4A: C-----  18       CLC  
  0x030C5B $8C4B: C-----  69 01    ADC  #$01
  0x030C5D $8C4D: C-----  A2 00    LDX  #$00
  0x030C5F $8C4F: C-----  4C 55 8C JMP  $8C55
  0x030C62 $8C52: C--J--  68       PLA  
  0x030C63 $8C53: C-----  68       PLA  
  0x030C64 $8C54: C-----  60       RTS  
  0x030C65 $8C55: C-----  A4 3C    LDY  $3C
  0x030C67 $8C57: C-----  88       DEY  
  0x030C68 $8C58: C-----  F0 2A    BEQ  $8C84
  0x030C6A $8C5A: C-----  85 6F    STA  $6F
  0x030C6C $8C5C: C-----  86 70    STX  $70
  0x030C6E $8C5E: C-----  A9 0A    LDA  #$0A
  0x030C70 $8C60: C-----  85 71    STA  $71
  0x030C72 $8C62: C-----  A9 00    LDA  #$00
  0x030C74 $8C64: C-----  85 74    STA  $74
  0x030C76 $8C66: C-----  20 1E C5 JSR  $C51E
  0x030C79 $8C69: C-----  A5 72    LDA  $72
  0x030C7B $8C6B: C-----  20 7A 8C JSR  $8C7A
  0x030C7E $8C6E: C-----  A5 70    LDA  $70
  0x030C80 $8C70: C-----  D0 F4    BNE  $8C66
  0x030C82 $8C72: C-----  A5 6F    LDA  $6F
  0x030C84 $8C74: C-----  F0 0E    BEQ  $8C84
  0x030C86 $8C76: C-----  C9 0A    CMP  #$0A
  0x030C88 $8C78: C-----  B0 EC    BCS  $8C66
  0x030C8A $8C7A: C-----  18       CLC  
  0x030C8B $8C7B: C-----  69 33    ADC  #$33
  0x030C8D $8C7D: C-----  A0 00    LDY  #$00
  0x030C8F $8C7F: C-----  20 85 8C JSR  $8C85
  0x030C92 $8C82: C-----  C6 3D    DEC  $3D
  0x030C94 $8C84: C-----  60       RTS  
  0x030C95 $8C85: C-----  A6 3D    LDX  $3D
  0x030C97 $8C87: C-----  C6 3C    DEC  $3C
  0x030C99 $8C89: C-----  D0 0E    BNE  $8C99
  0x030C9B $8C8B: C-----  98       TYA  
  0x030C9C $8C8C: C-----  F0 0E    BEQ  $8C9C
  0x030C9E $8C8E: C-----  AC C6 05 LDY  $05C6
  0x030CA1 $8C91: C-----  C0 1B    CPY  #$1B
  0x030CA3 $8C93: C-----  F0 04    BEQ  $8C99
  0x030CA5 $8C95: C-----  A4 45    LDY  $45
  0x030CA7 $8C97: C-----  F0 03    BEQ  $8C9C
  0x030CA9 $8C99: C-----  9D A8 04 STA  $04A8,X
  0x030CAC $8C9C: C-----  E6 3C    INC  $3C
  0x030CAE $8C9E: C-----  60       RTS  
  0x030CAF $8C9F: C-----  20 85 8C JSR  $8C85
  0x030CB2 $8CA2: C-----  E6 3D    INC  $3D
  0x030CB4 $8CA4: C-----  60       RTS  
  0x030CB5 $8CA5: C-----  48       PHA  
  0x030CB6 $8CA6: C-----  A4 40    LDY  $40
  0x030CB8 $8CA8: C-----  E6 40    INC  $40
  0x030CBA $8CAA: C-----  B1 3E    LDA  ($3E),Y
  0x030CBC $8CAC: C-----  D0 0F    BNE  $8CBD
  0x030CBE $8CAE: C-----  68       PLA  
  0x030CBF $8CAF: C-----  20 0C C5 JSR  $C50C
  0x030CC2 $8CB2: C-----  A0 02    LDY  #$02
  0x030CC4 $8CB4: C-----  B1 34    LDA  ($34),Y
  0x030CC6 $8CB6: C-----  AA       TAX  
  0x030CC7 $8CB7: C-----  88       DEY  
  0x030CC8 $8CB8: C-----  B1 34    LDA  ($34),Y
  0x030CCA $8CBA: C-----  4C D9 8C JMP  $8CD9
  0x030CCD $8CBD: C-----  29 7F    AND  #$7F
  0x030CCF $8CBF: C-----  C9 07    CMP  #$07
  0x030CD1 $8CC1: C-----  90 0D    BCC  $8CD0
  0x030CD3 $8CC3: C-----  C9 18    CMP  #$18
  0x030CD5 $8CC5: C-----  B0 09    BCS  $8CD0
  0x030CD7 $8CC7: C-----  AE 4E 04 LDX  $044E
  0x030CDA $8CCA: C-----  CA       DEX  
  0x030CDB $8CCB: C-----  F0 03    BEQ  $8CD0
  0x030CDD $8CCD: C-----  18       CLC  
  0x030CDE $8CCE: C-----  69 08    ADC  #$08
  0x030CE0 $8CD0: C-----  AA       TAX  
  0x030CE1 $8CD1: C-----  68       PLA  
  0x030CE2 $8CD2: C-----  20 27 C5 JSR  $C527
  0x030CE5 $8CD5: C-----  A5 32    LDA  $32
  0x030CE7 $8CD7: C-----  A6 33    LDX  $33
  0x030CE9 $8CD9: C-----  4C 55 8C JMP  $8C55
  0x030CEC $8CDC: C-----  48       PHA  
  0x030CED $8CDD: C-----  C9 0B    CMP  #$0B
  0x030CEF $8CDF: C-----  90 02    BCC  $8CE3
  0x030CF1 $8CE1: ------  .byte $E9
  0x030CF2 $8CE2: ------  .byte $0B
  0x030CF3 $8CE3: C-----  0A       ASL  A
  0x030CF4 $8CE4: C-----  48       PHA  
  0x030CF5 $8CE5: C-----  AA       TAX  
  0x030CF6 $8CE6: C-----  BD 04 8D LDA  $8D04,X
  0x030CF9 $8CE9: C-----  20 24 C5 JSR  $C524
  0x030CFC $8CEC: C-----  20 9F 8C JSR  $8C9F
  0x030CFF $8CEF: C-----  68       PLA  
  0x030D00 $8CF0: C-----  AA       TAX  
  0x030D01 $8CF1: C-----  BD 05 8D LDA  $8D05,X
  0x030D04 $8CF4: C-----  20 24 C5 JSR  $C524
  0x030D07 $8CF7: C-----  20 9F 8C JSR  $8C9F
  0x030D0A $8CFA: C-----  A9 00    LDA  #$00
  0x030D0C $8CFC: C-----  A8       TAY  
  0x030D0D $8CFD: C-----  20 9F 8C JSR  $8C9F
  0x030D10 $8D00: C-----  68       PLA  
  0x030D11 $8D01: C-----  4C 1A 8D JMP  $8D1A
  0x030D14 $8D04: -D0---  .byte $87
  0x030D15 $8D05: -D0---  .byte $8B
  0x030D16 $8D06: -D0---  .byte $84
  0x030D17 $8D07: -D0---  .byte $86
  0x030D18 $8D08: -D0---  .byte $84
  0x030D19 $8D09: -D0---  .byte $86
  0x030D1A $8D0A: -D0---  .byte $84
  0x030D1B $8D0B: -D0---  .byte $86
  0x030D1C $8D0C: -D0---  .byte $84
  0x030D1D $8D0D: -D0---  .byte $86
  0x030D1E $8D0E: -D0---  .byte $8C
  0x030D1F $8D0F: -D0---  .byte $86
  0x030D20 $8D10: -D0---  .byte $86
  0x030D21 $8D11: -D0---  .byte $92
  0x030D22 $8D12: -D0---  .byte $8C
  0x030D23 $8D13: -D0---  .byte $86
  0x030D24 $8D14: -D0---  .byte $86
  0x030D25 $8D15: -D0---  .byte $92
  0x030D26 $8D16: -D0---  .byte $8C
  0x030D27 $8D17: -D0---  .byte $86
  0x030D28 $8D18: -D0---  .byte $86
  0x030D29 $8D19: -D0---  .byte $92
  0x030D2A $8D1A: C-----  85 47    STA  $47
  0x030D2C $8D1C: C-----  20 0C C5 JSR  $C50C
  0x030D2F $8D1F: C-----  A0 00    LDY  #$00
  0x030D31 $8D21: C-----  B1 34    LDA  ($34),Y
  0x030D33 $8D23: C-----  D0 47    BNE  $8D6C
  0x030D35 $8D25: C-----  A5 47    LDA  $47
  0x030D37 $8D27: C-----  38       SEC  
  0x030D38 $8D28: C-----  E9 0B    SBC  #$0B
  0x030D3A $8D2A: C-----  0A       ASL  A
  0x030D3B $8D2B: C-----  0A       ASL  A
  0x030D3C $8D2C: C-----  AA       TAX  
  0x030D3D $8D2D: C-----  A0 00    LDY  #$00
  0x030D3F $8D2F: C-----  BD 40 8D LDA  $8D40,X
  0x030D42 $8D32: C-----  99 EE 05 STA  $05EE,Y
  0x030D45 $8D35: C-----  E8       INX  
  0x030D46 $8D36: C-----  C8       INY  
  0x030D47 $8D37: C-----  C0 04    CPY  #$04
  0x030D49 $8D39: C-----  D0 F4    BNE  $8D2F
  0x030D4B $8D3B: C-----  A9 00    LDA  #$00
  0x030D4D $8D3D: C-----  4C 6C 8D JMP  $8D6C
  0x030D50 $8D40: ------  .byte $47
  0x030D51 $8D41: ------  .byte $7D
  0x030D52 $8D42: ------  .byte $CD
  0x030D53 $8D43: ------  .byte $7D
  0x030D54 $8D44: -D0---  .byte $00
  0x030D55 $8D45: -D0---  .byte $35
  0x030D56 $8D46: -D0---  .byte $AF
  0x030D57 $8D47: -D0---  .byte $2E
  0x030D58 $8D48: -D0---  .byte $00
  0x030D59 $8D49: -D0---  .byte $36
  0x030D5A $8D4A: -D0---  .byte $AF
  0x030D5B $8D4B: -D0---  .byte $2E
  0x030D5C $8D4C: -D0---  .byte $00
  0x030D5D $8D4D: -D0---  .byte $37
  0x030D5E $8D4E: -D0---  .byte $AF
  0x030D5F $8D4F: -D0---  .byte $2E
  0x030D60 $8D50: -D0---  .byte $00
  0x030D61 $8D51: -D0---  .byte $38
  0x030D62 $8D52: -D0---  .byte $AF
  0x030D63 $8D53: -D0---  .byte $2E
  0x030D64 $8D54: -D0---  .byte $00
  0x030D65 $8D55: -D0---  .byte $39
  0x030D66 $8D56: -D0---  .byte $AF
  0x030D67 $8D57: -D0---  .byte $2E
  0x030D68 $8D58: -D0---  .byte $00
  0x030D69 $8D59: -D0---  .byte $3A
  0x030D6A $8D5A: -D0---  .byte $AF
  0x030D6B $8D5B: -D0---  .byte $2E
  0x030D6C $8D5C: -D0---  .byte $00
  0x030D6D $8D5D: -D0---  .byte $3B
  0x030D6E $8D5E: -D0---  .byte $AF
  0x030D6F $8D5F: -D0---  .byte $2E
  0x030D70 $8D60: -D0---  .byte $00
  0x030D71 $8D61: -D0---  .byte $3C
  0x030D72 $8D62: -D0---  .byte $AF
  0x030D73 $8D63: -D0---  .byte $2E
  0x030D74 $8D64: -D0---  .byte $34
  0x030D75 $8D65: -D0---  .byte $33
  0x030D76 $8D66: -D0---  .byte $AF
  0x030D77 $8D67: -D0---  .byte $2E
  0x030D78 $8D68: -D0---  .byte $34
  0x030D79 $8D69: -D0---  .byte $34
  0x030D7A $8D6A: -D0---  .byte $AF
  0x030D7B $8D6B: -D0---  .byte $2E
  0x030D7C $8D6C: C-----  20 3C C5 JSR  $C53C
  0x030D7F $8D6F: C-----  A0 00    LDY  #$00
  0x030D81 $8D71: C-----  B1 30    LDA  ($30),Y
  0x030D83 $8D73: C-----  C9 E0    CMP  #$E0
  0x030D85 $8D75: C-----  B0 0F    BCS  $8D86
  0x030D87 $8D77: C-----  98       TYA  
  0x030D88 $8D78: C-----  48       PHA  
  0x030D89 $8D79: C-----  B1 30    LDA  ($30),Y
  0x030D8B $8D7B: C-----  20 24 C5 JSR  $C524
  0x030D8E $8D7E: C-----  20 9F 8C JSR  $8C9F
  0x030D91 $8D81: C-----  68       PLA  
  0x030D92 $8D82: C-----  A8       TAY  
  0x030D93 $8D83: C-----  C8       INY  
  0x030D94 $8D84: C-----  D0 EB    BNE  $8D71
  0x030D96 $8D86: C-----  98       TYA  
  0x030D97 $8D87: C-----  38       SEC  
  0x030D98 $8D88: C-----  E9 05    SBC  #$05
  0x030D9A $8D8A: C-----  10 11    BPL  $8D9D
  0x030D9C $8D8C: C-----  49 FF    EOR  #$FF
  0x030D9E $8D8E: C-----  18       CLC  
  0x030D9F $8D8F: C-----  69 01    ADC  #$01
  0x030DA1 $8D91: C-----  85 47    STA  $47
  0x030DA3 $8D93: C-----  A9 00    LDA  #$00
  0x030DA5 $8D95: C-----  A8       TAY  
  0x030DA6 $8D96: C-----  20 9F 8C JSR  $8C9F
  0x030DA9 $8D99: C-----  C6 47    DEC  $47
  0x030DAB $8D9B: C-----  D0 F6    BNE  $8D93
  0x030DAD $8D9D: C-----  60       RTS  
  0x030DAE $8D9E: -D0---  .byte $9C
  0x030DAF $8D9F: -D0---  .byte $A8
  0x030DB0 $8DA0: -D0---  .byte $9D
  0x030DB1 $8DA1: -D0---  .byte $AA
  0x030DB2 $8DA2: -D0---  .byte $00
  0x030DB3 $8DA3: -D0---  .byte $AB
  0x030DB4 $8DA4: -D0---  .byte $9E
  0x030DB5 $8DA5: -D0---  .byte $A9
  0x030DB6 $8DA6: -D0---  .byte $9F
  0x030DB7 $8DA7: -D0---  .byte $88
  0x030DB8 $8DA8: -D0---  .byte $89
  0x030DB9 $8DA9: -D0---  .byte $90
  0x030DBA $8DAA: -D0---  .byte $8A
  0x030DBB $8DAB: -D0---  .byte $00
  0x030DBC $8DAC: -D0---  .byte $8A
  0x030DBD $8DAD: -D0---  .byte $8E
  0x030DBE $8DAE: -D0---  .byte $89
  0x030DBF $8DAF: -D0---  .byte $93
  0x030DC0 $8DB0: -D0---  .byte $00
  0x030DC1 $8DB1: -D0---  .byte $00
  0x030DC2 $8DB2: -D0---  .byte $00
  0x030DC3 $8DB3: -D0---  .byte $00
  0x030DC4 $8DB4: -D0---  .byte $00
  0x030DC5 $8DB5: -D0---  .byte $00
  0x030DC6 $8DB6: -D0---  .byte $00
  0x030DC7 $8DB7: -D0---  .byte $00
  0x030DC8 $8DB8: -D0---  .byte $00
  0x030DC9 $8DB9: -D0---  .byte $E4
  0x030DCA $8DBA: -D0---  .byte $E5
  0x030DCB $8DBB: -D0---  .byte $F0
  0x030DCC $8DBC: -D0---  .byte $E6
  0x030DCD $8DBD: -D0---  .byte $00
  0x030DCE $8DBE: -D0---  .byte $F2
  0x030DCF $8DBF: -D0---  .byte $EC
  0x030DD0 $8DC0: -D0---  .byte $ED
  0x030DD1 $8DC1: -D0---  .byte $F8
  0x030DD2 $8DC2: -D0---  .byte $E0
  0x030DD3 $8DC3: -D0---  .byte $8D
  0x030DD4 $8DC4: -D0---  .byte $37
  0x030DD5 $8DC5: -D0---  .byte $8E
  0x030DD6 $8DC6: -D0---  .byte $94
  0x030DD7 $8DC7: -D0---  .byte $8E
  0x030DD8 $8DC8: ------  .byte $F6
  0x030DD9 $8DC9: ------  .byte $8E
  0x030DDA $8DCA: -D0---  .byte $6B
  0x030DDB $8DCB: -D0---  .byte $8F
  0x030DDC $8DCC: -D0---  .byte $BF
  0x030DDD $8DCD: -D0---  .byte $8F
  0x030DDE $8DCE: -D0---  .byte $15
  0x030DDF $8DCF: -D0---  .byte $90
  0x030DE0 $8DD0: -D0---  .byte $73
  0x030DE1 $8DD1: -D0---  .byte $90
  0x030DE2 $8DD2: -D0---  .byte $DF
  0x030DE3 $8DD3: -D0---  .byte $90
  0x030DE4 $8DD4: -D0---  .byte $40
  0x030DE5 $8DD5: -D0---  .byte $91
  0x030DE6 $8DD6: -D0---  .byte $40
  0x030DE7 $8DD7: -D0---  .byte $91
  0x030DE8 $8DD8: -D0---  .byte $40
  0x030DE9 $8DD9: -D0---  .byte $91
  0x030DEA $8DDA: -D0---  .byte $B0
  0x030DEB $8DDB: -D0---  .byte $91
  0x030DEC $8DDC: -D0---  .byte $B0
  0x030DED $8DDD: -D0---  .byte $91
  0x030DEE $8DDE: -D0---  .byte $B0
  0x030DEF $8DDF: -D0---  .byte $91
  0x030DF0 $8DE0: -D0-I-  .byte $2C ; <indirect ref>
  0x030DF1 $8DE1: -D0-I-  .byte $22 ; <indirect ref>
  0x030DF2 $8DE2: -D0-I-  .byte $14 ; <indirect ref>
  0x030DF3 $8DE3: -D0-I-  .byte $94 ; <indirect ref>
  0x030DF4 $8DE4: -D0-I-  .byte $94 ; <indirect ref>
  0x030DF5 $8DE5: -D0-I-  .byte $82 ; <indirect ref>
  0x030DF6 $8DE6: -D0-I-  .byte $10 ; <indirect ref>
  0x030DF7 $8DE7: -D0-I-  .byte $9C ; <indirect ref>
  0x030DF8 $8DE8: -D0-I-  .byte $A8 ; <indirect ref>
  0x030DF9 $8DE9: -D0-I-  .byte $A8 ; <indirect ref>
  0x030DFA $8DEA: -D0-I-  .byte $A0 ; <indirect ref>
  0x030DFB $8DEB: -D0-I-  .byte $A8 ; <indirect ref>
  0x030DFC $8DEC: -D0-I-  .byte $A8 ; <indirect ref>
  0x030DFD $8DED: -D0-I-  .byte $A0 ; <indirect ref>
  0x030DFE $8DEE: -D0-I-  .byte $A8 ; <indirect ref>
  0x030DFF $8DEF: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E00 $8DF0: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E01 $8DF1: -D0-I-  .byte $A0 ; <indirect ref>
  0x030E02 $8DF2: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E03 $8DF3: -D0-I-  .byte $A0 ; <indirect ref>
  0x030E04 $8DF4: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E05 $8DF5: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E06 $8DF6: -D0-I-  .byte $9D ; <indirect ref>
  0x030E07 $8DF7: -D0-I-  .byte $82 ; <indirect ref>
  0x030E08 $8DF8: -D0-I-  .byte $03 ; <indirect ref>
  0x030E09 $8DF9: -D0-I-  .byte $00 ; <indirect ref>
  0x030E0A $8DFA: -D0-I-  .byte $9C ; <indirect ref>
  0x030E0B $8DFB: -D0-I-  .byte $98 ; <indirect ref>
  0x030E0C $8DFC: -D0-I-  .byte $8E ; <indirect ref>
  0x030E0D $8DFD: -D0-I-  .byte $03 ; <indirect ref>
  0x030E0E $8DFE: -D0-I-  .byte $99 ; <indirect ref>
  0x030E0F $8DFF: -D0-I-  .byte $9D ; <indirect ref>
  0x030E10 $8E00: -D0-I-  .byte $00 ; <indirect ref>
  0x030E11 $8E01: -D0-I-  .byte $02 ; <indirect ref>
  0x030E12 $8E02: -D0-I-  .byte $00 ; <indirect ref>
  0x030E13 $8E03: -D0-I-  .byte $AA ; <indirect ref>
  0x030E14 $8E04: -D0-I-  .byte $90 ; <indirect ref>
  0x030E15 $8E05: -D0-I-  .byte $02 ; <indirect ref>
  0x030E16 $8E06: -D0-I-  .byte $AB ; <indirect ref>
  0x030E17 $8E07: -D0-I-  .byte $00 ; <indirect ref>
  0x030E18 $8E08: -D0-I-  .byte $02 ; <indirect ref>
  0x030E19 $8E09: -D0-I-  .byte $A4 ; <indirect ref>
  0x030E1A $8E0A: -D0-I-  .byte $A5 ; <indirect ref>
  0x030E1B $8E0B: -D0-I-  .byte $90 ; <indirect ref>
  0x030E1C $8E0C: -D0-I-  .byte $02 ; <indirect ref>
  0x030E1D $8E0D: -D0-I-  .byte $AB ; <indirect ref>
  0x030E1E $8E0E: -D0-I-  .byte $00 ; <indirect ref>
  0x030E1F $8E0F: -D0-I-  .byte $02 ; <indirect ref>
  0x030E20 $8E10: -D0-I-  .byte $00 ; <indirect ref>
  0x030E21 $8E11: -D0-I-  .byte $AA ; <indirect ref>
  0x030E22 $8E12: -D0-I-  .byte $90 ; <indirect ref>
  0x030E23 $8E13: -D0-I-  .byte $02 ; <indirect ref>
  0x030E24 $8E14: -D0-I-  .byte $AB ; <indirect ref>
  0x030E25 $8E15: -D0-I-  .byte $00 ; <indirect ref>
  0x030E26 $8E16: -D0-I-  .byte $03 ; <indirect ref>
  0x030E27 $8E17: -D0-I-  .byte $00 ; <indirect ref>
  0x030E28 $8E18: -D0-I-  .byte $9E ; <indirect ref>
  0x030E29 $8E19: -D0-I-  .byte $9A ; <indirect ref>
  0x030E2A $8E1A: -D0-I-  .byte $8E ; <indirect ref>
  0x030E2B $8E1B: -D0-I-  .byte $03 ; <indirect ref>
  0x030E2C $8E1C: -D0-I-  .byte $9B ; <indirect ref>
  0x030E2D $8E1D: -D0-I-  .byte $9F ; <indirect ref>
  0x030E2E $8E1E: -D0-I-  .byte $00 ; <indirect ref>
  0x030E2F $8E1F: -D0-I-  .byte $14 ; <indirect ref>
  0x030E30 $8E20: -D0-I-  .byte $00 ; <indirect ref>
  0x030E31 $8E21: -D0-I-  .byte $00 ; <indirect ref>
  0x030E32 $8E22: -D0-I-  .byte $9E ; <indirect ref>
  0x030E33 $8E23: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E34 $8E24: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E35 $8E25: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E36 $8E26: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E37 $8E27: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E38 $8E28: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E39 $8E29: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E3A $8E2A: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E3B $8E2B: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E3C $8E2C: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E3D $8E2D: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E3E $8E2E: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E3F $8E2F: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E40 $8E30: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E41 $8E31: -D0-I-  .byte $9F ; <indirect ref>
  0x030E42 $8E32: -D0-I-  .byte $00 ; <indirect ref>
  0x030E43 $8E33: -D0-I-  .byte $00 ; <indirect ref>
  0x030E44 $8E34: -D0-I-  .byte $94 ; <indirect ref>
  0x030E45 $8E35: -D0-I-  .byte $94 ; <indirect ref>
  0x030E46 $8E36: -D0-I-  .byte $94 ; <indirect ref>
  0x030E47 $8E37: -D0-I-  .byte $2C ; <indirect ref>
  0x030E48 $8E38: -D0-I-  .byte $22 ; <indirect ref>
  0x030E49 $8E39: -D0-I-  .byte $14 ; <indirect ref>
  0x030E4A $8E3A: -D0-I-  .byte $94 ; <indirect ref>
  0x030E4B $8E3B: -D0-I-  .byte $94 ; <indirect ref>
  0x030E4C $8E3C: -D0-I-  .byte $83 ; <indirect ref>
  0x030E4D $8E3D: -D0-I-  .byte $0E ; <indirect ref>
  0x030E4E $8E3E: -D0-I-  .byte $9C ; <indirect ref>
  0x030E4F $8E3F: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E50 $8E40: -D0-I-  .byte $A0 ; <indirect ref>
  0x030E51 $8E41: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E52 $8E42: -D0-I-  .byte $A0 ; <indirect ref>
  0x030E53 $8E43: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E54 $8E44: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E55 $8E45: -D0-I-  .byte $A0 ; <indirect ref>
  0x030E56 $8E46: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E57 $8E47: -D0-I-  .byte $A0 ; <indirect ref>
  0x030E58 $8E48: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E59 $8E49: -D0-I-  .byte $A8 ; <indirect ref>
  0x030E5A $8E4A: -D0-I-  .byte $A0 ; <indirect ref>
  0x030E5B $8E4B: -D0-I-  .byte $9D ; <indirect ref>
  0x030E5C $8E4C: -D0-I-  .byte $83 ; <indirect ref>
  0x030E5D $8E4D: -D0-I-  .byte $04 ; <indirect ref>
  0x030E5E $8E4E: -D0-I-  .byte $00 ; <indirect ref>
  0x030E5F $8E4F: -D0-I-  .byte $00 ; <indirect ref>
  0x030E60 $8E50: -D0-I-  .byte $9C ; <indirect ref>
  0x030E61 $8E51: -D0-I-  .byte $98 ; <indirect ref>
  0x030E62 $8E52: -D0-I-  .byte $8C ; <indirect ref>
  0x030E63 $8E53: -D0-I-  .byte $04 ; <indirect ref>
  0x030E64 $8E54: -D0-I-  .byte $99 ; <indirect ref>
  0x030E65 $8E55: -D0-I-  .byte $A0 ; <indirect ref>
  0x030E66 $8E56: -D0-I-  .byte $9D ; <indirect ref>
  0x030E67 $8E57: -D0-I-  .byte $00 ; <indirect ref>
  0x030E68 $8E58: -D0-I-  .byte $03 ; <indirect ref>
  0x030E69 $8E59: -D0-I-  .byte $00 ; <indirect ref>
  0x030E6A $8E5A: -D0-I-  .byte $9C ; <indirect ref>
  0x030E6B $8E5B: -D0-I-  .byte $98 ; <indirect ref>
  0x030E6C $8E5C: -D0-I-  .byte $8F ; <indirect ref>
  0x030E6D $8E5D: -D0-I-  .byte $02 ; <indirect ref>
  0x030E6E $8E5E: -D0-I-  .byte $A1 ; <indirect ref>
  0x030E6F $8E5F: -D0-I-  .byte $00 ; <indirect ref>
  0x030E70 $8E60: -D0-I-  .byte $02 ; <indirect ref>
  0x030E71 $8E61: -D0-I-  .byte $A4 ; <indirect ref>
  0x030E72 $8E62: -D0-I-  .byte $A5 ; <indirect ref>
  0x030E73 $8E63: -D0-I-  .byte $90 ; <indirect ref>
  0x030E74 $8E64: -D0-I-  .byte $02 ; <indirect ref>
  0x030E75 $8E65: -D0-I-  .byte $AB ; <indirect ref>
  0x030E76 $8E66: -D0-I-  .byte $00 ; <indirect ref>
  0x030E77 $8E67: -D0-I-  .byte $02 ; <indirect ref>
  0x030E78 $8E68: -D0-I-  .byte $00 ; <indirect ref>
  0x030E79 $8E69: -D0-I-  .byte $AA ; <indirect ref>
  0x030E7A $8E6A: -D0-I-  .byte $90 ; <indirect ref>
  0x030E7B $8E6B: -D0-I-  .byte $02 ; <indirect ref>
  0x030E7C $8E6C: -D0-I-  .byte $A1 ; <indirect ref>
  0x030E7D $8E6D: -D0-I-  .byte $00 ; <indirect ref>
  0x030E7E $8E6E: -D0-I-  .byte $03 ; <indirect ref>
  0x030E7F $8E6F: -D0-I-  .byte $00 ; <indirect ref>
  0x030E80 $8E70: -D0-I-  .byte $9E ; <indirect ref>
  0x030E81 $8E71: -D0-I-  .byte $9A ; <indirect ref>
  0x030E82 $8E72: -D0-I-  .byte $8F ; <indirect ref>
  0x030E83 $8E73: -D0-I-  .byte $02 ; <indirect ref>
  0x030E84 $8E74: -D0-I-  .byte $AB ; <indirect ref>
  0x030E85 $8E75: -D0-I-  .byte $00 ; <indirect ref>
  0x030E86 $8E76: -D0-I-  .byte $04 ; <indirect ref>
  0x030E87 $8E77: -D0-I-  .byte $00 ; <indirect ref>
  0x030E88 $8E78: -D0-I-  .byte $00 ; <indirect ref>
  0x030E89 $8E79: -D0-I-  .byte $9E ; <indirect ref>
  0x030E8A $8E7A: -D0-I-  .byte $9A ; <indirect ref>
  0x030E8B $8E7B: -D0-I-  .byte $8E ; <indirect ref>
  0x030E8C $8E7C: -D0-I-  .byte $02 ; <indirect ref>
  0x030E8D $8E7D: -D0-I-  .byte $A1 ; <indirect ref>
  0x030E8E $8E7E: -D0-I-  .byte $00 ; <indirect ref>
  0x030E8F $8E7F: -D0-I-  .byte $83 ; <indirect ref>
  0x030E90 $8E80: -D0-I-  .byte $11 ; <indirect ref>
  0x030E91 $8E81: -D0-I-  .byte $9E ; <indirect ref>
  0x030E92 $8E82: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E93 $8E83: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E94 $8E84: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E95 $8E85: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E96 $8E86: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E97 $8E87: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E98 $8E88: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E99 $8E89: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E9A $8E8A: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E9B $8E8B: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E9C $8E8C: -D0-I-  .byte $A2 ; <indirect ref>
  0x030E9D $8E8D: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E9E $8E8E: -D0-I-  .byte $A9 ; <indirect ref>
  0x030E9F $8E8F: -D0-I-  .byte $A2 ; <indirect ref>
  0x030EA0 $8E90: -D0-I-  .byte $9F ; <indirect ref>
  0x030EA1 $8E91: -D0-I-  .byte $00 ; <indirect ref>
  0x030EA2 $8E92: -D0-I-  .byte $94 ; <indirect ref>
  0x030EA3 $8E93: -D0-I-  .byte $94 ; <indirect ref>
  0x030EA4 $8E94: -D0-I-  .byte $2C ; <indirect ref>
  0x030EA5 $8E95: -D0-I-  .byte $22 ; <indirect ref>
  0x030EA6 $8E96: -D0-I-  .byte $14 ; <indirect ref>
  0x030EA7 $8E97: -D0-I-  .byte $94 ; <indirect ref>
  0x030EA8 $8E98: -D0-I-  .byte $82 ; <indirect ref>
  0x030EA9 $8E99: -D0-I-  .byte $12 ; <indirect ref>
  0x030EAA $8E9A: -D0-I-  .byte $9C ; <indirect ref>
  0x030EAB $8E9B: -D0-I-  .byte $A0 ; <indirect ref>
  0x030EAC $8E9C: -D0-I-  .byte $A8 ; <indirect ref>
  0x030EAD $8E9D: -D0-I-  .byte $A8 ; <indirect ref>
  0x030EAE $8E9E: -D0-I-  .byte $A0 ; <indirect ref>
  0x030EAF $8E9F: -D0-I-  .byte $A0 ; <indirect ref>
  0x030EB0 $8EA0: -D0-I-  .byte $A8 ; <indirect ref>
  0x030EB1 $8EA1: -D0-I-  .byte $A8 ; <indirect ref>
  0x030EB2 $8EA2: -D0-I-  .byte $A0 ; <indirect ref>
  0x030EB3 $8EA3: -D0-I-  .byte $A8 ; <indirect ref>
  0x030EB4 $8EA4: -D0-I-  .byte $A8 ; <indirect ref>
  0x030EB5 $8EA5: -D0-I-  .byte $A0 ; <indirect ref>
  0x030EB6 $8EA6: -D0-I-  .byte $A8 ; <indirect ref>
  0x030EB7 $8EA7: -D0-I-  .byte $A0 ; <indirect ref>
  0x030EB8 $8EA8: -D0-I-  .byte $A0 ; <indirect ref>
  0x030EB9 $8EA9: -D0-I-  .byte $A8 ; <indirect ref>
  0x030EBA $8EAA: -D0-I-  .byte $9D ; <indirect ref>
  0x030EBB $8EAB: -D0-I-  .byte $00 ; <indirect ref>
  0x030EBC $8EAC: -D0-I-  .byte $03 ; <indirect ref>
  0x030EBD $8EAD: -D0-I-  .byte $00 ; <indirect ref>
  0x030EBE $8EAE: -D0-I-  .byte $9C ; <indirect ref>
  0x030EBF $8EAF: -D0-I-  .byte $98 ; <indirect ref>
  0x030EC0 $8EB0: -D0-I-  .byte $8F ; <indirect ref>
  0x030EC1 $8EB1: -D0-I-  .byte $02 ; <indirect ref>
  0x030EC2 $8EB2: -D0-I-  .byte $AB ; <indirect ref>
  0x030EC3 $8EB3: -D0-I-  .byte $00 ; <indirect ref>
  0x030EC4 $8EB4: -D0-I-  .byte $02 ; <indirect ref>
  0x030EC5 $8EB5: -D0-I-  .byte $00 ; <indirect ref>
  0x030EC6 $8EB6: -D0-I-  .byte $AA ; <indirect ref>
  0x030EC7 $8EB7: -D0-I-  .byte $90 ; <indirect ref>
  0x030EC8 $8EB8: -D0-I-  .byte $02 ; <indirect ref>
  0x030EC9 $8EB9: -D0-I-  .byte $AB ; <indirect ref>
  0x030ECA $8EBA: -D0-I-  .byte $00 ; <indirect ref>
  0x030ECB $8EBB: -D0-I-  .byte $02 ; <indirect ref>
  0x030ECC $8EBC: -D0-I-  .byte $00 ; <indirect ref>
  0x030ECD $8EBD: -D0-I-  .byte $A3 ; <indirect ref>
  0x030ECE $8EBE: -D0-I-  .byte $90 ; <indirect ref>
  0x030ECF $8EBF: -D0-I-  .byte $02 ; <indirect ref>
  0x030ED0 $8EC0: -D0-I-  .byte $A1 ; <indirect ref>
  0x030ED1 $8EC1: -D0-I-  .byte $00 ; <indirect ref>
  0x030ED2 $8EC2: -D0-I-  .byte $02 ; <indirect ref>
  0x030ED3 $8EC3: -D0-I-  .byte $A4 ; <indirect ref>
  0x030ED4 $8EC4: -D0-I-  .byte $A5 ; <indirect ref>
  0x030ED5 $8EC5: -D0-I-  .byte $90 ; <indirect ref>
  0x030ED6 $8EC6: -D0-I-  .byte $02 ; <indirect ref>
  0x030ED7 $8EC7: -D0-I-  .byte $AB ; <indirect ref>
  0x030ED8 $8EC8: -D0-I-  .byte $00 ; <indirect ref>
  0x030ED9 $8EC9: -D0-I-  .byte $02 ; <indirect ref>
  0x030EDA $8ECA: -D0-I-  .byte $00 ; <indirect ref>
  0x030EDB $8ECB: -D0-I-  .byte $AA ; <indirect ref>
  0x030EDC $8ECC: -D0-I-  .byte $90 ; <indirect ref>
  0x030EDD $8ECD: -D0-I-  .byte $02 ; <indirect ref>
  0x030EDE $8ECE: -D0-I-  .byte $A1 ; <indirect ref>
  0x030EDF $8ECF: -D0-I-  .byte $00 ; <indirect ref>
  0x030EE0 $8ED0: -D0-I-  .byte $03 ; <indirect ref>
  0x030EE1 $8ED1: -D0-I-  .byte $00 ; <indirect ref>
  0x030EE2 $8ED2: -D0-I-  .byte $9E ; <indirect ref>
  0x030EE3 $8ED3: -D0-I-  .byte $9A ; <indirect ref>
  0x030EE4 $8ED4: -D0-I-  .byte $8F ; <indirect ref>
  0x030EE5 $8ED5: -D0-I-  .byte $02 ; <indirect ref>
  0x030EE6 $8ED6: -D0-I-  .byte $AB ; <indirect ref>
  0x030EE7 $8ED7: -D0-I-  .byte $00 ; <indirect ref>
  0x030EE8 $8ED8: -D0-I-  .byte $04 ; <indirect ref>
  0x030EE9 $8ED9: -D0-I-  .byte $00 ; <indirect ref>
  0x030EEA $8EDA: -D0-I-  .byte $00 ; <indirect ref>
  0x030EEB $8EDB: -D0-I-  .byte $9E ; <indirect ref>
  0x030EEC $8EDC: -D0-I-  .byte $9A ; <indirect ref>
  0x030EED $8EDD: -D0-I-  .byte $8C ; <indirect ref>
  0x030EEE $8EDE: -D0-I-  .byte $04 ; <indirect ref>
  0x030EEF $8EDF: -D0-I-  .byte $9B ; <indirect ref>
  0x030EF0 $8EE0: -D0-I-  .byte $A9 ; <indirect ref>
  0x030EF1 $8EE1: -D0-I-  .byte $9F ; <indirect ref>
  0x030EF2 $8EE2: -D0-I-  .byte $00 ; <indirect ref>
  0x030EF3 $8EE3: -D0-I-  .byte $83 ; <indirect ref>
  0x030EF4 $8EE4: -D0-I-  .byte $0E ; <indirect ref>
  0x030EF5 $8EE5: -D0-I-  .byte $9E ; <indirect ref>
  0x030EF6 $8EE6: -D0-I-  .byte $A2 ; <indirect ref>
  0x030EF7 $8EE7: -D0-I-  .byte $A9 ; <indirect ref>
  0x030EF8 $8EE8: -D0-I-  .byte $A9 ; <indirect ref>
  0x030EF9 $8EE9: -D0-I-  .byte $A2 ; <indirect ref>
  0x030EFA $8EEA: -D0-I-  .byte $A2 ; <indirect ref>
  0x030EFB $8EEB: -D0-I-  .byte $A9 ; <indirect ref>
  0x030EFC $8EEC: -D0-I-  .byte $A9 ; <indirect ref>
  0x030EFD $8EED: -D0-I-  .byte $A9 ; <indirect ref>
  0x030EFE $8EEE: -D0-I-  .byte $A2 ; <indirect ref>
  0x030EFF $8EEF: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F00 $8EF0: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F01 $8EF1: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F02 $8EF2: -D0-I-  .byte $9F ; <indirect ref>
  0x030F03 $8EF3: -D0-I-  .byte $83 ; <indirect ref>
  0x030F04 $8EF4: -D0-I-  .byte $94 ; <indirect ref>
  0x030F05 $8EF5: -D0-I-  .byte $94 ; <indirect ref>
  0x030F06 $8EF6: ------  .byte $2C
  0x030F07 $8EF7: ------  .byte $22
  0x030F08 $8EF8: ------  .byte $14
  0x030F09 $8EF9: ------  .byte $94
  0x030F0A $8EFA: ------  .byte $14
  0x030F0B $8EFB: ------  .byte $00
  0x030F0C $8EFC: ------  .byte $00
  0x030F0D $8EFD: ------  .byte $00
  0x030F0E $8EFE: ------  .byte $9C
  0x030F0F $8EFF: ------  .byte $A8
  0x030F10 $8F00: ------  .byte $A0
  0x030F11 $8F01: ------  .byte $A8
  0x030F12 $8F02: ------  .byte $A8
  0x030F13 $8F03: ------  .byte $A0
  0x030F14 $8F04: ------  .byte $A8
  0x030F15 $8F05: ------  .byte $A8
  0x030F16 $8F06: ------  .byte $A0
  0x030F17 $8F07: ------  .byte $A0
  0x030F18 $8F08: ------  .byte $A8
  0x030F19 $8F09: ------  .byte $A8
  0x030F1A $8F0A: ------  .byte $A0
  0x030F1B $8F0B: ------  .byte $A8
  0x030F1C $8F0C: ------  .byte $A0
  0x030F1D $8F0D: ------  .byte $9D
  0x030F1E $8F0E: ------  .byte $00
  0x030F1F $8F0F: ------  .byte $04
  0x030F20 $8F10: ------  .byte $00
  0x030F21 $8F11: ------  .byte $00
  0x030F22 $8F12: ------  .byte $9C
  0x030F23 $8F13: ------  .byte $98
  0x030F24 $8F14: ------  .byte $8E
  0x030F25 $8F15: ------  .byte $02
  0x030F26 $8F16: ------  .byte $A1
  0x030F27 $8F17: ------  .byte $00
  0x030F28 $8F18: ------  .byte $03
  0x030F29 $8F19: ------  .byte $00
  0x030F2A $8F1A: ------  .byte $00
  0x030F2B $8F1B: ------  .byte $AA
  0x030F2C $8F1C: ------  .byte $8F
  0x030F2D $8F1D: ------  .byte $02
  0x030F2E $8F1E: ------  .byte $AB
  0x030F2F $8F1F: ------  .byte $00
  0x030F30 $8F20: ------  .byte $03
  0x030F31 $8F21: ------  .byte $00
  0x030F32 $8F22: ------  .byte $9C
  0x030F33 $8F23: ------  .byte $98
  0x030F34 $8F24: ------  .byte $8F
  0x030F35 $8F25: ------  .byte $02
  0x030F36 $8F26: ------  .byte $AB
  0x030F37 $8F27: ------  .byte $00
  0x030F38 $8F28: ------  .byte $02
  0x030F39 $8F29: ------  .byte $A4
  0x030F3A $8F2A: ------  .byte $A5
  0x030F3B $8F2B: ------  .byte $90
  0x030F3C $8F2C: ------  .byte $02
  0x030F3D $8F2D: ------  .byte $A1
  0x030F3E $8F2E: ------  .byte $00
  0x030F3F $8F2F: ------  .byte $02
  0x030F40 $8F30: ------  .byte $00
  0x030F41 $8F31: ------  .byte $AA
  0x030F42 $8F32: ------  .byte $90
  0x030F43 $8F33: ------  .byte $02
  0x030F44 $8F34: ------  .byte $A1
  0x030F45 $8F35: ------  .byte $00
  0x030F46 $8F36: ------  .byte $03
  0x030F47 $8F37: ------  .byte $00
  0x030F48 $8F38: ------  .byte $9E
  0x030F49 $8F39: ------  .byte $9A
  0x030F4A $8F3A: ------  .byte $8F
  0x030F4B $8F3B: ------  .byte $02
  0x030F4C $8F3C: ------  .byte $AB
  0x030F4D $8F3D: ------  .byte $00
  0x030F4E $8F3E: ------  .byte $03
  0x030F4F $8F3F: ------  .byte $00
  0x030F50 $8F40: ------  .byte $00
  0x030F51 $8F41: ------  .byte $A3
  0x030F52 $8F42: ------  .byte $8F
  0x030F53 $8F43: ------  .byte $02
  0x030F54 $8F44: ------  .byte $A1
  0x030F55 $8F45: ------  .byte $00
  0x030F56 $8F46: ------  .byte $03
  0x030F57 $8F47: ------  .byte $00
  0x030F58 $8F48: ------  .byte $00
  0x030F59 $8F49: ------  .byte $AA
  0x030F5A $8F4A: ------  .byte $8F
  0x030F5B $8F4B: ------  .byte $02
  0x030F5C $8F4C: ------  .byte $AB
  0x030F5D $8F4D: ------  .byte $00
  0x030F5E $8F4E: ------  .byte $05
  0x030F5F $8F4F: ------  .byte $00
  0x030F60 $8F50: ------  .byte $00
  0x030F61 $8F51: ------  .byte $9E
  0x030F62 $8F52: ------  .byte $A2
  0x030F63 $8F53: ------  .byte $9A
  0x030F64 $8F54: ------  .byte $8C
  0x030F65 $8F55: ------  .byte $03
  0x030F66 $8F56: ------  .byte $9B
  0x030F67 $8F57: ------  .byte $9F
  0x030F68 $8F58: ------  .byte $00
  0x030F69 $8F59: ------  .byte $84
  0x030F6A $8F5A: ------  .byte $10
  0x030F6B $8F5B: ------  .byte $9E
  0x030F6C $8F5C: ------  .byte $A9
  0x030F6D $8F5D: ------  .byte $A9
  0x030F6E $8F5E: ------  .byte $A2
  0x030F6F $8F5F: ------  .byte $A9
  0x030F70 $8F60: ------  .byte $A9
  0x030F71 $8F61: ------  .byte $A2
  0x030F72 $8F62: ------  .byte $A9
  0x030F73 $8F63: ------  .byte $A9
  0x030F74 $8F64: ------  .byte $A2
  0x030F75 $8F65: ------  .byte $A2
  0x030F76 $8F66: ------  .byte $A9
  0x030F77 $8F67: ------  .byte $A9
  0x030F78 $8F68: ------  .byte $9F
  0x030F79 $8F69: ------  .byte $00
  0x030F7A $8F6A: ------  .byte $00
  0x030F7B $8F6B: -D0-I-  .byte $2C ; <indirect ref>
  0x030F7C $8F6C: -D0-I-  .byte $22 ; <indirect ref>
  0x030F7D $8F6D: -D0-I-  .byte $14 ; <indirect ref>
  0x030F7E $8F6E: -D0-I-  .byte $94 ; <indirect ref>
  0x030F7F $8F6F: -D0-I-  .byte $94 ; <indirect ref>
  0x030F80 $8F70: -D0-I-  .byte $14 ; <indirect ref>
  0x030F81 $8F71: -D0-I-  .byte $00 ; <indirect ref>
  0x030F82 $8F72: -D0-I-  .byte $00 ; <indirect ref>
  0x030F83 $8F73: -D0-I-  .byte $9B ; <indirect ref>
  0x030F84 $8F74: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F85 $8F75: -D0-I-  .byte $A2 ; <indirect ref>
  0x030F86 $8F76: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F87 $8F77: -D0-I-  .byte $A2 ; <indirect ref>
  0x030F88 $8F78: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F89 $8F79: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F8A $8F7A: -D0-I-  .byte $A2 ; <indirect ref>
  0x030F8B $8F7B: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F8C $8F7C: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F8D $8F7D: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F8E $8F7E: -D0-I-  .byte $A2 ; <indirect ref>
  0x030F8F $8F7F: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F90 $8F80: -D0-I-  .byte $A2 ; <indirect ref>
  0x030F91 $8F81: -D0-I-  .byte $A2 ; <indirect ref>
  0x030F92 $8F82: -D0-I-  .byte $A9 ; <indirect ref>
  0x030F93 $8F83: -D0-I-  .byte $9A ; <indirect ref>
  0x030F94 $8F84: -D0-I-  .byte $00 ; <indirect ref>
  0x030F95 $8F85: -D0-I-  .byte $03 ; <indirect ref>
  0x030F96 $8F86: -D0-I-  .byte $00 ; <indirect ref>
  0x030F97 $8F87: -D0-I-  .byte $9B ; <indirect ref>
  0x030F98 $8F88: -D0-I-  .byte $9F ; <indirect ref>
  0x030F99 $8F89: -D0-I-  .byte $8F ; <indirect ref>
  0x030F9A $8F8A: -D0-I-  .byte $02 ; <indirect ref>
  0x030F9B $8F8B: -D0-I-  .byte $9E ; <indirect ref>
  0x030F9C $8F8C: -D0-I-  .byte $9A ; <indirect ref>
  0x030F9D $8F8D: -D0-I-  .byte $02 ; <indirect ref>
  0x030F9E $8F8E: -D0-I-  .byte $00 ; <indirect ref>
  0x030F9F $8F8F: -D0-I-  .byte $AB ; <indirect ref>
  0x030FA0 $8F90: -D0-I-  .byte $91 ; <indirect ref>
  0x030FA1 $8F91: -D0-I-  .byte $01 ; <indirect ref>
  0x030FA2 $8F92: -D0-I-  .byte $AA ; <indirect ref>
  0x030FA3 $8F93: -D0-I-  .byte $02 ; <indirect ref>
  0x030FA4 $8F94: -D0-I-  .byte $00 ; <indirect ref>
  0x030FA5 $8F95: -D0-I-  .byte $A1 ; <indirect ref>
  0x030FA6 $8F96: -D0-I-  .byte $91 ; <indirect ref>
  0x030FA7 $8F97: -D0-I-  .byte $01 ; <indirect ref>
  0x030FA8 $8F98: -D0-I-  .byte $A3 ; <indirect ref>
  0x030FA9 $8F99: -D0-I-  .byte $02 ; <indirect ref>
  0x030FAA $8F9A: -D0-I-  .byte $00 ; <indirect ref>
  0x030FAB $8F9B: -D0-I-  .byte $AB ; <indirect ref>
  0x030FAC $8F9C: -D0-I-  .byte $91 ; <indirect ref>
  0x030FAD $8F9D: -D0-I-  .byte $01 ; <indirect ref>
  0x030FAE $8F9E: -D0-I-  .byte $AA ; <indirect ref>
  0x030FAF $8F9F: -D0-I-  .byte $03 ; <indirect ref>
  0x030FB0 $8FA0: -D0-I-  .byte $00 ; <indirect ref>
  0x030FB1 $8FA1: -D0-I-  .byte $99 ; <indirect ref>
  0x030FB2 $8FA2: -D0-I-  .byte $9D ; <indirect ref>
  0x030FB3 $8FA3: -D0-I-  .byte $8F ; <indirect ref>
  0x030FB4 $8FA4: -D0-I-  .byte $02 ; <indirect ref>
  0x030FB5 $8FA5: -D0-I-  .byte $9C ; <indirect ref>
  0x030FB6 $8FA6: -D0-I-  .byte $98 ; <indirect ref>
  0x030FB7 $8FA7: -D0-I-  .byte $14 ; <indirect ref>
  0x030FB8 $8FA8: -D0-I-  .byte $00 ; <indirect ref>
  0x030FB9 $8FA9: -D0-I-  .byte $00 ; <indirect ref>
  0x030FBA $8FAA: -D0-I-  .byte $99 ; <indirect ref>
  0x030FBB $8FAB: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FBC $8FAC: -D0-I-  .byte $A0 ; <indirect ref>
  0x030FBD $8FAD: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FBE $8FAE: -D0-I-  .byte $A0 ; <indirect ref>
  0x030FBF $8FAF: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FC0 $8FB0: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FC1 $8FB1: -D0-I-  .byte $A0 ; <indirect ref>
  0x030FC2 $8FB2: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FC3 $8FB3: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FC4 $8FB4: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FC5 $8FB5: -D0-I-  .byte $A0 ; <indirect ref>
  0x030FC6 $8FB6: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FC7 $8FB7: -D0-I-  .byte $A0 ; <indirect ref>
  0x030FC8 $8FB8: -D0-I-  .byte $A8 ; <indirect ref>
  0x030FC9 $8FB9: -D0-I-  .byte $A0 ; <indirect ref>
  0x030FCA $8FBA: -D0-I-  .byte $98 ; <indirect ref>
  0x030FCB $8FBB: -D0-I-  .byte $00 ; <indirect ref>
  0x030FCC $8FBC: -D0-I-  .byte $94 ; <indirect ref>
  0x030FCD $8FBD: -D0-I-  .byte $94 ; <indirect ref>
  0x030FCE $8FBE: -D0-I-  .byte $94 ; <indirect ref>
  0x030FCF $8FBF: -D0-I-  .byte $2C ; <indirect ref>
  0x030FD0 $8FC0: -D0-I-  .byte $22 ; <indirect ref>
  0x030FD1 $8FC1: -D0-I-  .byte $14 ; <indirect ref>
  0x030FD2 $8FC2: -D0-I-  .byte $94 ; <indirect ref>
  0x030FD3 $8FC3: -D0-I-  .byte $94 ; <indirect ref>
  0x030FD4 $8FC4: -D0-I-  .byte $14 ; <indirect ref>
  0x030FD5 $8FC5: -D0-I-  .byte $00 ; <indirect ref>
  0x030FD6 $8FC6: -D0-I-  .byte $00 ; <indirect ref>
  0x030FD7 $8FC7: -D0-I-  .byte $9B ; <indirect ref>
  0x030FD8 $8FC8: -D0-I-  .byte $A9 ; <indirect ref>
  0x030FD9 $8FC9: -D0-I-  .byte $A2 ; <indirect ref>
  0x030FDA $8FCA: -D0-I-  .byte $A2 ; <indirect ref>
  0x030FDB $8FCB: -D0-I-  .byte $A9 ; <indirect ref>
  0x030FDC $8FCC: -D0-I-  .byte $A2 ; <indirect ref>
  0x030FDD $8FCD: -D0-I-  .byte $A9 ; <indirect ref>
  0x030FDE $8FCE: -D0-I-  .byte $A9 ; <indirect ref>
  0x030FDF $8FCF: -D0-I-  .byte $A2 ; <indirect ref>
  0x030FE0 $8FD0: -D0-I-  .byte $A9 ; <indirect ref>
  0x030FE1 $8FD1: -D0-I-  .byte $A2 ; <indirect ref>
  0x030FE2 $8FD2: -D0-I-  .byte $A9 ; <indirect ref>
  0x030FE3 $8FD3: -D0-I-  .byte $A2 ; <indirect ref>
  0x030FE4 $8FD4: -D0-I-  .byte $A9 ; <indirect ref>
  0x030FE5 $8FD5: -D0-I-  .byte $A2 ; <indirect ref>
  0x030FE6 $8FD6: -D0-I-  .byte $A9 ; <indirect ref>
  0x030FE7 $8FD7: -D0-I-  .byte $9A ; <indirect ref>
  0x030FE8 $8FD8: -D0-I-  .byte $00 ; <indirect ref>
  0x030FE9 $8FD9: -D0-I-  .byte $03 ; <indirect ref>
  0x030FEA $8FDA: -D0-I-  .byte $00 ; <indirect ref>
  0x030FEB $8FDB: -D0-I-  .byte $9B ; <indirect ref>
  0x030FEC $8FDC: -D0-I-  .byte $9F ; <indirect ref>
  0x030FED $8FDD: -D0-I-  .byte $8F ; <indirect ref>
  0x030FEE $8FDE: -D0-I-  .byte $02 ; <indirect ref>
  0x030FEF $8FDF: -D0-I-  .byte $9E ; <indirect ref>
  0x030FF0 $8FE0: -D0-I-  .byte $9A ; <indirect ref>
  0x030FF1 $8FE1: -D0-I-  .byte $02 ; <indirect ref>
  0x030FF2 $8FE2: -D0-I-  .byte $9B ; <indirect ref>
  0x030FF3 $8FE3: -D0-I-  .byte $9F ; <indirect ref>
  0x030FF4 $8FE4: -D0-I-  .byte $91 ; <indirect ref>
  0x030FF5 $8FE5: -D0-I-  .byte $01 ; <indirect ref>
  0x030FF6 $8FE6: -D0-I-  .byte $A3 ; <indirect ref>
  0x030FF7 $8FE7: -D0-I-  .byte $01 ; <indirect ref>
  0x030FF8 $8FE8: -D0-I-  .byte $A1 ; <indirect ref>
  0x030FF9 $8FE9: -D0-I-  .byte $92 ; <indirect ref>
  0x030FFA $8FEA: -D0-I-  .byte $01 ; <indirect ref>
  0x030FFB $8FEB: -D0-I-  .byte $AA ; <indirect ref>
  0x030FFC $8FEC: -D0-I-  .byte $01 ; <indirect ref>
  0x030FFD $8FED: -D0-I-  .byte $AB ; <indirect ref>
  0x030FFE $8FEE: -D0-I-  .byte $92 ; <indirect ref>
  0x030FFF $8FEF: -D0-I-  .byte $01 ; <indirect ref>
  0x031000 $8FF0: -D0-I-  .byte $A3 ; <indirect ref>
  0x031001 $8FF1: -D0-I-  .byte $02 ; <indirect ref>
  0x031002 $8FF2: -D0-I-  .byte $99 ; <indirect ref>
  0x031003 $8FF3: -D0-I-  .byte $9D ; <indirect ref>
  0x031004 $8FF4: -D0-I-  .byte $91 ; <indirect ref>
  0x031005 $8FF5: -D0-I-  .byte $01 ; <indirect ref>
  0x031006 $8FF6: -D0-I-  .byte $AA ; <indirect ref>
  0x031007 $8FF7: -D0-I-  .byte $03 ; <indirect ref>
  0x031008 $8FF8: -D0-I-  .byte $00 ; <indirect ref>
  0x031009 $8FF9: -D0-I-  .byte $99 ; <indirect ref>
  0x03100A $8FFA: -D0-I-  .byte $9D ; <indirect ref>
  0x03100B $8FFB: -D0-I-  .byte $90 ; <indirect ref>
  0x03100C $8FFC: -D0-I-  .byte $01 ; <indirect ref>
  0x03100D $8FFD: -D0-I-  .byte $A3 ; <indirect ref>
  0x03100E $8FFE: -D0-I-  .byte $14 ; <indirect ref>
  0x03100F $8FFF: -D0-I-  .byte $00 ; <indirect ref>
  0x031010 $9000: -D0-I-  .byte $00 ; <indirect ref>
  0x031011 $9001: -D0-I-  .byte $99 ; <indirect ref>
  0x031012 $9002: -D0-I-  .byte $A8 ; <indirect ref>
  0x031013 $9003: -D0-I-  .byte $A8 ; <indirect ref>
  0x031014 $9004: -D0-I-  .byte $A0 ; <indirect ref>
  0x031015 $9005: -D0-I-  .byte $A8 ; <indirect ref>
  0x031016 $9006: -D0-I-  .byte $A0 ; <indirect ref>
  0x031017 $9007: -D0-I-  .byte $A8 ; <indirect ref>
  0x031018 $9008: -D0-I-  .byte $A8 ; <indirect ref>
  0x031019 $9009: -D0-I-  .byte $A0 ; <indirect ref>
  0x03101A $900A: -D0-I-  .byte $A8 ; <indirect ref>
  0x03101B $900B: -D0-I-  .byte $A0 ; <indirect ref>
  0x03101C $900C: -D0-I-  .byte $A8 ; <indirect ref>
  0x03101D $900D: -D0-I-  .byte $A8 ; <indirect ref>
  0x03101E $900E: -D0-I-  .byte $A0 ; <indirect ref>
  0x03101F $900F: -D0-I-  .byte $A8 ; <indirect ref>
  0x031020 $9010: -D0-I-  .byte $A0 ; <indirect ref>
  0x031021 $9011: -D0-I-  .byte $A8 ; <indirect ref>
  0x031022 $9012: -D0-I-  .byte $98 ; <indirect ref>
  0x031023 $9013: -D0-I-  .byte $94 ; <indirect ref>
  0x031024 $9014: -D0-I-  .byte $94 ; <indirect ref>
  0x031025 $9015: -D0-I-  .byte $2C ; <indirect ref>
  0x031026 $9016: -D0-I-  .byte $22 ; <indirect ref>
  0x031027 $9017: -D0-I-  .byte $14 ; <indirect ref>
  0x031028 $9018: -D0-I-  .byte $94 ; <indirect ref>
  0x031029 $9019: -D0-I-  .byte $14 ; <indirect ref>
  0x03102A $901A: -D0-I-  .byte $00 ; <indirect ref>
  0x03102B $901B: -D0-I-  .byte $00 ; <indirect ref>
  0x03102C $901C: -D0-I-  .byte $9B ; <indirect ref>
  0x03102D $901D: -D0-I-  .byte $A2 ; <indirect ref>
  0x03102E $901E: -D0-I-  .byte $A9 ; <indirect ref>
  0x03102F $901F: -D0-I-  .byte $A2 ; <indirect ref>
  0x031030 $9020: -D0-I-  .byte $A9 ; <indirect ref>
  0x031031 $9021: -D0-I-  .byte $A2 ; <indirect ref>
  0x031032 $9022: -D0-I-  .byte $A2 ; <indirect ref>
  0x031033 $9023: -D0-I-  .byte $A9 ; <indirect ref>
  0x031034 $9024: -D0-I-  .byte $A9 ; <indirect ref>
  0x031035 $9025: -D0-I-  .byte $A9 ; <indirect ref>
  0x031036 $9026: -D0-I-  .byte $A2 ; <indirect ref>
  0x031037 $9027: -D0-I-  .byte $A9 ; <indirect ref>
  0x031038 $9028: -D0-I-  .byte $A9 ; <indirect ref>
  0x031039 $9029: -D0-I-  .byte $A2 ; <indirect ref>
  0x03103A $902A: -D0-I-  .byte $A9 ; <indirect ref>
  0x03103B $902B: -D0-I-  .byte $A2 ; <indirect ref>
  0x03103C $902C: -D0-I-  .byte $9A ; <indirect ref>
  0x03103D $902D: -D0-I-  .byte $00 ; <indirect ref>
  0x03103E $902E: -D0-I-  .byte $03 ; <indirect ref>
  0x03103F $902F: -D0-I-  .byte $00 ; <indirect ref>
  0x031040 $9030: -D0-I-  .byte $9B ; <indirect ref>
  0x031041 $9031: -D0-I-  .byte $9F ; <indirect ref>
  0x031042 $9032: -D0-I-  .byte $8F ; <indirect ref>
  0x031043 $9033: -D0-I-  .byte $02 ; <indirect ref>
  0x031044 $9034: -D0-I-  .byte $9E ; <indirect ref>
  0x031045 $9035: -D0-I-  .byte $9A ; <indirect ref>
  0x031046 $9036: -D0-I-  .byte $02 ; <indirect ref>
  0x031047 $9037: -D0-I-  .byte $00 ; <indirect ref>
  0x031048 $9038: -D0-I-  .byte $AB ; <indirect ref>
  0x031049 $9039: -D0-I-  .byte $91 ; <indirect ref>
  0x03104A $903A: -D0-I-  .byte $01 ; <indirect ref>
  0x03104B $903B: -D0-I-  .byte $AA ; <indirect ref>
  0x03104C $903C: -D0-I-  .byte $02 ; <indirect ref>
  0x03104D $903D: -D0-I-  .byte $00 ; <indirect ref>
  0x03104E $903E: -D0-I-  .byte $A1 ; <indirect ref>
  0x03104F $903F: -D0-I-  .byte $91 ; <indirect ref>
  0x031050 $9040: -D0-I-  .byte $01 ; <indirect ref>
  0x031051 $9041: -D0-I-  .byte $A3 ; <indirect ref>
  0x031052 $9042: -D0-I-  .byte $02 ; <indirect ref>
  0x031053 $9043: -D0-I-  .byte $00 ; <indirect ref>
  0x031054 $9044: -D0-I-  .byte $A1 ; <indirect ref>
  0x031055 $9045: -D0-I-  .byte $91 ; <indirect ref>
  0x031056 $9046: -D0-I-  .byte $01 ; <indirect ref>
  0x031057 $9047: -D0-I-  .byte $AA ; <indirect ref>
  0x031058 $9048: -D0-I-  .byte $02 ; <indirect ref>
  0x031059 $9049: -D0-I-  .byte $00 ; <indirect ref>
  0x03105A $904A: -D0-I-  .byte $AB ; <indirect ref>
  0x03105B $904B: -D0-I-  .byte $91 ; <indirect ref>
  0x03105C $904C: -D0-I-  .byte $01 ; <indirect ref>
  0x03105D $904D: -D0-I-  .byte $A3 ; <indirect ref>
  0x03105E $904E: -D0-I-  .byte $02 ; <indirect ref>
  0x03105F $904F: -D0-I-  .byte $00 ; <indirect ref>
  0x031060 $9050: -D0-I-  .byte $A1 ; <indirect ref>
  0x031061 $9051: -D0-I-  .byte $91 ; <indirect ref>
  0x031062 $9052: -D0-I-  .byte $01 ; <indirect ref>
  0x031063 $9053: -D0-I-  .byte $AA ; <indirect ref>
  0x031064 $9054: -D0-I-  .byte $03 ; <indirect ref>
  0x031065 $9055: -D0-I-  .byte $00 ; <indirect ref>
  0x031066 $9056: -D0-I-  .byte $99 ; <indirect ref>
  0x031067 $9057: -D0-I-  .byte $9D ; <indirect ref>
  0x031068 $9058: -D0-I-  .byte $8F ; <indirect ref>
  0x031069 $9059: -D0-I-  .byte $02 ; <indirect ref>
  0x03106A $905A: -D0-I-  .byte $9C ; <indirect ref>
  0x03106B $905B: -D0-I-  .byte $98 ; <indirect ref>
  0x03106C $905C: -D0-I-  .byte $14 ; <indirect ref>
  0x03106D $905D: -D0-I-  .byte $00 ; <indirect ref>
  0x03106E $905E: -D0-I-  .byte $00 ; <indirect ref>
  0x03106F $905F: -D0-I-  .byte $99 ; <indirect ref>
  0x031070 $9060: -D0-I-  .byte $A0 ; <indirect ref>
  0x031071 $9061: -D0-I-  .byte $A8 ; <indirect ref>
  0x031072 $9062: -D0-I-  .byte $A8 ; <indirect ref>
  0x031073 $9063: -D0-I-  .byte $A8 ; <indirect ref>
  0x031074 $9064: -D0-I-  .byte $A0 ; <indirect ref>
  0x031075 $9065: -D0-I-  .byte $A8 ; <indirect ref>
  0x031076 $9066: -D0-I-  .byte $A0 ; <indirect ref>
  0x031077 $9067: -D0-I-  .byte $A8 ; <indirect ref>
  0x031078 $9068: -D0-I-  .byte $A0 ; <indirect ref>
  0x031079 $9069: -D0-I-  .byte $A0 ; <indirect ref>
  0x03107A $906A: -D0-I-  .byte $A8 ; <indirect ref>
  0x03107B $906B: -D0-I-  .byte $A0 ; <indirect ref>
  0x03107C $906C: -D0-I-  .byte $A8 ; <indirect ref>
  0x03107D $906D: -D0-I-  .byte $A0 ; <indirect ref>
  0x03107E $906E: -D0-I-  .byte $A8 ; <indirect ref>
  0x03107F $906F: -D0-I-  .byte $98 ; <indirect ref>
  0x031080 $9070: -D0-I-  .byte $00 ; <indirect ref>
  0x031081 $9071: -D0-I-  .byte $94 ; <indirect ref>
  0x031082 $9072: -D0-I-  .byte $94 ; <indirect ref>
  0x031083 $9073: -D0-I-  .byte $2C ; <indirect ref>
  0x031084 $9074: -D0-I-  .byte $22 ; <indirect ref>
  0x031085 $9075: -D0-I-  .byte $14 ; <indirect ref>
  0x031086 $9076: -D0-I-  .byte $94 ; <indirect ref>
  0x031087 $9077: -D0-I-  .byte $14 ; <indirect ref>
  0x031088 $9078: -D0-I-  .byte $00 ; <indirect ref>
  0x031089 $9079: -D0-I-  .byte $00 ; <indirect ref>
  0x03108A $907A: -D0-I-  .byte $00 ; <indirect ref>
  0x03108B $907B: -D0-I-  .byte $9B ; <indirect ref>
  0x03108C $907C: -D0-I-  .byte $A9 ; <indirect ref>
  0x03108D $907D: -D0-I-  .byte $A2 ; <indirect ref>
  0x03108E $907E: -D0-I-  .byte $A9 ; <indirect ref>
  0x03108F $907F: -D0-I-  .byte $A2 ; <indirect ref>
  0x031090 $9080: -D0-I-  .byte $A9 ; <indirect ref>
  0x031091 $9081: -D0-I-  .byte $A9 ; <indirect ref>
  0x031092 $9082: -D0-I-  .byte $A2 ; <indirect ref>
  0x031093 $9083: -D0-I-  .byte $A9 ; <indirect ref>
  0x031094 $9084: -D0-I-  .byte $A9 ; <indirect ref>
  0x031095 $9085: -D0-I-  .byte $A2 ; <indirect ref>
  0x031096 $9086: -D0-I-  .byte $A2 ; <indirect ref>
  0x031097 $9087: -D0-I-  .byte $A9 ; <indirect ref>
  0x031098 $9088: -D0-I-  .byte $A9 ; <indirect ref>
  0x031099 $9089: -D0-I-  .byte $A2 ; <indirect ref>
  0x03109A $908A: -D0-I-  .byte $9A ; <indirect ref>
  0x03109B $908B: -D0-I-  .byte $00 ; <indirect ref>
  0x03109C $908C: -D0-I-  .byte $04 ; <indirect ref>
  0x03109D $908D: -D0-I-  .byte $00 ; <indirect ref>
  0x03109E $908E: -D0-I-  .byte $00 ; <indirect ref>
  0x03109F $908F: -D0-I-  .byte $9B ; <indirect ref>
  0x0310A0 $9090: -D0-I-  .byte $9F ; <indirect ref>
  0x0310A1 $9091: -D0-I-  .byte $8E ; <indirect ref>
  0x0310A2 $9092: -D0-I-  .byte $02 ; <indirect ref>
  0x0310A3 $9093: -D0-I-  .byte $9E ; <indirect ref>
  0x0310A4 $9094: -D0-I-  .byte $9A ; <indirect ref>
  0x0310A5 $9095: -D0-I-  .byte $03 ; <indirect ref>
  0x0310A6 $9096: -D0-I-  .byte $00 ; <indirect ref>
  0x0310A7 $9097: -D0-I-  .byte $9B ; <indirect ref>
  0x0310A8 $9098: -D0-I-  .byte $9F ; <indirect ref>
  0x0310A9 $9099: -D0-I-  .byte $90 ; <indirect ref>
  0x0310AA $909A: -D0-I-  .byte $01 ; <indirect ref>
  0x0310AB $909B: -D0-I-  .byte $AA ; <indirect ref>
  0x0310AC $909C: -D0-I-  .byte $02 ; <indirect ref>
  0x0310AD $909D: -D0-I-  .byte $00 ; <indirect ref>
  0x0310AE $909E: -D0-I-  .byte $A1 ; <indirect ref>
  0x0310AF $909F: -D0-I-  .byte $91 ; <indirect ref>
  0x0310B0 $90A0: -D0-I-  .byte $01 ; <indirect ref>
  0x0310B1 $90A1: -D0-I-  .byte $A3 ; <indirect ref>
  0x0310B2 $90A2: -D0-I-  .byte $02 ; <indirect ref>
  0x0310B3 $90A3: -D0-I-  .byte $00 ; <indirect ref>
  0x0310B4 $90A4: -D0-I-  .byte $AB ; <indirect ref>
  0x0310B5 $90A5: -D0-I-  .byte $91 ; <indirect ref>
  0x0310B6 $90A6: -D0-I-  .byte $01 ; <indirect ref>
  0x0310B7 $90A7: -D0-I-  .byte $AA ; <indirect ref>
  0x0310B8 $90A8: -D0-I-  .byte $02 ; <indirect ref>
  0x0310B9 $90A9: -D0-I-  .byte $00 ; <indirect ref>
  0x0310BA $90AA: -D0-I-  .byte $A1 ; <indirect ref>
  0x0310BB $90AB: -D0-I-  .byte $91 ; <indirect ref>
  0x0310BC $90AC: -D0-I-  .byte $01 ; <indirect ref>
  0x0310BD $90AD: -D0-I-  .byte $AA ; <indirect ref>
  0x0310BE $90AE: -D0-I-  .byte $02 ; <indirect ref>
  0x0310BF $90AF: -D0-I-  .byte $00 ; <indirect ref>
  0x0310C0 $90B0: -D0-I-  .byte $AB ; <indirect ref>
  0x0310C1 $90B1: -D0-I-  .byte $91 ; <indirect ref>
  0x0310C2 $90B2: -D0-I-  .byte $01 ; <indirect ref>
  0x0310C3 $90B3: -D0-I-  .byte $A3 ; <indirect ref>
  0x0310C4 $90B4: -D0-I-  .byte $02 ; <indirect ref>
  0x0310C5 $90B5: -D0-I-  .byte $00 ; <indirect ref>
  0x0310C6 $90B6: -D0-I-  .byte $A1 ; <indirect ref>
  0x0310C7 $90B7: -D0-I-  .byte $91 ; <indirect ref>
  0x0310C8 $90B8: -D0-I-  .byte $01 ; <indirect ref>
  0x0310C9 $90B9: -D0-I-  .byte $AA ; <indirect ref>
  0x0310CA $90BA: -D0-I-  .byte $03 ; <indirect ref>
  0x0310CB $90BB: -D0-I-  .byte $00 ; <indirect ref>
  0x0310CC $90BC: -D0-I-  .byte $99 ; <indirect ref>
  0x0310CD $90BD: -D0-I-  .byte $9D ; <indirect ref>
  0x0310CE $90BE: -D0-I-  .byte $90 ; <indirect ref>
  0x0310CF $90BF: -D0-I-  .byte $01 ; <indirect ref>
  0x0310D0 $90C0: -D0-I-  .byte $A3 ; <indirect ref>
  0x0310D1 $90C1: -D0-I-  .byte $04 ; <indirect ref>
  0x0310D2 $90C2: -D0-I-  .byte $00 ; <indirect ref>
  0x0310D3 $90C3: -D0-I-  .byte $00 ; <indirect ref>
  0x0310D4 $90C4: -D0-I-  .byte $99 ; <indirect ref>
  0x0310D5 $90C5: -D0-I-  .byte $9D ; <indirect ref>
  0x0310D6 $90C6: -D0-I-  .byte $8E ; <indirect ref>
  0x0310D7 $90C7: -D0-I-  .byte $02 ; <indirect ref>
  0x0310D8 $90C8: -D0-I-  .byte $9C ; <indirect ref>
  0x0310D9 $90C9: -D0-I-  .byte $98 ; <indirect ref>
  0x0310DA $90CA: -D0-I-  .byte $14 ; <indirect ref>
  0x0310DB $90CB: -D0-I-  .byte $00 ; <indirect ref>
  0x0310DC $90CC: -D0-I-  .byte $00 ; <indirect ref>
  0x0310DD $90CD: -D0-I-  .byte $00 ; <indirect ref>
  0x0310DE $90CE: -D0-I-  .byte $99 ; <indirect ref>
  0x0310DF $90CF: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310E0 $90D0: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310E1 $90D1: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310E2 $90D2: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310E3 $90D3: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310E4 $90D4: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310E5 $90D5: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310E6 $90D6: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310E7 $90D7: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310E8 $90D8: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310E9 $90D9: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310EA $90DA: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310EB $90DB: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310EC $90DC: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310ED $90DD: -D0-I-  .byte $98 ; <indirect ref>
  0x0310EE $90DE: -D0-I-  .byte $00 ; <indirect ref>
  0x0310EF $90DF: -D0-I-  .byte $2C ; <indirect ref>
  0x0310F0 $90E0: -D0-I-  .byte $22 ; <indirect ref>
  0x0310F1 $90E1: -D0-I-  .byte $14 ; <indirect ref>
  0x0310F2 $90E2: -D0-I-  .byte $94 ; <indirect ref>
  0x0310F3 $90E3: -D0-I-  .byte $94 ; <indirect ref>
  0x0310F4 $90E4: -D0-I-  .byte $14 ; <indirect ref>
  0x0310F5 $90E5: -D0-I-  .byte $00 ; <indirect ref>
  0x0310F6 $90E6: -D0-I-  .byte $00 ; <indirect ref>
  0x0310F7 $90E7: -D0-I-  .byte $00 ; <indirect ref>
  0x0310F8 $90E8: -D0-I-  .byte $9C ; <indirect ref>
  0x0310F9 $90E9: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310FA $90EA: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310FB $90EB: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310FC $90EC: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310FD $90ED: -D0-I-  .byte $A0 ; <indirect ref>
  0x0310FE $90EE: -D0-I-  .byte $A8 ; <indirect ref>
  0x0310FF $90EF: -D0-I-  .byte $A8 ; <indirect ref>
  0x031100 $90F0: -D0-I-  .byte $A0 ; <indirect ref>
  0x031101 $90F1: -D0-I-  .byte $A8 ; <indirect ref>
  0x031102 $90F2: -D0-I-  .byte $A0 ; <indirect ref>
  0x031103 $90F3: -D0-I-  .byte $A0 ; <indirect ref>
  0x031104 $90F4: -D0-I-  .byte $A8 ; <indirect ref>
  0x031105 $90F5: -D0-I-  .byte $A0 ; <indirect ref>
  0x031106 $90F6: -D0-I-  .byte $9D ; <indirect ref>
  0x031107 $90F7: -D0-I-  .byte $00 ; <indirect ref>
  0x031108 $90F8: -D0-I-  .byte $00 ; <indirect ref>
  0x031109 $90F9: -D0-I-  .byte $04 ; <indirect ref>
  0x03110A $90FA: -D0-I-  .byte $00 ; <indirect ref>
  0x03110B $90FB: -D0-I-  .byte $9C ; <indirect ref>
  0x03110C $90FC: -D0-I-  .byte $A0 ; <indirect ref>
  0x03110D $90FD: -D0-I-  .byte $98 ; <indirect ref>
  0x03110E $90FE: -D0-I-  .byte $8D ; <indirect ref>
  0x03110F $90FF: -D0-I-  .byte $03 ; <indirect ref>
  0x031110 $9100: -D0-I-  .byte $99 ; <indirect ref>
  0x031111 $9101: -D0-I-  .byte $9D ; <indirect ref>
  0x031112 $9102: -D0-I-  .byte $00 ; <indirect ref>
  0x031113 $9103: -D0-I-  .byte $02 ; <indirect ref>
  0x031114 $9104: -D0-I-  .byte $00 ; <indirect ref>
  0x031115 $9105: -D0-I-  .byte $A3 ; <indirect ref>
  0x031116 $9106: -D0-I-  .byte $90 ; <indirect ref>
  0x031117 $9107: -D0-I-  .byte $02 ; <indirect ref>
  0x031118 $9108: -D0-I-  .byte $AB ; <indirect ref>
  0x031119 $9109: -D0-I-  .byte $00 ; <indirect ref>
  0x03111A $910A: -D0-I-  .byte $02 ; <indirect ref>
  0x03111B $910B: -D0-I-  .byte $96 ; <indirect ref>
  0x03111C $910C: -D0-I-  .byte $97 ; <indirect ref>
  0x03111D $910D: -D0-I-  .byte $90 ; <indirect ref>
  0x03111E $910E: -D0-I-  .byte $02 ; <indirect ref>
  0x03111F $910F: -D0-I-  .byte $A1 ; <indirect ref>
  0x031120 $9110: -D0-I-  .byte $00 ; <indirect ref>
  0x031121 $9111: -D0-I-  .byte $02 ; <indirect ref>
  0x031122 $9112: -D0-I-  .byte $00 ; <indirect ref>
  0x031123 $9113: -D0-I-  .byte $A3 ; <indirect ref>
  0x031124 $9114: -D0-I-  .byte $90 ; <indirect ref>
  0x031125 $9115: -D0-I-  .byte $02 ; <indirect ref>
  0x031126 $9116: -D0-I-  .byte $AB ; <indirect ref>
  0x031127 $9117: -D0-I-  .byte $00 ; <indirect ref>
  0x031128 $9118: -D0-I-  .byte $03 ; <indirect ref>
  0x031129 $9119: -D0-I-  .byte $00 ; <indirect ref>
  0x03112A $911A: -D0-I-  .byte $9E ; <indirect ref>
  0x03112B $911B: -D0-I-  .byte $9A ; <indirect ref>
  0x03112C $911C: -D0-I-  .byte $8F ; <indirect ref>
  0x03112D $911D: -D0-I-  .byte $02 ; <indirect ref>
  0x03112E $911E: -D0-I-  .byte $A1 ; <indirect ref>
  0x03112F $911F: -D0-I-  .byte $00 ; <indirect ref>
  0x031130 $9120: -D0-I-  .byte $03 ; <indirect ref>
  0x031131 $9121: -D0-I-  .byte $00 ; <indirect ref>
  0x031132 $9122: -D0-I-  .byte $00 ; <indirect ref>
  0x031133 $9123: -D0-I-  .byte $A3 ; <indirect ref>
  0x031134 $9124: -D0-I-  .byte $8E ; <indirect ref>
  0x031135 $9125: -D0-I-  .byte $03 ; <indirect ref>
  0x031136 $9126: -D0-I-  .byte $9B ; <indirect ref>
  0x031137 $9127: -D0-I-  .byte $9F ; <indirect ref>
  0x031138 $9128: -D0-I-  .byte $00 ; <indirect ref>
  0x031139 $9129: -D0-I-  .byte $14 ; <indirect ref>
  0x03113A $912A: -D0-I-  .byte $00 ; <indirect ref>
  0x03113B $912B: -D0-I-  .byte $00 ; <indirect ref>
  0x03113C $912C: -D0-I-  .byte $9E ; <indirect ref>
  0x03113D $912D: -D0-I-  .byte $A2 ; <indirect ref>
  0x03113E $912E: -D0-I-  .byte $A9 ; <indirect ref>
  0x03113F $912F: -D0-I-  .byte $A2 ; <indirect ref>
  0x031140 $9130: -D0-I-  .byte $A9 ; <indirect ref>
  0x031141 $9131: -D0-I-  .byte $A2 ; <indirect ref>
  0x031142 $9132: -D0-I-  .byte $A9 ; <indirect ref>
  0x031143 $9133: -D0-I-  .byte $A9 ; <indirect ref>
  0x031144 $9134: -D0-I-  .byte $A2 ; <indirect ref>
  0x031145 $9135: -D0-I-  .byte $A2 ; <indirect ref>
  0x031146 $9136: -D0-I-  .byte $A9 ; <indirect ref>
  0x031147 $9137: -D0-I-  .byte $A2 ; <indirect ref>
  0x031148 $9138: -D0-I-  .byte $A2 ; <indirect ref>
  0x031149 $9139: -D0-I-  .byte $A9 ; <indirect ref>
  0x03114A $913A: -D0-I-  .byte $A2 ; <indirect ref>
  0x03114B $913B: -D0-I-  .byte $9F ; <indirect ref>
  0x03114C $913C: -D0-I-  .byte $00 ; <indirect ref>
  0x03114D $913D: -D0-I-  .byte $00 ; <indirect ref>
  0x03114E $913E: -D0-I-  .byte $94 ; <indirect ref>
  0x03114F $913F: -D0-I-  .byte $94 ; <indirect ref>
  0x031150 $9140: -D0-I-  .byte $28 ; <indirect ref>
  0x031151 $9141: -D0-I-  .byte $22 ; <indirect ref>
  0x031152 $9142: -D0-I-  .byte $18 ; <indirect ref>
  0x031153 $9143: -D0-I-  .byte $98 ; <indirect ref>
  0x031154 $9144: -D0-I-  .byte $18 ; <indirect ref>
  0x031155 $9145: -D0-I-  .byte $00 ; <indirect ref>
  0x031156 $9146: -D0-I-  .byte $9C ; <indirect ref>
  0x031157 $9147: -D0-I-  .byte $A8 ; <indirect ref>
  0x031158 $9148: -D0-I-  .byte $A8 ; <indirect ref>
  0x031159 $9149: -D0-I-  .byte $A8 ; <indirect ref>
  0x03115A $914A: -D0-I-  .byte $A8 ; <indirect ref>
  0x03115B $914B: -D0-I-  .byte $A8 ; <indirect ref>
  0x03115C $914C: -D0-I-  .byte $A8 ; <indirect ref>
  0x03115D $914D: -D0-I-  .byte $A8 ; <indirect ref>
  0x03115E $914E: -D0-I-  .byte $A8 ; <indirect ref>
  0x03115F $914F: -D0-I-  .byte $A8 ; <indirect ref>
  0x031160 $9150: -D0-I-  .byte $A8 ; <indirect ref>
  0x031161 $9151: -D0-I-  .byte $A8 ; <indirect ref>
  0x031162 $9152: -D0-I-  .byte $A8 ; <indirect ref>
  0x031163 $9153: -D0-I-  .byte $A8 ; <indirect ref>
  0x031164 $9154: -D0-I-  .byte $A8 ; <indirect ref>
  0x031165 $9155: -D0-I-  .byte $A8 ; <indirect ref>
  0x031166 $9156: -D0-I-  .byte $A8 ; <indirect ref>
  0x031167 $9157: -D0-I-  .byte $A8 ; <indirect ref>
  0x031168 $9158: -D0-I-  .byte $A8 ; <indirect ref>
  0x031169 $9159: -D0-I-  .byte $A8 ; <indirect ref>
  0x03116A $915A: -D0-I-  .byte $9D ; <indirect ref>
  0x03116B $915B: -D0-I-  .byte $00 ; <indirect ref>
  0x03116C $915C: -D0-I-  .byte $00 ; <indirect ref>
  0x03116D $915D: -D0-I-  .byte $02 ; <indirect ref>
  0x03116E $915E: -D0-I-  .byte $00 ; <indirect ref>
  0x03116F $915F: -D0-I-  .byte $AA ; <indirect ref>
  0x031170 $9160: -D0-I-  .byte $93 ; <indirect ref>
  0x031171 $9161: -D0-I-  .byte $03 ; <indirect ref>
  0x031172 $9162: -D0-I-  .byte $AB ; <indirect ref>
  0x031173 $9163: -D0-I-  .byte $00 ; <indirect ref>
  0x031174 $9164: -D0-I-  .byte $00 ; <indirect ref>
  0x031175 $9165: -D0-I-  .byte $02 ; <indirect ref>
  0x031176 $9166: -D0-I-  .byte $00 ; <indirect ref>
  0x031177 $9167: -D0-I-  .byte $AA ; <indirect ref>
  0x031178 $9168: -D0-I-  .byte $93 ; <indirect ref>
  0x031179 $9169: -D0-I-  .byte $03 ; <indirect ref>
  0x03117A $916A: -D0-I-  .byte $AB ; <indirect ref>
  0x03117B $916B: -D0-I-  .byte $00 ; <indirect ref>
  0x03117C $916C: -D0-I-  .byte $00 ; <indirect ref>
  0x03117D $916D: -D0-I-  .byte $02 ; <indirect ref>
  0x03117E $916E: -D0-I-  .byte $00 ; <indirect ref>
  0x03117F $916F: -D0-I-  .byte $AA ; <indirect ref>
  0x031180 $9170: -D0-I-  .byte $93 ; <indirect ref>
  0x031181 $9171: -D0-I-  .byte $03 ; <indirect ref>
  0x031182 $9172: -D0-I-  .byte $AB ; <indirect ref>
  0x031183 $9173: -D0-I-  .byte $00 ; <indirect ref>
  0x031184 $9174: -D0-I-  .byte $00 ; <indirect ref>
  0x031185 $9175: -D0-I-  .byte $02 ; <indirect ref>
  0x031186 $9176: -D0-I-  .byte $00 ; <indirect ref>
  0x031187 $9177: -D0-I-  .byte $AA ; <indirect ref>
  0x031188 $9178: -D0-I-  .byte $93 ; <indirect ref>
  0x031189 $9179: -D0-I-  .byte $03 ; <indirect ref>
  0x03118A $917A: -D0-I-  .byte $AB ; <indirect ref>
  0x03118B $917B: -D0-I-  .byte $00 ; <indirect ref>
  0x03118C $917C: -D0-I-  .byte $00 ; <indirect ref>
  0x03118D $917D: -D0-I-  .byte $02 ; <indirect ref>
  0x03118E $917E: -D0-I-  .byte $00 ; <indirect ref>
  0x03118F $917F: -D0-I-  .byte $AA ; <indirect ref>
  0x031190 $9180: -D0-I-  .byte $93 ; <indirect ref>
  0x031191 $9181: -D0-I-  .byte $03 ; <indirect ref>
  0x031192 $9182: -D0-I-  .byte $AB ; <indirect ref>
  0x031193 $9183: -D0-I-  .byte $00 ; <indirect ref>
  0x031194 $9184: -D0-I-  .byte $00 ; <indirect ref>
  0x031195 $9185: -D0-I-  .byte $02 ; <indirect ref>
  0x031196 $9186: -D0-I-  .byte $00 ; <indirect ref>
  0x031197 $9187: -D0-I-  .byte $AA ; <indirect ref>
  0x031198 $9188: -D0-I-  .byte $93 ; <indirect ref>
  0x031199 $9189: -D0-I-  .byte $03 ; <indirect ref>
  0x03119A $918A: -D0-I-  .byte $AB ; <indirect ref>
  0x03119B $918B: -D0-I-  .byte $00 ; <indirect ref>
  0x03119C $918C: -D0-I-  .byte $00 ; <indirect ref>
  0x03119D $918D: -D0-I-  .byte $02 ; <indirect ref>
  0x03119E $918E: -D0-I-  .byte $00 ; <indirect ref>
  0x03119F $918F: -D0-I-  .byte $AA ; <indirect ref>
  0x0311A0 $9190: -D0-I-  .byte $93 ; <indirect ref>
  0x0311A1 $9191: -D0-I-  .byte $03 ; <indirect ref>
  0x0311A2 $9192: -D0-I-  .byte $AB ; <indirect ref>
  0x0311A3 $9193: -D0-I-  .byte $00 ; <indirect ref>
  0x0311A4 $9194: -D0-I-  .byte $00 ; <indirect ref>
  0x0311A5 $9195: -D0-I-  .byte $18 ; <indirect ref>
  0x0311A6 $9196: -D0-I-  .byte $00 ; <indirect ref>
  0x0311A7 $9197: -D0-I-  .byte $9E ; <indirect ref>
  0x0311A8 $9198: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311A9 $9199: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311AA $919A: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311AB $919B: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311AC $919C: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311AD $919D: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311AE $919E: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311AF $919F: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B0 $91A0: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B1 $91A1: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B2 $91A2: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B3 $91A3: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B4 $91A4: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B5 $91A5: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B6 $91A6: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B7 $91A7: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B8 $91A8: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311B9 $91A9: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311BA $91AA: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311BB $91AB: -D0-I-  .byte $9F ; <indirect ref>
  0x0311BC $91AC: -D0-I-  .byte $00 ; <indirect ref>
  0x0311BD $91AD: -D0-I-  .byte $00 ; <indirect ref>
  0x0311BE $91AE: -D0-I-  .byte $98 ; <indirect ref>
  0x0311BF $91AF: -D0-I-  .byte $98 ; <indirect ref>
  0x0311C0 $91B0: -D0-I-  .byte $28 ; <indirect ref>
  0x0311C1 $91B1: -D0-I-  .byte $22 ; <indirect ref>
  0x0311C2 $91B2: -D0-I-  .byte $18 ; <indirect ref>
  0x0311C3 $91B3: -D0-I-  .byte $98 ; <indirect ref>
  0x0311C4 $91B4: -D0-I-  .byte $18 ; <indirect ref>
  0x0311C5 $91B5: -D0-I-  .byte $00 ; <indirect ref>
  0x0311C6 $91B6: -D0-I-  .byte $9B ; <indirect ref>
  0x0311C7 $91B7: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311C8 $91B8: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311C9 $91B9: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311CA $91BA: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311CB $91BB: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311CC $91BC: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311CD $91BD: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311CE $91BE: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311CF $91BF: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311D0 $91C0: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311D1 $91C1: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311D2 $91C2: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311D3 $91C3: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311D4 $91C4: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311D5 $91C5: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311D6 $91C6: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311D7 $91C7: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311D8 $91C8: -D0-I-  .byte $A2 ; <indirect ref>
  0x0311D9 $91C9: -D0-I-  .byte $A9 ; <indirect ref>
  0x0311DA $91CA: -D0-I-  .byte $9A ; <indirect ref>
  0x0311DB $91CB: -D0-I-  .byte $00 ; <indirect ref>
  0x0311DC $91CC: -D0-I-  .byte $00 ; <indirect ref>
  0x0311DD $91CD: -D0-I-  .byte $02 ; <indirect ref>
  0x0311DE $91CE: -D0-I-  .byte $00 ; <indirect ref>
  0x0311DF $91CF: -D0-I-  .byte $AB ; <indirect ref>
  0x0311E0 $91D0: -D0-I-  .byte $93 ; <indirect ref>
  0x0311E1 $91D1: -D0-I-  .byte $03 ; <indirect ref>
  0x0311E2 $91D2: -D0-I-  .byte $AA ; <indirect ref>
  0x0311E3 $91D3: -D0-I-  .byte $00 ; <indirect ref>
  0x0311E4 $91D4: -D0-I-  .byte $00 ; <indirect ref>
  0x0311E5 $91D5: -D0-I-  .byte $02 ; <indirect ref>
  0x0311E6 $91D6: -D0-I-  .byte $00 ; <indirect ref>
  0x0311E7 $91D7: -D0-I-  .byte $A1 ; <indirect ref>
  0x0311E8 $91D8: -D0-I-  .byte $93 ; <indirect ref>
  0x0311E9 $91D9: -D0-I-  .byte $03 ; <indirect ref>
  0x0311EA $91DA: -D0-I-  .byte $A3 ; <indirect ref>
  0x0311EB $91DB: -D0-I-  .byte $00 ; <indirect ref>
  0x0311EC $91DC: -D0-I-  .byte $00 ; <indirect ref>
  0x0311ED $91DD: -D0-I-  .byte $02 ; <indirect ref>
  0x0311EE $91DE: -D0-I-  .byte $00 ; <indirect ref>
  0x0311EF $91DF: -D0-I-  .byte $AB ; <indirect ref>
  0x0311F0 $91E0: -D0-I-  .byte $93 ; <indirect ref>
  0x0311F1 $91E1: -D0-I-  .byte $03 ; <indirect ref>
  0x0311F2 $91E2: -D0-I-  .byte $AA ; <indirect ref>
  0x0311F3 $91E3: -D0-I-  .byte $00 ; <indirect ref>
  0x0311F4 $91E4: -D0-I-  .byte $00 ; <indirect ref>
  0x0311F5 $91E5: -D0-I-  .byte $02 ; <indirect ref>
  0x0311F6 $91E6: -D0-I-  .byte $00 ; <indirect ref>
  0x0311F7 $91E7: -D0-I-  .byte $A1 ; <indirect ref>
  0x0311F8 $91E8: -D0-I-  .byte $93 ; <indirect ref>
  0x0311F9 $91E9: -D0-I-  .byte $03 ; <indirect ref>
  0x0311FA $91EA: -D0-I-  .byte $A3 ; <indirect ref>
  0x0311FB $91EB: -D0-I-  .byte $00 ; <indirect ref>
  0x0311FC $91EC: -D0-I-  .byte $00 ; <indirect ref>
  0x0311FD $91ED: -D0-I-  .byte $02 ; <indirect ref>
  0x0311FE $91EE: -D0-I-  .byte $00 ; <indirect ref>
  0x0311FF $91EF: -D0-I-  .byte $AB ; <indirect ref>
  0x031200 $91F0: -D0-I-  .byte $93 ; <indirect ref>
  0x031201 $91F1: -D0-I-  .byte $03 ; <indirect ref>
  0x031202 $91F2: -D0-I-  .byte $AA ; <indirect ref>
  0x031203 $91F3: -D0-I-  .byte $00 ; <indirect ref>
  0x031204 $91F4: -D0-I-  .byte $00 ; <indirect ref>
  0x031205 $91F5: -D0-I-  .byte $02 ; <indirect ref>
  0x031206 $91F6: -D0-I-  .byte $00 ; <indirect ref>
  0x031207 $91F7: -D0-I-  .byte $A1 ; <indirect ref>
  0x031208 $91F8: -D0-I-  .byte $93 ; <indirect ref>
  0x031209 $91F9: -D0-I-  .byte $03 ; <indirect ref>
  0x03120A $91FA: -D0-I-  .byte $A3 ; <indirect ref>
  0x03120B $91FB: -D0-I-  .byte $00 ; <indirect ref>
  0x03120C $91FC: -D0-I-  .byte $00 ; <indirect ref>
  0x03120D $91FD: -D0-I-  .byte $02 ; <indirect ref>
  0x03120E $91FE: -D0-I-  .byte $00 ; <indirect ref>
  0x03120F $91FF: -D0-I-  .byte $AB ; <indirect ref>
  0x031210 $9200: -D0-I-  .byte $93 ; <indirect ref>
  0x031211 $9201: -D0-I-  .byte $03 ; <indirect ref>
  0x031212 $9202: -D0-I-  .byte $AA ; <indirect ref>
  0x031213 $9203: -D0-I-  .byte $00 ; <indirect ref>
  0x031214 $9204: -D0-I-  .byte $00 ; <indirect ref>
  0x031215 $9205: -D0-I-  .byte $18 ; <indirect ref>
  0x031216 $9206: -D0-I-  .byte $00 ; <indirect ref>
  0x031217 $9207: -D0-I-  .byte $99 ; <indirect ref>
  0x031218 $9208: -D0-I-  .byte $A8 ; <indirect ref>
  0x031219 $9209: -D0-I-  .byte $A0 ; <indirect ref>
  0x03121A $920A: -D0-I-  .byte $A8 ; <indirect ref>
  0x03121B $920B: -D0-I-  .byte $A0 ; <indirect ref>
  0x03121C $920C: -D0-I-  .byte $A8 ; <indirect ref>
  0x03121D $920D: -D0-I-  .byte $A0 ; <indirect ref>
  0x03121E $920E: -D0-I-  .byte $A8 ; <indirect ref>
  0x03121F $920F: -D0-I-  .byte $A0 ; <indirect ref>
  0x031220 $9210: -D0-I-  .byte $A8 ; <indirect ref>
  0x031221 $9211: -D0-I-  .byte $A0 ; <indirect ref>
  0x031222 $9212: -D0-I-  .byte $A8 ; <indirect ref>
  0x031223 $9213: -D0-I-  .byte $A0 ; <indirect ref>
  0x031224 $9214: -D0-I-  .byte $A8 ; <indirect ref>
  0x031225 $9215: -D0-I-  .byte $A0 ; <indirect ref>
  0x031226 $9216: -D0-I-  .byte $A8 ; <indirect ref>
  0x031227 $9217: -D0-I-  .byte $A0 ; <indirect ref>
  0x031228 $9218: -D0-I-  .byte $A8 ; <indirect ref>
  0x031229 $9219: -D0-I-  .byte $A0 ; <indirect ref>
  0x03122A $921A: -D0-I-  .byte $A8 ; <indirect ref>
  0x03122B $921B: -D0-I-  .byte $98 ; <indirect ref>
  0x03122C $921C: -D0-I-  .byte $00 ; <indirect ref>
  0x03122D $921D: -D0-I-  .byte $00 ; <indirect ref>
  0x03122E $921E: -D0-I-  .byte $98 ; <indirect ref>
  0x03122F $921F: -D0-I-  .byte $98 ; <indirect ref>
  0x031230 $9220: -D0-I-  .byte $00 ; <indirect ref>
  0x031231 $9221: -D0-I-  .byte $94 ; <indirect ref>
  0x031232 $9222: -D0-I-  .byte $02 ; <indirect ref>
  0x031233 $9223: -D0-I-  .byte $94 ; <indirect ref>
  0x031234 $9224: -D0-I-  .byte $11 ; <indirect ref>
  0x031235 $9225: -D0-I-  .byte $94 ; <indirect ref>
  0x031236 $9226: -D0-I-  .byte $20 ; <indirect ref>
  0x031237 $9227: -D0-I-  .byte $94 ; <indirect ref>
  0x031238 $9228: -D0-I-  .byte $3B ; <indirect ref>
  0x031239 $9229: -D0-I-  .byte $94 ; <indirect ref>
  0x03123A $922A: -D0-I-  .byte $47 ; <indirect ref>
  0x03123B $922B: -D0-I-  .byte $94 ; <indirect ref>
  0x03123C $922C: -D0-I-  .byte $55 ; <indirect ref>
  0x03123D $922D: -D0-I-  .byte $94 ; <indirect ref>
  0x03123E $922E: -D0-I-  .byte $65 ; <indirect ref>
  0x03123F $922F: -D0-I-  .byte $94 ; <indirect ref>
  0x031240 $9230: -D0-I-  .byte $71 ; <indirect ref>
  0x031241 $9231: -D0-I-  .byte $94 ; <indirect ref>
  0x031242 $9232: -D0-I-  .byte $8A ; <indirect ref>
  0x031243 $9233: -D0-I-  .byte $94 ; <indirect ref>
  0x031244 $9234: -D0-I-  .byte $95 ; <indirect ref>
  0x031245 $9235: -D0-I-  .byte $94 ; <indirect ref>
  0x031246 $9236: -D0-I-  .byte $AD ; <indirect ref>
  0x031247 $9237: -D0-I-  .byte $94 ; <indirect ref>
  0x031248 $9238: -D0-I-  .byte $BB ; <indirect ref>
  0x031249 $9239: -D0-I-  .byte $94 ; <indirect ref>
  0x03124A $923A: -D0-I-  .byte $CE ; <indirect ref>
  0x03124B $923B: -D0-I-  .byte $94 ; <indirect ref>
  0x03124C $923C: -D0-I-  .byte $D1 ; <indirect ref>
  0x03124D $923D: -D0-I-  .byte $94 ; <indirect ref>
  0x03124E $923E: -D0-I-  .byte $D9 ; <indirect ref>
  0x03124F $923F: -D0-I-  .byte $94 ; <indirect ref>
  0x031250 $9240: -D0-I-  .byte $E4 ; <indirect ref>
  0x031251 $9241: -D0-I-  .byte $94 ; <indirect ref>
  0x031252 $9242: -D0-I-  .byte $FC ; <indirect ref>
  0x031253 $9243: -D0-I-  .byte $94 ; <indirect ref>
  0x031254 $9244: -D0-I-  .byte $12 ; <indirect ref>
  0x031255 $9245: -D0-I-  .byte $95 ; <indirect ref>
  0x031256 $9246: -D0-I-  .byte $27 ; <indirect ref>
  0x031257 $9247: -D0-I-  .byte $95 ; <indirect ref>
  0x031258 $9248: -D0-I-  .byte $2E ; <indirect ref>
  0x031259 $9249: -D0-I-  .byte $95 ; <indirect ref>
  0x03125A $924A: -D0-I-  .byte $48 ; <indirect ref>
  0x03125B $924B: -D0-I-  .byte $95 ; <indirect ref>
  0x03125C $924C: -D0-I-  .byte $55 ; <indirect ref>
  0x03125D $924D: -D0-I-  .byte $95 ; <indirect ref>
  0x03125E $924E: -D0-I-  .byte $63 ; <indirect ref>
  0x03125F $924F: -D0-I-  .byte $95 ; <indirect ref>
  0x031260 $9250: -D0-I-  .byte $6F ; <indirect ref>
  0x031261 $9251: -D0-I-  .byte $95 ; <indirect ref>
  0x031262 $9252: -D0-I-  .byte $8B ; <indirect ref>
  0x031263 $9253: -D0-I-  .byte $95 ; <indirect ref>
  0x031264 $9254: -D0-I-  .byte $9A ; <indirect ref>
  0x031265 $9255: -D0-I-  .byte $95 ; <indirect ref>
  0x031266 $9256: -D0-I-  .byte $A9 ; <indirect ref>
  0x031267 $9257: -D0-I-  .byte $95 ; <indirect ref>
  0x031268 $9258: -D0-I-  .byte $B7 ; <indirect ref>
  0x031269 $9259: -D0-I-  .byte $95 ; <indirect ref>
  0x03126A $925A: -D0-I-  .byte $CE ; <indirect ref>
  0x03126B $925B: -D0-I-  .byte $95 ; <indirect ref>
  0x03126C $925C: -D0-I-  .byte $E6 ; <indirect ref>
  0x03126D $925D: -D0-I-  .byte $95 ; <indirect ref>
  0x03126E $925E: -D0-I-  .byte $08 ; <indirect ref>
  0x03126F $925F: -D0-I-  .byte $96 ; <indirect ref>
  0x031270 $9260: -D0-I-  .byte $21 ; <indirect ref>
  0x031271 $9261: -D0-I-  .byte $96 ; <indirect ref>
  0x031272 $9262: -D0-I-  .byte $2A ; <indirect ref>
  0x031273 $9263: -D0-I-  .byte $96 ; <indirect ref>
  0x031274 $9264: -D0-I-  .byte $40 ; <indirect ref>
  0x031275 $9265: -D0-I-  .byte $96 ; <indirect ref>
  0x031276 $9266: -D0-I-  .byte $77 ; <indirect ref>
  0x031277 $9267: -D0-I-  .byte $96 ; <indirect ref>
  0x031278 $9268: -D0-I-  .byte $86 ; <indirect ref>
  0x031279 $9269: -D0-I-  .byte $96 ; <indirect ref>
  0x03127A $926A: -D0-I-  .byte $92 ; <indirect ref>
  0x03127B $926B: -D0-I-  .byte $96 ; <indirect ref>
  0x03127C $926C: -D0-I-  .byte $A7 ; <indirect ref>
  0x03127D $926D: -D0-I-  .byte $96 ; <indirect ref>
  0x03127E $926E: -D0-I-  .byte $BF ; <indirect ref>
  0x03127F $926F: -D0-I-  .byte $96 ; <indirect ref>
  0x031280 $9270: -D0-I-  .byte $DA ; <indirect ref>
  0x031281 $9271: -D0-I-  .byte $96 ; <indirect ref>
  0x031282 $9272: -D0-I-  .byte $EA ; <indirect ref>
  0x031283 $9273: -D0-I-  .byte $96 ; <indirect ref>
  0x031284 $9274: ------  .byte $F6
  0x031285 $9275: ------  .byte $96
  0x031286 $9276: ------  .byte $01
  0x031287 $9277: ------  .byte $97
  0x031288 $9278: -D0-I-  .byte $0D ; <indirect ref>
  0x031289 $9279: -D0-I-  .byte $97 ; <indirect ref>
  0x03128A $927A: ------  .byte $18
  0x03128B $927B: ------  .byte $97
  0x03128C $927C: -D0-I-  .byte $31 ; <indirect ref>
  0x03128D $927D: -D0-I-  .byte $97 ; <indirect ref>
  0x03128E $927E: -D0-I-  .byte $3F ; <indirect ref>
  0x03128F $927F: -D0-I-  .byte $97 ; <indirect ref>
  0x031290 $9280: -D0-I-  .byte $4E ; <indirect ref>
  0x031291 $9281: -D0-I-  .byte $97 ; <indirect ref>
  0x031292 $9282: -D0-I-  .byte $5F ; <indirect ref>
  0x031293 $9283: -D0-I-  .byte $97 ; <indirect ref>
  0x031294 $9284: -D0-I-  .byte $97 ; <indirect ref>
  0x031295 $9285: -D0-I-  .byte $97 ; <indirect ref>
  0x031296 $9286: -D0-I-  .byte $C4 ; <indirect ref>
  0x031297 $9287: -D0-I-  .byte $97 ; <indirect ref>
  0x031298 $9288: -D0-I-  .byte $D3 ; <indirect ref>
  0x031299 $9289: -D0-I-  .byte $97 ; <indirect ref>
  0x03129A $928A: -D0-I-  .byte $E4 ; <indirect ref>
  0x03129B $928B: -D0-I-  .byte $97 ; <indirect ref>
  0x03129C $928C: -D0-I-  .byte $FE ; <indirect ref>
  0x03129D $928D: -D0-I-  .byte $97 ; <indirect ref>
  0x03129E $928E: -D0-I-  .byte $10 ; <indirect ref>
  0x03129F $928F: -D0-I-  .byte $98 ; <indirect ref>
  0x0312A0 $9290: -D0-I-  .byte $33 ; <indirect ref>
  0x0312A1 $9291: -D0-I-  .byte $98 ; <indirect ref>
  0x0312A2 $9292: -D0-I-  .byte $43 ; <indirect ref>
  0x0312A3 $9293: -D0-I-  .byte $98 ; <indirect ref>
  0x0312A4 $9294: -D0-I-  .byte $4C ; <indirect ref>
  0x0312A5 $9295: -D0-I-  .byte $98 ; <indirect ref>
  0x0312A6 $9296: -D0-I-  .byte $5C ; <indirect ref>
  0x0312A7 $9297: -D0-I-  .byte $98 ; <indirect ref>
  0x0312A8 $9298: -D0-I-  .byte $6C ; <indirect ref>
  0x0312A9 $9299: -D0-I-  .byte $98 ; <indirect ref>
  0x0312AA $929A: -D0-I-  .byte $7A ; <indirect ref>
  0x0312AB $929B: -D0-I-  .byte $98 ; <indirect ref>
  0x0312AC $929C: -D0-I-  .byte $8E ; <indirect ref>
  0x0312AD $929D: -D0-I-  .byte $98 ; <indirect ref>
  0x0312AE $929E: -D0-I-  .byte $9B ; <indirect ref>
  0x0312AF $929F: -D0-I-  .byte $98 ; <indirect ref>
  0x0312B0 $92A0: -D0-I-  .byte $A4 ; <indirect ref>
  0x0312B1 $92A1: -D0-I-  .byte $98 ; <indirect ref>
  0x0312B2 $92A2: -D0-I-  .byte $B4 ; <indirect ref>
  0x0312B3 $92A3: -D0-I-  .byte $98 ; <indirect ref>
  0x0312B4 $92A4: -D0-I-  .byte $C1 ; <indirect ref>
  0x0312B5 $92A5: -D0-I-  .byte $98 ; <indirect ref>
  0x0312B6 $92A6: -D0-I-  .byte $CF ; <indirect ref>
  0x0312B7 $92A7: -D0-I-  .byte $98 ; <indirect ref>
  0x0312B8 $92A8: -D0-I-  .byte $E7 ; <indirect ref>
  0x0312B9 $92A9: -D0-I-  .byte $98 ; <indirect ref>
  0x0312BA $92AA: -D0-I-  .byte $F4 ; <indirect ref>
  0x0312BB $92AB: -D0-I-  .byte $98 ; <indirect ref>
  0x0312BC $92AC: -D0-I-  .byte $0B ; <indirect ref>
  0x0312BD $92AD: -D0-I-  .byte $99 ; <indirect ref>
  0x0312BE $92AE: -D0-I-  .byte $17 ; <indirect ref>
  0x0312BF $92AF: -D0-I-  .byte $99 ; <indirect ref>
  0x0312C0 $92B0: -D0-I-  .byte $21 ; <indirect ref>
  0x0312C1 $92B1: -D0-I-  .byte $99 ; <indirect ref>
  0x0312C2 $92B2: -D0-I-  .byte $2D ; <indirect ref>
  0x0312C3 $92B3: -D0-I-  .byte $99 ; <indirect ref>
  0x0312C4 $92B4: -D0-I-  .byte $38 ; <indirect ref>
  0x0312C5 $92B5: -D0-I-  .byte $99 ; <indirect ref>
  0x0312C6 $92B6: -D0-I-  .byte $4E ; <indirect ref>
  0x0312C7 $92B7: -D0-I-  .byte $99 ; <indirect ref>
  0x0312C8 $92B8: -D0-I-  .byte $63 ; <indirect ref>
  0x0312C9 $92B9: -D0-I-  .byte $99 ; <indirect ref>
  0x0312CA $92BA: -D0-I-  .byte $75 ; <indirect ref>
  0x0312CB $92BB: -D0-I-  .byte $99 ; <indirect ref>
  0x0312CC $92BC: ------  .byte $7D
  0x0312CD $92BD: ------  .byte $99
  0x0312CE $92BE: ------  .byte $7D
  0x0312CF $92BF: ------  .byte $99
  0x0312D0 $92C0: -D0-I-  .byte $8D ; <indirect ref>
  0x0312D1 $92C1: -D0-I-  .byte $99 ; <indirect ref>
  0x0312D2 $92C2: -D0-I-  .byte $9F ; <indirect ref>
  0x0312D3 $92C3: -D0-I-  .byte $99 ; <indirect ref>
  0x0312D4 $92C4: -D0-I-  .byte $BB ; <indirect ref>
  0x0312D5 $92C5: -D0-I-  .byte $99 ; <indirect ref>
  0x0312D6 $92C6: -D0-I-  .byte $D9 ; <indirect ref>
  0x0312D7 $92C7: -D0-I-  .byte $99 ; <indirect ref>
  0x0312D8 $92C8: ------  .byte $FA
  0x0312D9 $92C9: ------  .byte $99
  0x0312DA $92CA: -D0-I-  .byte $1C ; <indirect ref>
  0x0312DB $92CB: -D0-I-  .byte $9A ; <indirect ref>
  0x0312DC $92CC: -D0-I-  .byte $3D ; <indirect ref>
  0x0312DD $92CD: -D0-I-  .byte $9A ; <indirect ref>
  0x0312DE $92CE: -D0-I-  .byte $48 ; <indirect ref>
  0x0312DF $92CF: -D0-I-  .byte $9A ; <indirect ref>
  0x0312E0 $92D0: -D0-I-  .byte $62 ; <indirect ref>
  0x0312E1 $92D1: -D0-I-  .byte $9A ; <indirect ref>
  0x0312E2 $92D2: -D0-I-  .byte $70 ; <indirect ref>
  0x0312E3 $92D3: -D0-I-  .byte $9A ; <indirect ref>
  0x0312E4 $92D4: -D0-I-  .byte $80 ; <indirect ref>
  0x0312E5 $92D5: -D0-I-  .byte $9A ; <indirect ref>
  0x0312E6 $92D6: -D0-I-  .byte $96 ; <indirect ref>
  0x0312E7 $92D7: -D0-I-  .byte $9A ; <indirect ref>
  0x0312E8 $92D8: -D0-I-  .byte $AF ; <indirect ref>
  0x0312E9 $92D9: -D0-I-  .byte $9A ; <indirect ref>
  0x0312EA $92DA: -D0-I-  .byte $C6 ; <indirect ref>
  0x0312EB $92DB: -D0-I-  .byte $9A ; <indirect ref>
  0x0312EC $92DC: -D0-I-  .byte $D9 ; <indirect ref>
  0x0312ED $92DD: -D0-I-  .byte $9A ; <indirect ref>
  0x0312EE $92DE: -D0-I-  .byte $E9 ; <indirect ref>
  0x0312EF $92DF: -D0-I-  .byte $9A ; <indirect ref>
  0x0312F0 $92E0: -D0-I-  .byte $FA ; <indirect ref>
  0x0312F1 $92E1: -D0-I-  .byte $9A ; <indirect ref>
  0x0312F2 $92E2: -D0-I-  .byte $07 ; <indirect ref>
  0x0312F3 $92E3: -D0-I-  .byte $9B ; <indirect ref>
  0x0312F4 $92E4: -D0-I-  .byte $17 ; <indirect ref>
  0x0312F5 $92E5: -D0-I-  .byte $9B ; <indirect ref>
  0x0312F6 $92E6: -D0-I-  .byte $26 ; <indirect ref>
  0x0312F7 $92E7: -D0-I-  .byte $9B ; <indirect ref>
  0x0312F8 $92E8: -D0-I-  .byte $36 ; <indirect ref>
  0x0312F9 $92E9: -D0-I-  .byte $9B ; <indirect ref>
  0x0312FA $92EA: -D0-I-  .byte $47 ; <indirect ref>
  0x0312FB $92EB: -D0-I-  .byte $9B ; <indirect ref>
  0x0312FC $92EC: -D0-I-  .byte $60 ; <indirect ref>
  0x0312FD $92ED: -D0-I-  .byte $9B ; <indirect ref>
  0x0312FE $92EE: -D0-I-  .byte $7A ; <indirect ref>
  0x0312FF $92EF: -D0-I-  .byte $9B ; <indirect ref>
  0x031300 $92F0: ------  .byte $88
  0x031301 $92F1: ------  .byte $9B
  0x031302 $92F2: -D0-I-  .byte $92 ; <indirect ref>
  0x031303 $92F3: -D0-I-  .byte $9B ; <indirect ref>
  0x031304 $92F4: -D0-I-  .byte $C1 ; <indirect ref>
  0x031305 $92F5: -D0-I-  .byte $9B ; <indirect ref>
  0x031306 $92F6: -D0-I-  .byte $CD ; <indirect ref>
  0x031307 $92F7: -D0-I-  .byte $9B ; <indirect ref>
  0x031308 $92F8: -D0-I-  .byte $D7 ; <indirect ref>
  0x031309 $92F9: -D0-I-  .byte $9B ; <indirect ref>
  0x03130A $92FA: -D0-I-  .byte $E3 ; <indirect ref>
  0x03130B $92FB: -D0-I-  .byte $9B ; <indirect ref>
  0x03130C $92FC: -D0-I-  .byte $71 ; <indirect ref>
  0x03130D $92FD: -D0-I-  .byte $9C ; <indirect ref>
  0x03130E $92FE: -D0-I-  .byte $82 ; <indirect ref>
  0x03130F $92FF: -D0-I-  .byte $9C ; <indirect ref>
  0x031310 $9300: -D0-I-  .byte $92 ; <indirect ref>
  0x031311 $9301: -D0-I-  .byte $9C ; <indirect ref>
  0x031312 $9302: -D0-I-  .byte $AA ; <indirect ref>
  0x031313 $9303: -D0-I-  .byte $9C ; <indirect ref>
  0x031314 $9304: -D0-I-  .byte $31 ; <indirect ref>
  0x031315 $9305: -D0-I-  .byte $9F ; <indirect ref>
  0x031316 $9306: -D0-I-  .byte $42 ; <indirect ref>
  0x031317 $9307: -D0-I-  .byte $9F ; <indirect ref>
  0x031318 $9308: -D0-I-  .byte $BD ; <indirect ref>
  0x031319 $9309: -D0-I-  .byte $A3 ; <indirect ref>
  0x03131A $930A: -D0-I-  .byte $39 ; <indirect ref>
  0x03131B $930B: -D0-I-  .byte $A4 ; <indirect ref>
  0x03131C $930C: -D0-I-  .byte $47 ; <indirect ref>
  0x03131D $930D: -D0-I-  .byte $A4 ; <indirect ref>
  0x03131E $930E: -D0-I-  .byte $61 ; <indirect ref>
  0x03131F $930F: -D0-I-  .byte $A4 ; <indirect ref>
  0x031320 $9310: -D0-I-  .byte $6C ; <indirect ref>
  0x031321 $9311: -D0-I-  .byte $A4 ; <indirect ref>
  0x031322 $9312: -D0-I-  .byte $8C ; <indirect ref>
  0x031323 $9313: -D0-I-  .byte $A4 ; <indirect ref>
  0x031324 $9314: -D0-I-  .byte $A7 ; <indirect ref>
  0x031325 $9315: -D0-I-  .byte $A4 ; <indirect ref>
  0x031326 $9316: -D0-I-  .byte $B4 ; <indirect ref>
  0x031327 $9317: -D0-I-  .byte $A4 ; <indirect ref>
  0x031328 $9318: -D0-I-  .byte $C2 ; <indirect ref>
  0x031329 $9319: -D0-I-  .byte $A4 ; <indirect ref>
  0x03132A $931A: -D0-I-  .byte $E2 ; <indirect ref>
  0x03132B $931B: -D0-I-  .byte $A4 ; <indirect ref>
  0x03132C $931C: -D0-I-  .byte $05 ; <indirect ref>
  0x03132D $931D: -D0-I-  .byte $A5 ; <indirect ref>
  0x03132E $931E: -D0-I-  .byte $16 ; <indirect ref>
  0x03132F $931F: -D0-I-  .byte $A5 ; <indirect ref>
  0x031330 $9320: -D0-I-  .byte $1E ; <indirect ref>
  0x031331 $9321: -D0-I-  .byte $A5 ; <indirect ref>
  0x031332 $9322: -D0-I-  .byte $49 ; <indirect ref>
  0x031333 $9323: -D0-I-  .byte $A5 ; <indirect ref>
  0x031334 $9324: -D0-I-  .byte $5B ; <indirect ref>
  0x031335 $9325: -D0-I-  .byte $A5 ; <indirect ref>
  0x031336 $9326: -D0-I-  .byte $6D ; <indirect ref>
  0x031337 $9327: -D0-I-  .byte $A5 ; <indirect ref>
  0x031338 $9328: -D0-I-  .byte $81 ; <indirect ref>
  0x031339 $9329: -D0-I-  .byte $A5 ; <indirect ref>
  0x03133A $932A: -D0-I-  .byte $8B ; <indirect ref>
  0x03133B $932B: -D0-I-  .byte $A5 ; <indirect ref>
  0x03133C $932C: -D0-I-  .byte $97 ; <indirect ref>
  0x03133D $932D: -D0-I-  .byte $A5 ; <indirect ref>
  0x03133E $932E: -D0-I-  .byte $A8 ; <indirect ref>
  0x03133F $932F: -D0-I-  .byte $A5 ; <indirect ref>
  0x031340 $9330: ------  .byte $B4
  0x031341 $9331: ------  .byte $A5
  0x031342 $9332: -D0-I-  .byte $B5 ; <indirect ref>
  0x031343 $9333: -D0-I-  .byte $A5 ; <indirect ref>
  0x031344 $9334: -D0-I-  .byte $C8 ; <indirect ref>
  0x031345 $9335: -D0-I-  .byte $A5 ; <indirect ref>
  0x031346 $9336: -D0-I-  .byte $D8 ; <indirect ref>
  0x031347 $9337: -D0-I-  .byte $A5 ; <indirect ref>
  0x031348 $9338: -D0-I-  .byte $10 ; <indirect ref>
  0x031349 $9339: -D0-I-  .byte $A6 ; <indirect ref>
  0x03134A $933A: -D0-I-  .byte $3B ; <indirect ref>
  0x03134B $933B: -D0-I-  .byte $A6 ; <indirect ref>
  0x03134C $933C: -D0-I-  .byte $44 ; <indirect ref>
  0x03134D $933D: -D0-I-  .byte $A6 ; <indirect ref>
  0x03134E $933E: -D0-I-  .byte $51 ; <indirect ref>
  0x03134F $933F: -D0-I-  .byte $A6 ; <indirect ref>
  0x031350 $9340: -D0-I-  .byte $5D ; <indirect ref>
  0x031351 $9341: -D0-I-  .byte $A6 ; <indirect ref>
  0x031352 $9342: -D0-I-  .byte $69 ; <indirect ref>
  0x031353 $9343: -D0-I-  .byte $A6 ; <indirect ref>
  0x031354 $9344: -D0-I-  .byte $78 ; <indirect ref>
  0x031355 $9345: -D0-I-  .byte $A6 ; <indirect ref>
  0x031356 $9346: -D0-I-  .byte $87 ; <indirect ref>
  0x031357 $9347: -D0-I-  .byte $A6 ; <indirect ref>
  0x031358 $9348: -D0-I-  .byte $96 ; <indirect ref>
  0x031359 $9349: -D0-I-  .byte $A6 ; <indirect ref>
  0x03135A $934A: -D0-I-  .byte $A7 ; <indirect ref>
  0x03135B $934B: -D0-I-  .byte $A6 ; <indirect ref>
  0x03135C $934C: -D0-I-  .byte $B9 ; <indirect ref>
  0x03135D $934D: -D0-I-  .byte $A6 ; <indirect ref>
  0x03135E $934E: -D0-I-  .byte $EB ; <indirect ref>
  0x03135F $934F: -D0-I-  .byte $A6 ; <indirect ref>
  0x031360 $9350: -D0-I-  .byte $F7 ; <indirect ref>
  0x031361 $9351: -D0-I-  .byte $A6 ; <indirect ref>
  0x031362 $9352: -D0-I-  .byte $01 ; <indirect ref>
  0x031363 $9353: -D0-I-  .byte $A7 ; <indirect ref>
  0x031364 $9354: -D0-I-  .byte $0A ; <indirect ref>
  0x031365 $9355: -D0-I-  .byte $A7 ; <indirect ref>
  0x031366 $9356: -D0-I-  .byte $16 ; <indirect ref>
  0x031367 $9357: -D0-I-  .byte $A7 ; <indirect ref>
  0x031368 $9358: -D0-I-  .byte $28 ; <indirect ref>
  0x031369 $9359: -D0-I-  .byte $A7 ; <indirect ref>
  0x03136A $935A: -D0-I-  .byte $51 ; <indirect ref>
  0x03136B $935B: -D0-I-  .byte $A7 ; <indirect ref>
  0x03136C $935C: -D0-I-  .byte $77 ; <indirect ref>
  0x03136D $935D: -D0-I-  .byte $A7 ; <indirect ref>
  0x03136E $935E: -D0-I-  .byte $A0 ; <indirect ref>
  0x03136F $935F: -D0-I-  .byte $A7 ; <indirect ref>
  0x031370 $9360: -D0-I-  .byte $B1 ; <indirect ref>
  0x031371 $9361: -D0-I-  .byte $A7 ; <indirect ref>
  0x031372 $9362: -D0-I-  .byte $CB ; <indirect ref>
  0x031373 $9363: -D0-I-  .byte $A7 ; <indirect ref>
  0x031374 $9364: -D0-I-  .byte $D5 ; <indirect ref>
  0x031375 $9365: -D0-I-  .byte $A7 ; <indirect ref>
  0x031376 $9366: -D0-I-  .byte $E0 ; <indirect ref>
  0x031377 $9367: -D0-I-  .byte $A7 ; <indirect ref>
  0x031378 $9368: -D0-I-  .byte $ED ; <indirect ref>
  0x031379 $9369: -D0-I-  .byte $A7 ; <indirect ref>
  0x03137A $936A: -D0-I-  .byte $F8 ; <indirect ref>
  0x03137B $936B: -D0-I-  .byte $A7 ; <indirect ref>
  0x03137C $936C: -D0-I-  .byte $04 ; <indirect ref>
  0x03137D $936D: -D0-I-  .byte $A8 ; <indirect ref>
  0x03137E $936E: ------  .byte $1B
  0x03137F $936F: ------  .byte $A8
  0x031380 $9370: -D0-I-  .byte $1B ; <indirect ref>
  0x031381 $9371: -D0-I-  .byte $A8 ; <indirect ref>
  0x031382 $9372: -D0-I-  .byte $23 ; <indirect ref>
  0x031383 $9373: -D0-I-  .byte $A8 ; <indirect ref>
  0x031384 $9374: -D0-I-  .byte $35 ; <indirect ref>
  0x031385 $9375: -D0-I-  .byte $A8 ; <indirect ref>
  0x031386 $9376: -D0-I-  .byte $43 ; <indirect ref>
  0x031387 $9377: -D0-I-  .byte $A8 ; <indirect ref>
  0x031388 $9378: -D0-I-  .byte $4E ; <indirect ref>
  0x031389 $9379: -D0-I-  .byte $A8 ; <indirect ref>
  0x03138A $937A: -D0-I-  .byte $56 ; <indirect ref>
  0x03138B $937B: -D0-I-  .byte $A8 ; <indirect ref>
  0x03138C $937C: -D0-I-  .byte $65 ; <indirect ref>
  0x03138D $937D: -D0-I-  .byte $A8 ; <indirect ref>
  0x03138E $937E: -D0-I-  .byte $6F ; <indirect ref>
  0x03138F $937F: -D0-I-  .byte $A8 ; <indirect ref>
  0x031390 $9380: -D0-I-  .byte $7A ; <indirect ref>
  0x031391 $9381: -D0-I-  .byte $A8 ; <indirect ref>
  0x031392 $9382: -D0-I-  .byte $80 ; <indirect ref>
  0x031393 $9383: -D0-I-  .byte $A8 ; <indirect ref>
  0x031394 $9384: -D0-I-  .byte $92 ; <indirect ref>
  0x031395 $9385: -D0-I-  .byte $A8 ; <indirect ref>
  0x031396 $9386: -D0-I-  .byte $9E ; <indirect ref>
  0x031397 $9387: -D0-I-  .byte $A8 ; <indirect ref>
  0x031398 $9388: -D0-I-  .byte $B9 ; <indirect ref>
  0x031399 $9389: -D0-I-  .byte $A8 ; <indirect ref>
  0x03139A $938A: -D0-I-  .byte $C1 ; <indirect ref>
  0x03139B $938B: -D0-I-  .byte $A8 ; <indirect ref>
  0x03139C $938C: -D0-I-  .byte $C9 ; <indirect ref>
  0x03139D $938D: -D0-I-  .byte $A8 ; <indirect ref>
  0x03139E $938E: -D0-I-  .byte $D8 ; <indirect ref>
  0x03139F $938F: -D0-I-  .byte $A8 ; <indirect ref>
  0x0313A0 $9390: -D0-I-  .byte $E0 ; <indirect ref>
  0x0313A1 $9391: -D0-I-  .byte $A8 ; <indirect ref>
  0x0313A2 $9392: -D0-I-  .byte $E9 ; <indirect ref>
  0x0313A3 $9393: -D0-I-  .byte $A8 ; <indirect ref>
  0x0313A4 $9394: -D0-I-  .byte $09 ; <indirect ref>
  0x0313A5 $9395: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313A6 $9396: -D0-I-  .byte $13 ; <indirect ref>
  0x0313A7 $9397: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313A8 $9398: -D0-I-  .byte $1F ; <indirect ref>
  0x0313A9 $9399: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313AA $939A: -D0-I-  .byte $27 ; <indirect ref>
  0x0313AB $939B: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313AC $939C: -D0-I-  .byte $39 ; <indirect ref>
  0x0313AD $939D: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313AE $939E: -D0-I-  .byte $49 ; <indirect ref>
  0x0313AF $939F: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313B0 $93A0: -D0-I-  .byte $62 ; <indirect ref>
  0x0313B1 $93A1: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313B2 $93A2: -D0-I-  .byte $6B ; <indirect ref>
  0x0313B3 $93A3: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313B4 $93A4: -D0-I-  .byte $75 ; <indirect ref>
  0x0313B5 $93A5: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313B6 $93A6: -D0-I-  .byte $7C ; <indirect ref>
  0x0313B7 $93A7: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313B8 $93A8: -D0-I-  .byte $89 ; <indirect ref>
  0x0313B9 $93A9: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313BA $93AA: -D0-I-  .byte $91 ; <indirect ref>
  0x0313BB $93AB: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313BC $93AC: -D0-I-  .byte $9F ; <indirect ref>
  0x0313BD $93AD: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313BE $93AE: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313BF $93AF: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313C0 $93B0: -D0-I-  .byte $B0 ; <indirect ref>
  0x0313C1 $93B1: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313C2 $93B2: -D0-I-  .byte $C9 ; <indirect ref>
  0x0313C3 $93B3: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313C4 $93B4: -D0-I-  .byte $D1 ; <indirect ref>
  0x0313C5 $93B5: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313C6 $93B6: -D0-I-  .byte $DE ; <indirect ref>
  0x0313C7 $93B7: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313C8 $93B8: -D0-I-  .byte $E8 ; <indirect ref>
  0x0313C9 $93B9: -D0-I-  .byte $A9 ; <indirect ref>
  0x0313CA $93BA: -D0-I-  .byte $0F ; <indirect ref>
  0x0313CB $93BB: -D0-I-  .byte $AA ; <indirect ref>
  0x0313CC $93BC: -D0-I-  .byte $1B ; <indirect ref>
  0x0313CD $93BD: -D0-I-  .byte $AA ; <indirect ref>
  0x0313CE $93BE: -D0-I-  .byte $24 ; <indirect ref>
  0x0313CF $93BF: -D0-I-  .byte $AA ; <indirect ref>
  0x0313D0 $93C0: -D0-I-  .byte $5A ; <indirect ref>
  0x0313D1 $93C1: -D0-I-  .byte $AA ; <indirect ref>
  0x0313D2 $93C2: -D0-I-  .byte $68 ; <indirect ref>
  0x0313D3 $93C3: -D0-I-  .byte $AA ; <indirect ref>
  0x0313D4 $93C4: -D0-I-  .byte $70 ; <indirect ref>
  0x0313D5 $93C5: -D0-I-  .byte $AA ; <indirect ref>
  0x0313D6 $93C6: -D0-I-  .byte $A5 ; <indirect ref>
  0x0313D7 $93C7: -D0-I-  .byte $AA ; <indirect ref>
  0x0313D8 $93C8: -D0-I-  .byte $B2 ; <indirect ref>
  0x0313D9 $93C9: -D0-I-  .byte $AA ; <indirect ref>
  0x0313DA $93CA: -D0-I-  .byte $BD ; <indirect ref>
  0x0313DB $93CB: -D0-I-  .byte $AA ; <indirect ref>
  0x0313DC $93CC: -D0-I-  .byte $D5 ; <indirect ref>
  0x0313DD $93CD: -D0-I-  .byte $AA ; <indirect ref>
  0x0313DE $93CE: -D0-I-  .byte $04 ; <indirect ref>
  0x0313DF $93CF: -D0-I-  .byte $AB ; <indirect ref>
  0x0313E0 $93D0: -D0-I-  .byte $0E ; <indirect ref>
  0x0313E1 $93D1: -D0-I-  .byte $AB ; <indirect ref>
  0x0313E2 $93D2: -D0-I-  .byte $25 ; <indirect ref>
  0x0313E3 $93D3: -D0-I-  .byte $AB ; <indirect ref>
  0x0313E4 $93D4: -D0-I-  .byte $3E ; <indirect ref>
  0x0313E5 $93D5: -D0-I-  .byte $AB ; <indirect ref>
  0x0313E6 $93D6: -D0-I-  .byte $4B ; <indirect ref>
  0x0313E7 $93D7: -D0-I-  .byte $AB ; <indirect ref>
  0x0313E8 $93D8: ------  .byte $66
  0x0313E9 $93D9: ------  .byte $AB
  0x0313EA $93DA: -D0-I-  .byte $66 ; <indirect ref>
  0x0313EB $93DB: -D0-I-  .byte $AB ; <indirect ref>
  0x0313EC $93DC: -D0-I-  .byte $95 ; <indirect ref>
  0x0313ED $93DD: -D0-I-  .byte $AB ; <indirect ref>
  0x0313EE $93DE: ------  .byte $A0
  0x0313EF $93DF: ------  .byte $AB
  0x0313F0 $93E0: -D0-I-  .byte $A0 ; <indirect ref>
  0x0313F1 $93E1: -D0-I-  .byte $AB ; <indirect ref>
  0x0313F2 $93E2: -D0-I-  .byte $AC ; <indirect ref>
  0x0313F3 $93E3: -D0-I-  .byte $AB ; <indirect ref>
  0x0313F4 $93E4: ------  .byte $B8
  0x0313F5 $93E5: ------  .byte $AB
  0x0313F6 $93E6: -D0-I-  .byte $F0 ; <indirect ref>
  0x0313F7 $93E7: -D0-I-  .byte $AB ; <indirect ref>
  0x0313F8 $93E8: -D0-I-  .byte $0B ; <indirect ref>
  0x0313F9 $93E9: -D0-I-  .byte $AC ; <indirect ref>
  0x0313FA $93EA: -D0-I-  .byte $2D ; <indirect ref>
  0x0313FB $93EB: -D0-I-  .byte $AC ; <indirect ref>
  0x0313FC $93EC: -D0-I-  .byte $38 ; <indirect ref>
  0x0313FD $93ED: -D0-I-  .byte $AC ; <indirect ref>
  0x0313FE $93EE: -D0-I-  .byte $4A ; <indirect ref>
  0x0313FF $93EF: -D0-I-  .byte $AC ; <indirect ref>
  0x031400 $93F0: -D0-I-  .byte $5A ; <indirect ref>
  0x031401 $93F1: -D0-I-  .byte $AC ; <indirect ref>
  0x031402 $93F2: -D0-I-  .byte $6A ; <indirect ref>
  0x031403 $93F3: -D0-I-  .byte $AC ; <indirect ref>
  0x031404 $93F4: -D0-I-  .byte $7D ; <indirect ref>
  0x031405 $93F5: -D0-I-  .byte $AC ; <indirect ref>
  0x031406 $93F6: -D0-I-  .byte $A8 ; <indirect ref>
  0x031407 $93F7: -D0-I-  .byte $AC ; <indirect ref>
  0x031408 $93F8: -D0-I-  .byte $BB ; <indirect ref>
  0x031409 $93F9: -D0-I-  .byte $AC ; <indirect ref>
  0x03140A $93FA: -D0-I-  .byte $C5 ; <indirect ref>
  0x03140B $93FB: -D0-I-  .byte $AC ; <indirect ref>
  0x03140C $93FC: -D0-I-  .byte $E0 ; <indirect ref>
  0x03140D $93FD: -D0-I-  .byte $AC ; <indirect ref>
  0x03140E $93FE: -D0-I-  .byte $02 ; <indirect ref>
  0x03140F $93FF: -D0-I-  .byte $AD ; <indirect ref>
  0x031410 $9400: -D0-I-  .byte $F2 ; <indirect ref>
  0x031411 $9401: -D0-I-  .byte $F0 ; <indirect ref>
  0x031412 $9402: -D0-I-  .byte $01 ; <indirect ref>
  0x031413 $9403: -D0-I-  .byte $52 ; <indirect ref>
  0x031414 $9404: -D0-I-  .byte $ED ; <indirect ref>
  0x031415 $9405: -D0-I-  .byte $FC ; <indirect ref>
  0x031416 $9406: ------  .byte $01
  0x031417 $9407: -D0-I-  .byte $1C ; <indirect ref>
  0x031418 $9408: -D0-I-  .byte $2F ; <indirect ref>
  0x031419 $9409: -D0-I-  .byte $14 ; <indirect ref>
  0x03141A $940A: -D0-I-  .byte $AF ; <indirect ref>
  0x03141B $940B: -D0-I-  .byte $0B ; <indirect ref>
  0x03141C $940C: -D0-I-  .byte $2A ; <indirect ref>
  0x03141D $940D: -D0-I-  .byte $10 ; <indirect ref>
  0x03141E $940E: -D0-I-  .byte $79 ; <indirect ref>
  0x03141F $940F: -D0-I-  .byte $FC ; <indirect ref>
  0x031420 $9410: -D0-I-  .byte $F0 ; <indirect ref>
  0x031421 $9411: -D0-I-  .byte $01 ; <indirect ref>
  0x031422 $9412: -D0-I-  .byte $52 ; <indirect ref>
  0x031423 $9413: -D0-I-  .byte $EE ; <indirect ref>
  0x031424 $9414: -D0-I-  .byte $FC ; <indirect ref>
  0x031425 $9415: ------  .byte $01
  0x031426 $9416: -D0-I-  .byte $1C ; <indirect ref>
  0x031427 $9417: -D0-I-  .byte $2F ; <indirect ref>
  0x031428 $9418: -D0-I-  .byte $14 ; <indirect ref>
  0x031429 $9419: -D0-I-  .byte $AF ; <indirect ref>
  0x03142A $941A: -D0-I-  .byte $0B ; <indirect ref>
  0x03142B $941B: -D0-I-  .byte $2A ; <indirect ref>
  0x03142C $941C: -D0-I-  .byte $10 ; <indirect ref>
  0x03142D $941D: -D0-I-  .byte $79 ; <indirect ref>
  0x03142E $941E: -D0-I-  .byte $FC ; <indirect ref>
  0x03142F $941F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031430 $9420: -D0-I-  .byte $01 ; <indirect ref>
  0x031431 $9421: -D0-I-  .byte $71 ; <indirect ref>
  0x031432 $9422: -D0-I-  .byte $E4 ; <indirect ref>
  0x031433 $9423: -D0-I-  .byte $FC ; <indirect ref>
  0x031434 $9424: ------  .byte $01
  0x031435 $9425: -D0-I-  .byte $1C ; <indirect ref>
  0x031436 $9426: -D0-I-  .byte $2F ; <indirect ref>
  0x031437 $9427: -D0-I-  .byte $14 ; <indirect ref>
  0x031438 $9428: -D0-I-  .byte $AF ; <indirect ref>
  0x031439 $9429: -D0-I-  .byte $0B ; <indirect ref>
  0x03143A $942A: -D0-I-  .byte $2A ; <indirect ref>
  0x03143B $942B: -D0-I-  .byte $10 ; <indirect ref>
  0x03143C $942C: -D0-I-  .byte $79 ; <indirect ref>
  0x03143D $942D: -D0-I-  .byte $FC ; <indirect ref>
  0x03143E $942E: ------  .byte $01
  0x03143F $942F: -D0-I-  .byte $EE ; <indirect ref>
  0x031440 $9430: -D0-I-  .byte $FC ; <indirect ref>
  0x031441 $9431: ------  .byte $01
  0x031442 $9432: -D0-I-  .byte $F5 ; <indirect ref>
  0x031443 $9433: -D0-I-  .byte $2D ; <indirect ref>
  0x031444 $9434: -D0-I-  .byte $00 ; <indirect ref>
  0x031445 $9435: -D0-I-  .byte $14 ; <indirect ref>
  0x031446 $9436: -D0-I-  .byte $2F ; <indirect ref>
  0x031447 $9437: -D0-I-  .byte $10 ; <indirect ref>
  0x031448 $9438: -D0-I-  .byte $79 ; <indirect ref>
  0x031449 $9439: -D0-I-  .byte $FC ; <indirect ref>
  0x03144A $943A: -D0-I-  .byte $F0 ; <indirect ref>
  0x03144B $943B: -D0-I-  .byte $01 ; <indirect ref>
  0x03144C $943C: -D0-I-  .byte $52 ; <indirect ref>
  0x03144D $943D: -D0-I-  .byte $E4 ; <indirect ref>
  0x03144E $943E: -D0-I-  .byte $10 ; <indirect ref>
  0x03144F $943F: -D0-I-  .byte $11 ; <indirect ref>
  0x031450 $9440: -D0-I-  .byte $19 ; <indirect ref>
  0x031451 $9441: -D0-I-  .byte $FC ; <indirect ref>
  0x031452 $9442: ------  .byte $01
  0x031453 $9443: -D0-I-  .byte $E0 ; <indirect ref>
  0x031454 $9444: -D0-I-  .byte $79 ; <indirect ref>
  0x031455 $9445: -D0-I-  .byte $FC ; <indirect ref>
  0x031456 $9446: -D0-I-  .byte $F0 ; <indirect ref>
  0x031457 $9447: -D0-I-  .byte $01 ; <indirect ref>
  0x031458 $9448: -D0-I-  .byte $51 ; <indirect ref>
  0x031459 $9449: -D0-I-  .byte $EE ; <indirect ref>
  0x03145A $944A: -D0-I-  .byte $FC ; <indirect ref>
  0x03145B $944B: ------  .byte $01
  0x03145C $944C: -D0-I-  .byte $F5 ; <indirect ref>
  0x03145D $944D: -D0-I-  .byte $2D ; <indirect ref>
  0x03145E $944E: -D0-I-  .byte $00 ; <indirect ref>
  0x03145F $944F: -D0-I-  .byte $14 ; <indirect ref>
  0x031460 $9450: -D0-I-  .byte $2F ; <indirect ref>
  0x031461 $9451: -D0-I-  .byte $10 ; <indirect ref>
  0x031462 $9452: -D0-I-  .byte $79 ; <indirect ref>
  0x031463 $9453: -D0-I-  .byte $FC ; <indirect ref>
  0x031464 $9454: -D0-I-  .byte $F0 ; <indirect ref>
  0x031465 $9455: -D0-I-  .byte $01 ; <indirect ref>
  0x031466 $9456: -D0-I-  .byte $52 ; <indirect ref>
  0x031467 $9457: -D0-I-  .byte $ED ; <indirect ref>
  0x031468 $9458: -D0-I-  .byte $A0 ; <indirect ref>
  0x031469 $9459: -D0-I-  .byte $FC ; <indirect ref>
  0x03146A $945A: ------  .byte $01
  0x03146B $945B: -D0-I-  .byte $21 ; <indirect ref>
  0x03146C $945C: -D0-I-  .byte $06 ; <indirect ref>
  0x03146D $945D: -D0-I-  .byte $2F ; <indirect ref>
  0x03146E $945E: -D0-I-  .byte $13 ; <indirect ref>
  0x03146F $945F: -D0-I-  .byte $02 ; <indirect ref>
  0x031470 $9460: -D0-I-  .byte $2F ; <indirect ref>
  0x031471 $9461: -D0-I-  .byte $10 ; <indirect ref>
  0x031472 $9462: -D0-I-  .byte $79 ; <indirect ref>
  0x031473 $9463: -D0-I-  .byte $FC ; <indirect ref>
  0x031474 $9464: -D0-I-  .byte $F0 ; <indirect ref>
  0x031475 $9465: -D0-I-  .byte $01 ; <indirect ref>
  0x031476 $9466: -D0-I-  .byte $40 ; <indirect ref>
  0x031477 $9467: -D0-I-  .byte $AA ; <indirect ref>
  0x031478 $9468: -D0-I-  .byte $A0 ; <indirect ref>
  0x031479 $9469: -D0-I-  .byte $00 ; <indirect ref>
  0x03147A $946A: -D0-I-  .byte $14 ; <indirect ref>
  0x03147B $946B: -D0-I-  .byte $AE ; <indirect ref>
  0x03147C $946C: -D0-I-  .byte $06 ; <indirect ref>
  0x03147D $946D: -D0-I-  .byte $15 ; <indirect ref>
  0x03147E $946E: -D0-I-  .byte $02 ; <indirect ref>
  0x03147F $946F: -D0-I-  .byte $FC ; <indirect ref>
  0x031480 $9470: -D0-I-  .byte $F0 ; <indirect ref>
  0x031481 $9471: -D0-I-  .byte $01 ; <indirect ref>
  0x031482 $9472: -D0-I-  .byte $11 ; <indirect ref>
  0x031483 $9473: -D0-I-  .byte $EE ; <indirect ref>
  0x031484 $9474: -D0-I-  .byte $16 ; <indirect ref>
  0x031485 $9475: -D0-I-  .byte $00 ; <indirect ref>
  0x031486 $9476: -D0-I-  .byte $01 ; <indirect ref>
  0x031487 $9477: -D0-I-  .byte $10 ; <indirect ref>
  0x031488 $9478: -D0-I-  .byte $2F ; <indirect ref>
  0x031489 $9479: -D0-I-  .byte $13 ; <indirect ref>
  0x03148A $947A: -D0-I-  .byte $FC ; <indirect ref>
  0x03148B $947B: ------  .byte $08
  0x03148C $947C: -D0-I-  .byte $02 ; <indirect ref>
  0x03148D $947D: -D0-I-  .byte $07 ; <indirect ref>
  0x03148E $947E: -D0-I-  .byte $05 ; <indirect ref>
  0x03148F $947F: -D0-I-  .byte $02 ; <indirect ref>
  0x031490 $9480: -D0-I-  .byte $1A ; <indirect ref>
  0x031491 $9481: -D0-I-  .byte $00 ; <indirect ref>
  0x031492 $9482: -D0-I-  .byte $26 ; <indirect ref>
  0x031493 $9483: -D0-I-  .byte $2C ; <indirect ref>
  0x031494 $9484: -D0-I-  .byte $1F ; <indirect ref>
  0x031495 $9485: -D0-I-  .byte $2F ; <indirect ref>
  0x031496 $9486: -D0-I-  .byte $10 ; <indirect ref>
  0x031497 $9487: -D0-I-  .byte $79 ; <indirect ref>
  0x031498 $9488: -D0-I-  .byte $FC ; <indirect ref>
  0x031499 $9489: -D0-I-  .byte $F0 ; <indirect ref>
  0x03149A $948A: -D0-I-  .byte $01 ; <indirect ref>
  0x03149B $948B: -D0-I-  .byte $01 ; <indirect ref>
  0x03149C $948C: -D0-I-  .byte $EE ; <indirect ref>
  0x03149D $948D: -D0-I-  .byte $16 ; <indirect ref>
  0x03149E $948E: -D0-I-  .byte $00 ; <indirect ref>
  0x03149F $948F: -D0-I-  .byte $01 ; <indirect ref>
  0x0314A0 $9490: -D0-I-  .byte $10 ; <indirect ref>
  0x0314A1 $9491: -D0-I-  .byte $2F ; <indirect ref>
  0x0314A2 $9492: -D0-I-  .byte $13 ; <indirect ref>
  0x0314A3 $9493: -D0-I-  .byte $FC ; <indirect ref>
  0x0314A4 $9494: -D0-I-  .byte $F0 ; <indirect ref>
  0x0314A5 $9495: -D0-I-  .byte $01 ; <indirect ref>
  0x0314A6 $9496: -D0-I-  .byte $20 ; <indirect ref>
  0x0314A7 $9497: -D0-I-  .byte $E4 ; <indirect ref>
  0x0314A8 $9498: -D0-I-  .byte $FC ; <indirect ref>
  0x0314A9 $9499: ------  .byte $01
  0x0314AA $949A: -D0-I-  .byte $10 ; <indirect ref>
  0x0314AB $949B: -D0-I-  .byte $06 ; <indirect ref>
  0x0314AC $949C: -D0-I-  .byte $02 ; <indirect ref>
  0x0314AD $949D: -D0-I-  .byte $F5 ; <indirect ref>
  0x0314AE $949E: -D0-I-  .byte $16 ; <indirect ref>
  0x0314AF $949F: -D0-I-  .byte $FC ; <indirect ref>
  0x0314B0 $94A0: ------  .byte $01
  0x0314B1 $94A1: -D0-I-  .byte $03 ; <indirect ref>
  0x0314B2 $94A2: -D0-I-  .byte $A4 ; <indirect ref>
  0x0314B3 $94A3: -D0-I-  .byte $07 ; <indirect ref>
  0x0314B4 $94A4: -D0-I-  .byte $2D ; <indirect ref>
  0x0314B5 $94A5: -D0-I-  .byte $00 ; <indirect ref>
  0x0314B6 $94A6: -D0-I-  .byte $01 ; <indirect ref>
  0x0314B7 $94A7: -D0-I-  .byte $2C ; <indirect ref>
  0x0314B8 $94A8: -D0-I-  .byte $0E ; <indirect ref>
  0x0314B9 $94A9: -D0-I-  .byte $29 ; <indirect ref>
  0x0314BA $94AA: -D0-I-  .byte $79 ; <indirect ref>
  0x0314BB $94AB: -D0-I-  .byte $FC ; <indirect ref>
  0x0314BC $94AC: -D0-I-  .byte $F0 ; <indirect ref>
  0x0314BD $94AD: -D0-I-  .byte $01 ; <indirect ref>
  0x0314BE $94AE: -D0-I-  .byte $51 ; <indirect ref>
  0x0314BF $94AF: -D0-I-  .byte $ED ; <indirect ref>
  0x0314C0 $94B0: -D0-I-  .byte $FC ; <indirect ref>
  0x0314C1 $94B1: ------  .byte $08
  0x0314C2 $94B2: -D0-I-  .byte $F5 ; <indirect ref>
  0x0314C3 $94B3: -D0-I-  .byte $2D ; <indirect ref>
  0x0314C4 $94B4: -D0-I-  .byte $00 ; <indirect ref>
  0x0314C5 $94B5: -D0-I-  .byte $14 ; <indirect ref>
  0x0314C6 $94B6: -D0-I-  .byte $2F ; <indirect ref>
  0x0314C7 $94B7: -D0-I-  .byte $10 ; <indirect ref>
  0x0314C8 $94B8: -D0-I-  .byte $79 ; <indirect ref>
  0x0314C9 $94B9: -D0-I-  .byte $FC ; <indirect ref>
  0x0314CA $94BA: -D0-I-  .byte $F0 ; <indirect ref>
  0x0314CB $94BB: -D0-I-  .byte $01 ; <indirect ref>
  0x0314CC $94BC: -D0-I-  .byte $21 ; <indirect ref>
  0x0314CD $94BD: -D0-I-  .byte $ED ; <indirect ref>
  0x0314CE $94BE: -D0-I-  .byte $FC ; <indirect ref>
  0x0314CF $94BF: ------  .byte $01
  0x0314D0 $94C0: -D0-I-  .byte $EC ; <indirect ref>
  0x0314D1 $94C1: -D0-I-  .byte $FC ; <indirect ref>
  0x0314D2 $94C2: ------  .byte $08
  0x0314D3 $94C3: -D0-I-  .byte $AA ; <indirect ref>
  0x0314D4 $94C4: -D0-I-  .byte $A0 ; <indirect ref>
  0x0314D5 $94C5: -D0-I-  .byte $00 ; <indirect ref>
  0x0314D6 $94C6: -D0-I-  .byte $14 ; <indirect ref>
  0x0314D7 $94C7: -D0-I-  .byte $AE ; <indirect ref>
  0x0314D8 $94C8: -D0-I-  .byte $06 ; <indirect ref>
  0x0314D9 $94C9: -D0-I-  .byte $15 ; <indirect ref>
  0x0314DA $94CA: -D0-I-  .byte $02 ; <indirect ref>
  0x0314DB $94CB: -D0-I-  .byte $79 ; <indirect ref>
  0x0314DC $94CC: -D0-I-  .byte $FC ; <indirect ref>
  0x0314DD $94CD: -D0-I-  .byte $F0 ; <indirect ref>
  0x0314DE $94CE: -D0-I-  .byte $F5 ; <indirect ref>
  0x0314DF $94CF: -D0-I-  .byte $02 ; <indirect ref>
  0x0314E0 $94D0: -D0-I-  .byte $F0 ; <indirect ref>
  0x0314E1 $94D1: -D0-I-  .byte $01 ; <indirect ref>
  0x0314E2 $94D2: -D0-I-  .byte $11 ; <indirect ref>
  0x0314E3 $94D3: -D0-I-  .byte $ED ; <indirect ref>
  0x0314E4 $94D4: -D0-I-  .byte $FC ; <indirect ref>
  0x0314E5 $94D5: ------  .byte $01
  0x0314E6 $94D6: -D0-I-  .byte $EC ; <indirect ref>
  0x0314E7 $94D7: -D0-I-  .byte $FC ; <indirect ref>
  0x0314E8 $94D8: -D0-I-  .byte $F0 ; <indirect ref>
  0x0314E9 $94D9: -D0-I-  .byte $01 ; <indirect ref>
  0x0314EA $94DA: -D0-I-  .byte $52 ; <indirect ref>
  0x0314EB $94DB: -D0-I-  .byte $EE ; <indirect ref>
  0x0314EC $94DC: -D0-I-  .byte $FC ; <indirect ref>
  0x0314ED $94DD: ------  .byte $01
  0x0314EE $94DE: -D0-I-  .byte $46 ; <indirect ref>
  0x0314EF $94DF: -D0-I-  .byte $C3 ; <indirect ref>
  0x0314F0 $94E0: -D0-I-  .byte $7D ; <indirect ref>
  0x0314F1 $94E1: -D0-I-  .byte $79 ; <indirect ref>
  0x0314F2 $94E2: -D0-I-  .byte $FC ; <indirect ref>
  0x0314F3 $94E3: -D0-I-  .byte $F0 ; <indirect ref>
  0x0314F4 $94E4: -D0-I-  .byte $01 ; <indirect ref>
  0x0314F5 $94E5: -D0-I-  .byte $20 ; <indirect ref>
  0x0314F6 $94E6: -D0-I-  .byte $E4 ; <indirect ref>
  0x0314F7 $94E7: -D0-I-  .byte $FC ; <indirect ref>
  0x0314F8 $94E8: ------  .byte $01
  0x0314F9 $94E9: -D0-I-  .byte $1B ; <indirect ref>
  0x0314FA $94EA: -D0-I-  .byte $08 ; <indirect ref>
  0x0314FB $94EB: -D0-I-  .byte $02 ; <indirect ref>
  0x0314FC $94EC: -D0-I-  .byte $F5 ; <indirect ref>
  0x0314FD $94ED: -D0-I-  .byte $16 ; <indirect ref>
  0x0314FE $94EE: -D0-I-  .byte $FC ; <indirect ref>
  0x0314FF $94EF: ------  .byte $01
  0x031500 $94F0: -D0-I-  .byte $03 ; <indirect ref>
  0x031501 $94F1: -D0-I-  .byte $A4 ; <indirect ref>
  0x031502 $94F2: -D0-I-  .byte $07 ; <indirect ref>
  0x031503 $94F3: -D0-I-  .byte $2D ; <indirect ref>
  0x031504 $94F4: -D0-I-  .byte $00 ; <indirect ref>
  0x031505 $94F5: -D0-I-  .byte $01 ; <indirect ref>
  0x031506 $94F6: -D0-I-  .byte $2C ; <indirect ref>
  0x031507 $94F7: -D0-I-  .byte $0E ; <indirect ref>
  0x031508 $94F8: -D0-I-  .byte $29 ; <indirect ref>
  0x031509 $94F9: -D0-I-  .byte $79 ; <indirect ref>
  0x03150A $94FA: -D0-I-  .byte $FC ; <indirect ref>
  0x03150B $94FB: -D0-I-  .byte $F0 ; <indirect ref>
  0x03150C $94FC: -D0-I-  .byte $01 ; <indirect ref>
  0x03150D $94FD: -D0-I-  .byte $62 ; <indirect ref>
  0x03150E $94FE: -D0-I-  .byte $EE ; <indirect ref>
  0x03150F $94FF: -D0-I-  .byte $FC ; <indirect ref>
  0x031510 $9500: ------  .byte $01
  0x031511 $9501: -D0-I-  .byte $46 ; <indirect ref>
  0x031512 $9502: -D0-I-  .byte $C3 ; <indirect ref>
  0x031513 $9503: -D0-I-  .byte $7D ; <indirect ref>
  0x031514 $9504: -D0-I-  .byte $79 ; <indirect ref>
  0x031515 $9505: -D0-I-  .byte $FC ; <indirect ref>
  0x031516 $9506: ------  .byte $08
  0x031517 $9507: -D0-I-  .byte $AA ; <indirect ref>
  0x031518 $9508: -D0-I-  .byte $A0 ; <indirect ref>
  0x031519 $9509: -D0-I-  .byte $00 ; <indirect ref>
  0x03151A $950A: -D0-I-  .byte $14 ; <indirect ref>
  0x03151B $950B: -D0-I-  .byte $AE ; <indirect ref>
  0x03151C $950C: -D0-I-  .byte $06 ; <indirect ref>
  0x03151D $950D: -D0-I-  .byte $15 ; <indirect ref>
  0x03151E $950E: -D0-I-  .byte $02 ; <indirect ref>
  0x03151F $950F: -D0-I-  .byte $79 ; <indirect ref>
  0x031520 $9510: -D0-I-  .byte $FC ; <indirect ref>
  0x031521 $9511: -D0-I-  .byte $F0 ; <indirect ref>
  0x031522 $9512: -D0-I-  .byte $01 ; <indirect ref>
  0x031523 $9513: -D0-I-  .byte $5C ; <indirect ref>
  0x031524 $9514: -D0-I-  .byte $AD ; <indirect ref>
  0x031525 $9515: -D0-I-  .byte $10 ; <indirect ref>
  0x031526 $9516: -D0-I-  .byte $2F ; <indirect ref>
  0x031527 $9517: -D0-I-  .byte $79 ; <indirect ref>
  0x031528 $9518: -D0-I-  .byte $ED ; <indirect ref>
  0x031529 $9519: -D0-I-  .byte $19 ; <indirect ref>
  0x03152A $951A: -D0-I-  .byte $FC ; <indirect ref>
  0x03152B $951B: ------  .byte $01
  0x03152C $951C: -D0-I-  .byte $6B ; <indirect ref>
  0x03152D $951D: -D0-I-  .byte $7D ; <indirect ref>
  0x03152E $951E: -D0-I-  .byte $68 ; <indirect ref>
  0x03152F $951F: -D0-I-  .byte $6E ; <indirect ref>
  0x031530 $9520: -D0-I-  .byte $B6 ; <indirect ref>
  0x031531 $9521: -D0-I-  .byte $4E ; <indirect ref>
  0x031532 $9522: -D0-I-  .byte $7D ; <indirect ref>
  0x031533 $9523: -D0-I-  .byte $C5 ; <indirect ref>
  0x031534 $9524: -D0-I-  .byte $79 ; <indirect ref>
  0x031535 $9525: -D0-I-  .byte $FC ; <indirect ref>
  0x031536 $9526: -D0-I-  .byte $F0 ; <indirect ref>
  0x031537 $9527: -D0-I-  .byte $01 ; <indirect ref>
  0x031538 $9528: -D0-I-  .byte $C0 ; <indirect ref>
  0x031539 $9529: -D0-I-  .byte $26 ; <indirect ref>
  0x03153A $952A: -D0-I-  .byte $0C ; <indirect ref>
  0x03153B $952B: -D0-I-  .byte $79 ; <indirect ref>
  0x03153C $952C: -D0-I-  .byte $FC ; <indirect ref>
  0x03153D $952D: -D0-I-  .byte $F0 ; <indirect ref>
  0x03153E $952E: -D0-I-  .byte $04 ; <indirect ref>
  0x03153F $952F: -D0-I-  .byte $62 ; <indirect ref>
  0x031540 $9530: -D0-I-  .byte $0F ; <indirect ref>
  0x031541 $9531: -D0-I-  .byte $19 ; <indirect ref>
  0x031542 $9532: -D0-I-  .byte $00 ; <indirect ref>
  0x031543 $9533: -D0-I-  .byte $0A ; <indirect ref>
  0x031544 $9534: -D0-I-  .byte $B3 ; <indirect ref>
  0x031545 $9535: -D0-I-  .byte $2A ; <indirect ref>
  0x031546 $9536: -D0-I-  .byte $BE ; <indirect ref>
  0x031547 $9537: -D0-I-  .byte $5F ; <indirect ref>
  0x031548 $9538: -D0-I-  .byte $2D ; <indirect ref>
  0x031549 $9539: -D0-I-  .byte $FC ; <indirect ref>
  0x03154A $953A: ------  .byte $04
  0x03154B $953B: -D0-I-  .byte $E4 ; <indirect ref>
  0x03154C $953C: -D0-I-  .byte $A0 ; <indirect ref>
  0x03154D $953D: -D0-I-  .byte $FC ; <indirect ref>
  0x03154E $953E: ------  .byte $01
  0x03154F $953F: -D0-I-  .byte $5C ; <indirect ref>
  0x031550 $9540: -D0-I-  .byte $76 ; <indirect ref>
  0x031551 $9541: -D0-I-  .byte $6B ; <indirect ref>
  0x031552 $9542: -D0-I-  .byte $7D ; <indirect ref>
  0x031553 $9543: -D0-I-  .byte $0C ; <indirect ref>
  0x031554 $9544: -D0-I-  .byte $10 ; <indirect ref>
  0x031555 $9545: -D0-I-  .byte $79 ; <indirect ref>
  0x031556 $9546: -D0-I-  .byte $FC ; <indirect ref>
  0x031557 $9547: -D0-I-  .byte $F0 ; <indirect ref>
  0x031558 $9548: -D0-I-  .byte $01 ; <indirect ref>
  0x031559 $9549: -D0-I-  .byte $11 ; <indirect ref>
  0x03155A $954A: -D0-I-  .byte $ED ; <indirect ref>
  0x03155B $954B: -D0-I-  .byte $FC ; <indirect ref>
  0x03155C $954C: ------  .byte $01
  0x03155D $954D: -D0-I-  .byte $CD ; <indirect ref>
  0x03155E $954E: -D0-I-  .byte $6E ; <indirect ref>
  0x03155F $954F: -D0-I-  .byte $51 ; <indirect ref>
  0x031560 $9550: -D0-I-  .byte $6E ; <indirect ref>
  0x031561 $9551: -D0-I-  .byte $B6 ; <indirect ref>
  0x031562 $9552: -D0-I-  .byte $79 ; <indirect ref>
  0x031563 $9553: -D0-I-  .byte $FC ; <indirect ref>
  0x031564 $9554: -D0-I-  .byte $F0 ; <indirect ref>
  0x031565 $9555: -D0-I-  .byte $01 ; <indirect ref>
  0x031566 $9556: -D0-I-  .byte $51 ; <indirect ref>
  0x031567 $9557: -D0-I-  .byte $EE ; <indirect ref>
  0x031568 $9558: -D0-I-  .byte $FC ; <indirect ref>
  0x031569 $9559: ------  .byte $01
  0x03156A $955A: -D0-I-  .byte $F5 ; <indirect ref>
  0x03156B $955B: -D0-I-  .byte $2D ; <indirect ref>
  0x03156C $955C: -D0-I-  .byte $00 ; <indirect ref>
  0x03156D $955D: -D0-I-  .byte $46 ; <indirect ref>
  0x03156E $955E: -D0-I-  .byte $6F ; <indirect ref>
  0x03156F $955F: -D0-I-  .byte $54 ; <indirect ref>
  0x031570 $9560: -D0-I-  .byte $79 ; <indirect ref>
  0x031571 $9561: -D0-I-  .byte $FC ; <indirect ref>
  0x031572 $9562: -D0-I-  .byte $F0 ; <indirect ref>
  0x031573 $9563: -D0-I-  .byte $01 ; <indirect ref>
  0x031574 $9564: -D0-I-  .byte $22 ; <indirect ref>
  0x031575 $9565: -D0-I-  .byte $EE ; <indirect ref>
  0x031576 $9566: -D0-I-  .byte $FC ; <indirect ref>
  0x031577 $9567: ------  .byte $08
  0x031578 $9568: -D0-I-  .byte $F5 ; <indirect ref>
  0x031579 $9569: -D0-I-  .byte $2D ; <indirect ref>
  0x03157A $956A: -D0-I-  .byte $FC ; <indirect ref>
  0x03157B $956B: ------  .byte $01
  0x03157C $956C: -D0-I-  .byte $E3 ; <indirect ref>
  0x03157D $956D: -D0-I-  .byte $FC ; <indirect ref>
  0x03157E $956E: -D0-I-  .byte $F0 ; <indirect ref>
  0x03157F $956F: -D0-I-  .byte $01 ; <indirect ref>
  0x031580 $9570: -D0-I-  .byte $62 ; <indirect ref>
  0x031581 $9571: -D0-I-  .byte $D1 ; <indirect ref>
  0x031582 $9572: -D0-I-  .byte $4D ; <indirect ref>
  0x031583 $9573: -D0-I-  .byte $54 ; <indirect ref>
  0x031584 $9574: -D0-I-  .byte $16 ; <indirect ref>
  0x031585 $9575: -D0-I-  .byte $00 ; <indirect ref>
  0x031586 $9576: -D0-I-  .byte $01 ; <indirect ref>
  0x031587 $9577: -D0-I-  .byte $10 ; <indirect ref>
  0x031588 $9578: -D0-I-  .byte $2F ; <indirect ref>
  0x031589 $9579: -D0-I-  .byte $13 ; <indirect ref>
  0x03158A $957A: -D0-I-  .byte $FC ; <indirect ref>
  0x03158B $957B: ------  .byte $01
  0x03158C $957C: -D0-I-  .byte $F5 ; <indirect ref>
  0x03158D $957D: -D0-I-  .byte $1A ; <indirect ref>
  0x03158E $957E: -D0-I-  .byte $FC ; <indirect ref>
  0x03158F $957F: ------  .byte $01
  0x031590 $9580: -D0-I-  .byte $1A ; <indirect ref>
  0x031591 $9581: -D0-I-  .byte $18 ; <indirect ref>
  0x031592 $9582: -D0-I-  .byte $06 ; <indirect ref>
  0x031593 $9583: -D0-I-  .byte $04 ; <indirect ref>
  0x031594 $9584: -D0-I-  .byte $2F ; <indirect ref>
  0x031595 $9585: -D0-I-  .byte $10 ; <indirect ref>
  0x031596 $9586: -D0-I-  .byte $F7 ; <indirect ref>
  0x031597 $9587: -D0-I-  .byte $03 ; <indirect ref>
  0x031598 $9588: -D0-I-  .byte $79 ; <indirect ref>
  0x031599 $9589: -D0-I-  .byte $FC ; <indirect ref>
  0x03159A $958A: -D0-I-  .byte $F0 ; <indirect ref>
  0x03159B $958B: -D0-I-  .byte $01 ; <indirect ref>
  0x03159C $958C: -D0-I-  .byte $52 ; <indirect ref>
  0x03159D $958D: -D0-I-  .byte $EE ; <indirect ref>
  0x03159E $958E: -D0-I-  .byte $FC ; <indirect ref>
  0x03159F $958F: ------  .byte $01
  0x0315A0 $9590: -D0-I-  .byte $F5 ; <indirect ref>
  0x0315A1 $9591: -D0-I-  .byte $2D ; <indirect ref>
  0x0315A2 $9592: -D0-I-  .byte $00 ; <indirect ref>
  0x0315A3 $9593: -D0-I-  .byte $C5 ; <indirect ref>
  0x0315A4 $9594: -D0-I-  .byte $6B ; <indirect ref>
  0x0315A5 $9595: -D0-I-  .byte $6F ; <indirect ref>
  0x0315A6 $9596: -D0-I-  .byte $48 ; <indirect ref>
  0x0315A7 $9597: -D0-I-  .byte $79 ; <indirect ref>
  0x0315A8 $9598: -D0-I-  .byte $FC ; <indirect ref>
  0x0315A9 $9599: -D0-I-  .byte $F0 ; <indirect ref>
  0x0315AA $959A: -D0-I-  .byte $01 ; <indirect ref>
  0x0315AB $959B: -D0-I-  .byte $12 ; <indirect ref>
  0x0315AC $959C: -D0-I-  .byte $EE ; <indirect ref>
  0x0315AD $959D: -D0-I-  .byte $FC ; <indirect ref>
  0x0315AE $959E: ------  .byte $08
  0x0315AF $959F: -D0-I-  .byte $F5 ; <indirect ref>
  0x0315B0 $95A0: -D0-I-  .byte $2D ; <indirect ref>
  0x0315B1 $95A1: -D0-I-  .byte $00 ; <indirect ref>
  0x0315B2 $95A2: -D0-I-  .byte $1A ; <indirect ref>
  0x0315B3 $95A3: -D0-I-  .byte $A6 ; <indirect ref>
  0x0315B4 $95A4: -D0-I-  .byte $02 ; <indirect ref>
  0x0315B5 $95A5: -D0-I-  .byte $10 ; <indirect ref>
  0x0315B6 $95A6: -D0-I-  .byte $79 ; <indirect ref>
  0x0315B7 $95A7: -D0-I-  .byte $FC ; <indirect ref>
  0x0315B8 $95A8: -D0-I-  .byte $F0 ; <indirect ref>
  0x0315B9 $95A9: -D0-I-  .byte $01 ; <indirect ref>
  0x0315BA $95AA: -D0-I-  .byte $12 ; <indirect ref>
  0x0315BB $95AB: -D0-I-  .byte $EE ; <indirect ref>
  0x0315BC $95AC: -D0-I-  .byte $FC ; <indirect ref>
  0x0315BD $95AD: ------  .byte $01
  0x0315BE $95AE: -D0-I-  .byte $F5 ; <indirect ref>
  0x0315BF $95AF: -D0-I-  .byte $16 ; <indirect ref>
  0x0315C0 $95B0: -D0-I-  .byte $00 ; <indirect ref>
  0x0315C1 $95B1: -D0-I-  .byte $21 ; <indirect ref>
  0x0315C2 $95B2: -D0-I-  .byte $06 ; <indirect ref>
  0x0315C3 $95B3: -D0-I-  .byte $03 ; <indirect ref>
  0x0315C4 $95B4: -D0-I-  .byte $79 ; <indirect ref>
  0x0315C5 $95B5: -D0-I-  .byte $FC ; <indirect ref>
  0x0315C6 $95B6: -D0-I-  .byte $F0 ; <indirect ref>
  0x0315C7 $95B7: -D0-I-  .byte $F2 ; <indirect ref>
  0x0315C8 $95B8: -D0-I-  .byte $01 ; <indirect ref>
  0x0315C9 $95B9: -D0-I-  .byte $5C ; <indirect ref>
  0x0315CA $95BA: -D0-I-  .byte $AD ; <indirect ref>
  0x0315CB $95BB: -D0-I-  .byte $10 ; <indirect ref>
  0x0315CC $95BC: -D0-I-  .byte $2F ; <indirect ref>
  0x0315CD $95BD: -D0-I-  .byte $79 ; <indirect ref>
  0x0315CE $95BE: -D0-I-  .byte $ED ; <indirect ref>
  0x0315CF $95BF: -D0-I-  .byte $19 ; <indirect ref>
  0x0315D0 $95C0: -D0-I-  .byte $FC ; <indirect ref>
  0x0315D1 $95C1: ------  .byte $01
  0x0315D2 $95C2: -D0-I-  .byte $1B ; <indirect ref>
  0x0315D3 $95C3: -D0-I-  .byte $A1 ; <indirect ref>
  0x0315D4 $95C4: -D0-I-  .byte $00 ; <indirect ref>
  0x0315D5 $95C5: -D0-I-  .byte $0B ; <indirect ref>
  0x0315D6 $95C6: -D0-I-  .byte $2E ; <indirect ref>
  0x0315D7 $95C7: -D0-I-  .byte $06 ; <indirect ref>
  0x0315D8 $95C8: -D0-I-  .byte $08 ; <indirect ref>
  0x0315D9 $95C9: -D0-I-  .byte $14 ; <indirect ref>
  0x0315DA $95CA: -D0-I-  .byte $B0 ; <indirect ref>
  0x0315DB $95CB: -D0-I-  .byte $79 ; <indirect ref>
  0x0315DC $95CC: -D0-I-  .byte $FC ; <indirect ref>
  0x0315DD $95CD: -D0-I-  .byte $F0 ; <indirect ref>
  0x0315DE $95CE: -D0-I-  .byte $01 ; <indirect ref>
  0x0315DF $95CF: -D0-I-  .byte $61 ; <indirect ref>
  0x0315E0 $95D0: -D0-I-  .byte $AA ; <indirect ref>
  0x0315E1 $95D1: -D0-I-  .byte $A0 ; <indirect ref>
  0x0315E2 $95D2: -D0-I-  .byte $FC ; <indirect ref>
  0x0315E3 $95D3: ------  .byte $01
  0x0315E4 $95D4: -D0-I-  .byte $E4 ; <indirect ref>
  0x0315E5 $95D5: -D0-I-  .byte $19 ; <indirect ref>
  0x0315E6 $95D6: -D0-I-  .byte $FC ; <indirect ref>
  0x0315E7 $95D7: ------  .byte $01
  0x0315E8 $95D8: -D0-I-  .byte $02 ; <indirect ref>
  0x0315E9 $95D9: -D0-I-  .byte $07 ; <indirect ref>
  0x0315EA $95DA: -D0-I-  .byte $05 ; <indirect ref>
  0x0315EB $95DB: -D0-I-  .byte $02 ; <indirect ref>
  0x0315EC $95DC: -D0-I-  .byte $23 ; <indirect ref>
  0x0315ED $95DD: -D0-I-  .byte $00 ; <indirect ref>
  0x0315EE $95DE: -D0-I-  .byte $26 ; <indirect ref>
  0x0315EF $95DF: -D0-I-  .byte $2C ; <indirect ref>
  0x0315F0 $95E0: -D0-I-  .byte $1F ; <indirect ref>
  0x0315F1 $95E1: -D0-I-  .byte $2F ; <indirect ref>
  0x0315F2 $95E2: -D0-I-  .byte $10 ; <indirect ref>
  0x0315F3 $95E3: -D0-I-  .byte $79 ; <indirect ref>
  0x0315F4 $95E4: -D0-I-  .byte $FC ; <indirect ref>
  0x0315F5 $95E5: -D0-I-  .byte $F0 ; <indirect ref>
  0x0315F6 $95E6: -D0-I-  .byte $F2 ; <indirect ref>
  0x0315F7 $95E7: -D0-I-  .byte $01 ; <indirect ref>
  0x0315F8 $95E8: -D0-I-  .byte $6C ; <indirect ref>
  0x0315F9 $95E9: -D0-I-  .byte $AD ; <indirect ref>
  0x0315FA $95EA: -D0-I-  .byte $10 ; <indirect ref>
  0x0315FB $95EB: -D0-I-  .byte $2F ; <indirect ref>
  0x0315FC $95EC: -D0-I-  .byte $79 ; <indirect ref>
  0x0315FD $95ED: -D0-I-  .byte $ED ; <indirect ref>
  0x0315FE $95EE: -D0-I-  .byte $19 ; <indirect ref>
  0x0315FF $95EF: -D0-I-  .byte $FC ; <indirect ref>
  0x031600 $95F0: ------  .byte $01
  0x031601 $95F1: -D0-I-  .byte $1B ; <indirect ref>
  0x031602 $95F2: -D0-I-  .byte $A1 ; <indirect ref>
  0x031603 $95F3: -D0-I-  .byte $00 ; <indirect ref>
  0x031604 $95F4: -D0-I-  .byte $0B ; <indirect ref>
  0x031605 $95F5: -D0-I-  .byte $2E ; <indirect ref>
  0x031606 $95F6: -D0-I-  .byte $06 ; <indirect ref>
  0x031607 $95F7: -D0-I-  .byte $08 ; <indirect ref>
  0x031608 $95F8: -D0-I-  .byte $14 ; <indirect ref>
  0x031609 $95F9: -D0-I-  .byte $B0 ; <indirect ref>
  0x03160A $95FA: -D0-I-  .byte $79 ; <indirect ref>
  0x03160B $95FB: -D0-I-  .byte $FC ; <indirect ref>
  0x03160C $95FC: ------  .byte $08
  0x03160D $95FD: -D0-I-  .byte $AA ; <indirect ref>
  0x03160E $95FE: -D0-I-  .byte $A0 ; <indirect ref>
  0x03160F $95FF: -D0-I-  .byte $00 ; <indirect ref>
  0x031610 $9600: -D0-I-  .byte $14 ; <indirect ref>
  0x031611 $9601: -D0-I-  .byte $AE ; <indirect ref>
  0x031612 $9602: -D0-I-  .byte $06 ; <indirect ref>
  0x031613 $9603: -D0-I-  .byte $15 ; <indirect ref>
  0x031614 $9604: -D0-I-  .byte $02 ; <indirect ref>
  0x031615 $9605: -D0-I-  .byte $79 ; <indirect ref>
  0x031616 $9606: -D0-I-  .byte $FC ; <indirect ref>
  0x031617 $9607: -D0-I-  .byte $F0 ; <indirect ref>
  0x031618 $9608: -D0-I-  .byte $01 ; <indirect ref>
  0x031619 $9609: -D0-I-  .byte $5C ; <indirect ref>
  0x03161A $960A: -D0-I-  .byte $AD ; <indirect ref>
  0x03161B $960B: -D0-I-  .byte $10 ; <indirect ref>
  0x03161C $960C: -D0-I-  .byte $2F ; <indirect ref>
  0x03161D $960D: -D0-I-  .byte $79 ; <indirect ref>
  0x03161E $960E: -D0-I-  .byte $ED ; <indirect ref>
  0x03161F $960F: -D0-I-  .byte $19 ; <indirect ref>
  0x031620 $9610: -D0-I-  .byte $FC ; <indirect ref>
  0x031621 $9611: ------  .byte $01
  0x031622 $9612: -D0-I-  .byte $BE ; <indirect ref>
  0x031623 $9613: -D0-I-  .byte $7D ; <indirect ref>
  0x031624 $9614: -D0-I-  .byte $48 ; <indirect ref>
  0x031625 $9615: -D0-I-  .byte $00 ; <indirect ref>
  0x031626 $9616: -D0-I-  .byte $42 ; <indirect ref>
  0x031627 $9617: -D0-I-  .byte $68 ; <indirect ref>
  0x031628 $9618: -D0-I-  .byte $71 ; <indirect ref>
  0x031629 $9619: -D0-I-  .byte $7D ; <indirect ref>
  0x03162A $961A: -D0-I-  .byte $BA ; <indirect ref>
  0x03162B $961B: -D0-I-  .byte $72 ; <indirect ref>
  0x03162C $961C: -D0-I-  .byte $6E ; <indirect ref>
  0x03162D $961D: -D0-I-  .byte $79 ; <indirect ref>
  0x03162E $961E: -D0-I-  .byte $79 ; <indirect ref>
  0x03162F $961F: -D0-I-  .byte $FC ; <indirect ref>
  0x031630 $9620: -D0-I-  .byte $F0 ; <indirect ref>
  0x031631 $9621: -D0-I-  .byte $08 ; <indirect ref>
  0x031632 $9622: -D0-I-  .byte $42 ; <indirect ref>
  0x031633 $9623: -D0-I-  .byte $00 ; <indirect ref>
  0x031634 $9624: -D0-I-  .byte $00 ; <indirect ref>
  0x031635 $9625: -D0-I-  .byte $00 ; <indirect ref>
  0x031636 $9626: -D0-I-  .byte $79 ; <indirect ref>
  0x031637 $9627: -D0-I-  .byte $79 ; <indirect ref>
  0x031638 $9628: -D0-I-  .byte $FC ; <indirect ref>
  0x031639 $9629: -D0-I-  .byte $F0 ; <indirect ref>
  0x03163A $962A: -D0-I-  .byte $01 ; <indirect ref>
  0x03163B $962B: -D0-I-  .byte $5C ; <indirect ref>
  0x03163C $962C: -D0-I-  .byte $AD ; <indirect ref>
  0x03163D $962D: -D0-I-  .byte $10 ; <indirect ref>
  0x03163E $962E: -D0-I-  .byte $2F ; <indirect ref>
  0x03163F $962F: -D0-I-  .byte $79 ; <indirect ref>
  0x031640 $9630: -D0-I-  .byte $ED ; <indirect ref>
  0x031641 $9631: -D0-I-  .byte $19 ; <indirect ref>
  0x031642 $9632: -D0-I-  .byte $FC ; <indirect ref>
  0x031643 $9633: ------  .byte $01
  0x031644 $9634: -D0-I-  .byte $B1 ; <indirect ref>
  0x031645 $9635: -D0-I-  .byte $2E ; <indirect ref>
  0x031646 $9636: -D0-I-  .byte $0C ; <indirect ref>
  0x031647 $9637: -D0-I-  .byte $2E ; <indirect ref>
  0x031648 $9638: -D0-I-  .byte $4E ; <indirect ref>
  0x031649 $9639: -D0-I-  .byte $7D ; <indirect ref>
  0x03164A $963A: -D0-I-  .byte $C4 ; <indirect ref>
  0x03164B $963B: -D0-I-  .byte $6E ; <indirect ref>
  0x03164C $963C: -D0-I-  .byte $B6 ; <indirect ref>
  0x03164D $963D: -D0-I-  .byte $79 ; <indirect ref>
  0x03164E $963E: -D0-I-  .byte $FC ; <indirect ref>
  0x03164F $963F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031650 $9640: -D0-I-  .byte $F2 ; <indirect ref>
  0x031651 $9641: -D0-I-  .byte $F4 ; <indirect ref>
  0x031652 $9642: -D0-I-  .byte $07 ; <indirect ref>
  0x031653 $9643: ------  .byte $62
  0x031654 $9644: ------  .byte $96
  0x031655 $9645: -D0-I-  .byte $49 ; <indirect ref>
  0x031656 $9646: -D0-I-  .byte $96 ; <indirect ref>
  0x031657 $9647: -D0-I-  .byte $63 ; <indirect ref>
  0x031658 $9648: -D0-I-  .byte $96 ; <indirect ref>
  0x031659 $9649: -D0-I-  .byte $01 ; <indirect ref>
  0x03165A $964A: -D0-I-  .byte $E2 ; <indirect ref>
  0x03165B $964B: -D0-I-  .byte $4D ; <indirect ref>
  0x03165C $964C: -D0-I-  .byte $69 ; <indirect ref>
  0x03165D $964D: -D0-I-  .byte $7D ; <indirect ref>
  0x03165E $964E: -D0-I-  .byte $AD ; <indirect ref>
  0x03165F $964F: -D0-I-  .byte $FC ; <indirect ref>
  0x031660 $9650: ------  .byte $01
  0x031661 $9651: -D0-I-  .byte $ED ; <indirect ref>
  0x031662 $9652: -D0-I-  .byte $FC ; <indirect ref>
  0x031663 $9653: ------  .byte $01
  0x031664 $9654: -D0-I-  .byte $C3 ; <indirect ref>
  0x031665 $9655: -D0-I-  .byte $67 ; <indirect ref>
  0x031666 $9656: -D0-I-  .byte $6E ; <indirect ref>
  0x031667 $9657: -D0-I-  .byte $4D ; <indirect ref>
  0x031668 $9658: -D0-I-  .byte $2D ; <indirect ref>
  0x031669 $9659: -D0-I-  .byte $00 ; <indirect ref>
  0x03166A $965A: -D0-I-  .byte $08 ; <indirect ref>
  0x03166B $965B: -D0-I-  .byte $A7 ; <indirect ref>
  0x03166C $965C: -D0-I-  .byte $0C ; <indirect ref>
  0x03166D $965D: -D0-I-  .byte $13 ; <indirect ref>
  0x03166E $965E: -D0-I-  .byte $02 ; <indirect ref>
  0x03166F $965F: -D0-I-  .byte $29 ; <indirect ref>
  0x031670 $9660: -D0-I-  .byte $79 ; <indirect ref>
  0x031671 $9661: -D0-I-  .byte $FC ; <indirect ref>
  0x031672 $9662: -D0-I-  .byte $F0 ; <indirect ref>
  0x031673 $9663: -D0-I-  .byte $01 ; <indirect ref>
  0x031674 $9664: -D0-I-  .byte $E2 ; <indirect ref>
  0x031675 $9665: -D0-I-  .byte $4D ; <indirect ref>
  0x031676 $9666: -D0-I-  .byte $69 ; <indirect ref>
  0x031677 $9667: -D0-I-  .byte $7D ; <indirect ref>
  0x031678 $9668: -D0-I-  .byte $AD ; <indirect ref>
  0x031679 $9669: -D0-I-  .byte $FC ; <indirect ref>
  0x03167A $966A: ------  .byte $01
  0x03167B $966B: -D0-I-  .byte $ED ; <indirect ref>
  0x03167C $966C: -D0-I-  .byte $FC ; <indirect ref>
  0x03167D $966D: ------  .byte $01
  0x03167E $966E: -D0-I-  .byte $10 ; <indirect ref>
  0x03167F $966F: -D0-I-  .byte $05 ; <indirect ref>
  0x031680 $9670: -D0-I-  .byte $2A ; <indirect ref>
  0x031681 $9671: -D0-I-  .byte $13 ; <indirect ref>
  0x031682 $9672: -D0-I-  .byte $02 ; <indirect ref>
  0x031683 $9673: -D0-I-  .byte $29 ; <indirect ref>
  0x031684 $9674: -D0-I-  .byte $79 ; <indirect ref>
  0x031685 $9675: -D0-I-  .byte $FC ; <indirect ref>
  0x031686 $9676: -D0-I-  .byte $F0 ; <indirect ref>
  0x031687 $9677: -D0-I-  .byte $01 ; <indirect ref>
  0x031688 $9678: -D0-I-  .byte $52 ; <indirect ref>
  0x031689 $9679: -D0-I-  .byte $E4 ; <indirect ref>
  0x03168A $967A: -D0-I-  .byte $FC ; <indirect ref>
  0x03168B $967B: ------  .byte $01
  0x03168C $967C: -D0-I-  .byte $1C ; <indirect ref>
  0x03168D $967D: -D0-I-  .byte $2F ; <indirect ref>
  0x03168E $967E: -D0-I-  .byte $14 ; <indirect ref>
  0x03168F $967F: -D0-I-  .byte $AF ; <indirect ref>
  0x031690 $9680: -D0-I-  .byte $0B ; <indirect ref>
  0x031691 $9681: -D0-I-  .byte $2A ; <indirect ref>
  0x031692 $9682: -D0-I-  .byte $10 ; <indirect ref>
  0x031693 $9683: -D0-I-  .byte $79 ; <indirect ref>
  0x031694 $9684: -D0-I-  .byte $FC ; <indirect ref>
  0x031695 $9685: -D0-I-  .byte $F0 ; <indirect ref>
  0x031696 $9686: -D0-I-  .byte $01 ; <indirect ref>
  0x031697 $9687: -D0-I-  .byte $22 ; <indirect ref>
  0x031698 $9688: -D0-I-  .byte $E4 ; <indirect ref>
  0x031699 $9689: -D0-I-  .byte $FC ; <indirect ref>
  0x03169A $968A: ------  .byte $08
  0x03169B $968B: -D0-I-  .byte $F5 ; <indirect ref>
  0x03169C $968C: -D0-I-  .byte $2D ; <indirect ref>
  0x03169D $968D: -D0-I-  .byte $FC ; <indirect ref>
  0x03169E $968E: ------  .byte $01
  0x03169F $968F: -D0-I-  .byte $E2 ; <indirect ref>
  0x0316A0 $9690: -D0-I-  .byte $FC ; <indirect ref>
  0x0316A1 $9691: -D0-I-  .byte $F0 ; <indirect ref>
  0x0316A2 $9692: -D0-I-  .byte $01 ; <indirect ref>
  0x0316A3 $9693: -D0-I-  .byte $D0 ; <indirect ref>
  0x0316A4 $9694: -D0-I-  .byte $00 ; <indirect ref>
  0x0316A5 $9695: -D0-I-  .byte $00 ; <indirect ref>
  0x0316A6 $9696: -D0-I-  .byte $08 ; <indirect ref>
  0x0316A7 $9697: -D0-I-  .byte $2F ; <indirect ref>
  0x0316A8 $9698: -D0-I-  .byte $79 ; <indirect ref>
  0x0316A9 $9699: -D0-I-  .byte $FC ; <indirect ref>
  0x0316AA $969A: ------  .byte $01
  0x0316AB $969B: -D0-I-  .byte $B4 ; <indirect ref>
  0x0316AC $969C: -D0-I-  .byte $6F ; <indirect ref>
  0x0316AD $969D: -D0-I-  .byte $52 ; <indirect ref>
  0x0316AE $969E: -D0-I-  .byte $A0 ; <indirect ref>
  0x0316AF $969F: -D0-I-  .byte $00 ; <indirect ref>
  0x0316B0 $96A0: -D0-I-  .byte $10 ; <indirect ref>
  0x0316B1 $96A1: -D0-I-  .byte $28 ; <indirect ref>
  0x0316B2 $96A2: -D0-I-  .byte $15 ; <indirect ref>
  0x0316B3 $96A3: -D0-I-  .byte $02 ; <indirect ref>
  0x0316B4 $96A4: -D0-I-  .byte $79 ; <indirect ref>
  0x0316B5 $96A5: -D0-I-  .byte $FC ; <indirect ref>
  0x0316B6 $96A6: -D0-I-  .byte $F0 ; <indirect ref>
  0x0316B7 $96A7: -D0-I-  .byte $01 ; <indirect ref>
  0x0316B8 $96A8: -D0-I-  .byte $61 ; <indirect ref>
  0x0316B9 $96A9: -D0-I-  .byte $AA ; <indirect ref>
  0x0316BA $96AA: -D0-I-  .byte $A0 ; <indirect ref>
  0x0316BB $96AB: -D0-I-  .byte $FC ; <indirect ref>
  0x0316BC $96AC: ------  .byte $01
  0x0316BD $96AD: -D0-I-  .byte $E0 ; <indirect ref>
  0x0316BE $96AE: -D0-I-  .byte $19 ; <indirect ref>
  0x0316BF $96AF: -D0-I-  .byte $FC ; <indirect ref>
  0x0316C0 $96B0: ------  .byte $01
  0x0316C1 $96B1: -D0-I-  .byte $02 ; <indirect ref>
  0x0316C2 $96B2: -D0-I-  .byte $07 ; <indirect ref>
  0x0316C3 $96B3: -D0-I-  .byte $05 ; <indirect ref>
  0x0316C4 $96B4: -D0-I-  .byte $02 ; <indirect ref>
  0x0316C5 $96B5: -D0-I-  .byte $23 ; <indirect ref>
  0x0316C6 $96B6: -D0-I-  .byte $00 ; <indirect ref>
  0x0316C7 $96B7: -D0-I-  .byte $26 ; <indirect ref>
  0x0316C8 $96B8: -D0-I-  .byte $2C ; <indirect ref>
  0x0316C9 $96B9: -D0-I-  .byte $1F ; <indirect ref>
  0x0316CA $96BA: -D0-I-  .byte $2F ; <indirect ref>
  0x0316CB $96BB: -D0-I-  .byte $10 ; <indirect ref>
  0x0316CC $96BC: -D0-I-  .byte $79 ; <indirect ref>
  0x0316CD $96BD: -D0-I-  .byte $FC ; <indirect ref>
  0x0316CE $96BE: -D0-I-  .byte $F0 ; <indirect ref>
  0x0316CF $96BF: -D0-I-  .byte $0A ; <indirect ref>
  0x0316D0 $96C0: -D0-I-  .byte $51 ; <indirect ref>
  0x0316D1 $96C1: -D0-I-  .byte $F6 ; <indirect ref>
  0x0316D2 $96C2: -D0-I-  .byte $D1 ; <indirect ref>
  0x0316D3 $96C3: -D0-I-  .byte $4D ; <indirect ref>
  0x0316D4 $96C4: -D0-I-  .byte $54 ; <indirect ref>
  0x0316D5 $96C5: -D0-I-  .byte $16 ; <indirect ref>
  0x0316D6 $96C6: -D0-I-  .byte $00 ; <indirect ref>
  0x0316D7 $96C7: -D0-I-  .byte $01 ; <indirect ref>
  0x0316D8 $96C8: -D0-I-  .byte $10 ; <indirect ref>
  0x0316D9 $96C9: -D0-I-  .byte $2F ; <indirect ref>
  0x0316DA $96CA: -D0-I-  .byte $13 ; <indirect ref>
  0x0316DB $96CB: -D0-I-  .byte $FC ; <indirect ref>
  0x0316DC $96CC: ------  .byte $01
  0x0316DD $96CD: -D0-I-  .byte $0A ; <indirect ref>
  0x0316DE $96CE: -D0-I-  .byte $B3 ; <indirect ref>
  0x0316DF $96CF: -D0-I-  .byte $2A ; <indirect ref>
  0x0316E0 $96D0: -D0-I-  .byte $BE ; <indirect ref>
  0x0316E1 $96D1: -D0-I-  .byte $5F ; <indirect ref>
  0x0316E2 $96D2: -D0-I-  .byte $16 ; <indirect ref>
  0x0316E3 $96D3: -D0-I-  .byte $00 ; <indirect ref>
  0x0316E4 $96D4: -D0-I-  .byte $15 ; <indirect ref>
  0x0316E5 $96D5: -D0-I-  .byte $2F ; <indirect ref>
  0x0316E6 $96D6: -D0-I-  .byte $10 ; <indirect ref>
  0x0316E7 $96D7: -D0-I-  .byte $79 ; <indirect ref>
  0x0316E8 $96D8: -D0-I-  .byte $FC ; <indirect ref>
  0x0316E9 $96D9: -D0-I-  .byte $F0 ; <indirect ref>
  0x0316EA $96DA: -D0-I-  .byte $01 ; <indirect ref>
  0x0316EB $96DB: -D0-I-  .byte $4C ; <indirect ref>
  0x0316EC $96DC: -D0-I-  .byte $07 ; <indirect ref>
  0x0316ED $96DD: -D0-I-  .byte $1F ; <indirect ref>
  0x0316EE $96DE: -D0-I-  .byte $2F ; <indirect ref>
  0x0316EF $96DF: -D0-I-  .byte $10 ; <indirect ref>
  0x0316F0 $96E0: -D0-I-  .byte $79 ; <indirect ref>
  0x0316F1 $96E1: -D0-I-  .byte $00 ; <indirect ref>
  0x0316F2 $96E2: -D0-I-  .byte $B8 ; <indirect ref>
  0x0316F3 $96E3: -D0-I-  .byte $F7 ; <indirect ref>
  0x0316F4 $96E4: -D0-I-  .byte $03 ; <indirect ref>
  0x0316F5 $96E5: -D0-I-  .byte $69 ; <indirect ref>
  0x0316F6 $96E6: -D0-I-  .byte $79 ; <indirect ref>
  0x0316F7 $96E7: -D0-I-  .byte $79 ; <indirect ref>
  0x0316F8 $96E8: -D0-I-  .byte $FC ; <indirect ref>
  0x0316F9 $96E9: -D0-I-  .byte $F0 ; <indirect ref>
  0x0316FA $96EA: -D0-I-  .byte $01 ; <indirect ref>
  0x0316FB $96EB: -D0-I-  .byte $42 ; <indirect ref>
  0x0316FC $96EC: -D0-I-  .byte $05 ; <indirect ref>
  0x0316FD $96ED: -D0-I-  .byte $05 ; <indirect ref>
  0x0316FE $96EE: -D0-I-  .byte $F7 ; <indirect ref>
  0x0316FF $96EF: -D0-I-  .byte $04 ; <indirect ref>
  0x031700 $96F0: -D0-I-  .byte $2F ; <indirect ref>
  0x031701 $96F1: -D0-I-  .byte $14 ; <indirect ref>
  0x031702 $96F2: -D0-I-  .byte $79 ; <indirect ref>
  0x031703 $96F3: -D0-I-  .byte $79 ; <indirect ref>
  0x031704 $96F4: -D0-I-  .byte $FC ; <indirect ref>
  0x031705 $96F5: -D0-I-  .byte $F0 ; <indirect ref>
  0x031706 $96F6: ------  .byte $01
  0x031707 $96F7: ------  .byte $42
  0x031708 $96F8: ------  .byte $03
  0x031709 $96F9: ------  .byte $2C
  0x03170A $96FA: ------  .byte $F7
  0x03170B $96FB: ------  .byte $04
  0x03170C $96FC: ------  .byte $6F
  0x03170D $96FD: ------  .byte $79
  0x03170E $96FE: ------  .byte $79
  0x03170F $96FF: ------  .byte $FC
  0x031710 $9700: ------  .byte $F0
  0x031711 $9701: ------  .byte $01
  0x031712 $9702: ------  .byte $42
  0x031713 $9703: ------  .byte $03
  0x031714 $9704: ------  .byte $05
  0x031715 $9705: ------  .byte $05
  0x031716 $9706: ------  .byte $F7
  0x031717 $9707: ------  .byte $04
  0x031718 $9708: ------  .byte $6F
  0x031719 $9709: ------  .byte $79
  0x03171A $970A: ------  .byte $79
  0x03171B $970B: ------  .byte $FC
  0x03171C $970C: ------  .byte $F0
  0x03171D $970D: -D0-I-  .byte $01 ; <indirect ref>
  0x03171E $970E: -D0-I-  .byte $42 ; <indirect ref>
  0x03171F $970F: -D0-I-  .byte $05 ; <indirect ref>
  0x031720 $9710: -D0-I-  .byte $05 ; <indirect ref>
  0x031721 $9711: -D0-I-  .byte $F7 ; <indirect ref>
  0x031722 $9712: -D0-I-  .byte $04 ; <indirect ref>
  0x031723 $9713: -D0-I-  .byte $6F ; <indirect ref>
  0x031724 $9714: -D0-I-  .byte $79 ; <indirect ref>
  0x031725 $9715: -D0-I-  .byte $79 ; <indirect ref>
  0x031726 $9716: -D0-I-  .byte $FC ; <indirect ref>
  0x031727 $9717: -D0-I-  .byte $F0 ; <indirect ref>
  0x031728 $9718: ------  .byte $01
  0x031729 $9719: ------  .byte $11
  0x03172A $971A: ------  .byte $ED
  0x03172B $971B: ------  .byte $16
  0x03172C $971C: ------  .byte $00
  0x03172D $971D: ------  .byte $01
  0x03172E $971E: ------  .byte $10
  0x03172F $971F: ------  .byte $2F
  0x031730 $9720: ------  .byte $13
  0x031731 $9721: ------  .byte $FC
  0x031732 $9722: ------  .byte $04
  0x031733 $9723: ------  .byte $02
  0x031734 $9724: ------  .byte $07
  0x031735 $9725: ------  .byte $05
  0x031736 $9726: ------  .byte $02
  0x031737 $9727: ------  .byte $1A
  0x031738 $9728: ------  .byte $00
  0x031739 $9729: ------  .byte $26
  0x03173A $972A: ------  .byte $2C
  0x03173B $972B: ------  .byte $1F
  0x03173C $972C: ------  .byte $2F
  0x03173D $972D: ------  .byte $10
  0x03173E $972E: ------  .byte $79
  0x03173F $972F: ------  .byte $FC
  0x031740 $9730: ------  .byte $F0
  0x031741 $9731: -D0-I-  .byte $01 ; <indirect ref>
  0x031742 $9732: -D0-I-  .byte $5C ; <indirect ref>
  0x031743 $9733: -D0-I-  .byte $EE ; <indirect ref>
  0x031744 $9734: -D0-I-  .byte $FC ; <indirect ref>
  0x031745 $9735: ------  .byte $04
  0x031746 $9736: -D0-I-  .byte $F5 ; <indirect ref>
  0x031747 $9737: -D0-I-  .byte $2D ; <indirect ref>
  0x031748 $9738: -D0-I-  .byte $00 ; <indirect ref>
  0x031749 $9739: -D0-I-  .byte $14 ; <indirect ref>
  0x03174A $973A: -D0-I-  .byte $2F ; <indirect ref>
  0x03174B $973B: -D0-I-  .byte $10 ; <indirect ref>
  0x03174C $973C: -D0-I-  .byte $79 ; <indirect ref>
  0x03174D $973D: -D0-I-  .byte $FC ; <indirect ref>
  0x03174E $973E: -D0-I-  .byte $F0 ; <indirect ref>
  0x03174F $973F: -D0-I-  .byte $01 ; <indirect ref>
  0x031750 $9740: -D0-I-  .byte $C0 ; <indirect ref>
  0x031751 $9741: -D0-I-  .byte $47 ; <indirect ref>
  0x031752 $9742: -D0-I-  .byte $44 ; <indirect ref>
  0x031753 $9743: -D0-I-  .byte $44 ; <indirect ref>
  0x031754 $9744: -D0-I-  .byte $44 ; <indirect ref>
  0x031755 $9745: -D0-I-  .byte $75 ; <indirect ref>
  0x031756 $9746: -D0-I-  .byte $75 ; <indirect ref>
  0x031757 $9747: -D0-I-  .byte $F7 ; <indirect ref>
  0x031758 $9748: -D0-I-  .byte $07 ; <indirect ref>
  0x031759 $9749: -D0-I-  .byte $6F ; <indirect ref>
  0x03175A $974A: -D0-I-  .byte $79 ; <indirect ref>
  0x03175B $974B: -D0-I-  .byte $79 ; <indirect ref>
  0x03175C $974C: -D0-I-  .byte $FC ; <indirect ref>
  0x03175D $974D: -D0-I-  .byte $F0 ; <indirect ref>
  0x03175E $974E: -D0-I-  .byte $01 ; <indirect ref>
  0x03175F $974F: -D0-I-  .byte $4C ; <indirect ref>
  0x031760 $9750: -D0-I-  .byte $05 ; <indirect ref>
  0x031761 $9751: -D0-I-  .byte $05 ; <indirect ref>
  0x031762 $9752: -D0-I-  .byte $7C ; <indirect ref>
  0x031763 $9753: -D0-I-  .byte $2F ; <indirect ref>
  0x031764 $9754: -D0-I-  .byte $14 ; <indirect ref>
  0x031765 $9755: -D0-I-  .byte $00 ; <indirect ref>
  0x031766 $9756: -D0-I-  .byte $1A ; <indirect ref>
  0x031767 $9757: -D0-I-  .byte $2E ; <indirect ref>
  0x031768 $9758: -D0-I-  .byte $0F ; <indirect ref>
  0x031769 $9759: -D0-I-  .byte $08 ; <indirect ref>
  0x03176A $975A: -D0-I-  .byte $AA ; <indirect ref>
  0x03176B $975B: -D0-I-  .byte $7D ; <indirect ref>
  0x03176C $975C: -D0-I-  .byte $79 ; <indirect ref>
  0x03176D $975D: -D0-I-  .byte $FC ; <indirect ref>
  0x03176E $975E: -D0-I-  .byte $F0 ; <indirect ref>
  0x03176F $975F: -D0-I-  .byte $F4 ; <indirect ref>
  0x031770 $9760: -D0-I-  .byte $01 ; <indirect ref>
  0x031771 $9761: -D0-I-  .byte $65 ; <indirect ref>
  0x031772 $9762: -D0-I-  .byte $97 ; <indirect ref>
  0x031773 $9763: -D0-I-  .byte $7B ; <indirect ref>
  0x031774 $9764: -D0-I-  .byte $97 ; <indirect ref>
  0x031775 $9765: -D0-I-  .byte $01 ; <indirect ref>
  0x031776 $9766: -D0-I-  .byte $51 ; <indirect ref>
  0x031777 $9767: -D0-I-  .byte $0F ; <indirect ref>
  0x031778 $9768: -D0-I-  .byte $2A ; <indirect ref>
  0x031779 $9769: -D0-I-  .byte $2D ; <indirect ref>
  0x03177A $976A: -D0-I-  .byte $00 ; <indirect ref>
  0x03177B $976B: -D0-I-  .byte $E4 ; <indirect ref>
  0x03177C $976C: -D0-I-  .byte $A0 ; <indirect ref>
  0x03177D $976D: -D0-I-  .byte $FC ; <indirect ref>
  0x03177E $976E: ------  .byte $01
  0x03177F $976F: -D0-I-  .byte $18 ; <indirect ref>
  0x031780 $9770: -D0-I-  .byte $A6 ; <indirect ref>
  0x031781 $9771: -D0-I-  .byte $0A ; <indirect ref>
  0x031782 $9772: -D0-I-  .byte $20 ; <indirect ref>
  0x031783 $9773: -D0-I-  .byte $16 ; <indirect ref>
  0x031784 $9774: -D0-I-  .byte $00 ; <indirect ref>
  0x031785 $9775: -D0-I-  .byte $02 ; <indirect ref>
  0x031786 $9776: -D0-I-  .byte $2F ; <indirect ref>
  0x031787 $9777: -D0-I-  .byte $10 ; <indirect ref>
  0x031788 $9778: -D0-I-  .byte $79 ; <indirect ref>
  0x031789 $9779: -D0-I-  .byte $FC ; <indirect ref>
  0x03178A $977A: -D0-I-  .byte $F0 ; <indirect ref>
  0x03178B $977B: -D0-I-  .byte $01 ; <indirect ref>
  0x03178C $977C: -D0-I-  .byte $61 ; <indirect ref>
  0x03178D $977D: -D0-I-  .byte $05 ; <indirect ref>
  0x03178E $977E: -D0-I-  .byte $7C ; <indirect ref>
  0x03178F $977F: -D0-I-  .byte $2F ; <indirect ref>
  0x031790 $9780: -D0-I-  .byte $14 ; <indirect ref>
  0x031791 $9781: -D0-I-  .byte $79 ; <indirect ref>
  0x031792 $9782: -D0-I-  .byte $FC ; <indirect ref>
  0x031793 $9783: ------  .byte $01
  0x031794 $9784: -D0-I-  .byte $0F ; <indirect ref>
  0x031795 $9785: -D0-I-  .byte $2A ; <indirect ref>
  0x031796 $9786: -D0-I-  .byte $2D ; <indirect ref>
  0x031797 $9787: -D0-I-  .byte $00 ; <indirect ref>
  0x031798 $9788: -D0-I-  .byte $E4 ; <indirect ref>
  0x031799 $9789: -D0-I-  .byte $A0 ; <indirect ref>
  0x03179A $978A: -D0-I-  .byte $FC ; <indirect ref>
  0x03179B $978B: ------  .byte $01
  0x03179C $978C: -D0-I-  .byte $18 ; <indirect ref>
  0x03179D $978D: -D0-I-  .byte $A6 ; <indirect ref>
  0x03179E $978E: -D0-I-  .byte $0A ; <indirect ref>
  0x03179F $978F: -D0-I-  .byte $20 ; <indirect ref>
  0x0317A0 $9790: -D0-I-  .byte $16 ; <indirect ref>
  0x0317A1 $9791: -D0-I-  .byte $00 ; <indirect ref>
  0x0317A2 $9792: -D0-I-  .byte $07 ; <indirect ref>
  0x0317A3 $9793: -D0-I-  .byte $10 ; <indirect ref>
  0x0317A4 $9794: -D0-I-  .byte $79 ; <indirect ref>
  0x0317A5 $9795: -D0-I-  .byte $FC ; <indirect ref>
  0x0317A6 $9796: -D0-I-  .byte $F0 ; <indirect ref>
  0x0317A7 $9797: -D0-I-  .byte $01 ; <indirect ref>
  0x0317A8 $9798: -D0-I-  .byte $52 ; <indirect ref>
  0x0317A9 $9799: -D0-I-  .byte $F6 ; <indirect ref>
  0x0317AA $979A: -D0-I-  .byte $D1 ; <indirect ref>
  0x0317AB $979B: -D0-I-  .byte $4D ; <indirect ref>
  0x0317AC $979C: -D0-I-  .byte $54 ; <indirect ref>
  0x0317AD $979D: -D0-I-  .byte $16 ; <indirect ref>
  0x0317AE $979E: -D0-I-  .byte $00 ; <indirect ref>
  0x0317AF $979F: -D0-I-  .byte $01 ; <indirect ref>
  0x0317B0 $97A0: -D0-I-  .byte $10 ; <indirect ref>
  0x0317B1 $97A1: -D0-I-  .byte $2F ; <indirect ref>
  0x0317B2 $97A2: -D0-I-  .byte $13 ; <indirect ref>
  0x0317B3 $97A3: -D0-I-  .byte $FC ; <indirect ref>
  0x0317B4 $97A4: ------  .byte $01
  0x0317B5 $97A5: -D0-I-  .byte $F5 ; <indirect ref>
  0x0317B6 $97A6: -D0-I-  .byte $A0 ; <indirect ref>
  0x0317B7 $97A7: -D0-I-  .byte $00 ; <indirect ref>
  0x0317B8 $97A8: -D0-I-  .byte $1A ; <indirect ref>
  0x0317B9 $97A9: -D0-I-  .byte $2A ; <indirect ref>
  0x0317BA $97AA: -D0-I-  .byte $12 ; <indirect ref>
  0x0317BB $97AB: -D0-I-  .byte $0C ; <indirect ref>
  0x0317BC $97AC: -D0-I-  .byte $10 ; <indirect ref>
  0x0317BD $97AD: -D0-I-  .byte $2F ; <indirect ref>
  0x0317BE $97AE: -D0-I-  .byte $79 ; <indirect ref>
  0x0317BF $97AF: -D0-I-  .byte $FC ; <indirect ref>
  0x0317C0 $97B0: -D0-I-  .byte $2D ; <indirect ref>
  0x0317C1 $97B1: -D0-I-  .byte $52 ; <indirect ref>
  0x0317C2 $97B2: -D0-I-  .byte $0D ; <indirect ref>
  0x0317C3 $97B3: -D0-I-  .byte $3F ; <indirect ref>
  0x0317C4 $97B4: -D0-I-  .byte $0D ; <indirect ref>
  0x0317C5 $97B5: -D0-I-  .byte $A4 ; <indirect ref>
  0x0317C6 $97B6: -D0-I-  .byte $02 ; <indirect ref>
  0x0317C7 $97B7: -D0-I-  .byte $FC ; <indirect ref>
  0x0317C8 $97B8: ------  .byte $08
  0x0317C9 $97B9: -D0-I-  .byte $F5 ; <indirect ref>
  0x0317CA $97BA: -D0-I-  .byte $19 ; <indirect ref>
  0x0317CB $97BB: -D0-I-  .byte $00 ; <indirect ref>
  0x0317CC $97BC: -D0-I-  .byte $02 ; <indirect ref>
  0x0317CD $97BD: -D0-I-  .byte $28 ; <indirect ref>
  0x0317CE $97BE: -D0-I-  .byte $32 ; <indirect ref>
  0x0317CF $97BF: -D0-I-  .byte $08 ; <indirect ref>
  0x0317D0 $97C0: -D0-I-  .byte $AA ; <indirect ref>
  0x0317D1 $97C1: -D0-I-  .byte $79 ; <indirect ref>
  0x0317D2 $97C2: -D0-I-  .byte $FC ; <indirect ref>
  0x0317D3 $97C3: -D0-I-  .byte $F0 ; <indirect ref>
  0x0317D4 $97C4: -D0-I-  .byte $01 ; <indirect ref>
  0x0317D5 $97C5: -D0-I-  .byte $51 ; <indirect ref>
  0x0317D6 $97C6: -D0-I-  .byte $ED ; <indirect ref>
  0x0317D7 $97C7: -D0-I-  .byte $FC ; <indirect ref>
  0x0317D8 $97C8: ------  .byte $01
  0x0317D9 $97C9: -D0-I-  .byte $F6 ; <indirect ref>
  0x0317DA $97CA: -D0-I-  .byte $2D ; <indirect ref>
  0x0317DB $97CB: -D0-I-  .byte $00 ; <indirect ref>
  0x0317DC $97CC: -D0-I-  .byte $1F ; <indirect ref>
  0x0317DD $97CD: -D0-I-  .byte $23 ; <indirect ref>
  0x0317DE $97CE: -D0-I-  .byte $2F ; <indirect ref>
  0x0317DF $97CF: -D0-I-  .byte $10 ; <indirect ref>
  0x0317E0 $97D0: -D0-I-  .byte $79 ; <indirect ref>
  0x0317E1 $97D1: -D0-I-  .byte $FC ; <indirect ref>
  0x0317E2 $97D2: -D0-I-  .byte $F0 ; <indirect ref>
  0x0317E3 $97D3: -D0-I-  .byte $01 ; <indirect ref>
  0x0317E4 $97D4: -D0-I-  .byte $42 ; <indirect ref>
  0x0317E5 $97D5: -D0-I-  .byte $0A ; <indirect ref>
  0x0317E6 $97D6: -D0-I-  .byte $B3 ; <indirect ref>
  0x0317E7 $97D7: -D0-I-  .byte $2A ; <indirect ref>
  0x0317E8 $97D8: -D0-I-  .byte $BE ; <indirect ref>
  0x0317E9 $97D9: -D0-I-  .byte $5F ; <indirect ref>
  0x0317EA $97DA: -D0-I-  .byte $16 ; <indirect ref>
  0x0317EB $97DB: -D0-I-  .byte $00 ; <indirect ref>
  0x0317EC $97DC: -D0-I-  .byte $15 ; <indirect ref>
  0x0317ED $97DD: -D0-I-  .byte $2F ; <indirect ref>
  0x0317EE $97DE: -D0-I-  .byte $10 ; <indirect ref>
  0x0317EF $97DF: -D0-I-  .byte $F7 ; <indirect ref>
  0x0317F0 $97E0: -D0-I-  .byte $02 ; <indirect ref>
  0x0317F1 $97E1: -D0-I-  .byte $79 ; <indirect ref>
  0x0317F2 $97E2: -D0-I-  .byte $FC ; <indirect ref>
  0x0317F3 $97E3: -D0-I-  .byte $F0 ; <indirect ref>
  0x0317F4 $97E4: -D0-I-  .byte $01 ; <indirect ref>
  0x0317F5 $97E5: -D0-I-  .byte $52 ; <indirect ref>
  0x0317F6 $97E6: -D0-I-  .byte $46 ; <indirect ref>
  0x0317F7 $97E7: -D0-I-  .byte $C6 ; <indirect ref>
  0x0317F8 $97E8: -D0-I-  .byte $16 ; <indirect ref>
  0x0317F9 $97E9: -D0-I-  .byte $00 ; <indirect ref>
  0x0317FA $97EA: -D0-I-  .byte $01 ; <indirect ref>
  0x0317FB $97EB: -D0-I-  .byte $10 ; <indirect ref>
  0x0317FC $97EC: -D0-I-  .byte $2F ; <indirect ref>
  0x0317FD $97ED: -D0-I-  .byte $13 ; <indirect ref>
  0x0317FE $97EE: -D0-I-  .byte $FC ; <indirect ref>
  0x0317FF $97EF: ------  .byte $01
  0x031800 $97F0: -D0-I-  .byte $02 ; <indirect ref>
  0x031801 $97F1: -D0-I-  .byte $07 ; <indirect ref>
  0x031802 $97F2: -D0-I-  .byte $05 ; <indirect ref>
  0x031803 $97F3: -D0-I-  .byte $02 ; <indirect ref>
  0x031804 $97F4: -D0-I-  .byte $1A ; <indirect ref>
  0x031805 $97F5: -D0-I-  .byte $00 ; <indirect ref>
  0x031806 $97F6: -D0-I-  .byte $26 ; <indirect ref>
  0x031807 $97F7: -D0-I-  .byte $2C ; <indirect ref>
  0x031808 $97F8: -D0-I-  .byte $1F ; <indirect ref>
  0x031809 $97F9: -D0-I-  .byte $2F ; <indirect ref>
  0x03180A $97FA: -D0-I-  .byte $10 ; <indirect ref>
  0x03180B $97FB: -D0-I-  .byte $79 ; <indirect ref>
  0x03180C $97FC: -D0-I-  .byte $FC ; <indirect ref>
  0x03180D $97FD: -D0-I-  .byte $F0 ; <indirect ref>
  0x03180E $97FE: -D0-I-  .byte $01 ; <indirect ref>
  0x03180F $97FF: -D0-I-  .byte $41 ; <indirect ref>
  0x031810 $9800: -D0-I-  .byte $46 ; <indirect ref>
  0x031811 $9801: -D0-I-  .byte $C6 ; <indirect ref>
  0x031812 $9802: -D0-I-  .byte $1A ; <indirect ref>
  0x031813 $9803: -D0-I-  .byte $4C ; <indirect ref>
  0x031814 $9804: -D0-I-  .byte $71 ; <indirect ref>
  0x031815 $9805: -D0-I-  .byte $7D ; <indirect ref>
  0x031816 $9806: -D0-I-  .byte $54 ; <indirect ref>
  0x031817 $9807: -D0-I-  .byte $2D ; <indirect ref>
  0x031818 $9808: -D0-I-  .byte $1C ; <indirect ref>
  0x031819 $9809: -D0-I-  .byte $0E ; <indirect ref>
  0x03181A $980A: -D0-I-  .byte $A3 ; <indirect ref>
  0x03181B $980B: -D0-I-  .byte $15 ; <indirect ref>
  0x03181C $980C: -D0-I-  .byte $02 ; <indirect ref>
  0x03181D $980D: -D0-I-  .byte $79 ; <indirect ref>
  0x03181E $980E: -D0-I-  .byte $FC ; <indirect ref>
  0x03181F $980F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031820 $9810: -D0-I-  .byte $F4 ; <indirect ref>
  0x031821 $9811: -D0-I-  .byte $01 ; <indirect ref>
  0x031822 $9812: -D0-I-  .byte $16 ; <indirect ref>
  0x031823 $9813: -D0-I-  .byte $98 ; <indirect ref>
  0x031824 $9814: -D0-I-  .byte $24 ; <indirect ref>
  0x031825 $9815: -D0-I-  .byte $98 ; <indirect ref>
  0x031826 $9816: -D0-I-  .byte $01 ; <indirect ref>
  0x031827 $9817: -D0-I-  .byte $12 ; <indirect ref>
  0x031828 $9818: -D0-I-  .byte $EE ; <indirect ref>
  0x031829 $9819: -D0-I-  .byte $FC ; <indirect ref>
  0x03182A $981A: ------  .byte $01
  0x03182B $981B: -D0-I-  .byte $21 ; <indirect ref>
  0x03182C $981C: -D0-I-  .byte $06 ; <indirect ref>
  0x03182D $981D: -D0-I-  .byte $2F ; <indirect ref>
  0x03182E $981E: -D0-I-  .byte $13 ; <indirect ref>
  0x03182F $981F: -D0-I-  .byte $07 ; <indirect ref>
  0x031830 $9820: -D0-I-  .byte $10 ; <indirect ref>
  0x031831 $9821: -D0-I-  .byte $79 ; <indirect ref>
  0x031832 $9822: -D0-I-  .byte $FC ; <indirect ref>
  0x031833 $9823: -D0-I-  .byte $F0 ; <indirect ref>
  0x031834 $9824: -D0-I-  .byte $01 ; <indirect ref>
  0x031835 $9825: -D0-I-  .byte $12 ; <indirect ref>
  0x031836 $9826: -D0-I-  .byte $EE ; <indirect ref>
  0x031837 $9827: -D0-I-  .byte $FC ; <indirect ref>
  0x031838 $9828: ------  .byte $01
  0x031839 $9829: -D0-I-  .byte $21 ; <indirect ref>
  0x03183A $982A: -D0-I-  .byte $06 ; <indirect ref>
  0x03183B $982B: -D0-I-  .byte $2F ; <indirect ref>
  0x03183C $982C: -D0-I-  .byte $13 ; <indirect ref>
  0x03183D $982D: -D0-I-  .byte $02 ; <indirect ref>
  0x03183E $982E: -D0-I-  .byte $2F ; <indirect ref>
  0x03183F $982F: -D0-I-  .byte $10 ; <indirect ref>
  0x031840 $9830: -D0-I-  .byte $79 ; <indirect ref>
  0x031841 $9831: -D0-I-  .byte $FC ; <indirect ref>
  0x031842 $9832: -D0-I-  .byte $F0 ; <indirect ref>
  0x031843 $9833: -D0-I-  .byte $01 ; <indirect ref>
  0x031844 $9834: -D0-I-  .byte $12 ; <indirect ref>
  0x031845 $9835: -D0-I-  .byte $EE ; <indirect ref>
  0x031846 $9836: -D0-I-  .byte $FC ; <indirect ref>
  0x031847 $9837: ------  .byte $01
  0x031848 $9838: -D0-I-  .byte $46 ; <indirect ref>
  0x031849 $9839: -D0-I-  .byte $6F ; <indirect ref>
  0x03184A $983A: -D0-I-  .byte $54 ; <indirect ref>
  0x03184B $983B: -D0-I-  .byte $16 ; <indirect ref>
  0x03184C $983C: -D0-I-  .byte $00 ; <indirect ref>
  0x03184D $983D: -D0-I-  .byte $21 ; <indirect ref>
  0x03184E $983E: -D0-I-  .byte $06 ; <indirect ref>
  0x03184F $983F: -D0-I-  .byte $03 ; <indirect ref>
  0x031850 $9840: -D0-I-  .byte $79 ; <indirect ref>
  0x031851 $9841: -D0-I-  .byte $FC ; <indirect ref>
  0x031852 $9842: -D0-I-  .byte $F0 ; <indirect ref>
  0x031853 $9843: -D0-I-  .byte $01 ; <indirect ref>
  0x031854 $9844: -D0-I-  .byte $12 ; <indirect ref>
  0x031855 $9845: -D0-I-  .byte $EE ; <indirect ref>
  0x031856 $9846: -D0-I-  .byte $FC ; <indirect ref>
  0x031857 $9847: ------  .byte $01
  0x031858 $9848: -D0-I-  .byte $E3 ; <indirect ref>
  0x031859 $9849: -D0-I-  .byte $79 ; <indirect ref>
  0x03185A $984A: -D0-I-  .byte $FC ; <indirect ref>
  0x03185B $984B: -D0-I-  .byte $F0 ; <indirect ref>
  0x03185C $984C: -D0-I-  .byte $01 ; <indirect ref>
  0x03185D $984D: -D0-I-  .byte $51 ; <indirect ref>
  0x03185E $984E: -D0-I-  .byte $ED ; <indirect ref>
  0x03185F $984F: -D0-I-  .byte $FC ; <indirect ref>
  0x031860 $9850: ------  .byte $01
  0x031861 $9851: -D0-I-  .byte $0E ; <indirect ref>
  0x031862 $9852: -D0-I-  .byte $28 ; <indirect ref>
  0x031863 $9853: -D0-I-  .byte $01 ; <indirect ref>
  0x031864 $9854: -D0-I-  .byte $02 ; <indirect ref>
  0x031865 $9855: -D0-I-  .byte $16 ; <indirect ref>
  0x031866 $9856: -D0-I-  .byte $00 ; <indirect ref>
  0x031867 $9857: -D0-I-  .byte $02 ; <indirect ref>
  0x031868 $9858: -D0-I-  .byte $08 ; <indirect ref>
  0x031869 $9859: -D0-I-  .byte $79 ; <indirect ref>
  0x03186A $985A: -D0-I-  .byte $FC ; <indirect ref>
  0x03186B $985B: -D0-I-  .byte $F0 ; <indirect ref>
  0x03186C $985C: -D0-I-  .byte $01 ; <indirect ref>
  0x03186D $985D: -D0-I-  .byte $51 ; <indirect ref>
  0x03186E $985E: -D0-I-  .byte $EE ; <indirect ref>
  0x03186F $985F: -D0-I-  .byte $FC ; <indirect ref>
  0x031870 $9860: ------  .byte $01
  0x031871 $9861: -D0-I-  .byte $0E ; <indirect ref>
  0x031872 $9862: -D0-I-  .byte $28 ; <indirect ref>
  0x031873 $9863: -D0-I-  .byte $01 ; <indirect ref>
  0x031874 $9864: -D0-I-  .byte $02 ; <indirect ref>
  0x031875 $9865: -D0-I-  .byte $16 ; <indirect ref>
  0x031876 $9866: -D0-I-  .byte $00 ; <indirect ref>
  0x031877 $9867: -D0-I-  .byte $02 ; <indirect ref>
  0x031878 $9868: -D0-I-  .byte $08 ; <indirect ref>
  0x031879 $9869: -D0-I-  .byte $79 ; <indirect ref>
  0x03187A $986A: -D0-I-  .byte $FC ; <indirect ref>
  0x03187B $986B: -D0-I-  .byte $F0 ; <indirect ref>
  0x03187C $986C: -D0-I-  .byte $01 ; <indirect ref>
  0x03187D $986D: -D0-I-  .byte $52 ; <indirect ref>
  0x03187E $986E: -D0-I-  .byte $EE ; <indirect ref>
  0x03187F $986F: -D0-I-  .byte $23 ; <indirect ref>
  0x031880 $9870: -D0-I-  .byte $FC ; <indirect ref>
  0x031881 $9871: ------  .byte $01
  0x031882 $9872: -D0-I-  .byte $0E ; <indirect ref>
  0x031883 $9873: -D0-I-  .byte $28 ; <indirect ref>
  0x031884 $9874: -D0-I-  .byte $01 ; <indirect ref>
  0x031885 $9875: -D0-I-  .byte $03 ; <indirect ref>
  0x031886 $9876: -D0-I-  .byte $79 ; <indirect ref>
  0x031887 $9877: -D0-I-  .byte $79 ; <indirect ref>
  0x031888 $9878: -D0-I-  .byte $FC ; <indirect ref>
  0x031889 $9879: -D0-I-  .byte $F0 ; <indirect ref>
  0x03188A $987A: -D0-I-  .byte $01 ; <indirect ref>
  0x03188B $987B: -D0-I-  .byte $6C ; <indirect ref>
  0x03188C $987C: -D0-I-  .byte $05 ; <indirect ref>
  0x03188D $987D: -D0-I-  .byte $7C ; <indirect ref>
  0x03188E $987E: -D0-I-  .byte $2F ; <indirect ref>
  0x03188F $987F: -D0-I-  .byte $79 ; <indirect ref>
  0x031890 $9880: -D0-I-  .byte $FC ; <indirect ref>
  0x031891 $9881: ------  .byte $01
  0x031892 $9882: -D0-I-  .byte $EE ; <indirect ref>
  0x031893 $9883: -D0-I-  .byte $23 ; <indirect ref>
  0x031894 $9884: -D0-I-  .byte $FC ; <indirect ref>
  0x031895 $9885: ------  .byte $01
  0x031896 $9886: -D0-I-  .byte $14 ; <indirect ref>
  0x031897 $9887: -D0-I-  .byte $2E ; <indirect ref>
  0x031898 $9888: -D0-I-  .byte $AA ; <indirect ref>
  0x031899 $9889: -D0-I-  .byte $F7 ; <indirect ref>
  0x03189A $988A: -D0-I-  .byte $02 ; <indirect ref>
  0x03189B $988B: -D0-I-  .byte $79 ; <indirect ref>
  0x03189C $988C: -D0-I-  .byte $FC ; <indirect ref>
  0x03189D $988D: -D0-I-  .byte $F0 ; <indirect ref>
  0x03189E $988E: -D0-I-  .byte $01 ; <indirect ref>
  0x03189F $988F: -D0-I-  .byte $51 ; <indirect ref>
  0x0318A0 $9890: -D0-I-  .byte $EE ; <indirect ref>
  0x0318A1 $9891: -D0-I-  .byte $23 ; <indirect ref>
  0x0318A2 $9892: -D0-I-  .byte $FC ; <indirect ref>
  0x0318A3 $9893: ------  .byte $01
  0x0318A4 $9894: -D0-I-  .byte $BA ; <indirect ref>
  0x0318A5 $9895: -D0-I-  .byte $70 ; <indirect ref>
  0x0318A6 $9896: -D0-I-  .byte $6E ; <indirect ref>
  0x0318A7 $9897: -D0-I-  .byte $CF ; <indirect ref>
  0x0318A8 $9898: -D0-I-  .byte $79 ; <indirect ref>
  0x0318A9 $9899: -D0-I-  .byte $FC ; <indirect ref>
  0x0318AA $989A: -D0-I-  .byte $F0 ; <indirect ref>
  0x0318AB $989B: -D0-I-  .byte $01 ; <indirect ref>
  0x0318AC $989C: -D0-I-  .byte $52 ; <indirect ref>
  0x0318AD $989D: -D0-I-  .byte $EE ; <indirect ref>
  0x0318AE $989E: -D0-I-  .byte $FC ; <indirect ref>
  0x0318AF $989F: ------  .byte $04
  0x0318B0 $98A0: -D0-I-  .byte $E3 ; <indirect ref>
  0x0318B1 $98A1: -D0-I-  .byte $79 ; <indirect ref>
  0x0318B2 $98A2: -D0-I-  .byte $FC ; <indirect ref>
  0x0318B3 $98A3: -D0-I-  .byte $F0 ; <indirect ref>
  0x0318B4 $98A4: -D0-I-  .byte $01 ; <indirect ref>
  0x0318B5 $98A5: -D0-I-  .byte $51 ; <indirect ref>
  0x0318B6 $98A6: -D0-I-  .byte $EE ; <indirect ref>
  0x0318B7 $98A7: -D0-I-  .byte $FC ; <indirect ref>
  0x0318B8 $98A8: ------  .byte $01
  0x0318B9 $98A9: -D0-I-  .byte $0E ; <indirect ref>
  0x0318BA $98AA: -D0-I-  .byte $28 ; <indirect ref>
  0x0318BB $98AB: -D0-I-  .byte $01 ; <indirect ref>
  0x0318BC $98AC: -D0-I-  .byte $02 ; <indirect ref>
  0x0318BD $98AD: -D0-I-  .byte $16 ; <indirect ref>
  0x0318BE $98AE: -D0-I-  .byte $00 ; <indirect ref>
  0x0318BF $98AF: -D0-I-  .byte $02 ; <indirect ref>
  0x0318C0 $98B0: -D0-I-  .byte $08 ; <indirect ref>
  0x0318C1 $98B1: -D0-I-  .byte $79 ; <indirect ref>
  0x0318C2 $98B2: -D0-I-  .byte $FC ; <indirect ref>
  0x0318C3 $98B3: -D0-I-  .byte $F0 ; <indirect ref>
  0x0318C4 $98B4: -D0-I-  .byte $01 ; <indirect ref>
  0x0318C5 $98B5: -D0-I-  .byte $51 ; <indirect ref>
  0x0318C6 $98B6: -D0-I-  .byte $EE ; <indirect ref>
  0x0318C7 $98B7: -D0-I-  .byte $A0 ; <indirect ref>
  0x0318C8 $98B8: -D0-I-  .byte $FC ; <indirect ref>
  0x0318C9 $98B9: ------  .byte $01
  0x0318CA $98BA: -D0-I-  .byte $21 ; <indirect ref>
  0x0318CB $98BB: -D0-I-  .byte $06 ; <indirect ref>
  0x0318CC $98BC: -D0-I-  .byte $2F ; <indirect ref>
  0x0318CD $98BD: -D0-I-  .byte $10 ; <indirect ref>
  0x0318CE $98BE: -D0-I-  .byte $79 ; <indirect ref>
  0x0318CF $98BF: -D0-I-  .byte $FC ; <indirect ref>
  0x0318D0 $98C0: -D0-I-  .byte $F0 ; <indirect ref>
  0x0318D1 $98C1: -D0-I-  .byte $01 ; <indirect ref>
  0x0318D2 $98C2: -D0-I-  .byte $52 ; <indirect ref>
  0x0318D3 $98C3: -D0-I-  .byte $EE ; <indirect ref>
  0x0318D4 $98C4: -D0-I-  .byte $23 ; <indirect ref>
  0x0318D5 $98C5: -D0-I-  .byte $FC ; <indirect ref>
  0x0318D6 $98C6: ------  .byte $01
  0x0318D7 $98C7: -D0-I-  .byte $21 ; <indirect ref>
  0x0318D8 $98C8: -D0-I-  .byte $06 ; <indirect ref>
  0x0318D9 $98C9: -D0-I-  .byte $2F ; <indirect ref>
  0x0318DA $98CA: -D0-I-  .byte $10 ; <indirect ref>
  0x0318DB $98CB: -D0-I-  .byte $7D ; <indirect ref>
  0x0318DC $98CC: -D0-I-  .byte $79 ; <indirect ref>
  0x0318DD $98CD: -D0-I-  .byte $FC ; <indirect ref>
  0x0318DE $98CE: -D0-I-  .byte $F0 ; <indirect ref>
  0x0318DF $98CF: -D0-I-  .byte $01 ; <indirect ref>
  0x0318E0 $98D0: -D0-I-  .byte $6C ; <indirect ref>
  0x0318E1 $98D1: -D0-I-  .byte $05 ; <indirect ref>
  0x0318E2 $98D2: -D0-I-  .byte $7C ; <indirect ref>
  0x0318E3 $98D3: -D0-I-  .byte $2F ; <indirect ref>
  0x0318E4 $98D4: -D0-I-  .byte $14 ; <indirect ref>
  0x0318E5 $98D5: -D0-I-  .byte $79 ; <indirect ref>
  0x0318E6 $98D6: -D0-I-  .byte $FC ; <indirect ref>
  0x0318E7 $98D7: ------  .byte $01
  0x0318E8 $98D8: -D0-I-  .byte $EE ; <indirect ref>
  0x0318E9 $98D9: -D0-I-  .byte $23 ; <indirect ref>
  0x0318EA $98DA: -D0-I-  .byte $FC ; <indirect ref>
  0x0318EB $98DB: ------  .byte $01
  0x0318EC $98DC: -D0-I-  .byte $0E ; <indirect ref>
  0x0318ED $98DD: -D0-I-  .byte $28 ; <indirect ref>
  0x0318EE $98DE: -D0-I-  .byte $01 ; <indirect ref>
  0x0318EF $98DF: -D0-I-  .byte $02 ; <indirect ref>
  0x0318F0 $98E0: -D0-I-  .byte $16 ; <indirect ref>
  0x0318F1 $98E1: -D0-I-  .byte $00 ; <indirect ref>
  0x0318F2 $98E2: -D0-I-  .byte $02 ; <indirect ref>
  0x0318F3 $98E3: -D0-I-  .byte $08 ; <indirect ref>
  0x0318F4 $98E4: -D0-I-  .byte $79 ; <indirect ref>
  0x0318F5 $98E5: -D0-I-  .byte $FC ; <indirect ref>
  0x0318F6 $98E6: -D0-I-  .byte $F0 ; <indirect ref>
  0x0318F7 $98E7: -D0-I-  .byte $01 ; <indirect ref>
  0x0318F8 $98E8: -D0-I-  .byte $51 ; <indirect ref>
  0x0318F9 $98E9: -D0-I-  .byte $EE ; <indirect ref>
  0x0318FA $98EA: -D0-I-  .byte $23 ; <indirect ref>
  0x0318FB $98EB: -D0-I-  .byte $FC ; <indirect ref>
  0x0318FC $98EC: ------  .byte $01
  0x0318FD $98ED: -D0-I-  .byte $02 ; <indirect ref>
  0x0318FE $98EE: -D0-I-  .byte $2F ; <indirect ref>
  0x0318FF $98EF: -D0-I-  .byte $10 ; <indirect ref>
  0x031900 $98F0: -D0-I-  .byte $7C ; <indirect ref>
  0x031901 $98F1: -D0-I-  .byte $79 ; <indirect ref>
  0x031902 $98F2: -D0-I-  .byte $FC ; <indirect ref>
  0x031903 $98F3: -D0-I-  .byte $F0 ; <indirect ref>
  0x031904 $98F4: -D0-I-  .byte $01 ; <indirect ref>
  0x031905 $98F5: -D0-I-  .byte $22 ; <indirect ref>
  0x031906 $98F6: -D0-I-  .byte $E4 ; <indirect ref>
  0x031907 $98F7: -D0-I-  .byte $FC ; <indirect ref>
  0x031908 $98F8: ------  .byte $08
  0x031909 $98F9: -D0-I-  .byte $07 ; <indirect ref>
  0x03190A $98FA: -D0-I-  .byte $2C ; <indirect ref>
  0x03190B $98FB: -D0-I-  .byte $AE ; <indirect ref>
  0x03190C $98FC: -D0-I-  .byte $02 ; <indirect ref>
  0x03190D $98FD: -D0-I-  .byte $14 ; <indirect ref>
  0x03190E $98FE: -D0-I-  .byte $0A ; <indirect ref>
  0x03190F $98FF: -D0-I-  .byte $2B ; <indirect ref>
  0x031910 $9900: -D0-I-  .byte $AD ; <indirect ref>
  0x031911 $9901: -D0-I-  .byte $FC ; <indirect ref>
  0x031912 $9902: ------  .byte $01
  0x031913 $9903: -D0-I-  .byte $06 ; <indirect ref>
  0x031914 $9904: -D0-I-  .byte $2C ; <indirect ref>
  0x031915 $9905: -D0-I-  .byte $0C ; <indirect ref>
  0x031916 $9906: -D0-I-  .byte $10 ; <indirect ref>
  0x031917 $9907: -D0-I-  .byte $2F ; <indirect ref>
  0x031918 $9908: -D0-I-  .byte $79 ; <indirect ref>
  0x031919 $9909: -D0-I-  .byte $FC ; <indirect ref>
  0x03191A $990A: -D0-I-  .byte $F0 ; <indirect ref>
  0x03191B $990B: -D0-I-  .byte $01 ; <indirect ref>
  0x03191C $990C: -D0-I-  .byte $12 ; <indirect ref>
  0x03191D $990D: -D0-I-  .byte $E4 ; <indirect ref>
  0x03191E $990E: -D0-I-  .byte $FC ; <indirect ref>
  0x03191F $990F: ------  .byte $08
  0x031920 $9910: -D0-I-  .byte $06 ; <indirect ref>
  0x031921 $9911: -D0-I-  .byte $2C ; <indirect ref>
  0x031922 $9912: -D0-I-  .byte $0C ; <indirect ref>
  0x031923 $9913: -D0-I-  .byte $10 ; <indirect ref>
  0x031924 $9914: -D0-I-  .byte $79 ; <indirect ref>
  0x031925 $9915: -D0-I-  .byte $FC ; <indirect ref>
  0x031926 $9916: -D0-I-  .byte $F0 ; <indirect ref>
  0x031927 $9917: -D0-I-  .byte $F2 ; <indirect ref>
  0x031928 $9918: -D0-I-  .byte $01 ; <indirect ref>
  0x031929 $9919: -D0-I-  .byte $51 ; <indirect ref>
  0x03192A $991A: -D0-I-  .byte $E4 ; <indirect ref>
  0x03192B $991B: -D0-I-  .byte $FC ; <indirect ref>
  0x03192C $991C: ------  .byte $04
  0x03192D $991D: -D0-I-  .byte $E2 ; <indirect ref>
  0x03192E $991E: -D0-I-  .byte $79 ; <indirect ref>
  0x03192F $991F: -D0-I-  .byte $FC ; <indirect ref>
  0x031930 $9920: -D0-I-  .byte $F0 ; <indirect ref>
  0x031931 $9921: -D0-I-  .byte $01 ; <indirect ref>
  0x031932 $9922: -D0-I-  .byte $10 ; <indirect ref>
  0x031933 $9923: -D0-I-  .byte $E4 ; <indirect ref>
  0x031934 $9924: -D0-I-  .byte $FC ; <indirect ref>
  0x031935 $9925: ------  .byte $01
  0x031936 $9926: -D0-I-  .byte $BA ; <indirect ref>
  0x031937 $9927: -D0-I-  .byte $70 ; <indirect ref>
  0x031938 $9928: -D0-I-  .byte $6E ; <indirect ref>
  0x031939 $9929: -D0-I-  .byte $CF ; <indirect ref>
  0x03193A $992A: -D0-I-  .byte $79 ; <indirect ref>
  0x03193B $992B: -D0-I-  .byte $FC ; <indirect ref>
  0x03193C $992C: -D0-I-  .byte $F0 ; <indirect ref>
  0x03193D $992D: -D0-I-  .byte $F2 ; <indirect ref>
  0x03193E $992E: -D0-I-  .byte $01 ; <indirect ref>
  0x03193F $992F: -D0-I-  .byte $5C ; <indirect ref>
  0x031940 $9930: -D0-I-  .byte $E4 ; <indirect ref>
  0x031941 $9931: -D0-I-  .byte $19 ; <indirect ref>
  0x031942 $9932: -D0-I-  .byte $FC ; <indirect ref>
  0x031943 $9933: ------  .byte $01
  0x031944 $9934: -D0-I-  .byte $E0 ; <indirect ref>
  0x031945 $9935: -D0-I-  .byte $79 ; <indirect ref>
  0x031946 $9936: -D0-I-  .byte $FC ; <indirect ref>
  0x031947 $9937: -D0-I-  .byte $F0 ; <indirect ref>
  0x031948 $9938: -D0-I-  .byte $01 ; <indirect ref>
  0x031949 $9939: -D0-I-  .byte $E0 ; <indirect ref>
  0x03194A $993A: -D0-I-  .byte $03 ; <indirect ref>
  0x03194B $993B: -D0-I-  .byte $15 ; <indirect ref>
  0x03194C $993C: -D0-I-  .byte $2A ; <indirect ref>
  0x03194D $993D: -D0-I-  .byte $79 ; <indirect ref>
  0x03194E $993E: -D0-I-  .byte $FC ; <indirect ref>
  0x03194F $993F: ------  .byte $04
  0x031950 $9940: -D0-I-  .byte $0A ; <indirect ref>
  0x031951 $9941: -D0-I-  .byte $2A ; <indirect ref>
  0x031952 $9942: -D0-I-  .byte $A0 ; <indirect ref>
  0x031953 $9943: -D0-I-  .byte $79 ; <indirect ref>
  0x031954 $9944: -D0-I-  .byte $FC ; <indirect ref>
  0x031955 $9945: ------  .byte $04
  0x031956 $9946: -D0-I-  .byte $E0 ; <indirect ref>
  0x031957 $9947: -D0-I-  .byte $AA ; <indirect ref>
  0x031958 $9948: -D0-I-  .byte $7D ; <indirect ref>
  0x031959 $9949: -D0-I-  .byte $7D ; <indirect ref>
  0x03195A $994A: -D0-I-  .byte $79 ; <indirect ref>
  0x03195B $994B: -D0-I-  .byte $79 ; <indirect ref>
  0x03195C $994C: -D0-I-  .byte $FC ; <indirect ref>
  0x03195D $994D: -D0-I-  .byte $F0 ; <indirect ref>
  0x03195E $994E: -D0-I-  .byte $01 ; <indirect ref>
  0x03195F $994F: -D0-I-  .byte $D0 ; <indirect ref>
  0x031960 $9950: -D0-I-  .byte $6C ; <indirect ref>
  0x031961 $9951: -D0-I-  .byte $4C ; <indirect ref>
  0x031962 $9952: -D0-I-  .byte $27 ; <indirect ref>
  0x031963 $9953: -D0-I-  .byte $19 ; <indirect ref>
  0x031964 $9954: -D0-I-  .byte $00 ; <indirect ref>
  0x031965 $9955: -D0-I-  .byte $11 ; <indirect ref>
  0x031966 $9956: -D0-I-  .byte $06 ; <indirect ref>
  0x031967 $9957: -D0-I-  .byte $27 ; <indirect ref>
  0x031968 $9958: -D0-I-  .byte $2D ; <indirect ref>
  0x031969 $9959: -D0-I-  .byte $FC ; <indirect ref>
  0x03196A $995A: ------  .byte $01
  0x03196B $995B: -D0-I-  .byte $20 ; <indirect ref>
  0x03196C $995C: -D0-I-  .byte $0E ; <indirect ref>
  0x03196D $995D: -D0-I-  .byte $13 ; <indirect ref>
  0x03196E $995E: -D0-I-  .byte $24 ; <indirect ref>
  0x03196F $995F: -D0-I-  .byte $29 ; <indirect ref>
  0x031970 $9960: -D0-I-  .byte $F8 ; <indirect ref>
  0x031971 $9961: -D0-I-  .byte $FC ; <indirect ref>
  0x031972 $9962: -D0-I-  .byte $F0 ; <indirect ref>
  0x031973 $9963: -D0-I-  .byte $01 ; <indirect ref>
  0x031974 $9964: -D0-I-  .byte $52 ; <indirect ref>
  0x031975 $9965: -D0-I-  .byte $E4 ; <indirect ref>
  0x031976 $9966: -D0-I-  .byte $FC ; <indirect ref>
  0x031977 $9967: ------  .byte $01
  0x031978 $9968: -D0-I-  .byte $F5 ; <indirect ref>
  0x031979 $9969: -D0-I-  .byte $16 ; <indirect ref>
  0x03197A $996A: -D0-I-  .byte $00 ; <indirect ref>
  0x03197B $996B: -D0-I-  .byte $21 ; <indirect ref>
  0x03197C $996C: -D0-I-  .byte $06 ; <indirect ref>
  0x03197D $996D: -D0-I-  .byte $2F ; <indirect ref>
  0x03197E $996E: -D0-I-  .byte $13 ; <indirect ref>
  0x03197F $996F: -D0-I-  .byte $02 ; <indirect ref>
  0x031980 $9970: -D0-I-  .byte $2F ; <indirect ref>
  0x031981 $9971: -D0-I-  .byte $10 ; <indirect ref>
  0x031982 $9972: -D0-I-  .byte $79 ; <indirect ref>
  0x031983 $9973: -D0-I-  .byte $FC ; <indirect ref>
  0x031984 $9974: -D0-I-  .byte $F0 ; <indirect ref>
  0x031985 $9975: -D0-I-  .byte $01 ; <indirect ref>
  0x031986 $9976: -D0-I-  .byte $52 ; <indirect ref>
  0x031987 $9977: -D0-I-  .byte $E4 ; <indirect ref>
  0x031988 $9978: -D0-I-  .byte $FC ; <indirect ref>
  0x031989 $9979: ------  .byte $08
  0x03198A $997A: -D0-I-  .byte $E2 ; <indirect ref>
  0x03198B $997B: -D0-I-  .byte $FC ; <indirect ref>
  0x03198C $997C: -D0-I-  .byte $F0 ; <indirect ref>
  0x03198D $997D: ------  .byte $01
  0x03198E $997E: ------  .byte $C0
  0x03198F $997F: ------  .byte $03
  0x031990 $9980: ------  .byte $2F
  0x031991 $9981: ------  .byte $79
  0x031992 $9982: ------  .byte $00
  0x031993 $9983: ------  .byte $0C
  0x031994 $9984: ------  .byte $2E
  0x031995 $9985: ------  .byte $A9
  0x031996 $9986: ------  .byte $03
  0x031997 $9987: ------  .byte $A0
  0x031998 $9988: ------  .byte $3F
  0x031999 $9989: ------  .byte $3F
  0x03199A $998A: ------  .byte $3F
  0x03199B $998B: ------  .byte $FC
  0x03199C $998C: ------  .byte $F0
  0x03199D $998D: -D0-I-  .byte $01 ; <indirect ref>
  0x03199E $998E: -D0-I-  .byte $41 ; <indirect ref>
  0x03199F $998F: -D0-I-  .byte $AA ; <indirect ref>
  0x0319A0 $9990: -D0-I-  .byte $A0 ; <indirect ref>
  0x0319A1 $9991: -D0-I-  .byte $00 ; <indirect ref>
  0x0319A2 $9992: -D0-I-  .byte $0A ; <indirect ref>
  0x0319A3 $9993: -D0-I-  .byte $B3 ; <indirect ref>
  0x0319A4 $9994: -D0-I-  .byte $2A ; <indirect ref>
  0x0319A5 $9995: -D0-I-  .byte $BE ; <indirect ref>
  0x0319A6 $9996: -D0-I-  .byte $5F ; <indirect ref>
  0x0319A7 $9997: -D0-I-  .byte $16 ; <indirect ref>
  0x0319A8 $9998: -D0-I-  .byte $15 ; <indirect ref>
  0x0319A9 $9999: -D0-I-  .byte $2F ; <indirect ref>
  0x0319AA $999A: -D0-I-  .byte $10 ; <indirect ref>
  0x0319AB $999B: -D0-I-  .byte $7C ; <indirect ref>
  0x0319AC $999C: -D0-I-  .byte $79 ; <indirect ref>
  0x0319AD $999D: -D0-I-  .byte $FC ; <indirect ref>
  0x0319AE $999E: -D0-I-  .byte $F0 ; <indirect ref>
  0x0319AF $999F: -D0-I-  .byte $01 ; <indirect ref>
  0x0319B0 $99A0: -D0-I-  .byte $74 ; <indirect ref>
  0x0319B1 $99A1: -D0-I-  .byte $E4 ; <indirect ref>
  0x0319B2 $99A2: -D0-I-  .byte $19 ; <indirect ref>
  0x0319B3 $99A3: -D0-I-  .byte $FC ; <indirect ref>
  0x0319B4 $99A4: ------  .byte $01
  0x0319B5 $99A5: -D0-I-  .byte $E0 ; <indirect ref>
  0x0319B6 $99A6: -D0-I-  .byte $A0 ; <indirect ref>
  0x0319B7 $99A7: -D0-I-  .byte $FC ; <indirect ref>
  0x0319B8 $99A8: ------  .byte $01
  0x0319B9 $99A9: -D0-I-  .byte $E5 ; <indirect ref>
  0x0319BA $99AA: -D0-I-  .byte $19 ; <indirect ref>
  0x0319BB $99AB: -D0-I-  .byte $F6 ; <indirect ref>
  0x0319BC $99AC: -D0-I-  .byte $16 ; <indirect ref>
  0x0319BD $99AD: -D0-I-  .byte $FC ; <indirect ref>
  0x0319BE $99AE: ------  .byte $01
  0x0319BF $99AF: -D0-I-  .byte $12 ; <indirect ref>
  0x0319C0 $99B0: -D0-I-  .byte $07 ; <indirect ref>
  0x0319C1 $99B1: -D0-I-  .byte $0B ; <indirect ref>
  0x0319C2 $99B2: -D0-I-  .byte $0B ; <indirect ref>
  0x0319C3 $99B3: -D0-I-  .byte $2F ; <indirect ref>
  0x0319C4 $99B4: -D0-I-  .byte $10 ; <indirect ref>
  0x0319C5 $99B5: -D0-I-  .byte $73 ; <indirect ref>
  0x0319C6 $99B6: -D0-I-  .byte $F7 ; <indirect ref>
  0x0319C7 $99B7: -D0-I-  .byte $02 ; <indirect ref>
  0x0319C8 $99B8: -D0-I-  .byte $79 ; <indirect ref>
  0x0319C9 $99B9: -D0-I-  .byte $FC ; <indirect ref>
  0x0319CA $99BA: -D0-I-  .byte $F0 ; <indirect ref>
  0x0319CB $99BB: -D0-I-  .byte $01 ; <indirect ref>
  0x0319CC $99BC: -D0-I-  .byte $73 ; <indirect ref>
  0x0319CD $99BD: -D0-I-  .byte $E4 ; <indirect ref>
  0x0319CE $99BE: -D0-I-  .byte $19 ; <indirect ref>
  0x0319CF $99BF: -D0-I-  .byte $FC ; <indirect ref>
  0x0319D0 $99C0: ------  .byte $01
  0x0319D1 $99C1: -D0-I-  .byte $E0 ; <indirect ref>
  0x0319D2 $99C2: -D0-I-  .byte $79 ; <indirect ref>
  0x0319D3 $99C3: -D0-I-  .byte $FC ; <indirect ref>
  0x0319D4 $99C4: ------  .byte $01
  0x0319D5 $99C5: -D0-I-  .byte $E5 ; <indirect ref>
  0x0319D6 $99C6: -D0-I-  .byte $19 ; <indirect ref>
  0x0319D7 $99C7: -D0-I-  .byte $F6 ; <indirect ref>
  0x0319D8 $99C8: -D0-I-  .byte $16 ; <indirect ref>
  0x0319D9 $99C9: -D0-I-  .byte $FC ; <indirect ref>
  0x0319DA $99CA: ------  .byte $01
  0x0319DB $99CB: -D0-I-  .byte $12 ; <indirect ref>
  0x0319DC $99CC: -D0-I-  .byte $07 ; <indirect ref>
  0x0319DD $99CD: -D0-I-  .byte $0B ; <indirect ref>
  0x0319DE $99CE: -D0-I-  .byte $0B ; <indirect ref>
  0x0319DF $99CF: -D0-I-  .byte $28 ; <indirect ref>
  0x0319E0 $99D0: -D0-I-  .byte $1F ; <indirect ref>
  0x0319E1 $99D1: -D0-I-  .byte $0C ; <indirect ref>
  0x0319E2 $99D2: -D0-I-  .byte $10 ; <indirect ref>
  0x0319E3 $99D3: -D0-I-  .byte $73 ; <indirect ref>
  0x0319E4 $99D4: -D0-I-  .byte $F7 ; <indirect ref>
  0x0319E5 $99D5: -D0-I-  .byte $03 ; <indirect ref>
  0x0319E6 $99D6: -D0-I-  .byte $79 ; <indirect ref>
  0x0319E7 $99D7: -D0-I-  .byte $FC ; <indirect ref>
  0x0319E8 $99D8: -D0-I-  .byte $F0 ; <indirect ref>
  0x0319E9 $99D9: -D0-I-  .byte $01 ; <indirect ref>
  0x0319EA $99DA: -D0-I-  .byte $74 ; <indirect ref>
  0x0319EB $99DB: -D0-I-  .byte $01 ; <indirect ref>
  0x0319EC $99DC: -D0-I-  .byte $01 ; <indirect ref>
  0x0319ED $99DD: -D0-I-  .byte $2F ; <indirect ref>
  0x0319EE $99DE: -D0-I-  .byte $79 ; <indirect ref>
  0x0319EF $99DF: -D0-I-  .byte $00 ; <indirect ref>
  0x0319F0 $99E0: -D0-I-  .byte $E4 ; <indirect ref>
  0x0319F1 $99E1: -D0-I-  .byte $19 ; <indirect ref>
  0x0319F2 $99E2: -D0-I-  .byte $FC ; <indirect ref>
  0x0319F3 $99E3: ------  .byte $01
  0x0319F4 $99E4: -D0-I-  .byte $E0 ; <indirect ref>
  0x0319F5 $99E5: -D0-I-  .byte $16 ; <indirect ref>
  0x0319F6 $99E6: -D0-I-  .byte $FC ; <indirect ref>
  0x0319F7 $99E7: ------  .byte $01
  0x0319F8 $99E8: -D0-I-  .byte $E5 ; <indirect ref>
  0x0319F9 $99E9: -D0-I-  .byte $F6 ; <indirect ref>
  0x0319FA $99EA: -D0-I-  .byte $1A ; <indirect ref>
  0x0319FB $99EB: -D0-I-  .byte $FC ; <indirect ref>
  0x0319FC $99EC: ------  .byte $01
  0x0319FD $99ED: -D0-I-  .byte $12 ; <indirect ref>
  0x0319FE $99EE: -D0-I-  .byte $07 ; <indirect ref>
  0x0319FF $99EF: -D0-I-  .byte $24 ; <indirect ref>
  0x031A00 $99F0: -D0-I-  .byte $B1 ; <indirect ref>
  0x031A01 $99F1: -D0-I-  .byte $27 ; <indirect ref>
  0x031A02 $99F2: -D0-I-  .byte $2A ; <indirect ref>
  0x031A03 $99F3: -D0-I-  .byte $10 ; <indirect ref>
  0x031A04 $99F4: -D0-I-  .byte $73 ; <indirect ref>
  0x031A05 $99F5: -D0-I-  .byte $F7 ; <indirect ref>
  0x031A06 $99F6: -D0-I-  .byte $03 ; <indirect ref>
  0x031A07 $99F7: -D0-I-  .byte $79 ; <indirect ref>
  0x031A08 $99F8: -D0-I-  .byte $FC ; <indirect ref>
  0x031A09 $99F9: -D0-I-  .byte $F0 ; <indirect ref>
  0x031A0A $99FA: ------  .byte $01
  0x031A0B $99FB: ------  .byte $73
  0x031A0C $99FC: ------  .byte $0D
  0x031A0D $99FD: ------  .byte $A4
  0x031A0E $99FE: ------  .byte $7C
  0x031A0F $99FF: ------  .byte $02
  0x031A10 $9A00: ------  .byte $79
  0x031A11 $9A01: ------  .byte $00
  0x031A12 $9A02: ------  .byte $E4
  0x031A13 $9A03: ------  .byte $19
  0x031A14 $9A04: ------  .byte $FC
  0x031A15 $9A05: ------  .byte $01
  0x031A16 $9A06: ------  .byte $E0
  0x031A17 $9A07: ------  .byte $79
  0x031A18 $9A08: ------  .byte $FC
  0x031A19 $9A09: ------  .byte $01
  0x031A1A $9A0A: ------  .byte $E5
  0x031A1B $9A0B: ------  .byte $19
  0x031A1C $9A0C: ------  .byte $F6
  0x031A1D $9A0D: ------  .byte $2D
  0x031A1E $9A0E: ------  .byte $FC
  0x031A1F $9A0F: ------  .byte $01
  0x031A20 $9A10: ------  .byte $12
  0x031A21 $9A11: ------  .byte $07
  0x031A22 $9A12: ------  .byte $24
  0x031A23 $9A13: ------  .byte $B1
  0x031A24 $9A14: ------  .byte $2F
  0x031A25 $9A15: ------  .byte $10
  0x031A26 $9A16: ------  .byte $73
  0x031A27 $9A17: ------  .byte $F7
  0x031A28 $9A18: ------  .byte $03
  0x031A29 $9A19: ------  .byte $79
  0x031A2A $9A1A: ------  .byte $FC
  0x031A2B $9A1B: ------  .byte $F0
  0x031A2C $9A1C: -D0-I-  .byte $01 ; <indirect ref>
  0x031A2D $9A1D: -D0-I-  .byte $79 ; <indirect ref>
  0x031A2E $9A1E: -D0-I-  .byte $24 ; <indirect ref>
  0x031A2F $9A1F: -D0-I-  .byte $2F ; <indirect ref>
  0x031A30 $9A20: -D0-I-  .byte $10 ; <indirect ref>
  0x031A31 $9A21: -D0-I-  .byte $BC ; <indirect ref>
  0x031A32 $9A22: -D0-I-  .byte $00 ; <indirect ref>
  0x031A33 $9A23: -D0-I-  .byte $E4 ; <indirect ref>
  0x031A34 $9A24: -D0-I-  .byte $79 ; <indirect ref>
  0x031A35 $9A25: -D0-I-  .byte $FC ; <indirect ref>
  0x031A36 $9A26: ------  .byte $01
  0x031A37 $9A27: -D0-I-  .byte $E0 ; <indirect ref>
  0x031A38 $9A28: -D0-I-  .byte $AD ; <indirect ref>
  0x031A39 $9A29: -D0-I-  .byte $FC ; <indirect ref>
  0x031A3A $9A2A: ------  .byte $01
  0x031A3B $9A2B: -D0-I-  .byte $E5 ; <indirect ref>
  0x031A3C $9A2C: -D0-I-  .byte $F6 ; <indirect ref>
  0x031A3D $9A2D: -D0-I-  .byte $2D ; <indirect ref>
  0x031A3E $9A2E: -D0-I-  .byte $FC ; <indirect ref>
  0x031A3F $9A2F: ------  .byte $01
  0x031A40 $9A30: -D0-I-  .byte $12 ; <indirect ref>
  0x031A41 $9A31: -D0-I-  .byte $07 ; <indirect ref>
  0x031A42 $9A32: -D0-I-  .byte $24 ; <indirect ref>
  0x031A43 $9A33: -D0-I-  .byte $B1 ; <indirect ref>
  0x031A44 $9A34: -D0-I-  .byte $2F ; <indirect ref>
  0x031A45 $9A35: -D0-I-  .byte $10 ; <indirect ref>
  0x031A46 $9A36: -D0-I-  .byte $73 ; <indirect ref>
  0x031A47 $9A37: -D0-I-  .byte $F7 ; <indirect ref>
  0x031A48 $9A38: -D0-I-  .byte $03 ; <indirect ref>
  0x031A49 $9A39: -D0-I-  .byte $79 ; <indirect ref>
  0x031A4A $9A3A: -D0-I-  .byte $79 ; <indirect ref>
  0x031A4B $9A3B: -D0-I-  .byte $FC ; <indirect ref>
  0x031A4C $9A3C: -D0-I-  .byte $F0 ; <indirect ref>
  0x031A4D $9A3D: -D0-I-  .byte $01 ; <indirect ref>
  0x031A4E $9A3E: -D0-I-  .byte $C0 ; <indirect ref>
  0x031A4F $9A3F: -D0-I-  .byte $00 ; <indirect ref>
  0x031A50 $9A40: -D0-I-  .byte $00 ; <indirect ref>
  0x031A51 $9A41: -D0-I-  .byte $00 ; <indirect ref>
  0x031A52 $9A42: -D0-I-  .byte $A2 ; <indirect ref>
  0x031A53 $9A43: -D0-I-  .byte $2F ; <indirect ref>
  0x031A54 $9A44: -D0-I-  .byte $79 ; <indirect ref>
  0x031A55 $9A45: -D0-I-  .byte $79 ; <indirect ref>
  0x031A56 $9A46: -D0-I-  .byte $FC ; <indirect ref>
  0x031A57 $9A47: -D0-I-  .byte $F0 ; <indirect ref>
  0x031A58 $9A48: -D0-I-  .byte $01 ; <indirect ref>
  0x031A59 $9A49: -D0-I-  .byte $72 ; <indirect ref>
  0x031A5A $9A4A: -D0-I-  .byte $EE ; <indirect ref>
  0x031A5B $9A4B: -D0-I-  .byte $FC ; <indirect ref>
  0x031A5C $9A4C: ------  .byte $01
  0x031A5D $9A4D: -D0-I-  .byte $0A ; <indirect ref>
  0x031A5E $9A4E: -D0-I-  .byte $2E ; <indirect ref>
  0x031A5F $9A4F: -D0-I-  .byte $A6 ; <indirect ref>
  0x031A60 $9A50: -D0-I-  .byte $32 ; <indirect ref>
  0x031A61 $9A51: -D0-I-  .byte $03 ; <indirect ref>
  0x031A62 $9A52: -D0-I-  .byte $19 ; <indirect ref>
  0x031A63 $9A53: -D0-I-  .byte $FC ; <indirect ref>
  0x031A64 $9A54: ------  .byte $01
  0x031A65 $9A55: -D0-I-  .byte $E1 ; <indirect ref>
  0x031A66 $9A56: -D0-I-  .byte $FC ; <indirect ref>
  0x031A67 $9A57: ------  .byte $01
  0x031A68 $9A58: -D0-I-  .byte $0B ; <indirect ref>
  0x031A69 $9A59: -D0-I-  .byte $08 ; <indirect ref>
  0x031A6A $9A5A: -D0-I-  .byte $2A ; <indirect ref>
  0x031A6B $9A5B: -D0-I-  .byte $12 ; <indirect ref>
  0x031A6C $9A5C: -D0-I-  .byte $AA ; <indirect ref>
  0x031A6D $9A5D: -D0-I-  .byte $7D ; <indirect ref>
  0x031A6E $9A5E: -D0-I-  .byte $79 ; <indirect ref>
  0x031A6F $9A5F: -D0-I-  .byte $79 ; <indirect ref>
  0x031A70 $9A60: -D0-I-  .byte $FC ; <indirect ref>
  0x031A71 $9A61: -D0-I-  .byte $F0 ; <indirect ref>
  0x031A72 $9A62: -D0-I-  .byte $01 ; <indirect ref>
  0x031A73 $9A63: -D0-I-  .byte $10 ; <indirect ref>
  0x031A74 $9A64: -D0-I-  .byte $E4 ; <indirect ref>
  0x031A75 $9A65: -D0-I-  .byte $FC ; <indirect ref>
  0x031A76 $9A66: ------  .byte $08
  0x031A77 $9A67: -D0-I-  .byte $CD ; <indirect ref>
  0x031A78 $9A68: -D0-I-  .byte $4D ; <indirect ref>
  0x031A79 $9A69: -D0-I-  .byte $47 ; <indirect ref>
  0x031A7A $9A6A: -D0-I-  .byte $70 ; <indirect ref>
  0x031A7B $9A6B: -D0-I-  .byte $6F ; <indirect ref>
  0x031A7C $9A6C: -D0-I-  .byte $51 ; <indirect ref>
  0x031A7D $9A6D: -D0-I-  .byte $79 ; <indirect ref>
  0x031A7E $9A6E: -D0-I-  .byte $FC ; <indirect ref>
  0x031A7F $9A6F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031A80 $9A70: -D0-I-  .byte $F2 ; <indirect ref>
  0x031A81 $9A71: -D0-I-  .byte $01 ; <indirect ref>
  0x031A82 $9A72: -D0-I-  .byte $10 ; <indirect ref>
  0x031A83 $9A73: -D0-I-  .byte $E4 ; <indirect ref>
  0x031A84 $9A74: -D0-I-  .byte $FC ; <indirect ref>
  0x031A85 $9A75: ------  .byte $01
  0x031A86 $9A76: -D0-I-  .byte $CD ; <indirect ref>
  0x031A87 $9A77: -D0-I-  .byte $4D ; <indirect ref>
  0x031A88 $9A78: -D0-I-  .byte $2D ; <indirect ref>
  0x031A89 $9A79: -D0-I-  .byte $00 ; <indirect ref>
  0x031A8A $9A7A: -D0-I-  .byte $AA ; <indirect ref>
  0x031A8B $9A7B: -D0-I-  .byte $0C ; <indirect ref>
  0x031A8C $9A7C: -D0-I-  .byte $10 ; <indirect ref>
  0x031A8D $9A7D: -D0-I-  .byte $79 ; <indirect ref>
  0x031A8E $9A7E: -D0-I-  .byte $FC ; <indirect ref>
  0x031A8F $9A7F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031A90 $9A80: -D0-I-  .byte $01 ; <indirect ref>
  0x031A91 $9A81: -D0-I-  .byte $22 ; <indirect ref>
  0x031A92 $9A82: -D0-I-  .byte $EB ; <indirect ref>
  0x031A93 $9A83: -D0-I-  .byte $FC ; <indirect ref>
  0x031A94 $9A84: ------  .byte $08
  0x031A95 $9A85: -D0-I-  .byte $6C ; <indirect ref>
  0x031A96 $9A86: -D0-I-  .byte $6E ; <indirect ref>
  0x031A97 $9A87: -D0-I-  .byte $3F ; <indirect ref>
  0x031A98 $9A88: -D0-I-  .byte $52 ; <indirect ref>
  0x031A99 $9A89: -D0-I-  .byte $7D ; <indirect ref>
  0x031A9A $9A8A: -D0-I-  .byte $FC ; <indirect ref>
  0x031A9B $9A8B: ------  .byte $01
  0x031A9C $9A8C: -D0-I-  .byte $00 ; <indirect ref>
  0x031A9D $9A8D: -D0-I-  .byte $00 ; <indirect ref>
  0x031A9E $9A8E: -D0-I-  .byte $68 ; <indirect ref>
  0x031A9F $9A8F: -D0-I-  .byte $50 ; <indirect ref>
  0x031AA0 $9A90: -D0-I-  .byte $7D ; <indirect ref>
  0x031AA1 $9A91: -D0-I-  .byte $6E ; <indirect ref>
  0x031AA2 $9A92: -D0-I-  .byte $79 ; <indirect ref>
  0x031AA3 $9A93: -D0-I-  .byte $79 ; <indirect ref>
  0x031AA4 $9A94: -D0-I-  .byte $FC ; <indirect ref>
  0x031AA5 $9A95: -D0-I-  .byte $F0 ; <indirect ref>
  0x031AA6 $9A96: -D0-I-  .byte $F2 ; <indirect ref>
  0x031AA7 $9A97: -D0-I-  .byte $01 ; <indirect ref>
  0x031AA8 $9A98: -D0-I-  .byte $20 ; <indirect ref>
  0x031AA9 $9A99: -D0-I-  .byte $4A ; <indirect ref>
  0x031AAA $9A9A: -D0-I-  .byte $42 ; <indirect ref>
  0x031AAB $9A9B: -D0-I-  .byte $6E ; <indirect ref>
  0x031AAC $9A9C: -D0-I-  .byte $54 ; <indirect ref>
  0x031AAD $9A9D: -D0-I-  .byte $4D ; <indirect ref>
  0x031AAE $9A9E: -D0-I-  .byte $16 ; <indirect ref>
  0x031AAF $9A9F: -D0-I-  .byte $26 ; <indirect ref>
  0x031AB0 $9AA0: -D0-I-  .byte $28 ; <indirect ref>
  0x031AB1 $9AA1: -D0-I-  .byte $FC ; <indirect ref>
  0x031AB2 $9AA2: ------  .byte $01
  0x031AB3 $9AA3: -D0-I-  .byte $0E ; <indirect ref>
  0x031AB4 $9AA4: -D0-I-  .byte $2E ; <indirect ref>
  0x031AB5 $9AA5: -D0-I-  .byte $0A ; <indirect ref>
  0x031AB6 $9AA6: -D0-I-  .byte $03 ; <indirect ref>
  0x031AB7 $9AA7: -D0-I-  .byte $1A ; <indirect ref>
  0x031AB8 $9AA8: -D0-I-  .byte $FC ; <indirect ref>
  0x031AB9 $9AA9: ------  .byte $01
  0x031ABA $9AAA: -D0-I-  .byte $E6 ; <indirect ref>
  0x031ABB $9AAB: -D0-I-  .byte $AD ; <indirect ref>
  0x031ABC $9AAC: -D0-I-  .byte $0D ; <indirect ref>
  0x031ABD $9AAD: -D0-I-  .byte $FC ; <indirect ref>
  0x031ABE $9AAE: -D0-I-  .byte $F0 ; <indirect ref>
  0x031ABF $9AAF: -D0-I-  .byte $01 ; <indirect ref>
  0x031AC0 $9AB0: -D0-I-  .byte $51 ; <indirect ref>
  0x031AC1 $9AB1: -D0-I-  .byte $F5 ; <indirect ref>
  0x031AC2 $9AB2: -D0-I-  .byte $1A ; <indirect ref>
  0x031AC3 $9AB3: -D0-I-  .byte $00 ; <indirect ref>
  0x031AC4 $9AB4: -D0-I-  .byte $67 ; <indirect ref>
  0x031AC5 $9AB5: -D0-I-  .byte $42 ; <indirect ref>
  0x031AC6 $9AB6: -D0-I-  .byte $6E ; <indirect ref>
  0x031AC7 $9AB7: -D0-I-  .byte $2D ; <indirect ref>
  0x031AC8 $9AB8: -D0-I-  .byte $FC ; <indirect ref>
  0x031AC9 $9AB9: ------  .byte $01
  0x031ACA $9ABA: -D0-I-  .byte $0A ; <indirect ref>
  0x031ACB $9ABB: -D0-I-  .byte $04 ; <indirect ref>
  0x031ACC $9ABC: -D0-I-  .byte $13 ; <indirect ref>
  0x031ACD $9ABD: -D0-I-  .byte $0C ; <indirect ref>
  0x031ACE $9ABE: -D0-I-  .byte $1F ; <indirect ref>
  0x031ACF $9ABF: -D0-I-  .byte $2F ; <indirect ref>
  0x031AD0 $9AC0: -D0-I-  .byte $10 ; <indirect ref>
  0x031AD1 $9AC1: -D0-I-  .byte $F7 ; <indirect ref>
  0x031AD2 $9AC2: -D0-I-  .byte $03 ; <indirect ref>
  0x031AD3 $9AC3: -D0-I-  .byte $79 ; <indirect ref>
  0x031AD4 $9AC4: -D0-I-  .byte $FC ; <indirect ref>
  0x031AD5 $9AC5: -D0-I-  .byte $F0 ; <indirect ref>
  0x031AD6 $9AC6: -D0-I-  .byte $01 ; <indirect ref>
  0x031AD7 $9AC7: -D0-I-  .byte $51 ; <indirect ref>
  0x031AD8 $9AC8: -D0-I-  .byte $E6 ; <indirect ref>
  0x031AD9 $9AC9: -D0-I-  .byte $19 ; <indirect ref>
  0x031ADA $9ACA: -D0-I-  .byte $FC ; <indirect ref>
  0x031ADB $9ACB: ------  .byte $01
  0x031ADC $9ACC: -D0-I-  .byte $4A ; <indirect ref>
  0x031ADD $9ACD: -D0-I-  .byte $7D ; <indirect ref>
  0x031ADE $9ACE: -D0-I-  .byte $55 ; <indirect ref>
  0x031ADF $9ACF: -D0-I-  .byte $7D ; <indirect ref>
  0x031AE0 $9AD0: -D0-I-  .byte $47 ; <indirect ref>
  0x031AE1 $9AD1: -D0-I-  .byte $6F ; <indirect ref>
  0x031AE2 $9AD2: -D0-I-  .byte $48 ; <indirect ref>
  0x031AE3 $9AD3: -D0-I-  .byte $AA ; <indirect ref>
  0x031AE4 $9AD4: -D0-I-  .byte $F7 ; <indirect ref>
  0x031AE5 $9AD5: -D0-I-  .byte $03 ; <indirect ref>
  0x031AE6 $9AD6: -D0-I-  .byte $79 ; <indirect ref>
  0x031AE7 $9AD7: -D0-I-  .byte $FC ; <indirect ref>
  0x031AE8 $9AD8: -D0-I-  .byte $F0 ; <indirect ref>
  0x031AE9 $9AD9: -D0-I-  .byte $01 ; <indirect ref>
  0x031AEA $9ADA: -D0-I-  .byte $51 ; <indirect ref>
  0x031AEB $9ADB: -D0-I-  .byte $E6 ; <indirect ref>
  0x031AEC $9ADC: -D0-I-  .byte $19 ; <indirect ref>
  0x031AED $9ADD: -D0-I-  .byte $FC ; <indirect ref>
  0x031AEE $9ADE: ------  .byte $01
  0x031AEF $9ADF: -D0-I-  .byte $F6 ; <indirect ref>
  0x031AF0 $9AE0: -D0-I-  .byte $47 ; <indirect ref>
  0x031AF1 $9AE1: -D0-I-  .byte $6F ; <indirect ref>
  0x031AF2 $9AE2: -D0-I-  .byte $48 ; <indirect ref>
  0x031AF3 $9AE3: -D0-I-  .byte $AA ; <indirect ref>
  0x031AF4 $9AE4: -D0-I-  .byte $F7 ; <indirect ref>
  0x031AF5 $9AE5: -D0-I-  .byte $03 ; <indirect ref>
  0x031AF6 $9AE6: -D0-I-  .byte $79 ; <indirect ref>
  0x031AF7 $9AE7: -D0-I-  .byte $FC ; <indirect ref>
  0x031AF8 $9AE8: -D0-I-  .byte $F0 ; <indirect ref>
  0x031AF9 $9AE9: -D0-I-  .byte $01 ; <indirect ref>
  0x031AFA $9AEA: -D0-I-  .byte $51 ; <indirect ref>
  0x031AFB $9AEB: -D0-I-  .byte $E6 ; <indirect ref>
  0x031AFC $9AEC: -D0-I-  .byte $19 ; <indirect ref>
  0x031AFD $9AED: -D0-I-  .byte $FC ; <indirect ref>
  0x031AFE $9AEE: ------  .byte $01
  0x031AFF $9AEF: -D0-I-  .byte $4D ; <indirect ref>
  0x031B00 $9AF0: -D0-I-  .byte $6B ; <indirect ref>
  0x031B01 $9AF1: -D0-I-  .byte $7D ; <indirect ref>
  0x031B02 $9AF2: -D0-I-  .byte $42 ; <indirect ref>
  0x031B03 $9AF3: -D0-I-  .byte $6E ; <indirect ref>
  0x031B04 $9AF4: -D0-I-  .byte $AA ; <indirect ref>
  0x031B05 $9AF5: -D0-I-  .byte $F7 ; <indirect ref>
  0x031B06 $9AF6: -D0-I-  .byte $03 ; <indirect ref>
  0x031B07 $9AF7: -D0-I-  .byte $79 ; <indirect ref>
  0x031B08 $9AF8: -D0-I-  .byte $FC ; <indirect ref>
  0x031B09 $9AF9: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B0A $9AFA: -D0-I-  .byte $01 ; <indirect ref>
  0x031B0B $9AFB: -D0-I-  .byte $10 ; <indirect ref>
  0x031B0C $9AFC: -D0-I-  .byte $E4 ; <indirect ref>
  0x031B0D $9AFD: -D0-I-  .byte $19 ; <indirect ref>
  0x031B0E $9AFE: -D0-I-  .byte $FC ; <indirect ref>
  0x031B0F $9AFF: ------  .byte $01
  0x031B10 $9B00: -D0-I-  .byte $F6 ; <indirect ref>
  0x031B11 $9B01: -D0-I-  .byte $47 ; <indirect ref>
  0x031B12 $9B02: -D0-I-  .byte $6F ; <indirect ref>
  0x031B13 $9B03: -D0-I-  .byte $48 ; <indirect ref>
  0x031B14 $9B04: -D0-I-  .byte $79 ; <indirect ref>
  0x031B15 $9B05: -D0-I-  .byte $FC ; <indirect ref>
  0x031B16 $9B06: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B17 $9B07: -D0-I-  .byte $01 ; <indirect ref>
  0x031B18 $9B08: -D0-I-  .byte $00 ; <indirect ref>
  0x031B19 $9B09: -D0-I-  .byte $AA ; <indirect ref>
  0x031B1A $9B0A: -D0-I-  .byte $A0 ; <indirect ref>
  0x031B1B $9B0B: -D0-I-  .byte $00 ; <indirect ref>
  0x031B1C $9B0C: -D0-I-  .byte $F5 ; <indirect ref>
  0x031B1D $9B0D: -D0-I-  .byte $1A ; <indirect ref>
  0x031B1E $9B0E: -D0-I-  .byte $00 ; <indirect ref>
  0x031B1F $9B0F: -D0-I-  .byte $14 ; <indirect ref>
  0x031B20 $9B10: -D0-I-  .byte $AE ; <indirect ref>
  0x031B21 $9B11: -D0-I-  .byte $06 ; <indirect ref>
  0x031B22 $9B12: -D0-I-  .byte $15 ; <indirect ref>
  0x031B23 $9B13: -D0-I-  .byte $02 ; <indirect ref>
  0x031B24 $9B14: -D0-I-  .byte $79 ; <indirect ref>
  0x031B25 $9B15: -D0-I-  .byte $FC ; <indirect ref>
  0x031B26 $9B16: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B27 $9B17: -D0-I-  .byte $F2 ; <indirect ref>
  0x031B28 $9B18: -D0-I-  .byte $01 ; <indirect ref>
  0x031B29 $9B19: -D0-I-  .byte $10 ; <indirect ref>
  0x031B2A $9B1A: -D0-I-  .byte $E6 ; <indirect ref>
  0x031B2B $9B1B: -D0-I-  .byte $19 ; <indirect ref>
  0x031B2C $9B1C: -D0-I-  .byte $FC ; <indirect ref>
  0x031B2D $9B1D: ------  .byte $01
  0x031B2E $9B1E: -D0-I-  .byte $4D ; <indirect ref>
  0x031B2F $9B1F: -D0-I-  .byte $6B ; <indirect ref>
  0x031B30 $9B20: -D0-I-  .byte $7D ; <indirect ref>
  0x031B31 $9B21: -D0-I-  .byte $42 ; <indirect ref>
  0x031B32 $9B22: -D0-I-  .byte $6E ; <indirect ref>
  0x031B33 $9B23: -D0-I-  .byte $79 ; <indirect ref>
  0x031B34 $9B24: -D0-I-  .byte $FC ; <indirect ref>
  0x031B35 $9B25: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B36 $9B26: -D0-I-  .byte $01 ; <indirect ref>
  0x031B37 $9B27: -D0-I-  .byte $62 ; <indirect ref>
  0x031B38 $9B28: -D0-I-  .byte $E4 ; <indirect ref>
  0x031B39 $9B29: -D0-I-  .byte $FC ; <indirect ref>
  0x031B3A $9B2A: ------  .byte $01
  0x031B3B $9B2B: -D0-I-  .byte $BE ; <indirect ref>
  0x031B3C $9B2C: -D0-I-  .byte $42 ; <indirect ref>
  0x031B3D $9B2D: -D0-I-  .byte $6A ; <indirect ref>
  0x031B3E $9B2E: -D0-I-  .byte $48 ; <indirect ref>
  0x031B3F $9B2F: -D0-I-  .byte $54 ; <indirect ref>
  0x031B40 $9B30: -D0-I-  .byte $16 ; <indirect ref>
  0x031B41 $9B31: -D0-I-  .byte $FC ; <indirect ref>
  0x031B42 $9B32: ------  .byte $01
  0x031B43 $9B33: -D0-I-  .byte $E2 ; <indirect ref>
  0x031B44 $9B34: -D0-I-  .byte $FC ; <indirect ref>
  0x031B45 $9B35: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B46 $9B36: -D0-I-  .byte $01 ; <indirect ref>
  0x031B47 $9B37: -D0-I-  .byte $20 ; <indirect ref>
  0x031B48 $9B38: -D0-I-  .byte $E4 ; <indirect ref>
  0x031B49 $9B39: -D0-I-  .byte $FC ; <indirect ref>
  0x031B4A $9B3A: ------  .byte $01
  0x031B4B $9B3B: -D0-I-  .byte $4A ; <indirect ref>
  0x031B4C $9B3C: -D0-I-  .byte $7D ; <indirect ref>
  0x031B4D $9B3D: -D0-I-  .byte $55 ; <indirect ref>
  0x031B4E $9B3E: -D0-I-  .byte $7D ; <indirect ref>
  0x031B4F $9B3F: -D0-I-  .byte $06 ; <indirect ref>
  0x031B50 $9B40: -D0-I-  .byte $27 ; <indirect ref>
  0x031B51 $9B41: -D0-I-  .byte $19 ; <indirect ref>
  0x031B52 $9B42: -D0-I-  .byte $FC ; <indirect ref>
  0x031B53 $9B43: ------  .byte $01
  0x031B54 $9B44: -D0-I-  .byte $E2 ; <indirect ref>
  0x031B55 $9B45: -D0-I-  .byte $FC ; <indirect ref>
  0x031B56 $9B46: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B57 $9B47: -D0-I-  .byte $F2 ; <indirect ref>
  0x031B58 $9B48: -D0-I-  .byte $01 ; <indirect ref>
  0x031B59 $9B49: -D0-I-  .byte $20 ; <indirect ref>
  0x031B5A $9B4A: -D0-I-  .byte $E6 ; <indirect ref>
  0x031B5B $9B4B: -D0-I-  .byte $16 ; <indirect ref>
  0x031B5C $9B4C: -D0-I-  .byte $FC ; <indirect ref>
  0x031B5D $9B4D: ------  .byte $01
  0x031B5E $9B4E: -D0-I-  .byte $5C ; <indirect ref>
  0x031B5F $9B4F: -D0-I-  .byte $68 ; <indirect ref>
  0x031B60 $9B50: -D0-I-  .byte $7D ; <indirect ref>
  0x031B61 $9B51: -D0-I-  .byte $47 ; <indirect ref>
  0x031B62 $9B52: -D0-I-  .byte $6F ; <indirect ref>
  0x031B63 $9B53: -D0-I-  .byte $48 ; <indirect ref>
  0x031B64 $9B54: -D0-I-  .byte $A0 ; <indirect ref>
  0x031B65 $9B55: -D0-I-  .byte $FC ; <indirect ref>
  0x031B66 $9B56: ------  .byte $01
  0x031B67 $9B57: -D0-I-  .byte $01 ; <indirect ref>
  0x031B68 $9B58: -D0-I-  .byte $10 ; <indirect ref>
  0x031B69 $9B59: -D0-I-  .byte $04 ; <indirect ref>
  0x031B6A $9B5A: -D0-I-  .byte $27 ; <indirect ref>
  0x031B6B $9B5B: -D0-I-  .byte $2A ; <indirect ref>
  0x031B6C $9B5C: -D0-I-  .byte $1F ; <indirect ref>
  0x031B6D $9B5D: -D0-I-  .byte $0D ; <indirect ref>
  0x031B6E $9B5E: -D0-I-  .byte $FC ; <indirect ref>
  0x031B6F $9B5F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B70 $9B60: -D0-I-  .byte $01 ; <indirect ref>
  0x031B71 $9B61: -D0-I-  .byte $20 ; <indirect ref>
  0x031B72 $9B62: -D0-I-  .byte $E6 ; <indirect ref>
  0x031B73 $9B63: -D0-I-  .byte $16 ; <indirect ref>
  0x031B74 $9B64: -D0-I-  .byte $FC ; <indirect ref>
  0x031B75 $9B65: ------  .byte $01
  0x031B76 $9B66: -D0-I-  .byte $D0 ; <indirect ref>
  0x031B77 $9B67: -D0-I-  .byte $55 ; <indirect ref>
  0x031B78 $9B68: -D0-I-  .byte $69 ; <indirect ref>
  0x031B79 $9B69: -D0-I-  .byte $53 ; <indirect ref>
  0x031B7A $9B6A: -D0-I-  .byte $74 ; <indirect ref>
  0x031B7B $9B6B: -D0-I-  .byte $47 ; <indirect ref>
  0x031B7C $9B6C: -D0-I-  .byte $6F ; <indirect ref>
  0x031B7D $9B6D: -D0-I-  .byte $48 ; <indirect ref>
  0x031B7E $9B6E: -D0-I-  .byte $A0 ; <indirect ref>
  0x031B7F $9B6F: -D0-I-  .byte $FC ; <indirect ref>
  0x031B80 $9B70: ------  .byte $01
  0x031B81 $9B71: -D0-I-  .byte $01 ; <indirect ref>
  0x031B82 $9B72: -D0-I-  .byte $10 ; <indirect ref>
  0x031B83 $9B73: -D0-I-  .byte $04 ; <indirect ref>
  0x031B84 $9B74: -D0-I-  .byte $27 ; <indirect ref>
  0x031B85 $9B75: -D0-I-  .byte $2A ; <indirect ref>
  0x031B86 $9B76: -D0-I-  .byte $1F ; <indirect ref>
  0x031B87 $9B77: -D0-I-  .byte $0D ; <indirect ref>
  0x031B88 $9B78: -D0-I-  .byte $FC ; <indirect ref>
  0x031B89 $9B79: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B8A $9B7A: -D0-I-  .byte $01 ; <indirect ref>
  0x031B8B $9B7B: -D0-I-  .byte $10 ; <indirect ref>
  0x031B8C $9B7C: -D0-I-  .byte $47 ; <indirect ref>
  0x031B8D $9B7D: -D0-I-  .byte $6F ; <indirect ref>
  0x031B8E $9B7E: -D0-I-  .byte $46 ; <indirect ref>
  0x031B8F $9B7F: -D0-I-  .byte $7D ; <indirect ref>
  0x031B90 $9B80: -D0-I-  .byte $1A ; <indirect ref>
  0x031B91 $9B81: -D0-I-  .byte $FC ; <indirect ref>
  0x031B92 $9B82: ------  .byte $01
  0x031B93 $9B83: -D0-I-  .byte $E4 ; <indirect ref>
  0x031B94 $9B84: -D0-I-  .byte $AA ; <indirect ref>
  0x031B95 $9B85: -D0-I-  .byte $79 ; <indirect ref>
  0x031B96 $9B86: -D0-I-  .byte $FC ; <indirect ref>
  0x031B97 $9B87: -D0-I-  .byte $F0 ; <indirect ref>
  0x031B98 $9B88: ------  .byte $01
  0x031B99 $9B89: ------  .byte $52
  0x031B9A $9B8A: ------  .byte $E4
  0x031B9B $9B8B: ------  .byte $19
  0x031B9C $9B8C: ------  .byte $FC
  0x031B9D $9B8D: ------  .byte $01
  0x031B9E $9B8E: ------  .byte $E0
  0x031B9F $9B8F: ------  .byte $79
  0x031BA0 $9B90: ------  .byte $FC
  0x031BA1 $9B91: ------  .byte $F0
  0x031BA2 $9B92: -D0-I-  .byte $F4 ; <indirect ref>
  0x031BA3 $9B93: -D0-I-  .byte $06 ; <indirect ref>
  0x031BA4 $9B94: -D0-I-  .byte $9C ; <indirect ref>
  0x031BA5 $9B95: -D0-I-  .byte $9B ; <indirect ref>
  0x031BA6 $9B96: -D0-I-  .byte $9C ; <indirect ref>
  0x031BA7 $9B97: -D0-I-  .byte $9B ; <indirect ref>
  0x031BA8 $9B98: -D0-I-  .byte $AF ; <indirect ref>
  0x031BA9 $9B99: -D0-I-  .byte $9B ; <indirect ref>
  0x031BAA $9B9A: -D0-I-  .byte $AF ; <indirect ref>
  0x031BAB $9B9B: -D0-I-  .byte $9B ; <indirect ref>
  0x031BAC $9B9C: -D0-I-  .byte $F2 ; <indirect ref>
  0x031BAD $9B9D: -D0-I-  .byte $01 ; <indirect ref>
  0x031BAE $9B9E: -D0-I-  .byte $20 ; <indirect ref>
  0x031BAF $9B9F: -D0-I-  .byte $E6 ; <indirect ref>
  0x031BB0 $9BA0: -D0-I-  .byte $19 ; <indirect ref>
  0x031BB1 $9BA1: -D0-I-  .byte $FC ; <indirect ref>
  0x031BB2 $9BA2: ------  .byte $01
  0x031BB3 $9BA3: -D0-I-  .byte $F0 ; <indirect ref>
  0x031BB4 $9BA4: -D0-I-  .byte $AF ; <indirect ref>
  0x031BB5 $9BA5: -D0-I-  .byte $2E ; <indirect ref>
  0x031BB6 $9BA6: -D0-I-  .byte $13 ; <indirect ref>
  0x031BB7 $9BA7: -D0-I-  .byte $1A ; <indirect ref>
  0x031BB8 $9BA8: -D0-I-  .byte $FC ; <indirect ref>
  0x031BB9 $9BA9: ------  .byte $01
  0x031BBA $9BAA: -D0-I-  .byte $E4 ; <indirect ref>
  0x031BBB $9BAB: -D0-I-  .byte $AD ; <indirect ref>
  0x031BBC $9BAC: -D0-I-  .byte $0D ; <indirect ref>
  0x031BBD $9BAD: -D0-I-  .byte $FC ; <indirect ref>
  0x031BBE $9BAE: -D0-I-  .byte $F0 ; <indirect ref>
  0x031BBF $9BAF: -D0-I-  .byte $F2 ; <indirect ref>
  0x031BC0 $9BB0: -D0-I-  .byte $01 ; <indirect ref>
  0x031BC1 $9BB1: -D0-I-  .byte $20 ; <indirect ref>
  0x031BC2 $9BB2: -D0-I-  .byte $E6 ; <indirect ref>
  0x031BC3 $9BB3: -D0-I-  .byte $19 ; <indirect ref>
  0x031BC4 $9BB4: -D0-I-  .byte $FC ; <indirect ref>
  0x031BC5 $9BB5: ------  .byte $01
  0x031BC6 $9BB6: -D0-I-  .byte $E4 ; <indirect ref>
  0x031BC7 $9BB7: -D0-I-  .byte $19 ; <indirect ref>
  0x031BC8 $9BB8: -D0-I-  .byte $00 ; <indirect ref>
  0x031BC9 $9BB9: -D0-I-  .byte $8D ; <indirect ref>
  0x031BCA $9BBA: -D0-I-  .byte $8B ; <indirect ref>
  0x031BCB $9BBB: -D0-I-  .byte $AD ; <indirect ref>
  0x031BCC $9BBC: -D0-I-  .byte $0D ; <indirect ref>
  0x031BCD $9BBD: -D0-I-  .byte $FC ; <indirect ref>
  0x031BCE $9BBE: ------  .byte $01
  0x031BCF $9BBF: -D0-I-  .byte $FC ; <indirect ref>
  0x031BD0 $9BC0: -D0-I-  .byte $F0 ; <indirect ref>
  0x031BD1 $9BC1: -D0-I-  .byte $01 ; <indirect ref>
  0x031BD2 $9BC2: -D0-I-  .byte $C0 ; <indirect ref>
  0x031BD3 $9BC3: -D0-I-  .byte $03 ; <indirect ref>
  0x031BD4 $9BC4: -D0-I-  .byte $76 ; <indirect ref>
  0x031BD5 $9BC5: -D0-I-  .byte $76 ; <indirect ref>
  0x031BD6 $9BC6: -D0-I-  .byte $F7 ; <indirect ref>
  0x031BD7 $9BC7: -D0-I-  .byte $06 ; <indirect ref>
  0x031BD8 $9BC8: -D0-I-  .byte $6F ; <indirect ref>
  0x031BD9 $9BC9: -D0-I-  .byte $79 ; <indirect ref>
  0x031BDA $9BCA: -D0-I-  .byte $79 ; <indirect ref>
  0x031BDB $9BCB: -D0-I-  .byte $FC ; <indirect ref>
  0x031BDC $9BCC: -D0-I-  .byte $F0 ; <indirect ref>
  0x031BDD $9BCD: -D0-I-  .byte $01 ; <indirect ref>
  0x031BDE $9BCE: -D0-I-  .byte $C0 ; <indirect ref>
  0x031BDF $9BCF: -D0-I-  .byte $AA ; <indirect ref>
  0x031BE0 $9BD0: -D0-I-  .byte $F7 ; <indirect ref>
  0x031BE1 $9BD1: -D0-I-  .byte $08 ; <indirect ref>
  0x031BE2 $9BD2: -D0-I-  .byte $6F ; <indirect ref>
  0x031BE3 $9BD3: -D0-I-  .byte $79 ; <indirect ref>
  0x031BE4 $9BD4: -D0-I-  .byte $79 ; <indirect ref>
  0x031BE5 $9BD5: -D0-I-  .byte $FC ; <indirect ref>
  0x031BE6 $9BD6: -D0-I-  .byte $F0 ; <indirect ref>
  0x031BE7 $9BD7: -D0-I-  .byte $01 ; <indirect ref>
  0x031BE8 $9BD8: -D0-I-  .byte $C0 ; <indirect ref>
  0x031BE9 $9BD9: -D0-I-  .byte $5C ; <indirect ref>
  0x031BEA $9BDA: -D0-I-  .byte $73 ; <indirect ref>
  0x031BEB $9BDB: -D0-I-  .byte $42 ; <indirect ref>
  0x031BEC $9BDC: -D0-I-  .byte $64 ; <indirect ref>
  0x031BED $9BDD: -D0-I-  .byte $F7 ; <indirect ref>
  0x031BEE $9BDE: -D0-I-  .byte $06 ; <indirect ref>
  0x031BEF $9BDF: -D0-I-  .byte $79 ; <indirect ref>
  0x031BF0 $9BE0: -D0-I-  .byte $79 ; <indirect ref>
  0x031BF1 $9BE1: -D0-I-  .byte $FC ; <indirect ref>
  0x031BF2 $9BE2: -D0-I-  .byte $F0 ; <indirect ref>
  0x031BF3 $9BE3: -D0-I-  .byte $F2 ; <indirect ref>
  0x031BF4 $9BE4: -D0-I-  .byte $F4 ; <indirect ref>
  0x031BF5 $9BE5: -D0-I-  .byte $01 ; <indirect ref>
  0x031BF6 $9BE6: -D0-I-  .byte $EA ; <indirect ref>
  0x031BF7 $9BE7: -D0-I-  .byte $9B ; <indirect ref>
  0x031BF8 $9BE8: -D0-I-  .byte $F4 ; <indirect ref>
  0x031BF9 $9BE9: -D0-I-  .byte $9B ; <indirect ref>
  0x031BFA $9BEA: -D0-I-  .byte $F4 ; <indirect ref>
  0x031BFB $9BEB: -D0-I-  .byte $02 ; <indirect ref>
  0x031BFC $9BEC: -D0-I-  .byte $FE ; <indirect ref>
  0x031BFD $9BED: -D0-I-  .byte $9B ; <indirect ref>
  0x031BFE $9BEE: -D0-I-  .byte $09 ; <indirect ref>
  0x031BFF $9BEF: -D0-I-  .byte $9C ; <indirect ref>
  0x031C00 $9BF0: -D0-I-  .byte $1C ; <indirect ref>
  0x031C01 $9BF1: -D0-I-  .byte $9C ; <indirect ref>
  0x031C02 $9BF2: ------  .byte $08
  0x031C03 $9BF3: ------  .byte $9C
  0x031C04 $9BF4: -D0-I-  .byte $F4 ; <indirect ref>
  0x031C05 $9BF5: -D0-I-  .byte $02 ; <indirect ref>
  0x031C06 $9BF6: -D0-I-  .byte $37 ; <indirect ref>
  0x031C07 $9BF7: -D0-I-  .byte $9C ; <indirect ref>
  0x031C08 $9BF8: -D0-I-  .byte $46 ; <indirect ref>
  0x031C09 $9BF9: -D0-I-  .byte $9C ; <indirect ref>
  0x031C0A $9BFA: -D0-I-  .byte $59 ; <indirect ref>
  0x031C0B $9BFB: -D0-I-  .byte $9C ; <indirect ref>
  0x031C0C $9BFC: ------  .byte $08
  0x031C0D $9BFD: ------  .byte $9C
  0x031C0E $9BFE: -D0-I-  .byte $01 ; <indirect ref>
  0x031C0F $9BFF: -D0-I-  .byte $52 ; <indirect ref>
  0x031C10 $9C00: -D0-I-  .byte $E8 ; <indirect ref>
  0x031C11 $9C01: -D0-I-  .byte $A0 ; <indirect ref>
  0x031C12 $9C02: -D0-I-  .byte $FC ; <indirect ref>
  0x031C13 $9C03: ------  .byte $01
  0x031C14 $9C04: -D0-I-  .byte $07 ; <indirect ref>
  0x031C15 $9C05: -D0-I-  .byte $10 ; <indirect ref>
  0x031C16 $9C06: -D0-I-  .byte $79 ; <indirect ref>
  0x031C17 $9C07: -D0-I-  .byte $FC ; <indirect ref>
  0x031C18 $9C08: -D0-I-  .byte $F0 ; <indirect ref>
  0x031C19 $9C09: -D0-I-  .byte $01 ; <indirect ref>
  0x031C1A $9C0A: -D0-I-  .byte $62 ; <indirect ref>
  0x031C1B $9C0B: -D0-I-  .byte $E8 ; <indirect ref>
  0x031C1C $9C0C: -D0-I-  .byte $FC ; <indirect ref>
  0x031C1D $9C0D: ------  .byte $01
  0x031C1E $9C0E: -D0-I-  .byte $E9 ; <indirect ref>
  0x031C1F $9C0F: -D0-I-  .byte $16 ; <indirect ref>
  0x031C20 $9C10: -D0-I-  .byte $FC ; <indirect ref>
  0x031C21 $9C11: ------  .byte $01
  0x031C22 $9C12: -D0-I-  .byte $14 ; <indirect ref>
  0x031C23 $9C13: -D0-I-  .byte $28 ; <indirect ref>
  0x031C24 $9C14: -D0-I-  .byte $06 ; <indirect ref>
  0x031C25 $9C15: -D0-I-  .byte $0A ; <indirect ref>
  0x031C26 $9C16: -D0-I-  .byte $1F ; <indirect ref>
  0x031C27 $9C17: -D0-I-  .byte $2A ; <indirect ref>
  0x031C28 $9C18: -D0-I-  .byte $10 ; <indirect ref>
  0x031C29 $9C19: -D0-I-  .byte $79 ; <indirect ref>
  0x031C2A $9C1A: -D0-I-  .byte $FC ; <indirect ref>
  0x031C2B $9C1B: -D0-I-  .byte $F0 ; <indirect ref>
  0x031C2C $9C1C: -D0-I-  .byte $01 ; <indirect ref>
  0x031C2D $9C1D: -D0-I-  .byte $72 ; <indirect ref>
  0x031C2E $9C1E: -D0-I-  .byte $E8 ; <indirect ref>
  0x031C2F $9C1F: -D0-I-  .byte $FC ; <indirect ref>
  0x031C30 $9C20: ------  .byte $01
  0x031C31 $9C21: -D0-I-  .byte $E9 ; <indirect ref>
  0x031C32 $9C22: -D0-I-  .byte $FC ; <indirect ref>
  0x031C33 $9C23: ------  .byte $01
  0x031C34 $9C24: -D0-I-  .byte $EA ; <indirect ref>
  0x031C35 $9C25: -D0-I-  .byte $10 ; <indirect ref>
  0x031C36 $9C26: -D0-I-  .byte $11 ; <indirect ref>
  0x031C37 $9C27: -D0-I-  .byte $FC ; <indirect ref>
  0x031C38 $9C28: ------  .byte $01
  0x031C39 $9C29: -D0-I-  .byte $E7 ; <indirect ref>
  0x031C3A $9C2A: -D0-I-  .byte $16 ; <indirect ref>
  0x031C3B $9C2B: -D0-I-  .byte $2E ; <indirect ref>
  0x031C3C $9C2C: -D0-I-  .byte $16 ; <indirect ref>
  0x031C3D $9C2D: -D0-I-  .byte $00 ; <indirect ref>
  0x031C3E $9C2E: -D0-I-  .byte $06 ; <indirect ref>
  0x031C3F $9C2F: -D0-I-  .byte $0A ; <indirect ref>
  0x031C40 $9C30: -D0-I-  .byte $1F ; <indirect ref>
  0x031C41 $9C31: -D0-I-  .byte $2A ; <indirect ref>
  0x031C42 $9C32: -D0-I-  .byte $10 ; <indirect ref>
  0x031C43 $9C33: -D0-I-  .byte $7D ; <indirect ref>
  0x031C44 $9C34: -D0-I-  .byte $79 ; <indirect ref>
  0x031C45 $9C35: -D0-I-  .byte $FC ; <indirect ref>
  0x031C46 $9C36: -D0-I-  .byte $F0 ; <indirect ref>
  0x031C47 $9C37: -D0-I-  .byte $01 ; <indirect ref>
  0x031C48 $9C38: -D0-I-  .byte $52 ; <indirect ref>
  0x031C49 $9C39: -D0-I-  .byte $E4 ; <indirect ref>
  0x031C4A $9C3A: -D0-I-  .byte $16 ; <indirect ref>
  0x031C4B $9C3B: -D0-I-  .byte $FC ; <indirect ref>
  0x031C4C $9C3C: ------  .byte $01
  0x031C4D $9C3D: -D0-I-  .byte $E8 ; <indirect ref>
  0x031C4E $9C3E: -D0-I-  .byte $A0 ; <indirect ref>
  0x031C4F $9C3F: -D0-I-  .byte $00 ; <indirect ref>
  0x031C50 $9C40: -D0-I-  .byte $12 ; <indirect ref>
  0x031C51 $9C41: -D0-I-  .byte $02 ; <indirect ref>
  0x031C52 $9C42: -D0-I-  .byte $10 ; <indirect ref>
  0x031C53 $9C43: -D0-I-  .byte $79 ; <indirect ref>
  0x031C54 $9C44: -D0-I-  .byte $FC ; <indirect ref>
  0x031C55 $9C45: -D0-I-  .byte $F0 ; <indirect ref>
  0x031C56 $9C46: -D0-I-  .byte $01 ; <indirect ref>
  0x031C57 $9C47: -D0-I-  .byte $62 ; <indirect ref>
  0x031C58 $9C48: -D0-I-  .byte $E4 ; <indirect ref>
  0x031C59 $9C49: -D0-I-  .byte $16 ; <indirect ref>
  0x031C5A $9C4A: -D0-I-  .byte $FC ; <indirect ref>
  0x031C5B $9C4B: ------  .byte $01
  0x031C5C $9C4C: -D0-I-  .byte $E8 ; <indirect ref>
  0x031C5D $9C4D: -D0-I-  .byte $14 ; <indirect ref>
  0x031C5E $9C4E: -D0-I-  .byte $FC ; <indirect ref>
  0x031C5F $9C4F: ------  .byte $01
  0x031C60 $9C50: -D0-I-  .byte $E9 ; <indirect ref>
  0x031C61 $9C51: -D0-I-  .byte $A0 ; <indirect ref>
  0x031C62 $9C52: -D0-I-  .byte $00 ; <indirect ref>
  0x031C63 $9C53: -D0-I-  .byte $12 ; <indirect ref>
  0x031C64 $9C54: -D0-I-  .byte $02 ; <indirect ref>
  0x031C65 $9C55: -D0-I-  .byte $10 ; <indirect ref>
  0x031C66 $9C56: -D0-I-  .byte $79 ; <indirect ref>
  0x031C67 $9C57: -D0-I-  .byte $FC ; <indirect ref>
  0x031C68 $9C58: -D0-I-  .byte $F0 ; <indirect ref>
  0x031C69 $9C59: -D0-I-  .byte $01 ; <indirect ref>
  0x031C6A $9C5A: -D0-I-  .byte $62 ; <indirect ref>
  0x031C6B $9C5B: -D0-I-  .byte $E4 ; <indirect ref>
  0x031C6C $9C5C: -D0-I-  .byte $2D ; <indirect ref>
  0x031C6D $9C5D: -D0-I-  .byte $FC ; <indirect ref>
  0x031C6E $9C5E: ------  .byte $01
  0x031C6F $9C5F: -D0-I-  .byte $E8 ; <indirect ref>
  0x031C70 $9C60: -D0-I-  .byte $10 ; <indirect ref>
  0x031C71 $9C61: -D0-I-  .byte $11 ; <indirect ref>
  0x031C72 $9C62: -D0-I-  .byte $FC ; <indirect ref>
  0x031C73 $9C63: ------  .byte $01
  0x031C74 $9C64: -D0-I-  .byte $E7 ; <indirect ref>
  0x031C75 $9C65: -D0-I-  .byte $16 ; <indirect ref>
  0x031C76 $9C66: -D0-I-  .byte $2E ; <indirect ref>
  0x031C77 $9C67: -D0-I-  .byte $A0 ; <indirect ref>
  0x031C78 $9C68: -D0-I-  .byte $00 ; <indirect ref>
  0x031C79 $9C69: -D0-I-  .byte $06 ; <indirect ref>
  0x031C7A $9C6A: -D0-I-  .byte $0A ; <indirect ref>
  0x031C7B $9C6B: -D0-I-  .byte $2E ; <indirect ref>
  0x031C7C $9C6C: -D0-I-  .byte $AA ; <indirect ref>
  0x031C7D $9C6D: -D0-I-  .byte $7D ; <indirect ref>
  0x031C7E $9C6E: -D0-I-  .byte $79 ; <indirect ref>
  0x031C7F $9C6F: -D0-I-  .byte $FC ; <indirect ref>
  0x031C80 $9C70: -D0-I-  .byte $F0 ; <indirect ref>
  0x031C81 $9C71: -D0-I-  .byte $01 ; <indirect ref>
  0x031C82 $9C72: -D0-I-  .byte $62 ; <indirect ref>
  0x031C83 $9C73: -D0-I-  .byte $0C ; <indirect ref>
  0x031C84 $9C74: -D0-I-  .byte $06 ; <indirect ref>
  0x031C85 $9C75: -D0-I-  .byte $0C ; <indirect ref>
  0x031C86 $9C76: -D0-I-  .byte $FC ; <indirect ref>
  0x031C87 $9C77: ------  .byte $01
  0x031C88 $9C78: -D0-I-  .byte $E4 ; <indirect ref>
  0x031C89 $9C79: -D0-I-  .byte $A0 ; <indirect ref>
  0x031C8A $9C7A: -D0-I-  .byte $FC ; <indirect ref>
  0x031C8B $9C7B: ------  .byte $08
  0x031C8C $9C7C: -D0-I-  .byte $46 ; <indirect ref>
  0x031C8D $9C7D: -D0-I-  .byte $6F ; <indirect ref>
  0x031C8E $9C7E: -D0-I-  .byte $54 ; <indirect ref>
  0x031C8F $9C7F: -D0-I-  .byte $79 ; <indirect ref>
  0x031C90 $9C80: -D0-I-  .byte $FC ; <indirect ref>
  0x031C91 $9C81: -D0-I-  .byte $F0 ; <indirect ref>
  0x031C92 $9C82: -D0-I-  .byte $F2 ; <indirect ref>
  0x031C93 $9C83: -D0-I-  .byte $01 ; <indirect ref>
  0x031C94 $9C84: -D0-I-  .byte $51 ; <indirect ref>
  0x031C95 $9C85: -D0-I-  .byte $E4 ; <indirect ref>
  0x031C96 $9C86: -D0-I-  .byte $16 ; <indirect ref>
  0x031C97 $9C87: -D0-I-  .byte $FC ; <indirect ref>
  0x031C98 $9C88: ------  .byte $01
  0x031C99 $9C89: -D0-I-  .byte $ED ; <indirect ref>
  0x031C9A $9C8A: -D0-I-  .byte $A0 ; <indirect ref>
  0x031C9B $9C8B: -D0-I-  .byte $00 ; <indirect ref>
  0x031C9C $9C8C: -D0-I-  .byte $21 ; <indirect ref>
  0x031C9D $9C8D: -D0-I-  .byte $06 ; <indirect ref>
  0x031C9E $9C8E: -D0-I-  .byte $03 ; <indirect ref>
  0x031C9F $9C8F: -D0-I-  .byte $79 ; <indirect ref>
  0x031CA0 $9C90: -D0-I-  .byte $FC ; <indirect ref>
  0x031CA1 $9C91: -D0-I-  .byte $F0 ; <indirect ref>
  0x031CA2 $9C92: -D0-I-  .byte $F2 ; <indirect ref>
  0x031CA3 $9C93: -D0-I-  .byte $01 ; <indirect ref>
  0x031CA4 $9C94: -D0-I-  .byte $52 ; <indirect ref>
  0x031CA5 $9C95: -D0-I-  .byte $05 ; <indirect ref>
  0x031CA6 $9C96: -D0-I-  .byte $F7 ; <indirect ref>
  0x031CA7 $9C97: -D0-I-  .byte $02 ; <indirect ref>
  0x031CA8 $9C98: -D0-I-  .byte $6F ; <indirect ref>
  0x031CA9 $9C99: -D0-I-  .byte $14 ; <indirect ref>
  0x031CAA $9C9A: -D0-I-  .byte $FC ; <indirect ref>
  0x031CAB $9C9B: ------  .byte $01
  0x031CAC $9C9C: -D0-I-  .byte $0A ; <indirect ref>
  0x031CAD $9C9D: -D0-I-  .byte $0A ; <indirect ref>
  0x031CAE $9C9E: -D0-I-  .byte $AD ; <indirect ref>
  0x031CAF $9C9F: -D0-I-  .byte $00 ; <indirect ref>
  0x031CB0 $9CA0: -D0-I-  .byte $5E ; <indirect ref>
  0x031CB1 $9CA1: -D0-I-  .byte $42 ; <indirect ref>
  0x031CB2 $9CA2: -D0-I-  .byte $6F ; <indirect ref>
  0x031CB3 $9CA3: -D0-I-  .byte $4D ; <indirect ref>
  0x031CB4 $9CA4: -D0-I-  .byte $69 ; <indirect ref>
  0x031CB5 $9CA5: -D0-I-  .byte $AA ; <indirect ref>
  0x031CB6 $9CA6: -D0-I-  .byte $7D ; <indirect ref>
  0x031CB7 $9CA7: -D0-I-  .byte $79 ; <indirect ref>
  0x031CB8 $9CA8: -D0-I-  .byte $FC ; <indirect ref>
  0x031CB9 $9CA9: -D0-I-  .byte $F0 ; <indirect ref>
  0x031CBA $9CAA: -D0-I-  .byte $F4 ; <indirect ref>
  0x031CBB $9CAB: -D0-I-  .byte $05 ; <indirect ref>
  0x031CBC $9CAC: -D0-I-  .byte $CC ; <indirect ref>
  0x031CBD $9CAD: -D0-I-  .byte $9C ; <indirect ref>
  0x031CBE $9CAE: -D0-I-  .byte $E6 ; <indirect ref>
  0x031CBF $9CAF: -D0-I-  .byte $9C ; <indirect ref>
  0x031CC0 $9CB0: -D0-I-  .byte $00 ; <indirect ref>
  0x031CC1 $9CB1: -D0-I-  .byte $9D ; <indirect ref>
  0x031CC2 $9CB2: -D0-I-  .byte $1F ; <indirect ref>
  0x031CC3 $9CB3: -D0-I-  .byte $9D ; <indirect ref>
  0x031CC4 $9CB4: -D0-I-  .byte $A1 ; <indirect ref>
  0x031CC5 $9CB5: -D0-I-  .byte $9D ; <indirect ref>
  0x031CC6 $9CB6: -D0-I-  .byte $C8 ; <indirect ref>
  0x031CC7 $9CB7: -D0-I-  .byte $9D ; <indirect ref>
  0x031CC8 $9CB8: -D0-I-  .byte $EE ; <indirect ref>
  0x031CC9 $9CB9: -D0-I-  .byte $9D ; <indirect ref>
  0x031CCA $9CBA: -D0-I-  .byte $20 ; <indirect ref>
  0x031CCB $9CBB: -D0-I-  .byte $9E ; <indirect ref>
  0x031CCC $9CBC: -D0-I-  .byte $51 ; <indirect ref>
  0x031CCD $9CBD: -D0-I-  .byte $9E ; <indirect ref>
  0x031CCE $9CBE: -D0-I-  .byte $50 ; <indirect ref>
  0x031CCF $9CBF: -D0-I-  .byte $9D ; <indirect ref>
  0x031CD0 $9CC0: -D0-I-  .byte $33 ; <indirect ref>
  0x031CD1 $9CC1: -D0-I-  .byte $9D ; <indirect ref>
  0x031CD2 $9CC2: -D0-I-  .byte $80 ; <indirect ref>
  0x031CD3 $9CC3: -D0-I-  .byte $9D ; <indirect ref>
  0x031CD4 $9CC4: -D0-I-  .byte $88 ; <indirect ref>
  0x031CD5 $9CC5: -D0-I-  .byte $9E ; <indirect ref>
  0x031CD6 $9CC6: ------  .byte $B6
  0x031CD7 $9CC7: ------  .byte $9E
  0x031CD8 $9CC8: -D0-I-  .byte $D1 ; <indirect ref>
  0x031CD9 $9CC9: -D0-I-  .byte $9E ; <indirect ref>
  0x031CDA $9CCA: ------  .byte $FD
  0x031CDB $9CCB: ------  .byte $9E
  0x031CDC $9CCC: -D0-I-  .byte $01 ; <indirect ref>
  0x031CDD $9CCD: -D0-I-  .byte $13 ; <indirect ref>
  0x031CDE $9CCE: -D0-I-  .byte $F1 ; <indirect ref>
  0x031CDF $9CCF: -D0-I-  .byte $19 ; <indirect ref>
  0x031CE0 $9CD0: -D0-I-  .byte $00 ; <indirect ref>
  0x031CE1 $9CD1: -D0-I-  .byte $68 ; <indirect ref>
  0x031CE2 $9CD2: -D0-I-  .byte $7D ; <indirect ref>
  0x031CE3 $9CD3: -D0-I-  .byte $C2 ; <indirect ref>
  0x031CE4 $9CD4: -D0-I-  .byte $AD ; <indirect ref>
  0x031CE5 $9CD5: -D0-I-  .byte $FC ; <indirect ref>
  0x031CE6 $9CD6: ------  .byte $01
  0x031CE7 $9CD7: -D0-I-  .byte $0A ; <indirect ref>
  0x031CE8 $9CD8: -D0-I-  .byte $03 ; <indirect ref>
  0x031CE9 $9CD9: -D0-I-  .byte $1A ; <indirect ref>
  0x031CEA $9CDA: -D0-I-  .byte $2E ; <indirect ref>
  0x031CEB $9CDB: -D0-I-  .byte $0E ; <indirect ref>
  0x031CEC $9CDC: -D0-I-  .byte $2E ; <indirect ref>
  0x031CED $9CDD: -D0-I-  .byte $2D ; <indirect ref>
  0x031CEE $9CDE: -D0-I-  .byte $00 ; <indirect ref>
  0x031CEF $9CDF: -D0-I-  .byte $21 ; <indirect ref>
  0x031CF0 $9CE0: -D0-I-  .byte $06 ; <indirect ref>
  0x031CF1 $9CE1: -D0-I-  .byte $04 ; <indirect ref>
  0x031CF2 $9CE2: -D0-I-  .byte $1F ; <indirect ref>
  0x031CF3 $9CE3: -D0-I-  .byte $0D ; <indirect ref>
  0x031CF4 $9CE4: -D0-I-  .byte $FC ; <indirect ref>
  0x031CF5 $9CE5: -D0-I-  .byte $F0 ; <indirect ref>
  0x031CF6 $9CE6: -D0-I-  .byte $01 ; <indirect ref>
  0x031CF7 $9CE7: -D0-I-  .byte $14 ; <indirect ref>
  0x031CF8 $9CE8: -D0-I-  .byte $F2 ; <indirect ref>
  0x031CF9 $9CE9: -D0-I-  .byte $19 ; <indirect ref>
  0x031CFA $9CEA: -D0-I-  .byte $00 ; <indirect ref>
  0x031CFB $9CEB: -D0-I-  .byte $68 ; <indirect ref>
  0x031CFC $9CEC: -D0-I-  .byte $7D ; <indirect ref>
  0x031CFD $9CED: -D0-I-  .byte $C2 ; <indirect ref>
  0x031CFE $9CEE: -D0-I-  .byte $AD ; <indirect ref>
  0x031CFF $9CEF: -D0-I-  .byte $FC ; <indirect ref>
  0x031D00 $9CF0: ------  .byte $01
  0x031D01 $9CF1: -D0-I-  .byte $0A ; <indirect ref>
  0x031D02 $9CF2: -D0-I-  .byte $03 ; <indirect ref>
  0x031D03 $9CF3: -D0-I-  .byte $1A ; <indirect ref>
  0x031D04 $9CF4: -D0-I-  .byte $2E ; <indirect ref>
  0x031D05 $9CF5: -D0-I-  .byte $0E ; <indirect ref>
  0x031D06 $9CF6: -D0-I-  .byte $2E ; <indirect ref>
  0x031D07 $9CF7: -D0-I-  .byte $2D ; <indirect ref>
  0x031D08 $9CF8: -D0-I-  .byte $00 ; <indirect ref>
  0x031D09 $9CF9: -D0-I-  .byte $21 ; <indirect ref>
  0x031D0A $9CFA: -D0-I-  .byte $06 ; <indirect ref>
  0x031D0B $9CFB: -D0-I-  .byte $04 ; <indirect ref>
  0x031D0C $9CFC: -D0-I-  .byte $1F ; <indirect ref>
  0x031D0D $9CFD: -D0-I-  .byte $0D ; <indirect ref>
  0x031D0E $9CFE: -D0-I-  .byte $FC ; <indirect ref>
  0x031D0F $9CFF: -D0-I-  .byte $F0 ; <indirect ref>
  0x031D10 $9D00: -D0-I-  .byte $01 ; <indirect ref>
  0x031D11 $9D01: -D0-I-  .byte $10 ; <indirect ref>
  0x031D12 $9D02: -D0-I-  .byte $0C ; <indirect ref>
  0x031D13 $9D03: -D0-I-  .byte $01 ; <indirect ref>
  0x031D14 $9D04: -D0-I-  .byte $02 ; <indirect ref>
  0x031D15 $9D05: -D0-I-  .byte $1A ; <indirect ref>
  0x031D16 $9D06: -D0-I-  .byte $00 ; <indirect ref>
  0x031D17 $9D07: -D0-I-  .byte $AE ; <indirect ref>
  0x031D18 $9D08: -D0-I-  .byte $03 ; <indirect ref>
  0x031D19 $9D09: -D0-I-  .byte $13 ; <indirect ref>
  0x031D1A $9D0A: -D0-I-  .byte $2E ; <indirect ref>
  0x031D1B $9D0B: -D0-I-  .byte $19 ; <indirect ref>
  0x031D1C $9D0C: -D0-I-  .byte $1F ; <indirect ref>
  0x031D1D $9D0D: -D0-I-  .byte $1F ; <indirect ref>
  0x031D1E $9D0E: -D0-I-  .byte $FC ; <indirect ref>
  0x031D1F $9D0F: ------  .byte $01
  0x031D20 $9D10: -D0-I-  .byte $0A ; <indirect ref>
  0x031D21 $9D11: -D0-I-  .byte $03 ; <indirect ref>
  0x031D22 $9D12: -D0-I-  .byte $1A ; <indirect ref>
  0x031D23 $9D13: -D0-I-  .byte $2E ; <indirect ref>
  0x031D24 $9D14: -D0-I-  .byte $0E ; <indirect ref>
  0x031D25 $9D15: -D0-I-  .byte $2E ; <indirect ref>
  0x031D26 $9D16: -D0-I-  .byte $2D ; <indirect ref>
  0x031D27 $9D17: -D0-I-  .byte $00 ; <indirect ref>
  0x031D28 $9D18: -D0-I-  .byte $21 ; <indirect ref>
  0x031D29 $9D19: -D0-I-  .byte $06 ; <indirect ref>
  0x031D2A $9D1A: -D0-I-  .byte $04 ; <indirect ref>
  0x031D2B $9D1B: -D0-I-  .byte $1F ; <indirect ref>
  0x031D2C $9D1C: -D0-I-  .byte $0D ; <indirect ref>
  0x031D2D $9D1D: -D0-I-  .byte $FC ; <indirect ref>
  0x031D2E $9D1E: -D0-I-  .byte $F0 ; <indirect ref>
  0x031D2F $9D1F: -D0-I-  .byte $01 ; <indirect ref>
  0x031D30 $9D20: -D0-I-  .byte $65 ; <indirect ref>
  0x031D31 $9D21: -D0-I-  .byte $F1 ; <indirect ref>
  0x031D32 $9D22: -D0-I-  .byte $FC ; <indirect ref>
  0x031D33 $9D23: ------  .byte $01
  0x031D34 $9D24: -D0-I-  .byte $F2 ; <indirect ref>
  0x031D35 $9D25: -D0-I-  .byte $2D ; <indirect ref>
  0x031D36 $9D26: -D0-I-  .byte $FC ; <indirect ref>
  0x031D37 $9D27: ------  .byte $01
  0x031D38 $9D28: -D0-I-  .byte $08 ; <indirect ref>
  0x031D39 $9D29: -D0-I-  .byte $AA ; <indirect ref>
  0x031D3A $9D2A: -D0-I-  .byte $0C ; <indirect ref>
  0x031D3B $9D2B: -D0-I-  .byte $1F ; <indirect ref>
  0x031D3C $9D2C: -D0-I-  .byte $0C ; <indirect ref>
  0x031D3D $9D2D: -D0-I-  .byte $10 ; <indirect ref>
  0x031D3E $9D2E: -D0-I-  .byte $F7 ; <indirect ref>
  0x031D3F $9D2F: -D0-I-  .byte $03 ; <indirect ref>
  0x031D40 $9D30: -D0-I-  .byte $79 ; <indirect ref>
  0x031D41 $9D31: -D0-I-  .byte $FC ; <indirect ref>
  0x031D42 $9D32: -D0-I-  .byte $F0 ; <indirect ref>
  0x031D43 $9D33: -D0-I-  .byte $01 ; <indirect ref>
  0x031D44 $9D34: -D0-I-  .byte $66 ; <indirect ref>
  0x031D45 $9D35: -D0-I-  .byte $F1 ; <indirect ref>
  0x031D46 $9D36: -D0-I-  .byte $24 ; <indirect ref>
  0x031D47 $9D37: -D0-I-  .byte $B1 ; <indirect ref>
  0x031D48 $9D38: -D0-I-  .byte $2A ; <indirect ref>
  0x031D49 $9D39: -D0-I-  .byte $29 ; <indirect ref>
  0x031D4A $9D3A: -D0-I-  .byte $F7 ; <indirect ref>
  0x031D4B $9D3B: -D0-I-  .byte $02 ; <indirect ref>
  0x031D4C $9D3C: -D0-I-  .byte $79 ; <indirect ref>
  0x031D4D $9D3D: -D0-I-  .byte $FC ; <indirect ref>
  0x031D4E $9D3E: ------  .byte $01
  0x031D4F $9D3F: -D0-I-  .byte $F2 ; <indirect ref>
  0x031D50 $9D40: -D0-I-  .byte $00 ; <indirect ref>
  0x031D51 $9D41: -D0-I-  .byte $F1 ; <indirect ref>
  0x031D52 $9D42: -D0-I-  .byte $2D ; <indirect ref>
  0x031D53 $9D43: -D0-I-  .byte $FC ; <indirect ref>
  0x031D54 $9D44: ------  .byte $01
  0x031D55 $9D45: -D0-I-  .byte $08 ; <indirect ref>
  0x031D56 $9D46: -D0-I-  .byte $AA ; <indirect ref>
  0x031D57 $9D47: -D0-I-  .byte $0C ; <indirect ref>
  0x031D58 $9D48: -D0-I-  .byte $1F ; <indirect ref>
  0x031D59 $9D49: -D0-I-  .byte $0C ; <indirect ref>
  0x031D5A $9D4A: -D0-I-  .byte $10 ; <indirect ref>
  0x031D5B $9D4B: -D0-I-  .byte $F7 ; <indirect ref>
  0x031D5C $9D4C: -D0-I-  .byte $03 ; <indirect ref>
  0x031D5D $9D4D: -D0-I-  .byte $79 ; <indirect ref>
  0x031D5E $9D4E: -D0-I-  .byte $FC ; <indirect ref>
  0x031D5F $9D4F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031D60 $9D50: -D0-I-  .byte $01 ; <indirect ref>
  0x031D61 $9D51: -D0-I-  .byte $75 ; <indirect ref>
  0x031D62 $9D52: -D0-I-  .byte $1F ; <indirect ref>
  0x031D63 $9D53: -D0-I-  .byte $0B ; <indirect ref>
  0x031D64 $9D54: -D0-I-  .byte $16 ; <indirect ref>
  0x031D65 $9D55: -D0-I-  .byte $00 ; <indirect ref>
  0x031D66 $9D56: -D0-I-  .byte $1A ; <indirect ref>
  0x031D67 $9D57: -D0-I-  .byte $08 ; <indirect ref>
  0x031D68 $9D58: -D0-I-  .byte $18 ; <indirect ref>
  0x031D69 $9D59: -D0-I-  .byte $12 ; <indirect ref>
  0x031D6A $9D5A: -D0-I-  .byte $19 ; <indirect ref>
  0x031D6B $9D5B: -D0-I-  .byte $FC ; <indirect ref>
  0x031D6C $9D5C: ------  .byte $01
  0x031D6D $9D5D: -D0-I-  .byte $22 ; <indirect ref>
  0x031D6E $9D5E: -D0-I-  .byte $02 ; <indirect ref>
  0x031D6F $9D5F: -D0-I-  .byte $0C ; <indirect ref>
  0x031D70 $9D60: -D0-I-  .byte $32 ; <indirect ref>
  0x031D71 $9D61: -D0-I-  .byte $03 ; <indirect ref>
  0x031D72 $9D62: -D0-I-  .byte $B1 ; <indirect ref>
  0x031D73 $9D63: -D0-I-  .byte $79 ; <indirect ref>
  0x031D74 $9D64: -D0-I-  .byte $FC ; <indirect ref>
  0x031D75 $9D65: ------  .byte $04
  0x031D76 $9D66: -D0-I-  .byte $F1 ; <indirect ref>
  0x031D77 $9D67: -D0-I-  .byte $00 ; <indirect ref>
  0x031D78 $9D68: -D0-I-  .byte $A3 ; <indirect ref>
  0x031D79 $9D69: -D0-I-  .byte $07 ; <indirect ref>
  0x031D7A $9D6A: -D0-I-  .byte $14 ; <indirect ref>
  0x031D7B $9D6B: -D0-I-  .byte $03 ; <indirect ref>
  0x031D7C $9D6C: -D0-I-  .byte $19 ; <indirect ref>
  0x031D7D $9D6D: -D0-I-  .byte $0D ; <indirect ref>
  0x031D7E $9D6E: -D0-I-  .byte $04 ; <indirect ref>
  0x031D7F $9D6F: -D0-I-  .byte $FC ; <indirect ref>
  0x031D80 $9D70: ------  .byte $01
  0x031D81 $9D71: -D0-I-  .byte $06 ; <indirect ref>
  0x031D82 $9D72: -D0-I-  .byte $11 ; <indirect ref>
  0x031D83 $9D73: -D0-I-  .byte $14 ; <indirect ref>
  0x031D84 $9D74: -D0-I-  .byte $2F ; <indirect ref>
  0x031D85 $9D75: -D0-I-  .byte $10 ; <indirect ref>
  0x031D86 $9D76: -D0-I-  .byte $00 ; <indirect ref>
  0x031D87 $9D77: -D0-I-  .byte $0C ; <indirect ref>
  0x031D88 $9D78: -D0-I-  .byte $32 ; <indirect ref>
  0x031D89 $9D79: -D0-I-  .byte $03 ; <indirect ref>
  0x031D8A $9D7A: -D0-I-  .byte $28 ; <indirect ref>
  0x031D8B $9D7B: -D0-I-  .byte $AD ; <indirect ref>
  0x031D8C $9D7C: -D0-I-  .byte $0D ; <indirect ref>
  0x031D8D $9D7D: -D0-I-  .byte $79 ; <indirect ref>
  0x031D8E $9D7E: -D0-I-  .byte $FC ; <indirect ref>
  0x031D8F $9D7F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031D90 $9D80: -D0-I-  .byte $01 ; <indirect ref>
  0x031D91 $9D81: -D0-I-  .byte $66 ; <indirect ref>
  0x031D92 $9D82: -D0-I-  .byte $F1 ; <indirect ref>
  0x031D93 $9D83: -D0-I-  .byte $00 ; <indirect ref>
  0x031D94 $9D84: -D0-I-  .byte $A5 ; <indirect ref>
  0x031D95 $9D85: -D0-I-  .byte $2E ; <indirect ref>
  0x031D96 $9D86: -D0-I-  .byte $18 ; <indirect ref>
  0x031D97 $9D87: -D0-I-  .byte $2E ; <indirect ref>
  0x031D98 $9D88: -D0-I-  .byte $79 ; <indirect ref>
  0x031D99 $9D89: -D0-I-  .byte $FC ; <indirect ref>
  0x031D9A $9D8A: ------  .byte $01
  0x031D9B $9D8B: -D0-I-  .byte $8D ; <indirect ref>
  0x031D9C $9D8C: -D0-I-  .byte $8B ; <indirect ref>
  0x031D9D $9D8D: -D0-I-  .byte $A0 ; <indirect ref>
  0x031D9E $9D8E: -D0-I-  .byte $2F ; <indirect ref>
  0x031D9F $9D8F: -D0-I-  .byte $0E ; <indirect ref>
  0x031DA0 $9D90: -D0-I-  .byte $2E ; <indirect ref>
  0x031DA1 $9D91: -D0-I-  .byte $AD ; <indirect ref>
  0x031DA2 $9D92: -D0-I-  .byte $FC ; <indirect ref>
  0x031DA3 $9D93: ------  .byte $01
  0x031DA4 $9D94: -D0-I-  .byte $24 ; <indirect ref>
  0x031DA5 $9D95: -D0-I-  .byte $B1 ; <indirect ref>
  0x031DA6 $9D96: -D0-I-  .byte $2A ; <indirect ref>
  0x031DA7 $9D97: -D0-I-  .byte $13 ; <indirect ref>
  0x031DA8 $9D98: -D0-I-  .byte $0C ; <indirect ref>
  0x031DA9 $9D99: -D0-I-  .byte $1F ; <indirect ref>
  0x031DAA $9D9A: -D0-I-  .byte $2F ; <indirect ref>
  0x031DAB $9D9B: -D0-I-  .byte $10 ; <indirect ref>
  0x031DAC $9D9C: -D0-I-  .byte $F7 ; <indirect ref>
  0x031DAD $9D9D: -D0-I-  .byte $03 ; <indirect ref>
  0x031DAE $9D9E: -D0-I-  .byte $79 ; <indirect ref>
  0x031DAF $9D9F: -D0-I-  .byte $FC ; <indirect ref>
  0x031DB0 $9DA0: -D0-I-  .byte $F0 ; <indirect ref>
  0x031DB1 $9DA1: -D0-I-  .byte $01 ; <indirect ref>
  0x031DB2 $9DA2: -D0-I-  .byte $75 ; <indirect ref>
  0x031DB3 $9DA3: -D0-I-  .byte $F1 ; <indirect ref>
  0x031DB4 $9DA4: -D0-I-  .byte $00 ; <indirect ref>
  0x031DB5 $9DA5: -D0-I-  .byte $24 ; <indirect ref>
  0x031DB6 $9DA6: -D0-I-  .byte $2F ; <indirect ref>
  0x031DB7 $9DA7: -D0-I-  .byte $10 ; <indirect ref>
  0x031DB8 $9DA8: -D0-I-  .byte $A9 ; <indirect ref>
  0x031DB9 $9DA9: -D0-I-  .byte $79 ; <indirect ref>
  0x031DBA $9DAA: -D0-I-  .byte $FC ; <indirect ref>
  0x031DBB $9DAB: ------  .byte $01
  0x031DBC $9DAC: -D0-I-  .byte $F2 ; <indirect ref>
  0x031DBD $9DAD: -D0-I-  .byte $2D ; <indirect ref>
  0x031DBE $9DAE: -D0-I-  .byte $00 ; <indirect ref>
  0x031DBF $9DAF: -D0-I-  .byte $08 ; <indirect ref>
  0x031DC0 $9DB0: -D0-I-  .byte $AA ; <indirect ref>
  0x031DC1 $9DB1: -D0-I-  .byte $0C ; <indirect ref>
  0x031DC2 $9DB2: -D0-I-  .byte $FC ; <indirect ref>
  0x031DC3 $9DB3: ------  .byte $01
  0x031DC4 $9DB4: -D0-I-  .byte $09 ; <indirect ref>
  0x031DC5 $9DB5: -D0-I-  .byte $2F ; <indirect ref>
  0x031DC6 $9DB6: -D0-I-  .byte $0C ; <indirect ref>
  0x031DC7 $9DB7: -D0-I-  .byte $32 ; <indirect ref>
  0x031DC8 $9DB8: -D0-I-  .byte $03 ; <indirect ref>
  0x031DC9 $9DB9: -D0-I-  .byte $0E ; <indirect ref>
  0x031DCA $9DBA: -D0-I-  .byte $2E ; <indirect ref>
  0x031DCB $9DBB: -D0-I-  .byte $FC ; <indirect ref>
  0x031DCC $9DBC: ------  .byte $01
  0x031DCD $9DBD: -D0-I-  .byte $0C ; <indirect ref>
  0x031DCE $9DBE: -D0-I-  .byte $2E ; <indirect ref>
  0x031DCF $9DBF: -D0-I-  .byte $0C ; <indirect ref>
  0x031DD0 $9DC0: -D0-I-  .byte $31 ; <indirect ref>
  0x031DD1 $9DC1: -D0-I-  .byte $12 ; <indirect ref>
  0x031DD2 $9DC2: -D0-I-  .byte $AA ; <indirect ref>
  0x031DD3 $9DC3: -D0-I-  .byte $F7 ; <indirect ref>
  0x031DD4 $9DC4: -D0-I-  .byte $03 ; <indirect ref>
  0x031DD5 $9DC5: -D0-I-  .byte $79 ; <indirect ref>
  0x031DD6 $9DC6: -D0-I-  .byte $FC ; <indirect ref>
  0x031DD7 $9DC7: -D0-I-  .byte $F0 ; <indirect ref>
  0x031DD8 $9DC8: -D0-I-  .byte $01 ; <indirect ref>
  0x031DD9 $9DC9: -D0-I-  .byte $75 ; <indirect ref>
  0x031DDA $9DCA: -D0-I-  .byte $F1 ; <indirect ref>
  0x031DDB $9DCB: -D0-I-  .byte $00 ; <indirect ref>
  0x031DDC $9DCC: -D0-I-  .byte $0C ; <indirect ref>
  0x031DDD $9DCD: -D0-I-  .byte $32 ; <indirect ref>
  0x031DDE $9DCE: -D0-I-  .byte $03 ; <indirect ref>
  0x031DDF $9DCF: -D0-I-  .byte $28 ; <indirect ref>
  0x031DE0 $9DD0: -D0-I-  .byte $79 ; <indirect ref>
  0x031DE1 $9DD1: -D0-I-  .byte $FC ; <indirect ref>
  0x031DE2 $9DD2: ------  .byte $04
  0x031DE3 $9DD3: -D0-I-  .byte $07 ; <indirect ref>
  0x031DE4 $9DD4: -D0-I-  .byte $32 ; <indirect ref>
  0x031DE5 $9DD5: -D0-I-  .byte $03 ; <indirect ref>
  0x031DE6 $9DD6: -D0-I-  .byte $A4 ; <indirect ref>
  0x031DE7 $9DD7: -D0-I-  .byte $03 ; <indirect ref>
  0x031DE8 $9DD8: -D0-I-  .byte $FC ; <indirect ref>
  0x031DE9 $9DD9: ------  .byte $01
  0x031DEA $9DDA: -D0-I-  .byte $F2 ; <indirect ref>
  0x031DEB $9DDB: -D0-I-  .byte $2D ; <indirect ref>
  0x031DEC $9DDC: -D0-I-  .byte $00 ; <indirect ref>
  0x031DED $9DDD: -D0-I-  .byte $08 ; <indirect ref>
  0x031DEE $9DDE: -D0-I-  .byte $AA ; <indirect ref>
  0x031DEF $9DDF: -D0-I-  .byte $0C ; <indirect ref>
  0x031DF0 $9DE0: -D0-I-  .byte $FC ; <indirect ref>
  0x031DF1 $9DE1: ------  .byte $01
  0x031DF2 $9DE2: -D0-I-  .byte $F1 ; <indirect ref>
  0x031DF3 $9DE3: -D0-I-  .byte $00 ; <indirect ref>
  0x031DF4 $9DE4: -D0-I-  .byte $25 ; <indirect ref>
  0x031DF5 $9DE5: -D0-I-  .byte $03 ; <indirect ref>
  0x031DF6 $9DE6: -D0-I-  .byte $0C ; <indirect ref>
  0x031DF7 $9DE7: -D0-I-  .byte $32 ; <indirect ref>
  0x031DF8 $9DE8: -D0-I-  .byte $03 ; <indirect ref>
  0x031DF9 $9DE9: -D0-I-  .byte $AA ; <indirect ref>
  0x031DFA $9DEA: -D0-I-  .byte $7C ; <indirect ref>
  0x031DFB $9DEB: -D0-I-  .byte $79 ; <indirect ref>
  0x031DFC $9DEC: -D0-I-  .byte $FC ; <indirect ref>
  0x031DFD $9DED: -D0-I-  .byte $F0 ; <indirect ref>
  0x031DFE $9DEE: -D0-I-  .byte $01 ; <indirect ref>
  0x031DFF $9DEF: -D0-I-  .byte $71 ; <indirect ref>
  0x031E00 $9DF0: -D0-I-  .byte $F1 ; <indirect ref>
  0x031E01 $9DF1: -D0-I-  .byte $00 ; <indirect ref>
  0x031E02 $9DF2: -D0-I-  .byte $25 ; <indirect ref>
  0x031E03 $9DF3: -D0-I-  .byte $03 ; <indirect ref>
  0x031E04 $9DF4: -D0-I-  .byte $0C ; <indirect ref>
  0x031E05 $9DF5: -D0-I-  .byte $32 ; <indirect ref>
  0x031E06 $9DF6: -D0-I-  .byte $03 ; <indirect ref>
  0x031E07 $9DF7: -D0-I-  .byte $79 ; <indirect ref>
  0x031E08 $9DF8: -D0-I-  .byte $FC ; <indirect ref>
  0x031E09 $9DF9: ------  .byte $04
  0x031E0A $9DFA: -D0-I-  .byte $06 ; <indirect ref>
  0x031E0B $9DFB: -D0-I-  .byte $12 ; <indirect ref>
  0x031E0C $9DFC: -D0-I-  .byte $13 ; <indirect ref>
  0x031E0D $9DFD: -D0-I-  .byte $19 ; <indirect ref>
  0x031E0E $9DFE: -D0-I-  .byte $00 ; <indirect ref>
  0x031E0F $9DFF: -D0-I-  .byte $15 ; <indirect ref>
  0x031E10 $9E00: -D0-I-  .byte $06 ; <indirect ref>
  0x031E11 $9E01: -D0-I-  .byte $1F ; <indirect ref>
  0x031E12 $9E02: -D0-I-  .byte $14 ; <indirect ref>
  0x031E13 $9E03: -D0-I-  .byte $FC ; <indirect ref>
  0x031E14 $9E04: ------  .byte $01
  0x031E15 $9E05: -D0-I-  .byte $A3 ; <indirect ref>
  0x031E16 $9E06: -D0-I-  .byte $07 ; <indirect ref>
  0x031E17 $9E07: -D0-I-  .byte $0E ; <indirect ref>
  0x031E18 $9E08: -D0-I-  .byte $2E ; <indirect ref>
  0x031E19 $9E09: -D0-I-  .byte $19 ; <indirect ref>
  0x031E1A $9E0A: -D0-I-  .byte $0D ; <indirect ref>
  0x031E1B $9E0B: -D0-I-  .byte $04 ; <indirect ref>
  0x031E1C $9E0C: -D0-I-  .byte $00 ; <indirect ref>
  0x031E1D $9E0D: -D0-I-  .byte $12 ; <indirect ref>
  0x031E1E $9E0E: -D0-I-  .byte $AF ; <indirect ref>
  0x031E1F $9E0F: -D0-I-  .byte $0B ; <indirect ref>
  0x031E20 $9E10: -D0-I-  .byte $08 ; <indirect ref>
  0x031E21 $9E11: -D0-I-  .byte $2E ; <indirect ref>
  0x031E22 $9E12: -D0-I-  .byte $FC ; <indirect ref>
  0x031E23 $9E13: ------  .byte $01
  0x031E24 $9E14: -D0-I-  .byte $F2 ; <indirect ref>
  0x031E25 $9E15: -D0-I-  .byte $2D ; <indirect ref>
  0x031E26 $9E16: -D0-I-  .byte $00 ; <indirect ref>
  0x031E27 $9E17: -D0-I-  .byte $24 ; <indirect ref>
  0x031E28 $9E18: -D0-I-  .byte $B1 ; <indirect ref>
  0x031E29 $9E19: -D0-I-  .byte $28 ; <indirect ref>
  0x031E2A $9E1A: -D0-I-  .byte $1F ; <indirect ref>
  0x031E2B $9E1B: -D0-I-  .byte $0C ; <indirect ref>
  0x031E2C $9E1C: -D0-I-  .byte $10 ; <indirect ref>
  0x031E2D $9E1D: -D0-I-  .byte $79 ; <indirect ref>
  0x031E2E $9E1E: -D0-I-  .byte $FC ; <indirect ref>
  0x031E2F $9E1F: -D0-I-  .byte $F0 ; <indirect ref>
  0x031E30 $9E20: -D0-I-  .byte $01 ; <indirect ref>
  0x031E31 $9E21: -D0-I-  .byte $79 ; <indirect ref>
  0x031E32 $9E22: -D0-I-  .byte $13 ; <indirect ref>
  0x031E33 $9E23: -D0-I-  .byte $2E ; <indirect ref>
  0x031E34 $9E24: -D0-I-  .byte $0B ; <indirect ref>
  0x031E35 $9E25: -D0-I-  .byte $02 ; <indirect ref>
  0x031E36 $9E26: -D0-I-  .byte $00 ; <indirect ref>
  0x031E37 $9E27: -D0-I-  .byte $C1 ; <indirect ref>
  0x031E38 $9E28: -D0-I-  .byte $74 ; <indirect ref>
  0x031E39 $9E29: -D0-I-  .byte $41 ; <indirect ref>
  0x031E3A $9E2A: -D0-I-  .byte $4D ; <indirect ref>
  0x031E3B $9E2B: -D0-I-  .byte $08 ; <indirect ref>
  0x031E3C $9E2C: -D0-I-  .byte $2E ; <indirect ref>
  0x031E3D $9E2D: -D0-I-  .byte $FC ; <indirect ref>
  0x031E3E $9E2E: ------  .byte $04
  0x031E3F $9E2F: -D0-I-  .byte $24 ; <indirect ref>
  0x031E40 $9E30: -D0-I-  .byte $B1 ; <indirect ref>
  0x031E41 $9E31: -D0-I-  .byte $2A ; <indirect ref>
  0x031E42 $9E32: -D0-I-  .byte $29 ; <indirect ref>
  0x031E43 $9E33: -D0-I-  .byte $79 ; <indirect ref>
  0x031E44 $9E34: -D0-I-  .byte $79 ; <indirect ref>
  0x031E45 $9E35: -D0-I-  .byte $FC ; <indirect ref>
  0x031E46 $9E36: ------  .byte $01
  0x031E47 $9E37: -D0-I-  .byte $16 ; <indirect ref>
  0x031E48 $9E38: -D0-I-  .byte $1E ; <indirect ref>
  0x031E49 $9E39: -D0-I-  .byte $2E ; <indirect ref>
  0x031E4A $9E3A: -D0-I-  .byte $00 ; <indirect ref>
  0x031E4B $9E3B: -D0-I-  .byte $A6 ; <indirect ref>
  0x031E4C $9E3C: -D0-I-  .byte $31 ; <indirect ref>
  0x031E4D $9E3D: -D0-I-  .byte $2E ; <indirect ref>
  0x031E4E $9E3E: -D0-I-  .byte $09 ; <indirect ref>
  0x031E4F $9E3F: -D0-I-  .byte $2F ; <indirect ref>
  0x031E50 $9E40: -D0-I-  .byte $0C ; <indirect ref>
  0x031E51 $9E41: -D0-I-  .byte $32 ; <indirect ref>
  0x031E52 $9E42: -D0-I-  .byte $03 ; <indirect ref>
  0x031E53 $9E43: -D0-I-  .byte $16 ; <indirect ref>
  0x031E54 $9E44: -D0-I-  .byte $FC ; <indirect ref>
  0x031E55 $9E45: ------  .byte $01
  0x031E56 $9E46: -D0-I-  .byte $4A ; <indirect ref>
  0x031E57 $9E47: -D0-I-  .byte $5F ; <indirect ref>
  0x031E58 $9E48: -D0-I-  .byte $2D ; <indirect ref>
  0x031E59 $9E49: -D0-I-  .byte $00 ; <indirect ref>
  0x031E5A $9E4A: -D0-I-  .byte $0D ; <indirect ref>
  0x031E5B $9E4B: -D0-I-  .byte $0D ; <indirect ref>
  0x031E5C $9E4C: -D0-I-  .byte $22 ; <indirect ref>
  0x031E5D $9E4D: -D0-I-  .byte $10 ; <indirect ref>
  0x031E5E $9E4E: -D0-I-  .byte $79 ; <indirect ref>
  0x031E5F $9E4F: -D0-I-  .byte $FC ; <indirect ref>
  0x031E60 $9E50: -D0-I-  .byte $F0 ; <indirect ref>
  0x031E61 $9E51: -D0-I-  .byte $01 ; <indirect ref>
  0x031E62 $9E52: -D0-I-  .byte $79 ; <indirect ref>
  0x031E63 $9E53: -D0-I-  .byte $16 ; <indirect ref>
  0x031E64 $9E54: -D0-I-  .byte $1E ; <indirect ref>
  0x031E65 $9E55: -D0-I-  .byte $2E ; <indirect ref>
  0x031E66 $9E56: -D0-I-  .byte $79 ; <indirect ref>
  0x031E67 $9E57: -D0-I-  .byte $00 ; <indirect ref>
  0x031E68 $9E58: -D0-I-  .byte $B7 ; <indirect ref>
  0x031E69 $9E59: -D0-I-  .byte $69 ; <indirect ref>
  0x031E6A $9E5A: -D0-I-  .byte $5F ; <indirect ref>
  0x031E6B $9E5B: -D0-I-  .byte $6E ; <indirect ref>
  0x031E6C $9E5C: -D0-I-  .byte $A2 ; <indirect ref>
  0x031E6D $9E5D: -D0-I-  .byte $2E ; <indirect ref>
  0x031E6E $9E5E: -D0-I-  .byte $AA ; <indirect ref>
  0x031E6F $9E5F: -D0-I-  .byte $2E ; <indirect ref>
  0x031E70 $9E60: -D0-I-  .byte $FC ; <indirect ref>
  0x031E71 $9E61: ------  .byte $01
  0x031E72 $9E62: -D0-I-  .byte $16 ; <indirect ref>
  0x031E73 $9E63: -D0-I-  .byte $0C ; <indirect ref>
  0x031E74 $9E64: -D0-I-  .byte $C2 ; <indirect ref>
  0x031E75 $9E65: -D0-I-  .byte $42 ; <indirect ref>
  0x031E76 $9E66: -D0-I-  .byte $52 ; <indirect ref>
  0x031E77 $9E67: -D0-I-  .byte $2D ; <indirect ref>
  0x031E78 $9E68: -D0-I-  .byte $00 ; <indirect ref>
  0x031E79 $9E69: -D0-I-  .byte $24 ; <indirect ref>
  0x031E7A $9E6A: -D0-I-  .byte $B1 ; <indirect ref>
  0x031E7B $9E6B: -D0-I-  .byte $2F ; <indirect ref>
  0x031E7C $9E6C: -D0-I-  .byte $10 ; <indirect ref>
  0x031E7D $9E6D: -D0-I-  .byte $7D ; <indirect ref>
  0x031E7E $9E6E: -D0-I-  .byte $79 ; <indirect ref>
  0x031E7F $9E6F: -D0-I-  .byte $FC ; <indirect ref>
  0x031E80 $9E70: ------  .byte $04
  0x031E81 $9E71: -D0-I-  .byte $12 ; <indirect ref>
  0x031E82 $9E72: -D0-I-  .byte $02 ; <indirect ref>
  0x031E83 $9E73: -D0-I-  .byte $16 ; <indirect ref>
  0x031E84 $9E74: -D0-I-  .byte $00 ; <indirect ref>
  0x031E85 $9E75: -D0-I-  .byte $09 ; <indirect ref>
  0x031E86 $9E76: -D0-I-  .byte $2F ; <indirect ref>
  0x031E87 $9E77: -D0-I-  .byte $0C ; <indirect ref>
  0x031E88 $9E78: -D0-I-  .byte $32 ; <indirect ref>
  0x031E89 $9E79: -D0-I-  .byte $03 ; <indirect ref>
  0x031E8A $9E7A: -D0-I-  .byte $0E ; <indirect ref>
  0x031E8B $9E7B: -D0-I-  .byte $2E ; <indirect ref>
  0x031E8C $9E7C: -D0-I-  .byte $FC ; <indirect ref>
  0x031E8D $9E7D: ------  .byte $01
  0x031E8E $9E7E: -D0-I-  .byte $0C ; <indirect ref>
  0x031E8F $9E7F: -D0-I-  .byte $2E ; <indirect ref>
  0x031E90 $9E80: -D0-I-  .byte $0C ; <indirect ref>
  0x031E91 $9E81: -D0-I-  .byte $31 ; <indirect ref>
  0x031E92 $9E82: -D0-I-  .byte $12 ; <indirect ref>
  0x031E93 $9E83: -D0-I-  .byte $AA ; <indirect ref>
  0x031E94 $9E84: -D0-I-  .byte $7D ; <indirect ref>
  0x031E95 $9E85: -D0-I-  .byte $79 ; <indirect ref>
  0x031E96 $9E86: -D0-I-  .byte $FC ; <indirect ref>
  0x031E97 $9E87: -D0-I-  .byte $F0 ; <indirect ref>
  0x031E98 $9E88: -D0-I-  .byte $01 ; <indirect ref>
  0x031E99 $9E89: -D0-I-  .byte $61 ; <indirect ref>
  0x031E9A $9E8A: -D0-I-  .byte $28 ; <indirect ref>
  0x031E9B $9E8B: -D0-I-  .byte $32 ; <indirect ref>
  0x031E9C $9E8C: -D0-I-  .byte $03 ; <indirect ref>
  0x031E9D $9E8D: -D0-I-  .byte $A2 ; <indirect ref>
  0x031E9E $9E8E: -D0-I-  .byte $2E ; <indirect ref>
  0x031E9F $9E8F: -D0-I-  .byte $00 ; <indirect ref>
  0x031EA0 $9E90: -D0-I-  .byte $AE ; <indirect ref>
  0x031EA1 $9E91: -D0-I-  .byte $03 ; <indirect ref>
  0x031EA2 $9E92: -D0-I-  .byte $13 ; <indirect ref>
  0x031EA3 $9E93: -D0-I-  .byte $2E ; <indirect ref>
  0x031EA4 $9E94: -D0-I-  .byte $19 ; <indirect ref>
  0x031EA5 $9E95: -D0-I-  .byte $1F ; <indirect ref>
  0x031EA6 $9E96: -D0-I-  .byte $1F ; <indirect ref>
  0x031EA7 $9E97: -D0-I-  .byte $FC ; <indirect ref>
  0x031EA8 $9E98: ------  .byte $01
  0x031EA9 $9E99: -D0-I-  .byte $0C ; <indirect ref>
  0x031EAA $9E9A: -D0-I-  .byte $32 ; <indirect ref>
  0x031EAB $9E9B: -D0-I-  .byte $03 ; <indirect ref>
  0x031EAC $9E9C: -D0-I-  .byte $B1 ; <indirect ref>
  0x031EAD $9E9D: -D0-I-  .byte $1A ; <indirect ref>
  0x031EAE $9E9E: -D0-I-  .byte $00 ; <indirect ref>
  0x031EAF $9E9F: -D0-I-  .byte $04 ; <indirect ref>
  0x031EB0 $9EA0: -D0-I-  .byte $2E ; <indirect ref>
  0x031EB1 $9EA1: -D0-I-  .byte $11 ; <indirect ref>
  0x031EB2 $9EA2: -D0-I-  .byte $32 ; <indirect ref>
  0x031EB3 $9EA3: -D0-I-  .byte $03 ; <indirect ref>
  0x031EB4 $9EA4: -D0-I-  .byte $0E ; <indirect ref>
  0x031EB5 $9EA5: -D0-I-  .byte $2E ; <indirect ref>
  0x031EB6 $9EA6: -D0-I-  .byte $16 ; <indirect ref>
  0x031EB7 $9EA7: -D0-I-  .byte $FC ; <indirect ref>
  0x031EB8 $9EA8: ------  .byte $01
  0x031EB9 $9EA9: -D0-I-  .byte $23 ; <indirect ref>
  0x031EBA $9EAA: -D0-I-  .byte $11 ; <indirect ref>
  0x031EBB $9EAB: -D0-I-  .byte $0A ; <indirect ref>
  0x031EBC $9EAC: -D0-I-  .byte $0B ; <indirect ref>
  0x031EBD $9EAD: -D0-I-  .byte $2A ; <indirect ref>
  0x031EBE $9EAE: -D0-I-  .byte $1F ; <indirect ref>
  0x031EBF $9EAF: -D0-I-  .byte $0C ; <indirect ref>
  0x031EC0 $9EB0: -D0-I-  .byte $10 ; <indirect ref>
  0x031EC1 $9EB1: -D0-I-  .byte $F7 ; <indirect ref>
  0x031EC2 $9EB2: -D0-I-  .byte $02 ; <indirect ref>
  0x031EC3 $9EB3: -D0-I-  .byte $79 ; <indirect ref>
  0x031EC4 $9EB4: -D0-I-  .byte $FC ; <indirect ref>
  0x031EC5 $9EB5: -D0-I-  .byte $F0 ; <indirect ref>
  0x031EC6 $9EB6: ------  .byte $01
  0x031EC7 $9EB7: ------  .byte $61
  0x031EC8 $9EB8: ------  .byte $F1
  0x031EC9 $9EB9: ------  .byte $00
  0x031ECA $9EBA: ------  .byte $F2
  0x031ECB $9EBB: ------  .byte $FC
  0x031ECC $9EBC: ------  .byte $01
  0x031ECD $9EBD: ------  .byte $14
  0x031ECE $9EBE: ------  .byte $23
  0x031ECF $9EBF: ------  .byte $16
  0x031ED0 $9EC0: ------  .byte $00
  0x031ED1 $9EC1: ------  .byte $25
  0x031ED2 $9EC2: ------  .byte $A7
  0x031ED3 $9EC3: ------  .byte $27
  0x031ED4 $9EC4: ------  .byte $A7
  0x031ED5 $9EC5: ------  .byte $FC
  0x031ED6 $9EC6: ------  .byte $01
  0x031ED7 $9EC7: ------  .byte $1B
  0x031ED8 $9EC8: ------  .byte $07
  0x031ED9 $9EC9: ------  .byte $2C
  0x031EDA $9ECA: ------  .byte $09
  0x031EDB $9ECB: ------  .byte $AA
  0x031EDC $9ECC: ------  .byte $F7
  0x031EDD $9ECD: ------  .byte $03
  0x031EDE $9ECE: ------  .byte $79
  0x031EDF $9ECF: ------  .byte $FC
  0x031EE0 $9ED0: ------  .byte $F0
  0x031EE1 $9ED1: -D0-I-  .byte $01 ; <indirect ref>
  0x031EE2 $9ED2: -D0-I-  .byte $71 ; <indirect ref>
  0x031EE3 $9ED3: -D0-I-  .byte $28 ; <indirect ref>
  0x031EE4 $9ED4: -D0-I-  .byte $32 ; <indirect ref>
  0x031EE5 $9ED5: -D0-I-  .byte $03 ; <indirect ref>
  0x031EE6 $9ED6: -D0-I-  .byte $A2 ; <indirect ref>
  0x031EE7 $9ED7: -D0-I-  .byte $2E ; <indirect ref>
  0x031EE8 $9ED8: -D0-I-  .byte $FC ; <indirect ref>
  0x031EE9 $9ED9: ------  .byte $01
  0x031EEA $9EDA: -D0-I-  .byte $26 ; <indirect ref>
  0x031EEB $9EDB: -D0-I-  .byte $08 ; <indirect ref>
  0x031EEC $9EDC: -D0-I-  .byte $00 ; <indirect ref>
  0x031EED $9EDD: -D0-I-  .byte $10 ; <indirect ref>
  0x031EEE $9EDE: -D0-I-  .byte $10 ; <indirect ref>
  0x031EEF $9EDF: -D0-I-  .byte $06 ; <indirect ref>
  0x031EF0 $9EE0: -D0-I-  .byte $02 ; <indirect ref>
  0x031EF1 $9EE1: -D0-I-  .byte $1F ; <indirect ref>
  0x031EF2 $9EE2: -D0-I-  .byte $0C ; <indirect ref>
  0x031EF3 $9EE3: -D0-I-  .byte $10 ; <indirect ref>
  0x031EF4 $9EE4: -D0-I-  .byte $A0 ; <indirect ref>
  0x031EF5 $9EE5: -D0-I-  .byte $FC ; <indirect ref>
  0x031EF6 $9EE6: ------  .byte $01
  0x031EF7 $9EE7: -D0-I-  .byte $0C ; <indirect ref>
  0x031EF8 $9EE8: -D0-I-  .byte $32 ; <indirect ref>
  0x031EF9 $9EE9: -D0-I-  .byte $03 ; <indirect ref>
  0x031EFA $9EEA: -D0-I-  .byte $B1 ; <indirect ref>
  0x031EFB $9EEB: -D0-I-  .byte $1A ; <indirect ref>
  0x031EFC $9EEC: -D0-I-  .byte $00 ; <indirect ref>
  0x031EFD $9EED: -D0-I-  .byte $8D ; <indirect ref>
  0x031EFE $9EEE: -D0-I-  .byte $8B ; <indirect ref>
  0x031EFF $9EEF: -D0-I-  .byte $0E ; <indirect ref>
  0x031F00 $9EF0: -D0-I-  .byte $2E ; <indirect ref>
  0x031F01 $9EF1: -D0-I-  .byte $16 ; <indirect ref>
  0x031F02 $9EF2: -D0-I-  .byte $FC ; <indirect ref>
  0x031F03 $9EF3: ------  .byte $01
  0x031F04 $9EF4: -D0-I-  .byte $25 ; <indirect ref>
  0x031F05 $9EF5: -D0-I-  .byte $AA ; <indirect ref>
  0x031F06 $9EF6: -D0-I-  .byte $18 ; <indirect ref>
  0x031F07 $9EF7: -D0-I-  .byte $27 ; <indirect ref>
  0x031F08 $9EF8: -D0-I-  .byte $2A ; <indirect ref>
  0x031F09 $9EF9: -D0-I-  .byte $1F ; <indirect ref>
  0x031F0A $9EFA: -D0-I-  .byte $0D ; <indirect ref>
  0x031F0B $9EFB: -D0-I-  .byte $FC ; <indirect ref>
  0x031F0C $9EFC: -D0-I-  .byte $F0 ; <indirect ref>
  0x031F0D $9EFD: ------  .byte $01
  0x031F0E $9EFE: ------  .byte $71
  0x031F0F $9EFF: ------  .byte $12
  0x031F10 $9F00: ------  .byte $02
  0x031F11 $9F01: ------  .byte $16
  0x031F12 $9F02: ------  .byte $00
  0x031F13 $9F03: ------  .byte $09
  0x031F14 $9F04: ------  .byte $2F
  0x031F15 $9F05: ------  .byte $11
  0x031F16 $9F06: ------  .byte $30
  0x031F17 $9F07: ------  .byte $08
  0x031F18 $9F08: ------  .byte $12
  0x031F19 $9F09: ------  .byte $06
  0x031F1A $9F0A: ------  .byte $A7
  0x031F1B $9F0B: ------  .byte $79
  0x031F1C $9F0C: ------  .byte $FC
  0x031F1D $9F0D: ------  .byte $08
  0x031F1E $9F0E: ------  .byte $F1
  0x031F1F $9F0F: ------  .byte $00
  0x031F20 $9F10: ------  .byte $F2
  0x031F21 $9F11: ------  .byte $00
  0x031F22 $9F12: ------  .byte $14
  0x031F23 $9F13: ------  .byte $23
  0x031F24 $9F14: ------  .byte $16
  0x031F25 $9F15: ------  .byte $FC
  0x031F26 $9F16: ------  .byte $01
  0x031F27 $9F17: ------  .byte $01
  0x031F28 $9F18: ------  .byte $0D
  0x031F29 $9F19: ------  .byte $19
  0x031F2A $9F1A: ------  .byte $00
  0x031F2B $9F1B: ------  .byte $0B
  0x031F2C $9F1C: ------  .byte $02
  0x031F2D $9F1D: ------  .byte $0C
  0x031F2E $9F1E: ------  .byte $01
  0x031F2F $9F1F: ------  .byte $02
  0x031F30 $9F20: ------  .byte $16
  0x031F31 $9F21: ------  .byte $FC
  0x031F32 $9F22: ------  .byte $01
  0x031F33 $9F23: ------  .byte $19
  0x031F34 $9F24: ------  .byte $A9
  0x031F35 $9F25: ------  .byte $21
  0x031F36 $9F26: ------  .byte $0A
  0x031F37 $9F27: ------  .byte $14
  0x031F38 $9F28: ------  .byte $16
  0x031F39 $9F29: ------  .byte $00
  0x031F3A $9F2A: ------  .byte $15
  0x031F3B $9F2B: ------  .byte $28
  0x031F3C $9F2C: ------  .byte $1F
  0x031F3D $9F2D: ------  .byte $0C
  0x031F3E $9F2E: ------  .byte $10
  0x031F3F $9F2F: ------  .byte $FC
  0x031F40 $9F30: ------  .byte $F0
  0x031F41 $9F31: -D0-I-  .byte $01 ; <indirect ref>
  0x031F42 $9F32: -D0-I-  .byte $51 ; <indirect ref>
  0x031F43 $9F33: -D0-I-  .byte $E4 ; <indirect ref>
  0x031F44 $9F34: -D0-I-  .byte $19 ; <indirect ref>
  0x031F45 $9F35: -D0-I-  .byte $FC ; <indirect ref>
  0x031F46 $9F36: ------  .byte $04
  0x031F47 $9F37: -D0-I-  .byte $D0 ; <indirect ref>
  0x031F48 $9F38: -D0-I-  .byte $55 ; <indirect ref>
  0x031F49 $9F39: -D0-I-  .byte $69 ; <indirect ref>
  0x031F4A $9F3A: -D0-I-  .byte $53 ; <indirect ref>
  0x031F4B $9F3B: -D0-I-  .byte $74 ; <indirect ref>
  0x031F4C $9F3C: -D0-I-  .byte $47 ; <indirect ref>
  0x031F4D $9F3D: -D0-I-  .byte $6F ; <indirect ref>
  0x031F4E $9F3E: -D0-I-  .byte $48 ; <indirect ref>
  0x031F4F $9F3F: -D0-I-  .byte $79 ; <indirect ref>
  0x031F50 $9F40: -D0-I-  .byte $FC ; <indirect ref>
  0x031F51 $9F41: -D0-I-  .byte $F0 ; <indirect ref>
  0x031F52 $9F42: -D0-I-  .byte $F4 ; <indirect ref>
  0x031F53 $9F43: -D0-I-  .byte $04 ; <indirect ref>
  0x031F54 $9F44: -D0-I-  .byte $52 ; <indirect ref>
  0x031F55 $9F45: -D0-I-  .byte $9F ; <indirect ref>
  0x031F56 $9F46: -D0-I-  .byte $E1 ; <indirect ref>
  0x031F57 $9F47: -D0-I-  .byte $9F ; <indirect ref>
  0x031F58 $9F48: -D0-I-  .byte $8B ; <indirect ref>
  0x031F59 $9F49: -D0-I-  .byte $A0 ; <indirect ref>
  0x031F5A $9F4A: -D0-I-  .byte $2A ; <indirect ref>
  0x031F5B $9F4B: -D0-I-  .byte $A1 ; <indirect ref>
  0x031F5C $9F4C: -D0-I-  .byte $25 ; <indirect ref>
  0x031F5D $9F4D: -D0-I-  .byte $A2 ; <indirect ref>
  0x031F5E $9F4E: -D0-I-  .byte $92 ; <indirect ref>
  0x031F5F $9F4F: -D0-I-  .byte $A2 ; <indirect ref>
  0x031F60 $9F50: -D0-I-  .byte $02 ; <indirect ref>
  0x031F61 $9F51: -D0-I-  .byte $A3 ; <indirect ref>
  0x031F62 $9F52: -D0-I-  .byte $F5 ; <indirect ref>
  0x031F63 $9F53: -D0-I-  .byte $02 ; <indirect ref>
  0x031F64 $9F54: -D0-I-  .byte $E8 ; <indirect ref>
  0x031F65 $9F55: -D0-I-  .byte $08 ; <indirect ref>
  0x031F66 $9F56: -D0-I-  .byte $3F ; <indirect ref>
  0x031F67 $9F57: -D0-I-  .byte $3F ; <indirect ref>
  0x031F68 $9F58: -D0-I-  .byte $3F ; <indirect ref>
  0x031F69 $9F59: -D0-I-  .byte $3F ; <indirect ref>
  0x031F6A $9F5A: -D0-I-  .byte $FC ; <indirect ref>
  0x031F6B $9F5B: -D0-I-  .byte $E8 ; <indirect ref>
  0x031F6C $9F5C: -D0-I-  .byte $1B ; <indirect ref>
  0x031F6D $9F5D: -D0-I-  .byte $03 ; <indirect ref>
  0x031F6E $9F5E: -D0-I-  .byte $7D ; <indirect ref>
  0x031F6F $9F5F: -D0-I-  .byte $2E ; <indirect ref>
  0x031F70 $9F60: -D0-I-  .byte $00 ; <indirect ref>
  0x031F71 $9F61: -D0-I-  .byte $10 ; <indirect ref>
  0x031F72 $9F62: -D0-I-  .byte $02 ; <indirect ref>
  0x031F73 $9F63: -D0-I-  .byte $08 ; <indirect ref>
  0x031F74 $9F64: -D0-I-  .byte $12 ; <indirect ref>
  0x031F75 $9F65: -D0-I-  .byte $AA ; <indirect ref>
  0x031F76 $9F66: -D0-I-  .byte $7D ; <indirect ref>
  0x031F77 $9F67: -D0-I-  .byte $FC ; <indirect ref>
  0x031F78 $9F68: ------  .byte $01
  0x031F79 $9F69: -D0-I-  .byte $1A ; <indirect ref>
  0x031F7A $9F6A: -D0-I-  .byte $24 ; <indirect ref>
  0x031F7B $9F6B: -D0-I-  .byte $08 ; <indirect ref>
  0x031F7C $9F6C: -D0-I-  .byte $00 ; <indirect ref>
  0x031F7D $9F6D: -D0-I-  .byte $81 ; <indirect ref>
  0x031F7E $9F6E: -D0-I-  .byte $C7 ; <indirect ref>
  0x031F7F $9F6F: -D0-I-  .byte $50 ; <indirect ref>
  0x031F80 $9F70: -D0-I-  .byte $6E ; <indirect ref>
  0x031F81 $9F71: -D0-I-  .byte $05 ; <indirect ref>
  0x031F82 $9F72: -D0-I-  .byte $0C ; <indirect ref>
  0x031F83 $9F73: -D0-I-  .byte $13 ; <indirect ref>
  0x031F84 $9F74: -D0-I-  .byte $26 ; <indirect ref>
  0x031F85 $9F75: -D0-I-  .byte $79 ; <indirect ref>
  0x031F86 $9F76: -D0-I-  .byte $FC ; <indirect ref>
  0x031F87 $9F77: -D0-I-  .byte $E0 ; <indirect ref>
  0x031F88 $9F78: -D0-I-  .byte $11 ; <indirect ref>
  0x031F89 $9F79: -D0-I-  .byte $0F ; <indirect ref>
  0x031F8A $9F7A: -D0-I-  .byte $03 ; <indirect ref>
  0x031F8B $9F7B: -D0-I-  .byte $06 ; <indirect ref>
  0x031F8C $9F7C: -D0-I-  .byte $00 ; <indirect ref>
  0x031F8D $9F7D: -D0-I-  .byte $1F ; <indirect ref>
  0x031F8E $9F7E: -D0-I-  .byte $10 ; <indirect ref>
  0x031F8F $9F7F: -D0-I-  .byte $6C ; <indirect ref>
  0x031F90 $9F80: -D0-I-  .byte $50 ; <indirect ref>
  0x031F91 $9F81: -D0-I-  .byte $4C ; <indirect ref>
  0x031F92 $9F82: -D0-I-  .byte $16 ; <indirect ref>
  0x031F93 $9F83: -D0-I-  .byte $FC ; <indirect ref>
  0x031F94 $9F84: ------  .byte $01
  0x031F95 $9F85: -D0-I-  .byte $18 ; <indirect ref>
  0x031F96 $9F86: -D0-I-  .byte $21 ; <indirect ref>
  0x031F97 $9F87: -D0-I-  .byte $2A ; <indirect ref>
  0x031F98 $9F88: -D0-I-  .byte $2F ; <indirect ref>
  0x031F99 $9F89: -D0-I-  .byte $7D ; <indirect ref>
  0x031F9A $9F8A: -D0-I-  .byte $00 ; <indirect ref>
  0x031F9B $9F8B: -D0-I-  .byte $6C ; <indirect ref>
  0x031F9C $9F8C: -D0-I-  .byte $49 ; <indirect ref>
  0x031F9D $9F8D: -D0-I-  .byte $24 ; <indirect ref>
  0x031F9E $9F8E: -D0-I-  .byte $18 ; <indirect ref>
  0x031F9F $9F8F: -D0-I-  .byte $79 ; <indirect ref>
  0x031FA0 $9F90: -D0-I-  .byte $FC ; <indirect ref>
  0x031FA1 $9F91: -D0-I-  .byte $E0 ; <indirect ref>
  0x031FA2 $9F92: -D0-I-  .byte $04 ; <indirect ref>
  0x031FA3 $9F93: -D0-I-  .byte $1C ; <indirect ref>
  0x031FA4 $9F94: -D0-I-  .byte $2E ; <indirect ref>
  0x031FA5 $9F95: -D0-I-  .byte $00 ; <indirect ref>
  0x031FA6 $9F96: -D0-I-  .byte $18 ; <indirect ref>
  0x031FA7 $9F97: -D0-I-  .byte $13 ; <indirect ref>
  0x031FA8 $9F98: -D0-I-  .byte $24 ; <indirect ref>
  0x031FA9 $9F99: -D0-I-  .byte $2E ; <indirect ref>
  0x031FAA $9F9A: -D0-I-  .byte $15 ; <indirect ref>
  0x031FAB $9F9B: -D0-I-  .byte $02 ; <indirect ref>
  0x031FAC $9F9C: -D0-I-  .byte $63 ; <indirect ref>
  0x031FAD $9F9D: -D0-I-  .byte $6E ; <indirect ref>
  0x031FAE $9F9E: -D0-I-  .byte $79 ; <indirect ref>
  0x031FAF $9F9F: -D0-I-  .byte $FC ; <indirect ref>
  0x031FB0 $9FA0: -D0-I-  .byte $B0 ; <indirect ref>
  0x031FB1 $9FA1: -D0-I-  .byte $10 ; <indirect ref>
  0x031FB2 $9FA2: -D0-I-  .byte $03 ; <indirect ref>
  0x031FB3 $9FA3: -D0-I-  .byte $2F ; <indirect ref>
  0x031FB4 $9FA4: -D0-I-  .byte $79 ; <indirect ref>
  0x031FB5 $9FA5: -D0-I-  .byte $FC ; <indirect ref>
  0x031FB6 $9FA6: ------  .byte $10
  0x031FB7 $9FA7: -D0-I-  .byte $18 ; <indirect ref>
  0x031FB8 $9FA8: -D0-I-  .byte $3F ; <indirect ref>
  0x031FB9 $9FA9: -D0-I-  .byte $18 ; <indirect ref>
  0x031FBA $9FAA: -D0-I-  .byte $21 ; <indirect ref>
  0x031FBB $9FAB: -D0-I-  .byte $08 ; <indirect ref>
  0x031FBC $9FAC: -D0-I-  .byte $15 ; <indirect ref>
  0x031FBD $9FAD: -D0-I-  .byte $2F ; <indirect ref>
  0x031FBE $9FAE: -D0-I-  .byte $13 ; <indirect ref>
  0x031FBF $9FAF: -D0-I-  .byte $07 ; <indirect ref>
  0x031FC0 $9FB0: -D0-I-  .byte $10 ; <indirect ref>
  0x031FC1 $9FB1: -D0-I-  .byte $FC ; <indirect ref>
  0x031FC2 $9FB2: -D0-I-  .byte $A0 ; <indirect ref>
  0x031FC3 $9FB3: -D0-I-  .byte $07 ; <indirect ref>
  0x031FC4 $9FB4: -D0-I-  .byte $24 ; <indirect ref>
  0x031FC5 $9FB5: -D0-I-  .byte $2F ; <indirect ref>
  0x031FC6 $9FB6: -D0-I-  .byte $C8 ; <indirect ref>
  0x031FC7 $9FB7: -D0-I-  .byte $00 ; <indirect ref>
  0x031FC8 $9FB8: -D0-I-  .byte $18 ; <indirect ref>
  0x031FC9 $9FB9: -D0-I-  .byte $26 ; <indirect ref>
  0x031FCA $9FBA: -D0-I-  .byte $03 ; <indirect ref>
  0x031FCB $9FBB: -D0-I-  .byte $3F ; <indirect ref>
  0x031FCC $9FBC: -D0-I-  .byte $3F ; <indirect ref>
  0x031FCD $9FBD: -D0-I-  .byte $3F ; <indirect ref>
  0x031FCE $9FBE: -D0-I-  .byte $FC ; <indirect ref>
  0x031FCF $9FBF: -D0-I-  .byte $40 ; <indirect ref>
  0x031FD0 $9FC0: -D0-I-  .byte $87 ; <indirect ref>
  0x031FD1 $9FC1: -D0-I-  .byte $A2 ; <indirect ref>
  0x031FD2 $9FC2: -D0-I-  .byte $7C ; <indirect ref>
  0x031FD3 $9FC3: -D0-I-  .byte $00 ; <indirect ref>
  0x031FD4 $9FC4: -D0-I-  .byte $A2 ; <indirect ref>
  0x031FD5 $9FC5: -D0-I-  .byte $F7 ; <indirect ref>
  0x031FD6 $9FC6: -D0-I-  .byte $02 ; <indirect ref>
  0x031FD7 $9FC7: -D0-I-  .byte $FC ; <indirect ref>
  0x031FD8 $9FC8: ------  .byte $08
  0x031FD9 $9FC9: -D0-I-  .byte $00 ; <indirect ref>
  0x031FDA $9FCA: -D0-I-  .byte $0D ; <indirect ref>
  0x031FDB $9FCB: -D0-I-  .byte $24 ; <indirect ref>
  0x031FDC $9FCC: -D0-I-  .byte $00 ; <indirect ref>
  0x031FDD $9FCD: -D0-I-  .byte $0D ; <indirect ref>
  0x031FDE $9FCE: -D0-I-  .byte $24 ; <indirect ref>
  0x031FDF $9FCF: -D0-I-  .byte $FC ; <indirect ref>
  0x031FE0 $9FD0: -D0-I-  .byte $80 ; <indirect ref>
  0x031FE1 $9FD1: -D0-I-  .byte $87 ; <indirect ref>
  0x031FE2 $9FD2: -D0-I-  .byte $00 ; <indirect ref>
  0x031FE3 $9FD3: -D0-I-  .byte $A2 ; <indirect ref>
  0x031FE4 $9FD4: -D0-I-  .byte $F7 ; <indirect ref>
  0x031FE5 $9FD5: -D0-I-  .byte $02 ; <indirect ref>
  0x031FE6 $9FD6: -D0-I-  .byte $FC ; <indirect ref>
  0x031FE7 $9FD7: ------  .byte $08
  0x031FE8 $9FD8: -D0-I-  .byte $0D ; <indirect ref>
  0x031FE9 $9FD9: -D0-I-  .byte $24 ; <indirect ref>
  0x031FEA $9FDA: -D0-I-  .byte $27 ; <indirect ref>
  0x031FEB $9FDB: -D0-I-  .byte $F7 ; <indirect ref>
  0x031FEC $9FDC: -D0-I-  .byte $03 ; <indirect ref>
  0x031FED $9FDD: -D0-I-  .byte $FC ; <indirect ref>
  0x031FEE $9FDE: -D0-I-  .byte $F3 ; <indirect ref>
  0x031FEF $9FDF: -D0-I-  .byte $BF ; <indirect ref>
  0x031FF0 $9FE0: -D0-I-  .byte $9F ; <indirect ref>
  0x031FF1 $9FE1: -D0-I-  .byte $F5 ; <indirect ref>
  0x031FF2 $9FE2: -D0-I-  .byte $02 ; <indirect ref>
  0x031FF3 $9FE3: -D0-I-  .byte $E8 ; <indirect ref>
  0x031FF4 $9FE4: -D0-I-  .byte $1C ; <indirect ref>
  0x031FF5 $9FE5: -D0-I-  .byte $0B ; <indirect ref>
  0x031FF6 $9FE6: -D0-I-  .byte $01 ; <indirect ref>
  0x031FF7 $9FE7: -D0-I-  .byte $00 ; <indirect ref>
  0x031FF8 $9FE8: -D0-I-  .byte $0A ; <indirect ref>
  0x031FF9 $9FE9: -D0-I-  .byte $19 ; <indirect ref>
  0x031FFA $9FEA: -D0-I-  .byte $0B ; <indirect ref>
  0x031FFB $9FEB: -D0-I-  .byte $07 ; <indirect ref>
  0x031FFC $9FEC: -D0-I-  .byte $AE ; <indirect ref>
  0x031FFD $9FED: -D0-I-  .byte $2E ; <indirect ref>
  0x031FFE $9FEE: -D0-I-  .byte $15 ; <indirect ref>
  0x031FFF $9FEF: -D0-I-  .byte $00 ; <indirect ref>
  0x032000 $9FF0: -D0-I-  .byte $0C ; <indirect ref>
  0x032001 $9FF1: -D0-I-  .byte $01 ; <indirect ref>
  0x032002 $9FF2: -D0-I-  .byte $02 ; <indirect ref>
  0x032003 $9FF3: -D0-I-  .byte $FC ; <indirect ref>
  0x032004 $9FF4: ------  .byte $04
  0x032005 $9FF5: -D0-I-  .byte $13 ; <indirect ref>
  0x032006 $9FF6: -D0-I-  .byte $2E ; <indirect ref>
  0x032007 $9FF7: -D0-I-  .byte $06 ; <indirect ref>
  0x032008 $9FF8: -D0-I-  .byte $02 ; <indirect ref>
  0x032009 $9FF9: -D0-I-  .byte $16 ; <indirect ref>
  0x03200A $9FFA: -D0-I-  .byte $00 ; <indirect ref>
  0x03200B $9FFB: -D0-I-  .byte $15 ; <indirect ref>
  0x03200C $9FFC: -D0-I-  .byte $29 ; <indirect ref>
  0x03200D $9FFD: -D0-I-  .byte $19 ; <indirect ref>
  0x03200E $9FFE: -D0-I-  .byte $06 ; <indirect ref>
  0x03200F $9FFF: -D0-I-  .byte $78 ; <indirect ref>