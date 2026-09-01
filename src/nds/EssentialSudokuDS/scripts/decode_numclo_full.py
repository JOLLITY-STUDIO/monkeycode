"""V0.17.10 完整解码 numclo*.data (Picture Logic puzzles) -> JSON + TypeScript.

Format (verified against numclo.srl ARM9 parser):
  - File header: 10 bytes "str_numclo" + 1 byte (0xAA main / 0xFF tutorial)
  - Each puzzle: 76 bytes body + 1 byte separator (separator value varies: 0xAA/0xDD/0xFF)
  - Main files (numclo0-9, numclo_00-03): 100 puzzles * 77 bytes = 7700 bytes + 10 byte magic + 1 init sep = 7710 bytes
  - Tutorial file (numclo_tu.data): 1 puzzle * 76 bytes + 10 byte magic + 1 init sep = 87 bytes
  - Body decoding: each byte = c0 + 6*c1 + 36*c2, ci in [0..5]
    76 bytes -> 228 values; take first 225 = 15x15 grid row-major
    value 0 = empty/background, 1..5 = colors
"""
import os
import json
import struct

WORKSPACE = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS'
ROM = os.path.join(WORKSPACE, 'work', 'Essential Sudoku DS (Europe).nds')
OUT_JSON = os.path.join(WORKSPACE, 'rom-data', 'extracted', 'numclo-puzzles.json')
OUT_TS = os.path.join(WORKSPACE, 'miniprogram', 'utils', 'sudoku', 'numclo_puzzles.ts')
OUT_TS_ANSWERS = os.path.join(WORKSPACE, 'miniprogram', 'utils', 'sudoku', 'numclo_answers.ts')
FNT = os.path.join(WORKSPACE, 'rom-data', 'fnt-mapping.json')

WIDTH = 15
HEIGHT = 15
CELLS_PER_PUZZLE = WIDTH * HEIGHT
BODY_LEN = 76
STRIDE = BODY_LEN + 1  # body + separator


def read_bytes(path, off, sz):
    with open(path, 'rb') as f:
        f.seek(off)
        return f.read(sz)


def unpack_base6_grid(body):
    """Unpack 76-byte body to 15x15 grid (225 values 0-5)."""
    vals = []
    for b in body[:BODY_LEN]:
        vals.append(b % 6)
        vals.append((b // 6) % 6)
        vals.append((b // 36) % 6)
    return vals[:CELLS_PER_PUZZLE]


def grid_to_hex_packed(grid):
    """Pack 225 values back to 75 bytes (3 base-6 values per byte) as hex string."""
    # Take first 225 values, pad if needed
    g = list(grid)[:CELLS_PER_PUZZLE]
    while len(g) < CELLS_PER_PUZZLE:
        g.append(0)
    packed = []
    for i in range(0, CELLS_PER_PUZZLE, 3):
        c0 = g[i]
        c1 = g[i + 1] if i + 1 < len(g) else 0
        c2 = g[i + 2] if i + 2 < len(g) else 0
        packed.append(c0 + 6 * c1 + 36 * c2)
    return ''.join('%02x' % b for b in packed)


def load_seikai_names(rom, file_index):
    """Load answer names from numclo_seikaiNN.dat via fnt-mapping.json (offset + size).

    Uses the real file size from the FAT/FNT table instead of a hardcoded read
    length — the old 1300-byte hardcode read past the file end and produced
    NUL-padded garbage entries in numclo_answers.ts.
    """
    fmap = json.load(open(FNT, encoding='utf-8'))
    seikai_name = 'numclo_seikai%02d.dat' % file_index
    entry = next((f for f in fmap.get('files', []) if f.get('name') == seikai_name), None)
    if not entry:
        return []
    off = int(entry['offset'], 16) if isinstance(entry['offset'], str) else entry['offset']
    sz = entry['size']
    data = read_bytes(rom, off, sz)
    # Truncate at first NUL: the name region is NUL-padded to sector boundary.
    nul = data.find(b'\x00')
    if nul >= 0:
        data = data[:nul]
    text = data.decode('ascii', errors='ignore')
    names = [n.strip() for n in text.split('\r\n') if n.strip() and '\x00' not in n]
    return names


def decode_file(rom, entry, file_index):
    off = int(entry['offset'], 16) if isinstance(entry['offset'], str) else entry['offset']
    sz = entry['size']
    data = read_bytes(rom, off, sz)
    if len(data) < 11 or data[:10] != b'str_numclo':
        return []
    names = load_seikai_names(rom, file_index)
    puzzles = []
    pos = 11
    idx = 0
    while pos + BODY_LEN <= len(data):
        body = data[pos:pos + BODY_LEN]
        sep = data[pos + BODY_LEN] if pos + BODY_LEN < len(data) else None
        grid = unpack_base6_grid(body)
        name = names[idx] if idx < len(names) else ''
        puzzles.append({
            'id': '%s_%03d' % (entry['name'], idx),
            'file': entry['name'],
            'indexInFile': idx,
            'name': name,
            'width': WIDTH,
            'height': HEIGHT,
            'grid': grid,
            'separator': sep,
        })
        pos += STRIDE
        idx += 1
    return puzzles


def main():
    fmap = json.load(open(FNT, encoding='utf-8'))
    files = [f for f in fmap.get('files', []) if isinstance(f, dict) and f.get('name', '').startswith('numclo') and f['name'].endswith('.data')]
    # Order: numclo0..9, numclo_00..03, numclo_tu
    files.sort(key=lambda f: f['name'])

    all_puzzles = []
    file_index_map = {}
    answers_by_file = {}
    for entry in files:
        # determine main file index 0..9 for seikai lookup
        name = entry['name']
        idx = None
        if name.startswith('numclo') and name[6:7].isdigit() and name[7:8] == '.':
            idx = int(name[6])
        puzzles = decode_file(ROM, entry, idx if idx is not None else -1)
        all_puzzles.extend(puzzles)
        file_index_map[name] = len(puzzles)
        if idx is not None:
            answers_by_file[name] = load_seikai_names(ROM, idx)
        print('%s: %d puzzles' % (name, len(puzzles)))

    # Write JSON
    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    with open(OUT_JSON, 'w', encoding='utf-8') as f:
        json.dump({
            'description': 'V0.17.10 numclo*.data full decode (Picture Logic, 15x15 grid)',
            'width': WIDTH,
            'height': HEIGHT,
            'totalFiles': len(files),
            'totalPuzzles': len(all_puzzles),
            'files': [{ 'name': e['name'], 'puzzles': file_index_map[e['name']] } for e in files],
            'puzzles': all_puzzles,
        }, f, indent=2, ensure_ascii=False)
    print('Wrote JSON:', OUT_JSON)

    # Write TypeScript catalog with packed hex strings
    lines = [
        '/**',
        ' * utils/sudoku/numclo_puzzles.ts — Real Numclo (Picture Logic) puzzle catalog (V0.17.10)',
        ' *',
        ' * Decoded from NDS ROM numclo*.data by scripts/decode_numclo_full.py.',
        ' * 1525 puzzles, 15x15 grid, 6 colors per cell (0=empty, 1..5=palette).',
        ' *',
        ' * ROM format (verified against numclo.srl ARM9 parser):',
        ' *   magic "str_numclo" + 1 byte mode (0xAA main / 0xFF tutorial)',
        ' *   each puzzle = 76 byte body + 1 byte separator (0xAA/0xDD/0xFF)',
        ' *   body bytes are base-6 packed: c0 + 6*c1 + 36*c2, ci in [0..5]',
        ' *   76 bytes -> 228 values; first 225 = 15x15 row-major grid.',
        ' */',
        '',
        'export type CellColor = 0 | 1 | 2 | 3 | 4 | 5;',
        '',
        'export interface NumcloPuzzle {',
        '  readonly id: string;',
        '  readonly file: string;',
        '  readonly indexInFile: number;',
        '  readonly name: string;',
        '  readonly width: 15;',
        '  readonly height: 15;',
        '  readonly packed: string; // 75 bytes as 150 hex chars, base-6 packed',
        '}',
        '',
        'const RAW: ReadonlyArray<readonly [string, string, string, number, string]> = [',
    ]
    for p in all_puzzles:
        packed = grid_to_hex_packed(p['grid'])
        # [id, file, name, indexInFile, packed]
        lines.append("  ['%s', '%s', '%s', %d, '%s']," % (
            p['id'], p['file'], p['name'].replace("'", "\\'"), p['indexInFile'], packed))
    lines.extend([
        '];',
        '',
        'export const NUMCLO_CATALOG: ReadonlyArray<NumcloPuzzle> = RAW.map(([id, file, name, indexInFile, packed]) => ({',
        '  id, file, name, indexInFile, width: 15, height: 15, packed,',
        '}));',
        '',
        '/** Unpack 150-hex packed string to 225 CellColor values (row-major 15x15). */',
        'export function unpackNumcloGrid(packed: string): CellColor[] {',
        '  const grid: CellColor[] = [];',
        '  for (let i = 0; i < packed.length; i += 2) {',
        '    const b = parseInt(packed.substr(i, 2), 16);',
        '    grid.push((b % 6) as CellColor);',
        '    grid.push(((b / 6 | 0) % 6) as CellColor);',
        '    grid.push(((b / 36 | 0) % 6) as CellColor);',
        '  }',
        '  return grid as CellColor[];',
        '}',
        '',
        'export function getNumcloPuzzleById(id: string): NumcloPuzzle | undefined {',
        '  return NUMCLO_CATALOG.find(p => p.id === id);',
        '}',
        '',
        'export function getNumcloGridById(id: string): CellColor[] {',
        '  const p = getNumcloPuzzleById(id);',
        '  return p ? unpackNumcloGrid(p.packed) : [];',
        '}',
        '',
    ])
    with open(OUT_TS, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('Wrote TS:', OUT_TS)

    # Write answers TS
    ans_lines = [
        '/** utils/sudoku/numclo_answers.ts — Answer names for numclo0-9 (Picture Logic). */',
        '',
        'export const NUMCLO_ANSWERS: Record<string, string[]> = {',
    ]
    for name, names in sorted(answers_by_file.items()):
        ans_lines.append("  '%s': %s," % (name, json.dumps(names, ensure_ascii=False)))
    ans_lines.extend([
        '};',
        '',
    ])
    with open(OUT_TS_ANSWERS, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ans_lines))
    print('Wrote TS answers:', OUT_TS_ANSWERS)


if __name__ == '__main__':
    main()
