# NES Auto Ripper

基于 JSNES 的全自动 NES 逆向工程工具。加载 ROM 后自动运行、自动探索输入、自动采集精灵素材并导出 PNG 图集到 `output/` 目录。

## 功能

- **全自动探索**: 引导阶段自动通过标题菜单进入游戏, 探索阶段自动遍历地图
- **精灵采集**: 邻近聚类识别实体, 拼接 tile 为完整贴图, 指纹去重
- **CPU 反汇编**: 实时 6502 指令流, 当前 PC 高亮
- **APU 分析**: 方波/三角波/噪声/DMC 五通道状态
- **素材导出**: 精灵图集自动保存到 `output/` 目录

## 使用

```bash
npm install
npm run dev
```

加载 `.nes` ROM 文件, 一切自动。

## 技术栈

- JSNES v2 — NES 模拟引擎
- Vite — 开发服务器
- Web Audio API — 实时音频播放
