// @ts-nocheck
/**
 * ROM Bank 浏览器 — 列出所有 PRG / CHR Bank，支持跳转到详情页
 */
import { NES_PRG_ROM, NES_CHR_ROM, PRG_ROM_SIZE, CHR_ROM_SIZE } from '../../src/game/prg/data/rom-data/index';

const BANK_SIZE = 8192;

interface BankItem {
  id: number;
  type: 'PRG' | 'CHR';
  label: string;
  name: string;          // 英文名称（标题展示）
  cpuMap: string;
  code: number;
  data: number;
  unaccessed: number;
  description: string;
  codePct: string;
  dataPct: string;
  flags: string[];       // 特征标签
  deps: string[];        // 本 bank 依赖哪些 bank（预格式化文本）
  usedBy: string[];      // 哪些 bank 使用了本 bank（预格式化文本）
  depsStr: string;       // "Bank 02, Bank 30"
  usedByStr: string;     // "Bank 01"
}

/** 来自 _stats.txt 的精确 CDL 分析数据 */
/** CDL 来源: _tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl (FCEUX 录制) */
const PRG_STATS: Record<number, { code: number; data: number; unacc: number; cpu: string }> = {
  0:  { code: 7272, data: 531,  unacc: 471,  cpu: '$8000' },
  1:  { code: 4282, data: 3652, unacc: 288,  cpu: '$8000' },
  2:  { code: 1836, data: 261,  unacc: 6111, cpu: '$8000' },
  3:  { code: 0,    data: 8186, unacc: 6,    cpu: '$8000' },
  4:  { code: 0,    data: 8158, unacc: 34,   cpu: '$8000' },
  5:  { code: 0,    data: 8162, unacc: 30,   cpu: '$8000' },
  6:  { code: 0,    data: 3345, unacc: 4847, cpu: '$8000' },
  7:  { code: 0,    data: 3908, unacc: 4284, cpu: '$8000' },
  8:  { code: 0,    data: 6358, unacc: 1834, cpu: '$8000' },
  9:  { code: 0,    data: 6645, unacc: 1547, cpu: '$8000' },
  10: { code: 0,    data: 7039, unacc: 1153, cpu: '$8000' },
  11: { code: 1475, data: 5978, unacc: 752,  cpu: '$8000' },
  12: { code: 1672, data: 6100, unacc: 432,  cpu: '$8000' },
  13: { code: 0,    data: 8176, unacc: 16,   cpu: '$8000' },
  14: { code: 0,    data: 8177, unacc: 15,   cpu: '$8000' },
  15: { code: 0,    data: 8134, unacc: 58,   cpu: '$8000' },
  16: { code: 1860, data: 4883, unacc: 1457, cpu: '$8000' },
  17: { code: 0,    data: 7496, unacc: 696,  cpu: '$8000' },
  18: { code: 0,    data: 7615, unacc: 577,  cpu: '$8000' },
  19: { code: 877,  data: 5020, unacc: 2295, cpu: '$8000' },
  20: { code: 2000, data: 6100, unacc: 114,  cpu: '$8000' },
  21: { code: 0,    data: 6933, unacc: 1259, cpu: '$8000' },
  22: { code: 451,  data: 7393, unacc: 353,  cpu: '$8000' },
  23: { code: 0,    data: 8060, unacc: 132,  cpu: '$8000' },
  24: { code: 2774, data: 4776, unacc: 674,  cpu: '$8000' },
  25: { code: 0,    data: 7724, unacc: 468,  cpu: '$8000' },
  26: { code: 7362, data: 669,  unacc: 228,  cpu: '$8000' },
  27: { code: 384,  data: 6070, unacc: 1742, cpu: '$8000' },
  28: { code: 2871, data: 4544, unacc: 815,  cpu: '$8000' },
  29: { code: 0,    data: 4635, unacc: 3557, cpu: '$8000' },
  30: { code: 6350, data: 1596, unacc: 341,  cpu: '$C000' },
  31: { code: 3949, data: 3415, unacc: 856,  cpu: '$E000' },
};

const PRG_DESCRIPTIONS: Record<number, string> = {
  0:  'System Service & Main Loop ($9EED) — 系统服务+主循环引擎 / Tecmo Theater导演 — 被Bank30映射、Bank02调用',
  1:  'NMI Render + Data Query Service — NMI PPU渲染(Tecmo Theater) + 球员/队伍数据查询 → 调用 Bank 02 $A72C',
  2:  'Scene Controller ($A200) — 场景控制器 → JMP $9EED 进入主循环 — 读 Bank 03/04/07',
  3:  'Story Scripts (PT1) — 剧情脚本 (16项, 脚本指令流: textPtr/fadeIn/palette/sceneLoad + 文本)',
  4:  'Story Scripts (PT2) — 剧情脚本 (16项, 续)',
  5:  'Story Scripts (PT3) — 剧情脚本 (64项, 最大区块)',
  6:  'Story Scripts (PT4) + Palette — 剧情脚本 (6项) + BG/SPR调色板 (16组×16B, bank06混合bank)',
  7:  'Scene Descriptors — 场景描述符 (24场景: ptr/ctrl/w/h/pos + NT布局 + 调色板 + 精灵)',
  8:  'Map Metatile Dictionary — 地图metatile字典 (482条×17B: 类型标记+16B tile数据, bank00渲染子程读)',
  9:  'Match Scripts (PT1) — 比赛场景脚本 (109项, bank19比赛时读)',
  10: 'Match Scripts (PT2) — 比赛场景脚本 (95项, 续)',
  11: 'Match Turn Logic (PT1) — 比赛回合逻辑 & 行动',
  12: 'Audio Engine ($8000-$9FFF) — NES APU 音频驱动引擎 · 音乐/音效播放 · Bank 0D/0E/0F 辅助数据',
  13: 'Animation Frames (PT1) — 动画/过场帧数据',
  14: 'Animation Data (PT2) — 动画/演出数据',
  15: 'Animation Data (PT3) — 动画/演出数据',
  16: 'Special Moves & Skills — 特殊动作/技能',
  17: 'Large Data Block (PT1) — 大型数据块',
  18: 'Large Data Block (PT2) — 大型数据块',
  19: 'Auxiliary Logic & Data — 辅助逻辑 & 数据',
  20: 'Match Auxiliary Logic — 比赛辅助逻辑 & 数据',
  21: 'Extended Data (PT1) — 扩展数据',
  22: 'Data+Code Hybrid — 数据+代码混合',
  23: 'Extended Data (PT2) — 扩展数据',
  24: 'AI & Decision Logic — AI/决策逻辑 & 数据',
  25: 'Extended Data (PT3) — 扩展数据',
  26: 'Match Core Engine — 比赛核心引擎 (7362B code)',
  27: 'Sprite & Scene Animation — 精灵/场景动画数据+帧推进(已完整翻译) → 依赖 Bank30固定辅助($C50C/$C536/$C539)· Bank30/31 切#$1B消费',
  28: 'Auxiliary Logic & Data — 辅助逻辑 & 数据',
  29: 'Team Tactics & CPU Roster — 球队战术/阵型块(241×22B) + 阵容指针表(34项) + CPU阵容区 → Bank30/26/31切到$A000 · Bank01主消费',
  30: 'Core System Library (FIXED $C000) — HW初始化 + Bank31唯一对外接口(JMP跳转表)',
  31: 'Interrupt Vectors (FIXED $E000) — RESET→Bank30 — 不直接调$8000-$BFFF',
};

/** 英文标题名（独立于 description，展示在卡片/详情标题处） */
const PRG_NAMES: Record<number, string> = {
  0:  'System Service & Main Loop',
  1:  'NMI Render + Data Query Service',
  2:  'Scene Controller',
  3:  'Narration Text I',
  4:  'Narration Text II',
  5:  'Narration Text III',
  6:  'Narration Text IV + Palette',
  7:  'Scene Descriptors',
  8:  'Map Metatile Dictionary',
  9:  'Match Scripts I',
  10: 'Match Scripts II',
  11: 'Match Turn Logic I',
  12: 'Audio Engine',
  13: 'Animation Frames I',
  14: 'Animation Data II',
  15: 'Animation Data III',
  16: 'Special Moves & Skills',
  17: 'Large Data Block I',
  18: 'Large Data Block II',
  19: 'Auxiliary Logic & Data',
  20: 'Match Auxiliary Logic',
  21: 'Extended Data I',
  22: 'Data-Code Hybrid',
  23: 'Extended Data II',
  24: 'AI & Decision Logic',
  25: 'Extended Data III',
  26: 'Match Core Engine',
  27: 'Sprite & Scene Animation',
  28: 'Auxiliary Logic & Data',
  29: 'Team Tactics & Roster',
  30: 'Core System Library',
  31: 'Interrupt Vectors',
};

const CHR_NAMES: Record<number, string> = {
  0:  'Pattern Table 00',
  1:  'Pattern Table 01',
  2:  'Pattern Table 02',
  3:  'Pattern Table 03',
  4:  'Pattern Table 04',
  5:  'Pattern Table 05',
  6:  'Pattern Table 06',
  7:  'Pattern Table 07',
  8:  'Pattern Table 08',
  9:  'Pattern Table 09',
  10: 'Pattern Table 10',
  11: 'Pattern Table 11',
  12: 'Pattern Table 12',
  13: 'Pattern Table 13',
  14: 'Pattern Table 14',
  15: 'Pattern Table 15',
};

/** bank 特征标签 */
function getFlags(index: number, s: { code: number; data: number; unacc: number }): string[] {
  const flags: string[] = [];
  if (index >= 30) flags.push('FIXED');
  if (s.code > 4000) flags.push('引擎');
  if (s.data > 7000) flags.push('纯数据');
  if (s.unacc > 4000) flags.push('低利用率');
  if (s.code === 0 && s.data > 0) flags.push('📦');
  else if (s.code > 3000) flags.push('🔧');
  else if (s.code > 0) flags.push('⚡');
  return flags;
}

/** PRG bank 依赖关系 */
interface BankRel { deps: number[]; usedBy: number[]; }

const PRG_RELATIONS: Record<number, BankRel> = {
  // Bank 00: 初始化→调用 Bank 02 子程序，通过 $9FA8 切换任意 bank；被 Bank 30 映射到 $8000 作为常驻工具层
  0:  { deps: [2, 30, 31], usedBy: [30] },
  // Bank 01: 数据查询+NMI PPU渲染→Tecmo Theater 期间被 Bank 00 切换为 NMI handler($805D)；调用 Bank 02 的 $A72C 关卡加载
  1:  { deps: [2, 3, 4, 7], usedBy: [0] },
  // Bank 02: 场景控制器 $A200 启动入口 → 场景初始化密集调用 Bank 00 服务($9A43/$98A0/$9B7F/$9F69)，读取 Bank 03/04/07 数据；被 Bank 30 在启动时映射到 $A000
  2:  { deps: [0, 3, 4, 7], usedBy: [0, 1, 30] },
  3:  { deps: [], usedBy: [2] },
  4:  { deps: [], usedBy: [2] },
  5:  { deps: [], usedBy: [1] },
  6:  { deps: [], usedBy: [] },
  7:  { deps: [], usedBy: [2] },
  8:  { deps: [], usedBy: [] },
  9:  { deps: [], usedBy: [] },
  10: { deps: [], usedBy: [] },
  11: { deps: [], usedBy: [] },
  12: { deps: [], usedBy: [] },
  13: { deps: [], usedBy: [] },
  14: { deps: [], usedBy: [] },
  15: { deps: [], usedBy: [] },
  16: { deps: [], usedBy: [] },
  17: { deps: [], usedBy: [] },
  18: { deps: [], usedBy: [] },
  19: { deps: [], usedBy: [] },
  20: { deps: [], usedBy: [] },
  21: { deps: [], usedBy: [] },
  22: { deps: [], usedBy: [] },
  23: { deps: [], usedBy: [] },
  24: { deps: [], usedBy: [] },
  25: { deps: [], usedBy: [] },
  26: { deps: [], usedBy: [] },
  // Bank 27: 精灵/场景动画数据+帧推进。依赖 Bank 30 固定辅助($C50C 名字区指针/$C536 坐标解码/$C539 坐标编码/$C515 渲染同步/$C527 场景缓冲);
  // 被 Bank 30($CF72 图形工具)与 Bank 31(比赛动画场景切换)通过 LDA #$1B 切换消费。与 Bank 24 共享 ram_05E3 场景忙标志。
  27: { deps: [30], usedBy: [30, 31] },
  28: { deps: [], usedBy: [] },
  29: { deps: [], usedBy: [1, 0, 20, 28] },
  // Bank 30: 核心系统库；启动时通过 R6=0 映射 Bank 00，R7=2 映射 Bank 02；被 Bank 31 中断向量和 Bank 00 调用
  30: { deps: [0, 2], usedBy: [0, 31] },
  31: { deps: [30], usedBy: [0] },
};

Page({
  data: {
    activeTab: 'prg' as 'prg' | 'chr',
    prgBanks: [] as BankItem[],
    chrBanks: [] as BankItem[],
    totalPRG: PRG_ROM_SIZE,
    totalCHR: CHR_ROM_SIZE,
  },

  onLoad() {
    this.buildBankLists();
  },

  buildBankLists() {
    // ── PRG Banks 0-31 ──
    const prgBanks: BankItem[] = [];
    for (let i = 0; i < 32; i++) {
      const s = PRG_STATS[i] || { code: 0, data: 0, unacc: 8192, cpu: '$8000' };
      const rel = PRG_RELATIONS[i] || { deps: [], usedBy: [] };
      const fmtDeps = rel.deps.map(d => 'Bank ' + String(d).padStart(2, '0'));
      const fmtUsed = rel.usedBy.map(u => 'Bank ' + String(u).padStart(2, '0'));
      prgBanks.push({
        id: i,
        type: 'PRG',
        label: `PRG Bank ${String(i).padStart(2, '0')}`,
        name: PRG_NAMES[i] || 'Unknown',
        cpuMap: s.cpu,
        code: s.code,
        data: s.data,
        unaccessed: s.unacc,
        description: PRG_DESCRIPTIONS[i] || '未知',
        codePct: ((s.code / 8192) * 100).toFixed(0),
        dataPct: ((s.data / 8192) * 100).toFixed(0),
        flags: getFlags(i, s),
        deps: fmtDeps,
        usedBy: fmtUsed,
        depsStr: fmtDeps.join(', '),
        usedByStr: fmtUsed.join(', '),
      });
    }

    // ── CHR Banks 0-15 ──
    const chrBanks: BankItem[] = [];
    for (let i = 0; i < 16; i++) {
      chrBanks.push({
        id: i,
        type: 'CHR',
        label: `CHR Bank ${String(i).padStart(2, '0')}`,
        name: CHR_NAMES[i] || 'Unknown',
        cpuMap: `PPU $${(i * 0x2000).toString(16).toUpperCase().padStart(4, '0')}`,
        code: 0,
        data: 8192,
        unaccessed: 0,
        description: `图块数据 ${8 * i}–${8 * i + 8}KB (${512 * i}–${512 * (i + 1)} 号 tile)`,
        codePct: '0',
        dataPct: '100',
        flags: ['🎨', '纯数据'],
        deps: [],
        usedBy: [],
        depsStr: '',
        usedByStr: '',
      });
    }

    this.setData({ prgBanks, chrBanks });
  },

  onTapTab(e: any) {
    const tab = e.currentTarget.dataset.tab as 'prg' | 'chr';
    this.setData({ activeTab: tab });
  },

  onTapBank(e: any) {
    const { type, id } = e.currentTarget.dataset as { type: string; id: number };
    // 特殊 bank 跳转独立详情页
    const SPECIAL_BANKS: Record<number, string> = {
      2: 'bank-detail-02', 12: 'bank-detail-12', 29: 'bank-detail-29', 30: 'bank-detail-30', 31: 'bank-detail-31',
    };
    const subDir = SPECIAL_BANKS[id] || 'bank-detail';
    wx.navigateTo({
      url: `/pages/bankpage/${subDir}/bank-detail?type=${type}&id=${id}`,
    });
  },
});
