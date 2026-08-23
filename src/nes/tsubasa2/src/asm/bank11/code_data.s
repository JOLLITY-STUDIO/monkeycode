; ============================================================
; code_data.s - bank11 inline data + routines
; ============================================================

    STA $005C                  ; $849E
    RTS                        ; $84A0
    .byte $A2,$02
    CMP #$80                   ; $84A3
    BCS $84AD                  ; $84A5
    DEX                        ; $84A7
    CMP #$40                   ; $84A8
    BCS $84AD                  ; $84AA
    DEX                        ; $84AC
    LDY #$74                   ; $84AD
    AND #$3F                   ; $84AF
    CMP #$20                   ; $84B1
    BCS $84BB                  ; $84B3
    LDY #$E4                   ; $84B5
    TXA                        ; $84B7
    EOR #$02                   ; $84B8
    TAX                        ; $84BA
    LDA $0020                  ; $84BB
    AND #$FC                   ; $84BD
    STA $0020                  ; $84BF
    TXA                        ; $84C1
    ORA $0020                  ; $84C2
    STA $0020                  ; $84C4
    STY $004B                  ; $84C6
    LDA $05CB                  ; $84C8
    STA $046B                  ; $84CB
    RTS                        ; $84CE
    JSR $84F4                  ; $84CF
    STX $05DE                  ; $84D2
    STY $05DF                  ; $84D5
    RTS                        ; $84D8
    JSR $84F4                  ; $84D9
    BIT $052A                  ; $84DC
    BVC $84ED                  ; $84DF
    TXA                        ; $84E1
    EOR #$FF                   ; $84E2
    TAX                        ; $84E4
    TYA                        ; $84E5
    EOR #$FF                   ; $84E6
    TAY                        ; $84E8
    INX                        ; $84E9
    BNE $84ED                  ; $84EA
    INY                        ; $84EC
    STX $05DE                  ; $84ED
    STY $05DF                  ; $84F0
    RTS                        ; $84F3
    LDY #$02                   ; $84F4
    LDA ($0052),Y              ; $84F6
    TAX                        ; $84F8
    INY                        ; $84F9
    LDA ($0052),Y              ; $84FA
    TAY                        ; $84FC
    CMP #$80                   ; $84FD
    BEQ $8502                  ; $84FF
    RTS                        ; $8501
    LDA $061D                  ; $8502
    STA $003A                  ; $8505
    LDA $061C                  ; $8507
    ASL                        ; $850A
    ROL $003A                  ; $850B
    ASL                        ; $850D
    ROL $003A                  ; $850E
    ASL                        ; $8510
    ROL $003A                  ; $8511
    CPX #$01                   ; $8513
    BEQ $851A                  ; $8515
    ASL                        ; $8517
    ROL $003A                  ; $8518
    LDY $003A                  ; $851A
    CLC                        ; $851C
    ADC #$C0                   ; $851D
    TAX                        ; $851F
    TYA                        ; $8520
    ADC #$00                   ; $8521
    TAY                        ; $8523
    RTS                        ; $8524
    STY $05C8                  ; $8525
    PHA                        ; $8528
    TAX                        ; $8529
    LDA #$EE                   ; $852A
    STA $0054                  ; $852C
    LDA #$86                   ; $852E
    STA $0055                  ; $8530
    TXA                        ; $8532
    ASL                        ; $8533
    BCC $8538                  ; $8534
    INC $0055                  ; $8536
    TAY                        ; $8538
    LDA ($0054),Y              ; $8539
    ORA #$80                   ; $853B
    STA $0526                  ; $853D
    INY                        ; $8540
    LDA ($0054),Y              ; $8541
    STA $0527                  ; $8543
    PLA                        ; $8546
    JSR $86D3                  ; $8547
    LDX #$00                   ; $854A
    STX $0054                  ; $854C
    LSR                        ; $854E
    ROR $0054                  ; $854F
    LSR                        ; $8551
    ROR $0054                  ; $8552
    LSR                        ; $8554
    ROR $0054                  ; $8555
    TAX                        ; $8557
    LDA $0054                  ; $8558
    CLC                        ; $855A
    ADC #$64                   ; $855B
    STA $0054                  ; $855D
    TXA                        ; $855F
    ADC #$8B                   ; $8560
    STA $0055                  ; $8562
    LDA #$20                   ; $8564
    STA $05C9                  ; $8566
    LDA $05CA                  ; $8569
    PHA                        ; $856C
    .byte $A9,$01
    JSR $C515                  ; $856F
    LDA $0515                  ; $8572
    BNE $856D                  ; $8575
    LDA #$01                   ; $8577
    STA $0515                  ; $8579
    LDA #$00                   ; $857C
    STA $05C7                  ; $857E
    LDA #$03                   ; $8581
    TAX                        ; $8583
    PLA                        ; $8584
    STA $05CA                  ; $8585
    PHA                        ; $8588
    TXA                        ; $8589
    PHA                        ; $858A
    LDA #$20                   ; $858B
    SEC                        ; $858D
    SBC $05C9                  ; $858E
    TAY                        ; $8591
    LDA ($0054),Y              ; $8592
    LDX $05C7                  ; $8594
    LDY $05C8                  ; $8597
    JSR $85C2                  ; $859A
    STX $05C7                  ; $859D
    INC $05C8                  ; $85A0
    PLA                        ; $85A3
    DEC $05C9                  ; $85A4
    BEQ $85B6                  ; $85A7
    SEC                        ; $85A9
    SBC #$01                   ; $85AA
    BNE $8583                  ; $85AC
    LDA #$80                   ; $85AE
    STA $0515                  ; $85B0
    JMP $856D                  ; $85B3
    PLA                        ; $85B6
    LDA #$80                   ; $85B7
    STA $0515                  ; $85B9
    LDA #$01                   ; $85BC
    JSR $C515                  ; $85BE
    RTS                        ; $85C1
    STA $0056                  ; $85C2
    TYA                        ; $85C4
    AND #$07                   ; $85C5
    ASL                        ; $85C7
    ASL                        ; $85C8
    STA $04A6,X                ; $85C9
    LDA #$00                   ; $85CC
    STA $04A7,X                ; $85CE
    TYA                        ; $85D1
    AND #$38                   ; $85D2
    ASL                        ; $85D4
    ASL                        ; $85D5
    ASL                        ; $85D6
    ROL $04A7,X                ; $85D7
    ASL                        ; $85DA
    ROL $04A7,X                ; $85DB
    ORA $04A6,X                ; $85DE
    STA $04A6,X                ; $85E1
    TYA                        ; $85E4
    AND #$C0                   ; $85E5
    LSR                        ; $85E7
    LSR                        ; $85E8
    LSR                        ; $85E9
    LSR                        ; $85EA
    ORA #$20                   ; $85EB
    ORA $04A7,X                ; $85ED
    STA $04A7,X                ; $85F0
    STA $04AE,X                ; $85F3
    STA $04B5,X                ; $85F6
    STA $04BC,X                ; $85F9
    LDA $04A6,X                ; $85FC
    CLC                        ; $85FF
    ADC #$20                   ; $8600
    STA $04AD,X                ; $8602
    ADC #$20                   ; $8605
    STA $04B4,X                ; $8607
    ADC #$20                   ; $860A
    STA $04BB,X                ; $860C
    TYA                        ; $860F
    AND #$3F                   ; $8610
    ORA #$C0                   ; $8612
    STA $04C2,X                ; $8614
    TYA                        ; $8617
    AND #$C0                   ; $8618
    LSR                        ; $861A
    LSR                        ; $861B
    LSR                        ; $861C
    LSR                        ; $861D
    ORA #$23                   ; $861E
    STA $04C3,X                ; $8620
    LDA #$04                   ; $8623
    STA $04A5,X                ; $8625
    STA $04AC,X                ; $8628
    STA $04B3,X                ; $862B
    STA $04BA,X                ; $862E
    LDA #$01                   ; $8631
    STA $04C1,X                ; $8633
    TYA                        ; $8636
    PHA                        ; $8637
    TXA                        ; $8638
    PHA                        ; $8639
    LDY $0056                  ; $863A
    LDA #$E4                   ; $863C
    STA $0056                  ; $863E
    LDA $05CA                  ; $8640
    CLC                        ; $8643
    ADC #$9B                   ; $8644
    STA $0057                  ; $8646
    LDA ($0056),Y              ; $8648
    STA $04C4,X                ; $864A
    LDA $05CA                  ; $864D
    STA $003A                  ; $8650
    LDA #$00                   ; $8652
    STA $0056                  ; $8654
    TYA                        ; $8656
    LSR $003A                  ; $8657
    ROR                        ; $8659
    ROR $0056                  ; $865A
    LSR $003A                  ; $865C
    ROR                        ; $865E
    ROR $0056                  ; $865F
    LSR                        ; $8661
    ROR $0056                  ; $8662
    LSR                        ; $8664
    ROR $0056                  ; $8665
    PHA                        ; $8667
    AND #$1F                   ; $8668
    ORA #$A0                   ; $866A
    STA $0057                  ; $866C
    PLA                        ; $866E
    AND #$20                   ; $866F
    PHP                        ; $8671
    LDA #$12                   ; $8672
    PLP                        ; $8674
    BEQ $8679                  ; $8675
    LDA #$13                   ; $8677
    PHA                        ; $8679
    LDA $0022                  ; $867A
    ORA #$07                   ; $867C
    STA $0023                  ; $867E
    STA $8000                  ; $8680
    PLA                        ; $8683
    STA a: $0025               ; $8684
    STA $8001                  ; $8687
    LDA #$04                   ; $868A
    LDY #$00                   ; $868C
    PHA                        ; $868E
    LDA #$04                   ; $868F
    PHA                        ; $8691
    LDA ($0056),Y              ; $8692
    STA $04A8,X                ; $8694
    INX                        ; $8697
    INY                        ; $8698
    PLA                        ; $8699
    SEC                        ; $869A
    SBC #$01                   ; $869B
    BNE $8691                  ; $869D
    INX                        ; $869F
    INX                        ; $86A0
    INX                        ; $86A1
    PLA                        ; $86A2
    SEC                        ; $86A3
    SBC #$01                   ; $86A4
    BNE $868E                  ; $86A6
    PLA                        ; $86A8
    TAX                        ; $86A9
    LDA #$00                   ; $86AA
    STA $04C5,X                ; $86AC
    PLA                        ; $86AF
    AND #$3F                   ; $86B0
    CMP #$38                   ; $86B2
    BCS $86BC                  ; $86B4
    TXA                        ; $86B6
    CLC                        ; $86B7
    ADC #$20                   ; $86B8
    TAX                        ; $86BA
    RTS                        ; $86BB
    TXA                        ; $86BC
    TAY                        ; $86BD
    CLC                        ; $86BE
    ADC #$12                   ; $86BF
    TAX                        ; $86C1
    LDA #$05                   ; $86C2
    PHA                        ; $86C4
    LDA $04C1,Y                ; $86C5
    STA $04B3,Y                ; $86C8
    INY                        ; $86CB
    PLA                        ; $86CC
    SEC                        ; $86CD
    SBC #$01                   ; $86CE
    BNE $86C4                  ; $86D0
    RTS                        ; $86D2
    PHA                        ; $86D3
    AND #$03                   ; $86D4
    TAX                        ; $86D6
    PLA                        ; $86D7
    PHA                        ; $86D8
    LSR                        ; $86D9
    LSR                        ; $86DA
    TAY                        ; $86DB
    LDA $8B42,Y                ; $86DC
    .byte $CA
    BMI $86E7                  ; $86E0
    LSR                        ; $86E2
    LSR                        ; $86E3
    JMP $86DF                  ; $86E4
    AND #$03                   ; $86E7
    STA $05CA                  ; $86E9
    PLA                        ; $86EC
    RTS                        ; $86ED
