#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s90: ndspy 打开隐藏 SDAT → sequence/bank/waveArchive 链接表"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROM = 'd:/studio/github/monkeycode/src/nds/Picross/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
BASE = 0x1924800
SIZE = 0x5AD220
rom = open(ROM, 'rb').read()
sdat_bytes = rom[BASE:BASE + SIZE]

import ndspy.soundArchive as sa
sdat = sa.SDAT(sdat_bytes)

seqs = sdat.sequences
banks = sdat.banks
wars = sdat.waveArchives
print('sequences:', type(seqs).__name__, len(seqs))
print('banks:', type(banks).__name__, len(banks))
print('waveArchives:', type(wars).__name__, len(wars))

def iter_named(xs):
    if isinstance(xs, dict):
        return [(k, v) for k, v in xs.items()]
    out = []
    for v in xs:
        if isinstance(v, tuple):
            out.append(v)
        else:
            out.append((None, v))
    return out

print('\n=== sequences ===')
for i, (name, seq) in enumerate(iter_named(seqs)):
    try:
        seq.parse()
        evs = seq.events
    except Exception:
        evs = []
    ntrk = None
    if evs and type(evs[0]).__name__ == 'DefineTracksSequenceEvent':
        ntrk = evs[0].trackNumbers
    print(f'  [{i}] {name}: bankID={seq.bankID} playerID={getattr(seq,"playerID","?")} tempo={getattr(seq,"initialTempo","?")} tracks={ntrk}')

print('\n=== banks → waveArchive ===')
for i, (name, bnk) in enumerate(iter_named(banks)):
    print(f'  [{i}] {name}: waveArchiveIDs={bnk.waveArchiveIDs} instruments={len(bnk.instruments)}')

print('\n=== waveArchives ===')
for i, (name, war) in enumerate(iter_named(wars)):
    print(f'  [{i}] {name}: waves={len(war.waves)}')

# NoteDefinition 字段
import ndspy.soundBank as b
import inspect
print('\nNoteDefinition fields:', [f for f in b.NoteDefinition.__dataclass_fields__] if hasattr(b.NoteDefinition, '__dataclass_fields__') else dir(b.NoteDefinition))
