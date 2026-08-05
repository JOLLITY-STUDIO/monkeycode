/**
 * 调色板数据库查看器
 * 
 * 展示 ROM 中提取的全部静态调色板数据:
 *   1. NES 系统64色调色板 (硬件定义，永不改变)
 *   2. 各场景调色板表 (从 PRG Bank 中提取的32字节调色板)
 * 
 * 注意: 这里展示的是 ROM 静态数据，不是游戏运行时的 paletteRam。
 *       paletteRam 会随游戏状态变化，不属于数据库范畴。
 */
import { RomDatabase, PaletteTableEntry } from '../../../src/data/RomDatabase';
import { NES_PALETTE } from '../../../src/core/types';

interface RgbColor {
  r: number; g: number; b: number; hex: string;
  index: number;
}

function toRgb(nesColor: number, index: number): RgbColor {
  const r = (nesColor >> 16) & 0xFF;
  const g = (nesColor >> 8) & 0xFF;
  const b = nesColor & 0xFF;
  return {
    r, g, b,
    hex: `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase(),
    index,
  };
}

Page({
  data: {
    /** 系统64色调色板 */
    systemPalette: [] as RgbColor[],
    
    /** 场景调色板 (每组= BG 4色×4 + SPR 4色×4 = 32字节) */
    scenePalettes: [] as Array<{
      entry: PaletteTableEntry;
      bgGroups: RgbColor[][];   // 4组背景调色板
      sprGroups: RgbColor[][];  // 4组精灵调色板
    }>,
    
    /** 数据库状态 */
    dbStatus: '未初始化' as string,
    dbLoaded: false,
  },

  onLoad() {
    console.log('[DB:Palette] 调色板数据库查看器加载');
    this._initDatabase();
  },

  onShow() {
    // 每次显示时刷新 (确保数据库已初始化)
    this._initDatabase();
  },

  /** 初始化数据库并加载调色板数据 */
  _initDatabase() {
    try {
      const db = RomDatabase.getInstance();
      db.init();
      
      // 1. 系统调色板
      const sysPal = db.getSystemPalette();
      this.setData({
        systemPalette: sysPal.map((c, i) => toRgb(c, i)),
        dbLoaded: true,
        dbStatus: '✅ ROM 数据已加载',
      });

      // 2. 场景调色板
      const tables = db.getPaletteTables();
      const sceneData = tables.map(entry => {
        const bgGroups: RgbColor[][] = [];
        const sprGroups: RgbColor[][] = [];
        
        for (let i = 0; i < 4; i++) {
          // BG 调色板: offset 0-15
          const bg: RgbColor[] = [];
          for (let j = 0; j < 4; j++) {
            const idx = entry.data[i * 4 + j] ?? 0x0F;
            bg.push(toRgb(NES_PALETTE[idx & 0x3F] ?? 0xFF000000, idx));
          }
          bgGroups.push(bg);
          
          // SPR 调色板: offset 16-31
          const spr: RgbColor[] = [];
          for (let j = 0; j < 4; j++) {
            const idx = entry.data[16 + i * 4 + j] ?? 0x0F;
            spr.push(toRgb(NES_PALETTE[idx & 0x3F] ?? 0xFF000000, idx));
          }
          sprGroups.push(spr);
        }
        
        return { entry, bgGroups, sprGroups };
      });

      this.setData({ scenePalettes: sceneData });
      console.log(`[DB:Palette] 已加载 ${sceneData.length} 组场景调色板`);
    } catch (err) {
      console.error('[DB:Palette] 初始化失败:', err);
      this.setData({ dbStatus: '⚠️ 初始化失败' });
    }
  },

  /** 点击系统调色板颜色 */
  onColorTap(e: any) {
    const idx = e.currentTarget.dataset.index;
    const c = NES_PALETTE[idx];
    const r = (c >> 16) & 0xFF;
    const g = (c >> 8) & 0xFF;
    const b = c & 0xFF;
    wx.showToast({
      title: `$${idx.toString(16).toUpperCase().padStart(2, '0')}: rgb(${r},${g},${b})`,
      icon: 'none',
      duration: 2000,
    });
  },
});
