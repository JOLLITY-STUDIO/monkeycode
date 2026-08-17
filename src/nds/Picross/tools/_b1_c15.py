#!/usr/bin/env python3
"""B1: 重扫描——256B块全部值∈{0,2..15}（无≥0x10）即为解法候选，聚类并渲染"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_c15.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(P94, "rb").read()
N = len(data)
log(f"size={N:#x} ({N})")

BS = 256
# 合法值集合：0, 2-15
ok = bytes(1 if (b == 0 or 2 <= b <= 15) else 0 for b in range(256))
# 高值(>=0x10)标记
hi = bytes(1 if b >= 0x10 else 0 for b in range(256))
# 值1标记（非0非颜色，可疑）
v1 = bytes(1 if b == 1 else 0 for b in range(256))

cat = data.translate(ok)
hidata = data.translate(hi)
v1data = data.translate(v1)

n_blocks = N // BS
res = []  # (off, nonzero_cnt, has1)
for i in range(n_blocks):
    off = i * BS
    blk = cat[off:off+BS]
    if blk.count(1) != BS:
        continue  # 存在非法值
    hc = hidata[off:off+BS].count(1)
    if hc:
        continue
    v1c = v1data[off:off+BS].count(1)
    # 至少需要一些非零（否则全是0没意义）
    nz = blk.count(0)
    if nz < 240:  # 非零至少16个
        res.append((off, v1c))

log(f"候选块总数: {len(res)}")
# 聚类（间隔 <= 0x2000 算一组）
groups = []
for off, v1c in res:
    if groups and off - groups[-1][-1][0] <= 0x2000:
        groups[-1].append((off, v1c))
    else:
        groups.append([(off, v1c)])

log(f"连续组: {len(groups)}")
for g in groups:
    s = g[0][0]
    e = g[-1][0] + BS
    n = len(g)
    # 间距信息
    if n > 1:
        gaps = sorted({g[i+1][0]-g[i][0] for i in range(n-1)})
        gaps_s = ",".join(f"{x:#x}" for x in gaps[:6])
    else:
        gaps_s = "-"
    v1total = sum(v for _, v in g)
    log(f"  {s:#010x}-{e:#010x} 块数={n} 间距={gaps_s} v1字节数={v1total}")
log("OK")
out.close()
print("done")
