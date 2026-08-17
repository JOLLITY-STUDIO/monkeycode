; bank_24.asm 分片 1/7 (原文件行 1-1000, 共 6773 行)

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