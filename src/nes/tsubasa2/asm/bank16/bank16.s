; ============================================================
; bank16/bank16.s
; bank 16 - 真实 6502 汇编 (8KB)
; CPU 地址范围: $8000-$9FFF
; 源: _tmp_bzk_out/bank_16/bank_16_partMM.asm
; 代码=助记符, 数据=.byte, build_nes.py 可直接编译
; ============================================================

.segment "PRG_BANK16"
.org $8000

    .byte $4C,$06,$80
    JMP $8021                  ; $8003
    .byte $A2,$89
    LDA $0518                  ; $8008
    ASL                        ; $800B
    TAY                        ; $800C
    BCC $8010                  ; $800D
    .byte $E8
    LDA #$BF                   ; $8010
    STA $005D                  ; $8012
    STX $005E                  ; $8014
    LDA ($005D),Y              ; $8016
    TAX                        ; $8018
    INY                        ; $8019
    LDA ($005D),Y              ; $801A
    STA $005E                  ; $801C
    STX $005D                  ; $801E
    RTS                        ; $8020
    .byte $AD,$17,$05
    STA $052A                  ; $8024
    LDA $0516                  ; $8027
    AND #$FB                   ; $802A
    STA $0516                  ; $802C
    LDA #$00                   ; $802F
    STA $052B                  ; $8031
    STA $052D                  ; $8034
    STA $052C                  ; $8037
    STA $0530                  ; $803A
    STA $003A                  ; $803D
    .byte $A4,$3A
    INC $003A                  ; $8041
    LDA ($005D),Y              ; $8043
    CMP #$F0                   ; $8045
    BCC $804F                  ; $8047
    JSR $80A9                  ; $8049
    JMP $803F                  ; $804C
    STA $0523                  ; $804F
    LDA $0516                  ; $8052
    ORA #$40                   ; $8055
    AND #$EF                   ; $8057
    STA $0516                  ; $8059
    LDY $003A                  ; $805C
    INC $003A                  ; $805E
    LDA ($005D),Y              ; $8060
    CMP #$F0                   ; $8062
    BCC $8069                  ; $8064
    JSR $8991                  ; $8066
    STA $0524                  ; $8069
    LDY $003A                  ; $806C
    INC $003A                  ; $806E
    LDA ($005D),Y              ; $8070
    CMP #$F0                   ; $8072
    BCC $8079                  ; $8074
    JSR $899C                  ; $8076
    STA $0528                  ; $8079
    LDY $003A                  ; $807C
    INC $003A                  ; $807E
    LDA ($005D),Y              ; $8080
    CMP #$F0                   ; $8082
    BCC $8089                  ; $8084
    JSR $89A7                  ; $8086
    STA $0529                  ; $8089
    LDA $003A                  ; $808C
    CLC                        ; $808E
    ADC $005D                  ; $808F
    STA $005D                  ; $8091
    BCC $8097                  ; $8093
    INC $005E                  ; $8095
    LDX #$15                   ; $8097
    LDA #$F0                   ; $8099
    STA $0001,X                ; $809B
    LDA #$0B                   ; $809D
    STA $0002,X                ; $809F
    LDA #$80                   ; $80A1
    LDY #$08                   ; $80A3
    JSR $C50F                  ; $80A5
    RTS                        ; $80A8
    SEC                        ; $80A9
    SBC #$F0                   ; $80AA
    JSR $C509                  ; $80AC
    .byte $CF,$80,$D4,$80,$F4,$80,$05,$81,$E0,$87,$E6,$87,$EC,$87,$F5,$87
    .byte $FF,$87,$09,$88,$1A,$88,$37,$88,$53,$88,$5D,$88,$E3,$88,$ED,$88
    .byte $A9,$00
    STA $052A                  ; $80D1
    LDA #$08                   ; $80D4
    BIT $0516                  ; $80D6
    BNE $80E6                  ; $80D9
    ORA $0516                  ; $80DB
    STA $0516                  ; $80DE
    LDX #$05                   ; $80E1
    JSR $C51B                  ; $80E3
    LDA #$00                   ; $80E6
    STA $0522                  ; $80E8
    LDA $0021                  ; $80EB
    AND #$1E                   ; $80ED
    STA $0021                  ; $80EF
    PLA                        ; $80F1
    PLA                        ; $80F2
    RTS                        ; $80F3
    .byte $A4,$3A,$B1,$5D
    TAX                        ; $80F8
    INY                        ; $80F9
    LDA ($005D),Y              ; $80FA
    STA $005E                  ; $80FC
    STX $005D                  ; $80FE
    LDA #$00                   ; $8100
    STA $003A                  ; $8102
    RTS                        ; $8104
    .byte $A4,$3A
    LDA ($005D),Y              ; $8107
    PHA                        ; $8109
    JSR $816E                  ; $810A
    PLA                        ; $810D
    BPL $812F                  ; $810E
    TXA                        ; $8110
    SEC                        ; $8111
    ADC $003A                  ; $8112
    CLC                        ; $8114
    ADC $005D                  ; $8115
    STA $005D                  ; $8117
    BCC $811D                  ; $8119
    INC $005E                  ; $811B
    LDY #$00                   ; $811D
    LDA ($005D),Y              ; $811F
    CLC                        ; $8121
    ADC $005D                  ; $8122
    STA $005D                  ; $8124
    BCC $812A                  ; $8126
    INC $005E                  ; $8128
    LDA #$00                   ; $812A
    STA $003A                  ; $812C
    RTS                        ; $812E
    .byte $8A
    ASL                        ; $8130
    SEC                        ; $8131
    ADC $003A                  ; $8132
    TAY                        ; $8134
    JMP $80F6                  ; $8135
    AND #$FC                   ; $8138
    BEQ $814D                  ; $813A
    LSR                        ; $813C
    STA $003B                  ; $813D
    LDA a: $00E2               ; $813F
    .byte $C5,$3B
    BCC $814B                  ; $8144
    SBC $003B                  ; $8146
    JMP $8142                  ; $8148
    ADC $003B                  ; $814B
    LDX #$00                   ; $814D
    RTS                        ; $814F
    JSR $C50C                  ; $8150
    LDY #$01                   ; $8153
    LDA ($0034),Y              ; $8155
    SEC                        ; $8157
    SBC #$40                   ; $8158
    TAX                        ; $815A
    INY                        ; $815B
    LDA ($0034),Y              ; $815C
    SBC #$00                   ; $815E
    BPL $8165                  ; $8160
    LDX #$00                   ; $8162
    TXA                        ; $8164
    STA ($0034),Y              ; $8165
    DEY                        ; $8167
    TXA                        ; $8168
    STA ($0034),Y              ; $8169
    LDX #$01                   ; $816B
    RTS                        ; $816D
    AND #$7F                   ; $816E
    JSR $C509                  ; $8170
    .byte $1C,$82,$2C,$82,$51,$82,$55,$82,$59,$82,$60,$82,$64,$82,$71,$82
    .byte $75,$82,$8A,$82,$97,$82,$9B,$82,$9F,$82,$BA,$82,$66,$83,$6A,$83
    .byte $6E,$83,$7C,$83,$80,$83,$84,$83,$A4,$83,$A8,$83,$B4,$83,$C2,$83
    .byte $C6,$83,$D6,$83,$DD,$83,$E4,$83,$EB,$83,$F5,$83,$01,$84,$0A,$84
    .byte $0E,$84,$2B,$84,$36,$84,$3E,$84,$42,$84,$4E,$84,$57,$84,$4E,$84
    .byte $7E,$84,$98,$84,$B2,$84,$C7,$84,$E7,$84,$EF,$84,$FC,$84,$0B,$85
    .byte $27,$85,$3A,$85,$46,$85,$56,$85,$6C,$85,$70,$85,$80,$85,$87,$85
    .byte $92,$85,$A2,$85,$B2,$85,$BE,$85,$CA,$85,$DA,$85,$E6,$85,$FE,$85
    .byte $02,$86,$10,$86,$27,$86,$2E,$86,$3B,$86,$4A,$86,$77,$86,$8A,$86
    .byte $B6,$86,$CC,$86
    JSR $C50C                  ; $8207
    LDY #$00                   ; $820A
    LDA ($0034),Y              ; $820C
    LDX #$00                   ; $820E
    RTS                        ; $8210
    .byte $F0,$08
    LDA $0516                  ; $8213
    ORA #$04                   ; $8216
    STA $0516                  ; $8218
    RTS                        ; $821B
    .byte $AD,$42,$04
    JSR $C50C                  ; $821F
    LDY #$00                   ; $8222
    LDX #$00                   ; $8224
    LDA ($0034),Y              ; $8226
    BNE $822B                  ; $8228
    INX                        ; $822A
    RTS                        ; $822B
    .byte $AD,$44,$04
    LDY $0612                  ; $822F
    CPY #$02                   ; $8232
    BCC $8239                  ; $8234
    LDA $0445                  ; $8236
    JSR $8138                  ; $8239
    CMP #$80                   ; $823C
    BCC $8250                  ; $823E
    LDA $0442                  ; $8240
    LDX $0612                  ; $8243
    CPX #$02                   ; $8246
    BCC $824D                  ; $8248
    LDA $0441                  ; $824A
    JSR $8150                  ; $824D
    RTS                        ; $8250
    .byte $AE,$3D,$04
    RTS                        ; $8254
    .byte $AE,$12,$06
    RTS                        ; $8258
    .byte $AE,$4E,$04
    BEQ $825F                  ; $825C
    DEX                        ; $825E
    RTS                        ; $825F
    .byte $AE,$16,$06
    RTS                        ; $8263
    .byte $A2,$00
    LDA $0442                  ; $8266
    BEQ $826F                  ; $8269
    CMP #$0B                   ; $826B
    BNE $8270                  ; $826D
    INX                        ; $826F
    RTS                        ; $8270
    .byte $AE,$12,$06
    RTS                        ; $8274
    .byte $A2,$02
    LDA $0442                  ; $8277
    BEQ $8289                  ; $827A
    CMP #$0B                   ; $827C
    BEQ $8289                  ; $827E
    DEX                        ; $8280
    LDA $043D                  ; $8281
    CMP #$03                   ; $8284
    BEQ $8289                  ; $8286
    DEX                        ; $8288
    RTS                        ; $8289
    .byte $AC,$3B,$04
    LDX $8291,Y                ; $828D
    RTS                        ; $8290
    .byte $00,$01,$FF,$FF,$02,$03,$AE,$3D,$04
    RTS                        ; $829A
    .byte $AE,$12,$06
    RTS                        ; $829E
    .byte $A2,$00
    LDA $043B                  ; $82A1
    BNE $82B1                  ; $82A4
    LDA $043C                  ; $82A6
    AND #$7F                   ; $82A9
    CMP #$03                   ; $82AB
    BCC $82B9                  ; $82AD
    BCS $82B8                  ; $82AF
    LDA $043C                  ; $82B1
    AND #$7F                   ; $82B4
    BEQ $82B9                  ; $82B6
    INX                        ; $82B8
    RTS                        ; $82B9
    .byte $AD,$43,$04
    CMP #$06                   ; $82BD
    BEQ $82DA                  ; $82BF
    LDA $062C                  ; $82C1
    BPL $82CB                  ; $82C4
    EOR #$FF                   ; $82C6
    CLC                        ; $82C8
    ADC #$01                   ; $82C9
    CMP #$40                   ; $82CB
    BCC $82D3                  ; $82CD
    EOR #$FF                   ; $82CF
    AND #$3F                   ; $82D1
    CMP #$20                   ; $82D3
    BCC $82DA                  ; $82D5
    INC $0443                  ; $82D7
    LDA $0443                  ; $82DA
    ASL                        ; $82DD
    ASL                        ; $82DE
    ADC $0443                  ; $82DF
    TAY                        ; $82E2
    LDX #$00                   ; $82E3
    LDA a: $00E3               ; $82E5
    CMP $8308,Y                ; $82E8
    BCS $82F3                  ; $82EB
    BEQ $82F3                  ; $82ED
    INX                        ; $82EF
    INY                        ; $82F0
    BNE $82E8                  ; $82F1
    TXA                        ; $82F3
    PHA                        ; $82F4
    JSR $82FB                  ; $82F5
    PLA                        ; $82F8
    TAX                        ; $82F9
    RTS                        ; $82FA
    JSR $C509                  ; $82FB
    .byte $36,$83,$37,$83,$2D,$83,$40,$83,$4C,$83,$4D,$39,$21,$0F,$00,$81
    .byte $53,$2D,$19,$00,$57,$1F,$17,$0D,$00,$64,$1F,$17,$0D,$00,$2C,$13
    .byte $FF,$0F,$00,$42,$1E,$FF,$15,$00,$1F,$13,$FF,$0F,$00,$00,$00,$20
    .byte $50,$83
    LDA #$02                   ; $8330
    STA $0612                  ; $8332
    RTS                        ; $8335
    .byte $60,$A9,$02
    STA $0612                  ; $8339
    INC $0616                  ; $833C
    RTS                        ; $833F
    .byte $20,$50,$83
    JSR $835C                  ; $8343
    LDA #$02                   ; $8346
    STA $043C                  ; $8348
    RTS                        ; $834B
    .byte $20,$50,$83
    RTS                        ; $834F
    LDA $05FB                  ; $8350
    EOR #$0B                   ; $8353
    JSR $C548                  ; $8355
    STA $0442                  ; $8358
    RTS                        ; $835B
    LDA $05FB                  ; $835C
    JSR $C548                  ; $835F
    STA $0441                  ; $8362
    RTS                        ; $8365
    .byte $AE,$3B,$04
    RTS                        ; $8369
    .byte $AE,$12,$06
    RTS                        ; $836D
    .byte $A2,$00
    LDA $043B                  ; $8370
    CMP #$01                   ; $8373
    BEQ $837B                  ; $8375
    JSR $8677                  ; $8377
    INX                        ; $837A
    RTS                        ; $837B
    .byte $AE,$12,$06
    RTS                        ; $837F
    .byte $AE,$12,$06
    RTS                        ; $8383
    .byte $20,$8B,$83
    LDX $0612                  ; $8387
    RTS                        ; $838A
    LDA $0612                  ; $838B
    JSR $C509                  ; $838E
    .byte $97,$83,$98,$83,$98,$83,$60,$AD,$FB,$05
    EOR #$0B                   ; $839B
    JSR $C548                  ; $839D
    STA $0442                  ; $83A0
    RTS                        ; $83A3
    .byte $AE,$12,$06
    RTS                        ; $83A7
    .byte $AC,$3D,$04
    LDX $83AF,Y                ; $83AB
    RTS                        ; $83AE
    .byte $FF,$FF,$00,$FF,$01,$AC,$3B,$04
    LDX $83BB,Y                ; $83B7
    RTS                        ; $83BA
    .byte $FF,$00,$FF,$FF,$01,$FF,$02,$AE,$12,$06
    RTS                        ; $83C5
    .byte $AD,$41,$04
    JSR $8207                  ; $83C9
    CMP #$1C                   ; $83CC
    BEQ $83D5                  ; $83CE
    CMP #$48                   ; $83D0
    BEQ $83D5                  ; $83D2
    INX                        ; $83D4
    RTS                        ; $83D5
    .byte $AD,$3E,$04,$29,$7F,$AA,$60,$AD,$3E,$04,$29,$7F,$AA,$60,$AD,$3E
    .byte $04
    AND #$7F                   ; $83E7
    TAX                        ; $83E9
    RTS                        ; $83EA
    .byte $AD,$3C,$04
    AND #$7F                   ; $83EE
    TAX                        ; $83F0
    JSR $8211                  ; $83F1
    RTS                        ; $83F4
    .byte $A9,$01
    JSR $8211                  ; $83F7
    LDA $043C                  ; $83FA
    AND #$7F                   ; $83FD
    TAX                        ; $83FF
    RTS                        ; $8400
    .byte $AD,$3C,$04
    AND #$7F                   ; $8404
    TAX                        ; $8406
    JMP $8211                  ; $8407
    .byte $AE,$3B,$04
    RTS                        ; $840D
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8411
    JSR $8207                  ; $8413
    LDX #$02                   ; $8416
    CMP #$74                   ; $8418
    BEQ $842A                  ; $841A
    DEX                        ; $841C
    CMP #$22                   ; $841D
    BEQ $842A                  ; $841F
    CMP #$39                   ; $8421
    BEQ $842A                  ; $8423
    CMP #$4C                   ; $8425
    BEQ $842A                  ; $8427
    DEX                        ; $8429
    RTS                        ; $842A
    .byte $A2,$00
    LDA $061C                  ; $842D
    CMP #$60                   ; $8430
    BCC $8435                  ; $8432
    INX                        ; $8434
    RTS                        ; $8435
    .byte $AE,$FB,$05
    BEQ $843D                  ; $8439
    LDX #$01                   ; $843B
    RTS                        ; $843D
    .byte $AE,$2A,$00
    RTS                        ; $8441
    .byte $AD,$41,$04,$20,$07,$82,$C9,$60,$D0,$01,$E8,$60,$AE,$47,$04
    BNE $8456                  ; $8451
    INC $0447                  ; $8453
    RTS                        ; $8456
    .byte $A2,$00
    LDA a: $002B               ; $8459
    CMP #$22                   ; $845C
    BNE $847D                  ; $845E
    LDY #$00                   ; $8460
    LDA a: $0028               ; $8462
    SEC                        ; $8465
    SBC a: $0029               ; $8466
    BCC $847A                  ; $8469
    BEQ $847A                  ; $846B
    LDY #$80                   ; $846D
    LDA #$CA                   ; $846F
    STA $03FE                  ; $8471
    LDA $05FB                  ; $8474
    BNE $847A                  ; $8477
    INX                        ; $8479
    STY $03FD                  ; $847A
    RTS                        ; $847D
    .byte $AD,$42,$04
    JSR $8207                  ; $8481
    TAY                        ; $8484
    LDX $86F4,Y                ; $8485
    BEQ $8497                  ; $8488
    LDA $0441                  ; $848A
    JSR $8207                  ; $848D
    TAY                        ; $8490
    LDX $86F4,Y                ; $8491
    JSR $8211                  ; $8494
    RTS                        ; $8497
    .byte $AD,$41,$04
    JSR $8207                  ; $849B
    TAY                        ; $849E
    LDX $86F4,Y                ; $849F
    BEQ $84B1                  ; $84A2
    LDA $0442                  ; $84A4
    JSR $8207                  ; $84A7
    TAY                        ; $84AA
    LDX $86F4,Y                ; $84AB
    JSR $8211                  ; $84AE
    RTS                        ; $84B1
    .byte $A2,$00
    BIT $043E                  ; $84B4
    BPL $84C6                  ; $84B7
    LDA $0442                  ; $84B9
    JSR $8207                  ; $84BC
    TAY                        ; $84BF
    LDX $86F4,Y                ; $84C0
    JSR $8211                  ; $84C3
    RTS                        ; $84C6
    .byte $AD,$41,$04
    LDX $05FB                  ; $84CA
    BEQ $84D2                  ; $84CD
    LDA $0442                  ; $84CF
    JSR $C50C                  ; $84D2
    LDX #$00                   ; $84D5
    LDY #$01                   ; $84D7
    LDA ($0034),Y              ; $84D9
    SEC                        ; $84DB
    SBC #$64                   ; $84DC
    INY                        ; $84DE
    LDA ($0034),Y              ; $84DF
    SBC #$00                   ; $84E1
    BCS $84E6                  ; $84E3
    INX                        ; $84E5
    RTS                        ; $84E6
    .byte $AE,$00,$06
    BEQ $84EE                  ; $84EA
    LDX #$01                   ; $84EC
    RTS                        ; $84EE
    .byte $A2,$00
    LDA $043C                  ; $84F1
    AND #$7F                   ; $84F4
    CMP #$13                   ; $84F6
    BNE $84FB                  ; $84F8
    INX                        ; $84FA
    RTS                        ; $84FB
    .byte $20,$51,$C5
    LDX #$00                   ; $84FF
    LDY #$07                   ; $8501
    LDA ($0034),Y              ; $8503
    CMP #$18                   ; $8505
    BCC $850A                  ; $8507
    INX                        ; $8509
    RTS                        ; $850A
    .byte $A2,$00
    BIT $043E                  ; $850D
    BPL $8526                  ; $8510
    LDA $0442                  ; $8512
    JSR $8207                  ; $8515
    CMP #$0F                   ; $8518
    BEQ $8525                  ; $851A
    CMP #$21                   ; $851C
    BEQ $8524                  ; $851E
    CMP #$40                   ; $8520
    BNE $8526                  ; $8522
    INX                        ; $8524
    INX                        ; $8525
    RTS                        ; $8526
    .byte $AD,$41,$04
    JSR $8207                  ; $852A
    LDX #$02                   ; $852D
    CMP #$60                   ; $852F
    BEQ $8539                  ; $8531
    DEX                        ; $8533
    CMP #$01                   ; $8534
    BEQ $8539                  ; $8536
    DEX                        ; $8538
    RTS                        ; $8539
    .byte $AD,$41,$04
    JSR $8207                  ; $853D
    CMP #$15                   ; $8540
    BEQ $8545                  ; $8542
    INX                        ; $8544
    RTS                        ; $8545
    .byte $AD,$41,$04
    JSR $8207                  ; $8549
    CMP #$1B                   ; $854C
    BEQ $8555                  ; $854E
    CMP #$4A                   ; $8550
    BEQ $8555                  ; $8552
    INX                        ; $8554
    RTS                        ; $8555
    .byte $AD,$3E,$04
    AND #$7F                   ; $8559
    TAX                        ; $855B
    BEQ $856B                  ; $855C
    LDA $0442                  ; $855E
    JSR $8207                  ; $8561
    TAY                        ; $8564
    LDX $876A,Y                ; $8565
    JSR $8211                  ; $8568
    RTS                        ; $856B
    .byte $AE,$4E,$04
    RTS                        ; $856F
    .byte $AD,$3D,$04
    AND #$0F                   ; $8573
    TAY                        ; $8575
    LDX $857A,Y                ; $8576
    RTS                        ; $8579
    .byte $FF,$FF,$00,$01,$FF,$02,$AD,$3E,$04
    AND #$7F                   ; $8583
    TAX                        ; $8585
    RTS                        ; $8586
    .byte $AD,$3E,$04
    AND #$7F                   ; $858A
    TAX                        ; $858C
    BEQ $8591                  ; $858D
    LDX #$01                   ; $858F
    RTS                        ; $8591
    .byte $AD,$41,$04
    JSR $8207                  ; $8595
    CMP #$1A                   ; $8598
    BEQ $85A1                  ; $859A
    CMP #$41                   ; $859C
    BEQ $85A1                  ; $859E
    INX                        ; $85A0
    RTS                        ; $85A1
    .byte $AD,$41,$04
    JSR $8207                  ; $85A5
    CMP #$1D                   ; $85A8
    BEQ $85B1                  ; $85AA
    CMP #$4B                   ; $85AC
    BEQ $85B1                  ; $85AE
    INX                        ; $85B0
    RTS                        ; $85B1
    .byte $AD,$41,$04
    JSR $8207                  ; $85B5
    CMP #$3E                   ; $85B8
    BEQ $85BD                  ; $85BA
    INX                        ; $85BC
    RTS                        ; $85BD
    .byte $AD,$41,$04
    JSR $8207                  ; $85C1
    CMP #$2B                   ; $85C4
    BEQ $85C9                  ; $85C6
    INX                        ; $85C8
    RTS                        ; $85C9
    .byte $AD,$41,$04
    JSR $8207                  ; $85CD
    CMP #$20                   ; $85D0
    BEQ $85D9                  ; $85D2
    CMP #$45                   ; $85D4
    BEQ $85D9                  ; $85D6
    INX                        ; $85D8
    RTS                        ; $85D9
    .byte $AD,$41,$04
    JSR $8207                  ; $85DD
    CMP #$11                   ; $85E0
    BEQ $85E5                  ; $85E2
    INX                        ; $85E4
    RTS                        ; $85E5
    .byte $AD,$3B,$04
    SEC                        ; $85E9
    SBC #$07                   ; $85EA
    STA $003B                  ; $85EC
    ASL                        ; $85EE
    ADC $003B                  ; $85EF
    STA $003B                  ; $85F1
    LDA $043D                  ; $85F3
    SEC                        ; $85F6
    SBC #$07                   ; $85F7
    CLC                        ; $85F9
    ADC $003B                  ; $85FA
    TAX                        ; $85FC
    RTS                        ; $85FD
    .byte $AE,$12,$06
    RTS                        ; $8601
    .byte $AD,$41,$04
    JSR $8207                  ; $8605
    TAY                        ; $8608
    LDX $86F4,Y                ; $8609
    JSR $8211                  ; $860C
    RTS                        ; $860F
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8613
    JSR $8207                  ; $8615
    LDX #$04                   ; $8618
    CMP $8622,X                ; $861A
    BEQ $8622                  ; $861D
    DEX                        ; $861F
    BNE $861A                  ; $8620
    RTS                        ; $8622
    .byte $02,$0F,$21,$22,$AD,$E2,$00
    AND #$01                   ; $862A
    TAX                        ; $862C
    RTS                        ; $862D
    .byte $AC,$3D,$04
    LDX $8635,Y                ; $8631
    RTS                        ; $8634
    .byte $FF,$FF,$00,$FF,$01,$02,$AD,$3D,$04
    AND #$0F                   ; $863E
    TAY                        ; $8640
    LDX $8645,Y                ; $8641
    RTS                        ; $8644
    .byte $FF,$FF,$FF,$00,$01,$A2,$00
    LDA $0612                  ; $864C
    CMP #$03                   ; $864F
    BCS $8676                  ; $8651
    LDA $0444                  ; $8653
    JSR $8138                  ; $8656
    CMP #$80                   ; $8659
    BCC $8676                  ; $865B
    LDA $05FB                  ; $865D
    EOR #$0B                   ; $8660
    JSR $C50C                  ; $8662
    LDY #$05                   ; $8665
    LDA ($0034),Y              ; $8667
    CLC                        ; $8669
    ADC #$00                   ; $866A
    CMP #$80                   ; $866C
    BCC $8672                  ; $866E
    .byte $A9,$7F
    STA ($0034),Y              ; $8672
    LDX #$01                   ; $8674
    RTS                        ; $8676
    LDX #$00                   ; $8677
    LDA $0444                  ; $8679
    JSR $8138                  ; $867C
    CMP #$80                   ; $867F
    BCC $8689                  ; $8681
    LDA $0442                  ; $8683
    JSR $8150                  ; $8686
    RTS                        ; $8689
    .byte $AD,$41,$04
    JSR $8207                  ; $868D
    LDY #$00                   ; $8690
    CMP $86A6,Y                ; $8692
    BEQ $869D                  ; $8695
    INY                        ; $8697
    INY                        ; $8698
    CPY #$0E                   ; $8699
    BNE $8692                  ; $869B
    LDX $86A7,Y                ; $869D
    LDA #$01                   ; $86A0
    JSR $8211                  ; $86A2
    RTS                        ; $86A5
    .byte $1A,$00,$41,$00,$36,$01,$1C,$02,$48,$02,$2E,$03,$57,$04,$00,$05
    .byte $A2,$00
    LDA $043C                  ; $86B8
    AND #$7F                   ; $86BB
    CMP $86C8,X                ; $86BD
    BEQ $86C7                  ; $86C0
    INX                        ; $86C2
    CPX #$04                   ; $86C3
    BNE $86BD                  ; $86C5
    RTS                        ; $86C7
    .byte $08,$0A,$10,$1F,$AD,$41,$04
    JSR $8207                  ; $86CF
    LDX #$00                   ; $86D2
    CMP $86E3,X                ; $86D4
    BEQ $86DE                  ; $86D7
    INX                        ; $86D9
    CPX #$11                   ; $86DA
    BNE $86D4                  ; $86DC
    CPX #$11                   ; $86DE
    JMP $8211                  ; $86E0
    .byte $01,$11,$1A,$41,$36,$1F,$38,$17,$18,$46,$47,$30,$31,$60,$5E,$58
    .byte $57,$00,$01,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$02,$00,$00,$0A,$12,$00,$10,$10,$00,$04,$0C,$0E,$08,$00
    .byte $14,$06,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$17,$00,$00,$0F
    .byte $00,$11,$11,$0D,$00,$07,$09,$05,$00,$15,$00,$00,$20,$00,$00,$1A
    .byte $00,$00,$04,$13,$00,$03,$06,$10,$10,$0E,$0B,$0C,$08,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$1F,$1E,$00,$00,$00,$00,$00,$1D
    .byte $00,$1C,$00,$00,$19,$00,$21,$00,$1B,$00,$00,$18,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$16,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$0E,$00,$00,$01,$01
    .byte $00,$0C,$03,$05,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$07,$00,$00,$00,$06,$00,$02,$02,$04,$00,$00,$00,$0D,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$0C
    .byte $00,$00,$00,$00,$01,$01,$05,$0F,$03,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$09,$00,$00,$00,$00,$00,$00,$00,$00,$0A,$00,$00,$00,$00
    .byte $0B,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $08,$00,$00,$00,$A9,$40
    STA $052A                  ; $87E2
    RTS                        ; $87E5
    .byte $A9,$00
    STA $052A                  ; $87E8
    RTS                        ; $87EB
    .byte $A9,$40
    EOR $052A                  ; $87EE
    STA $052A                  ; $87F1
    RTS                        ; $87F4
    .byte $A4,$3A
    INC $003A                  ; $87F7
    LDA ($005D),Y              ; $87F9
    STA $052B                  ; $87FB
    RTS                        ; $87FE
    .byte $A4,$3A
    INC $003A                  ; $8801
    LDA ($005D),Y              ; $8803
    STA $052C                  ; $8805
    RTS                        ; $8808
    .byte $A4,$3A
    LDA ($005D),Y              ; $880B
    STA $0530                  ; $880D
    INY                        ; $8810
    LDA ($005D),Y              ; $8811
    STA $0531                  ; $8813
    INY                        ; $8816
    STY $003A                  ; $8817
    RTS                        ; $8819
    .byte $AE,$22,$05
    LDA $003A                  ; $881D
    TAY                        ; $881F
    CLC                        ; $8820
    ADC #$02                   ; $8821
    ADC $005D                  ; $8823
    STA $051A,X                ; $8825
    LDA $005E                  ; $8828
    ADC #$00                   ; $882A
    STA $051B,X                ; $882C
    INX                        ; $882F
    INX                        ; $8830
    STX $0522                  ; $8831
    JMP $80F6                  ; $8834
    .byte $AE,$22,$05
    DEX                        ; $883A
    DEX                        ; $883B
    STX $0522                  ; $883C
    BPL $8844                  ; $883F
    JMP $80CF                  ; $8841
    LDA $051A,X                ; $8844
    STA $005D                  ; $8847
    LDA $051B,X                ; $8849
    STA $005E                  ; $884C
    LDA #$00                   ; $884E
    STA $003A                  ; $8850
    RTS                        ; $8852
    .byte $A4,$3A
    INC $003A                  ; $8855
    LDA ($005D),Y              ; $8857
    STA $052D                  ; $8859
    RTS                        ; $885C
    .byte $A4,$3A
    INC $003A                  ; $885F
    LDA ($005D),Y              ; $8861
    JSR $886A                  ; $8863
    STX $052A                  ; $8866
    RTS                        ; $8869
    JSR $C509                  ; $886A
    .byte $77,$88,$AA,$88,$B5,$88,$BF,$88,$D9,$88,$A9,$00
    STA $003B                  ; $8879
    LDA $0441                  ; $887B
    JSR $C50C                  ; $887E
    LDA $0638                  ; $8881
    JSR $C536                  ; $8884
    TYA                        ; $8887
    LDY #$08                   ; $8888
    SEC                        ; $888A
    SBC ($0034),Y              ; $888B
    BCS $8891                  ; $888D
    INC $003B                  ; $888F
    TXA                        ; $8891
    LDY #$06                   ; $8892
    SEC                        ; $8894
    SBC ($0034),Y              ; $8895
    BCS $889D                  ; $8897
    INC $003B                  ; $8899
    INC $003B                  ; $889B
    LDX #$40                   ; $889D
    LDA $003B                  ; $889F
    BEQ $88A9                  ; $88A1
    CMP #$03                   ; $88A3
    BEQ $88A9                  ; $88A5
    LDX #$00                   ; $88A7
    RTS                        ; $88A9
    .byte $A2,$00
    LDA $0616                  ; $88AC
    LSR                        ; $88AF
    BCC $88B4                  ; $88B0
    LDX #$40                   ; $88B2
    RTS                        ; $88B4
    .byte $A2,$00
    LDA $05FB                  ; $88B7
    BEQ $88BE                  ; $88BA
    LDX #$40                   ; $88BC
    RTS                        ; $88BE
    .byte $AD,$41,$04
    JSR $C50C                  ; $88C2
    LDY #$08                   ; $88C5
    LDA ($0034),Y              ; $88C7
    LDX $05FB                  ; $88C9
    BEQ $88D0                  ; $88CC
    EOR #$FF                   ; $88CE
    LDX #$00                   ; $88D0
    CMP #$80                   ; $88D2
    BCS $88D8                  ; $88D4
    LDX #$40                   ; $88D6
    RTS                        ; $88D8
    .byte $A2,$00
    BIT $062C                  ; $88DB
    BPL $88E2                  ; $88DE
    LDX #$40                   ; $88E0
    RTS                        ; $88E2
    .byte $A4,$3A
    INC $003A                  ; $88E5
    LDA ($005D),Y              ; $88E7
    STA $0539                  ; $88E9
    RTS                        ; $88EC
    .byte $A4,$3A
    LDA ($005D),Y              ; $88EF
    JSR $C509                  ; $88F1
    .byte $FC,$88,$0D,$89,$3D,$89,$42,$89,$AD,$41,$04,$20,$0C,$C5,$A0,$00
    .byte $B1,$34,$C9,$60,$D0,$00,$E6,$3A,$60,$AD,$FB,$05
    BNE $8938                  ; $8910
    LDA a: $002B               ; $8912
    CMP #$05                   ; $8915
    BNE $8938                  ; $8917
    LDX $0446                  ; $8919
    BEQ $893A                  ; $891C
    LDX #$01                   ; $891E
    LDA $043C                  ; $8920
    CMP #$03                   ; $8923
    BEQ $893A                  ; $8925
    LDX $0446                  ; $8927
    CPX #$04                   ; $892A
    BCS $8938                  ; $892C
    LDA $043C                  ; $892E
    BEQ $8938                  ; $8931
    INC $0446                  ; $8933
    BNE $893A                  ; $8936
    LDX #$00                   ; $8938
    JMP $812F                  ; $893A
    .byte $A2,$00,$4C,$2F,$81,$A2,$00
    LDA $05FB                  ; $8944
    BNE $898E                  ; $8947
    LDA #$01                   ; $8949
    PHA                        ; $894B
    JSR $C50C                  ; $894C
    LDY #$00                   ; $894F
    LDA ($0034),Y              ; $8951
    TAY                        ; $8953
    LDX #$00                   ; $8954
    PLA                        ; $8956
    CPY #$1A                   ; $8957
    BEQ $8964                  ; $8959
    CLC                        ; $895B
    ADC #$01                   ; $895C
    CMP #$0B                   ; $895E
    BNE $894B                  ; $8960
    BEQ $898E                  ; $8962
    LDA $043C                  ; $8964
    CMP #$03                   ; $8967
    BCC $898E                  ; $8969
    BIT $0449                  ; $896B
    BMI $898E                  ; $896E
    INC $0449                  ; $8970
    LDA $0449                  ; $8973
    CMP #$02                   ; $8976
    BNE $898E                  ; $8978
    LDA #$00                   ; $897A
    LDY a: $00E2               ; $897C
    CPY #$20                   ; $897F
    BCS $898B                  ; $8981
    LDA #$1E                   ; $8983
    STA $044A                  ; $8985
    LDA #$80                   ; $8988
    INX                        ; $898A
    STA $0449                  ; $898B
    JMP $812F                  ; $898E
    SEC                        ; $8991
    SBC #$F0                   ; $8992
    JSR $C509                  ; $8994
    .byte $99,$89,$A9,$FF
    RTS                        ; $899B
    SEC                        ; $899C
    SBC #$F0                   ; $899D
    JSR $C509                  ; $899F
    .byte $A4,$89,$A9,$FF
    RTS                        ; $89A6
    SEC                        ; $89A7
    SBC #$F0                   ; $89A8
    JSR $C509                  ; $89AA
    .byte $B1,$89,$B4,$89,$A9,$FF
    RTS                        ; $89B3
    .byte $AD,$E3,$05,$09,$40,$8D,$E3,$05,$A9,$FF,$60,$B1,$8A,$F2,$91,$FF
    .byte $91,$8E,$B4,$CB,$9B,$59,$92,$63,$92,$85,$92,$2C,$93,$69,$93,$11
    .byte $98,$ED,$98,$E3,$96,$F7,$96,$EA,$91,$05,$92,$59,$92,$69,$92,$7F
    .byte $92,$D3,$91,$82,$9B,$0A,$B8,$17,$B8,$A1,$B8,$3E,$9E,$D4,$BB,$6D
    .byte $BC,$86,$B4,$E3,$9B,$EE,$9C,$DA,$B7,$33,$B7,$38,$B7,$3B,$BA,$49
    .byte $B7,$3F,$BB,$F2,$9B,$DD,$9C,$2D,$9E,$F8,$9B,$CC,$B4,$FE,$9B,$E0
    .byte $B4,$2C,$B7,$54,$9F,$D6,$B4,$4E,$B7,$73,$B7,$30,$9C,$8C,$B7,$57
    .byte $9E,$04,$9C,$CC,$BB,$CD,$B7,$E4,$B7,$BF,$B7,$C6,$B7,$B3,$BD,$7C
    .byte $B4,$A1,$BD,$3E,$9F,$BA,$9F,$0A,$9C,$54,$B7,$95,$BD,$9A,$BD,$A6
    .byte $BD,$AD,$BD,$D5,$B7,$B8,$BD,$BD,$BD,$19,$9C,$01,$BE,$01,$BE,$01
    .byte $BE,$01,$BE,$01,$BE,$01,$BE,$01,$BE,$01,$BE,$01,$BE,$0D,$BE,$18
    .byte $BE,$20,$BE,$2A,$BE,$32,$BE,$3A,$BE,$42,$BE,$4A,$BE,$52,$BE,$5A
    .byte $BE,$69,$BE,$73,$BE,$7C,$BE,$86,$BE,$8E,$BE,$96,$BE,$9E,$BE,$A6
    .byte $BE,$AE,$BE,$B6,$BE,$BE,$BE,$C6,$BE,$D8,$BE,$F7,$BE,$05,$BF,$62
    .byte $AA,$0D,$BF,$13,$BF,$23,$BF,$2C,$BF,$54,$BF,$61,$BF,$73,$BF,$7F
    .byte $BF,$94,$BF,$9C,$BF,$D2,$BF,$1B,$B0,$D8,$BF,$97,$A1,$F3,$34,$B9
    .byte $8A,$09,$8F,$4B,$8C,$FD,$01,$F3,$80,$02,$05,$F3,$81,$06,$CC,$F3
    .byte $81,$07,$CD,$F3,$82,$08,$15,$0D,$F3,$82,$18,$1E,$24,$F3,$83,$28
    .byte $30,$38,$49,$5A,$F3,$83,$21,$29,$31,$42,$53,$F3,$83,$5C,$67,$72
    .byte $86,$9A,$F3,$83,$16,$1E,$26,$37,$48,$F3,$83,$4E,$59,$64,$78,$8C
    .byte $F3,$83,$08,$10,$18,$29,$3A,$FA,$8B,$9C,$FA,$C0,$9C,$F2,$AA,$9E
    .byte $FA,$8B,$9C,$FA,$A3,$9C,$F2,$AA,$9E,$FA,$8B,$9C,$FA,$FE,$9D,$FA
    .byte $08,$A3,$F6,$FA,$73,$A3,$FA,$64,$9E,$F6,$F0,$FA,$8B,$9C,$FA,$FE
    .byte $9D,$FA,$EF,$A2,$FA,$5A,$A1,$F6,$FA,$64,$9E,$F6,$F0,$FA,$8B,$9C
    .byte $FA,$FE,$9D,$FA,$DD,$A2,$F2,$5B,$A3,$FA,$36,$A9,$FA,$CF,$A3,$FA
    .byte $C0,$9C,$F2,$AA,$9E,$FA,$36,$A9,$FA,$CF,$A3,$FA,$A3,$9C,$F2,$AA
    .byte $9E,$FA,$36,$A9,$FA,$CF,$A3,$FA,$FE,$9D,$FA,$08,$A3,$F6,$FA,$73
    .byte $A3,$FA,$64,$9E,$F6,$F0,$FA,$36,$A9,$FA,$CF,$A3,$FA,$FE,$9D,$FA
    .byte $28,$B4,$FA,$C3,$A0,$F6,$FA,$64,$9E,$F6,$F0,$FA,$36,$A9,$FA,$CF
    .byte $A3,$FA,$FE,$9D,$FA,$DD,$A2,$F2,$5B,$A3,$F3,$82,$08,$15,$0D,$F3
    .byte $82,$18,$25,$1D,$F3,$83,$28,$37,$35,$34,$33,$F3,$83,$21,$30,$2E
    .byte $2D,$2C,$F3,$83,$3C,$4D,$61,$77,$8D,$F3,$83,$13,$22,$20,$1F,$1E
    .byte $F3
    .byte $83,$0C,$1B,$19,$18,$17,$F3,$83,$27,$38,$4C,$62,$78,$FA,$8B,$9C
    .byte $FA,$FE,$9D,$FA,$DD,$A2,$FA,$AA,$9E,$FA,$62,$9F,$F0,$FA,$8B,$9C
    .byte $FA,$FE,$9D,$FA,$DD,$A2,$FA,$AA,$9E,$FA,$5C,$9F,$F2,$47,$A2,$FA
    .byte $36,$A9,$FA,$CF,$A3,$FA,$FE,$9D,$FA,$DD,$A2,$FA,$AA,$9E,$F2,$62
    .byte $9F,$FA,$36,$A9,$FA,$CF,$A3,$FA,$FE,$9D,$FA,$DD,$A2,$FA,$AA,$9E
    .byte $FA,$5C,$9F,$F2,$47,$A2,$FA,$36,$A9,$FA,$CF,$A3,$FA,$FE,$9D,$FA
    .byte $DD,$A2,$F6,$FA,$64,$9E,$F6,$FA,$6E,$9F,$F2,$71,$A3,$FA,$36,$A9
    .byte $FA,$CF,$A3,$FA,$FE,$9D,$FA,$DD,$A2,$F6,$FA,$64,$9E,$F6,$FA,$74
    .byte $9F,$F2,$6F,$A0,$FA,$36,$A9,$FA,$CF,$A3,$FA,$FE,$9D,$FA,$DD,$A2
    .byte $FA,$6E,$9F,$F2,$5B,$A3,$FD,$03,$F3,$00,$53,$8C,$F3,$8D,$F3,$C6
    .byte $02,$B7,$F3,$82,$03,$43,$7A,$F3,$83,$11,$1A,$03,$08,$16,$F3,$9B
    .byte $23,$31,$21,$20,$F3,$9B,$CD,$2B,$CB,$CA,$FA,$79,$9C,$FA,$47,$B3
    .byte $FA,$76,$A1,$F0,$FA,$79,$9C,$FA,$47,$B3,$FA,$42,$A0,$FA,$25,$A0
    .byte $F2,$17,$A0,$FA,$79,$9C,$FA,$47,$B3,$FA,$47,$A0,$FA,$23,$A0,$F2
    .byte $71,$A3,$FA,$47,$B3,$F2,$67,$8F,$F3,$83,$05,$0E,$1C,$2A,$0A,$FA
    .byte $79,$9C,$FA,$DC,$B2,$FA,$76,$A1,$F0,$FA,$79,$9C,$FA,$DC,$B2,$FA
    .byte $42,$A0,$FA,$25,$A0,$F2,$17,$A0,$FA,$79,$9C,$FA,$DC,$B2,$FA,$47
    .byte $A0,$FA,$23,$A0,$F2,$71,$A3,$FA,$79,$9C,$FA,$DC,$B2,$F2,$85,$A1
    .byte $F3,$83,$05,$0E,$1C,$2A,$0A,$FA,$79,$9C,$FA,$F8,$9D,$FA,$E5,$9F
    .byte $F0,$FA,$79,$9C,$FA,$F8,$9D,$FA,$0B,$A0,$FA,$F3,$9F,$F2,$E0,$9F
    .byte $FA,$79,$9C,$FA,$F8,$9D,$FA,$10,$A0,$FA,$F1,$9F,$F2,$71,$A3,$FA
    .byte $79,$9C,$FA,$F8,$9D,$F2,$6E,$A1,$F3,$82,$03,$61,$9B,$F3,$83,$14
    .byte $2C,$03,$08,$1F,$F3,$9B,$38,$09,$36,$35,$F3,$9B,$44,$03,$42,$41
    .byte $F2,$97,$8C,$FA,$79,$9C,$FA,$47,$B3,$FA,$47,$A0,$FA,$DD,$A2,$FA
    .byte $62,$9F,$F0,$FA,$79,$9C,$FA,$47,$B3,$F2,$A9,$A1,$FA,$79,$9C,$FA
    .byte $47,$B3,$FA,$47,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA,$79
    .byte $9C,$FA,$47,$B3,$FA,$47,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71,$A3
    .byte $FA,$79,$9C,$FA,$47,$B3,$FA,$DD,$A2,$F2,$A9,$A1,$F3,$83,$05,$14
    .byte $25,$11,$10,$FA
    .byte $79,$9C,$FA,$DC,$B2,$FA,$47,$A0,$FA,$DD,$A2,$FA,$62,$9F,$F0,$FA
    .byte $79,$9C,$FA,$DC,$B2,$FA,$47,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40
    .byte $A2,$FA,$79,$9C,$FA,$DC,$B2,$FA,$47,$A0,$FA,$DD,$A2,$FA,$5C,$9F
    .byte $F2,$71,$A3,$F3,$83,$05,$14,$25,$36,$10,$FA,$79,$9C,$FA,$F8,$9D
    .byte $FA,$10,$A0,$FA,$DD,$A2,$FA,$62,$9F,$F0,$FA,$79,$9C,$FA,$F8,$9D
    .byte $FA,$10,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA,$79,$9C,$FA
    .byte $F8,$9D,$FA,$10,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71,$A3,$FA,$79
    .byte $9C,$FA,$F8,$9D,$FA,$DD,$A2,$F2,$6E,$A1,$F3,$C6,$02,$78,$F3,$82
    .byte $03,$28,$4D,$F3,$83,$11,$04,$10,$1B,$0D,$FA,$47,$B3,$FA,$42,$A0
    .byte $FA,$25,$A0,$FA,$17,$A0,$F0,$FA,$47,$B3,$FA,$47,$A0,$FA,$23,$A0
    .byte $F2,$71,$A3,$FA,$47,$B3,$F2,$A9,$A1,$F3,$83,$11,$04,$10,$1B,$0D
    .byte $FA,$DC,$B2,$FA,$42,$A0,$FA,$25,$A0,$FA,$17,$A0,$F0,$FA,$DC,$B2
    .byte $FA,$47,$A0,$FA,$23,$A0,$F2,$71,$A3,$FA,$DC,$B2,$F2,$85,$A1,$F3
    .byte $83,$11,$04,$10,$1B,$0D,$FA,$F8,$9D,$FA,$0B,$A0,$FA,$F3,$9F,$FA
    .byte $E0,$9F,$F0,$FA,$F8,$9D,$FA,$10,$A0,$FA,$F1,$9F,$F2,$71,$A3,$FA
    .byte $F8,$9D,$F2,$6E,$A1,$F3,$82,$03,$34,$65,$F3,$83,$05,$11,$1F,$0E
    .byte $0D,$FA
    .byte $47,$B3,$FA,$47,$A0,$FA,$DD,$A2,$FA,$62,$9F,$F0,$FA,$47,$B3,$FA
    .byte $47,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA,$47,$B3,$FA,$47
    .byte $A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71,$A3,$F3,$83,$05,$11,$1F,$0E
    .byte $0D,$FA,$DC,$B2,$FA,$47,$A0,$FA,$DD,$A2,$FA,$62,$9F,$F0,$FA,$DC
    .byte $B2,$FA,$47,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA,$DC,$B2
    .byte $FA,$47,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71,$A3,$F3
    .byte $83,$05,$11,$1F,$0E,$0D,$FA,$F8,$9D,$FA,$10,$A0,$FA,$DD,$A2,$FA
    .byte $62,$9F,$F0,$FA,$F8,$9D,$FA,$10,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2
    .byte $40,$A2,$FA,$F8,$9D,$FA,$10,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71
    .byte $A3,$FD,$03,$F3,$00,$11,$8F,$76,$90,$F3,$C6,$02,$CC,$F3,$82,$03
    .byte $55,$8F,$F3,$83,$17,$20,$03,$0B,$1C,$F3,$9B,$29,$40,$02,$01,$F2
    .byte $88,$8C,$F3,$9B,$2F,$37,$02,$01,$F2,$38,$8D,$FA,$7A,$9F,$FA,$8F
    .byte $A3,$FA,$1C,$A0,$F0,$FA,$7A,$9F,$FA,$8F,$A3,$FA,$34,$A0,$FA,$25
    .byte $A0,$F2,$15,$A0,$FA,$7A,$9F,$FA,$8F,$A3,$FA,$3B,$A0,$FA,$23,$A0
    .byte $F2,$71,$A3,$FA,$7A,$9F,$FA,$8F,$A3,$F2,$9F,$A1,$FA,$7A,$9F,$FA
    .byte $65,$B4,$F2,$71,$A3,$F3,$83,$08,$11,$1F,$2D,$0D,$FA,$DC,$B2,$FA
    .byte $E0,$A6,$FA,$8F,$A3,$FA,$1C,$A0,$F0,$FA,$E0,$A6,$FA,$8F,$A3,$FA
    .byte $34,$A0,$FA,$25,$A0,$F2,$15,$A0,$FA,$E0,$A6,$FA,$8F,$A3,$FA,$3B
    .byte $A0,$FA,$23,$A0,$F2,$71,$A3,$FA,$E0,$A6,$FA,$8F,$A3,$F2,$7B,$A1
    .byte $F3,$83,$05,$0E,$1C,$2A,$0A,$FA,$7F,$9C,$FA,$8F,$A3,$FA,$EA,$9F
    .byte $F0,$FA,$7F,$9C,$FA,$8F,$A3,$FA,$FD,$9F,$FA,$F3,$9F,$F2,$DE,$9F
    .byte $FA,$7F,$9C,$FA,$8F,$A3,$FA,$04,$A0,$FA,$F1,$9F,$F2,$71,$A3,$FA
    .byte $7F,$9C,$FA,$8F,$A3,$F2,$64,$A1,$F3,$82,$03,$58,$96,$F3,$83,$14
    .byte $23,$03,$08,$1F,$F3,$9B,$2F,$09,$2D,$2C,$F3,$9B,$3B,$03,$39,$38
    .byte $F2,$97,$8C,$FA,$7A,$9F,$FA,$8F,$A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA
    .byte $62,$9F,$F0,$FA,$7A,$9F,$FA,$8F,$A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA
    .byte $5C,$9F,$F2,$40,$A2,$FA
    .byte $7A,$9F,$FA,$8F,$A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71
    .byte $A3,$FA,$7A,$9F,$FA,$8F,$A3,$FA,$DD,$A2,$F2,$9F,$A1,$F3,$83,$05
    .byte $14,$25,$11,$10,$FA,$E0,$A6,$FA,$8F,$A3,$FA,$3B,$A0,$FA,$DD,$A2
    .byte $FA,$62,$9F,$F0,$FA,$E0,$A6,$FA,$8F,$A3,$FA,$3B,$A0,$FA,$DD,$A2
    .byte $FA,$5C,$9F,$F2,$40,$A2,$FA,$E0,$A6,$FA,$8F,$A3,$FA,$3B,$A0,$FA
    .byte $DD,$A2,$FA,$5C,$9F,$F2,$71,$A3,$F3
    .byte $C6,$49,$BF,$F3,$83,$05,$14,$25,$36,$10,$FA,$7F,$9C,$FA,$8F,$A3
    .byte $FA,$04,$A0,$FA,$DD,$A2,$FA,$62,$9F,$F0,$FA,$7F,$9C,$FA,$8F,$A3
    .byte $FA,$04,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA,$7F,$9C,$FA
    .byte $8F,$A3,$FA,$04,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71,$A3,$FA,$7F
    .byte $9C,$FA,$8F,$A3,$FA,$DD,$A2,$F2,$64,$A1,$F3
    .byte $82,$03,$28,$4D,$F3,$83,$11,$04,$10,$1B,$0D,$FA,$9E,$A3,$FA,$34
    .byte $A0,$FA,$25,$A0,$FA,$15,$A0,$F0,$FA,$9E,$A3,$FA,$3B,$A0,$FA,$23
    .byte $A0,$F2,$71,$A3,$FA,$9E,$A3,$F2,$9F,$A1,$F3,$83,$11,$04,$10,$1B
    .byte $0D,$FA,$94,$A3,$FA,$34,$A0,$FA,$25,$A0,$FA,$15,$A0,$F0,$FA,$94
    .byte $A3,$FA,$3B,$A0,$FA,$23,$A0,$F2,$71,$A3,$FA,$94,$A3,$F2,$7B,$A1
    .byte $F3,$83,$11,$04,$10,$1B,$0D,$FA,$99,$A3,$FA,$FD,$9F,$FA,$F3,$9F
    .byte $FA,$DE,$9F,$F0,$FA,$99,$A3,$FA,$04,$A0,$FA,$F1,$9F,$F2,$71,$A3
    .byte $FA,$99,$A3,$F2,$64,$A1,$F3,$82,$03,$34,$65,$F3,$83,$05,$11,$1F
    .byte $0E,$0D,$FA,$9E,$A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA,$62,$9F,$F0,$FA
    .byte $9E,$A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA,$9E
    .byte $A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71,$A3,$F3,$83,$05
    .byte $11,$1F,$0E,$0D,$FA,$94,$A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA,$62,$9F
    .byte $F0,$FA,$94,$A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40,$A2
    .byte $FA,$94,$A3,$FA,$3B,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71,$A3,$F3
    .byte $83,$05,$11,$1F,$0E,$0D,$FA,$99,$A3,$FA,$04,$A0,$FA,$DD,$A2,$FA
    .byte $62,$9F,$F0,$FA,$99,$A3,$FA,$04,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2
    .byte $40,$A2,$FA,$99,$A3,$FA,$04,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$71
    .byte $A3,$F3,$84,$0A,$01,$F3,$16,$50,$93,$5A,$93,$DB,$9B,$F3,$16,$3C
    .byte $93,$41,$93,$DF,$9B,$F2,$40,$A2,$FD,$01,$F3,$04,$9B,$B2,$64,$AE
    .byte $FD,$01,$F3,$84,$02,$05,$FA,$E2,$9D,$F1,$F2,$3C,$9D,$FD,$01,$F3
    .byte $86,$0C,$43,$FD,$01,$F3,$43,$17,$92,$17,$92,$87,$BD,$F3,$35,$17
    .byte $92,$17,$92,$87,$BD,$F3,$84,$02,$17,$F3,$85,$05,$07,$09,$0B,$0D
    .byte $F2,$85,$9C,$F2,$91,$9C,$F2,$9D,$9C,$F2,$97,$9C,$F2,$91,$9C,$F3
    .byte $85,$05,$07,$09,$0B,$0D,$F2,$61,$9C,$F2,$6D,$9C,$F2,$73,$9C,$F2
    .byte $67,$9C,$F2,$6D,$9C,$FD,$03,$F3,$44,$4F,$92,$90,$BD,$F3,$84,$02
    .byte $04,$F2,$AB,$A3,$F2,$A3,$A3,$FD,$01,$F3,$81,$05,$01,$FA,$6E,$9F
    .byte $F0,$FD,$01,$F3,$86,$02,$0D,$FD,$01,$F3,$81,$07,$01,$FD,$01,$FA
    .byte $62,$9F,$F0,$F3,$81,$07,$01,$FD,$01,$FA,$B5,$9F,$F0,$FD,$03,$F3
    .byte $84,$08,$0F,$FD,$03,$F3,$84,$06,$0D,$F3,$81,$0E,$17,$F3,$81,$4A
    .byte $50,$F3,$81,$1A,$23,$F3,$81,$50,$56,$F3,$14,$CE,$9B,$CE,$9B,$0B
    .byte $93,$C3,$92,$F3,$14,$CE,$9B,$CE,$9B,$0B,$93,$C9,$92,$F3,$14,$CE
    .byte $9B,$CE,$9B,$0B,$93,$CF,$92,$F3,$14,$CE,$9B,$CE,$9B,$0B,$93,$D5
    .byte $92,$F3,$15,$1F,$93,$D5,$9B,$F3,$15,$1F,$93,$D5,$9B,$F3,$15,$0F
    .byte $93,$CF,$9B,$F3,$15,$0F,$93,$CF,$9B,$F3,$87,$31,$30,$2C,$17,$37
    .byte $F3,$87,$2A,$29,$25,$15,$30,$F3,$87,$23,$22,$1E,$13,$29,$F3,$87
    .byte $1C,$1B,$17,$11,$22,$F3,$88,$26,$28,$2A,$F3,$88,$11,$29,$15,$F3
    .byte $88,$0C,$0E,$10,$F3,$88,$07,$12,$0B,$FA,$71,$A3,$F0,$F2,$6E,$A1
    .byte $F2,$97,$A1,$F2,$83,$A0,$F2,$5B,$A3,$FA,$97,$A1,$F0,$F2,$64,$A1
    .byte $F2,$8D,$A1,$F2,$79,$A0,$FA,$8D,$A1,$F0,$F3,$84,$02,$07,$F3,$89
    .byte $14,$09,$0D,$16,$F3,$89,$27,$17,$1B,$29,$FD,$00,$F2,$45,$9E,$FD
    .byte $03,$F2,$C2,$B2,$FD,$03,$F2,$9A,$9D,$FD,$03,$F2,$42,$B4,$FD,$00
    .byte $F2,$4F,$9E,$FD,$03,$F2,$CC,$B2,$FD,$03,$F2,$D4,$B2,$FD,$03,$F2
    .byte $52,$9D,$FD,$03,$F2,$3D,$B4,$FD,$03,$FA,$F6,$9E,$F3,$0A,$29,$95
    .byte $76,$93,$70,$94,$FA,$9C,$9F,$F3,$45,$7F,$93,$28,$94,$F3,$8B,$08
    .byte $03,$31,$6D,$F3,$8C,$02,$26,$F3,$8D,$05,$0A,$0F,$14,$19,$FA,$0E
    .byte $A1,$F2,$0D,$97,$FA,$0E,$A1,$F2,$16,$97,$FA,$0E,$A1,$F2,$22,$97
    .byte $FA,$0E,$A1,$F2,$31,$97,$FA,$0E,$A1,$F2,$43,$97,$FA,$0E,$A1,$F2
    .byte $55,$97,$FF,$01,$BE,$93,$C4,$93,$D0,$93,$DF,$93,$FA,$4B,$A1,$F2
    .byte $72,$95,$FA,$4B,$A1,$FA,$08,$A3,$FA,$71,$A3,$F2,$22,$B8,$FA,$2E
    .byte $B8,$FA,$4B,$A1,$FA,$08,$A3,$FA,$71,$A3,$F2,$3A,$B8,$FA,$2E,$B8
    .byte $FA,$4B,$A1,$FA,$08,$A3,$FA,$48,$B8,$FA,$71,$A3,$F2,$59,$B8,$FF
    .byte $01,$FB,$93,$04,$94,$0D,$94,$19,$94,$FA,$31,$A1,$FA,$6A,$A3,$F2
    .byte $F0,$9E,$FA,$22,$B8,$FA,$31,$A1,$F2,$6A,$A3,$FA,$2E,$B8,$FA,$31
    .byte $A1,$FA,$6A,$A3,$F2,$3A,$B8,$FA,$2E,$B8,$FA,$31,$A1,$FA,$48,$B8
    .byte $FA,$6A,$A3,$F2,$59,$B8,$F3,$8B,$0B,$06,$34,$01,$F2,$F1,$93,$F3
    .byte $8C,$02,$26,$F3,$8D,$05,$0A,$0F,$14,$19,$FA,$22,$A1,$F2,$8A,$97
    .byte $FA,$22,$A1,$F2,$99,$97,$FA,$22,$A1,$F2,$AB,$97,$FA,$22,$A1,$F2
    .byte $C3,$97,$FA,$22,$A1,$F2,$DB,$97,$FA,$22,$A1,$F2,$F3,$97,$FF,$01
    .byte $6A,$94,$C4,$93,$D0,$93,$DF,$93,$FA,$22,$A1,$F2,$BC,$95,$F3,$81
    .byte $02,$5D,$F3,$8B,$08,$03,$43,$4E,$F3,$8C,$02,$35,$F3,$8D,$05,$0D
    .byte $15,$1D,$25,$FA,$5B,$9C,$FA,$DD,$A1,$F2,$0D,$97,$FA,$5B,$9C,$FA
    .byte $DD,$A1,$F2,$16,$97,$FA,$5B,$9C,$FA,$DD,$A1,$F2,$22,$97,$FA,$5B
    .byte $9C,$FA,$DD,$A1,$F2,$31,$97,$FA,$5B,$9C,$FA,$DD,$A1,$F2,$43,$97
    .byte $FA,$5B,$9C,$FA,$DD,$A1,$F2,$55,$97,$FA,$5B,$9C,$FA,$CA,$A1,$FA
    .byte $08,$A3,$F2,$71,$A3,$FA,$5B,$9C,$FA,$D1,$A1,$F2,$4E,$B4,$F3,$8B
    .byte $0B,$06,$46,$01,$F2,$C7,$94,$F3,$8C,$02,$35,$F3,$8D,$05,$0D,$15
    .byte $1D,$25,$FA
    .byte $5B,$9C,$FA,$CA,$A1,$F2,$8A,$97,$FA,$5B,$9C,$FA,$CA,$A1,$F2,$99
    .byte $97,$FA,$5B,$9C,$FA,$CA,$A1,$F2,$AB,$97,$FA,$5B,$9C,$FA,$CA,$A1
    .byte $F2,$C3,$97,$FA,$5B,$9C,$FA,$CA,$A1,$F2,$DB,$97,$FA,$5B,$9C,$FA
    .byte $CA,$A1,$F2,$F3,$97,$FA,$5B,$9C,$FA,$CA,$A1,$FA,$DD,$A2,$FA,$B5
    .byte $9F,$F2,$71,$A3,$F3
    .byte $36,$33,$95,$C8,$95,$4B,$96,$CE,$96,$FA,$9C,$9F,$F3,$81,$02,$48
    .byte $F3,$8B,$08,$03,$31,$3C,$F3,$8C,$02,$26,$F3,$8D,$05,$0A,$0F,$14
    .byte $19,$FA,$94,$A0,$F2,$0D,$97,$FA,$94,$A0,$F2,$16,$97,$FA,$94,$A0
    .byte $F2,$22,$97,$FA,$94,$A0,$F2,$31,$97,$FA,$94,$A0,$F2,$43,$97,$FA
    .byte $94,$A0,$F2,$55,$97,$FA,$A1,$A0,$FA,$08,$A3,$FA,$5D,$B4,$F2,$F0
    .byte $9E,$FA,$A6,$A0,$F2,$70,$97,$F3,$8B,$0B,$06,$34,$01,$F2,$7B,$95
    .byte $F3,$8C,$02,$26,$F3,$8D,$05,$0A,$0F,$14,$19,$FA,$A1,$A0,$F2,$8A
    .byte $97,$FA,$A1,$A0,$F2,$99,$97,$FA,$A1,$A0,$F2,$AB,$97,$FA,$A1,$A0
    .byte $F2,$C3,$97,$FA,$A1,$A0,$F2,$DB,$97,$FA,$A1,$A0,$F2,$F3,$97,$FA
    .byte $A1,$A0,$FA,$DD,$A2,$FA,$B5,$9F,$FA,$71,$A3,$F2,$F0,$9E,$F3,$81
    .byte $02,$42,$F3,$8B,$08,$03,$31,$36,$F3,$8C,$02,$26,$F3,$8D,$05,$0A
    .byte $0F,$14,$19,$FA,$CD,$A0,$F2,$0A,$97,$FA,$CD,$A0,$F2,$13,$97,$FA
    .byte $CD,$A0,$F2,$1F,$97,$FA
    .byte $CD,$A0,$F2,$2E,$97,$FA,$CD,$A0,$F2,$40,$97,$FA,$CD,$A0,$F2,$52
    .byte $97,$FA,$CD,$A0,$F2,$5E,$97,$FA,$CD,$A0,$F2,$6D,$97,$F3,$8B,$0B
    .byte $06,$34,$01,$F2,$07,$96,$F3,$8C,$02,$26,$F3,$8D,$05,$0A,$0F,$14
    .byte $19,$FA,$CD,$A0,$F2,$87,$97,$FA,$CD,$A0,$F2,$96,$97,$FA,$CD,$A0
    .byte $F2,$A8,$97,$FA,$CD,$A0,$F2,$C0,$97,$FA,$CD,$A0,$F2,$D8,$97,$FA
    .byte $CD,$A0,$F2,$F0,$97,$FA,$CD,$A0,$F2,$02,$98,$F3
    .byte $81,$02,$42,$F3,$8B,$08,$03,$31,$36,$F3,$8C,$02,$26,$F3,$8D,$05
    .byte $0A,$0F,$14,$19,$FA,$FF,$A1,$F2,$0A,$97,$FA,$FF,$A1,$F2,$13,$97
    .byte $FA,$FF,$A1,$F2,$1F,$97,$FA,$FF,$A1,$F2,$2E,$97,$FA,$FF,$A1,$F2
    .byte $40,$97,$FA,$FF,$A1,$F2,$52,$97,$FA,$FF,$A1,$F2,$5E,$97,$FA,$FF
    .byte $A1,$F2,$6D,$97,$F3,$8B,$0B,$06,$34,$01,$F2,$8A,$96,$F3,$8C,$02
    .byte $26,$F3,$8D,$05,$0A,$0F,$14,$19,$FA,$FF,$A1,$F2,$87,$97,$FA,$FF
    .byte $A1,$F2,$96,$97,$FA,$FF,$A1,$F2,$A8,$97,$FA,$FF,$A1,$F2,$C0,$97
    .byte $FA,$FF,$A1,$F2,$D8,$97,$FA,$FF,$A1,$F2,$F0,$97,$FA,$FF,$A1,$F2
    .byte $02,$98,$F3
    .byte $81,$02,$78,$F3,$8B,$08,$03,$85,$93,$F3,$8C,$02,$74,$F3,$8D,$29
    .byte $31,$3C,$4A,$5B,$FD,$03,$FA,$F6,$9E,$F3,$92,$06,$01,$F3,$8C,$02
    .byte $66,$F3,$8D,$1B,$23,$2E,$3C,$4D,$FA,$31,$AB,$FD,$03,$FA,$E7,$B4
    .byte $F3,$93,$03,$41,$1F,$F2,$28,$9C,$FA,$E4,$A1,$FA,$09,$A1,$F2,$28
    .byte $9C,$FA,$E4,$A1,$FA,$09,$A1,$FA,$4E,$A2,$F2,$58,$A2,$FA,$E4,$A1
    .byte $FA,$09,$A1,$FA,$B6,$A0,$FA,$12,$A3,$F2,$71,$A3,$FA,$E4,$A1,$FA
    .byte $09,$A1,$FA,$4E,$A2,$FA,$58,$A2,$FA,$12,$A2,$F2,$28,$9C,$FA,$E4
    .byte $A1,$FA,$09,$A1,$FA,$BE,$A0,$F2,$28,$9C,$F3,$8B,$32,$2D,$B2,$28
    .byte $FA
    .byte $E4,$A1,$FA,$09,$A1,$FA,$F4,$A2,$F2,$64,$A3,$FA,$E4,$A1,$FA,$46
    .byte $A1,$FA,$08,$A3,$FA,$71,$A3,$F2,$F0,$9E,$FA,$E4,$A1,$FA,$99,$A0
    .byte $FA,$4E,$B4,$F2,$F0,$9E,$F2,$6A,$97,$F3,$8C,$02,$71,$F3,$8D,$05
    .byte $13,$24,$3B,$52,$FA,$E4,$A1,$FA,$1D,$A1,$FA,$DD,$A2,$FA,$B5,$9F
    .byte $F2,$28,$9C,$FA,$E4,$A1,$FA,$1D,$A1,$FA,$DD,$A2,$FA,$B5,$9F,$FA
    .byte $4E,$A2,$F2,$58,$A2,$FA,$E4,$A1,$FA,$1D,$A1,$FA,$DD,$A2,$FA,$B5
    .byte $9F,$FA,$B6,$A0,$FA,$E7,$A2,$FA,$1B,$9E,$F2,$71,$A3,$FA,$E4,$A1
    .byte $FA,$1D,$A1,$FA,$DD,$A2,$FA,$B5,$9F,$FA,$4E,$A2,$FA,$58,$A2,$FA
    .byte $12,$A2,$F2,$28,$9C,$FA,$E4,$A1,$FA,$1D,$A1,$FA,$DD,$A2,$FA,$B5
    .byte $9F,$FA,$B6,$A0,$FA,$E7,$A2,$FA,$1B,$9E,$F2,$28,$9C,$FA,$E4,$A1
    .byte $FA,$1D,$A1,$FA,$DD,$A2,$FA,$B5,$9F,$FA,$F4,$A2,$F2,$64,$A3,$FA
    .byte $E4,$A1,$FA,$1D,$A1,$FA,$DD,$A2,$FA,$B5,$9F,$FA,$71,$A3,$F2,$F0
    .byte $9E,$F3
    .byte $8E,$03,$21,$08,$FA,$D6,$9F,$F3,$81,$0B,$44,$FA,$D6,$9F,$FD,$03
    .byte $F3,$81,$70,$94,$F3,$8F,$05,$0D,$1A,$27,$2E,$FA,$F3,$9C,$FD,$03
    .byte $FA,$8D,$A0,$F0,$FA,$F3,$9C,$FD,$03,$FA,$A1,$A0,$FA,$08,$A3,$F2
    .byte $5D,$B4,$FA,$F3,$9C,$FD,$03,$FA,$4B,$A1,$FA,$08,$A3,$F2,$5D,$B4
    .byte $FA,$F3,$9C,$FD,$03,$F2,$A6,$A0,$FA,$DD,$A2,$F2,$5B,$A3,$F3,$8F
    .byte $05,$12,$11,$1B,$25,$FA,$F3,$9C,$FD,$03,$FA,$A1,$A0,$FA,$DD,$A2
    .byte $F2,$B5,$9F,$FA,$DD,$A2,$FD,$03,$FA,$6E,$9F,$F2,$71,$A3,$FA,$DD
    .byte $A2,$FD,$03,$FA,$68,$9F,$F2,$BF,$9F,$FA,$DD,$A2,$FA,$6E,$9F,$F2
    .byte $5B,$A3,$F3,$8F,$05,$07,$06,$0E,$16,$F2,$C0,$9C,$FA,$FE,$9D,$FA
    .byte $08,$A3,$F2,$71,$A3,$FA,$FE,$9D,$FA,$EF,$A2,$F2,$CE,$9F,$FA,$FE
    .byte $9D,$FA,$DD,$A2,$F2,$5B,$A3,$F3,$8F,$05,$0D,$0C,$17,$22,$FA,$FE
    .byte $9D,$FA,$DD,$A2,$F2,$B5,$9F,$FA,$FE,$9D,$FA,$DD,$A2,$FA,$6E,$9F
    .byte $F2,$71,$A3,$FA,$FE,$9D,$FA,$DD,$A2,$FA,$68,$9F,$F2,$BF,$9F,$FA
    .byte $FE,$9D,$FA,$DD,$A2,$FA,$6E,$9F,$F2,$5B,$A3,$F3,$04,$F3,$98,$24
    .byte $9A,$F3,$90,$05,$3D,$74,$B8,$EF,$FD,$00,$F3,$91,$04,$0D,$1B,$29
    .byte $FA,$35,$A3,$FA,$C3,$A1,$F2,$EA,$9F,$F0,$FA,$35,$A3,$FA,$C3,$A1
    .byte $FA,$FD,$9F,$FA,$F3,$9F,$F2,$DE,$9F,$FA,$35,$A3,$FA,$C3,$A1,$FA
    .byte $04,$A0,$FA,$F1,$9F,$F2,$71,$A3,$FA,$35,$A3,$FA,$C3,$A1,$F2,$64
    .byte $A1,$FD,$03,$F3,$91,$04,$0C,$1A,$28,$FA,$2D,$A3,$FA,$C3,$A1,$F2
    .byte $EA,$9F,$FA,$2D,$A3,$FA,$C3,$A1,$FA,$FD,$9F,$FA,$F3,$9F,$F2,$DE
    .byte $9F,$FA,$2D,$A3,$FA,$C3,$A1,$FA,$04,$A0,$FA,$F1,$9F,$F2,$71,$A3
    .byte $FA,$2D,$A3,$FA,$C3,$A1,$F2,$64,$A1,$FD,$03,$F3,$91,$04,$13,$24
    .byte $35,$FA,$2D,$A3,$FA,$C3,$A1,$FA,$04,$A0,$FA,$DD,$A2,$FA,$62,$9F
    .byte $F0,$FA,$2D,$A3,$FA,$C3,$A1,$FA,$04,$A0,$FA,$DD,$A2,$FA,$5C,$9F
    .byte $F2,$40,$A2,$FA,$2D,$A3,$FA,$C3,$A1,$FA,$04,$A0,$FA,$E7,$A2,$FA
    .byte $5C,$9F,$F2,$71,$A3,$FA,$2D,$A3,$FA,$C3,$A1,$F2,$64,$A1,$FD,$00
    .byte $F3,$91,$04,$0C,$1A,$28,$FA,$49,$B4,$FA,$C3,$A1,$F2,$EA,$9F,$FA
    .byte $49,$B4,$FA,$C3,$A1,$FA,$FD,$9F,$FA,$F3,$9F,$F2,$DE,$9F,$FA,$49
    .byte $B4,$FA,$C3,$A1,$FA,$04,$A0,$FA,$F1,$9F,$F2,$71,$A3,$FA,$49,$B4
    .byte $FA,$C3,$A1,$F2,$64,$A1,$FD,$00,$F3,$91,$04,$13,$24,$10,$FA,$49
    .byte $B4,$FA,$C3,$A1,$FA,$04,$A0,$FA,$E7,$A2,$FA,$62,$9F,$F0,$FA,$49
    .byte $B4,$FA,$C3,$A1,$FA,$04,$A0,$FA,$E7,$A2,$FA,$5C,$9F,$F2,$40,$A2
    .byte $FA,$49,$B4,$FA,$C3,$A1,$FA,$04,$A0,$FA,$E7,$A2,$FA,$5C,$9F,$F2
    .byte $71,$A3,$F3
    .byte $90,$05,$49,$50,$D0,$F5,$FD,$00,$F3,$91,$04,$10,$21,$32,$FA,$35
    .byte $A3,$FA,$AE,$A0,$FA,$D8,$A2,$F2,$76,$A1,$F0,$FA,$35,$A3,$FA,$AE
    .byte $A0,$FA,$D8,$A2,$FA,$2F,$A0,$FA,$51,$A0,$F2,$4C,$A0,$FA,$35,$A3
    .byte $FA,$AE,$A0,$FA,$D8,$A2,$FA,$47,$A0,$FA,$23,$A0,$F2,$71,$A3,$FA
    .byte $35,$A3,$FA,$AE,$A0,$FA,$D8,$A2,$F2,$85,$A1,$FD,$03,$F3,$91,$0C
    .byte $17,$28,$39,$FD,$03,$F3,$91,$40,$52,$66,$31,$FA,$2D,$A3,$FA,$AE
    .byte $A0,$FA,$D8,$A2,$F2,$76,$A1,$FA,$2D,$A3,$FA,$AE,$A0,$FA,$D8,$A2
    .byte $FA,$2F,$A0,$FA,$51,$A0,$F2,$4C,$A0,$FA,$2D,$A3,$FA,$AE,$A0,$FA
    .byte $D8,$A2,$FA,$47,$A0,$FA,$23,$A0,$F2,$71,$A3,$FA,$2D,$A3,$FA,$AE
    .byte $A0,$FA,$D8,$A2,$F2,$85,$A1,$FA,$2D,$A3,$FA,$AE,$A0,$FA,$D8,$A2
    .byte $FA,$47,$A0,$FA,$DD,$A2,$FA,$62,$9F,$F0,$FA,$2D,$A3,$FA,$AE,$A0
    .byte $FA,$D8,$A2,$FA,$47,$A0,$FA,$DD,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA
    .byte $2D,$A3,$FA,$AE,$A0,$FA,$D8,$A2,$FA,$47,$A0,$FA,$E7,$A2,$FA,$5C
    .byte $9F,$F2,$71,$A3,$FD,$00,$F3,$91,$04,$0F,$28,$39,$FA,$49,$B4,$FA
    .byte $AE,$A0,$FA,$D8,$A2,$F2,$76,$A1,$FA,$49,$B4,$FA,$AE,$A0,$FA,$D8
    .byte $A2,$FA,$2F,$A0,$FA,$51,$A0,$F2,$4C,$A0,$FD,$00,$F3,$91,$22,$34
    .byte $48,$31,$FA,$49,$B4,$FA,$AE,$A0,$FA,$D8,$A2,$FA,$47,$A0,$FA,$23
    .byte $A0,$F2,$71,$A3,$FA,$49,$B4,$FA,$AE,$A0,$FA,$D8,$A2,$F2,$85,$A1
    .byte $FA,$49,$B4,$FA,$AE,$A0,$FA,$D8,$A2,$FA,$47,$A0,$FA,$E7,$A2,$FA
    .byte $62,$9F,$F0,$FA,$49,$B4,$FA,$AE,$A0,$FA,$D8,$A2,$FA,$47,$A0,$FA
    .byte $E7,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA,$49,$B4,$FA,$AE,$A0,$FA,$D8
    .byte $A2,$FA,$47,$A0,$FA,$E7,$A2,$FA,$5C,$9F,$F2,$71,$A3,$FD
    .byte $03,$F3,$81,$02,$28,$F3,$97,$04,$09,$11,$19,$FA,$2D,$A3,$F2,$83
    .byte $A3,$FA,$2D,$A3,$FA,$21,$A3,$F2,$7E,$A3,$FA,$2D,$A3,$FA,$08,$A3
    .byte $F2,$71,$A3,$FA,$2D,$A3,$FA,$EF,$A2,$F2,$19,$A3,$F3,$97,$04,$0D
    .byte $18,$0A,$FA,$2D,$A3,$FA,$DD,$A2,$FA,$62,$9F,$F0,$FA,$2D,$A3,$FA
    .byte $DD,$A2,$FA,$5C,$9F,$F2,$40,$A2,$FA,$FE,$A2,$F0,$FA,$BB,$A1,$F2
    .byte $88,$A3,$FA,$B1,$A1,$F2,$88,$A3,$F6,$F2,$38,$A2,$F6,$F2,$2E,$A2
    .byte $FD,$00,$FA,$3E,$9F,$F3,$84,$02,$04,$F2,$9E,$B4,$F2,$B6,$B4,$FA
    .byte $BF,$B4,$F2,$C7,$B4,$FA,$BF,$B4,$F2,$12,$BA,$FA,$BF,$B4,$F2,$17
    .byte $BA,$FA,$A6,$B7,$F2,$AF,$B7,$FD,$00,$FA,$3E,$9F,$F3,$84,$05,$01
    .byte $F2,$AE,$B4,$F2,$A6,$B4,$FA,$36,$9C,$FA,$23,$9C,$5A,$30,$B7,$78
    .byte $01,$F0,$F0,$00,$FB,$F7,$03,$F3,$21,$5D,$A2,$67,$A2,$F3,$22,$3F
    .byte $9C,$36,$9C,$F9,$02,$42,$F3,$21,$B5,$A2,$BC,$A2,$F5,$F7,$13,$F9
    .byte $02,$41,$F3,$21,$4B,$9C,$53,$9C,$F3,$23,$A7,$A2,$AE,$A2,$71,$A2
    .byte $F3,$23,$C3,$A2,$CA,$A2,$D1,$A2,$F3,$2E,$4D,$A3,$3A,$A3,$F3,$37
    .byte $10,$B3,$FE,$B2,$F3,$37,$B3,$A3,$FE,$B2,$F3,$37,$BD,$A3,$FE,$B2
    .byte $F3,$37,$C5,$A3,$FE,$B2,$F3,$37,$B5,$A6,$BB,$A6,$F3,$37,$0C,$A7
    .byte $BC,$A6,$F3,$37,$CE,$A7,$CE,$A6,$F3,$37,$FF,$A6,$E4,$A6,$F3,$37
    .byte $D5,$A7,$CE,$A6,$F3,$37,$DE,$A7,$CE,$A6,$F3,$37,$E7,$A7,$CE,$A6
    .byte $FA,$95,$A4,$F3,$1F,$EE,$A7,$EE,$A7,$B0,$9C,$EE,$A7,$F3,$1C,$EE
    .byte $A7,$05,$A8,$20,$A8,$58,$A8,$99,$A8,$C1,$A8,$11,$A9,$FA,$95,$A4
    .byte $F3,$1F,$4F,$AA,$4F,$AA,$CD,$9C,$4F,$AA,$F3,$1C,$4F,$AA,$62,$AA
    .byte $6D,$AA,$B7,$AA,$CB,$AA,$E3,$AA,$FF,$AA,$FA,$23,$9C,$F3,$8C,$02
    .byte $10,$FD,$03,$F9,$02,$12,$30,$42,$82,$63,$F0,$F3,$B4,$03,$A9,$60
    .byte $F5,$F3,$1D,$31,$AB,$31,$AB,$31,$AB,$4C,$AB,$31,$AB,$CC,$AB,$31
    .byte $AB,$F0
    .byte $AB,$31,$AB,$31,$AB,$31,$AB,$23,$AC,$4D,$AC,$6E,$AC,$31,$AB,$31
    .byte $AB,$31,$AB,$B9,$AC,$0C,$AD,$1D,$AD,$4C,$AD,$5E,$AD,$81,$AD,$AB
    .byte $AD,$CA,$AD,$DC,$AD,$F9,$AD,$0F,$AE,$31,$AB,$31,$AB,$31,$AB,$31
    .byte $AB,$31,$AB,$31,$AB,$34,$AE,$F3,$09,$46,$9D,$64,$AE,$64,$AE,$64
    .byte $AE,$F3,$48,$4C,$AE,$D4,$AE,$64,$AE,$31,$AF,$64,$AE,$F3,$1D,$C5
    .byte $AF,$C5,$AF,$BE,$AF,$C5,$AF,$C6,$AF,$C5,$AF,$C5,$AF,$C5,$AF,$E5
    .byte $AF,$C5,$AF,$ED,$AF,$C5,$AF,$C5,$AF,$C5,$AF,$F0,$AF,$79,$B0,$C5
    .byte $AF,$C5,$AF,$9F,$B0,$C5,$AF,$C5,$AF,$C5,$AF,$C5,$AF,$C5,$AF,$C5
    .byte $AF,$C5,$AF,$C5,$AF,$C5,$AF,$C8
    .byte $B0,$D4,$B0,$DE,$B0,$E8,$B0,$C5,$AF,$FB,$B0,$C5,$AF,$F3,$1D,$97
    .byte $B1,$82,$B1,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$98,$B1,$97,$B1,$97
    .byte $B1,$CA,$B1,$2E,$B2,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$51
    .byte $B2,$97,$B1,$0C,$AD,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$97
    .byte $B1,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$97,$B1,$6F
    .byte $B2,$FB,$B0,$97,$B1,$F3,$09,$EC,$9D,$9B,$B2,$9B,$B2,$9B,$B2,$F3
    .byte $48,$4C,$AE,$D4,$AE,$A2,$B2,$9B,$B2,$9B,$B2,$F3,$37,$2C,$B3,$1A
    .byte $B3,$FA,$95,$A4,$F3,$1F,$AD,$B3,$AD,$B3,$0B,$9E,$AD,$B3,$F3,$1C
    .byte $AD,$B3,$AA,$B3,$AF,$B3,$E9,$B3,$F4,$B3,$06,$B4,$14,$B4,$F3,$42
    .byte $53,$B4,$58,$B4,$53,$B4,$58,$B4,$53,$B4,$58,$B4,$53,$B4,$58,$B4
    .byte $FA,$23,$9C,$F3,$8C,$02,$12,$FD,$00,$F9,$09,$2B,$37,$42,$83,$64
    .byte $F0,$FD,$00,$F3,$B4,$03,$02,$0B,$F3,$1E,$51,$AF,$59,$AF,$90,$AF
    .byte $AA,$AF,$F9,$15,$2B,$3F,$2A,$19,$47,$FB,$F5,$F3,$41,$96,$B7,$92
    .byte $B7,$97,$B7,$9C,$B7,$A1,$B7,$F3,$28,$1A,$B9,$13,$B9,$1B,$B9,$22
    .byte $B9,$29,$B9,$30,$B9,$37,$B9,$3E,$B9,$45,$B9,$4C,$B9,$53,$B9,$5A
    .byte $B9,$61,$B9,$68,$B9,$6F,$B9,$76,$B9,$7D,$B9,$84,$B9,$8B,$B9,$92
    .byte $B9,$99,$B9,$A0,$B9,$A7,$B9,$AE,$B9,$B5,$B9,$BC,$B9,$C3,$B9,$CA
    .byte $B9,$D1,$B9,$D8,$B9,$DF,$B9,$E6,$B9,$ED,$B9,$F4,$B9,$F3,$29,$1A
    .byte $B9,$13,$B9,$1B,$B9,$22,$B9,$29,$B9,$30,$B9,$37,$B9,$3E,$B9,$45
    .byte $B9,$4C,$B9,$53,$B9,$5A,$B9,$61,$B9,$68,$B9,$6F,$B9,$76,$B9,$7D
    .byte $B9,$84,$B9,$8B,$B9,$92,$B9,$99,$B9,$A0,$B9,$A7,$B9,$AE,$B9,$B5
    .byte $B9,$BC,$B9,$C3,$B9,$CA,$B9,$D1,$B9,$D8,$B9,$DF,$B9,$E6,$B9,$ED
    .byte $B9,$F4,$B9,$FF,$03,$11,$BA,$FB,$B9,$F3,$1D,$E7,$B4,$EF,$B4,$F7
    .byte $B4,$FB,$B4,$09,$B5,$25,$B5,$32,$B5,$3F,$B5,$F7,$B4,$53,$B5,$5A
    .byte $B5,$67,$B5,$75,$B5,$83,$B5,$99,$B5,$9D,$B5,$A4,$B5,$BA,$B5,$D0
    .byte $B5,$E4,$B5,$EC,$B5,$F7,$B5,$0B,$B6,$1D,$B6,$75,$B6,$85,$B6,$90
    .byte $B6,$C0,$B6,$D6,$B6,$DE,$B6,$E6,$B6,$F0,$B6,$01,$B7,$12,$B7,$24
    .byte $B7,$F3,$10,$4A,$9F,$4B,$BB,$4B,$BB,$4B,$BB,$4B,$BB,$F3,$1E,$4B
    .byte $BB,$02,$B5,$4F,$B5,$50,$BB,$FD,$03,$F3,$04,$24,$BA,$1C,$BA,$F3
    .byte $42,$5B,$A0,$60,$A0,$F3,$42,$65,$A0,$6A,$A0,$F3,$42,$1A,$A2,$1F
    .byte $A2,$F3,$42,$24,$A2,$29,$A2,$F3,$42,$33,$B4,$38,$B4,$F3,$33,$13
    .byte $A7,$F6,$A6,$06,$A7,$13,$A7,$13,$A7,$89,$A7,$9C,$A7,$92,$A7,$92
    .byte $A7,$92,$A7,$92,$A7,$92,$A7,$13,$A7,$13,$A7,$A5,$A7,$BF,$A7,$F3
    .byte $AF,$15,$02,$09,$F5,$78,$33,$94,$A0,$F2,$23,$9C,$F9,$02,$20,$78
    .byte $48,$75,$A1,$F2,$23,$9C,$FB,$FB
    .byte $32,$1B,$02,$01,$FB,$78,$F0,$F0,$25,$FB,$FA,$C7,$9F,$5A,$58,$03
    .byte $E3,$FB,$F6,$FC,$04,$F9,$02,$2A,$FB,$FA,$C7,$9F,$5A,$58,$03,$0B
    .byte $FB,$F5,$FC,$04,$32,$58,$04,$06,$FB,$FC,$02,$2D,$F0,$05,$F0,$FB
    .byte $3C,$6C,$06,$07,$FB,$FC,$02,$3C,$57,$07,$07,$FB,$F8,$02,$F9,$02
    .byte $2A,$14,$F0,$08,$F0,$FE,$01,$FB,$FC,$02,$1E
