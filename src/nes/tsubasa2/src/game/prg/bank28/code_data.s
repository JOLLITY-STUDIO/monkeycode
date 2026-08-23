; ============================================================
; code_data.s - bank28 inline data + routines
; ============================================================

    ROL $003D                  ; $8966
    ASL                        ; $8968
    ROL $003D                  ; $8969
    ADC #$2E                   ; $896B
    STA $003C                  ; $896D
    LDA $003D                  ; $896F
    ADC #$B7                   ; $8971
    STA $003D                  ; $8973
    LDA a: $00E2               ; $8975
    AND #$07                   ; $8978
    TAY                        ; $897A
    LDA ($003C),Y              ; $897B
    RTS                        ; $897D
    .byte $20,$B3,$89
    JMP $89A5                  ; $8981
    .byte $20,$B3,$89,$6E,$E2,$00
    JSR $8A20                  ; $898A
    JSR $89B3                  ; $898D
    JMP $89A5                  ; $8990
    .byte $20,$B3,$89
    JSR $89DA                  ; $8996
    JMP $8987                  ; $8999
    .byte $20,$DA,$89
    JSR $89B3                  ; $899F
    JMP $8987                  ; $89A2
    .byte $AE,$21,$06
    LDA $89AF,X                ; $89A8
    STA $043B                  ; $89AB
    RTS                        ; $89AE
    .byte $02,$04,$04,$02
    LDA $003C                  ; $89B3
    JSR $C50C                  ; $89B5
    LDY #$06                   ; $89B8
    LDA $0635                  ; $89BA
    SEC                        ; $89BD
    SBC ($0034),Y              ; $89BE
    BCS $89CA                  ; $89C0
    LDA $0635                  ; $89C2
    CMP #$60                   ; $89C5
    BCC $89CA                  ; $89C7
    RTS                        ; $89C9
    LDA $003C                  ; $89CA
    JSR $8A09                  ; $89CC
    LDA #$01                   ; $89CF
    STA $043B                  ; $89D1
    JSR $8A3F                  ; $89D4
    PLA                        ; $89D7
    PLA                        ; $89D8
    RTS                        ; $89D9
    LDA #$0C                   ; $89DA
    STA $003E                  ; $89DC
    LDA $003E                  ; $89DE
    CMP $0441                  ; $89E0
    BEQ $89F0                  ; $89E3
    JSR $C50C                  ; $89E5
    LDY #$06                   ; $89E8
    LDA ($0034),Y              ; $89EA
    CMP #$60                   ; $89EC
    BCC $89F9                  ; $89EE
    INC $003E                  ; $89F0
    LDA $003E                  ; $89F2
    CMP #$16                   ; $89F4
    BNE $89DE                  ; $89F6
    RTS                        ; $89F8
    LDA $003E                  ; $89F9
    JSR $8A09                  ; $89FB
    LDA #$01                   ; $89FE
    STA $043B                  ; $8A00
    JSR $8A3F                  ; $8A03
    PLA                        ; $8A06
    PLA                        ; $8A07
    RTS                        ; $8A08
    STA $05FC                  ; $8A09
    JSR $C50C                  ; $8A0C
    LDY #$06                   ; $8A0F
    LDA ($0034),Y              ; $8A11
    TAX                        ; $8A13
    LDY #$08                   ; $8A14
    LDA ($0034),Y              ; $8A16
    TAY                        ; $8A18
    JSR $C539                  ; $8A19
    STA $0638                  ; $8A1C
    RTS                        ; $8A1F
    LDA a: $00E2               ; $8A20
    ADC a: $00E3               ; $8A23
    AND #$0F                   ; $8A26
    CMP #$0A                   ; $8A28
    BCC $8A2E                  ; $8A2A
    SBC #$0A                   ; $8A2C
    CLC                        ; $8A2E
    ADC #$0C                   ; $8A2F
    CMP $0441                  ; $8A31
    BNE $8A3E                  ; $8A34
    ADC #$01                   ; $8A36
    CMP #$16                   ; $8A38
    BCC $8A3E                  ; $8A3A
    LDA #$0C                   ; $8A3C
    RTS                        ; $8A3E
    .byte $AD,$41,$04
    LDX $043B                  ; $8A42
    JSR $8C06                  ; $8A45
    LDA $0430                  ; $8A48
    BEQ $8A50                  ; $8A4B
    LDA $0431                  ; $8A4D
    STA $043C                  ; $8A50
    TAX                        ; $8A53
    BNE $8A61                  ; $8A54
    LDA $043B                  ; $8A56
    BNE $8A61                  ; $8A59
    LDA $044E                  ; $8A5B
    STA $043C                  ; $8A5E
    RTS                        ; $8A61
    PHA                        ; $8A62
    JSR $C50C                  ; $8A63
    LDY #$00                   ; $8A66
    LDA ($0034),Y              ; $8A68
    BNE $8A74                  ; $8A6A
    PLA                        ; $8A6C
    PHA                        ; $8A6D
    TAX                        ; $8A6E
    LDY $8A9D,X                ; $8A6F
    LDA ($0038),Y              ; $8A72
    TAX                        ; $8A74
    LDY #$01                   ; $8A75
    LDA ($0034),Y              ; $8A77
    BPL $8A7F                  ; $8A79
    INY                        ; $8A7B
    LDA ($0034),Y              ; $8A7C
    TAX                        ; $8A7E
    TXA                        ; $8A7F
    SEC                        ; $8A80
    SBC #$23                   ; $8A81
    LDX #$00                   ; $8A83
    STX $003B                  ; $8A85
    ASL                        ; $8A87
    ROL $003B                  ; $8A88
    ASL                        ; $8A8A
    ROL $003B                  ; $8A8B
    STA $003A                  ; $8A8D
    LDX $003B                  ; $8A8F
    ASL                        ; $8A91
    ROL $003B                  ; $8A92
    ADC $003A                  ; $8A94
    PHA                        ; $8A96
    TXA                        ; $8A97
    ADC $003B                  ; $8A98
    TAX                        ; $8A9A
    PLA                        ; $8A9B
    CLC                        ; $8A9C
    ADC #$62                   ; $8A9D
    STA $003A                  ; $8A9F
    TXA                        ; $8AA1
    ADC #$96                   ; $8AA2
    STA $003B                  ; $8AA4
    PLA                        ; $8AA6
    RTS                        ; $8AA7
    .byte $02,$03,$03,$03,$03,$04,$05,$04,$05,$04,$05
    LDA $0635                  ; $8AB3
    BPL $8ABA                  ; $8AB6
    EOR #$FF                   ; $8AB8
    TAX                        ; $8ABA
    LDA $0637                  ; $8ABB
    BPL $8AC2                  ; $8ABE
    EOR #$FF                   ; $8AC0
    TAY                        ; $8AC2
    JSR $C539                  ; $8AC3
    LDX #$00                   ; $8AC6
    CMP $8B9E,X                ; $8AC8
    BEQ $8AD1                  ; $8ACB
    INX                        ; $8ACD
    INX                        ; $8ACE
    BNE $8AC8                  ; $8ACF
    LDA $8B9F,X                ; $8AD1
    LDX $003C                  ; $8AD4
    CPX #$01                   ; $8AD6
    BEQ $8ADD                  ; $8AD8
    CLC                        ; $8ADA
    ADC #$0C                   ; $8ADB
    RTS                        ; $8ADD
    STA $003E                  ; $8ADE
    LDA $003C                  ; $8AE0
    STA $003F                  ; $8AE2
    TYA                        ; $8AE4
    CLC                        ; $8AE5
    ADC $003C                  ; $8AE6
    TAY                        ; $8AE8
    LDA ($003A),Y              ; $8AE9
    LDY #$00                   ; $8AEB
    STY $003D                  ; $8AED
    ASL                        ; $8AEF
    ROL $003D                  ; $8AF0
    ASL                        ; $8AF2
    ROL $003D                  ; $8AF3
    ASL                        ; $8AF5
    ROL $003D                  ; $8AF6
    ASL                        ; $8AF8
    ROL $003D                  ; $8AF9
    STA $003C                  ; $8AFB
    LDX $003D                  ; $8AFD
    ASL                        ; $8AFF
    ROL $003D                  ; $8B00
    ADC $003C                  ; $8B02
    STA $003C                  ; $8B04
    TXA                        ; $8B06
    ADC $003D                  ; $8B07
    TAX                        ; $8B09
    RTS                        ; $8B0A
    LDA a: $00E2               ; $8B0B
    AND #$07                   ; $8B0E
    LSR                        ; $8B10
    PHP                        ; $8B11
    CLC                        ; $8B12
    ADC $003E                  ; $8B13
    TAY                        ; $8B15
    LDA ($003C),Y              ; $8B16
    PLP                        ; $8B18
    BCS $8B1F                  ; $8B19
    LSR                        ; $8B1B
    LSR                        ; $8B1C
    LSR                        ; $8B1D
    LSR                        ; $8B1E
    AND #$0F                   ; $8B1F
    RTS                        ; $8B21
    .byte $A9,$0B
    PHA                        ; $8B24
    JSR $C50C                  ; $8B25
    LDY #$00                   ; $8B28
    LDA #$00                   ; $8B2A
    STA ($0034),Y              ; $8B2C
    INY                        ; $8B2E
    STA ($0034),Y              ; $8B2F
    PLA                        ; $8B31
    CLC                        ; $8B32
    ADC #$01                   ; $8B33
    CMP #$16                   ; $8B35
    BNE $8B24                  ; $8B37
    LDA a: $002B               ; $8B39
    SEC                        ; $8B3C
    SBC #$03                   ; $8B3D
    ASL                        ; $8B3F
    TAX                        ; $8B40
    LDA $BAB2,X                ; $8B41
    STA $0038                  ; $8B44
    LDA $BAB3,X                ; $8B46
    STA $0039                  ; $8B49
    LDY #$00                   ; $8B4B
    LDA ($0038),Y              ; $8B4D
    AND #$0F                   ; $8B4F
    STA a: $002E               ; $8B51
    LDA ($0038),Y              ; $8B54
    LSR                        ; $8B56
    LSR                        ; $8B57
    LSR                        ; $8B58
    LSR                        ; $8B59
    STA a: $002F               ; $8B5A
    LDY #$09                   ; $8B5D
    STY $003A                  ; $8B5F
    .byte $A4,$3A
    LDA ($0038),Y              ; $8B63
    CMP #$0F                   ; $8B65
    BEQ $8B7E                  ; $8B67
    CLC                        ; $8B69
    ADC #$0A                   ; $8B6A
    JSR $C50C                  ; $8B6C
    LDY $003A                  ; $8B6F
    INY                        ; $8B71
    LDA ($0038),Y              ; $8B72
    INY                        ; $8B74
    STY $003A                  ; $8B75
    LDY #$00                   ; $8B77
    STA ($0034),Y              ; $8B79
    JMP $8B61                  ; $8B7B
    LDX $0446                  ; $8B7E
    CPX #$05                   ; $8B81
    BEQ $8B90                  ; $8B83
    LDX #$00                   ; $8B85
    LDA $0384                  ; $8B87
    CMP #$26                   ; $8B8A
    BNE $8B90                  ; $8B8C
    INX                        ; $8B8E
    INX                        ; $8B8F
    STX $0446                  ; $8B90
    RTS                        ; $8B93
    .byte $03,$03,$03,$03,$04,$05,$04,$05,$04,$05,$02,$18,$03,$18,$0E,$18
    .byte $0F,$18,$1A,$1C,$1B,$1C,$1C,$1C,$1D,$1C,$26,$1C,$27,$1C,$28,$1C
    .byte $29,$1C,$04,$20,$05,$20,$10,$20,$11,$20,$00,$00,$0C,$00,$18,$00
    .byte $24,$00,$30,$00,$3C,$00,$01,$00,$0D,$00,$19,$00,$25,$00,$31,$00
    .byte $3D,$00,$02,$00,$0E,$00,$03,$00,$0F,$00,$32,$04,$3E,$04,$33,$04
    .byte $3F,$04,$34,$04,$40,$04,$35,$04,$41,$04,$1A,$08,$26,$08,$1B,$08
    .byte $27,$08,$1C,$08,$28,$08,$1D,$08,$29,$08,$04,$0C,$10,$0C,$05,$0C
    .byte $11,$0C,$E0,$04
    BCS $8C26                  ; $8C08
    LDY $044E                  ; $8C0A
    BEQ $8C13                  ; $8C0D
    CPX #$02                   ; $8C0F
    BCS $8C26                  ; $8C11
    JSR $8DC9                  ; $8C13
    LDA $0430                  ; $8C16
    ASL                        ; $8C19
    TAY                        ; $8C1A
    LDA ($0048),Y              ; $8C1B
    INY                        ; $8C1D
    CMP ($0048),Y              ; $8C1E
    BNE $8C2C                  ; $8C20
    CMP #$00                   ; $8C22
    BNE $8C2C                  ; $8C24
    LDA #$00                   ; $8C26
    STA $0430                  ; $8C28
    RTS                        ; $8C2B
    TAX                        ; $8C2C
    LDA ($0048),Y              ; $8C2D
    STA $0049                  ; $8C2F
    STX $0048                  ; $8C31
    LDA $0430                  ; $8C33
    LDX #$00                   ; $8C36
    STX $0430                  ; $8C38
    JSR $C509                  ; $8C3B
    .byte $46,$8C,$41,$8D,$4E,$8D,$55,$8D,$A9,$00
    STA $0046                  ; $8C48
    LDY $0046                  ; $8C4A
    LDA ($0048),Y              ; $8C4C
    LSR                        ; $8C4E
    LSR                        ; $8C4F
    STA $0047                  ; $8C50
    LDA ($0048),Y              ; $8C52
    AND #$03                   ; $8C54
    CMP #$03                   ; $8C56
    BEQ $8C7E                  ; $8C58
    CMP $044E                  ; $8C5A
    BNE $8C62                  ; $8C5D
    JSR $8C7F                  ; $8C5F
    INC $0046                  ; $8C62
    LDA $0047                  ; $8C64
    CMP #$08                   ; $8C66
    BEQ $8C7A                  ; $8C68
    CMP #$09                   ; $8C6A
    BEQ $8C7A                  ; $8C6C
    CMP #$0A                   ; $8C6E
    BEQ $8C7A                  ; $8C70
    CMP #$11                   ; $8C72
    BEQ $8C7A                  ; $8C74
    CMP #$13                   ; $8C76
    BNE $8C4A                  ; $8C78
    INC $0046                  ; $8C7A
    BNE $8C4A                  ; $8C7C
    RTS                        ; $8C7E
    LDA $0047                  ; $8C7F
    SEC                        ; $8C81
    SBC #$03                   ; $8C82
    JSR $C509                  ; $8C84
    .byte $C7,$8C,$CC,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$D4,$8C,$D4,$8C,$FA,$8C
    .byte $C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$21,$8D,$2A,$8D
    .byte $D4,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C
    .byte $C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C
    .byte $A5,$47
    JMP $8E11                  ; $8CC9
    .byte $AD,$46,$04
    CMP #$05                   ; $8CCF
    BEQ $8CC7                  ; $8CD1
    RTS                        ; $8CD3
    .byte $A4,$46
    INY                        ; $8CD6
    LDA ($0048),Y              ; $8CD7
    CMP #$FF                   ; $8CD9
    BEQ $8CF7                  ; $8CDB
    STA $0045                  ; $8CDD
    LDA #$01                   ; $8CDF
    PHA                        ; $8CE1
    JSR $C50C                  ; $8CE2
    LDY #$00                   ; $8CE5
    LDA ($0034),Y              ; $8CE7
    CMP $0045                  ; $8CE9
    BEQ $8CF6                  ; $8CEB
    PLA                        ; $8CED
    CLC                        ; $8CEE
    ADC #$01                   ; $8CEF
    CMP #$0B                   ; $8CF1
    BNE $8CE1                  ; $8CF3
    RTS                        ; $8CF5
    PLA                        ; $8CF6
    JMP $8CC7                  ; $8CF7
    .byte $A4,$46
    INY                        ; $8CFC
    LDA ($0048),Y              ; $8CFD
    CMP #$FF                   ; $8CFF
    BNE $8D06                  ; $8D01
    JMP $8CC7                  ; $8D03
    LDA #$01                   ; $8D06
    PHA                        ; $8D08
    JSR $C50C                  ; $8D09
    LDY #$00                   ; $8D0C
    LDA ($0034),Y              ; $8D0E
    CMP #$1C                   ; $8D10
    BEQ $8D1D                  ; $8D12
    PLA                        ; $8D14
    CLC                        ; $8D15
    ADC #$01                   ; $8D16
    CMP #$0B                   ; $8D18
    BNE $8D08                  ; $8D1A
    RTS                        ; $8D1C
    PLA                        ; $8D1D
    JMP $8CD4                  ; $8D1E
    .byte $2C,$49,$04
    BPL $8D29                  ; $8D24
    JMP $8CD4                  ; $8D26
    RTS                        ; $8D29
    .byte $AD,$21,$06
    CMP #$04                   ; $8D2D
    BEQ $8D3D                  ; $8D2F
    LDA a: $002B               ; $8D31
    CMP #$21                   ; $8D34
    BCS $8D3E                  ; $8D36
    LDA $0448                  ; $8D38
    BNE $8D3E                  ; $8D3B
    RTS                        ; $8D3D
    JMP $8CC7                  ; $8D3E
    .byte $AD,$4E,$04
    BNE $8D4D                  ; $8D44
    LDY #$00                   ; $8D46
    LDA ($0048),Y              ; $8D48
    JMP $8E11                  ; $8D4A
    RTS                        ; $8D4D
    .byte $A0,$00
    LDA ($0048),Y              ; $8D50
    JMP $8E11                  ; $8D52
    .byte $4C,$E2,$8D,$A8
    BNE $8D5E                  ; $8D59
    JMP $8DA6                  ; $8D5B
    CMP #$0B                   ; $8D5E
    BNE $8D65                  ; $8D60
    .byte $4C,$A6,$8D
    CPX #$03                   ; $8D65
    BCS $8D88                  ; $8D67
    LDY $044E                  ; $8D69
    BEQ $8D72                  ; $8D6C
    CPX #$02                   ; $8D6E
    BNE $8D88                  ; $8D70
    JSR $8DC9                  ; $8D72
    LDA $0430                  ; $8D75
    CLC                        ; $8D78
    ADC #$04                   ; $8D79
    ASL                        ; $8D7B
    TAY                        ; $8D7C
    LDA ($0048),Y              ; $8D7D
    INY                        ; $8D7F
    CMP ($0048),Y              ; $8D80
    BNE $8D8E                  ; $8D82
    CMP #$00                   ; $8D84
    BNE $8D8E                  ; $8D86
    LDA #$00                   ; $8D88
    STA $0430                  ; $8D8A
    RTS                        ; $8D8D
    TAX                        ; $8D8E
    LDA ($0048),Y              ; $8D8F
    STA $0049                  ; $8D91
    STX $0048                  ; $8D93
    LDA $0430                  ; $8D95
    LDX #$00                   ; $8D98
    STX $0430                  ; $8D9A
    JSR $C509                  ; $8D9D
    .byte $E2,$8D,$E2,$8D,$E2,$8D,$E0,$00
    BNE $8DBA                  ; $8DA8
    JSR $8DC9                  ; $8DAA
    LDY #$00                   ; $8DAD
    LDA ($0048),Y              ; $8DAF
    INY                        ; $8DB1
    CMP ($0048),Y              ; $8DB2
    BNE $8DC0                  ; $8DB4
    CMP #$00                   ; $8DB6
    BNE $8DC0                  ; $8DB8
    LDA #$00                   ; $8DBA
    STA $0430                  ; $8DBC
    RTS                        ; $8DBF
    STA $0431                  ; $8DC0
    LDA #$01                   ; $8DC3
    STA $0430                  ; $8DC5
    RTS                        ; $8DC8
    STX $0430                  ; $8DC9
    STA $0047                  ; $8DCC
    JSR $C50C                  ; $8DCE
    LDY #$00                   ; $8DD1
    LDA ($0034),Y              ; $8DD3
    ASL                        ; $8DD5
    TAX                        ; $8DD6
    LDA $8E1B,X                ; $8DD7
    STA $0048                  ; $8DDA
    LDA $8E1C,X                ; $8DDC
    STA $0049                  ; $8DDF
    RTS                        ; $8DE1
    .byte $A0,$00
    LDA ($0048),Y              ; $8DE4
    BPL $8DED                  ; $8DE6
    AND #$7F                   ; $8DE8
    JMP $8E11                  ; $8DEA
    INY                        ; $8DED
    LDA ($0048),Y              ; $8DEE
    STA $0045                  ; $8DF0
    LDA #$01                   ; $8DF2
    PHA                        ; $8DF4
    JSR $C50C                  ; $8DF5
    LDY #$00                   ; $8DF8
    LDA ($0034),Y              ; $8DFA
    CMP $0045                  ; $8DFC
    BEQ $8E09                  ; $8DFE
    PLA                        ; $8E00
    CLC                        ; $8E01
    ADC #$01                   ; $8E02
    CMP #$0B                   ; $8E04
    BNE $8DF4                  ; $8E06
    RTS                        ; $8E08
    PLA                        ; $8E09
    LDY #$00                   ; $8E0A
    LDA ($0048),Y              ; $8E0C
    JMP $8E11                  ; $8E0E
    .byte $AE,$30,$04
    STA $0431,X                ; $8E14
    INC $0430                  ; $8E17
    RTS                        ; $8E1A
