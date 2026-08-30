#!/usr/bin/env python3
"""快速扫描 (用 bytes.find)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TRACK02 = ROOT / "extracted" / "track_data" / "track_02" / "user_data.bin"
TRACK26 = ROOT / "extracted" / "track_data" / "track_26" / "user_data.bin"

print("=== scan START ===", flush=True)

PACK_PAT = b"\x00\x00\x01\xBA"
SEQ_PAT  = b"\x00\x00\x01\xB3"
PES_VIDEO = b"\x00\x00\x01\xE0"  # video PES packet
PES_AUDIO = b"\x00\x00\x01\xC0"  # audio PES packet


def find_all(buf: bytes, pat: bytes):
    """用 bytes.find 找所有 pat 位置, 返回 list."""
    out = []
    i = 0
    while True:
        j = buf.find(pat, i)
        if j == -1: break
        out.append(j)
        i = j + 1
    return out


for name, path in [("track02", TRACK02), ("track26", TRACK26)]:
    print(f"\n[{name}] open {path}", flush=True)
    data = path.read_bytes() if path.exists() else b""
    print(f"  size: {len(data)} bytes", flush=True)

    packs = find_all(data, PACK_PAT)
    seqs  = find_all(data, SEQ_PAT)
    pes_v = find_all(data, PES_VIDEO)
    pes_a = find_all(data, PES_AUDIO)

    print(f"  pack (00 00 01 BA): {len(packs)}", flush=True)
    print(f"  seq  (00 00 01 B3): {len(seqs)}", flush=True)
    print(f"  PES video (00 00 01 E0): {len(pes_v)}", flush=True)
    print(f"  PES audio (00 00 01 C0): {len(pes_a)}", flush=True)

    if packs[:20]:
        print(f"  first 20 packs: {[hex(p) for p in packs[:20]]}", flush=True)
    if seqs[:20]:
        print(f"  first 20 seqs: {[hex(p) for p in seqs[:20]]}", flush=True)

    # 0x160425 / 0x008E6328 / 0x3AD6 附近字节
    for off in [0x160425, 0x008E6328, 0x3AD6]:
        if off + 32 <= len(data):
            b = data[off:off+32]
            print(f"  bytes @ {hex(off)}: {b[:16].hex()}", flush=True)

print("\n=== scan DONE ===", flush=True)
