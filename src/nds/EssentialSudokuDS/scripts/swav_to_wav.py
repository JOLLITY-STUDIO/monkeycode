#!/usr/bin/env python3
"""Decode every DSWAV sample block from all SWAR banks to WAV files.

Layout per GBATEK (dswav):
  +0x00 waveType  (u8)  0=PCM8 1=PCM16 2=IMA-ADPCM 3=PSG(no data)
  +0x01 loopFlag  (u8)
  +0x02 sampleRate(u16)
  +0x04 time      (u16) loop start point (samples)
  +0x06 loopOffset(u16) loop offset
  +0x08 loopLength(u32) loop length
  +0x0C data
    ADPCM data: predictor(s16) + stepIndex(u8) + reserved(u8) + 4-bit nibbles
Output: work/wav/<swar>_b<idx>.wav
"""
import os
import struct
import sys
import wave

BASE = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')
OUT = os.path.join(os.path.dirname(__file__), '..', 'work', 'wav')

STEP = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45,
        50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230,
        253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963,
        1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327,
        3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442,
        11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794,
        32767]
IDX = [-1, -1, -1, -1, 2, 4, 6, 8]


def decode_adpcm(data):
    pred = int.from_bytes(data[0:2], 'little', signed=True)
    idx = data[2]
    out = []
    i = 4
    while i < len(data):
        b = data[i]
        for k in range(2):
            nib = (b >> (4 * k)) & 0xF
            code = nib & 7
            step = STEP[idx]
            diff = ((2 * code + 1) * step) // 8
            if nib & 8:
                diff = -diff
            pred += diff
            pred = max(-32768, min(32767, pred))
            idx += IDX[code]
            idx = max(0, min(88, idx))
            out.append(pred)
        i += 1
    return out


def decode_block(wtype, data):
    """Return list of 16-bit samples for waveType 0/1/2."""
    if wtype == 0:  # PCM8 -> sign-extend
        return [(b - 128) << 8 for b in data]
    if wtype == 1:  # PCM16 LE
        return list(struct.unpack('<%dh' % (len(data) // 2), data[:len(data) // 2 * 2]))
    if wtype == 2:  # IMA-ADPCM
        return decode_adpcm(data)
    return []  # PSG / unknown


def main():
    os.makedirs(OUT, exist_ok=True)
    total = 0
    for f in sorted(os.listdir(BASE)):
        if not f.endswith('.swar'):
            continue
        d = open(os.path.join(BASE, f), 'rb').read()
        n = struct.unpack_from('<I', d, 0x38)[0]
        offs = [struct.unpack_from('<I', d, 0x3C + i * 4)[0] for i in range(n)]
        for bi, o in enumerate(offs):
            end = offs[bi + 1] if bi + 1 < n else len(d)
            wtype, loop, rate, tm, loff, llen = struct.unpack_from('<BBHHHI', d, o)
            if rate == 0:
                rate = 32768  # fallback
            data = d[o + 0x0C:end]
            samples = decode_block(wtype, data)
            if not samples:
                print(f'{f} b{bi}: type={wtype} skipped (no playable data)')
                continue
            out = os.path.join(OUT, f'{os.path.splitext(f)[0]}_b{bi:02d}.wav')
            with wave.open(out, 'wb') as w:
                w.setnchannels(1)
                w.setsampwidth(2)
                w.setframerate(rate)
                w.writeframes(struct.pack('<%dh' % len(samples), *samples))
            total += 1
            print(f'{f} b{bi:02d}: type={wtype} loop={loop} rate={rate} '
                  f'samples={len(samples)} ({len(samples) / rate:.2f}s) -> {out}')
    print(f'\nwrote {total} wav files to {OUT}')


if __name__ == '__main__':
    sys.exit(main())
