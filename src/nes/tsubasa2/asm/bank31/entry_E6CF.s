    .byte $4C,$54,$5C,$54,$6C,$5C,$5C,$64,$74,$6C,$64,$74,$7C,$7C,$74,$8C
    .byte $AE,$35,$06,$AC,$37,$06,$20,$E2,$CD,$8D,$FE,$05,$60,$AD,$41,$04
    JSR $CD7C                  ; $E6EF
    LDY #$06                   ; $E6F2
    LDA ($0034),Y              ; $E6F4
    STA $0635                  ; $E6F6
    TAX                        ; $E6F9
    LDY #$08                   ; $E6FA
    LDA ($0034),Y              ; $E6FC
    STA $0637                  ; $E6FE
    TAY                        ; $E701
    JSR $CDE2                  ; $E702
    STA $05FE                  ; $E705
    RTS                        ; $E708
    LDA $062A                  ; $E709
    AND #$7F                   ; $E70C
    STA $062A                  ; $E70E
    LDA $0637                  ; $E711
    SEC                        ; $E714
    SBC #$50                   ; $E715
    AND #$E0                   ; $E717
    LSR                        ; $E719
    LSR                        ; $E71A
    LSR                        ; $E71B
    STA $003A                  ; $E71C
    LSR                        ; $E71E
    LSR                        ; $E71F
    ADC $003A                  ; $E720
    STA $003A                  ; $E722
    LDA $0635                  ; $E724
    SEC                        ; $E727
    SBC #$30                   ; $E728
    AND #$E0                   ; $E72A
    LSR                        ; $E72C
    LSR                        ; $E72D
    LSR                        ; $E72E
    LSR                        ; $E72F
    LSR                        ; $E730
    ADC $003A                  ; $E731
    CMP $062A                  ; $E733
    BEQ $E73D                  ; $E736
    ORA #$80                   ; $E738
    STA $062A                  ; $E73A
    RTS                        ; $E73D
    .byte $A9,$00
    STA $0600                  ; $E740
    STA $05FF                  ; $E743
    LDA $05FE                  ; $E746
    CMP $0638                  ; $E749
    BNE $E751                  ; $E74C
    JMP $E7CF                  ; $E74E
    LDA #$2F                   ; $E751
    STA $0034                  ; $E753
    LDA #$06                   ; $E755
    STA $0035                  ; $E757
    JSR $E7D0                  ; $E759
    STA $062C                  ; $E75C
    PHA                        ; $E75F
    JSR $CE4A                  ; $E760
    STX $0639                  ; $E763
    STY $063A                  ; $E766
    PLA                        ; $E769
    JSR $CE4D                  ; $E76A
    STX $063B                  ; $E76D
    STY $063C                  ; $E770
    .byte $A9,$01
    JSR $CB0F                  ; $E775
    LDA $0639                  ; $E778
    CLC                        ; $E77B
    ADC $0634                  ; $E77C
    STA $0634                  ; $E77F
    LDA $063A                  ; $E782
    ADC $0635                  ; $E785
    STA $0635                  ; $E788
    TAX                        ; $E78B
    LDA $063B                  ; $E78C
    CLC                        ; $E78F
    ADC $0636                  ; $E790
    STA $0636                  ; $E793
    LDA $063C                  ; $E796
    ADC $0637                  ; $E799
    STA $0637                  ; $E79C
    TAY                        ; $E79F
    JSR $CDE2                  ; $E7A0
    CMP #$FF                   ; $E7A3
    BEQ $E7BA                  ; $E7A5
    CMP $05FE                  ; $E7A7
    BEQ $E778                  ; $E7AA
    STA $05FE                  ; $E7AC
    CMP $0638                  ; $E7AF
    BEQ $E7C0                  ; $E7B2
    JSR $800F                  ; $E7B4
    JMP $E773                  ; $E7B7
    LDA $0638                  ; $E7BA
    STA $05FE                  ; $E7BD
    LDA $05FE                  ; $E7C0
    JSR $CDC9                  ; $E7C3
    STX $0635                  ; $E7C6
    STY $0637                  ; $E7C9
    JSR $800C                  ; $E7CC
    .byte $60
    LDY #$06                   ; $E7D0
    LDA ($0034),Y              ; $E7D2
    TAX                        ; $E7D4
    LDY #$08                   ; $E7D5
    LDA ($0034),Y              ; $E7D7
    TAY                        ; $E7D9
    JSR $CDE2                  ; $E7DA
    LDY #$09                   ; $E7DD
    CMP ($0034),Y              ; $E7DF
    BNE $E7E4                  ; $E7E1
    RTS                        ; $E7E3
    LDY #$09                   ; $E7E4
    LDA ($0034),Y              ; $E7E6
    CMP #$F0                   ; $E7E8
    BNE $E7EF                  ; $E7EA
    LDA $05FE                  ; $E7EC
    JSR $CDC9                  ; $E7EF
    TXA                        ; $E7F2
    STA $003A                  ; $E7F3
    TYA                        ; $E7F5
    STA $003B                  ; $E7F6
    LDA #$00                   ; $E7F8
    STA $003C                  ; $E7FA
    LDY #$06                   ; $E7FC
    LDA ($0034),Y              ; $E7FE
    SEC                        ; $E800
    SBC $003A                  ; $E801
    BCS $E80B                  ; $E803
    EOR #$FF                   ; $E805
    ADC #$01                   ; $E807
    INC $003C                  ; $E809
    STA $0071                  ; $E80B
    LDY #$08                   ; $E80D
    LDA ($0034),Y              ; $E80F
    SEC                        ; $E811
    SBC $003B                  ; $E812
    BCS $E81E                  ; $E814
    EOR #$FF                   ; $E816
    ADC #$01                   ; $E818
    INC $003C                  ; $E81A
    INC $003C                  ; $E81C
    STA $0070                  ; $E81E
    LDA #$00                   ; $E820
    STA $006F                  ; $E822
    STA $0074                  ; $E824
    JSR $CD3C                  ; $E826
    LDX #$00                   ; $E829
    LDA $FACD,X                ; $E82B
    CMP $0070                  ; $E82E
    BEQ $E836                  ; $E830
    BCS $E843                  ; $E832
    BCC $E83F                  ; $E834
    LDA $FACC,X                ; $E836
    SBC $006F                  ; $E839
    BEQ $E843                  ; $E83B
    BCS $E843                  ; $E83D
    INX                        ; $E83F
    INX                        ; $E840
    BNE $E82B                  ; $E841
    TXA                        ; $E843
    LSR                        ; $E844
    LSR $003C                  ; $E845
    BCS $E84D                  ; $E847
    EOR #$FF                   ; $E849
    AND #$7F                   ; $E84B
    LSR $003C                  ; $E84D
    BCS $E853                  ; $E84F
    EOR #$FF                   ; $E851
    RTS                        ; $E853
    LDY #$0A                   ; $E854
    LDA ($0034),Y              ; $E856
    BNE $E89F                  ; $E858
    LDA $05FF                  ; $E85A
    STA $0043                  ; $E85D
    JSR $E7D0                  ; $E85F
    STA $0044                  ; $E862
    LDY #$06                   ; $E864
    LDA ($0034),Y              ; $E866
    TAX                        ; $E868
    LDY #$08                   ; $E869
    LDA ($0034),Y              ; $E86B
    TAY                        ; $E86D
    JSR $CDE2                  ; $E86E
    LDY #$09                   ; $E871
    CMP ($0034),Y              ; $E873
    BEQ $E898                  ; $E875
    TAX                        ; $E877
    LDA ($0034),Y              ; $E878
    CMP #$F0                   ; $E87A
    BNE $E883                  ; $E87C
    CPX $05FE                  ; $E87E
    BEQ $E898                  ; $E881
    LDY #$07                   ; $E883
    LDA $0044                  ; $E885
    JSR $E8A0                  ; $E887
    LDA $0044                  ; $E88A
    CLC                        ; $E88C
    ADC #$40                   ; $E88D
    LDY #$05                   ; $E88F
    JSR $E8A0                  ; $E891
    DEC $0043                  ; $E894
    BNE $E864                  ; $E896
    LDY #$0A                   ; $E898
    LDA #$00                   ; $E89A
    STA ($0034),Y              ; $E89C
    RTS                        ; $E89E
    RTS                        ; $E89F
    STY $0046                  ; $E8A0
    CLC                        ; $E8A2
    ADC #$10                   ; $E8A3
    LSR                        ; $E8A5
    LSR                        ; $E8A6
    LSR                        ; $E8A7
    LSR                        ; $E8A8
    LSR                        ; $E8A9
    TAX                        ; $E8AA
    LDA $E8ED,X                ; $E8AB
    STA $0047                  ; $E8AE
    LDY $0032                  ; $E8B0
    LDX $0033                  ; $E8B2
    DEC $0047                  ; $E8B4
    BPL $E8BE                  ; $E8B6
    LDX #$00                   ; $E8B8
    LDY #$00                   ; $E8BA
    BEQ $E8CE                  ; $E8BC
    DEC $0047                  ; $E8BE
    BMI $E8CE                  ; $E8C0
    TYA                        ; $E8C2
    EOR #$FF                   ; $E8C3
    TAY                        ; $E8C5
    TXA                        ; $E8C6
    EOR #$FF                   ; $E8C7
    TAX                        ; $E8C9
    INY                        ; $E8CA
    BNE $E8CE                  ; $E8CB
    INX                        ; $E8CD
    STY $0048                  ; $E8CE
    STX $0049                  ; $E8D0
    LDY #$0A                   ; $E8D2
    LDA ($0034),Y              ; $E8D4
    SEC                        ; $E8D6
    SBC $05FF                  ; $E8D7
    BPL $E8EC                  ; $E8DA
    EOR #$FF                   ; $E8DC
    CLC                        ; $E8DE
    ADC #$01                   ; $E8DF
    BEQ $E8EC                  ; $E8E1
    LDA $0048                  ; $E8E3
    LDX $0049                  ; $E8E5
    LDY $0046                  ; $E8E7
    JSR $E912                  ; $E8E9
    RTS                        ; $E8EC
    .byte $00,$01,$01,$01,$00,$02,$02,$02
    STY $0047                  ; $E8F5
    LDY $0032                  ; $E8F7
    LDX $0033                  ; $E8F9
    AND #$03                   ; $E8FB
    BNE $E900                  ; $E8FD
    RTS                        ; $E8FF
    LSR                        ; $E900
    BCS $E90F                  ; $E901
    TYA                        ; $E903
    EOR #$FF                   ; $E904
    TAY                        ; $E906
    TXA                        ; $E907
    EOR #$FF                   ; $E908
    TAX                        ; $E90A
    INY                        ; $E90B
    BNE $E90F                  ; $E90C
    .byte $E8
    TYA                        ; $E90F
    LDY $0047                  ; $E910
    CLC                        ; $E912
    ADC ($0034),Y              ; $E913
    STA ($0034),Y              ; $E915
    INY                        ; $E917
    TXA                        ; $E918
    ADC ($0034),Y              ; $E919
    CPY #$06                   ; $E91B
    BEQ $E92D                  ; $E91D
    LDX #$50                   ; $E91F
    CMP #$50                   ; $E921
    BCC $E939                  ; $E923
    LDX #$AF                   ; $E925
    CMP #$B0                   ; $E927
    BCS $E939                  ; $E929
    BCC $E93A                  ; $E92B
    LDX #$30                   ; $E92D
    CMP #$30                   ; $E92F
    BCC $E939                  ; $E931
    LDX #$CF                   ; $E933
    CMP #$D0                   ; $E935
    BCC $E93A                  ; $E937
    TXA                        ; $E939
    STA ($0034),Y              ; $E93A
    RTS                        ; $E93C
    .byte $48
    TXA                        ; $E93E
    PHA                        ; $E93F
    LDA #$01                   ; $E940
    JSR $CB0F                  ; $E942
    LDA $0515                  ; $E945
    BNE $E940                  ; $E948
    LDA #$01                   ; $E94A
    STA $0515                  ; $E94C
    LDA #$00                   ; $E94F
    STA $003E                  ; $E951
    PLA                        ; $E953
    LSR                        ; $E954
    ROR $003E                  ; $E955
    LSR                        ; $E957
    ROR $003E                  ; $E958
    STA $003F                  ; $E95A
    PLA                        ; $E95C
    ASL                        ; $E95D
    ROR $003A                  ; $E95E
    TAY                        ; $E960
    CLC                        ; $E961
    LDA $E9DA,Y                ; $E962
    STA $003C                  ; $E965
    LDA $E9DB,Y                ; $E967
    STA $003D                  ; $E96A
    LDY #$00                   ; $E96C
    CLC                        ; $E96E
    LDA ($003C),Y              ; $E96F
    ADC $003E                  ; $E971
    STA $003E                  ; $E973
    INY                        ; $E975
    LDA ($003C),Y              ; $E976
    ADC $003F                  ; $E978
    STA $003F                  ; $E97A
    INY                        ; $E97C
    LDA ($003C),Y              ; $E97D
    AND #$03                   ; $E97F
    STA $0040                  ; $E981
    LDA ($003C),Y              ; $E983
    LSR                        ; $E985
    LSR                        ; $E986
    STA $0041                  ; $E987
    INY                        ; $E989
    LDX #$00                   ; $E98A
    LDA $0041                  ; $E98C
    STA $04A5,X                ; $E98E
    CLC                        ; $E991
    LDA $003E                  ; $E992
    STA $04A6,X                ; $E994
    ADC #$20                   ; $E997
    STA $003E                  ; $E999
    LDA $003F                  ; $E99B
    STA $04A7,X                ; $E99D
    ADC #$00                   ; $E9A0
    STA $003F                  ; $E9A2
    INX                        ; $E9A4
    INX                        ; $E9A5
    INX                        ; $E9A6
    LDA $0041                  ; $E9A7
    STA $0043                  ; $E9A9
    BIT a: $003A               ; $E9AB
    BMI $E9C1                  ; $E9AE
    LDA ($003C),Y              ; $E9B0
    INY                        ; $E9B2
    CMP #$FE                   ; $E9B3
    BEQ $E9C1                  ; $E9B5
    STA $04A5,X                ; $E9B7
    INX                        ; $E9BA
    DEC $0043                  ; $E9BB
    BNE $E9B0                  ; $E9BD
    BEQ $E9CB                  ; $E9BF
    LDA #$00                   ; $E9C1
    STA $04A5,X                ; $E9C3
    INX                        ; $E9C6
    DEC $0043                  ; $E9C7
    BNE $E9C3                  ; $E9C9
    LDA #$00                   ; $E9CB
    STA $04A5,X                ; $E9CD
    DEC $0040                  ; $E9D0
    BNE $E98C                  ; $E9D2
    LDA #$80                   ; $E9D4
    STA $0515                  ; $E9D6
    RTS                        ; $E9D9
