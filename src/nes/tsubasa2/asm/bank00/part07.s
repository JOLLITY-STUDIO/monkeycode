    BEQ $9A0C                  ; $99F4
    TAX                        ; $99F6
    BEQ $99FB                  ; $99F7
    DEC $004A                  ; $99F9
    LDA $004B                  ; $99FB
    BEQ $9A01                  ; $99FD
    DEC $004B                  ; $99FF
    JSR $9A71                  ; $9A01
    LDA #$01                   ; $9A04
    JSR $9FA8                  ; $9A06
    JMP $99F0                  ; $9A09
    RTS                        ; $9A0C
    .byte $A5,$4A
    BEQ $9A1E                  ; $9A0F
    DEC $004A                  ; $9A11
    JSR $9A71                  ; $9A13
    LDA #$01                   ; $9A16
    JSR $9FA8                  ; $9A18
    JMP $9A0D                  ; $9A1B
    RTS                        ; $9A1E
    .byte $A5,$4B
    BEQ $9A30                  ; $9A21
    DEC $004B                  ; $9A23
    JSR $9A71                  ; $9A25
    LDA #$01                   ; $9A28
    JSR $9FA8                  ; $9A2A
    JMP $9A1F                  ; $9A2D
    RTS                        ; $9A30
    STA $0048                  ; $9A31
    STX $0049                  ; $9A33
    JSR $9B07                  ; $9A35
    JSR $9AB8                  ; $9A38
    JSR $9ADA                  ; $9A3B
    LDX $00E9                  ; $9A3E
    JSR $C4B9                  ; $9A40
    LDA #$0F                   ; $9A43
    STA $004A                  ; $9A45
    STA $004B                  ; $9A47
    JMP $9A71                  ; $9A49
    STA $0048                  ; $9A4C
    JSR $9B07                  ; $9A4E
    JSR $9AB8                  ; $9A51
    LDX $00E9                  ; $9A54
    JSR $C4B9                  ; $9A56
    LDA #$0F                   ; $9A59
    STA $004A                  ; $9A5B
    JMP $9A71                  ; $9A5D
    STA $0049                  ; $9A60
    JSR $9B07                  ; $9A62
    JSR $9ADA                  ; $9A65
    LDX $00E9                  ; $9A68
    JSR $C4B9                  ; $9A6A
    LDA #$0F                   ; $9A6D
    STA $004B                  ; $9A6F
    .byte $A9,$20
    LDY #$00                   ; $9A73
    LDX #$3F                   ; $9A75
    JSR $9B28                  ; $9A77
    STX $00E7                  ; $9A7A
    LDY #$00                   ; $9A7C
    LDA $062A,Y                ; $9A7E
    AND #$30                   ; $9A81
    CLC                        ; $9A83
    ADC $004A                  ; $9A84
    JSR $9AA2                  ; $9A86
    CPY #$10                   ; $9A89
    BNE $9A7E                  ; $9A8B
    LDA $062A,Y                ; $9A8D
    AND #$30                   ; $9A90
    CLC                        ; $9A92
    ADC $004B                  ; $9A93
    JSR $9AA2                  ; $9A95
    CPY #$20                   ; $9A98
    BNE $9A8D                  ; $9A9A
    LDX $00E7                  ; $9A9C
    JSR $9B5E                  ; $9A9E
    RTS                        ; $9AA1
    TAX                        ; $9AA2
    LDA $9EA2,X                ; $9AA3
    STA $00E6                  ; $9AA6
    LDA $062A,Y                ; $9AA8
    AND #$0F                   ; $9AAB
    ORA $00E6                  ; $9AAD
    LDX $00E7                  ; $9AAF
    STA $05E8,X                ; $9AB1
    INC $00E7                  ; $9AB4
    INY                        ; $9AB6
    RTS                        ; $9AB7
    LDA #$00                   ; $9AB8
    STA $00E7                  ; $9ABA
    LDA $0048                  ; $9ABC
    ASL                        ; $9ABE
    ROL $00E7                  ; $9ABF
    ASL                        ; $9AC1
    ROL $00E7                  ; $9AC2
    ASL                        ; $9AC4
    ROL $00E7                  ; $9AC5
    ASL                        ; $9AC7
    ROL $00E7                  ; $9AC8
    CLC                        ; $9ACA
    ADC #$00                   ; $9ACB
    STA $00E6                  ; $9ACD
    LDA $00E7                  ; $9ACF
    ADC #$B0                   ; $9AD1
    STA $00E7                  ; $9AD3
    LDX #$00                   ; $9AD5
    JMP $9AF9                  ; $9AD7
    LDA #$00                   ; $9ADA
    STA $00E7                  ; $9ADC
    LDA $0049                  ; $9ADE
    ASL                        ; $9AE0
    ROL $00E7                  ; $9AE1
    ASL                        ; $9AE3
    ROL $00E7                  ; $9AE4
    ASL                        ; $9AE6
    ROL $00E7                  ; $9AE7
    ASL                        ; $9AE9
    ROL $00E7                  ; $9AEA
    CLC                        ; $9AEC
    ADC #$00                   ; $9AED
    STA $00E6                  ; $9AEF
    LDA $00E7                  ; $9AF1
    ADC #$B3                   ; $9AF3
    STA $00E7                  ; $9AF5
    LDX #$10                   ; $9AF7
    .byte $A0,$00
    LDA ($00E6),Y              ; $9AFB
    STA $062A,X                ; $9AFD
    INX                        ; $9B00
    INY                        ; $9B01
    CPY #$10                   ; $9B02
    BNE $9AFB                  ; $9B04
    RTS                        ; $9B06
    LDA $0025                  ; $9B07
    STA $00E9                  ; $9B09
    LDX #$06                   ; $9B0B
    JSR $C4B9                  ; $9B0D
    RTS                        ; $9B10
    LDA #$00                   ; $9B11
    STA $0048                  ; $9B13
    STA $0049                  ; $9B15
    STA $004A                  ; $9B17
    STA $004B                  ; $9B19
    LDA #$0F                   ; $9B1B
    LDY #$E0                   ; $9B1D
    STA $054A,Y                ; $9B1F
    INY                        ; $9B22
    BNE $9B1F                  ; $9B23
    JMP $9A71                  ; $9B25
    .byte $48
    BIT $0629                  ; $9B29
    BVC $9B37                  ; $9B2C
    LDA #$01                   ; $9B2E
    JSR $9FA8                  ; $9B30
    PLA                        ; $9B33
    JMP $9B28                  ; $9B34
    AND #$3F                   ; $9B37
    CLC                        ; $9B39
    ADC $0628                  ; $9B3A
    CMP #$3D                   ; $9B3D
    BCS $9B2E                  ; $9B3F
    PLA                        ; $9B41
    ORA #$40                   ; $9B42
    STA $0629                  ; $9B44
    TXA                        ; $9B47
    LDX $0628                  ; $9B48
    STA $05EA,X                ; $9B4B
    TYA                        ; $9B4E
    STA $05E9,X                ; $9B4F
    LDA $0629                  ; $9B52
    AND #$BF                   ; $9B55
    STA $05E8,X                ; $9B57
    INX                        ; $9B5A
    INX                        ; $9B5B
    INX                        ; $9B5C
    RTS                        ; $9B5D
    .byte $A9,$00
    STA $05E8,X                ; $9B60
    STX $0628                  ; $9B63
    LDA $0629                  ; $9B66
    AND #$BF                   ; $9B69
    STA $0629                  ; $9B6B
    RTS                        ; $9B6E
    STX $009E                  ; $9B6F
    STY $009F                  ; $9B71
    RTS                        ; $9B73
    STX $00A0                  ; $9B74
    STY $00A1                  ; $9B76
    LDA $009E                  ; $9B78
    ORA #$80                   ; $9B7A
    STA $009E                  ; $9B7C
    RTS                        ; $9B7E
    .byte $A2,$00
    LDA #$F8                   ; $9B81
    STA $0468,X                ; $9B83
    INX                        ; $9B86
    BNE $9B83                  ; $9B87
    LDA #$F8                   ; $9B89
    STA $0200,X                ; $9B8B
    INX                        ; $9B8E
    BNE $9B8B                  ; $9B8F
    LDA #$00                   ; $9B91
    STA $0568                  ; $9B93
    STA $0588                  ; $9B96
    STA $05A8                  ; $9B99
    STA $05C8                  ; $9B9C
    RTS                        ; $9B9F
    JSR $99F0                  ; $9BA0
    JSR $98A0                  ; $9BA3
    JMP $9B7F                  ; $9BA6
    STA $0046                  ; $9BA9
    TAY                        ; $9BAB
    BMI $9BBC                  ; $9BAC
    CLC                        ; $9BAE
    ADC $0044                  ; $9BAF
    CMP #$F0                   ; $9BB1
    BCC $9BB9                  ; $9BB3
    ADC #$0F                   ; $9BB5
    INC $0045                  ; $9BB7
    STA $0044                  ; $9BB9
    RTS                        ; $9BBB
    CLC                        ; $9BBC
    ADC $0044                  ; $9BBD
    CMP #$F0                   ; $9BBF
    BCC $9BC7                  ; $9BC1
    SBC #$10                   ; $9BC3
    DEC $0045                  ; $9BC5
    STA $0044                  ; $9BC7
    RTS                        ; $9BC9
    STA $0047                  ; $9BCA
    PHA                        ; $9BCC
    CLC                        ; $9BCD
    ADC $007A                  ; $9BCE
    STA $007A                  ; $9BD0
    PLA                        ; $9BD2
    BMI $9BDC                  ; $9BD3
    LDA $007B                  ; $9BD5
    ADC #$00                   ; $9BD7
    JMP $9BE0                  ; $9BD9
    LDA $007B                  ; $9BDC
    SBC #$00                   ; $9BDE
    .byte $85,$7B
    RTS                        ; $9BE2
    STX $00E7                  ; $9BE3
    STY $00E6                  ; $9BE5
    TAY                        ; $9BE7
    LDA #$01                   ; $9BE8
    JSR $9FA8                  ; $9BEA
    LDA $001E                  ; $9BED
    JSR $9CE7                  ; $9BEF
    LDA $001E                  ; $9BF2
    AND #$90                   ; $9BF4
    BPL $9BE8                  ; $9BF6
    LDA $0468,Y                ; $9BF8
    TAX                        ; $9BFB
    SEC                        ; $9BFC
    SBC $00E7                  ; $9BFD
    LSR                        ; $9BFF
    LSR                        ; $9C00
    LSR                        ; $9C01
    STA $00E7                  ; $9C02
    LDA #$F8                   ; $9C04
    STA $0468,Y                ; $9C06
    LDA $00E7                  ; $9C09
    CLC                        ; $9C0B
    RTS                        ; $9C0C
    LDA #$01                   ; $9C0D
    JSR $9FA8                  ; $9C0F
    LDA $001E                  ; $9C12
    JSR $9CE7                  ; $9C14
    LDA $001E                  ; $9C17
    AND #$90                   ; $9C19
    BNE $9BF8                  ; $9C1B
    BIT $001E                  ; $9C1D
    BVC $9C0D                  ; $9C1F
    LDA #$F8                   ; $9C21
    STA $0468,Y                ; $9C23
    SEC                        ; $9C26
    RTS                        ; $9C27
    .byte $84,$E6
    STX $00E7                  ; $9C2A
    TAY                        ; $9C2C
    LDA ($00E6),Y              ; $9C2D
    TAX                        ; $9C2F
    INY                        ; $9C30
    LDA ($00E6),Y              ; $9C31
    STA $00E7                  ; $9C33
    STX $00E6                  ; $9C35
    JMP ($00E6)                ; $9C37
    LDA #$00                   ; $9C3A
    STA $00E9                  ; $9C3C
    STY $00E6                  ; $9C3E
    STX $00E7                  ; $9C40
    LDY #$00                   ; $9C42
    LDA ($00E6),Y              ; $9C44
    TAX                        ; $9C46
    INY                        ; $9C47
    LDA ($00E6),Y              ; $9C48
    STA $00E8                  ; $9C4A
    CMP $00E9                  ; $9C4C
    BNE $9C53                  ; $9C4E
    CLC                        ; $9C50
    ADC #$10                   ; $9C51
    STA $0468,X                ; $9C53
    INX                        ; $9C56
    INY                        ; $9C57
    LDA ($00E6),Y              ; $9C58
    STA $0468,X                ; $9C5A
    INX                        ; $9C5D
    INY                        ; $9C5E
    CPY #$05                   ; $9C5F
    BNE $9C58                  ; $9C61
    LDA ($00E6),Y              ; $9C63
    STA $00E6                  ; $9C65
    TXA                        ; $9C67
    SEC                        ; $9C68
    SBC #$04                   ; $9C69
    TAY                        ; $9C6B
    LDA $00E8                  ; $9C6C
    STA $00E7                  ; $9C6E
    RTS                        ; $9C70
    LDA #$10                   ; $9C71
    .byte $85,$E8
    LDA $001C                  ; $9C75
    JSR $9CE7                  ; $9C77
    BCC $9CC8                  ; $9C7A
    LDX $00E9                  ; $9C7C
    CPX #$FF                   ; $9C7E
    BEQ $9C89                  ; $9C80
    CMP $00E9                  ; $9C82
    BEQ $9C75                  ; $9C84
    JMP $9CB3                  ; $9C86
    CMP $00EB                  ; $9C89
    BEQ $9C75                  ; $9C8B
    LDA $055C                  ; $9C8D
    CMP #$B8                   ; $9C90
    BCC $9C97                  ; $9C92
    SEC                        ; $9C94
    SBC #$10                   ; $9C95
    TAY                        ; $9C97
    LDX $055F                  ; $9C98
    JSR $9D08                  ; $9C9B
    LDY #$00                   ; $9C9E
    LDA ($0034),Y              ; $9CA0
    LDY #$F4                   ; $9CA2
    CMP $0451                  ; $9CA4
    BEQ $9C75                  ; $9CA7
    CMP $0452                  ; $9CA9
    BEQ $9C75                  ; $9CAC
    CMP $0453                  ; $9CAE
    BEQ $9C75                  ; $9CB1
    .byte $A9,$01
    JSR $9FA8                  ; $9CB5
    LDX $001C                  ; $9CB8
    LDA $9EE2,X                ; $9CBA
    BEQ $9CC8                  ; $9CBD
    DEC $00E8                  ; $9CBF
    BNE $9CB3                  ; $9CC1
    LDA #$08                   ; $9CC3
    JMP $9C73                  ; $9CC5
    RTS                        ; $9CC8
    LDA #$00                   ; $9CC9
    JSR $9CD3                  ; $9CCB
    JSR $9C71                  ; $9CCE
    LDA #$02                   ; $9CD1
    LDX $046B,Y                ; $9CD3
    BMI $9CE6                  ; $9CD6
    PHA                        ; $9CD8
    LDA $0468,Y                ; $9CD9
    SEC                        ; $9CDC
    SBC $00E7                  ; $9CDD
    LSR                        ; $9CDF
    LSR                        ; $9CE0
    TAX                        ; $9CE1
    PLA                        ; $9CE2
    STA $046A,X                ; $9CE3
    RTS                        ; $9CE6
    AND #$0F                   ; $9CE7
    TAX                        ; $9CE9
    LDA $9EE2,X                ; $9CEA
    BEQ $9D06                  ; $9CED
    CLC                        ; $9CEF
    ADC $0468,Y                ; $9CF0
    CMP $00E7                  ; $9CF3
    BCS $9CF9                  ; $9CF5
    LDA $00E6                  ; $9CF7
    CMP $00E6                  ; $9CF9
    BEQ $9D01                  ; $9CFB
    BCC $9D01                  ; $9CFD
    LDA $00E7                  ; $9CFF
    STA $0468,Y                ; $9D01
    SEC                        ; $9D04
    RTS                        ; $9D05
    CLC                        ; $9D06
    RTS                        ; $9D07
    TXA                        ; $9D08
    BMI $9D1A                  ; $9D09
    TYA                        ; $9D0B
    EOR #$FF                   ; $9D0C
    SEC                        ; $9D0E
    SBC #$28                   ; $9D0F
    LSR                        ; $9D11
    LSR                        ; $9D12
    LSR                        ; $9D13
    LSR                        ; $9D14
    STA $00ED                  ; $9D15
    JMP $C50C                  ; $9D17
    TYA                        ; $9D1A
    LSR                        ; $9D1B
    LSR                        ; $9D1C
    LSR                        ; $9D1D
    LSR                        ; $9D1E
    CLC                        ; $9D1F
    ADC #$14                   ; $9D20
    STA $00ED                  ; $9D22
    JMP $C50C                  ; $9D24
    STY $00E6                  ; $9D27
    STX $00E7                  ; $9D29
    LDY #$00                   ; $9D2B
    LDA ($00E6),Y              ; $9D2D
    STA $00E8                  ; $9D2F
    INY                        ; $9D31
    LDA ($00E6),Y              ; $9D32
    STA $00E9                  ; $9D34
    STY $00EB                  ; $9D36
    JSR $9D58                  ; $9D38
    TAX                        ; $9D3B
    INC $00EB                  ; $9D3C
    LDA $00EB                  ; $9D3E
    CLC                        ; $9D40
    ADC $00E6                  ; $9D41
    STA $00E6                  ; $9D43
    LDA $00E7                  ; $9D45
    ADC #$00                   ; $9D47
    STA $00E7                  ; $9D49
    CPX #$FF                   ; $9D4B
    BNE $9D2B                  ; $9D4D
    RTS                        ; $9D4F
    .byte $84,$E6
    STX $00E7                  ; $9D52
    LDA #$FF                   ; $9D54
    STA $00EB                  ; $9D56
    .byte $E6,$EB
    LDY $00EB                  ; $9D5A
    LDA ($00E6),Y              ; $9D5C
    CMP #$FC                   ; $9D5E
    BCS $9D72                  ; $9D60
    LDY $00E8                  ; $9D62
    LDX $00E9                  ; $9D64
    JSR $88CA                  ; $9D66
    INC $00E8                  ; $9D69
    BNE $9D6F                  ; $9D6B
    .byte $E6,$E9
    JMP $9D58                  ; $9D6F
    RTS                        ; $9D72
    STA $00E8                  ; $9D73
    JSR $9B28                  ; $9D75
    LDA $00E8                  ; $9D78
    AND #$3F                   ; $9D7A
    STA $00E8                  ; $9D7C
    LDY #$00                   ; $9D7E
    LDA ($00E6),Y              ; $9D80
    STA $05E8,X                ; $9D82
    INY                        ; $9D85
    INX                        ; $9D86
    DEC $00E8                  ; $9D87
    BNE $9D80                  ; $9D89
    JMP $9B5E                  ; $9D8B
    STA $00EC                  ; $9D8E
    LDA #$02                   ; $9D90
    JSR $9B28                  ; $9D92
    LDA $00EC                  ; $9D95
    LSR                        ; $9D97
    LSR                        ; $9D98
    LSR                        ; $9D99
    LSR                        ; $9D9A
    BNE $9D9F                  ; $9D9B
    LDA #$CD                   ; $9D9D
    CLC                        ; $9D9F
    ADC #$33                   ; $9DA0
    STA $05E8,X                ; $9DA2
    INX                        ; $9DA5
    LDA $00EC                  ; $9DA6
    AND #$0F                   ; $9DA8
    CLC                        ; $9DAA
    ADC #$33                   ; $9DAB
    STA $05E8,X                ; $9DAD
    INX                        ; $9DB0
    JSR $9B5E                  ; $9DB1
    RTS                        ; $9DB4
    LDA #$04                   ; $9DB5
    JSR $9B28                  ; $9DB7
    LDA #$00                   ; $9DBA
    STA $00E7                  ; $9DBC
    LDA $00ED                  ; $9DBE
    JSR $9DDA                  ; $9DC0
    LDA $00ED                  ; $9DC3
    JSR $9DDE                  ; $9DC5
    LDA $00EC                  ; $9DC8
    JSR $9DDA                  ; $9DCA
