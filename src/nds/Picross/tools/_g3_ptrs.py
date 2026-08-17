# G3: 搜索文件内指向基址/加载地址的 u32 指针，验证消息表布局
files = {
    "ENG_JP_Easy": "PicrossDS_messageList_ENG_JP_Easy.dat",
    "ENG_JP_Normal": "PicrossDS_messageList_ENG_JP_Normal.dat",
    "FRE_JP_Easy": "PicrossDS_messageList_FRE_JP_Easy.dat",
    "FRE_JP_Normal": "PicrossDS_messageList_FRE_JP_Normal.dat",
    "SPA_JP_Normal": "PicrossDS_messageList_SPA_JP_Normal.dat",
}
base_dir = "d:/studio/github/monkeycode/src/nds/Picross/extracted/Msg/"

for name, fn in files.items():
    d = open(base_dir + fn, "rb").read()
    base = int.from_bytes(d[0x14:0x18], "little")
    load = base - 0x18  # 假设加载地址 = 基址 - 0x18
    # 统计文件内指向 [load, load+len] 的 u32 指针
    lo, hi = load, load + len(d)
    hits = []
    for i in range(0, len(d) - 3, 4):
        v = int.from_bytes(d[i:i + 4], "little")
        if lo <= v <= hi:
            hits.append((i, hex(v), hex(v - load)))
    print(f"=== {name} size={len(d)} base=0x{base:x} load?=0x{load:x} ===")
    print(f"  指向加载区指针 {len(hits)} 个:")
    for h in hits[:15]:
        print(f"    @{h[0]:#x}: {h[1]} (file off {h[2]})")
    # 每 400B 记录开头的 u32 是否形成等差数列（指向下一记录）
    if len(d) > 0x190:
        vals = []
        for i in range(0, min(len(d) - 0x190, 0x2000), 0x190):
            vals.append(int.from_bytes(d[i:i + 4], "little"))
        print(f"  前 8 条记录头 u32: {[hex(v) for v in vals[:8]]}")
