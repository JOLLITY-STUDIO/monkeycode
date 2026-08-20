    .byte $1C,$EA,$29,$EA,$34,$EA,$3D,$EA,$46,$EA,$51,$EA,$59,$EA,$61,$EA
    .byte $6A,$EA,$73,$EA,$7C,$EA,$87,$EA,$94,$EA,$9F,$EA,$AC,$EA,$B7,$EA
    .byte $C4,$EA,$CE,$EA,$DB,$EA,$E6,$EA,$EF,$EA,$F8,$EA,$01,$EB,$0D,$EB
    .byte $17,$EB,$26,$EB,$33,$EB,$3E,$EB,$4C,$EB,$5E,$EB,$67,$EB,$72,$EB
    .byte $7B,$EB,$AC,$22,$16,$94,$00,$94,$00,$00,$54,$68,$5C,$69,$00,$AC
    .byte $22,$16,$00,$95,$FE,$00,$5A,$4D,$00,$00,$AC,$22,$16,$FE,$4C,$71
    .byte $7D,$54,$00,$AC,$22,$16,$FE,$6C,$6E,$3F,$52,$7D,$AC,$22,$12,$00
    .byte $00,$00,$95,$54,$67,$6F,$5C,$AC,$22,$12,$FE,$00,$4D,$69,$7D,$AC
    .byte $22,$12,$FE,$48,$68,$41,$7D,$6E,$22,$16,$FE,$00,$50,$6F,$48,$69
    .byte $6E,$22,$16,$FE,$00,$4D,$46,$42,$50,$6E,$22,$16,$FE,$00,$46,$60
    .byte $4F,$68,$6E,$22,$16,$00,$95,$FE,$00,$5A,$6C,$7D,$50,$6E,$22,$16
    .byte $00,$00,$00,$94,$00,$00,$50,$42,$46,$7D,$6E,$22,$16,$00,$94,$FE
    .byte $00,$5C,$6B,$6F,$48,$6E,$22,$16,$00,$00,$00,$00,$94,$00,$4D,$46
    .byte $42,$5C,$6E,$22,$16,$00,$94,$FE,$00,$06,$2E,$22,$2E,$6E,$22,$16
    .byte $00,$95,$00,$00,$94,$00,$5A,$6C,$7D,$5C,$6E,$22,$16,$95,$FE,$5A
    .byte $4D,$46,$6F,$54,$6E,$22,$16,$00,$00,$00,$00,$95,$00,$4D,$46,$42
    .byte $5A,$6E,$22,$16,$00,$94,$FE,$03,$0A,$06,$15,$02,$6E,$22,$16,$FE
    .byte $00,$5C,$76,$6B,$7D,$6E,$22,$16,$FE,$00,$0E,$28,$01,$03,$6E,$22
    .byte $16,$FE,$00,$48,$68,$41,$7D,$AB,$22,$1A,$00,$95,$FE,$00,$5A,$6E
    .byte $51,$00,$00,$AB,$22,$1A,$FE,$00,$47,$70,$6F,$51,$00,$AB,$22,$1A
    .byte $00,$00,$00,$00,$00,$94,$0B,$2E,$06,$08,$14,$1B,$6E,$22,$16,$00
    .byte $00,$94,$94,$FE,$00,$14,$1B,$10,$0D,$6E,$22,$16,$00,$94,$FE,$20
    .byte $06,$1F,$04,$29,$AB,$22,$17,$FE,$4C,$71,$7D,$54,$16,$0F,$15,$04
    .byte $29,$00,$AB,$22,$17,$94,$00,$94,$00,$00,$54,$68,$5C,$69,$16,$0F
    .byte $15,$04,$29,$00,$6E,$22,$16,$FE,$7D,$7D,$7D,$7D,$7D,$AA,$22,$16
    .byte $00,$94,$FE,$1B,$10,$28,$4D,$60,$AA,$22,$16,$FE,$0C,$32,$03,$22
    .byte $2E,$AA,$22,$16,$00,$94,$FE,$20,$07,$4D,$60,$00,$A9,$01
    JSR $CB0F                  ; $EB88
    LDA $0021                  ; $EB8B
    AND #$1E                   ; $EB8D
    LDX $0539                  ; $EB8F
    BEQ $EB99                  ; $EB92
    LDA $0021                  ; $EB94
    EOR $0539                  ; $EB96
    STA $0021                  ; $EB99
    JSR $EC08                  ; $EB9B
    JSR $ED85                  ; $EB9E
    PHA                        ; $EBA1
    LDA $0022                  ; $EBA2
    LDA #$18                   ; $EBA4
    STA $0024                  ; $EBA6
    LDA #$19                   ; $EBA8
    STA $0025                  ; $EBAA
    JSR $CE2D                  ; $EBAC
    PLA                        ; $EBAF
    JSR $8003                  ; $EBB0
    PHA                        ; $EBB3
    LDA $0022                  ; $EBB4
    LDA #$18                   ; $EBB6
    STA $0024                  ; $EBB8
    LDA #$19                   ; $EBBA
    STA $0025                  ; $EBBC
    JSR $CE2D                  ; $EBBE
    PLA                        ; $EBC1
    JSR $8006                  ; $EBC2
    PHA                        ; $EBC5
    LDA $0022                  ; $EBC6
    LDA #$18                   ; $EBC8
    STA $0024                  ; $EBCA
    LDA #$19                   ; $EBCC
    STA $0025                  ; $EBCE
    JSR $CE2D                  ; $EBD0
    PLA                        ; $EBD3
    JSR $8009                  ; $EBD4
    LDA $052E                  ; $EBD7
    BEQ $EC05                  ; $EBDA
    DEC $052E                  ; $EBDC
    BNE $EC05                  ; $EBDF
    LDA $052F                  ; $EBE1
    CMP #$7E                   ; $EBE4
    BCC $EBF9                  ; $EBE6
    CMP #$7F                   ; $EBE8
    BEQ $EBF3                  ; $EBEA
    LDA a: $0027               ; $EBEC
    CMP #$04                   ; $EBEF
    BEQ $EC05                  ; $EBF1
    JSR $D093                  ; $EBF3
    JMP $EC05                  ; $EBF6
    BIT $063F                  ; $EBF9
    BPL $EC02                  ; $EBFC
    CMP #$63                   ; $EBFE
    BNE $EC05                  ; $EC00
    JSR $CBF1                  ; $EC02
    .byte $4C,$86,$EB
    LDA $0516                  ; $EC08
    AND #$81                   ; $EC0B
    BNE $EC10                  ; $EC0D
    RTS                        ; $EC0F
    BIT $0516                  ; $EC10
    BPL $EC34                  ; $EC13
    LDA #$01                   ; $EC15
    STA $0516                  ; $EC17
    PHA                        ; $EC1A
    LDA $0022                  ; $EC1B
    LDA #$10                   ; $EC1D
    STA $0024                  ; $EC1F
    LDA #$11                   ; $EC21
    STA $0025                  ; $EC23
    JSR $CE2D                  ; $EC25
    PLA                        ; $EC28
    JSR $8000                  ; $EC29
    LDA #$00                   ; $EC2C
    STA $0522                  ; $EC2E
    STA $0539                  ; $EC31
    LDX $0519                  ; $EC34
    BEQ $EC3C                  ; $EC37
    JMP $ED5B                  ; $EC39
    LDA #$00                   ; $EC3C
    STA $0532                  ; $EC3E
    STA $0534                  ; $EC41
    STA $0536                  ; $EC44
    STA $0538                  ; $EC47
    STA $0539                  ; $EC4A
    LDA #$08                   ; $EC4D
    BIT $0516                  ; $EC4F
    BNE $EC75                  ; $EC52
    LDA $0516                  ; $EC54
    AND #$50                   ; $EC57
    CMP #$50                   ; $EC59
    BEQ $EC8C                  ; $EC5B
    BIT $0516                  ; $EC5D
    BVS $EC74                  ; $EC60
    PHA                        ; $EC62
    LDA $0022                  ; $EC63
    LDA #$10                   ; $EC65
    STA $0024                  ; $EC67
    LDA #$11                   ; $EC69
    STA $0025                  ; $EC6B
    JSR $CE2D                  ; $EC6D
    PLA                        ; $EC70
    JSR $8003                  ; $EC71
    RTS                        ; $EC74
    EOR $0516                  ; $EC75
    STA $0516                  ; $EC78
    LDA #$00                   ; $EC7B
    STA $05D2                  ; $EC7D
    LDA #$00                   ; $EC80
    STA $000D                  ; $EC82
    STA $000E                  ; $EC84
    LDA #$00                   ; $EC86
    STA $0516                  ; $EC88
    RTS                        ; $EC8B
    LDA $0516                  ; $EC8C
    AND #$8F                   ; $EC8F
    STA $0516                  ; $EC91
    LDA $0523                  ; $EC94
    STA $0519                  ; $EC97
    LDA $0524                  ; $EC9A
    CMP #$FF                   ; $EC9D
    BEQ $ECF7                  ; $EC9F
    LDA #$04                   ; $ECA1
    BIT $0516                  ; $ECA3
    BEQ $ECB7                  ; $ECA6
    EOR $0516                  ; $ECA8
    STA $0516                  ; $ECAB
    LDA #$00                   ; $ECAE
    STA $0011                  ; $ECB0
    STA $0012                  ; $ECB2
    JSR $CC46                  ; $ECB4
    LDA $0526                  ; $ECB7
    BPL $ECCA                  ; $ECBA
    AND #$7F                   ; $ECBC
    STA $0526                  ; $ECBE
    STA $0490                  ; $ECC1
    LDA $0527                  ; $ECC4
    STA $0491                  ; $ECC7
    LDA $0525                  ; $ECCA
    LDX #$00                   ; $ECCD
    JSR $CC02                  ; $ECCF
    JSR $CCD2                  ; $ECD2
    .byte $00,$6C,$04
    LDA $05CE                  ; $ECD8
    PHA                        ; $ECDB
    LDA $0022                  ; $ECDC
    LDA #$0B                   ; $ECDE
    STA $0024                  ; $ECE0
    LDA #$0C                   ; $ECE2
    STA $0025                  ; $ECE4
    JSR $CE2D                  ; $ECE6
    PLA                        ; $ECE9
    JSR $8006                  ; $ECEA
    LDA #$00                   ; $ECED
    STA $004A                  ; $ECEF
    LDA $05D1                  ; $ECF1
    STA $05D2                  ; $ECF4
    LDA $0528                  ; $ECF7
    CMP #$FF                   ; $ECFA
    BEQ $ED06                  ; $ECFC
    STA $053C                  ; $ECFE
    LDA #$80                   ; $ED01
    STA $053A                  ; $ED03
    LDA #$00                   ; $ED06
    STA $000D                  ; $ED08
    STA $000E                  ; $ED0A
    LDA $052A                  ; $ED0C
    STA $0517                  ; $ED0F
    LDA $0529                  ; $ED12
    CMP #$FF                   ; $ED15
    BEQ $ED2D                  ; $ED17
    STA $05EA                  ; $ED19
    LDX #$11                   ; $ED1C
    LDA #$C8                   ; $ED1E
    STA $0001,X                ; $ED20
    LDA #$18                   ; $ED22
    STA $0002,X                ; $ED24
    LDA #$7F                   ; $ED26
    LDY #$FF                   ; $ED28
    JSR $CAE7                  ; $ED2A
    LDA $052B                  ; $ED2D
    ORA #$80                   ; $ED30
    STA $0532                  ; $ED32
    LDA $052C                  ; $ED35
    ORA #$80                   ; $ED38
    STA $0536                  ; $ED3A
    LDA $052D                  ; $ED3D
    ORA #$80                   ; $ED40
    STA $0534                  ; $ED42
    LDA $0530                  ; $ED45
    STA $052E                  ; $ED48
    LDA $0531                  ; $ED4B
    STA $052F                  ; $ED4E
    LDA #$00                   ; $ED51
    STA $008E                  ; $ED53
    LDA #$01                   ; $ED55
    STA $0469                  ; $ED57
    RTS                        ; $ED5A
    .byte $CA
    STX $0519                  ; $ED5C
    CPX #$28                   ; $ED5F
    BCS $ED84                  ; $ED61
    LDA $0516                  ; $ED63
    AND #$20                   ; $ED66
    BNE $ED84                  ; $ED68
    LDA $0516                  ; $ED6A
    ORA #$20                   ; $ED6D
    STA $0516                  ; $ED6F
    PHA                        ; $ED72
    LDA $0022                  ; $ED73
    LDA #$10                   ; $ED75
    STA $0024                  ; $ED77
    LDA #$11                   ; $ED79
    STA $0025                  ; $ED7B
    JSR $CE2D                  ; $ED7D
    PLA                        ; $ED80
    JSR $8003                  ; $ED81
    RTS                        ; $ED84
    LDA $05D2                  ; $ED85
    BNE $ED8B                  ; $ED88
    RTS                        ; $ED8A
    BPL $EDF5                  ; $ED8B
    AND #$7F                   ; $ED8D
    ORA #$01                   ; $ED8F
    STA $05D2                  ; $ED91
    LDA $05DB                  ; $ED94
    STA $05D3                  ; $ED97
    LDA $05DC                  ; $ED9A
    STA $05D4                  ; $ED9D
    LDA $05DD                  ; $EDA0
    STA $05D5                  ; $EDA3
    LDX $05DE                  ; $EDA6
    LDY $05DF                  ; $EDA9
    STX $05D6                  ; $EDAC
    STY $05D7                  ; $EDAF
    LDA $05E0                  ; $EDB2
    STA $05D8                  ; $EDB5
    LDA $05E1                  ; $EDB8
    STA $05D9                  ; $EDBB
    LDA $05E2                  ; $EDBE
    STA $05DA                  ; $EDC1
    LDA $05D2                  ; $EDC4
    AND #$02                   ; $EDC7
    BEQ $EDF5                  ; $EDC9
    BIT $05D2                  ; $EDCB
    BVC $EDE4                  ; $EDCE
    LDX #$0D                   ; $EDD0
    LDA #$A0                   ; $EDD2
    STA $0001,X                ; $EDD4
    LDA #$0B                   ; $EDD6
    STA $0002,X                ; $EDD8
    LDA #$7F                   ; $EDDA
    LDY #$FF                   ; $EDDC
    JSR $CAE7                  ; $EDDE
    JMP $EDF5                  ; $EDE1
    LDX #$0D                   ; $EDE4
    LDA #$A0                   ; $EDE6
    STA $0001,X                ; $EDE8
    LDA #$0B                   ; $EDEA
    STA $0002,X                ; $EDEC
    LDA #$80                   ; $EDEE
    LDY #$02                   ; $EDF0
    JSR $CAE7                  ; $EDF2
    .byte $2C,$D2,$05
    BVC $EE31                  ; $EDF8
    CLC                        ; $EDFA
    LDA $05D6                  ; $EDFB
    ADC $05D3                  ; $EDFE
    STA $05D3                  ; $EE01
    LDX #$00                   ; $EE04
    LDA $05D7                  ; $EE06
    ADC $004B                  ; $EE09
    STA $004B                  ; $EE0B
    CMP #$F0                   ; $EE0D
    BCC $EE20                  ; $EE0F
    INX                        ; $EE11
    LDA #$10                   ; $EE12
    BIT $05D7                  ; $EE14
    BPL $EE1D                  ; $EE17
    LDA #$F0                   ; $EE19
    DEX                        ; $EE1B
    DEX                        ; $EE1C
    CLC                        ; $EE1D
    ADC $004B                  ; $EE1E
    STA $004B                  ; $EE20
    STA $05D4                  ; $EE22
    CLC                        ; $EE25
    TXA                        ; $EE26
    ADC $05D5                  ; $EE27
    STA $05D5                  ; $EE2A
    JSR $EE6D                  ; $EE2D
    RTS                        ; $EE30
    LDA $0020                  ; $EE31
    AND #$FE                   ; $EE33
    STA $0020                  ; $EE35
    CLC                        ; $EE37
    LDA $05D6                  ; $EE38
    ADC $05D3                  ; $EE3B
    STA $05D3                  ; $EE3E
    LDA $05D7                  ; $EE41
    ADC $05D4                  ; $EE44
    STA $05D4                  ; $EE47
    STA $004A                  ; $EE4A
    TAX                        ; $EE4C
    LDA #$00                   ; $EE4D
    BIT $05D7                  ; $EE4F
    BPL $EE56                  ; $EE52
    LDA #$FF                   ; $EE54
    PHP                        ; $EE56
    TAX                        ; $EE57
    ADC $05D5                  ; $EE58
    STA $05D5                  ; $EE5B
    AND #$01                   ; $EE5E
    ORA $0020                  ; $EE60
    STA $0020                  ; $EE62
    TXA                        ; $EE64
    PLP                        ; $EE65
    ADC #$00                   ; $EE66
    TAX                        ; $EE68
    JSR $EE6D                  ; $EE69
    RTS                        ; $EE6C
    LDA $05D2                  ; $EE6D
    AND #$02                   ; $EE70
    BEQ $EE9E                  ; $EE72
    LDX $05D4                  ; $EE74
    LDY $05D5                  ; $EE77
    BPL $EE88                  ; $EE7A
    TXA                        ; $EE7C
    EOR #$FF                   ; $EE7D
    TAX                        ; $EE7F
    TYA                        ; $EE80
    EOR #$FF                   ; $EE81
    TAY                        ; $EE83
    INX                        ; $EE84
    BNE $EE88                  ; $EE85
    INY                        ; $EE87
    TXA                        ; $EE88
    SEC                        ; $EE89
    SBC $05D9                  ; $EE8A
    TYA                        ; $EE8D
    SBC $05DA                  ; $EE8E
    BCC $EE9E                  ; $EE91
    LDA #$00                   ; $EE93
    STA $05D2                  ; $EE95
    LDA #$00                   ; $EE98
    STA $000D                  ; $EE9A
    STA $000E                  ; $EE9C
    RTS                        ; $EE9E
    PHA                        ; $EE9F
    LDA $0022                  ; $EEA0
    LDA #$14                   ; $EEA2
    STA $0024                  ; $EEA4
    LDA #$15                   ; $EEA6
    STA $0025                  ; $EEA8
    JSR $CE2D                  ; $EEAA
    PLA                        ; $EEAD
    JSR $8000                  ; $EEAE
    LDA #$00                   ; $EEB1
    STA $003A                  ; $EEB3
    STA $0048                  ; $EEB5
    LDX $053D                  ; $EEB7
    BEQ $EEDA                  ; $EEBA
    .byte $A9,$40,$38,$ED,$3F,$05,$CD,$3E,$05,$AD,$3E,$05,$B0,$02,$A9,$00
    .byte $AA,$18,$69,$08,$8D,$3E,$05,$8A,$18,$6D,$3F,$05,$0A,$0A
    STA $003B                  ; $EEDA
    LDA $003A                  ; $EEDC
    LSR                        ; $EEDE
    TAX                        ; $EEDF
    LDA $0543,X                ; $EEE0
    BCS $EEE9                  ; $EEE3
    LSR                        ; $EEE5
    LSR                        ; $EEE6
    LSR                        ; $EEE7
    LSR                        ; $EEE8
    AND #$0F                   ; $EEE9
    ASL                        ; $EEEB
    TAX                        ; $EEEC
    LDA $EF73,X                ; $EEED
    STA $003C                  ; $EEF0
    LDA $EF74,X                ; $EEF2
    STA $003D                  ; $EEF5
    LDY #$00                   ; $EEF7
    LDA ($003C),Y              ; $EEF9
    BPL $EF38                  ; $EEFB
    BIT $0615                  ; $EEFD
    BVS $EF14                  ; $EF00
    PHA                        ; $EF02
    LDA $0022                  ; $EF03
    LDA #$14                   ; $EF05
    STA $0024                  ; $EF07
    LDA #$15                   ; $EF09
    STA $0025                  ; $EF0B
    JSR $CE2D                  ; $EF0D
    PLA                        ; $EF10
    JSR $8006                  ; $EF11
    PHA                        ; $EF14
    LDA $0022                  ; $EF15
    LDA #$14                   ; $EF17
    STA $0024                  ; $EF19
    LDA #$15                   ; $EF1B
    STA $0025                  ; $EF1D
    JSR $CE2D                  ; $EF1F
    PLA                        ; $EF22
    JSR $8003                  ; $EF23
    PHA                        ; $EF26
    LDA $0022                  ; $EF27
    LDA #$16                   ; $EF29
    STA $0024                  ; $EF2B
    LDA #$17                   ; $EF2D
    STA $0025                  ; $EF2F
    JSR $CE2D                  ; $EF31
    PLA                        ; $EF34
    JSR $8000                  ; $EF35
    INC $003A                  ; $EF38
    LDA $003A                  ; $EF3A
    CMP #$06                   ; $EF3C
    BNE $EEDC                  ; $EF3E
    BIT $062D                  ; $EF40
    BPL $EF57                  ; $EF43
    PHA                        ; $EF45
    LDA $0022                  ; $EF46
    LDA #$14                   ; $EF48
    STA $0024                  ; $EF4A
    LDA #$15                   ; $EF4C
    STA $0025                  ; $EF4E
    JSR $CE2D                  ; $EF50
    PLA                        ; $EF53
    JSR $8009                  ; $EF54
    LDA #$40                   ; $EF57
    SEC                        ; $EF59
    SBC $0048                  ; $EF5A
    STA $053F                  ; $EF5C
    BCC $EF72                  ; $EF5F
    BEQ $EF72                  ; $EF61
    TAY                        ; $EF63
    LDX $003B                  ; $EF64
    LDA #$F8                   ; $EF66
    STA $0200,X                ; $EF68
    INX                        ; $EF6B
    INX                        ; $EF6C
    INX                        ; $EF6D
    INX                        ; $EF6E
    DEY                        ; $EF6F
    BNE $EF68                  ; $EF70
    RTS                        ; $EF72
    .byte $47,$05,$5C,$05,$71,$05,$86,$05,$9B,$05,$B0,$05,$A8
    LDA $0024                  ; $EF80
    PHA                        ; $EF82
    LDA $0025                  ; $EF83
    PHA                        ; $EF85
    TYA                        ; $EF86
    PHA                        ; $EF87
    LDA $0022                  ; $EF88
    LDA #$18                   ; $EF8A
    STA $0024                  ; $EF8C
    LDA #$19                   ; $EF8E
    STA $0025                  ; $EF90
    JSR $CE2D                  ; $EF92
    PLA                        ; $EF95
    JSR $800C                  ; $EF96
    PLA                        ; $EF99
    STA $0025                  ; $EF9A
    PLA                        ; $EF9C
    STA $0024                  ; $EF9D
    JMP $CE2D                  ; $EF9F
    LDA $0621                  ; $EFA2
    CMP #$04                   ; $EFA5
    BCC $EFAA                  ; $EFA7
    RTS                        ; $EFA9
    LDA $0600                  ; $EFAA
    BNE $EFB2                  ; $EFAD
    JMP $EFF6                  ; $EFAF
    LDA #$00                   ; $EFB2
    PHA                        ; $EFB4
    LDA #$01                   ; $EFB5
    JSR $CB0F                  ; $EFB7
    LDA $0515                  ; $EFBA
    BNE $EFB5                  ; $EFBD
    LDA #$01                   ; $EFBF
    STA $0515                  ; $EFC1
    PLA                        ; $EFC4
    PHA                        ; $EFC5
    LDX $0621                  ; $EFC6
    CPX #$03                   ; $EFC9
    BNE $EFCF                  ; $EFCB
    LDA #$05                   ; $EFCD
    ASL                        ; $EFCF
    TAX                        ; $EFD0
    LDA $F206,X                ; $EFD1
    STA $003A                  ; $EFD4
    LDA $F207,X                ; $EFD6
    STA $003B                  ; $EFD9
    LDA #$00                   ; $EFDB
    STA $003C                  ; $EFDD
    LDA #$21                   ; $EFDF
    STA $003D                  ; $EFE1
    LDX #$00                   ; $EFE3
    JSR $F114                  ; $EFE5
    LDA #$04                   ; $EFE8
    JSR $CB0F                  ; $EFEA
    PLA                        ; $EFED
    CLC                        ; $EFEE
    ADC #$01                   ; $EFEF
    CMP $0600                  ; $EFF1
    BNE $EFB4                  ; $EFF4
    .byte $AE,$21,$06
    LDA $F00F,X                ; $EFF9
    STA $063D                  ; $EFFC
    TXA                        ; $EFFF
    BNE $F013                  ; $F000
    LDA $0600                  ; $F002
    BNE $F013                  ; $F005
    LDA #$02                   ; $F007
    STA $063D                  ; $F009
    JMP $F013                  ; $F00C
    .byte $00,$00,$01,$00,$A9,$00,$48
    LDA #$01                   ; $F016
    JSR $CB0F                  ; $F018
    LDA $0515                  ; $F01B
    BNE $F016                  ; $F01E
    LDA #$01                   ; $F020
    STA $0515                  ; $F022
    LDA $063D                  ; $F025
    ASL                        ; $F028
    ASL                        ; $F029
    TAY                        ; $F02A
    LDA $F15A,Y                ; $F02B
    STA $003C                  ; $F02E
    LDA $F15B,Y                ; $F030
    STA $003D                  ; $F033
    PLA                        ; $F035
    PHA                        ; $F036
    TAX                        ; $F037
    CLC                        ; $F038
    LDA $F15C,Y                ; $F039
    ADC $F10E,X                ; $F03C
    STA $04A6                  ; $F03F
    LDA $063D                  ; $F042
    CMP #$03                   ; $F045
    BEQ $F061                  ; $F047
    LDA $05CE                  ; $F049
    AND #$20                   ; $F04C
    ORA $04A6                  ; $F04E
    STA $04A6                  ; $F051
    LDA $05CE                  ; $F054
    LSR                        ; $F057
    LSR                        ; $F058
    LSR                        ; $F059
    LSR                        ; $F05A
    ORA $F15D,Y                ; $F05B
    JMP $F064                  ; $F05E
    LDA $F15D,Y                ; $F061
    .byte $8D,$A7,$04
    LDA #$01                   ; $F067
    STA $04A5                  ; $F069
    LDA $063D                  ; $F06C
    ASL                        ; $F06F
    STA $003B                  ; $F070
    ASL                        ; $F072
    ADC $003B                  ; $F073
    STA $003B                  ; $F075
    TXA                        ; $F077
    ADC $003B                  ; $F078
    TAX                        ; $F07A
    LDA $F16A,X                ; $F07B
    STA $04A8                  ; $F07E
    PLA                        ; $F081
    PHA                        ; $F082
    ASL                        ; $F083
    TAX                        ; $F084
    LDA $F182,X                ; $F085
    STA $003A                  ; $F088
    LDA $F183,X                ; $F08A
    STA $003B                  ; $F08D
    LDX #$04                   ; $F08F
    JSR $F114                  ; $F091
    PLA                        ; $F094
    CLC                        ; $F095
    ADC #$01                   ; $F096
    CMP #$06                   ; $F098
    BEQ $F09F                  ; $F09A
    JMP $F015                  ; $F09C
    LDA $063D                  ; $F09F
    CMP #$03                   ; $F0A2
    BEQ $F10D                  ; $F0A4
    LDA #$01                   ; $F0A6
    JSR $CB0F                  ; $F0A8
    LDA $0515                  ; $F0AB
    BNE $F0A6                  ; $F0AE
    LDA #$01                   ; $F0B0
    STA $0515                  ; $F0B2
    LDA #$01                   ; $F0B5
    STA $04A5                  ; $F0B7
    LDA #$A2                   ; $F0BA
    STA $04A8                  ; $F0BC
    LDA #$00                   ; $F0BF
    STA $003B                  ; $F0C1
    STA $04A9                  ; $F0C3
    LDA $063D                  ; $F0C6
    ASL                        ; $F0C9
    ASL                        ; $F0CA
    TAX                        ; $F0CB
    LDA $0637                  ; $F0CC
    SEC                        ; $F0CF
    SBC #$50                   ; $F0D0
    AND #$F0                   ; $F0D2
    ASL                        ; $F0D4
    STA $003A                  ; $F0D5
    ROL $003B                  ; $F0D7
    LDA $0635                  ; $F0D9
    SEC                        ; $F0DC
    SBC #$30                   ; $F0DD
    LSR                        ; $F0DF
    LSR                        ; $F0E0
    LSR                        ; $F0E1
    LSR                        ; $F0E2
    CLC                        ; $F0E3
    ADC $003A                  ; $F0E4
    STA $003A                  ; $F0E6
    BCC $F0EC                  ; $F0E8
    .byte $E6,$3B
    CLC                        ; $F0EC
    ADC $F15A,X                ; $F0ED
    STA $04A6                  ; $F0F0
    LDA $F15B,X                ; $F0F3
    ADC $003B                  ; $F0F6
    STA $04A7                  ; $F0F8
    LDA $05CE                  ; $F0FB
    LSR                        ; $F0FE
    LSR                        ; $F0FF
    LSR                        ; $F100
    LSR                        ; $F101
    ORA $04A7                  ; $F102
    STA $04A7                  ; $F105
    LDA #$80                   ; $F108
    STA $0515                  ; $F10A
    RTS                        ; $F10D
    .byte $00,$01,$02,$08,$09,$0A
    LDY #$00                   ; $F114
    LDA ($003A),Y              ; $F116
    STA $04A5,X                ; $F118
    BEQ $F154                  ; $F11B
    STA $003E                  ; $F11D
    INY                        ; $F11F
    LDA ($003A),Y              ; $F120
    CLC                        ; $F122
    ADC $003C                  ; $F123
    STA $04A6,X                ; $F125
    PHP                        ; $F128
    INY                        ; $F129
    LDA $003D                  ; $F12A
    CMP #$22                   ; $F12C
    BCC $F134                  ; $F12E
    LDA #$00                   ; $F130
    BEQ $F13B                  ; $F132
    LDA $05CE                  ; $F134
    LSR                        ; $F137
    LSR                        ; $F138
    LSR                        ; $F139
    LSR                        ; $F13A
    ORA ($003A),Y              ; $F13B
    PLP                        ; $F13D
    ADC $003D                  ; $F13E
    STA $04A7,X                ; $F140
    INY                        ; $F143
    INX                        ; $F144
    INX                        ; $F145
    INX                        ; $F146
    LDA ($003A),Y              ; $F147
    STA $04A5,X                ; $F149
    INY                        ; $F14C
    INX                        ; $F14D
    DEC $003E                  ; $F14E
    BNE $F147                  ; $F150
    BEQ $F116                  ; $F152
    LDA #$80                   ; $F154
    STA $0515                  ; $F156
    RTS                        ; $F159
