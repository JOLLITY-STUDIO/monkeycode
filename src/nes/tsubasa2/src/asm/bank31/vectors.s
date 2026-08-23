.org $FFF0
    LDA #$00                   ; $FFF0
    STA $8000                  ; $FFF2
    JMP $C503                  ; $FFF5
    .byte $00,$00
    .byte $00,$C5,$F0,$FF,$06,$C5
