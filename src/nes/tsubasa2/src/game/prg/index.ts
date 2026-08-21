/**
 * 天使之翼2 — PRG (翻译后的 Bank 类 + 原始字节数据)
 *
 * 每个 PRG Bank = 一个 Service/Bank 类，对外暴露业务接口。
 * H5 不需要 MMC3 bank 切换，直接 import 并调用对应 Bank 的方法。
 *
 * 已翻译:
 *   Bank 00 → Bank00Service (核心系统服务: NT/PPU Buffer/调色板/场景/主循环)
 *   Bank 01 → DataQueryService (球员/队伍数据查询 + 选项屏幕管理)
 *   Bank 02 → Bank02Service (场景控制器: RESET 入口, 8路入口分发表)
 *   Bank 24 → Bank24HudService (HUD 文本流渲染 + 精灵加载)
 *   Bank 11 → Bank11Service (比赛回合逻辑 PT1: 滚动控制/脚本处理/精灵组写入, 差分验证 10064/0)
 *   Bank 27 → Bank27Service (精灵/场景动画数据加载 + 动画帧推进, 差分验证 7274/0)
 *   Bank 28 → Bank28MatchService (比赛对阵/阵型/等级配置)
 *   Bank 30 → Bank30Service (硬件初始化)
 *   Dispatch → DispatchService (真实 RESET 分发链: $C400/$C64E/$CEFE/$A200)
 *
 * 翻译中 (结构完成，handler/数据 持续迭代):
 *   Bank 12 → Bank12AudioService (音频引擎: APU 模拟 + BGM/SFX 数据)
 *   Bank 26 → MatchEngineService (比赛核心引擎)
 *   Bank 31 → InterruptService (中断/NMI 服务)
 *
 * 已翻译 (完整实现):
 *   Bank 16 → Bank16Service (特殊动作/技能)
 *   Bank 18 → Bank18Service (剧情场景主控制器)
 *   Bank 19 → Bank19Service (剧情场景精灵/文字渲染库)
 *   ResultController → 赛果场景 (RESULT 路由)
 *   PasswordController → 密码输入场景 (PASSWORD 路由)
 *   OpeningSceneController → BOOT 开场场景 (TECMO Theater)
 *   Bank 20 → Bank20Service (比赛辅助: 计时状态机/精灵渲染/计分板)
 *   Bank 22 → Bank22Service (数据+代码混合, 精灵生成器)
 *   Bank 29 → Bank29RosterService (球员名单)
 */

// ── Bank 类 (code) ──────────────────────────────
export { Bank00Service } from './code/bank00/bank00_core';
export { Bank02Service } from './code/bank02_scene';
export { Bank30Service } from './code/bank30_init';
export { DataQueryService } from './code/bank01_data-query';
export { Bank12AudioService, SE_POINTER_TABLE, BGM_DATA_MAP } from './code/bank12_audio';
export type { IAudioOutput, ApuWriteEvent, ChannelType } from './code/bank12_audio';
export { OpeningSceneController } from './code/bank00/scene_opening.controller';
export type { OpeningDisplayState } from './code/bank00/scene_opening.controller';
export { ResultController } from './code/bank00_result.controller';
export { PasswordController, PASSWORD_DISPATCH_TABLE } from './code/bank02_password';
export { MatchEngineService } from './code/bank26_match';
export { Bank24HudService } from './code/bank24_hud';
export { Bank28MatchService } from './code/bank28_match';
export { InterruptService } from './code/bank31_interrupt';
export type { BankConfig } from './code/bank31_interrupt';
export { Bank11Service } from './code/bank11_match-turn';
export { Bank16Service } from './code/bank16_skills';
export { Bank19Service } from './code/bank19_auxiliary';
export { Bank18Service, StoryChapter } from './code/bank18_story';
export { Bank20Service } from './code/bank20_match-aux';
export { Bank22Service } from './code/bank22_hybrid';
export { Bank27Service } from './code/bank27';
export { Bank29RosterService } from './code/bank29_roster';

// 真实 RESET 分发链 ($C400/$C64E/$CEFE/$A200)
export { DispatchService, TaskIndex } from './code/dispatch';

// ── 原始字节数据 (data, 供 bankpage/调试浏览) ─────
export { NES_PRG_ROM, PRG_ROM_SIZE, PRG_BANK_SIZE } from './data/index';

// todo: Tsubasa2 游戏主类 (启动入口) — 旧 './Tsubasa2' 引用已断, 待迁移到启动层
