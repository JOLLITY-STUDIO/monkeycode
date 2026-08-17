/// <reference path="./typings/index.d.ts" />

App({
  globalData: {
    version: "0.1.0",
    // 当前选中的拼图
    currentPuzzle: null as any,
  },
  onLaunch() {
    // Picross DS (USA) 逆向转写 H5 小程序启动
    console.log("[PicrossDS] launch");
  },
});
