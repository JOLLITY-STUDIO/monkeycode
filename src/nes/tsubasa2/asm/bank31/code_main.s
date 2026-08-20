    .byte $FF,$18
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
; --- gap $E9FA-$E9FE ---
    JSR $CB0F                  ; $EB88
    LDA $0021                  ; $EB8B
    AND #$1E                   ; $EB8D
    LDX $0539                  ; $EB8F
    BEQ $EB99                  ; $EB92
    LDA $0021                  ; $EB94
    EOR $0539                  ; $EB96
    STA $0021                  ; $EB99
    JSR $EC08                  ; $EB9B
    JSR $ED85                  ; $EB9E
    PHA                        ; $EBA1
    LDA $0022                  ; $EBA2
    LDA #$18                   ; $EBA4
    STA $0024                  ; $EBA6
    LDA #$19                   ; $EBA8
    STA $0025                  ; $EBAA
    JSR $CE2D                  ; $EBAC
    PLA                        ; $EBAF
    JSR $8003                  ; $EBB0
    PHA                        ; $EBB3
    LDA $0022                  ; $EBB4
    LDA #$18                   ; $EBB6
    STA $0024                  ; $EBB8
    LDA #$19                   ; $EBBA
    STA $0025                  ; $EBBC
    JSR $CE2D                  ; $EBBE
    PLA                        ; $EBC1
    JSR $8006                  ; $EBC2
    PHA                        ; $EBC5
    LDA $0022                  ; $EBC6
    LDA #$18                   ; $EBC8
    STA $0024                  ; $EBCA
    LDA #$19                   ; $EBCC
    STA $0025                  ; $EBCE
    JSR $CE2D                  ; $EBD0
    PLA                        ; $EBD3
    JSR $8009                  ; $EBD4
    LDA $052E                  ; $EBD7
    BEQ $EC05                  ; $EBDA
    DEC $052E                  ; $EBDC
    BNE $EC05                  ; $EBDF
    LDA $052F                  ; $EBE1
    CMP #$7E                   ; $EBE4
    BCC $EBF9                  ; $EBE6
    CMP #$7F                   ; $EBE8
    BEQ $EBF3                  ; $EBEA
    LDA a: $0027               ; $EBEC
    CMP #$04                   ; $EBEF
    BEQ $EC05                  ; $EBF1
    JSR $D093                  ; $EBF3
    JMP $EC05                  ; $EBF6
    BIT $063F                  ; $EBF9
    BPL $EC02                  ; $EBFC
    CMP #$63                   ; $EBFE
    BNE $EC05                  ; $EC00
    JSR $CBF1                  ; $EC02
    .byte $4C,$86,$EB
    LDA $0516                  ; $EC08
    AND #$81                   ; $EC0B
    BNE $EC10                  ; $EC0D
    RTS                        ; $EC0F
    BIT $0516                  ; $EC10
    BPL $EC34                  ; $EC13
    LDA #$01                   ; $EC15
    STA $0516                  ; $EC17
    PHA                        ; $EC1A
    LDA $0022                  ; $EC1B
    LDA #$10                   ; $EC1D
    STA $0024                  ; $EC1F
    LDA #$11                   ; $EC21
    STA $0025                  ; $EC23
    JSR $CE2D                  ; $EC25
    PLA                        ; $EC28
    JSR $8000                  ; $EC29
    LDA #$00                   ; $EC2C
    STA $0522                  ; $EC2E
    STA $0539                  ; $EC31
    LDX $0519                  ; $EC34
    BEQ $EC3C                  ; $EC37
    JMP $ED5B                  ; $EC39
    LDA #$00                   ; $EC3C
    STA $0532                  ; $EC3E
    STA $0534                  ; $EC41
    STA $0536                  ; $EC44
    STA $0538                  ; $EC47
    STA $0539                  ; $EC4A
    LDA #$08                   ; $EC4D
    BIT $0516                  ; $EC4F
    BNE $EC75                  ; $EC52
    LDA $0516                  ; $EC54
    AND #$50                   ; $EC57
    CMP #$50                   ; $EC59
    BEQ $EC8C                  ; $EC5B
    BIT $0516                  ; $EC5D
    BVS $EC74                  ; $EC60
    PHA                        ; $EC62
    LDA $0022                  ; $EC63
    LDA #$10                   ; $EC65
    STA $0024                  ; $EC67
    LDA #$11                   ; $EC69
    STA $0025                  ; $EC6B
    JSR $CE2D                  ; $EC6D
    PLA                        ; $EC70
    JSR $8003                  ; $EC71
    RTS                        ; $EC74
    EOR $0516                  ; $EC75
    STA $0516                  ; $EC78
    LDA #$00                   ; $EC7B
    STA $05D2                  ; $EC7D
    LDA #$00                   ; $EC80
    STA $000D                  ; $EC82
    STA $000E                  ; $EC84
    LDA #$00                   ; $EC86
    STA $0516                  ; $EC88
    RTS                        ; $EC8B
    LDA $0516                  ; $EC8C
    AND #$8F                   ; $EC8F
    STA $0516                  ; $EC91
    LDA $0523                  ; $EC94
    STA $0519                  ; $EC97
    LDA $0524                  ; $EC9A
    CMP #$FF                   ; $EC9D
    BEQ $ECF7                  ; $EC9F
    LDA #$04                   ; $ECA1
    BIT $0516                  ; $ECA3
    BEQ $ECB7                  ; $ECA6
    EOR $0516                  ; $ECA8
    STA $0516                  ; $ECAB
    LDA #$00                   ; $ECAE
    STA $0011                  ; $ECB0
    STA $0012                  ; $ECB2
    JSR $CC46                  ; $ECB4
    LDA $0526                  ; $ECB7
    BPL $ECCA                  ; $ECBA
    AND #$7F                   ; $ECBC
    STA $0526                  ; $ECBE
    STA $0490                  ; $ECC1
    LDA $0527                  ; $ECC4
    STA $0491                  ; $ECC7
    LDA $0525                  ; $ECCA
    LDX #$00                   ; $ECCD
    JSR $CC02                  ; $ECCF
    JSR $CCD2                  ; $ECD2
    .byte $00,$6C,$04
    LDA $05CE                  ; $ECD8
    PHA                        ; $ECDB
    LDA $0022                  ; $ECDC
    LDA #$0B                   ; $ECDE
    STA $0024                  ; $ECE0
    LDA #$0C                   ; $ECE2
    STA $0025                  ; $ECE4
    JSR $CE2D                  ; $ECE6
    PLA                        ; $ECE9
    JSR $8006                  ; $ECEA
    LDA #$00                   ; $ECED
    STA $004A                  ; $ECEF
    LDA $05D1                  ; $ECF1
    STA $05D2                  ; $ECF4
    LDA $0528                  ; $ECF7
    CMP #$FF                   ; $ECFA
    BEQ $ED06                  ; $ECFC
    STA $053C                  ; $ECFE
    LDA #$80                   ; $ED01
    STA $053A                  ; $ED03
    LDA #$00                   ; $ED06
    STA $000D                  ; $ED08
    STA $000E                  ; $ED0A
    LDA $052A                  ; $ED0C
    STA $0517                  ; $ED0F
    LDA $0529                  ; $ED12
    CMP #$FF                   ; $ED15
    BEQ $ED2D                  ; $ED17
    STA $05EA                  ; $ED19
    LDX #$11                   ; $ED1C
    LDA #$C8                   ; $ED1E
    STA $0001,X                ; $ED20
    LDA #$18                   ; $ED22
    STA $0002,X                ; $ED24
    LDA #$7F                   ; $ED26
    LDY #$FF                   ; $ED28
    JSR $CAE7                  ; $ED2A
    LDA $052B                  ; $ED2D
    ORA #$80                   ; $ED30
    STA $0532                  ; $ED32
    LDA $052C                  ; $ED35
    ORA #$80                   ; $ED38
    STA $0536                  ; $ED3A
    LDA $052D                  ; $ED3D
    ORA #$80                   ; $ED40
    STA $0534                  ; $ED42
    LDA $0530                  ; $ED45
    STA $052E                  ; $ED48
    LDA $0531                  ; $ED4B
    STA $052F                  ; $ED4E
    LDA #$00                   ; $ED51
    STA $008E                  ; $ED53
    LDA #$01                   ; $ED55
    STA $0469                  ; $ED57
    RTS                        ; $ED5A
    .byte $CA
    STX $0519                  ; $ED5C
    CPX #$28                   ; $ED5F
    BCS $ED84                  ; $ED61
    LDA $0516                  ; $ED63
    AND #$20                   ; $ED66
    BNE $ED84                  ; $ED68
    LDA $0516                  ; $ED6A
    ORA #$20                   ; $ED6D
    STA $0516                  ; $ED6F
    PHA                        ; $ED72
    LDA $0022                  ; $ED73
    LDA #$10                   ; $ED75
    STA $0024                  ; $ED77
    LDA #$11                   ; $ED79
    STA $0025                  ; $ED7B
    JSR $CE2D                  ; $ED7D
    PLA                        ; $ED80
    JSR $8003                  ; $ED81
    RTS                        ; $ED84
    LDA $05D2                  ; $ED85
    BNE $ED8B                  ; $ED88
    RTS                        ; $ED8A
    BPL $EDF5                  ; $ED8B
    AND #$7F                   ; $ED8D
    ORA #$01                   ; $ED8F
    STA $05D2                  ; $ED91
    LDA $05DB                  ; $ED94
    STA $05D3                  ; $ED97
    LDA $05DC                  ; $ED9A
    STA $05D4                  ; $ED9D
    LDA $05DD                  ; $EDA0
    STA $05D5                  ; $EDA3
    LDX $05DE                  ; $EDA6
    LDY $05DF                  ; $EDA9
    STX $05D6                  ; $EDAC
    STY $05D7                  ; $EDAF
    LDA $05E0                  ; $EDB2
    STA $05D8                  ; $EDB5
    LDA $05E1                  ; $EDB8
    STA $05D9                  ; $EDBB
    LDA $05E2                  ; $EDBE
    STA $05DA                  ; $EDC1
    LDA $05D2                  ; $EDC4
    AND #$02                   ; $EDC7
    BEQ $EDF5                  ; $EDC9
    BIT $05D2                  ; $EDCB
    BVC $EDE4                  ; $EDCE
    LDX #$0D                   ; $EDD0
    LDA #$A0                   ; $EDD2
    STA $0001,X                ; $EDD4
    LDA #$0B                   ; $EDD6
    STA $0002,X                ; $EDD8
    LDA #$7F                   ; $EDDA
    LDY #$FF                   ; $EDDC
    JSR $CAE7                  ; $EDDE
    JMP $EDF5                  ; $EDE1
    LDX #$0D                   ; $EDE4
    LDA #$A0                   ; $EDE6
    STA $0001,X                ; $EDE8
    LDA #$0B                   ; $EDEA
    STA $0002,X                ; $EDEC
    LDA #$80                   ; $EDEE
    LDY #$02                   ; $EDF0
    JSR $CAE7                  ; $EDF2
    .byte $2C,$D2,$05
    BVC $EE31                  ; $EDF8
    CLC                        ; $EDFA
    LDA $05D6                  ; $EDFB
    ADC $05D3                  ; $EDFE
    STA $05D3                  ; $EE01
    LDX #$00                   ; $EE04
    LDA $05D7                  ; $EE06
    ADC $004B                  ; $EE09
    STA $004B                  ; $EE0B
    CMP #$F0                   ; $EE0D
    BCC $EE20                  ; $EE0F
    INX                        ; $EE11
    LDA #$10                   ; $EE12
    BIT $05D7                  ; $EE14
    BPL $EE1D                  ; $EE17
    LDA #$F0                   ; $EE19
    DEX                        ; $EE1B
    DEX                        ; $EE1C
    CLC                        ; $EE1D
    ADC $004B                  ; $EE1E
    STA $004B                  ; $EE20
    STA $05D4                  ; $EE22
    CLC                        ; $EE25
    TXA                        ; $EE26
    ADC $05D5                  ; $EE27
    STA $05D5                  ; $EE2A
    JSR $EE6D                  ; $EE2D
    RTS                        ; $EE30
    LDA $0020                  ; $EE31
    AND #$FE                   ; $EE33
    STA $0020                  ; $EE35
    CLC                        ; $EE37
    LDA $05D6                  ; $EE38
    ADC $05D3                  ; $EE3B
    STA $05D3                  ; $EE3E
    LDA $05D7                  ; $EE41
    ADC $05D4                  ; $EE44
    STA $05D4                  ; $EE47
    STA $004A                  ; $EE4A
    TAX                        ; $EE4C
    LDA #$00                   ; $EE4D
    BIT $05D7                  ; $EE4F
    BPL $EE56                  ; $EE52
    LDA #$FF                   ; $EE54
    PHP                        ; $EE56
    TAX                        ; $EE57
    ADC $05D5                  ; $EE58
    STA $05D5                  ; $EE5B
    AND #$01                   ; $EE5E
    ORA $0020                  ; $EE60
    STA $0020                  ; $EE62
    TXA                        ; $EE64
    PLP                        ; $EE65
    ADC #$00                   ; $EE66
    TAX                        ; $EE68
    JSR $EE6D                  ; $EE69
    RTS                        ; $EE6C
    LDA $05D2                  ; $EE6D
    AND #$02                   ; $EE70
    BEQ $EE9E                  ; $EE72
    LDX $05D4                  ; $EE74
    LDY $05D5                  ; $EE77
    BPL $EE88                  ; $EE7A
    TXA                        ; $EE7C
    EOR #$FF                   ; $EE7D
    TAX                        ; $EE7F
    TYA                        ; $EE80
    EOR #$FF                   ; $EE81
    TAY                        ; $EE83
    INX                        ; $EE84
    BNE $EE88                  ; $EE85
    INY                        ; $EE87
    TXA                        ; $EE88
    SEC                        ; $EE89
    SBC $05D9                  ; $EE8A
    TYA                        ; $EE8D
    SBC $05DA                  ; $EE8E
    BCC $EE9E                  ; $EE91
    LDA #$00                   ; $EE93
    STA $05D2                  ; $EE95
    LDA #$00                   ; $EE98
    STA $000D                  ; $EE9A
    STA $000E                  ; $EE9C
    RTS                        ; $EE9E
    PHA                        ; $EE9F
    LDA $0022                  ; $EEA0
    LDA #$14                   ; $EEA2
    STA $0024                  ; $EEA4
    LDA #$15                   ; $EEA6
    STA $0025                  ; $EEA8
    JSR $CE2D                  ; $EEAA
    PLA                        ; $EEAD
    JSR $8000                  ; $EEAE
    LDA #$00                   ; $EEB1
    STA $003A                  ; $EEB3
    STA $0048                  ; $EEB5
    LDX $053D                  ; $EEB7
    BEQ $EEDA                  ; $EEBA
    .byte $A9,$40,$38,$ED,$3F,$05,$CD,$3E,$05,$AD,$3E,$05,$B0,$02,$A9,$00
    .byte $AA,$18,$69,$08,$8D,$3E,$05,$8A,$18,$6D,$3F,$05,$0A,$0A
    STA $003B                  ; $EEDA
    LDA $003A                  ; $EEDC
    LSR                        ; $EEDE
    TAX                        ; $EEDF
    LDA $0543,X                ; $EEE0
    BCS $EEE9                  ; $EEE3
    LSR                        ; $EEE5
    LSR                        ; $EEE6
    LSR                        ; $EEE7
    LSR                        ; $EEE8
    AND #$0F                   ; $EEE9
    ASL                        ; $EEEB
    TAX                        ; $EEEC
    LDA $EF73,X                ; $EEED
    STA $003C                  ; $EEF0
    LDA $EF74,X                ; $EEF2
    STA $003D                  ; $EEF5
    LDY #$00                   ; $EEF7
    LDA ($003C),Y              ; $EEF9
    BPL $EF38                  ; $EEFB
    BIT $0615                  ; $EEFD
    BVS $EF14                  ; $EF00
    PHA                        ; $EF02
    LDA $0022                  ; $EF03
    LDA #$14                   ; $EF05
    STA $0024                  ; $EF07
    LDA #$15                   ; $EF09
    STA $0025                  ; $EF0B
    JSR $CE2D                  ; $EF0D
    PLA                        ; $EF10
    JSR $8006                  ; $EF11
    PHA                        ; $EF14
    LDA $0022                  ; $EF15
    LDA #$14                   ; $EF17
    STA $0024                  ; $EF19
    LDA #$15                   ; $EF1B
    STA $0025                  ; $EF1D
    JSR $CE2D                  ; $EF1F
    PLA                        ; $EF22
    JSR $8003                  ; $EF23
    PHA                        ; $EF26
    LDA $0022                  ; $EF27
    LDA #$16                   ; $EF29
    STA $0024                  ; $EF2B
    LDA #$17                   ; $EF2D
    STA $0025                  ; $EF2F
    JSR $CE2D                  ; $EF31
    PLA                        ; $EF34
    JSR $8000                  ; $EF35
    INC $003A                  ; $EF38
    LDA $003A                  ; $EF3A
    CMP #$06                   ; $EF3C
    BNE $EEDC                  ; $EF3E
    BIT $062D                  ; $EF40
    BPL $EF57                  ; $EF43
    PHA                        ; $EF45
    LDA $0022                  ; $EF46
    LDA #$14                   ; $EF48
    STA $0024                  ; $EF4A
    LDA #$15                   ; $EF4C
    STA $0025                  ; $EF4E
    JSR $CE2D                  ; $EF50
    PLA                        ; $EF53
    JSR $8009                  ; $EF54
    LDA #$40                   ; $EF57
    SEC                        ; $EF59
    SBC $0048                  ; $EF5A
    STA $053F                  ; $EF5C
    BCC $EF72                  ; $EF5F
    BEQ $EF72                  ; $EF61
    TAY                        ; $EF63
    LDX $003B                  ; $EF64
    LDA #$F8                   ; $EF66
    STA $0200,X                ; $EF68
    INX                        ; $EF6B
    INX                        ; $EF6C
    INX                        ; $EF6D
    INX                        ; $EF6E
    DEY                        ; $EF6F
    BNE $EF68                  ; $EF70
    RTS                        ; $EF72
    .byte $47,$05,$5C,$05,$71,$05,$86,$05,$9B,$05,$B0,$05,$A8
    LDA $0024                  ; $EF80
    PHA                        ; $EF82
    LDA $0025                  ; $EF83
    PHA                        ; $EF85
    TYA                        ; $EF86
    PHA                        ; $EF87
    LDA $0022                  ; $EF88
    LDA #$18                   ; $EF8A
    STA $0024                  ; $EF8C
    LDA #$19                   ; $EF8E
    STA $0025                  ; $EF90
    JSR $CE2D                  ; $EF92
    PLA                        ; $EF95
    JSR $800C                  ; $EF96
    PLA                        ; $EF99
    STA $0025                  ; $EF9A
    PLA                        ; $EF9C
    STA $0024                  ; $EF9D
    JMP $CE2D                  ; $EF9F
    LDA $0621                  ; $EFA2
    CMP #$04                   ; $EFA5
    BCC $EFAA                  ; $EFA7
    RTS                        ; $EFA9
    LDA $0600                  ; $EFAA
    BNE $EFB2                  ; $EFAD
    JMP $EFF6                  ; $EFAF
    LDA #$00                   ; $EFB2
    PHA                        ; $EFB4
    LDA #$01                   ; $EFB5
    JSR $CB0F                  ; $EFB7
    LDA $0515                  ; $EFBA
    BNE $EFB5                  ; $EFBD
    LDA #$01                   ; $EFBF
    STA $0515                  ; $EFC1
    PLA                        ; $EFC4
    PHA                        ; $EFC5
    LDX $0621                  ; $EFC6
    CPX #$03                   ; $EFC9
    BNE $EFCF                  ; $EFCB
    LDA #$05                   ; $EFCD
    ASL                        ; $EFCF
    TAX                        ; $EFD0
    LDA $F206,X                ; $EFD1
    STA $003A                  ; $EFD4
    LDA $F207,X                ; $EFD6
    STA $003B                  ; $EFD9
    LDA #$00                   ; $EFDB
    STA $003C                  ; $EFDD
    LDA #$21                   ; $EFDF
    STA $003D                  ; $EFE1
    LDX #$00                   ; $EFE3
    JSR $F114                  ; $EFE5
    LDA #$04                   ; $EFE8
    JSR $CB0F                  ; $EFEA
    PLA                        ; $EFED
    CLC                        ; $EFEE
    ADC #$01                   ; $EFEF
    CMP $0600                  ; $EFF1
    BNE $EFB4                  ; $EFF4
    .byte $AE,$21,$06
    LDA $F00F,X                ; $EFF9
    STA $063D                  ; $EFFC
    TXA                        ; $EFFF
    BNE $F013                  ; $F000
    LDA $0600                  ; $F002
    BNE $F013                  ; $F005
    LDA #$02                   ; $F007
    STA $063D                  ; $F009
    JMP $F013                  ; $F00C
    .byte $00,$00,$01,$00,$A9,$00,$48
    LDA #$01                   ; $F016
    JSR $CB0F                  ; $F018
    LDA $0515                  ; $F01B
    BNE $F016                  ; $F01E
    LDA #$01                   ; $F020
    STA $0515                  ; $F022
    LDA $063D                  ; $F025
    ASL                        ; $F028
    ASL                        ; $F029
    TAY                        ; $F02A
    LDA $F15A,Y                ; $F02B
    STA $003C                  ; $F02E
    LDA $F15B,Y                ; $F030
    STA $003D                  ; $F033
    PLA                        ; $F035
    PHA                        ; $F036
    TAX                        ; $F037
    CLC                        ; $F038
    LDA $F15C,Y                ; $F039
    ADC $F10E,X                ; $F03C
    STA $04A6                  ; $F03F
    LDA $063D                  ; $F042
    CMP #$03                   ; $F045
    BEQ $F061                  ; $F047
    LDA $05CE                  ; $F049
    AND #$20                   ; $F04C
    ORA $04A6                  ; $F04E
    STA $04A6                  ; $F051
    LDA $05CE                  ; $F054
    LSR                        ; $F057
    LSR                        ; $F058
    LSR                        ; $F059
    LSR                        ; $F05A
    ORA $F15D,Y                ; $F05B
    JMP $F064                  ; $F05E
    LDA $F15D,Y                ; $F061
    .byte $8D,$A7,$04
    LDA #$01                   ; $F067
    STA $04A5                  ; $F069
    LDA $063D                  ; $F06C
    ASL                        ; $F06F
    STA $003B                  ; $F070
    ASL                        ; $F072
    ADC $003B                  ; $F073
    STA $003B                  ; $F075
    TXA                        ; $F077
    ADC $003B                  ; $F078
    TAX                        ; $F07A
    LDA $F16A,X                ; $F07B
    STA $04A8                  ; $F07E
    PLA                        ; $F081
    PHA                        ; $F082
    ASL                        ; $F083
    TAX                        ; $F084
    LDA $F182,X                ; $F085
    STA $003A                  ; $F088
    LDA $F183,X                ; $F08A
    STA $003B                  ; $F08D
    LDX #$04                   ; $F08F
    JSR $F114                  ; $F091
    PLA                        ; $F094
    CLC                        ; $F095
    ADC #$01                   ; $F096
    CMP #$06                   ; $F098
    BEQ $F09F                  ; $F09A
    JMP $F015                  ; $F09C
    LDA $063D                  ; $F09F
    CMP #$03                   ; $F0A2
    BEQ $F10D                  ; $F0A4
    LDA #$01                   ; $F0A6
    JSR $CB0F                  ; $F0A8
    LDA $0515                  ; $F0AB
    BNE $F0A6                  ; $F0AE
    LDA #$01                   ; $F0B0
    STA $0515                  ; $F0B2
    LDA #$01                   ; $F0B5
    STA $04A5                  ; $F0B7
    LDA #$A2                   ; $F0BA
    STA $04A8                  ; $F0BC
    LDA #$00                   ; $F0BF
    STA $003B                  ; $F0C1
    STA $04A9                  ; $F0C3
    LDA $063D                  ; $F0C6
    ASL                        ; $F0C9
    ASL                        ; $F0CA
    TAX                        ; $F0CB
    LDA $0637                  ; $F0CC
    SEC                        ; $F0CF
    SBC #$50                   ; $F0D0
    AND #$F0                   ; $F0D2
    ASL                        ; $F0D4
    STA $003A                  ; $F0D5
    ROL $003B                  ; $F0D7
    LDA $0635                  ; $F0D9
    SEC                        ; $F0DC
    SBC #$30                   ; $F0DD
    LSR                        ; $F0DF
    LSR                        ; $F0E0
    LSR                        ; $F0E1
    LSR                        ; $F0E2
    CLC                        ; $F0E3
    ADC $003A                  ; $F0E4
    STA $003A                  ; $F0E6
    BCC $F0EC                  ; $F0E8
    .byte $E6,$3B
    CLC                        ; $F0EC
    ADC $F15A,X                ; $F0ED
    STA $04A6                  ; $F0F0
    LDA $F15B,X                ; $F0F3
    ADC $003B                  ; $F0F6
    STA $04A7                  ; $F0F8
    LDA $05CE                  ; $F0FB
    LSR                        ; $F0FE
    LSR                        ; $F0FF
    LSR                        ; $F100
    LSR                        ; $F101
    ORA $04A7                  ; $F102
    STA $04A7                  ; $F105
    LDA #$80                   ; $F108
    STA $0515                  ; $F10A
    RTS                        ; $F10D
    .byte $00,$01,$02,$08,$09,$0A
    LDY #$00                   ; $F114
    LDA ($003A),Y              ; $F116
    STA $04A5,X                ; $F118
    BEQ $F154                  ; $F11B
    STA $003E                  ; $F11D
    INY                        ; $F11F
    LDA ($003A),Y              ; $F120
    CLC                        ; $F122
    ADC $003C                  ; $F123
    STA $04A6,X                ; $F125
    PHP                        ; $F128
    INY                        ; $F129
    LDA $003D                  ; $F12A
    CMP #$22                   ; $F12C
    BCC $F134                  ; $F12E
    LDA #$00                   ; $F130
    BEQ $F13B                  ; $F132
    LDA $05CE                  ; $F134
    LSR                        ; $F137
    LSR                        ; $F138
    LSR                        ; $F139
    LSR                        ; $F13A
    ORA ($003A),Y              ; $F13B
    PLP                        ; $F13D
    ADC $003D                  ; $F13E
    STA $04A7,X                ; $F140
    INY                        ; $F143
    INX                        ; $F144
    INX                        ; $F145
    INX                        ; $F146
    LDA ($003A),Y              ; $F147
    STA $04A5,X                ; $F149
    INY                        ; $F14C
    INX                        ; $F14D
    DEC $003E                  ; $F14E
    BNE $F147                  ; $F150
    BEQ $F116                  ; $F152
    LDA #$80                   ; $F154
    STA $0515                  ; $F156
    RTS                        ; $F159
; --- gap $F187-$F186 ---
    STY $0030                  ; $F311
    LDY #$F3                   ; $F313
    STY $0031                  ; $F315
    ASL                        ; $F317
    BCC $F31C                  ; $F318
    INC $0031                  ; $F31A
    TAY                        ; $F31C
    LDA ($0030),Y              ; $F31D
    PHA                        ; $F31F
    INY                        ; $F320
    LDA ($0030),Y              ; $F321
    STA $0031                  ; $F323
    PLA                        ; $F325
    STA $0030                  ; $F326
    RTS                        ; $F328
