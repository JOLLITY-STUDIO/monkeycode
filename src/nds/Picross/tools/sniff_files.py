#!/usr/bin/env python3
"""Identify file types by header magic / heuristics."""
import os, json

BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted")

def sniff(path):
    with open(path, "rb") as f:
        d = f.read(64)
    if not d:
        return "empty"
    sig = d[:4]
    magics = {
        b"NCGR": "NCGR (tile data)",
        b"NCLR": "NCLR (palette)",
        b"NSCR": "NSCR (screen map)",
        b"NMAP": "NMAP (map)",
        b"NCER": "NCER (sprite anim)",
        b"NMCR": "NMCR (multi-palette)",
        b"SADL": "SADL (seq table)",
        b"SSEQ": "SSEQ (sequence)",
        b"SWAV": "SWAV (waveform)",
        b"SWAR": "SWAR (wave bank)",
        b"STRM": "STRM (streamed audio)",
        b"SDAT": "SDAT (audio bank)",
        b"BNRY": "BNRY (binary container)",
        b"bmd0": "bmd0 (3D model)",
        b"NARC": "NARC (nitro archive)",
        b"RTI0": "RTI0 (compressed)",
        b"lz10": "LZ10 (compressed)",
        b"BLZ0": "BLZ (compressed)",
    }
    if sig in magics:
        return magics[sig]
    if all(32 <= c < 127 for c in d[:16]):
        return f"text-ish: {d[:32]!r}"
    return "unknown"

def main():
    rows = []
    for root, _, files in os.walk(EX):
        for fn in sorted(files):
            p = os.path.join(root, fn)
            rel = os.path.relpath(p, EX)
            sz = os.path.getsize(p)
            rows.append((rel, sz, sniff(p)))
    rows.sort(key=lambda r: -r[1])
    for rel, sz, kind in rows:
        print(f"{rel:70s} {sz:9d}  {kind}")
    with open(os.path.join(BASE, "..", "_tmp_disasm_out", "files_sniff.txt"), "w") as f:
        for rel, sz, kind in rows:
            f.write(f"{rel}\t{sz}\t{kind}\n")

if __name__ == "__main__":
    main()
