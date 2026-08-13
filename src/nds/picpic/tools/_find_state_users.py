# -*- coding: utf-8 -*-
"""找出所有引用状态机基址 0x020DEB70 的代码位置（状态切换器）"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']
BASE = 0x020DEB70

# ARM ldr rX, [pc, #imm] 或 ldr rX, [pc, imm] 模式：指令中有 imm12，目标 = (pc+8)+imm12
hits = []
for off in range(0, len(arm9) - 3, 4):
    ins = struct.unpack_from('<I', arm9, off)[0]
    # ldr rX, [pc, #imm12] 编码: cond 01 0 1 001 rX imm12 (0xE59F X imm)
    if (ins & 0x0F5F0000) == 0x051F0000:
        rn = (ins >> 16) & 0xF
        if rn == 15:  # pc
            rd = (ins >> 12) & 0xF
            imm = ins & 0xFFF
            lit = RAM + off + 8 + imm
            if 0 <= lit - RAM < len(arm9) - 3:
                v = struct.unpack_from('<I', arm9, lit - RAM)[0]
                if v == BASE:
                    hits.append((RAM + off, 'ldr r%d, [pc,#0x%X]' % (rd, imm)))

print('引用 0x020DEB70 的代码位置: %d' % len(hits))
for addr, s in hits:
    print('0x%08X  %s' % (addr, s))
