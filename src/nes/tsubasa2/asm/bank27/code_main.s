; ============================================================
; code_main.s - bank27 main routines
; ============================================================

    .byte $B6,$A0,$CC,$A0,$E2,$A0,$FF,$9D,$B2,$95,$7E,$C4,$E4,$DF,$E9,$DE
    .byte $E1,$FF,$EA,$E5,$E7,$DB,$CF,$84,$D3,$7D,$D1,$A5,$FF,$91,$A5,$95
    .byte $7E,$B4,$E1,$D4,$D2,$BB,$CD,$FF,$E0,$D9,$DB,$D0,$C5,$90,$A0,$7D
    .byte $BC,$9A,$FF,$92,$A5,$95,$7E,$AB,$E1,$C8,$CF,$AF,$C1,$FF,$E0,$CD
    .byte $D0,$D1,$D2,$91,$B7,$7D,$BC,$9A,$FF,$91,$9A,$95,$7E,$BF,$D6,$CF
    .byte $D1,$B8,$DA,$FF,$E2,$DB,$C6,$D3,$E0,$90,$A2,$7D,$B7,$9B,$FF,$9D
    .byte $A6,$95,$7E,$DC,$DA,$C7,$EA,$DD,$EF,$FF,$EE,$E9,$D4,$E0,$EC,$90
    .byte $D2,$7D,$D0,$99,$FF,$91,$9A,$95,$7E,$B7,$D6,$AE,$BC,$B9,$CD,$FF
    .byte $E2,$D9,$BB,$B8,$BD,$9C,$C1,$7D,$B6,$A7,$FF,$A9,$A5,$A1,$7E,$CF
    .byte $D4,$D1,$E9,$DE,$D9,$FF,$DF,$E6,$E8,$EA,$DD,$C0,$DB,$89,$D2,$C8
    .byte $FF,$9D,$B2,$A2,$7D,$D2,$E2,$D4,$EA,$DD,$CF,$FF,$ED,$DC,$EB,$E9
    .byte $E0,$C3,$DE,$8A,$D1,$CB,$FF,$7E,$87,$DC,$DE,$CF,$B1,$C6,$E9,$D1
    .byte $AA,$FF,$DF,$E6,$E8,$EA,$DD,$C0,$DB,$89,$D2,$C8,$FF,$7D,$A2,$DF
    .byte $DD,$C5,$B1,$D4,$EA,$D2,$AA,$FF,$ED,$DC,$EB,$E9,$E0,$C3,$DE,$8A
    .byte $D1,$CB,$FF,$19,$22,$34,$37,$4A,$6B,$51,$71,$5A,$60,$FF,$9A,$91
    .byte $96,$A0,$74,$55,$6F,$4D,$7E,$5D,$CD,$AA,$AD,$B1,$D6,$D1,$E4,$EF
    .byte $E4,$EF,$FF,$48
    JSR $C50C                  ; $8104
    LDX #$00                   ; $8107
    STX $003D                  ; $8109
    LDA $062A                  ; $810B
    AND #$7F                   ; $810E
    TAY                        ; $8110
    PLA                        ; $8111
    PHA                        ; $8112
    CMP #$0B                   ; $8113
    PHP                        ; $8115
    BCC $8122                  ; $8116
    SBC #$0B                   ; $8118
    PHA                        ; $811A
    LDA $A1DC,Y                ; $811B
    TAY                        ; $811E
    INX                        ; $811F
    INX                        ; $8120
    PLA                        ; $8121
    PHA                        ; $8122
    TYA                        ; $8123
    ASL                        ; $8124
    ASL                        ; $8125
    STA $003C                  ; $8126
    ASL                        ; $8128
    ASL                        ; $8129
    ADC $003C                  ; $812A
    STA $003C                  ; $812C
    ROL $003D                  ; $812E
    PLA                        ; $8130
    SEC                        ; $8131
    SBC #$01                   ; $8132
    LSR a: $00E2               ; $8134
    ROL                        ; $8137
    STA $003E                  ; $8138
    PLP                        ; $813A
    PHP                        ; $813B
    LDA $05FB                  ; $813C
    BEQ $8147                  ; $813F
    PHP                        ; $8141
    PLA                        ; $8142
    EOR #$01                   ; $8143
    PHA                        ; $8145
    PLP                        ; $8146
    BCS $815C                  ; $8147
    LDA #$25                   ; $8149
    STA $003F                  ; $814B
    LDA a: $002C,X             ; $814D
    ASL                        ; $8150
    TAX                        ; $8151
    LDA $A6AE,X                ; $8152
    TAY                        ; $8155
    LDA $A6AD,X                ; $8156
    JMP $A179                  ; $8159
    LDA #$26                   ; $815C
    STA $003F                  ; $815E
    LDA a: $002C,X             ; $8160
    ASL                        ; $8163
    STA $003A                  ; $8164
    ASL                        ; $8166
    ADC $003A                  ; $8167
    STA $003A                  ; $8169
    LDA a: $002D,X             ; $816B
    ASL                        ; $816E
    ADC $003A                  ; $816F
    TAX                        ; $8171
    LDA $AB66,X                ; $8172
    TAY                        ; $8175
    LDA $AB65,X                ; $8176
    .byte $18
    ADC $003C                  ; $817A
    STA $003A                  ; $817C
    TYA                        ; $817E
    ADC $003D                  ; $817F
    STA $003B                  ; $8181
    LDY $003E                  ; $8183
    LDA ($003A),Y              ; $8185
    PLP                        ; $8187
    BCC $819E                  ; $8188
    CMP #$F0                   ; $818A
    BEQ $819E                  ; $818C
    JSR $C536                  ; $818E
    TXA                        ; $8191
    EOR #$FF                   ; $8192
    TAX                        ; $8194
    TYA                        ; $8195
    EOR #$FF                   ; $8196
    TAY                        ; $8198
    INX                        ; $8199
    INY                        ; $819A
    JSR $C539                  ; $819B
    LDY #$09                   ; $819E
    STA ($0034),Y              ; $81A0
    PLA                        ; $81A2
    PHA                        ; $81A3
    LDX $003F                  ; $81A4
    JSR $C527                  ; $81A6
    PLA                        ; $81A9
    LDX $0032                  ; $81AA
    CPX a: $00E2               ; $81AC
    BCS $81B2                  ; $81AF
    RTS                        ; $81B1
    LDX $003F                  ; $81B2
    CPX #$25                   ; $81B4
    BEQ $81BC                  ; $81B6
    LDA #$F0                   ; $81B8
    BNE $81D7                  ; $81BA
    CMP #$0B                   ; $81BC
    BCC $81C2                  ; $81BE
    SBC #$0B                   ; $81C0
    CMP #$05                   ; $81C2
    BCS $81DB                  ; $81C4
    LDX #$C8                   ; $81C6
    LDA $05FB                  ; $81C8
    BEQ $81CF                  ; $81CB
    LDX #$38                   ; $81CD
    LDY #$08                   ; $81CF
    LDA ($0034),Y              ; $81D1
    TAY                        ; $81D3
    JSR $C539                  ; $81D4
    LDY #$09                   ; $81D7
    STA ($0034),Y              ; $81D9
    RTS                        ; $81DB
    .byte $0E,$0D,$0C,$0B,$0A,$09,$08,$07,$06,$05,$04,$03,$02,$01,$00,$AD
    .byte $F4,$05
    BNE $81F1                  ; $81EE
    RTS                        ; $81F0
    BPL $820C                  ; $81F1
    LDA #$01                   ; $81F3
    STA $05F4                  ; $81F5
    LDA $05F3                  ; $81F8
    ASL                        ; $81FB
    TAX                        ; $81FC
    LDA $A292,X                ; $81FD
    STA $0063                  ; $8200
    LDA $A293,X                ; $8202
    STA $0064                  ; $8205
    LDA #$00                   ; $8207
    STA $05F5                  ; $8209
    LDA $05F5                  ; $820C
    BEQ $8215                  ; $820F
    DEC $05F5                  ; $8211
    RTS                        ; $8214
    LDA #$01                   ; $8215
    JSR $C515                  ; $8217
    LDA $0515                  ; $821A
    BNE $8215                  ; $821D
    LDA #$01                   ; $821F
    STA $0515                  ; $8221
    .byte $A0,$00
    LDA ($0063),Y              ; $8226
    CMP #$FF                   ; $8228
    BNE $8242                  ; $822A
    INY                        ; $822C
    LDA ($0063),Y              ; $822D
    TAX                        ; $822F
    INY                        ; $8230
    LDA ($0063),Y              ; $8231
    STA $0064                  ; $8233
    STX $0063                  ; $8235
    LDA $05E3                  ; $8237
    BNE $8224                  ; $823A
    STA $05F4                  ; $823C
    JMP $A224                  ; $823F
    STA $05F5                  ; $8242
    INY                        ; $8245
    LDA ($0063),Y              ; $8246
    ASL                        ; $8248
    TAX                        ; $8249
    LDA $A42A,X                ; $824A
    STA $003A                  ; $824D
    LDA $A42B,X                ; $824F
    STA $003B                  ; $8252
    LDY #$00                   ; $8254
    LDX #$00                   ; $8256
    LDA ($003A),Y              ; $8258
    BEQ $827E                  ; $825A
    STA $04A5,X                ; $825C
    STA $003C                  ; $825F
    INY                        ; $8261
    LDA ($003A),Y              ; $8262
    STA $04A6,X                ; $8264
    INY                        ; $8267
    LDA ($003A),Y              ; $8268
    STA $04A7,X                ; $826A
    INY                        ; $826D
    INX                        ; $826E
    INX                        ; $826F
    INX                        ; $8270
    LDA ($003A),Y              ; $8271
    STA $04A5,X                ; $8273
    INX                        ; $8276
    INY                        ; $8277
    DEC $003C                  ; $8278
    BNE $8271                  ; $827A
    BEQ $8258                  ; $827C
    STA $04A5,X                ; $827E
    LDA #$80                   ; $8281
    STA $0515                  ; $8283
    LDA $0063                  ; $8286
    CLC                        ; $8288
    ADC #$02                   ; $8289
    STA $0063                  ; $828B
    BCC $8291                  ; $828D
    INC $0064                  ; $828F
    RTS                        ; $8291
