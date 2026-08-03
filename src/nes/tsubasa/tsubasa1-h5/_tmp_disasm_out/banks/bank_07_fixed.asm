; PRG Bank $07
; CPU Address Range: $C000 - $FFFF
; ROM Offset: $1C000
; ============================================================

  $C000: 2C C0 F8  BIT $f8c0
  $C003: E2 CC     NOP #$cc
  $C005: DC 62 DD  NOP $dd62,X
  $C008: F8        SED
  $C009: DD 8E DE  CMP $de8e,X
  $C00C: F8        SED
  $C00D: DD 78 E1  CMP $e178,X
  $C010: 1D E2 38  ORA $38e2,X
  $C013: E2 14     NOP #$14
  $C015: E3 25     ISB ($25,X)
  $C017: E3 4F     ISB ($4f,X)
  $C019: F9 67 F9  SBC $f967,Y
  $C01C: 67 F9     RRA $f9
  $C01E: AF F9 C7  LAX $c7f9
  $C021: F9 C7 F9  SBC $f9c7,Y
  $C024: EB F9     SBC #$f9
  $C026: 95 E3     STA $e3,X
  $C028: 65 E3     ADC $e3
  $C02A: EC E2 B8  CPX $b8e2
  $C02D: 41 CE     EOR ($ce,X)
  $C02F: 41 D8     EOR ($d8,X)
  $C031: 41 DC     EOR ($dc,X)
  $C033: 41 00     EOR ($00,X)
  $C035: 42        ???
  $C036: 08        PHP
  $C037: 42        ???
  $C038: 0C 42 14  NOP $1442
  $C03B: 42        ???
  $C03C: 1C 42 20  NOP $2042,X
  $C03F: 42        ???
  $C040: 28        PLP
  $C041: 42        ???
  $C042: 2E 42 36  ROL $3642
  $C045: 42        ???
  $C046: 3A        NOP
  $C047: 42        ???
  $C048: 3E 42 42  ROL $4242,X
  $C04B: 42        ???
  $C04C: 46 42     LSR $42
  $C04E: 4A        LSR A
  $C04F: 42        ???
  $C050: 4E 42 52  LSR $5242
  $C053: 42        ???
  $C054: 00        BRK
  $C055: 00        BRK
  $C056: 56 42     LSR $42,X
  $C058: 5A        NOP
  $C059: 42        ???
  $C05A: 60        RTS
  $C05B: 42        ???
  $C05C: 00        BRK
  $C05D: 00        BRK
  $C05E: 64 42     NOP $42
  $C060: 00        BRK
  $C061: 00        BRK
  $C062: 68        PLA
  $C063: 42        ???
  $C064: 6C 42 78  JMP ($7842)
  $C067: 42        ???
  $C068: 84 42     STY $42
  $C06A: 8C 42 98  STY $9842
  $C06D: 42        ???
  $C06E: 00        BRK
  $C06F: 00        BRK
  $C070: 00        BRK
  $C071: 00        BRK
  $C072: 9C 42 00  SHY $0042,X
  $C075: 00        BRK
  $C076: 00        BRK
  $C077: 00        BRK
  $C078: A8        TAY
  $C079: 42        ???
  $C07A: 00        BRK
  $C07B: 00        BRK
  $C07C: 00        BRK
  $C07D: 00        BRK
  $C07E: 00        BRK
  $C07F: 00        BRK
  $C080: 00        BRK
  $C081: 00        BRK
  $C082: 00        BRK
  $C083: 00        BRK
  $C084: 00        BRK
  $C085: 00        BRK
  $C086: 00        BRK
  $C087: 00        BRK
  $C088: 00        BRK
  $C089: 00        BRK
  $C08A: AC 42 00  LDY $0042
  $C08D: 00        BRK
  $C08E: B0 42     BCS $c0d2
  $C090: BC C2 C2  LDY $c2c2,X
  $C093: C2 C8     NOP #$c8
  $C095: C2 1C     NOP #$1c
  $C097: C3 22     DCP ($22,X)
  $C099: C3 2B     DCP ($2b,X)
  $C09B: C3 31     DCP ($31,X)
  $C09D: C3 37     DCP ($37,X)
  $C09F: C3 51     DCP ($51,X)
  $C0A1: C3 57     DCP ($57,X)
  $C0A3: C3 5D     DCP ($5d,X)
  $C0A5: C3 D1     DCP ($d1,X)
  $C0A7: C2 AB     NOP #$ab
  $C0A9: C3 20     DCP ($20,X)
  $C0AB: C4 29     CPY $29
  $C0AD: C4 2F     CPY $2f
  $C0AF: C4 38     CPY $38
  $C0B1: C4 BF     CPY $bf
  $C0B3: C2 F0     NOP #$f0
  $C0B5: C3 C2     DCP ($c2,X)
  $C0B7: CC C5 C9  CPY $c9c5
  $C0BA: 74 C4     NOP $c4,X
  $C0BC: 80 C4     NOP #$c4
  $C0BE: 89 C4     NOP #$c4
  $C0C0: C5 C4     CMP $c4
  $C0C2: 07 C5     SLO $c5
  $C0C4: 1D C6 53  ORA $53c6,X
  $C0C7: C6 3E     DEC $3e
  $C0C9: C7 76     DCP $76
  $C0CB: C8        INY
  $C0CC: 7C C8 90  NOP $90c8,X
  $C0CF: C8        INY
  $C0D0: 99 C8 CC  STA $ccc8,Y
  $C0D3: C8        INY
  $C0D4: D5 C8     CMP $c8,X
  $C0D6: E1 C8     SBC ($c8,X)
  $C0D8: F2        ???
  $C0D9: C8        INY
  $C0DA: FB C8 12  ISB $12c8,Y
  $C0DD: C9 1D     CMP #$1d
  $C0DF: C7 1B     DCP $1b
  $C0E1: C9 21     CMP #$21
  $C0E3: C9 3F     CMP #$3f
  $C0E5: C9 D0     CMP #$d0
  $C0E7: CA        DEX
  $C0E8: 9D CA A3  STA $a3ca,X
  $C0EB: CA        DEX
  $C0EC: CB CC     AXS #$cc
  $C0EE: 7A        NOP
  $C0EF: C9 83     CMP #$83
  $C0F1: C9 41     CMP #$41
  $C0F3: CC 89 C9  CPY $c989
  $C0F6: 92        ???
  $C0F7: C9 98     CMP #$98
  $C0F9: C9 9E     CMP #$9e
  $C0FB: C9 4C     CMP #$4c
  $C0FD: CC A4 C9  CPY $c9a4
  $C100: B0 C9     BCS $c0cb
  $C102: BC C9 CB  LDY $cbc9,X
  $C105: C9 D4     CMP #$d4
  $C107: C9 DD     CMP #$dd
  $C109: C9 E3     CMP #$e3
  $C10B: C9 57     CMP #$57
  $C10D: CC EC C9  CPY $c9ec
  $C110: F5 C9     SBC $c9,X
  $C112: 60        RTS
  $C113: CC FB C9  CPY $c9fb
  $C116: 01 CA     ORA ($ca,X)
  $C118: 0D CA 13  ORA $13ca
  $C11B: CA        DEX
  $C11C: 1C CA 25  NOP $25ca,X
  $C11F: CA        DEX
  $C120: 2B CA     ANC #$ca
  $C122: 31 CA     AND ($ca),Y
  $C124: 40        RTI
  $C125: CA        DEX
  $C126: 46 CA     LSR $ca
  $C128: 4C CA 66  JMP $66ca
  $C12B: CC 6F CC  CPY $cc6f
  $C12E: 7A        NOP
  $C12F: CC 52 CA  CPY $ca52
  $C132: 86 CC     STX $cc
  $C134: 5B CA 64  SRE $64ca,Y
  $C137: CA        DEX
  $C138: 92        ???
  $C139: CC 6A CA  CPY $ca6a
  $C13C: 70 CA     BVS $c108
  $C13E: 76 CA     ROR $ca,X
  $C140: 7C CA 65  NOP $65ca,X
  $C143: C9 85     CMP #$85
  $C145: CA        DEX
  $C146: 8E CA 97  STX $97ca
  $C149: CA        DEX
  $C14A: 9E CC A9  SHX $a9cc,Y
  $C14D: CA        DEX
  $C14E: AF CA B8  LAX $b8ca
  $C151: CA        DEX
  $C152: BE CA AA  LDX $aaca,Y
  $C155: CC B0 CC  CPY $ccb0
  $C158: B6 CC     LDX $cc,Y
  $C15A: C4 CA     CPY $ca
  $C15C: D6 CA     DEC $ca,X
  $C15E: 07 C9     SLO $c9
  $C160: 23 C7     RLA ($c7,X)
  $C162: CA        DEX
  $C163: CA        DEX
  $C164: E8        INX
  $C165: C7 F4     DCP $f4
  $C167: C7 00     DCP $00
  $C169: C8        INY
  $C16A: 09 C8     ORA #$c8
  $C16C: 0F C8 15  SLO $15c8
  $C16F: C8        INY
  $C170: 1B C8 24  SLO $24c8,Y
  $C173: C8        INY
  $C174: 14 C7     NOP $c7,X
  $C176: 6A        ROR A
  $C177: CB 73     AXS #$73
  $C179: CB 79     AXS #$79
  $C17B: CB 82     AXS #$82
  $C17D: CB 8B     AXS #$8b
  $C17F: CB C3     AXS #$c3
  $C181: C3 D4     DCP ($d4,X)
  $C183: CC F4 CB  CPY $cbf4
  $C186: 00        BRK
  $C187: CC 06 CC  CPY $cc06
  $C18A: 07 CA     SLO $ca
  $C18C: 3A        NOP
  $C18D: CA        DEX
  $C18E: 4A        LSR A
  $C18F: C6 A5     DEC $a5
  $C191: C8        INY
  $C192: 0F CC 18  SLO $18cc
  $C195: CC 20 CC  CPY $cc20
  $C198: 29 CC     AND #$cc
  $C19A: 35 CC     AND $cc,X
  $C19C: 5C C9 6E  NOP $6ec9,X
  $C19F: C9 AC     CMP #$ac
  $C1A1: C5 4B     CMP $4b
  $C1A3: C9 6D     CMP #$6d
  $C1A5: C8        INY
  $C1A6: E9 C8     SBC #$c8
  $C1A8: E0 CC     CPX #$cc
  $C1AA: 97 C7     SAX $c7,Y
  $C1AC: 4A        LSR A
  $C1AD: C7 EC     DCP $ec
  $C1AF: CC F2 CC  CPY $ccf2
  $C1B2: F8        SED
  $C1B3: CC E1 C3  CPY $c3e1
  $C1B6: D2        ???
  $C1B7: C3 DA     DCP ($da,X)
  $C1B9: C2 16     NOP #$16
  $C1BB: C3 E0     DCP ($e0,X)
  $C1BD: C2 E6     NOP #$e6
  $C1BF: C2 EC     NOP #$ec
  $C1C1: C2 F2     NOP #$f2
  $C1C3: C2 F8     NOP #$f8
  $C1C5: C2 FE     NOP #$fe
  $C1C7: C2 04     NOP #$04
  $C1C9: C3 0A     DCP ($0a,X)
  $C1CB: C3 10     DCP ($10,X)
  $C1CD: C3 66     DCP ($66,X)
  $C1CF: C3 72     DCP ($72,X)
  $C1D1: C3 7E     DCP ($7e,X)
  $C1D3: C3 8D     DCP ($8d,X)
  $C1D5: C3 9C     DCP ($9c,X)
  $C1D7: C3 D2     DCP ($d2,X)
  $C1D9: C3 E1     DCP ($e1,X)
  $C1DB: C3 10     DCP ($10,X)
  $C1DD: C5 19     CMP $19
  $C1DF: C5 25     CMP $25
  $C1E1: C5 31     CMP $31
  $C1E3: C5 37     CMP $37
  $C1E5: C5 40     CMP $40
  $C1E7: C5 4C     CMP $4c
  $C1E9: C5 54     CMP $54
  $C1EB: C5 5C     CMP $5c
  $C1ED: C5 64     CMP $64
  $C1EF: C5 6C     CMP $6c
  $C1F1: C5 74     CMP $74
  $C1F3: C5 7C     CMP $7c
  $C1F5: C5 84     CMP $84
  $C1F7: C5 8C     CMP $8c
  $C1F9: C5 94     CMP $94
  $C1FB: C5 9C     CMP $9c
  $C1FD: C5 A4     CMP $a4
  $C1FF: C5 F9     CMP $f9
  $C201: C3 02     DCP ($02,X)
  $C203: C4 0B     CPY $0b
  $C205: C4 14     CPY $14
  $C207: C4 B7     CPY $b7
  $C209: C3 BD     DCP ($bd,X)
  $C20B: C3 3E     DCP ($3e,X)
  $C20D: C4 4A     CPY $4a
  $C20F: C4 56     CPY $56
  $C211: C4 65     CPY $65
  $C213: C4 8F     CPY $8f
  $C215: C4 9B     CPY $9b
  $C217: C4 A7     CPY $a7
  $C219: C4 B6     CPY $b6
  $C21B: C4 40     CPY $40
  $C21D: C3 49     DCP ($49,X)
  $C21F: C3 1D     DCP ($1d,X)
  $C221: CB 29     AXS #$29
  $C223: CB 32     AXS #$32
  $C225: CB 3B     AXS #$3b
  $C227: CB 44     AXS #$44
  $C229: CB 50     AXS #$50
  $C22B: CB 5B     AXS #$5b
  $C22D: CB D1     AXS #$d1
  $C22F: C4 DD     CPY $dd
  $C231: C4 E9     CPY $e9
  $C233: C4 F8     CPY $f8
  $C235: C4 AC     CPY $ac
  $C237: C5 B1     CMP $b1
  $C239: C5 BD     CMP $bd
  $C23B: C5 C6     CMP $c6
  $C23D: C5 E4     CMP $e4
  $C23F: C5 F3     CMP $f3
  $C241: C5 FF     CMP $ff
  $C243: C5 0E     CMP $0e
  $C245: C6 38     DEC $38
  $C247: C6 41     DEC $41
  $C249: C6 67     DEC $67
  $C24B: C6 5C     DEC $5c
  $C24D: C6 7C     DEC $7c
  $C24F: C6 76     DEC $76
  $C251: C6 8B     DEC $8b
  $C253: C6 82     DEC $82
  $C255: C6 94     DEC $94
  $C257: C6 9D     DEC $9d
  $C259: C6 A3     DEC $a3
  $C25B: C6 B2     DEC $b2
  $C25D: C6 C1     DEC $c1
  $C25F: C6 F6     DEC $f6
  $C261: C6 EB     DEC $eb
  $C263: C6 0B     DEC $0b
  $C265: C7 02     DCP $02
  $C267: C7 2C     DCP $2c
  $C269: C7 35     DCP $35
  $C26B: C7 4A     DCP $4a
  $C26D: C7 50     DCP $50
  $C26F: C7 56     DCP $56
  $C271: C7 5C     DCP $5c
  $C273: C7 62     DCP $62
  $C275: C7 6A     DCP $6a
  $C277: C7 73     DCP $73
  $C279: C7 79     DCP $79
  $C27B: C7 7F     DCP $7f
  $C27D: C7 85     DCP $85
  $C27F: C7 8B     DCP $8b
  $C281: C7 91     DCP $91
  $C283: C7 A0     DCP $a0
  $C285: C7 AC     DCP $ac
  $C287: C7 B8     DCP $b8
  $C289: C7 C7     DCP $c7
  $C28B: C7 D0     DCP $d0
  $C28D: C7 D6     DCP $d6
  $C28F: C7 D6     DCP $d6
  $C291: C7 DC     DCP $dc
  $C293: C7 DC     DCP $dc
  $C295: C7 E2     DCP $e2
  $C297: C7 2D     DCP $2d
  $C299: C8        INY
  $C29A: 36 C8     ROL $c8,X
  $C29C: 3F C8 45  RLA $45c8,X
  $C29F: C8        INY
  $C2A0: 4B C8     ALR #$c8
  $C2A2: 54 C8     NOP $c8,X
  $C2A4: 5D C8 65  EOR $65c8,X
  $C2A7: C8        INY
  $C2A8: 27 C9     RLA $c9
  $C2AA: 33 C9     RLA ($c9),Y
  $C2AC: CF C5 D8  DCP $d8c5
  $C2AF: C5 DC     CMP $dc
  $C2B1: CA        DEX
  $C2B2: E5 CA     SBC $ca
  $C2B4: F1 CA     SBC ($ca),Y
  $C2B6: F9 CA 08  SBC $08ca,Y
  $C2B9: CB 11     AXS #$11
  $C2BB: CB 40     AXS #$40
  $C2BD: 08        PHP
  $C2BE: E0 40     CPX #$40
  $C2C0: 02        ???
  $C2C1: E0 04     CPX #$04
  $C2C3: 02        ???
  $C2C4: 08        PHP
  $C2C5: 83 D1     SAX ($d1,X)
  $C2C7: E0 05     CPX #$05
  $C2C9: 02        ???
  $C2CA: 01 1F     ORA ($1f,X)
  $C2CC: CD 08 89  CMP $8908
  $C2CF: D1 E0     CMP ($e0),Y
  $C2D1: 05 02     ORA $02
  $C2D3: 01 17     ORA ($17,X)
  $C2D5: CD 02 2E  CMP $2e02
  $C2D8: CD E0 0D  CMP $0de0
  $C2DB: 02        ???
  $C2DC: 01 8C     ORA ($8c,X)
  $C2DE: D1 E0     CMP ($e0),Y
  $C2E0: 0D 02 01  ORA $0102
  $C2E3: B0 D1     BCS $c2b6
  $C2E5: E0 0D     CPX #$0d
  $C2E7: 02        ???
  $C2E8: 01 C2     ORA ($c2,X)
  $C2EA: D1 E0     CMP ($e0),Y
  $C2EC: 0D 02 01  ORA $0102
  $C2EF: D4 D1     NOP $d1,X
  $C2F1: E0 0D     CPX #$0d
  $C2F3: 02        ???
  $C2F4: 01 E6     ORA ($e6,X)
  $C2F6: D1 E0     CMP ($e0),Y
  $C2F8: 0D 02 01  ORA $0102
  $C2FB: F8        SED
  $C2FC: D1 E0     CMP ($e0),Y
  $C2FE: 0D 02 01  ORA $0102
  $C301: 07 D2     SLO $d2
  $C303: E0 0D     CPX #$0d
  $C305: 02        ???
  $C306: 01 13     ORA ($13,X)
  $C308: D2        ???
  $C309: E0 0D     CPX #$0d
  $C30B: 02        ???
  $C30C: 01 1F     ORA ($1f,X)
  $C30E: D2        ???
  $C30F: E0 0D     CPX #$0d
  $C311: 02        ???
  $C312: 01 2C     ORA ($2c,X)
  $C314: D2        ???
  $C315: E0 0D     CPX #$0d
  $C317: 02        ???
  $C318: 0A        ASL A
  $C319: 6B D4     ARR #$d4
  $C31B: E0 04     CPX #$04
  $C31D: 02        ???
  $C31E: 01 3B     ORA ($3b,X)
  $C320: D2        ???
  $C321: E0 05     CPX #$05
  $C323: 02        ???
  $C324: 04 40     NOP $40
  $C326: D2        ???
  $C327: 04 47     NOP $47
  $C329: D2        ???
  $C32A: E0 04     CPX #$04
  $C32C: 02        ???
  $C32D: 01 89     ORA ($89,X)
  $C32F: D1 E0     CMP ($e0),Y
  $C331: 04 02     NOP $02
  $C333: 01 56     ORA ($56,X)
  $C335: D2        ???
  $C336: E0 05     CPX #$05
  $C338: 02        ???
  $C339: 08        PHP
  $C33A: 60        RTS
  $C33B: D2        ???
  $C33C: 14 89     NOP $89,X
  $C33E: D1 E0     CMP ($e0),Y
  $C340: 05 02     ORA $02
  $C342: 01 60     ORA ($60,X)
  $C344: D2        ???
  $C345: 04 89     NOP $89
  $C347: D1 E0     CMP ($e0),Y
  $C349: 05 02     ORA $02
  $C34B: 01 04     ORA ($04,X)
  $C34D: D7 04     DCP $04,X
  $C34F: 89 D1     NOP #$d1
  $C351: 00        BRK
  $C352: 02        ???
  $C353: 08        PHP
  $C354: 3C D4 E0  NOP $e0d4,X
  $C357: 04 02     NOP $02
  $C359: 01 47     ORA ($47,X)
  $C35B: D4 E0     NOP $e0,X
  $C35D: 05 02     ORA $02
  $C35F: 01 53     ORA ($53,X)
  $C361: D4 01     NOP $01,X
  $C363: 5C D4 E0  NOP $e0d4,X
  $C366: 06 01     ASL $01
  $C368: 01 01     ORA ($01,X)
  $C36A: CD 01 31  CMP $3101
  $C36D: CD 02 81  CMP $8102
  $C370: D2        ???
  $C371: E0 06     CPX #$06
  $C373: 01 01     ORA ($01,X)
  $C375: 01 CD     ORA ($cd,X)
  $C377: 01 31     ORA ($31,X)
  $C379: CD 02 8C  CMP $8c02
  $C37C: D2        ???
  $C37D: E0 07     CPX #$07
  $C37F: 01 01     ORA ($01,X)
  $C381: 01 CD     ORA ($cd,X)
  $C383: 01 31     ORA ($31,X)
  $C385: CD 02 97  CMP $9702
  $C388: D2        ???
  $C389: 01 9A     ORA ($9a,X)
  $C38B: D2        ???
  $C38C: E0 07     CPX #$07
  $C38E: 01 01     ORA ($01,X)
  $C390: 01 CD     ORA ($cd,X)
  $C392: 01 31     ORA ($31,X)
  $C394: CD 02 A2  CMP $a202
  $C397: D2        ???
  $C398: 01 A5     ORA ($a5,X)
  $C39A: D2        ???
  $C39B: E0 07     CPX #$07
  $C39D: 01 01     ORA ($01,X)
  $C39F: 31 CD     AND ($cd),Y
  $C3A1: 04 53     NOP $53
  $C3A3: D4 02     NOP $02,X
  $C3A5: 6B D2     ARR #$d2
  $C3A7: 01 A5     ORA ($a5,X)
  $C3A9: D2        ???
  $C3AA: E0 06     CPX #$06
  $C3AC: 01 01     ORA ($01,X)
  $C3AE: 01 CD     ORA ($cd,X)
  $C3B0: 01 DC     ORA ($dc,X)
  $C3B2: D3 01     DCP ($01),Y
  $C3B4: 1F CE E0  SLO $e0ce,X
  $C3B7: 04 03     NOP $03
  $C3B9: 01 95     ORA ($95,X)
  $C3BB: D0 E0     BNE $c39d
  $C3BD: 04 04     NOP $04
  $C3BF: 01 95     ORA ($95,X)
  $C3C1: D0 E0     BNE $c3a3
  $C3C3: 07 FF     SLO $ff
  $C3C5: 08        PHP
  $C3C6: 1F CD 08  SLO $08cd,X
  $C3C9: A2 D2     LDX #$d2
  $C3CB: 08        PHP
  $C3CC: B5 D2     LDA $d2,X
  $C3CE: 08        PHP
  $C3CF: BD D2 E0  LDA $e0d2,X
  $C3D2: 07 05     SLO $05
  $C3D4: 08        PHP
  $C3D5: 1F CD 08  SLO $08cd,X
  $C3D8: A2 D2     LDX #$d2
  $C3DA: 08        PHP
  $C3DB: C9 D2     CMP #$d2
  $C3DD: 08        PHP
  $C3DE: D1 D2     CMP ($d2),Y
  $C3E0: E0 07     CPX #$07
  $C3E2: 06 08     ASL $08
  $C3E4: 1F CD 08  SLO $08cd,X
  $C3E7: 8A        TXA
  $C3E8: DC 08 DD  NOP $dd08,X
  $C3EB: D2        ???
  $C3EC: 08        PHP
  $C3ED: E5 D2     SBC $d2
  $C3EF: E0 05     CPX #$05
  $C3F1: 02        ???
  $C3F2: 01 04     ORA ($04,X)
  $C3F4: D4 01     NOP $01,X
  $C3F6: 1F CE E0  SLO $e0ce,X
  $C3F9: 05 03     ORA $03
  $C3FB: 02        ???
  $C3FC: 17 CD     SLO $cd,X
  $C3FE: 02        ???
  $C3FF: 5E D3 E0  LSR $e0d3,X
  $C402: 05 03     ORA $03
  $C404: 02        ???
  $C405: 6A        ROR A
  $C406: D3 08     DCP ($08),Y
  $C408: 72        ???
  $C409: D3 E0     DCP ($e0),Y
  $C40B: 05 04     ORA $04
  $C40D: 02        ???
  $C40E: 28        PLP
  $C40F: CD 02 81  CMP $8102
  $C412: D3 E0     DCP ($e0),Y
  $C414: 06 04     ASL $04
  $C416: 02        ???
  $C417: 28        PLP
  $C418: CD 02 90  CMP $9002
  $C41B: D3 02     DCP ($02),Y
  $C41D: 9C D3 E0  SHY $e0d3,X
  $C420: 01 00     ORA ($00,X)
  $C422: 10 A8     BPL $c3cc
  $C424: D3 FF     DCP ($ff),Y
  $C426: 1F C7 E0  SLO $e0c7,X
  $C429: 04 02     NOP $02
  $C42B: 01 B5     ORA ($b5,X)
  $C42D: D3 E0     DCP ($e0),Y
  $C42F: 05 02     ORA $02
  $C431: 08        PHP
  $C432: A8        TAY
  $C433: D3 08     DCP ($08),Y
  $C435: C0 D3     CPY #$d3
  $C437: E0 04     CPX #$04
  $C439: 02        ???
  $C43A: 08        PHP
  $C43B: CD D3 E0  CMP $e0d3
  $C43E: 06 02     ASL $02
  $C440: 01 01     ORA ($01,X)
  $C442: CD 05 DC  CMP $dc05
  $C445: D3 04     DCP ($04),Y
  $C447: 2B CF     ANC #$cf
  $C449: E0 06     CPX #$06
  $C44B: 02        ???
  $C44C: 01 01     ORA ($01,X)
  $C44E: CD 05 DC  CMP $dc05
  $C451: D3 04     DCP ($04),Y
  $C453: E1 D3     SBC ($d3,X)
  $C455: E0 07     CPX #$07
  $C457: 02        ???
  $C458: 02        ???
  $C459: 01 CD     ORA ($cd,X)
  $C45B: 05 DC     ORA $dc
  $C45D: D3 04     DCP ($04),Y
  $C45F: 97 D2     SAX $d2,Y
  $C461: 04 DC     NOP $dc
  $C463: D3 E0     DCP ($e0),Y
  $C465: 07 02     SLO $02
  $C467: 02        ???
  $C468: 01 CD     ORA ($cd,X)
  $C46A: 05 DC     ORA $dc
  $C46C: D3 04     DCP ($04),Y
  $C46E: 97 D2     SAX $d2,Y
  $C470: 04 F9     NOP $f9
  $C472: D3 E0     DCP ($e0),Y
  $C474: 06 02     ASL $02
  $C476: 01 01     ORA ($01,X)
  $C478: CD 01 04  CMP $0401
  $C47B: D4 04     NOP $04,X
  $C47D: 0A        ASL A
  $C47E: D4 E0     NOP $e0,X
  $C480: 01 02     ORA ($02,X)
  $C482: 04 20     NOP $20
  $C484: CF 08 E0  DCP $e008
  $C487: CD E0 0D  CMP $0de0
  $C48A: 00        BRK
  $C48B: 06 16     ASL $16
  $C48D: D4 E0     NOP $e0,X
  $C48F: 06 02     ASL $02
  $C491: 01 29     ORA ($29,X)
  $C493: D4 04     NOP $04,X
  $C495: 31 D4     AND ($d4),Y
  $C497: 08        PHP
  $C498: 2B CF     ANC #$cf
  $C49A: E0 06     CPX #$06
  $C49C: 02        ???
  $C49D: 01 29     ORA ($29,X)
  $C49F: D4 04     NOP $04,X
  $C4A1: 31 D4     AND ($d4),Y
  $C4A3: 08        PHP
  $C4A4: E1 D3     SBC ($d3,X)
  $C4A6: E0 07     CPX #$07
  $C4A8: 02        ???
  $C4A9: 01 29     ORA ($29,X)
  $C4AB: D4 04     NOP $04,X
  $C4AD: 31 D4     AND ($d4),Y
  $C4AF: 08        PHP
  $C4B0: 97 D2     SAX $d2,Y
  $C4B2: 08        PHP
  $C4B3: 31 CD     AND ($cd),Y
  $C4B5: E0 07     CPX #$07
  $C4B7: 02        ???
  $C4B8: 01 29     ORA ($29,X)
  $C4BA: D4 04     NOP $04,X
  $C4BC: 31 D4     AND ($d4),Y
  $C4BE: 08        PHP
  $C4BF: 97 D2     SAX $d2,Y
  $C4C1: 08        PHP
  $C4C2: F9 D3 E0  SBC $e0d3,Y
  $C4C5: 06 02     ASL $02
  $C4C7: 01 29     ORA ($29,X)
  $C4C9: D4 01     NOP $01,X
  $C4CB: 31 D4     AND ($d4),Y
  $C4CD: 08        PHP
  $C4CE: 1F CE E0  SLO $e0ce,X
  $C4D1: 06 02     ASL $02
  $C4D3: 01 29     ORA ($29,X)
  $C4D5: D4 04     NOP $04,X
  $C4D7: 31 D4     AND ($d4),Y
  $C4D9: 08        PHP
  $C4DA: 81 D2     STA ($d2,X)
  $C4DC: E0 06     CPX #$06
  $C4DE: 02        ???
  $C4DF: 01 29     ORA ($29,X)
  $C4E1: D4 04     NOP $04,X
  $C4E3: 31 D4     AND ($d4),Y
  $C4E5: 08        PHP
  $C4E6: 8C D2 E0  STY $e0d2
  $C4E9: 07 02     SLO $02
  $C4EB: 01 29     ORA ($29,X)
  $C4ED: D4 04     NOP $04,X
  $C4EF: 31 D4     AND ($d4),Y
  $C4F1: 08        PHP
  $C4F2: 97 D2     SAX $d2,Y
  $C4F4: 08        PHP
  $C4F5: 9A        TXS
  $C4F6: D2        ???
  $C4F7: E0 07     CPX #$07
  $C4F9: 02        ???
  $C4FA: 01 29     ORA ($29,X)
  $C4FC: D4 04     NOP $04,X
  $C4FE: 31 D4     AND ($d4),Y
  $C500: 08        PHP
  $C501: A2 D2     LDX #$d2
  $C503: 01 A5     ORA ($a5,X)
  $C505: D2        ???
  $C506: E0 09     CPX #$09
  $C508: 02        ???
  $C509: 08        PHP
  $C50A: F0 D2     BEQ $c4de
  $C50C: 14 FA     NOP $fa,X
  $C50E: D2        ???
  $C50F: E0 05     CPX #$05
  $C511: FF 08 05  ISB $0508,X
  $C514: D3 08     DCP ($08),Y
  $C516: 0D D3 E0  ORA $e0d3
  $C519: 06 FF     ASL $ff
  $C51B: 04 12     NOP $12
  $C51D: D3 08     DCP ($08),Y
  $C51F: 1A        NOP
  $C520: D3 04     DCP ($04),Y
  $C522: 1D D3 E0  ORA $e0d3,X
  $C525: 06 FF     ASL $ff
  $C527: 04 12     NOP $12
  $C529: D3 08     DCP ($08),Y
  $C52B: 49 D0     EOR #$d0
  $C52D: 04 26     NOP $26
  $C52F: D3 E0     DCP ($e0),Y
  $C531: 04 FF     NOP $ff
  $C533: 08        PHP
  $C534: B3 DC     LAX ($dc),Y
  $C536: E0 05     CPX #$05
  $C538: FF 01 93  ISB $9301,X
  $C53B: CF 08 BF  DCP $bf08
  $C53E: DC E0 06  NOP $06e0,X
  $C541: FF 04 93  ISB $9304,X
  $C544: CF 08 30  DCP $3008
  $C547: D3 04     DCP ($04),Y
  $C549: 37 D3     RLA $d3,X
  $C54B: E0 06     CPX #$06
  $C54D: FF 04 46  ISB $4604,X
  $C550: D3 FF     DCP ($ff),Y
  $C552: 12        ???
  $C553: C5 07     CMP $07
  $C555: FF 04 46  ISB $4604,X
  $C558: D3 FF     DCP ($ff),Y
  $C55A: 1B C5 07  SLO $07c5,Y
  $C55D: FF 04 1D  ISB $1d04,X
  $C560: D3 FF     DCP ($ff),Y
  $C562: 27 C5     RLA $c5
  $C564: 05 FF     ORA $ff
  $C566: 04 46     NOP $46
  $C568: D3 FF     DCP ($ff),Y
  $C56A: 33 C5     RLA ($c5),Y
  $C56C: 06 FF     ASL $ff
  $C56E: 04 46     NOP $46
  $C570: D3 FF     DCP ($ff),Y
  $C572: 39 C5 07  AND $07c5,Y
  $C575: FF 04 46  ISB $4604,X
  $C578: D3 FF     DCP ($ff),Y
  $C57A: 42        ???
  $C57B: C5 06     CMP $06
  $C57D: FF 04 50  ISB $5004,X
  $C580: D3 FF     DCP ($ff),Y
  $C582: 12        ???
  $C583: C5 07     CMP $07
  $C585: FF 04 50  ISB $5004,X
  $C588: D3 FF     DCP ($ff),Y
  $C58A: 1B C5 07  SLO $07c5,Y
  $C58D: FF 04 50  ISB $5004,X
  $C590: D3 FF     DCP ($ff),Y
  $C592: 27 C5     RLA $c5
  $C594: 05 FF     ORA $ff
  $C596: 04 50     NOP $50
  $C598: D3 FF     DCP ($ff),Y
  $C59A: 33 C5     RLA ($c5),Y
  $C59C: 06 FF     ASL $ff
  $C59E: 04 50     NOP $50
  $C5A0: D3 FF     DCP ($ff),Y
  $C5A2: 39 C5 07  AND $07c5,Y
  $C5A5: FF 04 50  ISB $5004,X
  $C5A8: D3 FF     DCP ($ff),Y
  $C5AA: 42        ???
  $C5AB: C5 01     CMP $01
  $C5AD: 00        BRK
  $C5AE: FF D3 C2  ISB $c2d3,X
  $C5B1: 06 00     ASL $00
  $C5B3: 01 17     ORA ($17,X)
  $C5B5: CD 01 CD  CMP $cd01
  $C5B8: CE 02 2E  DEC $2e02
  $C5BB: CD E0 01  CMP $01e0
  $C5BE: 02        ???
  $C5BF: 01 17     ORA ($17,X)
  $C5C1: CD 02 8F  CMP $8f02
  $C5C4: CD E0 01  CMP $01e0
  $C5C7: 02        ???
  $C5C8: 01 28     ORA ($28,X)
  $C5CA: CD 02 A2  CMP $a202
  $C5CD: CD E0 01  CMP $01e0
  $C5D0: 02        ???
  $C5D1: 01 17     ORA ($17,X)
  $C5D3: CD 02 97  CMP $9702
  $C5D6: CD E0 02  CMP $02e0
  $C5D9: 02        ???
  $C5DA: 01 28     ORA ($28,X)
  $C5DC: CD 02 AA  CMP $aa02
  $C5DF: CD 01 A2  CMP $a201
  $C5E2: CD E0 07  CMP $07e0
  $C5E5: 01 01     ORA ($01,X)
  $C5E7: 01 CD     ORA ($cd,X)
  $C5E9: 01 31     ORA ($31,X)
  $C5EB: CD 02 17  CMP $1702
  $C5EE: CD 01 35  CMP $3501
  $C5F1: CF E0 06  DCP $06e0
  $C5F4: 01 01     ORA ($01,X)
  $C5F6: 01 CD     ORA ($cd,X)
  $C5F8: 01 31     ORA ($31,X)
  $C5FA: CD 02 2B  CMP $2b02
  $C5FD: CF E0 03  DCP $03e0
  $C600: 00        BRK
  $C601: 01 01     ORA ($01,X)
  $C603: CD 01 31  CMP $3101
  $C606: CD 02 17  CMP $1702
  $C609: CD 01 30  CMP $3001
  $C60C: CE E0 03  DEC $03e0
  $C60F: 00        BRK
  $C610: 01 01     ORA ($01,X)
  $C612: CD 01 31  CMP $3101
  $C615: CD 02 17  CMP $1702
  $C618: CD 01 C6  CMP $c601
  $C61B: CE E0 01  DEC $01e0
  $C61E: 02        ???
  $C61F: 01 01     ORA ($01,X)
  $C621: CD 02 31  CMP $3102
  $C624: CD E0 01  CMP $01e0
  $C627: 02        ???
  $C628: 02        ???
  $C629: 20 CF 04  JSR $04cf
  $C62C: E0 CD     CPX #$cd
  $C62E: E0 01     CPX #$01
  $C630: 00        BRK
  $C631: 01 01     ORA ($01,X)
  $C633: CD 02 31  CMP $3102
  $C636: CD E0 05  CMP $05e0
  $C639: 01 01     ORA ($01,X)
  $C63B: 09 CD     ORA #$cd
  $C63D: 02        ???
  $C63E: 80 CD     NOP #$cd
  $C640: E0 05     CPX #$05
  $C642: 01 01     ORA ($01,X)
  $C644: 01 CD     ORA ($cd,X)
  $C646: 02        ???
  $C647: 2B CF     ANC #$cf
  $C649: E0 05     CPX #$05
  $C64B: 01 06     ORA ($06,X)
  $C64D: 01 CD     ORA ($cd,X)
  $C64F: 01 44     ORA ($44,X)
  $C651: CF E0 01  DCP $01e0
  $C654: 02        ???
  $C655: 02        ???
  $C656: 17 CD     SLO $cd,X
  $C658: 01 36     ORA ($36,X)
  $C65A: CE E0 03  DEC $03e0
  $C65D: 00        BRK
  $C65E: 01 01     ORA ($01,X)
  $C660: CD 01 A0  CMP $a001
  $C663: CE FF 6F  DEC $6fff
  $C666: C6 03     DEC $03
  $C668: 00        BRK
  $C669: 01 06     ORA ($06,X)
  $C66B: CD 01 AA  CMP $aa01
  $C66E: CE 01 0C  DEC $0c01
  $C671: CD 01 5E  CMP $5e01
  $C674: CD E0 00  CMP $00e0
  $C677: 02        ???
  $C678: 01 27     ORA ($27,X)
  $C67A: DB E0 00  DCP $00e0,Y
  $C67D: 02        ???
  $C67E: 01 8D     ORA ($8d,X)
  $C680: DC E0 01  NOP $01e0,X
  $C683: 02        ???
  $C684: 01 06     ORA ($06,X)
  $C686: CD 04 8E  CMP $8e04
  $C689: CE E0 01  DEC $01e0
  $C68C: 02        ???
  $C68D: 01 06     ORA ($06,X)
  $C68F: CD 04 98  CMP $9804
  $C692: CE E0 05  DEC $05e0
  $C695: 00        BRK
  $C696: 08        PHP
  $C697: 17 CD     SLO $cd,X
  $C699: 04 35     NOP $35
  $C69B: CF E0 04  DCP $04e0
  $C69E: 00        BRK
  $C69F: 06 2B     ASL $2b
  $C6A1: CF E0 03  DCP $03e0
  $C6A4: 00        BRK
  $C6A5: 02        ???
  $C6A6: 01 CD     ORA ($cd,X)
  $C6A8: 02        ???
  $C6A9: 31 CD     AND ($cd),Y
  $C6AB: 08        PHP
  $C6AC: 28        PLP
  $C6AD: CD 02 BF  CMP $bf02
  $C6B0: CE E0 03  DEC $03e0
  $C6B3: 00        BRK
  $C6B4: 02        ???
  $C6B5: 01 CD     ORA ($cd,X)
  $C6B7: 02        ???
  $C6B8: 31 CD     AND ($cd),Y
  $C6BA: 08        PHP
  $C6BB: 28        PLP
  $C6BC: CD 02 29  CMP $2902
  $C6BF: CE E0 01  DEC $01e0
  $C6C2: 00        BRK
  $C6C3: 02        ???
  $C6C4: 01 CD     ORA ($cd,X)
  $C6C6: 02        ???
  $C6C7: 31 CD     AND ($cd),Y
  $C6C9: E0 02     CPX #$02
  $C6CB: 00        BRK
  $C6CC: 01 01     ORA ($01,X)
  $C6CE: CD 04 34  CMP $3404
  $C6D1: CD FF FE  CMP $feff
  $C6D4: C6 02     DEC $02
  $C6D6: 00        BRK
  $C6D7: 01 06     ORA ($06,X)
  $C6D9: CD 04 34  CMP $3404
  $C6DC: CD FF FE  CMP $feff
  $C6DF: C6 02     DEC $02
  $C6E1: 00        BRK
  $C6E2: 01 06     ORA ($06,X)
  $C6E4: CD 04 3B  CMP $3b04
  $C6E7: CD FF FE  CMP $feff
  $C6EA: C6 02     DEC $02
  $C6EC: 00        BRK
  $C6ED: 01 06     ORA ($06,X)
  $C6EF: CD 02 05  CMP $0502
  $C6F2: CF FF FE  DCP $feff
  $C6F5: C6 02     DEC $02
  $C6F7: 00        BRK
  $C6F8: 01 06     ORA ($06,X)
  $C6FA: CD 02 13  CMP $1302
  $C6FD: CF 03 1F  DCP $1f03
  $C700: CE E0 05  DEC $05e0
  $C703: 01 01     ORA ($01,X)
  $C705: 01 CD     ORA ($cd,X)
  $C707: 03 43     SLO ($43,X)
  $C709: CE E0 05  DEC $05e0
  $C70C: 01 01     ORA ($01,X)
  $C70E: 14 CD     NOP $cd,X
  $C710: 03 5A     SLO ($5a,X)
  $C712: CE E0 01  DEC $01e0
  $C715: 00        BRK
  $C716: 01 65     ORA ($65,X)
  $C718: CE 02 5E  DEC $5e02
  $C71B: CD E0 00  CMP $00e0
  $C71E: 00        BRK
  $C71F: 08        PHP
  $C720: E0 CD     CPX #$cd
  $C722: E0 01     CPX #$01
  $C724: 01 02     ORA ($02,X)
  $C726: 17 CD     SLO $cd,X
  $C728: 06 EE     ASL $ee
  $C72A: CD E0 05  CMP $05e0
  $C72D: 02        ???
  $C72E: 02        ???
  $C72F: 14 CD     NOP $cd,X
  $C731: 04 84     NOP $84
  $C733: CE E0 05  DEC $05e0
  $C736: 04 02     NOP $02
  $C738: 01 CD     ORA ($cd,X)
  $C73A: 04 79     NOP $79
  $C73C: CE E0 06  DEC $06e0
  $C73F: 00        BRK
  $C740: 01 F6     ORA ($f6,X)
  $C742: CD 02 22  CMP $2202
  $C745: CD 01 71  CMP $7101
  $C748: CD E0 0D  CMP $0de0
  $C74B: 00        BRK
  $C74C: 06 40     ASL $40
  $C74E: D5 E0     CMP $e0,X
  $C750: 0D 00 06  ORA $0600
  $C753: 50 D5     BVC $c72a
  $C755: E0 0D     CPX #$0d
  $C757: 00        BRK
  $C758: 06 60     ASL $60
  $C75A: D5 E0     CMP $e0,X
  $C75C: 0D 00 06  ORA $0600
  $C75F: 6F D5 E0  RRA $e0d5
  $C762: 0E 00 06  ASL $0600
  $C765: 80 D5     NOP #$d5
  $C767: FF 6F C7  ISB $c76f,X
  $C76A: 0E 00 06  ASL $0600
  $C76D: 9E D5 0A  SHX $0ad5,Y
  $C770: 8E D5 E0  STX $e0d5
  $C773: 0D 00 04  ORA $0400
  $C776: AC D5 E0  LDY $e0d5
  $C779: 0D 00 04  ORA $0400
  $C77C: BC D5 E0  LDY $e0d5,X
  $C77F: 0D 00 04  ORA $0400
  $C782: CC D5 E0  CPY $e0d5
  $C785: 0D 00 04  ORA $0400
  $C788: DD D5 E0  CMP $e0d5,X
  $C78B: 0D 00 04  ORA $0400
  $C78E: EC D5 E0  CPX $e0d5
  $C791: 0D 00 04  ORA $0400
  $C794: FA        NOP
  $C795: D5 E0     CMP $e0,X
  $C797: 01 00     ORA ($00,X)
  $C799: 02        ???
  $C79A: 17 CD     SLO $cd,X
  $C79C: 04 51     NOP $51
  $C79E: D7 E0     DCP $e0,X
  $C7A0: 02        ???
  $C7A1: 00        BRK
  $C7A2: 01 08     ORA ($08,X)
  $C7A4: D6 0A     DEC $0a,X
  $C7A6: 0E D6 0A  ASL $0ad6
  $C7A9: 1A        NOP
  $C7AA: D6 E0     DEC $e0,X
  $C7AC: 02        ???
  $C7AD: 00        BRK
  $C7AE: 01 08     ORA ($08,X)
  $C7B0: D6 0A     DEC $0a,X
  $C7B2: 60        RTS
  $C7B3: D2        ???
  $C7B4: 0A        ASL A
  $C7B5: 22        ???
  $C7B6: D6 E0     DEC $e0,X
  $C7B8: 03 00     SLO ($00,X)
  $C7BA: 01 08     ORA ($08,X)
  $C7BC: D6 06     DEC $06,X
  $C7BE: 2C D6 06  BIT $06d6
  $C7C1: 32        ???
  $C7C2: D6 0A     DEC $0a,X
  $C7C4: 38        SEC
  $C7C5: D6 E0     DEC $e0,X
  $C7C7: 05 03     ORA $03
  $C7C9: 04 43     NOP $43
  $C7CB: D6 08     DEC $08,X
  $C7CD: 4F D6 E0  SRE $e0d6
  $C7D0: 0D 00 06  ORA $0600
  $C7D3: 5A        NOP
  $C7D4: D6 E0     DEC $e0,X
  $C7D6: 0D 00 06  ORA $0600
  $C7D9: 66 D6     ROR $d6
  $C7DB: E0 0D     CPX #$0d
  $C7DD: 00        BRK
  $C7DE: 06 71     ASL $71
  $C7E0: D6 E0     DEC $e0,X
  $C7E2: 0D 00 06  ORA $0600
  $C7E5: 7C D6 E0  NOP $e0d6,X
  $C7E8: 02        ???
  $C7E9: 02        ???
  $C7EA: 02        ???
  $C7EB: 88        DEY
  $C7EC: D6 0A     DEC $0a,X
  $C7EE: 8E D6 06  STX $06d6
  $C7F1: 9D D6 E0  STA $e0d6,X
  $C7F4: 02        ???
  $C7F5: 03 02     SLO ($02,X)
  $C7F7: A7 D6     LAX $d6
  $C7F9: 06 B4     ASL $b4
  $C7FB: D6 06     DEC $06,X
  $C7FD: BF D6 E0  LAX $e0d6,Y
  $C800: 0B 00     ANC #$00
  $C802: 04 C8     NOP $c8
  $C804: D6 08     DEC $08,X
  $C806: D2        ???
  $C807: D6 E0     DEC $e0,X
  $C809: 0A        ASL A
  $C80A: 00        BRK
  $C80B: 14 E4     NOP $e4,X
  $C80D: D6 E0     DEC $e0,X
  $C80F: 08        PHP
  $C810: 07 14     SLO $14
  $C812: EF D6 E0  ISB $e0d6
  $C815: 0D 00 08  ORA $0800
  $C818: F6 D6     INC $d6,X
  $C81A: E0 0B     CPX #$0b
  $C81C: 00        BRK
  $C81D: 10 E4     BPL $c803
  $C81F: D6 1E     DEC $1e,X
  $C821: 12        ???
  $C822: D7 E0     DCP $e0,X
  $C824: 01 06     ORA ($06,X)
  $C826: 08        PHP
  $C827: 21 D7     AND ($d7,X)
  $C829: 08        PHP
  $C82A: 2D D7 E0  AND $e0d7
  $C82D: 01 00     ORA ($00,X)
  $C82F: 02        ???
  $C830: 01 CD     ORA ($cd,X)
  $C832: 04 44     NOP $44
  $C834: D7 E0     DCP $e0,X
  $C836: 01 00     ORA ($00,X)
  $C838: 02        ???
  $C839: 4D D7 04  EOR $04d7
  $C83C: 44 D7     NOP $d7
  $C83E: E0 00     CPX #$00
  $C840: 00        BRK
  $C841: 08        PHP
  $C842: CA        DEX
  $C843: CF E0 04  DCP $04e0
  $C846: 00        BRK
  $C847: 08        PHP
  $C848: D7 CF     DCP $cf,X
  $C84A: E0 05     CPX #$05
  $C84C: 00        BRK
  $C84D: 04 E5     NOP $e5
  $C84F: CF 08 F0  DCP $f008
  $C852: CF E0 01  DCP $01e0
  $C855: 00        BRK
  $C856: 04 FA     NOP $fa
  $C858: CF 08 05  DCP $0508
  $C85B: D0 E0     BNE $c83d
  $C85D: 05 00     ORA $00
  $C85F: 04 0D     NOP $0d
  $C861: D0 FF     BNE $c862
  $C863: 59 C8 05  EOR $05c8,Y
  $C866: 00        BRK
  $C867: 04 16     NOP $16
  $C869: D0 FF     BNE $c86a
  $C86B: 59 C8 01  EOR $01c8,Y
  $C86E: 00        BRK
  $C86F: 04 2E     NOP $2e
  $C871: D0 08     BNE $c87b
  $C873: 31 D0     AND ($d0),Y
  $C875: E0 04     CPX #$04
  $C877: 02        ???
  $C878: 08        PHP
  $C879: 3A        NOP
  $C87A: D0 E0     BNE $c85c
  $C87C: 02        ???
  $C87D: 01 01     ORA ($01,X)
  $C87F: 49 D0     EOR #$d0
  $C881: 04 4C     NOP $4c
  $C883: D0 01     BNE $c886
  $C885: 57 D0     SRE $d0,X
  $C887: 01 01     ORA ($01,X)
  $C889: 01 61     ORA ($61,X)
  $C88B: D0 01     BNE $c88e
  $C88D: 67 D0     RRA $d0
  $C88F: E0 01     CPX #$01
  $C891: 01 08     ORA ($08,X)
  $C893: 1F CD 08  SLO $08cd,X
  $C896: 6F D0 E0  RRA $e0d0
  $C899: 02        ???
  $C89A: 01 08     ORA ($08,X)
  $C89C: BA        TSX
  $C89D: D0 08     BNE $c8a7
  $C89F: C1 D0     CMP ($d0,X)
  $C8A1: 08        PHP
  $C8A2: CC D0 E0  CPY $e0d0
  $C8A5: 01 01     ORA ($01,X)
  $C8A7: 08        PHP
  $C8A8: D6 D0     DEC $d0,X
  $C8AA: 08        PHP
  $C8AB: E2 D0     NOP #$d0
  $C8AD: 22        ???
  $C8AE: 01 08     ORA ($08,X)
  $C8B0: EA        NOP
  $C8B1: D0 08     BNE $c8bb
  $C8B3: F5 D0     SBC $d0,X
  $C8B5: 08        PHP
  $C8B6: 04 D1     NOP $d1
  $C8B8: 21 01     AND ($01,X)
  $C8BA: 08        PHP
  $C8BB: 12        ???
  $C8BC: D1 08     CMP ($08),Y
  $C8BE: 1D D1 22  ORA $22d1,X
  $C8C1: 01 08     ORA ($08,X)
  $C8C3: 26 D1     ROL $d1
  $C8C5: 08        PHP
  $C8C6: 34 D1     NOP $d1,X
  $C8C8: 08        PHP
  $C8C9: 40        RTI
  $C8CA: D1 E0     CMP ($e0),Y
  $C8CC: 01 00     ORA ($00,X)
  $C8CE: 08        PHP
  $C8CF: 48        PHA
  $C8D0: D1 08     CMP ($08),Y
  $C8D2: 50 D1     BVC $c8a5
  $C8D4: E0 02     CPX #$02
  $C8D6: 02        ???
  $C8D7: 08        PHP
  $C8D8: 2E D0 08  ROL $08d0
  $C8DB: 19 CD 08  ORA $08cd,Y
  $C8DE: 5C D1 E0  NOP $e0d1,X
  $C8E1: 05 02     ORA $02
  $C8E3: 08        PHP
  $C8E4: 70 D1     BVS $c8b7
  $C8E6: 08        PHP
  $C8E7: 76 D1     ROR $d1,X
  $C8E9: 01 01     ORA ($01,X)
  $C8EB: 08        PHP
  $C8EC: 61 D1     ADC ($d1,X)
  $C8EE: 08        PHP
  $C8EF: 67 D1     RRA $d1
  $C8F1: E0 01     CPX #$01
  $C8F3: 00        BRK
  $C8F4: 04 D4     NOP $d4
  $C8F6: CE 0C 7E  DEC $7e0c
  $C8F9: D4 E0     NOP $e0,X
  $C8FB: 02        ???
  $C8FC: 00        BRK
  $C8FD: 01 01     ORA ($01,X)
  $C8FF: CD 01 86  CMP $8601
  $C902: D4 02     NOP $02,X
  $C904: 1F CE E0  SLO $e0ce,X
  $C907: 03 00     SLO ($00,X)
  $C909: 01 01     ORA ($01,X)
  $C90B: CD 01 86  CMP $8601
  $C90E: D4 FF     NOP $ff,X
  $C910: 6F C6 01  RRA $01c6
  $C913: 00        BRK
  $C914: 01 01     ORA ($01,X)
  $C916: CD 01 86  CMP $8601
  $C919: D4 E0     NOP $e0,X
  $C91B: 00        BRK
  $C91C: 02        ???
  $C91D: 01 9D     ORA ($9d,X)
  $C91F: D4 E0     NOP $e0,X
  $C921: 00        BRK
  $C922: 02        ???
  $C923: 01 BD     ORA ($bd,X)
  $C925: D4 E0     NOP $e0,X
  $C927: 02        ???
  $C928: 00        BRK
  $C929: 0F A7 D4  SLO $d4a7
  $C92C: 08        PHP
  $C92D: 1C D5 01  NOP $01d5,X
  $C930: AF D4 E0  LAX $e0d4
  $C933: 02        ???
  $C934: 00        BRK
  $C935: 0F A7 D4  SLO $d4a7
  $C938: 08        PHP
  $C939: 1C D5 01  NOP $01d5,X
  $C93C: B7 D4     LAX $d4,Y
  $C93E: E0 02     CPX #$02
  $C940: 02        ???
  $C941: 01 17     ORA ($17,X)
  $C943: CD 08 C7  CMP $c708
  $C946: D4 01     NOP $01,X
  $C948: D3 D4     DCP ($d4),Y
  $C94A: E0 01     CPX #$01
  $C94C: 01 01     ORA ($01,X)
  $C94E: DB D4 01  DCP $01d4,Y
  $C951: E6 D4     INC $d4
  $C953: 01 01     ORA ($01,X)
  $C955: 01 EC     ORA ($ec,X)
  $C957: D4 08     NOP $08,X
  $C959: F4 D4     NOP $d4,X
  $C95B: E0 05     CPX #$05
  $C95D: 00        BRK
  $C95E: 18        CLC
  $C95F: FB D4 08  ISB $08d4,Y
  $C962: 05 D5     ORA $d5
  $C964: E0 01     CPX #$01
  $C966: 00        BRK
  $C967: 08        PHP
  $C968: 1F CD 08  SLO $08cd,X
  $C96B: 2E CD E0  ROL $e0cd
  $C96E: 02        ???
  $C96F: 02        ???
  $C970: 02        ???
  $C971: A2 D2     LDX #$d2
  $C973: 02        ???
  $C974: AE D2 06  LDX $06d2
  $C977: E0 CD     CPX #$cd
  $C979: E0 0E     CPX #$0e
  $C97B: 08        PHP
  $C97C: 08        PHP
  $C97D: B2        ???
  $C97E: D7 08     DCP $08,X
  $C980: C5 D7     CMP $d7
  $C982: E0 0D     CPX #$0d
  $C984: 08        PHP
  $C985: 08        PHP
  $C986: CE D7 E0  DEC $e0d7
  $C989: 0B 08     ANC #$08
  $C98B: 08        PHP
  $C98C: DF D7 08  DCP $08d7,X
  $C98F: E7 D7     ISB $d7
  $C991: E0 0D     CPX #$0d
  $C993: 08        PHP
  $C994: 08        PHP
  $C995: F7 D7     ISB $d7,X
  $C997: E0 0D     CPX #$0d
  $C999: 08        PHP
  $C99A: 08        PHP
  $C99B: FF D7 E0  ISB $e0d7,X
  $C99E: 0D 08 08  ORA $0808
  $C9A1: 0E D8 E0  ASL $e0d8
  $C9A4: 0F 08 08  SLO $0808
  $C9A7: 21 D8     AND ($d8,X)
  $C9A9: 08        PHP
  $C9AA: 29 D8     AND #$d8
  $C9AC: 08        PHP
  $C9AD: 39 D8 E0  AND $e0d8,Y
  $C9B0: 0F 08 08  SLO $0808
  $C9B3: 42        ???
  $C9B4: D8        CLD
  $C9B5: 08        PHP
  $C9B6: 4D D8 08  EOR $08d8
  $C9B9: 5C D8 E0  NOP $e0d8,X
  $C9BC: 0E 08 08  ASL $0808
  $C9BF: 67 D8     RRA $d8
  $C9C1: 08        PHP
  $C9C2: 75 D8     ADC $d8,X
  $C9C4: E0 0D     CPX #$0d
  $C9C6: 08        PHP
  $C9C7: 08        PHP
  $C9C8: 7A        NOP
  $C9C9: D8        CLD
  $C9CA: E0 0E     CPX #$0e
  $C9CC: 08        PHP
  $C9CD: 08        PHP
  $C9CE: 88        DEY
  $C9CF: D8        CLD
  $C9D0: 08        PHP
  $C9D1: 90 D8     BCC $c9ab
  $C9D3: E0 0E     CPX #$0e
  $C9D5: 08        PHP
  $C9D6: 08        PHP
  $C9D7: BB D8 08  LAS $08d8,Y
  $C9DA: C3 D8     DCP ($d8,X)
  $C9DC: E0 0D     CPX #$0d
  $C9DE: 08        PHP
  $C9DF: 08        PHP
  $C9E0: B8        CLV
  $C9E1: DA        NOP
  $C9E2: E0 0E     CPX #$0e
  $C9E4: 08        PHP
  $C9E5: 08        PHP
  $C9E6: 9D D8 08  STA $08d8,X
  $C9E9: A8        TAY
  $C9EA: D8        CLD
  $C9EB: E0 0E     CPX #$0e
  $C9ED: 08        PHP
  $C9EE: 08        PHP
  $C9EF: 9D D9 08  STA $08d9,X
  $C9F2: B0 D9     BCS $c9cd
  $C9F4: E0 0D     CPX #$0d
  $C9F6: 08        PHP
  $C9F7: 08        PHP
  $C9F8: C5 DA     CMP $da
  $C9FA: E0 0D     CPX #$0d
  $C9FC: 08        PHP
  $C9FD: 08        PHP
  $C9FE: D1 D8     CMP ($d8),Y
  $CA00: E0 0A     CPX #$0a
  $CA02: 08        PHP
  $CA03: 08        PHP
  $CA04: E0 D8     CPX #$d8
  $CA06: E0 0D     CPX #$0d
  $CA08: 08        PHP
  $CA09: 08        PHP
  $CA0A: EC D8 E0  CPX $e0d8
  $CA0D: 0D 08 08  ORA $0808
  $CA10: D5 DA     CMP $da,X
  $CA12: E0 0E     CPX #$0e
  $CA14: 08        PHP
  $CA15: 08        PHP
  $CA16: FF D8 08  ISB $08d8,X
  $CA19: 06 D9     ASL $d9
  $CA1B: E0 0E     CPX #$0e
  $CA1D: 08        PHP
  $CA1E: 08        PHP
  $CA1F: 19 D9 08  ORA $08d9,Y
  $CA22: 28        PLP
  $CA23: D9 E0 0D  CMP $0de0,Y
  $CA26: 08        PHP
  $CA27: 08        PHP
  $CA28: 3A        NOP
  $CA29: D9 E0 0A  CMP $0ae0,Y
  $CA2C: 08        PHP
  $CA2D: 08        PHP
  $CA2E: 47 D9     SRE $d9
  $CA30: E0 0E     CPX #$0e
  $CA32: 08        PHP
  $CA33: 08        PHP
  $CA34: 56 D9     LSR $d9,X
  $CA36: 08        PHP
  $CA37: 66 D9     ROR $d9
  $CA39: E0 0D     CPX #$0d
  $CA3B: 08        PHP
  $CA3C: 08        PHP
  $CA3D: 75 D9     ADC $d9,X
  $CA3F: E0 0D     CPX #$0d
  $CA41: 08        PHP
  $CA42: 08        PHP
  $CA43: 85 D9     STA $d9
  $CA45: E0 0D     CPX #$0d
  $CA47: 08        PHP
  $CA48: 08        PHP
  $CA49: 90 D9     BCC $ca24
  $CA4B: E0 0A     CPX #$0a
  $CA4D: 08        PHP
  $CA4E: 08        PHP
  $CA4F: B8        CLV
  $CA50: D9 E0 0E  CMP $0ee0,Y
  $CA53: 08        PHP
  $CA54: 08        PHP
  $CA55: CB D9     AXS #$d9
  $CA57: 08        PHP
  $CA58: DE D9 E0  DEC $e0d9,X
  $CA5B: 0E 08 08  ASL $0808
  $CA5E: E8        INX
  $CA5F: D9 08 F1  CMP $f108,Y
  $CA62: D9 E0 0D  CMP $0de0,Y
  $CA65: 08        PHP
  $CA66: 08        PHP
  $CA67: 01 DA     ORA ($da,X)
  $CA69: E0 0D     CPX #$0d
  $CA6B: 08        PHP
  $CA6C: 08        PHP
  $CA6D: 12        ???
  $CA6E: DA        NOP
  $CA6F: E0 0D     CPX #$0d
  $CA71: 08        PHP
  $CA72: 08        PHP
  $CA73: 1E DA E0  ASL $e0da,X
  $CA76: 0A        ASL A
  $CA77: 08        PHP
  $CA78: 08        PHP
  $CA79: 2F DA E0  RLA $e0da
  $CA7C: 0E 08 08  ASL $0808
  $CA7F: 39 DA 08  AND $08da,Y
  $CA82: 49 DA     EOR #$da
  $CA84: E0 0E     CPX #$0e
  $CA86: 08        PHP
  $CA87: 08        PHP
  $CA88: 4E DA 08  LSR $08da
  $CA8B: 5F DA E0  SRE $e0da,X
  $CA8E: 0E 08 08  ASL $0808
  $CA91: 6D DA 08  ADC $08da
  $CA94: 7B DA E0  RRA $e0da,Y
  $CA97: 0D 08 08  ORA $0808
  $CA9A: 86 DA     STX $da
  $CA9C: E0 0A     CPX #$0a
  $CA9E: 08        PHP
  $CA9F: 08        PHP
  $CAA0: 7A        NOP
  $CAA1: D0 E0     BNE $ca83
  $CAA3: 0A        ASL A
  $CAA4: 08        PHP
  $CAA5: 08        PHP
  $CAA6: 89 D0     NOP #$d0
  $CAA8: E0 0D     CPX #$0d
  $CAAA: 08        PHP
  $CAAB: 08        PHP
  $CAAC: 93 DA     ??? ($da),Y
  $CAAE: E0 0E     CPX #$0e
  $CAB0: 08        PHP
  $CAB1: 08        PHP
  $CAB2: 9E DA 08  SHX $08da,Y
  $CAB5: AA        TAX
  $CAB6: DA        NOP
  $CAB7: E0 0A     CPX #$0a
  $CAB9: 08        PHP
  $CABA: 08        PHP
  $CABB: E2 DA     NOP #$da
  $CABD: E0 0D     CPX #$0d
  $CABF: 08        PHP
  $CAC0: 08        PHP
  $CAC1: F5 DA     SBC $da,X
  $CAC3: E0 0D     CPX #$0d
  $CAC5: 08        PHP
  $CAC6: 08        PHP
  $CAC7: 03 DB     SLO ($db,X)
  $CAC9: E0 0D     CPX #$0d
  $CACB: 08        PHP
  $CACC: 08        PHP
  $CACD: 24 D0     BIT $d0
  $CACF: E0 0D     CPX #$0d
  $CAD1: 08        PHP
  $CAD2: 08        PHP
  $CAD3: 0E DB E0  ASL $e0db
  $CAD6: 0D 08 08  ORA $0808
  $CAD9: 16 DB     ASL $db,X
  $CADB: E0 05     CPX #$05
  $CADD: 01 02     ORA ($02,X)
  $CADF: 2E DB 02  ROL $02db
  $CAE2: 6D CD E0  ADC $e0cd
  $CAE5: 06 01     ASL $01
  $CAE7: 02        ???
  $CAE8: 6D D0 02  ADC $02d0
  $CAEB: 2E DB 02  ROL $02db
  $CAEE: 31 DB     AND ($db),Y
  $CAF0: E0 07     CPX #$07
  $CAF2: 01 02     ORA ($02,X)
  $CAF4: 6D D0 FF  ADC $ffd0
  $CAF7: E7 CA     ISB $ca
  $CAF9: 07 01     SLO $01
  $CAFB: 02        ???
  $CAFC: 6D D0 02  ADC $02d0
  $CAFF: 6D D0 02  ADC $02d0
  $CB02: 42        ???
  $CB03: DB 02 46  DCP $4602,Y
  $CB06: DB E0 05  DCP $05e0,Y
  $CB09: 01 02     ORA ($02,X)
  $CB0B: 28        PLP
  $CB0C: CD 02 52  CMP $5202
  $CB0F: DB E0 06  DCP $06e0,Y
  $CB12: 01 02     ORA ($02,X)
  $CB14: 2B CD     ANC #$cd
  $CB16: 02        ???
  $CB17: 42        ???
  $CB18: DB 02 5A  DCP $5a02,Y
  $CB1B: DB E0 06  DCP $06e0,Y
  $CB1E: 01 02     ORA ($02,X)
  $CB20: 65 DB     ADC $db
  $CB22: 02        ???
  $CB23: 03 CD     SLO ($cd,X)
  $CB25: 02        ???
  $CB26: 6A        ROR A
  $CB27: DB E0 05  DCP $05e0,Y
  $CB2A: 01 02     ORA ($02,X)
  $CB2C: 65 DB     ADC $db
  $CB2E: 02        ???
  $CB2F: 76 DB     ROR $db,X
  $CB31: E0 05     CPX #$05
  $CB33: 01 02     ORA ($02,X)
  $CB35: 28        PLP
  $CB36: CD 02 A9  CMP $a902
  $CB39: DB E0 05  DCP $05e0,Y
  $CB3C: 01 02     ORA ($02,X)
  $CB3E: 28        PLP
  $CB3F: CD 02 B6  CMP $b602
  $CB42: DB E0 06  DCP $06e0,Y
  $CB45: 01 02     ORA ($02,X)
  $CB47: 84 DB     STY $db
  $CB49: 02        ???
  $CB4A: 6D D0 02  ADC $02d0
  $CB4D: 8D DB E0  STA $e0db
  $CB50: 07 01     SLO $01
  $CB52: 02        ???
  $CB53: 84 DB     STY $db
  $CB55: 02        ???
  $CB56: 6D D0 FF  ADC $ffd0
  $CB59: 49 CB     EOR #$cb
  $CB5B: 07 01     SLO $01
  $CB5D: 02        ???
  $CB5E: 6D D0 02  ADC $02d0
  $CB61: 6D D0 02  ADC $02d0
  $CB64: 42        ???
  $CB65: DB 02 9E  DCP $9e02,Y
  $CB68: DB E0 05  DCP $05e0,Y
  $CB6B: 01 10     ORA ($10,X)
  $CB6D: 01 CD     ORA ($cd,X)
  $CB6F: 08        PHP
  $CB70: C4 DB     CPY $db
  $CB72: E0 0D     CPX #$0d
  $CB74: 08        PHP
  $CB75: 10 F5     BPL $cb6c
  $CB77: DB E0 01  DCP $01e0,Y
  $CB7A: 01 08     ORA ($08,X)
  $CB7C: 01 CD     ORA ($cd,X)
  $CB7E: 14 03     NOP $03,X
  $CB80: DC E0 0E  NOP $0ee0,X
  $CB83: 08        PHP
  $CB84: 08        PHP
  $CB85: 12        ???
  $CB86: DC 10 22  NOP $2210,X
  $CB89: DC E0 40  NOP $40e0,X
  $CB8C: 08        PHP
  $CB8D: 09 08     ORA #$08
  $CB8F: F0 EF     BEQ $cb80
  $CB91: D6 F0     DEC $f0,X
  $CB93: EF D6 00  ISB $00d6
  $CB96: 00        BRK
  $CB97: 08        PHP
  $CB98: 30 DC     BMI $cb76
  $CB9A: 01 03     ORA ($03,X)
  $CB9C: 08        PHP
  $CB9D: 3D DC 14  AND $14dc,X
  $CBA0: 48        PHA
  $CBA1: DC 00 08  NOP $0800,X
  $CBA4: 30 EF     BMI $cb95
  $CBA6: D6 08     DEC $08,X
  $CBA8: 08        PHP
  $CBA9: 80 EF     NOP #$ef
  $CBAB: D6 09     DEC $09,X
  $CBAD: 07 40     SLO $40
  $CBAF: FA        NOP
  $CBB0: CD 80 FA  CMP $fa80
  $CBB3: CD 09 07  CMP $0709
  $CBB6: 40        RTI
  $CBB7: FA        NOP
  $CBB8: CD 80 07  CMP $0780
  $CBBB: CE 09 07  DEC $0709
  $CBBE: 40        RTI
  $CBBF: FA        NOP
  $CBC0: CD 80 FA  CMP $fa80
  $CBC3: CD 09 07  CMP $0709
  $CBC6: 40        RTI
  $CBC7: FA        NOP
  $CBC8: CD 80 07  CMP $0780
  $CBCB: CE 01 03  DEC $0301
  $CBCE: 08        PHP
  $CBCF: 9D CF C8  STA $c8cf,X
  $CBD2: A9 CF     LDA #$cf
  $CBD4: 09 07     ORA #$07
  $CBD6: 40        RTI
  $CBD7: FA        NOP
  $CBD8: CD 80 FA  CMP $fa80
  $CBDB: CD 09 07  CMP $0709
  $CBDE: 60        RTS
  $CBDF: FA        NOP
  $CBE0: CD A0 07  CMP $07a0
  $CBE3: CE 05 04  DEC $0405
  $CBE6: 01 B1     ORA ($b1,X)
  $CBE8: CF 01 B1  DCP $b101
  $CBEB: CF 04 04  DCP $0404
  $CBEE: 18        CLC
  $CBEF: BB CF 60  LAS $60cf,Y
  $CBF2: E4 CB     CPX $cb
  $CBF4: 06 02     ASL $02
  $CBF6: 01 01     ORA ($01,X)
  $CBF8: CD 04 5A  CMP $5a04
  $CBFB: DC 02 5D  NOP $5d02,X
  $CBFE: DC E0 0D  NOP $0de0,X
  $CC01: 08        PHP
  $CC02: 18        CLC
  $CC03: 69 DC     ADC #$dc
  $CC05: E0 0E     CPX #$0e
  $CC07: 08        PHP
  $CC08: 01 F0     ORA ($f0,X)
  $CC0A: D3 08     DCP ($08),Y
  $CC0C: 74 D2     NOP $d2,X
  $CC0E: E0 01     CPX #$01
  $CC10: 03 08     SLO ($08,X)
  $CC12: B3 CD     LAX ($cd),Y
  $CC14: 08        PHP
  $CC15: BB CD E0  LAS $e0cd,Y
  $CC18: 01 04     ORA ($04,X)
  $CC1A: 08        PHP
  $CC1B: C9 CD     CMP #$cd
  $CC1D: FF 14 CC  ISB $cc14,X
  $CC20: 01 01     ORA ($01,X)
  $CC22: 08        PHP
  $CC23: D1 CD     CMP ($cd),Y
  $CC25: 08        PHP
  $CC26: BB CD E0  LAS $e0cd,Y
  $CC29: 02        ???
  $CC2A: 05 08     ORA $08
  $CC2C: DE CD 08  DEC $08cd,X
  $CC2F: 04 CE     NOP $ce
  $CC31: 08        PHP
  $CC32: 15 CE     ORA $ce,X
  $CC34: E0 02     CPX #$02
  $CC36: 05 08     ORA $08
  $CC38: DE CD 08  DEC $08cd,X
  $CC3B: 3E CE 08  ROL $08ce,X
  $CC3E: 6F CE E0  RRA $e0ce
  $CC41: 02        ???
  $CC42: 05 08     ORA $08
  $CC44: DE CD 08  DEC $08cd,X
  $CC47: D6 CE     DEC $ce,X
  $CC49: FF 3D CC  ISB $cc3d,X
  $CC4C: 02        ???
  $CC4D: 05 08     ORA $08
  $CC4F: DE CD 08  DEC $08cd,X
  $CC52: DB CE FF  DCP $ffce,Y
  $CC55: 3D CC 01  AND $01cc,X
  $CC58: 05 08     ORA $08
  $CC5A: E3 CE     ISB ($ce,X)
  $CC5C: 08        PHP
  $CC5D: EF CE E0  ISB $e0ce
  $CC60: 04 05     NOP $05
  $CC62: 08        PHP
  $CC63: FB CE E0  ISB $e0ce,Y
  $CC66: 05 03     ORA $03
  $CC68: 08        PHP
  $CC69: 4E CF 08  LSR $08cf
  $CC6C: 58        CLI
  $CC6D: CF E0 02  DCP $02e0
  $CC70: 06 08     ASL $08
  $CC72: 70 CF     BVS $cc43
  $CC74: 08        PHP
  $CC75: 7A        NOP
  $CC76: CF FF 31  DCP $31ff
  $CC79: CC 02 06  CPY $0602
  $CC7C: 08        PHP
  $CC7D: 70 CF     BVS $cc4e
  $CC7F: 08        PHP
  $CC80: A0 D0     LDY #$d0
  $CC82: 08        PHP
  $CC83: 32        ???
  $CC84: D5 E0     CMP $e0,X
  $CC86: 02        ???
  $CC87: 01 08     ORA ($08,X)
  $CC89: 5A        NOP
  $CC8A: D7 08     DCP $08,X
  $CC8C: 68        PLA
  $CC8D: D7 08     DCP $08,X
  $CC8F: E2 D0     NOP #$d0
  $CC91: E0 06     CPX #$06
  $CC93: 02        ???
  $CC94: 08        PHP
  $CC95: 82 D7     NOP #$d7
  $CC97: 08        PHP
  $CC98: A9 D7     LDA #$d7
  $CC9A: 08        PHP
  $CC9B: 39 DB E0  AND $e0db,Y
  $CC9E: 0F 08 08  SLO $0808
  $CCA1: 91 DB     STA ($db),Y
  $CCA3: 08        PHP
  $CCA4: 95 DC     STA $dc,X
  $CCA6: 08        PHP
  $CCA7: A7 DC     LAX $dc
  $CCA9: E0 0D     CPX #$0d
  $CCAB: 08        PHP
  $CCAC: 08        PHP
  $CCAD: 77 D7     RRA $d7,X
  $CCAF: E0 0D     CPX #$0d
  $CCB1: 08        PHP
  $CCB2: 08        PHP
  $CCB3: 75 D8     ADC $d8,X
  $CCB5: E0 06     CPX #$06
  $CCB7: 01 01     ORA ($01,X)
  $CCB9: 17 CD     SLO $cd,X
  $CCBB: 04 39     NOP $39
  $CCBD: D7 01     DCP $01,X
  $CCBF: 3C D7 E0  NOP $e0d7,X
  $CCC2: 05 02     ORA $02
  $CCC4: 03 03     SLO ($03,X)
  $CCC6: CD 03 9E  CMP $9e03
  $CCC9: D7 E0     DCP $e0,X
  $CCCB: 05 02     ORA $02
  $CCCD: 01 17     ORA ($17,X)
  $CCCF: CD 04 95  CMP $9504
  $CCD2: CF E0 06  DCP $06e0
  $CCD5: 02        ???
  $CCD6: 01 D0     ORA ($d0,X)
  $CCD8: DB 02 DC  DCP $dc02,Y
  $CCDB: DB 02 E7  DCP $e702,Y
  $CCDE: DB E0 0F  DCP $0fe0,Y
  $CCE1: 02        ???
  $CCE2: 02        ???
  $CCE3: 88        DEY
  $CCE4: D8        CLD
  $CCE5: 02        ???
  $CCE6: 90 D8     BCC $ccc0
  $CCE8: 02        ???
  $CCE9: 98        TYA
  $CCEA: D8        CLD
  $CCEB: E0 0D     CPX #$0d
  $CCED: 02        ???
  $CCEE: 08        PHP
  $CCEF: 75 D8     ADC $d8,X
  $CCF1: E0 0D     CPX #$0d
  $CCF3: 02        ???
  $CCF4: 08        PHP
  $CCF5: 7A        NOP
  $CCF6: DC E0 01  NOP $01e0,X
  $CCF9: 02        ???
  $CCFA: 01 17     ORA ($17,X)
  $CCFC: CD 01 C5  CMP $c501
  $CCFF: CF E0 F2  DCP $f2e0
  $CD02: FF F2 18  ISB $18f2,X
  $CD05: FF F2 4F  ISB $4ff2,X
  $CD08: FF F2 15  ISB $15f2,X
  $CD0B: FF F2 15  ISB $15f2,X
  $CD0E: 3A        NOP
  $CD0F: 00        BRK
  $CD10: 0F 2E 12  SLO $122e
  $CD13: FF F2 2C  ISB $2cf2,X
  $CD16: FF F0 FF  ISB $fff0,X
  $CD19: F8        SED
  $CD1A: 63 2D     RRA ($2d,X)
  $CD1C: 12        ???
  $CD1D: 19 FF F0  ORA $f0ff,Y
  $CD20: 18        CLC
  $CD21: FF F0 18  ISB $18f0,X
  $CD24: 3A        NOP
  $CD25: FC 18 FF  NOP $ff18,X
  $CD28: F0 15     BEQ $cd3f
  $CD2A: FF F0 2C  ISB $2cf0,X
  $CD2D: FF FC 36  ISB $36fc,X
  $CD30: FF FD 36  ISB $36fd,X
  $CD33: FF FD 15  ISB $15fd,X
  $CD36: 01 2E     ORA ($2e,X)
  $CD38: 0F 36 FF  SLO $ff36
  $CD3B: FD 15 06  SBC $0615,X
  $CD3E: 0F 36 FF  SLO $ff36
  $CD41: 00        BRK
  $CD42: 01 12     ORA ($12,X)
  $CD44: 2C 3A 08  BIT $083a
  $CD47: 10 26     BPL $cd6f
  $CD49: 0B 0F     ANC #$0f
  $CD4B: 49 49     EOR #$49
  $CD4D: 36 FF     ROL $ff,X
  $CD4F: 00        BRK
  $CD50: 01 12     ORA ($12,X)
  $CD52: 2C 3A 1B  BIT $1b3a
  $CD55: 06 13     ASL $13
  $CD57: 63 0B     RRA ($0b,X)
  $CD59: 0F 49 49  SLO $4949
  $CD5C: 36 FF     ROL $ff,X
  $CD5E: 01 06     ORA ($06,X)
  $CD60: 04 01     NOP $01
  $CD62: 19 3A 25  ORA $253a,Y
  $CD65: 2B 1E     ANC #$1e
  $CD67: 2E 0F 49  ROL $490f
  $CD6A: 49 36     EOR #$36
  $CD6C: FF 06 0F  ISB $0f06,X
  $CD6F: 36 FF     ROL $ff,X
  $CD71: 01 06     ORA ($06,X)
  $CD73: 04 01     NOP $01
  $CD75: 22        ???
  $CD76: 3A        NOP
  $CD77: 25 2B     AND $2b
  $CD79: 1E 2E 12  ASL $122e,X
  $CD7C: 01 28     ORA ($28,X)
  $CD7E: 36 FF     ROL $ff,X
  $CD80: E7 48     ISB $48
  $CD82: A8        TAY
  $CD83: 2C 3A 13  BIT $133a
  $CD86: 26 29     ROL $29
  $CD88: 12        ???
  $CD89: 0B 1E     ANC #$1e
  $CD8B: 2E 0F 36  ROL $360f
  $CD8E: FF 02 1E  ISB $1e02,X
  $CD91: 07 16     SLO $16
  $CD93: 01 0F     ORA ($0f,X)
  $CD95: 36 FF     ROL $ff,X
  $CD97: 05 2A     ORA $2a
  $CD99: 02        ???
  $CD9A: 55 12     EOR $12,X
  $CD9C: 3A        NOP
  $CD9D: 16 01     ASL $01,X
  $CD9F: 0F 36 FF  SLO $ff36
  $CDA2: 05 2B     ORA $2b
  $CDA4: 0A        ASL A
  $CDA5: 29 0F     AND #$0f
  $CDA7: 2E 36 FF  ROL $ff36
  $CDAA: 06 2B     ASL $2b
  $CDAC: 5D 01 13  EOR $1301,X
  $CDAF: 09 2A     ORA #$2a
  $CDB1: 5C FF F4  NOP $f4ff,X
  $CDB4: 18        CLC
  $CDB5: 3A        NOP
  $CDB6: A7 48     LAX $48
  $CDB8: DD 5C FF  CMP $ff5c,X
  $CDBB: 09 02     ORA #$02
  $CDBD: 19 2D 0D  ORA $0d2d,Y
  $CDC0: 2D 2C 3A  AND $3a2c
  $CDC3: 20 05 03  JSR $0305
  $CDC6: 1E 0C FF  ASL $ff0c,X
  $CDC9: EE 18 3A  INC $3a18
  $CDCC: A7 48     LAX $48
  $CDCE: DD 5C FF  CMP $ff5c,X
  $CDD1: 0B 00     ANC #$00
  $CDD3: 01 19     ORA ($19,X)
  $CDD5: 3A        NOP
  $CDD6: 5D 02 12  EOR $1202,X
  $CDD9: 2D 18 1E  AND $1e18
  $CDDC: 1E FF F4  ASL $f4ff,X
  $CDDF: FF 09 67  ISB $6709,X
  $CDE2: 29 D9     AND #$d9
  $CDE4: 9E 15 3A  SHX $3a15,Y
  $CDE7: 14 2E     NOP $2e,X
  $CDE9: 0F 49 49  SLO $4949
  $CDEC: 36 FF     ROL $ff,X
  $CDEE: 53 02     SRE ($02),Y
  $CDF0: 01 2D     ORA ($2d,X)
  $CDF2: 14 FC     NOP $fc,X
  $CDF4: 36 FF     ROL $ff,X
  $CDF6: 0B 05     ANC #$05
  $CDF8: 0B FF     ANC #$ff
  $CDFA: 51 49     EOR ($49),Y
  $CDFC: 49 3A     EOR #$3a
  $CDFE: 51 49     EOR ($49),Y
  $CE00: 49 49     EOR #$49
  $CE02: 49 FF     EOR #$ff
  $CE04: EE 2C FF  INC $ff2c
  $CE07: 3A        NOP
  $CE08: 3A        NOP
  $CE09: 3A        NOP
  $CE0A: 0C 23 3A  NOP $3a23
  $CE0D: 0C 23 3A  NOP $3a23
  $CE10: 7F 7F 7F  RRA $7f7f,X
  $CE13: 7F FF 07  RRA $07ff,X
  $CE16: 59 0B 1E  EOR $1e0b,Y
  $CE19: 0B 0F     ANC #$0f
  $CE1B: 49 49     EOR #$49
  $CE1D: 36 FF     ROL $ff,X
  $CE1F: 59 4F 3A  EOR $3a4f,Y
  $CE22: 13 5D     SLO ($5d),Y
  $CE24: 05 14     ORA $14
  $CE26: 01 36     ORA ($36,X)
  $CE28: FF 16 05  ISB $0516,X
  $CE2B: 0D 14 01  ORA $0114
  $CE2E: 36 FF     ROL $ff,X
  $CE30: 16 08     ASL $08,X
  $CE32: 14 01     NOP $01,X
  $CE34: 36 FF     ROL $ff,X
  $CE36: 16 09     ASL $09,X
  $CE38: 02        ???
  $CE39: 13 0C     SLO ($0c),Y
  $CE3B: 28        PLP
  $CE3C: 36 FF     ROL $ff,X
  $CE3E: E6 8C     INC $8c
  $CE40: 93 46     ??? ($46),Y
  $CE42: FF 19 55  ISB $5519,X
  $CE45: 06 13     ASL $13
  $CE47: 63 0A     RRA ($0a,X)
  $CE49: 29 0F     AND #$0f
  $CE4B: 49 49     EOR #$49
  $CE4D: 36 FF     ROL $ff,X
  $CE4F: 19 55 06  ORA $0655,Y
  $CE52: 13 63     SLO ($63),Y
  $CE54: 0A        ASL A
  $CE55: 29 0F     AND #$0f
  $CE57: 65 2D     ADC $2d
  $CE59: FF 19 55  ISB $5519,X
  $CE5C: 06 13     ASL $13
  $CE5E: 63 0B     RRA ($0b,X)
  $CE60: 0F 49 49  SLO $4949
  $CE63: 36 FF     ROL $ff,X
  $CE65: 19 55 06  ORA $0655,Y
  $CE68: 13 63     SLO ($63),Y
  $CE6A: 0B 0F     ANC #$0f
  $CE6C: 65 2D     ADC $2d
  $CE6E: FF 0B 2D  ISB $2d0b,X
  $CE71: 0B 30     ANC #$30
  $CE73: 11 59     ORA ($59),Y
  $CE75: 49 49     EOR #$49
  $CE77: 36 FF     ROL $ff,X
  $CE79: 1B 06 13  SLO $1306,Y
  $CE7C: 63 0A     RRA ($0a,X)
  $CE7E: 29 0F     AND #$0f
  $CE80: 49 49     EOR #$49
  $CE82: 36 FF     ROL $ff,X
  $CE84: 1B 06 13  SLO $1306,Y
  $CE87: 63 0B     RRA ($0b,X)
  $CE89: 0F 49 49  SLO $4949
  $CE8C: 36 FF     ROL $ff,X
  $CE8E: 20 05 2E  JSR $2e05
  $CE91: 12        ???
  $CE92: 3A        NOP
  $CE93: 01 2E     ORA ($2e,X)
  $CE95: 0F 36 FF  SLO $ff36
  $CE98: 20 05 2E  JSR $2e05
  $CE9B: 12        ???
  $CE9C: 06 0F     ASL $0f
  $CE9E: 36 FF     ROL $ff,X
  $CEA0: 85 AE     STA $ae
  $CEA2: 93 15     ??? ($15),Y
  $CEA4: 3A        NOP
  $CEA5: 01 2E     ORA ($2e,X)
  $CEA7: 0F 36 FF  SLO $ff36
  $CEAA: 85 AE     STA $ae
  $CEAC: 93 15     ??? ($15),Y
  $CEAE: 06 0F     ASL $0f
  $CEB0: 36 FF     ROL $ff,X
  $CEB2: 85 E6     STA $e6
  $CEB4: 2C 3A 08  BIT $083a
  $CEB7: 10 26     BPL $cedf
  $CEB9: 0B 0F     ANC #$0f
  $CEBB: 49 49     EOR #$49
  $CEBD: 36 FF     ROL $ff,X
  $CEBF: EF 0A 0D  ISB $0d0a
  $CEC2: 14 01     NOP $01,X
  $CEC4: 36 FF     ROL $ff,X
  $CEC6: EF 5C 06  ISB $065c
  $CEC9: 14 01     NOP $01,X
  $CECB: 36 FF     ROL $ff,X
  $CECD: 8C 86 2C  STY $2c86
  $CED0: 11 01     ORA ($01),Y
  $CED2: 12        ???
  $CED3: FF F1 FF  ISB $fff1,X
  $CED6: E6 8C     INC $8c
  $CED8: 93 42     ??? ($42),Y
  $CEDA: FF 08 2E  ISB $2e08,X
  $CEDD: 0B 31     ANC #$31
  $CEDF: 02        ???
  $CEE0: 0D 2D FF  ORA $ff2d
  $CEE3: 1E 0A 15  ASL $150a,X
  $CEE6: 39 39 3A  AND $3a39,Y
  $CEE9: 19 07 17  ORA $1707,Y
  $CEEC: 11 18     ORA ($18),Y
  $CEEE: FF 21 01  ISB $0121,X
  $CEF1: 0B 31     ANC #$31
  $CEF3: 02        ???
  $CEF4: 65 3A     ADC $3a
  $CEF6: 5C 0B 0F  NOP $0f0b,X
  $CEF9: 36 FF     ROL $ff,X
  $CEFB: F4 3A     NOP $3a,X
  $CEFD: 24 02     BIT $02
  $CEFF: 0B 31     ANC #$31
  $CF01: 02        ???
  $CF02: 59 36 FF  EOR $ff36,Y
  $CF05: E7 48     ISB $48
  $CF07: A8        TAY
  $CF08: 15 3A     ORA $3a,X
  $CF0A: 20 05 2E  JSR $2e05
  $CF0D: 12        ???
  $CF0E: 01 2E     ORA ($2e,X)
  $CF10: 0F 36 FF  SLO $ff36
  $CF13: E7 48     ISB $48
  $CF15: A8        TAY
  $CF16: 15 3A     ORA $3a,X
  $CF18: 20 05 2E  JSR $2e05
  $CF1B: 12        ???
  $CF1C: 06 0F     ASL $0f
  $CF1E: 36 FF     ROL $ff,X
  $CF20: E7 48     ISB $48
  $CF22: A8        TAY
  $CF23: 19 3A 19  ORA $193a,Y
  $CF26: 55 05     EOR $05,X
  $CF28: 29 12     AND #$12
  $CF2A: FF E7 48  ISB $48e7,X
  $CF2D: A8        TAY
  $CF2E: 2C 3A 13  BIT $133a
  $CF31: 2E 0F 36  ROL $360f
  $CF34: FF E7 48  ISB $48e7,X
  $CF37: A8        TAY
  $CF38: 2C 3A 13  BIT $133a
  $CF3B: 26 29     ROL $29
  $CF3D: 12        ???
  $CF3E: 0B 1E     ANC #$1e
  $CF40: 2E 0F 36  ROL $360f
  $CF43: FF E7 48  ISB $48e7,X
  $CF46: A8        TAY
  $CF47: 2C 3A 85  BIT $853a
  $CF4A: AE 93 36  LDX $3693
  $CF4D: FF 14 2D  ISB $2d14,X
  $CF50: 05 11     ORA $11
  $CF52: 3A        NOP
  $CF53: 13 02     SLO ($02),Y
  $CF55: 1D 02 FF  ORA $ff02,X
  $CF58: 5D 02 55  EOR $5502,X
  $CF5B: 24 02     BIT $02
  $CF5D: 0B 31     ANC #$31
  $CF5F: 02        ???
  $CF60: 59 36 FF  EOR $ff36,Y
  $CF63: E7 48     ISB $48
  $CF65: A8        TAY
  $CF66: 2C 3A 85  BIT $853a
  $CF69: AE 93 15  LDX $1593
  $CF6C: 06 0F     ASL $0f
  $CF6E: 36 FF     ROL $ff,X
  $CF70: F4 3A     NOP $3a,X
  $CF72: 23 65     RLA ($65,X)
  $CF74: 29 28     AND #$28
  $CF76: 49 49     EOR #$49
  $CF78: 36 FF     ROL $ff,X
  $CF7A: EE 3A F4  INC $f43a
  $CF7D: 2C FF 3A  BIT $3aff
  $CF80: 3A        NOP
  $CF81: 3A        NOP
  $CF82: 3A        NOP
  $CF83: 3A        NOP
  $CF84: 02        ???
  $CF85: 2E 36 FF  ROL $ff36
  $CF88: 3A        NOP
  $CF89: 3A        NOP
  $CF8A: 3A        NOP
  $CF8B: E8        INX
  $CF8C: 8C 5C 06  STY $065c
  $CF8F: 14 01     NOP $01,X
  $CF91: 36 FF     ROL $ff,X
  $CF93: F5 FF     SBC $ff,X
  $CF95: 19 56 0B  ORA $0b56,Y
  $CF98: 0F 49 49  SLO $4949
  $CF9B: 36 FF     ROL $ff,X
  $CF9D: 22        ???
  $CF9E: 02        ???
  $CF9F: 3A        NOP
  $CFA0: 19 55 21  ORA $2155,Y
  $CFA3: 25 02     AND $02
  $CFA5: 25 49     AND $49
  $CFA7: 49 FF     EOR #$ff
  $CFA9: 3A        NOP
  $CFAA: 3A        NOP
  $CFAB: 3A        NOP
  $CFAC: 90 B2     BCC $cf60
  $CFAE: AE 36 FF  LDX $ff36
  $CFB1: 3A        NOP
  $CFB2: 3A        NOP
  $CFB3: 01 55     ORA ($55,X)
  $CFB5: 2B 28     ANC #$28
  $CFB7: 2E 36 36  ROL $3636
  $CFBA: FF 3A 3A  ISB $3a3a,X
  $CFBD: 3A        NOP
  $CFBE: 81 AD     STA ($ad,X)
  $CFC0: 90 86     BCC $cf48
  $CFC2: 36 36     ROL $36,X
  $CFC4: FF E8 8C  ISB $8ce8,X
  $CFC7: 36 36     ROL $36,X
  $CFC9: FF 0A 00  ISB $000a,X
  $CFCC: 3A        NOP
  $CFCD: 0B 00     ANC #$00
  $CFCF: 01 05     ORA ($05,X)
  $CFD1: 01 0B     ORA ($0b,X)
  $CFD3: 5C 0C 36  NOP $360c,X
  $CFD6: FF 0D 01  ISB $010d,X
  $CFD9: 06 18     ASL $18
  $CFDB: 3A        NOP
  $CFDC: 86 AE     STX $ae
  $CFDE: 87 84     SAX $84
  $CFE0: 9B 5C 0C  TAS $0c5c,Y
  $CFE3: 36 FF     ROL $ff,X
  $CFE5: F5 18     SBC $18,X
  $CFE7: 3A        NOP
  $CFE8: 86 AE     STX $ae
  $CFEA: 87 84     SAX $84
  $CFEC: 9B 05 26  TAS $2605,Y
  $CFEF: FF 0B 00  ISB $000b,X
  $CFF2: 01 05     ORA ($05,X)
  $CFF4: 01 0B     ORA ($0b,X)
  $CFF6: 5C 0C 36  NOP $360c,X
  $CFF9: FF 0A 00  ISB $000a,X
  $CFFC: 3A        NOP
  $CFFD: 09 02     ORA #$02
  $CFFF: 19 2D 0D  ORA $0d2d,Y
  $D002: 2D 18 FF  AND $ff18
  $D005: 8C 8F 48  STY $488f
  $D008: 93 5C     ??? ($5c),Y
  $D00A: 0C 36 FF  NOP $ff36
  $D00D: 03 2D     SLO ($2d,X)
  $D00F: 10 31     BPL $d042
  $D011: 02        ???
  $D012: 0D 2D 18  ORA $182d
  $D015: FF 03 2D  ISB $2d03,X
  $D018: 10 31     BPL $d04b
  $D01A: 02        ???
  $D01B: 0D 2D 3A  ORA $3a2d
  $D01E: 09 02     ORA #$02
  $D020: 19 2D 18  ORA $182d,Y
  $D023: FF 0A 0C  ISB $0c0a,X
  $D026: 4F 3A FE  SRE $fe3a
  $D029: 13 07     SLO ($07),Y
  $D02B: 2D 36 FF  AND $ff36
  $D02E: F5 18     SBC $18,X
  $D030: FF 86 AE  ISB $ae86,X
  $D033: 87 84     SAX $84
  $D035: 9B 5C 0C  TAS $0c5c,Y
  $D038: 36 FF     ROL $ff,X
  $D03A: 04 49     NOP $49
  $D03C: 49 2E     EOR #$2e
  $D03E: 13 3A     SLO ($3a),Y
  $D040: 19 2D 0E  ORA $0e2d,Y
  $D043: 07 59     SLO $59
  $D045: 49 49     EOR #$49
  $D047: 36 FF     ROL $ff,X
  $D049: F5 15     SBC $15,X
  $D04B: FF EB 94  ISB $94eb,X
  $D04E: A8        TAY
  $D04F: 92        ???
  $D050: B3 48     LAX ($48),Y
  $D052: 86 AE     STX $ae
  $D054: 87 4F     SAX $4f
  $D056: FF 00 0F  ISB $0f00,X
  $D059: 03 26     SLO ($26,X)
  $D05B: 29 1E     AND #$1e
  $D05D: 0C 36 36  NOP $3636
  $D060: FF 86 AE  ISB $ae86,X
  $D063: 85 48     STA $48
  $D065: 19 FF F0  ORA $f0ff,Y
  $D068: 59 49 49  EOR $4949,Y
  $D06B: 36 FF     ROL $ff,X
  $D06D: F3 FF     ISB ($ff),Y
  $D06F: EB 94     SBC #$94
  $D071: A8        TAY
  $D072: 92        ???
  $D073: B3 48     LAX ($48),Y
  $D075: 86 AE     STX $ae
  $D077: 87 36     SAX $36
  $D079: FF 04 29  ISB $2904,X
  $D07C: 18        CLC
  $D07D: 3A        NOP
  $D07E: EF 2C 3A  ISB $3a2c
  $D081: 13 21     SLO ($21),Y
  $D083: 12        ???
  $D084: 1F 2A 36  SLO $362a,X
  $D087: 36 FF     ROL $ff,X
  $D089: 3A        NOP
  $D08A: 39 39 39  AND $3939,Y
  $D08D: 3A        NOP
  $D08E: 00        BRK
  $D08F: 26 2E     ROL $2e
  $D091: 3A        NOP
  $D092: 39 39 FF  AND $ff39,Y
  $D095: 06 1E     ASL $1e
  $D097: 2E 0F 36  ROL $360f
  $D09A: 3A        NOP
  $D09B: D3 48     DCP ($48),Y
  $D09D: A8        TAY
  $D09E: 36 FF     ROL $ff,X
  $D0A0: 20 55 31  JSR $3155
  $D0A3: 02        ???
  $D0A4: 15 22     ORA $22,X
  $D0A6: 3A        NOP
  $D0A7: 7E 75 4F  ROR $4f75,X
  $D0AA: 2E 0D 2D  ROL $2d0d
  $D0AD: 5C FF 0B  NOP $0bff,X
  $D0B0: 00        BRK
  $D0B1: 01 0B     ORA ($0b,X)
  $D0B3: 30 02     BMI $d0b7
  $D0B5: 27 31     RLA $31
  $D0B7: 02        ???
  $D0B8: 36 FF     ROL $ff,X
  $D0BA: 27 31     RLA $31
  $D0BC: 02        ???
  $D0BD: 90 48     BCC $d107
  $D0BF: A0 FF     LDY #$ff
  $D0C1: 25 07     AND $07
  $D0C3: 0F 0F 05  SLO $050f
  $D0C6: 01 1E     ORA ($1e,X)
  $D0C8: 0B 0F     ANC #$0f
  $D0CA: 4F FF 5D  SRE $5dff
  $D0CD: 02        ???
  $D0CE: 12        ???
  $D0CF: 2D 18 1E  AND $1e18
  $D0D2: 1E 39 39  ASL $3939,X
  $D0D5: FF 0B 31  ISB $310b,X
  $D0D8: 02        ???
  $D0D9: 65 19     ADC $19
  $D0DB: 3A        NOP
  $D0DC: 7E 75 0D  ROR $0d75,X
  $D0DF: 2D 15 FF  AND $ff15
  $D0E2: 24 59     BIT $59
  $D0E4: 17 26     SLO $26,X
  $D0E6: 29 1E     AND #$1e
  $D0E8: 0C FF 05  NOP $05ff
  $D0EB: 07 90     SLO $90
  $D0ED: 48        PHA
  $D0EE: A0 3A     LDY #$3a
  $D0F0: 43 21     SRE ($21,X)
  $D0F2: 01 18     ORA ($18,X)
  $D0F4: FF 59 01  ISB $0159,X
  $D0F7: 1A        NOP
  $D0F8: 31 02     AND ($02),Y
  $D0FA: 0D 2D 0B  ORA $0b2d
  $D0FD: 30 15     BMI $d114
  $D0FF: 3A        NOP
  $D100: 25 2E     AND $2e
  $D102: 12        ???
  $D103: FF 09 02  ISB $0209,X
  $D106: 53 15     SRE ($15),Y
  $D108: 08        PHP
  $D109: 26 29     ROL $29
  $D10B: 28        PLP
  $D10C: 3A        NOP
  $D10D: 7E 75 0D  ROR $0d75,X
  $D110: 2D FF 0E  AND $0eff
  $D113: 29 5C     AND #$5c
  $D115: 22        ???
  $D116: 3A        NOP
  $D117: 0B 31     ANC #$31
  $D119: 02        ???
  $D11A: 65 4F     ADC $4f
  $D11C: FF 11 05  ISB $0511,X
  $D11F: 14 01     NOP $01,X
  $D121: 13 06     SLO ($06),Y
  $D123: 15 19     ORA $19,X
  $D125: FF 0A 26  ISB $260a,X
  $D128: 15 3A     ORA $3a,X
  $D12A: 1A        NOP
  $D12B: 13 27     SLO ($27),Y
  $D12D: 5B 11 04  SRE $0411,Y
  $D130: 09 14     ORA #$14
  $D132: 01 FF     ORA ($ff,X)
  $D134: 5D 10 26  EOR $2610,X
  $D137: 05 4F     ORA $4f
  $D139: 3A        NOP
  $D13A: 19 56 0C  ORA $0c56,Y
  $D13D: 1E 5C FF  ASL $ff5c,X
  $D140: 11 5B     ORA ($5b),Y
  $D142: 08        PHP
  $D143: 26 29     ROL $29
  $D145: 1E 0C FF  ASL $ff0c,X
  $D148: 0A        ASL A
  $D149: 00        BRK
  $D14A: 3A        NOP
  $D14B: 09 29     ORA #$29
  $D14D: 25 27     AND $27
  $D14F: FF 7E 75  ISB $757e,X
  $D152: 0D 2D 15  ORA $152d
  $D155: 3A        NOP
  $D156: 19 01 27  ORA $2701,Y
  $D159: 1E 0C FF  ASL $ff0c,X
  $D15C: F0 5C     BEQ $d1ba
  $D15E: 0C 36 FF  NOP $ff36
  $D161: 11 50     ORA ($50),Y
  $D163: 19 3A F5  ORA $f53a,Y
  $D166: FF F0 18  ISB $18f0,X
  $D169: 3A        NOP
  $D16A: 7E 75 5C  ROR $5c75,X
  $D16D: 0C 36 FF  NOP $ff36
  $D170: 09 29     ORA #$29
  $D172: 05 26     ORA $26
  $D174: 19 FF 8A  ORA $8aff,Y
  $D177: DD AD DC  CMP $dcad,X
  $D17A: 8C 15 3A  STY $3a15
  $D17D: 14 27     NOP $27,X
  $D17F: 1E 0C 36  ASL $360c,X
  $D182: FF 5C 0F  ISB $0f5c,X
  $D185: 49 49     EOR #$49
  $D187: 36 FF     ROL $ff,X
  $D189: F7 36     ISB $36,X
  $D18B: FF 01 08  ISB $0801,X
  $D18E: 03 03     SLO ($03,X)
  $D190: 03 49     SLO ($49,X)
  $D192: 49 49     EOR #$49
  $D194: 49 49     EOR #$49
  $D196: 49 49     EOR #$49
  $D198: 49 49     EOR #$49
  $D19A: AE 36 36  LDX $3636
  $D19D: FF 02 04  ISB $0402,X
  $D1A0: B5 B5     LDA $b5,X
  $D1A2: 49 49     EOR #$49
  $D1A4: 49 49     EOR #$49
  $D1A6: 49 49     EOR #$49
  $D1A8: 49 49     EOR #$49
  $D1AA: 49 49     EOR #$49
  $D1AC: AE 36 36  LDX $3636
  $D1AF: FF 0E 04  ISB $040e,X
  $D1B2: 27 2F     RLA $2f
  $D1B4: 00        BRK
  $D1B5: 49 49     EOR #$49
  $D1B7: 49 49     EOR #$49
  $D1B9: 49 49     EOR #$49
  $D1BB: 49 49     EOR #$49
  $D1BD: 49 AE     EOR #$ae
  $D1BF: 36 36     ROL $36,X
  $D1C1: FF 5C 23  ISB $235c,X
  $D1C4: 00        BRK
  $D1C5: 49 49     EOR #$49
  $D1C7: 49 49     EOR #$49
  $D1C9: 49 49     EOR #$49
  $D1CB: 49 49     EOR #$49
  $D1CD: 49 49     EOR #$49
  $D1CF: 49 AE     EOR #$ae
  $D1D1: 36 36     ROL $36,X
  $D1D3: FF 02 04  ISB $0402,X
  $D1D6: 04 04     NOP $04
  $D1D8: 04 04     NOP $04
  $D1DA: 04 04     NOP $04
  $D1DC: 49 49     EOR #$49
  $D1DE: 49 49     EOR #$49
  $D1E0: 49 49     EOR #$49
  $D1E2: AE 36 36  LDX $3636
  $D1E5: FF 16 04  ISB $0416,X
  $D1E8: 04 04     NOP $04
  $D1EA: 04 04     NOP $04
  $D1EC: 04 04     NOP $04
  $D1EE: 49 49     EOR #$49
  $D1F0: 49 49     EOR #$49
  $D1F2: 49 49     EOR #$49
  $D1F4: AE 36 36  LDX $3636
  $D1F7: FF 3A 3A  ISB $3a3a,X
  $D1FA: 3A        NOP
  $D1FB: 3A        NOP
  $D1FC: 09 09     ORA #$09
  $D1FE: 59 36 3A  EOR $3a36,Y
  $D201: 07 26     SLO $26
  $D203: 03 2E     SLO ($2e,X)
  $D205: 36 FF     ROL $ff,X
  $D207: 3A        NOP
  $D208: 3A        NOP
  $D209: 3A        NOP
  $D20A: 3A        NOP
  $D20B: 3A        NOP
  $D20C: 3A        NOP
  $D20D: 78        SEI
  $D20E: 73 79     RRA ($79),Y
  $D210: 3A        NOP
  $D211: 36 FF     ROL $ff,X
  $D213: 3A        NOP
  $D214: 3A        NOP
  $D215: 3A        NOP
  $D216: 3A        NOP
  $D217: 3A        NOP
  $D218: 73 6D     RRA ($6d),Y
  $D21A: 77 77     RRA $77,X
  $D21C: 3A        NOP
  $D21D: 36 FF     ROL $ff,X
  $D21F: 3A        NOP
  $D220: 3A        NOP
  $D221: 3A        NOP
  $D222: 3A        NOP
  $D223: 3A        NOP
  $D224: 74 7C     NOP $7c,X
  $D226: 6D 6D 6D  ADC $6d6d
  $D229: 3A        NOP
  $D22A: 36 FF     ROL $ff,X
  $D22C: 3A        NOP
  $D22D: 3A        NOP
  $D22E: 3A        NOP
  $D22F: 3A        NOP
  $D230: 71 74     ADC ($74),Y
  $D232: 77 70     RRA $70,X
  $D234: 49 49     EOR #$49
  $D236: 49 49     EOR #$49
  $D238: 3A        NOP
  $D239: 36 FF     ROL $ff,X
  $D23B: 04 04     NOP $04
  $D23D: 2E 36 FF  ROL $ff36
  $D240: 55 13     EOR $13,X
  $D242: 02        ???
  $D243: 07 2D     SLO $2d
  $D245: 13 FF     SLO ($ff),Y
  $D247: 0F 10 63  SLO $6310
  $D24A: 14 06     NOP $06,X
  $D24C: 31 02     AND ($02),Y
  $D24E: 59 01 18  EOR $1801,Y
  $D251: 04 04     NOP $04
  $D253: 2B 54     ANC #$54
  $D255: FF 3A 3A  ISB $3a3a,X
  $D258: 3A        NOP
  $D259: 3A        NOP
  $D25A: 3A        NOP
  $D25B: 5C 0F 2E  NOP $2e0f,X
  $D25E: 36 FF     ROL $ff,X
  $D260: 0F 10 63  SLO $6310
  $D263: 14 06     NOP $06,X
  $D265: 31 02     AND ($02),Y
  $D267: 59 01 18  EOR $1801,Y
  $D26A: FF 91 81  ISB $8191,X
  $D26D: AD 8B B0  LDA $b08b
  $D270: 48        PHA
  $D271: 93 4F     ??? ($4f),Y
  $D273: FF 3A CF  ISB $cf3a,X
  $D276: AE 91 4F  LDX $4f91
  $D279: 3A        NOP
  $D27A: 0F 27 14  SLO $1427
  $D27D: 01 36     ORA ($36,X)
  $D27F: 36 FF     ROL $ff,X
  $D281: D3 48     DCP ($48),Y
  $D283: A8        TAY
  $D284: 2C 3A 1E  BIT $1e3a
  $D287: 22        ???
  $D288: 2E 0F 36  ROL $360f
  $D28B: FF EF 2C  ISB $2cef,X
  $D28E: 3A        NOP
  $D28F: 06 21     ASL $21
  $D291: 0A        ASL A
  $D292: 0D 14 01  ORA $0114
  $D295: 36 FF     ROL $ff,X
  $D297: F7 2C     ISB $2c,X
  $D299: FF 06 21  ISB $2106,X
  $D29C: 0A        ASL A
  $D29D: 0D 14 01  ORA $0114
  $D2A0: 36 FF     ROL $ff,X
  $D2A2: F7 4F     ISB $4f,X
  $D2A4: FF 11 02  ISB $0211,X
  $D2A7: 25 02     AND $02
  $D2A9: 0B 14     ANC #$14
  $D2AB: 01 36     ORA ($36,X)
  $D2AD: FF 13 5D  ISB $5d13,X
  $D2B0: 05 14     ORA $14
  $D2B2: 01 36     ORA ($36,X)
  $D2B4: FF F6 18  ISB $18f6,X
  $D2B7: 3A        NOP
  $D2B8: D3 48     DCP ($48),Y
  $D2BA: A8        TAY
  $D2BB: 15 FF     ORA $ff,X
  $D2BD: 11 06     ORA ($06),Y
  $D2BF: 0A        ASL A
  $D2C0: 0A        ASL A
  $D2C1: 27 1E     RLA $1e
  $D2C3: 0B 0F     ANC #$0f
  $D2C5: 49 49     EOR #$49
  $D2C7: 36 FF     ROL $ff,X
  $D2C9: F6 18     INC $18,X
  $D2CB: 3A        NOP
  $D2CC: D3 48     DCP ($48),Y
  $D2CE: A8        TAY
  $D2CF: 2C FF 11  BIT $11ff
  $D2D2: 06 23     ASL $23
  $D2D4: 65 27     ADC $27
  $D2D6: 1E 0B 0F  ASL $0f0b,X
  $D2D9: 49 49     EOR #$49
  $D2DB: 36 FF     ROL $ff,X
  $D2DD: F6 18     INC $18,X
  $D2DF: 3A        NOP
  $D2E0: D3 48     DCP ($48),Y
  $D2E2: A8        TAY
  $D2E3: 4F FF 11  SRE $11ff
  $D2E6: 06 23     ASL $23
  $D2E8: 65 26     ADC $26
  $D2EA: 29 0F     AND #$0f
  $D2EC: 49 49     EOR #$49
  $D2EE: 36 FF     ROL $ff,X
  $D2F0: 00        BRK
  $D2F1: 2D 14 3A  AND $3a14
  $D2F4: 06 31     ASL $31
  $D2F6: 27 05     RLA $05
  $D2F8: 26 FF     ROL $ff
  $D2FA: 39 39 39  AND $3939,Y
  $D2FD: 39 39 0C  AND $0c39,Y
  $D300: 3A        NOP
  $D301: 0C 53 01  NOP $0153
  $D304: FF 0D 2D  ISB $2d0d,X
  $D307: 0D 01 12  ORA $1201
  $D30A: 2D 19 FF  AND $ff19
  $D30D: F5 59     SBC $59,X
  $D30F: 49 36     EOR #$36
  $D311: FF 5D 02  ISB $025d,X
  $D314: 12        ???
  $D315: 2D 59 49  AND $4959
  $D318: 36 FF     ROL $ff,X
  $D31A: F6 15     INC $15,X
  $D31C: FF 04 01  ISB $0104,X
  $D31F: 11 01     ORA ($01),Y
  $D321: 0F 49 49  SLO $4949
  $D324: 36 FF     ROL $ff,X
  $D326: 04 01     NOP $01
  $D328: 11 05     ORA ($05),Y
  $D32A: 29 0F     AND #$0f
  $D32C: 49 49     EOR #$49
  $D32E: 36 FF     ROL $ff,X
  $D330: F9 3A 12  SBC $123a,Y
  $D333: 2D 0A 15  AND $150a
  $D336: FF A7 48  ISB $48a7,X
  $D339: DD 2C 3A  CMP $3a2c,X
  $D33C: 1A        NOP
  $D33D: 2A        ROL A
  $D33E: 52        ???
  $D33F: 1E 0B 0F  ASL $0f0b,X
  $D342: 49 49     EOR #$49
  $D344: 36 FF     ROL $ff,X
  $D346: 05 01     ORA $01
  $D348: 0B 3A     ANC #$3a
  $D34A: 0E 02 0E  ASL $0e02
  $D34D: 02        ???
  $D34E: 15 FF     ORA $ff,X
  $D350: 0B 30     ANC #$30
  $D352: 02        ???
  $D353: 27 31     RLA $31
  $D355: 02        ???
  $D356: 3A        NOP
  $D357: 10 31     BPL $d38a
  $D359: 07 57     SLO $57
  $D35B: 2D 5C FF  AND $ff5c
  $D35E: 99 AE 93  STA $93ae,Y
  $D361: 93 A7     ??? ($a7),Y
  $D363: AE 87 59  LDX $5987
  $D366: 49 49     EOR #$49
  $D368: 36 FF     ROL $ff,X
  $D36A: F0 3A     BEQ $d3a6
  $D36C: 23 2E     RLA ($2e,X)
  $D36E: 0F 58 36  SLO $3658
  $D371: FF D9 E5  ISB $e5d9,X
  $D374: A8        TAY
  $D375: 99 AE 93  STA $93ae,Y
  $D378: 93 A7     ??? ($a7),Y
  $D37A: AE 87 59  LDX $5987
  $D37D: 49 49     EOR #$49
  $D37F: 36 FF     ROL $ff,X
  $D381: 99 AE 93  STA $93ae,Y
  $D384: 93 A7     ??? ($a7),Y
  $D386: AE 87 2C  LDX $2c87
  $D389: 23 26     RLA ($26,X)
  $D38B: 29 0F     AND #$0f
  $D38D: 49 36     EOR #$36
  $D38F: FF D9 E5  ISB $e5d9,X
  $D392: A8        TAY
  $D393: 99 AE 93  STA $93ae,Y
  $D396: 93 A7     ??? ($a7),Y
  $D398: AE 87 2C  LDX $2c87
  $D39B: FF 23 26  ISB $2623,X
  $D39E: 29 12     AND #$12
  $D3A0: 0B 1E     ANC #$1e
  $D3A2: 2E 0F 49  ROL $490f
  $D3A5: 49 36     EOR #$36
  $D3A7: FF D3 48  ISB $48d3,X
  $D3AA: A8        TAY
  $D3AB: EC 8C 93  CPX $938c
  $D3AE: 15 3A     ORA $3a,X
  $D3B0: 00        BRK
  $D3B1: 0F 2E 12  SLO $122e
  $D3B4: FF 3A 3A  ISB $3a3a,X
  $D3B7: 04 04     NOP $04
  $D3B9: 49 49     EOR #$49
  $D3BB: 49 2E     EOR #$2e
  $D3BD: 13 36     SLO ($36),Y
  $D3BF: FF E7 48  ISB $48e7,X
  $D3C2: A8        TAY
  $D3C3: 4F 3A 19  SRE $193a
  $D3C6: 29 11     AND #$11
  $D3C8: 0B 0F     ANC #$0f
  $D3CA: 2E 36 FF  ROL $ff36
  $D3CD: 0C 53 01  NOP $0153
  $D3D0: 8B B0     XAA #$b0
  $D3D2: 48        PHA
  $D3D3: 93 18     ??? ($18),Y
  $D3D5: 01 27     ORA ($27,X)
  $D3D7: 31 07     AND ($07),Y
  $D3D9: 59 36 FF  EOR $ff36,Y
  $D3DC: FD AD D1  SBC $d1ad,X
  $D3DF: 36 FF     ROL $ff,X
  $D3E1: 14 2D     NOP $2d,X
  $D3E3: 14 07     NOP $07,X
  $D3E5: 3A        NOP
  $D3E6: E7 48     ISB $48
  $D3E8: A8        TAY
  $D3E9: 2C 13 2E  BIT $2e13
  $D3EC: 0F 49 36  SLO $3649
  $D3EF: FF 3A 3A  ISB $3a3a,X
  $D3F2: 3A        NOP
  $D3F3: 3A        NOP
  $D3F4: 07 2E     SLO $2e
  $D3F6: 36 36     ROL $36,X
  $D3F8: FF 14 2D  ISB $2d14,X
  $D3FB: 14 07     NOP $07,X
  $D3FD: 3A        NOP
  $D3FE: 86 AF     STX $af
  $D400: AE 90 36  LDX $3690
  $D403: FF FD 15  ISB $15fd,X
  $D406: 01 07     ORA ($07,X)
  $D408: 36 FF     ROL $ff,X
  $D40A: 59 4F 3A  EOR $3a4f,Y
  $D40D: 12        ???
  $D40E: 5C 19 55  NOP $5519,X
  $D411: 01 0F     ORA ($0f,X)
  $D413: 2E 36 FF  ROL $ff36
  $D416: 86 83     STX $83
  $D418: 83 B2     SAX ($b2,X)
  $D41A: B2        ???
  $D41B: B2        ???
  $D41C: B2        ???
  $D41D: 49 49     EOR #$49
  $D41F: 49 49     EOR #$49
  $D421: 49 49     EOR #$49
  $D423: 49 49     EOR #$49
  $D425: AE 36 36  LDX $3636
  $D428: FF 5C 0F  ISB $0f5c,X
  $D42B: 2E 36 3A  ROL $3a36
  $D42E: F2        ???
  $D42F: 18        CLC
  $D430: FF 1A 50  ISB $501a,X
  $D433: 3A        NOP
  $D434: 0A        ASL A
  $D435: 2D 05 07  AND $0705
  $D438: 13 64     SLO ($64),Y
  $D43A: 36 FF     ROL $ff,X
  $D43C: 3A        NOP
  $D43D: 3A        NOP
  $D43E: 3A        NOP
  $D43F: 09 2E     ORA #$2e
  $D441: 3A        NOP
  $D442: 09 29     ORA #$29
  $D444: 19 36 FF  ORA $ff36,Y
  $D447: 3A        NOP
  $D448: 3A        NOP
  $D449: 3A        NOP
  $D44A: 02        ???
  $D44B: 2B 00     ANC #$00
  $D44D: 00        BRK
  $D44E: 00        BRK
  $D44F: 00        BRK
  $D450: 2E 36 FF  ROL $ff36
  $D453: DD A6 81  CMP $81a6,X
  $D456: E5 8F     SBC $8f
  $D458: 81 CF     STA ($cf,X)
  $D45A: 48        PHA
  $D45B: FF 91 81  ISB $8191,X
  $D45E: AD 8B B0  LDA $b08b
  $D461: 48        PHA
  $D462: 93 59     ??? ($59),Y
  $D464: 49 49     EOR #$49
  $D466: AE 36 36  LDX $3636
  $D469: 36 FF     ROL $ff,X
  $D46B: 01 08     ORA ($08,X)
  $D46D: 49 49     EOR #$49
  $D46F: 2E 36 3A  ROL $3a36
  $D472: D3 49     DCP ($49),Y
  $D474: 49 A8     EOR #$a8
  $D476: 59 00 00  EOR $0000,Y
  $D479: 49 49     EOR #$49
  $D47B: 2E 36 FF  ROL $ff36
  $D47E: E8        INX
  $D47F: 8C 86 AF  STY $af86
  $D482: AE 90 36  LDX $3690
  $D485: FF E7 48  ISB $48e7,X
  $D488: A8        TAY
  $D489: 15 3A     ORA $3a,X
  $D48B: 20 05 02  JSR $0205
  $D48E: 36 FF     ROL $ff,X
  $D490: 85 AE     STA $ae
  $D492: 93 0A     ??? ($0a),Y
  $D494: 29 12     AND #$12
  $D496: 0B 1E     ANC #$1e
  $D498: 2E 0F 49  ROL $490f
  $D49B: 36 FF     ROL $ff,X
  $D49D: 0F 05 01  SLO $0105
  $D4A0: 3A        NOP
  $D4A1: E7 48     ISB $48
  $D4A3: A8        TAY
  $D4A4: 59 36 FF  EOR $ff36,Y
  $D4A7: 0E 18 3A  ASL $3a18
  $D4AA: E7 48     ISB $48
  $D4AC: A8        TAY
  $D4AD: 2C FF 9B  BIT $9bff
  $D4B0: B5 AA     LDA $aa,X
  $D4B2: 48        PHA
  $D4B3: 0B 0F     ANC #$0f
  $D4B5: 36 FF     ROL $ff,X
  $D4B7: 1A        NOP
  $D4B8: 2A        ROL A
  $D4B9: 2E 0F 36  ROL $360f
  $D4BC: FF 1A 07  ISB $071a,X
  $D4BF: 01 3A     ORA ($3a,X)
  $D4C1: E7 48     ISB $48
  $D4C3: A8        TAY
  $D4C4: 59 36 FF  EOR $ff36,Y
  $D4C7: 0E 18 E7  ASL $e718
  $D4CA: 48        PHA
  $D4CB: A8        TAY
  $D4CC: 15 3A     ORA $3a,X
  $D4CE: 02        ???
  $D4CF: 53 06     SRE ($06),Y
  $D4D1: 2C FF 00  BIT $00ff
  $D4D4: 2B 0D     ANC #$0d
  $D4D6: 0F 49 49  SLO $4949
  $D4D9: 36 FF     ROL $ff,X
  $D4DB: 0B 2D     ANC #$2d
  $D4DD: 68        PLA
  $D4DE: 2D 4F 3A  AND $3a4f
  $D4E1: 13 08     SLO ($08),Y
  $D4E3: 01 2C     ORA ($2c,X)
  $D4E5: FF 1F 12  ISB $121f,X
  $D4E8: 01 28     ORA ($28,X)
  $D4EA: 36 FF     ROL $ff,X
  $D4EC: 18        CLC
  $D4ED: 09 27     ORA #$27
  $D4EF: 55 05     EOR $05,X
  $D4F1: 2D 19 FF  AND $ff19
  $D4F4: 00        BRK
  $D4F5: 13 3A     SLO ($3a),Y
  $D4F7: FA        NOP
  $D4F8: 59 36 FF  EOR $ff36,Y
  $D4FB: 04 49     NOP $49
  $D4FD: 49 2E     EOR #$2e
  $D4FF: 13 3A     SLO ($3a),Y
  $D501: 09 09     ORA #$09
  $D503: 5C FF 9D  NOP $9dff,X
  $D506: 81 AE     STA ($ae,X)
  $D508: 8C A8 59  STY $59a8
  $D50B: 49 49     EOR #$49
  $D50D: 36 FF     ROL $ff,X
  $D50F: 03 2D     SLO ($2d,X)
  $D511: 10 31     BPL $d544
  $D513: 02        ???
  $D514: 0D 2D 3A  ORA $3a2d
  $D517: 57 2D     SRE $2d,X
  $D519: 19 2D FF  ORA $ff2d,Y
  $D51C: F0 4F     BEQ $d56d
  $D51E: FF 19 01  ISB $0119,X
  $D521: 2E 0F 36  ROL $360f
  $D524: FF F0 36  ISB $36f0,X
  $D527: 36 FF     ROL $ff,X
  $D529: 53 02     SRE ($02),Y
  $D52B: 01 2D     ORA ($2d,X)
  $D52D: 14 3A     NOP $3a,X
  $D52F: FC 36 FF  NOP $ff36,X
  $D532: 0C 4F 0F  NOP $0f4f
  $D535: 2C 3A 08  BIT $083a
  $D538: 0B 1E     ANC #$1e
  $D53A: 0B 0F     ANC #$0f
  $D53C: 49 49     EOR #$49
  $D53E: 36 FF     ROL $ff,X
  $D540: 3A        NOP
  $D541: 3A        NOP
  $D542: 3A        NOP
  $D543: 0E 29 2E  ASL $2e29
  $D546: 36 36     ROL $36,X
  $D548: 3A        NOP
  $D549: FE 18 07  INC $0718,X
  $D54C: 2D 36 36  AND $3636
  $D54F: FF 3A 3A  ISB $3a3a,X
  $D552: 3A        NOP
  $D553: 01 07     ORA ($07,X)
  $D555: 25 36     AND $36
  $D557: 36 3A     ROL $3a,X
  $D559: FE 01 07  INC $0701,X
  $D55C: 2D 36 36  AND $3636
  $D55F: FF 3A 3A  ISB $3a3a,X
  $D562: 3A        NOP
  $D563: 3A        NOP
  $D564: 01 07     ORA ($07,X)
  $D566: 58        CLI
  $D567: 36 36     ROL $36,X
  $D569: 3A        NOP
  $D56A: FE 10 36  INC $3610,X
  $D56D: 36 FF     ROL $ff,X
  $D56F: 3A        NOP
  $D570: 3A        NOP
  $D571: 3A        NOP
  $D572: 01 07     ORA ($07,X)
  $D574: 25 36     AND $36
  $D576: 36 3A     ROL $3a,X
  $D578: 15 01     ORA $01,X
  $D57A: 10 2F     BPL $d5ab
  $D57C: 2D 36 36  AND $3636
  $D57F: FF 3A 3A  ISB $3a3a,X
  $D582: 3A        NOP
  $D583: 01 07     ORA ($07,X)
  $D585: 58        CLI
  $D586: 36 36     ROL $36,X
  $D588: 3A        NOP
  $D589: FE 21 36  INC $3621,X
  $D58C: 36 FF     ROL $ff,X
  $D58E: 3A        NOP
  $D58F: 3A        NOP
  $D590: 3A        NOP
  $D591: 83 AE     SAX ($ae,X)
  $D593: 9B B2 A8  TAS $a8b2,Y
  $D596: 09 02     ORA #$02
  $D598: 52        ???
  $D599: 06 59     ASL $59
  $D59B: 36 36     ROL $36,X
  $D59D: FF 3A 3A  ISB $3a3a,X
  $D5A0: 3A        NOP
  $D5A1: 01 07     ORA ($07,X)
  $D5A3: 57 36     SRE $36,X
  $D5A5: 36 3A     ROL $3a,X
  $D5A7: FE 20 36  INC $3620,X
  $D5AA: 36 FF     ROL $ff,X
  $D5AC: 3A        NOP
  $D5AD: 3A        NOP
  $D5AE: 3A        NOP
  $D5AF: 94 81     STY $81,X
  $D5B1: 8C 36 36  STY $3636
  $D5B4: 3A        NOP
  $D5B5: FE 01 07  INC $0701,X
  $D5B8: 2D 36 36  AND $3636
  $D5BB: FF 3A 3A  ISB $3a3a,X
  $D5BE: 3A        NOP
  $D5BF: 94 81     STY $81,X
  $D5C1: 8C 36 36  STY $3636
  $D5C4: 3A        NOP
  $D5C5: FE 18 07  INC $0718,X
  $D5C8: 2D 36 36  AND $3636
  $D5CB: FF 3A 3A  ISB $3a3a,X
  $D5CE: 3A        NOP
  $D5CF: 0E 26 2E  ASL $2e26
  $D5D2: 36 36     ROL $36,X
  $D5D4: 3A        NOP
  $D5D5: 15 01     ORA $01,X
  $D5D7: 10 2F     BPL $d608
  $D5D9: 2D 36 36  AND $3636
  $D5DC: FF 3A 3A  ISB $3a3a,X
  $D5DF: 3A        NOP
  $D5E0: 3A        NOP
  $D5E1: 94 81     STY $81,X
  $D5E3: 8C 36 36  STY $3636
  $D5E6: 3A        NOP
  $D5E7: FE 10 36  INC $3610,X
  $D5EA: 36 FF     ROL $ff,X
  $D5EC: 3A        NOP
  $D5ED: 3A        NOP
  $D5EE: 3A        NOP
  $D5EF: 94 81     STY $81,X
  $D5F1: 8C 36 36  STY $3636
  $D5F4: 3A        NOP
  $D5F5: FE 20 36  INC $3620,X
  $D5F8: 36 FF     ROL $ff,X
  $D5FA: 3A        NOP
  $D5FB: 3A        NOP
  $D5FC: 3A        NOP
  $D5FD: 0E 29 2E  ASL $2e29
  $D600: 36 36     ROL $36,X
  $D602: 3A        NOP
  $D603: FE 21 36  INC $3621,X
  $D606: 36 FF     ROL $ff,X
  $D608: 06 1E     ASL $1e
  $D60A: 2E 0F 36  ROL $360f
  $D60D: FF FE 01  ISB $01fe,X
  $D610: 07 2D     SLO $2d
  $D612: 13 3A     SLO ($3a),Y
  $D614: FE 18 07  INC $0718,X
  $D617: 2D 18 FF  AND $ff18
  $D61A: 89 AD     NOP #$ad
  $D61C: E4 EA     CPX $ea
  $D61E: A9 81     LDA #$81
  $D620: 36 FF     ROL $ff,X
  $D622: D5 B2     CMP $b2,X
  $D624: 9F 95 80  ??? $8095,Y
  $D627: 8F AE 87  SAX $87ae
  $D62A: 36 FF     ROL $ff,X
  $D62C: FE 20 07  INC $0720,X
  $D62F: 2D 13 FF  AND $ff13
  $D632: FE 21 07  INC $0721,X
  $D635: 2D 18 FF  AND $ff18
  $D638: 83 AE     SAX ($ae,X)
  $D63A: 9B B2 A8  TAS $a8b2,Y
  $D63D: 09 02     ORA #$02
  $D63F: 52        ???
  $D640: 06 36     ASL $36
  $D642: FF 0A 0C  ISB $0c0a,X
  $D645: 4F 3A 57  SRE $573a
  $D648: 2D 15 2E  AND $2e15
  $D64B: 6C 2D 18  JMP ($182d)
  $D64E: FF D3 48  ISB $48d3,X
  $D651: A8        TAY
  $D652: DC AD 89  NOP $89ad,X
  $D655: AD E4 36  LDA $36e4
  $D658: 36 FF     ROL $ff,X
  $D65A: 3A        NOP
  $D65B: 3A        NOP
  $D65C: 3A        NOP
  $D65D: 3A        NOP
  $D65E: 3A        NOP
  $D65F: 0B 1E     ANC #$1e
  $D661: 2E 0F 36  ROL $360f
  $D664: 36 FF     ROL $ff,X
  $D666: 3A        NOP
  $D667: 3A        NOP
  $D668: 3A        NOP
  $D669: 3A        NOP
  $D66A: 3A        NOP
  $D66B: 3A        NOP
  $D66C: 3A        NOP
  $D66D: 03 2E     SLO ($2e,X)
  $D66F: 36 FF     ROL $ff,X
  $D671: 3A        NOP
  $D672: 3A        NOP
  $D673: 3A        NOP
  $D674: 3A        NOP
  $D675: 3A        NOP
  $D676: 3A        NOP
  $D677: 14 15     NOP $15,X
  $D679: 36 36     ROL $36,X
  $D67B: FF 3A 3A  ISB $3a3a,X
  $D67E: 3A        NOP
  $D67F: 3A        NOP
  $D680: 3A        NOP
  $D681: 3A        NOP
  $D682: 63 05     RRA ($05,X)
  $D684: 14 36     NOP $36,X
  $D686: 36 FF     ROL $ff,X
  $D688: 14 2D     NOP $2d,X
  $D68A: 13 36     SLO ($36),Y
  $D68C: 36 FF     ROL $ff,X
  $D68E: 57 2D     SRE $2d,X
  $D690: 15 2E     ORA $2e,X
  $D692: 6C 2D 18  JMP ($182d)
  $D695: 89 AD     NOP #$ad
  $D697: E4 EA     CPX $ea
  $D699: A9 81     LDA #$81
  $D69B: 4F FF 11  SRE $11ff
  $D69E: 02        ???
  $D69F: 25 02     AND $02
  $D6A1: 0B 14     ANC #$14
  $D6A3: 01 36     ORA ($36,X)
  $D6A5: 36 FF     ROL $ff,X
  $D6A7: 0D 2D 15  ORA $152d
  $D6AA: 2E 6C 2D  ROL $2d6c
  $D6AD: 3A        NOP
  $D6AE: 9B A6 AD  TAS $ada6,Y
  $D6B1: 8C 18 FF  STY $ff18
  $D6B4: 83 AE     SAX ($ae,X)
  $D6B6: 9B B2 A8  TAS $a8b2,Y
  $D6B9: 09 02     ORA #$02
  $D6BB: 52        ???
  $D6BC: 06 2C     ASL $2c
  $D6BE: FF 1B 0D  ISB $0d1b,X
  $D6C1: 01 59     ORA ($59,X)
  $D6C3: 49 49     EOR #$49
  $D6C5: 36 36     ROL $36,X
  $D6C7: FF 1C 1C  ISB $1c1c,X
  $D6CA: 1C 3A 15  NOP $153a,X
  $D6CD: 01 10     ORA ($10,X)
  $D6CF: 2F 2D FF  RLA $ff2d
  $D6D2: 0F 1E 15  SLO $151e
  $D6D5: 19 3A 0B  ORA $0b3a,Y
  $D6D8: 2E 68 01  ROL $0168
  $D6DB: 22        ???
  $D6DC: 3A        NOP
  $D6DD: 00        BRK
  $D6DE: 28        PLP
  $D6DF: 25 17     AND $17
  $D6E1: 36 36     ROL $36,X
  $D6E3: FF 3A 3A  ISB $3a3a,X
  $D6E6: 3A        NOP
  $D6E7: 3A        NOP
  $D6E8: 5C 1C 3A  NOP $3a1c,X
  $D6EB: 5C 1C 1C  NOP $1c1c,X
  $D6EE: FF 39 39  ISB $3939,X
  $D6F1: 39 39 39  AND $3939,Y
  $D6F4: 39 FF 5D  AND $5dff,Y
  $D6F7: 02        ???
  $D6F8: 0B 0F     ANC #$0f
  $D6FA: 2D 59 36  AND $3659
  $D6FD: 36 3A     ROL $3a,X
  $D6FF: FE 10 36  INC $3610,X
  $D702: 36 FF     ROL $ff,X
  $D704: 11 63     ORA ($63),Y
  $D706: 0A        ASL A
  $D707: 07 2D     SLO $2d
  $D709: 13 3A     SLO ($3a),Y
  $D70B: 1F 0A 06  SLO $060a,X
  $D70E: 07 2D     SLO $2d
  $D710: 18        CLC
  $D711: FF 3A 3A  ISB $3a3a,X
  $D714: 3A        NOP
  $D715: 3A        NOP
  $D716: 53 21     SRE ($21),Y
  $D718: 2D 17 3A  AND $3a17
  $D71B: 15 01     ORA $01,X
  $D71D: 10 2F     BPL $d74e
  $D71F: 2D FF 1E  AND $1eff
  $D722: 2E 0F 07  ROL $070f
  $D725: 3A        NOP
  $D726: 0B 1E     ANC #$1e
  $D728: 27 18     RLA $18
  $D72A: 14 01     NOP $01,X
  $D72C: FF 0F 10  ISB $100f,X
  $D72F: 63 14     RRA ($14,X)
  $D731: 06 31     ASL $31
  $D733: 02        ???
  $D734: 59 01 5C  EOR $5c01,Y
  $D737: 0C FF F1  NOP $f1ff
  $D73A: 15 FF     ORA $ff,X
  $D73C: EF 2C 3A  ISB $3a2c
  $D73F: 05 03     ORA $03
  $D741: 0C 36 FF  NOP $ff36
  $D744: 12        ???
  $D745: 2C 3A 59  BIT $593a
  $D748: 0A        ASL A
  $D749: 14 01     NOP $01,X
  $D74B: 36 FF     ROL $ff,X
  $D74D: F2        ???
  $D74E: 0F 10 FF  SLO $ff10
  $D751: E8        INX
  $D752: 8C 2C 3A  STY $3a2c
  $D755: 05 03     ORA $03
  $D757: 0C 36 FF  NOP $ff36
  $D75A: 27 31     RLA $31
  $D75C: 02        ???
  $D75D: 51 2D     EOR ($2d),Y
  $D75F: 3A        NOP
  $D760: 5D 02 12  EOR $1202,X
  $D763: 2D 18 1E  AND $1e18
  $D766: 1E FF 0B  ASL $0bff,X
  $D769: 31 02     AND ($02),Y
  $D76B: 65 19     ADC $19
  $D76D: 3A        NOP
  $D76E: 03 2D     SLO ($2d,X)
  $D770: 10 31     BPL $d7a3
  $D772: 02        ???
  $D773: 0D 2D 15  ORA $152d
  $D776: FF 01 07  ISB $0701,X
  $D779: 58        CLI
  $D77A: 36 3A     ROL $3a,X
  $D77C: FE 14 07  INC $0714,X
  $D77F: 2D 36 FF  AND $ff36
  $D782: F4 3A     NOP $3a,X
  $D784: EE FF 86  INC $86ff
  $D787: AF AE 90  LAX $90ae
  $D78A: 15 3A     ORA $3a,X
  $D78C: 06 0F     ASL $0f
  $D78E: 49 49     EOR #$49
  $D790: 36 FF     ROL $ff,X
  $D792: 02        ???
  $D793: 1E 07 3A  ASL $3a07,X
  $D796: 05 2B     ORA $2b
  $D798: 0B 0F     ANC #$0f
  $D79A: 49 49     EOR #$49
  $D79C: 36 FF     ROL $ff,X
  $D79E: 50 2F     BVC $d7cf
  $D7A0: 07 2C     SLO $2c
  $D7A2: 11 07     ORA ($07),Y
  $D7A4: 3A        NOP
  $D7A5: EF 59 36  ISB $3659
  $D7A8: FF 13 22  ISB $2213,X
  $D7AB: 15 3A     ORA $3a,X
  $D7AD: 24 56     BIT $56
  $D7AF: 26 56     ROL $56
  $D7B1: FF 09 18  ISB $1809,X
  $D7B4: 04 29     NOP $29
  $D7B6: 05 26     ORA $26
  $D7B8: 3A        NOP
  $D7B9: E7 48     ISB $48
  $D7BB: A8        TAY
  $D7BC: 4F 3A 02  SRE $023a
  $D7BF: 63 03     RRA ($03,X)
  $D7C1: 28        PLP
  $D7C2: 05 36     ORA $36
  $D7C4: FF 5D 02  ISB $025d,X
  $D7C7: 59 36 3A  EOR $3a36,Y
  $D7CA: FE 01 36  INC $3601,X
  $D7CD: FF 07 26  ISB $2607,X
  $D7D0: 03 2E     SLO ($2e,X)
  $D7D2: 36 3A     ROL $3a,X
  $D7D4: 85 9F     STA $9f
  $D7D6: 8E A7 8F  STX $8fa7
  $D7D9: AE 87 A8  LDX $a887
  $D7DC: 59 36 FF  EOR $ff36,Y
  $D7DF: 3F 12 2D  RLA $2d12,X
  $D7E2: 13 2E     SLO ($2e),Y
  $D7E4: 0F 26 FF  SLO $ff26
  $D7E7: 00        BRK
  $D7E8: 13 19     SLO ($19),Y
  $D7EA: 3A        NOP
  $D7EB: FE 01 18  INC $1801,X
  $D7EE: 3A        NOP
  $D7EF: 9E 48 87  SHX $8748,Y
  $D7F2: 59 08 59  EOR $5908,Y
  $D7F5: 36 FF     ROL $ff,X
  $D7F7: 01 08     ORA ($08,X)
  $D7F9: 03 49     SLO ($49,X)
  $D7FB: 49 49     EOR #$49
  $D7FD: 36 FF     ROL $ff,X
  $D7FF: 04 29     NOP $29
  $D801: 0F 10 18  SLO $1810
  $D804: 3A        NOP
  $D805: 07 02     SLO $02
  $D807: 10 30     BPL $d839
  $D809: 02        ???
  $D80A: AB D4     ATX #$d4
  $D80C: 36 FF     ROL $ff,X
  $D80E: 07 26     SLO $26
  $D810: 03 36     SLO ($36,X)
  $D812: 3A        NOP
  $D813: AB 8B     ATX #$8b
  $D815: 18        CLC
  $D816: E8        INX
  $D817: AB 48     ATX #$48
  $D819: DC B3 9B  NOP $9bb3,X
  $D81C: B2        ???
  $D81D: AD 8C 36  LDA $368c
  $D820: FF 0A 00  ISB $000a,X
  $D823: 3A        NOP
  $D824: 01 1E     ORA ($1e,X)
  $D826: 09 0E     ORA #$0e
  $D828: FF 1A 26  ISB $261a,X
  $D82B: 5D 18 3A  EOR $3a18,X
  $D82E: 1D 2D 13  ORA $132d,X
  $D831: 02        ???
  $D832: 18        CLC
  $D833: 3A        NOP
  $D834: 10 05     BPL $d83b
  $D836: 26 2C     ROL $2c
  $D838: FF 1F 0D  ISB $0d1f,X
  $D83B: 12        ???
  $D83C: 23 28     RLA ($28,X)
  $D83E: 8F 81 36  SAX $3681
  $D841: FF 4F 2E  ISB $2e4f,X
  $D844: 19 2E 19  ORA $192e,Y
  $D847: 2E 19 2E  ROL $2e19
  $D84A: 19 36 FF  ORA $ff36,Y
  $D84D: 1F 0F 05  SLO $050f,X
  $D850: 3A        NOP
  $D851: 09 29     ORA #$29
  $D853: 4F 3A FE  SRE $fe3a
  $D856: 12        ???
  $D857: 13 AB     SLO ($ab),Y
  $D859: 8B 18     XAA #$18
  $D85B: FF 89 AD  ISB $ad89,X
  $D85E: E4 EA     CPX $ea
  $D860: A9 81     LDA #$81
  $D862: 3A        NOP
  $D863: 8F 81 36  SAX $3681
  $D866: FF 04 29  ISB $2904,X
  $D869: 19 3A 25  ORA $253a,Y
  $D86C: 02        ???
  $D86D: 0B 2F     ANC #$2f
  $D86F: 0B 14     ANC #$14
  $D871: 01 57     ORA ($57,X)
  $D873: 36 FF     ROL $ff,X
  $D875: FE 01 3A  INC $3a01,X
  $D878: 36 FF     ROL $ff,X
  $D87A: 94 81     STY $81,X
  $D87C: 8C 3A E8  STY $e83a
  $D87F: 8C 59 36  STY $3659
  $D882: 3A        NOP
  $D883: 8F 88 8B  SAX $8b88
  $D886: 36 FF     ROL $ff,X
  $D888: 07 26     SLO $26
  $D88A: 03 36     SLO ($36,X)
  $D88C: 3A        NOP
  $D88D: EE 36 FF  INC $ff36
  $D890: 09 29     ORA #$29
  $D892: 4F 3A 04  SRE $043a
  $D895: 29 18     AND #$18
  $D897: FF F7 59  ISB $59f7,X
  $D89A: 36 36     ROL $36,X
  $D89C: FF 2B 28  ISB $282b,X
  $D89F: 01 4F     ORA ($4f,X)
  $D8A1: 3A        NOP
  $D8A2: 00        BRK
  $D8A3: 2D 0F 15  AND $150f
  $D8A6: 19 FF 09  ORA $09ff,Y
  $D8A9: 18        CLC
  $D8AA: 0B 00     ANC #$00
  $D8AC: 01 3A     ORA ($3a,X)
  $D8AE: 3F 12 2D  RLA $2d12,X
  $D8B1: 22        ???
  $D8B2: 06 21     ASL $21
  $D8B4: 0A        ASL A
  $D8B5: 0D 14 01  ORA $0114
  $D8B8: 57 36     SRE $36,X
  $D8BA: FF 07 28  ISB $2807,X
  $D8BD: 14 26     NOP $26,X
  $D8BF: 09 01     ORA #$01
  $D8C1: 36 FF     ROL $ff,X
  $D8C3: 14 2D     NOP $2d,X
  $D8C5: 15 2D     ORA $2d,X
  $D8C7: 06 12     ASL $12
  $D8C9: 22        ???
  $D8CA: 3A        NOP
  $D8CB: 04 14     NOP $14
  $D8CD: 55 59     EOR $59,X
  $D8CF: 36 FF     ROL $ff,X
  $D8D1: 3A        NOP
  $D8D2: 3A        NOP
  $D8D3: 0B 31     ANC #$31
  $D8D5: 02        ???
  $D8D6: 65 59     ADC $59
  $D8D8: 36 3A     ROL $3a,X
  $D8DA: 3F 3E 63  RLA $633e,X
  $D8DD: 2D 36 FF  AND $ff36
  $D8E0: 3A        NOP
  $D8E1: 3A        NOP
  $D8E2: 9B AE 3A  TAS $3aae,Y
  $D8E5: 0E 18 12  ASL $1218
  $D8E8: 01 5D     ORA ($5d,X)
  $D8EA: 05 FF     ORA $ff
  $D8EC: 04 1E     NOP $1e
  $D8EE: 03 26     SLO ($26,X)
  $D8F0: 53 13     SRE ($13),Y
  $D8F2: 06 15     ASL $15
  $D8F4: 3A        NOP
  $D8F5: 11 05     ORA ($05),Y
  $D8F7: 1E 2E 12  ASL $122e,X
  $D8FA: 0F 1E 28  SLO $281e
  $D8FD: 05 FF     ORA $ff
  $D8FF: 09 18     ORA #$18
  $D901: 0F 01 05  SLO $0501
  $D904: 01 FF     ORA ($ff,X)
  $D906: 04 29     NOP $29
  $D908: 19 3A 3F  ORA $3f3a,Y
  $D90B: 12        ???
  $D90C: 2D 18 D3  AND $d318
  $D90F: 48        PHA
  $D910: A8        TAY
  $D911: 22        ???
  $D912: 24 28     BIT $28
  $D914: 0A        ASL A
  $D915: 14 01     NOP $01,X
  $D917: 36 FF     ROL $ff,X
  $D919: 0F 0B 05  SLO $050b
  $D91C: 15 3A     ORA $3a,X
  $D91E: 0C 53 01  NOP $0153
  $D921: 8B B0     XAA #$b0
  $D923: 48        PHA
  $D924: 93 59     ??? ($59),Y
  $D926: 4F FF 22  SRE $22ff
  $D929: 02        ???
  $D92A: 3A        NOP
  $D92B: 04 29     NOP $29
  $D92D: 15 19     ORA $19,X
  $D92F: 3A        NOP
  $D930: 11 02     ORA ($02),Y
  $D932: 25 02     AND $02
  $D934: 0B 14     ANC #$14
  $D936: 01 36     ORA ($36,X)
  $D938: 36 FF     ROL $ff,X
  $D93A: 3A        NOP
  $D93B: 3A        NOP
  $D93C: 3A        NOP
  $D93D: 0B 31     ANC #$31
  $D93F: 02        ???
  $D940: 65 59     ADC $59
  $D942: 36 3A     ROL $3a,X
  $D944: FE 98 FF  INC $ff98,X
  $D947: 3A        NOP
  $D948: 9B AE 3A  TAS $3aae,Y
  $D94B: 0E 18 12  ASL $1218
  $D94E: 01 5D     ORA ($5d,X)
  $D950: 05 39     ORA $39
  $D952: 39 FE 98  AND $98fe,Y
  $D955: FF 09 18  ISB $1809,X
  $D958: 0F 01 05  SLO $0501
  $D95B: 01 18     ORA ($18,X)
  $D95D: 3A        NOP
  $D95E: 13 07     SLO ($07),Y
  $D960: 12        ???
  $D961: 2D 04 02  AND $0204
  $D964: 19 FF 09  ORA $09ff,Y
  $D967: 18        CLC
  $D968: 3A        NOP
  $D969: A8        TAY
  $D96A: 81 3A     STA ($3a,X)
  $D96C: FE 21 4F  INC $4f21,X
  $D96F: 3A        NOP
  $D970: 13 28     SLO ($28),Y
  $D972: 36 36     ROL $36,X
  $D974: FF 0A 0C  ISB $0c0a,X
  $D977: 4F 3A FE  SRE $fe3a
  $D97A: 9A        TXS
  $D97B: 3A        NOP
  $D97C: 11 50     ORA ($50),Y
  $D97E: 19 06 21  ORA $2106,Y
  $D981: 28        PLP
  $D982: 58        CLI
  $D983: 36 FF     ROL $ff,X
  $D985: 22        ???
  $D986: 26 2E     ROL $2e
  $D988: 0F 57 36  SLO $3657
  $D98B: 3A        NOP
  $D98C: FE 9A 36  INC $369a,X
  $D98F: FF 3A 3A  ISB $3a3a,X
  $D992: 3A        NOP
  $D993: 3A        NOP
  $D994: 3A        NOP
  $D995: 3A        NOP
  $D996: 3A        NOP
  $D997: 14 15     NOP $15,X
  $D999: B3 36     LAX ($36),Y
  $D99B: 36 FF     ROL $ff,X
  $D99D: 04 29     NOP $29
  $D99F: 4F 3A 57  SRE $573a
  $D9A2: 2D 15 2E  AND $2e15
  $D9A5: 6C 2D 18  JMP ($182d)
  $D9A8: D3 48     DCP ($48),Y
  $D9AA: A8        TAY
  $D9AB: 86 48     STX $48
  $D9AD: E8        INX
  $D9AE: 48        PHA
  $D9AF: FF FE 16  ISB $16fe,X
  $D9B2: 3A        NOP
  $D9B3: 08        PHP
  $D9B4: 2D 59 36  AND $3659
  $D9B7: FF 9B AE  ISB $ae9b,X
  $D9BA: 3A        NOP
  $D9BB: 0F 01 0B  SLO $0b01
  $D9BE: 0F 3A 01  SLO $013a
  $D9C1: 27 31     RLA $31
  $D9C3: 07 55     SLO $55
  $D9C5: 2F 14 01  RLA $0114
  $D9C8: 14 39     NOP $39,X
  $D9CA: FF 1F 0F  ISB $0f1f,X
  $D9CD: 05 36     ORA $36
  $D9CF: 3A        NOP
  $D9D0: 09 29     ORA #$29
  $D9D2: 4F 3A 1D  SRE $1d3a
  $D9D5: 2D 63 A5  AND $a563
  $D9D8: 48        PHA
  $D9D9: AA        TAX
  $D9DA: AE E8 18  LDX $18e8
  $D9DD: FF 92 87  ISB $8792,X
  $D9E0: 95 AE     STA $ae,X
  $D9E2: 87 59     SAX $59
  $D9E4: 57 36     SRE $36,X
  $D9E6: 36 FF     ROL $ff,X
  $D9E8: 1F 2D 14  SLO $142d,X
  $D9EB: 3A        NOP
  $D9EC: 00        BRK
  $D9ED: 4F 29 36  SRE $3629
  $D9F0: FF 1B 26  ISB $261b,X
  $D9F3: 18        CLC
  $D9F4: 18        CLC
  $D9F5: 3A        NOP
  $D9F6: 14 59     NOP $59,X
  $D9F8: 29 09     AND #$09
  $D9FA: 02        ???
  $D9FB: 52        ???
  $D9FC: 06 59     ASL $59
  $D9FE: 36 36     ROL $36,X
  $DA00: FF 09 09  ISB $0909,X
  $DA03: 59 36 3A  EOR $3a36,Y
  $DA06: 09 09     ORA #$09
  $DA08: 5C 3A 06  NOP $063a,X
  $DA0B: 21 28     AND ($28,X)
  $DA0D: 2D 59 36  AND $3659
  $DA10: 36 FF     ROL $ff,X
  $DA12: 1E 22 28  ASL $2822,X
  $DA15: 58        CLI
  $DA16: 36 3A     ROL $3a,X
  $DA18: 1F 2D 14  SLO $142d,X
  $DA1B: 36 36     ROL $36,X
  $DA1D: FF 14 15  ISB $1514,X
  $DA20: 36 3A     ROL $3a,X
  $DA22: 1E 59 3A  ASL $3a59,X
  $DA25: AB D4     ATX #$d4
  $DA27: 4F 00 28  SRE $2800
  $DA2A: 18        CLC
  $DA2B: 05 37     ORA $37
  $DA2D: 36 FF     ROL $ff,X
  $DA2F: 02        ???
  $DA30: 2E 3A 14  ROL $143a
  $DA33: 15 05     ORA $05,X
  $DA35: 00        BRK
  $DA36: 28        PLP
  $DA37: 36 FF     ROL $ff,X
  $DA39: 09 2D     ORA #$2d
  $DA3B: 5D 09 0E  EOR $0e09,X
  $DA3E: 3A        NOP
  $DA3F: D3 48     DCP ($48),Y
  $DA41: A8        TAY
  $DA42: 2C 3A 2B  BIT $2b3a
  $DA45: 28        PLP
  $DA46: 58        CLI
  $DA47: 36 FF     ROL $ff,X
  $DA49: FE 1F 36  INC $361f,X
  $DA4C: 36 FF     ROL $ff,X
  $DA4E: 14 2D     NOP $2d,X
  $DA50: 05 11     ORA $11
  $DA52: 18        CLC
  $DA53: 3A        NOP
  $DA54: 9F AE DD  ??? $ddae,Y
  $DA57: 9B B3 48  TAS $48b3,Y
  $DA5A: A8        TAY
  $DA5B: D9 48 19  CMP $1948,Y
  $DA5E: FF 11 63  ISB $6311,X
  $DA61: 0A        ASL A
  $DA62: 3A        NOP
  $DA63: 59 08 55  EOR $5508,Y
  $DA66: 2F 14 01  RLA $0114
  $DA69: 57 36     SRE $36,X
  $DA6B: 36 FF     ROL $ff,X
  $DA6D: 3A        NOP
  $DA6E: 3A        NOP
  $DA6F: 2B 0C     ANC #$0c
  $DA71: 29 12     AND #$12
  $DA73: 2D 55 2F  AND $2f55
  $DA76: 17 03     SLO $03,X
  $DA78: 58        CLI
  $DA79: 36 FF     ROL $ff,X
  $DA7B: 3A        NOP
  $DA7C: 3A        NOP
  $DA7D: 84 A9     STY $a9
  $DA7F: 4F 3A FE  SRE $fe3a
  $DA82: 05 59     ORA $59
  $DA84: 36 FF     ROL $ff,X
  $DA86: 14 15     NOP $15,X
  $DA88: 23 2E     RLA ($2e,X)
  $DA8A: 12        ???
  $DA8B: 2D 59 3A  AND $3a59
  $DA8E: 00        BRK
  $DA8F: 01 11     ORA ($11,X)
  $DA91: 36 FF     ROL $ff,X
  $DA93: 3A        NOP
  $DA94: 3A        NOP
  $DA95: 01 07     ORA ($07,X)
  $DA97: 58        CLI
  $DA98: 36 3A     ROL $3a,X
  $DA9A: FE 20 36  INC $3620,X
  $DA9D: FF 06 1F  ISB $1f06,X
  $DAA0: 0F 10 18  SLO $1810
  $DAA3: 3A        NOP
  $DAA4: 02        ???
  $DAA5: 53 06     SRE ($06),Y
  $DAA7: 19 3A FF  ORA $ff3a,Y
  $DAAA: 0C 5C 15  NOP $155c
  $DAAD: 3A        NOP
  $DAAE: 08        PHP
  $DAAF: 2D 06 30  AND $3006
  $DAB2: 02        ???
  $DAB3: 56 1F     LSR $1f,X
  $DAB5: 59 36 FF  EOR $ff36,Y
  $DAB8: 3A        NOP
  $DAB9: 3A        NOP
  $DABA: 3A        NOP
  $DABB: 09 39     ORA #$39
  $DABD: 39 09 01  AND $0109,Y
  $DAC0: 11 19     ORA ($19),Y
  $DAC2: 39 39 FF  AND $ff39,Y
  $DAC5: 3A        NOP
  $DAC6: 3A        NOP
  $DAC7: 3A        NOP
  $DAC8: 07 0E     SLO $0e
  $DACA: 2E 3A 1E  ROL $1e3a
  $DACD: 15 00     ORA $00,X
  $DACF: 2E 12 07  ROL $0712
  $DAD2: 29 36     AND #$36
  $DAD4: FF 9A AF  ISB $af9a,X
  $DAD7: AE 9D 48  LDX $489d
  $DADA: 36 3A     ROL $3a,X
  $DADC: 23 2E     RLA ($2e,X)
  $DADE: 0F D7 36  SLO $36d7
  $DAE1: FF 09 18  ISB $1809,X
  $DAE4: 84 A9     STY $a9
  $DAE6: 4F 3A 05  SRE $053a
  $DAE9: 2D 6B 06  AND $066b
  $DAEC: 15 3A     ORA $3a,X
  $DAEE: 16 05     ASL $05,X
  $DAF0: 29 0F     AND #$0f
  $DAF2: 36 36     ROL $36,X
  $DAF4: FF 0F 18  ISB $180f,X
  $DAF7: 20 3A FE  JSR $fe3a
  $DAFA: 14 3A     NOP $3a,X
  $DAFC: 06 21     ASL $21
  $DAFE: 12        ???
  $DAFF: 07 29     SLO $29
  $DB01: 36 FF     ROL $ff,X
  $DB03: 3A        NOP
  $DB04: 3A        NOP
  $DB05: 0F 18 20  SLO $2018
  $DB08: 58        CLI
  $DB09: 36 3A     ROL $3a,X
  $DB0B: F2        ???
  $DB0C: 36 FF     ROL $ff,X
  $DB0E: 0A        ASL A
  $DB0F: 0C 4F 3A  NOP $3a4f
  $DB12: FE 01 36  INC $3601,X
  $DB15: FF 10 30  ISB $3010,X
  $DB18: 02        ???
  $DB19: 63 2D     RRA ($2d,X)
  $DB1B: 19 3A 0B  ORA $0b3a,Y
  $DB1E: 19 01 0A  ORA $0a01,Y
  $DB21: 0D 14 01  ORA $0114
  $DB24: 36 36     ROL $36,X
  $DB26: FF F2 4F  ISB $4ff2,X
  $DB29: 3A        NOP
  $DB2A: 06 0F     ASL $0f
  $DB2C: 36 FF     ROL $ff,X
  $DB2E: F3 4F     ISB ($4f),Y
  $DB30: FF 05 09  ISB $0905,X
  $DB33: 2D 59 49  AND $4959
  $DB36: 49 36     EOR #$36
  $DB38: FF 1A 06  ISB $061a,X
  $DB3B: 2B 08     ANC #$08
  $DB3D: 59 49 49  EOR $4949,Y
  $DB40: 36 FF     ROL $ff,X
  $DB42: F3 0F     ISB ($0f),Y
  $DB44: 10 FF     BPL $db45
  $DB46: FB 15 3A  ISB $3a15,Y
  $DB49: 05 09     ORA $09
  $DB4B: 1E 29 0F  ASL $0f29,X
  $DB4E: 49 49     EOR #$49
  $DB50: 36 FF     ROL $ff,X
  $DB52: F3 4F     ISB ($4f),Y
  $DB54: 3A        NOP
  $DB55: 11 01     ORA ($01),Y
  $DB57: 0F 36 FF  SLO $ff36
  $DB5A: FB 4F 3A  ISB $3a4f,Y
  $DB5D: 05 09     ORA $09
  $DB5F: 2D 59 49  AND $4959
  $DB62: 49 36     EOR #$36
  $DB64: FF F0 3A  ISB $3af0,X
  $DB67: 1E 59 FF  ASL $ff59,X
  $DB6A: 9E 48 87  SHX $8748,Y
  $DB6D: 2C 3A 19  BIT $193a
  $DB70: 56 0D     LSR $0d,X
  $DB72: 14 01     NOP $01,X
  $DB74: 36 FF     ROL $ff,X
  $DB76: 05 09     ORA $09
  $DB78: 1F 2C 3A  SLO $3a2c,X
  $DB7B: 13 2E     SLO ($2e),Y
  $DB7D: 68        PLA
  $DB7E: 5C 06 14  NOP $1406,X
  $DB81: 01 36     ORA ($36,X)
  $DB83: FF 05 09  ISB $0905,X
  $DB86: 2D 5C 01  AND $015c
  $DB89: 28        PLP
  $DB8A: 18        CLC
  $DB8B: 19 FF F3  ORA $f3ff,Y
  $DB8E: 59 36 FF  EOR $ff36,Y
  $DB91: 04 29     NOP $29
  $DB93: 19 3A 00  ORA $003a,Y
  $DB96: 06 26     ASL $26
  $DB98: 21 14     AND ($14,X)
  $DB9A: 01 58     ORA ($58,X)
  $DB9C: 36 FF     ROL $ff,X
  $DB9E: FB 4F 3A  ISB $3a4f,Y
  $DBA1: 05 09     ORA $09
  $DBA3: 2D 5C 01  AND $015c
  $DBA6: 28        PLP
  $DBA7: 36 FF     ROL $ff,X
  $DBA9: 9E 48 87  SHX $8748,Y
  $DBAC: 2C 3A 19  BIT $193a
  $DBAF: 56 0A     LSR $0a,X
  $DBB1: 0D 14 01  ORA $0114
  $DBB4: 36 FF     ROL $ff,X
  $DBB6: 05 09     ORA $09
  $DBB8: 1F 2C 3A  SLO $3a2c,X
  $DBBB: 13 2E     SLO ($2e),Y
  $DBBD: 68        PLA
  $DBBE: 0A        ASL A
  $DBBF: 0D 14 01  ORA $0114
  $DBC2: 36 FF     ROL $ff,X
  $DBC4: 1E 59 3A  ASL $3a59,X
  $DBC7: 0F 04 29  SLO $2904
  $DBCA: 12        ???
  $DBCB: 01 28     ORA ($28,X)
  $DBCD: 36 36     ROL $36,X
  $DBCF: FF 45 12  ISB $1245,X
  $DBD2: 2D 0A 4F  AND $4f0a
  $DBD5: 3A        NOP
  $DBD6: 11 01     ORA ($01),Y
  $DBD8: 0F 18 5C  SLO $5c18
  $DBDB: FF 13 07  ISB $0713,X
  $DBDE: 66 11     ROR $11
  $DBE0: A8        TAY
  $DBE1: 48        PHA
  $DBE2: A8        TAY
  $DBE3: 15 25     ORA $25,X
  $DBE5: 27 FF     RLA $ff
  $DBE7: 89 48     NOP #$48
  $DBE9: A8        TAY
  $DBEA: DD D2 48  CMP $48d2,X
  $DBED: A0 15     LDY #$15
  $DBEF: 14 27     NOP $27,X
  $DBF1: 1E 0C 36  ASL $360c,X
  $DBF4: FF 3A 3A  ISB $3a3a,X
  $DBF7: 3A        NOP
  $DBF8: 3A        NOP
  $DBF9: 3A        NOP
  $DBFA: 02        ???
  $DBFB: 2E 3A 12  ROL $123a
  $DBFE: 4F 39 39  SRE $3939
  $DC01: 39 FF 12  AND $12ff,Y
  $DC04: 4F 3A 0B  SRE $0b3a
  $DC07: 64 29     NOP $29
  $DC09: 12        ???
  $DC0A: 01 28     ORA ($28,X)
  $DC0C: 25 02     AND $02
  $DC0E: 5C 0C 36  NOP $360c,X
  $DC11: FF 04 29  ISB $2904,X
  $DC14: 18        CLC
  $DC15: 3A        NOP
  $DC16: 04 02     NOP $02
  $DC18: 53 2D     SRE ($2d),Y
  $DC1A: 18        CLC
  $DC1B: 3A        NOP
  $DC1C: 1F 50 02  SLO $0250,X
  $DC1F: 5C 19 FF  NOP $ff19,X
  $DC22: 1E 59 3A  ASL $3a59,X
  $DC25: 0B 2D     ANC #$2d
  $DC27: 5C 01 14  NOP $1401,X
  $DC2A: 01 39     ORA ($39,X)
  $DC2C: 39 39 39  AND $3939,Y
  $DC2F: FF 6D E7  ISB $e76d,X
  $DC32: 8F AD 2C  SAX $2cad
  $DC35: 3A        NOP
  $DC36: 04 0B     NOP $0b
  $DC38: 12        ???
  $DC39: 3A        NOP
  $DC3A: 17 2E     SLO $2e,X
  $DC3C: FF 00 2D  ISB $2d00,X
  $DC3F: 1E 27 3A  ASL $3a27,X
  $DC42: 1E 0F 0D  ASL $0d0f,X
  $DC45: 28        PLP
  $DC46: 13 FF     SLO ($ff),Y
  $DC48: 17 10     SLO $10,X
  $DC4A: 2F 02 25  RLA $2502
  $DC4D: 04 39     NOP $39
  $DC4F: FF 3A 3A  ISB $3a3a,X
  $DC52: 3A        NOP
  $DC53: 3A        NOP
  $DC54: 04 04     NOP $04
  $DC56: 49 49     EOR #$49
  $DC58: 36 FF     ROL $ff,X
  $DC5A: F7 5C     ISB $5c,X
  $DC5C: FF 02 10  ISB $1002,X
  $DC5F: 05 03     ORA $03
  $DC61: 0B 0F     ANC #$0f
  $DC63: B4 B4     LDY $b4,X
  $DC65: 49 49     EOR #$49
  $DC67: 36 FF     ROL $ff,X
  $DC69: 3A        NOP
  $DC6A: 09 18     ORA #$18
  $DC6C: 85 A7     STA $a7
  $DC6E: 19 3A 05  ORA $053a,Y
  $DC71: 14 26     NOP $26,X
  $DC73: 56 3A     LSR $3a,X
  $DC75: 05 03     ORA $03
  $DC77: 0C 36 FF  NOP $ff36
  $DC7A: 22        ???
  $DC7B: 26 2E     ROL $2e
  $DC7D: 0F 57 36  SLO $3657
  $DC80: 36 3A     ROL $3a,X
  $DC82: 57 2D     SRE $2d,X
  $DC84: 15 2E     ORA $2e,X
  $DC86: 6C 2D 36  JMP ($362d)
  $DC89: FF F7 15  ISB $15f7,X
  $DC8C: FF F2 4F  ISB $4ff2,X
  $DC8F: 3A        NOP
  $DC90: 20 05 02  JSR $0205
  $DC93: 36 FF     ROL $ff,X
  $DC95: D3 48     DCP ($48),Y
  $DC97: A8        TAY
  $DC98: 2C 3A 02  BIT $023a
  $DC9B: 63 03     RRA ($03,X)
  $DC9D: 14 01     NOP $01,X
  $DC9F: 86 48     STX $48
  $DCA1: E8        INX
  $DCA2: 48        PHA
  $DCA3: 14 2D     NOP $2d,X
  $DCA5: 12        ???
  $DCA6: FF 01 28  ISB $2801,X
  $DCA9: 2B 08     ANC #$08
  $DCAB: 4F 3A 14  SRE $143a
  $DCAE: 01 2D     ORA ($2d,X)
  $DCB0: 59 36 FF  EOR $ff36,Y
  $DCB3: 3F 12 2D  RLA $2d12,X
  $DCB6: 05 03     ORA $03
  $DCB8: 0B 0F     ANC #$0f
  $DCBA: 49 49     EOR #$49
  $DCBC: 36 36     ROL $36,X
  $DCBE: FF 3F 12  ISB $123f,X
  $DCC1: 2D A7 48  AND $48a7
  $DCC4: DD 0B 0F  CMP $0f0b,X
  $DCC7: 49 49     EOR #$49
  $DCC9: 36 36     ROL $36,X
  $DCCB: FF FF 13  ISB $13ff,X
  $DCCE: FF FF FF  ISB $ffff,X
  $DCD1: 24 FF     BIT $ff
  $DCD3: 42        ???
  $DCD4: FF 20 FF  ISB $ff20,X
  $DCD7: FF FF FF  ISB $ffff,X
  $DCDA: FF 24 FF  ISB $ff24,X
  $DCDD: 32        ???
  $DCDE: FF 21 12  ISB $1221,X
  $DCE1: FF FF FF  ISB $ffff,X
  $DCE4: FF 25 FF  ISB $ff25,X
  $DCE7: 43 FF     SRE ($ff,X)
  $DCE9: 21 FF     AND ($ff,X)
  $DCEB: 13 FF     SLO ($ff),Y
  $DCED: 02        ???
  $DCEE: FF 34 22  ISB $2234,X
  $DCF1: 52        ???
  $DCF2: FF FF 11  ISB $11ff,X
  $DCF5: 14 FF     NOP $ff,X
  $DCF7: FF FF 34  ISB $34ff,X
  $DCFA: FF 42 FF  ISB $ff42,X
  $DCFD: 31 12     AND ($12),Y
  $DCFF: FF FF 03  ISB $03ff,X
  $DD02: 23 FF     RLA ($ff,X)
  $DD04: FF 53 FF  ISB $ff53,X
  $DD07: 31 FF     AND ($ff),Y
  $DD09: 13 22     SLO ($22),Y
  $DD0B: 11 FF     ORA ($ff),Y
  $DD0D: 44 32     NOP $32
  $DD0F: 52        ???
  $DD10: FF FF 30  ISB $30ff,X
  $DD13: 35 23     AND $23,X
  $DD15: 12        ???
  $DD16: FF 45 FF  ISB $ff45,X
  $DD19: FF FF 40  ISB $40ff,X
  $DD1C: 12        ???
  $DD1D: FF 22 14  ISB $1422,X
  $DD20: 33 FF     RLA ($ff),Y
  $DD22: FF 53 FF  ISB $ff53,X
  $DD25: 41 50     EOR ($50,X)
  $DD27: 33 32     RLA ($32),Y
  $DD29: 21 41     AND ($41,X)
  $DD2B: 64 53     NOP $53
  $DD2D: FF FF FF  ISB $ffff,X
  $DD30: 50 55     BVC $dd87
  $DD32: 33 22     RLA ($22),Y
  $DD34: FF 64 FF  ISB $ff64,X
  $DD37: FF 42 61  ISB $6142,X
  $DD3A: 32        ???
  $DD3B: 55 33     EOR $33,X
  $DD3D: 24 52     BIT $52
  $DD3F: FF 44 FF  ISB $ff44,X
  $DD42: FF 61 70  ISB $7061,X
  $DD45: 75 42     ADC $42,X
  $DD47: 33 FF     RLA ($ff),Y
  $DD49: 84 73     STY $73
  $DD4B: FF 62 FF  ISB $ff62,X
  $DD4E: 70 75     BVS $ddc5
  $DD50: 42        ???
  $DD51: 33 62     RLA ($62),Y
  $DD53: FF 73 FF  ISB $ff73,X
  $DD56: 53 FF     SRE ($ff),Y
  $DD58: 70 75     BVS $ddcf
  $DD5A: 43 32     SRE ($32,X)
  $DD5C: 72        ???
  $DD5D: FF FF FF  ISB $ffff,X
  $DD60: 63 81     RRA ($81,X)
  $DD62: FF 03 FF  ISB $ff03,X
  $DD65: FF FF 14  ISB $14ff,X
  $DD68: FF 42 FF  ISB $ff42,X
  $DD6B: FF FF FF  ISB $ffff,X
  $DD6E: FF FF FF  ISB $ffff,X
  $DD71: FF FF 42  ISB $42ff,X
  $DD74: FF FF 03  ISB $03ff,X
  $DD77: FF FF FF  ISB $ffff,X
  $DD7A: FF FF FF  ISB $ffff,X
  $DD7D: 43 FF     SRE ($ff,X)
  $DD7F: 12        ???
  $DD80: FF 13 FF  ISB $ff13,X
  $DD83: 02        ???
  $DD84: FF 24 FF  ISB $ff24,X
  $DD87: FF FF FF  ISB $ffff,X
  $DD8A: 11 14     ORA ($14),Y
  $DD8C: FF 02 FF  ISB $ff02,X
  $DD8F: FF FF FF  ISB $ffff,X
  $DD92: FF FF 12  ISB $12ff,X
  $DD95: FF FF 03  ISB $03ff,X
  $DD98: FF FF FF  ISB $ffff,X
  $DD9B: FF FF 21  ISB $21ff,X
  $DD9E: 10 14     BPL $ddb4
  $DDA0: 12        ???
  $DDA1: 02        ???
  $DDA2: 11 FF     ORA ($ff),Y
  $DDA4: 13 FF     SLO ($ff),Y
  $DDA6: 22        ???
  $DDA7: FF 10 15  ISB $1510,X
  $DDAA: 13 02     SLO ($02),Y
  $DDAC: 11 FF     ORA ($ff),Y
  $DDAE: 14 FF     NOP $ff,X
  $DDB0: 22        ???
  $DDB1: FF 11 15  ISB $1511,X
  $DDB4: 13 03     SLO ($03),Y
  $DDB6: 12        ???
  $DDB7: FF 14 FF  ISB $ff14,X
  $DDBA: 23 FF     RLA ($ff,X)
  $DDBC: 10 14     BPL $ddd2
  $DDBE: 12        ???
  $DDBF: 03 21     SLO ($21,X)
  $DDC1: FF 23 FF  ISB $ff23,X
  $DDC4: 32        ???
  $DDC5: FF 10 15  ISB $1510,X
  $DDC8: 12        ???
  $DDC9: 03 21     SLO ($21,X)
  $DDCB: FF 24 FF  ISB $ff24,X
  $DDCE: 23 FF     RLA ($ff,X)
  $DDD0: 11 15     ORA ($15),Y
  $DDD2: 13 02     SLO ($02),Y
  $DDD4: 22        ???
  $DDD5: FF 24 FF  ISB $ff24,X
  $DDD8: 33 FF     RLA ($ff),Y
  $DDDA: 20 25 22  JSR $2225
  $DDDD: 13 31     SLO ($31),Y
  $DDDF: FF 33 FF  ISB $ff33,X
  $DDE2: 42        ???
  $DDE3: FF 20 25  ISB $2520,X
  $DDE6: 22        ???
  $DDE7: 13 31     SLO ($31),Y
  $DDE9: FF 33 FF  ISB $ff33,X
  $DDEC: 43 FF     SRE ($ff,X)
  $DDEE: 20 25 23  JSR $2325
  $DDF1: 12        ???
  $DDF2: 23 FF     RLA ($ff,X)
  $DDF4: 34 FF     NOP $ff,X
  $DDF6: 43 FF     SRE ($ff,X)
  $DDF8: 20 03 B0  JSR $b003
  $DDFB: 03 C0     SLO ($c0,X)
  $DDFD: 03 20     SLO ($20,X)
  $DDFF: 04 08     NOP $08
  $DE01: 08        PHP
  $DE02: 00        BRK
  $DE03: 09 05     ORA #$05
  $DE05: 09 00     ORA #$00
  $DE07: 00        BRK
  $DE08: B0 03     BCS $de0d
  $DE0A: C0 03     CPY #$03
  $DE0C: 20 04 08  JSR $0804
  $DE0F: 08        PHP
  $DE10: 00        BRK
  $DE11: 08        PHP
  $DE12: 05 08     ORA $08
  $DE14: 26 03     ROL $03
  $DE16: B1 03     LDA ($03),Y
  $DE18: C1 03     CMP ($03,X)
  $DE1A: 21 04     AND ($04,X)
  $DE1C: 09 08     ORA #$08
  $DE1E: 00        BRK
  $DE1F: 09 05     ORA #$05
  $DE21: 0A        ASL A
  $DE22: 00        BRK
  $DE23: 00        BRK
  $DE24: B1 03     LDA ($03),Y
  $DE26: C3 03     DCP ($03,X)
  $DE28: 23 04     RLA ($04,X)
  $DE2A: 0B 0B     ANC #$0b
  $DE2C: 00        BRK
  $DE2D: 0B 05     ANC #$05
  $DE2F: 0B 2C     ANC #$2c
  $DE31: 03 B2     SLO ($b2,X)
  $DE33: 03 C2     SLO ($c2,X)
  $DE35: 03 23     SLO ($23,X)
  $DE37: 04 09     NOP $09
  $DE39: 09 00     ORA #$00
  $DE3B: 0A        ASL A
  $DE3C: 06 0A     ASL $0a
  $DE3E: 00        BRK
  $DE3F: 00        BRK
  $DE40: B1 03     LDA ($03),Y
  $DE42: C3 03     DCP ($03,X)
  $DE44: 23 04     RLA ($04,X)
  $DE46: 0A        ASL A
  $DE47: 09 00     ORA #$00
  $DE49: 0B 06     ANC #$06
  $DE4B: 0B 33     ANC #$33
  $DE4D: 03 B3     SLO ($b3,X)
  $DE4F: 03 C3     SLO ($c3,X)
  $DE51: 03 24     SLO ($24,X)
  $DE53: 04 0A     NOP $0a
  $DE55: 0A        ASL A
  $DE56: 00        BRK
  $DE57: 0B 06     ANC #$06
  $DE59: 0B 00     ANC #$00
  $DE5B: 00        BRK
  $DE5C: B3 03     LAX ($03),Y
  $DE5E: C5 03     CMP $03
  $DE60: 2C 04 0B  BIT $0b04
  $DE63: 0E 00 15  ASL $1500
  $DE66: 05 0B     ORA $0b
  $DE68: 39 03 B4  AND $b403,Y
  $DE6B: 03 C4     SLO ($c4,X)
  $DE6D: 03 25     SLO ($25,X)
  $DE6F: 04 0B     NOP $0b
  $DE71: 0B 00     ANC #$00
  $DE73: 0D 07 0D  ORA $0d07
  $DE76: 00        BRK
  $DE77: 00        BRK
  $DE78: B8        CLV
  $DE79: 03 00     SLO ($00,X)
  $DE7B: 0D 28 04  ORA $0428
  $DE7E: 11 11     ORA ($11),Y
  $DE80: 00        BRK
  $DE81: 13 08     SLO ($08),Y
  $DE83: 0E 40 03  ASL $0340
  $DE86: B5 03     LDA $03,X
  $DE88: C5 03     CMP $03
  $DE8A: 26 04     ROL $04
  $DE8C: 0C 0C 00  NOP $000c
  $DE8F: 0E 08 0E  ASL $0e08
  $DE92: 00        BRK
  $DE93: 00        BRK
  $DE94: BE 03 CE  LDX $ce03,Y
  $DE97: 03 2E     SLO ($2e,X)
  $DE99: 04 16     NOP $16
  $DE9B: 16 00     ASL $00,X
  $DE9D: 15 0D     ORA $0d,X
  $DE9F: 15 46     ORA $46,X
  $DEA1: 03 B6     SLO ($b6,X)
  $DEA3: 03 C6     SLO ($c6,X)
  $DEA5: 03 2F     SLO ($2f,X)
  $DEA7: 04 0E     NOP $0e
  $DEA9: 0E 00 0F  ASL $0f00
  $DEAC: 08        PHP
  $DEAD: 0F 00 00  SLO $0000
  $DEB0: BA        TSX
  $DEB1: 03 CA     SLO ($ca,X)
  $DEB3: 03 2A     SLO ($2a,X)
  $DEB5: 04 14     NOP $14
  $DEB7: 16 00     ASL $00,X
  $DEB9: 19 0D 11  ORA $110d,Y
  $DEBC: 4D 03 B7  EOR $b703
  $DEBF: 03 C7     SLO ($c7,X)
  $DEC1: 03 28     SLO ($28,X)
  $DEC3: 04 0F     NOP $0f
  $DEC5: 0F 00 11  SLO $1100
  $DEC8: 09 11     ORA #$11
  $DECA: 00        BRK
  $DECB: 00        BRK
  $DECC: BA        TSX
  $DECD: 03 00     SLO ($00,X)
  $DECF: 07 2A     SLO $2a
  $DED1: 04 11     NOP $11
  $DED3: 14 00     NOP $00,X
  $DED5: 15 0D     ORA $0d,X
  $DED7: 11 53     ORA ($53),Y
  $DED9: 03 B8     SLO ($b8,X)
  $DEDB: 03 C8     SLO ($c8,X)
  $DEDD: 03 29     SLO ($29,X)
  $DEDF: 04 11     NOP $11
  $DEE1: 11 00     ORA ($00),Y
  $DEE3: 13 0A     SLO ($0a),Y
  $DEE5: 13 00     SLO ($00),Y
  $DEE7: 00        BRK
  $DEE8: BC 03 CC  LDY $cc03,X
  $DEEB: 03 2C     SLO ($2c,X)
  $DEED: 04 1B     NOP $1b
  $DEEF: 1B 00 1C  SLO $1c00,Y
  $DEF2: 1A        NOP
  $DEF3: 1C 5A 03  NOP $035a,X
  $DEF6: B9 03 C9  LDA $c903,Y
  $DEF9: 03 2A     SLO ($2a,X)
  $DEFB: 04 12     NOP $12
  $DEFD: 12        ???
  $DEFE: 00        BRK
  $DEFF: 15 0B     ORA $0b,X
  $DF01: 15 00     ORA $00,X
  $DF03: 00        BRK
  $DF04: 00        BRK
  $DF05: 00        BRK
  $DF06: 00        BRK
  $DF07: 00        BRK
  $DF08: 00        BRK
  $DF09: 00        BRK
  $DF0A: 00        BRK
  $DF0B: 00        BRK
  $DF0C: 00        BRK
  $DF0D: 00        BRK
  $DF0E: 00        BRK
  $DF0F: 00        BRK
  $DF10: 60        RTS
  $DF11: 03 BA     SLO ($ba,X)
  $DF13: 03 CA     SLO ($ca,X)
  $DF15: 03 2B     SLO ($2b,X)
  $DF17: 04 14     NOP $14
  $DF19: 14 00     NOP $00,X
  $DF1B: 17 0C     SLO $0c,X
  $DF1D: 17 00     SLO $00,X
  $DF1F: 00        BRK
  $DF20: 00        BRK
  $DF21: 03 A0     SLO ($a0,X)
  $DF23: 02        ???
  $DF24: 33 04     RLA ($04),Y
  $DF26: 1B 28 00  SLO $0028,Y
  $DF29: 30 0C     BMI $df37
  $DF2B: 29 66     AND #$66
  $DF2D: 03 BB     SLO ($bb,X)
  $DF2F: 03 CB     SLO ($cb,X)
  $DF31: 03 2C     SLO ($2c,X)
  $DF33: 04 16     NOP $16
  $DF35: 16 00     ASL $00,X
  $DF37: 19 0E 19  ORA $190e,Y
  $DF3A: 00        BRK
  $DF3B: 00        BRK
  $DF3C: 00        BRK
  $DF3D: 00        BRK
  $DF3E: 00        BRK
  $DF3F: 00        BRK
  $DF40: 00        BRK
  $DF41: 00        BRK
  $DF42: 00        BRK
  $DF43: 00        BRK
  $DF44: 00        BRK
  $DF45: 00        BRK
  $DF46: 00        BRK
  $DF47: 00        BRK
  $DF48: 6D 03 BC  ADC $bc03
  $DF4B: 03 CC     SLO ($cc,X)
  $DF4D: 03 2D     SLO ($2d,X)
  $DF4F: 04 19     NOP $19
  $DF51: 19 00 1C  ORA $1c00,Y
  $DF54: 0F 1C 00  SLO $001c
  $DF57: 00        BRK
  $DF58: 00        BRK
  $DF59: 00        BRK
  $DF5A: 00        BRK
  $DF5B: 00        BRK
  $DF5C: 00        BRK
  $DF5D: 00        BRK
  $DF5E: 00        BRK
  $DF5F: 00        BRK
  $DF60: 00        BRK
  $DF61: 00        BRK
  $DF62: 00        BRK
  $DF63: 00        BRK
  $DF64: 73 03     RRA ($03),Y
  $DF66: BD 03 CD  LDA $cd03,X
  $DF69: 03 2E     SLO ($2e,X)
  $DF6B: 04 1B     NOP $1b
  $DF6D: 1B 00 1F  SLO $1f00,Y
  $DF70: 11 1F     ORA ($1f),Y
  $DF72: 00        BRK
  $DF73: 00        BRK
  $DF74: 00        BRK
  $DF75: 00        BRK
  $DF76: 00        BRK
  $DF77: 00        BRK
  $DF78: 00        BRK
  $DF79: 00        BRK
  $DF7A: 00        BRK
  $DF7B: 00        BRK
  $DF7C: 00        BRK
  $DF7D: 00        BRK
  $DF7E: 00        BRK
  $DF7F: 00        BRK
  $DF80: 7A        NOP
  $DF81: 03 BE     SLO ($be,X)
  $DF83: 03 CE     SLO ($ce,X)
  $DF85: 03 2F     SLO ($2f,X)
  $DF87: 04 1E     NOP $1e
  $DF89: 1E 00 22  ASL $2200,X
  $DF8C: 12        ???
  $DF8D: 22        ???
  $DF8E: 00        BRK
  $DF8F: 00        BRK
  $DF90: C1 03     CMP ($03,X)
  $DF92: D1 03     CMP ($03),Y
  $DF94: 31 04     AND ($04),Y
  $DF96: 30 30     BMI $dfc8
  $DF98: 00        BRK
  $DF99: 25 1D     AND $1d
  $DF9B: 25 80     AND $80
  $DF9D: 03 C0     SLO ($c0,X)
  $DF9F: 03 D0     SLO ($d0,X)
  $DFA1: 03 30     SLO ($30,X)
  $DFA3: 04 21     NOP $21
  $DFA5: 21 00     AND ($00,X)
  $DFA7: 25 14     AND $14
  $DFA9: 25 00     AND $00
  $DFAB: 00        BRK
  $DFAC: C5 03     CMP $03
  $DFAE: D5 03     CMP $03,X
  $DFB0: 35 04     AND $04,X
  $DFB2: 35 47     AND $47,X
  $DFB4: 00        BRK
  $DFB5: 25 1D     AND $1d
  $DFB7: 1A        NOP
  $DFB8: 87 03     SAX $03
  $DFBA: C1 03     CMP ($03,X)
  $DFBC: D1 03     CMP ($03),Y
  $DFBE: 31 04     AND ($04),Y
  $DFC0: 24 24     BIT $24
  $DFC2: 00        BRK
  $DFC3: 29 16     AND #$16
  $DFC5: 29 00     AND #$00
  $DFC7: 00        BRK
  $DFC8: C2 03     NOP #$03
  $DFCA: D2        ???
  $DFCB: 03 32     SLO ($32,X)
  $DFCD: 04 28     NOP $28
  $DFCF: 28        PLP
  $DFD0: 00        BRK
  $DFD1: 20 23 20  JSR $2023
  $DFD4: 8D 03 C2  STA $c203
  $DFD7: 03 D2     SLO ($d2,X)
  $DFD9: 03 32     SLO ($32,X)
  $DFDB: 04 28     NOP $28
  $DFDD: 28        PLP
  $DFDE: 00        BRK
  $DFDF: 2D 19 2D  AND $2d19
  $DFE2: 00        BRK
  $DFE3: 00        BRK
  $DFE4: 00        BRK
  $DFE5: 0C D4 03  NOP $03d4
  $DFE8: 34 04     NOP $04,X
  $DFEA: 30 30     BMI $e01c
  $DFEC: 00        BRK
  $DFED: 37 2A     RLA $2a,X
  $DFEF: 20 94 03  JSR $0394
  $DFF2: C3 03     DCP ($03,X)
  $DFF4: D3 03     DCP ($03),Y
  $DFF6: 33 04     RLA ($04),Y
  $DFF8: 2C 2C 00  BIT $002c
  $DFFB: 32        ???
  $DFFC: 1B 32 00  SLO $0032,Y
  $DFFF: 00        BRK
  $E000: C7 03     DCP $03
  $E002: D7 03     DCP $03,X
  $E004: 37 04     RLA $04,X
  $E006: 47 47     SRE $47
  $E008: 00        BRK
  $E009: 2D 2F 3C  AND $3c2f
  $E00C: 9A        TXS
  $E00D: 03 C4     SLO ($c4,X)
  $E00F: 03 D4     SLO ($d4,X)
  $E011: 03 34     SLO ($34,X)
  $E013: 04 30     NOP $30
  $E015: 30 00     BMI $e017
  $E017: 37 1E     RLA $1e,X
  $E019: 37 00     RLA $00,X
  $E01B: 00        BRK
  $E01C: C2 03     NOP #$03
  $E01E: D2        ???
  $E01F: 03 32     SLO ($32,X)
  $E021: 04 2C     NOP $2c
  $E023: 3B 00 32  RLA $3200,Y
  $E026: 20 29 A1  JSR $a129
  $E029: 03 C5     SLO ($c5,X)
  $E02B: 03 D5     SLO ($d5,X)
  $E02D: 03 35     SLO ($35,X)
  $E02F: 04 35     NOP $35
  $E031: 35 00     AND $00,X
  $E033: 3C 21 3C  NOP $3c21,X
  $E036: 00        BRK
  $E037: 00        BRK
  $E038: C4 03     CPY $03
  $E03A: D4 03     NOP $03,X
  $E03C: 34 04     NOP $04,X
  $E03E: 30 30     BMI $e070
  $E040: 00        BRK
  $E041: 32        ???
  $E042: 20 29 A7  JSR $a729
  $E045: 03 C6     SLO ($c6,X)
  $E047: 03 D6     SLO ($d6,X)
  $E049: 03 36     SLO ($36,X)
  $E04B: 04 3B     NOP $3b
  $E04D: 3B 00 42  RLA $4200,Y
  $E050: 25 42     AND $42
  $E052: 00        BRK
  $E053: 00        BRK
  $E054: C4 03     CPY $03
  $E056: D4 03     NOP $03,X
  $E058: 34 04     NOP $04,X
  $E05A: 30 30     BMI $e08c
  $E05C: 00        BRK
  $E05D: 50 2A     BVC $e089
  $E05F: 37 AD     RLA $ad,X
  $E061: 03 C7     SLO ($c7,X)
  $E063: 03 D7     SLO ($d7,X)
  $E065: 03 37     SLO ($37,X)
  $E067: 04 41     NOP $41
  $E069: 41 00     EOR ($00,X)
  $E06B: 47 28     SRE $28
  $E06D: 47 00     SRE $00
  $E06F: 00        BRK
  $E070: C6 03     DEC $03
  $E072: D6 03     DEC $03,X
  $E074: 36 04     ROL $04,X
  $E076: 2C 41 00  BIT $0041
  $E079: 32        ???
  $E07A: 26 32     ROL $32
  $E07C: B4 03     LDY $03,X
  $E07E: C8        INY
  $E07F: 03 D8     SLO ($d8,X)
  $E081: 03 38     SLO ($38,X)
  $E083: 04 47     NOP $47
  $E085: 47 00     SRE $00
  $E087: 50 2C     BVC $e0b5
  $E089: 50 00     BVC $e08b
  $E08B: 00        BRK
  $E08C: 00        BRK
  $E08D: 03 A0     SLO ($a0,X)
  $E08F: 02        ???
  $E090: 39 04 56  AND $5604,Y
  $E093: 73 00     RRA ($00),Y
  $E095: 58        CLI
  $E096: 3E 50 BA  ROL $ba50,X
  $E099: 03 C9     SLO ($c9,X)
  $E09B: 03 D9     SLO ($d9,X)
  $E09D: 03 39     SLO ($39,X)
  $E09F: 04 4E     NOP $4e
  $E0A1: 4E 00 58  LSR $5800
  $E0A4: 31 58     AND ($58),Y
  $E0A6: 00        BRK
  $E0A7: 00        BRK
  $E0A8: C7 03     DCP $03
  $E0AA: D7 03     DCP $03,X
  $E0AC: 37 04     RLA $04,X
  $E0AE: 4E 41 00  LSR $0041
  $E0B1: 35 33     AND $33,X
  $E0B3: 42        ???
  $E0B4: C1 03     CMP ($03,X)
  $E0B6: CA        DEX
  $E0B7: 03 DA     SLO ($da,X)
  $E0B9: 03 3A     SLO ($3a,X)
  $E0BB: 04 56     NOP $56
  $E0BD: 56 00     LSR $00,X
  $E0BF: 61 36     ADC ($36,X)
  $E0C1: 61 00     ADC ($00,X)
  $E0C3: 00        BRK
  $E0C4: C5 03     CMP $03
  $E0C6: D8        CLD
  $E0C7: 03 38     SLO ($38,X)
  $E0C9: 04 4E     NOP $4e
  $E0CB: 4E 00 42  LSR $4200
  $E0CE: 31 47     AND ($47),Y
  $E0D0: C7 03     DCP $03
  $E0D2: CB 03     AXS #$03
  $E0D4: DB 03 3B  DCP $3b03,Y
  $E0D7: 04 5F     NOP $5f
  $E0D9: 5F 00 6B  SRE $6b00,X
  $E0DC: 3B 6B 00  RLA $006b,Y
  $E0DF: 00        BRK
  $E0E0: CB 03     AXS #$03
  $E0E2: DB 03 3B  DCP $3b03,Y
  $E0E5: 04 68     NOP $68
  $E0E7: 5F 00 3C  SRE $3c00,X
  $E0EA: 33 42     RLA ($42),Y
  $E0EC: CE 03 CC  DEC $cc03
  $E0EF: 03 DC     SLO ($dc,X)
  $E0F1: 03 3C     SLO ($3c,X)
  $E0F3: 04 68     NOP $68
  $E0F5: 68        PLA
  $E0F6: 00        BRK
  $E0F7: 75 41     ADC $41,X
  $E0F9: 75 00     ADC $00,X
  $E0FB: 00        BRK
  $E0FC: CC 03 DC  CPY $dc03
  $E0FF: 03 3C     SLO ($3c,X)
  $E101: 04 68     NOP $68
  $E103: 68        PLA
  $E104: 00        BRK
  $E105: 44 38     NOP $38
  $E107: 47 D4     SRE $d4
  $E109: 03 CD     SLO ($cd,X)
  $E10B: 03 DD     SLO ($dd,X)
  $E10D: 03 3D     SLO ($3d,X)
  $E10F: 04 73     NOP $73
  $E111: 73 00     RRA ($00),Y
  $E113: 81 48     STA ($48,X)
  $E115: 81 00     STA ($00,X)
  $E117: 00        BRK
  $E118: CD 03 DD  CMP $dd03
  $E11B: 03 3D     SLO ($3d,X)
  $E11D: 04 73     NOP $73
  $E11F: 73 00     RRA ($00),Y
  $E121: 47 48     SRE $48
  $E123: 61 DB     ADC ($db,X)
  $E125: 03 CE     SLO ($ce,X)
  $E127: 03 DE     SLO ($de,X)
  $E129: 03 3E     SLO ($3e,X)
  $E12B: 04 7E     NOP $7e
  $E12D: 7E 00 8E  ROR $8e00,X
  $E130: 4F 8E 00  SRE $008e
  $E133: 00        BRK
  $E134: 00        BRK
  $E135: 00        BRK
  $E136: 00        BRK
  $E137: 00        BRK
  $E138: 00        BRK
  $E139: 00        BRK
  $E13A: 00        BRK
  $E13B: 00        BRK
  $E13C: 00        BRK
  $E13D: 00        BRK
  $E13E: 00        BRK
  $E13F: 00        BRK
  $E140: E1 03     SBC ($03,X)
  $E142: CF 03 DF  DCP $df03
  $E145: 03 3F     SLO ($3f,X)
  $E147: 04 8B     NOP $8b
  $E149: 8B 00     XAA #$00
  $E14B: 9D 57 9D  STA $9d57,X
  $E14E: 00        BRK
  $E14F: 00        BRK
  $E150: 00        BRK
  $E151: 00        BRK
  $E152: 00        BRK
  $E153: 00        BRK
  $E154: 00        BRK
  $E155: 00        BRK
  $E156: 00        BRK
  $E157: 00        BRK
  $E158: 00        BRK
  $E159: 00        BRK
  $E15A: 00        BRK
  $E15B: 00        BRK
  $E15C: E8        INX
  $E15D: 03 D0     SLO ($d0,X)
  $E15F: 03 E0     SLO ($e0,X)
  $E161: 03 40     SLO ($40,X)
  $E163: 04 99     NOP $99
  $E165: 99 00 AC  STA $ac00,Y
  $E168: 5F AC 00  SRE $00ac,X
  $E16B: 00        BRK
  $E16C: 00        BRK
  $E16D: 00        BRK
  $E16E: 00        BRK
  $E16F: 00        BRK
  $E170: 00        BRK
  $E171: 00        BRK
  $E172: 00        BRK
  $E173: 00        BRK
  $E174: 00        BRK
  $E175: 00        BRK
  $E176: 00        BRK
  $E177: 00        BRK
  $E178: 20 03 0C  JSR $0c03
  $E17B: 09 0B     ORA #$0b
  $E17D: 26 03     ROL $03
  $E17F: 0D 09 0C  ORA $0c09
  $E182: 2C 03 0E  BIT $0e03
  $E185: 0A        ASL A
  $E186: 0D 33 03  ORA $0333
  $E189: 0F 0B 0E  SLO $0e0b
  $E18C: 39 03 11  AND $1103,Y
  $E18F: 0D 10 40  ORA $4010
  $E192: 03 13     SLO ($13,X)
  $E194: 0E 11 46  ASL $4611
  $E197: 03 15     SLO ($15,X)
  $E199: 0F 13 4D  SLO $4d13
  $E19C: 03 17     SLO ($17,X)
  $E19E: 11 15     ORA ($15),Y
  $E1A0: 53 03     SRE ($03),Y
  $E1A2: 19 13 17  ORA $1713,Y
  $E1A5: 5A        NOP
  $E1A6: 03 1C     SLO ($1c,X)
  $E1A8: 15 19     ORA $19,X
  $E1AA: 60        RTS
  $E1AB: 03 2A     SLO ($2a,X)
  $E1AD: 17 1C     SLO $1c,X
  $E1AF: 66 03     ROR $03
  $E1B1: 2F 19 1F  RLA $1f19
  $E1B4: 6D 03 33  ADC $3303
  $E1B7: 1C 22 73  NOP $7322,X
  $E1BA: 03 39     SLO ($39,X)
  $E1BC: 1F 25 7A  SLO $7a25,X
  $E1BF: 03 3E     SLO ($3e,X)
  $E1C1: 22        ???
  $E1C2: 29 80     AND #$80
  $E1C4: 03 45     SLO ($45,X)
  $E1C6: 25 2D     AND $2d
  $E1C8: 87 03     SAX $03
  $E1CA: 4B 29     ALR #$29
  $E1CC: 32        ???
  $E1CD: 8D 03 53  STA $5303
  $E1D0: 2D 37 94  AND $9437
  $E1D3: 03 5B     SLO ($5b,X)
  $E1D5: 32        ???
  $E1D6: 3D 9A 03  AND $039a,X
  $E1D9: 65 37     ADC $37
  $E1DB: 43 A1     SRE ($a1,X)
  $E1DD: 03 6F     SLO ($6f,X)
  $E1DF: 3C 4A A7  NOP $a74a,X
  $E1E2: 03 7A     SLO ($7a,X)
  $E1E4: 42        ???
  $E1E5: 51 AD     EOR ($ad),Y
  $E1E7: 03 86     SLO ($86,X)
  $E1E9: 49 59     EOR #$59
  $E1EB: B4 03     LDY $03,X
  $E1ED: 94 50     STY $50,X
  $E1EF: 62        ???
  $E1F0: BA        TSX
  $E1F1: 03 C2     SLO ($c2,X)
  $E1F3: 58        CLI
  $E1F4: 6C C1 03  JMP ($03c1)
  $E1F7: D3 61     DCP ($61),Y
  $E1F9: 77 C7     RRA $c7,X
  $E1FB: 03 E4     SLO ($e4,X)
  $E1FD: 6B 83     ARR #$83
  $E1FF: CE 03 E8  DEC $e803
  $E202: 75 90     ADC $90,X
  $E204: D4 03     NOP $03,X
  $E206: FF 81 9E  ISB $9e81,X
  $E209: DB 03 FF  DCP $ff03,Y
  $E20C: 8E AE E1  STX $e1ae
  $E20F: 03 FF     SLO ($ff,X)
  $E211: 9D BF E8  STA $e8bf,X
  $E214: 03 FF     SLO ($ff,X)
  $E216: AC D3 00  LDY $00d3
  $E219: 00        BRK
  $E21A: FF AF CF  ISB $cfaf,X
  $E21D: 01 02     ORA ($02,X)
  $E21F: 03 04     SLO ($04,X)
  $E221: 05 06     ORA $06
  $E223: 00        BRK
  $E224: 00        BRK
  $E225: 00        BRK
  $E226: 00        BRK
  $E227: 00        BRK
  $E228: 00        BRK
  $E229: 00        BRK
  $E22A: 07 08     SLO $08
  $E22C: 08        PHP
  $E22D: 09 0A     ORA #$0a
  $E22F: 0B 0C     ANC #$0c
  $E231: 0D 01 0E  ORA $0e01
  $E234: 0F 10 02  SLO $0210
  $E237: 11 00     ORA ($00),Y
  $E239: 00        BRK
  $E23A: 00        BRK
  $E23B: 00        BRK
  $E23C: 00        BRK
  $E23D: 00        BRK
  $E23E: 00        BRK
  $E23F: 00        BRK
  $E240: 00        BRK
  $E241: 00        BRK
  $E242: 00        BRK
  $E243: 0F 0F 05  SLO $050f
  $E246: 08        PHP
  $E247: 08        PHP
  $E248: 00        BRK
  $E249: 04 04     NOP $04
  $E24B: 04 00     NOP $00
  $E24D: 00        BRK
  $E24E: 00        BRK
  $E24F: 00        BRK
  $E250: 00        BRK
  $E251: 00        BRK
  $E252: 00        BRK
  $E253: 00        BRK
  $E254: 00        BRK
  $E255: 00        BRK
  $E256: 00        BRK
  $E257: 0F 0F 00  SLO $000f
  $E25A: 01 02     ORA ($02,X)
  $E25C: 00        BRK
  $E25D: 00        BRK
  $E25E: 00        BRK
  $E25F: 00        BRK
  $E260: 00        BRK
  $E261: 00        BRK
  $E262: 00        BRK
  $E263: 00        BRK
  $E264: 02        ???
  $E265: 00        BRK
  $E266: 00        BRK
  $E267: 00        BRK
  $E268: 00        BRK
  $E269: 00        BRK
  $E26A: 00        BRK
  $E26B: 00        BRK
  $E26C: 00        BRK
  $E26D: 0F 00 00  SLO $0000
  $E270: 00        BRK
  $E271: 03 00     SLO ($00,X)
  $E273: 02        ???
  $E274: 00        BRK
  $E275: 00        BRK
  $E276: 00        BRK
  $E277: 00        BRK
  $E278: 00        BRK
  $E279: 00        BRK
  $E27A: 00        BRK
  $E27B: 01 01     ORA ($01,X)
  $E27D: 01 00     ORA ($00,X)
  $E27F: 00        BRK
  $E280: 00        BRK
  $E281: 0F 00 02  SLO $0200
  $E284: 00        BRK
  $E285: 06 02     ASL $02
  $E287: 00        BRK
  $E288: 00        BRK
  $E289: 00        BRK
  $E28A: 0F 00 01  SLO $0100
  $E28D: 02        ???
  $E28E: 00        BRK
  $E28F: 00        BRK
  $E290: 00        BRK
  $E291: 00        BRK
  $E292: 00        BRK
  $E293: 00        BRK
  $E294: 00        BRK
  $E295: 0F 00 00  SLO $0000
  $E298: 00        BRK
  $E299: 06 00     ASL $00
  $E29B: 04 00     NOP $00
  $E29D: 00        BRK
  $E29E: 00        BRK
  $E29F: 00        BRK
  $E2A0: 01 03     ORA ($03,X)
  $E2A2: 00        BRK
  $E2A3: 00        BRK
  $E2A4: 00        BRK
  $E2A5: 00        BRK
  $E2A6: 00        BRK
  $E2A7: 00        BRK
  $E2A8: 00        BRK
  $E2A9: 0F 02 05  SLO $0502
  $E2AC: 00        BRK
  $E2AD: 04 05     NOP $05
  $E2AF: 04 00     NOP $00
  $E2B1: 09 00     ORA #$00
  $E2B3: 00        BRK
  $E2B4: 02        ???
  $E2B5: 06 00     ASL $00
  $E2B7: 0A        ASL A
  $E2B8: 00        BRK
  $E2B9: 00        BRK
  $E2BA: 00        BRK
  $E2BB: 00        BRK
  $E2BC: 00        BRK
  $E2BD: 00        BRK
  $E2BE: 02        ???
  $E2BF: 03 00     SLO ($00,X)
  $E2C1: 00        BRK
  $E2C2: 00        BRK
  $E2C3: 00        BRK
  $E2C4: 00        BRK
  $E2C5: 00        BRK
  $E2C6: 00        BRK
  $E2C7: 00        BRK
  $E2C8: 01 01     ORA ($01,X)
  $E2CA: 00        BRK
  $E2CB: 01 00     ORA ($00,X)
  $E2CD: 00        BRK
  $E2CE: 00        BRK
  $E2CF: 0F 0F 0C  SLO $0c0f
  $E2D2: 08        PHP
  $E2D3: 08        PHP
  $E2D4: 00        BRK
  $E2D5: 04 01     NOP $01
  $E2D7: 04 00     NOP $00
  $E2D9: 0F 00 0F  SLO $0f00
  $E2DC: 08        PHP
  $E2DD: 08        PHP
  $E2DE: 00        BRK
  $E2DF: 0C 07 0F  NOP $0f07
  $E2E2: 00        BRK
  $E2E3: 0F 0F 0B  SLO $0b0f
  $E2E6: 01 02     ORA ($02,X)
  $E2E8: 00        BRK
  $E2E9: 00        BRK
  $E2EA: 00        BRK
  $E2EB: 00        BRK
  $E2EC: 00        BRK
  $E2ED: 00        BRK
  $E2EE: 00        BRK
  $E2EF: 00        BRK
  $E2F0: 00        BRK
  $E2F1: 0F 03 03  SLO $0303
  $E2F4: 00        BRK
  $E2F5: 0F 0C 0C  SLO $0c0c
  $E2F8: 00        BRK
  $E2F9: 05 02     ORA $02
  $E2FB: 01 02     ORA ($02,X)
  $E2FD: 02        ???
  $E2FE: 01 00     ORA ($00,X)
  $E300: 00        BRK
  $E301: 00        BRK
  $E302: 00        BRK
  $E303: 00        BRK
  $E304: 00        BRK
  $E305: 00        BRK
  $E306: 02        ???
  $E307: 03 03     SLO ($03,X)
  $E309: 01 00     ORA ($00,X)
  $E30B: 03 06     SLO ($06,X)
  $E30D: 00        BRK
  $E30E: 00        BRK
  $E30F: 01 05     ORA ($05,X)
  $E311: 05 00     ORA $00
  $E313: 03 01     SLO ($01,X)
  $E315: 01 02     ORA ($02,X)
  $E317: 04 05     NOP $05
  $E319: 02        ???
  $E31A: 06 06     ASL $06
  $E31C: 06 0A     ASL $0a
  $E31E: 05 02     ORA $02
  $E320: 04 07     NOP $07
  $E322: 06 09     ASL $09
  $E324: 0D 07 07  ORA $0707
  $E327: 08        PHP
  $E328: 08        PHP
  $E329: 08        PHP
  $E32A: 0B 09     ANC #$09
  $E32C: 0B 0A     ANC #$0a
  $E32E: 0A        ASL A
  $E32F: 0A        ASL A
  $E330: 0D 0B 12  ORA $120b
  $E333: 0D 12 0E  ORA $0e12
  $E336: 12        ???
  $E337: 0F 00 11  SLO $1100
  $E33A: 14 12     NOP $12,X
  $E33C: 00        BRK
  $E33D: 14 00     NOP $00,X
  $E33F: 16 00     ASL $00,X
  $E341: 18        CLC
  $E342: 22        ???
  $E343: 1A        NOP
  $E344: 2D 1D 24  AND $241d
  $E347: 20 2D 23  JSR $232d
  $E34A: 2D 26 2D  AND $2d26
  $E34D: 29 36     AND #$36
  $E34F: 2D 36 32  AND $3236
  $E352: 41 36     EOR ($36,X)
  $E354: 41 3C     EOR ($3c,X)
  $E356: 2D 41 4E  AND $4e41
  $E359: 47 41     SRE $41
  $E35B: 4E 47 55  LSR $5547
  $E35E: 66 5E     ROR $5e
  $E360: 00        BRK
  $E361: 66 00     ROR $00
  $E363: 70 00     BVS $e365
  $E365: 07 08     SLO $08
  $E367: 08        PHP
  $E368: 09 0A     ORA #$0a
  $E36A: 0A        ASL A
  $E36B: 0B 0D     ANC #$0d
  $E36D: 0E 0F 11  ASL $110f
  $E370: 12        ???
  $E371: 14 16     NOP $16,X
  $E373: 18        CLC
  $E374: 1A        NOP
  $E375: 1D 20 23  ORA $2320,X
  $E378: 26 29     ROL $29
  $E37A: 2D 32 36  AND $3632
  $E37D: 3C 41 47  NOP $4741,X
  $E380: 4E 55 5E  LSR $5e55
  $E383: 66 70     ROR $70
  $E385: 7A        NOP
  $E386: 85 90     STA $90
  $E388: A0 AF     LDY #$af
  $E38A: BF D1 E5  LAX $e5d1,Y
  $E38D: F8        SED
  $E38E: F9 FA FB  SBC $fbfa,Y
  $E391: FC FD FE  NOP $fefd,X
  $E394: FF F9 E4  ISB $e4f9,X
  $E397: 1C E5 65  NOP $65e5,X
  $E39A: E7 89     ISB $89
  $E39C: E7 82     ISB $82
  $E39E: E7 C1     ISB $c1
  $E3A0: E7 EC     ISB $ec
  $E3A2: EF F4 EF  ISB $eff4
  $E3A5: 04 F0     NOP $f0
  $E3A7: E8        INX
  $E3A8: F6 31     INC $31,X
  $E3AA: F2        ???
  $E3AB: 55 F2     EOR $f2,X
  $E3AD: 49 F9     EOR #$f9
  $E3AF: 94 F2     STY $f2,X
  $E3B1: 3A        NOP
  $E3B2: F3 3F     ISB ($3f),Y
  $E3B4: F3 B4     ISB ($b4),Y
  $E3B6: F4 BA     NOP $ba,X
  $E3B8: F4 C0     NOP $c0,X
  $E3BA: F4 C6     NOP $c6,X
  $E3BC: F4 CC     NOP $cc,X
  $E3BE: F4 D2     NOP $d2,X
  $E3C0: F4 D8     NOP $d8,X
  $E3C2: F4 DE     NOP $de,X
  $E3C4: F4 E4     NOP $e4,X
  $E3C6: F4 EA     NOP $ea,X
  $E3C8: F4 F0     NOP $f0,X
  $E3CA: F4 F6     NOP $f6,X
  $E3CC: F4 FC     NOP $fc,X
  $E3CE: F4 02     NOP $02,X
  $E3D0: F5 08     SBC $08,X
  $E3D2: F5 0E     SBC $0e,X
  $E3D4: F5 13     SBC $13,X
  $E3D6: F5 19     SBC $19,X
  $E3D8: F5 1F     SBC $1f,X
  $E3DA: F5 25     SBC $25,X
  $E3DC: F5 40     SBC $40,X
  $E3DE: F5 45     SBC $45,X
  $E3E0: F5 4A     SBC $4a,X
  $E3E2: F5 6E     SBC $6e,X
  $E3E4: F5 74     SBC $74,X
  $E3E6: F5 79     SBC $79,X
  $E3E8: F5 7F     SBC $7f,X
  $E3EA: F5 85     SBC $85,X
  $E3EC: F5 8A     SBC $8a,X
  $E3EE: F5 90     SBC $90,X
  $E3F0: F5 96     SBC $96,X
  $E3F2: F5 2B     SBC $2b,X
  $E3F4: EA        NOP
  $E3F5: B2        ???
  $E3F6: EF B7 EF  ISB $efb7
  $E3F9: 9C F5 A1  SHY $a1f5,X
  $E3FC: F5 A6     SBC $a6,X
  $E3FE: F5 B0     SBC $b0,X
  $E400: F5 BF     SBC $bf,X
  $E402: F5 E8     SBC $e8,X
  $E404: F5 BA     SBC $ba,X
  $E406: F5 29     SBC $29,X
  $E408: F3 36     ISB ($36),Y
  $E40A: F4 85     NOP $85,X
  $E40C: F4 8B     NOP $8b,X
  $E40E: F4 91     NOP $91,X
  $E410: F4 97     NOP $97,X
  $E412: F4 EF     NOP $ef,X
  $E414: F5 B5     SBC $b5,X
  $E416: ED A2 F4  SBC $f4a2
  $E419: A8        TAY
  $E41A: F4 AE     NOP $ae,X
  $E41C: F4 AE     NOP $ae,X
  $E41E: EA        NOP
  $E41F: BE EA B3  LDX $b3ea,Y
  $E422: EA        NOP
  $E423: C2 EA     NOP #$ea
  $E425: A6 EB     LDX $eb
  $E427: BC EB AB  LDY $abeb,X
  $E42A: EB C0     SBC #$c0
  $E42C: EB 31     SBC #$31
  $E42E: F5 36     SBC $36,X
  $E430: F5 3B     SBC $3b,X
  $E432: F5 53     SBC $53,X
  $E434: F5 58     SBC $58,X
  $E436: F5 61     SBC $61,X
  $E438: F2        ???
  $E439: 9D F4 2B  STA $2bf4,X
  $E43C: F5 68     SBC $68,X
  $E43E: F5 5D     SBC $5d,X
  $E440: F5 63     SBC $63,X
  $E442: F5 ED     SBC $ed,X
  $E444: F6 F5     INC $f5,X
  $E446: F6 A4     INC $a4,X
  $E448: ED FD F6  SBC $f6fd
  $E44B: 2F F7 35  RLA $35f7
  $E44E: F7 3B     ISB $3b,X
  $E450: F7 41     ISB $41,X
  $E452: F7 47     ISB $47,X
  $E454: F7 4D     ISB $4d,X
  $E456: F7 53     ISB $53,X
  $E458: F7 59     ISB $59,X
  $E45A: F7 5F     ISB $5f,X
  $E45C: F7 65     ISB $65,X
  $E45E: F7 6B     ISB $6b,X
  $E460: F7 71     ISB $71,X
  $E462: F7 77     ISB $77,X
  $E464: F7 7D     ISB $7d,X
  $E466: F7 83     ISB $83,X
  $E468: F7 89     ISB $89,X
  $E46A: F7 8F     ISB $8f,X
  $E46C: F7 95     ISB $95,X
  $E46E: F7 9F     ISB $9f,X
  $E470: F7 A9     ISB $a9,X
  $E472: F7 B3     ISB $b3,X
  $E474: F7 BD     ISB $bd,X
  $E476: F7 C7     ISB $c7,X
  $E478: F7 D1     ISB $d1,X
  $E47A: F7 DB     ISB $db,X
  $E47C: F7 E5     ISB $e5,X
  $E47E: F7 EF     ISB $ef,X
  $E480: F7 F9     ISB $f9,X
  $E482: F7 03     ISB $03,X
  $E484: F8        SED
  $E485: 09 F8     ORA #$f8
  $E487: 0F F8 19  SLO $19f8
  $E48A: F8        SED
  $E48B: 23 F8     RLA ($f8,X)
  $E48D: 2D F8 33  AND $33f8
  $E490: F8        SED
  $E491: 3D F8 43  AND $43f8,X
  $E494: F8        SED
  $E495: 49 F8     EOR #$f8
  $E497: 4F F8 55  SRE $55f8
  $E49A: F8        SED
  $E49B: 5B F8 E7  SRE $e7f8,Y
  $E49E: E7 61     ISB $61
  $E4A0: F8        SED
  $E4A1: A3 E7     LAX ($e7,X)
  $E4A3: 9C E7 67  SHY $67e7,X
  $E4A6: F8        SED
  $E4A7: 6D F8 73  ADC $73f8
  $E4AA: F8        SED
  $E4AB: 79 F8 7F  ADC $7ff8,Y
  $E4AE: F8        SED
  $E4AF: 85 F8     STA $f8
  $E4B1: 8B F8     XAA #$f8
  $E4B3: 91 F8     STA ($f8),Y
  $E4B5: 97 F8     SAX $f8,Y
  $E4B7: A1 F8     LDA ($f8,X)
  $E4B9: AB F8     ATX #$f8
  $E4BB: B5 F8     LDA $f8,X
  $E4BD: BF F8 C9  LAX $c9f8,Y
  $E4C0: F8        SED
  $E4C1: D3 F8     DCP ($f8),Y
  $E4C3: D9 F8 FB  CMP $fbf8,Y
  $E4C6: F3 E7     ISB ($e7),Y
  $E4C8: F8        SED
  $E4C9: F5 F8     SBC $f8,X
  $E4CB: 33 F9     RLA ($f9),Y
  $E4CD: 39 F9 D4  AND $d4f9,Y
  $E4D0: EB EB     SBC #$eb
  $E4D2: EB 7B     SBC #$7b
  $E4D4: EA        NOP
  $E4D5: 92        ???
  $E4D6: EA        NOP
  $E4D7: DE EF E5  DEC $e5ef,X
  $E4DA: EF 99 F2  ISB $f299
  $E4DD: 8F EB 9F  SAX $9feb
  $E4E0: EB FE     SBC #$fe
  $E4E2: EC 13 ED  CPX $ed13
  $E4E5: 28        PLP
  $E4E6: ED 43 ED  SBC $ed43
  $E4E9: 58        CLI
  $E4EA: ED 60 ED  SBC $ed60
  $E4ED: 19 ED 21  ORA $21ed,Y
  $E4F0: ED 67 ED  SBC $ed67
  $E4F3: 72        ???
  $E4F4: ED 7C ED  SBC $ed7c
  $E4F7: 84 ED     STY $ed
  $E4F9: 01 FF     ORA ($ff,X)
  $E4FB: FF FF FF  ISB $ffff,X
  $E4FE: F6 F2     INC $f2,X
  $E500: 00        BRK
  $E501: 3C 2A 3D  NOP $3d2a,X
  $E504: 13 F0     SLO ($f0),Y
  $E506: 11 E5     ORA ($e5),Y
  $E508: F5 F6     SBC $f6,X
  $E50A: F2        ???
  $E50B: 00        BRK
  $E50C: 3C 2A 3D  NOP $3d2a,X
  $E50F: 13 F5     SLO ($f5),Y
  $E511: F2        ???
  $E512: 06 F6     ASL $f6
  $E514: F7 39     ISB $39,X
  $E516: 0A        ASL A
  $E517: 39 2A 36  AND $362a,Y
  $E51A: 2F FF F6  RLA $f6ff
  $E51D: F2        ???
  $E51E: 00        BRK
  $E51F: 3C 2A 3D  NOP $3d2a,X
  $E522: 13 F6     SLO ($f6),Y
  $E524: F4 00     NOP $00,X
  $E526: F7 20     ISB $20,X
  $E528: 0A        ASL A
  $E529: 10 FF     BPL $e52a
  $E52B: FF FF F0  ISB $f0ff,X
  $E52E: 88        DEY
  $E52F: EA        NOP
  $E530: F5 F6     SBC $f6,X
  $E532: F2        ???
  $E533: 00        BRK
  $E534: 3C 2A 3D  NOP $3d2a,X
  $E537: 13 F3     SLO ($f3),Y
  $E539: 00        BRK
  $E53A: 0F 34 00  SLO $0034
  $E53D: FF F7 27  ISB $27f7,X
  $E540: 0A        ASL A
  $E541: 78        SEI
  $E542: F0 29     BEQ $e56d
  $E544: 15 FF     ORA $ff,X
  $E546: F5 F7     SBC $f7,X
  $E548: 2C 19 2C  BIT $2c19
  $E54B: F0 43     BEQ $e590
  $E54D: 0C FF F5  NOP $f5ff
  $E550: F7 2C     ISB $2c,X
  $E552: 19 31 F0  ORA $f031,Y
  $E555: 6D 0C FF  ADC $ff0c
  $E558: F6 1E     INC $1e,X
  $E55A: 2A        ROL A
  $E55B: 39 FF F2  AND $f2ff,Y
  $E55E: FF 1E 25  ISB $251e,X
  $E561: 3C 32 F5  NOP $f532,X
  $E564: 1A        NOP
  $E565: 21 26     AND ($26,X)
  $E567: 11 F5     ORA ($f5),Y
  $E569: F7 24     ISB $24,X
  $E56B: 0A        ASL A
  $E56C: 30 FF     BMI $e56d
  $E56E: 27 FF     RLA $ff
  $E570: FF F5 F6  ISB $f6f5,X
  $E573: 1E 2A 39  ASL $392a,X
  $E576: FF F5 F2  ISB $f2f5,X
  $E579: FF 1E 25  ISB $251e,X
  $E57C: 3C 32 1A  NOP $1a32,X
  $E57F: 21 26     AND ($26,X)
  $E581: 11 F0     ORA ($f0),Y
  $E583: 69 E5     ADC #$e5
  $E585: F2        ???
  $E586: 05 F6     ORA $f6
  $E588: 1E 2A 39  ASL $392a,X
  $E58B: FF F2 FF  ISB $fff2,X
  $E58E: 1E 25 3C  ASL $3c25,X
  $E591: 32        ???
  $E592: F5 1A     SBC $1a,X
  $E594: F0 26     BEQ $e5bc
  $E596: 11 F0     ORA ($f0),Y
  $E598: 68        PLA
  $E599: E5 F5     SBC $f5
  $E59B: F2        ???
  $E59C: 05 F6     ORA $f6
  $E59E: 1E 2A 39  ASL $392a,X
  $E5A1: FF F5 F2  ISB $f2f5,X
  $E5A4: FF 1E 25  ISB $251e,X
  $E5A7: 3C 32 1A  NOP $1a32,X
  $E5AA: F0 26     BEQ $e5d2
  $E5AC: 11 F0     ORA ($f0),Y
  $E5AE: 69 E5     ADC #$e5
  $E5B0: F6 1E     INC $1e,X
  $E5B2: 2A        ROL A
  $E5B3: 39 FF F2  AND $f2ff,Y
  $E5B6: FF 1E 25  ISB $251e,X
  $E5B9: 3C 32 F5  NOP $f532,X
  $E5BC: 1A        NOP
  $E5BD: 21 26     AND ($26,X)
  $E5BF: 12        ???
  $E5C0: F8        SED
  $E5C1: 05 5A     ORA $5a
  $E5C3: EE 65 EE  INC $ee65
  $E5C6: 64 EE     NOP $ee
  $E5C8: 59 EE F5  EOR $f5ee,Y
  $E5CB: F6 1E     INC $1e,X
  $E5CD: 2A        ROL A
  $E5CE: 39 FF F5  AND $f5ff,Y
  $E5D1: F2        ???
  $E5D2: FF 1E 25  ISB $251e,X
  $E5D5: 3C 32 F0  NOP $f032,X
  $E5D8: BC E5 F6  LDY $f6e5,X
  $E5DB: F2        ???
  $E5DC: 05 1E     ORA $1e
  $E5DE: 2A        ROL A
  $E5DF: 39 FF F2  AND $f2ff,Y
  $E5E2: FF 1E 25  ISB $251e,X
  $E5E5: 3C 32 F5  NOP $f532,X
  $E5E8: 1A        NOP
  $E5E9: F0 26     BEQ $e611
  $E5EB: 12        ???
  $E5EC: F0 C0     BEQ $e5ae
  $E5EE: E5 F5     SBC $f5
  $E5F0: F2        ???
  $E5F1: 05 F6     ORA $f6
  $E5F3: 1E 2A 39  ASL $392a,X
  $E5F6: FF F5 F2  ISB $f2f5,X
  $E5F9: FF 1E 25  ISB $251e,X
  $E5FC: 3C 32 1A  NOP $1a32,X
  $E5FF: F0 26     BEQ $e627
  $E601: 12        ???
  $E602: F0 C0     BEQ $e5c4
  $E604: E5 F6     SBC $f6
  $E606: F2        ???
  $E607: 05 1E     ORA $1e
  $E609: 2A        ROL A
  $E60A: 39 FF F2  AND $f2ff,Y
  $E60D: FF 1E 25  ISB $251e,X
  $E610: 3C 32 F3  NOP $f332,X
  $E613: 00        BRK
  $E614: 10 34     BPL $e64a
  $E616: 00        BRK
  $E617: FF F7 27  ISB $27f7,X
  $E61A: 0A        ASL A
  $E61B: 78        SEI
  $E61C: F0 29     BEQ $e647
  $E61E: 10 FF     BPL $e61f
  $E620: F6 F2     INC $f2,X
  $E622: 05 1E     ORA $1e
  $E624: 2A        ROL A
  $E625: 39 FF F2  AND $f2ff,Y
  $E628: FF 1E 25  ISB $251e,X
  $E62B: 3C 32 F3  NOP $f332,X
  $E62E: 00        BRK
  $E62F: 10 34     BPL $e665
  $E631: 00        BRK
  $E632: FF F7 27  ISB $27f7,X
  $E635: 0A        ASL A
  $E636: 78        SEI
  $E637: F0 29     BEQ $e662
  $E639: B1 FF     LDA ($ff),Y
  $E63B: F6 F2     INC $f2,X
  $E63D: 05 1E     ORA $1e
  $E63F: 2A        ROL A
  $E640: 39 FF F2  AND $f2ff,Y
  $E643: FF 1E 25  ISB $251e,X
  $E646: 3C 32 F5  NOP $f532,X
  $E649: 1E 21 26  ASL $2621,X
  $E64C: FF F5 F3  ISB $f3f5,X
  $E64F: 00        BRK
  $E650: F7 24     ISB $24,X
  $E652: 0A        ASL A
  $E653: 1E 34 FF  ASL $ff34,X
  $E656: FF F5 3C  ISB $3cf5,X
  $E659: 21 FF     AND ($ff,X)
  $E65B: 10 FF     BPL $e65c
  $E65D: F6 F2     INC $f2,X
  $E65F: 05 1E     ORA $1e
  $E661: 2A        ROL A
  $E662: 39 FF F2  AND $f2ff,Y
  $E665: FF 1E 25  ISB $251e,X
  $E668: 3C 32 F5  NOP $f532,X
  $E66B: 1E 21 26  ASL $2621,X
  $E66E: FF F5 F7  ISB $f7f5,X
  $E671: 20 01 F3  JSR $f301
  $E674: 00        BRK
  $E675: 1E 34 FF  ASL $ff34,X
  $E678: B1 F5     LDA ($f5),Y
  $E67A: 3C 21 FF  NOP $ff21,X
  $E67D: FF FF F6  ISB $f6ff,X
  $E680: 1E 2A 39  ASL $392a,X
  $E683: FF F2 FF  ISB $fff2,X
  $E686: 1E 25 3C  ASL $3c25,X
  $E689: 32        ???
  $E68A: F5 3C     SBC $3c,X
  $E68C: 21 25     AND ($25,X)
  $E68E: 17 FF     SLO $ff,X
  $E690: F6 1E     INC $1e,X
  $E692: 2A        ROL A
  $E693: 39 FF F5  AND $f5ff,Y
  $E696: F2        ???
  $E697: FF 1E 25  ISB $251e,X
  $E69A: 3C 32 F0  NOP $f032,X
  $E69D: 8B E6     XAA #$e6
  $E69F: F6 F2     INC $f2,X
  $E6A1: 03 F7     SLO ($f7,X)
  $E6A3: 25 0A     AND $0a
  $E6A5: 3C 2A 6E  NOP $6e2a,X
  $E6A8: 4C F0 11  JMP $11f0
  $E6AB: E5 F5     SBC $f5
  $E6AD: F6 F2     INC $f2,X
  $E6AF: 03 F7     SLO ($f7,X)
  $E6B1: 25 0A     AND $0a
  $E6B3: 3C 2A 6E  NOP $6e2a,X
  $E6B6: 4C F0 10  JMP $10f0
  $E6B9: E5 F6     SBC $f6
  $E6BB: 28        PLP
  $E6BC: 2A        ROL A
  $E6BD: 39 FF F6  AND $f6ff,Y
  $E6C0: F2        ???
  $E6C1: 03 F7     SLO ($f7,X)
  $E6C3: 25 0A     AND $0a
  $E6C5: 3C FF 6E  NOP $6eff,X
  $E6C8: 4C F3 00  JMP $00f3
  $E6CB: F7 20     ISB $20,X
  $E6CD: 0A        ASL A
  $E6CE: 1E 34 FF  ASL $ff34,X
  $E6D1: FF F0 88  ISB $88f0,X
  $E6D4: EA        NOP
  $E6D5: F5 F6     SBC $f6,X
  $E6D7: 28        PLP
  $E6D8: 2A        ROL A
  $E6D9: 39 FF F5  AND $f5ff,Y
  $E6DC: F2        ???
  $E6DD: 03 F6     SLO ($f6,X)
  $E6DF: F7 25     ISB $25,X
  $E6E1: 0A        ASL A
  $E6E2: 3C FF 6E  NOP $6eff,X
  $E6E5: 4C F5 F0  JMP $f0f5
  $E6E8: C9 E6     CMP #$e6
  $E6EA: F6 28     INC $28,X
  $E6EC: 2A        ROL A
  $E6ED: 39 FF F6  AND $f6ff,Y
  $E6F0: F2        ???
  $E6F1: 03 F7     SLO ($f7,X)
  $E6F3: 25 0A     AND $0a
  $E6F5: 24 FF     BIT $ff
  $E6F7: 6E FF F6  ROR $f6ff
  $E6FA: F2        ???
  $E6FB: 03 F7     SLO ($f7,X)
  $E6FD: 27 0A     RLA $0a
  $E6FF: 3C FF 38  NOP $38ff,X
  $E702: 0E FF F5  ASL $f5ff
  $E705: F6 28     INC $28,X
  $E707: 2A        ROL A
  $E708: 39 FF F5  AND $f5ff,Y
  $E70B: F6 F2     INC $f2,X
  $E70D: 03 F7     SLO ($f7,X)
  $E70F: 25 0A     AND $0a
  $E711: 27 FF     RLA $ff
  $E713: 6E FF F5  ROR $f5ff
  $E716: F0 F9     BEQ $e711
  $E718: E6 F5     INC $f5
  $E71A: F6 F2     INC $f2,X
  $E71C: 02        ???
  $E71D: 37 2A     RLA $2a,X
  $E71F: 3E 16 F0  ROL $f016,X
  $E722: 10 E5     BPL $e709
  $E724: F6 F2     INC $f2,X
  $E726: 02        ???
  $E727: 37 2A     RLA $2a,X
  $E729: 3E 16 F0  ROL $f016,X
  $E72C: 11 E5     ORA ($e5),Y
  $E72E: F5 F6     SBC $f6,X
  $E730: F2        ???
  $E731: 02        ???
  $E732: 3C 2A 3E  NOP $3e2a,X
  $E735: 32        ???
  $E736: 3C F0 28  NOP $28f0,X
  $E739: 0F FF F5  SLO $f5ff
  $E73C: F6 F2     INC $f2,X
  $E73E: 02        ???
  $E73F: 37 2A     RLA $2a,X
  $E741: 3E 16 FF  ROL $ff16,X
  $E744: F6 F5     INC $f5,X
  $E746: F2        ???
  $E747: 00        BRK
  $E748: 3C 2A 3D  NOP $3d2a,X
  $E74B: 13 F0     SLO ($f0),Y
  $E74D: E7 E7     ISB $e7
  $E74F: F6 F2     INC $f2,X
  $E751: 00        BRK
  $E752: 3C 2A 3D  NOP $3d2a,X
  $E755: 13 F0     SLO ($f0),Y
  $E757: E7 E7     ISB $e7
  $E759: F5 F2     SBC $f2,X
  $E75B: 07 F6     SLO $f6
  $E75D: F7 39     ISB $39,X
  $E75F: 01 48     ORA ($48,X)
  $E761: 2A        ROL A
  $E762: 35 0D     AND $0d,X
  $E764: FF F6 F2  ISB $f2f6,X
  $E767: 00        BRK
  $E768: 3C 2A 3D  NOP $3d2a,X
  $E76B: 13 F6     SLO ($f6),Y
  $E76D: F2        ???
  $E76E: 07 F7     SLO $f7
  $E770: 39 1E 34  AND $341e,Y
  $E773: 2A        ROL A
  $E774: 35 4D     AND $4d,X
  $E776: F3 00     ISB ($00),Y
  $E778: F7 20     ISB $20,X
  $E77A: 01 10     ORA ($10,X)
  $E77C: 34 00     NOP $00,X
  $E77E: FF F0 88  ISB $88f0,X
  $E781: EA        NOP
  $E782: F6 F2     INC $f2,X
  $E784: 00        BRK
  $E785: 3C 2A 3D  NOP $3d2a,X
  $E788: 13 F6     SLO ($f6),Y
  $E78A: F2        ???
  $E78B: 07 3C     SLO $3c
  $E78D: 2A        ROL A
  $E78E: 40        RTI
  $E78F: 9A        TXS
  $E790: F3 00     ISB ($00),Y
  $E792: F7 20     ISB $20,X
  $E794: 0A        ASL A
  $E795: 1E 34 00  ASL $0034,X
  $E798: FF F0 DA  ISB $daf0,X
  $E79B: EE F6 F2  INC $f2f6
  $E79E: 00        BRK
  $E79F: 3C 2A 3D  NOP $3d2a,X
  $E7A2: 13 F6     SLO ($f6),Y
  $E7A4: F2        ???
  $E7A5: 07 3C     SLO $3c
  $E7A7: 2A        ROL A
  $E7A8: 40        RTI
  $E7A9: 9A        TXS
  $E7AA: F3 00     ISB ($00),Y
  $E7AC: F7 20     ISB $20,X
  $E7AE: 0A        ASL A
  $E7AF: 5A        NOP
  $E7B0: 34 00     NOP $00,X
  $E7B2: FF F8 13  ISB $13f8,X
  $E7B5: 91 F6     STA ($f6),Y
  $E7B7: 73 F6     RRA ($f6),Y
  $E7B9: 9A        TXS
  $E7BA: F6 7D     INC $7d,X
  $E7BC: F6 A3     INC $a3,X
  $E7BE: F6 87     INC $87,X
  $E7C0: F6 F6     INC $f6,X
  $E7C2: F2        ???
  $E7C3: 00        BRK
  $E7C4: 3C 2A 3D  NOP $3d2a,X
  $E7C7: 13 F6     SLO ($f6),Y
  $E7C9: F2        ???
  $E7CA: 07 3C     SLO $3c
  $E7CC: 2A        ROL A
  $E7CD: 40        RTI
  $E7CE: 9A        TXS
  $E7CF: F6 F4     INC $f4,X
  $E7D1: 00        BRK
  $E7D2: F7 20     ISB $20,X
  $E7D4: 02        ???
  $E7D5: 10 FF     BPL $e7d6
  $E7D7: FF FF F0  ISB $f0ff,X
  $E7DA: 88        DEY
  $E7DB: EA        NOP
  $E7DC: F5 F6     SBC $f6,X
  $E7DE: F2        ???
  $E7DF: 03 F7     SLO ($f7,X)
  $E7E1: 25 0A     AND $0a
  $E7E3: 37 2A     RLA $2a,X
  $E7E5: 6E 4C F8  ROR $f84c
  $E7E8: 09 5A     ORA #$5a
  $E7EA: E7 59     ISB $59
  $E7EC: E7 F5     ISB $f5
  $E7EE: F6 F2     INC $f2,X
  $E7F0: 03 F7     SLO ($f7,X)
  $E7F2: 25 0A     AND $0a
  $E7F4: 37 2A     RLA $2a,X
  $E7F6: 6E 4C F0  ROR $f04c
  $E7F9: 6C E7 F5  JMP ($f5e7)
  $E7FC: F6 F2     INC $f2,X
  $E7FE: 03 F7     SLO ($f7,X)
  $E800: 25 0A     AND $0a
  $E802: 37 2A     RLA $2a,X
  $E804: 6E 4C F0  ROR $f04c
  $E807: 89 E7     NOP #$e7
  $E809: F5 F6     SBC $f6,X
  $E80B: F2        ???
  $E80C: 03 F7     SLO ($f7,X)
  $E80E: 25 0A     AND $0a
  $E810: 37 2A     RLA $2a,X
  $E812: 6E 4C F0  ROR $f04c
  $E815: A3 E7     LAX ($e7,X)
  $E817: F5 F6     SBC $f6,X
  $E819: F2        ???
  $E81A: 03 F7     SLO ($f7,X)
  $E81C: 25 0A     AND $0a
  $E81E: 37 2A     RLA $2a,X
  $E820: 6E 4C F0  ROR $f04c
  $E823: C8        INY
  $E824: E7 F5     ISB $f5
  $E826: F6 F2     INC $f2,X
  $E828: 02        ???
  $E829: 37 2A     RLA $2a,X
  $E82B: 3E 16 F0  ROL $f016,X
  $E82E: E7 E7     ISB $e7
  $E830: F5 F6     SBC $f6,X
  $E832: F2        ???
  $E833: 02        ???
  $E834: 37 2A     RLA $2a,X
  $E836: 3E 16 F0  ROL $f016,X
  $E839: 89 E7     NOP #$e7
  $E83B: F5 F6     SBC $f6,X
  $E83D: F2        ???
  $E83E: 02        ???
  $E83F: 37 2A     RLA $2a,X
  $E841: 3E 16 F0  ROL $f016,X
  $E844: A3 E7     LAX ($e7,X)
  $E846: 1E F0 01  ASL $01f0,X
  $E849: 0C F7 2F  NOP $2ff7
  $E84C: 0A        ASL A
  $E84D: 5A        NOP
  $E84E: FF 02 FF  ISB $ff02,X
  $E851: FF F5 F2  ISB $f2f5,X
  $E854: FF 1E 25  ISB $251e,X
  $E857: 3C FF 18  NOP $18ff,X
  $E85A: F0 3F     BEQ $e89b
  $E85C: FF F3 00  ISB $00f3,X
  $E85F: F7 20     ISB $20,X
  $E861: 0A        ASL A
  $E862: 10 34     BPL $e898
  $E864: 00        BRK
  $E865: FF F0 DA  ISB $daf0,X
  $E868: EE F5 F2  INC $f2f5
  $E86B: FF 1E 25  ISB $251e,X
  $E86E: 3C FF 18  NOP $18ff,X
  $E871: F0 3F     BEQ $e8b2
  $E873: FF F3 00  ISB $00f3,X
  $E876: F7 20     ISB $20,X
  $E878: 0A        ASL A
  $E879: 10 34     BPL $e8af
  $E87B: 00        BRK
  $E87C: FF F0 06  ISB $06f0,X
  $E87F: EF F5 F2  ISB $f2f5
  $E882: FF 1E 25  ISB $251e,X
  $E885: 3C FF 18  NOP $18ff,X
  $E888: F0 3F     BEQ $e8c9
  $E88A: FF F3 00  ISB $00f3,X
  $E88D: F7 20     ISB $20,X
  $E88F: 0A        ASL A
  $E890: 10 34     BPL $e8c6
  $E892: 00        BRK
  $E893: FF F0 32  ISB $32f0,X
  $E896: EF F2 05  ISB $05f2
  $E899: F6 28     INC $28,X
  $E89B: 2A        ROL A
  $E89C: 39 12 F0  AND $f012,Y
  $E89F: 53 E8     SRE ($e8),Y
  $E8A1: F6 F5     INC $f5,X
  $E8A3: F2        ???
  $E8A4: 05 28     ORA $28
  $E8A6: 2A        ROL A
  $E8A7: 39 12 F0  AND $f012,Y
  $E8AA: 52        ???
  $E8AB: E8        INX
  $E8AC: F2        ???
  $E8AD: 05 F6     ORA $f6
  $E8AF: 28        PLP
  $E8B0: 2A        ROL A
  $E8B1: 39 12 F0  AND $f012,Y
  $E8B4: 6A        ROR A
  $E8B5: E8        INX
  $E8B6: F6 F5     INC $f5,X
  $E8B8: F2        ???
  $E8B9: 05 28     ORA $28
  $E8BB: 2A        ROL A
  $E8BC: 39 12 F0  AND $f012,Y
  $E8BF: 69 E8     ADC #$e8
  $E8C1: F2        ???
  $E8C2: 05 F6     ORA $f6
  $E8C4: 28        PLP
  $E8C5: 2A        ROL A
  $E8C6: 39 12 F0  AND $f012,Y
  $E8C9: 81 E8     STA ($e8,X)
  $E8CB: F6 F5     INC $f5,X
  $E8CD: F2        ???
  $E8CE: 05 28     ORA $28
  $E8D0: 2A        ROL A
  $E8D1: 39 12 F0  AND $f012,Y
  $E8D4: 80 E8     NOP #$e8
  $E8D6: 1E F0 01  ASL $01f0,X
  $E8D9: 33 F3     RLA ($f3),Y
  $E8DB: 04 5A     NOP $5a
  $E8DD: 34 FF     NOP $ff,X
  $E8DF: 34 F3     NOP $f3,X
  $E8E1: 0D F7 2F  ORA $2ff7
  $E8E4: 0A        ASL A
  $E8E5: 5A        NOP
  $E8E6: FF 02 00  ISB $0002,X
  $E8E9: FF 1E F0  ISB $f01e,X
  $E8EC: 01 33     ORA ($33,X)
  $E8EE: F3 06     ISB ($06),Y
  $E8F0: 5A        NOP
  $E8F1: 34 FF     NOP $ff,X
  $E8F3: 34 F3     NOP $f3,X
  $E8F5: 0E F7 2F  ASL $2ff7
  $E8F8: 0A        ASL A
  $E8F9: 5A        NOP
  $E8FA: FF 02 00  ISB $0002,X
  $E8FD: FF 1E F0  ISB $f01e,X
  $E900: 01 33     ORA ($33,X)
  $E902: F3 07     ISB ($07),Y
  $E904: 5A        NOP
  $E905: 34 FF     NOP $ff,X
  $E907: 34 F3     NOP $f3,X
  $E909: 0F F7 2F  SLO $2ff7
  $E90C: 0A        ASL A
  $E90D: 5A        NOP
  $E90E: FF 02 00  ISB $0002,X
  $E911: FF 1E F0  ISB $f01e,X
  $E914: 01 33     ORA ($33,X)
  $E916: F3 08     ISB ($08),Y
  $E918: 5A        NOP
  $E919: 34 FF     NOP $ff,X
  $E91B: 34 F3     NOP $f3,X
  $E91D: 10 F7     BPL $e916
  $E91F: 2F 0A 5A  RLA $5a0a
  $E922: FF 02 00  ISB $0002,X
  $E925: FF F5 60  ISB $60f5,X
  $E928: 37 7F     RLA $7f,X
  $E92A: BE 1E F0  LDX $f01e,Y
  $E92D: 01 33     ORA ($33,X)
  $E92F: F3 09     ISB ($09),Y
  $E931: 5A        NOP
  $E932: 34 FF     NOP $ff,X
  $E934: 34 F3     NOP $f3,X
  $E936: 10 F7     BPL $e92f
  $E938: 2F 0A 5A  RLA $5a0a
  $E93B: FF 02 00  ISB $0002,X
  $E93E: FF 1E F0  ISB $f01e,X
  $E941: 01 33     ORA ($33,X)
  $E943: F3 0A     ISB ($0a),Y
  $E945: 5A        NOP
  $E946: 34 FF     NOP $ff,X
  $E948: 34 F3     NOP $f3,X
  $E94A: 0F F7 2F  SLO $2ff7
  $E94D: 0A        ASL A
  $E94E: 5A        NOP
  $E94F: FF 02 00  ISB $0002,X
  $E952: FF 1E F0  ISB $f01e,X
  $E955: 01 33     ORA ($33,X)
  $E957: F3 04     ISB ($04),Y
  $E959: 5A        NOP
  $E95A: 34 FF     NOP $ff,X
  $E95C: 34 F3     NOP $f3,X
  $E95E: 11 F7     ORA ($f7),Y
  $E960: 2F 0A 5A  RLA $5a0a
  $E963: FF 02 00  ISB $0002,X
  $E966: FF 1E F0  ISB $f01e,X
  $E969: 01 33     ORA ($33,X)
  $E96B: F3 05     ISB ($05),Y
  $E96D: 5A        NOP
  $E96E: 34 FF     NOP $ff,X
  $E970: 34 F3     NOP $f3,X
  $E972: 11 F7     ORA ($f7),Y
  $E974: 2F 0A 5A  RLA $5a0a
  $E977: FF 02 00  ISB $0002,X
  $E97A: FF 1E F0  ISB $f01e,X
  $E97D: 01 33     ORA ($33,X)
  $E97F: F3 0B     ISB ($0b),Y
  $E981: 5A        NOP
  $E982: 34 FF     NOP $ff,X
  $E984: 34 F3     NOP $f3,X
  $E986: 0F F7 2F  SLO $2ff7
  $E989: 0A        ASL A
  $E98A: 5A        NOP
  $E98B: FF 02 00  ISB $0002,X
  $E98E: FF F5 60  ISB $60f5,X
  $E991: 37 85     RLA $85,X
  $E993: C2 1E     NOP #$1e
  $E995: F0 01     BEQ $e998
  $E997: 33 F3     RLA ($f3),Y
  $E999: 0C 5A 34  NOP $345a
  $E99C: FF 34 F3  ISB $f334,X
  $E99F: 12        ???
  $E9A0: F7 2F     ISB $2f,X
  $E9A2: 0A        ASL A
  $E9A3: 5A        NOP
  $E9A4: FF 02 00  ISB $0002,X
  $E9A7: FF F5 F4  ISB $f4f5,X
  $E9AA: 01 F7     ORA ($f7,X)
  $E9AC: 2F 0A 78  RLA $780a
  $E9AF: 2D 03 34  AND $3403
  $E9B2: FF F4 01  ISB $01f4,X
  $E9B5: F7 2F     ISB $2f,X
  $E9B7: 0A        ASL A
  $E9B8: 78        SEI
  $E9B9: 2E 03 34  ROL $3403
  $E9BC: FF F5 F2  ISB $f2f5,X
  $E9BF: 08        PHP
  $E9C0: F7 2E     ISB $2e,X
  $E9C2: 19 46 21  ORA $2146,Y
  $E9C5: 04 34     NOP $34
  $E9C7: FF 1E F0  ISB $f01e,X
  $E9CA: 05 32     ORA $32
  $E9CC: F3 02     ISB ($02),Y
  $E9CE: F7 3A     ISB $3a,X
  $E9D0: 0A        ASL A
  $E9D1: 3C 34 FF  NOP $ff34,X
  $E9D4: 35 F2     AND $f2,X
  $E9D6: 09 78     ORA #$78
  $E9D8: 25 06     AND $06
  $E9DA: 36 F3     ROL $f3,X
  $E9DC: 01 F7     ORA ($f7,X)
  $E9DE: 2A        ROL A
  $E9DF: 0A        ASL A
  $E9E0: 78        SEI
  $E9E1: 34 07     NOP $07,X
  $E9E3: 37 F3     RLA $f3,X
  $E9E5: 01 3C     ORA ($3c,X)
  $E9E7: FF FF 00  ISB $00ff,X
  $E9EA: FF 40 38  ISB $3840,X
  $E9ED: 46 65     LSR $65
  $E9EF: F5 40     SBC $40,X
  $E9F1: 37 46     RLA $46,X
  $E9F3: 66 1E     ROR $1e
  $E9F5: F0 0B     BEQ $ea02
  $E9F7: 38        SEC
  $E9F8: F3 02     ISB ($02),Y
  $E9FA: F7 3A     ISB $3a,X
  $E9FC: 0A        ASL A
  $E9FD: 3C 34 FF  NOP $ff34,X
  $EA00: FF F2 03  ISB $03f2,X
  $EA03: 5A        NOP
  $EA04: 25 0C     AND $0c
  $EA06: 39 F5 F2  AND $f2f5,Y
  $EA09: 09 F7     ORA #$f7
  $EA0B: 26 19     ROL $19
  $EA0D: 46 25     LSR $25
  $EA0F: 04 00     NOP $00
  $EA11: FF 58 38  ISB $3858,X
  $EA14: 08        PHP
  $EA15: C0 F5     CPY #$f5
  $EA17: 48        PHA
  $EA18: 37 3A     RLA $3a,X
  $EA1A: C1 F3     CMP ($f3,X)
  $EA1C: 01 F7     ORA ($f7,X)
  $EA1E: 2A        ROL A
  $EA1F: 0A        ASL A
  $EA20: 3C 34 07  NOP $0734,X
  $EA23: 08        PHP
  $EA24: F3 01     ISB ($01),Y
  $EA26: 3C FF FF  NOP $ffff,X
  $EA29: 00        BRK
  $EA2A: FF 60 38  ISB $3860,X
  $EA2D: 08        PHP
  $EA2E: 8F FF 40  SAX $40ff
  $EA31: 38        SEC
  $EA32: 08        PHP
  $EA33: 94 F5     STY $f5,X
  $EA35: 60        RTS
  $EA36: 37 7F     RLA $7f,X
  $EA38: 95 F3     STA $f3,X
  $EA3A: 14 40     NOP $40,X
  $EA3C: 34 00     NOP $00,X
  $EA3E: 3A        NOP
  $EA3F: F3 00     ISB ($00),Y
  $EA41: 40        RTI
  $EA42: FF FF 3B  ISB $3bff,X
  $EA45: F3 13     ISB ($13),Y
  $EA47: F7 3F     ISB $3f,X
  $EA49: 12        ???
  $EA4A: 50 FF     BVC $ea4b
  $EA4C: 07 3C     SLO $3c
  $EA4E: F3 13     ISB ($13),Y
  $EA50: 60        RTS
  $EA51: FF FF 00  ISB $00ff,X
  $EA54: FF F5 F2  ISB $f2f5,X
  $EA57: 06 1E     ASL $1e
  $EA59: 25 0D     AND $0d
  $EA5B: 32        ???
  $EA5C: F5 F7     SBC $f7,X
  $EA5E: 2F 0A F2  RLA $f20a
  $EA61: 06 30     ASL $30
  $EA63: FF 0E 3D  ISB $3d0e,X
  $EA66: FF F2 06  ISB $06f2,X
  $EA69: 1E 25 0D  ASL $0d25,X
  $EA6C: 32        ???
  $EA6D: F0 5D     BEQ $eacc
  $EA6F: EA        NOP
  $EA70: F5 F2     SBC $f2,X
  $EA72: 06 F7     ASL $f7
  $EA74: 26 1E     ROL $1e
  $EA76: 46 21     LSR $21
  $EA78: 4B 3D     ALR #$3d
  $EA7A: FF F5 1E  ISB $1ef5,X
  $EA7D: 1B 12 01  SLO $0112,Y
  $EA80: F5 F7     SBC $f7,X
  $EA82: 27 0A     RLA $0a
  $EA84: 1C FF 6A  NOP $6aff,X
  $EA87: FF F8 02  ISB $02f8,X
  $EA8A: 02        ???
  $EA8B: F6 01     INC $01,X
  $EA8D: F6 0A     INC $0a,X
  $EA8F: F6 09     INC $09,X
  $EA91: F6 1E     INC $1e,X
  $EA93: 1C 12 01  NOP $0112,X
  $EA96: F0 81     BEQ $ea19
  $EA98: EA        NOP
  $EA99: F5 27     SBC $27,X
  $EA9B: 1B 12 3E  SLO $3e12,Y
  $EA9E: F8        SED
  $EA9F: 0D CC EA  ORA $eacc
  $EAA2: EF EA 27  ISB $27ea
  $EAA5: 1C 12 3E  NOP $3e12,X
  $EAA8: F8        SED
  $EAA9: 0D DE EA  ORA $eade
  $EAAC: 01 EB     ORA ($eb,X)
  $EAAE: F5 27     SBC $27,X
  $EAB0: 1B 12 3E  SLO $3e12,Y
  $EAB3: F5 F3     SBC $f3,X
  $EAB5: 03 F7     SLO ($f7,X)
  $EAB7: 42        ???
  $EAB8: 0A        ASL A
  $EAB9: 78        SEI
  $EABA: 2C 13 05  BIT $0513
  $EABD: FF 27 1C  ISB $1c27,X
  $EAC0: 12        ???
  $EAC1: 3E F3 03  ROL $03f3,X
  $EAC4: F7 42     ISB $42,X
  $EAC6: 0A        ASL A
  $EAC7: 78        SEI
  $EAC8: 2B 13     ANC #$13
  $EACA: 05 FF     ORA $ff
  $EACC: F5 F3     SBC $f3,X
  $EACE: 03 F7     SLO ($f7,X)
  $EAD0: 28        PLP
  $EAD1: 0A        ASL A
  $EAD2: 78        SEI
  $EAD3: 2C 13 05  BIT $0513
  $EAD6: F8        SED
  $EAD7: 0E 12 EB  ASL $eb12
  $EADA: 1B EB 25  SLO $25eb,Y
  $EADD: EB F3     SBC #$f3
  $EADF: 03 F7     SLO ($f7,X)
  $EAE1: 28        PLP
  $EAE2: 0A        ASL A
  $EAE3: 78        SEI
  $EAE4: 2B 13     ANC #$13
  $EAE6: 05 F8     ORA $f8
  $EAE8: 0E 13 EB  ASL $eb13
  $EAEB: 1B EB 25  SLO $25eb,Y
  $EAEE: EB F5     SBC #$f5
  $EAF0: F3 03     ISB ($03),Y
  $EAF2: F7 29     ISB $29,X
  $EAF4: 0A        ASL A
  $EAF5: 78        SEI
  $EAF6: 2C 14 05  BIT $0514
  $EAF9: F8        SED
  $EAFA: 0E 2F EB  ASL $eb2f
  $EAFD: 38        SEC
  $EAFE: EB 42     SBC #$42
  $EB00: EB F3     SBC #$f3
  $EB02: 03 F7     SLO ($f7,X)
  $EB04: 29 0A     AND #$0a
  $EB06: 78        SEI
  $EB07: 2B 14     ANC #$14
  $EB09: 05 F8     ORA $f8
  $EB0B: 0E 30 EB  ASL $eb30
  $EB0E: 38        SEC
  $EB0F: EB 42     SBC #$42
  $EB11: EB F5     SBC #$f5
  $EB13: F7 11     ISB $11,X
  $EB15: 0A        ASL A
  $EB16: E0 FF     CPX #$ff
  $EB18: FF AA FF  ISB $ffaa,X
  $EB1B: F3 03     ISB ($03),Y
  $EB1D: F7 17     ISB $17,X
  $EB1F: 0A        ASL A
  $EB20: EC 14 66  CPX $6614
  $EB23: AA        TAX
  $EB24: FF F3 03  ISB $03f3,X
  $EB27: F7 17     ISB $17,X
  $EB29: 0A        ASL A
  $EB2A: EC 15 37  CPX $3715
  $EB2D: AA        TAX
  $EB2E: FF F5 F7  ISB $f7f5,X
  $EB31: 11 0A     ORA ($0a),Y
  $EB33: EC FF FF  CPX $ffff
  $EB36: C4 FF     CPY $ff
  $EB38: F3 03     ISB ($03),Y
  $EB3A: F7 17     ISB $17,X
  $EB3C: 0A        ASL A
  $EB3D: EC 14 66  CPX $6614
  $EB40: C5 FF     CMP $ff
  $EB42: F3 03     ISB ($03),Y
  $EB44: F7 17     ISB $17,X
  $EB46: 0A        ASL A
  $EB47: EC 15 37  CPX $3715
  $EB4A: C5 FF     CMP $ff
  $EB4C: F5 3C     SBC $3c,X
  $EB4E: FF FF 03  ISB $03ff,X
  $EB51: FF F5 50  ISB $50f5,X
  $EB54: FF FF 4B  ISB $4bff,X
  $EB57: FF F5 50  ISB $50f5,X
  $EB5A: FF FF 04  ISB $04ff,X
  $EB5D: FF F5 27  ISB $27f5,X
  $EB60: 1B 12 3E  SLO $3e12,Y
  $EB63: F4 00     NOP $00,X
  $EB65: F5 F7     SBC $f7,X
  $EB67: 3D 0A 10  AND $100a,X
  $EB6A: 28        PLP
  $EB6B: 15 FF     ORA $ff,X
  $EB6D: F8        SED
  $EB6E: 02        ???
  $EB6F: 88        DEY
  $EB70: EB 87     SBC #$87
  $EB72: EB CD     SBC #$cd
  $EB74: EB CC     SBC #$cc
  $EB76: EB 27     SBC #$27
  $EB78: 1C 12 3E  NOP $3e12,X
  $EB7B: F4 00     NOP $00,X
  $EB7D: F7 3D     ISB $3d,X
  $EB7F: 0A        ASL A
  $EB80: 10 29     BPL $ebab
  $EB82: 15 FF     ORA $ff,X
  $EB84: F0 6D     BEQ $ebf3
  $EB86: EB F5     SBC #$f5
  $EB88: F2        ???
  $EB89: 00        BRK
  $EB8A: 78        SEI
  $EB8B: 25 11     AND $11
  $EB8D: 3F FF F5  RLA $f5ff,X
  $EB90: 1E 1B 12  ASL $121b,X
  $EB93: 01 F5     ORA ($f5,X)
  $EB95: F7 27     ISB $27,X
  $EB97: 0A        ASL A
  $EB98: 1C FF 6A  NOP $6aff,X
  $EB9B: FF F0 B5  ISB $b5f0,X
  $EB9E: EB 1E     SBC #$1e
  $EBA0: 1C 12 01  NOP $0112,X
  $EBA3: F0 95     BEQ $eb3a
  $EBA5: EB F5     SBC #$f5
  $EBA7: 27 1B     RLA $1b
  $EBA9: 12        ???
  $EBAA: 3E F7 3D  ROL $3df7,X
  $EBAD: 0A        ASL A
  $EBAE: F4 00     NOP $00,X
  $EBB0: F5 16     SBC $16,X
  $EBB2: 28        PLP
  $EBB3: 15 FF     ORA $ff,X
  $EBB5: F2        ???
  $EBB6: 00        BRK
  $EBB7: 78        SEI
  $EBB8: 25 11     AND $11
  $EBBA: 60        RTS
  $EBBB: FF 27 1C  ISB $1c27,X
  $EBBE: 12        ???
  $EBBF: 3E F7 3D  ROL $3df7,X
  $EBC2: 0A        ASL A
  $EBC3: F4 00     NOP $00,X
  $EBC5: 16 29     ASL $29,X
  $EBC7: 15 FF     ORA $ff,X
  $EBC9: F0 B5     BEQ $eb80
  $EBCB: EB F5     SBC #$f5
  $EBCD: F2        ???
  $EBCE: 00        BRK
  $EBCF: 4C 25 4A  JMP $4a25
  $EBD2: 3F FF F5  RLA $f5ff,X
  $EBD5: 27 1B     RLA $1b
  $EBD7: 12        ???
  $EBD8: 3E F3 01  ROL $01f3,X
  $EBDB: F7 3C     ISB $3c,X
  $EBDD: 0A        ASL A
  $EBDE: 3C 34 00  NOP $0034,X
  $EBE1: 40        RTI
  $EBE2: 5A        NOP
  $EBE3: 1F 17 41  SLO $4117,X
  $EBE6: 5A        NOP
  $EBE7: FF FF 42  ISB $42ff,X
  $EBEA: FF 27 1C  ISB $1c27,X
  $EBED: 12        ???
  $EBEE: 3E F0 D9  ROL $d9f0,X
  $EBF1: EB F5     SBC #$f5
  $EBF3: 1E 19 18  ASL $1819,X
  $EBF6: 43 F5     SRE ($f5,X)
  $EBF8: F7 23     ISB $23,X
  $EBFA: 0A        ASL A
  $EBFB: 64 FF     NOP $ff
  $EBFD: 19 06 FF  ORA $ff06,Y
  $EC00: 1E 1A 18  ASL $181a,X
  $EC03: 43 F0     SRE ($f0,X)
  $EC05: F8        SED
  $EC06: EB F5     SBC #$f5
  $EC08: 23 19     RLA ($19,X)
  $EC0A: 1A        NOP
  $EC0B: 44 F0     NOP $f0
  $EC0D: 9E EA 23  SHX $23ea,Y
  $EC10: 1A        NOP
  $EC11: 1A        NOP
  $EC12: 44 F0     NOP $f0
  $EC14: A8        TAY
  $EC15: EA        NOP
  $EC16: F5 1E     SBC $1e,X
  $EC18: 19 18 47  ORA $4718,Y
  $EC1B: F5 F7     SBC $f7,X
  $EC1D: 27 0A     RLA $0a
  $EC1F: 1E FF 6B  ASL $6bff,X
  $EC22: FF F0 88  ISB $88f0,X
  $EC25: EA        NOP
  $EC26: 1E 1A 18  ASL $181a,X
  $EC29: 47 F0     SRE $f0
  $EC2B: 1C EC F5  NOP $f5ec,X
  $EC2E: 23 19     RLA ($19,X)
  $EC30: 1A        NOP
  $EC31: 44 F0     NOP $f0
  $EC33: 63 EB     RRA ($eb,X)
  $EC35: 23 1A     RLA ($1a,X)
  $EC37: 1A        NOP
  $EC38: 44 F0     NOP $f0
  $EC3A: 7B EB 23  RRA $23eb,Y
  $EC3D: 1A        NOP
  $EC3E: 1A        NOP
  $EC3F: 44 F0     NOP $f0
  $EC41: D9 EB F5  CMP $f5eb,Y
  $EC44: 23 19     RLA ($19,X)
  $EC46: 1A        NOP
  $EC47: 44 F0     NOP $f0
  $EC49: D9 EB F7  CMP $f7eb,Y
  $EC4C: 39 0A 28  AND $280a,Y
  $EC4F: 26 1E     ROL $1e
  $EC51: 49 1E     EOR #$1e
  $EC53: 1A        NOP
  $EC54: 18        CLC
  $EC55: FF F7 23  ISB $23f7,X
  $EC58: 0A        ASL A
  $EC59: 10 FF     BPL $ec5a
  $EC5B: 19 FF F0  ORA $f0ff,Y
  $EC5E: 76 EC     ROR $ec,X
  $EC60: F5 F7     SBC $f7,X
  $EC62: 39 0A 28  AND $280a,Y
  $EC65: 27 1E     RLA $1e
  $EC67: 49 F5     EOR #$f5
  $EC69: 1E 19 18  ASL $1819,X
  $EC6C: FF F5 F7  ISB $f7f5,X
  $EC6F: 23 0A     RLA ($0a,X)
  $EC71: 10 FF     BPL $ec72
  $EC73: 19 FF F5  ORA $f5ff,Y
  $EC76: B4 FF     LDY $ff,X
  $EC78: FF 07 FF  ISB $ff07,X
  $EC7B: F7 39     ISB $39,X
  $EC7D: 0A        ASL A
  $EC7E: 28        PLP
  $EC7F: 26 1E     ROL $1e
  $EC81: 49 F7     EOR #$f7
  $EC83: 27 28     RLA $28
  $EC85: 2A        ROL A
  $EC86: 18        CLC
  $EC87: 1F FF F0  SLO $f0ff,X
  $EC8A: 9D EC F5  STA $f5ec,X
  $EC8D: F7 39     ISB $39,X
  $EC8F: 0A        ASL A
  $EC90: 28        PLP
  $EC91: 27 1E     RLA $1e
  $EC93: 49 F5     EOR #$f5
  $EC95: F7 27     ISB $27,X
  $EC97: 28        PLP
  $EC98: 2A        ROL A
  $EC99: 17 1F     SLO $1f,X
  $EC9B: FF F5 78  ISB $78f5,X
  $EC9E: FF FF 0B  ISB $0bff,X
  $ECA1: F0 88     BEQ $ec2b
  $ECA3: EA        NOP
  $ECA4: F7 39     ISB $39,X
  $ECA6: 0A        ASL A
  $ECA7: 28        PLP
  $ECA8: 26 1E     ROL $1e
  $ECAA: 49 2B     EOR #$2b
  $ECAC: 18        CLC
  $ECAD: 20 4A F0  JSR $f04a
  $ECB0: A8        TAY
  $ECB1: EA        NOP
  $ECB2: F5 F7     SBC $f7,X
  $ECB4: 39 0A 28  AND $280a,Y
  $ECB7: 27 1E     RLA $1e
  $ECB9: 49 F5     EOR #$f5
  $ECBB: 2B 17     ANC #$17
  $ECBD: 20 4A F0  JSR $f04a
  $ECC0: 9E EA F5  SHX $f5ea,Y
  $ECC3: F7 39     ISB $39,X
  $ECC5: 0A        ASL A
  $ECC6: 28        PLP
  $ECC7: 27 1E     RLA $1e
  $ECC9: 49 F5     EOR #$f5
  $ECCB: 2B 17     ANC #$17
  $ECCD: 20 4A F0  JSR $f04a
  $ECD0: 63 EB     RRA ($eb,X)
  $ECD2: F7 39     ISB $39,X
  $ECD4: 0A        ASL A
  $ECD5: 28        PLP
  $ECD6: 26 1E     ROL $1e
  $ECD8: 49 2B     EOR #$2b
  $ECDA: 18        CLC
  $ECDB: 20 4A F0  JSR $f04a
  $ECDE: 7B EB F5  RRA $f5eb,Y
  $ECE1: F7 39     ISB $39,X
  $ECE3: 0A        ASL A
  $ECE4: 28        PLP
  $ECE5: 27 1E     RLA $1e
  $ECE7: 49 F5     EOR #$f5
  $ECE9: 2B 17     ANC #$17
  $ECEB: 20 4A F0  JSR $f04a
  $ECEE: D9 EB F7  CMP $f7eb,Y
  $ECF1: 39 0A 28  AND $280a,Y
  $ECF4: 26 1E     ROL $1e
  $ECF6: 49 2B     EOR #$2b
  $ECF8: 18        CLC
  $ECF9: 20 4A F0  JSR $f04a
  $ECFC: D9 EB F8  CMP $f8eb,Y
  $ECFF: 08        PHP
  $ED00: 04 ED     NOP $ed
  $ED02: 0C ED F5  NOP $f5ed
  $ED05: 2B 17     ANC #$17
  $ED07: 20 3E F0  JSR $f03e
  $ED0A: 9E EA 2B  SHX $2bea,Y
  $ED0D: 18        CLC
  $ED0E: 20 3E F0  JSR $f03e
  $ED11: A8        TAY
  $ED12: EA        NOP
  $ED13: F8        SED
  $ED14: 08        PHP
  $ED15: 19 ED 21  ORA $21ed,Y
  $ED18: ED F5 2B  SBC $2bf5
  $ED1B: 17 20     SLO $20,X
  $ED1D: 3E F0 D9  ROL $d9f0,X
  $ED20: EB 2B     SBC #$2b
  $ED22: 18        CLC
  $ED23: 20 3E F0  JSR $f03e
  $ED26: D9 EB F8  CMP $f8eb,Y
  $ED29: 08        PHP
  $ED2A: 2E ED 39  ROL $39ed
  $ED2D: ED F7 27  SBC $27f7
  $ED30: 28        PLP
  $ED31: F5 A3     SBC $a3,X
  $ED33: 17 1F     SLO $1f,X
  $ED35: 01 F0     ORA ($f0,X)
  $ED37: 88        DEY
  $ED38: EA        NOP
  $ED39: F7 27     ISB $27,X
  $ED3B: 28        PLP
  $ED3C: A3 18     LAX ($18,X)
  $ED3E: 1F 01 F0  SLO $f001,X
  $ED41: 88        DEY
  $ED42: EA        NOP
  $ED43: F8        SED
  $ED44: 08        PHP
  $ED45: 49 ED     EOR #$ed
  $ED47: 51 ED     EOR ($ed),Y
  $ED49: F5 2B     SBC $2b,X
  $ED4B: 17 20     SLO $20,X
  $ED4D: 3E F0 63  ROL $63f0,X
  $ED50: EB 2B     SBC #$2b
  $ED52: 18        CLC
  $ED53: 20 3E F0  JSR $f03e
  $ED56: 63 EB     RRA ($eb,X)
  $ED58: F5 2B     SBC $2b,X
  $ED5A: 17 20     SLO $20,X
  $ED5C: 3E F0 B3  ROL $b3f0,X
  $ED5F: EA        NOP
  $ED60: 2B 18     ANC #$18
  $ED62: 20 3E F0  JSR $f03e
  $ED65: C2 EA     NOP #$ea
  $ED67: F5 F7     SBC $f7,X
  $ED69: 27 28     RLA $28
  $ED6B: 2B 17     ANC #$17
  $ED6D: 1F 01 F0  SLO $f001,X
  $ED70: B5 EB     LDA $eb,X
  $ED72: F7 27     ISB $27,X
  $ED74: 28        PLP
  $ED75: 2B 18     ANC #$18
  $ED77: 1F 01 F0  SLO $f001,X
  $ED7A: B5 EB     LDA $eb,X
  $ED7C: F5 2B     SBC $2b,X
  $ED7E: 17 20     SLO $20,X
  $ED80: 3E F0 AB  ROL $abf0,X
  $ED83: EB 2B     SBC #$2b
  $ED85: 18        CLC
  $ED86: 20 3E F0  JSR $f03e
  $ED89: C0 EB     CPY #$eb
  $ED8B: F2        ???
  $ED8C: FF 3C 25  ISB $253c,X
  $ED8F: 22        ???
  $ED90: FF F0 9C  ISB $9cf0,X
  $ED93: ED F5 F2  SBC $f2f5
  $ED96: FF 3C 25  ISB $253c,X
  $ED99: 22        ???
  $ED9A: FF F5 F7  ISB $f7f5,X
  $ED9D: 24 1E     BIT $1e
  $ED9F: 69 F0     ADC #$f0
  $EDA1: 23 56     RLA ($56,X)
  $EDA3: FF 08 33  ISB $3308,X
  $EDA6: 31 23     AND ($23),Y
  $EDA8: F7 1F     ISB $1f,X
  $EDAA: 01 10     ORA ($10,X)
  $EDAC: FF FF FF  ISB $ffff,X
  $EDAF: F8        SED
  $EDB0: 0C BF ED  NOP $edbf
  $EDB3: CF ED F7  DCP $f7ed
  $EDB6: 40        RTI
  $EDB7: 19 40 33  ORA $3340,Y
  $EDBA: 31 BC     AND ($bc),Y
  $EDBC: F0 A8     BEQ $ed66
  $EDBE: ED F7 2C  SBC $2cf7
  $EDC1: 19 31 F0  ORA $f031,Y
  $EDC4: 6D FF F2  ADC $f2ff
  $EDC7: FF 3C 21  ISB $213c,X
  $EDCA: 22        ???
  $EDCB: FF F0 9C  ISB $9cf0,X
  $EDCE: ED F7 2C  SBC $2cf7
  $EDD1: 19 F5 31  ORA $31f5,Y
  $EDD4: F0 6D     BEQ $ee43
  $EDD6: FF F5 F2  ISB $f2f5,X
  $EDD9: FF 3C 21  ISB $213c,X
  $EDDC: 22        ???
  $EDDD: FF F0 9B  ISB $9bf0,X
  $EDE0: ED F2 FF  SBC $fff2
  $EDE3: 3C 25 24  NOP $2425,X
  $EDE6: 32        ???
  $EDE7: F5 3C     SBC $3c,X
  $EDE9: 21 25     AND ($25,X)
  $EDEB: 57 FF     SRE $ff,X
  $EDED: F5 F2     SBC $f2,X
  $EDEF: FF 3C 25  ISB $253c,X
  $EDF2: 24 32     BIT $32
  $EDF4: F0 E8     BEQ $edde
  $EDF6: ED F2 FF  SBC $fff2
  $EDF9: 3C 25 24  NOP $2425,X
  $EDFC: 32        ???
  $EDFD: F5 4C     SBC $4c,X
  $EDFF: F0 3B     BEQ $ee3c
  $EE01: 57 FF     SRE $ff,X
  $EE03: F5 F2     SBC $f2,X
  $EE05: FF 3C 25  ISB $253c,X
  $EE08: 24 32     BIT $32
  $EE0A: F0 FE     BEQ $ee0a
  $EE0C: ED F2 FF  SBC $fff2
  $EE0F: 3C 25 24  NOP $2425,X
  $EE12: 32        ???
  $EE13: F0 63     BEQ $ee78
  $EE15: E5 F5     SBC $f5
  $EE17: F2        ???
  $EE18: FF 3C 25  ISB $253c,X
  $EE1B: 24 32     BIT $32
  $EE1D: F0 7E     BEQ $ee9d
  $EE1F: E5 F2     SBC $f2
  $EE21: FF 3C 25  ISB $253c,X
  $EE24: 24 32     BIT $32
  $EE26: F0 92     BEQ $edba
  $EE28: E5 F5     SBC $f5
  $EE2A: F2        ???
  $EE2B: FF 3C 25  ISB $253c,X
  $EE2E: 24 32     BIT $32
  $EE30: F0 A9     BEQ $eddb
  $EE32: E5 F2     SBC $f2
  $EE34: FF 3C 25  ISB $253c,X
  $EE37: 24 32     BIT $32
  $EE39: F0 BB     BEQ $edf6
  $EE3B: E5 F5     SBC $f5
  $EE3D: F2        ???
  $EE3E: FF 3C 25  ISB $253c,X
  $EE41: 24 32     BIT $32
  $EE43: F0 BC     BEQ $ee01
  $EE45: E5 F2     SBC $f2
  $EE47: FF 3C 25  ISB $253c,X
  $EE4A: 24 32     BIT $32
  $EE4C: F0 E7     BEQ $ee35
  $EE4E: E5 F5     SBC $f5
  $EE50: F2        ???
  $EE51: FF 3C 25  ISB $253c,X
  $EE54: 24 32     BIT $32
  $EE56: F0 E8     BEQ $ee40
  $EE58: E5 F5     SBC $f5
  $EE5A: F7 24     ISB $24,X
  $EE5C: 0A        ASL A
  $EE5D: 18        CLC
  $EE5E: FF 68 FF  ISB $ff68,X
  $EE61: F0 88     BEQ $edeb
  $EE63: EA        NOP
  $EE64: F5 F7     SBC $f7,X
  $EE66: 24 0A     BIT $0a
  $EE68: 18        CLC
  $EE69: FF 69 FF  ISB $ff69,X
  $EE6C: F0 88     BEQ $edf6
  $EE6E: EA        NOP
  $EE6F: F2        ???
  $EE70: FF 3C 25  ISB $253c,X
  $EE73: 22        ???
  $EE74: 32        ???
  $EE75: F5 1E     SBC $1e,X
  $EE77: 21 26     AND ($26,X)
  $EE79: 58        CLI
  $EE7A: F5 F3     SBC $f3,X
  $EE7C: 00        BRK
  $EE7D: F7 24     ISB $24,X
  $EE7F: 0A        ASL A
  $EE80: 1E 34 FF  ASL $ff34,X
  $EE83: FF F5 3C  ISB $3cf5,X
  $EE86: 21 FF     AND ($ff,X)
  $EE88: 10 FF     BPL $ee89
  $EE8A: F5 F2     SBC $f2,X
  $EE8C: FF 3C 25  ISB $253c,X
  $EE8F: 22        ???
  $EE90: 32        ???
  $EE91: 1E 21 26  ASL $2621,X
  $EE94: 58        CLI
  $EE95: F3 00     ISB ($00),Y
  $EE97: F7 24     ISB $24,X
  $EE99: 0A        ASL A
  $EE9A: 1E 34 FF  ASL $ff34,X
  $EE9D: FF F0 85  ISB $85f0,X
  $EEA0: EE F2 FF  INC $fff2
  $EEA3: 3C 21 22  NOP $2221,X
  $EEA6: 32        ???
  $EEA7: F3 00     ISB ($00),Y
  $EEA9: 10 34     BPL $eedf
  $EEAB: 00        BRK
  $EEAC: FF F5 F7  ISB $f7f5,X
  $EEAF: 27 0A     RLA $0a
  $EEB1: 78        SEI
  $EEB2: F0 29     BEQ $eedd
  $EEB4: 10 FF     BPL $eeb5
  $EEB6: F5 F2     SBC $f2,X
  $EEB8: FF 3C 21  ISB $213c,X
  $EEBB: 22        ???
  $EEBC: 32        ???
  $EEBD: F3 00     ISB ($00),Y
  $EEBF: 10 34     BPL $eef5
  $EEC1: 00        BRK
  $EEC2: FF F0 AE  ISB $aef0,X
  $EEC5: EE F2 FF  INC $fff2
  $EEC8: 3C 25 24  NOP $2425,X
  $EECB: 32        ???
  $EECC: F5 1E     SBC $1e,X
  $EECE: 21 26     AND ($26,X)
  $EED0: 58        CLI
  $EED1: F3 00     ISB ($00),Y
  $EED3: F7 20     ISB $20,X
  $EED5: 0A        ASL A
  $EED6: 1E 34 00  ASL $0034,X
  $EED9: FF F8 13  ISB $13f8,X
  $EEDC: 12        ???
  $EEDD: F6 11     INC $11,X
  $EEDF: F6 1A     INC $1a,X
  $EEE1: F6 19     INC $19,X
  $EEE3: F6 22     INC $22,X
  $EEE5: F6 21     INC $21,X
  $EEE7: F6 F5     INC $f5,X
  $EEE9: F2        ???
  $EEEA: FF 3C 25  ISB $253c,X
  $EEED: 24 32     BIT $32
  $EEEF: F0 CD     BEQ $eebe
  $EEF1: EE F2 FF  INC $fff2
  $EEF4: 3C 25 24  NOP $2425,X
  $EEF7: 32        ???
  $EEF8: F5 1E     SBC $1e,X
  $EEFA: 21 26     AND ($26,X)
  $EEFC: 58        CLI
  $EEFD: F3 00     ISB ($00),Y
  $EEFF: F7 20     ISB $20,X
  $EF01: 0A        ASL A
  $EF02: 1E 34 00  ASL $0034,X
  $EF05: FF F8 13  ISB $13f8,X
  $EF08: 2A        ROL A
  $EF09: F6 29     INC $29,X
  $EF0B: F6 3B     INC $3b,X
  $EF0D: F6 3A     INC $3a,X
  $EF0F: F6 45     INC $45,X
  $EF11: F6 44     INC $44,X
  $EF13: F6 F5     INC $f5,X
  $EF15: F2        ???
  $EF16: FF 3C 25  ISB $253c,X
  $EF19: 24 32     BIT $32
  $EF1B: F0 F9     BEQ $ef16
  $EF1D: EE F2 FF  INC $fff2
  $EF20: 3C 25 24  NOP $2425,X
  $EF23: 32        ???
  $EF24: F5 1E     SBC $1e,X
  $EF26: 21 26     AND ($26,X)
  $EF28: 58        CLI
  $EF29: F3 00     ISB ($00),Y
  $EF2B: F7 20     ISB $20,X
  $EF2D: 0A        ASL A
  $EF2E: 1E 34 00  ASL $0034,X
  $EF31: FF F8 13  ISB $13f8,X
  $EF34: 4F F6 4E  SRE $4ef6
  $EF37: F6 60     INC $60,X
  $EF39: F6 5F     INC $5f,X
  $EF3B: F6 6A     INC $6a,X
  $EF3D: F6 69     INC $69,X
  $EF3F: F6 F5     INC $f5,X
  $EF41: F2        ???
  $EF42: FF 3C 25  ISB $253c,X
  $EF45: 24 32     BIT $32
  $EF47: F0 25     BEQ $ef6e
  $EF49: EF F2 00  ISB $00f2
  $EF4C: 3C 25 2E  NOP $2e25,X
  $EF4F: 5A        NOP
  $EF50: F5 1E     SBC $1e,X
  $EF52: 21 16     AND ($16,X)
  $EF54: FF F5 F4  ISB $f4f5,X
  $EF57: 00        BRK
  $EF58: F7 24     ISB $24,X
  $EF5A: 0A        ASL A
  $EF5B: 48        PHA
  $EF5C: FF FF 26  ISB $26ff,X
  $EF5F: FF F5 F2  ISB $f2f5,X
  $EF62: 00        BRK
  $EF63: 3C 25 2E  NOP $2e25,X
  $EF66: 5A        NOP
  $EF67: 1E 21 16  ASL $1621,X
  $EF6A: FF F0 56  ISB $56f0,X
  $EF6D: EF F2 00  ISB $00f2
  $EF70: 3C 21 2E  NOP $2e21,X
  $EF73: 5B F5 F4  SRE $f4f5,Y
  $EF76: 00        BRK
  $EF77: F7 27     ISB $27,X
  $EF79: 0A        ASL A
  $EF7A: 48        PHA
  $EF7B: F0 21     BEQ $ef9e
  $EF7D: 26 FF     ROL $ff
  $EF7F: F5 F2     SBC $f2,X
  $EF81: 00        BRK
  $EF82: 3C 21 2E  NOP $2e21,X
  $EF85: 5B F0 75  SRE $75f0,Y
  $EF88: EF F5 F2  ISB $f2f5
  $EF8B: 00        BRK
  $EF8C: 3C 25 2E  NOP $2e25,X
  $EF8F: 5A        NOP
  $EF90: F0 9A     BEQ $ef2c
  $EF92: EF F2 00  ISB $00f2
  $EF95: 3C 25 2E  NOP $2e25,X
  $EF98: 5A        NOP
  $EF99: F5 2D     SBC $2d,X
  $EF9B: F0 2F     BEQ $efcc
  $EF9D: 5C FF F5  NOP $f5ff,X
  $EFA0: F2        ???
  $EFA1: 00        BRK
  $EFA2: 3C 21 2E  NOP $2e21,X
  $EFA5: 5B F0 9A  SRE $9af0,Y
  $EFA8: EF F2 00  ISB $00f2
  $EFAB: 3C 21 2E  NOP $2e21,X
  $EFAE: 5B F0 99  SRE $99f0,Y
  $EFB1: EF 5A 33  ISB $335a
  $EFB4: 31 BB     AND ($bb),Y
  $EFB6: FF F7 1F  ISB $1ff7,X
  $EFB9: 0A        ASL A
  $EFBA: 78        SEI
  $EFBB: 33 30     RLA ($30),Y
  $EFBD: B8        CLV
  $EFBE: F8        SED
  $EFBF: 0B C9     ANC #$c9
  $EFC1: F2        ???
  $EFC2: B9 F2 C1  LDA $c1f2,Y
  $EFC5: F2        ???
  $EFC6: D1 F2     CMP ($f2),Y
  $EFC8: D9 F2 E1  CMP $e1f2,Y
  $EFCB: F2        ???
  $EFCC: E9 F2     SBC #$f2
  $EFCE: F9 F2 F1  SBC $f1f2,Y
  $EFD1: F2        ???
  $EFD2: 01 F3     ORA ($f3,X)
  $EFD4: 09 F3     ORA #$f3
  $EFD6: 11 F3     ORA ($f3),Y
  $EFD8: 19 F3 21  ORA $21f3,Y
  $EFDB: F3 8B     ISB ($8b),Y
  $EFDD: F2        ???
  $EFDE: 3C 33 30  NOP $3033,X
  $EFE1: 43 F0     SRE ($f0,X)
  $EFE3: BE EF B4  LDX $b4ef,Y
  $EFE6: 33 30     RLA ($30),Y
  $EFE8: AB F0     ATX #$f0
  $EFEA: BE EF F6  LDX $f6ef,Y
  $EFED: 10 2A     BPL $f019
  $EFEF: 32        ???
  $EFF0: FF F1 F4  ISB $f4f1,X
  $EFF3: EF EF FF  ISB $ffef
  $EFF6: FF FF F0  ISB $f0ff,X
  $EFF9: F4 EF     NOP $ef,X
  $EFFB: F5 F7     SBC $f7,X
  $EFFD: 3B 28 3B  RLA $3b28,Y
  $F000: 20 33 B9  JSR $b933
  $F003: FF 78 31  ISB $3178,X
  $F006: 49 31     EOR #$31
  $F008: FF 78 31  ISB $3178,X
  $F00B: 49 09     EOR #$09
  $F00D: FF 78 31  ISB $3178,X
  $F010: 49 09     EOR #$09
  $F012: 78        SEI
  $F013: 31 49     AND ($49),Y
  $F015: 0A        ASL A
  $F016: FF F5 F2  ISB $f2f5,X
  $F019: FF F7 30  ISB $30f7,X
  $F01C: 0A        ASL A
  $F01D: 3C 21 4F  NOP $4f21,X
  $F020: FF FF F5  ISB $f5ff,X
  $F023: F2        ???
  $F024: FF F7 35  ISB $35f7,X
  $F027: 0A        ASL A
  $F028: 2D 25 50  AND $5025
  $F02B: FF FF F5  ISB $f5ff,X
  $F02E: F2        ???
  $F02F: FF F7 31  ISB $31f7,X
  $F032: 0A        ASL A
  $F033: 1E 21 52  ASL $5221,X
  $F036: FF F5 F2  ISB $f2f5,X
  $F039: FF F7 31  ISB $31f7,X
  $F03C: 0A        ASL A
  $F03D: 3C 25 53  NOP $5325,X
  $F040: FF F5 F0  ISB $f0f5,X
  $F043: 57 F0     SRE $f0,X
  $F045: F2        ???
  $F046: FF F7 31  ISB $31f7,X
  $F049: 0A        ASL A
  $F04A: 1E 21 52  ASL $5221,X
  $F04D: FF F2 FF  ISB $fff2,X
  $F050: F7 31     ISB $31,X
  $F052: 0A        ASL A
  $F053: 3C 25 53  NOP $5325,X
  $F056: FF F2 FF  ISB $fff2,X
  $F059: F7 31     ISB $31,X
  $F05B: 0A        ASL A
  $F05C: 1E 21 54  ASL $5421,X
  $F05F: FF FF F5  ISB $f5ff,X
  $F062: F2        ???
  $F063: FF F7 32  ISB $32f7,X
  $F066: 0A        ASL A
  $F067: 37 25     RLA $25,X
  $F069: 55 FF     EOR $ff,X
  $F06B: F5 F2     SBC $f2,X
  $F06D: FF F7 32  ISB $32f7,X
  $F070: 0A        ASL A
  $F071: 0F FF FF  SLO $ffff
  $F074: FF FF F2  ISB $f2ff,X
  $F077: FF F7 32  ISB $32f7,X
  $F07A: 0A        ASL A
  $F07B: 37 25     RLA $25,X
  $F07D: 55 FF     EOR $ff,X
  $F07F: F0 6C     BEQ $f0ed
  $F081: F0 F5     BEQ $f078
  $F083: F2        ???
  $F084: FF F7 32  ISB $32f7,X
  $F087: 0A        ASL A
  $F088: 3C 25 56  NOP $5625,X
  $F08B: FF F5 F2  ISB $f2f5,X
  $F08E: FF F7 32  ISB $32f7,X
  $F091: 0A        ASL A
  $F092: 37 21     RLA $21,X
  $F094: 57 FF     SRE $ff,X
  $F096: F5 F2     SBC $f2,X
  $F098: 01 F7     ORA ($f7,X)
  $F09A: 04 0A     NOP $0a
  $F09C: 14 FF     NOP $ff,X
  $F09E: FF FF FF  ISB $ffff,X
  $F0A1: F2        ???
  $F0A2: FF F7 32  ISB $32f7,X
  $F0A5: 0A        ASL A
  $F0A6: 3C 25 56  NOP $5625,X
  $F0A9: FF F2 FF  ISB $fff2,X
  $F0AC: F7 32     ISB $32,X
  $F0AE: 0A        ASL A
  $F0AF: 37 21     RLA $21,X
  $F0B1: 57 FF     SRE $ff,X
  $F0B3: F0 97     BEQ $f04c
  $F0B5: F0 F5     BEQ $f0ac
  $F0B7: F2        ???
  $F0B8: FF F7 37  ISB $37f7,X
  $F0BB: 0A        ASL A
  $F0BC: 1E 35 58  ASL $5835,X
  $F0BF: FF F5 F7  ISB $f7f5,X
  $F0C2: 37 0A     RLA $0a,X
  $F0C4: 1E 36 59  ASL $5936,X
  $F0C7: FF F5 F0  ISB $f0f5,X
  $F0CA: DC F0 F2  NOP $f2f0,X
  $F0CD: FF F7 37  ISB $37f7,X
  $F0D0: 0A        ASL A
  $F0D1: 1E 35 58  ASL $5835,X
  $F0D4: FF F7 37  ISB $37f7,X
  $F0D7: 0A        ASL A
  $F0D8: 1E 36 59  ASL $5936,X
  $F0DB: FF F2 FF  ISB $fff2,X
  $F0DE: F7 37     ISB $37,X
  $F0E0: 0A        ASL A
  $F0E1: 1E 35 58  ASL $5835,X
  $F0E4: FF FF F5  ISB $f5ff,X
  $F0E7: F2        ???
  $F0E8: FF F7 31  ISB $31f7,X
  $F0EB: 0A        ASL A
  $F0EC: 1E 21 70  ASL $7021,X
  $F0EF: FF F7 31  ISB $31f7,X
  $F0F2: 0A        ASL A
  $F0F3: 1E 24 71  ASL $7124,X
  $F0F6: FF F5 F0  ISB $f0f5,X
  $F0F9: 0B F1     ANC #$f1
  $F0FB: F2        ???
  $F0FC: FF F7 31  ISB $31f7,X
  $F0FF: 0A        ASL A
  $F100: 1E 21 70  ASL $7021,X
  $F103: FF F7 31  ISB $31f7,X
  $F106: 0A        ASL A
  $F107: 1E 24 71  ASL $7124,X
  $F10A: FF F2 FF  ISB $fff2,X
  $F10D: F7 31     ISB $31,X
  $F10F: 0A        ASL A
  $F110: 1E 21 72  ASL $7221,X
  $F113: FF FF F5  ISB $f5ff,X
  $F116: F2        ???
  $F117: FF F7 34  ISB $34f7,X
  $F11A: 0A        ASL A
  $F11B: 1E 21 74  ASL $7421,X
  $F11E: FF F7 34  ISB $34f7,X
  $F121: 0A        ASL A
  $F122: 1E 24 75  ASL $7524,X
  $F125: FF F5 F0  ISB $f0f5,X
  $F128: 3A        NOP
  $F129: F1 F2     SBC ($f2),Y
  $F12B: FF F7 34  ISB $34f7,X
  $F12E: 0A        ASL A
  $F12F: 1E 21 74  ASL $7421,X
  $F132: FF F7 34  ISB $34f7,X
  $F135: 0A        ASL A
  $F136: 1E 24 75  ASL $7524,X
  $F139: FF F2 FF  ISB $fff2,X
  $F13C: F7 34     ISB $34,X
  $F13E: 0A        ASL A
  $F13F: 1E 21 76  ASL $7621,X
  $F142: FF FF F5  ISB $f5ff,X
  $F145: F2        ???
  $F146: FF F7 32  ISB $32f7,X
  $F149: 0A        ASL A
  $F14A: 1E 21 5A  ASL $5a21,X
  $F14D: FF F7 32  ISB $32f7,X
  $F150: 0A        ASL A
  $F151: 1E 24 5B  ASL $5b24,X
  $F154: FF F5 F0  ISB $f0f5,X
  $F157: 69 F1     ADC #$f1
  $F159: F2        ???
  $F15A: FF F7 32  ISB $32f7,X
  $F15D: 0A        ASL A
  $F15E: 1E 21 5A  ASL $5a21,X
  $F161: FF F7 32  ISB $32f7,X
  $F164: 0A        ASL A
  $F165: 1E 24 5B  ASL $5b24,X
  $F168: FF F2 FF  ISB $fff2,X
  $F16B: F7 32     ISB $32,X
  $F16D: 0A        ASL A
  $F16E: 1E 21 5C  ASL $5c21,X
  $F171: FF FF F5  ISB $f5ff,X
  $F174: F2        ???
  $F175: FF F7 32  ISB $32f7,X
  $F178: 0A        ASL A
  $F179: 3C 21 5D  NOP $5d21,X
  $F17C: FF F7 32  ISB $32f7,X
  $F17F: 0A        ASL A
  $F180: 1E 24 5E  ASL $5e24,X
  $F183: FF FF F5  ISB $f5ff,X
  $F186: F2        ???
  $F187: FF F7 31  ISB $31f7,X
  $F18A: 0A        ASL A
  $F18B: 1E 21 5F  ASL $5f21,X
  $F18E: FF F7 31  ISB $31f7,X
  $F191: 0A        ASL A
  $F192: 1E 24 73  ASL $7324,X
  $F195: FF F7 31  ISB $31f7,X
  $F198: 0A        ASL A
  $F199: 1E 24 73  ASL $7324,X
  $F19C: FF F5 F0  ISB $f0f5,X
  $F19F: B8        CLV
  $F1A0: F1 F2     SBC ($f2),Y
  $F1A2: FF F7 31  ISB $31f7,X
  $F1A5: 0A        ASL A
  $F1A6: 1E 21 5F  ASL $5f21,X
  $F1A9: FF F7 31  ISB $31f7,X
  $F1AC: 0A        ASL A
  $F1AD: 1E 24 73  ASL $7324,X
  $F1B0: FF F7 31  ISB $31f7,X
  $F1B3: 0A        ASL A
  $F1B4: 1E 24 73  ASL $7324,X
  $F1B7: FF F2 FF  ISB $fff2,X
  $F1BA: F7 31     ISB $31,X
  $F1BC: 0A        ASL A
  $F1BD: 1E 21 60  ASL $6021,X
  $F1C0: FF FF F5  ISB $f5ff,X
  $F1C3: F2        ???
  $F1C4: FF F7 35  ISB $35f7,X
  $F1C7: 0A        ASL A
  $F1C8: 3C 25 50  NOP $5025,X
  $F1CB: FF FF F5  ISB $f5ff,X
  $F1CE: F2        ???
  $F1CF: FF F7 36  ISB $36f7,X
  $F1D2: 0A        ASL A
  $F1D3: 1E 21 61  ASL $6121,X
  $F1D6: FF F7 36  ISB $36f7,X
  $F1D9: 0A        ASL A
  $F1DA: 1E 24 62  ASL $6224,X
  $F1DD: FF F7 36  ISB $36f7,X
  $F1E0: 0A        ASL A
  $F1E1: 1E 24 62  ASL $6224,X
  $F1E4: FF FF F2  ISB $f2ff,X
  $F1E7: FF F7 35  ISB $35f7,X
  $F1EA: 0A        ASL A
  $F1EB: 2D 25 50  AND $5025
  $F1EE: FF F2 FF  ISB $fff2,X
  $F1F1: F0 25     BEQ $f218
  $F1F3: F0 F5     BEQ $f1ea
  $F1F5: F2        ???
  $F1F6: FF F7 38  ISB $38f7,X
  $F1F9: 0A        ASL A
  $F1FA: 1E 21 63  ASL $6321,X
  $F1FD: FF F7 38  ISB $38f7,X
  $F200: 0A        ASL A
  $F201: 1E 24 64  ASL $6424,X
  $F204: FF F7 38  ISB $38f7,X
  $F207: 0A        ASL A
  $F208: 1E 24 64  ASL $6424,X
  $F20B: FF F5 F0  ISB $f0f5,X
  $F20E: 27 F2     RLA $f2
  $F210: F2        ???
  $F211: FF F7 38  ISB $38f7,X
  $F214: 0A        ASL A
  $F215: 1E 21 63  ASL $6321,X
  $F218: FF F7 38  ISB $38f7,X
  $F21B: 0A        ASL A
  $F21C: 1E 24 64  ASL $6424,X
  $F21F: FF F7 38  ISB $38f7,X
  $F222: 0A        ASL A
  $F223: 1E 24 64  ASL $6424,X
  $F226: FF F2 FF  ISB $fff2,X
  $F229: F7 38     ISB $38,X
  $F22B: 0A        ASL A
  $F22C: 1E 21 65  ASL $6521,X
  $F22F: FF FF F6  ISB $f6ff,X
  $F232: F2        ???
  $F233: 03 1E     SLO ($1e,X)
  $F235: 2A        ROL A
  $F236: 6E 32 F7  ROR $f732
  $F239: 1F 0A F4  SLO $f40a,X
  $F23C: 01 1E     ORA ($1e,X)
  $F23E: FF FF FF  ISB $ffff,X
  $F241: 5A        NOP
  $F242: 33 30     RLA ($30),Y
  $F244: 4F F8 0C  SRE $0cf8
  $F247: 4B F2     ALR #$f2
  $F249: 50 F2     BVC $f23d
  $F24B: B4 3D     LDY $3d,X
  $F24D: 47 50     SRE $50
  $F24F: FF B4 22  ISB $22b4,X
  $F252: 47 50     SRE $50
  $F254: FF 1E 0B  ISB $0b1e,X
  $F257: 01 51     ORA ($51,X)
  $F259: F7 2F     ISB $2f,X
  $F25B: 0A        ASL A
  $F25C: 5A        NOP
  $F25D: FF 02 FF  ISB $ff02,X
  $F260: FF F8 01  ISB $01f8,X
  $F263: 80 F2     NOP #$f2
  $F265: 85 F2     STA $f2
  $F267: 86 F2     STX $f2
  $F269: 7F F2 80  RRA $80f2,X
  $F26C: F2        ???
  $F26D: 85 F2     STA $f2
  $F26F: 86 F2     STX $f2
  $F271: 7F F2 F5  RRA $f5f2,X
  $F274: 32        ???
  $F275: 3D 48 FF  AND $ff48,X
  $F278: FF F5 32  ISB $32f5,X
  $F27B: 3D 77 FF  AND $ff77,X
  $F27E: FF F5 32  ISB $32f5,X
  $F281: 22        ???
  $F282: 48        PHA
  $F283: FF FF F5  ISB $f5ff,X
  $F286: 32        ???
  $F287: 22        ???
  $F288: 77 FF     RRA $ff,X
  $F28A: FF 54 FF  ISB $ff54,X
  $F28D: FF 52 80  ISB $8052,X
  $F290: 22        ???
  $F291: 00        BRK
  $F292: B2        ???
  $F293: FF EF 22  ISB $22ef,X
  $F296: 47 53     SRE $53
  $F298: FF F8 15  ISB $15f8,X
  $F29B: A9 F2     LDA #$f2
  $F29D: B1 F2     LDA ($f2),Y
  $F29F: A1 F2     LDA ($f2,X)
  $F2A1: F7 40     ISB $40,X
  $F2A3: 0A        ASL A
  $F2A4: C0 22     CPY #$22
  $F2A6: 47 54     SRE $54
  $F2A8: FF F7 40  ISB $40f7,X
  $F2AB: 0A        ASL A
  $F2AC: C0 22     CPY #$22
  $F2AE: 47 55     SRE $55
  $F2B0: FF F7 40  ISB $40f7,X
  $F2B3: 0A        ASL A
  $F2B4: C0 22     CPY #$22
  $F2B6: 47 BD     SRE $bd
  $F2B8: FF F7 01  ISB $01f7,X
  $F2BB: 7F C0 FF  RRA $ffc0,X
  $F2BE: FF B3 FF  ISB $ffb3,X
  $F2C1: F7 01     ISB $01,X
  $F2C3: 7F C0 FF  RRA $ffc0,X
  $F2C6: FF B4 FF  ISB $ffb4,X
  $F2C9: F7 01     ISB $01,X
  $F2CB: 7F C0 FF  RRA $ffc0,X
  $F2CE: FF B5 FF  ISB $ffb5,X
  $F2D1: F7 01     ISB $01,X
  $F2D3: 7F C0 FF  RRA $ffc0,X
  $F2D6: FF B6 FF  ISB $ffb6,X
  $F2D9: F7 01     ISB $01,X
  $F2DB: 7F C0 FF  RRA $ffc0,X
  $F2DE: FF B7 FF  ISB $ffb7,X
  $F2E1: F7 01     ISB $01,X
  $F2E3: 7F C0 FF  RRA $ffc0,X
  $F2E6: FF 63 FF  ISB $ff63,X
  $F2E9: F7 01     ISB $01,X
  $F2EB: 7F C0 FF  RRA $ffc0,X
  $F2EE: FF 68 FF  ISB $ff68,X
  $F2F1: F7 01     ISB $01,X
  $F2F3: 7F C0 FF  RRA $ffc0,X
  $F2F6: FF 70 FF  ISB $ff70,X
  $F2F9: F7 01     ISB $01,X
  $F2FB: 7F C0 FF  RRA $ffc0,X
  $F2FE: FF 73 FF  ISB $ff73,X
  $F301: F7 01     ISB $01,X
  $F303: 7F C0 FF  RRA $ffc0,X
  $F306: FF 7F FF  ISB $ff7f,X
  $F309: F7 01     ISB $01,X
  $F30B: 7F C0 FF  RRA $ffc0,X
  $F30E: FF 80 FF  ISB $ff80,X
  $F311: F7 01     ISB $01,X
  $F313: 7F C0 FF  RRA $ffc0,X
  $F316: FF 81 FF  ISB $ff81,X
  $F319: F7 01     ISB $01,X
  $F31B: 7F C0 FF  RRA $ffc0,X
  $F31E: FF 83 FF  ISB $ff83,X
  $F321: F7 01     ISB $01,X
  $F323: 7F C0 FF  RRA $ffc0,X
  $F326: FF 86 FF  ISB $ff86,X
  $F329: F7 40     ISB $40,X
  $F32B: 0A        ASL A
  $F32C: 0F 33 31  SLO $3133
  $F32F: A9 F1     LDA #$f1
  $F331: 33 F3     RLA ($f3),Y
  $F333: EE FF FF  INC $ffff
  $F336: FF F0 33  ISB $33f0,X
  $F339: F3 5A     ISB ($5a),Y
  $F33B: FF FF A5  ISB $a5ff,X
  $F33E: FF 3C F0  ISB $f03c,X
  $F341: 01 40     ORA ($40,X)
  $F343: F3 08     ISB ($08),Y
  $F345: 5A        NOP
  $F346: 34 FF     NOP $ff,X
  $F348: AC F3 10  LDY $10f3
  $F34B: F7 2F     ISB $2f,X
  $F34D: 0A        ASL A
  $F34E: 5A        NOP
  $F34F: FF 02 FF  ISB $ff02,X
  $F352: FF 5A 38  ISB $385a,X
  $F355: 08        PHP
  $F356: 1C F0 60  NOP $60f0,X
  $F359: F3 F5     ISB ($f5),Y
  $F35B: 5A        NOP
  $F35C: 37 3A     RLA $3a,X
  $F35E: 1C F5 F7  NOP $f7f5,X
  $F361: 2C 19 31  BIT $3119
  $F364: F0 6D     BEQ $f3d3
  $F366: C3 FF     DCP ($ff,X)
  $F368: 5A        NOP
  $F369: 3A        NOP
  $F36A: 46 1C     LSR $1c
  $F36C: F0 60     BEQ $f3ce
  $F36E: F3 F5     ISB ($f5),Y
  $F370: 5A        NOP
  $F371: 39 46 1C  AND $1c46,Y
  $F374: F0 5F     BEQ $f3d5
  $F376: F3 5A     ISB ($5a),Y
  $F378: 38        SEC
  $F379: 6F 1C F0  RRA $f01c
  $F37C: 60        RTS
  $F37D: F3 F5     ISB ($f5),Y
  $F37F: 5A        NOP
  $F380: 37 78     RLA $78,X
  $F382: 1C F0 5F  NOP $5ff0,X
  $F385: F3 F2     ISB ($f2),Y
  $F387: FF 3C 21  ISB $213c,X
  $F38A: 22        ???
  $F38B: FF F7 24  ISB $24f7,X
  $F38E: 1E 30 F0  ASL $f030,X
  $F391: 23 32     RLA ($32,X)
  $F393: F5 5A     SBC $5a,X
  $F395: 37 3A     RLA $3a,X
  $F397: 1D FF F5  ORA $f5ff,X
  $F39A: F2        ???
  $F39B: FF 3C 21  ISB $213c,X
  $F39E: 22        ???
  $F39F: FF F5 F7  ISB $f7f5,X
  $F3A2: 24 1E     BIT $1e
  $F3A4: 30 F0     BMI $f396
  $F3A6: 23 32     RLA ($32,X)
  $F3A8: 5A        NOP
  $F3A9: 38        SEC
  $F3AA: 08        PHP
  $F3AB: 1D FF F2  ORA $f2ff,X
  $F3AE: FF 3C 21  ISB $213c,X
  $F3B1: 22        ???
  $F3B2: FF F7 24  ISB $24f7,X
  $F3B5: 1E 30 F0  ASL $f030,X
  $F3B8: 23 32     RLA ($32,X)
  $F3BA: F5 5A     SBC $5a,X
  $F3BC: 39 46 1D  AND $1d46,Y
  $F3BF: FF F5 F2  ISB $f2f5,X
  $F3C2: FF 3C 21  ISB $213c,X
  $F3C5: 22        ???
  $F3C6: FF F5 F7  ISB $f7f5,X
  $F3C9: 24 1E     BIT $1e
  $F3CB: 30 F0     BMI $f3bd
  $F3CD: 23 32     RLA ($32,X)
  $F3CF: 5A        NOP
  $F3D0: 3A        NOP
  $F3D1: 46 1D     LSR $1d
  $F3D3: FF F2 FF  ISB $fff2,X
  $F3D6: 3C 21 22  NOP $2221,X
  $F3D9: FF F7 24  ISB $24f7,X
  $F3DC: 1E 30 F0  ASL $f030,X
  $F3DF: 23 32     RLA ($32,X)
  $F3E1: F5 5A     SBC $5a,X
  $F3E3: 37 78     RLA $78,X
  $F3E5: 1D FF F5  ORA $f5ff,X
  $F3E8: F2        ???
  $F3E9: FF 3C 21  ISB $213c,X
  $F3EC: 22        ???
  $F3ED: FF F5 F7  ISB $f7f5,X
  $F3F0: 24 1E     BIT $1e
  $F3F2: 30 F0     BMI $f3e4
  $F3F4: 23 32     RLA ($32,X)
  $F3F6: 5A        NOP
  $F3F7: 38        SEC
  $F3F8: 6F 1D FF  RRA $ff1d
  $F3FB: F8        SED
  $F3FC: 0A        ASL A
  $F3FD: 86 F3     STX $f3
  $F3FF: 99 F3 AD  STA $adf3,Y
  $F402: F3 C0     ISB ($c0),Y
  $F404: F3 D4     ISB ($d4),Y
  $F406: F3 E7     ISB ($e7),Y
  $F408: F3 F7     ISB ($f7),Y
  $F40A: 2C 19 31  BIT $3119
  $F40D: F0 6D     BEQ $f47c
  $F40F: BF F2 04  LAX $04f2,Y
  $F412: 3C 21 22  NOP $2221,X
  $F415: FF F7 24  ISB $24f7,X
  $F418: 1E 78 F0  ASL $f078,X
  $F41B: 23 1E     RLA ($1e,X)
  $F41D: FF F5 F7  ISB $f7f5,X
  $F420: 2C 19 31  BIT $3119
  $F423: F0 6D     BEQ $f492
  $F425: BF F5 F2  LAX $f2f5,Y
  $F428: 04 3C     NOP $3c
  $F42A: 21 22     AND ($22,X)
  $F42C: FF F5 F7  ISB $f7f5,X
  $F42F: 24 1E     BIT $1e
  $F431: 78        SEI
  $F432: F0 23     BEQ $f457
  $F434: 1E FF F8  ASL $f8ff,X
  $F437: 0A        ASL A
  $F438: 1E F4 09  ASL $09f4,X
  $F43B: F4 1E     NOP $1e,X
  $F43D: F4 09     NOP $09,X
  $F43F: F4 1E     NOP $1e,X
  $F441: F4 09     NOP $09,X
  $F443: F4 5A     NOP $5a,X
  $F445: 38        SEC
  $F446: 08        PHP
  $F447: 1F 5A FF  SLO $ff5a,X
  $F44A: FF 9C FF  ISB $ff9c,X
  $F44D: F5 5A     SBC $5a,X
  $F44F: 37 3A     RLA $3a,X
  $F451: 1F F5 F0  SLO $f0f5,X
  $F454: 48        PHA
  $F455: F4 5A     NOP $5a,X
  $F457: 38        SEC
  $F458: 6F 1F 5A  RRA $5a1f
  $F45B: FF FF 9D  ISB $9dff,X
  $F45E: FF F5 5A  ISB $5af5,X
  $F461: 37 78     RLA $78,X
  $F463: 1F F5 F0  SLO $f0f5,X
  $F466: 5A        NOP
  $F467: F4 F5     NOP $f5,X
  $F469: 40        RTI
  $F46A: 39 51 9E  AND $9e51,Y
  $F46D: 40        RTI
  $F46E: 3A        NOP
  $F46F: 51 9F     EOR ($9f),Y
  $F471: C0 FF     CPY #$ff
  $F473: FF A0 FF  ISB $ffa0,X
  $F476: 40        RTI
  $F477: 3A        NOP
  $F478: 46 A1     LSR $a1
  $F47A: F5 60     SBC $60,X
  $F47C: 39 51 A2  AND $a251,Y
  $F47F: F5 70     SBC $70,X
  $F481: FF FF A3  ISB $a3ff,X
  $F484: FF F5 60  ISB $60f5,X
  $F487: 37 79     RLA $79,X
  $F489: 61 FF     ADC ($ff,X)
  $F48B: F5 60     SBC $60,X
  $F48D: 37 7C     RLA $7c,X
  $F48F: 62        ???
  $F490: FF F5 60  ISB $60f5,X
  $F493: 37 7C     RLA $7c,X
  $F495: 64 FF     NOP $ff
  $F497: F5 40     SBC $40,X
  $F499: 37 7D     RLA $7d,X
  $F49B: 67 FF     RRA $ff
  $F49D: 40        RTI
  $F49E: 38        SEC
  $F49F: 7E 67 FF  ROR $ff67,X
  $F4A2: F5 40     SBC $40,X
  $F4A4: 37 7D     RLA $7d,X
  $F4A6: 69 FF     ADC #$ff
  $F4A8: F5 40     SBC $40,X
  $F4AA: 37 7D     RLA $7d,X
  $F4AC: 6A        ROR A
  $F4AD: FF F5 40  ISB $40f5,X
  $F4B0: 37 7F     RLA $7f,X
  $F4B2: 6B FF     ARR #$ff
  $F4B4: F5 40     SBC $40,X
  $F4B6: 37 7F     RLA $7f,X
  $F4B8: 46 FF     LSR $ff
  $F4BA: F5 40     SBC $40,X
  $F4BC: 37 7F     RLA $7f,X
  $F4BE: 6C FF F5  JMP ($f5ff)
  $F4C1: 40        RTI
  $F4C2: 37 80     RLA $80,X
  $F4C4: 6F FF F5  RRA $f5ff
  $F4C7: 40        RTI
  $F4C8: 37 7F     RLA $7f,X
  $F4CA: 6D FF F5  ADC $f5ff
  $F4CD: 40        RTI
  $F4CE: 37 82     RLA $82,X
  $F4D0: 74 FF     NOP $ff,X
  $F4D2: F5 40     SBC $40,X
  $F4D4: 37 82     RLA $82,X
  $F4D6: 75 FF     ADC $ff,X
  $F4D8: F5 40     SBC $40,X
  $F4DA: 37 83     RLA $83,X
  $F4DC: AF FF F5  LAX $f5ff
  $F4DF: 40        RTI
  $F4E0: 37 84     RLA $84,X
  $F4E2: 77 FF     RRA $ff,X
  $F4E4: F5 40     SBC $40,X
  $F4E6: 37 84     RLA $84,X
  $F4E8: 78        SEI
  $F4E9: FF F5 40  ISB $40f5,X
  $F4EC: 37 6F     RLA $6f,X
  $F4EE: 79 FF F5  ADC $f5ff,Y
  $F4F1: 40        RTI
  $F4F2: 37 6F     RLA $6f,X
  $F4F4: 7A        NOP
  $F4F5: FF F5 40  ISB $40f5,X
  $F4F8: 37 78     RLA $78,X
  $F4FA: 7B FF F5  RRA $f5ff,Y
  $F4FD: 40        RTI
  $F4FE: 37 85     RLA $85,X
  $F500: B0 FF     BCS $f501
  $F502: F5 40     SBC $40,X
  $F504: 37 85     RLA $85,X
  $F506: 7C FF F5  NOP $f5ff,X
  $F509: 40        RTI
  $F50A: 37 85     RLA $85,X
  $F50C: 7D FF 40  ADC $40ff,X
  $F50F: 38        SEC
  $F510: 81 71     STA ($71,X)
  $F512: FF F5 40  ISB $40f5,X
  $F515: 37 86     RLA $86,X
  $F517: 7E FF F6  ROR $f6ff,X
  $F51A: 80 2A     NOP #$2a
  $F51C: 32        ???
  $F51D: 82 FF     NOP #$ff
  $F51F: F5 40     SBC $40,X
  $F521: 37 87     RLA $87,X
  $F523: 84 FF     STY $ff
  $F525: F5 40     SBC $40,X
  $F527: 37 87     RLA $87,X
  $F529: 85 FF     STA $ff
  $F52B: F5 40     SBC $40,X
  $F52D: 37 87     RLA $87,X
  $F52F: 87 FF     SAX $ff
  $F531: 40        RTI
  $F532: 38        SEC
  $F533: 0F 88 FF  SLO $ff88
  $F536: 40        RTI
  $F537: 38        SEC
  $F538: 0F 89 FF  SLO $ff89
  $F53B: 40        RTI
  $F53C: 38        SEC
  $F53D: 08        PHP
  $F53E: 8A        TXA
  $F53F: FF 40 38  ISB $3840,X
  $F542: 88        DEY
  $F543: 8C FF 40  STY $40ff
  $F546: 38        SEC
  $F547: 7A        NOP
  $F548: 8D FF 40  STA $40ff
  $F54B: 3A        NOP
  $F54C: 7A        NOP
  $F54D: 8E 20 3A  STX $3a20
  $F550: 7B FF FF  RRA $ffff,Y
  $F553: 40        RTI
  $F554: 3A        NOP
  $F555: 7A        NOP
  $F556: 5E FF 40  LSR $40ff,X
  $F559: 3A        NOP
  $F55A: 7B 5F FF  RRA $ff5f,Y
  $F55D: F5 40     SBC $40,X
  $F55F: 37 3A     RLA $3a,X
  $F561: 90 FF     BCC $f562
  $F563: 40        RTI
  $F564: 38        SEC
  $F565: 89 91     NOP #$91
  $F567: FF F5 40  ISB $40f5,X
  $F56A: 37 7F     RLA $7f,X
  $F56C: 6E FF F5  ROR $f5ff
  $F56F: 40        RTI
  $F570: 37 80     RLA $80,X
  $F572: 72        ???
  $F573: FF 40 38  ISB $3840,X
  $F576: 81 72     STA ($72,X)
  $F578: FF F5 40  ISB $40f5,X
  $F57B: 37 83     RLA $83,X
  $F57D: 76 FF     ROR $ff,X
  $F57F: F5 40     SBC $40,X
  $F581: 37 82     RLA $82,X
  $F583: 92        ???
  $F584: FF 40 38  ISB $3840,X
  $F587: 6F 92 FF  RRA $ff92
  $F58A: F5 40     SBC $40,X
  $F58C: 37 85     RLA $85,X
  $F58E: 92        ???
  $F58F: FF F5 40  ISB $40f5,X
  $F592: 37 7C     RLA $7c,X
  $F594: 93 FF     ??? ($ff),Y
  $F596: F5 40     SBC $40,X
  $F598: 37 87     RLA $87,X
  $F59A: 93 FF     ??? ($ff),Y
  $F59C: 40        RTI
  $F59D: 38        SEC
  $F59E: 08        PHP
  $F59F: 97 FF     SAX $ff,Y
  $F5A1: 40        RTI
  $F5A2: 38        SEC
  $F5A3: 0F 97 FF  SLO $ff97
  $F5A6: 40        RTI
  $F5A7: 38        SEC
  $F5A8: 0F 9B F5  SLO $f59b
  $F5AB: 40        RTI
  $F5AC: 37 87     RLA $87,X
  $F5AE: 98        TYA
  $F5AF: FF F5 40  ISB $40f5,X
  $F5B2: 37 87     RLA $87,X
  $F5B4: 5D 40 38  EOR $3840,X
  $F5B7: 0F 98 FF  SLO $ff98
  $F5BA: 30 FF     BMI $f5bb
  $F5BC: FF AE FF  ISB $ffae,X
  $F5BF: F5 60     SBC $60,X
  $F5C1: 37 85     RLA $85,X
  $F5C3: AD FF 60  LDA $60ff
  $F5C6: 3B 8C A6  RLA $a68c,Y
  $F5C9: FF 60 3B  ISB $3b60,X
  $F5CC: 8D A6 FF  STA $ffa6
  $F5CF: 60        RTS
  $F5D0: 3B 8E A6  RLA $a68e,Y
  $F5D3: FF 60 3B  ISB $3b60,X
  $F5D6: 8F A6 FF  SAX $ffa6
  $F5D9: 60        RTS
  $F5DA: 3B 90 A6  RLA $a690,Y
  $F5DD: FF 60 3B  ISB $3b60,X
  $F5E0: 91 A6     STA ($a6),Y
  $F5E2: FF 60 3C  ISB $3c60,X
  $F5E5: 00        BRK
  $F5E6: A7 FF     LAX $ff
  $F5E8: F3 12     ISB ($12),Y
  $F5EA: 60        RTS
  $F5EB: 3B 92 A8  RLA $a892,Y
  $F5EE: FF F8 04  ISB $04f8,X
  $F5F1: FA        NOP
  $F5F2: F5 F9     SBC $f9,X
  $F5F4: F5 FA     SBC $fa,X
  $F5F6: F5 F9     SBC $f9,X
  $F5F8: F5 F5     SBC $f5,X
  $F5FA: F2        ???
  $F5FB: 00        BRK
  $F5FC: 46 21     LSR $21
  $F5FE: 4A        LSR A
  $F5FF: BA        TSX
  $F600: FF F5 F2  ISB $f2f5,X
  $F603: 00        BRK
  $F604: 62        ???
  $F605: 25 11     AND $11
  $F607: 48        PHA
  $F608: FF F5 F2  ISB $f2f5,X
  $F60B: 00        BRK
  $F60C: 62        ???
  $F60D: 25 4A     AND $4a
  $F60F: 48        PHA
  $F610: FF F5 F2  ISB $f2f5,X
  $F613: 09 3C     ORA #$3c
  $F615: 25 2A     AND $2a
  $F617: 19 FF F5  ORA $f5ff,Y
  $F61A: F2        ???
  $F61B: 08        PHP
  $F61C: 3C 25 2B  NOP $2b25,X
  $F61F: 19 FF F5  ORA $f5ff,Y
  $F622: F2        ???
  $F623: 09 3C     ORA #$3c
  $F625: 25 2C     AND $2c
  $F627: 19 FF F5  ORA $f5ff,Y
  $F62A: F2        ???
  $F62B: 09 3C     ORA #$3c
  $F62D: 25 2A     AND $2a
  $F62F: 19 F8 10  ORA $10f8,Y
  $F632: AD F6 AC  LDA $acf6
  $F635: F6 AD     INC $ad,X
  $F637: F6 AC     INC $ac,X
  $F639: F6 F5     INC $f5,X
  $F63B: F2        ???
  $F63C: 08        PHP
  $F63D: 3C 25 2B  NOP $2b25,X
  $F640: 19 F0 30  ORA $30f0,Y
  $F643: F6 F5     INC $f5,X
  $F645: F2        ???
  $F646: 09 3C     ORA #$3c
  $F648: 25 2C     AND $2c
  $F64A: 19 F0 30  ORA $30f0,Y
  $F64D: F6 F5     INC $f5,X
  $F64F: F2        ???
  $F650: 09 3C     ORA #$3c
  $F652: 25 2A     AND $2a
  $F654: 19 F8 02  ORA $02f8,Y
  $F657: B3 F6     LAX ($f6),Y
  $F659: B2        ???
  $F65A: F6 BB     INC $bb,X
  $F65C: F6 BA     INC $ba,X
  $F65E: F6 F5     INC $f5,X
  $F660: F2        ???
  $F661: 08        PHP
  $F662: 3C 25 2B  NOP $2b25,X
  $F665: 19 F0 55  ORA $55f0,Y
  $F668: F6 F5     INC $f5,X
  $F66A: F2        ???
  $F66B: 09 3C     ORA #$3c
  $F66D: 25 2C     AND $2c
  $F66F: 19 F0 55  ORA $55f0,Y
  $F672: F6 F5     INC $f5,X
  $F674: F2        ???
  $F675: 09 3C     ORA #$3c
  $F677: 25 2A     AND $2a
  $F679: 19 F0 C2  ORA $c2f0,Y
  $F67C: F6 F5     INC $f5,X
  $F67E: F2        ???
  $F67F: 09 3C     ORA #$3c
  $F681: 25 2B     AND $2b
  $F683: 19 F0 C2  ORA $c2f0,Y
  $F686: F6 F5     INC $f5,X
  $F688: F2        ???
  $F689: 08        PHP
  $F68A: 3C 25 2C  NOP $2c25,X
  $F68D: 19 F0 C2  ORA $c2f0,Y
  $F690: F6 F2     INC $f2,X
  $F692: 09 3C     ORA #$3c
  $F694: 25 2A     AND $2a
  $F696: 19 F0 C3  ORA $c3f0,Y
  $F699: F6 F2     INC $f2,X
  $F69B: 09 3C     ORA #$3c
  $F69D: 25 2B     AND $2b
  $F69F: 19 F0 C3  ORA $c3f0,Y
  $F6A2: F6 F2     INC $f2,X
  $F6A4: 06 3C     ASL $3c
  $F6A6: 25 2C     AND $2c
  $F6A8: 19 F0 C3  ORA $c3f0,Y
  $F6AB: F6 F5     INC $f5,X
  $F6AD: 51 24     EOR ($24),Y
  $F6AF: 2D A4 FF  AND $ffa4
  $F6B2: F5 F2     SBC $f2,X
  $F6B4: 00        BRK
  $F6B5: 62        ???
  $F6B6: 25 11     AND $11
  $F6B8: 59 FF F5  EOR $f5ff,Y
  $F6BB: F2        ???
  $F6BC: 00        BRK
  $F6BD: 62        ???
  $F6BE: 25 4A     AND $4a
  $F6C0: 59 FF F5  EOR $f5ff,Y
  $F6C3: F3 12     ISB ($12),Y
  $F6C5: 50 34     BVC $f6fb
  $F6C7: FF 4E FF  ISB $ff4e,X
  $F6CA: 0A        ASL A
  $F6CB: 38        SEC
  $F6CC: 4E FF FF  LSR $ffff
  $F6CF: 0A        ASL A
  $F6D0: 1E 4D FF  ASL $ff4d,X
  $F6D3: FF 0A 1D  ISB $1d0a,X
  $F6D6: 4C FF FF  JMP $ffff
  $F6D9: 78        SEI
  $F6DA: 38        SEC
  $F6DB: 4E 45 FF  LSR $ff45
  $F6DE: 78        SEI
  $F6DF: 1E 4D 45  ASL $454d,X
  $F6E2: FF 78 1D  ISB $1d78,X
  $F6E5: 4C 45 FF  JMP $ff45
  $F6E8: 3C F0 41  NOP $41f0,X
  $F6EB: 20 FF F8  JSR $f8ff
  $F6EE: 12        ???
  $F6EF: CA        DEX
  $F6F0: F6 CF     INC $cf,X
  $F6F2: F6 D4     INC $d4,X
  $F6F4: F6 F8     INC $f8,X
  $F6F6: 12        ???
  $F6F7: D9 F6 DE  CMP $def6,Y
  $F6FA: F6 E3     INC $e3,X
  $F6FC: F6 F8     INC $f8,X
  $F6FE: 03 46     SLO ($46,X)
  $F700: E8        INX
  $F701: 55 EA     EOR $ea,X
  $F703: 67 EA     RRA $ea
  $F705: 70 EA     BVS $f6f1
  $F707: 71 EA     ADC ($ea),Y
  $F709: BD E9 BE  LDA $bee9,X
  $F70C: E9 A8     SBC #$a8
  $F70E: E9 B3     SBC #$b3
  $F710: E9 D6     SBC #$d6
  $F712: E8        INX
  $F713: 53 E9     SRE ($e9),Y
  $F715: 67 E9     RRA $e9
  $F717: EA        NOP
  $F718: E8        INX
  $F719: FE E8 12  INC $12e8,X
  $F71C: E9 26     SBC #$26
  $F71E: E9 3F     SBC #$3f
  $F720: E9 7B     SBC #$7b
  $F722: E9 8F     SBC #$8f
  $F724: E9 1B     SBC #$1b
  $F726: EA        NOP
  $F727: EB E9     SBC #$e9
  $F729: C8        INY
  $F72A: E9 30     SBC #$30
  $F72C: EA        NOP
  $F72D: 12        ???
  $F72E: EA        NOP
  $F72F: F8        SED
  $F730: 08        PHP
  $F731: 7B EA 92  RRA $92ea,Y
  $F734: EA        NOP
  $F735: F8        SED
  $F736: 08        PHP
  $F737: 99 EA A4  STA $a4ea,Y
  $F73A: EA        NOP
  $F73B: F8        SED
  $F73C: 0F 4C EB  SLO $eb4c
  $F73F: 4D EB F8  EOR $f8eb
  $F742: 0F 52 EB  SLO $eb52
  $F745: 53 EB     SRE ($eb),Y
  $F747: F8        SED
  $F748: 0F 58 EB  SLO $eb58
  $F74B: 59 EB F8  EOR $f8eb,Y
  $F74E: 08        PHP
  $F74F: 5E EB 77  LSR $77eb,X
  $F752: EB F8     SBC #$f8
  $F754: 08        PHP
  $F755: D4 EB     NOP $eb,X
  $F757: EB EB     SBC #$eb
  $F759: F8        SED
  $F75A: 08        PHP
  $F75B: F2        ???
  $F75C: EB 00     SBC #$00
  $F75E: EC F8 08  CPX $08f8
  $F761: 07 EC     SLO $ec
  $F763: 0F EC F8  SLO $f8ec
  $F766: 08        PHP
  $F767: 2D EC 35  AND $35ec
  $F76A: EC F8 08  CPX $08f8
  $F76D: 16 EC     ASL $ec,X
  $F76F: 26 EC     ROL $ec
  $F771: F8        SED
  $F772: 08        PHP
  $F773: 43 EC     SRE ($ec,X)
  $F775: 3C EC F8  NOP $f8ec,X
  $F778: 08        PHP
  $F779: 60        RTS
  $F77A: EC 4B EC  CPX $ec4b
  $F77D: F8        SED
  $F77E: 08        PHP
  $F77F: 8C EC 7B  STY $7bec
  $F782: EC F8 08  CPX $08f8
  $F785: B2        ???
  $F786: EC A4 EC  CPX $eca4
  $F789: F8        SED
  $F78A: 08        PHP
  $F78B: C2 EC     NOP #$ec
  $F78D: D2        ???
  $F78E: EC F8 08  CPX $08f8
  $F791: E0 EC     CPX #$ec
  $F793: F0 EC     BEQ $f781
  $F795: F8        SED
  $F796: 04 8B     NOP $8b
  $F798: ED 94 ED  SBC $ed94
  $F79B: C6 ED     DEC $ed
  $F79D: D7 ED     DCP $ed,X
  $F79F: F8        SED
  $F7A0: 04 E1     NOP $e1
  $F7A2: ED ED ED  SBC $eded
  $F7A5: F7 ED     ISB $ed,X
  $F7A7: 03 EE     SLO ($ee,X)
  $F7A9: F8        SED
  $F7AA: 04 0D     NOP $0d
  $F7AC: EE 16 EE  INC $ee16
  $F7AF: 20 EE 29  JSR $29ee
  $F7B2: EE F8 04  INC $04f8
  $F7B5: 33 EE     RLA ($ee),Y
  $F7B7: 3C EE 46  NOP $46ee,X
  $F7BA: EE 4F EE  INC $ee4f
  $F7BD: F8        SED
  $F7BE: 04 6F     NOP $6f
  $F7C0: EE 8A EE  INC $ee8a
  $F7C3: A1 EE     LDA ($ee,X)
  $F7C5: B6 EE     LDX $ee,Y
  $F7C7: F8        SED
  $F7C8: 05 C6     ORA $c6
  $F7CA: EE E8 EE  INC $eee8
  $F7CD: C6 EE     DEC $ee
  $F7CF: E8        INX
  $F7D0: EE F8 05  INC $05f8
  $F7D3: F2        ???
  $F7D4: EE 14 EF  INC $ef14
  $F7D7: F2        ???
  $F7D8: EE 14 EF  INC $ef14
  $F7DB: F8        SED
  $F7DC: 05 1E     ORA $1e
  $F7DE: EF 40 EF  ISB $ef40
  $F7E1: 1E EF 40  ASL $40ef,X
  $F7E4: EF F8 04  ISB $04f8
  $F7E7: 4A        LSR A
  $F7E8: EF 60 EF  ISB $ef60
  $F7EB: 6E EF 7F  ROR $7fef
  $F7EE: EF F8 02  ISB $02f8
  $F7F1: 89 EF     NOP #$ef
  $F7F3: 89 EF     NOP #$ef
  $F7F5: 9F EF 9F  ??? $9fef,Y
  $F7F8: EF F8 10  ISB $10f8
  $F7FB: FC EF FB  NOP $fbef,X
  $F7FE: EF FC EF  ISB $effc
  $F801: FB EF F8  ISB $f8ef,Y
  $F804: 09 FE     ORA #$fe
  $F806: E4 08     CPX $08
  $F808: E5 F8     SBC $f8
  $F80A: 09 31     ORA #$31
  $F80C: E5 30     SBC $30
  $F80E: E5 F8     SBC $f8
  $F810: 04 47     NOP $47
  $F812: E5 46     SBC $46
  $F814: E5 50     SBC $50
  $F816: E5 4F     SBC $4f
  $F818: E5 F8     SBC $f8
  $F81A: 04 58     NOP $58
  $F81C: E5 71     SBC $71
  $F81E: E5 85     SBC $85
  $F820: E5 9A     SBC $9a
  $F822: E5 F8     SBC $f8
  $F824: 04 B0     NOP $b0
  $F826: E5 CA     SBC $ca
  $F828: E5 DA     SBC $da
  $F82A: E5 EF     SBC $ef
  $F82C: E5 F8     SBC $f8
  $F82E: 11 3B     ORA ($3b),Y
  $F830: E6 05     INC $05
  $F832: E6 F8     INC $f8
  $F834: 05 7F     ORA $7f
  $F836: E6 90     INC $90
  $F838: E6 7F     INC $7f
  $F83A: E6 90     INC $90
  $F83C: E6 F8     INC $f8
  $F83E: 09 9F     ORA #$9f
  $F840: E6 AC     INC $ac
  $F842: E6 F8     INC $f8
  $F844: 09 BA     ORA #$ba
  $F846: E6 D5     INC $d5
  $F848: E6 F8     INC $f8
  $F84A: 09 EA     ORA #$ea
  $F84C: E6 04     INC $04
  $F84E: E7 F8     ISB $f8
  $F850: 09 24     ORA #$24
  $F852: E7 19     ISB $19
  $F854: E7 F8     ISB $f8
  $F856: 09 2F     ORA #$2f
  $F858: E7 2E     ISB $2e
  $F85A: E7 F8     ISB $f8
  $F85C: 09 3C     ORA #$3c
  $F85E: E7 3B     ISB $3b
  $F860: E7 F8     ISB $f8
  $F862: 09 11     ORA #$11
  $F864: E5 10     SBC $10
  $F866: E5 F8     SBC $f8
  $F868: 09 DD     ORA #$dd
  $F86A: E7 DC     ISB $dc
  $F86C: E7 F8     ISB $f8
  $F86E: 09 EE     ORA #$ee
  $F870: E7 ED     ISB $ed
  $F872: E7 F8     ISB $f8
  $F874: 09 FC     ORA #$fc
  $F876: E7 FB     ISB $fb
  $F878: E7 F8     ISB $f8
  $F87A: 09 0A     ORA #$0a
  $F87C: E8        INX
  $F87D: 09 E8     ORA #$e8
  $F87F: F8        SED
  $F880: 09 18     ORA #$18
  $F882: E8        INX
  $F883: 17 E8     SLO $e8,X
  $F885: F8        SED
  $F886: 09 26     ORA #$26
  $F888: E8        INX
  $F889: 25 E8     AND $e8
  $F88B: F8        SED
  $F88C: 09 31     ORA #$31
  $F88E: E8        INX
  $F88F: 30 E8     BMI $f879
  $F891: F8        SED
  $F892: 09 3C     ORA #$3c
  $F894: E8        INX
  $F895: 3B E8 F8  RLA $f8e8,Y
  $F898: 10 53     BPL $f8ed
  $F89A: E8        INX
  $F89B: 52        ???
  $F89C: E8        INX
  $F89D: 53 E8     SRE ($e8),Y
  $F89F: 52        ???
  $F8A0: E8        INX
  $F8A1: F8        SED
  $F8A2: 10 6A     BPL $f90e
  $F8A4: E8        INX
  $F8A5: 69 E8     ADC #$e8
  $F8A7: 6A        ROR A
  $F8A8: E8        INX
  $F8A9: 69 E8     ADC #$e8
  $F8AB: F8        SED
  $F8AC: 10 81     BPL $f82f
  $F8AE: E8        INX
  $F8AF: 80 E8     NOP #$e8
  $F8B1: 81 E8     STA ($e8,X)
  $F8B3: 80 E8     NOP #$e8
  $F8B5: F8        SED
  $F8B6: 10 97     BPL $f84f
  $F8B8: E8        INX
  $F8B9: A1 E8     LDA ($e8,X)
  $F8BB: 97 E8     SAX $e8,Y
  $F8BD: A1 E8     LDA ($e8,X)
  $F8BF: F8        SED
  $F8C0: 10 AC     BPL $f86e
  $F8C2: E8        INX
  $F8C3: B6 E8     LDX $e8,Y
  $F8C5: AC E8 B6  LDY $b6e8
  $F8C8: E8        INX
  $F8C9: F8        SED
  $F8CA: 10 C1     BPL $f88d
  $F8CC: E8        INX
  $F8CD: CB E8     AXS #$e8
  $F8CF: C1 E8     CMP ($e8,X)
  $F8D1: CB E8     AXS #$e8
  $F8D3: F8        SED
  $F8D4: 11 5D     ORA ($5d),Y
  $F8D6: E6 20     INC $20
  $F8D8: E6 F8     INC $f8
  $F8DA: 0A        ASL A
  $F8DB: 53 F3     SRE ($f3),Y
  $F8DD: 5A        NOP
  $F8DE: F3 68     ISB ($68),Y
  $F8E0: F3 6F     ISB ($6f),Y
  $F8E2: F3 77     ISB ($77),Y
  $F8E4: F3 7E     ISB ($7e),Y
  $F8E6: F3 F8     ISB ($f8),Y
  $F8E8: 0A        ASL A
  $F8E9: 44 F4     NOP $f4
  $F8EB: 4D F4 68  EOR $68f4
  $F8EE: F4 76     NOP $76,X
  $F8F0: F4 56     NOP $56,X
  $F8F2: F4 5F     NOP $5f,X
  $F8F4: F4 F8     NOP $f8,X
  $F8F6: 00        BRK
  $F8F7: 18        CLC
  $F8F8: F0 17     BEQ $f911
  $F8FA: F0 23     BEQ $f91f
  $F8FC: F0 22     BEQ $f920
  $F8FE: F0 45     BEQ $f945
  $F900: F0 2D     BEQ $f92f
  $F902: F0 76     BEQ $f97a
  $F904: F0 61     BEQ $f967
  $F906: F0 A1     BEQ $f8a9
  $F908: F0 82     BEQ $f88c
  $F90A: F0 CC     BEQ $f8d8
  $F90C: F0 B6     BEQ $f8c4
  $F90E: F0 FB     BEQ $f90b
  $F910: F0 E6     BEQ $f8f8
  $F912: F0 2A     BEQ $f93e
  $F914: F1 15     SBC ($15),Y
  $F916: F1 59     SBC ($59),Y
  $F918: F1 44     SBC ($44),Y
  $F91A: F1 74     SBC ($74),Y
  $F91C: F1 73     SBC ($73),Y
  $F91E: F1 A1     SBC ($a1),Y
  $F920: F1 85     SBC ($85),Y
  $F922: F1 C3     SBC ($c3),Y
  $F924: F1 C2     SBC ($c2),Y
  $F926: F1 CE     SBC ($ce),Y
  $F928: F1 CD     SBC ($cd),Y
  $F92A: F1 E6     SBC ($e6),Y
  $F92C: F1 E6     SBC ($e6),Y
  $F92E: F1 10     SBC ($10),Y
  $F930: F2        ???
  $F931: F4 F1     NOP $f1,X
  $F933: F8        SED
  $F934: 07 09     SLO $09
  $F936: F0 0E     BEQ $f946
  $F938: F0 F8     BEQ $f932
  $F93A: 14 C5     NOP $c5,X
  $F93C: F5 CA     SBC $ca,X
  $F93E: F5 CF     SBC $cf,X
  $F940: F5 D4     SBC $d4,X
  $F942: F5 D9     SBC $d9,X
  $F944: F5 DE     SBC $de,X
  $F946: F5 E3     SBC $e3,X
  $F948: F5 F8     SBC $f8,X
  $F94A: 09 4F     ORA #$4f
  $F94C: E7 44     ISB $44
  $F94E: E7 00     ISB $00
  $F950: 81 00     STA ($00,X)
  $F952: 82 00     NOP #$00
  $F954: 77 01     RRA $01,X
  $F956: 78        SEI
  $F957: 00        BRK
  $F958: 7E 7F 80  ROR $807f,X
  $F95B: 8D 81 00  STA $0081
  $F95E: 83 0C     SAX ($0c,X)
  $F960: 77 01     RRA $01,X
  $F962: 78        SEI
  $F963: 88        DEY
  $F964: 7E 7F 80  ROR $807f,X
  $F967: 00        BRK
  $F968: 7A        NOP
  $F969: 00        BRK
  $F96A: 00        BRK
  $F96B: 00        BRK
  $F96C: 7A        NOP
  $F96D: 7B 7C 00  RRA $007c,Y
  $F970: 7A        NOP
  $F971: 7B 7C 90  RRA $907c,Y
  $F974: 91 00     STA ($00),Y
  $F976: 00        BRK
  $F977: 90 91     BCC $f90a
  $F979: 92        ???
  $F97A: 00        BRK
  $F97B: 90 91     BCC $f90e
  $F97D: 92        ???
  $F97E: 00        BRK
  $F97F: 7D 7A 00  ADC $007a,X
  $F982: 00        BRK
  $F983: 7D 7A 7B  ADC $7b7a,X
  $F986: 7C 7D 7A  NOP $7a7d,X
  $F989: 7B 7C 93  RRA $937c,Y
  $F98C: 94 00     STY $00,X
  $F98E: 00        BRK
  $F98F: 93 94     ??? ($94),Y
  $F991: 95 00     STA $00,X
  $F993: 93 94     ??? ($94),Y
  $F995: 95 00     STA $00,X
  $F997: 7D 7A 00  ADC $007a,X
  $F99A: 00        BRK
  $F99B: 7D 7A 7B  ADC $7b7a,X
  $F99E: 7C 7D 7A  NOP $7a7d,X
  $F9A1: 7B 7C 93  RRA $937c,Y
  $F9A4: 94 00     STY $00,X
  $F9A6: 00        BRK
  $F9A7: 93 94     ??? ($94),Y
  $F9A9: 95 00     STA $00,X
  $F9AB: 93 94     ??? ($94),Y
  $F9AD: 95 00     STA $00,X
  $F9AF: 00        BRK
  $F9B0: 81 00     STA ($00,X)
  $F9B2: 82 00     NOP #$00
  $F9B4: 77 01     RRA $01,X
  $F9B6: 78        SEI
  $F9B7: 00        BRK
  $F9B8: 7E 7F 80  ROR $807f,X
  $F9BB: 8D 81 00  STA $0081
  $F9BE: 83 0C     SAX ($0c,X)
  $F9C0: 77 01     RRA $01,X
  $F9C2: 78        SEI
  $F9C3: 88        DEY
  $F9C4: 7E 7F 80  ROR $807f,X
  $F9C7: 00        BRK
  $F9C8: 7A        NOP
  $F9C9: 00        BRK
  $F9CA: 00        BRK
  $F9CB: 00        BRK
  $F9CC: 7A        NOP
  $F9CD: 7B 96 00  RRA $0096,Y
  $F9D0: 7A        NOP
  $F9D1: 7B 7C 00  RRA $007c,Y
  $F9D4: 7A        NOP
  $F9D5: 00        BRK
  $F9D6: 00        BRK
  $F9D7: 00        BRK
  $F9D8: 7A        NOP
  $F9D9: 7B 96 00  RRA $0096,Y
  $F9DC: 7A        NOP
  $F9DD: 7B 7C 00  RRA $007c,Y
  $F9E0: 7A        NOP
  $F9E1: 00        BRK
  $F9E2: 00        BRK
  $F9E3: 7D 7A 7B  ADC $7b7a,X
  $F9E6: 96 00     STX $00,Y
  $F9E8: 7A        NOP
  $F9E9: 7B 7C 84  RRA $847c,Y
  $F9EC: 85 00     STA $00
  $F9EE: 82 84     NOP #$84
  $F9F0: 85 02     STA $02
  $F9F2: 78        SEI
  $F9F3: 84 85     STY $85
  $F9F5: 89 80     NOP #$80
  $F9F7: 8D 81 00  STA $0081
  $F9FA: 82 0C     NOP #$0c
  $F9FC: 77 02     RRA $02,X
  $F9FE: 78        SEI
  $F9FF: 88        DEY
  $FA00: 7E 89 80  ROR $8089,X
  $FA03: 8D 81 00  STA $0081
  $FA06: 83 0C     SAX ($0c,X)
  $FA08: 77 01     RRA $01,X
  $FA0A: 78        SEI
  $FA0B: 88        DEY
  $FA0C: 7E 7F 80  ROR $807f,X
  $FA0F: 8E 8F 00  STX $008f
  $FA12: 83 04     SAX ($04,X)
  $FA14: 87 05     SAX $05
  $FA16: 78        SEI
  $FA17: 8A        TXA
  $FA18: 8B 8C     XAA #$8c
  $FA1A: 80 03     NOP #$03
  $FA1C: 86 00     STX $00
  $FA1E: 82 03     NOP #$03
  $FA20: 86 02     STX $02
  $FA22: 78        SEI
  $FA23: 03 86     SLO ($86,X)
  $FA25: 89 80     NOP #$80
  $FA27: 8E 8F 00  STX $008f
  $FA2A: 82 04     NOP #$04
  $FA2C: 87 05     SAX $05
  $FA2E: 78        SEI
  $FA2F: 8A        TXA
  $FA30: 8B 8C     XAA #$8c
  $FA32: 80 00     NOP #$00
  $FA34: 00        BRK
  $FA35: 00        BRK
  $FA36: 00        BRK
  $FA37: 00        BRK
  $FA38: 00        BRK
  $FA39: 00        BRK
  $FA3A: 00        BRK
  $FA3B: 00        BRK
  $FA3C: 00        BRK
  $FA3D: 00        BRK
  $FA3E: 00        BRK
  $FA3F: 00        BRK
  $FA40: 00        BRK
  $FA41: 00        BRK
  $FA42: 00        BRK
  $FA43: 00        BRK
  $FA44: 00        BRK
  $FA45: 00        BRK
  $FA46: 00        BRK
  $FA47: 00        BRK
  $FA48: 00        BRK
  $FA49: 00        BRK
  $FA4A: 00        BRK
  $FA4B: 00        BRK
  $FA4C: 00        BRK
  $FA4D: 00        BRK
  $FA4E: 00        BRK
  $FA4F: 00        BRK
  $FA50: 00        BRK
  $FA51: 00        BRK
  $FA52: 00        BRK
  $FA53: 00        BRK
  $FA54: 00        BRK
  $FA55: 00        BRK
  $FA56: 00        BRK
  $FA57: 00        BRK
  $FA58: 00        BRK
  $FA59: 00        BRK
  $FA5A: 00        BRK
  $FA5B: 00        BRK
  $FA5C: 00        BRK
  $FA5D: 00        BRK
  $FA5E: 00        BRK
  $FA5F: 00        BRK
  $FA60: 00        BRK
  $FA61: 00        BRK
  $FA62: 00        BRK
  $FA63: 00        BRK
  $FA64: 00        BRK
  $FA65: 00        BRK
  $FA66: 00        BRK
  $FA67: 00        BRK
  $FA68: 00        BRK
  $FA69: 00        BRK
  $FA6A: 00        BRK
  $FA6B: 00        BRK
  $FA6C: 00        BRK
  $FA6D: 00        BRK
  $FA6E: 00        BRK
  $FA6F: 00        BRK
  $FA70: 00        BRK
  $FA71: 00        BRK
  $FA72: 00        BRK
  $FA73: 00        BRK
  $FA74: 00        BRK
  $FA75: 00        BRK
  $FA76: 00        BRK
  $FA77: 00        BRK
  $FA78: 00        BRK
  $FA79: 00        BRK
  $FA7A: 00        BRK
  $FA7B: 00        BRK
  $FA7C: 00        BRK
  $FA7D: 00        BRK
  $FA7E: 00        BRK
  $FA7F: 00        BRK
  $FA80: 00        BRK
  $FA81: 00        BRK
  $FA82: 00        BRK
  $FA83: 00        BRK
  $FA84: 00        BRK
  $FA85: 00        BRK
  $FA86: 00        BRK
  $FA87: 00        BRK
  $FA88: 00        BRK
  $FA89: 00        BRK
  $FA8A: 00        BRK
  $FA8B: 00        BRK
  $FA8C: 00        BRK
  $FA8D: 00        BRK
  $FA8E: 00        BRK
  $FA8F: 00        BRK
  $FA90: 00        BRK
  $FA91: 00        BRK
  $FA92: 00        BRK
  $FA93: 00        BRK
  $FA94: 00        BRK
  $FA95: 00        BRK
  $FA96: 00        BRK
  $FA97: 00        BRK
  $FA98: 00        BRK
  $FA99: 00        BRK
  $FA9A: 00        BRK
  $FA9B: 00        BRK
  $FA9C: 00        BRK
  $FA9D: 00        BRK
  $FA9E: 00        BRK
  $FA9F: 00        BRK
  $FAA0: 00        BRK
  $FAA1: 00        BRK
  $FAA2: 00        BRK
  $FAA3: 00        BRK
  $FAA4: 00        BRK
  $FAA5: 00        BRK
  $FAA6: 00        BRK
  $FAA7: 00        BRK
  $FAA8: 00        BRK
  $FAA9: 00        BRK
  $FAAA: 00        BRK
  $FAAB: 00        BRK
  $FAAC: 00        BRK
  $FAAD: 00        BRK
  $FAAE: 00        BRK
  $FAAF: 00        BRK
  $FAB0: 00        BRK
  $FAB1: 00        BRK
  $FAB2: 00        BRK
  $FAB3: 00        BRK
  $FAB4: 00        BRK
  $FAB5: 00        BRK
  $FAB6: 00        BRK
  $FAB7: 00        BRK
  $FAB8: 00        BRK
  $FAB9: 00        BRK
  $FABA: 00        BRK
  $FABB: 00        BRK
  $FABC: 00        BRK
  $FABD: 00        BRK
  $FABE: 00        BRK
  $FABF: 00        BRK
  $FAC0: 00        BRK
  $FAC1: 00        BRK
  $FAC2: 00        BRK
  $FAC3: 00        BRK
  $FAC4: 00        BRK
  $FAC5: 00        BRK
  $FAC6: 00        BRK
  $FAC7: 00        BRK
  $FAC8: 00        BRK
  $FAC9: 00        BRK
  $FACA: 00        BRK
  $FACB: 00        BRK
  $FACC: 00        BRK
  $FACD: 00        BRK
  $FACE: 00        BRK
  $FACF: 00        BRK
  $FAD0: 00        BRK
  $FAD1: 00        BRK
  $FAD2: 00        BRK
  $FAD3: 00        BRK
  $FAD4: 00        BRK
  $FAD5: 00        BRK
  $FAD6: 00        BRK
  $FAD7: 00        BRK
  $FAD8: 00        BRK
  $FAD9: 00        BRK
  $FADA: 00        BRK
  $FADB: 00        BRK
  $FADC: 00        BRK
  $FADD: 00        BRK
  $FADE: 00        BRK
  $FADF: 00        BRK
  $FAE0: 00        BRK
  $FAE1: 00        BRK
  $FAE2: 00        BRK
  $FAE3: 00        BRK
  $FAE4: 00        BRK
  $FAE5: 00        BRK
  $FAE6: 00        BRK
  $FAE7: 00        BRK
  $FAE8: 00        BRK
  $FAE9: 00        BRK
  $FAEA: 00        BRK
  $FAEB: 00        BRK
  $FAEC: 00        BRK
  $FAED: 00        BRK
  $FAEE: 00        BRK
  $FAEF: 00        BRK
  $FAF0: 00        BRK
  $FAF1: 00        BRK
  $FAF2: 00        BRK
  $FAF3: 00        BRK
  $FAF4: 00        BRK
  $FAF5: 00        BRK
  $FAF6: 00        BRK
  $FAF7: 00        BRK
  $FAF8: 00        BRK
  $FAF9: 00        BRK
  $FAFA: 00        BRK
  $FAFB: 00        BRK
  $FAFC: 00        BRK
  $FAFD: 00        BRK
  $FAFE: 00        BRK
  $FAFF: 00        BRK
  $FB00: 00        BRK
  $FB01: 00        BRK
  $FB02: 00        BRK
  $FB03: 00        BRK
  $FB04: 00        BRK
  $FB05: 00        BRK
  $FB06: 00        BRK
  $FB07: 00        BRK
  $FB08: 00        BRK
  $FB09: 00        BRK
  $FB0A: 00        BRK
  $FB0B: 00        BRK
  $FB0C: 00        BRK
  $FB0D: 00        BRK
  $FB0E: 00        BRK
  $FB0F: 00        BRK
  $FB10: 00        BRK
  $FB11: 00        BRK
  $FB12: 00        BRK
  $FB13: 00        BRK
  $FB14: 00        BRK
  $FB15: 00        BRK
  $FB16: 00        BRK
  $FB17: 00        BRK
  $FB18: 00        BRK
  $FB19: 00        BRK
  $FB1A: 00        BRK
  $FB1B: 00        BRK
  $FB1C: 00        BRK
  $FB1D: 00        BRK
  $FB1E: 00        BRK
  $FB1F: 00        BRK
  $FB20: 00        BRK
  $FB21: 00        BRK
  $FB22: 00        BRK
  $FB23: 00        BRK
  $FB24: 00        BRK
  $FB25: 00        BRK
  $FB26: 00        BRK
  $FB27: 00        BRK
  $FB28: 00        BRK
  $FB29: 00        BRK
  $FB2A: 00        BRK
  $FB2B: 00        BRK
  $FB2C: 00        BRK
  $FB2D: 00        BRK
  $FB2E: 00        BRK
  $FB2F: 00        BRK
  $FB30: 00        BRK
  $FB31: 00        BRK
  $FB32: 00        BRK
  $FB33: 00        BRK
  $FB34: 00        BRK
  $FB35: 00        BRK
  $FB36: 00        BRK
  $FB37: 00        BRK
  $FB38: 00        BRK
  $FB39: 00        BRK
  $FB3A: 00        BRK
  $FB3B: 00        BRK
  $FB3C: 00        BRK
  $FB3D: 00        BRK
  $FB3E: 00        BRK
  $FB3F: 00        BRK
  $FB40: 00        BRK
  $FB41: 00        BRK
  $FB42: 00        BRK
  $FB43: 00        BRK
  $FB44: 00        BRK
  $FB45: 00        BRK
  $FB46: 00        BRK
  $FB47: 00        BRK
  $FB48: 00        BRK
  $FB49: 00        BRK
  $FB4A: 00        BRK
  $FB4B: 00        BRK
  $FB4C: 00        BRK
  $FB4D: 00        BRK
  $FB4E: 00        BRK
  $FB4F: 00        BRK
  $FB50: 00        BRK
  $FB51: 00        BRK
  $FB52: 00        BRK
  $FB53: 00        BRK
  $FB54: 00        BRK
  $FB55: 00        BRK
  $FB56: 00        BRK
  $FB57: 00        BRK
  $FB58: 00        BRK
  $FB59: 00        BRK
  $FB5A: 00        BRK
  $FB5B: 00        BRK
  $FB5C: 00        BRK
  $FB5D: 00        BRK
  $FB5E: 00        BRK
  $FB5F: 00        BRK
  $FB60: 00        BRK
  $FB61: 00        BRK
  $FB62: 00        BRK
  $FB63: 00        BRK
  $FB64: 00        BRK
  $FB65: 00        BRK
  $FB66: 00        BRK
  $FB67: 00        BRK
  $FB68: 00        BRK
  $FB69: 00        BRK
  $FB6A: 00        BRK
  $FB6B: 00        BRK
  $FB6C: 00        BRK
  $FB6D: 00        BRK
  $FB6E: 00        BRK
  $FB6F: 00        BRK
  $FB70: 00        BRK
  $FB71: 00        BRK
  $FB72: 00        BRK
  $FB73: 00        BRK
  $FB74: 00        BRK
  $FB75: 00        BRK
  $FB76: 00        BRK
  $FB77: 00        BRK
  $FB78: 00        BRK
  $FB79: 00        BRK
  $FB7A: 00        BRK
  $FB7B: 00        BRK
  $FB7C: 00        BRK
  $FB7D: 00        BRK
  $FB7E: 00        BRK
  $FB7F: 00        BRK
  $FB80: 00        BRK
  $FB81: 00        BRK
  $FB82: 00        BRK
  $FB83: 00        BRK
  $FB84: 00        BRK
  $FB85: 00        BRK
  $FB86: 00        BRK
  $FB87: 00        BRK
  $FB88: 00        BRK
  $FB89: 00        BRK
  $FB8A: 00        BRK
  $FB8B: 00        BRK
  $FB8C: 00        BRK
  $FB8D: 00        BRK
  $FB8E: 00        BRK
  $FB8F: 00        BRK
  $FB90: 00        BRK
  $FB91: 00        BRK
  $FB92: 00        BRK
  $FB93: 00        BRK
  $FB94: 00        BRK
  $FB95: 00        BRK
  $FB96: 00        BRK
  $FB97: 00        BRK
  $FB98: 00        BRK
  $FB99: 00        BRK
  $FB9A: 00        BRK
  $FB9B: 00        BRK
  $FB9C: 00        BRK
  $FB9D: 00        BRK
  $FB9E: 00        BRK
  $FB9F: 00        BRK
  $FBA0: 00        BRK
  $FBA1: 00        BRK
  $FBA2: 00        BRK
  $FBA3: 00        BRK
  $FBA4: 00        BRK
  $FBA5: 00        BRK
  $FBA6: 00        BRK
  $FBA7: 00        BRK
  $FBA8: 00        BRK
  $FBA9: 00        BRK
  $FBAA: 00        BRK
  $FBAB: 00        BRK
  $FBAC: 00        BRK
  $FBAD: 00        BRK
  $FBAE: 00        BRK
  $FBAF: 00        BRK
  $FBB0: 00        BRK
  $FBB1: 00        BRK
  $FBB2: 00        BRK
  $FBB3: 00        BRK
  $FBB4: 00        BRK
  $FBB5: 00        BRK
  $FBB6: 00        BRK
  $FBB7: 00        BRK
  $FBB8: 00        BRK
  $FBB9: 00        BRK
  $FBBA: 00        BRK
  $FBBB: 00        BRK
  $FBBC: 00        BRK
  $FBBD: 00        BRK
  $FBBE: 00        BRK
  $FBBF: 00        BRK
  $FBC0: 00        BRK
  $FBC1: 00        BRK
  $FBC2: 00        BRK
  $FBC3: 00        BRK
  $FBC4: 00        BRK
  $FBC5: 00        BRK
  $FBC6: 00        BRK
  $FBC7: 00        BRK
  $FBC8: 00        BRK
  $FBC9: 00        BRK
  $FBCA: 00        BRK
  $FBCB: 00        BRK
  $FBCC: 00        BRK
  $FBCD: 00        BRK
  $FBCE: 00        BRK
  $FBCF: 00        BRK
  $FBD0: 00        BRK
  $FBD1: 00        BRK
  $FBD2: 00        BRK
  $FBD3: 00        BRK
  $FBD4: 00        BRK
  $FBD5: 00        BRK
  $FBD6: 00        BRK
  $FBD7: 00        BRK
  $FBD8: 00        BRK
  $FBD9: 00        BRK
  $FBDA: 00        BRK
  $FBDB: 00        BRK
  $FBDC: 00        BRK
  $FBDD: 00        BRK
  $FBDE: 00        BRK
  $FBDF: 00        BRK
  $FBE0: 00        BRK
  $FBE1: 00        BRK
  $FBE2: 00        BRK
  $FBE3: 00        BRK
  $FBE4: 00        BRK
  $FBE5: 00        BRK
  $FBE6: 00        BRK
  $FBE7: 00        BRK
  $FBE8: 00        BRK
  $FBE9: 00        BRK
  $FBEA: 00        BRK
  $FBEB: 00        BRK
  $FBEC: 00        BRK
  $FBED: 00        BRK
  $FBEE: 00        BRK
  $FBEF: 00        BRK
  $FBF0: 00        BRK
  $FBF1: 00        BRK
  $FBF2: 00        BRK
  $FBF3: 00        BRK
  $FBF4: 00        BRK
  $FBF5: 00        BRK
  $FBF6: 00        BRK
  $FBF7: 00        BRK
  $FBF8: 00        BRK
  $FBF9: 00        BRK
  $FBFA: 00        BRK
  $FBFB: 00        BRK
  $FBFC: 00        BRK
  $FBFD: 00        BRK
  $FBFE: 00        BRK
  $FBFF: 00        BRK
  $FC00: 00        BRK
  $FC01: 00        BRK
  $FC02: 00        BRK
  $FC03: 00        BRK
  $FC04: 00        BRK
  $FC05: 00        BRK
  $FC06: 00        BRK
  $FC07: 00        BRK
  $FC08: 00        BRK
  $FC09: 00        BRK
  $FC0A: 00        BRK
  $FC0B: 00        BRK
  $FC0C: 00        BRK
  $FC0D: 00        BRK
  $FC0E: 00        BRK
  $FC0F: 00        BRK
  $FC10: 00        BRK
  $FC11: 00        BRK
  $FC12: 00        BRK
  $FC13: 00        BRK
  $FC14: 00        BRK
  $FC15: 00        BRK
  $FC16: 00        BRK
  $FC17: 00        BRK
  $FC18: 00        BRK
  $FC19: 00        BRK
  $FC1A: 00        BRK
  $FC1B: 00        BRK
  $FC1C: 00        BRK
  $FC1D: 00        BRK
  $FC1E: 00        BRK
  $FC1F: 00        BRK
  $FC20: 00        BRK
  $FC21: 00        BRK
  $FC22: 00        BRK
  $FC23: 00        BRK
  $FC24: 00        BRK
  $FC25: 00        BRK
  $FC26: 00        BRK
  $FC27: 00        BRK
  $FC28: 00        BRK
  $FC29: 00        BRK
  $FC2A: 00        BRK
  $FC2B: 00        BRK
  $FC2C: 00        BRK
  $FC2D: 00        BRK
  $FC2E: 00        BRK
  $FC2F: 00        BRK
  $FC30: 00        BRK
  $FC31: 00        BRK
  $FC32: 00        BRK
  $FC33: 00        BRK
  $FC34: 00        BRK
  $FC35: 00        BRK
  $FC36: 00        BRK
  $FC37: 00        BRK
  $FC38: 00        BRK
  $FC39: 00        BRK
  $FC3A: 00        BRK
  $FC3B: 00        BRK
  $FC3C: 00        BRK
  $FC3D: 00        BRK
  $FC3E: 00        BRK
  $FC3F: 00        BRK
  $FC40: 00        BRK
  $FC41: 00        BRK
  $FC42: 00        BRK
  $FC43: 00        BRK
  $FC44: 00        BRK
  $FC45: 00        BRK
  $FC46: 00        BRK
  $FC47: 00        BRK
  $FC48: 00        BRK
  $FC49: 00        BRK
  $FC4A: 00        BRK
  $FC4B: 00        BRK
  $FC4C: 00        BRK
  $FC4D: 00        BRK
  $FC4E: 00        BRK
  $FC4F: 00        BRK
  $FC50: 00        BRK
  $FC51: 00        BRK
  $FC52: 00        BRK
  $FC53: 00        BRK
  $FC54: 00        BRK
  $FC55: 00        BRK
  $FC56: 00        BRK
  $FC57: 00        BRK
  $FC58: 00        BRK
  $FC59: 00        BRK
  $FC5A: 00        BRK
  $FC5B: 00        BRK
  $FC5C: 00        BRK
  $FC5D: 00        BRK
  $FC5E: 00        BRK
  $FC5F: 00        BRK
  $FC60: 00        BRK
  $FC61: 00        BRK
  $FC62: 00        BRK
  $FC63: 00        BRK
  $FC64: 00        BRK
  $FC65: 00        BRK
  $FC66: 00        BRK
  $FC67: 00        BRK
  $FC68: 00        BRK
  $FC69: 00        BRK
  $FC6A: 00        BRK
  $FC6B: 00        BRK
  $FC6C: 00        BRK
  $FC6D: 00        BRK
  $FC6E: 00        BRK
  $FC6F: 00        BRK
  $FC70: 00        BRK
  $FC71: 00        BRK
  $FC72: 00        BRK
  $FC73: 00        BRK
  $FC74: 00        BRK
  $FC75: 00        BRK
  $FC76: 00        BRK
  $FC77: 00        BRK
  $FC78: 00        BRK
  $FC79: 00        BRK
  $FC7A: 00        BRK
  $FC7B: 00        BRK
  $FC7C: 00        BRK
  $FC7D: 00        BRK
  $FC7E: 00        BRK
  $FC7F: 00        BRK
  $FC80: 00        BRK
  $FC81: 00        BRK
  $FC82: 00        BRK
  $FC83: 00        BRK
  $FC84: 00        BRK
  $FC85: 00        BRK
  $FC86: 00        BRK
  $FC87: 00        BRK
  $FC88: 00        BRK
  $FC89: 00        BRK
  $FC8A: 00        BRK
  $FC8B: 00        BRK
  $FC8C: 00        BRK
  $FC8D: 00        BRK
  $FC8E: 00        BRK
  $FC8F: 00        BRK
  $FC90: 00        BRK
  $FC91: 00        BRK
  $FC92: 00        BRK
  $FC93: 00        BRK
  $FC94: 00        BRK
  $FC95: 00        BRK
  $FC96: 00        BRK
  $FC97: 00        BRK
  $FC98: 00        BRK
  $FC99: 00        BRK
  $FC9A: 00        BRK
  $FC9B: 00        BRK
  $FC9C: 00        BRK
  $FC9D: 00        BRK
  $FC9E: 00        BRK
  $FC9F: 00        BRK
  $FCA0: 00        BRK
  $FCA1: 00        BRK
  $FCA2: 00        BRK
  $FCA3: 00        BRK
  $FCA4: 00        BRK
  $FCA5: 00        BRK
  $FCA6: 00        BRK
  $FCA7: 00        BRK
  $FCA8: 00        BRK
  $FCA9: 00        BRK
  $FCAA: 00        BRK
  $FCAB: 00        BRK
  $FCAC: 00        BRK
  $FCAD: 00        BRK
  $FCAE: 00        BRK
  $FCAF: 00        BRK
  $FCB0: 00        BRK
  $FCB1: 00        BRK
  $FCB2: 00        BRK
  $FCB3: 00        BRK
  $FCB4: 00        BRK
  $FCB5: 00        BRK
  $FCB6: 00        BRK
  $FCB7: 00        BRK
  $FCB8: 00        BRK
  $FCB9: 00        BRK
  $FCBA: 00        BRK
  $FCBB: 00        BRK
  $FCBC: 00        BRK
  $FCBD: 00        BRK
  $FCBE: 00        BRK
  $FCBF: 00        BRK
  $FCC0: 00        BRK
  $FCC1: 00        BRK
  $FCC2: 00        BRK
  $FCC3: 00        BRK
  $FCC4: 00        BRK
  $FCC5: 00        BRK
  $FCC6: 00        BRK
  $FCC7: 00        BRK
  $FCC8: 00        BRK
  $FCC9: 00        BRK
  $FCCA: 00        BRK
  $FCCB: 00        BRK
  $FCCC: 00        BRK
  $FCCD: 00        BRK
  $FCCE: 00        BRK
  $FCCF: 00        BRK
  $FCD0: 00        BRK
  $FCD1: 00        BRK
  $FCD2: 00        BRK
  $FCD3: 00        BRK
  $FCD4: 00        BRK
  $FCD5: 00        BRK
  $FCD6: 00        BRK
  $FCD7: 00        BRK
  $FCD8: 00        BRK
  $FCD9: 00        BRK
  $FCDA: 00        BRK
  $FCDB: 00        BRK
  $FCDC: 00        BRK
  $FCDD: 00        BRK
  $FCDE: 00        BRK
  $FCDF: 00        BRK
  $FCE0: 00        BRK
  $FCE1: 00        BRK
  $FCE2: 00        BRK
  $FCE3: 00        BRK
  $FCE4: 00        BRK
  $FCE5: 00        BRK
  $FCE6: 00        BRK
  $FCE7: 00        BRK
  $FCE8: 00        BRK
  $FCE9: 00        BRK
  $FCEA: 00        BRK
  $FCEB: 00        BRK
  $FCEC: 00        BRK
  $FCED: 00        BRK
  $FCEE: 00        BRK
  $FCEF: 00        BRK
  $FCF0: 00        BRK
  $FCF1: 00        BRK
  $FCF2: 00        BRK
  $FCF3: 00        BRK
  $FCF4: 00        BRK
  $FCF5: 00        BRK
  $FCF6: 00        BRK
  $FCF7: 00        BRK
  $FCF8: 00        BRK
  $FCF9: 00        BRK
  $FCFA: 00        BRK
  $FCFB: 00        BRK
  $FCFC: 00        BRK
  $FCFD: 00        BRK
  $FCFE: 00        BRK
  $FCFF: 00        BRK
  $FD00: 00        BRK
  $FD01: 00        BRK
  $FD02: 00        BRK
  $FD03: 00        BRK
  $FD04: 00        BRK
  $FD05: 00        BRK
  $FD06: 00        BRK
  $FD07: 00        BRK
  $FD08: 00        BRK
  $FD09: 00        BRK
  $FD0A: 00        BRK
  $FD0B: 00        BRK
  $FD0C: 00        BRK
  $FD0D: 00        BRK
  $FD0E: 00        BRK
  $FD0F: 00        BRK
  $FD10: 00        BRK
  $FD11: 00        BRK
  $FD12: 00        BRK
  $FD13: 00        BRK
  $FD14: 00        BRK
  $FD15: 00        BRK
  $FD16: 00        BRK
  $FD17: 00        BRK
  $FD18: 00        BRK
  $FD19: 00        BRK
  $FD1A: 00        BRK
  $FD1B: 00        BRK
  $FD1C: 00        BRK
  $FD1D: 00        BRK
  $FD1E: 00        BRK
  $FD1F: 00        BRK
  $FD20: 00        BRK
  $FD21: 00        BRK
  $FD22: 00        BRK
  $FD23: 00        BRK
  $FD24: 00        BRK
  $FD25: 00        BRK
  $FD26: 00        BRK
  $FD27: 00        BRK
  $FD28: 00        BRK
  $FD29: 00        BRK
  $FD2A: 00        BRK
  $FD2B: 00        BRK
  $FD2C: 00        BRK
  $FD2D: 00        BRK
  $FD2E: 00        BRK
  $FD2F: 00        BRK
  $FD30: 00        BRK
  $FD31: 00        BRK
  $FD32: 00        BRK
  $FD33: 00        BRK
  $FD34: 00        BRK
  $FD35: 00        BRK
  $FD36: 00        BRK
  $FD37: 00        BRK
  $FD38: 00        BRK
  $FD39: 00        BRK
  $FD3A: 00        BRK
  $FD3B: 00        BRK
  $FD3C: 00        BRK
  $FD3D: 00        BRK
  $FD3E: 00        BRK
  $FD3F: 00        BRK
  $FD40: 00        BRK
  $FD41: 00        BRK
  $FD42: 00        BRK
  $FD43: 00        BRK
  $FD44: 00        BRK
  $FD45: 00        BRK
  $FD46: 00        BRK
  $FD47: 00        BRK
  $FD48: 00        BRK
  $FD49: 00        BRK
  $FD4A: 00        BRK
  $FD4B: 00        BRK
  $FD4C: 00        BRK
  $FD4D: 00        BRK
  $FD4E: 00        BRK
  $FD4F: 00        BRK
  $FD50: 00        BRK
  $FD51: 00        BRK
  $FD52: 00        BRK
  $FD53: 00        BRK
  $FD54: 00        BRK
  $FD55: 00        BRK
  $FD56: 00        BRK
  $FD57: 00        BRK
  $FD58: 00        BRK
  $FD59: 00        BRK
  $FD5A: 00        BRK
  $FD5B: 00        BRK
  $FD5C: 00        BRK
  $FD5D: 00        BRK
  $FD5E: 00        BRK
  $FD5F: 00        BRK
  $FD60: 00        BRK
  $FD61: 00        BRK
  $FD62: 00        BRK
  $FD63: 00        BRK
  $FD64: 00        BRK
  $FD65: 00        BRK
  $FD66: 00        BRK
  $FD67: 00        BRK
  $FD68: 00        BRK
  $FD69: 00        BRK
  $FD6A: 00        BRK
  $FD6B: 00        BRK
  $FD6C: 00        BRK
  $FD6D: 00        BRK
  $FD6E: 00        BRK
  $FD6F: 00        BRK
  $FD70: 00        BRK
  $FD71: 00        BRK
  $FD72: 00        BRK
  $FD73: 00        BRK
  $FD74: 00        BRK
  $FD75: 00        BRK
  $FD76: 00        BRK
  $FD77: 00        BRK
  $FD78: 00        BRK
  $FD79: 00        BRK
  $FD7A: 00        BRK
  $FD7B: 00        BRK
  $FD7C: 00        BRK
  $FD7D: 00        BRK
  $FD7E: 00        BRK
  $FD7F: 00        BRK
  $FD80: 00        BRK
  $FD81: 00        BRK
  $FD82: 00        BRK
  $FD83: 00        BRK
  $FD84: 00        BRK
  $FD85: 00        BRK
  $FD86: 00        BRK
  $FD87: 00        BRK
  $FD88: 00        BRK
  $FD89: 00        BRK
  $FD8A: 00        BRK
  $FD8B: 00        BRK
  $FD8C: 00        BRK
  $FD8D: 00        BRK
  $FD8E: 00        BRK
  $FD8F: 00        BRK
  $FD90: 00        BRK
  $FD91: 00        BRK
  $FD92: 00        BRK
  $FD93: 00        BRK
  $FD94: 00        BRK
  $FD95: 00        BRK
  $FD96: 00        BRK
  $FD97: 00        BRK
  $FD98: 00        BRK
  $FD99: 00        BRK
  $FD9A: 00        BRK
  $FD9B: 00        BRK
  $FD9C: 00        BRK
  $FD9D: 00        BRK
  $FD9E: 00        BRK
  $FD9F: 00        BRK
  $FDA0: 00        BRK
  $FDA1: 00        BRK
  $FDA2: 00        BRK
  $FDA3: 00        BRK
  $FDA4: 00        BRK
  $FDA5: 00        BRK
  $FDA6: 00        BRK
  $FDA7: 00        BRK
  $FDA8: 00        BRK
  $FDA9: 00        BRK
  $FDAA: 00        BRK
  $FDAB: 00        BRK
  $FDAC: 00        BRK
  $FDAD: 00        BRK
  $FDAE: 00        BRK
  $FDAF: 00        BRK
  $FDB0: 00        BRK
  $FDB1: 00        BRK
  $FDB2: 00        BRK
  $FDB3: 00        BRK
  $FDB4: 00        BRK
  $FDB5: 00        BRK
  $FDB6: 00        BRK
  $FDB7: 00        BRK
  $FDB8: 00        BRK
  $FDB9: 00        BRK
  $FDBA: 00        BRK
  $FDBB: 00        BRK
  $FDBC: 00        BRK
  $FDBD: 00        BRK
  $FDBE: 00        BRK
  $FDBF: 00        BRK
  $FDC0: 00        BRK
  $FDC1: 00        BRK
  $FDC2: 00        BRK
  $FDC3: 00        BRK
  $FDC4: 00        BRK
  $FDC5: 00        BRK
  $FDC6: 00        BRK
  $FDC7: 00        BRK
  $FDC8: 00        BRK
  $FDC9: 00        BRK
  $FDCA: 00        BRK
  $FDCB: 00        BRK
  $FDCC: 00        BRK
  $FDCD: 00        BRK
  $FDCE: 00        BRK
  $FDCF: 00        BRK
  $FDD0: 00        BRK
  $FDD1: 00        BRK
  $FDD2: 00        BRK
  $FDD3: 00        BRK
  $FDD4: 00        BRK
  $FDD5: 00        BRK
  $FDD6: 00        BRK
  $FDD7: 00        BRK
  $FDD8: 00        BRK
  $FDD9: 00        BRK
  $FDDA: 00        BRK
  $FDDB: 00        BRK
  $FDDC: 00        BRK
  $FDDD: 00        BRK
  $FDDE: 00        BRK
  $FDDF: 00        BRK
  $FDE0: 00        BRK
  $FDE1: 00        BRK
  $FDE2: 00        BRK
  $FDE3: 00        BRK
  $FDE4: 00        BRK
  $FDE5: 00        BRK
  $FDE6: 00        BRK
  $FDE7: 00        BRK
  $FDE8: 00        BRK
  $FDE9: 00        BRK
  $FDEA: 00        BRK
  $FDEB: 00        BRK
  $FDEC: 00        BRK
  $FDED: 00        BRK
  $FDEE: 00        BRK
  $FDEF: 00        BRK
  $FDF0: 00        BRK
  $FDF1: 00        BRK
  $FDF2: 00        BRK
  $FDF3: 00        BRK
  $FDF4: 00        BRK
  $FDF5: 00        BRK
  $FDF6: 00        BRK
  $FDF7: 00        BRK
  $FDF8: 00        BRK
  $FDF9: 00        BRK
  $FDFA: 00        BRK
  $FDFB: 00        BRK
  $FDFC: 00        BRK
  $FDFD: 00        BRK
  $FDFE: 00        BRK
  $FDFF: 00        BRK
  $FE00: 00        BRK
  $FE01: 00        BRK
  $FE02: 00        BRK
  $FE03: 00        BRK
  $FE04: 00        BRK
  $FE05: 00        BRK
  $FE06: 00        BRK
  $FE07: 00        BRK
  $FE08: 00        BRK
  $FE09: 00        BRK
  $FE0A: 00        BRK
  $FE0B: 00        BRK
  $FE0C: 00        BRK
  $FE0D: 00        BRK
  $FE0E: 00        BRK
  $FE0F: 00        BRK
  $FE10: 00        BRK
  $FE11: 00        BRK
  $FE12: 00        BRK
  $FE13: 00        BRK
  $FE14: 00        BRK
  $FE15: 00        BRK
  $FE16: 00        BRK
  $FE17: 00        BRK
  $FE18: 00        BRK
  $FE19: 00        BRK
  $FE1A: 00        BRK
  $FE1B: 00        BRK
  $FE1C: 00        BRK
  $FE1D: 00        BRK
  $FE1E: 00        BRK
  $FE1F: 00        BRK
  $FE20: 00        BRK
  $FE21: 00        BRK
  $FE22: 00        BRK
  $FE23: 00        BRK
  $FE24: 00        BRK
  $FE25: 00        BRK
  $FE26: 00        BRK
  $FE27: 00        BRK
  $FE28: 00        BRK
  $FE29: 00        BRK
  $FE2A: 00        BRK
  $FE2B: 00        BRK
  $FE2C: 00        BRK
  $FE2D: 00        BRK
  $FE2E: 00        BRK
  $FE2F: 00        BRK
  $FE30: 00        BRK
  $FE31: 00        BRK
  $FE32: 00        BRK
  $FE33: 00        BRK
  $FE34: 00        BRK
  $FE35: 00        BRK
  $FE36: 00        BRK
  $FE37: 00        BRK
  $FE38: 00        BRK
  $FE39: 00        BRK
  $FE3A: 00        BRK
  $FE3B: 00        BRK
  $FE3C: 00        BRK
  $FE3D: 00        BRK
  $FE3E: 00        BRK
  $FE3F: 00        BRK
  $FE40: 00        BRK
  $FE41: 00        BRK
  $FE42: 00        BRK
  $FE43: 00        BRK
  $FE44: 00        BRK
  $FE45: 00        BRK
  $FE46: 00        BRK
  $FE47: 00        BRK
  $FE48: 00        BRK
  $FE49: 00        BRK
  $FE4A: 00        BRK
  $FE4B: 00        BRK
  $FE4C: 00        BRK
  $FE4D: 00        BRK
  $FE4E: 00        BRK
  $FE4F: 00        BRK
  $FE50: 00        BRK
  $FE51: 00        BRK
  $FE52: 00        BRK
  $FE53: 00        BRK
  $FE54: 00        BRK
  $FE55: 00        BRK
  $FE56: 00        BRK
  $FE57: 00        BRK
  $FE58: 00        BRK
  $FE59: 00        BRK
  $FE5A: 00        BRK
  $FE5B: 00        BRK
  $FE5C: 00        BRK
  $FE5D: 00        BRK
  $FE5E: 00        BRK
  $FE5F: 00        BRK
  $FE60: 00        BRK
  $FE61: 00        BRK
  $FE62: 00        BRK
  $FE63: 00        BRK
  $FE64: 00        BRK
  $FE65: 00        BRK
  $FE66: 00        BRK
  $FE67: 00        BRK
  $FE68: 00        BRK
  $FE69: 00        BRK
  $FE6A: 00        BRK
  $FE6B: 00        BRK
  $FE6C: 00        BRK
  $FE6D: 00        BRK
  $FE6E: 00        BRK
  $FE6F: 00        BRK
  $FE70: 00        BRK
  $FE71: 00        BRK
  $FE72: 00        BRK
  $FE73: 00        BRK
  $FE74: 00        BRK
  $FE75: 00        BRK
  $FE76: 00        BRK
  $FE77: 00        BRK
  $FE78: 00        BRK
  $FE79: 00        BRK
  $FE7A: 00        BRK
  $FE7B: 00        BRK
  $FE7C: 00        BRK
  $FE7D: 00        BRK
  $FE7E: 00        BRK
  $FE7F: 00        BRK
  $FE80: 00        BRK
  $FE81: 00        BRK
  $FE82: 00        BRK
  $FE83: 00        BRK
  $FE84: 00        BRK
  $FE85: 00        BRK
  $FE86: 00        BRK
  $FE87: 00        BRK
  $FE88: 00        BRK
  $FE89: 00        BRK
  $FE8A: 00        BRK
  $FE8B: 00        BRK
  $FE8C: 00        BRK
  $FE8D: 00        BRK
  $FE8E: 00        BRK
  $FE8F: 00        BRK
  $FE90: 00        BRK
  $FE91: 00        BRK
  $FE92: 00        BRK
  $FE93: 00        BRK
  $FE94: 00        BRK
  $FE95: 00        BRK
  $FE96: 00        BRK
  $FE97: 00        BRK
  $FE98: 00        BRK
  $FE99: 00        BRK
  $FE9A: 00        BRK
  $FE9B: 00        BRK
  $FE9C: 00        BRK
  $FE9D: 00        BRK
  $FE9E: 00        BRK
  $FE9F: 00        BRK
  $FEA0: 00        BRK
  $FEA1: 00        BRK
  $FEA2: 00        BRK
  $FEA3: 00        BRK
  $FEA4: 00        BRK
  $FEA5: 00        BRK
  $FEA6: 00        BRK
  $FEA7: 00        BRK
  $FEA8: 00        BRK
  $FEA9: 00        BRK
  $FEAA: 00        BRK
  $FEAB: 00        BRK
  $FEAC: 00        BRK
  $FEAD: 00        BRK
  $FEAE: 00        BRK
  $FEAF: 00        BRK
  $FEB0: 00        BRK
  $FEB1: 00        BRK
  $FEB2: 00        BRK
  $FEB3: 00        BRK
  $FEB4: 00        BRK
  $FEB5: 00        BRK
  $FEB6: 00        BRK
  $FEB7: 00        BRK
  $FEB8: 00        BRK
  $FEB9: 00        BRK
  $FEBA: 00        BRK
  $FEBB: 00        BRK
  $FEBC: 00        BRK
  $FEBD: 00        BRK
  $FEBE: 00        BRK
  $FEBF: 00        BRK
  $FEC0: 00        BRK
  $FEC1: 00        BRK
  $FEC2: 00        BRK
  $FEC3: 00        BRK
  $FEC4: 00        BRK
  $FEC5: 00        BRK
  $FEC6: 00        BRK
  $FEC7: 00        BRK
  $FEC8: 00        BRK
  $FEC9: 00        BRK
  $FECA: 00        BRK
  $FECB: 00        BRK
  $FECC: 00        BRK
  $FECD: 00        BRK
  $FECE: 00        BRK
  $FECF: 00        BRK
  $FED0: 00        BRK
  $FED1: 00        BRK
  $FED2: 00        BRK
  $FED3: 00        BRK
  $FED4: 00        BRK
  $FED5: 00        BRK
  $FED6: 00        BRK
  $FED7: 00        BRK
  $FED8: 00        BRK
  $FED9: 00        BRK
  $FEDA: 00        BRK
  $FEDB: 00        BRK
  $FEDC: 00        BRK
  $FEDD: 00        BRK
  $FEDE: 00        BRK
  $FEDF: 00        BRK
  $FEE0: 00        BRK
  $FEE1: 00        BRK
  $FEE2: 00        BRK
  $FEE3: 00        BRK
  $FEE4: 00        BRK
  $FEE5: 00        BRK
  $FEE6: 00        BRK
  $FEE7: 00        BRK
  $FEE8: 00        BRK
  $FEE9: 00        BRK
  $FEEA: 00        BRK
  $FEEB: 00        BRK
  $FEEC: 00        BRK
  $FEED: 00        BRK
  $FEEE: 00        BRK
  $FEEF: 00        BRK
  $FEF0: 00        BRK
  $FEF1: 00        BRK
  $FEF2: 00        BRK
  $FEF3: 00        BRK
  $FEF4: 00        BRK
  $FEF5: 00        BRK
  $FEF6: 00        BRK
  $FEF7: 00        BRK
  $FEF8: 00        BRK
  $FEF9: 00        BRK
  $FEFA: 00        BRK
  $FEFB: 00        BRK
  $FEFC: 00        BRK
  $FEFD: 00        BRK
  $FEFE: 00        BRK
  $FEFF: 00        BRK
  $FF00: 00        BRK
  $FF01: 00        BRK
  $FF02: 00        BRK
  $FF03: 00        BRK
  $FF04: 00        BRK
  $FF05: 00        BRK
  $FF06: 00        BRK
  $FF07: 00        BRK
  $FF08: 00        BRK
  $FF09: 00        BRK
  $FF0A: 00        BRK
  $FF0B: 00        BRK
  $FF0C: 00        BRK
  $FF0D: 00        BRK
  $FF0E: 00        BRK
  $FF0F: 00        BRK
  $FF10: 00        BRK
  $FF11: 00        BRK
  $FF12: 00        BRK
  $FF13: 00        BRK
  $FF14: 00        BRK
  $FF15: 00        BRK
  $FF16: 00        BRK
  $FF17: 00        BRK
  $FF18: 00        BRK
  $FF19: 00        BRK
  $FF1A: 00        BRK
  $FF1B: 00        BRK
  $FF1C: 00        BRK
  $FF1D: 00        BRK
  $FF1E: 00        BRK
  $FF1F: 00        BRK
  $FF20: 00        BRK
  $FF21: 00        BRK
  $FF22: 00        BRK
  $FF23: 00        BRK
  $FF24: 00        BRK
  $FF25: 00        BRK
  $FF26: 00        BRK
  $FF27: 00        BRK
  $FF28: 00        BRK
  $FF29: 00        BRK
  $FF2A: 00        BRK
  $FF2B: 00        BRK
  $FF2C: 00        BRK
  $FF2D: 00        BRK
  $FF2E: 00        BRK
  $FF2F: 00        BRK
  $FF30: 00        BRK
  $FF31: 00        BRK
  $FF32: 00        BRK
  $FF33: 00        BRK
  $FF34: 00        BRK
  $FF35: 00        BRK
  $FF36: 00        BRK
  $FF37: 00        BRK
  $FF38: 00        BRK
  $FF39: 00        BRK
  $FF3A: 00        BRK
  $FF3B: 00        BRK
  $FF3C: 00        BRK
  $FF3D: 00        BRK
  $FF3E: 00        BRK
  $FF3F: 00        BRK
  $FF40: 00        BRK
  $FF41: 00        BRK
  $FF42: 00        BRK
  $FF43: 00        BRK
  $FF44: 00        BRK
  $FF45: 00        BRK
  $FF46: 00        BRK
  $FF47: 00        BRK
  $FF48: 00        BRK
  $FF49: 00        BRK
  $FF4A: 00        BRK
  $FF4B: 00        BRK
  $FF4C: 00        BRK
  $FF4D: 00        BRK
  $FF4E: 00        BRK
  $FF4F: 00        BRK
  $FF50: 00        BRK
  $FF51: 00        BRK
  $FF52: 00        BRK
  $FF53: 00        BRK
  $FF54: 00        BRK
  $FF55: 00        BRK
  $FF56: 00        BRK
  $FF57: 00        BRK
  $FF58: 00        BRK
  $FF59: 00        BRK
  $FF5A: 00        BRK
  $FF5B: 00        BRK
  $FF5C: 00        BRK
  $FF5D: 00        BRK
  $FF5E: 00        BRK
  $FF5F: 00        BRK
  $FF60: 00        BRK
  $FF61: 00        BRK
  $FF62: 00        BRK
  $FF63: 00        BRK
  $FF64: 00        BRK
  $FF65: 00        BRK
  $FF66: 00        BRK
  $FF67: 00        BRK
  $FF68: 00        BRK
  $FF69: 00        BRK
  $FF6A: 00        BRK
  $FF6B: 00        BRK
  $FF6C: 00        BRK
  $FF6D: 00        BRK
  $FF6E: 00        BRK
  $FF6F: 00        BRK
  $FF70: 00        BRK
  $FF71: 00        BRK
  $FF72: 00        BRK
  $FF73: 00        BRK
  $FF74: 00        BRK
  $FF75: 00        BRK
  $FF76: 00        BRK
  $FF77: 00        BRK
  $FF78: 00        BRK
  $FF79: 00        BRK
  $FF7A: 00        BRK
  $FF7B: 00        BRK
  $FF7C: 00        BRK
  $FF7D: 00        BRK
  $FF7E: 00        BRK
  $FF7F: 00        BRK
  $FF80: 00        BRK
  $FF81: 00        BRK
  $FF82: 00        BRK
  $FF83: 00        BRK
  $FF84: 00        BRK
  $FF85: 00        BRK
  $FF86: 00        BRK
  $FF87: 00        BRK
  $FF88: 00        BRK
  $FF89: 00        BRK
  $FF8A: 00        BRK
  $FF8B: 00        BRK
  $FF8C: 00        BRK
  $FF8D: 00        BRK
  $FF8E: 00        BRK
  $FF8F: 00        BRK
  $FF90: 00        BRK
  $FF91: 00        BRK
  $FF92: 00        BRK
  $FF93: 00        BRK
  $FF94: 00        BRK
  $FF95: 00        BRK
  $FF96: 00        BRK
  $FF97: 00        BRK
  $FF98: 00        BRK
  $FF99: 00        BRK
  $FF9A: 00        BRK
  $FF9B: 00        BRK
  $FF9C: 00        BRK
  $FF9D: 00        BRK
  $FF9E: 00        BRK
  $FF9F: 00        BRK
  $FFA0: 00        BRK
  $FFA1: 00        BRK
  $FFA2: 00        BRK
  $FFA3: 00        BRK
  $FFA4: 00        BRK
  $FFA5: 00        BRK
  $FFA6: 00        BRK
  $FFA7: 00        BRK
  $FFA8: 00        BRK
  $FFA9: 00        BRK
  $FFAA: 00        BRK
  $FFAB: 00        BRK
  $FFAC: 00        BRK
  $FFAD: 00        BRK
  $FFAE: 00        BRK
  $FFAF: 00        BRK
  $FFB0: 00        BRK
  $FFB1: 00        BRK
  $FFB2: 00        BRK
  $FFB3: 00        BRK
  $FFB4: 00        BRK
  $FFB5: 00        BRK
  $FFB6: 00        BRK
  $FFB7: 00        BRK
  $FFB8: 00        BRK
  $FFB9: 00        BRK
  $FFBA: 00        BRK
  $FFBB: 00        BRK
  $FFBC: 00        BRK
  $FFBD: 00        BRK
  $FFBE: 00        BRK
  $FFBF: 00        BRK
  $FFC0: 78        SEI
  $FFC1: D8        CLD
  $FFC2: A9 10     LDA #$10
  $FFC4: 8D 00 20  STA $2000
  $FFC7: A9 80     LDA #$80
  $FFC9: 8D 00 80  STA $8000
  $FFCC: A9 1A     LDA #$1a
  $FFCE: A2 05     LDX #$05
  $FFD0: 8D 00 80  STA $8000
  $FFD3: 4A        LSR A
  $FFD4: CA        DEX
  $FFD5: D0 F9     BNE $ffd0
  $FFD7: 6C 00 80  JMP ($8000)
  $FFDA: 00        BRK
  $FFDB: 00        BRK
  $FFDC: 00        BRK
  $FFDD: 00        BRK
  $FFDE: 00        BRK
  $FFDF: 00        BRK
  $FFE0: 00        BRK
  $FFE1: 00        BRK
  $FFE2: 00        BRK
  $FFE3: 00        BRK
  $FFE4: 00        BRK
  $FFE5: 00        BRK
  $FFE6: 00        BRK
  $FFE7: 00        BRK
  $FFE8: 00        BRK
  $FFE9: 00        BRK
  $FFEA: 00        BRK
  $FFEB: 00        BRK
  $FFEC: 00        BRK
  $FFED: 00        BRK
  $FFEE: 00        BRK
  $FFEF: 00        BRK
  $FFF0: 00        BRK
  $FFF1: 00        BRK
  $FFF2: 00        BRK
  $FFF3: 00        BRK
  $FFF4: 00        BRK
  $FFF5: 00        BRK
  $FFF6: 00        BRK
  $FFF7: 00        BRK
  $FFF8: 00        BRK
  $FFF9: 00        BRK
  $FFFA: 02        ???
  $FFFB: 80 C0     NOP #$c0
  $FFFD: FF 02 80  ISB $8002,X

; ============================================================
; CHR Banks (Pattern Table Data, not disassembled)
; ============================================================
; CHR Bank $00: 8192B, non-zero bytes: 5474
; CHR Bank $01: 8192B, non-zero bytes: 6470
; CHR Bank $02: 8192B, non-zero bytes: 6473
; CHR Bank $03: 8192B, non-zero bytes: 6106
; CHR Bank $04: 8192B, non-zero bytes: 6018
; CHR Bank $05: 8192B, non-zero bytes: 5867
; CHR Bank $06: 8192B, non-zero bytes: 6276
; CHR Bank $07: 8192B, non-zero bytes: 6384
; CHR Bank $08: 8192B, non-zero bytes: 6015
; CHR Bank $09: 8192B, non-zero bytes: 6237
; CHR Bank $0A: 8192B, non-zero bytes: 5462
; CHR Bank $0B: 8192B, non-zero bytes: 5753
; CHR Bank $0C: 8192B, non-zero bytes: 6290
; CHR Bank $0D: 8192B, non-zero bytes: 5202
; CHR Bank $0E: 8192B, non-zero bytes: 6328