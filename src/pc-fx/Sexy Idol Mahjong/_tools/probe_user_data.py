#!/usr/bin/env python3
"""Probe user_data.bin structure for Sexy Idol Mahjong."""
import os, struct, zlib

base = r"d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\track_data"

for track in ["track_02", "track_26"]:
    path = os.path.join(base, track, "user_data.bin")
    if not os.path.exists(path):
        continue
    print(f"\n=== {track} ===")
    with open(path, "rb") as f:
        data = f.read()

    # Find "PC Engine CD-ROM SYSTEM" magic
    sig = b"PC Engine CD-ROM SYSTEM"
    idx = data.find(sig)
    print(f"  IP.BIN offset: 0x{idx:x} ({idx})")

    # zlib streams
    zlib_starts = []
    for p in range(len(data) - 2):
        if data[p] == 0x78 and data[p + 1] in (0x01, 0x9c, 0xda, 0x5e):
            zlib_starts.append(p)
    print(f"  zlib-magic candidates: {len(zlib_starts)}")
    print(f"    first 10: {[hex(x) for x in zlib_starts[:10]]}")

    # Try first 5 zlib candidates
    print(f"  Testing zlib decompression:")
    decoded = []
    seen = set()
    for p in zlib_starts:
        try:
            d = zlib.decompress(data[p:])
            decoded.append((p, len(d), d[:64]))
        except Exception as e:
            pass
    print(f"    successfully decoded: {len(decoded)}")
    for p, l, sample in decoded[:10]:
        print(f"      off=0x{p:x} size={l} sample[:64]={sample[:32].hex()}")

    # Last 256 bytes
    print(f"  Last 256 hex head: {data[-256:][:32].hex()}")

    # Hunt for common magic words anywhere
    magics = {
        b"\x89PNG": "PNG",
        b"\xff\xd8\xff": "JPEG",
        b"BM": "BMP (could be 'BM' string)",
        b"GIF8": "GIF",
        b"RIFF": "RIFF/WAV",
        b"PK\x03\x04": "ZIP",
        b"HUDSON": "HUDSON text",
    }
    print(f"  Magic occurrences:")
    for m, name in magics.items():
        positions = []
        p = 0
        while True:
            i = data.find(m, p)
            if i < 0: break
            positions.append(i)
            p = i + 1
        print(f"    {name}: {len(positions)} occurrences, first 5: {[hex(x) for x in positions[:5]]}")

    # Look for Shift-JIS readable regions (Japanese text)
    sjis_count = 0
    for i in range(len(data) - 4):
        b = data[i]
        # Shift-JIS first byte 0x81-0x9F or 0xE0-0xEF
        if 0x81 <= b <= 0xEF and b not in (0x80,):
            b2 = data[i + 1] if i + 1 < len(data) else 0
            if 0x40 <= b2 <= 0xFC and b2 != 0x7f:
                sjis_count += 1
    print(f"  Shift-JIS byte-pair occurrences: {sjis_count}")

    # Sample various offsets to see what's there
    sample_offsets = [0, 0x100, 0x200, 0x800, 0x1000, 0x2000, 0x4000, 0x8000,
                      0x10000, 0x20000, 0x100000, 0x200000, 0x500000, 0xA00000]
    print(f"  Sample probes:")
    for off in sample_offsets:
        if off >= len(data): break
        sample = data[off:off + 24]
        # try ascii
        ascii_str = bytes(b for b in sample if 0x20 <= b < 0x7f)
        ascii_repr = ascii_str.decode("ascii", errors="replace")[:20]
        print(f"    @0x{off:08x} hex={sample[:16].hex()} ascii={ascii_repr!r}")
