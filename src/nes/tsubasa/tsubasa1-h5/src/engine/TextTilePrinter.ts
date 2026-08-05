/**
 * 文字 Tile 打印机 - 逐帧打字效果
 *
 * ============================================================
 * 对应 ROM Bank 1 的文字渲染系统。
 *
 * ROM 中文字是逐帧写入 nametable 的:
 * - 每 N 帧写入 1 个 tile
 * - 使用 PPU 队列系统异步写入
 * - 支持打字音效同步 (可选)
 *
 * 用途:
 * 1. 开场动画文字逐行显示
 * 2. 菜单文字渲染
 * 3. 对话文本 (Bank 7 脚本引擎)
 * 4. 比赛 HUD 文字
 *
 * 架构:
 *   TextTilePrinter 直接写入 Renderer.writeVram(),
 *   不经过 PPU 队列以简化流程。
 *
 * @see OpeningScenePlayer.ts 中的文字打印阶段
 * @see Bank1Dispatcher.ts 中的标题画面加载
 * ============================================================
 */

import type { Renderer } from '../renderer/Renderer';

/**
 * 单个文字块的配置
 */
export interface TextBlock {
  /** 文本内容 */
  text: string;
  /** 起始 nametable 地址 (0x2000 基址) */
  startAddr: number;
  /** 每行 tile 数 (nametable 宽度=32) */
  lineWidth?: number;
  /** 总行数限制 */
  maxLines?: number;
  /** 每个字符之间的帧数延迟 (默认 2) */
  charDelay?: number;
  /** 调色板属性值 (默认 0x00 = palette 0) */
  paletteAttr?: number;
}

/**
 * 文字打印状态
 */
export enum TextPrintState {
  /** 空闲 */
  IDLE = 'idle',
  /** 正在逐字打印 */
  TYPING = 'typing',
  /** 打印完成, 等待 */
  DONE = 'done',
}

/**
 * 文字 Tile 打印机
 *
 * 支持:
 * - 单行/多行文本
 * - 逐字打字效果
 * - 帧延迟控制
 * - 自动换行
 */
export class TextTilePrinter {
  private renderer: Renderer;

  /** 当前文本块 */
  private block: TextBlock | null = null;
  /** 当前打印状态 */
  private state: TextPrintState = TextPrintState.IDLE;
  /** 当前打印到第几个字符 */
  private charIndex: number = 0;
  /** 帧计数器 */
  private frameCounter: number = 0;
  /** 当前行 */
  private currentLine: number = 0;
  /** 当前列 */
  private currentCol: number = 0;
  /** 当前页的 tile 快照 (用于增量更新) */
  private tileSnapshot: number[] = [];

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  // ============================================================
  // 公共接口
  // ============================================================

  /** 开始打印文本块 */
  print(block: TextBlock): void {
    this.block = {
      lineWidth: 32,
      maxLines: 30,
      charDelay: 2,
      paletteAttr: 0x00,
      ...block,
    };
    this.state = TextPrintState.TYPING;
    this.charIndex = 0;
    this.frameCounter = 0;
    this.currentLine = 0;
    this.currentCol = 0;
    console.log(`[TextPrinter] Start: "${block.text.substring(0, 20)}..." at $${block.startAddr.toString(16)}`);
  }

  /** 每帧更新, 返回当前状态 */
  update(): TextPrintState {
    if (this.state !== TextPrintState.TYPING || !this.block) {
      return this.state;
    }

    this.frameCounter++;

    // 延迟控制
    if (this.frameCounter < (this.block.charDelay ?? 2)) {
      return TextPrintState.TYPING;
    }
    this.frameCounter = 0;

    // 打印下一个字符
    this.printNextChar();

    return this.state;
  }

  /** 跳过打字效果, 立即显示全部文字 */
  finish(): void {
    if (!this.block || this.state === TextPrintState.IDLE) return;

    while (this.state === TextPrintState.TYPING) {
      this.printNextChar();
    }
  }

  /** 清除当前文字区域 */
  clear(): void {
    this.state = TextPrintState.IDLE;
    this.block = null;
    this.charIndex = 0;
    this.tileSnapshot = [];
  }

  /** 获取当前状态 */
  getState(): TextPrintState { return this.state; }

  /** 是否正在打印 */
  get isTyping(): boolean { return this.state === TextPrintState.TYPING; }

  /** 是否已完成 */
  get isDone(): boolean { return this.state === TextPrintState.DONE; }

  // ============================================================
  // 内部方法
  // ============================================================

  /** 打印下一个字符 */
  private printNextChar(): void {
    if (!this.block) return;

    const { text, startAddr, lineWidth = 32, maxLines = 30 } = this.block;

    // 检查是否已完成
    if (this.charIndex >= text.length) {
      this.state = TextPrintState.DONE;
      console.log(`[TextPrinter] Done: ${text.length} chars printed`);
      return;
    }

    // 获取当前字符
    const char = text[this.charIndex];
    this.charIndex++;

    // 处理换行符
    if (char === '\n') {
      this.currentLine++;
      this.currentCol = 0;

      // 检查是否超出最大行数
      if (this.currentLine >= maxLines) {
        this.state = TextPrintState.DONE;
        return;
      }

      // 递归打印下一个字符 (跨帧)
      return;
    }

    // 处理自动换行
    if (this.currentCol >= lineWidth) {
      this.currentLine++;
      this.currentCol = 0;

      if (this.currentLine >= maxLines) {
        this.state = TextPrintState.DONE;
        return;
      }
    }

    // 计算 VRAM 地址
    const addr = startAddr + this.currentLine * lineWidth + this.currentCol;

    // 获取字符对应的 tile
    const tile = this.charToTile(char);

    // 写入 VRAM
    this.renderer.writeVram(addr, tile);

    // 更新光标位置
    this.currentCol++;
  }

  /**
   * 字符 → tile 索引映射
   *
   * 使用 CHR Bank 09 (字体 bank) 的 tile 索引。
   * 对于不在映射表中的字符, 使用 0x00 (空白) 作为回退。
   */
  private charToTile(char: string): number {
    // 简易 ASCII → tile 映射
    // 日文字体 bank 中, tile 0x20 开始是假名
    const code = char.charCodeAt(0);

    // ASCII 大写字母 (A-Z) → 使用片假名 tile 区域作为近似
    if (code >= 0x41 && code <= 0x5A) {
      // A→0x41 in ASCII, use tile 0x41 area
      // 实际上游戏使用自定义 ASCII 映射
      // 暂时回退到空白
      return 0x00;
    }

    // ASCII 数字 (0-9)
    if (code >= 0x30 && code <= 0x39) {
      return 0x00; // TODO: 映射数字 tile
    }

    // 空格
    if (char === ' ') return 0x00;

    // 日文假名
    if (code >= 0x3040 && code <= 0x309F) {
      // 平假名范围
      const offset = code - 0x3040;
      return 0x20 + offset;
    }
    if (code >= 0x30A0 && code <= 0x30FF) {
      // 片假名范围
      const offset = code - 0x30A0;
      return 0x50 + offset;
    }

    // 未知字符 → 空白
    return 0x00;
  }
}
