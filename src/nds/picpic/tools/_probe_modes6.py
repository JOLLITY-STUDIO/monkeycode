# -*- coding: utf-8 -*-
"""Probe 6: 确认 map/lap/fap 模式最终证据链
1. 0x31884 的调用链 -> 谁设置 mode 0/1/2
2. 0x204D31C 内部 -> 路径字符串如何被消费
3. 0x2055D9C -> completion 检查的 mode 特定逻辑
"""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SRC = r"d:\studio\github\monkeycode\src\nds\picpic\tools\arm9-full.dis.txt"
OUT = r"d:\studio\github\monkeycode\src\nds\picpic\tools\_mode_report6.txt"

lines = open(SRC, encoding='utf-8', errors='replace').read().splitlines()
out = []

def addr_of(line):
    m = re.match(r'0x0*([0-9a-fA-F]+)\s+', line)
    if not m:
        return None
    v = int(m.group(1), 16)
    return v & 0x0FFFFFFF  # 去掉 0x02 前缀一致性

def line_of_addr(addr):
    key = '0x0%X' % (addr & 0x0FFFFFFF)
    for i, l in enumerate(lines):
        if l.startswith(key + ' '):
            return i, l
    return None, None

# 1) 找 0x31884 附近的函数体（BL 0x34bac 的调用者）
t1 = '0x02031884'
i0, l0 = line_of_addr(0x31884)
if l0 is None:
    # 直接搜文本
    for i, l in enumerate(lines):
        if '0x0203188' in l:
            i0 = i
            break

out.append('=== 1. 0x31884 调用链（选关界面构造）===')
if i0 is not None:
    start = max(0, i0 - 60)
    end = min(len(lines), i0 + 80)
    for i in range(start, end):
        l = lines[i]
        if ('bl ' in l and '0x02' in l) or '0x34bac' in l.lower() or '0x34cf0' in l.lower():
            out.append(f'[{i}] {l}')
    out.append('...')
    # 打印函数范围头尾
    for i in range(i0, min(len(lines), i0 + 5)):
        out.append(f'[{i}] {lines[i]}')

# 2) 0x204D31C 内部
out.append('\n=== 2. 0x204D31C（路径字符串消费/加载入口）===')
i1, l1 = line_of_addr(0x4D31C)
if l1 is None:
    for i, l in enumerate(lines):
        if '0x0204d31c' in l.lower():
            i1 = i
            break
if i1 is not None:
    end = min(len(lines), i1 + 120)
    for i in range(i1, end):
        l = lines[i]
        if l.strip() == '' and i > i1 + 10:
            break
        if '0x0204' in l and ('bl ' in l or '0x02' in l):
            out.append(f'[{i}] {l}')

# 3) 0x2055D9C completion 检查
out.append('\n=== 3. 0x2055D9C（模式完成检查）===')
i2, l2 = line_of_addr(0x55D9C)
if l2 is None:
    for i, l in enumerate(lines):
        if '0x02055d9c' in l.lower() or '0x02055D9C' in l:
            i2 = i
            break
if i2 is not None:
    end = min(len(lines), i2 + 140)
    for i in range(i2, end):
        l = lines[i]
        if 'bl ' in l and '0x02' in l:
            out.append(f'[{i}] {l}')

# 4) 搜 "mode" 相关的 cmp r0,#1 / #2 在 GAME SETUP 附近的模式分支
out.append('\n=== 4. 模式相关 cmp #1/#2 分支（0x2055BC8 前后 400 行）===')
for i, l in enumerate(lines):
    if '0x02055bc8' in l.lower():
        start = max(0, i - 100)
        end = min(len(lines), i + 400)
        for j in range(start, end):
            ll = lines[j]
            if re.search(r'cmp\s+r\d+\s*,\s*#(0x1|1|0x2|2|0x0|0)\b', ll) and '0x02055' in ll:
                out.append(f'[{j}] {ll}')
        break

open(OUT, 'w', encoding='utf-8').write('\n'.join(out))
print(f'written {OUT}, {len(out)} lines')
