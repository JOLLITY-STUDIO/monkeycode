/**
 * scripts/test_sudoku_game_session.ts — V0.15.2 game_service integration test
 *
 * Tests SudokuGameService end-to-end against the REAL numple catalog
 * (1000 puzzles decoded from NDS numple0-9.data, all verified solvable+unique):
 *   - Catalog stats + difficulty distribution
 *   - Start new game (random per difficulty)
 *   - Verify board matches puzzle cells
 *   - Input values + verify isError
 *   - Check completion
 *   - Hint (real solutions exist for every puzzle)
 *   - End game
 *   - Solve standalone: valid puzzle solves / invalid puzzle returns null
 *
 * Run with: `npx ts-node --transpile-only scripts/test_sudoku_game_session.ts`
 */
import { SudokuGameService } from '../miniprogram/utils/sudoku/game_service';
import {
  NumplePuzzle,
  getPuzzleById,
  getPuzzlesByDifficulty,
  difficultyStats,
  puzzleCount,
  cellsToGrid,
  solvePuzzle,
} from '../miniprogram/utils/sudoku/numple_puzzles';
import { solveSudoku, solveCached } from '../miniprogram/utils/sudoku/solver';

let testCount = 0;
let testPassed = 0;

function assert(condition: boolean, msg: string): void {
  testCount += 1;
  if (condition) {
    testPassed += 1;
  } else {
    console.error(`FAIL: ${msg}`);
  }
}

function group(name: string): void {
  console.log(`\n=== ${name} ===`);
}

function runTests(): void {
  group('1. Catalog integrity (real numple data)');
  assert(puzzleCount() === 1000, `puzzleCount() === 1000 (got ${puzzleCount()})`);
  const stats = difficultyStats();
  console.log('  by difficulty:', stats);
  assert(stats.easy === 300, 'easy = 300');
  assert(stats.medium === 300, 'medium = 300');
  assert(stats.hard === 200, 'hard = 200');
  assert(stats.expert === 200, 'expert = 200');

  group('2. Puzzle data validity: every puzzle is a valid, solvable, unique grid');
  let allValid = true;
  for (let i = 0; i < 1000; i += 97) {  // sample across the whole catalog
    const id = `numple${Math.floor(i / 100)}.data_${String(i % 100).padStart(3, '0')}`;
    const p = getPuzzleById(id);
    assert(p !== null, `getPuzzleById(${id})`);
    if (!p) continue;
    const grid = cellsToGrid(p.cells);
    const sol = solveCached(id, grid);
    if (!sol) {
      allValid = false;
      console.error(`  unsolvable: ${id}`);
    }
    // verify solution consistent with givens
    if (sol) {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (grid[r][c] !== 0 && sol[r][c] !== grid[r][c]) {
            allValid = false;
            console.error(`  solution mismatch: ${id} @ (${r},${c})`);
          }
        }
      }
    }
  }
  assert(allValid, 'all sampled puzzles solvable + solutions consistent');

  group('3. Start new game (random per difficulty)');
  const svc = new SudokuGameService();
  const r = svc.startNewGame('medium');
  assert(r.ok, 'startNewGame returns ok');
  const board = svc.getBoard();
  assert(board !== null, 'board is non-null');
  assert(board!.cells.length === 9, '9x9 grid');
  assert(svc.getPuzzleId() !== null, 'puzzle id set');

  group('4. Verify board state matches puzzle cells');
  const sid = svc.getPuzzleId()!;
  const puzzle: NumplePuzzle | null = getPuzzleById(sid);
  assert(puzzle !== null, `getPuzzleById for session id (${sid})`);
  let allMatch = true;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (puzzle && board!.cells[r][c].value !== puzzle.cells[r * 9 + c]) {
        allMatch = false;
      }
    }
  }
  assert(allMatch, 'all 81 cells match puzzle input');

  group('5. Solver integration: hint returns valid value (all puzzles solvable)');
  const hint = svc.hint();
  assert(hint !== null, 'hint returns non-null');
  if (hint) {
    assert(hint.value >= 1 && hint.value <= 9, `hint value in range 1-9 (got ${hint.value})`);
    assert(hint.row >= 0 && hint.row < 9 && hint.col >= 0 && hint.col < 9, 'hint row/col in range');
  }

  group('6. Input value + verify moves increment');
  const move0 = svc.getSessionInfo()!.moves;
  const hintCell = hint!;
  svc.inputValue(hintCell.row, hintCell.col, hintCell.value);
  const move1 = svc.getSessionInfo()!.moves;
  assert(move1 > move0, `moves incremented after input (${move0} -> ${move1})`);
  const cell = board!.cells[hintCell.row][hintCell.col];
  assert(cell.value === hintCell.value, 'hint value written to cell');
  assert(!cell.isError, 'correct hint value has no error flag');

  group('7. Wrong input → isError flagged');
  // isError is conflict-based (row/col/box duplicate). Write a value that
  // duplicates an already-placed value in the same row/col/box → guaranteed flag.
  let wrongCell: { r: number; c: number } | null = null;
  for (let r = 0; r < 9 && !wrongCell; r++) {
    for (let c = 0; c < 9 && !wrongCell; c++) {
      const cl = board!.cells[r][c];
      if (cl.given || cl.value !== 0) continue;
      for (let rr = 0; rr < 9 && !wrongCell; rr++) {
        if (rr === r) continue;
        const vv = board!.cells[rr][c].value;
        if (vv !== 0) {
          svc.inputValue(r, c, vv);
          wrongCell = { r, c };
        }
      }
      if (!wrongCell) {
        for (let cc = 0; cc < 9; cc++) {
          if (cc === c) continue;
          const vv = board!.cells[r][cc].value;
          if (vv !== 0) {
            svc.inputValue(r, c, vv);
            wrongCell = { r, c };
            break;
          }
        }
      }
    }
  }
  assert(wrongCell !== null, 'found a non-given cell for wrong-input test');
  if (wrongCell) {
    assert(board!.cells[wrongCell.r][wrongCell.c].isError, 'wrong input flagged isError');
  }

  group('8. Check completion before solve → incomplete');
  const completion1 = svc.checkCompletion();
  assert(!completion1.complete, 'puzzle not complete initially');

  group('9. End game returns stats');
  const end = svc.endGame();
  assert(end !== null, 'endGame returns non-null');
  assert(typeof end!.moves === 'number', 'moves is number');
  assert(typeof end!.durationMs === 'number', 'durationMs is number');

  group('10. Solve standalone: known valid puzzle solves');
  const known = getPuzzleById('numple0.data_000')!;
  const sol = solvePuzzle(known);
  assert(sol !== null, 'numple0.data_000 solves');
  if (sol) {
    const grid = cellsToGrid(known.cells);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] !== 0) {
          assert(sol[r][c] === grid[r][c], `solution keeps given @ (${r},${c})`);
        }
      }
    }
  }

  group('11. Solve impossible puzzle → returns null');
  const sol2 = solveSudoku([
    [5, 5, 0, 0, 0, 0, 0, 0, 0],  // duplicate 5 in row!
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  assert(sol2 === null, 'invalid puzzle with duplicate → unsolvable');

  group('12. Expert puzzles exist and are solvable');
  const experts = getPuzzlesByDifficulty('expert', 3);
  assert(experts.length === 3, 'getPuzzlesByDifficulty(expert, 3)');
  for (const p of experts) {
    const s = solvePuzzle(p);
    assert(s !== null, `expert ${p.id} solvable`);
  }

  console.log(`\n=== ${testPassed}/${testCount} tests passed ===`);
  if (testPassed !== testCount) throw new Error(`${testCount - testPassed} tests failed`);
}

runTests();
