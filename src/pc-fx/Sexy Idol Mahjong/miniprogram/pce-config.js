// miniprogram/pce-config.js
// 本文件由用户编辑 —— 在此填入 COS 上 PCE.js player 的 URL 后，
// 重启小程序即可在 pages/pce/index 加载浏览器运行页。
//
// 部署说明:
//   1. 把整个 _tools/pcejs-player/ 目录上传到 COS / 静态网站托管
//   2. 也把 _tools/extracted/ 里的 .bin / .cue 上传
//   3. 把 pce-config.js 里的 indexUrl / biosUrl / gameUrl 填成 HTTPS URL
//   4. 重启小程序, 状态条会从 "待配置" 变成 "就绪"
module.exports = {
  pcejs: {
    // 部署完 pcejs-player/ 之后的入口 URL
    indexUrl: 'https://your-static-host.example.com/pcejs-player/',
    // BIOS (syscard3.pce, ~256 KB) CDN URL
    biosUrl: '',
    // 游戏镜像 (.cue, PCE.js 会自动取同名 .bin) CDN URL
    gameUrl: '',
  },
};
