#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s89b: ndspy 解析验证 SSEQ/SBNK/SWAR"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'

import ndspy.soundSequence as seqmod
import ndspy.soundBank as bnkmod
import ndspy.soundWaveArchive as warmod

# SSEQ
d = open(f'{D}/file_000.bin', 'rb').read()
seq = seqmod.SSEQ(d)
print('SSEQ title:')
print('  tracks:', len(seq.tracks))
for i, t in enumerate(seq.tracks):
    print(f'  t{i}: cmds={len(t.commands)}  ', [str(c)[:60] for c in t.commands[:5]])
print('  initialTempo:', seq.initialTempo, '  initialVolume:', seq.initialVolume)

# SBNK
d = open(f'{D}/file_081.bin', 'rb').read()
bnk = bnkmod.SoundBank(d)
print('\nSBNK file_081 bank_stay:')
print('  instruments:', len(bnk.instruments))
n = 0
for i, inst in enumerate(bnk.instruments):
    if inst is None:
        continue
    n += 1
    if hasattr(inst, 'notes') and inst.notes:
        r0 = inst.notes[0]
        print(f'  [{i}] velregions={len(inst.notes)}  first: vel {r0.lowVelocity}-{r0.highVelocity} waveIdx={r0.swavIndex} rootKey={r0.rootKey}')
    else:
        print(f'  [{i}] type={inst}')

# SWAR
d = open(f'{D}/file_106.bin', 'rb').read()
war = warmod.SoundWaveArchive(d)
print('\nSWAR file_106 PLAYER_BGM:')
print('  waves:', len(war.waves))
w = war.waves[0]
print('  wave0: type', w.type, 'rate', w.sampleRate, 'loop', w.loop, 'loopStart', w.loopStart, 'samples', len(w.samples))
