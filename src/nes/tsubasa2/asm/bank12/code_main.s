; ============================================================
; code_main.s - bank12 main routines
; ============================================================

    .byte $A2,$05
    LDY $0700,X                ; $8002
    CPY #$32                   ; $8005
    BCS $8017                  ; $8007
    LDY #$07                   ; $8009
    STY $8000                  ; $800B
    LDY $07FC                  ; $800E
    STY $8001                  ; $8011
    JMP $805E                  ; $8014
    CPY #$44                   ; $8017
    BCS $802B                  ; $8019
    LDY #$07                   ; $801B
    STY $8000                  ; $801D
    LDY #$0D                   ; $8020
    STY $8001                  ; $8022
    STY $07FC                  ; $8025
    JMP $805E                  ; $8028
    CPY #$51                   ; $802B
    BCS $803F                  ; $802D
    LDY #$07                   ; $802F
    STY $8000                  ; $8031
    LDY #$0E                   ; $8034
    STY $8001                  ; $8036
    STY $07FC                  ; $8039
    JMP $805E                  ; $803C
    CPY #$5C                   ; $803F
    BCS $8053                  ; $8041
    LDY #$07                   ; $8043
    STY $8000                  ; $8045
    LDY #$0F                   ; $8048
    STY $8001                  ; $804A
    STY $07FC                  ; $804D
    JMP $805E                  ; $8050
    LDY #$07                   ; $8053
    STY $8000                  ; $8055
    LDY $07FC                  ; $8058
    STY $8001                  ; $805B
    .byte $CA
    BPL $8002                  ; $805F
    LDX #$05                   ; $8061
    LDY $0700,X                ; $8063
    BEQ $80B7                  ; $8066
    CPY #$72                   ; $8068
    BCS $80B7                  ; $806A
    CPY #$31                   ; $806C
    BNE $80AF                  ; $806E
    LDA #$19                   ; $8070
    STA $07DF                  ; $8072
    STA $07CF                  ; $8075
    STA $07D1                  ; $8078
    STA $07D2                  ; $807B
    STA $07D3                  ; $807E
    STA $07D5                  ; $8081
    STA $07D6                  ; $8084
    STA $07D7                  ; $8087
    STA $07D9                  ; $808A
    STA $07DA                  ; $808D
    STA $07DB                  ; $8090
    STA $07DD                  ; $8093
    STA $07DE                  ; $8096
    LDA #$0A                   ; $8099
    STA $07D0                  ; $809B
    STA $07D4                  ; $809E
    STA $07D8                  ; $80A1
    STA $07DC                  ; $80A4
    LDA #$00                   ; $80A7
    STA $0700,X                ; $80A9
    JMP $80B7                  ; $80AC
    JSR $8349                  ; $80AF
    LDA #$00                   ; $80B2
    STA $0700,X                ; $80B4
    .byte $CA
    BPL $8063                  ; $80B8
    LDA #$27                   ; $80BA
    STA $00F0                  ; $80BC
    LDA #$07                   ; $80BE
    STA $00F1                  ; $80C0
    LDA #$00                   ; $80C2
    STA $00F2                  ; $80C4
    LDY #$08                   ; $80C6
    STY $00F3                  ; $80C8
    LDA $0706                  ; $80CA
    LSR                        ; $80CD
    BCC $80D2                  ; $80CE
    ORA #$80                   ; $80D0
    STA $0706                  ; $80D2
    BCC $810C                  ; $80D5
    LDX $00F2                  ; $80D7
    DEC $0707,X                ; $80D9
    BNE $80E1                  ; $80DC
    JSR $83CB                  ; $80DE
    LDX $00F2                  ; $80E1
    DEC $0709,X                ; $80E3
    BNE $8109                  ; $80E6
    LDY #$02                   ; $80E8
    LDA ($00F0),Y              ; $80EA
    STA $00F6                  ; $80EC
    INY                        ; $80EE
    LDA ($00F0),Y              ; $80EF
    STA $00F7                  ; $80F1
    INY                        ; $80F3
    LDA ($00F0),Y              ; $80F4
    PHA                        ; $80F6
    CLC                        ; $80F7
    ADC #$02                   ; $80F8
    STA ($00F0),Y              ; $80FA
    PLA                        ; $80FC
    TAY                        ; $80FD
    LDA ($00F6),Y              ; $80FE
    STA $0709,X                ; $8100
    INY                        ; $8103
    LDA ($00F6),Y              ; $8104
    STA $070A,X                ; $8106
    JSR $81DB                  ; $8109
    CLC                        ; $810C
    LDA #$10                   ; $810D
    ADC $00F0                  ; $810F
    STA $00F0                  ; $8111
    LDA #$04                   ; $8113
    ADC $00F2                  ; $8115
    STA $00F2                  ; $8117
    DEC $00F3                  ; $8119
    BNE $80CA                  ; $811B
    LDA #$27                   ; $811D
    STA $00F0                  ; $811F
    STA $00FC                  ; $8121
    LDA #$07                   ; $8123
    STA $00F1                  ; $8125
    STA $00FD                  ; $8127
    LDA #$03                   ; $8129
    STA $00F2                  ; $812B
    LDA #$11                   ; $812D
    STA $00F3                  ; $812F
    LDA $0706                  ; $8131
    AND $00F3                  ; $8134
    BEQ $814C                  ; $8136
    AND #$0F                   ; $8138
    BNE $8149                  ; $813A
    CLC                        ; $813C
    LDA #$40                   ; $813D
    ADC $00F0                  ; $813F
    STA $00F0                  ; $8141
    LDA #$00                   ; $8143
    ADC $00F1                  ; $8145
    STA $00F1                  ; $8147
    JSR $816E                  ; $8149
    CLC                        ; $814C
    LDA #$10                   ; $814D
    ADC $00FC                  ; $814F
    STA $00FC                  ; $8151
    STA $00F0                  ; $8153
    LDA #$00                   ; $8155
    ADC $00FD                  ; $8157
    STA $00FD                  ; $8159
    STA $00F1                  ; $815B
    ASL $00F3                  ; $815D
    DEC $00F2                  ; $815F
    BPL $8131                  ; $8161
    LDA $07E9                  ; $8163
    BEQ $816D                  ; $8166
    .byte $A9,$00,$8D,$15,$40
    RTS                        ; $816D
    LDA #$03                   ; $816E
    EOR $00F2                  ; $8170
    ASL                        ; $8172
    ASL                        ; $8173
    TAX                        ; $8174
    LDY #$06                   ; $8175
    LDA ($00F0),Y              ; $8177
    PHA                        ; $8179
    LDA $00F2                  ; $817A
    STA $00FB                  ; $817C
    CMP #$01                   ; $817E
    BNE $8189                  ; $8180
    PLA                        ; $8182
    AND #$0F                   ; $8183
    ORA #$80                   ; $8185
    BNE $81A4                  ; $8187
    PLA                        ; $8189
    ORA #$30                   ; $818A
    STA $4000,X                ; $818C
    LDA #$10                   ; $818F
    LDY #$05                   ; $8191
    AND ($00F0),Y              ; $8193
    BNE $81A7                  ; $8195
    LDA #$08                   ; $8197
    LDY $00FB                  ; $8199
    STA $07E4,Y                ; $819B
    STA $4001,X                ; $819E
    JMP $81B1                  ; $81A1
    STA $4000,X                ; $81A4
    LDY #$08                   ; $81A7
    LDA ($00F0),Y              ; $81A9
    BPL $81DA                  ; $81AB
    AND #$7F                   ; $81AD
    STA ($00F0),Y              ; $81AF
    .byte $A0,$07
    LDA ($00F0),Y              ; $81B3
    STA $4002,X                ; $81B5
    INY                        ; $81B8
    LDA ($00F0),Y              ; $81B9
    ORA #$18                   ; $81BB
    LDY $00FB                  ; $81BD
    BEQ $81CA                  ; $81BF
    CPY #$01                   ; $81C1
    BEQ $81CA                  ; $81C3
    CMP $07E0,Y                ; $81C5
    BEQ $81DA                  ; $81C8
    STA $4003,X                ; $81CA
    STA $07E0,Y                ; $81CD
    LDA $07E4,Y                ; $81D0
    BNE $81DA                  ; $81D3
    LDA #$00                   ; $81D5
    STA $07E0,Y                ; $81D7
    RTS                        ; $81DA
    LDY #$05                   ; $81DB
    LDA ($00F0),Y              ; $81DD
    TAX                        ; $81DF
    AND #$F0                   ; $81E0
    STA $00F6                  ; $81E2
    AND #$20                   ; $81E4
    BEQ $81EE                  ; $81E6
    LDA #$0F                   ; $81E8
    STA $00F7                  ; $81EA
    BNE $8233                  ; $81EC
    TXA                        ; $81EE
    AND #$0F                   ; $81EF
    STA $00F7                  ; $81F1
    LDY $00F3                  ; $81F3
    DEY                        ; $81F5
    LDX $07CF,Y                ; $81F6
    BEQ $8233                  ; $81F9
    DEX                        ; $81FB
    TXA                        ; $81FC
    STA $07CF,Y                ; $81FD
    BNE $8233                  ; $8200
    LDA $00F7                  ; $8202
    CLC                        ; $8204
    ADC #$01                   ; $8205
    CMP #$0F                   ; $8207
    STA $00F7                  ; $8209
    BNE $8217                  ; $820B
    LDA #$00                   ; $820D
    STA $07D7,Y                ; $820F
    LDA #$80                   ; $8212
    STA $07E8                  ; $8214
    LDA $00F7                  ; $8217
    ORA $00F6                  ; $8219
    TAX                        ; $821B
    LDY #$05                   ; $821C
    STA ($00F0),Y              ; $821E
    TXA                        ; $8220
    AND #$0F                   ; $8221
    STA $00F7                  ; $8223
    LDY $00F3                  ; $8225
    DEY                        ; $8227
    LDX $07CF,Y                ; $8228
    BNE $8233                  ; $822B
    LDA $07D7,Y                ; $822D
    STA $07CF,Y                ; $8230
    LDX $00F2                  ; $8233
    LDA $070A,X                ; $8235
    SEC                        ; $8238
    SBC $00F7                  ; $8239
    BPL $823F                  ; $823B
    LDA #$00                   ; $823D
    ORA $00F6                  ; $823F
    LDY #$06                   ; $8241
    STA ($00F0),Y              ; $8243
    LDX $00F3                  ; $8245
    DEX                        ; $8247
    LDA $07AF,X                ; $8248
    CMP #$01                   ; $824B
    BEQ $8257                  ; $824D
    CMP #$02                   ; $824F
    BNE $8256                  ; $8251
