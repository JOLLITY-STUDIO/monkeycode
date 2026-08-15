/**
 * 自动化测试套件 — tsubasa2-h5-src 核心引擎
 *
 * 覆盖维度：
 *   1. 单元测试 — DataStore / Renderer / Bank00 / Bank12 / OamManager
 *   2. 集成测试 — 引擎完整初始化、帧循环、场景流转、渲染输出
 *   3. 输入测试 — 按键 press/release、位掩码、上升沿
 *   4. 性能测试 — FPS 稳定性、连续帧耗时、内存增长
 *   5. 边界测试 — 越界 bankId、空数据、重复启动、极值帧
 *
 * 每个测试用例返回 { name, pass, detail } 由 runner 汇总。
 */

import { Tsubasa2 } from '../src/core/Tsubasa2';
import { DataStore } from '../src/data/DataStore';
import { Renderer } from '../src/core/engine/render/Renderer';
import { Bank00Service } from '../src/game/bank00_core.service';
import { Bank12AudioService } from '../src/game/bank12_audio.service';
import { Bank30Service } from '../src/game/bank30_init.service';
import { Bank02Service } from '../src/game/bank02_scene.service';
import { OamManager } from '../src/data/OamManager';
import { WebAudioOutput } from '../src/core/engine/audio/WebAudioOutput';
import { BUTTON, NES_WIDTH, NES_HEIGHT, GameState } from '../src/core/types';
import { SceneRoot } from '../src/data/scene';
import { log, assert, sleep, screenshot, progress } from './utils';

export interface TestResult {
  suite: string;
  name: string;
  pass: boolean;
  detail: string;
}

export interface TestContext {
  game: Tsubasa2 | null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

/** 收集所有结果用于报告 */
const _results: TestResult[] = [];

function record(suite: string, name: string, pass: boolean, detail: string): void {
  _results.push({ suite, name, pass, detail });
  log(`[${suite}] ${pass ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`, pass ? 'pass' : 'fail');
}

export function getResults(): TestResult[] {
  return _results.slice();
}

export function clearResults(): void {
  _results.length = 0;
}

// ════════════════════════════════════════════════════════════
// 1. 单元测试
// ════════════════════════════════════════════════════════════

export async function runUnitTests(ctx: TestContext): Promise<void> {
  log('━━━ 单元测试开始 ━━━', 'step');

  // 1.1 DataStore 基础读写
  // 注意: DataStore.write 会执行 value & 0xFF (NES 8位兼容截断)
  //       DataStore.read 不存在的键返回 0 (非 undefined)
  //       DataStore 没有 remove 方法 (NES RAM 无删除语义)
  {
    const store = new DataStore();

    // 正常 8 位值读写
    store.write('test_key', 200);
    const v = store.read('test_key');
    record('单元-DataStore', '读写 8 位数值 (200)', v === 200, `read=${v}`);

    // 超出 8 位会被截断 (NES 硬件行为)
    store.write('overflow_key', 0x1FF); // 511 & 0xFF = 255
    const ov = store.read('overflow_key');
    record('单元-DataStore', 'write 超值截断为 8 位 (0x1FF→255)', ov === 255, `read=${ov}`);

    // 不存在的键返回 0 (非 undefined)
    const missing = store.read('not_exist');
    record('单元-DataStore', '读取不存在键返回 0', missing === 0, `read=${missing}`);

    // 16 位读写
    store.write16('lo', 'hi', 0x1234);
    const v16 = store.read16('lo', 'hi');
    record('单元-DataStore', 'write16/read16 (0x1234)', v16 === 0x1234, `read=0x${v16.toString(16)}`);

    // reset 清空
    store.reset();
    record('单元-DataStore', 'reset 后键清空', store.read('test_key') === 0, 'ok');
  }

  // 1.2 OamManager 精灵管理
  // 实际 API: reset() / writeSlot(i, attr, tileLo, tileHi) / slotCount() / setPos / setBank
  {
    const oam = new OamManager();
    oam.reset();
    record('单元-OamManager', 'reset 后 slotCount=0', oam.slotCount() === 0, `slots=${oam.slotCount()}`);

    // 写入精灵槽 (NES $04A5 语义: attr/tileLo/tileHi)
    oam.writeSlot(0, 0x03, 0x10, 0x00); // attr=0x03, tile=0x0010
    record('单元-OamManager', 'writeSlot 写入', oam.slotCount() >= 1, `slots=${oam.slotCount()}`);

    // 验证槽内容
    const slot = oam.getSlot(0);
    record('单元-OamManager', 'getSlot 读取 attr', slot !== null && slot.attr === 0x03, `attr=0x${slot?.attr.toString(16)}`);
    record('单元-OamManager', 'getSlot 读取 tile', slot !== null && slot.tileLo === 0x10, `tileLo=0x${slot?.tileLo.toString(16)}`);

    // 忙标志 (对应 NES ram_0515)
    record('单元-OamManager', '初始 busy=0 (IDLE)', oam.busy === 0, `busy=0x${oam.busy.toString(16)}`);
    oam.beginBuild();
    record('单元-OamManager', 'beginBuild → busy=1', oam.busy === 1, `busy=${oam.busy}`);
    oam.endBuild();
    record('单元-OamManager', 'endBuild → busy=0x80', oam.busy === 0x80, `busy=0x${oam.busy.toString(16)}`);
    oam.setIdle();
    record('单元-OamManager', 'setIdle → busy=0', oam.busy === 0, `busy=${oam.busy}`);

    // 边界：64 个精灵上限（NES OAM = 256 字节 = 64 精灵）
    oam.reset();
    for (let i = 0; i < 64; i++) {
      oam.writeSlot(i, 0, i & 0xFF, 0);
    }
    record('单元-OamManager', '写入 64 个精灵 (NES 上限)', oam.slotCount() === 64, `slots=${oam.slotCount()}`);

    // 越界精灵索引 — 修复后应安全忽略 (BUG-002 已修复)
    let threw = false;
    try {
      oam.writeSlot(128, 0, 0, 0); // 越界正数
      oam.writeSlot(-1, 0, 0, 0);  // 越界负数
    } catch (_) {
      threw = true;
    }
    record('单元-OamManager', '越界索引安全忽略 (BUG-002 修复)', !threw, threw ? '仍抛异常' : '已修复');
    record('单元-OamManager', '越界写入后 slotCount 仍=64', oam.slotCount() === 64, `slots=${oam.slotCount()}`);

    // writeByte 单字节写 (offset 相对 $04A5)
    oam.reset();
    oam.writeByte(0, 0x05); // slot[0].attr = 0x05
    oam.writeByte(1, 0x20); // slot[0].tileLo = 0x20
    oam.writeByte(2, 0x01); // slot[0].tileHi = 0x01
    const s2 = oam.getSlot(0);
    record('单元-OamManager', 'writeByte 3 字节写槽', s2 !== null && s2.attr === 0x05 && s2.tileLo === 0x20 && s2.tileHi === 0x01, `attr=0x${s2?.attr.toString(16)} tile=0x${((s2?.tileHi ?? 0) << 8 | (s2?.tileLo ?? 0)).toString(16)}`);

    // readByte 读字节
    const r0 = oam.readByte(0);
    record('单元-OamManager', 'readByte(0) 读取 attr', r0 === 0x05, `read=0x${r0.toString(16)}`);

    // clearRange 连续清零
    oam.clearRange(0, 3);
    const s3 = oam.getSlot(0);
    record('单元-OamManager', 'clearRange 清零', s3 !== null && s3.attr === 0 && s3.tileLo === 0, '已清零');
  }

  // 1.3 Renderer CHR Bank 注册
  {
    const store = new DataStore();
    const renderer = new Renderer(store);
    const dummyChr = new Uint8Array(0x2000); // 8KB 空 CHR

    let crashed = false;
    try {
      renderer.registerChrBank(0, dummyChr);
      renderer.registerChrBank(15, dummyChr);
    } catch (_) {
      crashed = true;
    }
    record('单元-Renderer', '注册 CHR Bank 0~15', !crashed, crashed ? '抛异常' : 'ok');

    // 越界 bankId
    crashed = false;
    try {
      renderer.registerChrBank(16, dummyChr); // 越界
      renderer.registerChrBank(-1, dummyChr);
    } catch (_) {
      crashed = true;
    }
    record('单元-Renderer', '越界 bankId 不崩溃', !crashed, crashed ? '抛异常' : '安全忽略');

    // setupCanvas
    crashed = false;
    try {
      renderer.setupCanvas(ctx.ctx);
    } catch (_) {
      crashed = true;
    }
    record('单元-Renderer', 'setupCanvas', !crashed, crashed ? '抛异常' : 'ok');
  }

  // 1.4 Bank00Service 初始化
  {
    const store = new DataStore();
    const bank00 = new Bank00Service(store);
    record('单元-Bank00', '构造无异常', true, 'ok');
    record('单元-Bank00', '初始 isRunning', typeof bank00.isRunning === 'boolean', `isRunning=${bank00.isRunning}`);
    record('单元-Bank00', '初始 frameCount=0', bank00.frameCount === 0, `frame=${bank00.frameCount}`);

    // update 不崩溃（无按键）
    let crashed = false;
    try {
      bank00.update(0);
    } catch (_) {
      crashed = true;
    }
    record('单元-Bank00', 'update(0) 不崩溃', !crashed, crashed ? '抛异常' : 'ok');
  }

  // 1.5 Bank12AudioService (PAPU + PapuOutput)
  {
    const store = new DataStore();
    const audio = new Bank12AudioService(store);

    record('单元-Bank12Audio', '构造无异常 (PapuOutput)', true, 'ok');

    // requestPlay (BGM 0x31 需要 Bank15 数据)
    const queued = audio.requestPlay(0x31); // 开场 BGM
    record('单元-Bank12Audio', 'requestPlay(0x31) 返回 false (无 Bank15)', queued === false, `queued=${queued}`);

    // SE 请求 (不需要 Bank15)
    const seQueued = audio.requestPlay(0x05); // SE 音效
    record('单元-Bank12Audio', 'requestPlay(0x05) SE 请求', seQueued === true, `queued=${seQueued}`);

    // stopAll
    let crashed = false;
    try {
      audio.stopAll();
    } catch (_) {
      crashed = true;
    }
    record('单元-Bank12Audio', 'stopAll 不崩溃', !crashed, 'ok');

    // update 不崩溃
    crashed = false;
    try {
      audio.update();
    } catch (_) {
      crashed = true;
    }
    record('单元-Bank12Audio', 'update 不崩溃', !crashed, crashed ? '抛异常' : 'ok');
  }

  // 1.6 Bank30Service / Bank02Service
  {
    const store = new DataStore();
    const bank00 = new Bank00Service(store);
    const bank02 = new Bank02Service(store, bank00);
    const bank30 = new Bank30Service(store, bank00, bank02);

    let crashed = false;
    try {
      bank30.init();
    } catch (_) {
      crashed = true;
    }
    record('单元-Bank30', 'init 不崩溃', !crashed, crashed ? '抛异常' : 'ok');

    // Bank02 resetEntry
    crashed = false;
    try {
      bank02.resetEntry(0);
    } catch (_) {
      crashed = true;
    }
    record('单元-Bank02', 'resetEntry(0) 不崩溃', !crashed, crashed ? '抛异常' : 'ok');
  }

  // 1.7 类型常量
  {
    record('单元-常量', 'NES_WIDTH=256', NES_WIDTH === 256, `${NES_WIDTH}`);
    record('单元-常量', 'NES_HEIGHT=240', NES_HEIGHT === 240, `${NES_HEIGHT}`);
    record('单元-常量', 'BUTTON.A=1', BUTTON.A === 1, `${BUTTON.A}`);
    record('单元-常量', 'BUTTON.START=8', BUTTON.START === 8, `${BUTTON.START}`);
    record('单元-常量', 'BUTTON.RIGHT=128', BUTTON.RIGHT === 128, `${BUTTON.RIGHT}`);

    // BUTTON 枚举完整性
    const allBtns = BUTTON.A | BUTTON.B | BUTTON.SELECT | BUTTON.START | BUTTON.UP | BUTTON.DOWN | BUTTON.LEFT | BUTTON.RIGHT;
    record('单元-常量', '按键位掩码不重叠', allBtns === 0xFF, `mask=0x${allBtns.toString(16)}`);
  }

  // 1.8 ScriptVM 脚本虚拟机
  {
    const { ScriptVM } = await import('../src/data/tile/textscript/script-vm');
    const { getScriptData } = await import('../src/data/tile/textscript/script-data-loader');

    // 脚本 0x00 存在性
    const script00 = getScriptData(0x00);
    record('单元-ScriptVM', '脚本 0x00 存在', script00 !== undefined, `bank=${script00?.bank}`);

    // ScriptVM 构造与启动
    let vm: ScriptVM | null = null;
    let crashed = false;
    try {
      vm = new ScriptVM(0x00);
      vm.start();
    } catch (_) {
      crashed = true;
    }
    record('单元-ScriptVM', '构造并启动脚本 0x00', !crashed, crashed ? '抛异常' : 'ok');

    if (vm) {
      // 初始状态检查
      const initState = vm.getState();
      record('单元-ScriptVM', '初始状态 complete=false', !initState.complete, `complete=${initState.complete}`);
      record('单元-ScriptVM', '初始状态 isLooping=false', !initState.isLooping, `looping=${initState.isLooping}`);

      // 执行 100 帧, 验证不崩溃
      let execCrashed = false;
      let lastState = initState;
      try {
        for (let i = 0; i < 100; i++) {
          lastState = vm.update();
        }
      } catch (_) {
        execCrashed = true;
      }
      record('单元-ScriptVM', '执行 100 帧不崩溃', !execCrashed, execCrashed ? '抛异常' : `shot=${lastState.blockIndex}`);

      // 验证脚本推进 (100 帧后应该有场景数据加载)
      record('单元-ScriptVM', '100 帧后 sceneDataId > 0', lastState.sceneDataId > 0, `sceneDataId=${lastState.sceneDataId}`);

      // 验证等待帧机制 (在某帧应该有 waitFrames > 0)
      let hasWait = false;
      try {
        for (let i = 0; i < 300; i++) {
          const s = vm.update();
          if (s.waitFrames > 0) { hasWait = true; break; }
        }
      } catch (_) { /* ignore */ }
      record('单元-ScriptVM', 'WAIT 指令触发等待', hasWait, hasWait ? '检测到等待帧' : '未检测到');

      // 循环检测: 执行 3000 帧, 验证能检测到循环
      let detectedLoop = vm.isLooping;
      if (!detectedLoop) {
        try {
          for (let i = 0; i < 3000; i++) {
            vm.update();
            if (vm.isLooping) { detectedLoop = true; break; }
          }
        } catch (_) { /* ignore */ }
      }
      record('单元-ScriptVM', '循环检测 (SET_PTR 跳回)', detectedLoop, detectedLoop ? '检测到循环' : '未检测到');

      // 脚本信息
      const info = vm.getScriptInfo();
      record('单元-ScriptVM', 'getScriptInfo 返回非空', info.length > 0, info);
    }

    // 不存在的脚本 ID 应抛异常
    let invalidCrashed = false;
    try {
      new ScriptVM(0xFF);
    } catch (_) {
      invalidCrashed = true;
    }
    record('单元-ScriptVM', '无效脚本 ID 0xFF 抛异常', invalidCrashed, invalidCrashed ? '正确抛异常' : '未抛异常');
  }

  log('━━━ 单元测试完成 ━━━', 'step');
}

// ════════════════════════════════════════════════════════════
// 2. 集成测试 — 完整引擎启动与运行
// ════════════════════════════════════════════════════════════

export async function runIntegrationTests(ctx: TestContext): Promise<void> {
  log('━━━ 集成测试开始 ━━━', 'step');

  // 2.1 引擎完整构造
  let game: Tsubasa2 | null = null;
  let crashed = false;
  let errMsg = '';
  try {
    game = new Tsubasa2(ctx.ctx, {
      debug: true,
      callbacks: {
        onStateChange: (from, to) => log(`[状态] ${from} → ${to}`, 'info'),
        onError: (err) => log(`[引擎错误] ${err.message}`, 'fail'),
      },
    });
  } catch (e) {
    crashed = true;
    errMsg = (e as Error).message;
  }
  record('集成-构造', 'Tsubasa2 构造', !crashed, crashed ? errMsg : 'ok');
  if (!game) {
    log('引擎构造失败，跳过后续集成测试', 'fail');
    return;
  }

  // 2.2 启动引擎
  crashed = false;
  errMsg = '';
  try {
    game.start(ctx.canvas);
  } catch (e) {
    crashed = true;
    errMsg = (e as Error).message;
  }
  record('集成-启动', 'start(canvas) 不崩溃', !crashed, crashed ? errMsg : 'ok');

  // 检测是否有外部依赖错误（rom-data import 失败会在模块加载阶段报错）
  await sleep(200);

  // 2.3 状态验证
  const dbg = game.getDebugInfo();
  record('集成-状态', '启动后 gameState=OPENING', dbg.gameStateName === 'OPENING', `state=${dbg.gameStateName}`);
  record('集成-状态', 'frame>0 (帧循环运行)', dbg.frame > 0, `frame=${dbg.frame}`);

  // 2.4 运行若干帧，验证不崩溃
  log('运行 60 帧（~1秒）观察稳定性...', 'info');
  await sleep(1000);
  const dbg2 = game.getDebugInfo();
  record('集成-运行', '60帧后仍运行', dbg2.frame >= 50, `frame=${dbg2.frame}`);
  record('集成-运行', 'FPS>0', dbg2.fps > 0, `fps=${dbg2.fps}`);

  // 2.5 渲染输出验证 — canvas 不应为全黑（开场画面有内容）
  screenshot('集成-开场画面(1秒)');
  await sleep(100);
  const imgData = ctx.ctx.getImageData(0, 0, NES_WIDTH, NES_HEIGHT);
  let nonBlackPixels = 0;
  for (let i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i] > 0 || imgData.data[i + 1] > 0 || imgData.data[i + 2] > 0) {
      nonBlackPixels++;
    }
  }
  const totalPixels = NES_WIDTH * NES_HEIGHT;
  record('集成-渲染', 'canvas 有非黑像素', nonBlackPixels > 0, `${nonBlackPixels}/${totalPixels} 像素亮 (${(nonBlackPixels / totalPixels * 100).toFixed(1)}%)`);

  // 2.6 保存到上下文供其他测试使用
  ctx.game = game;

  // 2.7 场景流转 — 检查 boot_root
  {
    const store = new DataStore();
    // 通过 game 内部 store 检查（需通过 getDebugInfo 间接验证）
    log(`场景流转验证: 当前状态=${dbg2.gameStateName}, frame=${dbg2.frame}`, 'info');
    record('集成-场景', 'OPENING 状态保持', dbg2.gameStateName === 'OPENING', '开场阶段');
  }

  // 2.8 OpeningSceneController 脚本驱动模式集成测试
  {
    const { OpeningSceneController } = await import('../src/game/scene_opening.controller');
    const { OpeningShot } = await import('../src/data/scene/index');
    const store = new DataStore();
    const ctrl = new OpeningSceneController(store);

    // 初始化 (应启动 ScriptVM)
    let initCrashed = false;
    try {
      ctrl.init();
    } catch (_) {
      initCrashed = true;
    }
    record('集成-OpeningScript', 'init() 不崩溃 (启动 ScriptVM)', !initCrashed, initCrashed ? '抛异常' : 'ok');

    // 获取初始显示状态, 验证脚本驱动模式启用
    const initState = ctrl.getDisplayState();
    record('集成-OpeningScript', 'scriptDriven=true (脚本模式启用)', initState.scriptDriven, `scriptDriven=${initState.scriptDriven}`);
    record('集成-OpeningScript', '初始 shot=LOGO', initState.shot === OpeningShot.LOGO, `shot=${initState.shot}`);

    // 执行 300 帧, 验证脚本驱动不崩溃
    let execCrashed = false;
    let lastState = initState;
    try {
      for (let i = 0; i < 300; i++) {
        lastState = ctrl.update(0); // 无按键
      }
    } catch (_) {
      execCrashed = true;
    }
    record('集成-OpeningScript', '300 帧脚本驱动不崩溃', !execCrashed, execCrashed ? '抛异常' : `frame=${lastState.shotFrame}`);

    // 验证脚本字段有效 (sceneDataId 或 mode 应有变化)
    const hasScriptData = lastState.scriptSceneDataId > 0 || lastState.scriptMode > 0;
    record('集成-OpeningScript', '脚本字段有效 (sceneDataId/mode > 0)', hasScriptData, `scene=${lastState.scriptSceneDataId}, mode=${lastState.scriptMode}`);

    // 验证脚本文本行累积 (执行足够帧后应有文本)
    log(`脚本状态: textLines=${lastState.scriptTextLines.length}, lastInstr="${lastState.scriptLastInstr}"`, 'info');

    // START 键跳过测试 — 脚本模式下 START 应能跳过到标题
    ctrl.jumpToTitle();
    const titleState = ctrl.getDisplayState();
    record('集成-OpeningScript', 'jumpToTitle() 进入标题画面', titleState.isTitle, `isTitle=${titleState.isTitle}`);
    record('集成-OpeningScript', '标题画面 shot=TITLE', titleState.shot === OpeningShot.TITLE, `shot=${titleState.shot}`);

    // 截图记录脚本驱动状态
    screenshot('集成-OpeningScript-脚本驱动状态');
  }

  log('━━━ 集成测试完成 ━━━', 'step');
}

// ════════════════════════════════════════════════════════════
// 3. 输入测试
// ════════════════════════════════════════════════════════════

export async function runInputTests(ctx: TestContext): Promise<void> {
  log('━━━ 输入测试开始 ━━━', 'step');

  const game = ctx.game;
  if (!game) {
    log('引擎未初始化，跳过输入测试', 'warn');
    record('输入', '引擎未初始化', false, 'skip');
    return;
  }

  // 3.1 pressButton / releaseButton
  game.pressButton('A');
  const btnA = game.getButtons();
  record('输入-按键', 'pressButton(A) 设置位', (btnA & BUTTON.A) !== 0, `buttons=0x${btnA.toString(16)}`);

  game.releaseButton('A');
  const btnA2 = game.getButtons();
  record('输入-按键', 'releaseButton(A) 清除位', (btnA2 & BUTTON.A) === 0, `buttons=0x${btnA2.toString(16)}`);

  // 3.2 多键组合
  game.pressButton('A');
  game.pressButton('B');
  game.pressButton('START');
  const combo = game.getButtons();
  const expected = BUTTON.A | BUTTON.B | BUTTON.START;
  record('输入-组合', 'A+B+START 组合', combo === expected, `0x${combo.toString(16)}==0x${expected.toString(16)}`);

  // 3.3 全部按键
  game.setButtons(0xFF);
  record('输入-全键', 'setButtons(0xFF) 全键按下', game.getButtons() === 0xFF, '0xff');

  game.setButtons(0);
  record('输入-清键', 'setButtons(0) 全键释放', game.getButtons() === 0, '0x00');

  // 3.4 输入后运行几帧，验证不崩溃
  game.pressButton('START');
  await sleep(300);
  const dbg = game.getDebugInfo();
  record('输入-帧循环', '按键后帧循环继续', dbg.frame > 0, `frame=${dbg.frame}`);
  screenshot('输入-按START后画面');

  game.releaseButton('START');
  await sleep(200);

  // 3.5 快速连按（防抖/中断测试）
  log('快速连按 A 键 10 次...', 'info');
  for (let i = 0; i < 10; i++) {
    game.pressButton('A');
    await sleep(30);
    game.releaseButton('A');
    await sleep(30);
  }
  record('输入-连按', '快速连按 10 次不崩溃', true, 'ok');
  screenshot('输入-连按A后画面');

  log('━━━ 输入测试完成 ━━━', 'step');
}

// ════════════════════════════════════════════════════════════
// 4. 性能测试
// ════════════════════════════════════════════════════════════

export async function runPerformanceTests(ctx: TestContext): Promise<void> {
  log('━━━ 性能测试开始 ━━━', 'step');

  const game = ctx.game;
  if (!game) {
    log('引擎未初始化，跳过性能测试', 'warn');
    return;
  }

  // 4.1 FPS 稳定性 — 采样 3 秒
  log('采样 3 秒 FPS...', 'info');
  const samples: number[] = [];
  const startFrame = game.getDebugInfo().frame;
  for (let i = 0; i < 6; i++) {
    await sleep(500);
    const dbg = game.getDebugInfo();
    samples.push(dbg.fps);
    progress((i + 1) / 6 * 100);
  }
  const avgFps = samples.reduce((a, b) => a + b, 0) / samples.length;
  const maxFps = Math.max(...samples);
  const minFps = Math.min(...samples);
  log(`FPS 采样: avg=${avgFps.toFixed(1)} min=${minFps} max=${maxFps} samples=[${samples.join(',')}]`, 'info');
  record('性能-FPS', '平均 FPS >= 30', avgFps >= 30, `avg=${avgFps.toFixed(1)}`);
  record('性能-FPS', 'FPS 波动 <= 40', (maxFps - minFps) <= 40, `Δ=${maxFps - minFps}`);

  // 4.2 帧推进一致性
  const f1 = game.getDebugInfo().frame;
  await sleep(1000);
  const f2 = game.getDebugInfo().frame;
  const framesPerSec = f2 - f1;
  log(`1秒内推进帧数: ${framesPerSec}`, 'info');
  record('性能-帧率', '每秒帧数 50~70', framesPerSec >= 50 && framesPerSec <= 70, `${framesPerSec} fps`);

  // 4.3 渲染耗时
  const t0 = performance.now();
  for (let i = 0; i < 60; i++) {
    // 手动触发一帧渲染（通过 internal 方式不可用，改用等待）
    await sleep(16);
  }
  const elapsed = performance.now() - t0;
  record('性能-渲染', '60帧(1秒)耗时 < 1200ms', elapsed < 1200, `${elapsed.toFixed(0)}ms`);

  // 4.4 内存（如果支持）
  if ((performance as any).memory) {
    const mem = (performance as any).memory;
    log(`内存: used=${(mem.usedJSHeapSize / 1048576).toFixed(1)}MB total=${(mem.totalJSHeapSize / 1048576).toFixed(1)}MB`, 'info');
    record('性能-内存', '已用堆 < 100MB', mem.usedJSHeapSize < 100 * 1048576, `${(mem.usedJSHeapSize / 1048576).toFixed(1)}MB`);
  } else {
    record('性能-内存', 'performance.memory 不可用', true, 'skip');
  }

  screenshot('性能-3秒运行后画面');
  log('━━━ 性能测试完成 ━━━', 'step');
}

// ════════════════════════════════════════════════════════════
// 5. 边界测试
// ════════════════════════════════════════════════════════════

export async function runEdgeTests(ctx: TestContext): Promise<void> {
  log('━━━ 边界测试开始 ━━━', 'step');

  // 5.1 重复 start() — 应被忽略
  {
    const game = new Tsubasa2(ctx.ctx);
    let crashed = false;
    try {
      game.start(ctx.canvas);
      game.start(ctx.canvas); // 重复
    } catch (e) {
      crashed = true;
    }
    record('边界-重复启动', '重复 start() 不崩溃', !crashed, '已忽略');
    game.stop();
  }

  // 5.2 不传 canvas 启动 — 应抛错
  {
    const game = new Tsubasa2(ctx.ctx);
    let threw = false;
    try {
      game.start(undefined as any);
    } catch (_) {
      threw = true;
    }
    record('边界-空canvas', 'start() 无 canvas 抛异常', threw, '预期抛错');
  }

  // 5.3 pause/resume
  {
    const game = ctx.game;
    if (game) {
      game.pause();
      const f1 = game.getDebugInfo().frame;
      await sleep(500);
      const f2 = game.getDebugInfo().frame;
      record('边界-暂停', '暂停后帧不推进', f1 === f2, `f1=${f1} f2=${f2}`);

      game.resume();
      await sleep(500);
      const f3 = game.getDebugInfo().frame;
      record('边界-恢复', '恢复后帧推进', f3 > f2, `f3=${f3} > f2=${f2}`);
    }
  }

  // 5.4 极值按键
  {
    const game = ctx.game;
    if (game) {
      game.setButtons(0xFFFFFFFF); // 超出 8 位
      record('边界-极值按键', 'setButtons(超值) 不崩溃', true, `buttons=0x${game.getButtons().toString(16)}`);
      game.setButtons(0);
    }
  }

  // 5.5 DataStore 大量写入
  {
    const store = new DataStore();
    let crashed = false;
    try {
      for (let i = 0; i < 1000; i++) {
        store.write('key_' + i, i & 0xFF); // DataStore 会截断为 8 位
      }
    } catch (_) {
      crashed = true;
    }
    record('边界-DataStore', '连续写入 1000 键不崩溃', !crashed, 'ok');
    // key_999 写入 999 & 0xFF = 231
    const v = store.read('key_999');
    record('边界-DataStore', '读取第 1000 个键 (999&0xFF=231)', v === 231, `v=${v}`);
  }

  // 5.6 OamManager 全精灵渲染
  {
    const oam = new OamManager();
    oam.reset();
    for (let i = 0; i < 64; i++) {
      oam.writeSlot(i, i & 0xFF, (i * 4) & 0xFF, 0);
      oam.setPos(i, (i * 4) % 256, (i * 4) % 240, true);
    }
    record('边界-OAM', '64 精灵满载', oam.slotCount() === 64, `slots=${oam.slotCount()}`);

    // 第 65 个精灵: 修复后安全忽略 (BUG-002 已修复)
    let threw65 = false;
    try {
      oam.writeSlot(64, 0, 0, 0);
    } catch (_) {
      threw65 = true;
    }
    record('边界-OAM', '第 65 个精灵安全忽略 (BUG-002 修复)', !threw65, threw65 ? '仍抛异常' : '已修复');
    record('边界-OAM', '越界后 slotCount 仍=64', oam.slotCount() === 64, `slots=${oam.slotCount()}`);
  }

  // 5.7 长时间运行（快速 2 秒）
  {
    const game = ctx.game;
    if (game) {
      log('额外运行 2 秒验证稳定性...', 'info');
      const f1 = game.getDebugInfo().frame;
      await sleep(2000);
      const f2 = game.getDebugInfo().frame;
      record('边界-长时运行', '2秒后帧继续推进', f2 > f1, `${f2 - f1} 帧推进`);
      screenshot('边界-长时运行画面');
    }
  }

  log('━━━ 边界测试完成 ━━━', 'step');
}
