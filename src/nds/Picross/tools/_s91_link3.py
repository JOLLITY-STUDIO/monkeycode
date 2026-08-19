#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s91: 用 ndspy 解析 title SSEQ 事件 + title SBNK 乐器，验证 instrumentID→乐器→SWAV 映射"""
import struct, sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
BASE = 'd:/studio/github/monkeycode/src/nds/Picross'
D = f'{BASE}/extracted/SDAT/files'

import ndspy.soundSequence as sq
import ndspy.soundBank as sb

OUT = open(f'{BASE}/tools/_s91_out.txt', 'w', encoding='utf-8')
def log(*a):
    s = ' '.join(str(x) for x in a)
    print(s)
    OUT.write(s + '\n')

# ---- 1. title SSEQ ----
sseq = sq.SSEQ(open(f'{D}/file_000.bin', 'rb').read())
sseq.parse()
log(f'=== title SSEQ file_000 events={len(sseq.events)} bankID={sseq.bankID} ===')

# 统计事件类型
from collections import Counter, defaultdict
types = Counter()
instr_events = defaultdict(list)  # track 序号 -> 事件列表
note_events = []
for e in sseq.events:
    t = e.type
    if t is None:
        types['raw'] += 1
        continue
    types[t] += 1
    if t == 0x81:
        pass
log(f'事件类型统计: {dict(types)}')

# 用 printSequenceEventList 输出完整事件列表（供人工核对）
evtxt = sq.printSequenceEventList(sseq.events, {})
log('\n=== title SSEQ 完整事件列表 ===')
log(evtxt)

# 统计 0x81 用到的 instrumentID
instIDs = Counter()
for e in sseq.events:
    if getattr(e, 'type', None) == 0x81:
        instIDs[(e.bankID, e.instrumentID)] += 1
log(f'\n0x81 乐器切换统计 (bankID, instrumentID): {dict(instIDs)}')

# ---- 2. title SBNK ----
sbnk = sb.SBNK.fromFile(f'{D}/file_081.bin')
log(f'\n=== title SBNK file_081 instruments={len(sbnk.instruments)} waveArchiveIDs={sbnk.waveArchiveIDs} ===')
for i, inst in enumerate(sbnk.instruments):
    if inst is None:
        log(f'inst[{i}] = None')
        continue
    log(f'inst[{i}] type={inst.type} {type(inst).__name__}')
    if hasattr(inst, 'regions'):
        for r in inst.regions:
            nd = r.noteDefinition
            log(f'   region <=key {r.lastPitch}: swav={nd.waveID} swar={nd.waveArchiveIDID} pitch={nd.pitch} A={nd.attack} D={nd.decay} S={nd.sustain} R={nd.release} pan={nd.pan} type={nd.type}')
    elif hasattr(inst, 'noteDefinitions'):
        for k, nd in enumerate(inst.noteDefinitions):
            log(f'   key {inst.firstPitch+k}: swav={nd.waveID} swar={nd.waveArchiveIDID} pitch={nd.pitch} A={nd.attack} D={nd.decay} S={nd.sustain} R={nd.release} pan={nd.pan} type={nd.type}')
    elif hasattr(inst, 'noteDefinition'):
        nd = inst.noteDefinition
        log(f'   single: swav={nd.waveID} swar={nd.waveArchiveIDID} pitch={nd.pitch} A={nd.attack} D={nd.decay} S={nd.sustain} R={nd.release} pan={nd.pan} type={nd.type}')

# ---- 3. title_ARC 波形名 ----
import ndspy.soundWaveArchive as wa
war = wa.SWAR.fromFile(f'{D}/file_136.bin')
log(f'\n=== title_ARC file_136 waves={len(war.waves)} ===')
for i, w in enumerate(war.waves):
    if w is None:
        log(f'  wave[{i}] None')
        continue
    log(f'  wave[{i}]: type={w.waveType} rate={w.sampleRate} len={w.totalLength} loop={w.isLooped} @{w.loopOffset}')

OUT.close()
print('done -> tools/_s91_out.txt')
