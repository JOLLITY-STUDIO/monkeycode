"""verify_nes.py - 用 py65 验证 NES 文件能启动"""
import sys
sys.path.insert(0, r'd:\dev\Python314\Lib\site-packages')

from py65.devices.mpu6502 import MPU

# 6502 反汇编表 (简化, 仅本次需要的指令)
MNEMONIC = {
    0x78:'SEI', 0xD8:'CLD', 0xA2:'LDX #$%02X', 0x8E:'STX $%04X',
    0xA9:'LDA #$%02X', 0x8D:'STA $%04X', 0x4C:'JMP $%04X', 0x40:'RTI',
    0xEA:'NOP', 0xAD:'LDA $%04X', 0xA0:'LDY #$%02X', 0x99:'STA $%04X,Y',
}

def disasm(mem, pc):
    op = mem[pc]
    mn = MNEMONIC.get(op, '???')
    if '%04X' in mn and 'Y' not in mn:
        lo = mem[pc+1]; hi = mem[pc+2]
        if '$%02X' in mn:
            return mn % lo, 3, (lo, (hi<<8)|lo)
        return mn % ((hi<<8)|lo), 3, ((hi<<8)|lo,)
    if '$%02X' in mn:
        return mn % mem[pc+1], 2, (mem[pc+1],)
    return mn, 1, ()

def main():
    nes = open(r'd:\studio\github\monkeycode\src\nes\tsubasa2\dist\tsubasa2.nes','rb').read()
    prg = nes[16:16+256*1024]
    bank31 = prg[-8192:]
    bank30 = prg[-16384:-8192]

    cpu = MPU()
    mem = bytearray(0x10000)
    mem[0xE000:0x10000] = bank31
    mem[0xC000:0xE000] = bank30
    mem[0xFFFC] = 0x00
    mem[0xFFFD] = 0xE0

    cpu.memory = mem
    cpu.pc = 0xE000

    print("=== Initial CPU state ===")
    print(f"PC=${cpu.pc:04X}  A={cpu.a} X={cpu.x} Y={cpu.y} P={cpu.p:08b} SP=${cpu.sp:02X}")
    print()
    print("=== Disasm first 14 instructions ===")
    for i in range(14):
        mn, sz, args = disasm(mem, cpu.pc)
        print(f"${cpu.pc:04X}: ${mem[cpu.pc]:02X} ${mem[cpu.pc+1]:02X} ${mem[cpu.pc+2]:02X}  {mn}")
        cpu.step()

    print()
    print(f"=== After 14 steps ===")
    print(f"PC=${cpu.pc:04X}  A={cpu.a} X={cpu.x} Y={cpu.y} P={cpu.p:08b}")
    print(f"Mem[$4017]={mem[0x4017]:02X} (should be $40 = APU frame IRQ disabled)")
    print(f"Mem[$2000]={mem[0x2000]:02X} (PPU_CTRL, should be 0)")
    print(f"Mem[$2001]={mem[0x2001]:02X} (PPU_MASK, should be 0)")
    print(f"Mem[$4010]={mem[0x4010]:02X} (APU_DMC_FREQ, should be 0)")
    if cpu.pc in (0xE012, 0xE013):
        print("OK: CPU reached infinite loop (waiting for NMI)")
    else:
        print(f"Note: PC=${cpu.pc:04X} (not at $E012 loop yet)")

if __name__ == '__main__':
    main()
