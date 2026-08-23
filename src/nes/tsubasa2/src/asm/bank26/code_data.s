; ============================================================
; code_data.s - bank26 inline data + routines
; ============================================================

    STA $0616                  ; $94FA
    LDA $0612                  ; $94FD
    JSR $C509                  ; $9500
    .byte $AC,$85,$DF,$8B,$1C,$86
    LDA #$00                   ; $9509
    STA $043C                  ; $950B
    STA $043E                  ; $950E
    STA $044E                  ; $9511
    LDA #$05                   ; $9514
    STA $0621                  ; $9516
    JSR $C600                  ; $9519
    LDA #$0D                   ; $951C
    JSR $C54B                  ; $951E
    JSR $8F72                  ; $9521
    LDA #$08                   ; $9524
    JSR $C54B                  ; $9526
    LDA #$00                   ; $9529
    STA $003A                  ; $952B
    STA $003B                  ; $952D
    LDA #$09                   ; $952F
    LDX #$80                   ; $9531
    JSR $8F1F                  ; $9533
    PHA                        ; $9536
    LDY #$00                   ; $9537
    LDX $043B                  ; $9539
    CPX $043D                  ; $953C
    BNE $9546                  ; $953F
    CMP #$C8                   ; $9541
    BCS $9546                  ; $9543
    INY                        ; $9545
    TYA                        ; $9546
    BNE $9559                  ; $9547
    LDA $043B                  ; $9549
    CMP #$08                   ; $954C
    BEQ $9559                  ; $954E
    LDA a: $00E2               ; $9550
    CMP #$1F                   ; $9553
    BCS $9559                  ; $9555
    LDY #$02                   ; $9557
    PLA                        ; $9559
    JSR $8148                  ; $955A
    RTS                        ; $955D
    .byte $AD,$FB,$05
    JSR $C50C                  ; $9561
    LDY #$0A                   ; $9564
    LDA #$00                   ; $9566
    STA ($0034),Y              ; $9568
    LDA #$05                   ; $956A
    LDX $05FB                  ; $956C
    STX $0441                  ; $956F
    BEQ $9576                  ; $9572
    LDA #$E9                   ; $9574
    STA $05FE                  ; $9576
    JSR $C536                  ; $9579
    STX $0635                  ; $957C
    STY $0637                  ; $957F
    LDA #$27                   ; $9582
    JSR $C54E                  ; $9584
    JSR $987B                  ; $9587
    LDA #$0A                   ; $958A
    JSR $9E0D                  ; $958C
    LDA a: $00E2               ; $958F
    AND #$0F                   ; $9592
    CMP #$0A                   ; $9594
    BCC $959A                  ; $9596
    SBC #$0A                   ; $9598
    SEC                        ; $959A
    ADC $05FB                  ; $959B
    STA $05FC                  ; $959E
    JSR $C56F                  ; $95A1
    JSR $C61E                  ; $95A4
    LDA $05FB                  ; $95A7
    JSR $8E6E                  ; $95AA
    LDA #$01                   ; $95AD
    STA $043B                  ; $95AF
    LDA #$00                   ; $95B2
    STA $043C                  ; $95B4
    LDA #$28                   ; $95B7
    JSR $C54E                  ; $95B9
    LDA #$02                   ; $95BC
    LDX #$0C                   ; $95BE
    JSR $9110                  ; $95C0
    LDA #$1A                   ; $95C3
    STA $061A                  ; $95C5
    LDA #$01                   ; $95C8
    STA $061B                  ; $95CA
    JSR $C60C                  ; $95CD
    LDA $05FC                  ; $95D0
    STA $0441                  ; $95D3
    LDA #$1C                   ; $95D6
    JSR $C54E                  ; $95D8
    LDX #$50                   ; $95DB
    TXS                        ; $95DD
    JMP $C60F                  ; $95DE
    JSR $96CC                  ; $95E1
    LDA #$00                   ; $95E4
    STA $0616                  ; $95E6
    STA $038E                  ; $95E9
    STA $038B                  ; $95EC
    STA $030A                  ; $95EF
    STA $0307                  ; $95F2
    BIT a: $00E2               ; $95F5
    BPL $95FC                  ; $95F8
    LDA #$0B                   ; $95FA
    STA $05FB                  ; $95FC
    STA $0619                  ; $95FF
    LDA #$41                   ; $9602
    JSR $C52A                  ; $9604
    LDA #$33                   ; $9607
    JSR $C55D                  ; $9609
    LDA #$39                   ; $960C
    JSR $C54E                  ; $960E
    LDA $0616                  ; $9611
    LSR                        ; $9614
    STA $0617                  ; $9615
    BCS $9623                  ; $9618
    CMP #$05                   ; $961A
    BNE $9623                  ; $961C
    LDA #$45                   ; $961E
    JSR $C54E                  ; $9620
    LDA $0617                  ; $9623
    CMP #$0A                   ; $9626
    BCC $962E                  ; $9628
    .byte $E9,$0A,$B0,$F8
    TAX                        ; $962E
    LDA $05FB                  ; $962F
    BEQ $963C                  ; $9632
    STX $003A                  ; $9634
    LDA #$09                   ; $9636
    SEC                        ; $9638
    SBC $003A                  ; $9639
    TAX                        ; $963B
    LDA $0431,X                ; $963C
    LDX $05FB                  ; $963F
    BEQ $9647                  ; $9642
    CLC                        ; $9644
    ADC #$0B                   ; $9645
    STA $0441                  ; $9647
    LDA #$22                   ; $964A
    JSR $C54E                  ; $964C
    JSR $9509                  ; $964F
    LDA #$23                   ; $9652
    JSR $C54E                  ; $9654
    JSR $96AE                  ; $9657
    LDA $0616                  ; $965A
    INC $0616                  ; $965D
    LSR                        ; $9660
    PHP                        ; $9661
    STA $003A                  ; $9662
    SEC                        ; $9664
    LDA #$03                   ; $9665
    SBC $003A                  ; $9667
    TAX                        ; $9669
    BCS $966E                  ; $966A
    LDX #$FF                   ; $966C
    INX                        ; $966E
    INX                        ; $966F
    PLP                        ; $9670
    BCS $9674                  ; $9671
    INX                        ; $9673
    STX $003A                  ; $9674
    LDA $0610                  ; $9676
    SEC                        ; $9679
    SBC $0611                  ; $967A
    BCS $9683                  ; $967D
    EOR #$FF                   ; $967F
    ADC #$01                   ; $9681
    CMP $003A                  ; $9683
    BCS $9692                  ; $9685
    LDA $05FB                  ; $9687
    EOR #$0B                   ; $968A
    STA $05FB                  ; $968C
    JMP $9611                  ; $968F
    LDX #$00                   ; $9692
    JSR $96A3                  ; $9694
    INX                        ; $9697
    JSR $96A3                  ; $9698
    LDA #$33                   ; $969B
    JSR $C54E                  ; $969D
    JMP $C554                  ; $96A0
    LDA $0610,X                ; $96A3
    CLC                        ; $96A6
    ADC a: $0028,X             ; $96A7
    STA a: $0028,X             ; $96AA
    RTS                        ; $96AD
    LDA $0612                  ; $96AE
    JSR $C509                  ; $96B1
    .byte $BA,$96,$CA,$96,$CB,$96,$AE,$FB,$05
    BEQ $96C1                  ; $96BD
    LDX #$01                   ; $96BF
    INC $0610,X                ; $96C1
    LDA #$41                   ; $96C4
    JSR $C52A                  ; $96C6
    RTS                        ; $96C9
    .byte $60,$60
    LDA #$01                   ; $96CC
    JSR $C55D                  ; $96CE
    LDA #$00                   ; $96D1
    STA $0011                  ; $96D3
    STA $0012                  ; $96D5
    LDA #$00                   ; $96D7
    STA $0430                  ; $96D9
    STA $053C                  ; $96DC
    LDA #$80                   ; $96DF
    STA $053A                  ; $96E1
    LDX #$00                   ; $96E4
    LDA #$12                   ; $96E6
    JSR $C530                  ; $96E8
    JSR $C533                  ; $96EB
    .byte $00,$6C,$04
    LDA #$02                   ; $96F1
    JSR $C515                  ; $96F3
    LDA #$00                   ; $96F6
    STA $0469                  ; $96F8
    LDA #$00                   ; $96FB
    STA $0469                  ; $96FD
    STA $E000                  ; $9700
    LDA #$00                   ; $9703
    STA $0490                  ; $9705
    LDA #$2E                   ; $9708
    STA $0491                  ; $970A
    LDA #$00                   ; $970D
    STA $05CE                  ; $970F
    STA $004A                  ; $9712
    STA $004B                  ; $9714
    LDA $0020                  ; $9716
    AND #$FC                   ; $9718
    STA $0020                  ; $971A
    LDA #$3E                   ; $971C
    JSR $C52A                  ; $971E
    JSR $986B                  ; $9721
    LDX #$00                   ; $9724
    LDA #$13                   ; $9726
    JSR $C530                  ; $9728
    JSR $C533                  ; $972B
    .byte $00,$6C,$04
    LDA #$00                   ; $9731
    STA $0624                  ; $9733
    JSR $9828                  ; $9736
    LDA #$01                   ; $9739
    JSR $C515                  ; $973B
    LDA #$0C                   ; $973E
    AND a: $001E               ; $9740
    BEQ $9777                  ; $9743
    PHA                        ; $9745
    LDA #$09                   ; $9746
    SEC                        ; $9748
    SBC $0430                  ; $9749
    STA $003A                  ; $974C
    PLA                        ; $974E
    LDX #$01                   ; $974F
    AND #$04                   ; $9751
    BNE $9757                  ; $9753
    LDX #$FF                   ; $9755
    TXA                        ; $9757
    CLC                        ; $9758
    ADC $0624                  ; $9759
    BMI $9777                  ; $975C
    CMP $003A                  ; $975E
    BCC $9764                  ; $9760
    LDA $003A                  ; $9762
    CMP $0624                  ; $9764
    BEQ $9777                  ; $9767
    PHA                        ; $9769
    LDA $0624                  ; $976A
    JSR $982C                  ; $976D
    PLA                        ; $9770
    STA $0624                  ; $9771
    JSR $9828                  ; $9774
    LDA #$40                   ; $9777
    AND a: $001E               ; $9779
    BEQ $9789                  ; $977C
    LDX $0430                  ; $977E
    BEQ $9789                  ; $9781
    DEC $0430                  ; $9783
    JSR $986B                  ; $9786
    LDA #$80                   ; $9789
    AND a: $001E               ; $978B
    BEQ $97F6                  ; $978E
    LDA $0430                  ; $9790
    CMP #$05                   ; $9793
    BNE $979A                  ; $9795
    JMP $97F9                  ; $9797
    LDA $0624                  ; $979A
    STA $003A                  ; $979D
    LDA #$01                   ; $979F
    STA $003B                  ; $97A1
    LDA #$00                   ; $97A3
    STA $003C                  ; $97A5
    LDA $003B                  ; $97A7
    LDX $0430                  ; $97A9
    BEQ $97BC                  ; $97AC
    CMP $0430,X                ; $97AE
    BEQ $97B8                  ; $97B1
    DEX                        ; $97B3
    BNE $97AE                  ; $97B4
    BEQ $97BC                  ; $97B6
    INC $003B                  ; $97B8
    BNE $97A7                  ; $97BA
    LDA $003C                  ; $97BC
    INC $003C                  ; $97BE
    CMP $003A                  ; $97C0
    BEQ $97C8                  ; $97C2
    INC $003B                  ; $97C4
    BNE $97A7                  ; $97C6
    LDA $003B                  ; $97C8
    LDX $0430                  ; $97CA
    STA $0431,X                ; $97CD
    INC $0430                  ; $97D0
    LDA #$09                   ; $97D3
    SEC                        ; $97D5
    SBC $0430                  ; $97D6
    STA $003A                  ; $97D9
    LDA $0624                  ; $97DB
    SBC $003A                  ; $97DE
    BCC $97F3                  ; $97E0
    LDA $0624                  ; $97E2
    LDX $003A                  ; $97E5
    STX $0624                  ; $97E7
    JSR $982C                  ; $97EA
    LDA $0624                  ; $97ED
    JSR $9828                  ; $97F0
    JSR $986B                  ; $97F3
    JMP $9739                  ; $97F6
    LDA #$01                   ; $97F9
    STA $003A                  ; $97FB
    LDY #$0A                   ; $97FD
    LDX #$00                   ; $97FF
    LDA $003A                  ; $9801
    CMP $0431,X                ; $9803
    BEQ $9816                  ; $9806
    INX                        ; $9808
    CPX #$05                   ; $9809
    BNE $9803                  ; $980B
    LDX $0430                  ; $980D
    STA $0431,X                ; $9810
    INC $0430                  ; $9813
    INC $003A                  ; $9816
    DEY                        ; $9818
    BNE $97FF                  ; $9819
    JSR $C569                  ; $981B
    LDA #$00                   ; $981E
    STA $008E                  ; $9820
    LDA #$01                   ; $9822
    STA $0469                  ; $9824
    RTS                        ; $9827
    LDX #$B1                   ; $9828
    BNE $982E                  ; $982A
    LDX #$00                   ; $982C
    PHA                        ; $982E
    LDA #$01                   ; $982F
    JSR $C515                  ; $9831
    LDA $0515                  ; $9834
    BNE $982F                  ; $9837
    LDA #$01                   ; $9839
    STA $0515                  ; $983B
    LDY #$01                   ; $983E
    STY $04A5                  ; $9840
    DEY                        ; $9843
    STY $04A9                  ; $9844
    STX $04A8                  ; $9847
    PLA                        ; $984A
    STY $04A6                  ; $984B
    LSR                        ; $984E
    ROR $04A6                  ; $984F
    LSR                        ; $9852
    ROR $04A6                  ; $9853
    PHA                        ; $9856
    LDA $04A6                  ; $9857
    ADC #$02                   ; $985A
    STA $04A6                  ; $985C
    PLA                        ; $985F
    ADC #$21                   ; $9860
    STA $04A7                  ; $9862
    LDA #$80                   ; $9865
    STA $0515                  ; $9867
    RTS                        ; $986A
    LDA #$01                   ; $986B
    STA $0441                  ; $986D
    LDA #$3F                   ; $9870
    JSR $C52A                  ; $9872
    LDA #$40                   ; $9875
    JSR $C52A                  ; $9877
    RTS                        ; $987A
    LDA #$37                   ; $987B
    JSR $C54E                  ; $987D
    LDA #$00                   ; $9880
    STA $0011                  ; $9882
    STA $0012                  ; $9884
    LDA #$01                   ; $9886
    JSR $C515                  ; $9888
    JSR $C52D                  ; $988B
    LDA #$2E                   ; $988E
    STA $0087                  ; $9890
    LDA #$00                   ; $9892
    STA $062D                  ; $9894
    JSR $990C                  ; $9897
    LDA #$33                   ; $989A
    JSR $C52A                  ; $989C
    LDA #$04                   ; $989F
    STA $0624                  ; $98A1
    JSR $9D1B                  ; $98A4
    LDA #$01                   ; $98A7
    JSR $C515                  ; $98A9
    LDA #$0C                   ; $98AC
    AND a: $001E               ; $98AE
    BEQ $98BE                  ; $98B1
    LDA $0624                  ; $98B3
    EOR #$40                   ; $98B6
    STA $0624                  ; $98B8
    JSR $9D1B                  ; $98BB
    BIT a: $001C               ; $98BE
    BPL $98A7                  ; $98C1
    JSR $990C                  ; $98C3
    BIT $0624                  ; $98C6
    BVS $98D0                  ; $98C9
    LDA #$02                   ; $98CB
    STA $0087                  ; $98CD
    RTS                        ; $98CF
    LDA #$00                   ; $98D0
    STA $0624                  ; $98D2
    .byte $A9,$34
    JSR $C52A                  ; $98D7
    LDA #$03                   ; $98DA
    STA $063D                  ; $98DC
    JSR $C566                  ; $98DF
    LDA #$85                   ; $98E2
    STA $062D                  ; $98E4
    LDA $0624                  ; $98E7
    STA $0622                  ; $98EA
    LDA #$04                   ; $98ED
    JSR $C563                  ; $98EF
    BCC $9892                  ; $98F2
    CMP #$04                   ; $98F4
    BEQ $9892                  ; $98F6
    STA $0624                  ; $98F8
    JSR $9901                  ; $98FB
    JMP $98D5                  ; $98FE
    JSR $C509                  ; $9901
    .byte $1A,$99,$3A,$99,$50,$99,$AD,$9B,$20,$2D,$C5
    LDA #$00                   ; $990F
    JSR $C52A                  ; $9911
    LDA #$01                   ; $9914
    JSR $C52A                  ; $9916
    RTS                        ; $9919
    .byte $A9,$35
    JSR $C52A                  ; $991C
    LDA a: $002C               ; $991F
    STA $0622                  ; $9922
    LDA a: $002C               ; $9925
    STA $0627                  ; $9928
    LDA #$05                   ; $992B
    JSR $C563                  ; $992D
    LDX $0627                  ; $9930
    BCC $9936                  ; $9933
    TAX                        ; $9935
    STX a: $002C               ; $9936
    RTS                        ; $9939
    .byte $A9,$36
    JSR $C52A                  ; $993C
    LDA a: $002D               ; $993F
    STA $0622                  ; $9942
    LDA #$06                   ; $9945
    JSR $C563                  ; $9947
    BCC $994F                  ; $994A
    STA a: $002D               ; $994C
    RTS                        ; $994F
    .byte $AD,$2A,$00
    CMP #$02                   ; $9953
    BEQ $995A                  ; $9955
    JMP $9AC7                  ; $9957
    LDA #$37                   ; $995A
    JSR $C52A                  ; $995C
    LDA #$00                   ; $995F
    STA $0622                  ; $9961
    LDA #$07                   ; $9964
    JSR $C563                  ; $9966
    BCS $996C                  ; $9969
    RTS                        ; $996B
    JSR $9972                  ; $996C
    JMP $990C                  ; $996F
    JSR $C509                  ; $9972
    .byte $79,$99,$C7,$9A,$AD,$50,$04
    CMP #$03                   ; $997C
    BCC $9992                  ; $997E
    LDA #$38                   ; $9980
    JSR $C52A                  ; $9982
    LDA #$01                   ; $9985
    JSR $C515                  ; $9987
    LDA #$C0                   ; $998A
    AND a: $001E               ; $998C
    BEQ $9985                  ; $998F
    RTS                        ; $9991
    LDA #$00                   ; $9992
    STA $062D                  ; $9994
    LDA #$3A                   ; $9997
    JSR $C52A                  ; $9999
    LDA #$00                   ; $999C
    PHA                        ; $999E
    JSR $9AAC                  ; $999F
    BCC $99AD                  ; $99A2
    PLA                        ; $99A4
    PHA                        ; $99A5
    LDY #$2C                   ; $99A6
    LDX #$B2                   ; $99A8
    JSR $9F41                  ; $99AA
    PLA                        ; $99AD
    CLC                        ; $99AE
    ADC #$01                   ; $99AF
    CMP #$0A                   ; $99B1
    BNE $999E                  ; $99B3
    LDA #$00                   ; $99B5
    PHA                        ; $99B7
    JSR $9AAC                  ; $99B8
    PLA                        ; $99BB
    BCC $99C5                  ; $99BC
    CLC                        ; $99BE
    ADC #$01                   ; $99BF
    CMP #$0A                   ; $99C1
    BNE $99B7                  ; $99C3
    STA $0625                  ; $99C5
    LDY #$2C                   ; $99C8
    JSR $9F37                  ; $99CA
    LDA #$01                   ; $99CD
    JSR $C515                  ; $99CF
    LDA $0625                  ; $99D2
    JSR $9B90                  ; $99D5
    BCC $99FE                  ; $99D8
    LDA $9F0F,X                ; $99DA
    PHA                        ; $99DD
    JSR $9AAC                  ; $99DE
    PLA                        ; $99E1
    BCC $99EC                  ; $99E2
    LDX $003A                  ; $99E4
    JSR $9BA4                  ; $99E6
    JMP $99DA                  ; $99E9
    PHA                        ; $99EC
    LDA $0625                  ; $99ED
    LDY #$2C                   ; $99F0
    JSR $9F3F                  ; $99F2
    PLA                        ; $99F5
    STA $0625                  ; $99F6
    LDY #$2C                   ; $99F9
    JSR $9F37                  ; $99FB
    LDA #$80                   ; $99FE
    AND a: $001E               ; $9A00
    BNE $9A0D                  ; $9A03
    LDA #$40                   ; $9A05
    AND a: $001E               ; $9A07
    BEQ $99CD                  ; $9A0A
    RTS                        ; $9A0C
    LDA #$3B                   ; $9A0D
    JSR $C52A                  ; $9A0F
    LDA #$01                   ; $9A12
    LDX $0625                  ; $9A14
    CPX #$08                   ; $9A17
    BCC $9A1D                  ; $9A19
    LDA #$00                   ; $9A1B
    STA $0626                  ; $9A1D
    LDY #$16                   ; $9A20
    JSR $9F37                  ; $9A22
    LDA #$01                   ; $9A25
    JSR $C515                  ; $9A27
    LDA $0626                  ; $9A2A
    BEQ $9A49                  ; $9A2D
    JSR $9B90                  ; $9A2F
    BCC $9A49                  ; $9A32
    LDA $9EB7,X                ; $9A34
    PHA                        ; $9A37
    LDA $0626                  ; $9A38
    LDY #$16                   ; $9A3B
    JSR $9F3F                  ; $9A3D
    PLA                        ; $9A40
    STA $0626                  ; $9A41
    LDY #$16                   ; $9A44
    JSR $9F37                  ; $9A46
    LDA #$40                   ; $9A49
    AND a: $001E               ; $9A4B
    BEQ $9A53                  ; $9A4E
    JMP $9979                  ; $9A50
    LDA #$80                   ; $9A53
    AND a: $001E               ; $9A55
    BEQ $9A25                  ; $9A58
    LDA $0625                  ; $9A5A
    CLC                        ; $9A5D
    ADC #$16                   ; $9A5E
    JSR $C50C                  ; $9A60
    LDA $0034                  ; $9A63
    STA $003A                  ; $9A65
    LDA $0035                  ; $9A67
    STA $003B                  ; $9A69
    LDA $0626                  ; $9A6B
    JSR $C50C                  ; $9A6E
    LDY #$00                   ; $9A71
    LDA ($003A),Y              ; $9A73
    TAX                        ; $9A75
    LDA ($0034),Y              ; $9A76
    STA ($003A),Y              ; $9A78
    TXA                        ; $9A7A
    STA ($0034),Y              ; $9A7B
    INY                        ; $9A7D
    CPY #$04                   ; $9A7E
    BNE $9A73                  ; $9A80
    LDY #$00                   ; $9A82
    LDA ($003A),Y              ; $9A84
    LDX $0450                  ; $9A86
    STA $0451,X                ; $9A89
    INX                        ; $9A8C
    STX $0450                  ; $9A8D
    LDA #$3B                   ; $9A90
    JSR $C52A                  ; $9A92
    LDA #$01                   ; $9A95
    JSR $C515                  ; $9A97
    LDA a: $001C               ; $9A9A
    AND #$C0                   ; $9A9D
    BEQ $9A95                  ; $9A9F
    LDX $0450                  ; $9AA1
    CPX #$03                   ; $9AA4
    BCS $9AAB                  ; $9AA6
    JMP $9979                  ; $9AA8
    RTS                        ; $9AAB
    CLC                        ; $9AAC
    ADC #$16                   ; $9AAD
    JSR $C50C                  ; $9AAF
    LDY #$00                   ; $9AB2
    LDA ($0034),Y              ; $9AB4
    LDX $0450                  ; $9AB6
    BEQ $9AC5                  ; $9AB9
    CMP $0450,X                ; $9ABB
    BNE $9AC2                  ; $9ABE
    SEC                        ; $9AC0
    RTS                        ; $9AC1
    DEX                        ; $9AC2
    BNE $9ABB                  ; $9AC3
    CLC                        ; $9AC5
    RTS                        ; $9AC6
    .byte $A9,$00
    STA $062D                  ; $9AC9
    LDA #$39                   ; $9ACC
    JSR $C52A                  ; $9ACE
    LDA #$01                   ; $9AD1
    STA $0625                  ; $9AD3
    LDY #$16                   ; $9AD6
    JSR $9F37                  ; $9AD8
    .byte $A9,$01
    JSR $C515                  ; $9ADD
    LDA $0625                  ; $9AE0
    JSR $9B90                  ; $9AE3
    BCC $9AFD                  ; $9AE6
    LDA $9EB7,X                ; $9AE8
    PHA                        ; $9AEB
    LDA $0625                  ; $9AEC
    LDY #$16                   ; $9AEF
    JSR $9F3F                  ; $9AF1
    PLA                        ; $9AF4
    STA $0625                  ; $9AF5
    LDY #$16                   ; $9AF8
    JSR $9F37                  ; $9AFA
    LDA #$80                   ; $9AFD
    AND a: $001E               ; $9AFF
    BNE $9B0F                  ; $9B02
    LDA #$40                   ; $9B04
    AND a: $001E               ; $9B06
    BEQ $9ADB                  ; $9B09
    JSR $990C                  ; $9B0B
    RTS                        ; $9B0E
    LDA #$01                   ; $9B0F
    CMP $0625                  ; $9B11
    BNE $9B18                  ; $9B14
    LDA #$02                   ; $9B16
    STA $0626                  ; $9B18
    LDY #$16                   ; $9B1B
    JSR $9F37                  ; $9B1D
    LDA #$01                   ; $9B20
    JSR $C515                  ; $9B22
    LDA $0626                  ; $9B25
    JSR $9B90                  ; $9B28
    BCC $9B4F                  ; $9B2B
    LDA $9EB7,X                ; $9B2D
    CMP $0625                  ; $9B30
    BNE $9B3D                  ; $9B33
    LDX $003A                  ; $9B35
    JSR $9BA4                  ; $9B37
    LDA $9EB7,X                ; $9B3A
    PHA                        ; $9B3D
    LDA $0626                  ; $9B3E
    LDY #$16                   ; $9B41
    JSR $9F3F                  ; $9B43
    PLA                        ; $9B46
    STA $0626                  ; $9B47
    LDY #$16                   ; $9B4A
    JSR $9F37                  ; $9B4C
    LDA #$80                   ; $9B4F
    AND a: $001E               ; $9B51
    BNE $9B68                  ; $9B54
    LDA #$40                   ; $9B56
    AND a: $001E               ; $9B58
    BEQ $9B20                  ; $9B5B
    LDA $0626                  ; $9B5D
    LDY #$16                   ; $9B60
    JSR $9F3F                  ; $9B62
    JMP $9ADB                  ; $9B65
    LDA $0625                  ; $9B68
    JSR $C50C                  ; $9B6B
    LDA $0034                  ; $9B6E
    STA $003A                  ; $9B70
    LDA $0035                  ; $9B72
    STA $003B                  ; $9B74
    LDA $0626                  ; $9B76
    JSR $C50C                  ; $9B79
    LDY #$00                   ; $9B7C
    LDA ($003A),Y              ; $9B7E
    TAX                        ; $9B80
    LDA ($0034),Y              ; $9B81
    STA ($003A),Y              ; $9B83
    TXA                        ; $9B85
    STA ($0034),Y              ; $9B86
    INY                        ; $9B88
    CPY #$04                   ; $9B89
    BNE $9B7E                  ; $9B8B
    JMP $9AC7                  ; $9B8D
    PHA                        ; $9B90
    LDA #$0F                   ; $9B91
    AND a: $001E               ; $9B93
    BNE $9B9B                  ; $9B96
    PLA                        ; $9B98
    CLC                        ; $9B99
    RTS                        ; $9B9A
    LDX #$00                   ; $9B9B
    LSR                        ; $9B9D
    BCS $9BA3                  ; $9B9E
    INX                        ; $9BA0
    BNE $9B9D                  ; $9BA1
    PLA                        ; $9BA3
    STX $003A                  ; $9BA4
    ASL                        ; $9BA6
    ASL                        ; $9BA7
    ADC $003A                  ; $9BA8
    TAX                        ; $9BAA
    SEC                        ; $9BAB
    RTS                        ; $9BAC
    .byte $A9,$00
    STA $062D                  ; $9BAF
    LDA #$3C                   ; $9BB2
    JSR $C52A                  ; $9BB4
    LDA #$01                   ; $9BB7
    JSR $C515                  ; $9BB9
    LDA #$80                   ; $9BBC
    AND a: $001E               ; $9BBE
    BNE $9BCC                  ; $9BC1
    LDA #$40                   ; $9BC3
    AND a: $001E               ; $9BC5
    BNE $9BEB                  ; $9BC8
    BEQ $9BB7                  ; $9BCA
    LDA a: $002A               ; $9BCC
    CMP #$02                   ; $9BCF
    BNE $9BEB                  ; $9BD1
    LDA #$3D                   ; $9BD3
    JSR $C52A                  ; $9BD5
    LDA #$01                   ; $9BD8
    JSR $C515                  ; $9BDA
    LDA #$40                   ; $9BDD
    AND a: $001E               ; $9BDF
    BNE $9BAD                  ; $9BE2
    LDA #$80                   ; $9BE4
    AND a: $001E               ; $9BE6
    BEQ $9BD8                  ; $9BE9
    JMP $990C                  ; $9BEB
    CMP #$FF                   ; $9BEE
    BEQ $9C0E                  ; $9BF0
    JSR $C536                  ; $9BF2
    LDA $05FB                  ; $9BF5
    BEQ $9C04                  ; $9BF8
    TYA                        ; $9BFA
    EOR #$FF                   ; $9BFB
    TAY                        ; $9BFD
    TXA                        ; $9BFE
    EOR #$FF                   ; $9BFF
    TAX                        ; $9C01
    INY                        ; $9C02
    INX                        ; $9C03
    TYA                        ; $9C04
    LDY #$08                   ; $9C05
    STA ($0034),Y              ; $9C07
    TXA                        ; $9C09
    LDY #$06                   ; $9C0A
    STA ($0034),Y              ; $9C0C
    RTS                        ; $9C0E
    LDA $05FC                  ; $9C0F
    STA $0626                  ; $9C12
    JSR $9C1F                  ; $9C15
    LDA $0626                  ; $9C18
    STA $05FC                  ; $9C1B
    RTS                        ; $9C1E
    LDA #$28                   ; $9C1F
    JSR $C52A                  ; $9C21
    LDA #$00                   ; $9C24
    STA $0624                  ; $9C26
    JSR $9D1B                  ; $9C29
    LDA #$01                   ; $9C2C
    JSR $C515                  ; $9C2E
    LDA #$0C                   ; $9C31
    AND a: $001E               ; $9C33
    BEQ $9C43                  ; $9C36
    LDA $0624                  ; $9C38
    EOR #$40                   ; $9C3B
    STA $0624                  ; $9C3D
    JSR $9D1B                  ; $9C40
    LDA #$40                   ; $9C43
    AND a: $001E               ; $9C45
    BEQ $9C4C                  ; $9C48
    CLC                        ; $9C4A
    RTS                        ; $9C4B
    LDA #$80                   ; $9C4C
    AND a: $001E               ; $9C4E
    BEQ $9C2C                  ; $9C51
    BIT $0624                  ; $9C53
    BVS $9C5A                  ; $9C56
    SEC                        ; $9C58
    RTS                        ; $9C59
    LDA #$38                   ; $9C5A
    JSR $C54E                  ; $9C5C
    LDA #$29                   ; $9C5F
    JSR $C52A                  ; $9C61
    LDA #$01                   ; $9C64
    STA $0625                  ; $9C66
    JSR $9D1B                  ; $9C69
    LDA $05FE                  ; $9C6C
    STA $0624                  ; $9C6F
    LDA #$01                   ; $9C72
    JSR $C515                  ; $9C74
    LDA #$84                   ; $9C77
    STA $062D                  ; $9C79
    LDA #$0C                   ; $9C7C
    AND a: $001E               ; $9C7E
    BEQ $9C8E                  ; $9C81
    LDA $0625                  ; $9C83
    EOR #$40                   ; $9C86
    STA $0625                  ; $9C88
    JSR $9D1B                  ; $9C8B
    LDA #$80                   ; $9C8E
    AND a: $001E               ; $9C90
    BEQ $9C72                  ; $9C93
    BIT $0625                  ; $9C95
    BVC $9CA1                  ; $9C98
    LDA #$00                   ; $9C9A
    STA $062D                  ; $9C9C
    SEC                        ; $9C9F
    RTS                        ; $9CA0
    LDA #$81                   ; $9CA1
    JSR $9D1B                  ; $9CA3
    LDA #$81                   ; $9CA6
    STA $062D                  ; $9CA8
    JSR $9DD4                  ; $9CAB
    LDA #$01                   ; $9CAE
    JSR $C515                  ; $9CB0
    JSR $9D9B                  ; $9CB3
    CMP $0624                  ; $9CB6
    STA $0624                  ; $9CB9
    BEQ $9CC1                  ; $9CBC
    JSR $9DD4                  ; $9CBE
    LDA #$40                   ; $9CC1
    AND a: $001E               ; $9CC3
    BEQ $9CD1                  ; $9CC6
    LDA $0625                  ; $9CC8
    JSR $9D1B                  ; $9CCB
    JMP $9C72                  ; $9CCE
    LDA #$80                   ; $9CD1
    AND a: $001E               ; $9CD3
    BEQ $9CAE                  ; $9CD6
    LDA $05FC                  ; $9CD8
    CMP #$FF                   ; $9CDB
    BEQ $9CAE                  ; $9CDD
    LDA $0624                  ; $9CDF
    STA $0616                  ; $9CE2
    LDA #$01                   ; $9CE5
    JSR $C515                  ; $9CE7
    JSR $9D9B                  ; $9CEA
    CMP $0624                  ; $9CED
    STA $0624                  ; $9CF0
    BEQ $9CF8                  ; $9CF3
    JSR $9DBD                  ; $9CF5
    LDA #$40                   ; $9CF8
    AND a: $001E               ; $9CFA
    BEQ $9D0B                  ; $9CFD
    .byte $AD,$16,$06,$8D,$24,$06,$20,$BD,$9D,$4C,$AE,$9C
    LDA #$80                   ; $9D0B
    AND a: $001E               ; $9D0D
    BEQ $9CE5                  ; $9D10
    LDA $0625                  ; $9D12
    JSR $9D1B                  ; $9D15
    JMP $9C72                  ; $9D18
    PHA                        ; $9D1B
    LDA #$01                   ; $9D1C
    JSR $C515                  ; $9D1E
    LDA $0515                  ; $9D21
    BNE $9D1C                  ; $9D24
    LDA #$01                   ; $9D26
    STA $0515                  ; $9D28
    PLA                        ; $9D2B
    STA $04A5                  ; $9D2C
    AND #$0F                   ; $9D2F
    ASL                        ; $9D31
    ASL                        ; $9D32
    TAX                        ; $9D33
    LDA $9D82,X                ; $9D34
    STA $04A6                  ; $9D37
    LDA $9D83,X                ; $9D3A
    STA $04A7                  ; $9D3D
    LDA $9D84,X                ; $9D40
    STA $04AA                  ; $9D43
    LDA $9D85,X                ; $9D46
    STA $04AB                  ; $9D49
    LDA $04A5                  ; $9D4C
    AND #$0F                   ; $9D4F
    TAX                        ; $9D51
    LDA #$00                   ; $9D52
    BIT $04A5                  ; $9D54
    BMI $9D5E                  ; $9D57
    BVS $9D5E                  ; $9D59
    LDA $9D96,X                ; $9D5B
    STA $04A8                  ; $9D5E
    LDA #$00                   ; $9D61
    BIT $04A5                  ; $9D63
    BMI $9D6D                  ; $9D66
    BVC $9D6D                  ; $9D68
    LDA $9D96,X                ; $9D6A
    STA $04AC                  ; $9D6D
    LDX #$01                   ; $9D70
    STX $04A5                  ; $9D72
    STX $04A9                  ; $9D75
    DEX                        ; $9D78
    STX $04AD                  ; $9D79
    LDA #$80                   ; $9D7C
    STA $0515                  ; $9D7E
    RTS                        ; $9D81
    .byte $CC,$22,$0C,$23,$89,$22,$C9,$22,$C9,$22,$09,$23,$CC,$22,$0C,$23
    .byte $C9,$22,$09,$23,$F6,$F6,$F6,$F6,$B1
    LDA #$0F                   ; $9D9B
    AND a: $001E               ; $9D9D
    BEQ $9DB5                  ; $9DA0
    LDX #$00                   ; $9DA2
    LSR                        ; $9DA4
    BCS $9DAA                  ; $9DA5
    INX                        ; $9DA7
    BNE $9DA4                  ; $9DA8
    LDA $9DB9,X                ; $9DAA
    CLC                        ; $9DAD
    ADC $0624                  ; $9DAE
    CMP #$F0                   ; $9DB1
    BCC $9DB8                  ; $9DB3
    LDA $0624                  ; $9DB5
    RTS                        ; $9DB8
    .byte $0C,$F4,$01,$FF
    LDA $05FC                  ; $9DBD
    JSR $C50C                  ; $9DC0
    LDA $0624                  ; $9DC3
    JSR $C536                  ; $9DC6
    TYA                        ; $9DC9
    LDY #$08                   ; $9DCA
    STA ($0034),Y              ; $9DCC
    TXA                        ; $9DCE
    LDY #$06                   ; $9DCF
    STA ($0034),Y              ; $9DD1
    RTS                        ; $9DD3
    LDA #$01                   ; $9DD4
    STA $003A                  ; $9DD6
    LDA $003A                  ; $9DD8
    CMP $0441                  ; $9DDA
    BEQ $9DF4                  ; $9DDD
    JSR $C50C                  ; $9DDF
    LDY #$06                   ; $9DE2
    LDA ($0034),Y              ; $9DE4
    TAX                        ; $9DE6
    LDY #$08                   ; $9DE7
    LDA ($0034),Y              ; $9DE9
    TAY                        ; $9DEB
    JSR $C539                  ; $9DEC
    CMP $0624                  ; $9DEF
    BEQ $9E02                  ; $9DF2
    INC $003A                  ; $9DF4
    LDA $003A                  ; $9DF6
    CMP #$0B                   ; $9DF8
    BNE $9DD8                  ; $9DFA
    LDX #$FF                   ; $9DFC
    LDA #$1C                   ; $9DFE
    BNE $9E06                  ; $9E00
    LDA #$1D                   ; $9E02
    LDX $003A                  ; $9E04
    STX $05FC                  ; $9E06
    JSR $C52A                  ; $9E09
    RTS                        ; $9E0C
    STA $003A                  ; $9E0D
    ASL                        ; $9E0F
    TAX                        ; $9E10
    LDA $9FF0,X                ; $9E11
    STA $003C                  ; $9E14
    LDA $9FF1,X                ; $9E16
    STA $003D                  ; $9E19
    LDA #$00                   ; $9E1B
    STA $003B                  ; $9E1D
    LDA $003B                  ; $9E1F
    JSR $C50C                  ; $9E21
    LDX $003B                  ; $9E24
    CPX $0441                  ; $9E26
    BEQ $9E46                  ; $9E29
    LDY $05FB                  ; $9E2B
    CPX #$0B                   ; $9E2E
    BCC $9E3A                  ; $9E30
    TXA                        ; $9E32
    SBC #$0B                   ; $9E33
    TAX                        ; $9E35
    TYA                        ; $9E36
    EOR #$0B                   ; $9E37
    TAY                        ; $9E39
    STX $003E                  ; $9E3A
    TYA                        ; $9E3C
    CLC                        ; $9E3D
    ADC $003E                  ; $9E3E
    TAY                        ; $9E40
    LDA ($003C),Y              ; $9E41
    JMP $9E4B                  ; $9E43
    LDX $003A                  ; $9E46
    LDA $A0F8,X                ; $9E48
    .byte $20,$EE,$9B
    INC $003B                  ; $9E4E
    LDA $003B                  ; $9E50
    CMP #$16                   ; $9E52
    BNE $9E1F                  ; $9E54
    JSR $C645                  ; $9E56
    RTS                        ; $9E59
    PHA                        ; $9E5A
    LDA #$01                   ; $9E5B
    JSR $C515                  ; $9E5D
    JSR $C52D                  ; $9E60
    PLA                        ; $9E63
    LDX $05FB                  ; $9E64
    BEQ $9E6F                  ; $9E67
    LDA #$14                   ; $9E69
    STA $0441                  ; $9E6B
    RTS                        ; $9E6E
    JSR $C52A                  ; $9E6F
    LDA #$01                   ; $9E72
    STA $0441                  ; $9E74
    LDY #$00                   ; $9E77
    JSR $9F3B                  ; $9E79
    LDA #$01                   ; $9E7C
    JSR $C515                  ; $9E7E
    LDA #$0F                   ; $9E81
    AND a: $001E               ; $9E83
    BEQ $9EAF                  ; $9E86
    LDX #$00                   ; $9E88
    LSR                        ; $9E8A
    BCS $9E90                  ; $9E8B
    INX                        ; $9E8D
    BNE $9E8A                  ; $9E8E
    STX $003A                  ; $9E90
    LDA $0441                  ; $9E92
    ASL                        ; $9E95
    ASL                        ; $9E96
    ADC $003A                  ; $9E97
    TAX                        ; $9E99
    LDA $9EB7,X                ; $9E9A
    PHA                        ; $9E9D
    LDA $0441                  ; $9E9E
    LDY #$00                   ; $9EA1
    JSR $9F3F                  ; $9EA3
    PLA                        ; $9EA6
    STA $0441                  ; $9EA7
    LDY #$00                   ; $9EAA
    JSR $9F3B                  ; $9EAC
    LDA #$80                   ; $9EAF
    AND a: $001E               ; $9EB1
    BEQ $9E7C                  ; $9EB4
    RTS                        ; $9EB6
    .byte $FF,$FF,$FF,$FF,$05,$09,$02,$04,$06,$0A,$03,$01,$07,$07,$04,$02
    .byte $08,$08,$01,$03,$09,$01,$06,$08,$0A,$02,$07,$05,$03,$03,$08,$06
    .byte $04,$04,$05,$07,$01,$05,$0A,$0A,$02,$06,$09,$09,$03,$07,$09,$0A
    .byte $05,$09,$02,$04,$06,$0A,$03,$01,$07,$00,$04,$02,$08,$00,$01,$03
    .byte $09,$01,$06,$08,$0A,$02,$07,$05,$00,$03,$08,$06,$00,$04,$05,$07
    .byte $01,$05,$0A,$00,$02,$06,$00,$09,$03
    .byte $06,$01,$02,$04,$08,$02,$00,$05,$09,$00,$01,$06,$00,$04,$05,$07
    .byte $01,$05,$03,$09,$02,$03,$04,$08,$03,$07,$07,$09,$04,$06,$06,$01
    .byte $07,$09,$09,$02,$05,$08,$08
    LDX #$B1                   ; $9F37
    BNE $9F41                  ; $9F39
    LDX #$F6                   ; $9F3B
    BNE $9F41                  ; $9F3D
    LDX #$00                   ; $9F3F
    PHA                        ; $9F41
    LDA #$01                   ; $9F42
    JSR $C515                  ; $9F44
    LDA $0515                  ; $9F47
    BNE $9F42                  ; $9F4A
    LDA #$01                   ; $9F4C
    STA $0515                  ; $9F4E
    STX $04A8                  ; $9F51
    STY $04A5                  ; $9F54
    PLA                        ; $9F57
    ASL                        ; $9F58
    ADC $04A5                  ; $9F59
    TAX                        ; $9F5C
    LDA #$01                   ; $9F5D
    STA $04A5                  ; $9F5F
    LDA $9F79,X                ; $9F62
    STA $04A6                  ; $9F65
    LDA $9F7A,X                ; $9F68
    STA $04A7                  ; $9F6B
    LDA #$00                   ; $9F6E
    STA $04A9                  ; $9F70
    LDA #$80                   ; $9F73
    STA $0515                  ; $9F75
    RTS                        ; $9F78
