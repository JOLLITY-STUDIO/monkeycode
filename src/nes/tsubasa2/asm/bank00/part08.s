    LDA #$33                   ; $9DCD
    STA $00E7                  ; $9DCF
    LDA $00EC                  ; $9DD1
    JSR $9DDE                  ; $9DD3
    JSR $9B5E                  ; $9DD6
    RTS                        ; $9DD9
    LSR                        ; $9DDA
    LSR                        ; $9DDB
    LSR                        ; $9DDC
    LSR                        ; $9DDD
    AND #$0F                   ; $9DDE
    BEQ $9DE6                  ; $9DE0
    LDY #$33                   ; $9DE2
    STY $00E7                  ; $9DE4
    CLC                        ; $9DE6
    ADC $00E7                  ; $9DE7
    STA $05E8,X                ; $9DE9
    INX                        ; $9DEC
    RTS                        ; $9DED
    STA $00ED                  ; $9DEE
    LDA #$00                   ; $9DF0
    STA $00EC                  ; $9DF2
    LDY #$08                   ; $9DF4
    ASL $00EC                  ; $9DF6
    ROL $00ED                  ; $9DF8
    BCC $9E08                  ; $9DFA
    TXA                        ; $9DFC
    CLC                        ; $9DFD
    ADC $00EC                  ; $9DFE
    STA $00EC                  ; $9E00
    LDA $00ED                  ; $9E02
    ADC #$00                   ; $9E04
    STA $00ED                  ; $9E06
    DEY                        ; $9E08
    BNE $9DF6                  ; $9E09
    RTS                        ; $9E0B
    LDA #$00                   ; $9E0C
    STA $00E8                  ; $9E0E
    STA $00E9                  ; $9E10
    LDX #$10                   ; $9E12
    ASL $00EC                  ; $9E14
    ROL $00ED                  ; $9E16
    ROL $00E8                  ; $9E18
    ROL $00E9                  ; $9E1A
    LDA $00E8                  ; $9E1C
    SEC                        ; $9E1E
    SBC $00EA                  ; $9E1F
    TAY                        ; $9E21
    LDA $00E9                  ; $9E22
    SBC $00EB                  ; $9E24
    BCC $9E32                  ; $9E26
    STA $00E9                  ; $9E28
    STY $00E8                  ; $9E2A
    INC $00EC                  ; $9E2C
    BNE $9E32                  ; $9E2E
    .byte $E6,$ED
    DEX                        ; $9E32
    BNE $9E14                  ; $9E33
    RTS                        ; $9E35
    LDA #$00                   ; $9E36
    STA $00EA                  ; $9E38
    LDX #$08                   ; $9E3A
    ASL $00ED                  ; $9E3C
    ROL $00EA                  ; $9E3E
    LDA $00EA                  ; $9E40
    SEC                        ; $9E42
    SBC $00EC                  ; $9E43
    BCC $9E4B                  ; $9E45
    STA $00EA                  ; $9E47
    INC $00ED                  ; $9E49
    DEX                        ; $9E4B
    BNE $9E3C                  ; $9E4C
    RTS                        ; $9E4E
    LDA #$0A                   ; $9E4F
    STA $00EA                  ; $9E51
    LDA #$00                   ; $9E53
    STA $00EB                  ; $9E55
    LDA #$03                   ; $9E57
    STA $00E6                  ; $9E59
    JSR $9E0C                  ; $9E5B
    LDA $00E8                  ; $9E5E
    STA $00E7                  ; $9E60
    JSR $9E0C                  ; $9E62
    LDA $00E8                  ; $9E65
    ASL                        ; $9E67
    ASL                        ; $9E68
    ASL                        ; $9E69
    ASL                        ; $9E6A
    ORA $00E7                  ; $9E6B
    PHA                        ; $9E6D
    DEC $00E6                  ; $9E6E
    BNE $9E5B                  ; $9E70
    PLA                        ; $9E72
    STA $00EA                  ; $9E73
    PLA                        ; $9E75
    STA $00E9                  ; $9E76
    PLA                        ; $9E78
    STA $00E8                  ; $9E79
    RTS                        ; $9E7B
    STA $00ED                  ; $9E7C
    LDA #$0A                   ; $9E7E
    STA $00EC                  ; $9E80
    JSR $9E36                  ; $9E82
    LDA $00EA                  ; $9E85
    STA $00EB                  ; $9E87
    JSR $9E36                  ; $9E89
    LDA $00EA                  ; $9E8C
    ASL                        ; $9E8E
    ASL                        ; $9E8F
    ASL                        ; $9E90
    ASL                        ; $9E91
    ORA $00EB                  ; $9E92
    STA $00EB                  ; $9E94
    JSR $9E36                  ; $9E96
    LDA $00EA                  ; $9E99
    STA $00ED                  ; $9E9B
    LDA $00EB                  ; $9E9D
    STA $00EC                  ; $9E9F
    RTS                        ; $9EA1
    .byte $0F,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $0F,$00,$00,$00,$00,$00,$10,$10,$20,$20,$30,$30,$20,$20,$10,$10
    .byte $0F,$00,$00,$00,$10,$10,$10,$20,$20,$20,$30,$30,$30,$20,$20,$20
    .byte $0F,$00,$10,$10,$10,$20,$20,$30,$30,$30,$30,$30,$30,$30,$30,$30
    .byte $00,$00,$00,$00,$10,$00,$00,$00,$F0,$00,$00,$A2,$01
    LDA $0000,X                ; $9EEF
    BEQ $9EFB                  ; $9EF1
    CMP #$FF                   ; $9EF3
    BEQ $9F52                  ; $9EF5
    DEC $0000,X                ; $9EF7
    BEQ $9F0F                  ; $9EF9
    .byte $8A
    CLC                        ; $9EFC
    ADC #$04                   ; $9EFD
    TAX                        ; $9EFF
    CPX #$19                   ; $9F00
    BNE $9EEF                  ; $9F02
    LDA $001B                  ; $9F04
    BPL $9F04                  ; $9F06
    AND #$7F                   ; $9F08
    STA $001B                  ; $9F0A
    JMP $9EED                  ; $9F0C
    STX $0000                  ; $9F0F
    LDA #$07                   ; $9F11
    ORA $0022                  ; $9F13
    STA $0023                  ; $9F15
    STA $8000                  ; $9F17
    LDA $0003,X                ; $9F1A
    STA $0025                  ; $9F1C
    STA $8001                  ; $9F1E
    LDA #$06                   ; $9F21
    ORA $0022                  ; $9F23
    STA $0023                  ; $9F25
    STA $8000                  ; $9F27
    LDA $0002,X                ; $9F2A
    STA $0024                  ; $9F2C
    STA $8001                  ; $9F2E
    LDA $0001,X                ; $9F31
    TAX                        ; $9F33
    TXS                        ; $9F34
    PLA                        ; $9F35
    STA $00E6                  ; $9F36
    PLA                        ; $9F38
    STA $00E7                  ; $9F39
    PLA                        ; $9F3B
    STA $00E8                  ; $9F3C
    PLA                        ; $9F3E
    STA $00E9                  ; $9F3F
    PLA                        ; $9F41
    STA $00EA                  ; $9F42
    PLA                        ; $9F44
    STA $00EB                  ; $9F45
    PLA                        ; $9F47
    STA $00EC                  ; $9F48
    PLA                        ; $9F4A
    STA $00ED                  ; $9F4B
    PLA                        ; $9F4D
    TAY                        ; $9F4E
    PLA                        ; $9F4F
    TAX                        ; $9F50
    RTS                        ; $9F51
    STX $0000                  ; $9F52
    LDA #$06                   ; $9F54
    ORA $0022                  ; $9F56
    STA $0023                  ; $9F58
    STA $8000                  ; $9F5A
    LDA $0002,X                ; $9F5D
    STA $0024                  ; $9F5F
    STA $8001                  ; $9F61
    LDA $0001,X                ; $9F64
    .byte $AA
    TXS                        ; $9F67
    RTS                        ; $9F68
    STA $0002,X                ; $9F69
    DEY                        ; $9F6B
    DEY                        ; $9F6C
    LDA $0000,X                ; $9F6D
    STA $0101,Y                ; $9F6F
    LDA $0001,X                ; $9F72
    STA $0102,Y                ; $9F74
    STY $0001,X                ; $9F77
    LDA #$FF                   ; $9F79
    STA $0000,X                ; $9F7B
    RTS                        ; $9F7D
    .byte $A9,$00
    LDX $0000                  ; $9F80
    STA $0000,X                ; $9F82
    STA $0001,X                ; $9F84
    JMP $9EFB                  ; $9F86
    LDA $0001,X                ; $9F89
    BEQ $9F95                  ; $9F8B
    LDA $0000,X                ; $9F8D
    BNE $9F95                  ; $9F8F
    LDA #$01                   ; $9F91
    STA $0000,X                ; $9F93
    RTS                        ; $9F95
    LDA $0000,X                ; $9F96
    CMP #$FF                   ; $9F98
    BNE $9FA1                  ; $9F9A
    LDA #$01                   ; $9F9C
    JSR $9FA8                  ; $9F9E
    LDA #$00                   ; $9FA1
    STA $0000,X                ; $9FA3
    RTS                        ; $9FA5
    .byte $A9,$00
    STA $0019                  ; $9FA8
    TXA                        ; $9FAA
    PHA                        ; $9FAB
    TYA                        ; $9FAC
    PHA                        ; $9FAD
    LDA $00ED                  ; $9FAE
    PHA                        ; $9FB0
    LDA $00EC                  ; $9FB1
    PHA                        ; $9FB3
    LDA $00EB                  ; $9FB4
    PHA                        ; $9FB6
    LDA $00EA                  ; $9FB7
    PHA                        ; $9FB9
    LDA $00E9                  ; $9FBA
    PHA                        ; $9FBC
    LDA $00E8                  ; $9FBD
    PHA                        ; $9FBF
    LDA $00E7                  ; $9FC0
    PHA                        ; $9FC2
    LDA $00E6                  ; $9FC3
    PHA                        ; $9FC5
    TSX                        ; $9FC6
    TXA                        ; $9FC7
    LDX $0000                  ; $9FC8
    STA $0001,X                ; $9FCA
    LDA a: $0024               ; $9FCC
    STA $0002,X                ; $9FCF
    LDA a: $0025               ; $9FD1
    STA $0003,X                ; $9FD4
    LDA $0019                  ; $9FD6
    BEQ $9FDE                  ; $9FD8
    CMP #$FF                   ; $9FDA
    BNE $9FE0                  ; $9FDC
    LDA #$FE                   ; $9FDE
    STA $0000,X                ; $9FE0
    JMP $9EFB                  ; $9FE2
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
