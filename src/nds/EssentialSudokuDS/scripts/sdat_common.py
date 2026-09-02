#!/usr/bin/env python3
"""Shared SDAT/MaxMod parser (SOUND-V0.2). Self-contained, no deps.

Covers: SDAT header + FAT + INFO + SYMB, SSEQ, SSAR, SBNK, SWAR/DSWAV.
All offsets are absolute-in-file after load. See docs/SOUND_DATA_REPORT.md.
"""
import os
import struct

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SDAT_PATH = os.path.join(ROOT, 'rom-data', 'extracted', 'sdat', 'sound_data.sdat')
FILES_DIR = os.path.join(ROOT, 'rom-data', 'extracted', 'sdat', 'files')


def _cstr(d, off):
    j = d.find(b'\x00', off)
    if j < 0:
        return ''
    return d[off:j].decode('ascii', 'replace')


class Sdat:
    """Parsed SDAT container."""

    def __init__(self, path=SDAT_PATH):
        self.path = path
        self.d = open(path, 'rb').read()
        assert self.d[0:4] == b'SDAT', f'bad magic {self.d[0:4]}'
        # header block table
        h = self.d
        self.symb = {'off': struct.unpack_from('<I', h, 0x10)[0],
                     'size': struct.unpack_from('<I', h, 0x14)[0]}
        self.info = {'off': struct.unpack_from('<I', h, 0x18)[0],
                     'size': struct.unpack_from('<I', h, 0x1C)[0]}
        self.fat = {'off': struct.unpack_from('<I', h, 0x20)[0],
                    'size': struct.unpack_from('<I', h, 0x24)[0]}
        self.fileb = {'off': struct.unpack_from('<I', h, 0x28)[0],
                      'size': struct.unpack_from('<I', h, 0x2C)[0]}
        # FAT: n + (off, size, zero[8]) each
        fo = self.fat['off']
        self.nfiles = struct.unpack_from('<I', h, fo + 8)[0]
        self.fat_entries = []
        p = fo + 0x0C
        for i in range(self.nfiles):
            off, size = struct.unpack_from('<II', h, p + i * 16)
            self.fat_entries.append((off, size))
        self._info_off = None
        self._symb_off = None

    # ---------- files ----------
    def file_bytes(self, idx):
        off, size = self.fat_entries[idx]
        return self.d[off:off + size]

    def load_file(self, idx):
        """Return parsed file object by FAT index (subclass dict)."""
        magic = self.file_bytes(idx)[0:4]
        if magic == b'SSEQ':
            return Sseq(self.file_bytes(idx), file_idx=idx)
        if magic == b'SSAR':
            return Ssar(self.file_bytes(idx), file_idx=idx)
        if magic == b'SBNK':
            return Sbnk(self.file_bytes(idx), file_idx=idx)
        if magic == b'SWAR':
            return Swar(self.file_bytes(idx), file_idx=idx)
        raise ValueError(f'unknown file magic {magic} idx={idx}')

    # ---------- INFO ----------
    def info_lists(self):
        """Return dict listname -> list of raw entry bytes."""
        d = self.d
        io = self.info['off']
        names = ['SEQ', 'SSAR', 'BANK', 'SWAR', 'Player', 'Group', 'Player2', 'STRM']
        rels = {}
        for i, n in enumerate(names):
            rels[n] = struct.unpack_from('<I', d, io + 8 + i * 4)[0]
        out = {}
        for n, rel in rels.items():
            o = io + rel
            cnt = struct.unpack_from('<I', d, o)[0]
            if cnt > 1000:
                out[n] = []
                continue
            offs = [struct.unpack_from('<I', d, o + 4 + i * 4)[0] for i in range(cnt)]
            # entry size depends on type; grab up to 12 bytes each (max entry)
            entries = []
            for eo in offs:
                entries.append(d[io + eo:io + eo + 12])
            out[n] = entries
        return out

    # ---------- SYMB ----------
    def symb_tables(self):
        """Return dict listname -> list[str] (names). SSAR list -> folder tuples."""
        d = self.d
        so = self.symb['off']
        names = ['SEQ', 'SSAR', 'BANK', 'SWAR', 'Player', 'Group', 'Player2', 'STRM']
        rels = {}
        for i, n in enumerate(names):
            rels[n] = struct.unpack_from('<I', d, so + 8 + i * 4)[0]
        res = {}
        for n, rel in rels.items():
            o = so + rel
            cnt = struct.unpack_from('<I', d, o)[0]
            if cnt > 1000:
                res[n] = []
                continue
            names_ = []
            if n == 'SSAR':
                # folder list: (nameOff, seqListOff) pairs
                for i in range(cnt):
                    no, lo = struct.unpack_from('<II', d, o + 4 + i * 8)
                    folder = _cstr(d, so + no)
                    sub = struct.unpack_from('<I', d, so + lo)[0]
                    subs = []
                    for j in range(min(sub, 500)):
                        s_no = struct.unpack_from('<I', d, so + lo + 4 + j * 4)[0]
                        subs.append(_cstr(d, so + s_no))
                    names_.append((folder, subs))
            else:
                for i in range(cnt):
                    no = struct.unpack_from('<I', d, o + 4 + i * 4)[0]
                    names_.append(_cstr(d, so + no))
            res[n] = names_
        return res


# ================= SSEQ =================

class Sseq:
    def __init__(self, d, file_idx=-1):
        self.d = d
        self.file_idx = file_idx
        assert d[0:4] == b'SSEQ'
        self.fsize = struct.unpack_from('<I', d, 0x08)[0]
        self.nDataOffset = struct.unpack_from('<I', d, 0x18)[0]
        # parse track pointer table
        i = self.nDataOffset
        self.mask = None
        if i + 1 < len(d) and d[i] == 0xFE:
            self.mask = struct.unpack_from('<H', d, i + 1)[0]
            i += 3
        self.tracks = {}  # track_no -> absolute file offset
        while i + 5 <= len(d) and d[i] == 0x93:
            t = d[i + 1]
            rel = int.from_bytes(d[i + 2:i + 5], 'little')
            self.tracks[t] = self.nDataOffset + rel
            i += 5
        self.track0 = i  # absolute offset where track 0 data begins
        if 0 not in self.tracks:
            self.tracks[0] = i


class Ssar:
    def __init__(self, d, file_idx=-1):
        self.d = d
        self.file_idx = file_idx
        assert d[0:4] == b'SSAR'
        self.ndata = struct.unpack_from('<I', d, 0x18)[0]
        self.nrec = struct.unpack_from('<I', d, 0x1C)[0]
        self.records = []
        p = 0x20
        for i in range(self.nrec):
            raw = d[p + i * 12:p + (i + 1) * 12]
            nOff, bnk, vol, cpr, ppr, ply, rsv = struct.unpack_from('<IHBBBBH', raw, 0)
            self.records.append({'nOffset': nOff, 'bank': bnk, 'vol': vol,
                                 'cpr': cpr, 'ppr': ppr, 'ply': ply, 'rsv': rsv,
                                 'abs': self.ndata + nOff})


class Sbnk:
    def __init__(self, d, file_idx=-1):
        self.d = d
        self.file_idx = file_idx
        assert d[0:4] == b'SBNK'
        self.ninstr = struct.unpack_from('<I', d, 0x38)[0]
        self.records = []
        for i in range(self.ninstr):
            p = 0x3C + i * 4
            ftype = d[p]
            noff = struct.unpack_from('<H', d, p + 1)[0]
            self.records.append({'ftype': ftype, 'noff': noff})

    def defs_of(self, idx, raw_bytes=None):
        """Parse instrument idx -> list of def dicts {swav, swar, note, adsr[4], pan}.
        ftype<16: single 10B def. ftype16/17: 12B defs per region.
        """
        rec = self.records[idx]
        d = self.d
        ftype, noff = rec['ftype'], rec['noff']
        if ftype == 0 or noff == 0:
            return []
        defs = []
        if ftype < 16:
            p = noff
            if p + 10 <= len(d):
                swav, swar = struct.unpack_from('<HH', d, p)
                defs.append({'swav': swav, 'swar': swar, 'note': d[p + 4],
                             'adsr': list(d[p + 5:p + 9]), 'pan': d[p + 9]})
            return defs
        # range(16) or regional(17): skip leading bytes then 12B defs
        if ftype == 16:
            hdr = 2
            ends = list(d[noff:noff + 2])
        else:
            hdr = 8
            ends = list(d[noff:noff + 8])
        p = noff + hdr
        n_regions = sum(1 for e in ends if e)
        if ftype == 16:
            lo, hi = ends[0], ends[1] if len(ends) > 1 else 127
            n_regions = max(1, hi - lo + 1)
        for k in range(n_regions):
            q = p + k * 12
            if q + 12 > len(d):
                break
            swav, swar = struct.unpack_from('<HH', d, q + 2)
            defs.append({'swav': swav, 'swar': swar, 'note': d[q + 6],
                         'adsr': list(d[q + 7:q + 11]), 'pan': d[q + 11]})
        return defs


class Swar:
    def __init__(self, d, file_idx=-1):
        self.d = d
        self.file_idx = file_idx
        assert d[0:4] == b'SWAR'
        self.n = struct.unpack_from('<I', d, 0x38)[0]
        self.offsets = [struct.unpack_from('<I', d, 0x3C + i * 4)[0]
                        for i in range(self.n)]

    def sample(self, i):
        """DSWAV block dict."""
        o = self.offsets[i]
        end = self.offsets[i + 1] if i + 1 < self.n else len(self.d)
        wt, loop, rate, time, loff, llen = struct.unpack_from('<BBHHHI', self.d, o)
        return {'waveType': wt, 'loopFlag': loop, 'rate': rate, 'time': time,
                'loopOffset': loff, 'loopLength': llen,
                'dataOff': o + 0x0C, 'dataSize': end - o - 0x0C}


if __name__ == '__main__':
    s = Sdat()
    print(f'SDAT nfiles={s.nfiles}')
    for i, (off, size) in enumerate(s.fat_entries):
        magic = s.file_bytes(i)[0:4].decode('ascii', 'replace')
        print(f'  [{i:2d}] off={off:#x} size={size:#5d} magic={magic}')
    info = s.info_lists()
    print(f'\nINFO counts: ' + ', '.join(f'{k}={len(v)}' for k, v in info.items()))
    print('SEQ entries:', [(i, e[:4].hex()) for i, e in enumerate(info['SEQ'])])
    print('BANK entries:', [(i, e.hex(' ')) for i, e in enumerate(info['BANK'])])
    sym = s.symb_tables()
    print('\nSYMB:')
    for k, v in sym.items():
        if k == 'SSAR':
            print(f'  {k}: ' + '; '.join(f'{f}[{len(sub)}]' for f, sub in v))
        else:
            print(f'  {k}: {v}')
