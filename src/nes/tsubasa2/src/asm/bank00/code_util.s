; ============================================================
; code_util.s - bank00 utility routines ($9691-$9EA0)
; Jump tables, PPU transfer, I/O, math routines
; ============================================================

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
    BEQ $9A0C                  ; $99F4
    TAX                        ; $99F6
    BEQ $99FB                  ; $99F7
    DEC $004A                  ; $99F9
    LDA $004B                  ; $99FB
    BEQ $9A01                  ; $99FD
    DEC $004B                  ; $99FF
    JSR $9A71                  ; $9A01
    LDA #$01                   ; $9A04
    JSR $9FA8                  ; $9A06
    JMP $99F0                  ; $9A09
    RTS                        ; $9A0C
    .byte $A5,$4A
    BEQ $9A1E                  ; $9A0F
    DEC $004A                  ; $9A11
    JSR $9A71                  ; $9A13
    LDA #$01                   ; $9A16
    JSR $9FA8                  ; $9A18
    JMP $9A0D                  ; $9A1B
    RTS                        ; $9A1E
    .byte $A5,$4B
    BEQ $9A30                  ; $9A21
    DEC $004B                  ; $9A23
    JSR $9A71                  ; $9A25
    LDA #$01                   ; $9A28
    JSR $9FA8                  ; $9A2A
    JMP $9A1F                  ; $9A2D
    RTS                        ; $9A30
    STA $0048                  ; $9A31
    STX $0049                  ; $9A33
    JSR $9B07                  ; $9A35
    JSR $9AB8                  ; $9A38
    JSR $9ADA                  ; $9A3B
    LDX $00E9                  ; $9A3E
    JSR $C4B9                  ; $9A40
    LDA #$0F                   ; $9A43
    STA $004A                  ; $9A45
    STA $004B                  ; $9A47
    JMP $9A71                  ; $9A49
    STA $0048                  ; $9A4C
    JSR $9B07                  ; $9A4E
    JSR $9AB8                  ; $9A51
    LDX $00E9                  ; $9A54
    JSR $C4B9                  ; $9A56
    LDA #$0F                   ; $9A59
    STA $004A                  ; $9A5B
    JMP $9A71                  ; $9A5D
    STA $0049                  ; $9A60
    JSR $9B07                  ; $9A62
    JSR $9ADA                  ; $9A65
    LDX $00E9                  ; $9A68
    JSR $C4B9                  ; $9A6A
    LDA #$0F                   ; $9A6D
    STA $004B                  ; $9A6F
    .byte $A9,$20
    LDY #$00                   ; $9A73
    LDX #$3F                   ; $9A75
    JSR $9B28                  ; $9A77
    STX $00E7                  ; $9A7A
    LDY #$00                   ; $9A7C
    LDA $062A,Y                ; $9A7E
    AND #$30                   ; $9A81
    CLC                        ; $9A83
    ADC $004A                  ; $9A84
    JSR $9AA2                  ; $9A86
    CPY #$10                   ; $9A89
    BNE $9A7E                  ; $9A8B
    LDA $062A,Y                ; $9A8D
    AND #$30                   ; $9A90
    CLC                        ; $9A92
    ADC $004B                  ; $9A93
    JSR $9AA2                  ; $9A95
    CPY #$20                   ; $9A98
    BNE $9A8D                  ; $9A9A
    LDX $00E7                  ; $9A9C
    JSR $9B5E                  ; $9A9E
    RTS                        ; $9AA1
    TAX                        ; $9AA2
    LDA $9EA2,X                ; $9AA3
    STA $00E6                  ; $9AA6
    LDA $062A,Y                ; $9AA8
    AND #$0F                   ; $9AAB
    ORA $00E6                  ; $9AAD
    LDX $00E7                  ; $9AAF
    STA $05E8,X                ; $9AB1
    INC $00E7                  ; $9AB4
    INY                        ; $9AB6
    RTS                        ; $9AB7
    LDA #$00                   ; $9AB8
    STA $00E7                  ; $9ABA
    LDA $0048                  ; $9ABC
    ASL                        ; $9ABE
    ROL $00E7                  ; $9ABF
    ASL                        ; $9AC1
    ROL $00E7                  ; $9AC2
    ASL                        ; $9AC4
    ROL $00E7                  ; $9AC5
    ASL                        ; $9AC7
    ROL $00E7                  ; $9AC8
    CLC                        ; $9ACA
    ADC #$00                   ; $9ACB
    STA $00E6                  ; $9ACD
    LDA $00E7                  ; $9ACF
    ADC #$B0                   ; $9AD1
    STA $00E7                  ; $9AD3
    LDX #$00                   ; $9AD5
    JMP $9AF9                  ; $9AD7
    LDA #$00                   ; $9ADA
    STA $00E7                  ; $9ADC
    LDA $0049                  ; $9ADE
    ASL                        ; $9AE0
    ROL $00E7                  ; $9AE1
    ASL                        ; $9AE3
    ROL $00E7                  ; $9AE4
    ASL                        ; $9AE6
    ROL $00E7                  ; $9AE7
    ASL                        ; $9AE9
    ROL $00E7                  ; $9AEA
    CLC                        ; $9AEC
    ADC #$00                   ; $9AED
    STA $00E6                  ; $9AEF
    LDA $00E7                  ; $9AF1
    ADC #$B3                   ; $9AF3
    STA $00E7                  ; $9AF5
    LDX #$10                   ; $9AF7
    .byte $A0,$00
    LDA ($00E6),Y              ; $9AFB
    STA $062A,X                ; $9AFD
    INX                        ; $9B00
    INY                        ; $9B01
    CPY #$10                   ; $9B02
    BNE $9AFB                  ; $9B04
    RTS                        ; $9B06
    LDA $0025                  ; $9B07
    STA $00E9                  ; $9B09
    LDX #$06                   ; $9B0B
    JSR $C4B9                  ; $9B0D
    RTS                        ; $9B10
    LDA #$00                   ; $9B11
    STA $0048                  ; $9B13
    STA $0049                  ; $9B15
    STA $004A                  ; $9B17
    STA $004B                  ; $9B19
    LDA #$0F                   ; $9B1B
    LDY #$E0                   ; $9B1D
    STA $054A,Y                ; $9B1F
    INY                        ; $9B22
    BNE $9B1F                  ; $9B23
    JMP $9A71                  ; $9B25
    .byte $48
    BIT $0629                  ; $9B29
    BVC $9B37                  ; $9B2C
    LDA #$01                   ; $9B2E
    JSR $9FA8                  ; $9B30
    PLA                        ; $9B33
    JMP $9B28                  ; $9B34
    AND #$3F                   ; $9B37
    CLC                        ; $9B39
    ADC $0628                  ; $9B3A
    CMP #$3D                   ; $9B3D
    BCS $9B2E                  ; $9B3F
    PLA                        ; $9B41
    ORA #$40                   ; $9B42
    STA $0629                  ; $9B44
    TXA                        ; $9B47
    LDX $0628                  ; $9B48
    STA $05EA,X                ; $9B4B
    TYA                        ; $9B4E
    STA $05E9,X                ; $9B4F
    LDA $0629                  ; $9B52
    AND #$BF                   ; $9B55
    STA $05E8,X                ; $9B57
    INX                        ; $9B5A
    INX                        ; $9B5B
    INX                        ; $9B5C
    RTS                        ; $9B5D
    .byte $A9,$00
    STA $05E8,X                ; $9B60
    STX $0628                  ; $9B63
    LDA $0629                  ; $9B66
    AND #$BF                   ; $9B69
    STA $0629                  ; $9B6B
    RTS                        ; $9B6E
    STX $009E                  ; $9B6F
    STY $009F                  ; $9B71
    RTS                        ; $9B73
    STX $00A0                  ; $9B74
    STY $00A1                  ; $9B76
    LDA $009E                  ; $9B78
    ORA #$80                   ; $9B7A
    STA $009E                  ; $9B7C
    RTS                        ; $9B7E
    .byte $A2,$00
    LDA #$F8                   ; $9B81
    STA $0468,X                ; $9B83
    INX                        ; $9B86
    BNE $9B83                  ; $9B87
    LDA #$F8                   ; $9B89
    STA $0200,X                ; $9B8B
    INX                        ; $9B8E
    BNE $9B8B                  ; $9B8F
    LDA #$00                   ; $9B91
    STA $0568                  ; $9B93
    STA $0588                  ; $9B96
    STA $05A8                  ; $9B99
    STA $05C8                  ; $9B9C
    RTS                        ; $9B9F
    JSR $99F0                  ; $9BA0
    JSR $98A0                  ; $9BA3
    JMP $9B7F                  ; $9BA6
    STA $0046                  ; $9BA9
    TAY                        ; $9BAB
    BMI $9BBC                  ; $9BAC
    CLC                        ; $9BAE
    ADC $0044                  ; $9BAF
    CMP #$F0                   ; $9BB1
    BCC $9BB9                  ; $9BB3
    ADC #$0F                   ; $9BB5
    INC $0045                  ; $9BB7
    STA $0044                  ; $9BB9
    RTS                        ; $9BBB
    CLC                        ; $9BBC
    ADC $0044                  ; $9BBD
    CMP #$F0                   ; $9BBF
    BCC $9BC7                  ; $9BC1
    SBC #$10                   ; $9BC3
    DEC $0045                  ; $9BC5
    STA $0044                  ; $9BC7
    RTS                        ; $9BC9
    STA $0047                  ; $9BCA
    PHA                        ; $9BCC
    CLC                        ; $9BCD
    ADC $007A                  ; $9BCE
    STA $007A                  ; $9BD0
    PLA                        ; $9BD2
    BMI $9BDC                  ; $9BD3
    LDA $007B                  ; $9BD5
    ADC #$00                   ; $9BD7
    JMP $9BE0                  ; $9BD9
    LDA $007B                  ; $9BDC
    SBC #$00                   ; $9BDE
    .byte $85,$7B
    RTS                        ; $9BE2
    STX $00E7                  ; $9BE3
    STY $00E6                  ; $9BE5
    TAY                        ; $9BE7
    LDA #$01                   ; $9BE8
    JSR $9FA8                  ; $9BEA
    LDA $001E                  ; $9BED
    JSR $9CE7                  ; $9BEF
    LDA $001E                  ; $9BF2
    AND #$90                   ; $9BF4
    BPL $9BE8                  ; $9BF6
    LDA $0468,Y                ; $9BF8
    TAX                        ; $9BFB
    SEC                        ; $9BFC
    SBC $00E7                  ; $9BFD
    LSR                        ; $9BFF
    LSR                        ; $9C00
    LSR                        ; $9C01
    STA $00E7                  ; $9C02
    LDA #$F8                   ; $9C04
    STA $0468,Y                ; $9C06
    LDA $00E7                  ; $9C09
    CLC                        ; $9C0B
    RTS                        ; $9C0C
    LDA #$01                   ; $9C0D
    JSR $9FA8                  ; $9C0F
    LDA $001E                  ; $9C12
    JSR $9CE7                  ; $9C14
    LDA $001E                  ; $9C17
    AND #$90                   ; $9C19
    BNE $9BF8                  ; $9C1B
    BIT $001E                  ; $9C1D
    BVC $9C0D                  ; $9C1F
    LDA #$F8                   ; $9C21
    STA $0468,Y                ; $9C23
    SEC                        ; $9C26
    RTS                        ; $9C27
    .byte $84,$E6
    STX $00E7                  ; $9C2A
    TAY                        ; $9C2C
    LDA ($00E6),Y              ; $9C2D
    TAX                        ; $9C2F
    INY                        ; $9C30
    LDA ($00E6),Y              ; $9C31
    STA $00E7                  ; $9C33
    STX $00E6                  ; $9C35
    JMP ($00E6)                ; $9C37
    LDA #$00                   ; $9C3A
    STA $00E9                  ; $9C3C
    STY $00E6                  ; $9C3E
    STX $00E7                  ; $9C40
    LDY #$00                   ; $9C42
    LDA ($00E6),Y              ; $9C44
    TAX                        ; $9C46
    INY                        ; $9C47
    LDA ($00E6),Y              ; $9C48
    STA $00E8                  ; $9C4A
    CMP $00E9                  ; $9C4C
    BNE $9C53                  ; $9C4E
    CLC                        ; $9C50
    ADC #$10                   ; $9C51
    STA $0468,X                ; $9C53
    INX                        ; $9C56
    INY                        ; $9C57
    LDA ($00E6),Y              ; $9C58
    STA $0468,X                ; $9C5A
    INX                        ; $9C5D
    INY                        ; $9C5E
    CPY #$05                   ; $9C5F
    BNE $9C58                  ; $9C61
    LDA ($00E6),Y              ; $9C63
    STA $00E6                  ; $9C65
    TXA                        ; $9C67
    SEC                        ; $9C68
    SBC #$04                   ; $9C69
    TAY                        ; $9C6B
    LDA $00E8                  ; $9C6C
    STA $00E7                  ; $9C6E
    RTS                        ; $9C70
    LDA #$10                   ; $9C71
    .byte $85,$E8
    LDA $001C                  ; $9C75
    JSR $9CE7                  ; $9C77
    BCC $9CC8                  ; $9C7A
    LDX $00E9                  ; $9C7C
    CPX #$FF                   ; $9C7E
    BEQ $9C89                  ; $9C80
    CMP $00E9                  ; $9C82
    BEQ $9C75                  ; $9C84
    JMP $9CB3                  ; $9C86
    CMP $00EB                  ; $9C89
    BEQ $9C75                  ; $9C8B
    LDA $055C                  ; $9C8D
    CMP #$B8                   ; $9C90
    BCC $9C97                  ; $9C92
    SEC                        ; $9C94
    SBC #$10                   ; $9C95
    TAY                        ; $9C97
    LDX $055F                  ; $9C98
    JSR $9D08                  ; $9C9B
    LDY #$00                   ; $9C9E
    LDA ($0034),Y              ; $9CA0
    LDY #$F4                   ; $9CA2
    CMP $0451                  ; $9CA4
    BEQ $9C75                  ; $9CA7
    CMP $0452                  ; $9CA9
    BEQ $9C75                  ; $9CAC
    CMP $0453                  ; $9CAE
    BEQ $9C75                  ; $9CB1
    .byte $A9,$01
    JSR $9FA8                  ; $9CB5
    LDX $001C                  ; $9CB8
    LDA $9EE2,X                ; $9CBA
    BEQ $9CC8                  ; $9CBD
    DEC $00E8                  ; $9CBF
    BNE $9CB3                  ; $9CC1
    LDA #$08                   ; $9CC3
    JMP $9C73                  ; $9CC5
    RTS                        ; $9CC8
    LDA #$00                   ; $9CC9
    JSR $9CD3                  ; $9CCB
    JSR $9C71                  ; $9CCE
    LDA #$02                   ; $9CD1
    LDX $046B,Y                ; $9CD3
    BMI $9CE6                  ; $9CD6
    PHA                        ; $9CD8
    LDA $0468,Y                ; $9CD9
    SEC                        ; $9CDC
    SBC $00E7                  ; $9CDD
    LSR                        ; $9CDF
    LSR                        ; $9CE0
    TAX                        ; $9CE1
    PLA                        ; $9CE2
    STA $046A,X                ; $9CE3
    RTS                        ; $9CE6
    AND #$0F                   ; $9CE7
    TAX                        ; $9CE9
    LDA $9EE2,X                ; $9CEA
    BEQ $9D06                  ; $9CED
    CLC                        ; $9CEF
    ADC $0468,Y                ; $9CF0
    CMP $00E7                  ; $9CF3
    BCS $9CF9                  ; $9CF5
    LDA $00E6                  ; $9CF7
    CMP $00E6                  ; $9CF9
    BEQ $9D01                  ; $9CFB
    BCC $9D01                  ; $9CFD
    LDA $00E7                  ; $9CFF
    STA $0468,Y                ; $9D01
    SEC                        ; $9D04
    RTS                        ; $9D05
    CLC                        ; $9D06
    RTS                        ; $9D07
    TXA                        ; $9D08
    BMI $9D1A                  ; $9D09
    TYA                        ; $9D0B
    EOR #$FF                   ; $9D0C
    SEC                        ; $9D0E
    SBC #$28                   ; $9D0F
    LSR                        ; $9D11
    LSR                        ; $9D12
    LSR                        ; $9D13
    LSR                        ; $9D14
    STA $00ED                  ; $9D15
    JMP $C50C                  ; $9D17
    TYA                        ; $9D1A
    LSR                        ; $9D1B
    LSR                        ; $9D1C
    LSR                        ; $9D1D
    LSR                        ; $9D1E
    CLC                        ; $9D1F
    ADC #$14                   ; $9D20
    STA $00ED                  ; $9D22
    JMP $C50C                  ; $9D24
    STY $00E6                  ; $9D27
    STX $00E7                  ; $9D29
    LDY #$00                   ; $9D2B
    LDA ($00E6),Y              ; $9D2D
    STA $00E8                  ; $9D2F
    INY                        ; $9D31
    LDA ($00E6),Y              ; $9D32
    STA $00E9                  ; $9D34
    STY $00EB                  ; $9D36
    JSR $9D58                  ; $9D38
    TAX                        ; $9D3B
    INC $00EB                  ; $9D3C
    LDA $00EB                  ; $9D3E
    CLC                        ; $9D40
    ADC $00E6                  ; $9D41
    STA $00E6                  ; $9D43
    LDA $00E7                  ; $9D45
    ADC #$00                   ; $9D47
    STA $00E7                  ; $9D49
    CPX #$FF                   ; $9D4B
    BNE $9D2B                  ; $9D4D
    RTS                        ; $9D4F
    .byte $84,$E6
    STX $00E7                  ; $9D52
    LDA #$FF                   ; $9D54
    STA $00EB                  ; $9D56
    .byte $E6,$EB
    LDY $00EB                  ; $9D5A
    LDA ($00E6),Y              ; $9D5C
    CMP #$FC                   ; $9D5E
    BCS $9D72                  ; $9D60
    LDY $00E8                  ; $9D62
    LDX $00E9                  ; $9D64
    JSR $88CA                  ; $9D66
    INC $00E8                  ; $9D69
    BNE $9D6F                  ; $9D6B
    .byte $E6,$E9
    JMP $9D58                  ; $9D6F
    RTS                        ; $9D72
    STA $00E8                  ; $9D73
    JSR $9B28                  ; $9D75
    LDA $00E8                  ; $9D78
    AND #$3F                   ; $9D7A
    STA $00E8                  ; $9D7C
    LDY #$00                   ; $9D7E
    LDA ($00E6),Y              ; $9D80
    STA $05E8,X                ; $9D82
    INY                        ; $9D85
    INX                        ; $9D86
    DEC $00E8                  ; $9D87
    BNE $9D80                  ; $9D89
    JMP $9B5E                  ; $9D8B
    STA $00EC                  ; $9D8E
    LDA #$02                   ; $9D90
    JSR $9B28                  ; $9D92
    LDA $00EC                  ; $9D95
    LSR                        ; $9D97
    LSR                        ; $9D98
    LSR                        ; $9D99
    LSR                        ; $9D9A
    BNE $9D9F                  ; $9D9B
    LDA #$CD                   ; $9D9D
    CLC                        ; $9D9F
    ADC #$33                   ; $9DA0
    STA $05E8,X                ; $9DA2
    INX                        ; $9DA5
    LDA $00EC                  ; $9DA6
    AND #$0F                   ; $9DA8
    CLC                        ; $9DAA
    ADC #$33                   ; $9DAB
    STA $05E8,X                ; $9DAD
    INX                        ; $9DB0
    JSR $9B5E                  ; $9DB1
    RTS                        ; $9DB4
    LDA #$04                   ; $9DB5
    JSR $9B28                  ; $9DB7
    LDA #$00                   ; $9DBA
    STA $00E7                  ; $9DBC
    LDA $00ED                  ; $9DBE
    JSR $9DDA                  ; $9DC0
    LDA $00ED                  ; $9DC3
    JSR $9DDE                  ; $9DC5
    LDA $00EC                  ; $9DC8
    JSR $9DDA                  ; $9DCA
    LDA #$33                   ; $9DCD
    STA $00E7                  ; $9DCF
    LDA $00EC                  ; $9DD1
    JSR $9DDE                  ; $9DD3
    JSR $9B5E                  ; $9DD6
    RTS                        ; $9DD9
    LSR                        ; $9DDA
    LSR                        ; $9DDB
    LSR                        ; $9DDC
    LSR                        ; $9DDD
    AND #$0F                   ; $9DDE
    BEQ $9DE6                  ; $9DE0
    LDY #$33                   ; $9DE2
    STY $00E7                  ; $9DE4
    CLC                        ; $9DE6
    ADC $00E7                  ; $9DE7
    STA $05E8,X                ; $9DE9
    INX                        ; $9DEC
    RTS                        ; $9DED
    STA $00ED                  ; $9DEE
    LDA #$00                   ; $9DF0
    STA $00EC                  ; $9DF2
    LDY #$08                   ; $9DF4
    ASL $00EC                  ; $9DF6
    ROL $00ED                  ; $9DF8
    BCC $9E08                  ; $9DFA
    TXA                        ; $9DFC
    CLC                        ; $9DFD
    ADC $00EC                  ; $9DFE
    STA $00EC                  ; $9E00
    LDA $00ED                  ; $9E02
    ADC #$00                   ; $9E04
    STA $00ED                  ; $9E06
    DEY                        ; $9E08
    BNE $9DF6                  ; $9E09
    RTS                        ; $9E0B
    LDA #$00                   ; $9E0C
    STA $00E8                  ; $9E0E
    STA $00E9                  ; $9E10
    LDX #$10                   ; $9E12
    ASL $00EC                  ; $9E14
    ROL $00ED                  ; $9E16
    ROL $00E8                  ; $9E18
    ROL $00E9                  ; $9E1A
    LDA $00E8                  ; $9E1C
    SEC                        ; $9E1E
    SBC $00EA                  ; $9E1F
    TAY                        ; $9E21
    LDA $00E9                  ; $9E22
    SBC $00EB                  ; $9E24
    BCC $9E32                  ; $9E26
    STA $00E9                  ; $9E28
    STY $00E8                  ; $9E2A
    INC $00EC                  ; $9E2C
    BNE $9E32                  ; $9E2E
    .byte $E6,$ED
    DEX                        ; $9E32
    BNE $9E14                  ; $9E33
    RTS                        ; $9E35
    LDA #$00                   ; $9E36
    STA $00EA                  ; $9E38
    LDX #$08                   ; $9E3A
    ASL $00ED                  ; $9E3C
    ROL $00EA                  ; $9E3E
    LDA $00EA                  ; $9E40
    SEC                        ; $9E42
    SBC $00EC                  ; $9E43
    BCC $9E4B                  ; $9E45
    STA $00EA                  ; $9E47
    INC $00ED                  ; $9E49
    DEX                        ; $9E4B
    BNE $9E3C                  ; $9E4C
    RTS                        ; $9E4E
    LDA #$0A                   ; $9E4F
    STA $00EA                  ; $9E51
    LDA #$00                   ; $9E53
    STA $00EB                  ; $9E55
    LDA #$03                   ; $9E57
    STA $00E6                  ; $9E59
    JSR $9E0C                  ; $9E5B
    LDA $00E8                  ; $9E5E
    STA $00E7                  ; $9E60
    JSR $9E0C                  ; $9E62
    LDA $00E8                  ; $9E65
    ASL                        ; $9E67
    ASL                        ; $9E68
    ASL                        ; $9E69
    ASL                        ; $9E6A
    ORA $00E7                  ; $9E6B
    PHA                        ; $9E6D
    DEC $00E6                  ; $9E6E
    BNE $9E5B                  ; $9E70
    PLA                        ; $9E72
    STA $00EA                  ; $9E73
    PLA                        ; $9E75
    STA $00E9                  ; $9E76
    PLA                        ; $9E78
    STA $00E8                  ; $9E79
    RTS                        ; $9E7B
    STA $00ED                  ; $9E7C
    LDA #$0A                   ; $9E7E
    STA $00EC                  ; $9E80
    JSR $9E36                  ; $9E82
    LDA $00EA                  ; $9E85
    STA $00EB                  ; $9E87
    JSR $9E36                  ; $9E89
    LDA $00EA                  ; $9E8C
    ASL                        ; $9E8E
    ASL                        ; $9E8F
    ASL                        ; $9E90
    ASL                        ; $9E91
    ORA $00EB                  ; $9E92
    STA $00EB                  ; $9E94
    JSR $9E36                  ; $9E96
    LDA $00EA                  ; $9E99
    STA $00ED                  ; $9E9B
    LDA $00EB                  ; $9E9D
    STA $00EC                  ; $9E9F
    RTS                        ; $9EA1
    .byte $0F,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $0F,$00,$00,$00,$00,$00,$10,$10,$20,$20,$30,$30,$20,$20,$10,$10
    .byte $0F,$00,$00,$00,$10,$10,$10,$20,$20,$20,$30,$30,$30,$20,$20,$20
    .byte $0F,$00,$10,$10,$10,$20,$20,$30,$30,$30,$30,$30,$30,$30,$30,$30
    .byte $00,$00,$00,$00,$10,$00,$00,$00,$F0,$00,$00,$A2,$01
