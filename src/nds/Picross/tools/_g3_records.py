# G3: 按 0x190(400B) 记录步长分析 Msg/*.dat 记录结构
import sys

MSG = r"d:/studio/github/monkeycode/src/nds/Picross/extracted/Msg"
FILE = "PicrossDS_messageList_ENG_JP_Easy.dat"
if len(sys.argv) > 1:
    FILE = sys.argv[1]
d = open(f"{MSG}/{FILE}", "rb").read()

# 函数: ldr r2,[pc,#0xc]; add r1,r0,#1; mov r0,#0x190; mla r0,r1,r0,r2; bx lr
# 基址常量在 0x14
base = int.from_bytes(d[0x14:0x18], "little")
REC = 0x190
print(f"=== {FILE} size={len(d)} base_const=0x{base:x} REC={REC} ===")
print(f"记录数估算: {(len(d)-0x18)//REC}")

# 逐条打印记录头 24 字节 + 前几条 ASCII 片段
count = (len(d) - 0x18) // REC
for i in range(min(count, 8)):
    off = 0x18 + i * REC
    rec = d[off:off + REC]
    head = rec[:24].hex()
    # 前 4 个 u32
    u32s = [int.from_bytes(rec[j:j+4], "little") for j in range(0, 24, 4)]
    # 前 2 个 u16
    u16s = [int.from_bytes(rec[j:j+2], "little") for j in range(0, 16, 2)]
    print(f"\nrec[{i}] off={off:#x} u16={[hex(x) for x in u16s]}")
    print(f"  u32={[hex(x) for x in u32s]}")
    print(f"  head24={head}")
    # 找记录内最长的 ASCII/UTF16 片段
    import re
    for m in list(re.finditer(rb"[\x20-\x7e]{3,}", rec))[:3]:
        print(f"  ascii@{m.start():#x}: {m.group().decode()!r}")
    for m in list(re.finditer(rb"(?:[\x20-\x7e]\x00){3,}", rec))[:3]:
        print(f"  utf16@{m.start():#x}: {m.group().decode('utf-16-le')!r}")

# 全文件 u16 值分布（前 16B 每 2 字节，统计 0-2 区域）
from collections import Counter
c = Counter()
for i in range(0x18, len(d) - 1, 2):
    c[int.from_bytes(d[i:i+2], "little")] += 1
print("\n=== u16 值 Top 20（0x18 起每 2B）===")
for v, n in c.most_common(20):
    print(f"  {v:#06x} x{n}  (0-0x7f: {chr(v) if 32 <= v < 127 else '.'})")
