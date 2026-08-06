/**
 * ═══════════════════════════════════════════════
 * 必殺技数据库 — Captain Tsubasa II Special Skills
 * ═══════════════════════════════════════════════
 *
 * 数据来源: docs/manual-chapters/15-guts-table.md
 * 这是从说明书原文中提取的全部必殺技和通常命令数据。
 *
 * 技能分为以下类别:
 *   - SUPER_SHOT:      必殺シュート (15种)
 *   - SUPER_DRIBBLE:   必殺ドリブル (2种)
 *   - SUPER_PASS:      必殺パス (2种)
 *   - SUPER_COMBI:     必殺コンビプレイ (3种)
 *   - SUPER_TACKLE:    必殺タックル (4种)
 *   - SUPER_PASSCUT:   必殺パスカット (1种)
 *   - SUPER_BLOCK:     必殺ブロック (3种)
 *   - SUPER_SAVE:      必殺セービング (1种)
 *   - NORMAL_COMMAND:  通常命令 (18种)
 */

// ═══════════════════════════════════════════════
// 枚举定义
// ═══════════════════════════════════════════════

/** 必殺技类别 */
export enum SkillCategory {
  SUPER_SHOT     = 'super_shot',
  SUPER_DRIBBLE  = 'super_dribble',
  SUPER_PASS     = 'super_pass',
  SUPER_COMBI    = 'super_combi',
  SUPER_TACKLE   = 'super_tackle',
  SUPER_PASSCUT  = 'super_passcut',
  SUPER_BLOCK    = 'super_block',
  SUPER_SAVE     = 'super_save',
  NORMAL_COMMAND = 'normal_command',
}

/** 命令域 (攻击/防守/GK) */
export enum CommandDomain {
  OFFENSE = 'offense',
  DEFENSE = 'defense',
  GK      = 'gk',
}

// ═══════════════════════════════════════════════
// 技能记录类型
// ═══════════════════════════════════════════════

export interface SpecialSkillRecord {
  /** 技能唯一ID (字符串标识) */
  skillId: string;
  /** 技能category */
  category: SkillCategory;
  /** 日文名称 (说明书原文) */
  nameJp: string;
  /** 英文/罗马字名 */
  nameEn: string;
  /** 体力消耗 */
  gutsCost: number;
  /** 可使用者 (名称字符串，逗号分隔) */
  users: string;
  /** Bank 27 中的技能标志位 (如果是必殺技) */
  bank27Flag?: number;
  /** Bank 27 中的技能索引 (已知或估算) */
  bank27Index?: number;
  /** 组合技需要队友 (逗号分隔的用户名) */
  requiredTeammates?: string;
  /** 注释 */
  note?: string;
}

export interface NormalCommandRecord {
  /** 命令ID */
  commandId: string;
  /** 命令域 */
  domain: CommandDomain;
  /** 日文名称 */
  nameJp: string;
  /** 英文名 */
  nameEn: string;
  /** 体力消耗 */
  gutsCost: number;
}

// ═══════════════════════════════════════════════
// 1. 必殺シュート (Super Shots) — 15种
// ═══════════════════════════════════════════════

export const SUPER_SHOTS: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_DRIVE_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'ドライブシュート',
    nameEn: 'Drive Shot',
    gutsCost: 200,
    users: '大空翼',
    bank27Index: 0,
    note: '翼の代名詞的必殺技',
  },
  {
    skillId: 'SKILL_DRIVE_OVERHEAD',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'ドライブオーバーヘッド',
    nameEn: 'Drive Overhead',
    gutsCost: 320,
    users: '大空翼',
    bank27Index: 1,
    note: 'ドライブシュートの強化版',
  },
  {
    skillId: 'SKILL_HAYABUSA_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'はやぶさシュート',
    nameEn: 'Falcon Shot',
    gutsCost: 200,
    users: '新田瞬',
    bank27Index: 2,
  },
  {
    skillId: 'SKILL_HAYABUSA_VOLLEY',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'はやぶさボレーシュート',
    nameEn: 'Falcon Volley',
    gutsCost: 240,
    users: '新田瞬',
    bank27Index: 3,
  },
  {
    skillId: 'SKILL_OVERHEAD',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'オーバーヘッドキック',
    nameEn: 'Overhead Kick',
    gutsCost: 160,
    users: '大空翼,岬太郎,日向小次郎,松山光,佐野満',
    bank27Index: 4,
    note: '多くの選手が使える共通技',
  },
  {
    skillId: 'SKILL_JUMPING_VOLLEY',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'ジャンピングボレーシュート',
    nameEn: 'Jumping Volley Shot',
    gutsCost: 250,
    users: '岬太郎',
    bank27Index: 5,
  },
  {
    skillId: 'SKILL_SANO_COMBI',
    category: SkillCategory.SUPER_SHOT,
    nameJp: '佐野とのコンビプレイ',
    nameEn: 'Sano Combi Play',
    gutsCost: 200,
    users: '次藤洋',
    bank27Index: 6,
    requiredTeammates: '佐野満',
  },
  {
    skillId: 'SKILL_SKYLAB_HURRICANE',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'スカイラブハリケーン',
    nameEn: 'Skylab Hurricane',
    gutsCost: 200,
    users: '立花政夫,立花和夫',
    bank27Index: 7,
    requiredTeammates: '立花和夫,立花政夫',
    note: '双子の連携技',
  },
  {
    skillId: 'SKILL_SKYLAB_TWIN',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'スカイラブツインシュート',
    nameEn: 'Skylab Twin Shot',
    gutsCost: 380,
    users: '立花政夫,立花和夫',
    bank27Index: 8,
    requiredTeammates: '立花和夫,立花政夫,次藤洋',
    note: '政夫+和夫+次藤の3人技',
  },
  {
    skillId: 'SKILL_TWIN_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'ツインシュート',
    nameEn: 'Twin Shot',
    gutsCost: 180,
    users: '大空翼,岬太郎,立花政夫,立花和夫',
    bank27Index: 9,
    requiredTeammates: '大空翼,岬太郎',
    note: '翼/岬 または 政夫/和夫',
  },
  {
    skillId: 'SKILL_RAZOR_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'カミソリシュート',
    nameEn: 'Razor Shot',
    gutsCost: 200,
    users: '早田誠',
    bank27Index: 10,
  },
  {
    skillId: 'SKILL_EAGLE_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'イーグルショット',
    nameEn: 'Eagle Shot',
    gutsCost: 200,
    users: '松山光',
    bank27Index: 11,
  },
  {
    skillId: 'SKILL_HYPER_OVERHEAD',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'ハイパーオーバーヘッド',
    nameEn: 'Hyper Overhead',
    gutsCost: 250,
    users: '三杉淳',
    bank27Index: 12,
  },
  {
    skillId: 'SKILL_TIGER_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'タイガーショット',
    nameEn: 'Tiger Shot',
    gutsCost: 240,
    users: '日向小次郎',
    bank27Index: 13,
  },
  {
    skillId: 'SKILL_NEO_TIGER_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'ネオ・タイガーショット',
    nameEn: 'Neo Tiger Shot',
    gutsCost: 370,
    users: '日向小次郎',
    bank27Index: 14,
    note: '日向の最強技',
  },
];

// ═══════════════════════════════════════════════
// 2. 必殺ドリブル — 2种
// ═══════════════════════════════════════════════

export const SUPER_DRIBBLES: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_HEEL_LIFT',
    category: SkillCategory.SUPER_DRIBBLE,
    nameJp: 'ヒールリフト',
    nameEn: 'Heel Lift',
    gutsCost: 90,
    users: '大空翼',
    bank27Index: 15,
  },
  {
    skillId: 'SKILL_POWER_DRIBBLE',
    category: SkillCategory.SUPER_DRIBBLE,
    nameJp: 'ごういんなドリブル',
    nameEn: 'Power Dribble',
    gutsCost: 60,
    users: '日向小次郎,次藤洋',
    bank27Index: 16,
  },
];

// ═══════════════════════════════════════════════
// 3. 必殺パス — 2种
// ═══════════════════════════════════════════════

export const SUPER_PASSES: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_DRIVE_PASS',
    category: SkillCategory.SUPER_PASS,
    nameJp: 'ドライブパス',
    nameEn: 'Drive Pass',
    gutsCost: 40,
    users: '大空翼',
    bank27Index: 17,
  },
  {
    skillId: 'SKILL_RAZOR_PASS',
    category: SkillCategory.SUPER_PASS,
    nameJp: 'カミソリパス',
    nameEn: 'Razor Pass',
    gutsCost: 40,
    users: '早田誠',
    bank27Index: 18,
  },
];

// ═══════════════════════════════════════════════
// 4. 必殺コンビプレイ — 3种
// ═══════════════════════════════════════════════

export const SUPER_COMBIS: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_GOLDEN_COMBI',
    category: SkillCategory.SUPER_COMBI,
    nameJp: 'ゴールデンコンビ',
    nameEn: 'Golden Combi',
    gutsCost: 120,
    users: '大空翼,岬太郎',
    bank27Index: 19,
    requiredTeammates: '大空翼,岬太郎',
  },
  {
    skillId: 'SKILL_TOHO_COMBI',
    category: SkillCategory.SUPER_COMBI,
    nameJp: '東邦コンビ',
    nameEn: 'Toho Combi',
    gutsCost: 80,
    users: '日向小次郎,沢田タケシ',
    bank27Index: 20,
    requiredTeammates: '日向小次郎,沢田タケシ',
  },
  {
    skillId: 'SKILL_GEMINI_ATTACK',
    category: SkillCategory.SUPER_COMBI,
    nameJp: 'ジェミニアタック',
    nameEn: 'Gemini Attack',
    gutsCost: 80,
    users: '立花政夫,立花和夫',
    bank27Index: 21,
    requiredTeammates: '立花政夫,立花和夫',
    note: '双子の連携攻撃',
  },
];

// ═══════════════════════════════════════════════
// 5. 必殺タックル — 4种
// ═══════════════════════════════════════════════

export const SUPER_TACKLES: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_SKYLAB_TACKLE',
    category: SkillCategory.SUPER_TACKLE,
    nameJp: 'スカイラブタックル',
    nameEn: 'Skylab Tackle',
    gutsCost: 200,
    users: '立花政夫,立花和夫',
    bank27Index: 22,
  },
  {
    skillId: 'SKILL_RAZOR_TACKLE',
    category: SkillCategory.SUPER_TACKLE,
    nameJp: 'カミソリタックル',
    nameEn: 'Razor Tackle',
    gutsCost: 200,
    users: '早田誠',
    bank27Index: 23,
  },
  {
    skillId: 'SKILL_POWER_TACKLE',
    category: SkillCategory.SUPER_TACKLE,
    nameJp: 'パワータックル',
    nameEn: 'Power Tackle',
    gutsCost: 200,
    users: '次藤洋',
    bank27Index: 24,
  },
  {
    skillId: 'SKILL_TIGER_TACKLE',
    category: SkillCategory.SUPER_TACKLE,
    nameJp: 'タイガータックル',
    nameEn: 'Tiger Tackle',
    gutsCost: 180,
    users: '日向小次郎',
    bank27Index: 25,
  },
];

// ═══════════════════════════════════════════════
// 6. 必殺パスカット — 1种
// ═══════════════════════════════════════════════

export const SUPER_PASSCUTS: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_SKYLAB_PASSCUT',
    category: SkillCategory.SUPER_PASSCUT,
    nameJp: 'スカイラブパスカット',
    nameEn: 'Skylab Pass Cut',
    gutsCost: 180,
    users: '立花政夫,立花和夫',
    bank27Index: 26,
  },
];

// ═══════════════════════════════════════════════
// 7. 必殺ブロック — 3种
// ═══════════════════════════════════════════════

export const SUPER_BLOCKS: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_FACE_BLOCK',
    category: SkillCategory.SUPER_BLOCK,
    nameJp: '顔面ブロック',
    nameEn: 'Face Block',
    gutsCost: 180,
    users: '石崎了',
    bank27Index: 27,
    note: '傷敵一千自損八百',
  },
  {
    skillId: 'SKILL_POWER_BLOCK',
    category: SkillCategory.SUPER_BLOCK,
    nameJp: 'パワーブロック',
    nameEn: 'Power Block',
    gutsCost: 400,
    users: '次藤洋',
    bank27Index: 28,
  },
  {
    skillId: 'SKILL_SKYLAB_BLOCK',
    category: SkillCategory.SUPER_BLOCK,
    nameJp: 'スカイラブブロック',
    nameEn: 'Skylab Block',
    gutsCost: 180,
    users: '立花政夫,立花和夫',
    bank27Index: 29,
  },
];

// ═══════════════════════════════════════════════
// 8. 必殺セービング — 1种
// ═══════════════════════════════════════════════

export const SUPER_SAVES: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_SANKAKU_TOBI',
    category: SkillCategory.SUPER_SAVE,
    nameJp: 'さんかくとび',
    nameEn: 'Triangle Jump',
    gutsCost: 200,
    users: '若島津健',
    bank27Index: 30,
    note: '空手キーパーの必殺技',
  },
];

// ═══════════════════════════════════════════════
// 9. 世界强敌必殺技 (说明书提及但 Bank 27 ID 未确认)
//    这些是世界对手的特殊技能，部分可能未在 Bank 27 显式编码
// ═══════════════════════════════════════════════

export const WORLD_SPECIAL_SKILLS: SpecialSkillRecord[] = [
  {
    skillId: 'SKILL_MIRAGE_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'ミラージュシュート',
    nameEn: 'Mirage Shot',
    gutsCost: 320,
    users: 'カルロス・サンターナ',
    note: '巴西选手，Bank 27 技能ID待确认',
  },
  {
    skillId: 'SKILL_BUNSHIN_DRIBBLE',
    category: SkillCategory.SUPER_DRIBBLE,
    nameJp: '分身ドリブル',
    nameEn: 'Illusion Dribble',
    gutsCost: 90,
    users: 'カルロス・サンターナ',
    note: '巴西选手，Bank 27 技能ID待确认',
  },
  {
    skillId: 'SKILL_SLIDER_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'スライダーシュート',
    nameEn: 'Slider Shot',
    gutsCost: 280,
    users: 'エル・シド・ピエール',
    note: '法国选手，Bank 27 技能ID待确认',
  },
  {
    skillId: 'SKILL_EIFFEL_ATTACK',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'エッフェル攻撃',
    nameEn: 'Eiffel Attack',
    gutsCost: 200,
    users: 'エル・シド・ピエール',
    note: '法国选手，Bank 27 技能ID待确认',
  },
  {
    skillId: 'SKILL_FIRE_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: 'ファイヤーショット',
    nameEn: 'Fire Shot',
    gutsCost: 360,
    users: 'カール・ハインツ・シュナイダー',
    note: '西德选手，Bank 27 技能ID待确认',
  },
  {
    skillId: 'SKILL_FRONT_FLIP_SHOT',
    category: SkillCategory.SUPER_SHOT,
    nameJp: '前転シュート',
    nameEn: 'Front Flip Shot',
    gutsCost: 220,
    users: 'ファン・ディアス',
    note: '阿根廷选手，Bank 27 技能ID待确认',
  },
];

// ═══════════════════════════════════════════════
// 10. 通常命令 — 18种
// ═══════════════════════════════════════════════

export const NORMAL_COMMANDS: NormalCommandRecord[] = [
  // ── 攻撃 명령 ──
  { commandId: 'CMD_DRIBBLE',   domain: CommandDomain.OFFENSE, nameJp: 'ドリブル',       nameEn: 'Dribble',       gutsCost: 40 },
  { commandId: 'CMD_PASS',      domain: CommandDomain.OFFENSE, nameJp: 'パス',           nameEn: 'Pass',          gutsCost: 20 },
  { commandId: 'CMD_SHOOT',     domain: CommandDomain.OFFENSE, nameJp: 'シュート',       nameEn: 'Shoot',         gutsCost: 80 },
  { commandId: 'CMD_VOLLEY',    domain: CommandDomain.OFFENSE, nameJp: 'ボレーシュート', nameEn: 'Volley Shot',   gutsCost: 90 },
  { commandId: 'CMD_HEADING',   domain: CommandDomain.OFFENSE, nameJp: 'ヘディング',     nameEn: 'Heading',       gutsCost: 90 },
  { commandId: 'CMD_TRAP',      domain: CommandDomain.OFFENSE, nameJp: 'トラップ',       nameEn: 'Trap',          gutsCost: 10 },
  { commandId: 'CMD_ONE_TWO',   domain: CommandDomain.OFFENSE, nameJp: 'ワン・ツー・リターン', nameEn: 'One-Two Return', gutsCost: 60 },
  { commandId: 'CMD_THROUGH',   domain: CommandDomain.OFFENSE, nameJp: 'スルー',         nameEn: 'Through',       gutsCost: 40 },
  { commandId: 'CMD_CONTEND',   domain: CommandDomain.OFFENSE, nameJp: 'せりあう',       nameEn: 'Contend',       gutsCost: 60 },
  // ── 防御命令 ──
  { commandId: 'CMD_TACKLE',    domain: CommandDomain.DEFENSE, nameJp: 'タックル',       nameEn: 'Tackle',        gutsCost: 60 },
  { commandId: 'CMD_BLOCK',     domain: CommandDomain.DEFENSE, nameJp: 'ブロック',       nameEn: 'Block',         gutsCost: 70 },
  { commandId: 'CMD_PASSCUT',   domain: CommandDomain.DEFENSE, nameJp: 'パスカット',     nameEn: 'Pass Cut',      gutsCost: 50 },
  { commandId: 'CMD_CLEAR',     domain: CommandDomain.DEFENSE, nameJp: 'クリアー',       nameEn: 'Clear',         gutsCost: 80 },
  // ── GK命令 ──
  { commandId: 'CMD_PUNCH',     domain: CommandDomain.GK, nameJp: 'パンチ',               nameEn: 'Punch',          gutsCost: 40 },
  { commandId: 'CMD_CATCH',     domain: CommandDomain.GK, nameJp: 'キャッチ',             nameEn: 'Catch',          gutsCost: 20 },
  { commandId: 'CMD_RUSH_OUT',  domain: CommandDomain.GK, nameJp: 'とびだす',             nameEn: 'Rush Out',       gutsCost: 70 },
  { commandId: 'CMD_PREP_DRIBBLE', domain: CommandDomain.GK, nameJp: 'ドリブルにそなえる', nameEn: 'Prepare Dribble', gutsCost: 50 },
  { commandId: 'CMD_PREP_SHOOT',   domain: CommandDomain.GK, nameJp: 'シュートにそなえる', nameEn: 'Prepare Shoot',   gutsCost: 50 },
];

// ═══════════════════════════════════════════════
// 11. 组合技限制规则
// ═══════════════════════════════════════════════

export interface CombiSkillRule {
  skillId: string;
  requiredPlayers: string[];
  note?: string;
}

export const COMBI_RULES: CombiSkillRule[] = [
  { skillId: 'SKILL_GOLDEN_COMBI',       requiredPlayers: ['大空翼', '岬太郎'],       note: '翼+岬' },
  { skillId: 'SKILL_TOHO_COMBI',          requiredPlayers: ['日向小次郎', '沢田タケシ'],   note: '日向+沢田' },
  { skillId: 'SKILL_GEMINI_ATTACK',        requiredPlayers: ['立花政夫', '立花和夫'],   note: '政夫+和夫' },
  { skillId: 'SKILL_TWIN_SHOT',            requiredPlayers: ['大空翼', '岬太郎'],       note: '翼+岬或政夫+和夫' },
  { skillId: 'SKILL_SKYLAB_TWIN',          requiredPlayers: ['立花政夫', '立花和夫', '次藤洋'], note: '政夫+和夫+次藤' },
  { skillId: 'SKILL_SANO_COMBI',           requiredPlayers: ['次藤洋', '佐野満'],       note: '次藤+佐野' },
];

// ═══════════════════════════════════════════════
// 12. 聚合/查询工具函数
// ═══════════════════════════════════════════════

/** 获取全部必殺技 (不含通常命令) */
export function getAllSuperSkills(): SpecialSkillRecord[] {
  return [
    ...SUPER_SHOTS,
    ...SUPER_DRIBBLES,
    ...SUPER_PASSES,
    ...SUPER_COMBIS,
    ...SUPER_TACKLES,
    ...SUPER_PASSCUTS,
    ...SUPER_BLOCKS,
    ...SUPER_SAVES,
  ];
}

/** 获取全部必殺技 (含世界强敌) */
export function getAllSuperSkillsIncludingWorld(): SpecialSkillRecord[] {
  return [
    ...getAllSuperSkills(),
    ...WORLD_SPECIAL_SKILLS,
  ];
}

/** 按 category 筛选 */
export function getSkillsByCategory(category: SkillCategory): SpecialSkillRecord[] {
  return getAllSuperSkillsIncludingWorld().filter(s => s.category === category);
}

/** 按玩家名查找可使用的必殺技 */
export function getSkillsByPlayer(playerName: string): SpecialSkillRecord[] {
  return getAllSuperSkillsIncludingWorld().filter(s =>
    s.users.includes(playerName),
  );
}

/** 按体力消耗范围筛选 */
export function getSkillsByGutsRange(min: number, max: number): SpecialSkillRecord[] {
  return getAllSuperSkillsIncludingWorld().filter(s =>
    s.gutsCost >= min && s.gutsCost <= max,
  );
}

/** 获取所有通常命令 */
export function getAllNormalCommands(): NormalCommandRecord[] {
  return [...NORMAL_COMMANDS];
}

/** 按命令域筛选通常命令 */
export function getNormalCommandsByDomain(domain: CommandDomain): NormalCommandRecord[] {
  return NORMAL_COMMANDS.filter(c => c.domain === domain);
}

/** 获取组合技规则 */
export function getCombiRules(): CombiSkillRule[] {
  return [...COMBI_RULES];
}

// ═══════════════════════════════════════════════
// 統計摘要
// ═══════════════════════════════════════════════

export interface SkillsSummary {
  superShots: number;
  superDribbles: number;
  superPasses: number;
  superCombis: number;
  superTackles: number;
  superPasscuts: number;
  superBlocks: number;
  superSaves: number;
  worldSkills: number;
  totalSuper: number;
  totalNormal: number;
}

export function getSkillsSummary(): SkillsSummary {
  return {
    superShots:    SUPER_SHOTS.length,
    superDribbles: SUPER_DRIBBLES.length,
    superPasses:   SUPER_PASSES.length,
    superCombis:   SUPER_COMBIS.length,
    superTackles:  SUPER_TACKLES.length,
    superPasscuts: SUPER_PASSCUTS.length,
    superBlocks:   SUPER_BLOCKS.length,
    superSaves:    SUPER_SAVES.length,
    worldSkills:   WORLD_SPECIAL_SKILLS.length,
    totalSuper:    getAllSuperSkills().length,
    totalNormal:   NORMAL_COMMANDS.length,
  };
}

console.log('[special-skills-database] ✅ 必殺技数据库加载完成');
