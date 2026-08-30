#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""build_bgm_assets: 生成小程序可用的紧凑 BGM 资源
   输入: extracted/SDAT/sseq/*.json, assets/audio/banks.json, assets/audio/waves.json
   输出:
   - assets/audio/bgm/songs.json     每首 SSEQ 的精简音符表 + 元数据
   - assets/audio/bgm/waves.bin      所有用到的 PCM16 LE 样本串接
   - assets/audio/bgm/waves.json     swavId -> {offset, len, rate, loop, loopStart, loopEnd}
   - assets/audio/bgm/banks.json     精简乐器表 (只保留用到 swav 的引用)
"""
import sys, io, json, os, base64, struct

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
BASE = 'd:/studio/github/monkeycode/src/nds/Picross'

# 选择要打包的 BGM（保证小程序体积）
# 选择策略：标题 + 教程 + 一个舞台 + 通关 + 失败 + 通关循环
KEEP = {
    'title', 'how_to_play', 'stage_jazz', 'stage_waltz', 'stage_musette',
    'stage_musicbox', 'stage_sine', 'stage_house',
    'game_clear_jingle', 'game_clear_loop', 'game_over_jingle', 'complete_jingle',
}
# 每首 BGM 需要从 bank 的 swav 引用中收集 swav 索引集合
def collect_used_swavs(songs, banks):
    used = {}  # warName -> set(swavIdx)
    links = json.load(open(f'{BASE}/extracted/SDAT/bgm_links.json', encoding='utf-8'))
    for name in songs:
        lk = links.get(f'{name}_SEQ')
        if lk is None:
            lk = links.get(name)
        if lk is None: continue
        bank_name = lk['bankName']
        if bank_name not in banks:
            continue
        bank = banks[bank_name]
        insts = bank['instruments']
        # 收集所有用到的 swav
        s = used.setdefault(lk['warNames'][0], set())
        for prog, inst in enumerate(insts):
            if inst is None: continue
            for r in inst.get('regs', []):
                if 'swav' in r:
                    s.add(r['swav'])
    return used

def main():
    seq_dir = f'{BASE}/extracted/SDAT/sseq'
    bank_file = f'{BASE}/assets/audio/banks.json'
    waves_file = f'{BASE}/assets/audio/waves.json'
    out_dir = f'{BASE}/assets/audio/bgm'
    os.makedirs(out_dir, exist_ok=True)

    banks = json.load(open(bank_file, encoding='utf-8'))
    waves_src = json.load(open(waves_file, encoding='utf-8'))
    links = json.load(open(f'{BASE}/extracted/SDAT/bgm_links.json', encoding='utf-8'))

    # 1. 收集所有用到的 swav
    used = collect_used_swavs(KEEP, banks)
    # 2. 生成新 swavId 映射 + waves.bin
    waves_index = {}  # (warName, srcSwavIdx) -> newIdx
    new_waves = []   # [{rate, loop, loopStart, loopEnd, samples: bytes}]
    sample_buf = bytearray()
    cur_off = 0
    for warName, idx_set in used.items():
        war = waves_src[warName]
        for idx in sorted(idx_set):
            if idx >= len(war['waves']):
                continue
            w = war['waves'][idx]
            if w.get('samples') is None:
                continue
            samples = base64.b64decode(w['samples'])
            # i16 LE PCM
            sample_buf.extend(samples)
            key = f'{warName}#{idx}'
            waves_index[key] = {
                'rate': w['rate'],
                'loop': w['loop'],
                'loopStart': w['loopStart'],
                'loopEnd': w['loopEnd'],
                'type': w.get('type', 1),
                'off': cur_off,
                'len': len(samples) // 2,  # samples count
            }
            cur_off += len(samples)
    with open(f'{out_dir}/waves.bin', 'wb') as f:
        f.write(sample_buf)
    print(f'waves.bin: {cur_off} B ({cur_off/1024:.1f} KB), swavs={len(waves_index)}')
    # waves.json: 键为 "warName#idx", 值为 {rate, loop, ...}
    json.dump(waves_index, open(f'{out_dir}/waves.json', 'w', encoding='utf-8'), ensure_ascii=False)

    # 3. 生成精简 songs.json
    songs_out = {}
    for name in KEEP:
        p = f'{seq_dir}/{name}.json'
        if not os.path.exists(p): continue
        d = json.load(open(p, encoding='utf-8'))
        lk = links.get(f'{name}_SEQ') or links.get(name)
        if lk is None: continue
        war_name = lk['warNames'][0]
        bank_name = lk['bankName']
        bank = banks.get(bank_name, {})
        # tracks: 精简字段，重写 swav 引用为新 waves_index 键
        tracks = []
        for t in d['tracks']:
            prog = t['prog']
            inst = bank.get('instruments', [None]*128)[prog] if prog < len(bank.get('instruments', [])) else None
            # 找当前 note.key 匹配的 region
            # 为简化，把所有 regions 平铺；播放时按 key 找 region
            regs = []
            if inst is not None and 'regs' in inst:
                regs = inst['regs']
            # 重新映射 swav 引用为新 ID
            new_regs = []
            for r in regs:
                if inst.get('t') == 'range':
                    new_regs.append({'key': r['key'], 'wkey': f'{war_name}#{r.get("swav", 0)}', 'root': r.get('root', 60),
                                     'att': r.get('att', 127), 'dec': r.get('dec', 127),
                                     'sus': r.get('sus', 127), 'rel': r.get('rel', 127),
                                     'pan': r.get('pan', 64)})
                elif inst.get('t') == 'regional':
                    new_regs.append({'topKey': r.get('topKey', r.get('hiKey', 127)), 'wkey': f'{war_name}#{r.get("swav", 0)}',
                                     'root': r.get('root', 60),
                                     'att': r.get('att', 127), 'dec': r.get('dec', 127),
                                     'sus': r.get('sus', 127), 'rel': r.get('rel', 127),
                                     'pan': r.get('pan', 64)})
                else:  # single
                    new_regs.append({'wkey': f'{war_name}#{r.get("swav", 0)}', 'root': r.get('root', 60),
                                     'att': r.get('att', 0), 'dec': r.get('dec', 0),
                                     'sus': r.get('sus', 0), 'rel': r.get('rel', 0),
                                     'pan': r.get('pan', 64)})
            tracks.append({
                'id': t['id'],
                'prog': prog,
                'pan': t['pan'],
                'volume': t['volume'],
                'expression': t['expression'],
                'regs': new_regs,
                'notes': t['notes'],
                'loopPoint': t.get('loopPoint'),
                'totalTicks': t['totalTicks'],
            })
        songs_out[name] = {
            'tempo': d['tempo'],
            'tracks': tracks,
            'loopPoint': d.get('loopPoint'),
            'totalTicks': d['totalTicks'],
        }
    json.dump(songs_out, open(f'{out_dir}/songs.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    sz = os.path.getsize(f'{out_dir}/songs.json')
    print(f'songs.json: {sz} B ({sz/1024:.1f} KB), songs={len(songs_out)}')
    print(f'KEEP={KEEP}')

if __name__ == '__main__':
    main()
