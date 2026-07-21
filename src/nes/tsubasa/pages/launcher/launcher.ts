Page({
  onGame() {
    wx.navigateTo({ url: '/pages/game/game' });
  },

  onGameJsnes() {
    wx.navigateTo({ url: '/pages/game_jsnes/game_jsnes' });
  },

  onNesEmulator() {
    wx.navigateTo({ url: '/subpkg/nes-emulator/pages/index/index' });
  },
});
