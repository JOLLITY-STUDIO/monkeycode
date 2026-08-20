    INC $00E7                  ; $95E0
    JMP $9515                  ; $95E2
    CMP #$D0                   ; $95E5
    BCC $95EC                  ; $95E7
    JMP $9684                  ; $95E9
    TAX                        ; $95EC
    LDY #$00                   ; $95ED
    LDA ($0094),Y              ; $95EF
    ASL                        ; $95F1
    BPL $95FB                  ; $95F2
    TXA                        ; $95F4
    EOR #$FF                   ; $95F5
    CLC                        ; $95F7
    ADC #$01                   ; $95F8
    TAX                        ; $95FA
    TXA                        ; $95FB
    AND #$08                   ; $95FC
    BNE $9608                  ; $95FE
    TXA                        ; $9600
    AND #$07                   ; $9601
    LDY #$00                   ; $9603
    JMP $960D                  ; $9605
    TXA                        ; $9608
    ORA #$F0                   ; $9609
    LDY #$FF                   ; $960B
    .byte $18
    ADC $00E8                  ; $960E
    LDX $0098                  ; $9610
    STA $046B,X                ; $9612
    TYA                        ; $9615
    ADC $00E9                  ; $9616
    AND #$01                   ; $9618
    STA $00EC                  ; $961A
    LDY #$01                   ; $961C
    LDA ($00E6),Y              ; $961E
    AND #$3C                   ; $9620
    LSR                        ; $9622
    LSR                        ; $9623
    TAY                        ; $9624
    AND #$08                   ; $9625
    BNE $9637                  ; $9627
    TYA                        ; $9629
    CLC                        ; $962A
    ADC $00EA                  ; $962B
    STA $0468,X                ; $962D
    LDA $00EB                  ; $9630
    ADC #$00                   ; $9632
    JMP $9645                  ; $9634
    TYA                        ; $9637
    CLC                        ; $9638
    ADC #$F0                   ; $9639
    CLC                        ; $963B
    ADC $00EA                  ; $963C
    STA $0468,X                ; $963E
    LDA $00EB                  ; $9641
    SBC #$00                   ; $9643
    .byte $29,$01
    ASL                        ; $9647
    ORA $00EC                  ; $9648
    ASL                        ; $964A
    ASL                        ; $964B
    STA $00EC                  ; $964C
    LDY #$01                   ; $964E
    LDA ($00E6),Y              ; $9650
    LDY #$00                   ; $9652
    EOR ($0094),Y              ; $9654
    AND #$40                   ; $9656
    ORA $00EC                  ; $9658
    STA $00EC                  ; $965A
    LDY #$01                   ; $965C
    LDA ($00E6),Y              ; $965E
    AND #$03                   ; $9660
    ORA $00EC                  ; $9662
    STA $046A,X                ; $9664
    INY                        ; $9667
    LDA ($00E6),Y              ; $9668
    STA $0469,X                ; $966A
    LDA $0098                  ; $966D
    CLC                        ; $966F
    ADC #$04                   ; $9670
    STA $0098                  ; $9672
    LDA $00E6                  ; $9674
    CLC                        ; $9676
    ADC #$03                   ; $9677
    STA $00E6                  ; $9679
    LDA $00E7                  ; $967B
    ADC #$00                   ; $967D
    STA $00E7                  ; $967F
    JMP $9515                  ; $9681
    .byte $38
    SBC #$F8                   ; $9685
    ASL                        ; $9687
    TAX                        ; $9688
    LDA $9693,X                ; $9689
    PHA                        ; $968C
    LDA $9692,X                ; $968D
    PHA                        ; $9690
    RTS                        ; $9691
    .byte $A1,$96,$A1,$96,$A4,$96,$C6,$96,$A1,$96,$A1,$96,$D5,$96,$F1,$96
    .byte $4C,$A2,$96
    LDY #$13                   ; $96A5
    LDA ($0094),Y              ; $96A7
    CMP #$04                   ; $96A9
    BCS $96AB                  ; $96AB
    TAX                        ; $96AD
    CLC                        ; $96AE
    ADC #$01                   ; $96AF
    STA ($0094),Y              ; $96B1
    TXA                        ; $96B3
    ASL                        ; $96B4
    CLC                        ; $96B5
    ADC #$18                   ; $96B6
    TAY                        ; $96B8
    LDA $00E6                  ; $96B9
    CLC                        ; $96BB
    ADC #$03                   ; $96BC
    STA ($0094),Y              ; $96BE
    LDA $00E7                  ; $96C0
    ADC #$00                   ; $96C2
    INY                        ; $96C4
    STA ($0094),Y              ; $96C5
    LDY #$01                   ; $96C7
    LDA ($00E6),Y              ; $96C9
    TAX                        ; $96CB
    INY                        ; $96CC
    LDA ($00E6),Y              ; $96CD
    STA $00E7                  ; $96CF
    STX $00E6                  ; $96D1
    JMP $9515                  ; $96D3
    LDY #$13                   ; $96D6
    LDA ($0094),Y              ; $96D8
    BEQ $96DA                  ; $96DA
    SEC                        ; $96DC
    SBC #$01                   ; $96DD
    STA ($0094),Y              ; $96DF
    ASL                        ; $96E1
    CLC                        ; $96E2
    ADC #$18                   ; $96E3
    TAY                        ; $96E5
    LDA ($0094),Y              ; $96E6
    STA $00E6                  ; $96E8
    INY                        ; $96EA
    LDA ($0094),Y              ; $96EB
    STA $00E7                  ; $96ED
    JMP $9515                  ; $96EF
    LDY #$00                   ; $96F2
    LDA ($0094),Y              ; $96F4
    AND #$08                   ; $96F6
    BNE $9703                  ; $96F8
    LDA ($0094),Y              ; $96FA
    ORA #$08                   ; $96FC
    STA ($0094),Y              ; $96FE
    JMP $9727                  ; $9700
    LDY #$10                   ; $9703
    LDA ($0094),Y              ; $9705
    INY                        ; $9707
    CLC                        ; $9708
    ADC ($0094),Y              ; $9709
    SEC                        ; $970B
    SBC $0098                  ; $970C
    BEQ $9734                  ; $970E
    BCC $9727                  ; $9710
    LSR                        ; $9712
    LSR                        ; $9713
    TAY                        ; $9714
    LDX $0098                  ; $9715
    LDA #$F8                   ; $9717
    STA $0468,X                ; $9719
    TXA                        ; $971C
    CLC                        ; $971D
    ADC #$04                   ; $971E
    TAX                        ; $9720
    DEY                        ; $9721
    BNE $9717                  ; $9722
    JMP $9734                  ; $9724
    .byte $A5,$98
    TAX                        ; $9729
    LDY #$10                   ; $972A
    SEC                        ; $972C
    SBC ($0094),Y              ; $972D
    INY                        ; $972F
    STA ($0094),Y              ; $9730
    STX $0097                  ; $9732
    .byte $60
    TAX                        ; $9735
    LDA #$00                   ; $9736
    STA ($0094),Y              ; $9738
    INY                        ; $973A
    TXA                        ; $973B
    STA ($0094),Y              ; $973C
    ASL                        ; $973E
    STA $0095,Y                ; $973F
    LDA #$00                   ; $9742
    ADC #$00                   ; $9744
    STA $0096,Y                ; $9746
    RTS                        ; $9749
    LDA ($0094),Y              ; $974A
    ASL                        ; $974C
    INY                        ; $974D
    LDA ($0094),Y              ; $974E
    ROL                        ; $9750
    STA $0095,Y                ; $9751
    LDA #$00                   ; $9754
    ROL                        ; $9756
    STA $0096,Y                ; $9757
    RTS                        ; $975A
    STX $00ED                  ; $975B
    LDA ($0094),Y              ; $975D
    ROL                        ; $975F
    ROL                        ; $9760
    AND #$01                   ; $9761
    EOR #$FF                   ; $9763
    CLC                        ; $9765
    ADC #$01                   ; $9766
    TAX                        ; $9768
    LDA ($0094),Y              ; $9769
    DEY                        ; $976B
    DEY                        ; $976C
    CLC                        ; $976D
    ADC ($0094),Y              ; $976E
    STA ($0094),Y              ; $9770
    STA $00EC                  ; $9772
    INY                        ; $9774
    TXA                        ; $9775
    ADC ($0094),Y              ; $9776
    STA ($0094),Y              ; $9778
    TAX                        ; $977A
    LDY $00ED                  ; $977B
    LDA $00EC                  ; $977D
    CLC                        ; $977F
    ADC ($0094),Y              ; $9780
    STA ($0094),Y              ; $9782
    TXA                        ; $9784
    INY                        ; $9785
    ADC ($0094),Y              ; $9786
    STA ($0094),Y              ; $9788
    RTS                        ; $978A
    .byte $80,$01,$00,$00,$00,$30,$00,$40,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    LDA #$00                   ; $97AB
    STA $00E9                  ; $97AD
    LDA #$01                   ; $97AF
    STA $00EB                  ; $97B1
    JMP $97C4                  ; $97B3
    LDA #$00                   ; $97B6
    STA $00E9                  ; $97B8
    LDA $004A                  ; $97BA
    ORA $004B                  ; $97BC
    BEQ $9819                  ; $97BE
    LDA #$00                   ; $97C0
    STA $00EB                  ; $97C2
    .byte $84,$E6
    STX $00E7                  ; $97C6
    LDY #$01                   ; $97C8
    LDA ($00E6),Y              ; $97CA
    CLC                        ; $97CC
    ADC $00E9                  ; $97CD
    STA $00E8                  ; $97CF
    INY                        ; $97D1
    LDA #$00                   ; $97D2
    BIT $00E9                  ; $97D4
    BPL $97DA                  ; $97D6
    LDA #$FF                   ; $97D8
    ADC ($00E6),Y              ; $97DA
    TAX                        ; $97DC
    LDY #$00                   ; $97DD
    LDA ($00E6),Y              ; $97DF
    LDY $00E8                  ; $97E1
    STA $00E8                  ; $97E3
    AND #$BF                   ; $97E5
    JSR $9B28                  ; $97E7
    LDA $00E8                  ; $97EA
    AND #$3F                   ; $97EC
    LDY #$03                   ; $97EE
    PHA                        ; $97F0
    LDA ($00E6),Y              ; $97F1
    STA $05E8,X                ; $97F3
    INY                        ; $97F6
    INX                        ; $97F7
    PLA                        ; $97F8
    SEC                        ; $97F9
    SBC #$01                   ; $97FA
    BNE $97F0                  ; $97FC
    TYA                        ; $97FE
    CLC                        ; $97FF
    ADC $00E6                  ; $9800
    STA $00E6                  ; $9802
    LDA $00E7                  ; $9804
    ADC #$00                   ; $9806
    STA $00E7                  ; $9808
    JSR $9B5E                  ; $980A
    LDA $00EB                  ; $980D
    BEQ $9814                  ; $980F
    JSR $9FA8                  ; $9811
    BIT $00E8                  ; $9814
    BVC $97C8                  ; $9816
    RTS                        ; $9818
    LDA $0020                  ; $9819
    AND #$7F                   ; $981B
    STA $2000                  ; $981D
    STA $0020                  ; $9820
    LDA $0021                  ; $9822
    AND #$E7                   ; $9824
    STA $2001                  ; $9826
    STA $0021                  ; $9829
    STY $00E6                  ; $982B
    STX $00E7                  ; $982D
    .byte $A0,$01
    LDA ($00E6),Y              ; $9831
    CLC                        ; $9833
    ADC $00E9                  ; $9834
    TAX                        ; $9836
    INY                        ; $9837
    LDA #$00                   ; $9838
    BIT $00E9                  ; $983A
    BPL $9840                  ; $983C
    LDA #$FF                   ; $983E
    ADC ($00E6),Y              ; $9840
    STA $2006                  ; $9842
    STX $2006                  ; $9845
    LDX #$00                   ; $9848
    LDY #$00                   ; $984A
    LDA ($00E6),Y              ; $984C
    BPL $9852                  ; $984E
    LDX #$04                   ; $9850
    STX $2000                  ; $9852
    PHA                        ; $9855
    AND #$3F                   ; $9856
    TAX                        ; $9858
    LDY #$03                   ; $9859
    LDA ($00E6),Y              ; $985B
    STA $2007                  ; $985D
    INY                        ; $9860
    DEX                        ; $9861
    BNE $985B                  ; $9862
    PLA                        ; $9864
    ASL                        ; $9865
    BMI $9877                  ; $9866
    TYA                        ; $9868
    CLC                        ; $9869
    ADC $00E6                  ; $986A
    STA $00E6                  ; $986C
    LDA $00E7                  ; $986E
    ADC #$00                   ; $9870
    STA $00E7                  ; $9872
    JMP $982F                  ; $9874
    LDA $0021                  ; $9877
    ORA #$18                   ; $9879
    STA $2001                  ; $987B
    STA $0021                  ; $987E
    LDA $0020                  ; $9880
    ORA #$80                   ; $9882
    STA $0020                  ; $9884
    STA $2000                  ; $9886
    RTS                        ; $9889
    .byte $84,$E6,$86,$E7,$A4,$E9,$A2,$01,$4C,$EA,$98,$84,$E6
    STX $00E7                  ; $9897
    LDX $00E9                  ; $9899
    LDY #$01                   ; $989B
    JMP $98EA                  ; $989D
    LDA $0020                  ; $98A0
    AND #$7F                   ; $98A2
    STA $2000                  ; $98A4
    STA $0020                  ; $98A7
    LDA $0021                  ; $98A9
    AND #$E7                   ; $98AB
    STA $2001                  ; $98AD
    STA $0021                  ; $98B0
    LDA #$20                   ; $98B2
    STA $2006                  ; $98B4
    LDA #$00                   ; $98B7
    STA $2006                  ; $98B9
    LDY #$08                   ; $98BC
    LDA #$00                   ; $98BE
    TAX                        ; $98C0
    STA $2007                  ; $98C1
    INX                        ; $98C4
    BNE $98C1                  ; $98C5
    DEY                        ; $98C7
    BNE $98C1                  ; $98C8
    LDA $0021                  ; $98CA
    ORA #$18                   ; $98CC
    STA $2001                  ; $98CE
    STA $0021                  ; $98D1
    LDA $0020                  ; $98D3
    ORA #$80                   ; $98D5
    STA $0020                  ; $98D7
    STA $2000                  ; $98D9
    RTS                        ; $98DC
    .byte $A9,$00,$85,$EB,$98,$09,$80,$A8,$4C,$F2,$98,$A9,$00,$85,$EB
    LDA $004A                  ; $98EC
    ORA $004B                  ; $98EE
    BEQ $992C                  ; $98F0
    STY $00E8                  ; $98F2
    STX $00E9                  ; $98F4
    LDA $00E9                  ; $98F6
    LDY $00E6                  ; $98F8
    LDX $00E7                  ; $98FA
    JSR $9B28                  ; $98FC
    LDY $00E9                  ; $98FF
    LDA $00EB                  ; $9901
    STA $05E8,X                ; $9903
    INX                        ; $9906
    DEY                        ; $9907
    BNE $9903                  ; $9908
    JSR $9B5E                  ; $990A
    LDA $00E8                  ; $990D
    BPL $9916                  ; $990F
    .byte $A9,$01,$20,$A8,$9F
    LDA $00E6                  ; $9916
    CLC                        ; $9918
    ADC #$20                   ; $9919
    STA $00E6                  ; $991B
    LDA $00E7                  ; $991D
    ADC #$00                   ; $991F
    STA $00E7                  ; $9921
    DEC $00E8                  ; $9923
    LDA $00E8                  ; $9925
    AND #$7F                   ; $9927
    BNE $98F6                  ; $9929
    RTS                        ; $992B
    LDA $0020                  ; $992C
    AND #$7F                   ; $992E
    STA $2000                  ; $9930
    STA $0020                  ; $9933
    LDA $0021                  ; $9935
    AND #$E7                   ; $9937
    STA $2001                  ; $9939
    STA $0021                  ; $993C
    STX $00E9                  ; $993E
    STY $00E8                  ; $9940
    LDY $00E9                  ; $9942
    LDA $00E7                  ; $9944
    STA $2006                  ; $9946
    LDA $00E6                  ; $9949
    STA $2006                  ; $994B
    LDA $00EB                  ; $994E
    STA $2007                  ; $9950
    DEY                        ; $9953
    BNE $9950                  ; $9954
    LDA $00E6                  ; $9956
    CLC                        ; $9958
    ADC #$20                   ; $9959
    STA $00E6                  ; $995B
    LDA $00E7                  ; $995D
    ADC #$00                   ; $995F
    STA $00E7                  ; $9961
    DEC $00E8                  ; $9963
    BNE $9942                  ; $9965
    LDA $0021                  ; $9967
    ORA #$18                   ; $9969
    STA $2001                  ; $996B
    STA $0021                  ; $996E
    LDA $0020                  ; $9970
    ORA #$80                   ; $9972
    STA $0020                  ; $9974
    STA $2000                  ; $9976
    RTS                        ; $9979
    STA $0048                  ; $997A
    STX $0049                  ; $997C
    JSR $9B07                  ; $997E
    JSR $9AB8                  ; $9981
    JSR $9ADA                  ; $9984
    LDX $00E9                  ; $9987
    JSR $C4B9                  ; $9989
    LDA $004A                  ; $998C
    CMP #$0F                   ; $998E
    BCS $9994                  ; $9990
    INC $004A                  ; $9992
    LDA $004B                  ; $9994
    CMP #$0F                   ; $9996
    BCS $999C                  ; $9998
    INC $004B                  ; $999A
    JSR $9A71                  ; $999C
    LDA #$01                   ; $999F
    JSR $9FA8                  ; $99A1
    LDA $004A                  ; $99A4
    CLC                        ; $99A6
    ADC $004B                  ; $99A7
    CMP #$1E                   ; $99A9
    BCC $998C                  ; $99AB
    RTS                        ; $99AD
    .byte $85,$48,$20,$07,$9B,$20,$B8,$9A,$A6,$E9,$20,$B9,$C4,$A5,$4A,$C9
    .byte $0F,$B0,$0D,$E6,$4A,$20,$71,$9A,$A9,$01,$20,$A8,$9F,$4C,$BB,$99
    .byte $60,$86,$49
    JSR $9B07                  ; $99D1
    JSR $9ADA                  ; $99D4
    LDX $00E9                  ; $99D7
    JSR $C4B9                  ; $99D9
    .byte $A5,$4B
    CMP #$0F                   ; $99DE
    BCS $99EF                  ; $99E0
    INC $004B                  ; $99E2
    JSR $9A71                  ; $99E4
    LDA #$01                   ; $99E7
    JSR $9FA8                  ; $99E9
    JMP $99DC                  ; $99EC
    RTS                        ; $99EF
    .byte $A5,$4A
    ORA $004B                  ; $99F2
