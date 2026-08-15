import struct, sys
from pathlib import Path
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom_path = Path(r'd:\studio\github\monkeycode\src\nds\picpic\roms\extracted\_system\arm9.bin')
arm9 = rom_path.read_bytes()
base = 0x02000000

keywords = [b'map_d/', b'lap_d/', b'fap_d/', b'map/', b'lap/', b'fap/',
            b'No_window_map', b'No_window_lap', b'No_window_fap',
            b'bg_map', b'map_parts', b'map_waku']

# 找到关键词在 arm9 中的位置（数据段）
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

# 提取函数并分析字面量池引用
def disasm_range(addr_start, addr_end, label):
    rel_s = addr_start - base
    rel_e = addr_end - base
    code = arm9[rel_s:rel_e]
    lines = []
    lines.append(f'; === {label} 0x{addr_start:08X} - 0x{addr_end:08X} ===')
    literals = {}
    for ins in md.disasm(code, addr_start):
        lines.append(f'0x{ins.address:08X}  {ins.mnemonic:<8} {ins.op_str}')
        # ldr rx, [pc, #off]
        if ins.mnemonic == 'ldr' and 'pc' in ins.op_str:
            try:
                off = int(ins.op_str.split('#')[1].split(']')[0], 16) + 8
                lit = (ins.address & ~3) + off
                lit_rel = lit - base
                if 0 <= lit_rel < len(arm9) - 3:
                    val = struct.unpack_from('<I', arm9, lit_rel)[0]
                    literals[lit] = val
                    # 检查是否指向关键词
                    for kw, addrs in kw_addrs.items():
                        if val in addrs:
                            lines.append(f'  ; >>> LOADS "{kw.decode()}" @ 0x{val:08X}')
            except Exception:
                pass
    return '\n'.join(lines)

# 从 arm9-functions.tsv 读取函数范围
funcs = []
for line in open(r'd:\studio\github\monkeycode\src\nds\picpic\disasm\arm9-functions.tsv').readlines()[1:]:
    parts = line.strip().split('\t')
    if len(parts) >= 4:
        funcs.append((int(parts[0], 16), int(parts[1], 16), int(parts[2], 10), int(parts[3], 10)))

def find_func(addr):
    for s, e, sz, refs in funcs:
        if s <= addr < e:
            return (s, e, sz, refs)
    # fallback: 取 ±0x2000
    s = max(0, addr - base - 0x1000)
    e = min(len(arm9), addr - base + 0x2000)
    return (base + s, base + e, e - s, 0)

out = []
for label, addr in [('MODE_INIT_A', 0x02053bf4), ('MODE_INIT_B', 0x0205418c),
                     ('GAME_SETUP', 0x02055bc8), ('MAIN_SCHEDULER', 0x0205113c)]:
    s, e, sz, refs = find_func(addr)
    out.append(disasm_range(s, e, label))
    out.append('')

out_path = Path(r'd:\studio\github\monkeycode\src\nds\picpic\disasm\mode-init-analysis.txt')
out_path.write_text('\n'.join(out), encoding='utf-8')
print('written', out_path, len(out_path.read_text()))
