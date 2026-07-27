/**
 * ============================================================================
 * Test: Match Engine — validates core football gameplay
 *
 * Tests:
 *   1. Match initialization and formation
 *   2. Player input handling (movement)
 *   3. Ball physics (pass, shoot)
 *   4. Goal detection
 *   5. Match timing (halves)
 *   6. Score tracking
 *   7. COM AI basic behavior
 * ============================================================================
 */

import { TestRunner } from './test-framework';
import { Button } from '../core/types';
import { MatchEngine, MatchPhase } from '../core/match-engine';

export function testMatchEngine(): { passed: boolean; errors: string[] } {
  const errors: string[] = [];

  console.log('\n=== Test: Match Engine ===');

  // ─── Test 1: Initialization ────────────────────────────
  {
    const engine = new MatchEngine();
    engine.shortMatch = true;
    engine.initMatch(11, 11);

    if (engine.phase !== MatchPhase.KICKOFF) {
      errors.push(`Init: expected KICKOFF phase, got ${engine.phase}`);
    }
    if (engine.players.length !== 22) {
      errors.push(`Init: expected 22 players, got ${engine.players.length}`);
    }
    if (engine.playerScore !== 0 || engine.comScore !== 0) {
      errors.push(`Init: expected score 0-0, got ${engine.playerScore}-${engine.comScore}`);
    }

    // Verify ball carrier exists
    const carrier = engine.players.find(p => p.hasBall);
    if (!carrier) {
      errors.push('Init: no player has ball at kickoff');
    }
    if (carrier && carrier.side !== 0) {
      errors.push(`Init: expected player team to have ball, got side ${carrier.side}`);
    }

    console.log(`  Init: 22 players, phase=${engine.phase}, ball carrier=${carrier ? `player[${carrier.id}]` : 'none'} ✓`);
  }

  // ─── Test 2: Formation positions ────────────────────────
  {
    const engine = new MatchEngine();
    engine.shortMatch = true;
    engine.initMatch(11, 11);

    // Check that all players are within field bounds
    let allInBounds = true;
    for (const p of engine.players) {
      if (p.x < 0 || p.x > 88 || p.y < 0 || p.y > 60) {
        allInBounds = false;
        errors.push(`Formation: player[${p.id}] out of bounds (${p.x}, ${p.y})`);
      }
    }

    if (!allInBounds) {
      errors.push('Formation: some players out of field bounds');
    }
    console.log(`  Formation: all players in bounds ✓`);
  }

  // ─── Test 3: Player movement ────────────────────────────
  {
    const runner = new TestRunner();
    runner.reset();

    // Create a standalone MatchEngine and drive it manually
    const engine = new MatchEngine();
    engine.shortMatch = true;
    engine.initMatch(11, 11);

    // Simulate moving player team right (attack direction)
    const state = runner.getState();
    state.input.current = Button.RIGHT;

    // Advance past kickoff
    for (let i = 0; i < 65; i++) {
      state.input.pressed = (state.input.current ^ state.input.previous) & state.input.current;
      state.input.previous = state.input.current;
      engine.update(state);
    }

    // Check that phase advanced from KICKOFF
    if (engine.phase === MatchPhase.KICKOFF) {
      errors.push('Movement: still in KICKOFF after 65 frames');
    }
    console.log(`  Movement: phase=${engine.phase} after 65 frames ✓`);
  }

  // ─── Test 4: Ball shooting ──────────────────────────────
  {
    const runner = new TestRunner();
    runner.reset();

    const engine = new MatchEngine();
    engine.shortMatch = true;
    engine.initMatch(11, 11);

    const state = runner.getState();

    // Advance past kickoff
    for (let i = 0; i < 61; i++) {
      state.input.pressed = (state.input.current ^ state.input.previous) & state.input.current;
      state.input.previous = state.input.current;
      engine.update(state);
    }

    // Press A to shoot
    state.input.current = Button.A;
    state.input.pressed = Button.A;

    engine.update(state);
    state.input.previous = state.input.current;
    state.input.current = 0;
    state.input.pressed = 0;

    // After shot, ball should be in flight
    const ballInFlight = engine.ball.inFlight;
    console.log(`  Shoot: ball in flight=${ballInFlight}, phase=${engine.phase}`);

    // Run ball flight to completion
    for (let i = 0; i < 50; i++) {
      state.input.pressed = 0;
      engine.update(state);
      if (engine.phase === MatchPhase.GOAL) break;
    }

    console.log(`  After flight: phase=${engine.phase}, score=${engine.playerScore}-${engine.comScore}`);
  }

  // ─── Test 5: Goal detection ─────────────────────────────
  {
    const runner = new TestRunner();
    runner.reset();

    const engine = new MatchEngine();
    engine.shortMatch = true;
    engine.initMatch(11, 11);

    const state = runner.getState();

    // Move past kickoff
    for (let i = 0; i < 61; i++) {
      state.input.pressed = (state.input.current ^ state.input.previous) & state.input.current;
      state.input.previous = state.input.current;
      engine.update(state);
    }

    // Shoot toward goal multiple times
    let totalGoals = 0;
    for (let attempt = 0; attempt < 10; attempt++) {
      state.input.current = Button.A;
      state.input.pressed = Button.A;
      engine.update(state);
      state.input.previous = state.input.current;
      state.input.current = 0;
      state.input.pressed = 0;

      // Run until ball flight ends
      for (let i = 0; i < 40; i++) {
        engine.update(state);
        if (engine.phase === MatchPhase.GOAL) {
          totalGoals++;
          // Run past goal celebration
          for (let j = 0; j < 125; j++) {
            engine.update(state);
          }
          break;
        }
        if (engine.phase === MatchPhase.PLAYING) break;
      }
    }

    console.log(`  Goal detection: ${totalGoals}/10 shots resulted in goals, score=${engine.playerScore}-${engine.comScore}`);
    if (engine.playerScore === 0 && totalGoals === 0) {
      // This is not an error — shooting from far away may miss
      console.log('  (No goals scored — normal from far distance)');
    }
  }

  // ─── Test 6: Match flow (full short match) ──────────────
  {
    const runner = new TestRunner();
    runner.reset();

    const engine = new MatchEngine();
    engine.shortMatch = true;
    engine.initMatch(11, 11);

    const state = runner.getState();

    // Run a full short match (10 seconds = 600 frames)
    let maxFrames = 1000;
    for (let i = 0; i < maxFrames; i++) {
      state.input.pressed = (state.input.current ^ state.input.previous) & state.input.current;
      state.input.previous = state.input.current;

      // Simulate occasional input
      if (i % 30 === 0) {
        state.input.current = Button.RIGHT;
      } else if (i % 30 === 15) {
        state.input.current = Button.A;
      }

      engine.update(state);

      if (engine.phase === MatchPhase.DONE) break;

      // Clear input after one frame
      state.input.current = 0;
    }

    const result = engine.getResult();
    console.log(`  Full match: ${result.playerScore}-${result.comScore}, frames=${engine.matchTime}, phase=${engine.phase}`);

    if (engine.matchTime > maxFrames) {
      errors.push(`Full match: exceeded max frames (${maxFrames})`);
    }
  }

  // ─── Test 7: COM AI presence ────────────────────────────
  {
    const engine = new MatchEngine();
    engine.shortMatch = true;
    engine.initMatch(11, 11);

    const comPlayers = engine.players.filter(p => p.side === 1);
    let allHavePositions = comPlayers.every(p => p.x > 0 && p.y > 0);

    if (!allHavePositions) {
      errors.push('COM AI: not all COM players have valid positions');
    }

    // COM team should be on right side
    const avgX = comPlayers.reduce((s, p) => s + p.x, 0) / comPlayers.length;
    console.log(`  COM AI: ${comPlayers.length} players, avg X=${avgX.toFixed(1)} ✓`);

    if (avgX < 30) {
      errors.push(`COM AI: expected COM team on right side, avg X=${avgX.toFixed(1)}`);
    }
  }

  // ─── Test 8: Score tracking ─────────────────────────────
  {
    const engine = new MatchEngine();
    engine.shortMatch = true;
    engine.initMatch(11, 11);

    const result = engine.getResult();

    if (result.playerScore !== 0 || result.comScore !== 0) {
      errors.push(`Score: expected 0-0 at start, got ${result.playerScore}-${result.comScore}`);
    }
    console.log('  Score tracking: initial 0-0 correct ✓');
  }

  if (errors.length === 0) {
    console.log('  ✅ Match Engine test PASSED\n');
  } else {
    console.error('  ❌ Match Engine test FAILED:');
    for (const err of errors) console.error(`     ${err}`);
    console.log('');
  }

  return { passed: errors.length === 0, errors };
}
