; ============================================================
; code_data.s - bank12 inline data + routines
; ============================================================

    STA $07BF,X                ; $84A3
    .byte $A6,$F3
    DEX                        ; $84A8
    LDA #$00                   ; $84A9
    STA $07F4,X                ; $84AB
    LDA $07EA,X                ; $84AE
    BNE $84C0                  ; $84B1
    LDX $00F2                  ; $84B3
    LDA #$01                   ; $84B5
    STA $0709,X                ; $84B7
    LDA #$00                   ; $84BA
    LDY #$04                   ; $84BC
    STA ($00F0),Y              ; $84BE
    LDX $00F2                  ; $84C0
    LDA $0708,X                ; $84C2
    STA $0707,X                ; $84C5
    RTS                        ; $84C8
    AND #$1F                   ; $84C9
    ASL                        ; $84CB
    TAX                        ; $84CC
    LDA $84DA,X                ; $84CD
    STA $00F6                  ; $84D0
    LDA $84DB,X                ; $84D2
    STA $00F7                  ; $84D5
    JMP ($00F6)                ; $84D7
    .byte $44,$85,$07,$87,$41,$86,$5F,$85,$17,$86,$70,$86,$07,$87,$07,$87
    .byte $78,$85,$85,$85,$AF,$85,$C6,$85,$EF,$85,$81,$86,$07,$87,$90,$86
    .byte $09,$87,$07,$87,$1A,$85,$3B,$85,$32,$85,$07,$87,$07,$87,$07,$87
    .byte $07,$87,$99,$86,$B8,$86,$D7,$86,$07,$87,$07,$87,$F6,$86,$55,$86
    .byte $A9,$00
    STA $07F2                  ; $851C
    STA $0700                  ; $851F
    STA $0701                  ; $8522
    STA $0702                  ; $8525
    STA $0703                  ; $8528
    STA $0704                  ; $852B
    STA $0705                  ; $852E
    RTS                        ; $8531
    .byte $A6,$F3
    DEX                        ; $8534
    LDA #$00                   ; $8535
    STA $07EA,X                ; $8537
    RTS                        ; $853A
    .byte $A6,$F3
    DEX                        ; $853D
    LDA #$0F                   ; $853E
    STA $07EA,X                ; $8540
    RTS                        ; $8543
    .byte $B1,$F4
    INY                        ; $8546
    STY $00F6                  ; $8547
    ASL                        ; $8549
    TAX                        ; $854A
    LDA $8754,X                ; $854B
    TAY                        ; $854E
    LDA $8755,X                ; $854F
    TAX                        ; $8552
    TYA                        ; $8553
    LDY #$02                   ; $8554
    STA ($00F0),Y              ; $8556
    INY                        ; $8558
    TXA                        ; $8559
    STA ($00F0),Y              ; $855A
    LDY $00F6                  ; $855C
    RTS                        ; $855E
    .byte $B1,$F4
    INY                        ; $8561
    STY $00F6                  ; $8562
    LDY $07DF                  ; $8564
    BNE $8575                  ; $8567
    STA $00F7                  ; $8569
    LDA #$F0                   ; $856B
    LDY #$05                   ; $856D
    AND ($00F0),Y              ; $856F
    ORA $00F7                  ; $8571
    STA ($00F0),Y              ; $8573
    LDY $00F6                  ; $8575
    RTS                        ; $8577
    .byte $B1,$F4
    INY                        ; $857A
    TAX                        ; $857B
    LDA ($00F4),Y              ; $857C
    STX $00F4                  ; $857E
    STA $00F5                  ; $8580
    LDY #$00                   ; $8582
    RTS                        ; $8584
    .byte $B1,$F4
    INY                        ; $8587
    TAX                        ; $8588
    LDA ($00F4),Y              ; $8589
    INY                        ; $858B
    PHA                        ; $858C
    TYA                        ; $858D
    PHA                        ; $858E
    LDY #$09                   ; $858F
    LDA ($00F0),Y              ; $8591
    TAY                        ; $8593
    PLA                        ; $8594
    CLC                        ; $8595
    ADC $00F4                  ; $8596
    STA ($00F0),Y              ; $8598
    DEY                        ; $859A
    LDA #$00                   ; $859B
    ADC $00F5                  ; $859D
    STA ($00F0),Y              ; $859F
    DEY                        ; $85A1
    TYA                        ; $85A2
    LDY #$09                   ; $85A3
    STA ($00F0),Y              ; $85A5
    STX $00F4                  ; $85A7
    PLA                        ; $85A9
    STA $00F5                  ; $85AA
    LDY #$00                   ; $85AC
    RTS                        ; $85AE
    .byte $A0,$09
    LDA ($00F0),Y              ; $85B1
    TAY                        ; $85B3
    INY                        ; $85B4
    LDA ($00F0),Y              ; $85B5
    INY                        ; $85B7
    STA $00F5                  ; $85B8
    LDA ($00F0),Y              ; $85BA
    STA $00F4                  ; $85BC
    TYA                        ; $85BE
    LDY #$09                   ; $85BF
    STA ($00F0),Y              ; $85C1
    LDY #$00                   ; $85C3
    RTS                        ; $85C5
    .byte $B1,$F4
    INY                        ; $85C8
    TAX                        ; $85C9
    TYA                        ; $85CA
    PHA                        ; $85CB
    LDY #$09                   ; $85CC
    LDA ($00F0),Y              ; $85CE
    TAY                        ; $85D0
    PLA                        ; $85D1
    CLC                        ; $85D2
    ADC $00F4                  ; $85D3
    STA $00F4                  ; $85D5
    STA ($00F0),Y              ; $85D7
    DEY                        ; $85D9
    LDA #$00                   ; $85DA
    ADC $00F5                  ; $85DC
    STA $00F5                  ; $85DE
    STA ($00F0),Y              ; $85E0
    DEY                        ; $85E2
    TXA                        ; $85E3
    STA ($00F0),Y              ; $85E4
    DEY                        ; $85E6
    TYA                        ; $85E7
    LDY #$09                   ; $85E8
    STA ($00F0),Y              ; $85EA
    LDY #$00                   ; $85EC
    RTS                        ; $85EE
    .byte $84,$F6
    LDY #$09                   ; $85F1
    LDA ($00F0),Y              ; $85F3
    TAY                        ; $85F5
    INY                        ; $85F6
    LDA ($00F0),Y              ; $85F7
    SEC                        ; $85F9
    SBC #$01                   ; $85FA
    STA ($00F0),Y              ; $85FC
    BEQ $860D                  ; $85FE
    INY                        ; $8600
    LDA ($00F0),Y              ; $8601
    INY                        ; $8603
    STA $00F5                  ; $8604
    LDA ($00F0),Y              ; $8606
    STA $00F4                  ; $8608
    LDY #$00                   ; $860A
    RTS                        ; $860C
    INY                        ; $860D
    INY                        ; $860E
    TYA                        ; $860F
    LDY #$09                   ; $8610
    STA ($00F0),Y              ; $8612
    LDY $00F6                  ; $8614
    RTS                        ; $8616
    .byte $84,$F6
    LDY #$05                   ; $8619
    LDA ($00F0),Y              ; $861B
    ORA #$10                   ; $861D
    STA ($00F0),Y              ; $861F
    LDX $00F3                  ; $8621
    DEX                        ; $8623
    TXA                        ; $8624
    EOR #$07                   ; $8625
    ASL                        ; $8627
    ASL                        ; $8628
    AND #$0F                   ; $8629
    TAX                        ; $862B
    LDY $00F6                  ; $862C
    LDA ($00F4),Y              ; $862E
    STA $4001,X                ; $8630
    INY                        ; $8633
    LDX $00F3                  ; $8634
    DEX                        ; $8636
    TXA                        ; $8637
    AND #$03                   ; $8638
    TAX                        ; $863A
    LDA #$00                   ; $863B
    STA $07E4,X                ; $863D
    RTS                        ; $8640
    .byte $B1,$F4
    INY                        ; $8643
    STY $00F6                  ; $8644
    STA $00F7                  ; $8646
    LDY #$05                   ; $8648
    LDA #$3F                   ; $864A
    AND ($00F0),Y              ; $864C
    ORA $00F7                  ; $864E
    STA ($00F0),Y              ; $8650
    LDY $00F6                  ; $8652
    RTS                        ; $8654
    .byte $A9,$7F
    AND $0706                  ; $8657
    STA $0706                  ; $865A
    LDX $00F3                  ; $865D
    DEX                        ; $865F
    TXA                        ; $8660
    EOR #$07                   ; $8661
    ASL                        ; $8663
    ASL                        ; $8664
    AND #$0F                   ; $8665
    TAX                        ; $8667
    LDA #$30                   ; $8668
    STA $4000,X                ; $866A
    PLA                        ; $866D
    PLA                        ; $866E
    RTS                        ; $866F
    .byte $A6,$F3
    DEX                        ; $8672
    LDA ($00F4),Y              ; $8673
    INY                        ; $8675
    ASL                        ; $8676
    BCS $867C                  ; $8677
    STA $07F4,X                ; $8679
    LSR                        ; $867C
    STA $07A7,X                ; $867D
    RTS                        ; $8680
    .byte $A6,$F3
    DEX                        ; $8683
    LDA ($00F4),Y              ; $8684
    STA $07AF,X                ; $8686
    LDA #$00                   ; $8689
    STA $07C7,X                ; $868B
    INY                        ; $868E
    RTS                        ; $868F
    .byte $A6,$F3
    DEX                        ; $8692
    LDA #$00                   ; $8693
    STA $07AF,X                ; $8695
    RTS                        ; $8698
    .byte $A9,$0F
    STA $4015                  ; $869B
    LDA $07E8                  ; $869E
    BNE $86B7                  ; $86A1
    LDA #$0F                   ; $86A3
    STA $4010                  ; $86A5
    LDA #$00                   ; $86A8
    STA $4012                  ; $86AA
    LDA #$0C                   ; $86AD
    STA $4013                  ; $86AF
    LDA #$1F                   ; $86B2
    STA $4015                  ; $86B4
    RTS                        ; $86B7
    .byte $A9,$0F
    STA $4015                  ; $86BA
    LDA $07E8                  ; $86BD
    BNE $86D6                  ; $86C0
    LDA #$0F                   ; $86C2
    STA $4010                  ; $86C4
    LDA #$03                   ; $86C7
    STA $4012                  ; $86C9
    LDA #$20                   ; $86CC
    STA $4013                  ; $86CE
    LDA #$1F                   ; $86D1
    STA $4015                  ; $86D3
    RTS                        ; $86D6
    .byte $A9,$0F
    STA $4015                  ; $86D9
    LDA $07E8                  ; $86DC
    BNE $86F5                  ; $86DF
    LDA #$0F                   ; $86E1
    STA $4010                  ; $86E3
    LDA #$0B                   ; $86E6
    STA $4012                  ; $86E8
    LDA #$13                   ; $86EB
    STA $4013                  ; $86ED
    LDA #$1F                   ; $86F0
    STA $4015                  ; $86F2
    RTS                        ; $86F5
