# 开发日志

> 项目: 天使之翼 H5 | 创建: 2026-08-04

---

## 2026-08-04: v0.2.2 - 小程序渲染修复 + CHR 资源验证

### 修复
- 🐛 **MpPlatform.loadImage 重写**: 使用 `canvas.createImage()` 替代裸 JS 对象
  - 保存离屏 canvas 引用用于 `createImage()`
  - 图片加载失败时输出明确错误信息
- 🐛 **MpPlatform.requestAnimationFrame 修复**: 
  - 新增 `setMainCanvas()` 方法保存主 canvas 引用
  - 回退方案从 `window.setTimeout` 改为 `setInterval`（小程序兼容）
  - 正确管理定时器句柄用于 `cancelAnimationFrame`
- 🐛 **素材路径修复**: `spriteBasePath` 从 `/sprites/` → `/public/sprites/`
- 🐛 **Renderer 兼容性修复**:
  - `ctx.canvas.width` 设置增加 try-catch（小程序可能只读）
  - `drawImage` 调用统一使用 `(img as any).raw || img` 提取原始对象
  - `ICanvasContext` 接口增加 `save/restore/translate/scale` 方法
- 🐛 **错误日志增强**: `loadAllChrBanks` 失败时输出首个错误详情

### 验证
- ✅ TypeScript 编译通过 (tsconfig.json + tsconfig.mp.json)
- ✅ 16 个 CHR Bank PNG 已从 ROM 提取完成
- ⏳ 微信开发者工具渲染测试 (待刷新)

---

## 2026-08-04: v0.2.1 - 微信小程序模块解析修复

### 修复
- 🐛 **BUG-004**: 修复微信小程序无法解析 `'../engine/states'` 目录索引问题
  - 微信小程序模块系统不支持目录→index.js 自动解析
  - `Tsubasa.ts:30` 将 `'../engine/states'` → `'../engine/states/index'`
  - 错误: `module 'src/engine/states.js' is not defined`

---

## 2026-08-04: v0.2.0 - 双平台环境搭建

### 核心改动
1. ✅ **平台抽象层** - 新增 `src/platform/`
   - `IPlatform.ts` — 统一接口 (Canvas/Image/RAF/时间)
   - `web/WebPlatform.ts` — 浏览器实现
   - `web/main.ts` — 浏览器入口
   - `miniprogram/MpPlatform.ts` — 微信小程序实现

2. ✅ **微信小程序项目** - 新建 `miniprogram/` 目录
   - `app.ts/json/wxss` — 小程序主体
   - `pages/game/game.ts/json/wxml/wxss` — 游戏页面
   - Canvas 2D API + 虚拟手柄 + 触摸事件
   - `project.config.json` — 开发者工具配置

3. ✅ **核心重构** - 去 web 硬依赖
   - `Tsubasa.ts` → 构造函数改为 `(platform, ctx, options)`
   - `Renderer.ts` → 使用 `IPlatform.createOffscreenCanvas` / `loadImage`
   - `GameLoop.ts` → 使用 `IPlatform.requestAnimationFrame` / `now()`
   - 旧 `main.ts` 废弃，入口改为 `src/platform/web/main.ts`

### 架构决策
- 游戏核心 (.ts 逻辑) 与平台渲染 (.wxml/.html) 完全分离
- `IPlatform` 接口仅包含 Canvas 2D 公共子集，web 和小程序都兼容
- 虚拟手柄在各自平台层实现，核心只接收 `pressButton/releaseButton`

### 验证状态
- [x] TypeScript 编译通过 (无 lint 错误)
- [ ] 浏览器 `vite dev` 启动测试
- [ ] 微信开发者工具预览测试

---

## 2026-08-04: 项目初始化 (v0.1.0)

### 完成工作
1. ✅ ROM 结构分析 - 完成 `ROM_STRUCTURE_REPORT.md`
2. ✅ 架构设计 - 完成 `ARCHITECTURE.md`
3. ✅ 项目框架搭建 (核心/缓存/输入/渲染/引擎/状态/工具 模块)

### 待解决问题
- [ ] CHR Bank PNG提取和验证
- [ ] Bank 1/4/6 的实际游戏逻辑转写
- [ ] Bank 3/5 的数据定义提取
- [ ] Bank 7 的事件脚本引擎
- [ ] 完整的渲染管道（CHR tile绘制）
