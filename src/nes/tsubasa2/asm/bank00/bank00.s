; ============================================================
; bank00/bank00.s
; bank 0 - 真实 6502 汇编 (8KB)
; CPU 地址范围: $8000-$9FFF
; 源: _tmp_bzk_out/bank_00/bank_00_partMM.asm
; 代码=助记符, 数据=.byte, build_nes.py 可直接编译
; ============================================================

.segment "PRG_BANK00"
.org $8000

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
    .byte $06,$07,$08,$09,$0A,$0B,$0C,$0D,$0E,$0F,$10,$11,$12,$13,$14,$1A
    .byte $1B,$1C,$1D,$1E,$46,$47,$48,$49,$4A,$4B,$4C,$4D,$4E,$4F,$50,$51
    .byte $52,$53,$54,$5A,$5B,$5C,$5D,$5E,$1A,$1B,$1C,$1D,$1E,$5A,$5B,$5C
    .byte $5D,$5E,$01,$0A,$14,$28,$3C,$50,$78,$F0,$00,$03,$10,$04,$20,$05
    .byte $60,$06,$FF
    STA $00ED                  ; $8AF7
    LDA #$00                   ; $8AF9
    STA $0009                  ; $8AFB
    STA $000A                  ; $8AFD
    STA $000D                  ; $8AFF
    STA $000E                  ; $8B01
    LDA $005B                  ; $8B03
    AND #$7F                   ; $8B05
    STA $005B                  ; $8B07
    LDA $0025                  ; $8B09
    STA $0077                  ; $8B0B
    LDX #$07                   ; $8B0D
    JSR $C4B9                  ; $8B0F
    LDA #$00                   ; $8B12
    LDY #$F8                   ; $8B14
    STA $0552,Y                ; $8B16
    INY                        ; $8B19
    BNE $8B16                  ; $8B1A
    LDA $00ED                  ; $8B1C
    ASL                        ; $8B1E
    TAX                        ; $8B1F
    LDA #$00                   ; $8B20
    ROL                        ; $8B22
    TAY                        ; $8B23
    TXA                        ; $8B24
    CLC                        ; $8B25
    ADC #$00                   ; $8B26
    STA $0063                  ; $8B28
    TYA                        ; $8B2A
    ADC #$A0                   ; $8B2B
    STA $0064                  ; $8B2D
    LDY #$00                   ; $8B2F
    LDA ($0063),Y              ; $8B31
    TAX                        ; $8B33
    INY                        ; $8B34
    LDA ($0063),Y              ; $8B35
    STA $0064                  ; $8B37
    STX $0063                  ; $8B39
    LDY #$00                   ; $8B3B
    LDA ($0063),Y              ; $8B3D
    STA $0075                  ; $8B3F
    INY                        ; $8B41
    LDA ($0063),Y              ; $8B42
    STA $0076                  ; $8B44
    INY                        ; $8B46
    LDA ($0063),Y              ; $8B47
    TAX                        ; $8B49
    AND #$3F                   ; $8B4A
    STA $0048                  ; $8B4C
    TXA                        ; $8B4E
    LSR $005B                  ; $8B4F
    ROL                        ; $8B51
    ROL $005B                  ; $8B52
    INY                        ; $8B54
    LDA ($0063),Y              ; $8B55
    STA $005E                  ; $8B57
    INY                        ; $8B59
    LDA ($0063),Y              ; $8B5A
    STA $005F                  ; $8B5C
    INY                        ; $8B5E
    LDA ($0063),Y              ; $8B5F
    AND #$F8                   ; $8B61
    STA $005C                  ; $8B63
    LDA #$02                   ; $8B65
    STA $005D                  ; $8B67
    ASL $005C                  ; $8B69
    ROL $005D                  ; $8B6B
    ASL $005C                  ; $8B6D
    ROL $005D                  ; $8B6F
    LDA ($0063),Y              ; $8B71
    AND #$07                   ; $8B73
    ORA $005C                  ; $8B75
    STA $005C                  ; $8B77
    ASL $005C                  ; $8B79
    ROL $005D                  ; $8B7B
    ASL $005C                  ; $8B7D
    ROL $005D                  ; $8B7F
    LDA $005D                  ; $8B81
    AND #$0C                   ; $8B83
    BNE $8B93                  ; $8B85
    LDA $007B                  ; $8B87
    ASL                        ; $8B89
    ASL                        ; $8B8A
    EOR $005B                  ; $8B8B
    AND #$04                   ; $8B8D
    ORA $005D                  ; $8B8F
    STA $005D                  ; $8B91
    LDA $005E                  ; $8B93
    CMP #$09                   ; $8B95
    BCC $8B9F                  ; $8B97
    JSR $9071                  ; $8B99
    JMP $8BAB                  ; $8B9C
    LDA $005D                  ; $8B9F
    AND #$04                   ; $8BA1
    BNE $8BAB                  ; $8BA3
    JSR $9071                  ; $8BA5
    JMP $8BAE                  ; $8BA8
    JSR $9076                  ; $8BAB
    .byte $A9,$01
    JSR $9FA8                  ; $8BB0
    LDA $0063                  ; $8BB3
    CLC                        ; $8BB5
    ADC #$06                   ; $8BB6
    STA $0063                  ; $8BB8
    LDA $0064                  ; $8BBA
    ADC #$00                   ; $8BBC
    STA $0064                  ; $8BBE
    LDA $005E                  ; $8BC0
    LDX $005F                  ; $8BC2
    JSR $9DEE                  ; $8BC4
    LDA $0063                  ; $8BC7
    CLC                        ; $8BC9
    ADC $00EC                  ; $8BCA
    STA $0070                  ; $8BCC
    LDA $0064                  ; $8BCE
    ADC $00ED                  ; $8BD0
    STA $0071                  ; $8BD2
    LDA #$00                   ; $8BD4
    STA $0060                  ; $8BD6
    LDY #$01                   ; $8BD8
    LDA ($0070),Y              ; $8BDA
    AND #$E0                   ; $8BDC
    STA $0062                  ; $8BDE
    LDA ($0070),Y              ; $8BE0
    AND #$1F                   ; $8BE2
    TAX                        ; $8BE4
    LSR                        ; $8BE5
    ROR $0060                  ; $8BE6
    LSR                        ; $8BE8
    ROR $0060                  ; $8BE9
    STA $0061                  ; $8BEB
    TXA                        ; $8BED
    BEQ $8BF3                  ; $8BEE
    INY                        ; $8BF0
    LDA ($0070),Y              ; $8BF1
    STA $0072                  ; $8BF3
    LDA $0062                  ; $8BF5
    AND #$C0                   ; $8BF7
    BEQ $8C43                  ; $8BF9
    CMP #$40                   ; $8BFB
    BEQ $8C15                  ; $8BFD
    CMP #$80                   ; $8BFF
    BEQ $8C0C                  ; $8C01
    LDA #$04                   ; $8C03
    LDX #$01                   ; $8C05
    LDY $005F                  ; $8C07
    JMP $8C59                  ; $8C09
    LDA #$04                   ; $8C0C
    LDX #$01                   ; $8C0E
    LDY $005F                  ; $8C10
    JMP $8C59                  ; $8C12
    LDA $005E                  ; $8C15
    LDX $005F                  ; $8C17
    JSR $9DEE                  ; $8C19
    LDA $00EC                  ; $8C1C
    SEC                        ; $8C1E
    SBC #$01                   ; $8C1F
    STA $00EC                  ; $8C21
    LDA $00ED                  ; $8C23
    SBC #$00                   ; $8C25
    STA $00ED                  ; $8C27
    LDA $0063                  ; $8C29
    CLC                        ; $8C2B
    ADC $00EC                  ; $8C2C
    STA $0063                  ; $8C2E
    LDA $0064                  ; $8C30
    ADC $00ED                  ; $8C32
    STA $0064                  ; $8C34
    LDA #$00                   ; $8C36
    SEC                        ; $8C38
    SBC $005F                  ; $8C39
    TAY                        ; $8C3B
    LDA #$FC                   ; $8C3C
    LDX #$FF                   ; $8C3E
    JMP $8C59                  ; $8C40
    LDA $005F                  ; $8C43
    SEC                        ; $8C45
    SBC #$01                   ; $8C46
    CLC                        ; $8C48
    ADC $0063                  ; $8C49
    STA $0063                  ; $8C4B
    LDA $0064                  ; $8C4D
    ADC #$00                   ; $8C4F
    STA $0064                  ; $8C51
    LDA #$FC                   ; $8C53
    LDX #$FF                   ; $8C55
    LDY $005F                  ; $8C57
    .byte $85,$6D
    STX $006E                  ; $8C5B
    STY $006F                  ; $8C5D
    LDA $005E                  ; $8C5F
    CMP #$07                   ; $8C61
    BCC $8C89                  ; $8C63
    SEC                        ; $8C65
    SBC #$07                   ; $8C66
    STA $005E                  ; $8C68
    LDY #$07                   ; $8C6A
    LDX $005F                  ; $8C6C
    JSR $8E15                  ; $8C6E
    LDA #$01                   ; $8C71
    STA $007B                  ; $8C73
    LDX #$09                   ; $8C75
    LDA #$B9                   ; $8C77
    STA $0000,X                ; $8C79
    LDA #$8C                   ; $8C7B
    STA $0001,X                ; $8C7D
    LDY #$78                   ; $8C7F
    LDA #$00                   ; $8C81
    JSR $9F69                  ; $8C83
    JMP $8CA5                  ; $8C86
    LDY $005E                  ; $8C89
    LDX $005F                  ; $8C8B
    JSR $8E15                  ; $8C8D
    LDA $0072                  ; $8C90
    BEQ $8CA5                  ; $8C92
    LDX #$09                   ; $8C94
    LDA #$21                   ; $8C96
    STA $0000,X                ; $8C98
    LDA #$8D                   ; $8C9A
    STA $0001,X                ; $8C9C
    LDY #$78                   ; $8C9E
    LDA #$00                   ; $8CA0
    JSR $9F69                  ; $8CA2
    .byte $A5,$75
    STA $008E                  ; $8CA7
    LDA $0076                  ; $8CA9
    STA $008F                  ; $8CAB
    LDA #$00                   ; $8CAD
    STA $0044                  ; $8CAF
    STA $0045                  ; $8CB1
    STA $007A                  ; $8CB3
    LDX $0077                  ; $8CB5
    JMP $C4B9                  ; $8CB7
    LDX #$07                   ; $8CBA
    JSR $C4B9                  ; $8CBC
    LDA #$00                   ; $8CBF
    STA $0069                  ; $8CC1
    STA $006A                  ; $8CC3
    BIT $0062                  ; $8CC5
    BMI $8CD6                  ; $8CC7
    LDA #$00                   ; $8CC9
    SEC                        ; $8CCB
    SBC $0060                  ; $8CCC
    STA $0060                  ; $8CCE
    LDA #$00                   ; $8CD0
    SBC $0061                  ; $8CD2
    STA $0061                  ; $8CD4
    LDA #$01                   ; $8CD6
    JSR $9FA8                  ; $8CD8
    LDA $0060                  ; $8CDB
    CLC                        ; $8CDD
    ADC $0069                  ; $8CDE
    STA $0069                  ; $8CE0
    LDA #$00                   ; $8CE2
    ADC $0061                  ; $8CE4
    TAX                        ; $8CE6
    JSR $9BA9                  ; $8CE7
    TXA                        ; $8CEA
    BPL $8CF2                  ; $8CEB
    EOR #$FF                   ; $8CED
    CLC                        ; $8CEF
    ADC #$01                   ; $8CF0
    CLC                        ; $8CF2
    ADC $006A                  ; $8CF3
    STA $006A                  ; $8CF5
    SEC                        ; $8CF7
    SBC #$20                   ; $8CF8
    BCC $8CD6                  ; $8CFA
    STA $006A                  ; $8CFC
    LDA $005B                  ; $8CFE
    BPL $8D0A                  ; $8D00
    .byte $A9,$01,$20,$A8,$9F,$4C,$FE,$8C
    LDX #$0D                   ; $8D0A
    LDA #$FE                   ; $8D0C
    STA $0000,X                ; $8D0E
    LDA #$8D                   ; $8D10
    STA $0001,X                ; $8D12
    LDY #$A0                   ; $8D14
    LDA #$00                   ; $8D16
    JSR $9F69                  ; $8D18
    DEC $005E                  ; $8D1B
    BNE $8CD6                  ; $8D1D
    JMP $8D59                  ; $8D1F
    .byte $A2,$07
    JSR $C4B9                  ; $8D24
    LDX #$02                   ; $8D27
    LDY #$00                   ; $8D29
    LDA ($0070),Y              ; $8D2B
    BEQ $8D3A                  ; $8D2D
    ASL                        ; $8D2F
    BCC $8D3B                  ; $8D30
    TAX                        ; $8D32
    LDA #$FE                   ; $8D33
    JSR $9FA8                  ; $8D35
    INX                        ; $8D38
    INX                        ; $8D39
    TXA                        ; $8D3A
    JSR $9FA8                  ; $8D3B
    LDA #$00                   ; $8D3E
    STA $0069                  ; $8D40
    STA $006A                  ; $8D42
    BIT $0062                  ; $8D44
    BMI $8D55                  ; $8D46
    LDA #$00                   ; $8D48
    SEC                        ; $8D4A
    SBC $0060                  ; $8D4B
    STA $0060                  ; $8D4D
    LDA #$00                   ; $8D4F
    SBC $0061                  ; $8D51
    STA $0061                  ; $8D53
    BIT $0062                  ; $8D55
    BVC $8D88                  ; $8D57
    .byte $A9,$01
    JSR $9FA8                  ; $8D5B
    LDA $0060                  ; $8D5E
    CLC                        ; $8D60
    ADC $0069                  ; $8D61
    STA $0069                  ; $8D63
    LDA #$00                   ; $8D65
    ADC $0061                  ; $8D67
    TAX                        ; $8D69
    JSR $9BA9                  ; $8D6A
    TXA                        ; $8D6D
    BPL $8D75                  ; $8D6E
    EOR #$FF                   ; $8D70
    CLC                        ; $8D72
    ADC #$01                   ; $8D73
    CLC                        ; $8D75
    ADC $006A                  ; $8D76
    STA $006A                  ; $8D78
    SEC                        ; $8D7A
    SBC #$20                   ; $8D7B
    BCC $8D59                  ; $8D7D
    STA $006A                  ; $8D7F
    DEC $0072                  ; $8D81
    BNE $8D59                  ; $8D83
    JMP $8DC8                  ; $8D85
    LDA #$01                   ; $8D88
    JSR $9FA8                  ; $8D8A
    LDA $0060                  ; $8D8D
    CLC                        ; $8D8F
    ADC $0069                  ; $8D90
    STA $0069                  ; $8D92
    LDA #$00                   ; $8D94
    ADC $0061                  ; $8D96
    TAX                        ; $8D98
    JSR $9BCA                  ; $8D99
    TXA                        ; $8D9C
    BPL $8DA4                  ; $8D9D
    EOR #$FF                   ; $8D9F
    CLC                        ; $8DA1
    ADC #$01                   ; $8DA2
    CLC                        ; $8DA4
    ADC $006A                  ; $8DA5
    STA $006A                  ; $8DA7
    SEC                        ; $8DA9
    SBC #$20                   ; $8DAA
    BCC $8D88                  ; $8DAC
    STA $006A                  ; $8DAE
    DEC $0072                  ; $8DB0
    BNE $8D88                  ; $8DB2
    LDA $007A                  ; $8DB4
    SEC                        ; $8DB6
    SBC $006A                  ; $8DB7
    STA $007A                  ; $8DB9
    LDA $007B                  ; $8DBB
    SBC #$00                   ; $8DBD
    STA $007B                  ; $8DBF
    LDA $0047                  ; $8DC1
    SEC                        ; $8DC3
    SBC $006A                  ; $8DC4
    STA $0047                  ; $8DC6
    .byte $A5,$62
    AND #$20                   ; $8DCA
    BNE $8DFC                  ; $8DCC
    LDA $0070                  ; $8DCE
    CLC                        ; $8DD0
    ADC #$03                   ; $8DD1
    STA $0070                  ; $8DD3
    LDA $0071                  ; $8DD5
    ADC #$00                   ; $8DD7
    STA $0071                  ; $8DD9
    LDA #$00                   ; $8DDB
    STA $0060                  ; $8DDD
    LDY #$01                   ; $8DDF
    LDA ($0070),Y              ; $8DE1
    AND #$E0                   ; $8DE3
    STA $0062                  ; $8DE5
    LDA ($0070),Y              ; $8DE7
    AND #$1F                   ; $8DE9
    TAX                        ; $8DEB
    LSR                        ; $8DEC
    ROR $0060                  ; $8DED
    LSR                        ; $8DEF
    ROR $0060                  ; $8DF0
    STA $0061                  ; $8DF2
    INY                        ; $8DF4
    LDA ($0070),Y              ; $8DF5
    STA $0072                  ; $8DF7
    JMP $8D22                  ; $8DF9
    JMP $9F7E                  ; $8DFC
    LDA $005B                  ; $8DFF
    ORA #$80                   ; $8E01
    STA $005B                  ; $8E03
    LDY #$01                   ; $8E05
    LDX $005F                  ; $8E07
    JSR $8E15                  ; $8E09
    LDA $005B                  ; $8E0C
    AND #$7F                   ; $8E0E
    STA $005B                  ; $8E10
    JMP $9F7E                  ; $8E12
    STY $006C                  ; $8E15
    STX $006B                  ; $8E17
    .byte $A5,$63
    STA $0065                  ; $8E1B
    LDA $0064                  ; $8E1D
    STA $0066                  ; $8E1F
    LDA $006B                  ; $8E21
    STA $00ED                  ; $8E23
    LDA $005C                  ; $8E25
    STA $0073                  ; $8E27
    LDA $005D                  ; $8E29
    STA $0074                  ; $8E2B
    LDY #$00                   ; $8E2D
    LDA ($0063),Y              ; $8E2F
    JSR $8EF0                  ; $8E31
    LDA $005C                  ; $8E34
    TAX                        ; $8E36
    CLC                        ; $8E37
    ADC $006D                  ; $8E38
    STA $005C                  ; $8E3A
    TXA                        ; $8E3C
    EOR $005C                  ; $8E3D
    AND #$20                   ; $8E3F
    BEQ $8E58                  ; $8E41
    LDA $006D                  ; $8E43
    ASL                        ; $8E45
    ASL                        ; $8E46
    ASL                        ; $8E47
    EOR #$FF                   ; $8E48
    CLC                        ; $8E4A
    ADC #$01                   ; $8E4B
    CLC                        ; $8E4D
    ADC $005C                  ; $8E4E
    STA $005C                  ; $8E50
    LDA $005D                  ; $8E52
    EOR #$04                   ; $8E54
    STA $005D                  ; $8E56
    LDA $006E                  ; $8E58
    PHA                        ; $8E5A
    CLC                        ; $8E5B
    ADC $0063                  ; $8E5C
    STA $0063                  ; $8E5E
    PLA                        ; $8E60
    BMI $8E6A                  ; $8E61
    LDA $0064                  ; $8E63
    ADC #$00                   ; $8E65
    JMP $8E6E                  ; $8E67
    LDA $0064                  ; $8E6A
    SBC #$00                   ; $8E6C
    .byte $85,$64
    DEC $00ED                  ; $8E70
    BNE $8E2D                  ; $8E72
    LDA $006F                  ; $8E74
    PHA                        ; $8E76
    CLC                        ; $8E77
    ADC $0065                  ; $8E78
    STA $0063                  ; $8E7A
    PLA                        ; $8E7C
    BMI $8E86                  ; $8E7D
    LDA $0066                  ; $8E7F
    ADC #$00                   ; $8E81
    JMP $8E8A                  ; $8E83
    LDA $0066                  ; $8E86
    SBC #$00                   ; $8E88
    .byte $85,$64
    LDA $0062                  ; $8E8C
    AND #$C0                   ; $8E8E
    CMP #$40                   ; $8E90
    BEQ $8EC2                  ; $8E92
    LDA $0073                  ; $8E94
    CLC                        ; $8E96
    ADC #$80                   ; $8E97
    STA $005C                  ; $8E99
    TAX                        ; $8E9B
    LDA $0074                  ; $8E9C
    ADC #$00                   ; $8E9E
    STA $005D                  ; $8EA0
    TXA                        ; $8EA2
    SEC                        ; $8EA3
    SBC #$40                   ; $8EA4
    BPL $8EE8                  ; $8EA6
    LDA $005D                  ; $8EA8
    SBC #$00                   ; $8EAA
    AND #$03                   ; $8EAC
    CMP #$03                   ; $8EAE
    BNE $8EE8                  ; $8EB0
    LDA $005C                  ; $8EB2
    SEC                        ; $8EB4
    SBC #$C0                   ; $8EB5
    STA $005C                  ; $8EB7
    LDA $005D                  ; $8EB9
    SBC #$03                   ; $8EBB
    STA $005D                  ; $8EBD
    JMP $8EE8                  ; $8EBF
    LDA $0073                  ; $8EC2
    SEC                        ; $8EC4
    SBC #$80                   ; $8EC5
    STA $005C                  ; $8EC7
    TAX                        ; $8EC9
    LDA $0074                  ; $8ECA
    SBC #$00                   ; $8ECC
    STA $005D                  ; $8ECE
    TXA                        ; $8ED0
    BPL $8EE8                  ; $8ED1
    LDA $005D                  ; $8ED3
    AND #$03                   ; $8ED5
    CMP #$03                   ; $8ED7
    BNE $8EE8                  ; $8ED9
    LDA $005C                  ; $8EDB
    CLC                        ; $8EDD
    ADC #$C0                   ; $8EDE
    STA $005C                  ; $8EE0
    LDA $005D                  ; $8EE2
    ADC #$03                   ; $8EE4
    STA $005D                  ; $8EE6
    .byte $C6,$6C
    BEQ $8EEF                  ; $8EEA
    JMP $8E19                  ; $8EEC
    RTS                        ; $8EEF
    TAX                        ; $8EF0
    LDA $005C                  ; $8EF1
    STA $0067                  ; $8EF3
    LDA $005D                  ; $8EF5
    STA $0068                  ; $8EF7
    LDA $005B                  ; $8EF9
    AND #$01                   ; $8EFB
    TAY                        ; $8EFD
    STA $00EB                  ; $8EFE
    TXA                        ; $8F00
    STA $00EA                  ; $8F01
    ASL                        ; $8F03
    ROL $00EB                  ; $8F04
    ASL                        ; $8F06
    ROL $00EB                  ; $8F07
    ASL                        ; $8F09
    ROL $00EB                  ; $8F0A
    ASL                        ; $8F0C
    ROL $00EB                  ; $8F0D
    CLC                        ; $8F0F
    ADC $00EA                  ; $8F10
    STA $00EA                  ; $8F12
    TYA                        ; $8F14
    ADC $00EB                  ; $8F15
    STA $00EB                  ; $8F17
    LDA $00EA                  ; $8F19
    CLC                        ; $8F1B
    ADC #$00                   ; $8F1C
    STA $00EA                  ; $8F1E
    LDA $00EB                  ; $8F20
    ADC #$A0                   ; $8F22
    STA $00EB                  ; $8F24
    LDX #$08                   ; $8F26
    JSR $C4B9                  ; $8F28
    LDY #$00                   ; $8F2B
    LDA ($00EA),Y              ; $8F2D
    STA $00E7                  ; $8F2F
    JSR $8FD1                  ; $8F31
    INC $00EA                  ; $8F34
    BNE $8F3A                  ; $8F36
    INC $00EB                  ; $8F38
    LDA #$04                   ; $8F3A
    STA $00E8                  ; $8F3C
    .byte $A4,$67
    LDX $0068                  ; $8F40
    LDA #$04                   ; $8F42
    JSR $9B28                  ; $8F44
    LDY #$00                   ; $8F47
    LDA ($00EA),Y              ; $8F49
    STA $05E8,X                ; $8F4B
    INX                        ; $8F4E
    INY                        ; $8F4F
    CPY #$04                   ; $8F50
    BNE $8F49                  ; $8F52
    JSR $9B5E                  ; $8F54
    DEC $00E8                  ; $8F57
    BEQ $8FCB                  ; $8F59
    LDA $00EA                  ; $8F5B
    CLC                        ; $8F5D
    ADC #$04                   ; $8F5E
    STA $00EA                  ; $8F60
    LDA $00EB                  ; $8F62
    ADC #$00                   ; $8F64
    STA $00EB                  ; $8F66
    LDA $0067                  ; $8F68
    CLC                        ; $8F6A
    ADC #$20                   ; $8F6B
    STA $0067                  ; $8F6D
    LDA $0068                  ; $8F6F
    ADC #$00                   ; $8F71
    STA $0068                  ; $8F73
    AND #$03                   ; $8F75
    CMP #$03                   ; $8F77
    BNE $8F3E                  ; $8F79
    LDA $0067                  ; $8F7B
    CMP #$C0                   ; $8F7D
    BCC $8F3E                  ; $8F7F
    LDA $0067                  ; $8F81
    SEC                        ; $8F83
    SBC #$C0                   ; $8F84
    STA $0067                  ; $8F86
    LDA $0068                  ; $8F88
    SBC #$03                   ; $8F8A
    STA $0068                  ; $8F8C
    JSR $9049                  ; $8F8E
    LDA #$01                   ; $8F91
    JSR $9B28                  ; $8F93
    LDA $0067                  ; $8F96
    LSR                        ; $8F98
    LSR                        ; $8F99
    AND #$07                   ; $8F9A
    TAY                        ; $8F9C
    LDA $0062                  ; $8F9D
    AND #$C0                   ; $8F9F
    CMP #$40                   ; $8FA1
    BEQ $8FB8                  ; $8FA3
    LDA $00E7                  ; $8FA5
    LSR                        ; $8FA7
    LSR                        ; $8FA8
    LSR                        ; $8FA9
    LSR                        ; $8FAA
    STA $05E8,X                ; $8FAB
    STA $064A,Y                ; $8FAE
    INX                        ; $8FB1
    JSR $9B5E                  ; $8FB2
    JMP $8F3E                  ; $8FB5
    LDA $00E7                  ; $8FB8
    LSR                        ; $8FBA
    LSR                        ; $8FBB
    LSR                        ; $8FBC
    LSR                        ; $8FBD
    ORA $064A,Y                ; $8FBE
    STA $05E8,X                ; $8FC1
    INX                        ; $8FC4
    JSR $9B5E                  ; $8FC5
    JMP $8F3E                  ; $8FC8
    LDX #$07                   ; $8FCB
    JSR $C4B9                  ; $8FCD
    RTS                        ; $8FD0
    JSR $9049                  ; $8FD1
    BIT $0067                  ; $8FD4
    BVC $903A                  ; $8FD6
    STY $00E8                  ; $8FD8
    STX $00E9                  ; $8FDA
    LDA #$01                   ; $8FDC
    JSR $9B28                  ; $8FDE
    LDA $0067                  ; $8FE1
    LSR                        ; $8FE3
    LSR                        ; $8FE4
    AND #$07                   ; $8FE5
    TAY                        ; $8FE7
    LDA $0062                  ; $8FE8
    AND #$C0                   ; $8FEA
    CMP #$40                   ; $8FEC
    BEQ $900B                  ; $8FEE
    .byte $A5,$E7,$0A,$0A,$0A,$0A,$19,$4A,$06,$9D,$E8,$05,$E8,$A5,$E7,$4A
    .byte $4A,$4A,$4A,$99,$4A,$06,$85,$E6,$4C,$25,$90
    LDA $00E7                  ; $900B
    ASL                        ; $900D
    ASL                        ; $900E
    ASL                        ; $900F
    ASL                        ; $9010
    PHA                        ; $9011
    STA $05E8,X                ; $9012
    INX                        ; $9015
    LDA $00E7                  ; $9016
    LSR                        ; $9018
    LSR                        ; $9019
    LSR                        ; $901A
    LSR                        ; $901B
    ORA $064A,Y                ; $901C
    STA $00E6                  ; $901F
    PLA                        ; $9021
    STA $064A,Y                ; $9022
    JSR $9B5E                  ; $9025
    LDA $00E8                  ; $9028
    CLC                        ; $902A
    ADC #$08                   ; $902B
    TAY                        ; $902D
    LDX $00E9                  ; $902E
    LDA #$01                   ; $9030
    JSR $9B28                  ; $9032
    LDA $00E6                  ; $9035
    JMP $9041                  ; $9037
    LDA #$01                   ; $903A
    JSR $9B28                  ; $903C
    LDA $00E7                  ; $903F
    .byte $9D,$E8,$05
    INX                        ; $9044
    JSR $9B5E                  ; $9045
    RTS                        ; $9048
    LDA $0067                  ; $9049
    AND #$9C                   ; $904B
    LSR                        ; $904D
    LSR                        ; $904E
    STA $00E6                  ; $904F
    AND #$20                   ; $9051
    LSR                        ; $9053
    LSR                        ; $9054
    ORA $00E6                  ; $9055
    AND #$0F                   ; $9057
    STA $00E6                  ; $9059
    LDA $0068                  ; $905B
    ASL                        ; $905D
    ASL                        ; $905E
    ASL                        ; $905F
    ASL                        ; $9060
    AND #$30                   ; $9061
    CLC                        ; $9063
    ADC #$C0                   ; $9064
    ORA $00E6                  ; $9066
    TAY                        ; $9068
    LDA $0068                  ; $9069
    AND #$FC                   ; $906B
    ADC #$03                   ; $906D
    TAX                        ; $906F
    RTS                        ; $9070
    LDA #$20                   ; $9071
    JMP $9078                  ; $9073
    LDA #$24                   ; $9076
    .byte $85,$E7
    LDA #$00                   ; $907A
    STA $00E6                  ; $907C
    LDY #$10                   ; $907E
    LDX #$20                   ; $9080
    JMP $98E8                  ; $9082
    LDA #$00                   ; $9085
    LDY #$01                   ; $9087
    STA $0467,Y                ; $9089
    INY                        ; $908C
    BNE $9089                  ; $908D
    LDA #$00                   ; $908F
    STA $0097                  ; $9091
    LDY #$01                   ; $9093
    LDA ($004D),Y              ; $9095
    STA $00EC                  ; $9097
    LDA $004D                  ; $9099
    CLC                        ; $909B
    ADC #$02                   ; $909C
    STA $004D                  ; $909E
    LDA $004E                  ; $90A0
    ADC #$00                   ; $90A2
    STA $004E                  ; $90A4
    LDA #$68                   ; $90A6
    STA $0094                  ; $90A8
    LDA #$05                   ; $90AA
    STA $0095                  ; $90AC
    .byte $A6,$25
    STX $00ED                  ; $90B0
    LDY #$00                   ; $90B2
    LDA ($004D),Y              ; $90B4
    TAY                        ; $90B6
    LDX #$09                   ; $90B7
    CMP #$6D                   ; $90B9
    BCC $90C2                  ; $90BB
    SEC                        ; $90BD
    SBC #$6D                   ; $90BE
    TAY                        ; $90C0
    INX                        ; $90C1
    JSR $C4B9                  ; $90C2
    TYA                        ; $90C5
    ASL                        ; $90C6
    TAY                        ; $90C7
    LDA #$00                   ; $90C8
    ADC #$00                   ; $90CA
    TAX                        ; $90CC
    TYA                        ; $90CD
    CLC                        ; $90CE
    ADC #$00                   ; $90CF
    STA $0092                  ; $90D1
    TXA                        ; $90D3
    ADC #$A0                   ; $90D4
    STA $0093                  ; $90D6
    LDY #$00                   ; $90D8
    LDA ($0092),Y              ; $90DA
    TAX                        ; $90DC
    INY                        ; $90DD
    LDA ($0092),Y              ; $90DE
    STA $0093                  ; $90E0
    STX $0092                  ; $90E2
    LDY #$00                   ; $90E4
    LDA $978B,Y                ; $90E6
    STA ($0094),Y              ; $90E9
    INY                        ; $90EB
    CPY #$20                   ; $90EC
    BNE $90E6                  ; $90EE
    LDA $0025                  ; $90F0
    SEC                        ; $90F2
    SBC #$09                   ; $90F3
    LDY #$00                   ; $90F5
    ORA ($0094),Y              ; $90F7
    STA ($0094),Y              ; $90F9
    LDY #$00                   ; $90FB
    LDA ($0092),Y              ; $90FD
    STA $0049                  ; $90FF
    INC $0092                  ; $9101
    BNE $9107                  ; $9103
    INC $0093                  ; $9105
    LDY #$02                   ; $9107
    LDA $0092                  ; $9109
    STA ($0094),Y              ; $910B
    INY                        ; $910D
    LDA $0093                  ; $910E
    STA ($0094),Y              ; $9110
    LDX $00ED                  ; $9112
    JSR $C4B9                  ; $9114
    INC $004D                  ; $9117
    BNE $911D                  ; $9119
    .byte $E6,$4E
    LDA $0094                  ; $911D
    CLC                        ; $911F
    ADC #$20                   ; $9120
    STA $0094                  ; $9122
    LDA $0095                  ; $9124
    ADC #$00                   ; $9126
    STA $0095                  ; $9128
    DEC $00EC                  ; $912A
    BEQ $9131                  ; $912C
    JMP $90AE                  ; $912E
    LDX #$11                   ; $9131
    LDA #$47                   ; $9133
    STA $0000,X                ; $9135
    LDA #$91                   ; $9137
    STA $0001,X                ; $9139
    LDY #$C8                   ; $913B
    LDA #$00                   ; $913D
    JSR $9F69                  ; $913F
    RTS                        ; $9142
    .byte $A9,$01
    JSR $9FA8                  ; $9145
    LDA #$68                   ; $9148
    STA $0094                  ; $914A
    LDA #$05                   ; $914C
    STA $0095                  ; $914E
    LDA #$04                   ; $9150
    STA $0096                  ; $9152
    .byte $A0,$00
    LDA ($0094),Y              ; $9156
    BMI $915D                  ; $9158
    JMP $94C1                  ; $915A
    TAX                        ; $915D
    LDY #$04                   ; $915E
    JSR $974A                  ; $9160
    LDY #$06                   ; $9163
    JSR $974A                  ; $9165
    TXA                        ; $9168
    AND #$10                   ; $9169
    BNE $91A6                  ; $916B
    TXA                        ; $916D
    AND #$20                   ; $916E
    BNE $9175                  ; $9170
    JMP $91F3                  ; $9172
    LDX #$04                   ; $9175
    LDY #$0A                   ; $9177
    JSR $975B                  ; $9179
    LDA $009A                  ; $917C
    STA $00E6                  ; $917E
    LDY #$04                   ; $9180
    JSR $974A                  ; $9182
    LDA $009A                  ; $9185
    SEC                        ; $9187
    SBC $00E6                  ; $9188
    STA $00E6                  ; $918A
    LDX #$06                   ; $918C
    LDY #$0E                   ; $918E
    JSR $975B                  ; $9190
    LDA $009C                  ; $9193
    STA $00E8                  ; $9195
    LDY #$06                   ; $9197
    JSR $974A                  ; $9199
    LDA $009C                  ; $919C
    SEC                        ; $919E
    SBC $00E8                  ; $919F
    STA $00E8                  ; $91A1
    JMP $91B4                  ; $91A3
    LDA #$00                   ; $91A6
    SEC                        ; $91A8
    SBC $0046                  ; $91A9
    STA $00E6                  ; $91AB
    LDA #$00                   ; $91AD
    SEC                        ; $91AF
    SBC $0047                  ; $91B0
    STA $00E8                  ; $91B2
    .byte $A0,$10
    LDA ($0094),Y              ; $91B6
    TAX                        ; $91B8
    INY                        ; $91B9
    LDA ($0094),Y              ; $91BA
    LSR                        ; $91BC
    LSR                        ; $91BD
    TAY                        ; $91BE
    LDA $00E6                  ; $91BF
    CLC                        ; $91C1
    ADC $0468,X                ; $91C2
    STA $0468,X                ; $91C5
    ROR                        ; $91C8
    EOR $00E6                  ; $91C9
    BPL $91D5                  ; $91CB
    LDA $046A,X                ; $91CD
    EOR #$08                   ; $91D0
    STA $046A,X                ; $91D2
    LDA $00E8                  ; $91D5
    CLC                        ; $91D7
    ADC $046B,X                ; $91D8
    STA $046B,X                ; $91DB
    ROR                        ; $91DE
    EOR $00E8                  ; $91DF
    BPL $91EB                  ; $91E1
    LDA $046A,X                ; $91E3
    EOR #$04                   ; $91E6
    STA $046A,X                ; $91E8
    TXA                        ; $91EB
    CLC                        ; $91EC
    ADC #$04                   ; $91ED
    TAX                        ; $91EF
    DEY                        ; $91F0
    BNE $91BF                  ; $91F1
    .byte $A0,$01
    LDA ($0094),Y              ; $91F5
    SEC                        ; $91F7
    SBC #$01                   ; $91F8
    STA ($0094),Y              ; $91FA
    BEQ $9201                  ; $91FC
    JMP $94C1                  ; $91FE
    LDY #$00                   ; $9201
    LDA ($0094),Y              ; $9203
    AND #$01                   ; $9205
    CLC                        ; $9207
    ADC #$09                   ; $9208
    TAX                        ; $920A
    JSR $C4B9                  ; $920B
    LDY #$02                   ; $920E
    LDA ($0094),Y              ; $9210
    STA $0092                  ; $9212
    INY                        ; $9214
    LDA ($0094),Y              ; $9215
    STA $0093                  ; $9217
    LDY #$00                   ; $9219
    LDA ($0094),Y              ; $921B
    AND #$02                   ; $921D
    BEQ $9224                  ; $921F
    JMP $9459                  ; $9221
    .byte $A0,$00
    LDA ($0092),Y              ; $9226
    BMI $9241                  ; $9228
    INY                        ; $922A
    ASL                        ; $922B
    STA ($0094),Y              ; $922C
    LDY #$02                   ; $922E
    LDA $0092                  ; $9230
    CLC                        ; $9232
    ADC #$01                   ; $9233
    STA ($0094),Y              ; $9235
    INY                        ; $9237
    LDA $0093                  ; $9238
    ADC #$00                   ; $923A
    STA ($0094),Y              ; $923C
    JMP $94C1                  ; $923E
    CMP #$A0                   ; $9241
    BCS $9258                  ; $9243
    CLC                        ; $9245
    ADC #$20                   ; $9246
    STA $00E7                  ; $9248
    LDY #$01                   ; $924A
    LDA ($0092),Y              ; $924C
    STA $00E6                  ; $924E
    JSR $94D8                  ; $9250
    LDA #$02                   ; $9253
    JMP $94AE                  ; $9255
    CMP #$C0                   ; $9258
    BCS $9268                  ; $925A
    TAX                        ; $925C
    LDY #$01                   ; $925D
    LDA ($0092),Y              ; $925F
    STA $0092                  ; $9261
    STX $0093                  ; $9263
    JMP $9224                  ; $9265
    CMP #$E0                   ; $9268
    BCS $92A0                  ; $926A
    .byte $85,$E7,$A0,$13,$B1,$94,$C9,$03,$B0,$FE,$AA,$18,$69,$01,$91,$94
    .byte $8A,$0A,$18,$69,$18,$A8,$A5,$92,$18,$69,$02,$91,$94,$C8,$A5,$93
    .byte $69,$00,$91,$94,$A0,$01,$B1,$92,$85,$92,$A5,$E7,$38,$E9,$20,$85
    .byte $93,$4C,$24,$92
    CMP #$F0                   ; $92A0
    BCS $92D7                  ; $92A2
    TAX                        ; $92A4
    LDY #$13                   ; $92A5
    LDA ($0094),Y              ; $92A7
    CMP #$04                   ; $92A9
    BCS $92AB                  ; $92AB
    CLC                        ; $92AD
    ADC #$01                   ; $92AE
    STA ($0094),Y              ; $92B0
    CLC                        ; $92B2
    ADC #$13                   ; $92B3
    TAY                        ; $92B5
    TXA                        ; $92B6
    SEC                        ; $92B7
    SBC #$E0                   ; $92B8
    STA ($0094),Y              ; $92BA
    TYA                        ; $92BC
    ASL                        ; $92BD
    SEC                        ; $92BE
    SBC #$10                   ; $92BF
    TAY                        ; $92C1
    LDA $0092                  ; $92C2
    CLC                        ; $92C4
    ADC #$01                   ; $92C5
    STA $0092                  ; $92C7
    STA ($0094),Y              ; $92C9
    INY                        ; $92CB
    LDA $0093                  ; $92CC
    ADC #$00                   ; $92CE
    STA $0093                  ; $92D0
    STA ($0094),Y              ; $92D2
    JMP $9224                  ; $92D4
    SEC                        ; $92D7
    SBC #$F0                   ; $92D8
    ASL                        ; $92DA
    TAX                        ; $92DB
    LDA $92E6,X                ; $92DC
    PHA                        ; $92DF
    LDA $92E5,X                ; $92E0
    PHA                        ; $92E3
    RTS                        ; $92E4
    .byte $04,$93,$38,$93,$4F,$93,$5D,$93,$6B,$93,$8C,$93,$99,$93,$A6,$93
    .byte $29,$94,$34,$94,$41,$94,$8E,$94,$8E,$94,$8E,$94,$91,$94,$BB,$94
    LDY #$13                   ; $9305
    LDA ($0094),Y              ; $9307
    BEQ $9309                  ; $9309
    TAX                        ; $930B
    CLC                        ; $930C
    ADC #$13                   ; $930D
    TAY                        ; $930F
    LDA ($0094),Y              ; $9310
    SEC                        ; $9312
    SBC #$01                   ; $9313
    STA ($0094),Y              ; $9315
    BEQ $932B                  ; $9317
    TXA                        ; $9319
    ASL                        ; $931A
    CLC                        ; $931B
    ADC #$16                   ; $931C
    TAY                        ; $931E
    LDA ($0094),Y              ; $931F
    STA $0092                  ; $9321
    INY                        ; $9323
    LDA ($0094),Y              ; $9324
    STA $0093                  ; $9326
    JMP $9224                  ; $9328
    LDY #$13                   ; $932B
    LDA ($0094),Y              ; $932D
    SEC                        ; $932F
    SBC #$01                   ; $9330
    STA ($0094),Y              ; $9332
    LDA #$01                   ; $9334
    JMP $94AE                  ; $9336
    LDY #$01                   ; $9339
    LDA ($0092),Y              ; $933B
    LDY #$04                   ; $933D
    JSR $9735                  ; $933F
    LDY #$02                   ; $9342
    LDA ($0092),Y              ; $9344
    LDY #$06                   ; $9346
    JSR $9735                  ; $9348
    LDA #$03                   ; $934B
    JMP $94AE                  ; $934D
    .byte $A0,$01,$B1,$92,$A0,$04,$20,$35,$97,$A9,$02,$4C,$AE,$94,$A0,$01
    .byte $B1,$92,$A0,$06,$20,$35,$97,$A9,$02,$4C,$AE,$94,$A0,$01,$B1,$92
    .byte $91,$94,$A5,$92,$18,$69,$02,$85,$92,$A5,$93,$69,$00,$85,$93,$A0
    .byte $02,$A5,$92,$91,$94,$C8,$A5,$93,$91,$94,$4C,$C1,$94
    LDY #$00                   ; $938D
    LDA ($0094),Y              ; $938F
    ORA #$40                   ; $9391
    STA ($0094),Y              ; $9393
    LDA #$01                   ; $9395
    JMP $94AE                  ; $9397
    LDY #$00                   ; $939A
    LDA ($0094),Y              ; $939C
    AND #$BF                   ; $939E
    STA ($0094),Y              ; $93A0
    LDA #$01                   ; $93A2
    JMP $94AE                  ; $93A4
    LDY #$01                   ; $93A7
    LDA ($0092),Y              ; $93A9
    LSR                        ; $93AB
    LSR                        ; $93AC
    LSR                        ; $93AD
    LSR                        ; $93AE
    LSR                        ; $93AF
    LDY #$09                   ; $93B0
    STA ($0094),Y              ; $93B2
    AND #$04                   ; $93B4
    BNE $93C7                  ; $93B6
    ROR                        ; $93B8
    DEY                        ; $93B9
    STA ($0094),Y              ; $93BA
    LDY #$02                   ; $93BC
    LDA ($0092),Y              ; $93BE
    LDY #$0A                   ; $93C0
    STA ($0094),Y              ; $93C2
    JMP $93DE                  ; $93C4
    LDA ($0094),Y              ; $93C7
    ORA #$F8                   ; $93C9
    STA ($0094),Y              ; $93CB
    LDA #$00                   ; $93CD
    ROR                        ; $93CF
    DEY                        ; $93D0
    STA ($0094),Y              ; $93D1
    LDY #$02                   ; $93D3
    LDA #$00                   ; $93D5
    SEC                        ; $93D7
    SBC ($0092),Y              ; $93D8
    LDY #$0A                   ; $93DA
    STA ($0094),Y              ; $93DC
    .byte $A0,$01
    LDA ($0092),Y              ; $93E0
    AND #$0F                   ; $93E2
    LSR                        ; $93E4
    LDY #$0D                   ; $93E5
    STA ($0094),Y              ; $93E7
    AND #$04                   ; $93E9
    BNE $93FC                  ; $93EB
    ROR                        ; $93ED
    DEY                        ; $93EE
    STA ($0094),Y              ; $93EF
    LDY #$03                   ; $93F1
    LDA ($0092),Y              ; $93F3
    LDY #$0E                   ; $93F5
    STA ($0094),Y              ; $93F7
    JMP $9413                  ; $93F9
    LDA ($0094),Y              ; $93FC
    ORA #$F8                   ; $93FE
    STA ($0094),Y              ; $9400
    LDA #$00                   ; $9402
    ROR                        ; $9404
    DEY                        ; $9405
    STA ($0094),Y              ; $9406
    LDY #$03                   ; $9408
    LDA #$00                   ; $940A
    SEC                        ; $940C
    SBC ($0092),Y              ; $940D
    LDY #$0E                   ; $940F
    STA ($0094),Y              ; $9411
    .byte $A9,$00
    LDY #$0B                   ; $9415
    STA ($0094),Y              ; $9417
    LDY #$0F                   ; $9419
    STA ($0094),Y              ; $941B
    LDY #$00                   ; $941D
    LDA ($0094),Y              ; $941F
    ORA #$20                   ; $9421
    STA ($0094),Y              ; $9423
    LDA #$04                   ; $9425
    JMP $94AE                  ; $9427
    .byte $A0,$01,$B1,$92,$85,$49,$A9,$02,$20,$AE,$94
    LDY #$00                   ; $9435
    LDA ($0094),Y              ; $9437
    ORA #$10                   ; $9439
    STA ($0094),Y              ; $943B
    LDA #$01                   ; $943D
    JMP $94AE                  ; $943F
    LDY #$00                   ; $9442
    LDA ($0094),Y              ; $9444
    ORA #$02                   ; $9446
    STA ($0094),Y              ; $9448
    LDA #$C0                   ; $944A
    STA $0099                  ; $944C
    LDY #$02                   ; $944E
    LDA $0092                  ; $9450
    STA ($0094),Y              ; $9452
    INY                        ; $9454
    LDA $0093                  ; $9455
    STA ($0094),Y              ; $9457
    .byte $24,$99
    BVC $947A                  ; $945B
    LDA $0099                  ; $945D
    AND #$01                   ; $945F
    SEC                        ; $9461
    ROL                        ; $9462
    TAY                        ; $9463
    LDA ($0092),Y              ; $9464
    STA $00E6                  ; $9466
    INY                        ; $9468
    LDA ($0092),Y              ; $9469
    STA $00E7                  ; $946B
    JSR $94D8                  ; $946D
    LDA $0099                  ; $9470
    CMP #$FE                   ; $9472
    BEQ $9482                  ; $9474
    AND #$BF                   ; $9476
    STA $0099                  ; $9478
    LDA #$01                   ; $947A
    TAY                        ; $947C
    STA ($0094),Y              ; $947D
    JMP $94C1                  ; $947F
    .byte $A0,$00,$B1,$94,$29,$FD,$91,$94,$A9,$05,$4C,$AE,$94,$4C,$8F,$94
    .byte $A0,$13,$B1,$94,$F0,$FE,$38,$E9,$01,$91,$94,$0A,$18,$69,$18,$A8
    .byte $B1,$94,$85,$92,$C8,$B1,$94,$85,$93,$4C,$24,$92,$18
    ADC $0092                  ; $94AF
    STA $0092                  ; $94B1
    LDA $0093                  ; $94B3
    ADC #$00                   ; $94B5
    STA $0093                  ; $94B7
    JMP $9224                  ; $94B9
    LDA #$00                   ; $94BC
    TAY                        ; $94BE
    STA ($0094),Y              ; $94BF
    .byte $A5,$94
    CLC                        ; $94C3
    ADC #$20                   ; $94C4
    STA $0094                  ; $94C6
    LDA $0095                  ; $94C8
    ADC #$00                   ; $94CA
    STA $0095                  ; $94CC
    DEC $0096                  ; $94CE
    BEQ $94D5                  ; $94D0
    JMP $9154                  ; $94D2
    JMP $9143                  ; $94D5
    LDY #$00                   ; $94D8
    LDA ($00E6),Y              ; $94DA
    ORA #$80                   ; $94DC
    STA $009E                  ; $94DE
    INY                        ; $94E0
    LDA ($00E6),Y              ; $94E1
    STA $009F                  ; $94E3
    LDY #$02                   ; $94E5
    LDA ($00E6),Y              ; $94E7
    STA $00A0                  ; $94E9
    INY                        ; $94EB
    LDA ($00E6),Y              ; $94EC
    STA $00A1                  ; $94EE
    LDA $00E6                  ; $94F0
    CLC                        ; $94F2
    ADC #$04                   ; $94F3
    STA $00E6                  ; $94F5
    LDA $00E7                  ; $94F7
    ADC #$00                   ; $94F9
    STA $00E7                  ; $94FB
    LDY #$00                   ; $94FD
    LDA ($0094),Y              ; $94FF
    LDY #$10                   ; $9501
    AND #$08                   ; $9503
    BNE $950B                  ; $9505
    LDA $0097                  ; $9507
    STA ($0094),Y              ; $9509
    LDA ($0094),Y              ; $950B
    STA $0098                  ; $950D
    LDA #$00                   ; $950F
    STA $00E8                  ; $9511
    STA $00E9                  ; $9513
    .byte $A0,$00
    LDA ($00E6),Y              ; $9517
    BMI $9589                  ; $9519
    LDX $0098                  ; $951B
    AND #$3C                   ; $951D
    ASL                        ; $951F
    ASL                        ; $9520
    BMI $9533                  ; $9521
    LSR                        ; $9523
    CLC                        ; $9524
    ADC $009A                  ; $9525
    STA $0468,X                ; $9527
    STA $00EA                  ; $952A
    LDA #$00                   ; $952C
    ADC $009B                  ; $952E
    JMP $9541                  ; $9530
    SEC                        ; $9533
    ROR                        ; $9534
    CLC                        ; $9535
    ADC $009A                  ; $9536
    STA $0468,X                ; $9538
    STA $00EA                  ; $953B
    LDA #$00                   ; $953D
    SBC $009B                  ; $953F
    .byte $29,$01
    STA $00EB                  ; $9543
    ASL                        ; $9545
    STA $00EC                  ; $9546
    LDA $00E8                  ; $9548
    STA $046B,X                ; $954A
    LDA $00E9                  ; $954D
    AND #$01                   ; $954F
    ORA $00EC                  ; $9551
    ASL                        ; $9553
    ASL                        ; $9554
    STA $00EC                  ; $9555
    LDY #$00                   ; $9557
    LDA ($00E6),Y              ; $9559
    EOR ($0094),Y              ; $955B
    AND #$40                   ; $955D
    ORA $00EC                  ; $955F
    STA $00EC                  ; $9561
    LDA ($00E6),Y              ; $9563
    AND #$03                   ; $9565
    ORA $00EC                  ; $9567
    STA $046A,X                ; $9569
    INY                        ; $956C
    LDA ($00E6),Y              ; $956D
    STA $0469,X                ; $956F
    LDA $0098                  ; $9572
    CLC                        ; $9574
    ADC #$04                   ; $9575
    STA $0098                  ; $9577
    LDA $00E6                  ; $9579
    CLC                        ; $957B
    ADC #$02                   ; $957C
    STA $00E6                  ; $957E
    LDA $00E7                  ; $9580
    ADC #$00                   ; $9582
    STA $00E7                  ; $9584
    JMP $9515                  ; $9586
    CMP #$A0                   ; $9589
    BCS $95AF                  ; $958B
    LDX #$00                   ; $958D
    ASL                        ; $958F
    ASL                        ; $9590
    ASL                        ; $9591
    STA $00EA                  ; $9592
    BPL $9597                  ; $9594
    DEX                        ; $9596
    STX $00EB                  ; $9597
    LDA $009A                  ; $9599
    CLC                        ; $959B
    ADC $00EA                  ; $959C
    STA $00EA                  ; $959E
    LDA $009B                  ; $95A0
    ADC $00EB                  ; $95A2
    STA $00EB                  ; $95A4
    INC $00E6                  ; $95A6
    BNE $95AC                  ; $95A8
    .byte $E6,$E7
    JMP $9515                  ; $95AC
    CMP #$C0                   ; $95AF
    BCS $95E5                  ; $95B1
    TAX                        ; $95B3
    LDY #$00                   ; $95B4
    LDA ($0094),Y              ; $95B6
    ASL                        ; $95B8
    BPL $95C2                  ; $95B9
    TXA                        ; $95BB
    EOR #$FF                   ; $95BC
    CLC                        ; $95BE
    ADC #$01                   ; $95BF
    TAX                        ; $95C1
    TXA                        ; $95C2
    LDX #$00                   ; $95C3
    ASL                        ; $95C5
    ASL                        ; $95C6
    ASL                        ; $95C7
    STA $00E8                  ; $95C8
    BPL $95CD                  ; $95CA
    DEX                        ; $95CC
    STX $00E9                  ; $95CD
    LDA $009C                  ; $95CF
    CLC                        ; $95D1
    ADC $00E8                  ; $95D2
    STA $00E8                  ; $95D4
    LDA $009D                  ; $95D6
    ADC $00E9                  ; $95D8
    STA $00E9                  ; $95DA
    INC $00E6                  ; $95DC
    BNE $95E2                  ; $95DE
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
    LDA $0000,X                ; $9EEF
    BEQ $9EFB                  ; $9EF1
    CMP #$FF                   ; $9EF3
    BEQ $9F52                  ; $9EF5
    DEC $0000,X                ; $9EF7
    BEQ $9F0F                  ; $9EF9
    .byte $8A
    CLC                        ; $9EFC
    ADC #$04                   ; $9EFD
    TAX                        ; $9EFF
    CPX #$19                   ; $9F00
    BNE $9EEF                  ; $9F02
    LDA $001B                  ; $9F04
    BPL $9F04                  ; $9F06
    AND #$7F                   ; $9F08
    STA $001B                  ; $9F0A
    JMP $9EED                  ; $9F0C
    STX $0000                  ; $9F0F
    LDA #$07                   ; $9F11
    ORA $0022                  ; $9F13
    STA $0023                  ; $9F15
    STA $8000                  ; $9F17
    LDA $0003,X                ; $9F1A
    STA $0025                  ; $9F1C
    STA $8001                  ; $9F1E
    LDA #$06                   ; $9F21
    ORA $0022                  ; $9F23
    STA $0023                  ; $9F25
    STA $8000                  ; $9F27
    LDA $0002,X                ; $9F2A
    STA $0024                  ; $9F2C
    STA $8001                  ; $9F2E
    LDA $0001,X                ; $9F31
    TAX                        ; $9F33
    TXS                        ; $9F34
    PLA                        ; $9F35
    STA $00E6                  ; $9F36
    PLA                        ; $9F38
    STA $00E7                  ; $9F39
    PLA                        ; $9F3B
    STA $00E8                  ; $9F3C
    PLA                        ; $9F3E
    STA $00E9                  ; $9F3F
    PLA                        ; $9F41
    STA $00EA                  ; $9F42
    PLA                        ; $9F44
    STA $00EB                  ; $9F45
    PLA                        ; $9F47
    STA $00EC                  ; $9F48
    PLA                        ; $9F4A
    STA $00ED                  ; $9F4B
    PLA                        ; $9F4D
    TAY                        ; $9F4E
    PLA                        ; $9F4F
    TAX                        ; $9F50
    RTS                        ; $9F51
    STX $0000                  ; $9F52
    LDA #$06                   ; $9F54
    ORA $0022                  ; $9F56
    STA $0023                  ; $9F58
    STA $8000                  ; $9F5A
    LDA $0002,X                ; $9F5D
    STA $0024                  ; $9F5F
    STA $8001                  ; $9F61
    LDA $0001,X                ; $9F64
    .byte $AA
    TXS                        ; $9F67
    RTS                        ; $9F68
    STA $0002,X                ; $9F69
    DEY                        ; $9F6B
    DEY                        ; $9F6C
    LDA $0000,X                ; $9F6D
    STA $0101,Y                ; $9F6F
    LDA $0001,X                ; $9F72
    STA $0102,Y                ; $9F74
    STY $0001,X                ; $9F77
    LDA #$FF                   ; $9F79
    STA $0000,X                ; $9F7B
    RTS                        ; $9F7D
    .byte $A9,$00
    LDX $0000                  ; $9F80
    STA $0000,X                ; $9F82
    STA $0001,X                ; $9F84
    JMP $9EFB                  ; $9F86
    LDA $0001,X                ; $9F89
    BEQ $9F95                  ; $9F8B
    LDA $0000,X                ; $9F8D
    BNE $9F95                  ; $9F8F
    LDA #$01                   ; $9F91
    STA $0000,X                ; $9F93
    RTS                        ; $9F95
    LDA $0000,X                ; $9F96
    CMP #$FF                   ; $9F98
    BNE $9FA1                  ; $9F9A
    LDA #$01                   ; $9F9C
    JSR $9FA8                  ; $9F9E
    LDA #$00                   ; $9FA1
    STA $0000,X                ; $9FA3
    RTS                        ; $9FA5
    .byte $A9,$00
    STA $0019                  ; $9FA8
    TXA                        ; $9FAA
    PHA                        ; $9FAB
    TYA                        ; $9FAC
    PHA                        ; $9FAD
    LDA $00ED                  ; $9FAE
    PHA                        ; $9FB0
    LDA $00EC                  ; $9FB1
    PHA                        ; $9FB3
    LDA $00EB                  ; $9FB4
    PHA                        ; $9FB6
    LDA $00EA                  ; $9FB7
    PHA                        ; $9FB9
    LDA $00E9                  ; $9FBA
    PHA                        ; $9FBC
    LDA $00E8                  ; $9FBD
    PHA                        ; $9FBF
    LDA $00E7                  ; $9FC0
    PHA                        ; $9FC2
    LDA $00E6                  ; $9FC3
    PHA                        ; $9FC5
    TSX                        ; $9FC6
    TXA                        ; $9FC7
    LDX $0000                  ; $9FC8
    STA $0001,X                ; $9FCA
    LDA a: $0024               ; $9FCC
    STA $0002,X                ; $9FCF
    LDA a: $0025               ; $9FD1
    STA $0003,X                ; $9FD4
    LDA $0019                  ; $9FD6
    BEQ $9FDE                  ; $9FD8
    CMP #$FF                   ; $9FDA
    BNE $9FE0                  ; $9FDC
    LDA #$FE                   ; $9FDE
    STA $0000,X                ; $9FE0
    JMP $9EFB                  ; $9FE2
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
