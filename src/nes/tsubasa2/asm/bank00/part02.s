    JSR $9FA8                  ; $8514
    LDA #$01                   ; $8517
    JMP $8879                  ; $8519
    CMP #$E8                   ; $851C
    BCS $8537                  ; $851E
    SEC                        ; $8520
    SBC #$E1                   ; $8521
    EOR #$FF                   ; $8523
    CLC                        ; $8525
    ADC $0053                  ; $8526
    STA $0053                  ; $8528
    AND #$1F                   ; $852A
    CMP $0054                  ; $852C
    BCS $8532                  ; $852E
    STA $0054                  ; $8530
    LDA #$01                   ; $8532
    JMP $8879                  ; $8534
    SEC                        ; $8537
    SBC #$E8                   ; $8538
    ASL                        ; $853A
    TAX                        ; $853B
    LDA $8546,X                ; $853C
    PHA                        ; $853F
    LDA $8545,X                ; $8540
    PHA                        ; $8543
    RTS                        ; $8544
    .byte $74,$85,$7F,$85,$8C,$85,$C3,$85,$D1,$85,$EB,$85,$03,$86,$17,$86
    .byte $2B,$86,$49,$86,$77,$86,$81,$86,$B7,$86,$B7,$87,$CA,$87,$D8,$87
    .byte $F7,$87,$13,$88,$1A,$88,$30,$88,$36,$88,$54,$88,$61,$88,$6F,$88
    INY                        ; $8575
    LDA ($004D),Y              ; $8576
    JSR $8920                  ; $8578
    LDA #$02                   ; $857B
    JMP $8879                  ; $857D
    LDA #$02                   ; $8580
    JSR $9FA8                  ; $8582
    JSR $997E                  ; $8585
    LDA #$01                   ; $8588
    JMP $8879                  ; $858A
    JSR $99F0                  ; $858D
    JSR $9B7F                  ; $8590
    LDA #$00                   ; $8593
    STA $00E6                  ; $8595
    LDA #$20                   ; $8597
    STA $00E7                  ; $8599
    LDY #$10                   ; $859B
    LDX #$20                   ; $859D
    JSR $98E8                  ; $859F
    LDA #$00                   ; $85A2
    STA $00E6                  ; $85A4
    LDA #$24                   ; $85A6
    STA $00E7                  ; $85A8
    LDY #$20                   ; $85AA
    LDX #$20                   ; $85AC
    JSR $98E8                  ; $85AE
    LDA #$00                   ; $85B1
    STA $004C                  ; $85B3
    STA $007B                  ; $85B5
    STA $004C                  ; $85B7
    LDA #$00                   ; $85B9
    STA $000D                  ; $85BB
    STA $000E                  ; $85BD
    LDA #$01                   ; $85BF
    JMP $8879                  ; $85C1
    JSR $899A                  ; $85C4
    JSR $89A3                  ; $85C7
    JSR $88B1                  ; $85CA
    LDA #$01                   ; $85CD
    JMP $8887                  ; $85CF
    LDY #$01                   ; $85D2
    LDA ($004D),Y              ; $85D4
    CMP #$FF                   ; $85D6
    BEQ $85E2                  ; $85D8
    JSR $89D2                  ; $85DA
    LDA #$02                   ; $85DD
    JMP $8879                  ; $85DF
    LDA #$00                   ; $85E2
    STA $0652                  ; $85E4
    LDA #$02                   ; $85E7
    JMP $8879                  ; $85E9
    LDX #$00                   ; $85EC
    LDA $0700,X                ; $85EE
    BEQ $85F8                  ; $85F1
    INX                        ; $85F3
    CPX #$05                   ; $85F4
    BNE $85EE                  ; $85F6
    LDY #$01                   ; $85F8
    LDA ($004D),Y              ; $85FA
    STA $0700,X                ; $85FC
    LDA #$02                   ; $85FF
    JMP $8879                  ; $8601
    LDA #$21                   ; $8604
    STA $00E6                  ; $8606
    LDA #$22                   ; $8608
    STA $00E7                  ; $860A
    LDY #$0B                   ; $860C
    LDX #$1E                   ; $860E
    JSR $98E8                  ; $8610
    LDA #$01                   ; $8613
    JMP $8879                  ; $8615
    LDA #$02                   ; $8618
    JSR $9FA8                  ; $861A
    LDA $0099                  ; $861D
    AND #$80                   ; $861F
    EOR #$80                   ; $8621
    ORA #$40                   ; $8623
    STA $0099                  ; $8625
    LDA #$01                   ; $8627
    JMP $8879                  ; $8629
    INY                        ; $862C
    LDA ($004D),Y              ; $862D
    STA $004F                  ; $862F
    STA $0051                  ; $8631
    INY                        ; $8633
    LDA ($004D),Y              ; $8634
    STA $0050                  ; $8636
    STA $0052                  ; $8638
    LDA $004D                  ; $863A
    CLC                        ; $863C
    ADC #$03                   ; $863D
    STA $004D                  ; $863F
    LDA $004E                  ; $8641
    ADC #$00                   ; $8643
    STA $004E                  ; $8645
    JMP $84E3                  ; $8647
    LDA #$21                   ; $864A
    STA $00E6                  ; $864C
    LDA #$22                   ; $864E
    STA $00E7                  ; $8650
    LDY #$0B                   ; $8652
    LDX #$1E                   ; $8654
    JSR $98E8                  ; $8656
    LDY #$01                   ; $8659
    LDA ($004D),Y              ; $865B
    ASL                        ; $865D
    TAY                        ; $865E
    LDX #$06                   ; $865F
    JSR $C4B9                  ; $8661
    LDX $BB41,Y                ; $8664
    LDA $BB40,Y                ; $8667
    TAY                        ; $866A
    JSR $97B6                  ; $866B
    LDX $0056                  ; $866E
    JSR $C4B9                  ; $8670
    LDA #$02                   ; $8673
    JMP $8879                  ; $8675
    INY                        ; $8678
    LDA ($004D),Y              ; $8679
    STA $0055                  ; $867B
    LDA #$02                   ; $867D
    JMP $8879                  ; $867F
    INY                        ; $8682
    LDA ($004D),Y              ; $8683
    BNE $868F                  ; $8685
    JSR $9A35                  ; $8687
    LDY #$02                   ; $868A
    JMP $86B4                  ; $868C
    CMP #$FF                   ; $868F
    BEQ $86A7                  ; $8691
    BMI $869D                  ; $8693
    JSR $9A4C                  ; $8695
    LDY #$02                   ; $8698
    JMP $86B4                  ; $869A
    AND #$7F                   ; $869D
    JSR $9A60                  ; $869F
    LDY #$02                   ; $86A2
    JMP $86B4                  ; $86A4
    LDY #$03                   ; $86A7
    LDA ($004D),Y              ; $86A9
    TAX                        ; $86AB
    DEY                        ; $86AC
    LDA ($004D),Y              ; $86AD
    JSR $9A31                  ; $86AF
    LDY #$04                   ; $86B2
    .byte $98
    JMP $8879                  ; $86B5
    INY                        ; $86B8
    LDA ($004D),Y              ; $86B9
    ASL                        ; $86BB
    TAX                        ; $86BC
    LDA $86C7,X                ; $86BD
    PHA                        ; $86C0
    LDA $86C6,X                ; $86C1
    PHA                        ; $86C4
    RTS                        ; $86C5
    .byte $D5,$86,$DD,$86,$E5,$86,$ED,$86,$F5,$86,$12,$87,$33,$87,$9E,$87
    .byte $20,$B0,$99,$A9,$02,$4C,$79,$88
    JSR $99D1                  ; $86DE
    LDA #$02                   ; $86E1
    JMP $8879                  ; $86E3
    JSR $9A0D                  ; $86E6
    LDA #$02                   ; $86E9
    JMP $8879                  ; $86EB
    JSR $9A1F                  ; $86EE
    LDA #$02                   ; $86F1
    JMP $8879                  ; $86F3
    LDA #$04                   ; $86F6
    STA $00ED                  ; $86F8
    LDX $00ED                  ; $86FA
    LDA $87B3,X                ; $86FC
    STA $0631                  ; $86FF
    JSR $9A71                  ; $8702
    LDA #$04                   ; $8705
    JSR $9FA8                  ; $8707
    DEC $00ED                  ; $870A
    BNE $86FA                  ; $870C
    LDA #$02                   ; $870E
    JMP $8879                  ; $8710
    LDA #$00                   ; $8713
    STA $00ED                  ; $8715
    LDX $00ED                  ; $8717
    LDA $87B4,X                ; $8719
    STA $0631                  ; $871C
    JSR $9A71                  ; $871F
    LDA #$04                   ; $8722
    JSR $9FA8                  ; $8724
    INC $00ED                  ; $8727
    LDA $00ED                  ; $8729
    CMP #$04                   ; $872B
    BCC $8717                  ; $872D
    LDA #$02                   ; $872F
    JMP $8879                  ; $8731
    LDY #$FC                   ; $8734
    LDA $88D2,Y                ; $8736
    STA $0468,Y                ; $8739
    INY                        ; $873C
    BNE $8736                  ; $873D
    LDX #$F8                   ; $873F
    LDY #$00                   ; $8741
    .byte $A9,$01
    JSR $9FA8                  ; $8745
    BIT $001E                  ; $8748
    BMI $8763                  ; $874A
    LDA $001C                  ; $874C
    AND #$44                   ; $874E
    CMP #$44                   ; $8750
    BEQ $876E                  ; $8752
    INY                        ; $8754
    CPY #$14                   ; $8755
    BEQ $8734                  ; $8757
    CPY #$0C                   ; $8759
    BNE $8743                  ; $875B
    STX $0564                  ; $875D
    JMP $8743                  ; $8760
    STX $0564                  ; $8763
    JSR $88B1                  ; $8766
    LDA #$03                   ; $8769
    JMP $8887                  ; $876B
    .byte $8E,$64,$05,$20,$B1,$88,$A5,$4D,$18,$69,$03,$85,$58,$A5,$4E,$69
    .byte $00,$85,$59,$A5,$56,$85,$5A,$A0,$02,$B1,$4D,$0A,$A8,$A2,$06,$86
    .byte $56,$20,$B9,$C4,$B9,$00,$A0,$85,$4D,$B9,$01,$A0,$85,$4E,$4C,$D7
    .byte $84,$20,$B1,$88,$A5,$58,$85,$4D,$A5,$59,$85,$4E,$A6,$5A,$86,$56
    .byte $20,$B9,$C4,$4C,$D7,$84,$30
    .byte $20,$10,$0F
    INY                        ; $87B8
    LDX #$00                   ; $87B9
    LDA ($004D),Y              ; $87BB
    CMP #$FF                   ; $87BD
    BEQ $87C4                  ; $87BF
    ORA #$80                   ; $87C1
    TAX                        ; $87C3
    STX $004C                  ; $87C4
    LDA #$02                   ; $87C6
    JMP $8879                  ; $87C8
    JSR $899A                  ; $87CB
    INY                        ; $87CE
    LDA ($004D),Y              ; $87CF
    JSR $9FA8                  ; $87D1
    LDA #$02                   ; $87D4
    JMP $8879                  ; $87D6
    LDA $0009                  ; $87D9
    BEQ $87E5                  ; $87DB
    .byte $A9,$01,$20,$A8,$9F,$4C,$D9,$87
    LDA $007B                  ; $87E5
    EOR #$01                   ; $87E7
    STA $007B                  ; $87E9
    LDA #$00                   ; $87EB
    STA $007A                  ; $87ED
    STA $0044                  ; $87EF
    STA $0045                  ; $87F1
    LDA #$01                   ; $87F3
    JMP $8879                  ; $87F5
    INY                        ; $87F8
    LDA ($004D),Y              ; $87F9
    STA $00ED                  ; $87FB
    INY                        ; $87FD
    LDA ($004D),Y              ; $87FE
    STA $00EC                  ; $8800
    LDX #$02                   ; $8802
    JSR $C4B9                  ; $8804
    JSR $A212                  ; $8807
    TAY                        ; $880A
    LDX $0056                  ; $880B
    JSR $C4B9                  ; $880D
    TYA                        ; $8810
    JMP $8879                  ; $8811
    LDA $005B                  ; $8814
    AND #$FB                   ; $8816
    JMP $881F                  ; $8818
    LDA $005B                  ; $881B
    ORA #$04                   ; $881D
    .byte $85,$5B
    INY                        ; $8821
    LDA ($004D),Y              ; $8822
    JSR $8AF7                  ; $8824
    LDX $0056                  ; $8827
    JSR $C4B9                  ; $8829
    LDA #$02                   ; $882C
    JMP $8879                  ; $882E
    JSR $9085                  ; $8831
    JMP $84E7                  ; $8834
    JSR $899A                  ; $8837
    LDA #$04                   ; $883A
    JSR $9FA8                  ; $883C
    LDA $0051                  ; $883F
    CLC                        ; $8841
    ADC #$40                   ; $8842
    STA $0051                  ; $8844
    LDA $0052                  ; $8846
    ADC #$00                   ; $8848
    STA $0052                  ; $884A
    INC $004D                  ; $884C
    BNE $8852                  ; $884E
    INC $004E                  ; $8850
    JMP $84E3                  ; $8852
    JSR $88B1                  ; $8855
    LDA #$04                   ; $8858
    JSR $9FA8                  ; $885A
    LDA #$01                   ; $885D
    JMP $8887                  ; $885F
    INY                        ; $8862
    LDA ($004D),Y              ; $8863
    TAX                        ; $8865
    INY                        ; $8866
    LDA ($004D),Y              ; $8867
    STA $004E                  ; $8869
    STX $004D                  ; $886B
    JMP $84E7                  ; $886D
    LDA #$00                   ; $8870
    STA $004D                  ; $8872
    STA $004E                  ; $8874
    JMP $9F7E                  ; $8876
    .byte $18
    ADC $004D                  ; $887A
    STA $004D                  ; $887C
    LDA $004E                  ; $887E
    ADC #$00                   ; $8880
    STA $004E                  ; $8882
    JMP $84E7                  ; $8884
    .byte $18
    ADC $004D                  ; $8888
    STA $004D                  ; $888A
    LDA $004E                  ; $888C
    ADC #$00                   ; $888E
    STA $004E                  ; $8890
    JMP $84D7                  ; $8892
    STA $0057                  ; $8895
    LDX #$0D                   ; $8897
    LDA #$A8                   ; $8899
    STA $0000,X                ; $889B
    LDA #$88                   ; $889D
    STA $0001,X                ; $889F
    LDY #$A0                   ; $88A1
    LDA #$00                   ; $88A3
    JSR $9F69                  ; $88A5
    RTS                        ; $88A8
    LDX #$02                   ; $88A9
    JSR $C4B9                  ; $88AB
    JMP $A206                  ; $88AE
    LDA $0054                  ; $88B1
    EOR #$FF                   ; $88B3
    CLC                        ; $88B5
    ADC #$1F                   ; $88B6
    TAX                        ; $88B8
    LDY #$08                   ; $88B9
    LDA $004F                  ; $88BB
    AND #$E0                   ; $88BD
    ORA $0054                  ; $88BF
    STA $00E6                  ; $88C1
    LDA $0050                  ; $88C3
    STA $00E7                  ; $88C5
    JMP $98E8                  ; $88C7
    PHA                        ; $88CA
    LDA #$82                   ; $88CB
    JSR $9B28                  ; $88CD
    PLA                        ; $88D0
    CMP #$A0                   ; $88D1
    BCC $88ED                  ; $88D3
    PHA                        ; $88D5
    CMP #$C8                   ; $88D6
    LDA #$94                   ; $88D8
    ADC #$00                   ; $88DA
    STA $05E8,X                ; $88DC
    INX                        ; $88DF
    PLA                        ; $88E0
    TAY                        ; $88E1
    LDA $8A14,Y                ; $88E2
    STA $05E8,X                ; $88E5
    INX                        ; $88E8
    JSR $9B5E                  ; $88E9
    RTS                        ; $88EC
    STA $05E9,X                ; $88ED
    LDA #$00                   ; $88F0
    STA $05E8,X                ; $88F2
    INX                        ; $88F5
    INX                        ; $88F6
    JSR $9B5E                  ; $88F7
    RTS                        ; $88FA
    LDX #$00                   ; $88FB
    LDA $046A,X                ; $88FD
    EOR #$20                   ; $8900
    STA $046A,X                ; $8902
    INX                        ; $8905
    INX                        ; $8906
    INX                        ; $8907
    INX                        ; $8908
    BNE $88FD                  ; $8909
    RTS                        ; $890B
    STA $00ED                  ; $890C
    LDX #$00                   ; $890E
    LDA $0468,X                ; $8910
    CLC                        ; $8913
    ADC $00ED                  ; $8914
    STA $0468,X                ; $8916
    INX                        ; $8919
    INX                        ; $891A
    INX                        ; $891B
    INX                        ; $891C
    BNE $8910                  ; $891D
    RTS                        ; $891F
    LDX #$13                   ; $8920
    JSR $9DEE                  ; $8922
    LDA $00EC                  ; $8925
    CLC                        ; $8927
    ADC #$00                   ; $8928
    STA $00EC                  ; $892A
    LDA $00ED                  ; $892C
    ADC #$BF                   ; $892E
    STA $00ED                  ; $8930
    LDA $0025                  ; $8932
    STA $00EA                  ; $8934
    LDX #$06                   ; $8936
    JSR $C4B9                  ; $8938
    LDA $0078                  ; $893B
    BNE $893B                  ; $893D
    LDY #$00                   ; $893F
    LDA ($00EC),Y              ; $8941
    STA a: $0079               ; $8943
    LDA #$00                   ; $8946
    STA a: $007A               ; $8948
    INY                        ; $894B
    LDX #$12                   ; $894C
    LDA ($00EC),Y              ; $894E
    STA $007B,Y                ; $8950
    INY                        ; $8953
    DEX                        ; $8954
    BNE $894E                  ; $8955
    LDX $00EA                  ; $8957
    JSR $C4B9                  ; $8959
    RTS                        ; $895C
    TAX                        ; $895D
    LDA $0099                  ; $895E
    BPL $8966                  ; $8960
    EOR #$41                   ; $8962
    STA $0099                  ; $8964
    LDA #$01                   ; $8966
    JSR $9FA8                  ; $8968
    TXA                        ; $896B
    PHA                        ; $896C
    JSR $89FF                  ; $896D
    PLA                        ; $8970
    TAX                        ; $8971
    DEX                        ; $8972
    BNE $8966                  ; $8973
    RTS                        ; $8975
    LDA $004D                  ; $8976
    STA $00EA                  ; $8978
    LDA $004E                  ; $897A
    STA $00EB                  ; $897C
    LDA #$02                   ; $897E
    STA $00E6                  ; $8980
    STX $00E7                  ; $8982
    STY $00E8                  ; $8984
    LDA #$E5                   ; $8986
    STA $004D                  ; $8988
    LDA #$00                   ; $898A
    STA $004E                  ; $898C
    JSR $9085                  ; $898E
    LDA $00EA                  ; $8991
    STA $004D                  ; $8993
    LDA $00EB                  ; $8995
    STA $004E                  ; $8997
    RTS                        ; $8999
    LDA $0099                  ; $899A
    AND #$80                   ; $899C
    ORA #$40                   ; $899E
    STA $0099                  ; $89A0
    RTS                        ; $89A2
    LDY #$FC                   ; $89A3
    LDA $88D2,Y                ; $89A5
