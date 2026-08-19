#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""sdat_link2: 用 ndspy 解析 SDAT，输出 BGM(SEQ)→bank→WAR→file 关联 + 每首歌 bank 的乐器概览"""
import struct, sys, io, json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
BASE = 'd:/studio/github/monkeycode/src/nds/Picross'

import ndspy.soundArchive as sa
import ndspy.soundBank as bnkmod
import ndspy.soundWaveArchive as warmod
import ndspy.soundSequence as seqmod

ROM = f'{BASE}/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
d = open(ROM, 'rb').read()
sdat = d[26363904:26363904 + 5952032]

arc = sa.SDAT(sdat)
print('SDAT 解析 OK')
print('  seqCount', len(arc.sequenceRecords) if arc.sequenceRecords else 0)
print('  bankCount', len(arc.bankRecords) if arc.bankRecords else 0)
print('  warCount', len(arc.waveArchiveRecords) if arc.waveArchiveRecords else 0)

recs = arc.sequenceRecords or []
print('\n=== SEQ 记录（ndspy 解析） ===')
for i, r in enumerate(recs[:30]):
    print(f'  SEQ[{i}] {r}')

print('\n=== BANK 记录（前 30） ===')
for i, r in enumerate((arc.bankRecords or [])[:30]):
    print(f'  BANK[{i}] {r}')

print('\n=== WAR 记录（前 5） ===')
for i, r in enumerate((arc.waveArchiveRecords or [])[:5]):
    print(f'  WAR[{i}] {r}')

# 文件读取
files = arc.files or []

def load_file(fid):
    if fid is None or fid >= len(files):
        return None
    return files[fid]

# 解析每首 BGM 的 bank
print('\n=== BGM bank 解析 ===')
names = arc.sequenceNames or []
out = {}
for i, r in enumerate(recs):
    if i >= len(names):
        break
    name = names[i]
    fid = r.fileID
    bid = r.bankID
    if fid is None:
        continue
    bankRec = (arc.bankRecords or [])[bid] if bid is not None and bid < len(arc.bankRecords or []) else None
    bankName = (arc.bankNames or [])[bid] if bid is not None and bid < len(arc.bankNames or []) else '?'
    warName = '?'
    warID = None
    if bankRec is not None and bankRec.waveArchiveID is not None:
        warID = bankRec.waveArchiveID
        if warID < len(arc.waveArchiveNames or []):
            warName = arc.waveArchiveNames[warID]
    out[name] = {'seqFile': fid, 'bankID': bid, 'bankName': bankName, 'bankFile': bankRec.fileID if bankRec else None, 'warID': warID, 'warName': warName}
    print(f'  {name:<20} seq=file_{fid:03d} bank[{bid}]={bankName}(file_{bankRec.fileID:03d}) war[{warID}]={warName}')

json.dump(out, open(f'{BASE}/extracted/SDAT/bgm_links.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# 抽查 bank_stay (title 用) 乐器
print('\n=== SBNK 抽查 ===')
try:
    bankRec = (arc.bankRecords or [])[27]
    bdata = load_file(bankRec.fileID)
    bnk = bnkmod.SoundBank(bdata)
    print(f'bank[{bankRec.fileID}] (bank_stay?) instruments={len(bnk.instruments)}')
    n = 0
    for i, inst in enumerate(bnk.instruments):
        if inst is None:
            continue
        n += 1
        if n <= 8 or i in (60, 64, 70, 114, 14):
            if hasattr(inst, 'notes') and inst.notes:
                r0 = inst.notes[0]
                print(f'  [{i}] type={type(inst).__name__} regions={len(inst.notes)} first: vel {r0.lowVelocity}-{r0.highVelocity} swav={r0.swavIndex} rootKey={r0.rootKey} att={r0.attack} dec={r0.decay} sus={r0.sustain} rel={r0.release}')
            else:
                print(f'  [{i}] type={type(inst).__name__} {inst}')
except Exception as ex:
    print('bank parse fail:', ex)

print('\n=== SWAR 抽查 PLAYER_BGM ===')
try:
    wdata = load_file((arc.waveArchiveRecords or [])[0].fileID)
    war = warmod.SoundWaveArchive(wdata)
    print(f'PLAYER_BGM: waves={len(war.waves)}')
    for i in range(min(5, len(war.waves))):
        w = war.waves[i]
        print(f'  wave[{i}] type={w.type} rate={w.sampleRate} loop={w.loop} loopStart={w.loopStart} samples={len(w.samples)}')
except Exception as ex:
    print('war parse fail:', ex)
