#!/usr/bin/env python3
"""反汇编 8KB[2] 的 $A000 窗口视图：CPU $A4C0-$A800 场景入口代码"""
import sys
sys.path.insert(0, 'scripts')
rom = open('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes', 'rb').read()
prg = rom[16:16 + 0x40000]
BASE = 0x4000

def dis(a_start, a_end):
    i = BASE + (a_start - 0xA000)
    end = BASE + (a_end - 0xA000)
    out = []
    while i < end:
        addr = a_start + (i - BASE)
        b = prg[i]
        if b == 0x00:
            out.append(f'{addr:04X}: BRK'); i += 1
        elif b == 0x01:
            out.append(f'{addr:04X}: ORA (zp,X)'); i += 1
        elif b == 0x04:
            out.append(f'{addr:04X}: NOP zp'); i += 2
        elif b == 0x05:
            out.append(f'{addr:04X}: ORA zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x06:
            out.append(f'{addr:04X}: ASL zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x08:
            out.append(f'{addr:04X}: PHP'); i += 1
        elif b == 0x09:
            out.append(f'{addr:04X}: ORA #${prg[i+1]:02X}'); i += 2
        elif b == 0x0A:
            out.append(f'{addr:04X}: ASL'); i += 1
        elif b == 0x0C:
            out.append(f'{addr:04X}: NOP abs'); i += 3
        elif b == 0x0D:
            out.append(f'{addr:04X}: ORA ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x0E:
            out.append(f'{addr:04X}: ASL ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x10:
            rel = prg[i+1] if prg[i+1] < 0x80 else prg[i+1] - 0x100
            out.append(f'{addr:04X}: BPL ${addr + 2 + rel:04X}'); i += 2
        elif b == 0x11:
            out.append(f'{addr:04X}: ORA (zp),Y'); i += 2
        elif b == 0x15:
            out.append(f'{addr:04X}: ORA zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0x18:
            out.append(f'{addr:04X}: CLC'); i += 1
        elif b == 0x19:
            out.append(f'{addr:04X}: ORA ${prg[i+1]:02X}{prg[i+2]:02X},Y'); i += 3
        elif b == 0x1D:
            out.append(f'{addr:04X}: ORA ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        elif b == 0x1E:
            out.append(f'{addr:04X}: ASL ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        elif b == 0x20:
            t = prg[i+1] | (prg[i+2] << 8)
            out.append(f'{addr:04X}: JSR ${t:04X}'); i += 3
        elif b == 0x21:
            out.append(f'{addr:04X}: AND (zp,X)'); i += 2
        elif b == 0x24:
            out.append(f'{addr:04X}: BIT zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x25:
            out.append(f'{addr:04X}: AND zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x29:
            out.append(f'{addr:04X}: AND #${prg[i+1]:02X}'); i += 2
        elif b == 0x2A:
            out.append(f'{addr:04X}: ROL'); i += 1
        elif b == 0x2C:
            out.append(f'{addr:04X}: BIT ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x2D:
            out.append(f'{addr:04X}: AND ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x2E:
            out.append(f'{addr:04X}: ROL ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x30:
            rel = prg[i+1] if prg[i+1] < 0x80 else prg[i+1] - 0x100
            out.append(f'{addr:04X}: BMI ${addr + 2 + rel:04X}'); i += 2
        elif b == 0x31:
            out.append(f'{addr:04X}: AND (zp),Y'); i += 2
        elif b == 0x35:
            out.append(f'{addr:04X}: AND zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0x38:
            out.append(f'{addr:04X}: SEC'); i += 1
        elif b == 0x39:
            out.append(f'{addr:04X}: AND ${prg[i+1]:02X}{prg[i+2]:02X},Y'); i += 3
        elif b == 0x3D:
            out.append(f'{addr:04X}: AND ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        elif b == 0x40:
            out.append(f'{addr:04X}: RTI'); i += 1
        elif b == 0x41:
            out.append(f'{addr:04X}: EOR (zp,X)'); i += 2
        elif b == 0x45:
            out.append(f'{addr:04X}: EOR zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x48:
            out.append(f'{addr:04X}: PHA'); i += 1
        elif b == 0x49:
            out.append(f'{addr:04X}: EOR #${prg[i+1]:02X}'); i += 2
        elif b == 0x4A:
            out.append(f'{addr:04X}: LSR'); i += 1
        elif b == 0x4C:
            t = prg[i+1] | (prg[i+2] << 8)
            out.append(f'{addr:04X}: JMP ${t:04X}'); i += 3
        elif b == 0x4D:
            out.append(f'{addr:04X}: EOR ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x55:
            out.append(f'{addr:04X}: EOR zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0x58:
            out.append(f'{addr:04X}: CLI'); i += 1
        elif b == 0x5D:
            out.append(f'{addr:04X}: EOR ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        elif b == 0x60:
            out.append(f'{addr:04X}: RTS'); i += 1
        elif b == 0x61:
            out.append(f'{addr:04X}: ADC (zp,X)'); i += 2
        elif b == 0x65:
            out.append(f'{addr:04X}: ADC zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x66:
            out.append(f'{addr:04X}: ROR zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x68:
            out.append(f'{addr:04X}: PLA'); i += 1
        elif b == 0x69:
            out.append(f'{addr:04X}: ADC #${prg[i+1]:02X}'); i += 2
        elif b == 0x6A:
            out.append(f'{addr:04X}: ROR'); i += 1
        elif b == 0x6C:
            out.append(f'{addr:04X}: JMP (${prg[i+1]:02X}{prg[i+2]:02X})'); i += 3
        elif b == 0x6D:
            out.append(f'{addr:04X}: ADC ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x70:
            rel = prg[i+1] if prg[i+1] < 0x80 else prg[i+1] - 0x100
            out.append(f'{addr:04X}: BVS ${addr + 2 + rel:04X}'); i += 2
        elif b == 0x75:
            out.append(f'{addr:04X}: ADC zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0x78:
            out.append(f'{addr:04X}: SEI'); i += 1
        elif b == 0x79:
            out.append(f'{addr:04X}: ADC ${prg[i+1]:02X}{prg[i+2]:02X},Y'); i += 3
        elif b == 0x7D:
            out.append(f'{addr:04X}: ADC ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        elif b == 0x80:
            out.append(f'{addr:04X}: NOP #${prg[i+1]:02X}'); i += 2
        elif b == 0x81:
            out.append(f'{addr:04X}: STA (zp,X)'); i += 2
        elif b == 0x84:
            out.append(f'{addr:04X}: STY zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x85:
            out.append(f'{addr:04X}: STA zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x86:
            out.append(f'{addr:04X}: STX zp ${prg[i+1]:02X}'); i += 2
        elif b == 0x88:
            out.append(f'{addr:04X}: DEY'); i += 1
        elif b == 0x89:
            out.append(f'{addr:04X}: NOP #${prg[i+1]:02X}'); i += 2
        elif b == 0x8A:
            out.append(f'{addr:04X}: TXA'); i += 1
        elif b == 0x8C:
            out.append(f'{addr:04X}: STY ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x8D:
            out.append(f'{addr:04X}: STA ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x8E:
            out.append(f'{addr:04X}: STX ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0x90:
            rel = prg[i+1] if prg[i+1] < 0x80 else prg[i+1] - 0x100
            out.append(f'{addr:04X}: BCC ${addr + 2 + rel:04X}'); i += 2
        elif b == 0x91:
            out.append(f'{addr:04X}: STA (zp),Y'); i += 2
        elif b == 0x94:
            out.append(f'{addr:04X}: STY zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0x95:
            out.append(f'{addr:04X}: STA zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0x96:
            out.append(f'{addr:04X}: STX zp,Y ${prg[i+1]:02X}'); i += 2
        elif b == 0x98:
            out.append(f'{addr:04X}: TYA'); i += 1
        elif b == 0x99:
            out.append(f'{addr:04X}: STA ${prg[i+1]:02X}{prg[i+2]:02X},Y'); i += 3
        elif b == 0x9A:
            out.append(f'{addr:04X}: TXS'); i += 1
        elif b == 0x9D:
            out.append(f'{addr:04X}: STA ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        elif b == 0xA0:
            out.append(f'{addr:04X}: LDY #${prg[i+1]:02X}'); i += 2
        elif b == 0xA1:
            out.append(f'{addr:04X}: LDA (zp,X)'); i += 2
        elif b == 0xA2:
            out.append(f'{addr:04X}: LDX #${prg[i+1]:02X}'); i += 2
        elif b == 0xA4:
            out.append(f'{addr:04X}: LDY zp ${prg[i+1]:02X}'); i += 2
        elif b == 0xA5:
            out.append(f'{addr:04X}: LDA zp ${prg[i+1]:02X}'); i += 2
        elif b == 0xA6:
            out.append(f'{addr:04X}: LDX zp ${prg[i+1]:02X}'); i += 2
        elif b == 0xA8:
            out.append(f'{addr:04X}: TAY'); i += 1
        elif b == 0xA9:
            out.append(f'{addr:04X}: LDA #${prg[i+1]:02X}'); i += 2
        elif b == 0xAA:
            out.append(f'{addr:04X}: TAX'); i += 1
        elif b == 0xAC:
            out.append(f'{addr:04X}: LDY ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0xAD:
            out.append(f'{addr:04X}: LDA ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0xAE:
            out.append(f'{addr:04X}: LDX ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0xB0:
            rel = prg[i+1] if prg[i+1] < 0x80 else prg[i+1] - 0x100
            out.append(f'{addr:04X}: BCS ${addr + 2 + rel:04X}'); i += 2
        elif b == 0xB1:
            out.append(f'{addr:04X}: LDA (zp),Y'); i += 2
        elif b == 0xB5:
            out.append(f'{addr:04X}: LDA zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0xB9:
            out.append(f'{addr:04X}: LDA ${prg[i+1]:02X}{prg[i+2]:02X},Y'); i += 3
        elif b == 0xBD:
            out.append(f'{addr:04X}: LDA ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        elif b == 0xC0:
            out.append(f'{addr:04X}: CPY #${prg[i+1]:02X}'); i += 2
        elif b == 0xC1:
            out.append(f'{addr:04X}: CMP (zp,X)'); i += 2
        elif b == 0xC4:
            out.append(f'{addr:04X}: CPY zp ${prg[i+1]:02X}'); i += 2
        elif b == 0xC5:
            out.append(f'{addr:04X}: CMP zp ${prg[i+1]:02X}'); i += 2
        elif b == 0xC6:
            out.append(f'{addr:04X}: DEC zp ${prg[i+1]:02X}'); i += 2
        elif b == 0xC8:
            out.append(f'{addr:04X}: INY'); i += 1
        elif b == 0xC9:
            out.append(f'{addr:04X}: CMP #${prg[i+1]:02X}'); i += 2
        elif b == 0xCA:
            out.append(f'{addr:04X}: DEX'); i += 1
        elif b == 0xCC:
            out.append(f'{addr:04X}: CPY ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0xCD:
            out.append(f'{addr:04X}: CMP ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0xD0:
            rel = prg[i+1] if prg[i+1] < 0x80 else prg[i+1] - 0x100
            out.append(f'{addr:04X}: BNE ${addr + 2 + rel:04X}'); i += 2
        elif b == 0xD1:
            out.append(f'{addr:04X}: CMP (zp),Y'); i += 2
        elif b == 0xD5:
            out.append(f'{addr:04X}: CMP zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0xD9:
            out.append(f'{addr:04X}: CMP ${prg[i+1]:02X}{prg[i+2]:02X},Y'); i += 3
        elif b == 0xDD:
            out.append(f'{addr:04X}: CMP ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        elif b == 0xE0:
            out.append(f'{addr:04X}: CPX #${prg[i+1]:02X}'); i += 2
        elif b == 0xE1:
            out.append(f'{addr:04X}: SBC (zp,X)'); i += 2
        elif b == 0xE5:
            out.append(f'{addr:04X}: SBC zp ${prg[i+1]:02X}'); i += 2
        elif b == 0xE6:
            out.append(f'{addr:04X}: INC zp ${prg[i+1]:02X}'); i += 2
        elif b == 0xE8:
            out.append(f'{addr:04X}: INX'); i += 1
        elif b == 0xE9:
            out.append(f'{addr:04X}: SBC #${prg[i+1]:02X}'); i += 2
        elif b == 0xEA:
            out.append(f'{addr:04X}: NOP'); i += 1
        elif b == 0xED:
            out.append(f'{addr:04X}: SBC ${prg[i+1]:02X}{prg[i+2]:02X}'); i += 3
        elif b == 0xF0:
            rel = prg[i+1] if prg[i+1] < 0x80 else prg[i+1] - 0x100
            out.append(f'{addr:04X}: BEQ ${addr + 2 + rel:04X}'); i += 2
        elif b == 0xF1:
            out.append(f'{addr:04X}: SBC (zp),Y'); i += 2
        elif b == 0xF5:
            out.append(f'{addr:04X}: SBC zp,X ${prg[i+1]:02X}'); i += 2
        elif b == 0xF8:
            out.append(f'{addr:04X}: SED'); i += 1
        elif b == 0xF9:
            out.append(f'{addr:04X}: SBC ${prg[i+1]:02X}{prg[i+2]:02X},Y'); i += 3
        elif b == 0xFD:
            out.append(f'{addr:04X}: SBC ${prg[i+1]:02X}{prg[i+2]:02X},X'); i += 3
        else:
            out.append(f'{addr:04X}: .byte ${b:02X}')
            i += 1
    return out

# 场景 0-3 区域 $A4C0-$A5C0
for line in dis(0xA4C0, 0xA5C0):
    print(line)
