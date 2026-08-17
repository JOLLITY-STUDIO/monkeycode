; bank_28.asm 分片 2/7 (原文件行 1001-2000, 共 6754 行)

C - - - - - 0x03860D 0E:85FD: AD 31 04  LDA ram_0431
C - - - - - 0x038610 0E:8600: 8D 3E 04  STA ram_043E
C - - - - - 0x038613 0E:8603: 60        RTS
- D 0 - - - 0x038614 0E:8604: 00        .byte $00   ; 
- D 0 - - - 0x038615 0E:8605: 01        .byte $01   ; 
- - - - - - 0x038616 0E:8606: FF        .byte $FF   ; 
- D 0 - - - 0x038617 0E:8607: 02        .byte $02   ; 
- D 0 - - - 0x038618 0E:8608: 00        .byte $00   ; 
C D 0 - - - 0x038619 0E:8609: AD FB 05  LDA ram_05FB
C - - - - - 0x03861C 0E:860C: F0 03     BEQ $8611
C - - - - - 0x03861E 0E:860E: 4C 5D 87  JMP $875D
C - - - - - 0x038621 0E:8611: AD 00 06  LDA ram_0600
C - - - - - 0x038624 0E:8614: F0 28     BEQ $863E
C - - - - - 0x038626 0E:8616: A9 00     LDA #$00
C - - - - - 0x038628 0E:8618: 48        PHA
C - - - - - 0x038629 0E:8619: A9 01     LDA #$01
C - - - - - 0x03862B 0E:861B: 20 15 C5  JSR $C515
C - - - - - 0x03862E 0E:861E: 68        PLA
C - - - - - 0x03862F 0E:861F: 48        PHA
C - - - - - 0x038630 0E:8620: 85 40     STA ram_0040
C - - - - - 0x038632 0E:8622: AA        TAX
C - - - - - 0x038633 0E:8623: BD 01 06  LDA ram_0601,X
C - - - - - 0x038636 0E:8626: 20 3F 86  JSR $863F
C - - - - - 0x038639 0E:8629: 68        PLA
C - - - - - 0x03863A 0E:862A: AA        TAX
C - - - - - 0x03863B 0E:862B: AD 3D 04  LDA ram_043D
C - - - - - 0x03863E 0E:862E: 9D 0B 06  STA ram_060B,X
C - - - - - 0x038641 0E:8631: AD 3E 04  LDA ram_043E
C - - - - - 0x038644 0E:8634: 9D 06 06  STA ram_0606,X
C - - - - - 0x038647 0E:8637: E8        INX
C - - - - - 0x038648 0E:8638: 8A        TXA
C - - - - - 0x038649 0E:8639: CD 00 06  CMP ram_0600
C - - - - - 0x03864C 0E:863C: D0 DA     BNE $8618
C - - - - - 0x03864E 0E:863E: 60        RTS
C - - - - - 0x03864F 0E:863F: 8D 42 04  STA ram_0442
C - - - - - 0x038652 0E:8642: 20 62 8A  JSR $8A62
C - - - - - 0x038655 0E:8645: A9 00     LDA #$00
C - - - - - 0x038657 0E:8647: 85 3C     STA ram_003C
C - - - - - 0x038659 0E:8649: AD 42 04  LDA ram_0442
C - - - - - 0x03865C 0E:864C: C9 0B     CMP #$0B
C - - - - - 0x03865E 0E:864E: D0 03     BNE $8653
C - - - - - 0x038660 0E:8650: 4C B5 85  JMP $85B5
C - - - - - 0x038663 0E:8653: AC 21 06  LDY ram_0621
C - - - - - 0x038666 0E:8656: B9 B5 86  LDA $86B5,Y
C - - - - - 0x038669 0E:8659: 85 3C     STA ram_003C
C - - - - - 0x03866B 0E:865B: F0 06     BEQ $8663
C - - - - - 0x03866D 0E:865D: 20 B3 8A  JSR $8AB3
C - - - - - 0x038670 0E:8660: 4C 8E 86  JMP $868E
C - - - - - 0x038673 0E:8663: AD 35 06  LDA ram_0635
C - - - - - 0x038676 0E:8666: 49 FF     EOR #$FF
C - - - - - 0x038678 0E:8668: AA        TAX
C - - - - - 0x038679 0E:8669: A9 14     LDA #$14
C - - - - - 0x03867B 0E:866B: E0 A0     CPX #$A0
C - - - - - 0x03867D 0E:866D: B0 1F     BCS $868E
C - - - - - 0x03867F 0E:866F: A9 10     LDA #$10
C - - - - - 0x038681 0E:8671: E0 60     CPX #$60
C - - - - - 0x038683 0E:8673: B0 19     BCS $868E
C - - - - - 0x038685 0E:8675: AD 37 06  LDA ram_0637
C - - - - - 0x038688 0E:8678: 10 02     BPL $867C
C - - - - - 0x03868A 0E:867A: 49 FF     EOR #$FF
C - - - - - 0x03868C 0E:867C: A8        TAY
C - - - - - 0x03868D 0E:867D: 20 39 C5  JSR $C539
C - - - - - 0x038690 0E:8680: A2 00     LDX #$00
C - - - - - 0x038692 0E:8682: DD BE 8B  CMP $8BBE,X
C - - - - - 0x038695 0E:8685: F0 04     BEQ $868B
C - - - - - 0x038697 0E:8687: E8        INX
C - - - - - 0x038698 0E:8688: E8        INX
C - - - - - 0x038699 0E:8689: D0 F7     BNE $8682
C - - - - - 0x03869B 0E:868B: BD BF 8B  LDA $8BBF,X
C D 0 - - - 0x03869E 0E:868E: A0 07     LDY #$07
C - - - - - 0x0386A0 0E:8690: 20 DE 8A  JSR $8ADE
C - - - - - 0x0386A3 0E:8693: 18        CLC
C - - - - - 0x0386A4 0E:8694: A5 3C     LDA ram_003C
C - - - - - 0x0386A6 0E:8696: 69 AE     ADC #$AE
C - - - - - 0x0386A8 0E:8698: 85 3C     STA ram_003C
C - - - - - 0x0386AA 0E:869A: 8A        TXA
C - - - - - 0x0386AB 0E:869B: 69 B8     ADC #$B8
C - - - - - 0x0386AD 0E:869D: 85 3D     STA ram_003D
C - - - - - 0x0386AF 0E:869F: 20 0B 8B  JSR $8B0B
C - - - - - 0x0386B2 0E:86A2: 8D 3D 04  STA ram_043D
C - - - - - 0x0386B5 0E:86A5: A9 00     LDA #$00
C - - - - - 0x0386B7 0E:86A7: 8D 3E 04  STA ram_043E
C - - - - - 0x0386BA 0E:86AA: A5 3F     LDA ram_003F
C - - - - - 0x0386BC 0E:86AC: 20 09 C5  JSR $C509
- D 0 - I - 0x0386BF 0E:86AF: BA        .byte $BA   ; 
- D 0 - I - 0x0386C0 0E:86B0: 86        .byte $86   ; 
- D 0 - I - 0x0386C1 0E:86B1: EB        .byte $EB   ; 
- D 0 - I - 0x0386C2 0E:86B2: 86        .byte $86   ; 
- D 0 - I - 0x0386C3 0E:86B3: 10        .byte $10   ; 
- D 0 - I - 0x0386C4 0E:86B4: 87        .byte $87   ; 
- D 0 - - - 0x0386C5 0E:86B5: 00        .byte $00   ; 
- D 0 - - - 0x0386C6 0E:86B6: 02        .byte $02   ; 
- D 0 - - - 0x0386C7 0E:86B7: 01        .byte $01   ; 
- - - - - - 0x0386C8 0E:86B8: 00        .byte $00   ; 
- - - - - - 0x0386C9 0E:86B9: 00        .byte $00   ; 
C - - J - - 0x0386CA 0E:86BA: AD 3D 04  LDA ram_043D
C - - - - - 0x0386CD 0E:86BD: 20 09 C5  JSR $C509
- D 0 - I - 0x0386D0 0E:86C0: C8        .byte $C8   ; 
- D 0 - I - 0x0386D1 0E:86C1: 86        .byte $86   ; 
- D 0 - I - 0x0386D2 0E:86C2: D0        .byte $D0   ; 
- D 0 - I - 0x0386D3 0E:86C3: 86        .byte $86   ; 
- D 0 - I - 0x0386D4 0E:86C4: D8        .byte $D8   ; 
- D 0 - I - 0x0386D5 0E:86C5: 86        .byte $86   ; 
- D 0 - I - 0x0386D6 0E:86C6: E0        .byte $E0   ; 
- D 0 - I - 0x0386D7 0E:86C7: 86        .byte $86   ; 
C - - J - - 0x0386D8 0E:86C8: A9 01     LDA #$01
C - - - - - 0x0386DA 0E:86CA: 8D 3D 04  STA ram_043D
C - - - - - 0x0386DD 0E:86CD: 4C 32 87  JMP $8732
C D 0 J - - 0x0386E0 0E:86D0: A9 02     LDA #$02
C - - - - - 0x0386E2 0E:86D2: 8D 3D 04  STA ram_043D
C - - - - - 0x0386E5 0E:86D5: 4C 32 87  JMP $8732
C - - J - - 0x0386E8 0E:86D8: A9 00     LDA #$00
C - - - - - 0x0386EA 0E:86DA: 8D 3D 04  STA ram_043D
C - - - - - 0x0386ED 0E:86DD: 4C 32 87  JMP $8732
C - - J - - 0x0386F0 0E:86E0: A9 01     LDA #$01
C - - - - - 0x0386F2 0E:86E2: 8D 3D 04  STA ram_043D
C - - - - - 0x0386F5 0E:86E5: A9 05     LDA #$05
C - - - - - 0x0386F7 0E:86E7: 8D 3E 04  STA ram_043E
C - - - - - 0x0386FA 0E:86EA: 60        RTS
C - - J - - 0x0386FB 0E:86EB: AD 3D 04  LDA ram_043D
C - - - - - 0x0386FE 0E:86EE: 20 09 C5  JSR $C509
- D 0 - I - 0x038701 0E:86F1: F9        .byte $F9   ; 
- D 0 - I - 0x038702 0E:86F2: 86        .byte $86   ; 
- D 0 - I - 0x038703 0E:86F3: FF        .byte $FF   ; 
- D 0 - I - 0x038704 0E:86F4: 86        .byte $86   ; 
- D 0 - I - 0x038705 0E:86F5: 05        .byte $05   ; 
- D 0 - I - 0x038706 0E:86F6: 87        .byte $87   ; 
- D 0 - I - 0x038707 0E:86F7: 08        .byte $08   ; 
- D 0 - I - 0x038708 0E:86F8: 87        .byte $87   ; 
C D 0 - - - 0x038709 0E:86F9: A9 05     LDA #$05
C - - - - - 0x03870B 0E:86FB: 8D 3D 04  STA ram_043D
C - - - - - 0x03870E 0E:86FE: 60        RTS
C D 0 J - - 0x03870F 0E:86FF: A9 04     LDA #$04
C - - - - - 0x038711 0E:8701: 8D 3D 04  STA ram_043D
C - - - - - 0x038714 0E:8704: 60        RTS
C - - J - - 0x038715 0E:8705: 4C D0 86  JMP $86D0
C - - J - - 0x038718 0E:8708: A9 01     LDA #$01
C - - - - - 0x03871A 0E:870A: 8D 3E 04  STA ram_043E
C - - - - - 0x03871D 0E:870D: 4C FF 86  JMP $86FF
C - - J - - 0x038720 0E:8710: AD 3D 04  LDA ram_043D
C - - - - - 0x038723 0E:8713: 20 09 C5  JSR $C509
- D 0 - I - 0x038726 0E:8716: 1E        .byte $1E   ; 
- D 0 - I - 0x038727 0E:8717: 87        .byte $87   ; 
- D 0 - I - 0x038728 0E:8718: 21        .byte $21   ; 
- D 0 - I - 0x038729 0E:8719: 87        .byte $87   ; 
- D 0 - I - 0x03872A 0E:871A: 27        .byte $27   ; 
- D 0 - I - 0x03872B 0E:871B: 87        .byte $87   ; 
- D 0 - I - 0x03872C 0E:871C: 2A        .byte $2A   ; 
- D 0 - I - 0x03872D 0E:871D: 87        .byte $87   ; 
C - - J - - 0x03872E 0E:871E: 4C F9 86  JMP $86F9
C D 0 J - - 0x038731 0E:8721: A9 03     LDA #$03
C - - - - - 0x038733 0E:8723: 8D 3D 04  STA ram_043D
C - - - - - 0x038736 0E:8726: 60        RTS
C - - J - - 0x038737 0E:8727: 4C D0 86  JMP $86D0
C - - J - - 0x03873A 0E:872A: A9 01     LDA #$01
C - - - - - 0x03873C 0E:872C: 8D 3E 04  STA ram_043E
C - - - - - 0x03873F 0E:872F: 4C 21 87  JMP $8721
C D 0 - - - 0x038742 0E:8732: AD 42 04  LDA ram_0442
C - - - - - 0x038745 0E:8735: AE 3D 04  LDX ram_043D
C - - - - - 0x038748 0E:8738: 20 58 8D  JSR $8D58
C - - - - - 0x03874B 0E:873B: AD 30 04  LDA ram_0430
C - - - - - 0x03874E 0E:873E: F0 03     BEQ $8743
C - - - - - 0x038750 0E:8740: AD 31 04  LDA ram_0431
C - - - - - 0x038753 0E:8743: 8D 3E 04  STA ram_043E
C - - - - - 0x038756 0E:8746: 60        RTS
- - - - - - 0x038757 0E:8747: 03        .byte $03   ; 
- - - - - - 0x038758 0E:8748: 04        .byte $04   ; 
- - - - - - 0x038759 0E:8749: 04        .byte $04   ; 
- - - - - - 0x03875A 0E:874A: 04        .byte $04   ; 
- - - - - - 0x03875B 0E:874B: 04        .byte $04   ; 
- - - - - - 0x03875C 0E:874C: 05        .byte $05   ; 
- - - - - - 0x03875D 0E:874D: 06        .byte $06   ; 
- - - - - - 0x03875E 0E:874E: 05        .byte $05   ; 
- - - - - - 0x03875F 0E:874F: 06        .byte $06   ; 
- - - - - - 0x038760 0E:8750: 05        .byte $05   ; 
- - - - - - 0x038761 0E:8751: 06        .byte $06   ; 
- - - - - - 0x038762 0E:8752: 00        .byte $00   ; 
- - - - - - 0x038763 0E:8753: 06        .byte $06   ; 
- - - - - - 0x038764 0E:8754: 06        .byte $06   ; 
- - - - - - 0x038765 0E:8755: 06        .byte $06   ; 
- - - - - - 0x038766 0E:8756: 06        .byte $06   ; 
- - - - - - 0x038767 0E:8757: 07        .byte $07   ; 
- - - - - - 0x038768 0E:8758: 08        .byte $08   ; 
- - - - - - 0x038769 0E:8759: 07        .byte $07   ; 
- - - - - - 0x03876A 0E:875A: 08        .byte $08   ; 
- - - - - - 0x03876B 0E:875B: 07        .byte $07   ; 
- - - - - - 0x03876C 0E:875C: 08        .byte $08   ; 
C D 0 - - - 0x03876D 0E:875D: AD 41 04  LDA ram_0441
C - - - - - 0x038770 0E:8760: 20 62 8A  JSR $8A62
C - - - - - 0x038773 0E:8763: AC 21 06  LDY ram_0621
C - - - - - 0x038776 0E:8766: B9 C3 87  LDA $87C3,Y
C - - - - - 0x038779 0E:8769: 85 3C     STA ram_003C
C - - - - - 0x03877B 0E:876B: F0 06     BEQ $8773
C - - - - - 0x03877D 0E:876D: 20 B3 8A  JSR $8AB3
C - - - - - 0x038780 0E:8770: 4C 9C 87  JMP $879C
C - - - - - 0x038783 0E:8773: A9 14     LDA #$14
C - - - - - 0x038785 0E:8775: AE 35 06  LDX ram_0635
C - - - - - 0x038788 0E:8778: E0 A0     CPX #$A0
C - - - - - 0x03878A 0E:877A: B0 20     BCS $879C
C - - - - - 0x03878C 0E:877C: A9 10     LDA #$10
C - - - - - 0x03878E 0E:877E: E0 60     CPX #$60
C - - - - - 0x038790 0E:8780: B0 1A     BCS $879C
C - - - - - 0x038792 0E:8782: AC 37 06  LDY ram_0637
C - - - - - 0x038795 0E:8785: 10 04     BPL $878B
C - - - - - 0x038797 0E:8787: 98        TYA
C - - - - - 0x038798 0E:8788: 49 FF     EOR #$FF
C - - - - - 0x03879A 0E:878A: A8        TAY
C - - - - - 0x03879B 0E:878B: 20 39 C5  JSR $C539
C - - - - - 0x03879E 0E:878E: A2 00     LDX #$00
C - - - - - 0x0387A0 0E:8790: DD BE 8B  CMP $8BBE,X
C - - - - - 0x0387A3 0E:8793: F0 04     BEQ $8799
C - - - - - 0x0387A5 0E:8795: E8        INX
C - - - - - 0x0387A6 0E:8796: E8        INX
C - - - - - 0x0387A7 0E:8797: D0 F7     BNE $8790
C - - - - - 0x0387A9 0E:8799: BD BF 8B  LDA $8BBF,X
C D 0 - - - 0x0387AC 0E:879C: A0 04     LDY #$04
C - - - - - 0x0387AE 0E:879E: 20 DE 8A  JSR $8ADE
C - - - - - 0x0387B1 0E:87A1: 18        CLC
C - - - - - 0x0387B2 0E:87A2: A5 3C     LDA ram_003C
C - - - - - 0x0387B4 0E:87A4: 69 2E     ADC #$2E
C - - - - - 0x0387B6 0E:87A6: 85 3C     STA ram_003C
C - - - - - 0x0387B8 0E:87A8: 8A        TXA
C - - - - - 0x0387B9 0E:87A9: 69 B1     ADC #$B1
C - - - - - 0x0387BB 0E:87AB: 85 3D     STA ram_003D
C - - - - - 0x0387BD 0E:87AD: 20 0B 8B  JSR $8B0B
C - - - - - 0x0387C0 0E:87B0: 8D 3B 04  STA ram_043B
C - - - - - 0x0387C3 0E:87B3: A9 00     LDA #$00
C - - - - - 0x0387C5 0E:87B5: 8D 3C 04  STA ram_043C
C - - - - - 0x0387C8 0E:87B8: A5 3F     LDA ram_003F
C - - - - - 0x0387CA 0E:87BA: 20 09 C5  JSR $C509
- D 0 - I - 0x0387CD 0E:87BD: C7        .byte $C7   ; 
- D 0 - I - 0x0387CE 0E:87BE: 87        .byte $87   ; 
- D 0 - I - 0x0387CF 0E:87BF: DA        .byte $DA   ; 
- D 0 - I - 0x0387D0 0E:87C0: 88        .byte $88   ; 
- D 0 - I - 0x0387D1 0E:87C1: FD        .byte $FD   ; 
- D 0 - I - 0x0387D2 0E:87C2: 88        .byte $88   ; 
- D 0 - - - 0x0387D3 0E:87C3: 00        .byte $00   ; 
- D 0 - - - 0x0387D4 0E:87C4: 01        .byte $01   ; 
- D 0 - - - 0x0387D5 0E:87C5: 02        .byte $02   ; 
- D 0 - - - 0x0387D6 0E:87C6: 00        .byte $00   ; 
C - - J - - 0x0387D7 0E:87C7: AD 3B 04  LDA ram_043B
C - - - - - 0x0387DA 0E:87CA: 20 09 C5  JSR $C509
- - - - - - 0x0387DD 0E:87CD: DF        .byte $DF   ; 
- - - - - - 0x0387DE 0E:87CE: 87        .byte $87   ; 
- D 0 - I - 0x0387DF 0E:87CF: E9        .byte $E9   ; 
- D 0 - I - 0x0387E0 0E:87D0: 87        .byte $87   ; 
- D 0 - I - 0x0387E1 0E:87D1: EF        .byte $EF   ; 
- D 0 - I - 0x0387E2 0E:87D2: 87        .byte $87   ; 
- D 0 - I - 0x0387E3 0E:87D3: F2        .byte $F2   ; 
- D 0 - I - 0x0387E4 0E:87D4: 87        .byte $87   ; 
- D 0 - I - 0x0387E5 0E:87D5: FA        .byte $FA   ; 
- D 0 - I - 0x0387E6 0E:87D6: 87        .byte $87   ; 
- D 0 - I - 0x0387E7 0E:87D7: 4A        .byte $4A   ; <J>
- D 0 - I - 0x0387E8 0E:87D8: 88        .byte $88   ; 
- D 0 - I - 0x0387E9 0E:87D9: 55        .byte $55   ; <U>
- D 0 - I - 0x0387EA 0E:87DA: 88        .byte $88   ; 
- D 0 - I - 0x0387EB 0E:87DB: 60        .byte $60   ; 
- D 0 - I - 0x0387EC 0E:87DC: 88        .byte $88   ; 
- D 0 - I - 0x0387ED 0E:87DD: A8        .byte $A8   ; 
- D 0 - I - 0x0387EE 0E:87DE: 88        .byte $88   ; 
- - - - - - 0x0387EF 0E:87DF: AD        .byte $AD   ; 
- - - - - - 0x0387F0 0E:87E0: E2        .byte $E2   ; 
- - - - - - 0x0387F1 0E:87E1: 00        .byte $00   ; 
- - - - - - 0x0387F2 0E:87E2: 29        .byte $29   ; 
- - - - - - 0x0387F3 0E:87E3: 20        .byte $20   ; 
- - - - - - 0x0387F4 0E:87E4: D0        .byte $D0   ; 
- - - - - - 0x0387F5 0E:87E5: 03        .byte $03   ; 
- - - - - - 0x0387F6 0E:87E6: 4C        .byte $4C   ; <L>
- - - - - - 0x0387F7 0E:87E7: 27        .byte $27   ; 
- - - - - - 0x0387F8 0E:87E8: 89        .byte $89   ; 
C - - J - - 0x0387F9 0E:87E9: 20 27 89  JSR $8927
C - - - - - 0x0387FC 0E:87EC: 4C 3F 8A  JMP $8A3F
C - - J - - 0x0387FF 0E:87EF: 4C 33 89  JMP $8933
C D 0 J - - 0x038802 0E:87F2: A9 02     LDA #$02
C - - - - - 0x038804 0E:87F4: 8D 3B 04  STA ram_043B
C - - - - - 0x038807 0E:87F7: 4C 3F 8A  JMP $8A3F
C - - J - - 0x03880A 0E:87FA: A9 03     LDA #$03
C - - - - - 0x03880C 0E:87FC: 8D 3B 04  STA ram_043B
C - - - - - 0x03880F 0E:87FF: 20 3F 8A  JSR $8A3F
C - - - - - 0x038812 0E:8802: AD 3C 04  LDA ram_043C
C - - - - - 0x038815 0E:8805: D0 42     BNE $8849
C - - - - - 0x038817 0E:8807: A9 0C     LDA #$0C
C - - - - - 0x038819 0E:8809: 85 3A     STA ram_003A
C - - - - - 0x03881B 0E:880B: A5 3A     LDA ram_003A
C - - - - - 0x03881D 0E:880D: CD 41 04  CMP ram_0441
C - - - - - 0x038820 0E:8810: F0 27     BEQ $8839
C - - - - - 0x038822 0E:8812: 20 0C C5  JSR $C50C
C - - - - - 0x038825 0E:8815: A0 06     LDY #$06
C - - - - - 0x038827 0E:8817: B1 34     LDA (ram_0034),Y
C - - - - - 0x038829 0E:8819: 38        SEC
C - - - - - 0x03882A 0E:881A: ED 35 06  SBC ram_0635
C - - - - - 0x03882D 0E:881D: B0 04     BCS $8823
C - - - - - 0x03882F 0E:881F: 49 FF     EOR #$FF
C - - - - - 0x038831 0E:8821: 69 01     ADC #$01
C - - - - - 0x038833 0E:8823: C9 14     CMP #$14
C - - - - - 0x038835 0E:8825: B0 12     BCS $8839
C - - - - - 0x038837 0E:8827: A0 08     LDY #$08
C - - - - - 0x038839 0E:8829: B1 34     LDA (ram_0034),Y
C - - - - - 0x03883B 0E:882B: 38        SEC
C - - - - - 0x03883C 0E:882C: ED 37 06  SBC ram_0637
C - - - - - 0x03883F 0E:882F: B0 04     BCS $8835
C - - - - - 0x038841 0E:8831: 49 FF     EOR #$FF
C - - - - - 0x038843 0E:8833: 69 01     ADC #$01
C - - - - - 0x038845 0E:8835: C9 14     CMP #$14
C - - - - - 0x038847 0E:8837: 90 0B     BCC $8844
C - - - - - 0x038849 0E:8839: E6 3A     INC ram_003A
C - - - - - 0x03884B 0E:883B: A5 3A     LDA ram_003A
C - - - - - 0x03884D 0E:883D: C9 16     CMP #$16
C - - - - - 0x03884F 0E:883F: D0 CA     BNE $880B
C - - - - - 0x038851 0E:8841: 4C F2 87  JMP $87F2
C - - - - - 0x038854 0E:8844: A5 3A     LDA ram_003A
C - - - - - 0x038856 0E:8846: 20 09 8A  JSR $8A09
C - - - - - 0x038859 0E:8849: 60        RTS
C - - J - - 0x03885A 0E:884A: A9 00     LDA #$00
C - - - - - 0x03885C 0E:884C: 8D 3B 04  STA ram_043B
C - - - - - 0x03885F 0E:884F: A9 0C     LDA #$0C
C - - - - - 0x038861 0E:8851: 8D 3C 04  STA ram_043C
C - - - - - 0x038864 0E:8854: 60        RTS
C - - J - - 0x038865 0E:8855: A9 00     LDA #$00
C - - - - - 0x038867 0E:8857: 8D 3B 04  STA ram_043B
C - - - - - 0x03886A 0E:885A: A9 0D     LDA #$0D
C - - - - - 0x03886C 0E:885C: 8D 3C 04  STA ram_043C
C - - - - - 0x03886F 0E:885F: 60        RTS
C - - J - - 0x038870 0E:8860: A9 02     LDA #$02
C - - - - - 0x038872 0E:8862: 8D 3B 04  STA ram_043B
C - - - - - 0x038875 0E:8865: 2C 4B 04  BIT ram_044B
C - - - - - 0x038878 0E:8868: 30 3D     BMI $88A7
C - - - - - 0x03887A 0E:886A: A9 80     LDA #$80
C - - - - - 0x03887C 0E:886C: 8D 4B 04  STA ram_044B
C - - - - - 0x03887F 0E:886F: A9 0C     LDA #$0C
C - - - - - 0x038881 0E:8871: 48        PHA
C - - - - - 0x038882 0E:8872: 20 0C C5  JSR $C50C
C - - - - - 0x038885 0E:8875: A0 01     LDY #$01
C - - - - - 0x038887 0E:8877: A9 80     LDA #$80
C - - - - - 0x038889 0E:8879: 91 34     STA (ram_0034),Y
C - - - - - 0x03888B 0E:887B: C8        INY
C - - - - - 0x03888C 0E:887C: A9 C8     LDA #$C8
C - - - - - 0x03888E 0E:887E: 91 34     STA (ram_0034),Y
C - - - - - 0x038890 0E:8880: 68        PLA
C - - - - - 0x038891 0E:8881: 18        CLC
C - - - - - 0x038892 0E:8882: 69 01     ADC #$01
C - - - - - 0x038894 0E:8884: C9 16     CMP #$16
C - - - - - 0x038896 0E:8886: D0 E9     BNE $8871
C - - - - - 0x038898 0E:8888: A9 01     LDA #$01
C - - - - - 0x03889A 0E:888A: 8D 2F 00  STA a: ram_002F
C - - - - - 0x03889D 0E:888D: A9 00     LDA #$00
C - - - - - 0x03889F 0E:888F: 8D 2D 06  STA ram_062D
C - - - - - 0x0388A2 0E:8892: AD 15 06  LDA ram_0615
C - - - - - 0x0388A5 0E:8895: 29 BF     AND #$BF
C - - - - - 0x0388A7 0E:8897: 8D 15 06  STA ram_0615
C - - - - - 0x0388AA 0E:889A: A9 15     LDA #$15
C - - - - - 0x0388AC 0E:889C: 20 4E C5  JSR $C54E
C - - - - - 0x0388AF 0E:889F: 2C 15 06  BIT ram_0615
C - - - - - 0x0388B2 0E:88A2: 10 03     BPL $88A7
C - - - - - 0x0388B4 0E:88A4: 20 75 C5  JSR $C575
C - - - - - 0x0388B7 0E:88A7: 60        RTS
C - - J - - 0x0388B8 0E:88A8: A9 02     LDA #$02
C - - - - - 0x0388BA 0E:88AA: 8D 3B 04  STA ram_043B
C - - - - - 0x0388BD 0E:88AD: 2C 4C 04  BIT ram_044C
C - - - - - 0x0388C0 0E:88B0: 30 27     BMI $88D9
C - - - - - 0x0388C2 0E:88B2: A9 80     LDA #$80
C - - - - - 0x0388C4 0E:88B4: 8D 4C 04  STA ram_044C
C - - - - - 0x0388C7 0E:88B7: 8D F1 03  STA ram_03F1
C - - - - - 0x0388CA 0E:88BA: A9 C9     LDA #$C9
C - - - - - 0x0388CC 0E:88BC: 8D F2 03  STA ram_03F2
C - - - - - 0x0388CF 0E:88BF: A9 00     LDA #$00
C - - - - - 0x0388D1 0E:88C1: 8D 2D 06  STA ram_062D
C - - - - - 0x0388D4 0E:88C4: AD 15 06  LDA ram_0615
C - - - - - 0x0388D7 0E:88C7: 29 BF     AND #$BF
C - - - - - 0x0388D9 0E:88C9: 8D 15 06  STA ram_0615
C - - - - - 0x0388DC 0E:88CC: A9 16     LDA #$16
C - - - - - 0x0388DE 0E:88CE: 20 4E C5  JSR $C54E
C - - - - - 0x0388E1 0E:88D1: 2C 15 06  BIT ram_0615
C - - - - - 0x0388E4 0E:88D4: 10 03     BPL $88D9
C - - - - - 0x0388E6 0E:88D6: 20 75 C5  JSR $C575
C - - - - - 0x0388E9 0E:88D9: 60        RTS
C - - J - - 0x0388EA 0E:88DA: AD 3B 04  LDA ram_043B
C - - - - - 0x0388ED 0E:88DD: 20 09 C5  JSR $C509
- D 0 - I - 0x0388F0 0E:88E0: E8        .byte $E8   ; 
- D 0 - I - 0x0388F1 0E:88E1: 88        .byte $88   ; 
- D 0 - I - 0x0388F2 0E:88E2: EE        .byte $EE   ; 
- D 0 - I - 0x0388F3 0E:88E3: 88        .byte $88   ; 
- D 0 - I - 0x0388F4 0E:88E4: F4        .byte $F4   ; 
- D 0 - I - 0x0388F5 0E:88E5: 88        .byte $88   ; 
- D 0 - I - 0x0388F6 0E:88E6: F7        .byte $F7   ; 
- D 0 - I - 0x0388F7 0E:88E7: 88        .byte $88   ; 
C - - J - - 0x0388F8 0E:88E8: 20 27 89  JSR $8927
C - - - - - 0x0388FB 0E:88EB: 4C 3F 8A  JMP $8A3F
C - - J - - 0x0388FE 0E:88EE: A9 05     LDA #$05
C - - - - - 0x038900 0E:88F0: 8D 3B 04  STA ram_043B
C - - - - - 0x038903 0E:88F3: 60        RTS
C - - J - - 0x038904 0E:88F4: 4C 33 89  JMP $8933
C - - J - - 0x038907 0E:88F7: A9 04     LDA #$04
C - - - - - 0x038909 0E:88F9: 8D 3B 04  STA ram_043B
C - - - - - 0x03890C 0E:88FC: 60        RTS
C - - J - - 0x03890D 0E:88FD: AD 3B 04  LDA ram_043B
C - - - - - 0x038910 0E:8900: 20 09 C5  JSR $C509
- D 0 - I - 0x038913 0E:8903: 0B        .byte $0B   ; 
- D 0 - I - 0x038914 0E:8904: 89        .byte $89   ; 
- D 0 - I - 0x038915 0E:8905: 11        .byte $11   ; 
- D 0 - I - 0x038916 0E:8906: 89        .byte $89   ; 
- D 0 - I - 0x038917 0E:8907: 17        .byte $17   ; 
- D 0 - I - 0x038918 0E:8908: 89        .byte $89   ; 
- D 0 - I - 0x038919 0E:8909: 1A        .byte $1A   ; 
- D 0 - I - 0x03891A 0E:890A: 89        .byte $89   ; 
C - - J - - 0x03891B 0E:890B: A9 04     LDA #$04
C - - - - - 0x03891D 0E:890D: 8D 3B 04  STA ram_043B
C - - - - - 0x038920 0E:8910: 60        RTS
C D 0 J - - 0x038921 0E:8911: A9 06     LDA #$06
C - - - - - 0x038923 0E:8913: 8D 3B 04  STA ram_043B
C - - - - - 0x038926 0E:8916: 60        RTS
C - - J - - 0x038927 0E:8917: 4C 33 89  JMP $8933
C - - J - - 0x03892A 0E:891A: A9 06     LDA #$06
C - - - - - 0x03892C 0E:891C: 8D 3B 04  STA ram_043B
C - - - - - 0x03892F 0E:891F: A9 01     LDA #$01
C - - - - - 0x038931 0E:8921: 8D 3C 04  STA ram_043C
C - - - - - 0x038934 0E:8924: 4C 11 89  JMP $8911
C - - - - - 0x038937 0E:8927: A9 00     LDA #$00
C - - - - - 0x038939 0E:8929: 8D 3B 04  STA ram_043B
C - - - - - 0x03893C 0E:892C: AD 4E 04  LDA ram_044E
C - - - - - 0x03893F 0E:892F: 8D 3C 04  STA ram_043C
C - - - - - 0x038942 0E:8932: 60        RTS
C D 0 - - - 0x038943 0E:8933: A0 0A     LDY #$0A
C - - - - - 0x038945 0E:8935: B1 3A     LDA (ram_003A),Y
C - - - - - 0x038947 0E:8937: 20 5E 89  JSR $895E
C - - - - - 0x03894A 0E:893A: 29 03     AND #$03
C - - - - - 0x03894C 0E:893C: 48        PHA
C - - - - - 0x03894D 0E:893D: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03894F 0E:893F: 4A        LSR
C - - - - - 0x038950 0E:8940: 4A        LSR
C - - - - - 0x038951 0E:8941: C9 0F     CMP #$0F
C - - - - - 0x038953 0E:8943: F0 08     BEQ $894D
C - - - - - 0x038955 0E:8945: 18        CLC
C - - - - - 0x038956 0E:8946: 69 0A     ADC #$0A
C - - - - - 0x038958 0E:8948: CD 41 04  CMP ram_0441
C - - - - - 0x03895B 0E:894B: D0 03     BNE $8950
C - - - - - 0x03895D 0E:894D: 20 20 8A  JSR $8A20
C - - - - - 0x038960 0E:8950: 85 3C     STA ram_003C
C - - - - - 0x038962 0E:8952: 68        PLA
C - - - - - 0x038963 0E:8953: 20 09 C5  JSR $C509
- D 0 - I - 0x038966 0E:8956: 7E        .byte $7E   ; 
- D 0 - I - 0x038967 0E:8957: 89        .byte $89   ; 
- D 0 - I - 0x038968 0E:8958: 84        .byte $84   ; 
- D 0 - I - 0x038969 0E:8959: 89        .byte $89   ; 
- D 0 - I - 0x03896A 0E:895A: 93        .byte $93   ; 
- D 0 - I - 0x03896B 0E:895B: 89        .byte $89   ; 
- D 0 - I - 0x03896C 0E:895C: 9C        .byte $9C   ; 
- D 0 - I - 0x03896D 0E:895D: 89        .byte $89   ; 
C - - - - - 0x03896E 0E:895E: A2 00     LDX #$00
C - - - - - 0x038970 0E:8960: 86 3D     STX ram_003D
C - - - - - 0x038972 0E:8962: 0A        ASL
C - - - - - 0x038973 0E:8963: 26 3D     ROL ram_003D
C - - - - - 0x038975 0E:8965: 0A        ASL
C - - - - - 0x038976 0E:8966: 26 3D     ROL ram_003D
C - - - - - 0x038978 0E:8968: 0A        ASL
C - - - - - 0x038979 0E:8969: 26 3D     ROL ram_003D
C - - - - - 0x03897B 0E:896B: 69 2E     ADC #$2E
C - - - - - 0x03897D 0E:896D: 85 3C     STA ram_003C
C - - - - - 0x03897F 0E:896F: A5 3D     LDA ram_003D
C - - - - - 0x038981 0E:8971: 69 B7     ADC #$B7
C - - - - - 0x038983 0E:8973: 85 3D     STA ram_003D
C - - - - - 0x038985 0E:8975: AD E2 00  LDA a: ram_00E2
C - - - - - 0x038988 0E:8978: 29 07     AND #$07
C - - - - - 0x03898A 0E:897A: A8        TAY
C - - - - - 0x03898B 0E:897B: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03898D 0E:897D: 60        RTS
C - - J - - 0x03898E 0E:897E: 20 B3 89  JSR $89B3
C - - - - - 0x038991 0E:8981: 4C A5 89  JMP $89A5
C - - J - - 0x038994 0E:8984: 20 B3 89  JSR $89B3
C D 0 - - - 0x038997 0E:8987: 6E E2 00  ROR a: ram_00E2
C - - - - - 0x03899A 0E:898A: 20 20 8A  JSR $8A20
C - - - - - 0x03899D 0E:898D: 20 B3 89  JSR $89B3
C - - - - - 0x0389A0 0E:8990: 4C A5 89  JMP $89A5
C - - J - - 0x0389A3 0E:8993: 20 B3 89  JSR $89B3
C - - - - - 0x0389A6 0E:8996: 20 DA 89  JSR $89DA
C - - - - - 0x0389A9 0E:8999: 4C 87 89  JMP $8987
C - - J - - 0x0389AC 0E:899C: 20 DA 89  JSR $89DA
C - - - - - 0x0389AF 0E:899F: 20 B3 89  JSR $89B3
C - - - - - 0x0389B2 0E:89A2: 4C 87 89  JMP $8987
C D 0 - - - 0x0389B5 0E:89A5: AE 21 06  LDX ram_0621
C - - - - - 0x0389B8 0E:89A8: BD AF 89  LDA $89AF,X
C - - - - - 0x0389BB 0E:89AB: 8D 3B 04  STA ram_043B
C - - - - - 0x0389BE 0E:89AE: 60        RTS
- D 0 - - - 0x0389BF 0E:89AF: 02        .byte $02   ; 
- - - - - - 0x0389C0 0E:89B0: 04        .byte $04   ; 
- D 0 - - - 0x0389C1 0E:89B1: 04        .byte $04   ; 
- - - - - - 0x0389C2 0E:89B2: 02        .byte $02   ; 
C - - - - - 0x0389C3 0E:89B3: A5 3C     LDA ram_003C
C - - - - - 0x0389C5 0E:89B5: 20 0C C5  JSR $C50C
C - - - - - 0x0389C8 0E:89B8: A0 06     LDY #$06
C - - - - - 0x0389CA 0E:89BA: AD 35 06  LDA ram_0635
C - - - - - 0x0389CD 0E:89BD: 38        SEC
C - - - - - 0x0389CE 0E:89BE: F1 34     SBC (ram_0034),Y
C - - - - - 0x0389D0 0E:89C0: B0 08     BCS $89CA
C - - - - - 0x0389D2 0E:89C2: AD 35 06  LDA ram_0635
C - - - - - 0x0389D5 0E:89C5: C9 60     CMP #$60
C - - - - - 0x0389D7 0E:89C7: 90 01     BCC $89CA
C - - - - - 0x0389D9 0E:89C9: 60        RTS
C - - - - - 0x0389DA 0E:89CA: A5 3C     LDA ram_003C
C - - - - - 0x0389DC 0E:89CC: 20 09 8A  JSR $8A09
C - - - - - 0x0389DF 0E:89CF: A9 01     LDA #$01
C - - - - - 0x0389E1 0E:89D1: 8D 3B 04  STA ram_043B
C - - - - - 0x0389E4 0E:89D4: 20 3F 8A  JSR $8A3F
C - - - - - 0x0389E7 0E:89D7: 68        PLA
C - - - - - 0x0389E8 0E:89D8: 68        PLA
C - - - - - 0x0389E9 0E:89D9: 60        RTS
C - - - - - 0x0389EA 0E:89DA: A9 0C     LDA #$0C
C - - - - - 0x0389EC 0E:89DC: 85 3E     STA ram_003E
C - - - - - 0x0389EE 0E:89DE: A5 3E     LDA ram_003E
C - - - - - 0x0389F0 0E:89E0: CD 41 04  CMP ram_0441
C - - - - - 0x0389F3 0E:89E3: F0 0B     BEQ $89F0
C - - - - - 0x0389F5 0E:89E5: 20 0C C5  JSR $C50C
C - - - - - 0x0389F8 0E:89E8: A0 06     LDY #$06
C - - - - - 0x0389FA 0E:89EA: B1 34     LDA (ram_0034),Y
C - - - - - 0x0389FC 0E:89EC: C9 60     CMP #$60
C - - - - - 0x0389FE 0E:89EE: 90 09     BCC $89F9
C - - - - - 0x038A00 0E:89F0: E6 3E     INC ram_003E
C - - - - - 0x038A02 0E:89F2: A5 3E     LDA ram_003E
C - - - - - 0x038A04 0E:89F4: C9 16     CMP #$16
C - - - - - 0x038A06 0E:89F6: D0 E6     BNE $89DE
C - - - - - 0x038A08 0E:89F8: 60        RTS
C - - - - - 0x038A09 0E:89F9: A5 3E     LDA ram_003E
C - - - - - 0x038A0B 0E:89FB: 20 09 8A  JSR $8A09
C - - - - - 0x038A0E 0E:89FE: A9 01     LDA #$01
C - - - - - 0x038A10 0E:8A00: 8D 3B 04  STA ram_043B
C - - - - - 0x038A13 0E:8A03: 20 3F 8A  JSR $8A3F
C - - - - - 0x038A16 0E:8A06: 68        PLA
C - - - - - 0x038A17 0E:8A07: 68        PLA
C - - - - - 0x038A18 0E:8A08: 60        RTS
C - - - - - 0x038A19 0E:8A09: 8D FC 05  STA ram_05FC
C - - - - - 0x038A1C 0E:8A0C: 20 0C C5  JSR $C50C
C - - - - - 0x038A1F 0E:8A0F: A0 06     LDY #$06
C - - - - - 0x038A21 0E:8A11: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A23 0E:8A13: AA        TAX
C - - - - - 0x038A24 0E:8A14: A0 08     LDY #$08
C - - - - - 0x038A26 0E:8A16: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A28 0E:8A18: A8        TAY
C - - - - - 0x038A29 0E:8A19: 20 39 C5  JSR $C539
C - - - - - 0x038A2C 0E:8A1C: 8D 38 06  STA ram_0638
C - - - - - 0x038A2F 0E:8A1F: 60        RTS
C - - - - - 0x038A30 0E:8A20: AD E2 00  LDA a: ram_00E2
C - - - - - 0x038A33 0E:8A23: 6D E3 00  ADC a: ram_00E3
C - - - - - 0x038A36 0E:8A26: 29 0F     AND #$0F
C - - - - - 0x038A38 0E:8A28: C9 0A     CMP #$0A
C - - - - - 0x038A3A 0E:8A2A: 90 02     BCC $8A2E
C - - - - - 0x038A3C 0E:8A2C: E9 0A     SBC #$0A
C - - - - - 0x038A3E 0E:8A2E: 18        CLC
C - - - - - 0x038A3F 0E:8A2F: 69 0C     ADC #$0C
C - - - - - 0x038A41 0E:8A31: CD 41 04  CMP ram_0441
C - - - - - 0x038A44 0E:8A34: D0 08     BNE $8A3E
C - - - - - 0x038A46 0E:8A36: 69 01     ADC #$01
C - - - - - 0x038A48 0E:8A38: C9 16     CMP #$16
C - - - - - 0x038A4A 0E:8A3A: 90 02     BCC $8A3E
C - - - - - 0x038A4C 0E:8A3C: A9 0C     LDA #$0C
C - - - - - 0x038A4E 0E:8A3E: 60        RTS
C D 0 - - - 0x038A4F 0E:8A3F: AD 41 04  LDA ram_0441
C - - - - - 0x038A52 0E:8A42: AE 3B 04  LDX ram_043B
C - - - - - 0x038A55 0E:8A45: 20 06 8C  JSR $8C06
C - - - - - 0x038A58 0E:8A48: AD 30 04  LDA ram_0430
C - - - - - 0x038A5B 0E:8A4B: F0 03     BEQ $8A50
C - - - - - 0x038A5D 0E:8A4D: AD 31 04  LDA ram_0431
C - - - - - 0x038A60 0E:8A50: 8D 3C 04  STA ram_043C
C - - - - - 0x038A63 0E:8A53: AA        TAX
C - - - - - 0x038A64 0E:8A54: D0 0B     BNE $8A61
C - - - - - 0x038A66 0E:8A56: AD 3B 04  LDA ram_043B
C - - - - - 0x038A69 0E:8A59: D0 06     BNE $8A61
C - - - - - 0x038A6B 0E:8A5B: AD 4E 04  LDA ram_044E
C - - - - - 0x038A6E 0E:8A5E: 8D 3C 04  STA ram_043C
C - - - - - 0x038A71 0E:8A61: 60        RTS
C - - - - - 0x038A72 0E:8A62: 48        PHA
C - - - - - 0x038A73 0E:8A63: 20 0C C5  JSR $C50C
C - - - - - 0x038A76 0E:8A66: A0 00     LDY #$00
C - - - - - 0x038A78 0E:8A68: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A7A 0E:8A6A: D0 08     BNE $8A74
C - - - - - 0x038A7C 0E:8A6C: 68        PLA
C - - - - - 0x038A7D 0E:8A6D: 48        PHA
C - - - - - 0x038A7E 0E:8A6E: AA        TAX
C - - - - - 0x038A7F 0E:8A6F: BC 9D 8A  LDY $8A9D,X
C - - - - - 0x038A82 0E:8A72: B1 38     LDA (ram_0038),Y
C - - - - - 0x038A84 0E:8A74: AA        TAX
C - - - - - 0x038A85 0E:8A75: A0 01     LDY #$01
C - - - - - 0x038A87 0E:8A77: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A89 0E:8A79: 10 04     BPL $8A7F
C - - - - - 0x038A8B 0E:8A7B: C8        INY
C - - - - - 0x038A8C 0E:8A7C: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A8E 0E:8A7E: AA        TAX
C - - - - - 0x038A8F 0E:8A7F: 8A        TXA
C - - - - - 0x038A90 0E:8A80: 38        SEC
C - - - - - 0x038A91 0E:8A81: E9 23     SBC #$23
C - - - - - 0x038A93 0E:8A83: A2 00     LDX #$00
C - - - - - 0x038A95 0E:8A85: 86 3B     STX ram_003B
C - - - - - 0x038A97 0E:8A87: 0A        ASL
C - - - - - 0x038A98 0E:8A88: 26 3B     ROL ram_003B
C - - - - - 0x038A9A 0E:8A8A: 0A        ASL
C - - - - - 0x038A9B 0E:8A8B: 26 3B     ROL ram_003B
C - - - - - 0x038A9D 0E:8A8D: 85 3A     STA ram_003A
C - - - - - 0x038A9F 0E:8A8F: A6 3B     LDX ram_003B
C - - - - - 0x038AA1 0E:8A91: 0A        ASL
C - - - - - 0x038AA2 0E:8A92: 26 3B     ROL ram_003B
C - - - - - 0x038AA4 0E:8A94: 65 3A     ADC ram_003A
C - - - - - 0x038AA6 0E:8A96: 48        PHA
C - - - - - 0x038AA7 0E:8A97: 8A        TXA
C - - - - - 0x038AA8 0E:8A98: 65 3B     ADC ram_003B
C - - - - - 0x038AAA 0E:8A9A: AA        TAX
C - - - - - 0x038AAB 0E:8A9B: 68        PLA
C - - - - - 0x038AAC 0E:8A9C: 18        CLC
C - - - - - 0x038AAD 0E:8A9D: 69 62     ADC #$62
C - - - - - 0x038AAF 0E:8A9F: 85 3A     STA ram_003A
C - - - - - 0x038AB1 0E:8AA1: 8A        TXA
C - - - - - 0x038AB2 0E:8AA2: 69 96     ADC #$96
C - - - - - 0x038AB4 0E:8AA4: 85 3B     STA ram_003B
C - - - - - 0x038AB6 0E:8AA6: 68        PLA
C - - - - - 0x038AB7 0E:8AA7: 60        RTS
- D 0 - - - 0x038AB8 0E:8AA8: 02        .byte $02   ; 
- D 0 - - - 0x038AB9 0E:8AA9: 03        .byte $03   ; 
- D 0 - - - 0x038ABA 0E:8AAA: 03        .byte $03   ; 
- D 0 - - - 0x038ABB 0E:8AAB: 03        .byte $03   ; 
- D 0 - - - 0x038ABC 0E:8AAC: 03        .byte $03   ; 
- D 0 - - - 0x038ABD 0E:8AAD: 04        .byte $04   ; 
- D 0 - - - 0x038ABE 0E:8AAE: 05        .byte $05   ; 
- D 0 - - - 0x038ABF 0E:8AAF: 04        .byte $04   ; 
- D 0 - - - 0x038AC0 0E:8AB0: 05        .byte $05   ; 
- D 0 - - - 0x038AC1 0E:8AB1: 04        .byte $04   ; 
- D 0 - - - 0x038AC2 0E:8AB2: 05        .byte $05   ; 
C - - - - - 0x038AC3 0E:8AB3: AD 35 06  LDA ram_0635
C - - - - - 0x038AC6 0E:8AB6: 10 02     BPL $8ABA
C - - - - - 0x038AC8 0E:8AB8: 49 FF     EOR #$FF
C - - - - - 0x038ACA 0E:8ABA: AA        TAX
C - - - - - 0x038ACB 0E:8ABB: AD 37 06  LDA ram_0637
C - - - - - 0x038ACE 0E:8ABE: 10 02     BPL $8AC2
C - - - - - 0x038AD0 0E:8AC0: 49 FF     EOR #$FF
C - - - - - 0x038AD2 0E:8AC2: A8        TAY
C - - - - - 0x038AD3 0E:8AC3: 20 39 C5  JSR $C539
C - - - - - 0x038AD6 0E:8AC6: A2 00     LDX #$00
C - - - - - 0x038AD8 0E:8AC8: DD 9E 8B  CMP $8B9E,X
C - - - - - 0x038ADB 0E:8ACB: F0 04     BEQ $8AD1
C - - - - - 0x038ADD 0E:8ACD: E8        INX
C - - - - - 0x038ADE 0E:8ACE: E8        INX
C - - - - - 0x038ADF 0E:8ACF: D0 F7     BNE $8AC8
C - - - - - 0x038AE1 0E:8AD1: BD 9F 8B  LDA $8B9F,X
C - - - - - 0x038AE4 0E:8AD4: A6 3C     LDX ram_003C
C - - - - - 0x038AE6 0E:8AD6: E0 01     CPX #$01
C - - - - - 0x038AE8 0E:8AD8: F0 03     BEQ $8ADD
C - - - - - 0x038AEA 0E:8ADA: 18        CLC
C - - - - - 0x038AEB 0E:8ADB: 69 0C     ADC #$0C
C - - - - - 0x038AED 0E:8ADD: 60        RTS
C - - - - - 0x038AEE 0E:8ADE: 85 3E     STA ram_003E
C - - - - - 0x038AF0 0E:8AE0: A5 3C     LDA ram_003C
C - - - - - 0x038AF2 0E:8AE2: 85 3F     STA ram_003F
C - - - - - 0x038AF4 0E:8AE4: 98        TYA
C - - - - - 0x038AF5 0E:8AE5: 18        CLC
C - - - - - 0x038AF6 0E:8AE6: 65 3C     ADC ram_003C
C - - - - - 0x038AF8 0E:8AE8: A8        TAY
C - - - - - 0x038AF9 0E:8AE9: B1 3A     LDA (ram_003A),Y
C - - - - - 0x038AFB 0E:8AEB: A0 00     LDY #$00
C - - - - - 0x038AFD 0E:8AED: 84 3D     STY ram_003D
C - - - - - 0x038AFF 0E:8AEF: 0A        ASL
C - - - - - 0x038B00 0E:8AF0: 26 3D     ROL ram_003D
C - - - - - 0x038B02 0E:8AF2: 0A        ASL
C - - - - - 0x038B03 0E:8AF3: 26 3D     ROL ram_003D
C - - - - - 0x038B05 0E:8AF5: 0A        ASL
C - - - - - 0x038B06 0E:8AF6: 26 3D     ROL ram_003D
C - - - - - 0x038B08 0E:8AF8: 0A        ASL
C - - - - - 0x038B09 0E:8AF9: 26 3D     ROL ram_003D
C - - - - - 0x038B0B 0E:8AFB: 85 3C     STA ram_003C
C - - - - - 0x038B0D 0E:8AFD: A6 3D     LDX ram_003D
C - - - - - 0x038B0F 0E:8AFF: 0A        ASL
C - - - - - 0x038B10 0E:8B00: 26 3D     ROL ram_003D
C - - - - - 0x038B12 0E:8B02: 65 3C     ADC ram_003C
C - - - - - 0x038B14 0E:8B04: 85 3C     STA ram_003C
C - - - - - 0x038B16 0E:8B06: 8A        TXA
C - - - - - 0x038B17 0E:8B07: 65 3D     ADC ram_003D
C - - - - - 0x038B19 0E:8B09: AA        TAX
C - - - - - 0x038B1A 0E:8B0A: 60        RTS
C - - - - - 0x038B1B 0E:8B0B: AD E2 00  LDA a: ram_00E2
C - - - - - 0x038B1E 0E:8B0E: 29 07     AND #$07
C - - - - - 0x038B20 0E:8B10: 4A        LSR
C - - - - - 0x038B21 0E:8B11: 08        PHP
C - - - - - 0x038B22 0E:8B12: 18        CLC
C - - - - - 0x038B23 0E:8B13: 65 3E     ADC ram_003E
C - - - - - 0x038B25 0E:8B15: A8        TAY
C - - - - - 0x038B26 0E:8B16: B1 3C     LDA (ram_003C),Y
C - - - - - 0x038B28 0E:8B18: 28        PLP
C - - - - - 0x038B29 0E:8B19: B0 04     BCS $8B1F
C - - - - - 0x038B2B 0E:8B1B: 4A        LSR
C - - - - - 0x038B2C 0E:8B1C: 4A        LSR
C - - - - - 0x038B2D 0E:8B1D: 4A        LSR
C - - - - - 0x038B2E 0E:8B1E: 4A        LSR
C - - - - - 0x038B2F 0E:8B1F: 29 0F     AND #$0F
C - - - - - 0x038B31 0E:8B21: 60        RTS
C D 0 - - - 0x038B32 0E:8B22: A9 0B     LDA #$0B
C - - - - - 0x038B34 0E:8B24: 48        PHA
C - - - - - 0x038B35 0E:8B25: 20 0C C5  JSR $C50C
C - - - - - 0x038B38 0E:8B28: A0 00     LDY #$00
C - - - - - 0x038B3A 0E:8B2A: A9 00     LDA #$00
C - - - - - 0x038B3C 0E:8B2C: 91 34     STA (ram_0034),Y
C - - - - - 0x038B3E 0E:8B2E: C8        INY
C - - - - - 0x038B3F 0E:8B2F: 91 34     STA (ram_0034),Y
C - - - - - 0x038B41 0E:8B31: 68        PLA
C - - - - - 0x038B42 0E:8B32: 18        CLC
C - - - - - 0x038B43 0E:8B33: 69 01     ADC #$01
C - - - - - 0x038B45 0E:8B35: C9 16     CMP #$16
C - - - - - 0x038B47 0E:8B37: D0 EB     BNE $8B24
C - - - - - 0x038B49 0E:8B39: AD 2B 00  LDA a: ram_002B
C - - - - - 0x038B4C 0E:8B3C: 38        SEC
C - - - - - 0x038B4D 0E:8B3D: E9 03     SBC #$03
C - - - - - 0x038B4F 0E:8B3F: 0A        ASL
C - - - - - 0x038B50 0E:8B40: AA        TAX
C - - - - - 0x038B51 0E:8B41: BD B2 BA  LDA $BAB2,X
C - - - - - 0x038B54 0E:8B44: 85 38     STA ram_0038
C - - - - - 0x038B56 0E:8B46: BD B3 BA  LDA $BAB3,X
C - - - - - 0x038B59 0E:8B49: 85 39     STA ram_0039
C - - - - - 0x038B5B 0E:8B4B: A0 00     LDY #$00
C - - - - - 0x038B5D 0E:8B4D: B1 38     LDA (ram_0038),Y
C - - - - - 0x038B5F 0E:8B4F: 29 0F     AND #$0F
C - - - - - 0x038B61 0E:8B51: 8D 2E 00  STA a: ram_002E
C - - - - - 0x038B64 0E:8B54: B1 38     LDA (ram_0038),Y
C - - - - - 0x038B66 0E:8B56: 4A        LSR
C - - - - - 0x038B67 0E:8B57: 4A        LSR
C - - - - - 0x038B68 0E:8B58: 4A        LSR
C - - - - - 0x038B69 0E:8B59: 4A        LSR
C - - - - - 0x038B6A 0E:8B5A: 8D 2F 00  STA a: ram_002F
C - - - - - 0x038B6D 0E:8B5D: A0 09     LDY #$09
C - - - - - 0x038B6F 0E:8B5F: 84 3A     STY ram_003A
C D 0 - - - 0x038B71 0E:8B61: A4 3A     LDY ram_003A
C - - - - - 0x038B73 0E:8B63: B1 38     LDA (ram_0038),Y
C - - - - - 0x038B75 0E:8B65: C9 0F     CMP #$0F
C - - - - - 0x038B77 0E:8B67: F0 15     BEQ $8B7E
C - - - - - 0x038B79 0E:8B69: 18        CLC
C - - - - - 0x038B7A 0E:8B6A: 69 0A     ADC #$0A
C - - - - - 0x038B7C 0E:8B6C: 20 0C C5  JSR $C50C
C - - - - - 0x038B7F 0E:8B6F: A4 3A     LDY ram_003A
C - - - - - 0x038B81 0E:8B71: C8        INY
C - - - - - 0x038B82 0E:8B72: B1 38     LDA (ram_0038),Y
C - - - - - 0x038B84 0E:8B74: C8        INY
C - - - - - 0x038B85 0E:8B75: 84 3A     STY ram_003A
C - - - - - 0x038B87 0E:8B77: A0 00     LDY #$00
C - - - - - 0x038B89 0E:8B79: 91 34     STA (ram_0034),Y
C - - - - - 0x038B8B 0E:8B7B: 4C 61 8B  JMP $8B61
C - - - - - 0x038B8E 0E:8B7E: AE 46 04  LDX ram_0446
C - - - - - 0x038B91 0E:8B81: E0 05     CPX #$05
C - - - - - 0x038B93 0E:8B83: F0 0B     BEQ $8B90
C - - - - - 0x038B95 0E:8B85: A2 00     LDX #$00
C - - - - - 0x038B97 0E:8B87: AD 84 03  LDA ram_0384
C - - - - - 0x038B9A 0E:8B8A: C9 26     CMP #$26
C - - - - - 0x038B9C 0E:8B8C: D0 02     BNE $8B90
C - - - - - 0x038B9E 0E:8B8E: E8        INX
C - - - - - 0x038B9F 0E:8B8F: E8        INX
C - - - - - 0x038BA0 0E:8B90: 8E 46 04  STX ram_0446
C - - - - - 0x038BA3 0E:8B93: 60        RTS
- - - - - - 0x038BA4 0E:8B94: 03        .byte $03   ; 
- - - - - - 0x038BA5 0E:8B95: 03        .byte $03   ; 
- - - - - - 0x038BA6 0E:8B96: 03        .byte $03   ; 
- - - - - - 0x038BA7 0E:8B97: 03        .byte $03   ; 
- - - - - - 0x038BA8 0E:8B98: 04        .byte $04   ; 
- - - - - - 0x038BA9 0E:8B99: 05        .byte $05   ; 
- - - - - - 0x038BAA 0E:8B9A: 04        .byte $04   ; 
- - - - - - 0x038BAB 0E:8B9B: 05        .byte $05   ; 
- - - - - - 0x038BAC 0E:8B9C: 04        .byte $04   ; 
- - - - - - 0x038BAD 0E:8B9D: 05        .byte $05   ; 
- D 0 - - - 0x038BAE 0E:8B9E: 02        .byte $02   ; 
- D 0 - - - 0x038BAF 0E:8B9F: 18        .byte $18   ; 
- D 0 - - - 0x038BB0 0E:8BA0: 03        .byte $03   ; 
- D 0 - - - 0x038BB1 0E:8BA1: 18        .byte $18   ; 
- D 0 - - - 0x038BB2 0E:8BA2: 0E        .byte $0E   ; 
- D 0 - - - 0x038BB3 0E:8BA3: 18        .byte $18   ; 
- D 0 - - - 0x038BB4 0E:8BA4: 0F        .byte $0F   ; 
- D 0 - - - 0x038BB5 0E:8BA5: 18        .byte $18   ; 
- D 0 - - - 0x038BB6 0E:8BA6: 1A        .byte $1A   ; 
- D 0 - - - 0x038BB7 0E:8BA7: 1C        .byte $1C   ; 
- D 0 - - - 0x038BB8 0E:8BA8: 1B        .byte $1B   ; 
- D 0 - - - 0x038BB9 0E:8BA9: 1C        .byte $1C   ; 
- D 0 - - - 0x038BBA 0E:8BAA: 1C        .byte $1C   ; 
- D 0 - - - 0x038BBB 0E:8BAB: 1C        .byte $1C   ; 
- D 0 - - - 0x038BBC 0E:8BAC: 1D        .byte $1D   ; 
- D 0 - - - 0x038BBD 0E:8BAD: 1C        .byte $1C   ; 
- D 0 - - - 0x038BBE 0E:8BAE: 26        .byte $26   ; 
- D 0 - - - 0x038BBF 0E:8BAF: 1C        .byte $1C   ; 
- D 0 - - - 0x038BC0 0E:8BB0: 27        .byte $27   ; 
- D 0 - - - 0x038BC1 0E:8BB1: 1C        .byte $1C   ; 
- D 0 - - - 0x038BC2 0E:8BB2: 28        .byte $28   ; 
- D 0 - - - 0x038BC3 0E:8BB3: 1C        .byte $1C   ; 
- D 0 - - - 0x038BC4 0E:8BB4: 29        .byte $29   ; 
- D 0 - - - 0x038BC5 0E:8BB5: 1C        .byte $1C   ; 
- D 0 - - - 0x038BC6 0E:8BB6: 04        .byte $04   ; 
- D 0 - - - 0x038BC7 0E:8BB7: 20        .byte $20   ; 
- D 0 - - - 0x038BC8 0E:8BB8: 05        .byte $05   ; 
- D 0 - - - 0x038BC9 0E:8BB9: 20        .byte $20   ; 
- D 0 - - - 0x038BCA 0E:8BBA: 10        .byte $10   ; 
- D 0 - - - 0x038BCB 0E:8BBB: 20        .byte $20   ; 
- D 0 - - - 0x038BCC 0E:8BBC: 11        .byte $11   ; 
- D 0 - - - 0x038BCD 0E:8BBD: 20        .byte $20   ; 
- D 0 - - - 0x038BCE 0E:8BBE: 00        .byte $00   ; 
- D 0 - - - 0x038BCF 0E:8BBF: 00        .byte $00   ; 
- D 0 - - - 0x038BD0 0E:8BC0: 0C        .byte $0C   ; 
- D 0 - - - 0x038BD1 0E:8BC1: 00        .byte $00   ; 
- D 0 - - - 0x038BD2 0E:8BC2: 18        .byte $18   ; 
- D 0 - - - 0x038BD3 0E:8BC3: 00        .byte $00   ; 
- D 0 - - - 0x038BD4 0E:8BC4: 24        .byte $24   ; 
- D 0 - - - 0x038BD5 0E:8BC5: 00        .byte $00   ; 
- D 0 - - - 0x038BD6 0E:8BC6: 30        .byte $30   ; <0>
- D 0 - - - 0x038BD7 0E:8BC7: 00        .byte $00   ; 
- D 0 - - - 0x038BD8 0E:8BC8: 3C        .byte $3C   ; 
- D 0 - - - 0x038BD9 0E:8BC9: 00        .byte $00   ; 
- D 0 - - - 0x038BDA 0E:8BCA: 01        .byte $01   ; 
- D 0 - - - 0x038BDB 0E:8BCB: 00        .byte $00   ; 
- D 0 - - - 0x038BDC 0E:8BCC: 0D        .byte $0D   ; 
- D 0 - - - 0x038BDD 0E:8BCD: 00        .byte $00   ; 
- D 0 - - - 0x038BDE 0E:8BCE: 19        .byte $19   ; 
- D 0 - - - 0x038BDF 0E:8BCF: 00        .byte $00   ; 
- D 0 - - - 0x038BE0 0E:8BD0: 25        .byte $25   ; 
- D 0 - - - 0x038BE1 0E:8BD1: 00        .byte $00   ; 
- D 0 - - - 0x038BE2 0E:8BD2: 31        .byte $31   ; <1>
- D 0 - - - 0x038BE3 0E:8BD3: 00        .byte $00   ; 
- D 0 - - - 0x038BE4 0E:8BD4: 3D        .byte $3D   ; 
- D 0 - - - 0x038BE5 0E:8BD5: 00        .byte $00   ; 
- D 0 - - - 0x038BE6 0E:8BD6: 02        .byte $02   ; 
- D 0 - - - 0x038BE7 0E:8BD7: 00        .byte $00   ; 
- D 0 - - - 0x038BE8 0E:8BD8: 0E        .byte $0E   ; 
- D 0 - - - 0x038BE9 0E:8BD9: 00        .byte $00   ; 
- D 0 - - - 0x038BEA 0E:8BDA: 03        .byte $03   ; 
- D 0 - - - 0x038BEB 0E:8BDB: 00        .byte $00   ; 
- D 0 - - - 0x038BEC 0E:8BDC: 0F        .byte $0F   ; 
- D 0 - - - 0x038BED 0E:8BDD: 00        .byte $00   ; 
- D 0 - - - 0x038BEE 0E:8BDE: 32        .byte $32   ; <2>
- D 0 - - - 0x038BEF 0E:8BDF: 04        .byte $04   ; 
- D 0 - - - 0x038BF0 0E:8BE0: 3E        .byte $3E   ; 
- D 0 - - - 0x038BF1 0E:8BE1: 04        .byte $04   ; 
- D 0 - - - 0x038BF2 0E:8BE2: 33        .byte $33   ; <3>
- D 0 - - - 0x038BF3 0E:8BE3: 04        .byte $04   ; 
- D 0 - - - 0x038BF4 0E:8BE4: 3F        .byte $3F   ; 
- D 0 - - - 0x038BF5 0E:8BE5: 04        .byte $04   ; 
- D 0 - - - 0x038BF6 0E:8BE6: 34        .byte $34   ; <4>
- D 0 - - - 0x038BF7 0E:8BE7: 04        .byte $04   ; 
- D 0 - - - 0x038BF8 0E:8BE8: 40        .byte $40   ; 
- D 0 - - - 0x038BF9 0E:8BE9: 04        .byte $04   ; 
- D 0 - - - 0x038BFA 0E:8BEA: 35        .byte $35   ; <5>
- D 0 - - - 0x038BFB 0E:8BEB: 04        .byte $04   ; 
- D 0 - - - 0x038BFC 0E:8BEC: 41        .byte $41   ; <A>
- D 0 - - - 0x038BFD 0E:8BED: 04        .byte $04   ; 
- D 0 - - - 0x038BFE 0E:8BEE: 1A        .byte $1A   ; 
- D 0 - - - 0x038BFF 0E:8BEF: 08        .byte $08   ; 
- D 0 - - - 0x038C00 0E:8BF0: 26        .byte $26   ; 
- D 0 - - - 0x038C01 0E:8BF1: 08        .byte $08   ; 
- D 0 - - - 0x038C02 0E:8BF2: 1B        .byte $1B   ; 
- D 0 - - - 0x038C03 0E:8BF3: 08        .byte $08   ; 
- D 0 - - - 0x038C04 0E:8BF4: 27        .byte $27   ; 
- D 0 - - - 0x038C05 0E:8BF5: 08        .byte $08   ; 
- D 0 - - - 0x038C06 0E:8BF6: 1C        .byte $1C   ; 
- D 0 - - - 0x038C07 0E:8BF7: 08        .byte $08   ; 
- D 0 - - - 0x038C08 0E:8BF8: 28        .byte $28   ; 
- D 0 - - - 0x038C09 0E:8BF9: 08        .byte $08   ; 
- D 0 - - - 0x038C0A 0E:8BFA: 1D        .byte $1D   ; 
- D 0 - - - 0x038C0B 0E:8BFB: 08        .byte $08   ; 
- D 0 - - - 0x038C0C 0E:8BFC: 29        .byte $29   ; 
- D 0 - - - 0x038C0D 0E:8BFD: 08        .byte $08   ; 
- D 0 - - - 0x038C0E 0E:8BFE: 04        .byte $04   ; 
- D 0 - - - 0x038C0F 0E:8BFF: 0C        .byte $0C   ; 
- D 0 - - - 0x038C10 0E:8C00: 10        .byte $10   ; 
- D 0 - - - 0x038C11 0E:8C01: 0C        .byte $0C   ; 
- D 0 - - - 0x038C12 0E:8C02: 05        .byte $05   ; 
- D 0 - - - 0x038C13 0E:8C03: 0C        .byte $0C   ; 
- D 0 - - - 0x038C14 0E:8C04: 11        .byte $11   ; 
- D 0 - - - 0x038C15 0E:8C05: 0C        .byte $0C   ; 
C D 0 - - - 0x038C16 0E:8C06: E0 04     CPX #$04
C - - - - - 0x038C18 0E:8C08: B0 1C     BCS $8C26
C - - - - - 0x038C1A 0E:8C0A: AC 4E 04  LDY ram_044E
C - - - - - 0x038C1D 0E:8C0D: F0 04     BEQ $8C13
C - - - - - 0x038C1F 0E:8C0F: E0 02     CPX #$02
C - - - - - 0x038C21 0E:8C11: B0 13     BCS $8C26
C - - - - - 0x038C23 0E:8C13: 20 C9 8D  JSR $8DC9
C - - - - - 0x038C26 0E:8C16: AD 30 04  LDA ram_0430
C - - - - - 0x038C29 0E:8C19: 0A        ASL
C - - - - - 0x038C2A 0E:8C1A: A8        TAY
C - - - - - 0x038C2B 0E:8C1B: B1 48     LDA (ram_0048),Y
C - - - - - 0x038C2D 0E:8C1D: C8        INY
C - - - - - 0x038C2E 0E:8C1E: D1 48     CMP (ram_0048),Y
C - - - - - 0x038C30 0E:8C20: D0 0A     BNE $8C2C
C - - - - - 0x038C32 0E:8C22: C9 00     CMP #$00
C - - - - - 0x038C34 0E:8C24: D0 06     BNE $8C2C
C - - - - - 0x038C36 0E:8C26: A9 00     LDA #$00
C - - - - - 0x038C38 0E:8C28: 8D 30 04  STA ram_0430
C - - - - - 0x038C3B 0E:8C2B: 60        RTS
C - - - - - 0x038C3C 0E:8C2C: AA        TAX
C - - - - - 0x038C3D 0E:8C2D: B1 48     LDA (ram_0048),Y
C - - - - - 0x038C3F 0E:8C2F: 85 49     STA ram_0049
C - - - - - 0x038C41 0E:8C31: 86 48     STX ram_0048
C - - - - - 0x038C43 0E:8C33: AD 30 04  LDA ram_0430
C - - - - - 0x038C46 0E:8C36: A2 00     LDX #$00
C - - - - - 0x038C48 0E:8C38: 8E 30 04  STX ram_0430
C - - - - - 0x038C4B 0E:8C3B: 20 09 C5  JSR $C509
- D 0 - I - 0x038C4E 0E:8C3E: 46        .byte $46   ; <F>
- D 0 - I - 0x038C4F 0E:8C3F: 8C        .byte $8C   ; 
- D 0 - I - 0x038C50 0E:8C40: 41        .byte $41   ; <A>
- D 0 - I - 0x038C51 0E:8C41: 8D        .byte $8D   ; 
- D 0 - I - 0x038C52 0E:8C42: 4E        .byte $4E   ; <N>
- D 0 - I - 0x038C53 0E:8C43: 8D        .byte $8D   ; 
- D 0 - I - 0x038C54 0E:8C44: 55        .byte $55   ; <U>
- D 0 - I - 0x038C55 0E:8C45: 8D        .byte $8D   ; 
C - - J - - 0x038C56 0E:8C46: A9 00     LDA #$00
C - - - - - 0x038C58 0E:8C48: 85 46     STA ram_0046
C - - - - - 0x038C5A 0E:8C4A: A4 46     LDY ram_0046
C - - - - - 0x038C5C 0E:8C4C: B1 48     LDA (ram_0048),Y
C - - - - - 0x038C5E 0E:8C4E: 4A        LSR
C - - - - - 0x038C5F 0E:8C4F: 4A        LSR
C - - - - - 0x038C60 0E:8C50: 85 47     STA ram_0047
C - - - - - 0x038C62 0E:8C52: B1 48     LDA (ram_0048),Y
C - - - - - 0x038C64 0E:8C54: 29 03     AND #$03
C - - - - - 0x038C66 0E:8C56: C9 03     CMP #$03
C - - - - - 0x038C68 0E:8C58: F0 24     BEQ $8C7E
C - - - - - 0x038C6A 0E:8C5A: CD 4E 04  CMP ram_044E
C - - - - - 0x038C6D 0E:8C5D: D0 03     BNE $8C62
C - - - - - 0x038C6F 0E:8C5F: 20 7F 8C  JSR $8C7F
C - - - - - 0x038C72 0E:8C62: E6 46     INC ram_0046
C - - - - - 0x038C74 0E:8C64: A5 47     LDA ram_0047
C - - - - - 0x038C76 0E:8C66: C9 08     CMP #$08
C - - - - - 0x038C78 0E:8C68: F0 10     BEQ $8C7A
C - - - - - 0x038C7A 0E:8C6A: C9 09     CMP #$09
C - - - - - 0x038C7C 0E:8C6C: F0 0C     BEQ $8C7A
C - - - - - 0x038C7E 0E:8C6E: C9 0A     CMP #$0A
C - - - - - 0x038C80 0E:8C70: F0 08     BEQ $8C7A
C - - - - - 0x038C82 0E:8C72: C9 11     CMP #$11
C - - - - - 0x038C84 0E:8C74: F0 04     BEQ $8C7A
C - - - - - 0x038C86 0E:8C76: C9 13     CMP #$13
C - - - - - 0x038C88 0E:8C78: D0 D0     BNE $8C4A
C - - - - - 0x038C8A 0E:8C7A: E6 46     INC ram_0046
C - - - - - 0x038C8C 0E:8C7C: D0 CC     BNE $8C4A
C - - - - - 0x038C8E 0E:8C7E: 60        RTS
C - - - - - 0x038C8F 0E:8C7F: A5 47     LDA ram_0047
C - - - - - 0x038C91 0E:8C81: 38        SEC
C - - - - - 0x038C92 0E:8C82: E9 03     SBC #$03
C - - - - - 0x038C94 0E:8C84: 20 09 C5  JSR $C509
- D 0 - I - 0x038C97 0E:8C87: C7        .byte $C7   ; 
- D 0 - I - 0x038C98 0E:8C88: 8C        .byte $8C   ; 
- D 0 - I - 0x038C99 0E:8C89: CC        .byte $CC   ; 
- D 0 - I - 0x038C9A 0E:8C8A: 8C        .byte $8C   ; 
- D 0 - I - 0x038C9B 0E:8C8B: C7        .byte $C7   ; 
- D 0 - I - 0x038C9C 0E:8C8C: 8C        .byte $8C   ; 
- D 0 - I - 0x038C9D 0E:8C8D: C7        .byte $C7   ; 
- D 0 - I - 0x038C9E 0E:8C8E: 8C        .byte $8C   ; 
- D 0 - I - 0x038C9F 0E:8C8F: C7        .byte $C7   ; 
- D 0 - I - 0x038CA0 0E:8C90: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA1 0E:8C91: D4        .byte $D4   ; 
- D 0 - I - 0x038CA2 0E:8C92: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA3 0E:8C93: D4        .byte $D4   ; 
- D 0 - I - 0x038CA4 0E:8C94: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA5 0E:8C95: FA        .byte $FA   ; 
- D 0 - I - 0x038CA6 0E:8C96: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA7 0E:8C97: C7        .byte $C7   ; 
- D 0 - I - 0x038CA8 0E:8C98: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA9 0E:8C99: C7        .byte $C7   ; 
- D 0 - I - 0x038CAA 0E:8C9A: 8C        .byte $8C   ; 
- D 0 - I - 0x038CAB 0E:8C9B: C7        .byte $C7   ; 
- D 0 - I - 0x038CAC 0E:8C9C: 8C        .byte $8C   ; 
- D 0 - I - 0x038CAD 0E:8C9D: C7        .byte $C7   ; 
- D 0 - I - 0x038CAE 0E:8C9E: 8C        .byte $8C   ; 
- D 0 - I - 0x038CAF 0E:8C9F: C7        .byte $C7   ; 
- D 0 - I - 0x038CB0 0E:8CA0: 8C        .byte $8C   ; 
- D 0 - I - 0x038CB1 0E:8CA1: C7        .byte $C7   ; 
- D 0 - I - 0x038CB2 0E:8CA2: 8C        .byte $8C   ; 
- D 0 - I - 0x038CB3 0E:8CA3: 21        .byte $21   ; 
- D 0 - I - 0x038CB4 0E:8CA4: 8D        .byte $8D   ; 
- D 0 - I - 0x038CB5 0E:8CA5: 2A        .byte $2A   ; 
- D 0 - I - 0x038CB6 0E:8CA6: 8D        .byte $8D   ; 
- D 0 - I - 0x038CB7 0E:8CA7: D4        .byte $D4   ; 
- D 0 - I - 0x038CB8 0E:8CA8: 8C        .byte $8C   ; 
- D 0 - I - 0x038CB9 0E:8CA9: C7        .byte $C7   ; 
- D 0 - I - 0x038CBA 0E:8CAA: 8C        .byte $8C   ; 
- D 0 - I - 0x038CBB 0E:8CAB: C7        .byte $C7   ; 
- D 0 - I - 0x038CBC 0E:8CAC: 8C        .byte $8C   ; 
- D 0 - I - 0x038CBD 0E:8CAD: C7        .byte $C7   ; 
- D 0 - I - 0x038CBE 0E:8CAE: 8C        .byte $8C   ; 
- D 0 - I - 0x038CBF 0E:8CAF: C7        .byte $C7   ; 
- D 0 - I - 0x038CC0 0E:8CB0: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC1 0E:8CB1: C7        .byte $C7   ; 
- D 0 - I - 0x038CC2 0E:8CB2: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC3 0E:8CB3: C7        .byte $C7   ; 
- D 0 - I - 0x038CC4 0E:8CB4: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC5 0E:8CB5: C7        .byte $C7   ; 
- D 0 - I - 0x038CC6 0E:8CB6: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC7 0E:8CB7: C7        .byte $C7   ; 
- D 0 - I - 0x038CC8 0E:8CB8: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC9 0E:8CB9: C7        .byte $C7   ; 
- D 0 - I - 0x038CCA 0E:8CBA: 8C        .byte $8C   ; 
- D 0 - I - 0x038CCB 0E:8CBB: C7        .byte $C7   ; 
- D 0 - I - 0x038CCC 0E:8CBC: 8C        .byte $8C   ; 
- D 0 - I - 0x038CCD 0E:8CBD: C7        .byte $C7   ; 
- D 0 - I - 0x038CCE 0E:8CBE: 8C        .byte $8C   ; 
- D 0 - I - 0x038CCF 0E:8CBF: C7        .byte $C7   ; 
- D 0 - I - 0x038CD0 0E:8CC0: 8C        .byte $8C   ; 
- D 0 - I - 0x038CD1 0E:8CC1: C7        .byte $C7   ; 
- D 0 - I - 0x038CD2 0E:8CC2: 8C        .byte $8C   ; 
- D 0 - I - 0x038CD3 0E:8CC3: C7        .byte $C7   ; 
- D 0 - I - 0x038CD4 0E:8CC4: 8C        .byte $8C   ; 
- D 0 - I - 0x038CD5 0E:8CC5: C7        .byte $C7   ; 
- D 0 - I - 0x038CD6 0E:8CC6: 8C        .byte $8C   ; 
C D 0 J - - 0x038CD7 0E:8CC7: A5 47     LDA ram_0047
C - - - - - 0x038CD9 0E:8CC9: 4C 11 8E  JMP $8E11
C - - J - - 0x038CDC 0E:8CCC: AD 46 04  LDA ram_0446
C - - - - - 0x038CDF 0E:8CCF: C9 05     CMP #$05