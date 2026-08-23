; ============================================================
; code_scene.s - bank00 scene/data routines ($8AB3-$8EEF)
; Scene data tables + large code block
; ============================================================

    .byte $06,$07,$08,$09,$0A,$0B,$0C,$0D,$0E,$0F,$10,$11,$12,$13,$14,$1A
    .byte $1B,$1C,$1D,$1E,$46,$47,$48,$49,$4A,$4B,$4C,$4D,$4E,$4F,$50,$51
    .byte $52,$53,$54,$5A,$5B,$5C,$5D,$5E,$1A,$1B,$1C,$1D,$1E,$5A,$5B,$5C
    .byte $5D,$5E,$01,$0A,$14,$28,$3C,$50,$78,$F0,$00,$03,$10,$04,$20,$05
    .byte $60,$06,$FF
    STA $00ED                  ; $8AF7
    LDA #$00                   ; $8AF9
    STA $0009                  ; $8AFB
    STA $000A                  ; $8AFD
    STA $000D                  ; $8AFF
    STA $000E                  ; $8B01
    LDA $005B                  ; $8B03
    AND #$7F                   ; $8B05
    STA $005B                  ; $8B07
    LDA $0025                  ; $8B09
    STA $0077                  ; $8B0B
    LDX #$07                   ; $8B0D
    JSR $C4B9                  ; $8B0F
    LDA #$00                   ; $8B12
    LDY #$F8                   ; $8B14
    STA $0552,Y                ; $8B16
    INY                        ; $8B19
    BNE $8B16                  ; $8B1A
    LDA $00ED                  ; $8B1C
    ASL                        ; $8B1E
    TAX                        ; $8B1F
    LDA #$00                   ; $8B20
    ROL                        ; $8B22
    TAY                        ; $8B23
    TXA                        ; $8B24
    CLC                        ; $8B25
    ADC #$00                   ; $8B26
    STA $0063                  ; $8B28
    TYA                        ; $8B2A
    ADC #$A0                   ; $8B2B
    STA $0064                  ; $8B2D
    LDY #$00                   ; $8B2F
    LDA ($0063),Y              ; $8B31
    TAX                        ; $8B33
    INY                        ; $8B34
    LDA ($0063),Y              ; $8B35
    STA $0064                  ; $8B37
    STX $0063                  ; $8B39
    LDY #$00                   ; $8B3B
    LDA ($0063),Y              ; $8B3D
    STA $0075                  ; $8B3F
    INY                        ; $8B41
    LDA ($0063),Y              ; $8B42
    STA $0076                  ; $8B44
    INY                        ; $8B46
    LDA ($0063),Y              ; $8B47
    TAX                        ; $8B49
    AND #$3F                   ; $8B4A
    STA $0048                  ; $8B4C
    TXA                        ; $8B4E
    LSR $005B                  ; $8B4F
    ROL                        ; $8B51
    ROL $005B                  ; $8B52
    INY                        ; $8B54
    LDA ($0063),Y              ; $8B55
    STA $005E                  ; $8B57
    INY                        ; $8B59
    LDA ($0063),Y              ; $8B5A
    STA $005F                  ; $8B5C
    INY                        ; $8B5E
    LDA ($0063),Y              ; $8B5F
    AND #$F8                   ; $8B61
    STA $005C                  ; $8B63
    LDA #$02                   ; $8B65
    STA $005D                  ; $8B67
    ASL $005C                  ; $8B69
    ROL $005D                  ; $8B6B
    ASL $005C                  ; $8B6D
    ROL $005D                  ; $8B6F
    LDA ($0063),Y              ; $8B71
    AND #$07                   ; $8B73
    ORA $005C                  ; $8B75
    STA $005C                  ; $8B77
    ASL $005C                  ; $8B79
    ROL $005D                  ; $8B7B
    ASL $005C                  ; $8B7D
    ROL $005D                  ; $8B7F
    LDA $005D                  ; $8B81
    AND #$0C                   ; $8B83
    BNE $8B93                  ; $8B85
    LDA $007B                  ; $8B87
    ASL                        ; $8B89
    ASL                        ; $8B8A
    EOR $005B                  ; $8B8B
    AND #$04                   ; $8B8D
    ORA $005D                  ; $8B8F
    STA $005D                  ; $8B91
    LDA $005E                  ; $8B93
    CMP #$09                   ; $8B95
    BCC $8B9F                  ; $8B97
    JSR $9071                  ; $8B99
    JMP $8BAB                  ; $8B9C
    LDA $005D                  ; $8B9F
    AND #$04                   ; $8BA1
    BNE $8BAB                  ; $8BA3
    JSR $9071                  ; $8BA5
    JMP $8BAE                  ; $8BA8
    JSR $9076                  ; $8BAB
    .byte $A9,$01
    JSR $9FA8                  ; $8BB0
    LDA $0063                  ; $8BB3
    CLC                        ; $8BB5
    ADC #$06                   ; $8BB6
    STA $0063                  ; $8BB8
    LDA $0064                  ; $8BBA
    ADC #$00                   ; $8BBC
    STA $0064                  ; $8BBE
    LDA $005E                  ; $8BC0
    LDX $005F                  ; $8BC2
    JSR $9DEE                  ; $8BC4
    LDA $0063                  ; $8BC7
    CLC                        ; $8BC9
    ADC $00EC                  ; $8BCA
    STA $0070                  ; $8BCC
    LDA $0064                  ; $8BCE
    ADC $00ED                  ; $8BD0
    STA $0071                  ; $8BD2
    LDA #$00                   ; $8BD4
    STA $0060                  ; $8BD6
    LDY #$01                   ; $8BD8
    LDA ($0070),Y              ; $8BDA
    AND #$E0                   ; $8BDC
    STA $0062                  ; $8BDE
    LDA ($0070),Y              ; $8BE0
    AND #$1F                   ; $8BE2
    TAX                        ; $8BE4
    LSR                        ; $8BE5
    ROR $0060                  ; $8BE6
    LSR                        ; $8BE8
    ROR $0060                  ; $8BE9
    STA $0061                  ; $8BEB
    TXA                        ; $8BED
    BEQ $8BF3                  ; $8BEE
    INY                        ; $8BF0
    LDA ($0070),Y              ; $8BF1
    STA $0072                  ; $8BF3
    LDA $0062                  ; $8BF5
    AND #$C0                   ; $8BF7
    BEQ $8C43                  ; $8BF9
    CMP #$40                   ; $8BFB
    BEQ $8C15                  ; $8BFD
    CMP #$80                   ; $8BFF
    BEQ $8C0C                  ; $8C01
    LDA #$04                   ; $8C03
    LDX #$01                   ; $8C05
    LDY $005F                  ; $8C07
    JMP $8C59                  ; $8C09
    LDA #$04                   ; $8C0C
    LDX #$01                   ; $8C0E
    LDY $005F                  ; $8C10
    JMP $8C59                  ; $8C12
    LDA $005E                  ; $8C15
    LDX $005F                  ; $8C17
    JSR $9DEE                  ; $8C19
    LDA $00EC                  ; $8C1C
    SEC                        ; $8C1E
    SBC #$01                   ; $8C1F
    STA $00EC                  ; $8C21
    LDA $00ED                  ; $8C23
    SBC #$00                   ; $8C25
    STA $00ED                  ; $8C27
    LDA $0063                  ; $8C29
    CLC                        ; $8C2B
    ADC $00EC                  ; $8C2C
    STA $0063                  ; $8C2E
    LDA $0064                  ; $8C30
    ADC $00ED                  ; $8C32
    STA $0064                  ; $8C34
    LDA #$00                   ; $8C36
    SEC                        ; $8C38
    SBC $005F                  ; $8C39
    TAY                        ; $8C3B
    LDA #$FC                   ; $8C3C
    LDX #$FF                   ; $8C3E
    JMP $8C59                  ; $8C40
    LDA $005F                  ; $8C43
    SEC                        ; $8C45
    SBC #$01                   ; $8C46
    CLC                        ; $8C48
    ADC $0063                  ; $8C49
    STA $0063                  ; $8C4B
    LDA $0064                  ; $8C4D
    ADC #$00                   ; $8C4F
    STA $0064                  ; $8C51
    LDA #$FC                   ; $8C53
    LDX #$FF                   ; $8C55
    LDY $005F                  ; $8C57
    .byte $85,$6D
    STX $006E                  ; $8C5B
    STY $006F                  ; $8C5D
    LDA $005E                  ; $8C5F
    CMP #$07                   ; $8C61
    BCC $8C89                  ; $8C63
    SEC                        ; $8C65
    SBC #$07                   ; $8C66
    STA $005E                  ; $8C68
    LDY #$07                   ; $8C6A
    LDX $005F                  ; $8C6C
    JSR $8E15                  ; $8C6E
    LDA #$01                   ; $8C71
    STA $007B                  ; $8C73
    LDX #$09                   ; $8C75
    LDA #$B9                   ; $8C77
    STA $0000,X                ; $8C79
    LDA #$8C                   ; $8C7B
    STA $0001,X                ; $8C7D
    LDY #$78                   ; $8C7F
    LDA #$00                   ; $8C81
    JSR $9F69                  ; $8C83
    JMP $8CA5                  ; $8C86
    LDY $005E                  ; $8C89
    LDX $005F                  ; $8C8B
    JSR $8E15                  ; $8C8D
    LDA $0072                  ; $8C90
    BEQ $8CA5                  ; $8C92
    LDX #$09                   ; $8C94
    LDA #$21                   ; $8C96
    STA $0000,X                ; $8C98
    LDA #$8D                   ; $8C9A
    STA $0001,X                ; $8C9C
    LDY #$78                   ; $8C9E
    LDA #$00                   ; $8CA0
    JSR $9F69                  ; $8CA2
    .byte $A5,$75
    STA $008E                  ; $8CA7
    LDA $0076                  ; $8CA9
    STA $008F                  ; $8CAB
    LDA #$00                   ; $8CAD
    STA $0044                  ; $8CAF
    STA $0045                  ; $8CB1
    STA $007A                  ; $8CB3
    LDX $0077                  ; $8CB5
    JMP $C4B9                  ; $8CB7
    LDX #$07                   ; $8CBA
    JSR $C4B9                  ; $8CBC
    LDA #$00                   ; $8CBF
    STA $0069                  ; $8CC1
    STA $006A                  ; $8CC3
    BIT $0062                  ; $8CC5
    BMI $8CD6                  ; $8CC7
    LDA #$00                   ; $8CC9
    SEC                        ; $8CCB
    SBC $0060                  ; $8CCC
    STA $0060                  ; $8CCE
    LDA #$00                   ; $8CD0
    SBC $0061                  ; $8CD2
    STA $0061                  ; $8CD4
    LDA #$01                   ; $8CD6
    JSR $9FA8                  ; $8CD8
    LDA $0060                  ; $8CDB
    CLC                        ; $8CDD
    ADC $0069                  ; $8CDE
    STA $0069                  ; $8CE0
    LDA #$00                   ; $8CE2
    ADC $0061                  ; $8CE4
    TAX                        ; $8CE6
    JSR $9BA9                  ; $8CE7
    TXA                        ; $8CEA
    BPL $8CF2                  ; $8CEB
    EOR #$FF                   ; $8CED
    CLC                        ; $8CEF
    ADC #$01                   ; $8CF0
    CLC                        ; $8CF2
    ADC $006A                  ; $8CF3
    STA $006A                  ; $8CF5
    SEC                        ; $8CF7
    SBC #$20                   ; $8CF8
    BCC $8CD6                  ; $8CFA
    STA $006A                  ; $8CFC
    LDA $005B                  ; $8CFE
    BPL $8D0A                  ; $8D00
    .byte $A9,$01,$20,$A8,$9F,$4C,$FE,$8C
    LDX #$0D                   ; $8D0A
    LDA #$FE                   ; $8D0C
    STA $0000,X                ; $8D0E
    LDA #$8D                   ; $8D10
    STA $0001,X                ; $8D12
    LDY #$A0                   ; $8D14
    LDA #$00                   ; $8D16
    JSR $9F69                  ; $8D18
    DEC $005E                  ; $8D1B
    BNE $8CD6                  ; $8D1D
    JMP $8D59                  ; $8D1F
    .byte $A2,$07
    JSR $C4B9                  ; $8D24
    LDX #$02                   ; $8D27
    LDY #$00                   ; $8D29
    LDA ($0070),Y              ; $8D2B
    BEQ $8D3A                  ; $8D2D
    ASL                        ; $8D2F
    BCC $8D3B                  ; $8D30
    TAX                        ; $8D32
    LDA #$FE                   ; $8D33
    JSR $9FA8                  ; $8D35
    INX                        ; $8D38
    INX                        ; $8D39
    TXA                        ; $8D3A
    JSR $9FA8                  ; $8D3B
    LDA #$00                   ; $8D3E
    STA $0069                  ; $8D40
    STA $006A                  ; $8D42
    BIT $0062                  ; $8D44
    BMI $8D55                  ; $8D46
    LDA #$00                   ; $8D48
    SEC                        ; $8D4A
    SBC $0060                  ; $8D4B
    STA $0060                  ; $8D4D
    LDA #$00                   ; $8D4F
    SBC $0061                  ; $8D51
    STA $0061                  ; $8D53
    BIT $0062                  ; $8D55
    BVC $8D88                  ; $8D57
    .byte $A9,$01
    JSR $9FA8                  ; $8D5B
    LDA $0060                  ; $8D5E
    CLC                        ; $8D60
    ADC $0069                  ; $8D61
    STA $0069                  ; $8D63
    LDA #$00                   ; $8D65
    ADC $0061                  ; $8D67
    TAX                        ; $8D69
    JSR $9BA9                  ; $8D6A
    TXA                        ; $8D6D
    BPL $8D75                  ; $8D6E
    EOR #$FF                   ; $8D70
    CLC                        ; $8D72
    ADC #$01                   ; $8D73
    CLC                        ; $8D75
    ADC $006A                  ; $8D76
    STA $006A                  ; $8D78
    SEC                        ; $8D7A
    SBC #$20                   ; $8D7B
    BCC $8D59                  ; $8D7D
    STA $006A                  ; $8D7F
    DEC $0072                  ; $8D81
    BNE $8D59                  ; $8D83
    JMP $8DC8                  ; $8D85
    LDA #$01                   ; $8D88
    JSR $9FA8                  ; $8D8A
    LDA $0060                  ; $8D8D
    CLC                        ; $8D8F
    ADC $0069                  ; $8D90
    STA $0069                  ; $8D92
    LDA #$00                   ; $8D94
    ADC $0061                  ; $8D96
    TAX                        ; $8D98
    JSR $9BCA                  ; $8D99
    TXA                        ; $8D9C
    BPL $8DA4                  ; $8D9D
    EOR #$FF                   ; $8D9F
    CLC                        ; $8DA1
    ADC #$01                   ; $8DA2
    CLC                        ; $8DA4
    ADC $006A                  ; $8DA5
    STA $006A                  ; $8DA7
    SEC                        ; $8DA9
    SBC #$20                   ; $8DAA
    BCC $8D88                  ; $8DAC
    STA $006A                  ; $8DAE
    DEC $0072                  ; $8DB0
    BNE $8D88                  ; $8DB2
    LDA $007A                  ; $8DB4
    SEC                        ; $8DB6
    SBC $006A                  ; $8DB7
    STA $007A                  ; $8DB9
    LDA $007B                  ; $8DBB
    SBC #$00                   ; $8DBD
    STA $007B                  ; $8DBF
    LDA $0047                  ; $8DC1
    SEC                        ; $8DC3
    SBC $006A                  ; $8DC4
    STA $0047                  ; $8DC6
    .byte $A5,$62
    AND #$20                   ; $8DCA
    BNE $8DFC                  ; $8DCC
    LDA $0070                  ; $8DCE
    CLC                        ; $8DD0
    ADC #$03                   ; $8DD1
    STA $0070                  ; $8DD3
    LDA $0071                  ; $8DD5
    ADC #$00                   ; $8DD7
    STA $0071                  ; $8DD9
    LDA #$00                   ; $8DDB
    STA $0060                  ; $8DDD
    LDY #$01                   ; $8DDF
    LDA ($0070),Y              ; $8DE1
    AND #$E0                   ; $8DE3
    STA $0062                  ; $8DE5
    LDA ($0070),Y              ; $8DE7
    AND #$1F                   ; $8DE9
    TAX                        ; $8DEB
    LSR                        ; $8DEC
    ROR $0060                  ; $8DED
    LSR                        ; $8DEF
    ROR $0060                  ; $8DF0
    STA $0061                  ; $8DF2
    INY                        ; $8DF4
    LDA ($0070),Y              ; $8DF5
    STA $0072                  ; $8DF7
    JMP $8D22                  ; $8DF9
    JMP $9F7E                  ; $8DFC
    LDA $005B                  ; $8DFF
    ORA #$80                   ; $8E01
    STA $005B                  ; $8E03
    LDY #$01                   ; $8E05
    LDX $005F                  ; $8E07
    JSR $8E15                  ; $8E09
    LDA $005B                  ; $8E0C
    AND #$7F                   ; $8E0E
    STA $005B                  ; $8E10
    JMP $9F7E                  ; $8E12
    STY $006C                  ; $8E15
    STX $006B                  ; $8E17
    .byte $A5,$63
    STA $0065                  ; $8E1B
    LDA $0064                  ; $8E1D
    STA $0066                  ; $8E1F
    LDA $006B                  ; $8E21
    STA $00ED                  ; $8E23
    LDA $005C                  ; $8E25
    STA $0073                  ; $8E27
    LDA $005D                  ; $8E29
    STA $0074                  ; $8E2B
    LDY #$00                   ; $8E2D
    LDA ($0063),Y              ; $8E2F
    JSR $8EF0                  ; $8E31
    LDA $005C                  ; $8E34
    TAX                        ; $8E36
    CLC                        ; $8E37
    ADC $006D                  ; $8E38
    STA $005C                  ; $8E3A
    TXA                        ; $8E3C
    EOR $005C                  ; $8E3D
    AND #$20                   ; $8E3F
    BEQ $8E58                  ; $8E41
    LDA $006D                  ; $8E43
    ASL                        ; $8E45
    ASL                        ; $8E46
    ASL                        ; $8E47
    EOR #$FF                   ; $8E48
    CLC                        ; $8E4A
    ADC #$01                   ; $8E4B
    CLC                        ; $8E4D
    ADC $005C                  ; $8E4E
    STA $005C                  ; $8E50
    LDA $005D                  ; $8E52
    EOR #$04                   ; $8E54
    STA $005D                  ; $8E56
    LDA $006E                  ; $8E58
    PHA                        ; $8E5A
    CLC                        ; $8E5B
    ADC $0063                  ; $8E5C
    STA $0063                  ; $8E5E
    PLA                        ; $8E60
    BMI $8E6A                  ; $8E61
    LDA $0064                  ; $8E63
    ADC #$00                   ; $8E65
    JMP $8E6E                  ; $8E67
    LDA $0064                  ; $8E6A
    SBC #$00                   ; $8E6C
    .byte $85,$64
    DEC $00ED                  ; $8E70
    BNE $8E2D                  ; $8E72
    LDA $006F                  ; $8E74
    PHA                        ; $8E76
    CLC                        ; $8E77
    ADC $0065                  ; $8E78
    STA $0063                  ; $8E7A
    PLA                        ; $8E7C
    BMI $8E86                  ; $8E7D
    LDA $0066                  ; $8E7F
    ADC #$00                   ; $8E81
    JMP $8E8A                  ; $8E83
    LDA $0066                  ; $8E86
    SBC #$00                   ; $8E88
    .byte $85,$64
    LDA $0062                  ; $8E8C
    AND #$C0                   ; $8E8E
    CMP #$40                   ; $8E90
    BEQ $8EC2                  ; $8E92
    LDA $0073                  ; $8E94
    CLC                        ; $8E96
    ADC #$80                   ; $8E97
    STA $005C                  ; $8E99
    TAX                        ; $8E9B
    LDA $0074                  ; $8E9C
    ADC #$00                   ; $8E9E
    STA $005D                  ; $8EA0
    TXA                        ; $8EA2
    SEC                        ; $8EA3
    SBC #$40                   ; $8EA4
    BPL $8EE8                  ; $8EA6
    LDA $005D                  ; $8EA8
    SBC #$00                   ; $8EAA
    AND #$03                   ; $8EAC
    CMP #$03                   ; $8EAE
    BNE $8EE8                  ; $8EB0
    LDA $005C                  ; $8EB2
    SEC                        ; $8EB4
    SBC #$C0                   ; $8EB5
    STA $005C                  ; $8EB7
    LDA $005D                  ; $8EB9
    SBC #$03                   ; $8EBB
    STA $005D                  ; $8EBD
    JMP $8EE8                  ; $8EBF
    LDA $0073                  ; $8EC2
    SEC                        ; $8EC4
    SBC #$80                   ; $8EC5
    STA $005C                  ; $8EC7
    TAX                        ; $8EC9
    LDA $0074                  ; $8ECA
    SBC #$00                   ; $8ECC
    STA $005D                  ; $8ECE
    TXA                        ; $8ED0
    BPL $8EE8                  ; $8ED1
    LDA $005D                  ; $8ED3
    AND #$03                   ; $8ED5
    CMP #$03                   ; $8ED7
    BNE $8EE8                  ; $8ED9
    LDA $005C                  ; $8EDB
    CLC                        ; $8EDD
    ADC #$C0                   ; $8EDE
    STA $005C                  ; $8EE0
    LDA $005D                  ; $8EE2
    ADC #$03                   ; $8EE4
    STA $005D                  ; $8EE6
    .byte $C6,$6C
    BEQ $8EEF                  ; $8EEA
    JMP $8E19                  ; $8EEC
    RTS                        ; $8EEF
