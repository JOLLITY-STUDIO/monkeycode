#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convert lap and fap files to TypeScript puzzle modules"""
import sys, os, math
from pathlib import Path

BASE = Path(__file__).parent / '..' / 'roms' / 'extracted'
OUT = Path(__file__).parent / '..' / 'miniprogram' / 'engine' / 'data' / 'puzzles'

# --- LAP ---
def convert_lap():
    lap_base = BASE / 'lap_d'
    puzzles = []
    # Read all subdirectories (1_dat..5_dat + tutorial)
    for subdir in sorted(lap_base.iterdir()):
        if not subdir.is_dir():
            continue
        for fn in sorted(subdir.glob('*.lap')):
            data = open(fn, 'rb').read()
            h, w = data[0], data[1]
            body = data[26:26 + h * w]
            # Map distinct values to 0..15 (keep order stable)
            values = sorted(set(body))
            if len(values) > 16:
                # Truncate/modulo if too many colors
                value_map = {v: (i % 16) for i, v in enumerate(values)}
            else:
                value_map = {v: i for i, v in enumerate(values)}
            grid = [value_map[v] for v in body]
            # Extract ID and name
            base_name = fn.stem
            parts = base_name.split('_', 1)
            pid = parts[0]
            pname = parts[1] if len(parts) > 1 else ''
            puzzles.append({
                'id': pid,
                'name': pname,
                'w': w,
                'h': h,
                'grid': grid,
            })
    print('Lap puzzles:', len(puzzles))
    # Write batches
    BATCH = 50
    for b in range(0, len(puzzles), BATCH):
        chunk = puzzles[b:b+BATCH]
        lines = ['// Pic Pic (Japan) - Lap Puzzle Data Batch %d' % (b // BATCH + 1)]
        for p in chunk:
            lines.append("export const P%s = { id: '%s', name: '%s', w: %d, h: %d, grid: new Uint8Array([" % (
                p['id'], p['id'], p['name'].replace("'", "\\'"), p['w'], p['h']))
            for i in range(0, len(p['grid']), p['w']):
                lines.append('  ' + ','.join(str(v) for v in p['grid'][i:i+p['w']]) + ',')
            lines.append('])};')
        fname = OUT / ('lap_batch_%d.ts' % (b // BATCH + 1))
        with open(fname, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        print('written', fname, os.path.getsize(fname))
    # Index
    index = ['// Lap Puzzle Index']
    for p in puzzles:
        index.append("import { P%s } from './lap_batch_%d';" % (
            p['id'], (puzzles.index(p) // BATCH) + 1))
    index.append('')
    index.append('export const LAP_PUZZLES = [')
    for p in puzzles:
        index.append('  P%s,' % p['id'])
    index.append('];')
    with open(OUT / 'lap_index.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(index))
    print('written lap_index.ts')

# --- FAP ---
def convert_fap():
    fap_base = BASE / 'fap_d'
    puzzles = []
    for fn in sorted(fap_base.glob('*.fap')):
        data = open(fn, 'rb').read()
        h, w = data[0], data[1]
        nibble_count = w * h
        nibble_bytes = math.ceil(nibble_count / 2)
        # Extract nibbles (offset 2, low nibble first)
        grid = []
        for i in range(nibble_count):
            byte = data[2 + (i >> 1)]
            v = (byte & 0x0F) if (i & 1) == 0 else (byte >> 4)
            grid.append(v)
        # Extract ID and name
        base_name = fn.stem
        parts = base_name.split('_', 1)
        pid = parts[0]
        pname = parts[1] if len(parts) > 1 else ''
        puzzles.append({
            'id': pid,
            'name': pname,
            'w': w,
            'h': h,
            'grid': grid,
        })
    print('Fap puzzles:', len(puzzles))
    # Write batches
    BATCH = 50
    for b in range(0, len(puzzles), BATCH):
        chunk = puzzles[b:b+BATCH]
        lines = ['// Pic Pic (Japan) - Fap Puzzle Data Batch %d' % (b // BATCH + 1)]
        for p in chunk:
            lines.append("export const P%s = { id: '%s', name: '%s', w: %d, h: %d, grid: new Uint8Array([" % (
                p['id'], p['id'], p['name'].replace("'", "\\'"), p['w'], p['h']))
            for i in range(0, len(p['grid']), p['w']):
                lines.append('  ' + ','.join(str(v) for v in p['grid'][i:i+p['w']]) + ',')
            lines.append('])};')
        fname = OUT / ('fap_batch_%d.ts' % (b // BATCH + 1))
        with open(fname, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        print('written', fname, os.path.getsize(fname))
    # Index
    index = ['// Fap Puzzle Index']
    for p in puzzles:
        index.append("import { P%s } from './fap_batch_%d';" % (
            p['id'], (puzzles.index(p) // BATCH) + 1))
    index.append('')
    index.append('export const FAP_PUZZLES = [')
    for p in puzzles:
        index.append('  P%s,' % p['id'])
    index.append('];')
    with open(OUT / 'fap_index.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(index))
    print('written fap_index.ts')

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    convert_lap()
    convert_fap()
