#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""sdat_info: 解析 SDAT INFO 块 → SEQ/BANK/WAR 关联（标准 NDS SDAT）
   SEQ 记录: {fileID u32, bankID u32, volume u32, cpr u32, ppr u32, ctl u32}
   BANK 记录: {fileID u32, waveArcID u32, 0 u32}
   WAR  记录: {fileID u32}
"""
import struct, sys, io, json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

BASE = 'd:/studio/github/monkeycode/src/nds/Picross'
import glob, os

ROM = f'{BASE}/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
SDAT_BASE = 26363904  # 0x1924800
SDAT_SIZE = 5952032
d = open(ROM, 'rb').read()
sdat = d[SDAT_BASE:SDAT_BASE + SDAT_SIZE]
print(f'SDAT size={len(sdat)} magic={sdat[0:4]}')

# INFO 块偏移：块表在 header 内偏移 0x10 起，每块 8B：[u32 off][u32 size]
blocks = {}
for i in range(4):
    off, sz = struct.unpack_from('<II', sdat, 0x10 + i * 8)
    magic = sdat[off:off + 4].decode('latin1')
    blocks[magic] = (off, sz)
print('块表:', {k: hex(v[0]) for k, v in blocks.items()})

ioff, isz = blocks['INFO']
info = sdat[ioff:ioff + isz]
# INFO: 'INFO' + size + 记录区偏移表（8 个: seq, sseq, bank, war, player, group, strm, strmr）
rec_offs = struct.unpack_from('<8I', info, 8)
labels = ['SEQ', 'SSAR', 'BANK', 'WAR', 'PLAYER', 'GROUP', 'STRM', 'STRMR']
print('\n=== 记录区偏移 ===')
for lb, ro in zip(labels, rec_offs):
    print(f'  {lb}: 0x{ro:x}')

# 记录区: [u32 count][u32 记录偏移表...]
def parse_recs(rec_off, count=None):
    if rec_off == 0:
        return []
    cnt = struct.unpack_from('<I', info, rec_off)[0]
    offs = [struct.unpack_from('<I', info, rec_off + 4 + i * 4)[0] for i in range(cnt)]
    return offs

seq_offs = parse_recs(rec_offs[0])
ssar_offs = parse_recs(rec_offs[1])
bank_offs = parse_recs(rec_offs[2])
war_offs = parse_recs(rec_offs[3])
player_offs = parse_recs(rec_offs[4])
group_offs = parse_recs(rec_offs[5])
print(f'\n计数: SEQ={len(seq_offs)} SSAR={len(ssar_offs)} BANK={len(bank_offs)} WAR={len(war_offs)} PLAYER={len(player_offs)} GROUP={len(group_offs)}')

# SEQ 记录解析
seqs = []
for i, o in enumerate(seq_offs):
    fid, bid, vol, cpr, ppr, ctl = struct.unpack_from('<6I', info, o)
    seqs.append({'idx': i, 'fileID': fid, 'bankID': bid, 'volume': vol, 'cpr': cpr, 'ppr': ppr, 'ctl': ctl})

# BANK 记录解析
banks = []
for i, o in enumerate(bank_offs):
    fid, war, _z = struct.unpack_from('<3I', info, o)
    banks.append({'idx': i, 'fileID': fid, 'waveArcID': war})

# WAR 记录解析
wars = []
for i, o in enumerate(war_offs):
    fid = struct.unpack_from('<I', info, o)[0]
    wars.append({'idx': i, 'fileID': fid})

# SSAR 记录（含 bankID, 各 seq 入口）
ssars = []
for i, o in enumerate(ssar_offs):
    fid, bankid, nseq, _z = struct.unpack_from('<4I', info, o)
    ent = [struct.unpack_from('<I', info, o + 16 + j * 4)[0] for j in range(nseq)] if nseq < 200 else []
    ssars.append({'idx': i, 'fileID': fid, 'bankID': bankid, 'nSeq': nseq, 'entries': ent})

# PLAYER 记录
players = []
for i, o in enumerate(player_offs):
    if o == 0 or o >= isz:
        players.append({'idx': i})
        continue
    # player: {fileID u32, hdrID u32, ...}
    vals = struct.unpack_from('<4I', info, o)
    players.append({'idx': i, 'vals': vals})

out = {
    'seqs': seqs, 'banks': banks, 'wars': wars, 'ssars': ssars, 'players': players,
}
json.dump(out, open(f'{BASE}/extracted/SDAT/info_records.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('\n=== SEQ 记录（BGM） ===')
for s in seqs[:40]:
    print(f'  SEQ[{s["idx"]:2d}] file=file_{s["fileID"]:03d} bank={s["bankID"]} vol={s["volume"]}')
print('\n=== BANK 记录（前 40） ===')
for b in banks[:40]:
    print(f'  BANK[{b["idx"]:2d}] file=file_{b["fileID"]:03d} war={b["waveArcID"]}')
print('\n=== WAR 记录 ===')
for w in wars:
    print(f'  WAR[{w["idx"]}] file=file_{w["fileID"]:03d}')
print('\n=== SSAR 记录 ===')
for s in ssars:
    print(f'  SSAR[{s["idx"]}] file=file_{s["fileID"]:03d} bank={s["bankID"]} nSeq={s["nSeq"]}')
print('\n=== PLAYER 记录 ===')
for p in players:
    print(f'  PLAYER[{p["idx"]}] {p.get("vals")}')
