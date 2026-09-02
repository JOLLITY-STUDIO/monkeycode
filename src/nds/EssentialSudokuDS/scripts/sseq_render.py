#!/usr/bin/env python3
"""SOUND-V0.3: software renderer — SSEQ event flow + ADPCM samples -> BGM WAV.

Closes the audio loop: sseq-playable.json (event flow) + snd-linkage.json
(instrument/sample links) + SWAR raw samples -> mono 16-bit WAV per BGM.

Rendering model (verification-grade, not hi-fi):
  - per track: maintain tempo/volume/expression/instrument state, emit NOTE
    voices on an absolute ms timeline (renderer ms already accounts per-track tempo)
  - per voice: pick nearest def (root note) for the program, read sample PCM,
    step = sampleRate/OUT_RATE * 2^((key-root)/12), loop in [loopOffset,
    loopOffset+loopLength) when loopFlag, simple attack/sustain/release gate
  - mix float mono at OUT_RATE, normalize, write work/wav/bgm/<name>.wav

Usage: python scripts/sseq_render.py [--max-seconds 90]
"""
import argparse
import json
import os
import struct
import sys
import time
import wave

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sdat_common import Sdat, Swar  # noqa: E402
from swav_to_wav import decode_block  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOUND_DIR = os.path.join(ROOT, 'rom-data', 'sound')
OUT_DIR = os.path.join(ROOT, 'work', 'wav', 'bgm')

OUT_RATE = 22050
MASTER_GAIN = 2.8


def load_pcm_cache():
    """Decode every DSWAV in every SWAR into float sample arrays.
    Returns dict: fat -> {swavIdx: {rate, loopFlag, loopOffset, loopLength, pcm}}."""
    sdat = Sdat()
    cache = {}
    for fat in (12, 13):
        raw = sdat.file_bytes(fat)
        if raw[0:4] != b'SWAR':
            continue
        sw = Swar(raw, fat)
        per = {}
        for i in range(sw.n):
            meta = sw.sample(i)
            data = raw[meta['dataOff']:meta['dataOff'] + meta['dataSize']]
            pcm = decode_block(meta['waveType'], data)
            if not pcm:
                continue
            loff = meta['loopOffset']
            llen = meta['loopLength']
            n = len(pcm)
            if loff >= n or loff + llen > n:
                loff = 0
                llen = 0
            if llen == 0:
                llen = n - loff  # whole tail loop only when loopFlag set later
            per[i] = {'rate': meta['rate'] or 11025, 'loopFlag': meta['loopFlag'],
                      'loopOffset': loff, 'loopLength': llen,
                      'pcm': pcm, 'total': n}
        cache[fat] = per
        print(f'[render] decoded {fat}_swar: {len(per)} samples')
    return cache


def build_defmap(linkage, seq_idx):
    """{(bank<<7)|prog: [def,...]} for one sequence."""
    dm = {}
    for s in linkage['sequences']:
        if s['seqIdx'] != seq_idx:
            continue
        for ins in s.get('instruments', []):
            if 'error' in ins:
                continue
            key = (ins['bank'] << 7) | ins['prog']
            dm[key] = ins['defs']
    return dm


def collect_voices(play, dm):
    """Returns (voices, body_ms). Each voice: dict(start_ms,dur_ms,key,gain,def,link)."""
    voices = []
    body_ms = 0.0
    for tk in play['tracks'].values():
        tempo = 120
        vol = 127
        expr = 127
        instr = None
        for e in tk['events']:
            op = e['op']
            args = e.get('args')
            if op == 'TEMPO':
                tempo = max(1, min(240, args[0] if args else 120))
            elif op == 'VOLUME' and args:
                vol = args[0]
            elif op == 'EXPRESSION' and args:
                expr = args[0]
            elif op == 'INSTRUMENT' and args:
                instr = args[0]
            elif op == 'NOTE' and args:
                key, vel, dur = args
                if instr is None:
                    continue
                dur_ms = dur * 60000.0 / (tempo * 48)
                gain = (vel / 127.0) * (vol / 127.0) * (expr / 127.0) * MASTER_GAIN
                voices.append({'ms': e['ms'], 'dur_ms': dur_ms, 'key': key,
                               'gain': gain, 'prog': instr})
            body_ms = max(body_ms, e.get('ms', 0.0))
    return voices, body_ms


def pick_def(defs, key):
    """Nearest root-note def (regional instruments approximate)."""
    if not defs:
        return None
    best = min(defs, key=lambda d: abs(d['note'] - key))
    if not best.get('sample'):
        return None
    return best


def add_voice(buf, meta, root, key, t0_ms, dur_ms, gain):
    """Add one voice into float buffer (mono OUT_RATE)."""
    total = len(buf)
    n0 = int(t0_ms * OUT_RATE / 1000.0)
    if n0 >= total:
        return 0
    n = int(dur_ms * OUT_RATE / 1000.0)
    if n <= 0:
        return 0
    if n0 + n > total:
        n = total - n0
    rate = meta['rate']
    step = (rate / float(OUT_RATE)) * (2.0 ** ((key - root) / 12.0))
    if step <= 1e-9:
        return 0
    src = meta['pcm']
    src_len = meta['total']
    loop = meta['loopFlag'] and meta['loopLength'] > 0
    loff = meta['loopOffset'] if loop else src_len
    llen = meta['loopLength'] if loop else 0
    # gate split
    A = min(int(0.004 * OUT_RATE), max(1, n // 8))
    R = min(int(0.030 * OUT_RATE), max(0, n // 2))
    if A + R > n:
        A = n // 2
        R = n - A
    S = n - A - R
    pos = 0.0
    i = 0
    j = n0
    bufj = buf
    # attack
    end = min(A, n)
    while i < end and j < total:
        pi = int(pos)
        if pi >= src_len:
            break
        bufj[j] += src[pi] * gain * (i / float(A))
        pos += step
        i += 1
        j += 1
    # sustain (looping aware)
    end = min(A + S, n)
    while i < end and j < total:
        pi = int(pos)
        if loop:
            if pos >= loff + llen:
                pos = loff + (pos - loff) % llen
                pi = int(pos)
        elif pi >= src_len:
            break
        bufj[j] += src[pi] * gain
        pos += step
        i += 1
        j += 1
    # release
    end = n
    while i < end and j < total:
        pi = int(pos)
        if pi >= src_len:
            break
        bufj[j] += src[pi] * gain * ((n - i) / float(R)) if R else 0.0
        pos += step
        i += 1
        j += 1
    return i


def normalize_trim(buf, tail_ms=200):
    """Peak-normalize to 0.9 and trim leading/trailing silence."""
    nz = [i for i, v in enumerate(buf) if abs(v) > 0.002]
    if not nz:
        return buf, 0
    peak = max(abs(v) for v in buf)
    if peak > 0:
        sc = 0.9 / peak
        buf = [v * sc for v in buf]
    a = max(0, nz[0] - int(0.05 * OUT_RATE))
    b = min(len(buf), nz[-1] + int(tail_ms / 1000.0 * OUT_RATE))
    return buf[a:b], a


def write_wav(path, buf, sample_rate):
    data = struct.pack('<%dh' % len(buf),
                       *(max(-32767, min(32767, int(v * 32767))) for v in buf))
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sample_rate)
        w.writeframes(data)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--max-seconds', type=float, default=90.0)
    ap.add_argument('--seq', type=int, default=-1, help='only render one seq index')
    args = ap.parse_args()

    plays = json.load(open(os.path.join(SOUND_DIR, 'sseq-playable.json'), encoding='utf-8'))
    linkage = json.load(open(os.path.join(SOUND_DIR, 'snd-linkage.json'), encoding='utf-8'))
    pcm_cache = load_pcm_cache()
    os.makedirs(OUT_DIR, exist_ok=True)
    cap_ms = args.max_seconds * 1000.0

    for play in plays:
        idx = play['index']
        if args.seq >= 0 and idx != args.seq:
            continue
        dm = build_defmap(linkage, idx)
        voices, body_ms = collect_voices(play, dm)
        total_ms = min(body_ms, cap_ms)
        nbuf = int((total_ms + 600) * OUT_RATE / 1000.0)
        buf = [0.0] * nbuf
        rendered = 0
        skipped = 0
        for v in voices:
            if v['ms'] >= total_ms:
                skipped += 1
                continue
            if not dm:
                continue
            defs = dm.get(v['prog'])
            d = pick_def(defs, v['key'])
            if not d:
                skipped += 1
                continue
            smp = d['sample']
            meta = pcm_cache.get(smp['swarFat'], {}).get(smp['swavIdx'])
            if not meta:
                skipped += 1
                continue
            dur = v['dur_ms']
            if v['ms'] + dur > total_ms + 400:
                dur = max(0.0, (total_ms + 400) - v['ms'])
            add_voice(buf, meta, d['note'], v['key'],
                      v['ms'], dur, v['gain'] * d.get('gain', 1.0))
            rendered += 1
        t0 = time.time()
        buf2, off = normalize_trim(buf)
        dur_s = len(buf2) / OUT_RATE
        path = os.path.join(OUT_DIR, f'{play["name"]}.wav')
        write_wav(path, buf2, OUT_RATE)
        print(f'[render] {play["name"]}: body={body_ms/1000:.1f}s cap={total_ms/1000:.1f}s '
              f'voices={len(voices)} rendered={rendered} skipped={skipped} '
              f'wav={dur_s:.1f}s mix={time.time()-t0:.1f}s -> {path}', flush=True)


if __name__ == '__main__':
    main()
