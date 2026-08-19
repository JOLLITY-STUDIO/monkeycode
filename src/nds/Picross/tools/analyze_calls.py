#!/usr/bin/env python3
"""从 arm9_decomp.asm 直接解析 BL 调用图。"""
import collections, re

LINES = open(r"_tmp_disasm_out/arm9_decomp.asm", encoding="utf-8").read().splitlines()
bl_re = re.compile(r"^\s*(0x[0-9a-f]+)\s+bl\s+#?(0x[0-9a-f]+)\s*$")
blx_re = re.compile(r"^\s*(0x[0-9a-f]+)\s+blx\s+(\S+)\s*$")

calls = collections.defaultdict(list)
blx = []
for l in LINES:
    m = bl_re.match(l)
    if m:
        src, tgt = int(m.group(1), 16), int(m.group(2), 16)
        calls[tgt].append(src)
        continue
    m = blx_re.match(l)
    if m:
        blx.append((int(m.group(1), 16), m.group(2)))

print(f"BL 目标数: {len(calls)}   BLX 数: {len(blx)}")

def region(t):
    if 0x2004000 <= t < 0x20db058:
        return "decomp"
    if 0x2000800 <= t < 0x2004000:
        return "plain"
    if 0x1ff8000 <= t < 0x1ff9000:
        return "pool1ff8"
    if 0x27e0000 <= t < 0x27e4000:
        return "ram27e"
    return "other"

c = collections.Counter(region(t) for t in calls)
print(f"region 分布: {dict(c)}")

print("\n== 调用次数 Top 50 ==")
for tgt, srcs in sorted(calls.items(), key=lambda kv: -len(kv[1]))[:50]:
    print(f"  BL {tgt:#10x} x{len(srcs):<4d} {region(tgt):<9s} <- {', '.join(f'{s:#x}' for s in srcs[:6])}")

print("\n== plain 区 (boot/明文) 被调用情况 ==")
for tgt, srcs in sorted(calls.items(), key=lambda kv: -len(kv[1])):
    if region(tgt) == "plain":
        print(f"  BL {tgt:#10x} x{len(srcs)} <- {', '.join(f'{s:#x}' for s in srcs[:8])}")

print("\n== pool0x1ff8 / ram27e 目标 ==")
for tgt, srcs in sorted(calls.items()):
    if region(tgt) in ("pool1ff8", "ram27e"):
        print(f"  BL {tgt:#10x} x{len(srcs)} {region(tgt)} <- {', '.join(f'{s:#x}' for s in srcs[:8])}")

print("\n== other 目标 ==")
for tgt, srcs in sorted(calls.items(), key=lambda kv: -len(kv[1])):
    if region(tgt) == "other":
        print(f"  BL {tgt:#10x} x{len(srcs)} <- {', '.join(f'{s:#x}' for s in srcs[:6])}")

print("\n== BLX 使用（按寄存器分组）==")
bxreg = collections.Counter()
for a, op in blx:
    r = op.split(",")[-1].strip()
    bxreg[r] += 1
print(f"  BLX 目标寄存器: {dict(bxreg)}")
