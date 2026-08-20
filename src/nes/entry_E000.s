; entry_E000.s ($E002-$E6CE)

    ADC #$01                   ; $E002
    LDY #$06                   ; $E004
    CLC                        ; $E006
    ADC ($0034),Y              ; $E007
    CMP #$D0                   ; $E009
    BCC $E00F                  ; $E00B
    LDA #$CF                   ; $E00D
    CMP #$30                   ; $E00F
    BCS $E015                  ; $E011
    LDA #$30                   ; $E013
    STA ($0034),Y              ; $E015
    LDA $0441                  ; $E017
    LDX $05FC                  ; $E01A
    STX $0441                  ; $E01D
    STA $05FC                  ; $E020
    JSR $E059                  ; $E023
    LDA #$FF                   ; $E026
    STA $061A                  ; $E028
    LDA #$01                   ; $E02B
    STA $061B                  ; $E02D
    JSR $E73E                  ; $E030
    LDA $05FC                  ; $E033
    STA $0441                  ; $E036
    JSR $E6EC                  ; $E039
    PHA                        ; $E03C
    LDA $0022                  ; $E03D
    LDA #$1A                   ; $E03F
    STA $0024                  ; $E041
    LDA #$1B                   ; $E043
    STA $0025                  ; $E045
    JSR $CE2D                  ; $E047
    PLA                        ; $E04A
    JSR $801E                  ; $E04B
    LDA #$1B                   ; $E04E
    JSR $CBB0                  ; $E050
    LDX #$50                   ; $E053
    TXS                        ; $E055
    JMP $E0DF                  ; $E056
    .byte $AD,$FC,$05
    CMP #$FF                   ; $E05C
    BEQ $E073                  ; $E05E
    JSR $CD7C                  ; $E060
    LDY #$06                   ; $E063
    LDA ($0034),Y              ; $E065
    TAX                        ; $E067
    LDY #$08                   ; $E068
    LDA ($0034),Y              ; $E06A
    TAY                        ; $E06C
    JSR $CDE2                  ; $E06D
    STA $0638                  ; $E070
    RTS                        ; $E073
    .byte $AD,$FF,$05
    BEQ $E0DE                  ; $E077
    LDA #$0F                   ; $E079
    STA $062A                  ; $E07B
    JSR $E709                  ; $E07E
    LDA #$00                   ; $E081
    PHA                        ; $E083
    LDA #$01                   ; $E084
    JSR $CB0F                  ; $E086
    PLA                        ; $E089
    PHA                        ; $E08A
    BEQ $E0D1                  ; $E08B
    CMP #$0B                   ; $E08D
    BEQ $E0D1                  ; $E08F
    CMP $0441                  ; $E091
    BEQ $E0D1                  ; $E094
    BIT $062A                  ; $E096
    BPL $E0AF                  ; $E099
    PHA                        ; $E09B
    PHA                        ; $E09C
    LDA $0022                  ; $E09D
    LDA #$1A                   ; $E09F
    STA $0024                  ; $E0A1
    LDA #$1B                   ; $E0A3
    STA $0025                  ; $E0A5
    JSR $CE2D                  ; $E0A7
    PLA                        ; $E0AA
    JSR $8000                  ; $E0AB
    PLA                        ; $E0AE
    STA $0041                  ; $E0AF
    JSR $CD7C                  ; $E0B1
    LDA $0041                  ; $E0B4
    CMP #$0B                   ; $E0B6
    LDX $05FB                  ; $E0B8
    BEQ $E0C3                  ; $E0BB
    PHP                        ; $E0BD
    PLA                        ; $E0BE
    EOR #$01                   ; $E0BF
    PHA                        ; $E0C1
    PLP                        ; $E0C2
    LDX #$21                   ; $E0C3
    BCC $E0C9                  ; $E0C5
    LDX #$22                   ; $E0C7
    LDA $0041                  ; $E0C9
    JSR $CE08                  ; $E0CB
    JSR $E854                  ; $E0CE
    PLA                        ; $E0D1
    CLC                        ; $E0D2
    ADC #$01                   ; $E0D3
    CMP #$16                   ; $E0D5
    BNE $E083                  ; $E0D7
    LDA #$00                   ; $E0D9
    STA $05FF                  ; $E0DB
    RTS                        ; $E0DE
    .byte $A9,$00
    JSR $EF7F                  ; $E0E1
    LDA #$01                   ; $E0E4
    JSR $EF7F                  ; $E0E6
    JSR $E233                  ; $E0E9
    LDA #$0A                   ; $E0EC
    STA $0614                  ; $E0EE
    LDA #$FF                   ; $E0F1
    STA $062A                  ; $E0F3
    JSR $E6EC                  ; $E0F6
    LDY #$40                   ; $E0F9
    LDX #$00                   ; $E0FB
    STX $044E                  ; $E0FD
    STX $0600                  ; $E100
    LDA $0441                  ; $E103
    CMP #$0B                   ; $E106
    BCC $E10E                  ; $E108
    LDX #$0B                   ; $E10A
    LDY #$00                   ; $E10C
    STX $05FB                  ; $E10E
    STY $0517                  ; $E111
    TXA                        ; $E114
    BNE $E125                  ; $E115
    BIT $044C                  ; $E117
    BPL $E142                  ; $E11A
    STA $044C                  ; $E11C
    STA $03F1                  ; $E11F
    JMP $E142                  ; $E122
    LDA #$00                   ; $E125
    STA $0442                  ; $E127
    JSR $CE99                  ; $E12A
    STA $05FD                  ; $E12D
    LDA $0441                  ; $E130
    JSR $CD7C                  ; $E133
    LDA #$05                   ; $E136
    LDY #$09                   ; $E138
    STA ($0034),Y              ; $E13A
    LDA $05FE                  ; $E13C
    STA $0617                  ; $E13F
    JSR $E267                  ; $E142
    .byte $A9,$01
    JSR $CB0F                  ; $E147
    JSR $E349                  ; $E14A
    LDA $0614                  ; $E14D
    BEQ $E158                  ; $E150
    DEC $0614                  ; $E152
    JMP $E145                  ; $E155
    LDA #$0A                   ; $E158
    STA $0614                  ; $E15A
    LDA a: $001C               ; $E15D
    AND #$0F                   ; $E160
    BEQ $E186                  ; $E162
    PHA                        ; $E164
    LDX #$20                   ; $E165
    LDA $0441                  ; $E167
    LDY $05FB                  ; $E16A
    BEQ $E174                  ; $E16D
    LDX #$22                   ; $E16F
    LDA $05FD                  ; $E171
    JSR $CE08                  ; $E174
    PLA                        ; $E177
    PHA                        ; $E178
    LDY #$05                   ; $E179
    JSR $E8F5                  ; $E17B
    PLA                        ; $E17E
    LSR                        ; $E17F
    LSR                        ; $E180
    LDY #$07                   ; $E181
    JSR $E8F5                  ; $E183
    JSR $E6EC                  ; $E186
    LDA $0441                  ; $E189
    CMP #$0B                   ; $E18C
    BCC $E1E7                  ; $E18E
    LDA $05FE                  ; $E190
    CMP $0617                  ; $E193
    BEQ $E1E7                  ; $E196
    STA $0617                  ; $E198
    LDA #$00                   ; $E19B
    STA $0621                  ; $E19D
    PHA                        ; $E1A0
    LDA $0022                  ; $E1A1
    LDA #$1C                   ; $E1A3
    STA $0024                  ; $E1A5
    LDA #$1D                   ; $E1A7
    STA $0025                  ; $E1A9
    JSR $CE2D                  ; $E1AB
    PLA                        ; $E1AE
    JSR $8006                  ; $E1AF
    LDA $043B                  ; $E1B2
    CMP #$02                   ; $E1B5
    BEQ $E1E7                  ; $E1B7
    PHA                        ; $E1B9
    LDA $0022                  ; $E1BA
    LDA #$1A                   ; $E1BC
    STA $0024                  ; $E1BE
    LDA #$1B                   ; $E1C0
    STA $0025                  ; $E1C2
    JSR $CE2D                  ; $E1C4
    PLA                        ; $E1C7
    JSR $8021                  ; $E1C8
    JSR $CC46                  ; $E1CB
    LDA #$00                   ; $E1CE
    STA $062D                  ; $E1D0
    STA $0615                  ; $E1D3
    LDA #$1A                   ; $E1D6
    STA $0024                  ; $E1D8
    LDA #$1B                   ; $E1DA
    STA $0025                  ; $E1DC
    JSR $CE2D                  ; $E1DE
    LDX #$50                   ; $E1E1
    TXS                        ; $E1E3
    JMP $8027                  ; $E1E4
    LDX #$00                   ; $E1E7
    STX $05FF                  ; $E1E9
    INX                        ; $E1EC
    TXA                        ; $E1ED
    JSR $D193                  ; $E1EE
    JSR $E27D                  ; $E1F1
    INC $0613                  ; $E1F4
    JSR $E2BC                  ; $E1F7
    JSR $E407                  ; $E1FA
    BIT $044B                  ; $E1FD
    BPL $E21E                  ; $E200
    LDA $05FB                  ; $E202
    BNE $E21E                  ; $E205
    BIT $0635                  ; $E207
    BPL $E21E                  ; $E20A
    PHA                        ; $E20C
    LDA $0022                  ; $E20D
    LDA #$1A                   ; $E20F
    STA $0024                  ; $E211
    LDA #$1B                   ; $E213
    STA $0025                  ; $E215
    JSR $CE2D                  ; $E217
    PLA                        ; $E21A
    JSR $8039                  ; $E21B
    PHA                        ; $E21E
    LDA $0022                  ; $E21F
    LDA #$1A                   ; $E221
    STA $0024                  ; $E223
    LDA #$1B                   ; $E225
    STA $0025                  ; $E227
    JSR $CE2D                  ; $E229
    PLA                        ; $E22C
    JSR $8033                  ; $E22D
    JMP $E145                  ; $E230
    .byte $A9,$1E
    JSR $CBB0                  ; $E235
    PHA                        ; $E238
    LDA $0022                  ; $E239
    LDA #$1C                   ; $E23B
    STA $0024                  ; $E23D
    LDA #$1D                   ; $E23F
    STA $0025                  ; $E241
    JSR $CE2D                  ; $E243
    PLA                        ; $E246
    JSR $8024                  ; $E247
    JSR $E267                  ; $E24A
    LDA #$80                   ; $E24D
    STA $0615                  ; $E24F
    STA $062D                  ; $E252
    LDA #$00                   ; $E255
    STA $0642                  ; $E257
    STA $0643                  ; $E25A
    LDA #$02                   ; $E25D
    STA $008E                  ; $E25F
    LDA #$01                   ; $E261
    STA $0469                  ; $E263
    RTS                        ; $E266
    LDA $05FB                  ; $E267
    BEQ $E277                  ; $E26A
    LDA #$31                   ; $E26C
    JSR $EF7F                  ; $E26E
    LDA #$32                   ; $E271
    JSR $EF7F                  ; $E273
    RTS                        ; $E276
    LDA #$30                   ; $E277
    JSR $EF7F                  ; $E279
    RTS                        ; $E27C
    JSR $CD77                  ; $E27D
    LDY #$0A                   ; $E280
    LDA ($0034),Y              ; $E282
    BNE $E2A2                  ; $E284
    LDX $0635                  ; $E286
    LDY $0637                  ; $E289
    LDA $05FB                  ; $E28C
    BEQ $E296                  ; $E28F
    TXA                        ; $E291
    EOR #$FF                   ; $E292
    TAX                        ; $E294
    INX                        ; $E295
    CPX #$C4                   ; $E296
    BCC $E2A2                  ; $E298
    CPY #$74                   ; $E29A
    BCC $E2A2                  ; $E29C
    CPY #$8C                   ; $E29E
    BCC $E2A3                  ; $E2A0
    RTS                        ; $E2A2
    LDA #$00                   ; $E2A3
    STA $062D                  ; $E2A5
    STA $0615                  ; $E2A8
    LDA #$1A                   ; $E2AB
    STA $0024                  ; $E2AD
    LDA #$1B                   ; $E2AF
    STA $0025                  ; $E2B1
    JSR $CE2D                  ; $E2B3
    LDX #$50                   ; $E2B6
    TXS                        ; $E2B8
    JMP $8009                  ; $E2B9
    INC $0618                  ; $E2BC
    LDA $0618                  ; $E2BF
    CMP #$01                   ; $E2C2
    BCC $E315                  ; $E2C4
    LDA #$00                   ; $E2C6
    STA $0618                  ; $E2C8
    PHA                        ; $E2CB
    CMP $0441                  ; $E2CC
    BEQ $E30D                  ; $E2CF
    LDX #$00                   ; $E2D1
    JSR $CE08                  ; $E2D3
    LDX #$02                   ; $E2D6
    LDY #$00                   ; $E2D8
    LDA ($0034),Y              ; $E2DA
    LDY #$01                   ; $E2DC
    CMP #$20                   ; $E2DE
    BNE $E2EC                  ; $E2E0
    LDX #$01                   ; $E2E2
    LDA ($0034),Y              ; $E2E4
    INY                        ; $E2E6
    ORA ($0034),Y              ; $E2E7
    BEQ $E30D                  ; $E2E9
    DEY                        ; $E2EB
    TXA                        ; $E2EC
    CLC                        ; $E2ED
    ADC ($0034),Y              ; $E2EE
    TAX                        ; $E2F0
    INY                        ; $E2F1
    LDA ($0034),Y              ; $E2F2
    ADC #$00                   ; $E2F4
    TAY                        ; $E2F6
    SEC                        ; $E2F7
    TXA                        ; $E2F8
    SBC $0032                  ; $E2F9
    TYA                        ; $E2FB
    SBC $0033                  ; $E2FC
    BCC $E304                  ; $E2FE
    LDX $0032                  ; $E300
    LDY $0033                  ; $E302
    TYA                        ; $E304
    LDY #$02                   ; $E305
    STA ($0034),Y              ; $E307
    TXA                        ; $E309
    DEY                        ; $E30A
    STA ($0034),Y              ; $E30B
    PLA                        ; $E30D
    CLC                        ; $E30E
    ADC #$01                   ; $E30F
    CMP #$0B                   ; $E311
    BNE $E2CB                  ; $E313
    LDA $0441                  ; $E315
    CMP #$0B                   ; $E318
    BCS $E348                  ; $E31A
    JSR $CD7C                  ; $E31C
    LDX #$03                   ; $E31F
    LDY #$00                   ; $E321
    LDA ($0034),Y              ; $E323
    CMP #$20                   ; $E325
    BNE $E32B                  ; $E327
    LDX #$05                   ; $E329
    STX $003A                  ; $E32B
    LDY #$01                   ; $E32D
    LDA ($0034),Y              ; $E32F
    SEC                        ; $E331
    SBC $003A                  ; $E332
    TAX                        ; $E334
    INY                        ; $E335
    LDA ($0034),Y              ; $E336
    SBC #$00                   ; $E338
    BCS $E33F                  ; $E33A
    LDX #$00                   ; $E33C
    TXA                        ; $E33E
    STA ($0034),Y              ; $E33F
    TXA                        ; $E341
    DEY                        ; $E342
    STA ($0034),Y              ; $E343
    JSR $E267                  ; $E345
    RTS                        ; $E348
    LDA #$00                   ; $E349
    STA $0532                  ; $E34B
    LDA $05FB                  ; $E34E
    BNE $E3A3                  ; $E351
    LDA $0615                  ; $E353
    ORA #$40                   ; $E356
    STA $0615                  ; $E358
    LDA a: $001C               ; $E35B
    AND #$40                   ; $E35E
    BNE $E382                  ; $E360
    LDA a: $001C               ; $E362
    AND #$0F                   ; $E365
    BEQ $E3C9                  ; $E367
    INC $0532                  ; $E369
    LDX #$00                   ; $E36C
    AND #$02                   ; $E36E
    BNE $E374                  ; $E370
    LDX #$40                   ; $E372
    STX $0517                  ; $E374
    LDA $0615                  ; $E377
    AND #$BF                   ; $E37A
    STA $0615                  ; $E37C
    JMP $E3C9                  ; $E37F
    LDA #$00                   ; $E382
    STA $0600                  ; $E384
    STA $0615                  ; $E387
    LDA #$44                   ; $E38A
    JSR $CBB0                  ; $E38C
    JSR $CB8B                  ; $E38F
    LDA #$1A                   ; $E392
    STA $0024                  ; $E394
    LDA #$1B                   ; $E396
    STA $0025                  ; $E398
    JSR $CE2D                  ; $E39A
    LDX #$50                   ; $E39D
    TXS                        ; $E39F
    JMP $8003                  ; $E3A0
    INC $0532                  ; $E3A3
    LDA #$C0                   ; $E3A6
    AND a: $001E               ; $E3A8
    BEQ $E3C9                  ; $E3AB
    LDX #$01                   ; $E3AD
    TAY                        ; $E3AF
    BMI $E3B4                  ; $E3B0
    LDX #$FF                   ; $E3B2
    TXA                        ; $E3B4
    CLC                        ; $E3B5
    ADC $05FD                  ; $E3B6
    BNE $E3BD                  ; $E3B9
    LDA #$0A                   ; $E3BB
    CMP #$0B                   ; $E3BD
    BCC $E3C3                  ; $E3BF
    LDA #$01                   ; $E3C1
    STA $05FD                  ; $E3C3
    JSR $E267                  ; $E3C6
    .byte $60
    LDA $05FB                  ; $E3CA
    BNE $E3D6                  ; $E3CD
    LDA a: $001C               ; $E3CF
    AND #$0F                   ; $E3D2
    BEQ $E406                  ; $E3D4
    LDA $0441                  ; $E3D6
    LDX #$20                   ; $E3D9
    JSR $CE08                  ; $E3DB
    LSR $0033                  ; $E3DE
    ROR $0032                  ; $E3E0
    LSR $0033                  ; $E3E2
    ROR $0032                  ; $E3E4
    LDX $0032                  ; $E3E6
    LDY $0033                  ; $E3E8
    BIT $0517                  ; $E3EA
    BVS $E3F7                  ; $E3ED
    TXA                        ; $E3EF
    EOR #$FF                   ; $E3F0
    TAX                        ; $E3F2
    TYA                        ; $E3F3
    EOR #$FF                   ; $E3F4
    TAY                        ; $E3F6
    TXA                        ; $E3F7
    CLC                        ; $E3F8
    ADC $0642                  ; $E3F9
    STA $0642                  ; $E3FC
    TYA                        ; $E3FF
    ADC $0643                  ; $E400
    STA $0643                  ; $E403
    RTS                        ; $E406
    JSR $E709                  ; $E407
    LDA #$00                   ; $E40A
    .byte $48
    LDA #$01                   ; $E40D
    JSR $CB0F                  ; $E40F
    JSR $E349                  ; $E412
    PLA                        ; $E415
    PHA                        ; $E416
    BEQ $E48F                  ; $E417
    CMP #$0B                   ; $E419
    BEQ $E48F                  ; $E41B
    LDX $05FB                  ; $E41D
    BEQ $E427                  ; $E420
    CMP $05FD                  ; $E422
    BEQ $E48F                  ; $E425
    CMP $0441                  ; $E427
    BNE $E430                  ; $E42A
    CMP #$0B                   ; $E42C
    BCC $E48F                  ; $E42E
    BIT $062A                  ; $E430
    BPL $E44E                  ; $E433
    CMP $0441                  ; $E435
    BEQ $E44E                  ; $E438
    PHA                        ; $E43A
    PHA                        ; $E43B
    LDA $0022                  ; $E43C
    LDA #$1A                   ; $E43E
    STA $0024                  ; $E440
    LDA #$1B                   ; $E442
    STA $0025                  ; $E444
    JSR $CE2D                  ; $E446
    PLA                        ; $E449
    JSR $8000                  ; $E44A
    PLA                        ; $E44D
    STA $0041                  ; $E44E
    JSR $CD7C                  ; $E450
    LDA $0041                  ; $E453
    CMP #$0B                   ; $E455
    LDX $05FB                  ; $E457
    BEQ $E462                  ; $E45A
    PHP                        ; $E45C
    PLA                        ; $E45D
    EOR #$01                   ; $E45E
    PHA                        ; $E460
    PLP                        ; $E461
    LDX #$21                   ; $E462
    BCC $E472                  ; $E464
    LDX #$22                   ; $E466
    LDY #$09                   ; $E468
    LDA ($0034),Y              ; $E46A
    CMP #$F0                   ; $E46C
    BNE $E472                  ; $E46E
    LDX #$1F                   ; $E470
    LDA $0041                  ; $E472
    CMP $0441                  ; $E474
    BNE $E47B                  ; $E477
    LDX #$20                   ; $E479
    JSR $CE08                  ; $E47B
    LDY #$0A                   ; $E47E
    LDA ($0034),Y              ; $E480
    BEQ $E48C                  ; $E482
    SEC                        ; $E484
    SBC #$01                   ; $E485
    STA ($0034),Y              ; $E487
    JMP $E48F                  ; $E489
    JSR $E854                  ; $E48C
    .byte $68
    CLC                        ; $E490
    ADC #$01                   ; $E491
    CMP #$16                   ; $E493
    BEQ $E49A                  ; $E495
    JMP $E40C                  ; $E497
    LDA #$00                   ; $E49A
    STA $0600                  ; $E49C
    LDA $0613                  ; $E49F
    CMP #$05                   ; $E4A2
    BCC $E4B0                  ; $E4A4
    LDA #$00                   ; $E4A6
    STA $0613                  ; $E4A8
    LDA #$07                   ; $E4AB
    JSR $E4D7                  ; $E4AD
    LDA $0600                  ; $E4B0
    BNE $E4B6                  ; $E4B3
    RTS                        ; $E4B5
    LDA #$00                   ; $E4B6
    STA $062D                  ; $E4B8
    STA $0615                  ; $E4BB
    JSR $CB8B                  ; $E4BE
    LDA #$2E                   ; $E4C1
    JSR $CBB0                  ; $E4C3
    LDA #$1A                   ; $E4C6
    STA $0024                  ; $E4C8
    LDA #$1B                   ; $E4CA
    STA $0025                  ; $E4CC
    JSR $CE2D                  ; $E4CE
    LDX #$50                   ; $E4D1
    TXS                        ; $E4D3
    JMP $8003                  ; $E4D4
    .byte $85,$43
    LDA #$00                   ; $E4D9
    STA $0600                  ; $E4DB
    LDA $05FB                  ; $E4DE
    EOR #$0B                   ; $E4E1
    CLC                        ; $E4E3
    ADC #$01                   ; $E4E4
    STA $0041                  ; $E4E6
    LDA #$0A                   ; $E4E8
    STA $0042                  ; $E4EA
    LDA $0041                  ; $E4EC
    JSR $CD7C                  ; $E4EE
    LDY #$0A                   ; $E4F1
    LDA ($0034),Y              ; $E4F3
    BNE $E4FA                  ; $E4F5
    JSR $E501                  ; $E4F7
    INC $0041                  ; $E4FA
    DEC $0042                  ; $E4FC
    BNE $E4EC                  ; $E4FE
    RTS                        ; $E500
    LDA #$00                   ; $E501
    STA $0044                  ; $E503
    LDY #$06                   ; $E505
    LDA ($0034),Y              ; $E507
    SEC                        ; $E509
    SBC $0635                  ; $E50A
    BCS $E513                  ; $E50D
    EOR #$FF                   ; $E50F
    ADC #$01                   ; $E511
    CMP $0043                  ; $E513
    BCS $E519                  ; $E515
    INC $0044                  ; $E517
    LDY #$08                   ; $E519
    LDA ($0034),Y              ; $E51B
    SEC                        ; $E51D
    SBC $0637                  ; $E51E
    BCS $E527                  ; $E521
    EOR #$FF                   ; $E523
    ADC #$01                   ; $E525
    CMP $0043                  ; $E527
    BCS $E52D                  ; $E529
    INC $0044                  ; $E52B
    LDA $0044                  ; $E52D
    CMP #$02                   ; $E52F
    BNE $E54B                  ; $E531
    LDX $0600                  ; $E533
    CPX #$05                   ; $E536
    BCS $E54B                  ; $E538
    LDA $05FB                  ; $E53A
    BEQ $E543                  ; $E53D
    CPX #$04                   ; $E53F
    BCS $E54B                  ; $E541
    LDA $0041                  ; $E543
    STA $0601,X                ; $E545
    INC $0600                  ; $E548
    RTS                        ; $E54B
    .byte $A9,$00
    STA $044E                  ; $E54E
    LDA $0600                  ; $E551
    BEQ $E590                  ; $E554
    LDX #$00                   ; $E556
    LDY #$00                   ; $E558
    LDA $060B,X                ; $E55A
    CMP #$05                   ; $E55D
    BNE $E56E                  ; $E55F
    LDA $0601,X                ; $E561
    BEQ $E56E                  ; $E564
    CMP #$0B                   ; $E566
    BEQ $E56E                  ; $E568
    STA $0601,Y                ; $E56A
    INY                        ; $E56D
    INX                        ; $E56E
    CPX $0600                  ; $E56F
    BNE $E55A                  ; $E572
    TYA                        ; $E574
    BEQ $E590                  ; $E575
    STY $0600                  ; $E577
    LDA #$2E                   ; $E57A
    JSR $CBB0                  ; $E57C
    LDA #$1A                   ; $E57F
    STA $0024                  ; $E581
    LDA #$1B                   ; $E583
    STA $0025                  ; $E585
    JSR $CE2D                  ; $E587
    LDX #$50                   ; $E58A
    TXS                        ; $E58C
    JMP $8003                  ; $E58D
    LDX #$50                   ; $E590
    TXS                        ; $E592
    JMP $E0DF                  ; $E593
    .byte $AD,$E2,$00
    CMP #$E0                   ; $E599
    BCS $E5BA                  ; $E59B
    JSR $CD77                  ; $E59D
    LDY #$07                   ; $E5A0
    LDA ($0034),Y              ; $E5A2
    CLC                        ; $E5A4
    ADC #$1A                   ; $E5A5
    CMP #$80                   ; $E5A7
    BCC $E5AD                  ; $E5A9
    LDA #$7F                   ; $E5AB
    STA ($0034),Y              ; $E5AD
    LDY #$06                   ; $E5AF
    LDA #$04                   ; $E5B1
    STA ($0034),Y              ; $E5B3
    LDA #$42                   ; $E5B5
    JSR $CBB0                  ; $E5B7
    PHA                        ; $E5BA
    LDA $0022                  ; $E5BB
    LDA #$14                   ; $E5BD
    STA $0024                  ; $E5BF
    LDA #$15                   ; $E5C1
    STA $0025                  ; $E5C3
    JSR $CE2D                  ; $E5C5
    PLA                        ; $E5C8
    JSR $800C                  ; $E5C9
    LDA #$01                   ; $E5CC
    PHA                        ; $E5CE
    LDA $0022                  ; $E5CF
    LDA #$1A                   ; $E5D1
    STA $0024                  ; $E5D3
    LDA #$1B                   ; $E5D5
    STA $0025                  ; $E5D7
    JSR $CE2D                  ; $E5D9
    PLA                        ; $E5DC
    JSR $8024                  ; $E5DD
    LDX $0635                  ; $E5E0
    LDY $0637                  ; $E5E3
    JSR $CDE2                  ; $E5E6
    STA $05FE                  ; $E5E9
    LDA $0600                  ; $E5EC
    BEQ $E60E                  ; $E5EF
    LDA #$00                   ; $E5F1
    STA $0616                  ; $E5F3
    LDX $0616                  ; $E5F6
    LDA $060B,X                ; $E5F9
    CMP #$05                   ; $E5FC
    BNE $E603                  ; $E5FE
    JSR $E616                  ; $E600
    INC $0616                  ; $E603
    LDA $0616                  ; $E606
    CMP $0600                  ; $E609
    BNE $E5F6                  ; $E60C
    LDA #$04                   ; $E60E
    STA $062B                  ; $E610
    JMP $DE96                  ; $E613
    LDA #$01                   ; $E616
    STA $043B                  ; $E618
    LDA #$00                   ; $E61B
    STA $043C                  ; $E61D
    LDA #$02                   ; $E620
    STA $043D                  ; $E622
    LDA #$00                   ; $E625
    STA $043E                  ; $E627
    LDA $0601,X                ; $E62A
    BEQ $E677                  ; $E62D
    CMP #$0B                   ; $E62F
    BEQ $E677                  ; $E631
    STA $0442                  ; $E633
    PHA                        ; $E636
    LDA $0022                  ; $E637
    LDA #$1C                   ; $E639
    STA $0024                  ; $E63B
    LDA #$1D                   ; $E63D
    STA $0025                  ; $E63F
    JSR $CE2D                  ; $E641
    PLA                        ; $E644
    JSR $8015                  ; $E645
    LDA $0032                  ; $E648
    CLC                        ; $E64A
    ADC #$04                   ; $E64B
    BCC $E651                  ; $E64D
    .byte $A9,$FF
    STA $0032                  ; $E651
    PHA                        ; $E653
    LDA $0022                  ; $E654
    LDA #$1A                   ; $E656
    STA $0024                  ; $E658
    LDA #$1B                   ; $E65A
    STA $0025                  ; $E65C
    JSR $CE2D                  ; $E65E
    PLA                        ; $E661
    JSR $8012                  ; $E662
    PHA                        ; $E665
    LDA $0022                  ; $E666
    LDA #$1A                   ; $E668
    STA $0024                  ; $E66A
    LDA #$1B                   ; $E66C
    STA $0025                  ; $E66E
    JSR $CE2D                  ; $E670
    PLA                        ; $E673
    JSR $8015                  ; $E674
    RTS                        ; $E677
    .byte $AD,$FB,$05
    EOR #$0B                   ; $E67B
    STA $05FB                  ; $E67D
    JSR $D093                  ; $E680
    LDA #$02                   ; $E683
    JSR $CB0F                  ; $E685
    .byte $A9,$00
    BIT $0635                  ; $E68A
    BPL $E691                  ; $E68D
    ORA #$01                   ; $E68F
    BIT $0637                  ; $E691
    BPL $E698                  ; $E694
    ORA #$02                   ; $E696
    STA $003A                  ; $E698
    LDA a: $00E2               ; $E69A
    AND #$07                   ; $E69D
    ASL                        ; $E69F
    TAX                        ; $E6A0
    LDY $E6D0,X                ; $E6A1
    LDA $E6CF,X                ; $E6A4
    TAX                        ; $E6A7
    LSR $003A                  ; $E6A8
    BCC $E6B0                  ; $E6AA
    TXA                        ; $E6AC
    EOR #$FF                   ; $E6AD
    TAX                        ; $E6AF
    LSR $003A                  ; $E6B0
    BCC $E6B8                  ; $E6B2
    TYA                        ; $E6B4
    EOR #$FF                   ; $E6B5
    TAY                        ; $E6B7
    STX $0635                  ; $E6B8
    STY $0637                  ; $E6BB
    JSR $CDE2                  ; $E6BE
    STA $0638                  ; $E6C1
    STA $05FE                  ; $E6C4
    LDA #$04                   ; $E6C7
    STA $062B                  ; $E6C9
    JMP $DE96                  ; $E6CC
