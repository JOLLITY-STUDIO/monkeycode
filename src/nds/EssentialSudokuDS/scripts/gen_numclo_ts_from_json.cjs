/**
 * gen_numclo_ts_from_json.cjs — Regenerate numclo_puzzles.ts / numclo_answers.ts
 * from the authoritative decoded JSON (rom-data/extracted/numclo-puzzles.json).
 *
 * V0.19.3: The previous TS catalog only had 998 rows (numclo0-8 + partial numclo9)
 * while the JSON had all 1401 (incl. numclo_00-03 and numclo_tu). This script makes
 * the TS regeneration independent of the ROM so the runtime catalog always matches
 * the full decode.
 *
 * Usage: node scripts/gen_numclo_ts_from_json.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IN_JSON = path.join(ROOT, 'rom-data', 'extracted', 'numclo-puzzles.json');
const OUT_TS = path.join(ROOT, 'miniprogram', 'utils', 'sudoku', 'numclo_puzzles.ts');
const OUT_TS_ANSWERS = path.join(ROOT, 'miniprogram', 'utils', 'sudoku', 'numclo_answers.ts');

const CELLS = 15 * 15; // 225

function gridToHexPacked(grid) {
  const g = grid.slice(0, CELLS);
  while (g.length < CELLS) g.push(0);
  const packed = [];
  for (let i = 0; i < CELLS; i += 3) {
    const c0 = g[i];
    const c1 = i + 1 < CELLS ? g[i + 1] : 0;
    const c2 = i + 2 < CELLS ? g[i + 2] : 0;
    packed.push(c0 + 6 * c1 + 36 * c2);
  }
  return packed.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function main() {
  const j = JSON.parse(fs.readFileSync(IN_JSON, 'utf8'));
  const puzzles = j.puzzles;
  console.log('JSON puzzles:', puzzles.length, 'files:', j.totalFiles);

  // ---- numclo_puzzles.ts ----
  const lines = [
    '/**',
    ' * utils/sudoku/numclo_puzzles.ts — Real Numclo (Picture Logic) puzzle catalog (V0.17.10)',
    ' *',
    ' * Decoded from NDS ROM numclo*.data by scripts/decode_numclo_full.py.',
    ' * 1401 puzzles (numclo0-9 x100, numclo_00-03 x100, numclo_tu x1), 15x15 grid,',
    ' * 6 colors per cell (0=empty, 1..5=palette).',
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
  ];
  for (const p of puzzles) {
    const packed = gridToHexPacked(p.grid);
    const name = String(p.name || '').replace(/'/g, "\\'");
    lines.push(`  ['${p.id}', '${p.file}', '${name}', ${p.indexInFile}, '${packed}'],`);
  }
  lines.push(
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
  );
  fs.writeFileSync(OUT_TS, lines.join('\n'), 'utf8');
  console.log('Wrote TS:', OUT_TS, '(', lines.length, 'lines )');

  // ---- numclo_answers.ts (group names by file from JSON) ----
  const byFile = {};
  for (const p of puzzles) {
    if (!p.name) continue;
    byFile[p.file] = byFile[p.file] || [];
    while (byFile[p.file].length < p.indexInFile) byFile[p.file].push('');
    byFile[p.file][p.indexInFile] = p.name;
  }
  const ansLines = [
    '/** utils/sudoku/numclo_answers.ts — Answer names for numclo0-9 (Picture Logic). */',
    '',
    'export const NUMCLO_ANSWERS: Record<string, string[]> = {',
  ];
  for (const file of Object.keys(byFile).sort()) {
    ansLines.push(`  '${file}': ${JSON.stringify(byFile[file])},`);
  }
  ansLines.push('};', '');
  fs.writeFileSync(OUT_TS_ANSWERS, ansLines.join('\n'), 'utf8');
  console.log('Wrote TS answers:', OUT_TS_ANSWERS);
}

main();
