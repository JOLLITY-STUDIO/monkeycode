; ============================================================
; code_main.s - bank00 main routines ($8000-$8AB2)
; Main game loop, input handling, menu logic
; ============================================================

    .byte $A5,$27
    ASL                        ; $8002
    TAX                        ; $8003
    LDA $800E,X                ; $8004
    PHA                        ; $8007
    LDA $800D,X                ; $8008
    PHA                        ; $800B
    RTS                        ; $800C
    .byte $65,$81,$8A,$81,$AD,$81,$B4,$81,$DA,$81,$A2,$02
    JSR $C4B9                  ; $8019
    JMP $A203                  ; $801C
    JSR $9BA0                  ; $801F
    LDA #$00                   ; $8022
    JSR $8464                  ; $8024
    LDA #$01                   ; $8027
    JSR $9FA8                  ; $8029
    LDA $001E                  ; $802C
    AND #$10                   ; $802E
    BEQ $8027                  ; $8030
    LDA #$00                   ; $8032
    STA $0005                  ; $8034
    STA $0006                  ; $8036
    STA $0009                  ; $8038
    STA $000A                  ; $803A
    STA $0011                  ; $803C
    STA $0012                  ; $803E
    STA $000D                  ; $8040
    STA $000E                  ; $8042
    STA $004C                  ; $8044
    STA $005B                  ; $8046
    LDA #$01                   ; $8048
    STA $0700                  ; $804A
    LDA $001B                  ; $804D
    AND #$01                   ; $804F
    BNE $807A                  ; $8051
    JSR $9B11                  ; $8053
    LDA #$02                   ; $8056
    JSR $9FA8                  ; $8058
    JSR $9B7F                  ; $805B
    JSR $98A0                  ; $805E
    LDA #$0D                   ; $8061
    JSR $8297                  ; $8063
    LDA #$00                   ; $8066
    STA $007B                  ; $8068
    LDA #$17                   ; $806A
    JSR $8AF7                  ; $806C
    LDA #$30                   ; $806F
    JSR $890C                  ; $8071
    JSR $88FB                  ; $8074
    JSR $9A35                  ; $8077
    LDA #$00                   ; $807A
    JSR $8920                  ; $807C
    LDA #$00                   ; $807F
    STA $0090                  ; $8081
    LDA #$02                   ; $8083
    STA $0091                  ; $8085
    LDA $001B                  ; $8087
    AND #$FE                   ; $8089
    STA $001B                  ; $808B
    LDA #$0A                   ; $808D
    STA $00ED                  ; $808F
    .byte $A5,$ED
    STA $00E6                  ; $8093
    LDA #$22                   ; $8095
    STA $00E7                  ; $8097
    LDY #$01                   ; $8099
    LDX #$01                   ; $809B
    LDA #$7F                   ; $809D
    JSR $98EA                  ; $809F
    LDA #$01                   ; $80A2
    JSR $9FA8                  ; $80A4
    LDA $001E                  ; $80A7
    AND #$3C                   ; $80A9
    BEQ $80A2                  ; $80AB
    ASL                        ; $80AD
    ASL                        ; $80AE
    BMI $80BC                  ; $80AF
    ASL                        ; $80B1
    BMI $80D4                  ; $80B2
    ASL                        ; $80B4
    AND #$40                   ; $80B5
    ORA #$0A                   ; $80B7
    JMP $80C0                  ; $80B9
    LDA $00ED                  ; $80BC
    EOR #$40                   ; $80BE
    .byte $85,$ED
    LDA #$0A                   ; $80C2
    STA $00E6                  ; $80C4
    LDA #$22                   ; $80C6
    STA $00E7                  ; $80C8
    LDY #$03                   ; $80CA
    LDX #$01                   ; $80CC
    JSR $98E8                  ; $80CE
    JMP $8091                  ; $80D1
    LDA $001C                  ; $80D4
    AND #$C0                   ; $80D6
    CMP #$C0                   ; $80D8
    BNE $80DF                  ; $80DA
    .byte $4C,$09,$A2
    BIT $00ED                  ; $80DF
    BVC $80E6                  ; $80E1
    JMP $826A                  ; $80E3
    JSR $9BA0                  ; $80E6
    LDA #$01                   ; $80E9
    JSR $8464                  ; $80EB
    JSR $82B5                  ; $80EE
    LDA #$C0                   ; $80F1
    STA $00E0                  ; $80F3
    LDX #$02                   ; $80F5
    JSR $C4B9                  ; $80F7
    JSR $A20F                  ; $80FA
    .byte $A9,$00
    STA $0028                  ; $80FF
    STA $0029                  ; $8101
    STA $0027                  ; $8103
    LDA #$01                   ; $8105
    STA $0700                  ; $8107
    LDX #$02                   ; $810A
    JSR $C4B9                  ; $810C
    JSR $A20C                  ; $810F
    LDA #$00                   ; $8112
    JSR $8920                  ; $8114
    LDX #$01                   ; $8117
    JSR $C4B9                  ; $8119
    JSR $A006                  ; $811C
    JSR $C572                  ; $811F
    LDX #$55                   ; $8122
    LDA $0026                  ; $8124
    CMP #$20                   ; $8126
    BCC $812C                  ; $8128
    LDX #$4C                   ; $812A
    STX $0700                  ; $812C
    LDA #$00                   ; $812F
    STA $0450                  ; $8131
    STA $0451                  ; $8134
    STA $0452                  ; $8137
    STA $0453                  ; $813A
    LDX #$01                   ; $813D
    JSR $C4B9                  ; $813F
    JSR $A009                  ; $8142
    BIT $00E0                  ; $8145
    BMI $814F                  ; $8147
    LDA $00E4                  ; $8149
    CMP $0026                  ; $814B
    BCS $8163                  ; $814D
    LDX a: $0026               ; $814F
    LDA $83DC,X                ; $8152
    BEQ $8163                  ; $8155
    JSR $8464                  ; $8157
    JSR $82B5                  ; $815A
    LDA $00E0                  ; $815D
    AND #$7F                   ; $815F
    STA $00E0                  ; $8161
    JMP $8017                  ; $8163
    LDA #$01                   ; $8166
    STA $0027                  ; $8168
    JSR $C56C                  ; $816A
    JSR $8285                  ; $816D
    LDA $0026                  ; $8170
    CMP $00E4                  ; $8172
    BEQ $8188                  ; $8174
    BCC $8188                  ; $8176
    STA $00E4                  ; $8178
    LDX a: $0026               ; $817A
    LDA $83FE,X                ; $817D
    BEQ $8188                  ; $8180
    JSR $8464                  ; $8182
    JSR $82B5                  ; $8185
    JMP $8017                  ; $8188
    LDA $0028                  ; $818B
    CMP $0029                  ; $818D
    BEQ $8196                  ; $818F
    BCS $8206                  ; $8191
    JMP $81E6                  ; $8193
    LDX $0026                  ; $8196
    LDA $83BA,X                ; $8198
    BEQ $81E6                  ; $819B
    CMP #$01                   ; $819D
    BEQ $81D4                  ; $819F
    LDA #$02                   ; $81A1
    STA $0027                  ; $81A3
    JSR $C56C                  ; $81A5
    JSR $8285                  ; $81A8
    JMP $8017                  ; $81AB
    LDA #$03                   ; $81AE
    STA $0027                  ; $81B0
    JMP $8017                  ; $81B2
    LDA $0028                  ; $81B5
    CMP $0029                  ; $81B7
    BEQ $81C0                  ; $81B9
    BCS $8206                  ; $81BB
    JMP $81E6                  ; $81BD
    LDX $0026                  ; $81C0
    LDA $83BA,X                ; $81C2
    CMP #$03                   ; $81C5
    BEQ $81D4                  ; $81C7
    .byte $A5,$26,$C9,$20,$D0,$02,$E6,$26,$4C,$FD,$80
    LDA #$04                   ; $81D4
    STA $0027                  ; $81D6
    JMP $8017                  ; $81D8
    LDA $0028                  ; $81DB
    CMP $0029                  ; $81DD
    BEQ $81E6                  ; $81DF
    BCS $8206                  ; $81E1
    JMP $81E6                  ; $81E3
    .byte $A2,$01
    JSR $C4B9                  ; $81E8
    JSR $A015                  ; $81EB
    LDA #$60                   ; $81EE
    JSR $8464                  ; $81F0
    JSR $82B5                  ; $81F3
    JSR $99F0                  ; $81F6
    LDX $0026                  ; $81F9
    LDA $8398,X                ; $81FB
    STA $0026                  ; $81FE
    JSR $C578                  ; $8200
    JMP $80FD                  ; $8203
    LDX #$01                   ; $8206
    JSR $C4B9                  ; $8208
    JSR $A012                  ; $820B
    BIT $00E0                  ; $820E
    BVS $821C                  ; $8210
    LDA $0026                  ; $8212
    CMP $00E5                  ; $8214
    BEQ $822F                  ; $8216
    BCC $822F                  ; $8218
    STA $00E5                  ; $821A
    LDX $0026                  ; $821C
    LDA $8420,X                ; $821E
    BEQ $822F                  ; $8221
    JSR $8464                  ; $8223
    JSR $82B5                  ; $8226
    LDA $00E0                  ; $8229
    AND #$BF                   ; $822B
    STA $00E0                  ; $822D
    LDX a: $0026               ; $822F
    LDA $8442,X                ; $8232
    BEQ $8243                  ; $8235
    JSR $8464                  ; $8237
    JSR $82A9                  ; $823A
    LDA $0026                  ; $823D
    CMP #$20                   ; $823F
    BCS $8263                  ; $8241
    LDA #$01                   ; $8243
    STA $0700                  ; $8245
    JSR $C578                  ; $8248
    INC $0026                  ; $824B
    LDX #$01                   ; $824D
    JSR $C4B9                  ; $824F
    JSR $A018                  ; $8252
    LDA $0026                  ; $8255
    CMP #$03                   ; $8257
    BCC $8260                  ; $8259
    LDX #$05                   ; $825B
    STX $0446                  ; $825D
    JMP $80FD                  ; $8260
    LDA #$05                   ; $8263
    STA $0027                  ; $8265
    JMP $C57B                  ; $8267
    .byte $A2,$01
    JSR $C4B9                  ; $826C
    JSR $A003                  ; $826F
    LDX #$02                   ; $8272
    JSR $C4B9                  ; $8274
    JSR $A20F                  ; $8277
    LDX #$01                   ; $827A
    JSR $C4B9                  ; $827C
    JSR $A01B                  ; $827F
    JMP $80FD                  ; $8282
    LDA #$01                   ; $8285
    STA $0700                  ; $8287
    LDA #$01                   ; $828A
    JSR $9FA8                  ; $828C
    LDX #$01                   ; $828F
    JSR $C4B9                  ; $8291
    JMP $A00C                  ; $8294
    STA $00E7                  ; $8297
    LDA #$01                   ; $8299
    STA $00E6                  ; $829B
    LDA #$E5                   ; $829D
    STA $004D                  ; $829F
    LDA #$00                   ; $82A1
    STA $004E                  ; $82A3
    JSR $9085                  ; $82A5
    RTS                        ; $82A8
    LDA #$01                   ; $82A9
    JSR $9FA8                  ; $82AB
    LDA $004D                  ; $82AE
    ORA $004E                  ; $82B0
    BNE $82A9                  ; $82B2
    RTS                        ; $82B4
    LDA #$01                   ; $82B5
    JSR $9FA8                  ; $82B7
    LDA $004D                  ; $82BA
    ORA $004E                  ; $82BC
    BEQ $82C6                  ; $82BE
    LDA $001E                  ; $82C0
    AND #$20                   ; $82C2
    BEQ $82B5                  ; $82C4
    LDA #$00                   ; $82C6
    STA $0005                  ; $82C8
    STA $0006                  ; $82CA
    STA $0009                  ; $82CC
    STA $000A                  ; $82CE
    STA $0011                  ; $82D0
    STA $0012                  ; $82D2
    STA $000D                  ; $82D4
    STA $000E                  ; $82D6
    STA $004C                  ; $82D8
    LDA #$01                   ; $82DA
    STA $0700                  ; $82DC
    JSR $9BA0                  ; $82DF
    LDA #$00                   ; $82E2
    STA $0044                  ; $82E4
    STA $0045                  ; $82E6
    STA $007A                  ; $82E8
    STA $007B                  ; $82EA
    RTS                        ; $82EC
    .byte $20,$8A,$83
    LDA $004C                  ; $82F0
    BPL $82ED                  ; $82F2
    ASL                        ; $82F4
    TAX                        ; $82F5
    LDA $B800,X                ; $82F6
    STA $00EC                  ; $82F9
    LDA $B801,X                ; $82FB
    STA $00ED                  ; $82FE
    LDY #$00                   ; $8300
    LDA ($00EC),Y              ; $8302
    BMI $8355                  ; $8304
    STA $00E9                  ; $8306
    LDA #$01                   ; $8308
    STA $00EB                  ; $830A
    .byte $A4,$EB
    LDA ($00EC),Y              ; $830E
    CMP #$FE                   ; $8310
    BEQ $8308                  ; $8312
    CMP #$FF                   ; $8314
    BEQ $8383                  ; $8316
    STA $00EA                  ; $8318
    LDX $00E9                  ; $831A
    LDA #$03                   ; $831C
    STA $00EB                  ; $831E
    INY                        ; $8320
    INX                        ; $8321
    LDA ($00EC),Y              ; $8322
    BEQ $8329                  ; $8324
    STA $062A,X                ; $8326
    DEC $00EB                  ; $8329
    BNE $8320                  ; $832B
    INY                        ; $832D
    STY $00EB                  ; $832E
    LDA #$20                   ; $8330
    CLC                        ; $8332
    ADC $0628                  ; $8333
    CMP #$3D                   ; $8336
    BCC $8344                  ; $8338
    JSR $838A                  ; $833A
    LDA $004C                  ; $833D
    BMI $8330                  ; $833F
    JMP $8383                  ; $8341
    JSR $9A43                  ; $8344
    JSR $838A                  ; $8347
    LDA $004C                  ; $834A
    BPL $8383                  ; $834C
    DEC $00EA                  ; $834E
    BNE $8347                  ; $8350
    JMP $830C                  ; $8352
    AND #$01                   ; $8355
    STA $00E9                  ; $8357
    LDA #$01                   ; $8359
    STA $00EB                  ; $835B
    .byte $A4,$EB
    LDA ($00EC),Y              ; $835F
    CMP #$FE                   ; $8361
    BEQ $8359                  ; $8363
    CMP #$FF                   ; $8365
    BEQ $8383                  ; $8367
    LDX $00E9                  ; $8369
    STA $008E,X                ; $836B
    INY                        ; $836D
    LDA ($00EC),Y              ; $836E
    STA $00EA                  ; $8370
    INY                        ; $8372
    STY $00EB                  ; $8373
    JSR $838A                  ; $8375
    LDA $004C                  ; $8378
    BPL $8383                  ; $837A
    DEC $00EA                  ; $837C
    BNE $8375                  ; $837E
    JMP $835D                  ; $8380
    .byte $A9,$00
    STA $004C                  ; $8385
    JMP $82ED                  ; $8387
    LDX #$02                   ; $838A
    JSR $C4B9                  ; $838C
    JSR $A215                  ; $838F
    LDX #$06                   ; $8392
    JSR $C4B9                  ; $8394
    RTS                        ; $8397
    .byte $00,$00,$02,$02,$04,$04,$06,$06,$08,$08,$0A,$0A,$0C,$0C,$0E,$0E
    .byte $10,$10,$12,$12,$14,$14,$16,$17,$17,$19,$19,$1B,$1B,$1D,$1D,$1F
    .byte $1F,$1F,$03,$03,$03,$03,$03,$03,$01,$01,$01,$01,$01,$03,$03,$03
    .byte $03,$03,$03,$03,$03,$03,$03,$03,$00,$03,$03,$03,$03,$03,$03,$03
    .byte $03,$03
    .byte $02,$03,$02,$00,$00,$00,$00,$07,$00,$00,$00,$00,$0C,$0E,$00,$00
    .byte $10,$12,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$18,$00,$00,$00
    .byte $00,$1E,$20,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$0A,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$21,$00,$03,$04,$05,$00,$06,$00,$00,$00,$00,$0B
    .byte $0D,$00,$00,$00,$11,$00,$00,$14,$00,$00,$00,$00,$16,$00,$17,$00
    .byte $00,$1A,$1B,$1C,$1D,$1F,$00,$00,$00,$00,$00,$00,$00,$08,$00,$00
    .byte $00,$00,$00,$0F,$00,$00,$00,$13,$00,$00,$00,$00,$00,$15,$00,$00
    .byte $00,$00,$19,$00,$00,$00,$00,$00,$22,$22
    LDY #$00                   ; $8464
    INY                        ; $8466
    INY                        ; $8467
    CMP $8AEE,Y                ; $8468
    BCS $8466                  ; $846B
    SEC                        ; $846D
    SBC $8AEC,Y                ; $846E
    LDX $8AED,Y                ; $8471
    ASL                        ; $8474
    ADC #$00                   ; $8475
    STA $004D                  ; $8477
    LDA #$00                   ; $8479
    ADC #$A0                   ; $847B
    STA $004E                  ; $847D
    STX $0056                  ; $847F
    LDA $0025                  ; $8481
    STA $00ED                  ; $8483
    JSR $C4B9                  ; $8485
    LDY #$00                   ; $8488
    LDA ($004D),Y              ; $848A
    TAX                        ; $848C
    INY                        ; $848D
    LDA ($004D),Y              ; $848E
    STA $004E                  ; $8490
    STX $004D                  ; $8492
    LDX #$05                   ; $8494
    LDA #$C5                   ; $8496
    STA $0000,X                ; $8498
    LDA #$84                   ; $849A
    STA $0001,X                ; $849C
    LDY #$50                   ; $849E
    LDA #$00                   ; $84A0
    JSR $9F69                  ; $84A2
    LDA #$00                   ; $84A5
    STA $000D                  ; $84A7
    STA $000E                  ; $84A9
    LDA #$00                   ; $84AB
    STA $0652                  ; $84AD
    LDA #$E0                   ; $84B0
    STA $00E6                  ; $84B2
    LDA #$23                   ; $84B4
    STA $00E7                  ; $84B6
    LDY #$01                   ; $84B8
    LDX #$20                   ; $84BA
    LDA #$55                   ; $84BC
    JSR $98EA                  ; $84BE
    LDX $00ED                  ; $84C1
    JMP $C4B9                  ; $84C3
    LDX $0056                  ; $84C6
    JSR $C4B9                  ; $84C8
    LDA #$08                   ; $84CB
    STA $0055                  ; $84CD
    LDA #$49                   ; $84CF
    STA $004F                  ; $84D1
    LDA #$22                   ; $84D3
    STA $0050                  ; $84D5
    .byte $A5,$4F
    STA $0051                  ; $84D9
    AND #$1F                   ; $84DB
    STA $0054                  ; $84DD
    LDA $0050                  ; $84DF
    STA $0052                  ; $84E1
    .byte $A5,$51
    STA $0053                  ; $84E5
    .byte $A0,$00
    LDA ($004D),Y              ; $84E9
    CMP #$D8                   ; $84EB
    BCS $8504                  ; $84ED
    LDX $0052                  ; $84EF
    LDY $0053                  ; $84F1
    JSR $88CA                  ; $84F3
    INC $0053                  ; $84F6
    LDA $0055                  ; $84F8
    BEQ $84FF                  ; $84FA
    JSR $895D                  ; $84FC
    LDA #$01                   ; $84FF
    JMP $8879                  ; $8501
    CMP #$E0                   ; $8504
    BCS $851C                  ; $8506
    SEC                        ; $8508
    SBC #$D8                   ; $8509
    TAX                        ; $850B
    LDA $8AE6,X                ; $850C
    PHA                        ; $850F
    JSR $899A                  ; $8510
    PLA                        ; $8513
    JSR $9FA8                  ; $8514
    LDA #$01                   ; $8517
    JMP $8879                  ; $8519
    CMP #$E8                   ; $851C
    BCS $8537                  ; $851E
    SEC                        ; $8520
    SBC #$E1                   ; $8521
    EOR #$FF                   ; $8523
    CLC                        ; $8525
    ADC $0053                  ; $8526
    STA $0053                  ; $8528
    AND #$1F                   ; $852A
    CMP $0054                  ; $852C
    BCS $8532                  ; $852E
    STA $0054                  ; $8530
    LDA #$01                   ; $8532
    JMP $8879                  ; $8534
    SEC                        ; $8537
    SBC #$E8                   ; $8538
    ASL                        ; $853A
    TAX                        ; $853B
    LDA $8546,X                ; $853C
    PHA                        ; $853F
    LDA $8545,X                ; $8540
    PHA                        ; $8543
    RTS                        ; $8544
    .byte $74,$85,$7F,$85,$8C,$85,$C3,$85,$D1,$85,$EB,$85,$03,$86,$17,$86
    .byte $2B,$86,$49,$86,$77,$86,$81,$86,$B7,$86,$B7,$87,$CA,$87,$D8,$87
    .byte $F7,$87,$13,$88,$1A,$88,$30,$88,$36,$88,$54,$88,$61,$88,$6F,$88
    INY                        ; $8575
    LDA ($004D),Y              ; $8576
    JSR $8920                  ; $8578
    LDA #$02                   ; $857B
    JMP $8879                  ; $857D
    LDA #$02                   ; $8580
    JSR $9FA8                  ; $8582
    JSR $997E                  ; $8585
    LDA #$01                   ; $8588
    JMP $8879                  ; $858A
    JSR $99F0                  ; $858D
    JSR $9B7F                  ; $8590
    LDA #$00                   ; $8593
    STA $00E6                  ; $8595
    LDA #$20                   ; $8597
    STA $00E7                  ; $8599
    LDY #$10                   ; $859B
    LDX #$20                   ; $859D
    JSR $98E8                  ; $859F
    LDA #$00                   ; $85A2
    STA $00E6                  ; $85A4
    LDA #$24                   ; $85A6
    STA $00E7                  ; $85A8
    LDY #$20                   ; $85AA
    LDX #$20                   ; $85AC
    JSR $98E8                  ; $85AE
    LDA #$00                   ; $85B1
    STA $004C                  ; $85B3
    STA $007B                  ; $85B5
    STA $004C                  ; $85B7
    LDA #$00                   ; $85B9
    STA $000D                  ; $85BB
    STA $000E                  ; $85BD
    LDA #$01                   ; $85BF
    JMP $8879                  ; $85C1
    JSR $899A                  ; $85C4
    JSR $89A3                  ; $85C7
    JSR $88B1                  ; $85CA
    LDA #$01                   ; $85CD
    JMP $8887                  ; $85CF
    LDY #$01                   ; $85D2
    LDA ($004D),Y              ; $85D4
    CMP #$FF                   ; $85D6
    BEQ $85E2                  ; $85D8
    JSR $89D2                  ; $85DA
    LDA #$02                   ; $85DD
    JMP $8879                  ; $85DF
    LDA #$00                   ; $85E2
    STA $0652                  ; $85E4
    LDA #$02                   ; $85E7
    JMP $8879                  ; $85E9
    LDX #$00                   ; $85EC
    LDA $0700,X                ; $85EE
    BEQ $85F8                  ; $85F1
    INX                        ; $85F3
    CPX #$05                   ; $85F4
    BNE $85EE                  ; $85F6
    LDY #$01                   ; $85F8
    LDA ($004D),Y              ; $85FA
    STA $0700,X                ; $85FC
    LDA #$02                   ; $85FF
    JMP $8879                  ; $8601
    LDA #$21                   ; $8604
    STA $00E6                  ; $8606
    LDA #$22                   ; $8608
    STA $00E7                  ; $860A
    LDY #$0B                   ; $860C
    LDX #$1E                   ; $860E
    JSR $98E8                  ; $8610
    LDA #$01                   ; $8613
    JMP $8879                  ; $8615
    LDA #$02                   ; $8618
    JSR $9FA8                  ; $861A
    LDA $0099                  ; $861D
    AND #$80                   ; $861F
    EOR #$80                   ; $8621
    ORA #$40                   ; $8623
    STA $0099                  ; $8625
    LDA #$01                   ; $8627
    JMP $8879                  ; $8629
    INY                        ; $862C
    LDA ($004D),Y              ; $862D
    STA $004F                  ; $862F
    STA $0051                  ; $8631
    INY                        ; $8633
    LDA ($004D),Y              ; $8634
    STA $0050                  ; $8636
    STA $0052                  ; $8638
    LDA $004D                  ; $863A
    CLC                        ; $863C
    ADC #$03                   ; $863D
    STA $004D                  ; $863F
    LDA $004E                  ; $8641
    ADC #$00                   ; $8643
    STA $004E                  ; $8645
    JMP $84E3                  ; $8647
    LDA #$21                   ; $864A
    STA $00E6                  ; $864C
    LDA #$22                   ; $864E
    STA $00E7                  ; $8650
    LDY #$0B                   ; $8652
    LDX #$1E                   ; $8654
    JSR $98E8                  ; $8656
    LDY #$01                   ; $8659
    LDA ($004D),Y              ; $865B
    ASL                        ; $865D
    TAY                        ; $865E
    LDX #$06                   ; $865F
    JSR $C4B9                  ; $8661
    LDX $BB41,Y                ; $8664
    LDA $BB40,Y                ; $8667
    TAY                        ; $866A
    JSR $97B6                  ; $866B
    LDX $0056                  ; $866E
    JSR $C4B9                  ; $8670
    LDA #$02                   ; $8673
    JMP $8879                  ; $8675
    INY                        ; $8678
    LDA ($004D),Y              ; $8679
    STA $0055                  ; $867B
    LDA #$02                   ; $867D
    JMP $8879                  ; $867F
    INY                        ; $8682
    LDA ($004D),Y              ; $8683
    BNE $868F                  ; $8685
    JSR $9A35                  ; $8687
    LDY #$02                   ; $868A
    JMP $86B4                  ; $868C
    CMP #$FF                   ; $868F
    BEQ $86A7                  ; $8691
    BMI $869D                  ; $8693
    JSR $9A4C                  ; $8695
    LDY #$02                   ; $8698
    JMP $86B4                  ; $869A
    AND #$7F                   ; $869D
    JSR $9A60                  ; $869F
    LDY #$02                   ; $86A2
    JMP $86B4                  ; $86A4
    LDY #$03                   ; $86A7
    LDA ($004D),Y              ; $86A9
    TAX                        ; $86AB
    DEY                        ; $86AC
    LDA ($004D),Y              ; $86AD
    JSR $9A31                  ; $86AF
    LDY #$04                   ; $86B2
    .byte $98
    JMP $8879                  ; $86B5
    INY                        ; $86B8
    LDA ($004D),Y              ; $86B9
    ASL                        ; $86BB
    TAX                        ; $86BC
    LDA $86C7,X                ; $86BD
    PHA                        ; $86C0
    LDA $86C6,X                ; $86C1
    PHA                        ; $86C4
    RTS                        ; $86C5
    .byte $D5,$86,$DD,$86,$E5,$86,$ED,$86,$F5,$86,$12,$87,$33,$87,$9E,$87
    .byte $20,$B0,$99,$A9,$02,$4C,$79,$88
    JSR $99D1                  ; $86DE
    LDA #$02                   ; $86E1
    JMP $8879                  ; $86E3
    JSR $9A0D                  ; $86E6
    LDA #$02                   ; $86E9
    JMP $8879                  ; $86EB
    JSR $9A1F                  ; $86EE
    LDA #$02                   ; $86F1
    JMP $8879                  ; $86F3
    LDA #$04                   ; $86F6
    STA $00ED                  ; $86F8
    LDX $00ED                  ; $86FA
    LDA $87B3,X                ; $86FC
    STA $0631                  ; $86FF
    JSR $9A71                  ; $8702
    LDA #$04                   ; $8705
    JSR $9FA8                  ; $8707
    DEC $00ED                  ; $870A
    BNE $86FA                  ; $870C
    LDA #$02                   ; $870E
    JMP $8879                  ; $8710
    LDA #$00                   ; $8713
    STA $00ED                  ; $8715
    LDX $00ED                  ; $8717
    LDA $87B4,X                ; $8719
    STA $0631                  ; $871C
    JSR $9A71                  ; $871F
    LDA #$04                   ; $8722
    JSR $9FA8                  ; $8724
    INC $00ED                  ; $8727
    LDA $00ED                  ; $8729
    CMP #$04                   ; $872B
    BCC $8717                  ; $872D
    LDA #$02                   ; $872F
    JMP $8879                  ; $8731
    LDY #$FC                   ; $8734
    LDA $88D2,Y                ; $8736
    STA $0468,Y                ; $8739
    INY                        ; $873C
    BNE $8736                  ; $873D
    LDX #$F8                   ; $873F
    LDY #$00                   ; $8741
    .byte $A9,$01
    JSR $9FA8                  ; $8745
    BIT $001E                  ; $8748
    BMI $8763                  ; $874A
    LDA $001C                  ; $874C
    AND #$44                   ; $874E
    CMP #$44                   ; $8750
    BEQ $876E                  ; $8752
    INY                        ; $8754
    CPY #$14                   ; $8755
    BEQ $8734                  ; $8757
    CPY #$0C                   ; $8759
    BNE $8743                  ; $875B
    STX $0564                  ; $875D
    JMP $8743                  ; $8760
    STX $0564                  ; $8763
    JSR $88B1                  ; $8766
    LDA #$03                   ; $8769
    JMP $8887                  ; $876B
    .byte $8E,$64,$05,$20,$B1,$88,$A5,$4D,$18,$69,$03,$85,$58,$A5,$4E,$69
    .byte $00,$85,$59,$A5,$56,$85,$5A,$A0,$02,$B1,$4D,$0A,$A8,$A2,$06,$86
    .byte $56,$20,$B9,$C4,$B9,$00,$A0,$85,$4D,$B9,$01,$A0,$85,$4E,$4C,$D7
    .byte $84,$20,$B1,$88,$A5,$58,$85,$4D,$A5,$59,$85,$4E,$A6,$5A,$86,$56
    .byte $20,$B9,$C4,$4C,$D7,$84,$30
    .byte $20,$10,$0F
    INY                        ; $87B8
    LDX #$00                   ; $87B9
    LDA ($004D),Y              ; $87BB
    CMP #$FF                   ; $87BD
    BEQ $87C4                  ; $87BF
    ORA #$80                   ; $87C1
    TAX                        ; $87C3
    STX $004C                  ; $87C4
    LDA #$02                   ; $87C6
    JMP $8879                  ; $87C8
    JSR $899A                  ; $87CB
    INY                        ; $87CE
    LDA ($004D),Y              ; $87CF
    JSR $9FA8                  ; $87D1
    LDA #$02                   ; $87D4
    JMP $8879                  ; $87D6
    LDA $0009                  ; $87D9
    BEQ $87E5                  ; $87DB
    .byte $A9,$01,$20,$A8,$9F,$4C,$D9,$87
    LDA $007B                  ; $87E5
    EOR #$01                   ; $87E7
    STA $007B                  ; $87E9
    LDA #$00                   ; $87EB
    STA $007A                  ; $87ED
    STA $0044                  ; $87EF
    STA $0045                  ; $87F1
    LDA #$01                   ; $87F3
    JMP $8879                  ; $87F5
    INY                        ; $87F8
    LDA ($004D),Y              ; $87F9
    STA $00ED                  ; $87FB
    INY                        ; $87FD
    LDA ($004D),Y              ; $87FE
    STA $00EC                  ; $8800
    LDX #$02                   ; $8802
    JSR $C4B9                  ; $8804
    JSR $A212                  ; $8807
    TAY                        ; $880A
    LDX $0056                  ; $880B
    JSR $C4B9                  ; $880D
    TYA                        ; $8810
    JMP $8879                  ; $8811
    LDA $005B                  ; $8814
    AND #$FB                   ; $8816
    JMP $881F                  ; $8818
    LDA $005B                  ; $881B
    ORA #$04                   ; $881D
    .byte $85,$5B
    INY                        ; $8821
    LDA ($004D),Y              ; $8822
    JSR $8AF7                  ; $8824
    LDX $0056                  ; $8827
    JSR $C4B9                  ; $8829
    LDA #$02                   ; $882C
    JMP $8879                  ; $882E
    JSR $9085                  ; $8831
    JMP $84E7                  ; $8834
    JSR $899A                  ; $8837
    LDA #$04                   ; $883A
    JSR $9FA8                  ; $883C
    LDA $0051                  ; $883F
    CLC                        ; $8841
    ADC #$40                   ; $8842
    STA $0051                  ; $8844
    LDA $0052                  ; $8846
    ADC #$00                   ; $8848
    STA $0052                  ; $884A
    INC $004D                  ; $884C
    BNE $8852                  ; $884E
    INC $004E                  ; $8850
    JMP $84E3                  ; $8852
    JSR $88B1                  ; $8855
    LDA #$04                   ; $8858
    JSR $9FA8                  ; $885A
    LDA #$01                   ; $885D
    JMP $8887                  ; $885F
    INY                        ; $8862
    LDA ($004D),Y              ; $8863
    TAX                        ; $8865
    INY                        ; $8866
    LDA ($004D),Y              ; $8867
    STA $004E                  ; $8869
    STX $004D                  ; $886B
    JMP $84E7                  ; $886D
    LDA #$00                   ; $8870
    STA $004D                  ; $8872
    STA $004E                  ; $8874
    JMP $9F7E                  ; $8876
    .byte $18
    ADC $004D                  ; $887A
    STA $004D                  ; $887C
    LDA $004E                  ; $887E
    ADC #$00                   ; $8880
    STA $004E                  ; $8882
    JMP $84E7                  ; $8884
    .byte $18
    ADC $004D                  ; $8888
    STA $004D                  ; $888A
    LDA $004E                  ; $888C
    ADC #$00                   ; $888E
    STA $004E                  ; $8890
    JMP $84D7                  ; $8892
    STA $0057                  ; $8895
    LDX #$0D                   ; $8897
    LDA #$A8                   ; $8899
    STA $0000,X                ; $889B
    LDA #$88                   ; $889D
    STA $0001,X                ; $889F
    LDY #$A0                   ; $88A1
    LDA #$00                   ; $88A3
    JSR $9F69                  ; $88A5
    RTS                        ; $88A8
    LDX #$02                   ; $88A9
    JSR $C4B9                  ; $88AB
    JMP $A206                  ; $88AE
    LDA $0054                  ; $88B1
    EOR #$FF                   ; $88B3
    CLC                        ; $88B5
    ADC #$1F                   ; $88B6
    TAX                        ; $88B8
    LDY #$08                   ; $88B9
    LDA $004F                  ; $88BB
    AND #$E0                   ; $88BD
    ORA $0054                  ; $88BF
    STA $00E6                  ; $88C1
    LDA $0050                  ; $88C3
    STA $00E7                  ; $88C5
    JMP $98E8                  ; $88C7
    PHA                        ; $88CA
    LDA #$82                   ; $88CB
    JSR $9B28                  ; $88CD
    PLA                        ; $88D0
    CMP #$A0                   ; $88D1
    BCC $88ED                  ; $88D3
    PHA                        ; $88D5
    CMP #$C8                   ; $88D6
    LDA #$94                   ; $88D8
    ADC #$00                   ; $88DA
    STA $05E8,X                ; $88DC
    INX                        ; $88DF
    PLA                        ; $88E0
    TAY                        ; $88E1
    LDA $8A14,Y                ; $88E2
    STA $05E8,X                ; $88E5
    INX                        ; $88E8
    JSR $9B5E                  ; $88E9
    RTS                        ; $88EC
    STA $05E9,X                ; $88ED
    LDA #$00                   ; $88F0
    STA $05E8,X                ; $88F2
    INX                        ; $88F5
    INX                        ; $88F6
    JSR $9B5E                  ; $88F7
    RTS                        ; $88FA
    LDX #$00                   ; $88FB
    LDA $046A,X                ; $88FD
    EOR #$20                   ; $8900
    STA $046A,X                ; $8902
    INX                        ; $8905
    INX                        ; $8906
    INX                        ; $8907
    INX                        ; $8908
    BNE $88FD                  ; $8909
    RTS                        ; $890B
    STA $00ED                  ; $890C
    LDX #$00                   ; $890E
    LDA $0468,X                ; $8910
    CLC                        ; $8913
    ADC $00ED                  ; $8914
    STA $0468,X                ; $8916
    INX                        ; $8919
    INX                        ; $891A
    INX                        ; $891B
    INX                        ; $891C
    BNE $8910                  ; $891D
    RTS                        ; $891F
    LDX #$13                   ; $8920
    JSR $9DEE                  ; $8922
    LDA $00EC                  ; $8925
    CLC                        ; $8927
    ADC #$00                   ; $8928
    STA $00EC                  ; $892A
    LDA $00ED                  ; $892C
    ADC #$BF                   ; $892E
    STA $00ED                  ; $8930
    LDA $0025                  ; $8932
    STA $00EA                  ; $8934
    LDX #$06                   ; $8936
    JSR $C4B9                  ; $8938
    LDA $0078                  ; $893B
    BNE $893B                  ; $893D
    LDY #$00                   ; $893F
    LDA ($00EC),Y              ; $8941
    STA a: $0079               ; $8943
    LDA #$00                   ; $8946
    STA a: $007A               ; $8948
    INY                        ; $894B
    LDX #$12                   ; $894C
    LDA ($00EC),Y              ; $894E
    STA $007B,Y                ; $8950
    INY                        ; $8953
    DEX                        ; $8954
    BNE $894E                  ; $8955
    LDX $00EA                  ; $8957
    JSR $C4B9                  ; $8959
    RTS                        ; $895C
    TAX                        ; $895D
    LDA $0099                  ; $895E
    BPL $8966                  ; $8960
    EOR #$41                   ; $8962
    STA $0099                  ; $8964
    LDA #$01                   ; $8966
    JSR $9FA8                  ; $8968
    TXA                        ; $896B
    PHA                        ; $896C
    JSR $89FF                  ; $896D
    PLA                        ; $8970
    TAX                        ; $8971
    DEX                        ; $8972
    BNE $8966                  ; $8973
    RTS                        ; $8975
    LDA $004D                  ; $8976
    STA $00EA                  ; $8978
    LDA $004E                  ; $897A
    STA $00EB                  ; $897C
    LDA #$02                   ; $897E
    STA $00E6                  ; $8980
    STX $00E7                  ; $8982
    STY $00E8                  ; $8984
    LDA #$E5                   ; $8986
    STA $004D                  ; $8988
    LDA #$00                   ; $898A
    STA $004E                  ; $898C
    JSR $9085                  ; $898E
    LDA $00EA                  ; $8991
    STA $004D                  ; $8993
    LDA $00EB                  ; $8995
    STA $004E                  ; $8997
    RTS                        ; $8999
    LDA $0099                  ; $899A
    AND #$80                   ; $899C
    ORA #$40                   ; $899E
    STA $0099                  ; $89A0
    RTS                        ; $89A2
    LDY #$FC                   ; $89A3
    LDA $88D2,Y                ; $89A5
    STA $0468,Y                ; $89A8
    INY                        ; $89AB
    BNE $89A5                  ; $89AC
    LDX #$F8                   ; $89AE
    LDY #$00                   ; $89B0
    .byte $A9,$01
    JSR $9FA8                  ; $89B4
    LDA $001E                  ; $89B7
    BMI $89CA                  ; $89B9
    INY                        ; $89BB
    CPY #$28                   ; $89BC
    BEQ $89A3                  ; $89BE
    CPY #$18                   ; $89C0
    BNE $89B2                  ; $89C2
    STX $0564                  ; $89C4
    JMP $89B2                  ; $89C7
    STX $0564                  ; $89CA
    RTS                        ; $89CD
    .byte $D0,$FF,$03,$E8
    TAY                        ; $89D2
    LDX #$06                   ; $89D3
    JSR $C4B9                  ; $89D5
    TYA                        ; $89D8
    ASL                        ; $89D9
    TAX                        ; $89DA
    LDA $BD00,X                ; $89DB
    STA $0654                  ; $89DE
    LDA $BD01,X                ; $89E1
    STA $0655                  ; $89E4
    LDA #$80                   ; $89E7
    STA $0652                  ; $89E9
    LDA #$01                   ; $89EC
    STA $0653                  ; $89EE
    LDA #$00                   ; $89F1
    STA $0090                  ; $89F3
    LDA #$02                   ; $89F5
    STA $0091                  ; $89F7
    LDX $0056                  ; $89F9
    JSR $C4B9                  ; $89FB
    RTS                        ; $89FE
    LDA $0652                  ; $89FF
    BMI $8A07                  ; $8A02
    JMP $8A90                  ; $8A04
    DEC $0653                  ; $8A07
    BEQ $8A0F                  ; $8A0A
    JMP $8A90                  ; $8A0C
    LDX #$06                   ; $8A0F
    JSR $C4B9                  ; $8A11
    .byte $AD,$54,$06
    STA $00E6                  ; $8A17
    LDA $0655                  ; $8A19
    STA $00E7                  ; $8A1C
    LDA $0652                  ; $8A1E
    INC $0652                  ; $8A21
    AND #$3F                   ; $8A24
    CLC                        ; $8A26
    ADC $00E6                  ; $8A27
    STA $00E6                  ; $8A29
    LDA $00E7                  ; $8A2B
    ADC #$00                   ; $8A2D
    STA $00E7                  ; $8A2F
    LDY #$00                   ; $8A31
    LDA ($00E6),Y              ; $8A33
    CMP #$FF                   ; $8A35
    BEQ $8A86                  ; $8A37
    CMP #$FE                   ; $8A39
    BEQ $8A7B                  ; $8A3B
    AND #$F8                   ; $8A3D
    STA $00E8                  ; $8A3F
    LSR                        ; $8A41
    CLC                        ; $8A42
    ADC $00E8                  ; $8A43
    STA $00E8                  ; $8A45
    LDA #$00                   ; $8A47
    ADC #$00                   ; $8A49
    STA $00E9                  ; $8A4B
    LDA $00E8                  ; $8A4D
    CLC                        ; $8A4F
    ADC #$80                   ; $8A50
    STA $00E8                  ; $8A52
    LDA $00E9                  ; $8A54
    ADC #$BD                   ; $8A56
    STA $00E9                  ; $8A58
    LDY #$02                   ; $8A5A
    LDX #$23                   ; $8A5C
    JSR $8A91                  ; $8A5E
    LDY #$03                   ; $8A61
    LDX #$23                   ; $8A63
    JSR $8A91                  ; $8A65
    LDY #$04                   ; $8A68
    LDX #$23                   ; $8A6A
    JSR $8A91                  ; $8A6C
    LDY #$01                   ; $8A6F
    LDA ($00E6),Y              ; $8A71
    AND #$07                   ; $8A73
    STA $0653                  ; $8A75
    JMP $8A8B                  ; $8A78
    LDA $0652                  ; $8A7B
    AND #$C0                   ; $8A7E
    STA $0652                  ; $8A80
    JMP $8A14                  ; $8A83
    .byte $A9,$00,$8D,$52,$06,$A6,$56
    JSR $C4B9                  ; $8A8D
    .byte $60
    LDA #$84                   ; $8A91
    JSR $9B28                  ; $8A93
    LDY #$00                   ; $8A96
    LDA ($00E8),Y              ; $8A98
    STA $05E8,X                ; $8A9A
    INX                        ; $8A9D
    INY                        ; $8A9E
    CPY #$04                   ; $8A9F
    BNE $8A98                  ; $8AA1
    JSR $9B5E                  ; $8AA3
    LDA $00E8                  ; $8AA6
    CLC                        ; $8AA8
    ADC #$04                   ; $8AA9
    STA $00E8                  ; $8AAB
    LDA $00E9                  ; $8AAD
    ADC #$00                   ; $8AAF
    STA $00E9                  ; $8AB1
    RTS                        ; $8AB3
