// miniprogram/pages/index/index.js
// 入口页面：列出从 CHD 镜像提取出来的产物，
// 不调用任何 wx.cloud / 云函数。

// 同步一份 pce-config.js，避免越界 require（小程序要求 file 在 miniprogram/ 内）
const pceCfg = require('../../pce-config.js');
const pceReady = !!(pceCfg && pceCfg.pcejs && pceCfg.pcejs.indexUrl &&
  !pceCfg.pcejs.indexUrl.includes('your-'));

Page({
  data: {
    pceReady,
    stats: {
      cueSize: '360 MB (.bin) + 1.2 KB (.cue)',
      audio: '24 轨 CDDA, 总时长 ≈ 30 min',
      ip: 'Hudson Soft IP.BIN, 偏移由 split_tracks.py 自动定位',
    },
  },

  onTapCue() {
    wx.showModal({
      title: '光盘镜像',
      content: '文件位于 _tools/extracted/Sexy Idol Mahjong - Yakyuuken no Uta (Japan).bin / .cue。\n微信小程序无法直接读 360MB 文件，需走 COS。',
      showCancel: false,
    });
  },

  onTapAudio() {
    wx.showModal({
      title: '原声音轨',
      content: '24 个 WAV 文件位于 _tools/extracted/audio/。\n采样率 44.1 kHz, 16-bit stereo。\n可在 PC/Mac 直接播放，或传到云端做背景音乐循环。',
      showCancel: false,
    });
  },

  onTapIp() {
    wx.showModal({
      title: 'IP.BIN 元数据',
      content: 'HUDSON 256 字节头部位于 _tools/extracted/track_data/track_02/IP.BIN (以及 track_26/IP.BIN)。\n含 copyright / title / developer / volume / IPL 入口 MSF 等字段。',
      showCancel: false,
    });
  },

  onTapPce() {
    wx.navigateTo({ url: '/pages/pce/index' });
  },

  onTapMame() {
    wx.showModal({
      title: 'MAME 脚本说明',
      content: 'dump_vram.lua 是 MAME 0.289+ 插件脚本，通过 -script 参数挂载。\n需本机安装 mame.exe，并把工作目录切到本项目 _tools/。\n具体用法见 _tools/mame-scripts/dump_vram.lua 顶部注释。\n小程序的 webview 不能跑 PC Engine, CG 提取请在 PC 上完成。',
      showCancel: false,
    });
  },
});
