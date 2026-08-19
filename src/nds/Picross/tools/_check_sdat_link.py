#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""检查 sdat_link.py 产物"""
import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
BASE = 'd:/studio/github/monkeycode/src/nds/Picross'

print('=== bgm_links.json ===')
lk = json.load(open(f'{BASE}/extracted/SDAT/bgm_links.json', encoding='utf-8'))
for name, v in lk.items():
    print(f'{name:<22} seq=file_{v["seqFile"]:03d} bank={v["bankName"]}(file_{v["bankFile"]:03d}) war={v["warNames"]} tempo={v["tempo"]}')

print('\n=== banks.json ===')
bk = json.load(open(f'{BASE}/assets/audio/banks.json', encoding='utf-8'))
for name, v in bk.items():
    insts = v['instruments']
    cnt = sum(1 for x in insts if x is not None)
    nstd = sum(1 for x in insts if x is not None and x['t'] == 'std')
    ndrum = sum(1 for x in insts if x is not None and x['t'] == 'drum')
    print(f'{name:<22} file={v["file"]} inst={len(insts)} used={cnt} std={nstd} drum={ndrum}')

print('\n=== waves.json ===')
wv = json.load(open(f'{BASE}/assets/audio/waves.json', encoding='utf-8'))
for name, v in wv.items():
    waves = v['waves']
    types = sorted(set(w.get('type') for w in waves))
    tot = sum(len(w.get('samples') or '') // 2 for w in waves)
    print(f'{name:<22} file={v["file"]} waves={len(waves)} types={types} total_samples={tot}')

# 抽查 title bank 乐器 60/64/70/14/114
print('\n=== title bank 抽查（title 曲用 prog） ===')
t = bk.get('title')
if t:
    for p in (60, 64, 70, 14, 114):
        inst = t['instruments'][p] if p < len(t['instruments']) else None
        print(f'  prog[{p}] = {json.dumps(inst, ensure_ascii=False)[:200]}')
