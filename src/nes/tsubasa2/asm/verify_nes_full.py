"""verify_nes_full.py - 完整启动序列验证 (用 py65)"""
import sys
sys.path.insert(0, r'd:\dev\Python314\Lib\site-packages')

from py65.devices.mpu6502 import MPU

def disasm(mem, pc):
    """简化反汇编"""
    op = mem[pc]
    table = {
        0x78:('SEI',1), 0xD8:('CLD',1), 0xA2:('LDX #$%02X',2), 0x8E:('STX $%04X',3),
        0xA9:('LDA #$%02X',2), 0x8D:('STA $%04X',3), 0x4C:('JMP $%04X',3), 0x40:('RTI',1),
        0xEA:('NOP',1), 0xAD:('LDA $%04X',3), 0x2C:('BIT $%04X',3),
        0x10:('BPL $%04X',2), 0x30:('BMI $%04X',2), 0x50:('BVC $%04X',2),
        0x70:('BVS $%04X',2), 0x90:('BCC $%04X',2), 0xB0:('BCS $%04X',2),
        0xD0:('BNE $%04X',2), 0xF0:('BEQ $%04X',2),
        0xA0:('LDY #$%02X',2), 0x99:('STA $%04X,Y',3), 0x85:('STA $%02X',2),
        0xA5:('LDA $%02X',2), 0xE8:('INX',1), 0xC8:('INY',1),
        0xC9:('CMP #$%02X',2), 0xC6:('DEC $%02X',2), 0xE6:('INC $%02X',2),
        0x86:('STX $%02X',2), 0x84:('STY $%02X',2), 0x20:('JSR $%04X',3),
        0x60:('RTS',1), 0x48:('PHA',1), 0x68:('PLA',1), 0x08:('PHP',1), 0x28:('PLP',1),
        0x98:('TYA',1), 0x8A:('TXA',1), 0xAA:('TAX',1), 0xA8:('TAY',1),
        0xBA:('TSX',1), 0x9A:('TXS',1),
        0x4A:('LSR A',1), 0x0A:('ASL A',1), 0x29:('AND #$%02X',2),
    }
    info = table.get(op)
    if not info:
        return (f'??? $%02X' % op, 1)
    mn, sz = info
    if sz == 1:
        return (mn, 1)
    if sz == 2:
        if 'B' in mn:
            offset = mem[pc+1]
            if offset & 0x80:
                offset = offset - 256
            target = (pc + 2 + offset) & 0xFFFF
            return (mn % target, 2)
        return (mn % mem[pc+1], 2)
    if sz == 3:
        val = mem[pc+1] | (mem[pc+2] << 8)
        if 'Y' in mn:
            return (mn % val, 3)
        return (mn % val, 3)
    return (mn, 1)

def main():
    nes = open(r'd:\studio\github\monkeycode\src\nes\tsubasa2\dist\tsubasa2.nes','rb').read()
    prg = nes[16:16+256*1024]
    bank31 = prg[-8192:]
    bank30 = prg[-16384:-8192]

    cpu = MPU()
    mem = bytearray(0x10000)
    mem[0xE000:0x10000] = bank31
    mem[0xC000:0xE000] = bank30

    # 从 $E000 启动
    cpu.memory = mem
    cpu.pc = 0xE000

    print("=== Initial ===")
    print(f"  PC=$E000  SP=$FF  P=00110000 (I=1)")
    print()
    print("=== Step through 25 instructions ===")
    for i in range(25):
        instr, sz = disasm(mem, cpu.pc)
        bytes_hex = ' '.join(f'${mem[cpu.pc+j]:02X}' for j in range(sz))
        print(f"  ${cpu.pc:04X}: {bytes_hex:<10} {instr}")
        cpu.step()
        # 如果 PC 进入死循环或重复执行, 提前结束
        if cpu.pc == 0xE018 and i > 15:
            # 第2次进 VBlank wait, 模拟 PPU_STATUS bit7=1
            mem[0x2002] = 0x80
            print(f"  --- PPU_STATUS bit7=1 (VBlank) ---")

    print()
    print("=== After execution ===")
    print(f"  PC=${cpu.pc:04X}  A={cpu.a} X=${cpu.x:02X} Y=${cpu.y:02X} P={cpu.p:08b} SP=${cpu.sp:02X}")
    print()
    print("Key memory state:")
    print(f"  $4017 (APU_FRAME)  = ${mem[0x4017]:02X}  (expect $40)")
    print(f"  $2000 (PPU_CTRL)   = ${mem[0x2000]:02X}  (expect $00 init)")
    print(f"  $2001 (PPU_MASK)   = ${mem[0x2001]:02X}  (expect $00 init)")
    print(f"  $4010 (DMC_FREQ)   = ${mem[0x4010]:02X}  (expect $00)")
    print(f"  $0000..$07FF       = 全 0 (清零)")
    print(f"  $6000..$7FFF       = 全 0 (PRG RAM 清零)")
    print()
    print("Vectors:")
    print(f"  NMI   vector = $E0E7 (NMI_HANDLER)")
    print(f"  Reset vector = $E000 (RESET_HANDLER)")
    print(f"  IRQ   vector = $E133 (IRQ_HANDLER)")

if __name__ == '__main__':
    main()
