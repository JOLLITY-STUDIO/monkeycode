import struct, sys
from pathlib import Path
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom_path = Path(r'd:\studio\github\monkeycode\src\nds\picpic\roms\extracted\_system\arm9.bin')
arm9 = rom_path.read_bytes()
base = 0x02000000

keywords = [b'map_d/', b'lap_d/', b'fap_d/', b'map/', b'lap/', b'fap/',
            b'No_window_map', b'No_window_lap', b'No_window_fap',
            b'map_comp', b'lap_comp', b'fap_comp']
kw_addrs = {}
for kw in keywords:
    offs = []
    off = 0
    while True:
        idx = arm9.find(kw, off)
        if idx < 0:
            break
        offs.append(base + idx)
        off = idx + 1
    kw_addrs[kw] = offs

md = Cs(CS_ARCH_ARM, CS_MODE_ARM)

def disasm_range(addr_start, addr_end, label):
    rel_s = addr_start - base
    rel_e = addr_end - base
    code = arm9[rel_s:rel_e]
    lines = []
    lines.append(f'; === {label} 0x{addr_start:08X} - 0x{addr_end:08X} ===')
    for ins in md.disasm(code, addr_start):
        lines.append(f'0x{ins.address:08X}  {ins.mnemonic:<8} {ins.op_str}')
        if ins.mnemonic == 'ldr' and 'pc' in ins.op_str:
            try:
                off = int(ins.op_str.split('#')[1].split(']')[0], 16) + 8
                lit = (ins.address & ~3) + off
                lit_rel = lit - base
                if 0 <= lit_rel < len(arm9) - 3:
                    val = struct.unpack_from('<I', arm9, lit_rel)[0]
                    for kw, addrs in kw_addrs.items():
                        if val in addrs:
                            lines.append(f'  ; >>> LOADS "{kw.decode()}" @ 0x{val:08X}')
            except Exception:
                pass
        # 分支也标记
        if ins.mnemonic in ('b', 'bl', 'blx') and ins.op_str.startswith('#'):
            try:
                t = int(ins.op_str[1:], 16)
                lines.append(f'  ; >>> JUMP 0x{t:08X}')
            except Exception:
                pass
    return '\n'.join(lines)

out = []
for label, addr in [('MODE_INIT_A', 0x02053bf4), ('MODE_INIT_B', 0x0205418c),
                     ('GAME_SETUP', 0x02055bc8), ('MAIN_SCHEDULER', 0x0205113c)]:
    s = max(0, addr - base - 0x1000)
    e = min(len(arm9), addr - base + 0x2000)
    out.append(disasm_range(base + s, base + e, label))
    out.append('')

out_path = Path(r'd:\studio\github\monkeycode\src\nds\picpic\disasm\mode-init-analysis.txt')
out_path.write_text('\n'.join(out), encoding='utf-8')
print('written', out_path, len(out_path.read_text()))
