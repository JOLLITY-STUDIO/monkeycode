/**
 * 数据API查看器 (Swagger风格)
 * 
 * 展示 RomDatabase 中所有数据表和接口的当前状态。
 * 这是 ROM 数据访问层的 "Swagger UI" — 
 * 可以查看每个数据表的结构、字段、加载状态。
 */
import { RomDatabase } from '../../../src/data/RomDatabase';

interface ApiEndpoint {
  method: string;
  path: string;
  table: string;
  fields: string;
  source: string;
  status: 'loaded' | 'partial' | 'pending';
  count: number;
  totalCount: number;
}

Page({
  data: {
    dbStatus: '未初始化',
    endpoints: [] as ApiEndpoint[],
    summary: {} as any,
  },

  onLoad() {
    this._refresh();
  },

  onShow() {
    this._refresh();
  },

  /** 手动刷新 */
  onRefresh() {
    this._refresh();
  },

  _refresh() {
    try {
      const db = RomDatabase.getInstance();
      db.init();
      
      const summary = db.getSummary();
      
      const endpoints: ApiEndpoint[] = [
        {
          method: 'GET',
          path: '/api/chr/:bankId',
          table: 'CHR Bank 图库',
          fields: 'bankId(0-31), size(4096B), data(Uint8Array[4096])',
          source: 'CHR ROM ($00000-$1FFFF)',
          status: summary.chrBanks.loaded === summary.chrBanks.total ? 'loaded' : 'partial',
          count: summary.chrBanks.loaded,
          totalCount: summary.chrBanks.total,
        },
        {
          method: 'GET',
          path: '/api/prg/:bankId',
          table: 'PRG Bank 程序数据',
          fields: 'bankId(0-7), size(16384B), data(Uint8Array[16384])',
          source: 'PRG ROM ($00010-$1FFFF)',
          status: summary.prgBanks.loaded === summary.prgBanks.total ? 'loaded' : 'partial',
          count: summary.prgBanks.loaded,
          totalCount: summary.prgBanks.total,
        },
        {
          method: 'GET',
          path: '/api/palettes',
          table: '场景调色板表',
          fields: 'id, scene, bankId, offset, data(32B BG+SPR)',
          source: 'Bank 2 ($B24F) + Bank 4 + ...',
          status: summary.paletteTables > 0 ? 'loaded' : 'pending',
          count: summary.paletteTables,
          totalCount: summary.paletteTables,
        },
        {
          method: 'GET',
          path: '/api/nametables',
          table: 'Nametable 模板表',
          fields: 'id, scene, bankId, offset, rleCompressed, data',
          source: 'Bank 1 (RLE) + Bank 5/6',
          status: summary.ntLoaded > 0 ? 'partial' : 'pending',
          count: summary.ntLoaded,
          totalCount: summary.nametableTemplates,
        },
        {
          method: 'GET',
          path: '/api/sprites',
          table: '精灵定义表 (元精灵)',
          fields: 'id, name, bankId, tileCount, data',
          source: 'Bank 3/4 球员精灵数据',
          status: summary.spriteLoaded > 0 ? 'partial' : 'pending',
          count: summary.spriteLoaded,
          totalCount: summary.spriteDefinitions,
        },
        {
          method: 'GET',
          path: '/api/audio',
          table: '音频资源表',
          fields: 'id, name, type(bgm|sfx), bankId, data',
          source: 'Bank 5 音频引擎数据',
          status: summary.audioLoaded > 0 ? 'partial' : 'pending',
          count: summary.audioLoaded,
          totalCount: summary.audioEntries,
        },
        {
          method: 'GET',
          path: '/api/players',
          table: '球员数据表',
          fields: 'id, name, position, shoot, pass, dribble, tackle, speed, stamina, specialMoves[]',
          source: 'Bank 3 球员数据',
          status: summary.players > 0 ? 'partial' : 'pending',
          count: summary.players,
          totalCount: 128,
        },
        {
          method: 'GET',
          path: '/api/teams',
          table: '球队数据表',
          fields: 'id, name, playerIds[], formation, style',
          source: 'Bank 3 球队数据',
          status: summary.teams > 0 ? 'partial' : 'pending',
          count: summary.teams,
          totalCount: 32,
        },
        {
          method: 'GET',
          path: '/api/events',
          table: '事件脚本表',
          fields: 'id, data[] (脚本字节码)',
          source: 'Bank 7 事件脚本 ($C064-$E28D)',
          status: 'pending',
          count: 0,
          totalCount: 0,
        },
        {
          method: 'GET',
          path: '/api/texts',
          table: '文本数据表',
          fields: 'id, tiles[] (tile索引序列)',
          source: 'Bank 7 文本数据',
          status: 'pending',
          count: 0,
          totalCount: 0,
        },
      ];

      this.setData({
        dbStatus: `✅ ROM 数据库已初始化 (${summary.prgBanks.loaded} PRG + ${summary.chrBanks.loaded} CHR Banks)`,
        endpoints,
        summary,
      });

      console.log('[DB:API] 数据库状态:', summary);
    } catch (err) {
      console.error('[DB:API] 初始化失败:', err);
      this.setData({ dbStatus: '⚠️ 初始化失败' });
    }
  },

  /** 点击端点查看详情 */
  onEndpointTap(e: any) {
    const idx = e.currentTarget.dataset.index;
    const ep = this.data.endpoints[idx];
    wx.showModal({
      title: ep.path,
      content: `表: ${ep.table}\n来源: ${ep.source}\n字段: ${ep.fields}\n状态: ${ep.status} (${ep.count}/${ep.totalCount})\n\n方法: ${ep.method}`,
      showCancel: false,
    });
  },
});
