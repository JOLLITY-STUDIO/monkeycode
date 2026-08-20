; ============================================================
; code_data.s - bank02 inline data + routines
; ============================================================

    STA $000E                  ; $85FE
    LDA #$02                   ; $8600
    RTS                        ; $8602
    LDA $000D                  ; $8603
    BNE $8614                  ; $8605
    LDA #$30                   ; $8607
    JSR $8895                  ; $8609
    LDA #$08                   ; $860C
    JSR $8920                  ; $860E
    LDA #$02                   ; $8611
    RTS                        ; $8613
    LDA #$00                   ; $8614
    STA $000D                  ; $8616
    STA $000E                  ; $8618
    LDA #$02                   ; $861A
    RTS                        ; $861C
    LDA #$20                   ; $861D
    JSR $8895                  ; $861F
    LDA #$07                   ; $8622
    JSR $8920                  ; $8624
    LDA #$02                   ; $8627
    RTS                        ; $8629
    LDX #$BD                   ; $862A
    LDY #$23                   ; $862C
    JSR $8976                  ; $862E
    JSR $9A35                  ; $8631
    LDA #$01                   ; $8634
    JSR $9FA8                  ; $8636
    LDA $058F                  ; $8639
    AND #$7F                   ; $863C
    STA $058F                  ; $863E
    LDA #$82                   ; $8641
    STA $004C                  ; $8643
    LDY #$28                   ; $8645
    LDX #$20                   ; $8647
    LDA #$C8                   ; $8649
    JSR $A82F                  ; $864B
    LDA #$02                   ; $864E
    RTS                        ; $8650
    LDA #$00                   ; $8651
    STA $00ED                  ; $8653
    .byte $A4,$ED
    LDA $AA97,Y                ; $8657
    STA $00EA                  ; $865A
    AND #$7F                   ; $865C
    STA $00EB                  ; $865E
    LDA $007B                  ; $8660
    AND #$01                   ; $8662
    ASL                        ; $8664
    ASL                        ; $8665
    ORA $00EB                  ; $8666
    TAX                        ; $8668
    INY                        ; $8669
    LDA $AA97,Y                ; $866A
    STA $00EB                  ; $866D
    INY                        ; $866F
    LDA $AA97,Y                ; $8670
    INY                        ; $8673
    STY $00ED                  ; $8674
    LDY $00EB                  ; $8676
    JSR $9B28                  ; $8678
    AND #$7F                   ; $867B
    STA $00EB                  ; $867D
    LDA #$00                   ; $867F
    STA $05E8,X                ; $8681
    INX                        ; $8684
    DEC $00EB                  ; $8685
    BNE $8681                  ; $8687
    JSR $9B5E                  ; $8689
    BIT $00EA                  ; $868C
    BMI $869A                  ; $868E
    BVC $8655                  ; $8690
    LDA #$02                   ; $8692
    JSR $9FA8                  ; $8694
    JMP $A655                  ; $8697
    LDA #$02                   ; $869A
    RTS                        ; $869C
    LDA $04E5                  ; $869D
    CMP #$FF                   ; $86A0
    BEQ $86D4                  ; $86A2
    JSR $A767                  ; $86A4
    LDY #$80                   ; $86A7
    LDA #$00                   ; $86A9
    STA $00EA                  ; $86AB
    LDX #$2F                   ; $86AD
    LDA #$FF                   ; $86AF
    STA $00ED                  ; $86B1
    LDA #$FE                   ; $86B3
    STA $00EC                  ; $86B5
    LDA #$07                   ; $86B7
    STA $00EB                  ; $86B9
    LDA #$F7                   ; $86BB
    JSR $A72C                  ; $86BD
    LDY #$D8                   ; $86C0
    LDX #$30                   ; $86C2
    LDA #$01                   ; $86C4
    STA $00ED                  ; $86C6
    LDA #$FF                   ; $86C8
    STA $00EC                  ; $86CA
    LDA #$FC                   ; $86CC
    JSR $A72C                  ; $86CE
    LDA #$02                   ; $86D1
    RTS                        ; $86D3
    JSR $A767                  ; $86D4
    LDY #$80                   ; $86D7
    LDX #$2F                   ; $86D9
    LDA #$02                   ; $86DB
    STA $00EA                  ; $86DD
    LDA #$FF                   ; $86DF
    STA $00ED                  ; $86E1
    LDA #$FE                   ; $86E3
    STA $00EC                  ; $86E5
    LDA #$07                   ; $86E7
    STA $00EB                  ; $86E9
    LDA #$F7                   ; $86EB
    JSR $A72C                  ; $86ED
    LDX #$08                   ; $86F0
    LDA #$FE                   ; $86F2
    JSR $A72C                  ; $86F4
    LDY #$FC                   ; $86F7
    LDA $A67B,Y                ; $86F9
    STA $0460,Y                ; $86FC
    INY                        ; $86FF
    BNE $86F9                  ; $8700
    LDY #$B8                   ; $8702
    LDX #$1C                   ; $8704
    LDA #$02                   ; $8706
    STA $00ED                  ; $8708
    LDA #$FF                   ; $870A
    STA $00EC                  ; $870C
    LDA #$03                   ; $870E
    STA $00EB                  ; $8710
    LDA #$F6                   ; $8712
    JSR $A72C                  ; $8714
    LDY #$D8                   ; $8717
    LDA $046A,Y                ; $8719
    ORA #$02                   ; $871C
    STA $046A,Y                ; $871E
    INY                        ; $8721
    INY                        ; $8722
    INY                        ; $8723
    INY                        ; $8724
    CPY #$F0                   ; $8725
    BCC $8719                  ; $8727
    LDA #$02                   ; $8729
    RTS                        ; $872B
    STA $00E9                  ; $872C
    LDA $04E4                  ; $872E
    CLC                        ; $8731
    ADC $00ED                  ; $8732
    STA $04E4                  ; $8734
    LDA $04E7                  ; $8737
    CLC                        ; $873A
    ADC $00EC                  ; $873B
    STA $04E7                  ; $873D
    AND $00EB                  ; $8740
    BNE $875E                  ; $8742
    LDA $04E4                  ; $8744
    STA $0468,Y                ; $8747
    LDA $00E9                  ; $874A
    STA $0469,Y                ; $874C
    LDA $00EA                  ; $874F
    STA $046A,Y                ; $8751
    LDA $04E7                  ; $8754
    STA $046B,Y                ; $8757
    INY                        ; $875A
    INY                        ; $875B
    INY                        ; $875C
    INY                        ; $875D
    LDA #$01                   ; $875E
    JSR $9FA8                  ; $8760
    DEX                        ; $8763
    BNE $872E                  ; $8764
    RTS                        ; $8766
    LDY #$FC                   ; $8767
    LDA $A677,Y                ; $8769
    STA $03E8,Y                ; $876C
    INY                        ; $876F
    BNE $8769                  ; $8770
    RTS                        ; $8772
    .byte $79,$FF,$03,$C2,$46,$F6,$02,$52
    LDA #$80                   ; $877B
    JSR $8895                  ; $877D
    LDA #$02                   ; $8780
    RTS                        ; $8782
    LDA #$02                   ; $8783
    JSR $9FA8                  ; $8785
    JSR $88FB                  ; $8788
    LDA #$02                   ; $878B
    RTS                        ; $878D
    .byte $A0,$40,$A9,$01,$20,$A8,$9F,$A2,$20,$BD,$68,$04,$10,$08,$BD,$6A
    .byte $04,$09,$08,$9D,$6A,$04,$E8,$E8,$E8,$E8,$E0,$C4,$D0,$EB,$88,$D0
    .byte $E1,$20,$91,$9B,$A9,$01,$20,$A8,$9F,$A5,$09,$D0,$F7,$4C,$51,$A6
    LDA #$01                   ; $87BE
    JSR $9FA8                  ; $87C0
    LDY #$28                   ; $87C3
    LDX #$64                   ; $87C5
    LDA #$B0                   ; $87C7
    JSR $A82F                  ; $87C9
    LDA #$02                   ; $87CC
    RTS                        ; $87CE
    LDA #$81                   ; $87CF
    JSR $8895                  ; $87D1
    LDA #$02                   ; $87D4
    RTS                        ; $87D6
    LDY #$80                   ; $87D7
    LDA #$01                   ; $87D9
    JSR $9FA8                  ; $87DB
    LDX #$20                   ; $87DE
    LDA $0468,X                ; $87E0
    BPL $87ED                  ; $87E3
    LDA $046A,X                ; $87E5
    ORA #$04                   ; $87E8
    STA $046A,X                ; $87EA
    INX                        ; $87ED
    INX                        ; $87EE
    INX                        ; $87EF
    INX                        ; $87F0
    CPX #$C4                   ; $87F1
    BNE $87E0                  ; $87F3
    DEY                        ; $87F5
    BNE $87D9                  ; $87F6
    LDA #$02                   ; $87F8
    RTS                        ; $87FA
    .byte $A5,$28,$20,$7C,$9E,$A5,$EC,$29,$F0,$F0,$11,$20,$6D,$AC,$A6,$52
    .byte $A4,$53,$20,$CA,$88,$E6,$53,$A9,$06,$20,$A8,$9F,$A5,$EC,$29,$0F
    .byte $20,$71,$AC,$A6,$52,$A4,$53,$20,$CA,$88,$E6,$53,$A9,$06,$20,$A8
    .byte $9F,$A9,$02,$60
    STA $00EC                  ; $882F
    STX $00ED                  ; $8831
    LDA #$01                   ; $8833
    JSR $9FA8                  ; $8835
    LDX $00ED                  ; $8838
    LDA $0468,X                ; $883A
    CMP #$82                   ; $883D
    BCS $8849                  ; $883F
    LDA $046A,X                ; $8841
    AND #$F3                   ; $8844
    STA $046A,X                ; $8846
    INX                        ; $8849
    INX                        ; $884A
    INX                        ; $884B
    INX                        ; $884C
    CPX $00EC                  ; $884D
    BNE $883A                  ; $884F
    DEY                        ; $8851
    BNE $8833                  ; $8852
    RTS                        ; $8854
    .byte $A5,$E4
    CMP $0026                  ; $8857
    BCS $88A8                  ; $8859
    LDA $0026                  ; $885B
    BEQ $887C                  ; $885D
    CMP #$06                   ; $885F
    BEQ $8884                  ; $8861
    CMP #$0C                   ; $8863
    BEQ $887C                  ; $8865
    CMP #$10                   ; $8867
    BEQ $888C                  ; $8869
    JMP $A8A8                  ; $886B
    .byte $A5,$26
    CMP #$06                   ; $8870
    BCC $887C                  ; $8872
    CMP #$0C                   ; $8874
    BCC $8884                  ; $8876
    CMP #$10                   ; $8878
    BCS $888C                  ; $887A
    LDX #$00                   ; $887C
    JSR $A8B7                  ; $887E
    JMP $A8A3                  ; $8881
    LDX #$0C                   ; $8884
    JSR $A8B7                  ; $8886
    JMP $A8A3                  ; $8889
    LDX #$18                   ; $888C
    JSR $A8B7                  ; $888E
    LDY #$00                   ; $8891
    LDA $AA47,X                ; $8893
    STA $0408,Y                ; $8896
    INX                        ; $8899
    TYA                        ; $889A
    CLC                        ; $889B
    ADC #$04                   ; $889C
    TAY                        ; $889E
    CMP #$28                   ; $889F
    BCC $8893                  ; $88A1
    .byte $BD,$47,$AA
    STA $002C                  ; $88A6
    .byte $A6,$26
    LDA $AA75,X                ; $88AA
    STA $002A                  ; $88AD
    LDA $0026                  ; $88AF
    CLC                        ; $88B1
    ADC #$03                   ; $88B2
    STA $002B                  ; $88B4
    RTS                        ; $88B6
    LDA #$0B                   ; $88B7
    STA $00ED                  ; $88B9
    LDY #$00                   ; $88BB
    LDA $AA47,X                ; $88BD
    STA $0300,Y                ; $88C0
    INX                        ; $88C3
    TYA                        ; $88C4
    CLC                        ; $88C5
    ADC #$0C                   ; $88C6
    TAY                        ; $88C8
    CMP #$84                   ; $88C9
    BCC $88BD                  ; $88CB
    RTS                        ; $88CD
    .byte $A9,$01
    JSR $9FA8                  ; $88D0
    LDY #$00                   ; $88D3
    LDX $0468,Y                ; $88D5
    LDA $046A,Y                ; $88D8
    AND #$0C                   ; $88DB
    BEQ $88E1                  ; $88DD
    LDX #$F8                   ; $88DF
    TXA                        ; $88E1
    STA $0200,Y                ; $88E2
    LDA $0469,Y                ; $88E5
    STA $0201,Y                ; $88E8
    LDA $046A,Y                ; $88EB
    STA $0202,Y                ; $88EE
    LDA $046B,Y                ; $88F1
    STA $0203,Y                ; $88F4
    INY                        ; $88F7
    INY                        ; $88F8
    INY                        ; $88F9
    INY                        ; $88FA
    BNE $88D5                  ; $88FB
    RTS                        ; $88FD
