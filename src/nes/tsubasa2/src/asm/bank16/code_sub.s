; ============================================================
; code_sub.s - bank16 sub routines
; ============================================================

    INC $0616                  ; $833C
    RTS                        ; $833F
    .byte $20,$50,$83
    JSR $835C                  ; $8343
    LDA #$02                   ; $8346
    STA $043C                  ; $8348
    RTS                        ; $834B
    .byte $20,$50,$83
    RTS                        ; $834F
    LDA $05FB                  ; $8350
    EOR #$0B                   ; $8353
    JSR $C548                  ; $8355
    STA $0442                  ; $8358
    RTS                        ; $835B
    LDA $05FB                  ; $835C
    JSR $C548                  ; $835F
    STA $0441                  ; $8362
    RTS                        ; $8365
    .byte $AE,$3B,$04
    RTS                        ; $8369
    .byte $AE,$12,$06
    RTS                        ; $836D
    .byte $A2,$00
    LDA $043B                  ; $8370
    CMP #$01                   ; $8373
    BEQ $837B                  ; $8375
    JSR $8677                  ; $8377
    INX                        ; $837A
    RTS                        ; $837B
    .byte $AE,$12,$06
    RTS                        ; $837F
    .byte $AE,$12,$06
    RTS                        ; $8383
    .byte $20,$8B,$83
    LDX $0612                  ; $8387
    RTS                        ; $838A
    LDA $0612                  ; $838B
    JSR $C509                  ; $838E
    .byte $97,$83,$98,$83,$98,$83,$60,$AD,$FB,$05
    EOR #$0B                   ; $839B
    JSR $C548                  ; $839D
    STA $0442                  ; $83A0
    RTS                        ; $83A3
    .byte $AE,$12,$06
    RTS                        ; $83A7
    .byte $AC,$3D,$04
    LDX $83AF,Y                ; $83AB
    RTS                        ; $83AE
    .byte $FF,$FF,$00,$FF,$01,$AC,$3B,$04
    LDX $83BB,Y                ; $83B7
    RTS                        ; $83BA
    .byte $FF,$00,$FF,$FF,$01,$FF,$02,$AE,$12,$06
    RTS                        ; $83C5
    .byte $AD,$41,$04
    JSR $8207                  ; $83C9
    CMP #$1C                   ; $83CC
    BEQ $83D5                  ; $83CE
    CMP #$48                   ; $83D0
    BEQ $83D5                  ; $83D2
    INX                        ; $83D4
    RTS                        ; $83D5
    .byte $AD,$3E,$04,$29,$7F,$AA,$60,$AD,$3E,$04,$29,$7F,$AA,$60,$AD,$3E
    .byte $04
    AND #$7F                   ; $83E7
    TAX                        ; $83E9
    RTS                        ; $83EA
    .byte $AD,$3C,$04
    AND #$7F                   ; $83EE
    TAX                        ; $83F0
    JSR $8211                  ; $83F1
    RTS                        ; $83F4
    .byte $A9,$01
    JSR $8211                  ; $83F7
    LDA $043C                  ; $83FA
    AND #$7F                   ; $83FD
    TAX                        ; $83FF
    RTS                        ; $8400
    .byte $AD,$3C,$04
    AND #$7F                   ; $8404
    TAX                        ; $8406
    JMP $8211                  ; $8407
    .byte $AE,$3B,$04
    RTS                        ; $840D
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8411
    JSR $8207                  ; $8413
    LDX #$02                   ; $8416
    CMP #$74                   ; $8418
    BEQ $842A                  ; $841A
    DEX                        ; $841C
    CMP #$22                   ; $841D
    BEQ $842A                  ; $841F
    CMP #$39                   ; $8421
    BEQ $842A                  ; $8423
    CMP #$4C                   ; $8425
    BEQ $842A                  ; $8427
    DEX                        ; $8429
    RTS                        ; $842A
    .byte $A2,$00
    LDA $061C                  ; $842D
    CMP #$60                   ; $8430
    BCC $8435                  ; $8432
    INX                        ; $8434
    RTS                        ; $8435
    .byte $AE,$FB,$05
    BEQ $843D                  ; $8439
    LDX #$01                   ; $843B
    RTS                        ; $843D
    .byte $AE,$2A,$00
    RTS                        ; $8441
    .byte $AD,$41,$04,$20,$07,$82,$C9,$60,$D0,$01,$E8,$60,$AE,$47,$04
    BNE $8456                  ; $8451
    INC $0447                  ; $8453
    RTS                        ; $8456
    .byte $A2,$00
    LDA a: $002B               ; $8459
    CMP #$22                   ; $845C
    BNE $847D                  ; $845E
    LDY #$00                   ; $8460
    LDA a: $0028               ; $8462
    SEC                        ; $8465
    SBC a: $0029               ; $8466
    BCC $847A                  ; $8469
    BEQ $847A                  ; $846B
    LDY #$80                   ; $846D
    LDA #$CA                   ; $846F
    STA $03FE                  ; $8471
    LDA $05FB                  ; $8474
    BNE $847A                  ; $8477
    INX                        ; $8479
    STY $03FD                  ; $847A
    RTS                        ; $847D
    .byte $AD,$42,$04
    JSR $8207                  ; $8481
    TAY                        ; $8484
    LDX $86F4,Y                ; $8485
    BEQ $8497                  ; $8488
    LDA $0441                  ; $848A
    JSR $8207                  ; $848D
    TAY                        ; $8490
    LDX $86F4,Y                ; $8491
    JSR $8211                  ; $8494
    RTS                        ; $8497
    .byte $AD,$41,$04
    JSR $8207                  ; $849B
    TAY                        ; $849E
    LDX $86F4,Y                ; $849F
    BEQ $84B1                  ; $84A2
    LDA $0442                  ; $84A4
    JSR $8207                  ; $84A7
    TAY                        ; $84AA
    LDX $86F4,Y                ; $84AB
    JSR $8211                  ; $84AE
    RTS                        ; $84B1
    .byte $A2,$00
    BIT $043E                  ; $84B4
    BPL $84C6                  ; $84B7
    LDA $0442                  ; $84B9
    JSR $8207                  ; $84BC
    TAY                        ; $84BF
    LDX $86F4,Y                ; $84C0
    JSR $8211                  ; $84C3
    RTS                        ; $84C6
    .byte $AD,$41,$04
    LDX $05FB                  ; $84CA
    BEQ $84D2                  ; $84CD
    LDA $0442                  ; $84CF
    JSR $C50C                  ; $84D2
    LDX #$00                   ; $84D5
    LDY #$01                   ; $84D7
    LDA ($0034),Y              ; $84D9
    SEC                        ; $84DB
    SBC #$64                   ; $84DC
    INY                        ; $84DE
    LDA ($0034),Y              ; $84DF
    SBC #$00                   ; $84E1
    BCS $84E6                  ; $84E3
    INX                        ; $84E5
    RTS                        ; $84E6
    .byte $AE,$00,$06
    BEQ $84EE                  ; $84EA
    LDX #$01                   ; $84EC
    RTS                        ; $84EE
    .byte $A2,$00
    LDA $043C                  ; $84F1
    AND #$7F                   ; $84F4
    CMP #$13                   ; $84F6
    BNE $84FB                  ; $84F8
    INX                        ; $84FA
    RTS                        ; $84FB
    .byte $20,$51,$C5
    LDX #$00                   ; $84FF
    LDY #$07                   ; $8501
    LDA ($0034),Y              ; $8503
    CMP #$18                   ; $8505
    BCC $850A                  ; $8507
    INX                        ; $8509
    RTS                        ; $850A
    .byte $A2,$00
    BIT $043E                  ; $850D
    BPL $8526                  ; $8510
    LDA $0442                  ; $8512
    JSR $8207                  ; $8515
    CMP #$0F                   ; $8518
    BEQ $8525                  ; $851A
    CMP #$21                   ; $851C
    BEQ $8524                  ; $851E
    CMP #$40                   ; $8520
    BNE $8526                  ; $8522
    INX                        ; $8524
    INX                        ; $8525
    RTS                        ; $8526
    .byte $AD,$41,$04
    JSR $8207                  ; $852A
    LDX #$02                   ; $852D
    CMP #$60                   ; $852F
    BEQ $8539                  ; $8531
    DEX                        ; $8533
    CMP #$01                   ; $8534
    BEQ $8539                  ; $8536
    DEX                        ; $8538
    RTS                        ; $8539
    .byte $AD,$41,$04
    JSR $8207                  ; $853D
    CMP #$15                   ; $8540
    BEQ $8545                  ; $8542
    INX                        ; $8544
    RTS                        ; $8545
    .byte $AD,$41,$04
    JSR $8207                  ; $8549
    CMP #$1B                   ; $854C
    BEQ $8555                  ; $854E
    CMP #$4A                   ; $8550
    BEQ $8555                  ; $8552
    INX                        ; $8554
    RTS                        ; $8555
    .byte $AD,$3E,$04
    AND #$7F                   ; $8559
    TAX                        ; $855B
    BEQ $856B                  ; $855C
    LDA $0442                  ; $855E
    JSR $8207                  ; $8561
    TAY                        ; $8564
    LDX $876A,Y                ; $8565
    JSR $8211                  ; $8568
    RTS                        ; $856B
    .byte $AE,$4E,$04
    RTS                        ; $856F
    .byte $AD,$3D,$04
    AND #$0F                   ; $8573
    TAY                        ; $8575
    LDX $857A,Y                ; $8576
    RTS                        ; $8579
    .byte $FF,$FF,$00,$01,$FF,$02,$AD,$3E,$04
    AND #$7F                   ; $8583
    TAX                        ; $8585
    RTS                        ; $8586
    .byte $AD,$3E,$04
    AND #$7F                   ; $858A
    TAX                        ; $858C
    BEQ $8591                  ; $858D
    LDX #$01                   ; $858F
    RTS                        ; $8591
    .byte $AD,$41,$04
    JSR $8207                  ; $8595
    CMP #$1A                   ; $8598
    BEQ $85A1                  ; $859A
    CMP #$41                   ; $859C
    BEQ $85A1                  ; $859E
    INX                        ; $85A0
    RTS                        ; $85A1
    .byte $AD,$41,$04
    JSR $8207                  ; $85A5
    CMP #$1D                   ; $85A8
    BEQ $85B1                  ; $85AA
    CMP #$4B                   ; $85AC
    BEQ $85B1                  ; $85AE
    INX                        ; $85B0
    RTS                        ; $85B1
    .byte $AD,$41,$04
    JSR $8207                  ; $85B5
    CMP #$3E                   ; $85B8
    BEQ $85BD                  ; $85BA
    INX                        ; $85BC
    RTS                        ; $85BD
    .byte $AD,$41,$04
    JSR $8207                  ; $85C1
    CMP #$2B                   ; $85C4
    BEQ $85C9                  ; $85C6
    INX                        ; $85C8
    RTS                        ; $85C9
    .byte $AD,$41,$04
    JSR $8207                  ; $85CD
    CMP #$20                   ; $85D0
    BEQ $85D9                  ; $85D2
    CMP #$45                   ; $85D4
    BEQ $85D9                  ; $85D6
    INX                        ; $85D8
    RTS                        ; $85D9
    .byte $AD,$41,$04
    JSR $8207                  ; $85DD
    CMP #$11                   ; $85E0
    BEQ $85E5                  ; $85E2
    INX                        ; $85E4
    RTS                        ; $85E5
    .byte $AD,$3B,$04
    SEC                        ; $85E9
    SBC #$07                   ; $85EA
    STA $003B                  ; $85EC
    ASL                        ; $85EE
    ADC $003B                  ; $85EF
    STA $003B                  ; $85F1
    LDA $043D                  ; $85F3
    SEC                        ; $85F6
    SBC #$07                   ; $85F7
    CLC                        ; $85F9
    ADC $003B                  ; $85FA
    TAX                        ; $85FC
    RTS                        ; $85FD
    .byte $AE,$12,$06
    RTS                        ; $8601
    .byte $AD,$41,$04
    JSR $8207                  ; $8605
    TAY                        ; $8608
    LDX $86F4,Y                ; $8609
    JSR $8211                  ; $860C
    RTS                        ; $860F
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8613
    JSR $8207                  ; $8615
    LDX #$04                   ; $8618
    CMP $8622,X                ; $861A
    BEQ $8622                  ; $861D
    DEX                        ; $861F
    BNE $861A                  ; $8620
    RTS                        ; $8622
    .byte $02,$0F,$21,$22,$AD,$E2,$00
    AND #$01                   ; $862A
    TAX                        ; $862C
    RTS                        ; $862D
    .byte $AC,$3D,$04
    LDX $8635,Y                ; $8631
    RTS                        ; $8634
    .byte $FF,$FF,$00,$FF,$01,$02,$AD,$3D,$04
    AND #$0F                   ; $863E
    TAY                        ; $8640
    LDX $8645,Y                ; $8641
    RTS                        ; $8644
    .byte $FF,$FF,$FF,$00,$01,$A2,$00
    LDA $0612                  ; $864C
    CMP #$03                   ; $864F
    BCS $8676                  ; $8651
    LDA $0444                  ; $8653
    JSR $8138                  ; $8656
    CMP #$80                   ; $8659
    BCC $8676                  ; $865B
    LDA $05FB                  ; $865D
    EOR #$0B                   ; $8660
    JSR $C50C                  ; $8662
    LDY #$05                   ; $8665
    LDA ($0034),Y              ; $8667
    CLC                        ; $8669
    ADC #$00                   ; $866A
    CMP #$80                   ; $866C
    BCC $8672                  ; $866E
    .byte $A9,$7F
    STA ($0034),Y              ; $8672
    LDX #$01                   ; $8674
    RTS                        ; $8676
