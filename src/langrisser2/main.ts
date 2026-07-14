/**
 * main.ts — Langrisser II 主入口 & 状态机驱动程序
 *
 * ============================================================================
 * 架构定位: 纯 TypeScript 实现 — 搬运 ROM 68K 汇编逻辑, 不是 ROM 模拟器
 *            所有游戏逻辑从 ROM 反编译 (见 execution-trace.md) 转写为 TS
 * ============================================================================
 * 职责 (前端 — 状态机 & 输入控制):
 *   1. 全局初始化 & 数据加载
 *   2. 游戏主循环 (gameLoop): input → scene.update → render
 *   3. 状态机驱动: 按 ROM 任务链触发场景切换
 *   4. 所有场景切换通过 SceneManager.switchTo()
 *
 * 不负责:
 *   - Canvas 2D UI 绘制 (见 scenes/*.ts → renderUI, rendering/UI.ts) ← 渲染端
 *   - VDP tile 渲染 (见 hw/vdp/renderer.ts)                          ← 渲染端
 *
 * ============================================================================
 * ROM 启动序列 (搬运为 TS 的完整流程):
 *   Reset() 0x800A → 0xC80C (游戏主初始化) →
 *   [BIOS SEGA Logo] → [Opening Animation] →
 *   0xC92C (标题初始化) → 0xC93A (标题设置) →
 *   0xC9A0 (标题→部署分流, 检查 $FF78FA)
 *     ├ 新游戏: 0xCA32→0xCA68→0xCA8A→0xCA9E→0xCCB0 (名称输入循环)
 *     └ 继续:   0xCA00 (部署主循环, $FFFFA61C=5)
 *                  → 0xD49E (战斗阶段, $FFFFA61C=10)
 *                    → 0x1D1C0 (场景切换/战后结算)
 *                      → 0xCA00 (下一关部署) ...
 *
 * RAM 状态变量:
 *   $FFFFA61C : 游戏阶段 (5=部署, 10=战斗)
 *   $FFFFA6D4 : 标题画面标志 (0=在标题)
 *   $FF78FA   : 新游戏标志 (0xFFFF=新游戏, 0=已有存档)
 *   $FFFFA612 : 假名选择/选关索引 (0-31)
 *   $FFFFA49C : 当前场景/关卡号 (1-31)
 *   $FFFFA6DC : 商店类型 (0=正常, 1=隐藏, 2=真隐藏)
 *   $FFFFAE90 : 下一关索引 (场景切换中间变量)
 * ============================================================================
 */

import { GameEngine } from './game/core/GameEngine.js';
import { SceneManager, GamePhase } from './game/core/SceneManager.js';
import { OpeningAnimation } from './game/scenes/OpeningAnimation.js';
import { TitleScreen } from './game/scenes/TitleScreen.js';
import { NameInputScene } from './game/scenes/NameInputScene.js';
import { ScenarioIntroScene } from './game/scenes/ScenarioIntroScene.js';
import { DeployScene } from './game/scenes/DeployScene.js';
import { BattleScene } from './game/scenes/BattleScene.js';
import { CharActionMenuScene, CharActionType } from './game/scenes/CharActionMenuScene.js';
import { StartMenuScene, StartMenuAction } from './game/scenes/StartMenuScene.js';
import { ShopScene } from './game/scenes/ShopScene.js';
import { DialogueScene } from './game/scenes/DialogueScene.js';
import { IntermissionScene } from './game/scenes/IntermissionScene.js';
import { SaveLoadScene } from './game/scenes/SaveLoadScene.js';
import { renderFrame } from './game/hw/vdp/renderer.js';
import { Mapper, Button } from './game/systems/InputSystem.js';
import { GameState } from './game/core/GameState.js';
import {
  SaveData, createNewGameSave, loadData, saveData as doSave,
} from './game/systems/SaveSystem.js';

// ============================================================
// DOM (仅用于 Canvas 容器和状态显示，不渲染游戏 UI)
// ============================================================
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx2d = canvas.getContext('2d')!;
const statusEl = document.getElementById('status')!;
const btnBoot = document.getElementById('btnBoot') as HTMLButtonElement;
const btnStop = document.getElementById('btnStop') as HTMLButtonElement;
const btnShop = document.getElementById('btnShop') as HTMLButtonElement;
const btnSave = document.getElementById('btnSave') as HTMLButtonElement;
const btnLoad = document.getElementById('btnLoad') as HTMLButtonElement;

// ============================================================
// 全局实例
// ============================================================
const engine = new GameEngine();
const state = new GameState(new Uint8Array(0));
const scenes = new SceneManager(engine.vdp);
const input = new Mapper();
input.attach(document);

const width = engine.vdp.width;   // 320
const height = engine.vdp.height; // 224
const frameBuf = new Uint8Array(width * height * 4);

let animId: number | null = null;
let running = false;

let saveData: SaveData | null = null;

// ============================================================
// 场景实例 (懒初始化)
// ============================================================

// --- 开场动画 (ROM BIOS SEGA Logo → Opening Animation 阶段) ---
// ROM: VRAM dump (ANIATION-2 + SOMETIMES), 2 帧 VDP sprite+tile 全屏帧动画
// 任意按键 → 跳过 → 0xC92C 标题
let openingAnimScene: OpeningAnimation | null = null;

// --- 标题画面 (ROM 0xC92C → 0xC93A) ---
let titleScene: TitleScreen | null = null;

// --- 名称输入 (ROM 0xCCB0 假名选择循环) ---
let nameInputScene: NameInputScene | null = null;

// --- 剧情提要/全体地图 (ROM 0x0C0000 文本数据) ---
let scenarioIntroScene: ScenarioIntroScene | null = null;

// --- 战前部署 MENU I & MENU II (ROM 0xCA00, $FFFFA61C=5) ---
let deployScene: DeployScene | null = null;

// --- 战斗地图 (ROM 0xD49E, $FFFFA61C=10) ---
let battleScene: BattleScene | null = null;

// --- 角色行动菜单 (ROM $FFFFA628 菜单对象 → 0x02A626) ---
let charActionMenu: CharActionMenuScene | null = null;

// --- START 机能菜单 (ROM 暂停系统) ---
let startMenu: StartMenuScene | null = null;

// --- 商店 (ROM 0x00FD7A, $FFFFA6DC 商店类型) ---
let shopScene: ShopScene | null = null;

// --- 剧情对话 ---
let dialogueScene: DialogueScene | null = null;

// --- 战后结算 (ROM FUN_0001D1C0) ---
let intermissionScene: IntermissionScene | null = null;

// --- 存/读档 (ROM loc_00A89C, SRAM $200001-$203FFF) ---
let saveLoadScene: SaveLoadScene | null = null;

// ============================================================
// 辅助函数
// ============================================================
function setStatus(msg: string): void { statusEl.textContent = msg; }

/**
 * 渲染一帧 (渲染管线)
 *   VDP tile 背景 → Canvas → scene.renderUI 叠加
 */
function drawFrame(): void {
  // Step 1: VDP tile 渲染 → frameBuf
  renderFrame(engine.vdp, frameBuf, 0, 0, 0, 0);

  // Step 2: frameBuf → Canvas
  const imgData = ctx2d.createImageData(width, height);
  imgData.data.set(frameBuf);
  ctx2d.putImageData(imgData, 0, 0);

  // Step 3: 场景 UI 叠加 (Canvas 2D)
  const cur = scenes.current;
  if (cur && cur.renderUI) {
    cur.renderUI(ctx2d);
  }
}

// ============================================================
// 场景切换 — 状态机驱动程序
// ============================================================

/**
 * 开场动画
 * ROM 启动序列: Reset() → BIOS SEGA Logo → Opening Animation → 0xC92C (标题)
 *
 * SEGA Logo 是 Genesis BIOS 硬件层 (ROM 0xFF0000-0xFFFFFF)，游戏 ROM 不含 SEGA logo。
 * 开场动画是 VDP 全屏 sprite+tile 帧动画，位于 SEGA logo 后、标题画面前。
 *
 * 数据来源: VRAM dump (ANIATION-2 + SOMETIMES), 2 帧全屏交替
 *   - 每帧重新加载 tile pattern + nametable + sprite 表
 *   - 任意按键 → 跳过 → 标题画面 (ROM: 按键检测后跳转 0xC92C)
 *   - 动画播放完成 → 自动跳转标题 (ROM: 最后一帧后链式到 0xC92C)
 *
 * GamePhase.OPENING (13)
 */
function openOpeningAnimation(): void {
  if (!openingAnimScene) {
    openingAnimScene = new OpeningAnimation(engine.vdp, {
      frameInterval: 60,   // 16FPS, 模拟原版动画速度
      loop: false,
      onComplete: () => openTitleScreen(),
    });
  } else {
    openingAnimScene.restart();
    openingAnimScene.setOnComplete(() => openTitleScreen());
  }
  scenes.switchTo(GamePhase.OPENING, openingAnimScene);
  setStatus('开场动画 | 按任意键跳过');
}

/**
 * 进入标题画面
 * GamePhase.TITLE → ROM 0xC93A 任务
 * RAM: $FFFFA6D4=0 (标题画面标志)
 */
function openTitleScreen(): void {
  if (!titleScene) titleScene = new TitleScreen(engine.vdp);
  scenes.switchTo(GamePhase.TITLE, titleScene);
  setStatus('标题画面 | START 新游戏 / LOAD 读档');
}

/**
 * 进入名称输入
 * GamePhase.NAME_INPUT → ROM 0xCCB0 循环
 * 触发: 标题画面选 NEW GAME ($FF78FA=0xFFFF)
 * 完成 → SCENARIO_INTRO
 */
function openNameInput(): void {
  if (!nameInputScene) nameInputScene = new NameInputScene(engine.vdp);
  nameInputScene.setOnDone(() => openScenarioIntro());
  scenes.switchTo(GamePhase.NAME_INPUT, nameInputScene);
  setStatus('名前を決めて下さい | START 确定');
}

/**
 * 剧情提要 / 全体地图
 * ROM: 0xCA00 之前的过渡阶段 — 显示进攻路线图 + 场景文本
 *      文本数据从 ROM 0x0C0000 区域 (SJIS 编码脚本)
 * GamePhase.SCENARIO_INTRO (2)
 * 触发: 名称输入完成 / 读档完成后, 进入 MENU I 前
 * START → DEPLOY (MENU I)
 */
function openScenarioIntro(): void {
  if (!scenarioIntroScene) {
    scenarioIntroScene = new ScenarioIntroScene(engine.vdp);
  }
  scenarioIntroScene.open(saveData?.scenarioId || 1, () => openDeploy());
  scenes.switchTo(GamePhase.SCENARIO_INTRO, scenarioIntroScene);
  setStatus(`剧情提要 — 场景 ${saveData?.scenarioId || 1}`);
}

/**
 * 战前部署 (MENU I)
 * GamePhase.DEPLOY (3) → ROM 0xCA00 任务
 * RAM: $FFFFA61C=5 (部署阶段)
 * 来源: 剧情提要完成后 / 战后结算完成后
 */
function openDeploy(): void {
  if (!deployScene) {
    deployScene = new DeployScene(engine.vdp, state, saveData!);
  }
  deployScene.setShopCallback(() => openShopFromDeploy());
  deployScene.setSortieCallback(() => openBattleMap());
  scenes.switchTo(GamePhase.DEPLOY, deployScene);
  setStatus('MENU I — 战前准备 | ↑↓选择 A确认');
}

/**
 * 从部署菜单打开商店
 * ROM: 商店初始化入口 0x00FD7A
 * 关联: CheatSystem — 秘籍检测后修改 RAM $FFFFA6DC 隐藏商店
 * 特殊: 商店关闭后返回部署 (不同于战斗中返回战斗地图)
 */
function openShopFromDeploy(): void {
  if (!shopScene) shopScene = new ShopScene(engine.vdp);
  shopScene.open(saveData!, saveData!.shopMode, () => openDeploy());
  scenes.switchTo(GamePhase.SHOP, shopScene);
  setStatus('商店 (将从部署返回)');
}

/**
 * 进入战斗地图
 * GamePhase.BATTLE_MAP (4) → ROM 0xD49E 任务
 * RAM: $FFFFA61C=10 (战斗阶段)
 * 触发: MENU II 选"出击"
 */
function openBattleMap(): void {
  if (!battleScene) {
    battleScene = new BattleScene(engine.vdp, state, saveData!);
  }
  battleScene.setStartMenuCallback(() => openStartMenu());
  battleScene.setCharActionCallback((charIdx: number) => openCharActionMenu(charIdx));

  scenes.switchTo(GamePhase.BATTLE_MAP, battleScene);
  setStatus('战斗地图 | 方向键:移动 A:角色 START:菜单');
}

/**
 * 打开角色行动菜单
 * GamePhase.CHAR_ACTION (5, 从 BATTLE_MAP 选中角色按 A)
 * ROM: 战斗地图中 $FFFFA628 (菜单对象指针) → 菜单处理 0x02A626
 *      $FFFFA984 (菜单光标位置)
 * 6 项: 移动/攻击/魔法/召唤/治疗/指令
 * A → 确认动作 / B → 返回战斗地图
 */
function openCharActionMenu(charIdx: number): void {
  if (!charActionMenu) charActionMenu = new CharActionMenuScene(engine.vdp);

  const character = saveData?.characters[charIdx];
  charActionMenu.setCharName(
    character ? `角色 ${charIdx + 1}` : `角色 ${charIdx + 1}`,
  );

  charActionMenu.setOnAction((action: CharActionType) => {
    switch (action) {
      case 'cancel':   // B 键 → 返回战斗地图 (ROM: 菜单取消处理)
        openBattleMap();
        break;
      // TODO: move/attack/magic/summon/heal/command 各动作对应 ROM 子函数
      default:
        openBattleMap();
        break;
    }
  });

  scenes.switchTo(GamePhase.CHAR_ACTION, charActionMenu);
  setStatus('角色行动菜单 | ↑↓选择 A确认 B返回');
}

/**
 * 打开 START 机能菜单
 * ROM: 战斗地图按 START → 弹出机能菜单 (ROM 暂停系统)
 *      $FFFFA628 = 菜单对象指针
 * 5 项: SAVE/LOAD/胜利条件/GAME设定/当天指令终了
 * GamePhase.START_MENU (6)
 * A → 确认 / B/START → 关闭返回战斗地图 (ROM: 等于按 B 取消)
 */
function openStartMenu(): void {
  if (!startMenu) startMenu = new StartMenuScene(engine.vdp);

  startMenu.setOnAction((action: StartMenuAction) => {
    switch (action) {
      case 'save':
        openSaveLoadScene('save');
        break;
      case 'load':
        openSaveLoadScene('load');
        break;
      case 'end_turn':
        // 回合结束 → 模拟结算 → 战后结算
        openIntermission();
        break;
      case 'close':
      case 'victory_condition':
      case 'game_settings':
      default:
        openBattleMap();
        break;
    }
  });

  scenes.switchTo(GamePhase.START_MENU, startMenu);
  setStatus('机能菜单 | ↑↓选择 A确认 B/START关闭');
}

/**
 * 存/读档界面
 * ROM: SRAM 系统 — loc_00A89C (存档处理), ROM 0x11F88 (SRAM 读取)
 *      $200001-$203FFF (16KB SRAM, 备用电池), 每槽 0x1100 字节
 * TS: 使用 localStorage 代替 SRAM (见 SaveSystem.ts)
 * GamePhase.SAVE_LOAD (11)
 * 触发: 标题画面 LOAD / START 菜单 SAVE|LOAD
 */
function openSaveLoadScene(mode: 'save' | 'load'): void {
  if (!saveLoadScene) saveLoadScene = new SaveLoadScene(engine.vdp);

  saveLoadScene.open(mode, saveData!, (result: SaveData | null) => {
    if (result) {
      saveData = result;
      // 读档完成 → 进入部署 (MENU I)
      openDeploy();
    } else {
      // 取消 → 返回之前的状态
      if (scenes.phase === GamePhase.TITLE) {
        openTitleScreen();
      } else {
        openBattleMap();
      }
    }
  });

  scenes.switchTo(GamePhase.SAVE_LOAD, saveLoadScene);
  setStatus(`${mode === 'save' ? '存档' : '读档'} | ↑↓选择 A确认 B返回`);
}

/**
 * 打开商店 (从战斗地图)
 * ROM: 0x00FD7A (商店入口), RAM $FFFFA6DC (商店类型)
 * 秘籍触发: CheatSystem 检测序列后改写 $FFFFA6DC → 隐藏/真隐藏商店
 */
function openShop(): void {
  if (!saveData) return;
  if (!shopScene) shopScene = new ShopScene(engine.vdp);
  shopScene.open(saveData, saveData.shopMode, () => openBattleMap());
  scenes.switchTo(GamePhase.SHOP, shopScene);
  setStatus('商店 | ↑↓选择 A购买 C切换 START隐藏店 B退出');
}

/**
 * 战后结算 (场景切换)
 * GamePhase.INTERMISSION (10) → ROM FUN_0001D1C0
 * 触发: 胜利条件达成 / START 菜单"当天指令终了"
 * 完成 → DEPLOY (下一关, $FFFFAE90 → $FFFFA49C)
 */
function openIntermission(): void {
  if (!intermissionScene) intermissionScene = new IntermissionScene(engine.vdp);
  if (!saveData) return;

  // TODO: 实际经验值/道具从战斗统计中获取
  const fakeXP = 100 + (saveData.scenarioId || 1) * 50;
  intermissionScene.open(
    saveData, fakeXP, [],
    () => {
      // 场景切换: 推进到下一关
      if (saveData!.scenarioId < 31) {
        saveData!.scenarioId++;
        state.scenarioIndex = saveData!.scenarioId;
      }
      // 回到部署 (MENU I) — 下一关
      openDeploy();
    },
  );
  scenes.switchTo(GamePhase.INTERMISSION, intermissionScene);
  setStatus('战斗结算 | A/START 继续');
}

// ============================================================
// 主循环 — 状态机核心
//
// ROM 原始逻辑 (搬运为 TS):
//   VBLANK() (ROM 0x082B4) — 每帧 VBlank 中断
//     → FUN_00009498 任务调度器 (每帧 5 次)
//       → $FFFF8004 当前任务函数指针 → 执行对应 task
//         → 开场动画 → 0xC9A0 (标题分流) / 0xCA00 (部署) / 0xD49E (战斗) ...
//
// TS 简化为 5 步:
//   1. input.poll()       ← 采样 Genesis 控制器位掩码 (ROM: $FFFF8178/$FFFF81A7)
//   2. scene.update()     ← 业务逻辑 (对应 ROM task 函数)
//   3. 级联状态检测        ← 检测 GamePhase + 按键 → 触发场景跳转
//   4. drawFrame()        ← VDP tile + Canvas UI 叠加
//   5. 帧计数器 & 状态栏
// ============================================================
function gameLoop(): void {
  if (!running) return;

  // Step 1: 轮询输入
  const _buttons = input.poll();

  // Step 2: 场景自身更新 (光标/菜单/逻辑)
  const cur = scenes.current;
  if (cur) {
    cur.update(undefined, input);
  }

  // ==========================================================
  // Step 3: 级联状态检测 — 根据当前 GamePhase + 按键触发场景跳转
  //
  // 对照 execution-trace.md §6 状态切换触发事件表:
  // ==========================================================

  // --- 开场动画: 任意按键 → 跳过 → 标题 (ROM: 按键检测后跳 0xC92C) ---
  if (scenes.phase === GamePhase.OPENING) {
    if (input.isAnyJustPressed()) {
      openTitleScreen();
    }
  }

  // --- 标题画面: START → 分流 (ROM 0xC9A0 逻辑) ---
  // ROM 0xC9A0 检查 $FF78FA:
  //   $FF78FA == 0xFFFF → bsr 0xCA32 (新游戏 → 名称输入)
  //   $FF78FA == 0     → bsr 0xCA00 (有存档 → 剧情提要)
  if (scenes.phase === GamePhase.TITLE) {
    if (input.justPressed(Button.START)) {
      if (state.skipTitleFlag === 0xFFFF) {
        openNameInput();     // ROM: 0xCA32 → 0xCCB0 名称输入
      } else {
        openScenarioIntro(); // ROM: 0xCA00 部署主循环前过渡
      }
    }
  }

  // --- 状态栏轮询 (每 60 帧更新) ---
  engine.frameCount++;
  if (engine.frameCount % 60 === 0) {
    setStatus(
      `[${GamePhase[scenes.phase]}] 帧:${engine.frameCount} | ` +
      `金币:${saveData?.gold || 0} | 剧本:${saveData?.scenarioId || 1}`
    );
  }

  // Step 4: 渲染
  drawFrame();

  // Step 5: 下一帧
  animId = requestAnimationFrame(gameLoop);
}

// ============================================================
// 按钮事件 (启动/停止/手动商店/存档/读档)
// ============================================================

/**
 * 启动游戏 — ROM 启动序列 (搬运为 TS)
 *
 * ROM 原始流程:
 *   1. Reset() 0x800A → 硬件初始化 (VDP/Z80/DMA/RAM清空)
 *   2. 0xC80C → 游戏主初始化 (VRAM/CRAM/VDP寄存器 + 角色表加载)
 *   3. [BIOS SEGA Logo] → 硬件层, ROM 无此数据
 *   4. [Opening Animation] → VDP sprite+tile 全屏帧动画 (任意键跳过)
 *   5. 0xC92C → 标题画面初始化 (资源 0x8001 → VRAM)
 *   6. 0xC93A → 标题画面设置 (Palette/Nametable)
 *   7. 进入 0xC9A0 等待玩家输入 (标题→部署分流)
 *
 * TS 中简化为:
 *   初始化存档 → 开场动画 → 标题画面 → gameLoop
 */
async function onBoot(): Promise<void> {
  if (running) {
    running = false;
    if (animId !== null) cancelAnimationFrame(animId);
    animId = null;
  }

  setStatus('初始化游戏数据...');

  // 创建新游戏存档 (数据来源: ROM 0x05E64A 角色初始表 + 0x05EDDC 职业数据)
  // 搬运为 TS: SaveSystem.createNewGameSave() → data/character.ts + data/classes.ts
  saveData = createNewGameSave(1);

  // 进入开场动画 (ROM BIOS SEGA Logo → Opening Animation 阶段)
  // 动画完成后自动跳转标题画面, 或任意按键跳过
  openOpeningAnimation();

  running = true;
  btnStop.disabled = false;
  gameLoop();
}

function onStop(): void {
  running = false;
  if (animId !== null) cancelAnimationFrame(animId);
  animId = null;
  scenes.destroy();
  btnStop.disabled = true;
  setStatus('已停止');
}

// 按钮事件绑定
btnBoot.addEventListener('click', onBoot);
btnStop.addEventListener('click', onStop);

btnShop.addEventListener('click', () => {
  if (!running) { setStatus('请先启动游戏'); return; }
  openShop();
});

btnSave.addEventListener('click', () => {
  if (!running) { setStatus('请先启动游戏'); return; }
  openSaveLoadScene('save');
});

btnLoad.addEventListener('click', () => {
  if (!running) { setStatus('请先启动游戏'); return; }
  openSaveLoadScene('load');
});

// 移除不存在的按钮引用 (index.html 中有 btnBattle 但已废弃)
const btnBattle = document.getElementById('btnBattle');
if (btnBattle) btnBattle.style.display = 'none';

// ============================================================
// 初始画面 (Canvas 2D — 等待启动)
// ============================================================
setStatus('等待启动...');
function drawStartScreen(): void {
  ctx2d.fillStyle = '#0a0a0a';
  ctx2d.fillRect(0, 0, width, height);

  ctx2d.font = 'bold 18px monospace';
  ctx2d.textBaseline = 'middle';
  ctx2d.textAlign = 'center';
  ctx2d.fillStyle = '#e94560';
  ctx2d.fillText('Langrisser II', width / 2, height / 2 - 12);

  ctx2d.font = '12px monospace';
  ctx2d.fillStyle = '#888';
  ctx2d.fillText('点击「启动标题画面」', width / 2, height / 2 + 12);
}
drawStartScreen();
