# -*- coding: utf-8 -*-
"""
_scene_refs4.py — 扫描 Thumb 模式 ldr rX,[pc,#imm]，目标若为场景表基址则记录。
Thumb ldr: 01001 rrr imm8, target = (pc & ~3) + imm*4
输出写入 _scene_refs4_result.txt
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

# 目标：字符串区所有 u32 表基址（动态收集：值指向字符串的 4 字节对齐位置）
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
str_addr = set(a for a, s in strings)

# 表基址：所有 u32==字符串地址 的位置，且前面是 u32 数组连续段（取每段第一个）
from collections import defaultdict
lit_of = defaultdict(list)
for off in range(0, SIZE - 3, 4):
    v = struct.unpack_from('<I', arm9, off)[0]
    if v in str_addr:
        lit_of[v].append(off)
# 收集每个字符串地址的全部引用点
str_lits = {}
for a in lit_of:
    for off in lit_of[a]:
        str_lits[off] = a

# 表段起点：连续>=2个字符串指针的段
tables = set()
all_lits = sorted(str_lits.keys())
prev = None
run = 0
for off in all_lits:
    if prev is not None and off - prev <= 4:
        run += 1
        if run == 2:
            tables.add(off - 4)  # 段起点（前一个）
            tables.add(off)
    else:
        run = 1
    prev = off
# 去掉 start 可能在中间的情况，重扫一次更稳：
tables = set()
for i in range(len(all_lits)):
    if i + 1 < len(all_lits) and all_lits[i+1] - all_lits[i] <= 4:
        tables.add(all_lits[i])

p('字符串表段数: %d' % len(tables))

# Thumb ldr 扫描
thumb_targets = {}
for off in range(0, SIZE - 1, 2):
    hw = struct.unpack_from('<H', arm9, off)[0]
    if (hw & 0xF800) == 0x4800:  # ldr rd, [pc, #imm]
        rd = (hw >> 8) & 7
        imm = (hw & 0xFF) * 4
        # Thumb PC = (addr+4) & ~3
        pc_al = (RAM + off + 4) & ~3
        target = pc_al + imm
        if target in tables:
            thumb_targets[RAM + off] = target
        # 也记录目标在字符串区 [0x0206C000,0x02092000)
        elif 0x0206C000 <= target < 0x02092000:
            thumb_targets.setdefault(RAM + off, None)

p('Thumb ldr 引用表基址: %d' % sum(1 for t in thumb_targets.values() if t is not None))
p('\n=== Thumb ldr -> 表基址 ===')
for caller, t in sorted(thumb_targets.items()):
    if t is None:
        continue
    # 表内容
    names = []
    off = t - RAM
    for k in range(4):
        v = struct.unpack_from('<I', arm9, off + k*4)[0]
        if v in str_addr:
            names.append(str_addr[v])
        else:
            break
    p('  0x%08X: ldr r? [pc] -> 0x%08X : %r' % (caller, t, names[:3]))

# 引用字符串区的 Thumb ldr 汇总（按 0x1000 分区）
from collections import Counter
reg = Counter()
for off in range(0, SIZE - 1, 2):
    hw = struct.unpack_from('<H', arm9, off)[0]
    if (hw & 0xF800) == 0x4800:
        rd = (hw >> 8) & 7
        imm = (hw & 0xFF) * 4
        pc_al = (RAM + off + 4) & ~3
        target = pc_al + imm
        if 0x0206C000 <= target < 0x02092000:
            reg[target >> 12] += 1
p('\n=== 引用字符串区(0x0206C000+)的 Thumb ldr 分区汇总 ===')
for k in sorted(reg):
    p('  0x%08X: %d 条' % (k << 12, reg[k]))

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       '_scene_refs4_result.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('done, lines=%d' % len(out))
