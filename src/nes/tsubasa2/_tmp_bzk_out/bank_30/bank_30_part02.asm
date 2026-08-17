; bank_30.asm 分片 2/5 (原文件行 1001-2000, 共 4835 行)

- D 2 - - A 0x03C3F4 0F:C3E4: 15        .byte $15   ; 
- D 2 - - A 0x03C3F5 0F:C3E5: EB        .byte $EB   ; 
- D 2 - - A 0x03C3F6 0F:C3E6: 4A        .byte $4A   ; <J>
- D 2 - - A 0x03C3F7 0F:C3E7: 5A        .byte $5A   ; <Z>
- D 2 - - A 0x03C3F8 0F:C3E8: A9        .byte $A9   ; 
- D 2 - - A 0x03C3F9 0F:C3E9: 55        .byte $55   ; <U>
- D 2 - - A 0x03C3FA 0F:C3EA: 74        .byte $74   ; <t>
- D 2 - - A 0x03C3FB 0F:C3EB: 4B        .byte $4B   ; <K>
- D 2 - - A 0x03C3FC 0F:C3EC: 74        .byte $74   ; <t>
- D 2 - - A 0x03C3FD 0F:C3ED: 2B        .byte $2B   ; 
- D 2 - - A 0x03C3FE 0F:C3EE: AA        .byte $AA   ; 
- D 2 - - A 0x03C3FF 0F:C3EF: 55        .byte $55   ; <U>
- D 2 - - A 0x03C400 0F:C3F0: 13        .byte $13   ; 
- - - - - - 0x03C401 0F:C3F1: B9        .byte $B9   ; 
- - - - - - 0x03C402 0F:C3F2: 27        .byte $27   ; 
- - - - - - 0x03C403 0F:C3F3: A9        .byte $A9   ; 
- - - - - - 0x03C404 0F:C3F4: AA        .byte $AA   ; 
- - - - - - 0x03C405 0F:C3F5: 4D        .byte $4D   ; <M>
- - - - - - 0x03C406 0F:C3F6: D2        .byte $D2   ; 
- - - - - - 0x03C407 0F:C3F7: 2B        .byte $2B   ; 
- - - - - - 0x03C408 0F:C3F8: 69        .byte $69   ; <i>
- - - - - - 0x03C409 0F:C3F9: A5        .byte $A5   ; 
- - - - - - 0x03C40A 0F:C3FA: 00        .byte $00   ; 
- - - - - - 0x03C40B 0F:C3FB: 00        .byte $00   ; 
- - - - - - 0x03C40C 0F:C3FC: 00        .byte $00   ; 
- - - - - - 0x03C40D 0F:C3FD: 00        .byte $00   ; 
- - - - - - 0x03C40E 0F:C3FE: 00        .byte $00   ; 
- - - - - - 0x03C40F 0F:C3FF: 00        .byte $00   ; 
C D 2 - - - 0x03C410 0F:C400: A8        TAY
C - - - - - 0x03C411 0F:C401: A9 08     LDA #$08
C - - - - - 0x03C413 0F:C403: 85 20     STA ram_0020
C - - - - - 0x03C415 0F:C405: 8D 00 20  STA $2000
C - - - - - 0x03C418 0F:C408: A9 1E     LDA #$1E
C - - - - - 0x03C41A 0F:C40A: 85 21     STA ram_0021
C - - - - - 0x03C41C 0F:C40C: 8D 01 20  STA $2001
C - - - - - 0x03C41F 0F:C40F: A9 00     LDA #$00
C - - - - - 0x03C421 0F:C411: 85 22     STA ram_0022
C - - - - - 0x03C423 0F:C413: A2 00     LDX #$00
C - - - - - 0x03C425 0F:C415: 20 B2 C4  JSR $C4B2
C - - - - - 0x03C428 0F:C418: A2 02     LDX #$02
C - - - - - 0x03C42A 0F:C41A: 20 B9 C4  JSR $C4B9
C - - - - - 0x03C42D 0F:C41D: 98        TYA
C - - - - - 0x03C42E 0F:C41E: 4C 00 A2  JMP $A200
C D 2 - - - 0x03C431 0F:C421: 24 3B     BIT ram_003B
C - - - - - 0x03C433 0F:C423: 30 4D     BMI $C472
C - - - - - 0x03C435 0F:C425: 38        SEC
C - - - - - 0x03C436 0F:C426: 66 3B     ROR ram_003B
C - - - - - 0x03C438 0F:C428: 85 3C     STA ram_003C
C - - - - - 0x03C43A 0F:C42A: 86 3D     STX ram_003D
C - - - - - 0x03C43C 0F:C42C: 84 3E     STY ram_003E
C - - - - - 0x03C43E 0F:C42E: A5 22     LDA ram_0022
C - - - - - 0x03C440 0F:C430: 09 07     ORA #$07
C - - - - - 0x03C442 0F:C432: 8D 00 80  STA $8000
C - - - - - 0x03C445 0F:C435: A9 02     LDA #$02
C - - - - - 0x03C447 0F:C437: 8D 01 80  STA $8001
C - - - - - 0x03C44A 0F:C43A: 20 00 A0  JSR $A000
C - - - - - 0x03C44D 0F:C43D: A5 22     LDA ram_0022
C - - - - - 0x03C44F 0F:C43F: 09 06     ORA #$06
C - - - - - 0x03C451 0F:C441: 8D 00 80  STA $8000
C - - - - - 0x03C454 0F:C444: A9 0C     LDA #$0C
C - - - - - 0x03C456 0F:C446: 8D 01 80  STA $8001
C - - - - - 0x03C459 0F:C449: 20 00 80  JSR $8000
C - - - - - 0x03C45C 0F:C44C: A5 22     LDA ram_0022
C - - - - - 0x03C45E 0F:C44E: 09 06     ORA #$06
C - - - - - 0x03C460 0F:C450: 8D 00 80  STA $8000
C - - - - - 0x03C463 0F:C453: A5 24     LDA ram_0024
C - - - - - 0x03C465 0F:C455: 8D 01 80  STA $8001
C - - - - - 0x03C468 0F:C458: A5 22     LDA ram_0022
C - - - - - 0x03C46A 0F:C45A: 09 07     ORA #$07
C - - - - - 0x03C46C 0F:C45C: 8D 00 80  STA $8000
C - - - - - 0x03C46F 0F:C45F: A5 25     LDA ram_0025
C - - - - - 0x03C471 0F:C461: 8D 01 80  STA $8001
C - - - - - 0x03C474 0F:C464: A5 23     LDA ram_0023
C - - - - - 0x03C476 0F:C466: 8D 00 80  STA $8000
C - - - - - 0x03C479 0F:C469: A4 3E     LDY ram_003E
C - - - - - 0x03C47B 0F:C46B: A6 3D     LDX ram_003D
C - - - - - 0x03C47D 0F:C46D: A5 3C     LDA ram_003C
C - - - - - 0x03C47F 0F:C46F: 46 3B     LSR ram_003B
C - - - - - 0x03C481 0F:C471: 40        RTI
C - - - - - 0x03C482 0F:C472: 48        PHA
C - - - - - 0x03C483 0F:C473: AD 02 20  LDA $2002
C - - - - - 0x03C486 0F:C476: 68        PLA
C - - - - - 0x03C487 0F:C477: 40        RTI
C D 2 - - - 0x03C488 0F:C478: 24 3B     BIT ram_003B
C - - - - - 0x03C48A 0F:C47A: 30 32     BMI $C4AE
C - - - - - 0x03C48C 0F:C47C: 38        SEC
C - - - - - 0x03C48D 0F:C47D: 66 3B     ROR ram_003B
C - - - - - 0x03C48F 0F:C47F: 85 3C     STA ram_003C
C - - - - - 0x03C491 0F:C481: 86 3D     STX ram_003D
C - - - - - 0x03C493 0F:C483: 84 3E     STY ram_003E
C - - - - - 0x03C495 0F:C485: A5 22     LDA ram_0022
C - - - - - 0x03C497 0F:C487: 09 07     ORA #$07
C - - - - - 0x03C499 0F:C489: 8D 00 80  STA $8000
C - - - - - 0x03C49C 0F:C48C: A9 02     LDA #$02
C - - - - - 0x03C49E 0F:C48E: 8D 01 80  STA $8001
C - - - - - 0x03C4A1 0F:C491: 20 60 A1  JSR $A160
C - - - - - 0x03C4A4 0F:C494: A5 22     LDA ram_0022
C - - - - - 0x03C4A6 0F:C496: 09 07     ORA #$07
C - - - - - 0x03C4A8 0F:C498: 8D 00 80  STA $8000
C - - - - - 0x03C4AB 0F:C49B: A5 25     LDA ram_0025
C - - - - - 0x03C4AD 0F:C49D: 8D 01 80  STA $8001
C - - - - - 0x03C4B0 0F:C4A0: A5 23     LDA ram_0023
C - - - - - 0x03C4B2 0F:C4A2: 8D 00 80  STA $8000
C - - - - - 0x03C4B5 0F:C4A5: A4 3E     LDY ram_003E
C - - - - - 0x03C4B7 0F:C4A7: A6 3D     LDX ram_003D
C - - - - - 0x03C4B9 0F:C4A9: A5 3C     LDA ram_003C
C - - - - - 0x03C4BB 0F:C4AB: 46 3B     LSR ram_003B
C - - - - - 0x03C4BD 0F:C4AD: 40        RTI
- - - - - - 0x03C4BE 0F:C4AE: 8D        .byte $8D   ; 
- - - - - - 0x03C4BF 0F:C4AF: 00        .byte $00   ; 
- - - - - - 0x03C4C0 0F:C4B0: E0        .byte $E0   ; 
- - - - - - 0x03C4C1 0F:C4B1: 40        .byte $40   ; 
C - - - - - 0x03C4C2 0F:C4B2: 86 24     STX ram_0024
C - - - - - 0x03C4C4 0F:C4B4: A9 06     LDA #$06
C - - - - - 0x03C4C6 0F:C4B6: 4C BD C4  JMP $C4BD
C D 2 - - - 0x03C4C9 0F:C4B9: 86 25     STX ram_0025
C - - - - - 0x03C4CB 0F:C4BB: A9 07     LDA #$07
C D 2 - - - 0x03C4CD 0F:C4BD: 05 22     ORA ram_0022
C - - - - - 0x03C4CF 0F:C4BF: 85 23     STA ram_0023
C - - - - - 0x03C4D1 0F:C4C1: 8D 00 80  STA $8000
C - - - - - 0x03C4D4 0F:C4C4: 8E 01 80  STX $8001
C - - - - - 0x03C4D7 0F:C4C7: 60        RTS
C - - - - - 0x03C4D8 0F:C4C8: C9 23     CMP #$23
C - - - - - 0x03C4DA 0F:C4CA: B0 27     BCS $C4F3
C - - - - - 0x03C4DC 0F:C4CC: A8        TAY
C - - - - - 0x03C4DD 0F:C4CD: F0 24     BEQ $C4F3
C - - - - - 0x03C4DF 0F:C4CF: 86 ED     STX ram_00ED
C - - - - - 0x03C4E1 0F:C4D1: A5 24     LDA ram_0024
C - - - - - 0x03C4E3 0F:C4D3: 85 EE     STA ram_00EE
C - - - - - 0x03C4E5 0F:C4D5: A5 25     LDA ram_0025
C - - - - - 0x03C4E7 0F:C4D7: 85 EF     STA ram_00EF
C - - - - - 0x03C4E9 0F:C4D9: A2 00     LDX #$00
C - - - - - 0x03C4EB 0F:C4DB: 20 B2 C4  JSR $C4B2
C - - - - - 0x03C4EE 0F:C4DE: A2 01     LDX #$01
C - - - - - 0x03C4F0 0F:C4E0: 20 B9 C4  JSR $C4B9
C - - - - - 0x03C4F3 0F:C4E3: 98        TYA
C - - - - - 0x03C4F4 0F:C4E4: A6 ED     LDX ram_00ED
C - - - - - 0x03C4F6 0F:C4E6: 20 0F A0  JSR $A00F
C - - - - - 0x03C4F9 0F:C4E9: A6 EF     LDX ram_00EF
C - - - - - 0x03C4FB 0F:C4EB: 20 B9 C4  JSR $C4B9
C - - - - - 0x03C4FE 0F:C4EE: A6 EE     LDX ram_00EE
C - - - - - 0x03C500 0F:C4F0: 20 B2 C4  JSR $C4B2
C - - - - - 0x03C503 0F:C4F3: 60        RTS
- - - - - - 0x03C504 0F:C4F4: FF        .byte $FF   ; 
- - - - - - 0x03C505 0F:C4F5: FF        .byte $FF   ; 
- - - - - - 0x03C506 0F:C4F6: FF        .byte $FF   ; 
- - - - - - 0x03C507 0F:C4F7: FF        .byte $FF   ; 
- - - - - - 0x03C508 0F:C4F8: FF        .byte $FF   ; 
- - - - - - 0x03C509 0F:C4F9: FF        .byte $FF   ; 
- - - - - - 0x03C50A 0F:C4FA: FF        .byte $FF   ; 
- - - - - - 0x03C50B 0F:C4FB: FF        .byte $FF   ; 
- - - - - - 0x03C50C 0F:C4FC: FF        .byte $FF   ; 
- - - - - - 0x03C50D 0F:C4FD: FF        .byte $FF   ; 
- - - - - - 0x03C50E 0F:C4FE: FF        .byte $FF   ; 
- - - - - - 0x03C50F 0F:C4FF: FF        .byte $FF   ; 
C - - - - - 0x03C510 0F:C500: 4C 6E C7  JMP $C76E
C D 2 - - - 0x03C513 0F:C503: 4C 4E C6  JMP $C64E
C - - - - - 0x03C516 0F:C506: 4C 21 C8  JMP $C821
C - - - - - 0x03C519 0F:C509: 4C 99 CB  JMP $CB99
C D 2 - - - 0x03C51C 0F:C50C: 4C 7C CD  JMP $CD7C
C - - - - - 0x03C51F 0F:C50F: 4C E7 CA  JMP $CAE7
C D 2 - - - 0x03C522 0F:C512: 4C F7 CA  JMP $CAF7
C - - - - - 0x03C525 0F:C515: 4C 0F CB  JMP $CB0F
- - - - - - 0x03C528 0F:C518: 4C        .byte $4C   ; <L>
- - - - - - 0x03C529 0F:C519: 0D        .byte $0D   ; 
- - - - - - 0x03C52A 0F:C51A: CB        .byte $CB   ; 
C - - - - - 0x03C52B 0F:C51B: 4C 02 CB  JMP $CB02
C - - - - - 0x03C52E 0F:C51E: 4C 3C CD  JMP $CD3C
C - - - - - 0x03C531 0F:C521: 4C 0D CD  JMP $CD0D
C - - - - - 0x03C534 0F:C524: 4C C2 CB  JMP $CBC2
C - - - - - 0x03C537 0F:C527: 4C 08 CE  JMP $CE08
C - - - - - 0x03C53A 0F:C52A: 4C 7F EF  JMP $EF7F
C D 2 - - - 0x03C53D 0F:C52D: 4C 46 CC  JMP $CC46
C - - - - - 0x03C540 0F:C530: 4C 02 CC  JMP $CC02
C - - - - - 0x03C543 0F:C533: 4C D2 CC  JMP $CCD2
C - - - - - 0x03C546 0F:C536: 4C C9 CD  JMP $CDC9
C - - - - - 0x03C549 0F:C539: 4C E2 CD  JMP $CDE2
C - - - - - 0x03C54C 0F:C53C: 4C 0F F3  JMP $F30F
- - - - - - 0x03C54F 0F:C53F: 4C        .byte $4C   ; <L>
- - - - - - 0x03C550 0F:C540: 2D        .byte $2D   ; 
- - - - - - 0x03C551 0F:C541: CE        .byte $CE   ; 
C - - - - - 0x03C552 0F:C542: 4C 4D CE  JMP $CE4D
C - - - - - 0x03C555 0F:C545: 4C 4A CE  JMP $CE4A
C - - - - - 0x03C558 0F:C548: 4C 99 CE  JMP $CE99
C - - - - - 0x03C55B 0F:C54B: 4C 6E CE  JMP $CE6E
C - - - - - 0x03C55E 0F:C54E: 4C B0 CB  JMP $CBB0
C - - - - - 0x03C561 0F:C551: 4C 77 CD  JMP $CD77
C - - - - - 0x03C564 0F:C554: 4C FE CE  JMP $CEFE
C D 2 - - - 0x03C567 0F:C557: 4C BE C6  JMP $C6BE
C - - - - - 0x03C56A 0F:C55A: 4C 4F CF  JMP $CF4F
C - - - - - 0x03C56D 0F:C55D: 4C F1 CB  JMP $CBF1
C - - - - - 0x03C570 0F:C560: 4C 72 CF  JMP $CF72
C - - - - - 0x03C573 0F:C563: 4C 8F CF  JMP $CF8F
C - - - - - 0x03C576 0F:C566: 4C 13 F0  JMP $F013
C - - - - - 0x03C579 0F:C569: 4C 35 CB  JMP $CB35
C - - - - - 0x03C57C 0F:C56C: 4C 22 D0  JMP $D022
C - - - - - 0x03C57F 0F:C56F: 4C 93 D0  JMP $D093
C - - - - - 0x03C582 0F:C572: 4C 62 DB  JMP $DB62
C - - - - - 0x03C585 0F:C575: 4C 33 E2  JMP $E233
C - - - - - 0x03C588 0F:C578: 4C D1 D0  JMP $D0D1
C - - - - - 0x03C58B 0F:C57B: 4C BE C6  JMP $C6BE
- - - - - - 0x03C58E 0F:C57E: 4C        .byte $4C   ; <L>
- - - - - - 0x03C58F 0F:C57F: 1F        .byte $1F   ; 
- - - - - - 0x03C590 0F:C580: CF        .byte $CF   ; 
- - - - - - 0x03C591 0F:C581: 00        .byte $00   ; 
- - - - - - 0x03C592 0F:C582: 00        .byte $00   ; 
- - - - - - 0x03C593 0F:C583: 00        .byte $00   ; 
- - - - - - 0x03C594 0F:C584: 00        .byte $00   ; 
- - - - - - 0x03C595 0F:C585: 00        .byte $00   ; 
- - - - - - 0x03C596 0F:C586: 00        .byte $00   ; 
- - - - - - 0x03C597 0F:C587: 00        .byte $00   ; 
- - - - - - 0x03C598 0F:C588: 00        .byte $00   ; 
- - - - - - 0x03C599 0F:C589: 00        .byte $00   ; 
- - - - - - 0x03C59A 0F:C58A: 00        .byte $00   ; 
- - - - - - 0x03C59B 0F:C58B: 00        .byte $00   ; 
- - - - - - 0x03C59C 0F:C58C: 00        .byte $00   ; 
- - - - - - 0x03C59D 0F:C58D: 00        .byte $00   ; 
- - - - - - 0x03C59E 0F:C58E: 00        .byte $00   ; 
- - - - - - 0x03C59F 0F:C58F: 00        .byte $00   ; 
- - - - - - 0x03C5A0 0F:C590: 00        .byte $00   ; 
- - - - - - 0x03C5A1 0F:C591: 00        .byte $00   ; 
- - - - - - 0x03C5A2 0F:C592: 00        .byte $00   ; 
- - - - - - 0x03C5A3 0F:C593: 00        .byte $00   ; 
- - - - - - 0x03C5A4 0F:C594: 00        .byte $00   ; 
- - - - - - 0x03C5A5 0F:C595: 00        .byte $00   ; 
- - - - - - 0x03C5A6 0F:C596: 00        .byte $00   ; 
- - - - - - 0x03C5A7 0F:C597: 00        .byte $00   ; 
- - - - - - 0x03C5A8 0F:C598: 00        .byte $00   ; 
- - - - - - 0x03C5A9 0F:C599: 00        .byte $00   ; 
- - - - - - 0x03C5AA 0F:C59A: 00        .byte $00   ; 
- - - - - - 0x03C5AB 0F:C59B: 00        .byte $00   ; 
- - - - - - 0x03C5AC 0F:C59C: 00        .byte $00   ; 
- - - - - - 0x03C5AD 0F:C59D: 00        .byte $00   ; 
- - - - - - 0x03C5AE 0F:C59E: 00        .byte $00   ; 
- - - - - - 0x03C5AF 0F:C59F: 00        .byte $00   ; 
- - - - - - 0x03C5B0 0F:C5A0: 00        .byte $00   ; 
- - - - - - 0x03C5B1 0F:C5A1: 00        .byte $00   ; 
- - - - - - 0x03C5B2 0F:C5A2: 00        .byte $00   ; 
- - - - - - 0x03C5B3 0F:C5A3: 00        .byte $00   ; 
- - - - - - 0x03C5B4 0F:C5A4: 00        .byte $00   ; 
- - - - - - 0x03C5B5 0F:C5A5: 00        .byte $00   ; 
- - - - - - 0x03C5B6 0F:C5A6: 00        .byte $00   ; 
- - - - - - 0x03C5B7 0F:C5A7: 00        .byte $00   ; 
- - - - - - 0x03C5B8 0F:C5A8: 00        .byte $00   ; 
- - - - - - 0x03C5B9 0F:C5A9: 00        .byte $00   ; 
- - - - - - 0x03C5BA 0F:C5AA: 00        .byte $00   ; 
- - - - - - 0x03C5BB 0F:C5AB: 00        .byte $00   ; 
- - - - - - 0x03C5BC 0F:C5AC: 00        .byte $00   ; 
- - - - - - 0x03C5BD 0F:C5AD: 00        .byte $00   ; 
- - - - - - 0x03C5BE 0F:C5AE: 00        .byte $00   ; 
- - - - - - 0x03C5BF 0F:C5AF: 00        .byte $00   ; 
- - - - - - 0x03C5C0 0F:C5B0: 00        .byte $00   ; 
- - - - - - 0x03C5C1 0F:C5B1: 00        .byte $00   ; 
- - - - - - 0x03C5C2 0F:C5B2: 00        .byte $00   ; 
- - - - - - 0x03C5C3 0F:C5B3: 00        .byte $00   ; 
- - - - - - 0x03C5C4 0F:C5B4: 00        .byte $00   ; 
- - - - - - 0x03C5C5 0F:C5B5: 00        .byte $00   ; 
- - - - - - 0x03C5C6 0F:C5B6: 00        .byte $00   ; 
- - - - - - 0x03C5C7 0F:C5B7: 00        .byte $00   ; 
- - - - - - 0x03C5C8 0F:C5B8: 00        .byte $00   ; 
- - - - - - 0x03C5C9 0F:C5B9: 00        .byte $00   ; 
- - - - - - 0x03C5CA 0F:C5BA: 00        .byte $00   ; 
- - - - - - 0x03C5CB 0F:C5BB: 00        .byte $00   ; 
- - - - - - 0x03C5CC 0F:C5BC: 00        .byte $00   ; 
- - - - - - 0x03C5CD 0F:C5BD: 00        .byte $00   ; 
- - - - - - 0x03C5CE 0F:C5BE: 00        .byte $00   ; 
- - - - - - 0x03C5CF 0F:C5BF: 00        .byte $00   ; 
- - - - - - 0x03C5D0 0F:C5C0: 00        .byte $00   ; 
- - - - - - 0x03C5D1 0F:C5C1: 00        .byte $00   ; 
- - - - - - 0x03C5D2 0F:C5C2: 00        .byte $00   ; 
- - - - - - 0x03C5D3 0F:C5C3: 00        .byte $00   ; 
- - - - - - 0x03C5D4 0F:C5C4: 00        .byte $00   ; 
- - - - - - 0x03C5D5 0F:C5C5: 00        .byte $00   ; 
- - - - - - 0x03C5D6 0F:C5C6: 00        .byte $00   ; 
- - - - - - 0x03C5D7 0F:C5C7: 00        .byte $00   ; 
- - - - - - 0x03C5D8 0F:C5C8: 00        .byte $00   ; 
- - - - - - 0x03C5D9 0F:C5C9: 00        .byte $00   ; 
- - - - - - 0x03C5DA 0F:C5CA: 00        .byte $00   ; 
- - - - - - 0x03C5DB 0F:C5CB: 00        .byte $00   ; 
- - - - - - 0x03C5DC 0F:C5CC: 00        .byte $00   ; 
- - - - - - 0x03C5DD 0F:C5CD: 00        .byte $00   ; 
- - - - - - 0x03C5DE 0F:C5CE: 00        .byte $00   ; 
- - - - - - 0x03C5DF 0F:C5CF: 00        .byte $00   ; 
- - - - - - 0x03C5E0 0F:C5D0: 00        .byte $00   ; 
- - - - - - 0x03C5E1 0F:C5D1: 00        .byte $00   ; 
- - - - - - 0x03C5E2 0F:C5D2: 00        .byte $00   ; 
- - - - - - 0x03C5E3 0F:C5D3: 00        .byte $00   ; 
- - - - - - 0x03C5E4 0F:C5D4: 00        .byte $00   ; 
- - - - - - 0x03C5E5 0F:C5D5: 00        .byte $00   ; 
- - - - - - 0x03C5E6 0F:C5D6: 00        .byte $00   ; 
- - - - - - 0x03C5E7 0F:C5D7: 00        .byte $00   ; 
- - - - - - 0x03C5E8 0F:C5D8: 00        .byte $00   ; 
- - - - - - 0x03C5E9 0F:C5D9: 00        .byte $00   ; 
- - - - - - 0x03C5EA 0F:C5DA: 00        .byte $00   ; 
- - - - - - 0x03C5EB 0F:C5DB: 00        .byte $00   ; 
- - - - - - 0x03C5EC 0F:C5DC: 00        .byte $00   ; 
- - - - - - 0x03C5ED 0F:C5DD: 00        .byte $00   ; 
- - - - - - 0x03C5EE 0F:C5DE: 00        .byte $00   ; 
- - - - - - 0x03C5EF 0F:C5DF: 00        .byte $00   ; 
- - - - - - 0x03C5F0 0F:C5E0: 00        .byte $00   ; 
- - - - - - 0x03C5F1 0F:C5E1: 00        .byte $00   ; 
- - - - - - 0x03C5F2 0F:C5E2: 00        .byte $00   ; 
- - - - - - 0x03C5F3 0F:C5E3: 00        .byte $00   ; 
- - - - - - 0x03C5F4 0F:C5E4: 00        .byte $00   ; 
- - - - - - 0x03C5F5 0F:C5E5: 00        .byte $00   ; 
- - - - - - 0x03C5F6 0F:C5E6: 00        .byte $00   ; 
- - - - - - 0x03C5F7 0F:C5E7: 00        .byte $00   ; 
- - - - - - 0x03C5F8 0F:C5E8: 00        .byte $00   ; 
- - - - - - 0x03C5F9 0F:C5E9: 00        .byte $00   ; 
- - - - - - 0x03C5FA 0F:C5EA: 00        .byte $00   ; 
- - - - - - 0x03C5FB 0F:C5EB: 00        .byte $00   ; 
- - - - - - 0x03C5FC 0F:C5EC: 00        .byte $00   ; 
- - - - - - 0x03C5FD 0F:C5ED: 00        .byte $00   ; 
- - - - - - 0x03C5FE 0F:C5EE: 00        .byte $00   ; 
- - - - - - 0x03C5FF 0F:C5EF: 00        .byte $00   ; 
- - - - - - 0x03C600 0F:C5F0: 00        .byte $00   ; 
- - - - - - 0x03C601 0F:C5F1: 00        .byte $00   ; 
- - - - - - 0x03C602 0F:C5F2: 00        .byte $00   ; 
- - - - - - 0x03C603 0F:C5F3: 00        .byte $00   ; 
- - - - - - 0x03C604 0F:C5F4: 00        .byte $00   ; 
- - - - - - 0x03C605 0F:C5F5: 00        .byte $00   ; 
- - - - - - 0x03C606 0F:C5F6: 00        .byte $00   ; 
- - - - - - 0x03C607 0F:C5F7: 00        .byte $00   ; 
- - - - - - 0x03C608 0F:C5F8: 00        .byte $00   ; 
- - - - - - 0x03C609 0F:C5F9: 00        .byte $00   ; 
- - - - - - 0x03C60A 0F:C5FA: 00        .byte $00   ; 
- - - - - - 0x03C60B 0F:C5FB: 00        .byte $00   ; 
- - - - - - 0x03C60C 0F:C5FC: 00        .byte $00   ; 
- - - - - - 0x03C60D 0F:C5FD: 00        .byte $00   ; 
- - - - - - 0x03C60E 0F:C5FE: 00        .byte $00   ; 
- - - - - - 0x03C60F 0F:C5FF: 00        .byte $00   ; 
C - - - - - 0x03C610 0F:C600: 4C 65 D5  JMP $D565
C D 2 - - - 0x03C613 0F:C603: 4C 93 D1  JMP $D193
C - - - - - 0x03C616 0F:C606: 4C 74 E0  JMP $E074
C - - - - - 0x03C619 0F:C609: 4C D7 E4  JMP $E4D7
C - - - - - 0x03C61C 0F:C60C: 4C 3E E7  JMP $E73E
C D 2 - - - 0x03C61F 0F:C60F: 4C DF E0  JMP $E0DF
C D 2 - - - 0x03C622 0F:C612: 4C 52 DE  JMP $DE52
C D 2 - - - 0x03C625 0F:C615: 4C 5E DE  JMP $DE5E
C D 2 - - - 0x03C628 0F:C618: 4C FD DC  JMP $DCFD
C D 2 - - - 0x03C62B 0F:C61B: 4C 02 DD  JMP $DD02
C - - - - - 0x03C62E 0F:C61E: 4C 59 E0  JMP $E059
C D 2 - - - 0x03C631 0F:C621: 4C D9 DF  JMP $DFD9
C - - - - - 0x03C634 0F:C624: 4C DF DC  JMP $DCDF
C - - J - - 0x03C637 0F:C627: 4C 4C E5  JMP $E54C
C - - J - - 0x03C63A 0F:C62A: 4C 96 E5  JMP $E596
C - - J - - 0x03C63D 0F:C62D: 4C 88 E6  JMP $E688
C D 2 - - - 0x03C640 0F:C630: 4C 78 E6  JMP $E678
C D 2 - - - 0x03C643 0F:C633: 4C FD DD  JMP $DDFD
C D 2 - - - 0x03C646 0F:C636: 4C AA DA  JMP $DAAA
- - - - - - 0x03C649 0F:C639: 4C        .byte $4C   ; <L>
- - - - - - 0x03C64A 0F:C63A: 45        .byte $45   ; <E>
- - - - - - 0x03C64B 0F:C63B: DE        .byte $DE   ; 
C D 2 - - - 0x03C64C 0F:C63C: 4C 6C DE  JMP $DE6C
C - - - - - 0x03C64F 0F:C63F: 4C F7 D8  JMP $D8F7
C - - - - - 0x03C652 0F:C642: 4C 52 D8  JMP $D852
C - - - - - 0x03C655 0F:C645: 4C EC E6  JMP $E6EC
C - - - - - 0x03C658 0F:C648: 4C E8 D7  JMP $D7E8
- - - - - - 0x03C65B 0F:C64B: 4C        .byte $4C   ; <L>
- - - - - - 0x03C65C 0F:C64C: A2        .byte $A2   ; 
- - - - - - 0x03C65D 0F:C64D: EF        .byte $EF   ; 
C D 2 - - - 0x03C65E 0F:C64E: A9 08     LDA #$08
C - - - - - 0x03C660 0F:C650: 8D 00 20  STA $2000
C - - - - - 0x03C663 0F:C653: 78        SEI
C - - - - - 0x03C664 0F:C654: D8        CLD
C - - - - - 0x03C665 0F:C655: A2 FF     LDX #$FF
C - - - - - 0x03C667 0F:C657: 9A        TXS
C - - - - - 0x03C668 0F:C658: AD 02 20  LDA $2002
C - - - - - 0x03C66B 0F:C65B: 10 FB     BPL $C658
C - - - - - 0x03C66D 0F:C65D: AD 02 20  LDA $2002
C - - - - - 0x03C670 0F:C660: 10 FB     BPL $C65D
C - - - - - 0x03C672 0F:C662: A9 C0     LDA #$C0
C - - - - - 0x03C674 0F:C664: 8D 01 A0  STA $A001
C - - - - - 0x03C677 0F:C667: A9 00     LDA #$00
C - - - - - 0x03C679 0F:C669: 85 00     STA ram_0000
C - - - - - 0x03C67B 0F:C66B: 85 01     STA ram_0001
C - - - - - 0x03C67D 0F:C66D: A8        TAY
C - - - - - 0x03C67E 0F:C66E: A2 08     LDX #$08
C - - - - - 0x03C680 0F:C670: 91 00     STA (ram_0000),Y
C - - - - - 0x03C682 0F:C672: C8        INY
C - - - - - 0x03C683 0F:C673: D0 FB     BNE $C670
C - - - - - 0x03C685 0F:C675: E6 01     INC ram_0001
C - - - - - 0x03C687 0F:C677: CA        DEX
C - - - - - 0x03C688 0F:C678: D0 F6     BNE $C670
C - - - - - 0x03C68A 0F:C67A: A9 08     LDA #$08
C - - - - - 0x03C68C 0F:C67C: 85 20     STA ram_0020
C - - - - - 0x03C68E 0F:C67E: A9 06     LDA #$06
C - - - - - 0x03C690 0F:C680: 85 21     STA ram_0021
C - - - - - 0x03C692 0F:C682: 8D 01 20  STA $2001
C - - - - - 0x03C695 0F:C685: A9 00     LDA #$00
C - - - - - 0x03C697 0F:C687: 8D 10 40  STA $4010
C - - - - - 0x03C69A 0F:C68A: A9 40     LDA #$40
C - - - - - 0x03C69C 0F:C68C: 8D 17 40  STA $4017
C - - - - - 0x03C69F 0F:C68F: AD 02 20  LDA $2002
C - - - - - 0x03C6A2 0F:C692: A9 10     LDA #$10
C - - - - - 0x03C6A4 0F:C694: AA        TAX
C - - - - - 0x03C6A5 0F:C695: 8D 06 20  STA $2006
C - - - - - 0x03C6A8 0F:C698: 8D 06 20  STA $2006
C - - - - - 0x03C6AB 0F:C69B: 49 00     EOR #$00
C - - - - - 0x03C6AD 0F:C69D: CA        DEX
C - - - - - 0x03C6AE 0F:C69E: D0 F5     BNE $C695
C - - - - - 0x03C6B0 0F:C6A0: A9 00     LDA #$00
C - - - - - 0x03C6B2 0F:C6A2: 8D 22 00  STA a: ram_0022
C - - - - - 0x03C6B5 0F:C6A5: 20 35 CB  JSR $CB35
C - - - - - 0x03C6B8 0F:C6A8: 20 8B CB  JSR $CB8B
C - - - - - 0x03C6BB 0F:C6AB: A9 00     LDA #$00
C - - - - - 0x03C6BD 0F:C6AD: 8D 69 04  STA ram_0469
C - - - - - 0x03C6C0 0F:C6B0: A9 00     LDA #$00
C - - - - - 0x03C6C2 0F:C6B2: 8D 69 04  STA ram_0469
C - - - - - 0x03C6C5 0F:C6B5: 8D 00 E0  STA $E000
C - - - - - 0x03C6C8 0F:C6B8: 58        CLI
C - - - - - 0x03C6C9 0F:C6B9: A9 00     LDA #$00
C - - - - - 0x03C6CB 0F:C6BB: 4C FE CE  JMP $CEFE
C D 2 - - - 0x03C6CE 0F:C6BE: A2 E0     LDX #$E0
C - - - - - 0x03C6D0 0F:C6C0: 9A        TXS
C - - - - - 0x03C6D1 0F:C6C1: A9 00     LDA #$00
C - - - - - 0x03C6D3 0F:C6C3: 85 01     STA ram_0001
C - - - - - 0x03C6D5 0F:C6C5: 85 02     STA ram_0002
C - - - - - 0x03C6D7 0F:C6C7: A9 00     LDA #$00
C - - - - - 0x03C6D9 0F:C6C9: 85 05     STA ram_0005
C - - - - - 0x03C6DB 0F:C6CB: 85 06     STA ram_0006
C - - - - - 0x03C6DD 0F:C6CD: A9 00     LDA #$00
C - - - - - 0x03C6DF 0F:C6CF: 85 09     STA ram_0009
C - - - - - 0x03C6E1 0F:C6D1: 85 0A     STA ram_000A
C - - - - - 0x03C6E3 0F:C6D3: A9 00     LDA #$00
C - - - - - 0x03C6E5 0F:C6D5: 85 0D     STA ram_000D
C - - - - - 0x03C6E7 0F:C6D7: 85 0E     STA ram_000E
C - - - - - 0x03C6E9 0F:C6D9: A9 00     LDA #$00
C - - - - - 0x03C6EB 0F:C6DB: 85 11     STA ram_0011
C - - - - - 0x03C6ED 0F:C6DD: 85 12     STA ram_0012
C - - - - - 0x03C6EF 0F:C6DF: A9 00     LDA #$00
C - - - - - 0x03C6F1 0F:C6E1: 85 15     STA ram_0015
C - - - - - 0x03C6F3 0F:C6E3: 85 16     STA ram_0016
C - - - - - 0x03C6F5 0F:C6E5: 20 1F CF  JSR $CF1F
C - - - - - 0x03C6F8 0F:C6E8: A9 00     LDA #$00
C - - - - - 0x03C6FA 0F:C6EA: 85 1B     STA ram_001B
C - - - - - 0x03C6FC 0F:C6EC: 8D 3F 06  STA ram_063F
C - - - - - 0x03C6FF 0F:C6EF: A9 08     LDA #$08
C - - - - - 0x03C701 0F:C6F1: 85 20     STA ram_0020
C - - - - - 0x03C703 0F:C6F3: A9 1E     LDA #$1E
C - - - - - 0x03C705 0F:C6F5: 85 21     STA ram_0021
C - - - - - 0x03C707 0F:C6F7: A9 20     LDA #$20
C - - - - - 0x03C709 0F:C6F9: 8D 6C 04  STA ram_046C
C - - - - - 0x03C70C 0F:C6FC: A9 00     LDA #$00
C - - - - - 0x03C70E 0F:C6FE: 8D 6D 04  STA ram_046D
C - - - - - 0x03C711 0F:C701: A9 3F     LDA #$3F
C - - - - - 0x03C713 0F:C703: 8D 6E 04  STA ram_046E
C - - - - - 0x03C716 0F:C706: A2 00     LDX #$00
C - - - - - 0x03C718 0F:C708: A9 12     LDA #$12
C - - - - - 0x03C71A 0F:C70A: 20 02 CC  JSR $CC02
C - - - - - 0x03C71D 0F:C70D: A2 10     LDX #$10
C - - - - - 0x03C71F 0F:C70F: A9 12     LDA #$12
C - - - - - 0x03C721 0F:C711: 20 02 CC  JSR $CC02
C - - - - - 0x03C724 0F:C714: 20 D2 CC  JSR $CCD2
- D 2 - I - 0x03C727 0F:C717: 00        .byte $00   ; 
- D 2 - I - 0x03C728 0F:C718: 6C        .byte $6C   ; <l>
- D 2 - I - 0x03C729 0F:C719: 04        .byte $04   ; 
C - - - - - 0x03C72A 0F:C71A: A2 07     LDX #$07
C - - - - - 0x03C72C 0F:C71C: BD 66 C7  LDA $C766,X
C - - - - - 0x03C72F 0F:C71F: 9D EB 05  STA ram_05EB,X
C - - - - - 0x03C732 0F:C722: CA        DEX
C - - - - - 0x03C733 0F:C723: 10 F7     BPL $C71C
C - - - - - 0x03C735 0F:C725: A2 01     LDX #$01
C - - - - - 0x03C737 0F:C727: A9 28     LDA #$28
C - - - - - 0x03C739 0F:C729: 95 01     STA ram_0001,X
C - - - - - 0x03C73B 0F:C72B: A9 00     LDA #$00
C - - - - - 0x03C73D 0F:C72D: 95 02     STA ram_0002,X
C - - - - - 0x03C73F 0F:C72F: A9 CA     LDA #$CA
C - - - - - 0x03C741 0F:C731: A0 21     LDY #$21
C - - - - - 0x03C743 0F:C733: 20 E7 CA  JSR $CAE7
C - - - - - 0x03C746 0F:C736: A2 05     LDX #$05
C - - - - - 0x03C748 0F:C738: A9 50     LDA #$50
C - - - - - 0x03C74A 0F:C73A: 95 01     STA ram_0001,X
C - - - - - 0x03C74C 0F:C73C: A9 00     LDA #$00
C - - - - - 0x03C74E 0F:C73E: 95 02     STA ram_0002,X
C - - - - - 0x03C750 0F:C740: A9 D1     LDA #$D1
C - - - - - 0x03C752 0F:C742: A0 1D     LDY #$1D
C - - - - - 0x03C754 0F:C744: 20 E7 CA  JSR $CAE7
C - - - - - 0x03C757 0F:C747: A2 09     LDX #$09
C - - - - - 0x03C759 0F:C749: A9 78     LDA #$78
C - - - - - 0x03C75B 0F:C74B: 95 01     STA ram_0001,X
C - - - - - 0x03C75D 0F:C74D: A9 00     LDA #$00
C - - - - - 0x03C75F 0F:C74F: 95 02     STA ram_0002,X
C - - - - - 0x03C761 0F:C751: A9 EB     LDA #$EB
C - - - - - 0x03C763 0F:C753: A0 85     LDY #$85
C - - - - - 0x03C765 0F:C755: 20 E7 CA  JSR $CAE7
C - - - - - 0x03C768 0F:C758: A5 20     LDA ram_0020
C - - - - - 0x03C76A 0F:C75A: 09 80     ORA #$80
C - - - - - 0x03C76C 0F:C75C: 85 20     STA ram_0020
C - - - - - 0x03C76E 0F:C75E: 85 19     STA ram_0019
C - - - - - 0x03C770 0F:C760: 8D 00 20  STA $2000
C - - - - - 0x03C773 0F:C763: 4C 97 CA  JMP $CA97
- D 2 - - - 0x03C776 0F:C766: 13        .byte $13   ; 
- D 2 - - - 0x03C777 0F:C767: 07        .byte $07   ; 
- D 2 - - - 0x03C778 0F:C768: 19        .byte $19   ; 
- D 2 - - - 0x03C779 0F:C769: 00        .byte $00   ; 
- D 2 - - - 0x03C77A 0F:C76A: 00        .byte $00   ; 
- D 2 - - - 0x03C77B 0F:C76B: AF        .byte $AF   ; 
- D 2 - - - 0x03C77C 0F:C76C: 2E        .byte $2E   ; 
- D 2 - - - 0x03C77D 0F:C76D: FD        .byte $FD   ; 
C D 2 - - - 0x03C77E 0F:C76E: 24 1B     BIT ram_001B
C - - - - - 0x03C780 0F:C770: 50 03     BVC $C775
C - - - - - 0x03C782 0F:C772: 4C 21 C4  JMP $C421
C - - - - - 0x03C785 0F:C775: 48        PHA
C - - - - - 0x03C786 0F:C776: 8A        TXA
C - - - - - 0x03C787 0F:C777: 48        PHA
C - - - - - 0x03C788 0F:C778: 98        TYA
C - - - - - 0x03C789 0F:C779: 48        PHA
C - - - - - 0x03C78A 0F:C77A: A5 20     LDA ram_0020
C - - - - - 0x03C78C 0F:C77C: 29 7F     AND #$7F
C - - - - - 0x03C78E 0F:C77E: 8D 00 20  STA $2000
C - - - - - 0x03C791 0F:C781: 85 20     STA ram_0020
C - - - - - 0x03C793 0F:C783: BA        TSX
C - - - - - 0x03C794 0F:C784: 8A        TXA
C - - - - - 0x03C795 0F:C785: A2 FF     LDX #$FF
C - - - - - 0x03C797 0F:C787: 9A        TXS
C - - - - - 0x03C798 0F:C788: 48        PHA
C - - - - - 0x03C799 0F:C789: A9 00     LDA #$00
C - - - - - 0x03C79B 0F:C78B: 8D 03 20  STA $2003
C - - - - - 0x03C79E 0F:C78E: A9 02     LDA #$02
C - - - - - 0x03C7A0 0F:C790: 8D 14 40  STA $4014
C - - - - - 0x03C7A3 0F:C793: AD 6B 04  LDA ram_046B
C - - - - - 0x03C7A6 0F:C796: 8D 00 A0  STA $A000
C - - - - - 0x03C7A9 0F:C799: 20 FB C8  JSR $C8FB
C - - - - - 0x03C7AC 0F:C79C: 2C 02 20  BIT $2002
C - - - - - 0x03C7AF 0F:C79F: A9 3F     LDA #$3F
C - - - - - 0x03C7B1 0F:C7A1: 8D 06 20  STA $2006
C - - - - - 0x03C7B4 0F:C7A4: A9 00     LDA #$00
C - - - - - 0x03C7B6 0F:C7A6: 8D 06 20  STA $2006
C - - - - - 0x03C7B9 0F:C7A9: 8D 06 20  STA $2006
C - - - - - 0x03C7BC 0F:C7AC: 8D 06 20  STA $2006
C - - - - - 0x03C7BF 0F:C7AF: A5 20     LDA ram_0020
C - - - - - 0x03C7C1 0F:C7B1: 8D 00 20  STA $2000
C - - - - - 0x03C7C4 0F:C7B4: 2C 02 20  BIT $2002
C - - - - - 0x03C7C7 0F:C7B7: A5 4A     LDA ram_004A
C - - - - - 0x03C7C9 0F:C7B9: 18        CLC
C - - - - - 0x03C7CA 0F:C7BA: 6D 38 05  ADC ram_0538
C - - - - - 0x03C7CD 0F:C7BD: 8D 05 20  STA $2005
C - - - - - 0x03C7D0 0F:C7C0: A5 4B     LDA ram_004B
C - - - - - 0x03C7D2 0F:C7C2: 8D 05 20  STA $2005
C - - - - - 0x03C7D5 0F:C7C5: A5 21     LDA ram_0021
C - - - - - 0x03C7D7 0F:C7C7: 8D 01 20  STA $2001
C - - - - - 0x03C7DA 0F:C7CA: 20 E9 C9  JSR $C9E9
C - - - - - 0x03C7DD 0F:C7CD: A6 8E     LDX ram_008E
C - - - - - 0x03C7DF 0F:C7CF: 86 8C     STX ram_008C
C - - - - - 0x03C7E1 0F:C7D1: 86 8D     STX ram_008D
C - - - - - 0x03C7E3 0F:C7D3: BD F7 C8  LDA $C8F7,X
C - - - - - 0x03C7E6 0F:C7D6: 29 7F     AND #$7F
C - - - - - 0x03C7E8 0F:C7D8: 8D 00 C0  STA $C000
C - - - - - 0x03C7EB 0F:C7DB: 8D 01 C0  STA $C001
C - - - - - 0x03C7EE 0F:C7DE: AE 69 04  LDX ram_0469
C - - - - - 0x03C7F1 0F:C7E1: 9D 00 E0  STA $E000,X
C - - - - - 0x03C7F4 0F:C7E4: 20 C5 C9  JSR $C9C5
C - - - - - 0x03C7F7 0F:C7E7: 20 82 C9  JSR $C982
C - - - - - 0x03C7FA 0F:C7EA: A5 1B     LDA ram_001B
C - - - - - 0x03C7FC 0F:C7EC: 09 80     ORA #$80
C - - - - - 0x03C7FE 0F:C7EE: 85 1B     STA ram_001B
C - - - - - 0x03C800 0F:C7F0: A5 22     LDA ram_0022
C - - - - - 0x03C802 0F:C7F2: 09 07     ORA #$07
C - - - - - 0x03C804 0F:C7F4: 8D 00 80  STA $8000
C - - - - - 0x03C807 0F:C7F7: A5 25     LDA ram_0025
C - - - - - 0x03C809 0F:C7F9: 8D 01 80  STA $8001
C - - - - - 0x03C80C 0F:C7FC: A5 22     LDA ram_0022
C - - - - - 0x03C80E 0F:C7FE: 09 06     ORA #$06
C - - - - - 0x03C810 0F:C800: 8D 00 80  STA $8000
C - - - - - 0x03C813 0F:C803: A5 24     LDA ram_0024
C - - - - - 0x03C815 0F:C805: 8D 01 80  STA $8001
C - - - - - 0x03C818 0F:C808: 68        PLA
C - - - - - 0x03C819 0F:C809: AA        TAX
C - - - - - 0x03C81A 0F:C80A: 9A        TXS
C - - - - - 0x03C81B 0F:C80B: A5 23     LDA ram_0023
C - - - - - 0x03C81D 0F:C80D: 8D 00 80  STA $8000
C - - - - - 0x03C820 0F:C810: A5 20     LDA ram_0020
C - - - - - 0x03C822 0F:C812: 09 80     ORA #$80
C - - - - - 0x03C824 0F:C814: 85 20     STA ram_0020
C - - - - - 0x03C826 0F:C816: 85 19     STA ram_0019
C - - - - - 0x03C828 0F:C818: 8D 00 20  STA $2000
C - - - - - 0x03C82B 0F:C81B: 68        PLA
C - - - - - 0x03C82C 0F:C81C: A8        TAY
C - - - - - 0x03C82D 0F:C81D: 68        PLA
C - - - - - 0x03C82E 0F:C81E: AA        TAX
C - - - - - 0x03C82F 0F:C81F: 68        PLA
C - - - - - 0x03C830 0F:C820: 40        RTI
C D 2 - - - 0x03C831 0F:C821: 24 1B     BIT ram_001B
C - - - - - 0x03C833 0F:C823: 50 03     BVC $C828
C - - - - - 0x03C835 0F:C825: 4C 78 C4  JMP $C478
C - - - - - 0x03C838 0F:C828: 4E 00 E0  LSR $E000
C - - - - - 0x03C83B 0F:C82B: 4E 01 E0  LSR $E001
C - - - - - 0x03C83E 0F:C82E: 46 19     LSR ram_0019
C - - - - - 0x03C840 0F:C830: 85 80     STA ram_0080
C - - - - - 0x03C842 0F:C832: 86 81     STX ram_0081
C - - - - - 0x03C844 0F:C834: 84 82     STY ram_0082
C - - - - - 0x03C846 0F:C836: BA        TSX
C - - - - - 0x03C847 0F:C837: 8A        TXA
C - - - - - 0x03C848 0F:C838: A2 FF     LDX #$FF
C - - - - - 0x03C84A 0F:C83A: 9A        TXS
C - - - - - 0x03C84B 0F:C83B: 48        PHA
C - - - - - 0x03C84C 0F:C83C: 20 52 C8  JSR $C852
C - - - - - 0x03C84F 0F:C83F: 68        PLA
C - - - - - 0x03C850 0F:C840: AA        TAX
C - - - - - 0x03C851 0F:C841: 9A        TXS
C - - - - - 0x03C852 0F:C842: A4 82     LDY ram_0082
C - - - - - 0x03C854 0F:C844: A6 81     LDX ram_0081
C - - - - - 0x03C856 0F:C846: AD 23 00  LDA a: ram_0023
C - - - - - 0x03C859 0F:C849: 8D 00 80  STA $8000
C - - - - - 0x03C85C 0F:C84C: A5 80     LDA ram_0080
C - - - - - 0x03C85E 0F:C84E: 38        SEC
C - - - - - 0x03C85F 0F:C84F: 66 19     ROR ram_0019
C - - - - - 0x03C861 0F:C851: 40        RTI
C - - - - - 0x03C862 0F:C852: A6 8D     LDX ram_008D
C - - - - - 0x03C864 0F:C854: BD F7 C8  LDA $C8F7,X
C - - - - - 0x03C867 0F:C857: 30 1D     BMI $C876
C - - - - - 0x03C869 0F:C859: A0 02     LDY #$02
C - - - - - 0x03C86B 0F:C85B: 88        DEY
C - - - - - 0x03C86C 0F:C85C: D0 FD     BNE $C85B
C - - - - - 0x03C86E 0F:C85E: E8        INX
C - - - - - 0x03C86F 0F:C85F: 86 8D     STX ram_008D
C - - - - - 0x03C871 0F:C861: BD F7 C8  LDA $C8F7,X
C - - - - - 0x03C874 0F:C864: 29 7F     AND #$7F
C - - - - - 0x03C876 0F:C866: 8D 00 C0  STA $C000
C - - - - - 0x03C879 0F:C869: 8D 01 C0  STA $C001
C - - - - - 0x03C87C 0F:C86C: 2C 02 20  BIT $2002
C - - - - - 0x03C87F 0F:C86F: AD 43 06  LDA ram_0643
C - - - - - 0x03C882 0F:C872: 8D 05 20  STA $2005
C - - - - - 0x03C885 0F:C875: 60        RTS
C - - - - - 0x03C886 0F:C876: A2 07     LDX #$07
C - - - - - 0x03C888 0F:C878: CA        DEX
C - - - - - 0x03C889 0F:C879: D0 FD     BNE $C878
C - - - - - 0x03C88B 0F:C87B: AD 02 20  LDA $2002
C - - - - - 0x03C88E 0F:C87E: A9 22     LDA #$22
C - - - - - 0x03C890 0F:C880: 8D 06 20  STA $2006
C - - - - - 0x03C893 0F:C883: A9 00     LDA #$00
C - - - - - 0x03C895 0F:C885: 8D 06 20  STA $2006
C - - - - - 0x03C898 0F:C888: A5 20     LDA ram_0020
C - - - - - 0x03C89A 0F:C88A: 29 FE     AND #$FE
C - - - - - 0x03C89C 0F:C88C: 8D 00 20  STA $2000
C - - - - - 0x03C89F 0F:C88F: 2C 02 20  BIT $2002
C - - - - - 0x03C8A2 0F:C892: A9 00     LDA #$00
C - - - - - 0x03C8A4 0F:C894: 8D 05 20  STA $2005
C - - - - - 0x03C8A7 0F:C897: 8D 05 20  STA $2005
C - - - - - 0x03C8AA 0F:C89A: AD 22 00  LDA a: ram_0022
C - - - - - 0x03C8AD 0F:C89D: 8D 00 80  STA $8000
C - - - - - 0x03C8B0 0F:C8A0: A9 00     LDA #$00
C - - - - - 0x03C8B2 0F:C8A2: 8D 01 80  STA $8001
C - - - - - 0x03C8B5 0F:C8A5: AD 22 00  LDA a: ram_0022
C - - - - - 0x03C8B8 0F:C8A8: 09 01     ORA #$01
C - - - - - 0x03C8BA 0F:C8AA: 8D 00 80  STA $8000
C - - - - - 0x03C8BD 0F:C8AD: A5 87     LDA ram_0087
C - - - - - 0x03C8BF 0F:C8AF: 8D 01 80  STA $8001
C - - - - - 0x03C8C2 0F:C8B2: AD 22 00  LDA a: ram_0022
C - - - - - 0x03C8C5 0F:C8B5: 09 02     ORA #$02
C - - - - - 0x03C8C7 0F:C8B7: 8D 00 80  STA $8000
C - - - - - 0x03C8CA 0F:C8BA: A9 1F     LDA #$1F
C - - - - - 0x03C8CC 0F:C8BC: 8D 01 80  STA $8001
C - - - - - 0x03C8CF 0F:C8BF: AD 22 00  LDA a: ram_0022
C - - - - - 0x03C8D2 0F:C8C2: 09 03     ORA #$03
C - - - - - 0x03C8D4 0F:C8C4: 8D 00 80  STA $8000
C - - - - - 0x03C8D7 0F:C8C7: A9 2E     LDA #$2E
C - - - - - 0x03C8D9 0F:C8C9: 8D 01 80  STA $8001
C - - - - - 0x03C8DC 0F:C8CC: 4E 00 E0  LSR $E000
C - - - - - 0x03C8DF 0F:C8CF: A5 22     LDA ram_0022
C - - - - - 0x03C8E1 0F:C8D1: 09 06     ORA #$06
C - - - - - 0x03C8E3 0F:C8D3: 8D 00 80  STA $8000
C - - - - - 0x03C8E6 0F:C8D6: A9 0C     LDA #$0C
C - - - - - 0x03C8E8 0F:C8D8: 8D 01 80  STA $8001
C - - - - - 0x03C8EB 0F:C8DB: 20 00 80  JSR $8000
C - - - - - 0x03C8EE 0F:C8DE: A5 22     LDA ram_0022
C - - - - - 0x03C8F0 0F:C8E0: 09 07     ORA #$07
C - - - - - 0x03C8F2 0F:C8E2: 8D 00 80  STA $8000
C - - - - - 0x03C8F5 0F:C8E5: A5 25     LDA ram_0025
C - - - - - 0x03C8F7 0F:C8E7: 8D 01 80  STA $8001
C - - - - - 0x03C8FA 0F:C8EA: A5 22     LDA ram_0022
C - - - - - 0x03C8FC 0F:C8EC: 09 06     ORA #$06
C - - - - - 0x03C8FE 0F:C8EE: 8D 00 80  STA $8000
C - - - - - 0x03C901 0F:C8F1: A5 24     LDA ram_0024
C - - - - - 0x03C903 0F:C8F3: 8D 01 80  STA $8001
C - - - - - 0x03C906 0F:C8F6: 60        RTS
- D 2 - - - 0x03C907 0F:C8F7: FB        .byte $FB   ; 
- - - - - - 0x03C908 0F:C8F8: 80        .byte $80   ; 
- D 2 - - - 0x03C909 0F:C8F9: 1E        .byte $1E   ; 
- D 2 - - - 0x03C90A 0F:C8FA: DC        .byte $DC   ; 
C - - - - - 0x03C90B 0F:C8FB: AD 98 04  LDA ram_0498
C - - - - - 0x03C90E 0F:C8FE: F0 51     BEQ $C951
C - - - - - 0x03C910 0F:C900: CE 98 04  DEC ram_0498
C - - - - - 0x03C913 0F:C903: 38        SEC
C - - - - - 0x03C914 0F:C904: E9 01     SBC #$01
C - - - - - 0x03C916 0F:C906: 0A        ASL
C - - - - - 0x03C917 0F:C907: 6D 98 04  ADC ram_0498
C - - - - - 0x03C91A 0F:C90A: AA        TAX
C - - - - - 0x03C91B 0F:C90B: BD 99 04  LDA ram_0499,X
C - - - - - 0x03C91E 0F:C90E: A8        TAY
C - - - - - 0x03C91F 0F:C90F: BD 9A 04  LDA ram_049A,X
C - - - - - 0x03C922 0F:C912: 85 77     STA ram_0077
C - - - - - 0x03C924 0F:C914: BD 9B 04  LDA ram_049B,X
C - - - - - 0x03C927 0F:C917: 85 78     STA ram_0078
C - - - - - 0x03C929 0F:C919: 10 11     BPL $C92C
C - - - - - 0x03C92B 0F:C91B: A2 06     LDX #$06
C - - - - - 0x03C92D 0F:C91D: 29 20     AND #$20
C - - - - - 0x03C92F 0F:C91F: F0 01     BEQ $C922
C - - - - - 0x03C931 0F:C921: E8        INX
C - - - - - 0x03C932 0F:C922: 8A        TXA
C - - - - - 0x03C933 0F:C923: 0D 22 00  ORA a: ram_0022
C - - - - - 0x03C936 0F:C926: 8D 00 80  STA $8000
C - - - - - 0x03C939 0F:C929: 8C 01 80  STY $8001
C - - - - - 0x03C93C 0F:C92C: A0 00     LDY #$00
C - - - - - 0x03C93E 0F:C92E: B1 77     LDA (ram_0077),Y
C - - - - - 0x03C940 0F:C930: F0 1E     BEQ $C950
C - - - - - 0x03C942 0F:C932: AA        TAX
C - - - - - 0x03C943 0F:C933: C8        INY
C - - - - - 0x03C944 0F:C934: B1 77     LDA (ram_0077),Y
C - - - - - 0x03C946 0F:C936: 48        PHA
C - - - - - 0x03C947 0F:C937: C8        INY
C - - - - - 0x03C948 0F:C938: B1 77     LDA (ram_0077),Y
C - - - - - 0x03C94A 0F:C93A: 2C 02 20  BIT $2002
C - - - - - 0x03C94D 0F:C93D: 8D 06 20  STA $2006
C - - - - - 0x03C950 0F:C940: 68        PLA
C - - - - - 0x03C951 0F:C941: 8D 06 20  STA $2006
C - - - - - 0x03C954 0F:C944: C8        INY
C - - - - - 0x03C955 0F:C945: B1 77     LDA (ram_0077),Y
C - - - - - 0x03C957 0F:C947: 8D 07 20  STA $2007
C - - - - - 0x03C95A 0F:C94A: C8        INY
C - - - - - 0x03C95B 0F:C94B: CA        DEX
C - - - - - 0x03C95C 0F:C94C: D0 F7     BNE $C945
C - - - - - 0x03C95E 0F:C94E: F0 DE     BEQ $C92E
C - - - - - 0x03C960 0F:C950: 60        RTS
C - - - - - 0x03C961 0F:C951: AD 15 05  LDA ram_0515
C - - - - - 0x03C964 0F:C954: 10 2B     BPL $C981
C - - - - - 0x03C966 0F:C956: A2 00     LDX #$00
C - - - - - 0x03C968 0F:C958: 8E 15 05  STX ram_0515
C - - - - - 0x03C96B 0F:C95B: BD A5 04  LDA ram_04A5,X
C - - - - - 0x03C96E 0F:C95E: F0 21     BEQ $C981
C - - - - - 0x03C970 0F:C960: A8        TAY
C - - - - - 0x03C971 0F:C961: E8        INX
C - - - - - 0x03C972 0F:C962: BD A5 04  LDA ram_04A5,X
C - - - - - 0x03C975 0F:C965: 48        PHA
C - - - - - 0x03C976 0F:C966: E8        INX
C - - - - - 0x03C977 0F:C967: BD A5 04  LDA ram_04A5,X
C - - - - - 0x03C97A 0F:C96A: 2C 02 20  BIT $2002
C - - - - - 0x03C97D 0F:C96D: 8D 06 20  STA $2006
C - - - - - 0x03C980 0F:C970: 68        PLA
C - - - - - 0x03C981 0F:C971: 8D 06 20  STA $2006
C - - - - - 0x03C984 0F:C974: E8        INX
C - - - - - 0x03C985 0F:C975: BD A5 04  LDA ram_04A5,X
C - - - - - 0x03C988 0F:C978: 8D 07 20  STA $2007
C - - - - - 0x03C98B 0F:C97B: E8        INX
C - - - - - 0x03C98C 0F:C97C: 88        DEY
C - - - - - 0x03C98D 0F:C97D: D0 F6     BNE $C975
C - - - - - 0x03C98F 0F:C97F: F0 DA     BEQ $C95B
C - - - - - 0x03C991 0F:C981: 60        RTS
C - - - - - 0x03C992 0F:C982: A2 00     LDX #$00
C - - - - - 0x03C994 0F:C984: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03C997 0F:C987: 20 8B C9  JSR $C98B
C - - - - - 0x03C99A 0F:C98A: 60        RTS
C - - - - - 0x03C99B 0F:C98B: 85 84     STA ram_0084
C - - - - - 0x03C99D 0F:C98D: A0 01     LDY #$01
C - - - - - 0x03C99F 0F:C98F: 8C 16 40  STY $4016
C - - - - - 0x03C9A2 0F:C992: 88        DEY
C - - - - - 0x03C9A3 0F:C993: 8C 16 40  STY $4016
C - - - - - 0x03C9A6 0F:C996: A9 04     LDA #$04
C - - - - - 0x03C9A8 0F:C998: 85 85     STA ram_0085
C - - - - - 0x03C9AA 0F:C99A: A0 08     LDY #$08
C - - - - - 0x03C9AC 0F:C99C: BD 16 40  LDA $4016,X
C - - - - - 0x03C9AF 0F:C99F: 4A        LSR
C - - - - - 0x03C9B0 0F:C9A0: 26 83     ROL ram_0083
C - - - - - 0x03C9B2 0F:C9A2: 29 01     AND #$01
C - - - - - 0x03C9B4 0F:C9A4: 05 83     ORA ram_0083
C - - - - - 0x03C9B6 0F:C9A6: 85 83     STA ram_0083
C - - - - - 0x03C9B8 0F:C9A8: 88        DEY
C - - - - - 0x03C9B9 0F:C9A9: D0 F1     BNE $C99C
C - - - - - 0x03C9BB 0F:C9AB: C5 84     CMP ram_0084
C - - - - - 0x03C9BD 0F:C9AD: F0 06     BEQ $C9B5
C - - - - - 0x03C9BF 0F:C9AF: C6 85     DEC ram_0085
C - - - - - 0x03C9C1 0F:C9B1: D0 D8     BNE $C98B
- - - - - - 0x03C9C3 0F:C9B3: F0        .byte $F0   ; 
- - - - - - 0x03C9C4 0F:C9B4: 0F        .byte $0F   ; 
C - - - - - 0x03C9C5 0F:C9B5: BD 1C 00  LDA a: ram_001C,X
C - - - - - 0x03C9C8 0F:C9B8: 45 83     EOR ram_0083
C - - - - - 0x03C9CA 0F:C9BA: 25 83     AND ram_0083
C - - - - - 0x03C9CC 0F:C9BC: 9D 1E 00  STA a: ram_001E,X
C - - - - - 0x03C9CF 0F:C9BF: A5 83     LDA ram_0083
C - - - - - 0x03C9D1 0F:C9C1: 9D 1C 00  STA a: ram_001C,X
C - - - - - 0x03C9D4 0F:C9C4: 60        RTS
C - - - - - 0x03C9D5 0F:C9C5: AE E1 00  LDX a: ram_00E1
C - - - - - 0x03C9D8 0F:C9C8: BD 00 03  LDA ram_0300,X
C - - - - - 0x03C9DB 0F:C9CB: 7D 00 07  ADC ram_0700,X
C - - - - - 0x03C9DE 0F:C9CE: 2E E2 00  ROL a: ram_00E2
C - - - - - 0x03C9E1 0F:C9D1: 49 FF     EOR #$FF
C - - - - - 0x03C9E3 0F:C9D3: 2E E2 00  ROL a: ram_00E2
C - - - - - 0x03C9E6 0F:C9D6: 6D E2 00  ADC a: ram_00E2
C - - - - - 0x03C9E9 0F:C9D9: 8D E2 00  STA a: ram_00E2
C - - - - - 0x03C9EC 0F:C9DC: FD 80 07  SBC ram_0780,X
C - - - - - 0x03C9EF 0F:C9DF: 6D E1 00  ADC a: ram_00E1
C - - - - - 0x03C9F2 0F:C9E2: 8D E3 00  STA a: ram_00E3
C - - - - - 0x03C9F5 0F:C9E5: EE E1 00  INC a: ram_00E1
C - - - - - 0x03C9F8 0F:C9E8: 60        RTS
C - - - - - 0x03C9F9 0F:C9E9: A2 00     LDX #$00
C - - - - - 0x03C9FB 0F:C9EB: 24 22     BIT ram_0022
C - - - - - 0x03C9FD 0F:C9ED: 10 02     BPL $C9F1
- - - - - - 0x03C9FF 0F:C9EF: A2        .byte $A2   ; 
- - - - - - 0x03CA00 0F:C9F0: 04        .byte $04   ; 
C - - - - - 0x03CA01 0F:C9F1: A5 22     LDA ram_0022
C - - - - - 0x03CA03 0F:C9F3: 8D 00 80  STA $8000
C - - - - - 0x03CA06 0F:C9F6: BD 90 04  LDA ram_0490,X
C - - - - - 0x03CA09 0F:C9F9: 8D 01 80  STA $8001
C - - - - - 0x03CA0C 0F:C9FC: A5 22     LDA ram_0022
C - - - - - 0x03CA0E 0F:C9FE: 09 01     ORA #$01
C - - - - - 0x03CA10 0F:CA00: 8D 00 80  STA $8000
C - - - - - 0x03CA13 0F:CA03: BD 91 04  LDA ram_0491,X
C - - - - - 0x03CA16 0F:CA06: 8D 01 80  STA $8001
C - - - - - 0x03CA19 0F:CA09: 8A        TXA
C - - - - - 0x03CA1A 0F:CA0A: 49 04     EOR #$04
C - - - - - 0x03CA1C 0F:CA0C: AA        TAX
C - - - - - 0x03CA1D 0F:CA0D: A0 02     LDY #$02
C - - - - - 0x03CA1F 0F:CA0F: 98        TYA
C - - - - - 0x03CA20 0F:CA10: 05 22     ORA ram_0022
C - - - - - 0x03CA22 0F:CA12: 8D 00 80  STA $8000
C - - - - - 0x03CA25 0F:CA15: BD 90 04  LDA ram_0490,X
C - - - - - 0x03CA28 0F:CA18: 8D 01 80  STA $8001
C - - - - - 0x03CA2B 0F:CA1B: E8        INX
C - - - - - 0x03CA2C 0F:CA1C: C8        INY
C - - - - - 0x03CA2D 0F:CA1D: C0 06     CPY #$06
C - - - - - 0x03CA2F 0F:CA1F: D0 EE     BNE $CA0F
C - - - - - 0x03CA31 0F:CA21: 60        RTS
C - - - - - 0x03CA32 0F:CA22: A5 21     LDA ram_0021
C - - - - - 0x03CA34 0F:CA24: 09 1E     ORA #$1E
C - - - - - 0x03CA36 0F:CA26: 85 21     STA ram_0021
C - - - - - 0x03CA38 0F:CA28: A9 00     LDA #$00
C - - - - - 0x03CA3A 0F:CA2A: 8D 90 04  STA ram_0490
C - - - - - 0x03CA3D 0F:CA2D: A9 02     LDA #$02
C - - - - - 0x03CA3F 0F:CA2F: 8D 91 04  STA ram_0491
C - - - - - 0x03CA42 0F:CA32: 8D 87 00  STA a: ram_0087
C - - - - - 0x03CA45 0F:CA35: A9 00     LDA #$00
C - - - - - 0x03CA47 0F:CA37: 85 8E     STA ram_008E
C - - - - - 0x03CA49 0F:CA39: A9 01     LDA #$01
C - - - - - 0x03CA4B 0F:CA3B: 8D 69 04  STA ram_0469
C - - - - - 0x03CA4E 0F:CA3E: A9 01     LDA #$01
C - - - - - 0x03CA50 0F:CA40: 8D 43 05  STA ram_0543
C - - - - - 0x03CA53 0F:CA43: A9 23     LDA #$23
C - - - - - 0x03CA55 0F:CA45: 8D 44 05  STA ram_0544
C - - - - - 0x03CA58 0F:CA48: A9 45     LDA #$45
C - - - - - 0x03CA5A 0F:CA4A: 8D 45 05  STA ram_0545
C D 2 - - - 0x03CA5D 0F:CA4D: A9 01     LDA #$01
C - - - - - 0x03CA5F 0F:CA4F: 20 0F CB  JSR $CB0F
C - - - - - 0x03CA62 0F:CA52: 20 9F EE  JSR $EE9F
C - - - - - 0x03CA65 0F:CA55: 20 CA E3  JSR $E3CA
C - - - - - 0x03CA68 0F:CA58: 4C 4D CA  JMP $CA4D
- - - - - - 0x03CA6B 0F:CA5B: A9        .byte $A9   ; 
- - - - - - 0x03CA6C 0F:CA5C: 00        .byte $00   ; 
- - - - - - 0x03CA6D 0F:CA5D: 85        .byte $85   ; 
- - - - - - 0x03CA6E 0F:CA5E: 05        .byte $05   ; 
- - - - - - 0x03CA6F 0F:CA5F: A9        .byte $A9   ; 
- - - - - - 0x03CA70 0F:CA60: 00        .byte $00   ; 
- - - - - - 0x03CA71 0F:CA61: 85        .byte $85   ; 
- - - - - - 0x03CA72 0F:CA62: 09        .byte $09   ; 
- - - - - - 0x03CA73 0F:CA63: A9        .byte $A9   ; 
- - - - - - 0x03CA74 0F:CA64: 00        .byte $00   ; 
- - - - - - 0x03CA75 0F:CA65: 85        .byte $85   ; 
- - - - - - 0x03CA76 0F:CA66: 0D        .byte $0D   ; 
- - - - - - 0x03CA77 0F:CA67: A9        .byte $A9   ; 
- - - - - - 0x03CA78 0F:CA68: 00        .byte $00   ; 
- - - - - - 0x03CA79 0F:CA69: 85        .byte $85   ; 
- - - - - - 0x03CA7A 0F:CA6A: 15        .byte $15   ; 
- - - - - - 0x03CA7B 0F:CA6B: A9        .byte $A9   ; 
- - - - - - 0x03CA7C 0F:CA6C: 00        .byte $00   ; 
- - - - - - 0x03CA7D 0F:CA6D: 85        .byte $85   ; 
- - - - - - 0x03CA7E 0F:CA6E: 11        .byte $11   ; 
- - - - - - 0x03CA7F 0F:CA6F: A9        .byte $A9   ; 
- - - - - - 0x03CA80 0F:CA70: 01        .byte $01   ; 
- - - - - - 0x03CA81 0F:CA71: 20        .byte $20   ; 
- - - - - - 0x03CA82 0F:CA72: 0F        .byte $0F   ; 
- - - - - - 0x03CA83 0F:CA73: CB        .byte $CB   ; 
- - - - - - 0x03CA84 0F:CA74: A9        .byte $A9   ; 
- - - - - - 0x03CA85 0F:CA75: 10        .byte $10   ; 
- - - - - - 0x03CA86 0F:CA76: 2D        .byte $2D   ; 
- - - - - - 0x03CA87 0F:CA77: 1E        .byte $1E   ; 
- - - - - - 0x03CA88 0F:CA78: 00        .byte $00   ; 
- - - - - - 0x03CA89 0F:CA79: F0        .byte $F0   ; 
- - - - - - 0x03CA8A 0F:CA7A: F4        .byte $F4   ; 
- - - - - - 0x03CA8B 0F:CA7B: A2        .byte $A2   ; 
- - - - - - 0x03CA8C 0F:CA7C: 05        .byte $05   ; 
- - - - - - 0x03CA8D 0F:CA7D: 20        .byte $20   ; 
- - - - - - 0x03CA8E 0F:CA7E: 02        .byte $02   ; 
- - - - - - 0x03CA8F 0F:CA7F: CB        .byte $CB   ; 
- - - - - - 0x03CA90 0F:CA80: A2        .byte $A2   ; 
- - - - - - 0x03CA91 0F:CA81: 09        .byte $09   ; 
- - - - - - 0x03CA92 0F:CA82: 20        .byte $20   ; 
- - - - - - 0x03CA93 0F:CA83: 02        .byte $02   ; 
- - - - - - 0x03CA94 0F:CA84: CB        .byte $CB   ; 
- - - - - - 0x03CA95 0F:CA85: A2        .byte $A2   ; 
- - - - - - 0x03CA96 0F:CA86: 0D        .byte $0D   ; 
- - - - - - 0x03CA97 0F:CA87: 20        .byte $20   ; 
- - - - - - 0x03CA98 0F:CA88: 02        .byte $02   ; 
- - - - - - 0x03CA99 0F:CA89: CB        .byte $CB   ; 
- - - - - - 0x03CA9A 0F:CA8A: A2        .byte $A2   ; 
- - - - - - 0x03CA9B 0F:CA8B: 15        .byte $15   ; 
- - - - - - 0x03CA9C 0F:CA8C: 20        .byte $20   ; 
- - - - - - 0x03CA9D 0F:CA8D: 02        .byte $02   ; 
- - - - - - 0x03CA9E 0F:CA8E: CB        .byte $CB   ; 
- - - - - - 0x03CA9F 0F:CA8F: A2        .byte $A2   ; 
- - - - - - 0x03CAA0 0F:CA90: 11        .byte $11   ; 
- - - - - - 0x03CAA1 0F:CA91: 20        .byte $20   ; 
- - - - - - 0x03CAA2 0F:CA92: 02        .byte $02   ; 
- - - - - - 0x03CAA3 0F:CA93: CB        .byte $CB   ; 
- - - - - - 0x03CAA4 0F:CA94: 4C        .byte $4C   ; <L>
- - - - - - 0x03CAA5 0F:CA95: 4D        .byte $4D   ; <M>
- - - - - - 0x03CAA6 0F:CA96: CA        .byte $CA   ; 
C D 2 - - - 0x03CAA7 0F:CA97: A2 01     LDX #$01
C - - - - - 0x03CAA9 0F:CA99: B5 00     LDA ram_0000,X
C - - - - - 0x03CAAB 0F:CA9B: F0 08     BEQ $CAA5
C - - - - - 0x03CAAD 0F:CA9D: C9 FF     CMP #$FF
C - - - - - 0x03CAAF 0F:CA9F: F0 33     BEQ $CAD4
C - - - - - 0x03CAB1 0F:CAA1: D6 00     DEC ram_0000,X
C - - - - - 0x03CAB3 0F:CAA3: F0 14     BEQ $CAB9
C D 2 - - - 0x03CAB5 0F:CAA5: 8A        TXA
C - - - - - 0x03CAB6 0F:CAA6: 18        CLC
C - - - - - 0x03CAB7 0F:CAA7: 69 04     ADC #$04
C - - - - - 0x03CAB9 0F:CAA9: AA        TAX
C - - - - - 0x03CABA 0F:CAAA: E0 19     CPX #$19
C - - - - - 0x03CABC 0F:CAAC: D0 EB     BNE $CA99
C - - - - - 0x03CABE 0F:CAAE: A5 1B     LDA ram_001B
C - - - - - 0x03CAC0 0F:CAB0: 10 FC     BPL $CAAE
C - - - - - 0x03CAC2 0F:CAB2: 29 7F     AND #$7F
C - - - - - 0x03CAC4 0F:CAB4: 85 1B     STA ram_001B
C - - - - - 0x03CAC6 0F:CAB6: 4C 97 CA  JMP $CA97
C - - - - - 0x03CAC9 0F:CAB9: 46 19     LSR ram_0019
C - - - - - 0x03CACB 0F:CABB: 86 00     STX ram_0000
C - - - - - 0x03CACD 0F:CABD: B5 02     LDA ram_0002,X
C - - - - - 0x03CACF 0F:CABF: 85 24     STA ram_0024
C - - - - - 0x03CAD1 0F:CAC1: B5 03     LDA ram_0003,X
C - - - - - 0x03CAD3 0F:CAC3: 85 25     STA ram_0025
C - - - - - 0x03CAD5 0F:CAC5: 20 2D CE  JSR $CE2D
C - - - - - 0x03CAD8 0F:CAC8: B5 01     LDA ram_0001,X
C - - - - - 0x03CADA 0F:CACA: AA        TAX
C - - - - - 0x03CADB 0F:CACB: 9A        TXS
C - - - - - 0x03CADC 0F:CACC: 38        SEC
C - - - - - 0x03CADD 0F:CACD: 66 19     ROR ram_0019
C - - - - - 0x03CADF 0F:CACF: 68        PLA
C - - - - - 0x03CAE0 0F:CAD0: A8        TAY
C - - - - - 0x03CAE1 0F:CAD1: 68        PLA
C - - - - - 0x03CAE2 0F:CAD2: AA        TAX
C - - - - - 0x03CAE3 0F:CAD3: 60        RTS
C - - - - - 0x03CAE4 0F:CAD4: 86 00     STX ram_0000
C - - - - - 0x03CAE6 0F:CAD6: B5 02     LDA ram_0002,X
C - - - - - 0x03CAE8 0F:CAD8: 85 24     STA ram_0024
C - - - - - 0x03CAEA 0F:CADA: 18        CLC
C - - - - - 0x03CAEB 0F:CADB: 69 01     ADC #$01
C - - - - - 0x03CAED 0F:CADD: 85 25     STA ram_0025
C - - - - - 0x03CAEF 0F:CADF: 20 2D CE  JSR $CE2D
C - - - - - 0x03CAF2 0F:CAE2: B5 01     LDA ram_0001,X
C - - - - - 0x03CAF4 0F:CAE4: AA        TAX
C - - - - - 0x03CAF5 0F:CAE5: 9A        TXS
C - - - - - 0x03CAF6 0F:CAE6: 60        RTS
C D 2 - - - 0x03CAF7 0F:CAE7: 48        PHA
C - - - - - 0x03CAF8 0F:CAE8: 98        TYA
C - - - - - 0x03CAF9 0F:CAE9: B4 01     LDY ram_0001,X
C - - - - - 0x03CAFB 0F:CAEB: 99 01 01  STA ram_0101,Y
C - - - - - 0x03CAFE 0F:CAEE: 68        PLA
C - - - - - 0x03CAFF 0F:CAEF: 99 02 01  STA ram_0102,Y
C - - - - - 0x03CB02 0F:CAF2: A9 FF     LDA #$FF
C - - - - - 0x03CB04 0F:CAF4: 95 00     STA ram_0000,X
C - - - - - 0x03CB06 0F:CAF6: 60        RTS
C D 2 - - - 0x03CB07 0F:CAF7: A9 00     LDA #$00
C - - - - - 0x03CB09 0F:CAF9: A6 00     LDX ram_0000
C - - - - - 0x03CB0B 0F:CAFB: 95 00     STA ram_0000,X
C - - - - - 0x03CB0D 0F:CAFD: 95 01     STA ram_0001,X
C - - - - - 0x03CB0F 0F:CAFF: 4C A5 CA  JMP $CAA5
C D 2 - - - 0x03CB12 0F:CB02: B5 01     LDA ram_0001,X
C - - - - - 0x03CB14 0F:CB04: F0 06     BEQ $CB0C
C - - - - - 0x03CB16 0F:CB06: B5 00     LDA ram_0000,X
C - - - - - 0x03CB18 0F:CB08: D0 02     BNE $CB0C
C - - - - - 0x03CB1A 0F:CB0A: F6 00     INC ram_0000,X
C - - - - - 0x03CB1C 0F:CB0C: 60        RTS
- - - - - - 0x03CB1D 0F:CB0D: A9        .byte $A9   ; 
- - - - - - 0x03CB1E 0F:CB0E: 00        .byte $00   ; 
C D 2 - - - 0x03CB1F 0F:CB0F: 85 7F     STA ram_007F
C - - - - - 0x03CB21 0F:CB11: 8A        TXA
C - - - - - 0x03CB22 0F:CB12: 48        PHA
C - - - - - 0x03CB23 0F:CB13: 98        TYA
C - - - - - 0x03CB24 0F:CB14: 48        PHA
C - - - - - 0x03CB25 0F:CB15: A6 00     LDX ram_0000
C - - - - - 0x03CB27 0F:CB17: A5 24     LDA ram_0024
C - - - - - 0x03CB29 0F:CB19: 95 02     STA ram_0002,X
C - - - - - 0x03CB2B 0F:CB1B: A5 25     LDA ram_0025
C - - - - - 0x03CB2D 0F:CB1D: 95 03     STA ram_0003,X
C - - - - - 0x03CB2F 0F:CB1F: A5 7F     LDA ram_007F
C - - - - - 0x03CB31 0F:CB21: 95 00     STA ram_0000,X
C - - - - - 0x03CB33 0F:CB23: 8A        TXA
C - - - - - 0x03CB34 0F:CB24: A8        TAY
C - - - - - 0x03CB35 0F:CB25: BA        TSX
C - - - - - 0x03CB36 0F:CB26: 96 01     STX ram_0001,Y
C - - - - - 0x03CB38 0F:CB28: A6 00     LDX ram_0000
C - - - - - 0x03CB3A 0F:CB2A: 4C A5 CA  JMP $CAA5
- - - - - - 0x03CB3D 0F:CB2D: 20        .byte $20   ; 
- - - - - - 0x03CB3E 0F:CB2E: 40        .byte $40   ; 
- - - - - - 0x03CB3F 0F:CB2F: 18        .byte $18   ; 
- - - - - - 0x03CB40 0F:CB30: 18        .byte $18   ; 
- - - - - - 0x03CB41 0F:CB31: 18        .byte $18   ; 
- - - - - - 0x03CB42 0F:CB32: 18        .byte $18   ; 
- - - - - - 0x03CB43 0F:CB33: 18        .byte $18   ; 
- - - - - - 0x03CB44 0F:CB34: 18        .byte $18   ; 