/**
 * ============================================================================
 * Match Engine — core football gameplay loop
 *
 * Ported from PRG bank 01 (match engine) and bank 26 (match core).
 *
 * Handles:
 *   - Player positioning and movement on the field
 *   - Ball physics: pass, shoot, dribble
 *   - Goal detection and scoring
 *   - Match timing: halves, extra time
 *   - Score tracking
 *
 * The field uses a coordinate system:
 *   X: 0 (left goal) → 88 (right goal), based on 8px tiles × 11 across
 *   Y: 0 (top) → 60 (bottom), based on 8px tiles × 7.5 down
 * ============================================================================
 */

import { GameState } from '../core/game-state';
import { Button } from '../core/types';

// ─── Field Constants ─────────────────────────────────────

/** Field dimensions in game units */
export const FIELD_W = 88; // 11 tiles × 8px
export const FIELD_H = 60; // 7.5 tiles × 8px

/** Goal post Y positions */
const GOAL_TOP = 18;
const GOAL_BOTTOM = 42;

/** Goal depth (X position of goal line) */
const GOAL_LEFT_X = 0;
const GOAL_RIGHT_X = FIELD_W;

/** Player movement speed */
const PLAYER_SPEED = 2;

/** Ball speed multipliers */
const BALL_SPEED_PASS = 4;
const BALL_SPEED_SHOOT = 6;

// ─── Player State ────────────────────────────────────────

interface FieldPlayer {
  /** Player ID (matches team roster) */
  id: number;
  /** Position on field */
  x: number;
  y: number;
  /** Movement direction */
  dx: number;
  dy: number;
  /** Team side: 0 = player (left, attacks right), 1 = COM (right, attacks left) */
  side: 0 | 1;
  /** Has ball possession */
  hasBall: boolean;
}

// ─── Ball State ──────────────────────────────────────────

interface BallState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** True when ball is in flight (shot/pass in progress) */
  inFlight: boolean;
}

// ─── Match State ─────────────────────────────────────────

export enum MatchPhase {
  /** Pre-match intro / kickoff */
  KICKOFF = 'kickoff',
  /** Normal play */
  PLAYING = 'playing',
  /** Ball in flight (shot/pass) */
  BALL_FLIGHT = 'ball_flight',
  /** Goal scored — celebration */
  GOAL = 'goal',
  /** Halftime / end of match */
  PAUSE = 'pause',
  /** Match finished */
  DONE = 'done',
}

export interface MatchResult {
  playerScore: number;
  comScore: number;
  matchTime: number;         // in game frames
  goalScorers: number[];     // player IDs who scored
  winner: 0 | 1 | -1;       // 0=player, 1=COM, -1=draw
}

/**
 * MatchEngine — drives the football gameplay.
 *
 * Called each frame from SceneManager._runMatchScene().
 * Input is read from GameState.input.
 */
export class MatchEngine {
  private _players: FieldPlayer[] = [];
  private _ball: BallState = { x: 0, y: 0, vx: 0, vy: 0, inFlight: false };
  private _phase: MatchPhase = MatchPhase.KICKOFF;
  private _frameCount: number = 0;
  private _half: number = 1; // 1 or 2
  private _playerScore: number = 0;
  private _comScore: number = 0;
  private _goalScorers: number[] = [];
  private _kickoffTimer: number = 0;

  /** Half length in frames (5 minutes × 60fps = 18000, but we use shorter for testing) */
  private _halfLength: number = 18000; // 5 min

  /** Whether to use shortened match (for testing) */
  shortMatch: boolean = false;

  // ─── Initialization ────────────────────────────────────

  /**
   * Initialize match with two teams.
   * Creates field players and positions them according to formation.
   */
  initMatch(playerTeamSize: number = 11, comTeamSize: number = 11): void {
    this._players = [];
    this._ball = { x: FIELD_W / 2, y: FIELD_H / 2, vx: 0, vy: 0, inFlight: false };
    this._phase = MatchPhase.KICKOFF;
    this._frameCount = 0;
    this._half = 1;
    this._playerScore = 0;
    this._comScore = 0;
    this._goalScorers = [];
    this._kickoffTimer = 60; // 1 second delay at kickoff

    if (this.shortMatch) {
      this._halfLength = 600; // 10 seconds for testing
    }

    // Create player team (left side, attacks right)
    const positions = this._getFormationPositions(playerTeamSize, 0);
    for (let i = 0; i < playerTeamSize; i++) {
      this._players.push({
        id: i,
        x: positions[i].x,
        y: positions[i].y,
        dx: 0,
        dy: 0,
        side: 0,
        hasBall: false,
      });
    }

    // Create COM team (right side, attacks left)
    const comPositions = this._getFormationPositions(comTeamSize, 1);
    for (let i = 0; i < comTeamSize; i++) {
      this._players.push({
        id: playerTeamSize + i,
        x: comPositions[i].x,
        y: comPositions[i].y,
        dx: 0,
        dy: 0,
        side: 1,
        hasBall: false,
      });
    }

    // Give ball to player team's forward (index 9 or last player)
    const kickoffPlayer = this._players[Math.min(playerTeamSize - 1, 9)];
    if (kickoffPlayer) {
      kickoffPlayer.hasBall = true;
      this._ball.x = kickoffPlayer.x;
      this._ball.y = kickoffPlayer.y;
    }
  }

  /**
   * Get formation positions based on team side.
   * Simplified 4-4-2 formation.
   */
  private _getFormationPositions(size: number, side: 0 | 1): { x: number; y: number }[] {
    const positions: { x: number; y: number }[] = [];

    if (size >= 11) {
      // GK
      const gkX = side === 0 ? 4 : FIELD_W - 4;
      positions.push({ x: gkX, y: FIELD_H / 2 });

      // Defenders (4)
      const dfX = side === 0 ? 16 : FIELD_W - 16;
      positions.push({ x: dfX, y: 10 }, { x: dfX, y: 25 }, { x: dfX, y: 35 }, { x: dfX, y: 50 });

      // Midfielders (4)
      const mfX = side === 0 ? 36 : FIELD_W - 36;
      positions.push({ x: mfX, y: 14 }, { x: mfX, y: 26 }, { x: mfX, y: 34 }, { x: mfX, y: 46 });

      // Forwards (2)
      const fwX = side === 0 ? 56 : FIELD_W - 56;
      positions.push({ x: fwX, y: 22 }, { x: fwX, y: 38 });
    } else {
      // Small team for testing: just a few players
      for (let i = 0; i < size; i++) {
        const x = side === 0 ? 20 + i * 10 : FIELD_W - 20 - i * 10;
        positions.push({ x, y: 10 + (i % 5) * 10 });
      }
    }

    return positions;
  }

  // ─── Per-Frame Update ──────────────────────────────────

  /**
   * Main update — called each frame from SceneManager.
   * @param state GameState for reading input
   */
  update(state: GameState): void {
    this._frameCount++;

    // Check match time
    if (this._frameCount > this._halfLength * this._half) {
      if (this._half === 1 && this._phase !== MatchPhase.PAUSE) {
        this._phase = MatchPhase.PAUSE;
        return;
      }
      if (this._half >= 2) {
        this._phase = MatchPhase.DONE;
        return;
      }
    }

    switch (this._phase) {
      case MatchPhase.KICKOFF:
        this._updateKickoff(state);
        break;
      case MatchPhase.PLAYING:
        this._updatePlaying(state);
        break;
      case MatchPhase.BALL_FLIGHT:
        this._updateBallFlight(state);
        break;
      case MatchPhase.GOAL:
        this._updateGoal(state);
        break;
      case MatchPhase.PAUSE:
        // Wait for input to start second half
        if (state.isPressed(Button.START)) {
          this._half = 2;
          this._phase = MatchPhase.KICKOFF;
          this._resetPositions();
        }
        break;
      case MatchPhase.DONE:
        // Match over — handled by scene manager
        break;
    }
  }

  // ─── Phase Handlers ────────────────────────────────────

  private _updateKickoff(state: GameState): void {
    if (this._kickoffTimer > 0) {
      this._kickoffTimer--;
      this._updatePlayerMovements(state);
      return;
    }
    this._phase = MatchPhase.PLAYING;
  }

  private _updatePlaying(state: GameState): void {
    const ballCarrier = this._players.find(p => p.hasBall);

    // Ball carrier movement (controlled by player input for player team)
    if (ballCarrier && ballCarrier.side === 0) {
      this._handlePlayerInput(state, ballCarrier);
    }

    // COM team basic AI
    this._updateComAI(state);

    // Ball follows carrier
    if (ballCarrier) {
      this._ball.x = ballCarrier.x;
      this._ball.y = ballCarrier.y;
    }

    // Handle pass/shoot input
    if (ballCarrier && ballCarrier.side === 0) {
      if (state.isPressed(Button.A)) {
        this._startShot(ballCarrier, BALL_SPEED_SHOOT);
      } else if (state.isPressed(Button.B)) {
        this._startPass(ballCarrier);
      }
    }

    // Update all player movements
    this._updatePlayerMovements(state);

    // Check out of bounds
    this._checkBounds();
  }

  private _updateBallFlight(state: GameState): void {
    // Move ball
    this._ball.x += this._ball.vx;
    this._ball.y += this._ball.vy;

    // Check goal
    if (this._ball.x <= GOAL_LEFT_X &&
        this._ball.y >= GOAL_TOP && this._ball.y <= GOAL_BOTTOM) {
      // Goal for COM!
      this._comScore++;
      this._phase = MatchPhase.GOAL;
      this._goalScorers.push(-1);
      this._kickoffTimer = 120;
      return;
    }

    if (this._ball.x >= GOAL_RIGHT_X &&
        this._ball.y >= GOAL_TOP && this._ball.y <= GOAL_BOTTOM) {
      // Goal for player!
      this._playerScore++;
      const shooter = this._players.find(p => p.hasBall);
      if (shooter) this._goalScorers.push(shooter.id);
      this._phase = MatchPhase.GOAL;
      this._kickoffTimer = 120;
      return;
    }

    // Check out of bounds
    if (this._ball.x < 0 || this._ball.x > FIELD_W ||
        this._ball.y < 0 || this._ball.y > FIELD_H) {
      // Ball out — reset to center
      this._ball = { x: FIELD_W / 2, y: FIELD_H / 2, vx: 0, vy: 0, inFlight: false };
      this._phase = MatchPhase.PLAYING;
      return;
    }

    // Check player interception
    for (const p of this._players) {
      if (!p.hasBall) {
        const dx = p.x - this._ball.x;
        const dy = p.y - this._ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 6) {
          // Player caught the ball
          p.hasBall = true;
          this._ball.inFlight = false;
          this._ball.vx = 0;
          this._ball.vy = 0;
          this._ball.x = p.x;
          this._ball.y = p.y;
          this._phase = MatchPhase.PLAYING;
          return;
        }
      }
    }
  }

  private _updateGoal(state: GameState): void {
    if (this._kickoffTimer > 0) {
      this._kickoffTimer--;
      return;
    }
    this._phase = MatchPhase.KICKOFF;
    this._resetPositions();
  }

  // ─── Input Handling ────────────────────────────────────

  private _handlePlayerInput(state: GameState, player: FieldPlayer): void {
    let dx = 0, dy = 0;

    if (state.isHeld(Button.LEFT))  dx = -1;
    if (state.isHeld(Button.RIGHT))  dx = 1;
    if (state.isHeld(Button.UP))    dy = -1;
    if (state.isHeld(Button.DOWN))   dy = 1;

    // Diagonal normalization
    if (dx !== 0 && dy !== 0) {
      dx *= 0.707;
      dy *= 0.707;
    }

    player.dx = dx * PLAYER_SPEED;
    player.dy = dy * PLAYER_SPEED;
  }

  // ─── COM AI ─────────────────────────────────────────────

  private _updateComAI(_state: GameState): void {
    const ball = this._ball;

    for (const p of this._players) {
      if (p.side !== 1) continue;

      if (p.hasBall) {
        // COM with ball moves toward player goal (left side)
        const targetX = GOAL_LEFT_X + 10;
        const dx = targetX - p.x;
        p.dx = Math.sign(dx) * PLAYER_SPEED * 0.7;

        // Random Y movement
        if (Math.random() < 0.02) {
          p.dy = (Math.random() - 0.5) * PLAYER_SPEED * 2;
        }
      } else {
        // Move toward ball or return to position
        const dx = ball.x - p.x;
        const dy = ball.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 40) {
          // Near ball — chase it
          p.dx = (dx / dist) * PLAYER_SPEED * 0.8;
          p.dy = (dy / dist) * PLAYER_SPEED * 0.8;
        } else {
          // Stay in position
          p.dx = 0;
          p.dy = 0;
        }
      }
    }
  }

  // ─── Ball Actions ──────────────────────────────────────

  private _startShot(player: FieldPlayer, speed: number): void {
    const targetX = player.side === 0 ? GOAL_RIGHT_X : GOAL_LEFT_X;
    const targetY = FIELD_H / 2 + (Math.random() - 0.5) * GOAL_BOTTOM * 0.6;

    const dx = targetX - player.x;
    const dy = targetY - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this._ball.vx = (dx / dist) * speed;
    this._ball.vy = (dy / dist) * speed;
    this._ball.inFlight = true;
    player.hasBall = false;
    this._phase = MatchPhase.BALL_FLIGHT;
  }

  private _startPass(player: FieldPlayer): void {
    // Pass to nearest teammate in attack direction
    const teammates = this._players.filter(
      p => p.side === player.side && p.id !== player.id
    );

    // Find teammate closest to attack direction
    let bestTeammate: FieldPlayer | null = null;
    let bestScore = -Infinity;

    for (const t of teammates) {
      const dx = t.x - player.x;
      const dy = t.y - player.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Prefer teammates ahead (in attack direction)
      const attackDir = player.side === 0 ? 1 : -1;
      const forwardScore = dx * attackDir;

      const score = forwardScore - dist * 0.1;
      if (score > bestScore && dist < 60) {
        bestScore = score;
        bestTeammate = t;
      }
    }

    if (!bestTeammate) return;

    const dx = bestTeammate.x - player.x;
    const dy = bestTeammate.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this._ball.vx = (dx / dist) * BALL_SPEED_PASS;
    this._ball.vy = (dy / dist) * BALL_SPEED_PASS;
    this._ball.inFlight = true;
    player.hasBall = false;
    this._phase = MatchPhase.BALL_FLIGHT;
  }

  // ─── Movement & Physics ────────────────────────────────

  private _updatePlayerMovements(_state: GameState): void {
    for (const p of this._players) {
      p.x += p.dx;
      p.y += p.dy;

      // Boundary clamping
      p.x = Math.max(0, Math.min(FIELD_W, p.x));
      p.y = Math.max(0, Math.min(FIELD_H, p.y));

      // Friction/damping
      p.dx *= 0.85;
      p.dy *= 0.85;
    }
  }

  private _checkBounds(): void {
    // Ball collision with field borders
    if (this._ball.x < 0) this._ball.x = 0;
    if (this._ball.x > FIELD_W) this._ball.x = FIELD_W;
    if (this._ball.y < 0) this._ball.y = 0;
    if (this._ball.y > FIELD_H) this._ball.y = FIELD_H;
  }

  // ─── Helpers ───────────────────────────────────────────

  private _resetPositions(): void {
    const playerTeamSize = this._players.filter(p => p.side === 0).length;
    const pPositions = this._getFormationPositions(playerTeamSize, 0);
    const cPositions = this._getFormationPositions(
      this._players.length - playerTeamSize, 1
    );

    let pi = 0, ci = 0;
    for (const p of this._players) {
      if (p.side === 0) {
        p.x = pPositions[pi].x;
        p.y = pPositions[pi].y;
        pi++;
      } else {
        p.x = cPositions[ci].x;
        p.y = cPositions[ci].y;
        ci++;
      }
      p.dx = 0;
      p.dy = 0;
      p.hasBall = false;
    }

    this._ball = { x: FIELD_W / 2, y: FIELD_H / 2, vx: 0, vy: 0, inFlight: false };

    // Give ball to kickoff player
    const kickoffP = this._players.find(p => p.side === 0);
    if (kickoffP) {
      kickoffP.hasBall = true;
      this._ball.x = kickoffP.x;
      this._ball.y = kickoffP.y;
    }
  }

  // ─── Public Access ─────────────────────────────────────

  get phase(): MatchPhase { return this._phase; }
  get playerScore(): number { return this._playerScore; }
  get comScore(): number { return this._comScore; }
  get half(): number { return this._half; }
  get frameCount(): number { return this._frameCount; }
  get players(): readonly FieldPlayer[] { return this._players; }
  get ball(): Readonly<BallState> { return this._ball; }
  get matchTime(): number { return this._frameCount; }

  /** Get match result (valid only when phase === DONE) */
  getResult(): MatchResult {
    return {
      playerScore: this._playerScore,
      comScore: this._comScore,
      matchTime: this._frameCount,
      goalScorers: this._goalScorers,
      winner: this._playerScore > this._comScore ? 0 :
              this._comScore > this._playerScore ? 1 : -1,
    };
  }
}
