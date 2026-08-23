; ============================================================
; code_data.s - bank20 inline data + routines
; ============================================================

    INY                        ; $85C5
    LDA ($003E),Y              ; $85C6
    INY                        ; $85C8
    STY $0040                  ; $85C9
    LDY #$0B                   ; $85CB
    STA ($003C),Y              ; $85CD
    DEY                        ; $85CF
    DEY                        ; $85D0
    TXA                        ; $85D1
    STA ($003C),Y              ; $85D2
    RTS                        ; $85D4
    .byte $20,$E7,$85,$A0,$00
    LDA ($003C),Y              ; $85DA
    ORA #$10                   ; $85DC
    STA ($003C),Y              ; $85DE
    RTS                        ; $85E0
    .byte $20,$A9,$85
    JMP $85D8                  ; $85E4
    LDY $0040                  ; $85E7
    LDA ($003E),Y              ; $85E9
    LDY #$11                   ; $85EB
    STA ($003C),Y              ; $85ED
    INC $0040                  ; $85EF
    RTS                        ; $85F1
    CLC                        ; $85F2
    LDA ($003C),Y              ; $85F3
    INY                        ; $85F5
    ADC ($003C),Y              ; $85F6
    STA ($003C),Y              ; $85F8
    INY                        ; $85FA
    LDA ($003C),Y              ; $85FB
    BPL $8601                  ; $85FD
    DEC $0042,X                ; $85FF
    INY                        ; $8601
    ADC ($003C),Y              ; $8602
    STA ($003C),Y              ; $8604
    LDA $0042,X                ; $8606
    ADC #$00                   ; $8608
    STA $0042,X                ; $860A
    RTS                        ; $860C
    LDA ($003E),Y              ; $860D
    PHA                        ; $860F
    DEY                        ; $8610
    LDA ($003E),Y              ; $8611
    PHA                        ; $8613
    TXA                        ; $8614
    TAY                        ; $8615
    PLA                        ; $8616
    CLC                        ; $8617
    ADC ($003C),Y              ; $8618
    STA ($003C),Y              ; $861A
    INY                        ; $861C
    INY                        ; $861D
    PLA                        ; $861E
    ADC ($003C),Y              ; $861F
    STA ($003C),Y              ; $8621
    RTS                        ; $8623
    .byte $AD,$2D,$06
    AND #$0F                   ; $8627
    CMP #$05                   ; $8629
    BNE $8630                  ; $862B
    JMP $8861                  ; $862D
    JSR $8753                  ; $8630
    LDA #$00                   ; $8633
    STA $0046                  ; $8635
    .byte $A5,$46
    BNE $863E                  ; $8639
    JMP $86CF                  ; $863B
    CMP #$0B                   ; $863E
    BNE $8645                  ; $8640
    JMP $86CF                  ; $8642
    JSR $86DB                  ; $8645
    BCS $864D                  ; $8648
    JMP $86CF                  ; $864A
    LDX $003B                  ; $864D
    LDY #$06                   ; $864F
    LDA ($0034),Y              ; $8651
    CMP #$34                   ; $8653
    BCS $8659                  ; $8655
    LDA #$34                   ; $8657
    CMP #$CC                   ; $8659
    BCC $865F                  ; $865B
    LDA #$CC                   ; $865D
    PHA                        ; $865F
    LDA $062D                  ; $8660
    AND #$0F                   ; $8663
    TAY                        ; $8665
    PLA                        ; $8666
    CLC                        ; $8667
    ADC $88DA,Y                ; $8668
    STA $0203,X                ; $866B
    LDY #$08                   ; $866E
    LDA ($0034),Y              ; $8670
    CMP #$54                   ; $8672
    BCS $8678                  ; $8674
    LDA #$54                   ; $8676
    CMP #$AC                   ; $8678
    BCC $867E                  ; $867A
    LDA #$AC                   ; $867C
    PHA                        ; $867E
    LDA $062D                  ; $867F
    AND #$0F                   ; $8682
    TAY                        ; $8684
    PLA                        ; $8685
    CLC                        ; $8686
    ADC $88DF,Y                ; $8687
    STA $0200,X                ; $868A
    LDA #$03                   ; $868D
    STA $0202,X                ; $868F
    BIT $0615                  ; $8692
    BPL $86A8                  ; $8695
    LDA $05FB                  ; $8697
    BEQ $86A8                  ; $869A
    LDA $0046                  ; $869C
    CMP #$0B                   ; $869E
    BCS $86A8                  ; $86A0
    JSR $86F2                  ; $86A2
    JMP $86B5                  ; $86A5
    LDA $0046                  ; $86A8
    CMP $0441                  ; $86AA
    BNE $86B5                  ; $86AD
    JSR $881D                  ; $86AF
    JMP $86C4                  ; $86B2
    .byte $C9,$0B
    BCC $86BB                  ; $86B7
    SBC #$01                   ; $86B9
    CLC                        ; $86BB
    ADC #$11                   ; $86BC
    CMP #$20                   ; $86BE
    BCC $86C4                  ; $86C0
    ADC #$0F                   ; $86C2
    .byte $9D,$01,$02
    INX                        ; $86C7
    INX                        ; $86C8
    INX                        ; $86C9
    INX                        ; $86CA
    STX $003B                  ; $86CB
    INC $0048                  ; $86CD
    .byte $E6,$46
    LDA $0046                  ; $86D1
    CMP #$16                   ; $86D3
    BEQ $86DA                  ; $86D5
    JMP $8637                  ; $86D7
    RTS                        ; $86DA
    JSR $C50C                  ; $86DB
    LDA $062D                  ; $86DE
    AND #$0F                   ; $86E1
    JSR $C509                  ; $86E3
    .byte $1D,$87,$1D,$87,$1F,$87,$3B,$87,$1D,$87,$00,$00
    LDA $0046                  ; $86F2
    CMP $05FD                  ; $86F4
    BNE $871C                  ; $86F7
    LDA $062E                  ; $86F9
    BNE $870F                  ; $86FC
    LDY #$07                   ; $86FE
    LDA $062D                  ; $8700
    EOR #$40                   ; $8703
    STA $062D                  ; $8705
    BVS $870C                  ; $8708
    LDY #$04                   ; $870A
    STY $062E                  ; $870C
    DEC $062E                  ; $870F
    LDA $0046                  ; $8712
    BIT $062D                  ; $8714
    BVS $871C                  ; $8717
    CLC                        ; $8719
    ADC #$0B                   ; $871A
    RTS                        ; $871C
    .byte $38
    RTS                        ; $871E
    .byte $A5,$46
    CMP #$0B                   ; $8721
    BCS $8739                  ; $8723
    CMP $0441                  ; $8725
    BEQ $8739                  ; $8728
    LDX $0430                  ; $872A
    BEQ $8737                  ; $872D
    CMP $0430,X                ; $872F
    BEQ $8739                  ; $8732
    DEX                        ; $8734
    BNE $872F                  ; $8735
    CLC                        ; $8737
    RTS                        ; $8738
    SEC                        ; $8739
    RTS                        ; $873A
    .byte $A5,$46
    CMP $0441                  ; $873D
    BEQ $8751                  ; $8740
    LDX $0600                  ; $8742
    BEQ $874F                  ; $8745
    CMP $0600,X                ; $8747
    BEQ $8751                  ; $874A
    DEX                        ; $874C
    BNE $8747                  ; $874D
    SEC                        ; $874F
    RTS                        ; $8750
    CLC                        ; $8751
    RTS                        ; $8752
    LDA $062D                  ; $8753
    AND #$0F                   ; $8756
    JSR $C509                  ; $8758
    .byte $67,$87,$68,$87,$71,$87,$84,$87,$67,$87,$00,$00,$60,$AD,$24,$06
    JSR $C536                  ; $876B
    JMP $87E7                  ; $876E
    .byte $AD,$FC,$05
    JSR $C50C                  ; $8774
    LDY #$06                   ; $8777
    LDA ($0034),Y              ; $8779
    TAX                        ; $877B
    LDY #$08                   ; $877C
    LDA ($0034),Y              ; $877E
    TAY                        ; $8780
    JMP $87E7                  ; $8781
    .byte $AD,$24,$06
    JSR $87A7                  ; $8787
    PHA                        ; $878A
    LDA $0624                  ; $878B
    JSR $87C7                  ; $878E
    PLA                        ; $8791
    TAX                        ; $8792
    JMP $87E7                  ; $8793
    .byte $A9,$10
    JSR $87A7                  ; $8798
    STA $0635                  ; $879B
    LDA #$10                   ; $879E
    JSR $87C7                  ; $87A0
    STA $0637                  ; $87A3
    RTS                        ; $87A6
    STA $003E                  ; $87A7
    LDA $062C                  ; $87A9
    JSR $C545                  ; $87AC
    STX $003C                  ; $87AF
    STY $003D                  ; $87B1
    LDX $0639                  ; $87B3
    LDY $0635                  ; $87B6
    CLC                        ; $87B9
    TXA                        ; $87BA
    ADC $003C                  ; $87BB
    TAX                        ; $87BD
    TYA                        ; $87BE
    ADC $003D                  ; $87BF
    TAY                        ; $87C1
    DEC $003E                  ; $87C2
    BPL $87B9                  ; $87C4
    RTS                        ; $87C6
    STA $003E                  ; $87C7
    LDA $062C                  ; $87C9
    JSR $C542                  ; $87CC
    STX $003C                  ; $87CF
    STY $003D                  ; $87D1
    LDX $063B                  ; $87D3
    LDY $0637                  ; $87D6
    CLC                        ; $87D9
    TXA                        ; $87DA
    ADC $003C                  ; $87DB
    TAX                        ; $87DD
    TYA                        ; $87DE
    ADC $003D                  ; $87DF
    TAY                        ; $87E1
    DEC $003E                  ; $87E2
    BPL $87D9                  ; $87E4
    RTS                        ; $87E6
    .byte $8A
    CLC                        ; $87E8
    ADC #$FD                   ; $87E9
    LDX $003B                  ; $87EB
    STA $0203,X                ; $87ED
    TYA                        ; $87F0
    CLC                        ; $87F1
    ADC #$C7                   ; $87F2
    STA $0200,X                ; $87F4
    LDA #$3C                   ; $87F7
    LDY $062D                  ; $87F9
    CPY #$83                   ; $87FC
    PHP                        ; $87FE
    LDY #$01                   ; $87FF
    PLP                        ; $8801
    BNE $8808                  ; $8802
    LDY #$03                   ; $8804
    LDA #$11                   ; $8806
    STA $0201,X                ; $8808
    TYA                        ; $880B
    STA $0202,X                ; $880C
    INX                        ; $880F
    INX                        ; $8810
    INX                        ; $8811
    INX                        ; $8812
    STX $003B                  ; $8813
    INC $0048                  ; $8815
    LDA #$01                   ; $8817
    STA $0532                  ; $8819
    RTS                        ; $881C
    LDY $0640                  ; $881D
    BNE $8834                  ; $8820
    LDY $0641                  ; $8822
    INY                        ; $8825
    CPY #$03                   ; $8826
    BNE $882C                  ; $8828
    LDY #$00                   ; $882A
    STY $0641                  ; $882C
    LDA #$04                   ; $882F
    STA $0640                  ; $8831
    LDA #$00                   ; $8834
    LDY $05FB                  ; $8836
    PHP                        ; $8839
    LDY $0641                  ; $883A
    PLP                        ; $883D
    BNE $8847                  ; $883E
    TYA                        ; $8840
    CLC                        ; $8841
    ADC #$03                   ; $8842
    TAY                        ; $8844
    LDA #$80                   ; $8845
    BIT $0637                  ; $8847
    BMI $884E                  ; $884A
    EOR #$80                   ; $884C
    ORA $0202,X                ; $884E
    STA $0202,X                ; $8851
    LDA $885B,Y                ; $8854
    DEC $0640                  ; $8857
    RTS                        ; $885A
    .byte $36,$37,$3D,$3D,$37,$36,$AD,$2C,$00
    ASL                        ; $8864
    STA $0046                  ; $8865
    ASL                        ; $8867
    ASL                        ; $8868
    ADC $0046                  ; $8869
    TAX                        ; $886B
    LDA #$00                   ; $886C
    STA $0046                  ; $886E
    LDY $0046                  ; $8870
    LDA $88D0,Y                ; $8872
    LDY $003B                  ; $8875
    STA $0201,Y                ; $8877
    LDA $88A8,X                ; $887A
    PHA                        ; $887D
    AND #$F0                   ; $887E
    LSR                        ; $8880
    CLC                        ; $8881
    ADC #$A0                   ; $8882
    STA $0203,Y                ; $8884
    PLA                        ; $8887
    AND #$0F                   ; $8888
    ASL                        ; $888A
    ASL                        ; $888B
    ADC #$A2                   ; $888C
    STA $0200,Y                ; $888E
    LDA #$00                   ; $8891
    STA $0202,Y                ; $8893
    INX                        ; $8896
    INY                        ; $8897
    INY                        ; $8898
    INY                        ; $8899
    INY                        ; $889A
    STY $003B                  ; $889B
    INC $0048                  ; $889D
    INC $0046                  ; $889F
    LDA $0046                  ; $88A1
    CMP #$0A                   ; $88A3
    BNE $8870                  ; $88A5
    RTS                        ; $88A7
