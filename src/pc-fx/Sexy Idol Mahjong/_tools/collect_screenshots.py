#!/usr/bin/env python3
"""
整理 RetroArch 截到的图.
读取 D:\studio\games\tools\RetroArch-Win64\screenshots\ 下所有 .png,
按时间排序, 重命名后复制到本项目 _tools\extracted\screenshots\

用法:
  1. 在 RetroArch 跑游戏时按 F11 截图 (多按几次, 关键场景)
  2. 关掉 RetroArch
  3. 跑这个脚本
"""
import sys, shutil, hashlib
from pathlib import Path
from datetime import datetime

SRC = Path(r"D:\studio\games\tools\RetroArch-Win64\screenshots")
DST = Path(r"d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\screenshots")
DST.mkdir(parents=True, exist_ok=True)


def short_hash(data: bytes) -> str:
    return hashlib.md5(data).hexdigest()[:6]


def main():
    if not SRC.exists():
        print(f"[!] 截图源目录不存在: {SRC}")
        return
    files = sorted(SRC.glob("*.png"))
    if not files:
        print(f"[!] {SRC} 里没有 PNG 文件, 请先在 RetroArch 里按 F11 截图")
        return

    seen_hashes = set()
    count_new = 0
    count_dup = 0
    for f in files:
        data = f.read_bytes()
        h = short_hash(data)
        if h in seen_hashes:
            count_dup += 1
            continue
        seen_hashes.add(h)

        # 用 mtime 生成可读文件名
        mtime = datetime.fromtimestamp(f.stat().st_mtime)
        new_name = f"pce_{mtime.strftime('%Y%m%d_%H%M%S')}_{h}.png"
        dst_file = DST / new_name
        shutil.copy2(f, dst_file)
        count_new += 1
        print(f"  + {new_name} ({len(data):>7} B) <- {f.name}")

    print()
    print(f"截图复制完成: 新加 {count_new} 张, 重复 {count_dup} 张, 总 {len(files)} 张")
    print(f"输出: {DST}")


if __name__ == "__main__":
    main()
