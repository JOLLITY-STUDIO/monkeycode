"""V0.6 numclo decoder (CLI) — full parse + sudoku validation + JSON output"""
import os
import sys
import json


WORKSPACE = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS'
ROM = os.path.join(WORKSPACE, 'work', 'Essential Sudoku DS (Europe).nds')
OUT_DIR = os.path.join(WORKSPACE, 'rom-data', 'extracted')


def read_bytes(path, off, sz):
    with open(path, 'rb') as f:
        f.seek(off)
        return f.read(sz)


def parse_puzzles(data, file_name, max_puzzles=200):
    """Pragmatic numclo parser: low-nibble = cell value, 0xAA/FF = separator."""
    if len(data) < 12 or data[:10] != b'str_numclo':
        return []
    pos = 10
    puzzles = []
    while pos < len(data):
        while pos < len(data) and data[pos] in (0xAA, 0xFF, 0x00):
            pos += 1
        if pos >= len(data):
            break
        cells = []
        while pos < len(data):
            b = data[pos]
            if b in (0xAA, 0xFF):
                pos += 1
                break
            low = b & 0x0F
            if 1 <= low <= 9:
                cells.append(low)
            else:
                cells.append(0)
            pos += 1
            if len(cells) >= 81:
                cells = cells[:81]
                break
        while len(cells) < 81:
            cells.append(0)
        puzzles.append({
            'source': file_name,
            'cells': cells,
            'count_filled': sum(1 for c in cells if c != 0),
        })
        if len(puzzles) >= max_puzzles:
            break
    return puzzles


def solve_check(grid):
    """Check if puzzle is solvable. Returns (solvable, solution) tuple."""
    def is_valid(sol, row, col, v):
        for i in range(9):
            if i != col and sol[row][i] == v:
                return False
            if i != row and grid[i][col] == v:
                return False
        br = (row // 3) * 3
        bc = (col // 3) * 3
        for r in range(br, br + 3):
            for c in range(bc, bc + 3):
                if r != row and c != col and sol[r][c] == v:
                    return False
        return True

    sol = [row[:] for row in grid]
    empty = [(r, c) for r in range(9) for c in range(9) if sol[r][c] == 0]

    def bt(idx):
        if idx >= len(empty):
            return True
        r, c = empty[idx]
        for v in range(1, 10):
            if is_valid(sol, r, c, v):
                sol[r][c] = v
                if bt(idx + 1):
                    return True
                sol[r][c] = 0
        return False

    if bt(0):
        return True, sol
    return False, None


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    fmap = json.load(open(os.path.join(WORKSPACE, 'rom-data/fnt-mapping.json'), encoding='utf-8'))
    files = fmap.get('files', [])
    numclo_files = [f for f in files if isinstance(f, dict)
                    and f.get('name', '').startswith('numclo')
                    and f['name'].endswith('.data')]

    summary = []
    total_puzzles = 0
    sample_solvable = 0
    for f in numclo_files:
        off = int(f['offset'], 16) if isinstance(f['offset'], str) else f['offset']
        sz = f['size']
        try:
            data = read_bytes(ROM, off, sz)
        except FileNotFoundError:
            continue
        puzzles = parse_puzzles(data, f['name'])
        sample_summary = []
        for i, p in enumerate(puzzles[:5]):
            grid = [p['cells'][r * 9:(r + 1) * 9] for r in range(9)]
            ok, _ = solve_check(grid)
            sample_summary.append({
                'index': i,
                'count_filled': p['count_filled'],
                'solvable': ok,
            })
            if ok:
                sample_solvable += 1
        total_puzzles += len(puzzles)
        summary.append({
            'file': f['name'],
            'offset': '%#x' % off,
            'size': sz,
            'parsed_puzzles': len(puzzles),
            'sample': sample_summary,
        })

    out = os.path.join(OUT_DIR, 'numclo-decoded.json')
    payload = {
        'description': 'V0.6 numclo*.data parse (low-nibble cell value, 0xAA separator)',
        'total_files': len(summary),
        'total_puzzles': total_puzzles,
        'sample_solvable_first5_per_file': sample_solvable,
        'note': 'Pragmatic parser — high nibble carries visual state; full reverse pending V0.7+',
        'files': summary,
    }
    with open(out, 'w', encoding='utf-8') as g:
        json.dump(payload, g, indent=2, ensure_ascii=False)
    log_path = '_v6_log.txt'
    with open(log_path, 'w', encoding='utf-8') as lf:
        lf.write('Wrote: %s\n' % out)
        lf.write('Total puzzles parsed: %d\n' % total_puzzles)
        lf.write('Sample solvable (first 5 each): %d\n' % sample_solvable)
        for s in summary:
            lf.write('  %s: parsed %d puzzles\n' % (s['file'], s['parsed_puzzles']))


main()
