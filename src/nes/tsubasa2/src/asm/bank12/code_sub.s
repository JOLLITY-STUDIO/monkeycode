; ============================================================
; code_sub.s - bank12 sub routines
; ============================================================

    JMP $82D2                  ; $8253
    RTS                        ; $8256
    LDA $07C7,X                ; $8257
    ASL                        ; $825A
    TAY                        ; $825B
    LDA $8269,Y                ; $825C
    STA $00F9                  ; $825F
    LDA $826A,Y                ; $8261
    STA $00FA                  ; $8264
    JMP ($00F9)                ; $8266
    .byte $97,$82,$97,$82,$B4,$82,$C9,$82,$B4,$82,$97,$82,$97,$82,$7D,$82
    .byte $92,$82,$7D,$82,$A9,$01,$18
    ADC $07B7,X                ; $8280
    LDY #$07                   ; $8283
    STA ($00F0),Y              ; $8285
    LDA $07BF,X                ; $8287
    ADC #$00                   ; $828A
    INY                        ; $828C
    STA ($00F0),Y              ; $828D
    JMP $82A4                  ; $828F
    .byte $A9,$02
    JMP $827F                  ; $8294
    .byte $BD,$B7,$07
    LDY #$07                   ; $829A
    STA ($00F0),Y              ; $829C
    LDA $07BF,X                ; $829E
    INY                        ; $82A1
    STA ($00F0),Y              ; $82A2
    .byte $BD,$C7,$07
    CLC                        ; $82A7
    ADC #$01                   ; $82A8
    CMP #$0A                   ; $82AA
    BNE $82B0                  ; $82AC
    LDA #$00                   ; $82AE
    STA $07C7,X                ; $82B0
    RTS                        ; $82B3
    .byte $BD,$B7,$07
    SEC                        ; $82B7
    SBC #$01                   ; $82B8
    .byte $A0,$07
    STA ($00F0),Y              ; $82BC
    LDA $07BF,X                ; $82BE
    SBC #$00                   ; $82C1
    INY                        ; $82C3
    STA ($00F0),Y              ; $82C4
    JMP $82A4                  ; $82C6
    .byte $BD,$B7,$07
    SEC                        ; $82CC
    SBC #$02                   ; $82CD
    JMP $82BA                  ; $82CF
    .byte $BD,$C7,$07
    ASL                        ; $82D5
    TAY                        ; $82D6
    LDA $82E4,Y                ; $82D7
    STA $00F9                  ; $82DA
    LDA $82E5,Y                ; $82DC
    STA $00FA                  ; $82DF
    JMP ($00F9)                ; $82E1
    .byte $0E,$83,$2B,$83,$40,$83,$2B,$83,$0E,$83,$F4,$82,$09,$83,$F4,$82
    .byte $A9,$03,$18
    ADC $07B7,X                ; $82F7
    LDY #$07                   ; $82FA
    STA ($00F0),Y              ; $82FC
    LDA $07BF,X                ; $82FE
    ADC #$00                   ; $8301
    INY                        ; $8303
    STA ($00F0),Y              ; $8304
    JMP $831B                  ; $8306
    .byte $A9,$06
    JMP $82F6                  ; $830B
    .byte $BD,$B7,$07
    LDY #$07                   ; $8311
    STA ($00F0),Y              ; $8313
    LDA $07BF,X                ; $8315
    INY                        ; $8318
    STA ($00F0),Y              ; $8319
    .byte $BD,$C7,$07
    CLC                        ; $831E
    ADC #$01                   ; $831F
    CMP #$08                   ; $8321
    BNE $8327                  ; $8323
    LDA #$00                   ; $8325
    STA $07C7,X                ; $8327
    RTS                        ; $832A
    .byte $BD,$B7,$07
    SEC                        ; $832E
    SBC #$03                   ; $832F
    .byte $A0,$07
    STA ($00F0),Y              ; $8333
    LDA $07BF,X                ; $8335
    SBC #$00                   ; $8338
    INY                        ; $833A
    STA ($00F0),Y              ; $833B
    JMP $831B                  ; $833D
    .byte $BD,$B7,$07
    SEC                        ; $8343
    SBC #$06                   ; $8344
    JMP $8331                  ; $8346
    STX $00F5                  ; $8349
    LDA #$00                   ; $834B
    STA $0700,X                ; $834D
    DEY                        ; $8350
    TYA                        ; $8351
    ASL                        ; $8352
    TAY                        ; $8353
    LDA $8BDA,Y                ; $8354
    STA $00F0                  ; $8357
    LDA $8BDB,Y                ; $8359
    STA $00F1                  ; $835C
    LDY #$00                   ; $835E
    LDA ($00F0),Y              ; $8360
    BPL $836C                  ; $8362
    LDX #$0F                   ; $8364
    STX $4015                  ; $8366
    LDX $00F5                  ; $8369
    RTS                        ; $836B
    STA $00F4                  ; $836C
    LDA #$08                   ; $836E
    CLC                        ; $8370
    SBC $00F4                  ; $8371
    TAX                        ; $8373
    LDA #$00                   ; $8374
    STA $07A7,X                ; $8376
    STA $07AF,X                ; $8379
    STA $07E3                  ; $837C
    STA $07E2                  ; $837F
    STA $07EA,X                ; $8382
    STA $07CF,X                ; $8385
    STA $07D7,X                ; $8388
    STA $07DF                  ; $838B
    STA $07F4,X                ; $838E
    STA $07E8                  ; $8391
    LDA $00F4                  ; $8394
    ASL                        ; $8396
    ASL                        ; $8397
    ASL                        ; $8398
    ASL                        ; $8399
    TAX                        ; $839A
    INY                        ; $839B
    LDA ($00F0),Y              ; $839C
    STA $0727,X                ; $839E
    INY                        ; $83A1
    LDA ($00F0),Y              ; $83A2
    STA $0728,X                ; $83A4
    LDA #$00                   ; $83A7
    STA $072C,X                ; $83A9
    LDA #$0F                   ; $83AC
    STA $0730,X                ; $83AE
    LDA $00F4                  ; $83B1
    ASL                        ; $83B3
    ASL                        ; $83B4
    TAX                        ; $83B5
    LDA #$01                   ; $83B6
    STA $0707,X                ; $83B8
    LSR                        ; $83BB
    LDX $00F4                  ; $83BC
    ROL                        ; $83BE
    DEX                        ; $83BF
    BPL $83BE                  ; $83C0
    ORA $0706                  ; $83C2
    STA $0706                  ; $83C5
    INY                        ; $83C8
    BPL $8360                  ; $83C9
    LDA #$CF                   ; $83CB
    LDY #$05                   ; $83CD
    AND ($00F0),Y              ; $83CF
    STA ($00F0),Y              ; $83D1
    LDY #$00                   ; $83D3
    LDA ($00F0),Y              ; $83D5
    STA $00F4                  ; $83D7
    INY                        ; $83D9
    LDA ($00F0),Y              ; $83DA
    STA $00F5                  ; $83DC
    DEY                        ; $83DE
    LDA ($00F4),Y              ; $83DF
    BPL $8404                  ; $83E1
    INY                        ; $83E3
    CMP #$E0                   ; $83E4
    BCC $83ED                  ; $83E6
    JSR $84C9                  ; $83E8
    BPL $83DF                  ; $83EB
    CMP #$B0                   ; $83ED
    BCC $83F4                  ; $83EF
    .byte $C8,$D0,$EB
    AND #$3F                   ; $83F4
    TAX                        ; $83F6
    LDA $8725,X                ; $83F7
    LDX $00F2                  ; $83FA
    STA $0707,X                ; $83FC
    STA $0708,X                ; $83FF
    BPL $83DF                  ; $8402
    INY                        ; $8404
    PHA                        ; $8405
    TYA                        ; $8406
    LDY #$00                   ; $8407
    CLC                        ; $8409
    ADC $00F4                  ; $840A
    STA ($00F0),Y              ; $840C
    INY                        ; $840E
    LDA #$00                   ; $840F
    ADC $00F5                  ; $8411
    STA ($00F0),Y              ; $8413
    PLA                        ; $8415
    LDX #$05                   ; $8416
    CPX $00F3                  ; $8418
    BEQ $8422                  ; $841A
    LDX #$01                   ; $841C
    CPX $00F3                  ; $841E
    BCC $842E                  ; $8420
    CMP #$10                   ; $8422
    BEQ $8435                  ; $8424
    STA $00F4                  ; $8426
    LDA #$00                   ; $8428
    STA $00F5                  ; $842A
    BEQ $845C                  ; $842C
    TAX                        ; $842E
    AND #$0F                   ; $842F
    CMP #$0C                   ; $8431
    BNE $843F                  ; $8433
    LDY #$05                   ; $8435
    LDA #$20                   ; $8437
    ORA ($00F0),Y              ; $8439
    STA ($00F0),Y              ; $843B
    BNE $84A6                  ; $843D
    ASL                        ; $843F
    TAY                        ; $8440
    LDA $870D,Y                ; $8441
    STA $00F4                  ; $8444
    LDA $870E,Y                ; $8446
    STA $00F5                  ; $8449
    TXA                        ; $844B
    AND #$F0                   ; $844C
    LSR                        ; $844E
    LSR                        ; $844F
    LSR                        ; $8450
    LSR                        ; $8451
    TAX                        ; $8452
    BEQ $845C                  ; $8453
    LSR $00F5                  ; $8455
    ROR $00F4                  ; $8457
    DEX                        ; $8459
    BNE $8455                  ; $845A
    LDA $00F4                  ; $845C
    LDX $00F3                  ; $845E
    DEX                        ; $8460
    LDY $07F4,X                ; $8461
    BEQ $848F                  ; $8464
    SEC                        ; $8466
    SBC $07A7,X                ; $8467
    BCC $8478                  ; $846A
    LDY #$07                   ; $846C
    STA ($00F0),Y              ; $846E
    STA $07B7,X                ; $8470
    LDA $00F5                  ; $8473
    JMP $8484                  ; $8475
    LDY #$07                   ; $8478
    STA ($00F0),Y              ; $847A
    STA $07B7,X                ; $847C
    LDA $00F5                  ; $847F
    SEC                        ; $8481
    SBC #$01                   ; $8482
    .byte $09,$80
    INY                        ; $8486
    STA ($00F0),Y              ; $8487
    STA $07BF,X                ; $8489
    JMP $84A6                  ; $848C
    CLC                        ; $848F
    ADC $07A7,X                ; $8490
    LDY #$07                   ; $8493
    STA ($00F0),Y              ; $8495
    STA $07B7,X                ; $8497
    INY                        ; $849A
    LDA $00F5                  ; $849B
    ADC #$00                   ; $849D
    ORA #$80                   ; $849F
    STA ($00F0),Y              ; $84A1
