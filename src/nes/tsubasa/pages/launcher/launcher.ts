Page({
  onGame() {
    wx.navigateTo({ url: '/pages/game/game' });
  },

  onNesEmulator() {
    wx.navigateTo({ url: '/subpkg/nes-emulator/pages/index/index' });
  },
});
