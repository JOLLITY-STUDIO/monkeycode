#!/usr/bin/env python3
"""Download PC Engine CD-ROM2 System Card 3 BIOS - retry list"""
import urllib.request, hashlib, sys, time
from pathlib import Path

DEST = Path(r"D:\studio\games\tools\RetroArch-Win64\system\syscard3.pce")
EXPECTED_MD5 = "38179df8f4ac870017db21ebc53114"
EXPECTED_SIZE = 262144

URLS = [
    # libretro-system on GitHub (corrected path)
    "https://raw.githubusercontent.com/libretro/libretro-system/refs/heads/master/pcengine/syscard3.pce",
    # arcade.pokies.com mirror
    "https://www.arcade.pokies.com/files/PC-Engine/syscard3.pce",
    # libretro core_info source
    "https://github.com/libretro/libretro-core-info/raw/refs/heads/main/data/nec/pcengine/syscard3.pce",
    # Old archive.org mirror
    "https://web.archive.org/web/2020*/syscard3.pce",
]


def fetch(url: str, timeout=15) -> bytes:
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "*/*",
    })
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def main():
    print(f"target md5: {EXPECTED_MD5}, expected size: {EXPECTED_SIZE}", flush=True)
    for url in URLS:
        try:
            print(f"  -> {url}", flush=True)
            data = fetch(url, timeout=20)
        except Exception as e:
            print(f"     FAIL: {e}", flush=True)
            continue
        if len(data) < 1000:
            print(f"     too small ({len(data)} B)", flush=True)
            continue
        h = hashlib.md5(data).hexdigest()
        print(f"     got {len(data)} B md5={h}", flush=True)
        if h == EXPECTED_MD5 and len(data) == EXPECTED_SIZE:
            DEST.write_bytes(data)
            print(f"  >>> OK saved to {DEST}", flush=True)
            return 0
    print("\n[!] all mirrors failed.", flush=True)
    print("Manual: open this page in your browser and download syscard3.pce:", flush=True)
    print("  https://archive.org/details/pce_bios", flush=True)
    print(f"Then put it at: {DEST}", flush=True)
    return 1


if __name__ == "__main__":
    sys.exit(main())
