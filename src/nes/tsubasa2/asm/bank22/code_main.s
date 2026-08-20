; ============================================================
; code_main.s - bank22 main routines
; ============================================================

    .byte $4C,$03,$80,$A0,$00
    STY $003F                  ; $8005
    STY $0041                  ; $8007
    LDA ($003C),Y              ; $8009
    LSR                        ; $800B
    ROL $003F                  ; $800C
    LSR                        ; $800E
    ROL $0041                  ; $800F
    LDA ($003C),Y              ; $8011
    AND #$60                   ; $8013
    ASL                        ; $8015
    EOR $0517                  ; $8016
    STA $0049                  ; $8019
    LDY #$08                   ; $801B
    LDA ($003C),Y              ; $801D
    SEC                        ; $801F
    SBC #$80                   ; $8020
    TAX                        ; $8022
    LDA $003F                  ; $8023
    SBC #$00                   ; $8025
    TAY                        ; $8027
    LDA #$00                   ; $8028
    STA $003F                  ; $802A
    LDA $0538                  ; $802C
    EOR #$FF                   ; $802F
    CLC                        ; $8031
    ADC #$01                   ; $8032
    BPL $8038                  ; $8034
    DEC $003F                  ; $8036
    STA $003E                  ; $8038
    TXA                        ; $803A
    CLC                        ; $803B
    ADC $003E                  ; $803C
    TAX                        ; $803E
    TYA                        ; $803F
    ADC $003F                  ; $8040
    TAY                        ; $8042
    BIT $0517                  ; $8043
    BVC $8055                  ; $8046
    TXA                        ; $8048
    EOR #$FF                   ; $8049
    TAX                        ; $804B
    TYA                        ; $804C
    EOR #$FF                   ; $804D
    TAY                        ; $804F
    INX                        ; $8050
    BNE $8054                  ; $8051
    INY                        ; $8053
    INY                        ; $8054
    BIT $0049                  ; $8055
    BVC $8062                  ; $8057
    SEC                        ; $8059
    TXA                        ; $805A
    SBC #$08                   ; $805B
    TAX                        ; $805D
    TYA                        ; $805E
    SBC #$00                   ; $805F
    TAY                        ; $8061
    STX $003E                  ; $8062
    STY $003F                  ; $8064
    LDY #$0C                   ; $8066
    LDA ($003C),Y              ; $8068
    SEC                        ; $806A
    BIT $0049                  ; $806B
    BPL $8072                  ; $806D
    SBC #$88                   ; $806F
    BIT $80E9                  ; $8071
    STA $0040                  ; $8074
    LDA $0041                  ; $8076
    SBC #$00                   ; $8078
    STA $0041                  ; $807A
    LDA #$80                   ; $807C
    STA $0042                  ; $807E
    LDA #$82                   ; $8080
    STA $0043                  ; $8082
    LDY #$12                   ; $8084
    LDA ($003C),Y              ; $8086
    ASL                        ; $8088
    BCC $808D                  ; $8089
    INC $0043                  ; $808B
    TAY                        ; $808D
    LDA ($0042),Y              ; $808E
    TAX                        ; $8090
    INY                        ; $8091
    LDA ($0042),Y              ; $8092
    STA $0043                  ; $8094
    STX $0042                  ; $8096
    JSR $8187                  ; $8098
    LDY #$00                   ; $809B
    STY $0044                  ; $809D
    .byte $A4,$44
    LDA ($0042),Y              ; $80A1
    AND #$07                   ; $80A3
    BNE $80AD                  ; $80A5
    JSR $80C0                  ; $80A7
    JMP $809F                  ; $80AA
    JSR $80B3                  ; $80AD
    JMP $809F                  ; $80B0
    INC $0044                  ; $80B3
    JSR $C509                  ; $80B5
    .byte $00,$00,$61,$81,$64,$81,$75,$81
    LDY $0044                  ; $80C0
    LDA ($0042),Y              ; $80C2
    AND #$38                   ; $80C4
    LSR                        ; $80C6
    LSR                        ; $80C7
    LSR                        ; $80C8
    STA $0045                  ; $80C9
    INY                        ; $80CB
    LDA ($0042),Y              ; $80CC
    TAX                        ; $80CE
    LDA $81D2,X                ; $80CF
    LDX #$00                   ; $80D2
    BIT $0049                  ; $80D4
    BPL $80DD                  ; $80D6
    EOR #$FF                   ; $80D8
    CLC                        ; $80DA
    ADC #$01                   ; $80DB
    PHA                        ; $80DD
    PLA                        ; $80DE
    BPL $80E2                  ; $80DF
    DEX                        ; $80E1
    CLC                        ; $80E2
    ADC $0040                  ; $80E3
    STA $0046                  ; $80E5
    TXA                        ; $80E7
    ADC $0041                  ; $80E8
    BNE $80FD                  ; $80EA
    LDA $0046                  ; $80EC
    CMP $0540                  ; $80EE
    BCC $80FD                  ; $80F1
    CMP $0541                  ; $80F3
    BEQ $8109                  ; $80F6
    BCS $80FD                  ; $80F8
    JMP $8109                  ; $80FA
    INY                        ; $80FD
    LDA #$F8                   ; $80FE
    INY                        ; $8100
    INY                        ; $8101
    DEC $0045                  ; $8102
    BPL $8100                  ; $8104
    STY $0044                  ; $8106
    RTS                        ; $8108
    .byte $C8
    LDA ($0042),Y              ; $810A
    LSR                        ; $810C
    LSR                        ; $810D
    TAX                        ; $810E
    LDA $81FA,X                ; $810F
    LDX #$00                   ; $8112
    BIT $0049                  ; $8114
    BVC $811D                  ; $8116
    EOR #$FF                   ; $8118
    CLC                        ; $811A
    ADC #$01                   ; $811B
    PHA                        ; $811D
    PLA                        ; $811E
    BPL $8122                  ; $811F
    DEX                        ; $8121
    CLC                        ; $8122
    ADC $003E                  ; $8123
    STA $0047                  ; $8125
    TXA                        ; $8127
    ADC $003F                  ; $8128
    BEQ $8136                  ; $812A
    LDX $003B                  ; $812C
    LDA #$F8                   ; $812E
    STA $0200,X                ; $8130
    INY                        ; $8133
    BNE $8159                  ; $8134
    LDX $003B                  ; $8136
    LDA $0046                  ; $8138
    STA $0200,X                ; $813A
    LDA $0047                  ; $813D
    STA $0203,X                ; $813F
    LDA ($0042),Y              ; $8142
    AND #$03                   ; $8144
    ORA $0049                  ; $8146
    STA $0202,X                ; $8148
    INY                        ; $814B
    LDA ($0042),Y              ; $814C
    STA $0201,X                ; $814E
    INX                        ; $8151
    INX                        ; $8152
    INX                        ; $8153
    INX                        ; $8154
    STX $003B                  ; $8155
    INC $0048                  ; $8157
    INY                        ; $8159
    DEC $0045                  ; $815A
    BPL $810A                  ; $815C
    STY $0044                  ; $815E
    RTS                        ; $8160
    .byte $68
    PLA                        ; $8162
    RTS                        ; $8163
    .byte $A4,$44
    LDA ($0042),Y              ; $8166
    TAX                        ; $8168
    INY                        ; $8169
    LDA ($0042),Y              ; $816A
    STA $0043                  ; $816C
    STX $0042                  ; $816E
    LDA #$00                   ; $8170
    STA $0044                  ; $8172
    RTS                        ; $8174
    .byte $AD,$46,$05
    CMP #$0C                   ; $8178
    BCC $817E                  ; $817A
    SBC #$0C                   ; $817C
    ASL                        ; $817E
    CLC                        ; $817F
    ADC $0044                  ; $8180
    STA $0044                  ; $8182
    JMP $8164                  ; $8184
    LDY #$00                   ; $8187
    LDA ($003C),Y              ; $8189
    EOR $0517                  ; $818B
    AND #$40                   ; $818E
    PHP                        ; $8190
    LDY #$13                   ; $8191
    LDA ($003C),Y              ; $8193
    BEQ $81B1                  ; $8195
    LDX #$00                   ; $8197
    PLP                        ; $8199
    PHP                        ; $819A
    BEQ $81A2                  ; $819B
    EOR #$FF                   ; $819D
    CLC                        ; $819F
    ADC #$01                   ; $81A0
    PHA                        ; $81A2
    PLA                        ; $81A3
    BPL $81A7                  ; $81A4
    DEX                        ; $81A6
    CLC                        ; $81A7
    ADC $003E                  ; $81A8
    STA $003E                  ; $81AA
    TXA                        ; $81AC
    ADC $003F                  ; $81AD
    STA $003F                  ; $81AF
    INY                        ; $81B1
    LDA ($003C),Y              ; $81B2
    BEQ $81D0                  ; $81B4
    LDX #$00                   ; $81B6
    PLP                        ; $81B8
    PHP                        ; $81B9
    BPL $81C1                  ; $81BA
    .byte $49,$FF,$18,$69,$01
    PHA                        ; $81C1
    PLA                        ; $81C2
    BPL $81C6                  ; $81C3
    DEX                        ; $81C5
    CLC                        ; $81C6
    ADC $0040                  ; $81C7
    STA $0040                  ; $81C9
    TXA                        ; $81CB
    ADC $0041                  ; $81CC
    STA $0041                  ; $81CE
    PLP                        ; $81D0
    RTS                        ; $81D1
