Page({
  onGame() {
    wx.navigateTo({ url: '/pages/game/game' });
  },

  onGameCompare() {
    wx.navigateTo({ url: '/pages/game_compare/game_compare' });
  },

  onGameJsnes() {
    wx.navigateTo({ url: '/pages/game_jsnes/game_jsnes' });
  },

  onNesEmulator() {
    wx.navigateTo({ url: '/subpkg/nes-emulator/pages/index/index' });
  },

  onTsubasaCore() {
    wx.navigateTo({ url: '/pages/tsubasaFromCore/tsubasaFromCore' });
  },
});
