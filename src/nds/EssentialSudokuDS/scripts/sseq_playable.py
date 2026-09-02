#!/usr/bin/env python3
"""SOUND-V0.2.2: SSEQ full disasm -> playable event-flow JSON.

For each of the 9 BGM SSEQ files:
  - resolve track pointer table (mask + 0x93 TRACK entries)
  - parse every track with the GBATEK command table, tracking tempo (0xE1)
    and building a tick + millisecond timeline
  - expand CALL (0x95) bodies inline (subroutine recursion, RETURN stops),
    annotate backward JUMP (0x94) as loop point, EOT (0xFF) as track end

Output: rom-data/sound/sseq-playable.json
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sdat_common import Sdat, Sseq  # noqa: E402

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   'rom-data', 'sound', 'sseq-playable.json')

# GBATEK SSEQ command table. argc<0 => VLQ argument follows.
OPS = {
    0x80: ('REST', -1), 0x81: ('INSTRUMENT', -1),
    0x93: ('TRACK', 4), 0x94: ('JUMP', 3), 0x95: ('CALL', 3),
    0xC0: ('PAN', 1), 0xC1: ('VOLUME', 1), 0xC2: ('MASTERVOL', 1),
    0xC3: ('TRANSPOSE', 1), 0xC4: ('PITCHBEND', 1), 0xC5: ('PITCHRANGE', 1),
    0xC6: ('TRACKPRIO', 1), 0xC7: ('MONO', 1), 0xC8: ('TIE', 1),
    0xC9: ('PORTACTRL', 1), 0xCA: ('MODDEPTH', 1), 0xCB: ('MODSPEED', 1),
    0xCC: ('MODTYPE', 1), 0xCD: ('MODRANGE', 1), 0xCE: ('PORTAONOFF', 1),
    0xCF: ('PORTATIME', 1), 0xD0: ('ATTACK', 1), 0xD1: ('DECAY', 1),
    0xD2: ('SUSTAIN', 1), 0xD3: ('RELEASE', 1), 0xD4: ('LOOPSTART', 1),
    0xD5: ('EXPRESSION', 1), 0xD6: ('PRINTVAR', 1),
    0xE0: ('MODDELAY', 2), 0xE1: ('TEMPO', 2), 0xE3: ('SWEEPPITCH', 2),
    0xFC: ('LOOPEND', 0), 0xFD: ('RETURN', 0), 0xFE: ('TRACKMASK', 2),
    0xFF: ('EOT', 0),
}

DEFAULT_TEMPO = 120
MAX_STEPS = 500000


def read_vlq(d, i):
    b = d[i]
    if b & 0x80:
        return ((b & 0x7F) << 8) | d[i + 1], i + 2
    return b, i + 1


def decode_cmd(d, base, off):
    """Decode one command at off.
    Returns (name, args, next_off, ctl) with ctl in
    {'note','rest','jump','call','ret','eot','end','unk','plain'}.
    JUMP/CALL args[0] = absolute target (base + rel24)."""
    if off >= len(d):
        return 'EOT', [], len(d), 'end'
    b = d[off]
    if b < 0x80:
        if off + 2 > len(d):
            return 'EOT', [], len(d), 'end'
        vel = d[off + 1]
        dur, ni = read_vlq(d, off + 2)
        return 'NOTE', [b, vel, dur], ni, 'note'
    if b in (0x80, 0x81):
        val, ni = read_vlq(d, off + 1)
        name = OPS[b][0]
        return name, [val], ni, 'rest' if b == 0x80 else 'plain'
    if b in (0x94, 0x95):
        rel = int.from_bytes(d[off + 1:off + 4], 'little')
        name = OPS[b][0]
        return name, [base + rel], off + 4, 'jump' if b == 0x94 else 'call'
    name, argc = OPS.get(b, (f'UNK_{b:02x}', 0))
    if name.startswith('UNK_'):
        return name, [], off + 1, 'unk'
    if off + 1 + argc > len(d):
        return 'EOT', [], len(d), 'end'
    args = [int(x) for x in d[off + 1:off + 1 + argc]]
    ctl = 'eot' if b == 0xFF else ('ret' if b == 0xFD else 'plain')
    return name, args, off + 1 + argc, ctl


class TrackRenderer:
    """Render one track into a playable linear event flow (one loop pass)."""

    def __init__(self, d, base):
        self.d = d
        self.base = base
        self.events = []
        self.tick = 0
        self.tempo = DEFAULT_TEMPO
        self.loop = None
        self.end_off = None

    def _ms(self):
        return round(self.tick * 60000.0 / (self.tempo * 48), 3)

    def _emit(self, op, off, args=None):
        e = {'off': off, 'op': op, 'tick': self.tick, 'ms': self._ms()}
        if args is not None:
            e['args'] = args
        self.events.append(e)
        return e

    def _adv(self, dur):
        e = self.events[-1]
        e['dur'] = dur
        self.tick += dur
        return e

    def step(self, name, args, off, ctl):
        """Emit + apply one decoded command. Returns True to continue."""
        if ctl == 'note':
            self._emit('NOTE', off, args=args)
            self._adv(args[2])
            return True
        if ctl == 'rest':
            self._emit('REST', off, args=[args[0]])
            self._adv(args[0])
            return True
        if name == 'TEMPO':
            e = self._emit('TEMPO', off, args=args)
            v = args[0] if args else DEFAULT_TEMPO
            self.tempo = max(1, min(240, v))
            return True
        if ctl == 'eot':
            self._emit('EOT', off)
            self.end_off = off
            return False
        if ctl == 'ret':
            self._emit('RETURN', off)
            self.end_off = off
            return False
        # plain / unk / jump / call (jump/call handled by caller)
        self._emit(name, off, args=args)
        return True

    def render(self, entry):
        """Walk main track. CALL subroutines are inlined; JUMP stops the pass."""
        seen = set()
        off = entry
        steps = 0
        while off < len(self.d) and steps < MAX_STEPS:
            steps += 1
            if off in seen:
                self.loop = {'backTo': off, 'from': None}
                break
            seen.add(off)
            name, args, nxt, ctl = decode_cmd(self.d, self.base, off)
            if ctl == 'jump':
                self._emit('JUMP', off, args=args)
                self.loop = {'backTo': args[0], 'from': off}
                break
            if ctl == 'call':
                self._emit('CALL', off, args=args)
                self._render_sub(args[0], seen)
                off = nxt
                continue
            if not self.step(name, args, off, ctl):
                break
            off = nxt
        if not self.events or self.events[-1]['op'] != 'EOT':
            self._emit('EOT', off)
            self.end_off = off
        return self.tick

    def _render_sub(self, target, parent_seen):
        """Inline a subroutine body (bounded, no recursion guard needed)."""
        seen = set()
        off = target
        steps = 0
        while off < len(self.d) and steps < MAX_STEPS:
            steps += 1
            if off in seen or off in parent_seen:
                break
            seen.add(off)
            name, args, nxt, ctl = decode_cmd(self.d, self.base, off)
            if ctl in ('jump', 'call'):
                self._emit(name, off, args=args)
                break
            if not self.step(name, args, off, ctl):
                break
            off = nxt


def parse_one(d, file_idx, name):
    s = Sseq(d, file_idx)
    base = s.nDataOffset
    counts = {n: d.count(bytes([b])) for b, n in
              ((0x93, 'TRACK'), (0x94, 'JUMP'), (0x95, 'CALL'),
               (0xFE, 'TRACKMASK'), (0xFC, 'LOOPEND'), (0xFF, 'EOT'))}
    out = {'index': file_idx, 'name': name, 'size': len(d),
           'dataOffset': base, 'mask': s.mask, 'opcodeCounts': counts,
           'tracks': {}}
    for t in sorted(s.tracks):
        entry = s.tracks[t]
        r = TrackRenderer(d, base)
        total = r.render(entry)
        out['tracks'][str(t)] = {
            'start': entry,
            'nEvents': len(r.events),
            'totalTicks': total,
            'loop': r.loop,
            'events': r.events,
        }
    return out


def main():
    sdat = Sdat()
    names = sdat.symb_tables()['SEQ']
    result = []
    for idx, n in enumerate(names):
        raw = sdat.file_bytes(idx)
        info = parse_one(raw, idx, n)
        result.append(info)
        parts = []
        for t, v in sorted(info['tracks'].items(), key=lambda x: int(x[0])):
            lp = ' LOOP' if v['loop'] else ''
            parts.append(f"t{t}@{v['start']:#x}:{v['totalTicks']}t/{v['nEvents']}e{lp}")
        print(f"{n} mask={info['mask']} " + ' '.join(parts))
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=1)
    print(f'\nwrote {OUT} ({os.path.getsize(OUT)} bytes)')


if __name__ == '__main__':
    main()
