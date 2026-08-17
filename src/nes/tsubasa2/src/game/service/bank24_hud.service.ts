/**
 * HUD Service — Bank 24 (数据已直接 import, 无 MMC3 切换)
 *
 * 比赛界面 HUD 文本流渲染引擎 + 精灵数据加载。
 *
 * 逻辑直接翻译自 bank_24.asm,
 * 数据来自 `data/bank24-tables.ts` (bank24 自身) + `data/bank25-data.ts`
 * (HUD 指针表/文本流数据/精灵配置表, 原始 ROM 字节直读)。
 *
 * 原始入口跳转表 ($8003):
 *   [0]  $86F8  HUD 行1 渲染 (ram_0532 触发, 指针表 $AD6E, 写入 ram_046F 区)
 *   [1]  $8779  HUD 行2 渲染 (ram_0534 触发, 指针表 $AD1C, 写入 ram_0490/0491)
 *   [2]  $87E6  HUD 行3 渲染 (ram_0536 触发, 指针表 $AD54, 写入 ram_0538)
 *   [3]  $8851  精灵数据加载 (A 参数 → 指针表 $B3CF, 写入 ram_04A5 OAM 缓冲)
 *
 * 文本流解释 (逐帧调用, 帧延迟推进):
 *   行1: byte0 = (帧延迟<<3)|N; N==0&delay==0 → 结束; N==1&delay==0 → 跳转;
 *        delay>0 → ram_046F 区写入 N 组 (偏移,值)
 *   行2: byte0<$F0 → ram_0535=延迟, 后2B → ram_0490/0491;
 *        $F0 → 结束; $F1 → 跳转(后2B 绝对地址)
 *   行3: byte0<$F0 → ram_0537=延迟, 后1B → ram_0538;
 *        $F0 → 结束; $F1 → 跳转(后2B 绝对地址)
 */

import { DataStore } from '../data/DataStore';
import {
  readHud1Ptr,
  readHud2Ptr,
  readHud3Ptr,
  readSprPtr,
  readSprBits,
  readB25,
  readB25U16,
  readScenePtr,
  readSceneByte,
  readSceneU16,
  readB24,
  readB24U16,
  readB31,
  readB31U16,
} from '../data/bank24-tables';
import { T_LEVEL_MAP } from '../data/bank28-tables';

// ═══════════════════════════════════════════════════════════════
// RAM 语义键 (替代 NES 内存地址)
// ═══════════════════════════════════════════════════════════════

// $0532-$053E HUD 文本流状态区 (3 行 × 控制+进度+数据)
const KEY_0532 = 'ram_0532'; // HUD 行1 请求/控制 (bit7=触发, 低7位=索引+1)
const KEY_0533 = 'ram_0533'; // HUD 行1 帧延迟计数器
const KEY_0534 = 'ram_0534'; // HUD 行2 请求/控制
const KEY_0535 = 'ram_0535'; // HUD 行2 帧延迟计数器
const KEY_0536 = 'ram_0536'; // HUD 行3 请求/控制
const KEY_0537 = 'ram_0537'; // HUD 行3 帧延迟计数器
const KEY_0538 = 'ram_0538'; // HUD 行3 数据字节

// 注: $04A5 精灵影子缓冲 / ram_0515 忙标志 由 OamManager 统一管理,
//     不再在此维护独立 RAM 键。

// $046F HUD 行1 数据写入区 (偏移索引)
const KEY_046F = 'ram_046F';

// $0490/$0491 HUD 行2 数据写入区
const KEY_0490 = 'ram_0490';
const KEY_0491 = 'ram_0491';

// $05C5/$05C6 精灵位段状态
const KEY_05C5 = 'ram_05C5'; // 精灵位段索引
const KEY_05C6 = 'ram_05C6'; // 精灵位段值×9
const KEY_05CE = 'ram_05CE'; // 精灵屏幕偏移

// 零页间接指针 (对应汇编 ram_0079/007B/007D/0050 指针对)
const KEY_0079 = 'ram_0079'; // HUD 行1 数据指针 lo
const KEY_007A = 'ram_007A'; // HUD 行1 数据指针 hi
const KEY_007B = 'ram_007B'; // HUD 行2 数据指针 lo
const KEY_007C = 'ram_007C'; // HUD 行2 数据指针 hi
const KEY_007D = 'ram_007D'; // HUD 行3 数据指针 lo
const KEY_007E = 'ram_007E'; // HUD 行3 数据指针 hi
const KEY_0050 = 'ram_0050'; // 精灵数据指针 lo
const KEY_0051 = 'ram_0051'; // 精灵数据指针 hi

const KEY_003A = 'ram_003A'; // $8629 图案游标 ($82F2 设 = e6+3)
const KEY_0030 = 'ram_0030'; // 文本流指针 lo ($C53C→$F30F)
const KEY_0031 = 'ram_0031'; // 文本流指针 hi
const KEY_003C = 'ram_003C'; // $863C 文本流索引 (Y)
const KEY_003D = 'ram_003D'; // $8653/$8513 名字区 ID / 匹配索引
const KEY_05EE = 'ram_05EE'; // $8653 查表写入区 (4B/项)
const KEY_043B = 'ram_043B'; // 主队/当前队伍索引 (共享 bank28)
const KEY_043D = 'ram_043D'; // 客队/对手队伍索引 (共享 bank28)
const KEY_043E = 'ram_043E'; // 客队阵型参数 (共享 bank28)
const KEY_0441 = 'ram_0441'; // 主队角色类型/属性参数 (共享 bank28)
const KEY_0442 = 'ram_0442'; // 客队角色类型/属性参数 (共享 bank28)
const KEY_0628 = 'ram_0628'; // 区域检查结果 (共享 bank28)
const KEY_05FC = 'ram_05FC'; // 目标球员 ID (共享 bank26)
const KEY_0601 = 'ram_0601'; // 球员 ID 数组基址 (共享 bank26)
const KEY_0602 = 'ram_0602'; // 球员 ID 数组 (共享 bank26)
const KEY_0603 = 'ram_0603'; // 球员 ID 数组 (共享 bank26)
const KEY_002A = 'ram_002A'; // 菜单/选择状态 A
const KEY_0045 = 'ram_0045'; // 精灵索引 ($88B9 槽选择 0/3/6)
const KEY_0032 = 'ram_0032'; // $C527 数字渲染结果 lo (图案)
const KEY_0033 = 'ram_0033'; // $C527 数字渲染结果 hi (图案)
const KEY_003E = 'ram_003E'; // 精灵数据流指针 lo ($8986)
const KEY_003F = 'ram_003F'; // 精灵数据流指针 hi
const KEY_0040 = 'ram_0040'; // 精灵数据流索引 ($899C)
const KEY_0046 = 'ram_0046'; // $8A75 文本流渲染游标
const KEY_0047 = 'ram_0047'; // 通用临时 (数字渲染/文本索引)
const KEY_0048 = 'ram_0048'; // $8967 保存 Y
const KEY_006F = 'ram_006F'; // $8C55 数字 lo
const KEY_0070 = 'ram_0070'; // $8C55 数字 hi
const KEY_0071 = 'ram_0071'; // $8C55 除数 (=$0A)
const KEY_0072 = 'ram_0072'; // $C51E 商 lo
const KEY_0073 = 'ram_0073'; // $C51E 商 hi
const KEY_0074 = 'ram_0074'; // $C51E 余数
const KEY_061E = 'ram_061E'; // 球员索引 ($8A93/$8AAF)
const KEY_060B = 'ram_060B'; // 位置表 (共享 bank26)
const KEY_0430 = 'ram_0430'; // 球队球员数组基址 (共享 bank28)
const KEY_0431 = 'ram_0431'; // 球队球员数组+1 (共享 bank28)
const KEY_044E = 'ram_044E'; // $8A26 附加量
const KEY_05F7 = 'ram_05F7'; // $8B8B 计时 lo
const KEY_05F8 = 'ram_05F8'; // $8B8B 计时 hi
const KEY_05FD = 'ram_05FD'; // $8BDE 球员 ID 源
const KEY_0610 = 'ram_0610'; // $8B40 附加数组

/** 精灵加载参数 (dispatch[3] 前写入) */
const KEY_SPR_ARG = 'hud_spr_arg';

// ── 比赛 HUD 场景状态机 ($800F-$81AB) ──

const KEY_063F = 'ram_063F'; // 场景控制标志 (bit7=1 → 固定区 $C512)
const KEY_05EA = 'ram_05EA'; // 场景索引 → $9220 指针表
const KEY_05E3 = 'ram_05E3'; // 状态机运行标志 (0=结束)
const KEY_05E4 = 'ram_05E4'; // 状态机子程序索引 (0=$806E 1=$8218 2=$82F2)
const KEY_05E5 = 'ram_05E5'; // 文本流字节索引
const KEY_05E9 = 'ram_05E9'; // 帧延迟计数器
const KEY_05F4 = 'ram_05F4'; // 场景内部标志 (初始化清零)
const KEY_05E6 = 'ram_05E6'; // 组属性表值 ($86B8[hi], $8218/$82F2)
const KEY_05E7 = 'ram_05E7'; // 精灵源地址/下一块配置 ($8218/$82F2)
const KEY_05E8 = 'ram_05E8'; // 帧数/行计数 ($8218)
const KEY_05F3 = 'ram_05F3'; // 场景内部参数 ($81FD/$8218)
const KEY_003B = 'ram_003B'; // $8629 属性游标 ($82F2 设 = 0; $8218 设 = 2)
const KEY_0061 = 'ram_0061'; // 精灵数据块指针 lo ($8218)
const KEY_0062 = 'ram_0062'; // 精灵数据块指针 hi ($8218)
const KEY_0616 = 'ram_0616'; // 查询输入 ($81CE)
const KEY_0034 = 'ram_0034'; // 间接指针 lo ($81E4: (ram_0034),Y)
const KEY_0035 = 'ram_0035'; // 间接指针 hi
const KEY_005F = 'ram_005F'; // 场景数据指针 lo
const KEY_0060 = 'ram_0060'; // 场景数据指针 hi
const KEY_0049 = 'ram_0049'; // 查询临时 (场景标志字节 $81AC[ram_0026])

// 查询输入 (与其他 service 共享的 DataStore 键)
const KEY_001C = 'ram_001C'; // 输入状态 1 (bit7=确认/继续)
const KEY_043C = 'ram_043C'; // 主队阵型/场景参数 (bit7)
const KEY_05FB = 'ram_05FB'; // 状态标志
const KEY_0600 = 'ram_0600'; // 场上活跃球员数
const KEY_0629 = 'ram_0629'; // 查询量
const KEY_0026 = 'ram_0026'; // 场景/当前球队 ID
const KEY_0027 = 'ram_0027'; // 查询选择
const KEY_0028 = 'ram_0028'; // 菜单/选择状态 A
const KEY_0029 = 'ram_0029'; // 菜单/选择状态 B
const KEY_002B = 'ram_002B'; // 查询附加状态

/** $81AC 查询标志表 (ram_0026 索引, 34 项) — $8156 用 */
const FLAG_81AC: readonly number[] = [
  0xc0, 0xc0, 0xc0, 0xc0, 0xc1, 0xc2, 0x40, 0x40, //
  0x40, 0x40, 0x41, 0xc2, 0xc0, 0xc0, 0xc1, 0xc3, //
  0xc0, 0xc0, 0xc0, 0xc0, 0xc1, 0xc2, 0x00, 0xc0, //
  0xc0, 0xc0, 0xc0, 0xc0, 0xc0, 0xc0, 0xc4, 0xc5, //
  0x86, 0xc6,
];

// ═══════════════════════════════════════════════════════════════
// HUD Service
// ═══════════════════════════════════════════════════════════════

export class Bank24HudService {
  constructor(private _store: DataStore) {}

  /** 比赛场景已初始化 (对应 $800F 一次性初始化段) */
  private _sceneActive = false;

  /** $80A0 等待输入中 (H5: 帧模型, 非忙等) */
  private _waitingInput = false;

  // ──────────────────────────────────────────────
  // $8003: 入口跳转表
  // ──────────────────────────────────────────────

  /** 对应原始 $8003 跳转表 (4 个入口) */
  dispatch(index: number): void {
    switch (index) {
      case 0: this.hudLine1(); break; // $86F8
      case 1: this.hudLine2(); break; // $8779
      case 2: this.hudLine3(); break; // $87E6
      case 3: this.spriteLoad(); break; // $8851
    }
  }

  // ──────────────────────────────────────────────
  // [0] $86F8: HUD 行1 渲染
  // ──────────────────────────────────────────────

  /**
   * 对应 $86F8-$8778: HUD 行1 文本流渲染。
   *
   * 触发: ram_0532 bit7=1 → (ram_0532&0x7F)-1 索引 $AD6E 指针表 (bank25),
   *       指针存入 ram_0079/007A, ram_0533 清 0。
   * 推进: 每帧若 ram_0533 != 0 则递减; 为 0 时读文本流 (bank25):
   *   byte0: 高5位=帧延迟, 低3位=N
   *     N==0 && 延迟==0 → 结束 (ram_0532=0)
   *     N==1 && 延迟==0 → 指针跳转 (后 2 字节绝对地址)
   *     延迟>0 → ram_0533=延迟, 向 ram_046F 区写入 N 组 (偏移,值)
   */
  hudLine1(): void {
    const s = this._store;
    const ctrl = s.read(KEY_0532);

    // $86FB: ctrl==0 → RTS
    if (ctrl === 0) return;
    // $86FD: bit7=0 → 帧延迟推进
    if ((ctrl & 0x80) === 0) {
      if (s.read(KEY_0533) !== 0) s.write(KEY_0533, s.read(KEY_0533) - 1);
      return;
    }

    // $86FF-$8707: 新请求
    s.write(KEY_0532, ctrl & 0x7F);
    if ((ctrl & 0x7F) === 0) return; // $8704: ctrl==$80 → 结束
    const idx = (ctrl & 0x7F) - 1;
    this._setPtr(KEY_0079, KEY_007A, readHud1Ptr(idx)); // $870B-$8713
    s.write(KEY_0533, 0); // $8715-$8717
    this._hud1Step(); // $8723
  }

  /** $8723-$8778: HUD 行1 文本流解释 */
  private _hud1Step(): void {
    const s = this._store;
    const ptr = this._getPtr(KEY_0079, KEY_007A);

    const byte0 = readB25(ptr); // $8725
    const n = byte0 & 0x07; // $8727-$8729 → X
    const delay = byte0 >> 3; // $872C-$872F

    if (delay !== 0) {
      // $873C: 正常处理
      s.write(KEY_0533, delay);
      for (let i = 0; i < n; i++) {
        // $8746 循环: (偏移, 值) 对 → ram_046F+偏移
        const off = readB25(ptr + 1 + i * 2);
        const val = readB25(ptr + 2 + i * 2);
        s.write(`${KEY_046F}+${off}`, val);
      }
      // $8754-$875C: 指针推进 1+2n
      this._setPtr(KEY_0079, KEY_007A, ptr + 1 + n * 2);
      this._fixedC533(); // $875E: 固定区渲染同步 (H5 空)
      return;
    }

    // $8731: 延迟==0
    if (n === 0) {
      // $8765: 结束
      s.write(KEY_0532, 0);
      return;
    }
    if (n === 1) {
      // $876B: 跳转 (后 2 字节绝对地址)
      this._setPtr(KEY_0079, KEY_007A, readB25U16(ptr + 1));
      this._hud1Step(); // $8776: JMP $8723
      return;
    }
    // $8739-$873B 为反汇编数据区, 理论上不可达
  }

  // ──────────────────────────────────────────────
  // [1] $8779: HUD 行2 渲染
  // ──────────────────────────────────────────────

  /**
   * 对应 $8779-$87E5: HUD 行2 文本流渲染。
   *
   * 触发: ram_0534 bit7=1 → (ram_0534&0x7F)-1 索引 $AD1C 指针表 (bank25),
   *       指针存入 ram_007B/007C, ram_0535 清 0。
   * 推进: ram_0535 递减; 为 0 时读文本流:
   *   byte0 < $F0: 帧延迟 → ram_0535; 后 2 字节 → ram_0490/0491
   *   byte0 == $F0: 结束 (ram_0534=0)
   *   byte0 == $F1: 指针跳转 (2 字节绝对地址)
   */
  hudLine2(): void {
    const s = this._store;
    const ctrl = s.read(KEY_0534);

    if (ctrl === 0) return; // $877C
    if ((ctrl & 0x80) === 0) {
      if (s.read(KEY_0535) !== 0) s.write(KEY_0535, s.read(KEY_0535) - 1);
      return;
    }

    s.write(KEY_0534, ctrl & 0x7F); // $8780-$8782
    if ((ctrl & 0x7F) === 0) return; // $8785
    const idx = (ctrl & 0x7F) - 1;
    this._setPtr(KEY_007B, KEY_007C, readHud2Ptr(idx)); // $878C-$8794
    s.write(KEY_0535, 0); // $8796-$8798
    this._hud2Step(); // $87A4
  }

  /** $87A4-$87E5: HUD 行2 文本流解释 */
  private _hud2Step(): void {
    const s = this._store;
    const ptr = this._getPtr(KEY_007B, KEY_007C);

    const byte0 = readB25(ptr); // $87A6
    if (byte0 < 0xf0) {
      // $87B7: 正常处理
      s.write(KEY_0535, byte0);
      s.write(KEY_0490, readB25(ptr + 1));
      s.write(KEY_0491, readB25(ptr + 2));
      // $87C7-$87D1: 指针推进 3
      this._setPtr(KEY_007B, KEY_007C, ptr + 3);
      return;
    }
    if (byte0 === 0xf0) {
      // $87D2: 结束
      s.write(KEY_0534, 0);
      return;
    }
    if (byte0 === 0xf1) {
      // $87D8: 跳转
      this._setPtr(KEY_007B, KEY_007C, readB25U16(ptr + 1));
      this._hud2Step(); // $87E3: JMP $87A4
      return;
    }
  }

  // ──────────────────────────────────────────────
  // [2] $87E6: HUD 行3 渲染
  // ──────────────────────────────────────────────

  /**
   * 对应 $87E6-$8850: HUD 行3 文本流渲染。
   *
   * 触发: ram_0536 bit7=1 → (ram_0536&0x7F)-1 索引 $AD54 指针表 (bank25),
   *       指针存入 ram_007D/007E, ram_0537 清 0。
   * 推进: ram_0537 递减; 为 0 时读文本流:
   *   byte0 < $F0: 帧延迟 → ram_0537; 后 1 字节 → ram_0538
   *   byte0 == $F0: 结束 (ram_0536=0)
   *   byte0 == $F1: 指针跳转 (2 字节绝对地址)
   */
  hudLine3(): void {
    const s = this._store;
    const ctrl = s.read(KEY_0536);

    // $87E9: ctrl==0 → $8811 (ram_0538 = 0)
    if (ctrl === 0) {
      s.write(KEY_0538, 0);
      return;
    }
    if ((ctrl & 0x80) === 0) {
      if (s.read(KEY_0537) !== 0) s.write(KEY_0537, s.read(KEY_0537) - 1);
      return;
    }

    s.write(KEY_0536, ctrl & 0x7F); // $87ED-$87EF
    if ((ctrl & 0x7F) === 0) {
      // $87F2: ctrl==$80 → $8811 (ram_0538 = 0)
      s.write(KEY_0538, 0);
      return;
    }
    const idx = (ctrl & 0x7F) - 1;
    this._setPtr(KEY_007D, KEY_007E, readHud3Ptr(idx)); // $87F9-$8801
    s.write(KEY_0537, 0); // $8803-$8805
    this._hud3Step(); // $8815
  }

  /** $8815-$8850: HUD 行3 文本流解释 */
  private _hud3Step(): void {
    const s = this._store;
    const ptr = this._getPtr(KEY_007D, KEY_007E);

    const byte0 = readB25(ptr); // $8817
    if (byte0 < 0xf0) {
      // $8828: 正常处理
      s.write(KEY_0537, byte0);
      s.write(KEY_0538, readB25(ptr + 1));
      // $8832-$883C: 指针推进 2
      this._setPtr(KEY_007D, KEY_007E, ptr + 2);
      return;
    }
    if (byte0 === 0xf0) {
      // $883D: 结束
      s.write(KEY_0536, 0);
      return;
    }
    if (byte0 === 0xf1) {
      // $8843: 跳转
      this._setPtr(KEY_007D, KEY_007E, readB25U16(ptr + 1));
      this._hud3Step(); // $884E: JMP $8815
      return;
    }
  }

  // ──────────────────────────────────────────────
  // [3] $8851: 精灵数据加载
  // ──────────────────────────────────────────────

  /**
   * 对应 $8851-$88B8: 精灵数据加载 (OAM 缓冲构建)。
   *
   * 流程 (对应汇编):
   *   1. A 参数 → X=A*2, $B3CF 指针表 (bank25) → ram_0050/0051
   *   2. A&3 → 位段选择; A>>2 → $B3BD 行索引取 1 字节, LSR×2 取第 (A&3) 个
   *      2bit 段 → ram_05C6 (=段值×9)
   *   3. ram_05C5=0; $C515 渲染同步等待 (H5 空) 直到 ram_0515==0 → 置忙
   *   4. ram_04A5 区清零 (长度 = 数据块[2]*2+6)
   *   5. $88B9 构建 OAM 属性块; 若还有第二块 (数据块[2]+3) 继续构建
   *   6. ram_0515=$80, ram_05C5++, 与数据块[3] 比较 → 完成标志
   *
   * TODO: $88B9/$8986/$89B4 精灵属性块/属性链构建 (依赖 $8D9E 精灵图案表
   * 与固定区 $C509/$C524/$C533), 待精灵数据块结构分析后实现。
   */
  spriteLoad(a?: number): void {
    const s = this._store;
    const arg = a ?? s.read(KEY_SPR_ARG);
    const ptr = readSprPtr(arg); // $8854-$885C → ram_0050/0051
    s.write(KEY_0050, ptr & 0xff);
    s.write(KEY_0051, ptr >> 8);

    // $8862-$887C: 位段值 → ram_05C6 (段值×9)
    const seg = readSprBits(arg); // $B3BD[arg>>2] 取第 (arg&3) 个 2bit 段
    s.write(KEY_05C6, seg * 9);

    s.write(KEY_05C5, 0); // $887F-$8881

    // $8884-$888E: 等待渲染空闲
    this._fixedC515();
    while (this._store.oam.isBusy()) {
      this._fixedC515();
    }

    // 置忙 → OAM 缓冲构建 (由 OamManager 统一管理)
    this._store.oam.beginBuild();
  }

  // ──────────────────────────────────────────────
  // 比赛 HUD 场景状态机 (对应 $800F-$81AB)
  // ──────────────────────────────────────────────

  /**
   * 对应 $800F 主入口 + $8045 帧循环。H5: 每帧调用一次。
   *
   * 原始流程:
   *   $800F: BIT ram_063F → bit7=1 → JMP $C512 (固定区)
   *          否则初始化指针对 ($9220+ram_05EA*2 表 → ram_005F/0060),
   *          ram_05E3=1, 进入 $8045 无限帧循环 (直到 $8098 结束)。
   * H5 适配: 首次进入执行初始化, 之后每帧执行 $8045 循环体一次;
   *          ram_05E3 归 0 视为场景结束 (下次 bit7 清 0 再初始化)。
   */
  matchHudTick(): void {
    const s = this._store;
    // $8012: bit7=1 → $C512
    if (s.read(KEY_063F) & 0x80) {
      this._fixedC512();
      this._sceneActive = false;
      return;
    }
    if (!this._sceneActive) {
      this._initScene(); // $8017-$8044
      this._sceneActive = true;
    }
    this._frameBody(); // $8045
    // $8098 结束控制字节 → ram_05E3=0
    if (s.read(KEY_05E3) === 0) this._sceneActive = false;
  }

  /** $8017-$8044: 场景初始化 */
  private _initScene(): void {
    const s = this._store;
    // $8017-$8030: ram_05EA → $9220 指针表 → ram_005F/0060
    this._setPtr(KEY_005F, KEY_0060, readScenePtr(s.read(KEY_05EA)));
    // $8032-$803E: 清零
    s.write(KEY_05E9, 0);
    s.write(KEY_05E5, 0);
    s.write(KEY_05E4, 0);
    s.write(KEY_05F4, 0);
    // $8040-$8042: 运行标志
    s.write(KEY_05E3, 1);
  }

  /** $8045-$8050: 帧循环体 (H5: 每帧一次) */
  private _frameBody(): void {
    // $8047: JSR $C515 (渲染同步, H5 空)
    this._fixedC515();
    // $804A: JSR $8053
    this._matchHudStep();
    // $804D: JSR $C560 (H5 空)
    this._fixedC560();
    // $8050: JMP $8045 → 外部每帧调用即循环
  }

  /** $8053-$8066: 帧内处理 (状态机调度) */
  private _matchHudStep(): void {
    const s = this._store;
    // $8056: ram_05E3==0 → 结束
    if (s.read(KEY_05E3) === 0) return;
    // $80A0 等待输入中 (H5 帧模型)
    if (this._waitingInput) {
      this._fixedC515(); // $80A2: JSR $C515
      if (!(s.read(KEY_001C) & 0x80)) return; // $80A8: BPL 循环 (未就绪)
      this._waitingInput = false;
      s.write(KEY_05E9, 0); // $80AA-$80AC
      s.write(KEY_05E4, s.read(KEY_05E4) + 1); // $80AF: INC
      return;
    }
    // $8059-$8061: 帧延迟递减
    if (s.read(KEY_05E9) !== 0) {
      s.write(KEY_05E9, s.read(KEY_05E9) - 1);
      return;
    }
    // $8062: LDA ram_05E4; JSR $C509 → 子程序表 $8068
    //   [0] $806E 读文本流  [1] $8218  [2] $82F2
    switch (s.read(KEY_05E4)) {
      case 0:
        this._sceneSub0();
        break;
      case 1:
        this._sceneSub1(); // TODO(任务2)
        break;
      case 2:
        this._sceneSub2(); // TODO(任务2)
        break;
    }
  }

  /** $806E-$8086: 状态 0 — 读文本流字节 */
  private _sceneSub0(): void {
    const s = this._store;
    const ptr = this._getPtr(KEY_005F, KEY_0060);
    const idx = s.read(KEY_05E5);
    s.write(KEY_05E5, idx + 1); // $8071: INC ram_05E5
    const b = readSceneByte(ptr + idx); // $8074: LDA (ram_005F),Y
    if (b >= 0xf0) {
      this._sceneCtrl(b); // $807A: JSR $8087
      return; // $807D: JMP $806E (由 _sceneCtrl 内部继续)
    }
    s.write(KEY_05E9, b); // $8080: STA ram_05E9 (帧延迟)
    s.write(KEY_05E4, s.read(KEY_05E4) + 1); // $8083: INC ram_05E4 → 状态 1
  }

  /**
   * $8218-$82F1: 状态 1 — 精灵数据加载到 OAM (影子缓冲 $04A5)。
   *
   * 流程:
   *   1. 读文本流字节 b: >=$90 → 属性模式 ($C52D 固定区, H5 空);
   *      <$90 → ram_05F3 = b&$0F, ram_05F4 = $80
   *   2. hi = b>>4 → $86B8 组属性表 → ram_05E6;
   *      $8DC2 指针表[hi] → ram_0061/0062 (精灵数据块)
   *   3. 数据块首 3B: byte0/byte1 = 源图案地址 lo/hi, byte2 → ram_05E7 (组属性)
   *   4. 6 帧循环 (ram_05E8): 每帧等待渲染空闲 → 置忙 →
   *      首精灵槽 3B (attr=组属性, tileLo/Hi=源地址) → 源地址 +$20 推下一精灵 →
   *      RLE 数据流填充后续槽 (bit7=1 → N 个 0; bit7=0 → N 个数据字节) →
   *      组边界检查 ($82B7) → 置完成 ($80)
   *   5. 弹栈 X=hi*2 → $86C8 表 → ram_05E7/05E8 (下一块配置)
   *   6. ram_05E5++, ram_05E4++ → 状态 2
   *
   * OAM 槽语义 (待 $8629/$83A4 翻译后精化):
   *   [0]=attr 组属性, [1]=源地址 lo, [2]=源地址 hi (地址 +$20/精灵)。
   */
  private _sceneSub1(): void {
    const s = this._store;
    const oam = s.oam;
    const ptr = this._getPtr(KEY_005F, KEY_0060);
    const idx = s.read(KEY_05E5);

    // $821B: 读文本流字节
    const b = readSceneByte(ptr + idx);
    if (b >= 0x90) {
      // $822E: 属性模式 → 固定区 $C52D (H5 空)
      this._fixedC52D();
    } else {
      // $8221-$8228: ram_05F3 = b&$0F; ram_05F4 = $80
      s.write(KEY_05F3, b & 0x0f);
      s.write(KEY_05F4, 0x80);
    }

    // $8234-$824D: hi = b>>4 → 表 → ram_05E6 / ram_0061/0062
    const hi = b >> 4;
    s.write(KEY_05E6, readB24(0x86b8 + hi));
    const block = readB24U16(0x8dc2 + hi * 2);
    s.write(KEY_0061, block & 0xff);
    s.write(KEY_0062, block >> 8);

    // $824F-$825E: 数据块首 3B
    const d0 = readSceneByte(block); // byte0 → 源地址 lo
    const d1 = readSceneByte(block + 1); // byte1 → 源地址 hi
    s.write(KEY_05E7, readSceneByte(block + 2)); // byte2 → 组属性
    let dy = 3; // 数据流偏移 (块内)

    // $825F-$8261: 帧数 = 6
    s.write(KEY_05E8, 6);
    let tileLo = d0;
    let tileHi = d1;

    // $8264-$82D9: 帧循环 (每帧 = 1 个精灵组, 源地址跨帧 +$20)
    for (let frame = 0; frame < 6; frame++) {
      // $8264-$826C: 等待渲染空闲
      this._fixedC515();
      while (oam.isBusy()) this._fixedC515();
      oam.beginBuild(); // $826E-$8270: ram_0515 = 1
      s.write(KEY_003B, 2); // $8273-$8275: ram_003B = 2

      let x = 0; // $8277: LDX #$00
      let nextSprite = true; // 首个精灵需写首槽

      // 组写入: $8279 首精灵槽 → $8294 RLE → $82B7 检查
      groupLoop: while (true) {
        if (nextSprite) {
          // $8279-$8284: 写精灵槽 3B (attr=组属性, tileLo/Hi=源地址)
          oam.writeSlot(x, s.read(KEY_05E7), tileLo, tileHi);
          // $8287-$8290: 下一精灵源地址 +$20
          const sum = tileLo + 0x20;
          tileLo = sum & 0xff;
          tileHi = (tileHi + (sum >> 8)) & 0xff;
          x += 3; // $8291-$8293: INX ×3
          nextSprite = false;
        }

        // $8294-$82B5: RLE 数据流 (填充后续槽字节)
        for (;;) {
          const db = readSceneByte(block + dy);
          if (db & 0x80) {
            // 压缩: 后续 N 个 0
            const n = db & 0x7f;
            dy++;
            for (let k = 0; k < n; k++) {
              oam.writeByte(x, 0);
              x++;
            }
          } else {
            // 直接: 后续 N 个数据字节
            const n = db;
            dy++;
            for (let k = 0; k < n; k++) {
              oam.writeByte(x, readSceneByte(block + dy));
              dy++;
              x++;
            }
          }
          // $82B7-$82CA: 组边界检查 (attr0 = [0] 组属性)
          const attr0 = oam.readByte(0);
          const a = x - 3;
          if (a === attr0) {
            nextSprite = true; // BEQ $8279 → 下一精灵
            break;
          }
          if (a < attr0) continue; // BCC $8294 → 继续读数据
          const a2 = a - attr0 - 3;
          if (a2 < attr0) continue; // BCC $8294 → 继续读数据
          break groupLoop; // $82CC: 组/帧结束
        }
      }

      // $82CC-$82D3: 填 0 结束 + 置完成
      oam.writeByte(x, 0);
      oam.endBuild(); // $82D1-$82D3: ram_0515 = $80
    }

    // $82DB-$82E8: 弹栈 X=hi*2 → $86C8 表 → 下一块 ram_05E7/05E8
    s.write(KEY_05E7, readB24(0x86c8 + hi * 2));
    s.write(KEY_05E8, readB24(0x86c9 + hi * 2));

    // $82EB-$82EE: 状态推进 → 状态 2
    s.write(KEY_05E5, idx + 1);
    s.write(KEY_05E4, s.read(KEY_05E4) + 1);
  }

  /**
   * $82F2-$8361: 状态 2 — 精灵组帧渲染。
   *
   * 流程:
   *   1. 等待渲染空闲 → 置忙
   *   2. 清槽区 [0..ram_05E6*2+7]; [0]=e6, [ram_05E6+3]=e6
   *   3. $86E8[ram_05E7*2] → 源地址 → [1]/[2], [e6+4]/[e6+5] = 地址+$20
   *   4. 读流循环: >=$E0 → 命令 (SBC #$E0 → 表 $8364: $83A4/$83CA/$83E2/
   *      $8443/$8467/$846D/$8475/$848D, 任务3); <$E0 → $8629 精灵数据 (任务3)
   */
  private _sceneSub2(): void {
    const s = this._store;
    const oam = s.oam;

    // $82F2-$82FA: 等待渲染空闲
    this._fixedC515();
    while (oam.isBusy()) this._fixedC515();
    oam.beginBuild(); // $82FC-$82FE

    // $8301-$8312: 清 [0..ram_05E6*2+7]
    const e6 = s.read(KEY_05E6);
    const y0 = e6 * 2 + 6;
    for (let y = y0 + 1; y >= 0; y--) {
      oam.writeByte(y, 0);
    }

    // $8314-$831A: ram_003A = e6+3 (图案游标起点)
    s.write(KEY_003A, e6 + 3);

    // $831D-$8323: [0]=e6, [e6+3]=e6
    const xa = e6 + 3;
    oam.writeByte(0, e6);
    oam.writeByte(xa, e6);

    // $8326-$833F: $86E8[ram_05E7*2] → 源地址 (2B)
    const e7 = s.read(KEY_05E7);
    const srcLo = readB24(0x86e8 + e7 * 2);
    const srcHi = readB24(0x86e9 + e7 * 2);
    oam.writeByte(1, srcLo);
    oam.writeByte(2, srcHi);
    const next = (srcHi << 8 | srcLo) + 0x20;
    oam.writeByte(xa + 1, next & 0xff);
    oam.writeByte(xa + 2, next >> 8);

    // $8342-$8344: ram_003B = 0
    s.write(KEY_003B, 0);

    // $8346-$835B: 读流循环 (无限, 由命令子程序推进状态/跳出)
    for (;;) {
      const ptr = this._getPtr(KEY_005F, KEY_0060);
      const idx = s.read(KEY_05E5);
      s.write(KEY_05E5, idx + 1); // $8349: INC ram_05E5
      const b = readSceneByte(ptr + idx); // $834C: LDA (ram_005F),Y
      if (b < 0xe0) {
        this._sceneData8629(b); // $8358: JSR $8629
      } else {
        this._sceneCmd83xx(b - 0xe0); // $835E-$8361: SBC #$E0 → 表 $8364
      }
      // 原始循环无限 (JMP $8346), 靠 cmd28 置 ram_05E4=0 / cmd31 置 ram_05E3=0 跳出
      if (s.read(KEY_05E4) !== 2 || s.read(KEY_05E3) === 0) break;
    }
  }

  /**
   * $8629: 精灵数据字节写入 (双游标 → $04A8 缓冲)。
   *
   * 汇编: JSR $C524 (A→[图案,A], Y→[属性]) ;
   *   STA ram_04A8,X (X=ram_003A, 图案);
   *   STA ram_04A8,X (X=ram_003B, 属性); INC 003A; INC 003B
   * H5: $04A8 = $04A5+3, 经 OamManager 线性字节写 (offset=3+游标)。
   */
  private _sceneData8629(b: number): void {
    const s = this._store;
    const [pat, attr] = this._mapCharC524(b); // $C524 假名→图案映射
    const oam = s.oam;
    const idxA = s.read(KEY_003A);
    const idxB = s.read(KEY_003B);
    oam.writeByte(3 + idxA, pat); // $862C-$862E: STA ram_04A8,X
    oam.writeByte(3 + idxB, attr); // $8631-$8634
    s.write(KEY_003A, idxA + 1); // $8637
    s.write(KEY_003B, idxB + 1); // $8639
  }

  /**
   * $C524 (bank30 $CBC2): 假名/ASCII 编码 → [图案, 属性]。
   *
   *   A<$A0 → [A, 0]; $A0≤A<$C8 → [$... , $94]; A≥$C8 → [.., $95];
   *   大写字形区按 $B4/$B0 边界偏移, 返回前根据进位加 $40。
   */
  private _mapCharC524(a: number): [number, number] {
    if (a < 0xa0) return [a, 0]; // CBC2-$CBC6
    let attr = 0x94; // CBC8
    let v = a;
    if (a >= 0xc8) {
      // CBCE-$CBD8: 属性 $95, A-$AE, <$1F 直接返回, 否则再 -$05
      attr = 0x95;
      v = (a - 0xae) & 0xff;
      if (v < 0x1f) return [v, attr];
      v = (v - 0x05) & 0xff;
      return [(v + 0x40) & 0xff, attr]; // CBED: CLC; ADC #$40
    }
    // CBDA-$CBE8: A-$B4(≥时) → -$9A → ≥$15 时 +5
    const carryB4 = a >= 0xb4; // CMP #$B4; PHP
    if (a >= 0xb4) v = (v - 0x14) & 0xff;
    v = (v - 0x9a) & 0xff;
    if (v >= 0x15) v = (v + 0x05) & 0xff;
    if (!carryB4) return [v, attr]; // CBEA: PLP; BCC $CBF0
    return [(v + 0x40) & 0xff, attr]; // CBED: CLC; ADC #$40
  }

  /**
   * $C53C→$F30F (bank31): A 查 $F329 文本流指针表 → (ram_0030)。
   * A<<1 偏移, ≥$80 时高字节进 $F4; 返回 16 位指针 (bank31 或 RAM $05EB)。
   */
  private _queryTextPtr0030(idx: number): number {
    return readB31U16(0xf329 + ((idx << 1) & 0x1ff));
  }

  /**
   * $C50C→$CD7C (bank30): A(ID) 查 $CD89 表 → (ram_0034) = $0300+ID*12 名字区。
   */
  private _queryNamePtr0034(id: number): number {
    return 0x0300 + (id & 0xff) * 12;
  }

  /**
   * $863C: 文本流渲染 (bank31 数据, 直到 ≥$E0 命令字节)。
   *   (ram_0030) = $C53C(A); Y 循环读字节, <$E0 → $8629 写精灵。
   */
  private _renderText863C(idx: number): void {
    const s = this._store;
    const ptr = this._queryTextPtr0030(idx & 0xff); // $C53C
    s.write(KEY_0030, ptr & 0xff);
    s.write(KEY_0031, ptr >> 8);
    let y = 0; // ram_003C
    for (;;) {
      const b = this._readStreamByte(ptr + y); // (ram_0030),Y
      if (b >= 0xe0) break; // $8649: BCS 结束
      this._sceneData8629(b); // $864B: JSR $8629
      y++;
      if (y >= 256) break; // $8650: INC ram_003C; BNE (保险)
    }
  }

  /**
   * $8653: 名字区渲染。
   *   (ram_0034)=$C50C(A); 首字节≠0 → 渲染文本流 + 写 $08/$2E;
   *   A-$0B → $8686 表 4B → ram_05EE; 最后渲染文本流 0。
   */
  private _renderName8653(id: number): void {
    const s = this._store;
    const namePtr = this._queryNamePtr0034(id); // $C50C
    const b0 = this._readRamByte(namePtr); // (ram_0034),Y Y=0
    if (b0 !== 0) {
      this._renderText863C(b0); // $865E
      this._sceneData8629(0x08); // $8661-$8663
      this._sceneData8629(0x2e); // $8666-$8668
    }
    // $866B-$867F: (A-$0B)*4 → $8686 表 4 字节 → ram_05EE
    const x = ((id - 0x0b) << 2) & 0xff;
    for (let y = 0; y < 4; y++) {
      s.write(`${KEY_05EE}+${y}`, readB24(0x8686 + x + y));
    }
    this._renderText863C(0); // $8681-$8683
  }

  /** $86B2: A+$33 → $8629 (字符直写) */
  private _writeChar86B2(a: number): void {
    this._sceneData8629((a + 0x33) & 0xff); // CLC; ADC #$33; JMP $8629
  }

  /**
   * $8364 命令表 (32 项, cmd = 流字节-$E0) 分发。
   * 每项对应一个 $83xx-$86xx 子程序, 语义见各 case。
   */
  private _sceneCmd83xx(cmd: number): void {
    const s = this._store;
    switch (cmd) {
      case 0: {
        // $83A4: X=(043B==1&&0628&0x80)?0x0A:043B; (043C&0x7F)+$83BF[X] → 文本流
        let x = s.read(KEY_043B);
        if (x === 1 && (s.read(KEY_0628) & 0x80)) x = 0x0a;
        this._renderText863C(((s.read(KEY_043C) & 0x7f) + readB24(0x83bf + x)) & 0xff);
        break;
      }
      case 1: {
        // $83CA: X=043D&0x1F; (043E&0x7F)+$83DC[X] → 文本流
        const x = s.read(KEY_043D) & 0x1f;
        this._renderText863C(((s.read(KEY_043E) & 0x7f) + readB24(0x83dc + x)) & 0xff);
        break;
      }
      case 2:
        this._cmd83E2();
        break;
      case 3: {
        // $8443: 043E bit7 & $8461[043D]≠$FF → 渲染; 再 $83DC[043D&0x3F]
        if (s.read(KEY_043E) & 0x80) {
          const t = readB24(0x8461 + s.read(KEY_043D));
          if (t !== 0xff) this._renderText863C(t);
        }
        this._renderText863C(readB24(0x83dc + (s.read(KEY_043D) & 0x3f)));
        break;
      }
      case 4:
        this._renderName8653(s.read(KEY_0441)); // $8467
        break;
      case 5:
        this._cmd8475(s.read(KEY_05FB) ^ 0x0b); // $846D
        break;
      case 6:
        this._cmd8475(s.read(KEY_05FB)); // $8475
        break;
      case 7:
        this._writeChar86B2(s.read(KEY_0600)); // $848D
        break;
      case 8:
        this._renderName8653(s.read(KEY_0601)); // $8493
        break;
      case 9:
        this._renderName8653(s.read(KEY_0602)); // $8499
        break;
      case 10:
        this._renderName8653(s.read(KEY_0603)); // $849F
        break;
      case 11:
        this._renderName8653(s.read(KEY_05FC)); // $84A5
        break;
      case 12: {
        // $84AB: $84C7[043D]≠0 → (043E bit7 时先渲染 $E6) 再渲染 $84C7[043D]
        const t = readB24(0x84c7 + s.read(KEY_043D));
        if (t !== 0) {
          if (s.read(KEY_043E) & 0x80) this._renderText863C(0xe6);
          this._renderText863C(t);
        }
        break;
      }
      case 13:
        this._renderName8653(s.read(KEY_05FB) ^ 0x0b); // $84CE
        break;
      case 14:
        this._renderName8653(s.read(KEY_0442)); // $84D6
        break;
      case 15:
      case 16:
        // $84DC: (0616>>1)+$34 → $8629
        this._sceneData8629(((s.read(KEY_0616) >> 1) + 0x34) & 0xff);
        break;
      case 17:
        this._cmd84EF(s.read(KEY_002A)); // $84E6
        break;
      case 18:
        this._cmd84EF(s.read(KEY_002B)); // $84EC
        break;
      case 19:
        this._cmdNamePair(s.read(KEY_0441), s.read(KEY_0442)); // $84FB
        break;
      case 20:
        this._cmdNamePair(s.read(KEY_0442), s.read(KEY_0441)); // $8507
        break;
      case 21:
        this._renderText863C(0xed); // $85B1
        break;
      case 22:
        this._renderText863C(0xee); // $85B6
        break;
      case 23:
        this._cmd85BB(); // $85BB
        break;
      case 24:
        this._renderText863C(0xef); // $85D0
        break;
      case 25:
      case 26:
      case 27:
      case 29:
      case 30:
        break; // $85D5/$85FD/$85FE: RTS (无操作)
      case 28:
        this._cmd85D6(); // $85D6: 场景推进/结束
        break;
      case 31:
        s.write(KEY_05E3, 0); // $8621: 场景状态机终止
        break;
      default:
        console.warn(`[bank24] 未知命令 E${cmd.toString(16)}`);
    }
  }

  /** $83E2: 复杂条件文本流 (043C/043B/0628 组合) */
  private _cmd83E2(): void {
    const s = this._store;
    const v43c = s.read(KEY_043C);
    if (v43c & 0x80) {
      const t = v43c & 0x7f;
      const b43b = s.read(KEY_043B);
      if (t !== 0 && b43b === 0) {
        if (t < 3) this._renderText863C(readB24(0x8440 + t)); // $83F4-$83F8
      } else {
        // $83FB: X=043B (==1&&0628&0x80 → $0A); $8435[X]≠$FF → 渲染
        let x = b43b;
        if (x === 1 && (s.read(KEY_0628) & 0x80)) x = 0x0a;
        const t2 = readB24(0x8435 + x);
        if (t2 !== 0xff) this._renderText863C(t2);
      }
    }
    // $8413-$8432: X=043B (同上); $83BF[X]!=0 → 直接渲染, 否则 +(043C&3)
    let x = s.read(KEY_043B);
    if (x === 1 && (s.read(KEY_0628) & 0x80)) x = 0x0a;
    let idx = readB24(0x83bf + x);
    if (idx === 0) idx = (s.read(KEY_043C) & 0x03) + readB24(0x83bf + x);
    this._renderText863C(idx);
  }

  /** $8478: Y=002A/A==0 或 002B(==$24→$23); Y+$76 → 文本流 */
  private _cmd8475(a: number): void {
    const s = this._store;
    const y = a === 0 ? s.read(KEY_002A) : (s.read(KEY_002B) === 0x24 ? 0x23 : s.read(KEY_002B));
    this._renderText863C((y + 0x76) & 0xff);
  }

  /** $84EF: v==$24→$23; v+$76 → 文本流 */
  private _cmd84EF(v: number): void {
    if (v === 0x24) v = 0x23;
    this._renderText863C((v + 0x76) & 0xff);
  }

  /**
   * $84FB/$8507 双名字区: $8513(a1) 匹配 $852C 表 → $8534(a2) 分支渲染。
   */
  private _cmdNamePair(a1: number, a2: number): void {
    const s = this._store;
    const m = this._matchName852C(a1); // $8513
    const namePtr = this._queryNamePtr0034(a2); // $8534: JSR $C50C
    if (!m.carry) {
      // $8572: LDY #0; LDA (ram_0034),Y; JMP $863C
      this._renderText863C(this._readRamByte(namePtr));
      return;
    }
    const idx = m.idx; // ram_003D
    const block = readB24U16(0x8589 + idx * 2); // ram_003E/003F
    const x = this._readRamByte(namePtr); // (ram_0034),Y
    // $8550: 在数据块中查名字区首字节 (0 终止)
    let found = false;
    for (let y = 0; y < 256 && !found; y++) {
      const db = this._readStreamByte(block + y);
      if (db === 0) break;
      if (db === x) {
        found = true;
        break;
      }
    }
    if (found) {
      this._renderText863C(x); // $855C: TXA; JSR $863C
      this._sceneData8629(readB24(0x8579 + idx * 2)); // $8568
      this._sceneData8629(readB24(0x857a + idx * 2)); // $856E
      return;
    }
    this._renderText863C(this._readRamByte(namePtr)); // $8572
  }

  /** $8513: $C50C(a) 名字区首字节匹配 $852C 表 (8 项) → {carry, idx} */
  private _matchName852C(a: number): { carry: boolean; idx: number } {
    const b0 = this._readRamByte(this._queryNamePtr0034(a));
    for (let x = 0; x < 8; x++) {
      if (b0 === readB24(0x852c + x)) return { carry: true, idx: x };
    }
    return { carry: false, idx: 0 };
  }

  /** $85BB: 读流字节 n, 循环 n 次写 $7C 图案 (n=0 → 256 次) */
  private _cmd85BB(): void {
    const s = this._store;
    const ptr = this._getPtr(KEY_005F, KEY_0060);
    const idx = s.read(KEY_05E5);
    s.write(KEY_05E5, idx + 1);
    const n = readSceneByte(ptr + idx); // (ram_005F),Y
    let k = n & 0xff;
    do {
      this._sceneData8629(0x7c); // $85C4: LDA #$7C; JSR $8629
      k = (k - 1) & 0xff; // $85C9: PLA; SEC; SBC #$01; BNE $85C3
    } while (k !== 0);
  }

  /** $85D6: 置渲染完成; 05E7==05E8 → 状态 0+结束; 否则 05E7++ 继续 */
  private _cmd85D6(): void {
    const s = this._store;
    s.oam.endBuild(); // $85D8: STA ram_0515 = $80
    const e7 = s.read(KEY_05E7);
    if (e7 === s.read(KEY_05E8)) {
      s.write(KEY_05E4, 0); // $85E3-$85E5: 状态 0
      s.write(KEY_05E9, 1); // $85F7
    } else {
      s.write(KEY_05E7, e7 + 1); // $85EC
      s.write(KEY_05E5, s.read(KEY_05E5) + 1); // $85EF-$85F2
      s.write(KEY_05E9, 1); // $85F7
    }
  }

  /** 读 RAM 字节 (DataStore 键, 未写返回 0) */
  private _readRamByte(addr: number): number {
    const key = `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
    return this._store.read(key);
  }

  /** 读流字节: ≥$E000 → bank31; ≥$8000 → bank24/25; 否则 RAM */
  private _readStreamByte(addr: number): number {
    if (addr >= 0xe000) return readB31(addr);
    if (addr >= 0x8000) return readSceneByte(addr);
    return this._readRamByte(addr);
  }

  /**
   * $8087-$8097: 控制字节 (≥$F0) 分发。AND #$0F → $808C 表:
   *   [0] $8098 结束   [1] $80A0 等待输入→状态1   [2] $80B5 JMP $C52D
   *   [3] $80B8 读指针 [4] $80CB 命令分发          [5] $80FD 查询 ram_043C
   */
  private _sceneCtrl(byte: number): void {
    const s = this._store;
    switch (byte & 0x0f) {
      case 0:
        // $8098: 结束 (PLA;PLA;RTS) → 状态机终止
        s.write(KEY_05E3, 0);
        return;
      case 1:
        // $80A0: 等待 ram_001C bit7 → 进入状态 1
        this._waitingInput = true;
        return;
      case 2:
        // $80B5: JMP $C52D (固定区, H5 空) → 返回继续读流
        this._fixedC52D();
        this._sceneSub0();
        return;
      case 3:
        // $80B8: 读 16 位指针 → 继续读流
        this._sceneReadPtr();
        this._sceneSub0();
        return;
      case 4:
        // $80CB: 命令分发 → 继续读流
        this._sceneDispatch();
        this._sceneSub0();
        return;
      case 5:
        // $80FD: 查询 ram_043C bit7 (X 丢弃) → 继续读流
        this._q043C();
        this._sceneSub0();
        return;
      default:
        return;
    }
  }

  /** $80B8-$80CA: 读 2B 指针 → ram_005F/0060, ram_05E5=0 */
  private _sceneReadPtr(): void {
    const s = this._store;
    const ptr = this._getPtr(KEY_005F, KEY_0060);
    const idx = s.read(KEY_05E5);
    this._setPtr(KEY_005F, KEY_0060, readSceneU16(ptr + idx));
    s.write(KEY_05E5, 0);
  }

  /**
   * $80CB-$80E9: 命令分发。
   * 读文本流字节 b → $80ED 表子程序 → X (指针偏移);
   * 新指针 = (ram_005F)+ram_05E5+1+X*2 → ram_005F/0060, ram_05E5=0。
   */
  private _sceneDispatch(): void {
    const s = this._store;
    const ptr = this._getPtr(KEY_005F, KEY_0060);
    const idx = s.read(KEY_05E5);
    const b = readSceneByte(ptr + idx); // $80CE: LDA (ram_005F),Y
    const x = this._querySub(b); // $80D0: JSR $80EA → $C509 → $80ED 表
    const y = idx + x * 2 + 1; // $80D3-$80D9: Y = E5+X*2+1 (SEC;ADC)
    this._setPtr(KEY_005F, KEY_0060, readSceneU16(ptr + y)); // $80DA-$80E2
    s.write(KEY_05E5, 0); // $80E4-$80E6
  }

  /**
   * $80ED 表 (8 项) 查询子程序分发:
   *   [0] $80FD  [1] $8106  [2] $810E  [3] $811E
   *   [4] $8122  [5] $8138  [6] $81CE  [7] $81E4
   * 返回 X (指针表偏移 0-15)。
   */
  private _querySub(b: number): number {
    switch (b) {
      case 0:
        return this._q043C(); // $80FD
      case 1:
        return this._q05FB(); // $8106
      case 2:
        return this._q0600(); // $810E
      case 3:
        return this._q0629(); // $811E
      case 4:
        return this._q0026(); // $8122
      case 5:
        return this._q0027(); // $8138
      case 6:
        return this._q81CE(); // $81CE
      case 7:
        return this._q81E4(); // $81E4
      default:
        console.warn(`[bank24] 未知场景命令 ${b}, 返回 0`);
        return 0;
    }
  }

  /** $81CE: X = 档位(ram_0616>>1): <1→0, <5→1, <6→2, else→3 */
  private _q81CE(): number {
    const v = this._store.read(KEY_0616) >> 1;
    if (v < 1) return 0;
    if (v < 5) return 1;
    if (v < 6) return 2;
    return 3;
  }

  /**
   * $81E4: X = 档位((ram_0034)+7 字节):
   *   <0x19 → 0, <0x36 → 1, else → 2
   * (LDA ram_05FB; EOR #$0B → JSR $C50C 固定区, H5 空)
   */
  private _q81E4(): number {
    const s = this._store;
    s.read(KEY_05FB); // $81E4: LDA ram_05FB; EOR #$0B — 结果仅送 $C50C (H5 空)
    this._fixedC50C(); // $81E9: JSR $C50C
    const ptr = (s.read(KEY_0035) << 8) | s.read(KEY_0034);
    const v = readSceneByte(ptr + 7); // $81F0: LDA (ram_0034),Y (Y=7)
    if (v < 0x19) return 0;
    if (v < 0x36) return 1;
    return 2;
  }

  /** $80FD: X = bit7(ram_043C) ? 1 : 0 */
  private _q043C(): number {
    return this._store.read(KEY_043C) & 0x80 ? 1 : 0;
  }

  /** $8106: X = ram_05FB != 0 ? 1 : 0 */
  private _q05FB(): number {
    return this._store.read(KEY_05FB) !== 0 ? 1 : 0;
  }

  /** $810E: X = ram_0600==0 ? 3 : min(ram_0600-1, 2) */
  private _q0600(): number {
    const v = this._store.read(KEY_0600);
    if (v === 0) return 3;
    return Math.min(v - 1, 2);
  }

  /** $811E: X = ram_0629 */
  private _q0629(): number {
    return this._store.read(KEY_0629);
  }

  /** $8122: X = ram_0026 在区间表 $8131 中的档位 (找不到 → 7) */
  private _q0026(): number {
    const v = this._store.read(KEY_0026);
    const tbl = [0x05, 0x0b, 0x0f, 0x15, 0x16, 0x1a, 0x21];
    for (let i = 0; i < tbl.length; i++) {
      if (v <= tbl[i]) return i; // CMP; BCC(<) 或 BEQ(==) → 返回
    }
    return tbl.length; // 越界 → $8138 读指令字节 $A5, 现实不可达
  }

  /** $8138: ram_0027 → $813D 表 [$8147,$8156,$8147,$8156,$8156] */
  private _q0027(): number {
    const v27 = this._store.read(KEY_0027);
    // [0]→$8147  [1]→$8156  [2]→$8147  [3]→$8156  [4]→$8156
    return v27 === 0 || v27 === 2 ? this._q28v29() : this._q8156();
  }

  /** $8147: X = cmp(ram_0028, ram_0029): == → 2, < → 1, > → 0 */
  private _q28v29(): number {
    const s = this._store;
    const a = s.read(KEY_0028);
    const b = s.read(KEY_0029);
    if (a === b) return 2;
    return a < b ? 1 : 0;
  }

  /**
   * $8156-$81AB: 综合查询。
   * ram_0049 = $81AC[ram_0026] (34 项标志表)。
   * 按 ram_0028 vs ram_0029 分支返回 X (0x0A-0x0F)。
   */
  private _q8156(): number {
    const s = this._store;
    const flags = FLAG_81AC[Math.min(s.read(KEY_0026), FLAG_81AC.length - 1)];
    s.write(KEY_0049, flags); // $8158-$815B
    const a = s.read(KEY_0028);
    const b = s.read(KEY_0029);
    if (a === b) {
      // $8165-$817D: == 分支
      const v27 = s.read(KEY_0027);
      if (v27 === 1) return this._q8156Eq1(flags); // $817E
      // $816E: BIT ram_0049 → V = bit6
      //   $8170: BVC $8174  (bit6=0 → 跳 $8174, 注: 反汇编器误标数据)
      //   $8172: INX          (bit6=1 → 不跳) → 0x0E
      //   $8174: LDA ram_002B; CMP #$23; BNE $817B → 均落 $817B: LDX #$0F
      if (flags & 0x40) return 0x0e;
      return 0x0f;
    }
    if (a < b) {
      // $818D: X=0x0A; ram_0027==4 → 0x0B
      return s.read(KEY_0027) === 4 ? 0x0b : 0x0a;
    }
    // $8197: X = (flags&7)+3; ==3 且 ram_0027==3 → 9
    const x = (flags & 0x07) + 3;
    return x === 3 && s.read(KEY_0027) === 3 ? 0x09 : x;
  }

  /** $817E-$818A: X = bit7(flags) ? 0x0C : (bit6 ? 0x0E : 0x0D) */
  private _q8156Eq1(flags: number): number {
    if (flags & 0x80) return 0x0c;
    return flags & 0x40 ? 0x0e : 0x0d;
  }

  // ──────────────────────────────────────────────
  // 固定区调用 (H5 空实现, 渲染由渲染层驱动)
  // ──────────────────────────────────────────────

  /** 对应固定区 $C533 (HUD 行1 渲染同步) */
  private _fixedC533(): void {
    // H5: 文本流写已直接进入 DataStore, 无需硬件同步
  }

  /** 对应固定区 $C515 (渲染同步等待) */
  private _fixedC515(): void {
    // H5: 同步由渲染层驱动
  }

  /** 对应固定区 $C512 ($800F 场景 bit7=1 分支) */
  private _fixedC512(): void {
    // H5: 固定区逻辑由其他 service 处理
  }

  /** 对应固定区 $C560 (帧循环渲染同步) */
  private _fixedC560(): void {
    // H5: 空
  }

  /** 对应固定区 $C52D ($80B5 控制字节) */
  private _fixedC52D(): void {
    // H5: 空
  }

  /** 对应固定区 $C50C ($81E9 查询辅助) */
  private _fixedC50C(): void {
    // H5: 空
  }

  // ──────────────────────────────────────────────
  // 工具
  // ──────────────────────────────────────────────

  private _getPtr(loKey: string, hiKey: string): number {
    return (this._store.read(hiKey) << 8) | this._store.read(loKey);
  }

  private _setPtr(loKey: string, hiKey: string, ptr: number): void {
    this._store.write(loKey, ptr & 0xff);
    this._store.write(hiKey, (ptr >> 8) & 0xff);
  }
}
