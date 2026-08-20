; ============================================================
; bank26/bank26.s
; bank 26 - 真实 6502 汇编 (8KB)
; CPU 地址范围: $8000-$9FFF
; 源: _tmp_bzk_out/bank_26/bank_26_partMM.asm
; 代码=助记符, 数据=.byte, build_nes.py 可直接编译
; ============================================================

.segment "PRG_BANK26"
.org $8000

    .byte $4C,$03
    LDA ($004C,X)              ; $8002
    .byte $3C,$80,$4C,$F8,$84,$4C,$F6,$86
    JMP $8835                  ; $800C
    JMP $87E1                  ; $800F
    JMP $888D                  ; $8012
    JMP $88A8                  ; $8015
    .byte $4C,$F3,$88,$4C,$E5,$8B
    JMP $8B4A                  ; $801E
    JMP $8F72                  ; $8021
    JMP $8CA4                  ; $8024
    .byte $4C,$27,$81
    JMP $A1EB                  ; $802A
    .byte $4C,$7B,$98
    JMP $95E1                  ; $8030
    JMP $8E86                  ; $8033
    JMP $85AC                  ; $8036
    JMP $904E                  ; $8039
    .byte $A9,$00
    STA $044E                  ; $803E
    STA $0621                  ; $8041
    JSR $C600                  ; $8044
    LDA #$02                   ; $8047
    JSR $C54B                  ; $8049
    JSR $8F72                  ; $804C
    LDA $0600                  ; $804F
    BNE $805A                  ; $8052
    STA $0617                  ; $8054
    JMP $8127                  ; $8057
    JSR $8223                  ; $805A
    LDA #$00                   ; $805D
    STA $0616                  ; $805F
    LDA a: $00E2               ; $8062
    AND #$07                   ; $8065
    CMP $0600                  ; $8067
    BCC $8071                  ; $806A
    SBC $0600                  ; $806C
    BCS $8067                  ; $806F
    STA $0617                  ; $8071
    .byte $AE,$17,$06
    BMI $8081                  ; $8077
    CPX $0616                  ; $8079
    BNE $8081                  ; $807C
    JSR $8176                  ; $807E
    LDX $0616                  ; $8081
    LDA $060B,X                ; $8084
    CMP #$06                   ; $8087
    BNE $808E                  ; $8089
    JMP $80DC                  ; $808B
    STA $043D                  ; $808E
    LDY $0606,X                ; $8091
    STY $043E                  ; $8094
    CMP #$00                   ; $8097
    BNE $80AB                  ; $8099
    CPY #$01                   ; $809B
    BNE $80AB                  ; $809D
    LDA $043B                  ; $809F
    CMP #$00                   ; $80A2
    BEQ $80AB                  ; $80A4
    LDA #$00                   ; $80A6
    STA $043E                  ; $80A8
    LDA $0601,X                ; $80AB
    STA $0442                  ; $80AE
    LDA #$07                   ; $80B1
    JSR $C54B                  ; $80B3
    JSR $8FF3                  ; $80B6
    LDX $0616                  ; $80B9
    LDA $0606,X                ; $80BC
    STA $043E                  ; $80BF
    LDA $043B                  ; $80C2
    ASL                        ; $80C5
    ASL                        ; $80C6
    ADC $043D                  ; $80C7
    TAX                        ; $80CA
    ASL                        ; $80CB
    STA $003B                  ; $80CC
    LDA #$00                   ; $80CE
    LDY $827C,X                ; $80D0
    JSR $8EE9                  ; $80D3
    JSR $8132                  ; $80D6
    JSR $814C                  ; $80D9
    .byte $EE,$16,$06
    LDA $0616                  ; $80DF
    CMP $0600                  ; $80E2
    BEQ $80EA                  ; $80E5
    JMP $8074                  ; $80E7
    JSR $9085                  ; $80EA
    .byte $20,$06,$C6
    LDA $043B                  ; $80F0
    JSR $C509                  ; $80F3
    .byte $FE,$80,$07,$81,$18,$81,$1E,$81,$20,$70,$81
    LDX #$50                   ; $8101
    TXS                        ; $8103
    JMP $C618                  ; $8104
    .byte $20,$1E,$C6
    LDA #$0A                   ; $810A
    JSR $C54B                  ; $810C
    JSR $8170                  ; $810F
    LDX #$50                   ; $8112
    TXS                        ; $8114
    JMP $C612                  ; $8115
    .byte $A2,$50
    TXS                        ; $811A
    JMP $C60F                  ; $811B
    .byte $20,$70,$81
    LDX #$50                   ; $8121
    TXS                        ; $8123
    JMP $C621                  ; $8124
    .byte $20,$DD,$90
    LDA #$00                   ; $812A
    STA $0617                  ; $812C
    JMP $80ED                  ; $812F
    .byte $48
    LDA $043D                  ; $8133
    ASL                        ; $8136
    ASL                        ; $8137
    TAX                        ; $8138
    PLA                        ; $8139
    LDY #$00                   ; $813A
    CMP $828C,X                ; $813C
    BCS $8145                  ; $813F
    INY                        ; $8141
    INX                        ; $8142
    BNE $813C                  ; $8143
    JMP $8148                  ; $8145
    .byte $8C,$12,$06
    RTS                        ; $814B
    BIT $0617                  ; $814C
    BMI $8154                  ; $814F
    JSR $8E33                  ; $8151
    LDA #$00                   ; $8154
    JSR $C54E                  ; $8156
    LDA $0612                  ; $8159
    JSR $C509                  ; $815C
    .byte $69,$81,$9C,$81,$BC,$81,$D1,$81,$EA,$81,$20,$BA,$8B
    SEC                        ; $816C
    JMP $9095                  ; $816D
    BIT $0617                  ; $8170
    BPL $8176                  ; $8173
    RTS                        ; $8175
    LDX $043B                  ; $8176
    CPX #$02                   ; $8179
    BEQ $819B                  ; $817B
    LDA #$00                   ; $817D
    STA $062D                  ; $817F
    LDA $8278,X                ; $8182
    JSR $C54E                  ; $8185
    LDA $0444                  ; $8188
    AND #$03                   ; $818B
    STA $044E                  ; $818D
    JSR $C624                  ; $8190
    LDA $0617                  ; $8193
    ORA #$80                   ; $8196
    STA $0617                  ; $8198
    RTS                        ; $819B
    .byte $20,$BA,$8B
    SEC                        ; $819F
    LDA $061C                  ; $81A0
    SBC $0619                  ; $81A3
    TAX                        ; $81A6
    LDA $061D                  ; $81A7
    SBC #$00                   ; $81AA
    BPL $81B2                  ; $81AC
    .byte $A2,$00,$A9,$00
    STX $061C                  ; $81B2
    STA $061D                  ; $81B5
    SEC                        ; $81B8
    JMP $9095                  ; $81B9
    .byte $20,$C8,$8B
    CLC                        ; $81BF
    JSR $9095                  ; $81C0
    LDA #$00                   ; $81C3
    STA $0600                  ; $81C5
    JSR $81ED                  ; $81C8
    LDX #$50                   ; $81CB
    TXS                        ; $81CD
    JMP $8BDF                  ; $81CE
    .byte $20,$C8,$8B
    CLC                        ; $81D4
    JSR $9095                  ; $81D5
    JSR $C606                  ; $81D8
    JSR $81ED                  ; $81DB
    .byte $AD,$42,$04
    JSR $8E6E                  ; $81E1
    LDX #$50                   ; $81E4
    TXS                        ; $81E6
    JMP $C60F                  ; $81E7
    .byte $4C,$66,$93
    LDA $043B                  ; $81ED
    CMP #$00                   ; $81F0
    BNE $8222                  ; $81F2
    LDA $043D                  ; $81F4
    CMP #$00                   ; $81F7
    BNE $8222                  ; $81F9
    LDA $043E                  ; $81FB
    AND #$7F                   ; $81FE
    CMP #$01                   ; $8200
    BNE $8222                  ; $8202
    LDA $0442                  ; $8204
    JSR $C50C                  ; $8207
    LDA #$50                   ; $820A
    STA $043F                  ; $820C
    LDA #$00                   ; $820F
    STA $0440                  ; $8211
    JSR $8FFB                  ; $8214
    LDA #$00                   ; $8217
    STA $0600                  ; $8219
    LDX #$50                   ; $821C
    TXS                        ; $821E
    JMP $8BDF                  ; $821F
    RTS                        ; $8222
    LDX #$00                   ; $8223
    LDA $0601,X                ; $8225
    JSR $C50C                  ; $8228
    LDY #$00                   ; $822B
    LDA ($0034),Y              ; $822D
    CMP #$14                   ; $822F
    BEQ $823E                  ; $8231
    CMP #$49                   ; $8233
    BEQ $823E                  ; $8235
    INX                        ; $8237
    CPX $0600                  ; $8238
    BNE $8225                  ; $823B
    RTS                        ; $823D
    LDA $043B                  ; $823E
    BNE $8277                  ; $8241
    LDA $060B,X                ; $8243
    BNE $8277                  ; $8246
    LDA $0606,X                ; $8248
    CMP #$01                   ; $824B
    BNE $8277                  ; $824D
    LDA $0601,X                ; $824F
    PHA                        ; $8252
    LDY $0600                  ; $8253
    DEY                        ; $8256
    LDA $0601,Y                ; $8257
    STA $0601,X                ; $825A
    LDA $060B,Y                ; $825D
    STA $060B,X                ; $8260
    LDA $0606,Y                ; $8263
    STA $0606,X                ; $8266
    LDA #$01                   ; $8269
    STA $0606,Y                ; $826B
    LDA #$00                   ; $826E
    STA $060B,Y                ; $8270
    PLA                        ; $8273
    STA $0601,Y                ; $8274
    RTS                        ; $8277
    .byte $1D,$18,$00,$19,$80,$00,$00,$00,$00,$00,$80,$00,$00,$80,$00,$00
    .byte $00,$00,$80,$00,$9A,$60,$30,$00,$9A,$60,$44,$00,$9A,$60,$44,$00
    .byte $A9,$02
    JSR $C54B                  ; $829A
    JSR $8F72                  ; $829D
    LDA #$01                   ; $82A0
    JSR $C54E                  ; $82A2
    LDA $0600                  ; $82A5
    BNE $82B6                  ; $82A8
    STA $0612                  ; $82AA
    STA $0617                  ; $82AD
    JSR $90DD                  ; $82B0
    JMP $83F5                  ; $82B3
    LDA #$00                   ; $82B6
    STA $0616                  ; $82B8
    LDX $0616                  ; $82BB
    LDY $060B,X                ; $82BE
    LDA $0601,X                ; $82C1
    STA $0442                  ; $82C4
    BEQ $82D1                  ; $82C7
    CMP #$0B                   ; $82C9
    BEQ $82D1                  ; $82CB
    CPY #$06                   ; $82CD
    BEQ $82E4                  ; $82CF
    STY $043D                  ; $82D1
    LDA $0606,X                ; $82D4
    STA $043E                  ; $82D7
    LDA #$02                   ; $82DA
    JSR $C54E                  ; $82DC
    LDA #$14                   ; $82DF
    JSR $C515                  ; $82E1
    INC $0616                  ; $82E4
    LDA $0616                  ; $82E7
    CMP $0600                  ; $82EA
    BNE $82BB                  ; $82ED
    LDA #$04                   ; $82EF
    JSR $C54E                  ; $82F1
    LDA #$00                   ; $82F4
    STA $0616                  ; $82F6
    STA $0617                  ; $82F9
    .byte $A9,$01
    JSR $C515                  ; $82FE
    LDA #$00                   ; $8301
    STA $0612                  ; $8303
    LDX $0616                  ; $8306
    LDA $060B,X                ; $8309
    STA $043D                  ; $830C
    LDA $0606,X                ; $830F
    STA $043E                  ; $8312
    LDA $0601,X                ; $8315
    STA $0442                  ; $8318
    BEQ $8321                  ; $831B
    CMP #$0B                   ; $831D
    BNE $8333                  ; $831F
    LDA $060B,X                ; $8321
    CMP #$04                   ; $8324
    BNE $832B                  ; $8326
    JMP $83A2                  ; $8328
    LDA #$08                   ; $832B
    JSR $C54B                  ; $832D
    JMP $8349                  ; $8330
    LDA $060B,X                ; $8333
    CMP #$06                   ; $8336
    BNE $833D                  ; $8338
    JMP $83A2                  ; $833A
    CMP #$05                   ; $833D
    BNE $8344                  ; $833F
    JMP $83A2                  ; $8341
    LDA #$07                   ; $8344
    JSR $C54B                  ; $8346
    .byte $20,$F3,$8F
    LDX $043B                  ; $834C
    LDA $83D7,X                ; $834F
    ASL                        ; $8352
    ASL                        ; $8353
    STA $003B                  ; $8354
    LDX $043D                  ; $8356
    LDA #$02                   ; $8359
    LDY $0442                  ; $835B
    BEQ $8367                  ; $835E
    CPY #$0B                   ; $8360
    BEQ $8367                  ; $8362
    LDA $83DD,X                ; $8364
    CLC                        ; $8367
    ADC $003B                  ; $8368
    TAX                        ; $836A
    ASL                        ; $836B
    STA $003B                  ; $836C
    LDA #$01                   ; $836E
    LDY $83E1,X                ; $8370
    JSR $8EE9                  ; $8373
    CMP $83F1,X                ; $8376
    BCS $837F                  ; $8379
    INX                        ; $837B
    INY                        ; $837C
    BNE $8376                  ; $837D
    JSR $8148                  ; $837F
    JSR $8E33                  ; $8382
    LDA #$06                   ; $8385
    LDX #$01                   ; $8387
    LDY $0612                  ; $8389
    CPY #$02                   ; $838C
    BCC $8393                  ; $838E
    DEX                        ; $8390
    LDA #$05                   ; $8391
    PHA                        ; $8393
    TXA                        ; $8394
    LSR                        ; $8395
    JSR $9095                  ; $8396
    PLA                        ; $8399
    JSR $C54E                  ; $839A
    LDA #$07                   ; $839D
    JSR $C54E                  ; $839F
    .byte $AD,$12,$06
    CMP #$03                   ; $83A5
    BCS $83BC                  ; $83A7
    LDA $0442                  ; $83A9
    BEQ $83B2                  ; $83AC
    CMP #$0B                   ; $83AE
    BNE $83BC                  ; $83B0
    LDA $043D                  ; $83B2
    CMP #$03                   ; $83B5
    BNE $83BC                  ; $83B7
    INC $0617                  ; $83B9
    LDA $0612                  ; $83BC
    CMP #$02                   ; $83BF
    BCS $83D4                  ; $83C1
    INC $0616                  ; $83C3
    LDA $0616                  ; $83C6
    CMP $0600                  ; $83C9
    BEQ $83D1                  ; $83CC
    JMP $82FC                  ; $83CE
    JSR $9085                  ; $83D1
    JMP $83F5                  ; $83D4
    .byte $02,$00,$00,$00,$01,$03,$00,$00,$00,$01,$80,$00,$00,$00,$00,$00
    .byte $80,$00,$00,$80,$80,$00,$00,$00,$00,$00,$A0,$60,$40,$00,$20,$06
    .byte $C6
    LDA $0612                  ; $83F8
    JSR $C509                  ; $83FB
    .byte $08,$84,$08,$84,$3F,$84,$4B,$84,$7C,$84,$20,$BA,$8B
    LDA #$08                   ; $840B
    JSR $C54E                  ; $840D
    SEC                        ; $8410
    JSR $9095                  ; $8411
    JSR $847F                  ; $8414
    LDA $043B                  ; $8417
    JSR $C509                  ; $841A
    .byte $29,$84,$12,$C6,$3C,$84,$3C,$84,$27,$C6,$2A,$C6,$AD,$17,$06
    BNE $8436                  ; $842C
    LDA #$00                   ; $842E
    STA $0621                  ; $8430
    JMP $C618                  ; $8433
    LDX #$50                   ; $8436
    TXS                        ; $8438
    JMP $88F3                  ; $8439
    .byte $4C,$3C,$84,$20,$C8,$8B
    JSR $847F                  ; $8442
    LDX #$50                   ; $8445
    TXS                        ; $8447
    JMP $8BDF                  ; $8448
    .byte $20,$C8,$8B
    LDA $0442                  ; $844E
    BEQ $8470                  ; $8451
    CMP #$0B                   ; $8453
    BEQ $8470                  ; $8455
    LDX $043D                  ; $8457
    CPX #$02                   ; $845A
    BNE $846A                  ; $845C
    LDA $0442                  ; $845E
    JSR $8E6E                  ; $8461
    LDX #$50                   ; $8464
    TXS                        ; $8466
    JMP $C60F                  ; $8467
    LDX #$50                   ; $846A
    TXS                        ; $846C
    JMP $C630                  ; $846D
    STA $05FB                  ; $8470
    JSR $8E6E                  ; $8473
    LDX #$50                   ; $8476
    TXS                        ; $8478
    JMP $C633                  ; $8479
    .byte $4C,$66,$93
    LDA $0617                  ; $847F
    BNE $8485                  ; $8482
    RTS                        ; $8484
    JSR $C551                  ; $8485
    LDY #$0A                   ; $8488
    LDA #$06                   ; $848A
    STA ($0034),Y              ; $848C
    RTS                        ; $848E
    JSR $C551                  ; $848F
    LDY #$0A                   ; $8492
    LDA ($0034),Y              ; $8494
    BNE $84EE                  ; $8496
    LDA $0635                  ; $8498
    BPL $84A2                  ; $849B
    EOR #$FF                   ; $849D
    CLC                        ; $849F
    ADC #$01                   ; $84A0
    TAX                        ; $84A2
    LDA $0637                  ; $84A3
    BPL $84AD                  ; $84A6
    EOR #$FF                   ; $84A8
    CLC                        ; $84AA
    ADC #$01                   ; $84AB
    TAY                        ; $84AD
    JSR $C539                  ; $84AE
    LDX #$08                   ; $84B1
    CMP $84EF,X                ; $84B3
    BEQ $84BD                  ; $84B6
    DEX                        ; $84B8
    BPL $84B3                  ; $84B9
    BMI $84EE                  ; $84BB
    LDA #$33                   ; $84BD
    CPX #$06                   ; $84BF
    BCC $84C5                  ; $84C1
    LDA #$55                   ; $84C3
    CMP a: $00E2               ; $84C5
    BCC $84EE                  ; $84C8
    LDX $0600                  ; $84CA
    CPX #$05                   ; $84CD
    BCS $84EE                  ; $84CF
    LDA $05FB                  ; $84D1
    BEQ $84DA                  ; $84D4
    CPX #$04                   ; $84D6
    BCS $84EE                  ; $84D8
    LDA $0600,X                ; $84DA
    STA $0601,X                ; $84DD
    DEX                        ; $84E0
    BPL $84DA                  ; $84E1
    LDA $05FB                  ; $84E3
    EOR #$0B                   ; $84E6
    STA $0601                  ; $84E8
    INC $0600                  ; $84EB
    RTS                        ; $84EE
    .byte $03,$0F,$1B,$10,$1C,$1D,$04,$05,$11,$A9,$01
    STA $0600                  ; $84FA
    LDA $05FB                  ; $84FD
    PHP                        ; $8500
    EOR #$0B                   ; $8501
    STA $0601                  ; $8503
    STA $0442                  ; $8506
    PLP                        ; $8509
    BNE $8514                  ; $850A
    LDA #$02                   ; $850C
    JSR $C54B                  ; $850E
    JMP $852F                  ; $8511
    LDA #$14                   ; $8514
    JSR $C515                  ; $8516
    LDA #$00                   ; $8519
    STA $0011                  ; $851B
    STA $0012                  ; $851D
    JSR $C52D                  ; $851F
    LDA #$32                   ; $8522
    JSR $C54E                  ; $8524
    LDA #$04                   ; $8527
    STA $0621                  ; $8529
    JSR $C600                  ; $852C
    .byte $A9,$08
    JSR $C54B                  ; $8531
    JSR $8FF3                  ; $8534
    JSR $C551                  ; $8537
    LDX #$F3                   ; $853A
    LDY #$00                   ; $853C
    LDA ($0034),Y              ; $853E
    CMP #$21                   ; $8540
    BEQ $8548                  ; $8542
    CMP #$40                   ; $8544
    BNE $854A                  ; $8546
    LDX #$CD                   ; $8548
    LDA #$00                   ; $854A
    CPX a: $00E2               ; $854C
    BCS $8553                  ; $854F
    LDA #$80                   ; $8551
    LDX #$00                   ; $8553
    STX $003B                  ; $8555
    TAX                        ; $8557
    PHP                        ; $8558
    LDA #$03                   ; $8559
    PLP                        ; $855B
    JSR $8F1F                  ; $855C
    LDY #$00                   ; $855F
    CMP $86B9,Y                ; $8561
    BCS $856B                  ; $8564
    BEQ $856B                  ; $8566
    INY                        ; $8568
    BNE $8561                  ; $8569
    LDX $05FB                  ; $856B
    BNE $8591                  ; $856E
    LDX a: $002B               ; $8570
    CPX #$05                   ; $8573
    BNE $8591                  ; $8575
    LDX $0446                  ; $8577
    BEQ $8591                  ; $857A
    LDA $043C                  ; $857C
    BEQ $8591                  ; $857F
    CMP #$03                   ; $8581
    BEQ $8589                  ; $8583
    CPX #$04                   ; $8585
    BCS $8591                  ; $8587
    LDY #$02                   ; $8589
    BIT a: $00E2               ; $858B
    BPL $8591                  ; $858E
    INY                        ; $8590
    JSR $8148                  ; $8591
    LDA #$00                   ; $8594
    STA $0616                  ; $8596
    LDA #$09                   ; $8599
    JSR $C54E                  ; $859B
    LDA $0612                  ; $859E
    JSR $C509                  ; $85A1
    .byte $AC,$85,$05,$86,$1C,$86,$46,$86,$A2,$00
    LDA $0441                  ; $85AE
    JSR $8BD4                  ; $85B1
    JSR $85E3                  ; $85B4
    LDA #$30                   ; $85B7
    JSR $C54E                  ; $85B9
    JSR $987B                  ; $85BC
    LDA $05FB                  ; $85BF
    EOR #$0B                   ; $85C2
    STA $05FB                  ; $85C4
    JSR $C50C                  ; $85C7
    LDA #$00                   ; $85CA
    LDY #$05                   ; $85CC
    STA ($0034),Y              ; $85CE
    LDY #$07                   ; $85D0
    STA ($0034),Y              ; $85D2
    LDY #$0A                   ; $85D4
    STA ($0034),Y              ; $85D6
    LDA #$04                   ; $85D8
    STA $0629                  ; $85DA
    LDX #$50                   ; $85DD
    TXS                        ; $85DF
    JMP $C636                  ; $85E0
    LDX $05FB                  ; $85E3
    BEQ $85ED                  ; $85E6
    JSR $904E                  ; $85E8
    LDX #$01                   ; $85EB
    INC a: $0028,X             ; $85ED
    LDA #$01                   ; $85F0
    JSR $C52A                  ; $85F2
    RTS                        ; $85F5
    BIT $063E                  ; $85F6
    BPL $8601                  ; $85F9
    LDA #$32                   ; $85FB
    JSR $C55D                  ; $85FD
    RTS                        ; $8600
    JSR $C56F                  ; $8601
    RTS                        ; $8604
    .byte $AD,$3C,$04
    AND #$3F                   ; $8608
    CMP #$03                   ; $860A
    BCC $85AC                  ; $860C
    LDA $05FB                  ; $860E
    EOR #$0B                   ; $8611
    STA $05FB                  ; $8613
    LDX #$50                   ; $8616
    TXS                        ; $8618
    JMP $C633                  ; $8619
    .byte $20,$C8,$8B
    LDA #$00                   ; $861F
    STA $0600                  ; $8621
    JSR $86D3                  ; $8624
    JSR $86BD                  ; $8627
    LDA $0616                  ; $862A
    BEQ $8640                  ; $862D
    LDA #$B0                   ; $862F
    LDX $05FB                  ; $8631
    BEQ $8638                  ; $8634
    LDA #$50                   ; $8636
    STA $0635                  ; $8638
    LDA #$80                   ; $863B
    STA $0637                  ; $863D
    LDX #$50                   ; $8640
    TXS                        ; $8642
    JMP $8BDF                  ; $8643
    .byte $20,$C8,$8B
    JSR $86BD                  ; $8649
    LDA $043D                  ; $864C
    CMP #$01                   ; $864F
    BEQ $8661                  ; $8651
    LDA $05FB                  ; $8653
    EOR #$0B                   ; $8656
    JSR $8E6E                  ; $8658
    LDX #$50                   ; $865B
    TXS                        ; $865D
    JMP $C633                  ; $865E
    LDA a: $00E2               ; $8661
    AND #$07                   ; $8664
    LDY $05FB                  ; $8666
    BNE $866D                  ; $8669
    EOR #$07                   ; $866B
    TAX                        ; $866D
    ASL                        ; $866E
    ASL                        ; $866F
    ASL                        ; $8670
    STA $003A                  ; $8671
    LDA #$30                   ; $8673
    LDY $05FB                  ; $8675
    BNE $867C                  ; $8678
    LDA #$90                   ; $867A
    CLC                        ; $867C
    ADC $003A                  ; $867D
    STA $0635                  ; $867F
    LDA a: $00E3               ; $8682
    AND #$0F                   ; $8685
    .byte $DD,$B1,$86
    BCC $8692                  ; $868A
    SBC $86B1,X                ; $868C
    JMP $8687                  ; $868F
    ASL                        ; $8692
    ASL                        ; $8693
    ASL                        ; $8694
    ADC #$50                   ; $8695
    BIT a: $00E3               ; $8697
    BPL $869E                  ; $869A
    EOR #$FF                   ; $869C
    STA $0637                  ; $869E
    LDA #$01                   ; $86A1
    STA $05FF                  ; $86A3
    LDA #$00                   ; $86A6
    STA $0600                  ; $86A8
    JSR $86D3                  ; $86AB
    JMP $8BE5                  ; $86AE
    .byte $03,$03,$03,$06,$06,$06,$06,$06,$BF,$BB,$87,$00
    JSR $C551                  ; $86BD
    LDA #$07                   ; $86C0
    LDX $0443                  ; $86C2
    CPX #$02                   ; $86C5
    BCC $86CB                  ; $86C7
    LDA #$0B                   ; $86C9
    LDY #$05                   ; $86CB
    CLC                        ; $86CD
    ADC ($0034),Y              ; $86CE
    STA ($0034),Y              ; $86D0
    RTS                        ; $86D2
    LDA a: $00E2               ; $86D3
    CMP #$40                   ; $86D6
    BCS $86F5                  ; $86D8
    JSR $C551                  ; $86DA
    LDY #$07                   ; $86DD
    LDA ($0034),Y              ; $86DF
    CMP #$50                   ; $86E1
    BCS $86F5                  ; $86E3
    ADC #$4F                   ; $86E5
    CMP #$80                   ; $86E7
    BCC $86ED                  ; $86E9
    LDA #$7F                   ; $86EB
    STA ($0034),Y              ; $86ED
    LDY #$06                   ; $86EF
    LDA #$04                   ; $86F1
    STA ($0034),Y              ; $86F3
    RTS                        ; $86F5
    .byte $A9,$03
    STA $0621                  ; $86F8
    LDA #$01                   ; $86FB
    STA $0600                  ; $86FD
    LDA $05FB                  ; $8700
    EOR #$0B                   ; $8703
    STA $0601                  ; $8705
    STA $0442                  ; $8708
    LDA #$02                   ; $870B
    JSR $C54B                  ; $870D
    LDA #$31                   ; $8710
    JSR $C54E                  ; $8712
    JSR $C600                  ; $8715
    JSR $8F72                  ; $8718
    LDA $043B                  ; $871B
    CMP #$01                   ; $871E
    BNE $8732                  ; $8720
    LDA #$00                   ; $8722
    STA $044E                  ; $8724
    LDA #$18                   ; $8727
    JSR $C54E                  ; $8729
    LDX #$50                   ; $872C
    TXS                        ; $872E
    JMP $C612                  ; $872F
    LDA #$08                   ; $8732
    JSR $C54B                  ; $8734
    JSR $8FF3                  ; $8737
    LDA $043D                  ; $873A
    SEC                        ; $873D
    SBC #$05                   ; $873E
    STA $003B                  ; $8740
    LDA $043B                  ; $8742
    ASL                        ; $8745
    ADC $003B                  ; $8746
    TAX                        ; $8748
    ASL                        ; $8749
    STA $003B                  ; $874A
    LDA #$04                   ; $874C
    LDY $87D7,X                ; $874E
    JSR $8EE9                  ; $8751
    STA $003A                  ; $8754
    JSR $8F59                  ; $8756
    LSR                        ; $8759
    LSR                        ; $875A
    CLC                        ; $875B
    ADC $003A                  ; $875C
    BCC $8762                  ; $875E
    LDA #$FF                   ; $8760
    LDY #$00                   ; $8762
    CMP $87DD,Y                ; $8764
    BCS $876E                  ; $8767
    BEQ $876E                  ; $8769
    INY                        ; $876B
    BNE $8764                  ; $876C
    JSR $8148                  ; $876E
    JSR $8E33                  ; $8771
    LDA #$0A                   ; $8774
    JSR $C54E                  ; $8776
    LDA $0612                  ; $8779
    JSR $C509                  ; $877C
    .byte $89,$87,$9F,$87,$B7,$87,$C3,$87,$D4,$87,$20,$BA,$8B
    JSR $8485                  ; $878C
    LDA $043B                  ; $878F
    CMP #$00                   ; $8792
    BNE $8799                  ; $8794
    JMP $88F3                  ; $8796
    LDX #$50                   ; $8799
    TXS                        ; $879B
    JMP $892A                  ; $879C
    .byte $20,$BA,$8B
    JSR $8485                  ; $87A2
    LDA a: $00E2               ; $87A5
    CMP #$40                   ; $87A8
    BCS $87B1                  ; $87AA
    LDA #$24                   ; $87AC
    JSR $8CF5                  ; $87AE
    LDX #$50                   ; $87B1
    TXS                        ; $87B3
    JMP $8BDF                  ; $87B4
    .byte $20,$C8,$8B
    JSR $8485                  ; $87BA
    LDX #$50                   ; $87BD
    TXS                        ; $87BF
    JMP $8BDF                  ; $87C0
    .byte $20,$C8,$8B
    LDA $05FB                  ; $87C6
    EOR #$0B                   ; $87C9
    JSR $8E6E                  ; $87CB
    LDX #$50                   ; $87CE
    TXS                        ; $87D0
    JMP $C633                  ; $87D1
    .byte $4C,$66,$93,$00,$80,$00,$00,$80,$00,$A8,$5A,$52,$00,$AD,$FB,$05
    EOR #$0B                   ; $87E4
    STA $0041                  ; $87E6
    INC $0041                  ; $87E8
    LDA #$0A                   ; $87EA
    STA $003B                  ; $87EC
    LDA $0041                  ; $87EE
    JSR $C50C                  ; $87F0
    LDY #$0A                   ; $87F3
    LDA ($0034),Y              ; $87F5
    BNE $882E                  ; $87F7
    LDY #$06                   ; $87F9
    LDA ($0034),Y              ; $87FB
    TAX                        ; $87FD
    LDY #$08                   ; $87FE
    LDA ($0034),Y              ; $8800
    TAY                        ; $8802
    JSR $C539                  ; $8803
    CMP $05FE                  ; $8806
    BNE $882E                  ; $8809
    LDX $0600                  ; $880B
    CPX #$05                   ; $880E
    BCS $882E                  ; $8810
    LDA $05FB                  ; $8812
    BEQ $881B                  ; $8815
    CPX #$04                   ; $8817
    BCS $882E                  ; $8819
    LDA a: $00E2               ; $881B
    SBC a: $00E3               ; $881E
    CMP $061A                  ; $8821
    BCS $882E                  ; $8824
    LDA $0041                  ; $8826
    STA $0601,X                ; $8828
    INC $0600                  ; $882B
    INC $0041                  ; $882E
    DEC $003B                  ; $8830
    BNE $87EE                  ; $8832
    RTS                        ; $8834
    .byte $AD,$00,$06
    BNE $883B                  ; $8838
    RTS                        ; $883A
    LDA #$00                   ; $883B
    STA $0616                  ; $883D
    LDA #$01                   ; $8840
    JSR $C515                  ; $8842
    LDA $044E                  ; $8845
    PHA                        ; $8848
    LDA #$00                   ; $8849
    STA $044E                  ; $884B
    LDX $0616                  ; $884E
    LDA $0601,X                ; $8851
    STA $0442                  ; $8854
    LDX $061B                  ; $8857
    LDA $888B,X                ; $885A
    STA $043D                  ; $885D
    LDA #$00                   ; $8860
    STA $043E                  ; $8862
    LDA $0442                  ; $8865
    LDA #$07                   ; $8868
    JSR $C54B                  ; $886A
    JSR $888D                  ; $886D
    PLA                        ; $8870
    STA $044E                  ; $8871
    JSR $88A8                  ; $8874
    INC $0616                  ; $8877
    LDA $0616                  ; $887A
    CMP $0600                  ; $887D
    BNE $8840                  ; $8880
    LDA #$00                   ; $8882
    STA $0600                  ; $8884
    STA $05FF                  ; $8887
    RTS                        ; $888A
    .byte $00,$02,$A9,$00
    STA $003A                  ; $888F
    LDA $043B                  ; $8891
    ASL                        ; $8894
    ASL                        ; $8895
    ADC $043D                  ; $8896
    TAX                        ; $8899
    ASL                        ; $889A
    STA $003B                  ; $889B
    LDA #$05                   ; $889D
    LDY $88EB,X                ; $889F
    JSR $8EE9                  ; $88A2
    JMP $8132                  ; $88A5
    .byte $A9,$0B
    JSR $C54E                  ; $88AA
    LDA $0612                  ; $88AD
    JSR $C509                  ; $88B0
    .byte $69,$81,$9C,$81,$BB,$88,$D5,$88,$20,$C8,$8B
    LDA $0442                  ; $88BE
    JSR $C50C                  ; $88C1
    LDY #$06                   ; $88C4
    LDA ($0034),Y              ; $88C6
    STA $0635                  ; $88C8
    LDY #$08                   ; $88CB
    LDA ($0034),Y              ; $88CD
    STA $0637                  ; $88CF
    JMP $81BC                  ; $88D2
    .byte $20,$C8,$8B
    CLC                        ; $88D8
    JSR $9095                  ; $88D9
    LDA $0442                  ; $88DC
    JSR $8E6E                  ; $88DF
    JSR $C606                  ; $88E2
    LDX #$50                   ; $88E5
    TXS                        ; $88E7
    JMP $C60F                  ; $88E8
    .byte $80,$00,$00,$00,$00,$00,$80,$00,$A9,$00
    STA $043B                  ; $88F5
    LDA $05FB                  ; $88F8
    EOR #$0B                   ; $88FB
    STA $0442                  ; $88FD
    LDA a: $00E2               ; $8900
    LDY #$00                   ; $8903
    CMP $8928,Y                ; $8905
    BCS $890F                  ; $8908
    BEQ $890F                  ; $890A
    INY                        ; $890C
    BNE $8905                  ; $890D
    JSR $8148                  ; $890F
    LDA #$00                   ; $8912
    STA $0616                  ; $8914
    LDA #$0C                   ; $8917
    JSR $C54E                  ; $8919
    LDA $0612                  ; $891C
    JSR $C509                  ; $891F
    .byte $AC,$85,$05,$86,$1C,$86,$10,$00,$A0,$00
    LDA #$00                   ; $892C
    STA $043B                  ; $892E
    STA $043C                  ; $8931
    LDA a: $00E2               ; $8934
    CMP $8975,Y                ; $8937
    BCS $8941                  ; $893A
    BEQ $8941                  ; $893C
    INY                        ; $893E
    BNE $8937                  ; $893F
    JSR $8148                  ; $8941
    LDA #$0D                   ; $8944
    JSR $C54E                  ; $8946
    LDA $0612                  ; $8949
    JSR $C509                  ; $894C
    .byte $55,$89,$55,$89,$72,$89,$2C,$4C,$04
    BPL $896F                  ; $8958
    LDA $0441                  ; $895A
    CMP #$14                   ; $895D
    BNE $896F                  ; $895F
    JSR $9070                  ; $8961
    JSR $85E3                  ; $8964
    LDA #$47                   ; $8967
    JSR $C54E                  ; $8969
    JMP $85BC                  ; $896C
    JMP $85AC                  ; $896F
    .byte $4C,$DF,$8B,$56,$45,$00,$A9,$02
    JSR $C54B                  ; $897A
    JSR $8F72                  ; $897D
    LDA #$0E                   ; $8980
    JSR $C54E                  ; $8982
    LDA $0600                  ; $8985
    BNE $8993                  ; $8988
    STA $0612                  ; $898A
    JSR $90DD                  ; $898D
    JMP $8A6F                  ; $8990
    LDA #$00                   ; $8993
    STA $0616                  ; $8995
    LDX $0616                  ; $8998
    LDA $060B,X                ; $899B
    CMP #$06                   ; $899E
    BEQ $89BB                  ; $89A0
    STA $043D                  ; $89A2
    LDA $0601,X                ; $89A5
    STA $0442                  ; $89A8
    LDA $0606,X                ; $89AB
    STA $043E                  ; $89AE
    LDA #$0F                   ; $89B1
    JSR $C54E                  ; $89B3
    LDA #$14                   ; $89B6
    JSR $C515                  ; $89B8
    INC $0616                  ; $89BB
    LDA $0616                  ; $89BE
    CMP $0600                  ; $89C1
    BNE $8998                  ; $89C4
    LDA #$04                   ; $89C6
    JSR $C54E                  ; $89C8
    LDA #$00                   ; $89CB
    STA $0616                  ; $89CD
    .byte $A9,$01
    JSR $C515                  ; $89D2
    LDA #$00                   ; $89D5
    STA $0612                  ; $89D7
    LDX $0616                  ; $89DA
    LDA $0601,X                ; $89DD
    STA $0442                  ; $89E0
    LDA $0606,X                ; $89E3
    STA $043E                  ; $89E6
    LDA $060B,X                ; $89E9
    STA $043D                  ; $89EC
    CMP #$06                   ; $89EF
    BNE $89F6                  ; $89F1
    JMP $8A4F                  ; $89F3
    CMP #$05                   ; $89F6
    BNE $89FD                  ; $89F8
    JMP $8A4F                  ; $89FA
    LDA #$07                   ; $89FD
    JSR $C54B                  ; $89FF
    JSR $8FF3                  ; $8A02
    LDX $043B                  ; $8A05
    LDA $8A63,X                ; $8A08
    ASL                        ; $8A0B
    ASL                        ; $8A0C
    LDX $043D                  ; $8A0D
    ADC $8A6A,X                ; $8A10
    TAX                        ; $8A13
    ASL                        ; $8A14
    STA $003B                  ; $8A15
    LDA #$08                   ; $8A17
    LDY $83E1,X                ; $8A19
    JSR $8EE9                  ; $8A1C
    CMP $8AAC,X                ; $8A1F
    BCS $8A28                  ; $8A22
    INX                        ; $8A24
    INY                        ; $8A25
    BNE $8A1F                  ; $8A26
    JSR $8148                  ; $8A28
    LDA #$11                   ; $8A2B
    LDX #$01                   ; $8A2D
    LDY $0612                  ; $8A2F
    CPY #$02                   ; $8A32
    BCC $8A39                  ; $8A34
    DEX                        ; $8A36
    LDA #$10                   ; $8A37
    PHA                        ; $8A39
    TXA                        ; $8A3A
    LSR                        ; $8A3B
    JSR $9095                  ; $8A3C
    PLA                        ; $8A3F
    JSR $C54E                  ; $8A40
    LDA #$12                   ; $8A43
    JSR $C54E                  ; $8A45
    LDY $0612                  ; $8A48
    CPY #$02                   ; $8A4B
    BCS $8A60                  ; $8A4D
    .byte $EE,$16,$06
    LDA $0616                  ; $8A52
    CMP $0600                  ; $8A55
    BEQ $8A5D                  ; $8A58
    JMP $89D0                  ; $8A5A
    JSR $9085                  ; $8A5D
    JMP $8A6F                  ; $8A60
    .byte $00,$00,$00,$00,$01,$00,$02,$00,$00,$00,$00,$01,$20,$06,$C6
    LDA $0612                  ; $8A72
    JSR $C509                  ; $8A75
    .byte $80,$8A,$80,$8A,$DF,$8B,$9C,$8A,$20,$BA,$8B
    LDA #$13                   ; $8A83
    JSR $C54E                  ; $8A85
    LDA $043B                  ; $8A88
    JSR $C509                  ; $8A8B
    .byte $00,$00,$12,$C6,$00,$00,$00,$00,$27,$C6,$00,$00,$2D,$C6,$20,$C8
    .byte $8B
    LDA $043D                  ; $8A9F
    CMP #$02                   ; $8AA2
    BNE $8AA9                  ; $8AA4
    JMP $81DE                  ; $8AA6
    JMP $8BDF                  ; $8AA9
    .byte $A0,$60,$40,$00,$AD,$41,$04
    LDX #$02                   ; $8AB3
    JSR $8B3A                  ; $8AB5
    LDA a: $00E2               ; $8AB8
    AND #$03                   ; $8ABB
    CMP #$03                   ; $8ABD
    BNE $8AC3                  ; $8ABF
    LDA #$00                   ; $8AC1
    CLC                        ; $8AC3
    ADC #$03                   ; $8AC4
    STA $003A                  ; $8AC6
    LDA $05FB                  ; $8AC8
    EOR #$0B                   ; $8ACB
    CLC                        ; $8ACD
    ADC $003A                  ; $8ACE
    STA $0442                  ; $8AD0
    STA $0601                  ; $8AD3
    LDX #$03                   ; $8AD6
    JSR $8B3A                  ; $8AD8
    LDA #$00                   ; $8ADB
    STA $043D                  ; $8ADD
    LDA #$00                   ; $8AE0
    STA $043E                  ; $8AE2
    STA $044E                  ; $8AE5
    JSR $8F72                  ; $8AE8
    LDA #$07                   ; $8AEB
    JSR $C54B                  ; $8AED
    LDA #$0A                   ; $8AF0
    LDX #$00                   ; $8AF2
    STX $003B                  ; $8AF4
    LDX #$80                   ; $8AF6
    JSR $8EE9                  ; $8AF8
    LDY #$00                   ; $8AFB
    LDX $0612                  ; $8AFD
    BNE $8B0A                  ; $8B00
    CMP $8B46,Y                ; $8B02
    BCS $8B0A                  ; $8B05
    INY                        ; $8B07
    BNE $8B02                  ; $8B08
    JSR $8148                  ; $8B0A
    LDA $0441                  ; $8B0D
    LDX #$FE                   ; $8B10
    JSR $8B3A                  ; $8B12
    LDA $0442                  ; $8B15
    LDX #$FD                   ; $8B18
    JSR $8B3A                  ; $8B1A
    LDA #$14                   ; $8B1D
    JSR $C54E                  ; $8B1F
    LDA #$00                   ; $8B22
    STA $061A                  ; $8B24
    LDA #$02                   ; $8B27
    STA $05FF                  ; $8B29
    LDA $0612                  ; $8B2C
    JSR $C509                  ; $8B2F
    .byte $1B,$C6,$1B,$C6,$DF,$8B,$D5,$88
    JSR $C50C                  ; $8B3A
    LDY #$03                   ; $8B3D
    TXA                        ; $8B3F
    CLC                        ; $8B40
    ADC ($0034),Y              ; $8B41
    STA ($0034),Y              ; $8B43
    RTS                        ; $8B45
    .byte $A0,$60,$40,$00,$20,$9C,$8B
    BCS $8B50                  ; $8B4D
    RTS                        ; $8B4F
    JSR $C624                  ; $8B50
    LDA #$00                   ; $8B53
    STA $0600                  ; $8B55
    TXA                        ; $8B58
    LDX #$02                   ; $8B59
    EOR $05FB                  ; $8B5B
    BEQ $8B62                  ; $8B5E
    LDX #$01                   ; $8B60
    STX $0621                  ; $8B62
    LDA #$FF                   ; $8B65
    STA $061A                  ; $8B67
    JSR $87E1                  ; $8B6A
    LDX #$50                   ; $8B6D
    TXS                        ; $8B6F
    JMP $8B73                  ; $8B70
    .byte $A9,$0A
    JSR $C609                  ; $8B75
    LDA #$3F                   ; $8B78
    LDX $0621                  ; $8B7A
    CPX #$02                   ; $8B7D
    BEQ $8B86                  ; $8B7F
    JSR $848F                  ; $8B81
    LDA #$2F                   ; $8B84
    JSR $C54E                  ; $8B86
    JSR $8E86                  ; $8B89
    JSR $C600                  ; $8B8C
    LDA $0621                  ; $8B8F
    CMP #$01                   ; $8B92
    BNE $8B99                  ; $8B94
    JMP $8298                  ; $8B96
    JMP $8978                  ; $8B99
    LDA $0637                  ; $8B9C
    CMP #$60                   ; $8B9F
    BCC $8BB6                  ; $8BA1
    CMP #$A0                   ; $8BA3
    BCS $8BB6                  ; $8BA5
    LDX #$00                   ; $8BA7
    LDA $0635                  ; $8BA9
    CMP #$50                   ; $8BAC
    BCC $8BB8                  ; $8BAE
    LDX #$0B                   ; $8BB0
    CMP #$B0                   ; $8BB2
    BCS $8BB8                  ; $8BB4
    CLC                        ; $8BB6
    RTS                        ; $8BB7
    SEC                        ; $8BB8
    RTS                        ; $8BB9
    LDA $0600                  ; $8BBA
    BEQ $8BC7                  ; $8BBD
    LDA $0441                  ; $8BBF
    LDX #$01                   ; $8BC2
    JMP $8BD4                  ; $8BC4
    RTS                        ; $8BC7
    LDX #$03                   ; $8BC8
    LDA $0442                  ; $8BCA
    BEQ $8BD4                  ; $8BCD
    CMP #$0B                   ; $8BCF
    BEQ $8BD4                  ; $8BD1
    DEX                        ; $8BD3
    .byte $20,$0C,$C5
    LDY #$00                   ; $8BD7
    LDA ($0034),Y              ; $8BD9
    JSR $C4C8                  ; $8BDB
    RTS                        ; $8BDE
    .byte $20,$70,$90
    JSR $8C6D                  ; $8BE2
    .byte $20,$06,$C6
    JSR $8C42                  ; $8BE8
    BCS $8C12                  ; $8BEB
    LDA #$00                   ; $8BED
    JSR $C548                  ; $8BEF
    STA $003A                  ; $8BF2
    LDA $0047                  ; $8BF4
    PHA                        ; $8BF6
    LDA #$0B                   ; $8BF7
    JSR $C548                  ; $8BF9
    TAX                        ; $8BFC
    PLA                        ; $8BFD
    CMP $0047                  ; $8BFE
    BCC $8C10                  ; $8C00
    BEQ $8C09                  ; $8C02
    STX $003A                  ; $8C04
    JMP $8C10                  ; $8C06
    BIT a: $00E2               ; $8C09
    BPL $8C10                  ; $8C0C
    STX $003A                  ; $8C0E
    .byte $A5,$3A
    JSR $8E6E                  ; $8C12
    LDA $0441                  ; $8C15
    JSR $C50C                  ; $8C18
    LDY #$06                   ; $8C1B
    LDA $0635                  ; $8C1D
    STA ($0034),Y              ; $8C20
    LDY #$08                   ; $8C22
    LDA $0637                  ; $8C24
    STA ($0034),Y              ; $8C27
    LDA #$00                   ; $8C29
    STA $043C                  ; $8C2B
    JSR $C624                  ; $8C2E
    JSR $8B4A                  ; $8C31
    LDA #$2C                   ; $8C34
    JSR $C54E                  ; $8C36
    JSR $8E86                  ; $8C39
    LDX #$50                   ; $8C3C
    TXS                        ; $8C3E
    JMP $C60F                  ; $8C3F
    LDA $0600                  ; $8C42
    BEQ $8C5F                  ; $8C45
    LDX #$00                   ; $8C47
    LDA $0601,X                ; $8C49
    BEQ $8C59                  ; $8C4C
    CMP #$0B                   ; $8C4E
    BEQ $8C59                  ; $8C50
    LDA $060B,X                ; $8C52
    CMP #$05                   ; $8C55
    BEQ $8C61                  ; $8C57
    INX                        ; $8C59
    CPX $0600                  ; $8C5A
    BNE $8C49                  ; $8C5D
    CLC                        ; $8C5F
    RTS                        ; $8C60
    LDA a: $00E2               ; $8C61
    CMP #$40                   ; $8C64
    BCS $8C5F                  ; $8C66
    LDA $0601,X                ; $8C68
    SEC                        ; $8C6B
    RTS                        ; $8C6C
    LDA a: $00E2               ; $8C6D
    AND #$83                   ; $8C70
    LDX $0637                  ; $8C72
    JSR $8C92                  ; $8C75
    STA $0637                  ; $8C78
    LDA a: $00E3               ; $8C7B
    AND #$83                   ; $8C7E
    STA $062C                  ; $8C80
    LDX $0635                  ; $8C83
    JSR $8C92                  ; $8C86
    STA $0635                  ; $8C89
    LDA #$00                   ; $8C8C
    JSR $8CA4                  ; $8C8E
    RTS                        ; $8C91
    ASL                        ; $8C92
    PHP                        ; $8C93
    ASL                        ; $8C94
    ASL                        ; $8C95
    PLP                        ; $8C96
    BCC $8C9D                  ; $8C97
    EOR #$FF                   ; $8C99
    ADC #$00                   ; $8C9B
    STA $003A                  ; $8C9D
    TXA                        ; $8C9F
    CLC                        ; $8CA0
    ADC $003A                  ; $8CA1
    RTS                        ; $8CA3
    .byte $4A
    PHP                        ; $8CA5
    LDA $0635                  ; $8CA6
    CMP #$30                   ; $8CA9
    BCC $8CCB                  ; $8CAB
    CMP #$D0                   ; $8CAD
    BCS $8CCB                  ; $8CAF
    LDA $0637                  ; $8CB1
    CMP #$50                   ; $8CB4
    BCC $8CBE                  ; $8CB6
    CMP #$B0                   ; $8CB8
    BCS $8CBE                  ; $8CBA
    PLP                        ; $8CBC
    RTS                        ; $8CBD
    PLP                        ; $8CBE
    JSR $8CEA                  ; $8CBF
    JSR $C55A                  ; $8CC2
    LDX #$50                   ; $8CC5
    TXS                        ; $8CC7
    JMP $911C                  ; $8CC8
    PLP                        ; $8CCB
    JSR $8CEA                  ; $8CCC
    JSR $C55A                  ; $8CCF
    LDA $05FB                  ; $8CD2
    BEQ $8CD9                  ; $8CD5
    LDA #$80                   ; $8CD7
    EOR $0635                  ; $8CD9
    BPL $8CE4                  ; $8CDC
    LDX #$50                   ; $8CDE
    TXS                        ; $8CE0
    JMP $92EE                  ; $8CE1
    LDX #$50                   ; $8CE4
    TXS                        ; $8CE6
    JMP $955E                  ; $8CE7
    BCC $8CF4                  ; $8CEA
    LDA $05FB                  ; $8CEC
    EOR #$0B                   ; $8CEF
    STA $05FB                  ; $8CF1
    RTS                        ; $8CF4
    PHA                        ; $8CF5
    JSR $C551                  ; $8CF6
    PLA                        ; $8CF9
    LDY #$07                   ; $8CFA
    CLC                        ; $8CFC
    ADC ($0034),Y              ; $8CFD
    BPL $8D03                  ; $8CFF
    .byte $A9,$7F
    STA ($0034),Y              ; $8D03
    RTS                        ; $8D05
    PHP                        ; $8D06
    ASL                        ; $8D07
    TAX                        ; $8D08
    LDA $8D93,X                ; $8D09
    STA $003C                  ; $8D0C
    LDA $8D94,X                ; $8D0E
    STA $003D                  ; $8D11
    LDA a: $00E2               ; $8D13
    ADC a: $00E3               ; $8D16
    ROR                        ; $8D19
    LDX #$00                   ; $8D1A
    PLP                        ; $8D1C
    BPL $8D4A                  ; $8D1D
    BIT $003A                  ; $8D1F
    BMI $8D4A                  ; $8D21
    LDY $0621                  ; $8D23
    CPY #$04                   ; $8D26
    BNE $8D33                  ; $8D28
    LDY $0442                  ; $8D2A
    BEQ $8D3A                  ; $8D2D
    CPY #$0B                   ; $8D2F
    BEQ $8D3A                  ; $8D31
    LDY a: $00E3               ; $8D33
    CPY #$F8                   ; $8D36
    BCC $8D4A                  ; $8D38
    INX                        ; $8D3A
    TAY                        ; $8D3B
    LDA $043E                  ; $8D3C
    ORA #$80                   ; $8D3F
    STA $043E                  ; $8D41
    TYA                        ; $8D44
    AND #$7F                   ; $8D45
    JMP $8D60                  ; $8D47
    LDY $003B                  ; $8D4A
    .byte $D1,$3C
    BCC $8D57                  ; $8D4E
    BEQ $8D57                  ; $8D50
    SBC ($003C),Y              ; $8D52
    JMP $8D4C                  ; $8D54
    LDX #$00                   ; $8D57
    INY                        ; $8D59
    CLC                        ; $8D5A
    ADC ($003C),Y              ; $8D5B
    BCC $8D60                  ; $8D5D
    INX                        ; $8D5F
    .byte $24,$3A
    BPL $8D74                  ; $8D62
    LSR $0033                  ; $8D64
    ROR $0032                  ; $8D66
    LSR $0033                  ; $8D68
    ROR $0032                  ; $8D6A
    LSR $0033                  ; $8D6C
    ROR $0032                  ; $8D6E
    LSR $0033                  ; $8D70
    ROR $0032                  ; $8D72
    STA $0067                  ; $8D74
    STX $0068                  ; $8D76
    LDA $0032                  ; $8D78
    STA $0069                  ; $8D7A
    LDA $0033                  ; $8D7C
    STA $006A                  ; $8D7E
    JSR $C521                  ; $8D80
    LDA #$00                   ; $8D83
    STA a: $0074               ; $8D85
    LDA $006C                  ; $8D88
    LDY $006D                  ; $8D8A
    BEQ $8D90                  ; $8D8C
    LDA #$FF                   ; $8D8E
    STA $0071                  ; $8D90
    RTS                        ; $8D92
    .byte $A9,$8D,$C9,$8D,$C9,$8D,$E9,$8D,$EB,$8D,$F7,$8D,$17,$8E,$17,$8E
    .byte $17,$8E,$31,$8E,$2F,$8E,$C0,$40,$99,$00,$99,$00,$00,$00,$99,$00
    .byte $99,$00,$C0,$40,$00,$00,$99,$00,$C0,$40,$99,$00,$00,$00,$99,$00
    .byte $99,$00,$C0,$40,$00,$00,$80,$80,$C0,$40,$C0,$40,$00,$00,$99,$00
    .byte $80,$80,$80,$80,$00,$00,$99,$00,$C0,$40,$80,$80,$00,$00,$C0,$40
    .byte $99,$00,$99,$00,$00,$00,$80,$80,$B3,$00,$DA,$25,$00,$00,$00,$00
    .byte $CD,$32,$BF,$00,$C0,$40,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $E6,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $80
    .byte $80,$00,$00,$80,$80,$80,$80,$00,$00,$00,$00,$C0,$40,$80,$80,$00
    .byte $00,$00,$00,$99,$00,$C0,$40,$00,$00,$00,$00,$80,$80,$80,$80
    LDA $0600                  ; $8E33
    BEQ $8E6D                  ; $8E36
    LDX $043D                  ; $8E38
    LDA $0442                  ; $8E3B
    BEQ $8E44                  ; $8E3E
    CMP #$0B                   ; $8E40
    BNE $8E4A                  ; $8E42
    CPX #$04                   ; $8E44
    BEQ $8E6D                  ; $8E46
    BNE $8E52                  ; $8E48
    CPX #$05                   ; $8E4A
    BEQ $8E6D                  ; $8E4C
    CPX #$06                   ; $8E4E
    BEQ $8E6D                  ; $8E50
    JSR $8B9C                  ; $8E52
    LDA $0612                  ; $8E55
    BNE $8E6D                  ; $8E58
    LDA #$0F                   ; $8E5A
    BCS $8E60                  ; $8E5C
    LDA #$3F                   ; $8E5E
    CMP a: $00E2               ; $8E60
    BCC $8E6D                  ; $8E63
    LDA #$04                   ; $8E65
    STA $0612                  ; $8E67
    JSR $C55A                  ; $8E6A
    RTS                        ; $8E6D
    STA $0441                  ; $8E6E
    LDX #$00                   ; $8E71
    CMP #$0B                   ; $8E73
    BCC $8E79                  ; $8E75
    LDX #$0B                   ; $8E77
    TXA                        ; $8E79
    EOR $05FB                  ; $8E7A
    STX $05FB                  ; $8E7D
    BEQ $8E85                  ; $8E80
    JSR $C56F                  ; $8E82
    RTS                        ; $8E85
    .byte $AD,$46,$04
    CMP #$05                   ; $8E89
    BEQ $8EE8                  ; $8E8B
    CMP #$04                   ; $8E8D
    BNE $8EE8                  ; $8E8F
    LDA $05FB                  ; $8E91
    BNE $8EE8                  ; $8E94
    LDA $0441                  ; $8E96
    JSR $C50C                  ; $8E99
    LDY #$00                   ; $8E9C
    LDA ($0034),Y              ; $8E9E
    CMP #$01                   ; $8EA0
    BEQ $8EE8                  ; $8EA2
    LDY #$06                   ; $8EA4
    LDA ($0034),Y              ; $8EA6
    BPL $8EE8                  ; $8EA8
    LDA $0441                  ; $8EAA
    STA $05FC                  ; $8EAD
    LDA #$01                   ; $8EB0
    PHA                        ; $8EB2
    JSR $C50C                  ; $8EB3
    LDY #$00                   ; $8EB6
    LDA ($0034),Y              ; $8EB8
    CMP #$01                   ; $8EBA
    BEQ $8EC4                  ; $8EBC
    PLA                        ; $8EBE
    CLC                        ; $8EBF
    ADC #$01                   ; $8EC0
    BNE $8EB2                  ; $8EC2
    PLA                        ; $8EC4
    STA $0441                  ; $8EC5
    INC $0446                  ; $8EC8
    LDA #$00                   ; $8ECB
    STA $0615                  ; $8ECD
    STA $062D                  ; $8ED0
    LDA #$17                   ; $8ED3
    JSR $C54E                  ; $8ED5
    LDA #$00                   ; $8ED8
    STA $043B                  ; $8EDA
    LDA #$04                   ; $8EDD
    STA $043C                  ; $8EDF
    LDX #$50                   ; $8EE2
    TXS                        ; $8EE4
    JMP $85AC                  ; $8EE5
    RTS                        ; $8EE8
    JSR $8D06                  ; $8EE9
    LDA $0071                  ; $8EEC
    LSR                        ; $8EEE
    LSR                        ; $8EEF
    STA $0619                  ; $8EF0
    LDA $061D                  ; $8EF3
    STA $0070                  ; $8EF6
    LDA $061C                  ; $8EF8
    ASL                        ; $8EFB
    ROL $0070                  ; $8EFC
    ASL                        ; $8EFE
    ROL $0070                  ; $8EFF
    ASL                        ; $8F01
    ROL $0070                  ; $8F02
    ASL                        ; $8F04
    ROL $0070                  ; $8F05
    ASL                        ; $8F07
    ROL $0070                  ; $8F08
    ASL                        ; $8F0A
    ROL $0070                  ; $8F0B
    STA $006F                  ; $8F0D
    JSR $C51E                  ; $8F0F
    LDA $006F                  ; $8F12
    LDY $0070                  ; $8F14
    BEQ $8F1A                  ; $8F16
    LDA #$FF                   ; $8F18
    LDX #$00                   ; $8F1A
    LDY #$00                   ; $8F1C
    RTS                        ; $8F1E
    JSR $8D06                  ; $8F1F
    LDA $061C                  ; $8F22
    STA $0067                  ; $8F25
    LDA $061D                  ; $8F27
    STA $0068                  ; $8F2A
    LDA #$C0                   ; $8F2C
    STA $0069                  ; $8F2E
    LDA #$00                   ; $8F30
    STA $006A                  ; $8F32
    JSR $C521                  ; $8F34
    LDA $006B                  ; $8F37
    STA $006F                  ; $8F39
    LDA $006C                  ; $8F3B
    STA $0070                  ; $8F3D
    JSR $C51E                  ; $8F3F
    LDA $006F                  ; $8F42
    LDY $0070                  ; $8F44
    BEQ $8F4A                  ; $8F46
    LDA #$FF                   ; $8F48
    STA $003A                  ; $8F4A
    JSR $8F59                  ; $8F4C
    CLC                        ; $8F4F
    ADC $003A                  ; $8F50
    BCC $8F56                  ; $8F52
    LDA #$FF                   ; $8F54
    LDY #$00                   ; $8F56
    RTS                        ; $8F58
    JSR $C551                  ; $8F59
    LDY #$05                   ; $8F5C
    LDA ($0034),Y              ; $8F5E
    SEC                        ; $8F60
    SBC $062B                  ; $8F61
    BCS $8F68                  ; $8F64
    LDA #$00                   ; $8F66
    LDY #$07                   ; $8F68
    CLC                        ; $8F6A
    ADC ($0034),Y              ; $8F6B
    BCC $8F71                  ; $8F6D
    .byte $A9,$FF
    RTS                        ; $8F71
    .byte $AD,$41,$04
    LDA #$06                   ; $8F75
    JSR $C54B                  ; $8F77
    LDA #$00                   ; $8F7A
    STA $003A                  ; $8F7C
    LDA $05FB                  ; $8F7E
    BNE $8F9A                  ; $8F81
    LDA $043B                  ; $8F83
    CMP #$02                   ; $8F86
    BNE $8F97                  ; $8F88
    LDA $0600                  ; $8F8A
    BNE $8F97                  ; $8F8D
    LDA #$00                   ; $8F8F
    STA $043F                  ; $8F91
    STA $0440                  ; $8F94
    JSR $8FFB                  ; $8F97
    BIT $003A                  ; $8F9A
    BMI $8FAD                  ; $8F9C
    LDA a: $00E2               ; $8F9E
    CMP #$08                   ; $8FA1
    BCS $8FAD                  ; $8FA3
    LDA $043C                  ; $8FA5
    ORA #$80                   ; $8FA8
    STA $043C                  ; $8FAA
    LDX #$00                   ; $8FAD
    LDA a: $00E2               ; $8FAF
    ADC a: $00E3               ; $8FB2
    ROR                        ; $8FB5
    ORA #$80                   ; $8FB6
    BIT $043C                  ; $8FB8
    BPL $8FC0                  ; $8FBB
    INX                        ; $8FBD
    AND #$7F                   ; $8FBE
    ADC #$00                   ; $8FC0
    BCC $8FC5                  ; $8FC2
    INX                        ; $8FC4
    STA $0067                  ; $8FC5
    STX $0068                  ; $8FC7
    BIT $003A                  ; $8FC9
    BPL $8FDD                  ; $8FCB
    LSR $0033                  ; $8FCD
    ROR $0032                  ; $8FCF
    LSR $0033                  ; $8FD1
    ROR $0032                  ; $8FD3
    LSR $0033                  ; $8FD5
    ROR $0032                  ; $8FD7
    LSR $0033                  ; $8FD9
    ROR $0032                  ; $8FDB
    LDA $0032                  ; $8FDD
    STA $0069                  ; $8FDF
    LDA $0033                  ; $8FE1
    STA $006A                  ; $8FE3
    JSR $C521                  ; $8FE5
    LDA $006C                  ; $8FE8
    STA $061C                  ; $8FEA
    LDA $006D                  ; $8FED
    STA $061D                  ; $8FEF
    RTS                        ; $8FF2
    LDA $05FB                  ; $8FF3
    BNE $8FFB                  ; $8FF6
    STA $003A                  ; $8FF8
    RTS                        ; $8FFA
    LDA #$00                   ; $8FFB
    STA $003A                  ; $8FFD
    LDY #$00                   ; $8FFF
    LDA ($0034),Y              ; $9001
    CMP #$20                   ; $9003
    BNE $902F                  ; $9005
    LDA $05FB                  ; $9007
    BNE $9018                  ; $900A
    LDA $043B                  ; $900C
    BNE $9018                  ; $900F
    LDA $043C                  ; $9011
    CMP #$03                   ; $9014
    BCS $902F                  ; $9016
    LDA $0440                  ; $9018
    LSR                        ; $901B
    TAX                        ; $901C
    LDA $043F                  ; $901D
    ROR                        ; $9020
    CLC                        ; $9021
    ADC $043F                  ; $9022
    STA $043F                  ; $9025
    TXA                        ; $9028
    ADC $0440                  ; $9029
    STA $0440                  ; $902C
    LDY #$01                   ; $902F
    SEC                        ; $9031
    LDA ($0034),Y              ; $9032
    SBC $043F                  ; $9034
    TAX                        ; $9037
    INY                        ; $9038
    LDA ($0034),Y              ; $9039
    SBC $0440                  ; $903B
    BPL $9047                  ; $903E
    LDX #$00                   ; $9040
    LDA #$00                   ; $9042
    SEC                        ; $9044
    ROR $003A                  ; $9045
    STA ($0034),Y              ; $9047
    DEY                        ; $9049
    TXA                        ; $904A
    STA ($0034),Y              ; $904B
    RTS                        ; $904D
    .byte $2C,$4B,$04
    BPL $906F                  ; $9051
    LDA #$00                   ; $9053
    STA $044B                  ; $9055
    STA a: $002F               ; $9058
    LDA #$0C                   ; $905B
    PHA                        ; $905D
    JSR $C50C                  ; $905E
    LDY #$01                   ; $9061
    LDA #$00                   ; $9063
    STA ($0034),Y              ; $9065
    PLA                        ; $9067
    CLC                        ; $9068
    ADC #$01                   ; $9069
    CMP #$16                   ; $906B
    BNE $905D                  ; $906D
    RTS                        ; $906F
    BIT $044C                  ; $9070
    BPL $9084                  ; $9073
    LDA $0441                  ; $9075
    CMP #$14                   ; $9078
    BNE $9084                  ; $907A
    LDA #$00                   ; $907C
    STA $044C                  ; $907E
    STA $03F1                  ; $9081
    RTS                        ; $9084
    LDX $043B                  ; $9085
    LDA $908E,X                ; $9088
    JMP $C603                  ; $908B
    .byte $02,$01,$01,$04,$04,$01,$02,$08
    LDA $043D                  ; $9096
    ASL                        ; $9099
    TAX                        ; $909A
    PLP                        ; $909B
    BCC $909F                  ; $909C
    INX                        ; $909E
    LDA $90F4,X                ; $909F
    LDY $0442                  ; $90A2
    BEQ $90DA                  ; $90A5
    CPY #$0B                   ; $90A7
    BEQ $90DA                  ; $90A9
    TXA                        ; $90AB
    PHA                        ; $90AC
    LSR                        ; $90AD
    BCC $90C3                  ; $90AE
    LDA $0442                  ; $90B0
    JSR $C50C                  ; $90B3
    LDX $043D                  ; $90B6
    LDA $9102,X                ; $90B9
    LDY #$0A                   ; $90BC
    STA ($0034),Y              ; $90BE
    JMP $90D5                  ; $90C0
    LDA $0441                  ; $90C3
    BEQ $90D5                  ; $90C6
    CMP #$0B                   ; $90C8
    BEQ $90D5                  ; $90CA
    JSR $C50C                  ; $90CC
    LDY #$0A                   ; $90CF
    LDA #$05                   ; $90D1
    STA ($0034),Y              ; $90D3
    .byte $68
    TAX                        ; $90D6
    LDA $90E6,X                ; $90D7
    JMP $C603                  ; $90DA
    LDX $043B                  ; $90DD
    LDA $9109,X                ; $90E0
    JMP $C603                  ; $90E3
    .byte $02,$01,$01,$01,$02,$01,$01,$00,$01,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$02,$00,$00,$00,$00,$00,$00,$00,$06,$06,$06,$06
    .byte $06,$00,$00,$01,$00,$00,$01,$02,$00,$01
    CLC                        ; $9110
    ADC $05F9                  ; $9111
    STA $05F9                  ; $9114
    TXA                        ; $9117
    JSR $C603                  ; $9118
    RTS                        ; $911B
    .byte $A9,$29
    JSR $C54E                  ; $911E
    JSR $987B                  ; $9121
    LDA $0635                  ; $9124
    AND #$F8                   ; $9127
    CLC                        ; $9129
    ADC #$04                   ; $912A
    STA $0635                  ; $912C
    LDA #$4C                   ; $912F
    BIT $0637                  ; $9131
    BPL $9138                  ; $9134
    LDA #$B4                   ; $9136
    STA $0637                  ; $9138
    LDX #$00                   ; $913B
    BIT $0635                  ; $913D
    BPL $9143                  ; $9140
    INX                        ; $9142
    BIT $0637                  ; $9143
    BPL $914A                  ; $9146
    INX                        ; $9148
    INX                        ; $9149
    LDA $05FB                  ; $914A
    BEQ $9153                  ; $914D
    TXA                        ; $914F
    EOR #$03                   ; $9150
    TAX                        ; $9152
    LDA $92EA,X                ; $9153
    CLC                        ; $9156
    ADC $05FB                  ; $9157
    STA $0441                  ; $915A
    JSR $C50C                  ; $915D
    LDY #$06                   ; $9160
    LDA $0635                  ; $9162
    STA ($0034),Y              ; $9165
    LDY #$08                   ; $9167
    LDA $0637                  ; $9169
    STA ($0034),Y              ; $916C
    LDX $0635                  ; $916E
    LDA #$08                   ; $9171
    BIT $0637                  ; $9173
    BPL $917A                  ; $9176
    LDA #$F8                   ; $9178
    CLC                        ; $917A
    ADC $0637                  ; $917B
    TAY                        ; $917E
    JSR $C539                  ; $917F
    STA $0624                  ; $9182
    STA $061E                  ; $9185
    JSR $91D2                  ; $9188
    LDA #$2A                   ; $918B
    JSR $C54E                  ; $918D
    LDA #$02                   ; $9190
    LDX #$0A                   ; $9192
    JSR $9110                  ; $9194
    JSR $85F6                  ; $9197
    LDA $0441                  ; $919A
    JSR $C50C                  ; $919D
    LDA $061E                  ; $91A0
    STA $05FE                  ; $91A3
    JSR $C536                  ; $91A6
    TYA                        ; $91A9
    LDY #$08                   ; $91AA
    STA ($0034),Y              ; $91AC
    STA $0637                  ; $91AE
    TXA                        ; $91B1
    LDY #$06                   ; $91B2
    STA ($0034),Y              ; $91B4
    STA $0635                  ; $91B6
    LDA $0624                  ; $91B9
    STA $0638                  ; $91BC
    LDA #$00                   ; $91BF
    STA $043C                  ; $91C1
    STA $061A                  ; $91C4
    LDA #$01                   ; $91C7
    STA $061B                  ; $91C9
    JSR $C60C                  ; $91CC
    JMP $C63C                  ; $91CF
    LDA #$00                   ; $91D2
    STA $0011                  ; $91D4
    STA $0012                  ; $91D6
    LDA $05FB                  ; $91D8
    BEQ $91E0                  ; $91DB
    JMP $9298                  ; $91DD
    LDA #$38                   ; $91E0
    JSR $C54E                  ; $91E2
    LDA #$81                   ; $91E5
    STA $062D                  ; $91E7
    LDA #$1F                   ; $91EA
    STA $0494                  ; $91EC
    LDA #$0F                   ; $91EF
    JSR $C52A                  ; $91F1
    LDA #$00                   ; $91F4
    STA $0626                  ; $91F6
    STA $0627                  ; $91F9
    .byte $A9,$01
    JSR $C515                  ; $91FE
    LDA a: $001C               ; $9201
    AND #$03                   ; $9204
    BEQ $9234                  ; $9206
    LSR                        ; $9208
    LDA #$0C                   ; $9209
    BCS $920F                  ; $920B
    LDA #$F4                   ; $920D
    CLC                        ; $920F
    ADC $0626                  ; $9210
    TAX                        ; $9213
    BPL $921B                  ; $9214
    EOR #$FF                   ; $9216
    CLC                        ; $9218
    ADC #$01                   ; $9219
    CMP #$3C                   ; $921B
    BCC $9222                  ; $921D
    LDX $0626                  ; $921F
    TXA                        ; $9222
    CLC                        ; $9223
    ADC $061E                  ; $9224
    CMP #$F0                   ; $9227
    BCC $922E                  ; $9229
    LDX $0626                  ; $922B
    STX $0626                  ; $922E
    JMP $925F                  ; $9231
    LDA a: $001C               ; $9234
    AND #$0C                   ; $9237
    BEQ $9280                  ; $9239
    LSR                        ; $923B
    LSR                        ; $923C
    LSR                        ; $923D
    LDA #$01                   ; $923E
    BCS $9244                  ; $9240
    LDA #$FF                   ; $9242
    BIT $0637                  ; $9244
    BPL $924E                  ; $9247
    EOR #$FF                   ; $9249
    CLC                        ; $924B
    ADC #$01                   ; $924C
    CLC                        ; $924E
    ADC $0627                  ; $924F
    BPL $9256                  ; $9252
    LDA #$00                   ; $9254
    CMP #$05                   ; $9256
    BCC $925C                  ; $9258
    LDA #$04                   ; $925A
    STA $0627                  ; $925C
    .byte $AD,$1E,$06
    CLC                        ; $9262
    ADC $0626                  ; $9263
    STA $0624                  ; $9266
    LDA $0627                  ; $9269
    BIT $0637                  ; $926C
    BPL $9276                  ; $926F
    EOR #$FF                   ; $9271
    CLC                        ; $9273
    ADC #$01                   ; $9274
    CLC                        ; $9276
    ADC $0624                  ; $9277
    STA $0624                  ; $927A
    JSR $C63F                  ; $927D
    LDA #$80                   ; $9280
    AND a: $001E               ; $9282
    BNE $928A                  ; $9285
    JMP $91FC                  ; $9287
    JSR $C642                  ; $928A
    BCS $9292                  ; $928D
    JMP $91FC                  ; $928F
    LDA #$00                   ; $9292
    STA $062D                  ; $9294
    RTS                        ; $9297
    .byte $A9,$0C
    STA $003A                  ; $929A
    LDA $003A                  ; $929C
    JSR $C50C                  ; $929E
    LDY #$06                   ; $92A1
    LDA ($0034),Y              ; $92A3
    SEC                        ; $92A5
    SBC $0635                  ; $92A6
    BCS $92AF                  ; $92A9
    EOR #$FF                   ; $92AB
    ADC #$01                   ; $92AD
    CMP #$20                   ; $92AF
    BCS $92C5                  ; $92B1
    LDY #$08                   ; $92B3
    LDA ($0034),Y              ; $92B5
    SEC                        ; $92B7
    SBC $0637                  ; $92B8
    BCS $92C1                  ; $92BB
    EOR #$FF                   ; $92BD
    ADC #$01                   ; $92BF
    CMP #$20                   ; $92C1
    BCC $92E4                  ; $92C3
    INC $003A                  ; $92C5
    LDA $003A                  ; $92C7
    CMP #$16                   ; $92C9
    BNE $929C                  ; $92CB
    .byte $A9,$14,$85,$3A,$20,$0C,$C5,$AD,$1E,$06,$20,$36,$C5,$98,$A0,$08
    .byte $91,$34,$8A,$A0,$06,$91,$34
    LDA $003A                  ; $92E4
    STA $05FC                  ; $92E6
    RTS                        ; $92E9
    .byte $01,$05,$02,$07,$A9,$24
    JSR $C54E                  ; $92F0
    LDA #$00                   ; $92F3
    STA $044E                  ; $92F5
    JSR $987B                  ; $92F8
    LDX #$06                   ; $92FB
    BIT $0637                  ; $92FD
    BPL $9303                  ; $9300
    INX                        ; $9302
    STX $061E                  ; $9303
    LDA $05FB                  ; $9306
    BEQ $9313                  ; $9309
    LDA #$09                   ; $930B
    JSR $C54B                  ; $930D
    JMP $9318                  ; $9310
    LDA #$2E                   ; $9313
    JSR $9E5A                  ; $9315
    .byte $AD,$1E,$06
    JSR $9E0D                  ; $931B
    JSR $9C0F                  ; $931E
    BCS $9328                  ; $9321
    LDA $05FB                  ; $9323
    BEQ $9313                  ; $9326
    LDA $05FB                  ; $9328
    BNE $9335                  ; $932B
    LDA #$04                   ; $932D
    STA $0621                  ; $932F
    JSR $C600                  ; $9332
    JSR $8F72                  ; $9335
    LDA #$01                   ; $9338
    LDX #$12                   ; $933A
    JSR $9110                  ; $933C
    JSR $85F6                  ; $933F
    LDA $043B                  ; $9342
    JSR $C509                  ; $9345
    .byte $4C,$93,$59,$93,$A9,$25
    JSR $C54E                  ; $934E
    LDA #$66                   ; $9351
    STA $061A                  ; $9353
    JMP $C61B                  ; $9356
    .byte $A9,$26
    JSR $C54E                  ; $935B
    LDA #$4D                   ; $935E
    STA $061A                  ; $9360
    JMP $C615                  ; $9363
    .byte $A9,$00
    STA $044E                  ; $9368
    JSR $8B9C                  ; $936B
    BCC $9379                  ; $936E
    TXA                        ; $9370
    EOR $05FB                  ; $9371
    BEQ $9379                  ; $9374
    JMP $94CF                  ; $9376
    LDA #$2B                   ; $9379
    JSR $C54E                  ; $937B
    JSR $987B                  ; $937E
    LDA $0635                  ; $9381
    LDX $05FB                  ; $9384
    BEQ $938E                  ; $9387
    EOR #$FF                   ; $9389
    CLC                        ; $938B
    ADC #$01                   ; $938C
    CMP #$A0                   ; $938E
    BCC $9395                  ; $9390
    JMP $93E4                  ; $9392
    .byte $AD,$FB,$05
    BEQ $93BC                  ; $9398
    LDA a: $00E2               ; $939A
    AND #$0F                   ; $939D
    CMP #$0A                   ; $939F
    BCC $93A6                  ; $93A1
    SEC                        ; $93A3
    SBC #$0A                   ; $93A4
    SEC                        ; $93A6
    ADC #$0B                   ; $93A7
    CMP $0441                  ; $93A9
    BNE $93B7                  ; $93AC
    CLC                        ; $93AE
    ADC #$01                   ; $93AF
    CMP #$16                   ; $93B1
    BCC $93B7                  ; $93B3
    LDA #$0C                   ; $93B5
    STA $05FC                  ; $93B7
    BNE $93BF                  ; $93BA
    JSR $93DE                  ; $93BC
    LDA #$01                   ; $93BF
    STA $043B                  ; $93C1
    LDA #$00                   ; $93C4
    STA $043C                  ; $93C6
    LDA #$18                   ; $93C9
    JSR $C54E                  ; $93CB
    LDA #$04                   ; $93CE
    LDX #$12                   ; $93D0
    JSR $9110                  ; $93D2
    JSR $85F6                  ; $93D5
    LDX #$50                   ; $93D8
    TXS                        ; $93DA
    JMP $C612                  ; $93DB
    JSR $C648                  ; $93DE
    JMP $93DE                  ; $93E1
    .byte $AA
    LDA $0637                  ; $93E5
    LDY $05FB                  ; $93E8
    BEQ $93EF                  ; $93EB
    EOR #$FF                   ; $93ED
    TAY                        ; $93EF
    JSR $C539                  ; $93F0
    STA $003B                  ; $93F3
    LDA #$00                   ; $93F5
    PHA                        ; $93F7
    ASL                        ; $93F8
    TAX                        ; $93F9
    LDA $9FB9,X                ; $93FA
    STA $003C                  ; $93FD
    LDA $9FBA,X                ; $93FF
    STA $003D                  ; $9402
    LDY #$00                   ; $9404
    LDA ($003C),Y              ; $9406
    CMP #$FF                   ; $9408
    BEQ $9413                  ; $940A
    CMP $003B                  ; $940C
    BEQ $9420                  ; $940E
    INY                        ; $9410
    BNE $9406                  ; $9411
    PLA                        ; $9413
    CLC                        ; $9414
    ADC #$01                   ; $9415
    CMP #$05                   ; $9417
    BNE $941E                  ; $9419
    JMP $9395                  ; $941B
    BNE $93F7                  ; $941E
    PLA                        ; $9420
    STA $0612                  ; $9421
    LDA #$27                   ; $9424
    JSR $9E5A                  ; $9426
    LDA $0612                  ; $9429
    JSR $9E0D                  ; $942C
    JSR $9C0F                  ; $942F
    BCC $9424                  ; $9432
    LDA $05FB                  ; $9434
    BNE $9441                  ; $9437
    LDA #$04                   ; $9439
    STA $0621                  ; $943B
    JSR $C600                  ; $943E
    JSR $9470                  ; $9441
    BCC $9434                  ; $9444
    LDA #$0E                   ; $9446
    JSR $C54B                  ; $9448
    LDA #$18                   ; $944B
    LDX $043B                  ; $944D
    CPX #$01                   ; $9450
    BEQ $9456                  ; $9452
    LDA #$1D                   ; $9454
    JSR $C54E                  ; $9456
    LDA #$04                   ; $9459
    LDX #$12                   ; $945B
    JSR $9110                  ; $945D
    JSR $85F6                  ; $9460
    LDA $043B                  ; $9463
    CMP #$01                   ; $9466
    BNE $946D                  ; $9468
    JMP $C612                  ; $946A
    JMP $8AB0                  ; $946D
    LDX #$03                   ; $9470
    LDA $05FB                  ; $9472
    BNE $9481                  ; $9475
    DEX                        ; $9477
    LDA $043B                  ; $9478
    CMP #$00                   ; $947B
    BEQ $9481                  ; $947D
    SEC                        ; $947F
    RTS                        ; $9480
    STX $0612                  ; $9481
    TXA                        ; $9484
    CLC                        ; $9485
    ADC #$28                   ; $9486
    JSR $C52A                  ; $9488
    LDA $05FB                  ; $948B
    BNE $9495                  ; $948E
    LDA #$03                   ; $9490
    JSR $C52A                  ; $9492
    LDA $0612                  ; $9495
    JSR $9D1B                  ; $9498
    LDA #$01                   ; $949B
    JSR $C515                  ; $949D
    LDA #$0C                   ; $94A0
    AND a: $001E               ; $94A2
    BEQ $94B2                  ; $94A5
    LDA $0612                  ; $94A7
    EOR #$40                   ; $94AA
    STA $0612                  ; $94AC
    JSR $9D1B                  ; $94AF
    LDA #$40                   ; $94B2
    AND a: $001E               ; $94B4
    BEQ $94BB                  ; $94B7
    CLC                        ; $94B9
    RTS                        ; $94BA
    LDA #$80                   ; $94BB
    AND a: $001E               ; $94BD
    BEQ $949B                  ; $94C0
    LDX #$00                   ; $94C2
    BIT $0612                  ; $94C4
    BVC $94CA                  ; $94C7
    INX                        ; $94C9
    STX $0612                  ; $94CA
    SEC                        ; $94CD
    RTS                        ; $94CE
    .byte $A9,$1F
    JSR $C54E                  ; $94D1
    JSR $987B                  ; $94D4
    LDA #$2F                   ; $94D7
    JSR $9E5A                  ; $94D9
    LDA #$20                   ; $94DC
    JSR $C54E                  ; $94DE
    LDA #$05                   ; $94E1
    JSR $9E0D                  ; $94E3
    JSR $C645                  ; $94E6
    JSR $9509                  ; $94E9
    LDA #$21                   ; $94EC
    JSR $C54E                  ; $94EE
    LDA #$05                   ; $94F1
    LDX #$00                   ; $94F3
    JSR $9110                  ; $94F5
    LDA #$01                   ; $94F8
    STA $0616                  ; $94FA
    LDA $0612                  ; $94FD
    JSR $C509                  ; $9500
    .byte $AC,$85,$DF,$8B,$1C,$86
    LDA #$00                   ; $9509
    STA $043C                  ; $950B
    STA $043E                  ; $950E
    STA $044E                  ; $9511
    LDA #$05                   ; $9514
    STA $0621                  ; $9516
    JSR $C600                  ; $9519
    LDA #$0D                   ; $951C
    JSR $C54B                  ; $951E
    JSR $8F72                  ; $9521
    LDA #$08                   ; $9524
    JSR $C54B                  ; $9526
    LDA #$00                   ; $9529
    STA $003A                  ; $952B
    STA $003B                  ; $952D
    LDA #$09                   ; $952F
    LDX #$80                   ; $9531
    JSR $8F1F                  ; $9533
    PHA                        ; $9536
    LDY #$00                   ; $9537
    LDX $043B                  ; $9539
    CPX $043D                  ; $953C
    BNE $9546                  ; $953F
    CMP #$C8                   ; $9541
    BCS $9546                  ; $9543
    INY                        ; $9545
    TYA                        ; $9546
    BNE $9559                  ; $9547
    LDA $043B                  ; $9549
    CMP #$08                   ; $954C
    BEQ $9559                  ; $954E
    LDA a: $00E2               ; $9550
    CMP #$1F                   ; $9553
    BCS $9559                  ; $9555
    LDY #$02                   ; $9557
    PLA                        ; $9559
    JSR $8148                  ; $955A
    RTS                        ; $955D
    .byte $AD,$FB,$05
    JSR $C50C                  ; $9561
    LDY #$0A                   ; $9564
    LDA #$00                   ; $9566
    STA ($0034),Y              ; $9568
    LDA #$05                   ; $956A
    LDX $05FB                  ; $956C
    STX $0441                  ; $956F
    BEQ $9576                  ; $9572
    LDA #$E9                   ; $9574
    STA $05FE                  ; $9576
    JSR $C536                  ; $9579
    STX $0635                  ; $957C
    STY $0637                  ; $957F
    LDA #$27                   ; $9582
    JSR $C54E                  ; $9584
    JSR $987B                  ; $9587
    LDA #$0A                   ; $958A
    JSR $9E0D                  ; $958C
    LDA a: $00E2               ; $958F
    AND #$0F                   ; $9592
    CMP #$0A                   ; $9594
    BCC $959A                  ; $9596
    SBC #$0A                   ; $9598
    SEC                        ; $959A
    ADC $05FB                  ; $959B
    STA $05FC                  ; $959E
    JSR $C56F                  ; $95A1
    JSR $C61E                  ; $95A4
    LDA $05FB                  ; $95A7
    JSR $8E6E                  ; $95AA
    LDA #$01                   ; $95AD
    STA $043B                  ; $95AF
    LDA #$00                   ; $95B2
    STA $043C                  ; $95B4
    LDA #$28                   ; $95B7
    JSR $C54E                  ; $95B9
    LDA #$02                   ; $95BC
    LDX #$0C                   ; $95BE
    JSR $9110                  ; $95C0
    LDA #$1A                   ; $95C3
    STA $061A                  ; $95C5
    LDA #$01                   ; $95C8
    STA $061B                  ; $95CA
    JSR $C60C                  ; $95CD
    LDA $05FC                  ; $95D0
    STA $0441                  ; $95D3
    LDA #$1C                   ; $95D6
    JSR $C54E                  ; $95D8
    LDX #$50                   ; $95DB
    TXS                        ; $95DD
    JMP $C60F                  ; $95DE
    JSR $96CC                  ; $95E1
    LDA #$00                   ; $95E4
    STA $0616                  ; $95E6
    STA $038E                  ; $95E9
    STA $038B                  ; $95EC
    STA $030A                  ; $95EF
    STA $0307                  ; $95F2
    BIT a: $00E2               ; $95F5
    BPL $95FC                  ; $95F8
    LDA #$0B                   ; $95FA
    STA $05FB                  ; $95FC
    STA $0619                  ; $95FF
    LDA #$41                   ; $9602
    JSR $C52A                  ; $9604
    LDA #$33                   ; $9607
    JSR $C55D                  ; $9609
    LDA #$39                   ; $960C
    JSR $C54E                  ; $960E
    LDA $0616                  ; $9611
    LSR                        ; $9614
    STA $0617                  ; $9615
    BCS $9623                  ; $9618
    CMP #$05                   ; $961A
    BNE $9623                  ; $961C
    LDA #$45                   ; $961E
    JSR $C54E                  ; $9620
    LDA $0617                  ; $9623
    CMP #$0A                   ; $9626
    BCC $962E                  ; $9628
    .byte $E9,$0A,$B0,$F8
    TAX                        ; $962E
    LDA $05FB                  ; $962F
    BEQ $963C                  ; $9632
    STX $003A                  ; $9634
    LDA #$09                   ; $9636
    SEC                        ; $9638
    SBC $003A                  ; $9639
    TAX                        ; $963B
    LDA $0431,X                ; $963C
    LDX $05FB                  ; $963F
    BEQ $9647                  ; $9642
    CLC                        ; $9644
    ADC #$0B                   ; $9645
    STA $0441                  ; $9647
    LDA #$22                   ; $964A
    JSR $C54E                  ; $964C
    JSR $9509                  ; $964F
    LDA #$23                   ; $9652
    JSR $C54E                  ; $9654
    JSR $96AE                  ; $9657
    LDA $0616                  ; $965A
    INC $0616                  ; $965D
    LSR                        ; $9660
    PHP                        ; $9661
    STA $003A                  ; $9662
    SEC                        ; $9664
    LDA #$03                   ; $9665
    SBC $003A                  ; $9667
    TAX                        ; $9669
    BCS $966E                  ; $966A
    LDX #$FF                   ; $966C
    INX                        ; $966E
    INX                        ; $966F
    PLP                        ; $9670
    BCS $9674                  ; $9671
    INX                        ; $9673
    STX $003A                  ; $9674
    LDA $0610                  ; $9676
    SEC                        ; $9679
    SBC $0611                  ; $967A
    BCS $9683                  ; $967D
    EOR #$FF                   ; $967F
    ADC #$01                   ; $9681
    CMP $003A                  ; $9683
    BCS $9692                  ; $9685
    LDA $05FB                  ; $9687
    EOR #$0B                   ; $968A
    STA $05FB                  ; $968C
    JMP $9611                  ; $968F
    LDX #$00                   ; $9692
    JSR $96A3                  ; $9694
    INX                        ; $9697
    JSR $96A3                  ; $9698
    LDA #$33                   ; $969B
    JSR $C54E                  ; $969D
    JMP $C554                  ; $96A0
    LDA $0610,X                ; $96A3
    CLC                        ; $96A6
    ADC a: $0028,X             ; $96A7
    STA a: $0028,X             ; $96AA
    RTS                        ; $96AD
    LDA $0612                  ; $96AE
    JSR $C509                  ; $96B1
    .byte $BA,$96,$CA,$96,$CB,$96,$AE,$FB,$05
    BEQ $96C1                  ; $96BD
    LDX #$01                   ; $96BF
    INC $0610,X                ; $96C1
    LDA #$41                   ; $96C4
    JSR $C52A                  ; $96C6
    RTS                        ; $96C9
    .byte $60,$60
    LDA #$01                   ; $96CC
    JSR $C55D                  ; $96CE
    LDA #$00                   ; $96D1
    STA $0011                  ; $96D3
    STA $0012                  ; $96D5
    LDA #$00                   ; $96D7
    STA $0430                  ; $96D9
    STA $053C                  ; $96DC
    LDA #$80                   ; $96DF
    STA $053A                  ; $96E1
    LDX #$00                   ; $96E4
    LDA #$12                   ; $96E6
    JSR $C530                  ; $96E8
    JSR $C533                  ; $96EB
    .byte $00,$6C,$04
    LDA #$02                   ; $96F1
    JSR $C515                  ; $96F3
    LDA #$00                   ; $96F6
    STA $0469                  ; $96F8
    LDA #$00                   ; $96FB
    STA $0469                  ; $96FD
    STA $E000                  ; $9700
    LDA #$00                   ; $9703
    STA $0490                  ; $9705
    LDA #$2E                   ; $9708
    STA $0491                  ; $970A
    LDA #$00                   ; $970D
    STA $05CE                  ; $970F
    STA $004A                  ; $9712
    STA $004B                  ; $9714
    LDA $0020                  ; $9716
    AND #$FC                   ; $9718
    STA $0020                  ; $971A
    LDA #$3E                   ; $971C
    JSR $C52A                  ; $971E
    JSR $986B                  ; $9721
    LDX #$00                   ; $9724
    LDA #$13                   ; $9726
    JSR $C530                  ; $9728
    JSR $C533                  ; $972B
    .byte $00,$6C,$04
    LDA #$00                   ; $9731
    STA $0624                  ; $9733
    JSR $9828                  ; $9736
    LDA #$01                   ; $9739
    JSR $C515                  ; $973B
    LDA #$0C                   ; $973E
    AND a: $001E               ; $9740
    BEQ $9777                  ; $9743
    PHA                        ; $9745
    LDA #$09                   ; $9746
    SEC                        ; $9748
    SBC $0430                  ; $9749
    STA $003A                  ; $974C
    PLA                        ; $974E
    LDX #$01                   ; $974F
    AND #$04                   ; $9751
    BNE $9757                  ; $9753
    LDX #$FF                   ; $9755
    TXA                        ; $9757
    CLC                        ; $9758
    ADC $0624                  ; $9759
    BMI $9777                  ; $975C
    CMP $003A                  ; $975E
    BCC $9764                  ; $9760
    LDA $003A                  ; $9762
    CMP $0624                  ; $9764
    BEQ $9777                  ; $9767
    PHA                        ; $9769
    LDA $0624                  ; $976A
    JSR $982C                  ; $976D
    PLA                        ; $9770
    STA $0624                  ; $9771
    JSR $9828                  ; $9774
    LDA #$40                   ; $9777
    AND a: $001E               ; $9779
    BEQ $9789                  ; $977C
    LDX $0430                  ; $977E
    BEQ $9789                  ; $9781
    DEC $0430                  ; $9783
    JSR $986B                  ; $9786
    LDA #$80                   ; $9789
    AND a: $001E               ; $978B
    BEQ $97F6                  ; $978E
    LDA $0430                  ; $9790
    CMP #$05                   ; $9793
    BNE $979A                  ; $9795
    JMP $97F9                  ; $9797
    LDA $0624                  ; $979A
    STA $003A                  ; $979D
    LDA #$01                   ; $979F
    STA $003B                  ; $97A1
    LDA #$00                   ; $97A3
    STA $003C                  ; $97A5
    LDA $003B                  ; $97A7
    LDX $0430                  ; $97A9
    BEQ $97BC                  ; $97AC
    CMP $0430,X                ; $97AE
    BEQ $97B8                  ; $97B1
    DEX                        ; $97B3
    BNE $97AE                  ; $97B4
    BEQ $97BC                  ; $97B6
    INC $003B                  ; $97B8
    BNE $97A7                  ; $97BA
    LDA $003C                  ; $97BC
    INC $003C                  ; $97BE
    CMP $003A                  ; $97C0
    BEQ $97C8                  ; $97C2
    INC $003B                  ; $97C4
    BNE $97A7                  ; $97C6
    LDA $003B                  ; $97C8
    LDX $0430                  ; $97CA
    STA $0431,X                ; $97CD
    INC $0430                  ; $97D0
    LDA #$09                   ; $97D3
    SEC                        ; $97D5
    SBC $0430                  ; $97D6
    STA $003A                  ; $97D9
    LDA $0624                  ; $97DB
    SBC $003A                  ; $97DE
    BCC $97F3                  ; $97E0
    LDA $0624                  ; $97E2
    LDX $003A                  ; $97E5
    STX $0624                  ; $97E7
    JSR $982C                  ; $97EA
    LDA $0624                  ; $97ED
    JSR $9828                  ; $97F0
    JSR $986B                  ; $97F3
    JMP $9739                  ; $97F6
    LDA #$01                   ; $97F9
    STA $003A                  ; $97FB
    LDY #$0A                   ; $97FD
    LDX #$00                   ; $97FF
    LDA $003A                  ; $9801
    CMP $0431,X                ; $9803
    BEQ $9816                  ; $9806
    INX                        ; $9808
    CPX #$05                   ; $9809
    BNE $9803                  ; $980B
    LDX $0430                  ; $980D
    STA $0431,X                ; $9810
    INC $0430                  ; $9813
    INC $003A                  ; $9816
    DEY                        ; $9818
    BNE $97FF                  ; $9819
    JSR $C569                  ; $981B
    LDA #$00                   ; $981E
    STA $008E                  ; $9820
    LDA #$01                   ; $9822
    STA $0469                  ; $9824
    RTS                        ; $9827
    LDX #$B1                   ; $9828
    BNE $982E                  ; $982A
    LDX #$00                   ; $982C
    PHA                        ; $982E
    LDA #$01                   ; $982F
    JSR $C515                  ; $9831
    LDA $0515                  ; $9834
    BNE $982F                  ; $9837
    LDA #$01                   ; $9839
    STA $0515                  ; $983B
    LDY #$01                   ; $983E
    STY $04A5                  ; $9840
    DEY                        ; $9843
    STY $04A9                  ; $9844
    STX $04A8                  ; $9847
    PLA                        ; $984A
    STY $04A6                  ; $984B
    LSR                        ; $984E
    ROR $04A6                  ; $984F
    LSR                        ; $9852
    ROR $04A6                  ; $9853
    PHA                        ; $9856
    LDA $04A6                  ; $9857
    ADC #$02                   ; $985A
    STA $04A6                  ; $985C
    PLA                        ; $985F
    ADC #$21                   ; $9860
    STA $04A7                  ; $9862
    LDA #$80                   ; $9865
    STA $0515                  ; $9867
    RTS                        ; $986A
    LDA #$01                   ; $986B
    STA $0441                  ; $986D
    LDA #$3F                   ; $9870
    JSR $C52A                  ; $9872
    LDA #$40                   ; $9875
    JSR $C52A                  ; $9877
    RTS                        ; $987A
    LDA #$37                   ; $987B
    JSR $C54E                  ; $987D
    LDA #$00                   ; $9880
    STA $0011                  ; $9882
    STA $0012                  ; $9884
    LDA #$01                   ; $9886
    JSR $C515                  ; $9888
    JSR $C52D                  ; $988B
    LDA #$2E                   ; $988E
    STA $0087                  ; $9890
    LDA #$00                   ; $9892
    STA $062D                  ; $9894
    JSR $990C                  ; $9897
    LDA #$33                   ; $989A
    JSR $C52A                  ; $989C
    LDA #$04                   ; $989F
    STA $0624                  ; $98A1
    JSR $9D1B                  ; $98A4
    LDA #$01                   ; $98A7
    JSR $C515                  ; $98A9
    LDA #$0C                   ; $98AC
    AND a: $001E               ; $98AE
    BEQ $98BE                  ; $98B1
    LDA $0624                  ; $98B3
    EOR #$40                   ; $98B6
    STA $0624                  ; $98B8
    JSR $9D1B                  ; $98BB
    BIT a: $001C               ; $98BE
    BPL $98A7                  ; $98C1
    JSR $990C                  ; $98C3
    BIT $0624                  ; $98C6
    BVS $98D0                  ; $98C9
    LDA #$02                   ; $98CB
    STA $0087                  ; $98CD
    RTS                        ; $98CF
    LDA #$00                   ; $98D0
    STA $0624                  ; $98D2
    .byte $A9,$34
    JSR $C52A                  ; $98D7
    LDA #$03                   ; $98DA
    STA $063D                  ; $98DC
    JSR $C566                  ; $98DF
    LDA #$85                   ; $98E2
    STA $062D                  ; $98E4
    LDA $0624                  ; $98E7
    STA $0622                  ; $98EA
    LDA #$04                   ; $98ED
    JSR $C563                  ; $98EF
    BCC $9892                  ; $98F2
    CMP #$04                   ; $98F4
    BEQ $9892                  ; $98F6
    STA $0624                  ; $98F8
    JSR $9901                  ; $98FB
    JMP $98D5                  ; $98FE
    JSR $C509                  ; $9901
    .byte $1A,$99,$3A,$99,$50,$99,$AD,$9B,$20,$2D,$C5
    LDA #$00                   ; $990F
    JSR $C52A                  ; $9911
    LDA #$01                   ; $9914
    JSR $C52A                  ; $9916
    RTS                        ; $9919
    .byte $A9,$35
    JSR $C52A                  ; $991C
    LDA a: $002C               ; $991F
    STA $0622                  ; $9922
    LDA a: $002C               ; $9925
    STA $0627                  ; $9928
    LDA #$05                   ; $992B
    JSR $C563                  ; $992D
    LDX $0627                  ; $9930
    BCC $9936                  ; $9933
    TAX                        ; $9935
    STX a: $002C               ; $9936
    RTS                        ; $9939
    .byte $A9,$36
    JSR $C52A                  ; $993C
    LDA a: $002D               ; $993F
    STA $0622                  ; $9942
    LDA #$06                   ; $9945
    JSR $C563                  ; $9947
    BCC $994F                  ; $994A
    STA a: $002D               ; $994C
    RTS                        ; $994F
    .byte $AD,$2A,$00
    CMP #$02                   ; $9953
    BEQ $995A                  ; $9955
    JMP $9AC7                  ; $9957
    LDA #$37                   ; $995A
    JSR $C52A                  ; $995C
    LDA #$00                   ; $995F
    STA $0622                  ; $9961
    LDA #$07                   ; $9964
    JSR $C563                  ; $9966
    BCS $996C                  ; $9969
    RTS                        ; $996B
    JSR $9972                  ; $996C
    JMP $990C                  ; $996F
    JSR $C509                  ; $9972
    .byte $79,$99,$C7,$9A,$AD,$50,$04
    CMP #$03                   ; $997C
    BCC $9992                  ; $997E
    LDA #$38                   ; $9980
    JSR $C52A                  ; $9982
    LDA #$01                   ; $9985
    JSR $C515                  ; $9987
    LDA #$C0                   ; $998A
    AND a: $001E               ; $998C
    BEQ $9985                  ; $998F
    RTS                        ; $9991
    LDA #$00                   ; $9992
    STA $062D                  ; $9994
    LDA #$3A                   ; $9997
    JSR $C52A                  ; $9999
    LDA #$00                   ; $999C
    PHA                        ; $999E
    JSR $9AAC                  ; $999F
    BCC $99AD                  ; $99A2
    PLA                        ; $99A4
    PHA                        ; $99A5
    LDY #$2C                   ; $99A6
    LDX #$B2                   ; $99A8
    JSR $9F41                  ; $99AA
    PLA                        ; $99AD
    CLC                        ; $99AE
    ADC #$01                   ; $99AF
    CMP #$0A                   ; $99B1
    BNE $999E                  ; $99B3
    LDA #$00                   ; $99B5
    PHA                        ; $99B7
    JSR $9AAC                  ; $99B8
    PLA                        ; $99BB
    BCC $99C5                  ; $99BC
    CLC                        ; $99BE
    ADC #$01                   ; $99BF
    CMP #$0A                   ; $99C1
    BNE $99B7                  ; $99C3
    STA $0625                  ; $99C5
    LDY #$2C                   ; $99C8
    JSR $9F37                  ; $99CA
    LDA #$01                   ; $99CD
    JSR $C515                  ; $99CF
    LDA $0625                  ; $99D2
    JSR $9B90                  ; $99D5
    BCC $99FE                  ; $99D8
    LDA $9F0F,X                ; $99DA
    PHA                        ; $99DD
    JSR $9AAC                  ; $99DE
    PLA                        ; $99E1
    BCC $99EC                  ; $99E2
    LDX $003A                  ; $99E4
    JSR $9BA4                  ; $99E6
    JMP $99DA                  ; $99E9
    PHA                        ; $99EC
    LDA $0625                  ; $99ED
    LDY #$2C                   ; $99F0
    JSR $9F3F                  ; $99F2
    PLA                        ; $99F5
    STA $0625                  ; $99F6
    LDY #$2C                   ; $99F9
    JSR $9F37                  ; $99FB
    LDA #$80                   ; $99FE
    AND a: $001E               ; $9A00
    BNE $9A0D                  ; $9A03
    LDA #$40                   ; $9A05
    AND a: $001E               ; $9A07
    BEQ $99CD                  ; $9A0A
    RTS                        ; $9A0C
    LDA #$3B                   ; $9A0D
    JSR $C52A                  ; $9A0F
    LDA #$01                   ; $9A12
    LDX $0625                  ; $9A14
    CPX #$08                   ; $9A17
    BCC $9A1D                  ; $9A19
    LDA #$00                   ; $9A1B
    STA $0626                  ; $9A1D
    LDY #$16                   ; $9A20
    JSR $9F37                  ; $9A22
    LDA #$01                   ; $9A25
    JSR $C515                  ; $9A27
    LDA $0626                  ; $9A2A
    BEQ $9A49                  ; $9A2D
    JSR $9B90                  ; $9A2F
    BCC $9A49                  ; $9A32
    LDA $9EB7,X                ; $9A34
    PHA                        ; $9A37
    LDA $0626                  ; $9A38
    LDY #$16                   ; $9A3B
    JSR $9F3F                  ; $9A3D
    PLA                        ; $9A40
    STA $0626                  ; $9A41
    LDY #$16                   ; $9A44
    JSR $9F37                  ; $9A46
    LDA #$40                   ; $9A49
    AND a: $001E               ; $9A4B
    BEQ $9A53                  ; $9A4E
    JMP $9979                  ; $9A50
    LDA #$80                   ; $9A53
    AND a: $001E               ; $9A55
    BEQ $9A25                  ; $9A58
    LDA $0625                  ; $9A5A
    CLC                        ; $9A5D
    ADC #$16                   ; $9A5E
    JSR $C50C                  ; $9A60
    LDA $0034                  ; $9A63
    STA $003A                  ; $9A65
    LDA $0035                  ; $9A67
    STA $003B                  ; $9A69
    LDA $0626                  ; $9A6B
    JSR $C50C                  ; $9A6E
    LDY #$00                   ; $9A71
    LDA ($003A),Y              ; $9A73
    TAX                        ; $9A75
    LDA ($0034),Y              ; $9A76
    STA ($003A),Y              ; $9A78
    TXA                        ; $9A7A
    STA ($0034),Y              ; $9A7B
    INY                        ; $9A7D
    CPY #$04                   ; $9A7E
    BNE $9A73                  ; $9A80
    LDY #$00                   ; $9A82
    LDA ($003A),Y              ; $9A84
    LDX $0450                  ; $9A86
    STA $0451,X                ; $9A89
    INX                        ; $9A8C
    STX $0450                  ; $9A8D
    LDA #$3B                   ; $9A90
    JSR $C52A                  ; $9A92
    LDA #$01                   ; $9A95
    JSR $C515                  ; $9A97
    LDA a: $001C               ; $9A9A
    AND #$C0                   ; $9A9D
    BEQ $9A95                  ; $9A9F
    LDX $0450                  ; $9AA1
    CPX #$03                   ; $9AA4
    BCS $9AAB                  ; $9AA6
    JMP $9979                  ; $9AA8
    RTS                        ; $9AAB
    CLC                        ; $9AAC
    ADC #$16                   ; $9AAD
    JSR $C50C                  ; $9AAF
    LDY #$00                   ; $9AB2
    LDA ($0034),Y              ; $9AB4
    LDX $0450                  ; $9AB6
    BEQ $9AC5                  ; $9AB9
    CMP $0450,X                ; $9ABB
    BNE $9AC2                  ; $9ABE
    SEC                        ; $9AC0
    RTS                        ; $9AC1
    DEX                        ; $9AC2
    BNE $9ABB                  ; $9AC3
    CLC                        ; $9AC5
    RTS                        ; $9AC6
    .byte $A9,$00
    STA $062D                  ; $9AC9
    LDA #$39                   ; $9ACC
    JSR $C52A                  ; $9ACE
    LDA #$01                   ; $9AD1
    STA $0625                  ; $9AD3
    LDY #$16                   ; $9AD6
    JSR $9F37                  ; $9AD8
    .byte $A9,$01
    JSR $C515                  ; $9ADD
    LDA $0625                  ; $9AE0
    JSR $9B90                  ; $9AE3
    BCC $9AFD                  ; $9AE6
    LDA $9EB7,X                ; $9AE8
    PHA                        ; $9AEB
    LDA $0625                  ; $9AEC
    LDY #$16                   ; $9AEF
    JSR $9F3F                  ; $9AF1
    PLA                        ; $9AF4
    STA $0625                  ; $9AF5
    LDY #$16                   ; $9AF8
    JSR $9F37                  ; $9AFA
    LDA #$80                   ; $9AFD
    AND a: $001E               ; $9AFF
    BNE $9B0F                  ; $9B02
    LDA #$40                   ; $9B04
    AND a: $001E               ; $9B06
    BEQ $9ADB                  ; $9B09
    JSR $990C                  ; $9B0B
    RTS                        ; $9B0E
    LDA #$01                   ; $9B0F
    CMP $0625                  ; $9B11
    BNE $9B18                  ; $9B14
    LDA #$02                   ; $9B16
    STA $0626                  ; $9B18
    LDY #$16                   ; $9B1B
    JSR $9F37                  ; $9B1D
    LDA #$01                   ; $9B20
    JSR $C515                  ; $9B22
    LDA $0626                  ; $9B25
    JSR $9B90                  ; $9B28
    BCC $9B4F                  ; $9B2B
    LDA $9EB7,X                ; $9B2D
    CMP $0625                  ; $9B30
    BNE $9B3D                  ; $9B33
    LDX $003A                  ; $9B35
    JSR $9BA4                  ; $9B37
    LDA $9EB7,X                ; $9B3A
    PHA                        ; $9B3D
    LDA $0626                  ; $9B3E
    LDY #$16                   ; $9B41
    JSR $9F3F                  ; $9B43
    PLA                        ; $9B46
    STA $0626                  ; $9B47
    LDY #$16                   ; $9B4A
    JSR $9F37                  ; $9B4C
    LDA #$80                   ; $9B4F
    AND a: $001E               ; $9B51
    BNE $9B68                  ; $9B54
    LDA #$40                   ; $9B56
    AND a: $001E               ; $9B58
    BEQ $9B20                  ; $9B5B
    LDA $0626                  ; $9B5D
    LDY #$16                   ; $9B60
    JSR $9F3F                  ; $9B62
    JMP $9ADB                  ; $9B65
    LDA $0625                  ; $9B68
    JSR $C50C                  ; $9B6B
    LDA $0034                  ; $9B6E
    STA $003A                  ; $9B70
    LDA $0035                  ; $9B72
    STA $003B                  ; $9B74
    LDA $0626                  ; $9B76
    JSR $C50C                  ; $9B79
    LDY #$00                   ; $9B7C
    LDA ($003A),Y              ; $9B7E
    TAX                        ; $9B80
    LDA ($0034),Y              ; $9B81
    STA ($003A),Y              ; $9B83
    TXA                        ; $9B85
    STA ($0034),Y              ; $9B86
    INY                        ; $9B88
    CPY #$04                   ; $9B89
    BNE $9B7E                  ; $9B8B
    JMP $9AC7                  ; $9B8D
    PHA                        ; $9B90
    LDA #$0F                   ; $9B91
    AND a: $001E               ; $9B93
    BNE $9B9B                  ; $9B96
    PLA                        ; $9B98
    CLC                        ; $9B99
    RTS                        ; $9B9A
    LDX #$00                   ; $9B9B
    LSR                        ; $9B9D
    BCS $9BA3                  ; $9B9E
    INX                        ; $9BA0
    BNE $9B9D                  ; $9BA1
    PLA                        ; $9BA3
    STX $003A                  ; $9BA4
    ASL                        ; $9BA6
    ASL                        ; $9BA7
    ADC $003A                  ; $9BA8
    TAX                        ; $9BAA
    SEC                        ; $9BAB
    RTS                        ; $9BAC
    .byte $A9,$00
    STA $062D                  ; $9BAF
    LDA #$3C                   ; $9BB2
    JSR $C52A                  ; $9BB4
    LDA #$01                   ; $9BB7
    JSR $C515                  ; $9BB9
    LDA #$80                   ; $9BBC
    AND a: $001E               ; $9BBE
    BNE $9BCC                  ; $9BC1
    LDA #$40                   ; $9BC3
    AND a: $001E               ; $9BC5
    BNE $9BEB                  ; $9BC8
    BEQ $9BB7                  ; $9BCA
    LDA a: $002A               ; $9BCC
    CMP #$02                   ; $9BCF
    BNE $9BEB                  ; $9BD1
    LDA #$3D                   ; $9BD3
    JSR $C52A                  ; $9BD5
    LDA #$01                   ; $9BD8
    JSR $C515                  ; $9BDA
    LDA #$40                   ; $9BDD
    AND a: $001E               ; $9BDF
    BNE $9BAD                  ; $9BE2
    LDA #$80                   ; $9BE4
    AND a: $001E               ; $9BE6
    BEQ $9BD8                  ; $9BE9
    JMP $990C                  ; $9BEB
    CMP #$FF                   ; $9BEE
    BEQ $9C0E                  ; $9BF0
    JSR $C536                  ; $9BF2
    LDA $05FB                  ; $9BF5
    BEQ $9C04                  ; $9BF8
    TYA                        ; $9BFA
    EOR #$FF                   ; $9BFB
    TAY                        ; $9BFD
    TXA                        ; $9BFE
    EOR #$FF                   ; $9BFF
    TAX                        ; $9C01
    INY                        ; $9C02
    INX                        ; $9C03
    TYA                        ; $9C04
    LDY #$08                   ; $9C05
    STA ($0034),Y              ; $9C07
    TXA                        ; $9C09
    LDY #$06                   ; $9C0A
    STA ($0034),Y              ; $9C0C
    RTS                        ; $9C0E
    LDA $05FC                  ; $9C0F
    STA $0626                  ; $9C12
    JSR $9C1F                  ; $9C15
    LDA $0626                  ; $9C18
    STA $05FC                  ; $9C1B
    RTS                        ; $9C1E
    LDA #$28                   ; $9C1F
    JSR $C52A                  ; $9C21
    LDA #$00                   ; $9C24
    STA $0624                  ; $9C26
    JSR $9D1B                  ; $9C29
    LDA #$01                   ; $9C2C
    JSR $C515                  ; $9C2E
    LDA #$0C                   ; $9C31
    AND a: $001E               ; $9C33
    BEQ $9C43                  ; $9C36
    LDA $0624                  ; $9C38
    EOR #$40                   ; $9C3B
    STA $0624                  ; $9C3D
    JSR $9D1B                  ; $9C40
    LDA #$40                   ; $9C43
    AND a: $001E               ; $9C45
    BEQ $9C4C                  ; $9C48
    CLC                        ; $9C4A
    RTS                        ; $9C4B
    LDA #$80                   ; $9C4C
    AND a: $001E               ; $9C4E
    BEQ $9C2C                  ; $9C51
    BIT $0624                  ; $9C53
    BVS $9C5A                  ; $9C56
    SEC                        ; $9C58
    RTS                        ; $9C59
    LDA #$38                   ; $9C5A
    JSR $C54E                  ; $9C5C
    LDA #$29                   ; $9C5F
    JSR $C52A                  ; $9C61
    LDA #$01                   ; $9C64
    STA $0625                  ; $9C66
    JSR $9D1B                  ; $9C69
    LDA $05FE                  ; $9C6C
    STA $0624                  ; $9C6F
    LDA #$01                   ; $9C72
    JSR $C515                  ; $9C74
    LDA #$84                   ; $9C77
    STA $062D                  ; $9C79
    LDA #$0C                   ; $9C7C
    AND a: $001E               ; $9C7E
    BEQ $9C8E                  ; $9C81
    LDA $0625                  ; $9C83
    EOR #$40                   ; $9C86
    STA $0625                  ; $9C88
    JSR $9D1B                  ; $9C8B
    LDA #$80                   ; $9C8E
    AND a: $001E               ; $9C90
    BEQ $9C72                  ; $9C93
    BIT $0625                  ; $9C95
    BVC $9CA1                  ; $9C98
    LDA #$00                   ; $9C9A
    STA $062D                  ; $9C9C
    SEC                        ; $9C9F
    RTS                        ; $9CA0
    LDA #$81                   ; $9CA1
    JSR $9D1B                  ; $9CA3
    LDA #$81                   ; $9CA6
    STA $062D                  ; $9CA8
    JSR $9DD4                  ; $9CAB
    LDA #$01                   ; $9CAE
    JSR $C515                  ; $9CB0
    JSR $9D9B                  ; $9CB3
    CMP $0624                  ; $9CB6
    STA $0624                  ; $9CB9
    BEQ $9CC1                  ; $9CBC
    JSR $9DD4                  ; $9CBE
    LDA #$40                   ; $9CC1
    AND a: $001E               ; $9CC3
    BEQ $9CD1                  ; $9CC6
    LDA $0625                  ; $9CC8
    JSR $9D1B                  ; $9CCB
    JMP $9C72                  ; $9CCE
    LDA #$80                   ; $9CD1
    AND a: $001E               ; $9CD3
    BEQ $9CAE                  ; $9CD6
    LDA $05FC                  ; $9CD8
    CMP #$FF                   ; $9CDB
    BEQ $9CAE                  ; $9CDD
    LDA $0624                  ; $9CDF
    STA $0616                  ; $9CE2
    LDA #$01                   ; $9CE5
    JSR $C515                  ; $9CE7
    JSR $9D9B                  ; $9CEA
    CMP $0624                  ; $9CED
    STA $0624                  ; $9CF0
    BEQ $9CF8                  ; $9CF3
    JSR $9DBD                  ; $9CF5
    LDA #$40                   ; $9CF8
    AND a: $001E               ; $9CFA
    BEQ $9D0B                  ; $9CFD
    .byte $AD,$16,$06,$8D,$24,$06,$20,$BD,$9D,$4C,$AE,$9C
    LDA #$80                   ; $9D0B
    AND a: $001E               ; $9D0D
    BEQ $9CE5                  ; $9D10
    LDA $0625                  ; $9D12
    JSR $9D1B                  ; $9D15
    JMP $9C72                  ; $9D18
    PHA                        ; $9D1B
    LDA #$01                   ; $9D1C
    JSR $C515                  ; $9D1E
    LDA $0515                  ; $9D21
    BNE $9D1C                  ; $9D24
    LDA #$01                   ; $9D26
    STA $0515                  ; $9D28
    PLA                        ; $9D2B
    STA $04A5                  ; $9D2C
    AND #$0F                   ; $9D2F
    ASL                        ; $9D31
    ASL                        ; $9D32
    TAX                        ; $9D33
    LDA $9D82,X                ; $9D34
    STA $04A6                  ; $9D37
    LDA $9D83,X                ; $9D3A
    STA $04A7                  ; $9D3D
    LDA $9D84,X                ; $9D40
    STA $04AA                  ; $9D43
    LDA $9D85,X                ; $9D46
    STA $04AB                  ; $9D49
    LDA $04A5                  ; $9D4C
    AND #$0F                   ; $9D4F
    TAX                        ; $9D51
    LDA #$00                   ; $9D52
    BIT $04A5                  ; $9D54
    BMI $9D5E                  ; $9D57
    BVS $9D5E                  ; $9D59
    LDA $9D96,X                ; $9D5B
    STA $04A8                  ; $9D5E
    LDA #$00                   ; $9D61
    BIT $04A5                  ; $9D63
    BMI $9D6D                  ; $9D66
    BVC $9D6D                  ; $9D68
    LDA $9D96,X                ; $9D6A
    STA $04AC                  ; $9D6D
    LDX #$01                   ; $9D70
    STX $04A5                  ; $9D72
    STX $04A9                  ; $9D75
    DEX                        ; $9D78
    STX $04AD                  ; $9D79
    LDA #$80                   ; $9D7C
    STA $0515                  ; $9D7E
    RTS                        ; $9D81
    .byte $CC,$22,$0C,$23,$89,$22,$C9,$22,$C9,$22,$09,$23,$CC,$22,$0C,$23
    .byte $C9,$22,$09,$23,$F6,$F6,$F6,$F6,$B1
    LDA #$0F                   ; $9D9B
    AND a: $001E               ; $9D9D
    BEQ $9DB5                  ; $9DA0
    LDX #$00                   ; $9DA2
    LSR                        ; $9DA4
    BCS $9DAA                  ; $9DA5
    INX                        ; $9DA7
    BNE $9DA4                  ; $9DA8
    LDA $9DB9,X                ; $9DAA
    CLC                        ; $9DAD
    ADC $0624                  ; $9DAE
    CMP #$F0                   ; $9DB1
    BCC $9DB8                  ; $9DB3
    LDA $0624                  ; $9DB5
    RTS                        ; $9DB8
    .byte $0C,$F4,$01,$FF
    LDA $05FC                  ; $9DBD
    JSR $C50C                  ; $9DC0
    LDA $0624                  ; $9DC3
    JSR $C536                  ; $9DC6
    TYA                        ; $9DC9
    LDY #$08                   ; $9DCA
    STA ($0034),Y              ; $9DCC
    TXA                        ; $9DCE
    LDY #$06                   ; $9DCF
    STA ($0034),Y              ; $9DD1
    RTS                        ; $9DD3
    LDA #$01                   ; $9DD4
    STA $003A                  ; $9DD6
    LDA $003A                  ; $9DD8
    CMP $0441                  ; $9DDA
    BEQ $9DF4                  ; $9DDD
    JSR $C50C                  ; $9DDF
    LDY #$06                   ; $9DE2
    LDA ($0034),Y              ; $9DE4
    TAX                        ; $9DE6
    LDY #$08                   ; $9DE7
    LDA ($0034),Y              ; $9DE9
    TAY                        ; $9DEB
    JSR $C539                  ; $9DEC
    CMP $0624                  ; $9DEF
    BEQ $9E02                  ; $9DF2
    INC $003A                  ; $9DF4
    LDA $003A                  ; $9DF6
    CMP #$0B                   ; $9DF8
    BNE $9DD8                  ; $9DFA
    LDX #$FF                   ; $9DFC
    LDA #$1C                   ; $9DFE
    BNE $9E06                  ; $9E00
    LDA #$1D                   ; $9E02
    LDX $003A                  ; $9E04
    STX $05FC                  ; $9E06
    JSR $C52A                  ; $9E09
    RTS                        ; $9E0C
    STA $003A                  ; $9E0D
    ASL                        ; $9E0F
    TAX                        ; $9E10
    LDA $9FF0,X                ; $9E11
    STA $003C                  ; $9E14
    LDA $9FF1,X                ; $9E16
    STA $003D                  ; $9E19
    LDA #$00                   ; $9E1B
    STA $003B                  ; $9E1D
    LDA $003B                  ; $9E1F
    JSR $C50C                  ; $9E21
    LDX $003B                  ; $9E24
    CPX $0441                  ; $9E26
    BEQ $9E46                  ; $9E29
    LDY $05FB                  ; $9E2B
    CPX #$0B                   ; $9E2E
    BCC $9E3A                  ; $9E30
    TXA                        ; $9E32
    SBC #$0B                   ; $9E33
    TAX                        ; $9E35
    TYA                        ; $9E36
    EOR #$0B                   ; $9E37
    TAY                        ; $9E39
    STX $003E                  ; $9E3A
    TYA                        ; $9E3C
    CLC                        ; $9E3D
    ADC $003E                  ; $9E3E
    TAY                        ; $9E40
    LDA ($003C),Y              ; $9E41
    JMP $9E4B                  ; $9E43
    LDX $003A                  ; $9E46
    LDA $A0F8,X                ; $9E48
    .byte $20,$EE,$9B
    INC $003B                  ; $9E4E
    LDA $003B                  ; $9E50
    CMP #$16                   ; $9E52
    BNE $9E1F                  ; $9E54
    JSR $C645                  ; $9E56
    RTS                        ; $9E59
    PHA                        ; $9E5A
    LDA #$01                   ; $9E5B
    JSR $C515                  ; $9E5D
    JSR $C52D                  ; $9E60
    PLA                        ; $9E63
    LDX $05FB                  ; $9E64
    BEQ $9E6F                  ; $9E67
    LDA #$14                   ; $9E69
    STA $0441                  ; $9E6B
    RTS                        ; $9E6E
    JSR $C52A                  ; $9E6F
    LDA #$01                   ; $9E72
    STA $0441                  ; $9E74
    LDY #$00                   ; $9E77
    JSR $9F3B                  ; $9E79
    LDA #$01                   ; $9E7C
    JSR $C515                  ; $9E7E
    LDA #$0F                   ; $9E81
    AND a: $001E               ; $9E83
    BEQ $9EAF                  ; $9E86
    LDX #$00                   ; $9E88
    LSR                        ; $9E8A
    BCS $9E90                  ; $9E8B
    INX                        ; $9E8D
    BNE $9E8A                  ; $9E8E
    STX $003A                  ; $9E90
    LDA $0441                  ; $9E92
    ASL                        ; $9E95
    ASL                        ; $9E96
    ADC $003A                  ; $9E97
    TAX                        ; $9E99
    LDA $9EB7,X                ; $9E9A
    PHA                        ; $9E9D
    LDA $0441                  ; $9E9E
    LDY #$00                   ; $9EA1
    JSR $9F3F                  ; $9EA3
    PLA                        ; $9EA6
    STA $0441                  ; $9EA7
    LDY #$00                   ; $9EAA
    JSR $9F3B                  ; $9EAC
    LDA #$80                   ; $9EAF
    AND a: $001E               ; $9EB1
    BEQ $9E7C                  ; $9EB4
    RTS                        ; $9EB6
    .byte $FF,$FF,$FF,$FF,$05,$09,$02,$04,$06,$0A,$03,$01,$07,$07,$04,$02
    .byte $08,$08,$01,$03,$09,$01,$06,$08,$0A,$02,$07,$05,$03,$03,$08,$06
    .byte $04,$04,$05,$07,$01,$05,$0A,$0A,$02,$06,$09,$09,$03,$07,$09,$0A
    .byte $05,$09,$02,$04,$06,$0A,$03,$01,$07,$00,$04,$02,$08,$00,$01,$03
    .byte $09,$01,$06,$08,$0A,$02,$07,$05,$00,$03,$08,$06,$00,$04,$05,$07
    .byte $01,$05,$0A,$00,$02,$06,$00,$09,$03
    .byte $06,$01,$02,$04,$08,$02,$00,$05,$09,$00,$01,$06,$00,$04,$05,$07
    .byte $01,$05,$03,$09,$02,$03,$04,$08,$03,$07,$07,$09,$04,$06,$06,$01
    .byte $07,$09,$09,$02,$05,$08,$08
    LDX #$B1                   ; $9F37
    BNE $9F41                  ; $9F39
    LDX #$F6                   ; $9F3B
    BNE $9F41                  ; $9F3D
    LDX #$00                   ; $9F3F
    PHA                        ; $9F41
    LDA #$01                   ; $9F42
    JSR $C515                  ; $9F44
    LDA $0515                  ; $9F47
    BNE $9F42                  ; $9F4A
    LDA #$01                   ; $9F4C
    STA $0515                  ; $9F4E
    STX $04A8                  ; $9F51
    STY $04A5                  ; $9F54
    PLA                        ; $9F57
    ASL                        ; $9F58
    ADC $04A5                  ; $9F59
    TAX                        ; $9F5C
    LDA #$01                   ; $9F5D
    STA $04A5                  ; $9F5F
    LDA $9F79,X                ; $9F62
    STA $04A6                  ; $9F65
    LDA $9F7A,X                ; $9F68
    STA $04A7                  ; $9F6B
    LDA #$00                   ; $9F6E
    STA $04A9                  ; $9F70
    LDA #$80                   ; $9F73
    STA $0515                  ; $9F75
    RTS                        ; $9F78
    .byte $18,$23
    .byte $8A,$22,$CA,$22,$0A,$23,$4A,$23,$91,$22,$D1,$22,$11,$23,$51,$23
    .byte $98,$22,$D8,$22,$16,$23,$84,$22,$C4,$22,$04,$23,$44,$23,$8D,$22
    .byte $CD,$22,$0D,$23,$4D,$23,$96,$22,$D6,$22,$C2,$22,$02,$23,$42,$23
    .byte $C9,$22,$09,$23,$49,$23,$D0,$22,$10,$23,$17,$23,$57,$23,$C3,$9F
    .byte $CD,$9F,$D5,$9F,$DE,$9F,$E6,$9F,$B4,$C0,$C1,$CC,$CD,$D8,$D9,$E4
    .byte $E5,$FF,$A8,$A9,$AA,$AB,$B5,$B6,$B7,$FF,$AC,$AD,$AE,$AF,$B8,$B9
    .byte $BA,$BB,$FF,$B0,$B1,$B2,$B3,$BC,$BD,$BE,$FF,$BF,$CA,$CB,$D6,$D7
    .byte $E2,$E3,$EE,$EF,$FF,$06,$A0,$1C,$A0,$32,$A0,$48,$A0,$5E,$A0,$74
    .byte $A0,$8A,$A0,$A0,$A0
