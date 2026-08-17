# G3: 转储文件头部 / 单条记录 + 字节频率 + 简单变换可读率
# 用法: python tools/_g3_dump.py [文件名关键词] [rec_idx]
import sys
from collections import Counter

MSG = r"d:/studio/github/monkeycode/src/nds/Picross/extracted/Msg"
DEFAULTS = {
    "ENG_JP_Easy": "PicrossDS_messageList_ENG_JP_Easy.dat",
    "ENG_JP_Normal": "PicrossDS_messageList_ENG_JP_Normal.dat",
    "FRE_JP_Easy": "PicrossDS_messageList_FRE_JP_Easy.dat",
    "FRE_JP_Normal": "PicrossDS_messageList_FRE_JP_Normal.dat",
    "SPA_JP_Easy": "PicrossDS_messageList_SPA_JP_Easy.dat",
    "SPA_JP_Normal": "PicrossDS_messageList_SPA_JP_Normal.dat",
}
key = sys.argv[1] if len(sys.argv) > 1 else "ENG_JP_Easy"
fn = DEFAULTS.get(key, key)
REC_IDX = int(sys.argv[2]) if len(sys.argv) > 2 else 0

d = open(f"{MSG}/{fn}", "rb").read()
print(f"=== {fn} size={len(d):#x} ===")

# 头部 0x60 转储
print("--- 头部 ---")
for r in range(0, min(len(d), 0x60), 16):
    row = d[r:r + 16]
    asc = "".join(chr(x) if 32 <= x < 127 else "." for x in row)
    print(f"{r:04x}: {row.hex(' '):47s} {asc}")

REC = 0x190
# 记录区起点探测：文件内找 0x18 偏移处的 u32（即记录 0 起点前的代码段大小）
REC0 = 0x18 + REC
off = REC0 + REC_IDX * REC
if off < len(d):
    rec = d[off:off + REC]
    print(f"--- rec[{REC_IDX}] off={off:#x} ---")
    for r in range(0, len(rec), 16):
        row = rec[r:r + 16]
        asc = "".join(chr(x) if 32 <= x < 127 else "." for x in row)
        print(f"{r:03x}: {row.hex(' '):47s} {asc}")

    c = Counter(rec)
    print("\n=== 字节频率 Top 20 ===")
    for v, n in c.most_common(20):
        ch = chr(v) if 32 <= v < 127 else "."
        print(f"  {v:02x} '{ch}' x{n} ({n/len(rec)*100:.1f}%)")

    def readable(b):
        if not b:
            return 0
        return sum(1 for x in b if 32 <= x < 127 or x in (9, 10, 13)) / len(b)

    print("\n=== 简单变换可读率 ===")
    print(f"  原样      : {readable(rec):.2f}")
    print(f"  XOR 0x20  : {readable(bytes(x ^ 0x20 for x in rec)):.2f}")
    print(f"  XOR 0x40  : {readable(bytes(x ^ 0x40 for x in rec)):.2f}")
    print(f"  XOR 0x80  : {readable(bytes(x ^ 0x80 for x in rec)):.2f}")
    print(f"  奇偶分离  : {readable(bytes(rec[0::2])):.2f} / {readable(bytes(rec[1::2])):.2f}")
else:
    print(f"(文件过小，无 rec[{REC_IDX}])")
