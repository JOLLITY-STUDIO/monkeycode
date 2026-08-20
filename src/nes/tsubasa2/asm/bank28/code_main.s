; ============================================================
; code_main.s - bank28 main routines
; ============================================================

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
