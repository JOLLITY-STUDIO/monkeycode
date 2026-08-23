/**
 * MatchSceneService — bank19 比赛场景辅助逻辑 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 19
 *
 * 职责: 比赛场景切换 + 脚本引导 + 精灵属性设置 + 比赛事件分派。
 *   入口 $9000: 设 $0441=9 (场景bank号=bank09), 通过 $0088/$0089 指针 ($B467) 读脚本流。
 *   循环 $902D: 逐字节读脚本, A>=$E0 走高字节事件, A<$E0 走低字节精灵设置。
 *   $9043: 低字节子程 (精灵属性/坐标设置, 清 $04A5 区, 填精灵表)
 *   $915A: 高字节子程 → $B160: SEC; SBC #$E0; JSR $C509 查跳转表 ($116C 起 7+1 项)
 *   $9339: 指针推进 (ram_008A 加到 ram_0088, 归零 ram_008A)
 *   $9349: 比赛初始化 (计分板/精灵/调色板, 清 $046F 区, 填 $0540 区)
 *   $9405: 精灵批量初始化 (清 $04A5 区, 设精灵基址, 循环填表)
 *
 * 事件分派表 (字节已验证, 跳转表在 bank19 off $116C):
 *   $E0 → $B1A6 精灵批初始化 (JSR $C52D) + 参数→$C54E + 清 $0011/$0012/$000D/$000E/$05D2 + 填 $0557/$0558=$FF
 *   $E1 → $B1E0 逐字节帧等待 (读 N, 每非 $01 字节 1 帧, 循环减到 0)
 *   $E2 → $B1F3 3 字节玩家写入 (X/值/阶段号; 阶段<$0B→$002A=X 否则 $002B=X; JSR $C50C; 写 ($0034))
 *   $E3 → $B218 JMP $B349 比赛初始化 (matchInit9349)
 *   $E4 → $B21B 读字节→ram_008B (精灵索引)
 *   $E5 → $B224 读字节 0-3 → JSR $C509 调色板子分派 ($B23E 复制 / $B246 复制+渐显 / $B2A6 渐隐 / $B2DB 渐显)
 *   $E6 → $B235 ram_063F |= $40 (切 $90AF 精灵连续模式)
 *   $FC → $B333 LDA #$80; STA $0515; RTS (等精灵批完成)
 *
 * 消费方: bank26 (比赛核心引擎) 切 bank19 执行。
 * 数据: src/game/prg/data/tables/match-scene-table.ts (脚本流 MATCH_SCENE_SCRIPT)。
 * 协程: $C515 = 让出 (H5 版用帧计数模拟, 每帧推进一步)。
 *
 * 命名规范: 旧名 Bank19Service → 新名 MatchSceneService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';
export declare class MatchSceneService {
    protected _store: DataStore;
    protected _system: GameSystemService;
    constructor(store: DataStore, system: GameSystemService);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    /** 读 16 位指针 */
    protected rdPtr(lo: number, hi: number): number;
    /** 读 16 位指针 ($0088/$0089) + Y 偏移 — 实际 asm: LDA ($0088),Y */
    private readPtrY;
    /**
     * $9000 入口: 比赛场景初始化。
     * 设 RAM + 指针 + 场景bank号, 启动脚本循环。
     */
    matchSceneInit(): void;
    /**
     * $902D 循环: 从 bank09 逐字节读, 按值分派。
     * 协程让出由 $C515 控制, H5 版每帧推进一步。
     */
    private matchSceneLoop;
    /**
     * $9043 低字节子程 (A < $E0): 精灵属性/坐标设置。
     * 检查 ram_063F bit6, bit6=1 走 $90AF, bit6=0 走 $904B。
     */
    matchAuxLow(): void;
    /**
     * $9092-$90A7: 循环读 bank09 数据填精灵表。
     * LDY $008A; LDA ($0088),Y; CMP #$E0; BCS $90A9 (退出)
     * JSR $C524; STA $04CB,X; TYA; STA $04A8,X; INX; INC $008A; BNE $9092
     */
    private fillSpriteTable;
    /**
     * $90AF-$9124: bit6=1 的精灵连续模式。
     * 循环 (每帧处理一个精灵):
     *   $90AF: LDY $008A; LDA ($0088),Y; CMP #$E0; BCC $90B8; RTS (≥$E0 结束整段)
     *   $90B8: INC $008A; PHA; LDA #$01; JSR $C515 (协程让出, 等 $0515=0)
     *   $90C5: $0515=1; 清 $04AD/$003A/$04A5/$04A9
     *   $90D8: $008B 算坐标 (LSR/ROR 链) → $04A7/$04AB/$04A6/$04AA
     *   $90FB: PLA; JSR $C524 → $04AC; STY $04A8; $0515=$80
     *   $910A-$911B: cnt=0,2,4,6 循环调 sub9127($B127) + 协程让出
     *   $911D: $008B += 8; $9124: JMP $B0AF (回到 $90AF 循环)
     */
    private spriteSetup90AF;
    /**
     * $9127-$9159: 精灵位置计算 (设 $02F8-$02FF 区)。
     * LDA $008B; AND #$07; ASL×4; CLC; ADC #$7C; STA $02F8; ADC #$08; STA $02FC
     * LDA $008B; AND #$F8; CLC; ADC $003A; STA $02FB; STA $02FF
     */
    private sub9127;
    /**
     * $915A 高字节子程 (A >= $E0): 比赛事件分派。
     * $B15A: JSR $B160; JMP $B339 (指针推进)
     * $B160: SEC; SBC #$E0; JSR $C509 → 查跳转表 (off $116C, 7+1 项, 字节已验证)
     * 跳转表: $E0→$B1A6 / $E1→$B1E0 / $E2→$B1F3 / $E3→$B218 / $E4→$B21B /
     *         $E5→$B224 / $E6→$B235 / $FC→$B333
     */
    matchAuxHigh(a: number): void;
    /**
     * $9339 指针推进: ram_008A 加到 ram_0088/0089, ram_008A 归零。
     * LDA $008A; CLC; ADC $0088; STA $0088; BCC $9344; INC $0089
     * LDA #$00; STA $008A; RTS
     */
    private advancePointer;
    /**
     * 事件0 $B1A6: JSR $C52D (精灵批初始化); LDY $008A; INC; LDA($0088),Y → JSR $C54E;
     * LDA#$01; JSR $C515; 等 $0516=0; 清 $0011/$0012/$000D/$000E/$05D2;
     * X=0: $0558,X=$FF; $0557,X=$FF; X+=$15 直到 X=$7E。
     */
    private event0;
    /**
     * 事件1 $B1E0: 读字节 N; 循环 {LDA#$01; JSR $C515; SEC; SBC #$01; BNE} → 等 N 帧。
     */
    private event1;
    /**
     * 事件2 $B1F3: 3 字节 (X/值/阶段号):
     * LDY $008A; LDA→TAX; INY; LDA→PHA(值); INY; LDA(阶段号); INY; STY $008A;
     * CMP #$0B; BCS → $002B=X 否则 $002A=X; JSR $C50C; PLA; LDY #$00; STA ($0034),Y。
     */
    private event2;
    /**
     * 事件4 $B21B: INC $008A; LDA ($0088),Y; STA $008B (精灵索引)。
     */
    private event4;
    /**
     * 事件5 $B224: INC $008A; LDA ($0088),Y; JSR $C509 → 调色板子分派 (内嵌表 4 项):
     *   0 → $B23E: $0472=$0F; JMP $B2F7 (填 $046F 每 4 字节 $0F)
     *   1 → $B246: $0472=$30; $046F→$0408 (0x20B); JSR $B310 整理; 等 $30 帧; 渐显
     *   2 → $B2A6: 渐隐
     *   3 → $B2DB: 渐显
     */
    private event5;
    /**
     * 事件6 $B235: LDA $063F; ORA #$40; STA $063F (切 $90AF 精灵连续模式)。
     */
    private event6;
    /**
     * $FC 事件 $B333: LDA #$80; STA $0515; RTS (等精灵批完成标志)。
     */
    private eventFC;
    /**
     * $B23E: LDA #$0F; STA $0472; JMP $B2F7 (填 $046F 每 4 字节 $0F, 然后刷新+让出)。
     */
    private subB23E;
    /**
     * $B246: LDA #$30; STA $0472; $046F→$0408 (0x20B); JSR $B310 整理;
     * LDA #$30; JSR $C515 (等 $30 帧); 渐显序列 (step $20→$10→$00, 每步 5 帧)。
     */
    private subB246;
    /**
     * $92A8-$92DA: 渐隐调色板循环。
     *   $92A8: PHA (step); $92A9: LDA #$02; JSR $C515 (协程让出)
     *   $92AE: PLA; STA $003A (step → $003A)
     *   $92B1: X=0→$1F: TXA; AND #$03; BEQ $92C8 (仅处理 X&3 != 0)
     *          LDA $046F,X; AND #$0F; ORA $003A; LDY $003A; BNE $92C5 (step!=0 存)
     *          LDA #$0F (step==0 存 $0F); STA $046F,X
     *   $92CD: JSR $C533; $92D3: step-$10; $92D8: BPL $92A8 (循环)
     */
    sub92A8(): void;
    /**
     * $92DD-$92F6: 渐显调色板循环 (类似 $92A8 但递增)。
     */
    sub92DD(): void;
    /**
     * $92F7-$930F: 填 $046F 区 (每4字节写 A, 然后协程让出)。
     * LDX #$00; STA $046F,X; INX×4; CPX #$20; BNE; JSR $C533; LDA #$01; JSR $C515; RTS
     */
    private sub92F7;
    /**
     * $9310: 整理 $046F 区 (AND #$0F; ORA #$30; CMP #$3F; 改 $30→$30), JSR $C533, 协程让出。
     */
    sub9310(): void;
    /**
     * $9335: ram_0515=$80; RTS (设等待标志)。
     */
    sub9335(): void;
    /**
     * $9349: 比赛初始化。
     * 调 $B2A6 (sub92A8 渐隐), 设 ram_046B=1, 清 ram_004B/0517/053C,
     * 设 ram_053A=$80, ram_004A=$24, 调 $B406 (精灵渲染), 设 PPU CTRL,
     * 调 $C530 (NT 填充), 调 $C533, 设 $0494-$0497, 设 $0490/$0491, 填 $0540 区,
     * 协程让出, 渐显计分板。
     */
    matchInit9349(): void;
    /**
     * $93CB-$93FF: 比赛初始化连续循环。
     *   $93C7: $008A=0; $93CB: 让出1帧; $93D0: $008A += $60; $93D7: BCC $93CB (累加到进位)
     *   $93D9: DEC $054F; $93DC: DEC $004A; $93DE: BEQ $93FA (为0 → 终止让出循环)
     *   $93E0-$93EE: $004A==$14→$0470=$06; $004A==$08→$0470=$16; 否则回 $93CB
     *   $93F1: JSR $C533; $93F7: JMP $B3CB (回到 $93CB)
     *   $93FA-$93FF: 终态 (让出1帧; JMP $B3FA)
     */
    private matchInitLoop;
    /**
     * $9405: 精灵批量初始化。
     * PHA; 清 ram_008B/008A; 协程让出; 清 $04A5 区;
     * 设 $04A5=$20, $04A6=ram_008A, $04A7=ram_008B|A;
     * ram_0515=$80; ram_008A += $20; ram_008B 进位; 循环直到 ram_008B >= 4。
     */
    sub9405(a: number): void;
    /** $C515 协程让出 (等 ram_0515=0) — 调 GameSystemService.coroutineYield */
    private yieldAndWait;
    /** $C515 协程让出 (A=#$02) — 2帧等待 */
    private yieldAndWait2;
    /** $C515 协程让出 (A=指定帧数) */
    private yieldCount;
    /** $C524 坐标变换 — 调 GameSystemService.subC524 */
    private transformCoord;
    /** $C54E 子程 — 调 GameSystemService.subC54E ($CBB0: 设精灵批等待标志) */
    private subC54E;
    /** $C52D 精灵批初始化 — 调 GameSystemService.subC52D ($CC46) */
    private subC52D;
    /** $C50C 查表 — 调 GameSystemService.subC50C (比赛阶段→RAM玩家指针) */
    private subC50C;
    /** $C533 NT 刷新 — 调 GameSystemService.subC533 */
    private subC533;
    /** $C530 调色板拷贝 — 调 GameSystemService.subC530 ($CC02: $FBCC+A*12 → $046F+X) */
    private subC530;
    /** $B406 = $9406 精灵批量初始化 (已翻译为 sub9405, 此处别名) */
    private subB406;
    /** $B3FA = $93FA: 协程让出后循环 (LDA #$01; JSR $C515; JMP $B3FA) */
    private subB3FA;
    /** 比赛帧推进 (由 bank26 比赛核心引擎调用) */
    update(frame: number): void;
}
export default MatchSceneService;
