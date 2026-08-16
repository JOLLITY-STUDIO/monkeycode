; bank_30.asm 分片 4/5 (原文件行 3001-4000, 共 4835 行)

C - - - - - 0x03D257 0F:D247: 10 05     BPL $D24E
C - - - - - 0x03D259 0F:D249: A9 00     LDA #$00
C - - - - - 0x03D25B 0F:D24B: 8D 49 04  STA ram_0449
C - - - - - 0x03D25E 0F:D24E: 8A        TXA
C - - - - - 0x03D25F 0F:D24F: 48        PHA
C - - - - - 0x03D260 0F:D250: A9 00     LDA #$00
C - - - - - 0x03D262 0F:D252: 20 7C CD  JSR $CD7C
C - - - - - 0x03D265 0F:D255: 68        PLA
C - - - - - 0x03D266 0F:D256: 48        PHA
C - - - - - 0x03D267 0F:D257: 20 63 D2  JSR $D263
C - - - - - 0x03D26A 0F:D25A: A9 0B     LDA #$0B
C - - - - - 0x03D26C 0F:D25C: 20 7C CD  JSR $CD7C
C - - - - - 0x03D26F 0F:D25F: 68        PLA
C - - - - - 0x03D270 0F:D260: 4C 63 D2  JMP $D263
C D 2 - - - 0x03D273 0F:D263: AA        TAX
C - - - - - 0x03D274 0F:D264: A0 0A     LDY #$0A
C - - - - - 0x03D276 0F:D266: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D278 0F:D268: F0 0B     BEQ $D275
C - - - - - 0x03D27A 0F:D26A: 8A        TXA
C - - - - - 0x03D27B 0F:D26B: 18        CLC
C - - - - - 0x03D27C 0F:D26C: 71 34     ADC (ram_0034),Y
C - - - - - 0x03D27E 0F:D26E: 10 02     BPL $D272
C - - - - - 0x03D280 0F:D270: A9 00     LDA #$00
C - - - - - 0x03D282 0F:D272: 91 34     STA (ram_0034),Y
C - - - - - 0x03D284 0F:D274: 60        RTS
C - - - - - 0x03D285 0F:D275: A0 07     LDY #$07
C - - - - - 0x03D287 0F:D277: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D289 0F:D279: F0 1E     BEQ $D299
C - - - - - 0x03D28B 0F:D27B: A0 06     LDY #$06
C - - - - - 0x03D28D 0F:D27D: 8A        TXA
C - - - - - 0x03D28E 0F:D27E: 18        CLC
C - - - - - 0x03D28F 0F:D27F: 71 34     ADC (ram_0034),Y
C - - - - - 0x03D291 0F:D281: 10 14     BPL $D297
C - - - - - 0x03D293 0F:D283: 18        CLC
C - - - - - 0x03D294 0F:D284: 69 03     ADC #$03
C - - - - - 0x03D296 0F:D286: 48        PHA
C - - - - - 0x03D297 0F:D287: A0 07     LDY #$07
C - - - - - 0x03D299 0F:D289: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D29B 0F:D28B: 38        SEC
C - - - - - 0x03D29C 0F:D28C: E9 19     SBC #$19
C - - - - - 0x03D29E 0F:D28E: 10 02     BPL $D292
C - - - - - 0x03D2A0 0F:D290: A9 00     LDA #$00
C - - - - - 0x03D2A2 0F:D292: 91 34     STA (ram_0034),Y
C - - - - - 0x03D2A4 0F:D294: 68        PLA
C - - - - - 0x03D2A5 0F:D295: A0 06     LDY #$06
C - - - - - 0x03D2A7 0F:D297: 91 34     STA (ram_0034),Y
C - - - - - 0x03D2A9 0F:D299: 60        RTS
C D 2 - - - 0x03D2AA 0F:D29A: AE 21 06  LDX ram_0621
C - - - - - 0x03D2AD 0F:D29D: BD 59 D3  LDA $D359,X
C - - - - - 0x03D2B0 0F:D2A0: 20 7F EF  JSR $EF7F
C - - - - - 0x03D2B3 0F:D2A3: AE 21 06  LDX ram_0621
C - - - - - 0x03D2B6 0F:D2A6: BD 5C D3  LDA $D35C,X
C - - - - - 0x03D2B9 0F:D2A9: 20 7F EF  JSR $EF7F
C - - - - - 0x03D2BC 0F:D2AC: A9 00     LDA #$00
C - - - - - 0x03D2BE 0F:D2AE: 8D 3E 04  STA ram_043E
C - - - - - 0x03D2C1 0F:D2B1: 8D 1E 06  STA ram_061E
C D 2 - - - 0x03D2C4 0F:D2B4: A9 01     LDA #$01
C - - - - - 0x03D2C6 0F:D2B6: 20 0F CB  JSR $CB0F
C - - - - - 0x03D2C9 0F:D2B9: A9 0F     LDA #$0F
C - - - - - 0x03D2CB 0F:D2BB: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D2CE 0F:D2BE: F0 49     BEQ $D309
C - - - - - 0x03D2D0 0F:D2C0: A2 00     LDX #$00
C - - - - - 0x03D2D2 0F:D2C2: 4A        LSR
C - - - - - 0x03D2D3 0F:D2C3: B0 03     BCS $D2C8
C - - - - - 0x03D2D5 0F:D2C5: E8        INX
C - - - - - 0x03D2D6 0F:D2C6: D0 FA     BNE $D2C2
C - - - - - 0x03D2D8 0F:D2C8: 86 3A     STX ram_003A
C - - - - - 0x03D2DA 0F:D2CA: AD 21 06  LDA ram_0621
C - - - - - 0x03D2DD 0F:D2CD: 38        SEC
C - - - - - 0x03D2DE 0F:D2CE: E9 03     SBC #$03
C - - - - - 0x03D2E0 0F:D2D0: 0A        ASL
C - - - - - 0x03D2E1 0F:D2D1: 0A        ASL
C - - - - - 0x03D2E2 0F:D2D2: 65 3A     ADC ram_003A
C - - - - - 0x03D2E4 0F:D2D4: AA        TAX
C - - - - - 0x03D2E5 0F:D2D5: BD 62 D3  LDA $D362,X
C - - - - - 0x03D2E8 0F:D2D8: C9 FF     CMP #$FF
C - - - - - 0x03D2EA 0F:D2DA: F0 2D     BEQ $D309
C - - - - - 0x03D2EC 0F:D2DC: C9 02     CMP #$02
C - - - - - 0x03D2EE 0F:D2DE: D0 0D     BNE $D2ED
C - - - - - 0x03D2F0 0F:D2E0: 20 77 CD  JSR $CD77
C - - - - - 0x03D2F3 0F:D2E3: A0 00     LDY #$00
C - - - - - 0x03D2F5 0F:D2E5: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D2F7 0F:D2E7: C9 22     CMP #$22
C - - - - - 0x03D2F9 0F:D2E9: D0 1E     BNE $D309
C - - - - - 0x03D2FB 0F:D2EB: A9 02     LDA #$02
C - - - - - 0x03D2FD 0F:D2ED: 8D 3D 04  STA ram_043D
C - - - - - 0x03D300 0F:D2F0: A6 3A     LDX ram_003A
C - - - - - 0x03D302 0F:D2F2: AD 1E 06  LDA ram_061E
C - - - - - 0x03D305 0F:D2F5: 8E 1E 06  STX ram_061E
C - - - - - 0x03D308 0F:D2F8: 48        PHA
C - - - - - 0x03D309 0F:D2F9: 29 03     AND #$03
C - - - - - 0x03D30B 0F:D2FB: CD 1E 06  CMP ram_061E
C - - - - - 0x03D30E 0F:D2FE: F0 03     BEQ $D303
C - - - - - 0x03D310 0F:D300: 68        PLA
C - - - - - 0x03D311 0F:D301: 8A        TXA
C - - - - - 0x03D312 0F:D302: 48        PHA
C - - - - - 0x03D313 0F:D303: 68        PLA
C - - - - - 0x03D314 0F:D304: 09 80     ORA #$80
C - - - - - 0x03D316 0F:D306: 8D 1E 06  STA ram_061E
C - - - - - 0x03D319 0F:D309: A9 80     LDA #$80
C - - - - - 0x03D31B 0F:D30B: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D31E 0F:D30E: F0 08     BEQ $D318
C - - - - - 0x03D320 0F:D310: 2C 1E 06  BIT ram_061E
C - - - - - 0x03D323 0F:D313: 10 03     BPL $D318
C - - - - - 0x03D325 0F:D315: 4C 46 CC  JMP $CC46
C - - - - - 0x03D328 0F:D318: 2C 1E 06  BIT ram_061E
C - - - - - 0x03D32B 0F:D31B: 10 97     BPL $D2B4
C - - - - - 0x03D32D 0F:D31D: A9 20     LDA #$20
C - - - - - 0x03D32F 0F:D31F: 2C 1E 06  BIT ram_061E
C - - - - - 0x03D332 0F:D322: D0 0B     BNE $D32F
C - - - - - 0x03D334 0F:D324: 0D 1E 06  ORA ram_061E
C - - - - - 0x03D337 0F:D327: 8D 1E 06  STA ram_061E
C - - - - - 0x03D33A 0F:D32A: A9 00     LDA #$00
C - - - - - 0x03D33C 0F:D32C: 8D 1F 06  STA ram_061F
C - - - - - 0x03D33F 0F:D32F: AE 1F 06  LDX ram_061F
C - - - - - 0x03D342 0F:D332: F0 06     BEQ $D33A
C - - - - - 0x03D344 0F:D334: CE 1F 06  DEC ram_061F
C - - - - - 0x03D347 0F:D337: 4C B4 D2  JMP $D2B4
C - - - - - 0x03D34A 0F:D33A: A9 0D     LDA #$0D
C - - - - - 0x03D34C 0F:D33C: 8D 1F 06  STA ram_061F
C - - - - - 0x03D34F 0F:D33F: AD 1E 06  LDA ram_061E
C - - - - - 0x03D352 0F:D342: 49 40     EOR #$40
C - - - - - 0x03D354 0F:D344: 8D 1E 06  STA ram_061E
C - - - - - 0x03D357 0F:D347: AC 3D 04  LDY ram_043D
C - - - - - 0x03D35A 0F:D34A: B9 48 D5  LDA $D548,Y
C - - - - - 0x03D35D 0F:D34D: 2C 1E 06  BIT ram_061E
C - - - - - 0x03D360 0F:D350: 70 02     BVS $D354
C - - - - - 0x03D362 0F:D352: 09 80     ORA #$80
C - - - - - 0x03D364 0F:D354: A2 00     LDX #$00
C - - - - - 0x03D366 0F:D356: 20 3D E9  JSR $E93D
C - - - - - 0x03D369 0F:D359: 4C B4 D2  JMP $D2B4
- D 2 - - - 0x03D36C 0F:D35C: 07        .byte $07   ; 
- D 2 - - - 0x03D36D 0F:D35D: 02        .byte $02   ; 
- D 2 - - - 0x03D36E 0F:D35E: 2D        .byte $2D   ; 
- D 2 - - - 0x03D36F 0F:D35F: 08        .byte $08   ; 
- D 2 - - - 0x03D370 0F:D360: 06        .byte $06   ; 
- D 2 - - - 0x03D371 0F:D361: 06        .byte $06   ; 
- D 2 - - - 0x03D372 0F:D362: 06        .byte $06   ; 
- D 2 - - - 0x03D373 0F:D363: 06        .byte $06   ; 
- D 2 - - - 0x03D374 0F:D364: FF        .byte $FF   ; 
- D 2 - - - 0x03D375 0F:D365: 05        .byte $05   ; 
- D 2 - - - 0x03D376 0F:D366: 00        .byte $00   ; 
- D 2 - - - 0x03D377 0F:D367: 00        .byte $00   ; 
- D 2 - - - 0x03D378 0F:D368: 02        .byte $02   ; 
- D 2 - - - 0x03D379 0F:D369: 01        .byte $01   ; 
- D 2 - - - 0x03D37A 0F:D36A: 09        .byte $09   ; 
- D 2 - - - 0x03D37B 0F:D36B: 07        .byte $07   ; 
- D 2 - - - 0x03D37C 0F:D36C: FF        .byte $FF   ; 
- D 2 - - - 0x03D37D 0F:D36D: 08        .byte $08   ; 
C D 2 - - - 0x03D37E 0F:D36E: AD 21 06  LDA ram_0621
C - - - - - 0x03D381 0F:D371: C9 03     CMP #$03
C - - - - - 0x03D383 0F:D373: 90 03     BCC $D378
C - - - - - 0x03D385 0F:D375: 4C 9A D2  JMP $D29A
C - - - - - 0x03D388 0F:D378: AD 00 06  LDA ram_0600
C - - - - - 0x03D38B 0F:D37B: D0 01     BNE $D37E
C - - - - - 0x03D38D 0F:D37D: 60        RTS
C - - - - - 0x03D38E 0F:D37E: 20 46 CC  JSR $CC46
C - - - - - 0x03D391 0F:D381: A2 03     LDX #$03
C - - - - - 0x03D393 0F:D383: A9 FF     LDA #$FF
C - - - - - 0x03D395 0F:D385: 9D 0B 06  STA ram_060B,X
C - - - - - 0x03D398 0F:D388: CA        DEX
C - - - - - 0x03D399 0F:D389: 10 FA     BPL $D385
C - - - - - 0x03D39B 0F:D38B: A9 00     LDA #$00
C - - - - - 0x03D39D 0F:D38D: 8D 1E 06  STA ram_061E
C - - - - - 0x03D3A0 0F:D390: 20 EA D4  JSR $D4EA
C D 2 - - - 0x03D3A3 0F:D393: A9 0D     LDA #$0D
C - - - - - 0x03D3A5 0F:D395: AE 1E 06  LDX ram_061E
C - - - - - 0x03D3A8 0F:D398: BC 01 06  LDY ram_0601,X
C - - - - - 0x03D3AB 0F:D39B: F0 06     BEQ $D3A3
C - - - - - 0x03D3AD 0F:D39D: AE 21 06  LDX ram_0621
C - - - - - 0x03D3B0 0F:D3A0: BD 52 D5  LDA $D552,X
C - - - - - 0x03D3B3 0F:D3A3: 20 7F EF  JSR $EF7F
C D 2 - - - 0x03D3B6 0F:D3A6: A9 01     LDA #$01
C - - - - - 0x03D3B8 0F:D3A8: 20 0F CB  JSR $CB0F
C - - - - - 0x03D3BB 0F:D3AB: A9 80     LDA #$80
C - - - - - 0x03D3BD 0F:D3AD: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D3C0 0F:D3B0: D0 03     BNE $D3B5
C - - - - - 0x03D3C2 0F:D3B2: 4C 38 D4  JMP $D438
C - - - - - 0x03D3C5 0F:D3B5: AE 1E 06  LDX ram_061E
C - - - - - 0x03D3C8 0F:D3B8: EC 00 06  CPX ram_0600
C - - - - - 0x03D3CB 0F:D3BB: D0 03     BNE $D3C0
C - - - - - 0x03D3CD 0F:D3BD: 4C 46 CC  JMP $CC46
C - - - - - 0x03D3D0 0F:D3C0: BD 0B 06  LDA ram_060B,X
C - - - - - 0x03D3D3 0F:D3C3: C9 FF     CMP #$FF
C - - - - - 0x03D3D5 0F:D3C5: F0 71     BEQ $D438
C - - - - - 0x03D3D7 0F:D3C7: 8D 3D 04  STA ram_043D
C - - - - - 0x03D3DA 0F:D3CA: AA        TAX
C - - - - - 0x03D3DB 0F:D3CB: AC 1E 06  LDY ram_061E
C - - - - - 0x03D3DE 0F:D3CE: B9 01 06  LDA ram_0601,Y
C - - - - - 0x03D3E1 0F:D3D1: 8D 42 04  STA ram_0442
C - - - - - 0x03D3E4 0F:D3D4: 48        PHA
C - - - - - 0x03D3E5 0F:D3D5: A5 22     LDA ram_0022
C - - - - - 0x03D3E7 0F:D3D7: A9 1C     LDA #$1C
C - - - - - 0x03D3E9 0F:D3D9: 85 24     STA ram_0024
C - - - - - 0x03D3EB 0F:D3DB: A9 1D     LDA #$1D
C - - - - - 0x03D3ED 0F:D3DD: 85 25     STA ram_0025
C - - - - - 0x03D3EF 0F:D3DF: 20 2D CE  JSR $CE2D
C - - - - - 0x03D3F2 0F:D3E2: 68        PLA
C - - - - - 0x03D3F3 0F:D3E3: 20 0C 80  JSR $800C
C - - - - - 0x03D3F6 0F:D3E6: AD 30 04  LDA ram_0430
C - - - - - 0x03D3F9 0F:D3E9: F0 39     BEQ $D424
C - - - - - 0x03D3FB 0F:D3EB: 18        CLC
C - - - - - 0x03D3FC 0F:D3EC: 69 0B     ADC #$0B
C - - - - - 0x03D3FE 0F:D3EE: 20 7F EF  JSR $EF7F
C - - - - - 0x03D401 0F:D3F1: 20 7A D7  JSR $D77A
C - - - - - 0x03D404 0F:D3F4: 0A        ASL
C - - - - - 0x03D405 0F:D3F5: 08        PHP
C - - - - - 0x03D406 0F:D3F6: B0 14     BCS $D40C
C - - - - - 0x03D408 0F:D3F8: 4A        LSR
C - - - - - 0x03D409 0F:D3F9: 48        PHA
C - - - - - 0x03D40A 0F:D3FA: 8D 3E 04  STA ram_043E
C - - - - - 0x03D40D 0F:D3FD: 20 46 D7  JSR $D746
C - - - - - 0x03D410 0F:D400: 68        PLA
C - - - - - 0x03D411 0F:D401: 90 09     BCC $D40C
C - - - - - 0x03D413 0F:D403: AE 1E 06  LDX ram_061E
C - - - - - 0x03D416 0F:D406: 9D 06 06  STA ram_0606,X
C - - - - - 0x03D419 0F:D409: EE 1E 06  INC ram_061E
C - - - - - 0x03D41C 0F:D40C: 20 46 CC  JSR $CC46
C - - - - - 0x03D41F 0F:D40F: 20 EA D4  JSR $D4EA
C - - - - - 0x03D422 0F:D412: AD 1E 06  LDA ram_061E
C - - - - - 0x03D425 0F:D415: CD 00 06  CMP ram_0600
C - - - - - 0x03D428 0F:D418: F0 05     BEQ $D41F
C - - - - - 0x03D42A 0F:D41A: A9 16     LDA #$16
C - - - - - 0x03D42C 0F:D41C: 20 7F EF  JSR $EF7F
C - - - - - 0x03D42F 0F:D41F: 28        PLP
C - - - - - 0x03D430 0F:D420: B0 16     BCS $D438
C - - - - - 0x03D432 0F:D422: 90 0C     BCC $D430
C - - - - - 0x03D434 0F:D424: AE 1E 06  LDX ram_061E
C - - - - - 0x03D437 0F:D427: 9D 06 06  STA ram_0606,X
C - - - - - 0x03D43A 0F:D42A: 20 E4 D4  JSR $D4E4
C - - - - - 0x03D43D 0F:D42D: EE 1E 06  INC ram_061E
C - - - - - 0x03D440 0F:D430: AD 1E 06  LDA ram_061E
C - - - - - 0x03D443 0F:D433: CD 00 06  CMP ram_0600
C - - - - - 0x03D446 0F:D436: D0 17     BNE $D44F
C D 2 - - - 0x03D448 0F:D438: A9 40     LDA #$40
C - - - - - 0x03D44A 0F:D43A: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D44D 0F:D43D: F0 20     BEQ $D45F
C - - - - - 0x03D44F 0F:D43F: AE 1E 06  LDX ram_061E
C - - - - - 0x03D452 0F:D442: F0 1B     BEQ $D45F
C - - - - - 0x03D454 0F:D444: EC 00 06  CPX ram_0600
C - - - - - 0x03D457 0F:D447: F0 03     BEQ $D44C
C - - - - - 0x03D459 0F:D449: 20 E4 D4  JSR $D4E4
C - - - - - 0x03D45C 0F:D44C: CE 1E 06  DEC ram_061E
C - - - - - 0x03D45F 0F:D44F: AD 1F 06  LDA ram_061F
C - - - - - 0x03D462 0F:D452: 09 40     ORA #$40
C - - - - - 0x03D464 0F:D454: 8D 1F 06  STA ram_061F
C - - - - - 0x03D467 0F:D457: A9 00     LDA #$00
C - - - - - 0x03D469 0F:D459: 8D 20 06  STA ram_0620
C - - - - - 0x03D46C 0F:D45C: 4C 93 D3  JMP $D393
C - - - - - 0x03D46F 0F:D45F: A9 0F     LDA #$0F
C - - - - - 0x03D471 0F:D461: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D474 0F:D464: F0 39     BEQ $D49F
C - - - - - 0x03D476 0F:D466: A2 00     LDX #$00
C - - - - - 0x03D478 0F:D468: 4A        LSR
C - - - - - 0x03D479 0F:D469: B0 03     BCS $D46E
C - - - - - 0x03D47B 0F:D46B: E8        INX
C - - - - - 0x03D47C 0F:D46C: D0 FA     BNE $D468
C - - - - - 0x03D47E 0F:D46E: 86 3A     STX ram_003A
C - - - - - 0x03D480 0F:D470: AD 21 06  LDA ram_0621
C - - - - - 0x03D483 0F:D473: 0A        ASL
C - - - - - 0x03D484 0F:D474: 0A        ASL
C - - - - - 0x03D485 0F:D475: 65 3A     ADC ram_003A
C - - - - - 0x03D487 0F:D477: AA        TAX
C - - - - - 0x03D488 0F:D478: BD 55 D5  LDA $D555,X
C - - - - - 0x03D48B 0F:D47B: AC 1E 06  LDY ram_061E
C - - - - - 0x03D48E 0F:D47E: BE 01 06  LDX ram_0601,Y
C - - - - - 0x03D491 0F:D481: D0 05     BNE $D488
C - - - - - 0x03D493 0F:D483: A6 3A     LDX ram_003A
C - - - - - 0x03D495 0F:D485: BD 61 D5  LDA $D561,X
C - - - - - 0x03D498 0F:D488: C9 FF     CMP #$FF
C - - - - - 0x03D49A 0F:D48A: F0 13     BEQ $D49F
C - - - - - 0x03D49C 0F:D48C: AE 1E 06  LDX ram_061E
C - - - - - 0x03D49F 0F:D48F: DD 0B 06  CMP ram_060B,X
C - - - - - 0x03D4A2 0F:D492: F0 0B     BEQ $D49F
C - - - - - 0x03D4A4 0F:D494: 9D 0B 06  STA ram_060B,X
C - - - - - 0x03D4A7 0F:D497: A9 00     LDA #$00
C - - - - - 0x03D4A9 0F:D499: 9D 06 06  STA ram_0606,X
C - - - - - 0x03D4AC 0F:D49C: 8D 1F 06  STA ram_061F
C - - - - - 0x03D4AF 0F:D49F: AD 1E 06  LDA ram_061E
C - - - - - 0x03D4B2 0F:D4A2: CD 00 06  CMP ram_0600
C - - - - - 0x03D4B5 0F:D4A5: D0 03     BNE $D4AA
C - - - - - 0x03D4B7 0F:D4A7: 4C A6 D3  JMP $D3A6
C - - - - - 0x03D4BA 0F:D4AA: 2C 1F 06  BIT ram_061F
C - - - - - 0x03D4BD 0F:D4AD: 30 0A     BMI $D4B9
C - - - - - 0x03D4BF 0F:D4AF: A9 80     LDA #$80
C - - - - - 0x03D4C1 0F:D4B1: 8D 1F 06  STA ram_061F
C - - - - - 0x03D4C4 0F:D4B4: A9 00     LDA #$00
C - - - - - 0x03D4C6 0F:D4B6: 8D 20 06  STA ram_0620
C - - - - - 0x03D4C9 0F:D4B9: AD 20 06  LDA ram_0620
C - - - - - 0x03D4CC 0F:D4BC: F0 06     BEQ $D4C4
C - - - - - 0x03D4CE 0F:D4BE: CE 20 06  DEC ram_0620
C - - - - - 0x03D4D1 0F:D4C1: 4C A6 D3  JMP $D3A6
C - - - - - 0x03D4D4 0F:D4C4: A9 0D     LDA #$0D
C - - - - - 0x03D4D6 0F:D4C6: 8D 20 06  STA ram_0620
C - - - - - 0x03D4D9 0F:D4C9: AD 1F 06  LDA ram_061F
C - - - - - 0x03D4DC 0F:D4CC: 49 40     EOR #$40
C - - - - - 0x03D4DE 0F:D4CE: 8D 1F 06  STA ram_061F
C - - - - - 0x03D4E1 0F:D4D1: AE 1E 06  LDX ram_061E
C - - - - - 0x03D4E4 0F:D4D4: 20 04 D5  JSR $D504
C - - - - - 0x03D4E7 0F:D4D7: 2C 1F 06  BIT ram_061F
C - - - - - 0x03D4EA 0F:D4DA: 70 02     BVS $D4DE
C - - - - - 0x03D4EC 0F:D4DC: 09 80     ORA #$80
C - - - - - 0x03D4EE 0F:D4DE: 20 3D E9  JSR $E93D
C - - - - - 0x03D4F1 0F:D4E1: 4C A6 D3  JMP $D3A6
C - - - - - 0x03D4F4 0F:D4E4: 20 04 D5  JSR $D504
C - - - - - 0x03D4F7 0F:D4E7: 4C 3D E9  JMP $E93D
C - - - - - 0x03D4FA 0F:D4EA: AD 00 06  LDA ram_0600
C - - - - - 0x03D4FD 0F:D4ED: 18        CLC
C - - - - - 0x03D4FE 0F:D4EE: 69 11     ADC #$11
C - - - - - 0x03D500 0F:D4F0: 20 7F EF  JSR $EF7F
C - - - - - 0x03D503 0F:D4F3: A9 00     LDA #$00
C - - - - - 0x03D505 0F:D4F5: 48        PHA
C - - - - - 0x03D506 0F:D4F6: AA        TAX
C - - - - - 0x03D507 0F:D4F7: 20 E4 D4  JSR $D4E4
C - - - - - 0x03D50A 0F:D4FA: 68        PLA
C - - - - - 0x03D50B 0F:D4FB: 18        CLC
C - - - - - 0x03D50C 0F:D4FC: 69 01     ADC #$01
C - - - - - 0x03D50E 0F:D4FE: CD 00 06  CMP ram_0600
C - - - - - 0x03D511 0F:D501: D0 F2     BNE $D4F5
C - - - - - 0x03D513 0F:D503: 60        RTS
C - - - - - 0x03D514 0F:D504: BD 0B 06  LDA ram_060B,X
C - - - - - 0x03D517 0F:D507: C9 FF     CMP #$FF
C - - - - - 0x03D519 0F:D509: D0 03     BNE $D50E
C - - - - - 0x03D51B 0F:D50B: A9 1D     LDA #$1D
C - - - - - 0x03D51D 0F:D50D: 60        RTS
C - - - - - 0x03D51E 0F:D50E: BC 01 06  LDY ram_0601,X
C - - - - - 0x03D521 0F:D511: D0 05     BNE $D518
C - - - - - 0x03D523 0F:D513: A8        TAY
C - - - - - 0x03D524 0F:D514: B9 48 D5  LDA $D548,Y
C - - - - - 0x03D527 0F:D517: 60        RTS
C - - - - - 0x03D528 0F:D518: 0A        ASL
C - - - - - 0x03D529 0F:D519: A8        TAY
C - - - - - 0x03D52A 0F:D51A: B9 2B D5  LDA $D52B,Y
C - - - - - 0x03D52D 0F:D51D: 85 3A     STA ram_003A
C - - - - - 0x03D52F 0F:D51F: B9 2C D5  LDA $D52C,Y
C - - - - - 0x03D532 0F:D522: 85 3B     STA ram_003B
C - - - - - 0x03D534 0F:D524: BD 06 06  LDA ram_0606,X
C - - - - - 0x03D537 0F:D527: A8        TAY
C - - - - - 0x03D538 0F:D528: B1 3A     LDA (ram_003A),Y
C - - - - - 0x03D53A 0F:D52A: 60        RTS
- D 2 - - - 0x03D53B 0F:D52B: 39        .byte $39   ; <9>
- D 2 - - - 0x03D53C 0F:D52C: D5        .byte $D5   ; 
- D 2 - - - 0x03D53D 0F:D52D: 3D        .byte $3D   ; 
- D 2 - - - 0x03D53E 0F:D52E: D5        .byte $D5   ; 
- D 2 - - - 0x03D53F 0F:D52F: 42        .byte $42   ; <B>
- D 2 - - - 0x03D540 0F:D530: D5        .byte $D5   ; 
- D 2 - - - 0x03D541 0F:D531: 44        .byte $44   ; <D>
- D 2 - - - 0x03D542 0F:D532: D5        .byte $D5   ; 
- D 2 - - - 0x03D543 0F:D533: 45        .byte $45   ; <E>
- D 2 - - - 0x03D544 0F:D534: D5        .byte $D5   ; 
- D 2 - - - 0x03D545 0F:D535: 46        .byte $46   ; <F>
- D 2 - - - 0x03D546 0F:D536: D5        .byte $D5   ; 
- D 2 - - - 0x03D547 0F:D537: 47        .byte $47   ; <G>
- D 2 - - - 0x03D548 0F:D538: D5        .byte $D5   ; 
- D 2 - I - 0x03D549 0F:D539: 0C        .byte $0C   ; 
- D 2 - I - 0x03D54A 0F:D53A: 0E        .byte $0E   ; 
- D 2 - I - 0x03D54B 0F:D53B: 0D        .byte $0D   ; 
- D 2 - I - 0x03D54C 0F:D53C: 0F        .byte $0F   ; 
- D 2 - I - 0x03D54D 0F:D53D: 07        .byte $07   ; 
- D 2 - I - 0x03D54E 0F:D53E: 08        .byte $08   ; 
- D 2 - I - 0x03D54F 0F:D53F: 09        .byte $09   ; 
- D 2 - I - 0x03D550 0F:D540: 0A        .byte $0A   ; 
- D 2 - I - 0x03D551 0F:D541: 0B        .byte $0B   ; 
- D 2 - I - 0x03D552 0F:D542: 10        .byte $10   ; 
- D 2 - I - 0x03D553 0F:D543: 11        .byte $11   ; 
- D 2 - I - 0x03D554 0F:D544: 15        .byte $15   ; 
- D 2 - I - 0x03D555 0F:D545: 14        .byte $14   ; 
- D 2 - I - 0x03D556 0F:D546: 13        .byte $13   ; 
- D 2 - I - 0x03D557 0F:D547: 12        .byte $12   ; 
- D 2 - - - 0x03D558 0F:D548: 17        .byte $17   ; 
- D 2 - - - 0x03D559 0F:D549: 16        .byte $16   ; 
- D 2 - - - 0x03D55A 0F:D54A: 18        .byte $18   ; 
- D 2 - - - 0x03D55B 0F:D54B: 19        .byte $19   ; 
- D 2 - - - 0x03D55C 0F:D54C: 1A        .byte $1A   ; 
- D 2 - - - 0x03D55D 0F:D54D: 1C        .byte $1C   ; 
- D 2 - - - 0x03D55E 0F:D54E: 1B        .byte $1B   ; 
- D 2 - - - 0x03D55F 0F:D54F: 1E        .byte $1E   ; 
- D 2 - - - 0x03D560 0F:D550: 1F        .byte $1F   ; 
- D 2 - - - 0x03D561 0F:D551: 20        .byte $20   ; 
- D 2 - - - 0x03D562 0F:D552: 16        .byte $16   ; 
- D 2 - - - 0x03D563 0F:D553: 18        .byte $18   ; 
- D 2 - - - 0x03D564 0F:D554: 17        .byte $17   ; 
- D 2 - - - 0x03D565 0F:D555: 00        .byte $00   ; 
- D 2 - - - 0x03D566 0F:D556: 02        .byte $02   ; 
- D 2 - - - 0x03D567 0F:D557: 06        .byte $06   ; 
- D 2 - - - 0x03D568 0F:D558: 01        .byte $01   ; 
- D 2 - - - 0x03D569 0F:D559: 03        .byte $03   ; 
- D 2 - - - 0x03D56A 0F:D55A: 02        .byte $02   ; 
- D 2 - - - 0x03D56B 0F:D55B: 06        .byte $06   ; 
- D 2 - - - 0x03D56C 0F:D55C: 05        .byte $05   ; 
- D 2 - - - 0x03D56D 0F:D55D: 04        .byte $04   ; 
- D 2 - - - 0x03D56E 0F:D55E: 02        .byte $02   ; 
- D 2 - - - 0x03D56F 0F:D55F: 06        .byte $06   ; 
- D 2 - - - 0x03D570 0F:D560: 05        .byte $05   ; 
- D 2 - - - 0x03D571 0F:D561: 04        .byte $04   ; 
- D 2 - - - 0x03D572 0F:D562: 04        .byte $04   ; 
- D 2 - - - 0x03D573 0F:D563: FF        .byte $FF   ; 
- D 2 - - - 0x03D574 0F:D564: 03        .byte $03   ; 
C D 2 - - - 0x03D575 0F:D565: 20 73 D5  JSR $D573
C - - - - - 0x03D578 0F:D568: A9 1A     LDA #$1A
C - - - - - 0x03D57A 0F:D56A: 85 24     STA ram_0024
C - - - - - 0x03D57C 0F:D56C: A9 1B     LDA #$1B
C - - - - - 0x03D57E 0F:D56E: 85 25     STA ram_0025
C - - - - - 0x03D580 0F:D570: 4C 2D CE  JMP $CE2D
C - - - - - 0x03D583 0F:D573: A9 00     LDA #$00
C - - - - - 0x03D585 0F:D575: 8D 2D 06  STA ram_062D
C - - - - - 0x03D588 0F:D578: 8D 28 06  STA ram_0628
C - - - - - 0x03D58B 0F:D57B: 20 77 CD  JSR $CD77
C - - - - - 0x03D58E 0F:D57E: A0 0A     LDY #$0A
C - - - - - 0x03D590 0F:D580: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D592 0F:D582: F0 08     BEQ $D58C
C - - - - - 0x03D594 0F:D584: A9 40     LDA #$40
C - - - - - 0x03D596 0F:D586: 20 B0 CB  JSR $CBB0
C - - - - - 0x03D599 0F:D589: 4C B2 D5  JMP $D5B2
C - - - - - 0x03D59C 0F:D58C: AD 21 06  LDA ram_0621
C - - - - - 0x03D59F 0F:D58F: C9 03     CMP #$03
C - - - - - 0x03D5A1 0F:D591: F0 1F     BEQ $D5B2
C - - - - - 0x03D5A3 0F:D593: C9 01     CMP #$01
C - - - - - 0x03D5A5 0F:D595: D0 0E     BNE $D5A5
C - - - - - 0x03D5A7 0F:D597: AD 00 06  LDA ram_0600
C - - - - - 0x03D5AA 0F:D59A: F0 09     BEQ $D5A5
C - - - - - 0x03D5AC 0F:D59C: AD 01 06  LDA ram_0601
C - - - - - 0x03D5AF 0F:D59F: F0 11     BEQ $D5B2
C - - - - - 0x03D5B1 0F:D5A1: C9 0B     CMP #$0B
C - - - - - 0x03D5B3 0F:D5A3: F0 0D     BEQ $D5B2
C - - - - - 0x03D5B5 0F:D5A5: A0 07     LDY #$07
C - - - - - 0x03D5B7 0F:D5A7: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D5B9 0F:D5A9: C9 18     CMP #$18
C - - - - - 0x03D5BB 0F:D5AB: 90 05     BCC $D5B2
C - - - - - 0x03D5BD 0F:D5AD: A9 41     LDA #$41
C - - - - - 0x03D5BF 0F:D5AF: 20 B0 CB  JSR $CBB0
C D 2 - - - 0x03D5C2 0F:D5B2: 20 A2 EF  JSR $EFA2
C - - - - - 0x03D5C5 0F:D5B5: A9 00     LDA #$00
C - - - - - 0x03D5C7 0F:D5B7: 85 11     STA ram_0011
C - - - - - 0x03D5C9 0F:D5B9: 85 12     STA ram_0012
C - - - - - 0x03D5CB 0F:D5BB: A9 02     LDA #$02
C - - - - - 0x03D5CD 0F:D5BD: 20 0F CB  JSR $CB0F
C - - - - - 0x03D5D0 0F:D5C0: 20 46 CC  JSR $CC46
C D 2 - - - 0x03D5D3 0F:D5C3: 20 46 CC  JSR $CC46
C - - - - - 0x03D5D6 0F:D5C6: AD FB 05  LDA ram_05FB
C - - - - - 0x03D5D9 0F:D5C9: F0 03     BEQ $D5CE
C - - - - - 0x03D5DB 0F:D5CB: 4C 6E D3  JMP $D36E
C - - - - - 0x03D5DE 0F:D5CE: AE 21 06  LDX ram_0621
C - - - - - 0x03D5E1 0F:D5D1: BD 06 D7  LDA $D706,X
C - - - - - 0x03D5E4 0F:D5D4: 20 7F EF  JSR $EF7F
C - - - - - 0x03D5E7 0F:D5D7: AE 21 06  LDX ram_0621
C - - - - - 0x03D5EA 0F:D5DA: BD 00 D7  LDA $D700,X
C - - - - - 0x03D5ED 0F:D5DD: 20 7F EF  JSR $EF7F
C - - - - - 0x03D5F0 0F:D5E0: A9 00     LDA #$00
C - - - - - 0x03D5F2 0F:D5E2: 8D 1E 06  STA ram_061E
C D 2 - - - 0x03D5F5 0F:D5E5: A9 01     LDA #$01
C - - - - - 0x03D5F7 0F:D5E7: 20 0F CB  JSR $CB0F
C - - - - - 0x03D5FA 0F:D5EA: A9 0F     LDA #$0F
C - - - - - 0x03D5FC 0F:D5EC: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D5FF 0F:D5EF: F0 35     BEQ $D626
C - - - - - 0x03D601 0F:D5F1: A2 00     LDX #$00
C - - - - - 0x03D603 0F:D5F3: 4A        LSR
C - - - - - 0x03D604 0F:D5F4: B0 03     BCS $D5F9
C - - - - - 0x03D606 0F:D5F6: E8        INX
C - - - - - 0x03D607 0F:D5F7: D0 FA     BNE $D5F3
C - - - - - 0x03D609 0F:D5F9: 86 3A     STX ram_003A
C - - - - - 0x03D60B 0F:D5FB: AD 21 06  LDA ram_0621
C - - - - - 0x03D60E 0F:D5FE: 0A        ASL
C - - - - - 0x03D60F 0F:D5FF: 0A        ASL
C - - - - - 0x03D610 0F:D600: 65 3A     ADC ram_003A
C - - - - - 0x03D612 0F:D602: AA        TAX
C - - - - - 0x03D613 0F:D603: BD E8 D6  LDA $D6E8,X
C - - - - - 0x03D616 0F:D606: C9 FF     CMP #$FF
C - - - - - 0x03D618 0F:D608: F0 1C     BEQ $D626
C - - - - - 0x03D61A 0F:D60A: 8D 3B 04  STA ram_043B
C - - - - - 0x03D61D 0F:D60D: A6 3A     LDX ram_003A
C - - - - - 0x03D61F 0F:D60F: AD 1E 06  LDA ram_061E
C - - - - - 0x03D622 0F:D612: 8E 1E 06  STX ram_061E
C - - - - - 0x03D625 0F:D615: 48        PHA
C - - - - - 0x03D626 0F:D616: 29 03     AND #$03
C - - - - - 0x03D628 0F:D618: CD 1E 06  CMP ram_061E
C - - - - - 0x03D62B 0F:D61B: F0 03     BEQ $D620
C - - - - - 0x03D62D 0F:D61D: 68        PLA
C - - - - - 0x03D62E 0F:D61E: 8A        TXA
C - - - - - 0x03D62F 0F:D61F: 48        PHA
C - - - - - 0x03D630 0F:D620: 68        PLA
C - - - - - 0x03D631 0F:D621: 09 80     ORA #$80
C - - - - - 0x03D633 0F:D623: 8D 1E 06  STA ram_061E
C - - - - - 0x03D636 0F:D626: A9 80     LDA #$80
C - - - - - 0x03D638 0F:D628: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D63B 0F:D62B: F0 0B     BEQ $D638
C - - - - - 0x03D63D 0F:D62D: 2C 1E 06  BIT ram_061E
C - - - - - 0x03D640 0F:D630: 10 06     BPL $D638
C - - - - - 0x03D642 0F:D632: 20 7C D6  JSR $D67C
C - - - - - 0x03D645 0F:D635: 4C C3 D5  JMP $D5C3
C - - - - - 0x03D648 0F:D638: 2C 1E 06  BIT ram_061E
C - - - - - 0x03D64B 0F:D63B: 10 A8     BPL $D5E5
C - - - - - 0x03D64D 0F:D63D: A9 20     LDA #$20
C - - - - - 0x03D64F 0F:D63F: 2C 1E 06  BIT ram_061E
C - - - - - 0x03D652 0F:D642: D0 0B     BNE $D64F
C - - - - - 0x03D654 0F:D644: 0D 1E 06  ORA ram_061E
C - - - - - 0x03D657 0F:D647: 8D 1E 06  STA ram_061E
C - - - - - 0x03D65A 0F:D64A: A9 00     LDA #$00
C - - - - - 0x03D65C 0F:D64C: 8D 1F 06  STA ram_061F
C - - - - - 0x03D65F 0F:D64F: AE 1F 06  LDX ram_061F
C - - - - - 0x03D662 0F:D652: F0 06     BEQ $D65A
C - - - - - 0x03D664 0F:D654: CE 1F 06  DEC ram_061F
C - - - - - 0x03D667 0F:D657: 4C E5 D5  JMP $D5E5
C - - - - - 0x03D66A 0F:D65A: A9 0D     LDA #$0D
C - - - - - 0x03D66C 0F:D65C: 8D 1F 06  STA ram_061F
C - - - - - 0x03D66F 0F:D65F: AD 1E 06  LDA ram_061E
C - - - - - 0x03D672 0F:D662: 49 40     EOR #$40
C - - - - - 0x03D674 0F:D664: 8D 1E 06  STA ram_061E
C - - - - - 0x03D677 0F:D667: AC 3B 04  LDY ram_043B
C - - - - - 0x03D67A 0F:D66A: B9 DE D6  LDA $D6DE,Y
C - - - - - 0x03D67D 0F:D66D: 2C 1E 06  BIT ram_061E
C - - - - - 0x03D680 0F:D670: 70 02     BVS $D674
C - - - - - 0x03D682 0F:D672: 09 80     ORA #$80
C - - - - - 0x03D684 0F:D674: A2 00     LDX #$00
C - - - - - 0x03D686 0F:D676: 20 3D E9  JSR $E93D
C - - - - - 0x03D689 0F:D679: 4C E5 D5  JMP $D5E5
C - - - - - 0x03D68C 0F:D67C: AE 3B 04  LDX ram_043B
C - - - - - 0x03D68F 0F:D67F: BD DE D6  LDA $D6DE,X
C - - - - - 0x03D692 0F:D682: A2 00     LDX #$00
C - - - - - 0x03D694 0F:D684: 8E 3C 04  STX ram_043C
C - - - - - 0x03D697 0F:D687: 20 3D E9  JSR $E93D
C - - - - - 0x03D69A 0F:D68A: AE 3B 04  LDX ram_043B
C - - - - - 0x03D69D 0F:D68D: E0 02     CPX #$02
C - - - - - 0x03D69F 0F:D68F: D0 05     BNE $D696
C - - - - - 0x03D6A1 0F:D691: AD 00 06  LDA ram_0600
C - - - - - 0x03D6A4 0F:D694: F0 2E     BEQ $D6C4
C - - - - - 0x03D6A6 0F:D696: AD 41 04  LDA ram_0441
C - - - - - 0x03D6A9 0F:D699: 48        PHA
C - - - - - 0x03D6AA 0F:D69A: A5 22     LDA ram_0022
C - - - - - 0x03D6AC 0F:D69C: A9 1C     LDA #$1C
C - - - - - 0x03D6AE 0F:D69E: 85 24     STA ram_0024
C - - - - - 0x03D6B0 0F:D6A0: A9 1D     LDA #$1D
C - - - - - 0x03D6B2 0F:D6A2: 85 25     STA ram_0025
C - - - - - 0x03D6B4 0F:D6A4: 20 2D CE  JSR $CE2D
C - - - - - 0x03D6B7 0F:D6A7: 68        PLA
C - - - - - 0x03D6B8 0F:D6A8: 20 09 80  JSR $8009
C - - - - - 0x03D6BB 0F:D6AB: AD 30 04  LDA ram_0430
C - - - - - 0x03D6BE 0F:D6AE: F0 0E     BEQ $D6BE
C - - - - - 0x03D6C0 0F:D6B0: 18        CLC
C - - - - - 0x03D6C1 0F:D6B1: 69 08     ADC #$08
C - - - - - 0x03D6C3 0F:D6B3: 20 7F EF  JSR $EF7F
C - - - - - 0x03D6C6 0F:D6B6: 20 7A D7  JSR $D77A
C - - - - - 0x03D6C9 0F:D6B9: 0A        ASL
C - - - - - 0x03D6CA 0F:D6BA: 90 01     BCC $D6BD
C - - - - - 0x03D6CC 0F:D6BC: 60        RTS
C - - - - - 0x03D6CD 0F:D6BD: 4A        LSR
C - - - - - 0x03D6CE 0F:D6BE: 8D 3C 04  STA ram_043C
C - - - - - 0x03D6D1 0F:D6C1: 20 17 D7  JSR $D717
C - - - - - 0x03D6D4 0F:D6C4: AD 3B 04  LDA ram_043B
C - - - - - 0x03D6D7 0F:D6C7: 20 99 CB  JSR $CB99
- D 2 - I - 0x03D6DA 0F:D6CA: 92        .byte $92   ; 
- D 2 - I - 0x03D6DB 0F:D6CB: D7        .byte $D7   ; 
- D 2 - I - 0x03D6DC 0F:D6CC: E8        .byte $E8   ; 
- D 2 - I - 0x03D6DD 0F:D6CD: D7        .byte $D7   ; 
- D 2 - I - 0x03D6DE 0F:D6CE: 0C        .byte $0C   ; 
- D 2 - I - 0x03D6DF 0F:D6CF: D7        .byte $D7   ; 
- D 2 - I - 0x03D6E0 0F:D6D0: 79        .byte $79   ; <y>
- D 2 - I - 0x03D6E1 0F:D6D1: D9        .byte $D9   ; 
- D 2 - I - 0x03D6E2 0F:D6D2: 0C        .byte $0C   ; 
- D 2 - I - 0x03D6E3 0F:D6D3: D7        .byte $D7   ; 
- D 2 - I - 0x03D6E4 0F:D6D4: 65        .byte $65   ; <e>
- D 2 - I - 0x03D6E5 0F:D6D5: DA        .byte $DA   ; 
- D 2 - I - 0x03D6E6 0F:D6D6: 0C        .byte $0C   ; 
- D 2 - I - 0x03D6E7 0F:D6D7: D7        .byte $D7   ; 
- D 2 - I - 0x03D6E8 0F:D6D8: 0C        .byte $0C   ; 
- D 2 - I - 0x03D6E9 0F:D6D9: D7        .byte $D7   ; 
- D 2 - I - 0x03D6EA 0F:D6DA: 0C        .byte $0C   ; 
- D 2 - I - 0x03D6EB 0F:D6DB: D7        .byte $D7   ; 
- D 2 - I - 0x03D6EC 0F:D6DC: 0C        .byte $0C   ; 
- D 2 - I - 0x03D6ED 0F:D6DD: D7        .byte $D7   ; 
- D 2 - - - 0x03D6EE 0F:D6DE: 02        .byte $02   ; 
- D 2 - - - 0x03D6EF 0F:D6DF: 01        .byte $01   ; 
- D 2 - - - 0x03D6F0 0F:D6E0: 00        .byte $00   ; 
- D 2 - - - 0x03D6F1 0F:D6E1: 03        .byte $03   ; 
- D 2 - - - 0x03D6F2 0F:D6E2: 04        .byte $04   ; 
- D 2 - - - 0x03D6F3 0F:D6E3: 05        .byte $05   ; 
- D 2 - - - 0x03D6F4 0F:D6E4: 06        .byte $06   ; 
- D 2 - - - 0x03D6F5 0F:D6E5: 1E        .byte $1E   ; 
- D 2 - - - 0x03D6F6 0F:D6E6: 1F        .byte $1F   ; 
- D 2 - - - 0x03D6F7 0F:D6E7: 20        .byte $20   ; 
- D 2 - - - 0x03D6F8 0F:D6E8: 00        .byte $00   ; 
- D 2 - - - 0x03D6F9 0F:D6E9: 01        .byte $01   ; 
- D 2 - - - 0x03D6FA 0F:D6EA: 03        .byte $03   ; 
- D 2 - - - 0x03D6FB 0F:D6EB: 02        .byte $02   ; 
- D 2 - - - 0x03D6FC 0F:D6EC: 00        .byte $00   ; 
- D 2 - - - 0x03D6FD 0F:D6ED: 01        .byte $01   ; 
- D 2 - - - 0x03D6FE 0F:D6EE: 05        .byte $05   ; 
- D 2 - - - 0x03D6FF 0F:D6EF: 04        .byte $04   ; 
- D 2 - - - 0x03D700 0F:D6F0: 06        .byte $06   ; 
- D 2 - - - 0x03D701 0F:D6F1: 01        .byte $01   ; 
- D 2 - - - 0x03D702 0F:D6F2: FF        .byte $FF   ; 
- D 2 - - - 0x03D703 0F:D6F3: 04        .byte $04   ; 
- D 2 - - - 0x03D704 0F:D6F4: 00        .byte $00   ; 
- D 2 - - - 0x03D705 0F:D6F5: 01        .byte $01   ; 
- D 2 - - - 0x03D706 0F:D6F6: FF        .byte $FF   ; 
- D 2 - - - 0x03D707 0F:D6F7: 02        .byte $02   ; 
- D 2 - - - 0x03D708 0F:D6F8: 00        .byte $00   ; 
- D 2 - - - 0x03D709 0F:D6F9: 01        .byte $01   ; 
- D 2 - - - 0x03D70A 0F:D6FA: FF        .byte $FF   ; 
- D 2 - - - 0x03D70B 0F:D6FB: FF        .byte $FF   ; 
- D 2 - - - 0x03D70C 0F:D6FC: 09        .byte $09   ; 
- D 2 - - - 0x03D70D 0F:D6FD: 07        .byte $07   ; 
- D 2 - - - 0x03D70E 0F:D6FE: FF        .byte $FF   ; 
- D 2 - - - 0x03D70F 0F:D6FF: 08        .byte $08   ; 
- D 2 - - - 0x03D710 0F:D700: 03        .byte $03   ; 
- D 2 - - - 0x03D711 0F:D701: 04        .byte $04   ; 
- D 2 - - - 0x03D712 0F:D702: 05        .byte $05   ; 
- D 2 - - - 0x03D713 0F:D703: 03        .byte $03   ; 
- D 2 - - - 0x03D714 0F:D704: 03        .byte $03   ; 
- D 2 - - - 0x03D715 0F:D705: 03        .byte $03   ; 
- D 2 - - - 0x03D716 0F:D706: 02        .byte $02   ; 
- D 2 - - - 0x03D717 0F:D707: 02        .byte $02   ; 
- D 2 - - - 0x03D718 0F:D708: 02        .byte $02   ; 
- D 2 - - - 0x03D719 0F:D709: 02        .byte $02   ; 
- D 2 - - - 0x03D71A 0F:D70A: 02        .byte $02   ; 
- D 2 - - - 0x03D71B 0F:D70B: 2C        .byte $2C   ; 
C D 2 J - - 0x03D71C 0F:D70C: 20 46 CC  JSR $CC46
C - - - - - 0x03D71F 0F:D70F: A9 00     LDA #$00
C - - - - - 0x03D721 0F:D711: 8D 2D 06  STA ram_062D
C - - - - - 0x03D724 0F:D714: 68        PLA
C - - - - - 0x03D725 0F:D715: 68        PLA
C - - - - - 0x03D726 0F:D716: 60        RTS
C - - - - - 0x03D727 0F:D717: 48        PHA
C - - - - - 0x03D728 0F:D718: A5 22     LDA ram_0022
C - - - - - 0x03D72A 0F:D71A: A9 1C     LDA #$1C
C - - - - - 0x03D72C 0F:D71C: 85 24     STA ram_0024
C - - - - - 0x03D72E 0F:D71E: A9 1D     LDA #$1D
C - - - - - 0x03D730 0F:D720: 85 25     STA ram_0025
C - - - - - 0x03D732 0F:D722: 20 2D CE  JSR $CE2D
C - - - - - 0x03D735 0F:D725: 68        PLA
C - - - - - 0x03D736 0F:D726: 20 12 80  JSR $8012
C - - - - - 0x03D739 0F:D729: 20 6B D7  JSR $D76B
C - - - - - 0x03D73C 0F:D72C: 10 17     BPL $D745
C - - - - - 0x03D73E 0F:D72E: AD 3B 04  LDA ram_043B
C - - - - - 0x03D741 0F:D731: C9 00     CMP #$00
C - - - - - 0x03D743 0F:D733: F0 09     BEQ $D73E
C - - - - - 0x03D745 0F:D735: C9 03     CMP #$03
C - - - - - 0x03D747 0F:D737: F0 05     BEQ $D73E
C - - - - - 0x03D749 0F:D739: AD 3C 04  LDA ram_043C
C - - - - - 0x03D74C 0F:D73C: F0 07     BEQ $D745
C - - - - - 0x03D74E 0F:D73E: A9 3D     LDA #$3D
C - - - - - 0x03D750 0F:D740: 20 B0 CB  JSR $CBB0
C - - - - - 0x03D753 0F:D743: 68        PLA
C - - - - - 0x03D754 0F:D744: 68        PLA
C - - - - - 0x03D755 0F:D745: 60        RTS
C - - - - - 0x03D756 0F:D746: 48        PHA
C - - - - - 0x03D757 0F:D747: A5 22     LDA ram_0022
C - - - - - 0x03D759 0F:D749: A9 1C     LDA #$1C
C - - - - - 0x03D75B 0F:D74B: 85 24     STA ram_0024
C - - - - - 0x03D75D 0F:D74D: A9 1D     LDA #$1D
C - - - - - 0x03D75F 0F:D74F: 85 25     STA ram_0025
C - - - - - 0x03D761 0F:D751: 20 2D CE  JSR $CE2D
C - - - - - 0x03D764 0F:D754: 68        PLA
C - - - - - 0x03D765 0F:D755: 20 15 80  JSR $8015
C - - - - - 0x03D768 0F:D758: 20 6B D7  JSR $D76B
C - - - - - 0x03D76B 0F:D75B: 10 0C     BPL $D769
C - - - - - 0x03D76D 0F:D75D: AD 3E 04  LDA ram_043E
C - - - - - 0x03D770 0F:D760: F0 07     BEQ $D769
C - - - - - 0x03D772 0F:D762: A9 3D     LDA #$3D
C - - - - - 0x03D774 0F:D764: 20 B0 CB  JSR $CBB0
C - - - - - 0x03D777 0F:D767: 18        CLC
C - - - - - 0x03D778 0F:D768: 60        RTS
C - - - - - 0x03D779 0F:D769: 38        SEC
C - - - - - 0x03D77A 0F:D76A: 60        RTS
C - - - - - 0x03D77B 0F:D76B: 38        SEC
C - - - - - 0x03D77C 0F:D76C: A0 01     LDY #$01
C - - - - - 0x03D77E 0F:D76E: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D780 0F:D770: ED 3F 04  SBC ram_043F
C - - - - - 0x03D783 0F:D773: C8        INY
C - - - - - 0x03D784 0F:D774: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D786 0F:D776: ED 40 04  SBC ram_0440
C - - - - - 0x03D789 0F:D779: 60        RTS
C - - - - - 0x03D78A 0F:D77A: A9 00     LDA #$00
C - - - - - 0x03D78C 0F:D77C: 8D 22 06  STA ram_0622
C - - - - - 0x03D78F 0F:D77F: AD 30 04  LDA ram_0430
C - - - - - 0x03D792 0F:D782: 20 8F CF  JSR $CF8F
C - - - - - 0x03D795 0F:D785: A2 80     LDX #$80
C - - - - - 0x03D797 0F:D787: 90 07     BCC $D790
C - - - - - 0x03D799 0F:D789: AA        TAX
C - - - - - 0x03D79A 0F:D78A: F0 04     BEQ $D790
C - - - - - 0x03D79C 0F:D78C: BD 30 04  LDA ram_0430,X
C - - - - - 0x03D79F 0F:D78F: AA        TAX
C - - - - - 0x03D7A0 0F:D790: 8A        TXA
C - - - - - 0x03D7A1 0F:D791: 60        RTS
C - - J - - 0x03D7A2 0F:D792: AD 3C 04  LDA ram_043C
C - - - - - 0x03D7A5 0F:D795: C9 03     CMP #$03
C - - - - - 0x03D7A7 0F:D797: B0 06     BCS $D79F
C - - - - - 0x03D7A9 0F:D799: AE 4E 04  LDX ram_044E
C - - - - - 0x03D7AC 0F:D79C: 8E 3C 04  STX ram_043C
C - - - - - 0x03D7AF 0F:D79F: C9 12     CMP #$12
C - - - - - 0x03D7B1 0F:D7A1: D0 36     BNE $D7D9
C - - - - - 0x03D7B3 0F:D7A3: AE 48 04  LDX ram_0448
C - - - - - 0x03D7B6 0F:D7A6: D0 31     BNE $D7D9
C - - - - - 0x03D7B8 0F:D7A8: EE 48 04  INC ram_0448
C - - - - - 0x03D7BB 0F:D7AB: A9 00     LDA #$00
C - - - - - 0x03D7BD 0F:D7AD: 8D 2D 06  STA ram_062D
C - - - - - 0x03D7C0 0F:D7B0: A9 46     LDA #$46
C - - - - - 0x03D7C2 0F:D7B2: 20 B0 CB  JSR $CBB0
C - - - - - 0x03D7C5 0F:D7B5: 48        PHA
C - - - - - 0x03D7C6 0F:D7B6: A5 22     LDA ram_0022
C - - - - - 0x03D7C8 0F:D7B8: A9 1A     LDA #$1A
C - - - - - 0x03D7CA 0F:D7BA: 85 24     STA ram_0024
C - - - - - 0x03D7CC 0F:D7BC: A9 1B     LDA #$1B
C - - - - - 0x03D7CE 0F:D7BE: 85 25     STA ram_0025
C - - - - - 0x03D7D0 0F:D7C0: 20 2D CE  JSR $CE2D
C - - - - - 0x03D7D3 0F:D7C3: 68        PLA
C - - - - - 0x03D7D4 0F:D7C4: 20 21 80  JSR $8021
C - - - - - 0x03D7D7 0F:D7C7: 48        PHA
C - - - - - 0x03D7D8 0F:D7C8: A5 22     LDA ram_0022
C - - - - - 0x03D7DA 0F:D7CA: A9 1A     LDA #$1A
C - - - - - 0x03D7DC 0F:D7CC: 85 24     STA ram_0024
C - - - - - 0x03D7DE 0F:D7CE: A9 1B     LDA #$1B
C - - - - - 0x03D7E0 0F:D7D0: 85 25     STA ram_0025
C - - - - - 0x03D7E2 0F:D7D2: 20 2D CE  JSR $CE2D
C - - - - - 0x03D7E5 0F:D7D5: 68        PLA
C - - - - - 0x03D7E6 0F:D7D6: 20 36 80  JSR $8036
C - - - - - 0x03D7E9 0F:D7D9: C9 11     CMP #$11
C - - - - - 0x03D7EB 0F:D7DB: D0 08     BNE $D7E5
C - - - - - 0x03D7ED 0F:D7DD: A9 00     LDA #$00
C - - - - - 0x03D7EF 0F:D7DF: 8D 49 04  STA ram_0449
C - - - - - 0x03D7F2 0F:D7E2: 8D 4A 04  STA ram_044A
C - - - - - 0x03D7F5 0F:D7E5: 4C 0C D7  JMP $D70C
C D 2 - - - 0x03D7F8 0F:D7E8: A9 38     LDA #$38
C - - - - - 0x03D7FA 0F:D7EA: 20 B0 CB  JSR $CBB0
C - - - - - 0x03D7FD 0F:D7ED: A9 0F     LDA #$0F
C - - - - - 0x03D7FF 0F:D7EF: 20 7F EF  JSR $EF7F
C - - - - - 0x03D802 0F:D7F2: A9 81     LDA #$81
C - - - - - 0x03D804 0F:D7F4: 8D 2D 06  STA ram_062D
C - - - - - 0x03D807 0F:D7F7: A9 1F     LDA #$1F
C - - - - - 0x03D809 0F:D7F9: 8D 94 04  STA ram_0494
C - - - - - 0x03D80C 0F:D7FC: 20 EC E6  JSR $E6EC
C - - - - - 0x03D80F 0F:D7FF: A9 00     LDA #$00
C - - - - - 0x03D811 0F:D801: 8D 25 06  STA ram_0625
C - - - - - 0x03D814 0F:D804: AD FE 05  LDA ram_05FE
C - - - - - 0x03D817 0F:D807: 8D 24 06  STA ram_0624
C - - - - - 0x03D81A 0F:D80A: A9 01     LDA #$01
C - - - - - 0x03D81C 0F:D80C: 20 0F CB  JSR $CB0F
C - - - - - 0x03D81F 0F:D80F: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03D822 0F:D812: 29 0F     AND #$0F
C - - - - - 0x03D824 0F:D814: F0 21     BEQ $D837
C - - - - - 0x03D826 0F:D816: A2 00     LDX #$00
C - - - - - 0x03D828 0F:D818: 4A        LSR
C - - - - - 0x03D829 0F:D819: B0 03     BCS $D81E
C - - - - - 0x03D82B 0F:D81B: E8        INX
C - - - - - 0x03D82C 0F:D81C: D0 FA     BNE $D818
C - - - - - 0x03D82E 0F:D81E: BD 4E D8  LDA $D84E,X
C - - - - - 0x03D831 0F:D821: 18        CLC
C - - - - - 0x03D832 0F:D822: 6D 24 06  ADC ram_0624
C - - - - - 0x03D835 0F:D825: C9 F0     CMP #$F0
C - - - - - 0x03D837 0F:D827: 90 03     BCC $D82C
C - - - - - 0x03D839 0F:D829: AD 24 06  LDA ram_0624
C - - - - - 0x03D83C 0F:D82C: CD 24 06  CMP ram_0624
C - - - - - 0x03D83F 0F:D82F: 8D 24 06  STA ram_0624
C - - - - - 0x03D842 0F:D832: F0 03     BEQ $D837
C - - - - - 0x03D844 0F:D834: 20 F7 D8  JSR $D8F7
C - - - - - 0x03D847 0F:D837: A9 40     LDA #$40
C - - - - - 0x03D849 0F:D839: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D84C 0F:D83C: F0 01     BEQ $D83F
C - - - - - 0x03D84E 0F:D83E: 60        RTS
C - - - - - 0x03D84F 0F:D83F: A9 80     LDA #$80
C - - - - - 0x03D851 0F:D841: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D854 0F:D844: F0 C4     BEQ $D80A
C - - - - - 0x03D856 0F:D846: 20 52 D8  JSR $D852
C - - - - - 0x03D859 0F:D849: 90 BF     BCC $D80A
C - - - - - 0x03D85B 0F:D84B: 4C 0C D7  JMP $D70C
- D 2 - - - 0x03D85E 0F:D84E: 0C        .byte $0C   ; 
- D 2 - - - 0x03D85F 0F:D84F: F4        .byte $F4   ; 
- D 2 - - - 0x03D860 0F:D850: 01        .byte $01   ; 
- D 2 - - - 0x03D861 0F:D851: FF        .byte $FF   ; 
C D 2 - - - 0x03D862 0F:D852: A9 FF     LDA #$FF
C - - - - - 0x03D864 0F:D854: AE 25 06  LDX ram_0625
C - - - - - 0x03D867 0F:D857: F0 09     BEQ $D862
C - - - - - 0x03D869 0F:D859: AE 30 04  LDX ram_0430
C - - - - - 0x03D86C 0F:D85C: CA        DEX
C - - - - - 0x03D86D 0F:D85D: D0 09     BNE $D868
C - - - - - 0x03D86F 0F:D85F: AD 31 04  LDA ram_0431
C - - - - - 0x03D872 0F:D862: 8D FC 05  STA ram_05FC
C - - - - - 0x03D875 0F:D865: 4C D2 D8  JMP $D8D2
C - - - - - 0x03D878 0F:D868: AD 30 04  LDA ram_0430
C - - - - - 0x03D87B 0F:D86B: 18        CLC
C - - - - - 0x03D87C 0F:D86C: 69 22     ADC #$22
C - - - - - 0x03D87E 0F:D86E: 20 7F EF  JSR $EF7F
C - - - - - 0x03D881 0F:D871: A9 00     LDA #$00
C - - - - - 0x03D883 0F:D873: 8D 25 06  STA ram_0625
C - - - - - 0x03D886 0F:D876: 4C B5 D8  JMP $D8B5
C - - - - - 0x03D889 0F:D879: A9 01     LDA #$01
C - - - - - 0x03D88B 0F:D87B: 20 0F CB  JSR $CB0F
C - - - - - 0x03D88E 0F:D87E: A9 40     LDA #$40
C - - - - - 0x03D890 0F:D880: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D893 0F:D883: F0 0A     BEQ $D88F
C - - - - - 0x03D895 0F:D885: A9 0F     LDA #$0F
C - - - - - 0x03D897 0F:D887: 20 7F EF  JSR $EF7F
C - - - - - 0x03D89A 0F:D88A: 20 F7 D8  JSR $D8F7
C - - - - - 0x03D89D 0F:D88D: 18        CLC
C - - - - - 0x03D89E 0F:D88E: 60        RTS
C - - - - - 0x03D89F 0F:D88F: A9 0C     LDA #$0C
C - - - - - 0x03D8A1 0F:D891: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D8A4 0F:D894: F0 2D     BEQ $D8C3
C - - - - - 0x03D8A6 0F:D896: A2 01     LDX #$01
C - - - - - 0x03D8A8 0F:D898: 29 04     AND #$04
C - - - - - 0x03D8AA 0F:D89A: D0 02     BNE $D89E
C - - - - - 0x03D8AC 0F:D89C: A2 FF     LDX #$FF
C - - - - - 0x03D8AE 0F:D89E: 8A        TXA
C - - - - - 0x03D8AF 0F:D89F: 18        CLC
C - - - - - 0x03D8B0 0F:D8A0: 6D 25 06  ADC ram_0625
C - - - - - 0x03D8B3 0F:D8A3: 30 05     BMI $D8AA
C - - - - - 0x03D8B5 0F:D8A5: CD 30 04  CMP ram_0430
C - - - - - 0x03D8B8 0F:D8A8: 90 03     BCC $D8AD
C - - - - - 0x03D8BA 0F:D8AA: AD 25 06  LDA ram_0625
C - - - - - 0x03D8BD 0F:D8AD: CD 25 06  CMP ram_0625
C - - - - - 0x03D8C0 0F:D8B0: 8D 25 06  STA ram_0625
C - - - - - 0x03D8C3 0F:D8B3: F0 0E     BEQ $D8C3
C D 2 - - - 0x03D8C5 0F:D8B5: AE 25 06  LDX ram_0625
C - - - - - 0x03D8C8 0F:D8B8: BD 31 04  LDA ram_0431,X
C - - - - - 0x03D8CB 0F:D8BB: 8D FC 05  STA ram_05FC
C - - - - - 0x03D8CE 0F:D8BE: A9 1D     LDA #$1D
C - - - - - 0x03D8D0 0F:D8C0: 20 7F EF  JSR $EF7F
C - - - - - 0x03D8D3 0F:D8C3: 20 DA D8  JSR $D8DA
C - - - - - 0x03D8D6 0F:D8C6: A9 80     LDA #$80
C - - - - - 0x03D8D8 0F:D8C8: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D8DB 0F:D8CB: F0 AC     BEQ $D879
C - - - - - 0x03D8DD 0F:D8CD: A9 F8     LDA #$F8
C - - - - - 0x03D8DF 0F:D8CF: 8D FC 02  STA ram_02FC
C D 2 - - - 0x03D8E2 0F:D8D2: AD 24 06  LDA ram_0624
C - - - - - 0x03D8E5 0F:D8D5: 8D 38 06  STA ram_0638
C - - - - - 0x03D8E8 0F:D8D8: 38        SEC
C - - - - - 0x03D8E9 0F:D8D9: 60        RTS
C - - - - - 0x03D8EA 0F:D8DA: AD 25 06  LDA ram_0625
C - - - - - 0x03D8ED 0F:D8DD: 0A        ASL
C - - - - - 0x03D8EE 0F:D8DE: 0A        ASL
C - - - - - 0x03D8EF 0F:D8DF: 0A        ASL
C - - - - - 0x03D8F0 0F:D8E0: 0A        ASL
C - - - - - 0x03D8F1 0F:D8E1: 18        CLC
C - - - - - 0x03D8F2 0F:D8E2: 69 9A     ADC #$9A
C - - - - - 0x03D8F4 0F:D8E4: 8D FC 02  STA ram_02FC
C - - - - - 0x03D8F7 0F:D8E7: A9 11     LDA #$11
C - - - - - 0x03D8F9 0F:D8E9: 8D FD 02  STA ram_02FD
C - - - - - 0x03D8FC 0F:D8EC: A9 03     LDA #$03
C - - - - - 0x03D8FE 0F:D8EE: 8D FE 02  STA ram_02FE
C - - - - - 0x03D901 0F:D8F1: A9 50     LDA #$50
C - - - - - 0x03D903 0F:D8F3: 8D FF 02  STA ram_02FF
C - - - - - 0x03D906 0F:D8F6: 60        RTS
C D 2 - - - 0x03D907 0F:D8F7: A9 00     LDA #$00
C - - - - - 0x03D909 0F:D8F9: 8D 30 04  STA ram_0430
C - - - - - 0x03D90C 0F:D8FC: 8D 25 06  STA ram_0625
C - - - - - 0x03D90F 0F:D8FF: 48        PHA
C - - - - - 0x03D910 0F:D900: CD 41 04  CMP ram_0441
C - - - - - 0x03D913 0F:D903: F0 3C     BEQ $D941
C - - - - - 0x03D915 0F:D905: C9 00     CMP #$00
C - - - - - 0x03D917 0F:D907: F0 38     BEQ $D941
C - - - - - 0x03D919 0F:D909: C9 0B     CMP #$0B
C - - - - - 0x03D91B 0F:D90B: F0 34     BEQ $D941
C - - - - - 0x03D91D 0F:D90D: 20 7C CD  JSR $CD7C
C - - - - - 0x03D920 0F:D910: A0 06     LDY #$06
C - - - - - 0x03D922 0F:D912: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D924 0F:D914: AA        TAX
C - - - - - 0x03D925 0F:D915: A0 08     LDY #$08
C - - - - - 0x03D927 0F:D917: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D929 0F:D919: A8        TAY
C - - - - - 0x03D92A 0F:D91A: 20 E2 CD  JSR $CDE2
C - - - - - 0x03D92D 0F:D91D: CD 24 06  CMP ram_0624
C - - - - - 0x03D930 0F:D920: D0 1F     BNE $D941
C - - - - - 0x03D932 0F:D922: AE 30 04  LDX ram_0430
C - - - - - 0x03D935 0F:D925: E0 04     CPX #$04
C - - - - - 0x03D937 0F:D927: B0 18     BCS $D941
C - - - - - 0x03D939 0F:D929: 68        PLA
C - - - - - 0x03D93A 0F:D92A: 48        PHA
C - - - - - 0x03D93B 0F:D92B: C9 0B     CMP #$0B
C - - - - - 0x03D93D 0F:D92D: 90 05     BCC $D934
C - - - - - 0x03D93F 0F:D92F: AC 25 06  LDY ram_0625
C - - - - - 0x03D942 0F:D932: D0 0D     BNE $D941
C - - - - - 0x03D944 0F:D934: 9D 31 04  STA ram_0431,X
C - - - - - 0x03D947 0F:D937: EE 30 04  INC ram_0430
C - - - - - 0x03D94A 0F:D93A: C9 0B     CMP #$0B
C - - - - - 0x03D94C 0F:D93C: B0 03     BCS $D941
C - - - - - 0x03D94E 0F:D93E: EE 25 06  INC ram_0625
C - - - - - 0x03D951 0F:D941: 68        PLA
C - - - - - 0x03D952 0F:D942: 18        CLC
C - - - - - 0x03D953 0F:D943: 69 01     ADC #$01
C - - - - - 0x03D955 0F:D945: C9 16     CMP #$16
C - - - - - 0x03D957 0F:D947: D0 B6     BNE $D8FF
C - - - - - 0x03D959 0F:D949: AE 30 04  LDX ram_0430
C - - - - - 0x03D95C 0F:D94C: D0 06     BNE $D954
C - - - - - 0x03D95E 0F:D94E: A9 1C     LDA #$1C
C - - - - - 0x03D960 0F:D950: 20 7F EF  JSR $EF7F
C - - - - - 0x03D963 0F:D953: 60        RTS
C - - - - - 0x03D964 0F:D954: AD 25 06  LDA ram_0625
C - - - - - 0x03D967 0F:D957: D0 08     BNE $D961
C - - - - - 0x03D969 0F:D959: 8A        TXA
C - - - - - 0x03D96A 0F:D95A: 18        CLC
C - - - - - 0x03D96B 0F:D95B: 69 1F     ADC #$1F
C - - - - - 0x03D96D 0F:D95D: 20 7F EF  JSR $EF7F
C - - - - - 0x03D970 0F:D960: 60        RTS
C - - - - - 0x03D971 0F:D961: CA        DEX
C - - - - - 0x03D972 0F:D962: D0 0C     BNE $D970
C - - - - - 0x03D974 0F:D964: AD 31 04  LDA ram_0431
C - - - - - 0x03D977 0F:D967: 8D FC 05  STA ram_05FC
C - - - - - 0x03D97A 0F:D96A: A9 1D     LDA #$1D
C - - - - - 0x03D97C 0F:D96C: 20 7F EF  JSR $EF7F
C - - - - - 0x03D97F 0F:D96F: 60        RTS
C - - - - - 0x03D980 0F:D970: 8A        TXA
C - - - - - 0x03D981 0F:D971: 18        CLC
C - - - - - 0x03D982 0F:D972: 69 18     ADC #$18
C - - - - - 0x03D984 0F:D974: 20 7F EF  JSR $EF7F
C - - - - - 0x03D987 0F:D977: 60        RTS
- - - - - - 0x03D988 0F:D978: 60        .byte $60   ; 
C - - J - - 0x03D989 0F:D979: A9 38     LDA #$38
C - - - - - 0x03D98B 0F:D97B: 20 B0 CB  JSR $CBB0
C - - - - - 0x03D98E 0F:D97E: AD 3C 04  LDA ram_043C
C - - - - - 0x03D991 0F:D981: F0 03     BEQ $D986
C - - - - - 0x03D993 0F:D983: 4C 0C D7  JMP $D70C
C - - - - - 0x03D996 0F:D986: 20 EC E6  JSR $E6EC
C - - - - - 0x03D999 0F:D989: A9 01     LDA #$01
C - - - - - 0x03D99B 0F:D98B: 85 3A     STA ram_003A
C - - - - - 0x03D99D 0F:D98D: A9 00     LDA #$00
C - - - - - 0x03D99F 0F:D98F: 8D 30 04  STA ram_0430
C - - - - - 0x03D9A2 0F:D992: A5 3A     LDA ram_003A
C - - - - - 0x03D9A4 0F:D994: CD 41 04  CMP ram_0441
C - - - - - 0x03D9A7 0F:D997: F0 10     BEQ $D9A9
C - - - - - 0x03D9A9 0F:D999: 20 3A DA  JSR $DA3A
C - - - - - 0x03D9AC 0F:D99C: 90 0B     BCC $D9A9
C - - - - - 0x03D9AE 0F:D99E: AE 30 04  LDX ram_0430
C - - - - - 0x03D9B1 0F:D9A1: A5 3A     LDA ram_003A
C - - - - - 0x03D9B3 0F:D9A3: 9D 31 04  STA ram_0431,X
C - - - - - 0x03D9B6 0F:D9A6: EE 30 04  INC ram_0430
C - - - - - 0x03D9B9 0F:D9A9: E6 3A     INC ram_003A
C - - - - - 0x03D9BB 0F:D9AB: A5 3A     LDA ram_003A
C - - - - - 0x03D9BD 0F:D9AD: C9 0B     CMP #$0B
C - - - - - 0x03D9BF 0F:D9AF: D0 E1     BNE $D992
C - - - - - 0x03D9C1 0F:D9B1: AD 30 04  LDA ram_0430
C - - - - - 0x03D9C4 0F:D9B4: D0 12     BNE $D9C8
C - - - - - 0x03D9C6 0F:D9B6: A9 11     LDA #$11
C - - - - - 0x03D9C8 0F:D9B8: 20 7F EF  JSR $EF7F
C - - - - - 0x03D9CB 0F:D9BB: A9 01     LDA #$01
C - - - - - 0x03D9CD 0F:D9BD: 20 0F CB  JSR $CB0F
C - - - - - 0x03D9D0 0F:D9C0: A9 C0     LDA #$C0
C - - - - - 0x03D9D2 0F:D9C2: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D9D5 0F:D9C5: F0 F4     BEQ $D9BB
C - - - - - 0x03D9D7 0F:D9C7: 60        RTS
C - - - - - 0x03D9D8 0F:D9C8: A9 10     LDA #$10
C - - - - - 0x03D9DA 0F:D9CA: 20 7F EF  JSR $EF7F
C - - - - - 0x03D9DD 0F:D9CD: A9 82     LDA #$82
C - - - - - 0x03D9DF 0F:D9CF: 8D 2D 06  STA ram_062D
C - - - - - 0x03D9E2 0F:D9D2: A9 1F     LDA #$1F
C - - - - - 0x03D9E4 0F:D9D4: 8D 94 04  STA ram_0494
C - - - - - 0x03D9E7 0F:D9D7: A9 00     LDA #$00
C - - - - - 0x03D9E9 0F:D9D9: 4C 03 DA  JMP $DA03
C - - - - - 0x03D9EC 0F:D9DC: A9 01     LDA #$01
C - - - - - 0x03D9EE 0F:D9DE: 20 0F CB  JSR $CB0F
C - - - - - 0x03D9F1 0F:D9E1: A9 03     LDA #$03
C - - - - - 0x03D9F3 0F:D9E3: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D9F6 0F:D9E6: F0 2A     BEQ $DA12
C - - - - - 0x03D9F8 0F:D9E8: A2 01     LDX #$01
C - - - - - 0x03D9FA 0F:D9EA: 4A        LSR
C - - - - - 0x03D9FB 0F:D9EB: B0 02     BCS $D9EF
C - - - - - 0x03D9FD 0F:D9ED: A2 FF     LDX #$FF
C - - - - - 0x03D9FF 0F:D9EF: 8A        TXA
C - - - - - 0x03DA00 0F:D9F0: 18        CLC
C - - - - - 0x03DA01 0F:D9F1: 6D 25 06  ADC ram_0625
C - - - - - 0x03DA04 0F:D9F4: 10 06     BPL $D9FC
C - - - - - 0x03DA06 0F:D9F6: AD 30 04  LDA ram_0430
C - - - - - 0x03DA09 0F:D9F9: 38        SEC
C - - - - - 0x03DA0A 0F:D9FA: E9 01     SBC #$01
C - - - - - 0x03DA0C 0F:D9FC: CD 30 04  CMP ram_0430
C - - - - - 0x03DA0F 0F:D9FF: 90 02     BCC $DA03
C - - - - - 0x03DA11 0F:DA01: A9 00     LDA #$00
C D 2 - - - 0x03DA13 0F:DA03: 8D 25 06  STA ram_0625
C - - - - - 0x03DA16 0F:DA06: AA        TAX
C - - - - - 0x03DA17 0F:DA07: BD 31 04  LDA ram_0431,X
C - - - - - 0x03DA1A 0F:DA0A: 8D FC 05  STA ram_05FC
C - - - - - 0x03DA1D 0F:DA0D: A9 1D     LDA #$1D
C - - - - - 0x03DA1F 0F:DA0F: 20 7F EF  JSR $EF7F
C - - - - - 0x03DA22 0F:DA12: A9 40     LDA #$40
C - - - - - 0x03DA24 0F:DA14: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03DA27 0F:DA17: F0 01     BEQ $DA1A
C - - - - - 0x03DA29 0F:DA19: 60        RTS
C - - - - - 0x03DA2A 0F:DA1A: A9 80     LDA #$80
C - - - - - 0x03DA2C 0F:DA1C: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03DA2F 0F:DA1F: F0 BB     BEQ $D9DC
C - - - - - 0x03DA31 0F:DA21: AD FC 05  LDA ram_05FC
C - - - - - 0x03DA34 0F:DA24: 20 7C CD  JSR $CD7C
C - - - - - 0x03DA37 0F:DA27: A0 06     LDY #$06
C - - - - - 0x03DA39 0F:DA29: B1 34     LDA (ram_0034),Y
C - - - - - 0x03DA3B 0F:DA2B: AA        TAX
C - - - - - 0x03DA3C 0F:DA2C: A0 08     LDY #$08
C - - - - - 0x03DA3E 0F:DA2E: B1 34     LDA (ram_0034),Y
C - - - - - 0x03DA40 0F:DA30: A8        TAY
C - - - - - 0x03DA41 0F:DA31: 20 E2 CD  JSR $CDE2
C - - - - - 0x03DA44 0F:DA34: 8D 38 06  STA ram_0638
C - - - - - 0x03DA47 0F:DA37: 4C 0C D7  JMP $D70C
C - - - - - 0x03DA4A 0F:DA3A: 20 7C CD  JSR $CD7C
C - - - - - 0x03DA4D 0F:DA3D: A0 06     LDY #$06
C - - - - - 0x03DA4F 0F:DA3F: B1 34     LDA (ram_0034),Y
C - - - - - 0x03DA51 0F:DA41: 38        SEC
C - - - - - 0x03DA52 0F:DA42: ED 35 06  SBC ram_0635
C - - - - - 0x03DA55 0F:DA45: B0 04     BCS $DA4B
C - - - - - 0x03DA57 0F:DA47: 49 FF     EOR #$FF
C - - - - - 0x03DA59 0F:DA49: 69 01     ADC #$01
C - - - - - 0x03DA5B 0F:DA4B: C9 14     CMP #$14
C - - - - - 0x03DA5D 0F:DA4D: B0 14     BCS $DA63