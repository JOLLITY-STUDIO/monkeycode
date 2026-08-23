; ============================================================
; code_sub.s - bank26 sub routines
; ============================================================

    LDA #$13                   ; $8A83
    JSR $C54E                  ; $8A85
    LDA $043B                  ; $8A88
    JSR $C509                  ; $8A8B
    .byte $00,$00,$12,$C6,$00,$00,$00,$00,$27,$C6,$00,$00,$2D,$C6,$20,$C8
    .byte $8B
    LDA $043D                  ; $8A9F
    CMP #$02                   ; $8AA2
    BNE $8AA9                  ; $8AA4
    JMP $81DE                  ; $8AA6
    JMP $8BDF                  ; $8AA9
    .byte $A0,$60,$40,$00,$AD,$41,$04
    LDX #$02                   ; $8AB3
    JSR $8B3A                  ; $8AB5
    LDA a: $00E2               ; $8AB8
    AND #$03                   ; $8ABB
    CMP #$03                   ; $8ABD
    BNE $8AC3                  ; $8ABF
    LDA #$00                   ; $8AC1
    CLC                        ; $8AC3
    ADC #$03                   ; $8AC4
    STA $003A                  ; $8AC6
    LDA $05FB                  ; $8AC8
    EOR #$0B                   ; $8ACB
    CLC                        ; $8ACD
    ADC $003A                  ; $8ACE
    STA $0442                  ; $8AD0
    STA $0601                  ; $8AD3
    LDX #$03                   ; $8AD6
    JSR $8B3A                  ; $8AD8
    LDA #$00                   ; $8ADB
    STA $043D                  ; $8ADD
    LDA #$00                   ; $8AE0
    STA $043E                  ; $8AE2
    STA $044E                  ; $8AE5
    JSR $8F72                  ; $8AE8
    LDA #$07                   ; $8AEB
    JSR $C54B                  ; $8AED
    LDA #$0A                   ; $8AF0
    LDX #$00                   ; $8AF2
    STX $003B                  ; $8AF4
    LDX #$80                   ; $8AF6
    JSR $8EE9                  ; $8AF8
    LDY #$00                   ; $8AFB
    LDX $0612                  ; $8AFD
    BNE $8B0A                  ; $8B00
    CMP $8B46,Y                ; $8B02
    BCS $8B0A                  ; $8B05
    INY                        ; $8B07
    BNE $8B02                  ; $8B08
    JSR $8148                  ; $8B0A
    LDA $0441                  ; $8B0D
    LDX #$FE                   ; $8B10
    JSR $8B3A                  ; $8B12
    LDA $0442                  ; $8B15
    LDX #$FD                   ; $8B18
    JSR $8B3A                  ; $8B1A
    LDA #$14                   ; $8B1D
    JSR $C54E                  ; $8B1F
    LDA #$00                   ; $8B22
    STA $061A                  ; $8B24
    LDA #$02                   ; $8B27
    STA $05FF                  ; $8B29
    LDA $0612                  ; $8B2C
    JSR $C509                  ; $8B2F
    .byte $1B,$C6,$1B,$C6,$DF,$8B,$D5,$88
    JSR $C50C                  ; $8B3A
    LDY #$03                   ; $8B3D
    TXA                        ; $8B3F
    CLC                        ; $8B40
    ADC ($0034),Y              ; $8B41
    STA ($0034),Y              ; $8B43
    RTS                        ; $8B45
    .byte $A0,$60,$40,$00,$20,$9C,$8B
    BCS $8B50                  ; $8B4D
    RTS                        ; $8B4F
    JSR $C624                  ; $8B50
    LDA #$00                   ; $8B53
    STA $0600                  ; $8B55
    TXA                        ; $8B58
    LDX #$02                   ; $8B59
    EOR $05FB                  ; $8B5B
    BEQ $8B62                  ; $8B5E
    LDX #$01                   ; $8B60
    STX $0621                  ; $8B62
    LDA #$FF                   ; $8B65
    STA $061A                  ; $8B67
    JSR $87E1                  ; $8B6A
    LDX #$50                   ; $8B6D
    TXS                        ; $8B6F
    JMP $8B73                  ; $8B70
    .byte $A9,$0A
    JSR $C609                  ; $8B75
    LDA #$3F                   ; $8B78
    LDX $0621                  ; $8B7A
    CPX #$02                   ; $8B7D
    BEQ $8B86                  ; $8B7F
    JSR $848F                  ; $8B81
    LDA #$2F                   ; $8B84
    JSR $C54E                  ; $8B86
    JSR $8E86                  ; $8B89
    JSR $C600                  ; $8B8C
    LDA $0621                  ; $8B8F
    CMP #$01                   ; $8B92
    BNE $8B99                  ; $8B94
    JMP $8298                  ; $8B96
    JMP $8978                  ; $8B99
    LDA $0637                  ; $8B9C
    CMP #$60                   ; $8B9F
    BCC $8BB6                  ; $8BA1
    CMP #$A0                   ; $8BA3
    BCS $8BB6                  ; $8BA5
    LDX #$00                   ; $8BA7
    LDA $0635                  ; $8BA9
    CMP #$50                   ; $8BAC
    BCC $8BB8                  ; $8BAE
    LDX #$0B                   ; $8BB0
    CMP #$B0                   ; $8BB2
    BCS $8BB8                  ; $8BB4
    CLC                        ; $8BB6
    RTS                        ; $8BB7
    SEC                        ; $8BB8
    RTS                        ; $8BB9
    LDA $0600                  ; $8BBA
    BEQ $8BC7                  ; $8BBD
    LDA $0441                  ; $8BBF
    LDX #$01                   ; $8BC2
    JMP $8BD4                  ; $8BC4
    RTS                        ; $8BC7
    LDX #$03                   ; $8BC8
    LDA $0442                  ; $8BCA
    BEQ $8BD4                  ; $8BCD
    CMP #$0B                   ; $8BCF
    BEQ $8BD4                  ; $8BD1
    DEX                        ; $8BD3
    .byte $20,$0C,$C5
    LDY #$00                   ; $8BD7
    LDA ($0034),Y              ; $8BD9
    JSR $C4C8                  ; $8BDB
    RTS                        ; $8BDE
    .byte $20,$70,$90
    JSR $8C6D                  ; $8BE2
    .byte $20,$06,$C6
    JSR $8C42                  ; $8BE8
    BCS $8C12                  ; $8BEB
    LDA #$00                   ; $8BED
    JSR $C548                  ; $8BEF
    STA $003A                  ; $8BF2
    LDA $0047                  ; $8BF4
    PHA                        ; $8BF6
    LDA #$0B                   ; $8BF7
    JSR $C548                  ; $8BF9
    TAX                        ; $8BFC
    PLA                        ; $8BFD
    CMP $0047                  ; $8BFE
    BCC $8C10                  ; $8C00
    BEQ $8C09                  ; $8C02
    STX $003A                  ; $8C04
    JMP $8C10                  ; $8C06
    BIT a: $00E2               ; $8C09
    BPL $8C10                  ; $8C0C
    STX $003A                  ; $8C0E
    .byte $A5,$3A
    JSR $8E6E                  ; $8C12
    LDA $0441                  ; $8C15
    JSR $C50C                  ; $8C18
    LDY #$06                   ; $8C1B
    LDA $0635                  ; $8C1D
    STA ($0034),Y              ; $8C20
    LDY #$08                   ; $8C22
    LDA $0637                  ; $8C24
    STA ($0034),Y              ; $8C27
    LDA #$00                   ; $8C29
    STA $043C                  ; $8C2B
    JSR $C624                  ; $8C2E
    JSR $8B4A                  ; $8C31
    LDA #$2C                   ; $8C34
    JSR $C54E                  ; $8C36
    JSR $8E86                  ; $8C39
    LDX #$50                   ; $8C3C
    TXS                        ; $8C3E
    JMP $C60F                  ; $8C3F
    LDA $0600                  ; $8C42
    BEQ $8C5F                  ; $8C45
    LDX #$00                   ; $8C47
    LDA $0601,X                ; $8C49
    BEQ $8C59                  ; $8C4C
    CMP #$0B                   ; $8C4E
    BEQ $8C59                  ; $8C50
    LDA $060B,X                ; $8C52
    CMP #$05                   ; $8C55
    BEQ $8C61                  ; $8C57
    INX                        ; $8C59
    CPX $0600                  ; $8C5A
    BNE $8C49                  ; $8C5D
    CLC                        ; $8C5F
    RTS                        ; $8C60
    LDA a: $00E2               ; $8C61
    CMP #$40                   ; $8C64
    BCS $8C5F                  ; $8C66
    LDA $0601,X                ; $8C68
    SEC                        ; $8C6B
    RTS                        ; $8C6C
    LDA a: $00E2               ; $8C6D
    AND #$83                   ; $8C70
    LDX $0637                  ; $8C72
    JSR $8C92                  ; $8C75
    STA $0637                  ; $8C78
    LDA a: $00E3               ; $8C7B
    AND #$83                   ; $8C7E
    STA $062C                  ; $8C80
    LDX $0635                  ; $8C83
    JSR $8C92                  ; $8C86
    STA $0635                  ; $8C89
    LDA #$00                   ; $8C8C
    JSR $8CA4                  ; $8C8E
    RTS                        ; $8C91
    ASL                        ; $8C92
    PHP                        ; $8C93
    ASL                        ; $8C94
    ASL                        ; $8C95
    PLP                        ; $8C96
    BCC $8C9D                  ; $8C97
    EOR #$FF                   ; $8C99
    ADC #$00                   ; $8C9B
    STA $003A                  ; $8C9D
    TXA                        ; $8C9F
    CLC                        ; $8CA0
    ADC $003A                  ; $8CA1
    RTS                        ; $8CA3
    .byte $4A
    PHP                        ; $8CA5
    LDA $0635                  ; $8CA6
    CMP #$30                   ; $8CA9
    BCC $8CCB                  ; $8CAB
    CMP #$D0                   ; $8CAD
    BCS $8CCB                  ; $8CAF
    LDA $0637                  ; $8CB1
    CMP #$50                   ; $8CB4
    BCC $8CBE                  ; $8CB6
    CMP #$B0                   ; $8CB8
    BCS $8CBE                  ; $8CBA
    PLP                        ; $8CBC
    RTS                        ; $8CBD
    PLP                        ; $8CBE
    JSR $8CEA                  ; $8CBF
    JSR $C55A                  ; $8CC2
    LDX #$50                   ; $8CC5
    TXS                        ; $8CC7
    JMP $911C                  ; $8CC8
    PLP                        ; $8CCB
    JSR $8CEA                  ; $8CCC
    JSR $C55A                  ; $8CCF
    LDA $05FB                  ; $8CD2
    BEQ $8CD9                  ; $8CD5
    LDA #$80                   ; $8CD7
    EOR $0635                  ; $8CD9
    BPL $8CE4                  ; $8CDC
    LDX #$50                   ; $8CDE
    TXS                        ; $8CE0
    JMP $92EE                  ; $8CE1
    LDX #$50                   ; $8CE4
    TXS                        ; $8CE6
    JMP $955E                  ; $8CE7
    BCC $8CF4                  ; $8CEA
    LDA $05FB                  ; $8CEC
    EOR #$0B                   ; $8CEF
    STA $05FB                  ; $8CF1
    RTS                        ; $8CF4
    PHA                        ; $8CF5
    JSR $C551                  ; $8CF6
    PLA                        ; $8CF9
    LDY #$07                   ; $8CFA
    CLC                        ; $8CFC
    ADC ($0034),Y              ; $8CFD
    BPL $8D03                  ; $8CFF
    .byte $A9,$7F
    STA ($0034),Y              ; $8D03
    RTS                        ; $8D05
    PHP                        ; $8D06
    ASL                        ; $8D07
    TAX                        ; $8D08
    LDA $8D93,X                ; $8D09
    STA $003C                  ; $8D0C
    LDA $8D94,X                ; $8D0E
    STA $003D                  ; $8D11
    LDA a: $00E2               ; $8D13
    ADC a: $00E3               ; $8D16
    ROR                        ; $8D19
    LDX #$00                   ; $8D1A
    PLP                        ; $8D1C
    BPL $8D4A                  ; $8D1D
    BIT $003A                  ; $8D1F
    BMI $8D4A                  ; $8D21
    LDY $0621                  ; $8D23
    CPY #$04                   ; $8D26
    BNE $8D33                  ; $8D28
    LDY $0442                  ; $8D2A
    BEQ $8D3A                  ; $8D2D
    CPY #$0B                   ; $8D2F
    BEQ $8D3A                  ; $8D31
    LDY a: $00E3               ; $8D33
    CPY #$F8                   ; $8D36
    BCC $8D4A                  ; $8D38
    INX                        ; $8D3A
    TAY                        ; $8D3B
    LDA $043E                  ; $8D3C
    ORA #$80                   ; $8D3F
    STA $043E                  ; $8D41
    TYA                        ; $8D44
    AND #$7F                   ; $8D45
    JMP $8D60                  ; $8D47
    LDY $003B                  ; $8D4A
    .byte $D1,$3C
    BCC $8D57                  ; $8D4E
    BEQ $8D57                  ; $8D50
    SBC ($003C),Y              ; $8D52
    JMP $8D4C                  ; $8D54
    LDX #$00                   ; $8D57
    INY                        ; $8D59
    CLC                        ; $8D5A
    ADC ($003C),Y              ; $8D5B
    BCC $8D60                  ; $8D5D
    INX                        ; $8D5F
    .byte $24,$3A
    BPL $8D74                  ; $8D62
    LSR $0033                  ; $8D64
    ROR $0032                  ; $8D66
    LSR $0033                  ; $8D68
    ROR $0032                  ; $8D6A
    LSR $0033                  ; $8D6C
    ROR $0032                  ; $8D6E
    LSR $0033                  ; $8D70
    ROR $0032                  ; $8D72
    STA $0067                  ; $8D74
    STX $0068                  ; $8D76
    LDA $0032                  ; $8D78
    STA $0069                  ; $8D7A
    LDA $0033                  ; $8D7C
    STA $006A                  ; $8D7E
    JSR $C521                  ; $8D80
    LDA #$00                   ; $8D83
    STA a: $0074               ; $8D85
    LDA $006C                  ; $8D88
    LDY $006D                  ; $8D8A
    BEQ $8D90                  ; $8D8C
    LDA #$FF                   ; $8D8E
    STA $0071                  ; $8D90
    RTS                        ; $8D92
    .byte $A9,$8D,$C9,$8D,$C9,$8D,$E9,$8D,$EB,$8D,$F7,$8D,$17,$8E,$17,$8E
    .byte $17,$8E,$31,$8E,$2F,$8E,$C0,$40,$99,$00,$99,$00,$00,$00,$99,$00
    .byte $99,$00,$C0,$40,$00,$00,$99,$00,$C0,$40,$99,$00,$00,$00,$99,$00
    .byte $99,$00,$C0,$40,$00,$00,$80,$80,$C0,$40,$C0,$40,$00,$00,$99,$00
    .byte $80,$80,$80,$80,$00,$00,$99,$00,$C0,$40,$80,$80,$00,$00,$C0,$40
    .byte $99,$00,$99,$00,$00,$00,$80,$80,$B3,$00,$DA,$25,$00,$00,$00,$00
    .byte $CD,$32,$BF,$00,$C0,$40,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $E6,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $80
    .byte $80,$00,$00,$80,$80,$80,$80,$00,$00,$00,$00,$C0,$40,$80,$80,$00
    .byte $00,$00,$00,$99,$00,$C0,$40,$00,$00,$00,$00,$80,$80,$80,$80
    LDA $0600                  ; $8E33
    BEQ $8E6D                  ; $8E36
    LDX $043D                  ; $8E38
    LDA $0442                  ; $8E3B
    BEQ $8E44                  ; $8E3E
    CMP #$0B                   ; $8E40
    BNE $8E4A                  ; $8E42
    CPX #$04                   ; $8E44
    BEQ $8E6D                  ; $8E46
    BNE $8E52                  ; $8E48
    CPX #$05                   ; $8E4A
    BEQ $8E6D                  ; $8E4C
    CPX #$06                   ; $8E4E
    BEQ $8E6D                  ; $8E50
    JSR $8B9C                  ; $8E52
    LDA $0612                  ; $8E55
    BNE $8E6D                  ; $8E58
    LDA #$0F                   ; $8E5A
    BCS $8E60                  ; $8E5C
    LDA #$3F                   ; $8E5E
    CMP a: $00E2               ; $8E60
    BCC $8E6D                  ; $8E63
    LDA #$04                   ; $8E65
    STA $0612                  ; $8E67
    JSR $C55A                  ; $8E6A
    RTS                        ; $8E6D
    STA $0441                  ; $8E6E
    LDX #$00                   ; $8E71
    CMP #$0B                   ; $8E73
    BCC $8E79                  ; $8E75
    LDX #$0B                   ; $8E77
    TXA                        ; $8E79
    EOR $05FB                  ; $8E7A
    STX $05FB                  ; $8E7D
    BEQ $8E85                  ; $8E80
    JSR $C56F                  ; $8E82
    RTS                        ; $8E85
    .byte $AD,$46,$04
    CMP #$05                   ; $8E89
    BEQ $8EE8                  ; $8E8B
    CMP #$04                   ; $8E8D
    BNE $8EE8                  ; $8E8F
    LDA $05FB                  ; $8E91
    BNE $8EE8                  ; $8E94
    LDA $0441                  ; $8E96
    JSR $C50C                  ; $8E99
    LDY #$00                   ; $8E9C
    LDA ($0034),Y              ; $8E9E
    CMP #$01                   ; $8EA0
    BEQ $8EE8                  ; $8EA2
    LDY #$06                   ; $8EA4
    LDA ($0034),Y              ; $8EA6
    BPL $8EE8                  ; $8EA8
    LDA $0441                  ; $8EAA
    STA $05FC                  ; $8EAD
    LDA #$01                   ; $8EB0
    PHA                        ; $8EB2
    JSR $C50C                  ; $8EB3
    LDY #$00                   ; $8EB6
    LDA ($0034),Y              ; $8EB8
    CMP #$01                   ; $8EBA
    BEQ $8EC4                  ; $8EBC
    PLA                        ; $8EBE
    CLC                        ; $8EBF
    ADC #$01                   ; $8EC0
    BNE $8EB2                  ; $8EC2
    PLA                        ; $8EC4
    STA $0441                  ; $8EC5
    INC $0446                  ; $8EC8
    LDA #$00                   ; $8ECB
    STA $0615                  ; $8ECD
    STA $062D                  ; $8ED0
    LDA #$17                   ; $8ED3
    JSR $C54E                  ; $8ED5
    LDA #$00                   ; $8ED8
    STA $043B                  ; $8EDA
    LDA #$04                   ; $8EDD
    STA $043C                  ; $8EDF
    LDX #$50                   ; $8EE2
    TXS                        ; $8EE4
    JMP $85AC                  ; $8EE5
    RTS                        ; $8EE8
    JSR $8D06                  ; $8EE9
    LDA $0071                  ; $8EEC
    LSR                        ; $8EEE
    LSR                        ; $8EEF
    STA $0619                  ; $8EF0
    LDA $061D                  ; $8EF3
    STA $0070                  ; $8EF6
    LDA $061C                  ; $8EF8
    ASL                        ; $8EFB
    ROL $0070                  ; $8EFC
    ASL                        ; $8EFE
    ROL $0070                  ; $8EFF
    ASL                        ; $8F01
    ROL $0070                  ; $8F02
    ASL                        ; $8F04
    ROL $0070                  ; $8F05
    ASL                        ; $8F07
    ROL $0070                  ; $8F08
    ASL                        ; $8F0A
    ROL $0070                  ; $8F0B
    STA $006F                  ; $8F0D
    JSR $C51E                  ; $8F0F
    LDA $006F                  ; $8F12
    LDY $0070                  ; $8F14
    BEQ $8F1A                  ; $8F16
    LDA #$FF                   ; $8F18
    LDX #$00                   ; $8F1A
    LDY #$00                   ; $8F1C
    RTS                        ; $8F1E
    JSR $8D06                  ; $8F1F
    LDA $061C                  ; $8F22
    STA $0067                  ; $8F25
    LDA $061D                  ; $8F27
    STA $0068                  ; $8F2A
    LDA #$C0                   ; $8F2C
    STA $0069                  ; $8F2E
    LDA #$00                   ; $8F30
    STA $006A                  ; $8F32
    JSR $C521                  ; $8F34
    LDA $006B                  ; $8F37
    STA $006F                  ; $8F39
    LDA $006C                  ; $8F3B
    STA $0070                  ; $8F3D
    JSR $C51E                  ; $8F3F
    LDA $006F                  ; $8F42
    LDY $0070                  ; $8F44
    BEQ $8F4A                  ; $8F46
    LDA #$FF                   ; $8F48
    STA $003A                  ; $8F4A
    JSR $8F59                  ; $8F4C
    CLC                        ; $8F4F
    ADC $003A                  ; $8F50
    BCC $8F56                  ; $8F52
    LDA #$FF                   ; $8F54
    LDY #$00                   ; $8F56
    RTS                        ; $8F58
    JSR $C551                  ; $8F59
    LDY #$05                   ; $8F5C
    LDA ($0034),Y              ; $8F5E
    SEC                        ; $8F60
    SBC $062B                  ; $8F61
    BCS $8F68                  ; $8F64
    LDA #$00                   ; $8F66
    LDY #$07                   ; $8F68
    CLC                        ; $8F6A
    ADC ($0034),Y              ; $8F6B
    BCC $8F71                  ; $8F6D
    .byte $A9,$FF
    RTS                        ; $8F71
    .byte $AD,$41,$04
    LDA #$06                   ; $8F75
    JSR $C54B                  ; $8F77
    LDA #$00                   ; $8F7A
    STA $003A                  ; $8F7C
    LDA $05FB                  ; $8F7E
    BNE $8F9A                  ; $8F81
    LDA $043B                  ; $8F83
    CMP #$02                   ; $8F86
    BNE $8F97                  ; $8F88
    LDA $0600                  ; $8F8A
    BNE $8F97                  ; $8F8D
    LDA #$00                   ; $8F8F
    STA $043F                  ; $8F91
    STA $0440                  ; $8F94
    JSR $8FFB                  ; $8F97
    BIT $003A                  ; $8F9A
    BMI $8FAD                  ; $8F9C
    LDA a: $00E2               ; $8F9E
    CMP #$08                   ; $8FA1
    BCS $8FAD                  ; $8FA3
    LDA $043C                  ; $8FA5
    ORA #$80                   ; $8FA8
    STA $043C                  ; $8FAA
    LDX #$00                   ; $8FAD
    LDA a: $00E2               ; $8FAF
    ADC a: $00E3               ; $8FB2
    ROR                        ; $8FB5
    ORA #$80                   ; $8FB6
    BIT $043C                  ; $8FB8
    BPL $8FC0                  ; $8FBB
    INX                        ; $8FBD
    AND #$7F                   ; $8FBE
    ADC #$00                   ; $8FC0
    BCC $8FC5                  ; $8FC2
    INX                        ; $8FC4
    STA $0067                  ; $8FC5
    STX $0068                  ; $8FC7
    BIT $003A                  ; $8FC9
    BPL $8FDD                  ; $8FCB
    LSR $0033                  ; $8FCD
    ROR $0032                  ; $8FCF
    LSR $0033                  ; $8FD1
    ROR $0032                  ; $8FD3
    LSR $0033                  ; $8FD5
    ROR $0032                  ; $8FD7
    LSR $0033                  ; $8FD9
    ROR $0032                  ; $8FDB
    LDA $0032                  ; $8FDD
    STA $0069                  ; $8FDF
    LDA $0033                  ; $8FE1
    STA $006A                  ; $8FE3
    JSR $C521                  ; $8FE5
    LDA $006C                  ; $8FE8
    STA $061C                  ; $8FEA
    LDA $006D                  ; $8FED
    STA $061D                  ; $8FEF
    RTS                        ; $8FF2
    LDA $05FB                  ; $8FF3
    BNE $8FFB                  ; $8FF6
    STA $003A                  ; $8FF8
    RTS                        ; $8FFA
    LDA #$00                   ; $8FFB
    STA $003A                  ; $8FFD
    LDY #$00                   ; $8FFF
    LDA ($0034),Y              ; $9001
    CMP #$20                   ; $9003
    BNE $902F                  ; $9005
    LDA $05FB                  ; $9007
    BNE $9018                  ; $900A
    LDA $043B                  ; $900C
    BNE $9018                  ; $900F
    LDA $043C                  ; $9011
    CMP #$03                   ; $9014
    BCS $902F                  ; $9016
    LDA $0440                  ; $9018
    LSR                        ; $901B
    TAX                        ; $901C
    LDA $043F                  ; $901D
    ROR                        ; $9020
    CLC                        ; $9021
    ADC $043F                  ; $9022
    STA $043F                  ; $9025
    TXA                        ; $9028
    ADC $0440                  ; $9029
    STA $0440                  ; $902C
    LDY #$01                   ; $902F
    SEC                        ; $9031
    LDA ($0034),Y              ; $9032
    SBC $043F                  ; $9034
    TAX                        ; $9037
    INY                        ; $9038
    LDA ($0034),Y              ; $9039
    SBC $0440                  ; $903B
    BPL $9047                  ; $903E
    LDX #$00                   ; $9040
    LDA #$00                   ; $9042
    SEC                        ; $9044
    ROR $003A                  ; $9045
    STA ($0034),Y              ; $9047
    DEY                        ; $9049
    TXA                        ; $904A
    STA ($0034),Y              ; $904B
    RTS                        ; $904D
    .byte $2C,$4B,$04
    BPL $906F                  ; $9051
    LDA #$00                   ; $9053
    STA $044B                  ; $9055
    STA a: $002F               ; $9058
    LDA #$0C                   ; $905B
    PHA                        ; $905D
    JSR $C50C                  ; $905E
    LDY #$01                   ; $9061
    LDA #$00                   ; $9063
    STA ($0034),Y              ; $9065
    PLA                        ; $9067
    CLC                        ; $9068
    ADC #$01                   ; $9069
    CMP #$16                   ; $906B
    BNE $905D                  ; $906D
    RTS                        ; $906F
    BIT $044C                  ; $9070
    BPL $9084                  ; $9073
    LDA $0441                  ; $9075
    CMP #$14                   ; $9078
    BNE $9084                  ; $907A
    LDA #$00                   ; $907C
    STA $044C                  ; $907E
    STA $03F1                  ; $9081
    RTS                        ; $9084
    LDX $043B                  ; $9085
    LDA $908E,X                ; $9088
    JMP $C603                  ; $908B
    .byte $02,$01,$01,$04,$04,$01,$02,$08
    LDA $043D                  ; $9096
    ASL                        ; $9099
    TAX                        ; $909A
    PLP                        ; $909B
    BCC $909F                  ; $909C
    INX                        ; $909E
    LDA $90F4,X                ; $909F
    LDY $0442                  ; $90A2
    BEQ $90DA                  ; $90A5
    CPY #$0B                   ; $90A7
    BEQ $90DA                  ; $90A9
    TXA                        ; $90AB
    PHA                        ; $90AC
    LSR                        ; $90AD
    BCC $90C3                  ; $90AE
    LDA $0442                  ; $90B0
    JSR $C50C                  ; $90B3
    LDX $043D                  ; $90B6
    LDA $9102,X                ; $90B9
    LDY #$0A                   ; $90BC
    STA ($0034),Y              ; $90BE
    JMP $90D5                  ; $90C0
    LDA $0441                  ; $90C3
    BEQ $90D5                  ; $90C6
    CMP #$0B                   ; $90C8
    BEQ $90D5                  ; $90CA
    JSR $C50C                  ; $90CC
    LDY #$0A                   ; $90CF
    LDA #$05                   ; $90D1
    STA ($0034),Y              ; $90D3
    .byte $68
    TAX                        ; $90D6
    LDA $90E6,X                ; $90D7
    JMP $C603                  ; $90DA
    LDX $043B                  ; $90DD
    LDA $9109,X                ; $90E0
    JMP $C603                  ; $90E3
    .byte $02,$01,$01,$01,$02,$01,$01,$00,$01,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$02,$00,$00,$00,$00,$00,$00,$00,$06,$06,$06,$06
    .byte $06,$00,$00,$01,$00,$00,$01,$02,$00,$01
    CLC                        ; $9110
    ADC $05F9                  ; $9111
    STA $05F9                  ; $9114
    TXA                        ; $9117
    JSR $C603                  ; $9118
    RTS                        ; $911B
    .byte $A9,$29
    JSR $C54E                  ; $911E
    JSR $987B                  ; $9121
    LDA $0635                  ; $9124
    AND #$F8                   ; $9127
    CLC                        ; $9129
    ADC #$04                   ; $912A
    STA $0635                  ; $912C
    LDA #$4C                   ; $912F
    BIT $0637                  ; $9131
    BPL $9138                  ; $9134
    LDA #$B4                   ; $9136
    STA $0637                  ; $9138
    LDX #$00                   ; $913B
    BIT $0635                  ; $913D
    BPL $9143                  ; $9140
    INX                        ; $9142
    BIT $0637                  ; $9143
    BPL $914A                  ; $9146
    INX                        ; $9148
    INX                        ; $9149
    LDA $05FB                  ; $914A
    BEQ $9153                  ; $914D
    TXA                        ; $914F
    EOR #$03                   ; $9150
    TAX                        ; $9152
    LDA $92EA,X                ; $9153
    CLC                        ; $9156
    ADC $05FB                  ; $9157
    STA $0441                  ; $915A
    JSR $C50C                  ; $915D
    LDY #$06                   ; $9160
    LDA $0635                  ; $9162
    STA ($0034),Y              ; $9165
    LDY #$08                   ; $9167
    LDA $0637                  ; $9169
    STA ($0034),Y              ; $916C
    LDX $0635                  ; $916E
    LDA #$08                   ; $9171
    BIT $0637                  ; $9173
    BPL $917A                  ; $9176
    LDA #$F8                   ; $9178
    CLC                        ; $917A
    ADC $0637                  ; $917B
    TAY                        ; $917E
    JSR $C539                  ; $917F
    STA $0624                  ; $9182
    STA $061E                  ; $9185
    JSR $91D2                  ; $9188
    LDA #$2A                   ; $918B
    JSR $C54E                  ; $918D
    LDA #$02                   ; $9190
    LDX #$0A                   ; $9192
    JSR $9110                  ; $9194
    JSR $85F6                  ; $9197
    LDA $0441                  ; $919A
    JSR $C50C                  ; $919D
    LDA $061E                  ; $91A0
    STA $05FE                  ; $91A3
    JSR $C536                  ; $91A6
    TYA                        ; $91A9
    LDY #$08                   ; $91AA
    STA ($0034),Y              ; $91AC
    STA $0637                  ; $91AE
    TXA                        ; $91B1
    LDY #$06                   ; $91B2
    STA ($0034),Y              ; $91B4
    STA $0635                  ; $91B6
    LDA $0624                  ; $91B9
    STA $0638                  ; $91BC
    LDA #$00                   ; $91BF
    STA $043C                  ; $91C1
    STA $061A                  ; $91C4
    LDA #$01                   ; $91C7
    STA $061B                  ; $91C9
    JSR $C60C                  ; $91CC
    JMP $C63C                  ; $91CF
    LDA #$00                   ; $91D2
    STA $0011                  ; $91D4
    STA $0012                  ; $91D6
    LDA $05FB                  ; $91D8
    BEQ $91E0                  ; $91DB
    JMP $9298                  ; $91DD
    LDA #$38                   ; $91E0
    JSR $C54E                  ; $91E2
    LDA #$81                   ; $91E5
    STA $062D                  ; $91E7
    LDA #$1F                   ; $91EA
    STA $0494                  ; $91EC
    LDA #$0F                   ; $91EF
    JSR $C52A                  ; $91F1
    LDA #$00                   ; $91F4
    STA $0626                  ; $91F6
    STA $0627                  ; $91F9
    .byte $A9,$01
    JSR $C515                  ; $91FE
    LDA a: $001C               ; $9201
    AND #$03                   ; $9204
    BEQ $9234                  ; $9206
    LSR                        ; $9208
    LDA #$0C                   ; $9209
    BCS $920F                  ; $920B
    LDA #$F4                   ; $920D
    CLC                        ; $920F
    ADC $0626                  ; $9210
    TAX                        ; $9213
    BPL $921B                  ; $9214
    EOR #$FF                   ; $9216
    CLC                        ; $9218
    ADC #$01                   ; $9219
    CMP #$3C                   ; $921B
    BCC $9222                  ; $921D
    LDX $0626                  ; $921F
    TXA                        ; $9222
    CLC                        ; $9223
    ADC $061E                  ; $9224
    CMP #$F0                   ; $9227
    BCC $922E                  ; $9229
    LDX $0626                  ; $922B
    STX $0626                  ; $922E
    JMP $925F                  ; $9231
    LDA a: $001C               ; $9234
    AND #$0C                   ; $9237
    BEQ $9280                  ; $9239
    LSR                        ; $923B
    LSR                        ; $923C
    LSR                        ; $923D
    LDA #$01                   ; $923E
    BCS $9244                  ; $9240
    LDA #$FF                   ; $9242
    BIT $0637                  ; $9244
    BPL $924E                  ; $9247
    EOR #$FF                   ; $9249
    CLC                        ; $924B
    ADC #$01                   ; $924C
    CLC                        ; $924E
    ADC $0627                  ; $924F
    BPL $9256                  ; $9252
    LDA #$00                   ; $9254
    CMP #$05                   ; $9256
    BCC $925C                  ; $9258
    LDA #$04                   ; $925A
    STA $0627                  ; $925C
    .byte $AD,$1E,$06
    CLC                        ; $9262
    ADC $0626                  ; $9263
    STA $0624                  ; $9266
    LDA $0627                  ; $9269
    BIT $0637                  ; $926C
    BPL $9276                  ; $926F
    EOR #$FF                   ; $9271
    CLC                        ; $9273
    ADC #$01                   ; $9274
    CLC                        ; $9276
    ADC $0624                  ; $9277
    STA $0624                  ; $927A
    JSR $C63F                  ; $927D
    LDA #$80                   ; $9280
    AND a: $001E               ; $9282
    BNE $928A                  ; $9285
    JMP $91FC                  ; $9287
    JSR $C642                  ; $928A
    BCS $9292                  ; $928D
    JMP $91FC                  ; $928F
    LDA #$00                   ; $9292
    STA $062D                  ; $9294
    RTS                        ; $9297
    .byte $A9,$0C
    STA $003A                  ; $929A
    LDA $003A                  ; $929C
    JSR $C50C                  ; $929E
    LDY #$06                   ; $92A1
    LDA ($0034),Y              ; $92A3
    SEC                        ; $92A5
    SBC $0635                  ; $92A6
    BCS $92AF                  ; $92A9
    EOR #$FF                   ; $92AB
    ADC #$01                   ; $92AD
    CMP #$20                   ; $92AF
    BCS $92C5                  ; $92B1
    LDY #$08                   ; $92B3
    LDA ($0034),Y              ; $92B5
    SEC                        ; $92B7
    SBC $0637                  ; $92B8
    BCS $92C1                  ; $92BB
    EOR #$FF                   ; $92BD
    ADC #$01                   ; $92BF
    CMP #$20                   ; $92C1
    BCC $92E4                  ; $92C3
    INC $003A                  ; $92C5
    LDA $003A                  ; $92C7
    CMP #$16                   ; $92C9
    BNE $929C                  ; $92CB
    .byte $A9,$14,$85,$3A,$20,$0C,$C5,$AD,$1E,$06,$20,$36,$C5,$98,$A0,$08
    .byte $91,$34,$8A,$A0,$06,$91,$34
    LDA $003A                  ; $92E4
    STA $05FC                  ; $92E6
    RTS                        ; $92E9
    .byte $01,$05,$02,$07,$A9,$24
    JSR $C54E                  ; $92F0
    LDA #$00                   ; $92F3
    STA $044E                  ; $92F5
    JSR $987B                  ; $92F8
    LDX #$06                   ; $92FB
    BIT $0637                  ; $92FD
    BPL $9303                  ; $9300
    INX                        ; $9302
    STX $061E                  ; $9303
    LDA $05FB                  ; $9306
    BEQ $9313                  ; $9309
    LDA #$09                   ; $930B
    JSR $C54B                  ; $930D
    JMP $9318                  ; $9310
    LDA #$2E                   ; $9313
    JSR $9E5A                  ; $9315
    .byte $AD,$1E,$06
    JSR $9E0D                  ; $931B
    JSR $9C0F                  ; $931E
    BCS $9328                  ; $9321
    LDA $05FB                  ; $9323
    BEQ $9313                  ; $9326
    LDA $05FB                  ; $9328
    BNE $9335                  ; $932B
    LDA #$04                   ; $932D
    STA $0621                  ; $932F
    JSR $C600                  ; $9332
    JSR $8F72                  ; $9335
    LDA #$01                   ; $9338
    LDX #$12                   ; $933A
    JSR $9110                  ; $933C
    JSR $85F6                  ; $933F
    LDA $043B                  ; $9342
    JSR $C509                  ; $9345
    .byte $4C,$93,$59,$93,$A9,$25
    JSR $C54E                  ; $934E
    LDA #$66                   ; $9351
    STA $061A                  ; $9353
    JMP $C61B                  ; $9356
    .byte $A9,$26
    JSR $C54E                  ; $935B
    LDA #$4D                   ; $935E
    STA $061A                  ; $9360
    JMP $C615                  ; $9363
    .byte $A9,$00
    STA $044E                  ; $9368
    JSR $8B9C                  ; $936B
    BCC $9379                  ; $936E
    TXA                        ; $9370
    EOR $05FB                  ; $9371
    BEQ $9379                  ; $9374
    JMP $94CF                  ; $9376
    LDA #$2B                   ; $9379
    JSR $C54E                  ; $937B
    JSR $987B                  ; $937E
    LDA $0635                  ; $9381
    LDX $05FB                  ; $9384
    BEQ $938E                  ; $9387
    EOR #$FF                   ; $9389
    CLC                        ; $938B
    ADC #$01                   ; $938C
    CMP #$A0                   ; $938E
    BCC $9395                  ; $9390
    JMP $93E4                  ; $9392
    .byte $AD,$FB,$05
    BEQ $93BC                  ; $9398
    LDA a: $00E2               ; $939A
    AND #$0F                   ; $939D
    CMP #$0A                   ; $939F
    BCC $93A6                  ; $93A1
    SEC                        ; $93A3
    SBC #$0A                   ; $93A4
    SEC                        ; $93A6
    ADC #$0B                   ; $93A7
    CMP $0441                  ; $93A9
    BNE $93B7                  ; $93AC
    CLC                        ; $93AE
    ADC #$01                   ; $93AF
    CMP #$16                   ; $93B1
    BCC $93B7                  ; $93B3
    LDA #$0C                   ; $93B5
    STA $05FC                  ; $93B7
    BNE $93BF                  ; $93BA
    JSR $93DE                  ; $93BC
    LDA #$01                   ; $93BF
    STA $043B                  ; $93C1
    LDA #$00                   ; $93C4
    STA $043C                  ; $93C6
    LDA #$18                   ; $93C9
    JSR $C54E                  ; $93CB
    LDA #$04                   ; $93CE
    LDX #$12                   ; $93D0
    JSR $9110                  ; $93D2
    JSR $85F6                  ; $93D5
    LDX #$50                   ; $93D8
    TXS                        ; $93DA
    JMP $C612                  ; $93DB
    JSR $C648                  ; $93DE
    JMP $93DE                  ; $93E1
    .byte $AA
    LDA $0637                  ; $93E5
    LDY $05FB                  ; $93E8
    BEQ $93EF                  ; $93EB
    EOR #$FF                   ; $93ED
    TAY                        ; $93EF
    JSR $C539                  ; $93F0
    STA $003B                  ; $93F3
    LDA #$00                   ; $93F5
    PHA                        ; $93F7
    ASL                        ; $93F8
    TAX                        ; $93F9
    LDA $9FB9,X                ; $93FA
    STA $003C                  ; $93FD
    LDA $9FBA,X                ; $93FF
    STA $003D                  ; $9402
    LDY #$00                   ; $9404
    LDA ($003C),Y              ; $9406
    CMP #$FF                   ; $9408
    BEQ $9413                  ; $940A
    CMP $003B                  ; $940C
    BEQ $9420                  ; $940E
    INY                        ; $9410
    BNE $9406                  ; $9411
    PLA                        ; $9413
    CLC                        ; $9414
    ADC #$01                   ; $9415
    CMP #$05                   ; $9417
    BNE $941E                  ; $9419
    JMP $9395                  ; $941B
    BNE $93F7                  ; $941E
    PLA                        ; $9420
    STA $0612                  ; $9421
    LDA #$27                   ; $9424
    JSR $9E5A                  ; $9426
    LDA $0612                  ; $9429
    JSR $9E0D                  ; $942C
    JSR $9C0F                  ; $942F
    BCC $9424                  ; $9432
    LDA $05FB                  ; $9434
    BNE $9441                  ; $9437
    LDA #$04                   ; $9439
    STA $0621                  ; $943B
    JSR $C600                  ; $943E
    JSR $9470                  ; $9441
    BCC $9434                  ; $9444
    LDA #$0E                   ; $9446
    JSR $C54B                  ; $9448
    LDA #$18                   ; $944B
    LDX $043B                  ; $944D
    CPX #$01                   ; $9450
    BEQ $9456                  ; $9452
    LDA #$1D                   ; $9454
    JSR $C54E                  ; $9456
    LDA #$04                   ; $9459
    LDX #$12                   ; $945B
    JSR $9110                  ; $945D
    JSR $85F6                  ; $9460
    LDA $043B                  ; $9463
    CMP #$01                   ; $9466
    BNE $946D                  ; $9468
    JMP $C612                  ; $946A
    JMP $8AB0                  ; $946D
    LDX #$03                   ; $9470
    LDA $05FB                  ; $9472
    BNE $9481                  ; $9475
    DEX                        ; $9477
    LDA $043B                  ; $9478
    CMP #$00                   ; $947B
    BEQ $9481                  ; $947D
    SEC                        ; $947F
    RTS                        ; $9480
    STX $0612                  ; $9481
    TXA                        ; $9484
    CLC                        ; $9485
    ADC #$28                   ; $9486
    JSR $C52A                  ; $9488
    LDA $05FB                  ; $948B
    BNE $9495                  ; $948E
    LDA #$03                   ; $9490
    JSR $C52A                  ; $9492
    LDA $0612                  ; $9495
    JSR $9D1B                  ; $9498
    LDA #$01                   ; $949B
    JSR $C515                  ; $949D
    LDA #$0C                   ; $94A0
    AND a: $001E               ; $94A2
    BEQ $94B2                  ; $94A5
    LDA $0612                  ; $94A7
    EOR #$40                   ; $94AA
    STA $0612                  ; $94AC
    JSR $9D1B                  ; $94AF
    LDA #$40                   ; $94B2
    AND a: $001E               ; $94B4
    BEQ $94BB                  ; $94B7
    CLC                        ; $94B9
    RTS                        ; $94BA
    LDA #$80                   ; $94BB
    AND a: $001E               ; $94BD
    BEQ $949B                  ; $94C0
    LDX #$00                   ; $94C2
    BIT $0612                  ; $94C4
    BVC $94CA                  ; $94C7
    INX                        ; $94C9
    STX $0612                  ; $94CA
    SEC                        ; $94CD
    RTS                        ; $94CE
    .byte $A9,$1F
    JSR $C54E                  ; $94D1
    JSR $987B                  ; $94D4
    LDA #$2F                   ; $94D7
    JSR $9E5A                  ; $94D9
    LDA #$20                   ; $94DC
    JSR $C54E                  ; $94DE
    LDA #$05                   ; $94E1
    JSR $9E0D                  ; $94E3
    JSR $C645                  ; $94E6
    JSR $9509                  ; $94E9
    LDA #$21                   ; $94EC
    JSR $C54E                  ; $94EE
    LDA #$05                   ; $94F1
    LDX #$00                   ; $94F3
    JSR $9110                  ; $94F5
    LDA #$01                   ; $94F8
