#!/usr/bin/env python3
"""
extract_bank08_nt.py — 把 PRG bank-08 raw 字节流按 32 row × 17 byte/row 拆成 NT 屏。

bank-08 是 NT 流 (raw tile + marker, 不含 attribute) — 见 docs/BANK08_STREAM_DECODE.md §1.1。
每 row = 17 byte = 1 marker byte + 16 tile cell (两个半行 col 0-15).
每屏 = 32 row = 544 byte.
bank-08 总 4889 byte ≈ 9 屏.
"""
import re
import os
import json
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SRC = REPO / "rom-data" / "rom-data" / "prg-bank-08.ts"
OUT_TS = REPO / "rom-data" / "rom-data" / "bank08-nt-screens.ts"
OUT_JSON = REPO / "tools" / "_bank08_nt_screens.json"


def load_prg_bank08():
    src = SRC.read_text(encoding="utf-8")
    m = re.search(r"\[([\s\S]+?)\]", src)
    if not m:
        raise SystemExit("PRG_BANK_08 array not found")
    arr = re.findall(r"0x[0-9A-Fa-f]{2}", m.group(1))
    return bytes(int(s, 16) for s in arr)


def split_screens(data: bytes):
    """Yield screen dicts.

    Row stride = 17 bytes (marker + 16 col). 32 row = 544 bytes/screen.
    Row cells = 32 cells/row = 半行 16 + 半行 16
    这里把相邻两半拼成 32 cell row (col 0..31).
    """
    screens = []
    total = len(data)
    full = total // 544
    rem = total % 544
    if rem:
        print(f"[WARN] trailing {rem} bytes ignored (not full screen)")
    for s in range(full):
        base = s * 544
        markers = []
        cells = []
        for r in range(32):
            row_off = base + r * 17
            marker = data[row_off]
            half1 = list(data[row_off + 1 : row_off + 17])  # col 0-15
            next_off = base + (r + 1) * 17 if r < 31 else row_off
            half2 = list(data[next_off + 1 : next_off + 17])
            markers.append(marker)
            cells.append(half1 + half2)
        screens.append({
            "screen_id": s,
            "offset": base,
            "markers": markers,
            "cells": cells,
        })
    return screens


def marker_label(b: int) -> str:
    """Map raw marker byte → semantic label."""
    return {
        0xAA: "AA", 0xFF: "FF", 0xFA: "FA", 0x55: "55",
        0x0F: "0F", 0x8A: "8A", 0xC0: "C0", 0xA0: "A0",
        0xB0: "B0", 0xAF: "AF",
    }.get(b, f"0x{b:02x}")


def main():
    data = load_prg_bank08()
    print(f"[bank08] total bytes = {len(data)}")
    screens = split_screens(data)
    print(f"[bank08] full screens = {len(screens)}")
    # dump summary
    for s in screens:
        labels = [marker_label(m) for m in s["markers"]]
        from collections import Counter
        c = Counter(labels)
        print(f"  screen #{s['screen_id']:02d} off=0x{s['offset']:04x} markers={dict(c)}")
    # write JSON (for inspection)
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with OUT_JSON.open("w", encoding="utf-8") as f:
        json.dump(
            [{"screen_id": s["screen_id"], "offset": s["offset"],
              "markers": s["markers"], "cells": s["cells"]} for s in screens],
            f, ensure_ascii=False, indent=2)
    # build TS file
    lines = []
    lines.append("/**")
    lines.append(" * bank08-nt-screens — bank-08 raw NT 流按 32 row × 32 cell 拆屏.")
    lines.append(" *")
    lines.append(" * 行结构: marker(1) + col 0-15 半行(16) + col 16-31 半行(16) = 17 byte/row.")
    lines.append(" * 屏结构: 32 row × 17 byte = 544 byte.  4889 / 544 = 8 full screens (末尾截断).")
    lines.append(" *")
    lines.append(" * 字节语义 (commit 41f3ef04 注释已修正):")
    lines.append(" *   0x00/0x01 = 透明 tile (CHRAM 中已有定义, 跳过不绘制)")
    lines.append(" *   0x27      = TECMO logo 空白 tile")
    lines.append(" *   0xFB      = logo 灰色 tile")
    lines.append(" *   marker (row 起始字节):")
    lines.append(" *     0xAA = 块对齐 marker (高频)")
    lines.append(" *     0xFF = 屏切换 marker (数据流到屏边界)")
    lines.append(" *     0xFA/0x55/0x0F/0x8A = 段类型 marker (具体语义待 V0.7)")
    lines.append(" *")
    lines.append(" * 该数据为 raw NT tile 数据, 不含 attribute;")
    lines.append(" * PPU 写入方式见 PRG \\$8EF0-\\$8FD0 反汇编 (docs/BANK08_STREAM_DECODE.md §1.1).")
    lines.append(" *")
    lines.append(f" * 自动生成 — 严禁手改, 改完请重跑 scripts/extract_bank08_nt.py")
    lines.append(" */")
    lines.append("")
    lines.append("export interface Bank08Screen {")
    lines.append("  readonly screenId: number;     // 屏序 (0..7)")
    lines.append("  readonly offset: number;       // bank-08 起始字节")
    lines.append("  readonly rowMarkers: readonly string[]; // 32 长度, marker semantic 标签")
    lines.append("  readonly cells: readonly (readonly number[])[]; // 32×32 tile cell")
    lines.append("}")
    lines.append("")
    lines.append("const BANK08_NT_SCREENS: readonly Bank08Screen[] = [")
    for s in screens:
        lines.append("  {")
        lines.append(f"    screenId: {s['screen_id']},")
        lines.append(f"    offset: 0x{s['offset']:04x},")
        lines.append("    rowMarkers: [")
        # 8 markers per line
        for i in range(0, 32, 8):
            chunk = ", ".join(f'"{marker_label(m)}"' for m in s["markers"][i:i+8])
            lines.append(f"      {chunk},")
        lines.append("    ],")
        lines.append("    cells: [")
        for r, cells_row in enumerate(s["cells"]):
            parts = [f"0x{c:02x}" for c in cells_row]
            line = ", ".join(parts[:16])
            line2 = ", ".join(parts[16:])
            lines.append(f"      [{line},  // row {r}")
            lines.append(f"       {line2}],")
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export default BANK08_NT_SCREENS;")
    OUT_TS.parent.mkdir(parents=True, exist_ok=True)
    OUT_TS.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    print(f"[bank08] wrote {OUT_TS}")


if __name__ == "__main__":
    main()
