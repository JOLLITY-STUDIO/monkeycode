/**
 * MatchHudService — 比赛 HUD（比分/时间/体力条）
 *
 * 行为翻译（bank24/code_sub.s HUD 渲染 + bank11 NMI 内 HUD 队列）：
 * - refresh() 每帧刷新：读 ram_0468（分钟）/ram_0469（秒）/ram_044E-$045F（双方比分）
 *   → 转 BCD → 写 OAM 字符 tile → 写 NT 缓冲队列
 * - setTimer(min, sec) 写入比赛时间到 ram_0468/0469
 * - setScore(home, away) 写入双方比分
 * - drawStaminaBar(playerSlot) 体力条绘制（按 ram_0620 体力比例）
 *
 * 关键 RAM：
 *   ram_0468/ram_0469     比赛分钟/秒
 *   ram_044E/ram_044F     主场比分
 *   ram_0450/ram_0451     客场比分
 *   ram_0620+slot         各球员体力（0..255 → 进度条 0..32 tile）
 *   OAM 缓冲 $0200-$02FF  字符 tile（HUD 数字字符）
 *
 * 当前：V0.5 stub 实现已落地。
 */
import type { DataStore } from '../../data/store/DataStore';
export declare class MatchHudService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 刷新 HUD 到渲染缓冲（每帧调用）
     *
     * 行为：
     * 1. 读 ram_0468/0469 → 时间
     * 2. 读 ram_044E/0450 → 比分
     * 3. 转换为 BCD 字符（'0'-'9' tile 索引 16-25）
     * 4. 写入 OAM HUD 字符区（$0200 起 12 字节 = 4 字符 × 3 字节）
     *
     * NMI 渲染时通过 $04 字符队列同步刷出。
     */
    refresh(): void;
    /**
     * 写入比赛时间到 ram_0468/0469。
     */
    setTimer(minutes: number, seconds: number): void;
    /**
     * 写入双方比分。
     */
    setScore(home: number, away: number): void;
    /**
     * 数字 → HUD tile 索引（简化为 '0' + digit）。
     * 真实实现应查 CharMap.toTile()。
     */
    private toTileDigit;
    /**
     * 体力条绘制：按体力比例（0..255）映射 0..16 tile。
     * 当前 stub：只更新 ram_0620+slot；NT 缓冲留空（待 V0.5 真实实现）。
     */
    drawStaminaBar(slot: number, stamina: number): void;
    /** 查询当前时间 */
    getTimer(): {
        minutes: number;
        seconds: number;
    };
    /** 查询当前比分 */
    getScore(): {
        home: number;
        away: number;
    };
}
