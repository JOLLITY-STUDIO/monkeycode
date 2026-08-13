# -*- coding: utf-8 -*-
"""
_scene_refs3.py — 全镜像扫描所有 ldr rX,[pc,#imm]，目标若是"场景表基址"则记录调用者。
同时记录所有指向 [0x02068000, 0x02092000) 字符串区域的 ldr（排除字符串表本身）。
输出写入 _scene_refs3_result.txt
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']
SIZE = len(arm9)
out = []
def p(s=''):
    out.append(str(s))

# 目标表基址集合
targets = {
    0x020680F4, 0x0206810C, 0x02068124, 0x0206813C, 0x02068154, 0x0206816C,
    0x02068184, 0x0206819C, 0x020681B4, 0x020681CC, 0x020681E4, 0x020681FC,
    0x02068214, 0x0206822C, 0x02068244, 0x0206825C, 0x02068274, 0x0206828C,
    0x020682A4, 0x020682BC, 0x020682D8, 0x0206839C, 0x020683B8, 0x020683D4,
    0x020683F0, 0x0206840C, 0x02068428, 0x02068B7C, 0x0206CC24, 0x0206CC3C,
    0x0206CC54, 0x0206CC70, 0x0206CC9C, 0x0206CDF0, 0x0206CE08, 0x0206CE20,
    0x0206CE50, 0x0206CE68, 0x0206CE80, 0x0206CE98, 0x0206CEB0, 0x0206DA0C,
    0x0206DA24, 0x0206DA54, 0x0206DA70, 0x0206DA9C, 0x0206DD58, 0x0206DD88,
    0x0206DE30, 0x0206DE48, 0x0206EB84, 0x0206ECA0, 0x0206ECB8, 0x0206ECD0,
    0x0206ECE8, 0x0206ED00, 0x0206ED90, 0x0206EDA8, 0x0206EDC0, 0x0206EDD8,
    0x0206EDF0, 0x0206EE08, 0x0206EE20, 0x0206EE38, 0x0206EE50, 0x0206EE68,
    0x0206EE80, 0x0206EE98, 0x0206EEB0, 0x0206EEC8, 0x0206EEE0, 0x0206F21C,
    0x0206F234, 0x0206F24C, 0x0206F264, 0x0206F370, 0x0206F4BC, 0x0206F4D4,
    0x0206F504, 0x0206F520, 0x0206F654,
    0x02084724, 0x0208E474,
    0x02034DE4, 0x020462F8, 0x0204E710, 0x02034B88,
}
tname = {0x02084724: 'map_d(404)', 0x0208E474: 'fap_d(405)',
         0x02034DE4: 'comp3', 0x020462F8: 'fap_comp', 0x0204E710: 'lap_comp',
         0x02034B88: 'map_comp'}

# 全镜像扫描 ldr
found = []  # (caller, target, rd)
for off in range(0, SIZE - 3, 4):
    ins = struct.unpack_from('<I', arm9, off)[0]
    if (ins & 0x0F5F0000) == 0x051F0000:
        rd = (ins >> 12) & 0xF
        imm = ins & 0xFFF
        target = (RAM + off + 8 + imm) & ~3
        if target in targets:
            found.append((RAM + off, target, rd))

p('=== 引用场景表基址的 ldr (%d) ===' % len(found))
for caller, t, rd in sorted(found):
    name = tname.get(t, hex(t))
    p('  0x%08X: ldr r%d -> 表[%s]' % (caller, rd, name))

# 也记录所有目标在字符串区 [0x0206C000, 0x02092000) 的 ldr，用于交叉核对
p('\n=== 引用字符串区(0x0206C000+)的 ldr 汇总 ===')
from collections import Counter
reg = Counter()
for off in range(0, SIZE - 3, 4):
    ins = struct.unpack_from('<I', arm9, off)[0]
    if (ins & 0x0F5F0000) == 0x051F0000:
        rd = (ins >> 12) & 0xF
        imm = ins & 0xFFF
        target = (RAM + off + 8 + imm) & ~3
        if 0x0206C000 <= target < 0x02092000:
            reg[target >> 8] += 1
for k in sorted(reg):
    p('  区段 0x%08X: %d 条 ldr' % (k << 8, reg[k]))

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       '_scene_refs3_result.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('done, lines=%d' % len(out))
