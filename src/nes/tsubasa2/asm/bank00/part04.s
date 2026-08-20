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
    TAX                        ; $8EF0
    LDA $005C                  ; $8EF1
    STA $0067                  ; $8EF3
    LDA $005D                  ; $8EF5
    STA $0068                  ; $8EF7
    LDA $005B                  ; $8EF9
    AND #$01                   ; $8EFB
    TAY                        ; $8EFD
    STA $00EB                  ; $8EFE
    TXA                        ; $8F00
    STA $00EA                  ; $8F01
    ASL                        ; $8F03
    ROL $00EB                  ; $8F04
    ASL                        ; $8F06
    ROL $00EB                  ; $8F07
    ASL                        ; $8F09
    ROL $00EB                  ; $8F0A
    ASL                        ; $8F0C
    ROL $00EB                  ; $8F0D
    CLC                        ; $8F0F
    ADC $00EA                  ; $8F10
    STA $00EA                  ; $8F12
    TYA                        ; $8F14
    ADC $00EB                  ; $8F15
    STA $00EB                  ; $8F17
    LDA $00EA                  ; $8F19
    CLC                        ; $8F1B
    ADC #$00                   ; $8F1C
    STA $00EA                  ; $8F1E
    LDA $00EB                  ; $8F20
    ADC #$A0                   ; $8F22
    STA $00EB                  ; $8F24
    LDX #$08                   ; $8F26
    JSR $C4B9                  ; $8F28
    LDY #$00                   ; $8F2B
    LDA ($00EA),Y              ; $8F2D
    STA $00E7                  ; $8F2F
    JSR $8FD1                  ; $8F31
    INC $00EA                  ; $8F34
    BNE $8F3A                  ; $8F36
    INC $00EB                  ; $8F38
    LDA #$04                   ; $8F3A
    STA $00E8                  ; $8F3C
    .byte $A4,$67
    LDX $0068                  ; $8F40
    LDA #$04                   ; $8F42
    JSR $9B28                  ; $8F44
    LDY #$00                   ; $8F47
    LDA ($00EA),Y              ; $8F49
    STA $05E8,X                ; $8F4B
    INX                        ; $8F4E
    INY                        ; $8F4F
    CPY #$04                   ; $8F50
    BNE $8F49                  ; $8F52
    JSR $9B5E                  ; $8F54
    DEC $00E8                  ; $8F57
    BEQ $8FCB                  ; $8F59
    LDA $00EA                  ; $8F5B
    CLC                        ; $8F5D
    ADC #$04                   ; $8F5E
    STA $00EA                  ; $8F60
    LDA $00EB                  ; $8F62
    ADC #$00                   ; $8F64
    STA $00EB                  ; $8F66
    LDA $0067                  ; $8F68
    CLC                        ; $8F6A
    ADC #$20                   ; $8F6B
    STA $0067                  ; $8F6D
    LDA $0068                  ; $8F6F
    ADC #$00                   ; $8F71
    STA $0068                  ; $8F73
    AND #$03                   ; $8F75
    CMP #$03                   ; $8F77
    BNE $8F3E                  ; $8F79
    LDA $0067                  ; $8F7B
    CMP #$C0                   ; $8F7D
    BCC $8F3E                  ; $8F7F
    LDA $0067                  ; $8F81
    SEC                        ; $8F83
    SBC #$C0                   ; $8F84
    STA $0067                  ; $8F86
    LDA $0068                  ; $8F88
    SBC #$03                   ; $8F8A
    STA $0068                  ; $8F8C
    JSR $9049                  ; $8F8E
    LDA #$01                   ; $8F91
    JSR $9B28                  ; $8F93
    LDA $0067                  ; $8F96
    LSR                        ; $8F98
    LSR                        ; $8F99
    AND #$07                   ; $8F9A
    TAY                        ; $8F9C
    LDA $0062                  ; $8F9D
    AND #$C0                   ; $8F9F
    CMP #$40                   ; $8FA1
    BEQ $8FB8                  ; $8FA3
    LDA $00E7                  ; $8FA5
    LSR                        ; $8FA7
    LSR                        ; $8FA8
    LSR                        ; $8FA9
    LSR                        ; $8FAA
    STA $05E8,X                ; $8FAB
    STA $064A,Y                ; $8FAE
    INX                        ; $8FB1
    JSR $9B5E                  ; $8FB2
    JMP $8F3E                  ; $8FB5
    LDA $00E7                  ; $8FB8
    LSR                        ; $8FBA
    LSR                        ; $8FBB
    LSR                        ; $8FBC
    LSR                        ; $8FBD
    ORA $064A,Y                ; $8FBE
    STA $05E8,X                ; $8FC1
    INX                        ; $8FC4
    JSR $9B5E                  ; $8FC5
    JMP $8F3E                  ; $8FC8
    LDX #$07                   ; $8FCB
    JSR $C4B9                  ; $8FCD
    RTS                        ; $8FD0
    JSR $9049                  ; $8FD1
    BIT $0067                  ; $8FD4
    BVC $903A                  ; $8FD6
    STY $00E8                  ; $8FD8
    STX $00E9                  ; $8FDA
    LDA #$01                   ; $8FDC
    JSR $9B28                  ; $8FDE
    LDA $0067                  ; $8FE1
    LSR                        ; $8FE3
    LSR                        ; $8FE4
    AND #$07                   ; $8FE5
    TAY                        ; $8FE7
    LDA $0062                  ; $8FE8
    AND #$C0                   ; $8FEA
    CMP #$40                   ; $8FEC
    BEQ $900B                  ; $8FEE
    .byte $A5,$E7,$0A,$0A,$0A,$0A,$19,$4A,$06,$9D,$E8,$05,$E8,$A5,$E7,$4A
    .byte $4A,$4A,$4A,$99,$4A,$06,$85,$E6,$4C,$25,$90
    LDA $00E7                  ; $900B
    ASL                        ; $900D
    ASL                        ; $900E
    ASL                        ; $900F
    ASL                        ; $9010
    PHA                        ; $9011
    STA $05E8,X                ; $9012
    INX                        ; $9015
    LDA $00E7                  ; $9016
    LSR                        ; $9018
    LSR                        ; $9019
    LSR                        ; $901A
    LSR                        ; $901B
    ORA $064A,Y                ; $901C
    STA $00E6                  ; $901F
    PLA                        ; $9021
    STA $064A,Y                ; $9022
    JSR $9B5E                  ; $9025
    LDA $00E8                  ; $9028
    CLC                        ; $902A
    ADC #$08                   ; $902B
    TAY                        ; $902D
    LDX $00E9                  ; $902E
    LDA #$01                   ; $9030
    JSR $9B28                  ; $9032
    LDA $00E6                  ; $9035
    JMP $9041                  ; $9037
    LDA #$01                   ; $903A
    JSR $9B28                  ; $903C
    LDA $00E7                  ; $903F
    .byte $9D,$E8,$05
    INX                        ; $9044
    JSR $9B5E                  ; $9045
    RTS                        ; $9048
    LDA $0067                  ; $9049
    AND #$9C                   ; $904B
    LSR                        ; $904D
    LSR                        ; $904E
    STA $00E6                  ; $904F
    AND #$20                   ; $9051
    LSR                        ; $9053
    LSR                        ; $9054
    ORA $00E6                  ; $9055
    AND #$0F                   ; $9057
    STA $00E6                  ; $9059
    LDA $0068                  ; $905B
    ASL                        ; $905D
    ASL                        ; $905E
    ASL                        ; $905F
    ASL                        ; $9060
    AND #$30                   ; $9061
    CLC                        ; $9063
    ADC #$C0                   ; $9064
    ORA $00E6                  ; $9066
    TAY                        ; $9068
    LDA $0068                  ; $9069
    AND #$FC                   ; $906B
    ADC #$03                   ; $906D
    TAX                        ; $906F
    RTS                        ; $9070
    LDA #$20                   ; $9071
    JMP $9078                  ; $9073
    LDA #$24                   ; $9076
    .byte $85,$E7
    LDA #$00                   ; $907A
    STA $00E6                  ; $907C
    LDY #$10                   ; $907E
    LDX #$20                   ; $9080
    JMP $98E8                  ; $9082
    LDA #$00                   ; $9085
    LDY #$01                   ; $9087
    STA $0467,Y                ; $9089
    INY                        ; $908C
    BNE $9089                  ; $908D
    LDA #$00                   ; $908F
    STA $0097                  ; $9091
    LDY #$01                   ; $9093
    LDA ($004D),Y              ; $9095
    STA $00EC                  ; $9097
    LDA $004D                  ; $9099
    CLC                        ; $909B
    ADC #$02                   ; $909C
    STA $004D                  ; $909E
    LDA $004E                  ; $90A0
    ADC #$00                   ; $90A2
    STA $004E                  ; $90A4
    LDA #$68                   ; $90A6
    STA $0094                  ; $90A8
    LDA #$05                   ; $90AA
    STA $0095                  ; $90AC
    .byte $A6,$25
    STX $00ED                  ; $90B0
    LDY #$00                   ; $90B2
    LDA ($004D),Y              ; $90B4
    TAY                        ; $90B6
    LDX #$09                   ; $90B7
    CMP #$6D                   ; $90B9
    BCC $90C2                  ; $90BB
    SEC                        ; $90BD
    SBC #$6D                   ; $90BE
    TAY                        ; $90C0
    INX                        ; $90C1
    JSR $C4B9                  ; $90C2
    TYA                        ; $90C5
    ASL                        ; $90C6
    TAY                        ; $90C7
    LDA #$00                   ; $90C8
    ADC #$00                   ; $90CA
    TAX                        ; $90CC
    TYA                        ; $90CD
    CLC                        ; $90CE
    ADC #$00                   ; $90CF
    STA $0092                  ; $90D1
    TXA                        ; $90D3
    ADC #$A0                   ; $90D4
    STA $0093                  ; $90D6
    LDY #$00                   ; $90D8
    LDA ($0092),Y              ; $90DA
    TAX                        ; $90DC
    INY                        ; $90DD
    LDA ($0092),Y              ; $90DE
    STA $0093                  ; $90E0
    STX $0092                  ; $90E2
    LDY #$00                   ; $90E4
    LDA $978B,Y                ; $90E6
    STA ($0094),Y              ; $90E9
    INY                        ; $90EB
    CPY #$20                   ; $90EC
    BNE $90E6                  ; $90EE
    LDA $0025                  ; $90F0
    SEC                        ; $90F2
    SBC #$09                   ; $90F3
    LDY #$00                   ; $90F5
    ORA ($0094),Y              ; $90F7
    STA ($0094),Y              ; $90F9
    LDY #$00                   ; $90FB
    LDA ($0092),Y              ; $90FD
    STA $0049                  ; $90FF
    INC $0092                  ; $9101
    BNE $9107                  ; $9103
    INC $0093                  ; $9105
    LDY #$02                   ; $9107
    LDA $0092                  ; $9109
    STA ($0094),Y              ; $910B
    INY                        ; $910D
    LDA $0093                  ; $910E
    STA ($0094),Y              ; $9110
    LDX $00ED                  ; $9112
    JSR $C4B9                  ; $9114
    INC $004D                  ; $9117
    BNE $911D                  ; $9119
    .byte $E6,$4E
    LDA $0094                  ; $911D
    CLC                        ; $911F
    ADC #$20                   ; $9120
    STA $0094                  ; $9122
    LDA $0095                  ; $9124
    ADC #$00                   ; $9126
    STA $0095                  ; $9128
    DEC $00EC                  ; $912A
    BEQ $9131                  ; $912C
    JMP $90AE                  ; $912E
    LDX #$11                   ; $9131
    LDA #$47                   ; $9133
    STA $0000,X                ; $9135
    LDA #$91                   ; $9137
    STA $0001,X                ; $9139
    LDY #$C8                   ; $913B
    LDA #$00                   ; $913D
    JSR $9F69                  ; $913F
    RTS                        ; $9142
    .byte $A9,$01
    JSR $9FA8                  ; $9145
    LDA #$68                   ; $9148
    STA $0094                  ; $914A
    LDA #$05                   ; $914C
    STA $0095                  ; $914E
    LDA #$04                   ; $9150
    STA $0096                  ; $9152
    .byte $A0,$00
    LDA ($0094),Y              ; $9156
    BMI $915D                  ; $9158
    JMP $94C1                  ; $915A
    TAX                        ; $915D
    LDY #$04                   ; $915E
    JSR $974A                  ; $9160
    LDY #$06                   ; $9163
    JSR $974A                  ; $9165
    TXA                        ; $9168
    AND #$10                   ; $9169
    BNE $91A6                  ; $916B
    TXA                        ; $916D
    AND #$20                   ; $916E
    BNE $9175                  ; $9170
    JMP $91F3                  ; $9172
    LDX #$04                   ; $9175
    LDY #$0A                   ; $9177
    JSR $975B                  ; $9179
    LDA $009A                  ; $917C
    STA $00E6                  ; $917E
    LDY #$04                   ; $9180
    JSR $974A                  ; $9182
    LDA $009A                  ; $9185
    SEC                        ; $9187
    SBC $00E6                  ; $9188
    STA $00E6                  ; $918A
