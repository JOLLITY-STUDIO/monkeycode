; bank_22.asm 分片 1/9 (原文件行 1-1000, 共 8008 行)

.segment "???"
.include "bank_ram.inc"
; 0x02C010-0x02E00F

- - - - - - 0x02C010 0B:8000: 4C        .byte $4C   ; <L>
- - - - - - 0x02C011 0B:8001: 03        .byte $03   ; 
C - - - - - 0x02C012 0B:8002: 80        UNDEFINED
C D 0 - - - 0x02C013 0B:8003: A0 00     LDY #$00
C - - - - - 0x02C015 0B:8005: 84 3F     STY ram_003F
C - - - - - 0x02C017 0B:8007: 84 41     STY ram_0041
C - - - - - 0x02C019 0B:8009: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02C01B 0B:800B: 4A        LSR
C - - - - - 0x02C01C 0B:800C: 26 3F     ROL ram_003F
C - - - - - 0x02C01E 0B:800E: 4A        LSR
C - - - - - 0x02C01F 0B:800F: 26 41     ROL ram_0041
C - - - - - 0x02C021 0B:8011: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02C023 0B:8013: 29 60     AND #$60
C - - - - - 0x02C025 0B:8015: 0A        ASL
C - - - - - 0x02C026 0B:8016: 4D 17 05  EOR ram_0517
C - - - - - 0x02C029 0B:8019: 85 49     STA ram_0049
C - - - - - 0x02C02B 0B:801B: A0 08     LDY #$08
C - - - - - 0x02C02D 0B:801D: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02C02F 0B:801F: 38        SEC
C - - - - - 0x02C030 0B:8020: E9 80     SBC #$80
C - - - - - 0x02C032 0B:8022: AA        TAX
C - - - - - 0x02C033 0B:8023: A5 3F     LDA ram_003F
C - - - - - 0x02C035 0B:8025: E9 00     SBC #$00
C - - - - - 0x02C037 0B:8027: A8        TAY
C - - - - - 0x02C038 0B:8028: A9 00     LDA #$00
C - - - - - 0x02C03A 0B:802A: 85 3F     STA ram_003F
C - - - - - 0x02C03C 0B:802C: AD 38 05  LDA ram_0538
C - - - - - 0x02C03F 0B:802F: 49 FF     EOR #$FF
C - - - - - 0x02C041 0B:8031: 18        CLC
C - - - - - 0x02C042 0B:8032: 69 01     ADC #$01
C - - - - - 0x02C044 0B:8034: 10 02     BPL $8038
C - - - - - 0x02C046 0B:8036: C6 3F     DEC ram_003F
C - - - - - 0x02C048 0B:8038: 85 3E     STA ram_003E
C - - - - - 0x02C04A 0B:803A: 8A        TXA
C - - - - - 0x02C04B 0B:803B: 18        CLC
C - - - - - 0x02C04C 0B:803C: 65 3E     ADC ram_003E
C - - - - - 0x02C04E 0B:803E: AA        TAX
C - - - - - 0x02C04F 0B:803F: 98        TYA
C - - - - - 0x02C050 0B:8040: 65 3F     ADC ram_003F
C - - - - - 0x02C052 0B:8042: A8        TAY
C - - - - - 0x02C053 0B:8043: 2C 17 05  BIT ram_0517
C - - - - - 0x02C056 0B:8046: 50 0D     BVC $8055
C - - - - - 0x02C058 0B:8048: 8A        TXA
C - - - - - 0x02C059 0B:8049: 49 FF     EOR #$FF
C - - - - - 0x02C05B 0B:804B: AA        TAX
C - - - - - 0x02C05C 0B:804C: 98        TYA
C - - - - - 0x02C05D 0B:804D: 49 FF     EOR #$FF
C - - - - - 0x02C05F 0B:804F: A8        TAY
C - - - - - 0x02C060 0B:8050: E8        INX
C - - - - - 0x02C061 0B:8051: D0 01     BNE $8054
C - - - - - 0x02C063 0B:8053: C8        INY
C - - - - - 0x02C064 0B:8054: C8        INY
C - - - - - 0x02C065 0B:8055: 24 49     BIT ram_0049
C - - - - - 0x02C067 0B:8057: 50 09     BVC $8062
C - - - - - 0x02C069 0B:8059: 38        SEC
C - - - - - 0x02C06A 0B:805A: 8A        TXA
C - - - - - 0x02C06B 0B:805B: E9 08     SBC #$08
C - - - - - 0x02C06D 0B:805D: AA        TAX
C - - - - - 0x02C06E 0B:805E: 98        TYA
C - - - - - 0x02C06F 0B:805F: E9 00     SBC #$00
C - - - - - 0x02C071 0B:8061: A8        TAY
C - - - - - 0x02C072 0B:8062: 86 3E     STX ram_003E
C - - - - - 0x02C074 0B:8064: 84 3F     STY ram_003F
C - - - - - 0x02C076 0B:8066: A0 0C     LDY #$0C
C - - - - - 0x02C078 0B:8068: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02C07A 0B:806A: 38        SEC
C - - - - - 0x02C07B 0B:806B: 24 49     BIT ram_0049
C - - - - - 0x02C07D 0B:806D: 10 03     BPL $8072
C - - - - - 0x02C07F 0B:806F: E9 88     SBC #$88
C - - - - - 0x02C081 0B:8071: 2C E9 80  BIT $80E9
C - - - - - 0x02C084 0B:8074: 85 40     STA ram_0040
C - - - - - 0x02C086 0B:8076: A5 41     LDA ram_0041
C - - - - - 0x02C088 0B:8078: E9 00     SBC #$00
C - - - - - 0x02C08A 0B:807A: 85 41     STA ram_0041
C - - - - - 0x02C08C 0B:807C: A9 80     LDA #$80
C - - - - - 0x02C08E 0B:807E: 85 42     STA ram_0042
C - - - - - 0x02C090 0B:8080: A9 82     LDA #$82
C - - - - - 0x02C092 0B:8082: 85 43     STA ram_0043
C - - - - - 0x02C094 0B:8084: A0 12     LDY #$12
C - - - - - 0x02C096 0B:8086: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02C098 0B:8088: 0A        ASL
C - - - - - 0x02C099 0B:8089: 90 02     BCC $808D
C - - - - - 0x02C09B 0B:808B: E6 43     INC ram_0043
C - - - - - 0x02C09D 0B:808D: A8        TAY
C - - - - - 0x02C09E 0B:808E: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C0A0 0B:8090: AA        TAX
C - - - - - 0x02C0A1 0B:8091: C8        INY
C - - - - - 0x02C0A2 0B:8092: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C0A4 0B:8094: 85 43     STA ram_0043
C - - - - - 0x02C0A6 0B:8096: 86 42     STX ram_0042
C - - - - - 0x02C0A8 0B:8098: 20 87 81  JSR $8187
C - - - - - 0x02C0AB 0B:809B: A0 00     LDY #$00
C - - - - - 0x02C0AD 0B:809D: 84 44     STY ram_0044
C D 0 - - - 0x02C0AF 0B:809F: A4 44     LDY ram_0044
C - - - - - 0x02C0B1 0B:80A1: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C0B3 0B:80A3: 29 07     AND #$07
C - - - - - 0x02C0B5 0B:80A5: D0 06     BNE $80AD
C - - - - - 0x02C0B7 0B:80A7: 20 C0 80  JSR $80C0
C - - - - - 0x02C0BA 0B:80AA: 4C 9F 80  JMP $809F
C - - - - - 0x02C0BD 0B:80AD: 20 B3 80  JSR $80B3
C - - - - - 0x02C0C0 0B:80B0: 4C 9F 80  JMP $809F
C - - - - - 0x02C0C3 0B:80B3: E6 44     INC ram_0044
C - - - - - 0x02C0C5 0B:80B5: 20 09 C5  JSR $C509
- - - - - - 0x02C0C8 0B:80B8: 00        .byte $00   ; 
- - - - - - 0x02C0C9 0B:80B9: 00        .byte $00   ; 
- D 0 - I - 0x02C0CA 0B:80BA: 61        .byte $61   ; <a>
- D 0 - I - 0x02C0CB 0B:80BB: 81        .byte $81   ; 
- D 0 - I - 0x02C0CC 0B:80BC: 64        .byte $64   ; <d>
- D 0 - I - 0x02C0CD 0B:80BD: 81        .byte $81   ; 
- D 0 - I - 0x02C0CE 0B:80BE: 75        .byte $75   ; <u>
- D 0 - I - 0x02C0CF 0B:80BF: 81        .byte $81   ; 
C - - - - - 0x02C0D0 0B:80C0: A4 44     LDY ram_0044
C - - - - - 0x02C0D2 0B:80C2: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C0D4 0B:80C4: 29 38     AND #$38
C - - - - - 0x02C0D6 0B:80C6: 4A        LSR
C - - - - - 0x02C0D7 0B:80C7: 4A        LSR
C - - - - - 0x02C0D8 0B:80C8: 4A        LSR
C - - - - - 0x02C0D9 0B:80C9: 85 45     STA ram_0045
C - - - - - 0x02C0DB 0B:80CB: C8        INY
C - - - - - 0x02C0DC 0B:80CC: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C0DE 0B:80CE: AA        TAX
C - - - - - 0x02C0DF 0B:80CF: BD D2 81  LDA $81D2,X
C - - - - - 0x02C0E2 0B:80D2: A2 00     LDX #$00
C - - - - - 0x02C0E4 0B:80D4: 24 49     BIT ram_0049
C - - - - - 0x02C0E6 0B:80D6: 10 05     BPL $80DD
C - - - - - 0x02C0E8 0B:80D8: 49 FF     EOR #$FF
C - - - - - 0x02C0EA 0B:80DA: 18        CLC
C - - - - - 0x02C0EB 0B:80DB: 69 01     ADC #$01
C - - - - - 0x02C0ED 0B:80DD: 48        PHA
C - - - - - 0x02C0EE 0B:80DE: 68        PLA
C - - - - - 0x02C0EF 0B:80DF: 10 01     BPL $80E2
C - - - - - 0x02C0F1 0B:80E1: CA        DEX
C - - - - - 0x02C0F2 0B:80E2: 18        CLC
C - - - - - 0x02C0F3 0B:80E3: 65 40     ADC ram_0040
C - - - - - 0x02C0F5 0B:80E5: 85 46     STA ram_0046
C - - - - - 0x02C0F7 0B:80E7: 8A        TXA
C - - - - - 0x02C0F8 0B:80E8: 65 41     ADC ram_0041
C - - - - - 0x02C0FA 0B:80EA: D0 11     BNE $80FD
C - - - - - 0x02C0FC 0B:80EC: A5 46     LDA ram_0046
C - - - - - 0x02C0FE 0B:80EE: CD 40 05  CMP ram_0540
C - - - - - 0x02C101 0B:80F1: 90 0A     BCC $80FD
C - - - - - 0x02C103 0B:80F3: CD 41 05  CMP ram_0541
C - - - - - 0x02C106 0B:80F6: F0 11     BEQ $8109
C - - - - - 0x02C108 0B:80F8: B0 03     BCS $80FD
C - - - - - 0x02C10A 0B:80FA: 4C 09 81  JMP $8109
C - - - - - 0x02C10D 0B:80FD: C8        INY
C - - - - - 0x02C10E 0B:80FE: A9 F8     LDA #$F8
C - - - - - 0x02C110 0B:8100: C8        INY
C - - - - - 0x02C111 0B:8101: C8        INY
C - - - - - 0x02C112 0B:8102: C6 45     DEC ram_0045
C - - - - - 0x02C114 0B:8104: 10 FA     BPL $8100
C - - - - - 0x02C116 0B:8106: 84 44     STY ram_0044
C - - - - - 0x02C118 0B:8108: 60        RTS
C D 0 - - - 0x02C119 0B:8109: C8        INY
C - - - - - 0x02C11A 0B:810A: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C11C 0B:810C: 4A        LSR
C - - - - - 0x02C11D 0B:810D: 4A        LSR
C - - - - - 0x02C11E 0B:810E: AA        TAX
C - - - - - 0x02C11F 0B:810F: BD FA 81  LDA $81FA,X
C - - - - - 0x02C122 0B:8112: A2 00     LDX #$00
C - - - - - 0x02C124 0B:8114: 24 49     BIT ram_0049
C - - - - - 0x02C126 0B:8116: 50 05     BVC $811D
C - - - - - 0x02C128 0B:8118: 49 FF     EOR #$FF
C - - - - - 0x02C12A 0B:811A: 18        CLC
C - - - - - 0x02C12B 0B:811B: 69 01     ADC #$01
C - - - - - 0x02C12D 0B:811D: 48        PHA
C - - - - - 0x02C12E 0B:811E: 68        PLA
C - - - - - 0x02C12F 0B:811F: 10 01     BPL $8122
C - - - - - 0x02C131 0B:8121: CA        DEX
C - - - - - 0x02C132 0B:8122: 18        CLC
C - - - - - 0x02C133 0B:8123: 65 3E     ADC ram_003E
C - - - - - 0x02C135 0B:8125: 85 47     STA ram_0047
C - - - - - 0x02C137 0B:8127: 8A        TXA
C - - - - - 0x02C138 0B:8128: 65 3F     ADC ram_003F
C - - - - - 0x02C13A 0B:812A: F0 0A     BEQ $8136
C - - - - - 0x02C13C 0B:812C: A6 3B     LDX ram_003B
C - - - - - 0x02C13E 0B:812E: A9 F8     LDA #$F8
C - - - - - 0x02C140 0B:8130: 9D 00 02  STA ram_0200,X
C - - - - - 0x02C143 0B:8133: C8        INY
C - - - - - 0x02C144 0B:8134: D0 23     BNE $8159
C - - - - - 0x02C146 0B:8136: A6 3B     LDX ram_003B
C - - - - - 0x02C148 0B:8138: A5 46     LDA ram_0046
C - - - - - 0x02C14A 0B:813A: 9D 00 02  STA ram_0200,X
C - - - - - 0x02C14D 0B:813D: A5 47     LDA ram_0047
C - - - - - 0x02C14F 0B:813F: 9D 03 02  STA ram_0203,X
C - - - - - 0x02C152 0B:8142: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C154 0B:8144: 29 03     AND #$03
C - - - - - 0x02C156 0B:8146: 05 49     ORA ram_0049
C - - - - - 0x02C158 0B:8148: 9D 02 02  STA ram_0202,X
C - - - - - 0x02C15B 0B:814B: C8        INY
C - - - - - 0x02C15C 0B:814C: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C15E 0B:814E: 9D 01 02  STA ram_0201,X
C - - - - - 0x02C161 0B:8151: E8        INX
C - - - - - 0x02C162 0B:8152: E8        INX
C - - - - - 0x02C163 0B:8153: E8        INX
C - - - - - 0x02C164 0B:8154: E8        INX
C - - - - - 0x02C165 0B:8155: 86 3B     STX ram_003B
C - - - - - 0x02C167 0B:8157: E6 48     INC ram_0048
C - - - - - 0x02C169 0B:8159: C8        INY
C - - - - - 0x02C16A 0B:815A: C6 45     DEC ram_0045
C - - - - - 0x02C16C 0B:815C: 10 AC     BPL $810A
C - - - - - 0x02C16E 0B:815E: 84 44     STY ram_0044
C - - - - - 0x02C170 0B:8160: 60        RTS
C - - J - - 0x02C171 0B:8161: 68        PLA
C - - - - - 0x02C172 0B:8162: 68        PLA
C - - - - - 0x02C173 0B:8163: 60        RTS
C D 0 - - - 0x02C174 0B:8164: A4 44     LDY ram_0044
C - - - - - 0x02C176 0B:8166: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C178 0B:8168: AA        TAX
C - - - - - 0x02C179 0B:8169: C8        INY
C - - - - - 0x02C17A 0B:816A: B1 42     LDA (ram_0042),Y
C - - - - - 0x02C17C 0B:816C: 85 43     STA ram_0043
C - - - - - 0x02C17E 0B:816E: 86 42     STX ram_0042
C - - - - - 0x02C180 0B:8170: A9 00     LDA #$00
C - - - - - 0x02C182 0B:8172: 85 44     STA ram_0044
C - - - - - 0x02C184 0B:8174: 60        RTS
C - - J - - 0x02C185 0B:8175: AD 46 05  LDA ram_0546
C - - - - - 0x02C188 0B:8178: C9 0C     CMP #$0C
C - - - - - 0x02C18A 0B:817A: 90 02     BCC $817E
C - - - - - 0x02C18C 0B:817C: E9 0C     SBC #$0C
C - - - - - 0x02C18E 0B:817E: 0A        ASL
C - - - - - 0x02C18F 0B:817F: 18        CLC
C - - - - - 0x02C190 0B:8180: 65 44     ADC ram_0044
C - - - - - 0x02C192 0B:8182: 85 44     STA ram_0044
C - - - - - 0x02C194 0B:8184: 4C 64 81  JMP $8164
C - - - - - 0x02C197 0B:8187: A0 00     LDY #$00
C - - - - - 0x02C199 0B:8189: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02C19B 0B:818B: 4D 17 05  EOR ram_0517
C - - - - - 0x02C19E 0B:818E: 29 40     AND #$40
C - - - - - 0x02C1A0 0B:8190: 08        PHP
C - - - - - 0x02C1A1 0B:8191: A0 13     LDY #$13
C - - - - - 0x02C1A3 0B:8193: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02C1A5 0B:8195: F0 1A     BEQ $81B1
C - - - - - 0x02C1A7 0B:8197: A2 00     LDX #$00
C - - - - - 0x02C1A9 0B:8199: 28        PLP
C - - - - - 0x02C1AA 0B:819A: 08        PHP
C - - - - - 0x02C1AB 0B:819B: F0 05     BEQ $81A2
C - - - - - 0x02C1AD 0B:819D: 49 FF     EOR #$FF
C - - - - - 0x02C1AF 0B:819F: 18        CLC
C - - - - - 0x02C1B0 0B:81A0: 69 01     ADC #$01
C - - - - - 0x02C1B2 0B:81A2: 48        PHA
C - - - - - 0x02C1B3 0B:81A3: 68        PLA
C - - - - - 0x02C1B4 0B:81A4: 10 01     BPL $81A7
C - - - - - 0x02C1B6 0B:81A6: CA        DEX
C - - - - - 0x02C1B7 0B:81A7: 18        CLC
C - - - - - 0x02C1B8 0B:81A8: 65 3E     ADC ram_003E
C - - - - - 0x02C1BA 0B:81AA: 85 3E     STA ram_003E
C - - - - - 0x02C1BC 0B:81AC: 8A        TXA
C - - - - - 0x02C1BD 0B:81AD: 65 3F     ADC ram_003F
C - - - - - 0x02C1BF 0B:81AF: 85 3F     STA ram_003F
C - - - - - 0x02C1C1 0B:81B1: C8        INY
C - - - - - 0x02C1C2 0B:81B2: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02C1C4 0B:81B4: F0 1A     BEQ $81D0
C - - - - - 0x02C1C6 0B:81B6: A2 00     LDX #$00
C - - - - - 0x02C1C8 0B:81B8: 28        PLP
C - - - - - 0x02C1C9 0B:81B9: 08        PHP
C - - - - - 0x02C1CA 0B:81BA: 10 05     BPL $81C1
- - - - - - 0x02C1CC 0B:81BC: 49        .byte $49   ; <I>
- - - - - - 0x02C1CD 0B:81BD: FF        .byte $FF   ; 
- - - - - - 0x02C1CE 0B:81BE: 18        .byte $18   ; 
- - - - - - 0x02C1CF 0B:81BF: 69        .byte $69   ; <i>
- - - - - - 0x02C1D0 0B:81C0: 01        .byte $01   ; 
C - - - - - 0x02C1D1 0B:81C1: 48        PHA
C - - - - - 0x02C1D2 0B:81C2: 68        PLA
C - - - - - 0x02C1D3 0B:81C3: 10 01     BPL $81C6
C - - - - - 0x02C1D5 0B:81C5: CA        DEX
C - - - - - 0x02C1D6 0B:81C6: 18        CLC
C - - - - - 0x02C1D7 0B:81C7: 65 40     ADC ram_0040
C - - - - - 0x02C1D9 0B:81C9: 85 40     STA ram_0040
C - - - - - 0x02C1DB 0B:81CB: 8A        TXA
C - - - - - 0x02C1DC 0B:81CC: 65 41     ADC ram_0041
C - - - - - 0x02C1DE 0B:81CE: 85 41     STA ram_0041
C - - - - - 0x02C1E0 0B:81D0: 28        PLP
C - - - - - 0x02C1E1 0B:81D1: 60        RTS
- D 0 - - - 0x02C1E2 0B:81D2: E0        .byte $E0   ; 
- D 0 - - - 0x02C1E3 0B:81D3: E8        .byte $E8   ; 
- D 0 - - - 0x02C1E4 0B:81D4: F0        .byte $F0   ; 
- D 0 - - - 0x02C1E5 0B:81D5: F8        .byte $F8   ; 
- D 0 - - - 0x02C1E6 0B:81D6: 00        .byte $00   ; 
- D 0 - - - 0x02C1E7 0B:81D7: 08        .byte $08   ; 
- D 0 - - - 0x02C1E8 0B:81D8: 10        .byte $10   ; 
- D 0 - - - 0x02C1E9 0B:81D9: 18        .byte $18   ; 
- D 0 - - - 0x02C1EA 0B:81DA: 20        .byte $20   ; 
- D 0 - - - 0x02C1EB 0B:81DB: 28        .byte $28   ; 
- D 0 - - - 0x02C1EC 0B:81DC: 0E        .byte $0E   ; 
- D 0 - - - 0x02C1ED 0B:81DD: E5        .byte $E5   ; 
- D 0 - - - 0x02C1EE 0B:81DE: ED        .byte $ED   ; 
- D 0 - - - 0x02C1EF 0B:81DF: E4        .byte $E4   ; 
- D 0 - - - 0x02C1F0 0B:81E0: 25        .byte $25   ; 
- D 0 - - - 0x02C1F1 0B:81E1: DF        .byte $DF   ; 
- - - - - - 0x02C1F2 0B:81E2: DC        .byte $DC   ; 
- D 0 - - - 0x02C1F3 0B:81E3: E7        .byte $E7   ; 
- D 0 - - - 0x02C1F4 0B:81E4: EF        .byte $EF   ; 
- - - - - - 0x02C1F5 0B:81E5: 21        .byte $21   ; 
- D 0 - - - 0x02C1F6 0B:81E6: 1E        .byte $1E   ; 
- D 0 - - - 0x02C1F7 0B:81E7: 26        .byte $26   ; 
- D 0 - - - 0x02C1F8 0B:81E8: 30        .byte $30   ; <0>
- D 0 - - - 0x02C1F9 0B:81E9: 38        .byte $38   ; <8>
- D 0 - - - 0x02C1FA 0B:81EA: F4        .byte $F4   ; 
- D 0 - - - 0x02C1FB 0B:81EB: FC        .byte $FC   ; 
- D 0 - - - 0x02C1FC 0B:81EC: 04        .byte $04   ; 
- D 0 - - - 0x02C1FD 0B:81ED: 0C        .byte $0C   ; 
- D 0 - - - 0x02C1FE 0B:81EE: EC        .byte $EC   ; 
- - - - - - 0x02C1FF 0B:81EF: F6        .byte $F6   ; 
- D 0 - - - 0x02C200 0B:81F0: D8        .byte $D8   ; 
- D 0 - - - 0x02C201 0B:81F1: EA        .byte $EA   ; 
- D 0 - - - 0x02C202 0B:81F2: 0A        .byte $0A   ; 
- D 0 - - - 0x02C203 0B:81F3: 1B        .byte $1B   ; 
- D 0 - - - 0x02C204 0B:81F4: F7        .byte $F7   ; 
- D 0 - - - 0x02C205 0B:81F5: 03        .byte $03   ; 
- D 0 - - - 0x02C206 0B:81F6: FF        .byte $FF   ; 
- D 0 - - - 0x02C207 0B:81F7: 06        .byte $06   ; 
- D 0 - - - 0x02C208 0B:81F8: F2        .byte $F2   ; 
- D 0 - - - 0x02C209 0B:81F9: 14        .byte $14   ; 
- D 0 - - - 0x02C20A 0B:81FA: E0        .byte $E0   ; 
- D 0 - - - 0x02C20B 0B:81FB: E8        .byte $E8   ; 
- D 0 - - - 0x02C20C 0B:81FC: F0        .byte $F0   ; 
- D 0 - - - 0x02C20D 0B:81FD: F8        .byte $F8   ; 
- D 0 - - - 0x02C20E 0B:81FE: 00        .byte $00   ; 
- D 0 - - - 0x02C20F 0B:81FF: 08        .byte $08   ; 
- D 0 - - - 0x02C210 0B:8200: 10        .byte $10   ; 
- D 0 - - - 0x02C211 0B:8201: EF        .byte $EF   ; 
- D 0 - - - 0x02C212 0B:8202: F5        .byte $F5   ; 
- D 0 - - - 0x02C213 0B:8203: F7        .byte $F7   ; 
- D 0 - - - 0x02C214 0B:8204: FD        .byte $FD   ; 
- D 0 - - - 0x02C215 0B:8205: 05        .byte $05   ; 
- D 0 - - - 0x02C216 0B:8206: FF        .byte $FF   ; 
- D 0 - - - 0x02C217 0B:8207: F6        .byte $F6   ; 
- D 0 - - - 0x02C218 0B:8208: FE        .byte $FE   ; 
- D 0 - - - 0x02C219 0B:8209: 06        .byte $06   ; 
- D 0 - - - 0x02C21A 0B:820A: F4        .byte $F4   ; 
- D 0 - - - 0x02C21B 0B:820B: FC        .byte $FC   ; 
- D 0 - - - 0x02C21C 0B:820C: F3        .byte $F3   ; 
- D 0 - - - 0x02C21D 0B:820D: FB        .byte $FB   ; 
- D 0 - - - 0x02C21E 0B:820E: E4        .byte $E4   ; 
- D 0 - - - 0x02C21F 0B:820F: EC        .byte $EC   ; 
- D 0 - - - 0x02C220 0B:8210: F2        .byte $F2   ; 
- D 0 - - - 0x02C221 0B:8211: FA        .byte $FA   ; 
- D 0 - - - 0x02C222 0B:8212: 02        .byte $02   ; 
- D 0 - - - 0x02C223 0B:8213: F9        .byte $F9   ; 
- D 0 - - - 0x02C224 0B:8214: D8        .byte $D8   ; 
- D 0 - - - 0x02C225 0B:8215: DC        .byte $DC   ; 
- D 0 - - - 0x02C226 0B:8216: 0A        .byte $0A   ; 
- D 0 - - - 0x02C227 0B:8217: 07        .byte $07   ; 
- D 0 - - - 0x02C228 0B:8218: 0F        .byte $0F   ; 
- D 0 - - - 0x02C229 0B:8219: 0D        .byte $0D   ; 
- D 0 - - - 0x02C22A 0B:821A: 18        .byte $18   ; 
- D 0 - - - 0x02C22B 0B:821B: 04        .byte $04   ; 
- D 0 - - - 0x02C22C 0B:821C: 0E        .byte $0E   ; 
- - - - - - 0x02C22D 0B:821D: 12        .byte $12   ; 
- D 0 - - - 0x02C22E 0B:821E: 0C        .byte $0C   ; 
- D 0 - - - 0x02C22F 0B:821F: ED        .byte $ED   ; 
- D 0 - - - 0x02C230 0B:8220: EE        .byte $EE   ; 
- D 0 - - - 0x02C231 0B:8221: C0        .byte $C0   ; 
- D 0 - - - 0x02C232 0B:8222: C8        .byte $C8   ; 
- D 0 - - - 0x02C233 0B:8223: 2C        .byte $2C   ; 
- D 0 - - - 0x02C234 0B:8224: 34        .byte $34   ; <4>
- D 0 - - - 0x02C235 0B:8225: 3C        .byte $3C   ; 
- D 0 - - - 0x02C236 0B:8226: 44        .byte $44   ; <D>
- D 0 - - - 0x02C237 0B:8227: D0        .byte $D0   ; 
- D 0 - - - 0x02C238 0B:8228: EB        .byte $EB   ; 
- D 0 - - - 0x02C239 0B:8229: 01        .byte $01   ; 
- D 0 - - - 0x02C23A 0B:822A: 20        .byte $20   ; 
- D 0 - - - 0x02C23B 0B:822B: 28        .byte $28   ; 
- D 0 - - - 0x02C23C 0B:822C: 30        .byte $30   ; <0>
- D 0 - - - 0x02C23D 0B:822D: 38        .byte $38   ; <8>
- D 0 - - - 0x02C23E 0B:822E: 40        .byte $40   ; 
- D 0 - - - 0x02C23F 0B:822F: 48        .byte $48   ; <H>
- D 0 - - - 0x02C240 0B:8230: 50        .byte $50   ; <P>
- D 0 - - - 0x02C241 0B:8231: 14        .byte $14   ; 
- D 0 - - - 0x02C242 0B:8232: 1C        .byte $1C   ; 
- D 0 - - - 0x02C243 0B:8233: 26        .byte $26   ; 
- D 0 - - - 0x02C244 0B:8234: A8        .byte $A8   ; 
- D 0 - - - 0x02C245 0B:8235: B0        .byte $B0   ; 
- D 0 - - - 0x02C246 0B:8236: B8        .byte $B8   ; 
- - - - - - 0x02C247 0B:8237: FF        .byte $FF   ; 
- - - - - - 0x02C248 0B:8238: FF        .byte $FF   ; 
- - - - - - 0x02C249 0B:8239: FF        .byte $FF   ; 
- - - - - - 0x02C24A 0B:823A: FF        .byte $FF   ; 
- - - - - - 0x02C24B 0B:823B: FF        .byte $FF   ; 
- - - - - - 0x02C24C 0B:823C: FF        .byte $FF   ; 
- - - - - - 0x02C24D 0B:823D: FF        .byte $FF   ; 
- - - - - - 0x02C24E 0B:823E: FF        .byte $FF   ; 
- - - - - - 0x02C24F 0B:823F: FF        .byte $FF   ; 
- - - - - - 0x02C250 0B:8240: FF        .byte $FF   ; 
- - - - - - 0x02C251 0B:8241: FF        .byte $FF   ; 
- - - - - - 0x02C252 0B:8242: FF        .byte $FF   ; 
- - - - - - 0x02C253 0B:8243: FF        .byte $FF   ; 
- - - - - - 0x02C254 0B:8244: FF        .byte $FF   ; 
- - - - - - 0x02C255 0B:8245: FF        .byte $FF   ; 
- - - - - - 0x02C256 0B:8246: FF        .byte $FF   ; 
- - - - - - 0x02C257 0B:8247: FF        .byte $FF   ; 
- - - - - - 0x02C258 0B:8248: FF        .byte $FF   ; 
- - - - - - 0x02C259 0B:8249: FF        .byte $FF   ; 
- - - - - - 0x02C25A 0B:824A: FF        .byte $FF   ; 
- - - - - - 0x02C25B 0B:824B: FF        .byte $FF   ; 
- - - - - - 0x02C25C 0B:824C: FF        .byte $FF   ; 
- - - - - - 0x02C25D 0B:824D: FF        .byte $FF   ; 
- - - - - - 0x02C25E 0B:824E: FF        .byte $FF   ; 
- - - - - - 0x02C25F 0B:824F: FF        .byte $FF   ; 
- - - - - - 0x02C260 0B:8250: FF        .byte $FF   ; 
- - - - - - 0x02C261 0B:8251: FF        .byte $FF   ; 
- - - - - - 0x02C262 0B:8252: FF        .byte $FF   ; 
- - - - - - 0x02C263 0B:8253: FF        .byte $FF   ; 
- - - - - - 0x02C264 0B:8254: FF        .byte $FF   ; 
- - - - - - 0x02C265 0B:8255: FF        .byte $FF   ; 
- - - - - - 0x02C266 0B:8256: FF        .byte $FF   ; 
- - - - - - 0x02C267 0B:8257: FF        .byte $FF   ; 
- - - - - - 0x02C268 0B:8258: FF        .byte $FF   ; 
- - - - - - 0x02C269 0B:8259: FF        .byte $FF   ; 
- - - - - - 0x02C26A 0B:825A: FF        .byte $FF   ; 
- - - - - - 0x02C26B 0B:825B: FF        .byte $FF   ; 
- - - - - - 0x02C26C 0B:825C: FF        .byte $FF   ; 
- - - - - - 0x02C26D 0B:825D: FF        .byte $FF   ; 
- - - - - - 0x02C26E 0B:825E: FF        .byte $FF   ; 
- - - - - - 0x02C26F 0B:825F: FF        .byte $FF   ; 
- - - - - - 0x02C270 0B:8260: FF        .byte $FF   ; 
- - - - - - 0x02C271 0B:8261: FF        .byte $FF   ; 
- - - - - - 0x02C272 0B:8262: FF        .byte $FF   ; 
- - - - - - 0x02C273 0B:8263: FF        .byte $FF   ; 
- - - - - - 0x02C274 0B:8264: FF        .byte $FF   ; 
- - - - - - 0x02C275 0B:8265: FF        .byte $FF   ; 
- - - - - - 0x02C276 0B:8266: FF        .byte $FF   ; 
- - - - - - 0x02C277 0B:8267: FF        .byte $FF   ; 
- - - - - - 0x02C278 0B:8268: FF        .byte $FF   ; 
- - - - - - 0x02C279 0B:8269: FF        .byte $FF   ; 
- - - - - - 0x02C27A 0B:826A: FF        .byte $FF   ; 
- - - - - - 0x02C27B 0B:826B: FF        .byte $FF   ; 
- - - - - - 0x02C27C 0B:826C: FF        .byte $FF   ; 
- - - - - - 0x02C27D 0B:826D: FF        .byte $FF   ; 
- - - - - - 0x02C27E 0B:826E: FF        .byte $FF   ; 
- - - - - - 0x02C27F 0B:826F: FF        .byte $FF   ; 
- - - - - - 0x02C280 0B:8270: FF        .byte $FF   ; 
- - - - - - 0x02C281 0B:8271: FF        .byte $FF   ; 
- - - - - - 0x02C282 0B:8272: FF        .byte $FF   ; 
- - - - - - 0x02C283 0B:8273: FF        .byte $FF   ; 
- - - - - - 0x02C284 0B:8274: FF        .byte $FF   ; 
- - - - - - 0x02C285 0B:8275: FF        .byte $FF   ; 
- - - - - - 0x02C286 0B:8276: FF        .byte $FF   ; 
- - - - - - 0x02C287 0B:8277: FF        .byte $FF   ; 
- - - - - - 0x02C288 0B:8278: FF        .byte $FF   ; 
- - - - - - 0x02C289 0B:8279: FF        .byte $FF   ; 
- - - - - - 0x02C28A 0B:827A: FF        .byte $FF   ; 
- - - - - - 0x02C28B 0B:827B: FF        .byte $FF   ; 
- - - - - - 0x02C28C 0B:827C: FF        .byte $FF   ; 
- - - - - - 0x02C28D 0B:827D: FF        .byte $FF   ; 
- - - - - - 0x02C28E 0B:827E: FF        .byte $FF   ; 
- - - - - - 0x02C28F 0B:827F: FF        .byte $FF   ; 
- D 0 - I - 0x02C290 0B:8280: 2C        .byte $2C   ; 
- D 0 - I - 0x02C291 0B:8281: 84        .byte $84   ; 
- D 0 - I - 0x02C292 0B:8282: 17        .byte $17   ; 
- D 0 - I - 0x02C293 0B:8283: 85        .byte $85   ; 
- D 0 - I - 0x02C294 0B:8284: 02        .byte $02   ; 
- D 0 - I - 0x02C295 0B:8285: 86        .byte $86   ; 
- D 0 - I - 0x02C296 0B:8286: EE        .byte $EE   ; 
- D 0 - I - 0x02C297 0B:8287: 86        .byte $86   ; 
- D 0 - I - 0x02C298 0B:8288: D9        .byte $D9   ; 
- D 0 - I - 0x02C299 0B:8289: 87        .byte $87   ; 
- D 0 - I - 0x02C29A 0B:828A: 40        .byte $40   ; 
- D 0 - I - 0x02C29B 0B:828B: 88        .byte $88   ; 
- D 0 - I - 0x02C29C 0B:828C: 9F        .byte $9F   ; 
- D 0 - I - 0x02C29D 0B:828D: 88        .byte $88   ; 
- D 0 - I - 0x02C29E 0B:828E: D4        .byte $D4   ; 
- D 0 - I - 0x02C29F 0B:828F: 88        .byte $88   ; 
- D 0 - I - 0x02C2A0 0B:8290: 07        .byte $07   ; 
- D 0 - I - 0x02C2A1 0B:8291: 89        .byte $89   ; 
- D 0 - I - 0x02C2A2 0B:8292: 3A        .byte $3A   ; 
- D 0 - I - 0x02C2A3 0B:8293: 89        .byte $89   ; 
- D 0 - I - 0x02C2A4 0B:8294: 6B        .byte $6B   ; <k>
- D 0 - I - 0x02C2A5 0B:8295: 89        .byte $89   ; 
- D 0 - I - 0x02C2A6 0B:8296: 7A        .byte $7A   ; <z>
- D 0 - I - 0x02C2A7 0B:8297: 89        .byte $89   ; 
- D 0 - I - 0x02C2A8 0B:8298: 8D        .byte $8D   ; 
- D 0 - I - 0x02C2A9 0B:8299: 89        .byte $89   ; 
- D 0 - I - 0x02C2AA 0B:829A: 9C        .byte $9C   ; 
- D 0 - I - 0x02C2AB 0B:829B: 89        .byte $89   ; 
- - - - - - 0x02C2AC 0B:829C: AF        .byte $AF   ; 
- - - - - - 0x02C2AD 0B:829D: 89        .byte $89   ; 
- D 0 - I - 0x02C2AE 0B:829E: BC        .byte $BC   ; 
- D 0 - I - 0x02C2AF 0B:829F: 89        .byte $89   ; 
- D 0 - I - 0x02C2B0 0B:82A0: 3F        .byte $3F   ; 
- D 0 - I - 0x02C2B1 0B:82A1: 8B        .byte $8B   ; 
- D 0 - I - 0x02C2B2 0B:82A2: 4E        .byte $4E   ; <N>
- D 0 - I - 0x02C2B3 0B:82A3: 8B        .byte $8B   ; 
- D 0 - I - 0x02C2B4 0B:82A4: 61        .byte $61   ; <a>
- D 0 - I - 0x02C2B5 0B:82A5: 8B        .byte $8B   ; 
- D 0 - I - 0x02C2B6 0B:82A6: 74        .byte $74   ; <t>
- D 0 - I - 0x02C2B7 0B:82A7: 8B        .byte $8B   ; 
- D 0 - I - 0x02C2B8 0B:82A8: 81        .byte $81   ; 
- D 0 - I - 0x02C2B9 0B:82A9: 8B        .byte $8B   ; 
- D 0 - I - 0x02C2BA 0B:82AA: 0C        .byte $0C   ; 
- D 0 - I - 0x02C2BB 0B:82AB: 8D        .byte $8D   ; 
- D 0 - I - 0x02C2BC 0B:82AC: 1B        .byte $1B   ; 
- D 0 - I - 0x02C2BD 0B:82AD: 8D        .byte $8D   ; 
- D 0 - I - 0x02C2BE 0B:82AE: 30        .byte $30   ; <0>
- D 0 - I - 0x02C2BF 0B:82AF: 8D        .byte $8D   ; 
- D 0 - I - 0x02C2C0 0B:82B0: 45        .byte $45   ; <E>
- D 0 - I - 0x02C2C1 0B:82B1: 8D        .byte $8D   ; 
- D 0 - I - 0x02C2C2 0B:82B2: 52        .byte $52   ; <R>
- D 0 - I - 0x02C2C3 0B:82B3: 8D        .byte $8D   ; 
- - - - - - 0x02C2C4 0B:82B4: 1D        .byte $1D   ; 
- - - - - - 0x02C2C5 0B:82B5: 8F        .byte $8F   ; 
- D 0 - I - 0x02C2C6 0B:82B6: 2C        .byte $2C   ; 
- D 0 - I - 0x02C2C7 0B:82B7: 8F        .byte $8F   ; 
- - - - - - 0x02C2C8 0B:82B8: 41        .byte $41   ; <A>
- - - - - - 0x02C2C9 0B:82B9: 8F        .byte $8F   ; 
- D 0 - I - 0x02C2CA 0B:82BA: 56        .byte $56   ; <V>
- D 0 - I - 0x02C2CB 0B:82BB: 8F        .byte $8F   ; 
- D 0 - I - 0x02C2CC 0B:82BC: 63        .byte $63   ; <c>
- D 0 - I - 0x02C2CD 0B:82BD: 8F        .byte $8F   ; 
- D 0 - I - 0x02C2CE 0B:82BE: E8        .byte $E8   ; 
- D 0 - I - 0x02C2CF 0B:82BF: 8F        .byte $8F   ; 
- D 0 - I - 0x02C2D0 0B:82C0: A9        .byte $A9   ; 
- D 0 - I - 0x02C2D1 0B:82C1: 91        .byte $91   ; 
- D 0 - I - 0x02C2D2 0B:82C2: C6        .byte $C6   ; 
- D 0 - I - 0x02C2D3 0B:82C3: 91        .byte $91   ; 
- D 0 - I - 0x02C2D4 0B:82C4: DF        .byte $DF   ; 
- D 0 - I - 0x02C2D5 0B:82C5: 91        .byte $91   ; 
- D 0 - I - 0x02C2D6 0B:82C6: F8        .byte $F8   ; 
- D 0 - I - 0x02C2D7 0B:82C7: 91        .byte $91   ; 
- D 0 - I - 0x02C2D8 0B:82C8: 09        .byte $09   ; 
- D 0 - I - 0x02C2D9 0B:82C9: 92        .byte $92   ; 
- D 0 - I - 0x02C2DA 0B:82CA: 9B        .byte $9B   ; 
- D 0 - I - 0x02C2DB 0B:82CB: 92        .byte $92   ; 
- D 0 - I - 0x02C2DC 0B:82CC: 98        .byte $98   ; 
- D 0 - I - 0x02C2DD 0B:82CD: 93        .byte $93   ; 
- D 0 - I - 0x02C2DE 0B:82CE: D9        .byte $D9   ; 
- D 0 - I - 0x02C2DF 0B:82CF: 93        .byte $93   ; 
- D 0 - I - 0x02C2E0 0B:82D0: 32        .byte $32   ; <2>
- D 0 - I - 0x02C2E1 0B:82D1: 94        .byte $94   ; 
- D 0 - I - 0x02C2E2 0B:82D2: 95        .byte $95   ; 
- D 0 - I - 0x02C2E3 0B:82D3: 94        .byte $94   ; 
- D 0 - I - 0x02C2E4 0B:82D4: E8        .byte $E8   ; 
- D 0 - I - 0x02C2E5 0B:82D5: 94        .byte $94   ; 
- D 0 - I - 0x02C2E6 0B:82D6: 05        .byte $05   ; 
- D 0 - I - 0x02C2E7 0B:82D7: 95        .byte $95   ; 
- D 0 - I - 0x02C2E8 0B:82D8: 20        .byte $20   ; 
- D 0 - I - 0x02C2E9 0B:82D9: 95        .byte $95   ; 
- - - - - - 0x02C2EA 0B:82DA: 51        .byte $51   ; <Q>
- - - - - - 0x02C2EB 0B:82DB: 96        .byte $96   ; 
- - - - - - 0x02C2EC 0B:82DC: 6E        .byte $6E   ; <n>
- - - - - - 0x02C2ED 0B:82DD: 96        .byte $96   ; 
- D 0 - I - 0x02C2EE 0B:82DE: 97        .byte $97   ; 
- D 0 - I - 0x02C2EF 0B:82DF: B8        .byte $B8   ; 
- D 0 - I - 0x02C2F0 0B:82E0: 8B        .byte $8B   ; 
- D 0 - I - 0x02C2F1 0B:82E1: 96        .byte $96   ; 
- D 0 - I - 0x02C2F2 0B:82E2: D8        .byte $D8   ; 
- D 0 - I - 0x02C2F3 0B:82E3: 96        .byte $96   ; 
- - - - - - 0x02C2F4 0B:82E4: BF        .byte $BF   ; 
- - - - - - 0x02C2F5 0B:82E5: BD        .byte $BD   ; 
- - - - - - 0x02C2F6 0B:82E6: BF        .byte $BF   ; 
- - - - - - 0x02C2F7 0B:82E7: BD        .byte $BD   ; 
- - - - - - 0x02C2F8 0B:82E8: BF        .byte $BF   ; 
- - - - - - 0x02C2F9 0B:82E9: BD        .byte $BD   ; 
- - - - - - 0x02C2FA 0B:82EA: BF        .byte $BF   ; 
- - - - - - 0x02C2FB 0B:82EB: BD        .byte $BD   ; 
- - - - - - 0x02C2FC 0B:82EC: BF        .byte $BF   ; 
- - - - - - 0x02C2FD 0B:82ED: BD        .byte $BD   ; 
- - - - - - 0x02C2FE 0B:82EE: BF        .byte $BF   ; 
- - - - - - 0x02C2FF 0B:82EF: BD        .byte $BD   ; 
- - - - - - 0x02C300 0B:82F0: BF        .byte $BF   ; 
- - - - - - 0x02C301 0B:82F1: BD        .byte $BD   ; 
- - - - - - 0x02C302 0B:82F2: BF        .byte $BF   ; 
- - - - - - 0x02C303 0B:82F3: BD        .byte $BD   ; 
- - - - - - 0x02C304 0B:82F4: BF        .byte $BF   ; 
- - - - - - 0x02C305 0B:82F5: BD        .byte $BD   ; 
- - - - - - 0x02C306 0B:82F6: BF        .byte $BF   ; 
- - - - - - 0x02C307 0B:82F7: BD        .byte $BD   ; 
- - - - - - 0x02C308 0B:82F8: BF        .byte $BF   ; 
- - - - - - 0x02C309 0B:82F9: BD        .byte $BD   ; 
- - - - - - 0x02C30A 0B:82FA: BF        .byte $BF   ; 
- - - - - - 0x02C30B 0B:82FB: BD        .byte $BD   ; 
- - - - - - 0x02C30C 0B:82FC: 39        .byte $39   ; <9>
- - - - - - 0x02C30D 0B:82FD: 97        .byte $97   ; 
- D 0 - I - 0x02C30E 0B:82FE: E4        .byte $E4   ; 
- D 0 - I - 0x02C30F 0B:82FF: 98        .byte $98   ; 
- D 0 - I - 0x02C310 0B:8300: 01        .byte $01   ; 
- D 0 - I - 0x02C311 0B:8301: 99        .byte $99   ; 
- D 0 - I - 0x02C312 0B:8302: 1E        .byte $1E   ; 
- D 0 - I - 0x02C313 0B:8303: 99        .byte $99   ; 
- - - - - - 0x02C314 0B:8304: 2C        .byte $2C   ; 
- - - - - - 0x02C315 0B:8305: 9B        .byte $9B   ; 
- D 0 - I - 0x02C316 0B:8306: 89        .byte $89   ; 
- D 0 - I - 0x02C317 0B:8307: 9B        .byte $9B   ; 
- D 0 - I - 0x02C318 0B:8308: BA        .byte $BA   ; 
- D 0 - I - 0x02C319 0B:8309: 9B        .byte $9B   ; 
- D 0 - I - 0x02C31A 0B:830A: EB        .byte $EB   ; 
- D 0 - I - 0x02C31B 0B:830B: 9B        .byte $9B   ; 
- D 0 - I - 0x02C31C 0B:830C: 1E        .byte $1E   ; 
- D 0 - I - 0x02C31D 0B:830D: 9C        .byte $9C   ; 
- D 0 - I - 0x02C31E 0B:830E: 51        .byte $51   ; <Q>
- D 0 - I - 0x02C31F 0B:830F: 9C        .byte $9C   ; 
- D 0 - I - 0x02C320 0B:8310: 8C        .byte $8C   ; 
- D 0 - I - 0x02C321 0B:8311: 9C        .byte $9C   ; 
- D 0 - I - 0x02C322 0B:8312: BD        .byte $BD   ; 
- D 0 - I - 0x02C323 0B:8313: 9C        .byte $9C   ; 
- D 0 - I - 0x02C324 0B:8314: 0C        .byte $0C   ; 
- D 0 - I - 0x02C325 0B:8315: 9D        .byte $9D   ; 
- D 0 - I - 0x02C326 0B:8316: 39        .byte $39   ; <9>
- D 0 - I - 0x02C327 0B:8317: 9D        .byte $9D   ; 
- D 0 - I - 0x02C328 0B:8318: 66        .byte $66   ; <f>
- D 0 - I - 0x02C329 0B:8319: 9D        .byte $9D   ; 
- D 0 - I - 0x02C32A 0B:831A: 91        .byte $91   ; 
- D 0 - I - 0x02C32B 0B:831B: 9D        .byte $9D   ; 
- D 0 - I - 0x02C32C 0B:831C: BC        .byte $BC   ; 
- D 0 - I - 0x02C32D 0B:831D: 9D        .byte $9D   ; 
- D 0 - I - 0x02C32E 0B:831E: 3B        .byte $3B   ; 
- D 0 - I - 0x02C32F 0B:831F: 9E        .byte $9E   ; 
- D 0 - I - 0x02C330 0B:8320: E9        .byte $E9   ; 
- D 0 - I - 0x02C331 0B:8321: 9E        .byte $9E   ; 
- D 0 - I - 0x02C332 0B:8322: 86        .byte $86   ; 
- D 0 - I - 0x02C333 0B:8323: 9F        .byte $9F   ; 
- D 0 - I - 0x02C334 0B:8324: 23        .byte $23   ; 
- D 0 - I - 0x02C335 0B:8325: A0        .byte $A0   ; 
- D 0 - I - 0x02C336 0B:8326: 96        .byte $96   ; 
- D 0 - I - 0x02C337 0B:8327: A0        .byte $A0   ; 
- D 0 - I - 0x02C338 0B:8328: 29        .byte $29   ; 
- D 0 - I - 0x02C339 0B:8329: A1        .byte $A1   ; 
- D 0 - I - 0x02C33A 0B:832A: 50        .byte $50   ; <P>
- D 0 - I - 0x02C33B 0B:832B: A1        .byte $A1   ; 
- D 0 - I - 0x02C33C 0B:832C: B5        .byte $B5   ; 
- D 0 - I - 0x02C33D 0B:832D: A1        .byte $A1   ; 
- D 0 - I - 0x02C33E 0B:832E: CC        .byte $CC   ; 
- D 0 - I - 0x02C33F 0B:832F: A1        .byte $A1   ; 
- D 0 - I - 0x02C340 0B:8330: 1F        .byte $1F   ; 
- D 0 - I - 0x02C341 0B:8331: A2        .byte $A2   ; 
- D 0 - I - 0x02C342 0B:8332: 6A        .byte $6A   ; <j>
- D 0 - I - 0x02C343 0B:8333: A2        .byte $A2   ; 
- D 0 - I - 0x02C344 0B:8334: BF        .byte $BF   ; 
- D 0 - I - 0x02C345 0B:8335: A2        .byte $A2   ; 
- D 0 - I - 0x02C346 0B:8336: 14        .byte $14   ; 
- D 0 - I - 0x02C347 0B:8337: A3        .byte $A3   ; 
- D 0 - I - 0x02C348 0B:8338: 87        .byte $87   ; 
- D 0 - I - 0x02C349 0B:8339: A3        .byte $A3   ; 
- D 0 - I - 0x02C34A 0B:833A: DA        .byte $DA   ; 
- D 0 - I - 0x02C34B 0B:833B: A3        .byte $A3   ; 
- D 0 - I - 0x02C34C 0B:833C: 4D        .byte $4D   ; <M>
- D 0 - I - 0x02C34D 0B:833D: A4        .byte $A4   ; 
- D 0 - I - 0x02C34E 0B:833E: B6        .byte $B6   ; 
- D 0 - I - 0x02C34F 0B:833F: A4        .byte $A4   ; 
- D 0 - I - 0x02C350 0B:8340: 0D        .byte $0D   ; 
- D 0 - I - 0x02C351 0B:8341: A5        .byte $A5   ; 
- D 0 - I - 0x02C352 0B:8342: 44        .byte $44   ; <D>
- D 0 - I - 0x02C353 0B:8343: A5        .byte $A5   ; 
- D 0 - I - 0x02C354 0B:8344: 5D        .byte $5D   ; 
- D 0 - I - 0x02C355 0B:8345: A5        .byte $A5   ; 
- D 0 - I - 0x02C356 0B:8346: BE        .byte $BE   ; 
- D 0 - I - 0x02C357 0B:8347: A5        .byte $A5   ; 
- D 0 - I - 0x02C358 0B:8348: 0B        .byte $0B   ; 
- D 0 - I - 0x02C359 0B:8349: A6        .byte $A6   ; 
- D 0 - I - 0x02C35A 0B:834A: 32        .byte $32   ; <2>
- D 0 - I - 0x02C35B 0B:834B: A6        .byte $A6   ; 
- D 0 - I - 0x02C35C 0B:834C: 95        .byte $95   ; 
- D 0 - I - 0x02C35D 0B:834D: A6        .byte $A6   ; 
- D 0 - I - 0x02C35E 0B:834E: E8        .byte $E8   ; 
- D 0 - I - 0x02C35F 0B:834F: A6        .byte $A6   ; 
- D 0 - I - 0x02C360 0B:8350: 33        .byte $33   ; <3>
- D 0 - I - 0x02C361 0B:8351: A7        .byte $A7   ; 
- D 0 - I - 0x02C362 0B:8352: 84        .byte $84   ; 
- D 0 - I - 0x02C363 0B:8353: A7        .byte $A7   ; 
- D 0 - I - 0x02C364 0B:8354: C3        .byte $C3   ; 
- D 0 - I - 0x02C365 0B:8355: A7        .byte $A7   ; 
- D 0 - I - 0x02C366 0B:8356: 08        .byte $08   ; 
- D 0 - I - 0x02C367 0B:8357: A8        .byte $A8   ; 
- D 0 - I - 0x02C368 0B:8358: 45        .byte $45   ; <E>
- D 0 - I - 0x02C369 0B:8359: A8        .byte $A8   ; 
- D 0 - I - 0x02C36A 0B:835A: 6A        .byte $6A   ; <j>
- D 0 - I - 0x02C36B 0B:835B: A8        .byte $A8   ; 
- D 0 - I - 0x02C36C 0B:835C: 9D        .byte $9D   ; 
- D 0 - I - 0x02C36D 0B:835D: A8        .byte $A8   ; 
- D 0 - I - 0x02C36E 0B:835E: B4        .byte $B4   ; 
- D 0 - I - 0x02C36F 0B:835F: A8        .byte $A8   ; 
- D 0 - I - 0x02C370 0B:8360: C1        .byte $C1   ; 
- D 0 - I - 0x02C371 0B:8361: A8        .byte $A8   ; 
- D 0 - I - 0x02C372 0B:8362: 6F        .byte $6F   ; <o>
- D 0 - I - 0x02C373 0B:8363: A9        .byte $A9   ; 
- D 0 - I - 0x02C374 0B:8364: B2        .byte $B2   ; 
- D 0 - I - 0x02C375 0B:8365: A9        .byte $A9   ; 
- D 0 - I - 0x02C376 0B:8366: E1        .byte $E1   ; 
- D 0 - I - 0x02C377 0B:8367: A9        .byte $A9   ; 
- D 0 - I - 0x02C378 0B:8368: 06        .byte $06   ; 
- D 0 - I - 0x02C379 0B:8369: AA        .byte $AA   ; 
- D 0 - I - 0x02C37A 0B:836A: 23        .byte $23   ; 
- D 0 - I - 0x02C37B 0B:836B: AA        .byte $AA   ; 
- D 0 - I - 0x02C37C 0B:836C: 34        .byte $34   ; <4>
- D 0 - I - 0x02C37D 0B:836D: AA        .byte $AA   ; 
- D 0 - I - 0x02C37E 0B:836E: 45        .byte $45   ; <E>
- D 0 - I - 0x02C37F 0B:836F: AA        .byte $AA   ; 
- D 0 - I - 0x02C380 0B:8370: 52        .byte $52   ; <R>
- D 0 - I - 0x02C381 0B:8371: AA        .byte $AA   ; 
- D 0 - I - 0x02C382 0B:8372: 5F        .byte $5F   ; 
- D 0 - I - 0x02C383 0B:8373: AA        .byte $AA   ; 
- D 0 - I - 0x02C384 0B:8374: 6C        .byte $6C   ; <l>
- D 0 - I - 0x02C385 0B:8375: AA        .byte $AA   ; 
- D 0 - I - 0x02C386 0B:8376: 79        .byte $79   ; <y>
- D 0 - I - 0x02C387 0B:8377: AA        .byte $AA   ; 
- D 0 - I - 0x02C388 0B:8378: 7E        .byte $7E   ; 
- D 0 - I - 0x02C389 0B:8379: AA        .byte $AA   ; 
- D 0 - I - 0x02C38A 0B:837A: 83        .byte $83   ; 
- D 0 - I - 0x02C38B 0B:837B: AA        .byte $AA   ; 
- D 0 - I - 0x02C38C 0B:837C: 88        .byte $88   ; 
- D 0 - I - 0x02C38D 0B:837D: AA        .byte $AA   ; 
- D 0 - I - 0x02C38E 0B:837E: A9        .byte $A9   ; 
- D 0 - I - 0x02C38F 0B:837F: AA        .byte $AA   ; 
- D 0 - I - 0x02C390 0B:8380: C2        .byte $C2   ; 
- D 0 - I - 0x02C391 0B:8381: AA        .byte $AA   ; 
- D 0 - I - 0x02C392 0B:8382: D9        .byte $D9   ; 
- D 0 - I - 0x02C393 0B:8383: AA        .byte $AA   ; 
- D 0 - I - 0x02C394 0B:8384: E6        .byte $E6   ; 
- D 0 - I - 0x02C395 0B:8385: AA        .byte $AA   ; 
- D 0 - I - 0x02C396 0B:8386: F3        .byte $F3   ; 
- D 0 - I - 0x02C397 0B:8387: AA        .byte $AA   ; 
- D 0 - I - 0x02C398 0B:8388: 00        .byte $00   ; 
- D 0 - I - 0x02C399 0B:8389: AB        .byte $AB   ; 
- D 0 - I - 0x02C39A 0B:838A: 0D        .byte $0D   ; 
- D 0 - I - 0x02C39B 0B:838B: AB        .byte $AB   ; 
- D 0 - I - 0x02C39C 0B:838C: 12        .byte $12   ; 
- D 0 - I - 0x02C39D 0B:838D: AB        .byte $AB   ; 
- D 0 - I - 0x02C39E 0B:838E: 17        .byte $17   ; 
- D 0 - I - 0x02C39F 0B:838F: AB        .byte $AB   ; 
- D 0 - I - 0x02C3A0 0B:8390: 1C        .byte $1C   ; 
- D 0 - I - 0x02C3A1 0B:8391: AB        .byte $AB   ; 
- D 0 - I - 0x02C3A2 0B:8392: 53        .byte $53   ; <S>
- D 0 - I - 0x02C3A3 0B:8393: AB        .byte $AB   ; 
- D 0 - I - 0x02C3A4 0B:8394: 3C        .byte $3C   ; 
- D 0 - I - 0x02C3A5 0B:8395: AD        .byte $AD   ; 
- D 0 - I - 0x02C3A6 0B:8396: 65        .byte $65   ; <e>
- D 0 - I - 0x02C3A7 0B:8397: AD        .byte $AD   ; 
- D 0 - I - 0x02C3A8 0B:8398: 7C        .byte $7C   ; 
- D 0 - I - 0x02C3A9 0B:8399: AD        .byte $AD   ; 
- D 0 - I - 0x02C3AA 0B:839A: 93        .byte $93   ; 
- D 0 - I - 0x02C3AB 0B:839B: AD        .byte $AD   ; 
- D 0 - I - 0x02C3AC 0B:839C: AE        .byte $AE   ; 
- D 0 - I - 0x02C3AD 0B:839D: AD        .byte $AD   ; 
- D 0 - I - 0x02C3AE 0B:839E: C9        .byte $C9   ; 
- D 0 - I - 0x02C3AF 0B:839F: AD        .byte $AD   ; 
- D 0 - I - 0x02C3B0 0B:83A0: E2        .byte $E2   ; 
- D 0 - I - 0x02C3B1 0B:83A1: AD        .byte $AD   ; 
- D 0 - I - 0x02C3B2 0B:83A2: 47        .byte $47   ; <G>
- D 0 - I - 0x02C3B3 0B:83A3: AE        .byte $AE   ; 
- D 0 - I - 0x02C3B4 0B:83A4: 88        .byte $88   ; 
- D 0 - I - 0x02C3B5 0B:83A5: AE        .byte $AE   ; 
- D 0 - I - 0x02C3B6 0B:83A6: B5        .byte $B5   ; 
- D 0 - I - 0x02C3B7 0B:83A7: AE        .byte $AE   ; 
- D 0 - I - 0x02C3B8 0B:83A8: 6D        .byte $6D   ; <m>
- D 0 - I - 0x02C3B9 0B:83A9: AF        .byte $AF   ; 
- D 0 - I - 0x02C3BA 0B:83AA: 2B        .byte $2B   ; 
- D 0 - I - 0x02C3BB 0B:83AB: B0        .byte $B0   ; 
- D 0 - I - 0x02C3BC 0B:83AC: 34        .byte $34   ; <4>
- D 0 - I - 0x02C3BD 0B:83AD: B0        .byte $B0   ; 
- D 0 - I - 0x02C3BE 0B:83AE: 3D        .byte $3D   ; 
- D 0 - I - 0x02C3BF 0B:83AF: B0        .byte $B0   ; 
- D 0 - I - 0x02C3C0 0B:83B0: 46        .byte $46   ; <F>
- D 0 - I - 0x02C3C1 0B:83B1: B0        .byte $B0   ; 
- D 0 - I - 0x02C3C2 0B:83B2: D7        .byte $D7   ; 
- D 0 - I - 0x02C3C3 0B:83B3: B0        .byte $B0   ; 
- D 0 - I - 0x02C3C4 0B:83B4: D4        .byte $D4   ; 
- D 0 - I - 0x02C3C5 0B:83B5: B1        .byte $B1   ; 
- D 0 - I - 0x02C3C6 0B:83B6: E3        .byte $E3   ; 
- D 0 - I - 0x02C3C7 0B:83B7: B1        .byte $B1   ; 
- D 0 - I - 0x02C3C8 0B:83B8: FA        .byte $FA   ; 
- D 0 - I - 0x02C3C9 0B:83B9: B1        .byte $B1   ; 
- D 0 - I - 0x02C3CA 0B:83BA: 11        .byte $11   ; 
- D 0 - I - 0x02C3CB 0B:83BB: B2        .byte $B2   ; 
- D 0 - I - 0x02C3CC 0B:83BC: 1E        .byte $1E   ; 
- D 0 - I - 0x02C3CD 0B:83BD: B2        .byte $B2   ; 
- D 0 - I - 0x02C3CE 0B:83BE: CC        .byte $CC   ; 
- D 0 - I - 0x02C3CF 0B:83BF: B2        .byte $B2   ; 
- D 0 - I - 0x02C3D0 0B:83C0: D9        .byte $D9   ; 
- D 0 - I - 0x02C3D1 0B:83C1: B2        .byte $B2   ; 
- D 0 - I - 0x02C3D2 0B:83C2: C8        .byte $C8   ; 
- D 0 - I - 0x02C3D3 0B:83C3: B3        .byte $B3   ; 
- D 0 - I - 0x02C3D4 0B:83C4: 25        .byte $25   ; 
- D 0 - I - 0x02C3D5 0B:83C5: B4        .byte $B4   ; 
- D 0 - I - 0x02C3D6 0B:83C6: 8C        .byte $8C   ; 
- D 0 - I - 0x02C3D7 0B:83C7: B6        .byte $B6   ; 
- D 0 - I - 0x02C3D8 0B:83C8: B9        .byte $B9   ; 
- D 0 - I - 0x02C3D9 0B:83C9: B6        .byte $B6   ; 
- D 0 - I - 0x02C3DA 0B:83CA: D6        .byte $D6   ; 
- D 0 - I - 0x02C3DB 0B:83CB: B6        .byte $B6   ; 
- D 0 - I - 0x02C3DC 0B:83CC: F3        .byte $F3   ; 
- D 0 - I - 0x02C3DD 0B:83CD: B6        .byte $B6   ; 
- D 0 - I - 0x02C3DE 0B:83CE: 00        .byte $00   ; 
- D 0 - I - 0x02C3DF 0B:83CF: B7        .byte $B7   ; 
- D 0 - I - 0x02C3E0 0B:83D0: 0D        .byte $0D   ; 
- D 0 - I - 0x02C3E1 0B:83D1: B7        .byte $B7   ; 
- D 0 - I - 0x02C3E2 0B:83D2: 26        .byte $26   ; 
- D 0 - I - 0x02C3E3 0B:83D3: B7        .byte $B7   ; 
- D 0 - I - 0x02C3E4 0B:83D4: 45        .byte $45   ; <E>
- D 0 - I - 0x02C3E5 0B:83D5: B7        .byte $B7   ; 
- D 0 - I - 0x02C3E6 0B:83D6: 74        .byte $74   ; <t>
- D 0 - I - 0x02C3E7 0B:83D7: B7        .byte $B7   ; 
- D 0 - I - 0x02C3E8 0B:83D8: 81        .byte $81   ; 
- D 0 - I - 0x02C3E9 0B:83D9: B7        .byte $B7   ; 
- D 0 - I - 0x02C3EA 0B:83DA: B4        .byte $B4   ; 
- D 0 - I - 0x02C3EB 0B:83DB: B7        .byte $B7   ; 
- D 0 - I - 0x02C3EC 0B:83DC: C1        .byte $C1   ; 
- D 0 - I - 0x02C3ED 0B:83DD: B7        .byte $B7   ; 
- D 0 - I - 0x02C3EE 0B:83DE: D8        .byte $D8   ; 
- D 0 - I - 0x02C3EF 0B:83DF: B7        .byte $B7   ; 
- D 0 - I - 0x02C3F0 0B:83E0: 7E        .byte $7E   ; 
- D 0 - I - 0x02C3F1 0B:83E1: B8        .byte $B8   ; 
- D 0 - I - 0x02C3F2 0B:83E2: A4        .byte $A4   ; 
- D 0 - I - 0x02C3F3 0B:83E3: B8        .byte $B8   ; 
- D 0 - I - 0x02C3F4 0B:83E4: ED        .byte $ED   ; 
- D 0 - I - 0x02C3F5 0B:83E5: B8        .byte $B8   ; 
- D 0 - I - 0x02C3F6 0B:83E6: 52        .byte $52   ; <R>
- D 0 - I - 0x02C3F7 0B:83E7: B9        .byte $B9   ; 
- D 0 - I - 0x02C3F8 0B:83E8: BF        .byte $BF   ; 
- D 0 - I - 0x02C3F9 0B:83E9: B9        .byte $B9   ; 
- D 0 - I - 0x02C3FA 0B:83EA: 18        .byte $18   ; 
- D 0 - I - 0x02C3FB 0B:83EB: BA        .byte $BA   ; 
- D 0 - I - 0x02C3FC 0B:83EC: 81        .byte $81   ; 
- D 0 - I - 0x02C3FD 0B:83ED: BA        .byte $BA   ; 
- D 0 - I - 0x02C3FE 0B:83EE: E0        .byte $E0   ; 
- D 0 - I - 0x02C3FF 0B:83EF: BA        .byte $BA   ; 
- D 0 - I - 0x02C400 0B:83F0: 21        .byte $21   ; 
- D 0 - I - 0x02C401 0B:83F1: BB        .byte $BB   ; 
- D 0 - I - 0x02C402 0B:83F2: 62        .byte $62   ; <b>
- D 0 - I - 0x02C403 0B:83F3: BB        .byte $BB   ; 
- D 0 - I - 0x02C404 0B:83F4: 6D        .byte $6D   ; <m>
- D 0 - I - 0x02C405 0B:83F5: BB        .byte $BB   ; 
- D 0 - I - 0x02C406 0B:83F6: 7C        .byte $7C   ; 
- D 0 - I - 0x02C407 0B:83F7: BB        .byte $BB   ; 
- D 0 - I - 0x02C408 0B:83F8: 8F        .byte $8F   ; 
- D 0 - I - 0x02C409 0B:83F9: BB        .byte $BB   ; 
- D 0 - I - 0x02C40A 0B:83FA: D8        .byte $D8   ; 
- D 0 - I - 0x02C40B 0B:83FB: BB        .byte $BB   ; 
- D 0 - I - 0x02C40C 0B:83FC: 0B        .byte $0B   ; 
- D 0 - I - 0x02C40D 0B:83FD: BC        .byte $BC   ; 
- D 0 - I - 0x02C40E 0B:83FE: 46        .byte $46   ; <F>
- D 0 - I - 0x02C40F 0B:83FF: BC        .byte $BC   ; 
- D 0 - I - 0x02C410 0B:8400: 9B        .byte $9B   ; 
- D 0 - I - 0x02C411 0B:8401: BC        .byte $BC   ; 
- D 0 - I - 0x02C412 0B:8402: 00        .byte $00   ; 
- D 0 - I - 0x02C413 0B:8403: BD        .byte $BD   ; 
- D 0 - I - 0x02C414 0B:8404: 2F        .byte $2F   ; 
- D 0 - I - 0x02C415 0B:8405: BD        .byte $BD   ; 
- D 0 - I - 0x02C416 0B:8406: 58        .byte $58   ; <X>
- D 0 - I - 0x02C417 0B:8407: BD        .byte $BD   ; 
- D 0 - I - 0x02C418 0B:8408: 67        .byte $67   ; <g>
- D 0 - I - 0x02C419 0B:8409: BD        .byte $BD   ; 
- D 0 - I - 0x02C41A 0B:840A: 7E        .byte $7E   ; 
- D 0 - I - 0x02C41B 0B:840B: BD        .byte $BD   ; 
- - - - - - 0x02C41C 0B:840C: A1        .byte $A1   ; 
- - - - - - 0x02C41D 0B:840D: BD        .byte $BD   ; 
- - - - - - 0x02C41E 0B:840E: B2        .byte $B2   ; 
- - - - - - 0x02C41F 0B:840F: BD        .byte $BD   ; 
- D 0 - I - 0x02C420 0B:8410: BF        .byte $BF   ; 
- D 0 - I - 0x02C421 0B:8411: BD        .byte $BD   ; 
- D 0 - I - 0x02C422 0B:8412: C4        .byte $C4   ; 
- D 0 - I - 0x02C423 0B:8413: BD        .byte $BD   ; 
- D 0 - I - 0x02C424 0B:8414: D5        .byte $D5   ; 
- D 0 - I - 0x02C425 0B:8415: BD        .byte $BD   ; 
- - - - - - 0x02C426 0B:8416: E2        .byte $E2   ; 
- - - - - - 0x02C427 0B:8417: BD        .byte $BD   ; 
- - - - - - 0x02C428 0B:8418: E7        .byte $E7   ; 
- - - - - - 0x02C429 0B:8419: BD        .byte $BD   ; 
- - - - - - 0x02C42A 0B:841A: BF        .byte $BF   ; 
- - - - - - 0x02C42B 0B:841B: BD        .byte $BD   ; 
- D 0 - I - 0x02C42C 0B:841C: EC        .byte $EC   ; 
- D 0 - I - 0x02C42D 0B:841D: BD        .byte $BD   ; 
- D 0 - I - 0x02C42E 0B:841E: 2D        .byte $2D   ; 
- D 0 - I - 0x02C42F 0B:841F: BE        .byte $BE   ; 
- D 0 - I - 0x02C430 0B:8420: D6        .byte $D6   ; 
- D 0 - I - 0x02C431 0B:8421: BE        .byte $BE   ; 
- D 0 - I - 0x02C432 0B:8422: 4D        .byte $4D   ; <M>
- D 0 - I - 0x02C433 0B:8423: BF        .byte $BF   ; 
- D 0 - I - 0x02C434 0B:8424: F4        .byte $F4   ; 
- D 0 - I - 0x02C435 0B:8425: 8F        .byte $8F   ; 
- D 0 - I - 0x02C436 0B:8426: 6A        .byte $6A   ; <j>
- D 0 - I - 0x02C437 0B:8427: BF        .byte $BF   ; 
- D 0 - I - 0x02C438 0B:8428: 8B        .byte $8B   ; 
- D 0 - I - 0x02C439 0B:8429: BF        .byte $BF   ; 
- D 0 - I - 0x02C43A 0B:842A: AC        .byte $AC   ; 
- D 0 - I - 0x02C43B 0B:842B: BF        .byte $BF   ; 
- D 0 - I - 0x02C43C 0B:842C: 03        .byte $03   ; 
- D 0 - I - 0x02C43D 0B:842D: 45        .byte $45   ; <E>
- D 0 - I - 0x02C43E 0B:842E: 84        .byte $84   ; 
- D 0 - I - 0x02C43F 0B:842F: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x02C440 0B:8430: 84        .byte $84   ; 
- D 0 - I - 0x02C441 0B:8431: 71        .byte $71   ; <q>
- D 0 - I - 0x02C442 0B:8432: 84        .byte $84   ; 
- D 0 - I - 0x02C443 0B:8433: 8A        .byte $8A   ; 
- D 0 - I - 0x02C444 0B:8434: 84        .byte $84   ; 
- D 0 - I - 0x02C445 0B:8435: 9B        .byte $9B   ; 
- D 0 - I - 0x02C446 0B:8436: 84        .byte $84   ; 
- D 0 - I - 0x02C447 0B:8437: A8        .byte $A8   ; 
- D 0 - I - 0x02C448 0B:8438: 84        .byte $84   ; 
- D 0 - I - 0x02C449 0B:8439: BB        .byte $BB   ; 
- D 0 - I - 0x02C44A 0B:843A: 84        .byte $84   ; 
- D 0 - I - 0x02C44B 0B:843B: CA        .byte $CA   ; 
- D 0 - I - 0x02C44C 0B:843C: 84        .byte $84   ; 
- D 0 - I - 0x02C44D 0B:843D: DF        .byte $DF   ; 
- D 0 - I - 0x02C44E 0B:843E: 84        .byte $84   ; 
- D 0 - I - 0x02C44F 0B:843F: F2        .byte $F2   ; 
- D 0 - I - 0x02C450 0B:8440: 84        .byte $84   ; 
- D 0 - I - 0x02C451 0B:8441: FD        .byte $FD   ; 
- D 0 - I - 0x02C452 0B:8442: 84        .byte $84   ; 
- D 0 - I - 0x02C453 0B:8443: 0C        .byte $0C   ; 
- D 0 - I - 0x02C454 0B:8444: 85        .byte $85   ; 
- D 0 - I - 0x02C455 0B:8445: 10        .byte $10   ; 
- D 0 - I - 0x02C456 0B:8446: 01        .byte $01   ; 
- D 0 - I - 0x02C457 0B:8447: 0C        .byte $0C   ; 
- D 0 - I - 0x02C458 0B:8448: 28        .byte $28   ; 
- D 0 - I - 0x02C459 0B:8449: 10        .byte $10   ; 
- D 0 - I - 0x02C45A 0B:844A: 29        .byte $29   ; 
- D 0 - I - 0x02C45B 0B:844B: 14        .byte $14   ; 
- D 0 - I - 0x02C45C 0B:844C: 2E        .byte $2E   ; 
- D 0 - I - 0x02C45D 0B:844D: 08        .byte $08   ; 
- D 0 - I - 0x02C45E 0B:844E: 02        .byte $02   ; 
- D 0 - I - 0x02C45F 0B:844F: 0C        .byte $0C   ; 
- D 0 - I - 0x02C460 0B:8450: 2A        .byte $2A   ; 
- D 0 - I - 0x02C461 0B:8451: 10        .byte $10   ; 
- D 0 - I - 0x02C462 0B:8452: 2B        .byte $2B   ; 
- D 0 - I - 0x02C463 0B:8453: 08        .byte $08   ; 
- D 0 - I - 0x02C464 0B:8454: 00        .byte $00   ; 
- D 0 - I - 0x02C465 0B:8455: 0C        .byte $0C   ; 
- D 0 - I - 0x02C466 0B:8456: 2C        .byte $2C   ; 
- D 0 - I - 0x02C467 0B:8457: 10        .byte $10   ; 
- D 0 - I - 0x02C468 0B:8458: 2D        .byte $2D   ; 
- D 0 - I - 0x02C469 0B:8459: 01        .byte $01   ; 
- D 0 - I - 0x02C46A 0B:845A: 10        .byte $10   ; 
- D 0 - I - 0x02C46B 0B:845B: 00        .byte $00   ; 
- D 0 - I - 0x02C46C 0B:845C: 0C        .byte $0C   ; 
- D 0 - I - 0x02C46D 0B:845D: 2F        .byte $2F   ; 
- D 0 - I - 0x02C46E 0B:845E: 10        .byte $10   ; 
- D 0 - I - 0x02C46F 0B:845F: 39        .byte $39   ; <9>
- D 0 - I - 0x02C470 0B:8460: 14        .byte $14   ; 
- D 0 - I - 0x02C471 0B:8461: 3C        .byte $3C   ; 
- D 0 - I - 0x02C472 0B:8462: 10        .byte $10   ; 
- D 0 - I - 0x02C473 0B:8463: 01        .byte $01   ; 
- D 0 - I - 0x02C474 0B:8464: 0C        .byte $0C   ; 
- D 0 - I - 0x02C475 0B:8465: 38        .byte $38   ; <8>
- D 0 - I - 0x02C476 0B:8466: 10        .byte $10   ; 
- D 0 - I - 0x02C477 0B:8467: 3B        .byte $3B   ; 
- D 0 - I - 0x02C478 0B:8468: 14        .byte $14   ; 
- D 0 - I - 0x02C479 0B:8469: 3E        .byte $3E   ; 
- D 0 - I - 0x02C47A 0B:846A: 08        .byte $08   ; 
- D 0 - I - 0x02C47B 0B:846B: 02        .byte $02   ; 
- D 0 - I - 0x02C47C 0B:846C: 0C        .byte $0C   ; 
- D 0 - I - 0x02C47D 0B:846D: 3A        .byte $3A   ; 
- D 0 - I - 0x02C47E 0B:846E: 10        .byte $10   ; 
- D 0 - I - 0x02C47F 0B:846F: 2B        .byte $2B   ; 
- D 0 - I - 0x02C480 0B:8470: 01        .byte $01   ; 
- D 0 - I - 0x02C481 0B:8471: 00        .byte $00   ; 
- D 0 - I - 0x02C482 0B:8472: 01        .byte $01   ; 
- D 0 - I - 0x02C483 0B:8473: 10        .byte $10   ; 
- D 0 - I - 0x02C484 0B:8474: 6A        .byte $6A   ; <j>
- D 0 - I - 0x02C485 0B:8475: 00        .byte $00   ; 
- D 0 - I - 0x02C486 0B:8476: 02        .byte $02   ; 
- D 0 - I - 0x02C487 0B:8477: 10        .byte $10   ; 
- D 0 - I - 0x02C488 0B:8478: 2B        .byte $2B   ; 
- D 0 - I - 0x02C489 0B:8479: 08        .byte $08   ; 
- D 0 - I - 0x02C48A 0B:847A: 00        .byte $00   ; 
- D 0 - I - 0x02C48B 0B:847B: 0C        .byte $0C   ; 
- D 0 - I - 0x02C48C 0B:847C: 2F        .byte $2F   ; 
- D 0 - I - 0x02C48D 0B:847D: 10        .byte $10   ; 
- D 0 - I - 0x02C48E 0B:847E: 68        .byte $68   ; <h>
- D 0 - I - 0x02C48F 0B:847F: 08        .byte $08   ; 
- D 0 - I - 0x02C490 0B:8480: 01        .byte $01   ; 
- D 0 - I - 0x02C491 0B:8481: 0C        .byte $0C   ; 
- D 0 - I - 0x02C492 0B:8482: 3F        .byte $3F   ; 
- D 0 - I - 0x02C493 0B:8483: 14        .byte $14   ; 
- D 0 - I - 0x02C494 0B:8484: 3D        .byte $3D   ; 
- D 0 - I - 0x02C495 0B:8485: 00        .byte $00   ; 
- D 0 - I - 0x02C496 0B:8486: 02        .byte $02   ; 
- D 0 - I - 0x02C497 0B:8487: 0C        .byte $0C   ; 
- D 0 - I - 0x02C498 0B:8488: 3A        .byte $3A   ; 
- D 0 - I - 0x02C499 0B:8489: 01        .byte $01   ; 
- D 0 - I - 0x02C49A 0B:848A: 10        .byte $10   ; 
- D 0 - I - 0x02C49B 0B:848B: 01        .byte $01   ; 
- D 0 - I - 0x02C49C 0B:848C: 0C        .byte $0C   ; 
- D 0 - I - 0x02C49D 0B:848D: 69        .byte $69   ; <i>
- D 0 - I - 0x02C49E 0B:848E: 10        .byte $10   ; 
- D 0 - I - 0x02C49F 0B:848F: 29        .byte $29   ; 
- D 0 - I - 0x02C4A0 0B:8490: 14        .byte $14   ; 
- D 0 - I - 0x02C4A1 0B:8491: 2E        .byte $2E   ; 
- D 0 - I - 0x02C4A2 0B:8492: 08        .byte $08   ; 
- D 0 - I - 0x02C4A3 0B:8493: 02        .byte $02   ; 
- D 0 - I - 0x02C4A4 0B:8494: 0C        .byte $0C   ; 
- D 0 - I - 0x02C4A5 0B:8495: 6B        .byte $6B   ; <k>
- D 0 - I - 0x02C4A6 0B:8496: 10        .byte $10   ; 
- D 0 - I - 0x02C4A7 0B:8497: 6E        .byte $6E   ; <n>
- D 0 - I - 0x02C4A8 0B:8498: 02        .byte $02   ; 
- D 0 - I - 0x02C4A9 0B:8499: 53        .byte $53   ; <S>
- D 0 - I - 0x02C4AA 0B:849A: 84        .byte $84   ; 
- D 0 - I - 0x02C4AB 0B:849B: 08        .byte $08   ; 
- D 0 - I - 0x02C4AC 0B:849C: 01        .byte $01   ; 
- D 0 - I - 0x02C4AD 0B:849D: 0C        .byte $0C   ; 
- D 0 - I - 0x02C4AE 0B:849E: 74        .byte $74   ; <t>
- D 0 - I - 0x02C4AF 0B:849F: 10        .byte $10   ; 
- D 0 - I - 0x02C4B0 0B:84A0: 75        .byte $75   ; <u>
- D 0 - I - 0x02C4B1 0B:84A1: 08        .byte $08   ; 
- D 0 - I - 0x02C4B2 0B:84A2: 02        .byte $02   ; 
- D 0 - I - 0x02C4B3 0B:84A3: 0C        .byte $0C   ; 