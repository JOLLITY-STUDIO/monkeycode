#!/usr/bin/env python3
"""切 MPEG-PS 完整包从 user_data.bin, 直接送 ffmpeg 解码."""
import sys, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TRACK02 = ROOT / "extracted" / "track_data" / "track_02" / "user_data.bin"
OUT_DIR = ROOT / "extracted" / "dump" / "mpeg"
OUT_DIR.mkdir(parents=True, exist_ok=True)

def find_all(buf: bytes, pat: bytes):
    out = []
    i = 0
    while True:
        j = buf.find(pat, i)
        if j == -1: break
        out.append(j)
        i = j + 1
    return out

print("=== read track02 ===", flush=True)
data = TRACK02.read_bytes()
print(f"size: {len(data)}", flush=True)

# 切两个不同片段: (1) 从 seq header 起点; (2) 从 pack header 起点
candidates = [
    ("from_seq",  0x160425, 8*1024*1024),   # 从 sequence header 开始 8MB
    ("from_pack", 0x1615d7, 8*1024*1024),   # 从 pack header 开始 8MB
    ("seq_to_next_seq", 0x160425, 0x1CBC17 - 0x160425 + 0x100),  # 完整一段
]

for name, off, length in candidates:
    end = min(off + length, len(data))
    if end <= off: continue
    seg = data[off:end]
    out_file = OUT_DIR / f"track02_segment_{name}.mpg"
    out_file.write_bytes(seg)
    print(f"\n[SEG] {name} @ 0x{off:X} -> {out_file} ({len(seg)} bytes)", flush=True)

    # ffprobe
    p = subprocess.run(["ffmpeg", "-i", str(out_file)], capture_output=True, text=True)
    if "Video:" in p.stderr or "Audio:" in p.stderr:
        info = p.stderr.split("\n")
        keep = [l for l in info if "Input #" in l or "Duration" in l or "Video:" in l or "Audio:" in l or "Stream" in l]
        print(f"  ffprobe OK:", flush=True)
        for line in keep[:6]:
            print(f"    {line.strip()}", flush=True)

        # 解码 30 帧
        frames_pat = OUT_DIR / f"track02_{name}_frame_%03d.png"
        cmd = ["ffmpeg", "-y", "-i", str(out_file), "-frames:v", "30", "-c:v", "png", str(frames_pat)]
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
        if "Output #0" in r.stderr:
            files = sorted(OUT_DIR.glob(f"track02_{name}_frame_*.png"))
            print(f"  ✓ {len(files)} frames decoded!", flush=True)
            for f in files[:5]:
                print(f"    {f.name} ({f.stat().st_size} B)", flush=True)
        else:
            print(f"  ✗ decode fail", flush=True)
            for l in r.stderr.split("\n")[-15:]:
                print(f"    {l}", flush=True)
    else:
        print(f"  ffprobe fail", flush=True)
        for l in p.stderr.split("\n")[-8:]:
            print(f"    {l}", flush=True)

print("\n=== done ===", flush=True)
