; ============================================================
; bank28/bank28.s
; bank 28 - 真实 6502 汇编 (8KB)
; CPU 地址范围: $8000-$9FFF
; 源: _tmp_bzk_out/bank_28/bank_28_partMM.asm
; 代码=助记符, 数据=.byte, build_nes.py 可直接编译
; ============================================================

.segment "PRG_BANK28"
.org $8000

    .byte $4C,$2D,$80
    JMP $8B22                  ; $8003
    .byte $4C,$09,$86
    JMP $8C06                  ; $8009
    JMP $8D58                  ; $800C
    .byte $4C,$A6,$8D,$4C,$9D,$81,$4C,$24,$82,$4C,$8F,$82,$4C,$2E,$85,$4C
    .byte $6A,$84,$4C,$21,$80
    JMP $82CA                  ; $8024
    .byte $4C,$FF,$84,$4C,$C1,$84,$20,$3A,$80
    LDA $9E4E,Y                ; $8030
    STA $0032                  ; $8033
    LDA #$00                   ; $8035
    STA $0033                  ; $8037
    RTS                        ; $8039
    PHA                        ; $803A
    JSR $C50C                  ; $803B
    LDY #$00                   ; $803E
    LDA ($0034),Y              ; $8040
    BNE $8050                  ; $8042
    PLA                        ; $8044
    PHA                        ; $8045
    SEC                        ; $8046
    SBC #$0B                   ; $8047
    TAY                        ; $8049
    LDA $818E,Y                ; $804A
    TAY                        ; $804D
    LDA ($0038),Y              ; $804E
    CMP #$23                   ; $8050
    PHP                        ; $8052
    BCC $8064                  ; $8053
    PHA                        ; $8055
    LDY #$01                   ; $8056
    LDA ($0034),Y              ; $8058
    BPL $8061                  ; $805A
    PLA                        ; $805C
    INY                        ; $805D
    LDA ($0034),Y              ; $805E
    PHA                        ; $8060
    PLA                        ; $8061
    SBC #$23                   ; $8062
    LDY #$00                   ; $8064
    STY $0033                  ; $8066
    ASL                        ; $8068
    ROL $0033                  ; $8069
    ASL                        ; $806B
    ROL $0033                  ; $806C
    STA $0032                  ; $806E
    PLP                        ; $8070
    BCC $8083                  ; $8071
    LDY $0033                  ; $8073
    ASL                        ; $8075
    ROL $0033                  ; $8076
    ADC $0032                  ; $8078
    STA $0032                  ; $807A
    TYA                        ; $807C
    ADC $0033                  ; $807D
    STA $0033                  ; $807F
    LDY #$02                   ; $8081
    CLC                        ; $8083
    LDA $0032                  ; $8084
    ADC $8199,Y                ; $8086
    STA $0032                  ; $8089
    LDA $0033                  ; $808B
    ADC $819A,Y                ; $808D
    STA $0033                  ; $8090
    PLA                        ; $8092
    CPX #$1F                   ; $8093
    BCC $809A                  ; $8095
    JMP $813F                  ; $8097
    PHA                        ; $809A
    PLA                        ; $809B
    BEQ $80A8                  ; $809C
    CMP #$0B                   ; $809E
    BEQ $80A8                  ; $80A0
    CMP #$1E                   ; $80A2
    BEQ $80A8                  ; $80A4
    CMP #$1F                   ; $80A6
    PHP                        ; $80A8
    LDY #$00                   ; $80A9
    LDA ($0032),Y              ; $80AB
    STY $0033                  ; $80AD
    PLP                        ; $80AF
    BNE $80D1                  ; $80B0
    ASL                        ; $80B2
    ROL $0033                  ; $80B3
    ASL                        ; $80B5
    ROL $0033                  ; $80B6
    ASL                        ; $80B8
    ROL $0033                  ; $80B9
    ADC #$86                   ; $80BB
    STA $0032                  ; $80BD
    LDA $0033                  ; $80BF
    ADC #$AE                   ; $80C1
    STA $0033                  ; $80C3
    TXA                        ; $80C5
    BEQ $80CB                  ; $80C6
    SEC                        ; $80C8
    SBC #$17                   ; $80C9
    TAY                        ; $80CB
    LDA ($0032),Y              ; $80CC
    JMP $80F9                  ; $80CE
    ASL                        ; $80D1
    ROL $0033                  ; $80D2
    ASL                        ; $80D4
    ROL $0033                  ; $80D5
    ASL                        ; $80D7
    ROL $0033                  ; $80D8
    LDY $0033                  ; $80DA
    STA $0032                  ; $80DC
    ASL                        ; $80DE
    ROL $0033                  ; $80DF
    ADC $0032                  ; $80E1
    STA $0032                  ; $80E3
    TYA                        ; $80E5
    ADC $0033                  ; $80E6
    STA $0033                  ; $80E8
    CLC                        ; $80EA
    LDA $0032                  ; $80EB
    ADC #$CE                   ; $80ED
    STA $0032                  ; $80EF
    LDA $0033                  ; $80F1
    ADC #$9F                   ; $80F3
    STA $0033                  ; $80F5
    TXA                        ; $80F7
    TAY                        ; $80F8
    .byte $8A
    BEQ $8113                  ; $80FA
    LDA ($0032),Y              ; $80FC
    PHA                        ; $80FE
    LDY #$03                   ; $80FF
    LDA ($0034),Y              ; $8101
    ASL                        ; $8103
    STA $0032                  ; $8104
    PLA                        ; $8106
    ADC $0032                  ; $8107
    TAY                        ; $8109
    CPY #$C0                   ; $810A
    BCC $8110                  ; $810C
    .byte $A0,$BF
    STY $0032                  ; $8110
    RTS                        ; $8112
    LDA ($0032),Y              ; $8113
    PHA                        ; $8115
    LDY #$03                   ; $8116
    LDA ($0034),Y              ; $8118
    STA $0032                  ; $811A
    PLA                        ; $811C
    ADC $0032                  ; $811D
    CMP #$5F                   ; $811F
    BCC $8125                  ; $8121
    LDA #$5F                   ; $8123
    LDY #$9F                   ; $8125
    ASL                        ; $8127
    BCC $812B                  ; $8128
    .byte $C8
    STY $0033                  ; $812B
    LDY #$0E                   ; $812D
    STY $0032                  ; $812F
    TAY                        ; $8131
    LDA ($0032),Y              ; $8132
    TAX                        ; $8134
    INY                        ; $8135
    LDA ($0032),Y              ; $8136
    STA $0033                  ; $8138
    STX $0032                  ; $813A
    JMP $818B                  ; $813C
    .byte $E0,$25
    BCS $817E                  ; $8141
    LDY #$01                   ; $8143
    LDA ($0032),Y              ; $8145
    DEY                        ; $8147
    STY $0033                  ; $8148
    ASL                        ; $814A
    ROL $0033                  ; $814B
    ASL                        ; $814D
    ROL $0033                  ; $814E
    STA $0032                  ; $8150
    LDY $0033                  ; $8152
    ASL                        ; $8154
    ROL $0033                  ; $8155
    ADC $0032                  ; $8157
    STA $0032                  ; $8159
    TYA                        ; $815B
    ADC $0033                  ; $815C
    TAY                        ; $815E
    LDA $0032                  ; $815F
    CLC                        ; $8161
    ADC #$AE                   ; $8162
    STA $0032                  ; $8164
    TYA                        ; $8166
    ADC #$AF                   ; $8167
    STA $0033                  ; $8169
    TXA                        ; $816B
    SEC                        ; $816C
    SBC #$1F                   ; $816D
    ASL                        ; $816F
    TAY                        ; $8170
    LDA ($0032),Y              ; $8171
    TAX                        ; $8173
    INY                        ; $8174
    LDA ($0032),Y              ; $8175
    STA $0033                  ; $8177
    STX $0032                  ; $8179
    JMP $818B                  ; $817B
    TXA                        ; $817E
    SEC                        ; $817F
    SBC #$23                   ; $8180
    TAY                        ; $8182
    LDA ($0032),Y              ; $8183
    STA $0032                  ; $8185
    LDA #$00                   ; $8187
    STA $0033                  ; $8189
    .byte $68
    PLA                        ; $818C
    RTS                        ; $818D
    .byte $02,$03,$03,$03,$03,$04,$05,$04,$05,$04,$05,$D6,$95,$62,$96,$AD
    .byte $3B,$04
    PHP                        ; $81A0
    ASL                        ; $81A1
    ADC $043B                  ; $81A2
    ADC $044E                  ; $81A5
    TAY                        ; $81A8
    PLP                        ; $81A9
    BNE $81BB                  ; $81AA
    LDA $043C                  ; $81AC
    AND #$7F                   ; $81AF
    CMP #$03                   ; $81B1
    BCC $81BB                  ; $81B3
    TYA                        ; $81B5
    SEC                        ; $81B6
    SBC $044E                  ; $81B7
    TAY                        ; $81BA
    LDX $8206,Y                ; $81BB
    CPX #$FF                   ; $81BE
    BEQ $8203                  ; $81C0
    LDA $0441                  ; $81C2
    JSR $803A                  ; $81C5
    TYA                        ; $81C8
    PHA                        ; $81C9
    LDA $043B                  ; $81CA
    ASL                        ; $81CD
    TAX                        ; $81CE
    LDA $9460,X                ; $81CF
    STA $0032                  ; $81D2
    LDA $9461,X                ; $81D4
    STA $0033                  ; $81D7
    LDA $043C                  ; $81D9
    ASL                        ; $81DC
    ASL                        ; $81DD
    TAY                        ; $81DE
    LDA ($0032),Y              ; $81DF
    STA $0444                  ; $81E1
    INY                        ; $81E4
    LDA ($0032),Y              ; $81E5
    TAX                        ; $81E7
    INY                        ; $81E8
    LDA ($0032),Y              ; $81E9
    STA $043F                  ; $81EB
    INY                        ; $81EE
    LDA ($0032),Y              ; $81EF
    AND #$03                   ; $81F1
    STA $0440                  ; $81F3
    LDA ($0032),Y              ; $81F6
    AND #$F8                   ; $81F8
    LSR                        ; $81FA
    LSR                        ; $81FB
    LSR                        ; $81FC
    STA $0443                  ; $81FD
    JMP $8278                  ; $8200
    .byte $4C,$03,$82,$01,$07,$0F,$02,$08,$10,$03,$FF,$FF,$02,$FF,$FF,$FF
    .byte $09,$11,$FF,$0A,$12,$FF,$0B,$13,$01,$FF,$FF,$01,$FF,$FF,$01,$FF
    .byte $FF,$AD,$3D,$04
    ASL                        ; $8227
    ADC $043D                  ; $8228
    ADC $044E                  ; $822B
    TAY                        ; $822E
    LDX $824C,Y                ; $822F
    LDA $0442                  ; $8232
    JSR $803A                  ; $8235
    TYA                        ; $8238
    PHA                        ; $8239
    LDA $043D                  ; $823A
    ASL                        ; $823D
    TAX                        ; $823E
    LDA $9554,X                ; $823F
    STA $0032                  ; $8242
    LDA $9555,X                ; $8244
    STA $0033                  ; $8247
    JMP $825B                  ; $8249
    .byte $04,$04,$04,$05,$05,$05,$06,$0E,$16,$FF,$0C,$14,$FF,$0D,$15,$AD
    .byte $3E,$04
    ASL                        ; $825E
    ASL                        ; $825F
    TAY                        ; $8260
    LDA ($0032),Y              ; $8261
    STA $0445                  ; $8263
    INY                        ; $8266
    LDA ($0032),Y              ; $8267
    TAX                        ; $8269
    INY                        ; $826A
    LDA ($0032),Y              ; $826B
    STA $043F                  ; $826D
    INY                        ; $8270
    LDA ($0032),Y              ; $8271
    AND #$03                   ; $8273
    STA $0440                  ; $8275
    .byte $86,$32
    PLA                        ; $827A
    CLC                        ; $827B
    ADC $0032                  ; $827C
    CMP #$C0                   ; $827E
    BCC $8284                  ; $8280
    .byte $A9,$BF
    TAX                        ; $8284
    LDA $9E4E,X                ; $8285
    STA $0032                  ; $8288
    LDA #$00                   ; $828A
    STA $0033                  ; $828C
    RTS                        ; $828E
    .byte $AC,$3D,$04
    CPY #$03                   ; $8292
    BNE $829C                  ; $8294
    DEY                        ; $8296
    TYA                        ; $8297
    CLC                        ; $8298
    ADC #$03                   ; $8299
    TAY                        ; $829B
    LDX $82C0,Y                ; $829C
    LDA $05FB                  ; $829F
    EOR #$0B                   ; $82A2
    JSR $803A                  ; $82A4
    TYA                        ; $82A7
    PHA                        ; $82A8
    LDA $043D                  ; $82A9
    ASL                        ; $82AC
    TAX                        ; $82AD
    LDA $959E,X                ; $82AE
    STA $0032                  ; $82B1
    LDA $959F,X                ; $82B3
    STA $0033                  ; $82B6
    LDA #$00                   ; $82B8
    STA $0445                  ; $82BA
    JMP $825B                  ; $82BD
    .byte $19,$1A,$19,$1D,$1E,$1C,$1B,$1A,$1A,$1A,$20,$2D,$C5
    LDA #$00                   ; $82CD
    STA $0011                  ; $82CF
    STA $0012                  ; $82D1
    LDA #$4A                   ; $82D3
    STA $0061                  ; $82D5
    LDA #$83                   ; $82D7
    STA $0062                  ; $82D9
    LDA #$00                   ; $82DB
    PHA                        ; $82DD
    LDA #$01                   ; $82DE
    JSR $C515                  ; $82E0
    LDA $0515                  ; $82E3
    BNE $82DE                  ; $82E6
    LDA #$01                   ; $82E8
    STA $0515                  ; $82EA
    PLA                        ; $82ED
    PHA                        ; $82EE
    LDX #$00                   ; $82EF
    JSR $830A                  ; $82F1
    PLA                        ; $82F4
    CLC                        ; $82F5
    ADC #$01                   ; $82F6
    PHA                        ; $82F8
    JSR $830A                  ; $82F9
    LDA #$80                   ; $82FC
    STA $0515                  ; $82FE
    PLA                        ; $8301
    CLC                        ; $8302
    ADC #$01                   ; $8303
    CMP #$0C                   ; $8305
    BNE $82DD                  ; $8307
    RTS                        ; $8309
    PHA                        ; $830A
    LDA #$18                   ; $830B
    STA $04A5,X                ; $830D
    LDA #$40                   ; $8310
    STA $04A6,X                ; $8312
    PLA                        ; $8315
    CLC                        ; $8316
    ADC #$11                   ; $8317
    LSR                        ; $8319
    ROR $04A6,X                ; $831A
    LSR                        ; $831D
    ROR $04A6,X                ; $831E
    LSR                        ; $8321
    ROR $04A6,X                ; $8322
    ORA #$20                   ; $8325
    STA $04A7,X                ; $8327
    INX                        ; $832A
    INX                        ; $832B
    INX                        ; $832C
    LDY #$00                   ; $832D
    LDA ($0061),Y              ; $832F
    STA $04A5,X                ; $8331
    INX                        ; $8334
    INY                        ; $8335
    CPY #$18                   ; $8336
    BNE $832F                  ; $8338
    LDA #$00                   ; $833A
    STA $04A5,X                ; $833C
    TYA                        ; $833F
    CLC                        ; $8340
    ADC $0061                  ; $8341
    STA $0061                  ; $8343
    BCC $8349                  ; $8345
    INC $0062                  ; $8347
    RTS                        ; $8349
    .byte $00,$00,$C9,$D2,$D2,$D2,$D2,$D2,$D2,$D2,$D2,$D2,$C9,$D2,$D2,$D2
    .byte $D2,$D2,$D2,$D2,$D2,$D2,$D0,$00,$00,$00,$CC,$FF,$FF,$FF,$FF,$FF
    .byte $FF,$FF,$FF,$FF,$CC,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$D0,$00
    .byte $00,$00,$C9,$D2,$D2,$D2,$CC,$FF,$FF,$FF,$FF,$FF,$CC,$FF,$FF,$FF
    .byte $FF,$FF,$C9,$D2,$D2,$D2,$D0,$00,$00,$00,$CC,$FF,$FF,$FF,$CC,$FF
    .byte $FF,$FF,$FF,$FF,$CC,$FF,$FF,$FF,$FF,$FF,$CC,$FF,$FF,$FF,$D0,$00
    .byte $00,$00,$C9,$D2,$CC,$FF,$CC,$FF,$FF,$FF,$C0,$C1,$C4,$C5,$FF,$FF
    .byte $FF,$FF,$CC,$FF,$C9,$D2,$D0,$00,$00,$C9,$CC,$FF,$CC,$FF,$CC,$FF
    .byte $FF,$FF,$C2,$FF,$CC,$C7,$FF,$FF,$FF,$FF,$CC,$FF,$CC,$FF,$C9,$D0
    .byte $00,$C6,$CC,$FF,$CC,$FF,$CC,$FF,$FF,$FF,$C8,$FF,$CC,$CD,$FF,$FF
    .byte $FF,$FF,$CC,$FF,$CC,$FF,$C6,$D0,$00,$00,$C6,$C3,$CC,$FF,$CC,$FF
    .byte $FF,$FF,$CA,$CB,$CE,$CF,$FF,$FF,$FF,$FF,$CC,$FF,$C6,$C3,$D0,$00
    .byte $00,$00,$CC,$FF,$FF,$FF,$CC,$FF,$FF,$FF,$FF,$FF,$CC,$FF,$FF,$FF
    .byte $FF,$FF,$CC,$FF,$FF,$FF,$D0,$00,$00,$00,$C6,$C3,$C3,$C3,$CC,$FF
    .byte $FF,$FF,$FF,$FF,$CC,$FF,$FF,$FF,$FF,$FF,$C6,$C3,$C3,$C3,$D0,$00
    .byte $00,$00,$CC,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$CC,$FF,$FF,$FF
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$D0,$00,$00,$00,$C6,$C3,$C3,$C3,$C3,$C3
    .byte $C3,$C3,$C3,$C3,$C6,$C3,$C3,$C3,$C3,$C3,$C3,$C3,$C3,$C3,$D0,$00
    .byte $A9,$00
    STA $0628                  ; $846C
    LDA $043C                  ; $846F
    AND #$3F                   ; $8472
    BNE $8498                  ; $8474
    LDX $0635                  ; $8476
    LDY $0637                  ; $8479
    JSR $8499                  ; $847C
    TAX                        ; $847F
    BNE $8498                  ; $8480
    LDA $0638                  ; $8482
    JSR $C536                  ; $8485
    JSR $8499                  ; $8488
    CMP #$00                   ; $848B
    BEQ $8498                  ; $848D
    CMP #$04                   ; $848F
    BEQ $8498                  ; $8491
    LDA #$80                   ; $8493
    STA $0628                  ; $8495
    RTS                        ; $8498
    LDA $05FB                  ; $8499
    BNE $84A2                  ; $849C
    TXA                        ; $849E
    EOR #$FF                   ; $849F
    TAX                        ; $84A1
    CPX #$60                   ; $84A2
    BCS $84BE                  ; $84A4
    TYA                        ; $84A6
    BPL $84AB                  ; $84A7
    EOR #$FF                   ; $84A9
    TAY                        ; $84AB
    JSR $C539                  ; $84AC
    LDX #$00                   ; $84AF
    CMP $8BBE,X                ; $84B1
    BEQ $84BA                  ; $84B4
    INX                        ; $84B6
    INX                        ; $84B7
    BNE $84B1                  ; $84B8
    LDA $8BBF,X                ; $84BA
    RTS                        ; $84BD
    PLA                        ; $84BE
    PLA                        ; $84BF
    RTS                        ; $84C0
    .byte $AD,$FB,$05
    BEQ $84F3                  ; $84C4
    LDA #$00                   ; $84C6
    STA $043C                  ; $84C8
    STA $043E                  ; $84CB
    LDX #$00                   ; $84CE
    LDA a: $00E2               ; $84D0
    CMP #$1F                   ; $84D3
    BCS $84DF                  ; $84D5
    JSR $8A20                  ; $84D7
    JSR $8A09                  ; $84DA
    LDX #$01                   ; $84DD
    STX $043B                  ; $84DF
    LDA $0441                  ; $84E2
    JSR $8C06                  ; $84E5
    LDA $0430                  ; $84E8
    BEQ $84F0                  ; $84EB
    LDA $0431                  ; $84ED
    STA $043C                  ; $84F0
    LDA a: $00E3               ; $84F3
    AND #$01                   ; $84F6
    EOR $0612                  ; $84F8
    STA $0612                  ; $84FB
    RTS                        ; $84FE
    .byte $AE,$FB,$05
    BEQ $8506                  ; $8502
    LDX #$03                   ; $8504
    LDA a: $00E2               ; $8506
    ADC a: $00E3               ; $8509
    LDY #$00                   ; $850C
    CMP $8528,X                ; $850E
    BCS $8517                  ; $8511
    INY                        ; $8513
    INX                        ; $8514
    BNE $850E                  ; $8515
    TYA                        ; $8517
    CLC                        ; $8518
    ADC #$07                   ; $8519
    LDX $05FB                  ; $851B
    BEQ $8524                  ; $851E
    STA $043B                  ; $8520
    RTS                        ; $8523
    STA $043D                  ; $8524
    RTS                        ; $8527
    .byte $B3,$4F,$00,$AA,$54,$00,$A0,$06
    LDA ($0038),Y              ; $8530
    AND #$01                   ; $8532
    ASL                        ; $8534
    ADC $061E                  ; $8535
    STA $061E                  ; $8538
    LDA ($0038),Y              ; $853B
    LSR                        ; $853D
    LSR                        ; $853E
    LSR                        ; $853F
    LSR                        ; $8540
    CLC                        ; $8541
    ADC #$0A                   ; $8542
    STA $0441                  ; $8544
    LDA #$00                   ; $8547
    STA $003C                  ; $8549
    LDY #$07                   ; $854B
    LDA ($0038),Y              ; $854D
    JSR $8AEB                  ; $854F
    CLC                        ; $8552
    LDA $003C                  ; $8553
    ADC #$2E                   ; $8555
    STA $003C                  ; $8557
    TXA                        ; $8559
    ADC #$B1                   ; $855A
    STA $003D                  ; $855C
    LDA #$00                   ; $855E
    STA $043C                  ; $8560
    STA $003E                  ; $8563
    JSR $8B0B                  ; $8565
    STA $043B                  ; $8568
    LDA $043B                  ; $856B
    JSR $C509                  ; $856E
    .byte $DF,$87,$E9,$87,$83,$85,$83,$85,$83,$85,$83,$85,$83,$85,$83,$85
    .byte $83,$85,$A0,$08
    LDA ($0038),Y              ; $8585
    JSR $895E                  ; $8587
    LSR                        ; $858A
    LSR                        ; $858B
    CMP #$0F                   ; $858C
    BNE $8596                  ; $858E
    .byte $20,$20,$8A,$4C,$99,$85
    CLC                        ; $8596
    ADC #$0A                   ; $8597
    CMP $0441                  ; $8599
    BNE $85A7                  ; $859C
    CLC                        ; $859E
    ADC #$01                   ; $859F
    CMP #$16                   ; $85A1
    BCC $85A7                  ; $85A3
    .byte $A9,$0C
    JSR $8A09                  ; $85A7
    LDA #$01                   ; $85AA
    STA $043B                  ; $85AC
    LDA #$00                   ; $85AF
    STA $043C                  ; $85B1
    RTS                        ; $85B4
    .byte $A9,$00
    STA $003D                  ; $85B7
    LDX $0621                  ; $85B9
    LDY $8604,X                ; $85BC
    TYA                        ; $85BF
    ASL                        ; $85C0
    ASL                        ; $85C1
    STA $003E                  ; $85C2
    INY                        ; $85C4
    INY                        ; $85C5
    INY                        ; $85C6
    INY                        ; $85C7
    LDA ($003A),Y              ; $85C8
    ASL                        ; $85CA
    ROL $003D                  ; $85CB
    ASL                        ; $85CD
    ROL $003D                  ; $85CE
    STA $003C                  ; $85D0
    LDX $003D                  ; $85D2
    ASL                        ; $85D4
    ROL $003D                  ; $85D5
    ADC $003C                  ; $85D7
    STA $003C                  ; $85D9
    TXA                        ; $85DB
    ADC $003D                  ; $85DC
    TAX                        ; $85DE
    LDA $003C                  ; $85DF
    CLC                        ; $85E1
    ADC #$2E                   ; $85E2
    STA $003C                  ; $85E4
    TXA                        ; $85E6
    ADC #$BA                   ; $85E7
    STA $003D                  ; $85E9
    JSR $8B0B                  ; $85EB
    STA $043D                  ; $85EE
    TAX                        ; $85F1
    LDA $0442                  ; $85F2
    JSR $8DA6                  ; $85F5
    LDA $0430                  ; $85F8
    BEQ $8600                  ; $85FB
    LDA $0431                  ; $85FD
    STA $043E                  ; $8600
    RTS                        ; $8603
    .byte $00,$01,$FF,$02,$00,$AD,$FB,$05
    BEQ $8611                  ; $860C
    JMP $875D                  ; $860E
    LDA $0600                  ; $8611
    BEQ $863E                  ; $8614
    LDA #$00                   ; $8616
    PHA                        ; $8618
    LDA #$01                   ; $8619
    JSR $C515                  ; $861B
    PLA                        ; $861E
    PHA                        ; $861F
    STA $0040                  ; $8620
    TAX                        ; $8622
    LDA $0601,X                ; $8623
    JSR $863F                  ; $8626
    PLA                        ; $8629
    TAX                        ; $862A
    LDA $043D                  ; $862B
    STA $060B,X                ; $862E
    LDA $043E                  ; $8631
    STA $0606,X                ; $8634
    INX                        ; $8637
    TXA                        ; $8638
    CMP $0600                  ; $8639
    BNE $8618                  ; $863C
    RTS                        ; $863E
    STA $0442                  ; $863F
    JSR $8A62                  ; $8642
    LDA #$00                   ; $8645
    STA $003C                  ; $8647
    LDA $0442                  ; $8649
    CMP #$0B                   ; $864C
    BNE $8653                  ; $864E
    JMP $85B5                  ; $8650
    LDY $0621                  ; $8653
    LDA $86B5,Y                ; $8656
    STA $003C                  ; $8659
    BEQ $8663                  ; $865B
    JSR $8AB3                  ; $865D
    JMP $868E                  ; $8660
    LDA $0635                  ; $8663
    EOR #$FF                   ; $8666
    TAX                        ; $8668
    LDA #$14                   ; $8669
    CPX #$A0                   ; $866B
    BCS $868E                  ; $866D
    LDA #$10                   ; $866F
    CPX #$60                   ; $8671
    BCS $868E                  ; $8673
    LDA $0637                  ; $8675
    BPL $867C                  ; $8678
    EOR #$FF                   ; $867A
    TAY                        ; $867C
    JSR $C539                  ; $867D
    LDX #$00                   ; $8680
    CMP $8BBE,X                ; $8682
    BEQ $868B                  ; $8685
    INX                        ; $8687
    INX                        ; $8688
    BNE $8682                  ; $8689
    LDA $8BBF,X                ; $868B
    .byte $A0,$07
    JSR $8ADE                  ; $8690
    CLC                        ; $8693
    LDA $003C                  ; $8694
    ADC #$AE                   ; $8696
    STA $003C                  ; $8698
    TXA                        ; $869A
    ADC #$B8                   ; $869B
    STA $003D                  ; $869D
    JSR $8B0B                  ; $869F
    STA $043D                  ; $86A2
    LDA #$00                   ; $86A5
    STA $043E                  ; $86A7
    LDA $003F                  ; $86AA
    JSR $C509                  ; $86AC
    .byte $BA,$86,$EB,$86,$10,$87,$00,$02,$01,$00,$00,$AD,$3D,$04
    JSR $C509                  ; $86BD
    .byte $C8,$86,$D0,$86,$D8,$86,$E0,$86,$A9,$01
    STA $043D                  ; $86CA
    JMP $8732                  ; $86CD
    .byte $A9,$02
    STA $043D                  ; $86D2
    JMP $8732                  ; $86D5
    .byte $A9,$00
    STA $043D                  ; $86DA
    JMP $8732                  ; $86DD
    .byte $A9,$01
    STA $043D                  ; $86E2
    LDA #$05                   ; $86E5
    STA $043E                  ; $86E7
    RTS                        ; $86EA
    .byte $AD,$3D,$04
    JSR $C509                  ; $86EE
    .byte $F9,$86,$FF,$86,$05,$87,$08,$87,$A9,$05
    STA $043D                  ; $86FB
    RTS                        ; $86FE
    .byte $A9,$04
    STA $043D                  ; $8701
    RTS                        ; $8704
    .byte $4C,$D0,$86,$A9,$01
    STA $043E                  ; $870A
    JMP $86FF                  ; $870D
    .byte $AD,$3D,$04
    JSR $C509                  ; $8713
    .byte $1E,$87,$21,$87,$27,$87,$2A,$87,$4C,$F9,$86,$A9,$03
    STA $043D                  ; $8723
    RTS                        ; $8726
    .byte $4C,$D0,$86,$A9,$01
    STA $043E                  ; $872C
    JMP $8721                  ; $872F
    .byte $AD,$42,$04
    LDX $043D                  ; $8735
    JSR $8D58                  ; $8738
    LDA $0430                  ; $873B
    BEQ $8743                  ; $873E
    LDA $0431                  ; $8740
    STA $043E                  ; $8743
    RTS                        ; $8746
    .byte $03,$04,$04,$04,$04,$05,$06,$05,$06,$05,$06,$00,$06,$06,$06,$06
    .byte $07,$08,$07,$08,$07,$08,$AD,$41,$04
    JSR $8A62                  ; $8760
    LDY $0621                  ; $8763
    LDA $87C3,Y                ; $8766
    STA $003C                  ; $8769
    BEQ $8773                  ; $876B
    JSR $8AB3                  ; $876D
    JMP $879C                  ; $8770
    LDA #$14                   ; $8773
    LDX $0635                  ; $8775
    CPX #$A0                   ; $8778
    BCS $879C                  ; $877A
    LDA #$10                   ; $877C
    CPX #$60                   ; $877E
    BCS $879C                  ; $8780
    LDY $0637                  ; $8782
    BPL $878B                  ; $8785
    TYA                        ; $8787
    EOR #$FF                   ; $8788
    TAY                        ; $878A
    JSR $C539                  ; $878B
    LDX #$00                   ; $878E
    CMP $8BBE,X                ; $8790
    BEQ $8799                  ; $8793
    INX                        ; $8795
    INX                        ; $8796
    BNE $8790                  ; $8797
    LDA $8BBF,X                ; $8799
    .byte $A0,$04
    JSR $8ADE                  ; $879E
    CLC                        ; $87A1
    LDA $003C                  ; $87A2
    ADC #$2E                   ; $87A4
    STA $003C                  ; $87A6
    TXA                        ; $87A8
    ADC #$B1                   ; $87A9
    STA $003D                  ; $87AB
    JSR $8B0B                  ; $87AD
    STA $043B                  ; $87B0
    LDA #$00                   ; $87B3
    STA $043C                  ; $87B5
    LDA $003F                  ; $87B8
    JSR $C509                  ; $87BA
    .byte $C7,$87,$DA,$88,$FD,$88,$00,$01,$02,$00,$AD,$3B,$04
    JSR $C509                  ; $87CA
    .byte $DF,$87,$E9,$87,$EF,$87,$F2,$87,$FA,$87,$4A,$88,$55,$88,$60,$88
    .byte $A8,$88,$AD,$E2,$00,$29,$20,$D0,$03,$4C,$27,$89,$20,$27,$89
    JMP $8A3F                  ; $87EC
    .byte $4C,$33,$89,$A9,$02
    STA $043B                  ; $87F4
    JMP $8A3F                  ; $87F7
    .byte $A9,$03
    STA $043B                  ; $87FC
    JSR $8A3F                  ; $87FF
    LDA $043C                  ; $8802
    BNE $8849                  ; $8805
    LDA #$0C                   ; $8807
    STA $003A                  ; $8809
    LDA $003A                  ; $880B
    CMP $0441                  ; $880D
    BEQ $8839                  ; $8810
    JSR $C50C                  ; $8812
    LDY #$06                   ; $8815
    LDA ($0034),Y              ; $8817
    SEC                        ; $8819
    SBC $0635                  ; $881A
    BCS $8823                  ; $881D
    EOR #$FF                   ; $881F
    ADC #$01                   ; $8821
    CMP #$14                   ; $8823
    BCS $8839                  ; $8825
    LDY #$08                   ; $8827
    LDA ($0034),Y              ; $8829
    SEC                        ; $882B
    SBC $0637                  ; $882C
    BCS $8835                  ; $882F
    EOR #$FF                   ; $8831
    ADC #$01                   ; $8833
    CMP #$14                   ; $8835
    BCC $8844                  ; $8837
    INC $003A                  ; $8839
    LDA $003A                  ; $883B
    CMP #$16                   ; $883D
    BNE $880B                  ; $883F
    JMP $87F2                  ; $8841
    LDA $003A                  ; $8844
    JSR $8A09                  ; $8846
    RTS                        ; $8849
    .byte $A9,$00
    STA $043B                  ; $884C
    LDA #$0C                   ; $884F
    STA $043C                  ; $8851
    RTS                        ; $8854
    .byte $A9,$00
    STA $043B                  ; $8857
    LDA #$0D                   ; $885A
    STA $043C                  ; $885C
    RTS                        ; $885F
    .byte $A9,$02
    STA $043B                  ; $8862
    BIT $044B                  ; $8865
    BMI $88A7                  ; $8868
    LDA #$80                   ; $886A
    STA $044B                  ; $886C
    LDA #$0C                   ; $886F
    PHA                        ; $8871
    JSR $C50C                  ; $8872
    LDY #$01                   ; $8875
    LDA #$80                   ; $8877
    STA ($0034),Y              ; $8879
    INY                        ; $887B
    LDA #$C8                   ; $887C
    STA ($0034),Y              ; $887E
    PLA                        ; $8880
    CLC                        ; $8881
    ADC #$01                   ; $8882
    CMP #$16                   ; $8884
    BNE $8871                  ; $8886
    LDA #$01                   ; $8888
    STA a: $002F               ; $888A
    LDA #$00                   ; $888D
    STA $062D                  ; $888F
    LDA $0615                  ; $8892
    AND #$BF                   ; $8895
    STA $0615                  ; $8897
    LDA #$15                   ; $889A
    JSR $C54E                  ; $889C
    BIT $0615                  ; $889F
    BPL $88A7                  ; $88A2
    JSR $C575                  ; $88A4
    RTS                        ; $88A7
    .byte $A9,$02
    STA $043B                  ; $88AA
    BIT $044C                  ; $88AD
    BMI $88D9                  ; $88B0
    LDA #$80                   ; $88B2
    STA $044C                  ; $88B4
    STA $03F1                  ; $88B7
    LDA #$C9                   ; $88BA
    STA $03F2                  ; $88BC
    LDA #$00                   ; $88BF
    STA $062D                  ; $88C1
    LDA $0615                  ; $88C4
    AND #$BF                   ; $88C7
    STA $0615                  ; $88C9
    LDA #$16                   ; $88CC
    JSR $C54E                  ; $88CE
    BIT $0615                  ; $88D1
    BPL $88D9                  ; $88D4
    JSR $C575                  ; $88D6
    RTS                        ; $88D9
    .byte $AD,$3B,$04
    JSR $C509                  ; $88DD
    .byte $E8,$88,$EE,$88,$F4,$88,$F7,$88,$20,$27,$89
    JMP $8A3F                  ; $88EB
    .byte $A9,$05
    STA $043B                  ; $88F0
    RTS                        ; $88F3
    .byte $4C,$33,$89,$A9,$04
    STA $043B                  ; $88F9
    RTS                        ; $88FC
    .byte $AD,$3B,$04
    JSR $C509                  ; $8900
    .byte $0B,$89,$11,$89,$17,$89,$1A,$89,$A9,$04
    STA $043B                  ; $890D
    RTS                        ; $8910
    .byte $A9,$06
    STA $043B                  ; $8913
    RTS                        ; $8916
    .byte $4C,$33,$89,$A9,$06
    STA $043B                  ; $891C
    LDA #$01                   ; $891F
    STA $043C                  ; $8921
    JMP $8911                  ; $8924
    LDA #$00                   ; $8927
    STA $043B                  ; $8929
    LDA $044E                  ; $892C
    STA $043C                  ; $892F
    RTS                        ; $8932
    .byte $A0,$0A
    LDA ($003A),Y              ; $8935
    JSR $895E                  ; $8937
    AND #$03                   ; $893A
    PHA                        ; $893C
    LDA ($003C),Y              ; $893D
    LSR                        ; $893F
    LSR                        ; $8940
    CMP #$0F                   ; $8941
    BEQ $894D                  ; $8943
    CLC                        ; $8945
    ADC #$0A                   ; $8946
    CMP $0441                  ; $8948
    BNE $8950                  ; $894B
    JSR $8A20                  ; $894D
    STA $003C                  ; $8950
    PLA                        ; $8952
    JSR $C509                  ; $8953
    .byte $7E,$89,$84,$89,$93,$89,$9C,$89
    LDX #$00                   ; $895E
    STX $003D                  ; $8960
    ASL                        ; $8962
    ROL $003D                  ; $8963
    ASL                        ; $8965
    ROL $003D                  ; $8966
    ASL                        ; $8968
    ROL $003D                  ; $8969
    ADC #$2E                   ; $896B
    STA $003C                  ; $896D
    LDA $003D                  ; $896F
    ADC #$B7                   ; $8971
    STA $003D                  ; $8973
    LDA a: $00E2               ; $8975
    AND #$07                   ; $8978
    TAY                        ; $897A
    LDA ($003C),Y              ; $897B
    RTS                        ; $897D
    .byte $20,$B3,$89
    JMP $89A5                  ; $8981
    .byte $20,$B3,$89,$6E,$E2,$00
    JSR $8A20                  ; $898A
    JSR $89B3                  ; $898D
    JMP $89A5                  ; $8990
    .byte $20,$B3,$89
    JSR $89DA                  ; $8996
    JMP $8987                  ; $8999
    .byte $20,$DA,$89
    JSR $89B3                  ; $899F
    JMP $8987                  ; $89A2
    .byte $AE,$21,$06
    LDA $89AF,X                ; $89A8
    STA $043B                  ; $89AB
    RTS                        ; $89AE
    .byte $02,$04,$04,$02
    LDA $003C                  ; $89B3
    JSR $C50C                  ; $89B5
    LDY #$06                   ; $89B8
    LDA $0635                  ; $89BA
    SEC                        ; $89BD
    SBC ($0034),Y              ; $89BE
    BCS $89CA                  ; $89C0
    LDA $0635                  ; $89C2
    CMP #$60                   ; $89C5
    BCC $89CA                  ; $89C7
    RTS                        ; $89C9
    LDA $003C                  ; $89CA
    JSR $8A09                  ; $89CC
    LDA #$01                   ; $89CF
    STA $043B                  ; $89D1
    JSR $8A3F                  ; $89D4
    PLA                        ; $89D7
    PLA                        ; $89D8
    RTS                        ; $89D9
    LDA #$0C                   ; $89DA
    STA $003E                  ; $89DC
    LDA $003E                  ; $89DE
    CMP $0441                  ; $89E0
    BEQ $89F0                  ; $89E3
    JSR $C50C                  ; $89E5
    LDY #$06                   ; $89E8
    LDA ($0034),Y              ; $89EA
    CMP #$60                   ; $89EC
    BCC $89F9                  ; $89EE
    INC $003E                  ; $89F0
    LDA $003E                  ; $89F2
    CMP #$16                   ; $89F4
    BNE $89DE                  ; $89F6
    RTS                        ; $89F8
    LDA $003E                  ; $89F9
    JSR $8A09                  ; $89FB
    LDA #$01                   ; $89FE
    STA $043B                  ; $8A00
    JSR $8A3F                  ; $8A03
    PLA                        ; $8A06
    PLA                        ; $8A07
    RTS                        ; $8A08
    STA $05FC                  ; $8A09
    JSR $C50C                  ; $8A0C
    LDY #$06                   ; $8A0F
    LDA ($0034),Y              ; $8A11
    TAX                        ; $8A13
    LDY #$08                   ; $8A14
    LDA ($0034),Y              ; $8A16
    TAY                        ; $8A18
    JSR $C539                  ; $8A19
    STA $0638                  ; $8A1C
    RTS                        ; $8A1F
    LDA a: $00E2               ; $8A20
    ADC a: $00E3               ; $8A23
    AND #$0F                   ; $8A26
    CMP #$0A                   ; $8A28
    BCC $8A2E                  ; $8A2A
    SBC #$0A                   ; $8A2C
    CLC                        ; $8A2E
    ADC #$0C                   ; $8A2F
    CMP $0441                  ; $8A31
    BNE $8A3E                  ; $8A34
    ADC #$01                   ; $8A36
    CMP #$16                   ; $8A38
    BCC $8A3E                  ; $8A3A
    LDA #$0C                   ; $8A3C
    RTS                        ; $8A3E
    .byte $AD,$41,$04
    LDX $043B                  ; $8A42
    JSR $8C06                  ; $8A45
    LDA $0430                  ; $8A48
    BEQ $8A50                  ; $8A4B
    LDA $0431                  ; $8A4D
    STA $043C                  ; $8A50
    TAX                        ; $8A53
    BNE $8A61                  ; $8A54
    LDA $043B                  ; $8A56
    BNE $8A61                  ; $8A59
    LDA $044E                  ; $8A5B
    STA $043C                  ; $8A5E
    RTS                        ; $8A61
    PHA                        ; $8A62
    JSR $C50C                  ; $8A63
    LDY #$00                   ; $8A66
    LDA ($0034),Y              ; $8A68
    BNE $8A74                  ; $8A6A
    PLA                        ; $8A6C
    PHA                        ; $8A6D
    TAX                        ; $8A6E
    LDY $8A9D,X                ; $8A6F
    LDA ($0038),Y              ; $8A72
    TAX                        ; $8A74
    LDY #$01                   ; $8A75
    LDA ($0034),Y              ; $8A77
    BPL $8A7F                  ; $8A79
    INY                        ; $8A7B
    LDA ($0034),Y              ; $8A7C
    TAX                        ; $8A7E
    TXA                        ; $8A7F
    SEC                        ; $8A80
    SBC #$23                   ; $8A81
    LDX #$00                   ; $8A83
    STX $003B                  ; $8A85
    ASL                        ; $8A87
    ROL $003B                  ; $8A88
    ASL                        ; $8A8A
    ROL $003B                  ; $8A8B
    STA $003A                  ; $8A8D
    LDX $003B                  ; $8A8F
    ASL                        ; $8A91
    ROL $003B                  ; $8A92
    ADC $003A                  ; $8A94
    PHA                        ; $8A96
    TXA                        ; $8A97
    ADC $003B                  ; $8A98
    TAX                        ; $8A9A
    PLA                        ; $8A9B
    CLC                        ; $8A9C
    ADC #$62                   ; $8A9D
    STA $003A                  ; $8A9F
    TXA                        ; $8AA1
    ADC #$96                   ; $8AA2
    STA $003B                  ; $8AA4
    PLA                        ; $8AA6
    RTS                        ; $8AA7
    .byte $02,$03,$03,$03,$03,$04,$05,$04,$05,$04,$05
    LDA $0635                  ; $8AB3
    BPL $8ABA                  ; $8AB6
    EOR #$FF                   ; $8AB8
    TAX                        ; $8ABA
    LDA $0637                  ; $8ABB
    BPL $8AC2                  ; $8ABE
    EOR #$FF                   ; $8AC0
    TAY                        ; $8AC2
    JSR $C539                  ; $8AC3
    LDX #$00                   ; $8AC6
    CMP $8B9E,X                ; $8AC8
    BEQ $8AD1                  ; $8ACB
    INX                        ; $8ACD
    INX                        ; $8ACE
    BNE $8AC8                  ; $8ACF
    LDA $8B9F,X                ; $8AD1
    LDX $003C                  ; $8AD4
    CPX #$01                   ; $8AD6
    BEQ $8ADD                  ; $8AD8
    CLC                        ; $8ADA
    ADC #$0C                   ; $8ADB
    RTS                        ; $8ADD
    STA $003E                  ; $8ADE
    LDA $003C                  ; $8AE0
    STA $003F                  ; $8AE2
    TYA                        ; $8AE4
    CLC                        ; $8AE5
    ADC $003C                  ; $8AE6
    TAY                        ; $8AE8
    LDA ($003A),Y              ; $8AE9
    LDY #$00                   ; $8AEB
    STY $003D                  ; $8AED
    ASL                        ; $8AEF
    ROL $003D                  ; $8AF0
    ASL                        ; $8AF2
    ROL $003D                  ; $8AF3
    ASL                        ; $8AF5
    ROL $003D                  ; $8AF6
    ASL                        ; $8AF8
    ROL $003D                  ; $8AF9
    STA $003C                  ; $8AFB
    LDX $003D                  ; $8AFD
    ASL                        ; $8AFF
    ROL $003D                  ; $8B00
    ADC $003C                  ; $8B02
    STA $003C                  ; $8B04
    TXA                        ; $8B06
    ADC $003D                  ; $8B07
    TAX                        ; $8B09
    RTS                        ; $8B0A
    LDA a: $00E2               ; $8B0B
    AND #$07                   ; $8B0E
    LSR                        ; $8B10
    PHP                        ; $8B11
    CLC                        ; $8B12
    ADC $003E                  ; $8B13
    TAY                        ; $8B15
    LDA ($003C),Y              ; $8B16
    PLP                        ; $8B18
    BCS $8B1F                  ; $8B19
    LSR                        ; $8B1B
    LSR                        ; $8B1C
    LSR                        ; $8B1D
    LSR                        ; $8B1E
    AND #$0F                   ; $8B1F
    RTS                        ; $8B21
    .byte $A9,$0B
    PHA                        ; $8B24
    JSR $C50C                  ; $8B25
    LDY #$00                   ; $8B28
    LDA #$00                   ; $8B2A
    STA ($0034),Y              ; $8B2C
    INY                        ; $8B2E
    STA ($0034),Y              ; $8B2F
    PLA                        ; $8B31
    CLC                        ; $8B32
    ADC #$01                   ; $8B33
    CMP #$16                   ; $8B35
    BNE $8B24                  ; $8B37
    LDA a: $002B               ; $8B39
    SEC                        ; $8B3C
    SBC #$03                   ; $8B3D
    ASL                        ; $8B3F
    TAX                        ; $8B40
    LDA $BAB2,X                ; $8B41
    STA $0038                  ; $8B44
    LDA $BAB3,X                ; $8B46
    STA $0039                  ; $8B49
    LDY #$00                   ; $8B4B
    LDA ($0038),Y              ; $8B4D
    AND #$0F                   ; $8B4F
    STA a: $002E               ; $8B51
    LDA ($0038),Y              ; $8B54
    LSR                        ; $8B56
    LSR                        ; $8B57
    LSR                        ; $8B58
    LSR                        ; $8B59
    STA a: $002F               ; $8B5A
    LDY #$09                   ; $8B5D
    STY $003A                  ; $8B5F
    .byte $A4,$3A
    LDA ($0038),Y              ; $8B63
    CMP #$0F                   ; $8B65
    BEQ $8B7E                  ; $8B67
    CLC                        ; $8B69
    ADC #$0A                   ; $8B6A
    JSR $C50C                  ; $8B6C
    LDY $003A                  ; $8B6F
    INY                        ; $8B71
    LDA ($0038),Y              ; $8B72
    INY                        ; $8B74
    STY $003A                  ; $8B75
    LDY #$00                   ; $8B77
    STA ($0034),Y              ; $8B79
    JMP $8B61                  ; $8B7B
    LDX $0446                  ; $8B7E
    CPX #$05                   ; $8B81
    BEQ $8B90                  ; $8B83
    LDX #$00                   ; $8B85
    LDA $0384                  ; $8B87
    CMP #$26                   ; $8B8A
    BNE $8B90                  ; $8B8C
    INX                        ; $8B8E
    INX                        ; $8B8F
    STX $0446                  ; $8B90
    RTS                        ; $8B93
    .byte $03,$03,$03,$03,$04,$05,$04,$05,$04,$05,$02,$18,$03,$18,$0E,$18
    .byte $0F,$18,$1A,$1C,$1B,$1C,$1C,$1C,$1D,$1C,$26,$1C,$27,$1C,$28,$1C
    .byte $29,$1C,$04,$20,$05,$20,$10,$20,$11,$20,$00,$00,$0C,$00,$18,$00
    .byte $24,$00,$30,$00,$3C,$00,$01,$00,$0D,$00,$19,$00,$25,$00,$31,$00
    .byte $3D,$00,$02,$00,$0E,$00,$03,$00,$0F,$00,$32,$04,$3E,$04,$33,$04
    .byte $3F,$04,$34,$04,$40,$04,$35,$04,$41,$04,$1A,$08,$26,$08,$1B,$08
    .byte $27,$08,$1C,$08,$28,$08,$1D,$08,$29,$08,$04,$0C,$10,$0C,$05,$0C
    .byte $11,$0C,$E0,$04
    BCS $8C26                  ; $8C08
    LDY $044E                  ; $8C0A
    BEQ $8C13                  ; $8C0D
    CPX #$02                   ; $8C0F
    BCS $8C26                  ; $8C11
    JSR $8DC9                  ; $8C13
    LDA $0430                  ; $8C16
    ASL                        ; $8C19
    TAY                        ; $8C1A
    LDA ($0048),Y              ; $8C1B
    INY                        ; $8C1D
    CMP ($0048),Y              ; $8C1E
    BNE $8C2C                  ; $8C20
    CMP #$00                   ; $8C22
    BNE $8C2C                  ; $8C24
    LDA #$00                   ; $8C26
    STA $0430                  ; $8C28
    RTS                        ; $8C2B
    TAX                        ; $8C2C
    LDA ($0048),Y              ; $8C2D
    STA $0049                  ; $8C2F
    STX $0048                  ; $8C31
    LDA $0430                  ; $8C33
    LDX #$00                   ; $8C36
    STX $0430                  ; $8C38
    JSR $C509                  ; $8C3B
    .byte $46,$8C,$41,$8D,$4E,$8D,$55,$8D,$A9,$00
    STA $0046                  ; $8C48
    LDY $0046                  ; $8C4A
    LDA ($0048),Y              ; $8C4C
    LSR                        ; $8C4E
    LSR                        ; $8C4F
    STA $0047                  ; $8C50
    LDA ($0048),Y              ; $8C52
    AND #$03                   ; $8C54
    CMP #$03                   ; $8C56
    BEQ $8C7E                  ; $8C58
    CMP $044E                  ; $8C5A
    BNE $8C62                  ; $8C5D
    JSR $8C7F                  ; $8C5F
    INC $0046                  ; $8C62
    LDA $0047                  ; $8C64
    CMP #$08                   ; $8C66
    BEQ $8C7A                  ; $8C68
    CMP #$09                   ; $8C6A
    BEQ $8C7A                  ; $8C6C
    CMP #$0A                   ; $8C6E
    BEQ $8C7A                  ; $8C70
    CMP #$11                   ; $8C72
    BEQ $8C7A                  ; $8C74
    CMP #$13                   ; $8C76
    BNE $8C4A                  ; $8C78
    INC $0046                  ; $8C7A
    BNE $8C4A                  ; $8C7C
    RTS                        ; $8C7E
    LDA $0047                  ; $8C7F
    SEC                        ; $8C81
    SBC #$03                   ; $8C82
    JSR $C509                  ; $8C84
    .byte $C7,$8C,$CC,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$D4,$8C,$D4,$8C,$FA,$8C
    .byte $C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$21,$8D,$2A,$8D
    .byte $D4,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C
    .byte $C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C,$C7,$8C
    .byte $A5,$47
    JMP $8E11                  ; $8CC9
    .byte $AD,$46,$04
    CMP #$05                   ; $8CCF
    BEQ $8CC7                  ; $8CD1
    RTS                        ; $8CD3
    .byte $A4,$46
    INY                        ; $8CD6
    LDA ($0048),Y              ; $8CD7
    CMP #$FF                   ; $8CD9
    BEQ $8CF7                  ; $8CDB
    STA $0045                  ; $8CDD
    LDA #$01                   ; $8CDF
    PHA                        ; $8CE1
    JSR $C50C                  ; $8CE2
    LDY #$00                   ; $8CE5
    LDA ($0034),Y              ; $8CE7
    CMP $0045                  ; $8CE9
    BEQ $8CF6                  ; $8CEB
    PLA                        ; $8CED
    CLC                        ; $8CEE
    ADC #$01                   ; $8CEF
    CMP #$0B                   ; $8CF1
    BNE $8CE1                  ; $8CF3
    RTS                        ; $8CF5
    PLA                        ; $8CF6
    JMP $8CC7                  ; $8CF7
    .byte $A4,$46
    INY                        ; $8CFC
    LDA ($0048),Y              ; $8CFD
    CMP #$FF                   ; $8CFF
    BNE $8D06                  ; $8D01
    JMP $8CC7                  ; $8D03
    LDA #$01                   ; $8D06
    PHA                        ; $8D08
    JSR $C50C                  ; $8D09
    LDY #$00                   ; $8D0C
    LDA ($0034),Y              ; $8D0E
    CMP #$1C                   ; $8D10
    BEQ $8D1D                  ; $8D12
    PLA                        ; $8D14
    CLC                        ; $8D15
    ADC #$01                   ; $8D16
    CMP #$0B                   ; $8D18
    BNE $8D08                  ; $8D1A
    RTS                        ; $8D1C
    PLA                        ; $8D1D
    JMP $8CD4                  ; $8D1E
    .byte $2C,$49,$04
    BPL $8D29                  ; $8D24
    JMP $8CD4                  ; $8D26
    RTS                        ; $8D29
    .byte $AD,$21,$06
    CMP #$04                   ; $8D2D
    BEQ $8D3D                  ; $8D2F
    LDA a: $002B               ; $8D31
    CMP #$21                   ; $8D34
    BCS $8D3E                  ; $8D36
    LDA $0448                  ; $8D38
    BNE $8D3E                  ; $8D3B
    RTS                        ; $8D3D
    JMP $8CC7                  ; $8D3E
    .byte $AD,$4E,$04
    BNE $8D4D                  ; $8D44
    LDY #$00                   ; $8D46
    LDA ($0048),Y              ; $8D48
    JMP $8E11                  ; $8D4A
    RTS                        ; $8D4D
    .byte $A0,$00
    LDA ($0048),Y              ; $8D50
    JMP $8E11                  ; $8D52
    .byte $4C,$E2,$8D,$A8
    BNE $8D5E                  ; $8D59
    JMP $8DA6                  ; $8D5B
    CMP #$0B                   ; $8D5E
    BNE $8D65                  ; $8D60
    .byte $4C,$A6,$8D
    CPX #$03                   ; $8D65
    BCS $8D88                  ; $8D67
    LDY $044E                  ; $8D69
    BEQ $8D72                  ; $8D6C
    CPX #$02                   ; $8D6E
    BNE $8D88                  ; $8D70
    JSR $8DC9                  ; $8D72
    LDA $0430                  ; $8D75
    CLC                        ; $8D78
    ADC #$04                   ; $8D79
    ASL                        ; $8D7B
    TAY                        ; $8D7C
    LDA ($0048),Y              ; $8D7D
    INY                        ; $8D7F
    CMP ($0048),Y              ; $8D80
    BNE $8D8E                  ; $8D82
    CMP #$00                   ; $8D84
    BNE $8D8E                  ; $8D86
    LDA #$00                   ; $8D88
    STA $0430                  ; $8D8A
    RTS                        ; $8D8D
    TAX                        ; $8D8E
    LDA ($0048),Y              ; $8D8F
    STA $0049                  ; $8D91
    STX $0048                  ; $8D93
    LDA $0430                  ; $8D95
    LDX #$00                   ; $8D98
    STX $0430                  ; $8D9A
    JSR $C509                  ; $8D9D
    .byte $E2,$8D,$E2,$8D,$E2,$8D,$E0,$00
    BNE $8DBA                  ; $8DA8
    JSR $8DC9                  ; $8DAA
    LDY #$00                   ; $8DAD
    LDA ($0048),Y              ; $8DAF
    INY                        ; $8DB1
    CMP ($0048),Y              ; $8DB2
    BNE $8DC0                  ; $8DB4
    CMP #$00                   ; $8DB6
    BNE $8DC0                  ; $8DB8
    LDA #$00                   ; $8DBA
    STA $0430                  ; $8DBC
    RTS                        ; $8DBF
    STA $0431                  ; $8DC0
    LDA #$01                   ; $8DC3
    STA $0430                  ; $8DC5
    RTS                        ; $8DC8
    STX $0430                  ; $8DC9
    STA $0047                  ; $8DCC
    JSR $C50C                  ; $8DCE
    LDY #$00                   ; $8DD1
    LDA ($0034),Y              ; $8DD3
    ASL                        ; $8DD5
    TAX                        ; $8DD6
    LDA $8E1B,X                ; $8DD7
    STA $0048                  ; $8DDA
    LDA $8E1C,X                ; $8DDC
    STA $0049                  ; $8DDF
    RTS                        ; $8DE1
    .byte $A0,$00
    LDA ($0048),Y              ; $8DE4
    BPL $8DED                  ; $8DE6
    AND #$7F                   ; $8DE8
    JMP $8E11                  ; $8DEA
    INY                        ; $8DED
    LDA ($0048),Y              ; $8DEE
    STA $0045                  ; $8DF0
    LDA #$01                   ; $8DF2
    PHA                        ; $8DF4
    JSR $C50C                  ; $8DF5
    LDY #$00                   ; $8DF8
    LDA ($0034),Y              ; $8DFA
    CMP $0045                  ; $8DFC
    BEQ $8E09                  ; $8DFE
    PLA                        ; $8E00
    CLC                        ; $8E01
    ADC #$01                   ; $8E02
    CMP #$0B                   ; $8E04
    BNE $8DF4                  ; $8E06
    RTS                        ; $8E08
    PLA                        ; $8E09
    LDY #$00                   ; $8E0A
    LDA ($0048),Y              ; $8E0C
    JMP $8E11                  ; $8E0E
    .byte $AE,$30,$04
    STA $0431,X                ; $8E14
    INC $0430                  ; $8E17
    RTS                        ; $8E1A
    .byte $07,$8F,$17,$8F,$07,$8F,$07,$8F,$07,$8F,$07,$8F,$07,$8F,$07,$8F
    .byte $07,$8F,$07,$8F,$07,$8F,$07,$8F,$07,$8F,$07,$8F,$07,$8F,$07,$8F
    .byte $07,$8F,$25,$8F,$07,$8F,$07,$8F,$33,$8F,$41,$8F,$07,$8F,$4F,$8F
    .byte $5D,$8F,$6B,$8F,$79,$8F,$87,$8F,$95,$8F,$A3,$8F,$07,$8F,$B1,$8F
    .byte $BF,$8F,$07,$8F,$07,$8F,$CD,$8F,$DB,$8F,$07,$8F,$07,$8F,$E9,$8F
    .byte $F7,$8F,$05,$90,$13,$90,$21,$90,$2F,$90,$3D,$90,$4B,$90,$59,$90
    .byte $67,$90,$75,$90,$83,$90,$07,$8F,$91,$90,$9F,$90,$AD,$90,$07,$8F
    .byte $BB,$90,$07,$8F,$C9,$90,$D7,$90,$07,$8F,$E5,$90,$F3,$90,$01,$91
    .byte $07,$8F,$0F,$91,$1D,$91,$2B,$91,$39,$91,$47,$91,$55,$91,$63,$91
    .byte $71,$91,$7F,$91,$8D,$91,$9B,$91,$07,$8F,$A9,$91,$B7,$91,$C5,$91
    .byte $D3,$91,$07,$8F,$E1,$91,$07,$8F,$07,$8F,$07,$8F,$FD,$91,$0B,$92
    .byte $19,$92,$07,$8F,$27,$92,$07,$8F,$35,$92,$43,$92,$51,$92,$5F,$92
    .byte $6D,$92,$07,$8F,$7B,$92,$89,$92,$07,$8F,$97,$92,$A5,$92,$07,$8F
    .byte $B3,$92,$07,$8F,$C1,$92,$CF,$92,$DD,$92,$EB,$92,$F9,$92,$07,$93
    .byte $07,$8F,$07,$8F,$15,$93,$23,$93,$31,$93,$3F,$93,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$4D,$93,$0A,$94
    .byte $10,$94,$25,$94,$00,$00,$00,$00,$00,$00,$58,$93,$00,$00,$00,$00
    .byte $27,$94,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $36,$94,$00,$00,$00,$00,$5D,$93,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$60,$93,$00,$00,$00,$00,$29,$94,$37,$94,$46,$94
    .byte $5A,$94,$69,$93,$00,$00,$00,$00,$2B,$94,$39,$94,$48,$94,$5C,$94
    .byte $72,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$74,$93
    .byte $00,$00,$11,$94,$2D,$94,$00,$00,$4A,$94,$00,$00,$78,$93,$0B,$94
    .byte $00,$00,$00,$00,$00,$00,$4B,$94,$00,$00,$7A,$93,$00,$00,$12,$94
    .byte $00,$00,$3B,$94,$4C,$94,$00,$00,$7D,$93,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$2F,$94,$00,$00
    .byte $00,$00,$00,$00,$80,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$82,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $84,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$86,$93
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$88,$93,$00,$00
    .byte $13,$94,$00,$00,$00,$00,$00,$00,$00,$00,$8A,$93,$00,$00,$14,$94
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$8C,$93,$00,$00,$00,$00,$00,$00
    .byte $3C,$94,$4D,$94,$00,$00,$8E,$93,$00,$00,$15,$94,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$91,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$93,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $95,$93,$00,$00,$16,$94,$00,$00,$3D,$94,$4E,$94,$00,$00,$98,$93
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$9A,$93,$00,$00
    .byte $00,$00,$31,$94,$3E,$94,$4F,$94,$5E,$94,$9F,$93,$00,$00,$00,$00
    .byte $31,$94,$00,$00,$00,$00,$00,$00,$A4,$93,$0C,$94,$00,$00,$00,$00
    .byte $00,$00,$50,$94,$00,$00,$A6,$93,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$A8,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$AB,$93,$00,$00,$17,$94,$32,$94,$00,$00,$51,$94,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$32,$94,$00,$00,$00,$00,$00,$00,$AF,$93
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$B1,$93,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$B3,$93,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$18,$94,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$0D,$94,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$B5,$93,$00,$00,$19,$94,$00,$00,$00,$00,$52,$94
    .byte $00,$00,$B9,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $BC,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$BE,$93
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$C1,$93,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$C3,$93,$00,$00,$00,$00
    .byte $33,$94,$3F,$94,$53,$94,$5F,$94,$C8,$93,$00,$00,$00,$00,$33,$94
    .byte $00,$00,$00,$00,$00,$00,$CD,$93,$00,$00,$1A,$94,$00,$00,$40,$94
    .byte $54,$94,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$41,$94,$00,$00
    .byte $00,$00,$D0,$93,$0E,$94,$00,$00,$00,$00,$00,$00,$55,$94,$00,$00
    .byte $D2,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$D5,$93
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$D7,$93,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$D9,$93,$00,$00,$1B,$94
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$DC,$93,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$01,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$1C,$94,$00,$00,$42,$94,$56,$94
    .byte $00,$00,$02,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $DF,$93,$00,$00,$1D,$94,$34,$94,$00,$00,$00,$00,$00,$00,$E3,$93
    .byte $00,$00,$00,$00,$34,$94,$00,$00,$00,$00,$00,$00,$E7,$93,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$E9,$93,$00,$00,$1E,$94
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$1F,$94,$00,$00
    .byte $43,$94,$57,$94,$00,$00,$00,$00,$00,$00,$00,$00,$35,$94,$00,$00
    .byte $00,$00,$00,$00,$EB,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$ED,$93,$00,$00,$00,$00,$35,$94,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$20,$94,$00,$00,$44,$94,$58,$94,$00,$00,$F1,$93
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $21,$94,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$0F,$94,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$F4,$93,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$F6,$93,$00,$00,$22,$94,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$F9,$93,$00,$00,$23,$94,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$FB,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $FD,$93,$00,$00,$24,$94,$00,$00,$00,$00,$00,$00,$00,$00,$FF,$93
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$01,$94,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$03,$94,$00,$00,$00,$00
    .byte $00,$00,$45,$94,$59,$94,$00,$00,$05,$94,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$03,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$07,$94,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$0C,$3A,$12,$25,$11,$48,$4A,$49,$44,$1A,$03,$25,$01,$3A
    .byte $41,$03,$14,$19,$03,$22,$18,$25,$18,$2A,$18,$29,$18,$03,$22,$17
    .byte $25,$17,$2A,$17,$29,$17,$03,$3A,$03,$30,$34,$3A,$03,$1C,$03,$4C
    .byte $19,$03,$2C,$3A,$03,$3E,$03,$72,$03,$50,$03,$0C,$03,$54,$03,$88
    .byte $03,$76,$03,$58,$3A,$03,$50,$03,$0C,$03,$4C,$FF,$03,$3A,$03,$22
    .byte $FF,$25,$FF,$03,$22,$FF,$25,$FF,$03,$1C,$03,$3E,$03,$2C,$3A,$03
    .byte $30,$34,$3A,$03,$7A,$03,$3A,$03,$60,$03,$30,$34,$3A,$03,$14,$19
    .byte $03,$3A,$03,$3A,$41,$03,$3E,$03,$2A,$FF,$29,$FF,$03,$2A,$FF,$29
    .byte $FF,$03,$4C,$FF,$03,$1C,$03,$2C,$3A,$03,$7E,$03,$7E,$03,$25,$FF
    .byte $03,$25,$FF,$03,$68,$85,$86,$03,$64,$85,$86,$03,$7A,$03,$3A,$03
    .byte $72,$03,$0C,$3A,$81,$03,$3A,$6C,$03,$60,$03,$58,$3A,$03,$88,$03
    .byte $50,$03,$54,$03,$50,$03,$0C,$03,$76,$03,$0C,$03,$3A,$5C,$03,$01
    .byte $02,$02,$03,$02,$03,$01,$02,$02,$03,$02,$04,$02,$02,$06,$02,$02
    .byte $02,$02,$02,$05,$02,$02,$06,$04,$02,$03,$01,$11,$01,$01,$03,$18
    .byte $03,$17,$02,$1F,$02,$1A,$83,$82,$83,$84,$81,$81,$02,$18,$02,$17
    .byte $83,$83,$83,$02,$02,$83,$81,$83,$83,$83,$83,$01,$18,$01,$17,$84
    .byte $82,$83,$83,$83,$81,$82,$84,$84,$81,$83,$82,$83,$83,$83,$83,$01
    .byte $18,$01,$17,$81,$81,$74,$94,$00,$95,$10,$95,$2C,$95,$40,$95,$44
    .byte $95,$48,$95,$50,$95,$50,$95,$50,$95,$00,$01,$50,$00,$00,$05,$5A
    .byte $00,$00,$05,$5A,$00,$8A,$15,$C8,$20,$9A,$22,$40,$31,$80,$10,$C8
    .byte $20,$84,$16,$F0,$20,$84,$11,$C8,$00,$02,$12,$C8,$00,$85,$13,$B4
    .byte $10,$8C,$23,$7C,$21,$85,$1A,$C8,$20,$A0,$15,$F0,$20,$C0,$22,$72
    .byte $21,$02,$11,$A0,$20,$86,$18,$FA,$20,$85,$18,$FA,$20,$A8,$2D,$C8
    .byte $30,$99,$58,$90,$31,$92,$12,$C8,$00,$86,$13,$00,$00,$8A,$13,$00
    .byte $00,$90,$16,$00,$20,$A0,$1A,$00,$20,$85,$0E,$00,$00,$84,$0E,$00
    .byte $00,$F0,$0F,$00,$20,$00,$15,$00,$20,$FA,$11,$00,$00,$FA,$11,$00
    .byte $00,$FA,$0D,$00,$00,$02,$12,$00,$20,$01,$11,$00,$20,$98,$21,$00
    .byte $20,$FC,$14,$00,$20,$00,$02,$14,$00,$B2,$15,$28,$00,$00,$1A,$28
    .byte $00,$02,$14,$00,$00,$00,$02,$28,$00,$00,$07,$5A,$00,$FC,$0D,$3C
    .byte $00,$00,$0C,$00,$00,$00,$12,$00,$00,$00,$0B,$00,$00,$F0,$0B,$00
    .byte $00,$00,$0C,$3C,$18,$00,$20,$78,$38,$00,$10,$50,$20,$00,$11,$50
    .byte $20,$00,$12,$00,$30,$00,$00,$0A,$00,$00,$09,$28,$00,$00,$07,$50
    .byte $00,$FC,$0E,$00,$00,$00,$00,$00,$00,$5E,$95,$6E,$95,$86,$95,$8E
    .byte $95,$96,$95,$00,$01,$46,$00,$00,$82,$90,$01,$00,$1C,$B4,$00,$00
    .byte $19,$B4,$00,$00,$00,$3C,$00,$98,$23,$C8,$00,$A0,$1C,$C8,$00,$FC
    .byte $19,$C8,$00,$FC,$1D,$B4,$00,$FC,$06,$00,$00,$00,$00,$32,$00,$00
    .byte $27,$B4,$00,$00,$04,$50,$00,$FC,$08,$00,$00,$00,$06,$3C,$00,$FC
    .byte $0C,$00,$00,$B2,$95,$C2,$95,$C6,$95,$CA,$95,$CE,$95,$CE,$95,$D2
    .byte $95,$C2,$95,$C2,$95,$C2,$95,$00,$08,$14,$00,$00,$1B,$00,$00,$00
    .byte $1C,$00,$00,$00,$25,$00,$00,$00,$0B,$28,$00,$00,$20,$C8,$00,$88
    .byte $08,$46,$00,$98,$00,$32,$00,$98,$00,$32,$00,$00,$00,$08,$08,$01
    .byte $03,$50,$26,$00,$02,$00,$00,$00,$00,$18,$04,$0B,$00,$18,$04,$08
    .byte $01,$10,$02,$09,$01,$0E,$02,$00,$00,$20,$00,$06,$04,$28,$00,$07
    .byte $04,$38,$00,$04,$06,$18,$00,$05,$07,$18,$00,$0A,$08,$18,$02,$0B
    .byte $00,$10,$02,$00,$00,$10,$02,$01,$00,$00,$00,$0C,$00,$08,$03,$02
    .byte $03,$20,$08,$0D,$01,$14,$00,$05,$05,$08,$00,$0E,$08,$18,$04,$03
    .byte $02,$20,$04,$04,$06,$18,$02,$0F,$07,$16,$02,$0F,$07,$18,$02,$10
    .byte $02,$10,$02,$11,$01,$40,$10,$12,$09,$20,$02,$13,$00,$20,$02,$14
    .byte $09,$28,$02,$15,$00,$18,$02,$16,$00,$08,$00,$17,$03,$18,$00,$03
    .byte $00,$00,$00,$02,$00,$00,$00,$1C,$06,$00,$02,$08,$03,$03,$01,$01
    .byte $01,$02,$00,$1D,$06,$00,$00,$00,$02,$04,$01,$01,$01,$01,$00,$20
    .byte $0A,$00,$20,$02,$03,$03,$01,$01,$01,$00,$00,$06,$00,$00,$00,$03
    .byte $03,$00,$00,$00,$00,$00,$00,$23,$00,$00,$20,$00,$03,$03,$01,$01
    .byte $01,$03,$00,$24,$00,$00,$28,$06,$00,$03,$01,$01,$01,$01,$00,$27
    .byte $00,$00,$20,$04,$02,$00,$01,$01,$01,$04,$00,$28,$0B,$F0,$02,$08
    .byte $03,$05,$00,$02,$02,$01,$00,$2B,$0A,$00,$30,$07,$03,$03,$01,$01
    .byte $01,$06,$00,$2C,$00,$00,$02,$09,$02,$03,$00,$00,$00,$07,$00,$2D
    .byte $0B,$FF,$00,$0D,$01,$04,$01,$01,$01,$00,$00,$30,$0B,$F0,$20,$0B
    .byte $02,$02,$02,$02,$02,$01,$00,$31,$0A,$00,$10,$02,$05,$00,$00,$00
    .byte $01,$04,$00,$34,$0C,$00,$FF,$01,$05,$01,$00,$00,$00,$03,$00,$34
    .byte $0C,$00,$08,$01,$05,$01,$00,$00,$00,$03,$00,$37,$0B,$F0,$60,$0B
    .byte $02,$02,$03,$01,$01,$03,$00,$0C,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$08,$00,$3A,$1D,$10,$00,$1D,$05,$00,$00,$00,$00,$0A,$00,$3D
    .byte $00,$00,$00,$0C,$05,$02,$00,$00,$00,$0C,$00,$40,$0E,$00,$40,$0E
    .byte $05,$05,$03,$02,$02,$00,$00,$41,$00,$00,$00,$00,$03,$00,$00,$00
    .byte $00,$0E,$00,$42,$0A,$00,$00,$01,$01,$00,$00,$00,$00,$0F,$00,$0F
    .byte $00,$00,$00,$04,$00,$00,$00,$00,$00,$00,$00,$45,$0A,$00,$00,$08
    .byte $03,$00,$00,$00,$00,$0C,$00,$48,$0F,$00,$00,$07,$05,$00,$00,$00
    .byte $00,$1E,$00,$49,$0F,$00,$00,$02,$03,$00,$00,$00,$00,$03,$00,$4C
    .byte $00,$00,$00,$0F,$03,$00,$00,$00,$00,$02,$00,$4D,$00,$00,$00,$10
    .byte $00,$00,$00,$00,$00,$11,$00,$4E,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$12,$00,$12,$00,$00,$00,$00,$02,$00,$00,$00,$00,$00,$00,$4F
    .byte $0E,$00,$10,$11,$00,$00,$03,$02,$02,$15,$00,$50,$0A,$00,$00,$01
    .byte $05,$00,$00,$00,$00,$14,$00,$51,$00,$00,$00,$01,$03,$00,$00,$00
    .byte $00,$14,$00,$52,$02,$00,$00,$01,$05,$00,$00,$00,$00,$14,$00,$53
    .byte $02,$00,$00,$01,$05,$00,$00,$00,$00,$15,$00,$54,$11,$00,$18,$01
    .byte $06,$00,$00,$00,$00,$14,$00,$54,$11,$00,$04,$01,$06,$00,$00,$00
    .byte $00,$14,$00,$55,$10,$20,$10,$12,$00,$00,$04,$01,$01,$15,$00,$56
    .byte $00,$00,$00,$01,$00,$00,$05,$00,$00,$14,$00,$57,$10,$20,$10,$12
    .byte $00,$00,$03,$01,$01,$15,$00,$58,$10,$10,$00,$12,$00,$00,$00,$00
    .byte $00,$15,$00,$13,$00,$00,$00,$04,$00,$00,$00,$00,$00,$00,$00,$5D
    .byte $00,$00,$00,$08,$06,$00,$01,$00,$00,$03,$00,$5D,$00,$00,$00,$08
    .byte $06,$00,$01,$00,$00,$03,$00,$66,$13,$00,$08,$10,$06,$00,$06,$02
    .byte $02,$02,$00,$67,$13,$00,$10,$10,$06,$00,$06,$02,$02,$02,$00,$6B
    .byte $14,$00,$08,$13,$05,$00,$00,$00,$00,$03,$00,$1B,$00,$00,$00,$05
    .byte $02,$00,$00,$00,$00,$00,$00,$6E,$0A,$00,$00,$09,$06,$04,$00,$00
    .byte $00,$00,$00,$6F,$0B,$10,$40,$04,$06,$04,$02,$02,$02,$01,$00,$72
    .byte $0F,$00,$00,$09,$06,$00,$00,$00,$00,$00,$00,$1D,$00,$00,$00,$05
    .byte $02,$00,$00,$00,$00,$00,$00,$75,$0A,$00,$10,$15,$06,$05,$00,$02
    .byte $02,$0B
    .byte $00,$76,$0F,$00,$00,$15,$06,$01,$00,$00,$00,$01,$00,$79,$13,$00
    .byte $00,$13,$06,$00,$00,$00,$00,$01,$00,$7C,$13,$00,$00,$08,$06,$00
    .byte $00,$01,$00,$16,$00,$20,$00,$00,$00,$03,$01,$00,$00,$00,$00,$00
    .byte $00,$7F,$15,$00,$FF,$16,$06,$02,$00,$00,$00,$00,$00,$80,$0B,$20
    .byte $00,$09,$06,$00,$02,$02,$02,$17,$00,$82,$00,$00,$10,$19,$00,$00
    .byte $00,$00,$00,$0B,$00,$83,$06,$00,$00,$08,$06,$03,$01,$01,$01,$20
    .byte $00,$84,$07,$00,$10,$18,$06,$02,$00,$00,$00,$22,$00,$85,$00,$00
    .byte $00,$01,$03,$00,$00,$00,$00,$21,$00,$86,$00,$18,$00,$14,$05,$00
    .byte $02,$02,$02,$19,$00,$88,$0A,$00,$08,$1A,$05,$02,$00,$01,$01,$24
    .byte $00,$89,$00,$00,$00,$00,$06,$00,$00,$00,$00,$25,$00,$8A,$1A,$00
    .byte $10,$05,$00,$00,$00,$02,$02,$26,$00,$8B,$00,$00,$00,$01,$01,$01
    .byte $00,$00,$00,$25,$00,$8C,$00,$00,$00,$14,$03,$00,$00,$00,$00,$27
    .byte $00,$8D,$0A,$00,$00,$0F,$02,$00,$00,$00,$00,$25,$00,$23,$00,$00
    .byte $00,$03,$02,$00,$00,$00,$00,$00,$00,$8E,$1C,$00,$08,$07,$05,$02
    .byte $00,$00,$00,$2E,$00,$8F,$0A,$00,$04,$04,$07,$00,$00,$00,$00,$2D
    .byte $00,$90,$06,$00,$00,$14,$07,$00,$00,$00,$00,$2C,$00,$91,$0A,$00
    .byte $00,$06,$07,$00,$00,$00,$00,$2A,$00,$92,$0A,$00,$00,$09,$07,$00
    .byte $00,$00,$00,$2B,$00,$93,$0A,$00,$00,$12,$07,$00,$00,$00,$00,$2A
    .byte $00,$94,$00,$02,$00,$14,$03,$00,$00,$00,$00,$29,$00,$95,$00,$02
    .byte $00,$14,$07,$00,$00,$00,$00,$29,$00,$96,$0B,$08,$00,$01,$06,$00
    .byte $02,$02,$02,$29,$00,$97,$0B,$20,$00,$12,$07,$00,$00,$00,$00,$29
    .byte $00,$24,$00,$00,$00,$05,$00,$00,$00,$00,$00,$00,$00,$98,$1B,$00
    .byte $00,$1C,$08,$00,$00,$00,$00,$2F,$00,$04,$00,$00,$00,$00,$04,$00
    .byte $00,$00,$00,$00,$00,$18,$00,$10,$03,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$19,$00,$00,$00,$00,$00,$00,$00,$00,$00,$01,$00,$05,$00,$00
    .byte $00,$01,$01,$00,$00,$00,$00,$00,$00,$1A,$00,$14,$02,$01,$00,$03
    .byte $00,$00,$01,$02,$00,$1B,$00,$00,$00,$01,$01,$00,$00,$00,$00,$1E
    .byte $00,$1E,$00,$18,$02,$00,$00,$00,$00,$00,$00,$00,$00,$1F,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$01,$00,$07,$00,$00,$00,$00,$01,$00
    .byte $00,$00,$00,$00,$00,$21,$00,$20,$03,$01,$00,$03,$00,$00,$01,$00
    .byte $00,$22,$00,$00,$00,$00,$01,$00,$00,$00,$00,$03,$00,$08,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$25,$00,$00,$00,$01,$00,$00
    .byte $00,$00,$00,$05,$00,$26,$00,$00,$00,$01,$01,$00,$00,$00,$00,$04
    .byte $00,$09,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$29,$00,$00
    .byte $00,$01,$01,$00,$00,$00,$00,$06,$00,$2A,$00,$00,$00,$01,$00,$00
    .byte $00,$00,$01,$07,$00,$0A,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$2E
    .byte $00,$00,$00,$01,$00,$00,$00,$00,$00,$08,$00,$2F,$00,$00,$00,$01
    .byte $00,$00,$00,$00,$00,$08,$00,$0B,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$03,$00,$32,$00,$00,$00,$01,$00,$00,$00,$00,$00,$00,$00,$33
    .byte $00,$00,$00,$01,$00,$00,$00,$00,$00,$03,$00,$35,$00,$00,$00,$01
    .byte $00,$00,$00,$00,$00,$08,$00,$36,$00,$00,$00,$01,$00,$00,$00,$00
    .byte $00,$13,$00,$0D,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$38
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$09,$00,$39,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$0A,$00,$0E,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$3B
    .byte $00,$00,$00,$01,$03,$00,$00,$00,$00,$0B,$00,$3C,$00,$00,$00,$01
    .byte $05,$00,$00,$00,$00,$0D,$00,$3E,$00,$00,$00,$01,$00,$00,$00,$00
    .byte $00,$0E,$00,$3F,$00,$00,$00,$01,$00,$00,$00,$00,$00,$0E,$00,$10
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$43,$0F,$D0,$08,$05
    .byte $03,$00,$00,$00,$00,$1E,$00,$44,$00,$00,$00,$01,$00,$00,$00,$00
    .byte $00,$10,$00,$11,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$46
    .byte $0F,$00,$00,$01,$00,$00,$00,$00,$00,$03,$00,$47,$00,$00,$00,$01
    .byte $00,$00,$00,$00,$00,$03,$00,$4A,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00
    .byte $11,$00,$4B,$00,$00,$00,$00,$00,$00,$00,$00,$00,$11,$00,$14,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$59,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$5A,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $03,$00,$15,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$5B,$0F
    .byte $00,$00,$01,$01,$00,$01,$01,$01,$00,$00,$5C,$0F,$00,$00,$01,$01
    .byte $00,$01,$01,$01,$03,$00,$16,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$5E,$0F,$00,$00,$01,$03,$05,$06,$02,$02,$00,$00,$5F,$00
    .byte $00,$00,$10,$05,$05,$06,$02,$02,$01,$00,$17,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$60,$13,$08,$00,$00,$03,$05,$00,$00,$00
    .byte $00,$00,$61,$13,$00,$00,$10,$03,$00,$00,$00,$00,$01,$00,$18,$00
    .byte $00,$00,$00,$02,$00,$00,$00,$00,$00,$00,$62,$00,$00,$00,$01,$03
    .byte $00,$00,$00,$00,$00,$00,$63,$00,$00,$00,$10,$03,$00,$00,$00,$00
    .byte $01,$00,$19,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$64,$13
    .byte $00,$00,$01,$03,$02,$06,$02,$02,$00,$00,$65,$13,$00,$00,$01,$03
    .byte $02,$06,$02,$02,$02,$00,$1A,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$68,$00,$00,$0D,$00,$00,$00,$00,$00,$00,$00,$00,$69,$13
    .byte $00,$00,$14,$03,$00,$00,$01,$00,$16,$00,$6A,$13,$00,$00,$14,$03
    .byte $00,$00,$01,$00,$16,$00,$1C,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$6C,$00,$00,$00,$00,$03,$00,$00,$00,$00,$01,$00,$6D,$00
    .byte $00,$00,$00,$03,$00,$00,$00,$00,$17,$00,$70,$00,$00,$00,$01,$03
    .byte $00,$00,$02,$02,$01,$00,$71,$00,$00,$00,$01,$03,$00,$00,$02,$00
    .byte $01,$00,$1E,$00,$00,$00,$01,$00,$00,$00,$00,$00,$00,$00,$73,$00
    .byte $00,$00,$14,$03,$00,$00,$00,$00,$0D,$00,$74,$00,$00,$00,$14,$03
    .byte $00,$00,$00,$00,$0D,$00,$1F,$00,$00,$00,$01,$02,$00,$00,$00,$00
    .byte $00,$00,$77
    .byte $00,$08,$00,$00,$03,$00,$00,$01,$00,$0B,$00,$78,$00,$00,$00,$00
    .byte $03,$00,$00,$01,$00,$0B,$00,$7A,$13,$10,$00,$00,$03,$00,$00,$00
    .byte $00,$17,$00,$7B,$13,$00,$00,$00,$03,$00,$00,$00,$00,$17,$00,$21
    .byte $00,$00,$00,$01,$00,$00,$00,$00,$00,$00,$00,$7D,$19,$08,$00,$17
    .byte $05,$03,$00,$00,$00,$18,$00,$7E,$19,$00,$00,$17,$05,$03,$00,$00
    .byte $00,$18,$00,$22,$00,$00,$00,$01,$00,$00,$00,$00,$00,$00,$00,$81
    .byte $00,$00,$00,$14,$00,$00,$00,$00,$00,$19,$00,$87,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$99,$16,$FF,$00,$02,$01,$00,$00,$02
    .byte $02,$00,$00,$9A,$17,$00,$00,$0A,$00,$00,$00,$00,$00,$00,$00,$9B
    .byte $18,$00,$FF,$1B,$06,$00,$03,$00,$00,$24,$00,$9C,$0A,$00,$00,$14
    .byte $01,$00,$00,$00,$00,$0B,$00,$08,$08,$08,$09,$09,$09,$09,$0A,$0A
    .byte $0A,$0B,$0B,$0B,$0C,$0C,$0C,$0D,$0D,$0D,$0E,$0E,$0E,$0F,$0F,$10
    .byte $10,$11,$11,$11,$12,$12,$13,$14,$14,$15,$15,$16,$16,$17,$18,$18
    .byte $19,$1A,$1A,$1B,$1C,$1D,$1D,$1E,$1F,$20,$21,$22,$23,$24,$25,$26
    .byte $27,$28,$29,$2A,$2B,$2C,$2D,$2F,$30,$31,$33,$34,$35,$37,$38,$3A
    .byte $3B,$3D,$3F,$41,$42,$44,$46,$48,$4A,$4C,$4E,$50,$52,$54,$57,$59
    .byte $5C,$5E,$61,$63,$66,$69,$6C,$6F,$72,$75,$78,$7B,$7E,$82,$85,$89
    .byte $8D,$91,$95,$99,$9D,$A1,$A5,$AA,$AF,$B3,$B7,$BA,$BD,$C0,$C3,$C6
    .byte $C9,$CC,$CE,$D1,$D3,$D5,$D7,$D9,$DA,$DC,$DD,$DE,$E0,$E1,$E2,$E3
    .byte $E4,$E5,$E6,$E7,$E8,$E8,$E9,$EA,$EB,$EB,$EC,$ED,$ED,$EE,$EE,$EF
    .byte $F0,$F0,$F1,$F1,$F2,$F3,$F3,$F4,$F4,$F5,$F5,$F6,$F6,$F7,$F7,$F8
    .byte $F8,$F8,$F9,$F9,$FA,$FA,$FA,$FB,$FB,$FB,$FC,$FC,$FC,$FD,$FD,$FD
    .byte $FD,$FD,$FE,$FE,$FE,$FE,$FF,$90,$01,$98,$01,$A0,$01,$A8,$01,$B0
    .byte $01,$B8,$01,$C0,$01,$C8,$01,$D0,$01,$E2,$01,$EA,$01,$F2,$01,$FA
    .byte $01,$02,$02,$0A,$02,$12,$02,$1A,$02,$22,$02,$2A,$02,$32,$02,$3A
    .byte $02,$42,$02,$4A,$02,$52,$02,$5A,$02,$62,$02,$6A,$02,$72,$02,$7A
    .byte $02,$82,$02,$8A,$02,$92,$02,$98,$02,$9E,$02,$A4,$02,$AA,$02,$B0
    .byte $02,$B6,$02,$BC,$02,$C2,$02,$C8,$02,$CE,$02,$D4,$02,$DA,$02,$E0
    .byte $02,$E6,$02,$EC,$02,$F0,$02,$F6,$02,$FC,$02,$02,$03,$08,$03,$0E
    .byte $03,$14,$03,$1A,$03,$20,$03,$26,$03,$2C,$03,$32,$03,$38,$03,$3E
    .byte $03,$44,$03,$4A,$03,$50,$03,$54,$03,$58,$03,$5C,$03,$60,$03,$64
    .byte $03,$68,$03,$6C,$03,$70,$03,$74,$03,$78,$03,$7C,$03,$80,$03,$84
    .byte $03,$88,$03,$8C,$03,$90,$03,$94,$03,$98,$03,$9C,$03,$A0,$03,$A4
    .byte $03,$A8,$03,$AC,$03,$B0,$03,$B4,$03,$B8,$03,$BC,$03,$C0,$03,$C4
    .byte $03,$C8,$03,$CC,$03,$D0,$03,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$2E
    .byte $0F,$15,$18,$0C,$0F,$0F,$12,$15,$0C,$17,$0E,$0C,$10,$0E,$12,$15
    .byte $0C,$17,$0E,$0C,$10,$0E,$00
    .byte $20,$0E
