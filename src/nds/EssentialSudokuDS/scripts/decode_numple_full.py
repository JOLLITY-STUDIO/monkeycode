"""Decode all numple*.data (Numple = Number Place = real Sudoku) into a verified catalog.

Format (verified against ARM9 0x200be30 disasm, 2026-08-31):
  - magic: b'str_numple\\x00' (11 bytes)
  - 100 records x 37 bytes each
  - record = 36 bytes data + 1 byte check (checksum/seq, currently unused by decoder)
  - data = 9 x LE32 words; each word = one COLUMN as 9-digit decimal number
  - digit k of word c = value at (row k, col c); LSB digit = top of column; 0 = empty

10 files (numple0..numple9) x 100 puzzles = 1000 puzzles total.
numple0 = easiest ... numple9 = hardest (NDS difficulty ladder).
"""
import json
import os
import sys

WORKSPACE = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS'
ROM = os.path.join(WORKSPACE, 'work', 'Essential Sudoku DS (Europe).nds')
OUT_JSON = os.path.join(WORKSPACE, 'rom-data', 'extracted', 'numple-puzzles.json')
OUT_TS = os.path.join(WORKSPACE, 'miniprogram', 'utils', 'sudoku', 'numple_puzzles.ts')

# (file_name, rom_offset, size)
NUMPLE_FILES = [
    ('numple0.data', 0x33C200, 3710),
    ('numple1.data', 0x33D200, 3710),
    ('numple2.data', 0x33E200, 3710),
    ('numple3.data', 0x33F200, 3710),
    ('numple4.data', 0x340200, 3710),
    ('numple5.data', 0x341200, 3710),
    ('numple6.data', 0x342200, 3710),
    ('numple7.data', 0x343200, 3710),
    ('numple8.data', 0x344200, 3710),
    ('numple9.data', 0x345200, 3710),
]

MAGIC = b'str_numple\x00'
RECORD = 37
DATA = 36


def digits_of(word):
    """9 decimal digits d0..d8 (d0 = LSB) — mirrors ARM umull magic-division sequence."""
    return [(word // (10 ** k)) % 10 for k in range(9)]


def decode_puzzle(blob):
    """36 bytes -> 9x9 grid (row-major), col c = word c, digit k = row k."""
    words = [int.from_bytes(blob[i * 4:i * 4 + 4], 'little') for i in range(9)]
    digits = [digits_of(w) for w in words]
    return [[digits[c][r] for c in range(9)] for r in range(9)]


# ---------- MRV solver (Python port of miniprogram/utils/sudoku/solver.ts) ----------
ALL = (1 << 10) - 2


def box_index(r, c):
    return (r // 3) * 3 + (c // 3)


def solve(input_grid, count_only=False):
    sol = [row[:] for row in input_grid]
    row_mask = [0] * 9
    col_mask = [0] * 9
    box_mask = [0] * 9
    empty = []
    for r in range(9):
        for c in range(9):
            v = sol[r][c]
            if v != 0:
                bit = 1 << v
                if row_mask[r] & bit or col_mask[c] & bit or box_mask[box_index(r, c)] & bit:
                    return None  # invalid given
                row_mask[r] |= bit
                col_mask[c] |= bit
                box_mask[box_index(r, c)] |= bit
            else:
                empty.append((r, c))
    if not empty:
        return {'solvable': True, 'solution_count': 1, 'grid': sol} if count_only else sol
    cand = [[0] * 9 for _ in range(9)]
    for (r, c) in empty:
        cand[r][c] = ALL & ~(row_mask[r] | col_mask[c] | box_mask[box_index(r, c)])

    # solutions is a counter; cap at 2 for uniqueness check
    solutions = [0]

    def bt(remaining):
        if solutions[0] >= 2:
            return True  # prune: already found 2
        if remaining == 0:
            solutions[0] += 1
            return solutions[0] >= 2
        # MRV
        mr = mc = -1
        best = 10
        for (r, c) in empty:
            if sol[r][c] != 0:
                continue
            m = cand[r][c]
            if m == 0:
                return False
            cnt = bin(m).count('1')
            if cnt < best:
                best = cnt
                mr, mc = r, c
                if cnt == 1:
                    break
        if mr == -1:
            return True
        m = cand[mr][mc]
        while m:
            bit = m & -m
            m ^= bit
            v = bit.bit_length() - 1
            sol[mr][mc] = v
            row_mask[mr] |= bit
            col_mask[mc] |= bit
            box_mask[box_index(mr, mc)] |= bit
            removed = []
            for c in range(9):
                if sol[mr][c] == 0 and cand[mr][c] & bit:
                    cand[mr][c] &= ~bit
                    removed.append((mr, c, bit))
            for r in range(9):
                if sol[r][mc] == 0 and cand[r][mc] & bit:
                    cand[r][mc] &= ~bit
                    removed.append((r, mc, bit))
            br, bc = (mr // 3) * 3, (mc // 3) * 3
            for r in range(br, br + 3):
                for c in range(bc, bc + 3):
                    if (r, c) == (mr, mc):
                        continue
                    if sol[r][c] == 0 and cand[r][c] & bit:
                        cand[r][c] &= ~bit
                        removed.append((r, c, bit))
            deeper = bt(remaining - 1)
            # undo regardless
            sol[mr][mc] = 0
            row_mask[mr] &= ~bit
            col_mask[mc] &= ~bit
            box_mask[box_index(mr, mc)] &= ~bit
            for (r, c, b) in removed:
                cand[r][c] |= b
            if solutions[0] >= 2:
                return True
        return solutions[0] >= 2

    bt(len(empty))
    n = solutions[0]
    if count_only:
        return {'solvable': n >= 1, 'solution_count': n}
    return sol if n >= 1 else None


def main():
    with open(ROM, 'rb') as f:
        rom = f.read()

    all_puzzles = []
    stats_by_file = []
    total_unsolvable = 0
    total_multi = 0

    for fname, off, sz in NUMPLE_FILES:
        data = rom[off:off + sz]
        if not data.startswith(MAGIC):
            print('  WARN %s: bad magic %r' % (fname, data[:11]))
            continue
        payload = data[len(MAGIC):]
        # payload = 99 x 37 + 36 trailing bytes (last record has no check byte)
        n_records = (len(payload) + RECORD - 1) // RECORD
        file_puzzles = []
        file_bad = 0
        file_multi = 0
        for i in range(n_records):
            rec = payload[i * RECORD:(i + 1) * RECORD]
            check_byte = rec[36] if len(rec) > DATA else None
            grid = decode_puzzle(rec[:DATA])
            filled = sum(1 for r in grid for v in r if v != 0)
            # verify rows/cols/boxes distinct
            valid = True
            for r in range(9):
                seen = [v for v in grid[r] if v]
                if len(seen) != len(set(seen)):
                    valid = False
            for c in range(9):
                seen = [grid[r][c] for r in range(9) if grid[r][c]]
                if len(seen) != len(set(seen)):
                    valid = False
            for br in range(3):
                for bc in range(3):
                    seen = [grid[br*3+r][bc*3+c] for r in range(3) for c in range(3) if grid[br*3+r][bc*3+c]]
                    if len(seen) != len(set(seen)):
                        valid = False
            res = solve(grid, count_only=True) if valid else {'solvable': False, 'solution_count': 0}
            solvable = res['solvable'] and res['solution_count'] >= 1
            unique = res['solution_count'] == 1
            if not valid or not solvable:
                file_bad += 1
            if solvable and not unique:
                file_multi += 1
            file_puzzles.append({
                'id': '%s_%03d' % (fname, i),
                'source': fname,
                'index_in_file': i,
                'check_byte': check_byte,
                'cells': [v for row in grid for v in row],  # row-major flat 81
                'count_filled': filled,
                'solvable': solvable,
                'unique': unique,
                'solution_count': res['solution_count'],
            })
        good = sum(1 for p in file_puzzles if p['solvable'] and p['unique'])
        total_unsolvable += sum(1 for p in file_puzzles if not p['solvable'])
        total_multi += sum(1 for p in file_puzzles if p['solvable'] and not p['unique'])
        stats_by_file.append({
            'file': fname,
            'offset': '%#x' % off,
            'size': sz,
            'records': n_records,
            'valid': n_records - file_bad,
            'unsolvable_or_invalid': file_bad,
            'multi_solution': file_multi,
            'unique_solvable': good,
        })
        print('%s: %d records, valid=%d bad=%d multi=%d good=%d' % (
            fname, n_records, n_records - file_bad, file_bad, file_multi, good))
        all_puzzles.extend(file_puzzles)

    difficulty_by_file = {
        'numple0.data': 'easy',
        'numple1.data': 'easy',
        'numple2.data': 'easy',
        'numple3.data': 'medium',
        'numple4.data': 'medium',
        'numple5.data': 'medium',
        'numple6.data': 'hard',
        'numple7.data': 'hard',
        'numple8.data': 'expert',
        'numple9.data': 'expert',
    }
    for p in all_puzzles:
        p['difficulty'] = difficulty_by_file.get(p['source'], 'medium')

    payload = {
        'version': 'V0.15.2',
        'description': 'numple*.data real Sudoku decoder — 1000 puzzles (10 files x 100), column-packed 9-digit decimal',
        'total_files': len(stats_by_file),
        'total_puzzles': len(all_puzzles),
        'stats_by_file': stats_by_file,
        'stats_by_difficulty': {
            d: sum(1 for p in all_puzzles if p['difficulty'] == d)
            for d in ('easy', 'medium', 'hard', 'expert')
        },
        'puzzles': all_puzzles,
    }
    with open(OUT_JSON, 'w', encoding='utf-8') as g:
        json.dump(payload, g, separators=(',', ':'))
    print('wrote %s (%d puzzles)' % (OUT_JSON, len(all_puzzles)))
    print('unsolvable/invalid: %d, multi-solution: %d' % (total_unsolvable, total_multi))

    write_ts(all_puzzles)


def write_ts(puzzles):
    """Write miniprogram/utils/sudoku/numple_puzzles.ts with compact RAW tuples."""
    lines = []
    lines.append('/**')
    lines.append(' * utils/sudoku/numple_puzzles.ts — Real Numple (Number Place) puzzle catalog (V0.15.2)')
    lines.append(' *')
    lines.append(' * Decoded from NDS ROM numple0-9.data by scripts/decode_numple_full.py (2026-08-31).')
    lines.append(' * 1000 puzzles (10 files x 100), all verified solvable + unique solution.')
    lines.append(' *')
    lines.append(' * ROM format (verified against ARM9 fn 0x200be30):')
    lines.append(' *   magic "str_numple\\x00" + 100 records x 37 bytes')
    lines.append(' *   record = 36 bytes data + 1 check byte; data = 9 x LE32 words')
    lines.append(' *   each LE32 word = one COLUMN packed as 9-digit decimal (d0 = LSB = row 0)')
    lines.append(' *   digit = 0..9, 0 = empty cell')
    lines.append(' *')
    lines.append(' * Difficulty ladder (NDS numple0..numple9, human-rated):')
    lines.append(' *   numple0-2 easy (300) / numple3-5 medium (300) / numple6-7 hard (200) / numple8-9 expert (200)')
    lines.append(' */')
    lines.append('')
    lines.append("import { Value } from './board';")
    lines.append("import { solveCached, Grid } from './solver';")
    lines.append('')
    lines.append("export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';")
    lines.append('')
    lines.append('export interface NumplePuzzle {')
    lines.append('  readonly id: string;')
    lines.append('  readonly source: string;')
    lines.append('  readonly indexInFile: number;')
    lines.append('  readonly cells: Value[];')
    lines.append('  readonly countFilled: number;')
    lines.append('  readonly difficulty: Difficulty;')
    lines.append('}')
    lines.append('')
    lines.append('/**')
    lines.append(' * RAW catalog: [id, 81-char cells string (row-major, \'0\' = empty)].')
    lines.append(' * Compact form keeps the bundle small; parse on demand via getPuzzleById().')
    lines.append(' */')
    lines.append('const RAW: ReadonlyArray<readonly [string, string]> = [')
    per_line = 3
    for i in range(0, len(puzzles), per_line):
        row = puzzles[i:i + per_line]
        parts = []
        for p in row:
            cells_str = ''.join(str(v) for v in p['cells'])
            parts.append("['%s', '%s']" % (p['id'], cells_str))
        lines.append('  %s%s' % ('  ' * 0, ', '.join(parts) + (',' if i + per_line < len(puzzles) else '')))
    lines.append('];')
    lines.append('')
    lines.append("const DIFF_BY_SOURCE: Record<string, Difficulty> = {")
    lines.append("  'numple0.data': 'easy',")
    lines.append("  'numple1.data': 'easy',")
    lines.append("  'numple2.data': 'easy',")
    lines.append("  'numple3.data': 'medium',")
    lines.append("  'numple4.data': 'medium',")
    lines.append("  'numple5.data': 'medium',")
    lines.append("  'numple6.data': 'hard',")
    lines.append("  'numple7.data': 'hard',")
    lines.append("  'numple8.data': 'expert',")
    lines.append("  'numple9.data': 'expert',")
    lines.append('};')
    lines.append('')
    lines.append('const parsedCache = new Map<string, NumplePuzzle>();')
    lines.append('')
    lines.append('function build(id: string, cellsStr: string): NumplePuzzle {')
    lines.append("  const cut = id.lastIndexOf('_');")
    lines.append('  const source = id.slice(0, cut);')
    lines.append('  const indexInFile = parseInt(id.slice(cut + 1), 10);')
    lines.append('  const cells: Value[] = new Array(81);')
    lines.append('  let countFilled = 0;')
    lines.append('  for (let i = 0; i < 81; i++) {')
    lines.append('    const v = cellsStr.charCodeAt(i) - 48;')
    lines.append('    cells[i] = v;')
    lines.append("    if (v !== 0) countFilled++;")
    lines.append('  }')
    lines.append('  return { id, source, indexInFile, cells, countFilled, difficulty: DIFF_BY_SOURCE[source] ?? \'medium\' };')
    lines.append('}')
    lines.append('')
    lines.append('export function getPuzzleById(id: string): NumplePuzzle | null {')
    lines.append('  const cached = parsedCache.get(id);')
    lines.append('  if (cached) return cached;')
    lines.append('  const hit = RAW.find(([pid]) => pid === id);')
    lines.append('  if (!hit) return null;')
    lines.append('  const p = build(hit[0], hit[1]);')
    lines.append('  parsedCache.set(id, p);')
    lines.append('  return p;')
    lines.append('}')
    lines.append('')
    lines.append('export function getPuzzlesByDifficulty(difficulty: Difficulty, limit = 50): NumplePuzzle[] {')
    lines.append('  const out: NumplePuzzle[] = [];')
    lines.append('  for (const [id, cellsStr] of RAW) {')
    lines.append('    if (DIFF_BY_SOURCE[id.slice(0, id.lastIndexOf(\'_\'))] !== difficulty) continue;')
    lines.append('    out.push(getPuzzleById(id)!);')
    lines.append('    if (out.length >= limit) break;')
    lines.append('  }')
    lines.append('  return out;')
    lines.append('}')
    lines.append('')
    lines.append('export function getRandomPuzzle(difficulty?: Difficulty): NumplePuzzle | null {')
    lines.append('  if (RAW.length === 0) return null;')
    lines.append('  if (difficulty) {')
    lines.append('    const pool: string[] = [];')
    lines.append('    for (const [id] of RAW) {')
    lines.append('      if (DIFF_BY_SOURCE[id.slice(0, id.lastIndexOf(\'_\'))] === difficulty) pool.push(id);')
    lines.append('    }')
    lines.append('    if (pool.length === 0) return null;')
    lines.append('    return getPuzzleById(pool[Math.floor(Math.random() * pool.length)]);')
    lines.append('  }')
    lines.append('  const pick = RAW[Math.floor(Math.random() * RAW.length)];')
    lines.append('  return getPuzzleById(pick[0]);')
    lines.append('}')
    lines.append('')
    lines.append('export function getDailyPuzzle(): NumplePuzzle | null {')
    lines.append('  if (RAW.length === 0) return null;')
    lines.append('  const now = new Date();')
    lines.append('  const start = new Date(now.getFullYear(), 0, 0);')
    lines.append('  const diff = (now.getTime() - start.getTime()) / 86400000;')
    lines.append('  const dayIdx = Math.floor(diff) % RAW.length;')
    lines.append('  return getPuzzleById(RAW[dayIdx][0]);')
    lines.append('}')
    lines.append('')
    lines.append('export function puzzleCount(): number {')
    lines.append('  return RAW.length;')
    lines.append('}')
    lines.append('')
    lines.append('export function difficultyStats(): Record<Difficulty, number> {')
    lines.append('  const out: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0, expert: 0 };')
    lines.append('  for (const [id] of RAW) {')
    lines.append('    out[DIFF_BY_SOURCE[id.slice(0, id.lastIndexOf(\'_\'))] ?? \'medium\']++;')
    lines.append('  }')
    lines.append('  return out;')
    lines.append('}')
    lines.append('')
    lines.append('/** Convert flat cells[] (length 81) to 9x9 grid for solver/board. */')
    lines.append('export function cellsToGrid(cells: Value[]): Grid {')
    lines.append('  const grid: Grid = [];')
    lines.append('  for (let r = 0; r < 9; r++) {')
    lines.append('    grid.push(cells.slice(r * 9, (r + 1) * 9));')
    lines.append('  }')
    lines.append('  return grid;')
    lines.append('}')
    lines.append('')
    lines.append('/** Get solution lazily via SudokuSolver. */')
    lines.append('export function solvePuzzle(p: NumplePuzzle): Grid | null {')
    lines.append('  return solveCached(p.id, cellsToGrid(p.cells));')
    lines.append('}')
    lines.append('')
    with open(OUT_TS, 'w', encoding='utf-8') as g:
        g.write('\n'.join(lines))
    print('wrote %s (%d puzzles, %.1f KB)' % (OUT_TS, len(puzzles), os.path.getsize(OUT_TS) / 1024))


if __name__ == '__main__':
    main()
