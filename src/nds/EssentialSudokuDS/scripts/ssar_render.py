#!/usr/bin/env python3
"""SOUND-V0.3: render the 30 SSAR SFX records to individual WAV files.

Each SSAR record is a 6-byte mini-SEQ: `81 <prog> 3c 7f 00 ff` =
INSTRUMENT <prog> (bank from record header = 1 -> 11_sbnk) + NOTE key 60
vel 127 + EOT.  We resolve 11_sbnk[prog] defs -> WAVE_SE (13_swar) sample
and play one audible note per record.

Output: work/wav/se/<name>.wav (mono 16-bit, OUT_RATE Hz)
"""
import json
import os
import struct
import sys
import wave

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sdat_common import Sdat, Sbnk, Ssar  # noqa: E402
from sseq_render import OUT_RATE, MASTER_GAIN, load_pcm_cache, write_wav, normalize_trim, add_voice  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'work', 'wav', 'se')
KEY = 60          # note key encoded in every SSAR record
VEL = 127
MAX_SE_MS = 1000  # audible length cap for looped samples


def main():
    sdat = Sdat()
    ss = Ssar(sdat.file_bytes(9), 9)
    info = sdat.info_lists()
    sym = sdat.symb_tables()
    subs = sym['SSAR'][0][1] if sym['SSAR'] else []
    # WAVE_SE swar file: INFO SWAR list idx (from BANK[1] entry swars[0])
    bank_raw = info['BANK'][1]
    swars = [int.from_bytes(bank_raw[4 + j * 2:6 + j * 2], 'little') for j in range(4)]
    sw_list = swars[0]
    se_fat = int.from_bytes(info['SWAR'][sw_list][0:2], 'little') if sw_list < len(info['SWAR']) else 13
    sbnk = Sbnk(sdat.file_bytes(11), 11)
    pcm_cache = load_pcm_cache()
    os.makedirs(OUT_DIR, exist_ok=True)

    resolved = 0
    empty = 0
    for i, r in enumerate(ss.records):
        raw = sdat.file_bytes(9)
        payload = raw[r['abs']:r['abs'] + 12]
        prog = payload[1] if len(payload) >= 2 and payload[0] == 0x81 else None
        name = subs[i] if i < len(subs) else f'se{i:02d}'
        if prog is None or prog >= sbnk.ninstr:
            print(f'[{i:02d}] {name}: skip (no instrument prog={prog})', flush=True)
            empty += 1
            continue
        defs = sbnk.defs_of(prog)
        d = None
        if defs:
            d = min(defs, key=lambda x: abs(x['note'] - KEY))
        if not d:
            print(f'[{i:02d}] {name}: prog={prog} no usable def', flush=True)
            empty += 1
            continue
        meta = pcm_cache.get(se_fat, {}).get(d['swav'])
        if not meta:
            print(f'[{i:02d}] {name}: prog={prog} swav={d["swav"]} not in {se_fat}_swar', flush=True)
            empty += 1
            continue
        # audible length: one-shot = sample length + tail; loop = cap
        if meta['loopFlag'] and meta['loopLength'] > 0:
            dur_ms = float(MAX_SE_MS)
        else:
            dur_ms = min(meta['total'] / float(meta['rate']) * 1000.0 + 120.0, 1500.0)
        n = int((dur_ms + 300) * OUT_RATE / 1000.0)
        buf = [0.0] * n
        gain = (VEL / 127.0) * (r['vol'] / 127.0) * MASTER_GAIN
        add_voice(buf, meta, d['note'], KEY, 0.0, dur_ms, gain)
        buf2, _ = normalize_trim(buf)
        if len(buf2) < OUT_RATE // 100:
            print(f'[{i:02d}] {name}: prog={prog} silent', flush=True)
            empty += 1
            continue
        path = os.path.join(OUT_DIR, f'{i:02d}_{name}.wav')
        write_wav(path, buf2, OUT_RATE)
        resolved += 1
        print(f'[{i:02d}] {name}: prog={prog} def_note={d["note"]} swav={d["swav"]} '
              f'({meta["rate"]}Hz) dur={dur_ms:.0f}ms -> {path}', flush=True)
    print(f'\n[ssar] rendered {resolved} / {len(ss.records)} SE records '
          f'(empty/skip={empty}) to {OUT_DIR}', flush=True)


if __name__ == '__main__':
    main()
