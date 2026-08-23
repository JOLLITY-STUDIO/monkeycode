/**
 * 剧情脚本虚拟机 — 执行脚本字节码指令
 *
 * 基于 bank_00.asm $84E7 脚本分派器逻辑:
 *   - 每帧调用 update(), 执行指令直到遇到 WAIT 或完成
 *   - TEXT 指令累积文本到缓冲区
 *   - WAIT 指令暂停执行指定帧数
 *   - LONG_INSTR 指令根据 opcode 执行不同操作
 *   - SET_PTR 指令跳转到新代码块 (循环)
 *   - END 指令结束脚本
 *
 * 使用方式:
 *   const vm = new ScriptVM(0x00);  // 加载脚本 0x00 (BOOT/标题画面)
 *   vm.start();
 *   while (!vm.complete) {
 *     const state = vm.update();
 *     // 渲染 state.textLines, state.spriteIds 等
 *   }
 */

import { getScriptData, type ScriptData, type ScriptInstruction } from './script-data-loader';
import { InstrType } from './script-opcodes';

// ── 文本行 (保留原始字节, 供 CHR tile 渲染, 不依赖 Unicode 映射) ──

export interface ScriptTextLine {
  /** 原始脚本文本字节 (字符值 < $A0 单 tile, $A0-$D7 双 tile 假名) */
  bytes: number[];
  /** 调试用可读文本 (占位, 非渲染依据) */
  text: string;
}

// ── 虚拟机状态 ──

export interface ScriptVMState {
  /** 脚本 ID */
  scriptId: number;
  /** 当前块索引 */
  blockIndex: number;
  /** 当前指令索引 */
  instrIndex: number;
  /** 剩余等待帧数 */
  waitFrames: number;
  /** 文本行缓冲区 (保留原始字节) */
  textLines: ScriptTextLine[];
  /** 当前场景数据 ID (LOAD_SCENE_DATA 参数) */
  sceneDataId: number;
  /** 已加载的精灵 ID 列表 (LOAD_SPRITE 参数) */
  spriteIds: number[];
  /** 对象队列 (QUEUE_OBJ 参数) */
  objectQueue: number[];
  /** 当前显示模式 (SET_MODE 参数) */
  mode: number;
  /** 条件标志 (COND_SET 参数) */
  condFlag: number;
  /** 文本位置 X (SET_POS 参数1, 原始 ram_004F) */
  posX: number;
  /** 文本位置 Y (SET_POS 参数2, 原始 ram_0050) */
  posY: number;
  /** 是否已完成 */
  complete: boolean;
  /** 最后执行的指令描述 (调试用) */
  lastInstruction: string;
  /** 脚本是否在循环 (SET_PTR 跳回已访问地址) */
  isLooping: boolean;
}

// ── 脚本虚拟机 ──

export class ScriptVM {
  /** 脚本数据 */
  private _scriptData: ScriptData | undefined;
  /** 当前块索引 */
  private _blockIndex = 0;
  /** 当前指令索引 */
  private _instrIndex = 0;
  /** 剩余等待帧数 */
  private _waitFrames = 0;
  /** 文本行缓冲区 */
  private _textLines: ScriptTextLine[] = [];
  /** 当前文本行字节 (累积中) */
  private _currentBytes: number[] = [];
  /** 场景数据 ID */
  private _sceneDataId = 0;
  /** 精灵 ID 列表 */
  private _spriteIds: number[] = [];
  /** 对象队列 */
  private _objectQueue: number[] = [];
  /** 显示模式 */
  private _mode = 0;
  /** 条件标志 */
  private _condFlag = 0;
  /** 文本位置 X (SET_POS 参数1) */
  private _posX = 0;
  /** 文本位置 Y (SET_POS 参数2) */
  private _posY = 0;
  /** 是否已完成 */
  private _complete = false;
  /** 最后执行的指令 */
  private _lastInstruction = '';
  /** 已访问的块地址 (用于循环检测) */
  private _visitedBlocks = new Set<string>();
  /** 是否在循环 */
  private _isLooping = false;
  /** 每帧最大执行指令数 (防止死循环) */
  private static readonly MAX_INSTR_PER_FRAME = 200;

  constructor(scriptId: number) {
    this._scriptData = getScriptData(scriptId);
    if (!this._scriptData) {
      throw new Error(`脚本 ID 0x${scriptId.toString(16).padStart(2, '0').toUpperCase()} 不存在`);
    }
  }

  // ── 公开属性 ──

  get scriptId(): number { return this._scriptData?.id ?? -1; }
  get complete(): boolean { return this._complete; }
  get isLooping(): boolean { return this._isLooping; }

  /** 获取当前状态快照 */
  getState(): ScriptVMState {
    return {
      scriptId: this._scriptData?.id ?? -1,
      blockIndex: this._blockIndex,
      instrIndex: this._instrIndex,
      waitFrames: this._waitFrames,
      textLines: this._textLines.map(l => ({ bytes: [...l.bytes], text: l.text })),
      sceneDataId: this._sceneDataId,
      spriteIds: [...this._spriteIds],
      objectQueue: [...this._objectQueue],
      mode: this._mode,
      condFlag: this._condFlag,
      posX: this._posX,
      posY: this._posY,
      complete: this._complete,
      lastInstruction: this._lastInstruction,
      isLooping: this._isLooping,
    };
  }

  // ── 生命周期 ──

  /** 启动脚本 (从第一个块的第一条指令开始) */
  start(): void {
    this._blockIndex = 0;
    this._instrIndex = 0;
    this._waitFrames = 0;
    this._textLines = [];
    this._currentBytes = [];
    this._sceneDataId = 0;
    this._spriteIds = [];
    this._objectQueue = [];
    this._mode = 0;
    this._condFlag = 0;
    this._posX = 0;
    this._posY = 0;
    this._complete = false;
    this._lastInstruction = '';
    this._visitedBlocks.clear();
    this._isLooping = false;

    // 将起始地址加入已访问集合, 这样第一次 SET_PTR 跳回起始地址时就能检测到循环
    if (this._scriptData && this._scriptData.blocks.length > 0) {
      const startAddr = this._scriptData.blocks[0].startAddr;
      // startAddr 格式: "$A020", 转为 "A020" 作为 key
      const addrKey = startAddr.replace('$', '').toUpperCase();
      this._visitedBlocks.add(addrKey);
    }
  }

  /**
   * 每帧更新 — 执行指令直到遇到 WAIT 或完成
   * @returns 当前状态快照
   */
  update(): ScriptVMState {
    if (this._complete) return this.getState();

    // 处理等待
    if (this._waitFrames > 0) {
      this._waitFrames--;
      return this.getState();
    }

    // 执行指令 (直到遇到 WAIT 或完成)
    let count = 0;
    while (this._waitFrames === 0 && !this._complete && count < ScriptVM.MAX_INSTR_PER_FRAME) {
      this._executeNextInstruction();
      count++;
    }

    return this.getState();
  }

  // ── 指令执行 ──

  private _executeNextInstruction(): void {
    if (!this._scriptData) {
      this._complete = true;
      return;
    }

    const block = this._scriptData.blocks[this._blockIndex];
    if (!block || this._instrIndex >= block.instructions.length) {
      // 当前块结束, 尝试下一个块
      this._blockIndex++;
      this._instrIndex = 0;
      if (this._blockIndex >= this._scriptData.blocks.length) {
        this._complete = true;
      }
      return;
    }

    const instr = block.instructions[this._instrIndex];
    this._instrIndex++;
    this._lastInstruction = instr.text || instr.type;

    switch (instr.type) {
    case InstrType.TEXT:
      this._handleText(instr);
      break;
    case InstrType.TEXT_CTRL:
      this._handleTextCtrl(instr);
      break;
    case InstrType.WAIT:
      this._handleWait(instr);
      break;
    case InstrType.LONG_INSTR:
      this._handleLongInstr(instr);
      break;
    case InstrType.UNKNOWN:
      // 未知指令, 跳过
      break;
    }
  }

  // ── 文本处理 ──

  /** 将当前累积的文本字节推入行缓冲区 */
  private _flushLine(): void {
    if (this._currentBytes.length > 0) {
      this._textLines.push({
        bytes: [...this._currentBytes],
        text: this._currentBytes
          .map(b => b < 0xA0 ? String.fromCharCode(b) : `[${b.toString(16).toUpperCase()}]`)
          .join(''),
      });
      this._currentBytes = [];
    }
  }

  private _handleText(instr: ScriptInstruction): void {
    if (instr.bytes && instr.bytes.length > 0) {
      // 保留原始文本字节 — 渲染层直接按 CHR tile 渲染, 不依赖 Unicode 映射
      this._currentBytes.push(...instr.bytes);
    } else if (instr.text) {
      // 兼容: 无字节时推入调试文本对应的字节 (不渲染)
      this._currentBytes.push(...Array.from(instr.text).map(c => c.charCodeAt(0) & 0xFF));
    }
  }

  private _handleTextCtrl(instr: ScriptInstruction): void {
    // 文本格式控制: E0/E1 换行, E2-E7 其他格式控制
    if (instr.opcode === 0xE0 || instr.opcode === 0xE1) {
      this._flushLine();
    }
  }

  private _handleWait(instr: ScriptInstruction): void {
    this._waitFrames = instr.frames ?? 0;
    // 等待前, 将当前文本行推入缓冲区
    this._flushLine();
  }

  // ── 长指令处理 ──

  private _handleLongInstr(instr: ScriptInstruction): void {
    if (instr.opcode === undefined) return;

    switch (instr.opcode) {
    case 0xE8: // LOAD_SCENE_DATA
      this._sceneDataId = instr.params?.[0] ?? 0;
      break;
    case 0xEA: // CLEAR_RESET
      this._textLines = [];
      this._currentBytes = [];
      this._spriteIds = [];
      this._objectQueue = [];
      break;
    case 0xEC: // COND_SET
      this._condFlag = instr.params?.[0] ?? 0;
      break;
    case 0xED: // QUEUE_OBJ
      if (instr.params && instr.params.length > 0) {
        this._objectQueue.push(instr.params[0]);
      }
      break;
    case 0xEE: // CLEAR_WINDOW
      this._textLines = [];
      this._currentBytes = [];
      break;
    case 0xF0: // SET_POS — 设置文本位置 [x][y] (原始 ram_004F/0050)
      this._posX = instr.params?.[0] ?? 0;
      this._posY = instr.params?.[1] ?? 0;
      break;
    case 0xF1: // LOAD_SPRITE
      if (instr.params && instr.params.length > 0) {
        this._spriteIds.push(instr.params[0]);
      }
      break;
    case 0xF2: // SET_MODE
      this._mode = instr.params?.[0] ?? 0;
      break;
    case 0xFC: // ADVANCE_PTR
      // 推进指针: 将当前文本行推入缓冲区
      this._flushLine();
      break;
    case 0xFE: // SET_PTR (跳转)
      this._handleSetPtr(instr);
      break;
    case 0xFF: // END
      this._complete = true;
      break;
    // 以下指令暂不实现具体逻辑, 仅记录
    case 0xE9: // YIELD2_CHECK
    case 0xEB: // YIELD_CALL
    case 0xEF: // TOGGLE_FLAG
    case 0xF3: // VAR_LEN
    case 0xF4: // SUB_DISPATCH
    case 0xF5: // SUB_DISPATCH2
    case 0xF6: // CALL_FA8
    case 0xF7: // TOGGLE_BANK
    case 0xF8: // VAR_DATA
    case 0xF9: // CALL_8AF7
    case 0xFA: // CALL_8AF7B
    case 0xFB: // CALL_9085
    case 0xFD: // YIELD_FA8
      // 这些指令需要更复杂的游戏状态交互, 暂时跳过
      break;
    }
  }

  // ── 跳转处理 (SET_PTR) ──

  private _handleSetPtr(instr: ScriptInstruction): void {
    if (!this._scriptData || !instr.params || instr.params.length < 2) return;

    const targetAddr = (instr.params[1] << 8) | instr.params[0];
    const targetKey = `${targetAddr.toString(16).toUpperCase()}`;

    // 循环检测: 如果目标地址已访问过, 标记为循环
    if (this._visitedBlocks.has(targetKey)) {
      this._isLooping = true;
    }
    this._visitedBlocks.add(targetKey);

    // 查找目标块
    const targetBlock = this._findBlockByAddr(targetAddr);
    if (targetBlock >= 0) {
      this._blockIndex = targetBlock;
      this._instrIndex = 0;
    }
  }

  /** 通过起始地址查找块索引 */
  private _findBlockByAddr(addr: number): number {
    if (!this._scriptData) return -1;
    const addrStr = '$' + addr.toString(16).padStart(4, '0').toUpperCase();
    for (let i = 0; i < this._scriptData.blocks.length; i++) {
      if (this._scriptData.blocks[i].startAddr === addrStr) {
        return i;
      }
    }
    return -1;
  }

  // ── 调试 ──

  /** 获取脚本信息 */
  getScriptInfo(): string {
    if (!this._scriptData) return 'No script loaded';
    const blockCount = this._scriptData.blocks.length;
    const totalInstrs = this._scriptData.blocks.reduce(
      (sum, b) => sum + b.instructions.length, 0
    );
    return `Script 0x${this._scriptData.id.toString(16).padStart(2, '0').toUpperCase()} ` +
           `(${blockCount} blocks, ${totalInstrs} instructions)`;
  }
}
