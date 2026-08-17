# G2: default_data_00.pmd 周期性/自相关分析
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/backup/default_data_00.pmd", "rb").read()
n = len(d)
print(f"size={n}")

# 1) 256 条记录假设: 记录长 R = (n - head)/256, head 0..4096
for head in range(0, 4096):
    rem = n - head
    if rem % 256 == 0:
        R = rem // 256
        if 32 <= R <= 200:
            print(f"head={head} R={R}  (256x{R}+{head}={n})")

# 2) 自相关：对若干候选周期，统计逐字节匹配率
print()
cands = sorted(set(r for h in range(0, 4096) if (n - h) % 256 == 0 for r in [(n - h) // 256]))
for R in cands[:20]:
    # 对比 d[0] 与 d[R] 起始的 200 字节块，找匹配率最高的偏移对齐
    best = (0, 0)
    for off in range(0, min(R, n - R - 200)):
        s = sum(1 for i in range(200) if d[off + i] == d[R + off + i])
        if s > best[0]:
            best = (s, off)
    print(f"R={R}: 块内匹配 {best[0]}/200 @off={best[1]:#x}")
