/**
 * ROM Bank 浏览器 — 列出所有 PRG / CHR Bank，支持跳转到详情页
 */
import { NES_PRG_ROM, NES_CHR_ROM, PRG_ROM_SIZE, CHR_ROM_SIZE } from '../../rom-data/index';

const BANK_SIZE = 8192;

interface BankItem {
  id: number;
  type: 'PRG' | 'CHR';
  label: string;
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
const PRG_STATS: Record<number, { code: number; data: number; unacc: number; cpu: string }> = {
  0:  { code: 7274, data: 427,  unacc: 491,  cpu: '$8000' },
  1:  { code: 4239, data: 3556, unacc: 397,  cpu: '$8000' },
  2:  { code: 1828, data: 245,  unacc: 6119, cpu: '$8000' },
  3:  { code: 0,    data: 8186, unacc: 6,    cpu: '$8000' },
  4:  { code: 0,    data: 8158, unacc: 34,   cpu: '$8000' },
  5:  { code: 0,    data: 8157, unacc: 35,   cpu: '$8000' },
  6:  { code: 0,    data: 3345, unacc: 4847, cpu: '$8000' },
  7:  { code: 0,    data: 3908, unacc: 4284, cpu: '$8000' },
  8:  { code: 0,    data: 6358, unacc: 1834, cpu: '$8000' },
  9:  { code: 0,    data: 6645, unacc: 1547, cpu: '$8000' },
  10: { code: 0,    data: 7039, unacc: 1153, cpu: '$8000' },
  11: { code: 1477, data: 5958, unacc: 757,  cpu: '$8000' },
  12: { code: 1674, data: 6088, unacc: 430,  cpu: '$8000' },
  13: { code: 0,    data: 8176, unacc: 16,   cpu: '$8000' },
  14: { code: 0,    data: 8177, unacc: 15,   cpu: '$8000' },
  15: { code: 0,    data: 8134, unacc: 58,   cpu: '$8000' },
  16: { code: 1860, data: 4599, unacc: 1733, cpu: '$8000' },
  17: { code: 0,    data: 7239, unacc: 953,  cpu: '$8000' },
  18: { code: 0,    data: 7616, unacc: 576,  cpu: '$8000' },
  19: { code: 877,  data: 5021, unacc: 2294, cpu: '$8000' },
  20: { code: 2002, data: 6070, unacc: 120,  cpu: '$8000' },
  21: { code: 0,    data: 6901, unacc: 1291, cpu: '$8000' },
  22: { code: 453,  data: 7388, unacc: 351,  cpu: '$8000' },
  23: { code: 0,    data: 8047, unacc: 145,  cpu: '$8000' },
  24: { code: 2774, data: 4686, unacc: 732,  cpu: '$8000' },
  25: { code: 0,    data: 7520, unacc: 672,  cpu: '$8000' },
  26: { code: 7331, data: 584,  unacc: 277,  cpu: '$8000' },
  27: { code: 384,  data: 6021, unacc: 1787, cpu: '$8000' },
  28: { code: 2871, data: 4189, unacc: 1132, cpu: '$8000' },
  29: { code: 0,    data: 3866, unacc: 4326, cpu: '$8000' },
  30: { code: 6350, data: 1495, unacc: 347,  cpu: '$C000' },
  31: { code: 3951, data: 3387, unacc: 854,  cpu: '$E000' },
};

const PRG_DESCRIPTIONS: Record<number, string> = {
  0:  '系统初始化 & 标题/菜单主循环 — 通过 $9FA8 切换 PRG bank',
  1:  '数据查询服务（球员/队伍/赛事数据检索）→ 调用 Bank 02 的 $A72C',
  2:  '场景/密码/选择界面 & 数据加载引擎（$A72C 关卡数据解包器）',
  3:  '关卡地图数据 (Part 1) — 被 Bank 02 ($A72C) 解包到 RAM $0460',
  4:  '关卡地图数据 (Part 2) — 同 Bank 03 格式，同为 Bank 02 所加载',
  5:  '队伍阵型/策略数据',
  6:  '剧情/脚本数据块 (Part 1)',
  7:  '剧情/脚本数据块 (Part 2) — 被 Bank 02 ($A72C, EB=$07) 加载',
  8:  '文本/对话数据 (Part 1)',
  9:  '文本/对话数据 (Part 2)',
  10: '场景描述/地图定位数据',
  11: '比赛回合逻辑 & 行动数据',
  12: '比赛回合逻辑 & 行动数据',
  13: '动画/过场帧数据 (Part 1)',
  14: '动画/演出数据 (Part 2)',
  15: '动画/演出数据 (Part 3)',
  16: '特殊动作/技能逻辑+数据',
  17: '大型数据块 (Part 1)',
  18: '大型数据块 (Part 2)',
  19: '辅助逻辑 & 数据',
  20: '比赛辅助逻辑 & 数据',
  21: '扩展数据存储',
  22: '数据密集型 + 少量代码',
  23: '扩展数据存储',
  24: 'AI/决策逻辑 & 数据',
  25: '扩展数据存储',
  26: '比赛核心引擎（最大代码 Bank）',
  27: '数据密集型 + 极少量代码',
  28: '辅助逻辑 & 数据',
  29: '扩展数据存储',
  30: '核心系统库（PPU/APU/控制器/数学）FIXED',
  31: '中断向量 & 通用工具 FIXED',
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
  // Bank 00: 初始化→调用 Bank 02 子程序，通过 $9FA8 切换任意 bank（通用切换器）
  0:  { deps: [2, 30, 31], usedBy: [] },
  // Bank 01: 数据查询→调用 Bank 02 的 $A72C 关卡加载
  1:  { deps: [2, 3, 4, 7], usedBy: [] },
  // Bank 02: 关卡数据解包器 $A72C → 用到 Bank 03, 04, 07 的地图/脚本数据
  2:  { deps: [3, 4, 7], usedBy: [0, 1] },
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
  27: { deps: [], usedBy: [] },
  28: { deps: [], usedBy: [] },
  29: { deps: [], usedBy: [] },
  30: { deps: [], usedBy: [0, 31] },
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
    wx.navigateTo({
      url: `/pages/bankpage/bank-detail/bank-detail?type=${type}&id=${id}`,
    });
  },
});
