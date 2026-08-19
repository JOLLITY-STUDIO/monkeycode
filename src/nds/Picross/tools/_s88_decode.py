#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s88: 全量解码 27 首 SSEQ → JSON 事件流（自研定制格式，S87 实证）"""
import struct, sys, io, json, os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

BASE = 'd:/studio/github/monkeycode/src/nds/Picross'
FILES = f'{BASE}/extracted/SDAT/files'
OUT = f'{BASE}/extracted/SDAT/sseq'
os.makedirs(OUT, exist_ok=True)

SEQS = ["title", "stage_jazz", "stage_waltz", "stage_bossanova", "stage_musette",
        "stage_musicbox", "stage_reggae", "stage_rock", "stage_house", "how_to_play",
        "SMB_arr1", "SMB_arr2", "SFC_copy1", "SFC_copy2", "SFC_copy3",
        "game_clear_jingle", "game_clear_loop", "game_over_jingle", "result",
        "edit_mode", "event", "stage_sine", "today", "vs", "multi",
        "mini_game", "complete_jingle"]

# 命令参数长度表（本格式实证）：cmd -> (消耗字节, 含义)
CMDS = {
    0x80: ('off', 1),    # 音符关 + varint delta
    0x81: ('skip', 1),
    0x94: ('jump', 3),   # 94 <u16 target> 00
    0x95: ('bend', 3),   # 95 <u16 bend> 00
    0x9F: ('skip', 2),
    0xC0: ('prog', 1),
    0xC1: ('pan', 1),
    0xC4: ('skip', 1),
    0xC5: ('skip', 1),
    0xC7: ('transpose', 1),
    0xCE: ('skip', 1),
    0xCF: ('skip', 1),
    0xD5: ('skip', 1),
    0xE1: ('skip', 2),
    0xFD: ('nop', 0),
    0xFF: ('end', 0),
}

def read_varint(seg, pos):
    v = 0
    while True:
        b = seg[pos]
        pos += 1
        v = (v << 7) | (b & 0x7F)
        if not (b & 0x80):
            break
    return v, pos

def parse_track(seg, start, tag):
    """解码单轨；返回 notes/offs/loop 信息。seg 为轨道字节段（含前后）"""
    pos = start
    tick = 0
    notes = []   # {t,k,v}
    offs = []    # 释放全部音符的时刻
    prog = 0
    pan = 127
    transpose = 0
    loop_point = None
    loop_off = None
    guard = 0
    # 初始休止
    if seg[pos] < 0x80:
        tick, pos = read_varint(seg, pos)
    while pos < len(seg) and guard < 200000:
        guard += 1
        b = seg[pos]
        if b < 0x80:
            key = b
            vel = seg[pos + 1]
            if vel >= 0x80:
                print(f'  !! {tag} @0x{pos:04X} 音符 vel={vel:#x} 非法，中止')
                break
            d, np = read_varint(seg, pos + 2)
            notes.append({'t': tick, 'k': key, 'v': vel})
            tick += d
            pos = np
            continue
        cmd, extra = CMDS.get(b, (None, 1))
        if cmd is None:
            print(f'  !! {tag} @0x{pos:04X} 未知命令 {b:#x}，跳过 1 字节')
            pos += 1
            continue
        if cmd == 'off':
            d, pos = read_varint(seg, pos + 1)
            offs.append(tick + d)
            tick += d
        elif cmd == 'jump':
            target = struct.unpack_from('<H', seg, pos + 1)[0]
            loop_point = target
            loop_off = pos
            pos += 4  # 94 u16 00
        elif cmd == 'prog':
            prog = seg[pos + 1]; pos += 2
        elif cmd == 'pan':
            pan = seg[pos + 1]; pos += 2
        elif cmd == 'transpose':
            transpose = seg[pos + 1]; pos += 2
        elif cmd == 'end':
            break
        else:  # skip/nop/bend
            pos += 1 + extra
    return {'id': tag, 'prog': prog, 'pan': pan, 'transpose': transpose,
            'notes': notes, 'offs': offs, 'loopPoint': loop_point,
            'loopCmdOff': loop_off, 'totalTicks': tick}

def parse_sseq(data):
    magic = data[0:4]
    hsize = struct.unpack_from('<H', data, 0x0C)[0]
    payload = data[hsize + 8:]
    # 轨道表
    tracks = []
    first93 = None
    for i in range(0x40):
        if payload[i] == 0x93 and payload[i + 4] == 0x00:
            if first93 is None:
                first93 = i
            tno = payload[i + 1]
            off = struct.unpack_from('<H', payload, i + 2)[0]
            tracks.append((tno, off))
    main_off = first93 + len(tracks) * 5
    # 主轨（0 号）起始
    trs = [parse_track(payload, main_off, 'm0')]
    for tno, off in tracks:
        trs.append(parse_track(payload, off, f't{tno}'))
    return trs

def main():
    summary = []
    for i, name in enumerate(SEQS):
        fn = f'{FILES}/file_{i:03d}.bin'
        data = open(fn, 'rb').read()
        if data[0:4] != b'SSEQ':
            summary.append((name, '非SSEQ', len(data)))
            continue
        trs = parse_sseq(data)
        total = max(t['totalTicks'] for t in trs)
        loop = [t['loopPoint'] for t in trs if t['loopPoint'] is not None]
        n_notes = sum(len(t['notes']) for t in trs)
        out = {'name': name, 'totalTicks': total, 'tracks': trs}
        json.dump(out, open(f'{OUT}/{name}.json', 'w', encoding='utf-8'), ensure_ascii=False)
        summary.append((name, len(data), len(trs), n_notes, total, loop[:3], 'OK'))
    print(f'{"name":<20}{"size":>6}{"trk":>4}{"notes":>7}{"ticks":>8}  loop点')
    for s in summary:
        print(f'{s[0]:<20}{s[1]:>6}{s[2]:>4}{s[3]:>7}{s[4]:>8}  {s[5] if len(s)>5 else ""}  {s[-1]}')

if __name__ == '__main__':
    main()
