#!/usr/bin/env python3
"""SOUND-V0.5: software renderer — SSEQ event flow + ADPCM samples -> BGM WAV.

Closes the audio loop: sseq-playable.json (event flow) + snd-linkage.json
(instrument/sample links) + SWAR raw samples -> mono 16-bit WAV per BGM.

Rendering model (quality pass over V0.3):
  - per track: maintain tempo/volume/expression/instrument/pitch-bend state,
    emit NOTE voices on an absolute ms timeline; PITCHBEND (0xC4, signed,
    centre 0, ~1/64 semitone per unit) and PITCHRANGE (0xC5, semitones,
    default 2) shift the effective key so SEQ_04's 372 glides sound right
  - per voice: pick nearest def (root note) for the program, read sample PCM,
    step = sampleRate/OUT_RATE * 2^((key-root)/12), loop in [loopOffset,
    loopOffset+loopLength) when loopFlag; linear interpolation while resampling
    (removes the V0.3 point-sampling aliasing), envelope driven by the SBNK
    ADSR params (attack/decay/sustain/release each 0..127, 127=fastest) with
    a small hard fade at the very end to kill clicks
  - mix float mono at OUT_RATE (44100, decimation to MP3 is a clean 2:1),
    normalize, write work/wav/bgm/<name>.wav

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

OUT_RATE = 44100
MASTER_GAIN = 1.4
SAMPLE_RATE = 32768  # DS master clock; used for rough ADSR second estimates
DEFAULT_PITCH_RANGE = 2  # semitones per full pitch-bend (default unless 0xC5)


def keys_of(defs):
    """Best (root, fallback) note candidates from a def list (sorted by closeness to 60)."""
    if not defs:
        return []
    return sorted((d for d in defs if d.get('sample')), key=lambda d: abs(d['note'] - 60))


def adsr_of(d):
    """Rough seconds for SBNK ADSR (rate 0..127, 127 = fastest).
    Mapping is log-ish: time = BASE * 2 ** ((127 - rate) / 21.0)."""
    atk, dec, sus, rel = d['adsr']
    return (2 ** ((127 - atk) / 21.0) * 0.004,
            2 ** ((127 - dec) / 21.0) * 0.03,
            sus / 127.0,
            2 ** ((127 - rel) / 21.0) * 0.05)


def load_pcm_cache():
    """Decode every DSWAV in every SWAR into float sample arrays.
    GBATEK dswav: loopOffset/soundLength are in 4-byte units; for IMA-ADPCM
    one 4-byte unit = 8 samples (2 nibbles/byte). Returns dict:
    fat -> {swavIdx: {rate, loopStart, loopEnd, pcm}} in *samples*."""
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
            n = len(pcm)
            # 4-byte units -> samples (ADPCM 8 / PCM16 2 / PCM8 4)
            wt = meta['waveType']
            unit = 8 if wt == 2 else (2 if wt == 1 else 4)
            loff = meta['loopOffset'] * unit
            lend = (meta['loopOffset'] + meta['loopLength']) * unit
            loop = bool(meta['loopFlag']) and 0 < loff < n and lend > loff
            if loop:
                if loff >= n:
                    loff = 0
                    lend = 0
                else:
                    lend = min(lend, n)
            per[i] = {'rate': meta['rate'] or 32768, 'loopFlag': meta['loopFlag'],
                      'loopStart': loff if loop else n,
                      'loopEnd': lend if loop else n,
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
    """Returns (voices, body_ms). Each voice: dict(start_ms,dur_ms,key,gain,prog,pan).
    Pitch-bend glides: SSEQ bends the *pitch offset*, not the gate duration, so a
    long note whose bend changes mid-way is kept intact here; the slight pitch
    offset between consecutive 0xC4 updates on the same note is approximated by
    the bend at note start (glide interior is not yet re-synthesized)."""
    voices = []
    body_ms = 0.0
    global_tempo = play.get('tempo', 120)  # NDS SSEQ: track0 导演轨设全局 tempo
    for tk in play['tracks'].values():
        tempo = global_tempo
        vol = 127
        expr = 127
        pan = 64
        instr = None
        bend = 0.0          # signed, in semitones (0xC4 raw is signed, 1/64 semitone each)
        for e in tk['events']:
            op = e['op']
            args = e.get('args')
            if op == 'TEMPO':
                tempo = max(1, min(240, args[0] if args else 120))
            elif op == 'VOLUME' and args:
                vol = args[0]
            elif op == 'EXPRESSION' and args:
                expr = args[0]
            elif op == 'PAN' and args:
                pan = max(0, min(127, args[0]))
            elif op == 'INSTRUMENT' and args:
                instr = args[0]
            elif op == 'PITCHBEND' and args:
                raw = args[0]
                if raw > 127:
                    raw -= 256
                bend = raw / 64.0
            elif op == 'NOTE' and args:
                key, vel, dur = args
                if instr is None:
                    continue
                k_eff = key + bend
                dur_ms = dur * 60000.0 / (tempo * 48)
                gain = (vel / 127.0) * (vol / 127.0) * (expr / 127.0) * MASTER_GAIN
                voices.append({'ms': e['ms'], 'dur_ms': dur_ms, 'key': k_eff,
                               'gain': gain, 'prog': instr, 'pan': pan})
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


def _mix_voice(buf, meta, root, key, t0_ms, dur_ms, gain):
    """Add one voice into one float channel buffer (OUT_RATE)."""
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
    # GBATEK dswav loop: loopOffset/length were 4-byte units -> samples done in
    # load_pcm_cache. Loop covers the one-shot head then sustains [start, end).
    lstart = meta['loopStart']
    lend = meta['loopEnd']
    loop = lstart < src_len and lend > lstart
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
    # attack (one-shot head, no loop yet)
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
            if pos >= lend:
                pos = lstart + (pos - lstart) % (lend - lstart)
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


def _pan_gains(pan):
    """NDS pan 0..127 (64=center) -> equal-power stereo gains."""
    p = (max(0, min(127, pan or 64)) - 64) / 64.0   # -1..+1
    import math
    ang = (p + 1) * math.pi / 4.0
    return math.cos(ang), math.sin(ang)


def add_voice(buf_l, buf_r, meta, root, key, t0_ms, dur_ms, gain, pan=64):
    """Add one voice, stereo split by pan."""
    gl, gr = _pan_gains(pan)
    _mix_voice(buf_l, meta, root, key, t0_ms, dur_ms, gain * gl)
    _mix_voice(buf_r, meta, root, key, t0_ms, dur_ms, gain * gr)


def normalize_trim(buf_l, buf_r, tail_ms=200):
    """Peak-normalize to 0.9 and trim leading/trailing silence (stereo)."""
    nz = [i for i, v in enumerate(buf_l) if abs(v) > 0.002]
    nz += [i for i, v in enumerate(buf_r) if abs(v) > 0.002]
    if not nz:
        return buf_l, buf_r, 0
    a0, b0 = min(nz), max(nz)
    peak = max(max(abs(v) for v in buf_l), max(abs(v) for v in buf_r))
    if peak > 0:
        sc = 0.9 / peak
        buf_l = [v * sc for v in buf_l]
        buf_r = [v * sc for v in buf_r]
    a = max(0, a0 - int(0.05 * OUT_RATE))
    b = min(len(buf_l), b0 + int(tail_ms / 1000.0 * OUT_RATE))
    return buf_l[a:b], buf_r[a:b], a


def write_wav(path, buf_l, buf_r, sample_rate):
    n = len(buf_l)
    data = struct.pack('<%dh' % (n * 2), *sum(
        ([max(-32767, min(32767, int(buf_l[i] * 32767))),
          max(-32767, min(32767, int(buf_r[i] * 32767)))] for i in range(n)), []))
    with wave.open(path, 'wb') as w:
        w.setnchannels(2)
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
        buf_l = [0.0] * nbuf
        buf_r = [0.0] * nbuf
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
            add_voice(buf_l, buf_r, meta, d['note'], v['key'],
                      v['ms'], dur, v['gain'] * d.get('gain', 1.0),
                      v.get('pan', 64))
            rendered += 1
        t0 = time.time()
        buf2l, buf2r, off = normalize_trim(buf_l, buf_r)
        dur_s = len(buf2l) / OUT_RATE
        path = os.path.join(OUT_DIR, f'{play["name"]}.wav')
        write_wav(path, buf2l, buf2r, OUT_RATE)
        print(f'[render] {play["name"]}: body={body_ms/1000:.1f}s cap={total_ms/1000:.1f}s '
              f'voices={len(voices)} rendered={rendered} skipped={skipped} '
              f'wav={dur_s:.1f}s mix={time.time()-t0:.1f}s -> {path}', flush=True)


if __name__ == '__main__':
    main()
