; ============================================================
; code_main.s - bank01 main routines
; ============================================================

    .byte $4C,$1E,$A0
    JMP $A10D                  ; $8003
    JMP $A4EB                  ; $8006
    JMP $A64C                  ; $8009
    .byte $4C,$D2,$A6
    JMP $AFC2                  ; $800F
    JMP $AF79                  ; $8012
    JMP $AF8A                  ; $8015
    JMP $B050                  ; $8018
    JMP $A39B                  ; $801B
    LDA $0448                  ; $801E
    LSR                        ; $8021
    LDA $0026                  ; $8022
    ROL                        ; $8024
    CLC                        ; $8025
    LDX $0446                  ; $8026
    CPX #$05                   ; $8029
    ROL                        ; $802B
    STA $0660                  ; $802C
    LDA $044D                  ; $802F
    ROR                        ; $8032
    LDA $00E1                  ; $8033
    ROR                        ; $8035
    AND #$B0                   ; $8036
    STA $0661                  ; $8038
    LDA #$00                   ; $803B
    PHA                        ; $803D
    JSR $B016                  ; $803E
    STY $00EC                  ; $8041
    STX $00ED                  ; $8043
    JSR $B02E                  ; $8045
    STA $00E7                  ; $8048
    JSR $B045                  ; $804A
    STY $00EA                  ; $804D
    STX $00EB                  ; $804F
    LDA $00EC                  ; $8051
    SEC                        ; $8053
    SBC $00EA                  ; $8054
    STA $00EC                  ; $8056
    LDA $00ED                  ; $8058
    SBC $00EB                  ; $805A
    STA $00ED                  ; $805C
    LDA $00E7                  ; $805E
    CLC                        ; $8060
    ADC #$01                   ; $8061
    JSR $B045                  ; $8063
    TYA                        ; $8066
    SEC                        ; $8067
    SBC $00EA                  ; $8068
    STA $00EA                  ; $806A
    TXA                        ; $806C
    SBC $00EB                  ; $806D
    STA $00EB                  ; $806F
    LSR $00EB                  ; $8071
    ROR $00EA                  ; $8073
    LSR $00EB                  ; $8075
    ROR $00EA                  ; $8077
    JSR $9E0C                  ; $8079
    PLA                        ; $807C
    TAX                        ; $807D
    LDA $00E7                  ; $807E
    ASL                        ; $8080
    ASL                        ; $8081
    ORA $00EC                  ; $8082
    STA $0656,X                ; $8084
    INX                        ; $8087
    TXA                        ; $8088
    CMP #$0A                   ; $8089
    BNE $803D                  ; $808B
    LDA $00E2                  ; $808D
    AND #$F0                   ; $808F
    STA $0663                  ; $8091
    LSR                        ; $8094
    LSR                        ; $8095
    LSR                        ; $8096
    LSR                        ; $8097
    ORA $0661                  ; $8098
    STA $00EB                  ; $809B
    JSR $A402                  ; $809D
    LDA $00EC                  ; $80A0
    STA $0662                  ; $80A2
    LDA $00ED                  ; $80A5
    AND #$0F                   ; $80A7
    ORA $0661                  ; $80A9
    STA $0661                  ; $80AC
    LDA #$00                   ; $80AF
    STA $00ED                  ; $80B1
    LDX $00ED                  ; $80B3
    JSR $A438                  ; $80B5
    LDX #$FF                   ; $80B8
    INX                        ; $80BA
    CMP $B255,X                ; $80BB
    BNE $80BA                  ; $80BE
    LDA $00ED                  ; $80C0
    CMP #$0F                   ; $80C2
    BCS $80CF                  ; $80C4
    INC $00EB                  ; $80C6
    TXA                        ; $80C8
    CLC                        ; $80C9
    ADC $00EB                  ; $80CA
    AND #$3F                   ; $80CC
    TAX                        ; $80CE
    LDA $BC6E,X                ; $80CF
    STA $00EC                  ; $80D2
    LDX $00ED                  ; $80D4
    LDA $B241,X                ; $80D6
    CLC                        ; $80D9
    ADC #$80                   ; $80DA
    TAY                        ; $80DC
    LDX #$22                   ; $80DD
    LDA $00EC                  ; $80DF
    JSR $88CA                  ; $80E1
    LDA $0099                  ; $80E4
    BPL $80EC                  ; $80E6
    .byte $49,$41,$85,$99
    INC $00ED                  ; $80EC
    LDA $00ED                  ; $80EE
    CMP #$12                   ; $80F0
    BCC $80B3                  ; $80F2
    LDA #$01                   ; $80F4
    JSR $9FA8                  ; $80F6
    LDA $001E                  ; $80F9
    BPL $80F4                  ; $80FB
    LDA #$8A                   ; $80FD
    STA $00E6                  ; $80FF
    LDA #$22                   ; $8101
    STA $00E7                  ; $8103
    LDY #$04                   ; $8105
    LDX #$0B                   ; $8107
    JSR $98E8                  ; $8109
    RTS                        ; $810C
    JSR $9BA0                  ; $810D  (原反汇编误标 .byte $20,$A0,$9B → JSR $9BA0)
    LDA #$00                   ; $8110
    LDY #$F0                   ; $8112
    STA $0566,Y                ; $8114
    INY                        ; $8117
    BNE $8114                  ; $8118
    LDX #$2C                   ; $811A
    LDY #$2D                   ; $811C
    JSR $9B6F                  ; $811E
    LDX #$2E                   ; $8121
    LDY #$2F                   ; $8123
    JSR $9B74                  ; $8125
    LDA #$00                   ; $8128
    STA $008E                  ; $812A
    STA $0090                  ; $812C
    STA $007B                  ; $812E
    LDA #$2E                   ; $8130
    STA $008F                  ; $8132
    STA $0091                  ; $8134
    LDA #$09                   ; $8136
    JSR $8920                  ; $8138
    LDA #$6E                   ; $813B
    STA $00E6                  ; $813D
    LDA #$BC                   ; $813F
    STA $00E7                  ; $8141
    LDA #$C4                   ; $8143
    STA $00E8                  ; $8145
    LDA #$21                   ; $8147
    STA $00E9                  ; $8149
    LDA #$00                   ; $814B
    STA $00EC                  ; $814D
    LDA #$05                   ; $814F
    STA $00EB                  ; $8151
    LDA #$0D                   ; $8153
    STA $00ED                  ; $8155
    LDY $00EC                  ; $8157
    LDA ($00E6),Y              ; $8159
    LDY $00E8                  ; $815B
    LDX $00E9                  ; $815D
    JSR $88CA                  ; $815F
    INC $00E8                  ; $8162
    INC $00E8                  ; $8164
    INC $00EC                  ; $8166
    DEC $00ED                  ; $8168
    BNE $8157                  ; $816A
    LDA $00E8                  ; $816C
    CLC                        ; $816E
    ADC #$26                   ; $816F
    STA $00E8                  ; $8171
    LDA $00E9                  ; $8173
    ADC #$00                   ; $8175
    STA $00E9                  ; $8177
    DEC $00EB                  ; $8179
    BNE $8153                  ; $817B
    LDY #$F8                   ; $817D
    LDA $B205,Y                ; $817F
    STA $0460,Y                ; $8182
    INY                        ; $8185
    BNE $817F                  ; $8186
    LDY #$96                   ; $8188
    LDX #$B2                   ; $818A
    JSR $B0C0                  ; $818C
    LDA #$04                   ; $818F
    LDX #$30                   ; $8191
    JSR $997A                  ; $8193
    LDA #$8A                   ; $8196
    STA $004C                  ; $8198
    LDA #$33                   ; $819A
    STA $0700                  ; $819C
    LDA #$00                   ; $819F
    STA $00ED                  ; $81A1
    JMP $A201                  ; $81A3
    LDA #$01                   ; $81A6  (原反汇编误标 .byte $A9,$01 → LDA #$01)
    JSR $9FA8                  ; $81A8
    JSR $A3D0                  ; $81AB
    BIT $001E                  ; $81AE
    BPL $81B5                  ; $81B0
    JMP $A231                  ; $81B2
    BVC $81BA                  ; $81B5
    JMP $A260                  ; $81B7
    LDA $001E                  ; $81BA
    AND #$20                   ; $81BC
    BEQ $81C3                  ; $81BE
    JMP $A252                  ; $81C0
    LDA $001E                  ; $81C3
    AND #$10                   ; $81C5
    BEQ $81CC                  ; $81C7
    .byte $4C,$6C,$A2
    LDA $001C                  ; $81CC
    AND #$0F                   ; $81CE
    BEQ $81A6                  ; $81D0
    LDY #$14                   ; $81D2
    STY $00EA                  ; $81D4
    LDX $00EC                  ; $81D6
    LDA $B1E8,X                ; $81D8
    LDY #$00                   ; $81DB
    JSR $A4D8                  ; $81DD
    LDA $001C                  ; $81E0
    AND #$0F                   ; $81E2
    TAX                        ; $81E4
    LDA $B2ED,X                ; $81E5
    BMI $81F7                  ; $81E8
    CLC                        ; $81EA
    ADC $00EC                  ; $81EB
    CMP #$41                   ; $81ED
    BCC $8201                  ; $81EF
    SEC                        ; $81F1
    SBC #$41                   ; $81F2
    JMP $A201                  ; $81F4
    CLC                        ; $81F7
    ADC $00EC                  ; $81F8
    CMP #$41                   ; $81FA
    BCC $8201                  ; $81FC
    CLC                        ; $81FE
    ADC #$41                   ; $81FF
    STA $00EC                  ; $8201  (原反汇编误标 .byte $85,$EC → STA $EC)
    TAX                        ; $8203
    LDA $B1E8,X                ; $8204
    AND #$C0                   ; $8207
    ASL                        ; $8209
    ROL                        ; $820A
    ROL                        ; $820B
    TAY                        ; $820C
    LDA $B229,Y                ; $820D
    TAY                        ; $8210
    LDA $B1E8,X                ; $8211
    JSR $A4D8                  ; $8214
    LDA #$01                   ; $8217
    JSR $9FA8                  ; $8219
    JSR $A3D0                  ; $821C
    LDA $001C                  ; $821F
    AND #$0F                   ; $8221
    BNE $8228                  ; $8223
    JMP $A1A6                  ; $8225
    DEC $00EA                  ; $8228
    BNE $8217                  ; $822A
    LDY #$08                   ; $822C
    JMP $A1D4                  ; $822E
    LDX $00EC                  ; $8231
    LDA $B255,X                ; $8233
    CMP #$FF                   ; $8236
    BEQ $826C                  ; $8238
    TXA                        ; $823A
    LDY $00ED                  ; $823B
    STA $0664,Y                ; $823D
    LDA $BC6E,X                ; $8240
    LDX $00ED                  ; $8243
    LDY $B241,X                ; $8245
    LDX #$21                   ; $8248
    JSR $88CA                  ; $824A
    LDA #$12                   ; $824D
    STA $0701                  ; $824F
    LDX $00ED                  ; $8252
    INX                        ; $8254
    CPX #$12                   ; $8255
    BCC $825B                  ; $8257
    LDX #$00                   ; $8259
    STX $00ED                  ; $825B
    JMP $A1A6                  ; $825D
    LDX $00ED                  ; $8260
    DEX                        ; $8262
    BPL $8267                  ; $8263
    LDX #$11                   ; $8265
    STX $00ED                  ; $8267
    JMP $A1A6                  ; $8269
    LDX $00EC                  ; $826C
    LDA $B1E8,X                ; $826E
    LDY #$00                   ; $8271
    JSR $A4D8                  ; $8273
    LDX $0673                  ; $8276
    LDA $B255,X                ; $8279
    AND #$30                   ; $827C
    STA $00EB                  ; $827E
    LDX $0675                  ; $8280
    LDA $B255,X                ; $8283
    AND #$0F                   ; $8286
    ORA $00EB                  ; $8288
    STA $00EB                  ; $828A
    LDX #$00                   ; $828C
    LDA $0664,X                ; $828E
    CPX #$0F                   ; $8291
    BCS $829C                  ; $8293
    INC $00EB                  ; $8295
    SEC                        ; $8297
    SBC $00EB                  ; $8298
    AND #$3F                   ; $829A
    TAY                        ; $829C
    LDA $B255,Y                ; $829D
    JSR $A474                  ; $82A0
    INX                        ; $82A3
    CPX #$12                   ; $82A4
    BNE $828E                  ; $82A6
    JSR $A402                  ; $82A8
    LDA $0662                  ; $82AB
    CMP $00EC                  ; $82AE
    BNE $82BB                  ; $82B0
    LDA $0661                  ; $82B2
    AND #$0F                   ; $82B5
    CMP $00ED                  ; $82B7
    BEQ $82DD                  ; $82B9
    LDA #$F8                   ; $82BB
    STA $0558                  ; $82BD
    STA $055C                  ; $82C0
    LDA #$43                   ; $82C3
    STA $0700                  ; $82C5
    LDA #$01                   ; $82C8
    STA $007E                  ; $82CA
    LDA #$78                   ; $82CC
    JSR $9FA8                  ; $82CE
    LDA #$00                   ; $82D1
    STA $007E                  ; $82D3
    LDA #$33                   ; $82D5
    STA $0700                  ; $82D7
    JMP $A19F                  ; $82DA
    LDA #$00                   ; $82DD
    STA $00E6                  ; $82DF
    TAX                        ; $82E1
    LDA $0656,X                ; $82E2
    LSR                        ; $82E5
    LSR                        ; $82E6
    STA $00E7                  ; $82E7
    JSR $B045                  ; $82E9
    STY $00EC                  ; $82EC
    STX $00ED                  ; $82EE
    LDA $00E7                  ; $82F0
    CMP #$3F                   ; $82F2
    BCS $8352                  ; $82F4
    CLC                        ; $82F6
    ADC #$01                   ; $82F7
    JSR $B045                  ; $82F9
    TYA                        ; $82FC
    SEC                        ; $82FD
    SBC $00EC                  ; $82FE
    STA $00EA                  ; $8300
    TXA                        ; $8302
    SBC $00ED                  ; $8303
    STA $00EB                  ; $8305
    LSR $00EB                  ; $8307
    ROR $00EA                  ; $8309
    LSR $00EB                  ; $830B
    ROR $00EA                  ; $830D
    LDX $00E6                  ; $830F
    LDA $0656,X                ; $8311
    LDY $00EA                  ; $8314
    LDX $00EB                  ; $8316
    AND #$03                   ; $8318
    BEQ $8338                  ; $831A
    ASL $00EA                  ; $831C
    ROL $00EB                  ; $831E
    CMP #$02                   ; $8320
    BEQ $832D                  ; $8322
    BCC $8338                  ; $8324
    ASL $00EA                  ; $8326
    ROL $00EB                  ; $8328
    JMP $A338                  ; $832A
    TYA                        ; $832D
    CLC                        ; $832E
    ADC $00EA                  ; $832F
    STA $00EA                  ; $8331
    TXA                        ; $8333
    ADC $00EB                  ; $8334
    STA $00EB                  ; $8336
    LDA $00EC                  ; $8338
    CLC                        ; $833A
    ADC $00EA                  ; $833B
    STA $00EC                  ; $833D
    LDA $00ED                  ; $833F
    ADC $00EB                  ; $8341
    STA $00ED                  ; $8343
    LDA $00EC                  ; $8345
    SEC                        ; $8347
    SBC #$01                   ; $8348
    STA $00EC                  ; $834A
    LDA $00ED                  ; $834C
    SBC #$00                   ; $834E
    STA $00ED                  ; $8350
    LDA $00E6                  ; $8352
    ASL                        ; $8354
    TAX                        ; $8355
    LDA $00EC                  ; $8356
    STA $0454,X                ; $8358
    LDA $00ED                  ; $835B
    STA $0455,X                ; $835D
    INC $00E6                  ; $8360
    LDA $00E6                  ; $8362
    CMP #$0A                   ; $8364
    BEQ $836B                  ; $8366
    JMP $A2DF                  ; $8368
    LDA $0660                  ; $836B
    LSR                        ; $836E
    LSR                        ; $836F
    STA $0026                  ; $8370
    LDA $0660                  ; $8372
    AND #$03                   ; $8375
    LSR                        ; $8377
    STA $0448                  ; $8378
    LDA #$00                   ; $837B
    BCC $8381                  ; $837D
    LDA #$05                   ; $837F
    STA $0446                  ; $8381
    LDA $0661                  ; $8384
    ROL                        ; $8387
    LDA #$00                   ; $8388
    ROL                        ; $838A
    STA $044D                  ; $838B
    LDA #$00                   ; $838E
    STA $004C                  ; $8390
    LDA #$01                   ; $8392
    STA $0700                  ; $8394
    JSR $9BA0                  ; $8397
    RTS                        ; $839A
    LDA #$00                   ; $839B
    STA $00EA                  ; $839D
    LDA #$0B                   ; $839F
    JSR $A3B4                  ; $83A1
    LDA $0026                  ; $83A4
    CMP #$10                   ; $83A6
    BCC $83B3                  ; $83A8
    LDA #$16                   ; $83AA
    STA $00EA                  ; $83AC
    LDA #$0A                   ; $83AE
    JSR $A3B4                  ; $83B0
    RTS                        ; $83B3
    STA $00EB                  ; $83B4
    LDA $00EA                  ; $83B6
    JSR $C50C                  ; $83B8
    LDY #$00                   ; $83BB
    LDA ($0034),Y              ; $83BD
    JSR $B013                  ; $83BF
    JSR $B02E                  ; $83C2
    LDY #$03                   ; $83C5
    STA ($0034),Y              ; $83C7
    INC $00EA                  ; $83C9
    DEC $00EB                  ; $83CB
    BNE $83B6                  ; $83CD
    RTS                        ; $83CF
    LDA $003A                  ; $83D0
    AND #$04                   ; $83D2
    BEQ $83F9                  ; $83D4
    LDX $00ED                  ; $83D6
    LDA $B22D,X                ; $83D8
    AND #$80                   ; $83DB
    LSR                        ; $83DD
    SEC                        ; $83DE
    ROR                        ; $83DF
    LSR                        ; $83E0
    STA $0558                  ; $83E1
    CLC                        ; $83E4
    ADC #$08                   ; $83E5
    STA $055C                  ; $83E7
    LDA $B22D,X                ; $83EA
    AND #$7F                   ; $83ED
    CLC                        ; $83EF
    ADC #$50                   ; $83F0
    STA $055B                  ; $83F2
    STA $055F                  ; $83F5
    RTS                        ; $83F8
    LDA #$F8                   ; $83F9
    STA $0558                  ; $83FB
    STA $055C                  ; $83FE
    RTS                        ; $8401
    LDA $0661                  ; $8402
    AND #$F0                   ; $8405
    CLC                        ; $8407
    ADC $0663                  ; $8408
    STA $00EC                  ; $840B
    LDA #$00                   ; $840D
    ADC #$00                   ; $840F
    STA $00ED                  ; $8411
    LDX #$00                   ; $8413
    LDA $0656,X                ; $8415
    CLC                        ; $8418
    ADC $00EC                  ; $8419
    STA $00EC                  ; $841B
    LDA $00ED                  ; $841D
    ADC #$00                   ; $841F
    STA $00ED                  ; $8421
    INX                        ; $8423
    CPX #$0B                   ; $8424
    BNE $8415                  ; $8426
    LDA $00EC                  ; $8428
    CLC                        ; $842A
    ADC #$09                   ; $842B
    STA $00EC                  ; $842D
    LDA $00ED                  ; $842F
    ADC #$03                   ; $8431
    AND #$0F                   ; $8433
    STA $00ED                  ; $8435
    RTS                        ; $8437
    LDY $AD8A,X                ; $8438
    TXA                        ; $843B
    AND #$03                   ; $843C
    BEQ $846E                  ; $843E
    CMP #$01                   ; $8440
    BEQ $845E                  ; $8442
    CMP #$02                   ; $8444
    BEQ $844E                  ; $8446
    LDA $0656,Y                ; $8448
    AND #$3F                   ; $844B
    RTS                        ; $844D
    LDA $0657,Y                ; $844E
    ASL                        ; $8451
    STA $00EC                  ; $8452
    LDA $0656,Y                ; $8454
    AND #$0F                   ; $8457
    ROL                        ; $8459
    ASL $00EC                  ; $845A
    ROL                        ; $845C
    RTS                        ; $845D
    LDA $0656,Y                ; $845E
    LSR                        ; $8461
    STA $00EC                  ; $8462
    LDA $0657,Y                ; $8464
    ROR                        ; $8467
    LSR $00EC                  ; $8468
    ROR                        ; $846A
    LSR                        ; $846B
    LSR                        ; $846C
    RTS                        ; $846D
    LDA $0656,Y                ; $846E
    LSR                        ; $8471
    LSR                        ; $8472
    RTS                        ; $8473
    AND #$3F                   ; $8474
    STA $00EC                  ; $8476
    LDY $AD8A,X                ; $8478
    TXA                        ; $847B
    AND #$03                   ; $847C
    BEQ $84C9                  ; $847E
    CMP #$01                   ; $8480
    BEQ $84AC                  ; $8482
    CMP #$02                   ; $8484
    BEQ $8493                  ; $8486
    LDA $0656,Y                ; $8488
    AND #$C0                   ; $848B
    ORA $00EC                  ; $848D
    STA $0656,Y                ; $848F
    RTS                        ; $8492
    LDA $0657,Y                ; $8493
    ASL                        ; $8496
    ASL                        ; $8497
    LSR $00EC                  ; $8498
    ROR                        ; $849A
    LSR $00EC                  ; $849B
    ROR                        ; $849D
    STA $0657,Y                ; $849E
    LDA $0656,Y                ; $84A1
    AND #$F0                   ; $84A4
    ORA $00EC                  ; $84A6
    STA $0656,Y                ; $84A8
    RTS                        ; $84AB
    ASL $00EC                  ; $84AC
    ASL $00EC                  ; $84AE
    LDA $0656,Y                ; $84B0
    LSR                        ; $84B3
    LSR                        ; $84B4
    ASL $00EC                  ; $84B5
    ROL                        ; $84B7
    ASL $00EC                  ; $84B8
    ROL                        ; $84BA
    STA $0656,Y                ; $84BB
    LDA $0657,Y                ; $84BE
    AND #$0F                   ; $84C1
    ORA $00EC                  ; $84C3
    STA $0657,Y                ; $84C5
    RTS                        ; $84C8
    ASL $00EC                  ; $84C9
    ASL $00EC                  ; $84CB
    LDA $0656,Y                ; $84CD
    AND #$03                   ; $84D0
    ORA $00EC                  ; $84D2
    STA $0656,Y                ; $84D4
    RTS                        ; $84D7
    STY $00E8                  ; $84D8
    AND #$3F                   ; $84DA
    CLC                        ; $84DC
    ADC #$D8                   ; $84DD
    TAY                        ; $84DF
    LDX #$23                   ; $84E0
    LDA #$01                   ; $84E2
    STA $00E9                  ; $84E4
    LDA $00E8                  ; $84E6
    JMP $9895                  ; $84E8
    LDX #$6A                   ; $84EB  (原反汇编误标 .byte $A2,$6A → LDX #$6A)
    LDY #$6B                   ; $84ED
    JSR $9B6F                  ; $84EF
    LDX #$7A                   ; $84F2
    LDY #$7B                   ; $84F4
    JSR $9B74                  ; $84F6
    JSR $9B7F                  ; $84F9
    LDY #$05                   ; $84FC
    LDX #$B3                   ; $84FE
    JSR $B0C0                  ; $8500
    LDA #$00                   ; $8503
    STA $0044                  ; $8505
    STA $0045                  ; $8507
    LDY #$CC                   ; $8509
    LDA $B271,Y                ; $850B
    STA $039C,Y                ; $850E
    INY                        ; $8511
    BNE $850B                  ; $8512
    LDX $0026                  ; $8514
    LDA $BCD1,X                ; $8516
    AND #$F0                   ; $8519
    LSR                        ; $851B
    LSR                        ; $851C
    LSR                        ; $851D
    TAX                        ; $851E
    LDY $BCF3,X                ; $851F
    LDA $BCF4,X                ; $8522
    TAX                        ; $8525
    JSR $9D27                  ; $8526
    LDX $0026                  ; $8529
    LDA $BCD1,X                ; $852B
    AND #$0F                   ; $852E
    ASL                        ; $8530
    TAX                        ; $8531
    LDY $BD64,X                ; $8532
    LDA $BD65,X                ; $8535
    TAX                        ; $8538
    LDA #$07                   ; $8539
    STA $00E8                  ; $853B
    LDA #$22                   ; $853D
    STA $00E9                  ; $853F
    JSR $9D50                  ; $8541
    LDA $002A                  ; $8544
    LDY #$D0                   ; $8546
    LDX #$21                   ; $8548
    JSR $A63C                  ; $854A
    LDA #$24                   ; $854D
    CMP $002B                  ; $854F
    LDA $002B                  ; $8551
    SBC #$00                   ; $8553
    LDY #$50                   ; $8555
    LDX #$22                   ; $8557
    JSR $A63C                  ; $8559
    LDA #$00                   ; $855C
    STA $007B                  ; $855E
    LDA #$00                   ; $8560
    STA $008E                  ; $8562
    LDA #$2E                   ; $8564
    STA $008F                  ; $8566
    LDA #$04                   ; $8568
    LDX #$37                   ; $856A
    JSR $997A                  ; $856C
    LDX #$F0                   ; $856F
    LDA #$01                   ; $8571
    JSR $9FA8                  ; $8573
    LDA $001E                  ; $8576
    BMI $857D                  ; $8578
    DEX                        ; $857A
    BNE $8571                  ; $857B
    JSR $99F0                  ; $857D
    JSR $98A0                  ; $8580
    LDA #$00                   ; $8583
    STA $00ED                  ; $8585
    STA $00EC                  ; $8587
    LDA #$0B                   ; $8589
    JSR $A611                  ; $858B
    LDA $0026                  ; $858E
    CMP #$10                   ; $8590
    BCC $859D                  ; $8592
    LDA #$16                   ; $8594
    STA $00ED                  ; $8596
    LDA #$0A                   ; $8598
    JSR $A611                  ; $859A
    LDA $00E4                  ; $859D
    CMP $0026                  ; $859F
    BCS $85B1                  ; $85A1
    LDA $0026                  ; $85A3
    CMP #$06                   ; $85A5
    BEQ $8610                  ; $85A7
    CMP #$0C                   ; $85A9
    BEQ $8610                  ; $85AB
    CMP #$10                   ; $85AD
    BEQ $8610                  ; $85AF
    LDA $00EC                  ; $85B1
    BEQ $8610                  ; $85B3
    LDX $0026                  ; $85B5
    LDA $B3F9,X                ; $85B7
    JSR $8464                  ; $85BA
    JSR $82A9                  ; $85BD
    LDA #$00                   ; $85C0
    STA $00ED                  ; $85C2
