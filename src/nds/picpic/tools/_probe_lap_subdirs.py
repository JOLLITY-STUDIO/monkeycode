# -*- coding: utf-8 -*-
"""核查 docs 中是否记录了 lap_d 的 1_dat~5_dat/tutorial 子目录结构"""
import glob, os

docs_root = r"d:\studio\github\monkeycode\src\nds\picpic\docs"
keys = ["1_dat", "2_dat", "3_dat", "4_dat", "5_dat", "tutorial", "子目录", "细分", "lap_d"]

out = []
for f in sorted(glob.glob(os.path.join(docs_root, "**", "*.md"), recursive=True)):
    rel = os.path.relpath(f, docs_root)
    try:
        lines = open(f, encoding="utf-8", errors="ignore").read().splitlines()
    except Exception as e:
        out.append(f"{rel}: READ ERROR {e}")
        continue
    hits = [(i + 1, l.strip()) for i, l in enumerate(lines) if any(k in l for k in keys)]
    if hits:
        out.append(f"=== {rel} ({len(hits)} hits)")
        for ln, txt in hits[:10]:
            out.append(f"  {ln}: {txt[:120]}")
    else:
        out.append(f"--- {rel}: no hit")

open(r"d:\studio\github\monkeycode\src\nds\picpic\tools\_probe_out4.txt", "w", encoding="utf-8").write("\n".join(out))
print("done")
