; ============================================================
; code_main.s - bank02 main routines
; ============================================================

    LDA #$00                   ; $8000
    STA $2003                  ; $8002
    LDA #$02                   ; $8005
    STA $4014                  ; $8007
    LDA $0628                  ; $800A
    BEQ $805D                  ; $800D
    BIT $0629                  ; $800F
    BVS $805D                  ; $8012
    LDA #$00                   ; $8014
    STA $2001                  ; $8016
    LDX #$00                   ; $8019
    LDY #$80                   ; $801B
    LDA $05E8,X                ; $801D
    BPL $8026                  ; $8020
    AND #$3F                   ; $8022
    LDY #$84                   ; $8024
    STY $2000                  ; $8026
    TAY                        ; $8029
    LDA $05EA,X                ; $802A
    STA $2006                  ; $802D
    LDA $05E9,X                ; $8030
    STA $2006                  ; $8033
    LDA $05EB,X                ; $8036
    STA $2007                  ; $8039
    INX                        ; $803C
    DEY                        ; $803D
    BNE $8036                  ; $803E
    INX                        ; $8040
    INX                        ; $8041
    INX                        ; $8042
    LDA $05E8,X                ; $8043
    BNE $801B                  ; $8046
    LDA #$00                   ; $8048
    STA $0628                  ; $804A
    LDA #$3F                   ; $804D
    STA $2006                  ; $804F
    LDA #$00                   ; $8052
    STA $2006                  ; $8054
    STA $2006                  ; $8057
    STA $2006                  ; $805A
    LDA $0021                  ; $805D
    STA $2001                  ; $805F
    LDA $0079                  ; $8062
    BPL $8073                  ; $8064
    .byte $A5,$7B,$8D,$06,$20,$A5,$7A,$8D,$06,$20,$4C,$91,$A0
    LSR $0020                  ; $8073
    LSR $0020                  ; $8075
    LDA $0045                  ; $8077
    LSR                        ; $8079
    ROL $0020                  ; $807A
    LDA $007B                  ; $807C
    LSR                        ; $807E
    ROL $0020                  ; $807F
    LDA $0020                  ; $8081
    STA $2000                  ; $8083
    LDA $007A                  ; $8086
    STA $2005                  ; $8088
    LDX $0044                  ; $808B
    DEX                        ; $808D
    STX $2005                  ; $808E
    LDY #$16                   ; $8091
    JSR $A1CB                  ; $8093
    LDA $0079                  ; $8096
    BEQ $80AA                  ; $8098
    ASL                        ; $809A
    STA $C000                  ; $809B
    STA $C001                  ; $809E
    STA $E001                  ; $80A1
    LDA #$04                   ; $80A4
    STA $0078                  ; $80A6
    BPL $80AF                  ; $80A8
    STA $E000                  ; $80AA
    STA $0078                  ; $80AD
    LDA #$02                   ; $80AF
    STA $8000                  ; $80B1
    LDA $009E                  ; $80B4
    STA $8001                  ; $80B6
    LDA #$03                   ; $80B9
    STA $8000                  ; $80BB
    LDA $009F                  ; $80BE
    STA $8001                  ; $80C0
    LDA #$04                   ; $80C3
    STA $8000                  ; $80C5
    LDA $00A0                  ; $80C8
    STA $8001                  ; $80CA
    LDA #$05                   ; $80CD
    STA $8000                  ; $80CF
    LDA $00A1                  ; $80D2
    STA $8001                  ; $80D4
    LDX #$02                   ; $80D7
    LDA #$04                   ; $80D9
    STA $0040                  ; $80DB
    LDA $001B,X                ; $80DD
    STA $0041                  ; $80DF
    LDA #$01                   ; $80E1
    STA $4016                  ; $80E3
    LDA #$00                   ; $80E6
    STA $4016                  ; $80E8
    LDY #$08                   ; $80EB
    LDA $4015,X                ; $80ED
    LSR                        ; $80F0
    ROL $003F                  ; $80F1
    AND #$01                   ; $80F3
    ORA $003F                  ; $80F5
    STA $003F                  ; $80F7
    DEY                        ; $80F9
    BNE $80ED                  ; $80FA
    CMP $0041                  ; $80FC
    BEQ $8107                  ; $80FE
    DEC $0040                  ; $8100
    BNE $80DF                  ; $8102
    .byte $4C,$13,$A1
    LDA $001B,X                ; $8107
    EOR $003F                  ; $8109
    AND $003F                  ; $810B
    STA $001D,X                ; $810D
    LDA $003F                  ; $810F
    STA $001B,X                ; $8111
    DEX                        ; $8113
    BNE $80DD                  ; $8114
    CLC                        ; $8116
    LDA $00E1                  ; $8117
    ADC #$83                   ; $8119
    STA $00E1                  ; $811B
    LDA $00E2                  ; $811D
    ADC #$0D                   ; $811F
    STA $00E2                  ; $8121
    LDA $00E3                  ; $8123
    ADC #$11                   ; $8125
    STA $00E3                  ; $8127
    LDA #$00                   ; $8129
    STA $0046                  ; $812B
    STA $0047                  ; $812D
    LDA $001B                  ; $812F
    ORA #$80                   ; $8131
    STA $001B                  ; $8133
    INC $003A                  ; $8135
    RTS                        ; $8137
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
    STA $E000                  ; $8160
    STA $E001                  ; $8163
    LDX $0078                  ; $8166
    LDA $0078,X                ; $8168
    BPL $818D                  ; $816A
    LDY #$06                   ; $816C
    DEY                        ; $816E
    BNE $816E                  ; $816F
    LDA $0079,X                ; $8171
    LDY $007A,X                ; $8173
    STY $2006                  ; $8175
    STA $2006                  ; $8178
    LDA $0020                  ; $817B
    AND #$FC                   ; $817D
    STA $2000                  ; $817F
    LDA #$00                   ; $8182
    STA $2005                  ; $8184
    STA $2005                  ; $8187
    JMP $A1A8                  ; $818A
    LDY #$02                   ; $818D
    DEY                        ; $818F
    BNE $818F                  ; $8190
    LSR $0020                  ; $8192
    LDA $007A,X                ; $8194
    LSR                        ; $8196
    ROL $0020                  ; $8197
    LDA $0020                  ; $8199
    STA $2000                  ; $819B
    LDA $0079,X                ; $819E
    STA $2005                  ; $81A0
    LDA #$00                   ; $81A3
    STA $2005                  ; $81A5
    .byte $B5,$78
    AND #$7F                   ; $81AA
    BEQ $81C0                  ; $81AC
    CPX #$13                   ; $81AE
    BEQ $81C0                  ; $81B0
    INC $0078                  ; $81B2
    INC $0078                  ; $81B4
    INC $0078                  ; $81B6
    ASL                        ; $81B8
    STA $C000                  ; $81B9
    STA $C001                  ; $81BC
    RTS                        ; $81BF
    STA $E000                  ; $81C0
    STA $0078                  ; $81C3
    LDY #$18                   ; $81C5
    JSR $A1CB                  ; $81C7
    RTS                        ; $81CA
    LDX $0078,Y                ; $81CB
    LDA #$00                   ; $81CD
    ORA $0022                  ; $81CF
    STA $8000                  ; $81D1
    STX $8001                  ; $81D4
    LDX $0079,Y                ; $81D7
    LDA #$01                   ; $81D9
    ORA $0022                  ; $81DB
    STA $8000                  ; $81DD
    STX $8001                  ; $81E0
    RTS                        ; $81E3
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$4C,$1B,$A2,$4C
    .byte $AF,$A2,$4C,$E8,$A2,$4C,$D8,$A3
    JMP $A855                  ; $820C
    JMP $A86E                  ; $820F
    JMP $A484                  ; $8212
    JMP $A8CE                  ; $8215
    .byte $4C,$FE,$A8,$A2,$FF
    TXS                        ; $821D
    PHA                        ; $821E
    LDA #$00                   ; $821F
    STA $A000                  ; $8221
    LDA $001B                  ; $8224
    ORA #$40                   ; $8226
    STA $001B                  ; $8228
    LDA #$00                   ; $822A
    LDY #$E8                   ; $822C
    STA $FF19,Y                ; $822E
    INY                        ; $8231
    BNE $822E                  ; $8232
    LDA #$00                   ; $8234
    LDY #$5A                   ; $8236
    STA $FFE0,Y                ; $8238
    INY                        ; $823B
    BNE $8238                  ; $823C
    LDA #$98                   ; $823E
    LDX #$02                   ; $8240
    LDY #$68                   ; $8242
    STY $00EC                  ; $8244
    LDY #$04                   ; $8246
    JSR $AA06                  ; $8248
    LDA #$0F                   ; $824B
    LDY #$E0                   ; $824D
    STA $054A,Y                ; $824F
    INY                        ; $8252
    BNE $824F                  ; $8253
    JSR $9A43                  ; $8255
    LDA #$00                   ; $8258
    STA $004A                  ; $825A
    STA $004B                  ; $825C
    JSR $98A0                  ; $825E
    JSR $9B7F                  ; $8261
    LDA #$02                   ; $8264
    STA $008F                  ; $8266
    STA $0091                  ; $8268
    PLA                        ; $826A
    BEQ $8281                  ; $826B
    LDX #$01                   ; $826D
    LDA #$FF                   ; $826F
    STA $0000,X                ; $8271
    LDA #$7F                   ; $8273
    STA $0001,X                ; $8275
    LDY #$28                   ; $8277
    LDA #$00                   ; $8279
    JSR $9F69                  ; $827B
    JMP $A292                  ; $827E
    LDX #$01                   ; $8281
    LDA #$1E                   ; $8283
    STA $0000,X                ; $8285
    LDA #$80                   ; $8287
    STA $0001,X                ; $8289
    LDY #$28                   ; $828B
    LDA #$00                   ; $828D
    JSR $9F69                  ; $828F
    .byte $A2,$15
    LDA #$EC                   ; $8294
    STA $0000,X                ; $8296
    LDA #$82                   ; $8298
    STA $0001,X                ; $829A
    LDY #$F0                   ; $829C
    LDA #$00                   ; $829E
    JSR $9F69                  ; $82A0
    LDA $0020                  ; $82A3
    ORA #$80                   ; $82A5
    STA $0020                  ; $82A7
    STA $2000                  ; $82A9
    JMP $9EED                  ; $82AC
    .byte $20,$F0,$99
    JSR $98A0                  ; $82B2
    JSR $9B7F                  ; $82B5
    LDA $0020                  ; $82B8
    AND #$7F                   ; $82BA
    STA $2000                  ; $82BC
    STA $0020                  ; $82BF
    STA $E000                  ; $82C1
    LDA #$00                   ; $82C4
    LDY #$E8                   ; $82C6
    STA $FF19,Y                ; $82C8
    INY                        ; $82CB
    BNE $82C8                  ; $82CC
    LDA #$00                   ; $82CE
    LDY #$5A                   ; $82D0
    STA $FFE0,Y                ; $82D2
    INY                        ; $82D5
    BNE $82D2                  ; $82D6
    LDA #$98                   ; $82D8
    LDX #$02                   ; $82DA
    LDY #$68                   ; $82DC
    STY $00EC                  ; $82DE
    LDY #$04                   ; $82E0
    JSR $AA06                  ; $82E2
    JMP $C557                  ; $82E5
    .byte $A5,$57
    BMI $8338                  ; $82EA
    STA $00ED                  ; $82EC
    LDA #$00                   ; $82EE
    LDY #$FA                   ; $82F0
    STA $FFEC,Y                ; $82F2
    INY                        ; $82F5
    BNE $82F2                  ; $82F6
    .byte $A9,$01
    JSR $9FA8                  ; $82FA
    LDY $00ED                  ; $82FD
