/**
 * 天使之翼2 — 游戏服务目录索引
 *
 * 每个 PRG Bank = 一个 Service 类，对外暴露业务接口。
 * H5 不需要 MMC3 bank 切换，直接 import 并调用对应 Service 的方法。
 *
 * 已翻译:
 *   Bank 00 → Bank00Service (核心系统服务: NT/PPU Buffer/调色板/场景/主循环)
 *   Bank 02 → Bank02Service (场景控制器: RESET 入口 $A21B, 场景流转)
 *   Bank 30 → Bank30Service (硬件初始化: $C64E ~ $C400)
 *
 * 待翻译:
 *   Bank 01 → DataQueryService (球员/队伍数据查询)
 *   Bank 26 → MatchEngineService (比赛核心引擎)
 *   Bank 31 → InterruptService (中断/NMI)
 */

export { Bank00Service } from './bank00.service';
export { Bank02Service } from './bank02.service';
export { Bank30Service } from './bank30.service';
export { DataQueryService } from './data-query';

// 旧版兼容 (待移除)
export { BootService } from './boot';
