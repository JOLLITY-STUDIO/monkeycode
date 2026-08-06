/**
 * 天使之翼1 — 标题画面 (Bank 5)
 * 
 * 对应原始: Bank 5 Sub D (标题画面处理器)
 * 
 * 流程:
 *   1. 设置标题CHR Banks
 *   2. 加载Bank 2标题调色板 ($B24F)
 *   3. 显示标题画面 (nametable from Bank 2)
 *   4. 等待START → 转换到菜单 (State 2)
 */
import { DataStore } from '../../data/DataStore';
import { BankModule } from '../../core/BankDispatcher';
import { StateMachine } from '../../core/StateMachine';
import { GameState } from '../../core/types';
import { getRomReader } from '../../data/RomReader';

/** 标题画面调色板 (Bank 2 $B24F) */
const TITLE_PALETTE: number[] = [
  0x0F, 0x33, 0x0F, 0x1A,  // BG0: 黑/浅蓝/黑/绿
  0x30, 0x36, 0x0F, 0x30,  // BG1: 白/深灰/黑/白
  0x0F, 0x25, 0x0F, 0x0F,  // BG2: 黑/粉/黑/黑
  0x0F, 0x36, 0x30, 0x21,  // BG3: 黑/深灰/白/蓝
  0x36, 0x11, 0x0F, 0x36,  // SPR0: 深灰/蓝/黑/深灰
  0x30, 0x21, 0x36, 0x30,  // SPR1: 白/蓝/深灰/白
  0x0F, 0x0F, 0x0F, 0x21,  // SPR2: 黑/黑/黑/蓝
  0x31, 0x30, 0x1A, 0x30,  // SPR3: 浅灰/白/绿/白
];

/** 标题画面子状态 */
enum TitleSubState {
  INIT = 0,
  DISPLAY = 1,
  EXIT = 2,
}

export class TitleScene implements BankModule {
  readonly bankId: number = 5;
  
  private ds: DataStore;
  private sm: StateMachine;
  private _subState: TitleSubState = TitleSubState.INIT;
  private _timer: number = 0;

  constructor(ds: DataStore, sm: StateMachine) {
    this.ds = ds;
    this.sm = sm;
  }

  init(): void {
    console.log('[TitleScene] 标题画面初始化');
    this._subState = TitleSubState.INIT;
    this._timer = 0;
    
    // 加载标题调色板
    this._loadTitlePalette();
    
    // 设置CHR Bank (标题画面)
    this.ds.currentChrBank0 = 0;
    this.ds.currentChrBank1 = 2; // Bank 2 CHR包含标题图形
    this.ds.chrBank0 = 0;
    this.ds.chrBank1 = 2;
    
    // 加载标题画面nametable
    this._loadTitleNametable();
    
    this._subState = TitleSubState.DISPLAY;
  }

  callSub(subId: number): void {
    this._timer++;
    
    switch (this._subState) {
      case TitleSubState.DISPLAY:
        this._updateDisplay();
        break;
      case TitleSubState.EXIT:
        this._doExit();
        break;
    }
  }

  // ==================== 显示循环 ====================

  private _updateDisplay(): void {
    // 检查START按键
    const startPressed = (this.ds.joy1Edge & 0x10) !== 0;
    const autoAdvance = this._timer > 300; // 5秒自动
    
    if (startPressed || autoAdvance) {
      if (autoAdvance) {
        console.log('[TitleScene] 自动推进');
      } else {
        console.log('[TitleScene] START按下');
      }
      this._subState = TitleSubState.EXIT;
      this._timer = 0;
    }
  }

  private _doExit(): void {
    // 过渡到菜单
    console.log('[TitleScene] → 切换到菜单画面');
    this.sm.transitionTo(GameState.MENU);
  }

  // ==================== 调色板 ====================

  private _loadTitlePalette(): void {
    // 从Bank 2 ROM加载 (fallback: 使用内置常量)
    const romReader = getRomReader();
    const bank2 = romReader.getBankData(2);
    const PALETTE_OFFSET = 0xB24F - 0x8000; // $324F in Bank 2
    
    if (bank2 && bank2.length > PALETTE_OFFSET + 31) {
      for (let i = 0; i < 32; i++) {
        this.ds.paletteRam[i] = bank2[PALETTE_OFFSET + i];
      }
      console.log('[TitleScene] 调色板从Bank 2加载');
    } else {
      // Fallback: 使用内置常量
      for (let i = 0; i < 32; i++) {
        this.ds.paletteRam[i] = TITLE_PALETTE[i];
      }
      console.log('[TitleScene] 调色板从内置常量加载');
    }

    // 复制到备用区
    this.ds.currentChrBank0 = 0;
    this.ds.currentChrBank1 = 2;
  }

  // ==================== Nametable ====================

  private _loadTitleNametable(): void {
    const nt = this.ds.nametable0;
    const romReader = getRomReader();
    const bank2 = romReader.getBankData(2);
    
    // 清空nametable
    nt.fill(0);
    
    // Bank 2 $B200 区域包含标题画面nametable数据
    // 格式: PPU写入序列 (类似RLE)
    const NT_DATA_OFFSET = 0xB200 - 0x8000; // $3200 in Bank 2
    
    if (bank2 && bank2.length > NT_DATA_OFFSET) {
      this._decodeNametableData(bank2, NT_DATA_OFFSET, nt);
      console.log('[TitleScene] Nametable从Bank 2解码');
    } else {
      // Fallback: 简单标题显示
      this._drawFallbackTitle(nt);
      console.log('[TitleScene] Nametable使用fallback');
    }
    
    // 设置属性表
    this._fillAttributeTable(nt);
  }

  /**
   * 解码Bank 2的nametable数据
   * 格式: [count][tile_hi][tile_lo]... (PPU写入格式)
   * 注意: Bank 2中的nametable使用特殊压缩格式
   */
  private _decodeNametableData(bank2: Uint8Array, offset: number, nt: Uint8Array): void {
    // Bank 2 $B200 区域数据格式分析:
    // 开头: 00 00 00 00 00 00 00 80 → PPU地址设置
    // 接着: AA FF → 可能是命令
    // 接着: 00 0C 0C 0C 0C... → 数据
    // 
    // 简化的解码: 从offset开始扫描，查找可识别的标题tile序列
    
    let i = offset;
    let ntPos = 0;
    
    // 跳过前导字节直到找到有效tile数据
    // 标题画面从nametable顶部开始
    while (i < bank2.length - 2 && ntPos < 960) {
      const b = bank2[i];
      
      // 如果遇到重复序列 (0x0C 连续出现)
      if (b === 0x0C && i + 1 < bank2.length && bank2[i + 1] === 0x0C) {
        // 连续0x0C → 可能表示标题区域
        i += 2;
        continue;
      }
      
      // 尝试将字节直接作为tile索引
      if (b > 0 && b < 0x80) {
        nt[ntPos++] = b;
      } else if (b >= 0x80 && b < 0xF0) {
        // 高位tile
        nt[ntPos++] = b;
      }
      i++;
    }
    
    // 如果解码的tile不够，使用fallback
    if (ntPos < 100) {
      this._drawFallbackTitle(nt);
    }
  }

  /** Fallback标题画面 */
  private _drawFallbackTitle(nt: Uint8Array): void {
    // 使用Bank 0/2的CHR tile绘制一个简单但可辨识的标题
    // Captain Tsubasa 标题字符通常在CHR的前几个tile
    
    // 顶部装饰
    for (let c = 0; c < 32; c++) {
      nt[0 * 32 + c] = 0x01;
    }
    
    // 主标题区域 (使用大字体tile)
    // 在Bank 0 CHR中，tile 0x10-0x3F通常包含字体
    const titleOffset = 4;
    const titleRows = [
      [0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29], // Row 1
      [0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39], // Row 2
      [0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49], // Row 3  
    ];
    
    for (let r = 0; r < titleRows.length; r++) {
      const row = 7 + r;
      for (let c = 0; c < titleRows[r].length; c++) {
        const col = titleOffset + c;
        if (col < 32) {
          nt[row * 32 + col] = titleRows[r][c];
        }
      }
    }
    
    // "PRESS START" 文字 (底部)
    const pressStartRow = 22;
    const pressStartTiles = [0x10, 0x11, 0x12, 0x13, 0x14, 0x10, 0x15, 0x16, 0x17, 0x18];
    for (let c = 0; c < pressStartTiles.length; c++) {
      nt[pressStartRow * 32 + 8 + c] = pressStartTiles[c];
    }
    
    // 底部装饰
    for (let c = 0; c < 32; c++) {
      nt[29 * 32 + c] = 0x02;
    }
    
    // 版权文字
    const copyrightTiles = [0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58];
    for (let c = 0; c < copyrightTiles.length; c++) {
      nt[26 * 32 + 9 + c] = copyrightTiles[c];
    }
  }

  /** 填充属性表 */
  private _fillAttributeTable(nt: Uint8Array): void {
    // 属性表从960开始
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const attrIdx = 960 + r * 8 + c;
        if (attrIdx < 1024) {
          // 根据区域设置不同调色板
          if (r >= 3 && r <= 5) {
            nt[attrIdx] = 0x00; // 标题区域用调色板0
          } else if (r >= 7) {
            nt[attrIdx] = 0x55; // 底部用调色板1
          } else {
            nt[attrIdx] = 0x00; // 背景
          }
        }
      }
    }
  }
}
