; bank_30.asm 分片 5/5 (原文件行 4001-4835, 共 4835 行)

C - - - - - 0x03DA5F 0F:DA4F: A0 08     LDY #$08
C - - - - - 0x03DA61 0F:DA51: B1 34     LDA (ram_0034),Y
C - - - - - 0x03DA63 0F:DA53: 38        SEC
C - - - - - 0x03DA64 0F:DA54: ED 37 06  SBC ram_0637
C - - - - - 0x03DA67 0F:DA57: B0 04     BCS $DA5D
C - - - - - 0x03DA69 0F:DA59: 49 FF     EOR #$FF
C - - - - - 0x03DA6B 0F:DA5B: 69 01     ADC #$01
C - - - - - 0x03DA6D 0F:DA5D: C9 14     CMP #$14
C - - - - - 0x03DA6F 0F:DA5F: B0 02     BCS $DA63
C - - - - - 0x03DA71 0F:DA61: 38        SEC
C - - - - - 0x03DA72 0F:DA62: 60        RTS
C - - - - - 0x03DA73 0F:DA63: 18        CLC
C - - - - - 0x03DA74 0F:DA64: 60        RTS
C - - J - - 0x03DA75 0F:DA65: A9 38     LDA #$38
C - - - - - 0x03DA77 0F:DA67: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DA7A 0F:DA6A: A9 83     LDA #$83
C - - - - - 0x03DA7C 0F:DA6C: 8D 2D 06  STA ram_062D
C - - - - - 0x03DA7F 0F:DA6F: A9 00     LDA #$00
C - - - - - 0x03DA81 0F:DA71: 8D 24 06  STA ram_0624
C - - - - - 0x03DA84 0F:DA74: A9 01     LDA #$01
C - - - - - 0x03DA86 0F:DA76: 20 0F CB  JSR $CB0F
C - - - - - 0x03DA89 0F:DA79: AE 24 06  LDX ram_0624
C - - - - - 0x03DA8C 0F:DA7C: E8        INX
C - - - - - 0x03DA8D 0F:DA7D: E0 10     CPX #$10
C - - - - - 0x03DA8F 0F:DA7F: 90 02     BCC $DA83
C - - - - - 0x03DA91 0F:DA81: A2 00     LDX #$00
C - - - - - 0x03DA93 0F:DA83: 8E 24 06  STX ram_0624
C - - - - - 0x03DA96 0F:DA86: A9 40     LDA #$40
C - - - - - 0x03DA98 0F:DA88: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03DA9B 0F:DA8B: F0 01     BEQ $DA8E
C - - - - - 0x03DA9D 0F:DA8D: 60        RTS
C - - - - - 0x03DA9E 0F:DA8E: A9 80     LDA #$80
C - - - - - 0x03DAA0 0F:DA90: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03DAA3 0F:DA93: F0 DF     BEQ $DA74
C - - - - - 0x03DAA5 0F:DA95: 4C 0C D7  JMP $D70C
C D 2 - - - 0x03DAA8 0F:DA98: A9 00     LDA #$00
C - - - - - 0x03DAAA 0F:DA9A: 8D 2D 06  STA ram_062D
C - - - - - 0x03DAAD 0F:DA9D: 8D 15 06  STA ram_0615
C - - - - - 0x03DAB0 0F:DAA0: A9 33     LDA #$33
C - - - - - 0x03DAB2 0F:DAA2: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DAB5 0F:DAA5: A9 FF     LDA #$FF
C - - - - - 0x03DAB7 0F:DAA7: 4C FE CE  JMP $CEFE
C D 2 - - - 0x03DABA 0F:DAAA: A9 01     LDA #$01
C - - - - - 0x03DABC 0F:DAAC: 20 F1 CB  JSR $CBF1
C - - - - - 0x03DABF 0F:DAAF: 20 4F CF  JSR $CF4F
C - - - - - 0x03DAC2 0F:DAB2: 48        PHA
C - - - - - 0x03DAC3 0F:DAB3: A5 22     LDA ram_0022
C - - - - - 0x03DAC5 0F:DAB5: A9 1A     LDA #$1A
C - - - - - 0x03DAC7 0F:DAB7: 85 24     STA ram_0024
C - - - - - 0x03DAC9 0F:DAB9: A9 1B     LDA #$1B
C - - - - - 0x03DACB 0F:DABB: 85 25     STA ram_0025
C - - - - - 0x03DACD 0F:DABD: 20 2D CE  JSR $CE2D
C - - - - - 0x03DAD0 0F:DAC0: 68        PLA
C - - - - - 0x03DAD1 0F:DAC1: 20 39 80  JSR $8039
C - - - - - 0x03DAD4 0F:DAC4: 20 24 DB  JSR $DB24
C - - - - - 0x03DAD7 0F:DAC7: A9 00     LDA #$00
C - - - - - 0x03DAD9 0F:DAC9: 20 7F EF  JSR $EF7F
C - - - - - 0x03DADC 0F:DACC: A9 01     LDA #$01
C - - - - - 0x03DADE 0F:DACE: 20 7F EF  JSR $EF7F
C - - - - - 0x03DAE1 0F:DAD1: AD 29 06  LDA ram_0629
C - - - - - 0x03DAE4 0F:DAD4: C9 04     CMP #$04
C - - - - - 0x03DAE6 0F:DAD6: F0 11     BEQ $DAE9
C - - - - - 0x03DAE8 0F:DAD8: A9 35     LDA #$35
C - - - - - 0x03DAEA 0F:DADA: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DAED 0F:DADD: A9 01     LDA #$01
C - - - - - 0x03DAEF 0F:DADF: 20 0F CB  JSR $CB0F
C - - - - - 0x03DAF2 0F:DAE2: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03DAF5 0F:DAE5: 29 C0     AND #$C0
C - - - - - 0x03DAF7 0F:DAE7: F0 F4     BEQ $DADD
C - - - - - 0x03DAF9 0F:DAE9: AD FB 05  LDA ram_05FB
C - - - - - 0x03DAFC 0F:DAEC: 18        CLC
C - - - - - 0x03DAFD 0F:DAED: 69 08     ADC #$08
C - - - - - 0x03DAFF 0F:DAEF: 8D 41 04  STA ram_0441
C - - - - - 0x03DB02 0F:DAF2: 20 07 DC  JSR $DC07
C - - - - - 0x03DB05 0F:DAF5: AD E2 00  LDA a: ram_00E2
C - - - - - 0x03DB08 0F:DAF8: 29 07     AND #$07
C - - - - - 0x03DB0A 0F:DAFA: C9 05     CMP #$05
C - - - - - 0x03DB0C 0F:DAFC: 90 02     BCC $DB00
C - - - - - 0x03DB0E 0F:DAFE: E9 05     SBC #$05
C - - - - - 0x03DB10 0F:DB00: AA        TAX
C - - - - - 0x03DB11 0F:DB01: BD 82 DC  LDA $DC82,X
C - - - - - 0x03DB14 0F:DB04: 18        CLC
C - - - - - 0x03DB15 0F:DB05: 6D FB 05  ADC ram_05FB
C - - - - - 0x03DB18 0F:DB08: 8D FC 05  STA ram_05FC
C - - - - - 0x03DB1B 0F:DB0B: 20 EC E6  JSR $E6EC
C - - - - - 0x03DB1E 0F:DB0E: A9 36     LDA #$36
C - - - - - 0x03DB20 0F:DB10: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DB23 0F:DB13: AD FC 05  LDA ram_05FC
C - - - - - 0x03DB26 0F:DB16: 8D 41 04  STA ram_0441
C - - - - - 0x03DB29 0F:DB19: A9 01     LDA #$01
C - - - - - 0x03DB2B 0F:DB1B: 8D FD 05  STA ram_05FD
C - - - - - 0x03DB2E 0F:DB1E: A2 50     LDX #$50
C - - - - - 0x03DB30 0F:DB20: 9A        TXS
C - - - - - 0x03DB31 0F:DB21: 4C DF E0  JMP $E0DF
C - - - - - 0x03DB34 0F:DB24: AD 29 06  LDA ram_0629
C - - - - - 0x03DB37 0F:DB27: 20 99 CB  JSR $CB99
- D 2 - I - 0x03DB3A 0F:DB2A: 34        .byte $34   ; <4>
- D 2 - I - 0x03DB3B 0F:DB2B: DB        .byte $DB   ; 
- D 2 - I - 0x03DB3C 0F:DB2C: 9E        .byte $9E   ; 
- D 2 - I - 0x03DB3D 0F:DB2D: DB        .byte $DB   ; 
- D 2 - I - 0x03DB3E 0F:DB2E: FC        .byte $FC   ; 
- D 2 - I - 0x03DB3F 0F:DB2F: DB        .byte $DB   ; 
- D 2 - I - 0x03DB40 0F:DB30: F3        .byte $F3   ; 
- D 2 - I - 0x03DB41 0F:DB31: DB        .byte $DB   ; 
- D 2 - I - 0x03DB42 0F:DB32: 03        .byte $03   ; 
- D 2 - I - 0x03DB43 0F:DB33: DC        .byte $DC   ; 
C - - J - - 0x03DB44 0F:DB34: 48        PHA
C - - - - - 0x03DB45 0F:DB35: A5 22     LDA ram_0022
C - - - - - 0x03DB47 0F:DB37: A9 1C     LDA #$1C
C - - - - - 0x03DB49 0F:DB39: 85 24     STA ram_0024
C - - - - - 0x03DB4B 0F:DB3B: A9 1D     LDA #$1D
C - - - - - 0x03DB4D 0F:DB3D: 85 25     STA ram_0025
C - - - - - 0x03DB4F 0F:DB3F: 20 2D CE  JSR $CE2D
C - - - - - 0x03DB52 0F:DB42: 68        PLA
C - - - - - 0x03DB53 0F:DB43: 20 03 80  JSR $8003
C - - - - - 0x03DB56 0F:DB46: A9 00     LDA #$00
C - - - - - 0x03DB58 0F:DB48: 8D 47 04  STA ram_0447
C - - - - - 0x03DB5B 0F:DB4B: A2 00     LDX #$00
C - - - - - 0x03DB5D 0F:DB4D: AD 2B 00  LDA a: ram_002B
C - - - - - 0x03DB60 0F:DB50: C9 03     CMP #$03
C - - - - - 0x03DB62 0F:DB52: F0 07     BEQ $DB5B
C - - - - - 0x03DB64 0F:DB54: 2C E2 00  BIT a: ram_00E2
C - - - - - 0x03DB67 0F:DB57: 10 02     BPL $DB5B
C - - - - - 0x03DB69 0F:DB59: A2 0B     LDX #$0B
C - - - - - 0x03DB6B 0F:DB5B: 8E 4F 04  STX ram_044F
C - - - - - 0x03DB6E 0F:DB5E: 8E FB 05  STX ram_05FB
C - - - - - 0x03DB71 0F:DB61: 60        RTS
C D 2 - - - 0x03DB72 0F:DB62: A9 0A     LDA #$0A
C - - - - - 0x03DB74 0F:DB64: AE 2A 00  LDX a: ram_002A
C - - - - - 0x03DB77 0F:DB67: E0 02     CPX #$02
C - - - - - 0x03DB79 0F:DB69: D0 02     BNE $DB6D
C - - - - - 0x03DB7B 0F:DB6B: A9 14     LDA #$14
C - - - - - 0x03DB7D 0F:DB6D: 48        PHA
C - - - - - 0x03DB7E 0F:DB6E: C9 0B     CMP #$0B
C - - - - - 0x03DB80 0F:DB70: 90 02     BCC $DB74
C - - - - - 0x03DB82 0F:DB72: 69 0A     ADC #$0A
C - - - - - 0x03DB84 0F:DB74: A2 00     LDX #$00
C - - - - - 0x03DB86 0F:DB76: 20 08 CE  JSR $CE08
C - - - - - 0x03DB89 0F:DB79: A0 00     LDY #$00
C - - - - - 0x03DB8B 0F:DB7B: B1 34     LDA (ram_0034),Y
C - - - - - 0x03DB8D 0F:DB7D: C9 20     CMP #$20
C - - - - - 0x03DB8F 0F:DB7F: D0 0B     BNE $DB8C
C - - - - - 0x03DB91 0F:DB81: AD 4D 04  LDA ram_044D
C - - - - - 0x03DB94 0F:DB84: F0 06     BEQ $DB8C
C - - - - - 0x03DB96 0F:DB86: A9 00     LDA #$00
C - - - - - 0x03DB98 0F:DB88: 85 32     STA ram_0032
C - - - - - 0x03DB9A 0F:DB8A: 85 33     STA ram_0033
C - - - - - 0x03DB9C 0F:DB8C: A0 01     LDY #$01
C - - - - - 0x03DB9E 0F:DB8E: A5 32     LDA ram_0032
C - - - - - 0x03DBA0 0F:DB90: 91 34     STA (ram_0034),Y
C - - - - - 0x03DBA2 0F:DB92: C8        INY
C - - - - - 0x03DBA3 0F:DB93: A5 33     LDA ram_0033
C - - - - - 0x03DBA5 0F:DB95: 91 34     STA (ram_0034),Y
C - - - - - 0x03DBA7 0F:DB97: 68        PLA
C - - - - - 0x03DBA8 0F:DB98: 38        SEC
C - - - - - 0x03DBA9 0F:DB99: E9 01     SBC #$01
C - - - - - 0x03DBAB 0F:DB9B: 10 D0     BPL $DB6D
C - - - - - 0x03DBAD 0F:DB9D: 60        RTS
C - - J - - 0x03DBAE 0F:DB9E: 20 F3 DB  JSR $DBF3
C - - - - - 0x03DBB1 0F:DBA1: A2 00     LDX #$00
C - - - - - 0x03DBB3 0F:DBA3: AD 2B 00  LDA a: ram_002B
C - - - - - 0x03DBB6 0F:DBA6: DD EA DB  CMP $DBEA,X
C - - - - - 0x03DBB9 0F:DBA9: F0 09     BEQ $DBB4
C - - - - - 0x03DBBB 0F:DBAB: E8        INX
C - - - - - 0x03DBBC 0F:DBAC: E8        INX
C - - - - - 0x03DBBD 0F:DBAD: E8        INX
C - - - - - 0x03DBBE 0F:DBAE: E0 09     CPX #$09
C - - - - - 0x03DBC0 0F:DBB0: F0 19     BEQ $DBCB
C - - - - - 0x03DBC2 0F:DBB2: D0 F2     BNE $DBA6
C - - - - - 0x03DBC4 0F:DBB4: BD EB DB  LDA $DBEB,X
C - - - - - 0x03DBC7 0F:DBB7: 20 7C CD  JSR $CD7C
C - - - - - 0x03DBCA 0F:DBBA: A0 00     LDY #$00
C - - - - - 0x03DBCC 0F:DBBC: BD EC DB  LDA $DBEC,X
C - - - - - 0x03DBCF 0F:DBBF: 91 34     STA (ram_0034),Y
C - - - - - 0x03DBD1 0F:DBC1: AD 2B 00  LDA a: ram_002B
C - - - - - 0x03DBD4 0F:DBC4: C9 0C     CMP #$0C
C - - - - - 0x03DBD6 0F:DBC6: D0 03     BNE $DBCB
C - - - - - 0x03DBD8 0F:DBC8: 20 CC DB  JSR $DBCC
C - - - - - 0x03DBDB 0F:DBCB: 60        RTS
C - - - - - 0x03DBDC 0F:DBCC: A9 0C     LDA #$0C
C - - - - - 0x03DBDE 0F:DBCE: 48        PHA
C - - - - - 0x03DBDF 0F:DBCF: C9 14     CMP #$14
C - - - - - 0x03DBE1 0F:DBD1: F0 0E     BEQ $DBE1
C - - - - - 0x03DBE3 0F:DBD3: 20 7C CD  JSR $CD7C
C - - - - - 0x03DBE6 0F:DBD6: A0 01     LDY #$01
C - - - - - 0x03DBE8 0F:DBD8: A9 80     LDA #$80
C - - - - - 0x03DBEA 0F:DBDA: 91 34     STA (ram_0034),Y
C - - - - - 0x03DBEC 0F:DBDC: C8        INY
C - - - - - 0x03DBED 0F:DBDD: A9 CB     LDA #$CB
C - - - - - 0x03DBEF 0F:DBDF: 91 34     STA (ram_0034),Y
C - - - - - 0x03DBF1 0F:DBE1: 68        PLA
C - - - - - 0x03DBF2 0F:DBE2: 18        CLC
C - - - - - 0x03DBF3 0F:DBE3: 69 01     ADC #$01
C - - - - - 0x03DBF5 0F:DBE5: C9 16     CMP #$16
C - - - - - 0x03DBF7 0F:DBE7: D0 E5     BNE $DBCE
C - - - - - 0x03DBF9 0F:DBE9: 60        RTS
- D 2 - - - 0x03DBFA 0F:DBEA: 23        .byte $23   ; 
- D 2 - - - 0x03DBFB 0F:DBEB: 14        .byte $14   ; 
- D 2 - - - 0x03DBFC 0F:DBEC: 75        .byte $75   ; <u>
- D 2 - - - 0x03DBFD 0F:DBED: 0C        .byte $0C   ; 
- D 2 - - - 0x03DBFE 0F:DBEE: 14        .byte $14   ; 
- D 2 - - - 0x03DBFF 0F:DBEF: 34        .byte $34   ; <4>
- D 2 - - - 0x03DC00 0F:DBF0: 12        .byte $12   ; 
- D 2 - - - 0x03DC01 0F:DBF1: 15        .byte $15   ; 
- D 2 - - - 0x03DC02 0F:DBF2: 45        .byte $45   ; <E>
C - - - - - 0x03DC03 0F:DBF3: AD 4F 04  LDA ram_044F
C - - - - - 0x03DC06 0F:DBF6: 49 0B     EOR #$0B
C - - - - - 0x03DC08 0F:DBF8: 8D FB 05  STA ram_05FB
C - - - - - 0x03DC0B 0F:DBFB: 60        RTS
C - - J - - 0x03DC0C 0F:DBFC: AD 4F 04  LDA ram_044F
C - - - - - 0x03DC0F 0F:DBFF: 8D FB 05  STA ram_05FB
C - - - - - 0x03DC12 0F:DC02: 60        RTS
C - - J - - 0x03DC13 0F:DC03: 20 4F CF  JSR $CF4F
C - - - - - 0x03DC16 0F:DC06: 60        RTS
C - - - - - 0x03DC17 0F:DC07: AD 2C 00  LDA a: ram_002C
C - - - - - 0x03DC1A 0F:DC0A: 0A        ASL
C - - - - - 0x03DC1B 0F:DC0B: 48        PHA
C - - - - - 0x03DC1C 0F:DC0C: 6D 2C 00  ADC a: ram_002C
C - - - - - 0x03DC1F 0F:DC0F: 85 3A     STA ram_003A
C - - - - - 0x03DC21 0F:DC11: 68        PLA
C - - - - - 0x03DC22 0F:DC12: 0A        ASL
C - - - - - 0x03DC23 0F:DC13: 0A        ASL
C - - - - - 0x03DC24 0F:DC14: 65 3A     ADC ram_003A
C - - - - - 0x03DC26 0F:DC16: 85 3A     STA ram_003A
C - - - - - 0x03DC28 0F:DC18: AD 2E 00  LDA a: ram_002E
C - - - - - 0x03DC2B 0F:DC1B: 0A        ASL
C - - - - - 0x03DC2C 0F:DC1C: 48        PHA
C - - - - - 0x03DC2D 0F:DC1D: 6D 2E 00  ADC a: ram_002E
C - - - - - 0x03DC30 0F:DC20: 85 3B     STA ram_003B
C - - - - - 0x03DC32 0F:DC22: 68        PLA
C - - - - - 0x03DC33 0F:DC23: 0A        ASL
C - - - - - 0x03DC34 0F:DC24: 0A        ASL
C - - - - - 0x03DC35 0F:DC25: 65 3B     ADC ram_003B
C - - - - - 0x03DC37 0F:DC27: 85 3B     STA ram_003B
C - - - - - 0x03DC39 0F:DC29: A9 00     LDA #$00
C D 2 - - - 0x03DC3B 0F:DC2B: 48        PHA
C - - - - - 0x03DC3C 0F:DC2C: 20 7C CD  JSR $CD7C
C - - - - - 0x03DC3F 0F:DC2F: A6 3A     LDX ram_003A
C - - - - - 0x03DC41 0F:DC31: E6 3A     INC ram_003A
C - - - - - 0x03DC43 0F:DC33: 68        PLA
C - - - - - 0x03DC44 0F:DC34: 48        PHA
C - - - - - 0x03DC45 0F:DC35: C9 0B     CMP #$0B
C - - - - - 0x03DC47 0F:DC37: AD FB 05  LDA ram_05FB
C - - - - - 0x03DC4A 0F:DC3A: 90 06     BCC $DC42
C - - - - - 0x03DC4C 0F:DC3C: A6 3B     LDX ram_003B
C - - - - - 0x03DC4E 0F:DC3E: 49 0B     EOR #$0B
C - - - - - 0x03DC50 0F:DC40: E6 3B     INC ram_003B
C - - - - - 0x03DC52 0F:DC42: A8        TAY
C - - - - - 0x03DC53 0F:DC43: BD 87 DC  LDA $DC87,X
C - - - - - 0x03DC56 0F:DC46: 88        DEY
C - - - - - 0x03DC57 0F:DC47: 30 03     BMI $DC4C
C - - - - - 0x03DC59 0F:DC49: BD B3 DC  LDA $DCB3,X
C - - - - - 0x03DC5C 0F:DC4C: 20 C9 CD  JSR $CDC9
C - - - - - 0x03DC5F 0F:DC4F: AD FB 05  LDA ram_05FB
C - - - - - 0x03DC62 0F:DC52: F0 0A     BEQ $DC5E
C - - - - - 0x03DC64 0F:DC54: 98        TYA
C - - - - - 0x03DC65 0F:DC55: 49 FF     EOR #$FF
C - - - - - 0x03DC67 0F:DC57: A8        TAY
C - - - - - 0x03DC68 0F:DC58: 8A        TXA
C - - - - - 0x03DC69 0F:DC59: 49 FF     EOR #$FF
C - - - - - 0x03DC6B 0F:DC5B: AA        TAX
C - - - - - 0x03DC6C 0F:DC5C: C8        INY
C - - - - - 0x03DC6D 0F:DC5D: E8        INX
C - - - - - 0x03DC6E 0F:DC5E: 98        TYA
C - - - - - 0x03DC6F 0F:DC5F: A0 08     LDY #$08
C - - - - - 0x03DC71 0F:DC61: 91 34     STA (ram_0034),Y
C - - - - - 0x03DC73 0F:DC63: 8A        TXA
C - - - - - 0x03DC74 0F:DC64: A0 06     LDY #$06
C - - - - - 0x03DC76 0F:DC66: 91 34     STA (ram_0034),Y
C - - - - - 0x03DC78 0F:DC68: 68        PLA
C - - - - - 0x03DC79 0F:DC69: 48        PHA
C - - - - - 0x03DC7A 0F:DC6A: F0 04     BEQ $DC70
C - - - - - 0x03DC7C 0F:DC6C: C9 0B     CMP #$0B
C - - - - - 0x03DC7E 0F:DC6E: D0 06     BNE $DC76
C - - - - - 0x03DC80 0F:DC70: A9 00     LDA #$00
C - - - - - 0x03DC82 0F:DC72: A0 07     LDY #$07
C - - - - - 0x03DC84 0F:DC74: 91 34     STA (ram_0034),Y
C - - - - - 0x03DC86 0F:DC76: 68        PLA
C - - - - - 0x03DC87 0F:DC77: 18        CLC
C - - - - - 0x03DC88 0F:DC78: 69 01     ADC #$01
C - - - - - 0x03DC8A 0F:DC7A: C9 16     CMP #$16
C - - - - - 0x03DC8C 0F:DC7C: F0 03     BEQ $DC81
C - - - - - 0x03DC8E 0F:DC7E: 4C 2B DC  JMP $DC2B
C - - - - - 0x03DC91 0F:DC81: 60        RTS
- D 2 - - - 0x03DC92 0F:DC82: 05        .byte $05   ; 
- D 2 - - - 0x03DC93 0F:DC83: 06        .byte $06   ; 
- D 2 - - - 0x03DC94 0F:DC84: 07        .byte $07   ; 
- D 2 - - - 0x03DC95 0F:DC85: 09        .byte $09   ; 
- D 2 - - - 0x03DC96 0F:DC86: 0A        .byte $0A   ; 
- D 2 - - - 0x03DC97 0F:DC87: 05        .byte $05   ; 
- D 2 - - - 0x03DC98 0F:DC88: 3D        .byte $3D   ; 
- D 2 - - - 0x03DC99 0F:DC89: 46        .byte $46   ; <F>
- D 2 - - - 0x03DC9A 0F:DC8A: 41        .byte $41   ; <A>
- D 2 - - - 0x03DC9B 0F:DC8B: 2A        .byte $2A   ; 
- D 2 - - - 0x03DC9C 0F:DC8C: 57        .byte $57   ; <W>
- D 2 - - - 0x03DC9D 0F:DC8D: 77        .byte $77   ; <w>
- D 2 - - - 0x03DC9E 0F:DC8E: 5C        .byte $5C   ; 
- D 2 - - - 0x03DC9F 0F:DC8F: 71        .byte $71   ; <q>
- D 2 - - - 0x03DCA0 0F:DC90: 72        .byte $72   ; <r>
- D 2 - - - 0x03DCA1 0F:DC91: 6C        .byte $6C   ; <l>
- D 2 - - - 0x03DCA2 0F:DC92: 05        .byte $05   ; 
- D 2 - - - 0x03DCA3 0F:DC93: 3D        .byte $3D   ; 
- D 2 - - - 0x03DCA4 0F:DC94: 46        .byte $46   ; <F>
- D 2 - - - 0x03DCA5 0F:DC95: 41        .byte $41   ; <A>
- D 2 - - - 0x03DCA6 0F:DC96: 2A        .byte $2A   ; 
- D 2 - - - 0x03DCA7 0F:DC97: 63        .byte $63   ; <c>
- D 2 - - - 0x03DCA8 0F:DC98: 68        .byte $68   ; <h>
- D 2 - - - 0x03DCA9 0F:DC99: 5A        .byte $5A   ; <Z>
- D 2 - - - 0x03DCAA 0F:DC9A: 72        .byte $72   ; <r>
- D 2 - - - 0x03DCAB 0F:DC9B: 59        .byte $59   ; <Y>
- D 2 - - - 0x03DCAC 0F:DC9C: 71        .byte $71   ; <q>
- D 2 - - - 0x03DCAD 0F:DC9D: 05        .byte $05   ; 
- D 2 - - - 0x03DCAE 0F:DC9E: 3D        .byte $3D   ; 
- D 2 - - - 0x03DCAF 0F:DC9F: 46        .byte $46   ; <F>
- D 2 - - - 0x03DCB0 0F:DCA0: 35        .byte $35   ; <5>
- D 2 - - - 0x03DCB1 0F:DCA1: 4C        .byte $4C   ; <L>
- D 2 - - - 0x03DCB2 0F:DCA2: 63        .byte $63   ; <c>
- D 2 - - - 0x03DCB3 0F:DCA3: 68        .byte $68   ; <h>
- D 2 - - - 0x03DCB4 0F:DCA4: 4F        .byte $4F   ; <O>
- D 2 - - - 0x03DCB5 0F:DCA5: 72        .byte $72   ; <r>
- D 2 - - - 0x03DCB6 0F:DCA6: 5A        .byte $5A   ; <Z>
- D 2 - - - 0x03DCB7 0F:DCA7: 71        .byte $71   ; <q>
- D 2 - - - 0x03DCB8 0F:DCA8: 05        .byte $05   ; 
- D 2 - - - 0x03DCB9 0F:DCA9: 3D        .byte $3D   ; 
- D 2 - - - 0x03DCBA 0F:DCAA: 46        .byte $46   ; <F>
- D 2 - - - 0x03DCBB 0F:DCAB: 35        .byte $35   ; <5>
- D 2 - - - 0x03DCBC 0F:DCAC: 37        .byte $37   ; <7>
- D 2 - - - 0x03DCBD 0F:DCAD: 59        .byte $59   ; <Y>
- D 2 - - - 0x03DCBE 0F:DCAE: 77        .byte $77   ; <w>
- D 2 - - - 0x03DCBF 0F:DCAF: 68        .byte $68   ; <h>
- D 2 - - - 0x03DCC0 0F:DCB0: 72        .byte $72   ; <r>
- D 2 - - - 0x03DCC1 0F:DCB1: 71        .byte $71   ; <q>
- D 2 - - - 0x03DCC2 0F:DCB2: 63        .byte $63   ; <c>
- D 2 - - - 0x03DCC3 0F:DCB3: EA        .byte $EA   ; 
- D 2 - - - 0x03DCC4 0F:DCB4: BE        .byte $BE   ; 
- D 2 - - - 0x03DCC5 0F:DCB5: B5        .byte $B5   ; 
- D 2 - - - 0x03DCC6 0F:DCB6: AE        .byte $AE   ; 
- D 2 - - - 0x03DCC7 0F:DCB7: C5        .byte $C5   ; 
- D 2 - - - 0x03DCC8 0F:DCB8: A4        .byte $A4   ; 
- D 2 - - - 0x03DCC9 0F:DCB9: 79        .byte $79   ; <y>
- D 2 - - - 0x03DCCA 0F:DCBA: 9F        .byte $9F   ; 
- D 2 - - - 0x03DCCB 0F:DCBB: 97        .byte $97   ; 
- D 2 - - - 0x03DCCC 0F:DCBC: 94        .byte $94   ; 
- D 2 - - - 0x03DCCD 0F:DCBD: 82        .byte $82   ; 
- D 2 - - - 0x03DCCE 0F:DCBE: EA        .byte $EA   ; 
- D 2 - - - 0x03DCCF 0F:DCBF: BE        .byte $BE   ; 
- D 2 - - - 0x03DCD0 0F:DCC0: B5        .byte $B5   ; 
- D 2 - - - 0x03DCD1 0F:DCC1: AE        .byte $AE   ; 
- D 2 - - - 0x03DCD2 0F:DCC2: C5        .byte $C5   ; 
- D 2 - - - 0x03DCD3 0F:DCC3: 99        .byte $99   ; 
- D 2 - - - 0x03DCD4 0F:DCC4: 92        .byte $92   ; 
- D 2 - - - 0x03DCD5 0F:DCC5: 95        .byte $95   ; 
- D 2 - - - 0x03DCD6 0F:DCC6: 7B        .byte $7B   ; 
- D 2 - - - 0x03DCD7 0F:DCC7: 96        .byte $96   ; 
- D 2 - - - 0x03DCD8 0F:DCC8: 80        .byte $80   ; 
- D 2 - - - 0x03DCD9 0F:DCC9: EA        .byte $EA   ; 
- D 2 - - - 0x03DCDA 0F:DCCA: B2        .byte $B2   ; 
- D 2 - - - 0x03DCDB 0F:DCCB: A9        .byte $A9   ; 
- D 2 - - - 0x03DCDC 0F:DCCC: BA        .byte $BA   ; 
- D 2 - - - 0x03DCDD 0F:DCCD: 96        .byte $96   ; 
- D 2 - - - 0x03DCDE 0F:DCCE: 99        .byte $99   ; 
- D 2 - - - 0x03DCDF 0F:DCCF: 92        .byte $92   ; 
- D 2 - - - 0x03DCE0 0F:DCD0: 94        .byte $94   ; 
- D 2 - - - 0x03DCE1 0F:DCD1: 7B        .byte $7B   ; 
- D 2 - - - 0x03DCE2 0F:DCD2: 95        .byte $95   ; 
- D 2 - - - 0x03DCE3 0F:DCD3: 80        .byte $80   ; 
- D 2 - - - 0x03DCE4 0F:DCD4: EA        .byte $EA   ; 
- D 2 - - - 0x03DCE5 0F:DCD5: B2        .byte $B2   ; 
- D 2 - - - 0x03DCE6 0F:DCD6: A9        .byte $A9   ; 
- D 2 - - - 0x03DCE7 0F:DCD7: BB        .byte $BB   ; 
- D 2 - - - 0x03DCE8 0F:DCD8: B9        .byte $B9   ; 
- D 2 - - - 0x03DCE9 0F:DCD9: A2        .byte $A2   ; 
- D 2 - - - 0x03DCEA 0F:DCDA: 79        .byte $79   ; <y>
- D 2 - - - 0x03DCEB 0F:DCDB: 9F        .byte $9F   ; 
- D 2 - - - 0x03DCEC 0F:DCDC: 95        .byte $95   ; 
- D 2 - - - 0x03DCED 0F:DCDD: 97        .byte $97   ; 
- D 2 - - - 0x03DCEE 0F:DCDE: A4        .byte $A4   ; 
C D 2 - - - 0x03DCEF 0F:DCDF: AD 4E 04  LDA ram_044E
C - - - - - 0x03DCF2 0F:DCE2: D0 0B     BNE $DCEF
C - - - - - 0x03DCF4 0F:DCE4: AD E2 00  LDA a: ram_00E2
C - - - - - 0x03DCF7 0F:DCE7: 29 01     AND #$01
C - - - - - 0x03DCF9 0F:DCE9: 18        CLC
C - - - - - 0x03DCFA 0F:DCEA: 69 01     ADC #$01
C - - - - - 0x03DCFC 0F:DCEC: 8D 4E 04  STA ram_044E
C - - - - - 0x03DCFF 0F:DCEF: 60        RTS
- - - - - - 0x03DD00 0F:DCF0: A9        .byte $A9   ; 
- - - - - - 0x03DD01 0F:DCF1: 00        .byte $00   ; 
- - - - - - 0x03DD02 0F:DCF2: 8D        .byte $8D   ; 
- - - - - - 0x03DD03 0F:DCF3: 3B        .byte $3B   ; 
- - - - - - 0x03DD04 0F:DCF4: 04        .byte $04   ; 
- - - - - - 0x03DD05 0F:DCF5: 20        .byte $20   ; 
- - - - - - 0x03DD06 0F:DCF6: DF        .byte $DF   ; 
- - - - - - 0x03DD07 0F:DCF7: DC        .byte $DC   ; 
- - - - - - 0x03DD08 0F:DCF8: A9        .byte $A9   ; 
- - - - - - 0x03DD09 0F:DCF9: 1D        .byte $1D   ; 
- - - - - - 0x03DD0A 0F:DCFA: 20        .byte $20   ; 
- - - - - - 0x03DD0B 0F:DCFB: B0        .byte $B0   ; 
- - - - - - 0x03DD0C 0F:DCFC: CB        .byte $CB   ; 
C D 2 - - - 0x03DD0D 0F:DCFD: A9 FF     LDA #$FF
C - - - - - 0x03DD0F 0F:DCFF: 8D 1A 06  STA ram_061A
C D 2 - - - 0x03DD12 0F:DD02: 20 81 DD  JSR $DD81
C - - - - - 0x03DD15 0F:DD05: 20 47 DD  JSR $DD47
C - - - - - 0x03DD18 0F:DD08: 08        PHP
C - - - - - 0x03DD19 0F:DD09: A9 00     LDA #$00
C - - - - - 0x03DD1B 0F:DD0B: 8D 1B 06  STA ram_061B
C - - - - - 0x03DD1E 0F:DD0E: 20 3E E7  JSR $E73E
C - - - - - 0x03DD21 0F:DD11: 28        PLP
C - - - - - 0x03DD22 0F:DD12: 90 08     BCC $DD1C
C - - - - - 0x03DD24 0F:DD14: A9 2D     LDA #$2D
C - - - - - 0x03DD26 0F:DD16: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DD29 0F:DD19: 4C 1B 80  JMP $801B
C - - - - - 0x03DD2C 0F:DD1C: 20 77 CD  JSR $CD77
C - - - - - 0x03DD2F 0F:DD1F: A0 0A     LDY #$0A
C - - - - - 0x03DD31 0F:DD21: B1 34     LDA (ram_0034),Y
C - - - - - 0x03DD33 0F:DD23: D0 11     BNE $DD36
C - - - - - 0x03DD35 0F:DD25: A9 1A     LDA #$1A
C - - - - - 0x03DD37 0F:DD27: 85 24     STA ram_0024
C - - - - - 0x03DD39 0F:DD29: A9 1B     LDA #$1B
C - - - - - 0x03DD3B 0F:DD2B: 85 25     STA ram_0025
C - - - - - 0x03DD3D 0F:DD2D: 20 2D CE  JSR $CE2D
C - - - - - 0x03DD40 0F:DD30: A2 50     LDX #$50
C - - - - - 0x03DD42 0F:DD32: 9A        TXS
C - - - - - 0x03DD43 0F:DD33: 4C 06 80  JMP $8006
C - - - - - 0x03DD46 0F:DD36: A9 1A     LDA #$1A
C - - - - - 0x03DD48 0F:DD38: 85 24     STA ram_0024
C - - - - - 0x03DD4A 0F:DD3A: A9 1B     LDA #$1B
C - - - - - 0x03DD4C 0F:DD3C: 85 25     STA ram_0025
C - - - - - 0x03DD4E 0F:DD3E: 20 2D CE  JSR $CE2D
C - - - - - 0x03DD51 0F:DD41: A2 50     LDX #$50
C - - - - - 0x03DD53 0F:DD43: 9A        TXS
C - - - - - 0x03DD54 0F:DD44: 4C 18 80  JMP $8018
C - - - - - 0x03DD57 0F:DD47: AD 3C 04  LDA ram_043C
C - - - - - 0x03DD5A 0F:DD4A: D0 22     BNE $DD6E
C - - - - - 0x03DD5C 0F:DD4C: AD 35 06  LDA ram_0635
C - - - - - 0x03DD5F 0F:DD4F: AE FB 05  LDX ram_05FB
C - - - - - 0x03DD62 0F:DD52: F0 02     BEQ $DD56
C - - - - - 0x03DD64 0F:DD54: 49 FF     EOR #$FF
C - - - - - 0x03DD66 0F:DD56: C9 80     CMP #$80
C - - - - - 0x03DD68 0F:DD58: B0 14     BCS $DD6E
C - - - - - 0x03DD6A 0F:DD5A: 69 4F     ADC #$4F
C - - - - - 0x03DD6C 0F:DD5C: AE FB 05  LDX ram_05FB
C - - - - - 0x03DD6F 0F:DD5F: F0 02     BEQ $DD63
- - - - - - 0x03DD71 0F:DD61: 49        .byte $49   ; <I>
- - - - - - 0x03DD72 0F:DD62: FF        .byte $FF   ; 
C - - - - - 0x03DD73 0F:DD63: AA        TAX
C - - - - - 0x03DD74 0F:DD64: A0 7C     LDY #$7C
C - - - - - 0x03DD76 0F:DD66: 20 E2 CD  JSR $CDE2
C - - - - - 0x03DD79 0F:DD69: 8D 38 06  STA ram_0638
C - - - - - 0x03DD7C 0F:DD6C: 38        SEC
C - - - - - 0x03DD7D 0F:DD6D: 60        RTS
C - - - - - 0x03DD7E 0F:DD6E: A9 E9     LDA #$E9
C - - - - - 0x03DD80 0F:DD70: AE FB 05  LDX ram_05FB
C - - - - - 0x03DD83 0F:DD73: F0 02     BEQ $DD77
C - - - - - 0x03DD85 0F:DD75: A9 05     LDA #$05
C - - - - - 0x03DD87 0F:DD77: 4E E2 00  LSR a: ram_00E2
C - - - - - 0x03DD8A 0F:DD7A: 69 00     ADC #$00
C - - - - - 0x03DD8C 0F:DD7C: 8D 38 06  STA ram_0638
C - - - - - 0x03DD8F 0F:DD7F: 18        CLC
C - - - - - 0x03DD90 0F:DD80: 60        RTS
C - - - - - 0x03DD91 0F:DD81: AD 35 06  LDA ram_0635
C - - - - - 0x03DD94 0F:DD84: AE FB 05  LDX ram_05FB
C - - - - - 0x03DD97 0F:DD87: F0 05     BEQ $DD8E
C - - - - - 0x03DD99 0F:DD89: 49 FF     EOR #$FF
C - - - - - 0x03DD9B 0F:DD8B: 18        CLC
C - - - - - 0x03DD9C 0F:DD8C: 69 01     ADC #$01
C - - - - - 0x03DD9E 0F:DD8E: C9 A0     CMP #$A0
C - - - - - 0x03DDA0 0F:DD90: B0 0C     BCS $DD9E
C - - - - - 0x03DDA2 0F:DD92: 38        SEC
C - - - - - 0x03DDA3 0F:DD93: E9 30     SBC #$30
C - - - - - 0x03DDA5 0F:DD95: 4A        LSR
C - - - - - 0x03DDA6 0F:DD96: 4A        LSR
C - - - - - 0x03DDA7 0F:DD97: 4A        LSR
C - - - - - 0x03DDA8 0F:DD98: AA        TAX
C - - - - - 0x03DDA9 0F:DD99: BD CB DD  LDA $DDCB,X
C - - - - - 0x03DDAC 0F:DD9C: D0 20     BNE $DDBE
C - - - - - 0x03DDAE 0F:DD9E: 38        SEC
C - - - - - 0x03DDAF 0F:DD9F: E9 A0     SBC #$A0
C - - - - - 0x03DDB1 0F:DDA1: 4A        LSR
C - - - - - 0x03DDB2 0F:DDA2: 4A        LSR
C - - - - - 0x03DDB3 0F:DDA3: 4A        LSR
C - - - - - 0x03DDB4 0F:DDA4: 85 3A     STA ram_003A
C - - - - - 0x03DDB6 0F:DDA6: AD 37 06  LDA ram_0637
C - - - - - 0x03DDB9 0F:DDA9: 10 02     BPL $DDAD
C - - - - - 0x03DDBB 0F:DDAB: 49 FF     EOR #$FF
C - - - - - 0x03DDBD 0F:DDAD: 38        SEC
C - - - - - 0x03DDBE 0F:DDAE: E9 50     SBC #$50
C - - - - - 0x03DDC0 0F:DDB0: 29 38     AND #$38
C - - - - - 0x03DDC2 0F:DDB2: 4A        LSR
C - - - - - 0x03DDC3 0F:DDB3: 85 3B     STA ram_003B
C - - - - - 0x03DDC5 0F:DDB5: 4A        LSR
C - - - - - 0x03DDC6 0F:DDB6: 65 3B     ADC ram_003B
C - - - - - 0x03DDC8 0F:DDB8: 65 3A     ADC ram_003A
C - - - - - 0x03DDCA 0F:DDBA: AA        TAX
C - - - - - 0x03DDCB 0F:DDBB: BD D9 DD  LDA $DDD9,X
C - - - - - 0x03DDCE 0F:DDBE: 8D 2B 06  STA ram_062B
C - - - - - 0x03DDD1 0F:DDC1: 0A        ASL
C - - - - - 0x03DDD2 0F:DDC2: 0A        ASL
C - - - - - 0x03DDD3 0F:DDC3: 0A        ASL
C - - - - - 0x03DDD4 0F:DDC4: 6D 2B 06  ADC ram_062B
C - - - - - 0x03DDD7 0F:DDC7: 8D 2B 06  STA ram_062B
C - - - - - 0x03DDDA 0F:DDCA: 60        RTS
- D 2 - - - 0x03DDDB 0F:DDCB: 13        .byte $13   ; 
- D 2 - - - 0x03DDDC 0F:DDCC: 12        .byte $12   ; 
- D 2 - - - 0x03DDDD 0F:DDCD: 11        .byte $11   ; 
- D 2 - - - 0x03DDDE 0F:DDCE: 10        .byte $10   ; 
- D 2 - - - 0x03DDDF 0F:DDCF: 0F        .byte $0F   ; 
- D 2 - - - 0x03DDE0 0F:DDD0: 0E        .byte $0E   ; 
- D 2 - - - 0x03DDE1 0F:DDD1: 0D        .byte $0D   ; 
- D 2 - - - 0x03DDE2 0F:DDD2: 0C        .byte $0C   ; 
- D 2 - - - 0x03DDE3 0F:DDD3: 0B        .byte $0B   ; 
- D 2 - - - 0x03DDE4 0F:DDD4: 0A        .byte $0A   ; 
- D 2 - - - 0x03DDE5 0F:DDD5: 09        .byte $09   ; 
- D 2 - - - 0x03DDE6 0F:DDD6: 08        .byte $08   ; 
- D 2 - - - 0x03DDE7 0F:DDD7: 07        .byte $07   ; 
- D 2 - - - 0x03DDE8 0F:DDD8: 06        .byte $06   ; 
- D 2 - - - 0x03DDE9 0F:DDD9: 05        .byte $05   ; 
- D 2 - - - 0x03DDEA 0F:DDDA: 05        .byte $05   ; 
- D 2 - - - 0x03DDEB 0F:DDDB: 05        .byte $05   ; 
- D 2 - - - 0x03DDEC 0F:DDDC: 05        .byte $05   ; 
- D 2 - - - 0x03DDED 0F:DDDD: 05        .byte $05   ; 
- D 2 - - - 0x03DDEE 0F:DDDE: 05        .byte $05   ; 
- D 2 - - - 0x03DDEF 0F:DDDF: 05        .byte $05   ; 
- D 2 - - - 0x03DDF0 0F:DDE0: 04        .byte $04   ; 
- D 2 - - - 0x03DDF1 0F:DDE1: 04        .byte $04   ; 
- D 2 - - - 0x03DDF2 0F:DDE2: 04        .byte $04   ; 
- D 2 - - - 0x03DDF3 0F:DDE3: 04        .byte $04   ; 
- D 2 - - - 0x03DDF4 0F:DDE4: 04        .byte $04   ; 
- D 2 - - - 0x03DDF5 0F:DDE5: 05        .byte $05   ; 
- D 2 - - - 0x03DDF6 0F:DDE6: 04        .byte $04   ; 
- D 2 - - - 0x03DDF7 0F:DDE7: 03        .byte $03   ; 
- D 2 - - - 0x03DDF8 0F:DDE8: 03        .byte $03   ; 
- D 2 - - - 0x03DDF9 0F:DDE9: 03        .byte $03   ; 
- D 2 - - - 0x03DDFA 0F:DDEA: 03        .byte $03   ; 
- D 2 - - - 0x03DDFB 0F:DDEB: 05        .byte $05   ; 
- D 2 - - - 0x03DDFC 0F:DDEC: 04        .byte $04   ; 
- D 2 - - - 0x03DDFD 0F:DDED: 03        .byte $03   ; 
- D 2 - - - 0x03DDFE 0F:DDEE: 02        .byte $02   ; 
- D 2 - - - 0x03DDFF 0F:DDEF: 02        .byte $02   ; 
- D 2 - - - 0x03DE00 0F:DDF0: 02        .byte $02   ; 
- D 2 - - - 0x03DE01 0F:DDF1: 05        .byte $05   ; 
- D 2 - - - 0x03DE02 0F:DDF2: 04        .byte $04   ; 
- D 2 - - - 0x03DE03 0F:DDF3: 03        .byte $03   ; 
- D 2 - - - 0x03DE04 0F:DDF4: 02        .byte $02   ; 
- D 2 - - - 0x03DE05 0F:DDF5: 01        .byte $01   ; 
- D 2 - - - 0x03DE06 0F:DDF6: 01        .byte $01   ; 
- D 2 - - - 0x03DE07 0F:DDF7: 05        .byte $05   ; 
- D 2 - - - 0x03DE08 0F:DDF8: 04        .byte $04   ; 
- D 2 - - - 0x03DE09 0F:DDF9: 03        .byte $03   ; 
- D 2 - - - 0x03DE0A 0F:DDFA: 02        .byte $02   ; 
- D 2 - - - 0x03DE0B 0F:DDFB: 01        .byte $01   ; 
- D 2 - - - 0x03DE0C 0F:DDFC: 00        .byte $00   ; 
C D 2 - - - 0x03DE0D 0F:DDFD: AD E2 00  LDA a: ram_00E2
C - - - - - 0x03DE10 0F:DE00: 29 07     AND #$07
C - - - - - 0x03DE12 0F:DE02: C9 06     CMP #$06
C - - - - - 0x03DE14 0F:DE04: 90 02     BCC $DE08
C - - - - - 0x03DE16 0F:DE06: E9 06     SBC #$06
C - - - - - 0x03DE18 0F:DE08: 18        CLC
C - - - - - 0x03DE19 0F:DE09: 69 05     ADC #$05
C - - - - - 0x03DE1B 0F:DE0B: 6D FB 05  ADC ram_05FB
C - - - - - 0x03DE1E 0F:DE0E: 8D FC 05  STA ram_05FC
C - - - - - 0x03DE21 0F:DE11: AD FB 05  LDA ram_05FB
C - - - - - 0x03DE24 0F:DE14: 8D 41 04  STA ram_0441
C - - - - - 0x03DE27 0F:DE17: 20 EC E6  JSR $E6EC
C - - - - - 0x03DE2A 0F:DE1A: A0 0A     LDY #$0A
C - - - - - 0x03DE2C 0F:DE1C: A9 00     LDA #$00
C - - - - - 0x03DE2E 0F:DE1E: 91 34     STA (ram_0034),Y
C - - - - - 0x03DE30 0F:DE20: A9 00     LDA #$00
C - - - - - 0x03DE32 0F:DE22: 8D 28 06  STA ram_0628
C - - - - - 0x03DE35 0F:DE25: 8D 4E 04  STA ram_044E
C - - - - - 0x03DE38 0F:DE28: 20 DF DC  JSR $DCDF
C - - - - - 0x03DE3B 0F:DE2B: A9 01     LDA #$01
C - - - - - 0x03DE3D 0F:DE2D: 8D 3B 04  STA ram_043B
C - - - - - 0x03DE40 0F:DE30: A9 00     LDA #$00
C - - - - - 0x03DE42 0F:DE32: 8D 3C 04  STA ram_043C
C - - - - - 0x03DE45 0F:DE35: 20 93 D0  JSR $D093
C - - - - - 0x03DE48 0F:DE38: A9 3A     LDA #$3A
C - - - - - 0x03DE4A 0F:DE3A: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DE4D 0F:DE3D: A9 1A     LDA #$1A
C - - - - - 0x03DE4F 0F:DE3F: 8D 1A 06  STA ram_061A
C - - - - - 0x03DE52 0F:DE42: 4C 5E DE  JMP $DE5E
- - - - - - 0x03DE55 0F:DE45: A9        .byte $A9   ; 
- - - - - - 0x03DE56 0F:DE46: 01        .byte $01   ; 
- - - - - - 0x03DE57 0F:DE47: 8D        .byte $8D   ; 
- - - - - - 0x03DE58 0F:DE48: 3B        .byte $3B   ; 
- - - - - - 0x03DE59 0F:DE49: 04        .byte $04   ; 
- - - - - - 0x03DE5A 0F:DE4A: 20        .byte $20   ; 
- - - - - - 0x03DE5B 0F:DE4B: DF        .byte $DF   ; 
- - - - - - 0x03DE5C 0F:DE4C: DC        .byte $DC   ; 
- - - - - - 0x03DE5D 0F:DE4D: A9        .byte $A9   ; 
- - - - - - 0x03DE5E 0F:DE4E: 18        .byte $18   ; 
- - - - - - 0x03DE5F 0F:DE4F: 20        .byte $20   ; 
- - - - - - 0x03DE60 0F:DE50: B0        .byte $B0   ; 
- - - - - - 0x03DE61 0F:DE51: CB        .byte $CB   ; 
C D 2 - - - 0x03DE62 0F:DE52: A9 FF     LDA #$FF
C - - - - - 0x03DE64 0F:DE54: 2C 28 06  BIT ram_0628
C - - - - - 0x03DE67 0F:DE57: 10 02     BPL $DE5B
C - - - - - 0x03DE69 0F:DE59: A9 26     LDA #$26
C - - - - - 0x03DE6B 0F:DE5B: 8D 1A 06  STA ram_061A
C D 2 - - - 0x03DE6E 0F:DE5E: 20 59 E0  JSR $E059
C - - - - - 0x03DE71 0F:DE61: 20 8B DF  JSR $DF8B
C - - - - - 0x03DE74 0F:DE64: A9 01     LDA #$01
C - - - - - 0x03DE76 0F:DE66: 8D 1B 06  STA ram_061B
C - - - - - 0x03DE79 0F:DE69: 20 3E E7  JSR $E73E
C D 2 - - - 0x03DE7C 0F:DE6C: AD FC 05  LDA ram_05FC
C - - - - - 0x03DE7F 0F:DE6F: C9 FF     CMP #$FF
C - - - - - 0x03DE81 0F:DE71: F0 23     BEQ $DE96
C - - - - - 0x03DE83 0F:DE73: 8D 41 04  STA ram_0441
C - - - - - 0x03DE86 0F:DE76: 20 EC E6  JSR $E6EC
C - - - - - 0x03DE89 0F:DE79: 48        PHA
C - - - - - 0x03DE8A 0F:DE7A: A5 22     LDA ram_0022
C - - - - - 0x03DE8C 0F:DE7C: A9 1A     LDA #$1A
C - - - - - 0x03DE8E 0F:DE7E: 85 24     STA ram_0024
C - - - - - 0x03DE90 0F:DE80: A9 1B     LDA #$1B
C - - - - - 0x03DE92 0F:DE82: 85 25     STA ram_0025
C - - - - - 0x03DE94 0F:DE84: 20 2D CE  JSR $CE2D
C - - - - - 0x03DE97 0F:DE87: 68        PLA
C - - - - - 0x03DE98 0F:DE88: 20 1E 80  JSR $801E
C - - - - - 0x03DE9B 0F:DE8B: A9 1C     LDA #$1C
C - - - - - 0x03DE9D 0F:DE8D: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DEA0 0F:DE90: A2 50     LDX #$50
C - - - - - 0x03DEA2 0F:DE92: 9A        TXS
C - - - - - 0x03DEA3 0F:DE93: 4C DF E0  JMP $E0DF
C D 2 - - - 0x03DEA6 0F:DE96: AD 2B 06  LDA ram_062B
C - - - - - 0x03DEA9 0F:DE99: 8D 30 04  STA ram_0430
C - - - - - 0x03DEAC 0F:DE9C: A9 01     LDA #$01
C - - - - - 0x03DEAE 0F:DE9E: 8D FF 05  STA ram_05FF
C - - - - - 0x03DEB1 0F:DEA1: AD FB 05  LDA ram_05FB
C - - - - - 0x03DEB4 0F:DEA4: 20 4A DF  JSR $DF4A
C - - - - - 0x03DEB7 0F:DEA7: 8D 31 04  STA ram_0431
C - - - - - 0x03DEBA 0F:DEAA: AD FB 05  LDA ram_05FB
C - - - - - 0x03DEBD 0F:DEAD: 49 0B     EOR #$0B
C - - - - - 0x03DEBF 0F:DEAF: 20 4A DF  JSR $DF4A
C - - - - - 0x03DEC2 0F:DEB2: 8D 32 04  STA ram_0432
C - - - - - 0x03DEC5 0F:DEB5: AD 31 04  LDA ram_0431
C - - - - - 0x03DEC8 0F:DEB8: A2 23     LDX #$23
C - - - - - 0x03DECA 0F:DEBA: 20 29 DF  JSR $DF29
C - - - - - 0x03DECD 0F:DEBD: AD 31 04  LDA ram_0431
C - - - - - 0x03DED0 0F:DEC0: B0 1A     BCS $DEDC
C - - - - - 0x03DED2 0F:DEC2: AD 32 04  LDA ram_0432
C - - - - - 0x03DED5 0F:DEC5: A2 24     LDX #$24
C - - - - - 0x03DED7 0F:DEC7: 20 29 DF  JSR $DF29
C - - - - - 0x03DEDA 0F:DECA: AD 32 04  LDA ram_0432
C - - - - - 0x03DEDD 0F:DECD: B0 0D     BCS $DEDC
C - - - - - 0x03DEDF 0F:DECF: CE 30 04  DEC ram_0430
C - - - - - 0x03DEE2 0F:DED2: D0 E1     BNE $DEB5
C - - - - - 0x03DEE4 0F:DED4: A9 34     LDA #$34
C - - - - - 0x03DEE6 0F:DED6: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DEE9 0F:DED9: 4C 1B 80  JMP $801B
C - - - - - 0x03DEEC 0F:DEDC: A2 00     LDX #$00
C - - - - - 0x03DEEE 0F:DEDE: C9 0B     CMP #$0B
C - - - - - 0x03DEF0 0F:DEE0: 90 02     BCC $DEE4
C - - - - - 0x03DEF2 0F:DEE2: A2 0B     LDX #$0B
C - - - - - 0x03DEF4 0F:DEE4: 8D 41 04  STA ram_0441
C - - - - - 0x03DEF7 0F:DEE7: A0 1C     LDY #$1C
C - - - - - 0x03DEF9 0F:DEE9: 8A        TXA
C - - - - - 0x03DEFA 0F:DEEA: 4D FB 05  EOR ram_05FB
C - - - - - 0x03DEFD 0F:DEED: 8E FB 05  STX ram_05FB
C - - - - - 0x03DF00 0F:DEF0: F0 05     BEQ $DEF7
C - - - - - 0x03DF02 0F:DEF2: 20 93 D0  JSR $D093
C - - - - - 0x03DF05 0F:DEF5: A0 3E     LDY #$3E
C - - - - - 0x03DF07 0F:DEF7: 98        TYA
C - - - - - 0x03DF08 0F:DEF8: 48        PHA
C - - - - - 0x03DF09 0F:DEF9: AD 41 04  LDA ram_0441
C - - - - - 0x03DF0C 0F:DEFC: 20 7C CD  JSR $CD7C
C - - - - - 0x03DF0F 0F:DEFF: AD 35 06  LDA ram_0635
C - - - - - 0x03DF12 0F:DF02: A0 06     LDY #$06
C - - - - - 0x03DF14 0F:DF04: 91 34     STA (ram_0034),Y
C - - - - - 0x03DF16 0F:DF06: AD 37 06  LDA ram_0637
C - - - - - 0x03DF19 0F:DF09: A0 08     LDY #$08
C - - - - - 0x03DF1B 0F:DF0B: 91 34     STA (ram_0034),Y
C - - - - - 0x03DF1D 0F:DF0D: 48        PHA
C - - - - - 0x03DF1E 0F:DF0E: A5 22     LDA ram_0022
C - - - - - 0x03DF20 0F:DF10: A9 1A     LDA #$1A
C - - - - - 0x03DF22 0F:DF12: 85 24     STA ram_0024
C - - - - - 0x03DF24 0F:DF14: A9 1B     LDA #$1B
C - - - - - 0x03DF26 0F:DF16: 85 25     STA ram_0025
C - - - - - 0x03DF28 0F:DF18: 20 2D CE  JSR $CE2D
C - - - - - 0x03DF2B 0F:DF1B: 68        PLA
C - - - - - 0x03DF2C 0F:DF1C: 20 1E 80  JSR $801E
C - - - - - 0x03DF2F 0F:DF1F: 68        PLA
C - - - - - 0x03DF30 0F:DF20: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DF33 0F:DF23: A2 50     LDX #$50
C - - - - - 0x03DF35 0F:DF25: 9A        TXS
C - - - - - 0x03DF36 0F:DF26: 4C DF E0  JMP $E0DF
C - - - - - 0x03DF39 0F:DF29: 20 08 CE  JSR $CE08
C - - - - - 0x03DF3C 0F:DF2C: A9 01     LDA #$01
C - - - - - 0x03DF3E 0F:DF2E: 8D FF 05  STA ram_05FF
C - - - - - 0x03DF41 0F:DF31: 20 54 E8  JSR $E854
C - - - - - 0x03DF44 0F:DF34: A0 06     LDY #$06
C - - - - - 0x03DF46 0F:DF36: B1 34     LDA (ram_0034),Y
C - - - - - 0x03DF48 0F:DF38: AA        TAX
C - - - - - 0x03DF49 0F:DF39: A0 08     LDY #$08
C - - - - - 0x03DF4B 0F:DF3B: B1 34     LDA (ram_0034),Y
C - - - - - 0x03DF4D 0F:DF3D: A8        TAY
C - - - - - 0x03DF4E 0F:DF3E: 20 E2 CD  JSR $CDE2
C - - - - - 0x03DF51 0F:DF41: CD FE 05  CMP ram_05FE
C - - - - - 0x03DF54 0F:DF44: D0 02     BNE $DF48
C - - - - - 0x03DF56 0F:DF46: 38        SEC
C - - - - - 0x03DF57 0F:DF47: 60        RTS
C - - - - - 0x03DF58 0F:DF48: 18        CLC
C - - - - - 0x03DF59 0F:DF49: 60        RTS
C - - - - - 0x03DF5A 0F:DF4A: 20 99 CE  JSR $CE99
C - - - - - 0x03DF5D 0F:DF4D: 48        PHA
C - - - - - 0x03DF5E 0F:DF4E: 20 7C CD  JSR $CD7C
C - - - - - 0x03DF61 0F:DF51: AD FE 05  LDA ram_05FE
C - - - - - 0x03DF64 0F:DF54: A0 09     LDY #$09
C - - - - - 0x03DF66 0F:DF56: 91 34     STA (ram_0034),Y
C - - - - - 0x03DF68 0F:DF58: 68        PLA
C - - - - - 0x03DF69 0F:DF59: 60        RTS
- - - - - - 0x03DF6A 0F:DF5A: 20        .byte $20   ; 
- - - - - - 0x03DF6B 0F:DF5B: 7C        .byte $7C   ; 
- - - - - - 0x03DF6C 0F:DF5C: CD        .byte $CD   ; 
- - - - - - 0x03DF6D 0F:DF5D: A0        .byte $A0   ; 
- - - - - - 0x03DF6E 0F:DF5E: 0A        .byte $0A   ; 
- - - - - - 0x03DF6F 0F:DF5F: B1        .byte $B1   ; 
- - - - - - 0x03DF70 0F:DF60: 34        .byte $34   ; <4>
- - - - - - 0x03DF71 0F:DF61: D0        .byte $D0   ; 
- - - - - - 0x03DF72 0F:DF62: 26        .byte $26   ; 
- - - - - - 0x03DF73 0F:DF63: A0        .byte $A0   ; 
- - - - - - 0x03DF74 0F:DF64: 06        .byte $06   ; 
- - - - - - 0x03DF75 0F:DF65: B1        .byte $B1   ; 
- - - - - - 0x03DF76 0F:DF66: 34        .byte $34   ; <4>
- - - - - - 0x03DF77 0F:DF67: 38        .byte $38   ; <8>
- - - - - - 0x03DF78 0F:DF68: ED        .byte $ED   ; 
- - - - - - 0x03DF79 0F:DF69: 35        .byte $35   ; <5>
- - - - - - 0x03DF7A 0F:DF6A: 06        .byte $06   ; 
- - - - - - 0x03DF7B 0F:DF6B: B0        .byte $B0   ; 
- - - - - - 0x03DF7C 0F:DF6C: 04        .byte $04   ; 
- - - - - - 0x03DF7D 0F:DF6D: 49        .byte $49   ; <I>
- - - - - - 0x03DF7E 0F:DF6E: FF        .byte $FF   ; 
- - - - - - 0x03DF7F 0F:DF6F: 69        .byte $69   ; <i>
- - - - - - 0x03DF80 0F:DF70: 01        .byte $01   ; 
- - - - - - 0x03DF81 0F:DF71: C5        .byte $C5   ; 
- - - - - - 0x03DF82 0F:DF72: 3B        .byte $3B   ; 
- - - - - - 0x03DF83 0F:DF73: B0        .byte $B0   ; 
- - - - - - 0x03DF84 0F:DF74: 14        .byte $14   ; 
- - - - - - 0x03DF85 0F:DF75: A0        .byte $A0   ; 
- - - - - - 0x03DF86 0F:DF76: 08        .byte $08   ; 
- - - - - - 0x03DF87 0F:DF77: B1        .byte $B1   ; 
- - - - - - 0x03DF88 0F:DF78: 34        .byte $34   ; <4>
- - - - - - 0x03DF89 0F:DF79: 38        .byte $38   ; <8>
- - - - - - 0x03DF8A 0F:DF7A: ED        .byte $ED   ; 
- - - - - - 0x03DF8B 0F:DF7B: 37        .byte $37   ; <7>
- - - - - - 0x03DF8C 0F:DF7C: 06        .byte $06   ; 
- - - - - - 0x03DF8D 0F:DF7D: B0        .byte $B0   ; 
- - - - - - 0x03DF8E 0F:DF7E: 04        .byte $04   ; 
- - - - - - 0x03DF8F 0F:DF7F: 49        .byte $49   ; <I>
- - - - - - 0x03DF90 0F:DF80: FF        .byte $FF   ; 
- - - - - - 0x03DF91 0F:DF81: 69        .byte $69   ; <i>
- - - - - - 0x03DF92 0F:DF82: 01        .byte $01   ; 
- - - - - - 0x03DF93 0F:DF83: C5        .byte $C5   ; 
- - - - - - 0x03DF94 0F:DF84: 3B        .byte $3B   ; 
- - - - - - 0x03DF95 0F:DF85: B0        .byte $B0   ; 
- - - - - - 0x03DF96 0F:DF86: 02        .byte $02   ; 
- - - - - - 0x03DF97 0F:DF87: 38        .byte $38   ; <8>
- - - - - - 0x03DF98 0F:DF88: 60        .byte $60   ; 
- - - - - - 0x03DF99 0F:DF89: 18        .byte $18   ; 
- - - - - - 0x03DF9A 0F:DF8A: 60        .byte $60   ; 
C - - - - - 0x03DF9B 0F:DF8B: AD 38 06  LDA ram_0638
C - - - - - 0x03DF9E 0F:DF8E: 20 C9 CD  JSR $CDC9
C - - - - - 0x03DFA1 0F:DF91: 8A        TXA
C - - - - - 0x03DFA2 0F:DF92: 38        SEC
C - - - - - 0x03DFA3 0F:DF93: ED 35 06  SBC ram_0635
C - - - - - 0x03DFA6 0F:DF96: B0 04     BCS $DF9C
C - - - - - 0x03DFA8 0F:DF98: 49 FF     EOR #$FF
C - - - - - 0x03DFAA 0F:DF9A: 69 01     ADC #$01
C - - - - - 0x03DFAC 0F:DF9C: 85 3A     STA ram_003A
C - - - - - 0x03DFAE 0F:DF9E: 98        TYA
C - - - - - 0x03DFAF 0F:DF9F: 38        SEC
C - - - - - 0x03DFB0 0F:DFA0: ED 37 06  SBC ram_0637
C - - - - - 0x03DFB3 0F:DFA3: B0 04     BCS $DFA9
C - - - - - 0x03DFB5 0F:DFA5: 49 FF     EOR #$FF
C - - - - - 0x03DFB7 0F:DFA7: 69 01     ADC #$01
C - - - - - 0x03DFB9 0F:DFA9: A8        TAY
C - - - - - 0x03DFBA 0F:DFAA: 38        SEC
C - - - - - 0x03DFBB 0F:DFAB: E5 3A     SBC ram_003A
C - - - - - 0x03DFBD 0F:DFAD: B0 02     BCS $DFB1
C - - - - - 0x03DFBF 0F:DFAF: A4 3A     LDY ram_003A
C - - - - - 0x03DFC1 0F:DFB1: 98        TYA
C - - - - - 0x03DFC2 0F:DFB2: 4A        LSR
C - - - - - 0x03DFC3 0F:DFB3: 4A        LSR
C - - - - - 0x03DFC4 0F:DFB4: 4A        LSR
C - - - - - 0x03DFC5 0F:DFB5: AA        TAX
C - - - - - 0x03DFC6 0F:DFB6: BD BD DF  LDA $DFBD,X
C - - - - - 0x03DFC9 0F:DFB9: 8D 2B 06  STA ram_062B
C - - - - - 0x03DFCC 0F:DFBC: 60        RTS
- D 2 - - - 0x03DFCD 0F:DFBD: 02        .byte $02   ; 
- D 2 - - - 0x03DFCE 0F:DFBE: 03        .byte $03   ; 
- D 2 - - - 0x03DFCF 0F:DFBF: 03        .byte $03   ; 
- D 2 - - - 0x03DFD0 0F:DFC0: 03        .byte $03   ; 
- D 2 - - - 0x03DFD1 0F:DFC1: 03        .byte $03   ; 
- D 2 - - - 0x03DFD2 0F:DFC2: 04        .byte $04   ; 
- D 2 - - - 0x03DFD3 0F:DFC3: 04        .byte $04   ; 
- D 2 - - - 0x03DFD4 0F:DFC4: 04        .byte $04   ; 
- D 2 - - - 0x03DFD5 0F:DFC5: 04        .byte $04   ; 
- D 2 - - - 0x03DFD6 0F:DFC6: 04        .byte $04   ; 
- D 2 - - - 0x03DFD7 0F:DFC7: 04        .byte $04   ; 
- D 2 - - - 0x03DFD8 0F:DFC8: 05        .byte $05   ; 
- D 2 - - - 0x03DFD9 0F:DFC9: 05        .byte $05   ; 
- D 2 - - - 0x03DFDA 0F:DFCA: 05        .byte $05   ; 
- D 2 - - - 0x03DFDB 0F:DFCB: 05        .byte $05   ; 
- D 2 - - - 0x03DFDC 0F:DFCC: 05        .byte $05   ; 
- D 2 - - - 0x03DFDD 0F:DFCD: 05        .byte $05   ; 
- D 2 - - - 0x03DFDE 0F:DFCE: 05        .byte $05   ; 
- D 2 - - - 0x03DFDF 0F:DFCF: 05        .byte $05   ; 
- D 2 - - - 0x03DFE0 0F:DFD0: 05        .byte $05   ; 
- D 2 - - - 0x03DFE1 0F:DFD1: 20        .byte $20   ; 
- D 2 - - - 0x03DFE2 0F:DFD2: DF        .byte $DF   ; 
- D 2 - - - 0x03DFE3 0F:DFD3: DC        .byte $DC   ; 
- D 2 - - - 0x03DFE4 0F:DFD4: A9        .byte $A9   ; 
- D 2 - - - 0x03DFE5 0F:DFD5: 19        .byte $19   ; 
- D 2 - - - 0x03DFE6 0F:DFD6: 20        .byte $20   ; 
- - - - - - 0x03DFE7 0F:DFD7: B0        .byte $B0   ; 
- - - - - - 0x03DFE8 0F:DFD8: CB        .byte $CB   ; 
C D 2 - - - 0x03DFE9 0F:DFD9: 20 59 E0  JSR $E059
C - - - - - 0x03DFEC 0F:DFDC: A9 FF     LDA #$FF
C - - - - - 0x03DFEE 0F:DFDE: 8D 1A 06  STA ram_061A
C - - - - - 0x03DFF1 0F:DFE1: A9 01     LDA #$01
C - - - - - 0x03DFF3 0F:DFE3: 8D 1B 06  STA ram_061B
C - - - - - 0x03DFF6 0F:DFE6: 20 3E E7  JSR $E73E
C - - - - - 0x03DFF9 0F:DFE9: A9 1A     LDA #$1A
C - - - - - 0x03DFFB 0F:DFEB: 20 B0 CB  JSR $CBB0
C - - - - - 0x03DFFE 0F:DFEE: AD 41 04  LDA ram_0441
C - - - - - 0x03E001 0F:DFF1: 20 7C CD  JSR $CD7C
C - - - - - 0x03E004 0F:DFF4: AD 43 04  LDA ram_0443
C - - - - - 0x03E007 0F:DFF7: 0A        ASL
C - - - - - 0x03E008 0F:DFF8: 0A        ASL
C - - - - - 0x03E009 0F:DFF9: 0A        ASL
C - - - - - 0x03E00A 0F:DFFA: AE FB 05  LDX ram_05FB
C - - - - - 0x03E00D 0F:DFFD: F0 05     BEQ $E004
C - - - - - 0x03E00F 0F:DFFF: 49        .byte $49   ; <I>



