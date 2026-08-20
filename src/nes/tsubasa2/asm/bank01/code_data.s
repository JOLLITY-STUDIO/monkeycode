; ============================================================
; code_data.s - bank01 inline data + routines
; ============================================================

    BIT $001E                  ; $8B87
    BVC $8B8E                  ; $8B89
    JMP $A721                  ; $8B8B
    BPL $8B51                  ; $8B8E
    JSR $99F0                  ; $8B90
    LDY $055C                  ; $8B93
    LDX $055F                  ; $8B96
    STY $0060                  ; $8B99
    STX $0061                  ; $8B9B
    JSR $9D08                  ; $8B9D
    LDA #$F8                   ; $8BA0
    STA $055C                  ; $8BA2
    LDA $00ED                  ; $8BA5
    STA $005F                  ; $8BA7
    LDY #$00                   ; $8BA9
    LDA ($0034),Y              ; $8BAB
    LDY #$46                   ; $8BAD
    LDX #$20                   ; $8BAF
    JSR $AF05                  ; $8BB1
    LDY #$03                   ; $8BB4
    LDA ($0034),Y              ; $8BB6
    CLC                        ; $8BB8
    ADC #$01                   ; $8BB9
    JSR $9E7C                  ; $8BBB
    LDY #$AB                   ; $8BBE
    LDX #$20                   ; $8BC0
    JSR $9D8E                  ; $8BC2
    LDA $005F                  ; $8BC5
    LDX #$00                   ; $8BC7
    JSR $C527                  ; $8BC9
    LDA $0032                  ; $8BCC
    STA $00EC                  ; $8BCE
    LDA $0033                  ; $8BD0
    STA $00ED                  ; $8BD2
    JSR $9E4F                  ; $8BD4
    LDY #$29                   ; $8BD7
    LDX #$21                   ; $8BD9
    LDA $00E8                  ; $8BDB
    STA $00EC                  ; $8BDD
    LDA $00E9                  ; $8BDF
    STA $00ED                  ; $8BE1
    JSR $9DB5                  ; $8BE3
    LDA $005F                  ; $8BE6
    BEQ $8BFA                  ; $8BE8
    CMP #$1E                   ; $8BEA
    BCS $8BFA                  ; $8BEC
    LDY #$A9                   ; $8BEE
    LDX #$B8                   ; $8BF0
    JSR $B0C0                  ; $8BF2
    LDY #$00                   ; $8BF5
    JMP $AC03                  ; $8BF7
    LDY #$B0                   ; $8BFA
    LDX #$B8                   ; $8BFC
    JSR $B0C0                  ; $8BFE
    LDY #$31                   ; $8C01
    .byte $84,$E6,$A4,$E6
    LDX $B981,Y                ; $8C07
    CPX #$FF                   ; $8C0A
    BEQ $8C2E                  ; $8C0C
    LDA $005F                  ; $8C0E
    JSR $C527                  ; $8C10
    LDA $0032                  ; $8C13
    JSR $9E7C                  ; $8C15
    LDY $00E6                  ; $8C18
    LDA $B982,Y                ; $8C1A
    LDX $B983,Y                ; $8C1D
    TAY                        ; $8C20
    JSR $9DB5                  ; $8C21
    LDA $00E6                  ; $8C24
    CLC                        ; $8C26
    ADC #$03                   ; $8C27
    STA $00E6                  ; $8C29
    JMP $AC05                  ; $8C2B
    JSR $997E                  ; $8C2E
    LDA #$01                   ; $8C31
    JSR $9FA8                  ; $8C33
    BIT $001E                  ; $8C36
    BVC $8C3D                  ; $8C38
    JMP $AAE5                  ; $8C3A
    BPL $8C31                  ; $8C3D
    LDY #$00                   ; $8C3F
    LDA ($0034),Y              ; $8C41
    LDX #$27                   ; $8C43
    DEX                        ; $8C45
    DEX                        ; $8C46
    DEX                        ; $8C47
    BPL $8C4D                  ; $8C48
    JMP $AAE5                  ; $8C4A
    CMP $BB2E,X                ; $8C4D
    BNE $8C45                  ; $8C50
    LDA $BB2F,X                ; $8C52
    STA $005C                  ; $8C55
    LDA $BB30,X                ; $8C57
    STA $005D                  ; $8C5A
    LDA #$00                   ; $8C5C
    STA $005E                  ; $8C5E
    .byte $A0,$00
    LDA ($005C),Y              ; $8C62
    BPL $8C83                  ; $8C64
    CMP #$FF                   ; $8C66
    BNE $8C6D                  ; $8C68
    JMP $AD23                  ; $8C6A
    CMP #$FE                   ; $8C6D
    BNE $8C7B                  ; $8C6F
    LDA $0446                  ; $8C71
    CMP #$05                   ; $8C74
    BEQ $8C8C                  ; $8C76
    JMP $AD13                  ; $8C78
    LDA $0448                  ; $8C7B
    LSR                        ; $8C7E
    BCS $8C8C                  ; $8C7F
    LDA #$1E                   ; $8C81
    CMP $0026                  ; $8C83
    BCC $8C8C                  ; $8C85
    BEQ $8C8C                  ; $8C87
    JMP $AD13                  ; $8C89
    INY                        ; $8C8C
    LDA ($005C),Y              ; $8C8D
    JSR $C53C                  ; $8C8F
    LDA $005E                  ; $8C92
    ASL                        ; $8C94
    TAX                        ; $8C95
    LDA $BC48,X                ; $8C96
    STA $00E8                  ; $8C99
    LDA $BC49,X                ; $8C9B
    STA $00E9                  ; $8C9E
    .byte $A0,$00
    LDA ($0030),Y              ; $8CA2
    CMP #$FC                   ; $8CA4
    BCS $8CBE                  ; $8CA6
    LDY $00E8                  ; $8CA8
    LDX $00E9                  ; $8CAA
    JSR $88CA                  ; $8CAC
    INC $0030                  ; $8CAF
    BNE $8CB5                  ; $8CB1
    .byte $E6,$31
    INC $00E8                  ; $8CB5
    BNE $8CBB                  ; $8CB7
    .byte $E6,$E9
    JMP $ACA0                  ; $8CBB
    LDA #$00                   ; $8CBE
    STA $044E                  ; $8CC0
    LDY #$02                   ; $8CC3
    LDA ($005C),Y              ; $8CC5
    STA $043B                  ; $8CC7
    STA $043D                  ; $8CCA
    INY                        ; $8CCD
    LDA ($005C),Y              ; $8CCE
    STA $043C                  ; $8CD0
    STA $043E                  ; $8CD3
    LDA $005F                  ; $8CD6
    STA $0441                  ; $8CD8
    STA $0442                  ; $8CDB
    INY                        ; $8CDE
    LDA ($005C),Y              ; $8CDF
    JSR $C54B                  ; $8CE1
    LDA $043F                  ; $8CE4
    STA $00EC                  ; $8CE7
    LDA $0440                  ; $8CE9
    STA $00ED                  ; $8CEC
    JSR $9E4F                  ; $8CEE
    LDA $00E8                  ; $8CF1
    STA $00EC                  ; $8CF3
    LDA $00E9                  ; $8CF5
    STA $00ED                  ; $8CF7
    LDA $005E                  ; $8CF9
    ASL                        ; $8CFB
    TAX                        ; $8CFC
    LDA $BC48,X                ; $8CFD
    AND #$E0                   ; $8D00
    ORA #$15                   ; $8D02
    CLC                        ; $8D04
    ADC #$20                   ; $8D05
    TAY                        ; $8D07
    LDA $BC49,X                ; $8D08
    ADC #$00                   ; $8D0B
    TAX                        ; $8D0D
    JSR $9DB5                  ; $8D0E
    INC $005E                  ; $8D11
    .byte $A5,$5C
    CLC                        ; $8D15
    ADC #$05                   ; $8D16
    STA $005C                  ; $8D18
    LDA $005D                  ; $8D1A
    ADC #$00                   ; $8D1C
    STA $005D                  ; $8D1E
    JMP $AC60                  ; $8D20
    .byte $A5,$5E
    TAX                        ; $8D25
    ASL                        ; $8D26
    ASL                        ; $8D27
    ASL                        ; $8D28
    CLC                        ; $8D29
    ADC #$17                   ; $8D2A
    STA $007C                  ; $8D2C
    LDA #$40                   ; $8D2E
    JSR $9DEE                  ; $8D30
    LDA $00EC                  ; $8D33
    CLC                        ; $8D35
    ADC #$63                   ; $8D36
    TAY                        ; $8D38
    LDA $00ED                  ; $8D39
    ADC #$25                   ; $8D3B
    TAX                        ; $8D3D
    LDA #$67                   ; $8D3E
    STA $00E6                  ; $8D40
    LDA #$B9                   ; $8D42
    STA $00E7                  ; $8D44
    LDA #$1A                   ; $8D46
    JSR $9D73                  ; $8D48
    LDA #$18                   ; $8D4B
    STA $0079                  ; $8D4D
    LDA #$01                   ; $8D4F
    STA $007E                  ; $8D51
    LDA $008E                  ; $8D53
    STA $0090                  ; $8D55
    LDA $008F                  ; $8D57
    STA $0091                  ; $8D59
    LDA #$01                   ; $8D5B
    JSR $9FA8                  ; $8D5D
    BIT $001E                  ; $8D60
    BVS $8D78                  ; $8D62
    BPL $8D5B                  ; $8D64
    LDA #$00                   ; $8D66
    STA $007E                  ; $8D68
    LDA #$01                   ; $8D6A
    JSR $9FA8                  ; $8D6C
    BIT $001E                  ; $8D6F
    BVS $8D4B                  ; $8D71
    BPL $8D6A                  ; $8D73
    JMP $AAE5                  ; $8D75
    LDA #$00                   ; $8D78
    STA $007E                  ; $8D7A
    LDA #$01                   ; $8D7C
    JSR $9FA8                  ; $8D7E
    BIT $001E                  ; $8D81
    BMI $8D4B                  ; $8D83
    BVC $8D7C                  ; $8D85
    JMP $AAE5                  ; $8D87
    .byte $00,$00,$01,$02,$03,$03,$04,$05,$06,$06,$07,$08,$09,$09,$0A,$0B
    .byte $0C,$0C,$0D,$0E,$38,$71,$00,$88,$F8,$58,$71,$00,$90,$78,$F8,$28
    .byte $71,$00,$38,$B8,$F4,$28,$71,$00,$38,$B8,$38,$71,$00,$60,$F8,$58
    .byte $71,$00,$68,$78,$F8,$28,$71,$00,$20,$C8,$F4,$28,$71,$00,$20,$B8
    .byte $F4,$B8,$71,$00,$C0,$C8,$FC,$98,$FF,$03,$10,$C8,$FC,$A8,$FF,$03
    .byte $40,$B8,$F4,$28,$71,$00,$18,$C8,$44,$67,$7D,$4A,$7D,$C2,$FC
    STA $00EC                  ; $8DE9
    LDA $002A                  ; $8DEB
    ASL                        ; $8DED
    ASL                        ; $8DEE
    ASL                        ; $8DEF
    ASL                        ; $8DF0
    CLC                        ; $8DF1
    ADC #$BB                   ; $8DF2
    TAY                        ; $8DF4
    LDA #$00                   ; $8DF5
    ADC #$B6                   ; $8DF7
    TAX                        ; $8DF9
    LDA a: $00EC               ; $8DFA
    JSR $97B8                  ; $8DFD
    RTS                        ; $8E00
    STA $00E7                  ; $8E01
    LDY #$24                   ; $8E03
    LDX #$00                   ; $8E05
    LDA $B823,X                ; $8E07
    STA $0469,Y                ; $8E0A
    LDA #$00                   ; $8E0D
    STA $046A,Y                ; $8E0F
    INX                        ; $8E12
    DEY                        ; $8E13
    DEY                        ; $8E14
    DEY                        ; $8E15
    DEY                        ; $8E16
    BPL $8E07                  ; $8E17
    LDY $002C                  ; $8E19
    JMP $AE8F                  ; $8E1B
    STA $00E7                  ; $8E1E
    LDA #$71                   ; $8E20
    STA $0561                  ; $8E22
    LDA #$00                   ; $8E25
    STA $0562                  ; $8E27
    STX $0563                  ; $8E2A
    LDA $002C                  ; $8E2D
    ASL                        ; $8E2F
    ASL                        ; $8E30
    ASL                        ; $8E31
    ASL                        ; $8E32
    CLC                        ; $8E33
    ADC #$48                   ; $8E34
    STA $0560                  ; $8E36
    RTS                        ; $8E39
    STA $00E7                  ; $8E3A
    LDA $002C                  ; $8E3C
    STA $00E6                  ; $8E3E
    LDA #$01                   ; $8E40
    JSR $9FA8                  ; $8E42
    LDA $001E                  ; $8E45
    AND #$0C                   ; $8E47
    BEQ $8E67                  ; $8E49
    EOR #$0C                   ; $8E4B
    LSR                        ; $8E4D
    SEC                        ; $8E4E
    SBC #$03                   ; $8E4F
    CLC                        ; $8E51
    ADC $00E6                  ; $8E52
    AND #$03                   ; $8E54
    STA $00E6                  ; $8E56
    ASL                        ; $8E58
    ASL                        ; $8E59
    ASL                        ; $8E5A
    ASL                        ; $8E5B
    CLC                        ; $8E5C
    ADC #$48                   ; $8E5D
    STA $0560                  ; $8E5F
    LDY $00E6                  ; $8E62
    JSR $AE8F                  ; $8E64
    BIT $001E                  ; $8E67
    BVS $8E72                  ; $8E69
    BPL $8E40                  ; $8E6B
    LDA $00E6                  ; $8E6D
    STA $002C                  ; $8E6F
    RTS                        ; $8E71
    LDY $002C                  ; $8E72
    JMP $AE8F                  ; $8E74
    JSR $9C3A                  ; $8E77
    LDA $002D                  ; $8E7A
    ASL                        ; $8E7C
    ASL                        ; $8E7D
    ASL                        ; $8E7E
    ASL                        ; $8E7F
    CLC                        ; $8E80
    ADC #$58                   ; $8E81
    STA $0560                  ; $8E83
    JSR $9C0D                  ; $8E86
    BCS $8E8E                  ; $8E89
    LSR                        ; $8E8B
    STA $002D                  ; $8E8C
    RTS                        ; $8E8E
    .byte $BE,$2D,$B8
    LDY #$24                   ; $8E92
    LDA $B831,X                ; $8E94
    STA $0468,Y                ; $8E97
    LDA $B832,X                ; $8E9A
    CLC                        ; $8E9D
    ADC $00E7                  ; $8E9E
    STA $046B,Y                ; $8EA0
    INX                        ; $8EA3
    INX                        ; $8EA4
    DEY                        ; $8EA5
    DEY                        ; $8EA6
    DEY                        ; $8EA7
    DEY                        ; $8EA8
    BPL $8E94                  ; $8EA9
    RTS                        ; $8EAB
    LDA #$0A                   ; $8EAC
    LDX #$0B                   ; $8EAE
    LDY #$FF                   ; $8EB0
    JMP $AEDA                  ; $8EB2
    LDA #$16                   ; $8EB5
    LDX #$0A                   ; $8EB7
    LDY #$01                   ; $8EB9
    JMP $AEDA                  ; $8EBB
    LDA #$16                   ; $8EBE
    LDX #$08                   ; $8EC0
    LDY #$01                   ; $8EC2
    JSR $AEDA                  ; $8EC4
    LDA $00E6                  ; $8EC7
    CLC                        ; $8EC9
    ADC #$40                   ; $8ECA
    STA $00E6                  ; $8ECC
    LDA $00E7                  ; $8ECE
    ADC #$00                   ; $8ED0
    STA $00E7                  ; $8ED2
    LDA #$1E                   ; $8ED4
    LDX #$02                   ; $8ED6
    LDY #$01                   ; $8ED8
    .byte $85,$E8
    STX $00E9                  ; $8EDC
    STY $00EB                  ; $8EDE
    LDA $00E8                  ; $8EE0
    JSR $C50C                  ; $8EE2
    LDY #$00                   ; $8EE5
    LDA ($0034),Y              ; $8EE7
    JSR $AF09                  ; $8EE9
    LDA $00E8                  ; $8EEC
    CLC                        ; $8EEE
    ADC $00EB                  ; $8EEF
    STA $00E8                  ; $8EF1
    LDA $00E6                  ; $8EF3
    CLC                        ; $8EF5
    ADC #$40                   ; $8EF6
    STA $00E6                  ; $8EF8
    LDA $00E7                  ; $8EFA
    ADC #$00                   ; $8EFC
    STA $00E7                  ; $8EFE
    DEC $00E9                  ; $8F00
    BNE $8EE0                  ; $8F02
    RTS                        ; $8F04
    STY $00E6                  ; $8F05
    STX $00E7                  ; $8F07
    JSR $C53C                  ; $8F09
    LDA #$05                   ; $8F0C
    STA $00ED                  ; $8F0E
    LDX #$00                   ; $8F10
    LDY #$00                   ; $8F12
    LDA ($0030),Y              ; $8F14
    CMP #$FC                   ; $8F16
    BCS $8F21                  ; $8F18
    INC $0030                  ; $8F1A
    BNE $8F20                  ; $8F1C
    .byte $E6,$31
    TAX                        ; $8F20
    TXA                        ; $8F21
    LDY $00E6                  ; $8F22
    LDX $00E7                  ; $8F24
    JSR $88CA                  ; $8F26
    INC $00E6                  ; $8F29
    DEC $00ED                  ; $8F2B
    BNE $8F10                  ; $8F2D
    LDA $00E6                  ; $8F2F
    SEC                        ; $8F31
    SBC #$05                   ; $8F32
    STA $00E6                  ; $8F34
    RTS                        ; $8F36
    LDA $005E                  ; $8F37
    JSR $C50C                  ; $8F39
    LDY #$01                   ; $8F3C
    LDA ($0034),Y              ; $8F3E
    STA $00EC                  ; $8F40
    INY                        ; $8F42
    LDA ($0034),Y              ; $8F43
    STA $00ED                  ; $8F45
    JSR $9E4F                  ; $8F47
    LDY $005C                  ; $8F4A
    LDX $005D                  ; $8F4C
    LDA $00E8                  ; $8F4E
    STA $00EC                  ; $8F50
    LDA $00E9                  ; $8F52
    STA $00ED                  ; $8F54
    JSR $9DB5                  ; $8F56
    LDA $005C                  ; $8F59
    CLC                        ; $8F5B
    ADC #$40                   ; $8F5C
    STA $005C                  ; $8F5E
    LDA $005D                  ; $8F60
    ADC #$00                   ; $8F62
    STA $005D                  ; $8F64
    RTS                        ; $8F66
    LDY #$00                   ; $8F67
    LDA ($00E6),Y              ; $8F69
    TAX                        ; $8F6B
    LDA ($0034),Y              ; $8F6C
    STA ($00E6),Y              ; $8F6E
    TXA                        ; $8F70
    STA ($0034),Y              ; $8F71
    INY                        ; $8F73
    CPY #$04                   ; $8F74
    BNE $8F69                  ; $8F76
    RTS                        ; $8F78
    .byte $A5,$26
    ASL                        ; $8F7B
    TAX                        ; $8F7C
    LDA $BA4C,X                ; $8F7D
    STA $00E6                  ; $8F80
    LDA $BA4D,X                ; $8F82
    STA $00E7                  ; $8F85
    JMP $AF9E                  ; $8F87
    .byte $A5,$26
    ASL                        ; $8F8C
    TAX                        ; $8F8D
    LDA $BA4C,X                ; $8F8E
    STA $00E6                  ; $8F91
    LDA $BA4D,X                ; $8F93
    LSR                        ; $8F96
    ROR $00E6                  ; $8F97
    LSR                        ; $8F99
    ROR $00E6                  ; $8F9A
    STA $00E7                  ; $8F9C
    .byte $A2,$00
    LDA $0454,X                ; $8FA0
    CLC                        ; $8FA3
    ADC $00E6                  ; $8FA4
    STA $0454,X                ; $8FA6
    LDA $0455,X                ; $8FA9
    ADC $00E7                  ; $8FAC
    STA $0455,X                ; $8FAE
    BCC $8FBB                  ; $8FB1
    .byte $A9,$FF,$9D,$54,$04,$9D,$55,$04
    INX                        ; $8FBB
    INX                        ; $8FBC
    CPX #$16                   ; $8FBD
    BCC $8FA0                  ; $8FBF
    RTS                        ; $8FC1
    .byte $86,$EC
    JSR $B023                  ; $8FC4
    STA $00EB                  ; $8FC7
    AND #$F0                   ; $8FC9
    LSR                        ; $8FCB
    CLC                        ; $8FCC
    ADC $00EC                  ; $8FCD
    TAX                        ; $8FCF
    LDA $BA1C,X                ; $8FD0
    TAX                        ; $8FD3
    LDA $0026                  ; $8FD4
    ASL                        ; $8FD6
    TAY                        ; $8FD7
    LDA $BA4D,Y                ; $8FD8
    STA $00ED                  ; $8FDB
    LDA $BA4C,Y                ; $8FDD
    ROR $00ED                  ; $8FE0
    LSR                        ; $8FE2
    ROR $00ED                  ; $8FE3
    LSR                        ; $8FE5
    JSR $9DEE                  ; $8FE6
    ASL $00EC                  ; $8FE9
    ROL $00ED                  ; $8FEB
    ASL $00EC                  ; $8FED
    ROL $00ED                  ; $8FEF
    LDA $00EB                  ; $8FF1
    AND #$0F                   ; $8FF3
    ASL                        ; $8FF5
    TAX                        ; $8FF6
    LDA $0454,X                ; $8FF7
    CLC                        ; $8FFA
    ADC $00ED                  ; $8FFB
    STA $0454,X                ; $8FFD
    LDA $0455,X                ; $9000
    ADC #$00                   ; $9003
    STA $0455,X                ; $9005
    BCC $9012                  ; $9008
    .byte $A9,$FF,$9D,$54,$04,$9D,$55,$04
    RTS                        ; $9012
    JSR $B023                  ; $9013
    AND #$0F                   ; $9016
    ASL                        ; $9018
    TAX                        ; $9019
    LDA $0454,X                ; $901A
    TAY                        ; $901D
    LDA $0455,X                ; $901E
    TAX                        ; $9021
    RTS                        ; $9022
    LDX $002A                  ; $9023
    CLC                        ; $9025
    ADC $B9D3,X                ; $9026
    TAX                        ; $9029
    LDA $B9D6,X                ; $902A
    RTS                        ; $902D
    STY $00E6                  ; $902E
    STX $00E7                  ; $9030
    LDX #$80                   ; $9032
    DEX                        ; $9034
    DEX                        ; $9035
    LDA $00E6                  ; $9036
    CMP $BA90,X                ; $9038
    LDA $00E7                  ; $903B
    SBC $BA91,X                ; $903D
    BCC $9034                  ; $9040
    TXA                        ; $9042
    LSR                        ; $9043
    RTS                        ; $9044
    ASL                        ; $9045
    TAX                        ; $9046
    LDA $BA90,X                ; $9047
    TAY                        ; $904A
    LDA $BA91,X                ; $904B
    TAX                        ; $904E
    RTS                        ; $904F
    .byte $A5,$26
    CMP #$10                   ; $9052
    BEQ $906C                  ; $9054
    CMP #$0C                   ; $9056
    BEQ $9065                  ; $9058
    CMP #$06                   ; $905A
    BNE $90A0                  ; $905C
    LDY #$10                   ; $905E
    LDX #$BB                   ; $9060
    JMP $B070                  ; $9062
    LDY #$1A                   ; $9065
    LDX #$BB                   ; $9067
    JMP $B070                  ; $9069
    LDY #$24                   ; $906C
    LDX #$BB                   ; $906E
    .byte $84,$E6
    STX $00E7                  ; $9072
    LDY #$EC                   ; $9074
    LDA $0368,Y                ; $9076
    STA $056A,Y                ; $9079
    INY                        ; $907C
    BNE $9076                  ; $907D
    LDA #$00                   ; $907F
    STA $00E9                  ; $9081
    LSR                        ; $9083
    TAY                        ; $9084
    LDA ($00E6),Y              ; $9085
    TAX                        ; $9087
    LDY $00E9                  ; $9088
    LDA $0656,X                ; $908A
    STA $0454,Y                ; $908D
    LDA $0657,X                ; $9090
    STA $0455,Y                ; $9093
    INC $00E9                  ; $9096
    INC $00E9                  ; $9098
    LDA $00E9                  ; $909A
    CMP #$14                   ; $909C
    BNE $9083                  ; $909E
    RTS                        ; $90A0
    LDX $0027                  ; $90A1
    BEQ $90BF                  ; $90A3
    LDY #$C8                   ; $90A5
    LDX #$B9                   ; $90A7
    JSR $97B6                  ; $90A9
    LDY #$52                   ; $90AC
    LDX #$22                   ; $90AE
    LDA #$01                   ; $90B0
    STA $00E9                  ; $90B2
    LDA $0450                  ; $90B4
    EOR #$FF                   ; $90B7
    CLC                        ; $90B9
    ADC #$37                   ; $90BA
    JSR $9895                  ; $90BC
    RTS                        ; $90BF
    STY $00EC                  ; $90C0
    STX $00ED                  ; $90C2
    .byte $A0,$00
    LDA ($00EC),Y              ; $90C6
    ASL                        ; $90C8
    TAX                        ; $90C9
    LDA $B0D7,X                ; $90CA
    STA $00E6                  ; $90CD
    LDA $B0D8,X                ; $90CF
    STA $00E7                  ; $90D2
    JMP ($00E6)                ; $90D4
    .byte $F7,$B0,$02,$B1,$13,$B1,$1E,$B1,$2F,$B1,$3B,$B1,$4D,$B1,$60,$B1
    .byte $73,$B1,$86,$B1,$99,$B1,$BA,$B1,$BA,$B1,$A4,$B1,$AC,$B1,$BA,$B1
    .byte $20,$C9,$B1
    JSR $97B6                  ; $90FA
    LDA #$03                   ; $90FD
    JMP $B1BB                  ; $90FF
    .byte $A0,$03
    LDA ($00EC),Y              ; $9104
    PHA                        ; $9106
    JSR $B1C9                  ; $9107
    PLA                        ; $910A
    JSR $97B8                  ; $910B
    LDA #$04                   ; $910E
    JMP $B1BB                  ; $9110
    .byte $20,$C9,$B1,$20,$AB,$97,$A9,$03,$4C,$BB,$B1,$A0,$03,$B1,$EC,$48
    .byte $20,$C9,$B1,$68,$20,$AD,$97,$A9,$04,$4C,$BB,$B1,$20,$D3,$B1
    JSR $B1DE                  ; $9132
    LDY $00E9                  ; $9135
    LDX #$01                   ; $9137
    BPL $9145                  ; $9139
    .byte $20,$D3,$B1
    JSR $B1DE                  ; $913E
    LDX $00E9                  ; $9141
    LDY #$01                   ; $9143
    JSR $98EA                  ; $9145
    LDA #$05                   ; $9148
    JMP $B1BB                  ; $914A
