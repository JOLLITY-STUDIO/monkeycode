; ============================================================
; code_data.s - bank24 inline data + routines
; ============================================================

    BCC $8949                  ; $8914
    LDX #$03                   ; $8916
    LDY #$06                   ; $8918
    LDA ($0050),Y              ; $891A
    SEC                        ; $891C
    SBC #$02                   ; $891D
    STA $003B                  ; $891F
    LDA $003A                  ; $8921
    LDY #$04                   ; $8923
    CLC                        ; $8925
    ADC ($0050),Y              ; $8926
    TAY                        ; $8928
    STX $0045                  ; $8929
    TXA                        ; $892B
    CLC                        ; $892C
    ADC $05C6                  ; $892D
    TAX                        ; $8930
    LDA $8D9E,X                ; $8931
    STA $04A8,Y                ; $8934
    LDA $8D9F,X                ; $8937
    INY                        ; $893A
    STA $04A8,Y                ; $893B
    INY                        ; $893E
    DEC $003B                  ; $893F
    BNE $893B                  ; $8941
    LDA $8DA0,X                ; $8943
    STA $04A8,Y                ; $8946
    LDY #$08                   ; $8949
    LDA ($0050),Y              ; $894B
    BEQ $8976                  ; $894D
    STA $003B                  ; $894F
    INY                        ; $8951
    LDA #$00                   ; $8952
    STA $003C                  ; $8954
    LDA ($0050),Y              ; $8956
    CMP $05C5                  ; $8958
    BEQ $8967                  ; $895B
    SEC                        ; $895D
    SBC #$01                   ; $895E
    INC $003C                  ; $8960
    CMP $05C5                  ; $8962
    BNE $896E                  ; $8965
    STY $0048                  ; $8967
    JSR $8986                  ; $8969
    LDY $0048                  ; $896C
    INY                        ; $896E
    INY                        ; $896F
    INY                        ; $8970
    INY                        ; $8971
    DEC $003B                  ; $8972
    BNE $8952                  ; $8974
    LDA #$80                   ; $8976
    STA $0515                  ; $8978
    LDA $05C5                  ; $897B
    INC $05C5                  ; $897E
    LDY #$03                   ; $8981
    CMP ($0050),Y              ; $8983
    RTS                        ; $8985
    INY                        ; $8986
    LDA ($0050),Y              ; $8987
    CLC                        ; $8989
    ADC $003A                  ; $898A
    STA $003D                  ; $898C
    INY                        ; $898E
    LDA ($0050),Y              ; $898F
    STA $003E                  ; $8991
    INY                        ; $8993
    LDA ($0050),Y              ; $8994
    STA $003F                  ; $8996
    LDA #$00                   ; $8998
    STA $0040                  ; $899A
    .byte $A4,$40
    INC $0040                  ; $899E
    LDA ($003E),Y              ; $89A0
    CMP #$E0                   ; $89A2
    BCC $89AC                  ; $89A4
    JSR $89B4                  ; $89A6
    JMP $899C                  ; $89A9
    JSR $C524                  ; $89AC
    JSR $8C9F                  ; $89AF
    BNE $899C                  ; $89B2
    SEC                        ; $89B4
    SBC #$E0                   ; $89B5
    JSR $C509                  ; $89B7
    .byte $FA,$89,$00,$8A,$06,$8A,$0C,$8A,$12,$8A,$86,$8A,$93,$8A,$AF,$8A
    .byte $B8,$8A,$C1,$8A,$C1,$8A,$D7,$8A,$DF,$8A,$E7,$8A,$2F,$8B,$48,$8B
    .byte $8B,$8B,$D5,$8B,$DE,$8B,$E4,$8B,$EA,$8B,$F0,$8B,$04,$8C,$47,$8C
    .byte $52,$8C,$52,$8C,$52,$8C,$52,$8C,$52,$8C,$55,$8C,$55,$8C,$55,$8C
    .byte $AD
    .byte $41,$04
    JMP $8CDC                  ; $89FD
    .byte $AD,$41,$04
    JMP $8CA5                  ; $8A03
    .byte $AD,$FC,$05
    JMP $8CDC                  ; $8A09
    .byte $AD,$FC,$05
    JMP $8CA5                  ; $8A0F
    .byte $AD,$3B,$04
    JSR $C509                  ; $8A15
    .byte $20,$8A,$34,$8A,$39,$8A,$3E,$8A,$A4,$40
    LDA ($003E),Y              ; $8A22
    BNE $8A2F                  ; $8A24
    LDA $044E                  ; $8A26
    CLC                        ; $8A29
    ADC #$9A                   ; $8A2A
    JMP $8A56                  ; $8A2C
    LDA #$9A                   ; $8A2F
    JMP $8A43                  ; $8A31
    .byte $A9,$C4
    JMP $8A43                  ; $8A36
    .byte $A9,$BD
    JMP $8A43                  ; $8A3B
    .byte $A9,$C8
    JMP $8A43                  ; $8A40
    .byte $AA
    LDY $0040                  ; $8A44
    INC $0040                  ; $8A46
    LDA ($003E),Y              ; $8A48
    BEQ $8A55                  ; $8A4A
    TAY                        ; $8A4C
    TXA                        ; $8A4D
    CLC                        ; $8A4E
    ADC $0430,Y                ; $8A4F
    JMP $8A56                  ; $8A52
    TXA                        ; $8A55
    .byte $85,$47
    JSR $C53C                  ; $8A58
    LDA $0047                  ; $8A5B
    LDY #$09                   ; $8A5D
    CMP #$AA                   ; $8A5F
    BEQ $8A6E                  ; $8A61
    LDY #$00                   ; $8A63
    LDA ($0030),Y              ; $8A65
    CMP #$FC                   ; $8A67
    BEQ $8A6E                  ; $8A69
    INY                        ; $8A6B
    BNE $8A65                  ; $8A6C
    TYA                        ; $8A6E
    .byte $85,$49
    LDA #$00                   ; $8A71
    STA $0046                  ; $8A73
    LDY $0046                  ; $8A75
    LDA ($0030),Y              ; $8A77
    JSR $C524                  ; $8A79
    JSR $8C9F                  ; $8A7C
    INC $0046                  ; $8A7F
    DEC $0049                  ; $8A81
    BNE $8A75                  ; $8A83
    RTS                        ; $8A85
    .byte $A4,$40
    INC $0040                  ; $8A88
    LDA ($003E),Y              ; $8A8A
    TAX                        ; $8A8C
    LDA $0601,X                ; $8A8D
    JMP $8D1A                  ; $8A90
    .byte $A4,$40
    INC $0040                  ; $8A95
    LDA ($003E),Y              ; $8A97
    BEQ $8A9F                  ; $8A99
    TAX                        ; $8A9B
    LDA $0430,X                ; $8A9C
    LDX $061E                  ; $8A9F
    LDY $060B,X                ; $8AA2
    CLC                        ; $8AA5
    ADC $8AAC,Y                ; $8AA6
    JMP $8D6C                  ; $8AA9
    .byte $CD,$D1,$D7,$AE,$1E,$06
    LDA $0601,X                ; $8AB2
    JMP $8CDC                  ; $8AB5
    .byte $AE,$1E,$06
    LDA $0601,X                ; $8ABB
    JMP $8CA5                  ; $8ABE
    .byte $A4,$40
    INC $0040                  ; $8AC3
    LDA ($003E),Y              ; $8AC5
    TAX                        ; $8AC7
    LDA $0431,X                ; $8AC8
    INX                        ; $8ACB
    CPX $0430                  ; $8ACC
    BCC $8AD4                  ; $8ACF
    BEQ $8AD4                  ; $8AD1
    RTS                        ; $8AD3
    JMP $8D1A                  ; $8AD4
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8ADA
    JMP $8CDC                  ; $8ADC
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8AE2
    JMP $8CA5                  ; $8AE4
    .byte $A4,$40
    INC $0040                  ; $8AE9
    LDX a: $002A               ; $8AEB
    LDA ($003E),Y              ; $8AEE
    BEQ $8AF5                  ; $8AF0
    LDX a: $002B               ; $8AF2
    LDA $8B0A,X                ; $8AF5
    PHA                        ; $8AF8
    TXA                        ; $8AF9
    CLC                        ; $8AFA
    ADC #$76                   ; $8AFB
    CMP #$9A                   ; $8AFD
    BCC $8B03                  ; $8AFF
    .byte $A9,$99
    JSR $C53C                  ; $8B03
    PLA                        ; $8B06
    JMP $8A6F                  ; $8B07
    .byte $03,$04,$03,$03,$03,$04,$03,$04,$03,$03,$03,$04,$03,$03,$04,$03
    .byte $03,$03,$03,$03,$03,$03,$03,$03,$04,$03,$03,$03,$04,$04,$04,$04
    .byte $04,$03,$03,$04,$04,$A4,$40
    INC $0040                  ; $8B31
    LDA ($003E),Y              ; $8B33
    TAX                        ; $8B35
    LDA a: $0028,X             ; $8B36
    LDY a: $0027               ; $8B39
    CPY #$04                   ; $8B3C
    BNE $8B43                  ; $8B3E
    LDA $0610,X                ; $8B40
    LDX #$00                   ; $8B43
    JMP $8C55                  ; $8B45
    .byte $A9,$00
    STA $0047                  ; $8B4A
    LDA a: $0027               ; $8B4C
    ASL                        ; $8B4F
    ASL                        ; $8B50
    ADC a: $0027               ; $8B51
    ADC $0047                  ; $8B54
    TAX                        ; $8B56
    LDA $8B72,X                ; $8B57
    CMP #$FF                   ; $8B5A
    BEQ $8B67                  ; $8B5C
    JSR $C524                  ; $8B5E
    JSR $8C9F                  ; $8B61
    JMP $8B69                  ; $8B64
    INC $003D                  ; $8B67
    .byte $E6,$47
    LDA $0047                  ; $8B6B
    CMP #$05                   ; $8B6D
    BNE $8B4C                  ; $8B6F
    RTS                        ; $8B71
    .byte $FF,$A8,$2E,$FF,$FF,$FF,$0A,$03,$FF,$FF,$04,$2E,$00,$A8,$2E,$04
    .byte $2E,$00,$0A,$03,$FF,$8D,$8B,$FF,$FF,$A2,$00
    LDA $05F7                  ; $8B8D
    LDY $05F8                  ; $8B90
    SEC                        ; $8B93
    SBC #$06                   ; $8B94
    BCS $8B9B                  ; $8B96
    DEY                        ; $8B98
    BMI $8B9E                  ; $8B99
    INX                        ; $8B9B
    BNE $8B93                  ; $8B9C
    ADC #$06                   ; $8B9E
    ASL                        ; $8BA0
    TAY                        ; $8BA1
    TXA                        ; $8BA2
    PHA                        ; $8BA3
    LDA $8BC9,Y                ; $8BA4
    PHA                        ; $8BA7
    LDA $8BCA,Y                ; $8BA8
    LDY #$00                   ; $8BAB
    JSR $8C85                  ; $8BAD
    DEC $003D                  ; $8BB0
    PLA                        ; $8BB2
    LDY #$00                   ; $8BB3
    JSR $8C85                  ; $8BB5
    DEC $003D                  ; $8BB8
    LDA #$77                   ; $8BBA
    LDY #$00                   ; $8BBC
    JSR $8C85                  ; $8BBE
    DEC $003D                  ; $8BC1
    PLA                        ; $8BC3
    LDX #$00                   ; $8BC4
    JMP $8C55                  ; $8BC6
    .byte $33,$33,$34,$33,$35,$33,$36,$33,$37,$33,$38,$33,$A4,$40
    INC $0040                  ; $8BD7
    LDA ($003E),Y              ; $8BD9
    JMP $8D1A                  ; $8BDB
    .byte $AD,$FD,$05
    JMP $8D1A                  ; $8BE1
    .byte $AD,$FD,$05,$4C,$A5,$8C,$AD,$41,$04
    JMP $8D1A                  ; $8BED
    .byte $A4,$40
    INC $0040                  ; $8BF2
    LDA ($003E),Y              ; $8BF4
    JSR $C50C                  ; $8BF6
    LDY #$02                   ; $8BF9
    LDA ($0034),Y              ; $8BFB
    TAX                        ; $8BFD
    DEY                        ; $8BFE
    LDA ($0034),Y              ; $8BFF
    JMP $8C55                  ; $8C01
    .byte $AD,$41,$04
    STA $0049                  ; $8C07
    LDA $0049                  ; $8C09
    CMP #$0B                   ; $8C0B
    BEQ $8C46                  ; $8C0D
    LDX $0430                  ; $8C0F
    BEQ $8C22                  ; $8C12
    CMP $0430,X                ; $8C14
    BEQ $8C1E                  ; $8C17
    DEX                        ; $8C19
    BNE $8C14                  ; $8C1A
    BEQ $8C22                  ; $8C1C
    INC $0049                  ; $8C1E
    BNE $8C09                  ; $8C20
    INC $0049                  ; $8C22
    JSR $8D1A                  ; $8C24
    LDY $003C                  ; $8C27
    DEY                        ; $8C29
    BEQ $8C46                  ; $8C2A
    LDA #$17                   ; $8C2C
    STA $003D                  ; $8C2E
    LDA $0049                  ; $8C30
    SEC                        ; $8C32
    SBC #$01                   ; $8C33
    LDX #$01                   ; $8C35
    JSR $C527                  ; $8C37
    LDA $0032                  ; $8C3A
    LDX $0033                  ; $8C3C
    JSR $8C55                  ; $8C3E
    LDA $0049                  ; $8C41
    STA $0441                  ; $8C43
    RTS                        ; $8C46
    .byte $AD,$FD,$05
    CLC                        ; $8C4A
    ADC #$01                   ; $8C4B
    LDX #$00                   ; $8C4D
    JMP $8C55                  ; $8C4F
    .byte $68
    PLA                        ; $8C53
    RTS                        ; $8C54
    .byte $A4,$3C
    DEY                        ; $8C57
    BEQ $8C84                  ; $8C58
    STA $006F                  ; $8C5A
    STX $0070                  ; $8C5C
    LDA #$0A                   ; $8C5E
    STA $0071                  ; $8C60
    LDA #$00                   ; $8C62
    STA $0074                  ; $8C64
    JSR $C51E                  ; $8C66
    LDA $0072                  ; $8C69
    JSR $8C7A                  ; $8C6B
    LDA $0070                  ; $8C6E
    BNE $8C66                  ; $8C70
    LDA $006F                  ; $8C72
    BEQ $8C84                  ; $8C74
    CMP #$0A                   ; $8C76
    BCS $8C66                  ; $8C78
    CLC                        ; $8C7A
    ADC #$33                   ; $8C7B
    LDY #$00                   ; $8C7D
    JSR $8C85                  ; $8C7F
    DEC $003D                  ; $8C82
    RTS                        ; $8C84
    LDX $003D                  ; $8C85
    DEC $003C                  ; $8C87
    BNE $8C99                  ; $8C89
    TYA                        ; $8C8B
    BEQ $8C9C                  ; $8C8C
    LDY $05C6                  ; $8C8E
    CPY #$1B                   ; $8C91
    BEQ $8C99                  ; $8C93
    LDY $0045                  ; $8C95
    BEQ $8C9C                  ; $8C97
    STA $04A8,X                ; $8C99
    INC $003C                  ; $8C9C
    RTS                        ; $8C9E
    JSR $8C85                  ; $8C9F
    INC $003D                  ; $8CA2
    RTS                        ; $8CA4
    .byte $48
    LDY $0040                  ; $8CA6
    INC $0040                  ; $8CA8
    LDA ($003E),Y              ; $8CAA
    BNE $8CBD                  ; $8CAC
    PLA                        ; $8CAE
    JSR $C50C                  ; $8CAF
    LDY #$02                   ; $8CB2
    LDA ($0034),Y              ; $8CB4
    TAX                        ; $8CB6
    DEY                        ; $8CB7
    LDA ($0034),Y              ; $8CB8
    JMP $8CD9                  ; $8CBA
    AND #$7F                   ; $8CBD
    CMP #$07                   ; $8CBF
    BCC $8CD0                  ; $8CC1
    CMP #$18                   ; $8CC3
    BCS $8CD0                  ; $8CC5
    LDX $044E                  ; $8CC7
    DEX                        ; $8CCA
    BEQ $8CD0                  ; $8CCB
    CLC                        ; $8CCD
    ADC #$08                   ; $8CCE
    TAX                        ; $8CD0
    PLA                        ; $8CD1
    JSR $C527                  ; $8CD2
    LDA $0032                  ; $8CD5
    LDX $0033                  ; $8CD7
    .byte $4C,$55,$8C,$48
    CMP #$0B                   ; $8CDD
    BCC $8CE3                  ; $8CDF
    SBC #$0B                   ; $8CE1
    ASL                        ; $8CE3
    PHA                        ; $8CE4
    TAX                        ; $8CE5
    LDA $8D04,X                ; $8CE6
    JSR $C524                  ; $8CE9
    JSR $8C9F                  ; $8CEC
    PLA                        ; $8CEF
    TAX                        ; $8CF0
    LDA $8D05,X                ; $8CF1
    JSR $C524                  ; $8CF4
    JSR $8C9F                  ; $8CF7
    LDA #$00                   ; $8CFA
    TAY                        ; $8CFC
    JSR $8C9F                  ; $8CFD
    PLA                        ; $8D00
    JMP $8D1A                  ; $8D01
    .byte $87,$8B,$84,$86,$84,$86,$84,$86,$84,$86,$8C,$86,$86,$92,$8C,$86
    .byte $86,$92,$8C,$86,$86,$92,$85,$47
    JSR $C50C                  ; $8D1C
    LDY #$00                   ; $8D1F
    LDA ($0034),Y              ; $8D21
    BNE $8D6C                  ; $8D23
    LDA $0047                  ; $8D25
    SEC                        ; $8D27
    SBC #$0B                   ; $8D28
    ASL                        ; $8D2A
    ASL                        ; $8D2B
    TAX                        ; $8D2C
    LDY #$00                   ; $8D2D
    LDA $8D40,X                ; $8D2F
    STA $05EE,Y                ; $8D32
    INX                        ; $8D35
    INY                        ; $8D36
    CPY #$04                   ; $8D37
    BNE $8D2F                  ; $8D39
    LDA #$00                   ; $8D3B
    JMP $8D6C                  ; $8D3D
    .byte $47,$7D,$CD,$7D,$00,$35,$AF,$2E,$00,$36,$AF,$2E,$00,$37,$AF,$2E
    .byte $00,$38,$AF,$2E,$00,$39,$AF,$2E,$00,$3A,$AF,$2E,$00,$3B,$AF,$2E
    .byte $00,$3C,$AF,$2E,$34,$33,$AF,$2E,$34,$34,$AF,$2E,$20,$3C,$C5
    LDY #$00                   ; $8D6F
    LDA ($0030),Y              ; $8D71
    CMP #$E0                   ; $8D73
    BCS $8D86                  ; $8D75
    TYA                        ; $8D77
    PHA                        ; $8D78
    LDA ($0030),Y              ; $8D79
    JSR $C524                  ; $8D7B
    JSR $8C9F                  ; $8D7E
    PLA                        ; $8D81
    TAY                        ; $8D82
    INY                        ; $8D83
    BNE $8D71                  ; $8D84
    TYA                        ; $8D86
    SEC                        ; $8D87
    SBC #$05                   ; $8D88
    BPL $8D9D                  ; $8D8A
    EOR #$FF                   ; $8D8C
    CLC                        ; $8D8E
    ADC #$01                   ; $8D8F
    STA $0047                  ; $8D91
    LDA #$00                   ; $8D93
    TAY                        ; $8D95
    JSR $8C9F                  ; $8D96
    DEC $0047                  ; $8D99
    BNE $8D93                  ; $8D9B
    RTS                        ; $8D9D
