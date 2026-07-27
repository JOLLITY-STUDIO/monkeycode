/**
 * ============================================================================
 * Unified CLI Test Runner — runs all game-engine tests headlessly
 *
 * Usage:
 *   npx tsx game-engine/test/run-all.ts
 *   npx tsx game-engine/test/run-all.ts --verbose
 *   node --loader ts-node/esm game-engine/test/run-all.ts
 * ============================================================================
 */

import { testBootSequence } from './test-boot';
import { testInputManager } from './test-input';
import { testSceneProgression } from './test-scene';
import { testScriptEngine } from './test-script';
import { testRomReader, testScriptByteRead } from './test-rom-reader';
import { testBytecodeEngine } from './test-bytecode-engine';
import { testDialogSystem } from './test-dialog';
import { testMatchEngine } from './test-match';

interface TestSuite {
  name: string;
  fn: () => { passed: boolean; errors?: string[] } | void;
}

/** Track overall test results */
const results: { suite: string; passed: boolean; errors?: string[] }[] = [];
const verbose = process.argv.includes('--verbose');

function runSuite(suite: TestSuite): void {
  if (verbose) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`  Running: ${suite.name}`);
    console.log('='.repeat(60));
  }

  try {
    const result = suite.fn();
    const passed = result === undefined || result === undefined ? true : (result as any).passed !== false;
    const errors = result && (result as any).errors ? (result as any).errors : [];

    results.push({ suite: suite.name, passed, errors });

    if (!verbose) {
      const icon = passed ? '✓' : '✗';
      console.log(`  ${icon} ${suite.name}`);
      if (!passed && errors.length > 0) {
        for (const err of errors) {
          console.log(`    → ${err}`);
        }
      }
    }
  } catch (e: any) {
    results.push({
      suite: suite.name,
      passed: false,
      errors: [`Exception: ${e.message}\n${e.stack}`],
    });
    if (!verbose) {
      console.log(`  ✗ ${suite.name} — EXCEPTION: ${e.message}`);
    }
  }
}

// ─── Main ──────────────────────────────────────────────────────

console.log('\n╔══════════════════════════════════════════════════╗');
console.log('║  Tsubasa H5 Game Engine — Test Suite            ║');
console.log('╚══════════════════════════════════════════════════╝\n');

const suites: TestSuite[] = [
  { name: 'Boot Sequence', fn: wrapBootTest },
  { name: 'Input Manager', fn: wrapInputTest },
  { name: 'ROM Reader', fn: () => testRomReader() },
  { name: 'Scene Progression', fn: wrapSceneTest },
  { name: 'Script Byte Read', fn: () => testScriptByteRead() },
  { name: 'Bytecode Engine', fn: () => testBytecodeEngine() },
  { name: 'Dialog System', fn: () => testDialogSystem() },
  { name: 'Match Engine', fn: () => testMatchEngine() },
  { name: 'Script Engine', fn: wrapScriptTest },
];

for (const suite of suites) {
  runSuite(suite);
}

// ─── Summary ──────────────────────────────────────────────────

console.log(`\n${'─'.repeat(50)}`);
const passedCount = results.filter(r => r.passed).length;
const failedCount = results.length - passedCount;
console.log(`  Results: ${passedCount}/${results.length} passed`);

if (failedCount > 0) {
  console.log(`\n  Failed tests:`);
  for (const r of results) {
    if (!r.passed) {
      console.log(`    ✗ ${r.suite}`);
      if (r.errors) {
        for (const err of r.errors) {
          console.log(`      ${err}`);
        }
      }
    }
  }
}

if (passedCount === results.length) {
  console.log('\n  ✓ All tests passed!\n');
  process.exit(0);
} else {
  console.log(`\n  ✗ ${failedCount} test(s) failed.\n`);
  process.exit(1);
}

// ─── Wrappers that return test results ────────────────────────

function wrapBootTest(): { passed: boolean; errors: string[] } {
  const errors: string[] = [];
  const origLog = console.log;
  const origErr = console.error;

  // Capture errors from the test function
  console.error = (...args: any[]) => {
    const msg = args.join(' ');
    if (msg.includes('FAILED')) {
      errors.push(msg);
    }
    origErr(...args);
  };

  try {
    testBootSequence();
    return { passed: errors.length === 0, errors };
  } finally {
    console.log = origLog;
    console.error = origErr;
  }
}

function wrapInputTest(): { passed: boolean; errors: string[] } {
  const errors: string[] = [];
  const origErr = console.error;

  console.error = (...args: any[]) => {
    const msg = args.join(' ');
    if (msg.includes('FAILED')) {
      errors.push(msg);
    }
    origErr(...args);
  };

  try {
    testInputManager();
    return { passed: errors.length === 0, errors };
  } finally {
    console.error = origErr;
  }
}

function wrapSceneTest(): { passed: boolean; errors: string[] } {
  const errors: string[] = [];
  const origErr = console.error;

  console.error = (...args: any[]) => {
    const msg = args.join(' ');
    if (msg.includes('FAILED')) {
      errors.push(msg);
    }
    origErr(...args);
  };

  try {
    testSceneProgression();
    return { passed: errors.length === 0, errors };
  } finally {
    console.error = origErr;
  }
}

function wrapScriptTest(): { passed: boolean; errors: string[] } {
  const errors: string[] = [];
  const origErr = console.error;

  console.error = (...args: any[]) => {
    const msg = args.join(' ');
    if (msg.includes('FAILED')) {
      errors.push(msg);
    }
    origErr(...args);
  };

  try {
    testScriptEngine();
    return { passed: errors.length === 0, errors };
  } finally {
    console.error = origErr;
  }
}
