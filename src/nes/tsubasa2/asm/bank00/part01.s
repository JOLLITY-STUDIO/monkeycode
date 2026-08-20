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
