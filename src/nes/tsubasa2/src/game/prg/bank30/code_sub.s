; ============================================================
; code_sub.s - bank30 sub routines
; ============================================================

    BEQ $CD5A                  ; $CD54
    BCC $CD6D                  ; $CD56
    BCS $CD60                  ; $CD58
    LDA $0072                  ; $CD5A
    CMP $0071                  ; $CD5C
    BCC $CD6D                  ; $CD5E
    LDA $0072                  ; $CD60
    SBC $0071                  ; $CD62
    STA $0072                  ; $CD64
    LDA $0073                  ; $CD66
    SBC $0074                  ; $CD68
    STA $0073                  ; $CD6A
    SEC                        ; $CD6C
    ROL $006F                  ; $CD6D
    ROL $0070                  ; $CD6F
    DEX                        ; $CD71
    BNE $CD4A                  ; $CD72
    PLA                        ; $CD74
    TAX                        ; $CD75
    RTS                        ; $CD76
    .byte $AD,$FB,$05
    EOR #$0B                   ; $CD7A
    .byte $0A
    TAY                        ; $CD7D
    LDA $CD89,Y                ; $CD7E
    STA $0034                  ; $CD81
    LDA $CD8A,Y                ; $CD83
    STA $0035                  ; $CD86
    RTS                        ; $CD88
    .byte $00,$03,$0C,$03,$18,$03,$24,$03,$30,$03,$3C,$03,$48,$03,$54,$03
    .byte $60,$03,$6C,$03,$78,$03,$84,$03,$90,$03,$9C,$03,$A8,$03,$B4,$03
    .byte $C0,$03,$CC,$03,$D8,$03,$E4,$03,$F0,$03,$FC,$03,$08,$04,$0C,$04
    .byte $10,$04,$14,$04,$18,$04,$1C,$04,$20,$04,$24,$04,$28,$04,$2C,$04
    .byte $A2,$00
    CMP #$0C                   ; $CDCB
    BCC $CDD4                  ; $CDCD
    SBC #$0C                   ; $CDCF
    INX                        ; $CDD1
    BNE $CDCB                  ; $CDD2
    ASL                        ; $CDD4
    ASL                        ; $CDD5
    ASL                        ; $CDD6
    ADC #$54                   ; $CDD7
    TAY                        ; $CDD9
    TXA                        ; $CDDA
    ASL                        ; $CDDB
    ASL                        ; $CDDC
    ASL                        ; $CDDD
    ADC #$34                   ; $CDDE
    TAX                        ; $CDE0
    RTS                        ; $CDE1
    .byte $8A
    SEC                        ; $CDE3
    SBC #$30                   ; $CDE4
    BCC $CE05                  ; $CDE6
    CMP #$A0                   ; $CDE8
    BCS $CE05                  ; $CDEA
    LSR                        ; $CDEC
    LSR                        ; $CDED
    LSR                        ; $CDEE
    TAX                        ; $CDEF
    TYA                        ; $CDF0
    SEC                        ; $CDF1
    SBC #$50                   ; $CDF2
    BCC $CE05                  ; $CDF4
    CMP #$60                   ; $CDF6
    BCS $CE05                  ; $CDF8
    LSR                        ; $CDFA
    LSR                        ; $CDFB
    LSR                        ; $CDFC
    DEX                        ; $CDFD
    BMI $CE07                  ; $CDFE
    CLC                        ; $CE00
    ADC #$0C                   ; $CE01
    BNE $CDFD                  ; $CE03
    LDA #$FF                   ; $CE05
    RTS                        ; $CE07
    .byte $A8
    LDA a: $0024               ; $CE09
    PHA                        ; $CE0C
    LDA a: $0025               ; $CE0D
    PHA                        ; $CE10
    TYA                        ; $CE11
    PHA                        ; $CE12
    LDA $0022                  ; $CE13
    LDA #$1C                   ; $CE15
    STA $0024                  ; $CE17
    LDA #$1D                   ; $CE19
    STA $0025                  ; $CE1B
    JSR $CE2D                  ; $CE1D
    PLA                        ; $CE20
    JSR $8000                  ; $CE21
    PLA                        ; $CE24
    STA $0025                  ; $CE25
    PLA                        ; $CE27
    STA $0024                  ; $CE28
    JMP $CE2D                  ; $CE2A
    .byte $A5,$22
    ORA #$06                   ; $CE2F
    STA $0023                  ; $CE31
    STA $8000                  ; $CE33
    LDA $0024                  ; $CE36
    STA $8001                  ; $CE38
    LDA $0022                  ; $CE3B
    ORA #$07                   ; $CE3D
    STA $0023                  ; $CE3F
    STA $8000                  ; $CE41
    LDA $0025                  ; $CE44
    STA $8001                  ; $CE46
    RTS                        ; $CE49
    .byte $18
    ADC #$40                   ; $CE4B
    .byte $0A
    PHP                        ; $CE4E
    BPL $CE53                  ; $CE4F
    EOR #$FF                   ; $CE51
    AND #$7E                   ; $CE53
    TAX                        ; $CE55
    LDA $FB4D,X                ; $CE56
    TAY                        ; $CE59
    LDA $FB4C,X                ; $CE5A
    TAX                        ; $CE5D
    PLP                        ; $CE5E
    BCC $CE6D                  ; $CE5F
    TXA                        ; $CE61
    EOR #$FF                   ; $CE62
    TAX                        ; $CE64
    TYA                        ; $CE65
    EOR #$FF                   ; $CE66
    TAY                        ; $CE68
    INX                        ; $CE69
    BNE $CE6D                  ; $CE6A
    INY                        ; $CE6C
    RTS                        ; $CE6D
    .byte $85,$36
    ASL                        ; $CE70
    ADC $0036                  ; $CE71
    STA $0036                  ; $CE73
    LDA #$80                   ; $CE75
    STA $0037                  ; $CE77
    LDA $0024                  ; $CE79
    PHA                        ; $CE7B
    LDA $0025                  ; $CE7C
    PHA                        ; $CE7E
    LDA #$1C                   ; $CE7F
    STA $0024                  ; $CE81
    LDA #$1D                   ; $CE83
    STA $0025                  ; $CE85
    .byte $20,$2D,$CE
    JSR $CE96                  ; $CE8A
    PLA                        ; $CE8D
    STA $0025                  ; $CE8E
    PLA                        ; $CE90
    STA $0024                  ; $CE91
    JMP $CE2D                  ; $CE93
    JMP ($0036)                ; $CE96
    .byte $85,$46
    INC $0046                  ; $CE9B
    LDA #$08                   ; $CE9D
    STA $0047                  ; $CE9F
    .byte $A5,$46
    STA $0048                  ; $CEA3
    LDA #$0A                   ; $CEA5
    STA $0049                  ; $CEA7
    LDA $0048                  ; $CEA9
    CMP $0441                  ; $CEAB
    BEQ $CEC3                  ; $CEAE
    CMP $0442                  ; $CEB0
    BEQ $CEC3                  ; $CEB3
    JSR $CD7C                  ; $CEB5
    LDY #$0A                   ; $CEB8
    LDA ($0034),Y              ; $CEBA
    BNE $CEC3                  ; $CEBC
    JSR $CED6                  ; $CEBE
    BCS $CED3                  ; $CEC1
    INC $0048                  ; $CEC3
    DEC $0049                  ; $CEC5
    BNE $CEA9                  ; $CEC7
    LDA $0047                  ; $CEC9
    CLC                        ; $CECB
    ADC #$08                   ; $CECC
    STA $0047                  ; $CECE
    JMP $CEA1                  ; $CED0
    LDA $0048                  ; $CED3
    RTS                        ; $CED5
    LDY #$06                   ; $CED6
    LDA ($0034),Y              ; $CED8
    SEC                        ; $CEDA
    SBC $0635                  ; $CEDB
    BCS $CEE4                  ; $CEDE
    EOR #$FF                   ; $CEE0
    ADC #$01                   ; $CEE2
    CMP $0047                  ; $CEE4
    BCS $CEFC                  ; $CEE6
    LDY #$08                   ; $CEE8
    LDA ($0034),Y              ; $CEEA
    SEC                        ; $CEEC
    SBC $0637                  ; $CEED
    BCS $CEF6                  ; $CEF0
    EOR #$FF                   ; $CEF2
    ADC #$01                   ; $CEF4
    CMP $0047                  ; $CEF6
    BCS $CEFC                  ; $CEF8
    SEC                        ; $CEFA
    RTS                        ; $CEFB
    CLC                        ; $CEFC
    RTS                        ; $CEFD
    .byte $48
    LDA #$00                   ; $CEFF
    STA $0469                  ; $CF01
    LDA #$00                   ; $CF04
    STA $0469                  ; $CF06
    STA $E000                  ; $CF09
    JSR $CB8B                  ; $CF0C
    JSR $CB35                  ; $CF0F
    LDA $0020                  ; $CF12
    AND #$7F                   ; $CF14
    STA $2000                  ; $CF16
    STA $0020                  ; $CF19
    PLA                        ; $CF1B
    JMP $C400                  ; $CF1C
    LDA #$68                   ; $CF1F
    STA $003A                  ; $CF21
    LDA #$04                   ; $CF23
    STA $003B                  ; $CF25
    LDA #$97                   ; $CF27
    STA $003C                  ; $CF29
    LDA #$02                   ; $CF2B
    STA $003D                  ; $CF2D
    LDA #$00                   ; $CF2F
    TAY                        ; $CF31
    STA ($003A),Y              ; $CF32
    INY                        ; $CF34
    BNE $CF32                  ; $CF35
    INC $003B                  ; $CF37
    DEC $003D                  ; $CF39
    BNE $CF32                  ; $CF3B
    STA ($003A),Y              ; $CF3D
    INY                        ; $CF3F
    DEC $003C                  ; $CF40
    BNE $CF3D                  ; $CF42
    LDX #$A5                   ; $CF44
    LDA #$00                   ; $CF46
    STA a: $003A,X             ; $CF48
    DEX                        ; $CF4B
    BNE $CF48                  ; $CF4C
    RTS                        ; $CF4E
    .byte $A9,$00
    PHA                        ; $CF51
    JSR $CD7C                  ; $CF52
    LDY #$0A                   ; $CF55
    LDA #$00                   ; $CF57
    STA ($0034),Y              ; $CF59
    PLA                        ; $CF5B
    PHA                        ; $CF5C
    BEQ $CF63                  ; $CF5D
    CMP #$0B                   ; $CF5F
    BNE $CF69                  ; $CF61
    LDY #$07                   ; $CF63
    LDA #$00                   ; $CF65
    STA ($0034),Y              ; $CF67
    PLA                        ; $CF69
    CLC                        ; $CF6A
    ADC #$01                   ; $CF6B
    CMP #$16                   ; $CF6D
    BNE $CF51                  ; $CF6F
    RTS                        ; $CF71
    .byte $48
    LDA $0022                  ; $CF73
    LDA #$1A                   ; $CF75
    STA $0024                  ; $CF77
    LDA #$1B                   ; $CF79
    STA $0025                  ; $CF7B
    JSR $CE2D                  ; $CF7D
    PLA                        ; $CF80
    JSR $802A                  ; $CF81
    LDA #$18                   ; $CF84
    STA $0024                  ; $CF86
    LDA #$19                   ; $CF88
    STA $0025                  ; $CF8A
    JMP $CE2D                  ; $CF8C
    .byte $8D,$23,$06
    TAX                        ; $CF92
    LDA $D002,X                ; $CF93
    STA $02FF                  ; $CF96
    LDA $D01A,X                ; $CF99
    STA $02FD                  ; $CF9C
    LDA #$03                   ; $CF9F
    STA $02FE                  ; $CFA1
    LDA #$01                   ; $CFA4
    JSR $CB0F                  ; $CFA6
    LDA $0622                  ; $CFA9
    ASL                        ; $CFAC
    ASL                        ; $CFAD
    ASL                        ; $CFAE
    ASL                        ; $CFAF
    LDX $0623                  ; $CFB0
    CLC                        ; $CFB3
    ADC $D00A,X                ; $CFB4
    STA $02FC                  ; $CFB7
    LDA #$0C                   ; $CFBA
    AND a: $001E               ; $CFBC
    BEQ $CFE7                  ; $CFBF
    LDX #$01                   ; $CFC1
    AND #$08                   ; $CFC3
    BEQ $CFC9                  ; $CFC5
    LDX #$FF                   ; $CFC7
    TXA                        ; $CFC9
    CLC                        ; $CFCA
    ADC $0622                  ; $CFCB
    BMI $CFE7                  ; $CFCE
    LDX $0623                  ; $CFD0
    CMP $D012,X                ; $CFD3
    BEQ $CFDA                  ; $CFD6
    BCS $CFE7                  ; $CFD8
    STA $0622                  ; $CFDA
    LDX $0623                  ; $CFDD
    CPX #$05                   ; $CFE0
    BNE $CFE7                  ; $CFE2
    STA a: $002C               ; $CFE4
    LDA #$80                   ; $CFE7
    AND a: $001E               ; $CFE9
    BNE $CFF8                  ; $CFEC
    LDA #$40                   ; $CFEE
    AND a: $001E               ; $CFF0
    BEQ $CFA4                  ; $CFF3
    CLC                        ; $CFF5
    BCC $CFFC                  ; $CFF6
    SEC                        ; $CFF8
    LDA $0622                  ; $CFF9
    LDX #$F8                   ; $CFFC
    STX $02FC                  ; $CFFE
    RTS                        ; $D001
    .byte $48,$48,$48,$48,$40,$48,$48,$48,$9A,$9A,$9A,$9A,$92,$A2,$B2,$C2
    .byte $00,$01,$02,$03,$04,$03,$02,$01,$11,$11,$11,$11,$71,$71,$71,$71
    .byte $AD,$27,$00
    CMP #$01                   ; $D025
    BEQ $D030                  ; $D027
    CMP #$02                   ; $D029
    BEQ $D030                  ; $D02B
    .byte $4C,$92,$D0
    LDA #$00                   ; $D030
    PHA                        ; $D032
    LDX #$00                   ; $D033
    JSR $CE08                  ; $D035
    LDA $0033                  ; $D038
    STA $0037                  ; $D03A
    LDA $0032                  ; $D03C
    STA $0036                  ; $D03E
    LDY #$00                   ; $D040
    LDA ($0034),Y              ; $D042
    CMP #$20                   ; $D044
    BNE $D054                  ; $D046
    LDX #$04                   ; $D048
    LDA a: $0027               ; $D04A
    CMP #$01                   ; $D04D
    BEQ $D05E                  ; $D04F
    DEX                        ; $D051
    BNE $D05E                  ; $D052
    LDX #$03                   ; $D054
    LDA a: $0027               ; $D056
    CMP #$01                   ; $D059
    BEQ $D05E                  ; $D05B
    DEX                        ; $D05D
    LSR $0033                  ; $D05E
    ROR $0032                  ; $D060
    DEX                        ; $D062
    BNE $D05E                  ; $D063
    LDY #$01                   ; $D065
    LDA ($0034),Y              ; $D067
    CLC                        ; $D069
    ADC $0032                  ; $D06A
    TAX                        ; $D06C
    INY                        ; $D06D
    LDA ($0034),Y              ; $D06E
    ADC $0033                  ; $D070
    CMP $0037                  ; $D072
    PHP                        ; $D074
    BCC $D079                  ; $D075
    LDA $0037                  ; $D077
    STA ($0034),Y              ; $D079
    TXA                        ; $D07B
    PLP                        ; $D07C
    BCC $D087                  ; $D07D
    BNE $D085                  ; $D07F
    CMP $0036                  ; $D081
    BCC $D087                  ; $D083
    LDA $0036                  ; $D085
    DEY                        ; $D087
    STA ($0034),Y              ; $D088
    PLA                        ; $D08A
    CLC                        ; $D08B
    ADC #$01                   ; $D08C
    CMP #$0B                   ; $D08E
    BNE $D032                  ; $D090
    RTS                        ; $D092
    .byte $A9,$32
    BIT $063E                  ; $D095
    BMI $D0A8                  ; $D098
    LDX $05FB                  ; $D09A
    BEQ $D0A1                  ; $D09D
    LDX #$01                   ; $D09F
    LDA a: $002A,X             ; $D0A1
    TAX                        ; $D0A4
    LDA $D0AC,X                ; $D0A5
    JSR $CBF1                  ; $D0A8
    RTS                        ; $D0AB
    .byte $3C,$39,$3F,$35,$35,$35,$35,$35,$40,$34,$34,$34,$34,$34,$37,$3B
    .byte $3B,$3B,$3B,$3A,$3A,$3A,$3A,$3A,$3A,$36,$36,$36,$36,$36,$3D,$3D
    .byte $3D,$3D,$38,$3E,$3E,$AD,$2A,$00
    CMP #$02                   ; $D0D4
    BNE $D10F                  ; $D0D6
    LDA #$00                   ; $D0D8
    PHA                        ; $D0DA
    CMP #$0B                   ; $D0DB
    BCC $D0E1                  ; $D0DD
    ADC #$0A                   ; $D0DF
    JSR $CD7C                  ; $D0E1
    LDY #$00                   ; $D0E4
    LDA ($0034),Y              ; $D0E6
    TAX                        ; $D0E8
    PLA                        ; $D0E9
    CPX #$20                   ; $D0EA
    BEQ $D0F6                  ; $D0EC
    CLC                        ; $D0EE
    ADC #$01                   ; $D0EF
    CMP #$16                   ; $D0F1
    BNE $D0DA                  ; $D0F3
    .byte $60
    LDX #$00                   ; $D0F6
    LDA $044D                  ; $D0F8
    BNE $D10C                  ; $D0FB
    LDY #$01                   ; $D0FD
    LDA ($0034),Y              ; $D0FF
    SEC                        ; $D101
    SBC #$64                   ; $D102
    INY                        ; $D104
    LDA ($0034),Y              ; $D105
    SBC #$00                   ; $D107
    BPL $D10C                  ; $D109
    INX                        ; $D10B
    STX $044D                  ; $D10C
    RTS                        ; $D10F
    LDA #$12                   ; $D110
    STA $0024                  ; $D112
    LDA #$13                   ; $D114
    STA $0025                  ; $D116
    JSR $CE2D                  ; $D118
    JMP $B000                  ; $D11B
    LDA a: $0027               ; $D11E
    CMP #$05                   ; $D121
    BNE $D128                  ; $D123
    JMP $D110                  ; $D125
    LDA #$00                   ; $D128
    STA $063E                  ; $D12A
    STA $0640                  ; $D12D
    STA $0641                  ; $D130
    STA $0613                  ; $D133
    LDA a: $0027               ; $D136
    CMP #$04                   ; $D139
    BNE $D14F                  ; $D13B
    PHA                        ; $D13D
    LDA $0022                  ; $D13E
    LDA #$1A                   ; $D140
    STA $0024                  ; $D142
    LDA #$1B                   ; $D144
    STA $0025                  ; $D146
    JSR $CE2D                  ; $D148
    PLA                        ; $D14B
    JSR $8030                  ; $D14C
    STA $0629                  ; $D14F
    ASL                        ; $D152
    STA $003A                  ; $D153
    LDA #$08                   ; $D155
    LDX a: $002B               ; $D157
    CPX #$0E                   ; $D15A
    BEQ $D168                  ; $D15C
    CPX #$12                   ; $D15E
    BEQ $D168                  ; $D160
    CPX #$1A                   ; $D162
    BCS $D168                  ; $D164
    LDA #$00                   ; $D166
    CLC                        ; $D168
    ADC $003A                  ; $D169
    TAX                        ; $D16B
    LDA $D183,X                ; $D16C
    STA $05F7                  ; $D16F
    LDA $D184,X                ; $D172
    STA $05F8                  ; $D175
    LDA #$00                   ; $D178
    STA $05F9                  ; $D17A
    LDX #$50                   ; $D17D
    TXS                        ; $D17F
    JMP $DAAA                  ; $D180
    .byte $B4,$00,$B4,$00,$5A,$00,$5A,$00,$D2,$00,$D2,$00,$5A,$00,$5A,$00
    .byte $AA
    CLC                        ; $D194
    ADC $05FF                  ; $D195
    STA $05FF                  ; $D198
    TXA                        ; $D19B
    PHA                        ; $D19C
    JSR $D235                  ; $D19D
    PLA                        ; $D1A0
    LDX $05F8                  ; $D1A1
    BNE $D1AE                  ; $D1A4
    CPX $05F7                  ; $D1A6
    BNE $D1AE                  ; $D1A9
    JMP $D220                  ; $D1AB
    EOR #$FF                   ; $D1AE
    CLC                        ; $D1B0
    ADC #$01                   ; $D1B1
    BNE $D1B8                  ; $D1B3
    JMP $D21F                  ; $D1B5
    CLC                        ; $D1B8
    ADC $05F7                  ; $D1B9
    TAX                        ; $D1BC
    LDA $05F8                  ; $D1BD
    ADC #$FF                   ; $D1C0
    BPL $D1C7                  ; $D1C2
    LDA #$00                   ; $D1C4
    TAX                        ; $D1C6
    STA $05F8                  ; $D1C7
    STX $05F7                  ; $D1CA
    LDA #$00                   ; $D1CD
    JSR $EF7F                  ; $D1CF
    BIT $063E                  ; $D1D2
    BMI $D1EB                  ; $D1D5
    LDA $05F7                  ; $D1D7
    CMP #$1E                   ; $D1DA
    BCS $D1EB                  ; $D1DC
    LDA $063E                  ; $D1DE
    ORA #$80                   ; $D1E1
    STA $063E                  ; $D1E3
    LDA #$32                   ; $D1E6
    JSR $CBF1                  ; $D1E8
    LDA $05F8                  ; $D1EB
    ORA $05F7                  ; $D1EE
    BNE $D21F                  ; $D1F1
    LDA #$00                   ; $D1F3
    BIT a: $00E2               ; $D1F5
    BPL $D1FC                  ; $D1F8
    LDA #$0C                   ; $D1FA
    CLC                        ; $D1FC
    ADC $05F9                  ; $D1FD
    STA $05F9                  ; $D200
    BEQ $D21F                  ; $D203
    LDA #$00                   ; $D205
    STA $062D                  ; $D207
    LDA $0615                  ; $D20A
    AND #$BF                   ; $D20D
    STA $0615                  ; $D20F
    LDA #$43                   ; $D212
    JSR $CBB0                  ; $D214
    BIT $0615                  ; $D217
    BPL $D21F                  ; $D21A
    JSR $E233                  ; $D21C
    .byte $60,$49,$FF
    CLC                        ; $D222
    ADC #$01                   ; $D223
    CLC                        ; $D225
    ADC $05F9                  ; $D226
    BPL $D231                  ; $D229
    LDX #$50                   ; $D22B
    TXS                        ; $D22D
    JMP $DA98                  ; $D22E
    STA $05F9                  ; $D231
    RTS                        ; $D234
    EOR #$FF                   ; $D235
    CLC                        ; $D237
    ADC #$01                   ; $D238
    TAX                        ; $D23A
    BIT $0449                  ; $D23B
    BPL $D24E                  ; $D23E
    CLC                        ; $D240
    ADC $044A                  ; $D241
    STA $044A                  ; $D244
    BPL $D24E                  ; $D247
    LDA #$00                   ; $D249
    STA $0449                  ; $D24B
    TXA                        ; $D24E
    PHA                        ; $D24F
    LDA #$00                   ; $D250
    JSR $CD7C                  ; $D252
    PLA                        ; $D255
    PHA                        ; $D256
    JSR $D263                  ; $D257
    LDA #$0B                   ; $D25A
    JSR $CD7C                  ; $D25C
    PLA                        ; $D25F
    JMP $D263                  ; $D260
    .byte $AA
    LDY #$0A                   ; $D264
    LDA ($0034),Y              ; $D266
    BEQ $D275                  ; $D268
    TXA                        ; $D26A
    CLC                        ; $D26B
    ADC ($0034),Y              ; $D26C
    BPL $D272                  ; $D26E
    LDA #$00                   ; $D270
    STA ($0034),Y              ; $D272
    RTS                        ; $D274
    LDY #$07                   ; $D275
    LDA ($0034),Y              ; $D277
    BEQ $D299                  ; $D279
    LDY #$06                   ; $D27B
    TXA                        ; $D27D
    CLC                        ; $D27E
    ADC ($0034),Y              ; $D27F
    BPL $D297                  ; $D281
    CLC                        ; $D283
    ADC #$03                   ; $D284
    PHA                        ; $D286
    LDY #$07                   ; $D287
    LDA ($0034),Y              ; $D289
    SEC                        ; $D28B
    SBC #$19                   ; $D28C
    BPL $D292                  ; $D28E
    LDA #$00                   ; $D290
    STA ($0034),Y              ; $D292
    PLA                        ; $D294
    LDY #$06                   ; $D295
    STA ($0034),Y              ; $D297
    RTS                        ; $D299
    .byte $AE,$21,$06
    LDA $D359,X                ; $D29D
    JSR $EF7F                  ; $D2A0
    LDX $0621                  ; $D2A3
    LDA $D35C,X                ; $D2A6
    JSR $EF7F                  ; $D2A9
    LDA #$00                   ; $D2AC
    STA $043E                  ; $D2AE
    STA $061E                  ; $D2B1
    .byte $A9,$01
    JSR $CB0F                  ; $D2B6
    LDA #$0F                   ; $D2B9
    AND a: $001E               ; $D2BB
    BEQ $D309                  ; $D2BE
    LDX #$00                   ; $D2C0
    LSR                        ; $D2C2
    BCS $D2C8                  ; $D2C3
    INX                        ; $D2C5
    BNE $D2C2                  ; $D2C6
    STX $003A                  ; $D2C8
    LDA $0621                  ; $D2CA
    SEC                        ; $D2CD
    SBC #$03                   ; $D2CE
    ASL                        ; $D2D0
    ASL                        ; $D2D1
    ADC $003A                  ; $D2D2
    TAX                        ; $D2D4
    LDA $D362,X                ; $D2D5
    CMP #$FF                   ; $D2D8
    BEQ $D309                  ; $D2DA
    CMP #$02                   ; $D2DC
    BNE $D2ED                  ; $D2DE
    JSR $CD77                  ; $D2E0
    LDY #$00                   ; $D2E3
    LDA ($0034),Y              ; $D2E5
    CMP #$22                   ; $D2E7
    BNE $D309                  ; $D2E9
    LDA #$02                   ; $D2EB
    STA $043D                  ; $D2ED
    LDX $003A                  ; $D2F0
    LDA $061E                  ; $D2F2
    STX $061E                  ; $D2F5
    PHA                        ; $D2F8
    AND #$03                   ; $D2F9
    CMP $061E                  ; $D2FB
    BEQ $D303                  ; $D2FE
    PLA                        ; $D300
    TXA                        ; $D301
    PHA                        ; $D302
    PLA                        ; $D303
    ORA #$80                   ; $D304
    STA $061E                  ; $D306
    LDA #$80                   ; $D309
    AND a: $001E               ; $D30B
    BEQ $D318                  ; $D30E
    BIT $061E                  ; $D310
    BPL $D318                  ; $D313
    JMP $CC46                  ; $D315
    BIT $061E                  ; $D318
    BPL $D2B4                  ; $D31B
    LDA #$20                   ; $D31D
    BIT $061E                  ; $D31F
    BNE $D32F                  ; $D322
    ORA $061E                  ; $D324
    STA $061E                  ; $D327
    LDA #$00                   ; $D32A
    STA $061F                  ; $D32C
    LDX $061F                  ; $D32F
    BEQ $D33A                  ; $D332
    DEC $061F                  ; $D334
    JMP $D2B4                  ; $D337
    LDA #$0D                   ; $D33A
    STA $061F                  ; $D33C
    LDA $061E                  ; $D33F
    EOR #$40                   ; $D342
    STA $061E                  ; $D344
    LDY $043D                  ; $D347
    LDA $D548,Y                ; $D34A
    BIT $061E                  ; $D34D
    BVS $D354                  ; $D350
    ORA #$80                   ; $D352
    LDX #$00                   ; $D354
    JSR $E93D                  ; $D356
    JMP $D2B4                  ; $D359
    .byte $07,$02,$2D,$08,$06,$06,$06,$06,$FF,$05,$00,$00,$02,$01,$09,$07
    .byte $FF,$08,$AD,$21,$06
    CMP #$03                   ; $D371
    BCC $D378                  ; $D373
    JMP $D29A                  ; $D375
    LDA $0600                  ; $D378
    BNE $D37E                  ; $D37B
    RTS                        ; $D37D
    JSR $CC46                  ; $D37E
    LDX #$03                   ; $D381
    LDA #$FF                   ; $D383
    STA $060B,X                ; $D385
    DEX                        ; $D388
    BPL $D385                  ; $D389
    LDA #$00                   ; $D38B
    STA $061E                  ; $D38D
    JSR $D4EA                  ; $D390
    .byte $A9,$0D
    LDX $061E                  ; $D395
    LDY $0601,X                ; $D398
    BEQ $D3A3                  ; $D39B
    LDX $0621                  ; $D39D
    LDA $D552,X                ; $D3A0
    JSR $EF7F                  ; $D3A3
    .byte $A9,$01
    JSR $CB0F                  ; $D3A8
    LDA #$80                   ; $D3AB
    AND a: $001E               ; $D3AD
    BNE $D3B5                  ; $D3B0
    JMP $D438                  ; $D3B2
    LDX $061E                  ; $D3B5
    CPX $0600                  ; $D3B8
    BNE $D3C0                  ; $D3BB
    JMP $CC46                  ; $D3BD
    LDA $060B,X                ; $D3C0
    CMP #$FF                   ; $D3C3
    BEQ $D438                  ; $D3C5
    STA $043D                  ; $D3C7
    TAX                        ; $D3CA
    LDY $061E                  ; $D3CB
    LDA $0601,Y                ; $D3CE
    STA $0442                  ; $D3D1
    PHA                        ; $D3D4
    LDA $0022                  ; $D3D5
    LDA #$1C                   ; $D3D7
    STA $0024                  ; $D3D9
    LDA #$1D                   ; $D3DB
    STA $0025                  ; $D3DD
    JSR $CE2D                  ; $D3DF
    PLA                        ; $D3E2
    JSR $800C                  ; $D3E3
    LDA $0430                  ; $D3E6
    BEQ $D424                  ; $D3E9
    CLC                        ; $D3EB
    ADC #$0B                   ; $D3EC
    JSR $EF7F                  ; $D3EE
    JSR $D77A                  ; $D3F1
    ASL                        ; $D3F4
    PHP                        ; $D3F5
    BCS $D40C                  ; $D3F6
    LSR                        ; $D3F8
    PHA                        ; $D3F9
    STA $043E                  ; $D3FA
    JSR $D746                  ; $D3FD
    PLA                        ; $D400
    BCC $D40C                  ; $D401
    LDX $061E                  ; $D403
    STA $0606,X                ; $D406
    INC $061E                  ; $D409
    JSR $CC46                  ; $D40C
    JSR $D4EA                  ; $D40F
    LDA $061E                  ; $D412
    CMP $0600                  ; $D415
    BEQ $D41F                  ; $D418
    LDA #$16                   ; $D41A
    JSR $EF7F                  ; $D41C
    PLP                        ; $D41F
    BCS $D438                  ; $D420
    BCC $D430                  ; $D422
    LDX $061E                  ; $D424
    STA $0606,X                ; $D427
    JSR $D4E4                  ; $D42A
    INC $061E                  ; $D42D
    LDA $061E                  ; $D430
    CMP $0600                  ; $D433
    BNE $D44F                  ; $D436
    .byte $A9,$40
    AND a: $001E               ; $D43A
    BEQ $D45F                  ; $D43D
    LDX $061E                  ; $D43F
    BEQ $D45F                  ; $D442
    CPX $0600                  ; $D444
    BEQ $D44C                  ; $D447
    JSR $D4E4                  ; $D449
    DEC $061E                  ; $D44C
    LDA $061F                  ; $D44F
    ORA #$40                   ; $D452
    STA $061F                  ; $D454
    LDA #$00                   ; $D457
    STA $0620                  ; $D459
    JMP $D393                  ; $D45C
    LDA #$0F                   ; $D45F
    AND a: $001E               ; $D461
    BEQ $D49F                  ; $D464
    LDX #$00                   ; $D466
    LSR                        ; $D468
    BCS $D46E                  ; $D469
    INX                        ; $D46B
    BNE $D468                  ; $D46C
    STX $003A                  ; $D46E
    LDA $0621                  ; $D470
    ASL                        ; $D473
    ASL                        ; $D474
    ADC $003A                  ; $D475
    TAX                        ; $D477
    LDA $D555,X                ; $D478
    LDY $061E                  ; $D47B
    LDX $0601,Y                ; $D47E
    BNE $D488                  ; $D481
    LDX $003A                  ; $D483
    LDA $D561,X                ; $D485
    CMP #$FF                   ; $D488
    BEQ $D49F                  ; $D48A
    LDX $061E                  ; $D48C
    CMP $060B,X                ; $D48F
    BEQ $D49F                  ; $D492
    STA $060B,X                ; $D494
    LDA #$00                   ; $D497
    STA $0606,X                ; $D499
    STA $061F                  ; $D49C
    LDA $061E                  ; $D49F
    CMP $0600                  ; $D4A2
    BNE $D4AA                  ; $D4A5
    JMP $D3A6                  ; $D4A7
    BIT $061F                  ; $D4AA
    BMI $D4B9                  ; $D4AD
    LDA #$80                   ; $D4AF
    STA $061F                  ; $D4B1
    LDA #$00                   ; $D4B4
    STA $0620                  ; $D4B6
    LDA $0620                  ; $D4B9
    BEQ $D4C4                  ; $D4BC
    DEC $0620                  ; $D4BE
    JMP $D3A6                  ; $D4C1
    LDA #$0D                   ; $D4C4
    STA $0620                  ; $D4C6
    LDA $061F                  ; $D4C9
    EOR #$40                   ; $D4CC
    STA $061F                  ; $D4CE
    LDX $061E                  ; $D4D1
    JSR $D504                  ; $D4D4
    BIT $061F                  ; $D4D7
    BVS $D4DE                  ; $D4DA
    ORA #$80                   ; $D4DC
    JSR $E93D                  ; $D4DE
    JMP $D3A6                  ; $D4E1
    JSR $D504                  ; $D4E4
    JMP $E93D                  ; $D4E7
    LDA $0600                  ; $D4EA
    CLC                        ; $D4ED
    ADC #$11                   ; $D4EE
    JSR $EF7F                  ; $D4F0
    LDA #$00                   ; $D4F3
    PHA                        ; $D4F5
    TAX                        ; $D4F6
    JSR $D4E4                  ; $D4F7
    PLA                        ; $D4FA
    CLC                        ; $D4FB
    ADC #$01                   ; $D4FC
    CMP $0600                  ; $D4FE
    BNE $D4F5                  ; $D501
    RTS                        ; $D503
    LDA $060B,X                ; $D504
    CMP #$FF                   ; $D507
    BNE $D50E                  ; $D509
    LDA #$1D                   ; $D50B
    RTS                        ; $D50D
    LDY $0601,X                ; $D50E
    BNE $D518                  ; $D511
    TAY                        ; $D513
    LDA $D548,Y                ; $D514
    RTS                        ; $D517
    ASL                        ; $D518
    TAY                        ; $D519
    LDA $D52B,Y                ; $D51A
    STA $003A                  ; $D51D
    LDA $D52C,Y                ; $D51F
    STA $003B                  ; $D522
    LDA $0606,X                ; $D524
    TAY                        ; $D527
    LDA ($003A),Y              ; $D528
    RTS                        ; $D52A
    .byte $39,$D5,$3D,$D5,$42,$D5,$44,$D5,$45,$D5,$46,$D5,$47,$D5,$0C,$0E
    .byte $0D,$0F,$07,$08,$09,$0A,$0B,$10,$11,$15,$14,$13,$12,$17,$16,$18
    .byte $19,$1A,$1C,$1B,$1E,$1F,$20,$16,$18,$17,$00,$02,$06,$01,$03,$02
    .byte $06,$05,$04,$02,$06,$05,$04,$04,$FF,$03,$20,$73,$D5
    LDA #$1A                   ; $D568
    STA $0024                  ; $D56A
    LDA #$1B                   ; $D56C
    STA $0025                  ; $D56E
    JMP $CE2D                  ; $D570
    LDA #$00                   ; $D573
    STA $062D                  ; $D575
    STA $0628                  ; $D578
    JSR $CD77                  ; $D57B
    LDY #$0A                   ; $D57E
    LDA ($0034),Y              ; $D580
    BEQ $D58C                  ; $D582
    LDA #$40                   ; $D584
    JSR $CBB0                  ; $D586
    JMP $D5B2                  ; $D589
    LDA $0621                  ; $D58C
    CMP #$03                   ; $D58F
    BEQ $D5B2                  ; $D591
    CMP #$01                   ; $D593
    BNE $D5A5                  ; $D595
    LDA $0600                  ; $D597
    BEQ $D5A5                  ; $D59A
    LDA $0601                  ; $D59C
    BEQ $D5B2                  ; $D59F
    CMP #$0B                   ; $D5A1
    BEQ $D5B2                  ; $D5A3
    LDY #$07                   ; $D5A5
    LDA ($0034),Y              ; $D5A7
    CMP #$18                   ; $D5A9
    BCC $D5B2                  ; $D5AB
    LDA #$41                   ; $D5AD
    JSR $CBB0                  ; $D5AF
    .byte $20,$A2,$EF
    LDA #$00                   ; $D5B5
    STA $0011                  ; $D5B7
    STA $0012                  ; $D5B9
    LDA #$02                   ; $D5BB
    JSR $CB0F                  ; $D5BD
    JSR $CC46                  ; $D5C0
    .byte $20,$46,$CC
    LDA $05FB                  ; $D5C6
    BEQ $D5CE                  ; $D5C9
    JMP $D36E                  ; $D5CB
    LDX $0621                  ; $D5CE
    LDA $D706,X                ; $D5D1
    JSR $EF7F                  ; $D5D4
    LDX $0621                  ; $D5D7
    LDA $D700,X                ; $D5DA
    JSR $EF7F                  ; $D5DD
    LDA #$00                   ; $D5E0
    STA $061E                  ; $D5E2
    .byte $A9,$01
    JSR $CB0F                  ; $D5E7
    LDA #$0F                   ; $D5EA
    AND a: $001E               ; $D5EC
    BEQ $D626                  ; $D5EF
    LDX #$00                   ; $D5F1
    LSR                        ; $D5F3
    BCS $D5F9                  ; $D5F4
    INX                        ; $D5F6
    BNE $D5F3                  ; $D5F7
    STX $003A                  ; $D5F9
    LDA $0621                  ; $D5FB
    ASL                        ; $D5FE
    ASL                        ; $D5FF
    ADC $003A                  ; $D600
    TAX                        ; $D602
    LDA $D6E8,X                ; $D603
    CMP #$FF                   ; $D606
    BEQ $D626                  ; $D608
    STA $043B                  ; $D60A
    LDX $003A                  ; $D60D
    LDA $061E                  ; $D60F
    STX $061E                  ; $D612
    PHA                        ; $D615
    AND #$03                   ; $D616
    CMP $061E                  ; $D618
    BEQ $D620                  ; $D61B
    PLA                        ; $D61D
    TXA                        ; $D61E
    PHA                        ; $D61F
    PLA                        ; $D620
    ORA #$80                   ; $D621
    STA $061E                  ; $D623
    LDA #$80                   ; $D626
    AND a: $001E               ; $D628
    BEQ $D638                  ; $D62B
    BIT $061E                  ; $D62D
    BPL $D638                  ; $D630
    JSR $D67C                  ; $D632
    JMP $D5C3                  ; $D635
    BIT $061E                  ; $D638
    BPL $D5E5                  ; $D63B
    LDA #$20                   ; $D63D
    BIT $061E                  ; $D63F
    BNE $D64F                  ; $D642
    ORA $061E                  ; $D644
    STA $061E                  ; $D647
    LDA #$00                   ; $D64A
    STA $061F                  ; $D64C
    LDX $061F                  ; $D64F
    BEQ $D65A                  ; $D652
    DEC $061F                  ; $D654
    JMP $D5E5                  ; $D657
    LDA #$0D                   ; $D65A
    STA $061F                  ; $D65C
    LDA $061E                  ; $D65F
    EOR #$40                   ; $D662
    STA $061E                  ; $D664
    LDY $043B                  ; $D667
    LDA $D6DE,Y                ; $D66A
    BIT $061E                  ; $D66D
    BVS $D674                  ; $D670
    ORA #$80                   ; $D672
    LDX #$00                   ; $D674
    JSR $E93D                  ; $D676
    JMP $D5E5                  ; $D679
    LDX $043B                  ; $D67C
    LDA $D6DE,X                ; $D67F
    LDX #$00                   ; $D682
    STX $043C                  ; $D684
    JSR $E93D                  ; $D687
    LDX $043B                  ; $D68A
    CPX #$02                   ; $D68D
    BNE $D696                  ; $D68F
    LDA $0600                  ; $D691
    BEQ $D6C4                  ; $D694
    LDA $0441                  ; $D696
    PHA                        ; $D699
    LDA $0022                  ; $D69A
    LDA #$1C                   ; $D69C
    STA $0024                  ; $D69E
    LDA #$1D                   ; $D6A0
    STA $0025                  ; $D6A2
    JSR $CE2D                  ; $D6A4
    PLA                        ; $D6A7
