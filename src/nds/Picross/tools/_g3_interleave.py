# G3: 测试 Msg/*.dat 是否为交错文本（奇偶字节分离）
files = [
    "PicrossDS_messageList_FRE_JP_Easy.dat",
    "PicrossDS_messageList_FRE_JP_Normal.dat",
    "PicrossDS_messageList_SPA_JP_Normal.dat",
    "PicrossDS_messageList_SPA_JP_Easy.dat",
    "PicrossDS_messageList_ENG_JP_Normal.dat",
]
base = "d:/studio/github/monkeycode/src/nds/Picross/extracted/Msg/"
for fn in files:
    d = open(base + fn, "rb").read()
    even = bytes(d[0::2])
    odd = bytes(d[1::2])
    print(f"=== {fn} size={len(d)} ===")
    print(f"  even: {even[:80]!r}")
    print(f"  odd : {odd[:80]!r}")
    # 可读率
    def readable(b):
        if not b:
            return 0
        return sum(1 for x in b if 32 <= x < 127 or x in (9, 10, 13)) / len(b)
    print(f"  even 可读率 {readable(even):.2f}  odd 可读率 {readable(odd):.2f}")
    # 尝试每 2 字节取低字节/高字节
    lo = bytes(d[i] for i in range(0, len(d), 2))
    hi = bytes(d[i] for i in range(1, len(d), 2))
    print(f"  低位序列可读率 {readable(lo):.2f} {lo[:60]!r}")
    print(f"  高位序列可读率 {readable(hi):.2f} {hi[:60]!r}")
    print()
