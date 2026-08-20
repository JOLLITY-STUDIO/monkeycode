; ============================================================
; bank24/bank24.s
; bank 24 - 真实 6502 汇编 (8KB)
; CPU 地址范围: $8000-$9FFF
; 源: _tmp_bzk_out/bank_24/bank_24_partMM.asm
; 代码=助记符, 数据=.byte, build_nes.py 可直接编译
; ============================================================

.segment "PRG_BANK24"
.org $8000

    .byte $4C,$0F,$80
    JMP $86F8                  ; $8003
    JMP $8779                  ; $8006
    JMP $87E6                  ; $8009
    JMP $8851                  ; $800C
    .byte $2C,$3F,$06
    BPL $8017                  ; $8012
    JMP $C512                  ; $8014
    LDA #$20                   ; $8017
    STA $005F                  ; $8019
    LDA #$92                   ; $801B
    STA $0060                  ; $801D
    LDA $05EA                  ; $801F
    ASL                        ; $8022
    BCC $8027                  ; $8023
    INC $0060                  ; $8025
    TAY                        ; $8027
    LDA ($005F),Y              ; $8028
    TAX                        ; $802A
    INY                        ; $802B
    LDA ($005F),Y              ; $802C
    STA $0060                  ; $802E
    STX $005F                  ; $8030
    LDA #$00                   ; $8032
    STA $05E9                  ; $8034
    STA $05E5                  ; $8037
    STA $05E4                  ; $803A
    STA $05F4                  ; $803D
    LDA #$01                   ; $8040
    STA $05E3                  ; $8042
    .byte $A9,$01
    JSR $C515                  ; $8047
    JSR $8053                  ; $804A
    JSR $C560                  ; $804D
    JMP $8045                  ; $8050
    LDA $05E3                  ; $8053
    BNE $8059                  ; $8056
    RTS                        ; $8058
    LDA $05E9                  ; $8059
    BEQ $8062                  ; $805C
    DEC $05E9                  ; $805E
    RTS                        ; $8061
    LDA $05E4                  ; $8062
    JSR $C509                  ; $8065
    .byte $6E,$80,$18,$82,$F2,$82,$AC,$E5,$05
    INC $05E5                  ; $8071
    LDA ($005F),Y              ; $8074
    CMP #$F0                   ; $8076
    BCC $8080                  ; $8078
    JSR $8087                  ; $807A
    JMP $806E                  ; $807D
    STA $05E9                  ; $8080
    INC $05E4                  ; $8083
    RTS                        ; $8086
    AND #$0F                   ; $8087
    JSR $C509                  ; $8089
    .byte $98,$80,$A0,$80,$B5,$80,$B8,$80,$CB,$80,$FD,$81,$A9,$00
    STA $05E3                  ; $809A
    PLA                        ; $809D
    PLA                        ; $809E
    RTS                        ; $809F
    .byte $A9,$01,$20,$15,$C5,$AD,$1C,$00,$10,$F6,$A9,$00,$8D,$E9,$05,$EE
    .byte $E4,$05,$68,$68,$60,$4C,$2D,$C5,$AC,$E5,$05
    LDA ($005F),Y              ; $80BB
    TAX                        ; $80BD
    INY                        ; $80BE
    LDA ($005F),Y              ; $80BF
    STA $0060                  ; $80C1
    STX $005F                  ; $80C3
    LDA #$00                   ; $80C5
    STA $05E5                  ; $80C7
    RTS                        ; $80CA
    .byte $AC,$E5,$05
    LDA ($005F),Y              ; $80CE
    JSR $80EA                  ; $80D0
    TXA                        ; $80D3
    ASL                        ; $80D4
    SEC                        ; $80D5
    ADC $05E5                  ; $80D6
    TAY                        ; $80D9
    LDA ($005F),Y              ; $80DA
    TAX                        ; $80DC
    INY                        ; $80DD
    LDA ($005F),Y              ; $80DE
    STX $005F                  ; $80E0
    STA $0060                  ; $80E2
    LDA #$00                   ; $80E4
    STA $05E5                  ; $80E6
    RTS                        ; $80E9
    JSR $C509                  ; $80EA
    .byte $FD,$80,$06,$81,$0E,$81,$1E,$81,$22,$81,$38,$81,$CE,$81,$E4,$81
    .byte $A2,$00,$2C,$3C,$04,$10,$01,$E8,$60,$AE,$FB,$05
    BEQ $810D                  ; $8109
    LDX #$01                   ; $810B
    RTS                        ; $810D
    .byte $AE,$00,$06
    BEQ $811B                  ; $8111
    DEX                        ; $8113
    CPX #$03                   ; $8114
    BCC $811A                  ; $8116
    LDX #$02                   ; $8118
    RTS                        ; $811A
    .byte $A2,$03,$60,$AE,$29,$06
    RTS                        ; $8121
    .byte $A2,$00
    LDA $0026                  ; $8124
    CMP $8131,X                ; $8126
    BCC $8130                  ; $8129
    BEQ $8130                  ; $812B
    INX                        ; $812D
    BNE $8126                  ; $812E
    RTS                        ; $8130
    .byte $05,$0B,$0F,$15,$16,$1A,$21,$A5,$27
    JSR $C509                  ; $813A
    .byte $47,$81,$56,$81,$47,$81,$56,$81,$56,$81,$A2,$02
    LDA a: $0028               ; $8149
    CMP a: $0029               ; $814C
    BEQ $8155                  ; $814F
    DEX                        ; $8151
    BCC $8155                  ; $8152
    DEX                        ; $8154
    RTS                        ; $8155
    .byte $A4,$26
    LDA $81AC,Y                ; $8158
    STA $0049                  ; $815B
    LDA a: $0028               ; $815D
    CMP a: $0029               ; $8160
    BNE $818B                  ; $8163
    LDX #$0D                   ; $8165
    LDA a: $0027               ; $8167
    CMP #$01                   ; $816A
    BEQ $817E                  ; $816C
    BIT $0049                  ; $816E
    BVC $8174                  ; $8170
    INX                        ; $8172
    RTS                        ; $8173
    .byte $AD,$2B,$00,$C9,$23,$D0,$02,$A2,$0F,$60
    LDX #$0C                   ; $817E
    BIT $0049                  ; $8180
    BMI $818A                  ; $8182
    INX                        ; $8184
    BIT $0049                  ; $8185
    BVC $818A                  ; $8187
    INX                        ; $8189
    RTS                        ; $818A
    BCS $8197                  ; $818B
    LDX #$0A                   ; $818D
    LDA $0027                  ; $818F
    CMP #$04                   ; $8191
    BNE $8196                  ; $8193
    INX                        ; $8195
    RTS                        ; $8196
    LDA $0049                  ; $8197
    AND #$07                   ; $8199
    CLC                        ; $819B
    ADC #$03                   ; $819C
    TAX                        ; $819E
    CPX #$03                   ; $819F
    BNE $81AB                  ; $81A1
    LDA $0027                  ; $81A3
    CMP #$03                   ; $81A5
    BNE $81AB                  ; $81A7
    LDX #$09                   ; $81A9
    RTS                        ; $81AB
    .byte $C0,$C0,$C0,$C0,$C1,$C2,$40,$40,$40,$40,$41,$C2,$C0,$C0,$C1,$C3
    .byte $C0,$C0,$C0,$C0,$C1,$C2,$00,$C0,$C0,$C0,$C0,$C0,$C0,$C0,$C4,$C5
    .byte $86,$C6,$AD,$16,$06
    LSR                        ; $81D1
    LDX #$00                   ; $81D2
    CMP #$01                   ; $81D4
    BCC $81E3                  ; $81D6
    INX                        ; $81D8
    CMP #$05                   ; $81D9
    BCC $81E3                  ; $81DB
    INX                        ; $81DD
    CMP #$06                   ; $81DE
    BCC $81E3                  ; $81E0
    INX                        ; $81E2
    RTS                        ; $81E3
    .byte $AD,$FB,$05
    EOR #$0B                   ; $81E7
    JSR $C50C                  ; $81E9
    LDX #$00                   ; $81EC
    LDY #$07                   ; $81EE
    LDA ($0034),Y              ; $81F0
    CMP #$19                   ; $81F2
    BCC $81FC                  ; $81F4
    INX                        ; $81F6
    CMP #$36                   ; $81F7
    BCC $81FC                  ; $81F9
    INX                        ; $81FB
    RTS                        ; $81FC
    .byte $20,$2D,$C5
    LDA #$0D                   ; $8200
    STA $05F3                  ; $8202
    LDA #$80                   ; $8205
    STA $05F4                  ; $8207
    LDY $05E5                  ; $820A
    LDA ($005F),Y              ; $820D
    STA $05E9                  ; $820F
    INC $05E5                  ; $8212
    PLA                        ; $8215
    PLA                        ; $8216
    RTS                        ; $8217
    .byte $AC,$E5,$05
    LDA ($005F),Y              ; $821B
    CMP #$90                   ; $821D
    BCS $822E                  ; $821F
    AND #$0F                   ; $8221
    STA $05F3                  ; $8223
    LDA #$80                   ; $8226
    STA $05F4                  ; $8228
    JMP $8234                  ; $822B
    JSR $C52D                  ; $822E
    LDY $05E5                  ; $8231
    .byte $B1,$5F
    LSR                        ; $8236
    LSR                        ; $8237
    LSR                        ; $8238
    LSR                        ; $8239
    TAX                        ; $823A
    LDA $86B8,X                ; $823B
    STA $05E6                  ; $823E
    TXA                        ; $8241
    ASL                        ; $8242
    PHA                        ; $8243
    TAX                        ; $8244
    LDA $8DC2,X                ; $8245
    STA $0061                  ; $8248
    LDA $8DC3,X                ; $824A
    STA $0062                  ; $824D
    LDY #$00                   ; $824F
    LDA ($0061),Y              ; $8251
    PHA                        ; $8253
    INY                        ; $8254
    LDA ($0061),Y              ; $8255
    PHA                        ; $8257
    INY                        ; $8258
    LDA ($0061),Y              ; $8259
    STA $05E7                  ; $825B
    INY                        ; $825E
    LDA #$06                   ; $825F
    STA $05E8                  ; $8261
    LDA #$01                   ; $8264
    JSR $C515                  ; $8266
    LDA $0515                  ; $8269
    BNE $8264                  ; $826C
    LDA #$01                   ; $826E
    STA $0515                  ; $8270
    LDA #$02                   ; $8273
    STA $003B                  ; $8275
    LDX #$00                   ; $8277
    LDA $05E7                  ; $8279
    STA $04A5,X                ; $827C
    PLA                        ; $827F
    STA $04A7,X                ; $8280
    PLA                        ; $8283
    STA $04A6,X                ; $8284
    CLC                        ; $8287
    ADC #$20                   ; $8288
    PHA                        ; $828A
    LDA $04A7,X                ; $828B
    ADC #$00                   ; $828E
    PHA                        ; $8290
    INX                        ; $8291
    INX                        ; $8292
    INX                        ; $8293
    LDA ($0061),Y              ; $8294
    BPL $82A9                  ; $8296
    AND #$7F                   ; $8298
    STA $003A                  ; $829A
    INY                        ; $829C
    LDA #$00                   ; $829D
    STA $04A5,X                ; $829F
    INX                        ; $82A2
    DEC $003A                  ; $82A3
    BNE $829F                  ; $82A5
    BEQ $82B7                  ; $82A7
    STA $003A                  ; $82A9
    INY                        ; $82AB
    LDA ($0061),Y              ; $82AC
    STA $04A5,X                ; $82AE
    INY                        ; $82B1
    INX                        ; $82B2
    DEC $003A                  ; $82B3
    BNE $82AC                  ; $82B5
    TXA                        ; $82B7
    SEC                        ; $82B8
    SBC #$03                   ; $82B9
    CMP $04A5                  ; $82BB
    BEQ $8279                  ; $82BE
    BCC $8294                  ; $82C0
    SBC $04A5                  ; $82C2
    SBC #$03                   ; $82C5
    CMP $04A5                  ; $82C7
    BCC $8294                  ; $82CA
    LDA #$00                   ; $82CC
    STA $04A5,X                ; $82CE
    LDA #$80                   ; $82D1
    STA $0515                  ; $82D3
    DEC $05E8                  ; $82D6
    BNE $8264                  ; $82D9
    PLA                        ; $82DB
    PLA                        ; $82DC
    PLA                        ; $82DD
    TAX                        ; $82DE
    LDA $86C8,X                ; $82DF
    STA $05E7                  ; $82E2
    LDA $86C9,X                ; $82E5
    STA $05E8                  ; $82E8
    INC $05E5                  ; $82EB
    INC $05E4                  ; $82EE
    RTS                        ; $82F1
    .byte $A9,$01
    JSR $C515                  ; $82F4
    LDA $0515                  ; $82F7
    BNE $82F2                  ; $82FA
    LDA #$01                   ; $82FC
    STA $0515                  ; $82FE
    LDA $05E6                  ; $8301
    ASL                        ; $8304
    CLC                        ; $8305
    ADC #$06                   ; $8306
    TAY                        ; $8308
    INY                        ; $8309
    LDX #$00                   ; $830A
    TXA                        ; $830C
    STA $04A5,X                ; $830D
    INX                        ; $8310
    DEY                        ; $8311
    BPL $830D                  ; $8312
    LDA $05E6                  ; $8314
    CLC                        ; $8317
    ADC #$03                   ; $8318
    STA $003A                  ; $831A
    TAX                        ; $831C
    LDA $05E6                  ; $831D
    STA $04A5                  ; $8320
    STA $04A5,X                ; $8323
    LDA $05E7                  ; $8326
    ASL                        ; $8329
    TAY                        ; $832A
    LDA $86E8,Y                ; $832B
    STA $04A6                  ; $832E
    CLC                        ; $8331
    ADC #$20                   ; $8332
    STA $04A6,X                ; $8334
    LDA $86E9,Y                ; $8337
    STA $04A7                  ; $833A
    ADC #$00                   ; $833D
    STA $04A7,X                ; $833F
    LDA #$00                   ; $8342
    STA $003B                  ; $8344
    .byte $AC,$E5,$05
    INC $05E5                  ; $8349
    LDA ($005F),Y              ; $834C
    CMP #$E0                   ; $834E
    BCC $8358                  ; $8350
    JSR $835E                  ; $8352
    JMP $8346                  ; $8355
    JSR $8629                  ; $8358
    JMP $8346                  ; $835B
    SEC                        ; $835E
    SBC #$E0                   ; $835F
    JSR $C509                  ; $8361
    .byte $A4,$83,$CA,$83,$E2,$83,$43,$84,$67,$84,$6D,$84,$75,$84,$8D,$84
    .byte $93,$84,$99,$84,$9F,$84,$A5,$84,$AB,$84,$CE,$84,$D6,$84,$DC,$84
    .byte $DC,$84,$E6,$84,$EC,$84,$FB,$84,$07,$85,$B1,$85,$B6,$85,$BB,$85
    .byte $D0,$85,$D5,$85,$D5,$85,$D5,$85,$D6,$85,$FD,$85,$FE,$85,$21,$86
    .byte $AD
    .byte $3B,$04
    CMP #$01                   ; $83A7
    BNE $83B2                  ; $83A9
    BIT $0628                  ; $83AB
    BPL $83B2                  ; $83AE
    .byte $A9,$0A
    TAX                        ; $83B2
    LDA $043C                  ; $83B3
    AND #$7F                   ; $83B6
    CLC                        ; $83B8
    ADC $83BF,X                ; $83B9
    JMP $863C                  ; $83BC
    .byte $9A,$C4,$BD,$C8,$D9,$DA,$DB,$EC,$EC,$EC,$EB,$AD,$3D,$04
    AND #$1F                   ; $83CD
    TAX                        ; $83CF
    LDA $043E                  ; $83D0
    AND #$7F                   ; $83D3
    CLC                        ; $83D5
    ADC $83DC,X                ; $83D6
    JMP $863C                  ; $83D9
    .byte $CD,$D1,$D7,$DB,$DD,$DF,$AD,$3C,$04
    BPL $8413                  ; $83E5
    AND #$7F                   ; $83E7
    BEQ $83FB                  ; $83E9
    LDX $043B                  ; $83EB
    BNE $83FB                  ; $83EE
    CMP #$03                   ; $83F0
    BCS $8413                  ; $83F2
    TAX                        ; $83F4
    LDA $8440,X                ; $83F5
    JMP $8410                  ; $83F8
    LDX $043B                  ; $83FB
    CPX #$01                   ; $83FE
    BNE $8409                  ; $8400
    BIT $0628                  ; $8402
    BPL $8409                  ; $8405
    LDX #$0A                   ; $8407
    LDA $8435,X                ; $8409
    CMP #$FF                   ; $840C
    BEQ $8413                  ; $840E
    .byte $20,$3C,$86
    LDA $043B                  ; $8413
    CMP #$01                   ; $8416
    BNE $8421                  ; $8418
    BIT $0628                  ; $841A
    BPL $8421                  ; $841D
    LDA #$0A                   ; $841F
    TAX                        ; $8421
    PHP                        ; $8422
    LDA $83BF,X                ; $8423
    PLP                        ; $8426
    BNE $8432                  ; $8427
    LDA $043C                  ; $8429
    AND #$03                   ; $842C
    CLC                        ; $842E
    ADC $83BF,X                ; $842F
    JMP $863C                  ; $8432
    .byte $E8,$E6,$FF,$E6,$E9,$E9,$E7,$00,$00,$00,$E9,$E8,$EA,$E8,$2C,$3E
    .byte $04
    BPL $8455                  ; $8446
    LDX $043D                  ; $8448
    LDA $8461,X                ; $844B
    CMP #$FF                   ; $844E
    BEQ $8455                  ; $8450
    JSR $863C                  ; $8452
    LDA $043D                  ; $8455
    AND #$3F                   ; $8458
    TAX                        ; $845A
    LDA $83DC,X                ; $845B
    JMP $863C                  ; $845E
    .byte $E6,$E6,$FF,$E7,$FF,$FF,$AD,$41,$04
    JMP $8653                  ; $846A
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8470
    JMP $8478                  ; $8472
    .byte $AD,$FB,$05,$AC,$2A,$00
    TAX                        ; $847B
    BEQ $8486                  ; $847C
    LDY a: $002B               ; $847E
    CPY #$24                   ; $8481
    BNE $8486                  ; $8483
    .byte $88
    TYA                        ; $8486
    CLC                        ; $8487
    ADC #$76                   ; $8488
    JMP $863C                  ; $848A
    .byte $AD,$00,$06
    JMP $86B2                  ; $8490
    .byte $AD,$01,$06
    JMP $8653                  ; $8496
    .byte $AD,$02,$06
    JMP $8653                  ; $849C
    .byte $AD,$03,$06
    JMP $8653                  ; $84A2
    .byte $AD,$FC,$05
    JMP $8653                  ; $84A8
    .byte $AE,$3D,$04
    LDA $84C7,X                ; $84AE
    BEQ $84C6                  ; $84B1
    BIT $043E                  ; $84B3
    BPL $84BD                  ; $84B6
    LDA #$E6                   ; $84B8
    JSR $863C                  ; $84BA
    LDX $043D                  ; $84BD
    LDA $84C7,X                ; $84C0
    JMP $863C                  ; $84C3
    .byte $60,$E0,$E4,$00,$00,$00,$E0,$E0,$AD,$FB,$05
    EOR #$0B                   ; $84D1
    JMP $8653                  ; $84D3
    .byte $AD,$42,$04
    JMP $8653                  ; $84D9
    .byte $AD,$16,$06
    LSR                        ; $84DF
    CLC                        ; $84E0
    ADC #$34                   ; $84E1
    JMP $8629                  ; $84E3
    .byte $AD,$2A,$00
    JMP $84EF                  ; $84E9
    .byte $AD,$2B,$00,$C9,$24
    BNE $84F5                  ; $84F1
    .byte $A9,$23
    CLC                        ; $84F5
    ADC #$76                   ; $84F6
    JMP $863C                  ; $84F8
    .byte $AD,$41,$04
    JSR $8513                  ; $84FE
    LDA $0442                  ; $8501
    JMP $8534                  ; $8504
    .byte $AD,$42,$04
    JSR $8513                  ; $850A
    LDA $0441                  ; $850D
    JMP $8534                  ; $8510
    JSR $C50C                  ; $8513
    LDY #$00                   ; $8516
    LDA ($0034),Y              ; $8518
    LDX #$00                   ; $851A
    CMP $852C,X                ; $851C
    BEQ $8528                  ; $851F
    INX                        ; $8521
    CPX #$08                   ; $8522
    BNE $851C                  ; $8524
    CLC                        ; $8526
    RTS                        ; $8527
    STX $003D                  ; $8528
    SEC                        ; $852A
    RTS                        ; $852B
    .byte $01,$11,$44,$34,$45,$15,$42,$38,$08
    JSR $C50C                  ; $8535
    PLP                        ; $8538
    BCC $8572                  ; $8539
    LDA $003D                  ; $853B
    ASL                        ; $853D
    TAX                        ; $853E
    LDA $8589,X                ; $853F
    STA $003E                  ; $8542
    LDA $858A,X                ; $8544
    STA $003F                  ; $8547
    LDY #$00                   ; $8549
    LDA ($0034),Y              ; $854B
    TAX                        ; $854D
    LDY #$00                   ; $854E
    LDA ($003E),Y              ; $8550
    BEQ $8572                  ; $8552
    TXA                        ; $8554
    CMP ($003E),Y              ; $8555
    BEQ $855C                  ; $8557
    INY                        ; $8559
    BNE $8550                  ; $855A
    TXA                        ; $855C
    JSR $863C                  ; $855D
    LDA $003D                  ; $8560
    ASL                        ; $8562
    TAX                        ; $8563
    LDA $857A,X                ; $8564
    PHA                        ; $8567
    LDA $8579,X                ; $8568
    JSR $8629                  ; $856B
    PLA                        ; $856E
    JMP $8629                  ; $856F
    LDY #$00                   ; $8572
    LDA ($0034),Y              ; $8574
    JMP $863C                  ; $8576
    .byte $08,$2E,$08,$2E,$08,$2E,$08,$2E,$08,$2E,$0B,$2E,$0B,$2E,$0B,$2E
    .byte $99,$85,$9F,$85,$9F,$85,$A2,$85,$A2,$85,$A5,$85,$A5,$85,$AE,$85
    .byte $44,$41,$45,$4B,$49,$00,$01,$34,$00,$01,$11,$00,$01,$36,$34,$35
    .byte $32,$2E,$30,$31,$00,$11,$15,$00,$A9,$ED
    JMP $863C                  ; $85B3
    .byte $A9,$EE
    JMP $863C                  ; $85B8
    .byte $AC,$E5,$05
    INC $05E5                  ; $85BE
    LDA ($005F),Y              ; $85C1
    PHA                        ; $85C3
    LDA #$7C                   ; $85C4
    JSR $8629                  ; $85C6
    PLA                        ; $85C9
    SEC                        ; $85CA
    SBC #$01                   ; $85CB
    BNE $85C3                  ; $85CD
    RTS                        ; $85CF
    .byte $A9,$EF
    JMP $863C                  ; $85D2
    .byte $60,$A9,$80
    STA $0515                  ; $85D8
    LDA $05E7                  ; $85DB
    CMP $05E8                  ; $85DE
    BNE $85EC                  ; $85E1
    LDA #$00                   ; $85E3
    STA $05E4                  ; $85E5
    LDA #$01                   ; $85E8
    BNE $85F7                  ; $85EA
    INC $05E7                  ; $85EC
    LDY $05E5                  ; $85EF
    INC $05E5                  ; $85F2
    LDA #$01                   ; $85F5
    STA $05E9                  ; $85F7
    PLA                        ; $85FA
    PLA                        ; $85FB
    RTS                        ; $85FC
    .byte $60,$A9,$80,$8D,$15,$05,$AD,$E3,$05,$29,$BF,$8D,$E3,$05,$A9,$01
    .byte $20,$15,$C5,$20,$60,$C5,$2C,$E3,$05,$50,$F3,$AD,$E3,$05,$29,$BF
    .byte $8D,$E3,$05,$60,$A9,$00,$8D,$E3,$05,$68,$68,$60,$20,$24,$C5
    LDX $003A                  ; $862C
    STA $04A8,X                ; $862E
    LDX $003B                  ; $8631
    TYA                        ; $8633
    STA $04A8,X                ; $8634
    INC $003A                  ; $8637
    INC $003B                  ; $8639
    RTS                        ; $863B
    .byte $20,$3C,$C5
    LDA #$00                   ; $863F
    STA $003C                  ; $8641
    LDY $003C                  ; $8643
    LDA ($0030),Y              ; $8645
    CMP #$E0                   ; $8647
    BCS $8652                  ; $8649
    JSR $8629                  ; $864B
    INC $003C                  ; $864E
    BNE $8643                  ; $8650
    RTS                        ; $8652
    .byte $85,$3D
    JSR $C50C                  ; $8655
    LDY #$00                   ; $8658
    LDA ($0034),Y              ; $865A
    BEQ $866B                  ; $865C
    JSR $863C                  ; $865E
    LDA #$08                   ; $8661
    JSR $8629                  ; $8663
    LDA #$2E                   ; $8666
    JMP $8629                  ; $8668
    LDA $003D                  ; $866B
    SEC                        ; $866D
    SBC #$0B                   ; $866E
    ASL                        ; $8670
    ASL                        ; $8671
    TAX                        ; $8672
    LDY #$00                   ; $8673
    LDA $8686,X                ; $8675
    STA $05EE,Y                ; $8678
    INX                        ; $867B
    INY                        ; $867C
    CPY #$04                   ; $867D
    BNE $8675                  ; $867F
    LDA #$00                   ; $8681
    JMP $863C                  ; $8683
    .byte $47,$7D,$CD,$7D,$00,$35,$AF,$2E,$00,$36,$AF,$2E,$00,$37,$AF,$2E
    .byte $00,$38,$AF,$2E,$00,$39,$AF,$2E,$00,$3A,$AF,$2E,$00,$3B,$AF,$2E
    .byte $00,$3C,$AF,$2E,$34,$33,$AF,$2E,$34,$34,$AF,$2E,$18
    ADC #$33                   ; $86B3
    JMP $8629                  ; $86B5
    .byte $0E,$0E,$0E,$0E,$0E,$0E,$0E,$0E,$0E,$12,$12,$12,$12,$12,$12,$12
    .byte $01,$01,$01,$02,$00,$02,$00,$03,$01,$01,$01,$02,$00,$02,$00,$03
    .byte $01,$02,$05,$05,$05,$06,$04,$06,$05,$05,$05,$06,$04,$06,$04,$07
    .byte $70,$22,$B0,$22,$F0,$22,$30,$23,$6B,$22,$AB,$22,$EB,$22,$2B,$23
    .byte $AD
    .byte $32,$05
    BEQ $8722                  ; $86FB
    BPL $871A                  ; $86FD
    AND #$7F                   ; $86FF
    STA $0532                  ; $8701
    BEQ $8722                  ; $8704
    SEC                        ; $8706
    SBC #$01                   ; $8707
    ASL                        ; $8709
    TAX                        ; $870A
    LDA $AD6E,X                ; $870B
    STA $0079                  ; $870E
    LDA $AD6F,X                ; $8710
    STA $007A                  ; $8713
    LDA #$00                   ; $8715
    STA $0533                  ; $8717
    LDA $0533                  ; $871A
    BEQ $8723                  ; $871D
    DEC $0533                  ; $871F
    RTS                        ; $8722
    .byte $A0,$00
    LDA ($0079),Y              ; $8725
    AND #$07                   ; $8727
    TAX                        ; $8729
    LDA ($0079),Y              ; $872A
    LSR                        ; $872C
    LSR                        ; $872D
    LSR                        ; $872E
    BNE $873C                  ; $872F
    CPX #$00                   ; $8731
    BEQ $8765                  ; $8733
    CPX #$01                   ; $8735
    BEQ $876B                  ; $8737
    .byte $C8,$D0,$E9
    STA $0533                  ; $873C
    LDA ($0079),Y              ; $873F
    AND #$07                   ; $8741
    STA $003A                  ; $8743
    INY                        ; $8745
    LDA ($0079),Y              ; $8746
    TAX                        ; $8748
    INY                        ; $8749
    LDA ($0079),Y              ; $874A
    STA $046F,X                ; $874C
    INY                        ; $874F
    DEC $003A                  ; $8750
    BNE $8746                  ; $8752
    TYA                        ; $8754
    CLC                        ; $8755
    ADC $0079                  ; $8756
    STA $0079                  ; $8758
    BCC $875E                  ; $875A
    INC $007A                  ; $875C
    JSR $C533                  ; $875E
    .byte $00,$6C,$04
    RTS                        ; $8764
    LDA #$00                   ; $8765
    STA $0532                  ; $8767
    RTS                        ; $876A
    INY                        ; $876B
    LDA ($0079),Y              ; $876C
    TAX                        ; $876E
    INY                        ; $876F
    LDA ($0079),Y              ; $8770
    STA $007A                  ; $8772
    STX $0079                  ; $8774
    JMP $8723                  ; $8776
    .byte $AD,$34,$05
    BEQ $87A3                  ; $877C
    BPL $879B                  ; $877E
    AND #$7F                   ; $8780
    STA $0534                  ; $8782
    BEQ $87A3                  ; $8785
    SEC                        ; $8787
    SBC #$01                   ; $8788
    ASL                        ; $878A
    TAX                        ; $878B
    LDA $AD1C,X                ; $878C
    STA $007B                  ; $878F
    LDA $AD1D,X                ; $8791
    STA $007C                  ; $8794
    LDA #$00                   ; $8796
    STA $0535                  ; $8798
    LDA $0535                  ; $879B
    BEQ $87A4                  ; $879E
    DEC $0535                  ; $87A0
    RTS                        ; $87A3
    .byte $A0,$00
    LDA ($007B),Y              ; $87A6
    CMP #$F0                   ; $87A8
    BCC $87B7                  ; $87AA
    CMP #$F0                   ; $87AC
    BEQ $87D2                  ; $87AE
    CMP #$F1                   ; $87B0
    BEQ $87D8                  ; $87B2
    .byte $C8,$D0,$EF
    STA $0535                  ; $87B7
    INY                        ; $87BA
    LDA ($007B),Y              ; $87BB
    STA $0490                  ; $87BD
    INY                        ; $87C0
    LDA ($007B),Y              ; $87C1
    STA $0491                  ; $87C3
    INY                        ; $87C6
    TYA                        ; $87C7
    CLC                        ; $87C8
    ADC $007B                  ; $87C9
    STA $007B                  ; $87CB
    BCC $87D1                  ; $87CD
    .byte $E6,$7C
    RTS                        ; $87D1
    .byte $A9,$00,$8D,$34,$05,$60
    INY                        ; $87D8
    LDA ($007B),Y              ; $87D9
    TAX                        ; $87DB
    INY                        ; $87DC
    LDA ($007B),Y              ; $87DD
    STA $007C                  ; $87DF
    STX $007B                  ; $87E1
    JMP $87A4                  ; $87E3
    .byte $AD,$36,$05
    BEQ $8811                  ; $87E9
    BPL $8808                  ; $87EB
    AND #$7F                   ; $87ED
    STA $0536                  ; $87EF
    BEQ $8811                  ; $87F2
    SEC                        ; $87F4
    SBC #$01                   ; $87F5
    ASL                        ; $87F7
    TAX                        ; $87F8
    LDA $AD54,X                ; $87F9
    STA $007D                  ; $87FC
    LDA $AD55,X                ; $87FE
    STA $007E                  ; $8801
    LDA #$00                   ; $8803
    STA $0537                  ; $8805
    LDA $0537                  ; $8808
    BEQ $8815                  ; $880B
    DEC $0537                  ; $880D
    RTS                        ; $8810
    STA $0538                  ; $8811
    RTS                        ; $8814
    .byte $A0,$00
    LDA ($007D),Y              ; $8817
    CMP #$F0                   ; $8819
    BCC $8828                  ; $881B
    CMP #$F0                   ; $881D
    BEQ $883D                  ; $881F
    CMP #$F1                   ; $8821
    BEQ $8843                  ; $8823
    .byte $C8,$D0,$EF
    STA $0537                  ; $8828
    INY                        ; $882B
    LDA ($007D),Y              ; $882C
    STA $0538                  ; $882E
    INY                        ; $8831
    TYA                        ; $8832
    CLC                        ; $8833
    ADC $007D                  ; $8834
    STA $007D                  ; $8836
    BCC $883C                  ; $8838
    .byte $E6,$7E
    RTS                        ; $883C
    .byte $A9,$00,$8D,$36,$05,$60
    INY                        ; $8843
    LDA ($007D),Y              ; $8844
    TAX                        ; $8846
    INY                        ; $8847
    LDA ($007D),Y              ; $8848
    STA $007E                  ; $884A
    STX $007D                  ; $884C
    JMP $8815                  ; $884E
    .byte $A8
    ASL                        ; $8852
    TAX                        ; $8853
    LDA $B3CF,X                ; $8854
    STA $0050                  ; $8857
    LDA $B3D0,X                ; $8859
    STA $0051                  ; $885C
    TYA                        ; $885E
    AND #$03                   ; $885F
    TAX                        ; $8861
    TYA                        ; $8862
    LSR                        ; $8863
    LSR                        ; $8864
    TAY                        ; $8865
    LDA $B3BD,Y                ; $8866
    .byte $CA
    BMI $8871                  ; $886A
    LSR                        ; $886C
    LSR                        ; $886D
    JMP $8869                  ; $886E
    AND #$03                   ; $8871
    STA $05C6                  ; $8873
    ASL                        ; $8876
    ASL                        ; $8877
    ASL                        ; $8878
    ADC $05C6                  ; $8879
    STA $05C6                  ; $887C
    LDA #$00                   ; $887F
    STA $05C5                  ; $8881
    LDA #$01                   ; $8884
    JSR $C515                  ; $8886
    LDA $0515                  ; $8889
    BNE $8884                  ; $888C
    LDA #$01                   ; $888E
    STA $0515                  ; $8890
    LDY #$02                   ; $8893
    LDA ($0050),Y              ; $8895
    ASL                        ; $8897
    CLC                        ; $8898
    ADC #$06                   ; $8899
    TAX                        ; $889B
    LDA #$00                   ; $889C
    STA $04A5,X                ; $889E
    DEX                        ; $88A1
    BPL $889E                  ; $88A2
    LDX #$00                   ; $88A4
    JSR $88B9                  ; $88A6
    BEQ $88B8                  ; $88A9
    LDY #$02                   ; $88AB
    LDA ($0050),Y              ; $88AD
    CLC                        ; $88AF
    ADC #$03                   ; $88B0
    TAX                        ; $88B2
    JSR $88B9                  ; $88B3
    BNE $8884                  ; $88B6
    RTS                        ; $88B8
    LDA #$FF                   ; $88B9
    STA $0045                  ; $88BB
    LDY #$02                   ; $88BD
    LDA ($0050),Y              ; $88BF
    STA $04A5,X                ; $88C1
    LDA #$00                   ; $88C4
    STA $003A                  ; $88C6
    LDA $05C5                  ; $88C8
    LSR                        ; $88CB
    ROR $003A                  ; $88CC
    LSR                        ; $88CE
    ROR $003A                  ; $88CF
    LSR                        ; $88D1
    ROR $003A                  ; $88D2
    STA $003B                  ; $88D4
    LDY #$00                   ; $88D6
    LDA ($0050),Y              ; $88D8
    CLC                        ; $88DA
    ADC $003A                  ; $88DB
    STA $04A6,X                ; $88DD
    INY                        ; $88E0
    LDA ($0050),Y              ; $88E1
    ADC $003B                  ; $88E3
    STA $04A7,X                ; $88E5
    CMP #$22                   ; $88E8
    BCS $88F9                  ; $88EA
    LDA $05CE                  ; $88EC
    LSR                        ; $88EF
    LSR                        ; $88F0
    LSR                        ; $88F1
    LSR                        ; $88F2
    ORA $04A7,X                ; $88F3
    STA $04A7,X                ; $88F6
    STX $003A                  ; $88F9
    LDX #$00                   ; $88FB
    LDY #$05                   ; $88FD
    LDA ($0050),Y              ; $88FF
    CMP $05C5                  ; $8901
    BEQ $8918                  ; $8904
    BCS $8949                  ; $8906
    LDY #$07                   ; $8908
    CLC                        ; $890A
    ADC ($0050),Y              ; $890B
    LDX #$06                   ; $890D
    CMP $05C5                  ; $890F
    BEQ $8918                  ; $8912
    BCC $8949                  ; $8914
    LDX #$03                   ; $8916
    LDY #$06                   ; $8918
    LDA ($0050),Y              ; $891A
    SEC                        ; $891C
    SBC #$02                   ; $891D
    STA $003B                  ; $891F
    LDA $003A                  ; $8921
    LDY #$04                   ; $8923
    CLC                        ; $8925
    ADC ($0050),Y              ; $8926
    TAY                        ; $8928
    STX $0045                  ; $8929
    TXA                        ; $892B
    CLC                        ; $892C
    ADC $05C6                  ; $892D
    TAX                        ; $8930
    LDA $8D9E,X                ; $8931
    STA $04A8,Y                ; $8934
    LDA $8D9F,X                ; $8937
    INY                        ; $893A
    STA $04A8,Y                ; $893B
    INY                        ; $893E
    DEC $003B                  ; $893F
    BNE $893B                  ; $8941
    LDA $8DA0,X                ; $8943
    STA $04A8,Y                ; $8946
    LDY #$08                   ; $8949
    LDA ($0050),Y              ; $894B
    BEQ $8976                  ; $894D
    STA $003B                  ; $894F
    INY                        ; $8951
    LDA #$00                   ; $8952
    STA $003C                  ; $8954
    LDA ($0050),Y              ; $8956
    CMP $05C5                  ; $8958
    BEQ $8967                  ; $895B
    SEC                        ; $895D
    SBC #$01                   ; $895E
    INC $003C                  ; $8960
    CMP $05C5                  ; $8962
    BNE $896E                  ; $8965
    STY $0048                  ; $8967
    JSR $8986                  ; $8969
    LDY $0048                  ; $896C
    INY                        ; $896E
    INY                        ; $896F
    INY                        ; $8970
    INY                        ; $8971
    DEC $003B                  ; $8972
    BNE $8952                  ; $8974
    LDA #$80                   ; $8976
    STA $0515                  ; $8978
    LDA $05C5                  ; $897B
    INC $05C5                  ; $897E
    LDY #$03                   ; $8981
    CMP ($0050),Y              ; $8983
    RTS                        ; $8985
    INY                        ; $8986
    LDA ($0050),Y              ; $8987
    CLC                        ; $8989
    ADC $003A                  ; $898A
    STA $003D                  ; $898C
    INY                        ; $898E
    LDA ($0050),Y              ; $898F
    STA $003E                  ; $8991
    INY                        ; $8993
    LDA ($0050),Y              ; $8994
    STA $003F                  ; $8996
    LDA #$00                   ; $8998
    STA $0040                  ; $899A
    .byte $A4,$40
    INC $0040                  ; $899E
    LDA ($003E),Y              ; $89A0
    CMP #$E0                   ; $89A2
    BCC $89AC                  ; $89A4
    JSR $89B4                  ; $89A6
    JMP $899C                  ; $89A9
    JSR $C524                  ; $89AC
    JSR $8C9F                  ; $89AF
    BNE $899C                  ; $89B2
    SEC                        ; $89B4
    SBC #$E0                   ; $89B5
    JSR $C509                  ; $89B7
    .byte $FA,$89,$00,$8A,$06,$8A,$0C,$8A,$12,$8A,$86,$8A,$93,$8A,$AF,$8A
    .byte $B8,$8A,$C1,$8A,$C1,$8A,$D7,$8A,$DF,$8A,$E7,$8A,$2F,$8B,$48,$8B
    .byte $8B,$8B,$D5,$8B,$DE,$8B,$E4,$8B,$EA,$8B,$F0,$8B,$04,$8C,$47,$8C
    .byte $52,$8C,$52,$8C,$52,$8C,$52,$8C,$52,$8C,$55,$8C,$55,$8C,$55,$8C
    .byte $AD
    .byte $41,$04
    JMP $8CDC                  ; $89FD
    .byte $AD,$41,$04
    JMP $8CA5                  ; $8A03
    .byte $AD,$FC,$05
    JMP $8CDC                  ; $8A09
    .byte $AD,$FC,$05
    JMP $8CA5                  ; $8A0F
    .byte $AD,$3B,$04
    JSR $C509                  ; $8A15
    .byte $20,$8A,$34,$8A,$39,$8A,$3E,$8A,$A4,$40
    LDA ($003E),Y              ; $8A22
    BNE $8A2F                  ; $8A24
    LDA $044E                  ; $8A26
    CLC                        ; $8A29
    ADC #$9A                   ; $8A2A
    JMP $8A56                  ; $8A2C
    LDA #$9A                   ; $8A2F
    JMP $8A43                  ; $8A31
    .byte $A9,$C4
    JMP $8A43                  ; $8A36
    .byte $A9,$BD
    JMP $8A43                  ; $8A3B
    .byte $A9,$C8
    JMP $8A43                  ; $8A40
    .byte $AA
    LDY $0040                  ; $8A44
    INC $0040                  ; $8A46
    LDA ($003E),Y              ; $8A48
    BEQ $8A55                  ; $8A4A
    TAY                        ; $8A4C
    TXA                        ; $8A4D
    CLC                        ; $8A4E
    ADC $0430,Y                ; $8A4F
    JMP $8A56                  ; $8A52
    TXA                        ; $8A55
    .byte $85,$47
    JSR $C53C                  ; $8A58
    LDA $0047                  ; $8A5B
    LDY #$09                   ; $8A5D
    CMP #$AA                   ; $8A5F
    BEQ $8A6E                  ; $8A61
    LDY #$00                   ; $8A63
    LDA ($0030),Y              ; $8A65
    CMP #$FC                   ; $8A67
    BEQ $8A6E                  ; $8A69
    INY                        ; $8A6B
    BNE $8A65                  ; $8A6C
    TYA                        ; $8A6E
    .byte $85,$49
    LDA #$00                   ; $8A71
    STA $0046                  ; $8A73
    LDY $0046                  ; $8A75
    LDA ($0030),Y              ; $8A77
    JSR $C524                  ; $8A79
    JSR $8C9F                  ; $8A7C
    INC $0046                  ; $8A7F
    DEC $0049                  ; $8A81
    BNE $8A75                  ; $8A83
    RTS                        ; $8A85
    .byte $A4,$40
    INC $0040                  ; $8A88
    LDA ($003E),Y              ; $8A8A
    TAX                        ; $8A8C
    LDA $0601,X                ; $8A8D
    JMP $8D1A                  ; $8A90
    .byte $A4,$40
    INC $0040                  ; $8A95
    LDA ($003E),Y              ; $8A97
    BEQ $8A9F                  ; $8A99
    TAX                        ; $8A9B
    LDA $0430,X                ; $8A9C
    LDX $061E                  ; $8A9F
    LDY $060B,X                ; $8AA2
    CLC                        ; $8AA5
    ADC $8AAC,Y                ; $8AA6
    JMP $8D6C                  ; $8AA9
    .byte $CD,$D1,$D7,$AE,$1E,$06
    LDA $0601,X                ; $8AB2
    JMP $8CDC                  ; $8AB5
    .byte $AE,$1E,$06
    LDA $0601,X                ; $8ABB
    JMP $8CA5                  ; $8ABE
    .byte $A4,$40
    INC $0040                  ; $8AC3
    LDA ($003E),Y              ; $8AC5
    TAX                        ; $8AC7
    LDA $0431,X                ; $8AC8
    INX                        ; $8ACB
    CPX $0430                  ; $8ACC
    BCC $8AD4                  ; $8ACF
    BEQ $8AD4                  ; $8AD1
    RTS                        ; $8AD3
    JMP $8D1A                  ; $8AD4
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8ADA
    JMP $8CDC                  ; $8ADC
    .byte $AD,$FB,$05
    EOR #$0B                   ; $8AE2
    JMP $8CA5                  ; $8AE4
    .byte $A4,$40
    INC $0040                  ; $8AE9
    LDX a: $002A               ; $8AEB
    LDA ($003E),Y              ; $8AEE
    BEQ $8AF5                  ; $8AF0
    LDX a: $002B               ; $8AF2
    LDA $8B0A,X                ; $8AF5
    PHA                        ; $8AF8
    TXA                        ; $8AF9
    CLC                        ; $8AFA
    ADC #$76                   ; $8AFB
    CMP #$9A                   ; $8AFD
    BCC $8B03                  ; $8AFF
    .byte $A9,$99
    JSR $C53C                  ; $8B03
    PLA                        ; $8B06
    JMP $8A6F                  ; $8B07
    .byte $03,$04,$03,$03,$03,$04,$03,$04,$03,$03,$03,$04,$03,$03,$04,$03
    .byte $03,$03,$03,$03,$03,$03,$03,$03,$04,$03,$03,$03,$04,$04,$04,$04
    .byte $04,$03,$03,$04,$04,$A4,$40
    INC $0040                  ; $8B31
    LDA ($003E),Y              ; $8B33
    TAX                        ; $8B35
    LDA a: $0028,X             ; $8B36
    LDY a: $0027               ; $8B39
    CPY #$04                   ; $8B3C
    BNE $8B43                  ; $8B3E
    LDA $0610,X                ; $8B40
    LDX #$00                   ; $8B43
    JMP $8C55                  ; $8B45
    .byte $A9,$00
    STA $0047                  ; $8B4A
    LDA a: $0027               ; $8B4C
    ASL                        ; $8B4F
    ASL                        ; $8B50
    ADC a: $0027               ; $8B51
    ADC $0047                  ; $8B54
    TAX                        ; $8B56
    LDA $8B72,X                ; $8B57
    CMP #$FF                   ; $8B5A
    BEQ $8B67                  ; $8B5C
    JSR $C524                  ; $8B5E
    JSR $8C9F                  ; $8B61
    JMP $8B69                  ; $8B64
    INC $003D                  ; $8B67
    .byte $E6,$47
    LDA $0047                  ; $8B6B
    CMP #$05                   ; $8B6D
    BNE $8B4C                  ; $8B6F
    RTS                        ; $8B71
    .byte $FF,$A8,$2E,$FF,$FF,$FF,$0A,$03,$FF,$FF,$04,$2E,$00,$A8,$2E,$04
    .byte $2E,$00,$0A,$03,$FF,$8D,$8B,$FF,$FF,$A2,$00
    LDA $05F7                  ; $8B8D
    LDY $05F8                  ; $8B90
    SEC                        ; $8B93
    SBC #$06                   ; $8B94
    BCS $8B9B                  ; $8B96
    DEY                        ; $8B98
    BMI $8B9E                  ; $8B99
    INX                        ; $8B9B
    BNE $8B93                  ; $8B9C
    ADC #$06                   ; $8B9E
    ASL                        ; $8BA0
    TAY                        ; $8BA1
    TXA                        ; $8BA2
    PHA                        ; $8BA3
    LDA $8BC9,Y                ; $8BA4
    PHA                        ; $8BA7
    LDA $8BCA,Y                ; $8BA8
    LDY #$00                   ; $8BAB
    JSR $8C85                  ; $8BAD
    DEC $003D                  ; $8BB0
    PLA                        ; $8BB2
    LDY #$00                   ; $8BB3
    JSR $8C85                  ; $8BB5
    DEC $003D                  ; $8BB8
    LDA #$77                   ; $8BBA
    LDY #$00                   ; $8BBC
    JSR $8C85                  ; $8BBE
    DEC $003D                  ; $8BC1
    PLA                        ; $8BC3
    LDX #$00                   ; $8BC4
    JMP $8C55                  ; $8BC6
    .byte $33,$33,$34,$33,$35,$33,$36,$33,$37,$33,$38,$33,$A4,$40
    INC $0040                  ; $8BD7
    LDA ($003E),Y              ; $8BD9
    JMP $8D1A                  ; $8BDB
    .byte $AD,$FD,$05
    JMP $8D1A                  ; $8BE1
    .byte $AD,$FD,$05,$4C,$A5,$8C,$AD,$41,$04
    JMP $8D1A                  ; $8BED
    .byte $A4,$40
    INC $0040                  ; $8BF2
    LDA ($003E),Y              ; $8BF4
    JSR $C50C                  ; $8BF6
    LDY #$02                   ; $8BF9
    LDA ($0034),Y              ; $8BFB
    TAX                        ; $8BFD
    DEY                        ; $8BFE
    LDA ($0034),Y              ; $8BFF
    JMP $8C55                  ; $8C01
    .byte $AD,$41,$04
    STA $0049                  ; $8C07
    LDA $0049                  ; $8C09
    CMP #$0B                   ; $8C0B
    BEQ $8C46                  ; $8C0D
    LDX $0430                  ; $8C0F
    BEQ $8C22                  ; $8C12
    CMP $0430,X                ; $8C14
    BEQ $8C1E                  ; $8C17
    DEX                        ; $8C19
    BNE $8C14                  ; $8C1A
    BEQ $8C22                  ; $8C1C
    INC $0049                  ; $8C1E
    BNE $8C09                  ; $8C20
    INC $0049                  ; $8C22
    JSR $8D1A                  ; $8C24
    LDY $003C                  ; $8C27
    DEY                        ; $8C29
    BEQ $8C46                  ; $8C2A
    LDA #$17                   ; $8C2C
    STA $003D                  ; $8C2E
    LDA $0049                  ; $8C30
    SEC                        ; $8C32
    SBC #$01                   ; $8C33
    LDX #$01                   ; $8C35
    JSR $C527                  ; $8C37
    LDA $0032                  ; $8C3A
    LDX $0033                  ; $8C3C
    JSR $8C55                  ; $8C3E
    LDA $0049                  ; $8C41
    STA $0441                  ; $8C43
    RTS                        ; $8C46
    .byte $AD,$FD,$05
    CLC                        ; $8C4A
    ADC #$01                   ; $8C4B
    LDX #$00                   ; $8C4D
    JMP $8C55                  ; $8C4F
    .byte $68
    PLA                        ; $8C53
    RTS                        ; $8C54
    .byte $A4,$3C
    DEY                        ; $8C57
    BEQ $8C84                  ; $8C58
    STA $006F                  ; $8C5A
    STX $0070                  ; $8C5C
    LDA #$0A                   ; $8C5E
    STA $0071                  ; $8C60
    LDA #$00                   ; $8C62
    STA $0074                  ; $8C64
    JSR $C51E                  ; $8C66
    LDA $0072                  ; $8C69
    JSR $8C7A                  ; $8C6B
    LDA $0070                  ; $8C6E
    BNE $8C66                  ; $8C70
    LDA $006F                  ; $8C72
    BEQ $8C84                  ; $8C74
    CMP #$0A                   ; $8C76
    BCS $8C66                  ; $8C78
    CLC                        ; $8C7A
    ADC #$33                   ; $8C7B
    LDY #$00                   ; $8C7D
    JSR $8C85                  ; $8C7F
    DEC $003D                  ; $8C82
    RTS                        ; $8C84
    LDX $003D                  ; $8C85
    DEC $003C                  ; $8C87
    BNE $8C99                  ; $8C89
    TYA                        ; $8C8B
    BEQ $8C9C                  ; $8C8C
    LDY $05C6                  ; $8C8E
    CPY #$1B                   ; $8C91
    BEQ $8C99                  ; $8C93
    LDY $0045                  ; $8C95
    BEQ $8C9C                  ; $8C97
    STA $04A8,X                ; $8C99
    INC $003C                  ; $8C9C
    RTS                        ; $8C9E
    JSR $8C85                  ; $8C9F
    INC $003D                  ; $8CA2
    RTS                        ; $8CA4
    .byte $48
    LDY $0040                  ; $8CA6
    INC $0040                  ; $8CA8
    LDA ($003E),Y              ; $8CAA
    BNE $8CBD                  ; $8CAC
    PLA                        ; $8CAE
    JSR $C50C                  ; $8CAF
    LDY #$02                   ; $8CB2
    LDA ($0034),Y              ; $8CB4
    TAX                        ; $8CB6
    DEY                        ; $8CB7
    LDA ($0034),Y              ; $8CB8
    JMP $8CD9                  ; $8CBA
    AND #$7F                   ; $8CBD
    CMP #$07                   ; $8CBF
    BCC $8CD0                  ; $8CC1
    CMP #$18                   ; $8CC3
    BCS $8CD0                  ; $8CC5
    LDX $044E                  ; $8CC7
    DEX                        ; $8CCA
    BEQ $8CD0                  ; $8CCB
    CLC                        ; $8CCD
    ADC #$08                   ; $8CCE
    TAX                        ; $8CD0
    PLA                        ; $8CD1
    JSR $C527                  ; $8CD2
    LDA $0032                  ; $8CD5
    LDX $0033                  ; $8CD7
    .byte $4C,$55,$8C,$48
    CMP #$0B                   ; $8CDD
    BCC $8CE3                  ; $8CDF
    SBC #$0B                   ; $8CE1
    ASL                        ; $8CE3
    PHA                        ; $8CE4
    TAX                        ; $8CE5
    LDA $8D04,X                ; $8CE6
    JSR $C524                  ; $8CE9
    JSR $8C9F                  ; $8CEC
    PLA                        ; $8CEF
    TAX                        ; $8CF0
    LDA $8D05,X                ; $8CF1
    JSR $C524                  ; $8CF4
    JSR $8C9F                  ; $8CF7
    LDA #$00                   ; $8CFA
    TAY                        ; $8CFC
    JSR $8C9F                  ; $8CFD
    PLA                        ; $8D00
    JMP $8D1A                  ; $8D01
    .byte $87,$8B,$84,$86,$84,$86,$84,$86,$84,$86,$8C,$86,$86,$92,$8C,$86
    .byte $86,$92,$8C,$86,$86,$92,$85,$47
    JSR $C50C                  ; $8D1C
    LDY #$00                   ; $8D1F
    LDA ($0034),Y              ; $8D21
    BNE $8D6C                  ; $8D23
    LDA $0047                  ; $8D25
    SEC                        ; $8D27
    SBC #$0B                   ; $8D28
    ASL                        ; $8D2A
    ASL                        ; $8D2B
    TAX                        ; $8D2C
    LDY #$00                   ; $8D2D
    LDA $8D40,X                ; $8D2F
    STA $05EE,Y                ; $8D32
    INX                        ; $8D35
    INY                        ; $8D36
    CPY #$04                   ; $8D37
    BNE $8D2F                  ; $8D39
    LDA #$00                   ; $8D3B
    JMP $8D6C                  ; $8D3D
    .byte $47,$7D,$CD,$7D,$00,$35,$AF,$2E,$00,$36,$AF,$2E,$00,$37,$AF,$2E
    .byte $00,$38,$AF,$2E,$00,$39,$AF,$2E,$00,$3A,$AF,$2E,$00,$3B,$AF,$2E
    .byte $00,$3C,$AF,$2E,$34,$33,$AF,$2E,$34,$34,$AF,$2E,$20,$3C,$C5
    LDY #$00                   ; $8D6F
    LDA ($0030),Y              ; $8D71
    CMP #$E0                   ; $8D73
    BCS $8D86                  ; $8D75
    TYA                        ; $8D77
    PHA                        ; $8D78
    LDA ($0030),Y              ; $8D79
    JSR $C524                  ; $8D7B
    JSR $8C9F                  ; $8D7E
    PLA                        ; $8D81
    TAY                        ; $8D82
    INY                        ; $8D83
    BNE $8D71                  ; $8D84
    TYA                        ; $8D86
    SEC                        ; $8D87
    SBC #$05                   ; $8D88
    BPL $8D9D                  ; $8D8A
    EOR #$FF                   ; $8D8C
    CLC                        ; $8D8E
    ADC #$01                   ; $8D8F
    STA $0047                  ; $8D91
    LDA #$00                   ; $8D93
    TAY                        ; $8D95
    JSR $8C9F                  ; $8D96
    DEC $0047                  ; $8D99
    BNE $8D93                  ; $8D9B
    RTS                        ; $8D9D
    .byte $9C,$A8,$9D,$AA,$00,$AB,$9E,$A9,$9F,$88,$89,$90,$8A,$00,$8A,$8E
    .byte $89,$93,$00,$00,$00,$00,$00,$00,$00,$00,$00,$E4,$E5,$F0,$E6,$00
    .byte $F2,$EC,$ED,$F8,$E0,$8D,$37,$8E,$94,$8E,$F6,$8E,$6B,$8F,$BF,$8F
    .byte $15,$90,$73,$90,$DF,$90,$40,$91,$40,$91,$40,$91,$B0,$91,$B0,$91
    .byte $B0,$91,$2C,$22,$14,$94,$94,$82,$10,$9C,$A8,$A8,$A0,$A8,$A8,$A0
    .byte $A8,$A8,$A8,$A0,$A8,$A0,$A8,$A8,$9D,$82,$03,$00,$9C,$98,$8E,$03
    .byte $99,$9D,$00,$02,$00,$AA,$90,$02,$AB,$00,$02,$A4,$A5,$90,$02,$AB
    .byte $00,$02,$00,$AA,$90,$02,$AB,$00,$03,$00,$9E,$9A,$8E,$03,$9B,$9F
    .byte $00,$14,$00,$00,$9E,$A9,$A2,$A9,$A9,$A2,$A9,$A9,$A9,$A2,$A9,$A9
    .byte $A9,$A2,$A9,$9F,$00,$00,$94,$94,$94,$2C,$22,$14,$94,$94,$83,$0E
    .byte $9C,$A8,$A0,$A8,$A0,$A8,$A8,$A0,$A8,$A0,$A8,$A8,$A0,$9D,$83,$04
    .byte $00,$00,$9C,$98,$8C,$04,$99,$A0,$9D,$00,$03,$00,$9C,$98,$8F,$02
    .byte $A1,$00,$02,$A4,$A5,$90,$02,$AB,$00,$02,$00,$AA,$90,$02,$A1,$00
    .byte $03,$00,$9E,$9A,$8F,$02,$AB,$00,$04,$00,$00,$9E,$9A,$8E,$02,$A1
    .byte $00,$83,$11,$9E,$A2,$A9,$A2,$A9,$A9,$A2,$A9,$A9,$A2,$A9,$A2,$A9
    .byte $A9,$A2,$9F,$00,$94,$94,$2C,$22,$14,$94,$82,$12,$9C,$A0,$A8,$A8
    .byte $A0,$A0,$A8,$A8,$A0,$A8,$A8,$A0,$A8,$A0,$A0,$A8,$9D,$00,$03,$00
    .byte $9C,$98,$8F,$02,$AB,$00,$02,$00,$AA,$90,$02,$AB,$00,$02,$00,$A3
    .byte $90,$02,$A1,$00,$02,$A4,$A5,$90,$02,$AB,$00,$02,$00,$AA,$90,$02
    .byte $A1,$00,$03,$00,$9E,$9A,$8F,$02,$AB,$00,$04,$00,$00,$9E,$9A,$8C
    .byte $04,$9B,$A9,$9F,$00,$83,$0E,$9E,$A2,$A9,$A9,$A2,$A2,$A9,$A9,$A9
    .byte $A2,$A9,$A9,$A9,$9F,$83,$94,$94,$2C,$22,$14,$94,$14,$00,$00,$00
    .byte $9C,$A8,$A0,$A8,$A8,$A0,$A8,$A8,$A0,$A0,$A8,$A8,$A0,$A8,$A0,$9D
    .byte $00,$04,$00,$00,$9C,$98,$8E,$02,$A1,$00,$03,$00,$00,$AA,$8F,$02
    .byte $AB,$00,$03,$00,$9C,$98,$8F,$02,$AB,$00,$02,$A4,$A5,$90,$02,$A1
    .byte $00,$02,$00,$AA,$90,$02,$A1,$00,$03,$00,$9E,$9A,$8F,$02,$AB,$00
    .byte $03,$00,$00,$A3,$8F,$02,$A1,$00,$03,$00,$00,$AA,$8F,$02,$AB,$00
    .byte $05,$00,$00,$9E,$A2,$9A,$8C,$03,$9B,$9F,$00,$84,$10,$9E,$A9,$A9
    .byte $A2,$A9,$A9,$A2,$A9,$A9,$A2,$A2,$A9,$A9,$9F,$00,$00,$2C
    .byte $22,$14,$94,$94,$14,$00,$00,$9B,$A9,$A2,$A9,$A2,$A9,$A9,$A2,$A9
    .byte $A9,$A9,$A2,$A9,$A2,$A2,$A9,$9A,$00,$03,$00,$9B,$9F,$8F,$02,$9E
    .byte $9A,$02,$00,$AB,$91,$01,$AA,$02,$00,$A1,$91,$01,$A3,$02,$00,$AB
    .byte $91,$01,$AA,$03,$00,$99,$9D,$8F,$02,$9C,$98,$14,$00,$00,$99,$A8
    .byte $A0,$A8,$A0,$A8,$A8,$A0,$A8,$A8,$A8,$A0,$A8,$A0,$A8,$A0,$98,$00
    .byte $94,$94,$94,$2C,$22,$14,$94,$94,$14,$00,$00,$9B,$A9,$A2,$A2,$A9
    .byte $A2,$A9,$A9,$A2,$A9,$A2,$A9,$A2,$A9,$A2,$A9,$9A,$00,$03,$00,$9B
    .byte $9F,$8F,$02,$9E,$9A,$02,$9B,$9F,$91,$01,$A3,$01,$A1,$92,$01,$AA
    .byte $01,$AB,$92,$01,$A3,$02,$99,$9D,$91,$01,$AA,$03,$00,$99,$9D,$90
    .byte $01,$A3,$14,$00,$00,$99,$A8,$A8,$A0,$A8,$A0,$A8,$A8,$A0,$A8,$A0
    .byte $A8,$A8,$A0,$A8,$A0,$A8,$98,$94,$94,$2C,$22,$14,$94,$14,$00,$00
    .byte $9B,$A2,$A9,$A2,$A9,$A2,$A2,$A9,$A9,$A9,$A2,$A9,$A9,$A2,$A9,$A2
    .byte $9A,$00,$03,$00,$9B,$9F,$8F,$02,$9E,$9A,$02,$00,$AB,$91,$01,$AA
    .byte $02,$00,$A1,$91,$01,$A3,$02,$00,$A1,$91,$01,$AA,$02,$00,$AB,$91
    .byte $01,$A3,$02,$00,$A1,$91,$01,$AA,$03,$00,$99,$9D,$8F,$02,$9C,$98
    .byte $14,$00,$00,$99,$A0,$A8,$A8,$A8,$A0,$A8,$A0,$A8,$A0,$A0,$A8,$A0
    .byte $A8,$A0,$A8,$98,$00,$94,$94,$2C,$22,$14,$94,$14,$00,$00,$00,$9B
    .byte $A9,$A2,$A9,$A2,$A9,$A9,$A2,$A9,$A9,$A2,$A2,$A9,$A9,$A2,$9A,$00
    .byte $04,$00,$00,$9B,$9F,$8E,$02,$9E,$9A,$03,$00,$9B,$9F,$90,$01,$AA
    .byte $02,$00,$A1,$91,$01,$A3,$02,$00,$AB,$91,$01,$AA,$02,$00,$A1,$91
    .byte $01,$AA,$02,$00,$AB,$91,$01,$A3,$02,$00,$A1,$91,$01,$AA,$03,$00
    .byte $99,$9D,$90,$01,$A3,$04,$00,$00,$99,$9D,$8E,$02,$9C,$98,$14,$00
    .byte $00,$00,$99,$A8,$A0,$A8,$A8,$A0,$A8,$A8,$A0,$A0,$A8,$A8,$A0,$A8
    .byte $A0,$98,$00,$2C,$22,$14,$94,$94,$14,$00,$00,$00,$9C,$A0,$A8,$A0
    .byte $A8,$A0,$A8,$A8,$A0,$A8,$A0,$A0,$A8,$A0,$9D,$00,$00,$04,$00,$9C
    .byte $A0,$98,$8D,$03,$99,$9D,$00,$02,$00,$A3,$90,$02,$AB,$00,$02,$96
    .byte $97,$90,$02,$A1,$00,$02,$00,$A3,$90,$02,$AB,$00,$03,$00,$9E,$9A
    .byte $8F,$02,$A1,$00,$03,$00,$00,$A3,$8E,$03,$9B,$9F,$00,$14,$00,$00
    .byte $9E,$A2,$A9,$A2,$A9,$A2,$A9,$A9,$A2,$A2,$A9,$A2,$A2,$A9,$A2,$9F
    .byte $00,$00,$94,$94,$28,$22,$18,$98,$18,$00,$9C,$A8,$A8,$A8,$A8,$A8
    .byte $A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$A8,$9D,$00
    .byte $00,$02,$00,$AA,$93,$03,$AB,$00,$00,$02,$00,$AA,$93,$03,$AB,$00
    .byte $00,$02,$00,$AA,$93,$03,$AB,$00,$00,$02,$00,$AA,$93,$03,$AB,$00
    .byte $00,$02,$00,$AA,$93,$03,$AB,$00,$00,$02,$00,$AA,$93,$03,$AB,$00
    .byte $00,$02,$00,$AA,$93,$03,$AB,$00,$00,$18,$00,$9E,$A9,$A9,$A9,$A9
    .byte $A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$A9,$9F
    .byte $00,$00,$98,$98,$28,$22,$18,$98,$18,$00,$9B,$A9,$A2,$A9,$A2,$A9
    .byte $A2,$A9,$A2,$A9,$A2,$A9,$A2,$A9,$A2,$A9,$A2,$A9,$A2,$A9,$9A,$00
    .byte $00,$02,$00,$AB,$93,$03,$AA,$00,$00,$02,$00,$A1,$93,$03,$A3,$00
    .byte $00,$02,$00,$AB,$93,$03,$AA,$00,$00,$02,$00,$A1,$93,$03,$A3,$00
    .byte $00,$02,$00,$AB,$93,$03,$AA,$00,$00,$02,$00,$A1,$93,$03,$A3,$00
    .byte $00,$02,$00,$AB,$93,$03,$AA,$00,$00,$18,$00,$99,$A8,$A0,$A8,$A0
    .byte $A8,$A0,$A8,$A0,$A8,$A0,$A8,$A0,$A8,$A0,$A8,$A0,$A8,$A0,$A8,$98
    .byte $00,$00,$98,$98,$00,$94,$02,$94,$11,$94,$20,$94,$3B,$94,$47,$94
    .byte $55,$94,$65,$94,$71,$94,$8A,$94,$95,$94,$AD,$94,$BB,$94,$CE,$94
    .byte $D1,$94,$D9,$94,$E4,$94,$FC,$94,$12,$95,$27,$95,$2E,$95,$48,$95
    .byte $55,$95,$63,$95,$6F,$95,$8B,$95,$9A,$95,$A9,$95,$B7,$95,$CE,$95
    .byte $E6,$95,$08,$96,$21,$96,$2A,$96,$40,$96,$77,$96,$86,$96,$92,$96
    .byte $A7,$96,$BF,$96,$DA,$96,$EA,$96,$F6,$96,$01,$97,$0D,$97,$18,$97
    .byte $31,$97,$3F,$97,$4E,$97,$5F,$97,$97,$97,$C4,$97,$D3,$97,$E4,$97
    .byte $FE,$97,$10,$98,$33,$98,$43,$98,$4C,$98,$5C,$98,$6C,$98,$7A,$98
    .byte $8E,$98,$9B,$98,$A4,$98,$B4,$98,$C1,$98,$CF,$98,$E7,$98,$F4,$98
    .byte $0B,$99,$17,$99,$21,$99,$2D,$99,$38,$99,$4E,$99,$63,$99,$75,$99
    .byte $7D,$99,$7D,$99,$8D,$99,$9F,$99,$BB,$99,$D9,$99,$FA,$99,$1C,$9A
    .byte $3D,$9A,$48,$9A,$62,$9A,$70,$9A,$80,$9A,$96,$9A,$AF,$9A,$C6,$9A
    .byte $D9,$9A,$E9,$9A,$FA,$9A,$07,$9B,$17,$9B,$26,$9B,$36,$9B,$47,$9B
    .byte $60,$9B,$7A,$9B,$88,$9B,$92,$9B,$C1,$9B,$CD,$9B,$D7,$9B,$E3,$9B
    .byte $71,$9C,$82,$9C,$92,$9C,$AA,$9C,$31,$9F,$42,$9F,$BD,$A3,$39,$A4
    .byte $47,$A4,$61,$A4,$6C,$A4,$8C,$A4,$A7,$A4,$B4,$A4,$C2,$A4,$E2,$A4
    .byte $05,$A5,$16,$A5,$1E,$A5,$49,$A5,$5B,$A5,$6D,$A5,$81,$A5,$8B,$A5
    .byte $97,$A5,$A8,$A5,$B4,$A5,$B5,$A5,$C8,$A5,$D8,$A5,$10,$A6,$3B,$A6
    .byte $44,$A6,$51,$A6,$5D,$A6,$69,$A6,$78,$A6,$87,$A6,$96,$A6,$A7,$A6
    .byte $B9,$A6,$EB,$A6,$F7,$A6,$01,$A7,$0A,$A7,$16,$A7,$28,$A7,$51,$A7
    .byte $77,$A7,$A0,$A7,$B1,$A7,$CB,$A7,$D5,$A7,$E0,$A7,$ED,$A7,$F8,$A7
    .byte $04,$A8,$1B,$A8,$1B,$A8,$23,$A8,$35,$A8,$43,$A8,$4E,$A8,$56,$A8
    .byte $65,$A8,$6F,$A8,$7A,$A8,$80,$A8,$92,$A8,$9E,$A8,$B9,$A8,$C1,$A8
    .byte $C9,$A8,$D8,$A8,$E0,$A8,$E9,$A8,$09,$A9,$13,$A9,$1F,$A9,$27,$A9
    .byte $39,$A9,$49,$A9,$62,$A9,$6B,$A9,$75,$A9,$7C,$A9,$89,$A9,$91,$A9
    .byte $9F,$A9,$A9,$A9,$B0,$A9,$C9,$A9,$D1,$A9,$DE,$A9,$E8,$A9,$0F,$AA
    .byte $1B,$AA,$24,$AA,$5A,$AA,$68,$AA,$70,$AA,$A5,$AA,$B2,$AA,$BD,$AA
    .byte $D5,$AA,$04,$AB,$0E,$AB,$25,$AB,$3E,$AB,$4B,$AB,$66,$AB,$66,$AB
    .byte $95,$AB,$A0,$AB,$A0,$AB,$AC,$AB,$B8,$AB,$F0,$AB,$0B,$AC,$2D,$AC
    .byte $38,$AC,$4A,$AC,$5A,$AC,$6A,$AC,$7D,$AC,$A8,$AC,$BB,$AC,$C5,$AC
    .byte $E0,$AC,$02,$AD,$F2,$F0,$01,$52,$ED,$FC,$01,$1C,$2F,$14,$AF,$0B
    .byte $2A,$10,$79,$FC,$F0,$01,$52,$EE,$FC,$01,$1C,$2F,$14,$AF,$0B,$2A
    .byte $10,$79,$FC,$F0,$01,$71,$E4,$FC,$01,$1C,$2F,$14,$AF,$0B,$2A,$10
    .byte $79,$FC,$01,$EE,$FC,$01,$F5,$2D,$00,$14,$2F,$10,$79,$FC,$F0,$01
    .byte $52,$E4,$10,$11,$19,$FC,$01,$E0,$79,$FC,$F0,$01,$51,$EE,$FC,$01
    .byte $F5,$2D,$00,$14,$2F,$10,$79,$FC,$F0,$01,$52,$ED,$A0,$FC,$01,$21
    .byte $06,$2F,$13,$02,$2F,$10,$79,$FC,$F0,$01,$40,$AA,$A0,$00,$14,$AE
    .byte $06,$15,$02,$FC,$F0,$01,$11,$EE,$16,$00,$01,$10,$2F,$13,$FC,$08
    .byte $02,$07,$05,$02,$1A,$00,$26,$2C,$1F,$2F,$10,$79,$FC,$F0,$01,$01
    .byte $EE,$16,$00,$01,$10,$2F,$13,$FC,$F0,$01,$20,$E4,$FC,$01,$10,$06
    .byte $02,$F5,$16,$FC,$01,$03,$A4,$07,$2D,$00,$01,$2C,$0E,$29,$79,$FC
    .byte $F0,$01,$51,$ED,$FC,$08,$F5,$2D,$00,$14,$2F,$10,$79,$FC,$F0,$01
    .byte $21,$ED,$FC,$01,$EC,$FC,$08,$AA,$A0,$00,$14,$AE,$06,$15,$02,$79
    .byte $FC,$F0,$F5,$02,$F0,$01,$11,$ED,$FC,$01,$EC,$FC,$F0,$01,$52,$EE
    .byte $FC,$01,$46,$C3,$7D,$79,$FC,$F0,$01,$20,$E4,$FC,$01,$1B,$08,$02
    .byte $F5,$16,$FC,$01,$03,$A4,$07,$2D,$00,$01,$2C,$0E,$29,$79,$FC,$F0
    .byte $01,$62,$EE,$FC,$01,$46,$C3,$7D,$79,$FC,$08,$AA,$A0,$00,$14,$AE
    .byte $06,$15,$02,$79,$FC,$F0,$01,$5C,$AD,$10,$2F,$79,$ED,$19,$FC,$01
    .byte $6B,$7D,$68,$6E,$B6,$4E,$7D,$C5,$79,$FC,$F0,$01,$C0,$26,$0C,$79
    .byte $FC,$F0,$04,$62,$0F,$19,$00,$0A,$B3,$2A,$BE,$5F,$2D,$FC,$04,$E4
    .byte $A0,$FC,$01,$5C,$76,$6B,$7D,$0C,$10,$79,$FC,$F0,$01,$11,$ED,$FC
    .byte $01,$CD,$6E,$51,$6E,$B6,$79,$FC,$F0,$01,$51,$EE,$FC,$01,$F5,$2D
    .byte $00,$46,$6F,$54,$79,$FC,$F0,$01,$22,$EE,$FC,$08,$F5,$2D,$FC,$01
    .byte $E3
    .byte $FC,$F0,$01,$62,$D1,$4D,$54,$16,$00,$01,$10,$2F,$13,$FC,$01,$F5
    .byte $1A,$FC,$01,$1A,$18,$06,$04,$2F,$10,$F7,$03,$79,$FC,$F0,$01,$52
    .byte $EE,$FC,$01,$F5,$2D,$00,$C5,$6B,$6F,$48,$79,$FC,$F0,$01,$12,$EE
    .byte $FC,$08,$F5,$2D,$00,$1A,$A6,$02,$10,$79,$FC,$F0,$01,$12,$EE,$FC
    .byte $01,$F5,$16,$00,$21,$06,$03,$79,$FC,$F0,$F2,$01,$5C,$AD,$10,$2F
    .byte $79,$ED,$19,$FC,$01,$1B,$A1,$00,$0B,$2E,$06,$08,$14,$B0,$79,$FC
    .byte $F0,$01,$61,$AA,$A0,$FC,$01,$E4,$19,$FC,$01,$02,$07,$05,$02,$23
    .byte $00,$26,$2C,$1F,$2F,$10,$79,$FC,$F0,$F2,$01,$6C,$AD,$10,$2F,$79
    .byte $ED,$19,$FC,$01,$1B,$A1,$00,$0B,$2E,$06,$08,$14,$B0,$79,$FC,$08
    .byte $AA,$A0,$00,$14,$AE,$06,$15,$02,$79,$FC,$F0,$01,$5C,$AD,$10,$2F
    .byte $79,$ED,$19,$FC,$01,$BE,$7D,$48,$00,$42,$68,$71,$7D,$BA,$72,$6E
    .byte $79,$79,$FC,$F0,$08,$42,$00,$00,$00,$79,$79,$FC,$F0,$01,$5C,$AD
    .byte $10,$2F,$79,$ED,$19,$FC,$01,$B1,$2E,$0C,$2E,$4E,$7D,$C4,$6E,$B6
    .byte $79,$FC,$F0,$F2,$F4,$07,$62,$96,$49,$96,$63,$96,$01,$E2,$4D,$69
    .byte $7D,$AD,$FC,$01,$ED,$FC,$01,$C3,$67,$6E,$4D,$2D,$00,$08,$A7,$0C
    .byte $13,$02,$29,$79,$FC,$F0,$01,$E2,$4D,$69,$7D,$AD,$FC,$01,$ED,$FC
    .byte $01,$10,$05,$2A,$13,$02,$29,$79,$FC,$F0,$01,$52,$E4,$FC,$01,$1C
    .byte $2F,$14,$AF,$0B,$2A,$10,$79,$FC,$F0,$01,$22,$E4,$FC,$08,$F5,$2D
    .byte $FC,$01,$E2,$FC,$F0,$01,$D0,$00,$00,$08,$2F,$79,$FC,$01,$B4,$6F
    .byte $52,$A0,$00,$10,$28,$15,$02,$79,$FC,$F0,$01,$61,$AA,$A0,$FC,$01
    .byte $E0
    .byte $19,$FC,$01,$02,$07,$05,$02,$23,$00,$26,$2C,$1F,$2F,$10,$79,$FC
    .byte $F0,$0A,$51,$F6,$D1,$4D,$54,$16,$00,$01,$10,$2F,$13,$FC,$01,$0A
    .byte $B3,$2A,$BE,$5F,$16,$00,$15,$2F,$10,$79,$FC,$F0,$01,$4C,$07,$1F
    .byte $2F,$10,$79,$00,$B8,$F7,$03,$69,$79,$79,$FC,$F0,$01,$42,$05,$05
    .byte $F7,$04,$2F,$14,$79,$79,$FC,$F0,$01,$42,$03,$2C,$F7,$04,$6F,$79
    .byte $79,$FC,$F0,$01,$42,$03,$05,$05,$F7,$04,$6F,$79,$79,$FC,$F0,$01
    .byte $42,$05,$05,$F7,$04,$6F,$79,$79,$FC,$F0,$01,$11,$ED,$16,$00,$01
    .byte $10,$2F,$13,$FC,$04,$02,$07,$05,$02,$1A,$00,$26,$2C,$1F,$2F,$10
    .byte $79,$FC,$F0,$01
    .byte $5C,$EE,$FC,$04,$F5,$2D,$00,$14,$2F,$10,$79,$FC,$F0,$01,$C0,$47
    .byte $44,$44,$44,$75,$75,$F7,$07,$6F,$79,$79,$FC,$F0,$01,$4C,$05,$05
    .byte $7C,$2F,$14,$00,$1A,$2E,$0F,$08,$AA,$7D,$79,$FC,$F0,$F4,$01,$65
    .byte $97,$7B,$97,$01,$51,$0F,$2A,$2D,$00,$E4,$A0,$FC,$01,$18,$A6,$0A
    .byte $20,$16,$00,$02,$2F,$10,$79,$FC,$F0,$01,$61,$05,$7C,$2F,$14,$79
    .byte $FC,$01,$0F,$2A,$2D,$00,$E4,$A0,$FC,$01,$18,$A6,$0A,$20,$16,$00
    .byte $07,$10,$79,$FC,$F0,$01,$52,$F6,$D1,$4D,$54,$16,$00,$01,$10,$2F
    .byte $13,$FC,$01,$F5,$A0,$00,$1A,$2A,$12,$0C,$10,$2F,$79,$FC,$2D,$52
    .byte $0D,$3F,$0D,$A4,$02,$FC,$08,$F5,$19,$00,$02,$28,$32,$08,$AA,$79
    .byte $FC,$F0,$01,$51,$ED,$FC,$01,$F6,$2D,$00,$1F,$23,$2F,$10,$79,$FC
    .byte $F0,$01,$42,$0A,$B3,$2A,$BE,$5F,$16,$00,$15,$2F,$10,$F7,$02,$79
    .byte $FC,$F0,$01,$52,$46,$C6,$16,$00,$01,$10,$2F,$13,$FC,$01,$02,$07
    .byte $05,$02,$1A,$00,$26,$2C,$1F,$2F,$10,$79,$FC,$F0,$01,$41,$46,$C6
    .byte $1A,$4C,$71,$7D,$54,$2D,$1C,$0E,$A3,$15,$02,$79,$FC,$F0,$F4,$01
    .byte $16,$98,$24,$98,$01,$12,$EE,$FC,$01,$21,$06,$2F,$13,$07,$10,$79
    .byte $FC,$F0,$01,$12,$EE,$FC,$01,$21,$06,$2F,$13,$02,$2F,$10,$79,$FC
    .byte $F0,$01,$12,$EE,$FC,$01,$46,$6F,$54,$16,$00,$21,$06,$03,$79,$FC
    .byte $F0,$01,$12,$EE,$FC,$01,$E3,$79,$FC,$F0,$01,$51,$ED,$FC,$01,$0E
    .byte $28,$01,$02,$16,$00,$02,$08,$79,$FC,$F0,$01,$51,$EE,$FC,$01,$0E
    .byte $28,$01,$02,$16,$00,$02,$08,$79,$FC,$F0,$01,$52,$EE,$23,$FC,$01
    .byte $0E
    .byte $28,$01,$03,$79,$79,$FC,$F0,$01,$6C,$05,$7C,$2F,$79,$FC,$01,$EE
    .byte $23,$FC,$01,$14,$2E,$AA,$F7,$02,$79,$FC,$F0,$01,$51,$EE,$23,$FC
    .byte $01,$BA,$70,$6E,$CF,$79,$FC,$F0,$01,$52,$EE,$FC,$04,$E3,$79,$FC
    .byte $F0,$01,$51,$EE,$FC,$01,$0E,$28,$01,$02,$16,$00,$02,$08,$79,$FC
    .byte $F0,$01,$51,$EE,$A0,$FC,$01,$21,$06,$2F,$10,$79,$FC,$F0,$01,$52
    .byte $EE,$23,$FC,$01,$21,$06,$2F,$10,$7D,$79,$FC,$F0,$01,$6C,$05,$7C
    .byte $2F,$14,$79,$FC,$01,$EE,$23,$FC,$01,$0E,$28,$01,$02,$16,$00,$02
    .byte $08,$79,$FC,$F0,$01,$51,$EE,$23,$FC,$01,$02,$2F,$10,$7C,$79,$FC
    .byte $F0,$01,$22,$E4,$FC,$08,$07,$2C,$AE,$02,$14,$0A,$2B,$AD,$FC,$01
    .byte $06,$2C,$0C,$10,$2F,$79,$FC,$F0,$01,$12,$E4,$FC,$08,$06,$2C,$0C
    .byte $10,$79,$FC,$F0,$F2,$01,$51,$E4,$FC,$04,$E2,$79,$FC,$F0,$01,$10
    .byte $E4,$FC,$01,$BA,$70,$6E,$CF,$79,$FC,$F0,$F2,$01,$5C,$E4,$19,$FC
    .byte $01,$E0,$79,$FC,$F0,$01,$E0,$03,$15,$2A,$79,$FC,$04,$0A,$2A,$A0
    .byte $79,$FC,$04,$E0,$AA,$7D,$7D,$79,$79,$FC,$F0,$01,$D0,$6C,$4C,$27
    .byte $19,$00,$11,$06,$27,$2D,$FC,$01,$20,$0E,$13,$24,$29,$F8,$FC,$F0
    .byte $01,$52,$E4,$FC,$01,$F5,$16,$00,$21,$06,$2F,$13,$02,$2F,$10,$79
    .byte $FC,$F0,$01,$52,$E4,$FC,$08,$E2,$FC,$F0,$01,$C0,$03,$2F,$79,$00
    .byte $0C,$2E,$A9,$03,$A0,$3F,$3F,$3F,$FC,$F0,$01,$41,$AA,$A0,$00,$0A
    .byte $B3,$2A,$BE,$5F,$16,$15,$2F,$10,$7C,$79,$FC,$F0,$01,$74,$E4,$19
    .byte $FC,$01,$E0,$A0,$FC,$01,$E5,$19,$F6,$16,$FC,$01,$12,$07,$0B,$0B
    .byte $2F,$10,$73,$F7,$02,$79,$FC,$F0,$01,$73,$E4,$19,$FC,$01,$E0,$79
    .byte $FC,$01,$E5,$19,$F6,$16,$FC,$01,$12,$07,$0B,$0B,$28,$1F,$0C,$10
    .byte $73,$F7,$03,$79,$FC,$F0,$01,$74,$01,$01,$2F,$79,$00,$E4,$19,$FC
    .byte $01,$E0,$16,$FC,$01,$E5,$F6,$1A,$FC,$01,$12,$07,$24,$B1,$27,$2A
    .byte $10,$73,$F7,$03,$79,$FC,$F0,$01,$73,$0D,$A4,$7C,$02,$79,$00,$E4
    .byte $19,$FC,$01,$E0,$79,$FC,$01,$E5,$19,$F6,$2D,$FC,$01,$12,$07,$24
    .byte $B1,$2F,$10,$73,$F7,$03,$79,$FC,$F0,$01,$79,$24,$2F,$10,$BC,$00
    .byte $E4,$79,$FC,$01,$E0,$AD,$FC,$01,$E5,$F6,$2D,$FC,$01,$12,$07,$24
    .byte $B1,$2F,$10,$73,$F7,$03,$79,$79,$FC,$F0,$01,$C0,$00,$00,$00,$A2
    .byte $2F,$79,$79,$FC,$F0,$01,$72,$EE,$FC,$01,$0A,$2E,$A6,$32,$03,$19
    .byte $FC,$01,$E1,$FC,$01,$0B,$08,$2A,$12,$AA,$7D,$79,$79,$FC,$F0,$01
    .byte $10,$E4,$FC,$08,$CD,$4D,$47,$70,$6F,$51,$79,$FC,$F0,$F2,$01,$10
    .byte $E4,$FC,$01,$CD,$4D,$2D,$00,$AA,$0C,$10,$79,$FC,$F0,$01,$22,$EB
    .byte $FC,$08,$6C,$6E,$3F,$52,$7D,$FC,$01,$00,$00,$68,$50,$7D,$6E,$79
    .byte $79,$FC,$F0,$F2,$01,$20,$4A,$42,$6E,$54,$4D,$16,$26,$28,$FC,$01
    .byte $0E,$2E,$0A,$03,$1A,$FC,$01,$E6,$AD,$0D,$FC,$F0,$01,$51,$F5,$1A
    .byte $00,$67,$42,$6E,$2D,$FC,$01,$0A,$04,$13,$0C,$1F,$2F,$10,$F7,$03
    .byte $79,$FC,$F0,$01,$51,$E6,$19,$FC,$01,$4A,$7D,$55,$7D,$47,$6F,$48
    .byte $AA,$F7,$03,$79,$FC,$F0,$01,$51,$E6,$19,$FC,$01,$F6,$47,$6F,$48
    .byte $AA,$F7,$03,$79,$FC,$F0,$01,$51,$E6,$19,$FC,$01,$4D,$6B,$7D,$42
    .byte $6E,$AA,$F7,$03,$79,$FC,$F0,$01,$10,$E4,$19,$FC,$01,$F6,$47,$6F
    .byte $48,$79,$FC,$F0,$01,$00,$AA,$A0,$00,$F5,$1A,$00,$14,$AE,$06,$15
    .byte $02,$79,$FC,$F0,$F2,$01,$10,$E6,$19,$FC,$01,$4D,$6B,$7D,$42,$6E
    .byte $79,$FC,$F0,$01,$62,$E4,$FC,$01,$BE,$42,$6A,$48,$54,$16,$FC,$01
    .byte $E2
    .byte $FC,$F0,$01,$20,$E4,$FC,$01,$4A,$7D,$55,$7D,$06,$27,$19,$FC,$01
    .byte $E2,$FC,$F0,$F2,$01,$20,$E6,$16,$FC,$01,$5C,$68,$7D,$47,$6F,$48
    .byte $A0,$FC,$01,$01,$10,$04,$27,$2A,$1F,$0D,$FC,$F0,$01,$20,$E6,$16
    .byte $FC,$01,$D0,$55,$69,$53,$74,$47,$6F,$48,$A0,$FC,$01,$01,$10,$04
    .byte $27,$2A,$1F,$0D,$FC,$F0,$01,$10,$47,$6F,$46,$7D,$1A,$FC,$01,$E4
    .byte $AA,$79,$FC,$F0,$01,$52,$E4,$19,$FC,$01,$E0,$79,$FC,$F0,$F4,$06
    .byte $9C,$9B,$9C,$9B,$AF,$9B,$AF,$9B,$F2,$01,$20,$E6,$19,$FC,$01,$F0
    .byte $AF,$2E,$13,$1A,$FC,$01,$E4,$AD,$0D,$FC,$F0,$F2,$01,$20,$E6,$19
    .byte $FC,$01,$E4,$19,$00,$8D,$8B,$AD,$0D,$FC,$01,$FC,$F0,$01,$C0,$03
    .byte $76,$76,$F7,$06,$6F,$79,$79,$FC,$F0,$01,$C0,$AA,$F7,$08,$6F,$79
    .byte $79,$FC,$F0,$01,$C0,$5C,$73,$42,$64,$F7,$06,$79,$79,$FC,$F0,$F2
    .byte $F4,$01,$EA,$9B,$F4,$9B,$F4,$02,$FE,$9B,$09,$9C,$1C,$9C,$08,$9C
    .byte $F4
    .byte $02,$37,$9C,$46,$9C,$59,$9C,$08,$9C,$01,$52,$E8,$A0,$FC,$01,$07
    .byte $10,$79,$FC,$F0,$01,$62,$E8,$FC,$01,$E9,$16,$FC,$01,$14,$28,$06
    .byte $0A,$1F,$2A,$10,$79,$FC,$F0,$01,$72,$E8,$FC,$01,$E9,$FC,$01,$EA
    .byte $10,$11,$FC,$01,$E7,$16,$2E,$16,$00,$06,$0A,$1F,$2A,$10,$7D,$79
    .byte $FC,$F0,$01,$52,$E4,$16,$FC,$01,$E8,$A0,$00,$12,$02,$10,$79,$FC
    .byte $F0,$01,$62,$E4,$16,$FC,$01,$E8,$14,$FC,$01,$E9,$A0,$00,$12,$02
    .byte $10,$79,$FC,$F0,$01,$62,$E4,$2D,$FC,$01,$E8,$10,$11,$FC,$01,$E7
    .byte $16,$2E,$A0,$00,$06,$0A,$2E,$AA,$7D,$79,$FC,$F0,$01,$62,$0C,$06
    .byte $0C,$FC,$01,$E4,$A0,$FC,$08,$46,$6F,$54,$79,$FC,$F0,$F2,$01,$51
    .byte $E4,$16,$FC,$01,$ED,$A0,$00,$21,$06,$03,$79,$FC,$F0,$F2,$01,$52
    .byte $05,$F7,$02,$6F,$14,$FC,$01,$0A,$0A,$AD,$00,$5E,$42,$6F,$4D,$69
    .byte $AA,$7D,$79,$FC,$F0,$F4,$05,$CC,$9C,$E6,$9C,$00,$9D,$1F,$9D,$A1
    .byte $9D,$C8,$9D,$EE,$9D,$20,$9E,$51,$9E,$50,$9D,$33,$9D,$80,$9D,$88
    .byte $9E,$B6,$9E,$D1,$9E,$FD,$9E,$01,$13,$F1,$19,$00,$68,$7D,$C2,$AD
    .byte $FC,$01,$0A,$03,$1A,$2E,$0E,$2E,$2D,$00,$21,$06,$04,$1F,$0D,$FC
    .byte $F0,$01,$14,$F2,$19,$00,$68,$7D,$C2,$AD,$FC,$01,$0A,$03,$1A,$2E
    .byte $0E,$2E,$2D,$00,$21,$06,$04,$1F,$0D,$FC,$F0,$01,$10,$0C,$01,$02
    .byte $1A,$00,$AE,$03,$13,$2E,$19,$1F,$1F,$FC,$01,$0A,$03,$1A,$2E,$0E
    .byte $2E,$2D,$00,$21,$06,$04,$1F,$0D,$FC,$F0,$01,$65,$F1,$FC,$01,$F2
    .byte $2D,$FC,$01,$08,$AA,$0C,$1F,$0C,$10,$F7,$03,$79,$FC,$F0,$01,$66
    .byte $F1,$24,$B1,$2A,$29,$F7,$02,$79,$FC,$01,$F2,$00,$F1,$2D,$FC,$01
    .byte $08,$AA,$0C,$1F,$0C,$10,$F7,$03,$79,$FC,$F0,$01,$75,$1F,$0B,$16
    .byte $00,$1A,$08,$18,$12,$19,$FC,$01,$22,$02,$0C,$32,$03,$B1,$79,$FC
    .byte $04,$F1,$00,$A3,$07,$14,$03,$19,$0D,$04,$FC,$01,$06,$11,$14,$2F
    .byte $10,$00,$0C,$32,$03,$28,$AD,$0D,$79,$FC,$F0,$01,$66,$F1,$00,$A5
    .byte $2E,$18,$2E,$79,$FC,$01,$8D,$8B,$A0,$2F,$0E,$2E,$AD,$FC,$01,$24
    .byte $B1,$2A,$13,$0C,$1F,$2F,$10,$F7,$03,$79,$FC,$F0,$01,$75,$F1,$00
    .byte $24,$2F,$10,$A9,$79,$FC,$01,$F2,$2D,$00,$08,$AA,$0C,$FC,$01,$09
    .byte $2F,$0C,$32,$03,$0E,$2E,$FC,$01,$0C,$2E,$0C,$31,$12,$AA,$F7,$03
    .byte $79,$FC,$F0,$01,$75,$F1,$00,$0C,$32,$03,$28,$79,$FC,$04,$07,$32
    .byte $03,$A4,$03,$FC,$01,$F2,$2D,$00,$08,$AA,$0C,$FC,$01,$F1,$00,$25
    .byte $03,$0C,$32,$03,$AA,$7C,$79,$FC,$F0,$01,$71,$F1,$00,$25,$03,$0C
    .byte $32,$03,$79,$FC,$04,$06,$12,$13,$19,$00,$15,$06,$1F,$14,$FC,$01
    .byte $A3,$07,$0E,$2E,$19,$0D,$04,$00,$12,$AF,$0B,$08,$2E,$FC,$01,$F2
    .byte $2D,$00,$24,$B1,$28,$1F,$0C,$10,$79,$FC,$F0,$01,$79,$13,$2E,$0B
    .byte $02,$00,$C1,$74,$41,$4D,$08,$2E,$FC,$04,$24,$B1,$2A,$29,$79,$79
    .byte $FC,$01,$16,$1E,$2E,$00,$A6,$31,$2E,$09,$2F,$0C,$32,$03,$16,$FC
    .byte $01,$4A,$5F,$2D,$00,$0D,$0D,$22,$10,$79,$FC,$F0,$01,$79,$16,$1E
    .byte $2E,$79,$00,$B7,$69,$5F,$6E,$A2,$2E,$AA,$2E,$FC,$01,$16,$0C,$C2
    .byte $42,$52,$2D,$00,$24,$B1,$2F,$10,$7D,$79,$FC,$04,$12,$02,$16,$00
    .byte $09,$2F,$0C,$32,$03,$0E,$2E,$FC,$01,$0C,$2E,$0C,$31,$12,$AA,$7D
    .byte $79,$FC,$F0,$01,$61,$28,$32,$03,$A2,$2E,$00,$AE,$03,$13,$2E,$19
    .byte $1F,$1F,$FC,$01,$0C,$32,$03,$B1,$1A,$00,$04,$2E,$11,$32,$03,$0E
    .byte $2E,$16,$FC,$01,$23,$11,$0A,$0B,$2A,$1F,$0C,$10,$F7,$02,$79,$FC
    .byte $F0,$01,$61,$F1,$00,$F2,$FC,$01,$14,$23,$16,$00,$25,$A7,$27,$A7
    .byte $FC,$01,$1B,$07,$2C,$09,$AA,$F7,$03,$79,$FC,$F0,$01,$71,$28,$32
    .byte $03,$A2,$2E,$FC,$01,$26,$08,$00,$10,$10,$06,$02,$1F,$0C,$10,$A0
    .byte $FC,$01,$0C,$32,$03,$B1,$1A,$00,$8D,$8B,$0E,$2E,$16,$FC,$01,$25
    .byte $AA,$18,$27,$2A,$1F,$0D,$FC,$F0,$01,$71,$12,$02,$16,$00,$09,$2F
    .byte $11,$30,$08,$12,$06,$A7,$79,$FC,$08,$F1,$00,$F2,$00,$14,$23,$16
    .byte $FC,$01,$01,$0D,$19,$00,$0B,$02,$0C,$01,$02,$16,$FC,$01,$19,$A9
    .byte $21,$0A,$14,$16,$00,$15,$28,$1F,$0C,$10,$FC,$F0,$01,$51,$E4,$19
    .byte $FC,$04,$D0,$55,$69,$53,$74,$47,$6F,$48,$79,$FC,$F0,$F4,$04,$52
    .byte $9F,$E1,$9F,$8B,$A0,$2A,$A1,$25,$A2,$92,$A2,$02,$A3,$F5,$02,$E8
    .byte $08,$3F,$3F,$3F,$3F,$FC,$E8,$1B,$03,$7D,$2E,$00,$10,$02,$08,$12
    .byte $AA,$7D,$FC,$01,$1A,$24,$08,$00,$81,$C7,$50,$6E,$05,$0C,$13,$26
    .byte $79,$FC,$E0,$11,$0F,$03,$06,$00,$1F,$10,$6C,$50,$4C,$16,$FC,$01
    .byte $18,$21,$2A,$2F,$7D,$00,$6C,$49,$24,$18,$79,$FC,$E0,$04,$1C,$2E
    .byte $00,$18,$13,$24,$2E,$15,$02,$63,$6E,$79,$FC,$B0,$10,$03,$2F,$79
    .byte $FC,$10,$18,$3F,$18,$21,$08,$15,$2F,$13,$07,$10,$FC,$A0,$07,$24
    .byte $2F,$C8,$00,$18,$26,$03,$3F,$3F,$3F,$FC,$40,$87,$A2,$7C,$00,$A2
    .byte $F7,$02,$FC,$08,$00,$0D,$24,$00,$0D,$24,$FC,$80,$87,$00,$A2,$F7
    .byte $02,$FC,$08,$0D,$24,$27,$F7,$03,$FC,$F3,$BF,$9F,$F5,$02,$E8,$1C
    .byte $0B,$01,$00,$0A,$19,$0B,$07,$AE,$2E,$15,$00,$0C,$01,$02,$FC,$04
    .byte $13,$2E,$06,$02,$16,$00,$15,$29,$19,$06,$78
