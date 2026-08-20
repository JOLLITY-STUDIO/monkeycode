; ============================================================
; data_tail.s - bank00 tail code + data ($9EEF-$9FFF)
; Scheduler tail, stack save/restore, $FF padding
; ============================================================

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
