/**
 * 天使之翼 II — 自动测试框架
 *
 * 三层职责：
 *   1) 自动跑游戏 (jsnes ground truth)
 *   2) 场景状态追踪 (RAM 关键地址断点)
 *   3) 反汇编验证 (对比 TS disasm 与真机状态)
 *
 * 用法: node _test_framework.mjs
 */

import { NES } from 'jsnes';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// ─── 配置 ────────────────────────────────────────────────────────────
const ROM_PATH = 'src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan).nes';
const OUT_DIR = 'test_output';
const LOG_EVERY_N_FRAMES = 600; // 每 600 帧打印状态
const SCREENSHOT_INTERVAL = 1200; // 每 1200 帧截图
const MAX_SAME_SCENE_FRAMES = 3600; // 同一场景停留超过此帧数 → 暴力跳过

// ─── 手柄按键 ────────────────────────────────────────────────────────
const BTN = { A: 0, B: 1, SELECT: 2, START: 3, UP: 4, DOWN: 5, LEFT: 6, RIGHT: 7 };

// ─── 游戏 RAM 关键地址 (对应 disasm 常量表) ──────────────────────────
const RAM_ADDR = {
  // ZP 场景/任务
  SCENE_STATE:    0x26,  // 场景状态索引
  JMP_IDX:        0x27,  // 跳转表索引
  SCENE_STATUS:   0x4C,  // 场景处理状态码
  NT_BANK:        0x5A,  // 当前 nametable bank
  NT_INDEX:       0x56,  // NT 索引源
  PPU_ADDR_LO:    0xE6,
  PPU_ADDR_HI:    0xE7,
  SCRIPT_LO:      0x4D,  // 脚本指针低字节
  SCRIPT_HI:      0x4E,

  // 手柄
  JOYPAD1:        0x1B,
  JOYPAD1_NEW:    0x1C,
  JOYPAD1_PREV:   0x1D,

  // 通用
  NMI_TRIGGER:    0xE0,
  FLAGS:          0x1E,
  SCROLL_X:       0x05,
  SCROLL_Y:       0x06,

  // 比赛
  MATCH_STATE:    0x0440,   // 比赛状态 (推测)
  TEAM_PLAYER:    0x0700,   // 队伍球员数据区起始 (推测)

  // MMC3
  MMC3_BANK_8:    0x24,     // $8000-$9FFF bank
  MMC3_BANK_A:    0x25,     // $A000-$BFFF bank
};

// ─── 工具函数 ────────────────────────────────────────────────────────
const hex8 = (v) => (v & 0xFF).toString(16).padStart(2, '0').toUpperCase();
const hex16 = (v) => (v & 0xFFFF).toString(16).padStart(4, '0').toUpperCase();

class TestRunner {
  constructor() {
    this.frame = 0;
    this.scene = -1;
    this.prevScene = -1;
    this.sceneLog = [];         // [{frame, scene, ntBank, ...}]
    this.screenshots = [];
    this.lastSceneFrame = 0;
    this.finished = false;
    this.autoMode = 'init';     // init | title | password_stage | story | match | done

    if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

    // 初始化 NES
    this.nes = new NES({
      onFrame: (buffer) => { this.onFrame(buffer); },
      onStatusUpdate: () => {},
    });

    const romBuf = readFileSync(ROM_PATH);
    const mapper = (romBuf[6] >> 4) | (romBuf[7] & 0xF0);
    this.log(`ROM: ${romBuf.length}B, mapper ${mapper}`);
    this.nes.loadROM(new Uint8Array(romBuf));
  }

  // ─── NES 快捷操作 ──────────────────────────────────────────────
  ram(addr) { return this.nes.cpu.mem[addr] & 0xFF; }
  pc() { return this.nes.cpu.REG_PC; }
  tick(n = 1) { for (let i = 0; i < n; i++) { this.nes.frame(); this.frame++; } }
  btnDown(b) { this.nes.buttonDown(1, b); }
  btnUp(b) { this.nes.buttonUp(1, b); }
  hold(btn, fs) { this.btnDown(btn); this.tick(fs); this.btnUp(btn); }
  tap(btn, fs = 8) { this.hold(btn, fs); }
  wait(n) { this.tick(n); }

  log(...a) {
    const line = `[${String(this.frame).padStart(7)}|${this.autoMode.padEnd(15)}] ${a.join(' ')}`;
    console.log(line);
  }

  // ─── 帧回调 ────────────────────────────────────────────────────
  onFrame(buffer) {
    if (this.frame % SCREENSHOT_INTERVAL === 0) {
      this.dumpRam();
    }
    if (this.frame % LOG_EVERY_N_FRAMES === 0) {
      this.printStatus();
    }
    this.detectStateChange();
  }

  // ─── 状态检测 ──────────────────────────────────────────────────
  detectStateChange() {
    const scene = this.ram(RAM_ADDR.SCENE_STATE);
    this.scene = scene;
    if (scene !== this.prevScene) {
      this.onSceneChange(this.prevScene, scene);
      this.prevScene = scene;
      this.lastSceneFrame = this.frame;
      this._sameSceneStartFrame = this.frame; // 重置超时计时
    }

    // 通用卡场景检测：同一场景停留太久 → 暴力跳
    if (!this._sameSceneStartFrame) this._sameSceneStartFrame = this.frame;
    const stuckFrames = this.frame - this._sameSceneStartFrame;
    if (stuckFrames > MAX_SAME_SCENE_FRAMES && scene !== 0xFF) {
      this.log(`!!! 场景 $${hex8(scene)} 卡了 ${stuckFrames} 帧，暴力 +1 !!!`);
      const next = (scene + 1) & 0xFF;
      this.nes.cpu.mem[RAM_ADDR.SCENE_STATE] = next;
      this._sameSceneStartFrame = this.frame;
      // 重置各阶段状态
      this._pwDone = false;
      this._pwStartFrame = 0;
      this._titleEnterFrame = 0;
      this._menuFrame = 0;
    }
  }

  onSceneChange(from, to) {
    const ntBank  = this.ram(RAM_ADDR.NT_BANK);
    const ntIdx   = this.ram(RAM_ADDR.NT_INDEX);
    const bank8   = this.ram(RAM_ADDR.MMC3_BANK_8);
    const bankA   = this.ram(RAM_ADDR.MMC3_BANK_A);
    const scriptL = this.ram(RAM_ADDR.SCRIPT_LO);
    const scriptH = this.ram(RAM_ADDR.SCRIPT_HI);

    const entry = {
      frame: this.frame,
      fromScene: from,
      toScene: to,
      ntBank,
      ntIndex: ntIdx,
      mmc3Bank8000: bank8,
      mmc3BankA000: bankA,
      scriptPtr: (scriptH << 8) | scriptL,
      pc: this.pc(),
    };
    this.sceneLog.push(entry);

    this.log(`SCENE ${from}→${to}  ntBank=$${hex8(ntBank)}  ntIdx=$${hex8(ntIdx)}  bank8=$${hex8(bank8)}  bankA=$${hex8(bankA)}  script=$${hex16(entry.scriptPtr)}`);
    this.dumpDetailed();
  }

  // ─── RAM dump ──────────────────────────────────────────────────
  dumpRam() {
    const ntBank = this.ram(RAM_ADDR.NT_BANK);
    const scene  = this.ram(RAM_ADDR.SCENE_STATE);
    const out = {
      frame: this.frame,
      scene,
      ntBank,
      ntIndex:      this.ram(RAM_ADDR.NT_INDEX),
      jmpIdx:       this.ram(RAM_ADDR.JMP_IDX),
      sceneStatus:  this.ram(RAM_ADDR.SCENE_STATUS),
      mmc3_8000:    this.ram(RAM_ADDR.MMC3_BANK_8),
      mmc3_A000:    this.ram(RAM_ADDR.MMC3_BANK_A),
      scriptLo:     this.ram(RAM_ADDR.SCRIPT_LO),
      scriptHi:     this.ram(RAM_ADDR.SCRIPT_HI),
      nmiTrigger:   this.ram(RAM_ADDR.NMI_TRIGGER),
      joypad1:      this.ram(RAM_ADDR.JOYPAD1),
      joypad1New:   this.ram(RAM_ADDR.JOYPAD1_NEW),
      // MMC3 状态
      mmc3_r0:      (this.nes.cpu && this.nes.cpu.mem) ? this.nes.cpu.mem[0x8000] : 0,
    };

    // 保存场景日志 JSON
    const snapFile = join(OUT_DIR, `snap_f${this.frame}_s${scene}.json`);
    writeFileSync(snapFile, JSON.stringify(out, null, 2));

    return out;
  }

  dumpDetailed() {
    // ZP 关键区域
    const zp = [];
    for (let i = 0; i < 256; i++) zp.push(hex8(this.ram(i)));
    const zpFile = join(OUT_DIR, `zp_f${this.frame}_s${this.scene}.json`);
    writeFileSync(zpFile, JSON.stringify(zp));

    // $0400-$04FF 场景数据区
    const sceneBuf = [];
    for (let i = 0x400; i <= 0x4FF; i++) sceneBuf.push(hex8(this.ram(i)));
    const sceneFile = join(OUT_DIR, `scene_f${this.frame}_s${this.scene}.json`);
    writeFileSync(sceneFile, JSON.stringify(sceneBuf));
  }

  // ─── 状态打印 ──────────────────────────────────────────────────
  printStatus() {
    const scene = this.ram(RAM_ADDR.SCENE_STATE);
    const ntBank = this.ram(RAM_ADDR.NT_BANK);
    const pc = this.pc();
    const bankA = this.ram(RAM_ADDR.MMC3_BANK_A);
    const nmiTimer = this.ram(0x78);
    const ppuMode = this.ram(0x79);
    const nmiTrig = this.ram(RAM_ADDR.NMI_TRIGGER);
    const sceneStat = this.ram(RAM_ADDR.SCENE_STATUS);
    const joyNew = this.ram(RAM_ADDR.JOYPAD1_NEW);
    this.log(`scene=$${hex8(scene)} sStat=$${hex8(sceneStat)} ntBank=$${hex8(ntBank)} bankA=$${hex8(bankA)} PC=$${hex16(pc)} nmiTm=$${hex8(nmiTimer)} ppuMd=$${hex8(ppuMode)} e0=$${hex8(nmiTrig)} joyNew=$${hex8(joyNew)}`);
  }

  // ─── 自动操作：根据游戏阶段执行不同策略 ────────────────────────
  autoStep() {
    switch (this.autoMode) {
      case 'init':
        return this.phaseInit();
      case 'title':
        return this.phaseTitle();
      case 'menu_pick':
        return this.phaseMenuPick();
      case 'password_stage':
        return this.phasePasswordStage();
      case 'story':
        return this.phaseStory();
      case 'match':
        return this.phaseMatch();
      case 'done':
        return this.finishRun();
      default:
        this.wait(30);
    }
  }

  // ─── 通用：连按一个键 ────────────────────────────────────────
  spam(btn, repeat, holdFrames = 10, gapFrames = 8) {
    for (let i = 0; i < repeat; i++) {
      this.btnDown(btn);
      this.tick(holdFrames);
      this.btnUp(btn);
      this.tick(gapFrames);
    }
  }

  // 阶段 1：等待标题画面出现
  phaseInit() {
    if (this._phaseInitCount === undefined) {
      this._phaseInitCount = 0;
      this.log('── ROM 加载，等待初始化 ──');
      this.wait(240); // 4 秒应该够 RESET → NMI → 标题画面
    }
    this._phaseInitCount++;
    const scene = this.ram(RAM_ADDR.SCENE_STATE);

    if (scene !== 0xFF && this._phaseInitCount > 3) {
      this.autoMode = 'title';
      this._titleEnterFrame = this.frame;
      return;
    }
    this.wait(60);
  }

  // 阶段 2：过标题画面
  // 策略：等动画播放 5-8 秒 → 按 START → 进菜单
  phaseTitle() {
    const scene = this.ram(RAM_ADDR.SCENE_STATE);

    // 场景已经改变 = 已过标题
    if (scene >= 0x02 && scene !== 0xFF) {
      this.autoMode = 'menu_pick';
      this._menuFrame = this.frame;
      this.log(`── 进入菜单 scene=$${hex8(scene)} ──`);
      return;
    }

    const elapsed = this.frame - (this._titleEnterFrame || this.frame);

    // 前 5 秒（300 帧）：静静等动画播完，不做任何输入
    if (elapsed < 300) {
      this.wait(30);
      return;
    }

    // 5-8 秒：开始间歇按 START
    if (elapsed < 480) {
      // 每 20 帧按一次 START 8 帧
      if (this.frame % 20 < 8) {
        this.btnDown(BTN.START);
      } else {
        this.btnUp(BTN.START);
      }
      this.tick(2);
      return;
    }

    // 8 秒后还没过 = 卡住了 → 先看场景状态
    if (elapsed > 600) {
      // 暴力方案：直接改 $26 跳到场景 2
      const pc = this.pc();
      const sc = this.ram(RAM_ADDR.SCENE_STATUS);
      const nt = this.ram(RAM_ADDR.NMI_TRIGGER);
      this.log(`卡标题 ${elapsed}f: scene=$00 sc=$${hex8(sc)} e0=$${hex8(nt)} PC=$${hex16(pc)}`);

      // 再等 180 帧，最后手段改内存
      if (elapsed > 900) {
        this.log('!!! 暴力跳过标题 !!!');
        this.nes.cpu.mem[0x26] = 0x02; // 直接跳场景 2
        this.autoMode = 'menu_pick';
        return;
      }

      // 最后尝试：持续按 START
      this.hold(BTN.START, 15);
      return;
    }

    // 5-8 秒内：间歇按 START
    this.spam(BTN.START, 2, 8, 30);
  }

  // 阶段 2.5：菜单选择（しんゲーム "新游戏" / パスワード "密码继续"）
  phaseMenuPick() {
    const scene = this.ram(RAM_ADDR.SCENE_STATE);

    if (scene >= 0x12) {
      this.autoMode = 'story';
      this.log(`── 开始剧情 scene=$${hex8(scene)} ──`);
      return;
    }
    if (scene >= 0x04 && scene < 0x12) {
      this.autoMode = 'password_stage';
      this.log(`── 进入密码画面 scene=$${hex8(scene)} ──`);
      return;
    }

    // 菜单停留太久 → 暴力跳
    const elapsed = this.frame - (this._menuFrame || this.frame);
    if (elapsed > 300) {
      this.log('!!! 卡菜单，暴力跳到剧情 !!!');
      this.nes.cpu.mem[0x26] = 0x12; // 跳到剧情画面
      this.autoMode = 'story';
      return;
    }

    // 先等 30 帧让菜单稳定
    if (elapsed < 30) {
      this.wait(30);
      return;
    }

    // 按 A 选新游戏 (しんゲーム)
    this.spam(BTN.A, 2, 8, 15);
    this.spam(BTN.START, 1, 8, 20);
  }

  // 阶段 3：密码画面
  phasePasswordStage() {
    const scene = this.ram(RAM_ADDR.SCENE_STATE);
    if (scene >= 0x12 && scene !== 0xFF) {
      this.autoMode = 'story';
      return;
    }
    // 卡太久 → 暴力跳
    if (!this._pwStartFrame) this._pwStartFrame = this.frame;
    if (this.frame - this._pwStartFrame > 600) {
      this.log('!!! 卡密码画面，暴力跳到剧情 !!!');
      this.nes.cpu.mem[0x26] = 0x12;
      this.autoMode = 'story';
      return;
    }
    // 输入 kip code: START START B A DOWN A
    this.spam(BTN.START, 2, 15, 20);
    this.spam(BTN.B, 1, 15, 20);
    this.spam(BTN.A, 1, 15, 20);
    this.spam(BTN.DOWN, 1, 15, 20);
    this.spam(BTN.A, 1, 15, 30);
    this.spam(BTN.START, 3, 10, 20);
  }

  // 阶段 4：故事/过场
  phaseStory() {
    const scene = this.ram(RAM_ADDR.SCENE_STATE);

    if (scene >= 0x20 && scene !== 0xFF) {
      this.autoMode = 'match';
      this.log(`── 进入比赛 scene=$${hex8(scene)} ──`);
      return;
    }

    // 文字翻页：交替按 A 和 START
    this.spam(BTN.A, 3, 3, 5);
    this.spam(BTN.START, 1, 6, 8);
  }

  // 阶段 5：比赛
  phaseMatch() {
    const scene = this.ram(RAM_ADDR.SCENE_STATE);

    if (scene < 0x20 && scene !== 0xFF) {
      this.log(`── 比赛结束 scene=$${hex8(scene)} ──`);
      this.autoMode = 'story';
      this._matchFrames = 0;
      return;
    }

    this._matchFrames = (this._matchFrames || 0) + 1;

    // 比赛自动化：随机按 A/B + 方向
    const actions = [
      { btn: BTN.A,     hold: 12, wait: 25 },
      { btn: BTN.RIGHT, hold: 8,  wait: 15 },
      { btn: BTN.A,     hold: 10, wait: 20 },
      { btn: BTN.B,     hold: 10, wait: 20 },
      { btn: BTN.LEFT,  hold: 8,  wait: 15 },
      { btn: BTN.A,     hold: 12, wait: 25 },
      { btn: BTN.UP,    hold: 8,  wait: 15 },
      { btn: BTN.B,     hold: 10, wait: 20 },
    ];
    const idx = Math.floor(this._matchFrames / 15) % actions.length;
    const act = actions[idx];
    this.hold(act.btn, act.hold);
    this.wait(act.wait);
  }

  // 完成：保存所有数据
  finishRun() {
    this.log('══════ 运行结束 ══════');
    this.log(`总帧: ${this.frame} (${(this.frame/60).toFixed(1)}s)`);
    this.log(`场景切换次数: ${this.sceneLog.length}`);

    // 保存完整场景日志
    writeFileSync(
      join(OUT_DIR, 'scene_log.json'),
      JSON.stringify(this.sceneLog, null, 2)
    );

    // 打印 ntBank 汇总
    const ntBanks = [...new Set(this.sceneLog.map(e => e.ntBank))].sort((a,b)=>a-b);
    this.log(`ntBank 值汇总: [${ntBanks.map(b=>'$'+hex8(b)).join(', ')}]`);
    this.log(`场景→ntBank 映射:`);
    for (const e of this.sceneLog) {
      this.log(`  scene ${hex8(e.fromScene)}→${hex8(e.toScene)}  ntBank=$${hex8(e.ntBank)}`);
    }

    this.finished = true;
  }

  // ─── 主循环 ────────────────────────────────────────────────────
  async run(maxFrames = 18000) {
    this.log('══════ 开始自动测试 ══════');
    this.dumpRam();

    while (this.frame < maxFrames && !this.finished) {
      this.autoStep();
    }

    if (this.frame >= maxFrames) {
      this.log(`达到最大帧数限制 ${maxFrames} (${(maxFrames/60).toFixed(1)}s)`);
      this.finishRun();
    }
  }
}

// ─── 入口 ────────────────────────────────────────────────────────────
const runner = new TestRunner();
runner.run().catch(err => {
  console.error('测试失败:', err);
  process.exit(1);
});
