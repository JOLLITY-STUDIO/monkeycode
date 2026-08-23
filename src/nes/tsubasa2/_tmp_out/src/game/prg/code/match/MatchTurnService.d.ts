/**
 * MatchTurnService — bank11 回合/滚动/精灵组 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 11
 *
 * 职责:
 *   入口 $800C → $8083: 水平滚动状态机 (读 $05D4/$05D7/$05D8, 算滚动量, 写 $005A, 协程让出)
 *   入口 $8003 → $8083: 垂直滚动状态机 (类似水平, 算 $005A 含 NT 行偏移)
 *   入口 $8006 → $84A1: 精灵组写入 (从 data_tables.s 精灵描述符流写 OAM)
 *   入口 $8009 → $814C: 脚本处理 (读 $0524 索引, 查 $0052 指针, 执行描述符流)
 *   $810C: 取负坐标变正 (X/Y 取补)
 *   $812B: 查滚动表算 NT 偏移 ($8B64+0x64)
 *   $81BC: 精灵组描述符分派 ($81D5 表 + $832B)
 *   $82FE: 球场坐标→NT tile 索引 (X=$0637-0x50, Y=$0635-0x30)
 *
 * RAM 关键:
 *   $0052/$0053: 脚本/数据指针 (lo/hi)
 *   $0058/$0059: 数据流指针
 *   $005A: 当前滚动量 (列偏移)
 *   $005B: 滚动方向标志
 *   $005D: 当前精灵组 id
 *   $0524: 脚本索引 ($FF=无)
 *   $05D4/$05D5: 当前滚动 X/Y (有符号 16 位)
 *   $05D7: 滚动方向位 (bit7=垂直)
 *   $05D8: 目标滚动位置
 *   $05FB: 比赛阶段 ($0B=进攻方向基准)
 *
 * 命名规范: 旧名 Bank11Service → 新名 MatchTurnService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';
export declare class MatchTurnService {
    protected _store: DataStore;
    protected _system: GameSystemService;
    /** 模拟 6502 X 寄存器 (跨方法传递, 如 sub82FE → sub81CC) */
    protected _regX: number;
    constructor(store: DataStore, system: GameSystemService);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    protected wrPtr(lo: number, hi: number, v: number): void;
    /** $800C → $8083: 水平滚动状态机 */
    horizontalScroll(): void;
    /** $8003 → $8083: 垂直滚动状态机 */
    verticalScroll(): void;
    /** $8006 → $84A1: 精灵组写入 */
    spriteGroupWrite(): void;
    /** $8009 → $814C: 脚本处理 */
    scriptProcess(): void;
    private scrollStateMachine;
    private sub810C;
    private sub812B;
    private sub814C;
    /** $819C: 脚本处理结束 (设 $0516 bit4, 返回) */
    private endScriptProcess;
    private sub81A7;
    private sub81BC;
    private sub85C2;
    /** $8327: 命令0 — LDY #$02; LDA ($0052),Y; → sub832B */
    private sub8327;
    /** $83E7: 命令1 — LDA #$C0; STA $05D1; → sub840A */
    private sub83E7;
    /** $83FF: 命令2 — LDA #$C2; STA $05D1; JSR $84CF; JSR $845C; → sub840A */
    private sub83FF;
    /** $8358: 命令3 — JSR $84D9; LDA #$80; STA $05D1; LDY #$04; → $8329 */
    private sub8358;
    /** $8377: 命令4 — JSR $84CF; 读脚本[4]→$05E2; $05E1=0; 复杂精灵组设置 */
    private sub8377;
    /** $8364: 命令5 — JSR $84D9; LDA #$80; STA $05D1; Y=4或5; → $8329 */
    private sub8364;
    /** $83D2: 命令6 — JSR $84D9; LDY #$04; LDA ($0052),Y; STA $05E2;
     *   LDA #$00; STA $05E1; JSR $847F; JMP $8386 */
    private sub83D2;
    /** $83EE: 命令8 — LDA #$C2; STA $05D1; JSR $84CF; JSR $845C;
     *   JSR $847F; JMP $840D */
    private sub83EE;
    /** $840A: JSR $84CF; → $840D 共享 */
    private sub840A;
    /** $840D: 精灵组后处理共享代码 */
    private sub840D;
    /** $8386: sub8377 从 $8386 开始的代码体 */
    private sub8386Body;
    /** $81CC: 精灵组0 — JSR $82F7; LDA $81D5,X; JMP $832B */
    private sub81CC;
    /** $8276: 精灵组1 — JSR $82F7; LDA $827F,X; JMP $832B */
    private sub8276;
    /** $824D: 精灵组2 — 球员坐标查表 */
    private sub824D;
    /** $82F7: 精灵组3 — LDY $05FB; JSR $82FE; RTS */
    private sub82F7;
    /**
     * $832B: 精灵组后处理 — STA $05CC; LDY $05CD; JSR $8525;
     *   设 $05CB=1; $05CE; $05CD; 清 $05DB/$05DC/$05DD
     */
    private sub832B;
    /** 读脚本偏移 Y 处字节 */
    private readScriptByte;
    /** $84CF: 写精灵坐标 (无翻转) */
    private sub84CF;
    /** $84D9: 写精灵坐标 (带翻转) */
    private sub84D9;
    /** $84F4: 读精灵坐标 */
    private sub84F4;
    /** $845C: 精灵尺寸/属性计算 */
    private sub845C;
    /** $847F: 读脚本偏移跳转 (更新 $0052/$0053 指针) */
    private sub847F;
    /** $8493: 精灵组后处理 (计算 $005B/$005C = $0052/$0053 + 5) */
    private sub8493;
    /** $82FE: 球场坐标→NT tile 索引 */
    private sub82FE;
    /** $8525: 精灵组写入 (从精灵描述符流写 OAM) */
    private sub8525;
    /** $84A1: 精灵组写入入口 (写 $0020 标志 + $004B + $046B) */
    private sub84A1;
    /** $86D3: 精灵组描述符解析 (查 $8B42 表, 写 $05CA) */
    private sub86D3;
    private readMemByte;
}
export default MatchTurnService;
