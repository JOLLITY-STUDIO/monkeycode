.segment "???"
.include "bank_ram.inc"
; 0x030010-0x03200F

- - - - - - 0x030010 0C:8000: 4C        .byte $4C   ; <L>
- - - - - - 0x030011 0C:8001: 0F        .byte $0F   ; 
C - - - - - 0x030012 0C:8002: 80        UNDEFINED
C - - - - - 0x030013 0C:8003: 4C F8 86  JMP $86F8
C - - - - - 0x030016 0C:8006: 4C 79 87  JMP $8779
C - - - - - 0x030019 0C:8009: 4C E6 87  JMP $87E6
C - - - - - 0x03001C 0C:800C: 4C 51 88  JMP $8851
C D 0 - - - 0x03001F 0C:800F: 2C 3F 06  BIT ram_063F
C - - - - - 0x030022 0C:8012: 10 03     BPL $8017
C - - - - - 0x030024 0C:8014: 4C 12 C5  JMP $C512
C - - - - - 0x030027 0C:8017: A9 20     LDA #$20
C - - - - - 0x030029 0C:8019: 85 5F     STA ram_005F
C - - - - - 0x03002B 0C:801B: A9 92     LDA #$92
C - - - - - 0x03002D 0C:801D: 85 60     STA ram_0060
C - - - - - 0x03002F 0C:801F: AD EA 05  LDA ram_05EA
C - - - - - 0x030032 0C:8022: 0A        ASL
C - - - - - 0x030033 0C:8023: 90 02     BCC $8027
C - - - - - 0x030035 0C:8025: E6 60     INC ram_0060
C - - - - - 0x030037 0C:8027: A8        TAY
C - - - - - 0x030038 0C:8028: B1 5F     LDA (ram_005F),Y
C - - - - - 0x03003A 0C:802A: AA        TAX
C - - - - - 0x03003B 0C:802B: C8        INY
C - - - - - 0x03003C 0C:802C: B1 5F     LDA (ram_005F),Y
C - - - - - 0x03003E 0C:802E: 85 60     STA ram_0060
C - - - - - 0x030040 0C:8030: 86 5F     STX ram_005F
C - - - - - 0x030042 0C:8032: A9 00     LDA #$00
C - - - - - 0x030044 0C:8034: 8D E9 05  STA ram_05E9
C - - - - - 0x030047 0C:8037: 8D E5 05  STA ram_05E5
C - - - - - 0x03004A 0C:803A: 8D E4 05  STA ram_05E4
C - - - - - 0x03004D 0C:803D: 8D F4 05  STA ram_05F4
C - - - - - 0x030050 0C:8040: A9 01     LDA #$01
C - - - - - 0x030052 0C:8042: 8D E3 05  STA ram_05E3
C D 0 - - - 0x030055 0C:8045: A9 01     LDA #$01
C - - - - - 0x030057 0C:8047: 20 15 C5  JSR $C515
C - - - - - 0x03005A 0C:804A: 20 53 80  JSR $8053
C - - - - - 0x03005D 0C:804D: 20 60 C5  JSR $C560
C - - - - - 0x030060 0C:8050: 4C 45 80  JMP $8045
C - - - - - 0x030063 0C:8053: AD E3 05  LDA ram_05E3
C - - - - - 0x030066 0C:8056: D0 01     BNE $8059
C - - - - - 0x030068 0C:8058: 60        RTS
C - - - - - 0x030069 0C:8059: AD E9 05  LDA ram_05E9
C - - - - - 0x03006C 0C:805C: F0 04     BEQ $8062
C - - - - - 0x03006E 0C:805E: CE E9 05  DEC ram_05E9
C - - - - - 0x030071 0C:8061: 60        RTS
C - - - - - 0x030072 0C:8062: AD E4 05  LDA ram_05E4
C - - - - - 0x030075 0C:8065: 20 09 C5  JSR $C509
- D 0 - I - 0x030078 0C:8068: 6E        .byte $6E   ; <n>
- D 0 - I - 0x030079 0C:8069: 80        .byte $80   ; 
- D 0 - I - 0x03007A 0C:806A: 18        .byte $18   ; 
- D 0 - I - 0x03007B 0C:806B: 82        .byte $82   ; 
- D 0 - I - 0x03007C 0C:806C: F2        .byte $F2   ; 
- D 0 - I - 0x03007D 0C:806D: 82        .byte $82   ; 
C D 0 J - - 0x03007E 0C:806E: AC E5 05  LDY ram_05E5
C - - - - - 0x030081 0C:8071: EE E5 05  INC ram_05E5
C - - - - - 0x030084 0C:8074: B1 5F     LDA (ram_005F),Y
C - - - - - 0x030086 0C:8076: C9 F0     CMP #$F0
C - - - - - 0x030088 0C:8078: 90 06     BCC $8080
C - - - - - 0x03008A 0C:807A: 20 87 80  JSR $8087
C - - - - - 0x03008D 0C:807D: 4C 6E 80  JMP $806E
C - - - - - 0x030090 0C:8080: 8D E9 05  STA ram_05E9
C - - - - - 0x030093 0C:8083: EE E4 05  INC ram_05E4
C - - - - - 0x030096 0C:8086: 60        RTS
C - - - - - 0x030097 0C:8087: 29 0F     AND #$0F
C - - - - - 0x030099 0C:8089: 20 09 C5  JSR $C509
- D 0 - I - 0x03009C 0C:808C: 98        .byte $98   ; 
- D 0 - I - 0x03009D 0C:808D: 80        .byte $80   ; 
- - - - - - 0x03009E 0C:808E: A0        .byte $A0   ; 
- - - - - - 0x03009F 0C:808F: 80        .byte $80   ; 
- D 0 - I - 0x0300A0 0C:8090: B5        .byte $B5   ; 
- D 0 - I - 0x0300A1 0C:8091: 80        .byte $80   ; 
- D 0 - I - 0x0300A2 0C:8092: B8        .byte $B8   ; 
- D 0 - I - 0x0300A3 0C:8093: 80        .byte $80   ; 
- D 0 - I - 0x0300A4 0C:8094: CB        .byte $CB   ; 
- D 0 - I - 0x0300A5 0C:8095: 80        .byte $80   ; 
- D 0 - I - 0x0300A6 0C:8096: FD        .byte $FD   ; 
- D 0 - I - 0x0300A7 0C:8097: 81        .byte $81   ; 
C - - J - - 0x0300A8 0C:8098: A9 00     LDA #$00
C - - - - - 0x0300AA 0C:809A: 8D E3 05  STA ram_05E3
C - - - - - 0x0300AD 0C:809D: 68        PLA
C - - - - - 0x0300AE 0C:809E: 68        PLA
C - - - - - 0x0300AF 0C:809F: 60        RTS
- - - - - - 0x0300B0 0C:80A0: A9        .byte $A9   ; 
- - - - - - 0x0300B1 0C:80A1: 01        .byte $01   ; 
- - - - - - 0x0300B2 0C:80A2: 20        .byte $20   ; 
- - - - - - 0x0300B3 0C:80A3: 15        .byte $15   ; 
- - - - - - 0x0300B4 0C:80A4: C5        .byte $C5   ; 
- - - - - - 0x0300B5 0C:80A5: AD        .byte $AD   ; 
- - - - - - 0x0300B6 0C:80A6: 1C        .byte $1C   ; 
- - - - - - 0x0300B7 0C:80A7: 00        .byte $00   ; 
- - - - - - 0x0300B8 0C:80A8: 10        .byte $10   ; 
- - - - - - 0x0300B9 0C:80A9: F6        .byte $F6   ; 
- - - - - - 0x0300BA 0C:80AA: A9        .byte $A9   ; 
- - - - - - 0x0300BB 0C:80AB: 00        .byte $00   ; 
- - - - - - 0x0300BC 0C:80AC: 8D        .byte $8D   ; 
- - - - - - 0x0300BD 0C:80AD: E9        .byte $E9   ; 
- - - - - - 0x0300BE 0C:80AE: 05        .byte $05   ; 
- - - - - - 0x0300BF 0C:80AF: EE        .byte $EE   ; 
- - - - - - 0x0300C0 0C:80B0: E4        .byte $E4   ; 
- - - - - - 0x0300C1 0C:80B1: 05        .byte $05   ; 
- - - - - - 0x0300C2 0C:80B2: 68        .byte $68   ; <h>
- - - - - - 0x0300C3 0C:80B3: 68        .byte $68   ; <h>
- - - - - - 0x0300C4 0C:80B4: 60        .byte $60   ; 
C - - J - - 0x0300C5 0C:80B5: 4C 2D C5  JMP $C52D
C - - J - - 0x0300C8 0C:80B8: AC E5 05  LDY ram_05E5
C - - - - - 0x0300CB 0C:80BB: B1 5F     LDA (ram_005F),Y
C - - - - - 0x0300CD 0C:80BD: AA        TAX
C - - - - - 0x0300CE 0C:80BE: C8        INY
C - - - - - 0x0300CF 0C:80BF: B1 5F     LDA (ram_005F),Y
C - - - - - 0x0300D1 0C:80C1: 85 60     STA ram_0060
C - - - - - 0x0300D3 0C:80C3: 86 5F     STX ram_005F
C - - - - - 0x0300D5 0C:80C5: A9 00     LDA #$00
C - - - - - 0x0300D7 0C:80C7: 8D E5 05  STA ram_05E5
C - - - - - 0x0300DA 0C:80CA: 60        RTS
C - - J - - 0x0300DB 0C:80CB: AC E5 05  LDY ram_05E5
C - - - - - 0x0300DE 0C:80CE: B1 5F     LDA (ram_005F),Y
C - - - - - 0x0300E0 0C:80D0: 20 EA 80  JSR $80EA
C - - - - - 0x0300E3 0C:80D3: 8A        TXA
C - - - - - 0x0300E4 0C:80D4: 0A        ASL
C - - - - - 0x0300E5 0C:80D5: 38        SEC
C - - - - - 0x0300E6 0C:80D6: 6D E5 05  ADC ram_05E5
C - - - - - 0x0300E9 0C:80D9: A8        TAY
C - - - - - 0x0300EA 0C:80DA: B1 5F     LDA (ram_005F),Y
C - - - - - 0x0300EC 0C:80DC: AA        TAX
C - - - - - 0x0300ED 0C:80DD: C8        INY
C - - - - - 0x0300EE 0C:80DE: B1 5F     LDA (ram_005F),Y
C - - - - - 0x0300F0 0C:80E0: 86 5F     STX ram_005F
C - - - - - 0x0300F2 0C:80E2: 85 60     STA ram_0060
C - - - - - 0x0300F4 0C:80E4: A9 00     LDA #$00
C - - - - - 0x0300F6 0C:80E6: 8D E5 05  STA ram_05E5
C - - - - - 0x0300F9 0C:80E9: 60        RTS
C - - - - - 0x0300FA 0C:80EA: 20 09 C5  JSR $C509
- - - - - - 0x0300FD 0C:80ED: FD        .byte $FD   ; 
- - - - - - 0x0300FE 0C:80EE: 80        .byte $80   ; 
- D 0 - I - 0x0300FF 0C:80EF: 06        .byte $06   ; 
- D 0 - I - 0x030100 0C:80F0: 81        .byte $81   ; 
- D 0 - I - 0x030101 0C:80F1: 0E        .byte $0E   ; 
- D 0 - I - 0x030102 0C:80F2: 81        .byte $81   ; 
- D 0 - I - 0x030103 0C:80F3: 1E        .byte $1E   ; 
- D 0 - I - 0x030104 0C:80F4: 81        .byte $81   ; 
- D 0 - I - 0x030105 0C:80F5: 22        .byte $22   ; 
- D 0 - I - 0x030106 0C:80F6: 81        .byte $81   ; 
- D 0 - I - 0x030107 0C:80F7: 38        .byte $38   ; <8>
- D 0 - I - 0x030108 0C:80F8: 81        .byte $81   ; 
- D 0 - I - 0x030109 0C:80F9: CE        .byte $CE   ; 
- D 0 - I - 0x03010A 0C:80FA: 81        .byte $81   ; 
- D 0 - I - 0x03010B 0C:80FB: E4        .byte $E4   ; 
- D 0 - I - 0x03010C 0C:80FC: 81        .byte $81   ; 
- - - - - - 0x03010D 0C:80FD: A2        .byte $A2   ; 
- - - - - - 0x03010E 0C:80FE: 00        .byte $00   ; 
- - - - - - 0x03010F 0C:80FF: 2C        .byte $2C   ; 
- - - - - - 0x030110 0C:8100: 3C        .byte $3C   ; 
- - - - - - 0x030111 0C:8101: 04        .byte $04   ; 
- - - - - - 0x030112 0C:8102: 10        .byte $10   ; 
- - - - - - 0x030113 0C:8103: 01        .byte $01   ; 
- - - - - - 0x030114 0C:8104: E8        .byte $E8   ; 
- - - - - - 0x030115 0C:8105: 60        .byte $60   ; 
C - - J - - 0x030116 0C:8106: AE FB 05  LDX ram_05FB
C - - - - - 0x030119 0C:8109: F0 02     BEQ $810D
C - - - - - 0x03011B 0C:810B: A2 01     LDX #$01
C - - - - - 0x03011D 0C:810D: 60        RTS
C - - J - - 0x03011E 0C:810E: AE 00 06  LDX ram_0600
C - - - - - 0x030121 0C:8111: F0 08     BEQ $811B
C - - - - - 0x030123 0C:8113: CA        DEX
C - - - - - 0x030124 0C:8114: E0 03     CPX #$03
C - - - - - 0x030126 0C:8116: 90 02     BCC $811A
C - - - - - 0x030128 0C:8118: A2 02     LDX #$02
C - - - - - 0x03012A 0C:811A: 60        RTS
- - - - - - 0x03012B 0C:811B: A2        .byte $A2   ; 
- - - - - - 0x03012C 0C:811C: 03        .byte $03   ; 
- - - - - - 0x03012D 0C:811D: 60        .byte $60   ; 
C - - J - - 0x03012E 0C:811E: AE 29 06  LDX ram_0629
C - - - - - 0x030131 0C:8121: 60        RTS
C - - J - - 0x030132 0C:8122: A2 00     LDX #$00
C - - - - - 0x030134 0C:8124: A5 26     LDA ram_0026
C - - - - - 0x030136 0C:8126: DD 31 81  CMP $8131,X
C - - - - - 0x030139 0C:8129: 90 05     BCC $8130
C - - - - - 0x03013B 0C:812B: F0 03     BEQ $8130
C - - - - - 0x03013D 0C:812D: E8        INX
C - - - - - 0x03013E 0C:812E: D0 F6     BNE $8126
C - - - - - 0x030140 0C:8130: 60        RTS
- D 0 - - - 0x030141 0C:8131: 05        .byte $05   ; 
- D 0 - - - 0x030142 0C:8132: 0B        .byte $0B   ; 
- D 0 - - - 0x030143 0C:8133: 0F        .byte $0F   ; 
- D 0 - - - 0x030144 0C:8134: 15        .byte $15   ; 
- D 0 - - - 0x030145 0C:8135: 16        .byte $16   ; 
- D 0 - - - 0x030146 0C:8136: 1A        .byte $1A   ; 
- D 0 - - - 0x030147 0C:8137: 21        .byte $21   ; 
C - - J - - 0x030148 0C:8138: A5 27     LDA ram_0027
C - - - - - 0x03014A 0C:813A: 20 09 C5  JSR $C509
- D 0 - I - 0x03014D 0C:813D: 47        .byte $47   ; <G>
- D 0 - I - 0x03014E 0C:813E: 81        .byte $81   ; 
- D 0 - I - 0x03014F 0C:813F: 56        .byte $56   ; <V>
- D 0 - I - 0x030150 0C:8140: 81        .byte $81   ; 
- D 0 - I - 0x030151 0C:8141: 47        .byte $47   ; <G>
- D 0 - I - 0x030152 0C:8142: 81        .byte $81   ; 
- D 0 - I - 0x030153 0C:8143: 56        .byte $56   ; <V>
- D 0 - I - 0x030154 0C:8144: 81        .byte $81   ; 
- D 0 - I - 0x030155 0C:8145: 56        .byte $56   ; <V>
- D 0 - I - 0x030156 0C:8146: 81        .byte $81   ; 
C - - J - - 0x030157 0C:8147: A2 02     LDX #$02
C - - - - - 0x030159 0C:8149: AD 28 00  LDA a: ram_0028
C - - - - - 0x03015C 0C:814C: CD 29 00  CMP a: ram_0029
C - - - - - 0x03015F 0C:814F: F0 04     BEQ $8155
C - - - - - 0x030161 0C:8151: CA        DEX
C - - - - - 0x030162 0C:8152: 90 01     BCC $8155
C - - - - - 0x030164 0C:8154: CA        DEX
C - - - - - 0x030165 0C:8155: 60        RTS
C - - J - - 0x030166 0C:8156: A4 26     LDY ram_0026
C - - - - - 0x030168 0C:8158: B9 AC 81  LDA $81AC,Y
C - - - - - 0x03016B 0C:815B: 85 49     STA ram_0049
C - - - - - 0x03016D 0C:815D: AD 28 00  LDA a: ram_0028
C - - - - - 0x030170 0C:8160: CD 29 00  CMP a: ram_0029
C - - - - - 0x030173 0C:8163: D0 26     BNE $818B
C - - - - - 0x030175 0C:8165: A2 0D     LDX #$0D
C - - - - - 0x030177 0C:8167: AD 27 00  LDA a: ram_0027
C - - - - - 0x03017A 0C:816A: C9 01     CMP #$01
C - - - - - 0x03017C 0C:816C: F0 10     BEQ $817E
C - - - - - 0x03017E 0C:816E: 24 49     BIT ram_0049
C - - - - - 0x030180 0C:8170: 50 02     BVC $8174
C - - - - - 0x030182 0C:8172: E8        INX
C - - - - - 0x030183 0C:8173: 60        RTS
- - - - - - 0x030184 0C:8174: AD        .byte $AD   ; 
- - - - - - 0x030185 0C:8175: 2B        .byte $2B   ; 
- - - - - - 0x030186 0C:8176: 00        .byte $00   ; 
- - - - - - 0x030187 0C:8177: C9        .byte $C9   ; 
- - - - - - 0x030188 0C:8178: 23        .byte $23   ; 
- - - - - - 0x030189 0C:8179: D0        .byte $D0   ; 
- - - - - - 0x03018A 0C:817A: 02        .byte $02   ; 
- - - - - - 0x03018B 0C:817B: A2        .byte $A2   ; 
- - - - - - 0x03018C 0C:817C: 0F        .byte $0F   ; 
- - - - - - 0x03018D 0C:817D: 60        .byte $60   ; 
C - - - - - 0x03018E 0C:817E: A2 0C     LDX #$0C
C - - - - - 0x030190 0C:8180: 24 49     BIT ram_0049
C - - - - - 0x030192 0C:8182: 30 06     BMI $818A
C - - - - - 0x030194 0C:8184: E8        INX
C - - - - - 0x030195 0C:8185: 24 49     BIT ram_0049
C - - - - - 0x030197 0C:8187: 50 01     BVC $818A
C - - - - - 0x030199 0C:8189: E8        INX
C - - - - - 0x03019A 0C:818A: 60        RTS
C - - - - - 0x03019B 0C:818B: B0 0A     BCS $8197
C - - - - - 0x03019D 0C:818D: A2 0A     LDX #$0A
C - - - - - 0x03019F 0C:818F: A5 27     LDA ram_0027
C - - - - - 0x0301A1 0C:8191: C9 04     CMP #$04
C - - - - - 0x0301A3 0C:8193: D0 01     BNE $8196
C - - - - - 0x0301A5 0C:8195: E8        INX
C - - - - - 0x0301A6 0C:8196: 60        RTS
C - - - - - 0x0301A7 0C:8197: A5 49     LDA ram_0049
C - - - - - 0x0301A9 0C:8199: 29 07     AND #$07
C - - - - - 0x0301AB 0C:819B: 18        CLC
C - - - - - 0x0301AC 0C:819C: 69 03     ADC #$03
C - - - - - 0x0301AE 0C:819E: AA        TAX
C - - - - - 0x0301AF 0C:819F: E0 03     CPX #$03
C - - - - - 0x0301B1 0C:81A1: D0 08     BNE $81AB
C - - - - - 0x0301B3 0C:81A3: A5 27     LDA ram_0027
C - - - - - 0x0301B5 0C:81A5: C9 03     CMP #$03
C - - - - - 0x0301B7 0C:81A7: D0 02     BNE $81AB
C - - - - - 0x0301B9 0C:81A9: A2 09     LDX #$09
C - - - - - 0x0301BB 0C:81AB: 60        RTS
- D 0 - - - 0x0301BC 0C:81AC: C0        .byte $C0   ; 
- D 0 - - - 0x0301BD 0C:81AD: C0        .byte $C0   ; 
- D 0 - - - 0x0301BE 0C:81AE: C0        .byte $C0   ; 
- D 0 - - - 0x0301BF 0C:81AF: C0        .byte $C0   ; 
- D 0 - - - 0x0301C0 0C:81B0: C1        .byte $C1   ; 
- D 0 - - - 0x0301C1 0C:81B1: C2        .byte $C2   ; 
- D 0 - - - 0x0301C2 0C:81B2: 40        .byte $40   ; 
- D 0 - - - 0x0301C3 0C:81B3: 40        .byte $40   ; 
- D 0 - - - 0x0301C4 0C:81B4: 40        .byte $40   ; 
- D 0 - - - 0x0301C5 0C:81B5: 40        .byte $40   ; 
- D 0 - - - 0x0301C6 0C:81B6: 41        .byte $41   ; <A>
- D 0 - - - 0x0301C7 0C:81B7: C2        .byte $C2   ; 
- D 0 - - - 0x0301C8 0C:81B8: C0        .byte $C0   ; 
- D 0 - - - 0x0301C9 0C:81B9: C0        .byte $C0   ; 
- D 0 - - - 0x0301CA 0C:81BA: C1        .byte $C1   ; 
- D 0 - - - 0x0301CB 0C:81BB: C3        .byte $C3   ; 
- D 0 - - - 0x0301CC 0C:81BC: C0        .byte $C0   ; 
- D 0 - - - 0x0301CD 0C:81BD: C0        .byte $C0   ; 
- D 0 - - - 0x0301CE 0C:81BE: C0        .byte $C0   ; 
- D 0 - - - 0x0301CF 0C:81BF: C0        .byte $C0   ; 
- D 0 - - - 0x0301D0 0C:81C0: C1        .byte $C1   ; 
- D 0 - - - 0x0301D1 0C:81C1: C2        .byte $C2   ; 
- D 0 - - - 0x0301D2 0C:81C2: 00        .byte $00   ; 
- D 0 - - - 0x0301D3 0C:81C3: C0        .byte $C0   ; 
- D 0 - - - 0x0301D4 0C:81C4: C0        .byte $C0   ; 
- D 0 - - - 0x0301D5 0C:81C5: C0        .byte $C0   ; 
- D 0 - - - 0x0301D6 0C:81C6: C0        .byte $C0   ; 
- D 0 - - - 0x0301D7 0C:81C7: C0        .byte $C0   ; 
- D 0 - - - 0x0301D8 0C:81C8: C0        .byte $C0   ; 
- D 0 - - - 0x0301D9 0C:81C9: C0        .byte $C0   ; 
- D 0 - - - 0x0301DA 0C:81CA: C4        .byte $C4   ; 
- D 0 - - - 0x0301DB 0C:81CB: C5        .byte $C5   ; 
- D 0 - - - 0x0301DC 0C:81CC: 86        .byte $86   ; 
- - - - - - 0x0301DD 0C:81CD: C6        .byte $C6   ; 
C - - J - - 0x0301DE 0C:81CE: AD 16 06  LDA ram_0616
C - - - - - 0x0301E1 0C:81D1: 4A        LSR
C - - - - - 0x0301E2 0C:81D2: A2 00     LDX #$00
C - - - - - 0x0301E4 0C:81D4: C9 01     CMP #$01
C - - - - - 0x0301E6 0C:81D6: 90 0B     BCC $81E3
C - - - - - 0x0301E8 0C:81D8: E8        INX
C - - - - - 0x0301E9 0C:81D9: C9 05     CMP #$05
C - - - - - 0x0301EB 0C:81DB: 90 06     BCC $81E3
C - - - - - 0x0301ED 0C:81DD: E8        INX
C - - - - - 0x0301EE 0C:81DE: C9 06     CMP #$06
C - - - - - 0x0301F0 0C:81E0: 90 01     BCC $81E3
C - - - - - 0x0301F2 0C:81E2: E8        INX
C - - - - - 0x0301F3 0C:81E3: 60        RTS
C - - J - - 0x0301F4 0C:81E4: AD FB 05  LDA ram_05FB
C - - - - - 0x0301F7 0C:81E7: 49 0B     EOR #$0B
C - - - - - 0x0301F9 0C:81E9: 20 0C C5  JSR $C50C
C - - - - - 0x0301FC 0C:81EC: A2 00     LDX #$00
C - - - - - 0x0301FE 0C:81EE: A0 07     LDY #$07
C - - - - - 0x030200 0C:81F0: B1 34     LDA (ram_0034),Y
C - - - - - 0x030202 0C:81F2: C9 19     CMP #$19
C - - - - - 0x030204 0C:81F4: 90 06     BCC $81FC
C - - - - - 0x030206 0C:81F6: E8        INX
C - - - - - 0x030207 0C:81F7: C9 36     CMP #$36
C - - - - - 0x030209 0C:81F9: 90 01     BCC $81FC
C - - - - - 0x03020B 0C:81FB: E8        INX
C - - - - - 0x03020C 0C:81FC: 60        RTS
C - - J - - 0x03020D 0C:81FD: 20 2D C5  JSR $C52D
C - - - - - 0x030210 0C:8200: A9 0D     LDA #$0D
C - - - - - 0x030212 0C:8202: 8D F3 05  STA ram_05F3
C - - - - - 0x030215 0C:8205: A9 80     LDA #$80
C - - - - - 0x030217 0C:8207: 8D F4 05  STA ram_05F4
C - - - - - 0x03021A 0C:820A: AC E5 05  LDY ram_05E5
C - - - - - 0x03021D 0C:820D: B1 5F     LDA (ram_005F),Y
C - - - - - 0x03021F 0C:820F: 8D E9 05  STA ram_05E9
C - - - - - 0x030222 0C:8212: EE E5 05  INC ram_05E5
C - - - - - 0x030225 0C:8215: 68        PLA
C - - - - - 0x030226 0C:8216: 68        PLA
C - - - - - 0x030227 0C:8217: 60        RTS
C - - J - - 0x030228 0C:8218: AC E5 05  LDY ram_05E5
C - - - - - 0x03022B 0C:821B: B1 5F     LDA (ram_005F),Y
C - - - - - 0x03022D 0C:821D: C9 90     CMP #$90
C - - - - - 0x03022F 0C:821F: B0 0D     BCS $822E
C - - - - - 0x030231 0C:8221: 29 0F     AND #$0F
C - - - - - 0x030233 0C:8223: 8D F3 05  STA ram_05F3
C - - - - - 0x030236 0C:8226: A9 80     LDA #$80
C - - - - - 0x030238 0C:8228: 8D F4 05  STA ram_05F4
C - - - - - 0x03023B 0C:822B: 4C 34 82  JMP $8234
C - - - - - 0x03023E 0C:822E: 20 2D C5  JSR $C52D
C - - - - - 0x030241 0C:8231: AC E5 05  LDY ram_05E5
C D 0 - - - 0x030244 0C:8234: B1 5F     LDA (ram_005F),Y
C - - - - - 0x030246 0C:8236: 4A        LSR
C - - - - - 0x030247 0C:8237: 4A        LSR
C - - - - - 0x030248 0C:8238: 4A        LSR
C - - - - - 0x030249 0C:8239: 4A        LSR
C - - - - - 0x03024A 0C:823A: AA        TAX
C - - - - - 0x03024B 0C:823B: BD B8 86  LDA $86B8,X
C - - - - - 0x03024E 0C:823E: 8D E6 05  STA ram_05E6
C - - - - - 0x030251 0C:8241: 8A        TXA
C - - - - - 0x030252 0C:8242: 0A        ASL
C - - - - - 0x030253 0C:8243: 48        PHA
C - - - - - 0x030254 0C:8244: AA        TAX
C - - - - - 0x030255 0C:8245: BD C2 8D  LDA $8DC2,X
C - - - - - 0x030258 0C:8248: 85 61     STA ram_0061
C - - - - - 0x03025A 0C:824A: BD C3 8D  LDA $8DC3,X
C - - - - - 0x03025D 0C:824D: 85 62     STA ram_0062
C - - - - - 0x03025F 0C:824F: A0 00     LDY #$00
C - - - - - 0x030261 0C:8251: B1 61     LDA (ram_0061),Y
C - - - - - 0x030263 0C:8253: 48        PHA
C - - - - - 0x030264 0C:8254: C8        INY
C - - - - - 0x030265 0C:8255: B1 61     LDA (ram_0061),Y
C - - - - - 0x030267 0C:8257: 48        PHA
C - - - - - 0x030268 0C:8258: C8        INY
C - - - - - 0x030269 0C:8259: B1 61     LDA (ram_0061),Y
C - - - - - 0x03026B 0C:825B: 8D E7 05  STA ram_05E7
C - - - - - 0x03026E 0C:825E: C8        INY
C - - - - - 0x03026F 0C:825F: A9 06     LDA #$06
C - - - - - 0x030271 0C:8261: 8D E8 05  STA ram_05E8
C - - - - - 0x030274 0C:8264: A9 01     LDA #$01
C - - - - - 0x030276 0C:8266: 20 15 C5  JSR $C515
C - - - - - 0x030279 0C:8269: AD 15 05  LDA ram_0515
C - - - - - 0x03027C 0C:826C: D0 F6     BNE $8264
C - - - - - 0x03027E 0C:826E: A9 01     LDA #$01
C - - - - - 0x030280 0C:8270: 8D 15 05  STA ram_0515
C - - - - - 0x030283 0C:8273: A9 02     LDA #$02
C - - - - - 0x030285 0C:8275: 85 3B     STA ram_003B
C - - - - - 0x030287 0C:8277: A2 00     LDX #$00
C - - - - - 0x030289 0C:8279: AD E7 05  LDA ram_05E7
C - - - - - 0x03028C 0C:827C: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03028F 0C:827F: 68        PLA
C - - - - - 0x030290 0C:8280: 9D A7 04  STA ram_04A7,X
C - - - - - 0x030293 0C:8283: 68        PLA
C - - - - - 0x030294 0C:8284: 9D A6 04  STA ram_04A6,X
C - - - - - 0x030297 0C:8287: 18        CLC
C - - - - - 0x030298 0C:8288: 69 20     ADC #$20
C - - - - - 0x03029A 0C:828A: 48        PHA
C - - - - - 0x03029B 0C:828B: BD A7 04  LDA ram_04A7,X
C - - - - - 0x03029E 0C:828E: 69 00     ADC #$00
C - - - - - 0x0302A0 0C:8290: 48        PHA
C - - - - - 0x0302A1 0C:8291: E8        INX
C - - - - - 0x0302A2 0C:8292: E8        INX
C - - - - - 0x0302A3 0C:8293: E8        INX
C - - - - - 0x0302A4 0C:8294: B1 61     LDA (ram_0061),Y
C - - - - - 0x0302A6 0C:8296: 10 11     BPL $82A9
C - - - - - 0x0302A8 0C:8298: 29 7F     AND #$7F
C - - - - - 0x0302AA 0C:829A: 85 3A     STA ram_003A
C - - - - - 0x0302AC 0C:829C: C8        INY
C - - - - - 0x0302AD 0C:829D: A9 00     LDA #$00
C - - - - - 0x0302AF 0C:829F: 9D A5 04  STA ram_04A5,X
C - - - - - 0x0302B2 0C:82A2: E8        INX
C - - - - - 0x0302B3 0C:82A3: C6 3A     DEC ram_003A
C - - - - - 0x0302B5 0C:82A5: D0 F8     BNE $829F
C - - - - - 0x0302B7 0C:82A7: F0 0E     BEQ $82B7
C - - - - - 0x0302B9 0C:82A9: 85 3A     STA ram_003A
C - - - - - 0x0302BB 0C:82AB: C8        INY
C - - - - - 0x0302BC 0C:82AC: B1 61     LDA (ram_0061),Y
C - - - - - 0x0302BE 0C:82AE: 9D A5 04  STA ram_04A5,X
C - - - - - 0x0302C1 0C:82B1: C8        INY
C - - - - - 0x0302C2 0C:82B2: E8        INX
C - - - - - 0x0302C3 0C:82B3: C6 3A     DEC ram_003A
C - - - - - 0x0302C5 0C:82B5: D0 F5     BNE $82AC
C - - - - - 0x0302C7 0C:82B7: 8A        TXA
C - - - - - 0x0302C8 0C:82B8: 38        SEC
C - - - - - 0x0302C9 0C:82B9: E9 03     SBC #$03
C - - - - - 0x0302CB 0C:82BB: CD A5 04  CMP ram_04A5
C - - - - - 0x0302CE 0C:82BE: F0 B9     BEQ $8279
C - - - - - 0x0302D0 0C:82C0: 90 D2     BCC $8294
C - - - - - 0x0302D2 0C:82C2: ED A5 04  SBC ram_04A5
C - - - - - 0x0302D5 0C:82C5: E9 03     SBC #$03
C - - - - - 0x0302D7 0C:82C7: CD A5 04  CMP ram_04A5
C - - - - - 0x0302DA 0C:82CA: 90 C8     BCC $8294
C - - - - - 0x0302DC 0C:82CC: A9 00     LDA #$00
C - - - - - 0x0302DE 0C:82CE: 9D A5 04  STA ram_04A5,X
C - - - - - 0x0302E1 0C:82D1: A9 80     LDA #$80
C - - - - - 0x0302E3 0C:82D3: 8D 15 05  STA ram_0515
C - - - - - 0x0302E6 0C:82D6: CE E8 05  DEC ram_05E8
C - - - - - 0x0302E9 0C:82D9: D0 89     BNE $8264
C - - - - - 0x0302EB 0C:82DB: 68        PLA
C - - - - - 0x0302EC 0C:82DC: 68        PLA
C - - - - - 0x0302ED 0C:82DD: 68        PLA
C - - - - - 0x0302EE 0C:82DE: AA        TAX
C - - - - - 0x0302EF 0C:82DF: BD C8 86  LDA $86C8,X
C - - - - - 0x0302F2 0C:82E2: 8D E7 05  STA ram_05E7
C - - - - - 0x0302F5 0C:82E5: BD C9 86  LDA $86C9,X
C - - - - - 0x0302F8 0C:82E8: 8D E8 05  STA ram_05E8
C - - - - - 0x0302FB 0C:82EB: EE E5 05  INC ram_05E5
C - - - - - 0x0302FE 0C:82EE: EE E4 05  INC ram_05E4
C - - - - - 0x030301 0C:82F1: 60        RTS
C - - J - - 0x030302 0C:82F2: A9 01     LDA #$01
C - - - - - 0x030304 0C:82F4: 20 15 C5  JSR $C515
C - - - - - 0x030307 0C:82F7: AD 15 05  LDA ram_0515
C - - - - - 0x03030A 0C:82FA: D0 F6     BNE $82F2
C - - - - - 0x03030C 0C:82FC: A9 01     LDA #$01
C - - - - - 0x03030E 0C:82FE: 8D 15 05  STA ram_0515
C - - - - - 0x030311 0C:8301: AD E6 05  LDA ram_05E6
C - - - - - 0x030314 0C:8304: 0A        ASL
C - - - - - 0x030315 0C:8305: 18        CLC
C - - - - - 0x030316 0C:8306: 69 06     ADC #$06
C - - - - - 0x030318 0C:8308: A8        TAY
C - - - - - 0x030319 0C:8309: C8        INY
C - - - - - 0x03031A 0C:830A: A2 00     LDX #$00
C - - - - - 0x03031C 0C:830C: 8A        TXA
C - - - - - 0x03031D 0C:830D: 9D A5 04  STA ram_04A5,X
C - - - - - 0x030320 0C:8310: E8        INX
C - - - - - 0x030321 0C:8311: 88        DEY
C - - - - - 0x030322 0C:8312: 10 F9     BPL $830D
C - - - - - 0x030324 0C:8314: AD E6 05  LDA ram_05E6
C - - - - - 0x030327 0C:8317: 18        CLC
C - - - - - 0x030328 0C:8318: 69 03     ADC #$03
C - - - - - 0x03032A 0C:831A: 85 3A     STA ram_003A
C - - - - - 0x03032C 0C:831C: AA        TAX
C - - - - - 0x03032D 0C:831D: AD E6 05  LDA ram_05E6
C - - - - - 0x030330 0C:8320: 8D A5 04  STA ram_04A5
C - - - - - 0x030333 0C:8323: 9D A5 04  STA ram_04A5,X
C - - - - - 0x030336 0C:8326: AD E7 05  LDA ram_05E7
C - - - - - 0x030339 0C:8329: 0A        ASL
C - - - - - 0x03033A 0C:832A: A8        TAY
C - - - - - 0x03033B 0C:832B: B9 E8 86  LDA $86E8,Y
C - - - - - 0x03033E 0C:832E: 8D A6 04  STA ram_04A6
C - - - - - 0x030341 0C:8331: 18        CLC
C - - - - - 0x030342 0C:8332: 69 20     ADC #$20
C - - - - - 0x030344 0C:8334: 9D A6 04  STA ram_04A6,X
C - - - - - 0x030347 0C:8337: B9 E9 86  LDA $86E9,Y
C - - - - - 0x03034A 0C:833A: 8D A7 04  STA ram_04A7
C - - - - - 0x03034D 0C:833D: 69 00     ADC #$00
C - - - - - 0x03034F 0C:833F: 9D A7 04  STA ram_04A7,X
C - - - - - 0x030352 0C:8342: A9 00     LDA #$00
C - - - - - 0x030354 0C:8344: 85 3B     STA ram_003B
C D 0 - - - 0x030356 0C:8346: AC E5 05  LDY ram_05E5
C - - - - - 0x030359 0C:8349: EE E5 05  INC ram_05E5
C - - - - - 0x03035C 0C:834C: B1 5F     LDA (ram_005F),Y
C - - - - - 0x03035E 0C:834E: C9 E0     CMP #$E0
C - - - - - 0x030360 0C:8350: 90 06     BCC $8358
C - - - - - 0x030362 0C:8352: 20 5E 83  JSR $835E
C - - - - - 0x030365 0C:8355: 4C 46 83  JMP $8346
C - - - - - 0x030368 0C:8358: 20 29 86  JSR $8629
C - - - - - 0x03036B 0C:835B: 4C 46 83  JMP $8346
C - - - - - 0x03036E 0C:835E: 38        SEC
C - - - - - 0x03036F 0C:835F: E9 E0     SBC #$E0
C - - - - - 0x030371 0C:8361: 20 09 C5  JSR $C509
- D 0 - I - 0x030374 0C:8364: A4        .byte $A4   ; 
- D 0 - I - 0x030375 0C:8365: 83        .byte $83   ; 
- D 0 - I - 0x030376 0C:8366: CA        .byte $CA   ; 
- D 0 - I - 0x030377 0C:8367: 83        .byte $83   ; 
- D 0 - I - 0x030378 0C:8368: E2        .byte $E2   ; 
- D 0 - I - 0x030379 0C:8369: 83        .byte $83   ; 
- D 0 - I - 0x03037A 0C:836A: 43        .byte $43   ; <C>
- D 0 - I - 0x03037B 0C:836B: 84        .byte $84   ; 
- D 0 - I - 0x03037C 0C:836C: 67        .byte $67   ; <g>
- D 0 - I - 0x03037D 0C:836D: 84        .byte $84   ; 
- D 0 - I - 0x03037E 0C:836E: 6D        .byte $6D   ; <m>
- D 0 - I - 0x03037F 0C:836F: 84        .byte $84   ; 
- D 0 - I - 0x030380 0C:8370: 75        .byte $75   ; <u>
- D 0 - I - 0x030381 0C:8371: 84        .byte $84   ; 
- D 0 - I - 0x030382 0C:8372: 8D        .byte $8D   ; 
- D 0 - I - 0x030383 0C:8373: 84        .byte $84   ; 
- D 0 - I - 0x030384 0C:8374: 93        .byte $93   ; 
- D 0 - I - 0x030385 0C:8375: 84        .byte $84   ; 
- D 0 - I - 0x030386 0C:8376: 99        .byte $99   ; 
- D 0 - I - 0x030387 0C:8377: 84        .byte $84   ; 
- D 0 - I - 0x030388 0C:8378: 9F        .byte $9F   ; 
- D 0 - I - 0x030389 0C:8379: 84        .byte $84   ; 
- D 0 - I - 0x03038A 0C:837A: A5        .byte $A5   ; 
- D 0 - I - 0x03038B 0C:837B: 84        .byte $84   ; 
- D 0 - I - 0x03038C 0C:837C: AB        .byte $AB   ; 
- D 0 - I - 0x03038D 0C:837D: 84        .byte $84   ; 
- D 0 - I - 0x03038E 0C:837E: CE        .byte $CE   ; 
- D 0 - I - 0x03038F 0C:837F: 84        .byte $84   ; 
- D 0 - I - 0x030390 0C:8380: D6        .byte $D6   ; 
- D 0 - I - 0x030391 0C:8381: 84        .byte $84   ; 
- - - - - - 0x030392 0C:8382: DC        .byte $DC   ; 
- - - - - - 0x030393 0C:8383: 84        .byte $84   ; 
- D 0 - I - 0x030394 0C:8384: DC        .byte $DC   ; 
- D 0 - I - 0x030395 0C:8385: 84        .byte $84   ; 
- D 0 - I - 0x030396 0C:8386: E6        .byte $E6   ; 
- D 0 - I - 0x030397 0C:8387: 84        .byte $84   ; 
- D 0 - I - 0x030398 0C:8388: EC        .byte $EC   ; 
- D 0 - I - 0x030399 0C:8389: 84        .byte $84   ; 
- D 0 - I - 0x03039A 0C:838A: FB        .byte $FB   ; 
- D 0 - I - 0x03039B 0C:838B: 84        .byte $84   ; 
- D 0 - I - 0x03039C 0C:838C: 07        .byte $07   ; 
- D 0 - I - 0x03039D 0C:838D: 85        .byte $85   ; 
- D 0 - I - 0x03039E 0C:838E: B1        .byte $B1   ; 
- D 0 - I - 0x03039F 0C:838F: 85        .byte $85   ; 
- D 0 - I - 0x0303A0 0C:8390: B6        .byte $B6   ; 
- D 0 - I - 0x0303A1 0C:8391: 85        .byte $85   ; 
- D 0 - I - 0x0303A2 0C:8392: BB        .byte $BB   ; 
- D 0 - I - 0x0303A3 0C:8393: 85        .byte $85   ; 
- D 0 - I - 0x0303A4 0C:8394: D0        .byte $D0   ; 
- D 0 - I - 0x0303A5 0C:8395: 85        .byte $85   ; 
- - - - - - 0x0303A6 0C:8396: D5        .byte $D5   ; 
- - - - - - 0x0303A7 0C:8397: 85        .byte $85   ; 
- - - - - - 0x0303A8 0C:8398: D5        .byte $D5   ; 
- - - - - - 0x0303A9 0C:8399: 85        .byte $85   ; 
- - - - - - 0x0303AA 0C:839A: D5        .byte $D5   ; 
- - - - - - 0x0303AB 0C:839B: 85        .byte $85   ; 
- D 0 - I - 0x0303AC 0C:839C: D6        .byte $D6   ; 
- D 0 - I - 0x0303AD 0C:839D: 85        .byte $85   ; 
- - - - - - 0x0303AE 0C:839E: FD        .byte $FD   ; 
- - - - - - 0x0303AF 0C:839F: 85        .byte $85   ; 
- - - - - - 0x0303B0 0C:83A0: FE        .byte $FE   ; 
- - - - - - 0x0303B1 0C:83A1: 85        .byte $85   ; 
- - - - - - 0x0303B2 0C:83A2: 21        .byte $21   ; 
- - - - - - 0x0303B3 0C:83A3: 86        .byte $86   ; 
C - - J - - 0x0303B4 0C:83A4: AD 3B 04  LDA ram_043B
C - - - - - 0x0303B7 0C:83A7: C9 01     CMP #$01
C - - - - - 0x0303B9 0C:83A9: D0 07     BNE $83B2
C - - - - - 0x0303BB 0C:83AB: 2C 28 06  BIT ram_0628
C - - - - - 0x0303BE 0C:83AE: 10 02     BPL $83B2
- - - - - - 0x0303C0 0C:83B0: A9        .byte $A9   ; 
- - - - - - 0x0303C1 0C:83B1: 0A        .byte $0A   ; 
C - - - - - 0x0303C2 0C:83B2: AA        TAX
C - - - - - 0x0303C3 0C:83B3: AD 3C 04  LDA ram_043C
C - - - - - 0x0303C6 0C:83B6: 29 7F     AND #$7F
C - - - - - 0x0303C8 0C:83B8: 18        CLC
C - - - - - 0x0303C9 0C:83B9: 7D BF 83  ADC $83BF,X
C - - - - - 0x0303CC 0C:83BC: 4C 3C 86  JMP $863C
- D 0 - - - 0x0303CF 0C:83BF: 9A        .byte $9A   ; 
- D 0 - - - 0x0303D0 0C:83C0: C4        .byte $C4   ; 
- D 0 - - - 0x0303D1 0C:83C1: BD        .byte $BD   ; 
- D 0 - - - 0x0303D2 0C:83C2: C8        .byte $C8   ; 
- D 0 - - - 0x0303D3 0C:83C3: D9        .byte $D9   ; 
- D 0 - - - 0x0303D4 0C:83C4: DA        .byte $DA   ; 
- D 0 - - - 0x0303D5 0C:83C5: DB        .byte $DB   ; 
- D 0 - - - 0x0303D6 0C:83C6: EC        .byte $EC   ; 
- D 0 - - - 0x0303D7 0C:83C7: EC        .byte $EC   ; 
- D 0 - - - 0x0303D8 0C:83C8: EC        .byte $EC   ; 
- D 0 - - - 0x0303D9 0C:83C9: EB        .byte $EB   ; 
C - - J - - 0x0303DA 0C:83CA: AD 3D 04  LDA ram_043D
C - - - - - 0x0303DD 0C:83CD: 29 1F     AND #$1F
C - - - - - 0x0303DF 0C:83CF: AA        TAX
C - - - - - 0x0303E0 0C:83D0: AD 3E 04  LDA ram_043E
C - - - - - 0x0303E3 0C:83D3: 29 7F     AND #$7F
C - - - - - 0x0303E5 0C:83D5: 18        CLC
C - - - - - 0x0303E6 0C:83D6: 7D DC 83  ADC $83DC,X
C - - - - - 0x0303E9 0C:83D9: 4C 3C 86  JMP $863C
- D 0 - - - 0x0303EC 0C:83DC: CD        .byte $CD   ; 
- D 0 - - - 0x0303ED 0C:83DD: D1        .byte $D1   ; 
- - - - - - 0x0303EE 0C:83DE: D7        .byte $D7   ; 
- D 0 - - - 0x0303EF 0C:83DF: DB        .byte $DB   ; 
- - - - - - 0x0303F0 0C:83E0: DD        .byte $DD   ; 
- - - - - - 0x0303F1 0C:83E1: DF        .byte $DF   ; 
C - - J - - 0x0303F2 0C:83E2: AD 3C 04  LDA ram_043C
C - - - - - 0x0303F5 0C:83E5: 10 2C     BPL $8413
C - - - - - 0x0303F7 0C:83E7: 29 7F     AND #$7F
C - - - - - 0x0303F9 0C:83E9: F0 10     BEQ $83FB
C - - - - - 0x0303FB 0C:83EB: AE 3B 04  LDX ram_043B
C - - - - - 0x0303FE 0C:83EE: D0 0B     BNE $83FB
C - - - - - 0x030400 0C:83F0: C9 03     CMP #$03
C - - - - - 0x030402 0C:83F2: B0 1F     BCS $8413
C - - - - - 0x030404 0C:83F4: AA        TAX
C - - - - - 0x030405 0C:83F5: BD 40 84  LDA $8440,X
C - - - - - 0x030408 0C:83F8: 4C 10 84  JMP $8410
C - - - - - 0x03040B 0C:83FB: AE 3B 04  LDX ram_043B
C - - - - - 0x03040E 0C:83FE: E0 01     CPX #$01
C - - - - - 0x030410 0C:8400: D0 07     BNE $8409
C - - - - - 0x030412 0C:8402: 2C 28 06  BIT ram_0628
C - - - - - 0x030415 0C:8405: 10 02     BPL $8409
C - - - - - 0x030417 0C:8407: A2 0A     LDX #$0A
C - - - - - 0x030419 0C:8409: BD 35 84  LDA $8435,X
C - - - - - 0x03041C 0C:840C: C9 FF     CMP #$FF
C - - - - - 0x03041E 0C:840E: F0 03     BEQ $8413
C D 0 - - - 0x030420 0C:8410: 20 3C 86  JSR $863C
C - - - - - 0x030423 0C:8413: AD 3B 04  LDA ram_043B
C - - - - - 0x030426 0C:8416: C9 01     CMP #$01
C - - - - - 0x030428 0C:8418: D0 07     BNE $8421
C - - - - - 0x03042A 0C:841A: 2C 28 06  BIT ram_0628
C - - - - - 0x03042D 0C:841D: 10 02     BPL $8421
C - - - - - 0x03042F 0C:841F: A9 0A     LDA #$0A
C - - - - - 0x030431 0C:8421: AA        TAX
C - - - - - 0x030432 0C:8422: 08        PHP
C - - - - - 0x030433 0C:8423: BD BF 83  LDA $83BF,X
C - - - - - 0x030436 0C:8426: 28        PLP
C - - - - - 0x030437 0C:8427: D0 09     BNE $8432
C - - - - - 0x030439 0C:8429: AD 3C 04  LDA ram_043C
C - - - - - 0x03043C 0C:842C: 29 03     AND #$03
C - - - - - 0x03043E 0C:842E: 18        CLC
C - - - - - 0x03043F 0C:842F: 7D BF 83  ADC $83BF,X
C - - - - - 0x030442 0C:8432: 4C 3C 86  JMP $863C
- D 0 - - - 0x030445 0C:8435: E8        .byte $E8   ; 
- D 0 - - - 0x030446 0C:8436: E6        .byte $E6   ; 
- - - - - - 0x030447 0C:8437: FF        .byte $FF   ; 
- - - - - - 0x030448 0C:8438: E6        .byte $E6   ; 
- D 0 - - - 0x030449 0C:8439: E9        .byte $E9   ; 
- D 0 - - - 0x03044A 0C:843A: E9        .byte $E9   ; 
- D 0 - - - 0x03044B 0C:843B: E7        .byte $E7   ; 
- - - - - - 0x03044C 0C:843C: 00        .byte $00   ; 
- - - - - - 0x03044D 0C:843D: 00        .byte $00   ; 
- - - - - - 0x03044E 0C:843E: 00        .byte $00   ; 
- D 0 - - - 0x03044F 0C:843F: E9        .byte $E9   ; 
- - - - - - 0x030450 0C:8440: E8        .byte $E8   ; 
- D 0 - - - 0x030451 0C:8441: EA        .byte $EA   ; 
- D 0 - - - 0x030452 0C:8442: E8        .byte $E8   ; 
C - - J - - 0x030453 0C:8443: 2C 3E 04  BIT ram_043E
C - - - - - 0x030456 0C:8446: 10 0D     BPL $8455
C - - - - - 0x030458 0C:8448: AE 3D 04  LDX ram_043D
C - - - - - 0x03045B 0C:844B: BD 61 84  LDA $8461,X
C - - - - - 0x03045E 0C:844E: C9 FF     CMP #$FF
C - - - - - 0x030460 0C:8450: F0 03     BEQ $8455
C - - - - - 0x030462 0C:8452: 20 3C 86  JSR $863C
C - - - - - 0x030465 0C:8455: AD 3D 04  LDA ram_043D
C - - - - - 0x030468 0C:8458: 29 3F     AND #$3F
C - - - - - 0x03046A 0C:845A: AA        TAX
C - - - - - 0x03046B 0C:845B: BD DC 83  LDA $83DC,X
C - - - - - 0x03046E 0C:845E: 4C 3C 86  JMP $863C
- D 0 - - - 0x030471 0C:8461: E6        .byte $E6   ; 
- D 0 - - - 0x030472 0C:8462: E6        .byte $E6   ; 
- - - - - - 0x030473 0C:8463: FF        .byte $FF   ; 
- D 0 - - - 0x030474 0C:8464: E7        .byte $E7   ; 
- - - - - - 0x030475 0C:8465: FF        .byte $FF   ; 
- - - - - - 0x030476 0C:8466: FF        .byte $FF   ; 
C - - J - - 0x030477 0C:8467: AD 41 04  LDA ram_0441
C - - - - - 0x03047A 0C:846A: 4C 53 86  JMP $8653
C - - J - - 0x03047D 0C:846D: AD FB 05  LDA ram_05FB
C - - - - - 0x030480 0C:8470: 49 0B     EOR #$0B
C - - - - - 0x030482 0C:8472: 4C 78 84  JMP $8478
C - - J - - 0x030485 0C:8475: AD FB 05  LDA ram_05FB
C D 0 - - - 0x030488 0C:8478: AC 2A 00  LDY a: ram_002A
C - - - - - 0x03048B 0C:847B: AA        TAX
C - - - - - 0x03048C 0C:847C: F0 08     BEQ $8486
C - - - - - 0x03048E 0C:847E: AC 2B 00  LDY a: ram_002B
C - - - - - 0x030491 0C:8481: C0 24     CPY #$24
C - - - - - 0x030493 0C:8483: D0 01     BNE $8486
- - - - - - 0x030495 0C:8485: 88        .byte $88   ; 
C - - - - - 0x030496 0C:8486: 98        TYA
C - - - - - 0x030497 0C:8487: 18        CLC
C - - - - - 0x030498 0C:8488: 69 76     ADC #$76
C - - - - - 0x03049A 0C:848A: 4C 3C 86  JMP $863C
C - - J - - 0x03049D 0C:848D: AD 00 06  LDA ram_0600
C - - - - - 0x0304A0 0C:8490: 4C B2 86  JMP $86B2
C - - J - - 0x0304A3 0C:8493: AD 01 06  LDA ram_0601
C - - - - - 0x0304A6 0C:8496: 4C 53 86  JMP $8653
C - - J - - 0x0304A9 0C:8499: AD 02 06  LDA ram_0602
C - - - - - 0x0304AC 0C:849C: 4C 53 86  JMP $8653
C - - J - - 0x0304AF 0C:849F: AD 03 06  LDA ram_0603
C - - - - - 0x0304B2 0C:84A2: 4C 53 86  JMP $8653
C - - J - - 0x0304B5 0C:84A5: AD FC 05  LDA ram_05FC
C - - - - - 0x0304B8 0C:84A8: 4C 53 86  JMP $8653
C - - J - - 0x0304BB 0C:84AB: AE 3D 04  LDX ram_043D
C - - - - - 0x0304BE 0C:84AE: BD C7 84  LDA $84C7,X
C - - - - - 0x0304C1 0C:84B1: F0 13     BEQ $84C6
C - - - - - 0x0304C3 0C:84B3: 2C 3E 04  BIT ram_043E
C - - - - - 0x0304C6 0C:84B6: 10 05     BPL $84BD
C - - - - - 0x0304C8 0C:84B8: A9 E6     LDA #$E6
C - - - - - 0x0304CA 0C:84BA: 20 3C 86  JSR $863C
C - - - - - 0x0304CD 0C:84BD: AE 3D 04  LDX ram_043D
C - - - - - 0x0304D0 0C:84C0: BD C7 84  LDA $84C7,X
C - - - - - 0x0304D3 0C:84C3: 4C 3C 86  JMP $863C
- - - - - - 0x0304D6 0C:84C6: 60        .byte $60   ; 
- D 0 - - - 0x0304D7 0C:84C7: E0        .byte $E0   ; 
- D 0 - - - 0x0304D8 0C:84C8: E4        .byte $E4   ; 
- - - - - - 0x0304D9 0C:84C9: 00        .byte $00   ; 
- - - - - - 0x0304DA 0C:84CA: 00        .byte $00   ; 
- - - - - - 0x0304DB 0C:84CB: 00        .byte $00   ; 
- D 0 - - - 0x0304DC 0C:84CC: E0        .byte $E0   ; 
- D 0 - - - 0x0304DD 0C:84CD: E0        .byte $E0   ; 
C - - J - - 0x0304DE 0C:84CE: AD FB 05  LDA ram_05FB
C - - - - - 0x0304E1 0C:84D1: 49 0B     EOR #$0B
C - - - - - 0x0304E3 0C:84D3: 4C 53 86  JMP $8653
C - - J - - 0x0304E6 0C:84D6: AD 42 04  LDA ram_0442
C - - - - - 0x0304E9 0C:84D9: 4C 53 86  JMP $8653
C - - J - - 0x0304EC 0C:84DC: AD 16 06  LDA ram_0616
C - - - - - 0x0304EF 0C:84DF: 4A        LSR
C - - - - - 0x0304F0 0C:84E0: 18        CLC
C - - - - - 0x0304F1 0C:84E1: 69 34     ADC #$34
C - - - - - 0x0304F3 0C:84E3: 4C 29 86  JMP $8629
C - - J - - 0x0304F6 0C:84E6: AD 2A 00  LDA a: ram_002A
C - - - - - 0x0304F9 0C:84E9: 4C EF 84  JMP $84EF
C - - J - - 0x0304FC 0C:84EC: AD 2B 00  LDA a: ram_002B
C D 0 - - - 0x0304FF 0C:84EF: C9 24     CMP #$24
C - - - - - 0x030501 0C:84F1: D0 02     BNE $84F5
- - - - - - 0x030503 0C:84F3: A9        .byte $A9   ; 
- - - - - - 0x030504 0C:84F4: 23        .byte $23   ; 
C - - - - - 0x030505 0C:84F5: 18        CLC
C - - - - - 0x030506 0C:84F6: 69 76     ADC #$76
C - - - - - 0x030508 0C:84F8: 4C 3C 86  JMP $863C
C - - J - - 0x03050B 0C:84FB: AD 41 04  LDA ram_0441
C - - - - - 0x03050E 0C:84FE: 20 13 85  JSR $8513
C - - - - - 0x030511 0C:8501: AD 42 04  LDA ram_0442
C - - - - - 0x030514 0C:8504: 4C 34 85  JMP $8534
C - - J - - 0x030517 0C:8507: AD 42 04  LDA ram_0442
C - - - - - 0x03051A 0C:850A: 20 13 85  JSR $8513
C - - - - - 0x03051D 0C:850D: AD 41 04  LDA ram_0441
C - - - - - 0x030520 0C:8510: 4C 34 85  JMP $8534
C - - - - - 0x030523 0C:8513: 20 0C C5  JSR $C50C
C - - - - - 0x030526 0C:8516: A0 00     LDY #$00
C - - - - - 0x030528 0C:8518: B1 34     LDA (ram_0034),Y
C - - - - - 0x03052A 0C:851A: A2 00     LDX #$00
C - - - - - 0x03052C 0C:851C: DD 2C 85  CMP $852C,X
C - - - - - 0x03052F 0C:851F: F0 07     BEQ $8528
C - - - - - 0x030531 0C:8521: E8        INX
C - - - - - 0x030532 0C:8522: E0 08     CPX #$08
C - - - - - 0x030534 0C:8524: D0 F6     BNE $851C
C - - - - - 0x030536 0C:8526: 18        CLC
C - - - - - 0x030537 0C:8527: 60        RTS
C - - - - - 0x030538 0C:8528: 86 3D     STX ram_003D
C - - - - - 0x03053A 0C:852A: 38        SEC
C - - - - - 0x03053B 0C:852B: 60        RTS
- D 0 - - - 0x03053C 0C:852C: 01        .byte $01   ; 
- D 0 - - - 0x03053D 0C:852D: 11        .byte $11   ; 
- D 0 - - - 0x03053E 0C:852E: 44        .byte $44   ; <D>
- D 0 - - - 0x03053F 0C:852F: 34        .byte $34   ; <4>
- D 0 - - - 0x030540 0C:8530: 45        .byte $45   ; <E>
- D 0 - - - 0x030541 0C:8531: 15        .byte $15   ; 
- D 0 - - - 0x030542 0C:8532: 42        .byte $42   ; <B>
- D 0 - - - 0x030543 0C:8533: 38        .byte $38   ; <8>
C D 0 - - - 0x030544 0C:8534: 08        PHP
C - - - - - 0x030545 0C:8535: 20 0C C5  JSR $C50C
C - - - - - 0x030548 0C:8538: 28        PLP
C - - - - - 0x030549 0C:8539: 90 37     BCC $8572
C - - - - - 0x03054B 0C:853B: A5 3D     LDA ram_003D
C - - - - - 0x03054D 0C:853D: 0A        ASL
C - - - - - 0x03054E 0C:853E: AA        TAX
C - - - - - 0x03054F 0C:853F: BD 89 85  LDA $8589,X
C - - - - - 0x030552 0C:8542: 85 3E     STA ram_003E
C - - - - - 0x030554 0C:8544: BD 8A 85  LDA $858A,X
C - - - - - 0x030557 0C:8547: 85 3F     STA ram_003F
C - - - - - 0x030559 0C:8549: A0 00     LDY #$00
C - - - - - 0x03055B 0C:854B: B1 34     LDA (ram_0034),Y
C - - - - - 0x03055D 0C:854D: AA        TAX
C - - - - - 0x03055E 0C:854E: A0 00     LDY #$00
C - - - - - 0x030560 0C:8550: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030562 0C:8552: F0 1E     BEQ $8572
C - - - - - 0x030564 0C:8554: 8A        TXA
C - - - - - 0x030565 0C:8555: D1 3E     CMP (ram_003E),Y
C - - - - - 0x030567 0C:8557: F0 03     BEQ $855C
C - - - - - 0x030569 0C:8559: C8        INY
C - - - - - 0x03056A 0C:855A: D0 F4     BNE $8550
C - - - - - 0x03056C 0C:855C: 8A        TXA
C - - - - - 0x03056D 0C:855D: 20 3C 86  JSR $863C
C - - - - - 0x030570 0C:8560: A5 3D     LDA ram_003D
C - - - - - 0x030572 0C:8562: 0A        ASL
C - - - - - 0x030573 0C:8563: AA        TAX
C - - - - - 0x030574 0C:8564: BD 7A 85  LDA $857A,X
C - - - - - 0x030577 0C:8567: 48        PHA
C - - - - - 0x030578 0C:8568: BD 79 85  LDA $8579,X
C - - - - - 0x03057B 0C:856B: 20 29 86  JSR $8629
C - - - - - 0x03057E 0C:856E: 68        PLA
C - - - - - 0x03057F 0C:856F: 4C 29 86  JMP $8629
C - - - - - 0x030582 0C:8572: A0 00     LDY #$00
C - - - - - 0x030584 0C:8574: B1 34     LDA (ram_0034),Y
C - - - - - 0x030586 0C:8576: 4C 3C 86  JMP $863C
- D 0 - - - 0x030589 0C:8579: 08        .byte $08   ; 
- D 0 - - - 0x03058A 0C:857A: 2E        .byte $2E   ; 
- D 0 - - - 0x03058B 0C:857B: 08        .byte $08   ; 
- D 0 - - - 0x03058C 0C:857C: 2E        .byte $2E   ; 
- D 0 - - - 0x03058D 0C:857D: 08        .byte $08   ; 
- D 0 - - - 0x03058E 0C:857E: 2E        .byte $2E   ; 
- D 0 - - - 0x03058F 0C:857F: 08        .byte $08   ; 
- D 0 - - - 0x030590 0C:8580: 2E        .byte $2E   ; 
- - - - - - 0x030591 0C:8581: 08        .byte $08   ; 
- - - - - - 0x030592 0C:8582: 2E        .byte $2E   ; 
- D 0 - - - 0x030593 0C:8583: 0B        .byte $0B   ; 
- D 0 - - - 0x030594 0C:8584: 2E        .byte $2E   ; 
- - - - - - 0x030595 0C:8585: 0B        .byte $0B   ; 
- - - - - - 0x030596 0C:8586: 2E        .byte $2E   ; 
- D 0 - - - 0x030597 0C:8587: 0B        .byte $0B   ; 
- D 0 - - - 0x030598 0C:8588: 2E        .byte $2E   ; 
- D 0 - - - 0x030599 0C:8589: 99        .byte $99   ; 
- D 0 - - - 0x03059A 0C:858A: 85        .byte $85   ; 
- D 0 - - - 0x03059B 0C:858B: 9F        .byte $9F   ; 
- D 0 - - - 0x03059C 0C:858C: 85        .byte $85   ; 
- D 0 - - - 0x03059D 0C:858D: 9F        .byte $9F   ; 
- D 0 - - - 0x03059E 0C:858E: 85        .byte $85   ; 
- D 0 - - - 0x03059F 0C:858F: A2        .byte $A2   ; 
- D 0 - - - 0x0305A0 0C:8590: 85        .byte $85   ; 
- - - - - - 0x0305A1 0C:8591: A2        .byte $A2   ; 
- - - - - - 0x0305A2 0C:8592: 85        .byte $85   ; 
- D 0 - - - 0x0305A3 0C:8593: A5        .byte $A5   ; 
- D 0 - - - 0x0305A4 0C:8594: 85        .byte $85   ; 
- - - - - - 0x0305A5 0C:8595: A5        .byte $A5   ; 
- - - - - - 0x0305A6 0C:8596: 85        .byte $85   ; 
- D 0 - - - 0x0305A7 0C:8597: AE        .byte $AE   ; 
- D 0 - - - 0x0305A8 0C:8598: 85        .byte $85   ; 
- D 0 - I - 0x0305A9 0C:8599: 44        .byte $44   ; <D>
- D 0 - I - 0x0305AA 0C:859A: 41        .byte $41   ; <A>
- D 0 - I - 0x0305AB 0C:859B: 45        .byte $45   ; <E>
- D 0 - I - 0x0305AC 0C:859C: 4B        .byte $4B   ; <K>
- D 0 - I - 0x0305AD 0C:859D: 49        .byte $49   ; <I>
- D 0 - I - 0x0305AE 0C:859E: 00        .byte $00   ; 
- D 0 - I - 0x0305AF 0C:859F: 01        .byte $01   ; 
- D 0 - I - 0x0305B0 0C:85A0: 34        .byte $34   ; <4>
- D 0 - I - 0x0305B1 0C:85A1: 00        .byte $00   ; 
- D 0 - I - 0x0305B2 0C:85A2: 01        .byte $01   ; 
- D 0 - I - 0x0305B3 0C:85A3: 11        .byte $11   ; 
- D 0 - I - 0x0305B4 0C:85A4: 00        .byte $00   ; 
- D 0 - I - 0x0305B5 0C:85A5: 01        .byte $01   ; 
- D 0 - I - 0x0305B6 0C:85A6: 36        .byte $36   ; <6>
- D 0 - I - 0x0305B7 0C:85A7: 34        .byte $34   ; <4>
- D 0 - I - 0x0305B8 0C:85A8: 35        .byte $35   ; <5>
- D 0 - I - 0x0305B9 0C:85A9: 32        .byte $32   ; <2>
- D 0 - I - 0x0305BA 0C:85AA: 2E        .byte $2E   ; 
- D 0 - I - 0x0305BB 0C:85AB: 30        .byte $30   ; <0>
- D 0 - I - 0x0305BC 0C:85AC: 31        .byte $31   ; <1>
- D 0 - I - 0x0305BD 0C:85AD: 00        .byte $00   ; 
- D 0 - I - 0x0305BE 0C:85AE: 11        .byte $11   ; 
- D 0 - I - 0x0305BF 0C:85AF: 15        .byte $15   ; 
- D 0 - I - 0x0305C0 0C:85B0: 00        .byte $00   ; 
C - - J - - 0x0305C1 0C:85B1: A9 ED     LDA #$ED
C - - - - - 0x0305C3 0C:85B3: 4C 3C 86  JMP $863C
C - - J - - 0x0305C6 0C:85B6: A9 EE     LDA #$EE
C - - - - - 0x0305C8 0C:85B8: 4C 3C 86  JMP $863C
C - - J - - 0x0305CB 0C:85BB: AC E5 05  LDY ram_05E5
C - - - - - 0x0305CE 0C:85BE: EE E5 05  INC ram_05E5
C - - - - - 0x0305D1 0C:85C1: B1 5F     LDA (ram_005F),Y
C - - - - - 0x0305D3 0C:85C3: 48        PHA
C - - - - - 0x0305D4 0C:85C4: A9 7C     LDA #$7C
C - - - - - 0x0305D6 0C:85C6: 20 29 86  JSR $8629
C - - - - - 0x0305D9 0C:85C9: 68        PLA
C - - - - - 0x0305DA 0C:85CA: 38        SEC
C - - - - - 0x0305DB 0C:85CB: E9 01     SBC #$01
C - - - - - 0x0305DD 0C:85CD: D0 F4     BNE $85C3
C - - - - - 0x0305DF 0C:85CF: 60        RTS
C - - J - - 0x0305E0 0C:85D0: A9 EF     LDA #$EF
C - - - - - 0x0305E2 0C:85D2: 4C 3C 86  JMP $863C
- - - - - - 0x0305E5 0C:85D5: 60        .byte $60   ; 
C - - J - - 0x0305E6 0C:85D6: A9 80     LDA #$80
C - - - - - 0x0305E8 0C:85D8: 8D 15 05  STA ram_0515
C - - - - - 0x0305EB 0C:85DB: AD E7 05  LDA ram_05E7
C - - - - - 0x0305EE 0C:85DE: CD E8 05  CMP ram_05E8
C - - - - - 0x0305F1 0C:85E1: D0 09     BNE $85EC
C - - - - - 0x0305F3 0C:85E3: A9 00     LDA #$00
C - - - - - 0x0305F5 0C:85E5: 8D E4 05  STA ram_05E4
C - - - - - 0x0305F8 0C:85E8: A9 01     LDA #$01
C - - - - - 0x0305FA 0C:85EA: D0 0B     BNE $85F7
C - - - - - 0x0305FC 0C:85EC: EE E7 05  INC ram_05E7
C - - - - - 0x0305FF 0C:85EF: AC E5 05  LDY ram_05E5
C - - - - - 0x030602 0C:85F2: EE E5 05  INC ram_05E5
C - - - - - 0x030605 0C:85F5: A9 01     LDA #$01
C - - - - - 0x030607 0C:85F7: 8D E9 05  STA ram_05E9
C - - - - - 0x03060A 0C:85FA: 68        PLA
C - - - - - 0x03060B 0C:85FB: 68        PLA
C - - - - - 0x03060C 0C:85FC: 60        RTS
- - - - - - 0x03060D 0C:85FD: 60        .byte $60   ; 
- - - - - - 0x03060E 0C:85FE: A9        .byte $A9   ; 
- - - - - - 0x03060F 0C:85FF: 80        .byte $80   ; 
- - - - - - 0x030610 0C:8600: 8D        .byte $8D   ; 
- - - - - - 0x030611 0C:8601: 15        .byte $15   ; 
- - - - - - 0x030612 0C:8602: 05        .byte $05   ; 
- - - - - - 0x030613 0C:8603: AD        .byte $AD   ; 
- - - - - - 0x030614 0C:8604: E3        .byte $E3   ; 
- - - - - - 0x030615 0C:8605: 05        .byte $05   ; 
- - - - - - 0x030616 0C:8606: 29        .byte $29   ; 
- - - - - - 0x030617 0C:8607: BF        .byte $BF   ; 
- - - - - - 0x030618 0C:8608: 8D        .byte $8D   ; 
- - - - - - 0x030619 0C:8609: E3        .byte $E3   ; 
- - - - - - 0x03061A 0C:860A: 05        .byte $05   ; 
- - - - - - 0x03061B 0C:860B: A9        .byte $A9   ; 
- - - - - - 0x03061C 0C:860C: 01        .byte $01   ; 
- - - - - - 0x03061D 0C:860D: 20        .byte $20   ; 
- - - - - - 0x03061E 0C:860E: 15        .byte $15   ; 
- - - - - - 0x03061F 0C:860F: C5        .byte $C5   ; 
- - - - - - 0x030620 0C:8610: 20        .byte $20   ; 
- - - - - - 0x030621 0C:8611: 60        .byte $60   ; 
- - - - - - 0x030622 0C:8612: C5        .byte $C5   ; 
- - - - - - 0x030623 0C:8613: 2C        .byte $2C   ; 
- - - - - - 0x030624 0C:8614: E3        .byte $E3   ; 
- - - - - - 0x030625 0C:8615: 05        .byte $05   ; 
- - - - - - 0x030626 0C:8616: 50        .byte $50   ; <P>
- - - - - - 0x030627 0C:8617: F3        .byte $F3   ; 
- - - - - - 0x030628 0C:8618: AD        .byte $AD   ; 
- - - - - - 0x030629 0C:8619: E3        .byte $E3   ; 
- - - - - - 0x03062A 0C:861A: 05        .byte $05   ; 
- - - - - - 0x03062B 0C:861B: 29        .byte $29   ; 
- - - - - - 0x03062C 0C:861C: BF        .byte $BF   ; 
- - - - - - 0x03062D 0C:861D: 8D        .byte $8D   ; 
- - - - - - 0x03062E 0C:861E: E3        .byte $E3   ; 
- - - - - - 0x03062F 0C:861F: 05        .byte $05   ; 
- - - - - - 0x030630 0C:8620: 60        .byte $60   ; 
- - - - - - 0x030631 0C:8621: A9        .byte $A9   ; 
- - - - - - 0x030632 0C:8622: 00        .byte $00   ; 
- - - - - - 0x030633 0C:8623: 8D        .byte $8D   ; 
- - - - - - 0x030634 0C:8624: E3        .byte $E3   ; 
- - - - - - 0x030635 0C:8625: 05        .byte $05   ; 
- - - - - - 0x030636 0C:8626: 68        .byte $68   ; <h>
- - - - - - 0x030637 0C:8627: 68        .byte $68   ; <h>
- - - - - - 0x030638 0C:8628: 60        .byte $60   ; 
C D 0 - - - 0x030639 0C:8629: 20 24 C5  JSR $C524
C - - - - - 0x03063C 0C:862C: A6 3A     LDX ram_003A
C - - - - - 0x03063E 0C:862E: 9D A8 04  STA ram_04A8,X
C - - - - - 0x030641 0C:8631: A6 3B     LDX ram_003B
C - - - - - 0x030643 0C:8633: 98        TYA
C - - - - - 0x030644 0C:8634: 9D A8 04  STA ram_04A8,X
C - - - - - 0x030647 0C:8637: E6 3A     INC ram_003A
C - - - - - 0x030649 0C:8639: E6 3B     INC ram_003B
C - - - - - 0x03064B 0C:863B: 60        RTS
C D 0 - - - 0x03064C 0C:863C: 20 3C C5  JSR $C53C
C - - - - - 0x03064F 0C:863F: A9 00     LDA #$00
C - - - - - 0x030651 0C:8641: 85 3C     STA ram_003C
C - - - - - 0x030653 0C:8643: A4 3C     LDY ram_003C
C - - - - - 0x030655 0C:8645: B1 30     LDA (ram_0030),Y
C - - - - - 0x030657 0C:8647: C9 E0     CMP #$E0
C - - - - - 0x030659 0C:8649: B0 07     BCS $8652
C - - - - - 0x03065B 0C:864B: 20 29 86  JSR $8629
C - - - - - 0x03065E 0C:864E: E6 3C     INC ram_003C
C - - - - - 0x030660 0C:8650: D0 F1     BNE $8643
C - - - - - 0x030662 0C:8652: 60        RTS
C D 0 - - - 0x030663 0C:8653: 85 3D     STA ram_003D
C - - - - - 0x030665 0C:8655: 20 0C C5  JSR $C50C
C - - - - - 0x030668 0C:8658: A0 00     LDY #$00
C - - - - - 0x03066A 0C:865A: B1 34     LDA (ram_0034),Y
C - - - - - 0x03066C 0C:865C: F0 0D     BEQ $866B
C - - - - - 0x03066E 0C:865E: 20 3C 86  JSR $863C
C - - - - - 0x030671 0C:8661: A9 08     LDA #$08
C - - - - - 0x030673 0C:8663: 20 29 86  JSR $8629
C - - - - - 0x030676 0C:8666: A9 2E     LDA #$2E
C - - - - - 0x030678 0C:8668: 4C 29 86  JMP $8629
C - - - - - 0x03067B 0C:866B: A5 3D     LDA ram_003D
C - - - - - 0x03067D 0C:866D: 38        SEC
C - - - - - 0x03067E 0C:866E: E9 0B     SBC #$0B
C - - - - - 0x030680 0C:8670: 0A        ASL
C - - - - - 0x030681 0C:8671: 0A        ASL
C - - - - - 0x030682 0C:8672: AA        TAX
C - - - - - 0x030683 0C:8673: A0 00     LDY #$00
C - - - - - 0x030685 0C:8675: BD 86 86  LDA $8686,X
C - - - - - 0x030688 0C:8678: 99 EE 05  STA ram_05EE,Y
C - - - - - 0x03068B 0C:867B: E8        INX
C - - - - - 0x03068C 0C:867C: C8        INY
C - - - - - 0x03068D 0C:867D: C0 04     CPY #$04
C - - - - - 0x03068F 0C:867F: D0 F4     BNE $8675
C - - - - - 0x030691 0C:8681: A9 00     LDA #$00
C - - - - - 0x030693 0C:8683: 4C 3C 86  JMP $863C
- D 0 - - - 0x030696 0C:8686: 47        .byte $47   ; <G>
- D 0 - - - 0x030697 0C:8687: 7D        .byte $7D   ; 
- D 0 - - - 0x030698 0C:8688: CD        .byte $CD   ; 
- D 0 - - - 0x030699 0C:8689: 7D        .byte $7D   ; 
- D 0 - - - 0x03069A 0C:868A: 00        .byte $00   ; 
- D 0 - - - 0x03069B 0C:868B: 35        .byte $35   ; <5>
- D 0 - - - 0x03069C 0C:868C: AF        .byte $AF   ; 
- D 0 - - - 0x03069D 0C:868D: 2E        .byte $2E   ; 
- D 0 - - - 0x03069E 0C:868E: 00        .byte $00   ; 
- D 0 - - - 0x03069F 0C:868F: 36        .byte $36   ; <6>
- D 0 - - - 0x0306A0 0C:8690: AF        .byte $AF   ; 
- D 0 - - - 0x0306A1 0C:8691: 2E        .byte $2E   ; 
- D 0 - - - 0x0306A2 0C:8692: 00        .byte $00   ; 
- D 0 - - - 0x0306A3 0C:8693: 37        .byte $37   ; <7>
- D 0 - - - 0x0306A4 0C:8694: AF        .byte $AF   ; 
- D 0 - - - 0x0306A5 0C:8695: 2E        .byte $2E   ; 
- D 0 - - - 0x0306A6 0C:8696: 00        .byte $00   ; 
- D 0 - - - 0x0306A7 0C:8697: 38        .byte $38   ; <8>
- D 0 - - - 0x0306A8 0C:8698: AF        .byte $AF   ; 
- D 0 - - - 0x0306A9 0C:8699: 2E        .byte $2E   ; 
- D 0 - - - 0x0306AA 0C:869A: 00        .byte $00   ; 
- D 0 - - - 0x0306AB 0C:869B: 39        .byte $39   ; <9>
- D 0 - - - 0x0306AC 0C:869C: AF        .byte $AF   ; 
- D 0 - - - 0x0306AD 0C:869D: 2E        .byte $2E   ; 
- D 0 - - - 0x0306AE 0C:869E: 00        .byte $00   ; 
- D 0 - - - 0x0306AF 0C:869F: 3A        .byte $3A   ; 
- D 0 - - - 0x0306B0 0C:86A0: AF        .byte $AF   ; 
- D 0 - - - 0x0306B1 0C:86A1: 2E        .byte $2E   ; 
- D 0 - - - 0x0306B2 0C:86A2: 00        .byte $00   ; 
- D 0 - - - 0x0306B3 0C:86A3: 3B        .byte $3B   ; 
- D 0 - - - 0x0306B4 0C:86A4: AF        .byte $AF   ; 
- D 0 - - - 0x0306B5 0C:86A5: 2E        .byte $2E   ; 
- D 0 - - - 0x0306B6 0C:86A6: 00        .byte $00   ; 
- D 0 - - - 0x0306B7 0C:86A7: 3C        .byte $3C   ; 
- D 0 - - - 0x0306B8 0C:86A8: AF        .byte $AF   ; 
- D 0 - - - 0x0306B9 0C:86A9: 2E        .byte $2E   ; 
- D 0 - - - 0x0306BA 0C:86AA: 34        .byte $34   ; <4>
- D 0 - - - 0x0306BB 0C:86AB: 33        .byte $33   ; <3>
- D 0 - - - 0x0306BC 0C:86AC: AF        .byte $AF   ; 
- D 0 - - - 0x0306BD 0C:86AD: 2E        .byte $2E   ; 
- D 0 - - - 0x0306BE 0C:86AE: 34        .byte $34   ; <4>
- D 0 - - - 0x0306BF 0C:86AF: 34        .byte $34   ; <4>
- D 0 - - - 0x0306C0 0C:86B0: AF        .byte $AF   ; 
- D 0 - - - 0x0306C1 0C:86B1: 2E        .byte $2E   ; 
C D 0 - - - 0x0306C2 0C:86B2: 18        CLC
C - - - - - 0x0306C3 0C:86B3: 69 33     ADC #$33
C - - - - - 0x0306C5 0C:86B5: 4C 29 86  JMP $8629
- D 0 - - - 0x0306C8 0C:86B8: 0E        .byte $0E   ; 
- D 0 - - - 0x0306C9 0C:86B9: 0E        .byte $0E   ; 
- D 0 - - - 0x0306CA 0C:86BA: 0E        .byte $0E   ; 
- - - - - - 0x0306CB 0C:86BB: 0E        .byte $0E   ; 
- D 0 - - - 0x0306CC 0C:86BC: 0E        .byte $0E   ; 
- D 0 - - - 0x0306CD 0C:86BD: 0E        .byte $0E   ; 
- D 0 - - - 0x0306CE 0C:86BE: 0E        .byte $0E   ; 
- D 0 - - - 0x0306CF 0C:86BF: 0E        .byte $0E   ; 
- D 0 - - - 0x0306D0 0C:86C0: 0E        .byte $0E   ; 
- D 0 - - - 0x0306D1 0C:86C1: 12        .byte $12   ; 
- D 0 - - - 0x0306D2 0C:86C2: 12        .byte $12   ; 
- D 0 - - - 0x0306D3 0C:86C3: 12        .byte $12   ; 
- D 0 - - - 0x0306D4 0C:86C4: 12        .byte $12   ; 
- D 0 - - - 0x0306D5 0C:86C5: 12        .byte $12   ; 
- D 0 - - - 0x0306D6 0C:86C6: 12        .byte $12   ; 
- - - - - - 0x0306D7 0C:86C7: 12        .byte $12   ; 
- D 0 - - - 0x0306D8 0C:86C8: 01        .byte $01   ; 
- D 0 - - - 0x0306D9 0C:86C9: 01        .byte $01   ; 
- D 0 - - - 0x0306DA 0C:86CA: 01        .byte $01   ; 
- D 0 - - - 0x0306DB 0C:86CB: 02        .byte $02   ; 
- D 0 - - - 0x0306DC 0C:86CC: 00        .byte $00   ; 
- D 0 - - - 0x0306DD 0C:86CD: 02        .byte $02   ; 
- - - - - - 0x0306DE 0C:86CE: 00        .byte $00   ; 
- - - - - - 0x0306DF 0C:86CF: 03        .byte $03   ; 
- D 0 - - - 0x0306E0 0C:86D0: 01        .byte $01   ; 
- D 0 - - - 0x0306E1 0C:86D1: 01        .byte $01   ; 
- D 0 - - - 0x0306E2 0C:86D2: 01        .byte $01   ; 
- D 0 - - - 0x0306E3 0C:86D3: 02        .byte $02   ; 
- D 0 - - - 0x0306E4 0C:86D4: 00        .byte $00   ; 
- D 0 - - - 0x0306E5 0C:86D5: 02        .byte $02   ; 
- D 0 - - - 0x0306E6 0C:86D6: 00        .byte $00   ; 
- D 0 - - - 0x0306E7 0C:86D7: 03        .byte $03   ; 
- D 0 - - - 0x0306E8 0C:86D8: 01        .byte $01   ; 
- D 0 - - - 0x0306E9 0C:86D9: 02        .byte $02   ; 
- D 0 - - - 0x0306EA 0C:86DA: 05        .byte $05   ; 
- D 0 - - - 0x0306EB 0C:86DB: 05        .byte $05   ; 
- D 0 - - - 0x0306EC 0C:86DC: 05        .byte $05   ; 
- D 0 - - - 0x0306ED 0C:86DD: 06        .byte $06   ; 
- D 0 - - - 0x0306EE 0C:86DE: 04        .byte $04   ; 
- D 0 - - - 0x0306EF 0C:86DF: 06        .byte $06   ; 
- D 0 - - - 0x0306F0 0C:86E0: 05        .byte $05   ; 
- D 0 - - - 0x0306F1 0C:86E1: 05        .byte $05   ; 
- D 0 - - - 0x0306F2 0C:86E2: 05        .byte $05   ; 
- D 0 - - - 0x0306F3 0C:86E3: 06        .byte $06   ; 
- D 0 - - - 0x0306F4 0C:86E4: 04        .byte $04   ; 
- D 0 - - - 0x0306F5 0C:86E5: 06        .byte $06   ; 
- - - - - - 0x0306F6 0C:86E6: 04        .byte $04   ; 
- - - - - - 0x0306F7 0C:86E7: 07        .byte $07   ; 
- D 0 - - - 0x0306F8 0C:86E8: 70        .byte $70   ; <p>
- D 0 - - - 0x0306F9 0C:86E9: 22        .byte $22   ; 
- D 0 - - - 0x0306FA 0C:86EA: B0        .byte $B0   ; 
- D 0 - - - 0x0306FB 0C:86EB: 22        .byte $22   ; 
- D 0 - - - 0x0306FC 0C:86EC: F0        .byte $F0   ; 
- D 0 - - - 0x0306FD 0C:86ED: 22        .byte $22   ; 
- D 0 - - - 0x0306FE 0C:86EE: 30        .byte $30   ; <0>
- D 0 - - - 0x0306FF 0C:86EF: 23        .byte $23   ; 
- D 0 - - - 0x030700 0C:86F0: 6B        .byte $6B   ; <k>
- D 0 - - - 0x030701 0C:86F1: 22        .byte $22   ; 
- D 0 - - - 0x030702 0C:86F2: AB        .byte $AB   ; 
- D 0 - - - 0x030703 0C:86F3: 22        .byte $22   ; 
- D 0 - - - 0x030704 0C:86F4: EB        .byte $EB   ; 
- D 0 - - - 0x030705 0C:86F5: 22        .byte $22   ; 
- - - - - - 0x030706 0C:86F6: 2B        .byte $2B   ; 
- - - - - - 0x030707 0C:86F7: 23        .byte $23   ; 
C D 0 - - - 0x030708 0C:86F8: AD 32 05  LDA ram_0532
C - - - - - 0x03070B 0C:86FB: F0 25     BEQ $8722
C - - - - - 0x03070D 0C:86FD: 10 1B     BPL $871A
C - - - - - 0x03070F 0C:86FF: 29 7F     AND #$7F
C - - - - - 0x030711 0C:8701: 8D 32 05  STA ram_0532
C - - - - - 0x030714 0C:8704: F0 1C     BEQ $8722
C - - - - - 0x030716 0C:8706: 38        SEC
C - - - - - 0x030717 0C:8707: E9 01     SBC #$01
C - - - - - 0x030719 0C:8709: 0A        ASL
C - - - - - 0x03071A 0C:870A: AA        TAX
C - - - - - 0x03071B 0C:870B: BD 6E AD  LDA $AD6E,X
C - - - - - 0x03071E 0C:870E: 85 79     STA ram_0079
C - - - - - 0x030720 0C:8710: BD 6F AD  LDA $AD6F,X
C - - - - - 0x030723 0C:8713: 85 7A     STA ram_007A
C - - - - - 0x030725 0C:8715: A9 00     LDA #$00
C - - - - - 0x030727 0C:8717: 8D 33 05  STA ram_0533
C - - - - - 0x03072A 0C:871A: AD 33 05  LDA ram_0533
C - - - - - 0x03072D 0C:871D: F0 04     BEQ $8723
C - - - - - 0x03072F 0C:871F: CE 33 05  DEC ram_0533
C - - - - - 0x030732 0C:8722: 60        RTS
C D 0 - - - 0x030733 0C:8723: A0 00     LDY #$00
C - - - - - 0x030735 0C:8725: B1 79     LDA (ram_0079),Y
C - - - - - 0x030737 0C:8727: 29 07     AND #$07
C - - - - - 0x030739 0C:8729: AA        TAX
C - - - - - 0x03073A 0C:872A: B1 79     LDA (ram_0079),Y
C - - - - - 0x03073C 0C:872C: 4A        LSR
C - - - - - 0x03073D 0C:872D: 4A        LSR
C - - - - - 0x03073E 0C:872E: 4A        LSR
C - - - - - 0x03073F 0C:872F: D0 0B     BNE $873C
C - - - - - 0x030741 0C:8731: E0 00     CPX #$00
C - - - - - 0x030743 0C:8733: F0 30     BEQ $8765
C - - - - - 0x030745 0C:8735: E0 01     CPX #$01
C - - - - - 0x030747 0C:8737: F0 32     BEQ $876B
- - - - - - 0x030749 0C:8739: C8        .byte $C8   ; 
- - - - - - 0x03074A 0C:873A: D0        .byte $D0   ; 
- - - - - - 0x03074B 0C:873B: E9        .byte $E9   ; 
C - - - - - 0x03074C 0C:873C: 8D 33 05  STA ram_0533
C - - - - - 0x03074F 0C:873F: B1 79     LDA (ram_0079),Y
C - - - - - 0x030751 0C:8741: 29 07     AND #$07
C - - - - - 0x030753 0C:8743: 85 3A     STA ram_003A
C - - - - - 0x030755 0C:8745: C8        INY
C - - - - - 0x030756 0C:8746: B1 79     LDA (ram_0079),Y
C - - - - - 0x030758 0C:8748: AA        TAX
C - - - - - 0x030759 0C:8749: C8        INY
C - - - - - 0x03075A 0C:874A: B1 79     LDA (ram_0079),Y
C - - - - - 0x03075C 0C:874C: 9D 6F 04  STA ram_046F,X
C - - - - - 0x03075F 0C:874F: C8        INY
C - - - - - 0x030760 0C:8750: C6 3A     DEC ram_003A
C - - - - - 0x030762 0C:8752: D0 F2     BNE $8746
C - - - - - 0x030764 0C:8754: 98        TYA
C - - - - - 0x030765 0C:8755: 18        CLC
C - - - - - 0x030766 0C:8756: 65 79     ADC ram_0079
C - - - - - 0x030768 0C:8758: 85 79     STA ram_0079
C - - - - - 0x03076A 0C:875A: 90 02     BCC $875E
C - - - - - 0x03076C 0C:875C: E6 7A     INC ram_007A
C - - - - - 0x03076E 0C:875E: 20 33 C5  JSR $C533
- D 0 - I - 0x030771 0C:8761: 00        .byte $00   ; 
- D 0 - I - 0x030772 0C:8762: 6C        .byte $6C   ; <l>
- D 0 - I - 0x030773 0C:8763: 04        .byte $04   ; 
C - - - - - 0x030774 0C:8764: 60        RTS
C - - - - - 0x030775 0C:8765: A9 00     LDA #$00
C - - - - - 0x030777 0C:8767: 8D 32 05  STA ram_0532
C - - - - - 0x03077A 0C:876A: 60        RTS
C - - - - - 0x03077B 0C:876B: C8        INY
C - - - - - 0x03077C 0C:876C: B1 79     LDA (ram_0079),Y
C - - - - - 0x03077E 0C:876E: AA        TAX
C - - - - - 0x03077F 0C:876F: C8        INY
C - - - - - 0x030780 0C:8770: B1 79     LDA (ram_0079),Y
C - - - - - 0x030782 0C:8772: 85 7A     STA ram_007A
C - - - - - 0x030784 0C:8774: 86 79     STX ram_0079
C - - - - - 0x030786 0C:8776: 4C 23 87  JMP $8723
C D 0 - - - 0x030789 0C:8779: AD 34 05  LDA ram_0534
C - - - - - 0x03078C 0C:877C: F0 25     BEQ $87A3
C - - - - - 0x03078E 0C:877E: 10 1B     BPL $879B
C - - - - - 0x030790 0C:8780: 29 7F     AND #$7F
C - - - - - 0x030792 0C:8782: 8D 34 05  STA ram_0534
C - - - - - 0x030795 0C:8785: F0 1C     BEQ $87A3
C - - - - - 0x030797 0C:8787: 38        SEC
C - - - - - 0x030798 0C:8788: E9 01     SBC #$01
C - - - - - 0x03079A 0C:878A: 0A        ASL
C - - - - - 0x03079B 0C:878B: AA        TAX
C - - - - - 0x03079C 0C:878C: BD 1C AD  LDA $AD1C,X
C - - - - - 0x03079F 0C:878F: 85 7B     STA ram_007B
C - - - - - 0x0307A1 0C:8791: BD 1D AD  LDA $AD1D,X
C - - - - - 0x0307A4 0C:8794: 85 7C     STA ram_007C
C - - - - - 0x0307A6 0C:8796: A9 00     LDA #$00
C - - - - - 0x0307A8 0C:8798: 8D 35 05  STA ram_0535
C - - - - - 0x0307AB 0C:879B: AD 35 05  LDA ram_0535
C - - - - - 0x0307AE 0C:879E: F0 04     BEQ $87A4
C - - - - - 0x0307B0 0C:87A0: CE 35 05  DEC ram_0535
C - - - - - 0x0307B3 0C:87A3: 60        RTS
C D 0 - - - 0x0307B4 0C:87A4: A0 00     LDY #$00
C - - - - - 0x0307B6 0C:87A6: B1 7B     LDA (ram_007B),Y
C - - - - - 0x0307B8 0C:87A8: C9 F0     CMP #$F0
C - - - - - 0x0307BA 0C:87AA: 90 0B     BCC $87B7
C - - - - - 0x0307BC 0C:87AC: C9 F0     CMP #$F0
C - - - - - 0x0307BE 0C:87AE: F0 22     BEQ $87D2
C - - - - - 0x0307C0 0C:87B0: C9 F1     CMP #$F1
C - - - - - 0x0307C2 0C:87B2: F0 24     BEQ $87D8
- - - - - - 0x0307C4 0C:87B4: C8        .byte $C8   ; 
- - - - - - 0x0307C5 0C:87B5: D0        .byte $D0   ; 
- - - - - - 0x0307C6 0C:87B6: EF        .byte $EF   ; 
C - - - - - 0x0307C7 0C:87B7: 8D 35 05  STA ram_0535
C - - - - - 0x0307CA 0C:87BA: C8        INY
C - - - - - 0x0307CB 0C:87BB: B1 7B     LDA (ram_007B),Y
C - - - - - 0x0307CD 0C:87BD: 8D 90 04  STA ram_0490
C - - - - - 0x0307D0 0C:87C0: C8        INY
C - - - - - 0x0307D1 0C:87C1: B1 7B     LDA (ram_007B),Y
C - - - - - 0x0307D3 0C:87C3: 8D 91 04  STA ram_0491
C - - - - - 0x0307D6 0C:87C6: C8        INY
C - - - - - 0x0307D7 0C:87C7: 98        TYA
C - - - - - 0x0307D8 0C:87C8: 18        CLC
C - - - - - 0x0307D9 0C:87C9: 65 7B     ADC ram_007B
C - - - - - 0x0307DB 0C:87CB: 85 7B     STA ram_007B
C - - - - - 0x0307DD 0C:87CD: 90 02     BCC $87D1
- - - - - - 0x0307DF 0C:87CF: E6        .byte $E6   ; 
- - - - - - 0x0307E0 0C:87D0: 7C        .byte $7C   ; 
C - - - - - 0x0307E1 0C:87D1: 60        RTS
- - - - - - 0x0307E2 0C:87D2: A9        .byte $A9   ; 
- - - - - - 0x0307E3 0C:87D3: 00        .byte $00   ; 
- - - - - - 0x0307E4 0C:87D4: 8D        .byte $8D   ; 
- - - - - - 0x0307E5 0C:87D5: 34        .byte $34   ; <4>
- - - - - - 0x0307E6 0C:87D6: 05        .byte $05   ; 
- - - - - - 0x0307E7 0C:87D7: 60        .byte $60   ; 
C - - - - - 0x0307E8 0C:87D8: C8        INY
C - - - - - 0x0307E9 0C:87D9: B1 7B     LDA (ram_007B),Y
C - - - - - 0x0307EB 0C:87DB: AA        TAX
C - - - - - 0x0307EC 0C:87DC: C8        INY
C - - - - - 0x0307ED 0C:87DD: B1 7B     LDA (ram_007B),Y
C - - - - - 0x0307EF 0C:87DF: 85 7C     STA ram_007C
C - - - - - 0x0307F1 0C:87E1: 86 7B     STX ram_007B
C - - - - - 0x0307F3 0C:87E3: 4C A4 87  JMP $87A4
C D 0 - - - 0x0307F6 0C:87E6: AD 36 05  LDA ram_0536
C - - - - - 0x0307F9 0C:87E9: F0 26     BEQ $8811
C - - - - - 0x0307FB 0C:87EB: 10 1B     BPL $8808
C - - - - - 0x0307FD 0C:87ED: 29 7F     AND #$7F
C - - - - - 0x0307FF 0C:87EF: 8D 36 05  STA ram_0536
C - - - - - 0x030802 0C:87F2: F0 1D     BEQ $8811
C - - - - - 0x030804 0C:87F4: 38        SEC
C - - - - - 0x030805 0C:87F5: E9 01     SBC #$01
C - - - - - 0x030807 0C:87F7: 0A        ASL
C - - - - - 0x030808 0C:87F8: AA        TAX
C - - - - - 0x030809 0C:87F9: BD 54 AD  LDA $AD54,X
C - - - - - 0x03080C 0C:87FC: 85 7D     STA ram_007D
C - - - - - 0x03080E 0C:87FE: BD 55 AD  LDA $AD55,X
C - - - - - 0x030811 0C:8801: 85 7E     STA ram_007E
C - - - - - 0x030813 0C:8803: A9 00     LDA #$00
C - - - - - 0x030815 0C:8805: 8D 37 05  STA ram_0537
C - - - - - 0x030818 0C:8808: AD 37 05  LDA ram_0537
C - - - - - 0x03081B 0C:880B: F0 08     BEQ $8815
C - - - - - 0x03081D 0C:880D: CE 37 05  DEC ram_0537
C - - - - - 0x030820 0C:8810: 60        RTS
C - - - - - 0x030821 0C:8811: 8D 38 05  STA ram_0538
C - - - - - 0x030824 0C:8814: 60        RTS
C D 0 - - - 0x030825 0C:8815: A0 00     LDY #$00
C - - - - - 0x030827 0C:8817: B1 7D     LDA (ram_007D),Y
C - - - - - 0x030829 0C:8819: C9 F0     CMP #$F0
C - - - - - 0x03082B 0C:881B: 90 0B     BCC $8828
C - - - - - 0x03082D 0C:881D: C9 F0     CMP #$F0
C - - - - - 0x03082F 0C:881F: F0 1C     BEQ $883D
C - - - - - 0x030831 0C:8821: C9 F1     CMP #$F1
C - - - - - 0x030833 0C:8823: F0 1E     BEQ $8843
- - - - - - 0x030835 0C:8825: C8        .byte $C8   ; 
- - - - - - 0x030836 0C:8826: D0        .byte $D0   ; 
- - - - - - 0x030837 0C:8827: EF        .byte $EF   ; 
C - - - - - 0x030838 0C:8828: 8D 37 05  STA ram_0537
C - - - - - 0x03083B 0C:882B: C8        INY
C - - - - - 0x03083C 0C:882C: B1 7D     LDA (ram_007D),Y
C - - - - - 0x03083E 0C:882E: 8D 38 05  STA ram_0538
C - - - - - 0x030841 0C:8831: C8        INY
C - - - - - 0x030842 0C:8832: 98        TYA
C - - - - - 0x030843 0C:8833: 18        CLC
C - - - - - 0x030844 0C:8834: 65 7D     ADC ram_007D
C - - - - - 0x030846 0C:8836: 85 7D     STA ram_007D
C - - - - - 0x030848 0C:8838: 90 02     BCC $883C
- - - - - - 0x03084A 0C:883A: E6        .byte $E6   ; 
- - - - - - 0x03084B 0C:883B: 7E        .byte $7E   ; 
C - - - - - 0x03084C 0C:883C: 60        RTS
- - - - - - 0x03084D 0C:883D: A9        .byte $A9   ; 
- - - - - - 0x03084E 0C:883E: 00        .byte $00   ; 
- - - - - - 0x03084F 0C:883F: 8D        .byte $8D   ; 
- - - - - - 0x030850 0C:8840: 36        .byte $36   ; <6>
- - - - - - 0x030851 0C:8841: 05        .byte $05   ; 
- - - - - - 0x030852 0C:8842: 60        .byte $60   ; 
C - - - - - 0x030853 0C:8843: C8        INY
C - - - - - 0x030854 0C:8844: B1 7D     LDA (ram_007D),Y
C - - - - - 0x030856 0C:8846: AA        TAX
C - - - - - 0x030857 0C:8847: C8        INY
C - - - - - 0x030858 0C:8848: B1 7D     LDA (ram_007D),Y
C - - - - - 0x03085A 0C:884A: 85 7E     STA ram_007E
C - - - - - 0x03085C 0C:884C: 86 7D     STX ram_007D
C - - - - - 0x03085E 0C:884E: 4C 15 88  JMP $8815
C D 0 - - - 0x030861 0C:8851: A8        TAY
C - - - - - 0x030862 0C:8852: 0A        ASL
C - - - - - 0x030863 0C:8853: AA        TAX
C - - - - - 0x030864 0C:8854: BD CF B3  LDA $B3CF,X
C - - - - - 0x030867 0C:8857: 85 50     STA ram_0050
C - - - - - 0x030869 0C:8859: BD D0 B3  LDA $B3D0,X
C - - - - - 0x03086C 0C:885C: 85 51     STA ram_0051
C - - - - - 0x03086E 0C:885E: 98        TYA
C - - - - - 0x03086F 0C:885F: 29 03     AND #$03
C - - - - - 0x030871 0C:8861: AA        TAX
C - - - - - 0x030872 0C:8862: 98        TYA
C - - - - - 0x030873 0C:8863: 4A        LSR
C - - - - - 0x030874 0C:8864: 4A        LSR
C - - - - - 0x030875 0C:8865: A8        TAY
C - - - - - 0x030876 0C:8866: B9 BD B3  LDA $B3BD,Y
C D 0 - - - 0x030879 0C:8869: CA        DEX
C - - - - - 0x03087A 0C:886A: 30 05     BMI $8871
C - - - - - 0x03087C 0C:886C: 4A        LSR
C - - - - - 0x03087D 0C:886D: 4A        LSR
C - - - - - 0x03087E 0C:886E: 4C 69 88  JMP $8869
C - - - - - 0x030881 0C:8871: 29 03     AND #$03
C - - - - - 0x030883 0C:8873: 8D C6 05  STA ram_05C6
C - - - - - 0x030886 0C:8876: 0A        ASL
C - - - - - 0x030887 0C:8877: 0A        ASL
C - - - - - 0x030888 0C:8878: 0A        ASL
C - - - - - 0x030889 0C:8879: 6D C6 05  ADC ram_05C6
C - - - - - 0x03088C 0C:887C: 8D C6 05  STA ram_05C6
C - - - - - 0x03088F 0C:887F: A9 00     LDA #$00
C - - - - - 0x030891 0C:8881: 8D C5 05  STA ram_05C5
C - - - - - 0x030894 0C:8884: A9 01     LDA #$01
C - - - - - 0x030896 0C:8886: 20 15 C5  JSR $C515
C - - - - - 0x030899 0C:8889: AD 15 05  LDA ram_0515
C - - - - - 0x03089C 0C:888C: D0 F6     BNE $8884
C - - - - - 0x03089E 0C:888E: A9 01     LDA #$01
C - - - - - 0x0308A0 0C:8890: 8D 15 05  STA ram_0515
C - - - - - 0x0308A3 0C:8893: A0 02     LDY #$02
C - - - - - 0x0308A5 0C:8895: B1 50     LDA (ram_0050),Y
C - - - - - 0x0308A7 0C:8897: 0A        ASL
C - - - - - 0x0308A8 0C:8898: 18        CLC
C - - - - - 0x0308A9 0C:8899: 69 06     ADC #$06
C - - - - - 0x0308AB 0C:889B: AA        TAX
C - - - - - 0x0308AC 0C:889C: A9 00     LDA #$00
C - - - - - 0x0308AE 0C:889E: 9D A5 04  STA ram_04A5,X
C - - - - - 0x0308B1 0C:88A1: CA        DEX
C - - - - - 0x0308B2 0C:88A2: 10 FA     BPL $889E
C - - - - - 0x0308B4 0C:88A4: A2 00     LDX #$00
C - - - - - 0x0308B6 0C:88A6: 20 B9 88  JSR $88B9
C - - - - - 0x0308B9 0C:88A9: F0 0D     BEQ $88B8
C - - - - - 0x0308BB 0C:88AB: A0 02     LDY #$02
C - - - - - 0x0308BD 0C:88AD: B1 50     LDA (ram_0050),Y
C - - - - - 0x0308BF 0C:88AF: 18        CLC
C - - - - - 0x0308C0 0C:88B0: 69 03     ADC #$03
C - - - - - 0x0308C2 0C:88B2: AA        TAX
C - - - - - 0x0308C3 0C:88B3: 20 B9 88  JSR $88B9
C - - - - - 0x0308C6 0C:88B6: D0 CC     BNE $8884
C - - - - - 0x0308C8 0C:88B8: 60        RTS
C - - - - - 0x0308C9 0C:88B9: A9 FF     LDA #$FF
C - - - - - 0x0308CB 0C:88BB: 85 45     STA ram_0045
C - - - - - 0x0308CD 0C:88BD: A0 02     LDY #$02
C - - - - - 0x0308CF 0C:88BF: B1 50     LDA (ram_0050),Y
C - - - - - 0x0308D1 0C:88C1: 9D A5 04  STA ram_04A5,X
C - - - - - 0x0308D4 0C:88C4: A9 00     LDA #$00
C - - - - - 0x0308D6 0C:88C6: 85 3A     STA ram_003A
C - - - - - 0x0308D8 0C:88C8: AD C5 05  LDA ram_05C5
C - - - - - 0x0308DB 0C:88CB: 4A        LSR
C - - - - - 0x0308DC 0C:88CC: 66 3A     ROR ram_003A
C - - - - - 0x0308DE 0C:88CE: 4A        LSR
C - - - - - 0x0308DF 0C:88CF: 66 3A     ROR ram_003A
C - - - - - 0x0308E1 0C:88D1: 4A        LSR
C - - - - - 0x0308E2 0C:88D2: 66 3A     ROR ram_003A
C - - - - - 0x0308E4 0C:88D4: 85 3B     STA ram_003B
C - - - - - 0x0308E6 0C:88D6: A0 00     LDY #$00
C - - - - - 0x0308E8 0C:88D8: B1 50     LDA (ram_0050),Y
C - - - - - 0x0308EA 0C:88DA: 18        CLC
C - - - - - 0x0308EB 0C:88DB: 65 3A     ADC ram_003A
C - - - - - 0x0308ED 0C:88DD: 9D A6 04  STA ram_04A6,X
C - - - - - 0x0308F0 0C:88E0: C8        INY
C - - - - - 0x0308F1 0C:88E1: B1 50     LDA (ram_0050),Y
C - - - - - 0x0308F3 0C:88E3: 65 3B     ADC ram_003B
C - - - - - 0x0308F5 0C:88E5: 9D A7 04  STA ram_04A7,X
C - - - - - 0x0308F8 0C:88E8: C9 22     CMP #$22
C - - - - - 0x0308FA 0C:88EA: B0 0D     BCS $88F9
C - - - - - 0x0308FC 0C:88EC: AD CE 05  LDA ram_05CE
C - - - - - 0x0308FF 0C:88EF: 4A        LSR
C - - - - - 0x030900 0C:88F0: 4A        LSR
C - - - - - 0x030901 0C:88F1: 4A        LSR
C - - - - - 0x030902 0C:88F2: 4A        LSR
C - - - - - 0x030903 0C:88F3: 1D A7 04  ORA ram_04A7,X
C - - - - - 0x030906 0C:88F6: 9D A7 04  STA ram_04A7,X
C - - - - - 0x030909 0C:88F9: 86 3A     STX ram_003A
C - - - - - 0x03090B 0C:88FB: A2 00     LDX #$00
C - - - - - 0x03090D 0C:88FD: A0 05     LDY #$05
C - - - - - 0x03090F 0C:88FF: B1 50     LDA (ram_0050),Y
C - - - - - 0x030911 0C:8901: CD C5 05  CMP ram_05C5
C - - - - - 0x030914 0C:8904: F0 12     BEQ $8918
C - - - - - 0x030916 0C:8906: B0 41     BCS $8949
C - - - - - 0x030918 0C:8908: A0 07     LDY #$07
C - - - - - 0x03091A 0C:890A: 18        CLC
C - - - - - 0x03091B 0C:890B: 71 50     ADC (ram_0050),Y
C - - - - - 0x03091D 0C:890D: A2 06     LDX #$06
C - - - - - 0x03091F 0C:890F: CD C5 05  CMP ram_05C5
C - - - - - 0x030922 0C:8912: F0 04     BEQ $8918
C - - - - - 0x030924 0C:8914: 90 33     BCC $8949
C - - - - - 0x030926 0C:8916: A2 03     LDX #$03
C - - - - - 0x030928 0C:8918: A0 06     LDY #$06
C - - - - - 0x03092A 0C:891A: B1 50     LDA (ram_0050),Y
C - - - - - 0x03092C 0C:891C: 38        SEC
C - - - - - 0x03092D 0C:891D: E9 02     SBC #$02
C - - - - - 0x03092F 0C:891F: 85 3B     STA ram_003B
C - - - - - 0x030931 0C:8921: A5 3A     LDA ram_003A
C - - - - - 0x030933 0C:8923: A0 04     LDY #$04
C - - - - - 0x030935 0C:8925: 18        CLC
C - - - - - 0x030936 0C:8926: 71 50     ADC (ram_0050),Y
C - - - - - 0x030938 0C:8928: A8        TAY
C - - - - - 0x030939 0C:8929: 86 45     STX ram_0045
C - - - - - 0x03093B 0C:892B: 8A        TXA
C - - - - - 0x03093C 0C:892C: 18        CLC
C - - - - - 0x03093D 0C:892D: 6D C6 05  ADC ram_05C6
C - - - - - 0x030940 0C:8930: AA        TAX
C - - - - - 0x030941 0C:8931: BD 9E 8D  LDA $8D9E,X
C - - - - - 0x030944 0C:8934: 99 A8 04  STA ram_04A8,Y
C - - - - - 0x030947 0C:8937: BD 9F 8D  LDA $8D9F,X
C - - - - - 0x03094A 0C:893A: C8        INY
C - - - - - 0x03094B 0C:893B: 99 A8 04  STA ram_04A8,Y
C - - - - - 0x03094E 0C:893E: C8        INY
C - - - - - 0x03094F 0C:893F: C6 3B     DEC ram_003B
C - - - - - 0x030951 0C:8941: D0 F8     BNE $893B
C - - - - - 0x030953 0C:8943: BD A0 8D  LDA $8DA0,X
C - - - - - 0x030956 0C:8946: 99 A8 04  STA ram_04A8,Y
C - - - - - 0x030959 0C:8949: A0 08     LDY #$08
C - - - - - 0x03095B 0C:894B: B1 50     LDA (ram_0050),Y
C - - - - - 0x03095D 0C:894D: F0 27     BEQ $8976
C - - - - - 0x03095F 0C:894F: 85 3B     STA ram_003B
C - - - - - 0x030961 0C:8951: C8        INY
C - - - - - 0x030962 0C:8952: A9 00     LDA #$00
C - - - - - 0x030964 0C:8954: 85 3C     STA ram_003C
C - - - - - 0x030966 0C:8956: B1 50     LDA (ram_0050),Y
C - - - - - 0x030968 0C:8958: CD C5 05  CMP ram_05C5
C - - - - - 0x03096B 0C:895B: F0 0A     BEQ $8967
C - - - - - 0x03096D 0C:895D: 38        SEC
C - - - - - 0x03096E 0C:895E: E9 01     SBC #$01
C - - - - - 0x030970 0C:8960: E6 3C     INC ram_003C
C - - - - - 0x030972 0C:8962: CD C5 05  CMP ram_05C5
C - - - - - 0x030975 0C:8965: D0 07     BNE $896E
C - - - - - 0x030977 0C:8967: 84 48     STY ram_0048
C - - - - - 0x030979 0C:8969: 20 86 89  JSR $8986
C - - - - - 0x03097C 0C:896C: A4 48     LDY ram_0048
C - - - - - 0x03097E 0C:896E: C8        INY
C - - - - - 0x03097F 0C:896F: C8        INY
C - - - - - 0x030980 0C:8970: C8        INY
C - - - - - 0x030981 0C:8971: C8        INY
C - - - - - 0x030982 0C:8972: C6 3B     DEC ram_003B
C - - - - - 0x030984 0C:8974: D0 DC     BNE $8952
C - - - - - 0x030986 0C:8976: A9 80     LDA #$80
C - - - - - 0x030988 0C:8978: 8D 15 05  STA ram_0515
C - - - - - 0x03098B 0C:897B: AD C5 05  LDA ram_05C5
C - - - - - 0x03098E 0C:897E: EE C5 05  INC ram_05C5
C - - - - - 0x030991 0C:8981: A0 03     LDY #$03
C - - - - - 0x030993 0C:8983: D1 50     CMP (ram_0050),Y
C - - - - - 0x030995 0C:8985: 60        RTS
C - - - - - 0x030996 0C:8986: C8        INY
C - - - - - 0x030997 0C:8987: B1 50     LDA (ram_0050),Y
C - - - - - 0x030999 0C:8989: 18        CLC
C - - - - - 0x03099A 0C:898A: 65 3A     ADC ram_003A
C - - - - - 0x03099C 0C:898C: 85 3D     STA ram_003D
C - - - - - 0x03099E 0C:898E: C8        INY
C - - - - - 0x03099F 0C:898F: B1 50     LDA (ram_0050),Y
C - - - - - 0x0309A1 0C:8991: 85 3E     STA ram_003E
C - - - - - 0x0309A3 0C:8993: C8        INY
C - - - - - 0x0309A4 0C:8994: B1 50     LDA (ram_0050),Y
C - - - - - 0x0309A6 0C:8996: 85 3F     STA ram_003F
C - - - - - 0x0309A8 0C:8998: A9 00     LDA #$00
C - - - - - 0x0309AA 0C:899A: 85 40     STA ram_0040
C D 0 - - - 0x0309AC 0C:899C: A4 40     LDY ram_0040
C - - - - - 0x0309AE 0C:899E: E6 40     INC ram_0040
C - - - - - 0x0309B0 0C:89A0: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0309B2 0C:89A2: C9 E0     CMP #$E0
C - - - - - 0x0309B4 0C:89A4: 90 06     BCC $89AC
C - - - - - 0x0309B6 0C:89A6: 20 B4 89  JSR $89B4
C - - - - - 0x0309B9 0C:89A9: 4C 9C 89  JMP $899C
C - - - - - 0x0309BC 0C:89AC: 20 24 C5  JSR $C524
C - - - - - 0x0309BF 0C:89AF: 20 9F 8C  JSR $8C9F
C - - - - - 0x0309C2 0C:89B2: D0 E8     BNE $899C
C - - - - - 0x0309C4 0C:89B4: 38        SEC
C - - - - - 0x0309C5 0C:89B5: E9 E0     SBC #$E0
C - - - - - 0x0309C7 0C:89B7: 20 09 C5  JSR $C509
- D 0 - I - 0x0309CA 0C:89BA: FA        .byte $FA   ; 
- D 0 - I - 0x0309CB 0C:89BB: 89        .byte $89   ; 
- D 0 - I - 0x0309CC 0C:89BC: 00        .byte $00   ; 
- D 0 - I - 0x0309CD 0C:89BD: 8A        .byte $8A   ; 
- D 0 - I - 0x0309CE 0C:89BE: 06        .byte $06   ; 
- D 0 - I - 0x0309CF 0C:89BF: 8A        .byte $8A   ; 
- D 0 - I - 0x0309D0 0C:89C0: 0C        .byte $0C   ; 
- D 0 - I - 0x0309D1 0C:89C1: 8A        .byte $8A   ; 
- D 0 - I - 0x0309D2 0C:89C2: 12        .byte $12   ; 
- D 0 - I - 0x0309D3 0C:89C3: 8A        .byte $8A   ; 
- D 0 - I - 0x0309D4 0C:89C4: 86        .byte $86   ; 
- D 0 - I - 0x0309D5 0C:89C5: 8A        .byte $8A   ; 
- D 0 - I - 0x0309D6 0C:89C6: 93        .byte $93   ; 
- D 0 - I - 0x0309D7 0C:89C7: 8A        .byte $8A   ; 
- D 0 - I - 0x0309D8 0C:89C8: AF        .byte $AF   ; 
- D 0 - I - 0x0309D9 0C:89C9: 8A        .byte $8A   ; 
- D 0 - I - 0x0309DA 0C:89CA: B8        .byte $B8   ; 
- D 0 - I - 0x0309DB 0C:89CB: 8A        .byte $8A   ; 
- D 0 - I - 0x0309DC 0C:89CC: C1        .byte $C1   ; 
- D 0 - I - 0x0309DD 0C:89CD: 8A        .byte $8A   ; 
- D 0 - I - 0x0309DE 0C:89CE: C1        .byte $C1   ; 
- D 0 - I - 0x0309DF 0C:89CF: 8A        .byte $8A   ; 
- D 0 - I - 0x0309E0 0C:89D0: D7        .byte $D7   ; 
- D 0 - I - 0x0309E1 0C:89D1: 8A        .byte $8A   ; 
- D 0 - I - 0x0309E2 0C:89D2: DF        .byte $DF   ; 
- D 0 - I - 0x0309E3 0C:89D3: 8A        .byte $8A   ; 
- D 0 - I - 0x0309E4 0C:89D4: E7        .byte $E7   ; 
- D 0 - I - 0x0309E5 0C:89D5: 8A        .byte $8A   ; 
- D 0 - I - 0x0309E6 0C:89D6: 2F        .byte $2F   ; 
- D 0 - I - 0x0309E7 0C:89D7: 8B        .byte $8B   ; 
- D 0 - I - 0x0309E8 0C:89D8: 48        .byte $48   ; <H>
- D 0 - I - 0x0309E9 0C:89D9: 8B        .byte $8B   ; 
- D 0 - I - 0x0309EA 0C:89DA: 8B        .byte $8B   ; 
- D 0 - I - 0x0309EB 0C:89DB: 8B        .byte $8B   ; 
- D 0 - I - 0x0309EC 0C:89DC: D5        .byte $D5   ; 
- D 0 - I - 0x0309ED 0C:89DD: 8B        .byte $8B   ; 
- D 0 - I - 0x0309EE 0C:89DE: DE        .byte $DE   ; 
- D 0 - I - 0x0309EF 0C:89DF: 8B        .byte $8B   ; 
- - - - - - 0x0309F0 0C:89E0: E4        .byte $E4   ; 
- - - - - - 0x0309F1 0C:89E1: 8B        .byte $8B   ; 
- D 0 - I - 0x0309F2 0C:89E2: EA        .byte $EA   ; 
- D 0 - I - 0x0309F3 0C:89E3: 8B        .byte $8B   ; 
- D 0 - I - 0x0309F4 0C:89E4: F0        .byte $F0   ; 
- D 0 - I - 0x0309F5 0C:89E5: 8B        .byte $8B   ; 
- D 0 - I - 0x0309F6 0C:89E6: 04        .byte $04   ; 
- D 0 - I - 0x0309F7 0C:89E7: 8C        .byte $8C   ; 
- D 0 - I - 0x0309F8 0C:89E8: 47        .byte $47   ; <G>
- D 0 - I - 0x0309F9 0C:89E9: 8C        .byte $8C   ; 
- - - - - - 0x0309FA 0C:89EA: 52        .byte $52   ; <R>
- - - - - - 0x0309FB 0C:89EB: 8C        .byte $8C   ; 
- - - - - - 0x0309FC 0C:89EC: 52        .byte $52   ; <R>
- - - - - - 0x0309FD 0C:89ED: 8C        .byte $8C   ; 
- - - - - - 0x0309FE 0C:89EE: 52        .byte $52   ; <R>
- - - - - - 0x0309FF 0C:89EF: 8C        .byte $8C   ; 
- - - - - - 0x030A00 0C:89F0: 52        .byte $52   ; <R>
- - - - - - 0x030A01 0C:89F1: 8C        .byte $8C   ; 
- D 0 - I - 0x030A02 0C:89F2: 52        .byte $52   ; <R>
- D 0 - I - 0x030A03 0C:89F3: 8C        .byte $8C   ; 
- - - - - - 0x030A04 0C:89F4: 55        .byte $55   ; <U>
- - - - - - 0x030A05 0C:89F5: 8C        .byte $8C   ; 
- - - - - - 0x030A06 0C:89F6: 55        .byte $55   ; <U>
- - - - - - 0x030A07 0C:89F7: 8C        .byte $8C   ; 
- - - - - - 0x030A08 0C:89F8: 55        .byte $55   ; <U>
- - - - - - 0x030A09 0C:89F9: 8C        .byte $8C   ; 
C - - J - - 0x030A0A 0C:89FA: AD 41 04  LDA ram_0441
C - - - - - 0x030A0D 0C:89FD: 4C DC 8C  JMP $8CDC
C - - J - - 0x030A10 0C:8A00: AD 41 04  LDA ram_0441
C - - - - - 0x030A13 0C:8A03: 4C A5 8C  JMP $8CA5
C - - J - - 0x030A16 0C:8A06: AD FC 05  LDA ram_05FC
C - - - - - 0x030A19 0C:8A09: 4C DC 8C  JMP $8CDC
C - - J - - 0x030A1C 0C:8A0C: AD FC 05  LDA ram_05FC
C - - - - - 0x030A1F 0C:8A0F: 4C A5 8C  JMP $8CA5
C - - J - - 0x030A22 0C:8A12: AD 3B 04  LDA ram_043B
C - - - - - 0x030A25 0C:8A15: 20 09 C5  JSR $C509
- D 0 - I - 0x030A28 0C:8A18: 20        .byte $20   ; 
- D 0 - I - 0x030A29 0C:8A19: 8A        .byte $8A   ; 
- D 0 - I - 0x030A2A 0C:8A1A: 34        .byte $34   ; <4>
- D 0 - I - 0x030A2B 0C:8A1B: 8A        .byte $8A   ; 
- D 0 - I - 0x030A2C 0C:8A1C: 39        .byte $39   ; <9>
- D 0 - I - 0x030A2D 0C:8A1D: 8A        .byte $8A   ; 
- D 0 - I - 0x030A2E 0C:8A1E: 3E        .byte $3E   ; 
- D 0 - I - 0x030A2F 0C:8A1F: 8A        .byte $8A   ; 
C - - J - - 0x030A30 0C:8A20: A4 40     LDY ram_0040
C - - - - - 0x030A32 0C:8A22: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030A34 0C:8A24: D0 09     BNE $8A2F
C - - - - - 0x030A36 0C:8A26: AD 4E 04  LDA ram_044E
C - - - - - 0x030A39 0C:8A29: 18        CLC
C - - - - - 0x030A3A 0C:8A2A: 69 9A     ADC #$9A
C - - - - - 0x030A3C 0C:8A2C: 4C 56 8A  JMP $8A56
C - - - - - 0x030A3F 0C:8A2F: A9 9A     LDA #$9A
C - - - - - 0x030A41 0C:8A31: 4C 43 8A  JMP $8A43
C - - J - - 0x030A44 0C:8A34: A9 C4     LDA #$C4
C - - - - - 0x030A46 0C:8A36: 4C 43 8A  JMP $8A43
C - - J - - 0x030A49 0C:8A39: A9 BD     LDA #$BD
C - - - - - 0x030A4B 0C:8A3B: 4C 43 8A  JMP $8A43
C - - J - - 0x030A4E 0C:8A3E: A9 C8     LDA #$C8
C - - - - - 0x030A50 0C:8A40: 4C 43 8A  JMP $8A43
C D 0 - - - 0x030A53 0C:8A43: AA        TAX
C - - - - - 0x030A54 0C:8A44: A4 40     LDY ram_0040
C - - - - - 0x030A56 0C:8A46: E6 40     INC ram_0040
C - - - - - 0x030A58 0C:8A48: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030A5A 0C:8A4A: F0 09     BEQ $8A55
C - - - - - 0x030A5C 0C:8A4C: A8        TAY
C - - - - - 0x030A5D 0C:8A4D: 8A        TXA
C - - - - - 0x030A5E 0C:8A4E: 18        CLC
C - - - - - 0x030A5F 0C:8A4F: 79 30 04  ADC ram_0430,Y
C - - - - - 0x030A62 0C:8A52: 4C 56 8A  JMP $8A56
C - - - - - 0x030A65 0C:8A55: 8A        TXA
C D 0 - - - 0x030A66 0C:8A56: 85 47     STA ram_0047
C - - - - - 0x030A68 0C:8A58: 20 3C C5  JSR $C53C
C - - - - - 0x030A6B 0C:8A5B: A5 47     LDA ram_0047
C - - - - - 0x030A6D 0C:8A5D: A0 09     LDY #$09
C - - - - - 0x030A6F 0C:8A5F: C9 AA     CMP #$AA
C - - - - - 0x030A71 0C:8A61: F0 0B     BEQ $8A6E
C - - - - - 0x030A73 0C:8A63: A0 00     LDY #$00
C - - - - - 0x030A75 0C:8A65: B1 30     LDA (ram_0030),Y
C - - - - - 0x030A77 0C:8A67: C9 FC     CMP #$FC
C - - - - - 0x030A79 0C:8A69: F0 03     BEQ $8A6E
C - - - - - 0x030A7B 0C:8A6B: C8        INY
C - - - - - 0x030A7C 0C:8A6C: D0 F7     BNE $8A65
C - - - - - 0x030A7E 0C:8A6E: 98        TYA
C D 0 - - - 0x030A7F 0C:8A6F: 85 49     STA ram_0049
C - - - - - 0x030A81 0C:8A71: A9 00     LDA #$00
C - - - - - 0x030A83 0C:8A73: 85 46     STA ram_0046
C - - - - - 0x030A85 0C:8A75: A4 46     LDY ram_0046
C - - - - - 0x030A87 0C:8A77: B1 30     LDA (ram_0030),Y
C - - - - - 0x030A89 0C:8A79: 20 24 C5  JSR $C524
C - - - - - 0x030A8C 0C:8A7C: 20 9F 8C  JSR $8C9F
C - - - - - 0x030A8F 0C:8A7F: E6 46     INC ram_0046
C - - - - - 0x030A91 0C:8A81: C6 49     DEC ram_0049
C - - - - - 0x030A93 0C:8A83: D0 F0     BNE $8A75
C - - - - - 0x030A95 0C:8A85: 60        RTS
C - - J - - 0x030A96 0C:8A86: A4 40     LDY ram_0040
C - - - - - 0x030A98 0C:8A88: E6 40     INC ram_0040
C - - - - - 0x030A9A 0C:8A8A: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030A9C 0C:8A8C: AA        TAX
C - - - - - 0x030A9D 0C:8A8D: BD 01 06  LDA ram_0601,X
C - - - - - 0x030AA0 0C:8A90: 4C 1A 8D  JMP $8D1A
C - - J - - 0x030AA3 0C:8A93: A4 40     LDY ram_0040
C - - - - - 0x030AA5 0C:8A95: E6 40     INC ram_0040
C - - - - - 0x030AA7 0C:8A97: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030AA9 0C:8A99: F0 04     BEQ $8A9F
C - - - - - 0x030AAB 0C:8A9B: AA        TAX
C - - - - - 0x030AAC 0C:8A9C: BD 30 04  LDA ram_0430,X
C - - - - - 0x030AAF 0C:8A9F: AE 1E 06  LDX ram_061E
C - - - - - 0x030AB2 0C:8AA2: BC 0B 06  LDY ram_060B,X
C - - - - - 0x030AB5 0C:8AA5: 18        CLC
C - - - - - 0x030AB6 0C:8AA6: 79 AC 8A  ADC $8AAC,Y
C - - - - - 0x030AB9 0C:8AA9: 4C 6C 8D  JMP $8D6C
- D 0 - - - 0x030ABC 0C:8AAC: CD        .byte $CD   ; 
- D 0 - - - 0x030ABD 0C:8AAD: D1        .byte $D1   ; 
- D 0 - - - 0x030ABE 0C:8AAE: D7        .byte $D7   ; 
C - - J - - 0x030ABF 0C:8AAF: AE 1E 06  LDX ram_061E
C - - - - - 0x030AC2 0C:8AB2: BD 01 06  LDA ram_0601,X
C - - - - - 0x030AC5 0C:8AB5: 4C DC 8C  JMP $8CDC
C - - J - - 0x030AC8 0C:8AB8: AE 1E 06  LDX ram_061E
C - - - - - 0x030ACB 0C:8ABB: BD 01 06  LDA ram_0601,X
C - - - - - 0x030ACE 0C:8ABE: 4C A5 8C  JMP $8CA5
C - - J - - 0x030AD1 0C:8AC1: A4 40     LDY ram_0040
C - - - - - 0x030AD3 0C:8AC3: E6 40     INC ram_0040
C - - - - - 0x030AD5 0C:8AC5: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030AD7 0C:8AC7: AA        TAX
C - - - - - 0x030AD8 0C:8AC8: BD 31 04  LDA ram_0431,X
C - - - - - 0x030ADB 0C:8ACB: E8        INX
C - - - - - 0x030ADC 0C:8ACC: EC 30 04  CPX ram_0430
C - - - - - 0x030ADF 0C:8ACF: 90 03     BCC $8AD4
C - - - - - 0x030AE1 0C:8AD1: F0 01     BEQ $8AD4
C - - - - - 0x030AE3 0C:8AD3: 60        RTS
C - - - - - 0x030AE4 0C:8AD4: 4C 1A 8D  JMP $8D1A
C - - J - - 0x030AE7 0C:8AD7: AD FB 05  LDA ram_05FB
C - - - - - 0x030AEA 0C:8ADA: 49 0B     EOR #$0B
C - - - - - 0x030AEC 0C:8ADC: 4C DC 8C  JMP $8CDC
C - - J - - 0x030AEF 0C:8ADF: AD FB 05  LDA ram_05FB
C - - - - - 0x030AF2 0C:8AE2: 49 0B     EOR #$0B
C - - - - - 0x030AF4 0C:8AE4: 4C A5 8C  JMP $8CA5
C - - J - - 0x030AF7 0C:8AE7: A4 40     LDY ram_0040
C - - - - - 0x030AF9 0C:8AE9: E6 40     INC ram_0040
C - - - - - 0x030AFB 0C:8AEB: AE 2A 00  LDX a: ram_002A
C - - - - - 0x030AFE 0C:8AEE: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030B00 0C:8AF0: F0 03     BEQ $8AF5
C - - - - - 0x030B02 0C:8AF2: AE 2B 00  LDX a: ram_002B
C - - - - - 0x030B05 0C:8AF5: BD 0A 8B  LDA $8B0A,X
C - - - - - 0x030B08 0C:8AF8: 48        PHA
C - - - - - 0x030B09 0C:8AF9: 8A        TXA
C - - - - - 0x030B0A 0C:8AFA: 18        CLC
C - - - - - 0x030B0B 0C:8AFB: 69 76     ADC #$76
C - - - - - 0x030B0D 0C:8AFD: C9 9A     CMP #$9A
C - - - - - 0x030B0F 0C:8AFF: 90 02     BCC $8B03
- - - - - - 0x030B11 0C:8B01: A9        .byte $A9   ; 
- - - - - - 0x030B12 0C:8B02: 99        .byte $99   ; 
C - - - - - 0x030B13 0C:8B03: 20 3C C5  JSR $C53C
C - - - - - 0x030B16 0C:8B06: 68        PLA
C - - - - - 0x030B17 0C:8B07: 4C 6F 8A  JMP $8A6F
- D 0 - - - 0x030B1A 0C:8B0A: 03        .byte $03   ; 
- D 0 - - - 0x030B1B 0C:8B0B: 04        .byte $04   ; 
- D 0 - - - 0x030B1C 0C:8B0C: 03        .byte $03   ; 
- D 0 - - - 0x030B1D 0C:8B0D: 03        .byte $03   ; 
- D 0 - - - 0x030B1E 0C:8B0E: 03        .byte $03   ; 
- D 0 - - - 0x030B1F 0C:8B0F: 04        .byte $04   ; 
- D 0 - - - 0x030B20 0C:8B10: 03        .byte $03   ; 
- D 0 - - - 0x030B21 0C:8B11: 04        .byte $04   ; 
- D 0 - - - 0x030B22 0C:8B12: 03        .byte $03   ; 
- D 0 - - - 0x030B23 0C:8B13: 03        .byte $03   ; 
- D 0 - - - 0x030B24 0C:8B14: 03        .byte $03   ; 
- D 0 - - - 0x030B25 0C:8B15: 04        .byte $04   ; 
- D 0 - - - 0x030B26 0C:8B16: 03        .byte $03   ; 
- D 0 - - - 0x030B27 0C:8B17: 03        .byte $03   ; 
- D 0 - - - 0x030B28 0C:8B18: 04        .byte $04   ; 
- D 0 - - - 0x030B29 0C:8B19: 03        .byte $03   ; 
- D 0 - - - 0x030B2A 0C:8B1A: 03        .byte $03   ; 
- D 0 - - - 0x030B2B 0C:8B1B: 03        .byte $03   ; 
- D 0 - - - 0x030B2C 0C:8B1C: 03        .byte $03   ; 
- D 0 - - - 0x030B2D 0C:8B1D: 03        .byte $03   ; 
- D 0 - - - 0x030B2E 0C:8B1E: 03        .byte $03   ; 
- D 0 - - - 0x030B2F 0C:8B1F: 03        .byte $03   ; 
- D 0 - - - 0x030B30 0C:8B20: 03        .byte $03   ; 
- D 0 - - - 0x030B31 0C:8B21: 03        .byte $03   ; 
- D 0 - - - 0x030B32 0C:8B22: 04        .byte $04   ; 
- D 0 - - - 0x030B33 0C:8B23: 03        .byte $03   ; 
- D 0 - - - 0x030B34 0C:8B24: 03        .byte $03   ; 
- D 0 - - - 0x030B35 0C:8B25: 03        .byte $03   ; 
- D 0 - - - 0x030B36 0C:8B26: 04        .byte $04   ; 
- D 0 - - - 0x030B37 0C:8B27: 04        .byte $04   ; 
- D 0 - - - 0x030B38 0C:8B28: 04        .byte $04   ; 
- D 0 - - - 0x030B39 0C:8B29: 04        .byte $04   ; 
- D 0 - - - 0x030B3A 0C:8B2A: 04        .byte $04   ; 
- D 0 - - - 0x030B3B 0C:8B2B: 03        .byte $03   ; 
- D 0 - - - 0x030B3C 0C:8B2C: 03        .byte $03   ; 
- D 0 - - - 0x030B3D 0C:8B2D: 04        .byte $04   ; 
- - - - - - 0x030B3E 0C:8B2E: 04        .byte $04   ; 
C - - J - - 0x030B3F 0C:8B2F: A4 40     LDY ram_0040
C - - - - - 0x030B41 0C:8B31: E6 40     INC ram_0040
C - - - - - 0x030B43 0C:8B33: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030B45 0C:8B35: AA        TAX
C - - - - - 0x030B46 0C:8B36: BD 28 00  LDA a: ram_0028,X
C - - - - - 0x030B49 0C:8B39: AC 27 00  LDY a: ram_0027
C - - - - - 0x030B4C 0C:8B3C: C0 04     CPY #$04
C - - - - - 0x030B4E 0C:8B3E: D0 03     BNE $8B43
C - - - - - 0x030B50 0C:8B40: BD 10 06  LDA ram_0610,X
C - - - - - 0x030B53 0C:8B43: A2 00     LDX #$00
C - - - - - 0x030B55 0C:8B45: 4C 55 8C  JMP $8C55
C - - J - - 0x030B58 0C:8B48: A9 00     LDA #$00
C - - - - - 0x030B5A 0C:8B4A: 85 47     STA ram_0047
C - - - - - 0x030B5C 0C:8B4C: AD 27 00  LDA a: ram_0027
C - - - - - 0x030B5F 0C:8B4F: 0A        ASL
C - - - - - 0x030B60 0C:8B50: 0A        ASL
C - - - - - 0x030B61 0C:8B51: 6D 27 00  ADC a: ram_0027
C - - - - - 0x030B64 0C:8B54: 65 47     ADC ram_0047
C - - - - - 0x030B66 0C:8B56: AA        TAX
C - - - - - 0x030B67 0C:8B57: BD 72 8B  LDA $8B72,X
C - - - - - 0x030B6A 0C:8B5A: C9 FF     CMP #$FF
C - - - - - 0x030B6C 0C:8B5C: F0 09     BEQ $8B67
C - - - - - 0x030B6E 0C:8B5E: 20 24 C5  JSR $C524
C - - - - - 0x030B71 0C:8B61: 20 9F 8C  JSR $8C9F
C - - - - - 0x030B74 0C:8B64: 4C 69 8B  JMP $8B69
C - - - - - 0x030B77 0C:8B67: E6 3D     INC ram_003D
C D 0 - - - 0x030B79 0C:8B69: E6 47     INC ram_0047
C - - - - - 0x030B7B 0C:8B6B: A5 47     LDA ram_0047
C - - - - - 0x030B7D 0C:8B6D: C9 05     CMP #$05
C - - - - - 0x030B7F 0C:8B6F: D0 DB     BNE $8B4C
C - - - - - 0x030B81 0C:8B71: 60        RTS
- D 0 - - - 0x030B82 0C:8B72: FF        .byte $FF   ; 
- D 0 - - - 0x030B83 0C:8B73: A8        .byte $A8   ; 
- D 0 - - - 0x030B84 0C:8B74: 2E        .byte $2E   ; 
- D 0 - - - 0x030B85 0C:8B75: FF        .byte $FF   ; 
- D 0 - - - 0x030B86 0C:8B76: FF        .byte $FF   ; 
- D 0 - - - 0x030B87 0C:8B77: FF        .byte $FF   ; 
- D 0 - - - 0x030B88 0C:8B78: 0A        .byte $0A   ; 
- D 0 - - - 0x030B89 0C:8B79: 03        .byte $03   ; 
- D 0 - - - 0x030B8A 0C:8B7A: FF        .byte $FF   ; 
- D 0 - - - 0x030B8B 0C:8B7B: FF        .byte $FF   ; 
- D 0 - - - 0x030B8C 0C:8B7C: 04        .byte $04   ; 
- D 0 - - - 0x030B8D 0C:8B7D: 2E        .byte $2E   ; 
- D 0 - - - 0x030B8E 0C:8B7E: 00        .byte $00   ; 
- D 0 - - - 0x030B8F 0C:8B7F: A8        .byte $A8   ; 
- D 0 - - - 0x030B90 0C:8B80: 2E        .byte $2E   ; 
- D 0 - - - 0x030B91 0C:8B81: 04        .byte $04   ; 
- D 0 - - - 0x030B92 0C:8B82: 2E        .byte $2E   ; 
- D 0 - - - 0x030B93 0C:8B83: 00        .byte $00   ; 
- D 0 - - - 0x030B94 0C:8B84: 0A        .byte $0A   ; 
- D 0 - - - 0x030B95 0C:8B85: 03        .byte $03   ; 
- - - - - - 0x030B96 0C:8B86: FF        .byte $FF   ; 
- - - - - - 0x030B97 0C:8B87: 8D        .byte $8D   ; 
- - - - - - 0x030B98 0C:8B88: 8B        .byte $8B   ; 
- - - - - - 0x030B99 0C:8B89: FF        .byte $FF   ; 
- - - - - - 0x030B9A 0C:8B8A: FF        .byte $FF   ; 
C - - J - - 0x030B9B 0C:8B8B: A2 00     LDX #$00
C - - - - - 0x030B9D 0C:8B8D: AD F7 05  LDA ram_05F7
C - - - - - 0x030BA0 0C:8B90: AC F8 05  LDY ram_05F8
C - - - - - 0x030BA3 0C:8B93: 38        SEC
C - - - - - 0x030BA4 0C:8B94: E9 06     SBC #$06
C - - - - - 0x030BA6 0C:8B96: B0 03     BCS $8B9B
C - - - - - 0x030BA8 0C:8B98: 88        DEY
C - - - - - 0x030BA9 0C:8B99: 30 03     BMI $8B9E
C - - - - - 0x030BAB 0C:8B9B: E8        INX
C - - - - - 0x030BAC 0C:8B9C: D0 F5     BNE $8B93
C - - - - - 0x030BAE 0C:8B9E: 69 06     ADC #$06
C - - - - - 0x030BB0 0C:8BA0: 0A        ASL
C - - - - - 0x030BB1 0C:8BA1: A8        TAY
C - - - - - 0x030BB2 0C:8BA2: 8A        TXA
C - - - - - 0x030BB3 0C:8BA3: 48        PHA
C - - - - - 0x030BB4 0C:8BA4: B9 C9 8B  LDA $8BC9,Y
C - - - - - 0x030BB7 0C:8BA7: 48        PHA
C - - - - - 0x030BB8 0C:8BA8: B9 CA 8B  LDA $8BCA,Y
C - - - - - 0x030BBB 0C:8BAB: A0 00     LDY #$00
C - - - - - 0x030BBD 0C:8BAD: 20 85 8C  JSR $8C85
C - - - - - 0x030BC0 0C:8BB0: C6 3D     DEC ram_003D
C - - - - - 0x030BC2 0C:8BB2: 68        PLA
C - - - - - 0x030BC3 0C:8BB3: A0 00     LDY #$00
C - - - - - 0x030BC5 0C:8BB5: 20 85 8C  JSR $8C85
C - - - - - 0x030BC8 0C:8BB8: C6 3D     DEC ram_003D
C - - - - - 0x030BCA 0C:8BBA: A9 77     LDA #$77
C - - - - - 0x030BCC 0C:8BBC: A0 00     LDY #$00
C - - - - - 0x030BCE 0C:8BBE: 20 85 8C  JSR $8C85
C - - - - - 0x030BD1 0C:8BC1: C6 3D     DEC ram_003D
C - - - - - 0x030BD3 0C:8BC3: 68        PLA
C - - - - - 0x030BD4 0C:8BC4: A2 00     LDX #$00
C - - - - - 0x030BD6 0C:8BC6: 4C 55 8C  JMP $8C55
- D 0 - - - 0x030BD9 0C:8BC9: 33        .byte $33   ; <3>
- D 0 - - - 0x030BDA 0C:8BCA: 33        .byte $33   ; <3>
- D 0 - - - 0x030BDB 0C:8BCB: 34        .byte $34   ; <4>
- D 0 - - - 0x030BDC 0C:8BCC: 33        .byte $33   ; <3>
- D 0 - - - 0x030BDD 0C:8BCD: 35        .byte $35   ; <5>
- D 0 - - - 0x030BDE 0C:8BCE: 33        .byte $33   ; <3>
- D 0 - - - 0x030BDF 0C:8BCF: 36        .byte $36   ; <6>
- D 0 - - - 0x030BE0 0C:8BD0: 33        .byte $33   ; <3>
- D 0 - - - 0x030BE1 0C:8BD1: 37        .byte $37   ; <7>
- D 0 - - - 0x030BE2 0C:8BD2: 33        .byte $33   ; <3>
- D 0 - - - 0x030BE3 0C:8BD3: 38        .byte $38   ; <8>
- D 0 - - - 0x030BE4 0C:8BD4: 33        .byte $33   ; <3>
C - - J - - 0x030BE5 0C:8BD5: A4 40     LDY ram_0040
C - - - - - 0x030BE7 0C:8BD7: E6 40     INC ram_0040
C - - - - - 0x030BE9 0C:8BD9: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030BEB 0C:8BDB: 4C 1A 8D  JMP $8D1A
C - - J - - 0x030BEE 0C:8BDE: AD FD 05  LDA ram_05FD
C - - - - - 0x030BF1 0C:8BE1: 4C 1A 8D  JMP $8D1A
- - - - - - 0x030BF4 0C:8BE4: AD        .byte $AD   ; 
- - - - - - 0x030BF5 0C:8BE5: FD        .byte $FD   ; 
- - - - - - 0x030BF6 0C:8BE6: 05        .byte $05   ; 
- - - - - - 0x030BF7 0C:8BE7: 4C        .byte $4C   ; <L>
- - - - - - 0x030BF8 0C:8BE8: A5        .byte $A5   ; 
- - - - - - 0x030BF9 0C:8BE9: 8C        .byte $8C   ; 
C - - J - - 0x030BFA 0C:8BEA: AD 41 04  LDA ram_0441
C - - - - - 0x030BFD 0C:8BED: 4C 1A 8D  JMP $8D1A
C - - J - - 0x030C00 0C:8BF0: A4 40     LDY ram_0040
C - - - - - 0x030C02 0C:8BF2: E6 40     INC ram_0040
C - - - - - 0x030C04 0C:8BF4: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030C06 0C:8BF6: 20 0C C5  JSR $C50C
C - - - - - 0x030C09 0C:8BF9: A0 02     LDY #$02
C - - - - - 0x030C0B 0C:8BFB: B1 34     LDA (ram_0034),Y
C - - - - - 0x030C0D 0C:8BFD: AA        TAX
C - - - - - 0x030C0E 0C:8BFE: 88        DEY
C - - - - - 0x030C0F 0C:8BFF: B1 34     LDA (ram_0034),Y
C - - - - - 0x030C11 0C:8C01: 4C 55 8C  JMP $8C55
C - - J - - 0x030C14 0C:8C04: AD 41 04  LDA ram_0441
C - - - - - 0x030C17 0C:8C07: 85 49     STA ram_0049
C - - - - - 0x030C19 0C:8C09: A5 49     LDA ram_0049
C - - - - - 0x030C1B 0C:8C0B: C9 0B     CMP #$0B
C - - - - - 0x030C1D 0C:8C0D: F0 37     BEQ $8C46
C - - - - - 0x030C1F 0C:8C0F: AE 30 04  LDX ram_0430
C - - - - - 0x030C22 0C:8C12: F0 0E     BEQ $8C22
C - - - - - 0x030C24 0C:8C14: DD 30 04  CMP ram_0430,X
C - - - - - 0x030C27 0C:8C17: F0 05     BEQ $8C1E
C - - - - - 0x030C29 0C:8C19: CA        DEX
C - - - - - 0x030C2A 0C:8C1A: D0 F8     BNE $8C14
C - - - - - 0x030C2C 0C:8C1C: F0 04     BEQ $8C22
C - - - - - 0x030C2E 0C:8C1E: E6 49     INC ram_0049
C - - - - - 0x030C30 0C:8C20: D0 E7     BNE $8C09
C - - - - - 0x030C32 0C:8C22: E6 49     INC ram_0049
C - - - - - 0x030C34 0C:8C24: 20 1A 8D  JSR $8D1A
C - - - - - 0x030C37 0C:8C27: A4 3C     LDY ram_003C
C - - - - - 0x030C39 0C:8C29: 88        DEY
C - - - - - 0x030C3A 0C:8C2A: F0 1A     BEQ $8C46
C - - - - - 0x030C3C 0C:8C2C: A9 17     LDA #$17
C - - - - - 0x030C3E 0C:8C2E: 85 3D     STA ram_003D
C - - - - - 0x030C40 0C:8C30: A5 49     LDA ram_0049
C - - - - - 0x030C42 0C:8C32: 38        SEC
C - - - - - 0x030C43 0C:8C33: E9 01     SBC #$01
C - - - - - 0x030C45 0C:8C35: A2 01     LDX #$01
C - - - - - 0x030C47 0C:8C37: 20 27 C5  JSR $C527
C - - - - - 0x030C4A 0C:8C3A: A5 32     LDA ram_0032
C - - - - - 0x030C4C 0C:8C3C: A6 33     LDX ram_0033
C - - - - - 0x030C4E 0C:8C3E: 20 55 8C  JSR $8C55
C - - - - - 0x030C51 0C:8C41: A5 49     LDA ram_0049
C - - - - - 0x030C53 0C:8C43: 8D 41 04  STA ram_0441
C - - - - - 0x030C56 0C:8C46: 60        RTS
C - - J - - 0x030C57 0C:8C47: AD FD 05  LDA ram_05FD
C - - - - - 0x030C5A 0C:8C4A: 18        CLC
C - - - - - 0x030C5B 0C:8C4B: 69 01     ADC #$01
C - - - - - 0x030C5D 0C:8C4D: A2 00     LDX #$00
C - - - - - 0x030C5F 0C:8C4F: 4C 55 8C  JMP $8C55
C - - J - - 0x030C62 0C:8C52: 68        PLA
C - - - - - 0x030C63 0C:8C53: 68        PLA
C - - - - - 0x030C64 0C:8C54: 60        RTS
C D 0 - - - 0x030C65 0C:8C55: A4 3C     LDY ram_003C
C - - - - - 0x030C67 0C:8C57: 88        DEY
C - - - - - 0x030C68 0C:8C58: F0 2A     BEQ $8C84
C - - - - - 0x030C6A 0C:8C5A: 85 6F     STA ram_006F
C - - - - - 0x030C6C 0C:8C5C: 86 70     STX ram_0070
C - - - - - 0x030C6E 0C:8C5E: A9 0A     LDA #$0A
C - - - - - 0x030C70 0C:8C60: 85 71     STA ram_0071
C - - - - - 0x030C72 0C:8C62: A9 00     LDA #$00
C - - - - - 0x030C74 0C:8C64: 85 74     STA ram_0074
C - - - - - 0x030C76 0C:8C66: 20 1E C5  JSR $C51E
C - - - - - 0x030C79 0C:8C69: A5 72     LDA ram_0072
C - - - - - 0x030C7B 0C:8C6B: 20 7A 8C  JSR $8C7A
C - - - - - 0x030C7E 0C:8C6E: A5 70     LDA ram_0070
C - - - - - 0x030C80 0C:8C70: D0 F4     BNE $8C66
C - - - - - 0x030C82 0C:8C72: A5 6F     LDA ram_006F
C - - - - - 0x030C84 0C:8C74: F0 0E     BEQ $8C84
C - - - - - 0x030C86 0C:8C76: C9 0A     CMP #$0A
C - - - - - 0x030C88 0C:8C78: B0 EC     BCS $8C66
C - - - - - 0x030C8A 0C:8C7A: 18        CLC
C - - - - - 0x030C8B 0C:8C7B: 69 33     ADC #$33
C - - - - - 0x030C8D 0C:8C7D: A0 00     LDY #$00
C - - - - - 0x030C8F 0C:8C7F: 20 85 8C  JSR $8C85
C - - - - - 0x030C92 0C:8C82: C6 3D     DEC ram_003D
C - - - - - 0x030C94 0C:8C84: 60        RTS
C - - - - - 0x030C95 0C:8C85: A6 3D     LDX ram_003D
C - - - - - 0x030C97 0C:8C87: C6 3C     DEC ram_003C
C - - - - - 0x030C99 0C:8C89: D0 0E     BNE $8C99
C - - - - - 0x030C9B 0C:8C8B: 98        TYA
C - - - - - 0x030C9C 0C:8C8C: F0 0E     BEQ $8C9C
C - - - - - 0x030C9E 0C:8C8E: AC C6 05  LDY ram_05C6
C - - - - - 0x030CA1 0C:8C91: C0 1B     CPY #$1B
C - - - - - 0x030CA3 0C:8C93: F0 04     BEQ $8C99
C - - - - - 0x030CA5 0C:8C95: A4 45     LDY ram_0045
C - - - - - 0x030CA7 0C:8C97: F0 03     BEQ $8C9C
C - - - - - 0x030CA9 0C:8C99: 9D A8 04  STA ram_04A8,X
C - - - - - 0x030CAC 0C:8C9C: E6 3C     INC ram_003C
C - - - - - 0x030CAE 0C:8C9E: 60        RTS
C - - - - - 0x030CAF 0C:8C9F: 20 85 8C  JSR $8C85
C - - - - - 0x030CB2 0C:8CA2: E6 3D     INC ram_003D
C - - - - - 0x030CB4 0C:8CA4: 60        RTS
C D 0 - - - 0x030CB5 0C:8CA5: 48        PHA
C - - - - - 0x030CB6 0C:8CA6: A4 40     LDY ram_0040
C - - - - - 0x030CB8 0C:8CA8: E6 40     INC ram_0040
C - - - - - 0x030CBA 0C:8CAA: B1 3E     LDA (ram_003E),Y
C - - - - - 0x030CBC 0C:8CAC: D0 0F     BNE $8CBD
C - - - - - 0x030CBE 0C:8CAE: 68        PLA
C - - - - - 0x030CBF 0C:8CAF: 20 0C C5  JSR $C50C
C - - - - - 0x030CC2 0C:8CB2: A0 02     LDY #$02
C - - - - - 0x030CC4 0C:8CB4: B1 34     LDA (ram_0034),Y
C - - - - - 0x030CC6 0C:8CB6: AA        TAX
C - - - - - 0x030CC7 0C:8CB7: 88        DEY
C - - - - - 0x030CC8 0C:8CB8: B1 34     LDA (ram_0034),Y
C - - - - - 0x030CCA 0C:8CBA: 4C D9 8C  JMP $8CD9
C - - - - - 0x030CCD 0C:8CBD: 29 7F     AND #$7F
C - - - - - 0x030CCF 0C:8CBF: C9 07     CMP #$07
C - - - - - 0x030CD1 0C:8CC1: 90 0D     BCC $8CD0
C - - - - - 0x030CD3 0C:8CC3: C9 18     CMP #$18
C - - - - - 0x030CD5 0C:8CC5: B0 09     BCS $8CD0
C - - - - - 0x030CD7 0C:8CC7: AE 4E 04  LDX ram_044E
C - - - - - 0x030CDA 0C:8CCA: CA        DEX
C - - - - - 0x030CDB 0C:8CCB: F0 03     BEQ $8CD0
C - - - - - 0x030CDD 0C:8CCD: 18        CLC
C - - - - - 0x030CDE 0C:8CCE: 69 08     ADC #$08
C - - - - - 0x030CE0 0C:8CD0: AA        TAX
C - - - - - 0x030CE1 0C:8CD1: 68        PLA
C - - - - - 0x030CE2 0C:8CD2: 20 27 C5  JSR $C527
C - - - - - 0x030CE5 0C:8CD5: A5 32     LDA ram_0032
C - - - - - 0x030CE7 0C:8CD7: A6 33     LDX ram_0033
C D 0 - - - 0x030CE9 0C:8CD9: 4C 55 8C  JMP $8C55
C D 0 - - - 0x030CEC 0C:8CDC: 48        PHA
C - - - - - 0x030CED 0C:8CDD: C9 0B     CMP #$0B
C - - - - - 0x030CEF 0C:8CDF: 90 02     BCC $8CE3
C - - - - - 0x030CF1 0C:8CE1: E9 0B     SBC #$0B
C - - - - - 0x030CF3 0C:8CE3: 0A        ASL
C - - - - - 0x030CF4 0C:8CE4: 48        PHA
C - - - - - 0x030CF5 0C:8CE5: AA        TAX
C - - - - - 0x030CF6 0C:8CE6: BD 04 8D  LDA $8D04,X
C - - - - - 0x030CF9 0C:8CE9: 20 24 C5  JSR $C524
C - - - - - 0x030CFC 0C:8CEC: 20 9F 8C  JSR $8C9F
C - - - - - 0x030CFF 0C:8CEF: 68        PLA
C - - - - - 0x030D00 0C:8CF0: AA        TAX
C - - - - - 0x030D01 0C:8CF1: BD 05 8D  LDA $8D05,X
C - - - - - 0x030D04 0C:8CF4: 20 24 C5  JSR $C524
C - - - - - 0x030D07 0C:8CF7: 20 9F 8C  JSR $8C9F
C - - - - - 0x030D0A 0C:8CFA: A9 00     LDA #$00
C - - - - - 0x030D0C 0C:8CFC: A8        TAY
C - - - - - 0x030D0D 0C:8CFD: 20 9F 8C  JSR $8C9F
C - - - - - 0x030D10 0C:8D00: 68        PLA
C - - - - - 0x030D11 0C:8D01: 4C 1A 8D  JMP $8D1A
- D 0 - - - 0x030D14 0C:8D04: 87        .byte $87   ; 
- D 0 - - - 0x030D15 0C:8D05: 8B        .byte $8B   ; 
- D 0 - - - 0x030D16 0C:8D06: 84        .byte $84   ; 
- D 0 - - - 0x030D17 0C:8D07: 86        .byte $86   ; 
- D 0 - - - 0x030D18 0C:8D08: 84        .byte $84   ; 
- D 0 - - - 0x030D19 0C:8D09: 86        .byte $86   ; 
- D 0 - - - 0x030D1A 0C:8D0A: 84        .byte $84   ; 
- D 0 - - - 0x030D1B 0C:8D0B: 86        .byte $86   ; 
- D 0 - - - 0x030D1C 0C:8D0C: 84        .byte $84   ; 
- D 0 - - - 0x030D1D 0C:8D0D: 86        .byte $86   ; 
- D 0 - - - 0x030D1E 0C:8D0E: 8C        .byte $8C   ; 
- D 0 - - - 0x030D1F 0C:8D0F: 86        .byte $86   ; 
- D 0 - - - 0x030D20 0C:8D10: 86        .byte $86   ; 
- D 0 - - - 0x030D21 0C:8D11: 92        .byte $92   ; 
- D 0 - - - 0x030D22 0C:8D12: 8C        .byte $8C   ; 
- D 0 - - - 0x030D23 0C:8D13: 86        .byte $86   ; 
- D 0 - - - 0x030D24 0C:8D14: 86        .byte $86   ; 
- D 0 - - - 0x030D25 0C:8D15: 92        .byte $92   ; 
- D 0 - - - 0x030D26 0C:8D16: 8C        .byte $8C   ; 
- D 0 - - - 0x030D27 0C:8D17: 86        .byte $86   ; 
- D 0 - - - 0x030D28 0C:8D18: 86        .byte $86   ; 
- D 0 - - - 0x030D29 0C:8D19: 92        .byte $92   ; 
C D 0 - - - 0x030D2A 0C:8D1A: 85 47     STA ram_0047
C - - - - - 0x030D2C 0C:8D1C: 20 0C C5  JSR $C50C
C - - - - - 0x030D2F 0C:8D1F: A0 00     LDY #$00
C - - - - - 0x030D31 0C:8D21: B1 34     LDA (ram_0034),Y
C - - - - - 0x030D33 0C:8D23: D0 47     BNE $8D6C
C - - - - - 0x030D35 0C:8D25: A5 47     LDA ram_0047
C - - - - - 0x030D37 0C:8D27: 38        SEC
C - - - - - 0x030D38 0C:8D28: E9 0B     SBC #$0B
C - - - - - 0x030D3A 0C:8D2A: 0A        ASL
C - - - - - 0x030D3B 0C:8D2B: 0A        ASL
C - - - - - 0x030D3C 0C:8D2C: AA        TAX
C - - - - - 0x030D3D 0C:8D2D: A0 00     LDY #$00
C - - - - - 0x030D3F 0C:8D2F: BD 40 8D  LDA $8D40,X
C - - - - - 0x030D42 0C:8D32: 99 EE 05  STA ram_05EE,Y
C - - - - - 0x030D45 0C:8D35: E8        INX
C - - - - - 0x030D46 0C:8D36: C8        INY
C - - - - - 0x030D47 0C:8D37: C0 04     CPY #$04
C - - - - - 0x030D49 0C:8D39: D0 F4     BNE $8D2F
C - - - - - 0x030D4B 0C:8D3B: A9 00     LDA #$00
C - - - - - 0x030D4D 0C:8D3D: 4C 6C 8D  JMP $8D6C
- - - - - - 0x030D50 0C:8D40: 47        .byte $47   ; <G>
- - - - - - 0x030D51 0C:8D41: 7D        .byte $7D   ; 
- - - - - - 0x030D52 0C:8D42: CD        .byte $CD   ; 
- - - - - - 0x030D53 0C:8D43: 7D        .byte $7D   ; 
- D 0 - - - 0x030D54 0C:8D44: 00        .byte $00   ; 
- D 0 - - - 0x030D55 0C:8D45: 35        .byte $35   ; <5>
- D 0 - - - 0x030D56 0C:8D46: AF        .byte $AF   ; 
- D 0 - - - 0x030D57 0C:8D47: 2E        .byte $2E   ; 
- D 0 - - - 0x030D58 0C:8D48: 00        .byte $00   ; 
- D 0 - - - 0x030D59 0C:8D49: 36        .byte $36   ; <6>
- D 0 - - - 0x030D5A 0C:8D4A: AF        .byte $AF   ; 
- D 0 - - - 0x030D5B 0C:8D4B: 2E        .byte $2E   ; 
- D 0 - - - 0x030D5C 0C:8D4C: 00        .byte $00   ; 
- D 0 - - - 0x030D5D 0C:8D4D: 37        .byte $37   ; <7>
- D 0 - - - 0x030D5E 0C:8D4E: AF        .byte $AF   ; 
- D 0 - - - 0x030D5F 0C:8D4F: 2E        .byte $2E   ; 
- D 0 - - - 0x030D60 0C:8D50: 00        .byte $00   ; 
- D 0 - - - 0x030D61 0C:8D51: 38        .byte $38   ; <8>
- D 0 - - - 0x030D62 0C:8D52: AF        .byte $AF   ; 
- D 0 - - - 0x030D63 0C:8D53: 2E        .byte $2E   ; 
- D 0 - - - 0x030D64 0C:8D54: 00        .byte $00   ; 
- D 0 - - - 0x030D65 0C:8D55: 39        .byte $39   ; <9>
- D 0 - - - 0x030D66 0C:8D56: AF        .byte $AF   ; 
- D 0 - - - 0x030D67 0C:8D57: 2E        .byte $2E   ; 
- D 0 - - - 0x030D68 0C:8D58: 00        .byte $00   ; 
- D 0 - - - 0x030D69 0C:8D59: 3A        .byte $3A   ; 
- D 0 - - - 0x030D6A 0C:8D5A: AF        .byte $AF   ; 
- D 0 - - - 0x030D6B 0C:8D5B: 2E        .byte $2E   ; 
- D 0 - - - 0x030D6C 0C:8D5C: 00        .byte $00   ; 
- D 0 - - - 0x030D6D 0C:8D5D: 3B        .byte $3B   ; 
- D 0 - - - 0x030D6E 0C:8D5E: AF        .byte $AF   ; 
- D 0 - - - 0x030D6F 0C:8D5F: 2E        .byte $2E   ; 
- D 0 - - - 0x030D70 0C:8D60: 00        .byte $00   ; 
- D 0 - - - 0x030D71 0C:8D61: 3C        .byte $3C   ; 
- D 0 - - - 0x030D72 0C:8D62: AF        .byte $AF   ; 
- D 0 - - - 0x030D73 0C:8D63: 2E        .byte $2E   ; 
- D 0 - - - 0x030D74 0C:8D64: 34        .byte $34   ; <4>
- D 0 - - - 0x030D75 0C:8D65: 33        .byte $33   ; <3>
- D 0 - - - 0x030D76 0C:8D66: AF        .byte $AF   ; 
- D 0 - - - 0x030D77 0C:8D67: 2E        .byte $2E   ; 
- D 0 - - - 0x030D78 0C:8D68: 34        .byte $34   ; <4>
- D 0 - - - 0x030D79 0C:8D69: 34        .byte $34   ; <4>
- D 0 - - - 0x030D7A 0C:8D6A: AF        .byte $AF   ; 
- D 0 - - - 0x030D7B 0C:8D6B: 2E        .byte $2E   ; 
C D 0 - - - 0x030D7C 0C:8D6C: 20 3C C5  JSR $C53C
C - - - - - 0x030D7F 0C:8D6F: A0 00     LDY #$00
C - - - - - 0x030D81 0C:8D71: B1 30     LDA (ram_0030),Y
C - - - - - 0x030D83 0C:8D73: C9 E0     CMP #$E0
C - - - - - 0x030D85 0C:8D75: B0 0F     BCS $8D86
C - - - - - 0x030D87 0C:8D77: 98        TYA
C - - - - - 0x030D88 0C:8D78: 48        PHA
C - - - - - 0x030D89 0C:8D79: B1 30     LDA (ram_0030),Y
C - - - - - 0x030D8B 0C:8D7B: 20 24 C5  JSR $C524
C - - - - - 0x030D8E 0C:8D7E: 20 9F 8C  JSR $8C9F
C - - - - - 0x030D91 0C:8D81: 68        PLA
C - - - - - 0x030D92 0C:8D82: A8        TAY
C - - - - - 0x030D93 0C:8D83: C8        INY
C - - - - - 0x030D94 0C:8D84: D0 EB     BNE $8D71
C - - - - - 0x030D96 0C:8D86: 98        TYA
C - - - - - 0x030D97 0C:8D87: 38        SEC
C - - - - - 0x030D98 0C:8D88: E9 05     SBC #$05
C - - - - - 0x030D9A 0C:8D8A: 10 11     BPL $8D9D
C - - - - - 0x030D9C 0C:8D8C: 49 FF     EOR #$FF
C - - - - - 0x030D9E 0C:8D8E: 18        CLC
C - - - - - 0x030D9F 0C:8D8F: 69 01     ADC #$01
C - - - - - 0x030DA1 0C:8D91: 85 47     STA ram_0047
C - - - - - 0x030DA3 0C:8D93: A9 00     LDA #$00
C - - - - - 0x030DA5 0C:8D95: A8        TAY
C - - - - - 0x030DA6 0C:8D96: 20 9F 8C  JSR $8C9F
C - - - - - 0x030DA9 0C:8D99: C6 47     DEC ram_0047
C - - - - - 0x030DAB 0C:8D9B: D0 F6     BNE $8D93
C - - - - - 0x030DAD 0C:8D9D: 60        RTS
- D 0 - - - 0x030DAE 0C:8D9E: 9C        .byte $9C   ; 
- D 0 - - - 0x030DAF 0C:8D9F: A8        .byte $A8   ; 
- D 0 - - - 0x030DB0 0C:8DA0: 9D        .byte $9D   ; 
- D 0 - - - 0x030DB1 0C:8DA1: AA        .byte $AA   ; 
- D 0 - - - 0x030DB2 0C:8DA2: 00        .byte $00   ; 
- D 0 - - - 0x030DB3 0C:8DA3: AB        .byte $AB   ; 
- D 0 - - - 0x030DB4 0C:8DA4: 9E        .byte $9E   ; 
- D 0 - - - 0x030DB5 0C:8DA5: A9        .byte $A9   ; 
- D 0 - - - 0x030DB6 0C:8DA6: 9F        .byte $9F   ; 
- D 0 - - - 0x030DB7 0C:8DA7: 88        .byte $88   ; 
- D 0 - - - 0x030DB8 0C:8DA8: 89        .byte $89   ; 
- D 0 - - - 0x030DB9 0C:8DA9: 90        .byte $90   ; 
- D 0 - - - 0x030DBA 0C:8DAA: 8A        .byte $8A   ; 
- D 0 - - - 0x030DBB 0C:8DAB: 00        .byte $00   ; 
- D 0 - - - 0x030DBC 0C:8DAC: 8A        .byte $8A   ; 
- D 0 - - - 0x030DBD 0C:8DAD: 8E        .byte $8E   ; 
- D 0 - - - 0x030DBE 0C:8DAE: 89        .byte $89   ; 
- D 0 - - - 0x030DBF 0C:8DAF: 93        .byte $93   ; 
- D 0 - - - 0x030DC0 0C:8DB0: 00        .byte $00   ; 
- D 0 - - - 0x030DC1 0C:8DB1: 00        .byte $00   ; 
- D 0 - - - 0x030DC2 0C:8DB2: 00        .byte $00   ; 
- D 0 - - - 0x030DC3 0C:8DB3: 00        .byte $00   ; 
- D 0 - - - 0x030DC4 0C:8DB4: 00        .byte $00   ; 
- D 0 - - - 0x030DC5 0C:8DB5: 00        .byte $00   ; 
- D 0 - - - 0x030DC6 0C:8DB6: 00        .byte $00   ; 
- D 0 - - - 0x030DC7 0C:8DB7: 00        .byte $00   ; 
- D 0 - - - 0x030DC8 0C:8DB8: 00        .byte $00   ; 
- D 0 - - - 0x030DC9 0C:8DB9: E4        .byte $E4   ; 
- D 0 - - - 0x030DCA 0C:8DBA: E5        .byte $E5   ; 
- D 0 - - - 0x030DCB 0C:8DBB: F0        .byte $F0   ; 
- D 0 - - - 0x030DCC 0C:8DBC: E6        .byte $E6   ; 
- D 0 - - - 0x030DCD 0C:8DBD: 00        .byte $00   ; 
- D 0 - - - 0x030DCE 0C:8DBE: F2        .byte $F2   ; 
- D 0 - - - 0x030DCF 0C:8DBF: EC        .byte $EC   ; 
- D 0 - - - 0x030DD0 0C:8DC0: ED        .byte $ED   ; 
- D 0 - - - 0x030DD1 0C:8DC1: F8        .byte $F8   ; 
- D 0 - - - 0x030DD2 0C:8DC2: E0        .byte $E0   ; 
- D 0 - - - 0x030DD3 0C:8DC3: 8D        .byte $8D   ; 
- D 0 - - - 0x030DD4 0C:8DC4: 37        .byte $37   ; <7>
- D 0 - - - 0x030DD5 0C:8DC5: 8E        .byte $8E   ; 
- D 0 - - - 0x030DD6 0C:8DC6: 94        .byte $94   ; 
- D 0 - - - 0x030DD7 0C:8DC7: 8E        .byte $8E   ; 
- - - - - - 0x030DD8 0C:8DC8: F6        .byte $F6   ; 
- - - - - - 0x030DD9 0C:8DC9: 8E        .byte $8E   ; 
- D 0 - - - 0x030DDA 0C:8DCA: 6B        .byte $6B   ; <k>
- D 0 - - - 0x030DDB 0C:8DCB: 8F        .byte $8F   ; 
- D 0 - - - 0x030DDC 0C:8DCC: BF        .byte $BF   ; 
- D 0 - - - 0x030DDD 0C:8DCD: 8F        .byte $8F   ; 
- D 0 - - - 0x030DDE 0C:8DCE: 15        .byte $15   ; 
- D 0 - - - 0x030DDF 0C:8DCF: 90        .byte $90   ; 
- D 0 - - - 0x030DE0 0C:8DD0: 73        .byte $73   ; <s>
- D 0 - - - 0x030DE1 0C:8DD1: 90        .byte $90   ; 
- D 0 - - - 0x030DE2 0C:8DD2: DF        .byte $DF   ; 
- D 0 - - - 0x030DE3 0C:8DD3: 90        .byte $90   ; 
- D 0 - - - 0x030DE4 0C:8DD4: 40        .byte $40   ; 
- D 0 - - - 0x030DE5 0C:8DD5: 91        .byte $91   ; 
- D 0 - - - 0x030DE6 0C:8DD6: 40        .byte $40   ; 
- D 0 - - - 0x030DE7 0C:8DD7: 91        .byte $91   ; 
- D 0 - - - 0x030DE8 0C:8DD8: 40        .byte $40   ; 
- D 0 - - - 0x030DE9 0C:8DD9: 91        .byte $91   ; 
- D 0 - - - 0x030DEA 0C:8DDA: B0        .byte $B0   ; 
- D 0 - - - 0x030DEB 0C:8DDB: 91        .byte $91   ; 
- D 0 - - - 0x030DEC 0C:8DDC: B0        .byte $B0   ; 
- D 0 - - - 0x030DED 0C:8DDD: 91        .byte $91   ; 
- D 0 - - - 0x030DEE 0C:8DDE: B0        .byte $B0   ; 
- D 0 - - - 0x030DEF 0C:8DDF: 91        .byte $91   ; 
- D 0 - I - 0x030DF0 0C:8DE0: 2C        .byte $2C   ; 
- D 0 - I - 0x030DF1 0C:8DE1: 22        .byte $22   ; 
- D 0 - I - 0x030DF2 0C:8DE2: 14        .byte $14   ; 
- D 0 - I - 0x030DF3 0C:8DE3: 94        .byte $94   ; 
- D 0 - I - 0x030DF4 0C:8DE4: 94        .byte $94   ; 
- D 0 - I - 0x030DF5 0C:8DE5: 82        .byte $82   ; 
- D 0 - I - 0x030DF6 0C:8DE6: 10        .byte $10   ; 
- D 0 - I - 0x030DF7 0C:8DE7: 9C        .byte $9C   ; 
- D 0 - I - 0x030DF8 0C:8DE8: A8        .byte $A8   ; 
- D 0 - I - 0x030DF9 0C:8DE9: A8        .byte $A8   ; 
- D 0 - I - 0x030DFA 0C:8DEA: A0        .byte $A0   ; 
- D 0 - I - 0x030DFB 0C:8DEB: A8        .byte $A8   ; 
- D 0 - I - 0x030DFC 0C:8DEC: A8        .byte $A8   ; 
- D 0 - I - 0x030DFD 0C:8DED: A0        .byte $A0   ; 
- D 0 - I - 0x030DFE 0C:8DEE: A8        .byte $A8   ; 
- D 0 - I - 0x030DFF 0C:8DEF: A8        .byte $A8   ; 
- D 0 - I - 0x030E00 0C:8DF0: A8        .byte $A8   ; 
- D 0 - I - 0x030E01 0C:8DF1: A0        .byte $A0   ; 
- D 0 - I - 0x030E02 0C:8DF2: A8        .byte $A8   ; 
- D 0 - I - 0x030E03 0C:8DF3: A0        .byte $A0   ; 
- D 0 - I - 0x030E04 0C:8DF4: A8        .byte $A8   ; 
- D 0 - I - 0x030E05 0C:8DF5: A8        .byte $A8   ; 
- D 0 - I - 0x030E06 0C:8DF6: 9D        .byte $9D   ; 
- D 0 - I - 0x030E07 0C:8DF7: 82        .byte $82   ; 
- D 0 - I - 0x030E08 0C:8DF8: 03        .byte $03   ; 
- D 0 - I - 0x030E09 0C:8DF9: 00        .byte $00   ; 
- D 0 - I - 0x030E0A 0C:8DFA: 9C        .byte $9C   ; 
- D 0 - I - 0x030E0B 0C:8DFB: 98        .byte $98   ; 
- D 0 - I - 0x030E0C 0C:8DFC: 8E        .byte $8E   ; 
- D 0 - I - 0x030E0D 0C:8DFD: 03        .byte $03   ; 
- D 0 - I - 0x030E0E 0C:8DFE: 99        .byte $99   ; 
- D 0 - I - 0x030E0F 0C:8DFF: 9D        .byte $9D   ; 
- D 0 - I - 0x030E10 0C:8E00: 00        .byte $00   ; 
- D 0 - I - 0x030E11 0C:8E01: 02        .byte $02   ; 
- D 0 - I - 0x030E12 0C:8E02: 00        .byte $00   ; 
- D 0 - I - 0x030E13 0C:8E03: AA        .byte $AA   ; 
- D 0 - I - 0x030E14 0C:8E04: 90        .byte $90   ; 
- D 0 - I - 0x030E15 0C:8E05: 02        .byte $02   ; 
- D 0 - I - 0x030E16 0C:8E06: AB        .byte $AB   ; 
- D 0 - I - 0x030E17 0C:8E07: 00        .byte $00   ; 
- D 0 - I - 0x030E18 0C:8E08: 02        .byte $02   ; 
- D 0 - I - 0x030E19 0C:8E09: A4        .byte $A4   ; 
- D 0 - I - 0x030E1A 0C:8E0A: A5        .byte $A5   ; 
- D 0 - I - 0x030E1B 0C:8E0B: 90        .byte $90   ; 
- D 0 - I - 0x030E1C 0C:8E0C: 02        .byte $02   ; 
- D 0 - I - 0x030E1D 0C:8E0D: AB        .byte $AB   ; 
- D 0 - I - 0x030E1E 0C:8E0E: 00        .byte $00   ; 
- D 0 - I - 0x030E1F 0C:8E0F: 02        .byte $02   ; 
- D 0 - I - 0x030E20 0C:8E10: 00        .byte $00   ; 
- D 0 - I - 0x030E21 0C:8E11: AA        .byte $AA   ; 
- D 0 - I - 0x030E22 0C:8E12: 90        .byte $90   ; 
- D 0 - I - 0x030E23 0C:8E13: 02        .byte $02   ; 
- D 0 - I - 0x030E24 0C:8E14: AB        .byte $AB   ; 
- D 0 - I - 0x030E25 0C:8E15: 00        .byte $00   ; 
- D 0 - I - 0x030E26 0C:8E16: 03        .byte $03   ; 
- D 0 - I - 0x030E27 0C:8E17: 00        .byte $00   ; 
- D 0 - I - 0x030E28 0C:8E18: 9E        .byte $9E   ; 
- D 0 - I - 0x030E29 0C:8E19: 9A        .byte $9A   ; 
- D 0 - I - 0x030E2A 0C:8E1A: 8E        .byte $8E   ; 
- D 0 - I - 0x030E2B 0C:8E1B: 03        .byte $03   ; 
- D 0 - I - 0x030E2C 0C:8E1C: 9B        .byte $9B   ; 
- D 0 - I - 0x030E2D 0C:8E1D: 9F        .byte $9F   ; 
- D 0 - I - 0x030E2E 0C:8E1E: 00        .byte $00   ; 
- D 0 - I - 0x030E2F 0C:8E1F: 14        .byte $14   ; 
- D 0 - I - 0x030E30 0C:8E20: 00        .byte $00   ; 
- D 0 - I - 0x030E31 0C:8E21: 00        .byte $00   ; 
- D 0 - I - 0x030E32 0C:8E22: 9E        .byte $9E   ; 
- D 0 - I - 0x030E33 0C:8E23: A9        .byte $A9   ; 
- D 0 - I - 0x030E34 0C:8E24: A2        .byte $A2   ; 
- D 0 - I - 0x030E35 0C:8E25: A9        .byte $A9   ; 
- D 0 - I - 0x030E36 0C:8E26: A9        .byte $A9   ; 
- D 0 - I - 0x030E37 0C:8E27: A2        .byte $A2   ; 
- D 0 - I - 0x030E38 0C:8E28: A9        .byte $A9   ; 
- D 0 - I - 0x030E39 0C:8E29: A9        .byte $A9   ; 
- D 0 - I - 0x030E3A 0C:8E2A: A9        .byte $A9   ; 
- D 0 - I - 0x030E3B 0C:8E2B: A2        .byte $A2   ; 
- D 0 - I - 0x030E3C 0C:8E2C: A9        .byte $A9   ; 
- D 0 - I - 0x030E3D 0C:8E2D: A9        .byte $A9   ; 
- D 0 - I - 0x030E3E 0C:8E2E: A9        .byte $A9   ; 
- D 0 - I - 0x030E3F 0C:8E2F: A2        .byte $A2   ; 
- D 0 - I - 0x030E40 0C:8E30: A9        .byte $A9   ; 
- D 0 - I - 0x030E41 0C:8E31: 9F        .byte $9F   ; 
- D 0 - I - 0x030E42 0C:8E32: 00        .byte $00   ; 
- D 0 - I - 0x030E43 0C:8E33: 00        .byte $00   ; 
- D 0 - I - 0x030E44 0C:8E34: 94        .byte $94   ; 
- D 0 - I - 0x030E45 0C:8E35: 94        .byte $94   ; 
- D 0 - I - 0x030E46 0C:8E36: 94        .byte $94   ; 
- D 0 - I - 0x030E47 0C:8E37: 2C        .byte $2C   ; 
- D 0 - I - 0x030E48 0C:8E38: 22        .byte $22   ; 
- D 0 - I - 0x030E49 0C:8E39: 14        .byte $14   ; 
- D 0 - I - 0x030E4A 0C:8E3A: 94        .byte $94   ; 
- D 0 - I - 0x030E4B 0C:8E3B: 94        .byte $94   ; 
- D 0 - I - 0x030E4C 0C:8E3C: 83        .byte $83   ; 
- D 0 - I - 0x030E4D 0C:8E3D: 0E        .byte $0E   ; 
- D 0 - I - 0x030E4E 0C:8E3E: 9C        .byte $9C   ; 
- D 0 - I - 0x030E4F 0C:8E3F: A8        .byte $A8   ; 
- D 0 - I - 0x030E50 0C:8E40: A0        .byte $A0   ; 
- D 0 - I - 0x030E51 0C:8E41: A8        .byte $A8   ; 
- D 0 - I - 0x030E52 0C:8E42: A0        .byte $A0   ; 
- D 0 - I - 0x030E53 0C:8E43: A8        .byte $A8   ; 
- D 0 - I - 0x030E54 0C:8E44: A8        .byte $A8   ; 
- D 0 - I - 0x030E55 0C:8E45: A0        .byte $A0   ; 
- D 0 - I - 0x030E56 0C:8E46: A8        .byte $A8   ; 
- D 0 - I - 0x030E57 0C:8E47: A0        .byte $A0   ; 
- D 0 - I - 0x030E58 0C:8E48: A8        .byte $A8   ; 
- D 0 - I - 0x030E59 0C:8E49: A8        .byte $A8   ; 
- D 0 - I - 0x030E5A 0C:8E4A: A0        .byte $A0   ; 
- D 0 - I - 0x030E5B 0C:8E4B: 9D        .byte $9D   ; 
- D 0 - I - 0x030E5C 0C:8E4C: 83        .byte $83   ; 
- D 0 - I - 0x030E5D 0C:8E4D: 04        .byte $04   ; 
- D 0 - I - 0x030E5E 0C:8E4E: 00        .byte $00   ; 
- D 0 - I - 0x030E5F 0C:8E4F: 00        .byte $00   ; 
- D 0 - I - 0x030E60 0C:8E50: 9C        .byte $9C   ; 
- D 0 - I - 0x030E61 0C:8E51: 98        .byte $98   ; 
- D 0 - I - 0x030E62 0C:8E52: 8C        .byte $8C   ; 
- D 0 - I - 0x030E63 0C:8E53: 04        .byte $04   ; 
- D 0 - I - 0x030E64 0C:8E54: 99        .byte $99   ; 
- D 0 - I - 0x030E65 0C:8E55: A0        .byte $A0   ; 
- D 0 - I - 0x030E66 0C:8E56: 9D        .byte $9D   ; 
- D 0 - I - 0x030E67 0C:8E57: 00        .byte $00   ; 
- D 0 - I - 0x030E68 0C:8E58: 03        .byte $03   ; 
- D 0 - I - 0x030E69 0C:8E59: 00        .byte $00   ; 
- D 0 - I - 0x030E6A 0C:8E5A: 9C        .byte $9C   ; 
- D 0 - I - 0x030E6B 0C:8E5B: 98        .byte $98   ; 
- D 0 - I - 0x030E6C 0C:8E5C: 8F        .byte $8F   ; 
- D 0 - I - 0x030E6D 0C:8E5D: 02        .byte $02   ; 
- D 0 - I - 0x030E6E 0C:8E5E: A1        .byte $A1   ; 
- D 0 - I - 0x030E6F 0C:8E5F: 00        .byte $00   ; 
- D 0 - I - 0x030E70 0C:8E60: 02        .byte $02   ; 
- D 0 - I - 0x030E71 0C:8E61: A4        .byte $A4   ; 
- D 0 - I - 0x030E72 0C:8E62: A5        .byte $A5   ; 
- D 0 - I - 0x030E73 0C:8E63: 90        .byte $90   ; 
- D 0 - I - 0x030E74 0C:8E64: 02        .byte $02   ; 
- D 0 - I - 0x030E75 0C:8E65: AB        .byte $AB   ; 
- D 0 - I - 0x030E76 0C:8E66: 00        .byte $00   ; 
- D 0 - I - 0x030E77 0C:8E67: 02        .byte $02   ; 
- D 0 - I - 0x030E78 0C:8E68: 00        .byte $00   ; 
- D 0 - I - 0x030E79 0C:8E69: AA        .byte $AA   ; 
- D 0 - I - 0x030E7A 0C:8E6A: 90        .byte $90   ; 
- D 0 - I - 0x030E7B 0C:8E6B: 02        .byte $02   ; 
- D 0 - I - 0x030E7C 0C:8E6C: A1        .byte $A1   ; 
- D 0 - I - 0x030E7D 0C:8E6D: 00        .byte $00   ; 
- D 0 - I - 0x030E7E 0C:8E6E: 03        .byte $03   ; 
- D 0 - I - 0x030E7F 0C:8E6F: 00        .byte $00   ; 
- D 0 - I - 0x030E80 0C:8E70: 9E        .byte $9E   ; 
- D 0 - I - 0x030E81 0C:8E71: 9A        .byte $9A   ; 
- D 0 - I - 0x030E82 0C:8E72: 8F        .byte $8F   ; 
- D 0 - I - 0x030E83 0C:8E73: 02        .byte $02   ; 
- D 0 - I - 0x030E84 0C:8E74: AB        .byte $AB   ; 
- D 0 - I - 0x030E85 0C:8E75: 00        .byte $00   ; 
- D 0 - I - 0x030E86 0C:8E76: 04        .byte $04   ; 
- D 0 - I - 0x030E87 0C:8E77: 00        .byte $00   ; 
- D 0 - I - 0x030E88 0C:8E78: 00        .byte $00   ; 
- D 0 - I - 0x030E89 0C:8E79: 9E        .byte $9E   ; 
- D 0 - I - 0x030E8A 0C:8E7A: 9A        .byte $9A   ; 
- D 0 - I - 0x030E8B 0C:8E7B: 8E        .byte $8E   ; 
- D 0 - I - 0x030E8C 0C:8E7C: 02        .byte $02   ; 
- D 0 - I - 0x030E8D 0C:8E7D: A1        .byte $A1   ; 
- D 0 - I - 0x030E8E 0C:8E7E: 00        .byte $00   ; 
- D 0 - I - 0x030E8F 0C:8E7F: 83        .byte $83   ; 
- D 0 - I - 0x030E90 0C:8E80: 11        .byte $11   ; 
- D 0 - I - 0x030E91 0C:8E81: 9E        .byte $9E   ; 
- D 0 - I - 0x030E92 0C:8E82: A2        .byte $A2   ; 
- D 0 - I - 0x030E93 0C:8E83: A9        .byte $A9   ; 
- D 0 - I - 0x030E94 0C:8E84: A2        .byte $A2   ; 
- D 0 - I - 0x030E95 0C:8E85: A9        .byte $A9   ; 
- D 0 - I - 0x030E96 0C:8E86: A9        .byte $A9   ; 
- D 0 - I - 0x030E97 0C:8E87: A2        .byte $A2   ; 
- D 0 - I - 0x030E98 0C:8E88: A9        .byte $A9   ; 
- D 0 - I - 0x030E99 0C:8E89: A9        .byte $A9   ; 
- D 0 - I - 0x030E9A 0C:8E8A: A2        .byte $A2   ; 
- D 0 - I - 0x030E9B 0C:8E8B: A9        .byte $A9   ; 
- D 0 - I - 0x030E9C 0C:8E8C: A2        .byte $A2   ; 
- D 0 - I - 0x030E9D 0C:8E8D: A9        .byte $A9   ; 
- D 0 - I - 0x030E9E 0C:8E8E: A9        .byte $A9   ; 
- D 0 - I - 0x030E9F 0C:8E8F: A2        .byte $A2   ; 
- D 0 - I - 0x030EA0 0C:8E90: 9F        .byte $9F   ; 
- D 0 - I - 0x030EA1 0C:8E91: 00        .byte $00   ; 
- D 0 - I - 0x030EA2 0C:8E92: 94        .byte $94   ; 
- D 0 - I - 0x030EA3 0C:8E93: 94        .byte $94   ; 
- D 0 - I - 0x030EA4 0C:8E94: 2C        .byte $2C   ; 
- D 0 - I - 0x030EA5 0C:8E95: 22        .byte $22   ; 
- D 0 - I - 0x030EA6 0C:8E96: 14        .byte $14   ; 
- D 0 - I - 0x030EA7 0C:8E97: 94        .byte $94   ; 
- D 0 - I - 0x030EA8 0C:8E98: 82        .byte $82   ; 
- D 0 - I - 0x030EA9 0C:8E99: 12        .byte $12   ; 
- D 0 - I - 0x030EAA 0C:8E9A: 9C        .byte $9C   ; 
- D 0 - I - 0x030EAB 0C:8E9B: A0        .byte $A0   ; 
- D 0 - I - 0x030EAC 0C:8E9C: A8        .byte $A8   ; 
- D 0 - I - 0x030EAD 0C:8E9D: A8        .byte $A8   ; 
- D 0 - I - 0x030EAE 0C:8E9E: A0        .byte $A0   ; 
- D 0 - I - 0x030EAF 0C:8E9F: A0        .byte $A0   ; 
- D 0 - I - 0x030EB0 0C:8EA0: A8        .byte $A8   ; 
- D 0 - I - 0x030EB1 0C:8EA1: A8        .byte $A8   ; 
- D 0 - I - 0x030EB2 0C:8EA2: A0        .byte $A0   ; 
- D 0 - I - 0x030EB3 0C:8EA3: A8        .byte $A8   ; 
- D 0 - I - 0x030EB4 0C:8EA4: A8        .byte $A8   ; 
- D 0 - I - 0x030EB5 0C:8EA5: A0        .byte $A0   ; 
- D 0 - I - 0x030EB6 0C:8EA6: A8        .byte $A8   ; 
- D 0 - I - 0x030EB7 0C:8EA7: A0        .byte $A0   ; 
- D 0 - I - 0x030EB8 0C:8EA8: A0        .byte $A0   ; 
- D 0 - I - 0x030EB9 0C:8EA9: A8        .byte $A8   ; 
- D 0 - I - 0x030EBA 0C:8EAA: 9D        .byte $9D   ; 
- D 0 - I - 0x030EBB 0C:8EAB: 00        .byte $00   ; 
- D 0 - I - 0x030EBC 0C:8EAC: 03        .byte $03   ; 
- D 0 - I - 0x030EBD 0C:8EAD: 00        .byte $00   ; 
- D 0 - I - 0x030EBE 0C:8EAE: 9C        .byte $9C   ; 
- D 0 - I - 0x030EBF 0C:8EAF: 98        .byte $98   ; 
- D 0 - I - 0x030EC0 0C:8EB0: 8F        .byte $8F   ; 
- D 0 - I - 0x030EC1 0C:8EB1: 02        .byte $02   ; 
- D 0 - I - 0x030EC2 0C:8EB2: AB        .byte $AB   ; 
- D 0 - I - 0x030EC3 0C:8EB3: 00        .byte $00   ; 
- D 0 - I - 0x030EC4 0C:8EB4: 02        .byte $02   ; 
- D 0 - I - 0x030EC5 0C:8EB5: 00        .byte $00   ; 
- D 0 - I - 0x030EC6 0C:8EB6: AA        .byte $AA   ; 
- D 0 - I - 0x030EC7 0C:8EB7: 90        .byte $90   ; 
- D 0 - I - 0x030EC8 0C:8EB8: 02        .byte $02   ; 
- D 0 - I - 0x030EC9 0C:8EB9: AB        .byte $AB   ; 
- D 0 - I - 0x030ECA 0C:8EBA: 00        .byte $00   ; 
- D 0 - I - 0x030ECB 0C:8EBB: 02        .byte $02   ; 
- D 0 - I - 0x030ECC 0C:8EBC: 00        .byte $00   ; 
- D 0 - I - 0x030ECD 0C:8EBD: A3        .byte $A3   ; 
- D 0 - I - 0x030ECE 0C:8EBE: 90        .byte $90   ; 
- D 0 - I - 0x030ECF 0C:8EBF: 02        .byte $02   ; 
- D 0 - I - 0x030ED0 0C:8EC0: A1        .byte $A1   ; 
- D 0 - I - 0x030ED1 0C:8EC1: 00        .byte $00   ; 
- D 0 - I - 0x030ED2 0C:8EC2: 02        .byte $02   ; 
- D 0 - I - 0x030ED3 0C:8EC3: A4        .byte $A4   ; 
- D 0 - I - 0x030ED4 0C:8EC4: A5        .byte $A5   ; 
- D 0 - I - 0x030ED5 0C:8EC5: 90        .byte $90   ; 
- D 0 - I - 0x030ED6 0C:8EC6: 02        .byte $02   ; 
- D 0 - I - 0x030ED7 0C:8EC7: AB        .byte $AB   ; 
- D 0 - I - 0x030ED8 0C:8EC8: 00        .byte $00   ; 
- D 0 - I - 0x030ED9 0C:8EC9: 02        .byte $02   ; 
- D 0 - I - 0x030EDA 0C:8ECA: 00        .byte $00   ; 
- D 0 - I - 0x030EDB 0C:8ECB: AA        .byte $AA   ; 
- D 0 - I - 0x030EDC 0C:8ECC: 90        .byte $90   ; 
- D 0 - I - 0x030EDD 0C:8ECD: 02        .byte $02   ; 
- D 0 - I - 0x030EDE 0C:8ECE: A1        .byte $A1   ; 
- D 0 - I - 0x030EDF 0C:8ECF: 00        .byte $00   ; 
- D 0 - I - 0x030EE0 0C:8ED0: 03        .byte $03   ; 
- D 0 - I - 0x030EE1 0C:8ED1: 00        .byte $00   ; 
- D 0 - I - 0x030EE2 0C:8ED2: 9E        .byte $9E   ; 
- D 0 - I - 0x030EE3 0C:8ED3: 9A        .byte $9A   ; 
- D 0 - I - 0x030EE4 0C:8ED4: 8F        .byte $8F   ; 
- D 0 - I - 0x030EE5 0C:8ED5: 02        .byte $02   ; 
- D 0 - I - 0x030EE6 0C:8ED6: AB        .byte $AB   ; 
- D 0 - I - 0x030EE7 0C:8ED7: 00        .byte $00   ; 
- D 0 - I - 0x030EE8 0C:8ED8: 04        .byte $04   ; 
- D 0 - I - 0x030EE9 0C:8ED9: 00        .byte $00   ; 
- D 0 - I - 0x030EEA 0C:8EDA: 00        .byte $00   ; 
- D 0 - I - 0x030EEB 0C:8EDB: 9E        .byte $9E   ; 
- D 0 - I - 0x030EEC 0C:8EDC: 9A        .byte $9A   ; 
- D 0 - I - 0x030EED 0C:8EDD: 8C        .byte $8C   ; 
- D 0 - I - 0x030EEE 0C:8EDE: 04        .byte $04   ; 
- D 0 - I - 0x030EEF 0C:8EDF: 9B        .byte $9B   ; 
- D 0 - I - 0x030EF0 0C:8EE0: A9        .byte $A9   ; 
- D 0 - I - 0x030EF1 0C:8EE1: 9F        .byte $9F   ; 
- D 0 - I - 0x030EF2 0C:8EE2: 00        .byte $00   ; 
- D 0 - I - 0x030EF3 0C:8EE3: 83        .byte $83   ; 
- D 0 - I - 0x030EF4 0C:8EE4: 0E        .byte $0E   ; 
- D 0 - I - 0x030EF5 0C:8EE5: 9E        .byte $9E   ; 
- D 0 - I - 0x030EF6 0C:8EE6: A2        .byte $A2   ; 
- D 0 - I - 0x030EF7 0C:8EE7: A9        .byte $A9   ; 
- D 0 - I - 0x030EF8 0C:8EE8: A9        .byte $A9   ; 
- D 0 - I - 0x030EF9 0C:8EE9: A2        .byte $A2   ; 
- D 0 - I - 0x030EFA 0C:8EEA: A2        .byte $A2   ; 
- D 0 - I - 0x030EFB 0C:8EEB: A9        .byte $A9   ; 
- D 0 - I - 0x030EFC 0C:8EEC: A9        .byte $A9   ; 
- D 0 - I - 0x030EFD 0C:8EED: A9        .byte $A9   ; 
- D 0 - I - 0x030EFE 0C:8EEE: A2        .byte $A2   ; 
- D 0 - I - 0x030EFF 0C:8EEF: A9        .byte $A9   ; 
- D 0 - I - 0x030F00 0C:8EF0: A9        .byte $A9   ; 
- D 0 - I - 0x030F01 0C:8EF1: A9        .byte $A9   ; 
- D 0 - I - 0x030F02 0C:8EF2: 9F        .byte $9F   ; 
- D 0 - I - 0x030F03 0C:8EF3: 83        .byte $83   ; 
- D 0 - I - 0x030F04 0C:8EF4: 94        .byte $94   ; 
- D 0 - I - 0x030F05 0C:8EF5: 94        .byte $94   ; 
- - - - - - 0x030F06 0C:8EF6: 2C        .byte $2C   ; 
- - - - - - 0x030F07 0C:8EF7: 22        .byte $22   ; 
- - - - - - 0x030F08 0C:8EF8: 14        .byte $14   ; 
- - - - - - 0x030F09 0C:8EF9: 94        .byte $94   ; 
- - - - - - 0x030F0A 0C:8EFA: 14        .byte $14   ; 
- - - - - - 0x030F0B 0C:8EFB: 00        .byte $00   ; 
- - - - - - 0x030F0C 0C:8EFC: 00        .byte $00   ; 
- - - - - - 0x030F0D 0C:8EFD: 00        .byte $00   ; 
- - - - - - 0x030F0E 0C:8EFE: 9C        .byte $9C   ; 
- - - - - - 0x030F0F 0C:8EFF: A8        .byte $A8   ; 
- - - - - - 0x030F10 0C:8F00: A0        .byte $A0   ; 
- - - - - - 0x030F11 0C:8F01: A8        .byte $A8   ; 
- - - - - - 0x030F12 0C:8F02: A8        .byte $A8   ; 
- - - - - - 0x030F13 0C:8F03: A0        .byte $A0   ; 
- - - - - - 0x030F14 0C:8F04: A8        .byte $A8   ; 
- - - - - - 0x030F15 0C:8F05: A8        .byte $A8   ; 
- - - - - - 0x030F16 0C:8F06: A0        .byte $A0   ; 
- - - - - - 0x030F17 0C:8F07: A0        .byte $A0   ; 
- - - - - - 0x030F18 0C:8F08: A8        .byte $A8   ; 
- - - - - - 0x030F19 0C:8F09: A8        .byte $A8   ; 
- - - - - - 0x030F1A 0C:8F0A: A0        .byte $A0   ; 
- - - - - - 0x030F1B 0C:8F0B: A8        .byte $A8   ; 
- - - - - - 0x030F1C 0C:8F0C: A0        .byte $A0   ; 
- - - - - - 0x030F1D 0C:8F0D: 9D        .byte $9D   ; 
- - - - - - 0x030F1E 0C:8F0E: 00        .byte $00   ; 
- - - - - - 0x030F1F 0C:8F0F: 04        .byte $04   ; 
- - - - - - 0x030F20 0C:8F10: 00        .byte $00   ; 
- - - - - - 0x030F21 0C:8F11: 00        .byte $00   ; 
- - - - - - 0x030F22 0C:8F12: 9C        .byte $9C   ; 
- - - - - - 0x030F23 0C:8F13: 98        .byte $98   ; 
- - - - - - 0x030F24 0C:8F14: 8E        .byte $8E   ; 
- - - - - - 0x030F25 0C:8F15: 02        .byte $02   ; 
- - - - - - 0x030F26 0C:8F16: A1        .byte $A1   ; 
- - - - - - 0x030F27 0C:8F17: 00        .byte $00   ; 
- - - - - - 0x030F28 0C:8F18: 03        .byte $03   ; 
- - - - - - 0x030F29 0C:8F19: 00        .byte $00   ; 
- - - - - - 0x030F2A 0C:8F1A: 00        .byte $00   ; 
- - - - - - 0x030F2B 0C:8F1B: AA        .byte $AA   ; 
- - - - - - 0x030F2C 0C:8F1C: 8F        .byte $8F   ; 
- - - - - - 0x030F2D 0C:8F1D: 02        .byte $02   ; 
- - - - - - 0x030F2E 0C:8F1E: AB        .byte $AB   ; 
- - - - - - 0x030F2F 0C:8F1F: 00        .byte $00   ; 
- - - - - - 0x030F30 0C:8F20: 03        .byte $03   ; 
- - - - - - 0x030F31 0C:8F21: 00        .byte $00   ; 
- - - - - - 0x030F32 0C:8F22: 9C        .byte $9C   ; 
- - - - - - 0x030F33 0C:8F23: 98        .byte $98   ; 
- - - - - - 0x030F34 0C:8F24: 8F        .byte $8F   ; 
- - - - - - 0x030F35 0C:8F25: 02        .byte $02   ; 
- - - - - - 0x030F36 0C:8F26: AB        .byte $AB   ; 
- - - - - - 0x030F37 0C:8F27: 00        .byte $00   ; 
- - - - - - 0x030F38 0C:8F28: 02        .byte $02   ; 
- - - - - - 0x030F39 0C:8F29: A4        .byte $A4   ; 
- - - - - - 0x030F3A 0C:8F2A: A5        .byte $A5   ; 
- - - - - - 0x030F3B 0C:8F2B: 90        .byte $90   ; 
- - - - - - 0x030F3C 0C:8F2C: 02        .byte $02   ; 
- - - - - - 0x030F3D 0C:8F2D: A1        .byte $A1   ; 
- - - - - - 0x030F3E 0C:8F2E: 00        .byte $00   ; 
- - - - - - 0x030F3F 0C:8F2F: 02        .byte $02   ; 
- - - - - - 0x030F40 0C:8F30: 00        .byte $00   ; 
- - - - - - 0x030F41 0C:8F31: AA        .byte $AA   ; 
- - - - - - 0x030F42 0C:8F32: 90        .byte $90   ; 
- - - - - - 0x030F43 0C:8F33: 02        .byte $02   ; 
- - - - - - 0x030F44 0C:8F34: A1        .byte $A1   ; 
- - - - - - 0x030F45 0C:8F35: 00        .byte $00   ; 
- - - - - - 0x030F46 0C:8F36: 03        .byte $03   ; 
- - - - - - 0x030F47 0C:8F37: 00        .byte $00   ; 
- - - - - - 0x030F48 0C:8F38: 9E        .byte $9E   ; 
- - - - - - 0x030F49 0C:8F39: 9A        .byte $9A   ; 
- - - - - - 0x030F4A 0C:8F3A: 8F        .byte $8F   ; 
- - - - - - 0x030F4B 0C:8F3B: 02        .byte $02   ; 
- - - - - - 0x030F4C 0C:8F3C: AB        .byte $AB   ; 
- - - - - - 0x030F4D 0C:8F3D: 00        .byte $00   ; 
- - - - - - 0x030F4E 0C:8F3E: 03        .byte $03   ; 
- - - - - - 0x030F4F 0C:8F3F: 00        .byte $00   ; 
- - - - - - 0x030F50 0C:8F40: 00        .byte $00   ; 
- - - - - - 0x030F51 0C:8F41: A3        .byte $A3   ; 
- - - - - - 0x030F52 0C:8F42: 8F        .byte $8F   ; 
- - - - - - 0x030F53 0C:8F43: 02        .byte $02   ; 
- - - - - - 0x030F54 0C:8F44: A1        .byte $A1   ; 
- - - - - - 0x030F55 0C:8F45: 00        .byte $00   ; 
- - - - - - 0x030F56 0C:8F46: 03        .byte $03   ; 
- - - - - - 0x030F57 0C:8F47: 00        .byte $00   ; 
- - - - - - 0x030F58 0C:8F48: 00        .byte $00   ; 
- - - - - - 0x030F59 0C:8F49: AA        .byte $AA   ; 
- - - - - - 0x030F5A 0C:8F4A: 8F        .byte $8F   ; 
- - - - - - 0x030F5B 0C:8F4B: 02        .byte $02   ; 
- - - - - - 0x030F5C 0C:8F4C: AB        .byte $AB   ; 
- - - - - - 0x030F5D 0C:8F4D: 00        .byte $00   ; 
- - - - - - 0x030F5E 0C:8F4E: 05        .byte $05   ; 
- - - - - - 0x030F5F 0C:8F4F: 00        .byte $00   ; 
- - - - - - 0x030F60 0C:8F50: 00        .byte $00   ; 
- - - - - - 0x030F61 0C:8F51: 9E        .byte $9E   ; 
- - - - - - 0x030F62 0C:8F52: A2        .byte $A2   ; 
- - - - - - 0x030F63 0C:8F53: 9A        .byte $9A   ; 
- - - - - - 0x030F64 0C:8F54: 8C        .byte $8C   ; 
- - - - - - 0x030F65 0C:8F55: 03        .byte $03   ; 
- - - - - - 0x030F66 0C:8F56: 9B        .byte $9B   ; 
- - - - - - 0x030F67 0C:8F57: 9F        .byte $9F   ; 
- - - - - - 0x030F68 0C:8F58: 00        .byte $00   ; 
- - - - - - 0x030F69 0C:8F59: 84        .byte $84   ; 
- - - - - - 0x030F6A 0C:8F5A: 10        .byte $10   ; 
- - - - - - 0x030F6B 0C:8F5B: 9E        .byte $9E   ; 
- - - - - - 0x030F6C 0C:8F5C: A9        .byte $A9   ; 
- - - - - - 0x030F6D 0C:8F5D: A9        .byte $A9   ; 
- - - - - - 0x030F6E 0C:8F5E: A2        .byte $A2   ; 
- - - - - - 0x030F6F 0C:8F5F: A9        .byte $A9   ; 
- - - - - - 0x030F70 0C:8F60: A9        .byte $A9   ; 
- - - - - - 0x030F71 0C:8F61: A2        .byte $A2   ; 
- - - - - - 0x030F72 0C:8F62: A9        .byte $A9   ; 
- - - - - - 0x030F73 0C:8F63: A9        .byte $A9   ; 
- - - - - - 0x030F74 0C:8F64: A2        .byte $A2   ; 
- - - - - - 0x030F75 0C:8F65: A2        .byte $A2   ; 
- - - - - - 0x030F76 0C:8F66: A9        .byte $A9   ; 
- - - - - - 0x030F77 0C:8F67: A9        .byte $A9   ; 
- - - - - - 0x030F78 0C:8F68: 9F        .byte $9F   ; 
- - - - - - 0x030F79 0C:8F69: 00        .byte $00   ; 
- - - - - - 0x030F7A 0C:8F6A: 00        .byte $00   ; 
- D 0 - I - 0x030F7B 0C:8F6B: 2C        .byte $2C   ; 
- D 0 - I - 0x030F7C 0C:8F6C: 22        .byte $22   ; 
- D 0 - I - 0x030F7D 0C:8F6D: 14        .byte $14   ; 
- D 0 - I - 0x030F7E 0C:8F6E: 94        .byte $94   ; 
- D 0 - I - 0x030F7F 0C:8F6F: 94        .byte $94   ; 
- D 0 - I - 0x030F80 0C:8F70: 14        .byte $14   ; 
- D 0 - I - 0x030F81 0C:8F71: 00        .byte $00   ; 
- D 0 - I - 0x030F82 0C:8F72: 00        .byte $00   ; 
- D 0 - I - 0x030F83 0C:8F73: 9B        .byte $9B   ; 
- D 0 - I - 0x030F84 0C:8F74: A9        .byte $A9   ; 
- D 0 - I - 0x030F85 0C:8F75: A2        .byte $A2   ; 
- D 0 - I - 0x030F86 0C:8F76: A9        .byte $A9   ; 
- D 0 - I - 0x030F87 0C:8F77: A2        .byte $A2   ; 
- D 0 - I - 0x030F88 0C:8F78: A9        .byte $A9   ; 
- D 0 - I - 0x030F89 0C:8F79: A9        .byte $A9   ; 
- D 0 - I - 0x030F8A 0C:8F7A: A2        .byte $A2   ; 
- D 0 - I - 0x030F8B 0C:8F7B: A9        .byte $A9   ; 
- D 0 - I - 0x030F8C 0C:8F7C: A9        .byte $A9   ; 
- D 0 - I - 0x030F8D 0C:8F7D: A9        .byte $A9   ; 
- D 0 - I - 0x030F8E 0C:8F7E: A2        .byte $A2   ; 
- D 0 - I - 0x030F8F 0C:8F7F: A9        .byte $A9   ; 
- D 0 - I - 0x030F90 0C:8F80: A2        .byte $A2   ; 
- D 0 - I - 0x030F91 0C:8F81: A2        .byte $A2   ; 
- D 0 - I - 0x030F92 0C:8F82: A9        .byte $A9   ; 
- D 0 - I - 0x030F93 0C:8F83: 9A        .byte $9A   ; 
- D 0 - I - 0x030F94 0C:8F84: 00        .byte $00   ; 
- D 0 - I - 0x030F95 0C:8F85: 03        .byte $03   ; 
- D 0 - I - 0x030F96 0C:8F86: 00        .byte $00   ; 
- D 0 - I - 0x030F97 0C:8F87: 9B        .byte $9B   ; 
- D 0 - I - 0x030F98 0C:8F88: 9F        .byte $9F   ; 
- D 0 - I - 0x030F99 0C:8F89: 8F        .byte $8F   ; 
- D 0 - I - 0x030F9A 0C:8F8A: 02        .byte $02   ; 
- D 0 - I - 0x030F9B 0C:8F8B: 9E        .byte $9E   ; 
- D 0 - I - 0x030F9C 0C:8F8C: 9A        .byte $9A   ; 
- D 0 - I - 0x030F9D 0C:8F8D: 02        .byte $02   ; 
- D 0 - I - 0x030F9E 0C:8F8E: 00        .byte $00   ; 
- D 0 - I - 0x030F9F 0C:8F8F: AB        .byte $AB   ; 
- D 0 - I - 0x030FA0 0C:8F90: 91        .byte $91   ; 
- D 0 - I - 0x030FA1 0C:8F91: 01        .byte $01   ; 
- D 0 - I - 0x030FA2 0C:8F92: AA        .byte $AA   ; 
- D 0 - I - 0x030FA3 0C:8F93: 02        .byte $02   ; 
- D 0 - I - 0x030FA4 0C:8F94: 00        .byte $00   ; 
- D 0 - I - 0x030FA5 0C:8F95: A1        .byte $A1   ; 
- D 0 - I - 0x030FA6 0C:8F96: 91        .byte $91   ; 
- D 0 - I - 0x030FA7 0C:8F97: 01        .byte $01   ; 
- D 0 - I - 0x030FA8 0C:8F98: A3        .byte $A3   ; 
- D 0 - I - 0x030FA9 0C:8F99: 02        .byte $02   ; 
- D 0 - I - 0x030FAA 0C:8F9A: 00        .byte $00   ; 
- D 0 - I - 0x030FAB 0C:8F9B: AB        .byte $AB   ; 
- D 0 - I - 0x030FAC 0C:8F9C: 91        .byte $91   ; 
- D 0 - I - 0x030FAD 0C:8F9D: 01        .byte $01   ; 
- D 0 - I - 0x030FAE 0C:8F9E: AA        .byte $AA   ; 
- D 0 - I - 0x030FAF 0C:8F9F: 03        .byte $03   ; 
- D 0 - I - 0x030FB0 0C:8FA0: 00        .byte $00   ; 
- D 0 - I - 0x030FB1 0C:8FA1: 99        .byte $99   ; 
- D 0 - I - 0x030FB2 0C:8FA2: 9D        .byte $9D   ; 
- D 0 - I - 0x030FB3 0C:8FA3: 8F        .byte $8F   ; 
- D 0 - I - 0x030FB4 0C:8FA4: 02        .byte $02   ; 
- D 0 - I - 0x030FB5 0C:8FA5: 9C        .byte $9C   ; 
- D 0 - I - 0x030FB6 0C:8FA6: 98        .byte $98   ; 
- D 0 - I - 0x030FB7 0C:8FA7: 14        .byte $14   ; 
- D 0 - I - 0x030FB8 0C:8FA8: 00        .byte $00   ; 
- D 0 - I - 0x030FB9 0C:8FA9: 00        .byte $00   ; 
- D 0 - I - 0x030FBA 0C:8FAA: 99        .byte $99   ; 
- D 0 - I - 0x030FBB 0C:8FAB: A8        .byte $A8   ; 
- D 0 - I - 0x030FBC 0C:8FAC: A0        .byte $A0   ; 
- D 0 - I - 0x030FBD 0C:8FAD: A8        .byte $A8   ; 
- D 0 - I - 0x030FBE 0C:8FAE: A0        .byte $A0   ; 
- D 0 - I - 0x030FBF 0C:8FAF: A8        .byte $A8   ; 
- D 0 - I - 0x030FC0 0C:8FB0: A8        .byte $A8   ; 
- D 0 - I - 0x030FC1 0C:8FB1: A0        .byte $A0   ; 
- D 0 - I - 0x030FC2 0C:8FB2: A8        .byte $A8   ; 
- D 0 - I - 0x030FC3 0C:8FB3: A8        .byte $A8   ; 
- D 0 - I - 0x030FC4 0C:8FB4: A8        .byte $A8   ; 
- D 0 - I - 0x030FC5 0C:8FB5: A0        .byte $A0   ; 
- D 0 - I - 0x030FC6 0C:8FB6: A8        .byte $A8   ; 
- D 0 - I - 0x030FC7 0C:8FB7: A0        .byte $A0   ; 
- D 0 - I - 0x030FC8 0C:8FB8: A8        .byte $A8   ; 
- D 0 - I - 0x030FC9 0C:8FB9: A0        .byte $A0   ; 
- D 0 - I - 0x030FCA 0C:8FBA: 98        .byte $98   ; 
- D 0 - I - 0x030FCB 0C:8FBB: 00        .byte $00   ; 
- D 0 - I - 0x030FCC 0C:8FBC: 94        .byte $94   ; 
- D 0 - I - 0x030FCD 0C:8FBD: 94        .byte $94   ; 
- D 0 - I - 0x030FCE 0C:8FBE: 94        .byte $94   ; 
- D 0 - I - 0x030FCF 0C:8FBF: 2C        .byte $2C   ; 
- D 0 - I - 0x030FD0 0C:8FC0: 22        .byte $22   ; 
- D 0 - I - 0x030FD1 0C:8FC1: 14        .byte $14   ; 
- D 0 - I - 0x030FD2 0C:8FC2: 94        .byte $94   ; 
- D 0 - I - 0x030FD3 0C:8FC3: 94        .byte $94   ; 
- D 0 - I - 0x030FD4 0C:8FC4: 14        .byte $14   ; 
- D 0 - I - 0x030FD5 0C:8FC5: 00        .byte $00   ; 
- D 0 - I - 0x030FD6 0C:8FC6: 00        .byte $00   ; 
- D 0 - I - 0x030FD7 0C:8FC7: 9B        .byte $9B   ; 
- D 0 - I - 0x030FD8 0C:8FC8: A9        .byte $A9   ; 
- D 0 - I - 0x030FD9 0C:8FC9: A2        .byte $A2   ; 
- D 0 - I - 0x030FDA 0C:8FCA: A2        .byte $A2   ; 
- D 0 - I - 0x030FDB 0C:8FCB: A9        .byte $A9   ; 
- D 0 - I - 0x030FDC 0C:8FCC: A2        .byte $A2   ; 
- D 0 - I - 0x030FDD 0C:8FCD: A9        .byte $A9   ; 
- D 0 - I - 0x030FDE 0C:8FCE: A9        .byte $A9   ; 
- D 0 - I - 0x030FDF 0C:8FCF: A2        .byte $A2   ; 
- D 0 - I - 0x030FE0 0C:8FD0: A9        .byte $A9   ; 
- D 0 - I - 0x030FE1 0C:8FD1: A2        .byte $A2   ; 
- D 0 - I - 0x030FE2 0C:8FD2: A9        .byte $A9   ; 
- D 0 - I - 0x030FE3 0C:8FD3: A2        .byte $A2   ; 
- D 0 - I - 0x030FE4 0C:8FD4: A9        .byte $A9   ; 
- D 0 - I - 0x030FE5 0C:8FD5: A2        .byte $A2   ; 
- D 0 - I - 0x030FE6 0C:8FD6: A9        .byte $A9   ; 
- D 0 - I - 0x030FE7 0C:8FD7: 9A        .byte $9A   ; 
- D 0 - I - 0x030FE8 0C:8FD8: 00        .byte $00   ; 
- D 0 - I - 0x030FE9 0C:8FD9: 03        .byte $03   ; 
- D 0 - I - 0x030FEA 0C:8FDA: 00        .byte $00   ; 
- D 0 - I - 0x030FEB 0C:8FDB: 9B        .byte $9B   ; 
- D 0 - I - 0x030FEC 0C:8FDC: 9F        .byte $9F   ; 
- D 0 - I - 0x030FED 0C:8FDD: 8F        .byte $8F   ; 
- D 0 - I - 0x030FEE 0C:8FDE: 02        .byte $02   ; 
- D 0 - I - 0x030FEF 0C:8FDF: 9E        .byte $9E   ; 
- D 0 - I - 0x030FF0 0C:8FE0: 9A        .byte $9A   ; 
- D 0 - I - 0x030FF1 0C:8FE1: 02        .byte $02   ; 
- D 0 - I - 0x030FF2 0C:8FE2: 9B        .byte $9B   ; 
- D 0 - I - 0x030FF3 0C:8FE3: 9F        .byte $9F   ; 
- D 0 - I - 0x030FF4 0C:8FE4: 91        .byte $91   ; 
- D 0 - I - 0x030FF5 0C:8FE5: 01        .byte $01   ; 
- D 0 - I - 0x030FF6 0C:8FE6: A3        .byte $A3   ; 
- D 0 - I - 0x030FF7 0C:8FE7: 01        .byte $01   ; 
- D 0 - I - 0x030FF8 0C:8FE8: A1        .byte $A1   ; 
- D 0 - I - 0x030FF9 0C:8FE9: 92        .byte $92   ; 
- D 0 - I - 0x030FFA 0C:8FEA: 01        .byte $01   ; 
- D 0 - I - 0x030FFB 0C:8FEB: AA        .byte $AA   ; 
- D 0 - I - 0x030FFC 0C:8FEC: 01        .byte $01   ; 
- D 0 - I - 0x030FFD 0C:8FED: AB        .byte $AB   ; 
- D 0 - I - 0x030FFE 0C:8FEE: 92        .byte $92   ; 
- D 0 - I - 0x030FFF 0C:8FEF: 01        .byte $01   ; 
- D 0 - I - 0x031000 0C:8FF0: A3        .byte $A3   ; 
- D 0 - I - 0x031001 0C:8FF1: 02        .byte $02   ; 
- D 0 - I - 0x031002 0C:8FF2: 99        .byte $99   ; 
- D 0 - I - 0x031003 0C:8FF3: 9D        .byte $9D   ; 
- D 0 - I - 0x031004 0C:8FF4: 91        .byte $91   ; 
- D 0 - I - 0x031005 0C:8FF5: 01        .byte $01   ; 
- D 0 - I - 0x031006 0C:8FF6: AA        .byte $AA   ; 
- D 0 - I - 0x031007 0C:8FF7: 03        .byte $03   ; 
- D 0 - I - 0x031008 0C:8FF8: 00        .byte $00   ; 
- D 0 - I - 0x031009 0C:8FF9: 99        .byte $99   ; 
- D 0 - I - 0x03100A 0C:8FFA: 9D        .byte $9D   ; 
- D 0 - I - 0x03100B 0C:8FFB: 90        .byte $90   ; 
- D 0 - I - 0x03100C 0C:8FFC: 01        .byte $01   ; 
- D 0 - I - 0x03100D 0C:8FFD: A3        .byte $A3   ; 
- D 0 - I - 0x03100E 0C:8FFE: 14        .byte $14   ; 
- D 0 - I - 0x03100F 0C:8FFF: 00        .byte $00   ; 
- D 0 - I - 0x031010 0C:9000: 00        .byte $00   ; 
- D 0 - I - 0x031011 0C:9001: 99        .byte $99   ; 
- D 0 - I - 0x031012 0C:9002: A8        .byte $A8   ; 
- D 0 - I - 0x031013 0C:9003: A8        .byte $A8   ; 
- D 0 - I - 0x031014 0C:9004: A0        .byte $A0   ; 
- D 0 - I - 0x031015 0C:9005: A8        .byte $A8   ; 
- D 0 - I - 0x031016 0C:9006: A0        .byte $A0   ; 
- D 0 - I - 0x031017 0C:9007: A8        .byte $A8   ; 
- D 0 - I - 0x031018 0C:9008: A8        .byte $A8   ; 
- D 0 - I - 0x031019 0C:9009: A0        .byte $A0   ; 
- D 0 - I - 0x03101A 0C:900A: A8        .byte $A8   ; 
- D 0 - I - 0x03101B 0C:900B: A0        .byte $A0   ; 
- D 0 - I - 0x03101C 0C:900C: A8        .byte $A8   ; 
- D 0 - I - 0x03101D 0C:900D: A8        .byte $A8   ; 
- D 0 - I - 0x03101E 0C:900E: A0        .byte $A0   ; 
- D 0 - I - 0x03101F 0C:900F: A8        .byte $A8   ; 
- D 0 - I - 0x031020 0C:9010: A0        .byte $A0   ; 
- D 0 - I - 0x031021 0C:9011: A8        .byte $A8   ; 
- D 0 - I - 0x031022 0C:9012: 98        .byte $98   ; 
- D 0 - I - 0x031023 0C:9013: 94        .byte $94   ; 
- D 0 - I - 0x031024 0C:9014: 94        .byte $94   ; 
- D 0 - I - 0x031025 0C:9015: 2C        .byte $2C   ; 
- D 0 - I - 0x031026 0C:9016: 22        .byte $22   ; 
- D 0 - I - 0x031027 0C:9017: 14        .byte $14   ; 
- D 0 - I - 0x031028 0C:9018: 94        .byte $94   ; 
- D 0 - I - 0x031029 0C:9019: 14        .byte $14   ; 
- D 0 - I - 0x03102A 0C:901A: 00        .byte $00   ; 
- D 0 - I - 0x03102B 0C:901B: 00        .byte $00   ; 
- D 0 - I - 0x03102C 0C:901C: 9B        .byte $9B   ; 
- D 0 - I - 0x03102D 0C:901D: A2        .byte $A2   ; 
- D 0 - I - 0x03102E 0C:901E: A9        .byte $A9   ; 
- D 0 - I - 0x03102F 0C:901F: A2        .byte $A2   ; 
- D 0 - I - 0x031030 0C:9020: A9        .byte $A9   ; 
- D 0 - I - 0x031031 0C:9021: A2        .byte $A2   ; 
- D 0 - I - 0x031032 0C:9022: A2        .byte $A2   ; 
- D 0 - I - 0x031033 0C:9023: A9        .byte $A9   ; 
- D 0 - I - 0x031034 0C:9024: A9        .byte $A9   ; 
- D 0 - I - 0x031035 0C:9025: A9        .byte $A9   ; 
- D 0 - I - 0x031036 0C:9026: A2        .byte $A2   ; 
- D 0 - I - 0x031037 0C:9027: A9        .byte $A9   ; 
- D 0 - I - 0x031038 0C:9028: A9        .byte $A9   ; 
- D 0 - I - 0x031039 0C:9029: A2        .byte $A2   ; 
- D 0 - I - 0x03103A 0C:902A: A9        .byte $A9   ; 
- D 0 - I - 0x03103B 0C:902B: A2        .byte $A2   ; 
- D 0 - I - 0x03103C 0C:902C: 9A        .byte $9A   ; 
- D 0 - I - 0x03103D 0C:902D: 00        .byte $00   ; 
- D 0 - I - 0x03103E 0C:902E: 03        .byte $03   ; 
- D 0 - I - 0x03103F 0C:902F: 00        .byte $00   ; 
- D 0 - I - 0x031040 0C:9030: 9B        .byte $9B   ; 
- D 0 - I - 0x031041 0C:9031: 9F        .byte $9F   ; 
- D 0 - I - 0x031042 0C:9032: 8F        .byte $8F   ; 
- D 0 - I - 0x031043 0C:9033: 02        .byte $02   ; 
- D 0 - I - 0x031044 0C:9034: 9E        .byte $9E   ; 
- D 0 - I - 0x031045 0C:9035: 9A        .byte $9A   ; 
- D 0 - I - 0x031046 0C:9036: 02        .byte $02   ; 
- D 0 - I - 0x031047 0C:9037: 00        .byte $00   ; 
- D 0 - I - 0x031048 0C:9038: AB        .byte $AB   ; 
- D 0 - I - 0x031049 0C:9039: 91        .byte $91   ; 
- D 0 - I - 0x03104A 0C:903A: 01        .byte $01   ; 
- D 0 - I - 0x03104B 0C:903B: AA        .byte $AA   ; 
- D 0 - I - 0x03104C 0C:903C: 02        .byte $02   ; 
- D 0 - I - 0x03104D 0C:903D: 00        .byte $00   ; 
- D 0 - I - 0x03104E 0C:903E: A1        .byte $A1   ; 
- D 0 - I - 0x03104F 0C:903F: 91        .byte $91   ; 
- D 0 - I - 0x031050 0C:9040: 01        .byte $01   ; 
- D 0 - I - 0x031051 0C:9041: A3        .byte $A3   ; 
- D 0 - I - 0x031052 0C:9042: 02        .byte $02   ; 
- D 0 - I - 0x031053 0C:9043: 00        .byte $00   ; 
- D 0 - I - 0x031054 0C:9044: A1        .byte $A1   ; 
- D 0 - I - 0x031055 0C:9045: 91        .byte $91   ; 
- D 0 - I - 0x031056 0C:9046: 01        .byte $01   ; 
- D 0 - I - 0x031057 0C:9047: AA        .byte $AA   ; 
- D 0 - I - 0x031058 0C:9048: 02        .byte $02   ; 
- D 0 - I - 0x031059 0C:9049: 00        .byte $00   ; 
- D 0 - I - 0x03105A 0C:904A: AB        .byte $AB   ; 
- D 0 - I - 0x03105B 0C:904B: 91        .byte $91   ; 
- D 0 - I - 0x03105C 0C:904C: 01        .byte $01   ; 
- D 0 - I - 0x03105D 0C:904D: A3        .byte $A3   ; 
- D 0 - I - 0x03105E 0C:904E: 02        .byte $02   ; 
- D 0 - I - 0x03105F 0C:904F: 00        .byte $00   ; 
- D 0 - I - 0x031060 0C:9050: A1        .byte $A1   ; 
- D 0 - I - 0x031061 0C:9051: 91        .byte $91   ; 
- D 0 - I - 0x031062 0C:9052: 01        .byte $01   ; 
- D 0 - I - 0x031063 0C:9053: AA        .byte $AA   ; 
- D 0 - I - 0x031064 0C:9054: 03        .byte $03   ; 
- D 0 - I - 0x031065 0C:9055: 00        .byte $00   ; 
- D 0 - I - 0x031066 0C:9056: 99        .byte $99   ; 
- D 0 - I - 0x031067 0C:9057: 9D        .byte $9D   ; 
- D 0 - I - 0x031068 0C:9058: 8F        .byte $8F   ; 
- D 0 - I - 0x031069 0C:9059: 02        .byte $02   ; 
- D 0 - I - 0x03106A 0C:905A: 9C        .byte $9C   ; 
- D 0 - I - 0x03106B 0C:905B: 98        .byte $98   ; 
- D 0 - I - 0x03106C 0C:905C: 14        .byte $14   ; 
- D 0 - I - 0x03106D 0C:905D: 00        .byte $00   ; 
- D 0 - I - 0x03106E 0C:905E: 00        .byte $00   ; 
- D 0 - I - 0x03106F 0C:905F: 99        .byte $99   ; 
- D 0 - I - 0x031070 0C:9060: A0        .byte $A0   ; 
- D 0 - I - 0x031071 0C:9061: A8        .byte $A8   ; 
- D 0 - I - 0x031072 0C:9062: A8        .byte $A8   ; 
- D 0 - I - 0x031073 0C:9063: A8        .byte $A8   ; 
- D 0 - I - 0x031074 0C:9064: A0        .byte $A0   ; 
- D 0 - I - 0x031075 0C:9065: A8        .byte $A8   ; 
- D 0 - I - 0x031076 0C:9066: A0        .byte $A0   ; 
- D 0 - I - 0x031077 0C:9067: A8        .byte $A8   ; 
- D 0 - I - 0x031078 0C:9068: A0        .byte $A0   ; 
- D 0 - I - 0x031079 0C:9069: A0        .byte $A0   ; 
- D 0 - I - 0x03107A 0C:906A: A8        .byte $A8   ; 
- D 0 - I - 0x03107B 0C:906B: A0        .byte $A0   ; 
- D 0 - I - 0x03107C 0C:906C: A8        .byte $A8   ; 
- D 0 - I - 0x03107D 0C:906D: A0        .byte $A0   ; 
- D 0 - I - 0x03107E 0C:906E: A8        .byte $A8   ; 
- D 0 - I - 0x03107F 0C:906F: 98        .byte $98   ; 
- D 0 - I - 0x031080 0C:9070: 00        .byte $00   ; 
- D 0 - I - 0x031081 0C:9071: 94        .byte $94   ; 
- D 0 - I - 0x031082 0C:9072: 94        .byte $94   ; 
- D 0 - I - 0x031083 0C:9073: 2C        .byte $2C   ; 
- D 0 - I - 0x031084 0C:9074: 22        .byte $22   ; 
- D 0 - I - 0x031085 0C:9075: 14        .byte $14   ; 
- D 0 - I - 0x031086 0C:9076: 94        .byte $94   ; 
- D 0 - I - 0x031087 0C:9077: 14        .byte $14   ; 
- D 0 - I - 0x031088 0C:9078: 00        .byte $00   ; 
- D 0 - I - 0x031089 0C:9079: 00        .byte $00   ; 
- D 0 - I - 0x03108A 0C:907A: 00        .byte $00   ; 
- D 0 - I - 0x03108B 0C:907B: 9B        .byte $9B   ; 
- D 0 - I - 0x03108C 0C:907C: A9        .byte $A9   ; 
- D 0 - I - 0x03108D 0C:907D: A2        .byte $A2   ; 
- D 0 - I - 0x03108E 0C:907E: A9        .byte $A9   ; 
- D 0 - I - 0x03108F 0C:907F: A2        .byte $A2   ; 
- D 0 - I - 0x031090 0C:9080: A9        .byte $A9   ; 
- D 0 - I - 0x031091 0C:9081: A9        .byte $A9   ; 
- D 0 - I - 0x031092 0C:9082: A2        .byte $A2   ; 
- D 0 - I - 0x031093 0C:9083: A9        .byte $A9   ; 
- D 0 - I - 0x031094 0C:9084: A9        .byte $A9   ; 
- D 0 - I - 0x031095 0C:9085: A2        .byte $A2   ; 
- D 0 - I - 0x031096 0C:9086: A2        .byte $A2   ; 
- D 0 - I - 0x031097 0C:9087: A9        .byte $A9   ; 
- D 0 - I - 0x031098 0C:9088: A9        .byte $A9   ; 
- D 0 - I - 0x031099 0C:9089: A2        .byte $A2   ; 
- D 0 - I - 0x03109A 0C:908A: 9A        .byte $9A   ; 
- D 0 - I - 0x03109B 0C:908B: 00        .byte $00   ; 
- D 0 - I - 0x03109C 0C:908C: 04        .byte $04   ; 
- D 0 - I - 0x03109D 0C:908D: 00        .byte $00   ; 
- D 0 - I - 0x03109E 0C:908E: 00        .byte $00   ; 
- D 0 - I - 0x03109F 0C:908F: 9B        .byte $9B   ; 
- D 0 - I - 0x0310A0 0C:9090: 9F        .byte $9F   ; 
- D 0 - I - 0x0310A1 0C:9091: 8E        .byte $8E   ; 
- D 0 - I - 0x0310A2 0C:9092: 02        .byte $02   ; 
- D 0 - I - 0x0310A3 0C:9093: 9E        .byte $9E   ; 
- D 0 - I - 0x0310A4 0C:9094: 9A        .byte $9A   ; 
- D 0 - I - 0x0310A5 0C:9095: 03        .byte $03   ; 
- D 0 - I - 0x0310A6 0C:9096: 00        .byte $00   ; 
- D 0 - I - 0x0310A7 0C:9097: 9B        .byte $9B   ; 
- D 0 - I - 0x0310A8 0C:9098: 9F        .byte $9F   ; 
- D 0 - I - 0x0310A9 0C:9099: 90        .byte $90   ; 
- D 0 - I - 0x0310AA 0C:909A: 01        .byte $01   ; 
- D 0 - I - 0x0310AB 0C:909B: AA        .byte $AA   ; 
- D 0 - I - 0x0310AC 0C:909C: 02        .byte $02   ; 
- D 0 - I - 0x0310AD 0C:909D: 00        .byte $00   ; 
- D 0 - I - 0x0310AE 0C:909E: A1        .byte $A1   ; 
- D 0 - I - 0x0310AF 0C:909F: 91        .byte $91   ; 
- D 0 - I - 0x0310B0 0C:90A0: 01        .byte $01   ; 
- D 0 - I - 0x0310B1 0C:90A1: A3        .byte $A3   ; 
- D 0 - I - 0x0310B2 0C:90A2: 02        .byte $02   ; 
- D 0 - I - 0x0310B3 0C:90A3: 00        .byte $00   ; 
- D 0 - I - 0x0310B4 0C:90A4: AB        .byte $AB   ; 
- D 0 - I - 0x0310B5 0C:90A5: 91        .byte $91   ; 
- D 0 - I - 0x0310B6 0C:90A6: 01        .byte $01   ; 
- D 0 - I - 0x0310B7 0C:90A7: AA        .byte $AA   ; 
- D 0 - I - 0x0310B8 0C:90A8: 02        .byte $02   ; 
- D 0 - I - 0x0310B9 0C:90A9: 00        .byte $00   ; 
- D 0 - I - 0x0310BA 0C:90AA: A1        .byte $A1   ; 
- D 0 - I - 0x0310BB 0C:90AB: 91        .byte $91   ; 
- D 0 - I - 0x0310BC 0C:90AC: 01        .byte $01   ; 
- D 0 - I - 0x0310BD 0C:90AD: AA        .byte $AA   ; 
- D 0 - I - 0x0310BE 0C:90AE: 02        .byte $02   ; 
- D 0 - I - 0x0310BF 0C:90AF: 00        .byte $00   ; 
- D 0 - I - 0x0310C0 0C:90B0: AB        .byte $AB   ; 
- D 0 - I - 0x0310C1 0C:90B1: 91        .byte $91   ; 
- D 0 - I - 0x0310C2 0C:90B2: 01        .byte $01   ; 
- D 0 - I - 0x0310C3 0C:90B3: A3        .byte $A3   ; 
- D 0 - I - 0x0310C4 0C:90B4: 02        .byte $02   ; 
- D 0 - I - 0x0310C5 0C:90B5: 00        .byte $00   ; 
- D 0 - I - 0x0310C6 0C:90B6: A1        .byte $A1   ; 
- D 0 - I - 0x0310C7 0C:90B7: 91        .byte $91   ; 
- D 0 - I - 0x0310C8 0C:90B8: 01        .byte $01   ; 
- D 0 - I - 0x0310C9 0C:90B9: AA        .byte $AA   ; 
- D 0 - I - 0x0310CA 0C:90BA: 03        .byte $03   ; 
- D 0 - I - 0x0310CB 0C:90BB: 00        .byte $00   ; 
- D 0 - I - 0x0310CC 0C:90BC: 99        .byte $99   ; 
- D 0 - I - 0x0310CD 0C:90BD: 9D        .byte $9D   ; 
- D 0 - I - 0x0310CE 0C:90BE: 90        .byte $90   ; 
- D 0 - I - 0x0310CF 0C:90BF: 01        .byte $01   ; 
- D 0 - I - 0x0310D0 0C:90C0: A3        .byte $A3   ; 
- D 0 - I - 0x0310D1 0C:90C1: 04        .byte $04   ; 
- D 0 - I - 0x0310D2 0C:90C2: 00        .byte $00   ; 
- D 0 - I - 0x0310D3 0C:90C3: 00        .byte $00   ; 
- D 0 - I - 0x0310D4 0C:90C4: 99        .byte $99   ; 
- D 0 - I - 0x0310D5 0C:90C5: 9D        .byte $9D   ; 
- D 0 - I - 0x0310D6 0C:90C6: 8E        .byte $8E   ; 
- D 0 - I - 0x0310D7 0C:90C7: 02        .byte $02   ; 
- D 0 - I - 0x0310D8 0C:90C8: 9C        .byte $9C   ; 
- D 0 - I - 0x0310D9 0C:90C9: 98        .byte $98   ; 
- D 0 - I - 0x0310DA 0C:90CA: 14        .byte $14   ; 
- D 0 - I - 0x0310DB 0C:90CB: 00        .byte $00   ; 
- D 0 - I - 0x0310DC 0C:90CC: 00        .byte $00   ; 
- D 0 - I - 0x0310DD 0C:90CD: 00        .byte $00   ; 
- D 0 - I - 0x0310DE 0C:90CE: 99        .byte $99   ; 
- D 0 - I - 0x0310DF 0C:90CF: A8        .byte $A8   ; 
- D 0 - I - 0x0310E0 0C:90D0: A0        .byte $A0   ; 
- D 0 - I - 0x0310E1 0C:90D1: A8        .byte $A8   ; 
- D 0 - I - 0x0310E2 0C:90D2: A8        .byte $A8   ; 
- D 0 - I - 0x0310E3 0C:90D3: A0        .byte $A0   ; 
- D 0 - I - 0x0310E4 0C:90D4: A8        .byte $A8   ; 
- D 0 - I - 0x0310E5 0C:90D5: A8        .byte $A8   ; 
- D 0 - I - 0x0310E6 0C:90D6: A0        .byte $A0   ; 
- D 0 - I - 0x0310E7 0C:90D7: A0        .byte $A0   ; 
- D 0 - I - 0x0310E8 0C:90D8: A8        .byte $A8   ; 
- D 0 - I - 0x0310E9 0C:90D9: A8        .byte $A8   ; 
- D 0 - I - 0x0310EA 0C:90DA: A0        .byte $A0   ; 
- D 0 - I - 0x0310EB 0C:90DB: A8        .byte $A8   ; 
- D 0 - I - 0x0310EC 0C:90DC: A0        .byte $A0   ; 
- D 0 - I - 0x0310ED 0C:90DD: 98        .byte $98   ; 
- D 0 - I - 0x0310EE 0C:90DE: 00        .byte $00   ; 
- D 0 - I - 0x0310EF 0C:90DF: 2C        .byte $2C   ; 
- D 0 - I - 0x0310F0 0C:90E0: 22        .byte $22   ; 
- D 0 - I - 0x0310F1 0C:90E1: 14        .byte $14   ; 
- D 0 - I - 0x0310F2 0C:90E2: 94        .byte $94   ; 
- D 0 - I - 0x0310F3 0C:90E3: 94        .byte $94   ; 
- D 0 - I - 0x0310F4 0C:90E4: 14        .byte $14   ; 
- D 0 - I - 0x0310F5 0C:90E5: 00        .byte $00   ; 
- D 0 - I - 0x0310F6 0C:90E6: 00        .byte $00   ; 
- D 0 - I - 0x0310F7 0C:90E7: 00        .byte $00   ; 
- D 0 - I - 0x0310F8 0C:90E8: 9C        .byte $9C   ; 
- D 0 - I - 0x0310F9 0C:90E9: A0        .byte $A0   ; 
- D 0 - I - 0x0310FA 0C:90EA: A8        .byte $A8   ; 
- D 0 - I - 0x0310FB 0C:90EB: A0        .byte $A0   ; 
- D 0 - I - 0x0310FC 0C:90EC: A8        .byte $A8   ; 
- D 0 - I - 0x0310FD 0C:90ED: A0        .byte $A0   ; 
- D 0 - I - 0x0310FE 0C:90EE: A8        .byte $A8   ; 
- D 0 - I - 0x0310FF 0C:90EF: A8        .byte $A8   ; 
- D 0 - I - 0x031100 0C:90F0: A0        .byte $A0   ; 
- D 0 - I - 0x031101 0C:90F1: A8        .byte $A8   ; 
- D 0 - I - 0x031102 0C:90F2: A0        .byte $A0   ; 
- D 0 - I - 0x031103 0C:90F3: A0        .byte $A0   ; 
- D 0 - I - 0x031104 0C:90F4: A8        .byte $A8   ; 
- D 0 - I - 0x031105 0C:90F5: A0        .byte $A0   ; 
- D 0 - I - 0x031106 0C:90F6: 9D        .byte $9D   ; 
- D 0 - I - 0x031107 0C:90F7: 00        .byte $00   ; 
- D 0 - I - 0x031108 0C:90F8: 00        .byte $00   ; 
- D 0 - I - 0x031109 0C:90F9: 04        .byte $04   ; 
- D 0 - I - 0x03110A 0C:90FA: 00        .byte $00   ; 
- D 0 - I - 0x03110B 0C:90FB: 9C        .byte $9C   ; 
- D 0 - I - 0x03110C 0C:90FC: A0        .byte $A0   ; 
- D 0 - I - 0x03110D 0C:90FD: 98        .byte $98   ; 
- D 0 - I - 0x03110E 0C:90FE: 8D        .byte $8D   ; 
- D 0 - I - 0x03110F 0C:90FF: 03        .byte $03   ; 
- D 0 - I - 0x031110 0C:9100: 99        .byte $99   ; 
- D 0 - I - 0x031111 0C:9101: 9D        .byte $9D   ; 
- D 0 - I - 0x031112 0C:9102: 00        .byte $00   ; 
- D 0 - I - 0x031113 0C:9103: 02        .byte $02   ; 
- D 0 - I - 0x031114 0C:9104: 00        .byte $00   ; 
- D 0 - I - 0x031115 0C:9105: A3        .byte $A3   ; 
- D 0 - I - 0x031116 0C:9106: 90        .byte $90   ; 
- D 0 - I - 0x031117 0C:9107: 02        .byte $02   ; 
- D 0 - I - 0x031118 0C:9108: AB        .byte $AB   ; 
- D 0 - I - 0x031119 0C:9109: 00        .byte $00   ; 
- D 0 - I - 0x03111A 0C:910A: 02        .byte $02   ; 
- D 0 - I - 0x03111B 0C:910B: 96        .byte $96   ; 
- D 0 - I - 0x03111C 0C:910C: 97        .byte $97   ; 
- D 0 - I - 0x03111D 0C:910D: 90        .byte $90   ; 
- D 0 - I - 0x03111E 0C:910E: 02        .byte $02   ; 
- D 0 - I - 0x03111F 0C:910F: A1        .byte $A1   ; 
- D 0 - I - 0x031120 0C:9110: 00        .byte $00   ; 
- D 0 - I - 0x031121 0C:9111: 02        .byte $02   ; 
- D 0 - I - 0x031122 0C:9112: 00        .byte $00   ; 
- D 0 - I - 0x031123 0C:9113: A3        .byte $A3   ; 
- D 0 - I - 0x031124 0C:9114: 90        .byte $90   ; 
- D 0 - I - 0x031125 0C:9115: 02        .byte $02   ; 
- D 0 - I - 0x031126 0C:9116: AB        .byte $AB   ; 
- D 0 - I - 0x031127 0C:9117: 00        .byte $00   ; 
- D 0 - I - 0x031128 0C:9118: 03        .byte $03   ; 
- D 0 - I - 0x031129 0C:9119: 00        .byte $00   ; 
- D 0 - I - 0x03112A 0C:911A: 9E        .byte $9E   ; 
- D 0 - I - 0x03112B 0C:911B: 9A        .byte $9A   ; 
- D 0 - I - 0x03112C 0C:911C: 8F        .byte $8F   ; 
- D 0 - I - 0x03112D 0C:911D: 02        .byte $02   ; 
- D 0 - I - 0x03112E 0C:911E: A1        .byte $A1   ; 
- D 0 - I - 0x03112F 0C:911F: 00        .byte $00   ; 
- D 0 - I - 0x031130 0C:9120: 03        .byte $03   ; 
- D 0 - I - 0x031131 0C:9121: 00        .byte $00   ; 
- D 0 - I - 0x031132 0C:9122: 00        .byte $00   ; 
- D 0 - I - 0x031133 0C:9123: A3        .byte $A3   ; 
- D 0 - I - 0x031134 0C:9124: 8E        .byte $8E   ; 
- D 0 - I - 0x031135 0C:9125: 03        .byte $03   ; 
- D 0 - I - 0x031136 0C:9126: 9B        .byte $9B   ; 
- D 0 - I - 0x031137 0C:9127: 9F        .byte $9F   ; 
- D 0 - I - 0x031138 0C:9128: 00        .byte $00   ; 
- D 0 - I - 0x031139 0C:9129: 14        .byte $14   ; 
- D 0 - I - 0x03113A 0C:912A: 00        .byte $00   ; 
- D 0 - I - 0x03113B 0C:912B: 00        .byte $00   ; 
- D 0 - I - 0x03113C 0C:912C: 9E        .byte $9E   ; 
- D 0 - I - 0x03113D 0C:912D: A2        .byte $A2   ; 
- D 0 - I - 0x03113E 0C:912E: A9        .byte $A9   ; 
- D 0 - I - 0x03113F 0C:912F: A2        .byte $A2   ; 
- D 0 - I - 0x031140 0C:9130: A9        .byte $A9   ; 
- D 0 - I - 0x031141 0C:9131: A2        .byte $A2   ; 
- D 0 - I - 0x031142 0C:9132: A9        .byte $A9   ; 
- D 0 - I - 0x031143 0C:9133: A9        .byte $A9   ; 
- D 0 - I - 0x031144 0C:9134: A2        .byte $A2   ; 
- D 0 - I - 0x031145 0C:9135: A2        .byte $A2   ; 
- D 0 - I - 0x031146 0C:9136: A9        .byte $A9   ; 
- D 0 - I - 0x031147 0C:9137: A2        .byte $A2   ; 
- D 0 - I - 0x031148 0C:9138: A2        .byte $A2   ; 
- D 0 - I - 0x031149 0C:9139: A9        .byte $A9   ; 
- D 0 - I - 0x03114A 0C:913A: A2        .byte $A2   ; 
- D 0 - I - 0x03114B 0C:913B: 9F        .byte $9F   ; 
- D 0 - I - 0x03114C 0C:913C: 00        .byte $00   ; 
- D 0 - I - 0x03114D 0C:913D: 00        .byte $00   ; 
- D 0 - I - 0x03114E 0C:913E: 94        .byte $94   ; 
- D 0 - I - 0x03114F 0C:913F: 94        .byte $94   ; 
- D 0 - I - 0x031150 0C:9140: 28        .byte $28   ; 
- D 0 - I - 0x031151 0C:9141: 22        .byte $22   ; 
- D 0 - I - 0x031152 0C:9142: 18        .byte $18   ; 
- D 0 - I - 0x031153 0C:9143: 98        .byte $98   ; 
- D 0 - I - 0x031154 0C:9144: 18        .byte $18   ; 
- D 0 - I - 0x031155 0C:9145: 00        .byte $00   ; 
- D 0 - I - 0x031156 0C:9146: 9C        .byte $9C   ; 
- D 0 - I - 0x031157 0C:9147: A8        .byte $A8   ; 
- D 0 - I - 0x031158 0C:9148: A8        .byte $A8   ; 
- D 0 - I - 0x031159 0C:9149: A8        .byte $A8   ; 
- D 0 - I - 0x03115A 0C:914A: A8        .byte $A8   ; 
- D 0 - I - 0x03115B 0C:914B: A8        .byte $A8   ; 
- D 0 - I - 0x03115C 0C:914C: A8        .byte $A8   ; 
- D 0 - I - 0x03115D 0C:914D: A8        .byte $A8   ; 
- D 0 - I - 0x03115E 0C:914E: A8        .byte $A8   ; 
- D 0 - I - 0x03115F 0C:914F: A8        .byte $A8   ; 
- D 0 - I - 0x031160 0C:9150: A8        .byte $A8   ; 
- D 0 - I - 0x031161 0C:9151: A8        .byte $A8   ; 
- D 0 - I - 0x031162 0C:9152: A8        .byte $A8   ; 
- D 0 - I - 0x031163 0C:9153: A8        .byte $A8   ; 
- D 0 - I - 0x031164 0C:9154: A8        .byte $A8   ; 
- D 0 - I - 0x031165 0C:9155: A8        .byte $A8   ; 
- D 0 - I - 0x031166 0C:9156: A8        .byte $A8   ; 
- D 0 - I - 0x031167 0C:9157: A8        .byte $A8   ; 
- D 0 - I - 0x031168 0C:9158: A8        .byte $A8   ; 
- D 0 - I - 0x031169 0C:9159: A8        .byte $A8   ; 
- D 0 - I - 0x03116A 0C:915A: 9D        .byte $9D   ; 
- D 0 - I - 0x03116B 0C:915B: 00        .byte $00   ; 
- D 0 - I - 0x03116C 0C:915C: 00        .byte $00   ; 
- D 0 - I - 0x03116D 0C:915D: 02        .byte $02   ; 
- D 0 - I - 0x03116E 0C:915E: 00        .byte $00   ; 
- D 0 - I - 0x03116F 0C:915F: AA        .byte $AA   ; 
- D 0 - I - 0x031170 0C:9160: 93        .byte $93   ; 
- D 0 - I - 0x031171 0C:9161: 03        .byte $03   ; 
- D 0 - I - 0x031172 0C:9162: AB        .byte $AB   ; 
- D 0 - I - 0x031173 0C:9163: 00        .byte $00   ; 
- D 0 - I - 0x031174 0C:9164: 00        .byte $00   ; 
- D 0 - I - 0x031175 0C:9165: 02        .byte $02   ; 
- D 0 - I - 0x031176 0C:9166: 00        .byte $00   ; 
- D 0 - I - 0x031177 0C:9167: AA        .byte $AA   ; 
- D 0 - I - 0x031178 0C:9168: 93        .byte $93   ; 
- D 0 - I - 0x031179 0C:9169: 03        .byte $03   ; 
- D 0 - I - 0x03117A 0C:916A: AB        .byte $AB   ; 
- D 0 - I - 0x03117B 0C:916B: 00        .byte $00   ; 
- D 0 - I - 0x03117C 0C:916C: 00        .byte $00   ; 
- D 0 - I - 0x03117D 0C:916D: 02        .byte $02   ; 
- D 0 - I - 0x03117E 0C:916E: 00        .byte $00   ; 
- D 0 - I - 0x03117F 0C:916F: AA        .byte $AA   ; 
- D 0 - I - 0x031180 0C:9170: 93        .byte $93   ; 
- D 0 - I - 0x031181 0C:9171: 03        .byte $03   ; 
- D 0 - I - 0x031182 0C:9172: AB        .byte $AB   ; 
- D 0 - I - 0x031183 0C:9173: 00        .byte $00   ; 
- D 0 - I - 0x031184 0C:9174: 00        .byte $00   ; 
- D 0 - I - 0x031185 0C:9175: 02        .byte $02   ; 
- D 0 - I - 0x031186 0C:9176: 00        .byte $00   ; 
- D 0 - I - 0x031187 0C:9177: AA        .byte $AA   ; 
- D 0 - I - 0x031188 0C:9178: 93        .byte $93   ; 
- D 0 - I - 0x031189 0C:9179: 03        .byte $03   ; 
- D 0 - I - 0x03118A 0C:917A: AB        .byte $AB   ; 
- D 0 - I - 0x03118B 0C:917B: 00        .byte $00   ; 
- D 0 - I - 0x03118C 0C:917C: 00        .byte $00   ; 
- D 0 - I - 0x03118D 0C:917D: 02        .byte $02   ; 
- D 0 - I - 0x03118E 0C:917E: 00        .byte $00   ; 
- D 0 - I - 0x03118F 0C:917F: AA        .byte $AA   ; 
- D 0 - I - 0x031190 0C:9180: 93        .byte $93   ; 
- D 0 - I - 0x031191 0C:9181: 03        .byte $03   ; 
- D 0 - I - 0x031192 0C:9182: AB        .byte $AB   ; 
- D 0 - I - 0x031193 0C:9183: 00        .byte $00   ; 
- D 0 - I - 0x031194 0C:9184: 00        .byte $00   ; 
- D 0 - I - 0x031195 0C:9185: 02        .byte $02   ; 
- D 0 - I - 0x031196 0C:9186: 00        .byte $00   ; 
- D 0 - I - 0x031197 0C:9187: AA        .byte $AA   ; 
- D 0 - I - 0x031198 0C:9188: 93        .byte $93   ; 
- D 0 - I - 0x031199 0C:9189: 03        .byte $03   ; 
- D 0 - I - 0x03119A 0C:918A: AB        .byte $AB   ; 
- D 0 - I - 0x03119B 0C:918B: 00        .byte $00   ; 
- D 0 - I - 0x03119C 0C:918C: 00        .byte $00   ; 
- D 0 - I - 0x03119D 0C:918D: 02        .byte $02   ; 
- D 0 - I - 0x03119E 0C:918E: 00        .byte $00   ; 
- D 0 - I - 0x03119F 0C:918F: AA        .byte $AA   ; 
- D 0 - I - 0x0311A0 0C:9190: 93        .byte $93   ; 
- D 0 - I - 0x0311A1 0C:9191: 03        .byte $03   ; 
- D 0 - I - 0x0311A2 0C:9192: AB        .byte $AB   ; 
- D 0 - I - 0x0311A3 0C:9193: 00        .byte $00   ; 
- D 0 - I - 0x0311A4 0C:9194: 00        .byte $00   ; 
- D 0 - I - 0x0311A5 0C:9195: 18        .byte $18   ; 
- D 0 - I - 0x0311A6 0C:9196: 00        .byte $00   ; 
- D 0 - I - 0x0311A7 0C:9197: 9E        .byte $9E   ; 
- D 0 - I - 0x0311A8 0C:9198: A9        .byte $A9   ; 
- D 0 - I - 0x0311A9 0C:9199: A9        .byte $A9   ; 
- D 0 - I - 0x0311AA 0C:919A: A9        .byte $A9   ; 
- D 0 - I - 0x0311AB 0C:919B: A9        .byte $A9   ; 
- D 0 - I - 0x0311AC 0C:919C: A9        .byte $A9   ; 
- D 0 - I - 0x0311AD 0C:919D: A9        .byte $A9   ; 
- D 0 - I - 0x0311AE 0C:919E: A9        .byte $A9   ; 
- D 0 - I - 0x0311AF 0C:919F: A9        .byte $A9   ; 
- D 0 - I - 0x0311B0 0C:91A0: A9        .byte $A9   ; 
- D 0 - I - 0x0311B1 0C:91A1: A9        .byte $A9   ; 
- D 0 - I - 0x0311B2 0C:91A2: A9        .byte $A9   ; 
- D 0 - I - 0x0311B3 0C:91A3: A9        .byte $A9   ; 
- D 0 - I - 0x0311B4 0C:91A4: A9        .byte $A9   ; 
- D 0 - I - 0x0311B5 0C:91A5: A9        .byte $A9   ; 
- D 0 - I - 0x0311B6 0C:91A6: A9        .byte $A9   ; 
- D 0 - I - 0x0311B7 0C:91A7: A9        .byte $A9   ; 
- D 0 - I - 0x0311B8 0C:91A8: A9        .byte $A9   ; 
- D 0 - I - 0x0311B9 0C:91A9: A9        .byte $A9   ; 
- D 0 - I - 0x0311BA 0C:91AA: A9        .byte $A9   ; 
- D 0 - I - 0x0311BB 0C:91AB: 9F        .byte $9F   ; 
- D 0 - I - 0x0311BC 0C:91AC: 00        .byte $00   ; 
- D 0 - I - 0x0311BD 0C:91AD: 00        .byte $00   ; 
- D 0 - I - 0x0311BE 0C:91AE: 98        .byte $98   ; 
- D 0 - I - 0x0311BF 0C:91AF: 98        .byte $98   ; 
- D 0 - I - 0x0311C0 0C:91B0: 28        .byte $28   ; 
- D 0 - I - 0x0311C1 0C:91B1: 22        .byte $22   ; 
- D 0 - I - 0x0311C2 0C:91B2: 18        .byte $18   ; 
- D 0 - I - 0x0311C3 0C:91B3: 98        .byte $98   ; 
- D 0 - I - 0x0311C4 0C:91B4: 18        .byte $18   ; 
- D 0 - I - 0x0311C5 0C:91B5: 00        .byte $00   ; 
- D 0 - I - 0x0311C6 0C:91B6: 9B        .byte $9B   ; 
- D 0 - I - 0x0311C7 0C:91B7: A9        .byte $A9   ; 
- D 0 - I - 0x0311C8 0C:91B8: A2        .byte $A2   ; 
- D 0 - I - 0x0311C9 0C:91B9: A9        .byte $A9   ; 
- D 0 - I - 0x0311CA 0C:91BA: A2        .byte $A2   ; 
- D 0 - I - 0x0311CB 0C:91BB: A9        .byte $A9   ; 
- D 0 - I - 0x0311CC 0C:91BC: A2        .byte $A2   ; 
- D 0 - I - 0x0311CD 0C:91BD: A9        .byte $A9   ; 
- D 0 - I - 0x0311CE 0C:91BE: A2        .byte $A2   ; 
- D 0 - I - 0x0311CF 0C:91BF: A9        .byte $A9   ; 
- D 0 - I - 0x0311D0 0C:91C0: A2        .byte $A2   ; 
- D 0 - I - 0x0311D1 0C:91C1: A9        .byte $A9   ; 
- D 0 - I - 0x0311D2 0C:91C2: A2        .byte $A2   ; 
- D 0 - I - 0x0311D3 0C:91C3: A9        .byte $A9   ; 
- D 0 - I - 0x0311D4 0C:91C4: A2        .byte $A2   ; 
- D 0 - I - 0x0311D5 0C:91C5: A9        .byte $A9   ; 
- D 0 - I - 0x0311D6 0C:91C6: A2        .byte $A2   ; 
- D 0 - I - 0x0311D7 0C:91C7: A9        .byte $A9   ; 
- D 0 - I - 0x0311D8 0C:91C8: A2        .byte $A2   ; 
- D 0 - I - 0x0311D9 0C:91C9: A9        .byte $A9   ; 
- D 0 - I - 0x0311DA 0C:91CA: 9A        .byte $9A   ; 
- D 0 - I - 0x0311DB 0C:91CB: 00        .byte $00   ; 
- D 0 - I - 0x0311DC 0C:91CC: 00        .byte $00   ; 
- D 0 - I - 0x0311DD 0C:91CD: 02        .byte $02   ; 
- D 0 - I - 0x0311DE 0C:91CE: 00        .byte $00   ; 
- D 0 - I - 0x0311DF 0C:91CF: AB        .byte $AB   ; 
- D 0 - I - 0x0311E0 0C:91D0: 93        .byte $93   ; 
- D 0 - I - 0x0311E1 0C:91D1: 03        .byte $03   ; 
- D 0 - I - 0x0311E2 0C:91D2: AA        .byte $AA   ; 
- D 0 - I - 0x0311E3 0C:91D3: 00        .byte $00   ; 
- D 0 - I - 0x0311E4 0C:91D4: 00        .byte $00   ; 
- D 0 - I - 0x0311E5 0C:91D5: 02        .byte $02   ; 
- D 0 - I - 0x0311E6 0C:91D6: 00        .byte $00   ; 
- D 0 - I - 0x0311E7 0C:91D7: A1        .byte $A1   ; 
- D 0 - I - 0x0311E8 0C:91D8: 93        .byte $93   ; 
- D 0 - I - 0x0311E9 0C:91D9: 03        .byte $03   ; 
- D 0 - I - 0x0311EA 0C:91DA: A3        .byte $A3   ; 
- D 0 - I - 0x0311EB 0C:91DB: 00        .byte $00   ; 
- D 0 - I - 0x0311EC 0C:91DC: 00        .byte $00   ; 
- D 0 - I - 0x0311ED 0C:91DD: 02        .byte $02   ; 
- D 0 - I - 0x0311EE 0C:91DE: 00        .byte $00   ; 
- D 0 - I - 0x0311EF 0C:91DF: AB        .byte $AB   ; 
- D 0 - I - 0x0311F0 0C:91E0: 93        .byte $93   ; 
- D 0 - I - 0x0311F1 0C:91E1: 03        .byte $03   ; 
- D 0 - I - 0x0311F2 0C:91E2: AA        .byte $AA   ; 
- D 0 - I - 0x0311F3 0C:91E3: 00        .byte $00   ; 
- D 0 - I - 0x0311F4 0C:91E4: 00        .byte $00   ; 
- D 0 - I - 0x0311F5 0C:91E5: 02        .byte $02   ; 
- D 0 - I - 0x0311F6 0C:91E6: 00        .byte $00   ; 
- D 0 - I - 0x0311F7 0C:91E7: A1        .byte $A1   ; 
- D 0 - I - 0x0311F8 0C:91E8: 93        .byte $93   ; 
- D 0 - I - 0x0311F9 0C:91E9: 03        .byte $03   ; 
- D 0 - I - 0x0311FA 0C:91EA: A3        .byte $A3   ; 
- D 0 - I - 0x0311FB 0C:91EB: 00        .byte $00   ; 
- D 0 - I - 0x0311FC 0C:91EC: 00        .byte $00   ; 
- D 0 - I - 0x0311FD 0C:91ED: 02        .byte $02   ; 
- D 0 - I - 0x0311FE 0C:91EE: 00        .byte $00   ; 
- D 0 - I - 0x0311FF 0C:91EF: AB        .byte $AB   ; 
- D 0 - I - 0x031200 0C:91F0: 93        .byte $93   ; 
- D 0 - I - 0x031201 0C:91F1: 03        .byte $03   ; 
- D 0 - I - 0x031202 0C:91F2: AA        .byte $AA   ; 
- D 0 - I - 0x031203 0C:91F3: 00        .byte $00   ; 
- D 0 - I - 0x031204 0C:91F4: 00        .byte $00   ; 
- D 0 - I - 0x031205 0C:91F5: 02        .byte $02   ; 
- D 0 - I - 0x031206 0C:91F6: 00        .byte $00   ; 
- D 0 - I - 0x031207 0C:91F7: A1        .byte $A1   ; 
- D 0 - I - 0x031208 0C:91F8: 93        .byte $93   ; 
- D 0 - I - 0x031209 0C:91F9: 03        .byte $03   ; 
- D 0 - I - 0x03120A 0C:91FA: A3        .byte $A3   ; 
- D 0 - I - 0x03120B 0C:91FB: 00        .byte $00   ; 
- D 0 - I - 0x03120C 0C:91FC: 00        .byte $00   ; 
- D 0 - I - 0x03120D 0C:91FD: 02        .byte $02   ; 
- D 0 - I - 0x03120E 0C:91FE: 00        .byte $00   ; 
- D 0 - I - 0x03120F 0C:91FF: AB        .byte $AB   ; 
- D 0 - I - 0x031210 0C:9200: 93        .byte $93   ; 
- D 0 - I - 0x031211 0C:9201: 03        .byte $03   ; 
- D 0 - I - 0x031212 0C:9202: AA        .byte $AA   ; 
- D 0 - I - 0x031213 0C:9203: 00        .byte $00   ; 
- D 0 - I - 0x031214 0C:9204: 00        .byte $00   ; 
- D 0 - I - 0x031215 0C:9205: 18        .byte $18   ; 
- D 0 - I - 0x031216 0C:9206: 00        .byte $00   ; 
- D 0 - I - 0x031217 0C:9207: 99        .byte $99   ; 
- D 0 - I - 0x031218 0C:9208: A8        .byte $A8   ; 
- D 0 - I - 0x031219 0C:9209: A0        .byte $A0   ; 
- D 0 - I - 0x03121A 0C:920A: A8        .byte $A8   ; 
- D 0 - I - 0x03121B 0C:920B: A0        .byte $A0   ; 
- D 0 - I - 0x03121C 0C:920C: A8        .byte $A8   ; 
- D 0 - I - 0x03121D 0C:920D: A0        .byte $A0   ; 
- D 0 - I - 0x03121E 0C:920E: A8        .byte $A8   ; 
- D 0 - I - 0x03121F 0C:920F: A0        .byte $A0   ; 
- D 0 - I - 0x031220 0C:9210: A8        .byte $A8   ; 
- D 0 - I - 0x031221 0C:9211: A0        .byte $A0   ; 
- D 0 - I - 0x031222 0C:9212: A8        .byte $A8   ; 
- D 0 - I - 0x031223 0C:9213: A0        .byte $A0   ; 
- D 0 - I - 0x031224 0C:9214: A8        .byte $A8   ; 
- D 0 - I - 0x031225 0C:9215: A0        .byte $A0   ; 
- D 0 - I - 0x031226 0C:9216: A8        .byte $A8   ; 
- D 0 - I - 0x031227 0C:9217: A0        .byte $A0   ; 
- D 0 - I - 0x031228 0C:9218: A8        .byte $A8   ; 
- D 0 - I - 0x031229 0C:9219: A0        .byte $A0   ; 
- D 0 - I - 0x03122A 0C:921A: A8        .byte $A8   ; 
- D 0 - I - 0x03122B 0C:921B: 98        .byte $98   ; 
- D 0 - I - 0x03122C 0C:921C: 00        .byte $00   ; 
- D 0 - I - 0x03122D 0C:921D: 00        .byte $00   ; 
- D 0 - I - 0x03122E 0C:921E: 98        .byte $98   ; 
- D 0 - I - 0x03122F 0C:921F: 98        .byte $98   ; 
- D 0 - I - 0x031230 0C:9220: 00        .byte $00   ; 
- D 0 - I - 0x031231 0C:9221: 94        .byte $94   ; 
- D 0 - I - 0x031232 0C:9222: 02        .byte $02   ; 
- D 0 - I - 0x031233 0C:9223: 94        .byte $94   ; 
- D 0 - I - 0x031234 0C:9224: 11        .byte $11   ; 
- D 0 - I - 0x031235 0C:9225: 94        .byte $94   ; 
- D 0 - I - 0x031236 0C:9226: 20        .byte $20   ; 
- D 0 - I - 0x031237 0C:9227: 94        .byte $94   ; 
- D 0 - I - 0x031238 0C:9228: 3B        .byte $3B   ; 
- D 0 - I - 0x031239 0C:9229: 94        .byte $94   ; 
- D 0 - I - 0x03123A 0C:922A: 47        .byte $47   ; <G>
- D 0 - I - 0x03123B 0C:922B: 94        .byte $94   ; 
- D 0 - I - 0x03123C 0C:922C: 55        .byte $55   ; <U>
- D 0 - I - 0x03123D 0C:922D: 94        .byte $94   ; 
- D 0 - I - 0x03123E 0C:922E: 65        .byte $65   ; <e>
- D 0 - I - 0x03123F 0C:922F: 94        .byte $94   ; 
- D 0 - I - 0x031240 0C:9230: 71        .byte $71   ; <q>
- D 0 - I - 0x031241 0C:9231: 94        .byte $94   ; 
- D 0 - I - 0x031242 0C:9232: 8A        .byte $8A   ; 
- D 0 - I - 0x031243 0C:9233: 94        .byte $94   ; 
- D 0 - I - 0x031244 0C:9234: 95        .byte $95   ; 
- D 0 - I - 0x031245 0C:9235: 94        .byte $94   ; 
- D 0 - I - 0x031246 0C:9236: AD        .byte $AD   ; 
- D 0 - I - 0x031247 0C:9237: 94        .byte $94   ; 
- D 0 - I - 0x031248 0C:9238: BB        .byte $BB   ; 
- D 0 - I - 0x031249 0C:9239: 94        .byte $94   ; 
- D 0 - I - 0x03124A 0C:923A: CE        .byte $CE   ; 
- D 0 - I - 0x03124B 0C:923B: 94        .byte $94   ; 
- D 0 - I - 0x03124C 0C:923C: D1        .byte $D1   ; 
- D 0 - I - 0x03124D 0C:923D: 94        .byte $94   ; 
- D 0 - I - 0x03124E 0C:923E: D9        .byte $D9   ; 
- D 0 - I - 0x03124F 0C:923F: 94        .byte $94   ; 
- D 0 - I - 0x031250 0C:9240: E4        .byte $E4   ; 
- D 0 - I - 0x031251 0C:9241: 94        .byte $94   ; 
- D 0 - I - 0x031252 0C:9242: FC        .byte $FC   ; 
- D 0 - I - 0x031253 0C:9243: 94        .byte $94   ; 
- D 0 - I - 0x031254 0C:9244: 12        .byte $12   ; 
- D 0 - I - 0x031255 0C:9245: 95        .byte $95   ; 
- D 0 - I - 0x031256 0C:9246: 27        .byte $27   ; 
- D 0 - I - 0x031257 0C:9247: 95        .byte $95   ; 
- D 0 - I - 0x031258 0C:9248: 2E        .byte $2E   ; 
- D 0 - I - 0x031259 0C:9249: 95        .byte $95   ; 
- D 0 - I - 0x03125A 0C:924A: 48        .byte $48   ; <H>
- D 0 - I - 0x03125B 0C:924B: 95        .byte $95   ; 
- D 0 - I - 0x03125C 0C:924C: 55        .byte $55   ; <U>
- D 0 - I - 0x03125D 0C:924D: 95        .byte $95   ; 
- D 0 - I - 0x03125E 0C:924E: 63        .byte $63   ; <c>
- D 0 - I - 0x03125F 0C:924F: 95        .byte $95   ; 
- D 0 - I - 0x031260 0C:9250: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031261 0C:9251: 95        .byte $95   ; 
- D 0 - I - 0x031262 0C:9252: 8B        .byte $8B   ; 
- D 0 - I - 0x031263 0C:9253: 95        .byte $95   ; 
- D 0 - I - 0x031264 0C:9254: 9A        .byte $9A   ; 
- D 0 - I - 0x031265 0C:9255: 95        .byte $95   ; 
- D 0 - I - 0x031266 0C:9256: A9        .byte $A9   ; 
- D 0 - I - 0x031267 0C:9257: 95        .byte $95   ; 
- D 0 - I - 0x031268 0C:9258: B7        .byte $B7   ; 
- D 0 - I - 0x031269 0C:9259: 95        .byte $95   ; 
- D 0 - I - 0x03126A 0C:925A: CE        .byte $CE   ; 
- D 0 - I - 0x03126B 0C:925B: 95        .byte $95   ; 
- D 0 - I - 0x03126C 0C:925C: E6        .byte $E6   ; 
- D 0 - I - 0x03126D 0C:925D: 95        .byte $95   ; 
- D 0 - I - 0x03126E 0C:925E: 08        .byte $08   ; 
- D 0 - I - 0x03126F 0C:925F: 96        .byte $96   ; 
- D 0 - I - 0x031270 0C:9260: 21        .byte $21   ; 
- D 0 - I - 0x031271 0C:9261: 96        .byte $96   ; 
- D 0 - I - 0x031272 0C:9262: 2A        .byte $2A   ; 
- D 0 - I - 0x031273 0C:9263: 96        .byte $96   ; 
- D 0 - I - 0x031274 0C:9264: 40        .byte $40   ; 
- D 0 - I - 0x031275 0C:9265: 96        .byte $96   ; 
- D 0 - I - 0x031276 0C:9266: 77        .byte $77   ; <w>
- D 0 - I - 0x031277 0C:9267: 96        .byte $96   ; 
- D 0 - I - 0x031278 0C:9268: 86        .byte $86   ; 
- D 0 - I - 0x031279 0C:9269: 96        .byte $96   ; 
- D 0 - I - 0x03127A 0C:926A: 92        .byte $92   ; 
- D 0 - I - 0x03127B 0C:926B: 96        .byte $96   ; 
- D 0 - I - 0x03127C 0C:926C: A7        .byte $A7   ; 
- D 0 - I - 0x03127D 0C:926D: 96        .byte $96   ; 
- D 0 - I - 0x03127E 0C:926E: BF        .byte $BF   ; 
- D 0 - I - 0x03127F 0C:926F: 96        .byte $96   ; 
- D 0 - I - 0x031280 0C:9270: DA        .byte $DA   ; 
- D 0 - I - 0x031281 0C:9271: 96        .byte $96   ; 
- D 0 - I - 0x031282 0C:9272: EA        .byte $EA   ; 
- D 0 - I - 0x031283 0C:9273: 96        .byte $96   ; 
- - - - - - 0x031284 0C:9274: F6        .byte $F6   ; 
- - - - - - 0x031285 0C:9275: 96        .byte $96   ; 
- - - - - - 0x031286 0C:9276: 01        .byte $01   ; 
- - - - - - 0x031287 0C:9277: 97        .byte $97   ; 
- D 0 - I - 0x031288 0C:9278: 0D        .byte $0D   ; 
- D 0 - I - 0x031289 0C:9279: 97        .byte $97   ; 
- - - - - - 0x03128A 0C:927A: 18        .byte $18   ; 
- - - - - - 0x03128B 0C:927B: 97        .byte $97   ; 
- D 0 - I - 0x03128C 0C:927C: 31        .byte $31   ; <1>
- D 0 - I - 0x03128D 0C:927D: 97        .byte $97   ; 
- D 0 - I - 0x03128E 0C:927E: 3F        .byte $3F   ; 
- D 0 - I - 0x03128F 0C:927F: 97        .byte $97   ; 
- D 0 - I - 0x031290 0C:9280: 4E        .byte $4E   ; <N>
- D 0 - I - 0x031291 0C:9281: 97        .byte $97   ; 
- D 0 - I - 0x031292 0C:9282: 5F        .byte $5F   ; 
- D 0 - I - 0x031293 0C:9283: 97        .byte $97   ; 
- D 0 - I - 0x031294 0C:9284: 97        .byte $97   ; 
- D 0 - I - 0x031295 0C:9285: 97        .byte $97   ; 
- D 0 - I - 0x031296 0C:9286: C4        .byte $C4   ; 
- D 0 - I - 0x031297 0C:9287: 97        .byte $97   ; 
- D 0 - I - 0x031298 0C:9288: D3        .byte $D3   ; 
- D 0 - I - 0x031299 0C:9289: 97        .byte $97   ; 
- D 0 - I - 0x03129A 0C:928A: E4        .byte $E4   ; 
- D 0 - I - 0x03129B 0C:928B: 97        .byte $97   ; 
- D 0 - I - 0x03129C 0C:928C: FE        .byte $FE   ; 
- D 0 - I - 0x03129D 0C:928D: 97        .byte $97   ; 
- D 0 - I - 0x03129E 0C:928E: 10        .byte $10   ; 
- D 0 - I - 0x03129F 0C:928F: 98        .byte $98   ; 
- D 0 - I - 0x0312A0 0C:9290: 33        .byte $33   ; <3>
- D 0 - I - 0x0312A1 0C:9291: 98        .byte $98   ; 
- D 0 - I - 0x0312A2 0C:9292: 43        .byte $43   ; <C>
- D 0 - I - 0x0312A3 0C:9293: 98        .byte $98   ; 
- D 0 - I - 0x0312A4 0C:9294: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0312A5 0C:9295: 98        .byte $98   ; 
- D 0 - I - 0x0312A6 0C:9296: 5C        .byte $5C   ; 
- D 0 - I - 0x0312A7 0C:9297: 98        .byte $98   ; 
- D 0 - I - 0x0312A8 0C:9298: 6C        .byte $6C   ; <l>
- D 0 - I - 0x0312A9 0C:9299: 98        .byte $98   ; 
- D 0 - I - 0x0312AA 0C:929A: 7A        .byte $7A   ; <z>
- D 0 - I - 0x0312AB 0C:929B: 98        .byte $98   ; 
- D 0 - I - 0x0312AC 0C:929C: 8E        .byte $8E   ; 
- D 0 - I - 0x0312AD 0C:929D: 98        .byte $98   ; 
- D 0 - I - 0x0312AE 0C:929E: 9B        .byte $9B   ; 
- D 0 - I - 0x0312AF 0C:929F: 98        .byte $98   ; 
- D 0 - I - 0x0312B0 0C:92A0: A4        .byte $A4   ; 
- D 0 - I - 0x0312B1 0C:92A1: 98        .byte $98   ; 
- D 0 - I - 0x0312B2 0C:92A2: B4        .byte $B4   ; 
- D 0 - I - 0x0312B3 0C:92A3: 98        .byte $98   ; 
- D 0 - I - 0x0312B4 0C:92A4: C1        .byte $C1   ; 
- D 0 - I - 0x0312B5 0C:92A5: 98        .byte $98   ; 
- D 0 - I - 0x0312B6 0C:92A6: CF        .byte $CF   ; 
- D 0 - I - 0x0312B7 0C:92A7: 98        .byte $98   ; 
- D 0 - I - 0x0312B8 0C:92A8: E7        .byte $E7   ; 
- D 0 - I - 0x0312B9 0C:92A9: 98        .byte $98   ; 
- D 0 - I - 0x0312BA 0C:92AA: F4        .byte $F4   ; 
- D 0 - I - 0x0312BB 0C:92AB: 98        .byte $98   ; 
- D 0 - I - 0x0312BC 0C:92AC: 0B        .byte $0B   ; 
- D 0 - I - 0x0312BD 0C:92AD: 99        .byte $99   ; 
- D 0 - I - 0x0312BE 0C:92AE: 17        .byte $17   ; 
- D 0 - I - 0x0312BF 0C:92AF: 99        .byte $99   ; 
- D 0 - I - 0x0312C0 0C:92B0: 21        .byte $21   ; 
- D 0 - I - 0x0312C1 0C:92B1: 99        .byte $99   ; 
- D 0 - I - 0x0312C2 0C:92B2: 2D        .byte $2D   ; 
- D 0 - I - 0x0312C3 0C:92B3: 99        .byte $99   ; 
- D 0 - I - 0x0312C4 0C:92B4: 38        .byte $38   ; <8>
- D 0 - I - 0x0312C5 0C:92B5: 99        .byte $99   ; 
- D 0 - I - 0x0312C6 0C:92B6: 4E        .byte $4E   ; <N>
- D 0 - I - 0x0312C7 0C:92B7: 99        .byte $99   ; 
- D 0 - I - 0x0312C8 0C:92B8: 63        .byte $63   ; <c>
- D 0 - I - 0x0312C9 0C:92B9: 99        .byte $99   ; 
- D 0 - I - 0x0312CA 0C:92BA: 75        .byte $75   ; <u>
- D 0 - I - 0x0312CB 0C:92BB: 99        .byte $99   ; 
- - - - - - 0x0312CC 0C:92BC: 7D        .byte $7D   ; 
- - - - - - 0x0312CD 0C:92BD: 99        .byte $99   ; 
- D 0 - I - 0x0312CE 0C:92BE: 7D        .byte $7D   ; 
- D 0 - I - 0x0312CF 0C:92BF: 99        .byte $99   ; 
- D 0 - I - 0x0312D0 0C:92C0: 8D        .byte $8D   ; 
- D 0 - I - 0x0312D1 0C:92C1: 99        .byte $99   ; 
- D 0 - I - 0x0312D2 0C:92C2: 9F        .byte $9F   ; 
- D 0 - I - 0x0312D3 0C:92C3: 99        .byte $99   ; 
- D 0 - I - 0x0312D4 0C:92C4: BB        .byte $BB   ; 
- D 0 - I - 0x0312D5 0C:92C5: 99        .byte $99   ; 
- D 0 - I - 0x0312D6 0C:92C6: D9        .byte $D9   ; 
- D 0 - I - 0x0312D7 0C:92C7: 99        .byte $99   ; 
- D 0 - I - 0x0312D8 0C:92C8: FA        .byte $FA   ; 
- D 0 - I - 0x0312D9 0C:92C9: 99        .byte $99   ; 
- D 0 - I - 0x0312DA 0C:92CA: 1C        .byte $1C   ; 
- D 0 - I - 0x0312DB 0C:92CB: 9A        .byte $9A   ; 
- D 0 - I - 0x0312DC 0C:92CC: 3D        .byte $3D   ; 
- D 0 - I - 0x0312DD 0C:92CD: 9A        .byte $9A   ; 
- D 0 - I - 0x0312DE 0C:92CE: 48        .byte $48   ; <H>
- D 0 - I - 0x0312DF 0C:92CF: 9A        .byte $9A   ; 
- D 0 - I - 0x0312E0 0C:92D0: 62        .byte $62   ; <b>
- D 0 - I - 0x0312E1 0C:92D1: 9A        .byte $9A   ; 
- D 0 - I - 0x0312E2 0C:92D2: 70        .byte $70   ; <p>
- D 0 - I - 0x0312E3 0C:92D3: 9A        .byte $9A   ; 
- D 0 - I - 0x0312E4 0C:92D4: 80        .byte $80   ; 
- D 0 - I - 0x0312E5 0C:92D5: 9A        .byte $9A   ; 
- D 0 - I - 0x0312E6 0C:92D6: 96        .byte $96   ; 
- D 0 - I - 0x0312E7 0C:92D7: 9A        .byte $9A   ; 
- D 0 - I - 0x0312E8 0C:92D8: AF        .byte $AF   ; 
- D 0 - I - 0x0312E9 0C:92D9: 9A        .byte $9A   ; 
- D 0 - I - 0x0312EA 0C:92DA: C6        .byte $C6   ; 
- D 0 - I - 0x0312EB 0C:92DB: 9A        .byte $9A   ; 
- D 0 - I - 0x0312EC 0C:92DC: D9        .byte $D9   ; 
- D 0 - I - 0x0312ED 0C:92DD: 9A        .byte $9A   ; 
- D 0 - I - 0x0312EE 0C:92DE: E9        .byte $E9   ; 
- D 0 - I - 0x0312EF 0C:92DF: 9A        .byte $9A   ; 
- D 0 - I - 0x0312F0 0C:92E0: FA        .byte $FA   ; 
- D 0 - I - 0x0312F1 0C:92E1: 9A        .byte $9A   ; 
- D 0 - I - 0x0312F2 0C:92E2: 07        .byte $07   ; 
- D 0 - I - 0x0312F3 0C:92E3: 9B        .byte $9B   ; 
- D 0 - I - 0x0312F4 0C:92E4: 17        .byte $17   ; 
- D 0 - I - 0x0312F5 0C:92E5: 9B        .byte $9B   ; 
- D 0 - I - 0x0312F6 0C:92E6: 26        .byte $26   ; 
- D 0 - I - 0x0312F7 0C:92E7: 9B        .byte $9B   ; 
- D 0 - I - 0x0312F8 0C:92E8: 36        .byte $36   ; <6>
- D 0 - I - 0x0312F9 0C:92E9: 9B        .byte $9B   ; 
- D 0 - I - 0x0312FA 0C:92EA: 47        .byte $47   ; <G>
- D 0 - I - 0x0312FB 0C:92EB: 9B        .byte $9B   ; 
- D 0 - I - 0x0312FC 0C:92EC: 60        .byte $60   ; 
- D 0 - I - 0x0312FD 0C:92ED: 9B        .byte $9B   ; 
- D 0 - I - 0x0312FE 0C:92EE: 7A        .byte $7A   ; <z>
- D 0 - I - 0x0312FF 0C:92EF: 9B        .byte $9B   ; 
- - - - - - 0x031300 0C:92F0: 88        .byte $88   ; 
- - - - - - 0x031301 0C:92F1: 9B        .byte $9B   ; 
- D 0 - I - 0x031302 0C:92F2: 92        .byte $92   ; 
- D 0 - I - 0x031303 0C:92F3: 9B        .byte $9B   ; 
- D 0 - I - 0x031304 0C:92F4: C1        .byte $C1   ; 
- D 0 - I - 0x031305 0C:92F5: 9B        .byte $9B   ; 
- D 0 - I - 0x031306 0C:92F6: CD        .byte $CD   ; 
- D 0 - I - 0x031307 0C:92F7: 9B        .byte $9B   ; 
- D 0 - I - 0x031308 0C:92F8: D7        .byte $D7   ; 
- D 0 - I - 0x031309 0C:92F9: 9B        .byte $9B   ; 
- D 0 - I - 0x03130A 0C:92FA: E3        .byte $E3   ; 
- D 0 - I - 0x03130B 0C:92FB: 9B        .byte $9B   ; 
- D 0 - I - 0x03130C 0C:92FC: 71        .byte $71   ; <q>
- D 0 - I - 0x03130D 0C:92FD: 9C        .byte $9C   ; 
- D 0 - I - 0x03130E 0C:92FE: 82        .byte $82   ; 
- D 0 - I - 0x03130F 0C:92FF: 9C        .byte $9C   ; 
- D 0 - I - 0x031310 0C:9300: 92        .byte $92   ; 
- D 0 - I - 0x031311 0C:9301: 9C        .byte $9C   ; 
- D 0 - I - 0x031312 0C:9302: AA        .byte $AA   ; 
- D 0 - I - 0x031313 0C:9303: 9C        .byte $9C   ; 
- D 0 - I - 0x031314 0C:9304: 31        .byte $31   ; <1>
- D 0 - I - 0x031315 0C:9305: 9F        .byte $9F   ; 
- D 0 - I - 0x031316 0C:9306: 42        .byte $42   ; <B>
- D 0 - I - 0x031317 0C:9307: 9F        .byte $9F   ; 
- D 0 - I - 0x031318 0C:9308: BD        .byte $BD   ; 
- D 0 - I - 0x031319 0C:9309: A3        .byte $A3   ; 
- D 0 - I - 0x03131A 0C:930A: 39        .byte $39   ; <9>
- D 0 - I - 0x03131B 0C:930B: A4        .byte $A4   ; 
- D 0 - I - 0x03131C 0C:930C: 47        .byte $47   ; <G>
- D 0 - I - 0x03131D 0C:930D: A4        .byte $A4   ; 
- D 0 - I - 0x03131E 0C:930E: 61        .byte $61   ; <a>
- D 0 - I - 0x03131F 0C:930F: A4        .byte $A4   ; 
- D 0 - I - 0x031320 0C:9310: 6C        .byte $6C   ; <l>
- D 0 - I - 0x031321 0C:9311: A4        .byte $A4   ; 
- D 0 - I - 0x031322 0C:9312: 8C        .byte $8C   ; 
- D 0 - I - 0x031323 0C:9313: A4        .byte $A4   ; 
- D 0 - I - 0x031324 0C:9314: A7        .byte $A7   ; 
- D 0 - I - 0x031325 0C:9315: A4        .byte $A4   ; 
- D 0 - I - 0x031326 0C:9316: B4        .byte $B4   ; 
- D 0 - I - 0x031327 0C:9317: A4        .byte $A4   ; 
- D 0 - I - 0x031328 0C:9318: C2        .byte $C2   ; 
- D 0 - I - 0x031329 0C:9319: A4        .byte $A4   ; 
- D 0 - I - 0x03132A 0C:931A: E2        .byte $E2   ; 
- D 0 - I - 0x03132B 0C:931B: A4        .byte $A4   ; 
- D 0 - I - 0x03132C 0C:931C: 05        .byte $05   ; 
- D 0 - I - 0x03132D 0C:931D: A5        .byte $A5   ; 
- D 0 - I - 0x03132E 0C:931E: 16        .byte $16   ; 
- D 0 - I - 0x03132F 0C:931F: A5        .byte $A5   ; 
- D 0 - I - 0x031330 0C:9320: 1E        .byte $1E   ; 
- D 0 - I - 0x031331 0C:9321: A5        .byte $A5   ; 
- D 0 - I - 0x031332 0C:9322: 49        .byte $49   ; <I>
- D 0 - I - 0x031333 0C:9323: A5        .byte $A5   ; 
- D 0 - I - 0x031334 0C:9324: 5B        .byte $5B   ; 
- D 0 - I - 0x031335 0C:9325: A5        .byte $A5   ; 
- D 0 - I - 0x031336 0C:9326: 6D        .byte $6D   ; <m>
- D 0 - I - 0x031337 0C:9327: A5        .byte $A5   ; 
- D 0 - I - 0x031338 0C:9328: 81        .byte $81   ; 
- D 0 - I - 0x031339 0C:9329: A5        .byte $A5   ; 
- D 0 - I - 0x03133A 0C:932A: 8B        .byte $8B   ; 
- D 0 - I - 0x03133B 0C:932B: A5        .byte $A5   ; 
- D 0 - I - 0x03133C 0C:932C: 97        .byte $97   ; 
- D 0 - I - 0x03133D 0C:932D: A5        .byte $A5   ; 
- D 0 - I - 0x03133E 0C:932E: A8        .byte $A8   ; 
- D 0 - I - 0x03133F 0C:932F: A5        .byte $A5   ; 
- - - - - - 0x031340 0C:9330: B4        .byte $B4   ; 
- - - - - - 0x031341 0C:9331: A5        .byte $A5   ; 
- D 0 - I - 0x031342 0C:9332: B5        .byte $B5   ; 
- D 0 - I - 0x031343 0C:9333: A5        .byte $A5   ; 
- D 0 - I - 0x031344 0C:9334: C8        .byte $C8   ; 
- D 0 - I - 0x031345 0C:9335: A5        .byte $A5   ; 
- D 0 - I - 0x031346 0C:9336: D8        .byte $D8   ; 
- D 0 - I - 0x031347 0C:9337: A5        .byte $A5   ; 
- D 0 - I - 0x031348 0C:9338: 10        .byte $10   ; 
- D 0 - I - 0x031349 0C:9339: A6        .byte $A6   ; 
- D 0 - I - 0x03134A 0C:933A: 3B        .byte $3B   ; 
- D 0 - I - 0x03134B 0C:933B: A6        .byte $A6   ; 
- D 0 - I - 0x03134C 0C:933C: 44        .byte $44   ; <D>
- D 0 - I - 0x03134D 0C:933D: A6        .byte $A6   ; 
- D 0 - I - 0x03134E 0C:933E: 51        .byte $51   ; <Q>
- D 0 - I - 0x03134F 0C:933F: A6        .byte $A6   ; 
- D 0 - I - 0x031350 0C:9340: 5D        .byte $5D   ; 
- D 0 - I - 0x031351 0C:9341: A6        .byte $A6   ; 
- D 0 - I - 0x031352 0C:9342: 69        .byte $69   ; <i>
- D 0 - I - 0x031353 0C:9343: A6        .byte $A6   ; 
- D 0 - I - 0x031354 0C:9344: 78        .byte $78   ; <x>
- D 0 - I - 0x031355 0C:9345: A6        .byte $A6   ; 
- D 0 - I - 0x031356 0C:9346: 87        .byte $87   ; 
- D 0 - I - 0x031357 0C:9347: A6        .byte $A6   ; 
- D 0 - I - 0x031358 0C:9348: 96        .byte $96   ; 
- D 0 - I - 0x031359 0C:9349: A6        .byte $A6   ; 
- D 0 - I - 0x03135A 0C:934A: A7        .byte $A7   ; 
- D 0 - I - 0x03135B 0C:934B: A6        .byte $A6   ; 
- D 0 - I - 0x03135C 0C:934C: B9        .byte $B9   ; 
- D 0 - I - 0x03135D 0C:934D: A6        .byte $A6   ; 
- D 0 - I - 0x03135E 0C:934E: EB        .byte $EB   ; 
- D 0 - I - 0x03135F 0C:934F: A6        .byte $A6   ; 
- D 0 - I - 0x031360 0C:9350: F7        .byte $F7   ; 
- D 0 - I - 0x031361 0C:9351: A6        .byte $A6   ; 
- D 0 - I - 0x031362 0C:9352: 01        .byte $01   ; 
- D 0 - I - 0x031363 0C:9353: A7        .byte $A7   ; 
- D 0 - I - 0x031364 0C:9354: 0A        .byte $0A   ; 
- D 0 - I - 0x031365 0C:9355: A7        .byte $A7   ; 
- D 0 - I - 0x031366 0C:9356: 16        .byte $16   ; 
- D 0 - I - 0x031367 0C:9357: A7        .byte $A7   ; 
- D 0 - I - 0x031368 0C:9358: 28        .byte $28   ; 
- D 0 - I - 0x031369 0C:9359: A7        .byte $A7   ; 
- D 0 - I - 0x03136A 0C:935A: 51        .byte $51   ; <Q>
- D 0 - I - 0x03136B 0C:935B: A7        .byte $A7   ; 
- D 0 - I - 0x03136C 0C:935C: 77        .byte $77   ; <w>
- D 0 - I - 0x03136D 0C:935D: A7        .byte $A7   ; 
- D 0 - I - 0x03136E 0C:935E: A0        .byte $A0   ; 
- D 0 - I - 0x03136F 0C:935F: A7        .byte $A7   ; 
- D 0 - I - 0x031370 0C:9360: B1        .byte $B1   ; 
- D 0 - I - 0x031371 0C:9361: A7        .byte $A7   ; 
- D 0 - I - 0x031372 0C:9362: CB        .byte $CB   ; 
- D 0 - I - 0x031373 0C:9363: A7        .byte $A7   ; 
- D 0 - I - 0x031374 0C:9364: D5        .byte $D5   ; 
- D 0 - I - 0x031375 0C:9365: A7        .byte $A7   ; 
- D 0 - I - 0x031376 0C:9366: E0        .byte $E0   ; 
- D 0 - I - 0x031377 0C:9367: A7        .byte $A7   ; 
- D 0 - I - 0x031378 0C:9368: ED        .byte $ED   ; 
- D 0 - I - 0x031379 0C:9369: A7        .byte $A7   ; 
- D 0 - I - 0x03137A 0C:936A: F8        .byte $F8   ; 
- D 0 - I - 0x03137B 0C:936B: A7        .byte $A7   ; 
- D 0 - I - 0x03137C 0C:936C: 04        .byte $04   ; 
- D 0 - I - 0x03137D 0C:936D: A8        .byte $A8   ; 
- - - - - - 0x03137E 0C:936E: 1B        .byte $1B   ; 
- - - - - - 0x03137F 0C:936F: A8        .byte $A8   ; 
- D 0 - I - 0x031380 0C:9370: 1B        .byte $1B   ; 
- D 0 - I - 0x031381 0C:9371: A8        .byte $A8   ; 
- D 0 - I - 0x031382 0C:9372: 23        .byte $23   ; 
- D 0 - I - 0x031383 0C:9373: A8        .byte $A8   ; 
- D 0 - I - 0x031384 0C:9374: 35        .byte $35   ; <5>
- D 0 - I - 0x031385 0C:9375: A8        .byte $A8   ; 
- D 0 - I - 0x031386 0C:9376: 43        .byte $43   ; <C>
- D 0 - I - 0x031387 0C:9377: A8        .byte $A8   ; 
- D 0 - I - 0x031388 0C:9378: 4E        .byte $4E   ; <N>
- D 0 - I - 0x031389 0C:9379: A8        .byte $A8   ; 
- D 0 - I - 0x03138A 0C:937A: 56        .byte $56   ; <V>
- D 0 - I - 0x03138B 0C:937B: A8        .byte $A8   ; 
- D 0 - I - 0x03138C 0C:937C: 65        .byte $65   ; <e>
- D 0 - I - 0x03138D 0C:937D: A8        .byte $A8   ; 
- D 0 - I - 0x03138E 0C:937E: 6F        .byte $6F   ; <o>
- D 0 - I - 0x03138F 0C:937F: A8        .byte $A8   ; 
- D 0 - I - 0x031390 0C:9380: 7A        .byte $7A   ; <z>
- D 0 - I - 0x031391 0C:9381: A8        .byte $A8   ; 
- D 0 - I - 0x031392 0C:9382: 80        .byte $80   ; 
- D 0 - I - 0x031393 0C:9383: A8        .byte $A8   ; 
- D 0 - I - 0x031394 0C:9384: 92        .byte $92   ; 
- D 0 - I - 0x031395 0C:9385: A8        .byte $A8   ; 
- D 0 - I - 0x031396 0C:9386: 9E        .byte $9E   ; 
- D 0 - I - 0x031397 0C:9387: A8        .byte $A8   ; 
- D 0 - I - 0x031398 0C:9388: B9        .byte $B9   ; 
- D 0 - I - 0x031399 0C:9389: A8        .byte $A8   ; 
- D 0 - I - 0x03139A 0C:938A: C1        .byte $C1   ; 
- D 0 - I - 0x03139B 0C:938B: A8        .byte $A8   ; 
- D 0 - I - 0x03139C 0C:938C: C9        .byte $C9   ; 
- D 0 - I - 0x03139D 0C:938D: A8        .byte $A8   ; 
- D 0 - I - 0x03139E 0C:938E: D8        .byte $D8   ; 
- D 0 - I - 0x03139F 0C:938F: A8        .byte $A8   ; 
- D 0 - I - 0x0313A0 0C:9390: E0        .byte $E0   ; 
- D 0 - I - 0x0313A1 0C:9391: A8        .byte $A8   ; 
- D 0 - I - 0x0313A2 0C:9392: E9        .byte $E9   ; 
- D 0 - I - 0x0313A3 0C:9393: A8        .byte $A8   ; 
- D 0 - I - 0x0313A4 0C:9394: 09        .byte $09   ; 
- D 0 - I - 0x0313A5 0C:9395: A9        .byte $A9   ; 
- D 0 - I - 0x0313A6 0C:9396: 13        .byte $13   ; 
- D 0 - I - 0x0313A7 0C:9397: A9        .byte $A9   ; 
- D 0 - I - 0x0313A8 0C:9398: 1F        .byte $1F   ; 
- D 0 - I - 0x0313A9 0C:9399: A9        .byte $A9   ; 
- D 0 - I - 0x0313AA 0C:939A: 27        .byte $27   ; 
- D 0 - I - 0x0313AB 0C:939B: A9        .byte $A9   ; 
- D 0 - I - 0x0313AC 0C:939C: 39        .byte $39   ; <9>
- D 0 - I - 0x0313AD 0C:939D: A9        .byte $A9   ; 
- D 0 - I - 0x0313AE 0C:939E: 49        .byte $49   ; <I>
- D 0 - I - 0x0313AF 0C:939F: A9        .byte $A9   ; 
- D 0 - I - 0x0313B0 0C:93A0: 62        .byte $62   ; <b>
- D 0 - I - 0x0313B1 0C:93A1: A9        .byte $A9   ; 
- D 0 - I - 0x0313B2 0C:93A2: 6B        .byte $6B   ; <k>
- D 0 - I - 0x0313B3 0C:93A3: A9        .byte $A9   ; 
- D 0 - I - 0x0313B4 0C:93A4: 75        .byte $75   ; <u>
- D 0 - I - 0x0313B5 0C:93A5: A9        .byte $A9   ; 
- D 0 - I - 0x0313B6 0C:93A6: 7C        .byte $7C   ; 
- D 0 - I - 0x0313B7 0C:93A7: A9        .byte $A9   ; 
- D 0 - I - 0x0313B8 0C:93A8: 89        .byte $89   ; 
- D 0 - I - 0x0313B9 0C:93A9: A9        .byte $A9   ; 
- D 0 - I - 0x0313BA 0C:93AA: 91        .byte $91   ; 
- D 0 - I - 0x0313BB 0C:93AB: A9        .byte $A9   ; 
- D 0 - I - 0x0313BC 0C:93AC: 9F        .byte $9F   ; 
- D 0 - I - 0x0313BD 0C:93AD: A9        .byte $A9   ; 
- D 0 - I - 0x0313BE 0C:93AE: A9        .byte $A9   ; 
- D 0 - I - 0x0313BF 0C:93AF: A9        .byte $A9   ; 
- D 0 - I - 0x0313C0 0C:93B0: B0        .byte $B0   ; 
- D 0 - I - 0x0313C1 0C:93B1: A9        .byte $A9   ; 
- D 0 - I - 0x0313C2 0C:93B2: C9        .byte $C9   ; 
- D 0 - I - 0x0313C3 0C:93B3: A9        .byte $A9   ; 
- D 0 - I - 0x0313C4 0C:93B4: D1        .byte $D1   ; 
- D 0 - I - 0x0313C5 0C:93B5: A9        .byte $A9   ; 
- D 0 - I - 0x0313C6 0C:93B6: DE        .byte $DE   ; 
- D 0 - I - 0x0313C7 0C:93B7: A9        .byte $A9   ; 
- D 0 - I - 0x0313C8 0C:93B8: E8        .byte $E8   ; 
- D 0 - I - 0x0313C9 0C:93B9: A9        .byte $A9   ; 
- D 0 - I - 0x0313CA 0C:93BA: 0F        .byte $0F   ; 
- D 0 - I - 0x0313CB 0C:93BB: AA        .byte $AA   ; 
- D 0 - I - 0x0313CC 0C:93BC: 1B        .byte $1B   ; 
- D 0 - I - 0x0313CD 0C:93BD: AA        .byte $AA   ; 
- D 0 - I - 0x0313CE 0C:93BE: 24        .byte $24   ; 
- D 0 - I - 0x0313CF 0C:93BF: AA        .byte $AA   ; 
- D 0 - I - 0x0313D0 0C:93C0: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x0313D1 0C:93C1: AA        .byte $AA   ; 
- D 0 - I - 0x0313D2 0C:93C2: 68        .byte $68   ; <h>
- D 0 - I - 0x0313D3 0C:93C3: AA        .byte $AA   ; 
- D 0 - I - 0x0313D4 0C:93C4: 70        .byte $70   ; <p>
- D 0 - I - 0x0313D5 0C:93C5: AA        .byte $AA   ; 
- D 0 - I - 0x0313D6 0C:93C6: A5        .byte $A5   ; 
- D 0 - I - 0x0313D7 0C:93C7: AA        .byte $AA   ; 
- D 0 - I - 0x0313D8 0C:93C8: B2        .byte $B2   ; 
- D 0 - I - 0x0313D9 0C:93C9: AA        .byte $AA   ; 
- D 0 - I - 0x0313DA 0C:93CA: BD        .byte $BD   ; 
- D 0 - I - 0x0313DB 0C:93CB: AA        .byte $AA   ; 
- D 0 - I - 0x0313DC 0C:93CC: D5        .byte $D5   ; 
- D 0 - I - 0x0313DD 0C:93CD: AA        .byte $AA   ; 
- D 0 - I - 0x0313DE 0C:93CE: 04        .byte $04   ; 
- D 0 - I - 0x0313DF 0C:93CF: AB        .byte $AB   ; 
- D 0 - I - 0x0313E0 0C:93D0: 0E        .byte $0E   ; 
- D 0 - I - 0x0313E1 0C:93D1: AB        .byte $AB   ; 
- D 0 - I - 0x0313E2 0C:93D2: 25        .byte $25   ; 
- D 0 - I - 0x0313E3 0C:93D3: AB        .byte $AB   ; 
- D 0 - I - 0x0313E4 0C:93D4: 3E        .byte $3E   ; 
- D 0 - I - 0x0313E5 0C:93D5: AB        .byte $AB   ; 
- D 0 - I - 0x0313E6 0C:93D6: 4B        .byte $4B   ; <K>
- D 0 - I - 0x0313E7 0C:93D7: AB        .byte $AB   ; 
- - - - - - 0x0313E8 0C:93D8: 66        .byte $66   ; <f>
- - - - - - 0x0313E9 0C:93D9: AB        .byte $AB   ; 
- D 0 - I - 0x0313EA 0C:93DA: 66        .byte $66   ; <f>
- D 0 - I - 0x0313EB 0C:93DB: AB        .byte $AB   ; 
- D 0 - I - 0x0313EC 0C:93DC: 95        .byte $95   ; 
- D 0 - I - 0x0313ED 0C:93DD: AB        .byte $AB   ; 
- - - - - - 0x0313EE 0C:93DE: A0        .byte $A0   ; 
- - - - - - 0x0313EF 0C:93DF: AB        .byte $AB   ; 
- D 0 - I - 0x0313F0 0C:93E0: A0        .byte $A0   ; 
- D 0 - I - 0x0313F1 0C:93E1: AB        .byte $AB   ; 
- D 0 - I - 0x0313F2 0C:93E2: AC        .byte $AC   ; 
- D 0 - I - 0x0313F3 0C:93E3: AB        .byte $AB   ; 
- - - - - - 0x0313F4 0C:93E4: B8        .byte $B8   ; 
- - - - - - 0x0313F5 0C:93E5: AB        .byte $AB   ; 
- D 0 - I - 0x0313F6 0C:93E6: F0        .byte $F0   ; 
- D 0 - I - 0x0313F7 0C:93E7: AB        .byte $AB   ; 
- D 0 - I - 0x0313F8 0C:93E8: 0B        .byte $0B   ; 
- D 0 - I - 0x0313F9 0C:93E9: AC        .byte $AC   ; 
- D 0 - I - 0x0313FA 0C:93EA: 2D        .byte $2D   ; 
- D 0 - I - 0x0313FB 0C:93EB: AC        .byte $AC   ; 
- D 0 - I - 0x0313FC 0C:93EC: 38        .byte $38   ; <8>
- D 0 - I - 0x0313FD 0C:93ED: AC        .byte $AC   ; 
- D 0 - I - 0x0313FE 0C:93EE: 4A        .byte $4A   ; <J>
- D 0 - I - 0x0313FF 0C:93EF: AC        .byte $AC   ; 
- D 0 - I - 0x031400 0C:93F0: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x031401 0C:93F1: AC        .byte $AC   ; 
- D 0 - I - 0x031402 0C:93F2: 6A        .byte $6A   ; <j>
- D 0 - I - 0x031403 0C:93F3: AC        .byte $AC   ; 
- D 0 - I - 0x031404 0C:93F4: 7D        .byte $7D   ; 
- D 0 - I - 0x031405 0C:93F5: AC        .byte $AC   ; 
- D 0 - I - 0x031406 0C:93F6: A8        .byte $A8   ; 
- D 0 - I - 0x031407 0C:93F7: AC        .byte $AC   ; 
- D 0 - I - 0x031408 0C:93F8: BB        .byte $BB   ; 
- D 0 - I - 0x031409 0C:93F9: AC        .byte $AC   ; 
- D 0 - I - 0x03140A 0C:93FA: C5        .byte $C5   ; 
- D 0 - I - 0x03140B 0C:93FB: AC        .byte $AC   ; 
- D 0 - I - 0x03140C 0C:93FC: E0        .byte $E0   ; 
- D 0 - I - 0x03140D 0C:93FD: AC        .byte $AC   ; 
- D 0 - I - 0x03140E 0C:93FE: 02        .byte $02   ; 
- D 0 - I - 0x03140F 0C:93FF: AD        .byte $AD   ; 
- D 0 - I - 0x031410 0C:9400: F2        .byte $F2   ; 
- D 0 - I - 0x031411 0C:9401: F0        .byte $F0   ; 
- D 0 - I - 0x031412 0C:9402: 01        .byte $01   ; 
- D 0 - I - 0x031413 0C:9403: 52        .byte $52   ; <R>
- D 0 - I - 0x031414 0C:9404: ED        .byte $ED   ; 
- D 0 - I - 0x031415 0C:9405: FC        .byte $FC   ; 
- - - - - - 0x031416 0C:9406: 01        .byte $01   ; 
- D 0 - I - 0x031417 0C:9407: 1C        .byte $1C   ; 
- D 0 - I - 0x031418 0C:9408: 2F        .byte $2F   ; 
- D 0 - I - 0x031419 0C:9409: 14        .byte $14   ; 
- D 0 - I - 0x03141A 0C:940A: AF        .byte $AF   ; 
- D 0 - I - 0x03141B 0C:940B: 0B        .byte $0B   ; 
- D 0 - I - 0x03141C 0C:940C: 2A        .byte $2A   ; 
- D 0 - I - 0x03141D 0C:940D: 10        .byte $10   ; 
- D 0 - I - 0x03141E 0C:940E: 79        .byte $79   ; <y>
- D 0 - I - 0x03141F 0C:940F: FC        .byte $FC   ; 
- D 0 - I - 0x031420 0C:9410: F0        .byte $F0   ; 
- D 0 - I - 0x031421 0C:9411: 01        .byte $01   ; 
- D 0 - I - 0x031422 0C:9412: 52        .byte $52   ; <R>
- D 0 - I - 0x031423 0C:9413: EE        .byte $EE   ; 
- D 0 - I - 0x031424 0C:9414: FC        .byte $FC   ; 
- - - - - - 0x031425 0C:9415: 01        .byte $01   ; 
- D 0 - I - 0x031426 0C:9416: 1C        .byte $1C   ; 
- D 0 - I - 0x031427 0C:9417: 2F        .byte $2F   ; 
- D 0 - I - 0x031428 0C:9418: 14        .byte $14   ; 
- D 0 - I - 0x031429 0C:9419: AF        .byte $AF   ; 
- D 0 - I - 0x03142A 0C:941A: 0B        .byte $0B   ; 
- D 0 - I - 0x03142B 0C:941B: 2A        .byte $2A   ; 
- D 0 - I - 0x03142C 0C:941C: 10        .byte $10   ; 
- D 0 - I - 0x03142D 0C:941D: 79        .byte $79   ; <y>
- D 0 - I - 0x03142E 0C:941E: FC        .byte $FC   ; 
- D 0 - I - 0x03142F 0C:941F: F0        .byte $F0   ; 
- D 0 - I - 0x031430 0C:9420: 01        .byte $01   ; 
- D 0 - I - 0x031431 0C:9421: 71        .byte $71   ; <q>
- D 0 - I - 0x031432 0C:9422: E4        .byte $E4   ; 
- D 0 - I - 0x031433 0C:9423: FC        .byte $FC   ; 
- - - - - - 0x031434 0C:9424: 01        .byte $01   ; 
- D 0 - I - 0x031435 0C:9425: 1C        .byte $1C   ; 
- D 0 - I - 0x031436 0C:9426: 2F        .byte $2F   ; 
- D 0 - I - 0x031437 0C:9427: 14        .byte $14   ; 
- D 0 - I - 0x031438 0C:9428: AF        .byte $AF   ; 
- D 0 - I - 0x031439 0C:9429: 0B        .byte $0B   ; 
- D 0 - I - 0x03143A 0C:942A: 2A        .byte $2A   ; 
- D 0 - I - 0x03143B 0C:942B: 10        .byte $10   ; 
- D 0 - I - 0x03143C 0C:942C: 79        .byte $79   ; <y>
- D 0 - I - 0x03143D 0C:942D: FC        .byte $FC   ; 
- - - - - - 0x03143E 0C:942E: 01        .byte $01   ; 
- D 0 - I - 0x03143F 0C:942F: EE        .byte $EE   ; 
- D 0 - I - 0x031440 0C:9430: FC        .byte $FC   ; 
- - - - - - 0x031441 0C:9431: 01        .byte $01   ; 
- D 0 - I - 0x031442 0C:9432: F5        .byte $F5   ; 
- D 0 - I - 0x031443 0C:9433: 2D        .byte $2D   ; 
- D 0 - I - 0x031444 0C:9434: 00        .byte $00   ; 
- D 0 - I - 0x031445 0C:9435: 14        .byte $14   ; 
- D 0 - I - 0x031446 0C:9436: 2F        .byte $2F   ; 
- D 0 - I - 0x031447 0C:9437: 10        .byte $10   ; 
- D 0 - I - 0x031448 0C:9438: 79        .byte $79   ; <y>
- D 0 - I - 0x031449 0C:9439: FC        .byte $FC   ; 
- D 0 - I - 0x03144A 0C:943A: F0        .byte $F0   ; 
- D 0 - I - 0x03144B 0C:943B: 01        .byte $01   ; 
- D 0 - I - 0x03144C 0C:943C: 52        .byte $52   ; <R>
- D 0 - I - 0x03144D 0C:943D: E4        .byte $E4   ; 
- D 0 - I - 0x03144E 0C:943E: 10        .byte $10   ; 
- D 0 - I - 0x03144F 0C:943F: 11        .byte $11   ; 
- D 0 - I - 0x031450 0C:9440: 19        .byte $19   ; 
- D 0 - I - 0x031451 0C:9441: FC        .byte $FC   ; 
- - - - - - 0x031452 0C:9442: 01        .byte $01   ; 
- D 0 - I - 0x031453 0C:9443: E0        .byte $E0   ; 
- D 0 - I - 0x031454 0C:9444: 79        .byte $79   ; <y>
- D 0 - I - 0x031455 0C:9445: FC        .byte $FC   ; 
- D 0 - I - 0x031456 0C:9446: F0        .byte $F0   ; 
- D 0 - I - 0x031457 0C:9447: 01        .byte $01   ; 
- D 0 - I - 0x031458 0C:9448: 51        .byte $51   ; <Q>
- D 0 - I - 0x031459 0C:9449: EE        .byte $EE   ; 
- D 0 - I - 0x03145A 0C:944A: FC        .byte $FC   ; 
- - - - - - 0x03145B 0C:944B: 01        .byte $01   ; 
- D 0 - I - 0x03145C 0C:944C: F5        .byte $F5   ; 
- D 0 - I - 0x03145D 0C:944D: 2D        .byte $2D   ; 
- D 0 - I - 0x03145E 0C:944E: 00        .byte $00   ; 
- D 0 - I - 0x03145F 0C:944F: 14        .byte $14   ; 
- D 0 - I - 0x031460 0C:9450: 2F        .byte $2F   ; 
- D 0 - I - 0x031461 0C:9451: 10        .byte $10   ; 
- D 0 - I - 0x031462 0C:9452: 79        .byte $79   ; <y>
- D 0 - I - 0x031463 0C:9453: FC        .byte $FC   ; 
- D 0 - I - 0x031464 0C:9454: F0        .byte $F0   ; 
- D 0 - I - 0x031465 0C:9455: 01        .byte $01   ; 
- D 0 - I - 0x031466 0C:9456: 52        .byte $52   ; <R>
- D 0 - I - 0x031467 0C:9457: ED        .byte $ED   ; 
- D 0 - I - 0x031468 0C:9458: A0        .byte $A0   ; 
- D 0 - I - 0x031469 0C:9459: FC        .byte $FC   ; 
- - - - - - 0x03146A 0C:945A: 01        .byte $01   ; 
- D 0 - I - 0x03146B 0C:945B: 21        .byte $21   ; 
- D 0 - I - 0x03146C 0C:945C: 06        .byte $06   ; 
- D 0 - I - 0x03146D 0C:945D: 2F        .byte $2F   ; 
- D 0 - I - 0x03146E 0C:945E: 13        .byte $13   ; 
- D 0 - I - 0x03146F 0C:945F: 02        .byte $02   ; 
- D 0 - I - 0x031470 0C:9460: 2F        .byte $2F   ; 
- D 0 - I - 0x031471 0C:9461: 10        .byte $10   ; 
- D 0 - I - 0x031472 0C:9462: 79        .byte $79   ; <y>
- D 0 - I - 0x031473 0C:9463: FC        .byte $FC   ; 
- D 0 - I - 0x031474 0C:9464: F0        .byte $F0   ; 
- D 0 - I - 0x031475 0C:9465: 01        .byte $01   ; 
- D 0 - I - 0x031476 0C:9466: 40        .byte $40   ; 
- D 0 - I - 0x031477 0C:9467: AA        .byte $AA   ; 
- D 0 - I - 0x031478 0C:9468: A0        .byte $A0   ; 
- D 0 - I - 0x031479 0C:9469: 00        .byte $00   ; 
- D 0 - I - 0x03147A 0C:946A: 14        .byte $14   ; 
- D 0 - I - 0x03147B 0C:946B: AE        .byte $AE   ; 
- D 0 - I - 0x03147C 0C:946C: 06        .byte $06   ; 
- D 0 - I - 0x03147D 0C:946D: 15        .byte $15   ; 
- D 0 - I - 0x03147E 0C:946E: 02        .byte $02   ; 
- D 0 - I - 0x03147F 0C:946F: FC        .byte $FC   ; 
- D 0 - I - 0x031480 0C:9470: F0        .byte $F0   ; 
- D 0 - I - 0x031481 0C:9471: 01        .byte $01   ; 
- D 0 - I - 0x031482 0C:9472: 11        .byte $11   ; 
- D 0 - I - 0x031483 0C:9473: EE        .byte $EE   ; 
- D 0 - I - 0x031484 0C:9474: 16        .byte $16   ; 
- D 0 - I - 0x031485 0C:9475: 00        .byte $00   ; 
- D 0 - I - 0x031486 0C:9476: 01        .byte $01   ; 
- D 0 - I - 0x031487 0C:9477: 10        .byte $10   ; 
- D 0 - I - 0x031488 0C:9478: 2F        .byte $2F   ; 
- D 0 - I - 0x031489 0C:9479: 13        .byte $13   ; 
- D 0 - I - 0x03148A 0C:947A: FC        .byte $FC   ; 
- - - - - - 0x03148B 0C:947B: 08        .byte $08   ; 
- D 0 - I - 0x03148C 0C:947C: 02        .byte $02   ; 
- D 0 - I - 0x03148D 0C:947D: 07        .byte $07   ; 
- D 0 - I - 0x03148E 0C:947E: 05        .byte $05   ; 
- D 0 - I - 0x03148F 0C:947F: 02        .byte $02   ; 
- D 0 - I - 0x031490 0C:9480: 1A        .byte $1A   ; 
- D 0 - I - 0x031491 0C:9481: 00        .byte $00   ; 
- D 0 - I - 0x031492 0C:9482: 26        .byte $26   ; 
- D 0 - I - 0x031493 0C:9483: 2C        .byte $2C   ; 
- D 0 - I - 0x031494 0C:9484: 1F        .byte $1F   ; 
- D 0 - I - 0x031495 0C:9485: 2F        .byte $2F   ; 
- D 0 - I - 0x031496 0C:9486: 10        .byte $10   ; 
- D 0 - I - 0x031497 0C:9487: 79        .byte $79   ; <y>
- D 0 - I - 0x031498 0C:9488: FC        .byte $FC   ; 
- D 0 - I - 0x031499 0C:9489: F0        .byte $F0   ; 
- D 0 - I - 0x03149A 0C:948A: 01        .byte $01   ; 
- D 0 - I - 0x03149B 0C:948B: 01        .byte $01   ; 
- D 0 - I - 0x03149C 0C:948C: EE        .byte $EE   ; 
- D 0 - I - 0x03149D 0C:948D: 16        .byte $16   ; 
- D 0 - I - 0x03149E 0C:948E: 00        .byte $00   ; 
- D 0 - I - 0x03149F 0C:948F: 01        .byte $01   ; 
- D 0 - I - 0x0314A0 0C:9490: 10        .byte $10   ; 
- D 0 - I - 0x0314A1 0C:9491: 2F        .byte $2F   ; 
- D 0 - I - 0x0314A2 0C:9492: 13        .byte $13   ; 
- D 0 - I - 0x0314A3 0C:9493: FC        .byte $FC   ; 
- D 0 - I - 0x0314A4 0C:9494: F0        .byte $F0   ; 
- D 0 - I - 0x0314A5 0C:9495: 01        .byte $01   ; 
- D 0 - I - 0x0314A6 0C:9496: 20        .byte $20   ; 
- D 0 - I - 0x0314A7 0C:9497: E4        .byte $E4   ; 
- D 0 - I - 0x0314A8 0C:9498: FC        .byte $FC   ; 
- - - - - - 0x0314A9 0C:9499: 01        .byte $01   ; 
- D 0 - I - 0x0314AA 0C:949A: 10        .byte $10   ; 
- D 0 - I - 0x0314AB 0C:949B: 06        .byte $06   ; 
- D 0 - I - 0x0314AC 0C:949C: 02        .byte $02   ; 
- D 0 - I - 0x0314AD 0C:949D: F5        .byte $F5   ; 
- D 0 - I - 0x0314AE 0C:949E: 16        .byte $16   ; 
- D 0 - I - 0x0314AF 0C:949F: FC        .byte $FC   ; 
- - - - - - 0x0314B0 0C:94A0: 01        .byte $01   ; 
- D 0 - I - 0x0314B1 0C:94A1: 03        .byte $03   ; 
- D 0 - I - 0x0314B2 0C:94A2: A4        .byte $A4   ; 
- D 0 - I - 0x0314B3 0C:94A3: 07        .byte $07   ; 
- D 0 - I - 0x0314B4 0C:94A4: 2D        .byte $2D   ; 
- D 0 - I - 0x0314B5 0C:94A5: 00        .byte $00   ; 
- D 0 - I - 0x0314B6 0C:94A6: 01        .byte $01   ; 
- D 0 - I - 0x0314B7 0C:94A7: 2C        .byte $2C   ; 
- D 0 - I - 0x0314B8 0C:94A8: 0E        .byte $0E   ; 
- D 0 - I - 0x0314B9 0C:94A9: 29        .byte $29   ; 
- D 0 - I - 0x0314BA 0C:94AA: 79        .byte $79   ; <y>
- D 0 - I - 0x0314BB 0C:94AB: FC        .byte $FC   ; 
- D 0 - I - 0x0314BC 0C:94AC: F0        .byte $F0   ; 
- D 0 - I - 0x0314BD 0C:94AD: 01        .byte $01   ; 
- D 0 - I - 0x0314BE 0C:94AE: 51        .byte $51   ; <Q>
- D 0 - I - 0x0314BF 0C:94AF: ED        .byte $ED   ; 
- D 0 - I - 0x0314C0 0C:94B0: FC        .byte $FC   ; 
- - - - - - 0x0314C1 0C:94B1: 08        .byte $08   ; 
- D 0 - I - 0x0314C2 0C:94B2: F5        .byte $F5   ; 
- D 0 - I - 0x0314C3 0C:94B3: 2D        .byte $2D   ; 
- D 0 - I - 0x0314C4 0C:94B4: 00        .byte $00   ; 
- D 0 - I - 0x0314C5 0C:94B5: 14        .byte $14   ; 
- D 0 - I - 0x0314C6 0C:94B6: 2F        .byte $2F   ; 
- D 0 - I - 0x0314C7 0C:94B7: 10        .byte $10   ; 
- D 0 - I - 0x0314C8 0C:94B8: 79        .byte $79   ; <y>
- D 0 - I - 0x0314C9 0C:94B9: FC        .byte $FC   ; 
- D 0 - I - 0x0314CA 0C:94BA: F0        .byte $F0   ; 
- D 0 - I - 0x0314CB 0C:94BB: 01        .byte $01   ; 
- D 0 - I - 0x0314CC 0C:94BC: 21        .byte $21   ; 
- D 0 - I - 0x0314CD 0C:94BD: ED        .byte $ED   ; 
- D 0 - I - 0x0314CE 0C:94BE: FC        .byte $FC   ; 
- - - - - - 0x0314CF 0C:94BF: 01        .byte $01   ; 
- D 0 - I - 0x0314D0 0C:94C0: EC        .byte $EC   ; 
- D 0 - I - 0x0314D1 0C:94C1: FC        .byte $FC   ; 
- - - - - - 0x0314D2 0C:94C2: 08        .byte $08   ; 
- D 0 - I - 0x0314D3 0C:94C3: AA        .byte $AA   ; 
- D 0 - I - 0x0314D4 0C:94C4: A0        .byte $A0   ; 
- D 0 - I - 0x0314D5 0C:94C5: 00        .byte $00   ; 
- D 0 - I - 0x0314D6 0C:94C6: 14        .byte $14   ; 
- D 0 - I - 0x0314D7 0C:94C7: AE        .byte $AE   ; 
- D 0 - I - 0x0314D8 0C:94C8: 06        .byte $06   ; 
- D 0 - I - 0x0314D9 0C:94C9: 15        .byte $15   ; 
- D 0 - I - 0x0314DA 0C:94CA: 02        .byte $02   ; 
- D 0 - I - 0x0314DB 0C:94CB: 79        .byte $79   ; <y>
- D 0 - I - 0x0314DC 0C:94CC: FC        .byte $FC   ; 
- D 0 - I - 0x0314DD 0C:94CD: F0        .byte $F0   ; 
- D 0 - I - 0x0314DE 0C:94CE: F5        .byte $F5   ; 
- D 0 - I - 0x0314DF 0C:94CF: 02        .byte $02   ; 
- D 0 - I - 0x0314E0 0C:94D0: F0        .byte $F0   ; 
- D 0 - I - 0x0314E1 0C:94D1: 01        .byte $01   ; 
- D 0 - I - 0x0314E2 0C:94D2: 11        .byte $11   ; 
- D 0 - I - 0x0314E3 0C:94D3: ED        .byte $ED   ; 
- D 0 - I - 0x0314E4 0C:94D4: FC        .byte $FC   ; 
- - - - - - 0x0314E5 0C:94D5: 01        .byte $01   ; 
- D 0 - I - 0x0314E6 0C:94D6: EC        .byte $EC   ; 
- D 0 - I - 0x0314E7 0C:94D7: FC        .byte $FC   ; 
- D 0 - I - 0x0314E8 0C:94D8: F0        .byte $F0   ; 
- D 0 - I - 0x0314E9 0C:94D9: 01        .byte $01   ; 
- D 0 - I - 0x0314EA 0C:94DA: 52        .byte $52   ; <R>
- D 0 - I - 0x0314EB 0C:94DB: EE        .byte $EE   ; 
- D 0 - I - 0x0314EC 0C:94DC: FC        .byte $FC   ; 
- - - - - - 0x0314ED 0C:94DD: 01        .byte $01   ; 
- D 0 - I - 0x0314EE 0C:94DE: 46        .byte $46   ; <F>
- D 0 - I - 0x0314EF 0C:94DF: C3        .byte $C3   ; 
- D 0 - I - 0x0314F0 0C:94E0: 7D        .byte $7D   ; 
- D 0 - I - 0x0314F1 0C:94E1: 79        .byte $79   ; <y>
- D 0 - I - 0x0314F2 0C:94E2: FC        .byte $FC   ; 
- D 0 - I - 0x0314F3 0C:94E3: F0        .byte $F0   ; 
- D 0 - I - 0x0314F4 0C:94E4: 01        .byte $01   ; 
- D 0 - I - 0x0314F5 0C:94E5: 20        .byte $20   ; 
- D 0 - I - 0x0314F6 0C:94E6: E4        .byte $E4   ; 
- D 0 - I - 0x0314F7 0C:94E7: FC        .byte $FC   ; 
- - - - - - 0x0314F8 0C:94E8: 01        .byte $01   ; 
- D 0 - I - 0x0314F9 0C:94E9: 1B        .byte $1B   ; 
- D 0 - I - 0x0314FA 0C:94EA: 08        .byte $08   ; 
- D 0 - I - 0x0314FB 0C:94EB: 02        .byte $02   ; 
- D 0 - I - 0x0314FC 0C:94EC: F5        .byte $F5   ; 
- D 0 - I - 0x0314FD 0C:94ED: 16        .byte $16   ; 
- D 0 - I - 0x0314FE 0C:94EE: FC        .byte $FC   ; 
- - - - - - 0x0314FF 0C:94EF: 01        .byte $01   ; 
- D 0 - I - 0x031500 0C:94F0: 03        .byte $03   ; 
- D 0 - I - 0x031501 0C:94F1: A4        .byte $A4   ; 
- D 0 - I - 0x031502 0C:94F2: 07        .byte $07   ; 
- D 0 - I - 0x031503 0C:94F3: 2D        .byte $2D   ; 
- D 0 - I - 0x031504 0C:94F4: 00        .byte $00   ; 
- D 0 - I - 0x031505 0C:94F5: 01        .byte $01   ; 
- D 0 - I - 0x031506 0C:94F6: 2C        .byte $2C   ; 
- D 0 - I - 0x031507 0C:94F7: 0E        .byte $0E   ; 
- D 0 - I - 0x031508 0C:94F8: 29        .byte $29   ; 
- D 0 - I - 0x031509 0C:94F9: 79        .byte $79   ; <y>
- D 0 - I - 0x03150A 0C:94FA: FC        .byte $FC   ; 
- D 0 - I - 0x03150B 0C:94FB: F0        .byte $F0   ; 
- D 0 - I - 0x03150C 0C:94FC: 01        .byte $01   ; 
- D 0 - I - 0x03150D 0C:94FD: 62        .byte $62   ; <b>
- D 0 - I - 0x03150E 0C:94FE: EE        .byte $EE   ; 
- D 0 - I - 0x03150F 0C:94FF: FC        .byte $FC   ; 
- - - - - - 0x031510 0C:9500: 01        .byte $01   ; 
- D 0 - I - 0x031511 0C:9501: 46        .byte $46   ; <F>
- D 0 - I - 0x031512 0C:9502: C3        .byte $C3   ; 
- D 0 - I - 0x031513 0C:9503: 7D        .byte $7D   ; 
- D 0 - I - 0x031514 0C:9504: 79        .byte $79   ; <y>
- D 0 - I - 0x031515 0C:9505: FC        .byte $FC   ; 
- - - - - - 0x031516 0C:9506: 08        .byte $08   ; 
- D 0 - I - 0x031517 0C:9507: AA        .byte $AA   ; 
- D 0 - I - 0x031518 0C:9508: A0        .byte $A0   ; 
- D 0 - I - 0x031519 0C:9509: 00        .byte $00   ; 
- D 0 - I - 0x03151A 0C:950A: 14        .byte $14   ; 
- D 0 - I - 0x03151B 0C:950B: AE        .byte $AE   ; 
- D 0 - I - 0x03151C 0C:950C: 06        .byte $06   ; 
- D 0 - I - 0x03151D 0C:950D: 15        .byte $15   ; 
- D 0 - I - 0x03151E 0C:950E: 02        .byte $02   ; 
- D 0 - I - 0x03151F 0C:950F: 79        .byte $79   ; <y>
- D 0 - I - 0x031520 0C:9510: FC        .byte $FC   ; 
- D 0 - I - 0x031521 0C:9511: F0        .byte $F0   ; 
- D 0 - I - 0x031522 0C:9512: 01        .byte $01   ; 
- D 0 - I - 0x031523 0C:9513: 5C        .byte $5C   ; 
- D 0 - I - 0x031524 0C:9514: AD        .byte $AD   ; 
- D 0 - I - 0x031525 0C:9515: 10        .byte $10   ; 
- D 0 - I - 0x031526 0C:9516: 2F        .byte $2F   ; 
- D 0 - I - 0x031527 0C:9517: 79        .byte $79   ; <y>
- D 0 - I - 0x031528 0C:9518: ED        .byte $ED   ; 
- D 0 - I - 0x031529 0C:9519: 19        .byte $19   ; 
- D 0 - I - 0x03152A 0C:951A: FC        .byte $FC   ; 
- - - - - - 0x03152B 0C:951B: 01        .byte $01   ; 
- D 0 - I - 0x03152C 0C:951C: 6B        .byte $6B   ; <k>
- D 0 - I - 0x03152D 0C:951D: 7D        .byte $7D   ; 
- D 0 - I - 0x03152E 0C:951E: 68        .byte $68   ; <h>
- D 0 - I - 0x03152F 0C:951F: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031530 0C:9520: B6        .byte $B6   ; 
- D 0 - I - 0x031531 0C:9521: 4E        .byte $4E   ; <N>
- D 0 - I - 0x031532 0C:9522: 7D        .byte $7D   ; 
- D 0 - I - 0x031533 0C:9523: C5        .byte $C5   ; 
- D 0 - I - 0x031534 0C:9524: 79        .byte $79   ; <y>
- D 0 - I - 0x031535 0C:9525: FC        .byte $FC   ; 
- D 0 - I - 0x031536 0C:9526: F0        .byte $F0   ; 
- D 0 - I - 0x031537 0C:9527: 01        .byte $01   ; 
- D 0 - I - 0x031538 0C:9528: C0        .byte $C0   ; 
- D 0 - I - 0x031539 0C:9529: 26        .byte $26   ; 
- D 0 - I - 0x03153A 0C:952A: 0C        .byte $0C   ; 
- D 0 - I - 0x03153B 0C:952B: 79        .byte $79   ; <y>
- D 0 - I - 0x03153C 0C:952C: FC        .byte $FC   ; 
- D 0 - I - 0x03153D 0C:952D: F0        .byte $F0   ; 
- D 0 - I - 0x03153E 0C:952E: 04        .byte $04   ; 
- D 0 - I - 0x03153F 0C:952F: 62        .byte $62   ; <b>
- D 0 - I - 0x031540 0C:9530: 0F        .byte $0F   ; 
- D 0 - I - 0x031541 0C:9531: 19        .byte $19   ; 
- D 0 - I - 0x031542 0C:9532: 00        .byte $00   ; 
- D 0 - I - 0x031543 0C:9533: 0A        .byte $0A   ; 
- D 0 - I - 0x031544 0C:9534: B3        .byte $B3   ; 
- D 0 - I - 0x031545 0C:9535: 2A        .byte $2A   ; 
- D 0 - I - 0x031546 0C:9536: BE        .byte $BE   ; 
- D 0 - I - 0x031547 0C:9537: 5F        .byte $5F   ; 
- D 0 - I - 0x031548 0C:9538: 2D        .byte $2D   ; 
- D 0 - I - 0x031549 0C:9539: FC        .byte $FC   ; 
- - - - - - 0x03154A 0C:953A: 04        .byte $04   ; 
- D 0 - I - 0x03154B 0C:953B: E4        .byte $E4   ; 
- D 0 - I - 0x03154C 0C:953C: A0        .byte $A0   ; 
- D 0 - I - 0x03154D 0C:953D: FC        .byte $FC   ; 
- - - - - - 0x03154E 0C:953E: 01        .byte $01   ; 
- D 0 - I - 0x03154F 0C:953F: 5C        .byte $5C   ; 
- D 0 - I - 0x031550 0C:9540: 76        .byte $76   ; <v>
- D 0 - I - 0x031551 0C:9541: 6B        .byte $6B   ; <k>
- D 0 - I - 0x031552 0C:9542: 7D        .byte $7D   ; 
- D 0 - I - 0x031553 0C:9543: 0C        .byte $0C   ; 
- D 0 - I - 0x031554 0C:9544: 10        .byte $10   ; 
- D 0 - I - 0x031555 0C:9545: 79        .byte $79   ; <y>
- D 0 - I - 0x031556 0C:9546: FC        .byte $FC   ; 
- D 0 - I - 0x031557 0C:9547: F0        .byte $F0   ; 
- D 0 - I - 0x031558 0C:9548: 01        .byte $01   ; 
- D 0 - I - 0x031559 0C:9549: 11        .byte $11   ; 
- D 0 - I - 0x03155A 0C:954A: ED        .byte $ED   ; 
- D 0 - I - 0x03155B 0C:954B: FC        .byte $FC   ; 
- - - - - - 0x03155C 0C:954C: 01        .byte $01   ; 
- D 0 - I - 0x03155D 0C:954D: CD        .byte $CD   ; 
- D 0 - I - 0x03155E 0C:954E: 6E        .byte $6E   ; <n>
- D 0 - I - 0x03155F 0C:954F: 51        .byte $51   ; <Q>
- D 0 - I - 0x031560 0C:9550: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031561 0C:9551: B6        .byte $B6   ; 
- D 0 - I - 0x031562 0C:9552: 79        .byte $79   ; <y>
- D 0 - I - 0x031563 0C:9553: FC        .byte $FC   ; 
- D 0 - I - 0x031564 0C:9554: F0        .byte $F0   ; 
- D 0 - I - 0x031565 0C:9555: 01        .byte $01   ; 
- D 0 - I - 0x031566 0C:9556: 51        .byte $51   ; <Q>
- D 0 - I - 0x031567 0C:9557: EE        .byte $EE   ; 
- D 0 - I - 0x031568 0C:9558: FC        .byte $FC   ; 
- - - - - - 0x031569 0C:9559: 01        .byte $01   ; 
- D 0 - I - 0x03156A 0C:955A: F5        .byte $F5   ; 
- D 0 - I - 0x03156B 0C:955B: 2D        .byte $2D   ; 
- D 0 - I - 0x03156C 0C:955C: 00        .byte $00   ; 
- D 0 - I - 0x03156D 0C:955D: 46        .byte $46   ; <F>
- D 0 - I - 0x03156E 0C:955E: 6F        .byte $6F   ; <o>
- D 0 - I - 0x03156F 0C:955F: 54        .byte $54   ; <T>
- D 0 - I - 0x031570 0C:9560: 79        .byte $79   ; <y>
- D 0 - I - 0x031571 0C:9561: FC        .byte $FC   ; 
- D 0 - I - 0x031572 0C:9562: F0        .byte $F0   ; 
- D 0 - I - 0x031573 0C:9563: 01        .byte $01   ; 
- D 0 - I - 0x031574 0C:9564: 22        .byte $22   ; 
- D 0 - I - 0x031575 0C:9565: EE        .byte $EE   ; 
- D 0 - I - 0x031576 0C:9566: FC        .byte $FC   ; 
- - - - - - 0x031577 0C:9567: 08        .byte $08   ; 
- D 0 - I - 0x031578 0C:9568: F5        .byte $F5   ; 
- D 0 - I - 0x031579 0C:9569: 2D        .byte $2D   ; 
- D 0 - I - 0x03157A 0C:956A: FC        .byte $FC   ; 
- - - - - - 0x03157B 0C:956B: 01        .byte $01   ; 
- D 0 - I - 0x03157C 0C:956C: E3        .byte $E3   ; 
- D 0 - I - 0x03157D 0C:956D: FC        .byte $FC   ; 
- D 0 - I - 0x03157E 0C:956E: F0        .byte $F0   ; 
- D 0 - I - 0x03157F 0C:956F: 01        .byte $01   ; 
- D 0 - I - 0x031580 0C:9570: 62        .byte $62   ; <b>
- D 0 - I - 0x031581 0C:9571: D1        .byte $D1   ; 
- D 0 - I - 0x031582 0C:9572: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031583 0C:9573: 54        .byte $54   ; <T>
- D 0 - I - 0x031584 0C:9574: 16        .byte $16   ; 
- D 0 - I - 0x031585 0C:9575: 00        .byte $00   ; 
- D 0 - I - 0x031586 0C:9576: 01        .byte $01   ; 
- D 0 - I - 0x031587 0C:9577: 10        .byte $10   ; 
- D 0 - I - 0x031588 0C:9578: 2F        .byte $2F   ; 
- D 0 - I - 0x031589 0C:9579: 13        .byte $13   ; 
- D 0 - I - 0x03158A 0C:957A: FC        .byte $FC   ; 
- - - - - - 0x03158B 0C:957B: 01        .byte $01   ; 
- D 0 - I - 0x03158C 0C:957C: F5        .byte $F5   ; 
- D 0 - I - 0x03158D 0C:957D: 1A        .byte $1A   ; 
- D 0 - I - 0x03158E 0C:957E: FC        .byte $FC   ; 
- - - - - - 0x03158F 0C:957F: 01        .byte $01   ; 
- D 0 - I - 0x031590 0C:9580: 1A        .byte $1A   ; 
- D 0 - I - 0x031591 0C:9581: 18        .byte $18   ; 
- D 0 - I - 0x031592 0C:9582: 06        .byte $06   ; 
- D 0 - I - 0x031593 0C:9583: 04        .byte $04   ; 
- D 0 - I - 0x031594 0C:9584: 2F        .byte $2F   ; 
- D 0 - I - 0x031595 0C:9585: 10        .byte $10   ; 
- D 0 - I - 0x031596 0C:9586: F7        .byte $F7   ; 
- D 0 - I - 0x031597 0C:9587: 03        .byte $03   ; 
- D 0 - I - 0x031598 0C:9588: 79        .byte $79   ; <y>
- D 0 - I - 0x031599 0C:9589: FC        .byte $FC   ; 
- D 0 - I - 0x03159A 0C:958A: F0        .byte $F0   ; 
- D 0 - I - 0x03159B 0C:958B: 01        .byte $01   ; 
- D 0 - I - 0x03159C 0C:958C: 52        .byte $52   ; <R>
- D 0 - I - 0x03159D 0C:958D: EE        .byte $EE   ; 
- D 0 - I - 0x03159E 0C:958E: FC        .byte $FC   ; 
- - - - - - 0x03159F 0C:958F: 01        .byte $01   ; 
- D 0 - I - 0x0315A0 0C:9590: F5        .byte $F5   ; 
- D 0 - I - 0x0315A1 0C:9591: 2D        .byte $2D   ; 
- D 0 - I - 0x0315A2 0C:9592: 00        .byte $00   ; 
- D 0 - I - 0x0315A3 0C:9593: C5        .byte $C5   ; 
- D 0 - I - 0x0315A4 0C:9594: 6B        .byte $6B   ; <k>
- D 0 - I - 0x0315A5 0C:9595: 6F        .byte $6F   ; <o>
- D 0 - I - 0x0315A6 0C:9596: 48        .byte $48   ; <H>
- D 0 - I - 0x0315A7 0C:9597: 79        .byte $79   ; <y>
- D 0 - I - 0x0315A8 0C:9598: FC        .byte $FC   ; 
- D 0 - I - 0x0315A9 0C:9599: F0        .byte $F0   ; 
- D 0 - I - 0x0315AA 0C:959A: 01        .byte $01   ; 
- D 0 - I - 0x0315AB 0C:959B: 12        .byte $12   ; 
- D 0 - I - 0x0315AC 0C:959C: EE        .byte $EE   ; 
- D 0 - I - 0x0315AD 0C:959D: FC        .byte $FC   ; 
- - - - - - 0x0315AE 0C:959E: 08        .byte $08   ; 
- D 0 - I - 0x0315AF 0C:959F: F5        .byte $F5   ; 
- D 0 - I - 0x0315B0 0C:95A0: 2D        .byte $2D   ; 
- D 0 - I - 0x0315B1 0C:95A1: 00        .byte $00   ; 
- D 0 - I - 0x0315B2 0C:95A2: 1A        .byte $1A   ; 
- D 0 - I - 0x0315B3 0C:95A3: A6        .byte $A6   ; 
- D 0 - I - 0x0315B4 0C:95A4: 02        .byte $02   ; 
- D 0 - I - 0x0315B5 0C:95A5: 10        .byte $10   ; 
- D 0 - I - 0x0315B6 0C:95A6: 79        .byte $79   ; <y>
- D 0 - I - 0x0315B7 0C:95A7: FC        .byte $FC   ; 
- D 0 - I - 0x0315B8 0C:95A8: F0        .byte $F0   ; 
- D 0 - I - 0x0315B9 0C:95A9: 01        .byte $01   ; 
- D 0 - I - 0x0315BA 0C:95AA: 12        .byte $12   ; 
- D 0 - I - 0x0315BB 0C:95AB: EE        .byte $EE   ; 
- D 0 - I - 0x0315BC 0C:95AC: FC        .byte $FC   ; 
- - - - - - 0x0315BD 0C:95AD: 01        .byte $01   ; 
- D 0 - I - 0x0315BE 0C:95AE: F5        .byte $F5   ; 
- D 0 - I - 0x0315BF 0C:95AF: 16        .byte $16   ; 
- D 0 - I - 0x0315C0 0C:95B0: 00        .byte $00   ; 
- D 0 - I - 0x0315C1 0C:95B1: 21        .byte $21   ; 
- D 0 - I - 0x0315C2 0C:95B2: 06        .byte $06   ; 
- D 0 - I - 0x0315C3 0C:95B3: 03        .byte $03   ; 
- D 0 - I - 0x0315C4 0C:95B4: 79        .byte $79   ; <y>
- D 0 - I - 0x0315C5 0C:95B5: FC        .byte $FC   ; 
- D 0 - I - 0x0315C6 0C:95B6: F0        .byte $F0   ; 
- D 0 - I - 0x0315C7 0C:95B7: F2        .byte $F2   ; 
- D 0 - I - 0x0315C8 0C:95B8: 01        .byte $01   ; 
- D 0 - I - 0x0315C9 0C:95B9: 5C        .byte $5C   ; 
- D 0 - I - 0x0315CA 0C:95BA: AD        .byte $AD   ; 
- D 0 - I - 0x0315CB 0C:95BB: 10        .byte $10   ; 
- D 0 - I - 0x0315CC 0C:95BC: 2F        .byte $2F   ; 
- D 0 - I - 0x0315CD 0C:95BD: 79        .byte $79   ; <y>
- D 0 - I - 0x0315CE 0C:95BE: ED        .byte $ED   ; 
- D 0 - I - 0x0315CF 0C:95BF: 19        .byte $19   ; 
- D 0 - I - 0x0315D0 0C:95C0: FC        .byte $FC   ; 
- - - - - - 0x0315D1 0C:95C1: 01        .byte $01   ; 
- D 0 - I - 0x0315D2 0C:95C2: 1B        .byte $1B   ; 
- D 0 - I - 0x0315D3 0C:95C3: A1        .byte $A1   ; 
- D 0 - I - 0x0315D4 0C:95C4: 00        .byte $00   ; 
- D 0 - I - 0x0315D5 0C:95C5: 0B        .byte $0B   ; 
- D 0 - I - 0x0315D6 0C:95C6: 2E        .byte $2E   ; 
- D 0 - I - 0x0315D7 0C:95C7: 06        .byte $06   ; 
- D 0 - I - 0x0315D8 0C:95C8: 08        .byte $08   ; 
- D 0 - I - 0x0315D9 0C:95C9: 14        .byte $14   ; 
- D 0 - I - 0x0315DA 0C:95CA: B0        .byte $B0   ; 
- D 0 - I - 0x0315DB 0C:95CB: 79        .byte $79   ; <y>
- D 0 - I - 0x0315DC 0C:95CC: FC        .byte $FC   ; 
- D 0 - I - 0x0315DD 0C:95CD: F0        .byte $F0   ; 
- D 0 - I - 0x0315DE 0C:95CE: 01        .byte $01   ; 
- D 0 - I - 0x0315DF 0C:95CF: 61        .byte $61   ; <a>
- D 0 - I - 0x0315E0 0C:95D0: AA        .byte $AA   ; 
- D 0 - I - 0x0315E1 0C:95D1: A0        .byte $A0   ; 
- D 0 - I - 0x0315E2 0C:95D2: FC        .byte $FC   ; 
- - - - - - 0x0315E3 0C:95D3: 01        .byte $01   ; 
- D 0 - I - 0x0315E4 0C:95D4: E4        .byte $E4   ; 
- D 0 - I - 0x0315E5 0C:95D5: 19        .byte $19   ; 
- D 0 - I - 0x0315E6 0C:95D6: FC        .byte $FC   ; 
- - - - - - 0x0315E7 0C:95D7: 01        .byte $01   ; 
- D 0 - I - 0x0315E8 0C:95D8: 02        .byte $02   ; 
- D 0 - I - 0x0315E9 0C:95D9: 07        .byte $07   ; 
- D 0 - I - 0x0315EA 0C:95DA: 05        .byte $05   ; 
- D 0 - I - 0x0315EB 0C:95DB: 02        .byte $02   ; 
- D 0 - I - 0x0315EC 0C:95DC: 23        .byte $23   ; 
- D 0 - I - 0x0315ED 0C:95DD: 00        .byte $00   ; 
- D 0 - I - 0x0315EE 0C:95DE: 26        .byte $26   ; 
- D 0 - I - 0x0315EF 0C:95DF: 2C        .byte $2C   ; 
- D 0 - I - 0x0315F0 0C:95E0: 1F        .byte $1F   ; 
- D 0 - I - 0x0315F1 0C:95E1: 2F        .byte $2F   ; 
- D 0 - I - 0x0315F2 0C:95E2: 10        .byte $10   ; 
- D 0 - I - 0x0315F3 0C:95E3: 79        .byte $79   ; <y>
- D 0 - I - 0x0315F4 0C:95E4: FC        .byte $FC   ; 
- D 0 - I - 0x0315F5 0C:95E5: F0        .byte $F0   ; 
- D 0 - I - 0x0315F6 0C:95E6: F2        .byte $F2   ; 
- D 0 - I - 0x0315F7 0C:95E7: 01        .byte $01   ; 
- D 0 - I - 0x0315F8 0C:95E8: 6C        .byte $6C   ; <l>
- D 0 - I - 0x0315F9 0C:95E9: AD        .byte $AD   ; 
- D 0 - I - 0x0315FA 0C:95EA: 10        .byte $10   ; 
- D 0 - I - 0x0315FB 0C:95EB: 2F        .byte $2F   ; 
- D 0 - I - 0x0315FC 0C:95EC: 79        .byte $79   ; <y>
- D 0 - I - 0x0315FD 0C:95ED: ED        .byte $ED   ; 
- D 0 - I - 0x0315FE 0C:95EE: 19        .byte $19   ; 
- D 0 - I - 0x0315FF 0C:95EF: FC        .byte $FC   ; 
- - - - - - 0x031600 0C:95F0: 01        .byte $01   ; 
- D 0 - I - 0x031601 0C:95F1: 1B        .byte $1B   ; 
- D 0 - I - 0x031602 0C:95F2: A1        .byte $A1   ; 
- D 0 - I - 0x031603 0C:95F3: 00        .byte $00   ; 
- D 0 - I - 0x031604 0C:95F4: 0B        .byte $0B   ; 
- D 0 - I - 0x031605 0C:95F5: 2E        .byte $2E   ; 
- D 0 - I - 0x031606 0C:95F6: 06        .byte $06   ; 
- D 0 - I - 0x031607 0C:95F7: 08        .byte $08   ; 
- D 0 - I - 0x031608 0C:95F8: 14        .byte $14   ; 
- D 0 - I - 0x031609 0C:95F9: B0        .byte $B0   ; 
- D 0 - I - 0x03160A 0C:95FA: 79        .byte $79   ; <y>
- D 0 - I - 0x03160B 0C:95FB: FC        .byte $FC   ; 
- - - - - - 0x03160C 0C:95FC: 08        .byte $08   ; 
- D 0 - I - 0x03160D 0C:95FD: AA        .byte $AA   ; 
- D 0 - I - 0x03160E 0C:95FE: A0        .byte $A0   ; 
- D 0 - I - 0x03160F 0C:95FF: 00        .byte $00   ; 
- D 0 - I - 0x031610 0C:9600: 14        .byte $14   ; 
- D 0 - I - 0x031611 0C:9601: AE        .byte $AE   ; 
- D 0 - I - 0x031612 0C:9602: 06        .byte $06   ; 
- D 0 - I - 0x031613 0C:9603: 15        .byte $15   ; 
- D 0 - I - 0x031614 0C:9604: 02        .byte $02   ; 
- D 0 - I - 0x031615 0C:9605: 79        .byte $79   ; <y>
- D 0 - I - 0x031616 0C:9606: FC        .byte $FC   ; 
- D 0 - I - 0x031617 0C:9607: F0        .byte $F0   ; 
- D 0 - I - 0x031618 0C:9608: 01        .byte $01   ; 
- D 0 - I - 0x031619 0C:9609: 5C        .byte $5C   ; 
- D 0 - I - 0x03161A 0C:960A: AD        .byte $AD   ; 
- D 0 - I - 0x03161B 0C:960B: 10        .byte $10   ; 
- D 0 - I - 0x03161C 0C:960C: 2F        .byte $2F   ; 
- D 0 - I - 0x03161D 0C:960D: 79        .byte $79   ; <y>
- D 0 - I - 0x03161E 0C:960E: ED        .byte $ED   ; 
- D 0 - I - 0x03161F 0C:960F: 19        .byte $19   ; 
- D 0 - I - 0x031620 0C:9610: FC        .byte $FC   ; 
- - - - - - 0x031621 0C:9611: 01        .byte $01   ; 
- D 0 - I - 0x031622 0C:9612: BE        .byte $BE   ; 
- D 0 - I - 0x031623 0C:9613: 7D        .byte $7D   ; 
- D 0 - I - 0x031624 0C:9614: 48        .byte $48   ; <H>
- D 0 - I - 0x031625 0C:9615: 00        .byte $00   ; 
- D 0 - I - 0x031626 0C:9616: 42        .byte $42   ; <B>
- D 0 - I - 0x031627 0C:9617: 68        .byte $68   ; <h>
- D 0 - I - 0x031628 0C:9618: 71        .byte $71   ; <q>
- D 0 - I - 0x031629 0C:9619: 7D        .byte $7D   ; 
- D 0 - I - 0x03162A 0C:961A: BA        .byte $BA   ; 
- D 0 - I - 0x03162B 0C:961B: 72        .byte $72   ; <r>
- D 0 - I - 0x03162C 0C:961C: 6E        .byte $6E   ; <n>
- D 0 - I - 0x03162D 0C:961D: 79        .byte $79   ; <y>
- D 0 - I - 0x03162E 0C:961E: 79        .byte $79   ; <y>
- D 0 - I - 0x03162F 0C:961F: FC        .byte $FC   ; 
- D 0 - I - 0x031630 0C:9620: F0        .byte $F0   ; 
- D 0 - I - 0x031631 0C:9621: 08        .byte $08   ; 
- D 0 - I - 0x031632 0C:9622: 42        .byte $42   ; <B>
- D 0 - I - 0x031633 0C:9623: 00        .byte $00   ; 
- D 0 - I - 0x031634 0C:9624: 00        .byte $00   ; 
- D 0 - I - 0x031635 0C:9625: 00        .byte $00   ; 
- D 0 - I - 0x031636 0C:9626: 79        .byte $79   ; <y>
- D 0 - I - 0x031637 0C:9627: 79        .byte $79   ; <y>
- D 0 - I - 0x031638 0C:9628: FC        .byte $FC   ; 
- D 0 - I - 0x031639 0C:9629: F0        .byte $F0   ; 
- D 0 - I - 0x03163A 0C:962A: 01        .byte $01   ; 
- D 0 - I - 0x03163B 0C:962B: 5C        .byte $5C   ; 
- D 0 - I - 0x03163C 0C:962C: AD        .byte $AD   ; 
- D 0 - I - 0x03163D 0C:962D: 10        .byte $10   ; 
- D 0 - I - 0x03163E 0C:962E: 2F        .byte $2F   ; 
- D 0 - I - 0x03163F 0C:962F: 79        .byte $79   ; <y>
- D 0 - I - 0x031640 0C:9630: ED        .byte $ED   ; 
- D 0 - I - 0x031641 0C:9631: 19        .byte $19   ; 
- D 0 - I - 0x031642 0C:9632: FC        .byte $FC   ; 
- - - - - - 0x031643 0C:9633: 01        .byte $01   ; 
- D 0 - I - 0x031644 0C:9634: B1        .byte $B1   ; 
- D 0 - I - 0x031645 0C:9635: 2E        .byte $2E   ; 
- D 0 - I - 0x031646 0C:9636: 0C        .byte $0C   ; 
- D 0 - I - 0x031647 0C:9637: 2E        .byte $2E   ; 
- D 0 - I - 0x031648 0C:9638: 4E        .byte $4E   ; <N>
- D 0 - I - 0x031649 0C:9639: 7D        .byte $7D   ; 
- D 0 - I - 0x03164A 0C:963A: C4        .byte $C4   ; 
- D 0 - I - 0x03164B 0C:963B: 6E        .byte $6E   ; <n>
- D 0 - I - 0x03164C 0C:963C: B6        .byte $B6   ; 
- D 0 - I - 0x03164D 0C:963D: 79        .byte $79   ; <y>
- D 0 - I - 0x03164E 0C:963E: FC        .byte $FC   ; 
- D 0 - I - 0x03164F 0C:963F: F0        .byte $F0   ; 
- D 0 - I - 0x031650 0C:9640: F2        .byte $F2   ; 
- D 0 - I - 0x031651 0C:9641: F4        .byte $F4   ; 
- D 0 - I - 0x031652 0C:9642: 07        .byte $07   ; 
- - - - - - 0x031653 0C:9643: 62        .byte $62   ; <b>
- - - - - - 0x031654 0C:9644: 96        .byte $96   ; 
- D 0 - I - 0x031655 0C:9645: 49        .byte $49   ; <I>
- D 0 - I - 0x031656 0C:9646: 96        .byte $96   ; 
- D 0 - I - 0x031657 0C:9647: 63        .byte $63   ; <c>
- D 0 - I - 0x031658 0C:9648: 96        .byte $96   ; 
- D 0 - I - 0x031659 0C:9649: 01        .byte $01   ; 
- D 0 - I - 0x03165A 0C:964A: E2        .byte $E2   ; 
- D 0 - I - 0x03165B 0C:964B: 4D        .byte $4D   ; <M>
- D 0 - I - 0x03165C 0C:964C: 69        .byte $69   ; <i>
- D 0 - I - 0x03165D 0C:964D: 7D        .byte $7D   ; 
- D 0 - I - 0x03165E 0C:964E: AD        .byte $AD   ; 
- D 0 - I - 0x03165F 0C:964F: FC        .byte $FC   ; 
- - - - - - 0x031660 0C:9650: 01        .byte $01   ; 
- D 0 - I - 0x031661 0C:9651: ED        .byte $ED   ; 
- D 0 - I - 0x031662 0C:9652: FC        .byte $FC   ; 
- - - - - - 0x031663 0C:9653: 01        .byte $01   ; 
- D 0 - I - 0x031664 0C:9654: C3        .byte $C3   ; 
- D 0 - I - 0x031665 0C:9655: 67        .byte $67   ; <g>
- D 0 - I - 0x031666 0C:9656: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031667 0C:9657: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031668 0C:9658: 2D        .byte $2D   ; 
- D 0 - I - 0x031669 0C:9659: 00        .byte $00   ; 
- D 0 - I - 0x03166A 0C:965A: 08        .byte $08   ; 
- D 0 - I - 0x03166B 0C:965B: A7        .byte $A7   ; 
- D 0 - I - 0x03166C 0C:965C: 0C        .byte $0C   ; 
- D 0 - I - 0x03166D 0C:965D: 13        .byte $13   ; 
- D 0 - I - 0x03166E 0C:965E: 02        .byte $02   ; 
- D 0 - I - 0x03166F 0C:965F: 29        .byte $29   ; 
- D 0 - I - 0x031670 0C:9660: 79        .byte $79   ; <y>
- D 0 - I - 0x031671 0C:9661: FC        .byte $FC   ; 
- D 0 - I - 0x031672 0C:9662: F0        .byte $F0   ; 
- D 0 - I - 0x031673 0C:9663: 01        .byte $01   ; 
- D 0 - I - 0x031674 0C:9664: E2        .byte $E2   ; 
- D 0 - I - 0x031675 0C:9665: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031676 0C:9666: 69        .byte $69   ; <i>
- D 0 - I - 0x031677 0C:9667: 7D        .byte $7D   ; 
- D 0 - I - 0x031678 0C:9668: AD        .byte $AD   ; 
- D 0 - I - 0x031679 0C:9669: FC        .byte $FC   ; 
- - - - - - 0x03167A 0C:966A: 01        .byte $01   ; 
- D 0 - I - 0x03167B 0C:966B: ED        .byte $ED   ; 
- D 0 - I - 0x03167C 0C:966C: FC        .byte $FC   ; 
- - - - - - 0x03167D 0C:966D: 01        .byte $01   ; 
- D 0 - I - 0x03167E 0C:966E: 10        .byte $10   ; 
- D 0 - I - 0x03167F 0C:966F: 05        .byte $05   ; 
- D 0 - I - 0x031680 0C:9670: 2A        .byte $2A   ; 
- D 0 - I - 0x031681 0C:9671: 13        .byte $13   ; 
- D 0 - I - 0x031682 0C:9672: 02        .byte $02   ; 
- D 0 - I - 0x031683 0C:9673: 29        .byte $29   ; 
- D 0 - I - 0x031684 0C:9674: 79        .byte $79   ; <y>
- D 0 - I - 0x031685 0C:9675: FC        .byte $FC   ; 
- D 0 - I - 0x031686 0C:9676: F0        .byte $F0   ; 
- D 0 - I - 0x031687 0C:9677: 01        .byte $01   ; 
- D 0 - I - 0x031688 0C:9678: 52        .byte $52   ; <R>
- D 0 - I - 0x031689 0C:9679: E4        .byte $E4   ; 
- D 0 - I - 0x03168A 0C:967A: FC        .byte $FC   ; 
- - - - - - 0x03168B 0C:967B: 01        .byte $01   ; 
- D 0 - I - 0x03168C 0C:967C: 1C        .byte $1C   ; 
- D 0 - I - 0x03168D 0C:967D: 2F        .byte $2F   ; 
- D 0 - I - 0x03168E 0C:967E: 14        .byte $14   ; 
- D 0 - I - 0x03168F 0C:967F: AF        .byte $AF   ; 
- D 0 - I - 0x031690 0C:9680: 0B        .byte $0B   ; 
- D 0 - I - 0x031691 0C:9681: 2A        .byte $2A   ; 
- D 0 - I - 0x031692 0C:9682: 10        .byte $10   ; 
- D 0 - I - 0x031693 0C:9683: 79        .byte $79   ; <y>
- D 0 - I - 0x031694 0C:9684: FC        .byte $FC   ; 
- D 0 - I - 0x031695 0C:9685: F0        .byte $F0   ; 
- D 0 - I - 0x031696 0C:9686: 01        .byte $01   ; 
- D 0 - I - 0x031697 0C:9687: 22        .byte $22   ; 
- D 0 - I - 0x031698 0C:9688: E4        .byte $E4   ; 
- D 0 - I - 0x031699 0C:9689: FC        .byte $FC   ; 
- - - - - - 0x03169A 0C:968A: 08        .byte $08   ; 
- D 0 - I - 0x03169B 0C:968B: F5        .byte $F5   ; 
- D 0 - I - 0x03169C 0C:968C: 2D        .byte $2D   ; 
- D 0 - I - 0x03169D 0C:968D: FC        .byte $FC   ; 
- - - - - - 0x03169E 0C:968E: 01        .byte $01   ; 
- D 0 - I - 0x03169F 0C:968F: E2        .byte $E2   ; 
- D 0 - I - 0x0316A0 0C:9690: FC        .byte $FC   ; 
- D 0 - I - 0x0316A1 0C:9691: F0        .byte $F0   ; 
- D 0 - I - 0x0316A2 0C:9692: 01        .byte $01   ; 
- D 0 - I - 0x0316A3 0C:9693: D0        .byte $D0   ; 
- D 0 - I - 0x0316A4 0C:9694: 00        .byte $00   ; 
- D 0 - I - 0x0316A5 0C:9695: 00        .byte $00   ; 
- D 0 - I - 0x0316A6 0C:9696: 08        .byte $08   ; 
- D 0 - I - 0x0316A7 0C:9697: 2F        .byte $2F   ; 
- D 0 - I - 0x0316A8 0C:9698: 79        .byte $79   ; <y>
- D 0 - I - 0x0316A9 0C:9699: FC        .byte $FC   ; 
- - - - - - 0x0316AA 0C:969A: 01        .byte $01   ; 
- D 0 - I - 0x0316AB 0C:969B: B4        .byte $B4   ; 
- D 0 - I - 0x0316AC 0C:969C: 6F        .byte $6F   ; <o>
- D 0 - I - 0x0316AD 0C:969D: 52        .byte $52   ; <R>
- D 0 - I - 0x0316AE 0C:969E: A0        .byte $A0   ; 
- D 0 - I - 0x0316AF 0C:969F: 00        .byte $00   ; 
- D 0 - I - 0x0316B0 0C:96A0: 10        .byte $10   ; 
- D 0 - I - 0x0316B1 0C:96A1: 28        .byte $28   ; 
- D 0 - I - 0x0316B2 0C:96A2: 15        .byte $15   ; 
- D 0 - I - 0x0316B3 0C:96A3: 02        .byte $02   ; 
- D 0 - I - 0x0316B4 0C:96A4: 79        .byte $79   ; <y>
- D 0 - I - 0x0316B5 0C:96A5: FC        .byte $FC   ; 
- D 0 - I - 0x0316B6 0C:96A6: F0        .byte $F0   ; 
- D 0 - I - 0x0316B7 0C:96A7: 01        .byte $01   ; 
- D 0 - I - 0x0316B8 0C:96A8: 61        .byte $61   ; <a>
- D 0 - I - 0x0316B9 0C:96A9: AA        .byte $AA   ; 
- D 0 - I - 0x0316BA 0C:96AA: A0        .byte $A0   ; 
- D 0 - I - 0x0316BB 0C:96AB: FC        .byte $FC   ; 
- - - - - - 0x0316BC 0C:96AC: 01        .byte $01   ; 
- D 0 - I - 0x0316BD 0C:96AD: E0        .byte $E0   ; 
- D 0 - I - 0x0316BE 0C:96AE: 19        .byte $19   ; 
- D 0 - I - 0x0316BF 0C:96AF: FC        .byte $FC   ; 
- - - - - - 0x0316C0 0C:96B0: 01        .byte $01   ; 
- D 0 - I - 0x0316C1 0C:96B1: 02        .byte $02   ; 
- D 0 - I - 0x0316C2 0C:96B2: 07        .byte $07   ; 
- D 0 - I - 0x0316C3 0C:96B3: 05        .byte $05   ; 
- D 0 - I - 0x0316C4 0C:96B4: 02        .byte $02   ; 
- D 0 - I - 0x0316C5 0C:96B5: 23        .byte $23   ; 
- D 0 - I - 0x0316C6 0C:96B6: 00        .byte $00   ; 
- D 0 - I - 0x0316C7 0C:96B7: 26        .byte $26   ; 
- D 0 - I - 0x0316C8 0C:96B8: 2C        .byte $2C   ; 
- D 0 - I - 0x0316C9 0C:96B9: 1F        .byte $1F   ; 
- D 0 - I - 0x0316CA 0C:96BA: 2F        .byte $2F   ; 
- D 0 - I - 0x0316CB 0C:96BB: 10        .byte $10   ; 
- D 0 - I - 0x0316CC 0C:96BC: 79        .byte $79   ; <y>
- D 0 - I - 0x0316CD 0C:96BD: FC        .byte $FC   ; 
- D 0 - I - 0x0316CE 0C:96BE: F0        .byte $F0   ; 
- D 0 - I - 0x0316CF 0C:96BF: 0A        .byte $0A   ; 
- D 0 - I - 0x0316D0 0C:96C0: 51        .byte $51   ; <Q>
- D 0 - I - 0x0316D1 0C:96C1: F6        .byte $F6   ; 
- D 0 - I - 0x0316D2 0C:96C2: D1        .byte $D1   ; 
- D 0 - I - 0x0316D3 0C:96C3: 4D        .byte $4D   ; <M>
- D 0 - I - 0x0316D4 0C:96C4: 54        .byte $54   ; <T>
- D 0 - I - 0x0316D5 0C:96C5: 16        .byte $16   ; 
- D 0 - I - 0x0316D6 0C:96C6: 00        .byte $00   ; 
- D 0 - I - 0x0316D7 0C:96C7: 01        .byte $01   ; 
- D 0 - I - 0x0316D8 0C:96C8: 10        .byte $10   ; 
- D 0 - I - 0x0316D9 0C:96C9: 2F        .byte $2F   ; 
- D 0 - I - 0x0316DA 0C:96CA: 13        .byte $13   ; 
- D 0 - I - 0x0316DB 0C:96CB: FC        .byte $FC   ; 
- - - - - - 0x0316DC 0C:96CC: 01        .byte $01   ; 
- D 0 - I - 0x0316DD 0C:96CD: 0A        .byte $0A   ; 
- D 0 - I - 0x0316DE 0C:96CE: B3        .byte $B3   ; 
- D 0 - I - 0x0316DF 0C:96CF: 2A        .byte $2A   ; 
- D 0 - I - 0x0316E0 0C:96D0: BE        .byte $BE   ; 
- D 0 - I - 0x0316E1 0C:96D1: 5F        .byte $5F   ; 
- D 0 - I - 0x0316E2 0C:96D2: 16        .byte $16   ; 
- D 0 - I - 0x0316E3 0C:96D3: 00        .byte $00   ; 
- D 0 - I - 0x0316E4 0C:96D4: 15        .byte $15   ; 
- D 0 - I - 0x0316E5 0C:96D5: 2F        .byte $2F   ; 
- D 0 - I - 0x0316E6 0C:96D6: 10        .byte $10   ; 
- D 0 - I - 0x0316E7 0C:96D7: 79        .byte $79   ; <y>
- D 0 - I - 0x0316E8 0C:96D8: FC        .byte $FC   ; 
- D 0 - I - 0x0316E9 0C:96D9: F0        .byte $F0   ; 
- D 0 - I - 0x0316EA 0C:96DA: 01        .byte $01   ; 
- D 0 - I - 0x0316EB 0C:96DB: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0316EC 0C:96DC: 07        .byte $07   ; 
- D 0 - I - 0x0316ED 0C:96DD: 1F        .byte $1F   ; 
- D 0 - I - 0x0316EE 0C:96DE: 2F        .byte $2F   ; 
- D 0 - I - 0x0316EF 0C:96DF: 10        .byte $10   ; 
- D 0 - I - 0x0316F0 0C:96E0: 79        .byte $79   ; <y>
- D 0 - I - 0x0316F1 0C:96E1: 00        .byte $00   ; 
- D 0 - I - 0x0316F2 0C:96E2: B8        .byte $B8   ; 
- D 0 - I - 0x0316F3 0C:96E3: F7        .byte $F7   ; 
- D 0 - I - 0x0316F4 0C:96E4: 03        .byte $03   ; 
- D 0 - I - 0x0316F5 0C:96E5: 69        .byte $69   ; <i>
- D 0 - I - 0x0316F6 0C:96E6: 79        .byte $79   ; <y>
- D 0 - I - 0x0316F7 0C:96E7: 79        .byte $79   ; <y>
- D 0 - I - 0x0316F8 0C:96E8: FC        .byte $FC   ; 
- D 0 - I - 0x0316F9 0C:96E9: F0        .byte $F0   ; 
- D 0 - I - 0x0316FA 0C:96EA: 01        .byte $01   ; 
- D 0 - I - 0x0316FB 0C:96EB: 42        .byte $42   ; <B>
- D 0 - I - 0x0316FC 0C:96EC: 05        .byte $05   ; 
- D 0 - I - 0x0316FD 0C:96ED: 05        .byte $05   ; 
- D 0 - I - 0x0316FE 0C:96EE: F7        .byte $F7   ; 
- D 0 - I - 0x0316FF 0C:96EF: 04        .byte $04   ; 
- D 0 - I - 0x031700 0C:96F0: 2F        .byte $2F   ; 
- D 0 - I - 0x031701 0C:96F1: 14        .byte $14   ; 
- D 0 - I - 0x031702 0C:96F2: 79        .byte $79   ; <y>
- D 0 - I - 0x031703 0C:96F3: 79        .byte $79   ; <y>
- D 0 - I - 0x031704 0C:96F4: FC        .byte $FC   ; 
- D 0 - I - 0x031705 0C:96F5: F0        .byte $F0   ; 
- - - - - - 0x031706 0C:96F6: 01        .byte $01   ; 
- - - - - - 0x031707 0C:96F7: 42        .byte $42   ; <B>
- - - - - - 0x031708 0C:96F8: 03        .byte $03   ; 
- - - - - - 0x031709 0C:96F9: 2C        .byte $2C   ; 
- - - - - - 0x03170A 0C:96FA: F7        .byte $F7   ; 
- - - - - - 0x03170B 0C:96FB: 04        .byte $04   ; 
- - - - - - 0x03170C 0C:96FC: 6F        .byte $6F   ; <o>
- - - - - - 0x03170D 0C:96FD: 79        .byte $79   ; <y>
- - - - - - 0x03170E 0C:96FE: 79        .byte $79   ; <y>
- - - - - - 0x03170F 0C:96FF: FC        .byte $FC   ; 
- - - - - - 0x031710 0C:9700: F0        .byte $F0   ; 
- - - - - - 0x031711 0C:9701: 01        .byte $01   ; 
- - - - - - 0x031712 0C:9702: 42        .byte $42   ; <B>
- - - - - - 0x031713 0C:9703: 03        .byte $03   ; 
- - - - - - 0x031714 0C:9704: 05        .byte $05   ; 
- - - - - - 0x031715 0C:9705: 05        .byte $05   ; 
- - - - - - 0x031716 0C:9706: F7        .byte $F7   ; 
- - - - - - 0x031717 0C:9707: 04        .byte $04   ; 
- - - - - - 0x031718 0C:9708: 6F        .byte $6F   ; <o>
- - - - - - 0x031719 0C:9709: 79        .byte $79   ; <y>
- - - - - - 0x03171A 0C:970A: 79        .byte $79   ; <y>
- - - - - - 0x03171B 0C:970B: FC        .byte $FC   ; 
- - - - - - 0x03171C 0C:970C: F0        .byte $F0   ; 
- D 0 - I - 0x03171D 0C:970D: 01        .byte $01   ; 
- D 0 - I - 0x03171E 0C:970E: 42        .byte $42   ; <B>
- D 0 - I - 0x03171F 0C:970F: 05        .byte $05   ; 
- D 0 - I - 0x031720 0C:9710: 05        .byte $05   ; 
- D 0 - I - 0x031721 0C:9711: F7        .byte $F7   ; 
- D 0 - I - 0x031722 0C:9712: 04        .byte $04   ; 
- D 0 - I - 0x031723 0C:9713: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031724 0C:9714: 79        .byte $79   ; <y>
- D 0 - I - 0x031725 0C:9715: 79        .byte $79   ; <y>
- D 0 - I - 0x031726 0C:9716: FC        .byte $FC   ; 
- D 0 - I - 0x031727 0C:9717: F0        .byte $F0   ; 
- - - - - - 0x031728 0C:9718: 01        .byte $01   ; 
- - - - - - 0x031729 0C:9719: 11        .byte $11   ; 
- - - - - - 0x03172A 0C:971A: ED        .byte $ED   ; 
- - - - - - 0x03172B 0C:971B: 16        .byte $16   ; 
- - - - - - 0x03172C 0C:971C: 00        .byte $00   ; 
- - - - - - 0x03172D 0C:971D: 01        .byte $01   ; 
- - - - - - 0x03172E 0C:971E: 10        .byte $10   ; 
- - - - - - 0x03172F 0C:971F: 2F        .byte $2F   ; 
- - - - - - 0x031730 0C:9720: 13        .byte $13   ; 
- - - - - - 0x031731 0C:9721: FC        .byte $FC   ; 
- - - - - - 0x031732 0C:9722: 04        .byte $04   ; 
- - - - - - 0x031733 0C:9723: 02        .byte $02   ; 
- - - - - - 0x031734 0C:9724: 07        .byte $07   ; 
- - - - - - 0x031735 0C:9725: 05        .byte $05   ; 
- - - - - - 0x031736 0C:9726: 02        .byte $02   ; 
- - - - - - 0x031737 0C:9727: 1A        .byte $1A   ; 
- - - - - - 0x031738 0C:9728: 00        .byte $00   ; 
- - - - - - 0x031739 0C:9729: 26        .byte $26   ; 
- - - - - - 0x03173A 0C:972A: 2C        .byte $2C   ; 
- - - - - - 0x03173B 0C:972B: 1F        .byte $1F   ; 
- - - - - - 0x03173C 0C:972C: 2F        .byte $2F   ; 
- - - - - - 0x03173D 0C:972D: 10        .byte $10   ; 
- - - - - - 0x03173E 0C:972E: 79        .byte $79   ; <y>
- - - - - - 0x03173F 0C:972F: FC        .byte $FC   ; 
- - - - - - 0x031740 0C:9730: F0        .byte $F0   ; 
- D 0 - I - 0x031741 0C:9731: 01        .byte $01   ; 
- D 0 - I - 0x031742 0C:9732: 5C        .byte $5C   ; 
- D 0 - I - 0x031743 0C:9733: EE        .byte $EE   ; 
- D 0 - I - 0x031744 0C:9734: FC        .byte $FC   ; 
- - - - - - 0x031745 0C:9735: 04        .byte $04   ; 
- D 0 - I - 0x031746 0C:9736: F5        .byte $F5   ; 
- D 0 - I - 0x031747 0C:9737: 2D        .byte $2D   ; 
- D 0 - I - 0x031748 0C:9738: 00        .byte $00   ; 
- D 0 - I - 0x031749 0C:9739: 14        .byte $14   ; 
- D 0 - I - 0x03174A 0C:973A: 2F        .byte $2F   ; 
- D 0 - I - 0x03174B 0C:973B: 10        .byte $10   ; 
- D 0 - I - 0x03174C 0C:973C: 79        .byte $79   ; <y>
- D 0 - I - 0x03174D 0C:973D: FC        .byte $FC   ; 
- D 0 - I - 0x03174E 0C:973E: F0        .byte $F0   ; 
- D 0 - I - 0x03174F 0C:973F: 01        .byte $01   ; 
- D 0 - I - 0x031750 0C:9740: C0        .byte $C0   ; 
- D 0 - I - 0x031751 0C:9741: 47        .byte $47   ; <G>
- D 0 - I - 0x031752 0C:9742: 44        .byte $44   ; <D>
- D 0 - I - 0x031753 0C:9743: 44        .byte $44   ; <D>
- D 0 - I - 0x031754 0C:9744: 44        .byte $44   ; <D>
- D 0 - I - 0x031755 0C:9745: 75        .byte $75   ; <u>
- D 0 - I - 0x031756 0C:9746: 75        .byte $75   ; <u>
- D 0 - I - 0x031757 0C:9747: F7        .byte $F7   ; 
- D 0 - I - 0x031758 0C:9748: 07        .byte $07   ; 
- D 0 - I - 0x031759 0C:9749: 6F        .byte $6F   ; <o>
- D 0 - I - 0x03175A 0C:974A: 79        .byte $79   ; <y>
- D 0 - I - 0x03175B 0C:974B: 79        .byte $79   ; <y>
- D 0 - I - 0x03175C 0C:974C: FC        .byte $FC   ; 
- D 0 - I - 0x03175D 0C:974D: F0        .byte $F0   ; 
- D 0 - I - 0x03175E 0C:974E: 01        .byte $01   ; 
- D 0 - I - 0x03175F 0C:974F: 4C        .byte $4C   ; <L>
- D 0 - I - 0x031760 0C:9750: 05        .byte $05   ; 
- D 0 - I - 0x031761 0C:9751: 05        .byte $05   ; 
- D 0 - I - 0x031762 0C:9752: 7C        .byte $7C   ; 
- D 0 - I - 0x031763 0C:9753: 2F        .byte $2F   ; 
- D 0 - I - 0x031764 0C:9754: 14        .byte $14   ; 
- D 0 - I - 0x031765 0C:9755: 00        .byte $00   ; 
- D 0 - I - 0x031766 0C:9756: 1A        .byte $1A   ; 
- D 0 - I - 0x031767 0C:9757: 2E        .byte $2E   ; 
- D 0 - I - 0x031768 0C:9758: 0F        .byte $0F   ; 
- D 0 - I - 0x031769 0C:9759: 08        .byte $08   ; 
- D 0 - I - 0x03176A 0C:975A: AA        .byte $AA   ; 
- D 0 - I - 0x03176B 0C:975B: 7D        .byte $7D   ; 
- D 0 - I - 0x03176C 0C:975C: 79        .byte $79   ; <y>
- D 0 - I - 0x03176D 0C:975D: FC        .byte $FC   ; 
- D 0 - I - 0x03176E 0C:975E: F0        .byte $F0   ; 
- D 0 - I - 0x03176F 0C:975F: F4        .byte $F4   ; 
- D 0 - I - 0x031770 0C:9760: 01        .byte $01   ; 
- D 0 - I - 0x031771 0C:9761: 65        .byte $65   ; <e>
- D 0 - I - 0x031772 0C:9762: 97        .byte $97   ; 
- D 0 - I - 0x031773 0C:9763: 7B        .byte $7B   ; 
- D 0 - I - 0x031774 0C:9764: 97        .byte $97   ; 
- D 0 - I - 0x031775 0C:9765: 01        .byte $01   ; 
- D 0 - I - 0x031776 0C:9766: 51        .byte $51   ; <Q>
- D 0 - I - 0x031777 0C:9767: 0F        .byte $0F   ; 
- D 0 - I - 0x031778 0C:9768: 2A        .byte $2A   ; 
- D 0 - I - 0x031779 0C:9769: 2D        .byte $2D   ; 
- D 0 - I - 0x03177A 0C:976A: 00        .byte $00   ; 
- D 0 - I - 0x03177B 0C:976B: E4        .byte $E4   ; 
- D 0 - I - 0x03177C 0C:976C: A0        .byte $A0   ; 
- D 0 - I - 0x03177D 0C:976D: FC        .byte $FC   ; 
- - - - - - 0x03177E 0C:976E: 01        .byte $01   ; 
- D 0 - I - 0x03177F 0C:976F: 18        .byte $18   ; 
- D 0 - I - 0x031780 0C:9770: A6        .byte $A6   ; 
- D 0 - I - 0x031781 0C:9771: 0A        .byte $0A   ; 
- D 0 - I - 0x031782 0C:9772: 20        .byte $20   ; 
- D 0 - I - 0x031783 0C:9773: 16        .byte $16   ; 
- D 0 - I - 0x031784 0C:9774: 00        .byte $00   ; 
- D 0 - I - 0x031785 0C:9775: 02        .byte $02   ; 
- D 0 - I - 0x031786 0C:9776: 2F        .byte $2F   ; 
- D 0 - I - 0x031787 0C:9777: 10        .byte $10   ; 
- D 0 - I - 0x031788 0C:9778: 79        .byte $79   ; <y>
- D 0 - I - 0x031789 0C:9779: FC        .byte $FC   ; 
- D 0 - I - 0x03178A 0C:977A: F0        .byte $F0   ; 
- D 0 - I - 0x03178B 0C:977B: 01        .byte $01   ; 
- D 0 - I - 0x03178C 0C:977C: 61        .byte $61   ; <a>
- D 0 - I - 0x03178D 0C:977D: 05        .byte $05   ; 
- D 0 - I - 0x03178E 0C:977E: 7C        .byte $7C   ; 
- D 0 - I - 0x03178F 0C:977F: 2F        .byte $2F   ; 
- D 0 - I - 0x031790 0C:9780: 14        .byte $14   ; 
- D 0 - I - 0x031791 0C:9781: 79        .byte $79   ; <y>
- D 0 - I - 0x031792 0C:9782: FC        .byte $FC   ; 
- - - - - - 0x031793 0C:9783: 01        .byte $01   ; 
- D 0 - I - 0x031794 0C:9784: 0F        .byte $0F   ; 
- D 0 - I - 0x031795 0C:9785: 2A        .byte $2A   ; 
- D 0 - I - 0x031796 0C:9786: 2D        .byte $2D   ; 
- D 0 - I - 0x031797 0C:9787: 00        .byte $00   ; 
- D 0 - I - 0x031798 0C:9788: E4        .byte $E4   ; 
- D 0 - I - 0x031799 0C:9789: A0        .byte $A0   ; 
- D 0 - I - 0x03179A 0C:978A: FC        .byte $FC   ; 
- - - - - - 0x03179B 0C:978B: 01        .byte $01   ; 
- D 0 - I - 0x03179C 0C:978C: 18        .byte $18   ; 
- D 0 - I - 0x03179D 0C:978D: A6        .byte $A6   ; 
- D 0 - I - 0x03179E 0C:978E: 0A        .byte $0A   ; 
- D 0 - I - 0x03179F 0C:978F: 20        .byte $20   ; 
- D 0 - I - 0x0317A0 0C:9790: 16        .byte $16   ; 
- D 0 - I - 0x0317A1 0C:9791: 00        .byte $00   ; 
- D 0 - I - 0x0317A2 0C:9792: 07        .byte $07   ; 
- D 0 - I - 0x0317A3 0C:9793: 10        .byte $10   ; 
- D 0 - I - 0x0317A4 0C:9794: 79        .byte $79   ; <y>
- D 0 - I - 0x0317A5 0C:9795: FC        .byte $FC   ; 
- D 0 - I - 0x0317A6 0C:9796: F0        .byte $F0   ; 
- D 0 - I - 0x0317A7 0C:9797: 01        .byte $01   ; 
- D 0 - I - 0x0317A8 0C:9798: 52        .byte $52   ; <R>
- D 0 - I - 0x0317A9 0C:9799: F6        .byte $F6   ; 
- D 0 - I - 0x0317AA 0C:979A: D1        .byte $D1   ; 
- D 0 - I - 0x0317AB 0C:979B: 4D        .byte $4D   ; <M>
- D 0 - I - 0x0317AC 0C:979C: 54        .byte $54   ; <T>
- D 0 - I - 0x0317AD 0C:979D: 16        .byte $16   ; 
- D 0 - I - 0x0317AE 0C:979E: 00        .byte $00   ; 
- D 0 - I - 0x0317AF 0C:979F: 01        .byte $01   ; 
- D 0 - I - 0x0317B0 0C:97A0: 10        .byte $10   ; 
- D 0 - I - 0x0317B1 0C:97A1: 2F        .byte $2F   ; 
- D 0 - I - 0x0317B2 0C:97A2: 13        .byte $13   ; 
- D 0 - I - 0x0317B3 0C:97A3: FC        .byte $FC   ; 
- - - - - - 0x0317B4 0C:97A4: 01        .byte $01   ; 
- D 0 - I - 0x0317B5 0C:97A5: F5        .byte $F5   ; 
- D 0 - I - 0x0317B6 0C:97A6: A0        .byte $A0   ; 
- D 0 - I - 0x0317B7 0C:97A7: 00        .byte $00   ; 
- D 0 - I - 0x0317B8 0C:97A8: 1A        .byte $1A   ; 
- D 0 - I - 0x0317B9 0C:97A9: 2A        .byte $2A   ; 
- D 0 - I - 0x0317BA 0C:97AA: 12        .byte $12   ; 
- D 0 - I - 0x0317BB 0C:97AB: 0C        .byte $0C   ; 
- D 0 - I - 0x0317BC 0C:97AC: 10        .byte $10   ; 
- D 0 - I - 0x0317BD 0C:97AD: 2F        .byte $2F   ; 
- D 0 - I - 0x0317BE 0C:97AE: 79        .byte $79   ; <y>
- D 0 - I - 0x0317BF 0C:97AF: FC        .byte $FC   ; 
- D 0 - I - 0x0317C0 0C:97B0: 2D        .byte $2D   ; 
- D 0 - I - 0x0317C1 0C:97B1: 52        .byte $52   ; <R>
- D 0 - I - 0x0317C2 0C:97B2: 0D        .byte $0D   ; 
- D 0 - I - 0x0317C3 0C:97B3: 3F        .byte $3F   ; 
- D 0 - I - 0x0317C4 0C:97B4: 0D        .byte $0D   ; 
- D 0 - I - 0x0317C5 0C:97B5: A4        .byte $A4   ; 
- D 0 - I - 0x0317C6 0C:97B6: 02        .byte $02   ; 
- D 0 - I - 0x0317C7 0C:97B7: FC        .byte $FC   ; 
- - - - - - 0x0317C8 0C:97B8: 08        .byte $08   ; 
- D 0 - I - 0x0317C9 0C:97B9: F5        .byte $F5   ; 
- D 0 - I - 0x0317CA 0C:97BA: 19        .byte $19   ; 
- D 0 - I - 0x0317CB 0C:97BB: 00        .byte $00   ; 
- D 0 - I - 0x0317CC 0C:97BC: 02        .byte $02   ; 
- D 0 - I - 0x0317CD 0C:97BD: 28        .byte $28   ; 
- D 0 - I - 0x0317CE 0C:97BE: 32        .byte $32   ; <2>
- D 0 - I - 0x0317CF 0C:97BF: 08        .byte $08   ; 
- D 0 - I - 0x0317D0 0C:97C0: AA        .byte $AA   ; 
- D 0 - I - 0x0317D1 0C:97C1: 79        .byte $79   ; <y>
- D 0 - I - 0x0317D2 0C:97C2: FC        .byte $FC   ; 
- D 0 - I - 0x0317D3 0C:97C3: F0        .byte $F0   ; 
- D 0 - I - 0x0317D4 0C:97C4: 01        .byte $01   ; 
- D 0 - I - 0x0317D5 0C:97C5: 51        .byte $51   ; <Q>
- D 0 - I - 0x0317D6 0C:97C6: ED        .byte $ED   ; 
- D 0 - I - 0x0317D7 0C:97C7: FC        .byte $FC   ; 
- - - - - - 0x0317D8 0C:97C8: 01        .byte $01   ; 
- D 0 - I - 0x0317D9 0C:97C9: F6        .byte $F6   ; 
- D 0 - I - 0x0317DA 0C:97CA: 2D        .byte $2D   ; 
- D 0 - I - 0x0317DB 0C:97CB: 00        .byte $00   ; 
- D 0 - I - 0x0317DC 0C:97CC: 1F        .byte $1F   ; 
- D 0 - I - 0x0317DD 0C:97CD: 23        .byte $23   ; 
- D 0 - I - 0x0317DE 0C:97CE: 2F        .byte $2F   ; 
- D 0 - I - 0x0317DF 0C:97CF: 10        .byte $10   ; 
- D 0 - I - 0x0317E0 0C:97D0: 79        .byte $79   ; <y>
- D 0 - I - 0x0317E1 0C:97D1: FC        .byte $FC   ; 
- D 0 - I - 0x0317E2 0C:97D2: F0        .byte $F0   ; 
- D 0 - I - 0x0317E3 0C:97D3: 01        .byte $01   ; 
- D 0 - I - 0x0317E4 0C:97D4: 42        .byte $42   ; <B>
- D 0 - I - 0x0317E5 0C:97D5: 0A        .byte $0A   ; 
- D 0 - I - 0x0317E6 0C:97D6: B3        .byte $B3   ; 
- D 0 - I - 0x0317E7 0C:97D7: 2A        .byte $2A   ; 
- D 0 - I - 0x0317E8 0C:97D8: BE        .byte $BE   ; 
- D 0 - I - 0x0317E9 0C:97D9: 5F        .byte $5F   ; 
- D 0 - I - 0x0317EA 0C:97DA: 16        .byte $16   ; 
- D 0 - I - 0x0317EB 0C:97DB: 00        .byte $00   ; 
- D 0 - I - 0x0317EC 0C:97DC: 15        .byte $15   ; 
- D 0 - I - 0x0317ED 0C:97DD: 2F        .byte $2F   ; 
- D 0 - I - 0x0317EE 0C:97DE: 10        .byte $10   ; 
- D 0 - I - 0x0317EF 0C:97DF: F7        .byte $F7   ; 
- D 0 - I - 0x0317F0 0C:97E0: 02        .byte $02   ; 
- D 0 - I - 0x0317F1 0C:97E1: 79        .byte $79   ; <y>
- D 0 - I - 0x0317F2 0C:97E2: FC        .byte $FC   ; 
- D 0 - I - 0x0317F3 0C:97E3: F0        .byte $F0   ; 
- D 0 - I - 0x0317F4 0C:97E4: 01        .byte $01   ; 
- D 0 - I - 0x0317F5 0C:97E5: 52        .byte $52   ; <R>
- D 0 - I - 0x0317F6 0C:97E6: 46        .byte $46   ; <F>
- D 0 - I - 0x0317F7 0C:97E7: C6        .byte $C6   ; 
- D 0 - I - 0x0317F8 0C:97E8: 16        .byte $16   ; 
- D 0 - I - 0x0317F9 0C:97E9: 00        .byte $00   ; 
- D 0 - I - 0x0317FA 0C:97EA: 01        .byte $01   ; 
- D 0 - I - 0x0317FB 0C:97EB: 10        .byte $10   ; 
- D 0 - I - 0x0317FC 0C:97EC: 2F        .byte $2F   ; 
- D 0 - I - 0x0317FD 0C:97ED: 13        .byte $13   ; 
- D 0 - I - 0x0317FE 0C:97EE: FC        .byte $FC   ; 
- - - - - - 0x0317FF 0C:97EF: 01        .byte $01   ; 
- D 0 - I - 0x031800 0C:97F0: 02        .byte $02   ; 
- D 0 - I - 0x031801 0C:97F1: 07        .byte $07   ; 
- D 0 - I - 0x031802 0C:97F2: 05        .byte $05   ; 
- D 0 - I - 0x031803 0C:97F3: 02        .byte $02   ; 
- D 0 - I - 0x031804 0C:97F4: 1A        .byte $1A   ; 
- D 0 - I - 0x031805 0C:97F5: 00        .byte $00   ; 
- D 0 - I - 0x031806 0C:97F6: 26        .byte $26   ; 
- D 0 - I - 0x031807 0C:97F7: 2C        .byte $2C   ; 
- D 0 - I - 0x031808 0C:97F8: 1F        .byte $1F   ; 
- D 0 - I - 0x031809 0C:97F9: 2F        .byte $2F   ; 
- D 0 - I - 0x03180A 0C:97FA: 10        .byte $10   ; 
- D 0 - I - 0x03180B 0C:97FB: 79        .byte $79   ; <y>
- D 0 - I - 0x03180C 0C:97FC: FC        .byte $FC   ; 
- D 0 - I - 0x03180D 0C:97FD: F0        .byte $F0   ; 
- D 0 - I - 0x03180E 0C:97FE: 01        .byte $01   ; 
- D 0 - I - 0x03180F 0C:97FF: 41        .byte $41   ; <A>
- D 0 - I - 0x031810 0C:9800: 46        .byte $46   ; <F>
- D 0 - I - 0x031811 0C:9801: C6        .byte $C6   ; 
- D 0 - I - 0x031812 0C:9802: 1A        .byte $1A   ; 
- D 0 - I - 0x031813 0C:9803: 4C        .byte $4C   ; <L>
- D 0 - I - 0x031814 0C:9804: 71        .byte $71   ; <q>
- D 0 - I - 0x031815 0C:9805: 7D        .byte $7D   ; 
- D 0 - I - 0x031816 0C:9806: 54        .byte $54   ; <T>
- D 0 - I - 0x031817 0C:9807: 2D        .byte $2D   ; 
- D 0 - I - 0x031818 0C:9808: 1C        .byte $1C   ; 
- D 0 - I - 0x031819 0C:9809: 0E        .byte $0E   ; 
- D 0 - I - 0x03181A 0C:980A: A3        .byte $A3   ; 
- D 0 - I - 0x03181B 0C:980B: 15        .byte $15   ; 
- D 0 - I - 0x03181C 0C:980C: 02        .byte $02   ; 
- D 0 - I - 0x03181D 0C:980D: 79        .byte $79   ; <y>
- D 0 - I - 0x03181E 0C:980E: FC        .byte $FC   ; 
- D 0 - I - 0x03181F 0C:980F: F0        .byte $F0   ; 
- D 0 - I - 0x031820 0C:9810: F4        .byte $F4   ; 
- D 0 - I - 0x031821 0C:9811: 01        .byte $01   ; 
- D 0 - I - 0x031822 0C:9812: 16        .byte $16   ; 
- D 0 - I - 0x031823 0C:9813: 98        .byte $98   ; 
- D 0 - I - 0x031824 0C:9814: 24        .byte $24   ; 
- D 0 - I - 0x031825 0C:9815: 98        .byte $98   ; 
- D 0 - I - 0x031826 0C:9816: 01        .byte $01   ; 
- D 0 - I - 0x031827 0C:9817: 12        .byte $12   ; 
- D 0 - I - 0x031828 0C:9818: EE        .byte $EE   ; 
- D 0 - I - 0x031829 0C:9819: FC        .byte $FC   ; 
- - - - - - 0x03182A 0C:981A: 01        .byte $01   ; 
- D 0 - I - 0x03182B 0C:981B: 21        .byte $21   ; 
- D 0 - I - 0x03182C 0C:981C: 06        .byte $06   ; 
- D 0 - I - 0x03182D 0C:981D: 2F        .byte $2F   ; 
- D 0 - I - 0x03182E 0C:981E: 13        .byte $13   ; 
- D 0 - I - 0x03182F 0C:981F: 07        .byte $07   ; 
- D 0 - I - 0x031830 0C:9820: 10        .byte $10   ; 
- D 0 - I - 0x031831 0C:9821: 79        .byte $79   ; <y>
- D 0 - I - 0x031832 0C:9822: FC        .byte $FC   ; 
- D 0 - I - 0x031833 0C:9823: F0        .byte $F0   ; 
- D 0 - I - 0x031834 0C:9824: 01        .byte $01   ; 
- D 0 - I - 0x031835 0C:9825: 12        .byte $12   ; 
- D 0 - I - 0x031836 0C:9826: EE        .byte $EE   ; 
- D 0 - I - 0x031837 0C:9827: FC        .byte $FC   ; 
- - - - - - 0x031838 0C:9828: 01        .byte $01   ; 
- D 0 - I - 0x031839 0C:9829: 21        .byte $21   ; 
- D 0 - I - 0x03183A 0C:982A: 06        .byte $06   ; 
- D 0 - I - 0x03183B 0C:982B: 2F        .byte $2F   ; 
- D 0 - I - 0x03183C 0C:982C: 13        .byte $13   ; 
- D 0 - I - 0x03183D 0C:982D: 02        .byte $02   ; 
- D 0 - I - 0x03183E 0C:982E: 2F        .byte $2F   ; 
- D 0 - I - 0x03183F 0C:982F: 10        .byte $10   ; 
- D 0 - I - 0x031840 0C:9830: 79        .byte $79   ; <y>
- D 0 - I - 0x031841 0C:9831: FC        .byte $FC   ; 
- D 0 - I - 0x031842 0C:9832: F0        .byte $F0   ; 
- D 0 - I - 0x031843 0C:9833: 01        .byte $01   ; 
- D 0 - I - 0x031844 0C:9834: 12        .byte $12   ; 
- D 0 - I - 0x031845 0C:9835: EE        .byte $EE   ; 
- D 0 - I - 0x031846 0C:9836: FC        .byte $FC   ; 
- - - - - - 0x031847 0C:9837: 01        .byte $01   ; 
- D 0 - I - 0x031848 0C:9838: 46        .byte $46   ; <F>
- D 0 - I - 0x031849 0C:9839: 6F        .byte $6F   ; <o>
- D 0 - I - 0x03184A 0C:983A: 54        .byte $54   ; <T>
- D 0 - I - 0x03184B 0C:983B: 16        .byte $16   ; 
- D 0 - I - 0x03184C 0C:983C: 00        .byte $00   ; 
- D 0 - I - 0x03184D 0C:983D: 21        .byte $21   ; 
- D 0 - I - 0x03184E 0C:983E: 06        .byte $06   ; 
- D 0 - I - 0x03184F 0C:983F: 03        .byte $03   ; 
- D 0 - I - 0x031850 0C:9840: 79        .byte $79   ; <y>
- D 0 - I - 0x031851 0C:9841: FC        .byte $FC   ; 
- D 0 - I - 0x031852 0C:9842: F0        .byte $F0   ; 
- D 0 - I - 0x031853 0C:9843: 01        .byte $01   ; 
- D 0 - I - 0x031854 0C:9844: 12        .byte $12   ; 
- D 0 - I - 0x031855 0C:9845: EE        .byte $EE   ; 
- D 0 - I - 0x031856 0C:9846: FC        .byte $FC   ; 
- - - - - - 0x031857 0C:9847: 01        .byte $01   ; 
- D 0 - I - 0x031858 0C:9848: E3        .byte $E3   ; 
- D 0 - I - 0x031859 0C:9849: 79        .byte $79   ; <y>
- D 0 - I - 0x03185A 0C:984A: FC        .byte $FC   ; 
- D 0 - I - 0x03185B 0C:984B: F0        .byte $F0   ; 
- D 0 - I - 0x03185C 0C:984C: 01        .byte $01   ; 
- D 0 - I - 0x03185D 0C:984D: 51        .byte $51   ; <Q>
- D 0 - I - 0x03185E 0C:984E: ED        .byte $ED   ; 
- D 0 - I - 0x03185F 0C:984F: FC        .byte $FC   ; 
- - - - - - 0x031860 0C:9850: 01        .byte $01   ; 
- D 0 - I - 0x031861 0C:9851: 0E        .byte $0E   ; 
- D 0 - I - 0x031862 0C:9852: 28        .byte $28   ; 
- D 0 - I - 0x031863 0C:9853: 01        .byte $01   ; 
- D 0 - I - 0x031864 0C:9854: 02        .byte $02   ; 
- D 0 - I - 0x031865 0C:9855: 16        .byte $16   ; 
- D 0 - I - 0x031866 0C:9856: 00        .byte $00   ; 
- D 0 - I - 0x031867 0C:9857: 02        .byte $02   ; 
- D 0 - I - 0x031868 0C:9858: 08        .byte $08   ; 
- D 0 - I - 0x031869 0C:9859: 79        .byte $79   ; <y>
- D 0 - I - 0x03186A 0C:985A: FC        .byte $FC   ; 
- D 0 - I - 0x03186B 0C:985B: F0        .byte $F0   ; 
- D 0 - I - 0x03186C 0C:985C: 01        .byte $01   ; 
- D 0 - I - 0x03186D 0C:985D: 51        .byte $51   ; <Q>
- D 0 - I - 0x03186E 0C:985E: EE        .byte $EE   ; 
- D 0 - I - 0x03186F 0C:985F: FC        .byte $FC   ; 
- - - - - - 0x031870 0C:9860: 01        .byte $01   ; 
- D 0 - I - 0x031871 0C:9861: 0E        .byte $0E   ; 
- D 0 - I - 0x031872 0C:9862: 28        .byte $28   ; 
- D 0 - I - 0x031873 0C:9863: 01        .byte $01   ; 
- D 0 - I - 0x031874 0C:9864: 02        .byte $02   ; 
- D 0 - I - 0x031875 0C:9865: 16        .byte $16   ; 
- D 0 - I - 0x031876 0C:9866: 00        .byte $00   ; 
- D 0 - I - 0x031877 0C:9867: 02        .byte $02   ; 
- D 0 - I - 0x031878 0C:9868: 08        .byte $08   ; 
- D 0 - I - 0x031879 0C:9869: 79        .byte $79   ; <y>
- D 0 - I - 0x03187A 0C:986A: FC        .byte $FC   ; 
- D 0 - I - 0x03187B 0C:986B: F0        .byte $F0   ; 
- D 0 - I - 0x03187C 0C:986C: 01        .byte $01   ; 
- D 0 - I - 0x03187D 0C:986D: 52        .byte $52   ; <R>
- D 0 - I - 0x03187E 0C:986E: EE        .byte $EE   ; 
- D 0 - I - 0x03187F 0C:986F: 23        .byte $23   ; 
- D 0 - I - 0x031880 0C:9870: FC        .byte $FC   ; 
- - - - - - 0x031881 0C:9871: 01        .byte $01   ; 
- D 0 - I - 0x031882 0C:9872: 0E        .byte $0E   ; 
- D 0 - I - 0x031883 0C:9873: 28        .byte $28   ; 
- D 0 - I - 0x031884 0C:9874: 01        .byte $01   ; 
- D 0 - I - 0x031885 0C:9875: 03        .byte $03   ; 
- D 0 - I - 0x031886 0C:9876: 79        .byte $79   ; <y>
- D 0 - I - 0x031887 0C:9877: 79        .byte $79   ; <y>
- D 0 - I - 0x031888 0C:9878: FC        .byte $FC   ; 
- D 0 - I - 0x031889 0C:9879: F0        .byte $F0   ; 
- D 0 - I - 0x03188A 0C:987A: 01        .byte $01   ; 
- D 0 - I - 0x03188B 0C:987B: 6C        .byte $6C   ; <l>
- D 0 - I - 0x03188C 0C:987C: 05        .byte $05   ; 
- D 0 - I - 0x03188D 0C:987D: 7C        .byte $7C   ; 
- D 0 - I - 0x03188E 0C:987E: 2F        .byte $2F   ; 
- D 0 - I - 0x03188F 0C:987F: 79        .byte $79   ; <y>
- D 0 - I - 0x031890 0C:9880: FC        .byte $FC   ; 
- - - - - - 0x031891 0C:9881: 01        .byte $01   ; 
- D 0 - I - 0x031892 0C:9882: EE        .byte $EE   ; 
- D 0 - I - 0x031893 0C:9883: 23        .byte $23   ; 
- D 0 - I - 0x031894 0C:9884: FC        .byte $FC   ; 
- - - - - - 0x031895 0C:9885: 01        .byte $01   ; 
- D 0 - I - 0x031896 0C:9886: 14        .byte $14   ; 
- D 0 - I - 0x031897 0C:9887: 2E        .byte $2E   ; 
- D 0 - I - 0x031898 0C:9888: AA        .byte $AA   ; 
- D 0 - I - 0x031899 0C:9889: F7        .byte $F7   ; 
- D 0 - I - 0x03189A 0C:988A: 02        .byte $02   ; 
- D 0 - I - 0x03189B 0C:988B: 79        .byte $79   ; <y>
- D 0 - I - 0x03189C 0C:988C: FC        .byte $FC   ; 
- D 0 - I - 0x03189D 0C:988D: F0        .byte $F0   ; 
- D 0 - I - 0x03189E 0C:988E: 01        .byte $01   ; 
- D 0 - I - 0x03189F 0C:988F: 51        .byte $51   ; <Q>
- D 0 - I - 0x0318A0 0C:9890: EE        .byte $EE   ; 
- D 0 - I - 0x0318A1 0C:9891: 23        .byte $23   ; 
- D 0 - I - 0x0318A2 0C:9892: FC        .byte $FC   ; 
- - - - - - 0x0318A3 0C:9893: 01        .byte $01   ; 
- D 0 - I - 0x0318A4 0C:9894: BA        .byte $BA   ; 
- D 0 - I - 0x0318A5 0C:9895: 70        .byte $70   ; <p>
- D 0 - I - 0x0318A6 0C:9896: 6E        .byte $6E   ; <n>
- D 0 - I - 0x0318A7 0C:9897: CF        .byte $CF   ; 
- D 0 - I - 0x0318A8 0C:9898: 79        .byte $79   ; <y>
- D 0 - I - 0x0318A9 0C:9899: FC        .byte $FC   ; 
- D 0 - I - 0x0318AA 0C:989A: F0        .byte $F0   ; 
- D 0 - I - 0x0318AB 0C:989B: 01        .byte $01   ; 
- D 0 - I - 0x0318AC 0C:989C: 52        .byte $52   ; <R>
- D 0 - I - 0x0318AD 0C:989D: EE        .byte $EE   ; 
- D 0 - I - 0x0318AE 0C:989E: FC        .byte $FC   ; 
- - - - - - 0x0318AF 0C:989F: 04        .byte $04   ; 
- D 0 - I - 0x0318B0 0C:98A0: E3        .byte $E3   ; 
- D 0 - I - 0x0318B1 0C:98A1: 79        .byte $79   ; <y>
- D 0 - I - 0x0318B2 0C:98A2: FC        .byte $FC   ; 
- D 0 - I - 0x0318B3 0C:98A3: F0        .byte $F0   ; 
- D 0 - I - 0x0318B4 0C:98A4: 01        .byte $01   ; 
- D 0 - I - 0x0318B5 0C:98A5: 51        .byte $51   ; <Q>
- D 0 - I - 0x0318B6 0C:98A6: EE        .byte $EE   ; 
- D 0 - I - 0x0318B7 0C:98A7: FC        .byte $FC   ; 
- - - - - - 0x0318B8 0C:98A8: 01        .byte $01   ; 
- D 0 - I - 0x0318B9 0C:98A9: 0E        .byte $0E   ; 
- D 0 - I - 0x0318BA 0C:98AA: 28        .byte $28   ; 
- D 0 - I - 0x0318BB 0C:98AB: 01        .byte $01   ; 
- D 0 - I - 0x0318BC 0C:98AC: 02        .byte $02   ; 
- D 0 - I - 0x0318BD 0C:98AD: 16        .byte $16   ; 
- D 0 - I - 0x0318BE 0C:98AE: 00        .byte $00   ; 
- D 0 - I - 0x0318BF 0C:98AF: 02        .byte $02   ; 
- D 0 - I - 0x0318C0 0C:98B0: 08        .byte $08   ; 
- D 0 - I - 0x0318C1 0C:98B1: 79        .byte $79   ; <y>
- D 0 - I - 0x0318C2 0C:98B2: FC        .byte $FC   ; 
- D 0 - I - 0x0318C3 0C:98B3: F0        .byte $F0   ; 
- D 0 - I - 0x0318C4 0C:98B4: 01        .byte $01   ; 
- D 0 - I - 0x0318C5 0C:98B5: 51        .byte $51   ; <Q>
- D 0 - I - 0x0318C6 0C:98B6: EE        .byte $EE   ; 
- D 0 - I - 0x0318C7 0C:98B7: A0        .byte $A0   ; 
- D 0 - I - 0x0318C8 0C:98B8: FC        .byte $FC   ; 
- - - - - - 0x0318C9 0C:98B9: 01        .byte $01   ; 
- D 0 - I - 0x0318CA 0C:98BA: 21        .byte $21   ; 
- D 0 - I - 0x0318CB 0C:98BB: 06        .byte $06   ; 
- D 0 - I - 0x0318CC 0C:98BC: 2F        .byte $2F   ; 
- D 0 - I - 0x0318CD 0C:98BD: 10        .byte $10   ; 
- D 0 - I - 0x0318CE 0C:98BE: 79        .byte $79   ; <y>
- D 0 - I - 0x0318CF 0C:98BF: FC        .byte $FC   ; 
- D 0 - I - 0x0318D0 0C:98C0: F0        .byte $F0   ; 
- D 0 - I - 0x0318D1 0C:98C1: 01        .byte $01   ; 
- D 0 - I - 0x0318D2 0C:98C2: 52        .byte $52   ; <R>
- D 0 - I - 0x0318D3 0C:98C3: EE        .byte $EE   ; 
- D 0 - I - 0x0318D4 0C:98C4: 23        .byte $23   ; 
- D 0 - I - 0x0318D5 0C:98C5: FC        .byte $FC   ; 
- - - - - - 0x0318D6 0C:98C6: 01        .byte $01   ; 
- D 0 - I - 0x0318D7 0C:98C7: 21        .byte $21   ; 
- D 0 - I - 0x0318D8 0C:98C8: 06        .byte $06   ; 
- D 0 - I - 0x0318D9 0C:98C9: 2F        .byte $2F   ; 
- D 0 - I - 0x0318DA 0C:98CA: 10        .byte $10   ; 
- D 0 - I - 0x0318DB 0C:98CB: 7D        .byte $7D   ; 
- D 0 - I - 0x0318DC 0C:98CC: 79        .byte $79   ; <y>
- D 0 - I - 0x0318DD 0C:98CD: FC        .byte $FC   ; 
- D 0 - I - 0x0318DE 0C:98CE: F0        .byte $F0   ; 
- D 0 - I - 0x0318DF 0C:98CF: 01        .byte $01   ; 
- D 0 - I - 0x0318E0 0C:98D0: 6C        .byte $6C   ; <l>
- D 0 - I - 0x0318E1 0C:98D1: 05        .byte $05   ; 
- D 0 - I - 0x0318E2 0C:98D2: 7C        .byte $7C   ; 
- D 0 - I - 0x0318E3 0C:98D3: 2F        .byte $2F   ; 
- D 0 - I - 0x0318E4 0C:98D4: 14        .byte $14   ; 
- D 0 - I - 0x0318E5 0C:98D5: 79        .byte $79   ; <y>
- D 0 - I - 0x0318E6 0C:98D6: FC        .byte $FC   ; 
- - - - - - 0x0318E7 0C:98D7: 01        .byte $01   ; 
- D 0 - I - 0x0318E8 0C:98D8: EE        .byte $EE   ; 
- D 0 - I - 0x0318E9 0C:98D9: 23        .byte $23   ; 
- D 0 - I - 0x0318EA 0C:98DA: FC        .byte $FC   ; 
- - - - - - 0x0318EB 0C:98DB: 01        .byte $01   ; 
- D 0 - I - 0x0318EC 0C:98DC: 0E        .byte $0E   ; 
- D 0 - I - 0x0318ED 0C:98DD: 28        .byte $28   ; 
- D 0 - I - 0x0318EE 0C:98DE: 01        .byte $01   ; 
- D 0 - I - 0x0318EF 0C:98DF: 02        .byte $02   ; 
- D 0 - I - 0x0318F0 0C:98E0: 16        .byte $16   ; 
- D 0 - I - 0x0318F1 0C:98E1: 00        .byte $00   ; 
- D 0 - I - 0x0318F2 0C:98E2: 02        .byte $02   ; 
- D 0 - I - 0x0318F3 0C:98E3: 08        .byte $08   ; 
- D 0 - I - 0x0318F4 0C:98E4: 79        .byte $79   ; <y>
- D 0 - I - 0x0318F5 0C:98E5: FC        .byte $FC   ; 
- D 0 - I - 0x0318F6 0C:98E6: F0        .byte $F0   ; 
- D 0 - I - 0x0318F7 0C:98E7: 01        .byte $01   ; 
- D 0 - I - 0x0318F8 0C:98E8: 51        .byte $51   ; <Q>
- D 0 - I - 0x0318F9 0C:98E9: EE        .byte $EE   ; 
- D 0 - I - 0x0318FA 0C:98EA: 23        .byte $23   ; 
- D 0 - I - 0x0318FB 0C:98EB: FC        .byte $FC   ; 
- - - - - - 0x0318FC 0C:98EC: 01        .byte $01   ; 
- D 0 - I - 0x0318FD 0C:98ED: 02        .byte $02   ; 
- D 0 - I - 0x0318FE 0C:98EE: 2F        .byte $2F   ; 
- D 0 - I - 0x0318FF 0C:98EF: 10        .byte $10   ; 
- D 0 - I - 0x031900 0C:98F0: 7C        .byte $7C   ; 
- D 0 - I - 0x031901 0C:98F1: 79        .byte $79   ; <y>
- D 0 - I - 0x031902 0C:98F2: FC        .byte $FC   ; 
- D 0 - I - 0x031903 0C:98F3: F0        .byte $F0   ; 
- D 0 - I - 0x031904 0C:98F4: 01        .byte $01   ; 
- D 0 - I - 0x031905 0C:98F5: 22        .byte $22   ; 
- D 0 - I - 0x031906 0C:98F6: E4        .byte $E4   ; 
- D 0 - I - 0x031907 0C:98F7: FC        .byte $FC   ; 
- - - - - - 0x031908 0C:98F8: 08        .byte $08   ; 
- D 0 - I - 0x031909 0C:98F9: 07        .byte $07   ; 
- D 0 - I - 0x03190A 0C:98FA: 2C        .byte $2C   ; 
- D 0 - I - 0x03190B 0C:98FB: AE        .byte $AE   ; 
- D 0 - I - 0x03190C 0C:98FC: 02        .byte $02   ; 
- D 0 - I - 0x03190D 0C:98FD: 14        .byte $14   ; 
- D 0 - I - 0x03190E 0C:98FE: 0A        .byte $0A   ; 
- D 0 - I - 0x03190F 0C:98FF: 2B        .byte $2B   ; 
- D 0 - I - 0x031910 0C:9900: AD        .byte $AD   ; 
- D 0 - I - 0x031911 0C:9901: FC        .byte $FC   ; 
- - - - - - 0x031912 0C:9902: 01        .byte $01   ; 
- D 0 - I - 0x031913 0C:9903: 06        .byte $06   ; 
- D 0 - I - 0x031914 0C:9904: 2C        .byte $2C   ; 
- D 0 - I - 0x031915 0C:9905: 0C        .byte $0C   ; 
- D 0 - I - 0x031916 0C:9906: 10        .byte $10   ; 
- D 0 - I - 0x031917 0C:9907: 2F        .byte $2F   ; 
- D 0 - I - 0x031918 0C:9908: 79        .byte $79   ; <y>
- D 0 - I - 0x031919 0C:9909: FC        .byte $FC   ; 
- D 0 - I - 0x03191A 0C:990A: F0        .byte $F0   ; 
- D 0 - I - 0x03191B 0C:990B: 01        .byte $01   ; 
- D 0 - I - 0x03191C 0C:990C: 12        .byte $12   ; 
- D 0 - I - 0x03191D 0C:990D: E4        .byte $E4   ; 
- D 0 - I - 0x03191E 0C:990E: FC        .byte $FC   ; 
- - - - - - 0x03191F 0C:990F: 08        .byte $08   ; 
- D 0 - I - 0x031920 0C:9910: 06        .byte $06   ; 
- D 0 - I - 0x031921 0C:9911: 2C        .byte $2C   ; 
- D 0 - I - 0x031922 0C:9912: 0C        .byte $0C   ; 
- D 0 - I - 0x031923 0C:9913: 10        .byte $10   ; 
- D 0 - I - 0x031924 0C:9914: 79        .byte $79   ; <y>
- D 0 - I - 0x031925 0C:9915: FC        .byte $FC   ; 
- D 0 - I - 0x031926 0C:9916: F0        .byte $F0   ; 
- D 0 - I - 0x031927 0C:9917: F2        .byte $F2   ; 
- D 0 - I - 0x031928 0C:9918: 01        .byte $01   ; 
- D 0 - I - 0x031929 0C:9919: 51        .byte $51   ; <Q>
- D 0 - I - 0x03192A 0C:991A: E4        .byte $E4   ; 
- D 0 - I - 0x03192B 0C:991B: FC        .byte $FC   ; 
- - - - - - 0x03192C 0C:991C: 04        .byte $04   ; 
- D 0 - I - 0x03192D 0C:991D: E2        .byte $E2   ; 
- D 0 - I - 0x03192E 0C:991E: 79        .byte $79   ; <y>
- D 0 - I - 0x03192F 0C:991F: FC        .byte $FC   ; 
- D 0 - I - 0x031930 0C:9920: F0        .byte $F0   ; 
- D 0 - I - 0x031931 0C:9921: 01        .byte $01   ; 
- D 0 - I - 0x031932 0C:9922: 10        .byte $10   ; 
- D 0 - I - 0x031933 0C:9923: E4        .byte $E4   ; 
- D 0 - I - 0x031934 0C:9924: FC        .byte $FC   ; 
- - - - - - 0x031935 0C:9925: 01        .byte $01   ; 
- D 0 - I - 0x031936 0C:9926: BA        .byte $BA   ; 
- D 0 - I - 0x031937 0C:9927: 70        .byte $70   ; <p>
- D 0 - I - 0x031938 0C:9928: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031939 0C:9929: CF        .byte $CF   ; 
- D 0 - I - 0x03193A 0C:992A: 79        .byte $79   ; <y>
- D 0 - I - 0x03193B 0C:992B: FC        .byte $FC   ; 
- D 0 - I - 0x03193C 0C:992C: F0        .byte $F0   ; 
- D 0 - I - 0x03193D 0C:992D: F2        .byte $F2   ; 
- D 0 - I - 0x03193E 0C:992E: 01        .byte $01   ; 
- D 0 - I - 0x03193F 0C:992F: 5C        .byte $5C   ; 
- D 0 - I - 0x031940 0C:9930: E4        .byte $E4   ; 
- D 0 - I - 0x031941 0C:9931: 19        .byte $19   ; 
- D 0 - I - 0x031942 0C:9932: FC        .byte $FC   ; 
- - - - - - 0x031943 0C:9933: 01        .byte $01   ; 
- D 0 - I - 0x031944 0C:9934: E0        .byte $E0   ; 
- D 0 - I - 0x031945 0C:9935: 79        .byte $79   ; <y>
- D 0 - I - 0x031946 0C:9936: FC        .byte $FC   ; 
- D 0 - I - 0x031947 0C:9937: F0        .byte $F0   ; 
- D 0 - I - 0x031948 0C:9938: 01        .byte $01   ; 
- D 0 - I - 0x031949 0C:9939: E0        .byte $E0   ; 
- D 0 - I - 0x03194A 0C:993A: 03        .byte $03   ; 
- D 0 - I - 0x03194B 0C:993B: 15        .byte $15   ; 
- D 0 - I - 0x03194C 0C:993C: 2A        .byte $2A   ; 
- D 0 - I - 0x03194D 0C:993D: 79        .byte $79   ; <y>
- D 0 - I - 0x03194E 0C:993E: FC        .byte $FC   ; 
- - - - - - 0x03194F 0C:993F: 04        .byte $04   ; 
- D 0 - I - 0x031950 0C:9940: 0A        .byte $0A   ; 
- D 0 - I - 0x031951 0C:9941: 2A        .byte $2A   ; 
- D 0 - I - 0x031952 0C:9942: A0        .byte $A0   ; 
- D 0 - I - 0x031953 0C:9943: 79        .byte $79   ; <y>
- D 0 - I - 0x031954 0C:9944: FC        .byte $FC   ; 
- - - - - - 0x031955 0C:9945: 04        .byte $04   ; 
- D 0 - I - 0x031956 0C:9946: E0        .byte $E0   ; 
- D 0 - I - 0x031957 0C:9947: AA        .byte $AA   ; 
- D 0 - I - 0x031958 0C:9948: 7D        .byte $7D   ; 
- D 0 - I - 0x031959 0C:9949: 7D        .byte $7D   ; 
- D 0 - I - 0x03195A 0C:994A: 79        .byte $79   ; <y>
- D 0 - I - 0x03195B 0C:994B: 79        .byte $79   ; <y>
- D 0 - I - 0x03195C 0C:994C: FC        .byte $FC   ; 
- D 0 - I - 0x03195D 0C:994D: F0        .byte $F0   ; 
- D 0 - I - 0x03195E 0C:994E: 01        .byte $01   ; 
- D 0 - I - 0x03195F 0C:994F: D0        .byte $D0   ; 
- D 0 - I - 0x031960 0C:9950: 6C        .byte $6C   ; <l>
- D 0 - I - 0x031961 0C:9951: 4C        .byte $4C   ; <L>
- D 0 - I - 0x031962 0C:9952: 27        .byte $27   ; 
- D 0 - I - 0x031963 0C:9953: 19        .byte $19   ; 
- D 0 - I - 0x031964 0C:9954: 00        .byte $00   ; 
- D 0 - I - 0x031965 0C:9955: 11        .byte $11   ; 
- D 0 - I - 0x031966 0C:9956: 06        .byte $06   ; 
- D 0 - I - 0x031967 0C:9957: 27        .byte $27   ; 
- D 0 - I - 0x031968 0C:9958: 2D        .byte $2D   ; 
- D 0 - I - 0x031969 0C:9959: FC        .byte $FC   ; 
- - - - - - 0x03196A 0C:995A: 01        .byte $01   ; 
- D 0 - I - 0x03196B 0C:995B: 20        .byte $20   ; 
- D 0 - I - 0x03196C 0C:995C: 0E        .byte $0E   ; 
- D 0 - I - 0x03196D 0C:995D: 13        .byte $13   ; 
- D 0 - I - 0x03196E 0C:995E: 24        .byte $24   ; 
- D 0 - I - 0x03196F 0C:995F: 29        .byte $29   ; 
- D 0 - I - 0x031970 0C:9960: F8        .byte $F8   ; 
- D 0 - I - 0x031971 0C:9961: FC        .byte $FC   ; 
- D 0 - I - 0x031972 0C:9962: F0        .byte $F0   ; 
- D 0 - I - 0x031973 0C:9963: 01        .byte $01   ; 
- D 0 - I - 0x031974 0C:9964: 52        .byte $52   ; <R>
- D 0 - I - 0x031975 0C:9965: E4        .byte $E4   ; 
- D 0 - I - 0x031976 0C:9966: FC        .byte $FC   ; 
- - - - - - 0x031977 0C:9967: 01        .byte $01   ; 
- D 0 - I - 0x031978 0C:9968: F5        .byte $F5   ; 
- D 0 - I - 0x031979 0C:9969: 16        .byte $16   ; 
- D 0 - I - 0x03197A 0C:996A: 00        .byte $00   ; 
- D 0 - I - 0x03197B 0C:996B: 21        .byte $21   ; 
- D 0 - I - 0x03197C 0C:996C: 06        .byte $06   ; 
- D 0 - I - 0x03197D 0C:996D: 2F        .byte $2F   ; 
- D 0 - I - 0x03197E 0C:996E: 13        .byte $13   ; 
- D 0 - I - 0x03197F 0C:996F: 02        .byte $02   ; 
- D 0 - I - 0x031980 0C:9970: 2F        .byte $2F   ; 
- D 0 - I - 0x031981 0C:9971: 10        .byte $10   ; 
- D 0 - I - 0x031982 0C:9972: 79        .byte $79   ; <y>
- D 0 - I - 0x031983 0C:9973: FC        .byte $FC   ; 
- D 0 - I - 0x031984 0C:9974: F0        .byte $F0   ; 
- D 0 - I - 0x031985 0C:9975: 01        .byte $01   ; 
- D 0 - I - 0x031986 0C:9976: 52        .byte $52   ; <R>
- D 0 - I - 0x031987 0C:9977: E4        .byte $E4   ; 
- D 0 - I - 0x031988 0C:9978: FC        .byte $FC   ; 
- - - - - - 0x031989 0C:9979: 08        .byte $08   ; 
- D 0 - I - 0x03198A 0C:997A: E2        .byte $E2   ; 
- D 0 - I - 0x03198B 0C:997B: FC        .byte $FC   ; 
- D 0 - I - 0x03198C 0C:997C: F0        .byte $F0   ; 
- D 0 - I - 0x03198D 0C:997D: 01        .byte $01   ; 
- D 0 - I - 0x03198E 0C:997E: C0        .byte $C0   ; 
- D 0 - I - 0x03198F 0C:997F: 03        .byte $03   ; 
- D 0 - I - 0x031990 0C:9980: 2F        .byte $2F   ; 
- D 0 - I - 0x031991 0C:9981: 79        .byte $79   ; <y>
- D 0 - I - 0x031992 0C:9982: 00        .byte $00   ; 
- D 0 - I - 0x031993 0C:9983: 0C        .byte $0C   ; 
- D 0 - I - 0x031994 0C:9984: 2E        .byte $2E   ; 
- D 0 - I - 0x031995 0C:9985: A9        .byte $A9   ; 
- D 0 - I - 0x031996 0C:9986: 03        .byte $03   ; 
- D 0 - I - 0x031997 0C:9987: A0        .byte $A0   ; 
- D 0 - I - 0x031998 0C:9988: 3F        .byte $3F   ; 
- D 0 - I - 0x031999 0C:9989: 3F        .byte $3F   ; 
- D 0 - I - 0x03199A 0C:998A: 3F        .byte $3F   ; 
- D 0 - I - 0x03199B 0C:998B: FC        .byte $FC   ; 
- D 0 - I - 0x03199C 0C:998C: F0        .byte $F0   ; 
- D 0 - I - 0x03199D 0C:998D: 01        .byte $01   ; 
- D 0 - I - 0x03199E 0C:998E: 41        .byte $41   ; <A>
- D 0 - I - 0x03199F 0C:998F: AA        .byte $AA   ; 
- D 0 - I - 0x0319A0 0C:9990: A0        .byte $A0   ; 
- D 0 - I - 0x0319A1 0C:9991: 00        .byte $00   ; 
- D 0 - I - 0x0319A2 0C:9992: 0A        .byte $0A   ; 
- D 0 - I - 0x0319A3 0C:9993: B3        .byte $B3   ; 
- D 0 - I - 0x0319A4 0C:9994: 2A        .byte $2A   ; 
- D 0 - I - 0x0319A5 0C:9995: BE        .byte $BE   ; 
- D 0 - I - 0x0319A6 0C:9996: 5F        .byte $5F   ; 
- D 0 - I - 0x0319A7 0C:9997: 16        .byte $16   ; 
- D 0 - I - 0x0319A8 0C:9998: 15        .byte $15   ; 
- D 0 - I - 0x0319A9 0C:9999: 2F        .byte $2F   ; 
- D 0 - I - 0x0319AA 0C:999A: 10        .byte $10   ; 
- D 0 - I - 0x0319AB 0C:999B: 7C        .byte $7C   ; 
- D 0 - I - 0x0319AC 0C:999C: 79        .byte $79   ; <y>
- D 0 - I - 0x0319AD 0C:999D: FC        .byte $FC   ; 
- D 0 - I - 0x0319AE 0C:999E: F0        .byte $F0   ; 
- D 0 - I - 0x0319AF 0C:999F: 01        .byte $01   ; 
- D 0 - I - 0x0319B0 0C:99A0: 74        .byte $74   ; <t>
- D 0 - I - 0x0319B1 0C:99A1: E4        .byte $E4   ; 
- D 0 - I - 0x0319B2 0C:99A2: 19        .byte $19   ; 
- D 0 - I - 0x0319B3 0C:99A3: FC        .byte $FC   ; 
- - - - - - 0x0319B4 0C:99A4: 01        .byte $01   ; 
- D 0 - I - 0x0319B5 0C:99A5: E0        .byte $E0   ; 
- D 0 - I - 0x0319B6 0C:99A6: A0        .byte $A0   ; 
- D 0 - I - 0x0319B7 0C:99A7: FC        .byte $FC   ; 
- - - - - - 0x0319B8 0C:99A8: 01        .byte $01   ; 
- D 0 - I - 0x0319B9 0C:99A9: E5        .byte $E5   ; 
- D 0 - I - 0x0319BA 0C:99AA: 19        .byte $19   ; 
- D 0 - I - 0x0319BB 0C:99AB: F6        .byte $F6   ; 
- D 0 - I - 0x0319BC 0C:99AC: 16        .byte $16   ; 
- D 0 - I - 0x0319BD 0C:99AD: FC        .byte $FC   ; 
- - - - - - 0x0319BE 0C:99AE: 01        .byte $01   ; 
- D 0 - I - 0x0319BF 0C:99AF: 12        .byte $12   ; 
- D 0 - I - 0x0319C0 0C:99B0: 07        .byte $07   ; 
- D 0 - I - 0x0319C1 0C:99B1: 0B        .byte $0B   ; 
- D 0 - I - 0x0319C2 0C:99B2: 0B        .byte $0B   ; 
- D 0 - I - 0x0319C3 0C:99B3: 2F        .byte $2F   ; 
- D 0 - I - 0x0319C4 0C:99B4: 10        .byte $10   ; 
- D 0 - I - 0x0319C5 0C:99B5: 73        .byte $73   ; <s>
- D 0 - I - 0x0319C6 0C:99B6: F7        .byte $F7   ; 
- D 0 - I - 0x0319C7 0C:99B7: 02        .byte $02   ; 
- D 0 - I - 0x0319C8 0C:99B8: 79        .byte $79   ; <y>
- D 0 - I - 0x0319C9 0C:99B9: FC        .byte $FC   ; 
- D 0 - I - 0x0319CA 0C:99BA: F0        .byte $F0   ; 
- D 0 - I - 0x0319CB 0C:99BB: 01        .byte $01   ; 
- D 0 - I - 0x0319CC 0C:99BC: 73        .byte $73   ; <s>
- D 0 - I - 0x0319CD 0C:99BD: E4        .byte $E4   ; 
- D 0 - I - 0x0319CE 0C:99BE: 19        .byte $19   ; 
- D 0 - I - 0x0319CF 0C:99BF: FC        .byte $FC   ; 
- - - - - - 0x0319D0 0C:99C0: 01        .byte $01   ; 
- D 0 - I - 0x0319D1 0C:99C1: E0        .byte $E0   ; 
- D 0 - I - 0x0319D2 0C:99C2: 79        .byte $79   ; <y>
- D 0 - I - 0x0319D3 0C:99C3: FC        .byte $FC   ; 
- - - - - - 0x0319D4 0C:99C4: 01        .byte $01   ; 
- D 0 - I - 0x0319D5 0C:99C5: E5        .byte $E5   ; 
- D 0 - I - 0x0319D6 0C:99C6: 19        .byte $19   ; 
- D 0 - I - 0x0319D7 0C:99C7: F6        .byte $F6   ; 
- D 0 - I - 0x0319D8 0C:99C8: 16        .byte $16   ; 
- D 0 - I - 0x0319D9 0C:99C9: FC        .byte $FC   ; 
- - - - - - 0x0319DA 0C:99CA: 01        .byte $01   ; 
- D 0 - I - 0x0319DB 0C:99CB: 12        .byte $12   ; 
- D 0 - I - 0x0319DC 0C:99CC: 07        .byte $07   ; 
- D 0 - I - 0x0319DD 0C:99CD: 0B        .byte $0B   ; 
- D 0 - I - 0x0319DE 0C:99CE: 0B        .byte $0B   ; 
- D 0 - I - 0x0319DF 0C:99CF: 28        .byte $28   ; 
- D 0 - I - 0x0319E0 0C:99D0: 1F        .byte $1F   ; 
- D 0 - I - 0x0319E1 0C:99D1: 0C        .byte $0C   ; 
- D 0 - I - 0x0319E2 0C:99D2: 10        .byte $10   ; 
- D 0 - I - 0x0319E3 0C:99D3: 73        .byte $73   ; <s>
- D 0 - I - 0x0319E4 0C:99D4: F7        .byte $F7   ; 
- D 0 - I - 0x0319E5 0C:99D5: 03        .byte $03   ; 
- D 0 - I - 0x0319E6 0C:99D6: 79        .byte $79   ; <y>
- D 0 - I - 0x0319E7 0C:99D7: FC        .byte $FC   ; 
- D 0 - I - 0x0319E8 0C:99D8: F0        .byte $F0   ; 
- D 0 - I - 0x0319E9 0C:99D9: 01        .byte $01   ; 
- D 0 - I - 0x0319EA 0C:99DA: 74        .byte $74   ; <t>
- D 0 - I - 0x0319EB 0C:99DB: 01        .byte $01   ; 
- D 0 - I - 0x0319EC 0C:99DC: 01        .byte $01   ; 
- D 0 - I - 0x0319ED 0C:99DD: 2F        .byte $2F   ; 
- D 0 - I - 0x0319EE 0C:99DE: 79        .byte $79   ; <y>
- D 0 - I - 0x0319EF 0C:99DF: 00        .byte $00   ; 
- D 0 - I - 0x0319F0 0C:99E0: E4        .byte $E4   ; 
- D 0 - I - 0x0319F1 0C:99E1: 19        .byte $19   ; 
- D 0 - I - 0x0319F2 0C:99E2: FC        .byte $FC   ; 
- - - - - - 0x0319F3 0C:99E3: 01        .byte $01   ; 
- D 0 - I - 0x0319F4 0C:99E4: E0        .byte $E0   ; 
- D 0 - I - 0x0319F5 0C:99E5: 16        .byte $16   ; 
- D 0 - I - 0x0319F6 0C:99E6: FC        .byte $FC   ; 
- - - - - - 0x0319F7 0C:99E7: 01        .byte $01   ; 
- D 0 - I - 0x0319F8 0C:99E8: E5        .byte $E5   ; 
- D 0 - I - 0x0319F9 0C:99E9: F6        .byte $F6   ; 
- D 0 - I - 0x0319FA 0C:99EA: 1A        .byte $1A   ; 
- D 0 - I - 0x0319FB 0C:99EB: FC        .byte $FC   ; 
- - - - - - 0x0319FC 0C:99EC: 01        .byte $01   ; 
- D 0 - I - 0x0319FD 0C:99ED: 12        .byte $12   ; 
- D 0 - I - 0x0319FE 0C:99EE: 07        .byte $07   ; 
- D 0 - I - 0x0319FF 0C:99EF: 24        .byte $24   ; 
- D 0 - I - 0x031A00 0C:99F0: B1        .byte $B1   ; 
- D 0 - I - 0x031A01 0C:99F1: 27        .byte $27   ; 
- D 0 - I - 0x031A02 0C:99F2: 2A        .byte $2A   ; 
- D 0 - I - 0x031A03 0C:99F3: 10        .byte $10   ; 
- D 0 - I - 0x031A04 0C:99F4: 73        .byte $73   ; <s>
- D 0 - I - 0x031A05 0C:99F5: F7        .byte $F7   ; 
- D 0 - I - 0x031A06 0C:99F6: 03        .byte $03   ; 
- D 0 - I - 0x031A07 0C:99F7: 79        .byte $79   ; <y>
- D 0 - I - 0x031A08 0C:99F8: FC        .byte $FC   ; 
- D 0 - I - 0x031A09 0C:99F9: F0        .byte $F0   ; 
- D 0 - I - 0x031A0A 0C:99FA: 01        .byte $01   ; 
- D 0 - I - 0x031A0B 0C:99FB: 73        .byte $73   ; <s>
- D 0 - I - 0x031A0C 0C:99FC: 0D        .byte $0D   ; 
- D 0 - I - 0x031A0D 0C:99FD: A4        .byte $A4   ; 
- D 0 - I - 0x031A0E 0C:99FE: 7C        .byte $7C   ; 
- D 0 - I - 0x031A0F 0C:99FF: 02        .byte $02   ; 
- D 0 - I - 0x031A10 0C:9A00: 79        .byte $79   ; <y>
- D 0 - I - 0x031A11 0C:9A01: 00        .byte $00   ; 
- D 0 - I - 0x031A12 0C:9A02: E4        .byte $E4   ; 
- D 0 - I - 0x031A13 0C:9A03: 19        .byte $19   ; 
- D 0 - I - 0x031A14 0C:9A04: FC        .byte $FC   ; 
- - - - - - 0x031A15 0C:9A05: 01        .byte $01   ; 
- D 0 - I - 0x031A16 0C:9A06: E0        .byte $E0   ; 
- D 0 - I - 0x031A17 0C:9A07: 79        .byte $79   ; <y>
- D 0 - I - 0x031A18 0C:9A08: FC        .byte $FC   ; 
- - - - - - 0x031A19 0C:9A09: 01        .byte $01   ; 
- D 0 - I - 0x031A1A 0C:9A0A: E5        .byte $E5   ; 
- D 0 - I - 0x031A1B 0C:9A0B: 19        .byte $19   ; 
- D 0 - I - 0x031A1C 0C:9A0C: F6        .byte $F6   ; 
- D 0 - I - 0x031A1D 0C:9A0D: 2D        .byte $2D   ; 
- D 0 - I - 0x031A1E 0C:9A0E: FC        .byte $FC   ; 
- - - - - - 0x031A1F 0C:9A0F: 01        .byte $01   ; 
- D 0 - I - 0x031A20 0C:9A10: 12        .byte $12   ; 
- D 0 - I - 0x031A21 0C:9A11: 07        .byte $07   ; 
- D 0 - I - 0x031A22 0C:9A12: 24        .byte $24   ; 
- D 0 - I - 0x031A23 0C:9A13: B1        .byte $B1   ; 
- D 0 - I - 0x031A24 0C:9A14: 2F        .byte $2F   ; 
- D 0 - I - 0x031A25 0C:9A15: 10        .byte $10   ; 
- D 0 - I - 0x031A26 0C:9A16: 73        .byte $73   ; <s>
- D 0 - I - 0x031A27 0C:9A17: F7        .byte $F7   ; 
- D 0 - I - 0x031A28 0C:9A18: 03        .byte $03   ; 
- D 0 - I - 0x031A29 0C:9A19: 79        .byte $79   ; <y>
- D 0 - I - 0x031A2A 0C:9A1A: FC        .byte $FC   ; 
- D 0 - I - 0x031A2B 0C:9A1B: F0        .byte $F0   ; 
- D 0 - I - 0x031A2C 0C:9A1C: 01        .byte $01   ; 
- D 0 - I - 0x031A2D 0C:9A1D: 79        .byte $79   ; <y>
- D 0 - I - 0x031A2E 0C:9A1E: 24        .byte $24   ; 
- D 0 - I - 0x031A2F 0C:9A1F: 2F        .byte $2F   ; 
- D 0 - I - 0x031A30 0C:9A20: 10        .byte $10   ; 
- D 0 - I - 0x031A31 0C:9A21: BC        .byte $BC   ; 
- D 0 - I - 0x031A32 0C:9A22: 00        .byte $00   ; 
- D 0 - I - 0x031A33 0C:9A23: E4        .byte $E4   ; 
- D 0 - I - 0x031A34 0C:9A24: 79        .byte $79   ; <y>
- D 0 - I - 0x031A35 0C:9A25: FC        .byte $FC   ; 
- - - - - - 0x031A36 0C:9A26: 01        .byte $01   ; 
- D 0 - I - 0x031A37 0C:9A27: E0        .byte $E0   ; 
- D 0 - I - 0x031A38 0C:9A28: AD        .byte $AD   ; 
- D 0 - I - 0x031A39 0C:9A29: FC        .byte $FC   ; 
- - - - - - 0x031A3A 0C:9A2A: 01        .byte $01   ; 
- D 0 - I - 0x031A3B 0C:9A2B: E5        .byte $E5   ; 
- D 0 - I - 0x031A3C 0C:9A2C: F6        .byte $F6   ; 
- D 0 - I - 0x031A3D 0C:9A2D: 2D        .byte $2D   ; 
- D 0 - I - 0x031A3E 0C:9A2E: FC        .byte $FC   ; 
- - - - - - 0x031A3F 0C:9A2F: 01        .byte $01   ; 
- D 0 - I - 0x031A40 0C:9A30: 12        .byte $12   ; 
- D 0 - I - 0x031A41 0C:9A31: 07        .byte $07   ; 
- D 0 - I - 0x031A42 0C:9A32: 24        .byte $24   ; 
- D 0 - I - 0x031A43 0C:9A33: B1        .byte $B1   ; 
- D 0 - I - 0x031A44 0C:9A34: 2F        .byte $2F   ; 
- D 0 - I - 0x031A45 0C:9A35: 10        .byte $10   ; 
- D 0 - I - 0x031A46 0C:9A36: 73        .byte $73   ; <s>
- D 0 - I - 0x031A47 0C:9A37: F7        .byte $F7   ; 
- D 0 - I - 0x031A48 0C:9A38: 03        .byte $03   ; 
- D 0 - I - 0x031A49 0C:9A39: 79        .byte $79   ; <y>
- D 0 - I - 0x031A4A 0C:9A3A: 79        .byte $79   ; <y>
- D 0 - I - 0x031A4B 0C:9A3B: FC        .byte $FC   ; 
- D 0 - I - 0x031A4C 0C:9A3C: F0        .byte $F0   ; 
- D 0 - I - 0x031A4D 0C:9A3D: 01        .byte $01   ; 
- D 0 - I - 0x031A4E 0C:9A3E: C0        .byte $C0   ; 
- D 0 - I - 0x031A4F 0C:9A3F: 00        .byte $00   ; 
- D 0 - I - 0x031A50 0C:9A40: 00        .byte $00   ; 
- D 0 - I - 0x031A51 0C:9A41: 00        .byte $00   ; 
- D 0 - I - 0x031A52 0C:9A42: A2        .byte $A2   ; 
- D 0 - I - 0x031A53 0C:9A43: 2F        .byte $2F   ; 
- D 0 - I - 0x031A54 0C:9A44: 79        .byte $79   ; <y>
- D 0 - I - 0x031A55 0C:9A45: 79        .byte $79   ; <y>
- D 0 - I - 0x031A56 0C:9A46: FC        .byte $FC   ; 
- D 0 - I - 0x031A57 0C:9A47: F0        .byte $F0   ; 
- D 0 - I - 0x031A58 0C:9A48: 01        .byte $01   ; 
- D 0 - I - 0x031A59 0C:9A49: 72        .byte $72   ; <r>
- D 0 - I - 0x031A5A 0C:9A4A: EE        .byte $EE   ; 
- D 0 - I - 0x031A5B 0C:9A4B: FC        .byte $FC   ; 
- - - - - - 0x031A5C 0C:9A4C: 01        .byte $01   ; 
- D 0 - I - 0x031A5D 0C:9A4D: 0A        .byte $0A   ; 
- D 0 - I - 0x031A5E 0C:9A4E: 2E        .byte $2E   ; 
- D 0 - I - 0x031A5F 0C:9A4F: A6        .byte $A6   ; 
- D 0 - I - 0x031A60 0C:9A50: 32        .byte $32   ; <2>
- D 0 - I - 0x031A61 0C:9A51: 03        .byte $03   ; 
- D 0 - I - 0x031A62 0C:9A52: 19        .byte $19   ; 
- D 0 - I - 0x031A63 0C:9A53: FC        .byte $FC   ; 
- - - - - - 0x031A64 0C:9A54: 01        .byte $01   ; 
- D 0 - I - 0x031A65 0C:9A55: E1        .byte $E1   ; 
- D 0 - I - 0x031A66 0C:9A56: FC        .byte $FC   ; 
- - - - - - 0x031A67 0C:9A57: 01        .byte $01   ; 
- D 0 - I - 0x031A68 0C:9A58: 0B        .byte $0B   ; 
- D 0 - I - 0x031A69 0C:9A59: 08        .byte $08   ; 
- D 0 - I - 0x031A6A 0C:9A5A: 2A        .byte $2A   ; 
- D 0 - I - 0x031A6B 0C:9A5B: 12        .byte $12   ; 
- D 0 - I - 0x031A6C 0C:9A5C: AA        .byte $AA   ; 
- D 0 - I - 0x031A6D 0C:9A5D: 7D        .byte $7D   ; 
- D 0 - I - 0x031A6E 0C:9A5E: 79        .byte $79   ; <y>
- D 0 - I - 0x031A6F 0C:9A5F: 79        .byte $79   ; <y>
- D 0 - I - 0x031A70 0C:9A60: FC        .byte $FC   ; 
- D 0 - I - 0x031A71 0C:9A61: F0        .byte $F0   ; 
- D 0 - I - 0x031A72 0C:9A62: 01        .byte $01   ; 
- D 0 - I - 0x031A73 0C:9A63: 10        .byte $10   ; 
- D 0 - I - 0x031A74 0C:9A64: E4        .byte $E4   ; 
- D 0 - I - 0x031A75 0C:9A65: FC        .byte $FC   ; 
- - - - - - 0x031A76 0C:9A66: 08        .byte $08   ; 
- D 0 - I - 0x031A77 0C:9A67: CD        .byte $CD   ; 
- D 0 - I - 0x031A78 0C:9A68: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031A79 0C:9A69: 47        .byte $47   ; <G>
- D 0 - I - 0x031A7A 0C:9A6A: 70        .byte $70   ; <p>
- D 0 - I - 0x031A7B 0C:9A6B: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031A7C 0C:9A6C: 51        .byte $51   ; <Q>
- D 0 - I - 0x031A7D 0C:9A6D: 79        .byte $79   ; <y>
- D 0 - I - 0x031A7E 0C:9A6E: FC        .byte $FC   ; 
- D 0 - I - 0x031A7F 0C:9A6F: F0        .byte $F0   ; 
- D 0 - I - 0x031A80 0C:9A70: F2        .byte $F2   ; 
- D 0 - I - 0x031A81 0C:9A71: 01        .byte $01   ; 
- D 0 - I - 0x031A82 0C:9A72: 10        .byte $10   ; 
- D 0 - I - 0x031A83 0C:9A73: E4        .byte $E4   ; 
- D 0 - I - 0x031A84 0C:9A74: FC        .byte $FC   ; 
- - - - - - 0x031A85 0C:9A75: 01        .byte $01   ; 
- D 0 - I - 0x031A86 0C:9A76: CD        .byte $CD   ; 
- D 0 - I - 0x031A87 0C:9A77: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031A88 0C:9A78: 2D        .byte $2D   ; 
- D 0 - I - 0x031A89 0C:9A79: 00        .byte $00   ; 
- D 0 - I - 0x031A8A 0C:9A7A: AA        .byte $AA   ; 
- D 0 - I - 0x031A8B 0C:9A7B: 0C        .byte $0C   ; 
- D 0 - I - 0x031A8C 0C:9A7C: 10        .byte $10   ; 
- D 0 - I - 0x031A8D 0C:9A7D: 79        .byte $79   ; <y>
- D 0 - I - 0x031A8E 0C:9A7E: FC        .byte $FC   ; 
- D 0 - I - 0x031A8F 0C:9A7F: F0        .byte $F0   ; 
- D 0 - I - 0x031A90 0C:9A80: 01        .byte $01   ; 
- D 0 - I - 0x031A91 0C:9A81: 22        .byte $22   ; 
- D 0 - I - 0x031A92 0C:9A82: EB        .byte $EB   ; 
- D 0 - I - 0x031A93 0C:9A83: FC        .byte $FC   ; 
- - - - - - 0x031A94 0C:9A84: 08        .byte $08   ; 
- D 0 - I - 0x031A95 0C:9A85: 6C        .byte $6C   ; <l>
- D 0 - I - 0x031A96 0C:9A86: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031A97 0C:9A87: 3F        .byte $3F   ; 
- D 0 - I - 0x031A98 0C:9A88: 52        .byte $52   ; <R>
- D 0 - I - 0x031A99 0C:9A89: 7D        .byte $7D   ; 
- D 0 - I - 0x031A9A 0C:9A8A: FC        .byte $FC   ; 
- - - - - - 0x031A9B 0C:9A8B: 01        .byte $01   ; 
- D 0 - I - 0x031A9C 0C:9A8C: 00        .byte $00   ; 
- D 0 - I - 0x031A9D 0C:9A8D: 00        .byte $00   ; 
- D 0 - I - 0x031A9E 0C:9A8E: 68        .byte $68   ; <h>
- D 0 - I - 0x031A9F 0C:9A8F: 50        .byte $50   ; <P>
- D 0 - I - 0x031AA0 0C:9A90: 7D        .byte $7D   ; 
- D 0 - I - 0x031AA1 0C:9A91: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031AA2 0C:9A92: 79        .byte $79   ; <y>
- D 0 - I - 0x031AA3 0C:9A93: 79        .byte $79   ; <y>
- D 0 - I - 0x031AA4 0C:9A94: FC        .byte $FC   ; 
- D 0 - I - 0x031AA5 0C:9A95: F0        .byte $F0   ; 
- D 0 - I - 0x031AA6 0C:9A96: F2        .byte $F2   ; 
- D 0 - I - 0x031AA7 0C:9A97: 01        .byte $01   ; 
- D 0 - I - 0x031AA8 0C:9A98: 20        .byte $20   ; 
- D 0 - I - 0x031AA9 0C:9A99: 4A        .byte $4A   ; <J>
- D 0 - I - 0x031AAA 0C:9A9A: 42        .byte $42   ; <B>
- D 0 - I - 0x031AAB 0C:9A9B: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031AAC 0C:9A9C: 54        .byte $54   ; <T>
- D 0 - I - 0x031AAD 0C:9A9D: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031AAE 0C:9A9E: 16        .byte $16   ; 
- D 0 - I - 0x031AAF 0C:9A9F: 26        .byte $26   ; 
- D 0 - I - 0x031AB0 0C:9AA0: 28        .byte $28   ; 
- D 0 - I - 0x031AB1 0C:9AA1: FC        .byte $FC   ; 
- - - - - - 0x031AB2 0C:9AA2: 01        .byte $01   ; 
- D 0 - I - 0x031AB3 0C:9AA3: 0E        .byte $0E   ; 
- D 0 - I - 0x031AB4 0C:9AA4: 2E        .byte $2E   ; 
- D 0 - I - 0x031AB5 0C:9AA5: 0A        .byte $0A   ; 
- D 0 - I - 0x031AB6 0C:9AA6: 03        .byte $03   ; 
- D 0 - I - 0x031AB7 0C:9AA7: 1A        .byte $1A   ; 
- D 0 - I - 0x031AB8 0C:9AA8: FC        .byte $FC   ; 
- - - - - - 0x031AB9 0C:9AA9: 01        .byte $01   ; 
- D 0 - I - 0x031ABA 0C:9AAA: E6        .byte $E6   ; 
- D 0 - I - 0x031ABB 0C:9AAB: AD        .byte $AD   ; 
- D 0 - I - 0x031ABC 0C:9AAC: 0D        .byte $0D   ; 
- D 0 - I - 0x031ABD 0C:9AAD: FC        .byte $FC   ; 
- D 0 - I - 0x031ABE 0C:9AAE: F0        .byte $F0   ; 
- D 0 - I - 0x031ABF 0C:9AAF: 01        .byte $01   ; 
- D 0 - I - 0x031AC0 0C:9AB0: 51        .byte $51   ; <Q>
- D 0 - I - 0x031AC1 0C:9AB1: F5        .byte $F5   ; 
- D 0 - I - 0x031AC2 0C:9AB2: 1A        .byte $1A   ; 
- D 0 - I - 0x031AC3 0C:9AB3: 00        .byte $00   ; 
- D 0 - I - 0x031AC4 0C:9AB4: 67        .byte $67   ; <g>
- D 0 - I - 0x031AC5 0C:9AB5: 42        .byte $42   ; <B>
- D 0 - I - 0x031AC6 0C:9AB6: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031AC7 0C:9AB7: 2D        .byte $2D   ; 
- D 0 - I - 0x031AC8 0C:9AB8: FC        .byte $FC   ; 
- - - - - - 0x031AC9 0C:9AB9: 01        .byte $01   ; 
- D 0 - I - 0x031ACA 0C:9ABA: 0A        .byte $0A   ; 
- D 0 - I - 0x031ACB 0C:9ABB: 04        .byte $04   ; 
- D 0 - I - 0x031ACC 0C:9ABC: 13        .byte $13   ; 
- D 0 - I - 0x031ACD 0C:9ABD: 0C        .byte $0C   ; 
- D 0 - I - 0x031ACE 0C:9ABE: 1F        .byte $1F   ; 
- D 0 - I - 0x031ACF 0C:9ABF: 2F        .byte $2F   ; 
- D 0 - I - 0x031AD0 0C:9AC0: 10        .byte $10   ; 
- D 0 - I - 0x031AD1 0C:9AC1: F7        .byte $F7   ; 
- D 0 - I - 0x031AD2 0C:9AC2: 03        .byte $03   ; 
- D 0 - I - 0x031AD3 0C:9AC3: 79        .byte $79   ; <y>
- D 0 - I - 0x031AD4 0C:9AC4: FC        .byte $FC   ; 
- D 0 - I - 0x031AD5 0C:9AC5: F0        .byte $F0   ; 
- D 0 - I - 0x031AD6 0C:9AC6: 01        .byte $01   ; 
- D 0 - I - 0x031AD7 0C:9AC7: 51        .byte $51   ; <Q>
- D 0 - I - 0x031AD8 0C:9AC8: E6        .byte $E6   ; 
- D 0 - I - 0x031AD9 0C:9AC9: 19        .byte $19   ; 
- D 0 - I - 0x031ADA 0C:9ACA: FC        .byte $FC   ; 
- - - - - - 0x031ADB 0C:9ACB: 01        .byte $01   ; 
- D 0 - I - 0x031ADC 0C:9ACC: 4A        .byte $4A   ; <J>
- D 0 - I - 0x031ADD 0C:9ACD: 7D        .byte $7D   ; 
- D 0 - I - 0x031ADE 0C:9ACE: 55        .byte $55   ; <U>
- D 0 - I - 0x031ADF 0C:9ACF: 7D        .byte $7D   ; 
- D 0 - I - 0x031AE0 0C:9AD0: 47        .byte $47   ; <G>
- D 0 - I - 0x031AE1 0C:9AD1: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031AE2 0C:9AD2: 48        .byte $48   ; <H>
- D 0 - I - 0x031AE3 0C:9AD3: AA        .byte $AA   ; 
- D 0 - I - 0x031AE4 0C:9AD4: F7        .byte $F7   ; 
- D 0 - I - 0x031AE5 0C:9AD5: 03        .byte $03   ; 
- D 0 - I - 0x031AE6 0C:9AD6: 79        .byte $79   ; <y>
- D 0 - I - 0x031AE7 0C:9AD7: FC        .byte $FC   ; 
- D 0 - I - 0x031AE8 0C:9AD8: F0        .byte $F0   ; 
- D 0 - I - 0x031AE9 0C:9AD9: 01        .byte $01   ; 
- D 0 - I - 0x031AEA 0C:9ADA: 51        .byte $51   ; <Q>
- D 0 - I - 0x031AEB 0C:9ADB: E6        .byte $E6   ; 
- D 0 - I - 0x031AEC 0C:9ADC: 19        .byte $19   ; 
- D 0 - I - 0x031AED 0C:9ADD: FC        .byte $FC   ; 
- - - - - - 0x031AEE 0C:9ADE: 01        .byte $01   ; 
- D 0 - I - 0x031AEF 0C:9ADF: F6        .byte $F6   ; 
- D 0 - I - 0x031AF0 0C:9AE0: 47        .byte $47   ; <G>
- D 0 - I - 0x031AF1 0C:9AE1: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031AF2 0C:9AE2: 48        .byte $48   ; <H>
- D 0 - I - 0x031AF3 0C:9AE3: AA        .byte $AA   ; 
- D 0 - I - 0x031AF4 0C:9AE4: F7        .byte $F7   ; 
- D 0 - I - 0x031AF5 0C:9AE5: 03        .byte $03   ; 
- D 0 - I - 0x031AF6 0C:9AE6: 79        .byte $79   ; <y>
- D 0 - I - 0x031AF7 0C:9AE7: FC        .byte $FC   ; 
- D 0 - I - 0x031AF8 0C:9AE8: F0        .byte $F0   ; 
- D 0 - I - 0x031AF9 0C:9AE9: 01        .byte $01   ; 
- D 0 - I - 0x031AFA 0C:9AEA: 51        .byte $51   ; <Q>
- D 0 - I - 0x031AFB 0C:9AEB: E6        .byte $E6   ; 
- D 0 - I - 0x031AFC 0C:9AEC: 19        .byte $19   ; 
- D 0 - I - 0x031AFD 0C:9AED: FC        .byte $FC   ; 
- - - - - - 0x031AFE 0C:9AEE: 01        .byte $01   ; 
- D 0 - I - 0x031AFF 0C:9AEF: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031B00 0C:9AF0: 6B        .byte $6B   ; <k>
- D 0 - I - 0x031B01 0C:9AF1: 7D        .byte $7D   ; 
- D 0 - I - 0x031B02 0C:9AF2: 42        .byte $42   ; <B>
- D 0 - I - 0x031B03 0C:9AF3: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031B04 0C:9AF4: AA        .byte $AA   ; 
- D 0 - I - 0x031B05 0C:9AF5: F7        .byte $F7   ; 
- D 0 - I - 0x031B06 0C:9AF6: 03        .byte $03   ; 
- D 0 - I - 0x031B07 0C:9AF7: 79        .byte $79   ; <y>
- D 0 - I - 0x031B08 0C:9AF8: FC        .byte $FC   ; 
- D 0 - I - 0x031B09 0C:9AF9: F0        .byte $F0   ; 
- D 0 - I - 0x031B0A 0C:9AFA: 01        .byte $01   ; 
- D 0 - I - 0x031B0B 0C:9AFB: 10        .byte $10   ; 
- D 0 - I - 0x031B0C 0C:9AFC: E4        .byte $E4   ; 
- D 0 - I - 0x031B0D 0C:9AFD: 19        .byte $19   ; 
- D 0 - I - 0x031B0E 0C:9AFE: FC        .byte $FC   ; 
- - - - - - 0x031B0F 0C:9AFF: 01        .byte $01   ; 
- D 0 - I - 0x031B10 0C:9B00: F6        .byte $F6   ; 
- D 0 - I - 0x031B11 0C:9B01: 47        .byte $47   ; <G>
- D 0 - I - 0x031B12 0C:9B02: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031B13 0C:9B03: 48        .byte $48   ; <H>
- D 0 - I - 0x031B14 0C:9B04: 79        .byte $79   ; <y>
- D 0 - I - 0x031B15 0C:9B05: FC        .byte $FC   ; 
- D 0 - I - 0x031B16 0C:9B06: F0        .byte $F0   ; 
- D 0 - I - 0x031B17 0C:9B07: 01        .byte $01   ; 
- D 0 - I - 0x031B18 0C:9B08: 00        .byte $00   ; 
- D 0 - I - 0x031B19 0C:9B09: AA        .byte $AA   ; 
- D 0 - I - 0x031B1A 0C:9B0A: A0        .byte $A0   ; 
- D 0 - I - 0x031B1B 0C:9B0B: 00        .byte $00   ; 
- D 0 - I - 0x031B1C 0C:9B0C: F5        .byte $F5   ; 
- D 0 - I - 0x031B1D 0C:9B0D: 1A        .byte $1A   ; 
- D 0 - I - 0x031B1E 0C:9B0E: 00        .byte $00   ; 
- D 0 - I - 0x031B1F 0C:9B0F: 14        .byte $14   ; 
- D 0 - I - 0x031B20 0C:9B10: AE        .byte $AE   ; 
- D 0 - I - 0x031B21 0C:9B11: 06        .byte $06   ; 
- D 0 - I - 0x031B22 0C:9B12: 15        .byte $15   ; 
- D 0 - I - 0x031B23 0C:9B13: 02        .byte $02   ; 
- D 0 - I - 0x031B24 0C:9B14: 79        .byte $79   ; <y>
- D 0 - I - 0x031B25 0C:9B15: FC        .byte $FC   ; 
- D 0 - I - 0x031B26 0C:9B16: F0        .byte $F0   ; 
- D 0 - I - 0x031B27 0C:9B17: F2        .byte $F2   ; 
- D 0 - I - 0x031B28 0C:9B18: 01        .byte $01   ; 
- D 0 - I - 0x031B29 0C:9B19: 10        .byte $10   ; 
- D 0 - I - 0x031B2A 0C:9B1A: E6        .byte $E6   ; 
- D 0 - I - 0x031B2B 0C:9B1B: 19        .byte $19   ; 
- D 0 - I - 0x031B2C 0C:9B1C: FC        .byte $FC   ; 
- - - - - - 0x031B2D 0C:9B1D: 01        .byte $01   ; 
- D 0 - I - 0x031B2E 0C:9B1E: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031B2F 0C:9B1F: 6B        .byte $6B   ; <k>
- D 0 - I - 0x031B30 0C:9B20: 7D        .byte $7D   ; 
- D 0 - I - 0x031B31 0C:9B21: 42        .byte $42   ; <B>
- D 0 - I - 0x031B32 0C:9B22: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031B33 0C:9B23: 79        .byte $79   ; <y>
- D 0 - I - 0x031B34 0C:9B24: FC        .byte $FC   ; 
- D 0 - I - 0x031B35 0C:9B25: F0        .byte $F0   ; 
- D 0 - I - 0x031B36 0C:9B26: 01        .byte $01   ; 
- D 0 - I - 0x031B37 0C:9B27: 62        .byte $62   ; <b>
- D 0 - I - 0x031B38 0C:9B28: E4        .byte $E4   ; 
- D 0 - I - 0x031B39 0C:9B29: FC        .byte $FC   ; 
- - - - - - 0x031B3A 0C:9B2A: 01        .byte $01   ; 
- D 0 - I - 0x031B3B 0C:9B2B: BE        .byte $BE   ; 
- D 0 - I - 0x031B3C 0C:9B2C: 42        .byte $42   ; <B>
- D 0 - I - 0x031B3D 0C:9B2D: 6A        .byte $6A   ; <j>
- D 0 - I - 0x031B3E 0C:9B2E: 48        .byte $48   ; <H>
- D 0 - I - 0x031B3F 0C:9B2F: 54        .byte $54   ; <T>
- D 0 - I - 0x031B40 0C:9B30: 16        .byte $16   ; 
- D 0 - I - 0x031B41 0C:9B31: FC        .byte $FC   ; 
- - - - - - 0x031B42 0C:9B32: 01        .byte $01   ; 
- D 0 - I - 0x031B43 0C:9B33: E2        .byte $E2   ; 
- D 0 - I - 0x031B44 0C:9B34: FC        .byte $FC   ; 
- D 0 - I - 0x031B45 0C:9B35: F0        .byte $F0   ; 
- D 0 - I - 0x031B46 0C:9B36: 01        .byte $01   ; 
- D 0 - I - 0x031B47 0C:9B37: 20        .byte $20   ; 
- D 0 - I - 0x031B48 0C:9B38: E4        .byte $E4   ; 
- D 0 - I - 0x031B49 0C:9B39: FC        .byte $FC   ; 
- - - - - - 0x031B4A 0C:9B3A: 01        .byte $01   ; 
- D 0 - I - 0x031B4B 0C:9B3B: 4A        .byte $4A   ; <J>
- D 0 - I - 0x031B4C 0C:9B3C: 7D        .byte $7D   ; 
- D 0 - I - 0x031B4D 0C:9B3D: 55        .byte $55   ; <U>
- D 0 - I - 0x031B4E 0C:9B3E: 7D        .byte $7D   ; 
- D 0 - I - 0x031B4F 0C:9B3F: 06        .byte $06   ; 
- D 0 - I - 0x031B50 0C:9B40: 27        .byte $27   ; 
- D 0 - I - 0x031B51 0C:9B41: 19        .byte $19   ; 
- D 0 - I - 0x031B52 0C:9B42: FC        .byte $FC   ; 
- - - - - - 0x031B53 0C:9B43: 01        .byte $01   ; 
- D 0 - I - 0x031B54 0C:9B44: E2        .byte $E2   ; 
- D 0 - I - 0x031B55 0C:9B45: FC        .byte $FC   ; 
- D 0 - I - 0x031B56 0C:9B46: F0        .byte $F0   ; 
- D 0 - I - 0x031B57 0C:9B47: F2        .byte $F2   ; 
- D 0 - I - 0x031B58 0C:9B48: 01        .byte $01   ; 
- D 0 - I - 0x031B59 0C:9B49: 20        .byte $20   ; 
- D 0 - I - 0x031B5A 0C:9B4A: E6        .byte $E6   ; 
- D 0 - I - 0x031B5B 0C:9B4B: 16        .byte $16   ; 
- D 0 - I - 0x031B5C 0C:9B4C: FC        .byte $FC   ; 
- - - - - - 0x031B5D 0C:9B4D: 01        .byte $01   ; 
- D 0 - I - 0x031B5E 0C:9B4E: 5C        .byte $5C   ; 
- D 0 - I - 0x031B5F 0C:9B4F: 68        .byte $68   ; <h>
- D 0 - I - 0x031B60 0C:9B50: 7D        .byte $7D   ; 
- D 0 - I - 0x031B61 0C:9B51: 47        .byte $47   ; <G>
- D 0 - I - 0x031B62 0C:9B52: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031B63 0C:9B53: 48        .byte $48   ; <H>
- D 0 - I - 0x031B64 0C:9B54: A0        .byte $A0   ; 
- D 0 - I - 0x031B65 0C:9B55: FC        .byte $FC   ; 
- - - - - - 0x031B66 0C:9B56: 01        .byte $01   ; 
- D 0 - I - 0x031B67 0C:9B57: 01        .byte $01   ; 
- D 0 - I - 0x031B68 0C:9B58: 10        .byte $10   ; 
- D 0 - I - 0x031B69 0C:9B59: 04        .byte $04   ; 
- D 0 - I - 0x031B6A 0C:9B5A: 27        .byte $27   ; 
- D 0 - I - 0x031B6B 0C:9B5B: 2A        .byte $2A   ; 
- D 0 - I - 0x031B6C 0C:9B5C: 1F        .byte $1F   ; 
- D 0 - I - 0x031B6D 0C:9B5D: 0D        .byte $0D   ; 
- D 0 - I - 0x031B6E 0C:9B5E: FC        .byte $FC   ; 
- D 0 - I - 0x031B6F 0C:9B5F: F0        .byte $F0   ; 
- D 0 - I - 0x031B70 0C:9B60: 01        .byte $01   ; 
- D 0 - I - 0x031B71 0C:9B61: 20        .byte $20   ; 
- D 0 - I - 0x031B72 0C:9B62: E6        .byte $E6   ; 
- D 0 - I - 0x031B73 0C:9B63: 16        .byte $16   ; 
- D 0 - I - 0x031B74 0C:9B64: FC        .byte $FC   ; 
- - - - - - 0x031B75 0C:9B65: 01        .byte $01   ; 
- D 0 - I - 0x031B76 0C:9B66: D0        .byte $D0   ; 
- D 0 - I - 0x031B77 0C:9B67: 55        .byte $55   ; <U>
- D 0 - I - 0x031B78 0C:9B68: 69        .byte $69   ; <i>
- D 0 - I - 0x031B79 0C:9B69: 53        .byte $53   ; <S>
- D 0 - I - 0x031B7A 0C:9B6A: 74        .byte $74   ; <t>
- D 0 - I - 0x031B7B 0C:9B6B: 47        .byte $47   ; <G>
- D 0 - I - 0x031B7C 0C:9B6C: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031B7D 0C:9B6D: 48        .byte $48   ; <H>
- D 0 - I - 0x031B7E 0C:9B6E: A0        .byte $A0   ; 
- D 0 - I - 0x031B7F 0C:9B6F: FC        .byte $FC   ; 
- - - - - - 0x031B80 0C:9B70: 01        .byte $01   ; 
- D 0 - I - 0x031B81 0C:9B71: 01        .byte $01   ; 
- D 0 - I - 0x031B82 0C:9B72: 10        .byte $10   ; 
- D 0 - I - 0x031B83 0C:9B73: 04        .byte $04   ; 
- D 0 - I - 0x031B84 0C:9B74: 27        .byte $27   ; 
- D 0 - I - 0x031B85 0C:9B75: 2A        .byte $2A   ; 
- D 0 - I - 0x031B86 0C:9B76: 1F        .byte $1F   ; 
- D 0 - I - 0x031B87 0C:9B77: 0D        .byte $0D   ; 
- D 0 - I - 0x031B88 0C:9B78: FC        .byte $FC   ; 
- D 0 - I - 0x031B89 0C:9B79: F0        .byte $F0   ; 
- D 0 - I - 0x031B8A 0C:9B7A: 01        .byte $01   ; 
- D 0 - I - 0x031B8B 0C:9B7B: 10        .byte $10   ; 
- D 0 - I - 0x031B8C 0C:9B7C: 47        .byte $47   ; <G>
- D 0 - I - 0x031B8D 0C:9B7D: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031B8E 0C:9B7E: 46        .byte $46   ; <F>
- D 0 - I - 0x031B8F 0C:9B7F: 7D        .byte $7D   ; 
- D 0 - I - 0x031B90 0C:9B80: 1A        .byte $1A   ; 
- D 0 - I - 0x031B91 0C:9B81: FC        .byte $FC   ; 
- - - - - - 0x031B92 0C:9B82: 01        .byte $01   ; 
- D 0 - I - 0x031B93 0C:9B83: E4        .byte $E4   ; 
- D 0 - I - 0x031B94 0C:9B84: AA        .byte $AA   ; 
- D 0 - I - 0x031B95 0C:9B85: 79        .byte $79   ; <y>
- D 0 - I - 0x031B96 0C:9B86: FC        .byte $FC   ; 
- D 0 - I - 0x031B97 0C:9B87: F0        .byte $F0   ; 
- - - - - - 0x031B98 0C:9B88: 01        .byte $01   ; 
- - - - - - 0x031B99 0C:9B89: 52        .byte $52   ; <R>
- - - - - - 0x031B9A 0C:9B8A: E4        .byte $E4   ; 
- - - - - - 0x031B9B 0C:9B8B: 19        .byte $19   ; 
- - - - - - 0x031B9C 0C:9B8C: FC        .byte $FC   ; 
- - - - - - 0x031B9D 0C:9B8D: 01        .byte $01   ; 
- - - - - - 0x031B9E 0C:9B8E: E0        .byte $E0   ; 
- - - - - - 0x031B9F 0C:9B8F: 79        .byte $79   ; <y>
- - - - - - 0x031BA0 0C:9B90: FC        .byte $FC   ; 
- - - - - - 0x031BA1 0C:9B91: F0        .byte $F0   ; 
- D 0 - I - 0x031BA2 0C:9B92: F4        .byte $F4   ; 
- D 0 - I - 0x031BA3 0C:9B93: 06        .byte $06   ; 
- D 0 - I - 0x031BA4 0C:9B94: 9C        .byte $9C   ; 
- D 0 - I - 0x031BA5 0C:9B95: 9B        .byte $9B   ; 
- D 0 - I - 0x031BA6 0C:9B96: 9C        .byte $9C   ; 
- D 0 - I - 0x031BA7 0C:9B97: 9B        .byte $9B   ; 
- D 0 - I - 0x031BA8 0C:9B98: AF        .byte $AF   ; 
- D 0 - I - 0x031BA9 0C:9B99: 9B        .byte $9B   ; 
- D 0 - I - 0x031BAA 0C:9B9A: AF        .byte $AF   ; 
- D 0 - I - 0x031BAB 0C:9B9B: 9B        .byte $9B   ; 
- D 0 - I - 0x031BAC 0C:9B9C: F2        .byte $F2   ; 
- D 0 - I - 0x031BAD 0C:9B9D: 01        .byte $01   ; 
- D 0 - I - 0x031BAE 0C:9B9E: 20        .byte $20   ; 
- D 0 - I - 0x031BAF 0C:9B9F: E6        .byte $E6   ; 
- D 0 - I - 0x031BB0 0C:9BA0: 19        .byte $19   ; 
- D 0 - I - 0x031BB1 0C:9BA1: FC        .byte $FC   ; 
- - - - - - 0x031BB2 0C:9BA2: 01        .byte $01   ; 
- D 0 - I - 0x031BB3 0C:9BA3: F0        .byte $F0   ; 
- D 0 - I - 0x031BB4 0C:9BA4: AF        .byte $AF   ; 
- D 0 - I - 0x031BB5 0C:9BA5: 2E        .byte $2E   ; 
- D 0 - I - 0x031BB6 0C:9BA6: 13        .byte $13   ; 
- D 0 - I - 0x031BB7 0C:9BA7: 1A        .byte $1A   ; 
- D 0 - I - 0x031BB8 0C:9BA8: FC        .byte $FC   ; 
- - - - - - 0x031BB9 0C:9BA9: 01        .byte $01   ; 
- D 0 - I - 0x031BBA 0C:9BAA: E4        .byte $E4   ; 
- D 0 - I - 0x031BBB 0C:9BAB: AD        .byte $AD   ; 
- D 0 - I - 0x031BBC 0C:9BAC: 0D        .byte $0D   ; 
- D 0 - I - 0x031BBD 0C:9BAD: FC        .byte $FC   ; 
- D 0 - I - 0x031BBE 0C:9BAE: F0        .byte $F0   ; 
- D 0 - I - 0x031BBF 0C:9BAF: F2        .byte $F2   ; 
- D 0 - I - 0x031BC0 0C:9BB0: 01        .byte $01   ; 
- D 0 - I - 0x031BC1 0C:9BB1: 20        .byte $20   ; 
- D 0 - I - 0x031BC2 0C:9BB2: E6        .byte $E6   ; 
- D 0 - I - 0x031BC3 0C:9BB3: 19        .byte $19   ; 
- D 0 - I - 0x031BC4 0C:9BB4: FC        .byte $FC   ; 
- - - - - - 0x031BC5 0C:9BB5: 01        .byte $01   ; 
- D 0 - I - 0x031BC6 0C:9BB6: E4        .byte $E4   ; 
- D 0 - I - 0x031BC7 0C:9BB7: 19        .byte $19   ; 
- D 0 - I - 0x031BC8 0C:9BB8: 00        .byte $00   ; 
- D 0 - I - 0x031BC9 0C:9BB9: 8D        .byte $8D   ; 
- D 0 - I - 0x031BCA 0C:9BBA: 8B        .byte $8B   ; 
- D 0 - I - 0x031BCB 0C:9BBB: AD        .byte $AD   ; 
- D 0 - I - 0x031BCC 0C:9BBC: 0D        .byte $0D   ; 
- D 0 - I - 0x031BCD 0C:9BBD: FC        .byte $FC   ; 
- - - - - - 0x031BCE 0C:9BBE: 01        .byte $01   ; 
- D 0 - I - 0x031BCF 0C:9BBF: FC        .byte $FC   ; 
- D 0 - I - 0x031BD0 0C:9BC0: F0        .byte $F0   ; 
- D 0 - I - 0x031BD1 0C:9BC1: 01        .byte $01   ; 
- D 0 - I - 0x031BD2 0C:9BC2: C0        .byte $C0   ; 
- D 0 - I - 0x031BD3 0C:9BC3: 03        .byte $03   ; 
- D 0 - I - 0x031BD4 0C:9BC4: 76        .byte $76   ; <v>
- D 0 - I - 0x031BD5 0C:9BC5: 76        .byte $76   ; <v>
- D 0 - I - 0x031BD6 0C:9BC6: F7        .byte $F7   ; 
- D 0 - I - 0x031BD7 0C:9BC7: 06        .byte $06   ; 
- D 0 - I - 0x031BD8 0C:9BC8: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031BD9 0C:9BC9: 79        .byte $79   ; <y>
- D 0 - I - 0x031BDA 0C:9BCA: 79        .byte $79   ; <y>
- D 0 - I - 0x031BDB 0C:9BCB: FC        .byte $FC   ; 
- D 0 - I - 0x031BDC 0C:9BCC: F0        .byte $F0   ; 
- D 0 - I - 0x031BDD 0C:9BCD: 01        .byte $01   ; 
- D 0 - I - 0x031BDE 0C:9BCE: C0        .byte $C0   ; 
- D 0 - I - 0x031BDF 0C:9BCF: AA        .byte $AA   ; 
- D 0 - I - 0x031BE0 0C:9BD0: F7        .byte $F7   ; 
- D 0 - I - 0x031BE1 0C:9BD1: 08        .byte $08   ; 
- D 0 - I - 0x031BE2 0C:9BD2: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031BE3 0C:9BD3: 79        .byte $79   ; <y>
- D 0 - I - 0x031BE4 0C:9BD4: 79        .byte $79   ; <y>
- D 0 - I - 0x031BE5 0C:9BD5: FC        .byte $FC   ; 
- D 0 - I - 0x031BE6 0C:9BD6: F0        .byte $F0   ; 
- D 0 - I - 0x031BE7 0C:9BD7: 01        .byte $01   ; 
- D 0 - I - 0x031BE8 0C:9BD8: C0        .byte $C0   ; 
- D 0 - I - 0x031BE9 0C:9BD9: 5C        .byte $5C   ; 
- D 0 - I - 0x031BEA 0C:9BDA: 73        .byte $73   ; <s>
- D 0 - I - 0x031BEB 0C:9BDB: 42        .byte $42   ; <B>
- D 0 - I - 0x031BEC 0C:9BDC: 64        .byte $64   ; <d>
- D 0 - I - 0x031BED 0C:9BDD: F7        .byte $F7   ; 
- D 0 - I - 0x031BEE 0C:9BDE: 06        .byte $06   ; 
- D 0 - I - 0x031BEF 0C:9BDF: 79        .byte $79   ; <y>
- D 0 - I - 0x031BF0 0C:9BE0: 79        .byte $79   ; <y>
- D 0 - I - 0x031BF1 0C:9BE1: FC        .byte $FC   ; 
- D 0 - I - 0x031BF2 0C:9BE2: F0        .byte $F0   ; 
- D 0 - I - 0x031BF3 0C:9BE3: F2        .byte $F2   ; 
- D 0 - I - 0x031BF4 0C:9BE4: F4        .byte $F4   ; 
- D 0 - I - 0x031BF5 0C:9BE5: 01        .byte $01   ; 
- D 0 - I - 0x031BF6 0C:9BE6: EA        .byte $EA   ; 
- D 0 - I - 0x031BF7 0C:9BE7: 9B        .byte $9B   ; 
- D 0 - I - 0x031BF8 0C:9BE8: F4        .byte $F4   ; 
- D 0 - I - 0x031BF9 0C:9BE9: 9B        .byte $9B   ; 
- D 0 - I - 0x031BFA 0C:9BEA: F4        .byte $F4   ; 
- D 0 - I - 0x031BFB 0C:9BEB: 02        .byte $02   ; 
- D 0 - I - 0x031BFC 0C:9BEC: FE        .byte $FE   ; 
- D 0 - I - 0x031BFD 0C:9BED: 9B        .byte $9B   ; 
- D 0 - I - 0x031BFE 0C:9BEE: 09        .byte $09   ; 
- D 0 - I - 0x031BFF 0C:9BEF: 9C        .byte $9C   ; 
- D 0 - I - 0x031C00 0C:9BF0: 1C        .byte $1C   ; 
- D 0 - I - 0x031C01 0C:9BF1: 9C        .byte $9C   ; 
- - - - - - 0x031C02 0C:9BF2: 08        .byte $08   ; 
- - - - - - 0x031C03 0C:9BF3: 9C        .byte $9C   ; 
- D 0 - I - 0x031C04 0C:9BF4: F4        .byte $F4   ; 
- D 0 - I - 0x031C05 0C:9BF5: 02        .byte $02   ; 
- D 0 - I - 0x031C06 0C:9BF6: 37        .byte $37   ; <7>
- D 0 - I - 0x031C07 0C:9BF7: 9C        .byte $9C   ; 
- D 0 - I - 0x031C08 0C:9BF8: 46        .byte $46   ; <F>
- D 0 - I - 0x031C09 0C:9BF9: 9C        .byte $9C   ; 
- D 0 - I - 0x031C0A 0C:9BFA: 59        .byte $59   ; <Y>
- D 0 - I - 0x031C0B 0C:9BFB: 9C        .byte $9C   ; 
- - - - - - 0x031C0C 0C:9BFC: 08        .byte $08   ; 
- - - - - - 0x031C0D 0C:9BFD: 9C        .byte $9C   ; 
- D 0 - I - 0x031C0E 0C:9BFE: 01        .byte $01   ; 
- D 0 - I - 0x031C0F 0C:9BFF: 52        .byte $52   ; <R>
- D 0 - I - 0x031C10 0C:9C00: E8        .byte $E8   ; 
- D 0 - I - 0x031C11 0C:9C01: A0        .byte $A0   ; 
- D 0 - I - 0x031C12 0C:9C02: FC        .byte $FC   ; 
- - - - - - 0x031C13 0C:9C03: 01        .byte $01   ; 
- D 0 - I - 0x031C14 0C:9C04: 07        .byte $07   ; 
- D 0 - I - 0x031C15 0C:9C05: 10        .byte $10   ; 
- D 0 - I - 0x031C16 0C:9C06: 79        .byte $79   ; <y>
- D 0 - I - 0x031C17 0C:9C07: FC        .byte $FC   ; 
- D 0 - I - 0x031C18 0C:9C08: F0        .byte $F0   ; 
- D 0 - I - 0x031C19 0C:9C09: 01        .byte $01   ; 
- D 0 - I - 0x031C1A 0C:9C0A: 62        .byte $62   ; <b>
- D 0 - I - 0x031C1B 0C:9C0B: E8        .byte $E8   ; 
- D 0 - I - 0x031C1C 0C:9C0C: FC        .byte $FC   ; 
- - - - - - 0x031C1D 0C:9C0D: 01        .byte $01   ; 
- D 0 - I - 0x031C1E 0C:9C0E: E9        .byte $E9   ; 
- D 0 - I - 0x031C1F 0C:9C0F: 16        .byte $16   ; 
- D 0 - I - 0x031C20 0C:9C10: FC        .byte $FC   ; 
- - - - - - 0x031C21 0C:9C11: 01        .byte $01   ; 
- D 0 - I - 0x031C22 0C:9C12: 14        .byte $14   ; 
- D 0 - I - 0x031C23 0C:9C13: 28        .byte $28   ; 
- D 0 - I - 0x031C24 0C:9C14: 06        .byte $06   ; 
- D 0 - I - 0x031C25 0C:9C15: 0A        .byte $0A   ; 
- D 0 - I - 0x031C26 0C:9C16: 1F        .byte $1F   ; 
- D 0 - I - 0x031C27 0C:9C17: 2A        .byte $2A   ; 
- D 0 - I - 0x031C28 0C:9C18: 10        .byte $10   ; 
- D 0 - I - 0x031C29 0C:9C19: 79        .byte $79   ; <y>
- D 0 - I - 0x031C2A 0C:9C1A: FC        .byte $FC   ; 
- D 0 - I - 0x031C2B 0C:9C1B: F0        .byte $F0   ; 
- D 0 - I - 0x031C2C 0C:9C1C: 01        .byte $01   ; 
- D 0 - I - 0x031C2D 0C:9C1D: 72        .byte $72   ; <r>
- D 0 - I - 0x031C2E 0C:9C1E: E8        .byte $E8   ; 
- D 0 - I - 0x031C2F 0C:9C1F: FC        .byte $FC   ; 
- - - - - - 0x031C30 0C:9C20: 01        .byte $01   ; 
- D 0 - I - 0x031C31 0C:9C21: E9        .byte $E9   ; 
- D 0 - I - 0x031C32 0C:9C22: FC        .byte $FC   ; 
- - - - - - 0x031C33 0C:9C23: 01        .byte $01   ; 
- D 0 - I - 0x031C34 0C:9C24: EA        .byte $EA   ; 
- D 0 - I - 0x031C35 0C:9C25: 10        .byte $10   ; 
- D 0 - I - 0x031C36 0C:9C26: 11        .byte $11   ; 
- D 0 - I - 0x031C37 0C:9C27: FC        .byte $FC   ; 
- - - - - - 0x031C38 0C:9C28: 01        .byte $01   ; 
- D 0 - I - 0x031C39 0C:9C29: E7        .byte $E7   ; 
- D 0 - I - 0x031C3A 0C:9C2A: 16        .byte $16   ; 
- D 0 - I - 0x031C3B 0C:9C2B: 2E        .byte $2E   ; 
- D 0 - I - 0x031C3C 0C:9C2C: 16        .byte $16   ; 
- D 0 - I - 0x031C3D 0C:9C2D: 00        .byte $00   ; 
- D 0 - I - 0x031C3E 0C:9C2E: 06        .byte $06   ; 
- D 0 - I - 0x031C3F 0C:9C2F: 0A        .byte $0A   ; 
- D 0 - I - 0x031C40 0C:9C30: 1F        .byte $1F   ; 
- D 0 - I - 0x031C41 0C:9C31: 2A        .byte $2A   ; 
- D 0 - I - 0x031C42 0C:9C32: 10        .byte $10   ; 
- D 0 - I - 0x031C43 0C:9C33: 7D        .byte $7D   ; 
- D 0 - I - 0x031C44 0C:9C34: 79        .byte $79   ; <y>
- D 0 - I - 0x031C45 0C:9C35: FC        .byte $FC   ; 
- D 0 - I - 0x031C46 0C:9C36: F0        .byte $F0   ; 
- D 0 - I - 0x031C47 0C:9C37: 01        .byte $01   ; 
- D 0 - I - 0x031C48 0C:9C38: 52        .byte $52   ; <R>
- D 0 - I - 0x031C49 0C:9C39: E4        .byte $E4   ; 
- D 0 - I - 0x031C4A 0C:9C3A: 16        .byte $16   ; 
- D 0 - I - 0x031C4B 0C:9C3B: FC        .byte $FC   ; 
- - - - - - 0x031C4C 0C:9C3C: 01        .byte $01   ; 
- D 0 - I - 0x031C4D 0C:9C3D: E8        .byte $E8   ; 
- D 0 - I - 0x031C4E 0C:9C3E: A0        .byte $A0   ; 
- D 0 - I - 0x031C4F 0C:9C3F: 00        .byte $00   ; 
- D 0 - I - 0x031C50 0C:9C40: 12        .byte $12   ; 
- D 0 - I - 0x031C51 0C:9C41: 02        .byte $02   ; 
- D 0 - I - 0x031C52 0C:9C42: 10        .byte $10   ; 
- D 0 - I - 0x031C53 0C:9C43: 79        .byte $79   ; <y>
- D 0 - I - 0x031C54 0C:9C44: FC        .byte $FC   ; 
- D 0 - I - 0x031C55 0C:9C45: F0        .byte $F0   ; 
- D 0 - I - 0x031C56 0C:9C46: 01        .byte $01   ; 
- D 0 - I - 0x031C57 0C:9C47: 62        .byte $62   ; <b>
- D 0 - I - 0x031C58 0C:9C48: E4        .byte $E4   ; 
- D 0 - I - 0x031C59 0C:9C49: 16        .byte $16   ; 
- D 0 - I - 0x031C5A 0C:9C4A: FC        .byte $FC   ; 
- - - - - - 0x031C5B 0C:9C4B: 01        .byte $01   ; 
- D 0 - I - 0x031C5C 0C:9C4C: E8        .byte $E8   ; 
- D 0 - I - 0x031C5D 0C:9C4D: 14        .byte $14   ; 
- D 0 - I - 0x031C5E 0C:9C4E: FC        .byte $FC   ; 
- - - - - - 0x031C5F 0C:9C4F: 01        .byte $01   ; 
- D 0 - I - 0x031C60 0C:9C50: E9        .byte $E9   ; 
- D 0 - I - 0x031C61 0C:9C51: A0        .byte $A0   ; 
- D 0 - I - 0x031C62 0C:9C52: 00        .byte $00   ; 
- D 0 - I - 0x031C63 0C:9C53: 12        .byte $12   ; 
- D 0 - I - 0x031C64 0C:9C54: 02        .byte $02   ; 
- D 0 - I - 0x031C65 0C:9C55: 10        .byte $10   ; 
- D 0 - I - 0x031C66 0C:9C56: 79        .byte $79   ; <y>
- D 0 - I - 0x031C67 0C:9C57: FC        .byte $FC   ; 
- D 0 - I - 0x031C68 0C:9C58: F0        .byte $F0   ; 
- D 0 - I - 0x031C69 0C:9C59: 01        .byte $01   ; 
- D 0 - I - 0x031C6A 0C:9C5A: 62        .byte $62   ; <b>
- D 0 - I - 0x031C6B 0C:9C5B: E4        .byte $E4   ; 
- D 0 - I - 0x031C6C 0C:9C5C: 2D        .byte $2D   ; 
- D 0 - I - 0x031C6D 0C:9C5D: FC        .byte $FC   ; 
- - - - - - 0x031C6E 0C:9C5E: 01        .byte $01   ; 
- D 0 - I - 0x031C6F 0C:9C5F: E8        .byte $E8   ; 
- D 0 - I - 0x031C70 0C:9C60: 10        .byte $10   ; 
- D 0 - I - 0x031C71 0C:9C61: 11        .byte $11   ; 
- D 0 - I - 0x031C72 0C:9C62: FC        .byte $FC   ; 
- - - - - - 0x031C73 0C:9C63: 01        .byte $01   ; 
- D 0 - I - 0x031C74 0C:9C64: E7        .byte $E7   ; 
- D 0 - I - 0x031C75 0C:9C65: 16        .byte $16   ; 
- D 0 - I - 0x031C76 0C:9C66: 2E        .byte $2E   ; 
- D 0 - I - 0x031C77 0C:9C67: A0        .byte $A0   ; 
- D 0 - I - 0x031C78 0C:9C68: 00        .byte $00   ; 
- D 0 - I - 0x031C79 0C:9C69: 06        .byte $06   ; 
- D 0 - I - 0x031C7A 0C:9C6A: 0A        .byte $0A   ; 
- D 0 - I - 0x031C7B 0C:9C6B: 2E        .byte $2E   ; 
- D 0 - I - 0x031C7C 0C:9C6C: AA        .byte $AA   ; 
- D 0 - I - 0x031C7D 0C:9C6D: 7D        .byte $7D   ; 
- D 0 - I - 0x031C7E 0C:9C6E: 79        .byte $79   ; <y>
- D 0 - I - 0x031C7F 0C:9C6F: FC        .byte $FC   ; 
- D 0 - I - 0x031C80 0C:9C70: F0        .byte $F0   ; 
- D 0 - I - 0x031C81 0C:9C71: 01        .byte $01   ; 
- D 0 - I - 0x031C82 0C:9C72: 62        .byte $62   ; <b>
- D 0 - I - 0x031C83 0C:9C73: 0C        .byte $0C   ; 
- D 0 - I - 0x031C84 0C:9C74: 06        .byte $06   ; 
- D 0 - I - 0x031C85 0C:9C75: 0C        .byte $0C   ; 
- D 0 - I - 0x031C86 0C:9C76: FC        .byte $FC   ; 
- - - - - - 0x031C87 0C:9C77: 01        .byte $01   ; 
- D 0 - I - 0x031C88 0C:9C78: E4        .byte $E4   ; 
- D 0 - I - 0x031C89 0C:9C79: A0        .byte $A0   ; 
- D 0 - I - 0x031C8A 0C:9C7A: FC        .byte $FC   ; 
- - - - - - 0x031C8B 0C:9C7B: 08        .byte $08   ; 
- D 0 - I - 0x031C8C 0C:9C7C: 46        .byte $46   ; <F>
- D 0 - I - 0x031C8D 0C:9C7D: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031C8E 0C:9C7E: 54        .byte $54   ; <T>
- D 0 - I - 0x031C8F 0C:9C7F: 79        .byte $79   ; <y>
- D 0 - I - 0x031C90 0C:9C80: FC        .byte $FC   ; 
- D 0 - I - 0x031C91 0C:9C81: F0        .byte $F0   ; 
- D 0 - I - 0x031C92 0C:9C82: F2        .byte $F2   ; 
- D 0 - I - 0x031C93 0C:9C83: 01        .byte $01   ; 
- D 0 - I - 0x031C94 0C:9C84: 51        .byte $51   ; <Q>
- D 0 - I - 0x031C95 0C:9C85: E4        .byte $E4   ; 
- D 0 - I - 0x031C96 0C:9C86: 16        .byte $16   ; 
- D 0 - I - 0x031C97 0C:9C87: FC        .byte $FC   ; 
- - - - - - 0x031C98 0C:9C88: 01        .byte $01   ; 
- D 0 - I - 0x031C99 0C:9C89: ED        .byte $ED   ; 
- D 0 - I - 0x031C9A 0C:9C8A: A0        .byte $A0   ; 
- D 0 - I - 0x031C9B 0C:9C8B: 00        .byte $00   ; 
- D 0 - I - 0x031C9C 0C:9C8C: 21        .byte $21   ; 
- D 0 - I - 0x031C9D 0C:9C8D: 06        .byte $06   ; 
- D 0 - I - 0x031C9E 0C:9C8E: 03        .byte $03   ; 
- D 0 - I - 0x031C9F 0C:9C8F: 79        .byte $79   ; <y>
- D 0 - I - 0x031CA0 0C:9C90: FC        .byte $FC   ; 
- D 0 - I - 0x031CA1 0C:9C91: F0        .byte $F0   ; 
- D 0 - I - 0x031CA2 0C:9C92: F2        .byte $F2   ; 
- D 0 - I - 0x031CA3 0C:9C93: 01        .byte $01   ; 
- D 0 - I - 0x031CA4 0C:9C94: 52        .byte $52   ; <R>
- D 0 - I - 0x031CA5 0C:9C95: 05        .byte $05   ; 
- D 0 - I - 0x031CA6 0C:9C96: F7        .byte $F7   ; 
- D 0 - I - 0x031CA7 0C:9C97: 02        .byte $02   ; 
- D 0 - I - 0x031CA8 0C:9C98: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031CA9 0C:9C99: 14        .byte $14   ; 
- D 0 - I - 0x031CAA 0C:9C9A: FC        .byte $FC   ; 
- - - - - - 0x031CAB 0C:9C9B: 01        .byte $01   ; 
- D 0 - I - 0x031CAC 0C:9C9C: 0A        .byte $0A   ; 
- D 0 - I - 0x031CAD 0C:9C9D: 0A        .byte $0A   ; 
- D 0 - I - 0x031CAE 0C:9C9E: AD        .byte $AD   ; 
- D 0 - I - 0x031CAF 0C:9C9F: 00        .byte $00   ; 
- D 0 - I - 0x031CB0 0C:9CA0: 5E        .byte $5E   ; 
- D 0 - I - 0x031CB1 0C:9CA1: 42        .byte $42   ; <B>
- D 0 - I - 0x031CB2 0C:9CA2: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031CB3 0C:9CA3: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031CB4 0C:9CA4: 69        .byte $69   ; <i>
- D 0 - I - 0x031CB5 0C:9CA5: AA        .byte $AA   ; 
- D 0 - I - 0x031CB6 0C:9CA6: 7D        .byte $7D   ; 
- D 0 - I - 0x031CB7 0C:9CA7: 79        .byte $79   ; <y>
- D 0 - I - 0x031CB8 0C:9CA8: FC        .byte $FC   ; 
- D 0 - I - 0x031CB9 0C:9CA9: F0        .byte $F0   ; 
- D 0 - I - 0x031CBA 0C:9CAA: F4        .byte $F4   ; 
- D 0 - I - 0x031CBB 0C:9CAB: 05        .byte $05   ; 
- D 0 - I - 0x031CBC 0C:9CAC: CC        .byte $CC   ; 
- D 0 - I - 0x031CBD 0C:9CAD: 9C        .byte $9C   ; 
- D 0 - I - 0x031CBE 0C:9CAE: E6        .byte $E6   ; 
- D 0 - I - 0x031CBF 0C:9CAF: 9C        .byte $9C   ; 
- D 0 - I - 0x031CC0 0C:9CB0: 00        .byte $00   ; 
- D 0 - I - 0x031CC1 0C:9CB1: 9D        .byte $9D   ; 
- D 0 - I - 0x031CC2 0C:9CB2: 1F        .byte $1F   ; 
- D 0 - I - 0x031CC3 0C:9CB3: 9D        .byte $9D   ; 
- D 0 - I - 0x031CC4 0C:9CB4: A1        .byte $A1   ; 
- D 0 - I - 0x031CC5 0C:9CB5: 9D        .byte $9D   ; 
- D 0 - I - 0x031CC6 0C:9CB6: C8        .byte $C8   ; 
- D 0 - I - 0x031CC7 0C:9CB7: 9D        .byte $9D   ; 
- D 0 - I - 0x031CC8 0C:9CB8: EE        .byte $EE   ; 
- D 0 - I - 0x031CC9 0C:9CB9: 9D        .byte $9D   ; 
- D 0 - I - 0x031CCA 0C:9CBA: 20        .byte $20   ; 
- D 0 - I - 0x031CCB 0C:9CBB: 9E        .byte $9E   ; 
- D 0 - I - 0x031CCC 0C:9CBC: 51        .byte $51   ; <Q>
- D 0 - I - 0x031CCD 0C:9CBD: 9E        .byte $9E   ; 
- D 0 - I - 0x031CCE 0C:9CBE: 50        .byte $50   ; <P>
- D 0 - I - 0x031CCF 0C:9CBF: 9D        .byte $9D   ; 
- D 0 - I - 0x031CD0 0C:9CC0: 33        .byte $33   ; <3>
- D 0 - I - 0x031CD1 0C:9CC1: 9D        .byte $9D   ; 
- D 0 - I - 0x031CD2 0C:9CC2: 80        .byte $80   ; 
- D 0 - I - 0x031CD3 0C:9CC3: 9D        .byte $9D   ; 
- D 0 - I - 0x031CD4 0C:9CC4: 88        .byte $88   ; 
- D 0 - I - 0x031CD5 0C:9CC5: 9E        .byte $9E   ; 
- - - - - - 0x031CD6 0C:9CC6: B6        .byte $B6   ; 
- - - - - - 0x031CD7 0C:9CC7: 9E        .byte $9E   ; 
- D 0 - I - 0x031CD8 0C:9CC8: D1        .byte $D1   ; 
- D 0 - I - 0x031CD9 0C:9CC9: 9E        .byte $9E   ; 
- - - - - - 0x031CDA 0C:9CCA: FD        .byte $FD   ; 
- - - - - - 0x031CDB 0C:9CCB: 9E        .byte $9E   ; 
- D 0 - I - 0x031CDC 0C:9CCC: 01        .byte $01   ; 
- D 0 - I - 0x031CDD 0C:9CCD: 13        .byte $13   ; 
- D 0 - I - 0x031CDE 0C:9CCE: F1        .byte $F1   ; 
- D 0 - I - 0x031CDF 0C:9CCF: 19        .byte $19   ; 
- D 0 - I - 0x031CE0 0C:9CD0: 00        .byte $00   ; 
- D 0 - I - 0x031CE1 0C:9CD1: 68        .byte $68   ; <h>
- D 0 - I - 0x031CE2 0C:9CD2: 7D        .byte $7D   ; 
- D 0 - I - 0x031CE3 0C:9CD3: C2        .byte $C2   ; 
- D 0 - I - 0x031CE4 0C:9CD4: AD        .byte $AD   ; 
- D 0 - I - 0x031CE5 0C:9CD5: FC        .byte $FC   ; 
- - - - - - 0x031CE6 0C:9CD6: 01        .byte $01   ; 
- D 0 - I - 0x031CE7 0C:9CD7: 0A        .byte $0A   ; 
- D 0 - I - 0x031CE8 0C:9CD8: 03        .byte $03   ; 
- D 0 - I - 0x031CE9 0C:9CD9: 1A        .byte $1A   ; 
- D 0 - I - 0x031CEA 0C:9CDA: 2E        .byte $2E   ; 
- D 0 - I - 0x031CEB 0C:9CDB: 0E        .byte $0E   ; 
- D 0 - I - 0x031CEC 0C:9CDC: 2E        .byte $2E   ; 
- D 0 - I - 0x031CED 0C:9CDD: 2D        .byte $2D   ; 
- D 0 - I - 0x031CEE 0C:9CDE: 00        .byte $00   ; 
- D 0 - I - 0x031CEF 0C:9CDF: 21        .byte $21   ; 
- D 0 - I - 0x031CF0 0C:9CE0: 06        .byte $06   ; 
- D 0 - I - 0x031CF1 0C:9CE1: 04        .byte $04   ; 
- D 0 - I - 0x031CF2 0C:9CE2: 1F        .byte $1F   ; 
- D 0 - I - 0x031CF3 0C:9CE3: 0D        .byte $0D   ; 
- D 0 - I - 0x031CF4 0C:9CE4: FC        .byte $FC   ; 
- D 0 - I - 0x031CF5 0C:9CE5: F0        .byte $F0   ; 
- D 0 - I - 0x031CF6 0C:9CE6: 01        .byte $01   ; 
- D 0 - I - 0x031CF7 0C:9CE7: 14        .byte $14   ; 
- D 0 - I - 0x031CF8 0C:9CE8: F2        .byte $F2   ; 
- D 0 - I - 0x031CF9 0C:9CE9: 19        .byte $19   ; 
- D 0 - I - 0x031CFA 0C:9CEA: 00        .byte $00   ; 
- D 0 - I - 0x031CFB 0C:9CEB: 68        .byte $68   ; <h>
- D 0 - I - 0x031CFC 0C:9CEC: 7D        .byte $7D   ; 
- D 0 - I - 0x031CFD 0C:9CED: C2        .byte $C2   ; 
- D 0 - I - 0x031CFE 0C:9CEE: AD        .byte $AD   ; 
- D 0 - I - 0x031CFF 0C:9CEF: FC        .byte $FC   ; 
- - - - - - 0x031D00 0C:9CF0: 01        .byte $01   ; 
- D 0 - I - 0x031D01 0C:9CF1: 0A        .byte $0A   ; 
- D 0 - I - 0x031D02 0C:9CF2: 03        .byte $03   ; 
- D 0 - I - 0x031D03 0C:9CF3: 1A        .byte $1A   ; 
- D 0 - I - 0x031D04 0C:9CF4: 2E        .byte $2E   ; 
- D 0 - I - 0x031D05 0C:9CF5: 0E        .byte $0E   ; 
- D 0 - I - 0x031D06 0C:9CF6: 2E        .byte $2E   ; 
- D 0 - I - 0x031D07 0C:9CF7: 2D        .byte $2D   ; 
- D 0 - I - 0x031D08 0C:9CF8: 00        .byte $00   ; 
- D 0 - I - 0x031D09 0C:9CF9: 21        .byte $21   ; 
- D 0 - I - 0x031D0A 0C:9CFA: 06        .byte $06   ; 
- D 0 - I - 0x031D0B 0C:9CFB: 04        .byte $04   ; 
- D 0 - I - 0x031D0C 0C:9CFC: 1F        .byte $1F   ; 
- D 0 - I - 0x031D0D 0C:9CFD: 0D        .byte $0D   ; 
- D 0 - I - 0x031D0E 0C:9CFE: FC        .byte $FC   ; 
- D 0 - I - 0x031D0F 0C:9CFF: F0        .byte $F0   ; 
- D 0 - I - 0x031D10 0C:9D00: 01        .byte $01   ; 
- D 0 - I - 0x031D11 0C:9D01: 10        .byte $10   ; 
- D 0 - I - 0x031D12 0C:9D02: 0C        .byte $0C   ; 
- D 0 - I - 0x031D13 0C:9D03: 01        .byte $01   ; 
- D 0 - I - 0x031D14 0C:9D04: 02        .byte $02   ; 
- D 0 - I - 0x031D15 0C:9D05: 1A        .byte $1A   ; 
- D 0 - I - 0x031D16 0C:9D06: 00        .byte $00   ; 
- D 0 - I - 0x031D17 0C:9D07: AE        .byte $AE   ; 
- D 0 - I - 0x031D18 0C:9D08: 03        .byte $03   ; 
- D 0 - I - 0x031D19 0C:9D09: 13        .byte $13   ; 
- D 0 - I - 0x031D1A 0C:9D0A: 2E        .byte $2E   ; 
- D 0 - I - 0x031D1B 0C:9D0B: 19        .byte $19   ; 
- D 0 - I - 0x031D1C 0C:9D0C: 1F        .byte $1F   ; 
- D 0 - I - 0x031D1D 0C:9D0D: 1F        .byte $1F   ; 
- D 0 - I - 0x031D1E 0C:9D0E: FC        .byte $FC   ; 
- - - - - - 0x031D1F 0C:9D0F: 01        .byte $01   ; 
- D 0 - I - 0x031D20 0C:9D10: 0A        .byte $0A   ; 
- D 0 - I - 0x031D21 0C:9D11: 03        .byte $03   ; 
- D 0 - I - 0x031D22 0C:9D12: 1A        .byte $1A   ; 
- D 0 - I - 0x031D23 0C:9D13: 2E        .byte $2E   ; 
- D 0 - I - 0x031D24 0C:9D14: 0E        .byte $0E   ; 
- D 0 - I - 0x031D25 0C:9D15: 2E        .byte $2E   ; 
- D 0 - I - 0x031D26 0C:9D16: 2D        .byte $2D   ; 
- D 0 - I - 0x031D27 0C:9D17: 00        .byte $00   ; 
- D 0 - I - 0x031D28 0C:9D18: 21        .byte $21   ; 
- D 0 - I - 0x031D29 0C:9D19: 06        .byte $06   ; 
- D 0 - I - 0x031D2A 0C:9D1A: 04        .byte $04   ; 
- D 0 - I - 0x031D2B 0C:9D1B: 1F        .byte $1F   ; 
- D 0 - I - 0x031D2C 0C:9D1C: 0D        .byte $0D   ; 
- D 0 - I - 0x031D2D 0C:9D1D: FC        .byte $FC   ; 
- D 0 - I - 0x031D2E 0C:9D1E: F0        .byte $F0   ; 
- D 0 - I - 0x031D2F 0C:9D1F: 01        .byte $01   ; 
- D 0 - I - 0x031D30 0C:9D20: 65        .byte $65   ; <e>
- D 0 - I - 0x031D31 0C:9D21: F1        .byte $F1   ; 
- D 0 - I - 0x031D32 0C:9D22: FC        .byte $FC   ; 
- - - - - - 0x031D33 0C:9D23: 01        .byte $01   ; 
- D 0 - I - 0x031D34 0C:9D24: F2        .byte $F2   ; 
- D 0 - I - 0x031D35 0C:9D25: 2D        .byte $2D   ; 
- D 0 - I - 0x031D36 0C:9D26: FC        .byte $FC   ; 
- - - - - - 0x031D37 0C:9D27: 01        .byte $01   ; 
- D 0 - I - 0x031D38 0C:9D28: 08        .byte $08   ; 
- D 0 - I - 0x031D39 0C:9D29: AA        .byte $AA   ; 
- D 0 - I - 0x031D3A 0C:9D2A: 0C        .byte $0C   ; 
- D 0 - I - 0x031D3B 0C:9D2B: 1F        .byte $1F   ; 
- D 0 - I - 0x031D3C 0C:9D2C: 0C        .byte $0C   ; 
- D 0 - I - 0x031D3D 0C:9D2D: 10        .byte $10   ; 
- D 0 - I - 0x031D3E 0C:9D2E: F7        .byte $F7   ; 
- D 0 - I - 0x031D3F 0C:9D2F: 03        .byte $03   ; 
- D 0 - I - 0x031D40 0C:9D30: 79        .byte $79   ; <y>
- D 0 - I - 0x031D41 0C:9D31: FC        .byte $FC   ; 
- D 0 - I - 0x031D42 0C:9D32: F0        .byte $F0   ; 
- D 0 - I - 0x031D43 0C:9D33: 01        .byte $01   ; 
- D 0 - I - 0x031D44 0C:9D34: 66        .byte $66   ; <f>
- D 0 - I - 0x031D45 0C:9D35: F1        .byte $F1   ; 
- D 0 - I - 0x031D46 0C:9D36: 24        .byte $24   ; 
- D 0 - I - 0x031D47 0C:9D37: B1        .byte $B1   ; 
- D 0 - I - 0x031D48 0C:9D38: 2A        .byte $2A   ; 
- D 0 - I - 0x031D49 0C:9D39: 29        .byte $29   ; 
- D 0 - I - 0x031D4A 0C:9D3A: F7        .byte $F7   ; 
- D 0 - I - 0x031D4B 0C:9D3B: 02        .byte $02   ; 
- D 0 - I - 0x031D4C 0C:9D3C: 79        .byte $79   ; <y>
- D 0 - I - 0x031D4D 0C:9D3D: FC        .byte $FC   ; 
- - - - - - 0x031D4E 0C:9D3E: 01        .byte $01   ; 
- D 0 - I - 0x031D4F 0C:9D3F: F2        .byte $F2   ; 
- D 0 - I - 0x031D50 0C:9D40: 00        .byte $00   ; 
- D 0 - I - 0x031D51 0C:9D41: F1        .byte $F1   ; 
- D 0 - I - 0x031D52 0C:9D42: 2D        .byte $2D   ; 
- D 0 - I - 0x031D53 0C:9D43: FC        .byte $FC   ; 
- - - - - - 0x031D54 0C:9D44: 01        .byte $01   ; 
- D 0 - I - 0x031D55 0C:9D45: 08        .byte $08   ; 
- D 0 - I - 0x031D56 0C:9D46: AA        .byte $AA   ; 
- D 0 - I - 0x031D57 0C:9D47: 0C        .byte $0C   ; 
- D 0 - I - 0x031D58 0C:9D48: 1F        .byte $1F   ; 
- D 0 - I - 0x031D59 0C:9D49: 0C        .byte $0C   ; 
- D 0 - I - 0x031D5A 0C:9D4A: 10        .byte $10   ; 
- D 0 - I - 0x031D5B 0C:9D4B: F7        .byte $F7   ; 
- D 0 - I - 0x031D5C 0C:9D4C: 03        .byte $03   ; 
- D 0 - I - 0x031D5D 0C:9D4D: 79        .byte $79   ; <y>
- D 0 - I - 0x031D5E 0C:9D4E: FC        .byte $FC   ; 
- D 0 - I - 0x031D5F 0C:9D4F: F0        .byte $F0   ; 
- D 0 - I - 0x031D60 0C:9D50: 01        .byte $01   ; 
- D 0 - I - 0x031D61 0C:9D51: 75        .byte $75   ; <u>
- D 0 - I - 0x031D62 0C:9D52: 1F        .byte $1F   ; 
- D 0 - I - 0x031D63 0C:9D53: 0B        .byte $0B   ; 
- D 0 - I - 0x031D64 0C:9D54: 16        .byte $16   ; 
- D 0 - I - 0x031D65 0C:9D55: 00        .byte $00   ; 
- D 0 - I - 0x031D66 0C:9D56: 1A        .byte $1A   ; 
- D 0 - I - 0x031D67 0C:9D57: 08        .byte $08   ; 
- D 0 - I - 0x031D68 0C:9D58: 18        .byte $18   ; 
- D 0 - I - 0x031D69 0C:9D59: 12        .byte $12   ; 
- D 0 - I - 0x031D6A 0C:9D5A: 19        .byte $19   ; 
- D 0 - I - 0x031D6B 0C:9D5B: FC        .byte $FC   ; 
- - - - - - 0x031D6C 0C:9D5C: 01        .byte $01   ; 
- D 0 - I - 0x031D6D 0C:9D5D: 22        .byte $22   ; 
- D 0 - I - 0x031D6E 0C:9D5E: 02        .byte $02   ; 
- D 0 - I - 0x031D6F 0C:9D5F: 0C        .byte $0C   ; 
- D 0 - I - 0x031D70 0C:9D60: 32        .byte $32   ; <2>
- D 0 - I - 0x031D71 0C:9D61: 03        .byte $03   ; 
- D 0 - I - 0x031D72 0C:9D62: B1        .byte $B1   ; 
- D 0 - I - 0x031D73 0C:9D63: 79        .byte $79   ; <y>
- D 0 - I - 0x031D74 0C:9D64: FC        .byte $FC   ; 
- - - - - - 0x031D75 0C:9D65: 04        .byte $04   ; 
- D 0 - I - 0x031D76 0C:9D66: F1        .byte $F1   ; 
- D 0 - I - 0x031D77 0C:9D67: 00        .byte $00   ; 
- D 0 - I - 0x031D78 0C:9D68: A3        .byte $A3   ; 
- D 0 - I - 0x031D79 0C:9D69: 07        .byte $07   ; 
- D 0 - I - 0x031D7A 0C:9D6A: 14        .byte $14   ; 
- D 0 - I - 0x031D7B 0C:9D6B: 03        .byte $03   ; 
- D 0 - I - 0x031D7C 0C:9D6C: 19        .byte $19   ; 
- D 0 - I - 0x031D7D 0C:9D6D: 0D        .byte $0D   ; 
- D 0 - I - 0x031D7E 0C:9D6E: 04        .byte $04   ; 
- D 0 - I - 0x031D7F 0C:9D6F: FC        .byte $FC   ; 
- - - - - - 0x031D80 0C:9D70: 01        .byte $01   ; 
- D 0 - I - 0x031D81 0C:9D71: 06        .byte $06   ; 
- D 0 - I - 0x031D82 0C:9D72: 11        .byte $11   ; 
- D 0 - I - 0x031D83 0C:9D73: 14        .byte $14   ; 
- D 0 - I - 0x031D84 0C:9D74: 2F        .byte $2F   ; 
- D 0 - I - 0x031D85 0C:9D75: 10        .byte $10   ; 
- D 0 - I - 0x031D86 0C:9D76: 00        .byte $00   ; 
- D 0 - I - 0x031D87 0C:9D77: 0C        .byte $0C   ; 
- D 0 - I - 0x031D88 0C:9D78: 32        .byte $32   ; <2>
- D 0 - I - 0x031D89 0C:9D79: 03        .byte $03   ; 
- D 0 - I - 0x031D8A 0C:9D7A: 28        .byte $28   ; 
- D 0 - I - 0x031D8B 0C:9D7B: AD        .byte $AD   ; 
- D 0 - I - 0x031D8C 0C:9D7C: 0D        .byte $0D   ; 
- D 0 - I - 0x031D8D 0C:9D7D: 79        .byte $79   ; <y>
- D 0 - I - 0x031D8E 0C:9D7E: FC        .byte $FC   ; 
- D 0 - I - 0x031D8F 0C:9D7F: F0        .byte $F0   ; 
- D 0 - I - 0x031D90 0C:9D80: 01        .byte $01   ; 
- D 0 - I - 0x031D91 0C:9D81: 66        .byte $66   ; <f>
- D 0 - I - 0x031D92 0C:9D82: F1        .byte $F1   ; 
- D 0 - I - 0x031D93 0C:9D83: 00        .byte $00   ; 
- D 0 - I - 0x031D94 0C:9D84: A5        .byte $A5   ; 
- D 0 - I - 0x031D95 0C:9D85: 2E        .byte $2E   ; 
- D 0 - I - 0x031D96 0C:9D86: 18        .byte $18   ; 
- D 0 - I - 0x031D97 0C:9D87: 2E        .byte $2E   ; 
- D 0 - I - 0x031D98 0C:9D88: 79        .byte $79   ; <y>
- D 0 - I - 0x031D99 0C:9D89: FC        .byte $FC   ; 
- - - - - - 0x031D9A 0C:9D8A: 01        .byte $01   ; 
- D 0 - I - 0x031D9B 0C:9D8B: 8D        .byte $8D   ; 
- D 0 - I - 0x031D9C 0C:9D8C: 8B        .byte $8B   ; 
- D 0 - I - 0x031D9D 0C:9D8D: A0        .byte $A0   ; 
- D 0 - I - 0x031D9E 0C:9D8E: 2F        .byte $2F   ; 
- D 0 - I - 0x031D9F 0C:9D8F: 0E        .byte $0E   ; 
- D 0 - I - 0x031DA0 0C:9D90: 2E        .byte $2E   ; 
- D 0 - I - 0x031DA1 0C:9D91: AD        .byte $AD   ; 
- D 0 - I - 0x031DA2 0C:9D92: FC        .byte $FC   ; 
- - - - - - 0x031DA3 0C:9D93: 01        .byte $01   ; 
- D 0 - I - 0x031DA4 0C:9D94: 24        .byte $24   ; 
- D 0 - I - 0x031DA5 0C:9D95: B1        .byte $B1   ; 
- D 0 - I - 0x031DA6 0C:9D96: 2A        .byte $2A   ; 
- D 0 - I - 0x031DA7 0C:9D97: 13        .byte $13   ; 
- D 0 - I - 0x031DA8 0C:9D98: 0C        .byte $0C   ; 
- D 0 - I - 0x031DA9 0C:9D99: 1F        .byte $1F   ; 
- D 0 - I - 0x031DAA 0C:9D9A: 2F        .byte $2F   ; 
- D 0 - I - 0x031DAB 0C:9D9B: 10        .byte $10   ; 
- D 0 - I - 0x031DAC 0C:9D9C: F7        .byte $F7   ; 
- D 0 - I - 0x031DAD 0C:9D9D: 03        .byte $03   ; 
- D 0 - I - 0x031DAE 0C:9D9E: 79        .byte $79   ; <y>
- D 0 - I - 0x031DAF 0C:9D9F: FC        .byte $FC   ; 
- D 0 - I - 0x031DB0 0C:9DA0: F0        .byte $F0   ; 
- D 0 - I - 0x031DB1 0C:9DA1: 01        .byte $01   ; 
- D 0 - I - 0x031DB2 0C:9DA2: 75        .byte $75   ; <u>
- D 0 - I - 0x031DB3 0C:9DA3: F1        .byte $F1   ; 
- D 0 - I - 0x031DB4 0C:9DA4: 00        .byte $00   ; 
- D 0 - I - 0x031DB5 0C:9DA5: 24        .byte $24   ; 
- D 0 - I - 0x031DB6 0C:9DA6: 2F        .byte $2F   ; 
- D 0 - I - 0x031DB7 0C:9DA7: 10        .byte $10   ; 
- D 0 - I - 0x031DB8 0C:9DA8: A9        .byte $A9   ; 
- D 0 - I - 0x031DB9 0C:9DA9: 79        .byte $79   ; <y>
- D 0 - I - 0x031DBA 0C:9DAA: FC        .byte $FC   ; 
- - - - - - 0x031DBB 0C:9DAB: 01        .byte $01   ; 
- D 0 - I - 0x031DBC 0C:9DAC: F2        .byte $F2   ; 
- D 0 - I - 0x031DBD 0C:9DAD: 2D        .byte $2D   ; 
- D 0 - I - 0x031DBE 0C:9DAE: 00        .byte $00   ; 
- D 0 - I - 0x031DBF 0C:9DAF: 08        .byte $08   ; 
- D 0 - I - 0x031DC0 0C:9DB0: AA        .byte $AA   ; 
- D 0 - I - 0x031DC1 0C:9DB1: 0C        .byte $0C   ; 
- D 0 - I - 0x031DC2 0C:9DB2: FC        .byte $FC   ; 
- - - - - - 0x031DC3 0C:9DB3: 01        .byte $01   ; 
- D 0 - I - 0x031DC4 0C:9DB4: 09        .byte $09   ; 
- D 0 - I - 0x031DC5 0C:9DB5: 2F        .byte $2F   ; 
- D 0 - I - 0x031DC6 0C:9DB6: 0C        .byte $0C   ; 
- D 0 - I - 0x031DC7 0C:9DB7: 32        .byte $32   ; <2>
- D 0 - I - 0x031DC8 0C:9DB8: 03        .byte $03   ; 
- D 0 - I - 0x031DC9 0C:9DB9: 0E        .byte $0E   ; 
- D 0 - I - 0x031DCA 0C:9DBA: 2E        .byte $2E   ; 
- D 0 - I - 0x031DCB 0C:9DBB: FC        .byte $FC   ; 
- - - - - - 0x031DCC 0C:9DBC: 01        .byte $01   ; 
- D 0 - I - 0x031DCD 0C:9DBD: 0C        .byte $0C   ; 
- D 0 - I - 0x031DCE 0C:9DBE: 2E        .byte $2E   ; 
- D 0 - I - 0x031DCF 0C:9DBF: 0C        .byte $0C   ; 
- D 0 - I - 0x031DD0 0C:9DC0: 31        .byte $31   ; <1>
- D 0 - I - 0x031DD1 0C:9DC1: 12        .byte $12   ; 
- D 0 - I - 0x031DD2 0C:9DC2: AA        .byte $AA   ; 
- D 0 - I - 0x031DD3 0C:9DC3: F7        .byte $F7   ; 
- D 0 - I - 0x031DD4 0C:9DC4: 03        .byte $03   ; 
- D 0 - I - 0x031DD5 0C:9DC5: 79        .byte $79   ; <y>
- D 0 - I - 0x031DD6 0C:9DC6: FC        .byte $FC   ; 
- D 0 - I - 0x031DD7 0C:9DC7: F0        .byte $F0   ; 
- D 0 - I - 0x031DD8 0C:9DC8: 01        .byte $01   ; 
- D 0 - I - 0x031DD9 0C:9DC9: 75        .byte $75   ; <u>
- D 0 - I - 0x031DDA 0C:9DCA: F1        .byte $F1   ; 
- D 0 - I - 0x031DDB 0C:9DCB: 00        .byte $00   ; 
- D 0 - I - 0x031DDC 0C:9DCC: 0C        .byte $0C   ; 
- D 0 - I - 0x031DDD 0C:9DCD: 32        .byte $32   ; <2>
- D 0 - I - 0x031DDE 0C:9DCE: 03        .byte $03   ; 
- D 0 - I - 0x031DDF 0C:9DCF: 28        .byte $28   ; 
- D 0 - I - 0x031DE0 0C:9DD0: 79        .byte $79   ; <y>
- D 0 - I - 0x031DE1 0C:9DD1: FC        .byte $FC   ; 
- - - - - - 0x031DE2 0C:9DD2: 04        .byte $04   ; 
- D 0 - I - 0x031DE3 0C:9DD3: 07        .byte $07   ; 
- D 0 - I - 0x031DE4 0C:9DD4: 32        .byte $32   ; <2>
- D 0 - I - 0x031DE5 0C:9DD5: 03        .byte $03   ; 
- D 0 - I - 0x031DE6 0C:9DD6: A4        .byte $A4   ; 
- D 0 - I - 0x031DE7 0C:9DD7: 03        .byte $03   ; 
- D 0 - I - 0x031DE8 0C:9DD8: FC        .byte $FC   ; 
- - - - - - 0x031DE9 0C:9DD9: 01        .byte $01   ; 
- D 0 - I - 0x031DEA 0C:9DDA: F2        .byte $F2   ; 
- D 0 - I - 0x031DEB 0C:9DDB: 2D        .byte $2D   ; 
- D 0 - I - 0x031DEC 0C:9DDC: 00        .byte $00   ; 
- D 0 - I - 0x031DED 0C:9DDD: 08        .byte $08   ; 
- D 0 - I - 0x031DEE 0C:9DDE: AA        .byte $AA   ; 
- D 0 - I - 0x031DEF 0C:9DDF: 0C        .byte $0C   ; 
- D 0 - I - 0x031DF0 0C:9DE0: FC        .byte $FC   ; 
- - - - - - 0x031DF1 0C:9DE1: 01        .byte $01   ; 
- D 0 - I - 0x031DF2 0C:9DE2: F1        .byte $F1   ; 
- D 0 - I - 0x031DF3 0C:9DE3: 00        .byte $00   ; 
- D 0 - I - 0x031DF4 0C:9DE4: 25        .byte $25   ; 
- D 0 - I - 0x031DF5 0C:9DE5: 03        .byte $03   ; 
- D 0 - I - 0x031DF6 0C:9DE6: 0C        .byte $0C   ; 
- D 0 - I - 0x031DF7 0C:9DE7: 32        .byte $32   ; <2>
- D 0 - I - 0x031DF8 0C:9DE8: 03        .byte $03   ; 
- D 0 - I - 0x031DF9 0C:9DE9: AA        .byte $AA   ; 
- D 0 - I - 0x031DFA 0C:9DEA: 7C        .byte $7C   ; 
- D 0 - I - 0x031DFB 0C:9DEB: 79        .byte $79   ; <y>
- D 0 - I - 0x031DFC 0C:9DEC: FC        .byte $FC   ; 
- D 0 - I - 0x031DFD 0C:9DED: F0        .byte $F0   ; 
- D 0 - I - 0x031DFE 0C:9DEE: 01        .byte $01   ; 
- D 0 - I - 0x031DFF 0C:9DEF: 71        .byte $71   ; <q>
- D 0 - I - 0x031E00 0C:9DF0: F1        .byte $F1   ; 
- D 0 - I - 0x031E01 0C:9DF1: 00        .byte $00   ; 
- D 0 - I - 0x031E02 0C:9DF2: 25        .byte $25   ; 
- D 0 - I - 0x031E03 0C:9DF3: 03        .byte $03   ; 
- D 0 - I - 0x031E04 0C:9DF4: 0C        .byte $0C   ; 
- D 0 - I - 0x031E05 0C:9DF5: 32        .byte $32   ; <2>
- D 0 - I - 0x031E06 0C:9DF6: 03        .byte $03   ; 
- D 0 - I - 0x031E07 0C:9DF7: 79        .byte $79   ; <y>
- D 0 - I - 0x031E08 0C:9DF8: FC        .byte $FC   ; 
- - - - - - 0x031E09 0C:9DF9: 04        .byte $04   ; 
- D 0 - I - 0x031E0A 0C:9DFA: 06        .byte $06   ; 
- D 0 - I - 0x031E0B 0C:9DFB: 12        .byte $12   ; 
- D 0 - I - 0x031E0C 0C:9DFC: 13        .byte $13   ; 
- D 0 - I - 0x031E0D 0C:9DFD: 19        .byte $19   ; 
- D 0 - I - 0x031E0E 0C:9DFE: 00        .byte $00   ; 
- D 0 - I - 0x031E0F 0C:9DFF: 15        .byte $15   ; 
- D 0 - I - 0x031E10 0C:9E00: 06        .byte $06   ; 
- D 0 - I - 0x031E11 0C:9E01: 1F        .byte $1F   ; 
- D 0 - I - 0x031E12 0C:9E02: 14        .byte $14   ; 
- D 0 - I - 0x031E13 0C:9E03: FC        .byte $FC   ; 
- - - - - - 0x031E14 0C:9E04: 01        .byte $01   ; 
- D 0 - I - 0x031E15 0C:9E05: A3        .byte $A3   ; 
- D 0 - I - 0x031E16 0C:9E06: 07        .byte $07   ; 
- D 0 - I - 0x031E17 0C:9E07: 0E        .byte $0E   ; 
- D 0 - I - 0x031E18 0C:9E08: 2E        .byte $2E   ; 
- D 0 - I - 0x031E19 0C:9E09: 19        .byte $19   ; 
- D 0 - I - 0x031E1A 0C:9E0A: 0D        .byte $0D   ; 
- D 0 - I - 0x031E1B 0C:9E0B: 04        .byte $04   ; 
- D 0 - I - 0x031E1C 0C:9E0C: 00        .byte $00   ; 
- D 0 - I - 0x031E1D 0C:9E0D: 12        .byte $12   ; 
- D 0 - I - 0x031E1E 0C:9E0E: AF        .byte $AF   ; 
- D 0 - I - 0x031E1F 0C:9E0F: 0B        .byte $0B   ; 
- D 0 - I - 0x031E20 0C:9E10: 08        .byte $08   ; 
- D 0 - I - 0x031E21 0C:9E11: 2E        .byte $2E   ; 
- D 0 - I - 0x031E22 0C:9E12: FC        .byte $FC   ; 
- - - - - - 0x031E23 0C:9E13: 01        .byte $01   ; 
- D 0 - I - 0x031E24 0C:9E14: F2        .byte $F2   ; 
- D 0 - I - 0x031E25 0C:9E15: 2D        .byte $2D   ; 
- D 0 - I - 0x031E26 0C:9E16: 00        .byte $00   ; 
- D 0 - I - 0x031E27 0C:9E17: 24        .byte $24   ; 
- D 0 - I - 0x031E28 0C:9E18: B1        .byte $B1   ; 
- D 0 - I - 0x031E29 0C:9E19: 28        .byte $28   ; 
- D 0 - I - 0x031E2A 0C:9E1A: 1F        .byte $1F   ; 
- D 0 - I - 0x031E2B 0C:9E1B: 0C        .byte $0C   ; 
- D 0 - I - 0x031E2C 0C:9E1C: 10        .byte $10   ; 
- D 0 - I - 0x031E2D 0C:9E1D: 79        .byte $79   ; <y>
- D 0 - I - 0x031E2E 0C:9E1E: FC        .byte $FC   ; 
- D 0 - I - 0x031E2F 0C:9E1F: F0        .byte $F0   ; 
- D 0 - I - 0x031E30 0C:9E20: 01        .byte $01   ; 
- D 0 - I - 0x031E31 0C:9E21: 79        .byte $79   ; <y>
- D 0 - I - 0x031E32 0C:9E22: 13        .byte $13   ; 
- D 0 - I - 0x031E33 0C:9E23: 2E        .byte $2E   ; 
- D 0 - I - 0x031E34 0C:9E24: 0B        .byte $0B   ; 
- D 0 - I - 0x031E35 0C:9E25: 02        .byte $02   ; 
- D 0 - I - 0x031E36 0C:9E26: 00        .byte $00   ; 
- D 0 - I - 0x031E37 0C:9E27: C1        .byte $C1   ; 
- D 0 - I - 0x031E38 0C:9E28: 74        .byte $74   ; <t>
- D 0 - I - 0x031E39 0C:9E29: 41        .byte $41   ; <A>
- D 0 - I - 0x031E3A 0C:9E2A: 4D        .byte $4D   ; <M>
- D 0 - I - 0x031E3B 0C:9E2B: 08        .byte $08   ; 
- D 0 - I - 0x031E3C 0C:9E2C: 2E        .byte $2E   ; 
- D 0 - I - 0x031E3D 0C:9E2D: FC        .byte $FC   ; 
- - - - - - 0x031E3E 0C:9E2E: 04        .byte $04   ; 
- D 0 - I - 0x031E3F 0C:9E2F: 24        .byte $24   ; 
- D 0 - I - 0x031E40 0C:9E30: B1        .byte $B1   ; 
- D 0 - I - 0x031E41 0C:9E31: 2A        .byte $2A   ; 
- D 0 - I - 0x031E42 0C:9E32: 29        .byte $29   ; 
- D 0 - I - 0x031E43 0C:9E33: 79        .byte $79   ; <y>
- D 0 - I - 0x031E44 0C:9E34: 79        .byte $79   ; <y>
- D 0 - I - 0x031E45 0C:9E35: FC        .byte $FC   ; 
- - - - - - 0x031E46 0C:9E36: 01        .byte $01   ; 
- D 0 - I - 0x031E47 0C:9E37: 16        .byte $16   ; 
- D 0 - I - 0x031E48 0C:9E38: 1E        .byte $1E   ; 
- D 0 - I - 0x031E49 0C:9E39: 2E        .byte $2E   ; 
- D 0 - I - 0x031E4A 0C:9E3A: 00        .byte $00   ; 
- D 0 - I - 0x031E4B 0C:9E3B: A6        .byte $A6   ; 
- D 0 - I - 0x031E4C 0C:9E3C: 31        .byte $31   ; <1>
- D 0 - I - 0x031E4D 0C:9E3D: 2E        .byte $2E   ; 
- D 0 - I - 0x031E4E 0C:9E3E: 09        .byte $09   ; 
- D 0 - I - 0x031E4F 0C:9E3F: 2F        .byte $2F   ; 
- D 0 - I - 0x031E50 0C:9E40: 0C        .byte $0C   ; 
- D 0 - I - 0x031E51 0C:9E41: 32        .byte $32   ; <2>
- D 0 - I - 0x031E52 0C:9E42: 03        .byte $03   ; 
- D 0 - I - 0x031E53 0C:9E43: 16        .byte $16   ; 
- D 0 - I - 0x031E54 0C:9E44: FC        .byte $FC   ; 
- - - - - - 0x031E55 0C:9E45: 01        .byte $01   ; 
- D 0 - I - 0x031E56 0C:9E46: 4A        .byte $4A   ; <J>
- D 0 - I - 0x031E57 0C:9E47: 5F        .byte $5F   ; 
- D 0 - I - 0x031E58 0C:9E48: 2D        .byte $2D   ; 
- D 0 - I - 0x031E59 0C:9E49: 00        .byte $00   ; 
- D 0 - I - 0x031E5A 0C:9E4A: 0D        .byte $0D   ; 
- D 0 - I - 0x031E5B 0C:9E4B: 0D        .byte $0D   ; 
- D 0 - I - 0x031E5C 0C:9E4C: 22        .byte $22   ; 
- D 0 - I - 0x031E5D 0C:9E4D: 10        .byte $10   ; 
- D 0 - I - 0x031E5E 0C:9E4E: 79        .byte $79   ; <y>
- D 0 - I - 0x031E5F 0C:9E4F: FC        .byte $FC   ; 
- D 0 - I - 0x031E60 0C:9E50: F0        .byte $F0   ; 
- D 0 - I - 0x031E61 0C:9E51: 01        .byte $01   ; 
- D 0 - I - 0x031E62 0C:9E52: 79        .byte $79   ; <y>
- D 0 - I - 0x031E63 0C:9E53: 16        .byte $16   ; 
- D 0 - I - 0x031E64 0C:9E54: 1E        .byte $1E   ; 
- D 0 - I - 0x031E65 0C:9E55: 2E        .byte $2E   ; 
- D 0 - I - 0x031E66 0C:9E56: 79        .byte $79   ; <y>
- D 0 - I - 0x031E67 0C:9E57: 00        .byte $00   ; 
- D 0 - I - 0x031E68 0C:9E58: B7        .byte $B7   ; 
- D 0 - I - 0x031E69 0C:9E59: 69        .byte $69   ; <i>
- D 0 - I - 0x031E6A 0C:9E5A: 5F        .byte $5F   ; 
- D 0 - I - 0x031E6B 0C:9E5B: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031E6C 0C:9E5C: A2        .byte $A2   ; 
- D 0 - I - 0x031E6D 0C:9E5D: 2E        .byte $2E   ; 
- D 0 - I - 0x031E6E 0C:9E5E: AA        .byte $AA   ; 
- D 0 - I - 0x031E6F 0C:9E5F: 2E        .byte $2E   ; 
- D 0 - I - 0x031E70 0C:9E60: FC        .byte $FC   ; 
- - - - - - 0x031E71 0C:9E61: 01        .byte $01   ; 
- D 0 - I - 0x031E72 0C:9E62: 16        .byte $16   ; 
- D 0 - I - 0x031E73 0C:9E63: 0C        .byte $0C   ; 
- D 0 - I - 0x031E74 0C:9E64: C2        .byte $C2   ; 
- D 0 - I - 0x031E75 0C:9E65: 42        .byte $42   ; <B>
- D 0 - I - 0x031E76 0C:9E66: 52        .byte $52   ; <R>
- D 0 - I - 0x031E77 0C:9E67: 2D        .byte $2D   ; 
- D 0 - I - 0x031E78 0C:9E68: 00        .byte $00   ; 
- D 0 - I - 0x031E79 0C:9E69: 24        .byte $24   ; 
- D 0 - I - 0x031E7A 0C:9E6A: B1        .byte $B1   ; 
- D 0 - I - 0x031E7B 0C:9E6B: 2F        .byte $2F   ; 
- D 0 - I - 0x031E7C 0C:9E6C: 10        .byte $10   ; 
- D 0 - I - 0x031E7D 0C:9E6D: 7D        .byte $7D   ; 
- D 0 - I - 0x031E7E 0C:9E6E: 79        .byte $79   ; <y>
- D 0 - I - 0x031E7F 0C:9E6F: FC        .byte $FC   ; 
- - - - - - 0x031E80 0C:9E70: 04        .byte $04   ; 
- D 0 - I - 0x031E81 0C:9E71: 12        .byte $12   ; 
- D 0 - I - 0x031E82 0C:9E72: 02        .byte $02   ; 
- D 0 - I - 0x031E83 0C:9E73: 16        .byte $16   ; 
- D 0 - I - 0x031E84 0C:9E74: 00        .byte $00   ; 
- D 0 - I - 0x031E85 0C:9E75: 09        .byte $09   ; 
- D 0 - I - 0x031E86 0C:9E76: 2F        .byte $2F   ; 
- D 0 - I - 0x031E87 0C:9E77: 0C        .byte $0C   ; 
- D 0 - I - 0x031E88 0C:9E78: 32        .byte $32   ; <2>
- D 0 - I - 0x031E89 0C:9E79: 03        .byte $03   ; 
- D 0 - I - 0x031E8A 0C:9E7A: 0E        .byte $0E   ; 
- D 0 - I - 0x031E8B 0C:9E7B: 2E        .byte $2E   ; 
- D 0 - I - 0x031E8C 0C:9E7C: FC        .byte $FC   ; 
- - - - - - 0x031E8D 0C:9E7D: 01        .byte $01   ; 
- D 0 - I - 0x031E8E 0C:9E7E: 0C        .byte $0C   ; 
- D 0 - I - 0x031E8F 0C:9E7F: 2E        .byte $2E   ; 
- D 0 - I - 0x031E90 0C:9E80: 0C        .byte $0C   ; 
- D 0 - I - 0x031E91 0C:9E81: 31        .byte $31   ; <1>
- D 0 - I - 0x031E92 0C:9E82: 12        .byte $12   ; 
- D 0 - I - 0x031E93 0C:9E83: AA        .byte $AA   ; 
- D 0 - I - 0x031E94 0C:9E84: 7D        .byte $7D   ; 
- D 0 - I - 0x031E95 0C:9E85: 79        .byte $79   ; <y>
- D 0 - I - 0x031E96 0C:9E86: FC        .byte $FC   ; 
- D 0 - I - 0x031E97 0C:9E87: F0        .byte $F0   ; 
- D 0 - I - 0x031E98 0C:9E88: 01        .byte $01   ; 
- D 0 - I - 0x031E99 0C:9E89: 61        .byte $61   ; <a>
- D 0 - I - 0x031E9A 0C:9E8A: 28        .byte $28   ; 
- D 0 - I - 0x031E9B 0C:9E8B: 32        .byte $32   ; <2>
- D 0 - I - 0x031E9C 0C:9E8C: 03        .byte $03   ; 
- D 0 - I - 0x031E9D 0C:9E8D: A2        .byte $A2   ; 
- D 0 - I - 0x031E9E 0C:9E8E: 2E        .byte $2E   ; 
- D 0 - I - 0x031E9F 0C:9E8F: 00        .byte $00   ; 
- D 0 - I - 0x031EA0 0C:9E90: AE        .byte $AE   ; 
- D 0 - I - 0x031EA1 0C:9E91: 03        .byte $03   ; 
- D 0 - I - 0x031EA2 0C:9E92: 13        .byte $13   ; 
- D 0 - I - 0x031EA3 0C:9E93: 2E        .byte $2E   ; 
- D 0 - I - 0x031EA4 0C:9E94: 19        .byte $19   ; 
- D 0 - I - 0x031EA5 0C:9E95: 1F        .byte $1F   ; 
- D 0 - I - 0x031EA6 0C:9E96: 1F        .byte $1F   ; 
- D 0 - I - 0x031EA7 0C:9E97: FC        .byte $FC   ; 
- - - - - - 0x031EA8 0C:9E98: 01        .byte $01   ; 
- D 0 - I - 0x031EA9 0C:9E99: 0C        .byte $0C   ; 
- D 0 - I - 0x031EAA 0C:9E9A: 32        .byte $32   ; <2>
- D 0 - I - 0x031EAB 0C:9E9B: 03        .byte $03   ; 
- D 0 - I - 0x031EAC 0C:9E9C: B1        .byte $B1   ; 
- D 0 - I - 0x031EAD 0C:9E9D: 1A        .byte $1A   ; 
- D 0 - I - 0x031EAE 0C:9E9E: 00        .byte $00   ; 
- D 0 - I - 0x031EAF 0C:9E9F: 04        .byte $04   ; 
- D 0 - I - 0x031EB0 0C:9EA0: 2E        .byte $2E   ; 
- D 0 - I - 0x031EB1 0C:9EA1: 11        .byte $11   ; 
- D 0 - I - 0x031EB2 0C:9EA2: 32        .byte $32   ; <2>
- D 0 - I - 0x031EB3 0C:9EA3: 03        .byte $03   ; 
- D 0 - I - 0x031EB4 0C:9EA4: 0E        .byte $0E   ; 
- D 0 - I - 0x031EB5 0C:9EA5: 2E        .byte $2E   ; 
- D 0 - I - 0x031EB6 0C:9EA6: 16        .byte $16   ; 
- D 0 - I - 0x031EB7 0C:9EA7: FC        .byte $FC   ; 
- - - - - - 0x031EB8 0C:9EA8: 01        .byte $01   ; 
- D 0 - I - 0x031EB9 0C:9EA9: 23        .byte $23   ; 
- D 0 - I - 0x031EBA 0C:9EAA: 11        .byte $11   ; 
- D 0 - I - 0x031EBB 0C:9EAB: 0A        .byte $0A   ; 
- D 0 - I - 0x031EBC 0C:9EAC: 0B        .byte $0B   ; 
- D 0 - I - 0x031EBD 0C:9EAD: 2A        .byte $2A   ; 
- D 0 - I - 0x031EBE 0C:9EAE: 1F        .byte $1F   ; 
- D 0 - I - 0x031EBF 0C:9EAF: 0C        .byte $0C   ; 
- D 0 - I - 0x031EC0 0C:9EB0: 10        .byte $10   ; 
- D 0 - I - 0x031EC1 0C:9EB1: F7        .byte $F7   ; 
- D 0 - I - 0x031EC2 0C:9EB2: 02        .byte $02   ; 
- D 0 - I - 0x031EC3 0C:9EB3: 79        .byte $79   ; <y>
- D 0 - I - 0x031EC4 0C:9EB4: FC        .byte $FC   ; 
- D 0 - I - 0x031EC5 0C:9EB5: F0        .byte $F0   ; 
- - - - - - 0x031EC6 0C:9EB6: 01        .byte $01   ; 
- - - - - - 0x031EC7 0C:9EB7: 61        .byte $61   ; <a>
- - - - - - 0x031EC8 0C:9EB8: F1        .byte $F1   ; 
- - - - - - 0x031EC9 0C:9EB9: 00        .byte $00   ; 
- - - - - - 0x031ECA 0C:9EBA: F2        .byte $F2   ; 
- - - - - - 0x031ECB 0C:9EBB: FC        .byte $FC   ; 
- - - - - - 0x031ECC 0C:9EBC: 01        .byte $01   ; 
- - - - - - 0x031ECD 0C:9EBD: 14        .byte $14   ; 
- - - - - - 0x031ECE 0C:9EBE: 23        .byte $23   ; 
- - - - - - 0x031ECF 0C:9EBF: 16        .byte $16   ; 
- - - - - - 0x031ED0 0C:9EC0: 00        .byte $00   ; 
- - - - - - 0x031ED1 0C:9EC1: 25        .byte $25   ; 
- - - - - - 0x031ED2 0C:9EC2: A7        .byte $A7   ; 
- - - - - - 0x031ED3 0C:9EC3: 27        .byte $27   ; 
- - - - - - 0x031ED4 0C:9EC4: A7        .byte $A7   ; 
- - - - - - 0x031ED5 0C:9EC5: FC        .byte $FC   ; 
- - - - - - 0x031ED6 0C:9EC6: 01        .byte $01   ; 
- - - - - - 0x031ED7 0C:9EC7: 1B        .byte $1B   ; 
- - - - - - 0x031ED8 0C:9EC8: 07        .byte $07   ; 
- - - - - - 0x031ED9 0C:9EC9: 2C        .byte $2C   ; 
- - - - - - 0x031EDA 0C:9ECA: 09        .byte $09   ; 
- - - - - - 0x031EDB 0C:9ECB: AA        .byte $AA   ; 
- - - - - - 0x031EDC 0C:9ECC: F7        .byte $F7   ; 
- - - - - - 0x031EDD 0C:9ECD: 03        .byte $03   ; 
- - - - - - 0x031EDE 0C:9ECE: 79        .byte $79   ; <y>
- - - - - - 0x031EDF 0C:9ECF: FC        .byte $FC   ; 
- - - - - - 0x031EE0 0C:9ED0: F0        .byte $F0   ; 
- D 0 - I - 0x031EE1 0C:9ED1: 01        .byte $01   ; 
- D 0 - I - 0x031EE2 0C:9ED2: 71        .byte $71   ; <q>
- D 0 - I - 0x031EE3 0C:9ED3: 28        .byte $28   ; 
- D 0 - I - 0x031EE4 0C:9ED4: 32        .byte $32   ; <2>
- D 0 - I - 0x031EE5 0C:9ED5: 03        .byte $03   ; 
- D 0 - I - 0x031EE6 0C:9ED6: A2        .byte $A2   ; 
- D 0 - I - 0x031EE7 0C:9ED7: 2E        .byte $2E   ; 
- D 0 - I - 0x031EE8 0C:9ED8: FC        .byte $FC   ; 
- - - - - - 0x031EE9 0C:9ED9: 01        .byte $01   ; 
- D 0 - I - 0x031EEA 0C:9EDA: 26        .byte $26   ; 
- D 0 - I - 0x031EEB 0C:9EDB: 08        .byte $08   ; 
- D 0 - I - 0x031EEC 0C:9EDC: 00        .byte $00   ; 
- D 0 - I - 0x031EED 0C:9EDD: 10        .byte $10   ; 
- D 0 - I - 0x031EEE 0C:9EDE: 10        .byte $10   ; 
- D 0 - I - 0x031EEF 0C:9EDF: 06        .byte $06   ; 
- D 0 - I - 0x031EF0 0C:9EE0: 02        .byte $02   ; 
- D 0 - I - 0x031EF1 0C:9EE1: 1F        .byte $1F   ; 
- D 0 - I - 0x031EF2 0C:9EE2: 0C        .byte $0C   ; 
- D 0 - I - 0x031EF3 0C:9EE3: 10        .byte $10   ; 
- D 0 - I - 0x031EF4 0C:9EE4: A0        .byte $A0   ; 
- D 0 - I - 0x031EF5 0C:9EE5: FC        .byte $FC   ; 
- - - - - - 0x031EF6 0C:9EE6: 01        .byte $01   ; 
- D 0 - I - 0x031EF7 0C:9EE7: 0C        .byte $0C   ; 
- D 0 - I - 0x031EF8 0C:9EE8: 32        .byte $32   ; <2>
- D 0 - I - 0x031EF9 0C:9EE9: 03        .byte $03   ; 
- D 0 - I - 0x031EFA 0C:9EEA: B1        .byte $B1   ; 
- D 0 - I - 0x031EFB 0C:9EEB: 1A        .byte $1A   ; 
- D 0 - I - 0x031EFC 0C:9EEC: 00        .byte $00   ; 
- D 0 - I - 0x031EFD 0C:9EED: 8D        .byte $8D   ; 
- D 0 - I - 0x031EFE 0C:9EEE: 8B        .byte $8B   ; 
- D 0 - I - 0x031EFF 0C:9EEF: 0E        .byte $0E   ; 
- D 0 - I - 0x031F00 0C:9EF0: 2E        .byte $2E   ; 
- D 0 - I - 0x031F01 0C:9EF1: 16        .byte $16   ; 
- D 0 - I - 0x031F02 0C:9EF2: FC        .byte $FC   ; 
- - - - - - 0x031F03 0C:9EF3: 01        .byte $01   ; 
- D 0 - I - 0x031F04 0C:9EF4: 25        .byte $25   ; 
- D 0 - I - 0x031F05 0C:9EF5: AA        .byte $AA   ; 
- D 0 - I - 0x031F06 0C:9EF6: 18        .byte $18   ; 
- D 0 - I - 0x031F07 0C:9EF7: 27        .byte $27   ; 
- D 0 - I - 0x031F08 0C:9EF8: 2A        .byte $2A   ; 
- D 0 - I - 0x031F09 0C:9EF9: 1F        .byte $1F   ; 
- D 0 - I - 0x031F0A 0C:9EFA: 0D        .byte $0D   ; 
- D 0 - I - 0x031F0B 0C:9EFB: FC        .byte $FC   ; 
- D 0 - I - 0x031F0C 0C:9EFC: F0        .byte $F0   ; 
- - - - - - 0x031F0D 0C:9EFD: 01        .byte $01   ; 
- - - - - - 0x031F0E 0C:9EFE: 71        .byte $71   ; <q>
- - - - - - 0x031F0F 0C:9EFF: 12        .byte $12   ; 
- - - - - - 0x031F10 0C:9F00: 02        .byte $02   ; 
- - - - - - 0x031F11 0C:9F01: 16        .byte $16   ; 
- - - - - - 0x031F12 0C:9F02: 00        .byte $00   ; 
- - - - - - 0x031F13 0C:9F03: 09        .byte $09   ; 
- - - - - - 0x031F14 0C:9F04: 2F        .byte $2F   ; 
- - - - - - 0x031F15 0C:9F05: 11        .byte $11   ; 
- - - - - - 0x031F16 0C:9F06: 30        .byte $30   ; <0>
- - - - - - 0x031F17 0C:9F07: 08        .byte $08   ; 
- - - - - - 0x031F18 0C:9F08: 12        .byte $12   ; 
- - - - - - 0x031F19 0C:9F09: 06        .byte $06   ; 
- - - - - - 0x031F1A 0C:9F0A: A7        .byte $A7   ; 
- - - - - - 0x031F1B 0C:9F0B: 79        .byte $79   ; <y>
- - - - - - 0x031F1C 0C:9F0C: FC        .byte $FC   ; 
- - - - - - 0x031F1D 0C:9F0D: 08        .byte $08   ; 
- - - - - - 0x031F1E 0C:9F0E: F1        .byte $F1   ; 
- - - - - - 0x031F1F 0C:9F0F: 00        .byte $00   ; 
- - - - - - 0x031F20 0C:9F10: F2        .byte $F2   ; 
- - - - - - 0x031F21 0C:9F11: 00        .byte $00   ; 
- - - - - - 0x031F22 0C:9F12: 14        .byte $14   ; 
- - - - - - 0x031F23 0C:9F13: 23        .byte $23   ; 
- - - - - - 0x031F24 0C:9F14: 16        .byte $16   ; 
- - - - - - 0x031F25 0C:9F15: FC        .byte $FC   ; 
- - - - - - 0x031F26 0C:9F16: 01        .byte $01   ; 
- - - - - - 0x031F27 0C:9F17: 01        .byte $01   ; 
- - - - - - 0x031F28 0C:9F18: 0D        .byte $0D   ; 
- - - - - - 0x031F29 0C:9F19: 19        .byte $19   ; 
- - - - - - 0x031F2A 0C:9F1A: 00        .byte $00   ; 
- - - - - - 0x031F2B 0C:9F1B: 0B        .byte $0B   ; 
- - - - - - 0x031F2C 0C:9F1C: 02        .byte $02   ; 
- - - - - - 0x031F2D 0C:9F1D: 0C        .byte $0C   ; 
- - - - - - 0x031F2E 0C:9F1E: 01        .byte $01   ; 
- - - - - - 0x031F2F 0C:9F1F: 02        .byte $02   ; 
- - - - - - 0x031F30 0C:9F20: 16        .byte $16   ; 
- - - - - - 0x031F31 0C:9F21: FC        .byte $FC   ; 
- - - - - - 0x031F32 0C:9F22: 01        .byte $01   ; 
- - - - - - 0x031F33 0C:9F23: 19        .byte $19   ; 
- - - - - - 0x031F34 0C:9F24: A9        .byte $A9   ; 
- - - - - - 0x031F35 0C:9F25: 21        .byte $21   ; 
- - - - - - 0x031F36 0C:9F26: 0A        .byte $0A   ; 
- - - - - - 0x031F37 0C:9F27: 14        .byte $14   ; 
- - - - - - 0x031F38 0C:9F28: 16        .byte $16   ; 
- - - - - - 0x031F39 0C:9F29: 00        .byte $00   ; 
- - - - - - 0x031F3A 0C:9F2A: 15        .byte $15   ; 
- - - - - - 0x031F3B 0C:9F2B: 28        .byte $28   ; 
- - - - - - 0x031F3C 0C:9F2C: 1F        .byte $1F   ; 
- - - - - - 0x031F3D 0C:9F2D: 0C        .byte $0C   ; 
- - - - - - 0x031F3E 0C:9F2E: 10        .byte $10   ; 
- - - - - - 0x031F3F 0C:9F2F: FC        .byte $FC   ; 
- - - - - - 0x031F40 0C:9F30: F0        .byte $F0   ; 
- D 0 - I - 0x031F41 0C:9F31: 01        .byte $01   ; 
- D 0 - I - 0x031F42 0C:9F32: 51        .byte $51   ; <Q>
- D 0 - I - 0x031F43 0C:9F33: E4        .byte $E4   ; 
- D 0 - I - 0x031F44 0C:9F34: 19        .byte $19   ; 
- D 0 - I - 0x031F45 0C:9F35: FC        .byte $FC   ; 
- - - - - - 0x031F46 0C:9F36: 04        .byte $04   ; 
- D 0 - I - 0x031F47 0C:9F37: D0        .byte $D0   ; 
- D 0 - I - 0x031F48 0C:9F38: 55        .byte $55   ; <U>
- D 0 - I - 0x031F49 0C:9F39: 69        .byte $69   ; <i>
- D 0 - I - 0x031F4A 0C:9F3A: 53        .byte $53   ; <S>
- D 0 - I - 0x031F4B 0C:9F3B: 74        .byte $74   ; <t>
- D 0 - I - 0x031F4C 0C:9F3C: 47        .byte $47   ; <G>
- D 0 - I - 0x031F4D 0C:9F3D: 6F        .byte $6F   ; <o>
- D 0 - I - 0x031F4E 0C:9F3E: 48        .byte $48   ; <H>
- D 0 - I - 0x031F4F 0C:9F3F: 79        .byte $79   ; <y>
- D 0 - I - 0x031F50 0C:9F40: FC        .byte $FC   ; 
- D 0 - I - 0x031F51 0C:9F41: F0        .byte $F0   ; 
- D 0 - I - 0x031F52 0C:9F42: F4        .byte $F4   ; 
- D 0 - I - 0x031F53 0C:9F43: 04        .byte $04   ; 
- D 0 - I - 0x031F54 0C:9F44: 52        .byte $52   ; <R>
- D 0 - I - 0x031F55 0C:9F45: 9F        .byte $9F   ; 
- D 0 - I - 0x031F56 0C:9F46: E1        .byte $E1   ; 
- D 0 - I - 0x031F57 0C:9F47: 9F        .byte $9F   ; 
- D 0 - I - 0x031F58 0C:9F48: 8B        .byte $8B   ; 
- D 0 - I - 0x031F59 0C:9F49: A0        .byte $A0   ; 
- D 0 - I - 0x031F5A 0C:9F4A: 2A        .byte $2A   ; 
- D 0 - I - 0x031F5B 0C:9F4B: A1        .byte $A1   ; 
- D 0 - I - 0x031F5C 0C:9F4C: 25        .byte $25   ; 
- D 0 - I - 0x031F5D 0C:9F4D: A2        .byte $A2   ; 
- D 0 - I - 0x031F5E 0C:9F4E: 92        .byte $92   ; 
- D 0 - I - 0x031F5F 0C:9F4F: A2        .byte $A2   ; 
- D 0 - I - 0x031F60 0C:9F50: 02        .byte $02   ; 
- D 0 - I - 0x031F61 0C:9F51: A3        .byte $A3   ; 
- D 0 - I - 0x031F62 0C:9F52: F5        .byte $F5   ; 
- D 0 - I - 0x031F63 0C:9F53: 02        .byte $02   ; 
- D 0 - I - 0x031F64 0C:9F54: E8        .byte $E8   ; 
- D 0 - I - 0x031F65 0C:9F55: 08        .byte $08   ; 
- D 0 - I - 0x031F66 0C:9F56: 3F        .byte $3F   ; 
- D 0 - I - 0x031F67 0C:9F57: 3F        .byte $3F   ; 
- D 0 - I - 0x031F68 0C:9F58: 3F        .byte $3F   ; 
- D 0 - I - 0x031F69 0C:9F59: 3F        .byte $3F   ; 
- D 0 - I - 0x031F6A 0C:9F5A: FC        .byte $FC   ; 
- D 0 - I - 0x031F6B 0C:9F5B: E8        .byte $E8   ; 
- D 0 - I - 0x031F6C 0C:9F5C: 1B        .byte $1B   ; 
- D 0 - I - 0x031F6D 0C:9F5D: 03        .byte $03   ; 
- D 0 - I - 0x031F6E 0C:9F5E: 7D        .byte $7D   ; 
- D 0 - I - 0x031F6F 0C:9F5F: 2E        .byte $2E   ; 
- D 0 - I - 0x031F70 0C:9F60: 00        .byte $00   ; 
- D 0 - I - 0x031F71 0C:9F61: 10        .byte $10   ; 
- D 0 - I - 0x031F72 0C:9F62: 02        .byte $02   ; 
- D 0 - I - 0x031F73 0C:9F63: 08        .byte $08   ; 
- D 0 - I - 0x031F74 0C:9F64: 12        .byte $12   ; 
- D 0 - I - 0x031F75 0C:9F65: AA        .byte $AA   ; 
- D 0 - I - 0x031F76 0C:9F66: 7D        .byte $7D   ; 
- D 0 - I - 0x031F77 0C:9F67: FC        .byte $FC   ; 
- - - - - - 0x031F78 0C:9F68: 01        .byte $01   ; 
- D 0 - I - 0x031F79 0C:9F69: 1A        .byte $1A   ; 
- D 0 - I - 0x031F7A 0C:9F6A: 24        .byte $24   ; 
- D 0 - I - 0x031F7B 0C:9F6B: 08        .byte $08   ; 
- D 0 - I - 0x031F7C 0C:9F6C: 00        .byte $00   ; 
- D 0 - I - 0x031F7D 0C:9F6D: 81        .byte $81   ; 
- D 0 - I - 0x031F7E 0C:9F6E: C7        .byte $C7   ; 
- D 0 - I - 0x031F7F 0C:9F6F: 50        .byte $50   ; <P>
- D 0 - I - 0x031F80 0C:9F70: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031F81 0C:9F71: 05        .byte $05   ; 
- D 0 - I - 0x031F82 0C:9F72: 0C        .byte $0C   ; 
- D 0 - I - 0x031F83 0C:9F73: 13        .byte $13   ; 
- D 0 - I - 0x031F84 0C:9F74: 26        .byte $26   ; 
- D 0 - I - 0x031F85 0C:9F75: 79        .byte $79   ; <y>
- D 0 - I - 0x031F86 0C:9F76: FC        .byte $FC   ; 
- D 0 - I - 0x031F87 0C:9F77: E0        .byte $E0   ; 
- D 0 - I - 0x031F88 0C:9F78: 11        .byte $11   ; 
- D 0 - I - 0x031F89 0C:9F79: 0F        .byte $0F   ; 
- D 0 - I - 0x031F8A 0C:9F7A: 03        .byte $03   ; 
- D 0 - I - 0x031F8B 0C:9F7B: 06        .byte $06   ; 
- D 0 - I - 0x031F8C 0C:9F7C: 00        .byte $00   ; 
- D 0 - I - 0x031F8D 0C:9F7D: 1F        .byte $1F   ; 
- D 0 - I - 0x031F8E 0C:9F7E: 10        .byte $10   ; 
- D 0 - I - 0x031F8F 0C:9F7F: 6C        .byte $6C   ; <l>
- D 0 - I - 0x031F90 0C:9F80: 50        .byte $50   ; <P>
- D 0 - I - 0x031F91 0C:9F81: 4C        .byte $4C   ; <L>
- D 0 - I - 0x031F92 0C:9F82: 16        .byte $16   ; 
- D 0 - I - 0x031F93 0C:9F83: FC        .byte $FC   ; 
- - - - - - 0x031F94 0C:9F84: 01        .byte $01   ; 
- D 0 - I - 0x031F95 0C:9F85: 18        .byte $18   ; 
- D 0 - I - 0x031F96 0C:9F86: 21        .byte $21   ; 
- D 0 - I - 0x031F97 0C:9F87: 2A        .byte $2A   ; 
- D 0 - I - 0x031F98 0C:9F88: 2F        .byte $2F   ; 
- D 0 - I - 0x031F99 0C:9F89: 7D        .byte $7D   ; 
- D 0 - I - 0x031F9A 0C:9F8A: 00        .byte $00   ; 
- D 0 - I - 0x031F9B 0C:9F8B: 6C        .byte $6C   ; <l>
- D 0 - I - 0x031F9C 0C:9F8C: 49        .byte $49   ; <I>
- D 0 - I - 0x031F9D 0C:9F8D: 24        .byte $24   ; 
- D 0 - I - 0x031F9E 0C:9F8E: 18        .byte $18   ; 
- D 0 - I - 0x031F9F 0C:9F8F: 79        .byte $79   ; <y>
- D 0 - I - 0x031FA0 0C:9F90: FC        .byte $FC   ; 
- D 0 - I - 0x031FA1 0C:9F91: E0        .byte $E0   ; 
- D 0 - I - 0x031FA2 0C:9F92: 04        .byte $04   ; 
- D 0 - I - 0x031FA3 0C:9F93: 1C        .byte $1C   ; 
- D 0 - I - 0x031FA4 0C:9F94: 2E        .byte $2E   ; 
- D 0 - I - 0x031FA5 0C:9F95: 00        .byte $00   ; 
- D 0 - I - 0x031FA6 0C:9F96: 18        .byte $18   ; 
- D 0 - I - 0x031FA7 0C:9F97: 13        .byte $13   ; 
- D 0 - I - 0x031FA8 0C:9F98: 24        .byte $24   ; 
- D 0 - I - 0x031FA9 0C:9F99: 2E        .byte $2E   ; 
- D 0 - I - 0x031FAA 0C:9F9A: 15        .byte $15   ; 
- D 0 - I - 0x031FAB 0C:9F9B: 02        .byte $02   ; 
- D 0 - I - 0x031FAC 0C:9F9C: 63        .byte $63   ; <c>
- D 0 - I - 0x031FAD 0C:9F9D: 6E        .byte $6E   ; <n>
- D 0 - I - 0x031FAE 0C:9F9E: 79        .byte $79   ; <y>
- D 0 - I - 0x031FAF 0C:9F9F: FC        .byte $FC   ; 
- D 0 - I - 0x031FB0 0C:9FA0: B0        .byte $B0   ; 
- D 0 - I - 0x031FB1 0C:9FA1: 10        .byte $10   ; 
- D 0 - I - 0x031FB2 0C:9FA2: 03        .byte $03   ; 
- D 0 - I - 0x031FB3 0C:9FA3: 2F        .byte $2F   ; 
- D 0 - I - 0x031FB4 0C:9FA4: 79        .byte $79   ; <y>
- D 0 - I - 0x031FB5 0C:9FA5: FC        .byte $FC   ; 
- - - - - - 0x031FB6 0C:9FA6: 10        .byte $10   ; 
- D 0 - I - 0x031FB7 0C:9FA7: 18        .byte $18   ; 
- D 0 - I - 0x031FB8 0C:9FA8: 3F        .byte $3F   ; 
- D 0 - I - 0x031FB9 0C:9FA9: 18        .byte $18   ; 
- D 0 - I - 0x031FBA 0C:9FAA: 21        .byte $21   ; 
- D 0 - I - 0x031FBB 0C:9FAB: 08        .byte $08   ; 
- D 0 - I - 0x031FBC 0C:9FAC: 15        .byte $15   ; 
- D 0 - I - 0x031FBD 0C:9FAD: 2F        .byte $2F   ; 
- D 0 - I - 0x031FBE 0C:9FAE: 13        .byte $13   ; 
- D 0 - I - 0x031FBF 0C:9FAF: 07        .byte $07   ; 
- D 0 - I - 0x031FC0 0C:9FB0: 10        .byte $10   ; 
- D 0 - I - 0x031FC1 0C:9FB1: FC        .byte $FC   ; 
- D 0 - I - 0x031FC2 0C:9FB2: A0        .byte $A0   ; 
- D 0 - I - 0x031FC3 0C:9FB3: 07        .byte $07   ; 
- D 0 - I - 0x031FC4 0C:9FB4: 24        .byte $24   ; 
- D 0 - I - 0x031FC5 0C:9FB5: 2F        .byte $2F   ; 
- D 0 - I - 0x031FC6 0C:9FB6: C8        .byte $C8   ; 
- D 0 - I - 0x031FC7 0C:9FB7: 00        .byte $00   ; 
- D 0 - I - 0x031FC8 0C:9FB8: 18        .byte $18   ; 
- D 0 - I - 0x031FC9 0C:9FB9: 26        .byte $26   ; 
- D 0 - I - 0x031FCA 0C:9FBA: 03        .byte $03   ; 
- D 0 - I - 0x031FCB 0C:9FBB: 3F        .byte $3F   ; 
- D 0 - I - 0x031FCC 0C:9FBC: 3F        .byte $3F   ; 
- D 0 - I - 0x031FCD 0C:9FBD: 3F        .byte $3F   ; 
- D 0 - I - 0x031FCE 0C:9FBE: FC        .byte $FC   ; 
- D 0 - I - 0x031FCF 0C:9FBF: 40        .byte $40   ; 
- D 0 - I - 0x031FD0 0C:9FC0: 87        .byte $87   ; 
- D 0 - I - 0x031FD1 0C:9FC1: A2        .byte $A2   ; 
- D 0 - I - 0x031FD2 0C:9FC2: 7C        .byte $7C   ; 
- D 0 - I - 0x031FD3 0C:9FC3: 00        .byte $00   ; 
- D 0 - I - 0x031FD4 0C:9FC4: A2        .byte $A2   ; 
- D 0 - I - 0x031FD5 0C:9FC5: F7        .byte $F7   ; 
- D 0 - I - 0x031FD6 0C:9FC6: 02        .byte $02   ; 
- D 0 - I - 0x031FD7 0C:9FC7: FC        .byte $FC   ; 
- - - - - - 0x031FD8 0C:9FC8: 08        .byte $08   ; 
- D 0 - I - 0x031FD9 0C:9FC9: 00        .byte $00   ; 
- D 0 - I - 0x031FDA 0C:9FCA: 0D        .byte $0D   ; 
- D 0 - I - 0x031FDB 0C:9FCB: 24        .byte $24   ; 
- D 0 - I - 0x031FDC 0C:9FCC: 00        .byte $00   ; 
- D 0 - I - 0x031FDD 0C:9FCD: 0D        .byte $0D   ; 
- D 0 - I - 0x031FDE 0C:9FCE: 24        .byte $24   ; 
- D 0 - I - 0x031FDF 0C:9FCF: FC        .byte $FC   ; 
- D 0 - I - 0x031FE0 0C:9FD0: 80        .byte $80   ; 
- D 0 - I - 0x031FE1 0C:9FD1: 87        .byte $87   ; 
- D 0 - I - 0x031FE2 0C:9FD2: 00        .byte $00   ; 
- D 0 - I - 0x031FE3 0C:9FD3: A2        .byte $A2   ; 
- D 0 - I - 0x031FE4 0C:9FD4: F7        .byte $F7   ; 
- D 0 - I - 0x031FE5 0C:9FD5: 02        .byte $02   ; 
- D 0 - I - 0x031FE6 0C:9FD6: FC        .byte $FC   ; 
- - - - - - 0x031FE7 0C:9FD7: 08        .byte $08   ; 
- D 0 - I - 0x031FE8 0C:9FD8: 0D        .byte $0D   ; 
- D 0 - I - 0x031FE9 0C:9FD9: 24        .byte $24   ; 
- D 0 - I - 0x031FEA 0C:9FDA: 27        .byte $27   ; 
- D 0 - I - 0x031FEB 0C:9FDB: F7        .byte $F7   ; 
- D 0 - I - 0x031FEC 0C:9FDC: 03        .byte $03   ; 
- D 0 - I - 0x031FED 0C:9FDD: FC        .byte $FC   ; 
- D 0 - I - 0x031FEE 0C:9FDE: F3        .byte $F3   ; 
- D 0 - I - 0x031FEF 0C:9FDF: BF        .byte $BF   ; 
- D 0 - I - 0x031FF0 0C:9FE0: 9F        .byte $9F   ; 
- D 0 - I - 0x031FF1 0C:9FE1: F5        .byte $F5   ; 
- D 0 - I - 0x031FF2 0C:9FE2: 02        .byte $02   ; 
- D 0 - I - 0x031FF3 0C:9FE3: E8        .byte $E8   ; 
- D 0 - I - 0x031FF4 0C:9FE4: 1C        .byte $1C   ; 
- D 0 - I - 0x031FF5 0C:9FE5: 0B        .byte $0B   ; 
- D 0 - I - 0x031FF6 0C:9FE6: 01        .byte $01   ; 
- D 0 - I - 0x031FF7 0C:9FE7: 00        .byte $00   ; 
- D 0 - I - 0x031FF8 0C:9FE8: 0A        .byte $0A   ; 
- D 0 - I - 0x031FF9 0C:9FE9: 19        .byte $19   ; 
- D 0 - I - 0x031FFA 0C:9FEA: 0B        .byte $0B   ; 
- D 0 - I - 0x031FFB 0C:9FEB: 07        .byte $07   ; 
- D 0 - I - 0x031FFC 0C:9FEC: AE        .byte $AE   ; 
- D 0 - I - 0x031FFD 0C:9FED: 2E        .byte $2E   ; 
- D 0 - I - 0x031FFE 0C:9FEE: 15        .byte $15   ; 
- D 0 - I - 0x031FFF 0C:9FEF: 00        .byte $00   ; 
- D 0 - I - 0x032000 0C:9FF0: 0C        .byte $0C   ; 
- D 0 - I - 0x032001 0C:9FF1: 01        .byte $01   ; 
- D 0 - I - 0x032002 0C:9FF2: 02        .byte $02   ; 
- D 0 - I - 0x032003 0C:9FF3: FC        .byte $FC   ; 
- - - - - - 0x032004 0C:9FF4: 04        .byte $04   ; 
- D 0 - I - 0x032005 0C:9FF5: 13        .byte $13   ; 
- D 0 - I - 0x032006 0C:9FF6: 2E        .byte $2E   ; 
- D 0 - I - 0x032007 0C:9FF7: 06        .byte $06   ; 
- D 0 - I - 0x032008 0C:9FF8: 02        .byte $02   ; 
- D 0 - I - 0x032009 0C:9FF9: 16        .byte $16   ; 
- D 0 - I - 0x03200A 0C:9FFA: 00        .byte $00   ; 
- D 0 - I - 0x03200B 0C:9FFB: 15        .byte $15   ; 
- D 0 - I - 0x03200C 0C:9FFC: 29        .byte $29   ; 
- D 0 - I - 0x03200D 0C:9FFD: 19        .byte $19   ; 
- D 0 - I - 0x03200E 0C:9FFE: 06        .byte $06   ; 
- D 0 - I - 0x03200F 0C:9FFF: 78        .byte $78   ; <x>



