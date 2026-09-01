/**
 * scripts/test_sudoku.ts — V0.4 单元测试
 *
 * 用真实 Sudoku puzzles (PUZZLE_EASY/MEDIUM/HARD) 验证 board.ts 业务逻辑:
 *  - construct without throwing
 *  - select/setValue/clearSelected happy paths
 *  - isComplete (false → true after full solution write)
 *  - hint (returns expected next cell)
 *  - given cells reject setValue/clearAt
 *  - duplicate detection in row/col/box
 *  - invalid coord/throws
 *
 * 跑法: `npm run test`  → tsc -p tsconfig.test.json → node build-test/scripts/test_sudoku.js
 */
import { SudokuBoard, Coord } from '../miniprogram/utils/sudoku/board';
import {
  REAL_PUZZLES,
  PUZZLE_EASY,
  SOLUTION_EASY,
} from '../miniprogram/utils/sudoku/real_puzzle';

let pass = 0;
let fail = 0;

function ok(cond: boolean, name: string, info?: string): void {
  if (cond) {
    pass += 1;
    console.log(`PASS ${name}`);
  } else {
    fail += 1;
    console.error(`FAIL ${name}${info ? ': ' + info : ''}`);
  }
}

function eq<T>(actual: T, expected: T, name: string): void {
  ok(actual === expected, name, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ──────────────────────────────────────────────────────────────────────
// Test 1: construct all 3 puzzles without throwing
for (const { name, puzzle, solution } of REAL_PUZZLES) {
  let threw: Error | null = null;
  try {
    new SudokuBoard(puzzle, solution);
  } catch (e) {
    threw = e instanceof Error ? e : null;
  }
  ok(threw === null, `construct ${name}`, threw ? threw.message : undefined);
}

// ──────────────────────────────────────────────────────────────────────
// Test 2: initial state = !complete
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  eq(board.isComplete(), false, 'initial !complete');
}

// ──────────────────────────────────────────────────────────────────────
// Test 3: given cells cannot be overwritten
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  // [0][0] = 5 (given)
  eq(board.cells[0][0].given, true, '[0][0] is given');
  eq(board.setValue(0, 0, 9), false, 'cannot overwrite given at [0][0]');
  eq(board.cells[0][0].value, 5, '[0][0] value preserved');
}

// ──────────────────────────────────────────────────────────────────────
// Test 4: clearAt only for non-given cells
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  eq(board.clearAt(0, 0), false, 'cannot clearAt given');
  // [0][2] = 0 originally
  eq(board.setValue(0, 2, 7), true, 'set [0][2] = 7');
  eq(board.cells[0][2].value, 7, '[0][2] now 7');
  eq(board.clearAt(0, 2), true, 'clearAt [0][2]');
  eq(board.cells[0][2].value, 0, '[0][2] cleared to 0');
}

// ──────────────────────────────────────────────────────────────────────
// Test 5: row conflict detection
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  // Set [0][2] = 5 (row 0 already has 5 at [0][0])
  board.setValue(0, 2, 5);
  eq(board.cells[0][0].isError, true, 'row conflict → [0][0] isError');
  eq(board.cells[0][2].isError, true, 'row conflict → [0][2] isError');
  eq(board.isComplete(), false, 'incomplete due to error');
}

// ──────────────────────────────────────────────────────────────────────
// Test 6: column conflict detection
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  // [0][0] = 5 (col 0); set [2][0] also to 5 → col conflict
  board.setValue(2, 0, 5);
  eq(board.cells[0][0].isError, true, 'col conflict → [0][0] isError');
  eq(board.cells[2][0].isError, true, 'col conflict → [2][0] isError');
}

// ──────────────────────────────────────────────────────────────────────
// Test 7: box conflict detection
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  // Box (0,0)=[0..2][0..2]. [0][0] = 5; [1][1] is empty (PUZZLE_EASY)
  board.setValue(1, 1, 5);
  eq(board.cells[0][0].isError, true, 'box conflict → [0][0]');
  eq(board.cells[1][1].isError, true, 'box conflict → [1][1]');
}

// ──────────────────────────────────────────────────────────────────────
// Test 8: solve the easy puzzle — complete path
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  // Walk solution and fill non-given cells
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (!board.cells[r][c].given) {
        board.setValue(r, c, SOLUTION_EASY[r][c]);
      }
    }
  }
  eq(board.isComplete(), true, 'fully solved → isComplete true');
  eq(board.moveCount > 0, true, 'moveCount > 0 after solve');
}

// ──────────────────────────────────────────────────────────────────────
// Test 9: hint returns next non-given cell
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  const h1 = board.hint();
  ok(h1 !== null, 'hint non-null after construction');
  // Walk all hints should visit each non-given cell exactly once
  if (h1 !== null) {
    const visited = new Set<string>();
    let next: Coord | null = h1;
    while (next !== null) {
      const key = `${next.row},${next.col}`;
      ok(!visited.has(key), `hint visited ${key} only once`);
      visited.add(key);
      // mark given-like to advance
      board.cells[next.row][next.col].value = board.solutionAt(next.row, next.col);
      board.cells[next.row][next.col].given = true;
      next = board.hint();
    }
    // 81 cells total - PUZZLE_EASY gives 38 (count non-zero) → 43 hints expected
    eq(visited.size > 30 && visited.size <= 81, true, 'hint visit count reasonable');
  }
}

// ──────────────────────────────────────────────────────────────────────
// Test 10: select out-of-range throws
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  let threw = false;
  try {
    board.select({ row: -1, col: 0 } as Coord);
  } catch {
    threw = true;
  }
  ok(threw, 'select out-of-range throws');
}

// ──────────────────────────────────────────────────────────────────────
// Test 11: setValue with bad value returns false
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  eq(board.setValue(0, 2, 0), true, 'setValue 0 ≡ clearAt (returns true)');
  eq(board.setValue(0, 2, 10), false, 'setValue 10 (out of range)');
  eq(board.setValue(0, 2, -1), false, 'setValue -1 (out of range)');
}

// ──────────────────────────────────────────────────────────────────────
// Test 12: clearSelected happy path
{
  const board = new SudokuBoard(PUZZLE_EASY, SOLUTION_EASY);
  board.select({ row: 0, col: 2 });
  board.setValue(0, 2, 7);
  const cleared = board.clearSelected();
  eq(cleared, true, 'clearSelected returns true');
  eq(board.cells[0][2].value, 0, 'cleared value');
  board.select(null);
  eq(board.clearSelected(), false, 'clearSelected with no selection false');
}

console.log(`\n===== ${pass} passed, ${fail} failed =====`);
if (fail > 0) {
  // node:process is universal at runtime even without @types/node in tsconfig.
  (globalThis as unknown as { process: { exit(code: number): void } }).process.exit(1);
}
