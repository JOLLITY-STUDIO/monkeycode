#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""sdat_link: ndspy 解析 SDAT → BGM(SEQ)→bank→WAR→file 全关联 + SBNK 乐器/SWAR 波形转存
   输出:
   - extracted/SDAT/bgm_links.json: 每首 BGM 的 {seqFile, bankFile, warFiles, tempo...}
   - assets/audio/waves.json: 各 SWAR 波形 {name, rate, samples(base64 i16)}（供 sseq-player 用）
"""
import struct, sys, io, json, os, base64

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
BASE = 'd:/studio/github/monkeycode/src/nds/Picross'

import ndspy.soundArchive as sa
import ndspy.soundBank as bnkmod
import ndspy.soundWaveArchive as warmod

ROM = f'{BASE}/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
d = open(ROM, 'rb').read()
sdat = d[26363904:26363904 + 5952032]

arc = sa.SDAT(sdat)
seqs = arc.sequences or []
banks = arc.banks or []
wars = arc.waveArchives or []

print(f'SEQ={len(seqs)} BANK={len(banks)} WAR={len(wars)}')

# SEQ → bank → war 关联
links = {}
for i, (name, sseq) in enumerate(seqs):
    if sseq is None:
        continue
    bid = sseq.bankID
    bankName, sbnk = banks[bid] if bid is not None and bid < len(banks) else (None, None)
    warIds = sbnk.waveArchiveIDs if sbnk is not None else []
    warNames = []
    for wid in warIds:
        if wid is not None and wid < len(wars) and wars[wid] is not None:
            warNames.append(wars[wid][0])
    links[name] = {
        'seqFile': sseq.dataMergeOptimizationID,
        'bankID': bid,
        'bankName': bankName,
        'bankFile': sbnk.dataMergeOptimizationID if sbnk is not None else None,
        'warIDs': [w for w in warIds if w is not None],
        'warNames': warNames,
        'tempo': getattr(sseq, 'initialTempo', None),
    }
    print(f'{name:<22} seq=file_{links[name]["seqFile"]:03d} bank[{bid}]={bankName}(file_{links[name]["bankFile"]:03d}) war={warNames}')

json.dump(links, open(f'{BASE}/extracted/SDAT/bgm_links.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# BGM 用 bank 的乐器表概览（哪些 bank 是大型音乐库）
print('\n=== bank 乐器数量概览 ===')
bankInfo = {}
for i, (name, sbnk) in enumerate(banks):
    if sbnk is None:
        bankInfo[name] = {'instruments': 0, 'file': None}
        continue
    try:
        insts = sbnk.instruments
        cnt = sum(1 for x in insts if x is not None)
    except Exception:
        cnt = -1
    bankInfo[name] = {'instruments': cnt, 'file': sbnk.dataMergeOptimizationID}
print(f'bank 数={len(bankInfo)}')

# ---- 波形解码 ----
ADPCM_INDEX_TABLE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
ADPCM_STEP_TABLE = [
    0x0007, 0x0008, 0x0009, 0x000A, 0x000B, 0x000C, 0x000D, 0x000E, 0x0010, 0x0011, 0x0013, 0x0015, 0x0017, 0x0019, 0x001C, 0x001F,
    0x0022, 0x0025, 0x0029, 0x002D, 0x0032, 0x0037, 0x003C, 0x0042, 0x0049, 0x0050, 0x0058, 0x0061, 0x006B, 0x0076, 0x0082, 0x008F,
    0x009D, 0x00AD, 0x00BE, 0x00D1, 0x00E6, 0x00FD, 0x0117, 0x0133, 0x0153, 0x0175, 0x019C, 0x01C7, 0x01F7, 0x022C, 0x0267, 0x02A9,
    0x02F3, 0x0345, 0x03A1, 0x0407, 0x0479, 0x04F7, 0x0584, 0x0621, 0x06D0, 0x0793, 0x086B, 0x095C, 0x0A6A, 0x0B99, 0x0CEC, 0x0E66,
    0x100E, 0x11F0, 0x1410, 0x1672, 0x191D, 0x1C1B, 0x1F77, 0x233C, 0x2777, 0x2C38, 0x318C, 0x3784, 0x3E32, 0x45A9, 0x4DFE, 0x5747,
    0x629C, 0x701C, 0x7F4E, 0x905E, 0xA3BE, 0xB9C4, 0xD2B2, 0xEF14, 0x10FDB, 0x13608, 0x161C0, 0x19032, 0x1C18A, 0x1F624, 0x2333A, 0x272F1,
    0x2B620, 0x2FE0A, 0x34AE9, 0x39D05, 0x3F55B, 0x4545A, 0x4BA77, 0x52948, 0x5A122, 0x62960, 0x6BA65, 0x75902, 0x805D2, 0x8C2A8, 0x991E0, 0xA75B3,
    0xB71AF, 0xC88B6, 0xDBE0B, 0xF16C4, 0x10982A, 0x124675, 0x140C1D, 0x15E182, 0x17C6B0, 0x19C63A, 0x1BE14C, 0x1E5AA3, 0x2135C9, 0x247D1B, 0x2835A9, 0x2C64ED,
]

def decode_wave(w):
    """SWAV → i16 列表"""
    wtype = int(w.waveType)
    raw = bytes(w.data)
    if wtype == 0:  # PCM8 无符号
        return [int(b) * 257 - 32768 for b in raw]
    if wtype == 1:  # PCM16 LE
        return list(struct.unpack('<%dh' % (len(raw) // 2), raw[:len(raw) // 2 * 2]))
    if wtype == 2:  # ADPCM
        out = []
        sample = 0
        index = 0
        for byte in raw:
            for shift in (4, 0):
                nib = (byte >> shift) & 0xF
                step = ADPCM_STEP_TABLE[index]
                diff = step >> 3
                if nib & 1: diff += step >> 2
                if nib & 2: diff += step >> 1
                if nib & 4: diff += step
                if nib & 8: sample -= diff
                else: sample += diff
                if sample > 32767: sample = 32767
                elif sample < -32768: sample = -32768
                index += ADPCM_INDEX_TABLE[nib & 7]
                if index > 88: index = 88
                elif index < 0: index = 0
                out.append(sample)
        return out
    if wtype == 3:  # PSG 方波（无数据）
        return None
    return None

# 转存 BGM 相关的 SWAR 波形（去重）
print('\n=== SWAR 波形转存 ===')
os.makedirs(f'{BASE}/assets/audio', exist_ok=True)
waves_out = {}
used_wars = set()
for name, lk in links.items():
    for wid in lk['warIDs']:
        used_wars.add(wid)
for wid in sorted(used_wars):
    wname, swar = wars[wid]
    if swar is None:
        continue
    waves = []
    for i, w in enumerate(swar.waves):
        if w is None:
            continue
        samples = decode_wave(w)
        if samples is None:
            waves.append({'rate': w.sampleRate, 'loop': bool(w.isLooped), 'loopStart': w.loopOffset, 'loopEnd': w.totalLength, 'samples': None, 'type': int(w.waveType)})
            continue
        waves.append({
            'rate': w.sampleRate,
            'loop': bool(w.isLooped),
            'loopStart': w.loopOffset,
            'loopEnd': w.totalLength,
            'type': int(w.waveType),
            'samples': base64.b64encode(struct.pack('<%dh' % len(samples), *samples)).decode('ascii'),
        })
    waves_out[wname] = {'file': swar.dataMergeOptimizationID, 'waves': waves}
    print(f'  {wname}: file_{swar.dataMergeOptimizationID:03d} waves={len(waves)} types={set(w["type"] for w in waves)} total_samples={sum(len(w["samples"])//2 for w in waves if w["samples"])}')
json.dump(waves_out, open(f'{BASE}/assets/audio/waves.json', 'w', encoding='utf-8'), ensure_ascii=False)

# 转存 BGM 相关 bank 的乐器表
print('\n=== SBNK 乐器表转存 ===')
banks_out = {}
for name, lk in links.items():
    bid = lk['bankID']
    bname, sbnk = banks[bid]
    if sbnk is None:
        continue
    if bname in banks_out:
        continue
    insts = []
    try:
        for prog, inst in enumerate(sbnk.instruments):
            if inst is None:
                insts.append(None)
                continue
            cname = type(inst).__name__
            if cname == 'RegionalInstrument':  # type 0x11: 按音高区段
                # regions: [Region(lastPitch, NoteDefinition)]
                # 累计 lastPitch 推断起始音高
                regs = []
                lo = 0
                for r in inst.regions:
                    nd = r.noteDefinition
                    regs.append({
                        'loKey': lo, 'hiKey': r.lastPitch,
                        'swav': nd.waveID, 'root': nd.pitch,
                        'att': nd.attack, 'dec': nd.decay, 'sus': nd.sustain, 'rel': nd.release,
                        'pan': getattr(nd, 'pan', 0),
                        'warID': getattr(nd, 'waveArchiveIDID', 0),
                    })
                    lo = r.lastPitch + 1
                insts.append({'t': 'regional', 'regs': regs})
            elif cname == 'RangeInstrument':  # type 0x10: 按音高范围
                # firstPitch 是基准音高，noteDefinitions 是后续音高定义
                regs = []
                fp = inst.firstPitch
                for i, nd in enumerate(inst.noteDefinitions):
                    regs.append({
                        'key': fp + i,
                        'swav': getattr(nd, 'waveID', 0),
                        'att': nd.attack, 'dec': nd.decay, 'sus': nd.sustain, 'rel': nd.release,
                        'pan': getattr(nd, 'pan', 0),
                        'warID': getattr(nd, 'waveArchiveIDID', 0),
                    })
                insts.append({'t': 'range', 'firstPitch': fp, 'regs': regs})
            elif cname == 'SingleNoteInstrument':  # type 0x01-0x0F
                regs = [{'swav': getattr(inst, 'waveID', 0),
                         'root': getattr(inst, 'pitch', 60),
                         'att': getattr(inst, 'attack', 0),
                         'dec': getattr(inst, 'decay', 0),
                         'sus': getattr(inst, 'sustain', 0),
                         'rel': getattr(inst, 'release', 0),
                         'warID': getattr(inst, 'waveArchiveIDID', 0)}]
                insts.append({'t': 'single', 'regs': regs})
            else:
                insts.append(None)
    except Exception as ex:
        print(f'  bank {bname} 解析失败: {ex}')
        continue
    banks_out[bname] = {'file': sbnk.dataMergeOptimizationID, 'instruments': insts}
    print(f'  {bname}: file_{sbnk.dataMergeOptimizationID:03d} 乐器 {len(insts)}')
json.dump(banks_out, open(f'{BASE}/assets/audio/banks.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('\n完成: bgm_links.json / assets/audio/waves.json / assets/audio/banks.json')
