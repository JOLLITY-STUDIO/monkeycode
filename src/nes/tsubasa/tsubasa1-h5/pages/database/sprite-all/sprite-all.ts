/**
 * 精灵定义数据库查看器
 * 
 * 展示 ROM 中提取的全部静态精灵定义 (元精灵/Metasprite):
 *   - 每个条目代表一个精灵模板 (如"大空翼球员精灵")
 *   - 包含组成该精灵的 tile 序列和属性
 * 
 * 注意: 这里展示的是 ROM 中的静态精灵定义数据，
 *       不是游戏运行时的 OAM (64个动态精灵槽位)。
 *       OAM 每帧被游戏逻辑更新，属于 DataStore 范畴。
 */
import { RomDatabase, SpriteDefinitionEntry } from '../../../src/data/RomDatabase';
import { initChrBanks, CHR_BANKS } from '../../../src/assets/chr/chr_data';
import { NES_PALETTE, TILE_SIZE } from '../../../src/core/types';

Page({
  data: {
    definitions: [] as SpriteDefinitionEntry[],
    dbStatus: '未初始化',
    totalCount: 0,
    loadedCount: 0,
  },

  onLoad() {
    // @ts-ignore
    this._chrData = null;
    // @ts-ignore
    this._ctxMap = new Map();
    this._initDatabase();
  },

  onShow() {
    this._initDatabase();
  },

  _initDatabase() {
    try {
      const db = RomDatabase.getInstance();
      db.init();
      initChrBanks();
      
      // @ts-ignore
      this._chrData = CHR_BANKS;
      
      const defs = db.getSpriteDefinitions();
      this.setData({
        definitions: defs,
        totalCount: defs.length,
        loadedCount: defs.filter(d => d.loaded).length,
        dbStatus: `✅ ROM 数据已加载 (${defs.filter(d => d.loaded).length}/${defs.length} 已提取)`,
      });
      
      console.log(`[DB:Sprite] 加载了 ${defs.length} 个精灵定义`);
    } catch (err) {
      console.error('[DB:Sprite] 初始化失败:', err);
      this.setData({ dbStatus: '⚠️ 初始化失败' });
    }
  },

  onReady() {
    // 为每个精灵定义初始化 Canvas
    this._initCanvases();
  },

  _initCanvases() {
    const defs = this.data.definitions;
    // 最多渲染前16个的Canvas
    const renderCount = Math.min(defs.length, 16);
    
    for (let i = 0; i < renderCount; i++) {
      const query = wx.createSelectorQuery().in(this);
      query.select(`#spr-def-${i}`)
        .fields({ node: true, size: true })
        .exec((res: any) => {
          if (!res || !res[0]) return;
          const canvas = res[0].node;
          canvas.width = TILE_SIZE * 4;
          canvas.height = TILE_SIZE * 4;
          const ctx = canvas.getContext('2d');
          // @ts-ignore
          this._ctxMap.set(i, ctx);
          this._renderDefinition(i);
        });
    }
  },

  _renderDefinition(idx: number) {
    // @ts-ignore
    const ctx = this._ctxMap.get(idx);
    if (!ctx) return;
    // @ts-ignore
    const chrData = this._chrData;
    const def = this.data.definitions[idx];
    if (!def) return;

    // 清屏
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, TILE_SIZE * 4, TILE_SIZE * 4);

    if (!def.loaded) {
      // 未加载: 显示占位符
      ctx.fillStyle = '#444';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('待提取', TILE_SIZE * 2, TILE_SIZE * 2 - 4);
      ctx.fillStyle = '#666';
      ctx.fillText('(Bank ' + def.bankId + ')', TILE_SIZE * 2, TILE_SIZE * 2 + 12);
      return;
    }

    // 有数据时的渲染逻辑 (待数据提取后实现)
    if (def.data && chrData?.[0]) {
      const bank = chrData[0];
      const pal = [
        0xFF000000,
        NES_PALETTE[0x11] ?? 0xFF4444FF,
        NES_PALETTE[0x21] ?? 0xFF4488FF,
        NES_PALETTE[0x31] ?? 0xFF44CCFF,
      ];
      
      // 简单渲染: 假设数据是 [tileIdx, attr, x, y, ...] 序列
      const entrySize = 4; // tileIdx(1) + attr(1) + x(1) + y(1)
      const entryCount = Math.floor(def.data.length / entrySize);
      
      for (let e = 0; e < Math.min(entryCount, 16); e++) {
        const off = e * entrySize;
        const tileIdx = def.data[off];
        const attr = def.data[off + 1];
        const sx = (def.data[off + 2] ?? 0) & 0xFF;
        const sy = (def.data[off + 3] ?? 0) & 0xFF;
        
        const base = (tileIdx & 0xFF) * 16;
        for (let row = 0; row < 8; row++) {
          const plane0 = bank[base + row] || 0;
          const plane1 = bank[base + row + 8] || 0;
          for (let col = 0; col < 8; col++) {
            const bit = 7 - col;
            const ci = ((plane1 >> bit) & 1) << 1 | ((plane0 >> bit) & 1);
            if (ci === 0) continue;
            const color = pal[ci] || 0xFF000000;
            ctx.fillStyle = `rgb(${(color >> 16) & 0xFF},${(color >> 8) & 0xFF},${color & 0xFF})`;
            ctx.fillRect(sx + col, sy + row, 1, 1);
          }
        }
      }
    }
    
    // 边框
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(0.5, 0.5, TILE_SIZE * 4 - 1, TILE_SIZE * 4 - 1);
  },

  /** 点击精灵定义 */
  onSpriteTap(e: any) {
    const idx = e.currentTarget.dataset.index;
    const def = this.data.definitions[idx];
    wx.showToast({
      title: `#${idx} ${def.name} (Bank ${def.bankId})${def.loaded ? '' : ' [待提取]'}`,
      icon: 'none',
      duration: 2000,
    });
  },
});
