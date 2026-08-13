# -*- coding: utf-8 -*-
"""
_scene_resources.py — 找出每个场景的资源字符串表（数组），并定位引用它们的代码，
从而把"状态编号 → 真实场景"映射出来。
输出写入 _scene_resources_result.txt
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

# 1. 提取字符串
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
str_by_addr = {a: s for a, s in strings}

# 2. 收集每个资源字符串地址在镜像中作为 u32 出现的位置 → 形成"资源指针表"
from collections import defaultdict
str_refs = defaultdict(list)  # str_addr -> [lit_offs]
for off in range(0, SIZE - 3, 4):
    v = struct.unpack_from('<I', arm9, off)[0]
    if v in str_by_addr:
        str_refs[v].append(off)

p('被作为 u32 引用的字符串数: %d' % len(str_refs))

# 3. 找到"资源指针表"：连续 4 字节对齐位置上的多个字符串指针，且字符串前缀相同
#    按 lit_off 排序，找连续的段
all_lits = sorted((off, addr) for addr, offs in str_refs.items() for off in offs)
# 合并连续区间（间隔 <= 4）
groups = []
if all_lits:
    cur_g = [all_lits[0]]
    for prev, nxt in zip(all_lits, all_lits[1:]):
        if nxt[0] - prev[0] <= 4:
            cur_g.append(nxt)
        else:
            groups.append(cur_g)
            cur_g = [nxt]
    groups.append(cur_g)

p('\n=== 资源指针表（连续字符串指针段） ===')
interesting = 0
for g in groups:
    if len(g) < 2:
        continue
    base = g[0][0]
    strs = [str_by_addr.get(a, '?') for _, a in g]
    # 判断前缀
    prefix = os.path.commonprefix(strs) if len(strs) > 1 else ''
    p('表@0x%08X (%d个): 前缀 %r' % (RAM + base, len(g), prefix))
    for off, a in g[:8]:
        p('    0x%08X: %r' % (RAM + off, str_by_addr.get(a, '')))
    if len(g) > 8:
        p('    ... 共 %d 个' % len(g))
    interesting += 1
p('表总数: %d' % interesting)

# 4. 对每个表的基址，找到引用它的 ldr rX,[pc,#imm]（向前 0x100 字节）
#    以及引用表内任意元素地址的代码
target_bases = [g[0][0] for g in groups if len(g) >= 2]

def find_ldr_for_literal(lit_off):
    """在 lit_off 前 0x100 字节内找 ldr rX,[pc,#imm] 指向它"""
    found = []
    for off in range(max(0, lit_off - 0x100), lit_off):
        ins = struct.unpack_from('<I', arm9, off)[0]
        if (ins & 0x0F5F0000) == 0x051F0000:
            rd = (ins >> 12) & 0xF
            imm = ins & 0xFFF
            target = (RAM + off + 8 + imm) & ~3
            if target == RAM + lit_off:
                found.append((RAM + off, rd))
    return found

p('\n=== 引用资源表的指令 ===')
seen_caller = set()
for base_off in target_bases:
    callers = find_ldr_for_literal(base_off)
    for caller, rd in callers:
        if caller in seen_caller:
            continue
        seen_caller.add(caller)
        p('表@0x%08X <- ldr r%d @ 0x%08X' % (RAM + base_off, rd, caller))

# 5. 也用"表内元素地址"找引用（有些代码直接取表内某元素）
p('\n=== 引用表内元素(第一个元素)的指令 ===')
for g in groups:
    if len(g) < 2:
        continue
    base_off = g[0][0]
    callers = find_ldr_for_literal(base_off)
    if not callers:
        # 尝试表中前几个元素
        for off, a in g[:4]:
            callers = find_ldr_for_literal(off)
            for caller, rd in callers:
                if caller not in seen_caller:
                    seen_caller.add(caller)
                    p('元素0x%08X (%r) <- ldr r%d @ 0x%08X' % (
                        RAM + off, str_by_addr.get(a, '')[:30], rd, caller))
            if callers:
                break

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       '_scene_resources_result.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('done, lines=%d' % len(out))
