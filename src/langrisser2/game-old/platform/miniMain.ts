/**
 * miniMain.ts — Langrisser II 小程序游戏入口
 *
 * 对应 Web 版 main.ts (状态机驱动程序), 适配小程序平台。
 *
 * ROM 启动序列:
 *   Reset() 0x800A → 初始化 → Opening Animation → Title → Name Input →
 *   Scenario Intro → Deploy → Battle → Intermission → Dialogue → Deploy ...
 *
 * 渲染管线:
 *   VDP tile 渲染 (renderFrame) → Canvas putImageData → Scene UI 叠加
 *
 * 输入:
 *   小程序触摸 → touchToButtons() → Genesis 按钮位掩码 → InputSystem.poll()
 */

import { GameEngine } from '../core/GameEngine.js';
import { SceneManager, GamePhase } from '../core/SceneManager.js';
import { OpeningAnimation } from '../scenes/OpeningAnimation.js';
import { TitleScreen } from '../scenes/TitleScreen.js';
import { NameInputScene } from '../scenes/NameInputScene.js';
import { ScenarioIntroScene } from '../scenes/ScenarioIntroScene.js';
import { DeployScene } from '../scenes/DeployScene.js';
import { BattleScene } from '../scenes/BattleScene.js';
import { CharActionMenuScene, CharActionType } from '../scenes/CharActionMenuScene.js';
import { StartMenuScene, StartMenuAction } from '../scenes/StartMenuScene.js';
import { ShopScene } from '../scenes/ShopScene.js';
import { DialogueScene } from '../scenes/DialogueScene.js';
import { IntermissionScene } from '../scenes/IntermissionScene.js';
import { SaveLoadScene } from '../scenes/SaveLoadScene.js';
import { renderFrame } from '../hw/vdp/renderer.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { GameState } from '../core/GameState.js';
import { loadStage } from '../systems/StageConfig.js';
import {
  SaveData, createNewGameSave, loadData, saveData as doSave,
} from '../systems/SaveSystem.js';
import { SoundSystem } from '../systems/SoundSystem.js';
import { getDialogueLines, getPrologue } from '../data/DialogueData.js';

import { MiniProgramPlatform } from '../platform/miniprogram.js';

/**
 * Langrisser II 小程序游戏主控制器
 *
 * 在页面 onReady 中实例化, 管理整个游戏生命周期。
 */
export class MiniGame {
  readonly engine: GameEngine;
  readonly state: GameState;
  readonly scenes: SceneManager;
  readonly input: Mapper;
  readonly platform: MiniProgramPlatform;
  readonly soundSystem: SoundSystem;

  readonly width: number;
  readonly height: number;
  readonly frameBuf: Uint8Array;

  private _animId = 0;
  private _running = false;
  private _saveData: SaveData | null = null;
  private _ctx: CanvasRenderingContext2D | null = null;

  // 持久化的 ImageData (复用, 避免每帧创建导致小程序 Canvas 2D 兼容问题)
  private _imgData: ImageData | null = null;

  // 场景实例 (懒初始化)
  private _openingAnim: OpeningAnimation | null = null;
  private _titleScene: TitleScreen | null = null;
  private _nameInput: NameInputScene | null = null;
  private _scenarioIntro: ScenarioIntroScene | null = null;
  private _deploy: DeployScene | null = null;
  private _battle: BattleScene | null = null;
  private _charAction: CharActionMenuScene | null = null;
  private _startMenu: StartMenuScene | null = null;
  private _shop: ShopScene | null = null;
  private _dialogue: DialogueScene | null = null;
  private _intermission: IntermissionScene | null = null;
  private _saveLoad: SaveLoadScene | null = null;

  // 输入状态
  private _prevButtons = 0;

  constructor(platform: MiniProgramPlatform) {
    this.platform = platform;
    this.width = platform.width;
    this.height = platform.height;

    this.engine = new GameEngine();
    this.state = new GameState();
    this.scenes = new SceneManager(this.engine.vdp);
    this.input = new Mapper();
    this.soundSystem = new SoundSystem(platform);

    this.frameBuf = new Uint8Array(this.width * this.height * 4);
  }

  /** 页面 onReady 中调用 (自动启动, 无需按钮) */
  async start(): Promise<void> {
    if (this._running) return;

    this._ctx = await this.platform.initCanvas();
    console.log('[MiniGame] Canvas 就绪, ctx=', !!this._ctx);

    // 预先创建 ImageData (复用, 小程序 Canvas 2D 下每帧 createImageData 可能有问题)
    this._imgData = this._ctx!.createImageData(this.width, this.height);
    console.log('[MiniGame] ImageData 预创建, size=', this._imgData?.data?.length);

    // 绘制启动画面
    this._drawBootScreen();
    console.log('[MiniGame] 启动画面已绘制');

    // 创建存档
    this._saveData = createNewGameSave(1);
    this.platform.setStatusText('初始化中...');
    console.log('[MiniGame] 存档创建完成, scenarioId=', this._saveData?.scenarioId);

    // 音频: SoundSystem 自动检测 → 小程序用 wx.createWebAudioContext()
    console.log('[MiniGame] 音频 — SoundSystem(platform) 已初始化');

    // 初始化 VDP + 场景
    console.log('[MiniGame] 初始化 Engine VDP...');
    // VDP 在 GameEngine 构造函数中已初始化, 设置显示
    this.engine.vdp.displayEnabled = true;
    console.log('[MiniGame] VDP displayEnabled=', this.engine.vdp.displayEnabled,
      'VRAM size=', this.engine.vdp.vram?.length);

    // 进入开场动画
    console.log('[MiniGame] 进入开场动画...');
    this._openOpeningAnimation();

    // 启动主循环
    this._running = true;
    console.log('[MiniGame] 主循环启动...');
    this._animId = this.platform.requestAnimationFrame(() => this._gameLoop());
    this.platform.setStatusText('开场动画 | 触摸屏幕跳过');
    console.log('[MiniGame] start() 完成, animId=', this._animId);
  }

  /** 停止游戏 */
  stop(): void {
    this._running = false;
    if (this._animId) {
      this.platform.cancelAnimationFrame(this._animId);
      this._animId = 0;
    }
    this.scenes.destroy();
    this.soundSystem.destroy();
    this.platform.destroy();
  }

  /** 销毁整个游戏实例 */
  destroy(): void {
    this.stop();
  }

  // ================================================================
  // 主循环
  // ================================================================

  private _loopCount = 0; // 调试: 循环计数

  private _gameLoop(): void {
    if (!this._running || !this._ctx) return;

    // 调试: 前 5 帧详细日志
    if (this._loopCount < 5) {
      console.log('[Loop] 帧#', this._loopCount,
        'phase=', GamePhase[this.scenes.phase],
        'running=', this._running,
        'ctx=', !!this._ctx,
        'vdp.enabled=', this.engine.vdp.displayEnabled);
    }

    // Step 1: 轮询输入 (触摸 → Genesis 按钮)
    this._pollInput();

    // Step 2: 场景更新
    const cur = this.scenes.current;
    if (cur) {
      cur.update(undefined, this.input);
    }

    // Step 3: 级联状态检测
    this._checkTransitions();

    // Step 4: 渲染
    this._drawFrame();

    // Step 5: 下一帧
    this.engine.frameCount++;
    this._loopCount++;

    if (this.engine.frameCount % 60 === 0) {
      const phase = GamePhase[this.scenes.phase] || 'UNKNOWN';
      // 每 60 帧简短日志 (不每帧打, 避免刷屏)
      // console.log('[Loop] 帧:', this.engine.frameCount, 'phase=', phase,
      //   'buttons=0x' + this._prevButtons.toString(16).toUpperCase().padStart(2, '0'));
      this.platform.setStatusText(
        `[${phase}] 帧:${this.engine.frameCount} | 剧本:${this._saveData?.scenarioId || 1}`
      );
    }

    this._animId = this.platform.requestAnimationFrame(() => this._gameLoop());
  }

  /** 将触摸输入转换为 Mapper 兼容的按钮状态 */
  private _pollInput(): void {
    this._prevButtons = this.platform.pollButtons();

    // 将当前按钮掩码写入 Mapper 的内部状态
    // Mapper 需要 maintain its own state for justPressed/justReleased
    // 我们通过 hack 方式设置: 直接调用 poll 但使用平台按钮
    // 注: 此处复用 Mapper 的 poll() 检测按键已按下 → 构建掩码
    // 但触摸输入不通过键盘, 需要改造.
    //
    // 简化方案: 重新实现 Mapper 的核心逻辑
    // getState() 返回 current/previous → 用于 justPressed/justReleased
    const state = this.input.getState();
    state.previous = state.current;
    state.current = this.platform.pollButtons();

    // 历史缓冲区更新
    if (state.current !== state.previous) {
      for (let i = 0; i < state.historySize - 1; i++) {
        state.history[i] = state.history[i + 1];
      }
      state.history[state.historySize - 1] = state.current;
    }
  }

  /** 场景跳转检测 */
  private _checkTransitions(): void {
    // 开场动画 — 任意键跳过 (ROM 风格: skip() → onComplete → _openTitleScreen)
    if (this.scenes.phase === GamePhase.OPENING) {
      if (this.input.isAnyJustPressed()) {
        console.log('[Transition] OPENING → TITLE (按键跳过, ROM style)');
        if (this._openingAnim && !this._openingAnim.finished) {
          this._openingAnim.skip();
          // skip() 内部会调 _finish() → onComplete → _openTitleScreen()
          // 不需要再显式调用 _openTitleScreen()
        }
      }
    }

    // 标题画面 — START → 分流
    if (this.scenes.phase === GamePhase.TITLE) {
      if (this.input.justPressed(Button.START)) {
        console.log('[Transition] TITLE → 分流, skipTitleFlag=', this.state.skipTitleFlag);
        if (this.state.skipTitleFlag === 0xFFFF) {
          this._openNameInput();
        } else {
          this._openScenarioIntro();
        }
      }
    }
  }

  // ================================================================
  // 渲染管线
  // ================================================================

  private _drawFrame(): void {
    const ctx = this._ctx!;

    // Step 1: VDP tile 渲染 → frameBuf
    renderFrame(this.engine.vdp, this.frameBuf, 0, 0, 0, 0);

    // Step 2: frameBuf → Canvas (复用 ImageData, 小程序 Canvas 2D 兼容)
    if (this._imgData) {
      this._imgData.data.set(this.frameBuf);
      ctx.putImageData(this._imgData, 0, 0);
    }

    // Step 3: 场景 UI 叠加
    const cur = this.scenes.current;
    if (cur && cur.renderUI) {
      cur.renderUI(ctx);
    }

    // Step 4: 帧计数器 — 屏幕底部居中 (逐帧更新)
    ctx.save();
    // 底部半透明背景条
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, this.height - 16, this.width, 16);
    // 帧号 + 彩色跳变条 (逐帧变色)
    const hue = (this.engine.frameCount * 5) % 360;
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, this.height - 16, 8, 16);
    // 帧数
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`F:${this.engine.frameCount}`, this.width / 2, this.height);
    // 左上角小色条 (持续验证 putImageData 是否生效)
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, 8, 4);
    ctx.restore();

    // 调试: 前 5 帧检查 frameBuf 是否非空
    if (this._loopCount < 5) {
      let nonZero = 0;
      for (let i = 0; i < Math.min(2000, this.frameBuf.length); i++) {
        if (this.frameBuf[i] !== 0) nonZero++;
      }
      console.log(`[Draw] 帧#${this._loopCount} frameBuf 前2000字节非零:`, nonZero,
        '| VDP display:', this.engine.vdp.displayEnabled,
        '| imgData.len:', this._imgData?.data?.length);
    }
  }

  /** 启动画面 */
  private _drawBootScreen(): void {
    const ctx = this._ctx!;
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.font = 'bold 16px monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e94560';
    ctx.fillText('Langrisser II', this.width / 2, this.height / 2 - 16);

    ctx.font = '11px monospace';
    ctx.fillStyle = '#888';
    ctx.fillText('微信小程序版 v1.0', this.width / 2, this.height / 2 + 16);
    ctx.fillText('触摸屏幕开始', this.width / 2, this.height / 2 + 36);
  }

  // ================================================================
  // 场景切换 — 状态机驱动程序 (同 main.ts)
  // ================================================================

  private _openOpeningAnimation(): void {
    if (!this._openingAnim) {
      this._openingAnim = new OpeningAnimation(this.engine.vdp, {
        onComplete: () => {
          console.log('[Transition] OpeningAnimation ROM 任务链完成, 帧:', this.engine.frameCount);
          this._openTitleScreen();
        },
      });
    } else {
      this._openingAnim.restart();
      this._openingAnim.setOnComplete(() => {
        console.log('[Transition] OpeningAnimation ROM 任务链完成 (restart), 帧:', this.engine.frameCount);
        this._openTitleScreen();
      });
    }
    this.scenes.switchTo(GamePhase.OPENING, this._openingAnim);
    // 音频: SoundSystem 自动检测平台 → 小程序用 wx.createWebAudioContext
    this.soundSystem.playPhaseMusic(GamePhase.OPENING);
    this.platform.setStatusText('开场动画 | 触摸屏幕跳过');
  }

  private _openTitleScreen(): void {
    if (!this._titleScene) this._titleScene = new TitleScreen(this.engine.vdp);
    this.scenes.switchTo(GamePhase.TITLE, this._titleScene);
    this.soundSystem.playPhaseMusic(GamePhase.TITLE);
    this.platform.setStatusText('标题画面 | START 新游戏');
  }

  private _openNameInput(): void {
    if (!this._nameInput) this._nameInput = new NameInputScene(this.engine.vdp);
    this._nameInput.setOnDone(() => this._openScenarioIntro());
    this.scenes.switchTo(GamePhase.NAME_INPUT, this._nameInput);
    this.platform.setStatusText('名前を決めて下さい | START 确定');
  }

  private _openScenarioIntro(): void {
    if (!this._scenarioIntro) this._scenarioIntro = new ScenarioIntroScene(this.engine.vdp);
    this._scenarioIntro.open(this._saveData?.scenarioId || 1, () => this._openDeploy());
    this.scenes.switchTo(GamePhase.SCENARIO_INTRO, this._scenarioIntro);
    this.platform.setStatusText(`剧情提要 — 场景 ${this._saveData?.scenarioId || 1}`);
  }

  private _openDeploy(): void {
    if (!this._deploy) this._deploy = new DeployScene(this.engine.vdp, this.state, this._saveData!);
    this._deploy.setShopCallback(() => this._openShopFromDeploy());
    this._deploy.setSortieCallback(() => this._openBattleMap());
    this.scenes.switchTo(GamePhase.DEPLOY, this._deploy);
    this.platform.setStatusText('MENU I — 战前准备');
  }

  private _openShopFromDeploy(): void {
    if (!this._shop) this._shop = new ShopScene(this.engine.vdp);
    this._shop.open(this._saveData!, this._saveData!.shopMode, () => this._openDeploy());
    this.scenes.switchTo(GamePhase.SHOP, this._shop);
    this.platform.setStatusText('商店');
  }

  private _openBattleMap(): void {
    if (!this._battle) this._battle = new BattleScene(this.engine.vdp, this.state, this._saveData!);
    const stage = loadStage(this._saveData?.scenarioId || 1);
    if (stage) this._battle.setStage(stage);
    this._battle.setStartMenuCallback(() => this._openStartMenu());
    this._battle.setCharActionCallback((idx: number) => this._openCharActionMenu(idx));
    this.scenes.switchTo(GamePhase.BATTLE_MAP, this._battle);
    this.platform.setStatusText(`战斗 — 剧本 ${this._saveData?.scenarioId || 1}`);
  }

  private _openCharActionMenu(charIdx: number): void {
    if (!this._charAction) this._charAction = new CharActionMenuScene(this.engine.vdp);
    this._charAction.setCharName(`角色 ${charIdx + 1}`);
    this._charAction.setOnAction((action: CharActionType) => {
      if (action === 'cancel') this._openBattleMap();
      else this._openBattleMap();
    });
    this.scenes.switchTo(GamePhase.CHAR_ACTION, this._charAction);
    this.platform.setStatusText('角色行动菜单');
  }

  private _openStartMenu(): void {
    if (!this._startMenu) this._startMenu = new StartMenuScene(this.engine.vdp);
    this._startMenu.setOnAction((action: StartMenuAction) => {
      switch (action) {
        case 'save': this._openSaveLoad('save'); break;
        case 'load': this._openSaveLoad('load'); break;
        case 'end_turn': this._openIntermission(); break;
        default: this._openBattleMap(); break;
      }
    });
    this.scenes.switchTo(GamePhase.START_MENU, this._startMenu);
    this.platform.setStatusText('机能菜单');
  }

  private _openSaveLoad(mode: 'save' | 'load'): void {
    if (!this._saveLoad) this._saveLoad = new SaveLoadScene(this.engine.vdp);
    this._saveLoad.open(mode, this._saveData!, (result: SaveData | null) => {
      if (result) {
        this._saveData = result;
        this._openDeploy();
      } else {
        this._openBattleMap();
      }
    });
    this.scenes.switchTo(GamePhase.SAVE_LOAD, this._saveLoad);
    this.platform.setStatusText(mode === 'save' ? '存档' : '读档');
  }

  private _openShop(): void {
    if (!this._saveData) return;
    if (!this._shop) this._shop = new ShopScene(this.engine.vdp);
    this._shop.open(this._saveData, this._saveData.shopMode, () => this._openBattleMap());
    this.scenes.switchTo(GamePhase.SHOP, this._shop);
    this.platform.setStatusText('商店');
  }

  private _openDialogue(): void {
    if (!this._dialogue) this._dialogue = new DialogueScene(this.engine.vdp);
    const scenarioId = this._saveData?.scenarioId || 1;
    const lines = getDialogueLines(scenarioId);
    if (lines.length > 0) {
      this._dialogue.open(lines, () => this._openBattleMap());
      this.scenes.switchTo(GamePhase.DIALOGUE, this._dialogue);
      this.platform.setStatusText(`对话 — Scenario ${scenarioId}`);
    }
  }

  private _openIntermission(): void {
    if (!this._intermission) this._intermission = new IntermissionScene(this.engine.vdp);
    if (!this._saveData) return;
    const fakeXP = 100 + (this._saveData.scenarioId || 1) * 50;
    this._intermission.open(this._saveData, fakeXP, [], () => {
      if (this._saveData!.scenarioId < 31) {
        this._saveData!.scenarioId++;
        this.state.scenarioIndex = this._saveData!.scenarioId;
      }
      this._openDialogueThenDeploy();
    });
    this.scenes.switchTo(GamePhase.INTERMISSION, this._intermission);
    this.platform.setStatusText('战斗结算');
  }

  private _openDialogueThenDeploy(): void {
    if (!this._dialogue) this._dialogue = new DialogueScene(this.engine.vdp);
    const scenarioId = this._saveData?.scenarioId || 1;
    const lines = getDialogueLines(scenarioId);
    if (lines.length > 0) {
      this._dialogue.open(lines, () => this._openDeploy());
      this.scenes.switchTo(GamePhase.DIALOGUE, this._dialogue);
      this.platform.setStatusText(`对话 — Scenario ${scenarioId}`);
    } else {
      this._openDeploy();
    }
  }
}
