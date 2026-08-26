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
    streamPtrLo: number;
    streamPtrHi: number;
    streamSaveLo: number;
    streamSaveHi: number;
    cursorLo: number;
    cursorHi: number;
    secondaryPtrLo: number;
    secondaryPtrHi: number;
    secondaryCursor: number;
    workOffset: number;
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
    paletteAttr: number;
    secondaryPtrLo: number;
    secondaryPtrHi: number;
}
export declare class SceneStateMachine {
    readonly store: DataStore;
    private readonly ppu;
    private state;
    constructor(store: DataStore, ppu?: PpuTransferService | null);
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
    loadHandler(cfgId: number): SceneState | null;
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
    parseSceneStream(streamBytes: ReadonlyArray<number>): SceneEntryParse[];
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
    tickPhysics(entries: ReadonlyArray<SceneEntryParse>): void;
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
    decodeAndCopyNT(entries: ReadonlyArray<SceneEntryParse>): void;
    getState(): SceneState;
    setState(s: SceneState): void;
}
