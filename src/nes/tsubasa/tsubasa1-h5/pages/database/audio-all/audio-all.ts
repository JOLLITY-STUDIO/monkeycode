/**
 * 音频资源数据库查看器
 * 
 * 展示 ROM 中提取的全部静态音频资源:
 *   - BGM (背景音乐) 数据
 *   - SFX (音效) 数据
 * 
 * 音频数据存储在 Bank 5 中 (标题+音频引擎 Bank)
 * 使用 NES APU 格式 (方波/三角波/噪声/DPCM序列)
 * 
 * 注意: 这里展示的是 ROM 静态音频数据 (乐谱/音效序列)，
 *       不是游戏运行时的音频播放状态。
 */
import { RomDatabase, AudioEntry } from '../../../src/data/RomDatabase';

Page({
  data: {
    bgmList: [] as AudioEntry[],
    sfxList: [] as AudioEntry[],
    dbStatus: '未初始化',
    totalBgm: 0,
    totalSfx: 0,
    loadedBgm: 0,
    loadedSfx: 0,
  },

  onLoad() {
    this._initDatabase();
  },

  onShow() {
    this._initDatabase();
  },

  _initDatabase() {
    try {
      const db = RomDatabase.getInstance();
      db.init();
      
      const bgmList = db.getAudioByType('bgm');
      const sfxList = db.getAudioByType('sfx');
      
      this.setData({
        bgmList,
        sfxList,
        totalBgm: bgmList.length,
        totalSfx: sfxList.length,
        loadedBgm: bgmList.filter(a => a.loaded).length,
        loadedSfx: sfxList.filter(a => a.loaded).length,
        dbStatus: `✅ ROM 数据索引完成 (BGM:${bgmList.length}, SFX:${sfxList.length} | 音频引擎未实现)`,
      });
      
      console.log(`[DB:Audio] BGM: ${bgmList.length} 首, SFX: ${sfxList.length} 个`);
    } catch (err) {
      console.error('[DB:Audio] 初始化失败:', err);
      this.setData({ dbStatus: '⚠️ 初始化失败' });
    }
  },

  /** 点击音频条目 */
  onAudioTap(e: any) {
    const idx = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;
    const list = type === 'bgm' ? this.data.bgmList : this.data.sfxList;
    const entry = list[idx];
    
    wx.showToast({
      title: `#${entry.id} ${entry.name}${entry.loaded ? ' [已提取]' : ' [待提取]'}`,
      icon: 'none',
      duration: 2000,
    });
  },
});
