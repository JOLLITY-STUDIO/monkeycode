/**
 * 天使之翼1 — 开场动画引擎
 * 
 * 对应原始: Bank 1 ($8000-$BFFF), 开场动画调度器 + 故事板引擎
 * 
 * 流程 (对应原始 $804B-$8105):
 *   Sub 0-4: 分镜0-4 → RLE解码 + CHR Bank切换 + 文字逐tile打印
 *   Sub 5:   CHR Bank 0E+0F (立绘)
 *   Sub 6:   CHR Bank 00+0D (收尾)
 *   Sub 7:   退出 → transitionTo(State 1: Title)
 * 
 * CHR Bank 配置表:
 *   分镜0: CHR 04+06 | 分镜1: CHR 08+06 | 分镜2: CHR 0A+06
 *   分镜3: CHR 0C+06 | 分镜4: CHR 0C+19 | 立绘: CHR 0E+0F | 收尾: CHR 00+0D
 */
import { DataStore } from '../../data/DataStore';
import { BankModule } from '../../core/BankDispatcher';
import { StateMachine } from '../../core/StateMachine';
import { GameState } from '../../core/types';
import { RleDecoder } from './RleDecoder';
import { getRomReader } from '../../data/RomReader';

/** 分镜CHR配置 */
const SCENE_CHR_CONFIG: [number, number][] = [
  [0x04, 0x06],  // 分镜0
  [0x08, 0x06],  // 分镜1
  [0x0A, 0x06],  // 分镜2
  [0x0C, 0x06],  // 分镜3
  [0x0C, 0x19],  // 分镜4
];

/** 
 * RLE数据在Bank 1中的偏移
 * Bank 1 offset 0x1058: 8-entry pointer table (16 bytes)
 *   Pointers: 0x614D, 0x3B00, 0x0053, 0xD068, 0xD07F, 0xD093, 0xD0A5, 0xD0CE
 * Main RLE nametable data starts at offset 0x1068
 */
const RLE_POINTER_TABLE_OFFSET = 0x1058;
const RLE_DATA_OFFSET = 0x1068;

/** 开场动画子状态 */
enum OpeningSubState {
  SHOWING_SCENE = 0,  // 正在展示分镜
  TRANSITION = 1,     // 过渡动画
}

export class OpeningScene implements BankModule {
  readonly bankId: number = 1;
  
  private ds: DataStore;
  private sm: StateMachine;
  
  /** 当前分镜索引 (0-6, 对应原始 ram_007A) */
  private _sceneIndex: number = 0;
  
  /** 分镜内子状态 */
  private _subState: OpeningSubState = OpeningSubState.SHOWING_SCENE;
  
  /** 帧计时器 */
  private _frameTimer: number = 0;
  
  /** 文字打印进度 */
  private _textProgress: number = 0;
  
  /** 分镜展示帧数 */
  private readonly SCENE_DURATION: number = 300; // 5秒
  
  /** 过渡帧数 */
  private readonly TRANSITION_DURATION: number = 30; // 0.5秒
  
  /** RLE数据缓存 */
  private _rleCache: Map<number, number[]> = new Map();

  constructor(ds: DataStore, sm: StateMachine) {
    this.ds = ds;
    this.sm = sm;
  }

  init(): void {
    console.log('[OpeningScene] 开场动画初始化');
    this._sceneIndex = 0;
    this._subState = OpeningSubState.SHOWING_SCENE;
    this._frameTimer = 0;
    this._textProgress = 0;
    this._rleCache.clear();
    
    // 加载默认调色板
    this._loadDefaultPalette();
    
    // 加载第一个分镜
    this._loadScene(0);
  }

  callSub(subId: number): void {
    this._frameTimer++;
    
    switch (this._subState) {
      case OpeningSubState.SHOWING_SCENE:
        this._updateScene();
        break;
      case OpeningSubState.TRANSITION:
        this._updateTransition();
        break;
    }
  }

  // ==================== 分镜展示 ====================

  private _updateScene(): void {
    // 文字逐tile打印效果
    this._printTextTiles();
    
    // 检查是否需要推进
    if (this._frameTimer >= this.SCENE_DURATION) {
      this._advanceScene();
    }
  }

  /** 加载指定分镜 */
  private _loadScene(index: number): void {
    if (index < SCENE_CHR_CONFIG.length) {
      const [chr0, chr1] = SCENE_CHR_CONFIG[index];
      this._setChrBanks(chr0, chr1);
      
      // 加载RLE nametable数据 (所有分镜共享同一RLE数据)
      this._loadRleNametable(0);
    } else if (index === 5) {
      // 立绘
      this._setChrBanks(0x0E, 0x0F);
      this._clearNametable();
      this._drawPortrait();
    } else if (index === 6) {
      // 收尾
      this._setChrBanks(0x00, 0x0D);
      this._clearNametable();
      this._drawEnding();
    }
    
    this._frameTimer = 0;
    this._textProgress = 0;
  }

  /** 推进到下一个分镜 */
  private _advanceScene(): void {
    this._sceneIndex++;
    
    if (this._sceneIndex <= 6) {
      // 还有更多分镜
      this._subState = OpeningSubState.TRANSITION;
      this._frameTimer = 0;
    } else {
      // 开场结束 → 标题画面
      this._exitToTitle();
    }
  }

  // ==================== 过渡动画 ====================

  private _updateTransition(): void {
    // 简单的淡出/淡入模拟 (通过调色板或滚动)
    // 对应原始: $C3CE 过渡辅助函数
    
    if (this._frameTimer >= this.TRANSITION_DURATION) {
      this._subState = OpeningSubState.SHOWING_SCENE;
      this._loadScene(this._sceneIndex);
    }
  }

  // ==================== RLE Nametable 加载 ====================

  private _loadRleNametable(pageIndex: number): void {
    if (this._rleCache.has(pageIndex)) {
      const tiles = this._rleCache.get(pageIndex)!;
      RleDecoder.writeToNametable(tiles, this.ds.nametable0);
      return;
    }

    // 从Bank 1读取RLE数据
    const romReader = getRomReader();
    const bank1 = romReader.getBankData(1);
    
    if (!bank1) {
      console.warn('[OpeningScene] Bank 1 未加载，使用空白nametable');
      this.ds.nametable0.fill(0);
      return;
    }
    
    // RLE数据从offset 0x1068开始 (跳过16字节指针表)
    const tiles = RleDecoder.decode(bank1, RLE_DATA_OFFSET, 960);
    this._rleCache.set(pageIndex, tiles);
    RleDecoder.writeToNametable(tiles, this.ds.nametable0);
    
    console.log(`[OpeningScene] RLE Page ${pageIndex}: ${tiles.length} tiles decoded`);
  }

  // ==================== CHR Bank 切换 ====================

  /** 加载默认NES调色板 */
  private _loadDefaultPalette(): void {
    const bgPalette = [
      0x0F, 0x00, 0x10, 0x30,  // BG0: 黑/灰/浅灰/白
      0x0F, 0x06, 0x16, 0x26,  // BG1: 黑/红/品红/粉
      0x0F, 0x09, 0x19, 0x29,  // BG2: 黑/绿/黄绿/亮绿
      0x0F, 0x0A, 0x1A, 0x2A,  // BG3: 黑/蓝绿/蓝/淡蓝
    ];
    const sprPalette = [
      0x0F, 0x05, 0x15, 0x25,  // SPR0: 黑/深红/红/粉
      0x0F, 0x11, 0x21, 0x31,  // SPR1: 黑/蓝/淡蓝/白蓝
      0x0F, 0x18, 0x28, 0x38,  // SPR2: 黑/橙/黄/淡黄
      0x0F, 0x1A, 0x2A, 0x3A,  // SPR3: 黑/淡绿/淡蓝绿/亮绿
    ];
    for (let i = 0; i < 16; i++) {
      this.ds.paletteRam[i] = bgPalette[i];
      this.ds.paletteRam[i + 16] = sprPalette[i];
    }
    console.log('[OpeningScene] 调色板已加载');
  }

  private _setChrBanks(bank0: number, bank1: number): void {
    this.ds.currentChrBank0 = bank0;
    this.ds.currentChrBank1 = bank1;
    this.ds.chrBank0 = bank0;
    this.ds.chrBank1 = bank1;
    console.log(`[OpeningScene] CHR Banks: ${bank0.toString(16)}+${bank1.toString(16)}`);
  }

  // ==================== 文字打印 (逐tile) ====================

  /**
   * 文字逐tile打印效果
   * 对应原始: $8106-$81E5 (PPU队列文字打印)
   * 文本来自 Bank 7 $E306-$F968 (74段tile编码文本)
   */
  private _printTextTiles(): void {
    // TODO: 实现真实Bank 7文本数据的逐tile打印
    // 目前: 跳过，直接展示完整分镜
    
    // 每8帧打印一个tile
    if (this._frameTimer > 200 && this._frameTimer % 8 === 0) {
      this._textProgress++;
      // 在nametable底部写入文字tile
      const textRow = 26;
      const textCol = 2 + this._textProgress;
      if (textCol < 30) {
        const idx = textRow * 32 + textCol;
        this.ds.nametable0[idx] = 0x10; // 示例tile
      }
    }
  }

  // ==================== 立绘/收尾画面 ====================

  private _drawPortrait(): void {
    // 立绘: CHR Bank 0E/0F 包含角色肖像tile
    const nt = this.ds.nametable0;
    nt.fill(0);
    
    // 写入立绘tile (具体tile编号待从Bank 7数据确认)
    for (let r = 2; r < 26; r++) {
      for (let c = 2; c < 30; c++) {
        nt[r * 32 + c] = ((r * 3 + c) & 0x3F) + 0x40;
      }
    }
  }

  private _drawEnding(): void {
    // 收尾画面
    const nt = this.ds.nametable0;
    nt.fill(0);
    
    for (let r = 4; r < 24; r++) {
      for (let c = 4; c < 28; c++) {
        nt[r * 32 + c] = ((r + c * 2) & 0x3F) + 0x20;
      }
    }
  }

  // ==================== Nametable 清理 ====================

  private _clearNametable(): void {
    this.ds.nametable0.fill(0);
  }

  // ==================== 退出 ====================

  private _exitToTitle(): void {
    console.log('[OpeningScene] → 切换到标题画面');
    this._setChrBanks(0, 0);
    this.sm.transitionTo(GameState.TITLE);
  }
}
