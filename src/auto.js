/**
 * 半熟英雄专用自动探索引擎
 * 流程: 标题 → NEW → 选关 → 命名(移到END确认) → 游戏 → 探索地图
 */

const DIRS = [
  { name: 'L', btn: 6 }, { name: 'R', btn: 7 },
  { name: 'U', btn: 4 }, { name: 'D', btn: 5 },
];

class InputPattern {
  constructor(name, frames, inputsFn) {
    this.name = name;
    this.frames = frames;
    this.inputsFn = inputsFn;
  }
}

const NONE = () => ({ down: [], up: [] });

const PATTERNS = [
  // ---- 菜单/标题处理 ----
  new InputPattern('标题-等待后Start', 80, (f) => f === 40 ? { down: [3], up: [] } : f === 43 ? { down: [], up: [3] } : NONE()),
  new InputPattern('标题-等待后A', 80, (f) => f === 40 ? { down: [0], up: [] } : f === 43 ? { down: [], up: [0] } : NONE()),
  // 在NEW/CONTINUE菜单上选NEW并确认
  new InputPattern('菜单-选NEW按A', 60, (f) => f === 5 ? { down: [0], up: [] } : f === 8 ? { down: [], up: [0] } : NONE()),
  // 菜单下移再按A
  new InputPattern('菜单-下移选A', 70, (f) => {
    if (f === 3) return { down: [5], up: [] };
    if (f === 6) return { down: [], up: [5] };
    if (f === 10) return { down: [0], up: [] };
    if (f === 13) return { down: [], up: [0] };
    return NONE();
  }),
  // 菜单上移再按A
  new InputPattern('菜单-上移选A', 70, (f) => {
    if (f === 3) return { down: [4], up: [] };
    if (f === 6) return { down: [], up: [4] };
    if (f === 10) return { down: [0], up: [] };
    if (f === 13) return { down: [], up: [0] };
    return NONE();
  }),

  // ---- 命名界面: 连续右移到END位置 ----
  new InputPattern('命名-右移6到END', 80, (f) => {
    if (f >= 2 && f < 60) return { down: [7], up: [] };
    if (f === 60) return { down: [], up: [7] };
    if (f === 65) return { down: [0], up: [] };
    if (f === 68) return { down: [], up: [0] };
    return NONE();
  }),
  new InputPattern('命名-右移8到END', 80, (f) => {
    if (f >= 2 && f < 70) return { down: [7], up: [] };
    if (f === 70) return { down: [], up: [7] };
    if (f === 73) return { down: [0], up: [] };
    if (f === 76) return { down: [], up: [0] };
    return NONE();
  }),

  // ---- 长距离地图探索 ----
  new InputPattern('右移探索', 120, (f) => f < 100 ? { down: [7], up: [] } : { down: [], up: [7] }),
  new InputPattern('左移探索', 120, (f) => f < 100 ? { down: [6], up: [] } : { down: [], up: [6] }),
  new InputPattern('上移探索', 120, (f) => f < 100 ? { down: [4], up: [] } : { down: [], up: [4] }),
  new InputPattern('下移探索', 120, (f) => f < 100 ? { down: [5], up: [] } : { down: [], up: [5] }),

  // ---- Select 小地图切换 ----
  new InputPattern('Select切换地图', 40, (f) => {
    if (f === 10) return { down: [2], up: [] };
    if (f === 13) return { down: [], up: [2] };
    return NONE();
  }),

  // ---- 战斗/A连打 ----
  new InputPattern('A连打', 50, (f) => f % 4 < 2 ? { down: [0], up: [] } : { down: [], up: [0] }),
  new InputPattern('B连打', 40, (f) => f % 4 < 2 ? { down: [1], up: [] } : { down: [], up: [1] }),

  // ---- 移动+A (边走边交互) ----
  new InputPattern('右移+A', 80, (f) => ({
    down: [...(f < 70 ? [7] : []), ...(f % 6 < 2 ? [0] : [])],
    up: [...(f >= 70 ? [7] : []), ...(f % 6 >= 2 ? [0] : [])],
  })),
  new InputPattern('左移+A', 80, (f) => ({
    down: [...(f < 70 ? [6] : []), ...(f % 6 < 2 ? [0] : [])],
    up: [...(f >= 70 ? [6] : []), ...(f % 6 >= 2 ? [0] : [])],
  })),
  new InputPattern('上移+A', 80, (f) => ({
    down: [...(f < 70 ? [4] : []), ...(f % 6 < 2 ? [0] : [])],
    up: [...(f >= 70 ? [4] : []), ...(f % 6 >= 2 ? [0] : [])],
  })),
  new InputPattern('下移+A', 80, (f) => ({
    down: [...(f < 70 ? [5] : []), ...(f % 6 < 2 ? [0] : [])],
    up: [...(f >= 70 ? [5] : []), ...(f % 6 >= 2 ? [0] : [])],
  })),

  // ---- 斜向移动 ----
  new InputPattern('右上移动', 90, (f) => f < 70 ? { down: [7, 4], up: [] } : { down: [], up: [7, 4] }),
  new InputPattern('右下移动', 90, (f) => f < 70 ? { down: [7, 5], up: [] } : { down: [], up: [7, 5] }),
  new InputPattern('左上移动', 90, (f) => f < 70 ? { down: [6, 4], up: [] } : { down: [], up: [6, 4] }),
  new InputPattern('左下移动', 90, (f) => f < 70 ? { down: [6, 5], up: [] } : { down: [], up: [6, 5] }),

  // ---- 停留 ----
  new InputPattern('停留', 60, () => NONE()),

  // ---- Start菜单 ----
  new InputPattern('Start菜单', 40, (f) => {
    if (f === 5) return { down: [3], up: [] };
    if (f === 8) return { down: [], up: [3] };
    return NONE();
  }),
];

// ---- 阶段化流程: 前10个pattern专注于通过标题→菜单→命名 ----
const BOOTSTRAP_PATTERNS = [
  PATTERNS[0],  // 标题-等待后Start
  PATTERNS[1],  // 标题-等待后A
  PATTERNS[2],  // 菜单-选NEW按A
  PATTERNS[3],  // 菜单-下移选A
  PATTERNS[4],  // 菜单-上移选A
  PATTERNS[5],  // 命名-右移6到END
  PATTERNS[6],  // 命名-右移8到END
  PATTERNS[0],  // 再来一次标题Start
  PATTERNS[2],  // 再来一次选NEW
  PATTERNS[5],  // 再来一次命名
];

export class AutoRunner {
  constructor(nes) {
    this.nes = nes;
    this.running = false;
    this.patternIdx = 0;
    this.patternFrame = 0;
    this.activeButtons = new Set();
    this.currentPattern = null;
    this.totalFrames = 0;
    this.currentPatternName = '';
    this.bootstrapPhase = false;
    this.bootstrapComplete = false;
  }

  start() {
    this.running = true;
    this.patternIdx = 0;
    this.patternFrame = 0;
    this.totalFrames = 0;
    this.activeButtons.clear();
    this.currentPattern = null;
    // 先用引导模式通过标题→菜单→命名
    this.bootstrapPhase = true;
    this.bootstrapComplete = false;
  }

  stop() {
    this.running = false;
    this.releaseAll();
  }

  reset() {
    this.stop();
    this.patternIdx = 0;
    this.patternFrame = 0;
    this.totalFrames = 0;
  }

  releaseAll() {
    for (const b of this.activeButtons) {
      this.nes.buttonUp(1, b);
    }
    this.activeButtons.clear();
  }

  tick() {
    if (!this.running) return;
    if (!this.bootstrapPhase) {
      this._tickExplore();
    } else {
      this._tickBootstrap();
    }
  }

  _tickBootstrap() {
    if (this.patternFrame === 0) {
      this.releaseAll();
      if (this.patternIdx >= BOOTSTRAP_PATTERNS.length) {
        // 引导完成，进入探索模式
        this.bootstrapPhase = false;
        this.bootstrapComplete = true;
        this.patternIdx = 7; // 从探索模式开始
        this.patternFrame = 0;
        this.releaseAll();
        return;
      }
      this.currentPattern = BOOTSTRAP_PATTERNS[this.patternIdx];
      this.currentPatternName = '[引导] ' + (this.currentPattern ? this.currentPattern.name : '?');
    }

    if (!this.currentPattern) {
      this.currentPattern = BOOTSTRAP_PATTERNS[0];
    }

    this._applyPattern();

    this.patternFrame++;
    this.totalFrames++;

    if (this.patternFrame >= this.currentPattern.frames) {
      this.patternFrame = 0;
      this.patternIdx++;
    }
  }

  _tickExplore() {
    if (this.patternFrame === 0) {
      this.releaseAll();
      this.currentPattern = PATTERNS[this.patternIdx % PATTERNS.length];
      this.currentPatternName = this.currentPattern ? this.currentPattern.name : '?';
    }

    if (!this.currentPattern) {
      this.currentPattern = PATTERNS[7]; // 默认右移
    }

    this._applyPattern();
    this.patternFrame++;
    this.totalFrames++;

    if (this.patternFrame >= this.currentPattern.frames) {
      this.patternFrame = 0;
      this.patternIdx++;
      if (this.patternIdx >= PATTERNS.length) {
        this.patternIdx = 7; // 回到探索模式的开始
      }
    }
  }

  _applyPattern() {
    const { down, up } = this.currentPattern.inputsFn(this.patternFrame);

    for (const b of this.activeButtons) {
      if (!down.includes(b)) {
        this.nes.buttonUp(1, b);
        this.activeButtons.delete(b);
      }
    }
    for (const b of down) {
      if (!this.activeButtons.has(b)) {
        this.nes.buttonDown(1, b);
        this.activeButtons.add(b);
      }
    }
  }
}
