/**
 * player-names-jp.ts — 多语言球员名表 (日文/中文/英文)
 *
 * 数据源: docs/CaptainTsubasaVol.II-SuperStrikerROM修改参考.txt §Character Digits
 *   格式: ID,EnglishName(Katakana / 中文)
 *   例: 01,Tsubasa（大空 翼 / 大空翼）
 *
 * 用于原生日文版游戏 (FC-T6J) 展示真实角色名。
 * 0x00 = all-zero sentinel (不列)
 *
 * @only-metadocs 这是文档/UI 数据, 不参与游戏逻辑
 */
export interface PlayerNameJP {
    /** 英文名 (romaji) */
    readonly en: string;
    /** 日文名 (汉字 / 假名) */
    readonly ja: string;
    /** 中文名 (繁体) */
    readonly zh: string;
    /** GK 守门员标志 */
    readonly gk?: boolean;
}
export declare const PLAYER_NAMES_JP: Readonly<Record<number, PlayerNameJP>>;
/** 三种语言查询 */
export declare function getNameJP(id: number, lang?: 'en' | 'ja' | 'zh'): string;
/** 全部三种语言组合 */
export declare function getNameAll(id: number): string;
