; ============================================================
; code_sub.s - bank24 sub routines
; ============================================================

    JMP $863C                  ; $848A
    .byte $AD,$00,$06
    JMP $86B2                  ; $8490
    .byte $AD,$01,$06
    JMP $8653                  ; $8496
    .byte $AD,$02,$06
    JMP $8653                  ; $849C
    .byte $AD,$03,$06
    JMP $8653                  ; $84A2
    .byte $AD,$FC,$05
    JMP $8653                  ; $84A8
    .byte $AE,$3D,$04
    LDA $84C7,X                ; $84AE
    BEQ $84C6                  ; $84B1
    BIT $043E                  ; $84B3
    BPL $84BD                  ; $84B6
    LDA #$E6                   ; $84B8
    JSR $863C                  ; $84BA
    LDX $043D                  ; $84BD
    LDA $84C7,X                ; $84C0
    JMP $863C                  ; $84C3
    .byte $60,$E0,$E4,$00,$00,$00,$E0,$E0,$AD,$FB,$05
    EOR #$0B                   ; $84D1
    JMP $8653                  ; $84D3
    .byte $AD,$42,$04
    JMP $8653                  ; $84D9
    .byte $AD,$16,$06
    LSR                        ; $84DF
    CLC                        ; $84E0
    ADC #$34                   ; $84E1
    JMP $8629                  ; $84E3
    .byte $AD,$2A,$00
    JMP $84EF                  ; $84E9
    .byte $AD,$2B,$00,$C9,$24
    BNE $84F5                  ; $84F1
    .byte $A9,$23
    CLC                        ; $84F5
    ADC #$76                   ; $84F6
    JMP $863C                  ; $84F8
    .byte $AD,$41,$04
    JSR $8513                  ; $84FE
    LDA $0442                  ; $8501
    JMP $8534                  ; $8504
    .byte $AD,$42,$04
    JSR $8513                  ; $850A
    LDA $0441                  ; $850D
    JMP $8534                  ; $8510
    JSR $C50C                  ; $8513
    LDY #$00                   ; $8516
    LDA ($0034),Y              ; $8518
    LDX #$00                   ; $851A
    CMP $852C,X                ; $851C
    BEQ $8528                  ; $851F
    INX                        ; $8521
    CPX #$08                   ; $8522
    BNE $851C                  ; $8524
    CLC                        ; $8526
    RTS                        ; $8527
    STX $003D                  ; $8528
    SEC                        ; $852A
    RTS                        ; $852B
    .byte $01,$11,$44,$34,$45,$15,$42,$38,$08
    JSR $C50C                  ; $8535
    PLP                        ; $8538
    BCC $8572                  ; $8539
    LDA $003D                  ; $853B
    ASL                        ; $853D
    TAX                        ; $853E
    LDA $8589,X                ; $853F
    STA $003E                  ; $8542
    LDA $858A,X                ; $8544
    STA $003F                  ; $8547
    LDY #$00                   ; $8549
    LDA ($0034),Y              ; $854B
    TAX                        ; $854D
    LDY #$00                   ; $854E
    LDA ($003E),Y              ; $8550
    BEQ $8572                  ; $8552
    TXA                        ; $8554
    CMP ($003E),Y              ; $8555
    BEQ $855C                  ; $8557
    INY                        ; $8559
    BNE $8550                  ; $855A
    TXA                        ; $855C
    JSR $863C                  ; $855D
    LDA $003D                  ; $8560
    ASL                        ; $8562
    TAX                        ; $8563
    LDA $857A,X                ; $8564
    PHA                        ; $8567
    LDA $8579,X                ; $8568
    JSR $8629                  ; $856B
    PLA                        ; $856E
    JMP $8629                  ; $856F
    LDY #$00                   ; $8572
    LDA ($0034),Y              ; $8574
    JMP $863C                  ; $8576
    .byte $08,$2E,$08,$2E,$08,$2E,$08,$2E,$08,$2E,$0B,$2E,$0B,$2E,$0B,$2E
    .byte $99,$85,$9F,$85,$9F,$85,$A2,$85,$A2,$85,$A5,$85,$A5,$85,$AE,$85
    .byte $44,$41,$45,$4B,$49,$00,$01,$34,$00,$01,$11,$00,$01,$36,$34,$35
    .byte $32,$2E,$30,$31,$00,$11,$15,$00,$A9,$ED
    JMP $863C                  ; $85B3
    .byte $A9,$EE
    JMP $863C                  ; $85B8
    .byte $AC,$E5,$05
    INC $05E5                  ; $85BE
    LDA ($005F),Y              ; $85C1
    PHA                        ; $85C3
    LDA #$7C                   ; $85C4
    JSR $8629                  ; $85C6
    PLA                        ; $85C9
    SEC                        ; $85CA
    SBC #$01                   ; $85CB
    BNE $85C3                  ; $85CD
    RTS                        ; $85CF
    .byte $A9,$EF
    JMP $863C                  ; $85D2
    .byte $60,$A9,$80
    STA $0515                  ; $85D8
    LDA $05E7                  ; $85DB
    CMP $05E8                  ; $85DE
    BNE $85EC                  ; $85E1
    LDA #$00                   ; $85E3
    STA $05E4                  ; $85E5
    LDA #$01                   ; $85E8
    BNE $85F7                  ; $85EA
    INC $05E7                  ; $85EC
    LDY $05E5                  ; $85EF
    INC $05E5                  ; $85F2
    LDA #$01                   ; $85F5
    STA $05E9                  ; $85F7
    PLA                        ; $85FA
    PLA                        ; $85FB
    RTS                        ; $85FC
    .byte $60,$A9,$80,$8D,$15,$05,$AD,$E3,$05,$29,$BF,$8D,$E3,$05,$A9,$01
    .byte $20,$15,$C5,$20,$60,$C5,$2C,$E3,$05,$50,$F3,$AD,$E3,$05,$29,$BF
    .byte $8D,$E3,$05,$60,$A9,$00,$8D,$E3,$05,$68,$68,$60,$20,$24,$C5
    LDX $003A                  ; $862C
    STA $04A8,X                ; $862E
    LDX $003B                  ; $8631
    TYA                        ; $8633
    STA $04A8,X                ; $8634
    INC $003A                  ; $8637
    INC $003B                  ; $8639
    RTS                        ; $863B
    .byte $20,$3C,$C5
    LDA #$00                   ; $863F
    STA $003C                  ; $8641
    LDY $003C                  ; $8643
    LDA ($0030),Y              ; $8645
    CMP #$E0                   ; $8647
    BCS $8652                  ; $8649
    JSR $8629                  ; $864B
    INC $003C                  ; $864E
    BNE $8643                  ; $8650
    RTS                        ; $8652
    .byte $85,$3D
    JSR $C50C                  ; $8655
    LDY #$00                   ; $8658
    LDA ($0034),Y              ; $865A
    BEQ $866B                  ; $865C
    JSR $863C                  ; $865E
    LDA #$08                   ; $8661
    JSR $8629                  ; $8663
    LDA #$2E                   ; $8666
    JMP $8629                  ; $8668
    LDA $003D                  ; $866B
    SEC                        ; $866D
    SBC #$0B                   ; $866E
    ASL                        ; $8670
    ASL                        ; $8671
    TAX                        ; $8672
    LDY #$00                   ; $8673
    LDA $8686,X                ; $8675
    STA $05EE,Y                ; $8678
    INX                        ; $867B
    INY                        ; $867C
    CPY #$04                   ; $867D
    BNE $8675                  ; $867F
    LDA #$00                   ; $8681
    JMP $863C                  ; $8683
    .byte $47,$7D,$CD,$7D,$00,$35,$AF,$2E,$00,$36,$AF,$2E,$00,$37,$AF,$2E
    .byte $00,$38,$AF,$2E,$00,$39,$AF,$2E,$00,$3A,$AF,$2E,$00,$3B,$AF,$2E
    .byte $00,$3C,$AF,$2E,$34,$33,$AF,$2E,$34,$34,$AF,$2E,$18
    ADC #$33                   ; $86B3
    JMP $8629                  ; $86B5
    .byte $0E,$0E,$0E,$0E,$0E,$0E,$0E,$0E,$0E,$12,$12,$12,$12,$12,$12,$12
    .byte $01,$01,$01,$02,$00,$02,$00,$03,$01,$01,$01,$02,$00,$02,$00,$03
    .byte $01,$02,$05,$05,$05,$06,$04,$06,$05,$05,$05,$06,$04,$06,$04,$07
    .byte $70,$22,$B0,$22,$F0,$22,$30,$23,$6B,$22,$AB,$22,$EB,$22,$2B,$23
    .byte $AD
    .byte $32,$05
    BEQ $8722                  ; $86FB
    BPL $871A                  ; $86FD
    AND #$7F                   ; $86FF
    STA $0532                  ; $8701
    BEQ $8722                  ; $8704
    SEC                        ; $8706
    SBC #$01                   ; $8707
    ASL                        ; $8709
    TAX                        ; $870A
    LDA $AD6E,X                ; $870B
    STA $0079                  ; $870E
    LDA $AD6F,X                ; $8710
    STA $007A                  ; $8713
    LDA #$00                   ; $8715
    STA $0533                  ; $8717
    LDA $0533                  ; $871A
    BEQ $8723                  ; $871D
    DEC $0533                  ; $871F
    RTS                        ; $8722
    .byte $A0,$00
    LDA ($0079),Y              ; $8725
    AND #$07                   ; $8727
    TAX                        ; $8729
    LDA ($0079),Y              ; $872A
    LSR                        ; $872C
    LSR                        ; $872D
    LSR                        ; $872E
    BNE $873C                  ; $872F
    CPX #$00                   ; $8731
    BEQ $8765                  ; $8733
    CPX #$01                   ; $8735
    BEQ $876B                  ; $8737
    .byte $C8,$D0,$E9
    STA $0533                  ; $873C
    LDA ($0079),Y              ; $873F
    AND #$07                   ; $8741
    STA $003A                  ; $8743
    INY                        ; $8745
    LDA ($0079),Y              ; $8746
    TAX                        ; $8748
    INY                        ; $8749
    LDA ($0079),Y              ; $874A
    STA $046F,X                ; $874C
    INY                        ; $874F
    DEC $003A                  ; $8750
    BNE $8746                  ; $8752
    TYA                        ; $8754
    CLC                        ; $8755
    ADC $0079                  ; $8756
    STA $0079                  ; $8758
    BCC $875E                  ; $875A
    INC $007A                  ; $875C
    JSR $C533                  ; $875E
    .byte $00,$6C,$04
    RTS                        ; $8764
    LDA #$00                   ; $8765
    STA $0532                  ; $8767
    RTS                        ; $876A
    INY                        ; $876B
    LDA ($0079),Y              ; $876C
    TAX                        ; $876E
    INY                        ; $876F
    LDA ($0079),Y              ; $8770
    STA $007A                  ; $8772
    STX $0079                  ; $8774
    JMP $8723                  ; $8776
    .byte $AD,$34,$05
    BEQ $87A3                  ; $877C
    BPL $879B                  ; $877E
    AND #$7F                   ; $8780
    STA $0534                  ; $8782
    BEQ $87A3                  ; $8785
    SEC                        ; $8787
    SBC #$01                   ; $8788
    ASL                        ; $878A
    TAX                        ; $878B
    LDA $AD1C,X                ; $878C
    STA $007B                  ; $878F
    LDA $AD1D,X                ; $8791
    STA $007C                  ; $8794
    LDA #$00                   ; $8796
    STA $0535                  ; $8798
    LDA $0535                  ; $879B
    BEQ $87A4                  ; $879E
    DEC $0535                  ; $87A0
    RTS                        ; $87A3
    .byte $A0,$00
    LDA ($007B),Y              ; $87A6
    CMP #$F0                   ; $87A8
    BCC $87B7                  ; $87AA
    CMP #$F0                   ; $87AC
    BEQ $87D2                  ; $87AE
    CMP #$F1                   ; $87B0
    BEQ $87D8                  ; $87B2
    .byte $C8,$D0,$EF
    STA $0535                  ; $87B7
    INY                        ; $87BA
    LDA ($007B),Y              ; $87BB
    STA $0490                  ; $87BD
    INY                        ; $87C0
    LDA ($007B),Y              ; $87C1
    STA $0491                  ; $87C3
    INY                        ; $87C6
    TYA                        ; $87C7
    CLC                        ; $87C8
    ADC $007B                  ; $87C9
    STA $007B                  ; $87CB
    BCC $87D1                  ; $87CD
    .byte $E6,$7C
    RTS                        ; $87D1
    .byte $A9,$00,$8D,$34,$05,$60
    INY                        ; $87D8
    LDA ($007B),Y              ; $87D9
    TAX                        ; $87DB
    INY                        ; $87DC
    LDA ($007B),Y              ; $87DD
    STA $007C                  ; $87DF
    STX $007B                  ; $87E1
    JMP $87A4                  ; $87E3
    .byte $AD,$36,$05
    BEQ $8811                  ; $87E9
    BPL $8808                  ; $87EB
    AND #$7F                   ; $87ED
    STA $0536                  ; $87EF
    BEQ $8811                  ; $87F2
    SEC                        ; $87F4
    SBC #$01                   ; $87F5
    ASL                        ; $87F7
    TAX                        ; $87F8
    LDA $AD54,X                ; $87F9
    STA $007D                  ; $87FC
    LDA $AD55,X                ; $87FE
    STA $007E                  ; $8801
    LDA #$00                   ; $8803
    STA $0537                  ; $8805
    LDA $0537                  ; $8808
    BEQ $8815                  ; $880B
    DEC $0537                  ; $880D
    RTS                        ; $8810
    STA $0538                  ; $8811
    RTS                        ; $8814
    .byte $A0,$00
    LDA ($007D),Y              ; $8817
    CMP #$F0                   ; $8819
    BCC $8828                  ; $881B
    CMP #$F0                   ; $881D
    BEQ $883D                  ; $881F
    CMP #$F1                   ; $8821
    BEQ $8843                  ; $8823
    .byte $C8,$D0,$EF
    STA $0537                  ; $8828
    INY                        ; $882B
    LDA ($007D),Y              ; $882C
    STA $0538                  ; $882E
    INY                        ; $8831
    TYA                        ; $8832
    CLC                        ; $8833
    ADC $007D                  ; $8834
    STA $007D                  ; $8836
    BCC $883C                  ; $8838
    .byte $E6,$7E
    RTS                        ; $883C
    .byte $A9,$00,$8D,$36,$05,$60
    INY                        ; $8843
    LDA ($007D),Y              ; $8844
    TAX                        ; $8846
    INY                        ; $8847
    LDA ($007D),Y              ; $8848
    STA $007E                  ; $884A
    STX $007D                  ; $884C
    JMP $8815                  ; $884E
    .byte $A8
    ASL                        ; $8852
    TAX                        ; $8853
    LDA $B3CF,X                ; $8854
    STA $0050                  ; $8857
    LDA $B3D0,X                ; $8859
    STA $0051                  ; $885C
    TYA                        ; $885E
    AND #$03                   ; $885F
    TAX                        ; $8861
    TYA                        ; $8862
    LSR                        ; $8863
    LSR                        ; $8864
    TAY                        ; $8865
    LDA $B3BD,Y                ; $8866
    .byte $CA
    BMI $8871                  ; $886A
    LSR                        ; $886C
    LSR                        ; $886D
    JMP $8869                  ; $886E
    AND #$03                   ; $8871
    STA $05C6                  ; $8873
    ASL                        ; $8876
    ASL                        ; $8877
    ASL                        ; $8878
    ADC $05C6                  ; $8879
    STA $05C6                  ; $887C
    LDA #$00                   ; $887F
    STA $05C5                  ; $8881
    LDA #$01                   ; $8884
    JSR $C515                  ; $8886
    LDA $0515                  ; $8889
    BNE $8884                  ; $888C
    LDA #$01                   ; $888E
    STA $0515                  ; $8890
    LDY #$02                   ; $8893
    LDA ($0050),Y              ; $8895
    ASL                        ; $8897
    CLC                        ; $8898
    ADC #$06                   ; $8899
    TAX                        ; $889B
    LDA #$00                   ; $889C
    STA $04A5,X                ; $889E
    DEX                        ; $88A1
    BPL $889E                  ; $88A2
    LDX #$00                   ; $88A4
    JSR $88B9                  ; $88A6
    BEQ $88B8                  ; $88A9
    LDY #$02                   ; $88AB
    LDA ($0050),Y              ; $88AD
    CLC                        ; $88AF
    ADC #$03                   ; $88B0
    TAX                        ; $88B2
    JSR $88B9                  ; $88B3
    BNE $8884                  ; $88B6
    RTS                        ; $88B8
    LDA #$FF                   ; $88B9
    STA $0045                  ; $88BB
    LDY #$02                   ; $88BD
    LDA ($0050),Y              ; $88BF
    STA $04A5,X                ; $88C1
    LDA #$00                   ; $88C4
    STA $003A                  ; $88C6
    LDA $05C5                  ; $88C8
    LSR                        ; $88CB
    ROR $003A                  ; $88CC
    LSR                        ; $88CE
    ROR $003A                  ; $88CF
    LSR                        ; $88D1
    ROR $003A                  ; $88D2
    STA $003B                  ; $88D4
    LDY #$00                   ; $88D6
    LDA ($0050),Y              ; $88D8
    CLC                        ; $88DA
    ADC $003A                  ; $88DB
    STA $04A6,X                ; $88DD
    INY                        ; $88E0
    LDA ($0050),Y              ; $88E1
    ADC $003B                  ; $88E3
    STA $04A7,X                ; $88E5
    CMP #$22                   ; $88E8
    BCS $88F9                  ; $88EA
    LDA $05CE                  ; $88EC
    LSR                        ; $88EF
    LSR                        ; $88F0
    LSR                        ; $88F1
    LSR                        ; $88F2
    ORA $04A7,X                ; $88F3
    STA $04A7,X                ; $88F6
    STX $003A                  ; $88F9
    LDX #$00                   ; $88FB
    LDY #$05                   ; $88FD
    LDA ($0050),Y              ; $88FF
    CMP $05C5                  ; $8901
    BEQ $8918                  ; $8904
    BCS $8949                  ; $8906
    LDY #$07                   ; $8908
    CLC                        ; $890A
    ADC ($0050),Y              ; $890B
    LDX #$06                   ; $890D
    CMP $05C5                  ; $890F
    BEQ $8918                  ; $8912
