#!/usr/bin/env python3
"""Pack rendered WAV assets into the WeChat mini-program audio bundle.

Converts work/wav/bgm/*.wav and work/wav/se/*.wav (mono 16-bit @ 22050)
to MP3 using ffmpeg, and writes them into miniprogram/assets/audio/.

Usage:
    python scripts/pack_audio_assets.py [--bitrate 24k] [--dry-run]

Requirements:
    ffmpeg in PATH (tested with ffmpeg version 2025-09-15).

Design choices:
    - MP3 24-32 kbps mono 22050 Hz keeps the 9 BGM + 17 SE bundle under ~2 MB,
      which fits the WeChat main package budget alongside existing NBM PNGs.
    - If you prefer higher fidelity, pass --bitrate 48k or 64k and consider
      moving assets to a subpackage / CDN.
"""

import argparse
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'work' / 'wav'
DST = ROOT / 'miniprogram' / 'assets' / 'audio'


def run_ffmpeg(src: Path, dst: Path, bitrate: str) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        'ffmpeg', '-y', '-i', str(src),
        '-vn',              # no video
        '-ar', '22050',     # keep original game sample rate
        '-ac', '1',         # mono
        '-b:a', bitrate,
        str(dst),
    ]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    if result.returncode != 0:
        print(f"[ERR] ffmpeg failed for {src.name}:\n{result.stdout}")
        sys.exit(1)


def pack_group(group: str, bitrate: str, dry_run: bool) -> int:
    src_dir = SRC / group
    dst_dir = DST / group
    if not src_dir.exists():
        print(f"[WARN] source dir missing: {src_dir}")
        return 0
    files = sorted([p for p in src_dir.iterdir() if p.suffix.lower() == '.wav'])
    for src in files:
        dst = dst_dir / (src.stem + '.mp3')
        if dry_run:
            print(f"[DRY] {src.relative_to(ROOT)} -> {dst.relative_to(ROOT)}")
            continue
        run_ffmpeg(src, dst, bitrate)
        size = dst.stat().st_size
        print(f"[OK] {dst.relative_to(ROOT)} ({size:,} B)")
    return len(files)


def main() -> None:
    parser = argparse.ArgumentParser(description='Pack decoded WAVs into mini-program MP3 assets.')
    parser.add_argument('--bitrate', default='24k', help='Audio bitrate (default 24k).')
    parser.add_argument('--dry-run', action='store_true', help='Print conversions without running ffmpeg.')
    args = parser.parse_args()

    print(f"Packing work/wav -> miniprogram/assets/audio (bitrate={args.bitrate})\n")
    bgm_count = pack_group('bgm', args.bitrate, args.dry_run)
    se_count = pack_group('se', args.bitrate, args.dry_run)

    if not args.dry_run:
        bgm_bytes = sum(p.stat().st_size for p in (DST / 'bgm').glob('*.mp3')) if (DST / 'bgm').exists() else 0
        se_bytes = sum(p.stat().st_size for p in (DST / 'se').glob('*.mp3')) if (DST / 'se').exists() else 0
        print(f"\nTotal: {bgm_count} BGM ({bgm_bytes:,} B) + {se_count} SE ({se_bytes:,} B)")
    else:
        print(f"\nDry run: {bgm_count} BGM + {se_count} SE")


if __name__ == '__main__':
    main()
