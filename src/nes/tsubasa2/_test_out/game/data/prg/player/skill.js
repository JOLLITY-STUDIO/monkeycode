"use strict";
/**
 * 技能数据表 (Data/Model 层) — 必杀技/普通技编号 → 名称
 *
 * 来源: CaptainTsubasaVol.II-SuperStrikerROM.txt (ROM Hacking Guide by Whipon)
 *   - Shots Digits    (射门编号)
 *   - Dribbles Digits (盘带编号)
 *   - Passes Digits   (传球编号)
 *   - 1-2s Digits     (双人配合 — 指南仅给 ROM 地址)
 *   - Tackles Digits  (铲球 — 指南仅给 ROM 地址)
 *   - Blocks Digits   (挡球 — 指南仅给 ROM 地址)
 *
 * 射门/盘带/传球编号即 RAM $0431-$0433 (技能菜单) 中存储的值。
 * 1-2s/Tackles/Blocks 指南未提供编号，仅提供 ROM 地址，此处如实保留。
 * 仅供 DataQueryService / MatchService 使用 (bank=service, data=model)。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SKILL_TABLES = exports.SKILL_CATEGORIES = exports.BLOCK_SKILLS = exports.TACKLE_SKILLS = exports.COMBO_SKILLS = exports.PASS_SKILL_MAP = exports.PASS_SKILLS = exports.DRIBBLE_SKILL_MAP = exports.DRIBBLE_SKILLS = exports.SHOT_SKILL_MAP = exports.SHOT_SKILLS = void 0;
// ═══════════════════════════════════════════════════════════════
// 射门 (Shots Digits) — 编号 0x00-0x22
// ═══════════════════════════════════════════════════════════════
exports.SHOT_SKILLS = [
    { id: 0x00, name: 'Normal' },
    { id: 0x01, name: 'Volley' },
    { id: 0x02, name: 'Head' },
    { id: 0x03, name: 'Drive Shot' },
    { id: 0x04, name: 'Drive Bicycle' },
    { id: 0x05, name: 'Falcon Shot' },
    { id: 0x06, name: 'Falcon Volley' },
    { id: 0x07, name: 'Razor Shot' },
    { id: 0x08, name: 'Skylab Huracan' },
    { id: 0x09, name: 'Twin Shot' },
    { id: 0x0A, name: 'Skylab 2X Shot' },
    { id: 0x0B, name: 'Eagle Shot' },
    { id: 0x0C, name: 'Tiger Shot' },
    { id: 0x0D, name: 'Neo Tiger Shot' },
    { id: 0x0E, name: 'Bicycle Kick' },
    { id: 0x0F, name: 'Hyper Bicycle Kick' },
    { id: 0x10, name: 'Jumping Volley' },
    { id: 0x11, name: 'Drive Tiger' },
    { id: 0x12, name: 'Cyclone' },
    { id: 0x13, name: 'Sano Combo' },
    { id: 0x14, name: 'Banana Shot' },
    { id: 0x15, name: 'Buster Shot' },
    { id: 0x16, name: 'Mirage Shot' },
    { id: 0x17, name: 'Mach Shot' },
    { id: 0x18, name: 'Side Wind' },
    { id: 0x19, name: 'Slider Shot' },
    { id: 0x1A, name: 'Cannon Shot' },
    { id: 0x1B, name: 'Fire Shot' },
    { id: 0x1C, name: 'Dyna Head' },
    { id: 0x1D, name: 'Cyclone Head' },
    { id: 0x1E, name: 'Rocket Head' },
    { id: 0x1F, name: 'Red Dragons' },
    { id: 0x20, name: 'Back Shot' },
    { id: 0x21, name: 'Slider Cannon' },
    { id: 0x22, name: 'Double Eel' },
];
/** 射门 ID → 名称 (快速查找) */
exports.SHOT_SKILL_MAP = new Map(exports.SHOT_SKILLS.map(s => [s.id, s.name]));
// ═══════════════════════════════════════════════════════════════
// 盘带 (Dribbles Digits) — 编号 0x00-0x06
// ═══════════════════════════════════════════════════════════════
exports.DRIBBLE_SKILLS = [
    { id: 0x00, name: 'Normal' },
    { id: 0x01, name: 'High Lift' },
    { id: 0x02, name: 'Force Dribble' },
    { id: 0x03, name: 'Fake Dribble' },
    { id: 0x04, name: 'Speed Dribble' },
    { id: 0x05, name: 'Fast Dribble' },
    { id: 0x06, name: 'Super Dribble' },
];
/** 盘带 ID → 名称 (快速查找) */
exports.DRIBBLE_SKILL_MAP = new Map(exports.DRIBBLE_SKILLS.map(s => [s.id, s.name]));
// ═══════════════════════════════════════════════════════════════
// 传球 (Passes Digits) — 编号 0x00-0x03
// ═══════════════════════════════════════════════════════════════
exports.PASS_SKILLS = [
    { id: 0x00, name: 'Normal' },
    { id: 0x01, name: 'Drive Pass' },
    { id: 0x02, name: 'Razor Pass' },
    { id: 0x03, name: 'Top Spin Pass' },
];
/** 传球 ID → 名称 (快速查找) */
exports.PASS_SKILL_MAP = new Map(exports.PASS_SKILLS.map(s => [s.id, s.name]));
// ═══════════════════════════════════════════════════════════════
// 双人配合 (1-2s Digits) — 组合技
// 指南仅提供 ROM 地址 (技能名 tile 图库位置)，未提供编号
// ═══════════════════════════════════════════════════════════════
exports.COMBO_SKILLS = [
    { romAddr: 0x3294, name: 'Toho Combo' }, // 東邦コンビ
    { romAddr: 0x3394, name: 'Gemini Attack' }, // ジェミニ・アタック
    { romAddr: 0x3494, name: 'Eifel Combo' }, // エッフェル・コンビ
    { romAddr: 0x3594, name: 'Golden Combo' }, // ゴールデン・コンビ
];
// ═══════════════════════════════════════════════════════════════
// 铲球 (Tackles Digits) — 指南仅提供 ROM 地址
// ═══════════════════════════════════════════════════════════════
exports.TACKLE_SKILLS = [
    { romAddr: 0x4A94, name: 'Tiger Tackle' },
    { romAddr: 0x4B94, name: 'Razor Tackle' },
    { romAddr: 0x4C94, name: 'Power Tackle' },
];
// ═══════════════════════════════════════════════════════════════
// 挡球 (Blocks Digits) — 指南仅提供 ROM 地址
// ═══════════════════════════════════════════════════════════════
exports.BLOCK_SKILLS = [
    { romAddr: 0x3694, name: 'Face Block' },
    { romAddr: 0x4494, name: 'Power Block' },
];
// ═══════════════════════════════════════════════════════════════
// 技能类型聚合 (供菜单编辑/技能渲染使用)
// ═══════════════════════════════════════════════════════════════
/** 全部技能类别 (菜单编辑 $0430: Qty / $0431-$0433: Shot1-3 等) */
exports.SKILL_CATEGORIES = {
    SHOT: 'shot',
    DRIBBLE: 'dribble',
    PASS: 'pass',
};
/** 技能类别 → 技能表 (仅含编号类技能) */
exports.SKILL_TABLES = {
    [exports.SKILL_CATEGORIES.SHOT]: exports.SHOT_SKILLS,
    [exports.SKILL_CATEGORIES.DRIBBLE]: exports.DRIBBLE_SKILLS,
    [exports.SKILL_CATEGORIES.PASS]: exports.PASS_SKILLS,
};
