#!/usr/bin/env python3
"""Check first 256 bytes of user_data.bin for both tracks."""
import os
import struct

base = r"d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\track_data"

for track in ["track_02", "track_26"]:
    path = os.path.join(base, track, "user_data.bin")
    if not os.path.exists(path):
        print(f"NOT FOUND: {path}")
        continue
    size = os.path.getsize(path)
    print(f"\n=== {track}/user_data.bin ({size} bytes) ===")

    with open(path, "rb") as f:
        head = f.read(256)
        last = f.read()[-16:]

    hex_first_32 = head[:32].hex()
    print(f"  first 32B hex  : {hex_first_32}")
    # Check ISO 9660 magic
    if head[0x8001:0x8006] == b"CD001" or head[:5] == b"CD001":
        print(f"  ISO 9660 PRIMARY VOLUME DESCRIPTOR detected!")
    # IP.BIN format check (Hudson header)
    if b"HUDSON" in head[:256] or b"hudson" in head[:256] or head[:6] == b"\x00\x00\x00\x02\x00\x00":
        print(f"  Hudson IP.BIN magic detected")
    if head[:4] == b"CD001":
        print(f"  ISO 9660 PVD at start")
    # ASCII printable
    text = bytes(b for b in head if 0x20 <= b < 0x7f)
    print(f"  ASCII (print): {text[:120]!r}")
    print(f"  last 16B hex   : {last.hex()}")
    print(f"  last 16B ASCII : {bytes(b for b in last if 0x20 <= b < 0x7f)!r}")
