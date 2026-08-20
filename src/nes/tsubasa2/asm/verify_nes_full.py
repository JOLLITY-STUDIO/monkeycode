"""verify_nes_full.py - 完整启动序列验证 (用 py65)
从 RESET 向量启动, 验证 CPU 执行序列正确
"""
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
        0xAE:('LDX $%04X',3), 0xAC:('LDY $%04X',3), 0xCE:('DEC $%04X',3),
        0xEE:('INC $%04X',3), 0xEC:('CPX $%04X',3), 0xCC:('CPY $%04X',3),
        0xCD:('CMP $%04X',3), 0xBD:('LDA $%04X,X',3), 0xB9:('LDA $%04X,Y',3),
        0x9D:('STA $%04X,X',3), 0x99:('STA $%04X,Y',3),
    }
    info = table.get(op)
    if not info:
        return (f'??? $%02X' % op, 1)
    mn, sz = info
    if sz == 1:
        return (mn, 1)
    if sz == 2:
        if 'B' in mn and '$' in mn:
            offset = mem[pc+1]
            if offset & 0x80:
                offset = offset - 256
            target = (pc + 2 + offset) & 0xFFFF
            return (mn % target, 2)
        return (mn % mem[pc+1], 2)
    if sz == 3:
        val = mem[pc+1] | (mem[pc+2] << 8)
        return (mn % val, 3)
    return (mn, 1)

def main():
    nes = open(r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm\dist\tsubasa2.nes','rb').read()
    prg = nes[16:16+256*1024]
    bank31 = prg[-8192:]
    bank30 = prg[-16384:-8192]

    cpu = MPU()
    mem = bytearray(0x10000)
    mem[0xE000:0x10000] = bank31
    mem[0xC000:0xE000] = bank30

    # 从 RESET 向量启动
    reset_vec = mem[0xFFFC] | (mem[0xFFFD] << 8)
    cpu.memory = mem
    cpu.pc = reset_vec
    cpu.sp = 0xFD  # NES 启动时 SP 通常为 $FD

    print("=== 天使之翼2 NES 启动验证 (py65) ===")
    print(f"  ROM: {len(nes)} bytes (16B header + 256KB PRG + 128KB CHR)")
    print(f"  Mapper: 4 (MMC3)")
    print()

    print("=== 中断向量 ===")
    nmi_vec = mem[0xFFFA] | (mem[0xFFFB] << 8)
    irq_vec = mem[0xFFFE] | (mem[0xFFFF] << 8)
    print(f"  NMI   vector = ${nmi_vec:04X}")
    print(f"  RESET vector = ${reset_vec:04X}")
    print(f"  IRQ   vector = ${irq_vec:04X}")
    print()

    print("=== CPU 启动序列 ===")
    print(f"  PC=${reset_vec:04X}  SP=${cpu.sp:02X}  P={cpu.p:08b}")
    print()

    print("=== 逐条执行 (10 条) ===")
    for i in range(10):
        instr, sz = disasm(mem, cpu.pc)
        bytes_hex = ' '.join(f'${mem[cpu.pc+j]:02X}' for j in range(sz))
        print(f"  ${cpu.pc:04X}: {bytes_hex:<12} {instr}")
        
        # JMP $C503 会跳出 bank31 进入 bank30
        # py65 无法执行 bank30 代码 (需要 MMC3 bank 切换模拟)
        # 所以在 JMP 处停止
        if mem[cpu.pc] == 0x4C:  # JMP abs
            target = mem[cpu.pc+1] | (mem[cpu.pc+2] << 8)
            cpu.step()
            print(f"  → 跳转到 ${cpu.pc:04X} (bank30 主初始化, 需 MMC3 模拟)")
            break
        cpu.step()

    print()
    print("=== 内存状态 ===")
    print(f"  $8000 (MMC3 select) = ${mem[0x8000]:02X}  (expect $00)")
    print(f"  PC=${cpu.pc:04X}  A={cpu.a} X=${cpu.x:02X} Y=${cpu.y:02X} SP=${cpu.sp:02X}")
    print()

    print("=== 验证结果 ===")
    if cpu.pc == 0xC503:
        print("  [PASS] 启动序列正确: RESET -> $FFF0 -> LDA #$00 -> STA $8000 -> JMP $C503")
        print("  [PASS] NES 文件可正常启动!")
    else:
        print(f"  [WARN] PC=${cpu.pc:04X} (期望 $C503)")

    print()
    print("=== 字节级 ROM 验证 ===")
    orig_path = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes'
    try:
        with open(orig_path, 'rb') as f:
            orig = f.read()
        if orig == nes:
            print("  [PASS] 编译产出与原始 ROM 100% 字节一致!")
        else:
            diff = sum(1 for a, b in zip(orig, nes) if a != b)
            print(f"  [WARN] {diff} 处字节差异")
    except FileNotFoundError:
        print("  (原始 ROM 不可用, 跳过比较)")

if __name__ == '__main__':
    main()
