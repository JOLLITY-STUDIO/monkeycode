; ============================================================
; bank30/bank30.s
; bank 30 - 真实 6502 汇编 (8KB)
; CPU 地址范围: $C000-$DFFF
; 源: _tmp_bzk_out/bank_30/bank_30_partMM.asm
; 代码=助记符, 数据=.byte, build_nes.py 可直接编译
; ============================================================

.segment "PRG_BANK30"
.org $C000

    .byte $AA,$00,$29,$CB,$1B,$3C,$FE,$FF,$39,$1F,$FF,$83,$D8,$A1,$02,$3A
    .byte $00,$20,$0E,$E7,$01,$4B,$FC,$2E,$CA,$87,$03,$8F,$B6,$17,$1F,$BE
    .byte $E9,$1F,$BE,$6D,$FD,$F4,$F2,$BD,$9A,$C0,$D2,$03,$00,$2A,$00,$00
    .byte $80,$25,$88,$5A,$B5,$FD,$5C,$BB,$3F,$D5,$7F,$AF,$4F,$AB,$D3,$65
    .byte $27,$17,$F6,$52,$56,$A5,$56,$A4,$03,$55,$84,$08,$41,$A4,$20,$52
    .byte $55,$95,$5A,$B5,$BD,$5A,$DD,$D6,$EF,$B5,$5E,$5F,$7A,$5D,$5B,$4D
    .byte $A5,$97,$A4,$4A,$56,$A5,$48,$24,$15,$04,$11,$A0,$02,$4D,$A5,$AA
    .byte $72,$5D,$AB,$ED,$6D,$EF,$BE,$B5,$BE,$AD,$69,$37,$55,$56,$AD,$A4
    .byte $92,$56,$A5,$2A,$A5,$92,$14,$11,$22,$12,$12,$29,$55,$49,$AD,$AA
    .byte $6A,$5D,$EB,$ED,$DE,$BA,$BF,$DB,$F6,$6E,$55,$AD,$2A,$55,$52,$4A
    .byte $94,$88,$4A,$22,$49,$24,$49,$4A,$52,$99,$A4,$54,$55,$95,$D5,$5A
    .byte $6B,$D7,$DB,$7D,$EF,$BB,$ED,$AD,$55,$AB,$94,$52,$49,$49,$52,$A9
    .byte $95,$0D,$A8,$EA,$F1,$7B,$AE,$AF,$2A,$8C,$01,$15,$06,$30,$3D,$80
    .byte $F8,$FF,$FB,$FF,$2F,$0F,$B8,$F8,$C0,$F0,$A7,$02,$43,$10,$00,$40
    .byte $18,$D0,$FF,$CF,$F7,$FF,$FF,$FF,$4B,$C2,$00,$28,$1D,$0A,$00,$00
    .byte $00,$9C,$FF,$FF,$FB,$7F,$0F,$5F,$18,$E0,$D2,$92,$F7,$BB,$45,$12
    .byte $04,$00,$10,$4E,$50,$AC,$FF,$FF,$FF,$8F,$11,$27,$A9,$ED,$8B,$57
    .byte $0C,$98,$32,$40,$28,$64,$6A,$A9,$1F,$6F,$6E,$19,$65,$1C,$F3,$FF
    .byte $FF,$EF,$04,$08,$20,$42,$06,$00,$21,$72,$FF,$FF,$7F,$07,$8A,$30
    .byte $F0,$EF,$57,$DF,$AF,$19,$12,$C1,$10,$06,$42,$10,$71,$A5,$CF,$5E
    .byte $BB,$5F,$FF,$FE,$79,$A4,$81,$28,$82,$90,$20,$01,$97,$9F,$EB,$6D
    .byte $73,$AE,$DA,$6A,$85,$4A,$2B,$79,$DA,$9A,$85,$92,$46,$86,$38,$37
    .byte $3F,$37,$ED,$A0,$A8,$38,$6C,$72,$B9,$B5,$91,$C5,$4A,$B4,$AE,$E7
    .byte $6C,$67,$15,$83,$18,$11,$66,$F6,$B4,$53,$4E,$1C,$73,$EB,$CD,$A9
    .byte $2A,$52,$9C,$9D,$39,$ED,$68,$41,$12,$21,$71,$EE,$CD,$97,$B7,$5C
    .byte $32,$A5,$89,$54,$6D,$D5,$52,$53,$65,$96,$B5,$52,$4A,$46,$DD,$79
    .byte $5A,$54,$C3,$C4,$9A,$AA,$96,$55,$CF,$B6,$B9,$52,$A4,$4C,$31,$65
    .byte $6A,$B5,$53,$2D,$2B,$69,$48,$C9,$64,$73,$D7,$AE,$7B,$3C,$AA,$62
    .byte $A1,$4A,$2D,$99,$A8,$94,$54,$E9,$AA,$EB,$66,$AB,$35,$5A,$6B,$59
    .byte $15,$23,$E1,$58,$15,$57,$CE,$D8,$54,$4D,$A9,$66,$AB,$9E,$76,$AA
    .byte $44,$A5,$92,$9A,$55,$D6,$BC,$5C,$E3,$A4,$8A,$32,$B5,$72,$D3,$24
    .byte $25,$55,$AB,$55,$6B,$69,$95,$55,$9D,$5A,$6E,$69,$68,$28,$A5,$CA
    .byte $55,$53,$AB,$16,$55,$55,$95,$8E,$B5,$6A,$B5,$D6,$56,$4B,$26,$15
    .byte $A5,$54,$CA,$94,$6A,$B6,$AE,$B3,$2A,$55,$A5,$55,$B3,$AA,$A6,$AA
    .byte $54,$55,$95,$52,$59,$CE,$5A,$6A,$AA,$D4,$D4,$B2,$4A,$AB,$5C,$B5
    .byte $6A,$A5,$AA,$54,$95,$A6,$AA,$59,$59,$66,$59,$6A,$A9,$A4,$4A,$AD
    .byte $D5,$6A,$55,$D5,$AC,$6A,$59,$69,$6A,$69,$2A,$A5,$C8,$52,$4B,$CD
    .byte $AA,$56,$5B,$9B,$5A,$55,$2A,$D5,$E2,$54,$4D,$55,$35,$55,$55,$29
    .byte $A9,$4C,$CB,$6A,$D5,$AA,$B5,$66,$55,$55,$A5,$32,$53,$95,$4A,$55
    .byte $35,$55,$55,$55,$B5,$AA,$56,$55,$55,$53,$55,$4D,$95,$A9,$AA,$96
    .byte $55,$55,$35,$55,$A5,$4A,$55,$55,$AD,$AA,$55,$55,$55,$55,$A9,$AA
    .byte $AA,$66,$55,$55,$55,$55,$55,$55,$95,$A5,$AA,$54,$55,$D5,$AA,$AA
    .byte $6A,$55,$55,$55,$B3,$AC,$54,$55,$95,$A6,$6A,$95,$A9,$AA,$54,$55
    .byte $D5,$AA,$56,$CD,$52,$55,$55,$55,$55,$55,$A6,$AA,$AA,$AA,$AA,$55
    .byte $5F,$0C,$98,$FF,$07,$DC,$0F,$00,$F0,$FF,$03,$F8,$01,$FE,$07,$0F
    .byte $1E,$00,$FF,$FF,$01,$F0,$03,$FC,$01,$FE,$C0,$71,$FE,$1F,$18,$00
    .byte $FF,$01,$FE,$01,$FE,$07,$00,$FE,$01,$FE,$FF,$01,$F8,$07,$F0,$5F
    .byte $00,$FC,$7F,$00,$6D,$07,$C0,$FF,$3F,$00,$FE,$0F,$40,$C0,$FF,$03
    .byte $C0,$FF,$1F,$00,$FE,$E5,$50,$1F,$C0,$BF,$00,$FC,$27,$7F,$C0,$00
    .byte $F8,$FF,$7D,$00,$0E,$E0,$7F,$C0,$FF,$05,$00,$FF,$0F,$C0,$7F,$00
    .byte $E8,$FF,$03,$E8,$5C,$7D,$0D,$E0,$27,$01,$FF,$5F,$08,$40,$F1,$FF
    .byte $81,$DE,$1A,$00,$FF,$01,$F8,$FF,$41,$80,$DA,$FE,$01,$F0,$7F,$80
    .byte $2F,$C0,$FF,$07,$C0,$7F,$A0,$E0,$7F,$00,$FE,$03,$05,$6F,$F5,$0F
    .byte $C0,$2F,$7E,$08,$7D,$00,$FF,$07,$F0,$07,$F0,$9F,$40,$7F,$80,$5F
    .byte $FF,$01,$50,$F2,$57,$06,$C4,$7F,$E0,$07,$FC,$81,$6B,$2D,$F8,$2F
    .byte $24,$60,$FF,$00,$9F,$F4,$27,$80,$FF,$80,$EC,$9F,$40,$D5,$D4,$AF
    .byte $02,$F8,$BC,$5A,$A0,$5E,$D2,$17,$E8,$0F,$FC,$09,$F0,$97,$40,$3F
    .byte $A1,$3F,$44,$EA,$0F,$78,$D5,$A8,$E8,$0F,$F0,$4F,$34,$D0,$5F,$28
    .byte $5F,$52,$25,$8B,$4F,$0B,$D2,$FF,$00,$75,$6D,$45,$B2,$92,$DE,$49
    .byte $5D,$04,$BB,$2B,$C9,$0F,$29,$E9,$BD,$20,$AB,$D4,$57,$48,$F6,$89
    .byte $AA,$E8,$57,$52,$52,$AB,$55,$2B,$49,$BD,$54,$B2,$B5,$22,$6B,$47
    .byte $B4,$A6,$EC,$9A,$A0,$5B,$55,$95,$D4,$BA,$52,$6A,$AA,$4E,$6A,$17
    .byte $D2,$66,$55,$AA,$15,$EB,$4A,$5A,$A9,$55,$74,$4B,$74,$2B,$AA,$55
    .byte $13,$B9,$27,$A9,$AA,$4D,$D2,$2B,$69,$A5,$00,$00,$00,$00,$00,$00
    .byte $A8
    LDA #$08                   ; $C401
    STA $0020                  ; $C403
    STA $2000                  ; $C405
    LDA #$1E                   ; $C408
    STA $0021                  ; $C40A
    STA $2001                  ; $C40C
    LDA #$00                   ; $C40F
    STA $0022                  ; $C411
    LDX #$00                   ; $C413
    JSR $C4B2                  ; $C415
    LDX #$02                   ; $C418
    JSR $C4B9                  ; $C41A
    TYA                        ; $C41D
    JMP $A200                  ; $C41E
    .byte $24,$3B
    BMI $C472                  ; $C423
    SEC                        ; $C425
    ROR $003B                  ; $C426
    STA $003C                  ; $C428
    STX $003D                  ; $C42A
    STY $003E                  ; $C42C
    LDA $0022                  ; $C42E
    ORA #$07                   ; $C430
    STA $8000                  ; $C432
    LDA #$02                   ; $C435
    STA $8001                  ; $C437
    JSR $A000                  ; $C43A
    LDA $0022                  ; $C43D
    ORA #$06                   ; $C43F
    STA $8000                  ; $C441
    LDA #$0C                   ; $C444
    STA $8001                  ; $C446
    JSR $8000                  ; $C449
    LDA $0022                  ; $C44C
    ORA #$06                   ; $C44E
    STA $8000                  ; $C450
    LDA $0024                  ; $C453
    STA $8001                  ; $C455
    LDA $0022                  ; $C458
    ORA #$07                   ; $C45A
    STA $8000                  ; $C45C
    LDA $0025                  ; $C45F
    STA $8001                  ; $C461
    LDA $0023                  ; $C464
    STA $8000                  ; $C466
    LDY $003E                  ; $C469
    LDX $003D                  ; $C46B
    LDA $003C                  ; $C46D
    LSR $003B                  ; $C46F
    RTI                        ; $C471
    PHA                        ; $C472
    LDA $2002                  ; $C473
    PLA                        ; $C476
    RTI                        ; $C477
    .byte $24,$3B
    BMI $C4AE                  ; $C47A
    SEC                        ; $C47C
    ROR $003B                  ; $C47D
    STA $003C                  ; $C47F
    STX $003D                  ; $C481
    STY $003E                  ; $C483
    LDA $0022                  ; $C485
    ORA #$07                   ; $C487
    STA $8000                  ; $C489
    LDA #$02                   ; $C48C
    STA $8001                  ; $C48E
    JSR $A160                  ; $C491
    LDA $0022                  ; $C494
    ORA #$07                   ; $C496
    STA $8000                  ; $C498
    LDA $0025                  ; $C49B
    STA $8001                  ; $C49D
    LDA $0023                  ; $C4A0
    STA $8000                  ; $C4A2
    LDY $003E                  ; $C4A5
    LDX $003D                  ; $C4A7
    LDA $003C                  ; $C4A9
    LSR $003B                  ; $C4AB
    RTI                        ; $C4AD
    .byte $8D,$00,$E0,$40
    STX $0024                  ; $C4B2
    LDA #$06                   ; $C4B4
    JMP $C4BD                  ; $C4B6
    .byte $86,$25
    LDA #$07                   ; $C4BB
    .byte $05,$22
    STA $0023                  ; $C4BF
    STA $8000                  ; $C4C1
    STX $8001                  ; $C4C4
    RTS                        ; $C4C7
    CMP #$23                   ; $C4C8
    BCS $C4F3                  ; $C4CA
    TAY                        ; $C4CC
    BEQ $C4F3                  ; $C4CD
    STX $00ED                  ; $C4CF
    LDA $0024                  ; $C4D1
    STA $00EE                  ; $C4D3
    LDA $0025                  ; $C4D5
    STA $00EF                  ; $C4D7
    LDX #$00                   ; $C4D9
    JSR $C4B2                  ; $C4DB
    LDX #$01                   ; $C4DE
    JSR $C4B9                  ; $C4E0
    TYA                        ; $C4E3
    LDX $00ED                  ; $C4E4
    JSR $A00F                  ; $C4E6
    LDX $00EF                  ; $C4E9
    JSR $C4B9                  ; $C4EB
    LDX $00EE                  ; $C4EE
    JSR $C4B2                  ; $C4F0
    RTS                        ; $C4F3
    .byte $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
    JMP $C76E                  ; $C500
    .byte $4C,$4E,$C6
    JMP $C821                  ; $C506
    JMP $CB99                  ; $C509
    .byte $4C,$7C,$CD
    JMP $CAE7                  ; $C50F
    .byte $4C,$F7,$CA
    JMP $CB0F                  ; $C515
    .byte $4C,$0D,$CB
    JMP $CB02                  ; $C51B
    JMP $CD3C                  ; $C51E
    JMP $CD0D                  ; $C521
    JMP $CBC2                  ; $C524
    JMP $CE08                  ; $C527
    JMP $EF7F                  ; $C52A
    .byte $4C,$46,$CC
    JMP $CC02                  ; $C530
    JMP $CCD2                  ; $C533
    JMP $CDC9                  ; $C536
    JMP $CDE2                  ; $C539
    JMP $F30F                  ; $C53C
    .byte $4C,$2D,$CE
    JMP $CE4D                  ; $C542
    JMP $CE4A                  ; $C545
    JMP $CE99                  ; $C548
    JMP $CE6E                  ; $C54B
    JMP $CBB0                  ; $C54E
    JMP $CD77                  ; $C551
    JMP $CEFE                  ; $C554
    .byte $4C,$BE,$C6
    JMP $CF4F                  ; $C55A
    JMP $CBF1                  ; $C55D
    JMP $CF72                  ; $C560
    JMP $CF8F                  ; $C563
    JMP $F013                  ; $C566
    JMP $CB35                  ; $C569
    JMP $D022                  ; $C56C
    JMP $D093                  ; $C56F
    JMP $DB62                  ; $C572
    JMP $E233                  ; $C575
    JMP $D0D1                  ; $C578
    JMP $C6BE                  ; $C57B
    .byte $4C,$1F,$CF,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
    .byte $00,$00
    JMP $D565                  ; $C600
    .byte $4C,$93,$D1
    JMP $E074                  ; $C606
    JMP $E4D7                  ; $C609
    JMP $E73E                  ; $C60C
    .byte $4C,$DF,$E0,$4C,$52,$DE,$4C,$5E,$DE,$4C,$FD,$DC,$4C,$02,$DD
    JMP $E059                  ; $C61E
    .byte $4C,$D9,$DF
    JMP $DCDF                  ; $C624
    .byte $4C,$4C,$E5,$4C,$96,$E5,$4C,$88,$E6,$4C,$78,$E6,$4C,$FD,$DD,$4C
    .byte $AA,$DA,$4C,$45,$DE,$4C,$6C,$DE
    JMP $D8F7                  ; $C63F
    JMP $D852                  ; $C642
    JMP $E6EC                  ; $C645
    JMP $D7E8                  ; $C648
    .byte $4C,$A2,$EF,$A9,$08
    STA $2000                  ; $C650
    SEI                        ; $C653
    CLD                        ; $C654
    LDX #$FF                   ; $C655
    TXS                        ; $C657
    LDA $2002                  ; $C658
    BPL $C658                  ; $C65B
    LDA $2002                  ; $C65D
    BPL $C65D                  ; $C660
    LDA #$C0                   ; $C662
    STA $A001                  ; $C664
    LDA #$00                   ; $C667
    STA $0000                  ; $C669
    STA $0001                  ; $C66B
    TAY                        ; $C66D
    LDX #$08                   ; $C66E
    STA ($0000),Y              ; $C670
    INY                        ; $C672
    BNE $C670                  ; $C673
    INC $0001                  ; $C675
    DEX                        ; $C677
    BNE $C670                  ; $C678
    LDA #$08                   ; $C67A
    STA $0020                  ; $C67C
    LDA #$06                   ; $C67E
    STA $0021                  ; $C680
    STA $2001                  ; $C682
    LDA #$00                   ; $C685
    STA $4010                  ; $C687
    LDA #$40                   ; $C68A
    STA $4017                  ; $C68C
    LDA $2002                  ; $C68F
    LDA #$10                   ; $C692
    TAX                        ; $C694
    STA $2006                  ; $C695
    STA $2006                  ; $C698
    EOR #$00                   ; $C69B
    DEX                        ; $C69D
    BNE $C695                  ; $C69E
    LDA #$00                   ; $C6A0
    STA a: $0022               ; $C6A2
    JSR $CB35                  ; $C6A5
    JSR $CB8B                  ; $C6A8
    LDA #$00                   ; $C6AB
    STA $0469                  ; $C6AD
    LDA #$00                   ; $C6B0
    STA $0469                  ; $C6B2
    STA $E000                  ; $C6B5
    CLI                        ; $C6B8
    LDA #$00                   ; $C6B9
    JMP $CEFE                  ; $C6BB
    .byte $A2,$E0
    TXS                        ; $C6C0
    LDA #$00                   ; $C6C1
    STA $0001                  ; $C6C3
    STA $0002                  ; $C6C5
    LDA #$00                   ; $C6C7
    STA $0005                  ; $C6C9
    STA $0006                  ; $C6CB
    LDA #$00                   ; $C6CD
    STA $0009                  ; $C6CF
    STA $000A                  ; $C6D1
    LDA #$00                   ; $C6D3
    STA $000D                  ; $C6D5
    STA $000E                  ; $C6D7
    LDA #$00                   ; $C6D9
    STA $0011                  ; $C6DB
    STA $0012                  ; $C6DD
    LDA #$00                   ; $C6DF
    STA $0015                  ; $C6E1
    STA $0016                  ; $C6E3
    JSR $CF1F                  ; $C6E5
    LDA #$00                   ; $C6E8
    STA $001B                  ; $C6EA
    STA $063F                  ; $C6EC
    LDA #$08                   ; $C6EF
    STA $0020                  ; $C6F1
    LDA #$1E                   ; $C6F3
    STA $0021                  ; $C6F5
    LDA #$20                   ; $C6F7
    STA $046C                  ; $C6F9
    LDA #$00                   ; $C6FC
    STA $046D                  ; $C6FE
    LDA #$3F                   ; $C701
    STA $046E                  ; $C703
    LDX #$00                   ; $C706
    LDA #$12                   ; $C708
    JSR $CC02                  ; $C70A
    LDX #$10                   ; $C70D
    LDA #$12                   ; $C70F
    JSR $CC02                  ; $C711
    JSR $CCD2                  ; $C714
    .byte $00,$6C,$04
    LDX #$07                   ; $C71A
    LDA $C766,X                ; $C71C
    STA $05EB,X                ; $C71F
    DEX                        ; $C722
    BPL $C71C                  ; $C723
    LDX #$01                   ; $C725
    LDA #$28                   ; $C727
    STA $0001,X                ; $C729
    LDA #$00                   ; $C72B
    STA $0002,X                ; $C72D
    LDA #$CA                   ; $C72F
    LDY #$21                   ; $C731
    JSR $CAE7                  ; $C733
    LDX #$05                   ; $C736
    LDA #$50                   ; $C738
    STA $0001,X                ; $C73A
    LDA #$00                   ; $C73C
    STA $0002,X                ; $C73E
    LDA #$D1                   ; $C740
    LDY #$1D                   ; $C742
    JSR $CAE7                  ; $C744
    LDX #$09                   ; $C747
    LDA #$78                   ; $C749
    STA $0001,X                ; $C74B
    LDA #$00                   ; $C74D
    STA $0002,X                ; $C74F
    LDA #$EB                   ; $C751
    LDY #$85                   ; $C753
    JSR $CAE7                  ; $C755
    LDA $0020                  ; $C758
    ORA #$80                   ; $C75A
    STA $0020                  ; $C75C
    STA $0019                  ; $C75E
    STA $2000                  ; $C760
    JMP $CA97                  ; $C763
    .byte $13,$07,$19,$00,$00,$AF,$2E,$FD,$24,$1B
    BVC $C775                  ; $C770
    JMP $C421                  ; $C772
    PHA                        ; $C775
    TXA                        ; $C776
    PHA                        ; $C777
    TYA                        ; $C778
    PHA                        ; $C779
    LDA $0020                  ; $C77A
    AND #$7F                   ; $C77C
    STA $2000                  ; $C77E
    STA $0020                  ; $C781
    TSX                        ; $C783
    TXA                        ; $C784
    LDX #$FF                   ; $C785
    TXS                        ; $C787
    PHA                        ; $C788
    LDA #$00                   ; $C789
    STA $2003                  ; $C78B
    LDA #$02                   ; $C78E
    STA $4014                  ; $C790
    LDA $046B                  ; $C793
    STA $A000                  ; $C796
    JSR $C8FB                  ; $C799
    BIT $2002                  ; $C79C
    LDA #$3F                   ; $C79F
    STA $2006                  ; $C7A1
    LDA #$00                   ; $C7A4
    STA $2006                  ; $C7A6
    STA $2006                  ; $C7A9
    STA $2006                  ; $C7AC
    LDA $0020                  ; $C7AF
    STA $2000                  ; $C7B1
    BIT $2002                  ; $C7B4
    LDA $004A                  ; $C7B7
    CLC                        ; $C7B9
    ADC $0538                  ; $C7BA
    STA $2005                  ; $C7BD
    LDA $004B                  ; $C7C0
    STA $2005                  ; $C7C2
    LDA $0021                  ; $C7C5
    STA $2001                  ; $C7C7
    JSR $C9E9                  ; $C7CA
    LDX $008E                  ; $C7CD
    STX $008C                  ; $C7CF
    STX $008D                  ; $C7D1
    LDA $C8F7,X                ; $C7D3
    AND #$7F                   ; $C7D6
    STA $C000                  ; $C7D8
    STA $C001                  ; $C7DB
    LDX $0469                  ; $C7DE
    STA $E000,X                ; $C7E1
    JSR $C9C5                  ; $C7E4
    JSR $C982                  ; $C7E7
    LDA $001B                  ; $C7EA
    ORA #$80                   ; $C7EC
    STA $001B                  ; $C7EE
    LDA $0022                  ; $C7F0
    ORA #$07                   ; $C7F2
    STA $8000                  ; $C7F4
    LDA $0025                  ; $C7F7
    STA $8001                  ; $C7F9
    LDA $0022                  ; $C7FC
    ORA #$06                   ; $C7FE
    STA $8000                  ; $C800
    LDA $0024                  ; $C803
    STA $8001                  ; $C805
    PLA                        ; $C808
    TAX                        ; $C809
    TXS                        ; $C80A
    LDA $0023                  ; $C80B
    STA $8000                  ; $C80D
    LDA $0020                  ; $C810
    ORA #$80                   ; $C812
    STA $0020                  ; $C814
    STA $0019                  ; $C816
    STA $2000                  ; $C818
    PLA                        ; $C81B
    TAY                        ; $C81C
    PLA                        ; $C81D
    TAX                        ; $C81E
    PLA                        ; $C81F
    RTI                        ; $C820
    .byte $24,$1B
    BVC $C828                  ; $C823
    JMP $C478                  ; $C825
    LSR $E000                  ; $C828
    LSR $E001                  ; $C82B
    LSR $0019                  ; $C82E
    STA $0080                  ; $C830
    STX $0081                  ; $C832
    STY $0082                  ; $C834
    TSX                        ; $C836
    TXA                        ; $C837
    LDX #$FF                   ; $C838
    TXS                        ; $C83A
    PHA                        ; $C83B
    JSR $C852                  ; $C83C
    PLA                        ; $C83F
    TAX                        ; $C840
    TXS                        ; $C841
    LDY $0082                  ; $C842
    LDX $0081                  ; $C844
    LDA a: $0023               ; $C846
    STA $8000                  ; $C849
    LDA $0080                  ; $C84C
    SEC                        ; $C84E
    ROR $0019                  ; $C84F
    RTI                        ; $C851
    LDX $008D                  ; $C852
    LDA $C8F7,X                ; $C854
    BMI $C876                  ; $C857
    LDY #$02                   ; $C859
    DEY                        ; $C85B
    BNE $C85B                  ; $C85C
    INX                        ; $C85E
    STX $008D                  ; $C85F
    LDA $C8F7,X                ; $C861
    AND #$7F                   ; $C864
    STA $C000                  ; $C866
    STA $C001                  ; $C869
    BIT $2002                  ; $C86C
    LDA $0643                  ; $C86F
    STA $2005                  ; $C872
    RTS                        ; $C875
    LDX #$07                   ; $C876
    DEX                        ; $C878
    BNE $C878                  ; $C879
    LDA $2002                  ; $C87B
    LDA #$22                   ; $C87E
    STA $2006                  ; $C880
    LDA #$00                   ; $C883
    STA $2006                  ; $C885
    LDA $0020                  ; $C888
    AND #$FE                   ; $C88A
    STA $2000                  ; $C88C
    BIT $2002                  ; $C88F
    LDA #$00                   ; $C892
    STA $2005                  ; $C894
    STA $2005                  ; $C897
    LDA a: $0022               ; $C89A
    STA $8000                  ; $C89D
    LDA #$00                   ; $C8A0
    STA $8001                  ; $C8A2
    LDA a: $0022               ; $C8A5
    ORA #$01                   ; $C8A8
    STA $8000                  ; $C8AA
    LDA $0087                  ; $C8AD
    STA $8001                  ; $C8AF
    LDA a: $0022               ; $C8B2
    ORA #$02                   ; $C8B5
    STA $8000                  ; $C8B7
    LDA #$1F                   ; $C8BA
    STA $8001                  ; $C8BC
    LDA a: $0022               ; $C8BF
    ORA #$03                   ; $C8C2
    STA $8000                  ; $C8C4
    LDA #$2E                   ; $C8C7
    STA $8001                  ; $C8C9
    LSR $E000                  ; $C8CC
    LDA $0022                  ; $C8CF
    ORA #$06                   ; $C8D1
    STA $8000                  ; $C8D3
    LDA #$0C                   ; $C8D6
    STA $8001                  ; $C8D8
    JSR $8000                  ; $C8DB
    LDA $0022                  ; $C8DE
    ORA #$07                   ; $C8E0
    STA $8000                  ; $C8E2
    LDA $0025                  ; $C8E5
    STA $8001                  ; $C8E7
    LDA $0022                  ; $C8EA
    ORA #$06                   ; $C8EC
    STA $8000                  ; $C8EE
    LDA $0024                  ; $C8F1
    STA $8001                  ; $C8F3
    RTS                        ; $C8F6
    .byte $FB,$80,$1E,$DC
    LDA $0498                  ; $C8FB
    BEQ $C951                  ; $C8FE
    DEC $0498                  ; $C900
    SEC                        ; $C903
    SBC #$01                   ; $C904
    ASL                        ; $C906
    ADC $0498                  ; $C907
    TAX                        ; $C90A
    LDA $0499,X                ; $C90B
    TAY                        ; $C90E
    LDA $049A,X                ; $C90F
    STA $0077                  ; $C912
    LDA $049B,X                ; $C914
    STA $0078                  ; $C917
    BPL $C92C                  ; $C919
    LDX #$06                   ; $C91B
    AND #$20                   ; $C91D
    BEQ $C922                  ; $C91F
    INX                        ; $C921
    TXA                        ; $C922
    ORA a: $0022               ; $C923
    STA $8000                  ; $C926
    STY $8001                  ; $C929
    LDY #$00                   ; $C92C
    LDA ($0077),Y              ; $C92E
    BEQ $C950                  ; $C930
    TAX                        ; $C932
    INY                        ; $C933
    LDA ($0077),Y              ; $C934
    PHA                        ; $C936
    INY                        ; $C937
    LDA ($0077),Y              ; $C938
    BIT $2002                  ; $C93A
    STA $2006                  ; $C93D
    PLA                        ; $C940
    STA $2006                  ; $C941
    INY                        ; $C944
    LDA ($0077),Y              ; $C945
    STA $2007                  ; $C947
    INY                        ; $C94A
    DEX                        ; $C94B
    BNE $C945                  ; $C94C
    BEQ $C92E                  ; $C94E
    RTS                        ; $C950
    LDA $0515                  ; $C951
    BPL $C981                  ; $C954
    LDX #$00                   ; $C956
    STX $0515                  ; $C958
    LDA $04A5,X                ; $C95B
    BEQ $C981                  ; $C95E
    TAY                        ; $C960
    INX                        ; $C961
    LDA $04A5,X                ; $C962
    PHA                        ; $C965
    INX                        ; $C966
    LDA $04A5,X                ; $C967
    BIT $2002                  ; $C96A
    STA $2006                  ; $C96D
    PLA                        ; $C970
    STA $2006                  ; $C971
    INX                        ; $C974
    LDA $04A5,X                ; $C975
    STA $2007                  ; $C978
    INX                        ; $C97B
    DEY                        ; $C97C
    BNE $C975                  ; $C97D
    BEQ $C95B                  ; $C97F
    RTS                        ; $C981
    LDX #$00                   ; $C982
    LDA a: $001C               ; $C984
    JSR $C98B                  ; $C987
    RTS                        ; $C98A
    STA $0084                  ; $C98B
    LDY #$01                   ; $C98D
    STY $4016                  ; $C98F
    DEY                        ; $C992
    STY $4016                  ; $C993
    LDA #$04                   ; $C996
    STA $0085                  ; $C998
    LDY #$08                   ; $C99A
    LDA $4016,X                ; $C99C
    LSR                        ; $C99F
    ROL $0083                  ; $C9A0
    AND #$01                   ; $C9A2
    ORA $0083                  ; $C9A4
    STA $0083                  ; $C9A6
    DEY                        ; $C9A8
    BNE $C99C                  ; $C9A9
    CMP $0084                  ; $C9AB
    BEQ $C9B5                  ; $C9AD
    DEC $0085                  ; $C9AF
    BNE $C98B                  ; $C9B1
    .byte $F0,$0F
    LDA a: $001C,X             ; $C9B5
    EOR $0083                  ; $C9B8
    AND $0083                  ; $C9BA
    STA a: $001E,X             ; $C9BC
    LDA $0083                  ; $C9BF
    STA a: $001C,X             ; $C9C1
    RTS                        ; $C9C4
    LDX a: $00E1               ; $C9C5
    LDA $0300,X                ; $C9C8
    ADC $0700,X                ; $C9CB
    ROL a: $00E2               ; $C9CE
    EOR #$FF                   ; $C9D1
    ROL a: $00E2               ; $C9D3
    ADC a: $00E2               ; $C9D6
    STA a: $00E2               ; $C9D9
    SBC $0780,X                ; $C9DC
    ADC a: $00E1               ; $C9DF
    STA a: $00E3               ; $C9E2
    INC a: $00E1               ; $C9E5
    RTS                        ; $C9E8
    LDX #$00                   ; $C9E9
    BIT $0022                  ; $C9EB
    BPL $C9F1                  ; $C9ED
    .byte $A2,$04
    LDA $0022                  ; $C9F1
    STA $8000                  ; $C9F3
    LDA $0490,X                ; $C9F6
    STA $8001                  ; $C9F9
    LDA $0022                  ; $C9FC
    ORA #$01                   ; $C9FE
    STA $8000                  ; $CA00
    LDA $0491,X                ; $CA03
    STA $8001                  ; $CA06
    TXA                        ; $CA09
    EOR #$04                   ; $CA0A
    TAX                        ; $CA0C
    LDY #$02                   ; $CA0D
    TYA                        ; $CA0F
    ORA $0022                  ; $CA10
    STA $8000                  ; $CA12
    LDA $0490,X                ; $CA15
    STA $8001                  ; $CA18
    INX                        ; $CA1B
    INY                        ; $CA1C
    CPY #$06                   ; $CA1D
    BNE $CA0F                  ; $CA1F
    RTS                        ; $CA21
    LDA $0021                  ; $CA22
    ORA #$1E                   ; $CA24
    STA $0021                  ; $CA26
    LDA #$00                   ; $CA28
    STA $0490                  ; $CA2A
    LDA #$02                   ; $CA2D
    STA $0491                  ; $CA2F
    STA a: $0087               ; $CA32
    LDA #$00                   ; $CA35
    STA $008E                  ; $CA37
    LDA #$01                   ; $CA39
    STA $0469                  ; $CA3B
    LDA #$01                   ; $CA3E
    STA $0543                  ; $CA40
    LDA #$23                   ; $CA43
    STA $0544                  ; $CA45
    LDA #$45                   ; $CA48
    STA $0545                  ; $CA4A
    .byte $A9,$01
    JSR $CB0F                  ; $CA4F
    JSR $EE9F                  ; $CA52
    JSR $E3CA                  ; $CA55
    JMP $CA4D                  ; $CA58
    .byte $A9,$00,$85,$05,$A9,$00,$85,$09,$A9,$00,$85,$0D,$A9,$00,$85,$15
    .byte $A9,$00,$85,$11,$A9,$01,$20,$0F,$CB,$A9,$10,$2D,$1E,$00,$F0,$F4
    .byte $A2,$05,$20,$02,$CB,$A2,$09,$20,$02,$CB,$A2,$0D,$20,$02,$CB,$A2
    .byte $15,$20,$02,$CB,$A2,$11,$20,$02,$CB,$4C,$4D,$CA,$A2,$01
    LDA $0000,X                ; $CA99
    BEQ $CAA5                  ; $CA9B
    CMP #$FF                   ; $CA9D
    BEQ $CAD4                  ; $CA9F
    DEC $0000,X                ; $CAA1
    BEQ $CAB9                  ; $CAA3
    .byte $8A
    CLC                        ; $CAA6
    ADC #$04                   ; $CAA7
    TAX                        ; $CAA9
    CPX #$19                   ; $CAAA
    BNE $CA99                  ; $CAAC
    LDA $001B                  ; $CAAE
    BPL $CAAE                  ; $CAB0
    AND #$7F                   ; $CAB2
    STA $001B                  ; $CAB4
    JMP $CA97                  ; $CAB6
    LSR $0019                  ; $CAB9
    STX $0000                  ; $CABB
    LDA $0002,X                ; $CABD
    STA $0024                  ; $CABF
    LDA $0003,X                ; $CAC1
    STA $0025                  ; $CAC3
    JSR $CE2D                  ; $CAC5
    LDA $0001,X                ; $CAC8
    TAX                        ; $CACA
    TXS                        ; $CACB
    SEC                        ; $CACC
    ROR $0019                  ; $CACD
    PLA                        ; $CACF
    TAY                        ; $CAD0
    PLA                        ; $CAD1
    TAX                        ; $CAD2
    RTS                        ; $CAD3
    STX $0000                  ; $CAD4
    LDA $0002,X                ; $CAD6
    STA $0024                  ; $CAD8
    CLC                        ; $CADA
    ADC #$01                   ; $CADB
    STA $0025                  ; $CADD
    JSR $CE2D                  ; $CADF
    LDA $0001,X                ; $CAE2
    TAX                        ; $CAE4
    TXS                        ; $CAE5
    RTS                        ; $CAE6
    .byte $48
    TYA                        ; $CAE8
    LDY $0001,X                ; $CAE9
    STA $0101,Y                ; $CAEB
    PLA                        ; $CAEE
    STA $0102,Y                ; $CAEF
    LDA #$FF                   ; $CAF2
    STA $0000,X                ; $CAF4
    RTS                        ; $CAF6
    .byte $A9,$00
    LDX $0000                  ; $CAF9
    STA $0000,X                ; $CAFB
    STA $0001,X                ; $CAFD
    JMP $CAA5                  ; $CAFF
    .byte $B5,$01
    BEQ $CB0C                  ; $CB04
    LDA $0000,X                ; $CB06
    BNE $CB0C                  ; $CB08
    INC $0000,X                ; $CB0A
    RTS                        ; $CB0C
    .byte $A9,$00,$85,$7F
    TXA                        ; $CB11
    PHA                        ; $CB12
    TYA                        ; $CB13
    PHA                        ; $CB14
    LDX $0000                  ; $CB15
    LDA $0024                  ; $CB17
    STA $0002,X                ; $CB19
    LDA $0025                  ; $CB1B
    STA $0003,X                ; $CB1D
    LDA $007F                  ; $CB1F
    STA $0000,X                ; $CB21
    TXA                        ; $CB23
    TAY                        ; $CB24
    TSX                        ; $CB25
    STX $0001,Y                ; $CB26
    LDX $0000                  ; $CB28
    JMP $CAA5                  ; $CB2A
    .byte $20,$40,$18,$18,$18,$18,$18,$18
    LDA $0020                  ; $CB35
    AND #$7F                   ; $CB37
    STA $0020                  ; $CB39
    STA $2000                  ; $CB3B
    LDA #$06                   ; $CB3E
    STA $2001                  ; $CB40
    LDA #$20                   ; $CB43
    JSR $CB5C                  ; $CB45
    LDA #$24                   ; $CB48
    JSR $CB5C                  ; $CB4A
    LDA #$1E                   ; $CB4D
    STA $2001                  ; $CB4F
    LDA $0020                  ; $CB52
    ORA #$80                   ; $CB54
    STA $0020                  ; $CB56
    STA $2000                  ; $CB58
    RTS                        ; $CB5B
    BIT $2002                  ; $CB5C
    STA $2006                  ; $CB5F
    LDA #$00                   ; $CB62
    STA $2006                  ; $CB64
    LDA #$00                   ; $CB67
    LDX #$C0                   ; $CB69
    LDY #$04                   ; $CB6B
    STA $2007                  ; $CB6D
    DEX                        ; $CB70
    BNE $CB6D                  ; $CB71
    DEY                        ; $CB73
    BNE $CB6D                  ; $CB74
    TXA                        ; $CB76
    LDX #$40                   ; $CB77
    STA $2007                  ; $CB79
    DEX                        ; $CB7C
    BNE $CB79                  ; $CB7D
    BIT $2002                  ; $CB7F
    LDA #$00                   ; $CB82
    STA $2005                  ; $CB84
    STA $2005                  ; $CB87
    RTS                        ; $CB8A
    LDY #$00                   ; $CB8B
    LDA #$F8                   ; $CB8D
    STA $0200,Y                ; $CB8F
    INY                        ; $CB92
    INY                        ; $CB93
    INY                        ; $CB94
    INY                        ; $CB95
    BNE $CB8F                  ; $CB96
    RTS                        ; $CB98
    .byte $0A
    TAY                        ; $CB9A
    PLA                        ; $CB9B
    STA $0036                  ; $CB9C
    PLA                        ; $CB9E
    STA $0037                  ; $CB9F
    INY                        ; $CBA1
    LDA ($0036),Y              ; $CBA2
    PHA                        ; $CBA4
    INY                        ; $CBA5
    LDA ($0036),Y              ; $CBA6
    STA $0037                  ; $CBA8
    PLA                        ; $CBAA
    STA $0036                  ; $CBAB
    JMP ($0036)                ; $CBAD
    .byte $8D,$18,$05
    LDA #$80                   ; $CBB3
    STA $0516                  ; $CBB5
    LDA #$00                   ; $CBB8
    STA $0005                  ; $CBBA
    LDA #$00                   ; $CBBC
    JSR $CB0F                  ; $CBBE
    RTS                        ; $CBC1
    .byte $A0,$00
    CMP #$A0                   ; $CBC4
    BCC $CBF0                  ; $CBC6
    LDY #$94                   ; $CBC8
    CMP #$C8                   ; $CBCA
    BCC $CBDA                  ; $CBCC
    LDY #$95                   ; $CBCE
    SBC #$AE                   ; $CBD0
    CMP #$1F                   ; $CBD2
    BCC $CBF0                  ; $CBD4
    SBC #$05                   ; $CBD6
    BCS $CBED                  ; $CBD8
    CMP #$B4                   ; $CBDA
    PHP                        ; $CBDC
    BCC $CBE1                  ; $CBDD
    SBC #$14                   ; $CBDF
    SEC                        ; $CBE1
    SBC #$9A                   ; $CBE2
    CMP #$15                   ; $CBE4
    BCC $CBEA                  ; $CBE6
    ADC #$04                   ; $CBE8
    PLP                        ; $CBEA
    BCC $CBF0                  ; $CBEB
    CLC                        ; $CBED
    ADC #$40                   ; $CBEE
    RTS                        ; $CBF0
    .byte $A2,$00
    LDY $0700,X                ; $CBF3
    BEQ $CBFE                  ; $CBF6
    INX                        ; $CBF8
    CPX #$05                   ; $CBF9
    BNE $CBF3                  ; $CBFB
    .byte $60
    STA $0700,X                ; $CBFE
    RTS                        ; $CC01
    .byte $A0,$00
    STY $0066                  ; $CC04
    ASL                        ; $CC06
    ROL $0066                  ; $CC07
    ASL                        ; $CC09
    TAY                        ; $CC0A
    ROL $0066                  ; $CC0B
    ASL                        ; $CC0D
    ROL $0066                  ; $CC0E
    STA $0065                  ; $CC10
    TYA                        ; $CC12
    ADC $0065                  ; $CC13
    BCC $CC19                  ; $CC15
    INC $0066                  ; $CC17
    CLC                        ; $CC19
    ADC #$CC                   ; $CC1A
    STA $0065                  ; $CC1C
    LDA $0066                  ; $CC1E
    ADC #$FB                   ; $CC20
    STA $0066                  ; $CC22
    LDA #$10                   ; $CC24
    STA $046C                  ; $CC26
    LDY #$00                   ; $CC29
    TXA                        ; $CC2B
    AND #$03                   ; $CC2C
    BEQ $CC35                  ; $CC2E
    LDA ($0065),Y              ; $CC30
    INY                        ; $CC32
    BNE $CC37                  ; $CC33
    LDA #$0F                   ; $CC35
    STA $046F,X                ; $CC37
    INX                        ; $CC3A
    DEC $046C                  ; $CC3B
    BNE $CC2B                  ; $CC3E
    LDA #$20                   ; $CC40
    STA $046C                  ; $CC42
    RTS                        ; $CC45
    .byte $A9,$00
    STA $05F4                  ; $CC48
    LDA #$06                   ; $CC4B
    PHA                        ; $CC4D
    LDA #$01                   ; $CC4E
    JSR $CB0F                  ; $CC50
    LDA $0515                  ; $CC53
    BNE $CC4E                  ; $CC56
    LDA #$01                   ; $CC58
    STA $0515                  ; $CC5A
    LDY #$4F                   ; $CC5D
    LDX #$00                   ; $CC5F
    TXA                        ; $CC61
    STA $04A5,X                ; $CC62
    INX                        ; $CC65
    DEY                        ; $CC66
    BNE $CC62                  ; $CC67
    LDA #$18                   ; $CC69
    STA $04A5                  ; $CC6B
    STA $04C0                  ; $CC6E
    LDA #$20                   ; $CC71
    STA $04A6                  ; $CC73
    PLA                        ; $CC76
    PHA                        ; $CC77
    ORA #$08                   ; $CC78
    LSR                        ; $CC7A
    ROR $04A6                  ; $CC7B
    LSR                        ; $CC7E
    ROR $04A6                  ; $CC7F
    ORA #$20                   ; $CC82
    STA $04A7                  ; $CC84
    STA $04C2                  ; $CC87
    LDA $04A6                  ; $CC8A
    CLC                        ; $CC8D
    ADC #$20                   ; $CC8E
    STA $04C1                  ; $CC90
    LDA #$80                   ; $CC93
    STA $0515                  ; $CC95
    PLA                        ; $CC98
    SEC                        ; $CC99
    SBC #$01                   ; $CC9A
    BPL $CC4D                  ; $CC9C
    LDA #$01                   ; $CC9E
    JSR $CB0F                  ; $CCA0
    LDA $0515                  ; $CCA3
    BNE $CC9E                  ; $CCA6
    LDA #$01                   ; $CCA8
    STA $0515                  ; $CCAA
    LDA #$20                   ; $CCAD
    STA $04A5                  ; $CCAF
    LDA #$E0                   ; $CCB2
    STA $04A6                  ; $CCB4
    LDA #$23                   ; $CCB7
    STA $04A7                  ; $CCB9
    LDX #$00                   ; $CCBC
    TXA                        ; $CCBE
    STA $04A8,X                ; $CCBF
    INX                        ; $CCC2
    CPX #$21                   ; $CCC3
    BNE $CCBF                  ; $CCC5
    LDA #$80                   ; $CCC7
    STA $0515                  ; $CCC9
    LDA #$01                   ; $CCCC
    JSR $CB0F                  ; $CCCE
    RTS                        ; $CCD1
    .byte $BA
    LDA $0101,X                ; $CCD3
    STA $0075                  ; $CCD6
    PHA                        ; $CCD8
    LDA $0102,X                ; $CCD9
    STA $0076                  ; $CCDC
    PLA                        ; $CCDE
    CLC                        ; $CCDF
    ADC #$03                   ; $CCE0
    STA $0101,X                ; $CCE2
    BCC $CCEA                  ; $CCE5
    .byte $FE,$02,$01
    TYA                        ; $CCEA
    PHA                        ; $CCEB
    LDA $0498                  ; $CCEC
    ASL                        ; $CCEF
    ADC $0498                  ; $CCF0
    TAX                        ; $CCF3
    LDY #$01                   ; $CCF4
    LDA ($0075),Y              ; $CCF6
    STA $0499,X                ; $CCF8
    INY                        ; $CCFB
    LDA ($0075),Y              ; $CCFC
    STA $049A,X                ; $CCFE
    INY                        ; $CD01
    LDA ($0075),Y              ; $CD02
    STA $049B,X                ; $CD04
    INC $0498                  ; $CD07
    PLA                        ; $CD0A
    TAY                        ; $CD0B
    RTS                        ; $CD0C
    .byte $8A
    PHA                        ; $CD0E
    LDA #$00                   ; $CD0F
    STA $006B                  ; $CD11
    STA $006C                  ; $CD13
    STA $006D                  ; $CD15
    STA $006E                  ; $CD17
    LDX #$10                   ; $CD19
    ROR $0068                  ; $CD1B
    ROR $0067                  ; $CD1D
    BCC $CD2E                  ; $CD1F
    CLC                        ; $CD21
    LDA $006D                  ; $CD22
    ADC $0069                  ; $CD24
    STA $006D                  ; $CD26
    LDA $006E                  ; $CD28
    ADC $006A                  ; $CD2A
    STA $006E                  ; $CD2C
    ROR $006E                  ; $CD2E
    ROR $006D                  ; $CD30
    ROR $006C                  ; $CD32
    ROR $006B                  ; $CD34
    DEX                        ; $CD36
    BNE $CD1B                  ; $CD37
    PLA                        ; $CD39
    TAX                        ; $CD3A
    RTS                        ; $CD3B
    .byte $8A
    PHA                        ; $CD3D
    LDA #$00                   ; $CD3E
    STA $0072                  ; $CD40
    STA $0073                  ; $CD42
    LDX #$10                   ; $CD44
    ROL $006F                  ; $CD46
    ROL $0070                  ; $CD48
    ROL $0072                  ; $CD4A
    ROL $0073                  ; $CD4C
    BCS $CD60                  ; $CD4E
    LDA $0073                  ; $CD50
    CMP $0074                  ; $CD52
    BEQ $CD5A                  ; $CD54
    BCC $CD6D                  ; $CD56
    BCS $CD60                  ; $CD58
    LDA $0072                  ; $CD5A
    CMP $0071                  ; $CD5C
    BCC $CD6D                  ; $CD5E
    LDA $0072                  ; $CD60
    SBC $0071                  ; $CD62
    STA $0072                  ; $CD64
    LDA $0073                  ; $CD66
    SBC $0074                  ; $CD68
    STA $0073                  ; $CD6A
    SEC                        ; $CD6C
    ROL $006F                  ; $CD6D
    ROL $0070                  ; $CD6F
    DEX                        ; $CD71
    BNE $CD4A                  ; $CD72
    PLA                        ; $CD74
    TAX                        ; $CD75
    RTS                        ; $CD76
    .byte $AD,$FB,$05
    EOR #$0B                   ; $CD7A
    .byte $0A
    TAY                        ; $CD7D
    LDA $CD89,Y                ; $CD7E
    STA $0034                  ; $CD81
    LDA $CD8A,Y                ; $CD83
    STA $0035                  ; $CD86
    RTS                        ; $CD88
    .byte $00,$03,$0C,$03,$18,$03,$24,$03,$30,$03,$3C,$03,$48,$03,$54,$03
    .byte $60,$03,$6C,$03,$78,$03,$84,$03,$90,$03,$9C,$03,$A8,$03,$B4,$03
    .byte $C0,$03,$CC,$03,$D8,$03,$E4,$03,$F0,$03,$FC,$03,$08,$04,$0C,$04
    .byte $10,$04,$14,$04,$18,$04,$1C,$04,$20,$04,$24,$04,$28,$04,$2C,$04
    .byte $A2,$00
    CMP #$0C                   ; $CDCB
    BCC $CDD4                  ; $CDCD
    SBC #$0C                   ; $CDCF
    INX                        ; $CDD1
    BNE $CDCB                  ; $CDD2
    ASL                        ; $CDD4
    ASL                        ; $CDD5
    ASL                        ; $CDD6
    ADC #$54                   ; $CDD7
    TAY                        ; $CDD9
    TXA                        ; $CDDA
    ASL                        ; $CDDB
    ASL                        ; $CDDC
    ASL                        ; $CDDD
    ADC #$34                   ; $CDDE
    TAX                        ; $CDE0
    RTS                        ; $CDE1
    .byte $8A
    SEC                        ; $CDE3
    SBC #$30                   ; $CDE4
    BCC $CE05                  ; $CDE6
    CMP #$A0                   ; $CDE8
    BCS $CE05                  ; $CDEA
    LSR                        ; $CDEC
    LSR                        ; $CDED
    LSR                        ; $CDEE
    TAX                        ; $CDEF
    TYA                        ; $CDF0
    SEC                        ; $CDF1
    SBC #$50                   ; $CDF2
    BCC $CE05                  ; $CDF4
    CMP #$60                   ; $CDF6
    BCS $CE05                  ; $CDF8
    LSR                        ; $CDFA
    LSR                        ; $CDFB
    LSR                        ; $CDFC
    DEX                        ; $CDFD
    BMI $CE07                  ; $CDFE
    CLC                        ; $CE00
    ADC #$0C                   ; $CE01
    BNE $CDFD                  ; $CE03
    LDA #$FF                   ; $CE05
    RTS                        ; $CE07
    .byte $A8
    LDA a: $0024               ; $CE09
    PHA                        ; $CE0C
    LDA a: $0025               ; $CE0D
    PHA                        ; $CE10
    TYA                        ; $CE11
    PHA                        ; $CE12
    LDA $0022                  ; $CE13
    LDA #$1C                   ; $CE15
    STA $0024                  ; $CE17
    LDA #$1D                   ; $CE19
    STA $0025                  ; $CE1B
    JSR $CE2D                  ; $CE1D
    PLA                        ; $CE20
    JSR $8000                  ; $CE21
    PLA                        ; $CE24
    STA $0025                  ; $CE25
    PLA                        ; $CE27
    STA $0024                  ; $CE28
    JMP $CE2D                  ; $CE2A
    .byte $A5,$22
    ORA #$06                   ; $CE2F
    STA $0023                  ; $CE31
    STA $8000                  ; $CE33
    LDA $0024                  ; $CE36
    STA $8001                  ; $CE38
    LDA $0022                  ; $CE3B
    ORA #$07                   ; $CE3D
    STA $0023                  ; $CE3F
    STA $8000                  ; $CE41
    LDA $0025                  ; $CE44
    STA $8001                  ; $CE46
    RTS                        ; $CE49
    .byte $18
    ADC #$40                   ; $CE4B
    .byte $0A
    PHP                        ; $CE4E
    BPL $CE53                  ; $CE4F
    EOR #$FF                   ; $CE51
    AND #$7E                   ; $CE53
    TAX                        ; $CE55
    LDA $FB4D,X                ; $CE56
    TAY                        ; $CE59
    LDA $FB4C,X                ; $CE5A
    TAX                        ; $CE5D
    PLP                        ; $CE5E
    BCC $CE6D                  ; $CE5F
    TXA                        ; $CE61
    EOR #$FF                   ; $CE62
    TAX                        ; $CE64
    TYA                        ; $CE65
    EOR #$FF                   ; $CE66
    TAY                        ; $CE68
    INX                        ; $CE69
    BNE $CE6D                  ; $CE6A
    INY                        ; $CE6C
    RTS                        ; $CE6D
    .byte $85,$36
    ASL                        ; $CE70
    ADC $0036                  ; $CE71
    STA $0036                  ; $CE73
    LDA #$80                   ; $CE75
    STA $0037                  ; $CE77
    LDA $0024                  ; $CE79
    PHA                        ; $CE7B
    LDA $0025                  ; $CE7C
    PHA                        ; $CE7E
    LDA #$1C                   ; $CE7F
    STA $0024                  ; $CE81
    LDA #$1D                   ; $CE83
    STA $0025                  ; $CE85
    .byte $20,$2D,$CE
    JSR $CE96                  ; $CE8A
    PLA                        ; $CE8D
    STA $0025                  ; $CE8E
    PLA                        ; $CE90
    STA $0024                  ; $CE91
    JMP $CE2D                  ; $CE93
    JMP ($0036)                ; $CE96
    .byte $85,$46
    INC $0046                  ; $CE9B
    LDA #$08                   ; $CE9D
    STA $0047                  ; $CE9F
    .byte $A5,$46
    STA $0048                  ; $CEA3
    LDA #$0A                   ; $CEA5
    STA $0049                  ; $CEA7
    LDA $0048                  ; $CEA9
    CMP $0441                  ; $CEAB
    BEQ $CEC3                  ; $CEAE
    CMP $0442                  ; $CEB0
    BEQ $CEC3                  ; $CEB3
    JSR $CD7C                  ; $CEB5
    LDY #$0A                   ; $CEB8
    LDA ($0034),Y              ; $CEBA
    BNE $CEC3                  ; $CEBC
    JSR $CED6                  ; $CEBE
    BCS $CED3                  ; $CEC1
    INC $0048                  ; $CEC3
    DEC $0049                  ; $CEC5
    BNE $CEA9                  ; $CEC7
    LDA $0047                  ; $CEC9
    CLC                        ; $CECB
    ADC #$08                   ; $CECC
    STA $0047                  ; $CECE
    JMP $CEA1                  ; $CED0
    LDA $0048                  ; $CED3
    RTS                        ; $CED5
    LDY #$06                   ; $CED6
    LDA ($0034),Y              ; $CED8
    SEC                        ; $CEDA
    SBC $0635                  ; $CEDB
    BCS $CEE4                  ; $CEDE
    EOR #$FF                   ; $CEE0
    ADC #$01                   ; $CEE2
    CMP $0047                  ; $CEE4
    BCS $CEFC                  ; $CEE6
    LDY #$08                   ; $CEE8
    LDA ($0034),Y              ; $CEEA
    SEC                        ; $CEEC
    SBC $0637                  ; $CEED
    BCS $CEF6                  ; $CEF0
    EOR #$FF                   ; $CEF2
    ADC #$01                   ; $CEF4
    CMP $0047                  ; $CEF6
    BCS $CEFC                  ; $CEF8
    SEC                        ; $CEFA
    RTS                        ; $CEFB
    CLC                        ; $CEFC
    RTS                        ; $CEFD
    .byte $48
    LDA #$00                   ; $CEFF
    STA $0469                  ; $CF01
    LDA #$00                   ; $CF04
    STA $0469                  ; $CF06
    STA $E000                  ; $CF09
    JSR $CB8B                  ; $CF0C
    JSR $CB35                  ; $CF0F
    LDA $0020                  ; $CF12
    AND #$7F                   ; $CF14
    STA $2000                  ; $CF16
    STA $0020                  ; $CF19
    PLA                        ; $CF1B
    JMP $C400                  ; $CF1C
    LDA #$68                   ; $CF1F
    STA $003A                  ; $CF21
    LDA #$04                   ; $CF23
    STA $003B                  ; $CF25
    LDA #$97                   ; $CF27
    STA $003C                  ; $CF29
    LDA #$02                   ; $CF2B
    STA $003D                  ; $CF2D
    LDA #$00                   ; $CF2F
    TAY                        ; $CF31
    STA ($003A),Y              ; $CF32
    INY                        ; $CF34
    BNE $CF32                  ; $CF35
    INC $003B                  ; $CF37
    DEC $003D                  ; $CF39
    BNE $CF32                  ; $CF3B
    STA ($003A),Y              ; $CF3D
    INY                        ; $CF3F
    DEC $003C                  ; $CF40
    BNE $CF3D                  ; $CF42
    LDX #$A5                   ; $CF44
    LDA #$00                   ; $CF46
    STA a: $003A,X             ; $CF48
    DEX                        ; $CF4B
    BNE $CF48                  ; $CF4C
    RTS                        ; $CF4E
    .byte $A9,$00
    PHA                        ; $CF51
    JSR $CD7C                  ; $CF52
    LDY #$0A                   ; $CF55
    LDA #$00                   ; $CF57
    STA ($0034),Y              ; $CF59
    PLA                        ; $CF5B
    PHA                        ; $CF5C
    BEQ $CF63                  ; $CF5D
    CMP #$0B                   ; $CF5F
    BNE $CF69                  ; $CF61
    LDY #$07                   ; $CF63
    LDA #$00                   ; $CF65
    STA ($0034),Y              ; $CF67
    PLA                        ; $CF69
    CLC                        ; $CF6A
    ADC #$01                   ; $CF6B
    CMP #$16                   ; $CF6D
    BNE $CF51                  ; $CF6F
    RTS                        ; $CF71
    .byte $48
    LDA $0022                  ; $CF73
    LDA #$1A                   ; $CF75
    STA $0024                  ; $CF77
    LDA #$1B                   ; $CF79
    STA $0025                  ; $CF7B
    JSR $CE2D                  ; $CF7D
    PLA                        ; $CF80
    JSR $802A                  ; $CF81
    LDA #$18                   ; $CF84
    STA $0024                  ; $CF86
    LDA #$19                   ; $CF88
    STA $0025                  ; $CF8A
    JMP $CE2D                  ; $CF8C
    .byte $8D,$23,$06
    TAX                        ; $CF92
    LDA $D002,X                ; $CF93
    STA $02FF                  ; $CF96
    LDA $D01A,X                ; $CF99
    STA $02FD                  ; $CF9C
    LDA #$03                   ; $CF9F
    STA $02FE                  ; $CFA1
    LDA #$01                   ; $CFA4
    JSR $CB0F                  ; $CFA6
    LDA $0622                  ; $CFA9
    ASL                        ; $CFAC
    ASL                        ; $CFAD
    ASL                        ; $CFAE
    ASL                        ; $CFAF
    LDX $0623                  ; $CFB0
    CLC                        ; $CFB3
    ADC $D00A,X                ; $CFB4
    STA $02FC                  ; $CFB7
    LDA #$0C                   ; $CFBA
    AND a: $001E               ; $CFBC
    BEQ $CFE7                  ; $CFBF
    LDX #$01                   ; $CFC1
    AND #$08                   ; $CFC3
    BEQ $CFC9                  ; $CFC5
    LDX #$FF                   ; $CFC7
    TXA                        ; $CFC9
    CLC                        ; $CFCA
    ADC $0622                  ; $CFCB
    BMI $CFE7                  ; $CFCE
    LDX $0623                  ; $CFD0
    CMP $D012,X                ; $CFD3
    BEQ $CFDA                  ; $CFD6
    BCS $CFE7                  ; $CFD8
    STA $0622                  ; $CFDA
    LDX $0623                  ; $CFDD
    CPX #$05                   ; $CFE0
    BNE $CFE7                  ; $CFE2
    STA a: $002C               ; $CFE4
    LDA #$80                   ; $CFE7
    AND a: $001E               ; $CFE9
    BNE $CFF8                  ; $CFEC
    LDA #$40                   ; $CFEE
    AND a: $001E               ; $CFF0
    BEQ $CFA4                  ; $CFF3
    CLC                        ; $CFF5
    BCC $CFFC                  ; $CFF6
    SEC                        ; $CFF8
    LDA $0622                  ; $CFF9
    LDX #$F8                   ; $CFFC
    STX $02FC                  ; $CFFE
    RTS                        ; $D001
    .byte $48,$48,$48,$48,$40,$48,$48,$48,$9A,$9A,$9A,$9A,$92,$A2,$B2,$C2
    .byte $00,$01,$02,$03,$04,$03,$02,$01,$11,$11,$11,$11,$71,$71,$71,$71
    .byte $AD,$27,$00
    CMP #$01                   ; $D025
    BEQ $D030                  ; $D027
    CMP #$02                   ; $D029
    BEQ $D030                  ; $D02B
    .byte $4C,$92,$D0
    LDA #$00                   ; $D030
    PHA                        ; $D032
    LDX #$00                   ; $D033
    JSR $CE08                  ; $D035
    LDA $0033                  ; $D038
    STA $0037                  ; $D03A
    LDA $0032                  ; $D03C
    STA $0036                  ; $D03E
    LDY #$00                   ; $D040
    LDA ($0034),Y              ; $D042
    CMP #$20                   ; $D044
    BNE $D054                  ; $D046
    LDX #$04                   ; $D048
    LDA a: $0027               ; $D04A
    CMP #$01                   ; $D04D
    BEQ $D05E                  ; $D04F
    DEX                        ; $D051
    BNE $D05E                  ; $D052
    LDX #$03                   ; $D054
    LDA a: $0027               ; $D056
    CMP #$01                   ; $D059
    BEQ $D05E                  ; $D05B
    DEX                        ; $D05D
    LSR $0033                  ; $D05E
    ROR $0032                  ; $D060
    DEX                        ; $D062
    BNE $D05E                  ; $D063
    LDY #$01                   ; $D065
    LDA ($0034),Y              ; $D067
    CLC                        ; $D069
    ADC $0032                  ; $D06A
    TAX                        ; $D06C
    INY                        ; $D06D
    LDA ($0034),Y              ; $D06E
    ADC $0033                  ; $D070
    CMP $0037                  ; $D072
    PHP                        ; $D074
    BCC $D079                  ; $D075
    LDA $0037                  ; $D077
    STA ($0034),Y              ; $D079
    TXA                        ; $D07B
    PLP                        ; $D07C
    BCC $D087                  ; $D07D
    BNE $D085                  ; $D07F
    CMP $0036                  ; $D081
    BCC $D087                  ; $D083
    LDA $0036                  ; $D085
    DEY                        ; $D087
    STA ($0034),Y              ; $D088
    PLA                        ; $D08A
    CLC                        ; $D08B
    ADC #$01                   ; $D08C
    CMP #$0B                   ; $D08E
    BNE $D032                  ; $D090
    RTS                        ; $D092
    .byte $A9,$32
    BIT $063E                  ; $D095
    BMI $D0A8                  ; $D098
    LDX $05FB                  ; $D09A
    BEQ $D0A1                  ; $D09D
    LDX #$01                   ; $D09F
    LDA a: $002A,X             ; $D0A1
    TAX                        ; $D0A4
    LDA $D0AC,X                ; $D0A5
    JSR $CBF1                  ; $D0A8
    RTS                        ; $D0AB
    .byte $3C,$39,$3F,$35,$35,$35,$35,$35,$40,$34,$34,$34,$34,$34,$37,$3B
    .byte $3B,$3B,$3B,$3A,$3A,$3A,$3A,$3A,$3A,$36,$36,$36,$36,$36,$3D,$3D
    .byte $3D,$3D,$38,$3E,$3E,$AD,$2A,$00
    CMP #$02                   ; $D0D4
    BNE $D10F                  ; $D0D6
    LDA #$00                   ; $D0D8
    PHA                        ; $D0DA
    CMP #$0B                   ; $D0DB
    BCC $D0E1                  ; $D0DD
    ADC #$0A                   ; $D0DF
    JSR $CD7C                  ; $D0E1
    LDY #$00                   ; $D0E4
    LDA ($0034),Y              ; $D0E6
    TAX                        ; $D0E8
    PLA                        ; $D0E9
    CPX #$20                   ; $D0EA
    BEQ $D0F6                  ; $D0EC
    CLC                        ; $D0EE
    ADC #$01                   ; $D0EF
    CMP #$16                   ; $D0F1
    BNE $D0DA                  ; $D0F3
    .byte $60
    LDX #$00                   ; $D0F6
    LDA $044D                  ; $D0F8
    BNE $D10C                  ; $D0FB
    LDY #$01                   ; $D0FD
    LDA ($0034),Y              ; $D0FF
    SEC                        ; $D101
    SBC #$64                   ; $D102
    INY                        ; $D104
    LDA ($0034),Y              ; $D105
    SBC #$00                   ; $D107
    BPL $D10C                  ; $D109
    INX                        ; $D10B
    STX $044D                  ; $D10C
    RTS                        ; $D10F
    LDA #$12                   ; $D110
    STA $0024                  ; $D112
    LDA #$13                   ; $D114
    STA $0025                  ; $D116
    JSR $CE2D                  ; $D118
    JMP $B000                  ; $D11B
    LDA a: $0027               ; $D11E
    CMP #$05                   ; $D121
    BNE $D128                  ; $D123
    JMP $D110                  ; $D125
    LDA #$00                   ; $D128
    STA $063E                  ; $D12A
    STA $0640                  ; $D12D
    STA $0641                  ; $D130
    STA $0613                  ; $D133
    LDA a: $0027               ; $D136
    CMP #$04                   ; $D139
    BNE $D14F                  ; $D13B
    PHA                        ; $D13D
    LDA $0022                  ; $D13E
    LDA #$1A                   ; $D140
    STA $0024                  ; $D142
    LDA #$1B                   ; $D144
    STA $0025                  ; $D146
    JSR $CE2D                  ; $D148
    PLA                        ; $D14B
    JSR $8030                  ; $D14C
    STA $0629                  ; $D14F
    ASL                        ; $D152
    STA $003A                  ; $D153
    LDA #$08                   ; $D155
    LDX a: $002B               ; $D157
    CPX #$0E                   ; $D15A
    BEQ $D168                  ; $D15C
    CPX #$12                   ; $D15E
    BEQ $D168                  ; $D160
    CPX #$1A                   ; $D162
    BCS $D168                  ; $D164
    LDA #$00                   ; $D166
    CLC                        ; $D168
    ADC $003A                  ; $D169
    TAX                        ; $D16B
    LDA $D183,X                ; $D16C
    STA $05F7                  ; $D16F
    LDA $D184,X                ; $D172
    STA $05F8                  ; $D175
    LDA #$00                   ; $D178
    STA $05F9                  ; $D17A
    LDX #$50                   ; $D17D
    TXS                        ; $D17F
    JMP $DAAA                  ; $D180
    .byte $B4,$00,$B4,$00,$5A,$00,$5A,$00,$D2,$00,$D2,$00,$5A,$00,$5A,$00
    .byte $AA
    CLC                        ; $D194
    ADC $05FF                  ; $D195
    STA $05FF                  ; $D198
    TXA                        ; $D19B
    PHA                        ; $D19C
    JSR $D235                  ; $D19D
    PLA                        ; $D1A0
    LDX $05F8                  ; $D1A1
    BNE $D1AE                  ; $D1A4
    CPX $05F7                  ; $D1A6
    BNE $D1AE                  ; $D1A9
    JMP $D220                  ; $D1AB
    EOR #$FF                   ; $D1AE
    CLC                        ; $D1B0
    ADC #$01                   ; $D1B1
    BNE $D1B8                  ; $D1B3
    JMP $D21F                  ; $D1B5
    CLC                        ; $D1B8
    ADC $05F7                  ; $D1B9
    TAX                        ; $D1BC
    LDA $05F8                  ; $D1BD
    ADC #$FF                   ; $D1C0
    BPL $D1C7                  ; $D1C2
    LDA #$00                   ; $D1C4
    TAX                        ; $D1C6
    STA $05F8                  ; $D1C7
    STX $05F7                  ; $D1CA
    LDA #$00                   ; $D1CD
    JSR $EF7F                  ; $D1CF
    BIT $063E                  ; $D1D2
    BMI $D1EB                  ; $D1D5
    LDA $05F7                  ; $D1D7
    CMP #$1E                   ; $D1DA
    BCS $D1EB                  ; $D1DC
    LDA $063E                  ; $D1DE
    ORA #$80                   ; $D1E1
    STA $063E                  ; $D1E3
    LDA #$32                   ; $D1E6
    JSR $CBF1                  ; $D1E8
    LDA $05F8                  ; $D1EB
    ORA $05F7                  ; $D1EE
    BNE $D21F                  ; $D1F1
    LDA #$00                   ; $D1F3
    BIT a: $00E2               ; $D1F5
    BPL $D1FC                  ; $D1F8
    LDA #$0C                   ; $D1FA
    CLC                        ; $D1FC
    ADC $05F9                  ; $D1FD
    STA $05F9                  ; $D200
    BEQ $D21F                  ; $D203
    LDA #$00                   ; $D205
    STA $062D                  ; $D207
    LDA $0615                  ; $D20A
    AND #$BF                   ; $D20D
    STA $0615                  ; $D20F
    LDA #$43                   ; $D212
    JSR $CBB0                  ; $D214
    BIT $0615                  ; $D217
    BPL $D21F                  ; $D21A
    JSR $E233                  ; $D21C
    .byte $60,$49,$FF
    CLC                        ; $D222
    ADC #$01                   ; $D223
    CLC                        ; $D225
    ADC $05F9                  ; $D226
    BPL $D231                  ; $D229
    LDX #$50                   ; $D22B
    TXS                        ; $D22D
    JMP $DA98                  ; $D22E
    STA $05F9                  ; $D231
    RTS                        ; $D234
    EOR #$FF                   ; $D235
    CLC                        ; $D237
    ADC #$01                   ; $D238
    TAX                        ; $D23A
    BIT $0449                  ; $D23B
    BPL $D24E                  ; $D23E
    CLC                        ; $D240
    ADC $044A                  ; $D241
    STA $044A                  ; $D244
    BPL $D24E                  ; $D247
    LDA #$00                   ; $D249
    STA $0449                  ; $D24B
    TXA                        ; $D24E
    PHA                        ; $D24F
    LDA #$00                   ; $D250
    JSR $CD7C                  ; $D252
    PLA                        ; $D255
    PHA                        ; $D256
    JSR $D263                  ; $D257
    LDA #$0B                   ; $D25A
    JSR $CD7C                  ; $D25C
    PLA                        ; $D25F
    JMP $D263                  ; $D260
    .byte $AA
    LDY #$0A                   ; $D264
    LDA ($0034),Y              ; $D266
    BEQ $D275                  ; $D268
    TXA                        ; $D26A
    CLC                        ; $D26B
    ADC ($0034),Y              ; $D26C
    BPL $D272                  ; $D26E
    LDA #$00                   ; $D270
    STA ($0034),Y              ; $D272
    RTS                        ; $D274
    LDY #$07                   ; $D275
    LDA ($0034),Y              ; $D277
    BEQ $D299                  ; $D279
    LDY #$06                   ; $D27B
    TXA                        ; $D27D
    CLC                        ; $D27E
    ADC ($0034),Y              ; $D27F
    BPL $D297                  ; $D281
    CLC                        ; $D283
    ADC #$03                   ; $D284
    PHA                        ; $D286
    LDY #$07                   ; $D287
    LDA ($0034),Y              ; $D289
    SEC                        ; $D28B
    SBC #$19                   ; $D28C
    BPL $D292                  ; $D28E
    LDA #$00                   ; $D290
    STA ($0034),Y              ; $D292
    PLA                        ; $D294
    LDY #$06                   ; $D295
    STA ($0034),Y              ; $D297
    RTS                        ; $D299
    .byte $AE,$21,$06
    LDA $D359,X                ; $D29D
    JSR $EF7F                  ; $D2A0
    LDX $0621                  ; $D2A3
    LDA $D35C,X                ; $D2A6
    JSR $EF7F                  ; $D2A9
    LDA #$00                   ; $D2AC
    STA $043E                  ; $D2AE
    STA $061E                  ; $D2B1
    .byte $A9,$01
    JSR $CB0F                  ; $D2B6
    LDA #$0F                   ; $D2B9
    AND a: $001E               ; $D2BB
    BEQ $D309                  ; $D2BE
    LDX #$00                   ; $D2C0
    LSR                        ; $D2C2
    BCS $D2C8                  ; $D2C3
    INX                        ; $D2C5
    BNE $D2C2                  ; $D2C6
    STX $003A                  ; $D2C8
    LDA $0621                  ; $D2CA
    SEC                        ; $D2CD
    SBC #$03                   ; $D2CE
    ASL                        ; $D2D0
    ASL                        ; $D2D1
    ADC $003A                  ; $D2D2
    TAX                        ; $D2D4
    LDA $D362,X                ; $D2D5
    CMP #$FF                   ; $D2D8
    BEQ $D309                  ; $D2DA
    CMP #$02                   ; $D2DC
    BNE $D2ED                  ; $D2DE
    JSR $CD77                  ; $D2E0
    LDY #$00                   ; $D2E3
    LDA ($0034),Y              ; $D2E5
    CMP #$22                   ; $D2E7
    BNE $D309                  ; $D2E9
    LDA #$02                   ; $D2EB
    STA $043D                  ; $D2ED
    LDX $003A                  ; $D2F0
    LDA $061E                  ; $D2F2
    STX $061E                  ; $D2F5
    PHA                        ; $D2F8
    AND #$03                   ; $D2F9
    CMP $061E                  ; $D2FB
    BEQ $D303                  ; $D2FE
    PLA                        ; $D300
    TXA                        ; $D301
    PHA                        ; $D302
    PLA                        ; $D303
    ORA #$80                   ; $D304
    STA $061E                  ; $D306
    LDA #$80                   ; $D309
    AND a: $001E               ; $D30B
    BEQ $D318                  ; $D30E
    BIT $061E                  ; $D310
    BPL $D318                  ; $D313
    JMP $CC46                  ; $D315
    BIT $061E                  ; $D318
    BPL $D2B4                  ; $D31B
    LDA #$20                   ; $D31D
    BIT $061E                  ; $D31F
    BNE $D32F                  ; $D322
    ORA $061E                  ; $D324
    STA $061E                  ; $D327
    LDA #$00                   ; $D32A
    STA $061F                  ; $D32C
    LDX $061F                  ; $D32F
    BEQ $D33A                  ; $D332
    DEC $061F                  ; $D334
    JMP $D2B4                  ; $D337
    LDA #$0D                   ; $D33A
    STA $061F                  ; $D33C
    LDA $061E                  ; $D33F
    EOR #$40                   ; $D342
    STA $061E                  ; $D344
    LDY $043D                  ; $D347
    LDA $D548,Y                ; $D34A
    BIT $061E                  ; $D34D
    BVS $D354                  ; $D350
    ORA #$80                   ; $D352
    LDX #$00                   ; $D354
    JSR $E93D                  ; $D356
    JMP $D2B4                  ; $D359
    .byte $07,$02,$2D,$08,$06,$06,$06,$06,$FF,$05,$00,$00,$02,$01,$09,$07
    .byte $FF,$08,$AD,$21,$06
    CMP #$03                   ; $D371
    BCC $D378                  ; $D373
    JMP $D29A                  ; $D375
    LDA $0600                  ; $D378
    BNE $D37E                  ; $D37B
    RTS                        ; $D37D
    JSR $CC46                  ; $D37E
    LDX #$03                   ; $D381
    LDA #$FF                   ; $D383
    STA $060B,X                ; $D385
    DEX                        ; $D388
    BPL $D385                  ; $D389
    LDA #$00                   ; $D38B
    STA $061E                  ; $D38D
    JSR $D4EA                  ; $D390
    .byte $A9,$0D
    LDX $061E                  ; $D395
    LDY $0601,X                ; $D398
    BEQ $D3A3                  ; $D39B
    LDX $0621                  ; $D39D
    LDA $D552,X                ; $D3A0
    JSR $EF7F                  ; $D3A3
    .byte $A9,$01
    JSR $CB0F                  ; $D3A8
    LDA #$80                   ; $D3AB
    AND a: $001E               ; $D3AD
    BNE $D3B5                  ; $D3B0
    JMP $D438                  ; $D3B2
    LDX $061E                  ; $D3B5
    CPX $0600                  ; $D3B8
    BNE $D3C0                  ; $D3BB
    JMP $CC46                  ; $D3BD
    LDA $060B,X                ; $D3C0
    CMP #$FF                   ; $D3C3
    BEQ $D438                  ; $D3C5
    STA $043D                  ; $D3C7
    TAX                        ; $D3CA
    LDY $061E                  ; $D3CB
    LDA $0601,Y                ; $D3CE
    STA $0442                  ; $D3D1
    PHA                        ; $D3D4
    LDA $0022                  ; $D3D5
    LDA #$1C                   ; $D3D7
    STA $0024                  ; $D3D9
    LDA #$1D                   ; $D3DB
    STA $0025                  ; $D3DD
    JSR $CE2D                  ; $D3DF
    PLA                        ; $D3E2
    JSR $800C                  ; $D3E3
    LDA $0430                  ; $D3E6
    BEQ $D424                  ; $D3E9
    CLC                        ; $D3EB
    ADC #$0B                   ; $D3EC
    JSR $EF7F                  ; $D3EE
    JSR $D77A                  ; $D3F1
    ASL                        ; $D3F4
    PHP                        ; $D3F5
    BCS $D40C                  ; $D3F6
    LSR                        ; $D3F8
    PHA                        ; $D3F9
    STA $043E                  ; $D3FA
    JSR $D746                  ; $D3FD
    PLA                        ; $D400
    BCC $D40C                  ; $D401
    LDX $061E                  ; $D403
    STA $0606,X                ; $D406
    INC $061E                  ; $D409
    JSR $CC46                  ; $D40C
    JSR $D4EA                  ; $D40F
    LDA $061E                  ; $D412
    CMP $0600                  ; $D415
    BEQ $D41F                  ; $D418
    LDA #$16                   ; $D41A
    JSR $EF7F                  ; $D41C
    PLP                        ; $D41F
    BCS $D438                  ; $D420
    BCC $D430                  ; $D422
    LDX $061E                  ; $D424
    STA $0606,X                ; $D427
    JSR $D4E4                  ; $D42A
    INC $061E                  ; $D42D
    LDA $061E                  ; $D430
    CMP $0600                  ; $D433
    BNE $D44F                  ; $D436
    .byte $A9,$40
    AND a: $001E               ; $D43A
    BEQ $D45F                  ; $D43D
    LDX $061E                  ; $D43F
    BEQ $D45F                  ; $D442
    CPX $0600                  ; $D444
    BEQ $D44C                  ; $D447
    JSR $D4E4                  ; $D449
    DEC $061E                  ; $D44C
    LDA $061F                  ; $D44F
    ORA #$40                   ; $D452
    STA $061F                  ; $D454
    LDA #$00                   ; $D457
    STA $0620                  ; $D459
    JMP $D393                  ; $D45C
    LDA #$0F                   ; $D45F
    AND a: $001E               ; $D461
    BEQ $D49F                  ; $D464
    LDX #$00                   ; $D466
    LSR                        ; $D468
    BCS $D46E                  ; $D469
    INX                        ; $D46B
    BNE $D468                  ; $D46C
    STX $003A                  ; $D46E
    LDA $0621                  ; $D470
    ASL                        ; $D473
    ASL                        ; $D474
    ADC $003A                  ; $D475
    TAX                        ; $D477
    LDA $D555,X                ; $D478
    LDY $061E                  ; $D47B
    LDX $0601,Y                ; $D47E
    BNE $D488                  ; $D481
    LDX $003A                  ; $D483
    LDA $D561,X                ; $D485
    CMP #$FF                   ; $D488
    BEQ $D49F                  ; $D48A
    LDX $061E                  ; $D48C
    CMP $060B,X                ; $D48F
    BEQ $D49F                  ; $D492
    STA $060B,X                ; $D494
    LDA #$00                   ; $D497
    STA $0606,X                ; $D499
    STA $061F                  ; $D49C
    LDA $061E                  ; $D49F
    CMP $0600                  ; $D4A2
    BNE $D4AA                  ; $D4A5
    JMP $D3A6                  ; $D4A7
    BIT $061F                  ; $D4AA
    BMI $D4B9                  ; $D4AD
    LDA #$80                   ; $D4AF
    STA $061F                  ; $D4B1
    LDA #$00                   ; $D4B4
    STA $0620                  ; $D4B6
    LDA $0620                  ; $D4B9
    BEQ $D4C4                  ; $D4BC
    DEC $0620                  ; $D4BE
    JMP $D3A6                  ; $D4C1
    LDA #$0D                   ; $D4C4
    STA $0620                  ; $D4C6
    LDA $061F                  ; $D4C9
    EOR #$40                   ; $D4CC
    STA $061F                  ; $D4CE
    LDX $061E                  ; $D4D1
    JSR $D504                  ; $D4D4
    BIT $061F                  ; $D4D7
    BVS $D4DE                  ; $D4DA
    ORA #$80                   ; $D4DC
    JSR $E93D                  ; $D4DE
    JMP $D3A6                  ; $D4E1
    JSR $D504                  ; $D4E4
    JMP $E93D                  ; $D4E7
    LDA $0600                  ; $D4EA
    CLC                        ; $D4ED
    ADC #$11                   ; $D4EE
    JSR $EF7F                  ; $D4F0
    LDA #$00                   ; $D4F3
    PHA                        ; $D4F5
    TAX                        ; $D4F6
    JSR $D4E4                  ; $D4F7
    PLA                        ; $D4FA
    CLC                        ; $D4FB
    ADC #$01                   ; $D4FC
    CMP $0600                  ; $D4FE
    BNE $D4F5                  ; $D501
    RTS                        ; $D503
    LDA $060B,X                ; $D504
    CMP #$FF                   ; $D507
    BNE $D50E                  ; $D509
    LDA #$1D                   ; $D50B
    RTS                        ; $D50D
    LDY $0601,X                ; $D50E
    BNE $D518                  ; $D511
    TAY                        ; $D513
    LDA $D548,Y                ; $D514
    RTS                        ; $D517
    ASL                        ; $D518
    TAY                        ; $D519
    LDA $D52B,Y                ; $D51A
    STA $003A                  ; $D51D
    LDA $D52C,Y                ; $D51F
    STA $003B                  ; $D522
    LDA $0606,X                ; $D524
    TAY                        ; $D527
    LDA ($003A),Y              ; $D528
    RTS                        ; $D52A
    .byte $39,$D5,$3D,$D5,$42,$D5,$44,$D5,$45,$D5,$46,$D5,$47,$D5,$0C,$0E
    .byte $0D,$0F,$07,$08,$09,$0A,$0B,$10,$11,$15,$14,$13,$12,$17,$16,$18
    .byte $19,$1A,$1C,$1B,$1E,$1F,$20,$16,$18,$17,$00,$02,$06,$01,$03,$02
    .byte $06,$05,$04,$02,$06,$05,$04,$04,$FF,$03,$20,$73,$D5
    LDA #$1A                   ; $D568
    STA $0024                  ; $D56A
    LDA #$1B                   ; $D56C
    STA $0025                  ; $D56E
    JMP $CE2D                  ; $D570
    LDA #$00                   ; $D573
    STA $062D                  ; $D575
    STA $0628                  ; $D578
    JSR $CD77                  ; $D57B
    LDY #$0A                   ; $D57E
    LDA ($0034),Y              ; $D580
    BEQ $D58C                  ; $D582
    LDA #$40                   ; $D584
    JSR $CBB0                  ; $D586
    JMP $D5B2                  ; $D589
    LDA $0621                  ; $D58C
    CMP #$03                   ; $D58F
    BEQ $D5B2                  ; $D591
    CMP #$01                   ; $D593
    BNE $D5A5                  ; $D595
    LDA $0600                  ; $D597
    BEQ $D5A5                  ; $D59A
    LDA $0601                  ; $D59C
    BEQ $D5B2                  ; $D59F
    CMP #$0B                   ; $D5A1
    BEQ $D5B2                  ; $D5A3
    LDY #$07                   ; $D5A5
    LDA ($0034),Y              ; $D5A7
    CMP #$18                   ; $D5A9
    BCC $D5B2                  ; $D5AB
    LDA #$41                   ; $D5AD
    JSR $CBB0                  ; $D5AF
    .byte $20,$A2,$EF
    LDA #$00                   ; $D5B5
    STA $0011                  ; $D5B7
    STA $0012                  ; $D5B9
    LDA #$02                   ; $D5BB
    JSR $CB0F                  ; $D5BD
    JSR $CC46                  ; $D5C0
    .byte $20,$46,$CC
    LDA $05FB                  ; $D5C6
    BEQ $D5CE                  ; $D5C9
    JMP $D36E                  ; $D5CB
    LDX $0621                  ; $D5CE
    LDA $D706,X                ; $D5D1
    JSR $EF7F                  ; $D5D4
    LDX $0621                  ; $D5D7
    LDA $D700,X                ; $D5DA
    JSR $EF7F                  ; $D5DD
    LDA #$00                   ; $D5E0
    STA $061E                  ; $D5E2
    .byte $A9,$01
    JSR $CB0F                  ; $D5E7
    LDA #$0F                   ; $D5EA
    AND a: $001E               ; $D5EC
    BEQ $D626                  ; $D5EF
    LDX #$00                   ; $D5F1
    LSR                        ; $D5F3
    BCS $D5F9                  ; $D5F4
    INX                        ; $D5F6
    BNE $D5F3                  ; $D5F7
    STX $003A                  ; $D5F9
    LDA $0621                  ; $D5FB
    ASL                        ; $D5FE
    ASL                        ; $D5FF
    ADC $003A                  ; $D600
    TAX                        ; $D602
    LDA $D6E8,X                ; $D603
    CMP #$FF                   ; $D606
    BEQ $D626                  ; $D608
    STA $043B                  ; $D60A
    LDX $003A                  ; $D60D
    LDA $061E                  ; $D60F
    STX $061E                  ; $D612
    PHA                        ; $D615
    AND #$03                   ; $D616
    CMP $061E                  ; $D618
    BEQ $D620                  ; $D61B
    PLA                        ; $D61D
    TXA                        ; $D61E
    PHA                        ; $D61F
    PLA                        ; $D620
    ORA #$80                   ; $D621
    STA $061E                  ; $D623
    LDA #$80                   ; $D626
    AND a: $001E               ; $D628
    BEQ $D638                  ; $D62B
    BIT $061E                  ; $D62D
    BPL $D638                  ; $D630
    JSR $D67C                  ; $D632
    JMP $D5C3                  ; $D635
    BIT $061E                  ; $D638
    BPL $D5E5                  ; $D63B
    LDA #$20                   ; $D63D
    BIT $061E                  ; $D63F
    BNE $D64F                  ; $D642
    ORA $061E                  ; $D644
    STA $061E                  ; $D647
    LDA #$00                   ; $D64A
    STA $061F                  ; $D64C
    LDX $061F                  ; $D64F
    BEQ $D65A                  ; $D652
    DEC $061F                  ; $D654
    JMP $D5E5                  ; $D657
    LDA #$0D                   ; $D65A
    STA $061F                  ; $D65C
    LDA $061E                  ; $D65F
    EOR #$40                   ; $D662
    STA $061E                  ; $D664
    LDY $043B                  ; $D667
    LDA $D6DE,Y                ; $D66A
    BIT $061E                  ; $D66D
    BVS $D674                  ; $D670
    ORA #$80                   ; $D672
    LDX #$00                   ; $D674
    JSR $E93D                  ; $D676
    JMP $D5E5                  ; $D679
    LDX $043B                  ; $D67C
    LDA $D6DE,X                ; $D67F
    LDX #$00                   ; $D682
    STX $043C                  ; $D684
    JSR $E93D                  ; $D687
    LDX $043B                  ; $D68A
    CPX #$02                   ; $D68D
    BNE $D696                  ; $D68F
    LDA $0600                  ; $D691
    BEQ $D6C4                  ; $D694
    LDA $0441                  ; $D696
    PHA                        ; $D699
    LDA $0022                  ; $D69A
    LDA #$1C                   ; $D69C
    STA $0024                  ; $D69E
    LDA #$1D                   ; $D6A0
    STA $0025                  ; $D6A2
    JSR $CE2D                  ; $D6A4
    PLA                        ; $D6A7
    JSR $8009                  ; $D6A8
    LDA $0430                  ; $D6AB
    BEQ $D6BE                  ; $D6AE
    CLC                        ; $D6B0
    ADC #$08                   ; $D6B1
    JSR $EF7F                  ; $D6B3
    JSR $D77A                  ; $D6B6
    ASL                        ; $D6B9
    BCC $D6BD                  ; $D6BA
    RTS                        ; $D6BC
    LSR                        ; $D6BD
    STA $043C                  ; $D6BE
    JSR $D717                  ; $D6C1
    LDA $043B                  ; $D6C4
    JSR $CB99                  ; $D6C7
    .byte $92,$D7,$E8,$D7,$0C,$D7,$79,$D9,$0C,$D7,$65,$DA,$0C,$D7,$0C,$D7
    .byte $0C,$D7,$0C,$D7,$02,$01,$00,$03,$04,$05,$06,$1E,$1F,$20,$00,$01
    .byte $03,$02,$00,$01,$05,$04,$06,$01,$FF,$04,$00,$01,$FF,$02,$00,$01
    .byte $FF,$FF,$09,$07,$FF,$08,$03,$04,$05,$03,$03,$03,$02,$02,$02,$02
    .byte $02,$2C,$20,$46,$CC
    LDA #$00                   ; $D70F
    STA $062D                  ; $D711
    PLA                        ; $D714
    PLA                        ; $D715
    RTS                        ; $D716
    PHA                        ; $D717
    LDA $0022                  ; $D718
    LDA #$1C                   ; $D71A
    STA $0024                  ; $D71C
    LDA #$1D                   ; $D71E
    STA $0025                  ; $D720
    JSR $CE2D                  ; $D722
    PLA                        ; $D725
    JSR $8012                  ; $D726
    JSR $D76B                  ; $D729
    BPL $D745                  ; $D72C
    LDA $043B                  ; $D72E
    CMP #$00                   ; $D731
    BEQ $D73E                  ; $D733
    CMP #$03                   ; $D735
    BEQ $D73E                  ; $D737
    LDA $043C                  ; $D739
    BEQ $D745                  ; $D73C
    LDA #$3D                   ; $D73E
    JSR $CBB0                  ; $D740
    PLA                        ; $D743
    PLA                        ; $D744
    RTS                        ; $D745
    PHA                        ; $D746
    LDA $0022                  ; $D747
    LDA #$1C                   ; $D749
    STA $0024                  ; $D74B
    LDA #$1D                   ; $D74D
    STA $0025                  ; $D74F
    JSR $CE2D                  ; $D751
    PLA                        ; $D754
    JSR $8015                  ; $D755
    JSR $D76B                  ; $D758
    BPL $D769                  ; $D75B
    LDA $043E                  ; $D75D
    BEQ $D769                  ; $D760
    LDA #$3D                   ; $D762
    JSR $CBB0                  ; $D764
    CLC                        ; $D767
    RTS                        ; $D768
    SEC                        ; $D769
    RTS                        ; $D76A
    SEC                        ; $D76B
    LDY #$01                   ; $D76C
    LDA ($0034),Y              ; $D76E
    SBC $043F                  ; $D770
    INY                        ; $D773
    LDA ($0034),Y              ; $D774
    SBC $0440                  ; $D776
    RTS                        ; $D779
    LDA #$00                   ; $D77A
    STA $0622                  ; $D77C
    LDA $0430                  ; $D77F
    JSR $CF8F                  ; $D782
    LDX #$80                   ; $D785
    BCC $D790                  ; $D787
    TAX                        ; $D789
    BEQ $D790                  ; $D78A
    LDA $0430,X                ; $D78C
    TAX                        ; $D78F
    TXA                        ; $D790
    RTS                        ; $D791
    .byte $AD,$3C,$04
    CMP #$03                   ; $D795
    BCS $D79F                  ; $D797
    LDX $044E                  ; $D799
    STX $043C                  ; $D79C
    CMP #$12                   ; $D79F
    BNE $D7D9                  ; $D7A1
    LDX $0448                  ; $D7A3
    BNE $D7D9                  ; $D7A6
    INC $0448                  ; $D7A8
    LDA #$00                   ; $D7AB
    STA $062D                  ; $D7AD
    LDA #$46                   ; $D7B0
    JSR $CBB0                  ; $D7B2
    PHA                        ; $D7B5
    LDA $0022                  ; $D7B6
    LDA #$1A                   ; $D7B8
    STA $0024                  ; $D7BA
    LDA #$1B                   ; $D7BC
    STA $0025                  ; $D7BE
    JSR $CE2D                  ; $D7C0
    PLA                        ; $D7C3
    JSR $8021                  ; $D7C4
    PHA                        ; $D7C7
    LDA $0022                  ; $D7C8
    LDA #$1A                   ; $D7CA
    STA $0024                  ; $D7CC
    LDA #$1B                   ; $D7CE
    STA $0025                  ; $D7D0
    JSR $CE2D                  ; $D7D2
    PLA                        ; $D7D5
    JSR $8036                  ; $D7D6
    CMP #$11                   ; $D7D9
    BNE $D7E5                  ; $D7DB
    LDA #$00                   ; $D7DD
    STA $0449                  ; $D7DF
    STA $044A                  ; $D7E2
    JMP $D70C                  ; $D7E5
    .byte $A9,$38
    JSR $CBB0                  ; $D7EA
    LDA #$0F                   ; $D7ED
    JSR $EF7F                  ; $D7EF
    LDA #$81                   ; $D7F2
    STA $062D                  ; $D7F4
    LDA #$1F                   ; $D7F7
    STA $0494                  ; $D7F9
    JSR $E6EC                  ; $D7FC
    LDA #$00                   ; $D7FF
    STA $0625                  ; $D801
    LDA $05FE                  ; $D804
    STA $0624                  ; $D807
    LDA #$01                   ; $D80A
    JSR $CB0F                  ; $D80C
    LDA a: $001C               ; $D80F
    AND #$0F                   ; $D812
    BEQ $D837                  ; $D814
    LDX #$00                   ; $D816
    LSR                        ; $D818
    BCS $D81E                  ; $D819
    INX                        ; $D81B
    BNE $D818                  ; $D81C
    LDA $D84E,X                ; $D81E
    CLC                        ; $D821
    ADC $0624                  ; $D822
    CMP #$F0                   ; $D825
    BCC $D82C                  ; $D827
    LDA $0624                  ; $D829
    CMP $0624                  ; $D82C
    STA $0624                  ; $D82F
    BEQ $D837                  ; $D832
    JSR $D8F7                  ; $D834
    LDA #$40                   ; $D837
    AND a: $001E               ; $D839
    BEQ $D83F                  ; $D83C
    RTS                        ; $D83E
    LDA #$80                   ; $D83F
    AND a: $001E               ; $D841
    BEQ $D80A                  ; $D844
    JSR $D852                  ; $D846
    BCC $D80A                  ; $D849
    JMP $D70C                  ; $D84B
    .byte $0C,$F4,$01,$FF,$A9,$FF
    LDX $0625                  ; $D854
    BEQ $D862                  ; $D857
    LDX $0430                  ; $D859
    DEX                        ; $D85C
    BNE $D868                  ; $D85D
    LDA $0431                  ; $D85F
    STA $05FC                  ; $D862
    JMP $D8D2                  ; $D865
    LDA $0430                  ; $D868
    CLC                        ; $D86B
    ADC #$22                   ; $D86C
    JSR $EF7F                  ; $D86E
    LDA #$00                   ; $D871
    STA $0625                  ; $D873
    JMP $D8B5                  ; $D876
    LDA #$01                   ; $D879
    JSR $CB0F                  ; $D87B
    LDA #$40                   ; $D87E
    AND a: $001E               ; $D880
    BEQ $D88F                  ; $D883
    LDA #$0F                   ; $D885
    JSR $EF7F                  ; $D887
    JSR $D8F7                  ; $D88A
    CLC                        ; $D88D
    RTS                        ; $D88E
    LDA #$0C                   ; $D88F
    AND a: $001E               ; $D891
    BEQ $D8C3                  ; $D894
    LDX #$01                   ; $D896
    AND #$04                   ; $D898
    BNE $D89E                  ; $D89A
    LDX #$FF                   ; $D89C
    TXA                        ; $D89E
    CLC                        ; $D89F
    ADC $0625                  ; $D8A0
    BMI $D8AA                  ; $D8A3
    CMP $0430                  ; $D8A5
    BCC $D8AD                  ; $D8A8
    LDA $0625                  ; $D8AA
    CMP $0625                  ; $D8AD
    STA $0625                  ; $D8B0
    BEQ $D8C3                  ; $D8B3
    .byte $AE,$25,$06
    LDA $0431,X                ; $D8B8
    STA $05FC                  ; $D8BB
    LDA #$1D                   ; $D8BE
    JSR $EF7F                  ; $D8C0
    JSR $D8DA                  ; $D8C3
    LDA #$80                   ; $D8C6
    AND a: $001E               ; $D8C8
    BEQ $D879                  ; $D8CB
    LDA #$F8                   ; $D8CD
    STA $02FC                  ; $D8CF
    .byte $AD,$24,$06
    STA $0638                  ; $D8D5
    SEC                        ; $D8D8
    RTS                        ; $D8D9
    LDA $0625                  ; $D8DA
    ASL                        ; $D8DD
    ASL                        ; $D8DE
    ASL                        ; $D8DF
    ASL                        ; $D8E0
    CLC                        ; $D8E1
    ADC #$9A                   ; $D8E2
    STA $02FC                  ; $D8E4
    LDA #$11                   ; $D8E7
    STA $02FD                  ; $D8E9
    LDA #$03                   ; $D8EC
    STA $02FE                  ; $D8EE
    LDA #$50                   ; $D8F1
    STA $02FF                  ; $D8F3
    RTS                        ; $D8F6
    .byte $A9,$00
    STA $0430                  ; $D8F9
    STA $0625                  ; $D8FC
    PHA                        ; $D8FF
    CMP $0441                  ; $D900
    BEQ $D941                  ; $D903
    CMP #$00                   ; $D905
    BEQ $D941                  ; $D907
    CMP #$0B                   ; $D909
    BEQ $D941                  ; $D90B
    JSR $CD7C                  ; $D90D
    LDY #$06                   ; $D910
    LDA ($0034),Y              ; $D912
    TAX                        ; $D914
    LDY #$08                   ; $D915
    LDA ($0034),Y              ; $D917
    TAY                        ; $D919
    JSR $CDE2                  ; $D91A
    CMP $0624                  ; $D91D
    BNE $D941                  ; $D920
    LDX $0430                  ; $D922
    CPX #$04                   ; $D925
    BCS $D941                  ; $D927
    PLA                        ; $D929
    PHA                        ; $D92A
    CMP #$0B                   ; $D92B
    BCC $D934                  ; $D92D
    LDY $0625                  ; $D92F
    BNE $D941                  ; $D932
    STA $0431,X                ; $D934
    INC $0430                  ; $D937
    CMP #$0B                   ; $D93A
    BCS $D941                  ; $D93C
    INC $0625                  ; $D93E
    PLA                        ; $D941
    CLC                        ; $D942
    ADC #$01                   ; $D943
    CMP #$16                   ; $D945
    BNE $D8FF                  ; $D947
    LDX $0430                  ; $D949
    BNE $D954                  ; $D94C
    LDA #$1C                   ; $D94E
    JSR $EF7F                  ; $D950
    RTS                        ; $D953
    LDA $0625                  ; $D954
    BNE $D961                  ; $D957
    TXA                        ; $D959
    CLC                        ; $D95A
    ADC #$1F                   ; $D95B
    JSR $EF7F                  ; $D95D
    RTS                        ; $D960
    DEX                        ; $D961
    BNE $D970                  ; $D962
    LDA $0431                  ; $D964
    STA $05FC                  ; $D967
    LDA #$1D                   ; $D96A
    JSR $EF7F                  ; $D96C
    RTS                        ; $D96F
    TXA                        ; $D970
    CLC                        ; $D971
    ADC #$18                   ; $D972
    JSR $EF7F                  ; $D974
    RTS                        ; $D977
    .byte $60,$A9,$38
    JSR $CBB0                  ; $D97B
    LDA $043C                  ; $D97E
    BEQ $D986                  ; $D981
    JMP $D70C                  ; $D983
    JSR $E6EC                  ; $D986
    LDA #$01                   ; $D989
    STA $003A                  ; $D98B
    LDA #$00                   ; $D98D
    STA $0430                  ; $D98F
    LDA $003A                  ; $D992
    CMP $0441                  ; $D994
    BEQ $D9A9                  ; $D997
    JSR $DA3A                  ; $D999
    BCC $D9A9                  ; $D99C
    LDX $0430                  ; $D99E
    LDA $003A                  ; $D9A1
    STA $0431,X                ; $D9A3
    INC $0430                  ; $D9A6
    INC $003A                  ; $D9A9
    LDA $003A                  ; $D9AB
    CMP #$0B                   ; $D9AD
    BNE $D992                  ; $D9AF
    LDA $0430                  ; $D9B1
    BNE $D9C8                  ; $D9B4
    LDA #$11                   ; $D9B6
    JSR $EF7F                  ; $D9B8
    LDA #$01                   ; $D9BB
    JSR $CB0F                  ; $D9BD
    LDA #$C0                   ; $D9C0
    AND a: $001E               ; $D9C2
    BEQ $D9BB                  ; $D9C5
    RTS                        ; $D9C7
    LDA #$10                   ; $D9C8
    JSR $EF7F                  ; $D9CA
    LDA #$82                   ; $D9CD
    STA $062D                  ; $D9CF
    LDA #$1F                   ; $D9D2
    STA $0494                  ; $D9D4
    LDA #$00                   ; $D9D7
    JMP $DA03                  ; $D9D9
    LDA #$01                   ; $D9DC
    JSR $CB0F                  ; $D9DE
    LDA #$03                   ; $D9E1
    AND a: $001E               ; $D9E3
    BEQ $DA12                  ; $D9E6
    LDX #$01                   ; $D9E8
    LSR                        ; $D9EA
    BCS $D9EF                  ; $D9EB
    LDX #$FF                   ; $D9ED
    TXA                        ; $D9EF
    CLC                        ; $D9F0
    ADC $0625                  ; $D9F1
    BPL $D9FC                  ; $D9F4
    LDA $0430                  ; $D9F6
    SEC                        ; $D9F9
    SBC #$01                   ; $D9FA
    CMP $0430                  ; $D9FC
    BCC $DA03                  ; $D9FF
    LDA #$00                   ; $DA01
    .byte $8D,$25,$06
    TAX                        ; $DA06
    LDA $0431,X                ; $DA07
    STA $05FC                  ; $DA0A
    LDA #$1D                   ; $DA0D
    JSR $EF7F                  ; $DA0F
    LDA #$40                   ; $DA12
    AND a: $001E               ; $DA14
    BEQ $DA1A                  ; $DA17
    RTS                        ; $DA19
    LDA #$80                   ; $DA1A
    AND a: $001E               ; $DA1C
    BEQ $D9DC                  ; $DA1F
    LDA $05FC                  ; $DA21
    JSR $CD7C                  ; $DA24
    LDY #$06                   ; $DA27
    LDA ($0034),Y              ; $DA29
    TAX                        ; $DA2B
    LDY #$08                   ; $DA2C
    LDA ($0034),Y              ; $DA2E
    TAY                        ; $DA30
    JSR $CDE2                  ; $DA31
    STA $0638                  ; $DA34
    JMP $D70C                  ; $DA37
    JSR $CD7C                  ; $DA3A
    LDY #$06                   ; $DA3D
    LDA ($0034),Y              ; $DA3F
    SEC                        ; $DA41
    SBC $0635                  ; $DA42
    BCS $DA4B                  ; $DA45
    EOR #$FF                   ; $DA47
    ADC #$01                   ; $DA49
    CMP #$14                   ; $DA4B
    BCS $DA63                  ; $DA4D
    LDY #$08                   ; $DA4F
    LDA ($0034),Y              ; $DA51
    SEC                        ; $DA53
    SBC $0637                  ; $DA54
    BCS $DA5D                  ; $DA57
    EOR #$FF                   ; $DA59
    ADC #$01                   ; $DA5B
    CMP #$14                   ; $DA5D
    BCS $DA63                  ; $DA5F
    SEC                        ; $DA61
    RTS                        ; $DA62
    CLC                        ; $DA63
    RTS                        ; $DA64
    .byte $A9,$38
    JSR $CBB0                  ; $DA67
    LDA #$83                   ; $DA6A
    STA $062D                  ; $DA6C
    LDA #$00                   ; $DA6F
    STA $0624                  ; $DA71
    LDA #$01                   ; $DA74
    JSR $CB0F                  ; $DA76
    LDX $0624                  ; $DA79
    INX                        ; $DA7C
    CPX #$10                   ; $DA7D
    BCC $DA83                  ; $DA7F
    LDX #$00                   ; $DA81
    STX $0624                  ; $DA83
    LDA #$40                   ; $DA86
    AND a: $001E               ; $DA88
    BEQ $DA8E                  ; $DA8B
    RTS                        ; $DA8D
    LDA #$80                   ; $DA8E
    AND a: $001E               ; $DA90
    BEQ $DA74                  ; $DA93
    JMP $D70C                  ; $DA95
    .byte $A9,$00
    STA $062D                  ; $DA9A
    STA $0615                  ; $DA9D
    LDA #$33                   ; $DAA0
    JSR $CBB0                  ; $DAA2
    LDA #$FF                   ; $DAA5
    JMP $CEFE                  ; $DAA7
    .byte $A9,$01
    JSR $CBF1                  ; $DAAC
    JSR $CF4F                  ; $DAAF
    PHA                        ; $DAB2
    LDA $0022                  ; $DAB3
    LDA #$1A                   ; $DAB5
    STA $0024                  ; $DAB7
    LDA #$1B                   ; $DAB9
    STA $0025                  ; $DABB
    JSR $CE2D                  ; $DABD
    PLA                        ; $DAC0
    JSR $8039                  ; $DAC1
    JSR $DB24                  ; $DAC4
    LDA #$00                   ; $DAC7
    JSR $EF7F                  ; $DAC9
    LDA #$01                   ; $DACC
    JSR $EF7F                  ; $DACE
    LDA $0629                  ; $DAD1
    CMP #$04                   ; $DAD4
    BEQ $DAE9                  ; $DAD6
    LDA #$35                   ; $DAD8
    JSR $CBB0                  ; $DADA
    LDA #$01                   ; $DADD
    JSR $CB0F                  ; $DADF
    LDA a: $001C               ; $DAE2
    AND #$C0                   ; $DAE5
    BEQ $DADD                  ; $DAE7
    LDA $05FB                  ; $DAE9
    CLC                        ; $DAEC
    ADC #$08                   ; $DAED
    STA $0441                  ; $DAEF
    JSR $DC07                  ; $DAF2
    LDA a: $00E2               ; $DAF5
    AND #$07                   ; $DAF8
    CMP #$05                   ; $DAFA
    BCC $DB00                  ; $DAFC
    SBC #$05                   ; $DAFE
    TAX                        ; $DB00
    LDA $DC82,X                ; $DB01
    CLC                        ; $DB04
    ADC $05FB                  ; $DB05
    STA $05FC                  ; $DB08
    JSR $E6EC                  ; $DB0B
    LDA #$36                   ; $DB0E
    JSR $CBB0                  ; $DB10
    LDA $05FC                  ; $DB13
    STA $0441                  ; $DB16
    LDA #$01                   ; $DB19
    STA $05FD                  ; $DB1B
    LDX #$50                   ; $DB1E
    TXS                        ; $DB20
    JMP $E0DF                  ; $DB21
    LDA $0629                  ; $DB24
    JSR $CB99                  ; $DB27
    .byte $34,$DB,$9E,$DB,$FC,$DB,$F3,$DB,$03,$DC,$48
    LDA $0022                  ; $DB35
    LDA #$1C                   ; $DB37
    STA $0024                  ; $DB39
    LDA #$1D                   ; $DB3B
    STA $0025                  ; $DB3D
    JSR $CE2D                  ; $DB3F
    PLA                        ; $DB42
    JSR $8003                  ; $DB43
    LDA #$00                   ; $DB46
    STA $0447                  ; $DB48
    LDX #$00                   ; $DB4B
    LDA a: $002B               ; $DB4D
    CMP #$03                   ; $DB50
    BEQ $DB5B                  ; $DB52
    BIT a: $00E2               ; $DB54
    BPL $DB5B                  ; $DB57
    LDX #$0B                   ; $DB59
    STX $044F                  ; $DB5B
    STX $05FB                  ; $DB5E
    RTS                        ; $DB61
    .byte $A9,$0A
    LDX a: $002A               ; $DB64
    CPX #$02                   ; $DB67
    BNE $DB6D                  ; $DB69
    LDA #$14                   ; $DB6B
    PHA                        ; $DB6D
    CMP #$0B                   ; $DB6E
    BCC $DB74                  ; $DB70
    ADC #$0A                   ; $DB72
    LDX #$00                   ; $DB74
    JSR $CE08                  ; $DB76
    LDY #$00                   ; $DB79
    LDA ($0034),Y              ; $DB7B
    CMP #$20                   ; $DB7D
    BNE $DB8C                  ; $DB7F
    LDA $044D                  ; $DB81
    BEQ $DB8C                  ; $DB84
    LDA #$00                   ; $DB86
    STA $0032                  ; $DB88
    STA $0033                  ; $DB8A
    LDY #$01                   ; $DB8C
    LDA $0032                  ; $DB8E
    STA ($0034),Y              ; $DB90
    INY                        ; $DB92
    LDA $0033                  ; $DB93
    STA ($0034),Y              ; $DB95
    PLA                        ; $DB97
    SEC                        ; $DB98
    SBC #$01                   ; $DB99
    BPL $DB6D                  ; $DB9B
    RTS                        ; $DB9D
    .byte $20,$F3,$DB
    LDX #$00                   ; $DBA1
    LDA a: $002B               ; $DBA3
    CMP $DBEA,X                ; $DBA6
    BEQ $DBB4                  ; $DBA9
    INX                        ; $DBAB
    INX                        ; $DBAC
    INX                        ; $DBAD
    CPX #$09                   ; $DBAE
    BEQ $DBCB                  ; $DBB0
    BNE $DBA6                  ; $DBB2
    LDA $DBEB,X                ; $DBB4
    JSR $CD7C                  ; $DBB7
    LDY #$00                   ; $DBBA
    LDA $DBEC,X                ; $DBBC
    STA ($0034),Y              ; $DBBF
    LDA a: $002B               ; $DBC1
    CMP #$0C                   ; $DBC4
    BNE $DBCB                  ; $DBC6
    JSR $DBCC                  ; $DBC8
    RTS                        ; $DBCB
    LDA #$0C                   ; $DBCC
    PHA                        ; $DBCE
    CMP #$14                   ; $DBCF
    BEQ $DBE1                  ; $DBD1
    JSR $CD7C                  ; $DBD3
    LDY #$01                   ; $DBD6
    LDA #$80                   ; $DBD8
    STA ($0034),Y              ; $DBDA
    INY                        ; $DBDC
    LDA #$CB                   ; $DBDD
    STA ($0034),Y              ; $DBDF
    PLA                        ; $DBE1
    CLC                        ; $DBE2
    ADC #$01                   ; $DBE3
    CMP #$16                   ; $DBE5
    BNE $DBCE                  ; $DBE7
    RTS                        ; $DBE9
    .byte $23,$14,$75,$0C,$14,$34,$12,$15,$45
    LDA $044F                  ; $DBF3
    EOR #$0B                   ; $DBF6
    STA $05FB                  ; $DBF8
    RTS                        ; $DBFB
    .byte $AD,$4F,$04
    STA $05FB                  ; $DBFF
    RTS                        ; $DC02
    .byte $20,$4F,$CF
    RTS                        ; $DC06
    LDA a: $002C               ; $DC07
    ASL                        ; $DC0A
    PHA                        ; $DC0B
    ADC a: $002C               ; $DC0C
    STA $003A                  ; $DC0F
    PLA                        ; $DC11
    ASL                        ; $DC12
    ASL                        ; $DC13
    ADC $003A                  ; $DC14
    STA $003A                  ; $DC16
    LDA a: $002E               ; $DC18
    ASL                        ; $DC1B
    PHA                        ; $DC1C
    ADC a: $002E               ; $DC1D
    STA $003B                  ; $DC20
    PLA                        ; $DC22
    ASL                        ; $DC23
    ASL                        ; $DC24
    ADC $003B                  ; $DC25
    STA $003B                  ; $DC27
    LDA #$00                   ; $DC29
    .byte $48
    JSR $CD7C                  ; $DC2C
    LDX $003A                  ; $DC2F
    INC $003A                  ; $DC31
    PLA                        ; $DC33
    PHA                        ; $DC34
    CMP #$0B                   ; $DC35
    LDA $05FB                  ; $DC37
    BCC $DC42                  ; $DC3A
    LDX $003B                  ; $DC3C
    EOR #$0B                   ; $DC3E
    INC $003B                  ; $DC40
    TAY                        ; $DC42
    LDA $DC87,X                ; $DC43
    DEY                        ; $DC46
    BMI $DC4C                  ; $DC47
    LDA $DCB3,X                ; $DC49
    JSR $CDC9                  ; $DC4C
    LDA $05FB                  ; $DC4F
    BEQ $DC5E                  ; $DC52
    TYA                        ; $DC54
    EOR #$FF                   ; $DC55
    TAY                        ; $DC57
    TXA                        ; $DC58
    EOR #$FF                   ; $DC59
    TAX                        ; $DC5B
    INY                        ; $DC5C
    INX                        ; $DC5D
    TYA                        ; $DC5E
    LDY #$08                   ; $DC5F
    STA ($0034),Y              ; $DC61
    TXA                        ; $DC63
    LDY #$06                   ; $DC64
    STA ($0034),Y              ; $DC66
    PLA                        ; $DC68
    PHA                        ; $DC69
    BEQ $DC70                  ; $DC6A
    CMP #$0B                   ; $DC6C
    BNE $DC76                  ; $DC6E
    LDA #$00                   ; $DC70
    LDY #$07                   ; $DC72
    STA ($0034),Y              ; $DC74
    PLA                        ; $DC76
    CLC                        ; $DC77
    ADC #$01                   ; $DC78
    CMP #$16                   ; $DC7A
    BEQ $DC81                  ; $DC7C
    JMP $DC2B                  ; $DC7E
    RTS                        ; $DC81
    .byte $05,$06,$07,$09,$0A,$05,$3D,$46,$41,$2A,$57,$77,$5C,$71,$72,$6C
    .byte $05,$3D,$46,$41,$2A,$63,$68,$5A,$72,$59,$71,$05,$3D,$46,$35,$4C
    .byte $63,$68,$4F,$72,$5A,$71,$05,$3D,$46,$35,$37,$59,$77,$68,$72,$71
    .byte $63,$EA,$BE,$B5,$AE,$C5,$A4,$79,$9F,$97,$94,$82,$EA,$BE,$B5,$AE
    .byte $C5,$99,$92,$95,$7B,$96,$80,$EA,$B2,$A9,$BA,$96,$99,$92,$94,$7B
    .byte $95,$80,$EA,$B2,$A9,$BB,$B9,$A2,$79,$9F,$95,$97,$A4,$AD,$4E,$04
    BNE $DCEF                  ; $DCE2
    LDA a: $00E2               ; $DCE4
    AND #$01                   ; $DCE7
    CLC                        ; $DCE9
    ADC #$01                   ; $DCEA
    STA $044E                  ; $DCEC
    RTS                        ; $DCEF
    .byte $A9,$00,$8D,$3B,$04,$20,$DF,$DC,$A9,$1D,$20,$B0,$CB,$A9,$FF
    STA $061A                  ; $DCFF
    .byte $20,$81,$DD
    JSR $DD47                  ; $DD05
    PHP                        ; $DD08
    LDA #$00                   ; $DD09
    STA $061B                  ; $DD0B
    JSR $E73E                  ; $DD0E
    PLP                        ; $DD11
    BCC $DD1C                  ; $DD12
    LDA #$2D                   ; $DD14
    JSR $CBB0                  ; $DD16
    JMP $801B                  ; $DD19
    JSR $CD77                  ; $DD1C
    LDY #$0A                   ; $DD1F
    LDA ($0034),Y              ; $DD21
    BNE $DD36                  ; $DD23
    LDA #$1A                   ; $DD25
    STA $0024                  ; $DD27
    LDA #$1B                   ; $DD29
    STA $0025                  ; $DD2B
    JSR $CE2D                  ; $DD2D
    LDX #$50                   ; $DD30
    TXS                        ; $DD32
    JMP $8006                  ; $DD33
    LDA #$1A                   ; $DD36
    STA $0024                  ; $DD38
    LDA #$1B                   ; $DD3A
    STA $0025                  ; $DD3C
    JSR $CE2D                  ; $DD3E
    LDX #$50                   ; $DD41
    TXS                        ; $DD43
    JMP $8018                  ; $DD44
    LDA $043C                  ; $DD47
    BNE $DD6E                  ; $DD4A
    LDA $0635                  ; $DD4C
    LDX $05FB                  ; $DD4F
    BEQ $DD56                  ; $DD52
    EOR #$FF                   ; $DD54
    CMP #$80                   ; $DD56
    BCS $DD6E                  ; $DD58
    ADC #$4F                   ; $DD5A
    LDX $05FB                  ; $DD5C
    BEQ $DD63                  ; $DD5F
    .byte $49,$FF
    TAX                        ; $DD63
    LDY #$7C                   ; $DD64
    JSR $CDE2                  ; $DD66
    STA $0638                  ; $DD69
    SEC                        ; $DD6C
    RTS                        ; $DD6D
    LDA #$E9                   ; $DD6E
    LDX $05FB                  ; $DD70
    BEQ $DD77                  ; $DD73
    LDA #$05                   ; $DD75
    LSR a: $00E2               ; $DD77
    ADC #$00                   ; $DD7A
    STA $0638                  ; $DD7C
    CLC                        ; $DD7F
    RTS                        ; $DD80
    LDA $0635                  ; $DD81
    LDX $05FB                  ; $DD84
    BEQ $DD8E                  ; $DD87
    EOR #$FF                   ; $DD89
    CLC                        ; $DD8B
    ADC #$01                   ; $DD8C
    CMP #$A0                   ; $DD8E
    BCS $DD9E                  ; $DD90
    SEC                        ; $DD92
    SBC #$30                   ; $DD93
    LSR                        ; $DD95
    LSR                        ; $DD96
    LSR                        ; $DD97
    TAX                        ; $DD98
    LDA $DDCB,X                ; $DD99
    BNE $DDBE                  ; $DD9C
    SEC                        ; $DD9E
    SBC #$A0                   ; $DD9F
    LSR                        ; $DDA1
    LSR                        ; $DDA2
    LSR                        ; $DDA3
    STA $003A                  ; $DDA4
    LDA $0637                  ; $DDA6
    BPL $DDAD                  ; $DDA9
    EOR #$FF                   ; $DDAB
    SEC                        ; $DDAD
    SBC #$50                   ; $DDAE
    AND #$38                   ; $DDB0
    LSR                        ; $DDB2
    STA $003B                  ; $DDB3
    LSR                        ; $DDB5
    ADC $003B                  ; $DDB6
    ADC $003A                  ; $DDB8
    TAX                        ; $DDBA
    LDA $DDD9,X                ; $DDBB
    STA $062B                  ; $DDBE
    ASL                        ; $DDC1
    ASL                        ; $DDC2
    ASL                        ; $DDC3
    ADC $062B                  ; $DDC4
    STA $062B                  ; $DDC7
    RTS                        ; $DDCA
    .byte $13,$12,$11,$10,$0F,$0E,$0D,$0C,$0B,$0A,$09,$08,$07,$06,$05,$05
    .byte $05,$05,$05,$05,$05,$04,$04,$04,$04,$04,$05,$04,$03,$03,$03,$03
    .byte $05,$04,$03,$02,$02,$02,$05,$04,$03,$02,$01,$01,$05,$04,$03,$02
    .byte $01,$00,$AD,$E2,$00
    AND #$07                   ; $DE00
    CMP #$06                   ; $DE02
    BCC $DE08                  ; $DE04
    SBC #$06                   ; $DE06
    CLC                        ; $DE08
    ADC #$05                   ; $DE09
    ADC $05FB                  ; $DE0B
    STA $05FC                  ; $DE0E
    LDA $05FB                  ; $DE11
    STA $0441                  ; $DE14
    JSR $E6EC                  ; $DE17
    LDY #$0A                   ; $DE1A
    LDA #$00                   ; $DE1C
    STA ($0034),Y              ; $DE1E
    LDA #$00                   ; $DE20
    STA $0628                  ; $DE22
    STA $044E                  ; $DE25
    JSR $DCDF                  ; $DE28
    LDA #$01                   ; $DE2B
    STA $043B                  ; $DE2D
    LDA #$00                   ; $DE30
    STA $043C                  ; $DE32
    JSR $D093                  ; $DE35
    LDA #$3A                   ; $DE38
    JSR $CBB0                  ; $DE3A
    LDA #$1A                   ; $DE3D
    STA $061A                  ; $DE3F
    JMP $DE5E                  ; $DE42
    .byte $A9,$01,$8D,$3B,$04,$20,$DF,$DC,$A9,$18,$20,$B0,$CB,$A9,$FF
    BIT $0628                  ; $DE54
    BPL $DE5B                  ; $DE57
    LDA #$26                   ; $DE59
    STA $061A                  ; $DE5B
    .byte $20,$59,$E0
    JSR $DF8B                  ; $DE61
    LDA #$01                   ; $DE64
    STA $061B                  ; $DE66
    JSR $E73E                  ; $DE69
    .byte $AD,$FC,$05
    CMP #$FF                   ; $DE6F
    BEQ $DE96                  ; $DE71
    STA $0441                  ; $DE73
    JSR $E6EC                  ; $DE76
    PHA                        ; $DE79
    LDA $0022                  ; $DE7A
    LDA #$1A                   ; $DE7C
    STA $0024                  ; $DE7E
    LDA #$1B                   ; $DE80
    STA $0025                  ; $DE82
    JSR $CE2D                  ; $DE84
    PLA                        ; $DE87
    JSR $801E                  ; $DE88
    LDA #$1C                   ; $DE8B
    JSR $CBB0                  ; $DE8D
    LDX #$50                   ; $DE90
    TXS                        ; $DE92
    JMP $E0DF                  ; $DE93
    .byte $AD,$2B,$06
    STA $0430                  ; $DE99
    LDA #$01                   ; $DE9C
    STA $05FF                  ; $DE9E
    LDA $05FB                  ; $DEA1
    JSR $DF4A                  ; $DEA4
    STA $0431                  ; $DEA7
    LDA $05FB                  ; $DEAA
    EOR #$0B                   ; $DEAD
    JSR $DF4A                  ; $DEAF
    STA $0432                  ; $DEB2
    LDA $0431                  ; $DEB5
    LDX #$23                   ; $DEB8
    JSR $DF29                  ; $DEBA
    LDA $0431                  ; $DEBD
    BCS $DEDC                  ; $DEC0
    LDA $0432                  ; $DEC2
    LDX #$24                   ; $DEC5
    JSR $DF29                  ; $DEC7
    LDA $0432                  ; $DECA
    BCS $DEDC                  ; $DECD
    DEC $0430                  ; $DECF
    BNE $DEB5                  ; $DED2
    LDA #$34                   ; $DED4
    JSR $CBB0                  ; $DED6
    JMP $801B                  ; $DED9
    LDX #$00                   ; $DEDC
    CMP #$0B                   ; $DEDE
    BCC $DEE4                  ; $DEE0
    LDX #$0B                   ; $DEE2
    STA $0441                  ; $DEE4
    LDY #$1C                   ; $DEE7
    TXA                        ; $DEE9
    EOR $05FB                  ; $DEEA
    STX $05FB                  ; $DEED
    BEQ $DEF7                  ; $DEF0
    JSR $D093                  ; $DEF2
    LDY #$3E                   ; $DEF5
    TYA                        ; $DEF7
    PHA                        ; $DEF8
    LDA $0441                  ; $DEF9
    JSR $CD7C                  ; $DEFC
    LDA $0635                  ; $DEFF
    LDY #$06                   ; $DF02
    STA ($0034),Y              ; $DF04
    LDA $0637                  ; $DF06
    LDY #$08                   ; $DF09
    STA ($0034),Y              ; $DF0B
    PHA                        ; $DF0D
    LDA $0022                  ; $DF0E
    LDA #$1A                   ; $DF10
    STA $0024                  ; $DF12
    LDA #$1B                   ; $DF14
    STA $0025                  ; $DF16
    JSR $CE2D                  ; $DF18
    PLA                        ; $DF1B
    JSR $801E                  ; $DF1C
    PLA                        ; $DF1F
    JSR $CBB0                  ; $DF20
    LDX #$50                   ; $DF23
    TXS                        ; $DF25
    JMP $E0DF                  ; $DF26
    JSR $CE08                  ; $DF29
    LDA #$01                   ; $DF2C
    STA $05FF                  ; $DF2E
    JSR $E854                  ; $DF31
    LDY #$06                   ; $DF34
    LDA ($0034),Y              ; $DF36
    TAX                        ; $DF38
    LDY #$08                   ; $DF39
    LDA ($0034),Y              ; $DF3B
    TAY                        ; $DF3D
    JSR $CDE2                  ; $DF3E
    CMP $05FE                  ; $DF41
    BNE $DF48                  ; $DF44
    SEC                        ; $DF46
    RTS                        ; $DF47
    CLC                        ; $DF48
    RTS                        ; $DF49
    JSR $CE99                  ; $DF4A
    PHA                        ; $DF4D
    JSR $CD7C                  ; $DF4E
    LDA $05FE                  ; $DF51
    LDY #$09                   ; $DF54
    STA ($0034),Y              ; $DF56
    PLA                        ; $DF58
    RTS                        ; $DF59
    .byte $20,$7C,$CD,$A0,$0A,$B1,$34,$D0,$26,$A0,$06,$B1,$34,$38,$ED,$35
    .byte $06,$B0,$04,$49,$FF,$69,$01,$C5,$3B,$B0,$14,$A0,$08,$B1,$34,$38
    .byte $ED,$37,$06,$B0,$04,$49,$FF,$69,$01,$C5,$3B,$B0,$02,$38,$60,$18
    .byte $60
    LDA $0638                  ; $DF8B
    JSR $CDC9                  ; $DF8E
    TXA                        ; $DF91
    SEC                        ; $DF92
    SBC $0635                  ; $DF93
    BCS $DF9C                  ; $DF96
    EOR #$FF                   ; $DF98
    ADC #$01                   ; $DF9A
    STA $003A                  ; $DF9C
    TYA                        ; $DF9E
    SEC                        ; $DF9F
    SBC $0637                  ; $DFA0
    BCS $DFA9                  ; $DFA3
    EOR #$FF                   ; $DFA5
    ADC #$01                   ; $DFA7
    TAY                        ; $DFA9
    SEC                        ; $DFAA
    SBC $003A                  ; $DFAB
    BCS $DFB1                  ; $DFAD
    LDY $003A                  ; $DFAF
    TYA                        ; $DFB1
    LSR                        ; $DFB2
    LSR                        ; $DFB3
    LSR                        ; $DFB4
    TAX                        ; $DFB5
    LDA $DFBD,X                ; $DFB6
    STA $062B                  ; $DFB9
    RTS                        ; $DFBC
    .byte $02,$03,$03,$03,$03,$04,$04,$04,$04,$04,$04,$05,$05,$05,$05,$05
    .byte $05,$05,$05,$05,$20,$DF,$DC,$A9,$19,$20,$B0,$CB,$20,$59,$E0
    LDA #$FF                   ; $DFDC
    STA $061A                  ; $DFDE
    LDA #$01                   ; $DFE1
    STA $061B                  ; $DFE3
    JSR $E73E                  ; $DFE6
    LDA #$1A                   ; $DFE9
    JSR $CBB0                  ; $DFEB
    LDA $0441                  ; $DFEE
    JSR $CD7C                  ; $DFF1
    LDA $0443                  ; $DFF4
    ASL                        ; $DFF7
    ASL                        ; $DFF8
    ASL                        ; $DFF9
    LDX $05FB                  ; $DFFA
    BEQ $E004                  ; $DFFD
    .byte $49
