import struct, sys
from pathlib import Path
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom_path = Path(r'd:\studio\github\monkeycode\src\nds\picpic\roms\extracted\_system\arm9.bin')
arm9 = rom_path.read_bytes()
base = 0x02000000

targets = [0x02081804, 0x02086F38, 0x0208B80C]  # map_d, lap_d, fap_d first refs
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)

for t in targets:
    print(f'=== References to 0x{t:08X} ===')
    for i in range(0, len(arm9)-3, 4):
        v = struct.unpack_from('<I', arm9, i)[0]
        if v == t:
            # 反汇编附近 0x100 字节找引用指令
            s = max(0, i - 0x80)
            e = min(len(arm9), i + 0x20)
            for ins in md.disasm(arm9[s:e], base + s):
                if ins.mnemonic == 'ldr' and 'pc' in ins.op_str:
                    # 计算字面量池地址
                    try:
                        off = int(ins.op_str.split('#')[1].split(']')[0], 16) + 8
                        lit = (ins.address & ~3) + off
                        lit_rel = lit - base
                        if lit_rel == i:
                            print(f'  0x{ins.address:08X}  {ins.mnemonic} {ins.op_str}')
                    except Exception:
                        pass
    print()
