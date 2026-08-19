#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s89c: ndspy 解析 title SSEQ 事件流"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'
import ndspy.soundSequence as s

seq = s.SSEQ(open(f'{D}/file_000.bin', 'rb').read())
seq.parse()
print('tracks count first event:', type(seq.events[0]).__name__ if seq.events else None)
for i, e in enumerate(seq.events[:60]):
    print(f'{i:3d} {type(e).__name__:<28} {str(e)[:110]}')
