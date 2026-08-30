#!/usr/bin/env python3
"""
暴力扫描 .bin, 找所有可能的 MPEG-PS (Pack header 00 00 01 BA)
和 MPEG-ES (Sequence header 00 00 01 B3) 位置, 然后用 ffmpeg 解码.
"""
import os, sys, struct, subprocess, json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BIN_FILE = ROOT / "extracted" / "Sexy Idol Mahjong - Yakyuuken no Uta (Japan).bin"
TRACK02  = ROOT / "extracted" / "track_data" / "track_02" / "user_data.bin"
TRACK26  = ROOT / "extracted" / "track_data" / "track_26" / "user_data.bin"
OUT_DIR  = ROOT / "extracted" / "dump" / "mpeg"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def find_sequences(buf: bytes):
    """找所有 00 00 01 BA (Pack) 和 00 00 01 B3 (Sequence)."""
    packs = []
    seqs = []
    pack_pat  = b"\x00\x00\x01\xBA"
    seq_pat   = b"\x00\x00\x01\xB3"
    pic_pat   = b"\x00\x00\x01\x00"  # picture start
    audio_pat = b"\x00\x00\x01\xC0"  # audio stream 0
    for i in range(0, len(buf) - 4):
        if buf[i:i+4] == pack_pat:
            packs.append(i)
        elif buf[i:i+4] == seq_pat:
            seqs.append(i)
    return packs, seqs


def extract_pack_segments(buf: bytes, packs, max_segments: int = 8):
    """根据 pack header 切分整个 PS stream, 每个 pack + 后续 PES 直到下一个 pack."""
    segs = []
    for k in range(min(len(packs), max_segments)):
        start = packs[k]
        end = packs[k+1] if k+1 < len(packs) else len(buf)
        # 在结束位置截断到下一个 pack header (for 完整 pack)
        segs.append((start, end))
    return segs


def run_ffmpeg_frames(stream_path, out_dir, prefix, max_frames=10):
    """调 ffmpeg 解 N 帧 PNG."""
    out_pattern = str(out_dir / f"{prefix}_%03d.png")
    cmd = ["ffmpeg", "-y", "-i", str(stream_path),
           "-frames:v", str(max_frames),
           "-c:v", "png", out_pattern]
    print(f"\n  ffmpeg: {' '.join(cmd)}")
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if "Output #0" in result.stderr and "error" not in result.stderr.lower():
            # 找生成的文件
            files = sorted(out_dir.glob(f"{prefix}_*.png"))
            print(f"  ✓ 解码成功: {len(files)} frames -> {prefix}_001.png ... {prefix}_{len(files):03d}.png")
            return files
        else:
            print(f"  ✗ ffmpeg 失败:")
            for line in result.stderr.split("\n")[-15:]:
                print(f"     {line}")
            return []
    except subprocess.TimeoutExpired:
        print("  ✗ ffmpeg 超时")
        return []
    except FileNotFoundError:
        print("  ✗ ffmpeg 不在 PATH")
        return []


def main():
    targets = []
    if TRACK02.exists():
        targets.append(("track02", TRACK02))
    if TRACK26.exists():
        targets.append(("track26", TRACK26))

    for name, path in targets:
        print(f"\n========== {name} ({path.name}) ==========")
        with open(path, 'rb') as f:
            data = f.read()

        packs, seqs = find_sequences(data)
        print(f"  pack headers (00 00 01 BA): {len(packs)}")
        print(f"  sequence headers (00 00 01 B3): {len(seqs)}")

        if not packs and not seqs:
            print("  无 MPEG 流, 跳过")
            continue

        if packs:
            print(f"  前 {min(5,len(packs))} pack 位置: " +
                  ", ".join(f"0x{p:X}" for p in packs[:5]))

            segs = extract_pack_segments(data, packs, max_segments=6)
            for k, (s, e) in enumerate(segs):
                length = e - s
                if length < 1024: continue  # 太短跳过
                seg_file = OUT_DIR / f"{name}_pack_{k:02d}_off{s:08X}.m2v"
                with open(seg_file, 'wb') as f:
                    f.write(data[s:e])
                print(f"\n  [Pack #{k}] {seg_file.name} ({length} bytes @ 0x{s:X})")
                run_ffmpeg_frames(seg_file, OUT_DIR, f"{name}_pack{k:02d}", max_frames=8)
        elif seqs:
            print(f"  前 {min(5,len(seqs))} sequence 位置: " +
                  ", ".join(f"0x{p:X}" for p in seqs[:5]))
            # fallback: 把 sequence 前后 1MB 切片试图解码
            for k, off in enumerate(seqs[:4]):
                s = max(0, off - 1024*1024)
                e = min(len(data), off + 4*1024*1024)
                seg_file = OUT_DIR / f"{name}_seq_{k:02d}_off{off:08X}.m2v"
                with open(seg_file, 'wb') as f:
                    f.write(data[s:e])
                print(f"\n  [Seq #{k}] {seg_file.name} ({e-s} bytes, seq at 0x{off:X})")
                run_ffmpeg_frames(seg_file, OUT_DIR, f"{name}_seq{k:02d}", max_frames=5)


if __name__ == "__main__":
    main()
