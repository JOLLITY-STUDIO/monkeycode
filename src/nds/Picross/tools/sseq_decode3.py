#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""sseq_decode3: 自研 SSEQ 解析器（完整命令表）
   输入: extracted/SDAT/files/file_NNN.bin (SSEQ)
   输出: extracted/SDAT/sseq/{name}.json
"""
import struct, sys, io, json, os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
BASE = 'd:/studio/github/monkeycode/src/nds/Picross'

FILES = f'{BASE}/extracted/SDAT/files'
OUT = f'{BASE}/extracted/SDAT/sseq'
os.makedirs(OUT, exist_ok=True)

SEQ_NAMES = [
    "title", "stage_jazz", "stage_waltz", "stage_bossanova", "stage_musette",
    "stage_musicbox", "stage_reggae", "stage_rock", "stage_house", "how_to_play",
    "SMB_arr1", "SMB_arr2", "SFC_copy1", "SFC_copy2", "SFC_copy3",
    "game_clear_jingle", "game_clear_loop", "game_over_jingle", "result",
    "edit_mode", "event", "stage_sine", "today", "vs", "multi",
    "mini_game", "complete_jingle",
]

# varint: 7 bits per byte, MSB = continuation, little-endian
def read_varint(data, pos):
    v = 0
    shift = 0
    while True:
        b = data[pos]
        pos += 1
        v |= (b & 0x7F) << shift
        shift += 7
        if not (b & 0x80):
            break
    return v, pos

def write_varint(v):
    if v < 0: v = 0
    if v < 0x80: return bytes([v])
    out = []
    # collect 7-bit groups from high to low
    groups = []
    while v >= 0x80:
        groups.append(v & 0x7F); v >>= 7
    groups.append(v)
    out = []
    for g in reversed(groups[:-1]):
        out.append(g | 0x80)
    out.append(groups[-1])
    return bytes(out)


def parse(data):
    """返回 {tempo, tracks: [{...}]}"""
    hsize = struct.unpack_from('<H', data, 0x0C)[0]
    if data[0:4] != b'SSEQ':
        return None
    # events 在 file offset 0x18 处的 u32 指向
    dataOffs = struct.unpack_from('<I', data, 0x18)[0]
    payload = data[dataOffs:]

    # 找 DefineTracks + BeginTracks（主轨头部）
    # 前 0x40 内允许：DefineTracks (FE) + 多个 BeginTrack (93 xx u24)
    if not payload:
        return None
    pos = 0
    sub_offs = []
    while pos < len(payload):
        if payload[pos] == 0xFE:  # DefineTracks: 3 bytes
            pos += 3
            continue
        if payload[pos] == 0x93:  # BeginTrack: 5 bytes
            tno = payload[pos + 1]
            # u24 offset (3 bytes LE)
            off = payload[pos + 2] | (payload[pos + 3] << 8) | (payload[pos + 4] << 16)
            sub_offs.append((tno, off))
            pos += 5
            continue
        break
    main_off = pos

    # 解析每条轨道（main + 所有子轨）
    def parse_track(start, _depth=0):
        if _depth > 8:
            return (0,0,64,127,127,0,0,[],None)
        pos = start
        max_events = 30000
        n_events = 0
        prog = 0; bank = 0; pan = 64; vol = 127; expr = 127; transpose = 0
        tick = 0
        notes = []
        loop_stack = []
        loop_point = None
        guard = 0
        while pos < len(payload) and guard < 200000:
            guard += 1
            n_events += 1
            if n_events > max_events:
                break
            t = payload[pos]
            if t <= 0x7F:  # Note
                pitch = t
                vel = payload[pos + 1]
                if vel & 0x80:
                    # unknownFlag set — 仍按 velocity 读
                    pass
                d, np = read_varint(payload, pos + 2)
                k = pitch + transpose
                if k < 0: k = 0
                if k > 127: k = 127
                notes.append({'t': tick, 'k': k, 'v': vel & 0x7F, 'd': d})
                tick += d
                pos = np
                continue
            if t == 0x80:  # Rest
                d, np = read_varint(payload, pos + 1)
                tick += d
                pos = np
                continue
            if t == 0x81:  # InstrumentSwitch (varint = bank<<7 | inst)
                v, np = read_varint(payload, pos + 1)
                inst = v & 0x7F
                bk = v >> 7
                prog = inst; bank = bk
                pos = np
                continue
            if t == 0x93:  # BeginTrack（不应在轨道内部）
                pos += 5
                continue
            if t in (0x94, 0x95):  # Jump / Call: cmd + u24
                dest = payload[pos + 1] | (payload[pos + 2] << 8) | (payload[pos + 3] << 16)
                if t == 0x94:
                    # Jump：只接受前向跳转（向后可能是 BeginLoop 残留，循环）
                    if dest <= pos:
                        break  # 视为轨道结束
                    pos = dest
                else:
                    sub = parse_track(dest, _depth+1)
                    sub_prog, sub_bank, sub_pan, sub_vol, sub_expr = sub[0], sub[1], sub[2], sub[3], sub[4]
                    sub_tr, sub_notes, sub_lp = sub[6], sub[7], sub[8]
                    for n in sub_notes:
                        n['t'] += tick
                        notes.append(n)
                    tick += sub_tr
                    pos += 4
                continue
            if t == 0xA1:  # FromVariable
                pos += 2
                continue
            if t == 0xA2:  # If
                pos += 2
                continue
            if t in (0xB0, 0xB1, 0xB2, 0xB3, 0xB4, 0xB5, 0xB6, 0xB7,
                     0xB8, 0xB9, 0xBA, 0xBB, 0xBC, 0xBD):
                pos += 3
                continue
            if t == 0xC0:  # Pan
                pan = payload[pos + 1]; pos += 2; continue
            if t == 0xC1:  # TrackVolume
                vol = payload[pos + 1]; pos += 2; continue
            if t == 0xC2:  # GlobalVolume
                pos += 2; continue
            if t == 0xC3:  # Transpose
                transpose = struct.unpack_from('b', payload, pos + 1)[0]; pos += 2; continue
            if t in (0xC4, 0xC5, 0xC6, 0xC7, 0xC8, 0xC9,
                     0xCA, 0xCB, 0xCC, 0xCD, 0xCE, 0xCF):
                pos += 2
                continue
            if t in (0xD0, 0xD1, 0xD2, 0xD3, 0xD5):
                pos += 2
                continue
            if t == 0xD4:  # BeginLoop
                cnt = payload[pos + 1]
                loop_stack.append({'count': cnt, 'start': tick})
                pos += 2
                continue
            if t == 0xD6:  # PrintVariable
                pos += 2
                continue
            if t == 0xE0:  # VibratoDelay
                pos += 2; continue
            if t == 0xE1:  # Tempo: cmd + u16 LE BPM
                bpm = struct.unpack_from('<H', payload, pos + 1)[0]
                pos += 3
                state[0] = bpm
                continue
            if t == 0xE3:  # SweepPitch
                pos += 2; continue
            if t == 0xFC:  # EndLoop
                if loop_stack:
                    lp = loop_stack[-1]
                    lp['count'] -= 1
                    if lp['count'] > 0:
                        tick = lp['start']
                    else:
                        loop_stack.pop()
                        if loop_point is None:
                            loop_point = lp['start']
                pos += 1
                continue
            if t == 0xFD:  # Return
                pos += 1
                return (prog, bank, pan, vol, expr, transpose, tick, notes, loop_point)
            if t == 0xFE:  # DefineTracks: FE + u16 bitfield = 3 bytes
                pos += 3
                continue
            if t == 0xFF:  # EndTrack
                pos += 1
                break
            # 未知命令：跳过 1 字节
            pos += 1
        return (prog, bank, pan, vol, expr, transpose, tick, notes, loop_point)

    state = [120]
    # 主轨
    main = parse_track(main_off)
    # 子轨
    tracks = [{
        'id': 'm0', 'prog': main[0], 'bank': main[1],
        'pan': main[2], 'volume': main[3], 'expression': main[4],
        'transpose': main[5],
        'notes': main[7], 'loopPoint': main[8], 'totalTicks': main[6],
    }]
    for tno, off in sub_offs:
        tr = parse_track(off)
        tracks.append({
            'id': f't{tno}',
            'prog': tr[0], 'bank': tr[1],
            'pan': tr[2], 'volume': tr[3], 'expression': tr[4],
            'transpose': tr[5],
            'notes': tr[7], 'loopPoint': tr[8], 'totalTicks': tr[6],
        })

    total = max(t['totalTicks'] for t in tracks) if tracks else 0
    lp = next((t['loopPoint'] for t in tracks if t.get('loopPoint') is not None), None)
    return {'tempo': state[0], 'tracks': tracks,
            'loopPoint': lp, 'totalTicks': total}


def main():
    summary = []
    for i, name in enumerate(SEQ_NAMES):
        fn = f'{FILES}/file_{i:03d}.bin'
        data = open(fn, 'rb').read()
        if data[0:4] != b'SSEQ':
            continue
        info = parse(data)
        if not info:
            continue
        info['name'] = name
        json.dump(info, open(f'{OUT}/{name}.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
        notes = sum(len(t['notes']) for t in info['tracks'])
        summary.append((name, len(info['tracks']), notes, info['totalTicks'], info['loopPoint']))
    print(f'{"name":<20}{"trk":>4}{"notes":>7}{"ticks":>8}  loop')
    for s in summary:
        print(f'{s[0]:<20}{s[1]:>4}{s[2]:>7}{s[3]:>8}  {s[4]}')


if __name__ == '__main__':
    main()
