; ============================================================
; code_main.s - bank24 main routines
; ============================================================

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
