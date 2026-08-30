# _tools/dive_extract_video.py
#
# 把 .m2v 切片 (已经在 dump/mpeg/ 里) 转换为 PNG 序列
# 用 imageio + 自带 ffmpeg

import os, sys
from pathlib import Path
from typing import List

try:
    import imageio
    from PIL import Image
    import numpy as np
    HAVE_DEPS = True
except ImportError as e:
    HAVE_DEPS = False
    print(f"[!] 缺依赖: {e}")
    sys.exit(1)


ROOT = Path(__file__).resolve().parent
DUMP_DIR = ROOT / "extracted" / "dump"
MPEG_DIR = DUMP_DIR / "mpeg"
PNG_DIR = DUMP_DIR / "mpeg_png"


def extract_one(m2v_path: Path, out_dir: Path, max_frames: int = 240):
    out_dir.mkdir(parents=True, exist_ok=True)
    try:
        reader = imageio.get_reader(str(m2v_path))
        meta = reader.get_meta_data()
        print(f"  [{m2v_path.name}] meta: {meta}")
        saved = 0
        for idx, frame in enumerate(reader):
            if saved >= max_frames: break
            if idx % 3 != 0: continue  # 每 3 帧保存 1 张
            name = f"{m2v_path.stem}_f{idx:05d}.png"
            img = Image.fromarray(frame)
            img.save(out_dir / name)
            saved += 1
        reader.close()
        print(f"  [{m2v_path.name}] saved {saved} frames -> {out_dir}")
        return saved
    except Exception as e:
        print(f"  [{m2v_path.name}] FAIL {e}", file=sys.stderr)
        return 0


def main():
    if not MPEG_DIR.exists():
        print(f"[!] 没 m2v: {MPEG_DIR}")
        return
    m2vs = sorted(MPEG_DIR.glob("*.m2v"))
    print(f"找到 {len(m2vs)} 个 m2v 切片")
    total = 0
    for m in m2vs:
        total += extract_one(m, PNG_DIR, max_frames=120)
    print(f"\nTotal frames saved: {total}")


if __name__ == "__main__":
    main()
