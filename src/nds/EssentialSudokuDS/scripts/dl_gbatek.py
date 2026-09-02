#!/usr/bin/env python3
"""Download GBATEK (Nitro SSEQ/SBNK/SWAR format reference) for offline parsing."""
import os
import urllib.request

URLS = [
    ('https://problemkaputt.de/gbatek.htm', 'work/gbatek.htm'),
    ('https://problemkaputt.de/gbatek-ds-audio.htm', 'work/gbatek-ds-audio.htm'),
]
OUT = os.path.join(os.path.dirname(__file__), '..')


def main():
    for url, rel in URLS:
        dest = os.path.join(OUT, rel)
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            data = urllib.request.urlopen(req, timeout=90).read()
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, 'wb') as f:
                f.write(data)
            print(f'OK {url} -> {rel} ({len(data)} bytes)')
        except Exception as e:
            print(f'FAIL {url}: {e}')


if __name__ == '__main__':
    main()
