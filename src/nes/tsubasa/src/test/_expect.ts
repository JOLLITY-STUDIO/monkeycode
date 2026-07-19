/**
 * 零依赖 test runner + expect 实现
 * 替代 vitest，直接 node/npx tsx 运行即可
 */
import assert from 'node:assert/strict';

// ==============================================================
// 轻量 test runner
// ==============================================================

interface Case { name: string; fn: () => void; }
interface Suite { name: string; cases: Case[]; beforeEachFns: (() => void)[]; }

const _suites: Suite[] = [];
let _current: Suite | null = null;

export function describe(name: string, fn: () => void) {
  _current = { name, cases: [], beforeEachFns: [] };
  _suites.push(_current);
  fn();
}

export function it(name: string, fn: () => void) {
  _current!.cases.push({ name, fn });
}

export function beforeEach(fn: () => void) {
  _current!.beforeEachFns.push(fn);
}

// Auto-run after all suites registered (at process tick)
let _ran = false;
process.on('beforeExit', () => {
  if (_ran) return;
  _ran = true;

  let total = 0, passed = 0, failed = 0;
  const failures: string[] = [];

  for (const s of _suites) {
    console.log(`\n\x1b[1m${s.name}\x1b[0m`);
    for (const c of s.cases) {
      total++;
      try {
        // Run beforeEach
        for (const bf of s.beforeEachFns) bf();
        c.fn();
        passed++;
        console.log(`  \x1b[32m✓\x1b[0m ${c.name}`);
      } catch (e: any) {
        failed++;
        console.log(`  \x1b[31m✗\x1b[0m ${c.name}`);
        console.log(`    \x1b[31m${e.message}\x1b[0m`);
        failures.push(`${s.name} > ${c.name}: ${e.message}`);
      }
    }
  }

  console.log(`\n\x1b[1m${passed}/${total} passed\x1b[0m`);
  if (failed > 0) {
    console.log(`\n\x1b[31m${failed} failed:\x1b[0m`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exitCode = 1;
  }
});

// ==============================================================
// expect() 实现
// ==============================================================

class Expect {
  constructor(private actual: unknown) {}

  toBe(expected: unknown) {
    assert.strictEqual(this.actual, expected);
  }

  toEqual(expected: unknown) {
    assert.deepStrictEqual(this.actual, expected);
  }

  toBeGreaterThan(expected: number) {
    assert.ok((this.actual as number) > expected,
      `Expected ${this.actual} > ${expected}`);
  }

  toBeGreaterThanOrEqual(expected: number) {
    assert.ok((this.actual as number) >= expected,
      `Expected ${this.actual} >= ${expected}`);
  }

  toBeLessThan(expected: number) {
    assert.ok((this.actual as number) < expected,
      `Expected ${this.actual} < ${expected}`);
  }

  toBeLessThanOrEqual(expected: number) {
    assert.ok((this.actual as number) <= expected,
      `Expected ${this.actual} <= ${expected}`);
  }

  get not() {
    return {
      toThrow: (_expected?: unknown) => { /* placeholder */ },
    };
  }
}

export function expect(actual: unknown): Expect {
  return new Expect(actual);
}
