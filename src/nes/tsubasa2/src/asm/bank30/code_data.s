; ============================================================
; code_data.s - bank30 inline data + routines
; ============================================================

    JSR $8009                  ; $D6A8
    LDA $0430                  ; $D6AB
    BEQ $D6BE                  ; $D6AE
    CLC                        ; $D6B0
    ADC #$08                   ; $D6B1
    JSR $EF7F                  ; $D6B3
    JSR $D77A                  ; $D6B6
    ASL                        ; $D6B9
    BCC $D6BD                  ; $D6BA
    RTS                        ; $D6BC
    LSR                        ; $D6BD
    STA $043C                  ; $D6BE
    JSR $D717                  ; $D6C1
    LDA $043B                  ; $D6C4
    JSR $CB99                  ; $D6C7
    .byte $92,$D7,$E8,$D7,$0C,$D7,$79,$D9,$0C,$D7,$65,$DA,$0C,$D7,$0C,$D7
    .byte $0C,$D7,$0C,$D7,$02,$01,$00,$03,$04,$05,$06,$1E,$1F,$20,$00,$01
    .byte $03,$02,$00,$01,$05,$04,$06,$01,$FF,$04,$00,$01,$FF,$02,$00,$01
    .byte $FF,$FF,$09,$07,$FF,$08,$03,$04,$05,$03,$03,$03,$02,$02,$02,$02
    .byte $02,$2C,$20,$46,$CC
    LDA #$00                   ; $D70F
    STA $062D                  ; $D711
    PLA                        ; $D714
    PLA                        ; $D715
    RTS                        ; $D716
    PHA                        ; $D717
    LDA $0022                  ; $D718
    LDA #$1C                   ; $D71A
    STA $0024                  ; $D71C
    LDA #$1D                   ; $D71E
    STA $0025                  ; $D720
    JSR $CE2D                  ; $D722
    PLA                        ; $D725
    JSR $8012                  ; $D726
    JSR $D76B                  ; $D729
    BPL $D745                  ; $D72C
    LDA $043B                  ; $D72E
    CMP #$00                   ; $D731
    BEQ $D73E                  ; $D733
    CMP #$03                   ; $D735
    BEQ $D73E                  ; $D737
    LDA $043C                  ; $D739
    BEQ $D745                  ; $D73C
    LDA #$3D                   ; $D73E
    JSR $CBB0                  ; $D740
    PLA                        ; $D743
    PLA                        ; $D744
    RTS                        ; $D745
    PHA                        ; $D746
    LDA $0022                  ; $D747
    LDA #$1C                   ; $D749
    STA $0024                  ; $D74B
    LDA #$1D                   ; $D74D
    STA $0025                  ; $D74F
    JSR $CE2D                  ; $D751
    PLA                        ; $D754
    JSR $8015                  ; $D755
    JSR $D76B                  ; $D758
    BPL $D769                  ; $D75B
    LDA $043E                  ; $D75D
    BEQ $D769                  ; $D760
    LDA #$3D                   ; $D762
    JSR $CBB0                  ; $D764
    CLC                        ; $D767
    RTS                        ; $D768
    SEC                        ; $D769
    RTS                        ; $D76A
    SEC                        ; $D76B
    LDY #$01                   ; $D76C
    LDA ($0034),Y              ; $D76E
    SBC $043F                  ; $D770
    INY                        ; $D773
    LDA ($0034),Y              ; $D774
    SBC $0440                  ; $D776
    RTS                        ; $D779
    LDA #$00                   ; $D77A
    STA $0622                  ; $D77C
    LDA $0430                  ; $D77F
    JSR $CF8F                  ; $D782
    LDX #$80                   ; $D785
    BCC $D790                  ; $D787
    TAX                        ; $D789
    BEQ $D790                  ; $D78A
    LDA $0430,X                ; $D78C
    TAX                        ; $D78F
    TXA                        ; $D790
    RTS                        ; $D791
    .byte $AD,$3C,$04
    CMP #$03                   ; $D795
    BCS $D79F                  ; $D797
    LDX $044E                  ; $D799
    STX $043C                  ; $D79C
    CMP #$12                   ; $D79F
    BNE $D7D9                  ; $D7A1
    LDX $0448                  ; $D7A3
    BNE $D7D9                  ; $D7A6
    INC $0448                  ; $D7A8
    LDA #$00                   ; $D7AB
    STA $062D                  ; $D7AD
    LDA #$46                   ; $D7B0
    JSR $CBB0                  ; $D7B2
    PHA                        ; $D7B5
    LDA $0022                  ; $D7B6
    LDA #$1A                   ; $D7B8
    STA $0024                  ; $D7BA
    LDA #$1B                   ; $D7BC
    STA $0025                  ; $D7BE
    JSR $CE2D                  ; $D7C0
    PLA                        ; $D7C3
    JSR $8021                  ; $D7C4
    PHA                        ; $D7C7
    LDA $0022                  ; $D7C8
    LDA #$1A                   ; $D7CA
    STA $0024                  ; $D7CC
    LDA #$1B                   ; $D7CE
    STA $0025                  ; $D7D0
    JSR $CE2D                  ; $D7D2
    PLA                        ; $D7D5
    JSR $8036                  ; $D7D6
    CMP #$11                   ; $D7D9
    BNE $D7E5                  ; $D7DB
    LDA #$00                   ; $D7DD
    STA $0449                  ; $D7DF
    STA $044A                  ; $D7E2
    JMP $D70C                  ; $D7E5
    .byte $A9,$38
    JSR $CBB0                  ; $D7EA
    LDA #$0F                   ; $D7ED
    JSR $EF7F                  ; $D7EF
    LDA #$81                   ; $D7F2
    STA $062D                  ; $D7F4
    LDA #$1F                   ; $D7F7
    STA $0494                  ; $D7F9
    JSR $E6EC                  ; $D7FC
    LDA #$00                   ; $D7FF
    STA $0625                  ; $D801
    LDA $05FE                  ; $D804
    STA $0624                  ; $D807
    LDA #$01                   ; $D80A
    JSR $CB0F                  ; $D80C
    LDA a: $001C               ; $D80F
    AND #$0F                   ; $D812
    BEQ $D837                  ; $D814
    LDX #$00                   ; $D816
    LSR                        ; $D818
    BCS $D81E                  ; $D819
    INX                        ; $D81B
    BNE $D818                  ; $D81C
    LDA $D84E,X                ; $D81E
    CLC                        ; $D821
    ADC $0624                  ; $D822
    CMP #$F0                   ; $D825
    BCC $D82C                  ; $D827
    LDA $0624                  ; $D829
    CMP $0624                  ; $D82C
    STA $0624                  ; $D82F
    BEQ $D837                  ; $D832
    JSR $D8F7                  ; $D834
    LDA #$40                   ; $D837
    AND a: $001E               ; $D839
    BEQ $D83F                  ; $D83C
    RTS                        ; $D83E
    LDA #$80                   ; $D83F
    AND a: $001E               ; $D841
    BEQ $D80A                  ; $D844
    JSR $D852                  ; $D846
    BCC $D80A                  ; $D849
    JMP $D70C                  ; $D84B
    .byte $0C,$F4,$01,$FF,$A9,$FF
    LDX $0625                  ; $D854
    BEQ $D862                  ; $D857
    LDX $0430                  ; $D859
    DEX                        ; $D85C
    BNE $D868                  ; $D85D
    LDA $0431                  ; $D85F
    STA $05FC                  ; $D862
    JMP $D8D2                  ; $D865
    LDA $0430                  ; $D868
    CLC                        ; $D86B
    ADC #$22                   ; $D86C
    JSR $EF7F                  ; $D86E
    LDA #$00                   ; $D871
    STA $0625                  ; $D873
    JMP $D8B5                  ; $D876
    LDA #$01                   ; $D879
    JSR $CB0F                  ; $D87B
    LDA #$40                   ; $D87E
    AND a: $001E               ; $D880
    BEQ $D88F                  ; $D883
    LDA #$0F                   ; $D885
    JSR $EF7F                  ; $D887
    JSR $D8F7                  ; $D88A
    CLC                        ; $D88D
    RTS                        ; $D88E
    LDA #$0C                   ; $D88F
    AND a: $001E               ; $D891
    BEQ $D8C3                  ; $D894
    LDX #$01                   ; $D896
    AND #$04                   ; $D898
    BNE $D89E                  ; $D89A
    LDX #$FF                   ; $D89C
    TXA                        ; $D89E
    CLC                        ; $D89F
    ADC $0625                  ; $D8A0
    BMI $D8AA                  ; $D8A3
    CMP $0430                  ; $D8A5
    BCC $D8AD                  ; $D8A8
    LDA $0625                  ; $D8AA
    CMP $0625                  ; $D8AD
    STA $0625                  ; $D8B0
    BEQ $D8C3                  ; $D8B3
    .byte $AE,$25,$06
    LDA $0431,X                ; $D8B8
    STA $05FC                  ; $D8BB
    LDA #$1D                   ; $D8BE
    JSR $EF7F                  ; $D8C0
    JSR $D8DA                  ; $D8C3
    LDA #$80                   ; $D8C6
    AND a: $001E               ; $D8C8
    BEQ $D879                  ; $D8CB
    LDA #$F8                   ; $D8CD
    STA $02FC                  ; $D8CF
    .byte $AD,$24,$06
    STA $0638                  ; $D8D5
    SEC                        ; $D8D8
    RTS                        ; $D8D9
    LDA $0625                  ; $D8DA
    ASL                        ; $D8DD
    ASL                        ; $D8DE
    ASL                        ; $D8DF
    ASL                        ; $D8E0
    CLC                        ; $D8E1
    ADC #$9A                   ; $D8E2
    STA $02FC                  ; $D8E4
    LDA #$11                   ; $D8E7
    STA $02FD                  ; $D8E9
    LDA #$03                   ; $D8EC
    STA $02FE                  ; $D8EE
    LDA #$50                   ; $D8F1
    STA $02FF                  ; $D8F3
    RTS                        ; $D8F6
    .byte $A9,$00
    STA $0430                  ; $D8F9
    STA $0625                  ; $D8FC
    PHA                        ; $D8FF
    CMP $0441                  ; $D900
    BEQ $D941                  ; $D903
    CMP #$00                   ; $D905
    BEQ $D941                  ; $D907
    CMP #$0B                   ; $D909
    BEQ $D941                  ; $D90B
    JSR $CD7C                  ; $D90D
    LDY #$06                   ; $D910
    LDA ($0034),Y              ; $D912
    TAX                        ; $D914
    LDY #$08                   ; $D915
    LDA ($0034),Y              ; $D917
    TAY                        ; $D919
    JSR $CDE2                  ; $D91A
    CMP $0624                  ; $D91D
    BNE $D941                  ; $D920
    LDX $0430                  ; $D922
    CPX #$04                   ; $D925
    BCS $D941                  ; $D927
    PLA                        ; $D929
    PHA                        ; $D92A
    CMP #$0B                   ; $D92B
    BCC $D934                  ; $D92D
    LDY $0625                  ; $D92F
    BNE $D941                  ; $D932
    STA $0431,X                ; $D934
    INC $0430                  ; $D937
    CMP #$0B                   ; $D93A
    BCS $D941                  ; $D93C
    INC $0625                  ; $D93E
    PLA                        ; $D941
    CLC                        ; $D942
    ADC #$01                   ; $D943
    CMP #$16                   ; $D945
    BNE $D8FF                  ; $D947
    LDX $0430                  ; $D949
    BNE $D954                  ; $D94C
    LDA #$1C                   ; $D94E
    JSR $EF7F                  ; $D950
    RTS                        ; $D953
    LDA $0625                  ; $D954
    BNE $D961                  ; $D957
    TXA                        ; $D959
    CLC                        ; $D95A
    ADC #$1F                   ; $D95B
    JSR $EF7F                  ; $D95D
    RTS                        ; $D960
    DEX                        ; $D961
    BNE $D970                  ; $D962
    LDA $0431                  ; $D964
    STA $05FC                  ; $D967
    LDA #$1D                   ; $D96A
    JSR $EF7F                  ; $D96C
    RTS                        ; $D96F
    TXA                        ; $D970
    CLC                        ; $D971
    ADC #$18                   ; $D972
    JSR $EF7F                  ; $D974
    RTS                        ; $D977
    .byte $60,$A9,$38
    JSR $CBB0                  ; $D97B
    LDA $043C                  ; $D97E
    BEQ $D986                  ; $D981
    JMP $D70C                  ; $D983
    JSR $E6EC                  ; $D986
    LDA #$01                   ; $D989
    STA $003A                  ; $D98B
    LDA #$00                   ; $D98D
    STA $0430                  ; $D98F
    LDA $003A                  ; $D992
    CMP $0441                  ; $D994
    BEQ $D9A9                  ; $D997
    JSR $DA3A                  ; $D999
    BCC $D9A9                  ; $D99C
    LDX $0430                  ; $D99E
    LDA $003A                  ; $D9A1
    STA $0431,X                ; $D9A3
    INC $0430                  ; $D9A6
    INC $003A                  ; $D9A9
    LDA $003A                  ; $D9AB
    CMP #$0B                   ; $D9AD
    BNE $D992                  ; $D9AF
    LDA $0430                  ; $D9B1
    BNE $D9C8                  ; $D9B4
    LDA #$11                   ; $D9B6
    JSR $EF7F                  ; $D9B8
    LDA #$01                   ; $D9BB
    JSR $CB0F                  ; $D9BD
    LDA #$C0                   ; $D9C0
    AND a: $001E               ; $D9C2
    BEQ $D9BB                  ; $D9C5
    RTS                        ; $D9C7
    LDA #$10                   ; $D9C8
    JSR $EF7F                  ; $D9CA
    LDA #$82                   ; $D9CD
    STA $062D                  ; $D9CF
    LDA #$1F                   ; $D9D2
    STA $0494                  ; $D9D4
    LDA #$00                   ; $D9D7
    JMP $DA03                  ; $D9D9
    LDA #$01                   ; $D9DC
    JSR $CB0F                  ; $D9DE
    LDA #$03                   ; $D9E1
    AND a: $001E               ; $D9E3
    BEQ $DA12                  ; $D9E6
    LDX #$01                   ; $D9E8
    LSR                        ; $D9EA
    BCS $D9EF                  ; $D9EB
    LDX #$FF                   ; $D9ED
    TXA                        ; $D9EF
    CLC                        ; $D9F0
    ADC $0625                  ; $D9F1
    BPL $D9FC                  ; $D9F4
    LDA $0430                  ; $D9F6
    SEC                        ; $D9F9
    SBC #$01                   ; $D9FA
    CMP $0430                  ; $D9FC
    BCC $DA03                  ; $D9FF
    LDA #$00                   ; $DA01
    .byte $8D,$25,$06
    TAX                        ; $DA06
    LDA $0431,X                ; $DA07
    STA $05FC                  ; $DA0A
    LDA #$1D                   ; $DA0D
    JSR $EF7F                  ; $DA0F
    LDA #$40                   ; $DA12
    AND a: $001E               ; $DA14
    BEQ $DA1A                  ; $DA17
    RTS                        ; $DA19
    LDA #$80                   ; $DA1A
    AND a: $001E               ; $DA1C
    BEQ $D9DC                  ; $DA1F
    LDA $05FC                  ; $DA21
    JSR $CD7C                  ; $DA24
    LDY #$06                   ; $DA27
    LDA ($0034),Y              ; $DA29
    TAX                        ; $DA2B
    LDY #$08                   ; $DA2C
    LDA ($0034),Y              ; $DA2E
    TAY                        ; $DA30
    JSR $CDE2                  ; $DA31
    STA $0638                  ; $DA34
    JMP $D70C                  ; $DA37
    JSR $CD7C                  ; $DA3A
    LDY #$06                   ; $DA3D
    LDA ($0034),Y              ; $DA3F
    SEC                        ; $DA41
    SBC $0635                  ; $DA42
    BCS $DA4B                  ; $DA45
    EOR #$FF                   ; $DA47
    ADC #$01                   ; $DA49
    CMP #$14                   ; $DA4B
    BCS $DA63                  ; $DA4D
    LDY #$08                   ; $DA4F
    LDA ($0034),Y              ; $DA51
    SEC                        ; $DA53
    SBC $0637                  ; $DA54
    BCS $DA5D                  ; $DA57
    EOR #$FF                   ; $DA59
    ADC #$01                   ; $DA5B
    CMP #$14                   ; $DA5D
    BCS $DA63                  ; $DA5F
    SEC                        ; $DA61
    RTS                        ; $DA62
    CLC                        ; $DA63
    RTS                        ; $DA64
    .byte $A9,$38
    JSR $CBB0                  ; $DA67
    LDA #$83                   ; $DA6A
    STA $062D                  ; $DA6C
    LDA #$00                   ; $DA6F
    STA $0624                  ; $DA71
    LDA #$01                   ; $DA74
    JSR $CB0F                  ; $DA76
    LDX $0624                  ; $DA79
    INX                        ; $DA7C
    CPX #$10                   ; $DA7D
    BCC $DA83                  ; $DA7F
    LDX #$00                   ; $DA81
    STX $0624                  ; $DA83
    LDA #$40                   ; $DA86
    AND a: $001E               ; $DA88
    BEQ $DA8E                  ; $DA8B
    RTS                        ; $DA8D
    LDA #$80                   ; $DA8E
    AND a: $001E               ; $DA90
    BEQ $DA74                  ; $DA93
    JMP $D70C                  ; $DA95
    .byte $A9,$00
    STA $062D                  ; $DA9A
    STA $0615                  ; $DA9D
    LDA #$33                   ; $DAA0
    JSR $CBB0                  ; $DAA2
    LDA #$FF                   ; $DAA5
    JMP $CEFE                  ; $DAA7
    .byte $A9,$01
    JSR $CBF1                  ; $DAAC
    JSR $CF4F                  ; $DAAF
    PHA                        ; $DAB2
    LDA $0022                  ; $DAB3
    LDA #$1A                   ; $DAB5
    STA $0024                  ; $DAB7
    LDA #$1B                   ; $DAB9
    STA $0025                  ; $DABB
    JSR $CE2D                  ; $DABD
    PLA                        ; $DAC0
    JSR $8039                  ; $DAC1
    JSR $DB24                  ; $DAC4
    LDA #$00                   ; $DAC7
    JSR $EF7F                  ; $DAC9
    LDA #$01                   ; $DACC
    JSR $EF7F                  ; $DACE
    LDA $0629                  ; $DAD1
    CMP #$04                   ; $DAD4
    BEQ $DAE9                  ; $DAD6
    LDA #$35                   ; $DAD8
    JSR $CBB0                  ; $DADA
    LDA #$01                   ; $DADD
    JSR $CB0F                  ; $DADF
    LDA a: $001C               ; $DAE2
    AND #$C0                   ; $DAE5
    BEQ $DADD                  ; $DAE7
    LDA $05FB                  ; $DAE9
    CLC                        ; $DAEC
    ADC #$08                   ; $DAED
    STA $0441                  ; $DAEF
    JSR $DC07                  ; $DAF2
    LDA a: $00E2               ; $DAF5
    AND #$07                   ; $DAF8
    CMP #$05                   ; $DAFA
    BCC $DB00                  ; $DAFC
    SBC #$05                   ; $DAFE
    TAX                        ; $DB00
    LDA $DC82,X                ; $DB01
    CLC                        ; $DB04
    ADC $05FB                  ; $DB05
    STA $05FC                  ; $DB08
    JSR $E6EC                  ; $DB0B
    LDA #$36                   ; $DB0E
    JSR $CBB0                  ; $DB10
    LDA $05FC                  ; $DB13
    STA $0441                  ; $DB16
    LDA #$01                   ; $DB19
    STA $05FD                  ; $DB1B
    LDX #$50                   ; $DB1E
    TXS                        ; $DB20
    JMP $E0DF                  ; $DB21
    LDA $0629                  ; $DB24
    JSR $CB99                  ; $DB27
    .byte $34,$DB,$9E,$DB,$FC,$DB,$F3,$DB,$03,$DC,$48
    LDA $0022                  ; $DB35
    LDA #$1C                   ; $DB37
    STA $0024                  ; $DB39
    LDA #$1D                   ; $DB3B
    STA $0025                  ; $DB3D
    JSR $CE2D                  ; $DB3F
    PLA                        ; $DB42
    JSR $8003                  ; $DB43
    LDA #$00                   ; $DB46
    STA $0447                  ; $DB48
    LDX #$00                   ; $DB4B
    LDA a: $002B               ; $DB4D
    CMP #$03                   ; $DB50
    BEQ $DB5B                  ; $DB52
    BIT a: $00E2               ; $DB54
    BPL $DB5B                  ; $DB57
    LDX #$0B                   ; $DB59
    STX $044F                  ; $DB5B
    STX $05FB                  ; $DB5E
    RTS                        ; $DB61
    .byte $A9,$0A
    LDX a: $002A               ; $DB64
    CPX #$02                   ; $DB67
    BNE $DB6D                  ; $DB69
    LDA #$14                   ; $DB6B
    PHA                        ; $DB6D
    CMP #$0B                   ; $DB6E
    BCC $DB74                  ; $DB70
    ADC #$0A                   ; $DB72
    LDX #$00                   ; $DB74
    JSR $CE08                  ; $DB76
    LDY #$00                   ; $DB79
    LDA ($0034),Y              ; $DB7B
    CMP #$20                   ; $DB7D
    BNE $DB8C                  ; $DB7F
    LDA $044D                  ; $DB81
    BEQ $DB8C                  ; $DB84
    LDA #$00                   ; $DB86
    STA $0032                  ; $DB88
    STA $0033                  ; $DB8A
    LDY #$01                   ; $DB8C
    LDA $0032                  ; $DB8E
    STA ($0034),Y              ; $DB90
    INY                        ; $DB92
    LDA $0033                  ; $DB93
    STA ($0034),Y              ; $DB95
    PLA                        ; $DB97
    SEC                        ; $DB98
    SBC #$01                   ; $DB99
    BPL $DB6D                  ; $DB9B
    RTS                        ; $DB9D
    .byte $20,$F3,$DB
    LDX #$00                   ; $DBA1
    LDA a: $002B               ; $DBA3
    CMP $DBEA,X                ; $DBA6
    BEQ $DBB4                  ; $DBA9
    INX                        ; $DBAB
    INX                        ; $DBAC
    INX                        ; $DBAD
    CPX #$09                   ; $DBAE
    BEQ $DBCB                  ; $DBB0
    BNE $DBA6                  ; $DBB2
    LDA $DBEB,X                ; $DBB4
    JSR $CD7C                  ; $DBB7
    LDY #$00                   ; $DBBA
    LDA $DBEC,X                ; $DBBC
    STA ($0034),Y              ; $DBBF
    LDA a: $002B               ; $DBC1
    CMP #$0C                   ; $DBC4
    BNE $DBCB                  ; $DBC6
    JSR $DBCC                  ; $DBC8
    RTS                        ; $DBCB
    LDA #$0C                   ; $DBCC
    PHA                        ; $DBCE
    CMP #$14                   ; $DBCF
    BEQ $DBE1                  ; $DBD1
    JSR $CD7C                  ; $DBD3
    LDY #$01                   ; $DBD6
    LDA #$80                   ; $DBD8
    STA ($0034),Y              ; $DBDA
    INY                        ; $DBDC
    LDA #$CB                   ; $DBDD
    STA ($0034),Y              ; $DBDF
    PLA                        ; $DBE1
    CLC                        ; $DBE2
    ADC #$01                   ; $DBE3
    CMP #$16                   ; $DBE5
    BNE $DBCE                  ; $DBE7
    RTS                        ; $DBE9
    .byte $23,$14,$75,$0C,$14,$34,$12,$15,$45
    LDA $044F                  ; $DBF3
    EOR #$0B                   ; $DBF6
    STA $05FB                  ; $DBF8
    RTS                        ; $DBFB
    .byte $AD,$4F,$04
    STA $05FB                  ; $DBFF
    RTS                        ; $DC02
    .byte $20,$4F,$CF
    RTS                        ; $DC06
    LDA a: $002C               ; $DC07
    ASL                        ; $DC0A
    PHA                        ; $DC0B
    ADC a: $002C               ; $DC0C
    STA $003A                  ; $DC0F
    PLA                        ; $DC11
    ASL                        ; $DC12
    ASL                        ; $DC13
    ADC $003A                  ; $DC14
    STA $003A                  ; $DC16
    LDA a: $002E               ; $DC18
    ASL                        ; $DC1B
    PHA                        ; $DC1C
    ADC a: $002E               ; $DC1D
    STA $003B                  ; $DC20
    PLA                        ; $DC22
    ASL                        ; $DC23
    ASL                        ; $DC24
    ADC $003B                  ; $DC25
    STA $003B                  ; $DC27
    LDA #$00                   ; $DC29
    .byte $48
    JSR $CD7C                  ; $DC2C
    LDX $003A                  ; $DC2F
    INC $003A                  ; $DC31
    PLA                        ; $DC33
    PHA                        ; $DC34
    CMP #$0B                   ; $DC35
    LDA $05FB                  ; $DC37
    BCC $DC42                  ; $DC3A
    LDX $003B                  ; $DC3C
    EOR #$0B                   ; $DC3E
    INC $003B                  ; $DC40
    TAY                        ; $DC42
    LDA $DC87,X                ; $DC43
    DEY                        ; $DC46
    BMI $DC4C                  ; $DC47
    LDA $DCB3,X                ; $DC49
    JSR $CDC9                  ; $DC4C
    LDA $05FB                  ; $DC4F
    BEQ $DC5E                  ; $DC52
    TYA                        ; $DC54
    EOR #$FF                   ; $DC55
    TAY                        ; $DC57
    TXA                        ; $DC58
    EOR #$FF                   ; $DC59
    TAX                        ; $DC5B
    INY                        ; $DC5C
    INX                        ; $DC5D
    TYA                        ; $DC5E
    LDY #$08                   ; $DC5F
    STA ($0034),Y              ; $DC61
    TXA                        ; $DC63
    LDY #$06                   ; $DC64
    STA ($0034),Y              ; $DC66
    PLA                        ; $DC68
    PHA                        ; $DC69
    BEQ $DC70                  ; $DC6A
    CMP #$0B                   ; $DC6C
    BNE $DC76                  ; $DC6E
    LDA #$00                   ; $DC70
    LDY #$07                   ; $DC72
    STA ($0034),Y              ; $DC74
    PLA                        ; $DC76
    CLC                        ; $DC77
    ADC #$01                   ; $DC78
    CMP #$16                   ; $DC7A
    BEQ $DC81                  ; $DC7C
    JMP $DC2B                  ; $DC7E
    RTS                        ; $DC81
    .byte $05,$06,$07,$09,$0A,$05,$3D,$46,$41,$2A,$57,$77,$5C,$71,$72,$6C
    .byte $05,$3D,$46,$41,$2A,$63,$68,$5A,$72,$59,$71,$05,$3D,$46,$35,$4C
    .byte $63,$68,$4F,$72,$5A,$71,$05,$3D,$46,$35,$37,$59,$77,$68,$72,$71
    .byte $63,$EA,$BE,$B5,$AE,$C5,$A4,$79,$9F,$97,$94,$82,$EA,$BE,$B5,$AE
    .byte $C5,$99,$92,$95,$7B,$96,$80,$EA,$B2,$A9,$BA,$96,$99,$92,$94,$7B
    .byte $95,$80,$EA,$B2,$A9,$BB,$B9,$A2,$79,$9F,$95,$97,$A4,$AD,$4E,$04
    BNE $DCEF                  ; $DCE2
    LDA a: $00E2               ; $DCE4
    AND #$01                   ; $DCE7
    CLC                        ; $DCE9
    ADC #$01                   ; $DCEA
    STA $044E                  ; $DCEC
    RTS                        ; $DCEF
    .byte $A9,$00,$8D,$3B,$04,$20,$DF,$DC,$A9,$1D,$20,$B0,$CB,$A9,$FF
    STA $061A                  ; $DCFF
    .byte $20,$81,$DD
    JSR $DD47                  ; $DD05
    PHP                        ; $DD08
    LDA #$00                   ; $DD09
    STA $061B                  ; $DD0B
    JSR $E73E                  ; $DD0E
    PLP                        ; $DD11
    BCC $DD1C                  ; $DD12
    LDA #$2D                   ; $DD14
    JSR $CBB0                  ; $DD16
    JMP $801B                  ; $DD19
    JSR $CD77                  ; $DD1C
    LDY #$0A                   ; $DD1F
    LDA ($0034),Y              ; $DD21
    BNE $DD36                  ; $DD23
    LDA #$1A                   ; $DD25
    STA $0024                  ; $DD27
    LDA #$1B                   ; $DD29
    STA $0025                  ; $DD2B
    JSR $CE2D                  ; $DD2D
    LDX #$50                   ; $DD30
    TXS                        ; $DD32
    JMP $8006                  ; $DD33
    LDA #$1A                   ; $DD36
    STA $0024                  ; $DD38
    LDA #$1B                   ; $DD3A
    STA $0025                  ; $DD3C
    JSR $CE2D                  ; $DD3E
    LDX #$50                   ; $DD41
    TXS                        ; $DD43
    JMP $8018                  ; $DD44
    LDA $043C                  ; $DD47
    BNE $DD6E                  ; $DD4A
    LDA $0635                  ; $DD4C
    LDX $05FB                  ; $DD4F
    BEQ $DD56                  ; $DD52
    EOR #$FF                   ; $DD54
    CMP #$80                   ; $DD56
    BCS $DD6E                  ; $DD58
    ADC #$4F                   ; $DD5A
    LDX $05FB                  ; $DD5C
    BEQ $DD63                  ; $DD5F
    .byte $49,$FF
    TAX                        ; $DD63
    LDY #$7C                   ; $DD64
    JSR $CDE2                  ; $DD66
    STA $0638                  ; $DD69
    SEC                        ; $DD6C
    RTS                        ; $DD6D
    LDA #$E9                   ; $DD6E
    LDX $05FB                  ; $DD70
    BEQ $DD77                  ; $DD73
    LDA #$05                   ; $DD75
    LSR a: $00E2               ; $DD77
    ADC #$00                   ; $DD7A
    STA $0638                  ; $DD7C
    CLC                        ; $DD7F
    RTS                        ; $DD80
    LDA $0635                  ; $DD81
    LDX $05FB                  ; $DD84
    BEQ $DD8E                  ; $DD87
    EOR #$FF                   ; $DD89
    CLC                        ; $DD8B
    ADC #$01                   ; $DD8C
    CMP #$A0                   ; $DD8E
    BCS $DD9E                  ; $DD90
    SEC                        ; $DD92
    SBC #$30                   ; $DD93
    LSR                        ; $DD95
    LSR                        ; $DD96
    LSR                        ; $DD97
    TAX                        ; $DD98
    LDA $DDCB,X                ; $DD99
    BNE $DDBE                  ; $DD9C
    SEC                        ; $DD9E
    SBC #$A0                   ; $DD9F
    LSR                        ; $DDA1
    LSR                        ; $DDA2
    LSR                        ; $DDA3
    STA $003A                  ; $DDA4
    LDA $0637                  ; $DDA6
    BPL $DDAD                  ; $DDA9
    EOR #$FF                   ; $DDAB
    SEC                        ; $DDAD
    SBC #$50                   ; $DDAE
    AND #$38                   ; $DDB0
    LSR                        ; $DDB2
    STA $003B                  ; $DDB3
    LSR                        ; $DDB5
    ADC $003B                  ; $DDB6
    ADC $003A                  ; $DDB8
    TAX                        ; $DDBA
    LDA $DDD9,X                ; $DDBB
    STA $062B                  ; $DDBE
    ASL                        ; $DDC1
    ASL                        ; $DDC2
    ASL                        ; $DDC3
    ADC $062B                  ; $DDC4
    STA $062B                  ; $DDC7
    RTS                        ; $DDCA
    .byte $13,$12,$11,$10,$0F,$0E,$0D,$0C,$0B,$0A,$09,$08,$07,$06,$05,$05
    .byte $05,$05,$05,$05,$05,$04,$04,$04,$04,$04,$05,$04,$03,$03,$03,$03
    .byte $05,$04,$03,$02,$02,$02,$05,$04,$03,$02,$01,$01,$05,$04,$03,$02
    .byte $01,$00,$AD,$E2,$00
    AND #$07                   ; $DE00
    CMP #$06                   ; $DE02
    BCC $DE08                  ; $DE04
    SBC #$06                   ; $DE06
    CLC                        ; $DE08
    ADC #$05                   ; $DE09
    ADC $05FB                  ; $DE0B
    STA $05FC                  ; $DE0E
    LDA $05FB                  ; $DE11
    STA $0441                  ; $DE14
    JSR $E6EC                  ; $DE17
    LDY #$0A                   ; $DE1A
    LDA #$00                   ; $DE1C
    STA ($0034),Y              ; $DE1E
    LDA #$00                   ; $DE20
    STA $0628                  ; $DE22
    STA $044E                  ; $DE25
    JSR $DCDF                  ; $DE28
    LDA #$01                   ; $DE2B
    STA $043B                  ; $DE2D
    LDA #$00                   ; $DE30
    STA $043C                  ; $DE32
    JSR $D093                  ; $DE35
    LDA #$3A                   ; $DE38
    JSR $CBB0                  ; $DE3A
    LDA #$1A                   ; $DE3D
    STA $061A                  ; $DE3F
    JMP $DE5E                  ; $DE42
    .byte $A9,$01,$8D,$3B,$04,$20,$DF,$DC,$A9,$18,$20,$B0,$CB,$A9,$FF
    BIT $0628                  ; $DE54
    BPL $DE5B                  ; $DE57
    LDA #$26                   ; $DE59
    STA $061A                  ; $DE5B
    .byte $20,$59,$E0
    JSR $DF8B                  ; $DE61
    LDA #$01                   ; $DE64
    STA $061B                  ; $DE66
    JSR $E73E                  ; $DE69
    .byte $AD,$FC,$05
    CMP #$FF                   ; $DE6F
    BEQ $DE96                  ; $DE71
    STA $0441                  ; $DE73
    JSR $E6EC                  ; $DE76
    PHA                        ; $DE79
    LDA $0022                  ; $DE7A
    LDA #$1A                   ; $DE7C
    STA $0024                  ; $DE7E
    LDA #$1B                   ; $DE80
    STA $0025                  ; $DE82
    JSR $CE2D                  ; $DE84
    PLA                        ; $DE87
    JSR $801E                  ; $DE88
    LDA #$1C                   ; $DE8B
    JSR $CBB0                  ; $DE8D
    LDX #$50                   ; $DE90
    TXS                        ; $DE92
    JMP $E0DF                  ; $DE93
    .byte $AD,$2B,$06
    STA $0430                  ; $DE99
    LDA #$01                   ; $DE9C
    STA $05FF                  ; $DE9E
    LDA $05FB                  ; $DEA1
    JSR $DF4A                  ; $DEA4
    STA $0431                  ; $DEA7
    LDA $05FB                  ; $DEAA
    EOR #$0B                   ; $DEAD
    JSR $DF4A                  ; $DEAF
    STA $0432                  ; $DEB2
    LDA $0431                  ; $DEB5
    LDX #$23                   ; $DEB8
    JSR $DF29                  ; $DEBA
    LDA $0431                  ; $DEBD
    BCS $DEDC                  ; $DEC0
    LDA $0432                  ; $DEC2
    LDX #$24                   ; $DEC5
    JSR $DF29                  ; $DEC7
    LDA $0432                  ; $DECA
    BCS $DEDC                  ; $DECD
    DEC $0430                  ; $DECF
    BNE $DEB5                  ; $DED2
    LDA #$34                   ; $DED4
    JSR $CBB0                  ; $DED6
    JMP $801B                  ; $DED9
    LDX #$00                   ; $DEDC
    CMP #$0B                   ; $DEDE
    BCC $DEE4                  ; $DEE0
    LDX #$0B                   ; $DEE2
    STA $0441                  ; $DEE4
    LDY #$1C                   ; $DEE7
    TXA                        ; $DEE9
    EOR $05FB                  ; $DEEA
    STX $05FB                  ; $DEED
    BEQ $DEF7                  ; $DEF0
    JSR $D093                  ; $DEF2
    LDY #$3E                   ; $DEF5
    TYA                        ; $DEF7
    PHA                        ; $DEF8
    LDA $0441                  ; $DEF9
    JSR $CD7C                  ; $DEFC
    LDA $0635                  ; $DEFF
    LDY #$06                   ; $DF02
    STA ($0034),Y              ; $DF04
    LDA $0637                  ; $DF06
    LDY #$08                   ; $DF09
    STA ($0034),Y              ; $DF0B
    PHA                        ; $DF0D
    LDA $0022                  ; $DF0E
    LDA #$1A                   ; $DF10
    STA $0024                  ; $DF12
    LDA #$1B                   ; $DF14
    STA $0025                  ; $DF16
    JSR $CE2D                  ; $DF18
    PLA                        ; $DF1B
    JSR $801E                  ; $DF1C
    PLA                        ; $DF1F
    JSR $CBB0                  ; $DF20
    LDX #$50                   ; $DF23
    TXS                        ; $DF25
    JMP $E0DF                  ; $DF26
    JSR $CE08                  ; $DF29
    LDA #$01                   ; $DF2C
    STA $05FF                  ; $DF2E
    JSR $E854                  ; $DF31
    LDY #$06                   ; $DF34
    LDA ($0034),Y              ; $DF36
    TAX                        ; $DF38
    LDY #$08                   ; $DF39
    LDA ($0034),Y              ; $DF3B
    TAY                        ; $DF3D
    JSR $CDE2                  ; $DF3E
    CMP $05FE                  ; $DF41
    BNE $DF48                  ; $DF44
    SEC                        ; $DF46
    RTS                        ; $DF47
    CLC                        ; $DF48
    RTS                        ; $DF49
    JSR $CE99                  ; $DF4A
    PHA                        ; $DF4D
    JSR $CD7C                  ; $DF4E
    LDA $05FE                  ; $DF51
    LDY #$09                   ; $DF54
    STA ($0034),Y              ; $DF56
    PLA                        ; $DF58
    RTS                        ; $DF59
    .byte $20,$7C,$CD,$A0,$0A,$B1,$34,$D0,$26,$A0,$06,$B1,$34,$38,$ED,$35
    .byte $06,$B0,$04,$49,$FF,$69,$01,$C5,$3B,$B0,$14,$A0,$08,$B1,$34,$38
    .byte $ED,$37,$06,$B0,$04,$49,$FF,$69,$01,$C5,$3B,$B0,$02,$38,$60,$18
    .byte $60
    LDA $0638                  ; $DF8B
    JSR $CDC9                  ; $DF8E
    TXA                        ; $DF91
    SEC                        ; $DF92
    SBC $0635                  ; $DF93
    BCS $DF9C                  ; $DF96
    EOR #$FF                   ; $DF98
    ADC #$01                   ; $DF9A
    STA $003A                  ; $DF9C
    TYA                        ; $DF9E
    SEC                        ; $DF9F
    SBC $0637                  ; $DFA0
    BCS $DFA9                  ; $DFA3
    EOR #$FF                   ; $DFA5
    ADC #$01                   ; $DFA7
    TAY                        ; $DFA9
    SEC                        ; $DFAA
    SBC $003A                  ; $DFAB
    BCS $DFB1                  ; $DFAD
    LDY $003A                  ; $DFAF
    TYA                        ; $DFB1
    LSR                        ; $DFB2
    LSR                        ; $DFB3
    LSR                        ; $DFB4
    TAX                        ; $DFB5
    LDA $DFBD,X                ; $DFB6
    STA $062B                  ; $DFB9
    RTS                        ; $DFBC
    .byte $02,$03,$03,$03,$03,$04,$04,$04,$04,$04,$04,$05,$05,$05,$05,$05
    .byte $05,$05,$05,$05,$20,$DF,$DC,$A9,$19,$20,$B0,$CB,$20,$59,$E0
    LDA #$FF                   ; $DFDC
    STA $061A                  ; $DFDE
    LDA #$01                   ; $DFE1
    STA $061B                  ; $DFE3
    JSR $E73E                  ; $DFE6
    LDA #$1A                   ; $DFE9
    JSR $CBB0                  ; $DFEB
    LDA $0441                  ; $DFEE
    JSR $CD7C                  ; $DFF1
    LDA $0443                  ; $DFF4
    ASL                        ; $DFF7
    ASL                        ; $DFF8
    ASL                        ; $DFF9
    LDX $05FB                  ; $DFFA
    BEQ $E004                  ; $DFFD
    .byte $49
