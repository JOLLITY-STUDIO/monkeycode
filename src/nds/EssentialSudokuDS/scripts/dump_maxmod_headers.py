#!/usr/bin/env python3
"""Dump MaxMod header files to work/maxmod/ for reference."""
import zipfile, io, urllib.request, os

URL = 'https://github.com/devkitPro/maxmod/archive/refs/heads/master.zip'
OUT = os.path.join(os.path.dirname(__file__), '..', 'work', 'maxmod')


def main():
    req = urllib.request.Request(URL, headers={'User-Agent': 'Mozilla/5.0'})
    data = urllib.request.urlopen(req, timeout=60).read()
    z = zipfile.ZipFile(io.BytesIO(data))
    os.makedirs(OUT, exist_ok=True)
    for n in z.namelist():
        if n.endswith('/'):
            continue
        rel = n.replace('maxmod-master/', '')
        dest = os.path.join(OUT, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, 'wb') as f:
            f.write(z.read(n))
    print('extracted', len([n for n in z.namelist() if not n.endswith('/')]), 'files to', OUT)


if __name__ == '__main__':
    main()
