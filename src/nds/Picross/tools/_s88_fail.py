#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s88e: 逐文件解析，首次失败时打印上下文（前8后10字节），补齐命令表"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

BASE = 'd:/studio/github/monkeycode/src/nds/Picross'
FILES = f'{BASE}/extracted/SDAT/files'

SEQS = ["title", "stage_jazz", "stage_waltz", "stage_bossanova", "stage_musette",
        "stage_musicbox", "stage_reggae", "stage_rock", "stage_house", "how_to_play",
        "SMB_arr1", "SMB_arr2", "SFC_copy1", "SFC_copy2", "SFC_copy3",
        "game_clear_jingle", "game_clear_loop", "game_over_jingle", "result",
        "edit_mode", "event", "stage_sine", "today", "vs", "multi",
        "mini_game", "complete_jingle"]

CMDS = {
    0x80: 1, 0x81: 1, 0x94: 3, 0x95: 3, 0x9F: 2, 0xC0: 1, 0xC1: 1,
    0xC4: 1, 0xC5: 1, 0xC7: 1, 0xCE: 1, 0xCF: 1, 0xD5: 1, 0xE1: 2,
    0xFD: 0, 0xFF: 0,
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

def ctx_str(seg, pos, n=8, m=10):
    a = max(0, pos - n)
    pre = seg[a:pos]
    post = seg[pos:pos + m]
    return (f'@{pos:#06x} ...' + ' '.join(f'{b:02X}' for b in pre[-n:]) +
            f'  >>>{seg[pos]:02X}<<<  ' + ' '.join(f'{b:02X}' for b in post))

def parse_track(seg, start, tag, first_only=True):
    pos = start
    tick = 0
    notes = 0
    aborted = None
    if seg[pos] < 0x80:
        tick, pos = read_varint(seg, pos)
    guard = 0
    while pos < len(seg) and guard < 300000:
        guard += 1
        b = seg[pos]
        if b < 0x80:
            if pos + 2 >= len(seg):
                aborted = ('trunc-note', pos); break
            vel = seg[pos + 1]
            if vel >= 0x80:
                aborted = ('bad-vel', pos); break
            _, np = read_varint(seg, pos + 2)
            notes += 1
            tick += 0
            pos = np
            continue
        if b not in CMDS:
            aborted = ('unknown', pos); break
        extra = CMDS[b]
        if b == 0x80:
            d, pos = read_varint(seg, pos + 1)
            tick += d
        elif b == 0x94:
            target = struct.unpack_from('<H', seg, pos + 1)[0]
            if target >= len(seg):
                aborted = ('bad-jump', pos, target); break
            pos += 4
        elif b == 0xFF:
            break
        else:
            pos += 1 + extra
    return notes, aborted

def main():
    for i, name in enumerate(SEQS):
        fn = f'{FILES}/file_{i:03d}.bin'
        data = open(fn, 'rb').read()
        if data[0:4] != b'SSEQ':
            print(f'{name}: 非SSEQ'); continue
        hsize = struct.unpack_from('<H', data, 0x0C)[0]
        payload = data[hsize + 8:]
        # 轨道表：先找首个 93 条目，再连续扫
        first93 = None
        for j0 in range(0, min(len(payload) - 5, 0x200)):
            if payload[j0] == 0x93 and payload[j0 + 4] == 0x00:
                first93 = j0
                break
        if first93 is None:
            print(f'{name}: 无轨道表'); continue
        tracks = []
        j = first93
        while j < len(payload) - 5:
            if payload[j] == 0x93 and payload[j + 4] == 0x00:
                tno = payload[j + 1]
                off = struct.unpack_from('<H', payload, j + 2)[0]
                tracks.append((tno, off))
                j += 5
            else:
                break
        main_off = first93 + len(tracks) * 5
        print(f'\n=== {name} ({len(data)}B) 轨数={len(tracks)} 表@{first93:#x} 主轨@{main_off:#x} ===')
        bad = 0
        for tno, off in tracks:
            n, ab = parse_track(payload, off, f't{tno}')
            if ab:
                print(f'  t{tno} @{off:#x}: {n}音符 → {ab[0]} {ctx_str(payload, ab[1])}')
                bad += 1
        n, ab = parse_track(payload, main_off, 'm0')
        if ab:
            print(f'  m0 @{main_off:#x}: {n}音符 → {ab[0]} {ctx_str(payload, ab[1])}')
            bad += 1
        if not bad:
            print(f'  ✅ 全部轨道解析通过')

if __name__ == '__main__':
    main()
