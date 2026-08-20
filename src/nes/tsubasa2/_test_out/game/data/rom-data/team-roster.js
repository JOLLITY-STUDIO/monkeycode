"use strict";
/**
 * 队伍配置数据 (真实 ROM 提取)
 *
 * 来源: ROM修改参考.txt Team Edit 段
 *   Sao Paulo: ROM 0x4A57 (11 人)
 *   Nankatsu: ROM 0x4A63 (11 人)
 *   Japan: ROM 0x4A6F (11 人) + 替补 0x4A7A (12 人)
 *   Brazil League: Corinthians 0x3BB1A / Gremio 0x3BB28 / Palmeiras 0x3BB36 / Santos 0x3BB44 / Flamengo 0x3BB52
 *   阵型战术: ROM 0x4A62/0x4A6E/0x4A84 (高低4位=防守战术+阵型)
 *
 * 数据来源文档: docs/rom-data-locations.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPU_TEAMS_BRAZIL = exports.PLAYER_TEAMS = void 0;
exports.getCpuTeam = getCpuTeam;
/** 玩家队配置 */
exports.PLAYER_TEAMS = [
    {
        name: 'Sao Paulo',
        starters: [16, 12, 19, 18, 21, 17, 22, 0, 34, 27, 28],
        formation: 20,
    },
    {
        name: 'Nankatsu',
        starters: [29, 23, 24, 17, 26, 1, 21, 25, 31, 16, 18],
        formation: 19,
    },
    {
        name: 'Japan',
        starters: [22, 30, 32, 33, 15, 1, 0, 0, 0, 0, 0],
        bench: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
        formation: 0,
    },
];
/** CPU 队伍 (Brazil League) */
exports.CPU_TEAMS_BRAZIL = [
    { name: 'Corinthians', starters: [38, 15, 32, 0, 126, 127, 128, 128, 176, 31, 30] },
    { name: 'Gremio', starters: [40, 15, 33, 0, 129, 130, 131, 131, 145, 31, 29] },
    { name: 'Palmeiras', starters: [42, 15, 3, 0, 132, 133, 134, 134, 96, 30, 31] },
    { name: 'Santos', starters: [44, 2, 45, 15, 0, 0, 135, 136, 137, 137, 145] },
    { name: 'Flamengo', starters: [46, 9, 47, 15, 33, 0, 138, 139, 140, 140, 160] },
];
/** 按赛事索引获取 CPU 队伍 (里约杯 1-5 场) */
function getCpuTeam(roundIndex) {
    return exports.CPU_TEAMS_BRAZIL[roundIndex] ?? null;
}
