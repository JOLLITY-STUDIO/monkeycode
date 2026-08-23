; ============================================================
; code_main.s - bank20 main routines
; ============================================================

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
