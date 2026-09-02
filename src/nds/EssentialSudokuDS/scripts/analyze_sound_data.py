#!/usr/bin/env python3
"""Comprehensive analysis of the Essential Sudoku DS sound data.

Decodes:
  - SSEQ: opcode histogram + event disasm (GBATEK opcode table, MIDI VLQ durations)
  - SSAR: record/offset table (sound effect sequences)
  - SBNK: instrument records
  - SWAR: sample block headers
Outputs a structured JSON summary used to build the renderer.
"""
import json
import os
import struct
from collections import Counter

BASE = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')

# ---------------------------------------------------------------------------
# SSEQ
# ---------------------------------------------------------------------------

# GBATEK opcode table (https://problemkaputt.de/gbatek.htm#dssoundfilessseqsoundsequence)
SSEQ_OPS = {
    0x80: ('REST', 0),          # duration VLQ follows as operand -> handled specially
    0x81: ('INSTRUMENT', 0),    # bank+program VLQ
    0x82: ('UNK_82', 0),
    0x93: ('TRACK', 4),
    0x94: ('JUMP', 3),
    0x95: ('CALL', 3),
    0x96: ('UNK_96', 0),
    0xA0: ('UNK_A0', 0),
    0xC0: ('PAN', 1),
    0xC1: ('VOLUME', 1),
    0xC2: ('MASTERVOL', 1),
    0xC3: ('TRANSPOSE', 1),
    0xC4: ('PITCHBEND', 1),
    0xC5: ('PITCHBENDRANGE', 1),
    0xC6: ('TRACKPRIO', 1),
    0xC7: ('MONOPOLY', 1),
    0xC8: ('TIE', 1),
    0xC9: ('PORTA_CTRL', 1),
    0xCA: ('MOD_DEPTH', 1),
    0xCB: ('MOD_SPEED', 1),
    0xCC: ('MOD_TYPE', 1),
    0xCD: ('MOD_RANGE', 1),
    0xCE: ('PORTA_ONOFF', 1),
    0xCF: ('PORTA_TIME', 1),
    0xD0: ('ATTACK', 1),
    0xD1: ('DECAY', 1),
    0xD2: ('SUSTAIN', 1),
    0xD3: ('RELEASE', 1),
    0xD4: ('LOOPSTART', 1),
    0xD5: ('EXPRESSION', 1),
    0xD6: ('PRINTVAR', 1),
    0xE0: ('MOD_DELAY', 2),
    0xE1: ('TEMPO', 2),
    0xE3: ('SWEEPPITCH', 2),
    0xFC: ('LOOPEND', 0),
    0xFD: ('RETURN', 0),
    0xFF: ('EOT', 0),
}


def read_vlq(d, i):
    """MIDI-style variable length: b & 0x80 => 2-byte (7+8 bits)."""
    b = d[i]
    if b & 0x80:
        return ((b & 0x7F) << 7) | d[i + 1], i + 2
    return b, i + 1


def sseq_parse_tracks(d):
    """Return (track0_start, {track_no: abs_offset})."""
    for start in range(0x1A, 0x30):
        i = start
        entries = []
        while i + 5 <= len(d) and d[i] == 0x93:
            t = d[i + 1]
            rel = int.from_bytes(d[i + 2:i + 5], 'little')
            entries.append((t, 0x1C + rel))
            i += 5
        if len(entries) >= 1:
            return i, dict(entries)
    return 0x1C, {}


def sseq_events(d, off):
    """Yield (addr, kind, payload, consumed) for a track from off to EOT/FF."""
    i = off
    while i < len(d):
        b = d[i]
        a = i
        if b < 0x80:  # NOTE key,vel,dur(VLQ)
            if i + 4 > len(d):
                yield (a, 'NOTE_TRUNC', b, 1)
                return
            key = b
            vel = d[i + 1]
            dur, i2 = read_vlq(d, i + 2)
            i = i2
            yield (a, 'NOTE', (key, vel, dur), i - a)
        elif b == 0x80:  # REST dur VLQ
            dur, i2 = read_vlq(d, i + 1)
            i = i2
            yield (a, 'REST', dur, i - a)
        elif b == 0x81:  # INSTRUMENT bank+program VLQ
            v, i2 = read_vlq(d, i + 1)
            i = i2
            yield (a, 'INSTRUMENT', v, i - a)
        elif b == 0xFF:
            yield (a, 'EOT', None, 1)
            return
        elif b in SSEQ_OPS:
            name, argc = SSEQ_OPS[b]
            if i + 1 + argc > len(d):
                yield (a, name + '_TRUNC', None, 1)
                return
            args = d[i + 1:i + 1 + argc]
            i += 1 + argc
            yield (a, name, list(args), 1 + argc)
        else:
            yield (a, f'UNKNOWN_{b:02x}', None, 1)
            i += 1
        if i > len(d):
            return


def sseq_header(d):
    magic = d[0:4]
    bom = struct.unpack_from('<H', d, 4)[0]
    version = struct.unpack_from('<H', d, 6)[0]
    fsize = struct.unpack_from('<I', d, 8)[0]
    hsize = struct.unpack_from('<H', d, 12)[0]
    nblk = struct.unpack_from('<H', d, 14)[0]
    return {'magic': magic.decode('latin-1'), 'bom': hex(bom), 'version': hex(version),
            'fsize': fsize, 'hsize': hsize, 'nblk': nblk}


# ---------------------------------------------------------------------------
# SSAR
# ---------------------------------------------------------------------------

def ssar_parse(d):
    out = {'magic': d[0:4].decode('latin-1'), 'fsize': struct.unpack_from('<I', d, 8)[0],
           'hsize': struct.unpack_from('<H', d, 12)[0], 'nblk': struct.unpack_from('<H', d, 14)[0]}
    # DATA sub-block header: +0x18 nDataOffset (u32), +0x1C nRecords (u32)
    ndata, = struct.unpack_from('<I', d, 0x18)
    nrec, = struct.unpack_from('<I', d, 0x1C)
    out['ndata_offset'] = ndata
    out['nrec'] = nrec
    # GBATEK: each record is 12 bytes: nOffset(u32)+bnk(u16)+vol(u8)+cpr(u8)+ppr(u8)+ply(u8)+rsv(u16)
    recs = []
    for i in range(nrec):
        base = 0x20 + i * 12
        noff, bnk, vol, cpr, ppr, ply, rsv = struct.unpack_from('<IHBBBBH', d, base)
        recs.append({'nOffset': noff, 'abs_offset': ndata + noff,
                     'bank': bnk, 'vol': vol, 'cpr': cpr, 'ppr': ppr,
                     'ply': ply, 'reserved': rsv})
    out['records'] = recs
    return out


# ---------------------------------------------------------------------------
# SBNK
# ---------------------------------------------------------------------------

def sbnk_parse(d):
    out = {'magic': d[0:4].decode('latin-1'), 'fsize': struct.unpack_from('<I', d, 8)[0],
           'hsize': struct.unpack_from('<H', d, 12)[0], 'nblk': struct.unpack_from('<H', d, 14)[0]}
    ninstr = struct.unpack_from('<I', d, 0x38)[0]
    out['ninstr'] = ninstr
    recs = []
    for i in range(ninstr):
        rec_off = 0x3C + i * 4
        ftype = d[rec_off]
        noff = struct.unpack_from('<H', d, rec_off + 1)[0]
        recs.append({'ftype': ftype, 'noff': noff})
    out['records'] = recs
    # parse note definitions at each offset
    for r in recs:
        if r['ftype'] == 0:
            r['defs'] = []
            continue
        off = r['noff']
        if r['ftype'] == 16:  # range: lower, upper, then entries (each 12 bytes)
            lo, hi = d[off], d[off + 1]
            r['range'] = [lo, hi]
            ndefs = []
            p = off + 2
            while p + 12 <= len(d) and (lo + len(ndefs)) <= hi:
                w = struct.unpack_from('<H', d, p + 0)[0]
                s = struct.unpack_from('<H', d, p + 2)[0]
                ndefs.append({'swav': w, 'swar': s, 'note': d[p + 4],
                              'atk': d[p + 5], 'dec': d[p + 6], 'sus': d[p + 7],
                              'rel': d[p + 8], 'pan': d[p + 9]})
                p += 12
            r['defs'] = ndefs
        elif r['ftype'] == 17:  # regional
            ends = list(d[off:off + 8])
            ndefs = []
            p = off + 8
            while p + 12 <= len(d) and len(ndefs) < 8 and ends[len(ndefs)] != 0:
                w = struct.unpack_from('<H', d, p + 0)[0]
                s = struct.unpack_from('<H', d, p + 2)[0]
                ndefs.append({'swav': w, 'swar': s, 'note': d[p + 4],
                              'atk': d[p + 5], 'dec': d[p + 6], 'sus': d[p + 7],
                              'rel': d[p + 8], 'pan': d[p + 9]})
                p += 12
            r['defs'] = ndefs
            r['region_ends'] = ends
        else:  # ftype 1..4: single def (10 bytes)
            p = off
            w = struct.unpack_from('<H', d, p + 0)[0]
            s = struct.unpack_from('<H', d, p + 2)[0]
            r['defs'] = [{'swav': w, 'swar': s, 'note': d[p + 4],
                          'atk': d[p + 5], 'dec': d[p + 6], 'sus': d[p + 7],
                          'rel': d[p + 8], 'pan': d[p + 9]}]
    return out


# ---------------------------------------------------------------------------
# SWAR
# ---------------------------------------------------------------------------

def swar_parse(d):
    out = {'magic': d[0:4].decode('latin-1'), 'fsize': struct.unpack_from('<I', d, 8)[0],
           'hsize': struct.unpack_from('<H', d, 12)[0], 'nblk': struct.unpack_from('<H', d, 14)[0]}
    n = struct.unpack_from('<I', d, 0x38)[0]
    out['nsamples'] = n
    offs = [struct.unpack_from('<I', d, 0x3C + i * 4)[0] for i in range(n)]
    out['offsets'] = offs
    blocks = []
    for i, o in enumerate(offs):
        end = offs[i + 1] if i + 1 < n else len(d)
        # GBATEK DSWAV block header (12 bytes):
        #   +0 waveType(u8) +1 loopFlag(u8) +2 sampleRate(u16) +4 time(u16)
        #   +6 loopOffset(u16) +8 loopLength(u32) +0xC data
        wtype, loop, rate, tm, loff, llen = struct.unpack_from('<BBHHHI', d, o)
        blocks.append({'idx': i, 'off': o, 'type': wtype, 'looped': loop,
                       'rate': rate, 'time': tm, 'loop_offset': loff,
                       'loop_length': llen, 'bytes': end - o,
                       'data_bytes': max(0, end - (o + 0x0C))})
    out['blocks'] = blocks
    return out


# ---------------------------------------------------------------------------

def main():
    summary = {}
    for f in sorted(os.listdir(BASE)):
        p = os.path.join(BASE, f)
        d = open(p, 'rb').read()
        magic = d[0:4].decode('latin-1', 'replace')
        if magic == 'SSEQ':
            hdr = sseq_header(d)
            t0, tracks = sseq_parse_tracks(d)
            hdr['track0'] = t0
            hdr['tracks'] = {k: v for k, v in sorted(tracks.items())}
            # opcode histogram over all track data
            cnt = Counter()
            samples = {}
            for tn, off in list(tracks.items()) + [(0, t0)]:
                evs = list(sseq_events(d, off))
                for addr, kind, payload, n in evs:
                    cnt[kind] += 1
                    if kind in ('NOTE', 'REST', 'INSTRUMENT') and tn not in samples:
                        samples[tn] = (kind, payload)
            hdr['event_hist'] = dict(cnt.most_common(30))
            hdr['sample_events'] = samples
            summary[f] = hdr
        elif magic == 'SSAR':
            summary[f] = ssar_parse(d)
        elif magic == 'SBNK':
            summary[f] = sbnk_parse(d)
        elif magic == 'SWAR':
            summary[f] = swar_parse(d)
        else:
            summary[f] = {'magic': magic, 'size': len(d)}

    out = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'sound-summary.json')
    with open(out, 'w') as fp:
        json.dump(summary, fp, indent=1)
    print('wrote', out)

    # print quick digest
    for f, s in summary.items():
        if s.get('magic') == 'SSEQ':
            print(f'{f}: tracks={s["tracks"]} t0={s["track0"]:#x} '
                  f'events={s["event_hist"]}')
        elif s.get('magic') == 'SBNK':
            print(f'{f}: ninstr={s["ninstr"]} ftypes={[r["ftype"] for r in s["records"]][:20]}')
        elif s.get('magic') == 'SWAR':
            print(f'{f}: nsamples={s["nsamples"]} types={[b["type"] for b in s["blocks"]]}')
        elif s.get('magic') == 'SSAR':
            print(f'{f}: nrec={s["nrec"]} recs={s["records"]}')


if __name__ == '__main__':
    main()
