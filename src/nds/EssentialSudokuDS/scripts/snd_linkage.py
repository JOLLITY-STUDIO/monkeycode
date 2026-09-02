#!/usr/bin/env python3
"""SOUND-V0.2.3: full instrument linkage JSON.

Chain per SSEQ: used program# -> BANK info entry (SBNK file) -> instrument
record def (swav, swar-idx, adsr, pan) -> SWAR file (via BANK INFO 4-SWAR
array -> SWAR list index) -> DSWAV sample header.

Output: rom-data/sound/snd-linkage.json
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sdat_common import Sdat, Sseq, Sbnk, Swar  # noqa: E402

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   'rom-data', 'sound', 'snd-linkage.json')


def parse_instrument_events(sseq_obj):
    """Collect set of program numbers used by 0x81 events across tracks."""
    progs = set()
    for t, off in sseq_obj.tracks.items():
        i = off
        n = 0
        d = sseq_obj.d
        while i < len(d) and n < 100000:
            b = d[i]
            if b < 0x80:
                # NOTE key vel dur(vlq)
                j = i + 2
                if b & 0x80:  # unreachable; key < 0x80
                    pass
                if d[j] & 0x80:
                    j += 2
                else:
                    j += 1
                i = j
                n += 1
            elif b == 0x80:
                i += 2 if d[i + 1] & 0x80 else 1
                i += 1
                n += 1
            elif b == 0x81:
                v = d[i + 1]
                if v & 0x80:
                    v = ((v & 0x7F) << 8) | d[i + 2]
                    i += 3
                else:
                    i += 2
                progs.add(v)
                n += 1
            elif b in (0x93, 0xFE):
                i += 4 if b == 0x93 else 3
            elif b in (0x94, 0x95):
                i += 4
            elif b in (0xFF, 0xFD):
                break
            else:
                # fixed-arg commands: reuse playable decode table for args len
                from sseq_playable import OPS
                name, argc = OPS.get(b, (None, 0))
                if name is None:
                    i += 1
                else:
                    i += 1 + max(argc, 0)
                n += 1
    return progs


def decode_vlq(v):
    """0x81 payload: bits0-6 program, bits7-14 bank."""
    prog = v & 0x7F
    bank = (v >> 7) & 0x7F
    return bank, prog


def main():
    sdat = Sdat()
    info = sdat.info_lists()
    names = sdat.symb_tables()
    seq_names = names['SEQ']
    bank_names = names['BANK']
    swar_names = names['SWAR']

    # decode INFO entries
    seq_info = []
    for raw in info['SEQ']:
        fat, unk, bnk, vol, cpr, ppr, ply = (int.from_bytes(raw[0:2], 'little'),
                                             int.from_bytes(raw[2:4], 'little'),
                                             int.from_bytes(raw[4:6], 'little'),
                                             raw[6], raw[7], raw[8], raw[9])
        seq_info.append({'fat': fat, 'unk': unk, 'bnk': bnk, 'vol': vol,
                         'cpr': cpr, 'ppr': ppr, 'ply': ply})
    bank_info = []
    for raw in info['BANK']:
        fat = int.from_bytes(raw[0:2], 'little')
        unk = int.from_bytes(raw[2:4], 'little')
        swars = [int.from_bytes(raw[4 + j * 2:6 + j * 2], 'little') for j in range(4)]
        bank_info.append({'fat': fat, 'unk': unk, 'swars': swars})
    swar_info = []
    for raw in info['SWAR']:
        fat = int.from_bytes(raw[0:2], 'little')
        swar_info.append({'fat': fat})

    # load SBNK + SWAR objects by FAT id
    sbnk_by_fat = {}
    swar_by_fat = {}
    for bi in bank_info:
        if bi['fat'] not in sbnk_by_fat and bi['fat'] < sdat.nfiles:
            sbnk_by_fat[bi['fat']] = Sbnk(sdat.file_bytes(bi['fat']), bi['fat'])
    for si in swar_info:
        if si['fat'] not in swar_by_fat and si['fat'] < sdat.nfiles:
            swar_by_fat[si['fat']] = Swar(sdat.file_bytes(si['fat']), si['fat'])

    result = {'banks': [], 'sequences': []}
    # --- banks section ---
    for bi, bnk in enumerate(bank_info):
        sbnk = sbnk_by_fat.get(bnk['fat'])
        swar_links = []
        for sw_idx in bnk['swars']:
            if sw_idx == 0xFFFF:
                swar_links.append(None)
                continue
            if sw_idx < len(swar_info):
                swar_links.append({'swarListIdx': sw_idx,
                                   'name': swar_names[sw_idx] if sw_idx < len(swar_names) else f'?{sw_idx}',
                                   'fat': swar_info[sw_idx]['fat']})
            else:
                swar_links.append({'swarListIdx': sw_idx, 'name': '?', 'fat': None})
        result['banks'].append({
            'bankIdx': bi, 'name': bank_names[bi] if bi < len(bank_names) else f'BANK_{bi}',
            'info': bnk, 'sbnkFat': bnk['fat'], 'nInstr': sbnk.ninstr if sbnk else None,
            'swarLinks': swar_links,
        })

    # --- sequences section: per seq, used progs + resolved defs ---
    def resolve_defs(bbnk, sbnk_obj, bank_used, prog):
        """Resolve one program -> list of def dicts with sample links."""
        if not sbnk_obj or prog >= sbnk_obj.ninstr:
            return {'bank': bank_used, 'prog': prog, 'error': 'no-instrument'}
        rec = sbnk_obj.records[prog]
        dlist = sbnk_obj.defs_of(prog)
        dd = []
        for df in dlist:
            sw_idx = df['swar']
            link = None
            if bbnk and sw_idx < len(bbnk['swars']):
                li = bbnk['swars'][sw_idx]
                if li != 0xFFFF and li < len(swar_info):
                    sw = swar_by_fat.get(swar_info[li]['fat'])
                    if sw and df['swav'] < sw.n:
                        samp = sw.sample(df['swav'])
                        link = {
                            'swarName': swar_names[li] if li < len(swar_names) else f'?{li}',
                            'swarFat': swar_info[li]['fat'],
                            'swavIdx': df['swav'],
                            'swarListIdx': li,
                            'waveType': samp['waveType'], 'loopFlag': samp['loopFlag'],
                            'rate': samp['rate'], 'time': samp['time'],
                            'loopOffset': samp['loopOffset'], 'loopLength': samp['loopLength'],
                            'dataSize': samp['dataSize'],
                        }
            dd.append({'swav': df['swav'], 'swar': sw_idx, 'note': df['note'],
                       'adsr': df['adsr'], 'pan': df['pan'], 'sample': link})
        return {'bank': bank_used, 'prog': prog,
                'ftype': rec['ftype'], 'defs': dd}

    for si, sq in enumerate(seq_info):
        sseq = Sseq(sdat.file_bytes(si), si)
        used = parse_instrument_events(sseq)
        defs_out = []
        for bank_used, prog in sorted(decode_vlq(v) for v in used):
            if bank_used < len(bank_info):
                bb = bank_info[bank_used]
                defs_out.append(resolve_defs(bb, sbnk_by_fat.get(bb['fat']),
                                             bank_used, prog))
            else:
                defs_out.append({'bank': bank_used, 'prog': prog,
                                 'error': 'no-bank'})
        result['sequences'].append({
            'seqIdx': si, 'name': seq_names[si], 'info': sq,
            'usedProgs': sorted(decode_vlq(v) for v in used),
            'instruments': defs_out,
        })
        print(f"{seq_names[si]}: {len(defs_out)} progs used")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=1)
    print(f'\nwrote {OUT} ({os.path.getsize(OUT)} bytes)')


if __name__ == '__main__':
    main()
