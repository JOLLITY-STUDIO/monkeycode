; ============================================================
; bank20/bank20.s
; bank 20 - 真实 6502 汇编 (8KB)
; CPU 地址范围: $8000-$9FFF
; 源: _tmp_bzk_out/bank_20/bank_20_partMM.asm
; 代码=助记符, 数据=.byte, build_nes.py 可直接编译
; ============================================================

.segment "PRG_BANK20"
.org $8000

    .byte $4C,$0F,$80
    JMP $84DC                  ; $8003
    JMP $83D9                  ; $8006
    JMP $8624                  ; $8009
    JMP $8796                  ; $800C
    .byte $AD,$3A,$05
    BEQ $8083                  ; $8012
    BPL $8067                  ; $8014
    LDX #$01                   ; $8016
    STX $053A                  ; $8018
    LDA $053C                  ; $801B
    LDX #$68                   ; $801E
    STX $004C                  ; $8020
    LDX #$89                   ; $8022
    STX $004D                  ; $8024
    ASL                        ; $8026
    BCC $802B                  ; $8027
    INC $004D                  ; $8029
    TAY                        ; $802B
    LDA ($004C),Y              ; $802C
    TAX                        ; $802E
    INY                        ; $802F
    LDA ($004C),Y              ; $8030
    STX $004C                  ; $8032
    STA $004D                  ; $8034
    LDX #$00                   ; $8036
    LDA #$00                   ; $8038
    STA $0547,X                ; $803A
    TXA                        ; $803D
    CLC                        ; $803E
    ADC #$15                   ; $803F
    TAX                        ; $8041
    CMP #$7E                   ; $8042
    BNE $8038                  ; $8044
    LDA #$01                   ; $8046
    STA $053B                  ; $8048
    LDA #$00                   ; $804B
    STA $053D                  ; $804D
    STA $0540                  ; $8050
    LDA #$FF                   ; $8053
    STA $0541                  ; $8055
    LDA #$01                   ; $8058
    STA $0543                  ; $805A
    LDA #$23                   ; $805D
    STA $0544                  ; $805F
    LDA #$45                   ; $8062
    STA $0545                  ; $8064
    DEC $053B                  ; $8067
    BEQ $806D                  ; $806A
    RTS                        ; $806C
    .byte $A0,$00
    LDA ($004C),Y              ; $806F
    CMP #$F0                   ; $8071
    BCC $807B                  ; $8073
    JSR $8084                  ; $8075
    JMP $806D                  ; $8078
    STA $053B                  ; $807B
    LDA #$01                   ; $807E
    JSR $83CF                  ; $8080
    RTS                        ; $8083
    SEC                        ; $8084
    SBC #$F0                   ; $8085
    JSR $C509                  ; $8087
    .byte $A2,$80,$AA,$80,$2B,$81,$38,$81,$42,$81,$53,$81,$AE,$83,$BD,$83
    .byte $6F,$81,$7C,$81,$95,$81,$A9,$81,$68
    PLA                        ; $80A3
    LDA #$00                   ; $80A4
    STA $053A                  ; $80A6
    RTS                        ; $80A9
    .byte $A0,$05
    LDA ($004C),Y              ; $80AC
    AND #$1C                   ; $80AE
    LSR                        ; $80B0
    TAX                        ; $80B1
    LDA $88E4,X                ; $80B2
    STA $003A                  ; $80B5
    LDA $88E5,X                ; $80B7
    STA $003B                  ; $80BA
    LDY #$00                   ; $80BC
    TYA                        ; $80BE
    STA ($003A),Y              ; $80BF
    INY                        ; $80C1
    CPY #$15                   ; $80C2
    BNE $80BF                  ; $80C4
    LDY #$01                   ; $80C6
    LDA ($004C),Y              ; $80C8
    LDX #$B4                   ; $80CA
    STX $003E                  ; $80CC
    LDX #$A1                   ; $80CE
    ASL                        ; $80D0
    BCC $80D4                  ; $80D1
    INX                        ; $80D3
    STX $003F                  ; $80D4
    TAY                        ; $80D6
    LDA ($003E),Y              ; $80D7
    TAX                        ; $80D9
    INY                        ; $80DA
    LDA ($003E),Y              ; $80DB
    LDY #$02                   ; $80DD
    STA ($003A),Y              ; $80DF
    DEY                        ; $80E1
    TXA                        ; $80E2
    STA ($003A),Y              ; $80E3
    LDY #$02                   ; $80E5
    LDA ($004C),Y              ; $80E7
    LDX #$47                   ; $80E9
    STX $003E                  ; $80EB
    LDX #$AC                   ; $80ED
    ASL                        ; $80EF
    BCC $80F3                  ; $80F0
    INX                        ; $80F2
    STX $003F                  ; $80F3
    TAY                        ; $80F5
    LDA ($003E),Y              ; $80F6
    TAX                        ; $80F8
    INY                        ; $80F9
    LDA ($003E),Y              ; $80FA
    LDY #$04                   ; $80FC
    STA ($003A),Y              ; $80FE
    DEY                        ; $8100
    TXA                        ; $8101
    STA ($003A),Y              ; $8102
    LDY #$03                   ; $8104
    LDA ($004C),Y              ; $8106
    LDY #$08                   ; $8108
    STA ($003A),Y              ; $810A
    LDY #$04                   ; $810C
    LDA ($004C),Y              ; $810E
    LDY #$0C                   ; $8110
    STA ($003A),Y              ; $8112
    LDY #$05                   ; $8114
    LDA ($004C),Y              ; $8116
    TAX                        ; $8118
    AND #$03                   ; $8119
    STA $003C                  ; $811B
    ORA $003C                  ; $811D
    ORA #$80                   ; $811F
    LDY #$00                   ; $8121
    STA ($003A),Y              ; $8123
    LDA #$06                   ; $8125
    JSR $83CF                  ; $8127
    RTS                        ; $812A
    .byte $A9,$00,$8D,$3E,$05,$A9,$01,$8D,$3D,$05,$4C,$CF,$83,$A9,$00,$8D
    .byte $3D,$05,$A9,$01,$4C,$CF,$83,$A0,$01
    LDA ($004C),Y              ; $8144
    STA $0493,Y                ; $8146
    INY                        ; $8149
    CPY #$05                   ; $814A
    BNE $8144                  ; $814C
    LDA #$05                   ; $814E
    JMP $83CF                  ; $8150
    .byte $A0,$01
    LDA ($004C),Y              ; $8155
    BPL $815F                  ; $8157
    JSR $81BA                  ; $8159
    JMP $8164                  ; $815C
    LDX #$10                   ; $815F
    JSR $C530                  ; $8161
    .byte $20,$33,$C5,$00,$6C,$04
    LDA #$02                   ; $816A
    JMP $83CF                  ; $816C
    .byte $A0,$01
    LDA ($004C),Y              ; $8171
    TAX                        ; $8173
    INY                        ; $8174
    LDA ($004C),Y              ; $8175
    STX $004C                  ; $8177
    STA $004D                  ; $8179
    RTS                        ; $817B
    .byte $A0,$01
    LDA ($004C),Y              ; $817E
    STA $0542                  ; $8180
    INY                        ; $8183
    TYA                        ; $8184
    CLC                        ; $8185
    ADC $004C                  ; $8186
    STA $004E                  ; $8188
    LDA $004D                  ; $818A
    ADC #$00                   ; $818C
    STA $004F                  ; $818E
    LDA #$02                   ; $8190
    JMP $83CF                  ; $8192
    .byte $A9,$01
    DEC $0542                  ; $8197
    BEQ $81A6                  ; $819A
    LDA $004E                  ; $819C
    STA $004C                  ; $819E
    LDA $004F                  ; $81A0
    STA $004D                  ; $81A2
    LDA #$00                   ; $81A4
    JMP $83CF                  ; $81A6
    .byte $A0,$01
    LDA ($004C),Y              ; $81AB
    STA $0542,Y                ; $81AD
    INY                        ; $81B0
    CPY #$04                   ; $81B1
    BNE $81AB                  ; $81B3
    LDA #$04                   ; $81B5
    JMP $83CF                  ; $81B7
    AND #$7F                   ; $81BA
    JSR $C509                  ; $81BC
    .byte $CF,$81,$E9,$81,$DB,$81,$E1,$81,$BC,$82,$7F,$83,$7F,$83,$D5,$81
    .byte $AD,$41,$04
    JMP $81EC                  ; $81D2
    .byte $AD,$FC,$05
    JMP $81EC                  ; $81D8
    .byte $AD,$FB,$05
    JMP $81EC                  ; $81DE
    .byte $AD,$FB,$05
    EOR #$0B                   ; $81E4
    JMP $81EC                  ; $81E6
    .byte $AD,$42,$04,$85,$3A
    JSR $C50C                  ; $81EE
    JSR $826A                  ; $81F1
    LDY #$00                   ; $81F4
    LDA ($0034),Y              ; $81F6
    BEQ $8201                  ; $81F8
    JSR $8282                  ; $81FA
    LDX #$00                   ; $81FD
    BEQ $8213                  ; $81FF
    LDA a: $002B               ; $8201
    SEC                        ; $8204
    SBC #$03                   ; $8205
    LDX #$02                   ; $8207
    LDY $003A                  ; $8209
    BEQ $8211                  ; $820B
    CPY #$0B                   ; $820D
    BNE $8213                  ; $820F
    LDX #$04                   ; $8211
    STA $003A                  ; $8213
    LDY #$00                   ; $8215
    STY $003B                  ; $8217
    TAY                        ; $8219
    ASL                        ; $821A
    ROL $003B                  ; $821B
    ASL                        ; $821D
    ROL $003B                  ; $821E
    ADC $003A                  ; $8220
    STA $003A                  ; $8222
    LDA #$00                   ; $8224
    ADC $003B                  ; $8226
    STA $003B                  ; $8228
    CLC                        ; $822A
    LDA $003A                  ; $822B
    ADC $8264,X                ; $822D
    STA $003A                  ; $8230
    LDA $003B                  ; $8232
    ADC $8265,X                ; $8234
    STA $003B                  ; $8237
    LDY #$00                   ; $8239
    LDA ($003A),Y              ; $823B
    INY                        ; $823D
    PHA                        ; $823E
    LDX #$00                   ; $823F
    TXA                        ; $8241
    AND #$03                   ; $8242
    BEQ $825D                  ; $8244
    CMP #$01                   ; $8246
    BEQ $8258                  ; $8248
    CMP #$02                   ; $824A
    BEQ $8253                  ; $824C
    PLA                        ; $824E
    PHA                        ; $824F
    JMP $825A                  ; $8250
    LDA ($003A),Y              ; $8253
    INY                        ; $8255
    BNE $825A                  ; $8256
    LDA #$0F                   ; $8258
    .byte $9D,$7F,$04
    INX                        ; $825D
    CPX #$10                   ; $825E
    BNE $8241                  ; $8260
    PLA                        ; $8262
    RTS                        ; $8263
    .byte $0C,$B8,$C7,$B6,$67,$B7
    LDY #$00                   ; $826A
    LDA ($0034),Y              ; $826C
    PHP                        ; $826E
    TAX                        ; $826F
    LDA $88F0,X                ; $8270
    PLP                        ; $8273
    BNE $827E                  ; $8274
    LDX $003A                  ; $8276
    CPX #$0B                   ; $8278
    BNE $827E                  ; $827A
    LDA #$04                   ; $827C
    STA $0546                  ; $827E
    RTS                        ; $8281
    LDX #$01                   ; $8282
    STA $003B                  ; $8284
    CMP #$01                   ; $8286
    BEQ $8296                  ; $8288
    LDX #$00                   ; $828A
    CMP #$0F                   ; $828C
    BCC $8296                  ; $828E
    CMP #$17                   ; $8290
    BCS $8296                  ; $8292
    LDX #$02                   ; $8294
    TXA                        ; $8296
    JSR $C509                  ; $8297
    .byte $A0,$82,$A3,$82,$AD,$82,$A5,$3B
    RTS                        ; $82A2
    .byte $A9,$01
    LDX a: $002A               ; $82A5
    BEQ $82AC                  ; $82A8
    LDA #$76                   ; $82AA
    RTS                        ; $82AC
    .byte $A9,$00
    LDX a: $002A               ; $82AF
    CPX #$01                   ; $82B2
    BEQ $82B8                  ; $82B4
    LDA #$68                   ; $82B6
    CLC                        ; $82B8
    ADC $003B                  ; $82B9
    RTS                        ; $82BB
    .byte $A0,$02
    LDA ($004C),Y              ; $82BE
    BPL $82C5                  ; $82C0
    JSR $8316                  ; $82C2
    LDX #$00                   ; $82C5
    STX $003B                  ; $82C7
    ASL                        ; $82C9
    ROL $003B                  ; $82CA
    ASL                        ; $82CC
    ROL $003B                  ; $82CD
    ASL                        ; $82CF
    ROL $003B                  ; $82D0
    ASL                        ; $82D2
    ROL $003B                  ; $82D3
    ADC #$CF                   ; $82D5
    STA $003A                  ; $82D7
    LDA $003B                  ; $82D9
    ADC #$BA                   ; $82DB
    STA $003B                  ; $82DD
    LDA $82F6,X                ; $82DF
    BPL $82E9                  ; $82E2
    AND #$7F                   ; $82E4
    TAY                        ; $82E6
    LDA ($003A),Y              ; $82E7
    STA $046F,X                ; $82E9
    INX                        ; $82EC
    CPX #$20                   ; $82ED
    BNE $82DF                  ; $82EF
    LDA #$01                   ; $82F1
    JMP $83CF                  ; $82F3
    .byte $0F,$0F,$0F,$30,$0F,$21,$89,$8A,$0F,$21,$8B,$8C,$0F,$21,$8D,$8E
    .byte $0F,$0F,$80,$81,$0F,$0F,$82,$83,$0F,$0F,$84,$85,$0F,$86,$87,$88
    AND #$7F                   ; $8316
    JSR $C509                  ; $8318
    .byte $2B,$83,$35,$83,$42,$83,$47,$83,$61,$83,$65,$83,$6A,$83,$7B,$83
    .byte $A9,$00
    LDX a: $002A               ; $832D
    BEQ $8334                  ; $8330
    LDA #$01                   ; $8332
    RTS                        ; $8334
    .byte $A9,$03,$AE,$2A,$00
    CPX #$01                   ; $833A
    BEQ $8341                  ; $833C
    CLC                        ; $833E
    ADC #$01                   ; $833F
    RTS                        ; $8341
    .byte $A9,$05
    JMP $8337                  ; $8344
    .byte $18
    PHP                        ; $8348
    LDA #$2E                   ; $8349
    LDX a: $002B               ; $834B
    CPX #$12                   ; $834E
    BEQ $835D                  ; $8350
    LDA #$07                   ; $8352
    LDX a: $002A               ; $8354
    CPX #$01                   ; $8357
    BEQ $835D                  ; $8359
    LDA #$09                   ; $835B
    PLP                        ; $835D
    ADC #$00                   ; $835E
    RTS                        ; $8360
    .byte $38
    JMP $8348                  ; $8362
    .byte $A9,$0B
    JMP $8337                  ; $8367
    .byte $18,$08,$A9,$15,$AE,$2A,$00,$E0,$02,$F0,$02,$A9,$26,$28,$69,$00
    .byte $60,$38,$4C,$6B,$83,$A2,$00
    LDA $05FB                  ; $8381
    BEQ $8387                  ; $8384
    INX                        ; $8386
    LDA a: $002A,X             ; $8387
    ASL                        ; $838A
    TAY                        ; $838B
    LDX #$00                   ; $838C
    LDA $83A6,X                ; $838E
    STA $047F,X                ; $8391
    INX                        ; $8394
    CPX #$08                   ; $8395
    BNE $838E                  ; $8397
    LDA $BA87,Y                ; $8399
    STA $0481                  ; $839C
    LDA $BA88,Y                ; $839F
    STA $0482                  ; $83A2
    RTS                        ; $83A5
    .byte $0F,$0F,$00,$00,$0F,$0F,$30,$00,$A0,$01
    LDA ($004C),Y              ; $83B0
    TAX                        ; $83B2
    LDA #$00                   ; $83B3
    STA $0547,X                ; $83B5
    LDA #$02                   ; $83B8
    JMP $83CF                  ; $83BA
    .byte $A0,$01
    LDA ($004C),Y              ; $83BF
    STA $0540                  ; $83C1
    INY                        ; $83C4
    LDA ($004C),Y              ; $83C5
    STA $0541                  ; $83C7
    LDA #$03                   ; $83CA
    JMP $83CF                  ; $83CC
    .byte $18
    ADC $004C                  ; $83D0
    STA $004C                  ; $83D2
    BCC $83D8                  ; $83D4
    INC $004D                  ; $83D6
    RTS                        ; $83D8
    .byte $A0,$10
    LDA ($003C),Y              ; $83DB
    BEQ $83E9                  ; $83DD
    CMP #$FF                   ; $83DF
    BEQ $83E8                  ; $83E1
    SEC                        ; $83E3
    SBC #$01                   ; $83E4
    STA ($003C),Y              ; $83E6
    RTS                        ; $83E8
    LDY #$00                   ; $83E9
    LDA ($003C),Y              ; $83EB
    AND #$9F                   ; $83ED
    STA ($003C),Y              ; $83EF
    LDY #$13                   ; $83F1
    LDA #$00                   ; $83F3
    STA ($003C),Y              ; $83F5
    INY                        ; $83F7
    STA ($003C),Y              ; $83F8
    LDY #$03                   ; $83FA
    LDA ($003C),Y              ; $83FC
    STA $003E                  ; $83FE
    INY                        ; $8400
    LDA ($003C),Y              ; $8401
    STA $003F                  ; $8403
    LDY #$00                   ; $8405
    STY $0040                  ; $8407
    .byte $A4,$40
    INC $0040                  ; $840B
    LDA ($003E),Y              ; $840D
    CMP #$F0                   ; $840F
    BCC $8419                  ; $8411
    JSR $8438                  ; $8413
    JMP $8409                  ; $8416
    TAX                        ; $8419
    INY                        ; $841A
    TYA                        ; $841B
    PHA                        ; $841C
    LDA ($003E),Y              ; $841D
    LDY #$12                   ; $841F
    STA ($003C),Y              ; $8421
    TXA                        ; $8423
    LDY #$10                   ; $8424
    STA ($003C),Y              ; $8426
    PLA                        ; $8428
    LDY #$03                   ; $8429
    SEC                        ; $842B
    ADC $003E                  ; $842C
    STA ($003C),Y              ; $842E
    INY                        ; $8430
    LDA #$00                   ; $8431
    ADC $003F                  ; $8433
    STA ($003C),Y              ; $8435
    RTS                        ; $8437
    SEC                        ; $8438
    SBC #$F0                   ; $8439
    JSR $C509                  ; $843B
    .byte $50,$84,$59,$84,$5D,$84,$66,$84,$77,$84,$96,$84,$B3,$84,$C7,$84
    .byte $D2,$84,$A0,$10
    LDA #$FF                   ; $8452
    STA ($003C),Y              ; $8454
    PLA                        ; $8456
    PLA                        ; $8457
    RTS                        ; $8458
    .byte $A9,$20
    BNE $845F                  ; $845B
    .byte $A9,$40
    LDY #$00                   ; $845F
    ORA ($003C),Y              ; $8461
    STA ($003C),Y              ; $8463
    RTS                        ; $8465
    .byte $A4,$40
    LDA ($003E),Y              ; $8468
    TAX                        ; $846A
    INY                        ; $846B
    LDA ($003E),Y              ; $846C
    STA $003F                  ; $846E
    STX $003E                  ; $8470
    LDA #$00                   ; $8472
    STA $0040                  ; $8474
    RTS                        ; $8476
    .byte $A4,$40
    LDA ($003E),Y              ; $8479
    PHA                        ; $847B
    INY                        ; $847C
    STY $0040                  ; $847D
    TYA                        ; $847F
    LDX $003F                  ; $8480
    CLC                        ; $8482
    ADC $003E                  ; $8483
    BCC $8488                  ; $8485
    .byte $E8
    LDY #$0E                   ; $8488
    STA ($003C),Y              ; $848A
    TXA                        ; $848C
    INY                        ; $848D
    STA ($003C),Y              ; $848E
    LDY #$0D                   ; $8490
    PLA                        ; $8492
    STA ($003C),Y              ; $8493
    RTS                        ; $8495
    .byte $A0,$0D
    LDA ($003C),Y              ; $8498
    SEC                        ; $849A
    SBC #$01                   ; $849B
    BNE $84A0                  ; $849D
    RTS                        ; $849F
    STA ($003C),Y              ; $84A0
    LDY #$0E                   ; $84A2
    LDA ($003C),Y              ; $84A4
    TAX                        ; $84A6
    INY                        ; $84A7
    LDA ($003C),Y              ; $84A8
    STA $003F                  ; $84AA
    STX $003E                  ; $84AC
    LDA #$00                   ; $84AE
    STA $0040                  ; $84B0
    RTS                        ; $84B2
    .byte $A4,$40
    LDA ($003E),Y              ; $84B5
    TAX                        ; $84B7
    INY                        ; $84B8
    LDA ($003E),Y              ; $84B9
    INY                        ; $84BB
    STY $0040                  ; $84BC
    LDY #$14                   ; $84BE
    STA ($003C),Y              ; $84C0
    DEY                        ; $84C2
    TXA                        ; $84C3
    STA ($003C),Y              ; $84C4
    RTS                        ; $84C6
    .byte $A4,$40
    LDA ($003E),Y              ; $84C9
    LDY #$12                   ; $84CB
    STA ($003C),Y              ; $84CD
    JMP $8450                  ; $84CF
    .byte $A4,$40
    INC $0040                  ; $84D4
    LDA ($003E),Y              ; $84D6
    STA $0546                  ; $84D8
    RTS                        ; $84DB
    .byte $A0,$11
    LDA ($003C),Y              ; $84DE
    BEQ $84EF                  ; $84E0
    CMP #$FF                   ; $84E2
    BNE $84E7                  ; $84E4
    RTS                        ; $84E6
    SEC                        ; $84E7
    SBC #$01                   ; $84E8
    STA ($003C),Y              ; $84EA
    JMP $852A                  ; $84EC
    STA $0040                  ; $84EF
    LDY #$01                   ; $84F1
    LDA ($003C),Y              ; $84F3
    STA $003E                  ; $84F5
    INY                        ; $84F7
    LDA ($003C),Y              ; $84F8
    STA $003F                  ; $84FA
    LDY #$00                   ; $84FC
    LDA ($003C),Y              ; $84FE
    AND #$10                   ; $8500
    BEQ $850F                  ; $8502
    LDA #$04                   ; $8504
    CLC                        ; $8506
    ADC $003E                  ; $8507
    STA $003E                  ; $8509
    BCC $850F                  ; $850B
    INC $003F                  ; $850D
    LDY #$00                   ; $850F
    LDA ($003C),Y              ; $8511
    AND #$EF                   ; $8513
    STA ($003C),Y              ; $8515
    JSR $857A                  ; $8517
    LDA $0040                  ; $851A
    LDY #$01                   ; $851C
    CLC                        ; $851E
    ADC $003E                  ; $851F
    STA ($003C),Y              ; $8521
    INY                        ; $8523
    LDA $003F                  ; $8524
    ADC #$00                   ; $8526
    STA ($003C),Y              ; $8528
    .byte $A9,$00
    STA $0042                  ; $852C
    STA $0043                  ; $852E
    LDY #$00                   ; $8530
    LDA ($003C),Y              ; $8532
    AND #$FC                   ; $8534
    STA $0041                  ; $8536
    LDA ($003C),Y              ; $8538
    LSR                        ; $853A
    ROL $0042                  ; $853B
    LSR                        ; $853D
    ROL $0043                  ; $853E
    LDX #$00                   ; $8540
    LDY #$05                   ; $8542
    JSR $85F2                  ; $8544
    LDX #$01                   ; $8547
    LDY #$09                   ; $8549
    JSR $85F2                  ; $854B
    LDA #$00                   ; $854E
    LSR $0043                  ; $8550
    ROL                        ; $8552
    LSR $0042                  ; $8553
    ROL                        ; $8555
    ORA $0041                  ; $8556
    LDY #$00                   ; $8558
    STA ($003C),Y              ; $855A
    AND #$10                   ; $855C
    BEQ $8579                  ; $855E
    LDY #$01                   ; $8560
    LDA ($003C),Y              ; $8562
    STA $003E                  ; $8564
    INY                        ; $8566
    LDA ($003C),Y              ; $8567
    STA $003F                  ; $8569
    LDX #$05                   ; $856B
    LDY #$01                   ; $856D
    JSR $860D                  ; $856F
    LDX #$09                   ; $8572
    LDY #$03                   ; $8574
    JSR $860D                  ; $8576
    RTS                        ; $8579
    .byte $A4,$40
    INC $0040                  ; $857C
    LDA ($003E),Y              ; $857E
    JSR $C509                  ; $8580
    .byte $A0,$85,$A9,$85,$D5,$85,$E1,$85,$8D,$85,$A4,$40
    LDA ($003E),Y              ; $858F
    TAX                        ; $8591
    INY                        ; $8592
    LDA ($003E),Y              ; $8593
    STA $003F                  ; $8595
    STX $003E                  ; $8597
    LDA #$00                   ; $8599
    STA $0040                  ; $859B
    JMP $857A                  ; $859D
    .byte $A0,$11
    LDA #$FF                   ; $85A2
    STA ($003C),Y              ; $85A4
    PLA                        ; $85A6
    PLA                        ; $85A7
    RTS                        ; $85A8
    .byte $20,$E7,$85
    LDY $0040                  ; $85AC
    LDA ($003E),Y              ; $85AE
    TAX                        ; $85B0
    INY                        ; $85B1
    LDA ($003E),Y              ; $85B2
    INY                        ; $85B4
    STY $0040                  ; $85B5
    LDY #$07                   ; $85B7
    STA ($003C),Y              ; $85B9
    DEY                        ; $85BB
    DEY                        ; $85BC
    TXA                        ; $85BD
    STA ($003C),Y              ; $85BE
    LDY $0040                  ; $85C0
    LDA ($003E),Y              ; $85C2
    TAX                        ; $85C4
    INY                        ; $85C5
    LDA ($003E),Y              ; $85C6
    INY                        ; $85C8
    STY $0040                  ; $85C9
    LDY #$0B                   ; $85CB
    STA ($003C),Y              ; $85CD
    DEY                        ; $85CF
    DEY                        ; $85D0
    TXA                        ; $85D1
    STA ($003C),Y              ; $85D2
    RTS                        ; $85D4
    .byte $20,$E7,$85,$A0,$00
    LDA ($003C),Y              ; $85DA
    ORA #$10                   ; $85DC
    STA ($003C),Y              ; $85DE
    RTS                        ; $85E0
    .byte $20,$A9,$85
    JMP $85D8                  ; $85E4
    LDY $0040                  ; $85E7
    LDA ($003E),Y              ; $85E9
    LDY #$11                   ; $85EB
    STA ($003C),Y              ; $85ED
    INC $0040                  ; $85EF
    RTS                        ; $85F1
    CLC                        ; $85F2
    LDA ($003C),Y              ; $85F3
    INY                        ; $85F5
    ADC ($003C),Y              ; $85F6
    STA ($003C),Y              ; $85F8
    INY                        ; $85FA
    LDA ($003C),Y              ; $85FB
    BPL $8601                  ; $85FD
    DEC $0042,X                ; $85FF
    INY                        ; $8601
    ADC ($003C),Y              ; $8602
    STA ($003C),Y              ; $8604
    LDA $0042,X                ; $8606
    ADC #$00                   ; $8608
    STA $0042,X                ; $860A
    RTS                        ; $860C
    LDA ($003E),Y              ; $860D
    PHA                        ; $860F
    DEY                        ; $8610
    LDA ($003E),Y              ; $8611
    PHA                        ; $8613
    TXA                        ; $8614
    TAY                        ; $8615
    PLA                        ; $8616
    CLC                        ; $8617
    ADC ($003C),Y              ; $8618
    STA ($003C),Y              ; $861A
    INY                        ; $861C
    INY                        ; $861D
    PLA                        ; $861E
    ADC ($003C),Y              ; $861F
    STA ($003C),Y              ; $8621
    RTS                        ; $8623
    .byte $AD,$2D,$06
    AND #$0F                   ; $8627
    CMP #$05                   ; $8629
    BNE $8630                  ; $862B
    JMP $8861                  ; $862D
    JSR $8753                  ; $8630
    LDA #$00                   ; $8633
    STA $0046                  ; $8635
    .byte $A5,$46
    BNE $863E                  ; $8639
    JMP $86CF                  ; $863B
    CMP #$0B                   ; $863E
    BNE $8645                  ; $8640
    JMP $86CF                  ; $8642
    JSR $86DB                  ; $8645
    BCS $864D                  ; $8648
    JMP $86CF                  ; $864A
    LDX $003B                  ; $864D
    LDY #$06                   ; $864F
    LDA ($0034),Y              ; $8651
    CMP #$34                   ; $8653
    BCS $8659                  ; $8655
    LDA #$34                   ; $8657
    CMP #$CC                   ; $8659
    BCC $865F                  ; $865B
    LDA #$CC                   ; $865D
    PHA                        ; $865F
    LDA $062D                  ; $8660
    AND #$0F                   ; $8663
    TAY                        ; $8665
    PLA                        ; $8666
    CLC                        ; $8667
    ADC $88DA,Y                ; $8668
    STA $0203,X                ; $866B
    LDY #$08                   ; $866E
    LDA ($0034),Y              ; $8670
    CMP #$54                   ; $8672
    BCS $8678                  ; $8674
    LDA #$54                   ; $8676
    CMP #$AC                   ; $8678
    BCC $867E                  ; $867A
    LDA #$AC                   ; $867C
    PHA                        ; $867E
    LDA $062D                  ; $867F
    AND #$0F                   ; $8682
    TAY                        ; $8684
    PLA                        ; $8685
    CLC                        ; $8686
    ADC $88DF,Y                ; $8687
    STA $0200,X                ; $868A
    LDA #$03                   ; $868D
    STA $0202,X                ; $868F
    BIT $0615                  ; $8692
    BPL $86A8                  ; $8695
    LDA $05FB                  ; $8697
    BEQ $86A8                  ; $869A
    LDA $0046                  ; $869C
    CMP #$0B                   ; $869E
    BCS $86A8                  ; $86A0
    JSR $86F2                  ; $86A2
    JMP $86B5                  ; $86A5
    LDA $0046                  ; $86A8
    CMP $0441                  ; $86AA
    BNE $86B5                  ; $86AD
    JSR $881D                  ; $86AF
    JMP $86C4                  ; $86B2
    .byte $C9,$0B
    BCC $86BB                  ; $86B7
    SBC #$01                   ; $86B9
    CLC                        ; $86BB
    ADC #$11                   ; $86BC
    CMP #$20                   ; $86BE
    BCC $86C4                  ; $86C0
    ADC #$0F                   ; $86C2
    .byte $9D,$01,$02
    INX                        ; $86C7
    INX                        ; $86C8
    INX                        ; $86C9
    INX                        ; $86CA
    STX $003B                  ; $86CB
    INC $0048                  ; $86CD
    .byte $E6,$46
    LDA $0046                  ; $86D1
    CMP #$16                   ; $86D3
    BEQ $86DA                  ; $86D5
    JMP $8637                  ; $86D7
    RTS                        ; $86DA
    JSR $C50C                  ; $86DB
    LDA $062D                  ; $86DE
    AND #$0F                   ; $86E1
    JSR $C509                  ; $86E3
    .byte $1D,$87,$1D,$87,$1F,$87,$3B,$87,$1D,$87,$00,$00
    LDA $0046                  ; $86F2
    CMP $05FD                  ; $86F4
    BNE $871C                  ; $86F7
    LDA $062E                  ; $86F9
    BNE $870F                  ; $86FC
    LDY #$07                   ; $86FE
    LDA $062D                  ; $8700
    EOR #$40                   ; $8703
    STA $062D                  ; $8705
    BVS $870C                  ; $8708
    LDY #$04                   ; $870A
    STY $062E                  ; $870C
    DEC $062E                  ; $870F
    LDA $0046                  ; $8712
    BIT $062D                  ; $8714
    BVS $871C                  ; $8717
    CLC                        ; $8719
    ADC #$0B                   ; $871A
    RTS                        ; $871C
    .byte $38
    RTS                        ; $871E
    .byte $A5,$46
    CMP #$0B                   ; $8721
    BCS $8739                  ; $8723
    CMP $0441                  ; $8725
    BEQ $8739                  ; $8728
    LDX $0430                  ; $872A
    BEQ $8737                  ; $872D
    CMP $0430,X                ; $872F
    BEQ $8739                  ; $8732
    DEX                        ; $8734
    BNE $872F                  ; $8735
    CLC                        ; $8737
    RTS                        ; $8738
    SEC                        ; $8739
    RTS                        ; $873A
    .byte $A5,$46
    CMP $0441                  ; $873D
    BEQ $8751                  ; $8740
    LDX $0600                  ; $8742
    BEQ $874F                  ; $8745
    CMP $0600,X                ; $8747
    BEQ $8751                  ; $874A
    DEX                        ; $874C
    BNE $8747                  ; $874D
    SEC                        ; $874F
    RTS                        ; $8750
    CLC                        ; $8751
    RTS                        ; $8752
    LDA $062D                  ; $8753
    AND #$0F                   ; $8756
    JSR $C509                  ; $8758
    .byte $67,$87,$68,$87,$71,$87,$84,$87,$67,$87,$00,$00,$60,$AD,$24,$06
    JSR $C536                  ; $876B
    JMP $87E7                  ; $876E
    .byte $AD,$FC,$05
    JSR $C50C                  ; $8774
    LDY #$06                   ; $8777
    LDA ($0034),Y              ; $8779
    TAX                        ; $877B
    LDY #$08                   ; $877C
    LDA ($0034),Y              ; $877E
    TAY                        ; $8780
    JMP $87E7                  ; $8781
    .byte $AD,$24,$06
    JSR $87A7                  ; $8787
    PHA                        ; $878A
    LDA $0624                  ; $878B
    JSR $87C7                  ; $878E
    PLA                        ; $8791
    TAX                        ; $8792
    JMP $87E7                  ; $8793
    .byte $A9,$10
    JSR $87A7                  ; $8798
    STA $0635                  ; $879B
    LDA #$10                   ; $879E
    JSR $87C7                  ; $87A0
    STA $0637                  ; $87A3
    RTS                        ; $87A6
    STA $003E                  ; $87A7
    LDA $062C                  ; $87A9
    JSR $C545                  ; $87AC
    STX $003C                  ; $87AF
    STY $003D                  ; $87B1
    LDX $0639                  ; $87B3
    LDY $0635                  ; $87B6
    CLC                        ; $87B9
    TXA                        ; $87BA
    ADC $003C                  ; $87BB
    TAX                        ; $87BD
    TYA                        ; $87BE
    ADC $003D                  ; $87BF
    TAY                        ; $87C1
    DEC $003E                  ; $87C2
    BPL $87B9                  ; $87C4
    RTS                        ; $87C6
    STA $003E                  ; $87C7
    LDA $062C                  ; $87C9
    JSR $C542                  ; $87CC
    STX $003C                  ; $87CF
    STY $003D                  ; $87D1
    LDX $063B                  ; $87D3
    LDY $0637                  ; $87D6
    CLC                        ; $87D9
    TXA                        ; $87DA
    ADC $003C                  ; $87DB
    TAX                        ; $87DD
    TYA                        ; $87DE
    ADC $003D                  ; $87DF
    TAY                        ; $87E1
    DEC $003E                  ; $87E2
    BPL $87D9                  ; $87E4
    RTS                        ; $87E6
    .byte $8A
    CLC                        ; $87E8
    ADC #$FD                   ; $87E9
    LDX $003B                  ; $87EB
    STA $0203,X                ; $87ED
    TYA                        ; $87F0
    CLC                        ; $87F1
    ADC #$C7                   ; $87F2
    STA $0200,X                ; $87F4
    LDA #$3C                   ; $87F7
    LDY $062D                  ; $87F9
    CPY #$83                   ; $87FC
    PHP                        ; $87FE
    LDY #$01                   ; $87FF
    PLP                        ; $8801
    BNE $8808                  ; $8802
    LDY #$03                   ; $8804
    LDA #$11                   ; $8806
    STA $0201,X                ; $8808
    TYA                        ; $880B
    STA $0202,X                ; $880C
    INX                        ; $880F
    INX                        ; $8810
    INX                        ; $8811
    INX                        ; $8812
    STX $003B                  ; $8813
    INC $0048                  ; $8815
    LDA #$01                   ; $8817
    STA $0532                  ; $8819
    RTS                        ; $881C
    LDY $0640                  ; $881D
    BNE $8834                  ; $8820
    LDY $0641                  ; $8822
    INY                        ; $8825
    CPY #$03                   ; $8826
    BNE $882C                  ; $8828
    LDY #$00                   ; $882A
    STY $0641                  ; $882C
    LDA #$04                   ; $882F
    STA $0640                  ; $8831
    LDA #$00                   ; $8834
    LDY $05FB                  ; $8836
    PHP                        ; $8839
    LDY $0641                  ; $883A
    PLP                        ; $883D
    BNE $8847                  ; $883E
    TYA                        ; $8840
    CLC                        ; $8841
    ADC #$03                   ; $8842
    TAY                        ; $8844
    LDA #$80                   ; $8845
    BIT $0637                  ; $8847
    BMI $884E                  ; $884A
    EOR #$80                   ; $884C
    ORA $0202,X                ; $884E
    STA $0202,X                ; $8851
    LDA $885B,Y                ; $8854
    DEC $0640                  ; $8857
    RTS                        ; $885A
    .byte $36,$37,$3D,$3D,$37,$36,$AD,$2C,$00
    ASL                        ; $8864
    STA $0046                  ; $8865
    ASL                        ; $8867
    ASL                        ; $8868
    ADC $0046                  ; $8869
    TAX                        ; $886B
    LDA #$00                   ; $886C
    STA $0046                  ; $886E
    LDY $0046                  ; $8870
    LDA $88D0,Y                ; $8872
    LDY $003B                  ; $8875
    STA $0201,Y                ; $8877
    LDA $88A8,X                ; $887A
    PHA                        ; $887D
    AND #$F0                   ; $887E
    LSR                        ; $8880
    CLC                        ; $8881
    ADC #$A0                   ; $8882
    STA $0203,Y                ; $8884
    PLA                        ; $8887
    AND #$0F                   ; $8888
    ASL                        ; $888A
    ASL                        ; $888B
    ADC #$A2                   ; $888C
    STA $0200,Y                ; $888E
    LDA #$00                   ; $8891
    STA $0202,Y                ; $8893
    INX                        ; $8896
    INY                        ; $8897
    INY                        ; $8898
    INY                        ; $8899
    INY                        ; $889A
    STY $003B                  ; $889B
    INC $0048                  ; $889D
    INC $0046                  ; $889F
    LDA $0046                  ; $88A1
    CMP #$0A                   ; $88A3
    BNE $8870                  ; $88A5
    RTS                        ; $88A7
    .byte $30,$3A,$35,$25,$52,$7A,$58,$75,$55,$70,$20,$2A,$25,$15,$51,$59
    .byte $46,$77,$44,$73,$20,$2A,$25,$43,$51,$59,$47,$77,$55,$73,$20,$2A
    .byte $24,$26,$45,$7A,$48,$75,$63,$42,$1C,$1D,$1E,$1F,$30,$31,$32,$33
    .byte $34,$35,$1D,$FD,$FD,$FD,$FD,$2C,$C7,$C7,$C7,$C7,$47,$05,$5C,$05
    .byte $71,$05,$86,$05,$9B,$05,$B0,$05,$08,$00,$0F,$06,$04,$09,$05,$08
    .byte $08,$01,$02,$08,$09,$04,$08,$10,$08,$02,$01,$03,$06,$0B,$05,$03
    .byte $03,$01,$07,$04,$04,$02,$02,$04,$02,$0C,$0E,$03,$01,$0B,$0F,$06
    .byte $02,$07,$04,$0A,$09,$08,$04,$01,$03,$03,$04,$11,$02,$02,$07,$02
    .byte $04,$0E,$09,$02,$0B,$01,$04,$02,$0C,$07,$0B,$01,$02,$02,$03,$03
    .byte $04,$06,$04,$02,$0E,$06,$06,$07,$0A,$06,$11,$01,$04,$05,$0F,$04
    .byte $01,$0B,$09,$0F,$02,$09,$0B,$03,$05,$01,$01,$00,$03,$04,$02,$0B
    .byte $01,$0D,$0A,$07,$01,$02,$09,$06,$05,$09,$04,$08,$0E,$0B,$60,$60
    .byte $48
    .byte $8B,$5C,$8B,$6A,$8B,$78,$8B,$86,$8B,$94,$8B,$B4,$8B,$CA,$8B,$E0
    .byte $8B,$EE,$8B,$04,$8C,$12,$8C,$28,$8C,$3C,$8C,$4A,$8C,$61,$8C,$78
    .byte $8C,$86,$8C,$94,$8C,$A2,$8C,$B9,$8C,$D0,$8C,$DE,$8C,$EC,$8C,$09
    .byte $8D,$1F,$8D,$52,$8D,$60,$8D,$89,$8D,$97,$8D,$A5,$8D,$B3,$8D,$C1
    .byte $8D,$CF,$8D,$05,$8E,$1B,$8E,$32,$8E,$5B,$8E,$7A,$8E,$8E,$8E,$C6
    .byte $8E,$E5,$8E,$F3,$8E,$29,$8F,$53,$8F,$7C,$8F,$99,$8F,$A7,$8F,$BE
    .byte $8F,$CC,$8F,$E2,$8F,$F9,$8F,$3A,$90,$6F,$90,$A5,$90,$B3,$90,$CD
    .byte $90,$D2,$90,$D7,$90,$0C,$91,$41,$91,$52,$91,$60,$91,$77,$91,$8E
    .byte $91,$A5,$91,$BC,$91,$CA,$91,$D8,$91,$E6,$91,$F4,$91,$02,$92,$10
    .byte $92,$1E,$92,$32,$92,$40,$92,$45,$92,$53,$92,$61,$92,$6F,$92,$7D
    .byte $92,$8B,$92,$9F,$92,$AD,$92,$BB,$92,$C9,$92,$D7,$92,$E5,$92,$F3
    .byte $92,$0D,$93,$23,$93,$3D,$93,$57,$93,$71,$93,$7F,$93,$8D,$93,$A4
    .byte $93,$EC,$93,$03,$94,$11,$94,$25,$94,$33,$94,$41,$94,$56,$94,$6A
    .byte $94,$7E,$94,$8C,$94,$A2,$94,$BC,$94,$F4,$94,$2C,$95,$49,$95,$79
    .byte $95,$87,$95,$98,$95,$A6,$95,$B4,$95,$E6,$95,$F5,$95,$03,$96,$18
    .byte $96,$51,$96,$5F,$96,$89,$96,$97,$96,$D2,$96,$3B,$97,$49,$97,$60
    .byte $97,$6E,$97,$84,$97,$98,$97,$AF,$97,$BD,$97,$D1,$97,$E7,$97,$F7
    .byte $97,$07,$98,$17,$98,$27,$98,$35,$98,$63,$98,$71,$98,$85,$98,$AB
    .byte $98,$C5,$98,$D4,$98,$13,$99,$22,$99,$31,$99,$6C,$99,$7B,$99,$81
    .byte $99,$90,$99,$96,$99,$A5,$99,$AB,$99,$B1,$99,$D4,$99,$DA,$99,$E0
    .byte $99,$E6,$99,$EC,$99,$F2,$99,$F8,$99,$07,$9A,$42,$9A,$50,$9A,$8B
    .byte $9A,$9A,$9A,$A0,$9A,$AF,$9A,$BE,$9A,$D5,$9A,$E4,$9A,$F3,$9A,$02
    .byte $9B,$11,$9B,$20,$9B,$2F,$9B,$35,$9B,$44,$9B,$53,$9B,$62,$9B,$71
    .byte $9B,$80,$9B,$8F,$9B,$9E,$9B,$AD,$9B,$BC,$9B,$CB,$9B,$06,$9C,$38
    .byte $9C,$46,$9C,$54,$9C,$62,$9C,$70,$9C,$93,$9C,$AD,$9C,$D7,$9C,$FB
    .byte $9C,$0F,$9D,$34,$9D,$79,$9D,$87,$9D,$A4,$9D,$B8,$9D,$E9,$9D,$07
    .byte $9E,$21,$9E,$3B,$9E,$55,$9E,$6B,$9E,$7A,$9E,$89,$9E,$97,$9E,$A5
    .byte $9E,$B3,$9E,$C1,$9E,$CF,$9E,$1F,$9F,$3C,$9F,$56,$9F,$6D,$9F,$A8
    .byte $9F,$C4,$9F,$C9,$9F,$4C,$A0,$66,$A0,$8F,$A0,$A3,$A0,$A8,$A0,$BE
    .byte $A0,$EA,$A0,$F8,$A0,$06,$A1,$1D,$A1,$30,$A1,$3E,$A1,$79,$A1,$F5
    .byte $0B,$F4,$1F,$00,$00,$00,$F6,$00,$F6,$15,$F6,$2A,$F6,$3F,$F6,$54
    .byte $F6,$69,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$0B,$BA,$B8,$F3,$00
    .byte $F0,$F5,$83,$F4,$12,$00,$00,$00,$F1,$00,$01,$00,$C3,$01,$F0,$F5
    .byte $83,$F4,$18,$19,$1A,$1B,$F1,$46,$40,$E8,$BB,$00,$F0,$F5,$83,$F4
    .byte $18,$19,$1A,$2B,$F1,$37,$05,$18,$CB,$01,$F0,$F5,$81,$F4,$24,$25
    .byte $26,$4F,$F1,$02,$07,$E4,$CF,$00,$F1,$01,$06,$F8,$BB,$04,$01,$FB
    .byte $01,$23,$45,$01,$FB,$10,$23,$45,$F8,$A7,$8B,$F5,$81,$F4,$24,$25
    .byte $26,$4F,$F1,$04,$07,$50,$04,$02,$F1,$03,$06,$10,$B3,$05,$F8,$A7
    .byte $8B,$F5,$81,$F4,$24,$25,$26,$4F,$F1,$06,$07,$58,$EF,$00,$F1,$05
    .byte $06,$10,$B3,$05,$F8,$A7,$8B,$F5,$81,$F4,$24,$25,$26,$4F,$F1,$00
    .byte $08,$F8,$BB,$00,$F0,$F5,$81,$F4,$24,$25,$26,$4F,$F1,$09,$07,$32
    .byte $FE,$00,$F1,$DA,$06,$11,$B2,$05,$F8,$A7,$8B,$F5,$09,$F4,$04,$05
    .byte $00,$00,$F1,$0D,$C4,$98,$E3,$00,$F0,$F5,$81,$F4,$24,$25,$26,$4F
    .byte $F1,$0A,$0A,$F0,$BB,$00,$F1,$01,$09,$F8,$BB,$04,$F8,$A7,$8B,$F5
    .byte $81,$F4,$24,$25,$26,$4F,$F1,$05,$09,$10,$B3,$05,$F1,$06,$0A,$58
    .byte $EF,$00,$F0,$F5,$81,$F4,$24,$25,$26,$4F,$F1,$00,$3A,$F8,$BB,$00
    .byte $F0,$F5,$09,$F4,$04,$05,$00,$00,$F7,$03,$7B,$F1,$00,$00,$80,$FB
    .byte $00,$F1,$3B,$BA,$D0,$C3,$04,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F7
    .byte $03,$7B,$F1,$3C,$CF,$E0,$7B,$04,$F1,$00,$00,$80,$FB,$00,$F0,$F5
    .byte $09,$F4,$04,$05,$00,$00,$F1,$48,$C4,$98,$A4,$00,$F0,$F5,$09,$F4
    .byte $04,$05,$00,$00,$F1,$00,$BA,$00,$C3,$01,$F0,$F5,$09,$F4,$04,$05
    .byte $00,$00,$F1,$5F,$CF,$98,$AB,$00,$F0,$F5,$81,$F4,$1C,$1D,$00,$00
    .byte $F7,$03,$7B,$F1,$76,$0D,$80,$23,$06,$F1,$00,$00,$80,$FB,$00,$F0
    .byte $F5,$81,$F4,$1C,$1D,$00,$00,$F7,$03,$7B,$F1,$76,$0F,$80,$23,$06
    .byte $F1,$00,$00,$80,$FB,$00,$F0,$F5,$81,$F4,$28,$29,$2A,$0B,$F1,$0E
    .byte $3C,$E8,$BB,$00,$F0,$F5,$83,$F4,$18,$19,$1A,$1B,$F1,$99,$40,$D0
    .byte $BB,$00,$F0,$F5,$83,$F4,$18,$19,$1A,$1B,$F1,$11,$15,$64,$EF,$00
    .byte $F1,$9A,$14,$CE,$B7,$04,$1E,$F6,$00,$F1,$10,$40,$E8,$BB,$04,$F0
    .byte $F5,$83,$F4,$18,$19,$1A,$1B,$F1,$12,$15,$40,$CB,$00,$F1,$9B,$14
    .byte $DC,$C6,$04,$F8,$A7,$8B,$F5,$80,$F4,$0C,$0D,$0E,$0F,$F7,$03,$7B
    .byte $F1,$00,$00,$80,$FB,$00,$F1,$9D,$1E,$7C,$9F,$04,$F1,$24,$1D,$F0
    .byte $C3,$08,$1E,$F6,$15,$F1,$00,$47,$EB,$C1,$08,$02,$F1,$E7,$1E,$FC
    .byte $B3,$04,$F1,$26,$20,$EB,$C1,$08,$F0,$F5,$09,$F4,$04,$05,$00,$00
    .byte $F1,$60,$CF,$98,$E3,$00,$F0,$F5,$83,$F4,$18,$19,$1A,$1B,$F1,$49
    .byte $15,$40,$CB,$00,$F1,$A5,$14,$DC,$C6,$04,$F9,$0F,$01,$FB,$10,$23
    .byte $45,$01,$FB,$01,$23,$45,$FA,$F6,$00,$F1,$4A,$40,$08,$BB,$05,$F0
    .byte $F5,$81,$F4,$13,$00,$00,$00,$F1,$90,$2A,$00,$CB,$01,$F0,$F5,$09
    .byte $F4,$04,$05,$00,$00,$F1,$61,$C4,$00,$EB,$01,$F0,$F5,$09,$F4,$04
    .byte $05,$00,$00,$F1,$73,$72,$9F,$BB,$00,$F0,$F5,$09,$F4,$04,$05,$00
    .byte $00,$F1,$00,$71,$00,$BB,$01,$F0,$F5,$81,$F4,$13,$00,$00,$00,$F1
    .byte $38,$2A,$00,$CB,$01,$F0,$F5,$81,$F4,$28,$29,$2A,$0B,$F1,$4C,$12
    .byte $70,$CB,$00,$F1,$4B,$10,$23,$C0,$05,$F9,$0C,$01,$FB,$10,$23,$45
    .byte $01,$FB,$01,$23,$45,$FA,$F6,$00,$F1,$00,$37,$20,$BB,$05,$02,$F1
    .byte $DE,$12,$16,$CB,$01,$F1,$4B,$10,$20,$BB,$05,$F0,$F5,$81,$F4,$28
    .byte $29,$2A,$2B,$F1,$4E,$12,$70,$CB,$00,$F1,$4D,$10,$28,$C3,$05,$F8
    .byte $A7,$8B,$F5,$83,$F4,$18,$19,$1A,$2B,$F7,$03,$7B,$F1,$00,$00,$80
    .byte $FB,$00,$F1,$E8,$05,$F8,$C3,$04,$F0,$F5,$83,$F4,$18,$19,$1A,$1B
    .byte $F7,$03,$7B,$F1,$00,$00,$80,$FB,$00,$F1,$14,$15,$56,$7C,$04,$F1
    .byte $4A,$80,$E8,$BB,$08,$01,$FB,$01,$23,$45,$01,$FB,$02,$13,$45,$F8
    .byte $4E,$8E,$F5,$83,$F4,$18,$19,$1A,$1B,$F7,$03,$7B,$F1,$00,$00,$80
    .byte $FB,$00,$F1,$14,$15,$39,$7E,$04,$F1,$13,$17,$04,$BB,$09,$F8,$4E
    .byte $8E,$F5,$83,$F4,$2A,$2B,$00,$00,$F1,$16,$04,$90,$9B,$00,$F1,$15
    .byte $03,$F6,$D5,$04,$F0,$F5,$83,$F4,$18,$19,$1A,$1B,$F1,$17,$15,$39
    .byte $7E,$00,$F1,$52,$17,$02,$BD,$05,$F9,$0F,$01,$FB,$10,$23,$45,$01
    .byte $FB,$01,$23,$45,$FA,$F6,$00,$F1,$00,$CE,$F4,$C3,$04,$04,$F1,$1B
    .byte $15,$E6,$DD,$00,$F1,$53,$17,$F4,$C3,$04,$F8,$A7,$8B,$F5,$09,$F4
    .byte $04,$05,$00,$00,$F7,$03,$73,$F1,$75,$71,$00,$C3,$01,$0A,$F1,$D9
    .byte $71,$00,$C3,$05,$0A,$F1,$00,$71,$00,$C3,$09,$F0,$F5,$09,$F4,$04
    .byte $05,$00,$00,$F1,$87,$71,$00,$EB,$01,$F0,$F5,$83,$F4,$18,$19,$1A
    .byte $1B,$F1,$17,$15,$56,$7C,$00,$F1,$08,$80,$E6,$BC,$04,$F9,$0F,$01
    .byte $FB,$10,$23,$45,$01,$FB,$01,$23,$45,$FA,$F6,$00,$F1,$00,$7F,$F8
    .byte $C3,$04,$04,$F1,$1B,$15,$06,$DD,$01,$F1,$1C,$80,$F8,$C3,$04,$F0
    .byte $F5,$83,$F4,$2A,$2B,$00,$00,$F1,$19,$04,$90,$9B,$00,$F1,$18,$03
    .byte $FA,$D0,$04,$1E,$F6,$00,$F1,$00,$3E,$00,$CB,$05,$04,$F1,$1D,$04
    .byte $1C,$AB,$01,$F1,$18,$03,$00,$CB,$05,$F0,$F5,$83,$F4,$18,$19,$1A
    .byte $1B,$F1,$17,$15,$56,$7C,$00,$F1,$08,$80,$E6,$BC,$04,$F9,$0F,$01
    .byte $FB,$10,$23,$45,$01,$FB,$01,$23,$45,$FA,$F6,$00,$F1,$00,$7F,$F8
    .byte $C3,$04,$F0,$F5,$83,$F4,$2A,$2B,$00,$00,$F1,$19,$04,$90,$9B,$00
    .byte $F1,$18,$03,$FA,$D0,$04,$1E,$F6,$00,$F1,$00,$3E,$00,$CB,$05,$F0
    .byte $F5,$81,$F4,$24,$25,$26,$4F,$F1,$9C,$38,$08,$BB,$01,$F0,$F5,$09
    .byte $F4,$04,$05,$00,$00,$F7,$03,$7B,$F1,$00,$00,$80,$FB,$00,$F1,$88
    .byte $71,$D0,$C3,$04,$F0,$F5,$81,$F4,$24,$25,$26,$4F,$F1,$1F,$3A,$08
    .byte $BB,$01,$F0,$F5,$81,$F4,$24,$25,$26,$4F,$F1,$04,$0A,$50,$03,$02
    .byte $F1,$03,$09,$10,$B3,$05,$F8,$A7,$8B,$F5,$09,$F4,$04,$05,$00,$00
    .byte $F7,$03,$7B,$F1,$89,$23,$C0,$7B,$04,$F1,$00,$00,$80,$FB,$00,$F0
    .byte $F5,$81,$F4,$08,$09,$0A,$0B,$F1,$21,$49,$80,$8F,$00,$F1,$20,$59
    .byte $98,$BB,$04,$F1,$20,$5A,$98,$BB,$08,$F1,$20,$5B,$98,$BB,$0C,$2A
    .byte $F4,$16,$17,$2D,$53,$F6,$00,$F6,$2A,$F6,$3F,$F1,$00,$45,$28,$C3
    .byte $05,$04,$F1,$23,$1A,$58,$EB,$01,$F1,$22,$18,$28,$C3,$05,$F8,$A7
    .byte $8B,$F5,$81,$F4,$0C,$0D,$0E,$0F,$F7,$03,$7B,$F1,$00,$00,$80,$FB
    .byte $00,$F1,$9D,$1E,$90,$97,$04,$F1,$24,$1D,$20,$C3,$09,$1E,$F6,$00
    .byte $F6,$15,$F1,$25,$48,$10,$BB,$09,$02,$F1,$27,$1E,$F4,$AB,$04,$F1
    .byte $26,$21,$08,$BB,$09,$F0,$F5,$81,$F4,$24,$25,$26,$4F,$F1,$0C,$0A
    .byte $48,$FC,$00,$F1,$DA,$09,$10,$B3,$05,$F9,$0F,$01,$FB,$10,$23,$45
    .byte $01,$FB,$01,$23,$45,$FA,$F6,$00,$F1,$00,$3B,$FA,$BB,$04,$04,$F1
    .byte $A6,$0A,$F2,$BB,$00,$F1,$26,$09,$FA,$BB,$04,$F0,$F5,$09,$F4,$04
    .byte $05,$00,$00,$F1,$8A,$BA,$00,$EB,$01,$F0,$F5,$81,$F4,$08,$09,$0A
    .byte $0B,$F1,$54,$4B,$B0,$BB,$01,$F1,$54,$4D,$B0,$BB,$05,$F1,$54,$4F
    .byte $B0,$BB,$09,$F0,$F5,$80,$F8,$FB,$8F,$F5,$80,$F8,$3C,$90,$F5,$83
    .byte $F4,$18,$19,$1A,$1B,$F7,$23,$5B,$F1,$00,$00,$80,$A3,$00,$F1,$00
    .byte $00,$80,$DB,$04,$F1,$00,$70,$00,$BB,$09,$F1,$E5,$1B,$00,$BB,$0D
    .byte $F1,$E6,$1F,$00,$BB,$11,$96,$F7,$03,$7B,$F6,$00,$F6,$15,$F6,$3F
    .byte $F6,$54,$F0,$F5,$80,$F4,$0C,$0D,$0E,$0F,$F7,$03,$7B,$F1,$9E,$1E
    .byte $68,$93,$05,$F1,$28,$1C,$C8,$BB,$08,$1E,$F6,$15,$F1,$29,$47,$E0
    .byte $BB,$08,$02,$F1,$2A,$20,$E8,$BB,$08,$F1,$00,$00,$80,$FB,$00,$F1
    .byte $9F,$1E,$FC,$AB,$04,$F8,$4E,$8E,$F5,$09,$F4,$04,$05,$00,$00,$F7
    .byte $23,$5B,$F1,$8D,$CF,$98,$C3,$00,$F0,$F5,$09,$F4,$04,$05,$00,$00
    .byte $F1,$00,$EC,$00,$C3,$01,$F0,$F5,$80,$F4,$1C,$1D,$00,$00,$F7,$03
    .byte $7B,$F1,$95,$0C,$7F,$23,$07,$F1,$00,$00,$80,$FB,$00,$F0,$F5,$80
    .byte $F4,$1C,$1D,$00,$00,$F7,$03,$7B,$F1,$95,$0E,$7F,$23,$07,$F1,$00
    .byte $00,$80,$FB,$00,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F7,$03,$7B,$F1
    .byte $8F,$BC,$A0,$A3,$04,$F1,$00,$00,$78,$FB,$00,$F0,$F5,$09,$F4,$04
    .byte $05,$00,$00,$F7,$03,$7B,$F1,$91,$BC,$C0,$EB,$04,$F1,$00,$00,$80
    .byte $FB,$00,$F0,$F5,$09,$F4,$06,$00,$00,$00,$F1,$77,$B4,$40,$EB,$01
    .byte $F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$00,$34,$08,$CB,$01,$F0,$F5
    .byte $09,$F4,$3B,$47,$00,$00,$F1,$00,$35,$00,$CB,$01,$F0,$F5,$09,$F4
    .byte $3B,$47,$00,$00,$F1,$00,$36,$00,$CB,$01,$F0,$F5,$0B,$F4,$43,$45
    .byte $47,$44,$F1,$00,$24,$F0,$BB,$00,$F0,$F5,$0B,$F4,$43,$45,$47,$44
    .byte $F1,$00,$25,$F0,$BB,$00,$F0,$F5,$0B,$F4,$43,$45,$47,$44,$F1,$00
    .byte $26,$F0,$BB,$00,$F0,$F5,$81,$F4,$04,$05,$0F,$00,$F1,$32,$C0,$88
    .byte $E3,$00,$F1,$07,$2B,$50,$DB,$05,$F0,$F5,$81,$F4,$0C,$0D,$0E,$0F
    .byte $F1,$29,$3F,$F8,$B3,$04,$F0,$F5,$80,$F8,$48,$9C,$F5,$09,$F4,$04
    .byte $05,$00,$00,$F1,$7E,$BA,$E0,$BB,$00,$F0,$F5,$83,$F4,$1B,$00,$00
    .byte $00,$F1,$00,$2C,$00,$BB,$01,$F0,$F5,$0A,$F4,$2C,$0B,$05,$07,$F1
    .byte $00,$27,$10,$CB,$01,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$35,$28
    .byte $00,$B7,$01,$F0,$F5,$81,$F4,$28,$29,$2A,$0B,$F1,$00,$11,$E8,$BB
    .byte $00,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$00,$00,$80,$FB,$00,$F1
    .byte $E8,$BA,$FC,$C3,$04,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$7A,$BD
    .byte $E0,$E3,$00,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$7B,$BC,$A8,$EB
    .byte $00,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$7F,$C0,$60,$A3,$01,$F0
    .byte $F5,$09,$F4,$04,$05,$00,$00,$F1,$80,$C0,$E0,$A3,$00,$F0,$F5,$09
    .byte $F4,$04,$05,$00,$00,$F1,$7C,$BA,$90,$AB,$00,$F0,$F5,$83,$F4,$2A
    .byte $2B,$00,$00,$F1,$36,$02,$10,$D3,$01,$F0,$F5,$81,$F4,$08,$09,$0A
    .byte $0B,$F1,$98,$4B,$90,$B3,$01,$F1,$98,$4D,$90,$B3,$05,$F1,$98,$4F
    .byte $90,$B3,$09,$F0,$F5,$83,$F4,$18,$19,$1A,$1B,$F1,$E3,$15,$64,$EF
    .byte $00,$F1,$9A,$14,$D0,$B3,$04,$F8,$A7,$8B,$F5,$81,$F4,$08,$09,$0A
    .byte $0B,$F1,$8B,$4B,$80,$BB,$01,$F1,$8B,$4D,$80,$BB,$05,$F1,$8B,$4F
    .byte $80,$BB,$09,$F0,$F5,$81,$F4,$08,$09,$0A,$0B,$F1,$8C,$4B,$80,$BB
    .byte $01,$F1,$8C,$4D,$80,$BB,$05,$F1,$8C,$4F,$80,$BB,$09,$F0,$F5,$80
    .byte $F4,$08,$09,$0A,$0B,$F1,$00,$CD,$00,$C3,$0D,$F1,$00,$CA,$00,$C3
    .byte $01,$F1,$00,$CB,$00,$C3,$05,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F1
    .byte $93,$C4,$A0,$A3,$00,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$94,$BA
    .byte $80,$E3,$00,$F0,$F5,$09,$F4,$04,$05,$00,$00,$F7,$03,$7B,$F1,$00
    .byte $00,$80,$FB,$00,$F1,$E9,$CF,$00,$83,$05,$F0,$F5,$80,$F4,$08,$09
    .byte $0A,$0B,$F1,$3A,$56,$E0,$BB,$08,$F1,$3A,$4C,$E0,$BB,$00,$F1,$3A
    .byte $4E,$E0,$BB,$04,$14,$F1,$3F,$49,$28,$EB,$01,$F1,$3E,$5C,$00,$C3
    .byte $05,$F1,$3E,$5D,$00,$C3,$09,$F1,$3E,$5E,$00,$C3,$0D,$14,$F6,$3F
    .byte $F1,$3D,$56,$AB,$C3,$08,$F1,$3D,$4C,$AB,$C3,$00,$F1,$3D,$4E,$AB
    .byte $C3,$04,$F0,$F5,$80,$F4,$10,$11,$12,$00,$F1,$DB,$2D,$18,$B3,$01
    .byte $F1,$59,$2E,$20,$AB,$05,$64,$F6,$15,$F0,$F5,$85,$F4,$41,$04,$00
    .byte $00,$F1,$00,$2F,$00,$D3,$01,$F0,$F5,$80,$F4,$04,$05,$23,$00,$F1
    .byte $A8,$CF,$10,$D3,$01,$F1,$5A,$E7,$10,$CB,$05,$F0,$F5,$80,$F4,$13
    .byte $00,$00,$00,$F1,$40,$29,$D8,$CB,$00,$F0,$F5,$09,$F4,$06,$00,$00
    .byte $00,$F1,$5C,$B5,$00,$93,$01,$F0,$F5,$80,$F4,$04,$05,$22,$00,$F1
    .byte $5D,$31,$B0,$D3,$04,$06,$F1,$A9,$C4,$B8,$DB,$00,$F0,$F5,$09,$F4
    .byte $04,$05,$00,$00,$F1,$00,$00,$80,$FB,$00,$F1,$EA,$23,$70,$CB,$05
    .byte $F0,$F5,$80,$F4,$04,$05,$20,$21,$F1,$AA,$C6,$90,$CB,$00,$F1,$5E
    .byte $32,$80,$9B,$05,$F0,$F5,$80,$F4,$16,$17,$2D,$53,$F1,$00,$46,$08
    .byte $BB,$01,$F0,$F5,$80,$F4,$04,$05,$20,$21,$F1,$AB,$CF,$E8,$DB,$00
    .byte $F1,$2D,$33,$F8,$CB,$04,$F8,$A7,$8B,$F5,$80,$F4,$08,$09,$0A,$0B
    .byte $F1,$42,$4C,$80,$BB,$00,$F1,$42,$4E,$80,$BB,$04,$F1,$42,$50,$80
    .byte $BB,$08,$F0,$F5,$80,$F4,$24,$25,$26,$4F,$F1,$1A,$07,$4C,$76,$00
    .byte $F1,$A0,$06,$10,$B3,$05,$F9,$0F,$01,$FB,$10,$23,$45,$01,$FB,$01
    .byte $23,$45,$FA,$F6,$00,$F1,$00,$39,$F9,$BB,$04,$04,$F1,$A1,$07,$E4
    .byte $CF,$00,$F1,$26,$06,$F9,$BB,$04,$F8,$A7,$8B,$F5,$80,$F4,$24,$25
    .byte $26,$4F,$F1,$A2,$0A,$5F,$7B,$00,$F1,$A0,$09,$10,$B3,$05,$F9,$0F
    .byte $01,$FB,$10,$23,$45,$01,$FB,$01,$23,$45,$FA,$F6,$00,$F1,$00,$3B
    .byte $F9,$BB,$04,$04,$F1,$A3,$0A,$F0,$BB,$00,$F1,$26,$09,$F9,$BB,$04
    .byte $F8,$A7,$8B,$F5,$80,$F4,$0C,$0D,$0E,$0F,$F1,$33,$1E,$60,$97,$04
    .byte $F1,$24,$1D,$20,$B7,$09,$1E,$F6,$2A,$F1,$34,$21,$10,$B7,$01,$F0
    .byte $F5,$80,$F4,$08,$09,$0A,$0B,$F1,$33,$49,$60,$E3,$04,$F1,$67,$94
    .byte $F0,$BB,$00,$F1,$67,$95,$F0,$BB,$08,$F1,$67,$96,$F0,$BB,$0C,$1E
    .byte $F4,$0A,$0B,$00,$0B,$F6,$2A,$F6,$3F,$F1,$68,$85,$20,$C3,$01,$F0
    .byte $F5,$09,$F4,$04,$05,$00,$00,$F1,$81,$C0,$C0,$EB,$00,$F0,$F5,$80
    .byte $F4,$13,$00,$00,$00,$F1,$40,$7E,$D8,$CB,$00,$F0,$F8,$A7,$8B
    .byte $F5,$09,$F4,$04,$05,$00,$00,$F1,$96,$C0,$D0,$9B,$00,$F0,$F5,$09
    .byte $F4,$04,$05,$00,$00,$F1,$97,$C0,$00,$E3,$01,$F0,$F5,$09,$F4,$04
    .byte $05,$00,$00,$F7,$2B,$53,$F1,$00,$00,$80,$A3,$00,$F1,$00,$00,$80
    .byte $DB,$04,$F1,$B1,$C4,$90,$93,$08,$03,$F1,$B1,$C4,$90,$93,$0C,$03
    .byte $F1,$B1,$C4,$90,$93,$10,$03,$F1,$B1,$C4,$90,$93,$14,$F0,$F5,$84
    .byte $16,$F4,$2D,$00,$00,$00,$F1,$CB,$B3,$53,$C3,$00,$F0,$F5,$80,$F4
    .byte $28,$29,$2A,$0B,$F1,$39,$11,$E8,$BB,$00,$F0,$F5,$82,$F4,$04,$05
    .byte $22,$00,$F1,$5D,$83,$B8,$D3,$04,$06,$F1,$A9,$C4,$B8,$DB,$00,$F0
    .byte $F5,$80,$F4,$08,$09,$0A,$0B,$F1,$62,$5E,$20,$BB,$0D,$F1,$62,$5D
    .byte $20,$BB,$09,$F1,$62,$5C,$20,$BB,$05,$F1,$63,$49,$A0,$9F,$00,$14
    .byte $F4,$0A,$0B,$00,$00,$F6,$00,$F6,$2A,$F6,$3F,$F1,$00,$85,$08,$BB
    .byte $05,$02,$F1,$8E,$84,$0C,$BB,$05,$F0,$F5,$09,$F4,$60,$61,$62,$63
    .byte $F1,$00,$79,$F0,$BB,$00,$F0,$F5,$80,$F4,$0C,$0D,$0E,$0F,$F1,$65
    .byte $1E,$D0,$93,$00,$F1,$64,$1D,$1F,$B7,$05,$14,$F6,$00,$F1,$00,$3F
    .byte $16,$B3,$05,$04,$F1,$66,$1D,$16,$B3,$05,$F1,$A7,$22,$0E,$AF,$01
    .byte $F0,$F5,$09,$F4,$04,$05,$00,$00,$F1,$83,$BA,$B8,$BB,$00,$F0,$F5
    .byte $87,$F4,$08,$09,$0A,$0B,$F1,$AC,$49,$9C,$63,$00,$F1,$67,$94,$F0
    .byte $B3,$04,$F1,$67,$95,$F0,$B3,$08,$F1,$67,$96,$F0,$B3,$0C,$16,$F4
    .byte $0A,$0B,$00,$00,$F6,$00,$F6,$2A,$F6,$3F,$F1,$00,$84,$20,$BB,$05
    .byte $04,$F1,$68,$85,$20,$BB,$05,$F8,$0C,$99,$F5,$83,$F4,$18,$19,$1A
    .byte $2B,$F7,$03,$7B,$F1,$30,$00,$80,$9B,$04,$F1,$43,$00,$80,$E4,$08
    .byte $F1,$2C,$ED,$70,$C3,$11,$C0,$F7,$1C,$63,$F1,$00,$00,$80,$E3,$0C
    .byte $10,$F7,$24,$5B,$F1,$00,$00,$80,$A4,$00,$F1,$00,$00,$80,$DB,$0C
    .byte $10,$F7,$2B,$53,$F1,$00,$00,$80,$AB,$00,$F1,$00,$00,$80,$D3,$0C
    .byte $10,$F7,$33,$4B,$F1,$00,$00,$80,$B3,$00,$F1,$00,$00,$80,$CB,$0C
    .byte $60,$F7,$03,$7B,$F6,$00,$F6,$15,$F6,$2A,$F6,$3F,$F1,$2E,$17,$00
    .byte $C3,$11,$F0,$F5,$09,$F4,$06,$00,$00,$00,$F1,$84,$B6,$E0,$63,$00
    .byte $F0,$F5,$82,$F4,$04,$05,$22,$00,$F1,$00,$8A,$20,$CB,$05,$06,$F1
    .byte $69,$BA,$18,$D3,$01,$F8,$A7,$8B,$F5,$09,$F4,$06,$00,$00,$00,$F1
    .byte $85,$B7,$60,$93,$00,$F0,$F5,$80,$F4,$04,$05,$23,$00,$F1,$AE,$BA
    .byte $D0,$B5,$00,$F1,$6A,$8B,$C0,$C5,$04,$F8,$A7,$8B,$F5,$80,$F4,$04
    .byte $05,$23,$00,$F1,$AF,$BA,$D0,$D7,$00,$F1,$00,$30,$C8,$CF,$04,$F0
    .byte $F5,$80,$F4,$04,$05,$22,$00,$F1,$00,$31,$E4,$CB,$04,$06,$F1,$B0
    .byte $BA,$E8,$DB,$00,$F8,$A7,$8B,$F5,$09,$F4,$04,$05,$00,$00,$F1,$86
    .byte $C4,$A8,$AB,$00,$F0,$F5,$83,$F4,$04,$05,$1E,$1F,$F1,$00,$8E,$00
    .byte $EB,$01,$F1,$00,$8C,$00,$D3,$05,$F0,$F5,$83,$F4,$04,$05,$1E,$1F
    .byte $F1,$6C,$B8,$00,$EB,$01,$F1,$6B,$8D,$10,$C7,$05,$F8,$A7,$8B,$F5
    .byte $83,$F4,$04,$05,$1E,$1F,$F1,$6D,$B8,$00,$EB,$01,$F8,$DE,$97,$F5
    .byte $83,$F4,$04,$05,$1E,$1F,$F1,$6E,$B8,$00,$EB,$01,$F8,$DE,$97,$F5
    .byte $83,$F4,$04,$05,$1E,$1F,$F1,$6C,$B8,$00,$EB,$01,$F8,$CA,$97,$F5
    .byte $83,$F4,$04,$05,$1E,$1F,$F1,$6E,$B8,$00,$EB,$01,$F8,$CA,$97,$F5
    .byte $80,$F4,$20,$21,$00,$00,$F1,$00,$8F,$10,$BB,$01,$F0,$F5,$85,$F4
    .byte $06,$07,$00,$00,$F1,$00,$64,$10,$D3,$01,$10,$F1,$00,$65,$30,$CB
    .byte $05,$04,$F1,$00,$67,$00,$D3,$05,$F1,$00,$66,$00,$D3,$01,$06,$F6
    .byte $15,$F1,$00,$68,$C0,$C3,$00,$02,$F6,$00,$F0,$F5,$80,$F4,$20,$21
    .byte $00,$00,$F1,$00,$90,$10,$BB,$01,$F0,$F5,$80,$F4,$10,$11,$12,$13
    .byte $F1,$D0,$2E,$20,$B3,$05,$F1,$B2,$2D,$18,$BB,$01,$F0,$F5,$0A,$F4
    .byte $2C,$0B,$05,$07,$F1,$00,$91,$00,$D3,$01,$F1,$70,$92,$28,$C3,$05
    .byte $F1,$70,$92,$00,$C3,$08,$F1,$71,$93,$B8,$B3,$0C,$F1,$71,$93,$00
    .byte $B3,$10,$F0,$F5,$80,$F4,$08,$09,$0A,$0B,$F1,$00,$58,$00,$C3,$09
    .byte $F1,$00,$4B,$00,$C3,$01,$F1,$00,$4D,$00,$C3,$05,$F0,$F5,$84,$80
    .byte $F4,$33,$00,$00,$00,$F1,$00,$98,$00,$D3,$01,$F0,$F5,$0F,$F4,$08
    .byte $09,$0A,$0B,$F1,$AC,$49,$9C,$63,$00,$F1,$67,$D3,$F0,$B3,$04,$F1
    .byte $67,$95,$F0,$B3,$08,$F1,$67,$96,$F0,$B3,$0C,$16,$F4,$0A,$0B,$00
    .byte $00,$F6,$00,$F6,$2A,$F6,$3F,$F1,$00,$DA,$20,$BB,$05,$04,$F1,$68
    .byte $E0,$20,$BB,$05,$F1,$AD,$86,$08,$EB,$01,$F0,$F5,$84,$02,$F4,$38
    .byte $39,$42,$41,$F1,$00,$B1,$10,$CB,$01,$F0,$F5,$84,$81,$F4,$38,$39
    .byte $42,$41,$F1,$00,$AE,$10,$CB,$01,$F0,$F5,$10,$F4,$08,$09,$0A,$0B
    .byte $F1,$AC,$49,$9C,$63,$00,$F1,$67,$D4,$F0,$B3,$04,$F1,$67,$95,$F0
    .byte $B3,$08,$F1,$67,$96,$F0,$B3,$0C,$16,$F4,$0A,$0B,$00,$00,$F6,$00
    .byte $F6,$2A,$F6,$3F,$F1,$00,$DB,$20,$BB,$05,$04,$F1,$68,$E1,$20,$BB
    .byte $05,$F8,$0C,$99,$F5,$84,$82,$F4,$36,$37,$00,$00,$F1,$00,$9E,$00
    .byte $D3,$01,$F0,$F5,$84,$06,$F8,$6F,$99,$F5,$84,$83,$F4,$34,$00,$00
    .byte $00,$F1,$00,$9D,$00,$D3,$01,$F0,$F5,$84,$09,$F8,$84,$99,$F5,$84
    .byte $85,$F4,$36,$37,$00,$00,$F1,$00,$AA,$00,$D3,$01,$F0,$F5,$84,$0C
    .byte $F8,$99,$99,$F5,$84,$0D,$F8,$B2,$9A,$F5,$80,$F4,$10,$11,$12,$13
    .byte $F7,$23,$5B,$F1,$D2,$2E,$20,$BB,$0D,$F1,$D1,$2D,$18,$C3,$09,$F1
    .byte $00,$00,$80,$A3,$04,$F1,$00,$00,$80,$DB,$00,$F0,$F5,$84,$0F,$F8
    .byte $05,$9B,$F5,$84,$10,$F8,$D8,$9A,$F5,$84,$11,$F8,$A3,$9A,$F5,$84
    .byte $12,$F8,$F6,$9A,$F5,$84,$13,$F8,$14,$9B,$F5,$84,$14,$F8,$E7,$9A
    .byte $F5,$84,$15,$F4,$38,$39,$42,$41,$F1,$00,$B0,$10,$CB,$01,$F0,$F5
    .byte $80,$F4,$08,$09,$0A,$0B,$F1,$AC,$49,$9C,$63,$00,$F1,$67,$D5,$F0
    .byte $B3,$04,$F1,$67,$D9,$F0,$B3,$08,$F1,$67,$96,$F0,$B3,$0C,$16,$F4
    .byte $0A,$0B,$00,$00,$F6,$00,$F6,$2A,$F6,$3F,$F1,$00,$DC,$20,$BB,$05
    .byte $04,$F1,$68,$E2,$20,$BB,$05,$F8,$0C,$99,$F5,$1A,$F4,$38,$39,$42
    .byte $41,$F1,$00,$AF,$10,$CB,$01,$F0,$F5,$80,$F4,$08,$09,$0A,$0B,$F1
    .byte $AC,$49,$9C,$63,$00,$F1,$67,$D6,$F0,$B3,$04,$F1,$67,$95,$F0,$B3
    .byte $08,$F1,$67,$96,$F0,$B3,$0C,$16,$F4,$0A,$0B,$00,$00,$F6,$00,$F6
    .byte $2A,$F6,$3F,$F1,$00,$DD,$20,$BB,$05,$04,$F1,$68,$E3,$20,$BB,$05
    .byte $F8,$0C,$99,$F5,$84,$18,$F4,$38,$39,$42,$41,$F1,$00,$AD,$10,$CB
    .byte $01,$F0,$F5,$84,$19,$F8,$A1,$9B,$F5,$84,$1A,$F4,$35,$00,$00,$00
    .byte $F1,$00,$A9,$00,$D3,$01,$F0,$F5,$84,$1B,$F4,$33,$00,$00,$00,$F1
    .byte $00,$99,$00,$D3,$01,$F0,$F5,$80,$F4,$13,$00,$00,$00,$F7,$03,$7B
    .byte $F1,$B4,$29,$E0,$1B,$06,$F1,$00,$00,$80,$FB,$00,$F0,$F5,$84,$1D
    .byte $F4,$33,$30,$00,$00,$F1,$00,$9A,$00,$D3,$01,$F0,$F5,$84,$1E,$F4
    .byte $36,$37,$00,$00,$F1,$00,$A7,$00,$D3,$01,$F0,$F5,$84,$1F,$F4,$36
    .byte $37,$00,$00,$F1,$00,$A8,$00,$D3,$01,$F0,$F5,$84,$20,$F4,$30,$31
    .byte $32,$00,$F1,$00,$9B,$00,$D3,$01,$F0,$F5,$84,$21,$F4,$34,$00,$00
    .byte $00,$F1,$00,$9C,$00,$D3,$01,$F0,$F5,$84,$23,$F4,$36,$37,$00,$00
    .byte $F1,$00,$AC,$00,$D3,$01,$F0,$F5,$84,$24,$F8,$83,$9B,$F5,$84,$33
    .byte $F4,$30,$31,$32,$00,$F1,$00,$A6,$00,$D3,$01,$F0,$F5,$84,$34,$F4
    .byte $30,$31,$32,$00,$F1,$00,$A5,$00,$D3,$01,$F0,$F5,$84,$35,$F4,$36
    .byte $37,$00,$00,$F1,$00,$A0,$00,$D3,$01,$F0,$F5,$84,$36,$F4,$30,$31
    .byte $32,$00,$F1,$00,$9F,$00,$D3,$01,$F0,$F5,$84,$37,$F4,$30,$31,$32
    .byte $00,$F1,$00,$A3,$00,$D3,$01,$F0,$F5,$84,$38,$F4,$35,$00,$00,$00
    .byte $F1,$00,$A2,$00,$D3,$01,$F0,$F5,$84,$39,$F4,$36,$37,$00,$00,$F1
    .byte $00,$A4,$00,$D3,$01,$F0,$F5,$84,$3A,$F4,$30,$31,$32,$00,$F1,$00
    .byte $A1,$00,$D3,$01,$F0,$F5,$84,$3C,$F4,$30,$31,$32,$00,$F1,$00,$AB
    .byte $00,$D3,$01,$F0,$F5,$84,$84,$F4,$1D,$00,$80,$48,$F1,$72,$B2,$08
    .byte $CB,$01,$F0,$F5,$17,$F4,$08,$09,$0A,$0B,$F1,$AC,$49,$9C,$63,$00
    .byte $F1,$67,$D7,$F0,$B3,$04,$F1,$67,$95,$F0,$B3,$08,$F1,$67,$96,$F0
    .byte $B3,$0C,$16,$F4,$0A,$0B,$00,$00,$F6,$00,$F6,$2A,$F6,$3F,$F1,$00
    .byte $DE,$20,$BB,$05,$04,$F1,$68,$E4,$20,$BB,$05,$F8,$0C,$99,$F5,$80
    .byte $F4,$13,$00,$00,$0B,$F7,$03,$7B,$F1,$00,$00,$80,$FB,$00,$F1,$B7
    .byte $29,$10,$2B,$07,$F1,$31,$49,$AC,$FF,$0A,$28,$F4,$27,$1F,$00,$0B
    .byte $F1,$00,$0B,$00,$BB,$05,$04,$F1,$B5,$C9,$FD,$9F,$08,$F8,$4E,$8E
    .byte $F5,$0D,$F4,$14,$15,$16,$00,$F1,$00,$3D,$00,$C3,$01,$F0,$F5,$81
    .byte $F4,$14,$15,$16,$00,$F1,$BC,$41,$B0,$C3,$00,$F0,$F5,$80,$F4,$14
    .byte $15,$16,$00,$F1,$00,$42,$00,$C3,$01,$F0,$F5,$80,$F4,$14,$15,$16
    .byte $00,$F1,$BC,$44,$A0,$C3,$00,$F0,$F5,$80,$F4,$04,$05,$20,$21,$F7
    .byte $23,$5B,$F1,$BD,$32,$08,$E3,$0D,$F1,$D4,$C0,$98,$D3,$08,$F1,$00
    .byte $00,$80,$A3,$04,$F1,$00,$00,$80,$DB,$00,$F0,$F5,$80,$F4,$04,$05
    .byte $20,$21,$F1,$00,$00,$80,$FB,$00,$F1,$BF,$CF,$F0,$CB,$04,$F1,$BE
    .byte $33,$04,$BB,$09,$F0,$F5,$80,$F4,$0C,$0D,$0E,$0F,$F1,$64,$1D,$20
    .byte $BB,$05,$F1,$65,$1E,$D0,$93,$00,$14,$F6,$15,$F1,$C0,$3F,$10,$B3
    .byte $01,$04,$F1,$66,$1D,$10,$B3,$05,$F1,$D6,$1E,$08,$AF,$01,$F0,$F5
    .byte $80,$F4,$10,$11,$12,$13,$F7,$03,$7B,$F1,$C2,$53,$E0,$7B,$0C,$F1
    .byte $00,$00,$80,$83,$00,$28,$F1,$C3,$55,$10,$1B,$07,$F1,$00,$00,$80
    .byte $FB,$00,$F0,$F5,$80,$F4,$04,$05,$20,$21,$F1,$C4,$32,$B8,$BB,$05
    .byte $F1,$C5,$C0,$E0,$C3,$00,$F0,$F5,$80,$F4,$13,$00,$0F,$00,$F7,$03
    .byte $7B,$F1,$C6,$2B,$40,$0B,$0F,$14,$F1,$C7,$2A,$00,$1B,$0B,$F1,$00
    .byte $00,$80,$FB,$00,$32,$F1,$DF,$2A,$F8,$5B,$0C,$F0,$F5,$80,$F4,$0C
    .byte $0D,$0E,$0F,$F7,$23,$5B,$F1,$51,$1C,$00,$CB,$0C,$F1,$9E,$1E,$68
    .byte $A3,$09,$F1,$00,$00,$80,$A3,$04,$F1,$00,$00,$80,$DB,$00,$1E,$F6
    .byte $2A,$F1,$29,$47,$E0,$CB,$0C,$02,$F1,$2A,$20,$E8,$CB,$0C,$F1,$41
    .byte $22,$FC,$BB,$08,$01,$FB,$01,$23,$45,$01,$FB,$01,$32,$45,$F8,$6C
    .byte $9D,$F5,$80,$F4,$2B,$00,$00,$00,$F1,$00,$57,$10,$C3,$01,$F0,$F5
    .byte $80,$F4,$14,$15,$16,$00,$F7,$23,$5B,$F1,$00,$00,$80,$DB,$00,$F1
    .byte $00,$00,$80,$A3,$04,$F1,$B3,$5F,$70,$FF,$08,$F0,$F5,$80,$F4,$27
    .byte $1E,$00,$0B,$F1,$B6,$13,$50,$AB,$04,$F1,$92,$49,$20,$77,$01,$F0
    .byte $F5,$09,$F4,$22,$23,$00,$00,$F1,$BB,$62,$18,$8B,$01,$01,$F1,$BB
    .byte $62,$18,$8B,$05,$01,$F1,$BB,$61,$18,$8B,$09,$01,$F1,$BB,$61,$18
    .byte $8B,$0D,$01,$F1,$BB,$60,$18,$8B,$11,$01,$F1,$BB,$60,$18,$8B,$15
    .byte $F0,$F5,$81,$F4,$14,$15,$16,$00,$F1,$B9,$52,$B0,$E3,$0C,$28,$F7
    .byte $23,$5B,$F1,$00,$00,$80,$A3,$00,$F1,$00,$00,$80,$DB,$04,$F0,$F5
    .byte $80,$F4,$08,$09,$0A,$0B,$F1,$D3,$6D,$60,$BB,$05,$F1,$D3,$6C,$60
    .byte $BB,$01,$F1,$D3,$6F,$60,$BB,$09,$F0,$F5,$80,$F4,$08,$09,$0A,$0B
    .byte $F1,$CA,$6D,$20,$C3,$05,$F1,$CA,$6C,$20,$C3,$01,$F1,$CA,$6F,$20
    .byte $C3,$09,$F0,$F5,$80,$F4,$08,$09,$0A,$0B,$F1,$C9,$BE,$E0,$C3,$04
    .byte $F1,$C9,$BB,$E0,$C3,$00,$F1,$C9,$C1,$E0,$C3,$08,$F0,$F5,$83,$F4
    .byte $18,$19,$1A,$1B,$F1,$13,$17,$F8,$C3,$04,$F1,$CE,$15,$80,$EB,$00
    .byte $F8,$A7,$8B,$F5,$84,$34,$F4,$30,$31,$32,$00,$F1,$CC,$A5,$F8,$D3
    .byte $01,$F0,$F5,$84,$33,$F4,$30,$31,$32,$00,$F1,$CC,$A6,$F8,$D3,$01
    .byte $F0,$F5,$0F,$F4,$16,$17,$2D,$00,$F1,$00,$69,$00,$C3,$01,$F0,$F5
    .byte $80,$F4,$16,$17,$2D,$00,$F1,$00,$7B,$00,$C3,$01,$F0,$F5,$80,$F4
    .byte $16,$17,$2D,$00,$F1,$00,$7C,$00,$C3,$01,$F0,$F5,$80,$F4,$16,$17
    .byte $2D,$00,$F1,$00,$7D,$00,$C3,$01,$F0,$F5,$83,$F4,$04,$05,$1E,$1F
    .byte $F1,$00,$8C,$1C,$D7,$01,$F0,$F5,$80,$F4,$10,$11,$12,$13,$F7,$23
    .byte $5B,$F1,$E0,$6B,$06,$B3,$0C,$F1,$E0,$C5,$06,$B3,$08,$F1,$00,$00
    .byte $80,$A3,$04,$F1,$00,$00,$80,$DB,$00,$14,$F1,$E1,$C3,$FB,$B3,$15
    .byte $F1,$E1,$C2,$FB,$B3,$11,$28,$F7,$03,$7B,$F6,$54,$F6,$69,$F1,$00
    .byte $C3,$38,$B3,$0D,$F1,$00,$C2,$38,$B3,$09,$F1,$00,$6B,$C8,$B3,$04
    .byte $F1,$00,$6A,$C8,$B3,$00,$F0,$F5,$80,$F4,$04,$05,$20,$21,$F7,$03
    .byte $7B,$F1,$00,$54,$10,$BB,$09,$F1,$00,$71,$00,$CB,$05,$F1,$00,$00
    .byte $80,$FB,$00,$F0,$F5,$80,$F4,$08,$09,$0A,$0B,$F1,$CF,$4D,$00,$C3
    .byte $05,$F1,$CF,$4B,$00,$C3,$01,$F1,$CF,$58,$00,$C3,$09,$F0,$F5,$09
    .byte $F4,$60,$61,$62,$63,$F1,$0F,$79,$F0,$BB,$01,$EF,$EF,$20,$F1,$00
    .byte $82,$F0,$BB,$00,$F0,$F5,$18,$F4,$08,$09,$0A,$0B,$F1,$AC,$49,$9C
    .byte $63,$00,$F1,$67,$D4,$F0,$B3,$04,$F1,$67,$95,$F0,$B3,$08,$F1,$67
    .byte $96,$F0,$B3,$0C,$16,$F4,$0A,$0B,$00,$00,$F6,$00,$F6,$2A,$F6,$3F
    .byte $F1,$00,$DB,$20,$BB,$05,$04,$F1,$68,$E1,$20,$BB,$05,$F8,$0C,$99
    .byte $F5,$14,$F4,$74,$75,$7B,$67,$F1,$00,$81,$00,$D3,$01,$EF,$F5,$0C
    .byte $F4,$6C,$6D,$6E,$6F,$F1,$D5,$78,$F8,$D3,$00,$F0,$F5,$0E,$F8,$3A
    .byte $9C,$F5,$80,$F4,$08,$09,$0A,$0B,$F1,$DC,$4D,$60,$B3,$05,$F1,$DC
    .byte $4B,$60,$B3,$01,$F1,$DC,$58,$60,$B3,$09,$1E,$F1,$DD,$4F,$20,$C3
    .byte $09,$F1,$DD,$4D,$20,$C3,$05,$F1,$DD,$4B,$20,$C3,$01,$F1,$D7,$49
    .byte $08,$EB,$0D,$F9,$0F,$01,$FB,$01
