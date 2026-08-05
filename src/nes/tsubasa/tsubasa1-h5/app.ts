/**
 * 天使之翼1 — 微信小程序入口
 * 纯TypeScript + Canvas实现，不使用DOM
 * 
 * globalData: 全局共享数据
 *   - game: Tsubasa 游戏实例 (供 game 页面使用)
 *   - 注意: 调试/数据库页面使用 RomDatabase，不依赖 game 实例
 */
import { Tsubasa } from './src/core/Tsubasa';
import { RomDatabase } from './src/data/RomDatabase';

App({
  onLaunch() {
    console.log('[Tsubasa1] 游戏启动 v0.3.1');
    
    // 预初始化 ROM 数据库 (所有 database 页面都依赖它)
    try {
      const db = RomDatabase.getInstance();
      db.init();
      console.log('[Tsubasa1] ROM 资源数据库已就绪');
    } catch (err) {
      console.warn('[Tsubasa1] ROM 数据库初始化失败 (部分功能可能不可用):', err);
    }
  },
  
  globalData: {
    version: '0.3.1',
    debugMode: false,
    /** 当前游戏实例 (由 game.ts 页面设置，仅运行时态) */
    game: null as Tsubasa | null,
  },
});
