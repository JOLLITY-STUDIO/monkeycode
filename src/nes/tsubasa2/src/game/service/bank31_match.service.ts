/**
 * Bank 31 Match Service — 比赛主循环 (Fixed Bank $E000)
 *
 * 逻辑直接翻译自 asm/bank31/entry_E000.s + entry_E6CF.s + entry_E9DA.s。
 * 数据经 DataStore 语义键读写 (替代 NES RAM 地址)，不模拟 MMC3。
 */
import { DataStore } from '../data/prg/DataStore';
import {
  PTR_TABLE_E9DA,
  PTR_TABLE_E9DA_COUNT,
  LAYOUT_DATA_EA1C,
  readPtrLE16,
} from '../data/prg/bank31-data-ptrs';
import {
  SPRITE_PTR_TABLE_F15A,
  SPRITE_PTR_TABLE_F15A_COUNT,
  SPRITE_DATA_F16A,
  SPRITE_NT_TABLE_F15A,
  SPRITE_TILE_TABLE_F16A,
  SPRITE_SUB_PTR_F182,
  SCENE_LAYOUT_PTR_F206,
  NT_LAYOUT_DATA,
} from '../data/prg/bank31-data-sprites';
import {
  DIALOG_PTR_TABLE_F329,
  DIALOG_PTR_TABLE_F329_COUNT,
  DIALOG_STRINGS,
  EXP_TABLE,
  PALETTE_DATA,
  NT_BUFFER_DATA,
  readDialogPtr,
} from '../data/prg/bank31-data-scripts';

// ═══════════════════════════════════════════════════════════════
// RAM 语义键 (替代 NES 内存地址)
// ═══════════════════════════════════════════════════════════════

/** 真实 RAM 键 (4 位大写补零, 与全库 ram_XXXX 约定一致, 防断链) */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

const KEY_043B = 'ram_043B'; // 当前模式/阶段
const KEY_0441 = 'ram_0441'; // 当前球员 ID (0-21)
const KEY_0442 = 'ram_0442'; // 动作目标球员 ID
const KEY_044B = 'ram_044B'; // 比赛控制标志 (bit7=终场)
const KEY_044C = 'ram_044C'; // GK 控球标志
const KEY_044E = 'ram_044E'; // 全局偏移/标志
const KEY_03F1 = 'ram_03F1'; // 玩家 GK 控球标记
const KEY_008E = 'ram_008E'; // 场景/阶段参数
const KEY_0469 = 'ram_0469'; // 动作激活标志
const KEY_0024 = 'ram_0024'; // 场景分发参数 hi
const KEY_0025 = 'ram_0025'; // 场景分发参数 lo

const KEY_05FB = 'ram_05FB'; // 控球方/进攻方向 (0=home, 11=away)
const KEY_05FC = 'ram_05FC'; // 目标球员 ID (交换用)
const KEY_05FD = 'ram_05FD'; // 攻方标志/方向
const KEY_05FE = 'ram_05FE'; // 球区域编码
const KEY_05FF = 'ram_05FF'; // HUD 刷新标志
const KEY_0600 = 'ram_0600'; // 场上活跃球员数
const KEY_0601 = 'ram_0601'; // 球员 ID 数组基址
const KEY_060B = 'ram_060B'; // 活跃球员状态数组基址
const KEY_043C = 'ram_043C'; // 模式参数 2
const KEY_043D = 'ram_043D'; // 模式参数 3
const KEY_043E = 'ram_043E'; // 模式参数 4
const KEY_0613 = 'ram_0613'; // 回合计数
const KEY_0614 = 'ram_0614'; // 动作时钟
const KEY_0615 = 'ram_0615'; // 移动状态标志
const KEY_0616 = 'ram_0616'; // 处理索引
const KEY_0617 = 'ram_0617'; // 球区域缓存
const KEY_0618 = 'ram_0618'; // 移动计数器
const KEY_061A = 'ram_061A'; // 随机数/时限
const KEY_061B = 'ram_061B'; // 阶段标志
const KEY_0621 = 'ram_0621'; // 比赛模式
const KEY_062A = 'ram_062A'; // 区域标志 (bit7=已编码)
const KEY_062B = 'ram_062B'; // 数值 A
const KEY_062C = 'ram_062C'; // 数值 B
const KEY_062D = 'ram_062D'; // 暂停/锁定标志
const KEY_0634 = 'ram_0634'; // 球坐标 X lo (16bit)
const KEY_0635 = 'ram_0635'; // 球坐标 X hi (带符号)
const KEY_0636 = 'ram_0636'; // 球坐标 Y lo (16bit)
const KEY_0637 = 'ram_0637'; // 球坐标 Y hi (带符号)
const KEY_0638 = 'ram_0638'; // 球门距离
const KEY_0639 = 'ram_0639'; // 移动向量 X lo
const KEY_063A = 'ram_063A'; // 移动向量 X hi
const KEY_063B = 'ram_063B'; // 移动向量 Y lo
const KEY_063C = 'ram_063C'; // 移动向量 Y hi
const KEY_0642 = 'ram_0642'; // 移动累积 X
const KEY_0643 = 'ram_0643'; // 移动累积 Y

const KEY_006F = 'ram_006F'; // 除法被除数 lo
const KEY_0070 = 'ram_0070'; // 除法被除数 hi / |dy|
const KEY_0071 = 'ram_0071'; // |dx|
const KEY_0074 = 'ram_0074'; // 除法暂存
const KEY_001C = 'ram_001C'; // 输入状态 1 (主手柄)
const KEY_001E = 'ram_001E'; // 输入状态 2 (方向)
const KEY_0022 = 'ram_0022'; // 场景/调用参数
const KEY_0032 = 'ram_0032'; // 临时 16bit lo
const KEY_0033 = 'ram_0033'; // 临时 16bit hi
const KEY_0034 = 'ram_0034'; // 球员数据指针 lo
const KEY_0035 = 'ram_0035'; // 球员数据指针 hi
const KEY_003A = 'ram_003A'; // 临时 (方向/坐标)
const KEY_003B = 'ram_003B'; // 临时 hi
const KEY_003C = 'ram_003C'; // 布局指针 lo
const KEY_003D = 'ram_003D'; // 布局指针 hi
const KEY_003E = 'ram_003E'; // 布局偏移 lo
const KEY_003F = 'ram_003F'; // 布局偏移 hi
const KEY_0040 = 'ram_0040'; // 行计数
const KEY_0041 = 'ram_0041'; // 临时球员 ID
const KEY_0042 = 'ram_0042'; // 循环计数
const KEY_0043 = 'ram_0043'; // 距离阈值
const KEY_0044 = 'ram_0044'; // 距离判定计数
const KEY_0046 = 'ram_0046'; // 写入索引
const KEY_0047 = 'ram_0047'; // 步长计数
const KEY_0048 = 'ram_0048'; // 结果坐标 lo
const KEY_0049 = 'ram_0049'; // 结果坐标 hi
const KEY_00E2 = 'ram_00E2'; // 随机数 lo
const KEY_0515 = 'ram_0515'; // 动画锁定
const KEY_0516 = 'ram_0516'; // 场景状态
const KEY_0517 = 'ram_0517'; // 滚动方向
const KEY_0532 = 'ram_0532'; // 按键标志
const KEY_0539 = 'ram_0539'; // 状态切换标志
const KEY_05CE = 'ram_05CE'; // 渲染属性 (tile 属性合并)
const KEY_063D = 'ram_063D'; // 精灵模式 (0-3, 由 $F00F 表索引)
const KEY_04A5 = 'ram_04A5'; // PPU 缓冲 (writeSprites 写入区, 3B/行)
const KEY_04A6 = 'ram_04A6'; // PPU 缓冲 (NT 地址 lo/hi, sprite 属性合并)
const KEY_04A7 = 'ram_04A7'; // PPU 缓冲 (NT 属性高位)
const KEY_04A8 = 'ram_04A8'; // PPU 缓冲 (sprite tile ID)
const KEY_04A9 = 'ram_04A9'; // PPU 缓冲 (sprite 计数/控制)
const KEY_0030 = 'ram_0030'; // 指针暂存 lo (readPtr 结果)
const KEY_0031 = 'ram_0031'; // 指针暂存 hi (readPtr 结果)

// 球员数据记录偏移 (指针 $0034 指向 $0300+ID*12 名字区)
const PLAYER_POS_X = 0x06; // 偏移 6 = X 坐标
const PLAYER_POS_Y = 0x08; // 偏移 8 = Y 坐标
const PLAYER_STATE = 0x09; // 偏移 9 = 状态/动作
const PLAYER_FLAG = 0x0A;  // 偏移 10 = 标志

const TEAM_SIZE = 11;
const PLAYER_MAX = 0x16;

// ═══════════════════════════════════════════════════════════════
// 速度表 $E6CF (8 方向 × 2B) — 换边/开球方向随机用
// ═══════════════════════════════════════════════════════════════

export const SPEED_TABLE_E6CF: ReadonlyArray<readonly [number, number]> = [
  [0x4C, 0x54], [0x5C, 0x54], [0x6C, 0x5C], [0x5C, 0x64],
  [0x74, 0x6C], [0x64, 0x74], [0x7C, 0x7C], [0x74, 0x8C],
];

/** $E8ED: 步长表 — $E8A0 移动向量计算 */
export const STEP_TABLE_E8ED: ReadonlyArray<number> = [
  0x00, 0x01, 0x01, 0x01, 0x00, 0x02, 0x02, 0x02,
];

/** $F10E: 精灵属性偏移表 — $F15A 布局读取 */
export const SPR_ATTR_F10E: ReadonlyArray<number> = [
  0x00, 0x01, 0x02, 0x08, 0x09, 0x0A,
];

/** $F00F: 比赛模式 → 精灵模式表 (0,0,1,0; 模式0无活跃时特殊置 2) */
export const SPR_MODE_TABLE_F00F: ReadonlyArray<number> = [
  0x00, 0x00, 0x01, 0x00,
];

// ═══════════════════════════════════════════════════════════════
// 跨 Bank 调用接口 (H5 适配层)
//
// asm 中 bank31 通过 JSR 调用其它 bank 固定区子程:
//   $8000-$8039 (bank0 渲染/场景), $C000 区 (bank30 工具)
// H5 中由外部注入对应实现, bank31 只声明调用契约。
// ═══════════════════════════════════════════════════════════════

export interface Bank31Routines {
  /** $CD7C: 设置球员数据指针 $0034 = 球员数据基址 + A*12 (A=球员ID) */
  playerPtr(A: number): void;
  /** $CD77: 设置当前球员 $0441 数据指针 $0034 */
  currentPlayerPtr(): void;
  /** $CDE2: 距离/区域计算 (X=横坐标, Y=纵坐标 → 返回区域编码) */
  posToZone(X: number, Y: number): number;
  /** $CDC9: 区域编码 → 场地坐标 [X, Y] */
  zoneToPos(A: number): [number, number];
  /** $CE08: 数值 → 图案 tile 写入 (A=数值, X=调色板/属性) */
  drawValueTile(A: number, X: number): void;
  /** $CE2D: 场景/调用分发 (用 $0022/$0024/$0025) */
  sceneDispatch(): void;
  /** $CB0F: 帧同步等待 (A=同步标记, 返回 A) */
  syncFrame(A: number): number;
  /** $CBB0: 音频播放 (A=音效 ID) */
  playSound(A: number): void;
  /** $CD3C: 16bit 除法 (用 $006F-$0074 区域) */
  div16(): void;
  /** $CE4A/$CE4D: 16bit 方向增量计算 (A=角度 → [lo, hi]) */
  dirVector(A: number): [number, number];
  /** $CC02/$CCD2: 场景变量初始化 */
  sceneVarInit(A: number): void;
  /** $CC46: 场景重置 */
  sceneReset(): void;
  /** $CE99: 随机/方向判定 → 返回 A */
  randomDir(): number;
  /** $CAE7: 内存填充 (A/X/Y 参数) */
  memFill(A: number, X: number, Y: number): void;
  /** $CB8B: 画面/缓冲清理 */
  clearScreen(): void;
  /** $D093/$D193: 附加工具 (见 bank30) */
  helper01(A: number): number;
  helper02(A: number): void;
  /** $DE96: 场景跳转 */
  sceneJump(): void;
  /** $8000-$8039: bank0 场景渲染入口 (参数经 $0022 区) */
  b0Render(entry: number): void;
}

// ═══════════════════════════════════════════════════════════════
// Bank31MatchService
// ═══════════════════════════════════════════════════════════════

export class Bank31MatchService {
  private _rt: Bank31Routines;
  /** 当前记录指针 $0034 的 H5 表示: RAM 基址 (球员=0x0300+ID*12, 球区=0x062F) */
  private _ptrBase = 0;

  constructor(private _store: DataStore, routines?: Bank31Routines) {
    // 默认空实现: 未注入时对应调用为 no-op (stub 阶段)
    this._rt = routines ?? {
      playerPtr: () => {},
      currentPlayerPtr: () => {},
      posToZone: () => 0,
      zoneToPos: () => [0, 0],
      drawValueTile: () => {},
      sceneDispatch: () => {},
      syncFrame: (a) => a,
      playSound: () => {},
      div16: () => {},
      dirVector: () => [0, 0],
      sceneVarInit: () => {},
      sceneReset: () => {},
      randomDir: () => 0,
      memFill: () => {},
      clearScreen: () => {},
      helper01: (a) => a,
      helper02: () => {},
      sceneJump: () => {},
      b0Render: () => {},
    };
  }

  // ──────────────────────────────────────────────
  // $E000: 比赛主循环入口 (每帧调用)
  // ──────────────────────────────────────────────

  /**
   * 对应 $E000-$E056: 比赛主循环入口
   * 当前球员 X 坐标 +1 限幅 → 交换控球($0441/$05FC) → 计算距离 → 球逼近目标
   * → 渲染 + 音效 → 进入主循环初始化 $E0DF
   */
  frameMain(): void {
    // $E002-$E015: 当前球员 X 坐标 += 1, 限幅 [$30,$CF]
    this._setPtr(this._playerBase(this._r(KEY_0441)));
    const x = Math.min(0xCF, Math.max(0x30, (this._pf(this._ptrBase, PLAYER_POS_X) + 1) & 0xFF));
    this._pfw(this._ptrBase, PLAYER_POS_X, x);
    // $E017-$E020: 交换 $0441 ↔ $05FC (新控球者)
    const cur = this._r(KEY_0441);
    this._w(KEY_0441, this._r(KEY_05FC));
    this._w(KEY_05FC, cur);
    // $E023: JSR $E059 (距离计算)
    this.calcGoalDist();
    // $E026-$E02D: 阶段标志
    this._w(KEY_061A, 0xFF);
    this._w(KEY_061B, 0x01);
    // $E030: JSR $E73E (球逼近目标区域)
    this.moveBallToward();
    // $E033-$E036: 恢复控球球员
    this._w(KEY_0441, this._r(KEY_05FC));
    // $E039: JSR $E6EC (球坐标 ← 当前球员)
    this.loadBallFromPlayer();
    // $E03D-$E047: 场景分发 ($24=$1A/$25=$1B)
    this._w(KEY_0024, 0x1A);
    this._w(KEY_0025, 0x1B);
    this._rt.sceneDispatch();
    // $E04A-$E04B: 渲染入口 $801E
    this._rt.b0Render(0x801E);
    // $E04E-$E050: 音效 $1B
    this._rt.playSound(0x1B);
    // $E056: JMP $E0DF
    this.initMatchLoop();
  }

  // ──────────────────────────────────────────────
  // $E059: 当前球员→球距离 ($0638)
  // ──────────────────────────────────────────────

  /** 对应 $E059-$E073: 计算当前控球球员到球门距离 */
  calcGoalDist(): void {
    // $E05C: LDA $05FC; CMP #$FF; BEQ RTS
    const fc = this._r(KEY_05FC);
    if (fc === 0xFF) return;
    // $E060: JSR $CD7C (playerPtr)
    this._setPtr(this._playerBase(fc));
    this._rt.playerPtr(fc);
    // $E063-$E06C: LDY #$06 X=(ptr),Y; LDY #$08 Y=(ptr),Y
    const px = this._pf(this._ptrBase, PLAYER_POS_X);
    const py = this._pf(this._ptrBase, PLAYER_POS_Y);
    // $E06D: JSR $CDE2 → A
    this._w(KEY_0638, this._rt.posToZone(px, py));
  }

  /** $E6DF-$E6EB: 球坐标 → 区域编码 ($0635/$0637 → $05FE) */
  calcBallZoneFromCoords(): void {
    // $E6DF: LDX $0635; LDY $0637; JSR $CDE2 → A; STA $05FE; RTS
    this._w(KEY_05FE, this._rt.posToZone(this._r(KEY_0635), this._r(KEY_0637)));
  }

  /** $E6EC-$E708: 加载当前球员位置到球坐标 (当前球员 $0441) */
  loadBallFromPlayer(): void {
    // $E6EC: LDA $0441; PHA (球员 ID 压栈, 供调用方渲染入口取用)
    const pid = this._r(KEY_0441);
    // $E6EF: JSR $CD7C
    this._setPtr(this._playerBase(this._r(KEY_0441)));
    this._rt.playerPtr(this._r(KEY_0441));
    void pid;
    // $E6F4/$E6FC: 球员 X/Y → 球坐标
    const px = this._pf(this._ptrBase, PLAYER_POS_X);
    const py = this._pf(this._ptrBase, PLAYER_POS_Y);
    this._w(KEY_0635, px);
    this._w(KEY_0637, py);
    // $E702: JSR $CDE2 → 球区域
    this._w(KEY_05FE, this._rt.posToZone(px, py));
  }

  /** 对应 $E709-$E73D: 区域编码计算 (球坐标 → 区域, bit7=已变化) */
  calcZone(): void {
    // $E709: LDA $062A; AND #$7F
    this._w(KEY_062A, this._r(KEY_062A) & 0x7F);
    // $E711-$E722: t = ((Y-0x50)&0xE0)>>3; t += t>>2
    const yPart = (this._r(KEY_0637) - 0x50) & 0xFF & 0xE0;
    const t = (yPart >>> 3) + ((yPart >>> 3) >>> 2);
    // $E724-$E731: zone = ((X-0x30)&0xE0)>>5 + t
    const xPart = (this._r(KEY_0635) - 0x30) & 0xFF & 0xE0;
    const zone = (xPart >>> 5) + t;
    // $E733: CMP $062A; BEQ RTS; ORA #$80
    if (zone !== this._r(KEY_062A)) {
      this._w(KEY_062A, zone | 0x80);
    }
  }

  // ──────────────────────────────────────────────
  // $E077: HUD 球员状态刷新 (遍历 0x01-$15)
  // ──────────────────────────────────────────────

  /**
   * 对应 $E077-$E0DE: 刷新 HUD 球员状态
   * $05FF 非 0 时触发; 遍历球员 0-$15 (跳过 0/$0B/当前控球者),
   * 区域变化则渲染 + 显示数值 + 调用 $E854 移动刷新
   */
  refreshHudPlayers(): void {
    // $E077: LDA $05FF; BEQ RTS
    if (this._r(KEY_05FF) === 0) return;
    // $E079-$E07B: $062A = $0F
    this._w(KEY_062A, 0x0F);
    // $E07E: JSR $E709 (区域编码)
    this.calcZone();
    // $E081: idx = 0
    for (let idx = 0; idx < PLAYER_MAX; idx++) {
      // $E084-$E086: JSR $CB0F (#$01) 帧同步
      this._rt.syncFrame(1);
      // $E08B/$E08D/$E091: 跳过 idx==0 / idx==$0B / idx==当前控球
      if (idx === 0 || idx === 0x0B) continue;
      if (idx === this._r(KEY_0441)) continue;
      // $E096: BIT $062A; BPL → 区域未变化, 跳过渲染只显示
      const zoneChanged = (this._r(KEY_062A) & 0x80) !== 0;
      if (zoneChanged) {
        // $E09D-$E0A7: 场景分发 ($24=$1A/$25=$1B)
        this._w(KEY_0024, 0x1A);
        this._w(KEY_0025, 0x1B);
        this._rt.sceneDispatch();
        // $E0AA-$E0AB: 渲染入口 $8000
        this._rt.b0Render(0x8000);
      }
      // $E0AF: $0041 = idx
      this._w(KEY_0041, idx);
      // $E0B1: JSR $CD7C (球员指针)
      this._setPtr(this._playerBase(idx));
      this._rt.playerPtr(idx);
      // $E0B4-$E0C7: 队伍侧调色板 $21/$22
      // C = (idx >= $0B); $05FB==0(玩家控球) → X=$21; 否则翻转 C
      let carry = idx >= 0x0B ? 1 : 0;
      let pal = 0x21;
      if (this._r(KEY_05FB) !== 0) carry = carry ^ 1;
      if (carry === 1) pal = 0x22;
      // $E0C9-$E0CB: JSR $CE08 (数值显示)
      this._rt.drawValueTile(idx, pal);
      // $E0CE: JSR $E854 (单球员移动刷新)
      this._hudPlayerMove(idx);
    }
    // $E0D9-$E0DB: $05FF = 0
    this._w(KEY_05FF, 0);
  }

  /**
   * 对应 $E854-$E89F: HUD 单球员移动刷新
   * flag(偏移$0A)==0 时按 $E7D0 方向反复调用 $E8A0 移动 (字段7/字段5)
   */
  private _hudPlayerMove(idx: number): void {
    // $E854-$E858: flag == 0 才继续
    if (this._pf(this._ptrBase, PLAYER_FLAG) !== 0) return;
    // $E85A-$E85D: 循环次数 = $05FF
    const count = this._r(KEY_05FF);
    // $E85F-$E862: 方向
    const dir = this.calcDistance();
    this._w(KEY_0044, dir);
    for (let i = 0; i < count; i++) {
      // $E864-$E86E: 球员坐标 → 区域
      const px = this._pf(this._ptrBase, PLAYER_POS_X);
      const py = this._pf(this._ptrBase, PLAYER_POS_Y);
      const zone = this._rt.posToZone(px, py);
      // $E871-$E875: zone == state → 结束
      const st = this._pf(this._ptrBase, PLAYER_STATE);
      if (zone === st) break;
      // $E877-$E881: state==$F0 且 zone==球区 → 结束
      if (st === 0xF0 && zone === this._r(KEY_05FE)) break;
      // $E883-$E887: calcMoveVector(dir, 字段7)
      this._setPtr(this._playerBase(idx));
      this.calcMoveVector(dir, 0x07);
      // $E88A-$E891: calcMoveVector(dir+$40, 字段5)
      this.calcMoveVector((dir + 0x40) & 0xFF, 0x05);
    }
    // $E898-$E89C: 清 flag
    this._pfw(this._ptrBase, PLAYER_FLAG, 0x00);
  }

  // ──────────────────────────────────────────────
  // $E0DF: 主循环初始化
  // ──────────────────────────────────────────────

  /**
   * 对应 $E0DF-$E144: 主循环初始化 (队伍名/控球方/区域)
   * 玩家控球时若 GK 标志置位则清 $044C/$03F1; CPU 控球时设目标与随机方向
   */
  initMatchLoop(): void {
    // $E0DF-$E0E6: 队伍字符 0/1
    this._showTeamChar(0x00);
    this._showTeamChar(0x01);
    // $E0E9: JSR $E233 (比赛初始化)
    this.initMatchState();
    // $E0EC-$E0EE: $0614 = $0A
    this._w(KEY_0614, 0x0A);
    // $E0F1-$E0F3: $062A = $FF
    this._w(KEY_062A, 0xFF);
    // $E0F6: JSR $E6EC (球坐标)
    this.loadBallFromPlayer();
    // $E0F9-$E100: Y=$40 X=0; $044E/$0600 = 0
    let side = 0;
    let y = 0x40;
    this._w(KEY_044E, 0x00);
    this._w(KEY_0600, 0x00);
    // $E103-$E10C: $0441 >= $0B → CPU 控球 (X=$0B, Y=0)
    if (this._r(KEY_0441) >= 0x0B) {
      side = 0x0B;
      y = 0x00;
    }
    // $E10E-$E111: $05FB = side; $0517 = y
    this._w(KEY_05FB, side);
    this._w(KEY_0517, y);
    // $E114: TXA; BNE → CPU 控球分支
    if (side === 0) {
      // $E117: BIT $044C; BPL → 跳过
      if ((this._r(KEY_044C) & 0x80) !== 0) {
        // $E11C-$E11F: 清 GK 标志
        this._w(KEY_044C, 0x00);
        this._w(KEY_03F1, 0x00);
      }
    } else {
      // $E125-$E127: 清目标
      this._w(KEY_0442, 0x00);
      // $E12A-$E12D: 随机方向
      this._w(KEY_05FD, this._rt.randomDir());
      // $E130-$E133: 球员指针
      this._setPtr(this._playerBase(this._r(KEY_0441)));
      this._rt.playerPtr(this._r(KEY_0441));
      // $E136-$E13A: state(偏移9) = $05
      this._pfw(this._ptrBase, PLAYER_STATE, 0x05);
      // $E13C-$E13F: $0617 = 球区域
      this._w(KEY_0617, this._r(KEY_05FE));
    }
    // $E142: JSR $E267 (队伍名)
    this.showTeamName();
  }

  // ──────────────────────────────────────────────
  // $E145: 主循环体 (每帧)
  // ──────────────────────────────────────────────

  /**
   * 对应 $E145-$E233: 主循环体
   * 动作时钟 → 输入 HUD 数字 → 球加载 → CPU 区域切换 → 出界/移动/动作
   * → 终场渲染 → 回到循环头
   */
  matchLoop(): void {
    for (;;) {
      // $E145-$E147: 帧同步
      this._rt.syncFrame(1);
      // $E14A: JSR $E349 (输入处理)
      this.handleInput();
      // $E14D-$E155: 动作时钟递减; 非 0 则跳过本轮
      const t = this._r(KEY_0614);
      if (t !== 0) {
        this._w(KEY_0614, (t - 1) & 0xFF);
        continue;
      }
      // $E158-$E15A: 时钟重置 $0A
      this._w(KEY_0614, 0x0A);
      // $E15D: 输入方向 (低 4 位)
      const dir = this._r(KEY_001C) & 0x0F;
      if (dir !== 0) {
        // $E165-$E174: 数值显示 (控球方球员 ID, 调色板 $20/$22)
        const pal = this._r(KEY_05FB) === 0 ? 0x20 : 0x22;
        const pid = this._r(KEY_05FB) === 0 ? this._r(KEY_0441) : this._r(KEY_05FD);
        this._rt.drawValueTile(pid, pal);
        // $E177-$E183: 方向低 2 位 → 字段5; >>2 → 字段7
        this.drawDigit(dir, 0x05);
        this.drawDigit((dir >>> 2) & 0x03, 0x07);
      }
      // $E186: JSR $E6EC (球坐标)
      this.loadBallFromPlayer();
      // $E189: CPU 球员控球时区域切换处理
      if (this._r(KEY_0441) >= 0x0B) {
        const zone = this._r(KEY_05FE);
        // $E190-$E196: 区域未变 → 跳过
        if (zone === this._r(KEY_0617)) continue;
        this._w(KEY_0617, zone);
        // $E19D: $0621 = 0 (比赛模式)
        this._w(KEY_0621, 0x00);
        // $E1A0-$E1AF: 场景分发 ($24=$1C/$25=$1D) + 渲染 $8006
        this._w(KEY_0024, 0x1C);
        this._w(KEY_0025, 0x1D);
        this._rt.sceneDispatch();
        this._rt.b0Render(0x8006);
        // $E1B2-$E1B7: 模式 2 → 跳过重置
        if (this._r(KEY_043B) === 0x02) continue;
        // $E1B9-$E1C8: 场景分发 ($24=$1A/$25=$1B) + 渲染 $8021
        this._w(KEY_0024, 0x1A);
        this._w(KEY_0025, 0x1B);
        this._rt.sceneDispatch();
        this._rt.b0Render(0x8021);
        // $E1CB: JSR $CC46 (场景重置)
        this._rt.sceneReset();
        // $E1CE-$E1D3: 解锁
        this._w(KEY_062D, 0x00);
        this._w(KEY_0615, 0x00);
        // $E1D6-$E1DE: 场景分发
        this._w(KEY_0024, 0x1A);
        this._w(KEY_0025, 0x1B);
        this._rt.sceneDispatch();
        // $E1E4: JMP $8027 (切走)
        this._rt.b0Render(0x8027);
        continue;
      }
      // $E1E7-$E1EE: $05FF=0; JSR $D193 (附加工具)
      this._w(KEY_05FF, 0x00);
      this._rt.helper02(0x01);
      // $E1F1: JSR $E27D (出界检查)
      this.checkBounds();
      // $E1F4: 回合计数
      this._w(KEY_0613, (this._r(KEY_0613) + 1) & 0xFF);
      // $E1F7: JSR $E2BC (球员移动)
      this.movePlayers();
      // $E1FA: JSR $E407 (动作分发)
      this.dispatchActions();
      // $E1FD-$E20A: 终场 + 玩家队 + 球在右侧 → 渲染 $8039
      if ((this._r(KEY_044B) & 0x80) !== 0 && this._r(KEY_05FB) === 0 && (this._r(KEY_0635) & 0x80) !== 0) {
        this._w(KEY_0024, 0x1A);
        this._w(KEY_0025, 0x1B);
        this._rt.sceneDispatch();
        this._rt.b0Render(0x8039);
      }
      // $E21E-$E22D: 场景分发 + 渲染 $8033
      this._w(KEY_0024, 0x1A);
      this._w(KEY_0025, 0x1B);
      this._rt.sceneDispatch();
      this._rt.b0Render(0x8033);
    }
  }

  // ──────────────────────────────────────────────
  // $E233: 比赛初始化子程
  // ──────────────────────────────────────────────

  /** 对应 $E233-$E266: 比赛初始化 (音效/渲染/锁定/参数) */
  initMatchState(): void {
    // $E233-$E235: 音效 $1E
    this._rt.playSound(0x1E);
    // $E238-$E247: 场景分发 ($24=$1C/$25=$1D) + 渲染 $8024
    this._w(KEY_0024, 0x1C);
    this._w(KEY_0025, 0x1D);
    this._rt.sceneDispatch();
    this._rt.b0Render(0x8024);
    // $E24A: JSR $E267 (队伍名)
    this.showTeamName();
    // $E24D-$E252: $0615/$062D = $80 (锁定)
    this._w(KEY_0615, 0x80);
    this._w(KEY_062D, 0x80);
    // $E255-$E25A: $0642/$0643 = 0
    this._w(KEY_0642, 0x00);
    this._w(KEY_0643, 0x00);
    // $E25D-$E263: $008E = 2; $0469 = 1
    this._w(KEY_008E, 0x02);
    this._w(KEY_0469, 0x01);
  }

  // ──────────────────────────────────────────────
  // $E267: 显示队伍名
  // ──────────────────────────────────────────────

  /**
   * 对应 $E267-$E27C: 显示队伍名
   * 玩家控球($05FB==0)显示字符 $30, CPU 控球显示 $31/$32
   */
  showTeamName(): void {
    if (this._r(KEY_05FB) === 0) {
      // $E277-$E279
      this._showTeamChar(0x30);
      return;
    }
    // $E26C-$E273
    this._showTeamChar(0x31);
    this._showTeamChar(0x32);
  }

  /**
   * 对应 $EF7F-$EFA0: 带参渲染辅助
   * 设置场景 ($24=$18/$25=$19) → 分发 + 渲染 $800C → 恢复 → 分发
   */
  private _showTeamChar(param: number): void {
    // $EF8A-$EF90: 场景参数
    this._w(KEY_0024, 0x18);
    this._w(KEY_0025, 0x19);
    this._rt.sceneDispatch();
    // $EF95-$EF96: 渲染 $800C
    this._rt.b0Render(0x800C);
    // $EF9F: 再分发
    this._rt.sceneDispatch();
    // (A 参数经 Y 栈传递给 $800C, 渲染侧按需取用)
    void param;
  }

  // ──────────────────────────────────────────────
  // $E27D: 出界/禁区检查
  // ──────────────────────────────────────────────

  /**
   * 对应 $E27D-$E2BA: 出界/禁区检查
   * 当前球员 flag==0 时检查球坐标 (CPU 进攻取反 X);
   * 球在 X>=$C4 且 Y∈[$74,$8C) → 出界: 解锁 + 场景分发 + 切走 $8009
   */
  checkBounds(): void {
    // $E27D: JSR $CD77 (当前球员指针)
    this._rt.currentPlayerPtr();
    this._setPtr(this._playerBase(this._r(KEY_0441)));
    // $E280-$E284: flag != 0 → RTS
    if (this._pf(this._ptrBase, PLAYER_FLAG) !== 0) return;
    // $E286-$E289: 球坐标
    let bx = this._r(KEY_0635);
    const by = this._r(KEY_0637);
    // $E28C-$E295: CPU 进攻 → X 取反
    if (this._r(KEY_05FB) !== 0) {
      bx = (~bx) & 0xFF;
      bx = (bx + 1) & 0xFF;
    }
    // $E296-$E2A0: X >= $C4 且 Y >= $74 且 Y < $8C 才处理
    if (bx < 0xC4) return;
    if (by < 0x74) return;
    if (by >= 0x8C) return;
    // $E2A3-$E2A8: 解锁
    this._w(KEY_062D, 0x00);
    this._w(KEY_0615, 0x00);
    // $E2AB-$E2B3: 场景分发 ($24=$1A/$25=$1B)
    this._w(KEY_0024, 0x1A);
    this._w(KEY_0025, 0x1B);
    this._rt.sceneDispatch();
    // $E2B9: JMP $8009
    this._rt.b0Render(0x8009);
  }

  // ──────────────────────────────────────────────
  // $E2BC: 球员移动/球跟随
  // ──────────────────────────────────────────────

  /**
   * 对应 $E2BC-$E348: 球员移动 (每轮体力累积/消耗)
   * 全场球员 16bit 字段1/2 累积基础值 (字段0==$20 用 1, 否则 2, 上限 $0032/$0033);
   * 当前玩家球员字段1/2 消耗 3/5
   */
  movePlayers(): void {
    // $E2BC-$E2C8: 计数 +1, >=1 则重置
    const c = (this._r(KEY_0618) + 1) & 0xFF;
    this._w(KEY_0618, c);
    if (c < 1) {
      this._playerStamina();
      return;
    }
    this._w(KEY_0618, 0x00);
    // $E2CB-$E313: 遍历球员 0..$0A (跳过当前控球)
    for (let idx = 0; idx < 0x0B; idx++) {
      if (idx === this._r(KEY_0441)) continue;
      // $E2D1: 显示球员编号
      this._rt.drawValueTile(idx, 0x00);
      this._setPtr(this._playerBase(idx));
      // $E2D6-$E2EC: 基础值 (字段0==$20 → 1, 否则 2)
      let base = 0x02;
      if (this._pf(this._ptrBase, 0x00) === 0x20) {
        base = 0x01;
        // $E2E4-$E2E9: 字段1|字段2 == 0 → 跳过
        if ((this._pf(this._ptrBase, 0x01) | this._pf(this._ptrBase, 0x02)) === 0) continue;
      }
      // $E2EC-$E2F6: 字段1/2 16bit += base
      let lo = (this._pf(this._ptrBase, 0x01) + base) & 0xFF;
      let hi = (this._pf(this._ptrBase, 0x02) + ((lo < base) ? 1 : 0)) & 0xFF;
      // $E2F7-$E303: 限幅至 $0032/$0033 (BCC → 保留原值)
      if (hi > this._r(KEY_0033) || (hi === this._r(KEY_0033) && lo > this._r(KEY_0032))) {
        lo = this._r(KEY_0032);
        hi = this._r(KEY_0033);
      }
      // $E304-$E30B: 写回字段1/2
      this._pfw(this._ptrBase, 0x01, lo);
      this._pfw(this._ptrBase, 0x02, hi);
    }
    this._playerStamina();
  }

  /** 对应 $E315-$E348: 当前玩家球员体力消耗 */
  private _playerStamina(): void {
    // $E315-$E31A: CPU 控球 → RTS
    if (this._r(KEY_0441) >= 0x0B) return;
    // $E31C: JSR $CD7C
    this._setPtr(this._playerBase(this._r(KEY_0441)));
    this._rt.playerPtr(this._r(KEY_0441));
    // $E31F-$E32B: 字段0==$20 → 消耗 5, 否则 3
    const cost = this._pf(this._ptrBase, 0x00) === 0x20 ? 0x05 : 0x03;
    // $E32F-$E343: 字段1/2 -= cost (下溢 → 全 0)
    const f1 = this._pf(this._ptrBase, 0x01);
    let dLo = (f1 - cost) & 0xFF;
    let dHi = this._pf(this._ptrBase, 0x02);
    if (f1 < cost) {
      dHi = (dHi - 1) & 0xFF;
      if (dHi >= 0x80) {
        dLo = 0;
        dHi = 0;
      }
    }
    this._pfw(this._ptrBase, 0x01, dLo);
    this._pfw(this._ptrBase, 0x02, dHi);
    // $E345: JSR $E267
    this.showTeamName();
  }

  // ──────────────────────────────────────────────
  // $E349: 输入处理
  // ──────────────────────────────────────────────

  /**
   * 对应 $E349-$E406: 输入处理
   * 玩家控球: A 键射门 / 方向 → 滚动方向 $0517; 清活跃球员
   * CPU 控球: 方向 → $05FD 限幅 [1,$0A]
   * 共用段: 显示当前球员, $0032/$0033 >>2 按 $0517 取反, 累加到 $0642/$0643
   */
  handleInput(): void {
    // $E349-$E34B: $0532 = 0
    this._w(KEY_0532, 0x00);
    if (this._r(KEY_05FB) === 0) {
      // ── 玩家控球 ──
      // $E353-$E358: $0615 |= $40
      this._w(KEY_0615, this._r(KEY_0615) | 0x40);
      if ((this._r(KEY_001C) & 0x40) !== 0) {
        // $E382-$E387: A 键 → 清活跃球员 + 解锁
        this._w(KEY_0600, 0x00);
        this._w(KEY_0615, 0x00);
        // $E38A-$E38C: 音效 $44
        this._rt.playSound(0x44);
        // $E38F: JSR $CB8B (清屏)
        this._rt.clearScreen();
        // $E392-$E3A0: 场景分发 + 渲染 $8003 (切走)
        this._w(KEY_0024, 0x1A);
        this._w(KEY_0025, 0x1B);
        this._rt.sceneDispatch();
        this._rt.b0Render(0x8003);
        return;
      }
      if ((this._r(KEY_001C) & 0x0F) !== 0) {
        // $E369-$E37C: 方向按下 → $0517 = $40/$00, 解锁
        this._w(KEY_0532, (this._r(KEY_0532) + 1) & 0xFF);
        this._w(KEY_0517, (this._r(KEY_001C) & 0x02) !== 0 ? 0x40 : 0x00);
        this._w(KEY_0615, this._r(KEY_0615) & 0xBF);
      }
    } else {
      // ── CPU 控球 ──
      // $E3A3-$E3A8: $0532++ ; 方向 = $001E & $C0
      this._w(KEY_0532, (this._r(KEY_0532) + 1) & 0xFF);
      const d = this._r(KEY_001E) & 0xC0;
      if (d !== 0) {
        // $E3AD-$E3C3: $05FD += ±1 (bit7=1 → +1, 否则 -1), 限幅 [1,$0A]
        let v = (this._r(KEY_05FD) + (d & 0x80 ? 0x01 : -1)) & 0xFF;
        if (v === 0) v = 0x0A;
        if (v >= 0x0B) v = 0x01;
        this._w(KEY_05FD, v);
        // $E3C6: JSR $E267
        this.showTeamName();
      } else {
        // $E3AB: BEQ $E3C9 → RTS
        return;
      }
    }
    // ── 共用段 $E3CA-$E406 ──
    // 玩家控球但无方向 → 直接返回
    if (this._r(KEY_05FB) === 0 && (this._r(KEY_001C) & 0x0F) === 0) return;
    // $E3D6-$E3DB: 显示当前球员 ($0441, 调色板 $20)
    this._rt.drawValueTile(this._r(KEY_0441), 0x20);
    // $E3DE-$E3E4: $0032/$0033 16bit >>2
    let lo = this._r(KEY_0032);
    let hi = this._r(KEY_0033);
    const shift16 = (l: number, h: number): [number, number] => {
      let lo2 = l;
      let hi2 = h;
      for (let i = 0; i < 2; i++) {
        const carry = hi2 & 1;
        hi2 = hi2 >>> 1;
        lo2 = (lo2 >>> 1) | (carry << 7);
      }
      return [lo2, hi2];
    };
    [lo, hi] = shift16(lo, hi);
    // $E3EA-$E3F6: $0517 bit6=0 → 16bit 取反
    if ((this._r(KEY_0517) & 0x40) === 0) {
      lo = (~lo) & 0xFF;
      hi = (~hi) & 0xFF;
    }
    // $E3F7-$E403: $0642 += lo; $0643 += hi (带进位)
    const sum = this._r(KEY_0642) + lo;
    this._w(KEY_0642, sum & 0xFF);
    this._w(KEY_0643, (this._r(KEY_0643) + hi + ((sum >> 8) & 1)) & 0xFF);
  }

  // ──────────────────────────────────────────────
  // $E407: 动作分发
  // ──────────────────────────────────────────────

  /**
   * 对应 $E407-$E4D4: 动作分发
   * 遍历球员 0..$15: 渲染区域 + 显示 + flag 递减/移动刷新;
   * 回合数 >= 5 时搜索附近球员; 有活跃球员 → 解锁 + 清屏 + 渲染 $8003
   */
  dispatchActions(): void {
    // $E407: JSR $E709 (区域编码)
    this.calcZone();
    // $E40A-$E497: 遍历球员 0..$15
    for (let idx = 0; idx < PLAYER_MAX; idx++) {
      // $E40D-$E412: 帧同步 + 输入处理
      this._rt.syncFrame(1);
      this.handleInput();
      // $E417/$E419: 跳过 idx==0 / idx==$0B
      if (idx === 0 || idx === 0x0B) continue;
      // $E41D-$E425: CPU 攻方方向 ($05FD) 跳过
      if (this._r(KEY_05FB) !== 0 && idx === this._r(KEY_05FD)) continue;
      // $E427-$E42E: 玩家控球球员跳过
      if (idx === this._r(KEY_0441) && idx < 0x0B) continue;
      // $E430-$E438: 区域变化且非控球 → 渲染 $8000
      if ((this._r(KEY_062A) & 0x80) !== 0 && idx !== this._r(KEY_0441)) {
        this._w(KEY_0024, 0x1A);
        this._w(KEY_0025, 0x1B);
        this._rt.sceneDispatch();
        this._rt.b0Render(0x8000);
      }
      // $E44E-$E450: $0041 = idx; 球员指针
      this._w(KEY_0041, idx);
      this._setPtr(this._playerBase(idx));
      this._rt.playerPtr(idx);
      // $E453-$E466: 队伍侧调色板 $21/$22
      let carry = idx >= 0x0B ? 1 : 0;
      if (this._r(KEY_05FB) !== 0) carry = carry ^ 1;
      let pal = carry === 0 ? 0x21 : 0x22;
      // $E468-$E470: 状态 $F0 → 调色板 $1F
      if (this._pf(this._ptrBase, PLAYER_STATE) === 0xF0) pal = 0x1F;
      // $E472-$E479: 控球球员 → 调色板 $20
      if (idx === this._r(KEY_0441)) pal = 0x20;
      // $E47B: JSR $CE08 (数值显示)
      this._rt.drawValueTile(idx, pal);
      // $E47E-$E489: flag != 0 → flag--
      if (this._pf(this._ptrBase, PLAYER_FLAG) !== 0) {
        this._pfw(this._ptrBase, PLAYER_FLAG, (this._pf(this._ptrBase, PLAYER_FLAG) - 1) & 0xFF);
        continue;
      }
      // $E48C: JSR $E854 (移动刷新)
      this._hudPlayerMove(idx);
    }
    // $E49A-$E49C: $0600 = 0
    this._w(KEY_0600, 0x00);
    // $E49F-$E4A8: 回合数 >= 5 → 重置 + 搜索附近球员
    if (this._r(KEY_0613) >= 0x05) {
      this._w(KEY_0613, 0x00);
      this.findNearPlayers(0x07);
    }
    // $E4B0-$E4B5: 无活跃球员 → 返回
    if (this._r(KEY_0600) === 0) return;
    // $E4B6-$E4B8: 解锁
    this._w(KEY_062D, 0x00);
    this._w(KEY_0615, 0x00);
    // $E4BE: JSR $CB8B (清屏)
    this._rt.clearScreen();
    // $E4C1-$E4C3: 音效 $2E
    this._rt.playSound(0x2E);
    // $E4C6-$E4D4: 场景分发 + 渲染 $8003
    this._w(KEY_0024, 0x1A);
    this._w(KEY_0025, 0x1B);
    this._rt.sceneDispatch();
    this._rt.b0Render(0x8003);
  }

  // ──────────────────────────────────────────────
  // $E4D7: 附近球员搜索 + $E501 距离判定
  // ──────────────────────────────────────────────

  /**
   * 对应 $E4D7-$E54B: 附近球员搜索
   * 搜索对方球队球员 (起始 $05FB^$0B+1, 共 10 人), flag==0 且
   * |X-球X|/|Y-球Y| 均小于阈值 → 加入活跃列表 $0601 (上限 5/4)
   * @param threshold A 值 → $0043 距离阈值
   */
  findNearPlayers(threshold: number): void {
    // $E4D7: STA $0043
    this._w(KEY_0043, threshold);
    // $E4D9-$E4DB: $0600 = 0
    this._w(KEY_0600, 0x00);
    // $E4DE-$E4E6: 起始球员 = ($05FB ^ $0B) + 1, 共 10 人
    let pid = ((this._r(KEY_05FB) ^ 0x0B) + 1) & 0xFF;
    for (let n = 0; n < 0x0A; n++) {
      // $E4EC: JSR $CD7C
      this._setPtr(this._playerBase(pid));
      this._rt.playerPtr(pid);
      // $E4F1-$E4F5: flag != 0 → next
      if (this._pf(this._ptrBase, PLAYER_FLAG) !== 0) {
        pid = (pid + 1) & 0xFF;
        continue;
      }
      // $E501-$E52D: 距离判定 (计数)
      let count = 0;
      // |X - 球X| < 阈值
      let dx = (this._pf(this._ptrBase, PLAYER_POS_X) - this._r(KEY_0635)) & 0xFF;
      if (dx >= 0x80) dx = ((~dx) + 1) & 0xFF;
      if (dx < this._r(KEY_0043)) count++;
      // |Y - 球Y| < 阈值
      let dy = (this._pf(this._ptrBase, PLAYER_POS_Y) - this._r(KEY_0637)) & 0xFF;
      if (dy >= 0x80) dy = ((~dy) + 1) & 0xFF;
      if (dy < this._r(KEY_0043)) count++;
      // $E52D-$E531: 两方向都近才加入
      if (count === 2) {
        const active = this._r(KEY_0600);
        // $E533-$E538: 活跃数上限 5
        if (active < 0x05) {
          // $E53A-$E541: CPU 队上限 4
          if (this._r(KEY_05FB) === 0 || active < 0x04) {
            // $E543-$E548: 记录球员 ID
            this._store.write(ramKey(0x0601 + active), pid);
            this._w(KEY_0600, (active + 1) & 0xFF);
          }
        }
      }
      pid = (pid + 1) & 0xFF;
    }
  }

  // ──────────────────────────────────────────────
  // $E54D: 进攻处理/换人
  // ──────────────────────────────────────────────

  /**
   * 对应 $E54D-$E593: 进攻处理 (活跃球员压缩)
   * 只保留状态==$05 且 ID 非 0/$0B 的活跃球员; 有有效球员 → 音效+渲染 $8003;
   * 否则回到主循环初始化 $E0DF
   */
  handleAttack(): void {
    // $E54D-$E54E: $044E = 0
    this._w(KEY_044E, 0x00);
    // $E551-$E554: 无活跃球员 → $E0DF
    const n = this._r(KEY_0600);
    if (n === 0) {
      this.initMatchLoop();
      return;
    }
    // $E556-$E572: 压缩活跃球员 (dst 重写)
    let dst = 0;
    for (let src = 0; src < n; src++) {
      // $E55A: 状态 == $05 才处理
      if (this._r(ramKey(0x060B + src)) !== 0x05) continue;
      const pid = this._r(ramKey(0x0601 + src));
      // $E561-$E568: 跳过 0/$0B
      if (pid === 0x00 || pid === 0x0B) continue;
      // $E56A: 压缩写入
      this._store.write(ramKey(0x0601 + dst), pid);
      dst++;
    }
    // $E574-$E575: 无有效 → $E0DF
    if (dst === 0) {
      this.initMatchLoop();
      return;
    }
    // $E577: 新计数
    this._w(KEY_0600, dst);
    // $E57A-$E57C: 音效 $2E
    this._rt.playSound(0x2E);
    // $E57F-$E58D: 场景分发 + 渲染 $8003
    this._w(KEY_0024, 0x1A);
    this._w(KEY_0025, 0x1B);
    this._rt.sceneDispatch();
    this._rt.b0Render(0x8003);
  }

  // ──────────────────────────────────────────────
  // $E596: 球移动执行
  // ──────────────────────────────────────────────

  /** 对应 $E596-$E677: 球移动执行/传球 (体力消耗 + 活跃球员处理) */
  executeBallMove(): void {
    // $E599: 随机 >= $E0 → 跳过体力消耗
    if (this._r(KEY_00E2) < 0xE0) {
      // $E59D: JSR $CD77 (当前球员指针)
      this._rt.currentPlayerPtr();
      // $E5A2: 字段7 += $1A, clamp $7F
      let f7 = (this._pf(this._ptrBase, 0x07) + 0x1A) & 0xFF;
      if (f7 >= 0x80) f7 = 0x7F;
      this._pfw(this._ptrBase, 0x07, f7);
      // $E5B1: 字段6 = $04
      this._pfw(this._ptrBase, 0x06, 0x04);
      // $E5B5: JSR $CBB0 (音效 $42)
      this._rt.playSound(0x42);
    }
    // $E5BA: 场景分发 (A=随机) + 渲染 $800C
    this._rt.sceneDispatch();
    this._rt.b0Render(0x800C);
    // $E5CC: A=$01 → 场景分发 + 渲染 $8024
    this._rt.sceneDispatch();
    this._rt.b0Render(0x8024);
    // $E5E0: 球区域 → $05FE
    this._w(KEY_05FE, this._rt.posToZone(this._r(KEY_0635), this._r(KEY_0637)));
    // $E5EC: 遍历活跃球员 ($0600 计数)
    const n = this._r(KEY_0600);
    if (n !== 0) {
      for (let idx = 0; idx < n; idx++) {
        // $E5F9: $060B,X == $05 → 处理
        if (this._r(ramKey(0x060B + idx)) === 0x05) {
          this._attackHelper(idx);
        }
      }
    }
    // $E60E: A=$04; STA $062B
    this._w(KEY_062B, 0x04);
    // $E613: JMP $DE96
    this._rt.sceneJump();
  }

  /**
   * 对应 $E616-$E677: 传球目标处理 (模式/目标球员/渲染)
   * @param idx 活跃球员数组索引 ($0616)
   */
  private _attackHelper(idx: number): void {
    // $E616-$E627: 模式参数
    this._w(KEY_043B, 0x01);
    this._w(KEY_043C, 0x00);
    this._w(KEY_043D, 0x02);
    this._w(KEY_043E, 0x00);
    // $E62A: LDA $0601,X (目标 ID)
    const pid = this._r(ramKey(0x0601 + idx));
    if (pid === 0x00 || pid === 0x0B) return; // BEQ/BEQ $E677
    // $E633: STA $0442
    this._w(KEY_0442, pid);
    // $E636: 场景分发 (目标) + 渲染 $8015
    this._rt.sceneDispatch();
    this._rt.b0Render(0x8015);
    // $E648: $0032 += 4, clamp $FF
    let t32 = (this._r(KEY_0032) + 0x04) & 0xFF;
    if ((this._r(KEY_0032) + 0x04) > 0xFF) t32 = 0xFF;
    this._w(KEY_0032, t32);
    // $E653: 场景分发 + 渲染 $8012
    this._rt.sceneDispatch();
    this._rt.b0Render(0x8012);
    // $E665: 场景分发 + 渲染 $8015
    this._rt.sceneDispatch();
    this._rt.b0Render(0x8015);
  }

  // ──────────────────────────────────────────────
  // $E678: 换边/开球 (速度表 $E6CF)
  // ──────────────────────────────────────────────

  /** 对应 $E678-$E6CC: 换边/开球 (控球方 0↔11, 随机方向开球) */
  switchSide(): void {
    // $E67B: EOR #$0B (换边)
    this._w(KEY_05FB, this._r(KEY_05FB) ^ 0x0B);
    // $E680: JSR $D093
    this._rt.helper01(this._r(KEY_05FB));
    // $E685: JSR $CB0F (#$02)
    this._rt.syncFrame(2);
    // $E688-$E698: 象限标志 (球坐标符号)
    let dir = 0;
    if ((this._r(KEY_0635) & 0x80) !== 0) dir |= 0x01; // BIT $0635; BPL
    if ((this._r(KEY_0637) & 0x80) !== 0) dir |= 0x02; // BIT $0637; BPL
    this._w(KEY_003A, dir);
    // $E69A: 随机方向 (0-7) → 速度表
    const sp = SPEED_TABLE_E6CF[this._r(KEY_00E2) & 0x07];
    let sx = sp[0]; // $E6CF,X
    let sy = sp[1]; // $E6D0,X
    // $E6A8: LSR $003A; BCC → X 取反 (bit0=0)
    if ((dir & 0x01) === 0) sx = (~sx) & 0xFF;
    // $E6B0: LSR $003A; BCC → Y 取反 (bit1=0)
    if (((dir >>> 1) & 0x01) === 0) sy = (~sy) & 0xFF;
    // $E6B8: STX $0635; STY $0637
    this._w(KEY_0635, sx);
    this._w(KEY_0637, sy);
    // $E6BE: JSR $CDE2 → 区域
    const zone = this._rt.posToZone(sx, sy);
    // $E6C1: STA $0638; STA $05FE
    this._w(KEY_0638, zone);
    this._w(KEY_05FE, zone);
    // $E6C7: LDA #$04; STA $062B
    this._w(KEY_062B, 0x04);
    // $E6CC: JMP $DE96
    this._rt.sceneJump();
  }

  // ──────────────────────────────────────────────
  // $E73E: 球目标移动
  // ──────────────────────────────────────────────

  /** 对应 $E73E-$E7CF: 球目标移动 (按方向增量逼近目标区域, 区域变化才等帧) */
  moveBallToward(): void {
    // $E740: STA $0600; STA $05FF
    this._w(KEY_0600, 0);
    this._w(KEY_05FF, 0);
    // $E746: LDA $05FE; CMP $0638; BNE 继续; 相等 → JMP $E7CF (RTS)
    if (this._r(KEY_05FE) === this._r(KEY_0638)) return;
    // $E751: 指针 = $062F (球坐标/距离记录区)
    this._setPtr(0x062F);
    // $E759: JSR $E7D0 (calcDistance) → 方向
    this._w(KEY_062C, this.calcDistance());
    // $E75F-$E76A: JSR $CE4A → dx 16bit; JSR $CE4D → dy 16bit
    const dv = this._rt.dirVector(this._r(KEY_062C));
    this._w(KEY_0639, dv[0]);
    this._w(KEY_063A, dv[1]);
    const dv2 = this._rt.dirVector(this._r(KEY_062C));
    this._w(KEY_063B, dv2[0]);
    this._w(KEY_063C, dv2[1]);
    // $E773: 移动循环 (帧同步仅在区域渲染后)
    for (;;) {
      // $E778-$E788: 球X 16bit 累加 (lo=$0634, hi=$0635)
      const sx = this._r(KEY_0634) + this._r(KEY_0639);
      this._w(KEY_0634, sx & 0xFF);
      this._w(KEY_0635, (this._r(KEY_0635) + this._r(KEY_063A) + ((sx >> 8) & 1)) & 0xFF);
      // $E78C-$E79C: 球Y 16bit 累加 (lo=$0636, hi=$0637)
      const sy = this._r(KEY_0636) + this._r(KEY_063B);
      this._w(KEY_0636, sy & 0xFF);
      this._w(KEY_0637, (this._r(KEY_0637) + this._r(KEY_063C) + ((sy >> 8) & 1)) & 0xFF);
      // $E7A0: JSR $CDE2 → 当前区域
      const zone = this._rt.posToZone(this._r(KEY_0635), this._r(KEY_0637));
      if (zone === 0xFF) {
        // $E7BA-$E7BD: $05FE = 目标区域
        this._w(KEY_05FE, this._r(KEY_0638));
        break;
      }
      // $E7A7: 未变区域 → 直接回到累加 (BEQ $E778, 不等帧)
      if (zone === this._r(KEY_05FE)) continue;
      // $E7AC: 新区域
      this._w(KEY_05FE, zone);
      // $E7AF: 到达目标 → 收尾 (BEQ $E7C0)
      if (zone === this._r(KEY_0638)) break;
      // $E7B4: JSR $800F (区域渲染); JMP $E773 (帧同步)
      this._rt.b0Render(0x800F);
      this._rt.syncFrame(1);
    }
    // $E7C0: 定位精确坐标
    const [bx, by] = this._rt.zoneToPos(this._r(KEY_05FE));
    this._w(KEY_0635, bx);
    this._w(KEY_0637, by);
    // $E7CC: JSR $800C (渲染收尾)
    this._rt.b0Render(0x800C);
  }

  // ──────────────────────────────────────────────
  // $E7D0: 距离计算/方向
  // ──────────────────────────────────────────────

  /**
   * 对应 $E7D0-$E853: 计算球员到目标(区域)的方向编码
   * 返回 A: 带符号方向值 (由 dx/dy 符号组合, 查表 $FACC 恒匹配首项)
   */
  calcDistance(): number {
    // $E7D0-$E7D9: X=(ptr)+6, Y=(ptr)+8
    const px = this._pf(this._ptrBase, PLAYER_POS_X);
    const py = this._pf(this._ptrBase, PLAYER_POS_Y);
    // $E7DA: JSR $CDE2 → zone
    const zone = this._rt.posToZone(px, py);
    // $E7DD: CMP (ptr),Y (偏移 9 = 目标区域); BEQ RTS
    const st = this._pf(this._ptrBase, PLAYER_STATE);
    if (zone === st) return zone;
    // $E7E6: state==$F0 → 用 $05FE
    const tgt = st === 0xF0 ? this._r(KEY_05FE) : st;
    // $E7EF: JSR $CDC9 → 目标坐标
    const [tx, ty] = this._rt.zoneToPos(tgt);
    // $E7F3-$E7FA: dirFlag = 0
    let dir = 0;
    // $E7FE: dx = X - tgtX; 负 → 取绝对值 + dir++
    let dx = (px - tx) & 0xFF;
    if (dx >= 0x80) {
      dx = ((~dx) + 1) & 0xFF;
      dir++;
    }
    // $E80F: dy = Y - tgtY; 负 → 取绝对值 + dir+=2
    let dy = (py - ty) & 0xFF;
    if (dy >= 0x80) {
      dy = ((~dy) + 1) & 0xFF;
      dir += 2;
    }
    // $E80B/$E81E: STA $0071 / $0070
    this._w(KEY_0071, dx);
    this._w(KEY_0070, dy);
    // $E820: LDA #$00; STA $006F; STA $0074
    this._w(KEY_006F, 0);
    this._w(KEY_0074, 0);
    // $E826: JSR $CD3C (16bit 除法)
    this._rt.div16();
    // $E829-$E843: 查表 $FACD,X vs $0070.
    // 表区前段为 $FF (gap), 首项 0xFFFF 恒 >= |dy| → X 恒 0, dirCode=0
    let dirCode = 0;
    // $E845: LSR $003C (bit0)
    if ((dir & 1) === 0) dirCode = 0x7F;
    // $E84D: LSR $003C (bit1)
    if (((dir >>> 1) & 1) === 0) dirCode = (~dirCode) & 0xFF;
    // $E853: RTS (A = 方向编码)
    return dirCode & 0xFF;
  }

  // ──────────────────────────────────────────────
  // $E8A0: 移动向量计算
  // ──────────────────────────────────────────────

  /**
   * 对应 $E8A0-$E8EC: 移动向量计算 (按步长表取方向增量, 16bit 符号处理)
   * @param distance A 值 (距离/角度, 决定步长)
   * @param field    Y 值 (目标球员记录字段起始)
   */
  calcMoveVector(distance: number, field: number): void {
    // $E8A0: STY $0046
    this._w(KEY_0046, field);
    // $E8A3: A += 0x10; LSR x5 → 步长索引
    const idx = ((distance + 0x10) & 0xFF) >>> 5;
    // $E8AB: LDA $E8ED,X (步长表)
    this._w(KEY_0047, STEP_TABLE_E8ED[idx] ?? 0);
    // $E8B0: LDY $0032; LDX $0033 (16bit 增量)
    let lo = this._r(KEY_0032);
    let hi = this._r(KEY_0033);
    // $E8B4: DEC $0047; BPL 继续 / 负 → 清零
    let s = (STEP_TABLE_E8ED[idx] - 1) & 0xFF;
    if (s >= 0x80) {
      lo = 0;
      hi = 0;
    } else {
      // $E8BE: DEC $0047; BMI → 保留原值
      s = (s - 1) & 0xFF;
      if (s < 0x80) {
        // $E8C2-$E8CD: 16bit 取反 +1 (负方向)
        lo = (~lo) & 0xFF;
        hi = (~hi) & 0xFF;
        lo = (lo + 1) & 0xFF;
        if (lo === 0) hi = (hi + 1) & 0xFF;
      }
    }
    // $E8CE: STY $0048; STX $0049
    this._w(KEY_0048, lo);
    this._w(KEY_0049, hi);
    // $E8D2: LDY #$0A; LDA (ptr),Y → 球员 flag
    const flag = this._pf(this._ptrBase, PLAYER_FLAG);
    // $E8D6: SEC; SBC $05FF; BPL → RTS (flag 未变化)
    const diff = (flag - this._r(KEY_05FF)) & 0xFF;
    if (diff < 0x80) return;
    // $E8DC: EOR #$FF; CLC; ADC #$01 → 绝对值; BEQ → RTS
    const abs = ((~diff) + 1) & 0xFF;
    if (abs === 0) return;
    // $E8E3-$E8E9: LDA $0048; LDX $0049; LDY $0046; JSR $E912
    this._addPos(this._r(KEY_0046), lo, hi);
  }

  // ──────────────────────────────────────────────
  // $E8F5: 数字显示 (方向增量写入)
  // ──────────────────────────────────────────────

  /**
   * 对应 $E8F5-$E93C: 按数值低 2 位决定增量符号, 写入球员字段
   * @param value A 值 (低 2 位: 0=跳过, 1=+, 2/3=取反)
   * @param field Y 值 (目标字段)
   */
  drawDigit(value: number, field: number): void {
    // $E8F5: STY $0047
    this._w(KEY_0047, field);
    // $E8F7: LDY $0032; LDX $0033
    let lo = this._r(KEY_0032);
    let hi = this._r(KEY_0033);
    // $E8FB: AND #$03; BNE 继续; RTS
    const v = value & 0x03;
    if (v === 0) return;
    // $E900: LSR; BCS $E90F (bit0=1 直接写)
    if ((v & 1) === 0) {
      // $E903-$E90D: 16bit 取反 +1
      lo = (~lo) & 0xFF;
      hi = (~hi) & 0xFF;
      lo = (lo + 1) & 0xFF;
      if (lo === 0) hi = (hi + 1) & 0xFF;
    }
    // $E90F: TYA; LDY $0047 → JSR $E912
    this._addPos(field, lo, hi);
  }

  /**
   * 对应 $E912-$E93C: 16bit 坐标加减 + 限幅写入球员记录
   * (hi 字段==6 时范围 [0x30,0xCF], 否则 [0x50,0xAF])
   */
  private _addPos(field: number, lo: number, hi: number): void {
    // $E913: CLC; ADC (ptr),Y → 写 lo
    const sum = this._pf(this._ptrBase, field) + lo;
    const loR = sum & 0xFF;
    // $E919: TXA; ADC (ptr),Y → hi (带进位)
    const hiR = (this._pf(this._ptrBase, field + 1) + hi + ((sum >> 8) & 1)) & 0xFF;
    this._pfw(this._ptrBase, field, loR);
    // $E91B: CPY #$06 (hi 字段判断)
    let result = hiR;
    if (field + 1 === 6) {
      // $E92D: X 坐标范围 [0x30, 0xCF]
      if (hiR < 0x30) result = 0x30;
      else if (hiR >= 0xD0) result = 0xCF;
    } else {
      // $E91F: 普通范围 [0x50, 0xAF]
      if (hiR < 0x50) result = 0x50;
      else if (hiR >= 0xB0) result = 0xAF;
    }
    // $E93A: STA (ptr),Y
    this._pfw(this._ptrBase, field + 1, result);
  }

  // ──────────────────────────────────────────────
  // $E93D: 精灵布局 (NT/属性写入)
  // ──────────────────────────────────────────────

  /**
   * 对应 $E93D-$E9D9: 精灵布局写入 ($04A5 PPU 缓冲)
   * 按指针表 $E9DA 取布局数据, 写 NT 地址头 + 每行 tile 串 (或 $FE 截断零填充)。
   * @param index A 值: 布局指针表索引 (表项 = 布局数据偏移, bit7 置位 → 零填充)
   * @param row   X 值: 行偏移 (写入 $04A5 缓冲的起始行位, 参与 NT 地址偏移)
   */
  writeSprites(index: number, row: number): void {
    // $E940-$E94C: 等待 $0515==0 后置 1 (帧同步)
    this._rt.syncFrame(1);
    if (this._r(KEY_0515) !== 0) return;
    this._w(KEY_0515, 0x01);
    // $E94F-$E95A: $003E=0; $003E:$003F = row>>2 (16bit 右移 2)
    // $E954: LSR; ROR $003E (两次) — $003E = (row bit1)<<7 | (row bit0)<<6
    this._w(KEY_003E, ((row & 0x02) << 6) | ((row & 0x01) << 6));
    this._w(KEY_003F, row >> 2);
    // $E95C-$E95E: A=index; ASL; ROR $003A — $003A bit7 = index bit7
    this._w(KEY_003A, (this._r(KEY_003A) >> 1) | ((index & 0x80) ? 0x80 : 0x00));
    // $E960-$E96A: 取指针表项 → $003C/$003D (布局数据偏移, 以 $EA1C 为基)
    const layout = readPtrLE16(PTR_TABLE_E9DA, index) - 0xEA1C;
    // $E96C-$E97A: 布局[0]=NTaddr lo 偏移, 布局[1]=NTaddr hi 偏移
    let ntLo = (this._r(KEY_003E) + (layout < LAYOUT_DATA_EA1C.length ? LAYOUT_DATA_EA1C[layout] : 0)) & 0xFF;
    let ntHi = (this._r(KEY_003F) + (layout + 1 < LAYOUT_DATA_EA1C.length ? LAYOUT_DATA_EA1C[layout + 1] : 0)) & 0xFF;
    // $E97D-$E987: 控制字节 (布局[2])
    const ctrl = layout + 2 < LAYOUT_DATA_EA1C.length ? LAYOUT_DATA_EA1C[layout + 2] : 0;
    let rows = ctrl & 0x03;          // $0040 行数
    let count = (ctrl >> 2) & 0x3F;  // $0041 每行 tile 数
    let off = layout + 3;            // tile 起始偏移
    let x = 0;                       // 缓冲索引 $04A5,X
    // $E98C 行循环
    while (rows !== 0) {
      // $E98E-$E99D: PPU 缓冲头: 计数, NTaddr lo, NTaddr hi
      this._w(ramKey(0x04A5 + x), count);
      this._w(ramKey(0x04A5 + x + 1), ntLo);
      this._w(ramKey(0x04A5 + x + 2), ntHi);
      // $E997-$E9A2: NT 地址 += $20 (下一行)
      const sumLo = (ntLo + 0x20) & 0xFF;
      ntHi = (ntHi + ((sumLo < ntLo) ? 1 : 0)) & 0xFF;
      ntLo = sumLo;
      x += 3;
      // $E9A7-$E9C9: 复制 tile 或零填充
      let n = count;
      let zeroFill = (index & 0x80) !== 0;
      while (n !== 0) {
        if (!zeroFill) {
          // $E9B0-$E9B3: 读 tile; INY (off++ 总会发生); 遇 $FE → 转零填充
          const tile = off < LAYOUT_DATA_EA1C.length ? LAYOUT_DATA_EA1C[off] : 0;
          off++;
          if (tile === 0xFE) {
            zeroFill = true;
          } else {
            this._w(ramKey(0x04A5 + x), tile);
            x++;
          }
        }
        if (zeroFill) {
          // $E9C1-$E9C9: 零填充 (含本迭代)
          this._w(ramKey(0x04A5 + x), 0x00);
          x++;
        }
        n--;
      }
      // $E9CB-$E9CD: 终止符 0
      this._w(ramKey(0x04A5 + x), 0x00);
      x++;
      rows--;
    }
    // $E9D4-$E9D6: 解锁
    this._w(KEY_0515, 0x80);
  }

  // ──────────────────────────────────────────────
  // $EFA2: 场景精灵渲染 (活跃球员布局 + 精灵 + 光标)
  // ──────────────────────────────────────────────

  /**
   * 对应 $EFA2-$EFF4: 场景精灵渲染
   * $0621 < 4 才执行; 无活跃球员 → 直接精灵/光标段;
   * 否则逐活跃球员写场景 NT 布局 ($F206 表, 模式 3 用第 5 项, 其余按计数器索引)。
   */
  renderSceneSprites(): void {
    // $EFA5-$EFA9: $0621 >= 4 → RTS
    if (this._r(KEY_0621) >= 0x04) return;
    const active = this._r(KEY_0600);
    // $EFAA-$EFAF: 无活跃球员 → JMP $EFF6 (精灵/光标段)
    if (active === 0) {
      this._sceneSpriteMarkers();
      return;
    }
    // $EFB2-$EFF4: 逐活跃球员渲染 (计数器压栈, 0..$0600-1)
    const mode = this._r(KEY_0621);
    for (let i = 0; i < active; i++) {
      // $EFB5-$EFBD: 帧同步等待 ($0515==0) → 锁定
      do {
        this._rt.syncFrame(1);
      } while (this._r(KEY_0515) !== 0);
      this._w(KEY_0515, 0x01);
      // $EFC6-$EFD0: 布局索引 = 模式3 ? $0A : (计数器<<1)
      const idx = mode === 0x03 ? 0x0A : ((i << 1) & 0xFF);
      // $EFD1-$EFE1: 场景布局指针 → $003A/$003B; NT 基址 $21xx
      this._w(KEY_003A, SCENE_LAYOUT_PTR_F206[idx]);
      this._w(KEY_003B, SCENE_LAYOUT_PTR_F206[idx + 1]);
      this._w(KEY_003C, 0x00);
      this._w(KEY_003D, 0x21);
      // $EFE3-$EFE5: 写布局到 $04A5 (X=0)
      this._writeLayout(0);
      // $EFE8-$EFEA: 帧同步
      this._rt.syncFrame(4);
    }
    // $EFF6: 精灵/光标渲染
    this._sceneSpriteMarkers();
  }

  /**
   * 对应 $EFF6-$F10D: 场景精灵/光标渲染
   * 精灵模式 $063D = $F00F[$0621]; 6 个精灵循环写调色板/属性/布局,
   * 模式 3 直接结束; 否则补写球坐标光标行 ($A2 tile)。
   */
  private _sceneSpriteMarkers(): void {
    // $EFF6-$F00C: 精灵模式; 模式0 且无活跃球员 → 2
    const modeIdx = this._r(KEY_0621);
    let mode = SPR_MODE_TABLE_F00F[modeIdx] ?? 0;
    if (modeIdx === 0x00 && this._r(KEY_0600) === 0x00) mode = 0x02;
    this._w(KEY_063D, mode);
    // $F013: 计数器 = 0; $F015-$F0A4: 6 个精灵循环
    for (let i = 0; i < 6; i++) {
      // $F016-$F022: 帧同步等待 → 锁定
      do {
        this._rt.syncFrame(1);
      } while (this._r(KEY_0515) !== 0);
      this._w(KEY_0515, 0x01);
      // $F025-$F033: NT 基址表项 (模式<<2), NT 基址 → $003C/$003D
      const y = (mode << 2) & 0xFF;
      this._w(KEY_003C, SPRITE_NT_TABLE_F15A[y]);
      this._w(KEY_003D, SPRITE_NT_TABLE_F15A[y + 1]);
      // $F037-$F03F: $04A6 = 属性基址 + 精灵属性偏移
      this._w(KEY_04A6, (SPRITE_NT_TABLE_F15A[y + 2] + SPR_ATTR_F10E[i]) & 0xFF);
      // $F042-$F064: $04A7 = 属性 hi (非模式3 合并 $05CE)
      if (mode !== 0x03) {
        this._w(KEY_04A6, (this._r(KEY_04A6) | (this._r(KEY_05CE) & 0x20)) & 0xFF);
        this._w(KEY_04A7, ((this._r(KEY_05CE) >>> 4) | SPRITE_NT_TABLE_F15A[y + 3]) & 0xFF);
      } else {
        this._w(KEY_04A7, SPRITE_NT_TABLE_F15A[y + 3]);
      }
      // $F067-$F069: $04A5 = 1 (行计数)
      this._w(KEY_04A5, 0x01);
      // $F06C-$F07E: $04A8 = tile ($F16A 表, 索引 = i + 模式×6)
      this._w(KEY_04A8, SPRITE_TILE_TABLE_F16A[((mode * 6) + i) & 0xFF]);
      // $F081-$F08D: 精灵布局指针 (i<<1 → $F182 表) → $003A/$003B
      const lx = (i << 1) & 0xFF;
      this._w(KEY_003A, SPRITE_PTR_TABLE_F15A[lx]);
      this._w(KEY_003B, SPRITE_PTR_TABLE_F15A[lx + 1]);
      // $F08F-$F091: 写布局到 $04A5+4
      this._writeLayout(4);
    }
    // $F09F-$F0A4: 模式 3 → 直接结束
    if (mode === 0x03) return;
    // $F0A6-$F0B2: 帧同步等待 → 锁定
    do {
      this._rt.syncFrame(1);
    } while (this._r(KEY_0515) !== 0);
    this._w(KEY_0515, 0x01);
    // $F0B5-$F0C3: 光标行: 计数=1, tile=$A2, 属性=0
    this._w(KEY_04A5, 0x01);
    this._w(KEY_04A8, 0xA2);
    this._w(KEY_003B, 0x00);
    this._w(KEY_04A9, 0x00);
    // $F0C6-$F0D7: NT 偏移 = 球坐标 (Y 区 <<1 + X 区>>4)
    const ty = (this._r(KEY_0637) - 0x50) & 0xFF & 0xF0;
    let a = (ty << 1) & 0xFF;
    let b = (ty >>> 7) & 0x01; // ROL $003B (进位)
    const xoff = ((this._r(KEY_0635) - 0x30) & 0xFF) >>> 4;
    const sum = a + xoff;
    a = sum & 0xFF;
    b = (b + ((sum >> 8) & 1)) & 0xFF; // BCC 跳过 / INC $003B
    // $F0EC-$F0F8: NT 地址 = 偏移 + 表项基址
    const x = (mode << 2) & 0xFF;
    const tLo = SPRITE_NT_TABLE_F15A[x];
    const tHi = SPRITE_NT_TABLE_F15A[x + 1];
    const ntLo = (a + tLo) & 0xFF;
    const ntHi = (tHi + b + ((a + tLo) >> 8 & 1)) & 0xFF;
    this._w(KEY_04A6, ntLo);
    // $F0FB-$F105: $04A7 |= $05CE>>4
    this._w(KEY_04A7, (ntHi | (this._r(KEY_05CE) >>> 4)) & 0xFF);
    // $F108-$F10A: 解锁
    this._w(KEY_0515, 0x80);
  }

  /**
   * 对应 $F114-$F159: 布局写入子程 (写 $04A5 PPU 缓冲)
   * 布局格式: [行数][NT lo][属性][tile...] 重复, $00 结束。
   * 每行写 3B 头 (计数/NT lo/NT hi+属性) + 行内 tile 串。
   * @param x $04A5 缓冲起始索引
   */
  private _writeLayout(x: number): void {
    // 解析 $003A/$003B 布局指针 → 对应数据表
    const addr = (this._r(KEY_003A) | (this._r(KEY_003B) << 8)) & 0xFFFF;
    let data: ReadonlyArray<number>;
    let off: number;
    if (addr >= 0xF212) {
      data = NT_LAYOUT_DATA;
      off = addr - 0xF212;
    } else {
      data = SPRITE_DATA_F16A;
      off = addr - 0xF18E;
    }
    const read8 = (): number => {
      const v = off < data.length ? data[off] : 0;
      off++;
      return v;
    };
    // $F116-$F152: 行循环
    for (;;) {
      // $F116-$F118: 行数/计数
      const count = read8();
      this._w(ramKey(0x04A5 + x), count);
      // $F11B: 0 → 结束
      if (count === 0) break;
      // $F11D: rows = count
      this._w(KEY_003E, count);
      // $F120-$F128: NT lo = 数据 + $003C (保存进位)
      const loSum = read8() + this._r(KEY_003C);
      this._w(ramKey(0x04A6 + x), loSum & 0xFF);
      const carry = (loSum >> 8) & 1;
      // $F12A-$F13B: 属性 = ($003D >= $22 ? 0 : $05CE>>4) | 数据
      const attrBase = this._r(KEY_003D) >= 0x22 ? 0 : (this._r(KEY_05CE) >>> 4);
      const attr = (attrBase | read8()) & 0xFF;
      // $F13D-$F140: NT hi = $003D + 进位 + 属性
      this._w(ramKey(0x04A7 + x), (this._r(KEY_003D) + carry + attr) & 0xFF);
      x += 3;
      // $F147-$F150: 写 count 个 tile
      for (let n = count; n > 0; n--) {
        this._w(ramKey(0x04A5 + x), read8());
        x++;
      }
    }
    // $F154-$F156: 解锁
    this._w(KEY_0515, 0x80);
  }

  // ──────────────────────────────────────────────
  // $EF7F: 文本写入子程
  // ──────────────────────────────────────────────

  /**
   * 对应 $EF80-$EF9F: 文本写入子程 (带参渲染)
   * 保存 $0024/$0025 → 设 $18/$19 → 分发 + 渲染 $800C → 恢复 $0024/$0025 → 再分发。
   * (与 _showTeamChar 不同: 此处会保存/恢复 $0024/$0025)
   * @param param Y 值 (经栈传入 $800C 渲染)
   */
  writeText(param: number): void {
    // $EF80-$EF87: 保存 $0024/$0025 与 Y
    const saved24 = this._r(KEY_0024);
    const saved25 = this._r(KEY_0025);
    // $EF8A-$EF92: 场景参数 $18/$19
    this._w(KEY_0024, 0x18);
    this._w(KEY_0025, 0x19);
    this._rt.sceneDispatch();
    // $EF95-$EF96: 渲染 $800C (A = Y)
    this._rt.b0Render(0x800C);
    // $EF99-$EF9D: 恢复 $0025/$0024
    this._w(KEY_0025, saved25);
    this._w(KEY_0024, saved24);
    // $EF9F: JMP $CE2D
    this._rt.sceneDispatch();
    void param;
  }

  // ──────────────────────────────────────────────
  // $F311: 读指针子程
  // ──────────────────────────────────────────────

  /**
   * 对应 $F311-$F328: 读指针子程
   * 读 $F3xx 表 A 索引的 16bit LE 指针 (等价 DIALOG_PTR_TABLE_F329[A])。
   * 结果写入 $0030/$0031 并返回。
   */
  readPtr(index: number): number {
    // $F311: STY $0030; $0031=$F3 (基址 $F300)
    // $F317: ASL (A<<1); 溢出页 → $0031++
    const table = DIALOG_PTR_TABLE_F329;
    const i = (index << 1) & 0xFF;
    const lo = i < table.length ? table[i] : 0;
    const hi = (i + 1) < table.length ? table[i + 1] : 0;
    // $F31D-$F326: ($0030):lo / ($0030)+1:hi → $0030/$0031
    this._w(KEY_0030, lo);
    this._w(KEY_0031, hi);
    return (lo | (hi << 8)) & 0xFFFF;
  }

  // ── 内部辅助 ──

  private _r(key: string): number {
    return this._store.read(key) & 0xFF;
  }

  private _w(key: string, v: number): void {
    this._store.write(key, v & 0xFF);
  }

  /** 记录键 (对应 $0034 指针指向的 RAM 记录 + 字段偏移, 连续地址 ramKey(base+off)) */
  private _recKey(base: number, off: number): string {
    return ramKey(base + off);
  }

  /** 读记录字段 ($0034 指针 + Y 偏移) */
  private _pf(base: number, off: number): number {
    return this._store.read(this._recKey(base, off)) & 0xFF;
  }

  /** 写记录字段 ($0034 指针 + Y 偏移) */
  private _pfw(base: number, off: number, v: number): void {
    this._store.write(this._recKey(base, off), v & 0xFF);
  }

  /** 球员数据基址: RAM $0300 + ID*0x0C (对应 asm $CD7C) */
  private _playerBase(id: number): number {
    return 0x0300 + ((id & 0xFF) * 0x0C);
  }

  /** 设置记录指针: 对应 $0034/$0035 写入 (当前记录上下文) */
  private _setPtr(base: number): void {
    this._ptrBase = base;
  }
}
