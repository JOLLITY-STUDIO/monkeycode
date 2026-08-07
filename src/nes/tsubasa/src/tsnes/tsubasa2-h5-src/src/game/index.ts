/**
 * 天使之翼2 — 游戏服务目录索引
 *
 * 每个 PRG Bank 翻译为一个 Service，对外暴露业务接口：
 *
 *   Bank 00 → BootService      (系统初始化 & 标题菜单)
 *   Bank 01 → DataQueryService (球员/队伍数据查询)
 *   Bank 02 → SceneService     (场景控制器 & 场地渲染)
 *   ... 待翻译
 *   Bank 26 → MatchEngineService (比赛核心引擎)
 *   Bank 30 → CoreSystemService  (核心系统库, FIXED @ $C000)
 *   Bank 31 → InterruptService   (中断 & 工具, FIXED @ $E000)
 */

export { BootService } from './boot';
export { DataQueryService } from './data-query';
