#!/usr/bin/env python3
"""Download an NDS SSEQ/SBNK/SWAR parser source for reference (try multiple repos)."""
import os
import urllib.request
import zipfile
import io

CANDIDATES = [
    'https://codeload.github.com/loveemu/sseq2mid/zip/refs/heads/master',
    'https://codeload.github.com/StapleButter/nitro-seq-tools/zip/refs/heads/master',
    'https://codeload.github.com/emukidid/ndssseq/zip/refs/heads/master',
    'https://codeload.github.com/ValwareIRC/sseq2mid/zip/refs/heads/master',
]

OUT = os.path.join(os.path.dirname(__file__), '..', 'work', 'sseq2mid')


def download_zip(url, dest_dir):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    data = urllib.request.urlopen(req, timeout=90).read()
    z = zipfile.ZipFile(io.BytesIO(data))
    os.makedirs(dest_dir, exist_ok=True)
    n = 0
    for name in z.namelist():
        if name.endswith('/'):
            continue
        rel = name.split('/', 1)[1] if '/' in name else name
        dest = os.path.join(dest_dir, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, 'wb') as f:
            f.write(z.read(name))
        n += 1
    return n


def main():
    for url in CANDIDATES:
        try:
            n = download_zip(url, OUT)
            print(f'OK {url} -> {n} files')
            return
        except Exception as e:
            print(f'FAIL {url}: {e}')


if __name__ == '__main__':
    main()
