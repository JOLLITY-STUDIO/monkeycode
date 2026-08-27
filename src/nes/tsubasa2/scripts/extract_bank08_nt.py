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
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SRC = REPO / "rom-data" / "rom-data" / "prg-bank-08.ts"
OUT_TS = REPO / "rom-data" / "rom-data" / "bank08-nt-screens.ts"


def load_prg_bank08():
    src = SRC.read_text(encoding="utf-8")
    m = re.search(r"\[([\s\S]+?)\]", src)
    if not m:
        raise SystemExit("PRG_BANK_08 array not found")
    arr = re.findall(r"0x[0-9A-Fa-f]{2}", m.group(1))
    return bytes(int(s, 16) for s in arr)


def split_screens(data: bytes):
    """Yield screen dicts.

    bank-08 NT 流结构:
      1 subrow = 17 byte = 1 marker byte + 16 tile cell (col 0-15 的半行)
      1 NT row = 32 cell (col 0-31) = upper subrow (16 cell) + lower subrow (16 cell)
      1 NT screen = 30 NT row × 32 cell = 60 subrow × 16 = 60 × 17 = 1020 byte (NT cell part)

    bank-08 总 4889 byte = 287 subrow = 4 full screens (240 subrow) + 47 subrow partial.
    """
    SUBROW_PER_SCREEN = 60  # 30 NT row × 2 (upper/lower) half-row
    SUBROW_BYTES = 17
    screen_bytes = SUBROW_PER_SCREEN * SUBROW_BYTES  # 1020 byte
    screens = []
    total = len(data)
    full = total // screen_bytes
    rem = total % screen_bytes
    if rem:
        print(f"[WARN] trailing {rem} byte (≈ {rem//SUBROW_BYTES} subrow) — kept as partial screen #{full}")
    for s in range(full + (1 if rem > 0 else 0)):
        base = s * screen_bytes
        nt_rows = []  # 30 NT row, each = (marker, [32 cell])
        markers = []
        for nr in range(SUBROW_PER_SCREEN // 2):  # 30 NT row
            upper_off = base + (nr * 2) * SUBROW_BYTES
            lower_off = base + (nr * 2 + 1) * SUBROW_BYTES
            # upper subrow
            if upper_off + SUBROW_BYTES <= total:
                upper_marker = data[upper_off]
                upper_cells = list(data[upper_off + 1 : upper_off + 17])
            else:
                upper_marker = 0xff
                upper_cells = [0xff] * 16
            # lower subrow
            if lower_off + SUBROW_BYTES <= total:
                lower_marker = data[lower_off]
                lower_cells = list(data[lower_off + 1 : lower_off + 17])
            else:
                lower_marker = 0xff
                lower_cells = [0xff] * 16
            markers.extend([upper_marker, lower_marker])
            nt_rows.append(upper_cells + lower_cells)
        screens.append({
            "screen_id": s,
            "offset": base,
            "markers": markers,  # 60
            "cells": nt_rows,    # 30 × 32
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
    total = len(data)
    full = total // 544
    rem = total % 544
    for s in screens:
        labels = [marker_label(m) for m in s["markers"]]
        from collections import Counter
        c = Counter(labels)
        is_partial = (s["screen_id"] == full) and rem > 0
        flag = " (PARTIAL)" if is_partial else ""
        print(f"  screen #{s['screen_id']:02d} off=0x{s['offset']:04x} markers={dict(c)}{flag}")
    # build TS file
    lines = []
    lines.append("/**")
    lines.append(" * bank08-nt-screens — bank-08 raw NT 流按 32 row × 32 cell 拆屏.")
    lines.append(" *")
    lines.append(" * 行结构: marker(1) + col 0-15 半行(16) + col 16-31 半行(16) = 17 byte/row.")
    lines.append(" * 屏结构: 32 row × 17 byte = 544 byte.  4889 byte = 8 full screens + 1 partial (537 byte).")
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
    lines.append("  readonly screenId: number;     // 屏序 (0..)")
    lines.append("  readonly offset: number;       // bank-08 起始字节")
    lines.append("  readonly rowMarkers: readonly string[]; // 60 subrow marker (1 NT row = 2 subrow)")
    lines.append("  readonly cells: readonly (readonly number[])[]; // 30 NT row × 32 tile cell")
    lines.append("}")
    lines.append("")
    lines.append("const BANK08_NT_SCREENS: readonly Bank08Screen[] = [")
    for s in screens:
        lines.append("  {")
        lines.append(f"    screenId: {s['screen_id']},")
        lines.append(f"    offset: 0x{s['offset']:04x},")
        lines.append("    rowMarkers: [")
        # 8 markers per line
        for i in range(0, 60, 8):
            chunk = ", ".join(f'"{marker_label(m)}"' for m in s["markers"][i:i+8])
            lines.append(f"      {chunk},")
        lines.append("    ],")
        lines.append("    cells: [")
        for r, cells_row in enumerate(s["cells"]):
            parts = [f"0x{c:02x}" for c in cells_row]
            line = ", ".join(parts[:16])
            line2 = ", ".join(parts[16:])
            lines.append(f"      [{line},  // nt_row {r}")
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
