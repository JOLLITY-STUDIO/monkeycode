; ============================================================
; code_sub.s - bank20 sub routines
; ============================================================

    AND #$7F                   ; $82E4
    TAY                        ; $82E6
    LDA ($003A),Y              ; $82E7
    STA $046F,X                ; $82E9
    INX                        ; $82EC
    CPX #$20                   ; $82ED
    BNE $82DF                  ; $82EF
    LDA #$01                   ; $82F1
    JMP $83CF                  ; $82F3
    .byte $0F,$0F,$0F,$30,$0F,$21,$89,$8A,$0F,$21,$8B,$8C,$0F,$21,$8D,$8E
    .byte $0F,$0F,$80,$81,$0F,$0F,$82,$83,$0F,$0F,$84,$85,$0F,$86,$87,$88
    AND #$7F                   ; $8316
    JSR $C509                  ; $8318
    .byte $2B,$83,$35,$83,$42,$83,$47,$83,$61,$83,$65,$83,$6A,$83,$7B,$83
    .byte $A9,$00
    LDX a: $002A               ; $832D
    BEQ $8334                  ; $8330
    LDA #$01                   ; $8332
    RTS                        ; $8334
    .byte $A9,$03,$AE,$2A,$00
    CPX #$01                   ; $833A
    BEQ $8341                  ; $833C
    CLC                        ; $833E
    ADC #$01                   ; $833F
    RTS                        ; $8341
    .byte $A9,$05
    JMP $8337                  ; $8344
    .byte $18
    PHP                        ; $8348
    LDA #$2E                   ; $8349
    LDX a: $002B               ; $834B
    CPX #$12                   ; $834E
    BEQ $835D                  ; $8350
    LDA #$07                   ; $8352
    LDX a: $002A               ; $8354
    CPX #$01                   ; $8357
    BEQ $835D                  ; $8359
    LDA #$09                   ; $835B
    PLP                        ; $835D
    ADC #$00                   ; $835E
    RTS                        ; $8360
    .byte $38
    JMP $8348                  ; $8362
    .byte $A9,$0B
    JMP $8337                  ; $8367
    .byte $18,$08,$A9,$15,$AE,$2A,$00,$E0,$02,$F0,$02,$A9,$26,$28,$69,$00
    .byte $60,$38,$4C,$6B,$83,$A2,$00
    LDA $05FB                  ; $8381
    BEQ $8387                  ; $8384
    INX                        ; $8386
    LDA a: $002A,X             ; $8387
    ASL                        ; $838A
    TAY                        ; $838B
    LDX #$00                   ; $838C
    LDA $83A6,X                ; $838E
    STA $047F,X                ; $8391
    INX                        ; $8394
    CPX #$08                   ; $8395
    BNE $838E                  ; $8397
    LDA $BA87,Y                ; $8399
    STA $0481                  ; $839C
    LDA $BA88,Y                ; $839F
    STA $0482                  ; $83A2
    RTS                        ; $83A5
    .byte $0F,$0F,$00,$00,$0F,$0F,$30,$00,$A0,$01
    LDA ($004C),Y              ; $83B0
    TAX                        ; $83B2
    LDA #$00                   ; $83B3
    STA $0547,X                ; $83B5
    LDA #$02                   ; $83B8
    JMP $83CF                  ; $83BA
    .byte $A0,$01
    LDA ($004C),Y              ; $83BF
    STA $0540                  ; $83C1
    INY                        ; $83C4
    LDA ($004C),Y              ; $83C5
    STA $0541                  ; $83C7
    LDA #$03                   ; $83CA
    JMP $83CF                  ; $83CC
    .byte $18
    ADC $004C                  ; $83D0
    STA $004C                  ; $83D2
    BCC $83D8                  ; $83D4
    INC $004D                  ; $83D6
    RTS                        ; $83D8
    .byte $A0,$10
    LDA ($003C),Y              ; $83DB
    BEQ $83E9                  ; $83DD
    CMP #$FF                   ; $83DF
    BEQ $83E8                  ; $83E1
    SEC                        ; $83E3
    SBC #$01                   ; $83E4
    STA ($003C),Y              ; $83E6
    RTS                        ; $83E8
    LDY #$00                   ; $83E9
    LDA ($003C),Y              ; $83EB
    AND #$9F                   ; $83ED
    STA ($003C),Y              ; $83EF
    LDY #$13                   ; $83F1
    LDA #$00                   ; $83F3
    STA ($003C),Y              ; $83F5
    INY                        ; $83F7
    STA ($003C),Y              ; $83F8
    LDY #$03                   ; $83FA
    LDA ($003C),Y              ; $83FC
    STA $003E                  ; $83FE
    INY                        ; $8400
    LDA ($003C),Y              ; $8401
    STA $003F                  ; $8403
    LDY #$00                   ; $8405
    STY $0040                  ; $8407
    .byte $A4,$40
    INC $0040                  ; $840B
    LDA ($003E),Y              ; $840D
    CMP #$F0                   ; $840F
    BCC $8419                  ; $8411
    JSR $8438                  ; $8413
    JMP $8409                  ; $8416
    TAX                        ; $8419
    INY                        ; $841A
    TYA                        ; $841B
    PHA                        ; $841C
    LDA ($003E),Y              ; $841D
    LDY #$12                   ; $841F
    STA ($003C),Y              ; $8421
    TXA                        ; $8423
    LDY #$10                   ; $8424
    STA ($003C),Y              ; $8426
    PLA                        ; $8428
    LDY #$03                   ; $8429
    SEC                        ; $842B
    ADC $003E                  ; $842C
    STA ($003C),Y              ; $842E
    INY                        ; $8430
    LDA #$00                   ; $8431
    ADC $003F                  ; $8433
    STA ($003C),Y              ; $8435
    RTS                        ; $8437
    SEC                        ; $8438
    SBC #$F0                   ; $8439
    JSR $C509                  ; $843B
    .byte $50,$84,$59,$84,$5D,$84,$66,$84,$77,$84,$96,$84,$B3,$84,$C7,$84
    .byte $D2,$84,$A0,$10
    LDA #$FF                   ; $8452
    STA ($003C),Y              ; $8454
    PLA                        ; $8456
    PLA                        ; $8457
    RTS                        ; $8458
    .byte $A9,$20
    BNE $845F                  ; $845B
    .byte $A9,$40
    LDY #$00                   ; $845F
    ORA ($003C),Y              ; $8461
    STA ($003C),Y              ; $8463
    RTS                        ; $8465
    .byte $A4,$40
    LDA ($003E),Y              ; $8468
    TAX                        ; $846A
    INY                        ; $846B
    LDA ($003E),Y              ; $846C
    STA $003F                  ; $846E
    STX $003E                  ; $8470
    LDA #$00                   ; $8472
    STA $0040                  ; $8474
    RTS                        ; $8476
    .byte $A4,$40
    LDA ($003E),Y              ; $8479
    PHA                        ; $847B
    INY                        ; $847C
    STY $0040                  ; $847D
    TYA                        ; $847F
    LDX $003F                  ; $8480
    CLC                        ; $8482
    ADC $003E                  ; $8483
    BCC $8488                  ; $8485
    .byte $E8
    LDY #$0E                   ; $8488
    STA ($003C),Y              ; $848A
    TXA                        ; $848C
    INY                        ; $848D
    STA ($003C),Y              ; $848E
    LDY #$0D                   ; $8490
    PLA                        ; $8492
    STA ($003C),Y              ; $8493
    RTS                        ; $8495
    .byte $A0,$0D
    LDA ($003C),Y              ; $8498
    SEC                        ; $849A
    SBC #$01                   ; $849B
    BNE $84A0                  ; $849D
    RTS                        ; $849F
    STA ($003C),Y              ; $84A0
    LDY #$0E                   ; $84A2
    LDA ($003C),Y              ; $84A4
    TAX                        ; $84A6
    INY                        ; $84A7
    LDA ($003C),Y              ; $84A8
    STA $003F                  ; $84AA
    STX $003E                  ; $84AC
    LDA #$00                   ; $84AE
    STA $0040                  ; $84B0
    RTS                        ; $84B2
    .byte $A4,$40
    LDA ($003E),Y              ; $84B5
    TAX                        ; $84B7
    INY                        ; $84B8
    LDA ($003E),Y              ; $84B9
    INY                        ; $84BB
    STY $0040                  ; $84BC
    LDY #$14                   ; $84BE
    STA ($003C),Y              ; $84C0
    DEY                        ; $84C2
    TXA                        ; $84C3
    STA ($003C),Y              ; $84C4
    RTS                        ; $84C6
    .byte $A4,$40
    LDA ($003E),Y              ; $84C9
    LDY #$12                   ; $84CB
    STA ($003C),Y              ; $84CD
    JMP $8450                  ; $84CF
    .byte $A4,$40
    INC $0040                  ; $84D4
    LDA ($003E),Y              ; $84D6
    STA $0546                  ; $84D8
    RTS                        ; $84DB
    .byte $A0,$11
    LDA ($003C),Y              ; $84DE
    BEQ $84EF                  ; $84E0
    CMP #$FF                   ; $84E2
    BNE $84E7                  ; $84E4
    RTS                        ; $84E6
    SEC                        ; $84E7
    SBC #$01                   ; $84E8
    STA ($003C),Y              ; $84EA
    JMP $852A                  ; $84EC
    STA $0040                  ; $84EF
    LDY #$01                   ; $84F1
    LDA ($003C),Y              ; $84F3
    STA $003E                  ; $84F5
    INY                        ; $84F7
    LDA ($003C),Y              ; $84F8
    STA $003F                  ; $84FA
    LDY #$00                   ; $84FC
    LDA ($003C),Y              ; $84FE
    AND #$10                   ; $8500
    BEQ $850F                  ; $8502
    LDA #$04                   ; $8504
    CLC                        ; $8506
    ADC $003E                  ; $8507
    STA $003E                  ; $8509
    BCC $850F                  ; $850B
    INC $003F                  ; $850D
    LDY #$00                   ; $850F
    LDA ($003C),Y              ; $8511
    AND #$EF                   ; $8513
    STA ($003C),Y              ; $8515
    JSR $857A                  ; $8517
    LDA $0040                  ; $851A
    LDY #$01                   ; $851C
    CLC                        ; $851E
    ADC $003E                  ; $851F
    STA ($003C),Y              ; $8521
    INY                        ; $8523
    LDA $003F                  ; $8524
    ADC #$00                   ; $8526
    STA ($003C),Y              ; $8528
    .byte $A9,$00
    STA $0042                  ; $852C
    STA $0043                  ; $852E
    LDY #$00                   ; $8530
    LDA ($003C),Y              ; $8532
    AND #$FC                   ; $8534
    STA $0041                  ; $8536
    LDA ($003C),Y              ; $8538
    LSR                        ; $853A
    ROL $0042                  ; $853B
    LSR                        ; $853D
    ROL $0043                  ; $853E
    LDX #$00                   ; $8540
    LDY #$05                   ; $8542
    JSR $85F2                  ; $8544
    LDX #$01                   ; $8547
    LDY #$09                   ; $8549
    JSR $85F2                  ; $854B
    LDA #$00                   ; $854E
    LSR $0043                  ; $8550
    ROL                        ; $8552
    LSR $0042                  ; $8553
    ROL                        ; $8555
    ORA $0041                  ; $8556
    LDY #$00                   ; $8558
    STA ($003C),Y              ; $855A
    AND #$10                   ; $855C
    BEQ $8579                  ; $855E
    LDY #$01                   ; $8560
    LDA ($003C),Y              ; $8562
    STA $003E                  ; $8564
    INY                        ; $8566
    LDA ($003C),Y              ; $8567
    STA $003F                  ; $8569
    LDX #$05                   ; $856B
    LDY #$01                   ; $856D
    JSR $860D                  ; $856F
    LDX #$09                   ; $8572
    LDY #$03                   ; $8574
    JSR $860D                  ; $8576
    RTS                        ; $8579
    .byte $A4,$40
    INC $0040                  ; $857C
    LDA ($003E),Y              ; $857E
    JSR $C509                  ; $8580
    .byte $A0,$85,$A9,$85,$D5,$85,$E1,$85,$8D,$85,$A4,$40
    LDA ($003E),Y              ; $858F
    TAX                        ; $8591
    INY                        ; $8592
    LDA ($003E),Y              ; $8593
    STA $003F                  ; $8595
    STX $003E                  ; $8597
    LDA #$00                   ; $8599
    STA $0040                  ; $859B
    JMP $857A                  ; $859D
    .byte $A0,$11
    LDA #$FF                   ; $85A2
    STA ($003C),Y              ; $85A4
    PLA                        ; $85A6
    PLA                        ; $85A7
    RTS                        ; $85A8
    .byte $20,$E7,$85
    LDY $0040                  ; $85AC
    LDA ($003E),Y              ; $85AE
    TAX                        ; $85B0
    INY                        ; $85B1
    LDA ($003E),Y              ; $85B2
    INY                        ; $85B4
    STY $0040                  ; $85B5
    LDY #$07                   ; $85B7
    STA ($003C),Y              ; $85B9
    DEY                        ; $85BB
    DEY                        ; $85BC
    TXA                        ; $85BD
    STA ($003C),Y              ; $85BE
    LDY $0040                  ; $85C0
    LDA ($003E),Y              ; $85C2
    TAX                        ; $85C4
