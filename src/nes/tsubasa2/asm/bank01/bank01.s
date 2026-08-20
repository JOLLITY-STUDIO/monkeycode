; ============================================================
; bank01/bank01.s
; bank 1 - 真实 6502 汇编 (8KB)
; CPU 地址范围: $8000-$9FFF
; 源: _tmp_bzk_out/bank_01/bank_01_partMM.asm
; 代码=助记符, 数据=.byte, build_nes.py 可直接编译
; ============================================================

.segment "PRG_BANK01"
.org $8000

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
    .byte $20,$A0,$9B
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
    .byte $A9,$01
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
    .byte $85,$EC
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
    .byte $A2,$6A
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
    STA $00EA                  ; $85C4
    LDX $00ED                  ; $85C6
    LDA $0656,X                ; $85C8
    JSR $C53C                  ; $85CB
    LDA $00EA                  ; $85CE
    ASL                        ; $85D0
    TAX                        ; $85D1
    LDA $BC58,X                ; $85D2
    STA $00E8                  ; $85D5
    LDA $BC59,X                ; $85D7
    STA $00E9                  ; $85DA
    LDY $0030                  ; $85DC
    LDX $0031                  ; $85DE
    JSR $9D50                  ; $85E0
    INC $00EA                  ; $85E3
    INC $00ED                  ; $85E5
    DEC $00EC                  ; $85E7
    BEQ $860A                  ; $85E9
    LDA $00ED                  ; $85EB
    CMP #$0B                   ; $85ED
    BNE $85C6                  ; $85EF
    JSR $89A3                  ; $85F1
    LDA #$44                   ; $85F4
    STA $00E6                  ; $85F6
    LDA #$22                   ; $85F8
    STA $00E7                  ; $85FA
    LDY #$08                   ; $85FC
    LDX #$18                   ; $85FE
    JSR $98E8                  ; $8600
    LDA #$00                   ; $8603
    STA $00EA                  ; $8605
    JMP $A5C6                  ; $8607
    JSR $89A3                  ; $860A
    JSR $99F0                  ; $860D
    RTS                        ; $8610
    STA $00EB                  ; $8611
    LDA $00ED                  ; $8613
    JSR $C50C                  ; $8615
    LDY #$00                   ; $8618
    LDA ($0034),Y              ; $861A
    JSR $B013                  ; $861C
    JSR $B02E                  ; $861F
    LDY #$03                   ; $8622
    CMP ($0034),Y              ; $8624
    BEQ $8635                  ; $8626
    STA ($0034),Y              ; $8628
    LDY #$00                   ; $862A
    LDA ($0034),Y              ; $862C
    LDX $00EC                  ; $862E
    STA $0656,X                ; $8630
    INC $00EC                  ; $8633
    INC $00ED                  ; $8635
    DEC $00EB                  ; $8637
    BNE $8613                  ; $8639
    RTS                        ; $863B
    STY $00E8                  ; $863C
    STX $00E9                  ; $863E
    ASL                        ; $8640
    TAX                        ; $8641
    LDY $BDA8,X                ; $8642
    LDA $BDA9,X                ; $8645
    TAX                        ; $8648
    JMP $9D50                  ; $8649
    .byte $20,$A0,$98
    JSR $9B7F                  ; $864F
    LDX $0026                  ; $8652
    LDA $B393,X                ; $8654
    JSR $8464                  ; $8657
    JSR $82A9                  ; $865A
    LDA #$01                   ; $865D
    JSR $8920                  ; $865F
    LDY #$D0                   ; $8662
    LDX #$AD                   ; $8664
    JSR $9C3A                  ; $8666
    JSR $9BE8                  ; $8669
    LDY #$73                   ; $866C
    LDX #$A6                   ; $866E
    JMP $9C28                  ; $8670
    .byte $7B,$A6,$9F,$A6,$BE,$A6,$C4,$A6,$A6,$26
    LDA $B371,X                ; $867D
    JSR $8464                  ; $8680
    LDA #$01                   ; $8683
    JSR $9FA8                  ; $8685
    LDA $004D                  ; $8688
    ORA $004E                  ; $868A
    BEQ $8662                  ; $868C
    LDA $001E                  ; $868E
    AND #$10                   ; $8690
    BEQ $8683                  ; $8692
    JSR $99F0                  ; $8694
    LDA #$02                   ; $8697
    JSR $9FA8                  ; $8699
    JMP $A652                  ; $869C
    .byte $20,$F0,$99
    LDX $0026                  ; $86A2
    LDA $B3D7,X                ; $86A4
    JSR $8464                  ; $86A7
    JSR $82A9                  ; $86AA
    JSR $A01E                  ; $86AD
    LDA #$4E                   ; $86B0
    JSR $8464                  ; $86B2
    JSR $82A9                  ; $86B5
    JSR $99F0                  ; $86B8
    JMP $A64C                  ; $86BB
    .byte $20,$21,$A7
    JMP $A64C                  ; $86C1
    .byte $A6,$26
    LDA $B41B,X                ; $86C6
    JSR $8464                  ; $86C9
    JSR $82A9                  ; $86CC
    JMP $A715                  ; $86CF
    .byte $A9,$55
    STA $0700                  ; $86D4
    JSR $98A0                  ; $86D7
    JSR $9B7F                  ; $86DA
    LDX $0026                  ; $86DD
    LDA $B3B5,X                ; $86DF
    JSR $8464                  ; $86E2
    JMP $A6F9                  ; $86E5
    .byte $20,$A0,$98
    JSR $9B7F                  ; $86EB
    LDX $0026                  ; $86EE
    LDA $B3B5,X                ; $86F0
    CLC                        ; $86F3
    ADC #$01                   ; $86F4
    JSR $8464                  ; $86F6
    .byte $20,$A9,$82
    LDY #$D6                   ; $86FC
    LDX #$AD                   ; $86FE
    JSR $9C3A                  ; $8700
    JSR $9BE8                  ; $8703
    CMP #$02                   ; $8706
    BEQ $8710                  ; $8708
    JSR $A721                  ; $870A
    JMP $A6E8                  ; $870D
    LDA #$31                   ; $8710
    STA $0700                  ; $8712
    .byte $20,$A0,$9B
    RTS                        ; $8718
    LDY #$83                   ; $8719
    LDX #$B5                   ; $871B
    JSR $97AB                  ; $871D
    RTS                        ; $8720
    .byte $20,$A0,$9B
    LDX #$1F                   ; $8724
    LDY #$2E                   ; $8726
    JSR $9B6F                  ; $8728
    LDA #$00                   ; $872B
    STA $007B                  ; $872D
    JSR $8920                  ; $872F
    LDA #$00                   ; $8732
    STA $008E                  ; $8734
    LDA #$2E                   ; $8736
    STA $008F                  ; $8738
    LDA $002A                  ; $873A
    CMP #$02                   ; $873C
    BNE $8743                  ; $873E
    JMP $A84E                  ; $8740
    LDY #$3D                   ; $8743
    LDX #$B4                   ; $8745
    JSR $B0C0                  ; $8747
    LDA #$00                   ; $874A
    JSR $ADE9                  ; $874C
    LDA #$88                   ; $874F
    STA $00E6                  ; $8751
    LDA #$20                   ; $8753
    STA $00E7                  ; $8755
    JSR $AEAC                  ; $8757
    LDA #$00                   ; $875A
    JSR $AE01                  ; $875C
    LDY #$FC                   ; $875F
    LDA $ACA2,Y                ; $8761
    STA $0468,Y                ; $8764
    INY                        ; $8767
    BNE $8761                  ; $8768
    LDA #$03                   ; $876A
    LDX #$39                   ; $876C
    JSR $997A                  ; $876E
    .byte $A9,$FC
    LDX #$38                   ; $8773
    LDY #$78                   ; $8775
    JSR $9BE3                  ; $8777
    LDY #$81                   ; $877A
    LDX #$A7                   ; $877C
    JMP $9C28                  ; $877E
    .byte $8B,$A7,$AC,$A7,$C5,$A7,$DD,$AA,$73,$AA,$A0,$EB
    LDX #$B6                   ; $878D
    JSR $97AB                  ; $878F
    LDX #$90                   ; $8792
    JSR $AE1E                  ; $8794
    LDA #$00                   ; $8797
    JSR $AE3A                  ; $8799
    LDA #$F8                   ; $879C
    STA $0560                  ; $879E
    JSR $AA77                  ; $87A1
    LDA #$38                   ; $87A4
    STA $0564                  ; $87A6
    JMP $A771                  ; $87A9
    .byte $A0,$90
    LDX #$B7                   ; $87AE
    JSR $97AB                  ; $87B0
    LDY #$A2                   ; $87B3
    LDX #$AD                   ; $87B5
    JSR $AE77                  ; $87B7
    JSR $AA77                  ; $87BA
    LDA #$48                   ; $87BD
    STA $0564                  ; $87BF
    JMP $A771                  ; $87C2
    .byte $A9,$58
    STA $0564                  ; $87C7
    LDA #$94                   ; $87CA
    STA $004C                  ; $87CC
    .byte $A0,$A8
    LDX #$AD                   ; $87D0
    JSR $9C3A                  ; $87D2
    LDA #$01                   ; $87D5
    JSR $9FA8                  ; $87D7
    JSR $9CC9                  ; $87DA
    BIT $001E                  ; $87DD
    BVS $883C                  ; $87DF
    BPL $87D5                  ; $87E1
    LDA #$01                   ; $87E3
    STA $0562                  ; $87E5
    JSR $9CD3                  ; $87E8
    LDY #$AE                   ; $87EB
    LDX #$AD                   ; $87ED
    LDA $0560                  ; $87EF
    JSR $9C3C                  ; $87F2
    LDA #$01                   ; $87F5
    JSR $9FA8                  ; $87F7
    JSR $9CC9                  ; $87FA
    BIT $001E                  ; $87FD
    BVS $883C                  ; $87FF
    BPL $87F5                  ; $8801
    LDY $0560                  ; $8803
    LDX #$00                   ; $8806
    JSR $9D08                  ; $8808
    LDA $0034                  ; $880B
    STA $00E6                  ; $880D
    LDA $0035                  ; $880F
    STA $00E7                  ; $8811
    LDY $055C                  ; $8813
    LDX #$00                   ; $8816
    JSR $9D08                  ; $8818
    JSR $AF67                  ; $881B
    LDA #$88                   ; $881E
    STA $00E6                  ; $8820
    LDA #$20                   ; $8822
    STA $00E7                  ; $8824
    JSR $AEAC                  ; $8826
    LDA #$F8                   ; $8829
    STA $055C                  ; $882B
    STA $0560                  ; $882E
    LDA #$00                   ; $8831
    STA $0562                  ; $8833
    JSR $AE01                  ; $8836
    JMP $A7CE                  ; $8839
    LDA #$00                   ; $883C
    STA $004C                  ; $883E
    JSR $AE01                  ; $8840
    LDA #$F8                   ; $8843
    STA $055C                  ; $8845
    STA $0560                  ; $8848
    JMP $A771                  ; $884B
    LDY #$51                   ; $884E
    LDX #$B4                   ; $8850
    JSR $B0C0                  ; $8852
    LDA #$FC                   ; $8855
    JSR $ADE9                  ; $8857
    LDA #$85                   ; $885A
    STA $00E6                  ; $885C
    LDA #$20                   ; $885E
    STA $00E7                  ; $8860
    JSR $AEAC                  ; $8862
    LDA #$99                   ; $8865
    STA $00E6                  ; $8867
    LDA #$20                   ; $8869
    STA $00E7                  ; $886B
    JSR $AEBE                  ; $886D
    LDA #$D8                   ; $8870
    JSR $AE01                  ; $8872
    JSR $B0A1                  ; $8875
    JSR $AA7F                  ; $8878
    LDY #$FC                   ; $887B
    LDA $ACB8,Y                ; $887D
    STA $0468,Y                ; $8880
    INY                        ; $8883
    BNE $887D                  ; $8884
    LDA #$03                   ; $8886
    LDX #$39                   ; $8888
    JSR $997A                  ; $888A
    LDA #$FC                   ; $888D
    LDX #$38                   ; $888F
    LDY #$78                   ; $8891
    JSR $9BE3                  ; $8893
    LDY #$9D                   ; $8896
    LDX #$A8                   ; $8898
    JMP $9C28                  ; $889A
    .byte $A7,$A8,$CA,$A8,$E5,$A8,$DD,$AA,$73,$AA,$A0,$EB
    LDX #$B6                   ; $88A9
    LDA #$FB                   ; $88AB
    JSR $97AD                  ; $88AD
    LDX #$68                   ; $88B0
    JSR $AE1E                  ; $88B2
    LDA #$D8                   ; $88B5
    JSR $AE3A                  ; $88B7
    LDA #$F8                   ; $88BA
    STA $0560                  ; $88BC
    JSR $A719                  ; $88BF
    LDA #$38                   ; $88C2
    STA $0564                  ; $88C4
    JMP $A88D                  ; $88C7
    .byte $A0,$90
    LDX #$B7                   ; $88CC
    LDA #$FB                   ; $88CE
    JSR $97AD                  ; $88D0
    LDY #$B8                   ; $88D3
    LDX #$AD                   ; $88D5
    JSR $AE77                  ; $88D7
    JSR $A719                  ; $88DA
    LDA #$48                   ; $88DD
    STA $0564                  ; $88DF
    JMP $A88D                  ; $88E2
    .byte $A9,$58
    STA $0564                  ; $88E7
    LDA #$94                   ; $88EA
    STA $004C                  ; $88EC
    LDY #$BE                   ; $88EE
    LDX #$AD                   ; $88F0
    JSR $9C3A                  ; $88F2
    LDA $0450                  ; $88F5
    CMP #$03                   ; $88F8
    BCC $8900                  ; $88FA
    LDA #$B8                   ; $88FC
    STA $00E6                  ; $88FE
    LDA #$01                   ; $8900
    JSR $9FA8                  ; $8902
    JSR $9CC9                  ; $8905
    BIT $001E                  ; $8908
    BVC $890F                  ; $890A
    JMP $AA5F                  ; $890C
    BPL $8900                  ; $890F
    LDA #$01                   ; $8911
    STA $0562                  ; $8913
    LDA $0560                  ; $8916
    CMP #$C8                   ; $8919
    BCC $8920                  ; $891B
    JMP $A9C0                  ; $891D
    LDA #$01                   ; $8920
    JSR $9CD3                  ; $8922
    LDY #$C4                   ; $8925
    LDX #$AD                   ; $8927
    LDA $0560                  ; $8929
    JSR $9C3C                  ; $892C
    LDA $0450                  ; $892F
    CMP #$03                   ; $8932
    BCS $8944                  ; $8934
    LDA #$B8                   ; $8936
    STA $00E6                  ; $8938
    LDA $00E9                  ; $893A
    STA $00EB                  ; $893C
    STA $00EA                  ; $893E
    LDA #$FF                   ; $8940
    STA $00E9                  ; $8942
    LDA #$01                   ; $8944
    JSR $9FA8                  ; $8946
    JSR $9CC9                  ; $8949
    LDA $0450                  ; $894C
    CMP #$03                   ; $894F
    BCS $89B4                  ; $8951
    LDA $001E                  ; $8953
    AND #$03                   ; $8955
    BEQ $89B4                  ; $8957
    LSR                        ; $8959
    BCS $8977                  ; $895A
    LDA #$20                   ; $895C
    STA $055F                  ; $895E
    LDA #$B8                   ; $8961
    STA $00E6                  ; $8963
    LDA $00EA                  ; $8965
    STA $00EB                  ; $8967
    CMP $055C                  ; $8969
    BNE $89B4                  ; $896C
    .byte $18,$69,$10,$8D,$5C,$05,$4C,$B4,$A9
    LDA #$00                   ; $8977
    JSR $9CD3                  ; $8979
    LDA #$C0                   ; $897C
    STA $055F                  ; $897E
    LDA #$00                   ; $8981
    STA $00EB                  ; $8983
    LDA #$98                   ; $8985
    STA $00E6                  ; $8987
    LDA $055C                  ; $8989
    CMP #$A8                   ; $898C
    BCC $8995                  ; $898E
    LDA #$98                   ; $8990
    STA $055C                  ; $8992
    LDY $055C                  ; $8995
    LDX $055F                  ; $8998
    JSR $AABF                  ; $899B
    BCC $89B2                  ; $899E
    LDA $055C                  ; $89A0
    CLC                        ; $89A3
    ADC #$10                   ; $89A4
    CMP #$A8                   ; $89A6
    BCC $89AC                  ; $89A8
    .byte $A9,$28
    STA $055C                  ; $89AC
    JMP $A995                  ; $89AF
    LDY #$F4                   ; $89B2
    BIT $001E                  ; $89B4
    BVC $89BB                  ; $89B6
    JMP $AA5F                  ; $89B8
    BPL $8944                  ; $89BB
    JMP $A9FB                  ; $89BD
    LDY #$CA                   ; $89C0
    LDX #$AD                   ; $89C2
    JSR $9C3A                  ; $89C4
    LDA #$FF                   ; $89C7
    STA $00E9                  ; $89C9
    LDY #$A8                   ; $89CB
    LDX #$C0                   ; $89CD
    JSR $AABF                  ; $89CF
    BCC $89E2                  ; $89D2
    LDA #$C8                   ; $89D4
    STA $055C                  ; $89D6
    LDY #$B8                   ; $89D9
    LDX #$C0                   ; $89DB
    JSR $AABF                  ; $89DD
    BCS $8A5F                  ; $89E0
    LDY #$F4                   ; $89E2
    LDA #$01                   ; $89E4
    JSR $9FA8                  ; $89E6
    JSR $9CC9                  ; $89E9
    BIT $001E                  ; $89EC
    BVS $8A5F                  ; $89EE
    BPL $89E4                  ; $89F0
    LDA $055C                  ; $89F2
    SEC                        ; $89F5
    SBC #$10                   ; $89F6
    STA $055C                  ; $89F8
    LDY $0560                  ; $89FB
    LDX $0563                  ; $89FE
    JSR $9D08                  ; $8A01
    LDA $0034                  ; $8A04
    STA $00E6                  ; $8A06
    LDA $0035                  ; $8A08
    STA $00E7                  ; $8A0A
    LDY $055C                  ; $8A0C
    LDX $055F                  ; $8A0F
    JSR $9D08                  ; $8A12
    JSR $AF67                  ; $8A15
    LDA #$F8                   ; $8A18
    STA $055C                  ; $8A1A
    STA $0560                  ; $8A1D
    LDA $055F                  ; $8A20
    BPL $8A3C                  ; $8A23
    LDA $0027                  ; $8A25
    BEQ $8A3C                  ; $8A27
    INC $0450                  ; $8A29
    LDY #$00                   ; $8A2C
    LDA ($0034),Y              ; $8A2E
    LDX $0450                  ; $8A30
    STA $0450,X                ; $8A33
    JSR $B0A1                  ; $8A36
    JSR $AA7F                  ; $8A39
    LDA #$85                   ; $8A3C
    STA $00E6                  ; $8A3E
    LDA #$20                   ; $8A40
    STA $00E7                  ; $8A42
    JSR $AEAC                  ; $8A44
    LDA #$99                   ; $8A47
    STA $00E6                  ; $8A49
    LDA #$20                   ; $8A4B
    STA $00E7                  ; $8A4D
    JSR $AEBE                  ; $8A4F
    LDA #$00                   ; $8A52
    STA $0562                  ; $8A54
    LDA #$D8                   ; $8A57
    JSR $AE01                  ; $8A59
    JMP $A8EE                  ; $8A5C
    LDA #$00                   ; $8A5F
    STA $004C                  ; $8A61
    LDA #$D8                   ; $8A63
    JSR $AE01                  ; $8A65
    LDA #$F8                   ; $8A68
    STA $055C                  ; $8A6A
    STA $0560                  ; $8A6D
    JMP $A88D                  ; $8A70
    .byte $20,$F0,$99
    RTS                        ; $8A76
    LDY #$B3                   ; $8A77
    LDX #$B4                   ; $8A79
    JSR $97AB                  ; $8A7B
    RTS                        ; $8A7E
    LDA $0450                  ; $8A7F
    BEQ $8ABE                  ; $8A82
    LDA #$28                   ; $8A84
    STA $00E7                  ; $8A86
    LDY $00E7                  ; $8A88
    LDX #$C0                   ; $8A8A
    JSR $AABF                  ; $8A8C
    BCC $8AB3                  ; $8A8F
    TXA                        ; $8A91
    ASL                        ; $8A92
    ASL                        ; $8A93
    CLC                        ; $8A94
    ADC #$E0                   ; $8A95
    TAX                        ; $8A97
    LDA $00E7                  ; $8A98
    CMP #$A8                   ; $8A9A
    BCC $8AA1                  ; $8A9C
    CLC                        ; $8A9E
    ADC #$10                   ; $8A9F
    STA $0468,X                ; $8AA1
    LDA #$C0                   ; $8AA4
    STA $046B,X                ; $8AA6
    LDA #$72                   ; $8AA9
    STA $0469,X                ; $8AAB
    LDA #$00                   ; $8AAE
    STA $046A,X                ; $8AB0
    LDA $00E7                  ; $8AB3
    CLC                        ; $8AB5
    ADC #$10                   ; $8AB6
    STA $00E7                  ; $8AB8
    CMP #$B9                   ; $8ABA
    BCC $8A88                  ; $8ABC
    RTS                        ; $8ABE
    JSR $9D08                  ; $8ABF
    LDX #$00                   ; $8AC2
    LDY #$00                   ; $8AC4
    LDA ($0034),Y              ; $8AC6
    CMP $0451                  ; $8AC8
    BEQ $8AD9                  ; $8ACB
    INX                        ; $8ACD
    CMP $0452                  ; $8ACE
    BEQ $8AD9                  ; $8AD1
    INX                        ; $8AD3
    CMP $0453                  ; $8AD4
    BNE $8ADB                  ; $8AD7
    SEC                        ; $8AD9
    RTS                        ; $8ADA
    CLC                        ; $8ADB
    RTS                        ; $8ADC
    .byte $A9,$28
    STA $0060                  ; $8ADF
    LDA #$18                   ; $8AE1
    STA $0061                  ; $8AE3
    .byte $20,$A0,$9B
    LDY #$81                   ; $8AE8
    LDX #$B8                   ; $8AEA
    JSR $B0C0                  ; $8AEC
    LDA #$84                   ; $8AEF
    STA $00E6                  ; $8AF1
    LDA #$20                   ; $8AF3
    STA $00E7                  ; $8AF5
    JSR $AEAC                  ; $8AF7
    LDA #$AA                   ; $8AFA
    STA $005C                  ; $8AFC
    LDA #$20                   ; $8AFE
    STA $005D                  ; $8B00
    LDA #$0A                   ; $8B02
    STA $005E                  ; $8B04
    JSR $AF37                  ; $8B06
    DEC $005E                  ; $8B09
    LDA $005E                  ; $8B0B
    BPL $8B06                  ; $8B0D
    LDA $002A                  ; $8B0F
    CMP #$02                   ; $8B11
    BNE $8B37                  ; $8B13
    LDA #$92                   ; $8B15
    STA $00E6                  ; $8B17
    LDA #$20                   ; $8B19
    STA $00E7                  ; $8B1B
    JSR $AEB5                  ; $8B1D
    LDA #$B8                   ; $8B20
    STA $005C                  ; $8B22
    LDA #$20                   ; $8B24
    STA $005D                  ; $8B26
    LDA #$16                   ; $8B28
    STA $005E                  ; $8B2A
    JSR $AF37                  ; $8B2C
    INC $005E                  ; $8B2F
    LDA $005E                  ; $8B31
    CMP #$20                   ; $8B33
    BNE $8B2C                  ; $8B35
    JSR $997E                  ; $8B37
    LDY #$DC                   ; $8B3A
    LDX #$AD                   ; $8B3C
    JSR $9C3A                  ; $8B3E
    LDA $0060                  ; $8B41
    STA $055C                  ; $8B43
    LDA $0061                  ; $8B46
    STA $055F                  ; $8B48
    BPL $8B51                  ; $8B4B
    LDA #$B8                   ; $8B4D
    STA $00E6                  ; $8B4F
    LDA #$01                   ; $8B51
    JSR $9FA8                  ; $8B53
    JSR $9C71                  ; $8B56
    LDA $002A                  ; $8B59
    CMP #$02                   ; $8B5B
    BNE $8B87                  ; $8B5D
    LDA $001E                  ; $8B5F
    AND #$03                   ; $8B61
    BEQ $8B87                  ; $8B63
    LSR                        ; $8B65
    BCS $8B74                  ; $8B66
    LDA #$18                   ; $8B68
    STA $055F                  ; $8B6A
    LDA #$C8                   ; $8B6D
    STA $00E6                  ; $8B6F
    JMP $AB87                  ; $8B71
    LDA #$88                   ; $8B74
    STA $055F                  ; $8B76
    LDA #$B8                   ; $8B79
    STA $00E6                  ; $8B7B
    LDX $055C                  ; $8B7D
    CPX #$C8                   ; $8B80
    BNE $8B87                  ; $8B82
    STA $055C                  ; $8B84
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
    .byte $20,$D3,$B1,$20,$DE,$B1,$AA,$A9,$00,$A4,$E9,$20,$EA,$98,$A9,$05
    .byte $4C,$BB,$B1,$20,$D3,$B1,$20,$DE,$B1,$AA,$B1,$EC,$A4,$E9,$20,$EA
    .byte $98,$A9,$06,$4C,$BB,$B1,$20,$D3,$B1,$20,$DE,$B1,$AA,$A9,$00,$A4
    .byte $E9,$20,$DF,$98,$A9,$05,$4C,$BB,$B1,$20,$D3,$B1,$20,$DE,$B1,$AA
    .byte $B1,$EC,$A4,$E9,$20,$DF,$98,$A9,$06,$4C,$BB,$B1,$20
    .byte $C9,$B1
    JSR $9D27                  ; $919C
    LDA #$03                   ; $919F
    JMP $B1BB                  ; $91A1
    .byte $20,$A0,$98
    LDA #$01                   ; $91A7
    JMP $B1BB                  ; $91A9
    .byte $C8
    LDA ($00EC),Y              ; $91AD
    TAX                        ; $91AF
    INY                        ; $91B0
    LDA ($00EC),Y              ; $91B1
    STA $00ED                  ; $91B3
    STX $00EC                  ; $91B5
    JMP $B0C4                  ; $91B7
    .byte $60,$18
    ADC $00EC                  ; $91BC
    STA $00EC                  ; $91BE
    LDA $00ED                  ; $91C0
    ADC #$00                   ; $91C2
    STA $00ED                  ; $91C4
    JMP $B0C4                  ; $91C6
    LDY #$02                   ; $91C9
    LDA ($00EC),Y              ; $91CB
    TAX                        ; $91CD
    DEY                        ; $91CE
    LDA ($00EC),Y              ; $91CF
    TAY                        ; $91D1
    RTS                        ; $91D2
    INY                        ; $91D3
    LDA ($00EC),Y              ; $91D4
    STA $00E6                  ; $91D6
    INY                        ; $91D8
    LDA ($00EC),Y              ; $91D9
    STA $00E7                  ; $91DB
    RTS                        ; $91DD
    INY                        ; $91DE
    LDA ($00EC),Y              ; $91DF
    STA $00E9                  ; $91E1
    INY                        ; $91E3
    LDA ($00EC),Y              ; $91E4
    INY                        ; $91E6
    RTS                        ; $91E7
    .byte $81,$C1,$82,$C2,$83,$C3,$84,$C4,$85,$C5,$86,$C6,$87,$09,$49,$0A
    .byte $4A,$0B,$4B,$0C,$4C,$0D,$4D,$0E,$4E,$0F,$89,$C9,$8A,$CA,$8B,$CB
    .byte $8C,$CC,$8D,$CD,$8E,$CE,$8F,$11,$51,$12,$52,$13,$53,$14,$54,$15
    .byte $55,$16,$56,$17,$91,$D1,$92,$D2,$93,$D3,$94,$D4,$95,$D5,$96,$D6
    .byte $97,$01,$04,$10,$40,$00,$08,$10,$18,$20,$30,$38,$40,$48,$50,$80
    .byte $88,$90,$98,$A0,$B0,$B8,$C0,$C8,$D0,$0A,$0B,$0C,$0D,$0E,$10,$11
    .byte $12,$13,$14,$4A,$4B,$4C,$4D,$4E,$50,$51,$52,$53,$54,$0A,$31,$04
    .byte $13,$3B,$21,$02,$1A,$39,$06,$0F,$2A,$22,$1C,$09,$11,$34,$15,$23
    .byte $16,$01,$3C,$19,$28,$30,$27,$10,$20,$26,$03,$2F,$0D,$1D,$2B,$05
    .byte $2D,$3E,$0E,$24,$2E,$14,$0B,$07,$35,$1E,$00,$17,$37,$25,$38,$3D
    .byte $32,$08,$3A,$1B,$0C,$12,$36,$2C,$1F,$3F,$18,$29,$33,$FF,$05,$C3
    .byte $20,$1B,$89,$05,$A3,$21,$1B,$BA,$05,$23,$23,$1B,$89,$04,$E2,$20
    .byte $12,$8A,$04,$FE,$20,$12,$8A,$00,$C3,$B2,$0A,$AF,$BC,$0A,$BE,$BC
    .byte $04,$E2,$24,$08,$8A,$04,$FE,$24,$08,$8A,$0F,$01,$C2,$20,$88,$01
    .byte $DE,$20,$90,$01,$22,$23,$8E,$01,$3E,$23,$93,$0B,$2A,$21,$7D,$7D
    .byte $7D,$7D,$7D,$00,$7D,$7D,$7D,$7D,$7D,$49,$6A,$21,$7D,$7D,$7D,$7D
    .byte $7D,$00,$7D,$7D,$7D,$00,$01,$FF,$00,$0D,$0E,$0C,$00,$F3,$F4,$F2
    .byte $00,$00,$00,$00,$00,$40,$01,$00,$50,$48,$01,$00,$50,$0D,$05,$45
    .byte $21,$16,$89,$05,$A5,$21,$16,$BA,$05,$A5,$22,$16,$89,$04,$64,$21
    .byte $0A,$8A,$04,$7B,$21,$0A,$8A,$04,$CF,$21,$07,$BB,$00,$28,$B3,$0F
    .byte $01,$44,$21,$88,$01,$5B,$21,$90,$01,$A4,$22,$8E,$01,$BB,$22,$93
    .byte $42,$33,$22,$91,$8F,$30,$DF,$02,$78,$38,$F1,$02,$68,$38,$F4,$02
    .byte $70,$38,$F5,$02,$78,$38,$F8,$02,$80,$38,$F9,$02,$88,$38,$FC,$02
    .byte $90,$40,$F3,$02,$68,$40,$F6,$02,$70,$40,$F7,$02,$78,$40,$FA,$02
    .byte $80,$40,$FB,$02,$88,$40,$FE,$02,$90,$23,$24,$25,$26,$27,$28,$29
    .byte $2A,$2B,$2C,$2D,$2E,$2F,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39
    .byte $3A,$3B,$3C,$3D,$3E,$3F,$40,$41,$42,$43,$43,$44,$44,$44,$44,$44
    .byte $44,$45,$45,$45,$45,$45,$45,$44,$44,$44,$44,$46,$46,$46,$46,$46
    .byte $46,$46,$46,$46,$46,$46,$46,$46,$46,$46,$46,$46,$46,$47,$47,$47
    .byte $47,$47,$47,$49,$49,$49,$49,$49,$49,$47,$47,$47,$47,$47,$47,$47
    .byte $47,$47,$47,$4B,$4B,$4B,$47,$47,$47,$47,$47,$47,$47,$47,$47,$4D
    .byte $4D,$4D,$4D,$4D,$4D,$4F,$4F,$4F,$4F,$4F,$4F,$4D,$4D,$4D,$4D,$4D
    .byte $4D,$4D,$4D,$4D,$4D,$51,$51,$51,$4D,$4D,$4D,$4D,$4D,$4D,$4D,$4D
    .byte $4D,$53,$53,$53,$53,$53,$53,$54,$54,$54,$54,$54,$54,$53,$53,$53
    .byte $53,$53,$53,$53,$53,$53,$53,$55,$55,$55,$53,$53,$53,$53,$53,$53
    .byte $53,$53,$53,$56,$56,$56,$56,$56,$56,$57,$57,$57,$57,$57,$57,$56
    .byte $56,$56,$56,$58,$58,$58,$58,$58,$58,$58,$58,$58,$58,$58,$58,$58
    .byte $58,$58,$58,$58,$58,$04,$84,$20,$16,$AA,$04,$8D,$20,$16,$AB,$00
    .byte $74,$B4,$00,$B3,$B4,$00,$53,$B6,$0F,$04,$81,$20,$16,$AA,$04,$8A
    .byte $20,$16,$AB,$01,$74,$B4,$FD,$00,$83,$B5,$01,$53,$B6,$FB,$04,$97
    .byte $20,$16,$AA,$04,$9E,$20,$16,$AB,$00,$A1,$B6,$0F,$01,$46,$20,$95
    .byte $0A,$64,$20,$9C,$A8,$5C,$6A,$42,$64,$7D,$00,$A8,$9D,$0A,$44,$23
    .byte $9E,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$9F,$83,$A5,$20,$34,$00,$34
    .byte $93,$A6,$20,$34,$00,$33,$00,$3C,$00,$3B,$00,$3A,$00,$39,$00,$38
    .byte $00,$37,$00,$36,$00,$35,$42,$25,$23,$87,$8B,$0D,$B0,$20,$9C,$A8
    .byte $A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$9D,$00,$0D,$D0,$20,$AA,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$AB,$00,$0D,$F0,$20,$AA,$00
    .byte $5C,$76,$7D,$62,$7D,$4C,$72,$6E,$00,$AB,$00,$0D,$10,$21,$AA,$00
    .byte $94,$00,$00,$00,$00,$00,$00,$00,$95,$AB,$00,$0D,$30,$21,$AA,$00
    .byte $53,$74,$5C,$75,$6E,$4D,$50,$42,$5C,$AB,$00,$0D,$50,$21,$AA,$00
    .byte $00,$00,$00,$94,$00,$00,$00,$00,$00,$AB,$00,$0D,$70,$21,$AA,$00
    .byte $51,$75,$6E,$4C,$00,$00,$00,$00,$00,$AB,$00,$0D,$90,$21,$AA,$00
    .byte $00,$94,$00,$00,$00,$00,$00,$00,$00,$AB,$00,$0D,$B0,$21,$AA,$00
    .byte $6A,$5D,$69,$00,$00,$00,$00,$00,$00,$AB,$00,$0D,$D0,$21,$AA,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$AB,$00,$0D,$F0,$21,$AA,$00
    .byte $05,$2C,$28,$00,$00,$00,$00,$00,$00,$AB,$00,$0D,$10,$22,$9E,$A9
    .byte $A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$9F,$00,$4D,$30,$22,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$0D,$AB,$20,$9C,$A8
    .byte $A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$9D,$AA,$0D,$CB,$20,$AA,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$AB,$AA,$0D,$EB,$20,$AA,$00
    .byte $5C,$76,$7D,$62,$7D,$4C,$72,$6E,$00,$AB,$AA,$0D,$0B,$21,$AA,$00
    .byte $94,$00,$00,$00,$00,$00,$00,$00,$95,$AB,$AA,$0D,$2B,$21,$AA,$00
    .byte $53,$74,$5C,$75,$6E,$4D,$50,$42,$5C,$AB,$AA,$0D,$4B,$21,$AA,$00
    .byte $00,$00,$00,$94,$00,$00,$00,$00,$00,$AB,$AA,$0D,$6B,$21,$AA,$00
    .byte $51,$75,$6E,$4C,$00,$00,$00,$00,$00,$AB,$AA,$0D,$8B,$21,$AA,$00
    .byte $00,$94,$00,$00,$00,$00,$00,$00,$00,$AB,$AA,$0D,$AB,$21,$AA,$00
    .byte $6A,$5D,$69,$00,$00,$00,$00,$00,$00,$AB,$AA,$0D,$CB,$21,$AA,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$AB,$AA,$0D,$EB,$21,$AA,$00
    .byte $05,$2C,$28,$00,$00,$00,$00,$00,$00,$AB,$AA,$0D,$0B,$22,$9E,$A9
    .byte $A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$9F,$AA,$4D,$2B,$22,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$AA,$0A,$91,$22,$98,$AC
    .byte $AC,$AC,$99,$AC,$AC,$AC,$AC,$99,$0A,$B1,$22,$98,$99,$A0,$A0,$AF
    .byte $A0,$A0,$A0,$98,$99,$0A,$D1,$22,$A1,$AF,$A0,$A0,$A4,$A5,$A0,$A0
    .byte $AE,$A1,$0A,$F1,$22,$A3,$AF,$A0,$A0,$A6,$A7,$A0,$A0,$AE,$A3,$0A
    .byte $11,$23,$9A,$9B,$A0,$A0,$AF,$A0,$A0,$A0,$9A,$9B,$4A,$31,$23,$9A
    .byte $AD,$AD,$AD,$9B,$AD,$AD,$AD,$AD,$9B,$01,$59,$20,$94,$08,$77,$20
    .byte $9C,$A8,$5D,$6E,$51,$00,$A8,$9D,$48,$57,$23,$9E,$A9,$A9,$A9,$A9
    .byte $A9,$A9,$9F,$01,$55,$20,$95,$49,$71,$20,$B0,$00,$4B,$6E,$5A,$43
    .byte $6B,$00,$B0,$49,$71,$20,$B0,$00,$15,$2E,$06,$12,$00,$00,$B0,$00
    .byte $00,$00,$00,$01,$55,$20,$95,$49,$71,$20,$B0,$00,$16,$2F,$1E,$2E
    .byte $00,$B0,$00,$0C,$F1,$20,$9C,$5C,$76,$7D,$62,$7D,$4C,$72,$6E,$A8
    .byte $A8,$9D,$0C,$11,$21,$AA,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $AB,$0C,$31,$21,$AA,$00,$37,$77,$36,$77,$36,$00,$00,$00,$00,$AB
    .byte $0C,$51,$21,$AA,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$AB,$0C
    .byte $71,$21,$AA,$00,$37,$77,$37,$77,$35,$00,$00,$00,$00,$AB,$0C,$91
    .byte $21,$AA,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$AB,$0C,$B1,$21
    .byte $AA,$00,$36,$77,$38,$77,$35,$00,$00,$00,$00,$AB,$0C,$D1,$21,$AA
    .byte $00,$94,$00,$94,$00,$00,$00,$00,$95,$00,$AB,$0C,$F1,$21,$AA,$00
    .byte $5C,$67,$4C,$69,$00,$50,$42,$5C,$00,$AB,$0C,$11,$22,$AA,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$AB,$4C,$31,$22,$9E,$A9,$A9,$A9
    .byte $A9,$A9,$A9,$A9,$A9,$A9,$A9,$9F,$09,$12,$21,$94,$00,$00,$00,$00
    .byte $00,$00,$00,$95,$0C,$31,$21,$9C,$53,$74,$5C,$75,$6E,$4D,$50,$42
    .byte $5C,$A8,$9D,$0C,$51,$21,$AA,$00,$00,$00,$00,$00,$00,$00,$95,$00
    .byte $00,$AB,$0C,$71,$21,$AA,$00,$59,$7D,$5F,$69,$50,$42,$5C,$00,$00
    .byte $AB,$0C,$91,$21,$AA,$00,$95,$00,$00,$00,$00,$95,$00,$00,$00,$AB
    .byte $0C,$B1,$21,$AA,$00,$5C,$6A,$4D,$50,$42,$5C,$00,$00,$00,$AB,$0C
    .byte $D1,$21,$AA,$00,$00,$00,$00,$00,$00,$00,$00,$95,$00,$AB,$0C,$F1
    .byte $21,$AA,$00,$46,$43,$6E,$50,$7D,$50,$42,$5C,$00,$AB,$0C,$11,$22
    .byte $AA,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$AB,$4C,$31,$22,$9E
    .byte $A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$9F,$1C,$1D,$1E,$1F,$30
    .byte $31,$32,$33,$34,$35,$00,$14,$28,$3C,$A0,$A0,$C8,$A0,$B4,$A0,$B4
    .byte $98,$A8,$B0,$C8,$C0,$C0,$B0,$B4,$C0,$B4,$B0,$A0,$C0,$A0,$98,$C8
    .byte $98,$B4,$98,$B4,$90,$A4,$B0,$C4,$B0,$B8,$A8,$BC,$C0,$B0,$A8,$AC
    .byte $C0,$A0,$98,$C8,$98,$B4,$98,$AC,$A8,$A4,$B0,$C4,$B0,$BC,$A8,$BC
    .byte $C0,$B4,$B0,$AC,$C0,$A0,$98,$C8,$98,$B0,$98,$B8,$98,$B4,$A8,$C8
    .byte $C0,$C0,$A8,$B4,$C0,$AC,$B8,$A8,$A8,$05,$62,$20,$1B,$89,$05,$62
    .byte $23,$1B,$89,$04,$81,$20,$17,$8A,$04,$9D,$20,$17,$8A,$00,$99,$B8
    .byte $0F,$01,$61,$20,$88,$01,$61,$23,$8E,$01,$7D,$20,$90,$41,$7D,$23
    .byte $93,$0D,$0A,$4E,$BF,$0E,$B4,$B8,$0D,$0A,$BB,$BF,$0A,$15,$BF,$04
    .byte $83,$20,$07,$8A,$04,$8E,$20,$07,$8A,$05,$64,$21,$0A,$89,$04,$90
    .byte $20,$0A,$AA,$04,$9C,$20,$0A,$AB,$05,$D1,$21,$0B,$A9,$04,$C3,$21
    .byte $0D,$AA,$04,$CE,$21,$0D,$AB,$05,$64,$23,$0A,$A9,$04,$30,$22,$0A
    .byte $AA,$04,$3C,$22,$0A,$AB,$05,$71,$23,$0B,$A9,$05,$ED,$24,$08,$A8
    .byte $04,$03,$25,$13,$AA,$04,$1C,$25,$13,$AB,$00,$06,$B9,$0F,$02,$63
    .byte $20,$88,$89,$06,$6C,$20,$89,$89,$90,$00,$9C,$A8,$03,$7A,$20,$A8
    .byte $A8,$9D,$01,$63,$21,$8E,$01,$6E,$21,$93,$02,$A3,$21,$9C,$A8,$03
    .byte $AC,$21,$A8,$A8,$9D,$01,$D0,$21,$9E,$01,$DC,$21,$9F,$02,$10,$22
    .byte $9C,$A8,$03,$1A,$22,$A8,$A8,$9D,$01,$63,$23,$9E,$03,$6E,$23,$9F
    .byte $00,$9E,$01,$7C,$23,$9F,$01,$C3,$24,$8A,$03,$CE,$24,$8A,$00,$AA
    .byte $01,$DC,$24,$AB,$02,$E3,$24,$9C,$A8,$43,$FA,$24,$A8,$A8,$9D,$9E
    .byte $A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9
    .byte $A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$9F,$03,$09,$22,$02,$49,$22,$01
    .byte $89,$22,$05,$C9,$22,$04,$09,$23,$06,$49,$23,$11,$B7,$20,$0F,$F7
    .byte $20,$12,$37,$21,$14,$77,$21,$15,$B7,$21,$09,$57,$22,$07,$97,$22
    .byte $0A,$D7,$22,$0C,$17,$23,$0D,$57,$23,$FF,$18,$09,$22,$19,$49,$22
    .byte $1A,$89,$22,$1C,$E9,$22,$1B,$49,$23,$1E,$B7,$20,$1D,$57,$22,$FF
    .byte $48,$4D,$22,$19,$0A,$28,$00,$00,$00,$16,$2E,$00,$0C,$23,$00,$00
    .byte $01,$12,$12,$03,$04,$05,$06,$07,$08,$09,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00
    .byte $21,$21,$02,$03,$04,$05,$06,$07,$08,$09,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$31,$31,$02,$31,$31,$03,$44
    .byte $31,$44,$44,$55,$06,$55,$44,$07,$55,$55,$44,$08,$09,$30,$0C,$04
    .byte $08,$20,$04,$0A,$00,$20,$08,$02,$06,$18,$00,$00,$00,$20,$08,$02
    .byte $06,$18,$04,$06,$00,$18,$04,$02,$04,$10,$00,$00,$00,$18,$04,$02
    .byte $04,$10,$00,$00,$00,$1A,$06,$02,$04,$14,$00,$00,$00,$52,$00,$54
    .byte $00,$56,$00,$58,$00,$5A,$00,$00,$00,$6D,$00,$7B,$00,$8E,$00,$9A
    .byte $00,$A0,$00,$00,$00,$B1,$00,$BD,$00,$D5,$00,$00,$00,$C8,$00,$E7
    .byte $00,$EA,$00,$ED,$00,$F0,$00,$F2,$00,$F2,$00,$F5,$00,$F8,$00,$FE
    .byte $00,$0A,$01,$0A,$01,$0D,$01,$10,$01,$37,$01,$3D,$01,$45,$01,$45
    .byte $01,$00,$00,$60,$00,$D0,$00,$50,$01,$10,$02,$00,$03,$F8,$03,$00
    .byte $05,$28,$06,$80,$07,$00,$09,$90,$0A,$30,$0C,$E0,$0D,$A0,$0F,$70
    .byte $11,$50,$13,$50,$15,$70,$17,$B0,$19,$00,$1C,$60,$1E,$D0,$20,$48
    .byte $23,$C8,$25,$50,$28,$E0,$2A,$78,$2D,$18,$30,$C8,$32,$88,$35,$58
    .byte $38,$30,$3B,$10,$3E,$F8,$40,$40,$44,$90,$47,$E8,$4A,$48,$4E,$B0
    .byte $51,$20,$55,$00,$59,$20,$5D,$50,$61,$90,$65,$E0,$69,$40,$6E,$00
    .byte $73,$E0,$77,$D0,$7C,$00,$82,$80,$87,$80,$8D,$E0,$93,$D0,$9A,$E0
    .byte $A1,$C0,$A9,$C0,$B1,$D0,$B9,$04,$C2,$80,$CB,$A0,$D7,$00,$E8,$FF
    .byte $FF,$0A,$04,$02,$06,$00,$10,$12,$08,$0E,$0C,$08,$04,$02,$06,$0E
    .byte $00,$12,$10,$0A,$0C,$00,$04,$00,$08,$0E,$06,$00,$0E,$02,$02,$01
    .byte $55,$BB,$11,$7E,$BB,$14,$93,$BB,$15,$99,$BB,$17,$A4,$BB,$18,$C8
    .byte $BB,$1A,$EC,$BB,$1B,$0B,$BC,$1C,$1B,$BC,$1D,$30,$BC,$1F,$36,$BC
    .byte $20,$3C,$BC,$22,$42,$BC,$00,$9D,$00,$03,$06,$00,$A8,$00,$0E,$06
    .byte $FE,$9E,$00,$04,$06,$10,$A3,$00,$09,$06,$FD,$AC,$00,$12,$06,$00
    .byte $BE,$02,$01,$06,$00,$C5,$01,$01,$06,$10,$C9,$03,$01,$06,$FF,$00
    .byte $A8,$00,$0E,$06,$10,$A3,$00,$09,$06,$00,$AA,$00,$10,$06,$10,$C9
    .byte $03,$01,$06,$FF,$00,$CE,$00,$01,$07,$FF,$00,$9F,$00,$05,$06,$00
    .byte $A0,$00,$06,$06,$FF,$00,$A2,$00,$08,$06,$00,$A4,$00,$0A,$06,$00
    .byte $A3,$00,$09,$06,$00,$CB,$03,$03,$06,$00,$D2,$01,$01,$07,$00,$CF
    .byte $00,$02,$07,$00,$D8,$02,$01,$07,$FF,$00,$A2,$00,$08,$06,$00,$A4
    .byte $00,$0A,$06,$00,$A3,$00,$09,$06,$00,$CB,$03,$03,$06,$00,$D2,$01
    .byte $03,$07,$00,$CF,$00,$02,$07,$00,$D8,$02,$01,$07,$FF,$00,$A6,$00
    .byte $0C,$06,$00,$A7,$00,$0D,$06,$00,$A8,$00,$0E,$06,$00,$BF,$02,$02
    .byte $06,$00,$CA,$03,$02,$06,$00,$D5,$01,$04,$07,$FF,$00,$A1,$00,$07
    .byte $06,$00,$D3,$01,$02,$07,$00,$C6,$01,$02,$06,$FF,$00,$AD,$00,$13
    .byte $06,$00,$BF,$02,$02,$06,$00,$D4,$01,$03,$07,$00,$D0,$00,$03,$07
    .byte $FF,$00,$A5,$00,$0B,$06,$FF,$00,$CA,$03,$02,$06,$FF,$00,$A9,$00
    .byte $0F,$06,$FF,$00,$E5,$02,$00,$08,$FF,$26,$25,$66,$25,$A6,$25,$E6
    .byte $25,$26,$26,$66,$26,$A6,$26,$E6,$26,$45,$22,$4D,$22,$55,$22,$85
    .byte $22,$8D,$22,$95,$22,$C5,$22,$CD,$22,$D5,$22,$05,$23,$0D,$23,$01
    .byte $06,$0B,$10,$15,$1A,$1F,$27,$A0,$A5,$AF,$C8,$24,$02,$07,$0C,$11
    .byte $16,$1B,$20,$28,$A1,$A6,$B0,$C9,$25,$03,$08,$0D,$12,$17,$1C,$21
    .byte $29,$A2,$A7,$B1,$CA,$26,$04,$09,$0E,$13,$18,$1D,$22,$2A,$A3,$A8
    .byte $B2,$CB,$2C,$05,$0A,$0F,$14,$19,$1E,$23,$2B,$A4,$A9,$B3,$CC,$85
    .byte $6A,$20,$4D,$4A,$41,$62,$63,$2D,$4C,$71,$7D,$54,$AA,$79,$FF,$28
    .byte $25,$05,$2F,$14,$79,$00,$0A,$2A,$1A,$60,$4D,$47,$6F,$48,$AA,$79
    .byte $79,$FF,$01,$02,$03,$04,$05,$06,$11,$12,$13,$14,$15,$16,$21,$22
    .byte $23,$26,$31,$32,$33,$34,$35,$36,$40,$41,$42,$43,$44,$51,$52,$53
    .byte $54,$55,$56,$57,$FF,$BC,$0C,$BD,$22,$BD,$2C,$BD,$3D,$BD,$4E,$BD
    .byte $6A,$21,$C5,$67,$BA,$69,$00,$68,$45,$46,$6F,$CF,$FF,$66,$21,$A8
    .byte $2E,$0A,$08,$00,$0A,$03,$0A,$03,$4B,$6F,$46,$7D,$0E,$2E,$0C,$31
    .byte $09,$2E,$FF,$6C,$21,$BA,$70,$CD,$6E,$46,$6F,$CF,$FF,$68,$21,$6C
    .byte $7D,$69,$C2,$65,$7D,$4D,$00,$41,$BA,$41,$26,$0E,$2E,$FF,$68,$21
    .byte $6C,$7D,$69,$C2,$65,$7D,$4D,$00,$26,$0E,$2E,$68,$7D,$B6,$FF,$66
    .byte $21,$6C,$7D,$69,$C2,$65,$7D,$4D,$00,$09,$2F,$0C,$32,$03,$54,$7D
    .byte $55,$62,$6E,$54,$FF,$74,$BD,$7C,$BD,$82,$BD,$88,$BD,$8E,$BD,$94
    .byte $BD,$9A,$BD,$A2,$BD,$04,$2E,$0E,$02,$A6,$01,$02,$FF,$34,$06,$02
    .byte $0E,$2E,$FF,$35,$06,$02,$0E,$2E,$FF,$36,$06,$02,$0E,$2E,$FF,$37
    .byte $06,$02,$0E,$2E,$FF,$38,$06,$02,$0E,$2E,$FF,$09,$2F,$0C,$32,$03
    .byte $0E,$2E,$FF,$0B,$02,$0C,$01,$02,$FF,$F2,$BD,$F9,$BD,$00,$BE,$09
    .byte $BE,$11,$BE,$1A,$BE,$21,$BE,$29,$BE,$30,$BE,$37,$BE,$3F,$BE,$48
    .byte $BE,$4F,$BE,$59,$BE,$5F,$BE,$66,$BE,$6D,$BE,$74,$BE,$7D,$BE,$84
    .byte $BE,$8A,$BE,$91,$BE,$97,$BE,$9F,$BE,$A7,$BE,$AE,$BE,$B7,$BE,$C0
    .byte $BE,$CA,$BE,$D2,$BE,$DA,$BE,$E2,$BE,$EA,$BE,$F2,$BE,$FC,$BE,$05
    .byte $BF,$0D,$BF,$00,$4B,$6E,$CD,$43,$6B,$FF,$00,$00,$15,$2E,$06,$12
    .byte $FF,$A8,$2E,$16,$1E,$2E,$65,$7D,$4D,$FF,$00,$5C,$69,$60,$58,$6E
    .byte $4E,$FF,$00,$4A,$68,$6E,$51,$70,$6E,$4D,$FF,$00,$00,$B6,$6A,$60
    .byte $45,$FF,$00,$CD,$69,$62,$42,$67,$4D,$FF,$00,$00,$4B,$6E,$54,$4D
    .byte $FF,$00,$5C,$67,$62,$6E,$B8,$FF,$08,$16,$20,$A0,$08,$02,$2E,$FF
    .byte $01,$07,$10,$0C,$32,$03,$0A,$03,$FF,$00,$00,$10,$12,$15,$20,$FF
    .byte $21,$0B,$0C,$02,$AA,$02,$1C,$A9,$08,$FF,$00,$00,$1C,$27,$19,$FF
    .byte $00,$00,$14,$03,$1E,$03,$FF,$00,$81,$8F,$6B,$7D,$5F,$FF,$00,$43
    .byte $69,$B6,$41,$42,$FF,$5A,$6E,$C5,$69,$B4,$7D,$8F,$91,$FF,$00,$A8
    .byte $2E,$16,$1E,$2E,$FF,$00,$00,$4C,$68,$41,$FF,$00,$11,$31,$03,$A4
    .byte $08,$FF,$00,$00,$42,$67,$6E,$FF,$07,$10,$11,$32,$03,$0E,$2E,$FF
    .byte $4B,$43,$BA,$41,$67,$C4,$41,$FF,$00,$00,$06,$2E,$0A,$08,$FF,$C3
    .byte $4D,$4A,$3F,$BE,$3F,$B4,$5F,$FF,$D1,$7D,$67,$6E,$C2,$65,$7D,$4D
    .byte $FF,$42,$6E,$B6,$67,$6E,$C2,$65,$7D,$4D,$FF,$4F,$C4,$44,$54,$65
    .byte $7D,$4D,$FF,$5C,$67,$6E,$4D,$65,$7D,$4D,$FF,$62,$47,$4C,$4A,$65
    .byte $7D,$4D,$FF,$42,$50,$68,$41,$65,$7D,$4D,$FF,$45,$67,$6E,$BE,$65
    .byte $7D,$4D,$FF,$41,$69,$BC,$6E,$51,$6E,$65,$7D,$4D,$FF,$56,$4C,$C2
    .byte $42,$52,$65,$7D,$4D,$FF,$C5,$67,$BA,$69,$65,$7D,$4D,$FF,$C5,$67
    .byte $BA,$69,$65,$7D,$4D,$FF,$85,$20,$6A,$C6,$69,$FD,$C5,$20,$0B,$02
    .byte $AA,$02,$B4,$6F,$52,$FD,$53,$20,$10,$06,$02,$C7,$7D,$69,$FD,$F3
    .byte $21,$1B,$08,$02,$C7,$7D,$69,$FD,$86,$21,$19,$03,$28,$32,$08,$FD
    .byte $C6,$24,$1B,$2F,$0B,$12,$2C,$A5,$FD,$D6,$24,$B4,$6F,$52,$FF,$91
    .byte $20,$54,$67,$6F,$CF,$FD,$D1,$20,$4C,$71,$7D,$54,$FD,$11,$21,$4D
    .byte $69,$7D,$FD,$51,$21,$48,$68,$41,$7D,$FD,$91,$21,$0E,$28,$01,$02
    .byte $FD,$E4,$21,$C2,$68,$C5,$69,$FD,$24,$22,$CD,$4D,$FD,$64,$22,$4C
    .byte $71,$7D,$54,$FD,$A4,$22,$50,$6F,$48,$69,$FD,$E4,$22,$C5,$6B,$6F
    .byte $48,$FD,$24,$23,$CD,$4D,$46,$6F,$54,$FD,$31,$22,$54,$67,$6F,$CF
    .byte $FD,$71,$22,$4C,$71,$7D,$54,$FD,$B1,$22,$4D,$69,$7D,$FD,$F1,$22
    .byte $48,$68,$41,$7D,$FD,$31,$23,$0E,$28,$01,$02,$FF,$91,$20,$14,$B0
    .byte $AA,$0D,$FD,$E4,$21,$CD,$4D,$FD,$24,$22,$47,$70,$6F,$51,$FD,$64
    .byte $22,$CD,$6E,$51,$FD,$C4,$22,$0F,$15,$04,$29,$FD,$A4,$22,$C2,$68
    .byte $C5,$69,$16,$FD,$24,$23,$0F,$15,$04,$29,$FD,$04,$23,$4C,$71,$7D
    .byte $54,$16,$FD,$31,$22,$14,$B0,$AA,$0D,$FF,$FF,$FF,$FF,$FF,$FF,$FF
    .byte $FF
