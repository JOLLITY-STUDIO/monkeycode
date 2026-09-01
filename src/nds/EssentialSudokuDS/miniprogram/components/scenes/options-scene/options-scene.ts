// components/scenes/options-scene/options-scene.ts — 选项场景组件
// BGM/SE 音量持久化 + 清除数据 + 评分/制作/关于 (跳转 triggerEvent)

import {
  NBM_SETU03,
  NBM_SELECT3_BGM_VOLUME_NORMAL,
  NBM_SELECT3_SE_VOLUME_NORMAL,
  NBM_SELECT3_CLEAR_NORMAL,
  NBM_SELECT3_RATE_NORMAL,
  NBM_SELECT3_CREDITS_NORMAL,
} from '../../../utils/sudoku/nbmAssets';

const BGM_VOLUME_KEY = 'esds_bgm_volume';
const SE_VOLUME_KEY = 'esds_se_volume';

Component({
  data: {
    bgmVolume: 100,
    seVolume: 100,
    setu03Url: NBM_SETU03,
    bgmVolumeIconUrl: NBM_SELECT3_BGM_VOLUME_NORMAL,
    seVolumeIconUrl: NBM_SELECT3_SE_VOLUME_NORMAL,
    clearIconUrl: NBM_SELECT3_CLEAR_NORMAL,
    rateIconUrl: NBM_SELECT3_RATE_NORMAL,
    creditsIconUrl: NBM_SELECT3_CREDITS_NORMAL,
  },

  lifetimes: {
    attached() {
      const bgm = wx.getStorageSync(BGM_VOLUME_KEY);
      const se = wx.getStorageSync(SE_VOLUME_KEY);
      this.setData({
        bgmVolume: typeof bgm === 'number' ? bgm : 100,
        seVolume: typeof se === 'number' ? se : 100,
      });
    },
  },

  methods: {
    onBgmVolumeChange(e: any) {
      const v = Number(e.detail.value);
      this.setData({ bgmVolume: v });
      wx.setStorageSync(BGM_VOLUME_KEY, v);
    },

    onSeVolumeChange(e: any) {
      const v = Number(e.detail.value);
      this.setData({ seVolume: v });
      wx.setStorageSync(SE_VOLUME_KEY, v);
    },

    /** 清除进度与设置 */
    onClearData() {
      wx.showModal({
        title: '清除数据',
        content: '将删除所有进度与设置，确定继续？',
        confirmColor: '#e65100',
        success: (res) => {
          if (!res.confirm) return;
          try {
            const info = wx.getStorageInfoSync();
            (info.keys || []).forEach((k: string) => {
              if (k.startsWith('esds_')) wx.removeStorageSync(k);
            });
          } catch (err) {
            // storage 枚举失败则逐个清已知 key
            wx.removeStorageSync(BGM_VOLUME_KEY);
            wx.removeStorageSync(SE_VOLUME_KEY);
          }
          this.setData({ bgmVolume: 100, seVolume: 100 });
          wx.showToast({ title: '已清除', icon: 'success' });
        },
      });
    },

    /** 评分占位 */
    onRate() {
      wx.showToast({ title: '可在微信中搜索体验', icon: 'none' });
    },

    /** 制作人员 */
    onCredits() {
      this.triggerEvent('open-staff');
    },

    /** 关于页 */
    onAbout() {
      this.triggerEvent('open-about');
    },

    /** 返回主菜单 */
    onBack() {
      this.triggerEvent('back');
    },
  },
});
