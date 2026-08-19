/**
 * 天使之翼2 — 游戏服务目录索引
 *
 * 每个 PRG Bank = 一个 Service 类，对外暴露业务接口。
 * H5 不需要 MMC3 bank 切换，直接 import 并调用对应 Service 的方法。
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
 *
 * 翻译中 (结构完成，handler/数据 持续迭代):
 *   Bank 12 → Bank12AudioService (音频引擎: APU 模拟 + BGM/SFX 数据)
 *   Bank 26 → MatchEngineService (比赛核心引擎)
 *   Bank 31 → InterruptService (中断/NMI 服务)
 *
 * 已翻译 (完整实现, 不再属于骨架):
 *   Bank 16 → Bank16Service (特殊动作/技能)
 *   Bank 18 → Bank18Service (剧情场景主控制器: 章节→Bank19 数据流偏移调度, 骨架已接入 STORY 路由, 数据表建模 TODO)
 *   Bank 19 → Bank19Service (剧情场景精灵/文字渲染库: 数据流驱动/控制码分发/精灵渲染/场景重置, 差分验证 5600/0, 已接入 STORY 路由)
 *   ResultController → 赛果场景 (RESULT 路由: A→TITLE, 玩链路闭环)
 *   PasswordController → 密码输入场景 (PASSWORD 路由: Bank02 $A484 分发+$A4C0 主逻辑, 骨架已接入)
 *   Bank 20 → Bank20Service (比赛辅助: 计时状态机×2/精灵渲染/动画偏移/计分板, 差分验证 17014/0, 已接入 MATCH 路由 frameTick)
 *   Bank 22 → Bank22Service (数据+代码混合, 精灵生成器)
 */

export { Bank00Service } from './service/bank00/bank00_core.service';
export { Bank02Service } from './service/bank02_scene.service';
export { Bank30Service } from './service/bank30_init.service';
export { DataQueryService } from './service/bank01_data-query.service';
export { Bank12AudioService, SE_POINTER_TABLE, BGM_DATA_MAP } from './service/bank12_audio.service';
export type { IAudioOutput, ApuWriteEvent, ChannelType } from './service/bank12_audio.service';
export { OpeningSceneController } from './service/bank00/scene_opening.controller';
export type { OpeningDisplayState } from './service/bank00/scene_opening.controller';
export { ResultController } from './service/bank00_result.controller';
export { PasswordController, PASSWORD_DISPATCH_TABLE } from './service/bank02_password.service';
export { MatchEngineService } from './service/bank26_match.service';
export { Bank24HudService } from './service/bank24_hud.service';
export { Bank28MatchService } from './service/bank28_match.service';
export { InterruptService } from './service/bank31_interrupt.service';
export type { BankConfig } from './service/bank31_interrupt.service';
export { Bank11Service } from './service/bank11_match-turn.service';
export { Bank16Service } from './service/bank16_skills.service';
export { Bank19Service } from './service/bank19_auxiliary.service';
export { Bank18Service, StoryChapter } from './service/bank18_story.service';
export { Bank20Service } from './service/bank20_match-aux.service';
export { Bank22Service } from './service/bank22_hybrid.service';
export { Bank27Service } from './service/bank27_minimal.service';
export { Bank29RosterService } from './service/bank29_roster.service';

// 场景路由器 (BOOT/TITLE/MEETING/MATCH/RESULT 全路由)
export { BootService, BOOT_KEYS } from './boot';
