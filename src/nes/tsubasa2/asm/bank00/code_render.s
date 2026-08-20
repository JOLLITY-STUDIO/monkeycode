; ============================================================
; code_render.s - bank00 render routines ($8EF0-$968F)
; Tile rendering, sprite setup, map drawing
; ============================================================

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
    LDX #$06                   ; $918C
    LDY #$0E                   ; $918E
    JSR $975B                  ; $9190
    LDA $009C                  ; $9193
    STA $00E8                  ; $9195
    LDY #$06                   ; $9197
    JSR $974A                  ; $9199
    LDA $009C                  ; $919C
    SEC                        ; $919E
    SBC $00E8                  ; $919F
    STA $00E8                  ; $91A1
    JMP $91B4                  ; $91A3
    LDA #$00                   ; $91A6
    SEC                        ; $91A8
    SBC $0046                  ; $91A9
    STA $00E6                  ; $91AB
    LDA #$00                   ; $91AD
    SEC                        ; $91AF
    SBC $0047                  ; $91B0
    STA $00E8                  ; $91B2
    .byte $A0,$10
    LDA ($0094),Y              ; $91B6
    TAX                        ; $91B8
    INY                        ; $91B9
    LDA ($0094),Y              ; $91BA
    LSR                        ; $91BC
    LSR                        ; $91BD
    TAY                        ; $91BE
    LDA $00E6                  ; $91BF
    CLC                        ; $91C1
    ADC $0468,X                ; $91C2
    STA $0468,X                ; $91C5
    ROR                        ; $91C8
    EOR $00E6                  ; $91C9
    BPL $91D5                  ; $91CB
    LDA $046A,X                ; $91CD
    EOR #$08                   ; $91D0
    STA $046A,X                ; $91D2
    LDA $00E8                  ; $91D5
    CLC                        ; $91D7
    ADC $046B,X                ; $91D8
    STA $046B,X                ; $91DB
    ROR                        ; $91DE
    EOR $00E8                  ; $91DF
    BPL $91EB                  ; $91E1
    LDA $046A,X                ; $91E3
    EOR #$04                   ; $91E6
    STA $046A,X                ; $91E8
    TXA                        ; $91EB
    CLC                        ; $91EC
    ADC #$04                   ; $91ED
    TAX                        ; $91EF
    DEY                        ; $91F0
    BNE $91BF                  ; $91F1
    .byte $A0,$01
    LDA ($0094),Y              ; $91F5
    SEC                        ; $91F7
    SBC #$01                   ; $91F8
    STA ($0094),Y              ; $91FA
    BEQ $9201                  ; $91FC
    JMP $94C1                  ; $91FE
    LDY #$00                   ; $9201
    LDA ($0094),Y              ; $9203
    AND #$01                   ; $9205
    CLC                        ; $9207
    ADC #$09                   ; $9208
    TAX                        ; $920A
    JSR $C4B9                  ; $920B
    LDY #$02                   ; $920E
    LDA ($0094),Y              ; $9210
    STA $0092                  ; $9212
    INY                        ; $9214
    LDA ($0094),Y              ; $9215
    STA $0093                  ; $9217
    LDY #$00                   ; $9219
    LDA ($0094),Y              ; $921B
    AND #$02                   ; $921D
    BEQ $9224                  ; $921F
    JMP $9459                  ; $9221
    .byte $A0,$00
    LDA ($0092),Y              ; $9226
    BMI $9241                  ; $9228
    INY                        ; $922A
    ASL                        ; $922B
    STA ($0094),Y              ; $922C
    LDY #$02                   ; $922E
    LDA $0092                  ; $9230
    CLC                        ; $9232
    ADC #$01                   ; $9233
    STA ($0094),Y              ; $9235
    INY                        ; $9237
    LDA $0093                  ; $9238
    ADC #$00                   ; $923A
    STA ($0094),Y              ; $923C
    JMP $94C1                  ; $923E
    CMP #$A0                   ; $9241
    BCS $9258                  ; $9243
    CLC                        ; $9245
    ADC #$20                   ; $9246
    STA $00E7                  ; $9248
    LDY #$01                   ; $924A
    LDA ($0092),Y              ; $924C
    STA $00E6                  ; $924E
    JSR $94D8                  ; $9250
    LDA #$02                   ; $9253
    JMP $94AE                  ; $9255
    CMP #$C0                   ; $9258
    BCS $9268                  ; $925A
    TAX                        ; $925C
    LDY #$01                   ; $925D
    LDA ($0092),Y              ; $925F
    STA $0092                  ; $9261
    STX $0093                  ; $9263
    JMP $9224                  ; $9265
    CMP #$E0                   ; $9268
    BCS $92A0                  ; $926A
    .byte $85,$E7,$A0,$13,$B1,$94,$C9,$03,$B0,$FE,$AA,$18,$69,$01,$91,$94
    .byte $8A,$0A,$18,$69,$18,$A8,$A5,$92,$18,$69,$02,$91,$94,$C8,$A5,$93
    .byte $69,$00,$91,$94,$A0,$01,$B1,$92,$85,$92,$A5,$E7,$38,$E9,$20,$85
    .byte $93,$4C,$24,$92
    CMP #$F0                   ; $92A0
    BCS $92D7                  ; $92A2
    TAX                        ; $92A4
    LDY #$13                   ; $92A5
    LDA ($0094),Y              ; $92A7
    CMP #$04                   ; $92A9
    BCS $92AB                  ; $92AB
    CLC                        ; $92AD
    ADC #$01                   ; $92AE
    STA ($0094),Y              ; $92B0
    CLC                        ; $92B2
    ADC #$13                   ; $92B3
    TAY                        ; $92B5
    TXA                        ; $92B6
    SEC                        ; $92B7
    SBC #$E0                   ; $92B8
    STA ($0094),Y              ; $92BA
    TYA                        ; $92BC
    ASL                        ; $92BD
    SEC                        ; $92BE
    SBC #$10                   ; $92BF
    TAY                        ; $92C1
    LDA $0092                  ; $92C2
    CLC                        ; $92C4
    ADC #$01                   ; $92C5
    STA $0092                  ; $92C7
    STA ($0094),Y              ; $92C9
    INY                        ; $92CB
    LDA $0093                  ; $92CC
    ADC #$00                   ; $92CE
    STA $0093                  ; $92D0
    STA ($0094),Y              ; $92D2
    JMP $9224                  ; $92D4
    SEC                        ; $92D7
    SBC #$F0                   ; $92D8
    ASL                        ; $92DA
    TAX                        ; $92DB
    LDA $92E6,X                ; $92DC
    PHA                        ; $92DF
    LDA $92E5,X                ; $92E0
    PHA                        ; $92E3
    RTS                        ; $92E4
    .byte $04,$93,$38,$93,$4F,$93,$5D,$93,$6B,$93,$8C,$93,$99,$93,$A6,$93
    .byte $29,$94,$34,$94,$41,$94,$8E,$94,$8E,$94,$8E,$94,$91,$94,$BB,$94
    LDY #$13                   ; $9305
    LDA ($0094),Y              ; $9307
    BEQ $9309                  ; $9309
    TAX                        ; $930B
    CLC                        ; $930C
    ADC #$13                   ; $930D
    TAY                        ; $930F
    LDA ($0094),Y              ; $9310
    SEC                        ; $9312
    SBC #$01                   ; $9313
    STA ($0094),Y              ; $9315
    BEQ $932B                  ; $9317
    TXA                        ; $9319
    ASL                        ; $931A
    CLC                        ; $931B
    ADC #$16                   ; $931C
    TAY                        ; $931E
    LDA ($0094),Y              ; $931F
    STA $0092                  ; $9321
    INY                        ; $9323
    LDA ($0094),Y              ; $9324
    STA $0093                  ; $9326
    JMP $9224                  ; $9328
    LDY #$13                   ; $932B
    LDA ($0094),Y              ; $932D
    SEC                        ; $932F
    SBC #$01                   ; $9330
    STA ($0094),Y              ; $9332
    LDA #$01                   ; $9334
    JMP $94AE                  ; $9336
    LDY #$01                   ; $9339
    LDA ($0092),Y              ; $933B
    LDY #$04                   ; $933D
    JSR $9735                  ; $933F
    LDY #$02                   ; $9342
    LDA ($0092),Y              ; $9344
    LDY #$06                   ; $9346
    JSR $9735                  ; $9348
    LDA #$03                   ; $934B
    JMP $94AE                  ; $934D
    .byte $A0,$01,$B1,$92,$A0,$04,$20,$35,$97,$A9,$02,$4C,$AE,$94,$A0,$01
    .byte $B1,$92,$A0,$06,$20,$35,$97,$A9,$02,$4C,$AE,$94,$A0,$01,$B1,$92
    .byte $91,$94,$A5,$92,$18,$69,$02,$85,$92,$A5,$93,$69,$00,$85,$93,$A0
    .byte $02,$A5,$92,$91,$94,$C8,$A5,$93,$91,$94,$4C,$C1,$94
    LDY #$00                   ; $938D
    LDA ($0094),Y              ; $938F
    ORA #$40                   ; $9391
    STA ($0094),Y              ; $9393
    LDA #$01                   ; $9395
    JMP $94AE                  ; $9397
    LDY #$00                   ; $939A
    LDA ($0094),Y              ; $939C
    AND #$BF                   ; $939E
    STA ($0094),Y              ; $93A0
    LDA #$01                   ; $93A2
    JMP $94AE                  ; $93A4
    LDY #$01                   ; $93A7
    LDA ($0092),Y              ; $93A9
    LSR                        ; $93AB
    LSR                        ; $93AC
    LSR                        ; $93AD
    LSR                        ; $93AE
    LSR                        ; $93AF
    LDY #$09                   ; $93B0
    STA ($0094),Y              ; $93B2
    AND #$04                   ; $93B4
    BNE $93C7                  ; $93B6
    ROR                        ; $93B8
    DEY                        ; $93B9
    STA ($0094),Y              ; $93BA
    LDY #$02                   ; $93BC
    LDA ($0092),Y              ; $93BE
    LDY #$0A                   ; $93C0
    STA ($0094),Y              ; $93C2
    JMP $93DE                  ; $93C4
    LDA ($0094),Y              ; $93C7
    ORA #$F8                   ; $93C9
    STA ($0094),Y              ; $93CB
    LDA #$00                   ; $93CD
    ROR                        ; $93CF
    DEY                        ; $93D0
    STA ($0094),Y              ; $93D1
    LDY #$02                   ; $93D3
    LDA #$00                   ; $93D5
    SEC                        ; $93D7
    SBC ($0092),Y              ; $93D8
    LDY #$0A                   ; $93DA
    STA ($0094),Y              ; $93DC
    .byte $A0,$01
    LDA ($0092),Y              ; $93E0
    AND #$0F                   ; $93E2
    LSR                        ; $93E4
    LDY #$0D                   ; $93E5
    STA ($0094),Y              ; $93E7
    AND #$04                   ; $93E9
    BNE $93FC                  ; $93EB
    ROR                        ; $93ED
    DEY                        ; $93EE
    STA ($0094),Y              ; $93EF
    LDY #$03                   ; $93F1
    LDA ($0092),Y              ; $93F3
    LDY #$0E                   ; $93F5
    STA ($0094),Y              ; $93F7
    JMP $9413                  ; $93F9
    LDA ($0094),Y              ; $93FC
    ORA #$F8                   ; $93FE
    STA ($0094),Y              ; $9400
    LDA #$00                   ; $9402
    ROR                        ; $9404
    DEY                        ; $9405
    STA ($0094),Y              ; $9406
    LDY #$03                   ; $9408
    LDA #$00                   ; $940A
    SEC                        ; $940C
    SBC ($0092),Y              ; $940D
    LDY #$0E                   ; $940F
    STA ($0094),Y              ; $9411
    .byte $A9,$00
    LDY #$0B                   ; $9415
    STA ($0094),Y              ; $9417
    LDY #$0F                   ; $9419
    STA ($0094),Y              ; $941B
    LDY #$00                   ; $941D
    LDA ($0094),Y              ; $941F
    ORA #$20                   ; $9421
    STA ($0094),Y              ; $9423
    LDA #$04                   ; $9425
    JMP $94AE                  ; $9427
    .byte $A0,$01,$B1,$92,$85,$49,$A9,$02,$20,$AE,$94
    LDY #$00                   ; $9435
    LDA ($0094),Y              ; $9437
    ORA #$10                   ; $9439
    STA ($0094),Y              ; $943B
    LDA #$01                   ; $943D
    JMP $94AE                  ; $943F
    LDY #$00                   ; $9442
    LDA ($0094),Y              ; $9444
    ORA #$02                   ; $9446
    STA ($0094),Y              ; $9448
    LDA #$C0                   ; $944A
    STA $0099                  ; $944C
    LDY #$02                   ; $944E
    LDA $0092                  ; $9450
    STA ($0094),Y              ; $9452
    INY                        ; $9454
    LDA $0093                  ; $9455
    STA ($0094),Y              ; $9457
    .byte $24,$99
    BVC $947A                  ; $945B
    LDA $0099                  ; $945D
    AND #$01                   ; $945F
    SEC                        ; $9461
    ROL                        ; $9462
    TAY                        ; $9463
    LDA ($0092),Y              ; $9464
    STA $00E6                  ; $9466
    INY                        ; $9468
    LDA ($0092),Y              ; $9469
    STA $00E7                  ; $946B
    JSR $94D8                  ; $946D
    LDA $0099                  ; $9470
    CMP #$FE                   ; $9472
    BEQ $9482                  ; $9474
    AND #$BF                   ; $9476
    STA $0099                  ; $9478
    LDA #$01                   ; $947A
    TAY                        ; $947C
    STA ($0094),Y              ; $947D
    JMP $94C1                  ; $947F
    .byte $A0,$00,$B1,$94,$29,$FD,$91,$94,$A9,$05,$4C,$AE,$94,$4C,$8F,$94
    .byte $A0,$13,$B1,$94,$F0,$FE,$38,$E9,$01,$91,$94,$0A,$18,$69,$18,$A8
    .byte $B1,$94,$85,$92,$C8,$B1,$94,$85,$93,$4C,$24,$92,$18
    ADC $0092                  ; $94AF
    STA $0092                  ; $94B1
    LDA $0093                  ; $94B3
    ADC #$00                   ; $94B5
    STA $0093                  ; $94B7
    JMP $9224                  ; $94B9
    LDA #$00                   ; $94BC
    TAY                        ; $94BE
    STA ($0094),Y              ; $94BF
    .byte $A5,$94
    CLC                        ; $94C3
    ADC #$20                   ; $94C4
    STA $0094                  ; $94C6
    LDA $0095                  ; $94C8
    ADC #$00                   ; $94CA
    STA $0095                  ; $94CC
    DEC $0096                  ; $94CE
    BEQ $94D5                  ; $94D0
    JMP $9154                  ; $94D2
    JMP $9143                  ; $94D5
    LDY #$00                   ; $94D8
    LDA ($00E6),Y              ; $94DA
    ORA #$80                   ; $94DC
    STA $009E                  ; $94DE
    INY                        ; $94E0
    LDA ($00E6),Y              ; $94E1
    STA $009F                  ; $94E3
    LDY #$02                   ; $94E5
    LDA ($00E6),Y              ; $94E7
    STA $00A0                  ; $94E9
    INY                        ; $94EB
    LDA ($00E6),Y              ; $94EC
    STA $00A1                  ; $94EE
    LDA $00E6                  ; $94F0
    CLC                        ; $94F2
    ADC #$04                   ; $94F3
    STA $00E6                  ; $94F5
    LDA $00E7                  ; $94F7
    ADC #$00                   ; $94F9
    STA $00E7                  ; $94FB
    LDY #$00                   ; $94FD
    LDA ($0094),Y              ; $94FF
    LDY #$10                   ; $9501
    AND #$08                   ; $9503
    BNE $950B                  ; $9505
    LDA $0097                  ; $9507
    STA ($0094),Y              ; $9509
    LDA ($0094),Y              ; $950B
    STA $0098                  ; $950D
    LDA #$00                   ; $950F
    STA $00E8                  ; $9511
    STA $00E9                  ; $9513
    .byte $A0,$00
    LDA ($00E6),Y              ; $9517
    BMI $9589                  ; $9519
    LDX $0098                  ; $951B
    AND #$3C                   ; $951D
    ASL                        ; $951F
    ASL                        ; $9520
    BMI $9533                  ; $9521
    LSR                        ; $9523
    CLC                        ; $9524
    ADC $009A                  ; $9525
    STA $0468,X                ; $9527
    STA $00EA                  ; $952A
    LDA #$00                   ; $952C
    ADC $009B                  ; $952E
    JMP $9541                  ; $9530
    SEC                        ; $9533
    ROR                        ; $9534
    CLC                        ; $9535
    ADC $009A                  ; $9536
    STA $0468,X                ; $9538
    STA $00EA                  ; $953B
    LDA #$00                   ; $953D
    SBC $009B                  ; $953F
    .byte $29,$01
    STA $00EB                  ; $9543
    ASL                        ; $9545
    STA $00EC                  ; $9546
    LDA $00E8                  ; $9548
    STA $046B,X                ; $954A
    LDA $00E9                  ; $954D
    AND #$01                   ; $954F
    ORA $00EC                  ; $9551
    ASL                        ; $9553
    ASL                        ; $9554
    STA $00EC                  ; $9555
    LDY #$00                   ; $9557
    LDA ($00E6),Y              ; $9559
    EOR ($0094),Y              ; $955B
    AND #$40                   ; $955D
    ORA $00EC                  ; $955F
    STA $00EC                  ; $9561
    LDA ($00E6),Y              ; $9563
    AND #$03                   ; $9565
    ORA $00EC                  ; $9567
    STA $046A,X                ; $9569
    INY                        ; $956C
    LDA ($00E6),Y              ; $956D
    STA $0469,X                ; $956F
    LDA $0098                  ; $9572
    CLC                        ; $9574
    ADC #$04                   ; $9575
    STA $0098                  ; $9577
    LDA $00E6                  ; $9579
    CLC                        ; $957B
    ADC #$02                   ; $957C
    STA $00E6                  ; $957E
    LDA $00E7                  ; $9580
    ADC #$00                   ; $9582
    STA $00E7                  ; $9584
    JMP $9515                  ; $9586
    CMP #$A0                   ; $9589
    BCS $95AF                  ; $958B
    LDX #$00                   ; $958D
    ASL                        ; $958F
    ASL                        ; $9590
    ASL                        ; $9591
    STA $00EA                  ; $9592
    BPL $9597                  ; $9594
    DEX                        ; $9596
    STX $00EB                  ; $9597
    LDA $009A                  ; $9599
    CLC                        ; $959B
    ADC $00EA                  ; $959C
    STA $00EA                  ; $959E
    LDA $009B                  ; $95A0
    ADC $00EB                  ; $95A2
    STA $00EB                  ; $95A4
    INC $00E6                  ; $95A6
    BNE $95AC                  ; $95A8
    .byte $E6,$E7
    JMP $9515                  ; $95AC
    CMP #$C0                   ; $95AF
    BCS $95E5                  ; $95B1
    TAX                        ; $95B3
    LDY #$00                   ; $95B4
    LDA ($0094),Y              ; $95B6
    ASL                        ; $95B8
    BPL $95C2                  ; $95B9
    TXA                        ; $95BB
    EOR #$FF                   ; $95BC
    CLC                        ; $95BE
    ADC #$01                   ; $95BF
    TAX                        ; $95C1
    TXA                        ; $95C2
    LDX #$00                   ; $95C3
    ASL                        ; $95C5
    ASL                        ; $95C6
    ASL                        ; $95C7
    STA $00E8                  ; $95C8
    BPL $95CD                  ; $95CA
    DEX                        ; $95CC
    STX $00E9                  ; $95CD
    LDA $009C                  ; $95CF
    CLC                        ; $95D1
    ADC $00E8                  ; $95D2
    STA $00E8                  ; $95D4
    LDA $009D                  ; $95D6
    ADC $00E9                  ; $95D8
    STA $00E9                  ; $95DA
    INC $00E6                  ; $95DC
    BNE $95E2                  ; $95DE
    INC $00E7                  ; $95E0
    JMP $9515                  ; $95E2
    CMP #$D0                   ; $95E5
    BCC $95EC                  ; $95E7
    JMP $9684                  ; $95E9
    TAX                        ; $95EC
    LDY #$00                   ; $95ED
    LDA ($0094),Y              ; $95EF
    ASL                        ; $95F1
    BPL $95FB                  ; $95F2
    TXA                        ; $95F4
    EOR #$FF                   ; $95F5
    CLC                        ; $95F7
    ADC #$01                   ; $95F8
    TAX                        ; $95FA
    TXA                        ; $95FB
    AND #$08                   ; $95FC
    BNE $9608                  ; $95FE
    TXA                        ; $9600
    AND #$07                   ; $9601
    LDY #$00                   ; $9603
    JMP $960D                  ; $9605
    TXA                        ; $9608
    ORA #$F0                   ; $9609
    LDY #$FF                   ; $960B
    .byte $18
    ADC $00E8                  ; $960E
    LDX $0098                  ; $9610
    STA $046B,X                ; $9612
    TYA                        ; $9615
    ADC $00E9                  ; $9616
    AND #$01                   ; $9618
    STA $00EC                  ; $961A
    LDY #$01                   ; $961C
    LDA ($00E6),Y              ; $961E
    AND #$3C                   ; $9620
    LSR                        ; $9622
    LSR                        ; $9623
    TAY                        ; $9624
    AND #$08                   ; $9625
    BNE $9637                  ; $9627
    TYA                        ; $9629
    CLC                        ; $962A
    ADC $00EA                  ; $962B
    STA $0468,X                ; $962D
    LDA $00EB                  ; $9630
    ADC #$00                   ; $9632
    JMP $9645                  ; $9634
    TYA                        ; $9637
    CLC                        ; $9638
    ADC #$F0                   ; $9639
    CLC                        ; $963B
    ADC $00EA                  ; $963C
    STA $0468,X                ; $963E
    LDA $00EB                  ; $9641
    SBC #$00                   ; $9643
    .byte $29,$01
    ASL                        ; $9647
    ORA $00EC                  ; $9648
    ASL                        ; $964A
    ASL                        ; $964B
    STA $00EC                  ; $964C
    LDY #$01                   ; $964E
    LDA ($00E6),Y              ; $9650
    LDY #$00                   ; $9652
    EOR ($0094),Y              ; $9654
    AND #$40                   ; $9656
    ORA $00EC                  ; $9658
    STA $00EC                  ; $965A
    LDY #$01                   ; $965C
    LDA ($00E6),Y              ; $965E
    AND #$03                   ; $9660
    ORA $00EC                  ; $9662
    STA $046A,X                ; $9664
    INY                        ; $9667
    LDA ($00E6),Y              ; $9668
    STA $0469,X                ; $966A
    LDA $0098                  ; $966D
    CLC                        ; $966F
    ADC #$04                   ; $9670
    STA $0098                  ; $9672
    LDA $00E6                  ; $9674
    CLC                        ; $9676
    ADC #$03                   ; $9677
    STA $00E6                  ; $9679
    LDA $00E7                  ; $967B
    ADC #$00                   ; $967D
    STA $00E7                  ; $967F
    JMP $9515                  ; $9681
    .byte $38
    SBC #$F8                   ; $9685
    ASL                        ; $9687
    TAX                        ; $9688
    LDA $9693,X                ; $9689
    PHA                        ; $968C
    LDA $9692,X                ; $968D
    PHA                        ; $9690
    RTS                        ; $9691
