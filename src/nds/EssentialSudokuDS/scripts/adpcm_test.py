#!/usr/bin/env python3
"""Verify IMA-ADPCM decode of SWAR blocks using ndspy-corrected layout.

SWAR block layout (per ndspy.soundWave):
  +0x00: waveType  (u8)  2 = ADPCM
  +0x01: isLooped  (u8)
  +0x02: sampleRate(u16)
  +0x04: time      (u16)  loop start (samples)
  +0x06: loopOffset(u16)
  +0x08: loopLength(u32)
  +0x0C: data (ADPCM: predictor s16 + stepIndex u8 + reserved u8 + nibbles)
"""
import os
import struct

BASE = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')

STEP = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45,
        50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230,
        253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963,
        1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327,
        3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442,
        11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794,
        32767]
IDX = [-1, -1, -1, -1, 2, 4, 6, 8]


def decode(data):
    """data = predictor(s16)+stepIndex(u8)+reserved(u8)+nibbles -> samples."""
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


def main():
    f = '12_swar.swar'
    d = open(os.path.join(BASE, f), 'rb').read()
    n = struct.unpack_from('<I', d, 0x38)[0]
    offs = [struct.unpack_from('<I', d, 0x3C + i * 4)[0] for i in range(n)]
    for bi, o in enumerate(offs[:8]):
        end = offs[bi + 1] if bi + 1 < n else len(d)
        hdr = d[o:o + 0x0C]
        wtype, loop, rate, tm, loff, llen = struct.unpack('<B?3HI', hdr)
        data = d[o + 0x0C:end]
        out = decode(data)
        print(f'b{bi}: type={wtype} loop={loop} rate={rate} time={tm} '
              f'loopOff={loff} loopLen={llen} data={len(data)}B samples={len(out)}')
        print('   first16:', out[:16])
        print('   mid16:', out[len(out) // 2:len(out) // 2 + 16])
        print('   min/max:', min(out), max(out))


if __name__ == '__main__':
    main()
