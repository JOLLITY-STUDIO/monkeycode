; ============================================================
; code_main.s - bank26 main routines
; ============================================================

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
