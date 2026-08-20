; ============================================================
; code_sub.s - bank28 sub routines
; ============================================================

    BEQ $84BA                  ; $84B4
    INX                        ; $84B6
    INX                        ; $84B7
    BNE $84B1                  ; $84B8
    LDA $8BBF,X                ; $84BA
    RTS                        ; $84BD
    PLA                        ; $84BE
    PLA                        ; $84BF
    RTS                        ; $84C0
    .byte $AD,$FB,$05
    BEQ $84F3                  ; $84C4
    LDA #$00                   ; $84C6
    STA $043C                  ; $84C8
    STA $043E                  ; $84CB
    LDX #$00                   ; $84CE
    LDA a: $00E2               ; $84D0
    CMP #$1F                   ; $84D3
    BCS $84DF                  ; $84D5
    JSR $8A20                  ; $84D7
    JSR $8A09                  ; $84DA
    LDX #$01                   ; $84DD
    STX $043B                  ; $84DF
    LDA $0441                  ; $84E2
    JSR $8C06                  ; $84E5
    LDA $0430                  ; $84E8
    BEQ $84F0                  ; $84EB
    LDA $0431                  ; $84ED
    STA $043C                  ; $84F0
    LDA a: $00E3               ; $84F3
    AND #$01                   ; $84F6
    EOR $0612                  ; $84F8
    STA $0612                  ; $84FB
    RTS                        ; $84FE
    .byte $AE,$FB,$05
    BEQ $8506                  ; $8502
    LDX #$03                   ; $8504
    LDA a: $00E2               ; $8506
    ADC a: $00E3               ; $8509
    LDY #$00                   ; $850C
    CMP $8528,X                ; $850E
    BCS $8517                  ; $8511
    INY                        ; $8513
    INX                        ; $8514
    BNE $850E                  ; $8515
    TYA                        ; $8517
    CLC                        ; $8518
    ADC #$07                   ; $8519
    LDX $05FB                  ; $851B
    BEQ $8524                  ; $851E
    STA $043B                  ; $8520
    RTS                        ; $8523
    STA $043D                  ; $8524
    RTS                        ; $8527
    .byte $B3,$4F,$00,$AA,$54,$00,$A0,$06
    LDA ($0038),Y              ; $8530
    AND #$01                   ; $8532
    ASL                        ; $8534
    ADC $061E                  ; $8535
    STA $061E                  ; $8538
    LDA ($0038),Y              ; $853B
    LSR                        ; $853D
    LSR                        ; $853E
    LSR                        ; $853F
    LSR                        ; $8540
    CLC                        ; $8541
    ADC #$0A                   ; $8542
    STA $0441                  ; $8544
    LDA #$00                   ; $8547
    STA $003C                  ; $8549
    LDY #$07                   ; $854B
    LDA ($0038),Y              ; $854D
    JSR $8AEB                  ; $854F
    CLC                        ; $8552
    LDA $003C                  ; $8553
    ADC #$2E                   ; $8555
    STA $003C                  ; $8557
    TXA                        ; $8559
    ADC #$B1                   ; $855A
    STA $003D                  ; $855C
    LDA #$00                   ; $855E
    STA $043C                  ; $8560
    STA $003E                  ; $8563
    JSR $8B0B                  ; $8565
    STA $043B                  ; $8568
    LDA $043B                  ; $856B
    JSR $C509                  ; $856E
    .byte $DF,$87,$E9,$87,$83,$85,$83,$85,$83,$85,$83,$85,$83,$85,$83,$85
    .byte $83,$85,$A0,$08
    LDA ($0038),Y              ; $8585
    JSR $895E                  ; $8587
    LSR                        ; $858A
    LSR                        ; $858B
    CMP #$0F                   ; $858C
    BNE $8596                  ; $858E
    .byte $20,$20,$8A,$4C,$99,$85
    CLC                        ; $8596
    ADC #$0A                   ; $8597
    CMP $0441                  ; $8599
    BNE $85A7                  ; $859C
    CLC                        ; $859E
    ADC #$01                   ; $859F
    CMP #$16                   ; $85A1
    BCC $85A7                  ; $85A3
    .byte $A9,$0C
    JSR $8A09                  ; $85A7
    LDA #$01                   ; $85AA
    STA $043B                  ; $85AC
    LDA #$00                   ; $85AF
    STA $043C                  ; $85B1
    RTS                        ; $85B4
    .byte $A9,$00
    STA $003D                  ; $85B7
    LDX $0621                  ; $85B9
    LDY $8604,X                ; $85BC
    TYA                        ; $85BF
    ASL                        ; $85C0
    ASL                        ; $85C1
    STA $003E                  ; $85C2
    INY                        ; $85C4
    INY                        ; $85C5
    INY                        ; $85C6
    INY                        ; $85C7
    LDA ($003A),Y              ; $85C8
    ASL                        ; $85CA
    ROL $003D                  ; $85CB
    ASL                        ; $85CD
    ROL $003D                  ; $85CE
    STA $003C                  ; $85D0
    LDX $003D                  ; $85D2
    ASL                        ; $85D4
    ROL $003D                  ; $85D5
    ADC $003C                  ; $85D7
    STA $003C                  ; $85D9
    TXA                        ; $85DB
    ADC $003D                  ; $85DC
    TAX                        ; $85DE
    LDA $003C                  ; $85DF
    CLC                        ; $85E1
    ADC #$2E                   ; $85E2
    STA $003C                  ; $85E4
    TXA                        ; $85E6
    ADC #$BA                   ; $85E7
    STA $003D                  ; $85E9
    JSR $8B0B                  ; $85EB
    STA $043D                  ; $85EE
    TAX                        ; $85F1
    LDA $0442                  ; $85F2
    JSR $8DA6                  ; $85F5
    LDA $0430                  ; $85F8
    BEQ $8600                  ; $85FB
    LDA $0431                  ; $85FD
    STA $043E                  ; $8600
    RTS                        ; $8603
    .byte $00,$01,$FF,$02,$00,$AD,$FB,$05
    BEQ $8611                  ; $860C
    JMP $875D                  ; $860E
    LDA $0600                  ; $8611
    BEQ $863E                  ; $8614
    LDA #$00                   ; $8616
    PHA                        ; $8618
    LDA #$01                   ; $8619
    JSR $C515                  ; $861B
    PLA                        ; $861E
    PHA                        ; $861F
    STA $0040                  ; $8620
    TAX                        ; $8622
    LDA $0601,X                ; $8623
    JSR $863F                  ; $8626
    PLA                        ; $8629
    TAX                        ; $862A
    LDA $043D                  ; $862B
    STA $060B,X                ; $862E
    LDA $043E                  ; $8631
    STA $0606,X                ; $8634
    INX                        ; $8637
    TXA                        ; $8638
    CMP $0600                  ; $8639
    BNE $8618                  ; $863C
    RTS                        ; $863E
    STA $0442                  ; $863F
    JSR $8A62                  ; $8642
    LDA #$00                   ; $8645
    STA $003C                  ; $8647
    LDA $0442                  ; $8649
    CMP #$0B                   ; $864C
    BNE $8653                  ; $864E
    JMP $85B5                  ; $8650
    LDY $0621                  ; $8653
    LDA $86B5,Y                ; $8656
    STA $003C                  ; $8659
    BEQ $8663                  ; $865B
    JSR $8AB3                  ; $865D
    JMP $868E                  ; $8660
    LDA $0635                  ; $8663
    EOR #$FF                   ; $8666
    TAX                        ; $8668
    LDA #$14                   ; $8669
    CPX #$A0                   ; $866B
    BCS $868E                  ; $866D
    LDA #$10                   ; $866F
    CPX #$60                   ; $8671
    BCS $868E                  ; $8673
    LDA $0637                  ; $8675
    BPL $867C                  ; $8678
    EOR #$FF                   ; $867A
    TAY                        ; $867C
    JSR $C539                  ; $867D
    LDX #$00                   ; $8680
    CMP $8BBE,X                ; $8682
    BEQ $868B                  ; $8685
    INX                        ; $8687
    INX                        ; $8688
    BNE $8682                  ; $8689
    LDA $8BBF,X                ; $868B
    .byte $A0,$07
    JSR $8ADE                  ; $8690
    CLC                        ; $8693
    LDA $003C                  ; $8694
    ADC #$AE                   ; $8696
    STA $003C                  ; $8698
    TXA                        ; $869A
    ADC #$B8                   ; $869B
    STA $003D                  ; $869D
    JSR $8B0B                  ; $869F
    STA $043D                  ; $86A2
    LDA #$00                   ; $86A5
    STA $043E                  ; $86A7
    LDA $003F                  ; $86AA
    JSR $C509                  ; $86AC
    .byte $BA,$86,$EB,$86,$10,$87,$00,$02,$01,$00,$00,$AD,$3D,$04
    JSR $C509                  ; $86BD
    .byte $C8,$86,$D0,$86,$D8,$86,$E0,$86,$A9,$01
    STA $043D                  ; $86CA
    JMP $8732                  ; $86CD
    .byte $A9,$02
    STA $043D                  ; $86D2
    JMP $8732                  ; $86D5
    .byte $A9,$00
    STA $043D                  ; $86DA
    JMP $8732                  ; $86DD
    .byte $A9,$01
    STA $043D                  ; $86E2
    LDA #$05                   ; $86E5
    STA $043E                  ; $86E7
    RTS                        ; $86EA
    .byte $AD,$3D,$04
    JSR $C509                  ; $86EE
    .byte $F9,$86,$FF,$86,$05,$87,$08,$87,$A9,$05
    STA $043D                  ; $86FB
    RTS                        ; $86FE
    .byte $A9,$04
    STA $043D                  ; $8701
    RTS                        ; $8704
    .byte $4C,$D0,$86,$A9,$01
    STA $043E                  ; $870A
    JMP $86FF                  ; $870D
    .byte $AD,$3D,$04
    JSR $C509                  ; $8713
    .byte $1E,$87,$21,$87,$27,$87,$2A,$87,$4C,$F9,$86,$A9,$03
    STA $043D                  ; $8723
    RTS                        ; $8726
    .byte $4C,$D0,$86,$A9,$01
    STA $043E                  ; $872C
    JMP $8721                  ; $872F
    .byte $AD,$42,$04
    LDX $043D                  ; $8735
    JSR $8D58                  ; $8738
    LDA $0430                  ; $873B
    BEQ $8743                  ; $873E
    LDA $0431                  ; $8740
    STA $043E                  ; $8743
    RTS                        ; $8746
    .byte $03,$04,$04,$04,$04,$05,$06,$05,$06,$05,$06,$00,$06,$06,$06,$06
    .byte $07,$08,$07,$08,$07,$08,$AD,$41,$04
    JSR $8A62                  ; $8760
    LDY $0621                  ; $8763
    LDA $87C3,Y                ; $8766
    STA $003C                  ; $8769
    BEQ $8773                  ; $876B
    JSR $8AB3                  ; $876D
    JMP $879C                  ; $8770
    LDA #$14                   ; $8773
    LDX $0635                  ; $8775
    CPX #$A0                   ; $8778
    BCS $879C                  ; $877A
    LDA #$10                   ; $877C
    CPX #$60                   ; $877E
    BCS $879C                  ; $8780
    LDY $0637                  ; $8782
    BPL $878B                  ; $8785
    TYA                        ; $8787
    EOR #$FF                   ; $8788
    TAY                        ; $878A
    JSR $C539                  ; $878B
    LDX #$00                   ; $878E
    CMP $8BBE,X                ; $8790
    BEQ $8799                  ; $8793
    INX                        ; $8795
    INX                        ; $8796
    BNE $8790                  ; $8797
    LDA $8BBF,X                ; $8799
    .byte $A0,$04
    JSR $8ADE                  ; $879E
    CLC                        ; $87A1
    LDA $003C                  ; $87A2
    ADC #$2E                   ; $87A4
    STA $003C                  ; $87A6
    TXA                        ; $87A8
    ADC #$B1                   ; $87A9
    STA $003D                  ; $87AB
    JSR $8B0B                  ; $87AD
    STA $043B                  ; $87B0
    LDA #$00                   ; $87B3
    STA $043C                  ; $87B5
    LDA $003F                  ; $87B8
    JSR $C509                  ; $87BA
    .byte $C7,$87,$DA,$88,$FD,$88,$00,$01,$02,$00,$AD,$3B,$04
    JSR $C509                  ; $87CA
    .byte $DF,$87,$E9,$87,$EF,$87,$F2,$87,$FA,$87,$4A,$88,$55,$88,$60,$88
    .byte $A8,$88,$AD,$E2,$00,$29,$20,$D0,$03,$4C,$27,$89,$20,$27,$89
    JMP $8A3F                  ; $87EC
    .byte $4C,$33,$89,$A9,$02
    STA $043B                  ; $87F4
    JMP $8A3F                  ; $87F7
    .byte $A9,$03
    STA $043B                  ; $87FC
    JSR $8A3F                  ; $87FF
    LDA $043C                  ; $8802
    BNE $8849                  ; $8805
    LDA #$0C                   ; $8807
    STA $003A                  ; $8809
    LDA $003A                  ; $880B
    CMP $0441                  ; $880D
    BEQ $8839                  ; $8810
    JSR $C50C                  ; $8812
    LDY #$06                   ; $8815
    LDA ($0034),Y              ; $8817
    SEC                        ; $8819
    SBC $0635                  ; $881A
    BCS $8823                  ; $881D
    EOR #$FF                   ; $881F
    ADC #$01                   ; $8821
    CMP #$14                   ; $8823
    BCS $8839                  ; $8825
    LDY #$08                   ; $8827
    LDA ($0034),Y              ; $8829
    SEC                        ; $882B
    SBC $0637                  ; $882C
    BCS $8835                  ; $882F
    EOR #$FF                   ; $8831
    ADC #$01                   ; $8833
    CMP #$14                   ; $8835
    BCC $8844                  ; $8837
    INC $003A                  ; $8839
    LDA $003A                  ; $883B
    CMP #$16                   ; $883D
    BNE $880B                  ; $883F
    JMP $87F2                  ; $8841
    LDA $003A                  ; $8844
    JSR $8A09                  ; $8846
    RTS                        ; $8849
    .byte $A9,$00
    STA $043B                  ; $884C
    LDA #$0C                   ; $884F
    STA $043C                  ; $8851
    RTS                        ; $8854
    .byte $A9,$00
    STA $043B                  ; $8857
    LDA #$0D                   ; $885A
    STA $043C                  ; $885C
    RTS                        ; $885F
    .byte $A9,$02
    STA $043B                  ; $8862
    BIT $044B                  ; $8865
    BMI $88A7                  ; $8868
    LDA #$80                   ; $886A
    STA $044B                  ; $886C
    LDA #$0C                   ; $886F
    PHA                        ; $8871
    JSR $C50C                  ; $8872
    LDY #$01                   ; $8875
    LDA #$80                   ; $8877
    STA ($0034),Y              ; $8879
    INY                        ; $887B
    LDA #$C8                   ; $887C
    STA ($0034),Y              ; $887E
    PLA                        ; $8880
    CLC                        ; $8881
    ADC #$01                   ; $8882
    CMP #$16                   ; $8884
    BNE $8871                  ; $8886
    LDA #$01                   ; $8888
    STA a: $002F               ; $888A
    LDA #$00                   ; $888D
    STA $062D                  ; $888F
    LDA $0615                  ; $8892
    AND #$BF                   ; $8895
    STA $0615                  ; $8897
    LDA #$15                   ; $889A
    JSR $C54E                  ; $889C
    BIT $0615                  ; $889F
    BPL $88A7                  ; $88A2
    JSR $C575                  ; $88A4
    RTS                        ; $88A7
    .byte $A9,$02
    STA $043B                  ; $88AA
    BIT $044C                  ; $88AD
    BMI $88D9                  ; $88B0
    LDA #$80                   ; $88B2
    STA $044C                  ; $88B4
    STA $03F1                  ; $88B7
    LDA #$C9                   ; $88BA
    STA $03F2                  ; $88BC
    LDA #$00                   ; $88BF
    STA $062D                  ; $88C1
    LDA $0615                  ; $88C4
    AND #$BF                   ; $88C7
    STA $0615                  ; $88C9
    LDA #$16                   ; $88CC
    JSR $C54E                  ; $88CE
    BIT $0615                  ; $88D1
    BPL $88D9                  ; $88D4
    JSR $C575                  ; $88D6
    RTS                        ; $88D9
    .byte $AD,$3B,$04
    JSR $C509                  ; $88DD
    .byte $E8,$88,$EE,$88,$F4,$88,$F7,$88,$20,$27,$89
    JMP $8A3F                  ; $88EB
    .byte $A9,$05
    STA $043B                  ; $88F0
    RTS                        ; $88F3
    .byte $4C,$33,$89,$A9,$04
    STA $043B                  ; $88F9
    RTS                        ; $88FC
    .byte $AD,$3B,$04
    JSR $C509                  ; $8900
    .byte $0B,$89,$11,$89,$17,$89,$1A,$89,$A9,$04
    STA $043B                  ; $890D
    RTS                        ; $8910
    .byte $A9,$06
    STA $043B                  ; $8913
    RTS                        ; $8916
    .byte $4C,$33,$89,$A9,$06
    STA $043B                  ; $891C
    LDA #$01                   ; $891F
    STA $043C                  ; $8921
    JMP $8911                  ; $8924
    LDA #$00                   ; $8927
    STA $043B                  ; $8929
    LDA $044E                  ; $892C
    STA $043C                  ; $892F
    RTS                        ; $8932
    .byte $A0,$0A
    LDA ($003A),Y              ; $8935
    JSR $895E                  ; $8937
    AND #$03                   ; $893A
    PHA                        ; $893C
    LDA ($003C),Y              ; $893D
    LSR                        ; $893F
    LSR                        ; $8940
    CMP #$0F                   ; $8941
    BEQ $894D                  ; $8943
    CLC                        ; $8945
    ADC #$0A                   ; $8946
    CMP $0441                  ; $8948
    BNE $8950                  ; $894B
    JSR $8A20                  ; $894D
    STA $003C                  ; $8950
    PLA                        ; $8952
    JSR $C509                  ; $8953
    .byte $7E,$89,$84,$89,$93,$89,$9C,$89
    LDX #$00                   ; $895E
    STX $003D                  ; $8960
    ASL                        ; $8962
    ROL $003D                  ; $8963
    ASL                        ; $8965
