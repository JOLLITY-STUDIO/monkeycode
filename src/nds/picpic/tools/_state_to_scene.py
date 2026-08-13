# -*- coding: utf-8 -*-
"""
_state_to_scene.py — 查找引用资源路径字符串的代码，映射状态→场景
在 ARM9 中找 'title/', 'select/', 'option/', 'map_d', 'fap_d', 'main/' 等字符串，
然后找引用这些字符串的 ldr rX,[pc,#imm] / adr 指令，判断属于哪个函数/状态。
输出写入 _state_to_scene_result.txt
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
RAM = h['arm9_ram']
SIZE = len(arm9)
out = []

def p(s=''):
    out.append(str(s))

# 1. 提取 ARM9 中所有 ASCII 字符串
strings = []
cur = None
for i, b in enumerate(arm9):
    if 32 <= b < 127:
        if cur is None:
            cur = i
    else:
        if cur is not None:
            ln = i - cur
            if 4 <= ln <= 60:
                strings.append((RAM + cur, arm9[cur:i].decode('ascii', 'replace')))
            cur = None

# 2. 收集所有 (字符串RAM地址 -> 字符串) 的字典
str_by_addr = {a: s for a, s in strings}

# 3. 一次性扫描全镜像中所有 u32，找出等于"字符串地址"的字面量
#    并记录其所属函数（通过已生成的反汇编函数表推断）
lit_targets = {}
for off in range(0, SIZE - 3, 4):
    v = struct.unpack_from('<I', arm9, off)[0]
    if v in str_by_addr:
        lit_targets.setdefault(off, v)

p('字符串总数: %d, 字面量池引用字符串数: %d' % (len(strings), len(lit_targets)))

# 4. 对每个字面量，向前搜索 ldr rX,[pc,#imm] 指令（0x80 字节范围）
target_kw = ['title', 'select', 'option', 'map_d', 'fap_d', 'lap_d', 'main/',
             'tutorial', 'taiken', 'otamesi', 'f_make', 'clear', 'kakuninn',
             'comp', '.map', '.fap', '.lap', 'data/', 'bg/', 'chr', 'pal', 'tex']
seen = set()
refs = []
for lit_off, str_addr in sorted(lit_targets.items()):
    s = str_by_addr[str_addr]
    if not any(t in s.lower() for t in target_kw):
        continue
    lit_addr = RAM + lit_off
    # 向前 0x80 字节找 ldr rX,[pc,#imm]
    found = False
    for off in range(max(0, lit_off - 0x80), lit_off):
        ins = struct.unpack_from('<I', arm9, off)[0]
        if (ins & 0x0F5F0000) == 0x051F0000:  # ldr rX,[pc,#imm]
            rd = (ins >> 12) & 0xF
            imm = ins & 0xFFF
            target = (RAM + off + 8 + imm) & ~3
            if target == lit_addr:
                caller = RAM + off
                if caller not in seen:
                    seen.add(caller)
                    refs.append((caller, rd, imm, s))
                    found = True
                break
    if not found:
        # 也可能是 adr 指令或直接 ldr [rX] 池
        pass

p('\n=== 引用目标字符串的指令 (%d) ===' % len(refs))
for caller, rd, imm, s in sorted(refs):
    p('  0x%08X: ldr r%d,[pc,#0x%X] -> %r' % (caller, rd, imm, s))

# 5. 输出全部与资源相关的字符串（可能被间接引用）
p('\n=== 相关字符串全清单 (含 map/fap/lap/comp/title/select 等) ===')
for addr, s in strings:
    if any(t in s.lower() for t in ['map_d', 'fap_d', 'lap_d', 'title', 'select/',
                                    'option', 'tutorial', 'taiken', 'otamesi',
                                    'f_make', 'clear', 'kakuninn', 'comp', 'profile']):
        p('  0x%08X: %r' % (addr, s))

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       '_state_to_scene_result.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('done, lines=%d' % len(out))
