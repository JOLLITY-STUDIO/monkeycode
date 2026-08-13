# -*- coding: utf-8 -*-
"""
_state_graph.py — 扫描所有状态切换调用，绘制状态转换图
状态设置器: 0x2051adc (r0=新状态, 写 [base+0x28])
子状态设置: 0x2051afc (r0=新子状态, 写 [base+0x14])
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

SETTERS = {0x2051adc: 'STATE', 0x2051afc: 'SUBSTATE'}

# 扫描所有 BL 到 setter 的调用点，回溯找 mov r0, #imm
results = []  # (caller, setter_type, state)
for off in range(0, len(arm9) - 3, 4):
    ins = struct.unpack_from('<I', arm9, off)[0]
    # BL 编码: 1110101 imm24 (0xEB...)
    if (ins & 0xFF000000) == 0xEB000000:
        imm24 = ins & 0xFFFFFF
        if imm24 & 0x800000:
            imm24 -= 0x1000000
        target = RAM + off + 8 + (imm24 << 2)
        if target in SETTERS:
            # 回溯最多 8 条指令找 mov r0, #imm
            for back in range(1, 9):
                b = off - back * 4
                if b < 0:
                    break
                bi = struct.unpack_from('<I', arm9, b)[0]
                # mov r0, #imm: 0xE3A000XX
                if (bi & 0xFFFF0FFF) == 0xE3A00000:
                    imm = bi & 0xFF
                    results.append((RAM + off, SETTERS[target], imm, back))
                    break
                # mov r0, #imm (rotated): 0xE3A00402 etc 也可能
                if (bi & 0xFFF00000) == 0xE3A00000:
                    imm = bi & 0xFFF
                    rot = (bi >> 8) & 0xF
                    if rot:
                        imm = ((imm << (32 - rot * 2)) | (imm >> (rot * 2))) & 0xFFFFFFFF
                    results.append((RAM + off, SETTERS[target], imm, back))
                    break

print('状态切换调用点: %d' % len(results))
print('%s  %s  %s  %s' % ('调用地址', '类型', '状态', '回溯距离'))
seen = set()
for caller, typ, state, back in results:
    key = (caller, typ, state)
    if key in seen:
        continue
    seen.add(key)
    print('0x%08X  %-8s  0x%02X (%-3d)  back=%d' % (caller, typ, state, state, back))

# 聚合: 各状态被设置的次数
from collections import Counter
c = Counter(s for _, t, s, _ in results if t == 'STATE')
print('\nSTATE 设置统计:')
for s in sorted(c):
    print('  0x%02X (%d): %d 次' % (s, s, c[s]))
