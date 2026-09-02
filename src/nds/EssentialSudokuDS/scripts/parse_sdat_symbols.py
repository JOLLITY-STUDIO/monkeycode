#!/usr/bin/env python3
"""SOUND-V0.2.4: rebuild full SDAT symbol table (INFO + SYMB) as JSON.

Output: rom-data/sound/sdat-symbols.json
Includes per-FAT-file mapping, SSEQ/BANK/SWAR info entries with names,
SSAR folder (SEQ_SE) with its 30 named sub-sequences matched to records,
player/group lists.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sdat_common import Sdat, Ssar  # noqa: E402

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   'rom-data', 'sound', 'sdat-symbols.json')


def decode_seq(raw):
    return {'fat': int.from_bytes(raw[0:2], 'little'),
            'unk': int.from_bytes(raw[2:4], 'little'),
            'bnk': int.from_bytes(raw[4:6], 'little'),
            'vol': raw[6], 'cpr': raw[7], 'ppr': raw[8], 'ply': raw[9],
            'rsv': raw[10:12].hex()}


def decode_bank(raw):
    return {'fat': int.from_bytes(raw[0:2], 'little'),
            'unk': int.from_bytes(raw[2:4], 'little'),
            'swars': [int.from_bytes(raw[4 + j * 2:6 + j * 2], 'little')
                      for j in range(4)]}


def decode_swar(raw):
    return {'fat': int.from_bytes(raw[0:2], 'little'),
            'unk': int.from_bytes(raw[2:4], 'little')}


def main():
    sdat = Sdat()
    info = sdat.info_lists()
    sym = sdat.symb_tables()

    # 1) FAT file table (file names resolved where list index matches)
    fat_files = []
    for i, (off, size) in enumerate(sdat.fat_entries):
        magic = sdat.file_bytes(i)[0:4].decode('ascii', 'replace')
        fat_files.append({'idx': i, 'offset': off, 'size': size, 'magic': magic})

    # 2) SEQ / SSAR / BANK / SWAR / Player / Group entries with SYMB names
    seq_list = []
    for i, raw in enumerate(info['SEQ']):
        e = decode_seq(raw)
        e['name'] = sym['SEQ'][i] if i < len(sym['SEQ']) else f'SEQ_{i}'
        e['bankName'] = (sym['BANK'][e['bnk']]
                         if e['bnk'] < len(sym['BANK']) else None)
        seq_list.append(e)

    bank_list = []
    for i, raw in enumerate(info['BANK']):
        e = decode_bank(raw)
        e['name'] = sym['BANK'][i] if i < len(sym['BANK']) else f'BANK_{i}'
        e['swarNames'] = [
            sym['SWAR'][x] if x != 0xFFFF and x < len(sym['SWAR']) else None
            for x in e['swars']]
        bank_list.append(e)

    swar_list = []
    for i, raw in enumerate(info['SWAR']):
        e = decode_swar(raw)
        e['name'] = sym['SWAR'][i] if i < len(sym['SWAR']) else f'SWAR_{i}'
        swar_list.append(e)

    player_list = [{'idx': i,
                    'name': sym['Player'][i] if i < len(sym['Player']) else None,
                    'raw': raw.hex(' ')}
                   for i, raw in enumerate(info['Player'])]
    group_list = [{'idx': i, 'raw': raw.hex(' ')} for i, raw in enumerate(info['Group'])]

    # 3) SSAR: folder name + sub-sequence names + per-record match
    ssar_out = []
    for i, raw in enumerate(info['SSAR']):
        rec = {'fat': int.from_bytes(raw[0:2], 'little'),
               'unk': int.from_bytes(raw[2:4], 'little')}
        folder = sym['SSAR'][0] if sym['SSAR'] else None
        # each SSAR file record -> load the SSAR file's 30 SE records
        fat_id = rec['fat']
        ssar_file = Ssar(sdat.file_bytes(fat_id), fat_id)
        names = folder[1] if folder else []
        se_records = []
        for ri, r in enumerate(ssar_file.records):
            se_records.append({'seqIdx': ri,
                               'name': names[ri] if ri < len(names) else None,
                               'nOffset': r['nOffset'], 'abs': r['abs'],
                               'bank': r['bank'], 'vol': r['vol'],
                               'cpr': r['cpr'], 'ppr': r['ppr'], 'ply': r['ply']})
        ssar_out.append({'fat': fat_id, 'folder': folder[0] if folder else None,
                         'nRecords': ssar_file.nrec,
                         'nDataOffset': ssar_file.ndata,
                         'records': se_records})

    out = {
        'sdat': {
            'size': len(sdat.d),
            'symb': {'off': sdat.symb['off'], 'size': sdat.symb['size']},
            'info': {'off': sdat.info['off'], 'size': sdat.info['size']},
            'fat': {'off': sdat.fat['off'], 'size': sdat.fat['size']},
            'file': {'off': sdat.fileb['off'], 'size': sdat.fileb['size']},
            'nFiles': sdat.nfiles,
        },
        'files': fat_files,
        'seq': seq_list,
        'ssar': ssar_out,
        'bank': bank_list,
        'swar': swar_list,
        'player': player_list,
        'group': group_list,
        'symbols': {'seq': sym['SEQ'], 'ssarFolders': [f for f, _ in sym['SSAR']],
                    'bank': sym['BANK'], 'swar': sym['SWAR'],
                    'player': sym['Player'], 'group': sym['Group']},
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=1)

    # console summary
    print('files:')
    for f in fat_files:
        print(f"  [{f['idx']}] {f['magic']} @{f['offset']:#x} {f['size']}B")
    print('\nSEQ:')
    for e in seq_list:
        print(f"  {e['name']:8s} fat={e['fat']:2d} bnk={e['bnk']} ({e['bankName']}) "
              f"vol={e['vol']} cpr={e['cpr']} ppr={e['ppr']} ply={e['ply']}")
    print('\nBANK:')
    for e in bank_list:
        print(f"  {e['name']:8s} fat={e['fat']:2d} swars={e['swars']} "
              f"-> {e['swarNames']}")
    print('\nSWAR:')
    for e in swar_list:
        print(f"  {e['name']:8s} fat={e['fat']:2d}")
    print('\nSSAR:')
    for s in ssar_out:
        print(f"  fat={s['fat']} folder={s['folder']} n={s['nRecords']}")
        print('   ' + ', '.join(f"{r['seqIdx']}:{r['name']}" for r in s['records']))
    print(f'\nwrote {OUT} ({os.path.getsize(OUT)} bytes)')


if __name__ == '__main__':
    main()
