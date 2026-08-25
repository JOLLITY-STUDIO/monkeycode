/**
 * SceneStateMachine — bank00 $8AB3-$8EEF scene handler 翻译
 *
 * 翻译原则（v2）：
 *   - 不模拟 STA ($63),Y 或 RTS 间接调度 32 个 op-code handlers
 *   - 用 SceneState { sceneId, streamPtr, sceneCursor, paletteFade } 替代 RAM $63/$64/$5C/$5D/$5E/$5F
 *   - 每个 handler 改成方法调用
 *
 * 对应 PRG 段（docs/BANK00_ANALYSIS.md §2.2）：
 *   $8AB3: scene data tables (60 字节 tile ranges)
 *   $8AF7: scene handler loader（CHRPATH setup + writeByte 全 RAM 字段）
 *   $8B99-$8BAB: CHR bank loader 决策
 *   $8BB0-$8D1D: scene stream parser（**核心**：6-byte chunk parser + 4 PPU targets）
 *   $8D22-$8DFC: scene 状态机 inner loop（含 BCD physics add via $9BA9/$9BCA）
 *   $8DFF-$8E13: key/entry 调度
 *   $8E15-$8EEF: NT copy / tile decoder（解码 4-byte entry → PPU buffer）
 *
 * 数据表（§5）：
 *   $8AB3: 60-byte tile ranges (bank0 scene data tile base)
 *   $8AEC: cfg lo byte / $8AED: cfg hi byte / $8AEE: cfg id boundary
 *
 * P2 重要：scene 数据流的解析器和状态机是整个比赛引擎的骨架
 */
import type { DataStore } from '../../data/store/DataStore';
import { PpuTransferService } from './PpuTransferService';

/**
 * Scene 状态（PRG $0063-$006B + $5C-$5F 翻译）
 */
export interface SceneState {
  sceneId: number;
  streamPtrLo: number;        // $0063
  streamPtrHi: number;        // $0064
  streamSaveLo: number;       // $0065 (save ptr)
  streamSaveHi: number;       // $0066
  cursorLo: number;           // $005C (NT row ptr)
  cursorHi: number;           // $005D
  secondaryPtrLo: number;     // $005E
  secondaryPtrHi: number;     // $005F
  secondaryCursor: number;    // $0072 (3rd axis counter)
  workOffset: number;         // $0069/$006A (physics add accumulator)
}

/**
 * Scene 4-byte entry 解析结果（PRG $8BB0+ 翻译）
 * - cmdType: $00..$C0 (PPU target select)
 *   - $00 = skip + ret
 *   - $40 = PPU buffer write slow path
 *   - $80 = palette xor path
 *   - $C0 = 4-byte tile write
 * - spriteCount: 1..3 (1=single, 2=double, 3=triple)
 * - tileIdx: tile base index
 */
export interface SceneEntryParse {
  cmdType: number;
  spriteCount: number;
  tileIdx: number;
  paletteAttr: number;       // bits 7-5 = cmd sub-mode, 4-0 = sprite count
  secondaryPtrLo: number;
  secondaryPtrHi: number;
}

/**
 * Bank0 scene data tile range (PRG $8AB3 60 字节翻译)
 * 4 × 15 字节 = 60 字节，描述不同 tile range / channel count
 */
const SCENE_DATA_TILE_RANGES: ReadonlyArray<number> = [
  // tile range low [0..15]
  0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,
  0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x1A,
  // tile range low [16..31]
  0x1B, 0x1C, 0x1D, 0x1E, 0x46, 0x47, 0x48, 0x49,
  0x4A, 0x4B, 0x4C, 0x4D, 0x4E, 0x4F, 0x50, 0x51,
  // tile range high [0..15]
  0x52, 0x53, 0x54, 0x5A, 0x5B, 0x5C, 0x5D, 0x5E,
  0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x5A, 0x5B, 0x5C,
  // tile range high [16..31]
  0x5D, 0x5E, 0x01, 0x0A, 0x14, 0x28, 0x3C, 0x50,
  0x78, 0xF0, 0x00, 0x03, 0x10, 0x04, 0x20, 0x05,
  // trailing 3 bytes
  0x60, 0x06, 0xFF,
];

export class SceneStateMachine {
  private state: SceneState = {
    sceneId: 0,
    streamPtrLo: 0,
    streamPtrHi: 0,
    streamSaveLo: 0,
    streamSaveHi: 0,
    cursorLo: 0,
    cursorHi: 0,
    secondaryPtrLo: 0,
    secondaryPtrHi: 0,
    secondaryCursor: 0,
    workOffset: 0,
  };

  constructor(
    readonly store: DataStore,
    private readonly ppu: PpuTransferService | null = null,
  ) {}

  // ──────────────────────── $8AF7 scene handler loader ────────────────────────

  /**
   * Scene handler 装载（PRG $8AF7-$8BAE 翻译）。
   *
   * ROM 行为：
   *   1. STA $ED (cfg idx)
   *   2. 清 $9/$A/$D/$E/$E/$5B &= #$7F / $77 = $25
   *   3. 调 $C4B9 (bank select) + 清 $0552-$0561 (= 8-byte Y loop)
   *   4. ASL $ED / TAX / ROL → 算 (cfg idx * 2) + $A0xx PTR
   *   5. Y=0 LDA ($63),Y → load scene stream ptr 2-byte
   *   6. LDA ($63),Y → $5C/$5D (= PPU buffer cursor) + 4-byte tile 配置
   *   7. 比较 $5E vs #$09 / BCC / JSR $9071 (BANK) / JMP $8BAB
   *
   * H5 语义：解析 cfg idx → 装载 scene state → 返回结构化结果
   */
  loadHandler(cfgId: number): SceneState | null {
    if (!this.ppu) return null;
    const cfg = this.ppu.resolveSceneCfg(cfgId);
    if (!cfg) return null;
    // 清场字段
    this.state.sceneId = cfg.cfgId;
    this.state.streamPtrLo = cfg.ptrLo;
    this.state.streamPtrHi = cfg.ptrHi;
    this.state.streamSaveLo = cfg.ptrLo;
    this.state.streamSaveHi = cfg.ptrHi;
    this.state.cursorLo = 0;
    this.state.cursorHi = 0;
    this.state.secondaryCursor = 0;
    this.state.workOffset = 0;
    // mode flags $5B &= #$7F
    const b5B = this.store.readByte(0x005b) & 0x7f;
    this.store.writeByte(0x005b, b5B);
    // $77 = $25
    this.store.writeByte(0x0077, this.store.readByte(0x0025));
    return { ...this.state };
  }

  // ──────────────────────── $8BB0 scene stream parser ────────────────────────

  /**
   * Scene 流解析器（PRG $8BB0-$8D1D 翻译占位）。
   *
   * ROM 行为：
   *   1. JSR $9FA8 (wait 1 frame)
   *   2. $63 += 6 / $64 += carry (advance ptr)
   *   3. $5E=$5F JSR $9DEE (multiply helper)
   *   4. $70 = $63 + $EC ; $71 = $64 + $ED (= data ptr)
   *   5. 解析 1 entry (32-bit 命令码 + sprite count + palette attr)
   *   6. 派发到 4 个 PPU target:
   *      - $00 = skip + ret
   *      - $40 = PPU buffer write slow path (调 $8E15)
   *      - $80 = palette xor path
   *      - $C0 = 4-byte tile write (调 $8E15)
   *
   * H5 语义：解析 scene stream buffer → 输出 SceneEntryParse[] 数组
   *
   * @param streamBytes scene 流字节（H5 从 PRG bank 取出 stub）
   * @returns 解析后 entry 数组
   */
  parseSceneStream(streamBytes: ReadonlyArray<number>): SceneEntryParse[] {
    const entries: SceneEntryParse[] = [];
    let off = 0;
    while (off < streamBytes.length) {
      const b1 = streamBytes[off] ?? 0;
      if (b1 === 0xff || b1 === 0xfe) break;
      off++;
      const b2 = streamBytes[off] ?? 0;
      off++;
      // 解析 entry: cmdType = b1 & 0xE0 ; spriteCount = b1 & 0x1F / 8 ; tileIdx = b2
      const cmdType = b1 & 0xe0;
      const spriteCount = ((b1 & 0x1f) >> 3) & 0x07;
      const tileIdx = b2;
      entries.push({
        cmdType,
        spriteCount,
        tileIdx,
        paletteAttr: b1,
        secondaryPtrLo: streamBytes[off] ?? 0,
        secondaryPtrHi: streamBytes[off + 1] ?? 0,
      });
      off += 4; // skip secondary + 2 trailer bytes
    }
    return entries;
  }

  // ──────────────────────── $8D22 state machine inner ────────────────────────

  /**
   * 状态机内部循环（PRG $8D22-$8DFC 翻译占位）。
   *
   * ROM 行为：
   *   1. LDX #$07 JSR $C4B9 (bank select)
   *   2. 读 ($70),Y → 特殊字节路径
   *   3. physics add via $9BA9 / $9BCA（带符号 16-bit 加）
   *   4. BCD accumulator ($7A/$7B $46/$47)
   *
   * H5 语义：每帧推进 physics + scene state
   */
  tickPhysics(entries: ReadonlyArray<SceneEntryParse>): void {
    for (const e of entries) {
      // 等价于 PRG $8D3E-$8DA7：physics add + BCD accumulator
      // 这里只是简单推进 cursor 计数；具体物理由 PlayerMoveService 处理
      if (e.cmdType === 0x40) {
        this.state.workOffset = (this.state.workOffset + e.tileIdx) & 0xff;
      }
    }
  }

  // ──────────────────────── $8E15 NT copy / tile decoder ────────────────────────

  /**
   * NT 复制 + tile 解码（PRG $8E15-$8EEF 翻译占位）。
   *
   * ROM 行为：
   *   1. STY $6C / STX $6B (loop cnt)
   *   2. $65=$63 ; $66=$64 (save ptr)
   *   3. $ED=$6B (loop idx)
   *   4. $73=$5C ; $74=$5D (cursor save)
   *   5. Y=0 LDA ($63),Y JSR $8EF0 (render inner)
   *   6. X=$5C; CLC ADC $6D; STA $5C (cursor advance)
   *   7. 处理 row wrap (AND #$20 → 行 32 字节进位)
   *   8. PLA $6E CLC ADC $63 STA $63 (ptr advance)
   *
   * H5 语义：解析 4-byte NT entry → 落 NT
   */
  decodeAndCopyNT(entries: ReadonlyArray<SceneEntryParse>): void {
    if (!this.ppu) return;
    for (const e of entries) {
      // 等价于 PRG $8E15 inner loop + $8EF0 render inner
      // 占位：实际 NT write 走 PpuTransferService
      this.ppu.commitSprite4([
        e.tileIdx & 0xff,
        e.paletteAttr & 0xff,
        e.secondaryPtrLo & 0xff,
        e.secondaryPtrHi & 0xff,
      ]);
    }
  }

  // ──────────────────────── 访问器 ────────────────────────

  getState(): SceneState {
    return { ...this.state };
  }

  setState(s: SceneState): void {
    this.state = { ...s };
  }
}
