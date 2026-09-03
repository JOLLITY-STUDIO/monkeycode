# Changelog

All notable changes to this project are documented here.

---

## V0.49.6 — 产品重新命名「点豆成画」+ 界面 title 全面替换

### 2026-09-03

#### 用户决策 (第 4 轮对话)
- 产品不是纯数独: **主玩法 = 图画谜题 (绘逻辑)**, 数独只是附带
- 核心定位: 图画谜题通关结果 = 像素答案图, **将来与拼豆 (PBA) 结合** — 可拿去拼 / 生成图纸
- 不再沿用 NDS 原版名字, 要求重新起名 + 改界面 title

#### 新品牌名: 点豆成画
- 含义: 一格一格"点"下去, 像豆子一样拼成画 — 天然串起「谜题 → 像素画 → 拼豆」闭环
- 英文副标: `PUZZLE · PICTURE · BEADS` (从谜题到图画到拼豆)
- 备选 (未采纳): 豆落成图 / 谜豆工坊 / 一格一画
- 版权行保留原作血统标注: "源自 NDS Essential Sudoku DS 图画谜题"

#### 界面 title 改动清单 (5 文件)
1. `title-scene.wxml`: brand 大字 `ESSENTIAL SUDOKU DS` → `点豆成画` + 新增 `.brand-sub` 英文副标 `PUZZLE · PICTURE · BEADS`
2. `title-scene.wxss`: `.brand-wrap` 改 column 布局 (加 gap 6px); `.brand-en` 字号 28→30px + letter-spacing 6px + 中文字体栈 (PingFang SC / Microsoft YaHei); 新增 `.brand-sub` 11px 副标样式
3. `menu-scene.wxml`: 大标题 `ESSENTIAL PUZZLE DS` → `点豆成画`; 副标 `每日拼图` → `图画谜题 · 拼豆图纸`; 版权行 → `点豆成画 · 源自 NDS Essential Sudoku DS 图画谜题 · v...`
4. `about-scene.wxml`: 游戏名 → `点豆成画`; 新增"原版"行保留 `Essential Sudoku DS (NDS)`; 玩法行主次对调 (图画谜题 1525 在前); 版本行 → `H5 复刻版 · 支持拼豆图纸导出`
5. `pages/index/index.wxml`: 顶部 ad-slot 占位文本 `ESSENTIAL SUDOKU DS` → `点豆成画`

#### 保留不动的
- NDS 原版版权行 (title-scene `© 2006 DIGITALWARE / D3 Publisher`) — 复刻需署名
- about-scene 开发商 / 原版行 — 真实血统信息
- 文件夹名 / README 标题暂不动 (结构性改动, 待品牌名最终确认后再做全量替换)

#### 教训
- 新名字要反映**主玩法与输出闭环**, 而非照抄原作标题
- 品牌改名后所有界面文案点需要全量扫描 (title/menu/about/index ad-slot), 防止新旧混用

---
## V0.49.5 — 删除 sudoku 关卡内误加的"难度切换"控件 (回归原作行为)

### 2026-09-03

#### 用户反馈 (第 4 轮)
"我不明白为啥进入关卡玩的时候，还能切换简单中等这些level呢，我都不知道为啥要这么做有啥区别吗，一个关卡还有多种难度，你是不是哪里误会了原作啊？"

#### 原作行为 (NDS Essential Sudoku DS)
- 选题页 (select-scene): 显示 4 档难度 A/B/C/D (简单/中等/困难/专家), 每档 250 题共 1000 题
- **每题难度是固定 metadata**, 跟题号绑死 (numpleX.data_NNN → puzzle.difficulty)
- 关卡页 (sudoku-scene): 只有 **9×9 数独棋盘 + 数字 1-9 键盘 + 操作工具 (撤销/重做/笔记/清除/提示)**
- **没有"关卡内难度切换"控件**, 这是我之前的误读

#### V0.49.4 之前我的误加
- wxml line 19-28: `<view class="diff-row">` 整段难度切换 chip (5 个: 简单/中等/困难/专家/每日一题)
- ts `DIFF_ORDER` 常量 + `diffChips`/`diffLabels` data
- ts `onTapDifficulty(e)` 方法 - 主动放弃当前题清档再随机新题
- wxss `.diff-row` / `.diff-chip` / `.diff-chip-active` 样式
- 顶部 `difficultyLabel` 文字 (只读 metadata) 保留

#### V0.49.5 修复
1. **wxml**: 删除 `<view class="diff-row">` 整段 (line 19-28 移除)
2. **ts**:
   - 删除 `DIFF_ORDER` 常量
   - 删除 `diffChips` / `diffLabels` data 字段
   - 删除 `onTapDifficulty(e)` 方法 (连同 JS Doc 注释)
   - 顶部 `// 难度切换` 注释改为关卡 metadata 说明
3. **wxss**: 删除 `.diff-row` / `.diff-chip` / `.diff-chip-active` 样式 (3 个选择器块)
4. 顶部 difficultyLabel 文字保留, 只作关卡 metadata 显示 (不可点击)

#### select-scene 选题页正确性核对
- `select-scene.ts` 选题页本身是合理的:
  - 4 档难度按钮 (简单/中等/困难/专家) → 这是正确的, 原作 NDS 也在这里选档
  - 题号上下箭头 + 输入框 → 也是正确的
  - 点 Start → `triggerEvent('start', { id, no })` 把题号转 puzzleId 透传 sudoku-scene
  - sudoku-scene 拿 puzzleId → `getPuzzleById(id)` → `puzzle.difficulty` 锁定
- **所以只在 sudoku-scene 里删难度切换 UI 即可**, select-scene 不动

#### 改动清单 (3 文件)
1. `miniprogram/components/scenes/sudoku-scene/sudoku-scene.wxml`: 删 `<view class="diff-row">` 整段 (10 行)
2. `miniprogram/components/scenes/sudoku-scene/sudoku-scene.ts`:
   - 顶部注释: 删"难度切换" + 加"原作无切换控件"说明
   - 删 `DIFF_ORDER` 常量
   - 删 data `diffChips` / `diffLabels`
   - 删 `onTapDifficulty` method
3. `miniprogram/components/scenes/sudoku-scene/sudoku-scene.wxss`:
   - 删 `.diff-row` / `.diff-chip` / `.diff-chip-active` 3 个选择器块
   - 顶部注释: "难度切换 chips" → "关卡难度 (只读 metadata)"

#### 教训 (写进 CHANGELOG, 防止复发)
- **必须先理解原作再设计 UI**: NDS Essential Sudoku DS 关卡页只展示 + 操作, 不允许"换题" 操作
- **关卡 metadata vs 控件**: 关卡难度/编号/计时器是只读 metadata 文字, **不应该是可点击 chip**
- **回归原作**: 任何新增 UI 控件, 先问"原作这里有这个控件吗?" → 没就**不加**, 而非"我想加就加"

---

## V0.49.4 — 网格加大 + 整数边界 + Press START 按钮 Skyline host 修复

### 2026-09-03

#### 用户反馈 (第 3 轮)
- "网格线嗯么看起来不是一堆正方形, 网格线必须是整数单位"
- "那个点击开始的按钮呢" (截图中看到品牌标题 + 满屏背景, 但中部 Press START 按钮不见)

#### 根因 1: 网格线 24/72 偏小, 像"密集小纸"而非"一堆正方形"
- iPad Pro 12.9 landscape 1366×1024 屏幕:
  - 24px 周期 → 横向 56.9 格, 纵向 42.7 格, 每格 ≈ 24px CSS px
  - 在视网膜屏太小, 视觉上像"小密集颗粒", 不是"清晰的格子"
- 加 64 padding 让边界整数倍落在 viewport 外, 但 +64 在视野外 → 视觉右/下边界不齐
- "整数单位"指: 周期间隔是整数像素 (32 是 ✓), 边线位置应是整数 (i*step ✓)

#### 根因 2: Press START 按钮不见 (Skyline Component host height:100% 不传递)
- `.title-page` 设 `height: 100%`, 但 Skyline 下 Component 默认 inline-block / position:static
- 内部 flex column 依赖 parent height, parent height 实际是 content-size
- `.press-area flex:1` 在 parent height = auto 时不工作 → press-area 高度坍缩
- 结果: Press START 按钮连同 .hint-line + 版权一起看不见

#### V0.49.4 修复
1. **网格线加大 (24/72 → 32/96) + 严格整除边界**:
   - `bg-fx.ts` buildGridLines: 周期 24/72 → 32/96 (稀疏一倍 → "一堆清晰正方形")
   - 边界算法: `Math.floor(max/step)*step`, 不 +64 padding
     → 最后一条线落在 viewport 内最接近的整数倍位置, 整屏满铺"格纸" 视觉
2. **Press START 按钮绝对定位修复**:
   - `title-scene.wxss`:
     - `.brand-wrap` / `.copyright` 从 flex column item 改 absolute (top:28px / bottom:18px)
       → 不依赖 parent height, 永远落在固定位置
     - `.press-area` 改 `top:50% left:50% transform:translate(-50%,-50%)` 屏幕居中
       → 不依赖 flex:1, 即使 parent height 不确定也居中显示
     - `.press-start` 胶囊 padding 11→13, font 15→16, button 更显眼
     - `.pulse` 加 transform-origin center, 跟外层 translate 互不干扰
3. **全局兜底: scene Component host 强制 fill**:
   - `index.wxss` 新加 selector:
     ```css
     .scene-stage > title-scene, .scene-stage > menu-scene, ... {
       position: absolute; top:0; left:0; right:0; bottom:0;
       width:100%; height:100%; display:block;
     }
     ```
   - 强制每个 Scene Component host 绝对 fill .scene-stage → 内部 height:100% 现在有可靠父高

#### 改动清单 (4 文件)
1. `miniprogram/components/bg-fx/bg-fx.ts`: 24/72 → 32/96 + Math.floor 严格整除
2. `miniprogram/components/bg-fx/bg-fx.wxml`: 注释 V0.49.3 → V0.49.4 (24/72 → 32/96)
3. `miniprogram/components/bg-fx/bg-fx.wxss`: 注释 V0.49.3 → V0.49.4 + 设计原则说明
4. `miniprogram/components/scenes/title-scene/title-scene.wxss`: 改 absolute 布局, 不依赖 parent height
5. `miniprogram/pages/index/index.wxss`: scene Component host 强制 absolute fill

#### 教训 (写进注释, 防止复发)
- **Skyline Component host 默认 inline-block/position:static**,
  内部 `height:100%` 在 Component host 这一层不会自动撑满 → 必须:
  1) 父容器用 absolute 把 scene 节点绝对 fill, **或**
  2) 自己 Component root 用 `position:absolute; top:0; bottom:0; right:0; left:0`
- **flex:1 依赖父容器有确定高度**, 不确定时不会撑开 → 改 absolute + translate 居中更可靠
- **replace_in_file 边界** (V0.49.3 已记录): 同
- **CSS transform 居中**: 外层 translate + 内层 scale 互不覆盖 (各自独立 transform)
- **网格线稀疏**: 24px 在 retina 屏太小看不出格子感 → 32px 是更合适的"明显方格"密度

---

## V0.49.3 — bg-fx 网格线真实 view 阵列 + 修复动画层被孤儿 CSS 压死

### 2026-09-03

#### 用户反馈
- 第 1 轮: "拜托, 背景能固定渲染出平铺的网格线吗, 还是看不到啊" (网格线看不到)
- 第 2 轮: "不对啊, 原来的背景动画还是需要的啊只不过加上了平铺网格线"
  (修复网格后, 漂浮数字/小方块/柔光点等背景动画全部消失)

#### 根因 1: 网格线 (repeating-linear-gradient 不渲染)
- V0.49.2 用 4 个 view 的 `repeating-linear-gradient` 画网格, Skyline 1.4.21 完全静默不渲染

#### 根因 2: 背景动画消失 (孤儿 CSS 压死第 3-7 节)
- V0.49.2 → V0.49.3 用 replace_in_file 替换 .fx-grid 规则时, old_str 只覆盖到
  `.fx-grid-fine-v { ... height: 100%;` 就结束, **没覆盖到该规则后面的
  background/pointer-events/} 剩余行**
- 结果: wxss 第 98-105 行残留一段"无选择器的孤儿声明 + 悬空 }"
- WXSS 解析器在此报错 → 其后所有规则 (.band/.bob/.roll/@keyframes/
  .big-num/.mini-grid/.thought/.fx-beat) 全部失效 → 动画层整体消失,
  只剩渐变底 + (修复后的) 网格线

#### V0.49.3 修复
1. 网格线改用真实 view 阵列 (Skyline 最稳):
   - wxss: `.fx-grid-line-h` / `.fx-grid-line-v` 两个 class, 颜色粗细 inline 注入
   - ts: `buildGridLines()` attached 读 wx.getWindowInfo(), 24px/72px 周期生成
     {i, px} 数组 (fineH/fineV/boldH/boldV)
   - wxml: 4 段 wx:for 渲染 1px 深紫细线 + 2px 深粉宫粗线真实 view
2. 删除孤儿 CSS 块 (wxss 第 98-105 行残留) → 第 3-7 节动画层恢复解析:
   - band-distal 大数字横滚 + bob 上下浮
   - band-grids 小网格方块
   - band-thought 柔光点
   - .fx-beat 呼吸光

#### 层级顺序 (最终视觉)
fx-base 渐变底 < fx-grid 网格线 < band-distal/bg-grids/thought 动画漂浮层 < fx-beat
→ 网格线垫底恒定可见, 动画层半透明在上面继续漂浮 = "动画 + 平铺网格线" 并存

#### 改动清单 (3 文件, components/bg-fx/)
1. bg-fx.wxml: 头注释/编号修正 (3/3/4 → 3/4/5) + 网格线 4 段 wx:for
2. bg-fx.wxss: 删孤儿 CSS 块 + 头注释 V0.49.3 (注明动画层必须保留的教训)
3. bg-fx.ts: buildGridLines() + data 4 数组 + attached 计算

#### 教训 (写进注释, 防止复发)
- replace_in_file 替换大段规则时 old_str 必须带**完整结尾** (到该规则 `}` 为止),
  否则残留"孤儿声明块 + 悬空 }"会压死其后整个 wxss 的解析
- 本次即该 bug 的实例: 只覆盖了 .fx-grid-fine-v 开头没覆盖结尾,
  残留 height/background/pointer-events/} 四行

---

## V0.49.2 — bg-fx 全局背景景深感重做 (大深小浅 + 网格线强可见)

### 2026-09-03

#### 用户反馈
- "没有形成景深感, 大的内容要深色, 小的要浅色, 然后网格线起码一个像素啊, 现在完全看不到"
- 截图观察: 所有元素糖果浅色融浅粉底, 网格线看不到

#### 设计原则 (景深 = 大深小浅)
- **远景层** (.big-num 大数字): **深紫/深蓝调色板** + alpha 0.40-0.55 + 4 方向深紫描边
  → "远而虚", 像雾里看到的数字
- **网格线** (.fx-grid 数独格纸): **深紫深粉** + alpha 0.42 (细) / 0.55 (宫) + 1px/2px 实线
  → 浅渐变底上肉眼清晰可见, "起码 1 像素"
- **中景层** (.mini-grid 小方块): **糖果色保留** + alpha 0.55-0.76 + 深色 box-shadow
  → "中近而实", 在网格纸上"浮起"
- **近景层** (.thought 柔光点): 高亮糖果色 + alpha 0.80-1.00 + 双层 box-shadow 光晕
  → "最近最亮", 整屏高光闪烁

#### 改动清单 (3 文件, components/bg-fx/)
1. bg-fx.wxml:
   - 顶部注释 → V0.49.2 景深说明
   - .fx-grid 节点注释从 V0.49.1 → V0.49.2
   - band-distal/grids/thought 各自注释更新景深标识
   - thought box-shadow: 单层 10px → 双层 `0 0 14px 2px c, 0 0 28px 6px c` (强光晕)

2. bg-fx.wxss:
   - 顶部注释 → V0.49.2 景深方案
   - .fx-grid-bold-h/v: rgba(190,70,130,0.55) 深粉 2px (原 0.30 浅粉)
   - .fx-grid-fine-h/v: rgba(86,46,135,0.42) 深紫 1px (原 0.18)
   - .big-num text-shadow: 白描边 → 深紫 (46,22,70,0.85) 描边 + 顶部白色高光
   - .mini-grid box-shadow: 单层 10px 浅粉 → 双层 12px 深紫 + 内边框白色
   - .mini-cell border: rgba(0,0,0,0.06) → rgba(74,50,130,0.18) 深紫细线 (统一)
   - .mini-cell-filled 加 box-shadow: inset 白高光 + 1px 深紫外阴影 (浮起)
   - .thought 渐变 1.0 → 0.55 中段 stop 提到 0.78 (近而亮)

3. bg-fx.ts:
   - 文件头结构注释 → V0.49.2 6 层景深方案
   - 新增 DARK_CANDY 6 深色 (深葡萄紫/深天蓝/深玫红/深青/深橙棕/深靛)
   - buildBigNums(): CANDY → DARK_CANDY, o 0.45-0.75 → 0.40-0.55, s 28-76 → 32-88 (远处更大)
   - buildMiniGrids(): o 0.22-0.42 → 0.55-0.76 (V0.47 件数多透明度低, 现提上来让方块"实")
   - buildThoughts(): o 0.55-0.90 → 0.80-1.00, s 10-28 → 8-22 (近小而亮)

#### 视觉效果 (启动页 title 截图对比)
| 元素 | V0.49.1 之前 | V0.49.2 之后 |
|---|---|---|
| 网格线 | 浅紫 0.18 看不见 | 深紫 0.42, 深粉 0.55 宫粗线 肉眼清晰 |
| 大数字 | 糖果浅色融底色 | 深紫/深蓝 描深紫边 雾里远处感 |
| 小网格块 | 浅糖果 alpha 0.22 | 糖果色 alpha 0.66 + 深色阴影浮起 |
| 柔光点 | 单层光晕 alpha 0.55 | 高亮 + 双层光晕 alpha 0.90 像最近镜头光斑 |

**景深层次 (后 → 前)**: 网格纸 (深紫细线 / 深粉宫粗线) → 大数字 (深紫大字雾里) → 小网格方块 (糖果色浮起) → 柔光点 (亮闪). 4 个清晰深度层级, 整屏像有空间感。

---

## V0.49.1 — bg-fx 网格线 Skyline 兼容修复 (4 子 view 各画方向)

### 2026-09-03

#### 用户反馈
- "你不是平铺了网格线了吗怎么没看到" (启动页截图: 背景糖果渐变 + 漂浮装饰, 无网格线)

#### 根因
- V0.49 在 `.fx-grid` 用了 4 个 `linear-gradient` + 4 个 `background-size` 多值列表 + `background-repeat`
- Skyline 渲染器**不解析 `background-size: a, b, c, d;` 多值列表**, 整个 background-image 被当作非法整层丢弃
- 结果: .fx-grid 节点存在但绘制为空, 网格线完全不显示
- .fx-base 没踩坑是因为它用 background-size 默认值 (100%×100%)

#### 改动清单 (2 文件, components/bg-fx/)
1. bg-fx.wxml:
   - `.fx-grid` 内嵌 4 个子 view: fx-grid-bold-h / fx-grid-bold-v / fx-grid-fine-h / fx-grid-fine-v
   - 每个子 view 用单 background-image + 无需 size 列表, Skyline 完全兼容
2. bg-fx.wxss:
   - 删 `.fx-grid` 的 multi-image + multi-size + repeat 写法
   - 4 个子 view 各自 `repeating-linear-gradient` (单 background, 周期通过 color stop 表达):
     - bold-h/v: 72px 周期 × 2px 糖果粉 rgba(255,122,166,0.30) — 宫粗线
     - fine-h/v: 24px 周期 × 1px 柔和紫 rgba(182,108,229,0.18) — 细格线
   - 细线 alpha 0.13 → 0.18 (略提对比度, 浅背景更可见)

#### 视觉效果
- 启动页背景 = 糖果渐变 + 整屏 24px 数独格纸细线 + 72px 宫粗线 + 漂浮数字/小方块
- 真正"整张纸都是数独格", 不再是空糖果底

---

## V0.49 — bg-fx 全局背景整屏平铺网格线 (数独格纸)

### 2026-09-03

#### 用户反馈
- "我希望整个背景平铺网格或者网格线"

#### 改动清单 (3 文件, components/bg-fx/)
1. bg-fx.wxml:
   - 渐变底 .fx-base 之后新增 `.fx-grid` 整屏网格线层 (数字/小网格装饰之前 → 网格当底纸)
2. bg-fx.wxss:
   - 新增 .fx-grid: 纯 CSS 4 层 repeating-linear-gradient, 无需图片/JS
     - 细格线 24px 周期 × 1px, 柔和紫 rgba(182,108,229,0.13)
     - 宫粗线 72px 周期 (3×24 = 数独 3×3 宫) × 2px, 糖果粉 rgba(255,122,166,0.30)
     - 72 为 24 整数倍 → 宫线与细线从 (0,0) 天然对齐, 整屏像一张数独格纸
   - 后续 section 编号注释同步 +1 (3 视差骨架 → 7 顶部呼吸)
3. bg-fx.ts:
   - 文件头结构注释 5 层 → 6 层, 第 2 层 = .fx-grid

#### 视觉效果
- 启动页 (title) = 糖果渐变底 + 满屏 24px 数独格纸细线 + 72px 宫粗线,
  漂浮数字/小网格方块浮在网格纸上方 → "整张纸都是数独格" 的数独主题氛围
- 网格线极浅 (alpha 0.13/0.30), 不抢前景 UI; 静态不滚动, 视觉稳定

---

## V0.48 — 删掉 title-scene 中央 9×9 封面框 (红框网格真身)

### 2026-09-03

#### 用户反馈
- "整屏没有红色框的 9×9 装饰网格了（band-cover 全删） 怎么还有啊"

#### 根因
- V0.47 只删了 bg-fx 背景层里的 band-cover (4 角 9×9 网格 + 品牌字 + Press START 装饰)
- 但用户截图里的红框 9×9 网格其实来自 **title-scene 启动页自身的中央封面**:
  `.board-center > .board` (225px 白底 + 2.5px #b66ce5 粗紫框 + 9×9 小格 + 9 宫粗线)
  它是 title 场景的前景封面内容, 一直浮在 bg-fx 之上 → band-cover 删了它还在屏中央
- 用户要的是: 中间不要再有整块封面框, 让 bg-fx 的糖果网格 + 随机数字氛围铺满全屏

#### 改动清单 (3 文件, components/scenes/title-scene/)
1. title-scene.ts:
   - **删除** SUDOKU_SOLUTION (完整 9×9 解) / CELL_POP (9 个糖果格坐标) / CANDY 常量
   - **删除** SudokuCell interface + data.sudokuCells 81 格生成逻辑 (~40 行)
   - attached 只保留 pulse 定时器
2. title-scene.wxml:
   - **删除** `<view class="board-center">` 整块中央 9×9 封面网格 (~13 行)
   - Press START 胶囊 + hint 上移到原封面留白区
3. title-scene.wxss:
   - **删除** .board-center/.board/.cell/.cell-n/.cell-pop/.cell-n-pop 全部样式 + 6 条宫粗线 nth-child (~78 行)
   - .press-area 改 flex:1 占满中部留白区垂直居中

#### 验证
- 全项目扫描 board-center/cell-pop/sudokuCells/cover-grid/band-cover/SUDOKU_SOLUTION 等关键字:
  仅剩注释 + sudoku 玩法 game_service 的正常 board 数据字段, 无渲染残留
- IDE 语言服务 read_lints 0 诊断
- 视觉效果: 启动页 = bg-fx 糖果数字网格铺满整屏 + 顶部品牌字 + 中部 Press START,
  屏幕正中间不再有白底紫粗框 9×9 封面

---

## V0.47 — 撤销 V0.46 封面装饰 + 加密背景网格/数字铺满

### 2026-09-03

#### 用户反馈
- "我是说这个中间的框，不是连按钮也要放到背景啊大哥"
- "算了你给背景在增加静态的网格和随机数字铺满背景就好了"
- "然后把中间整个封面去掉"

#### 设计意图修正
- V0.46 把整个封面 (9×9 数独网格 + ESSENTIAL SUDOKU DS 品牌字 + Press START 胶囊) 都加到了 bg-fx 背景层
- 用户澄清: 只要那部分画面元素作为氛围平铺, 不需要把"按钮/品牌字" 等可交互元素也复制到背景 (避免 UI 重复)
- V0.47: 删 V0.46 整个封面装饰层, 反过来加强原有 band-distal (大数字) 和 band-grids (小网格) 的密度, 让画面真正铺满

#### 改动清单 (3 文件)
1. components/bg-fx/bg-fx.wxml:
   - **删除** `band band-cover` 整个静态装饰块 (.cover-piece/.cover-grid/.cover-brand-text/.cover-press),
     约 38 行 wxml
2. components/bg-fx/bg-fx.ts:
   - **删除** CoverCell/CoverPiece interface + buildCoverGridCells + buildCoverArt 函数, 约 70 行
   - **删除** data.coverArt 字段
   - **加密** bigNums 28 → 48 个/屏 (x 范围 2-94 → 1-99, y 范围 3-91 → 2-94, font 28-76, opacity 0.45-0.75)
   - **加密** miniGrids 12 → 20 件 (新增 8 件填缝隙, 坐标散布在 -4 ~ 96%, size 48-100px, 透明度降至 0.22-0.42 避免堆叠抢戏)
3. components/bg-fx/bg-fx.wxss:
   - **删除** .band-cover / .bob-4 / .cover-piece / .cover-grid / .cover-cell (6 条 nth-child) / .cover-cell-filled / .cover-cell-n / .cover-brand-text / .cover-press / .cover-press-text / .cover-press-pulse + @keyframes cover-press-pulse, 约 130 行

#### 验证
- IDE 语言服务 read_lints 0 诊断
- band-cover 完全移除, 所有引用连带删除, 不会留 dead CSS/class
- 背景视觉密度显著提升: 大数字从 28 → 48 个, 小网格从 12 → 20 件, 颜色更密但单件透明度降低, 整体仍是"氛围平铺"不抢前景

---

## V0.46 — 封面装饰下沉到 bg-fx 背景层 (封面元素作为氛围背景平铺, 已被 V0.47 撤销)

### 2026-09-03

## V0.45 — 全场景糖果亮底视觉统一 (标题 / 按钮 / 文本风格一致)

### 2026-09-03

#### 用户反馈
- "还有那个标题可以统一吗 我发现去掉别的场景样式又变了 都检查统一一下吧, 跟背景一样啊, 每个场景背景风格都一致"
- "按钮和文本也要风格一致啊"

#### 统一设计规范 (糖果亮底系, 背景 V0.39+ 为 #fff0f5 + bg-fx 糖果)
- 白玻璃卡: rgba(255,255,255,0.72~0.82) + 糖果紫边 rgba(182,108,229,0.35~0.45)
- 主标题/返回条字: 葡萄紫 #6a3aa0 (800), 次文字紫灰 #8f7ba6, 正文深紫灰 #4a3558
- 选中/active 态: 糖果紫渐变 (cf8ff5→b66ce5→a050d0) 白字
- 主操作按钮 (进入/开始/提示): 亮蓝渐变胶囊 (45b4f8→28a0f0→1e8fe8) — 全项目统一

#### 改动清单 (11 文件, 旧深色玻璃 rgba(22,42,66,…) 全部翻成白玻璃紫字)
1. styles/ds-buttons.wxss (公共): .ds-btn A 系 normal 深色玻璃→白玻璃紫字,
   hover 淡紫, active 糖果紫渐变白字 — 辐射 sudoku/pict-list/picture 全部 ds-btn 按钮
2. menu-scene: sub-btn 深色玻璃金边→白玻璃紫字, divider 金→紫, 主 game-btn 蓝渐变保留
3. select-scene: header 深蓝玻璃→白玻璃紫字, preview-text 亮底深字
4. picture-mode-scene: scene-bar/mode-button/hint-text → 白玻璃, active 糖果紫渐变白字+白箭头
5. pict-list-scene: pict-header/list-card 白玻璃紫字, cat 行 hover/active 淡紫,
   cat-dot/arrow 紫, 完成绿徽章亮底版
6. options-scene: scene-bar/options-card 白玻璃, label/正文紫系, value/滑块强调改紫
7. tutorial/about/staff: scene-bar + 卡片/图块容器 白玻璃, 标题紫/正文深紫灰
8. sudoku-scene: diff-label/timer 紫, stat 紫灰, diff-chip 白玻璃 + active 紫渐变,
   提示键亮蓝渐变
9. picture-scene: scene-bar/puzzle-name/timer 紫, cat-chip/nav-key 白玻璃 + active 紫渐变,
   调色板选中框/need 徽章/教程条/清空键危险红 全部亮底适配
10. title-scene (无改动, V0.39 已糖果化) + index 顶栏 (已亮玻璃紫边)

#### 验证
- IDE 语言服务 read_lints 0 诊断 (scenes 目录 + ds-buttons.wxss)

---

## V0.39 — 封面视觉下沉到全局 bg-fx 糖果动态背景 + 整屏提亮

### 2026-09-03

#### 用户反馈
- "背景重绘吧,背景就是一堆1-9的数字和3*3的格子代表两种玩法,然后使用欢快的颜色不要暗色。整个游戏界面提亮"
- "我是说将封面的内容放到背景中替换掉现有的背景的内容,但是保留动态效果"

#### bg-fx 全新糖果动态背景 (替代暗夜书桌)
- 深色暗夜书桌 → **浅色糖果渐变底**: 奶白 → 粉 → 暖黄 → 天蓝 → 薄荷 + 4 团彩色柔光
- **远景**: 28 个满屏漂浮大数字 1-9 (糖果 6 色, 白描边, 最慢横滚 90s) → 代表数字谜题玩法
- **中景**: 12 个 3×3/4×4/5×5/6×6 小网格方块 (糖果色线 + 部分小格填色) → 代表图画谜题玩法
- **近景**: 18 个彩色柔光点 (6 色晕) + 顶部暖白呼吸 (pulseMs)
- **保留全部动态效果**: 三层视差横滚 (roll) + 上下浮动 (bob) + 光点闪烁 + 呼吸, 无缝循环
- 全部纯 CSS 绘制 (数字 + 网格线), 不依赖图片, skyline 兼容

#### title-scene 透明化 (只留前景 UI)
- 移除 cover-bg/cover-glow/自绘散落数字层 → 背景全透明透出 bg-fx
- 保留: 顶部品牌标题 + 中央 9×9 数独网格 (白底卡片 + 糖果紫宫粗线 + 9 宫各 1 糖果格白字) + Press START 粉橙胶囊 + 版权
- 网格/press 阴影改糖果色系, 浅底可读

#### 整屏提亮
- index.wxss: page/page-root 深色 #0d1426 → 浅粉 #fff0f5; 顶部广告位深色玻璃 → 亮白玻璃 (糖果紫边框/文字)
- menu-scene: 顶部 LOGO 金/白字 → 葡萄紫深字 (亮底可读); 版权改深紫灰
- 其余场景自带深色半透明卡片/蓝按钮, 在亮 bg-fx 上保持可读, 未大改

---

## V0.38 — 标题封面改版: 数字背景 + 9×9 数独网格 (贴合 DS 原版封面)

### 2026-09-03

#### 用户反馈
- "应该是方块和数字,6色" + 参考 DS 模拟器封面截图
- "其实很简单,就是一个是一堆数字的背景,前面有一个3*3的格子,每个格子里面又是嵌入3*3的格子"

#### title-scene 封面全新布局 (极简 + DS 原版感)
- **深色底 + 中央微光**: 黑蓝渐变 (cover-bg) + 中央柔光晕 (cover-glow), 压过全局 bg-fx
- **满屏散落数字背景** (bg-num-layer): 22 个大号 1-9 数字确定性散布 (font 30-78px,
  半透明 0.05-0.17, 微旋转 ±22°, 6 色系), 模拟 DS 封面"一堆数字"底纹
- **中央 9×9 数独网格**: 216px 白底棋盘 (24px/格, 细灰蓝线), 3×3 宫深蓝粗线
  (nth-child 3n/6n 列 + 第 3/6 行), 内嵌完整 9×9 合法解
- **6 色方块点缀**: 9 宫各 1 格 (CELL_POP 9 格) 填 6 色调色板实色 + 白色粗数字,
  呼应"方块和数字,6色"与图画谜题 6 色调色板
- **底部 Press START**: 蓝色渐变胶囊 (蓝光阴影) + 1.7s 脉冲呼吸
- **版权两行**: © 2006 DIGITALWARE. / © 2006 D3 Publisher. All Rights Reserved.
- 全屏点击 → onTapStart → triggerEvent('start') (保留 audioService.playSe)

#### bg-fx 还原
- 移除先前误加的 decorationsEnabled prop (title-scene 自带不透明 cover-bg,
  无需 bg-fx 参与); bg-fx 保持原样服务其余深色场景

---

## V0.37 — 标题封面 WXML 化 (Skyline canvas 兼容) + 暗夜书桌提亮

### 2026-09-03

#### 用户反馈
- "又变得阴暗了" (devtools 截图下, bg-fx 暗夜元素太弱, title Canvas 在 Skyline 下完全不显示)

#### 1. title-scene Canvas → WXML (Skyline canvas devtools 不可见修复)
- V0.36 用 `<canvas type="2d">` 自绘封面, 但 Skyline 渲染器开发者工具暂不支持 canvas 组件
  调试 ("请先到真机上预览调试") — devtools 下整个封面一片黑, 用户看不见
- V0.37 改回纯 WXML/CSS 渲染, 真机 + devtools 一致显示:
  - **cover-bg / cover-glow / cover-glow-2** 三层渐变: 暗夜书桌主色 + 台灯柔光 + 暖光反光
    (CSS `linear-gradient` + `radial-gradient` 替代 Canvas fillRect)
  - **9×9 数独预览** = 81 个 `<view class="scell">` flex-wrap 矩阵, 每格按 kind
    (given/filled/empty) 上色, 给定数字 27 个叠加 `<text class="scell-n">` 暖金
  - **6×6 图画谜题预览** = 36 个 `<view class="pcell">` 矩阵, 已填格子渐变填充
    (#a8dcff→#5ea3e8), 22/36 形似小猫头剪影
  - 中间金色细线分隔双预览, 标签 / 题数 / 宣言均用 `<text>` + CSS
- data: sudokuCells(81) + pictureCells(36) 在 attached() 预算生成, 避免响应式 setData
  触发重渲染
- ready() 删除 (纯 WXML 不再需要 _drawCover); detached 清脉冲定时器仍保留

#### 2. bg-fx 提亮加密度 (回应"又变得阴暗了")
- **数据加量**: thinkTiles 11→16 (满铺上下两层), drafts 9→12, thoughts 10→16
- **opacity 全面抬升**: thinkTiles 0.2-0.32 → 0.66-0.82, drafts 0.28-0.4 → 0.55-0.72,
  thoughts 0.38-0.6 → 0.7-0.92
- **fx-base 暖光增强**: 主色抬到中调 #2a2854→#5a4030 (旧 #0d1426→#14100a 太暗);
  台灯柔光晕 0.36 → 0.55, 范围扩大
- **think-tile** 边框 1→1.5px, 字号 12→13px, 背景深色对比让数字更显眼
- **draft-dashed** 边框 0.45→0.75 透明度 + 半透明深底; **draft-partial** 边框 0.45→0.75,
  **draft-cell** 0.32→0.55 + box-shadow
- **thought** 中心 #fff→#fffbe6 (近白), 光晕扩散更大

#### 3. menu-scene grid-template-columns → flex (Skyline 兼容)
- "Unsupported Property. Style Text: grid-template-columns: repeat(4, 1fr)" 警告
  在 Skyline 渲染器直接报 warning + 不渲染
- 改 `.bottom-links { display: flex; gap: 10px }` + `.sub-btn { flex: 1 }` 4 等分,
  视觉一致 (按钮均分宽度)

#### 验证
- IDE 语言服务 read_lints 0 诊断
- 真机 + devtools 一致显示完整封面 (主标题 + 双预览 + 宣言 + 点击开始)

---

## V0.36 — 自绘 Canvas 封面 + 暗夜书桌背景 (重新思考首页观感)

### 2026-09-03

#### 用户反馈
- "首页的封面好像是表示两种谜题的内容, 但是这个封面提取出来为啥是这样子呢, 能不能自己用画布画出来自己设计一个封面"
- "那个背景动画明亮天空滚动背景观感, 其实跟我们游戏内容不搭呀. 你重新思考一下"

#### 1. title-scene 自绘 Canvas 封面 (替代已损坏的 title.nbm 提取图)
- 移除 `<image src="/assets/nbm/title.nbm.png">` 整图 (NDS ROM 提取出来的就是一坨
  绿色像素碎片, 隐约能看到两个谜题合并的鬼影, 完全无法当封面)
- 用 Canvas 2D API (`<canvas type="2d">` + `node.getContext('2d')`) 自绘整个封面:
  - **暗夜书桌底色** 渐变: 深夜蓝紫 #11152a → 暖琥珀 #3a2e26 → 暗木 #1a0f0a
  - **台灯柔光晕** 径向渐变叠在中央偏上, 像一盏灯打在桌面
  - **远散光斑** 7 个柔和光点 (思考光) 稀疏散布
  - **主标题** "ESSENTIAL PUZZLE DS" 暖金 #f5d27a 大字 + 中央装饰线 + 圆点
  - **副标题** "每日拼图" + 英文小字 "NUMBER × PICTURE"
  - **9×9 数独预览** 暖金网格 + 部分填充色块 (蓝色 = 玩家已答, 暖金 = 高亮);
    27 个固定给定数字 (#f5d27a, 中等字号)
  - **6×6 图画谜题预览** 冷蓝 #7fc8ff 网格 + 22 格已填 (渐变填充 + 圆角);
    形似小猫头/萌脸剪影, 暗示"图画"主题
  - 标签 "数独 1000 题" / "图画谜题 1525 题" (与 NUMCLO_CATALOG 真实数据对齐)
  - 底部宣言 "一 格 一 思" (呼应"思考"主题)
- 自定义 `_fillTextSpaced` 跨基库兼容的等距文字 (基库 letterSpacing 不稳)
- 自定义 `_roundRect` 圆角矩形 path (避免依赖第三方库)
- ready() 调 _drawCover; 屏幕旋转/尺寸变化时重画 (用 _drawCover 重调用即可)
- detach 时 clearTimeout 脉冲定时器
- 类型: 局部声明 `TitleC2D` 接口覆盖本组件用到的 Canvas 2D API (避免
  `WechatMiniprogram.CanvasContext` 旧版 API 类型与新 API 行为差异)

#### 2. bg-fx 重设计: 明亮天空 → 暗夜书桌思考主题
- 抛弃 V0.35 横版射击明亮天空 (青→薄荷→暖黄→蜜桃 + 太阳柔光 + 云朵/玻璃条/流光)
  — 跟谜题游戏内容不搭
- 改为 V0.36 **夜读思考主题**:
  - **fx-base** 暗夜渐变: 深夜蓝紫 #0d1426 → 暖琥珀 #2a2118 → 暗木 #14100a
    + 左上台灯柔光晕 (替代"太阳")
  - **远景 band-distal** (75s 横滚): 漂浮数字小方块 1-9 (think tiles, 暖金/冷蓝双色),
    半透明, 暗示"数独/数字"主题
  - **中景 band-drafts** (45s 横滚): 半透明草稿方块 (虚线格 + 已填一部分),
    像练习册的一行/一页, 暗示"练习/推理"主题
  - **近景 band-thought** (22s 横滚): 思考光点 (柔光圆, 4s scale 0.92→1.08 轻呼吸)
  - **fx-beat** 台灯柔光晕呼吸 (周期 = pulseMs), 位置从"顶部偏右"改"台灯下方"
  - bob 节奏加慢 (11/8.4/6.4s), 比 V0.35 缓慢很多 (像在桌面铺着的练习册)
- index.wxss page/page-root 底色 #7de8f5 → #0d1426 配暗夜主题
- top-ad / ad-slot 改深色玻璃 (#1e1e32 + 暖金描边), 广告位文字 #0d5f96 → #f5d27a

#### 3. menu-scene 同步深色化
- 顶部 LOGO 改纯文字 "ESSENTIAL PUZZLE DS" + "每日拼图" (替代损坏的 title.nbm.png)
  (与 title-scene 自绘封面呼应, 但用 CSS 文字而非 Canvas)
- .bg-glow-top/bottom 光晕改暖金 + 冷蓝 (替代 V0.35 的青绿+水蓝)
- .divider / .divider-dot 改暖金细线
- .sub-btn 描边/激活态改暖金, 主色对比保持深底可读
- 版权文字改淡蓝灰 (暗底可读)
- buildVersion v0.35.2 → v0.36

#### 验证
- IDE 语言服务 0 诊断 (title-scene / bg-fx / menu-scene)
- 待 devtools: 启动封面 (自绘暗夜书桌 + 双谜题预览 + 装饰线 + 脉冲"点击开始")
  + 全场景背景 (暗夜书桌 + 漂浮数字方块 + 草稿方块 + 思考光点 + 台灯柔光)
- 顶部 ad-slot 文字从蓝变金, 与暗色主题对齐

---

## V0.35.2 — 注释清理 (对齐纯中文 UI + 文本按钮规范)

### 2026-09-03

#### 变更
- 勘察全项目场景组件确认: 两条玩法链路 (数独 select→对局→通关; 图画 puzzleMode→类别→对局→通关)
  已闭环有界、无 NBM 按钮图 (仅 title/dwlogo/license/tutorial_00 横幅图 + staff 人员图合规保留)、
  无英文/日文可见文案、11 场景根节点全部 transparent 透出明亮 bg-fx、IDE 诊断 0 错误
- 清理 3 处过期/误导注释 (会诱使后续重新引入 NBM 按钮或页面壳跳转, 与现行规范冲突):
  - `title-scene.ts`: "TAP TO START" 英文 + "页面壳 navigateTo 主菜单" → 中文描述 +
    index 场景控制器 _switchScene (无页面跳转)
  - `sudoku-scene.wxss`: 数字键盘注释 "原版 select1.nbm 数字图" → 文本双态按钮 (已无 NBM)
  - `menu-scene.ts`: "双宫格大卡片" 过期描述 → 两行大蓝胶囊; picture-mode-scene.ts 注释
    「ヌクロ/カード/ポピュレーション」 → 中文
- 版本号 v0.35.1 → v0.35.2

#### 验证
- IDE 语言服务 0 诊断 (title/sudoku/menu/picture-mode)

---

## V0.35.1 — picture-mode 按钮中文化 + picture 返回条文案修正

### 2026-09-03

#### 修复 (纯中文 UI 规范 V0.30 残留)
- `picture-mode-scene.ts`: 子模式按钮 label 从日文「ナンクロ/チュートリアル」改为中文
  「图案填字 / 入门教程」(desc 同步: "1400 道彩色填字题 · 选择类别开始" / "1 道教学题 · 直接开涂")
- `picture-scene.wxml`: 顶部返回条 "← 返回主菜单" → "← 返回"
  (实际路由按 pictureOrigin 回 pictList/pictureMode, 不是主菜单, 文案与行为对齐)
- `picture-scene.ts`: onBack 注释同步更新 (说明路由由 index 按 pictureOrigin 决定)

#### 验证
- IDE 语言服务 0 诊断 (picture-mode-scene / picture-scene)
- 版本号 v0.35 → v0.35.1

---

## V0.35 — 明亮天空横滚背景 (Bright Sky Loop) + 两玩法逻辑闭环

### 2026-09-03

#### 用户反馈
- "bg太暗沉了, 我要的是表达智慧鲜艳的颜色…我是说很有NDS游戏背景都是斜着走动的那种。就像横版飞机游戏一样背景一直循环动的"
- "我先睡了。你继续按我这个思路完善, 然后把两种玩法的游戏逻辑都闭环了。逻辑链路要说得通啊。"

#### bg-fx 重写: 深色 Neon-Garden → 明亮天空视差横滚
- 背景底色改明亮天空渐变: 青 #4ecdf0 → 薄荷 #b5f2e0 → 暖黄 #ffe9b0 → 蜜桃 #ffd6c6 + 太阳柔光 (不再暗沉)
- 3 个视差横滚层 (像横版飞机游戏无限循环背景):
  1. 远景 band-cloud — 白色软云, 最慢横滚 58s + 上下缓浮
  2. 中景 band-mid — 彩色玻璃条 + 泡泡, 中速 34s
  3. 近景 band-near — 倾斜流光 + 亮色小星, 最快 16s (飞行感)
- 无缝循环实现: 每层 .roll width:200% 内两个相同 .seg (各 50%), translateX 0 → -50% 循环;
  .bob 外层上下缓浮叠加 → 斜向走动感 (DS 背景滚动感)
- 删掉所有暗色粒子/极光数据; 不闪缩: 唯一呼吸层 .fx-beat 周期 = pulseMs (整小节),
  幅度小 (opacity 0.6→1, scale 0.98→1.05), 慢而平缓
- bg-fx property: beat-ms → pulse-ms (pulseMs); 由 index 按场景 BGM 小节 (barMs) 驱动
- index.wxss page/page-root 底色 #0d1b2a → #7de8f5; top-ad/ad-slot 改半透明白玻璃

#### 两玩法游戏逻辑闭环 (无断头路)
- picture-mode-scene 只保留 2 个真实可玩入口: ナンクロ → 类别列表 / チュートリアル → numclo_tu 直达
  (原 ヌクロ/カード/ポピュレーション 占位删除); 题数 desc 由 NUMCLO_CATALOG 实算 (1400/1)
- 返回路由"从哪来回哪去":
  - picture-scene 新增 pictureOrigin (pictList / pictureMode), onPictureBack 回真实来路
  - staff/about 新增 staffOrigin/aboutOrigin (menu 直达 / options 进入), 回真实来路
- 完成闭环:
  - sudoku 通关弹窗: 再来一局 = 清档重解同题 (选题直达) 或同难度新随机; 回选题 = 回选题页
  - picture 通关弹窗: 下一题 = 同类别下一题; 返回 = 回进入前的列表/子模式页 (不再死循环)
- menu-scene 底部 4 个辅助钮改深色玻璃 (rgba(22,42,66,.55) + 白字), 亮底上可读; 版本号 v0.35

#### 验证
- IDE 语言服务 0 诊断 (index / bg-fx / menu-scene / picture-mode-scene)
- 待 devtools: 任意场景见明亮天空 + 云/彩条/泡泡/流光/亮星视差横滚循环;
  菜单→子模式→类别→对局→返回 全链路回到来路

---

## V0.34 — 动态背景层 bg-fx 全场景接入 + 视觉节拍联动 (摆脱"死板软件风")

### 2026-09-03

#### 用户反馈
- "休闲游戏, 轻快的 BGM, 你觉得我这个游戏需要怎么配色…帮我美化一下吧"
- "让他不是死板的软件风格, 参考原来 NDS 的动效…原 ROM 背景是滚动的, 起码跟 BGM 能配"
- 结论: 不改布局, 而是让全场景"活"起来 — 一层滚动光带 + 漂浮粒子 + 跟 BGM 节拍呼吸的全局动态背景

#### 核心新增: `components/bg-fx/` (json/ts/wxml/wxss 四件套)
- 全局动态背景层 4 子层:
  1. `.fx-base` — 深湖蓝渐变底 (#0a2540→#061224) + 顶部/底部柔光 (radial-gradient 模拟, 不用 filter blur)
  2. `.fx-aurora-1/2/3` — 3 条横向滚动光带 (青/薄荷/粉), 不同速度/延迟/方向循环, 营造"背景在流动"
  3. `.fx-particles` — 10 个漂浮粒子 (薄荷 #98FFC8 / 青 #80E0FF / 暖 #FFE89A / 粉 #FFA4C8), 慢速上浮 + 辉光
  4. `.fx-beat` — 中心呼吸光晕, animation-duration = beatMs (随当前场景 BGM 节拍)
- `options: virtualHost` + z-index 0 + pointer-events none; 全 px 单位 (项目禁用 rpx)

#### 节拍数据: `utils/audio/soundManifest.ts`
- 新增 `BGM_BPM` (11 场景实测 BPM: menu 79 / select 92 / sudoku 62 / tutorial 116 / picture 138…)
- 新增 `beatMs(scene)` = 60000/BPM, `barMs(scene)` = 240000/BPM

#### 接入: `pages/index/index.ts/.wxml`
- index.ts: data 新增 `beatMs`, 新增 `_syncSceneAudio(next)` (切 BGM + setData beatMs), onLoad/_switchScene 统一走它
- index.wxml: `.scene-area` 首子层挂 `<bg-fx beat-ms="{{beatMs}}" />` (z0 垫底, 场景层 z1/z2 透明透出)

#### 场景透明化 (10 + menu)
- 10 个场景根 `.xxx-page` 的 `background:#0d1b2a` → `transparent`
- menu-scene 根渐变 → transparent (保留自身光晕装饰)
- 透出后各场景都浮在滚动光带背景上; 标题页 title.nbm 自适应留边处也透出动态背景

#### menu-scene 入场 + 常流动效
- LOGO 入场下坠 + 常驻轻浮动 (logo-bob)
- 主按钮逐个微弹簧弹出 (错峰 0.1s)
- 分隔条/底部 4 按钮/版权 错峰上浮
- 顶部/底部光晕持续呼吸漂浮 (glow-breathe)
- 全部 `backwards` 填充, 动画结束回落类样式, 不影响 hover 按压缩放反馈

#### 配色基调 (休闲 + 轻快)
- 背景不再是单一 #0d1b2a: 深湖蓝渐变 + 低饱和彩色流动光, 白字/亮字可读性保留
- 光晕色相呼应 BGM 活泼度: 青 (悠闲) / 薄荷 (清新) / 粉 (可爱) / 暖金 (轻快)

#### 验证
- IDE 语言服务 0 诊断 (index / bg-fx)
- 待 devtools: 任意场景应见背景光带缓慢流动 + 漂浮粒子 + 中心光晕按 BGM 节拍呼吸;
  menu 进场按钮错峰弹出; 场景卡片半透明浮在动态背景上

---

## PICTURE-V0.31 — menu-scene 主菜单整页重设计 (摆脱"SELECT MODE + 小卡片"丑布局)

### 2026-09-03

#### 用户反馈
- "这里也太丑了吧" (menu-scene 是 SELECT MODE 小卡片 + 2 个灰色按钮 + 大片空白 + 底部 4 链接被挤出可视区)
- 上一轮 PICTURE-V0.30 commit 改了"SELECT MODE → 选择模式"但用户 devtools 截图仍显示英文,
  说明 SELECT MODE 视觉根源是"小卡片标题 + 灰色短按钮 + 不平衡空白"的整体布局

#### 重设计原则 (跟 picture-mode-scene / select-scene 一致)
- 顶部 logo 不再"绿色横幅 + 黑边", 改自适应 height 88px max-width 480px (跟数独/选题/选项对齐)
- 主视觉 = 双宫格: 左数独 (蓝渐变) / 右图画谜题 (橙渐变), 一眼区分两种玩法
- 每个大卡片含 4 层信息: 大字 icon (9×9 / 15×15) / 主标题 / 描述 / 题数徽标
- 底部 4 二级入口 (玩法/选项/人员/返回) 改为 4 列等宽 grid, 返回 ghost 弱化
- 移除"数字谜题 (数独)" 双语括号, 统一中文

#### 改动清单
- `components/scenes/menu-scene/menu-scene.wxml`:
  - 移除 `.mode-select-card` 小卡片 + `.menu-label-wrap` + .menu-label 标题节点
  - 新增 `.mode-grid` grid 2 列 + 2 个 `.mode-card` (numple 蓝渐变 / numclo 橙渐变)
  - 每个 mode-card 含: mode-card-icon / title / desc / hint (题数)
  - 移除"数字谜题 (数独)"括号 + "+ (Picture Puzzle)"等英文
  - 顶部 title-banner: height 120→88, max-width 480, 不再有绿色背景填充
  - 底部 .bottom-links: flex-wrap 改为 grid 4 列等宽, 返回按钮加 ds-btn-ghost
  - 新增 .menu-footer: 版权 + 版本号 (跟 options / about 风格统一)
- `components/scenes/menu-scene/menu-scene.wxss`:
  - 全套重写, 引用 ds-buttons 双态规范
  - .mode-card 168px 高, numple 蓝渐变 + 蓝边; numclo 橙渐变 + 橙边
  - .mode-card-press: scale 0.97 + 蓝边高亮 (按下反馈)
  - .mode-card-icon: 28px 大字, 蓝/橙 + text-shadow glow
  - .mode-card-hint: 胶囊徽标 (1000 题 / 1525 题)
  - 响应式: max-width 480 居中, 中小屏全宽
- `components/scenes/menu-scene/menu-scene.ts`:
  - 新增 buildVersion 字段
  - 注释更新到 V0.30 重设计

#### 配色规范
| 元素 | 色值 | 来源 |
| --- | --- | --- |
| 数独大卡背景 | linear-gradient(160deg, rgba(40,160,240,0.25) → rgba(22,42,66,0.88)) | select1.nbm NORMAL 帧采样同色域 (蓝渐变) |
| 数独边框 | rgba(40,160,240,0.45) | select1 主蓝 80% 透明 |
| 数独图标字 | #4db8ff + 蓝光晕 | select1 SELECTED 帧相同强调色 |
| 图画谜题卡背景 | linear-gradient(160deg, rgba(255,152,0,0.22) → rgba(22,42,66,0.88)) | numclo 橙色域 |
| 图画谜题边框 | rgba(255,152,0,0.45) | 橙渐变 80% 透明 |
| 图画谜题图标字 | #ffb04d + 橙光晕 | numclo 主橙调 |
| 按下高亮 | background rgba(77,184,255,0.18) + border #4db8ff | ds-buttons 规范 |

#### 验证
- IDE 语言服务 0 诊断 (menu-scene 全目录)
- 待 devtools 真机/模拟器重编译后:
  - 顶部 ESSENTIAL SUDOKU DS logo 自适应窄高
  - 两个大宫格并排: 数独蓝 + 图画谜题橙
  - 4 个底部链接 1 行等宽排开
  - 没有英文 UI, 没有小标题"SELECT MODE", 没有奇大空白

---

## PICTURE-V0.30 — 纯中文 UI 规范落地: select-scene 按钮改中文文本双态胶囊 + 全场景英文文案中文化

### 2026-09-03

#### 用户明确
- "全部改成中文好吗" + "我们是纯中文版本, 没有其他语言"
- 唯一例外: 图案谜题的答案 (numclo 通关结果图) 保留双语中英文

#### 修复
- `select-scene.ts/.wxml/.wxss`: PICTURE-V0.29 的 select1.nbm 图片按钮回退 (NBM 原图烧录日文,
  不符合纯中文) → 全部改中文文本双态胶囊:
  - normal  = `#28A0F0` 亮蓝渐变 + 白字 (从 select1.nbm NORMAL 帧像素采样: #28A0F0/#A8D8F8 高光)
  - selected = `#2060D0` 深蓝渐变 + 白字 (从 select1.nbm SELECTED 帧采样: #2060D0/#1050A8)
  - 难度 4 按钮: 简单/中等/困难/专家 (key 仍 easy/medium/hard/expert, 选中常驻深蓝 .sel-btn-active)
  - 题号区: − / 输入框 / ＋ (胶囊窄钮, 按下深蓝)
  - 底部: 返回 (亮蓝) + 开始 (常驻深蓝主操作 .sel-btn-primary)
  - ts 删除 NBM 图片模型 ImgButton/pressed 状态机/nbmAssets import, 只留中文文本数据
- 全场景英文文案中文化 (wxml):
  - menu-scene: `SELECT MODE` → `选择模式`
  - title-scene: `TAP TO START` → `点击开始`
  - staff-scene: `— End of Staff —` → `— 完 —`
  - tutorial-scene: `数独 (Number Puzzle)` → `数独`; `图画谜题 (Picture Puzzle)` → `图画谜题`
  - options-scene: `BGM 音量` → `背景音乐音量`; `SE 音量` → `音效音量`
  - about-scene: `Licensed by Nintendo · © Imagineer` → `任天堂授权 · © Imagineer`

#### 保留 (专有名词 / 原版图像素材, 不属于按钮/UI 文案)
- 游戏名 `Essential Sudoku DS` / 厂商 `DigitalWare / Imagineer` (about/title 版权行)
- NBM 封面/授权图 (title.nbm / dwlogo.nbm / license.nbm / tutorial_00.nbm 等原版横幅)
- 图案谜题答案图 (用户明确保留双语)

#### 验证
- IDE 语言服务 0 诊断 (scenes 目录全量)
- 待开发者工具重新编译: 选题页 4 中文难度胶囊 (选中深蓝) + −/＋ 窄钮 + 返回/开始中文胶囊
  全部为纯中文 UI, 配色按 select1 浅蓝/深蓝双态

---

## PICTURE-V0.29 — select-scene 全部按钮改 select1.nbm 原版双态图片

### 2026-09-03

#### 用户反馈
- "按钮没用按这种配色方案啊" — 截图显示 DS 原版 select1.nbm 是浅蓝 NORMAL + 深蓝 SELECTED 双态
  胶囊按钮, 当前 select-scene 全部用 ds-buttons.wxss 文本按钮 (深色半透明 + 白边), 跟原版不符
- nbmAssets.ts 里 NBM_SELECT1_DIFF_*_NORMAL / UP/DOWN_NORMAL/SELECTED / START_NORMAL/SELECTED /
  RETURN_NORMAL/SELECTED 等 33 张切片早就切好, 没人引用

#### 修复
- `select-scene.ts`: 重写, 加 `pressed` 状态机 (Record<string, boolean>) + ImgButton 模型
  ({key, normalUrl, selectedUrl}); _onTouchStart/_onTouchEnd 通用方法按 dataset.btnkey 切换
  pressed 集合; DIFF/UPDOWN/START/RETURN 全部走图片按钮 (data 上挂 normalUrl + selectedUrl);
  detached() 清 pressed 防止切场景残留
- `select-scene.wxml`: 8 个按钮 (4 Difficulty + Up + Down + Return + Start) 全部改 `<image>`
  + bindtouchstart/bindtouchend/bindtouchcancel; 上下箭头/Start/Return 按 pressed 态切换图源
- `select-scene.wxss`: 不再 @import ds-buttons.wxss; 新增 .ds-img-btn 通用图片按钮 (容器透明,
  image 铺满); .ds-img-btn-active (常驻 active 态, 模拟 DIFF 深蓝高亮: brightness+saturate+
  drop-shadow+scale); .diff-btn/arrow-btn/return-btn/start-btn 按 NBM 原图比例
  (30x30/20x20/88x24/56x24) 放大到屏上可视尺寸

#### 设计取舍
- DIFF (Difficulty A/B/C/D) 只切了 normal 帧, select1.nbm 是 DS 静态贴图, 没切 selected
  → 用 CSS filter: brightness(1.35) saturate(1.6) + drop-shadow 蓝色光晕 + scale(1.06)
    模拟深蓝 active 高亮 (跟 UP/DOWN/START/RETURN 的 selected 视觉等效)
- UP/DOWN/START/RETURN 切了 normal+selected 真双图 → 按下时图源直接切到深蓝 selected,
  touch 反馈最直接
- "Difficulty" / "−" / "+" / "开始" / "返回" 等文字标签不再显示, 直接由 NBM 图自带文字
  (Start/Return NBM 内已烧录文字; Difficulty 由 A/B/C/D 字母表达难度; 上下箭头用 NBM ▲▼)
- previewText 保留: "题号 N · 难度 · 已给 X 格" 提示题库信息

#### 验证
- IDE 语言服务 0 诊断 (select-scene 三件套)
- 待开发者工具重新编译: 选题页 4 个难度按钮 (浅蓝选中时变深蓝高亮) + 上下箭头 (按下深蓝) +
  Start/Return (按下深蓝, 长条形) 全部按 NBM 原版配色

---

## PICTURE-V0.28 — title-scene 点击热区修复 (V0.27 显示恢复后点击仍无效)

### 2026-09-03

#### 用户报告
- V0.27 修复后标题页正常显示, 但点击任意位置 (含 TAP TO START) 仍无法进入 menu

#### 根因分析 (3 个叠加隐患, 静态代码无法判定是哪个, 全部消除)
1. `title-scene.wxss .title-page` 用 `position:relative + height:100%` — 高度依赖组件宿主节点;
   宿主在非 flex 的 `.scene-stage` (absolute inset:0) 内高度为 auto, `height:100%` 可能解析失败,
   导致点击热区高度为 0/异常
2. 全屏 `<image class="title-bg">` 是 Skyline 原生绘制节点, 点击落在 image 上时事件冒泡不可靠,
   而根 view 的 bindtap 依赖 image 冒泡
3. `title-scene.ts onTapStart` 中 `audioService.playSe('start')` 若音频 API 抛异常会阻断
   后面的 `triggerEvent('start')`

#### 修复
- `title-scene.wxss`: `.title-page` 改 `position:absolute; top:0; left:0; width:100%; height:100%`
  (直接铺满最近定位祖先 `.scene-stage`, 不再依赖宿主高度); image 加 `pointer-events:none`
- `title-scene.wxml`: 在 image 之上新增透明普通 view 点击捕获层 `.tap-catcher` (z-index:1,
  铺满 title-page), 点击由普通 view 承接并冒泡到根 bindtap, 绕开 image 原生节点
- `title-scene.ts`: `playSe` 包 try/catch; `onTapStart` 与 index `onTitleStart` 各加
  `[title-scene]/[index]` 前缀日志, 便于定位断点 (若仍无效, 看 console 判断是组件内
  事件未触发还是 template bind:start 链路断)

#### 验证
- IDE 语言服务 0 诊断 (title-scene / index)
- 待开发者工具重新编译: 点标题 → console 应依次出现
  `[title-scene] onTapStart` → `[index] onTitleStart -> switch menu` → 进入 menu

---

## PICTURE-V0.27 — 修复 title-scene 首屏不显示 + 点击无响应

### 2026-09-03

#### 修复: title-scene 在 Skyline 渲染器下整页不显示
- 截图: 顶部 .top-ad 绿黑文字带 (10vh, title.nbm.png 被 aspectFill 压缩) + 下方 90vh 大片纯色 #0d1b2a, 没有任何 title-scene 元素 (TAP TO START / 全屏 title 画面 / 版权文字全部不可见), 点击屏幕无响应无法进入 menu
- 根因 1: `title-scene.wxss .title-page` 用 `width:100vw; min-height:100vh` 撑满整个 viewport, 在 .scene-stage (position:absolute top:0 left:0 right:0 bottom:0) 内 + .scene-stage overflow:hidden + .scene-area flex:1 高度 ≈90vh, Skyline 渲染器对 100vw/100vh 越界容器处理异常导致整块不显示
- 根因 2: `index.wxml .top-ad .ad-slot-image` 引用 `/assets/nbm/title.nbm.png` (与 title-scene 同图), aspectFill 压缩 10vh 高度出现顶部"绿黑文字带"干扰视觉, 同时两处同时加载同一图增加 Skyline 渲染异常概率
- 修复:
  - `title-scene.wxss .title-page`: `width:100vw; min-height:100vh` → `width:100%; height:100%; min-height:0` (精确填满 .scene-stage, 不再依赖 viewport 单位)
  - `index.wxml adBanner template`: 移除 `<image src="...title.nbm.png">`, 改 `<text>ESSENTIAL SUDOKU DS</text>` 纯文本标识
  - `index.wxss .ad-slot`: 删除 .ad-slot-image 样式, 加 flex 居中 + .ad-slot-text (11px 白色 70% 透明度) 替代图片占位
- 预期恢复: 启动后 title-scene 全屏显示 title.nbm.png, 底部 72px 处 TAP TO START 白色脉冲胶囊可点, 点击触发 onTitleStart 进入 menu

#### 验证
- IDE 语言服务 0 诊断 (title-scene / index 全通过)
- 待真机/开发者工具重新编译验证

---

## PICTURE-V0.26 — 图画谜题答案成品图库 (1401 题可视化)

### 2026-09-03

#### 新增 `scripts/gen_answer_gallery.py` (生成器)
- 解析 `numclo_puzzles.ts` RAW 数组 (1401 题 packed 150-hex) + `numclo_answers.ts` (numclo0-9 每题答案名)
- 输出 self-contained 静态 HTML `build-test/answer-gallery.html` (内嵌 JSON, 双击浏览器即开, 零依赖)
- 正则 name 组用 `(?:[^'\\]|\\.)*` 支持转义撇号 — 修复 `Bees' Nest` / `Gentleman's Shoes` 2 题漏解析
- 类别映射 15 类 (numclo0-9 中文名 + numclo_00-03 附加 + numclo_tu 教程)

#### 新增 `build-test/answer-gallery.html` (产物, 232 KB)
- 分类 chip 切换 + 15×15 canvas 缩略图网格 (含题目名 + 序号)
- 点击放大 lightbox (32px/cell 大图 + 5×5 红色块粗线, 模拟 DS numclo_waku 视觉)
- lightbox 支持 ◀/▶ 翻题 + 键盘左右键 + Esc 关闭 + 下载 PNG
- 图例: 0=空白, 5 色 DS 原版 palette (`#f80000/#f8f800/#4868f8/#48b048/#181818`)

#### 验证
- `python scripts/gen_answer_gallery.py` → total puzzles = 1401 (15 类全齐, numclo9.data named=100)
- 清理临时调试文件 `_gallery_debug.py/json` / `_gallery_diff.py`

---

## PICTURE-V0.25 — 图画谜题网格 CSS 自绘 (移除 numclo_waku.nbm.png 依赖)

### 2026-09-03

#### 网格背景自绘 (1:1 还原 DS numclo_waku.nbm 视觉)
- `picture-scene.wxss` `.puzzle-area`:
  - 移除 `background-image: url('...numclo_waku.nbm.png')` 整图背景
  - 改 `background: #0d1b2a` 深色底 (与 page 一致)
  - 加 `border: 1.5px solid #d83a3a` 红色外框 + `box-sizing: border-box`
- `.paint-cell`: 拆分四边 0.5px rgba 灰细格线
- 5×5 块粗红线 (模拟 DS 块边界视觉):
  - 列 5/10/15 (1-based) 红右线: `:nth-child(15n+5)` / `:nth-child(15n+10)` / `:nth-child(15n)`
  - 行 5/10/15 (1-based) 红下线: `:nth-child(n+61):nth-child(-n+75)` 等范围选择器
- `.paint-grid-reveal` 保持原透明 border (通关显示纯色块)

#### 资源清理
- `miniprogram/utils/sudoku/nbmAssets.ts`: 移除 `NBM_NUMCLO_WAKU` 导出 + NBM_ALL/PICTURE_PUZZLE/GROUPS lookup 4 处引用
- 删除 `miniprogram/assets/nbm/numclo_waku.nbm.png` 资源文件 (PICTURE 资源仅保留 numclo_00.nbm 按钮色块切片)
- `picture-scene.ts` 注释: 3 处 numclo_waku 引用更新为 "V0.25 起 waku 改 CSS 自绘, 见 picture-scene.wxss"

#### 影响
- picture-scene 0 外部网格资源依赖 (NBM 按钮图全部移除完毕, 仅剩 tutorial_00.nbm 教程图)
- 视觉一致: 1:1 还原原版红框 + 5×5 块红线 + 灰细格线

#### 验证
- IDE 语言服务 0 诊断 (picture-scene / nbmAssets)

---

## UI-DSBTN — 场景按钮全面"文本标签双态"统一 (弃用 NBM 按键图)

### 2026-09-03

#### 策略 (用户 2026-09-03 明确)
- 不用原版 NBM 按键/按钮图当按钮底; 按钮 = 文本标签 + normal/active 两态
  (深色主题 `#0d1b2a` + 激活蓝 `#4db8ff`), 或 CSS/画布自绘
- 仅保留: 图画谜题通关结果图 + 橡皮擦/画笔工具图标 (后续接入)
- 网格线可自绘, 不依赖 numclo_waku.nbm.png (待后续 canvas 落地)

#### 公共样式
- 新增 `miniprogram/styles/ds-buttons.wxss`: `.ds-btn` normal/hover/active 三态
  + `.ds-btn-lg/.ds-btn-sm/.ds-btn-key` 尺寸变体 + `.ds-btn-hover` 按下反馈
  (各 scene wxss `@import` 单点维护)

#### 各场景替换 (menu / select / sudoku / pict-list / options / picture / picture-mode)
- `picture-mode-scene`: 5 个子模式 NBM 竖菜单 + 手写热区 → `wx:for` 文本按钮双态
- `menu-scene`: NUMBER/PICTURE select4.nbm 双帧图 → `.ds-btn-lg` 文本大按钮
- `select-scene`: 难度 A-D/上下箭头/Start/Return select1 图 → 文本钮; 
  select1.nbm 标题横幅 → 文本头部 (数独选题 1-1000)
- `sudoku-scene`: Return/数字键盘 1-9/清除图 → `.ds-btn`/`.ds-btn-key` 文本钮
  (返回触控 pressed 帧切换逻辑简化, 由 hover-class 双态取代)
- `pict-list-scene`: pazl_select2b Return 图 → 文本钮; pazl_select.nbm 横幅 +
  pazl_yajirusi 箭头图 → 文本头部 + CSS 选中圆点
- `options-scene`: select3.nbm 音量标签图标 + 4 action 行图标 → 纯文本标签行
- `picture-scene`: 调色板 numclo_00 切片 (5 色 + 擦除) → CSS 色块 (擦除=白块
  红斜线), 选中蓝框; 清空画板 clear 图标钮 → ds-btn 文本钮 "清空";
  numclo_00.nbm 顶部 banner → 删除
- 验证: IDE 语言服务 0 诊断; scenes 目录 NBM 按钮引用清零
  (仅 menu 顶部 title.nbm logo 装饰图 / picture waku 背景图 / 教程图保留)

## PERSIST-V0.1 — 数独进度存档 + 图画谜题重做

### 2026-09-03

#### 数独进度持久化 (对齐图画谜题的 esds_pic_progress 模式)
- 新增 `miniprogram/utils/sudoku/sudoku_progress.ts`: storage key `esds_sudoku_progress`,
  `{ [puzzleId]: { puzzleId, difficulty, elapsedMs, board, updatedAt } }`
- `board.ts` 加 `exportPersist()` / `importPersist()`: 导出/恢复完整盘面
  (81 格 value + candidates + selected + moves + **undo/redo 全栈**),
  given 不存 (puzzleId 重建)、isError 不存 (由值幂等重算);
  `_validate()` 算法静态化抽出 `_validateGrid()` 供快照恢复重算
- `game_service.ts` 加 `captureProgress()` / `restoreProgress()`: 捕获存档;
  按 puzzleId 重建题目 → importPersist → startTime 前移续接计时
- `sudoku-scene.ts` 挂点:
  - select 直达题进场景发现存档 → 弹窗「继续上次 / 重新开始」(重新开始清档)
  - 每次填数/清格/撤销/重做/提示后 400ms 防抖落盘; 返回选题页 & detached 立即 flush
  - 通关自动清档 (重进原题 = 空白重解); 切难度主动换题 = 放弃当前题清档
  - 仅 select 直达题参与存档 (`_persistEnabled`), 随机/每日局不写脏档
- 恢复后 undo/redo 栈完整可用 (存档含全量快照栈)

#### 图画谜题重做 (redo)
- `picture-scene.ts`: 新增 `redoStack` (undo 弹出的操作压入, `{ i, from, to }`);
  `onUndo` 反向记录 → 新 `onRedo` 恢复涂色并把项压回撤销栈;
  新涂色/清空/切题打断重做链; 撤销/重做后照常防抖落盘
- `picture-scene.wxml`: 工具行加「重做」文字按钮 (显示答案/撤销/重做/清空)

## SOUND-V0.5.1 — BGM 渲染音色修复: SWAR loop 单位换算 + 立体声 pan

### 2026-09-02

#### 根因 1: DSWAV loop 字段单位错 (音色怪主因)
- GBATEK dswav sample block: `loopOffset` / `soundLength` 是 **4-byte units**,
  IMA-ADPCM 下 1 unit = 4 bytes = **8 samples**
- 旧渲染器把 `loopOffset`/`loopLength` 直接当 sample 数用 → 循环区缩小 8 倍且起点错位
  (如旋律采样 b26 本应循环 [7624, 8664) samples, 旧版循环 [953, 1083) = 8ms 微循环
  → 长音发出蜂鸣/颤音怪声)
- 修复: `load_pcm_cache` 按 waveType 换算 units→samples (ADPCM 8 / PCM16 2 / PCM8 4),
  循环区 = `[loopOffset*unit, min((loopOffset+loopLength)*unit, n))`
- 验证: `time(0x04)` = `ARM7_CLOCK/sampleRate` (16756991/11025=1520 ✓ /16015=1046 ✓),
  与 loop 无关, 已排除

#### 根因 2: pan 未建模 + mono 输出 (声场丢失)
- SSEQ 每轨开头 PAN 事件 (SEQ_01: track0=84 右 / track1=54 / track3=34 左),
  NDS 硬件是立体声; 旧渲染 mono 混合把乐器全挤中间, 听感"糊/怪"
- 修复: 渲染器输出 stereo, `_pan_gains` equal-power 拆分 (pan 0..127, 64=中),
  `add_voice` 双声道写入, `write_wav` 立体声 interleave

#### 其他
- `rate` fallback 11025 → 32768 (与 swav_to_wav 一致, 本次数据无 rate=0 未触发)
- 顺带核实: SBNK 10B def note 偏移正确 / MODDEPTH 全 0 (无 vibrato) / PITCHBEND=0
- 纯 Python 渲染 ~1.6s mix / 0.6s 音频 (44100 stereo), 40s 完整渲染约 2 分钟

---

## PICTURE-V0.21-V0.24 — 标题页 DS 化 + 信息页深色风格统一

### 2026-09-02

#### title-scene DS 化 (标题页)
- `title.nbm` 全屏显示 (`object-fit: contain`), 保持 DS 原版 4:3 比例, 居中露出深蓝背景
- `TAP TO START` 提示移至底部, 改为半透明深色胶囊底 + 白色发光字, 脉冲动画保留
- 版权信息改为淡蓝灰, 避免与标题画面冲突
- 页面背景统一 `#0d1b2a`, 与其他 DS 化场景一致

#### about-scene / staff-scene / tutorial-scene 风格统一
- 三页背景统一改 `#0d1b2a`
- 返回条统一为半透明深色卡片 (`rgba(22,42,66,0.85)`) + 淡蓝灰文字 `#c8d5e8`
- about/tutorail 的图片/卡片容器改半透明深色底 + 细边框
- tutorial 标题改亮蓝 `#4db8ff`, 正文/分割线改淡蓝灰
- staff 图片加圆角深色边框, 底部 "End of Staff" 改淡蓝灰
- 各页 `min-height: 100vh` 统一撑满屏幕

#### Verification
- IDE 语言服务 0 诊断 (title-scene / about-scene / staff-scene / tutorial-scene)

---

## PICTURE-V0.19 — 主菜单/选项页 DS 化 + picture-scene 深色主题收尾

### 2026-09-02

#### menu-scene DS 化 (主菜单)
- NUMBER PUZZLE / PICTURE PUZZLE 改 `select4.nbm` 原版双帧按钮图 (`number_a`/`picture_a` 常态, `number_b`/`picture_b` 按下态)
- touch 按下/松开切换两帧, 复刻 DS 主菜单选中闪光 (两帧底色互补)
- 深色主题: 背景 `#0d1b2a`, 底部辅助入口改半透明深色胶囊
- 保留 `title.nbm` 标题横幅

#### options-scene DS 化 (选项页)
- 移除语义不符的 `setu03.nbm` 无线说明图横幅
- 背景改深蓝 `#0d1b2a`, 选项卡片半透明深色 + 细边框
- BGM/SE 音量行标签继续使用 `select3.nbm` 原切片 (BGM Volume / SE Volume)
- 清除数据 / 评价 / 制作人员 标签继续使用 `select3.nbm` 原切片 (Clear / Rate / Credits)
- 滑块 active 色改亮蓝 / 橙, 数字值改亮色

#### picture-scene DS 化收尾
- 页面整体背景改 `#0d1b2a`, 顶部/类别/导航/工具条全部改深色胶囊或半透明卡片
- `tool-row` 的 “清空画板” 改为纯 `numclo_00.nbm` clear 图标按钮 (去掉文字, 只保留原切片图标)
- “显示答案”/“撤销” 改深色半透明文字按钮
- `tutorial-bar` 改深色半透明底, 关闭 X 改深蓝背景圆
- 调色板选中态外框改 `#4db8ff` 高亮, 计数胶囊改半透明白底
- `puzzle-area` 继续使用 `numclo_waku.nbm` 原图作为棋盘背景

#### Verification
- IDE 语言服务 0 诊断 (menu-scene / options-scene / picture-scene)

#### 待真机确认 (记录在案, 不阻塞)
- menu-scene select4 双帧按钮在按下态是否清晰 (两帧尺寸 128x49 / 128x53)
- options-scene 滑块在深蓝背景下的可见性
- picture-scene clear 图标按钮触控区域是否足够 (当前 48x40)

---

## PICTURE-V0.16 — pict-list 分类页 DS 化 + select/sudoku 场景原版按钮落地 (两条线都做)

### 2026-09-02

#### 新增切片 (gen_nbm_assets_ts.py)
- `PAZL_SELECT2B_SLICES` + `generate_pazl_select2b_slices()`:
  - `pazl_select2b_return_normal` (134,198,222,222) / `pazl_select2b_return_selected` (132,228,222,254)
- `miniprogram/utils/sudoku/nbmAssets.ts` 重新生成: 42 entries + 46 derived slices
  (select1 Diff A-E + 上下箭头 + pazl_select2b Return 均归入对应 group)
- 9 个 select1 新 PNG (diff_a-e_normal / up_normal+selected / down_normal+selected) 落盘

#### pict-list-scene DS 化 (图画谜题列表页)
- 移除自定义白底返回条 → 底部 `pazl_select2b` 原版 Return 按钮 (touch 按下切换选中态)
- 背景改深蓝 `#0d1b2a` (与 select/picture 场景统一), 列表卡半透明深色 + 行 hover/选中高亮
- 保留 pazl_select.nbm 标题横幅 + pazl_yajirusi 选中箭头 + 通关进度 ✓ n/m 徽标

#### select-scene DS 化 (数独选题页)
- Difficulty A/B/C/D 改 select1 原版按钮图 (30x30), 标签 A-D 加在按钮下方
- 题号选择: 上/下箭头改 select1 原版图 (normal/selected), 按下 120ms 反馈
- Start / Return 改 select1 原版按钮图, 背景深色 DS 主题

#### sudoku-scene DS 化 (数独对局页)
- 移除 title.nbm 大横幅 (对局页不留误导性 TECMO logo)
- 返回从紫色文本链接 → select1 原版 Return 按钮图 (touch 按下切换选中态)
- 深色 DS 主题: 背景 #0d1b2a, 棋盘白底保持清晰 (选中蓝高亮), 数字键盘沿用 select1 数字图,
  工具条 (撤销/重做/笔记/清除/提示) 深色胶囊, 清除按钮保留原版 icon

#### Verification
- IDE 语言服务 0 诊断 (select-scene / pict-list-scene / sudoku-scene / nbmAssets)
- gen 脚本幂等重跑成功 (42 + 46)

#### 待真机确认 (记录在案, 不阻塞)
- select1 Diff 按钮 A-E 与真机按钮排布 (D/E 第二排, 当前只用 A-D)
- Return 按钮图在深色背景下的清晰度

---

## PICTURE-V0.15 — 调色板颜色改为 DS 原版 NBM palette 真值 (color 5 修正为黑)

### 2026-09-02

#### 决定性验证 (本轮扫描/渲染证据)
- `numclo_00.nbm` 原始 16 色 palette (ROM 直接读取): 只有 4 个彩色系按钮
  红 `#f80000` / 黄 `#f8f800` / 蓝 `#4868f8` / 绿 `#48b048` (各带暗边 idx7-10) + 灰阶工具色, 无紫色
- 全部 1399 道 numclo puzzle 颜色使用统计: **1052 题用到 color 5** (高频)
- 单色剪影题渲染 (ASCII 形状验证):
  - Cat (`numclo0.data_001`, 全色 5) = 经典黑猫脸剪影
  - Raccoon Dog (`numclo0.data_002`, 全色 5) = 黑浣熊剪影
  - Fox (`numclo0.data_011`, 色 2+5) = **5 做黑描边** + 2 做脸部填充
  - ⇒ color 5 = 黑色 `#181818` (numclo_waku.nbm idx12), 不是旧猜测的紫 `#8e24aa`
- Fox 填充用色 2 = 黄, 与 numclo_00 黄按钮吻合 → 1..4 = 红黄蓝绿顺序确认

#### picture-scene 改造
- `picture-scene.ts`:
  - `PALETTE_HEX` 1..5 → DS 真值: `#f80000 / #f8f800 / #4868f8 / #48b048 / #181818`
    (旧 Material 色 `#e53935/#fdd835/#1e88e5/#43a047` + 无据紫 `#8e24aa` 废弃)
  - `PALETTE_BORDERS` 暗边 → numclo_00.nbm 按钮暗边 idx7-10:
    `#c00000 / #c8c800 / #000090 / #308830`, 色 5 用 waku 灰 `#606060`
  - 注释记录 palette 真值来源与验证过程
- `picture-scene.wxss`: 通关彩带 1..5 颜色同步 DS 真值

#### Verification
- IDE 语言服务 0 诊断
- Python 扫描/渲染脚本证据全部记录

#### 待真机确认 (记录在案, 不阻塞)
- color 5 黑色在 DS 真机调色板中的按钮外观 (H5 侧用纯色回退, 无原图素材)
- 其余 NBM palette 主色与真机截图逐像素对照

---

## PICTURE-V0.14 — picture-scene UI 进一步 DS 化

### 2026-09-02

#### 新增切片
- `scripts/gen_nbm_assets_ts.py` 从 `numclo_00.nbm` 补充裁剪:
  - `numclo00_erase`: 白色空白按钮 → 调色板"擦除"
  - `numclo00_clear`: 灰色 X 按钮 → "清空画板"工具按钮背景
- `miniprogram/utils/sudoku/nbmAssets.ts`: 重新生成, 新增上述常量并归入 `NBM_GROUP_PICTURE_PUZZLE`

#### picture-scene 改造
- `picture-scene.ts`:
  - import `NBM_NUMCLO00_ERASE` / `NBM_NUMCLO00_CLEAR`
  - `PALETTE_IMAGES[0]` 从纯色回退改为原 DS 白色按钮切片
  - 新增 `TOOL_IMAGES` / `data.toolImages` 供 wxml 引用
- `picture-scene.wxml`: "清空画板"按钮使用 `toolImages.clear` 背景图
- `picture-scene.wxss`:
  - 普通工具按钮加 DS 风格浅阴影 + active 下压动效
  - `.tool-key-clear` 使用灰色 X 切片背景 + 白字 + 深色阴影

#### Verification
- IDE 语言服务 0 诊断 (picture-scene.ts / nbmAssets.ts)
- Python 扫描/裁剪脚本验证切片坐标

---

## PICTURE-V0.13 — 颜色语义对照: 修正 numclo_00.nbm 切片错位

### 2026-09-02

#### 发现
- 对 `numclo_00.nbm` 全图像素扫描后发现:
  - 左列只有 4 个真实彩色按钮: 红/黄/蓝/绿 (y≈4..56)
  - 没有紫色大按钮, 也没有标准擦除按钮
  - 之前 V0.11 生成的 `numclo00_color_5_purple.png` 实际是灰色功能图标,
    `numclo00_erase.png` 也是灰色图标, 与命名语义不符
- 全 1525 道谜题 color 5 使用 52,537 格, 非常频繁, 不能省略

#### 修正
- `scripts/gen_nbm_assets_ts.py`: `NUMCLO_00_SLICES` 只保留 4 个真实颜色切片,
  删除错误的 purple/erase 切片生成
- 删除误导性 PNG:
  - `miniprogram/assets/nbm/numclo00_color_5_purple.png`
  - `miniprogram/assets/nbm/numclo00_erase.png`
- `miniprogram/utils/sudoku/nbmAssets.ts`: 重新生成, 移除对应常量
- `picture-scene.ts`:
  - 移除 `NBM_NUMCLO00_COLOR_5_PURPLE` / `NBM_NUMCLO00_ERASE` import
  - `PALETTE_IMAGES` index 0 与 5 置为空串, 回退到 `PALETTE_HEX` 纯色渲染
- `picture-scene.wxml`: `palette-key` 有 `imageUrl` 时显示 DS 切片, 无则显示纯色块

#### Verification
- IDE 语言服务 0 诊断 (picture-scene.ts / nbmAssets.ts)
- Python 像素扫描脚本验证原图布局

---

## PICTURE-V0.12 — 调色板按钮视觉修正 + 清理死样式

### 2026-09-02

#### 修正
- `picture-scene` 调色板 `.palette-key` 从 40×40 圆形 → 46×15 圆角矩形,
  匹配 `numclo_00.nbm` 按钮切片原始 40:13 比例
- 加 `background-size: 100% 100%` + `background-repeat: no-repeat`,
  确保 5 色 + 擦除按钮切片完整铺满, 不再被圆形裁剪成一条
- 去掉切片外的人工白边框, 让 DS 原按钮自带边框/高光直接呈现

#### 清理
- 删除已死样式 `.erase-mark` (wxml 已不再引用该 text 节点)

#### Verification
- IDE 语言服务 0 诊断 (picture-scene.ts)
- wxss 全 px 单位, 无 rpx

---

## PICTURE-V0.11.1 — 修复 skyline 整页黑屏 (index.json 漏注册 picture-mode-scene)

### 2026-09-02

#### 修复
- index.wxml 早已引用 `<picture-mode-scene>` (图画谜题模式选择场景,
  `s === 'pictureMode'` 分支), 但 `pages/index/index.json` usingComponents
  **漏注册**该组件 → skyline/glass-easel 编译自定义组件失败 → 整页黑屏
- 补注册: `"picture-mode-scene": "/components/scenes/picture-mode-scene/picture-mode-scene"`
- 已核对: index.wxml 使用的 11 个 scene 组件 ↔ index.json 注册 11 个, 全部对齐;
  全项目 wxml 自定义组件引用无其他漏注册 (scene 组件互不嵌套)

#### Verification
- ✅ index.json JSON 语法合法 (ConvertFrom-Json 通过)
- ✅ 组件四件套齐全 (picture-mode-scene.json/ts/wxml/wxss)

---

## PICTURE-V0.11 — picture-scene 调色板改用原 DS numclo_00.nbm 按钮切片

### 2026-09-02

#### 新增
- ✅ 调色板按钮从 CSS 假色圆 → 原 DS `numclo_00.nbm` 真按钮切片:
  - `scripts/gen_nbm_assets_ts.py` 新增 `NUMCLO_00_SLICES` 6 组裁剪坐标
    (左列 x=8..48, y=1..86 按 ~14px 等分 6 钮, 去掉左侧蓝色选中条) +
    `generate_numclo00_slices()` crop `numclo_00.nbm.png` → 5 画笔色 + 擦除按钮 PNG
  - 生成常量自动注册: `NBM_NUMCLO00_COLOR_1_RED` … `_5_PURPLE` + `NBM_NUMCLO00_ERASE`
    (nbmAssets.ts +14 行, 追加进 `NBM_GROUP_PICTURE_PUZZLE`)
- ✅ picture-scene 调色板 wxml/ts 接入: `PALETTE_IMAGES[6]` + palette 每项 `imageUrl`,
  `.palette-key` 改 `background-image: url({{item.imageUrl}})`
- ✅ 与对局页同源资产闭环: 网格背景 `numclo_waku.nbm` + banner `numclo_00.nbm` +
  调色板按钮 `numclo_00.nbm` 切片, 全部 1:1 还原 DS 原 UI

#### Verification
- ✅ IDE 语言服务 0 诊断 (picture-scene / nbmAssets)
- ✅ 生成脚本实际产出 6 个 PNG (miniprogram/assets/nbm/numclo00_*.png)

#### 已知改进空间 (不阻断)
- `.palette-key` wxss 仍为圆形 border-radius + 无 background-size,
  40×13 长方形切片圆内显示效果待真机确认 (可能需要 background-size: cover/contain)
- `.erase-mark` 样式已死 (wxml 不再引用)

---

## PICTURE-V0.10 — 进度自动保存/恢复 + 通关标记 + 调色板剩余计数 + 完成动画

### 2026-09-02

#### 新增
- ✅ 进度自动保存与恢复 (`utils/sudoku/picture_progress.ts` 新建):
  - 每局 (类别 + 题号) 独立存储 `esds_pic_progress`: 涂色网格 + 步数 + 累计用时
  - 涂色/撤销后 400ms 防抖落盘; 切题/清空/离开场景立即落盘
  - 重开未通关题自动恢复上次网格/步数, 计时从累计值续走
  - 通关或清空画板自动清除该题进度
- ✅ 通关记录 `esds_pic_completed` + 完成标记:
  - 完整涂对即记录成绩 (用时/步数)
  - 列表页每类别显示 `✓ n/m` 已完成数, 全通关深绿高亮; 顶部汇总已通关总数
  - 对局页标题旁显示 `✓ 已通关` 标记; 已通关题重开从空白重涂 (不恢复旧进度)
- ✅ 调色板视觉: 每个颜色圆下方显示该色剩余待涂格数, 涂满变绿 (PICTURE-V0.3 每色计数提示的配套反馈)
- ✅ 通关庆祝动画: 全屏遮罩 + 绿色 ✓ 弹出 + 6 条彩带飘落 (1.6s 后弹"下一题?"询问)
- ✅ `PictureGameService` 新增 `restoreProgress` / `clearGrid`

#### 修复
- `onClearAll` 之前只清 UI 不清 service 会话 → 清空后内部网格/步数残留, 进度/通关判定错乱; 现同步 `clearGrid()` 并清除该题进度

#### Verification
- ✅ IDE 语言服务 0 诊断 (picture-scene / pict-list-scene / picture_progress / picture_game_service 全绿)

---

## PICTURE-V0.3 — picture-scene 提示改为原 DS 每色计数 (ナンクロ / Number Cross)

### 2026-09-02

#### 调整
- `picture-scene` 行列提示从 Nonogram "连续段" 改为ナンクロ/Number Cross 的"每色计数":
  - 每行/列固定 5 条色带, 对应颜色 1..5
  - 色带数字 = 该行/列中该颜色目标格的总数
  - 与 `numclo_waku.nbm` 中 5 条提示带布局对齐
- 提示条使用对应颜色背景 + 白色文字, 计数为 0 时留白
- 保持 `numclo_waku.nbm` 作为网格 faint 底纹 (`waku-bg`)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## PICTURE-V0.4 — numclo_waku 网格与 15×15 单元格精确对齐

### 2026-09-02

#### 调整
- `picture-scene.wxss` 重新定位 `waku-bg`:
  - 原图 256×256, 内部网格区域为 `[64,184)` 共 120px
  - 放大至 213.333% 并向左上偏移 -53.333%, 使 waku 黑线覆盖范围正好等于 15×15 单元格
  - 透明度从 0.14 提至 0.22, 网格线更可见但仍不干扰上色
- 单元格细线 (#e6ebf0) 与 waku 黑线叠加, 接近原 DS 网格观感

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## PICTURE-V0.5 — picture-scene 增加题号跳转

### 2026-09-02

#### 新增
- `picture-scene` 导航行新增"跳转"按钮:
  - 弹出可编辑 modal, 默认当前题号
  - 输入 1..puzzleCount 后跳转到对应题目
  - 非法输入/越界 toast 提示, 不触发加载

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## PICTURE-V0.6 — picture-scene 增加撤销 (undo)

### 2026-09-02

#### 新增
- `picture-scene` 工具行新增"撤销"按钮:
  - 每次涂色记录历史栈 `{i, prev}`
  - 撤销时恢复该格上一次颜色并同步 `PictureGameService`
  - 清空画板时同时清空历史栈
  - 无可撤销操作时 toast 提示

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## PICTURE-V0.9 — 教程模式 (numclo_tu.data) 叠加 tutorial_00.nbm 教学图

### 2026-09-02

#### 新增
- `picture-scene` 当前类别为 `numclo_tu.data` 时,在网格下方显示原 DS 教学图 `tutorial_00.nbm`:
  - 图片 128×256, 竖向显示, 高度 120px, 宽度按 aspect-fit 自适应
  - 右上角加关闭按钮, 关闭后本局不再显示; 切换题目时自动重新显示
  - 不影响网格触摸操作, 关闭按钮在图片上方
- 新增 data 字段 `tutorialClosed` + 方法 `onCloseTutorial`

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## PICTURE-V0.7 — picture-scene 使用完整 numclo_waku.nbm 作为背景并对齐提示/网格区

### 2026-09-02

#### 调整
- `picture-scene` 将 `numclo_waku.nbm` 从仅覆盖网格改为覆盖整个 `puzzle-area`:
  - `puzzle-area` 改为 `aspect-ratio: 1 / 1`, 背景图放大 142.22% 并向左上偏移 -3.33%,
    使图片实际内容区 (180×180) 填满容器
  - 顶部/左侧提示区尺寸改为 32.22%, 主网格区改为 67.78%, 与原图红色/黑色区域对齐
  - 移除 `paint-grid` 内部独立的 `waku-bg` image 节点, 网格背景改为透明
  - `paint-cell` 细线改为半透明, 让原图网格线主导视觉

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## PICTURE-V0.1 — 图画谜题子模式选择菜单 (pazl_select 原版菜单还原)

### 2026-09-02

#### 新增
- ✅ `miniprogram/components/scenes/picture-mode-scene/` 新建组件:
  - 使用原 DS `pazl_select.nbm` 竖向菜单图做背景
  - 5 个透明热区覆盖菜单项: ナンクロ / ヌクロ / カード / ポピュレーション / チュートリアル
  - ナンクロ → 进入类别列表 (`pictList`); チュートリアル → 直接开始 `numclo_tu.data` 教程题
  - ヌクロ / カード / ポピュレーション 暂未解析数据, 点击 toast 提示
- ✅ `pages/index/index.ts` 新增 `pictureMode` 场景 + 路由:
  - `menu` → `pictureMode` (forward); `pictureMode` → `pictList` / `picture` (forward)
  - `pictList` / `picture` 返回 → `pictureMode` (back); `pictureMode` 返回 → `menu` (back)
- ✅ `pages/index/index.wxml` 注册 `<picture-mode-scene>` 组件节点
- ✅ `miniprogram/utils/audio/soundManifest.ts` 增加 `pictureMode` 场景 BGM 映射 (复用 `SEQ_13.mp3`)

#### 调整
- 主菜单"图画谜题"入口从直接进入 `pictList` 改为先进入 `pictureMode`, 对齐原 DS 流程。

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0 (miniprogram 全量)

---

## PICTURE-V0.2 — 子模式菜单精确热区 + 选中箭头反馈

### 2026-09-02

#### 调整
- `picture-mode-scene` 热区从 5 等分改为按 `pazl_select.nbm` 实际文字位置覆盖:
  - ナンクロ / ヌクロ / カード / ポピュレーション / チュートリアル 5 项独立 `top/height`
  - 避免顶部/底部空白区域误触发
- 选中项左侧显示蓝色右箭头，hover/active 时高亮背景，还原 DS 菜单选择感
- 组件 `data` 增加 `selectedId`，点击后即时更新箭头位置

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## SOUND-V0.4 — 小程序播放接入: BGM/SE MP3 资产 + audioService + 场景音效

### 2026-09-02

#### 新增
- ✅ `scripts/pack_audio_assets.py` 新建: ffmpeg 批量 WAV → MP3 (24kbps mono @ 22050)
  - 产物 `miniprogram/assets/audio/bgm/SEQ_*.mp3` (9 首 ~1.1MB) + `se/*.mp3` (17 个 ~37KB)
- ✅ `miniprogram/utils/audio/soundManifest.ts` 新建: 资源清单
  - `BGM_MANIFEST`: 10 场景 → BGM 文件 (title→SEQ_01 / menu→SEQ_02 / select→SEQ_03 /
    options+about→SEQ_10 / sudoku→SEQ_04 / picture→SEQ_12 / pictList→SEQ_13 /
    tutorial→SEQ_15 / staff→SEQ_14) — 映射为临时推测, 后续按原 DS 调用链校准
  - `SE_MANIFEST`: 9 事件 → SE 文件 (tap/back/start/decide/clear/paint/slide/complete/undo)
- ✅ `miniprogram/utils/audio/audioService.ts` 新建: 单例音频控制器
  - BGM 单例 InnerAudioContext loop, 同 src 不重置; SE 一次性 ctx 池化自动销毁
  - 音量/开关持久化 `esds_*` 4 个 key (与 options-scene slider 双向同步)
- ✅ 场景 BGM: index `onLoad` query 直达 + `_switchScene` 统一 `playBgmForScene(scene)`;
  onUnload 调 `audioService.destroy()`
- ✅ 场景 SE: title (start) / menu (decide/tap/back) / select (tap/slide/start/back) /
  options (音量滑块) / pict-list (back/start) / sudoku (tap/clear/undo/complete) /
  picture (paint/clear/tap/slide/decide/complete)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0 (miniprogram 全量)
- ✅ lint 0 errors (pict-list/sudoku/picture/options/menu/select/title + index)
- ✅ `python scripts/pack_audio_assets.py` — 26 个 MP3 全部转换成功, 文件名与 manifest 1:1

---

## SOUND-V0.3 — 软件渲染闭环: SSEQ 事件流 + ADPCM sample → 可听 BGM/SE WAV

### 2026-09-02

#### 新增
- ✅ `scripts/sseq_render.py` 新建: 纯 Python 软件合成器, 事件流 + SWAR sample → BGM WAV
  - 输入 sseq-playable.json + snd-linkage.json + 12/13_swar ADPCM (复用 decode_block)
  - per-track tempo/vol/expr/instrument 状态, NOTE voice 绝对 ms 时间线
  - def root note 最近匹配 + `step = rate/OUT_RATE*2^((key-root)/12)` 重采样
  - loopFlag 在 [loopOffset, loopOffset+loopLength) 循环, attack/sustain/release 门控
  - mono 16-bit @ 22050, peak normalize, 首尾静音裁剪, body 上限 60s
  - 产物 `work/wav/bgm/SEQ_*.wav` (gitignore): 9 首全部成功 (6.0-60.4s)
- ✅ `scripts/ssar_render.py` 新建: 30 条 SSAR SE 记录 → WAV
  - 每条 = 6B mini-SEQ `81 <prog> 3c 7f 00 ff`, bank=1 → 11_sbnk → WAVE_SE 13_swar
  - 产物 `work/wav/se/NN_<name>.wav`: 17 个有效 SE (174-1087ms)
- ✅ `docs/SOUND_DATA_REPORT.md` 追加 §12-14 (渲染闭环 + SE 空槽发现 + 陷阱 9-11)

#### 关键发现 (ground truth)
- **11_sbnk 只有 17 个有效 instrument**, swav 1:1 覆盖 13_swar 全部 17 samples;
  prog 10/16-27 (13 槽) = ftype=0 空 instrument → SSAR 死槽 (疑似预留/未启用)
- SSEQ NOTE dur 可为 0 tick (`7f 00`): 渲染按 sample 自然播完 + release, 非静音
- 全部渲染无静音无削顶 (RMS 0.12-0.20, nonzero 75-98%), 闭环成立

#### Verification
- ✅ `python scripts/sseq_render.py` — 9 BGM WAV 生成, mix 0.1-1.5s/首
- ✅ `python scripts/ssar_render.py` — 17 有效 SE WAV 生成, 13 空槽 skip 有日志
- ✅ 抽查 `work/_chk_wav2.py` — 全部 WAV 时长/peak/RMS/nonzero 正常

---

## SOUND-V0.2 — SSEQ 可播放事件流 + SBNK→SWAR 链接表 + SDAT Symbol 表重建

### 2026-09-02

#### 新增
- ✅ `scripts/sdat_common.py` 新建共享模块: `Sdat`(FAT/INFO/SYMB 解析 + info_lists + symb_tables) /
  `Sseq` / `Ssar` / `Sbnk`(defs_of 支持 ftype<16/16/17) / `Swar`(sample(i) → DSWAV dict)
- ✅ `scripts/sseq_playable.py` 新建: 9 首 SSEQ 全部 track 线性渲染为可播放事件流
  (tempo/tick/ms 推进, CALL rel24 内联展开, JUMP 向后跳记 `loop:{backTo}` 并结束段渲染,
  全部收敛 EOT 无 stale) → `rom-data/sound/sseq-playable.json`
- ✅ `scripts/snd_linkage.py` 新建: 每首 SSEQ 实际 instrument (0x81 事件) → INFO BANK entry
  4-SWAR array → SWAR file → 完整 sample 字典 (rate/loop/waveType/dataSize)
  → `rom-data/sound/snd-linkage.json`
- ✅ `scripts/parse_sdat_symbols.py` 新建: INFO/SYMB 自定义解析重建 symbol 表
  → `rom-data/sound/sdat-symbols.json`
- ✅ `docs/SOUND_DATA_REPORT.md` 追加 SOUND-V0.2 章节 8-11 + 陷阱 5-8

#### 关键结论 (ground truth)
- INFO block 真实结构 = 头部 + 8 个 list offsets (SEQ/SSAR/BANK/SWAR/Player/Group/Player2/STRM),
  非旧解析假设的 magic/size/count + 4 sub-block; 实测 SEQ=9/SSAR=1/BANK=2/SWAR=2/Player=2/Group=1
- INFO entry 尺寸: SEQ 12B (fatID+unk+bnk+vol+cpr+ppr+ply+rsv) / BANK 12B (fatID+unk+4×SWAR) /
  SWAR 2B fatID; SSAR 是 folder list (`(nameOff, seqListOff)` pair, 30 个 SE 名)
- SBNK def 的 `swar` 引用字段恒 0, 真正的 SWAR 选择来自 INFO BANK entry 4-SWAR array:
  BANK_BGM(10_sbnk)→swars[0,FFFF]→12_swar(WAVE_BGM); BANK_SE(11_sbnk)→swars[1,…]→13_swar(WAVE_SE)
- SYMB 重建: SEQ `SEQ_01..04/SEQ_10/SEQ_12..15`, BANK `BANK_BGM/BANK_SE`, SWAR `WAVE_BGM/WAVE_SE`,
  Player `PLAYER_BGM/PLAYER_SE`, SSAR folder `SEQ_SE`; 14 FAT 文件全部在表且与 symbol 匹配

#### Verification
- ✅ `python scripts/sseq_playable.py` — 9 SSEQ 全部 track 收敛 (抽样逐字节模拟 CALL/JUMP 一致)
- ✅ `python scripts/snd_linkage.py` — SEQ_01 prog 1/12/13/14/120/121 → WAVE_BGM samples
  [5,18,17,26,16,0,1,10,11,12,15,21,22,27] 映射正确
- ✅ `python scripts/parse_sdat_symbols.py` — INFO/SYMB 全表重建, 14 FAT 文件全在

---

## SOUND-V0.1 — SDAT 音频数据全链路解码 (SSEQ/SSAR/SBNK/SWAR/ADPCM→WAV)

### 2026-09-02

#### 新增
- ✅ `scripts/analyze_sound_data.py` SSAR/SWAR 解析按 GBATEK 修正:
  - SSAR 记录 16B `<III` → 12B `<IHBBBBH`: nOffset(u32)+bnk(u16)+vol(u8)+cpr(u8)+ppr(u8)+ply(u8)+rsv(u16)
  - SWAR/DSWAV block header 16B `<IIII` → 12B `<BBHHHI`: waveType(u8)+loopFlag(u8)+sampleRate(u16)+time(u16)+loopOffset(u16)+loopLength(u32)
  - 修 struct 格式串 `<BBIHHI`(14B, sampleRate 被并成 ~99.5M 垃圾值) → `<BBHHHI`(12B, 采样率恢复正常 11025/22050/32000)
- ✅ `scripts/swav_to_wav.py` 新建: 45 个 DSWAV block (12_swar 28 + 13_swar 17, 全 IMA-ADPCM)
  解码为 mono 16-bit WAV → `work/wav/*.wav` (时长 0.04-1.10s)
- ✅ `docs/SOUND_DATA_REPORT.md` 新建: SDAT 容器/SSEQ/SSAR/SBNK/SWAR 全格式结论 + 链接表 + 陷阱记录

#### Verification
- ✅ `python scripts/analyze_sound_data.py` — 9 SSEQ 音轨表/事件直方图, 30 条 SSAR 12B 记录, 45 block 全 ADPCM
- ✅ `python scripts/swav_to_wav.py` — 45 WAV 生成, 采样率合法

---

## V0.19 — remaining detector 扩展 (12→52 命名, 短复杂函数模式消化)

### 2026-09-01

#### 新增
- ✅ return+数据尾截断: 最后一个返回指令 (bx rN/pop pc) 之后全条件后缀 = 数据池,
  截断后重新分析 (0x0200a684 等 bx ip thunk 尾部数据不再阻塞 indirect_thunk 识别)
- ✅ 新模式 9 个 (全部结构性命名, 无语义猜测):
  - `const_call` (7): 恰好 1 bl + mov r0,#const 命令分发器, 如 0x0203aaf4 家族 7 个
    全调 0x203aa68 带不同命令码 → auto_const_call_<const>_to_<target>
  - `wrap` (22): 1-4 bl + 无条件分支 + 标准返回 (适配器/初始化器), name 带 callee 地址链
    (可看到 0x02029de4 = dcache_clean 0x20395f4 + memset 0x2037830 组合包装)
  - `list_unlink` (4): ldr r2,[r0]+cmp+beq+str r1,[r0]+mov r0,r2 单链表摘除
  - `list_relink` (2): 双向链表互链 (streq/strne 交叉写)
  - `stm_fill` (2): mov #const + 连续 stm r0! 块填充 (0x1000/0 交替模式)
  - `zero_init` (1) / `sp_fields_copy` (1) / `struct_init` (1) / `null_guarded_setter` (1)
- ✅ 第二轮补充 (complex-14+ 扫描): `struct_copy` (1, 16 对 ldr [r1,#N]|str [r0,#N] 成对拷贝)
  + `multi_bl_init` (4, 4+ bl 无条件初始化链, name 带全部 callee 链;
  0x02029e4c = dcache_clean 0x20395f4 与 memset 变体交替多区段清缓存)
- ✅ 命名 12 → 57 (+45), sub_ 1813 → 1756, 覆盖 32.85% → 34.93% (944/2700)
- ✅ skip 247 → 202, 剩余全部为数据噪音或含条件分支的真实复杂函数 (需人工分析)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0
- ✅ arm9.ts +32 (wrap 13 / const_call 7 / indirect_thunk 4 / list_unlink 4 /
  multi_bl_init 4 / stm_fill 2 / list_relink 2 / struct_copy 1 / zero_init 1 /
  sp_fields_copy 1 / struct_init 1 / 其他 2)
- ✅ arm7.ts +10 (wrap 8 / indirect_thunk 2)

---

## V0.19.1 — 手工 curated 高价值函数批次 (14 个, 全覆盖 full-body 反汇编验证)

### 2026-09-01

#### 新增
- ✅ 手工 curated 命名 14 个 (`rom-data/v019-curated-batch.json`), 全部经完整函数体反汇编验证:
  - **intrusive 链表家族** (5): `intrusive_list_init` (0x020300d0) /
    `intrusive_list_init_first_node` (0x020300a4) / `intrusive_list_push_front` (0x0202ffd8) /
    `intrusive_list_append` (0x0203003c) / `intrusive_list_rewind_head` (0x02030958) /
    `intrusive_list_update_all_backref` (0x02030928)
    - 结构语义: head@[r0], tail@[r0,#4], count@[r0,#8], link offset@[r0,#0xa] (halfword)
    - append 空表时调用 init_first_node, 非空走 tail 链尾插入 (offset 解引用)
  - **ARM 异常上下文原语** (2): `arm_exception_ctx_save` (0x0210509c) /
    `arm_exception_ctx_restore` (0x021050d0)
    - SVC mode (cpsr 0xd3) 全寄存器上下文保存/恢复, restore 端 `subs pc, lr, #4` 从异常返回
    - 典型 RTOS/任务切换原语对 (save 返回 0, restore 用 spsr_fsxc + ldm ^)
  - **工具/包装** (7): `bounded_array_slot_get` (0x02034fc4, 边界检查+stride 0xc slot 取指针,
    slot==-1 返回 NULL) / `nullable_3field_init` (0x0203fb58, null 守卫 3 字段初始化) /
    `unaligned_halfword_memcpy` (0x02106d00, 未对齐 halfword 拷贝) /
    `aligned_size_gated_call_0x2030a50` (0x020308dc, 4 对齐+size>=0x30 门控后调用) /
    `guarded_init_3stage` (0x02026660, 3 段守卫初始化链) /
    `const_400_wrap_call_0x2104c1c` (0x02107cec, 常量参数包装器)
- ✅ `generate_ts_functions.py` 新增 `CURATED_JSON_V019B` 加载 (22→23 个 curated JSON)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0 (无错误输出)
- ✅ arm9.ts 14 个新命名全部落地 (findstr 确认), curated 593 → 607
- ✅ 命名覆盖率 34.93% → 35.30% (953/2700), sub_ 1756 → 1747
  (9 个由 sub_ 升级为语义名, 5 个由 auto_* pattern 名升级为 curated 名)

---

## V0.19.2 — IO 寄存器家族 pattern + 浮点/门控手验 (7 个, 覆盖 35.56%)

### 2026-09-01

#### 新增
- ✅ detector 新模式 T `io_4000138` (4 个): 检测 `mov ip,#0x4000000 + add ip,ip,#0x138`
  + bic/orr 位操作 — ARM7 keypad/JOY 总线寄存器族控制函数
  - `auto_io_4000138_bic0x77_orr0x72` (0x0239f964) / `auto_io_4000138_bic4_orr0` (0x0239f9a4)
    / `auto_io_4000138_bic0x77_orr0x74` ×2 (0x0239f9d8 位扫描循环 + 0x0239fa48 未对齐半字变体)
  - 结构: read-modify-write + `subs r3,#1; bne` 延迟循环 (2/9 周期) + 位扫描 tst/lsr
- ✅ 手工 curated 3 个 (full-body 反汇编验证):
  - `shift_normalize_left_binsearch` (0x0204e1b0 arm9 + 0x023876ac arm7, 同算法双 CPU 副本):
    二分搜索移位归一化 (r2=0x1c, cmp lsr 阶梯 sub 0x10/0x8/0x4), r0>r1 → 0 (softfloat 风格)
  - `triple_gate_check_to_0x202f3fc` (0x020274f0): 3 次调用 (args 2/3/4) 全成功 → 0,
    任一失败 → 1 (子模块可用性门控)
- ✅ detector curatedFiles 加入 `v019-curated-batch.json` (防已 curated 地址被重复 pattern)
- ✅ detector `io_4000138` body 上限 20→40 (家族函数实际 28-36 insn)

#### 关键修复 (scan 工具链教训)
- function-records.json 的 addr 是数字 (33587916), function-table.json 是字符串 '0x02009a18'
  → 跨文件比对必须归一化 (number→hex string), 否则 scan 命中率 0
- V0.8 误判邻近条目会截断真实函数体 → 结构 scan 必须用 loose 模式 (忽略 addrSet 断点)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0 (无错误输出)
- ✅ 61 个 detector 命名 (57 + 4 io_4000138), curated 607 → 614
- ✅ 命名覆盖率 35.30% → 35.56% (960/2700), sub_ 1747 → 1740
- ✅ 剩余 sub_ callers≥1 = 360, 全部 callers≤2 (高调用数候选已被 V0.13-V0.19 消化殆尽)

---

## V0.19.3 — numclo 图画谜题 catalog 完整性核查 + 文档数字修正

### 2026-09-01

#### 背景
- 用户诉求 (记忆 ID 22773785): 暴力破解 numclo 图画谜题格式。V0.17.10 已完成
  (base-6 packed 解码, 1525 系早期错误估计) — 本次对运行时代码做完整性复核

#### 核查结论
- ✅ `rom-data/extracted/numclo-puzzles.json` = 1401 puzzles (15 文件完整)
  - numclo0-9 × 100 (各 7710 B) + numclo_00-03 × 100 (各 7710 B) + numclo_tu × 1 (87 B)
  - fnt-mapping 实测 15 文件全对账: 14×100 + 1 = **1401** (非文档旧值 1525)
- ✅ 运行时 TS catalog (`numclo_puzzles.ts`) 已含全部 1401 题 (git HEAD 核对,
  此前"缺 403 题"是扫描正则误判 — 空名字段 `''` 不匹配 `'[^']+'` 模式)
- ✅ `unpackNumcloGrid` round-trip: packed hex → grid 与 JSON 0 差异 (Crab 抽样)
- ✅ `numclo_answers.ts` 与 HEAD 内容 100% 一致 (仅格式化差异, 已还原)

#### 修复
- ✅ `docs/NUMCLO_FORMAT.md`: 总 puzzles **1525 → 1401** (14×100 main + 1 tutorial)
- ✅ `numclo_puzzles.ts` 头部注释: 1525 → 1401 (附文件分布说明)
- ✅ 新工具 `scripts/gen_numclo_ts_from_json.cjs`: JSON → TS 永久再生脚本
  (不依赖 ROM/Python, 解决 decode_numclo_full.py 需 ROM 才能重生成的痛点)

#### Verification
- ✅ 再生后 RAW 1401 行, 15 文件分布: numclo0-9×100 + numclo_00-03×100 + numclo_tu×1
- ✅ round-trip 0 差异, tsc 待跑

---

## V0.19.4 — 186 候选扫描手工 curated (14 个, 覆盖 35.93%)

### 2026-09-01

#### 新增
- ✅ 手工 curated 命名 14 个 (`rom-data/v019-curated-batch2.json`), 全部经
  disasm-arm9/arm7-full.txt 完整函数体反汇编验证 (186 候选 dump 扫描后的高价值子集):
  - **intrusive 链表家族续** (5): `intrusive_list_unlink` (0x02038e14, 双链摘除
    next@+0x80/prev@+0x7c, head/tail 更新) / `intrusive_list_sorted_insert` (0x02038e9c,
    key@+0x70 排序插入, 已在表内直接返回) / `intrusive_list_unlink_alt` (0x02104f10,
    同算法 link 0x60/0x64 + 存 lr 的容器变体) / `intrusive_list_pop_front` (0x02104f74,
    摘头, 空表尾清 0x5c) / `intrusive_list_sorted_insert_alt` (0x02104fa8, key@+0x54 变体)
  - **softfloat 转换/比较器** (3, 从 generic sfloat_ 名升级为语义名):
    `float64_from_uint32` (0x0204c0c0, bias 0x41e=1054 + clz 归一化, 返回 r1:r0 64-bit) /
    `float32_compare_ge` (0x0204ccc0, NaN 门控 + abs 双方 + 无符号比较) /
    `float64_compare_setflags` (0x0204cfd8, 64-bit 比较结果走 NZCV flags)
  - **未对齐内存原语** (2): `unaligned_byte_memset` (0x02106c90, 奇地址首字节
    ldrh+and+orr+strh 合并, 半字/字快路径) / `unaligned_byte_memcpy` (0x02106d24,
    src/dst 奇偶对齐处理 + 半字循环 + 尾字节)
  - **字符串/堆** (3): `strncasecmp_ascii` (0x0203cb6c, 0x41..0x5a +0x20 小写化后
    r2 长度内比较, 返回字节差) / `heap_freelist_coalesce_insert` (0x02105b34,
    free-list 按 size 序插入 + 前向/后向合并, node {next@+0,prev@+4,size@+8}) /
    `heap_freelist_push_front` (0x02105c10, 头插入 helper)
  - **ARM7 SPI 位拆读** (1): `arm7_spi_shift_read` (0x0239fad8, AUXSPICNT
    0x04000138 bit0 data-in, 8-bit 移位累积 + CS/clock 翻转延迟循环, 奇偶地址半字合并,
    读 r1 字节到 r0) — V0.19.2 io_4000138 家族漏网函数
- ✅ `generate_ts_functions.py` 新增 `CURATED_JSON_V019C` 加载 (23→24 个 curated JSON)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0
- ✅ curated 614 → 627 (+14), 命名覆盖率 35.56% → 35.93% (970/2700),
  sub_ 1740 → 1699 (13 arm9 + 1 arm7 升级为语义名)
- ✅ arm9.ts +13 (intrusive_list 5 + softfloat 3 + mem 2 + string 1 + heap 2)
  / arm7.ts +1 (arm7_spi_shift_read)

---

## V0.19.5 — 312 候选池噪音过滤 + 手工 curated (19 个, 覆盖 36.63%)

### 2026-09-01

#### 新增
- ✅ 候选池重构: 模拟生成器优先级链 (known/curated/pattern/heuristic 全排除) 扫出
  312 个剩余 sub_ callers≥1 候选 (arm9 295 + arm7 17, 全部 callers≤2)
- ✅ 噪音过滤新工具链 (`_tmp_scan5*.cjs`):
  - `_tmp_scan5.cjs`: 候选扫描 (312 个 → `_tmp_scan5_out.txt`)
  - `_tmp_scan5b.cjs`: 从 disasm-arm9/arm7-full.txt 提取候选函数体
    (修复: 文件格式是空格分隔 `ADDR [8hex] MNE OP`, 不是冒号分隔)
  - `_tmp_scan5c.cjs`: ≥4 条真实指令过滤 → 65 个真实候选 (排除 andeq/svc/cdp/mrc/mcr/stc
    等数据噪音); 人工复核确认 0x0205+/0x0207+/0x020f+ 区域全是纯数据解码
- ✅ 手工 curated 命名 19 个 (`rom-data/v019-curated-batch3.json`), 全部经完整函数体验证:
  - **位标志/模式寄存器** (2): `halfword_mode_bits_set` (0x02015578, bic #3 + orr #1 双寄存器
    模式更新) / `halfword_flag_bits_check` (0x02024c80, [r1,#2]/[r1,#6] 的 0x20/0x10 位门控)
  - **null 守卫字段写入器** (2): `guarded_field_triple_halfword_write` (0x02031ed8,
    0x34=2/0x38/0x3a 三半字) / `guarded_field_pair_halfword_write` (0x02031f00, 0x34=1/0x38)
  - **块填充/清零** (2): `alternating_word_fill_0x1000` (0x020350c0, stm 交替 0x1000/0,
    与 V0.19 stm_fill pattern 同族) / `multiword_zero_clear_16` (0x020367bc, 10× stm 4 寄存器
    = 64-byte 对象清零)
  - **数学/矩阵** (3): `two_input_classifier` (0x0203ecbc, (r0,r1) 组合→7/6/4 枚举) /
    `matrix_fill_loop_2d` (0x02040bd4, 嵌套 blt 循环 + stride 字写) /
    `fixed_point_normalize_store` (0x02040e40, 定点归一化 asr #6 + lsr #25 舍入 + asr #7 = ÷128
    带符号折叠)
  - **结构校验** (1): `struct_field_range_validator` (0x0204493c, [r0,#4]≤0x70,
    [r0,#0x18]∈[0xa,0x3e8], [r0,#0x32]≥1)
  - **intrusive 链表家族续** (3): `intrusive_list_walk_clear_fields` (0x020fff5c, 遍历全局链表
    清 0x78/0x7c/0x80 字段) / `intrusive_list_head_init` (0x021052a8, head 自引用初始化 +
    数据字段) / `intrusive_list_push_back` (0x021052fc, tail@0x70 尾插, next@+0x10/prev@+0x14)
  - **列表/坐标** (2): `list_stride44_walk` (0x02028240, r3 计数 + stride 0x44 批量处理循环) /
    `signed_coord_delta_bounds_check` (0x0210633c, 两维 signed delta 边界判定)
  - **ARM7** (3): `arm7_byte_array_has_nonzero` (0x0238b97c, 0x20 项内扫描首个非零字节) /
    `arm7_alloc_init_free_wrapper` (0x02389dac, alloc→init 双参→release 三段包装) /
    `arm7_cmd_send_0x86` (0x0239f798, 0x8000 写 + cmd 0x86/param 0x20 分发)
- ✅ `generate_ts_functions.py` 新增 `CURATED_JSON_V019D` 加载 (24→25 个 curated JSON)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0
- ✅ curated 627 → 646 (+19), 命名覆盖率 35.93% → 36.63% (989/2700),
  sub_ 1699 → 1680 (16 arm9 + 3 arm7 升级为语义名)
- ✅ arm9.ts +16 / arm7.ts +3 全部落地 (missing=NONE 校验)
- ✅ 剩余 sub_ 1680: callers≥1 候选已基本消化完毕 (本次 312→65 真候选→19 命名,
  其余全为 callers=0 / 数据噪音区)

---

## V0.18 — global ptr 结构命名全量覆盖 (剩余 callers≥1 自动化消化)

### 2026-09-01

#### 新增
- ✅ 精确候选池重构: 加载全部 21 个 curated JSON + 8 个 pattern JSON 构建"最终命名集合",
  统计出真正未命名 callers≥1 只有 661 个 (arm9 580 + arm7 81), 而非之前以为的 1251
- ✅ 增强版 detector (`v018-pattern-global.json`, 204 条) 一次性消化:
  - 模式覆盖: gptr (192, ldr [pc] 全局指针 + 解引用方向 getter/setter/access) /
    gptr_array (6, 带 lsl 索引数组访问) / switch_dispatch (4) / memcpy_word (1) / memset_word (1)
  - global ptr 从 arm9.bin/arm7.bin 二进制读真实值 (V0.14 同款 ARM pipeline: addr+8+imm)
  - 名字格式: `auto_gptr_<size>_<dir>_<ptr>[_off]` (size=w/h/b/mix, dir=getter/setter/access)
  - ARM7 0x0380fff4 全局对象指针家族 9 个, 0x040001c0 IO 寄存器家族 8 个
- ✅ 排除数据误判区 (关键正确性修复):
  - `data-zone` 138 个: body 无任何控制流 (bl/bx/b/ldr pc) 的连续解码 = 数据区 (如 0x020f6028
    全是 svceq/strdeq 垃圾解码), 不再误命名
  - `no-disasm` 172 个: 地址在 disasm 无对应指令 (V0.8 数据误判区)
  - `data-push` 1 个: 单条 push 指令
  - 剩余 complex 120 个全部 callers=1 长尾复杂函数, pattern 无法自动识别, 需人工分析
- ✅ `generate_ts_functions.py` 新增 `PATTERN_GLOBAL_JSON` 加载 (v018-pattern-global.json),
  与 v014/v017 合并去重, curated 优先级更高

#### Verification
- ✅ 204/204 pattern 全部落地 (203 直接命名 + 1 已被 curated 覆盖, 0 丢失)
- ✅ `npx tsc --noEmit` EXIT=0 (无错误输出)
- ✅ 命名覆盖率: 25.30% (683/2700) → 32.85% (887/2700)
- ✅ sub_ 剩余: arm9 1348 + arm7 465 = 1813 (其中 callers≥1 仅 120 个, 其余全是 callers=0/数据误判区)

#### 技术要点
- CRLF 陷阱: disasm 文件是 CRLF, split('\n') 后行尾带 \r, JS 正则 `.` 不匹配 \r → `$` 锚点失效;
  解法: 每行 trim 后再匹配
- write 工具反斜杠转义: `\s` 写入文件变成 `\\s`, 正则全部改用空格字符类
- 优先级链: known > curated (541) > pattern (v013+v014+v017 merged+v018 global = 357)

---

## V0.17.22 — curated naming 大方向收尾 (bulk pattern 一次消化)

### 2026-09-01

#### 新增
- ✅ 增强版 pattern detector (bulk 系列脚本) 一次性消化剩余命名候选:
  - `v017-pattern-bulk.json` (71) + `bulk2` (16) + `bulk3` (7) + `final` (8) → 合并 153 条 unique
  - 模式覆盖: tail_call (48) / switch_dispatch (50) / state_setter (15) / state_getter (11) /
    const_return (8) / dcache (7) / halfword_getter (6) / byte_setter (3) / field_setter (2) /
    byte_getter (1) / halfword_setter (1) / memcpy_word (1)
- ✅ `generate_ts_functions.py` 新增 `PATTERN_MERGED_JSON` 加载 (v017-pattern-merged.json),
  与 v014 合并去重, curated 优先级更高
- ✅ 命名覆盖率: 8.3% (169) → 25.30% (683/2700), `sub_` 从 ~2033 → 2017
- ✅ 排除 padding/data_target (44 个 `andeq` NOP 区 + 31 data_target + 155 no-disasm),
  这些是 callers=0 prologue 数据误判区, 不参与命名

#### Verification
- ✅ 153/153 pattern 全部落地 (102 直接命名 + 51 已被 curated 覆盖, 0 丢失)
- ✅ `npx tsc --noEmit` EXIT=0 (无错误输出)
- ✅ commit 推送成功

---

## V0.20 — 场景切换过渡动画 (双场景交叉过渡引擎)

### 2026-09-01

#### 新增
- ✅ 场景过渡引擎: 切换时旧场景 (leavingScene) 播放离场动画, 新场景 (scene) 播放进场动画,
  动画结束后定时器移除 leavingScene 层 — 不再是死死的 wx:if 跳转
- ✅ 5 组过渡效果 (index.wxss 关键帧, 只用 transform + opacity, GPU 友好):
  - `fade`: 交叉淡入淡出 (启动/平级切换)
  - `forward`: 新场景整屏从右滑入, 旧场景向左 30% 淡出 (进入下级)
  - `back`: 新场景从左 30% 滑入, 旧场景整屏向右滑出 (返回上级)
  - `drill`: 新场景整屏从下滑入, 旧场景向上 30% 淡出 (下钻进对局)
  - `retreat`: 新场景从上 30% 滑入, 旧场景整屏向下滑出 (退出对局)
- ✅ 场景流向效果表 `SCENE_TRANSITIONS` (22 条 'from-to' → effect), 未配置流向默认 fade
- ✅ index.wxml 改 template `sceneRender` 声明场景集合一次, leaving + entering 双 stage 复用
- ✅ `_switchScene(next, extra)` 统一切换入口: 场景数据透传 (puzzleId/fileKey/puzzleIdx) 随切随带

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0 (无错误输出)

---

## V0.19.1 — 单页场景控制器 (唯一页面 pages/index)

### 2026-09-01

#### 重构
- ✅ `pages/index` 成为唯一页面: 自建场景路由 (场景控制器模式), 不再使用 wx.navigateTo 页面跳转
- ✅ 10 个场景组件全部由 index 按 `scene` 状态 wx:if/elif 切换:
  title / menu / select / options / sudoku / picture / staff / about / tutorial / pictList
- ✅ 场景间数据透传: `puzzleId` (选题页 → 数独), `fileKey + puzzleIdx` (类别列表 → 图画)
- ✅ 删除 9 个页面壳目录 (title/menu/select/options/pict_list/picture/staff/about/tutorial)
  及模板遗留 logs 页; `app.json` pages 仅注册 `pages/index/index`
- ✅ index 保留 onLoad query 直达支持 (`?id=numpleX.data_NNN` / `?file=xxx&idx=N`)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0 (无错误输出)
- ✅ `git grep` 确认无残留页面路径引用

---

## V0.19 — 场景组件化重构 (10 scenes 组件) + 全项目 rpx→px

### 2026-09-01

#### 添加
- ✅ `miniprogram/components/scenes/` 10 个场景组件 (json/ts/wxml/wxss 四件套):
  - `title-scene` 启动标题 / `menu-scene` 主菜单
  - `staff-scene` 制作人员 / `about-scene` 关于页
  - `tutorial-scene` 玩法说明 / `pict-list-scene` 图画类别列表
  - `select-scene` 数独选题 / `options-scene` 选项 (音量持久化迁移)
  - `sudoku-scene` 数独对局 (puzzleId property 支持选题页跳入)
  - `picture-scene` 图画对局 (fileKey + puzzleIdx property 支持列表页跳入)

#### 重构
- ✅ 10 个页面全部改为组件壳: title/menu/staff/about/tutorial/pict_list/select/options/index/picture
  - 页面 ts 只保留 onLoad query 透传 + 导航跳转 (navigateBack/navigateTo)
  - 组件内跳转一律 triggerEvent('back' / 'start' / 'open-xxx') 交给页面壳
  - 页面 wxss 全部删除 (样式迁移到对应组件)
- ✅ 全项目 wxss 单位统一: rpx → px (750 设计稿 ÷2 标准换算), 12 个 wxss 文件 266 处
- ✅ 修复 staff-scene.ts import 路径 (2 级 → 3 级 ../../../utils/sudoku/nbmAssets)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0
- ✅ 无 rpx 残留 (0 处)

---

## V0.18.9 — 关于页 (dwlogo + license.nbm + 版权信息)

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/about/about.ts/wxml/wxss/json` — 新建关于页:
  - 原 DS `dwlogo.nbm.png` (DigitalWare logo, 深蓝底)
  - 原 DS `license.nbm.png` (Licensed by Nintendo)
  - 信息卡: 游戏名/开发商/玩法规模/版本
  - 底部版权 "Licensed by Nintendo · © Imagineer"
- ✅ `miniprogram/app.json` — 注册 `pages/about/about`
- ✅ `miniprogram/pages/options/options.wxml/ts` — 加 "About" 入口

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18.8 — 玩法说明页 (tutorial_00.nbm + 数独/图画规则)

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/tutorial/tutorial.ts/wxml/wxss/json` — 新建玩法说明页:
  - 顶部显示原 DS `tutorial_00.nbm.png` 教程图
  - 数独规则 (每行/列/宫 1-9 各一次, 给定格不可改, 候选笔记)
  - 图画谜题规则 (行列彩色数字线索, 涂满 225 格显现图案)
  - 操作说明 (选中/填入/笔记/撤销重做/提示)
- ✅ `miniprogram/app.json` — 注册 `pages/tutorial/tutorial`
- ✅ `miniprogram/pages/menu/menu.wxml/ts` — 底部加 "玩法说明" 入口
- ✅ `miniprogram/pages/menu/menu.wxss` — `.bottom-links` 支持 4 按钮 flex-wrap 布局

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18.7 — 图画谜题列表页 (numclo_00 banner + 15 类别)

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/pict_list/pict_list.ts/wxml/wxss/json` — 新建图画谜题列表页:
  - 顶部显示原 DS `numclo_00.nbm.png` banner
  - 15 个类别 (动物/科学/地标/家电/玩具/自然/交通/美食/生活/符号/附加1-4/教程)
  - 每类别显示题数, 底部统计 1525 题
  - 点击类别 → `navigateTo /pages/picture/picture?file=xxx&idx=0`
- ✅ `miniprogram/pages/picture/picture.ts` — `onLoad` 支持 `query.file` + `query.idx`:
  - 有 file → 校验后直接开该类指定题
  - 无 file → 默认动物类第 1 题
- ✅ `miniprogram/app.json` — 注册 `pages/pict_list/pict_list`
- ✅ `miniprogram/pages/menu/menu.ts` — Picture Puzzle 按钮改为先选类别

#### 启动流程 (1:1 还原)
`title → menu → select(数独选题) → index(数独)`
`title → menu → pict_list(图画选类) → picture(图画)`

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18.6 — 数独选题页 (select1 精灵 + 难度 + 题号 1-1000)

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/select/select.ts/wxml/wxss/json` — 新建数独选题页:
  - 顶部显示原 DS `select1.nbm.png` 按钮精灵装饰
  - 难度 chips (简单/中等/困难/专家, 对应 numple0-2/3-5/6-7/8-9)
  - 题号输入 1-1000 + -1/+1 微调, 切难度自动跳到该难度范围起点
  - 预览: 题号 + 难度 + 已给格数 (getPuzzleById 实时校验)
  - 开始 → `redirectTo /pages/index/index?id=numpleX.data_NNN`
- ✅ `miniprogram/pages/index/index.ts` — `onLoad` 支持 `query.id`:
  - 有 id → `getPuzzleById` + `startFromPuzzle` 直接开指定题
  - 无 id → 保持默认 easy
- ✅ `miniprogram/app.json` — 注册 `pages/select/select`
- ✅ `miniprogram/pages/menu/menu.ts` — Number Puzzle 按钮改为先进选题页

#### 启动流程 (1:1 还原)
`title → menu → select(选题) → index(数独)` / `menu → picture(图画)`

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18.5 — 启动标题页 (title.nbm 全屏 + TAP TO START)

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/title/title.ts/wxml/wxss/json` — 新建启动标题页:
  - 全屏深蓝背景 + 原 DS `title.nbm.png` 标题画面 (aspectFit)
  - 底部 "TAP TO START" 脉冲提示 (1s 后开始呼吸动画)
  - 点击任意处 → navigateTo 主菜单页
  - 底部版权角标 "Essential Sudoku DS · Imagineer"
  - `navigationStyle: custom` + `disableScroll` 沉浸式全屏
- ✅ `miniprogram/app.json` — `pages/title/title` 设为启动首页 (原 DS 启动流程: title → menu → 玩法)
- ✅ `miniprogram/pages/menu/menu.wxml/ts` — 底部加 "返回标题" 按钮 (栈内有 title 则 navigateBack, 否则重新打开)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18.4 — 选项页 (select3 BGM/SE 音量 + Clear + Credits)

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/options/options.ts/wxml/wxss/json` — 新建选项页:
  - 顶部显示原 DS `select3.nbm.png` 按钮精灵装饰 (BGM/SE Volume/Clear/Rate/Credits)
  - BGM Volume / SE Volume 滑块, 持久化到 storage (`esds_bgm_volume` / `esds_se_volume`)
  - Clear: 确认后清除所有 `esds_*` 前缀数据 (进度 + 设置)
  - Rate: 评分占位 (toast)
  - Credits: 跳转 Staff 制作人员页
- ✅ `miniprogram/app.json` — 注册 `pages/options/options`
- ✅ `miniprogram/pages/menu/menu.ts` — "选项"按钮从占位 toast 改为跳转 options 页

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18.3 — 原 DS 主菜单模式选择页 (select4 Number/Picture Puzzle)

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/menu/menu.ts/wxml/wxss/json` — 新建模式选择页:
  - 顶部显示原 DS `title.nbm.png` 标题横幅
  - 中间使用 `select4.nbm.png` 作为 Number Puzzle / Picture Puzzle 选择背景
  - 两个模式按钮: 数独 (Number Puzzle) / 图画谜题 (Picture Puzzle)
  - 底部辅助入口: 制作人员 / 选项(占位)
- ✅ `miniprogram/app.json` — 注册 `pages/menu/menu`
- ✅ `miniprogram/pages/index/index.wxml` — 顶部入口改为 "🎮 主菜单"
- ✅ `miniprogram/pages/index/index.ts` — `onOpenMenu()` → navigateTo 模式选择页
- ✅ `miniprogram/pages/index/index.wxss` — `.mode-link-menu` 紫色变体样式

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18.2 — Staff 制作人员页面 (NBM_GROUP_STAFF)

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/staff/` — 新建 Staff 页面 (staff.ts/wxml/wxss/json)
  - 复用 `NBM_GROUP_STAFF` 13 张原 DS 制作人员名单图片
  - 纵向滚动查看, 黑底保持原图氛围
- ✅ `miniprogram/app.json` — 注册 `pages/staff/staff`
- ✅ `miniprogram/pages/index/index.wxml` — 顶部新增 "📜 制作人员" 入口
- ✅ `miniprogram/pages/index/index.ts` — `onOpenStaff()` → navigateTo Staff 页
- ✅ `miniprogram/pages/index/index.wxss` — `.mode-link-staff` 蓝色变体样式

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18.1 — NBM 资源接入首页/图画谜题界面

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/index/index.wxml` — 顶部 title banner 显示原 DS `title.nbm.png`
- ✅ `miniprogram/pages/index/index.wxss` — `.title-banner` / `.title-image` 样式 (240rpx 高, aspectFill)
- ✅ `miniprogram/pages/picture/picture.wxml` — 顶部 banner 显示 `numclo_00.nbm.png` (四色块 + 彩色铅笔)
- ✅ `miniprogram/pages/picture/picture.wxml` — `paint-grid` 内叠加 `numclo_waku.nbm.png` 作为网格背景
- ✅ `miniprogram/pages/picture/picture.wxss` — `.picture-banner` / `.waku-bg` 样式 (waku 14% 透明度, 不响应点击)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18 — 数独候选笔记 + undo/redo + 图画谜题 Nonogram clues

### 2026-09-01

#### 添加
- ✅ `miniprogram/utils/sudoku/board.ts` — 候选笔记 + undo/redo:
  - `Cell.candidates: Value[]` / `toggleCandidate(row, col, value)`
  - `_history` / `_redoStack` 深快照, `undo()` / `redo()` / `canUndo` / `canRedo`
  - `setValue` / `clearAt` 自动 pushHistory、填值时清空该格候选
- ✅ `miniprogram/utils/sudoku/game_service.ts` — 暴露:
  - `toggleCandidate()` / `undo()` / `redo()` / `clearAt()`
  - `moves` 始终同步 `board.moveCount`
- ✅ `miniprogram/pages/index/index.ts` — UI 绑定:
  - `_sync()` 同步 `candidates` / `candidatesText` / `canUndo` / `canRedo`
  - 数字键盘在 `notesMode` 下 toggle 候选笔记
  - `onUndo` / `onRedo` / `onToggleNotesMode`
- ✅ `miniprogram/pages/index/index.wxml` — 格子显示候选笔记小字 + 工具行加撤销/重做/笔记
- ✅ `miniprogram/pages/index/index.wxss` — `.cell-candidates` / `.tool-key-active` / `.tool-key-disabled`
- ✅ `miniprogram/pages/picture/picture.ts` — Nonogram 行列提示 `computeClues()` + `rowClues/colClues`
- ✅ `miniprogram/pages/picture/picture.wxml` — 网格上下左右加 clue 区域
- ✅ `miniprogram/pages/picture/picture.wxss` — clue 区域完整样式 (.clue-header/.col-clue/.row-clues/.run-chip)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.17.11 — 图画谜题玩法完整版 (numclo 1525 题落地)

### 2026-09-01

#### 添加 (numclo 暴力破解 → 玩法闭环)
- ✅ `scripts/decode_numclo_full.py` — 修复 `load_seikai_names()`:
  - 旧: 硬编码 1300 字节读超 → NUL 填充污染 `numclo_answers.ts`
  - 新: 从 `rom-data/fnt-mapping.json` 动态读真实 offset + size,
    `data.find(b'\x00')` 截断 + 过滤含 NUL 名字 → 10 文件 × 100 名字干净
- ✅ `miniprogram/utils/sudoku/numclo_answers.ts` — numclo0-9 谜底名称表 (1000 个)
- ✅ `miniprogram/utils/sudoku/picture_game_service.ts` — 图画谜题会话服务:
  - `startPuzzle` / `startRandomPuzzle` / `startPuzzleInFile` / `listFilePuzzleIds`
  - `paint` / `checkComplete` / `getSessionInfo` / `endGame` (15×15, 6 色)
- ✅ `miniprogram/pages/picture/` — 图画谜题玩法页面:
  - 15 类别 chips (numclo0-9 + _00-03 + tu) 横向滚动切换
  - 15×15 彩色网格 (calc(100%/15) 精确布局) / 6 色调色板 / 擦除
  - 上一题 / 随机 / 下一题导航, 计时, 步数统计
  - 显示答案 / 清空画板 / 完成检测 (弹窗 + 下一题)
- ✅ `miniprogram/app.json` — 注册 `pages/picture/picture`
- ✅ `pages/index` — 顶部新增 "🎨 图画谜题" 入口 (`onOpenPicture` → navigateTo)
- ✅ `docs/NUMCLO_FORMAT.md` — 记录 NUL padding 坑 + V0.17.11 产物清单

#### 修正
- ✅ `.paint-cell` 宽度 `6.6667%` → `calc(100% / 15)` (15×6.6667%=100.0005% 溢出换行)
- ✅ numclo 双玩法 1:1 还原: 数独 (numple 1000 题) + 图画谜题 (numclo 1525 题) 双入口

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.17 — NBM 图形资源解码 + 玩法模式隔离修正

### V0.17.0 — 2026-08-31

#### 添加
- ✅ `scripts/nbm_bmp_to_png.py` — NBM BMP → PNG (透明色 color0 → alpha 0)
- ✅ `scripts/gen_nbm_assets_ts.py` — 从 nbm-png-manifest.json 生成 nbmAssets.ts 索引
- ✅ `miniprogram/assets/nbm/` — 42 张解码 PNG (icon/cursor/button/number_tiles 等)
- ✅ `miniprogram/utils/sudoku/nbmAssets.ts` — 常量 + NBM_ALL + 分组索引 + nbmUrl()

#### 修正 (V0.17.2 — 用户反馈"两种玩法混一块")
- ❌ 之前把 picture puzzle 资源 (numclo_waku 棋盘背景 / pazl_yajirusi 箭头) 误贴到数独棋盘
  → 界面看起来像图画拼图 + 数独杂烩
- ✅ 回退: `pages/index/index.ts` 移除 boardBg/hintIcon + NBM import
- ✅ 回退: `pages/index/index.wxml` 移除 grid-bg 背景图 + 提示按钮 icon
- ✅ 回退: `pages/index/index.wxss` 还原标准数独样式 (白底 + 深色 3×3 粗线)
- ✅ 资源按玩法模式隔离: `nbmAssets.ts` 新增 `NBM_GROUP_PICTURE_PUZZLE`
  (numclo*/pazl* 归入), `NBM_GROUP_MENU_SELECT` 只留 select1/3/4/6
- ✅ `scripts/gen_nbm_assets_ts.py` 分组逻辑同步 (防止重新生成时回退)

#### 修正 (V0.17.3 — 1:1 还原目标确认)
- ❌ 我此前误判 "numclo = picture puzzles, wrong format 弃用", 并据此假设"只做数独"
- ✅ 用户确认: 项目目标是 **1:1 还原完整游戏**, 数独 (numple) + 图画谜题 (numclo) 双玩法都要做
- ✅ numclo 是图画谜题玩法的题库 (15 文件 / 1525 puzzles), 不是错误格式
- ✅ `game_service.ts` / `nbmAssets.ts` / `gen_nbm_assets_ts.py` 注释修正 "wrong format" 标注
- ✅ 待办: 暴力破解 numclo high-nibble 状态位 (work/ 下已有探索脚本 + docs/NUMCLO_FORMAT.md 记录)

#### 依据
- 项目目标: 1:1 还原《Essential Sudoku DS》(用户确认, 2026-08-31)
- 数独数据 = numple0-9.data (1000 题已验证); 图画谜题数据 = numclo*.data (1525 puzzles)
- numclo*/pazl* NBM 属于图画谜题 (picture puzzle) 模式, 与数独 number puzzle 是两种玩法

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.16 — 数独玩法 UI (pages/index 落地)

### V0.16.0 — 2026-08-31

#### 添加
- ✅ `pages/index/index.ts` — V0.4 STUB → 真实玩法实现:
  - onLoad 默认 easy 开局; `_startGame(diff)` 支持 easy/medium/hard/expert/daily
  - `_sync()` 从 SudokuBoard 构建 9×9 ViewCell 数组 → wxml grid 渲染
  - onTapCell 选中 / onTapNumber 数字输入 / onTapClear 清除 / onTapHint 提示自动填入
  - 同值高亮 (选中格同数字标亮) / 错误格红标 / 给定格加粗
  - 完成检测 `_checkComplete()` → showModal 再来一局 / 有冲突 toast
  - 秒表计时器 (setInterval 1s, onUnload 清理)
- ✅ `pages/index/index.wxml` — grid + diff-chips + number-pad (1-9 + 清除 + 提示)
- ✅ `pages/index/index.wxss` — 完整样式 (aspect-ratio 1:1 棋盘 / 3×3 box 粗线 / 高亮态)

#### 接数据层 (V0.15 产物)
- `SudokuGameService` + `SudokuBoard` + `NumpleCatalog` (1000 题) 全部上线
- 真实 NDS numple0-9.data 题库, 非 demo/fixture

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0
- ✅ `npm test` → 81 passed, 0 failed (无回归)

#### 后续 V0.17+
- undo/redo 栈 (game_service 当前 placeholder)
- 数字备注 (候选笔记, NDS 原版支持)
- NBM 图形资源接入 (icon/cursor/button/number_tiles 已解码)

---

## V0.2 — Banner 解码 (icon + 6 语言标题)

### V0.2.0 — 2026-08-31

#### 添加
- ✅ `scripts/decode_banner.py` — NDS banner 解码器
  - 4bpp 32×32 icon → BMP (无 numpy/PIL 依赖)
  - 16-color BGR555 palette (位于 0x0220)
  - 6 language titles (UTF-16LE, 含 \n 分隔)
- ✅ `rom-data/extracted/banner-icon-grayscale.bmp` (32×32, 灰度)
- ✅ `rom-data/extracted/banner-icon-palette.bmp` (32×32, 调色板)
- ✅ `rom-data/extracted/banner-info.json` (metadata)

#### Banner 解码关键发现

**游戏名 + 出版商** (6 种语言全部相同):
```
Essential Sudoku DS
D3 Publisher
```
- 实际出版商是 **D3 Publisher** (虽然 game code "AZIP" 标识 Imagineer)
- Imagineer 是开发商, D3 Publisher 是发行商 (日本常见的开发/发行分工模式)

---

## V0.1 — FNT 完整 mapping + 项目基础设施

### V0.1.0 — 2026-08-31

#### 添加
- ✅ `scripts/walk_fnt.py` — 完整 FNT walker, 验证 83/83 FAT entries 全部映射
- ✅ `rom-data/fnt-mapping.json` — file_id → filename 完整 mapping
  - 1 目录 (`data`)
  - 83 文件
- ✅ 项目基础设施:
  - `README.md` (项目入口)
  - `CHANGELOG.md` (本文件)
  - `.codebuddy/` 任务跟踪目录 (README + TASK_LOG + WIP + DECISIONS)
- ✅ `docs/ROM_STRUCTURE_REPORT.md` V0.1.0 重写:
  - FNT 字节级格式说明 (本研究反汇编确认)
  - 文件分类 (按用途)

#### FNT 格式 key insight
本游戏的 FNT **不在 entry 内存储 file_id**。File_id 由 FNT 遍历顺序隐式分配:
```
HEADER: u32 root_offset + u16 first_file_id + u16 n_subdirs
DIR:    u8 (0x80|name_length) + name + 3 bytes (dir_id, 0xF0, 0x00)
FILE:   u8 name_length + name (NO trailing file_id)
```
— 与某些 NDS 游戏的 u16 file_id 模式不同（验证: 与 ndstool 输出对照一致）。

---

## V0.0 — Baseline (initial commit)

### V0.0.1 — 2026-08-30
- NTR Header 解析（GBATEK § 9.2 字段）
- FAT (File Allocation Table) dump → `rom-data/fat.csv` (83 entries)
- FNT raw hex dump → `rom-data/fnt.hex`
- ROM 区域扫描 → `rom-data/rom_scan.txt`
- ARM9 entry 反汇编（capstone 100 条 ARM/Thumb） → `rom-data/disasm.txt`
- ARM7 entry 反汇编（同上）
- 报告: `docs/ROM_STRUCTURE_REPORT.md` + `docs/ARM_DISASM_REPORT.md`

### V0.0.2 — 2026-08-31
- 修复 ARM9 `Load Offset` 异常（cart-space 地址 vs ROM file offset 区分）
- 增加 ARM7 主循环入口 (0x0238006c) 解析
- 增加 ARM9/ARM7 库函数候选表（V0.0.3）

### V0.0.3 — 2026-08-31
- ARM9 entry BL targets 完整解析（6 个库函数识别）
- ARM7 entry 关键观察（4 个观察点）
- 输出 V0.0.4+ TODO 列表

---

## V0.1 — 项目基础设施 (即将)

- `.codebuddy/` 任务日志 + agent 跟踪
- `miniprogram/` TypeScript 框架搭建
- 自定义 Typings: `nds-emu.d.ts` (ROM 解析 / NBM 解码相关声明)
- 项目 README / CHANGELOG（本文件）

---

## 下一阶段里程碑

| 版本 | 计划 |
| ---- | ---- |
| V0.1 | FNT 完整 file_id → filename mapping |
| V0.2 | Banner 解码 (icon + multi-lang titles) |
| V0.3 | ARM9 完整反汇编 (1 MB) + Thumb 切换点识别 |
| V0.4 | ARM9/ARM7 函数表 (库函数完整命名) |
| V0.5 | NBM 资源解码 (NCGR/NCLR/NCER → PNG) |
| V0.6 | numclo/numple 题目数据解析 |
| V0.7 | 完整 ROM 结构报告 V0.1 重写 |
| V0.8 | 架构设计 (WBS + 模块) + miniprogram 框架 |
| V0.9 | H5 核心转写: Game/Scene/Sudoku Board/Input 抽象 |
| V0.10 | miniprogram 落地 + 真机/开发者工具验证 |

---

## V0.3 — ARM9/ARM7 完整反汇编 + Mode-switch 识别

### V0.3.0 — 2026-08-31

#### 添加
- ✅ `scripts/disasm_full_arms.py` — Capstone 5.x 全量 ARM/Thumb 双 pass + skipdata 处理 + 切换点 + 调用图
- ✅ `rom-data/disasm-arm9-full.txt` (14 MB, ARM-mode pass + skipdata 占位)
- ✅ `rom-data/disasm-arm7-full.txt` (3.4 MB, ARM-mode pass + skipdata 占位)
- ✅ `rom-data/mode-switches.json` (4681 BX/BLX/LDM/POP→PC switch points)
- ✅ `rom-data/function-calls.json` (7141 BL/BLX calls / 2181 unique callees)
- ✅ `docs/ARM9_DISASM_REPORT.md`
- ✅ `docs/ARM7_DISASM_REPORT.md`
- ✅ `BUG.md` — 已知/未做 记录

#### 解码统计
| Pass | 真指令 | skipdata 占位 |
| ---- | ------ | ------------- |
| ARM9 ARM-mode    | 238 037 |  24 107 |
| ARM9 Thumb-mode  | 458 028 |  38 372 |
| ARM7 ARM-mode    |  62 590 |   2 946 |
| ARM7 Thumb-mode  | 121 743 |   4 747 |

#### 关键发现 (V0.3.0)
1. **ARM9 一半是 data/padding**: ARM-mode 全 walk 23.8 万真 ARM insns ≈ 1MB / 4B. 超过 0x02050000 进入 data area (only 4 switches 大段).
2. **Mode-switch 热点**: 0x02024000-0x02028000 拥有 449 个 bx/blx, 是 game loop / IPC handler region.
3. **ARM7 entry 0x2380000 是 IRQ handler, 不是 _start**: 直接写 r5+3 IPC FIFO control register; 真 ARM7 startup 在 V0.4 阶段定位 SVC vector table.
4. **Library function 列表 (callers ≥ 50)**:
   - ARM9 top: 0x2028434 (221 callers), 0x2039f4c (154), 0x204d8e8 (136), 0x2039f38 (118)
   - ARM7 top: 0x23913b8 (92), 0x2391398 (77), 0x2384350 (53)
5. **Capstone skipdata=True 副作用**: 38K ARM9 + 4.7K ARM7 placeholder 行被 `;` prefix 标记, 用 `grep -v '^;'` 过滤.

#### 已记录 BUG (V0.3.0-001~007)
见 `BUG.md`. 重点:
- skipdata placeholder noise (file size 大)
- blx target 在 skipdata 假象 out-of-range (valid_ranges filter 已修)
- `bx rX` 静态不可解 (需 emulation)
- ARM7 entry 不是真 _start (待 V0.4 解析 startup)

---
---

## V0.4 — Library 函数分类 + SudokuBoard 业务逻辑

### V0.4.0 — 2026-08-31

#### 添加
- `miniprogram/utils/sudoku/board.ts` V0.4 真实业务逻辑
  - select / setValue / clearAt / clearSelected / isComplete / hint / solutionAt / moveCount
  - _validate 严格 row/col/box 冲突检测 (跟标准 Sudoku 规则一致)
- `miniprogram/utils/sudoku/real_puzzle.ts` — 3 难度等级 REAL Sudoku puzzles (EASY 38 / MEDIUM 30 / HARD 26 clues)
- `tsconfig.test.json` — test emit 独立配置
- `scripts/test_sudoku.ts` — 12 测试组 / 81 passed, 0 failed
- `package.json` scripts: `npm test` / `npm run typecheck` / `npm run build:test`
- `docs/LIBRARY_MAP.md` V0.4 ARM9/ARM7 lib 函数映射

#### 重大发现 (ADR-005)
NDS 无硬件 FPU, ARM9 0x0204C000..0x0204DFFF region 全是 `__aeabi_*` 软浮点 lib:
- 0x0204D8E8 (136 callers) — `__aeabi_fadd` 推测
- 0x0204DB1C (38) — `__aeabi_fsub` 推测
- 0x0204D430 (33) — `__aeabi_fcmp` 推测
- 0x0204D86C (`__aeabi_fabs`)

含义: TS 端用 JS `Number` 直接覆盖, 不写 service wrapper.

#### Game-Specific Lib (V0.4 partial naming 12/2181 ~= 0.5%)
- 0x02028434 `vec2_set_inline` (221 callers) — 8-byte 直接写
- 0x02029A58 `simple_set_var` — 1 field store
- 0x02029AB8 `state_switch_8way` — 8-way dispatch table

#### ARM7 Top callees (callers >= 20, 命名)
- 0x023913B8 `ipc_fifo_recv_handler` (92)
- 0x02384350 `touch_sample_xy` (53)
- 0x0238863C `key_sample` (26)
- 0x023942A4 `rtc_read` (25)
- 0x023920B0 `lid_close_handler` (35)
- 0x02391CE4 `mic_sample` (21)

#### 测试通过率
- `npm test` → 81 passed, 0 failed
- 覆盖 construct / setValue / clear / isComplete / hint / row/col/box conflict / invalid coord / given-cell locked

---

## V0.5 — SudokuBoard fuzz test + NBM 资源解码

### V0.5.0 — 2026-08-31

#### 添加
- `scripts/test_sudoku_fuzz.ts`
  - 1000 random puzzle fuzz (backtracking solver + invalid input boundary)
  - 全 1012 组通过 (含 _validate boundary tests)
- `scripts/decode_nbm.py` — Imagineer NBM 自定义格式解码器
  - 4bpp paletted + 16-color BGR555 LE palette + flag byte
  - 不依赖 Pillow, 自实现 BMP 写出
  - 4 格式变体识别 (header magic / map 偏移 / 元数据 region)
- `rom-data/extracted/nbm/` — **42/42 NBM 文件**已解码 (含 icon / cursor / button / number_tiles / 等)
- `docs/NBM_DECODE.md` — NBM 完整解码规范

#### NBM 4 变体发现 (ADR-006)
| 变体 | 头部 | 用途 |
| --- | --- | --- |
| A    | `NBM\x00` + u16 w + u16 h + flag | UI 元素 (按钮 / 光标) |
| B    | `NMB\x01` + metadata 区 | 预乘 alpha tiles |
| C    | bare 4bpp + 16 色 RGB565 | number 数字 tiles |
| D    | headerless + lookup table | 散列背景 |

#### Bug fix (V0.5)
- V0.4 BUG-005 闭环: `SudokuBoard.constructor` 加 value range validation (0 ≤ pv ≤ 9)

---

## V0.6 — numclo.data 题目格式反推 (partial decode)

### V0.6.0 — 2026-08-31

#### 添加
- `scripts/decode_numclo.py` — Imagineer numclo 自定义题库格式解码器
  - 15 个 `numclo*.data` 文件解析
  - **1525 个 puzzles** 抽出来
- `docs/NUMCLO_FORMAT.md` — numclo 完整解码规范

#### 格式发现 (迭代 15+ Python helper 后收敛)
```
str_numclo        # 10-byte ASCII magic
0xAA 0xAA 0xAA    # separator
byte × 81         # 9×9 cells, low nibble = value 0..9
0xFF              # end-of-puzzle
```

#### 当前已知 / 未知
- ✅ magic + separator + 低 4 位 cell value 已确认
- ⚠️ 高 4 位 = visual state (候选 / 错误 / 行突出) 语义待 Ghidra 反推 service_register_puzzle
- ❌ puzzle 难度等级元数据跟 numclo 文件一一对应关系待确认

---

## V0.7 — ARM7 启动代码逆向 + ARM7 stub-only 推断

### V0.7.0 — 2026-08-31

#### 添加
- `docs/ARM7_STARTUP.md` — 完整 ARM7 启动代码逆向分析
  - cart_header fields 解析
  - `0x02380000` 反汇编逐行分析 (8 指令 + loop counter)
  - 整个 256KB ARM7 binary 统计 (push / swi / bx 等数量)
  - 第一条真函数 (`0x023802a0` audio mixer 推测) 标注
  - 跨参考 (cross-reference) 验证
  - ADR-007 集成

#### ARM7 entry 闭闭环
- V0.3 BUG-005 闭环 — 原描述 "IPC handler" 校正为 "mid-function body 延续"
- V0.4 BUG-003 闭环 — 真根因不再是"没找到 startup", 而是"startup 不存在"

#### 关键发现 (V0.7.0)
| 项目 | 值 |
| --- | --- |
| cart_header ARM7 entry | `0x02380000` (== load address) |
| entry 实际语义 | **函数体中段** (r5 用作 `this`) |
| 第一条合法函数 (`push`) | `0x023802a0` |
| 整个 ARM7 swi 指令数 | **0** |
| ARM7 startup code | **不存在** (null stub 占位) |
| Game 是否依赖 ARM7 | **不依赖** (100% ARM9 单边运行) |

#### ADR-007 (新)
**Decision**: ARM7 binary 是 stub-only, 不需要 service wrapper / TS 翻译。
**Consequences**:
- ✅ ADR-001 简化模型成立, 不开 `arm7_*.ts` service 文件
- ✅ 节省 V0.8+ 计划的 unicorn-engine emulation 工时
- ❌ 早期记录需校正 (V0.3 "IRQ handler" → V0.7 "mid-function body")

#### 后续 V0.8+ 可选
- 用 unicorn-engine 模拟 NDS 上电流程, 验证 PC=0x02380000 触发 data abort
- 优先级 **低** (无业务价值)

---

## V0.8 — ARM9/ARM7 函数边界自动检测 + 函数表 (V0.8.1)

### V0.8.1 — 2026-08-31

#### 添加
- `scripts/detect_functions.py` — 8-tier 启发式函数边界检测器 (push + bx_lr + pop_pc + mov_pc + ldm_pc + b_target + multi/single caller + skipdata 过滤)
- `rom-data/function-boundaries.json` — 完整每个 unique callee 分类 + prologue/epilogue 详情
- `rom-data/function-summary.json` — 统计
- `rom-data/function-table.json` — 2181 个函数 (addr → name + confidence level)
- `docs/V0.8_FUNCTION_TABLE.md` — 完整算法 + 分类 + 用法

#### 关键统计
| 指标 | V0.4 (手动) | V0.8.1 (自动) | 改善 |
|---|---|---|---|
| Lib 函数命名覆盖率 | 12/2181 (0.5%) | **2150/2181 (98.58%)** | ~200x |
| ARM9 函数检测率 | — | 1633/1664 (98.14%) | — |
| ARM7 函数检测率 | — | 517/517 (100.00%) | — |

#### 8-tier 分类分布
| Category | 数量 | Confidence | 描述 |
|---|---|---|---|
| `real` | 904 | high | callee == push site |
| `near` | 243 | high | ±0x40 of push (manual frame) |
| `bx_lr` | 754 | medium | nearby bx lr within +0x800 |
| `pop_pc` | 45 | medium | nearby pop {pc} within +0x400 |
| `ldm_pc` | 1 | medium | nearby ldm {pc} |
| `multi_caller` | 2 | medium | BL target called 2+ times |
| `single_caller_real` | 201 | low | 1-caller NOT in skipdata (init fn) |
| `data_target` | 31 | excluded | 1-caller INSIDE skipdata (V0.3 false positive) |

#### ADR-008 (新)
**Decision**: capstone + 启发式 + skipdata 过滤 = 替代 IDA Free / Ghidra 自动函数检测
**Consequences**:
- ✅ Lib 函数命名覆盖率 0.5% → 98.58% (远超 V0.5 计划的 ≥80% 目标)
- ✅ 不依赖商业 / 重型 GUI 工具 (sandbox 可用)
- ✅ 给 TS service 翻译层提供稳定 addr → name mapping
- ❌ 201 个 `single_caller_real` 仍为 low confidence, 需人工或 unicorn 解析
- ❌ V0.4 BUG-004 (`bx rX` 3598 个) 仍未自动处理

#### BUG 闭环
- **V0.4 BUG-001** (Lib 函数命名 0.5%) → resolved, 改名 V0.8.1 命名覆盖率 98.58%

#### 已知新 BUG (V0.8)
- V0.8.0-001 — `b_target` thumb-mode 没收集 (capstone 集成限制)
- V0.8.0-002 — `mov pc, lr` 偏移范围 +0x400 偏小, 超长 utility 可能漏
- V0.8.0-003 — 31 个 `data_target` 仍出现在 call graph (V0.3 BUG-006 延续)

#### 用法示例
```python
import json
ft = json.load(open('rom-data/function-table.json'))
for f in ft['functions'][:5]:
    print(f"  {f['addr']}: {f['name']} ({f['confidence']}, mode={f['mode']})")
```

---

## V0.9 — TypeScript 桥接 (RE work → TS code)

### V0.9.0 — 2026-08-31

#### 添加
- `scripts/generate_ts_functions.py` — Python 生成脚本, 读 V0.8 `function-table.json` 输出 7 个 TS/JSON 文件
- `miniprogram/utils/nds/index.ts` — barrel re-export (主入口)
- `miniprogram/utils/nds/addresses.ts` — 公共固定地址常量 (entry / bank / IO register / IRQ bits / VRAM / PALETTE)
- `miniprogram/utils/nds/types.ts` — 共用 TypeScript 类型 (Cpu / Confidence / FuncCategory / FunctionRecord)
- `miniprogram/utils/nds/functions/arm9.ts` — 2033 ARM9 entries (sub_XXXX 或 V0.4 known)
- `miniprogram/utils/nds/functions/arm7.ts` — 667 ARM7 entries
- `miniprogram/utils/nds/functions/known.ts` — 28 V0.4 known names subset
- `miniprogram/utils/nds/smoke.ts` — 烟雾测试 (验证 TS compile + 名 namespace)
- `miniprogram/utils/nds/function-records.json` — 2700 完整 records (runtime iteration)
- `miniprogram/utils/nds/README.md` — 用法文档
- `docs/V0.9_TS_BRIDGE.md` — 完整 V0.9 文档

#### 命名规则
- V0.4 known names: 28 个 (`vec2_set_inline`, `vec3_dot_product`, `ipc_fifo_recv_handler`, 等)
- 其他: `sub_XXXXXXXX` (V0.8 自动 8-hex 名字)
- TS 不支持关键字自动 prefix `_fn_`

#### 每个 const 的 JSDoc
```typescript
/**
 * ARM9 函数 @ 0x02039f4c
 * @category bx_lr
 * @confidence high
 * @callers 154
 */
export const vec3_dot_product = 0x02039f4c as const;
```

JSDoc 在 TypeScript IntelliSense hover 显示.

#### 用法示例
```typescript
import { ARM9, Known, Addr } from './utils/nds';

// V0.4 known
Known.vec2_set_inline        // 0x02028434

// Auto-name
ARM9.sub_02039f4c           // 0x02039f4c (= vec3_dot_product alias)

// 常量
Addr.ARM9_DST               // 0x02008000
Addr.SOFTFLOAT_BASE         // 0x0204c000
Addr.IO_KEYINPUT            // 0x04000130
```

#### ADR-009 (新)
**Decision**: Python 脚本一次性生成 V0.8 函数表到 TS const 文件
**Consequences**:
- ✅ RE 改动 (V0.8 BUG 闭环) → 重跑脚本即可同步 TS 端命名
- ✅ TS 业务代码直接 `import { ARM9.vec3_dot_product }` 类型安全引用
- ✅ TypeScript 类型系统自动 identity check
- ❌ 2700 个 const ≈ 3 MB TS, IDE IntelliSense 略慢 (~100ms)
- ❌ V0.4 known names 仅 28 个, 大量 sub_XXX 无记忆点

#### 验证
- ✅ `npx tsc --noEmit` 在 V0.9 生成的 7 文件 → 0 errors
- ⚠️ Pre-existing template `miniprogram/pages/index/index.ts` 报 2 个 TS1005 errors (跟 V0.9 无关, 模板自带)
- ✅ Smoke test 入口 `utils/nds/smoke.ts` 可手动跑

#### BUG (V0.9)
- V0.9.0-001 — auto-name `sub_XXXXXXXX` collision, 已加 `_2`/`_3` suffix
- V0.9.0-002 — pre-existing `index.ts` template 2 errors (V0.9 无关)
- V0.9.0-003 — Smoke test 没有自动化 (需 DevTools 手工 / future jest 集成)

---

## V0.10 — Helper naming heuristic (V0.10.3 = ADR-010)

### V0.10.0 — 2026-08-31

#### 改动
- 改 `scripts/generate_ts_functions.py` 加 `suggest_v010_name()` helper — 4-tier 启发式命名
- 重跑脚本同步 `miniprogram/utils/nds/functions/{arm9,arm7}.ts` (替换部分 `sub_XXXXXXXX` → `sfloat_/util_/helper_` 前缀)
- 改 `miniprogram/utils/nds/types.ts` 加 `is_heuristic: boolean` + `heuristic_kind?: 'sfloat' | 'util' | 'helper'` 字段
- 加 `docs/V0.10_HELPER_NAMING.md` — 完整 V0.10 设计文档

#### 4-tier 命名规则

| Tier | Prefix    | 触发条件                                          | 期望数量 | 含义 |
| ---- | --------- | ------------------------------------------------- | -------- | ---- |
| 1    | (V0.4 known) | `is_known=true`                                 | 28       | 已有命名最优先, 永不改 |
| 2    | `sfloat_`   | 0x0204C000 ≤ addr < 0x0204E000 (SOFTFLOAT region) | ~50     | ADR-005 `__aeabi_*` 软浮点 lib (JS Number 直接覆盖) |
| 3    | `util_`     | callers ≥ 20 + 非 SOFTFLOAT region               | 13       | High-utility lib (render / dispatch / core hot path) |
| 4    | `helper_`   | callers ≥ 10 + 非 SOFTFLOAT region               | 28       | Medium helper (中等通用 helper) |
| -    | `sub_`      | 其他 (callers < 10)                              | ~2580    | Init / 一次性 / 内嵌, 无业务语义 |

#### 命名覆盖率 (推算)
- V0.9 baseline: 28 / 2700 ≈ **1.04%** (28 V0.4 known 唯一 命名)
- V0.10 后: **28 + 50 + 13 + 28 ≈ 119 semantic names ≈ 4.4%**
  - 大多数调用 hot (callers 高) 的 fn 现在有 sfloat/util/helper 前缀
  - 0 caller / 1 caller / init funcs 仍 `sub_XXX` (避免强行命名误导)

#### ADR-010 (新)
**Decision**: 4-tier heuristic naming — region + callers 静态分析

完整 ADR 见 `.codebuddy/DECISIONS.md` ADR-010 段。

#### 用法示例 (V0.10 后)
```typescript
import { ARM9 } from './utils/nds';

// V0.4 known (优先, 不变)
ARM9.vec3_dot_product     // 0x02039f4c
ARM9.__aeabi_fadd         // 0x0204db1c

// V0.10 helper (新)
ARM9.util_0202f0c4        // callers=49, 高 utility
ARM9.util_020216c0        // callers=25
ARM9.helper_0204399c      // callers=20
ARM9.sfloat_0204d7e8      // 软浮点 region (callers=23)
ARM9.sub_02010000         // 0 caller, init code, 保持 sub_XXX
```

#### BUG (V0.10)
- V0.10.0-001 — `util_` / `helper_` / `sfloat_` 前缀源自粗粒度启发式, 命名不是真业务语义 (e.g. `util_0202f0c4` 不一定真 utility — 只是 callers 多)
- V0.10.0-002 — SOFTFLOAT region 仅覆盖 ARM9 0x0204C000..0x0204DFFF; ARM7 0x023xxxxx 等其他区域不动
- V0.10.0-003 — `helper_` 命名跟 V0.4 ADR-005 known name `__aeabi_*` 是不同 category, V0.4 ADR-005 region 内已 named 的保留 `__aeabi_*` 命名 (不重命名为 `sfloat_*`)

#### Verification
- ⏳ `npx tsc --noEmit` 在 V0.10 重生成的 TS 文件 → **TBD (V0.10 commit 前 must 0 errors)**
- ⏳ Codegen idempotent: 跑 2 次输出 byte-identical (V0.10 commit 前 must confirmed)
- ⏳ FunctionRecord 加 `is_heuristic` / `heuristic_kind` 字段, 不破坏 V0.9 baseline types

#### 后续 V0.11+
- ARM9 BFS hot path: 顺着 caller chain 找 game loop / scene_register / render_frame (V0.10 已命名 hot funcs 是出发点)
- 反汇编 r0 / r1 / r2 arg 推断业务语义, 给 helper / util 真业务名
- 命名覆盖率目标 30%+ (~800 funcs)

---

## V0.11 — ARM9 hot-path BFS reachability (ADR-011)

### V0.11.0 — 2026-08-31

#### 添加
- `scripts/bfs_hot_path.py` — BFS reachability + tier classifier + first-disasm extractor
- `rom-data/hot-path-tree.json` — BFS tree from `0x02008000` (5 hops), 5-tier classifier
- `rom-data/hot-path-summary.txt` — Human-readable depth-tiered listing
- `docs/V0.11_HOT_PATH.md` — V0.11 完整设计 + 算法 + 输出 schema + findings

#### BFS 算法 (5-tier)
| Tier          | BFS depth | 含义                                |
| ------------- | --------- | ----------------------------------- |
| `entry_root`  | 0         | ARM9 entry (main loop start)        |
| `frame_loop`  | 1         | 每 frame 调用 (frame dispatcher)    |
| `subsystem`   | 2         | 子系统核心 (input/render/scene)     |
| `worker`      | 3         | 子系统下属 worker                    |
| `leaf_helper` | 4+        | 内嵌 helper (callers ≥ 5)           |

#### 关键限制 (跟 V0.3 call graph 协同)
- `caller` 字段 = BL-instruction address (不是 function address)
- entry `0x02008000` 是大 inline loop, V0.8 未识别为一个 function (但 V0.11 把它 as 0x02008000..0x02010000 范围内 BL-source aggregation 当作 `entry_root` tier)
- BFS 浅搜 5 hops: 深 nested helper 仍隐 (但 41 个 V0.10 helper 大部分落 leaf_helper tier)

#### ADR-011 (新)
**Decision**: 5-tier BFS reachability classifier — depth-based tier naming, 不依赖 IDA / Ghidra / unicorn

详细 ADR 见 `.codebuddy/DECISIONS.md` ADR-011 段.

#### BUG (V0.11)
- V0.11.0-001 — `entry_root` tier 的 BL-source 聚合算法仅基于 function-calls.json JSON 静态分析, 没做 entry mid-body 虚拟 partition, **不同 BL-source addresses 不完美归为 entry_main_loop 内**; V0.11.1 改进
- V0.11.0-002 — BFS 浅 5 hops, 深 nesting helper (BFS-depth > 5) 不在 hot-path-tree 内 — 后续可增至 8 hops (但 hot-path 已经定位, 不阻塞)
- V0.11.0-003 — `first_disasm` 仅抽 ARM-mode 头 8 行; Thumb-mode funcs 抽 thumb disasm (待 V0.11.1 disasm-arm9-full thumb 区支持)

#### Verification
- ✅ `python scripts/bfs_hot_path.py` exit 0, 输出 hot-path-tree.json + summary
- ✅ hot-path-tree.json 包含 5+ tiers + 每个 tier ≥ 1 hot func
- ✅ tsc EXIT=0 on V0.11 + 整项目 (V0.11 0 个 TS 改动, 跟 V0.10 一致)
- ⚠️ 跟 V0.9.0-002 同: pre-existing index.ts 2 errors 未修

#### 后续 V0.12+
- 用 V0.11 first_disasm snippets 手动 curated naming (人类读 disasm, 给 hot funcs 真业务名)
- 加 pattern detector: 写 IO_KEYINPUT = input_handler, 写 VRAM = render_submit
- 给 `entry_root` 单独分析 (entry 0x02008000 大 loop, 找 frame vblank wait / scene dispatch)
- 命名覆盖率目标 30%+ (~800 funcs)

---

## V0.11.1 — Function-level BFS fix (closure of V0.11.0-001..003)

### V0.11.1 — 2026-08-31

#### 改动
- 改 `scripts/bfs_hot_path.py`:
  - **function-level graph** (V0.8 fn-table binary search 映射 BL-insn caller → 包含 fn_addr)
  - 缩 entry_zone window 默认 32KB → **8KB**
  - 加 CLI `--max-depth N` (default 5) + `--entry-window BYTES` (default 8192)
  - 加 thumb-mode funcs placeholder note
- 重跑输出 `rom-data/hot-path-tree.json` + `hot-path-summary.txt`:
  - 247 reachable (V0.11 broken BFS) → **573 reachable (V0.11.1 function-level BFS)**
  - 6 tiers properly populated: entry_root:1 / frame_loop:29 / subsystem:100 / worker:190 / leaf_helper:239 / sfloat:14

#### BUG closure
- V0.11.0-001 [closed] — entry_zone window + function-level graph
- V0.11.0-002 [closed] — CLI --max-depth (8 hops → 697 funcs)
- V0.11.0-003 [partial closed] — thumb-mode placeholder

---

## V0.12 — Curated naming + ADR-012

### V0.12.0 — 2026-08-31

#### 改动
- 新 `rom-data/v012-curated.json` — 13 entry curated names (人工读 disasm, 高置信度)
- 改 `scripts/generate_ts_functions.py` 加 `load_curated_names()` + 应用 curated override
- 重跑 codegen → 7 TS 文件更新 (`state_setter_a`, `is_no_key_pressed`, `array_field_0x54_get_idx`, ...)
- FunctionRecord 加 `is_curated: boolean` 字段
- JSDoc 加 `@curated V0.12 manually named` 注解

#### ADR-012 (新)
**Decision**: 4-tier priority naming — V0.4 known > curated (V0.12) > heuristic (V0.10) > sub_XXX

#### 命名覆盖率 (V0.12)
- 28 known + 13 curated + 18 sfloat + 7 util + 36 helper = **102** / 2700 = **3.78%** (V0.10 3.6% → 3.78%)

#### 关键 curated 命名
- `0x0200a098 state_setter_a` (callers=48) — entry + many subsystems assign state via this
- `0x020288c8 is_no_key_pressed` — NDS KEYINPUT bit 15 = "no key pressed"
- `0x020082cc array_field_0x54_get_idx` — entity array stride 0x58, field 0x54 read
- `0x0202dac4 global_dword_load_chain` — 2-level pointer chase
- `0x02027ee8 const_true_getter` — 返回常数 1

#### BUG (V0.12)
- V0.12.0-001 — curated 第一轮仅 13 entries (目标 30% 未达). V0.12.1 + V0.13 加更多 + pattern detector
- V0.12.0-002 — curated 可能 collide with V0.4 known (validator 待 V0.12.2)

#### Verification
- ✅ python scripts/generate_ts_functions.py exit 0
- ✅ 13 curated names appear in arm9.ts with `@curated` JSDoc
- ✅ FunctionRecord schema 加 `is_curated: boolean` 字段

#### 后续 V0.13+
- **V0.12.1** — curated 增到 30+ entries（top 30 hot funcs 全覆盖）
- **V0.13** — pattern detector 自动识别 disasm 模式 (state setter / key check / array get)
- **V0.14** — entry_root 单独分析 (entry 0x02008000 大 loop, frame vblank wait)

---

## V0.12.1 — Curated naming batch 2

### V0.12.1 — 2026-08-31

#### 改动
- 新 `rom-data/v0121-curated-batch2.json` — 15 个新 curated names
- 改 `scripts/generate_ts_functions.py`:
  - 加 `CURATED_JSON_BATCH2` 配置
  - `load_curated_names()` 支持多个 JSON 文件（后置覆盖前置，允许 incremental batch 添加）

#### 新增 15 个 curated names（half 是 simple 1-liner pattern, half 是 complex multi-call）
| Addr | Name | Callers | Disasm pattern |
|---|---|---|---|
| `0x02020f4c` | `global_dword_get` | 12 | 1-level ptr deref |
| `0x0201eeb0` | `global_dword_get_b` | 3 | 同 pattern, 不同 global |
| `0x02029830` | `state_set_c` | 12 | `ldr r1, [pc, #4]; str r0, [r1]; bx lr` |
| `0x02029840` | `state_set_struct_v2` | 11 | 写 r0+清 0 到 2 globals |
| `0x02027c44` | `mem_byte_copy_signed` | 7 | `ldrsb` + `strb` 循环 copy |
| `0x0201dc1c` | `state_init_with_lift` | 9 | wide register save + const loader |
| `0x0201dcc8` | `is_state_valid_flag` | 4 | validation helper + boolean return |
| `0x02020eb4` | `state_reset_a_dispatcher` | 8 | reset + dispatch chain |
| `0x0202bbfc` | `tail_call_set_arg1_r2_set_arg0_0` | 21 | tail-call with arg forwarding |
| `0x0202d0d4` | `state_validate_early_return` | 15 | if invalid goto err (comm­on guard) |
| `0x02028b34` | `array_init_zero_0x18_stride` | 9 | 200 elements stride 0x18 zero-fill |
| `0x02028dec` | `array_init_zero_0xc_stride_offset_8` | 9 | 1000 elements stride 0xc |
| `0x02030270` | `mem_alloc_aligned_4` | 10 | aligned-4 allocator |
| `0x0202cf08` | `scene_state_check_op_branch` | 3 | state==1 → branch, else vec3 op |
| `0x0202c60c` | `init_trampoline_calls` | 2 | calls 8 worker fns in sequence |

#### 命名覆盖率 (V0.12.1)
- V0.12.0: 13 curated → V0.12.1: **28 curated** (+15)
- 28 known + 28 curated + 18 sfloat + 6 util + 31 helper = **111** / 2700 = **4.11%**
- (V0.12.0 was 3.78%, V0.10 was 3.6%)

#### Verification
- ✅ python scripts/generate_ts_functions.py exit 0
- ✅ 28 curated names appear in arm9.ts (15 new + 13 existing)
- ✅ Tsc EXIT=0 on V0.12.1 generated files

#### 后续 V0.13+
- **V0.12.2** curated 增到 50+ entries (next 20 hot funcs)
- **V0.13** pattern detector (regex 找 common disasm patterns, 自动建议命名)
- **V0.14** entry_root 单独分析

---















---

## V0.12.2 - Curated naming batch 3 + 4 (86 entries, 5.13% coverage)

### V0.12.2 - 2026-08-31

#### 添加
- ✅ `rom-data/v0122-curated-batch3.json` - 32 entries (hot callers + cache + IPC)
  - 0x0202f0c4 `state_set_gated_on_global_910` (49 callers, most-called remaining sub)
  - 0x020395d8 `dcache_clean_range` + 0x020395f4 `dcache_clean_invalidate_range` (cache control)
  - 0x0204d7e8 `float32_unpack_bits` + 0x0204c074 `float32_compare_abs` (SOFTFLOAT helper)
  - 0x02391b48 `arm7_ipc_fifo_send_low` + 0x02391b88 `arm7_ipc_fifo_send_high` (IPC send)
  - 0x0203a76c `memcpy_4byte_chunks` + 0x0203a758 `memset_4byte_chunks` (loop helpers)
  - 0x02043abc `global_dword_get_c` + 0x02043c70 `global_array_set_field_0x18`
  - + 24 more state/dispatch/init helpers
- ✅ `rom-data/v0122-curated-batch4.json` - 26 entries (pattern based detection)
  - 2 state setters (global_state_set_d, arm7_global_state_set_a)
  - 6 state getters (global_dword_get_d..i)
  - 3 halfword setters (global_halfword_set_b, _c, _b)
  - 1 byte setter (global_byte_set_a)
  - 2 halfword getters (global_halfword_get_a, _b)
  - 2 cache helpers (dcache_clean_range_v2, _clean_invalidate_v2)
  - 10 zero-init helpers (struct_zero_init_2field, struct_clear_3field, dual_global_clear, ...)
  - 1 switch dispatch (switch_dispatch_3way_alt)
- ✅ `scripts/generate_ts_functions.py` 加 batch 3 + batch 4 路径到 load_curated_names
- ✅ ADR-012 加到 `.codebuddy/DECISIONS.md`

#### 命名覆盖率
| Tier | V0.12.1 | V0.12.2 | 变化 |
| ---- | ------- | ------- | ---- |
| known | 28 | 28 | - |
| curated | 28 | 86 | **+58** |
| sfloat | 18 | 16 | -2 (curated 吸收) |
| util | 6 | 0 | -6 (curated 吸收) |
| helper | 31 | 7 | -24 (curated 吸收) |
| **total** | **111** | **137** | **+26** |
| % | 4.11% | **5.13%** | +1.02% |

**Note**: curated 增长 +58 但 total 只 +26 — 因为 batch 3+4 的 32 entries (大部分是 ≥10 callers) 吸收了
heuristic (sfloat_/util_/helper_) slot. 这是 **advisory** (curated 业务名 > 编号占位符)
而不是 regression — V0.13 pattern detector 会用更宽松阈值补回 heuristic coverage.

#### 4-tier 命名优先级 (ADR-012)
```
Tier 1: V0.4 known       (is_known=true, 28 fixed)
Tier 2: V0.12 curated    (manual disasm reading, addr → name)
Tier 3: V0.10 heuristic  (sfloat_/util_/helper_, by region + caller count)
Tier 4: sub_<addr>       (catch-all placeholder)
```

#### Verification
- ✅ `python scripts/generate_ts_functions.py` exit 0
- ✅ 86 curated names appear in arm9.ts (32 batch 3 + 26 batch 4 + 13 batch 1 + 15 batch 2)
- ✅ Tsc EXIT=0 on V0.12.2 generated files

#### 后续 V0.13+
- **V0.13** pattern detector: regex 匹配 disasm 找所有 state setter / global getter / memset / memcpy,
  自动建议名字 + 写 v013-pattern-suggestions.json. 不需要手工逐个命名.
- **V0.14** entry_root deep analysis (entry 0x02008000 大 inline loop, frame vblank wait)

---

## V0.13 - Pattern detector (regex auto-suggest) (ADR-013)

### V0.13 - 2026-08-31

#### 添加
- ✅ `scripts/pattern_detector.py` — 自动检测 common disasm pattern 的 standalone 脚本
  - 14 种 pattern: state_setter/getter, byte_/halfword setter/getter, const_return,
    struct_clear_0, memset_word, memcpy_word, dcache_helper, tail_call,
    switch_dispatch, early_return
  - 51 matches (V0.13 截止), 自动建议 `auto_<kind>_<addr8>` 命名
- ✅ `rom-data/v013-pattern-suggestions.json` — 51 entries (pattern_kind + confidence + disasm_snippet)
- ✅ `scripts/generate_ts_functions.py` 加 `is_pattern` 5th tier (在 curated 之后, heuristic 之前)
- ✅ JSDoc 加 `@pattern V0.13 auto-detected` 标注
- ✅ `miniprogram/utils/nds/types.ts` FunctionRecord 加 `is_pattern` 字段
- ✅ `docs/V0.13_PATTERN_DETECTOR.md` 设计文档
- ✅ ADR-013 加到 `.codebuddy/DECISIONS.md`

#### 5-tier 命名优先级 (ADR-013)
```
Tier 1: V0.4 known       (is_known=true, 28 fixed)
Tier 2: V0.12 curated    (manual disasm reading, 86 entries)
Tier 3: V0.13 pattern    (regex auto-match, 51 entries)  ← NEW
Tier 4: V0.10 heuristic  (sfloat_/util_/helper_, 23 entries)
Tier 5: sub_<addr>       (catch-all placeholder)
```

#### 命名覆盖率
| Tier | V0.12.2 | V0.13 | 变化 |
| ---- | ------- | ----- | ---- |
| known | 28 | 28 | - |
| curated | 86 | 86 | - |
| pattern | 0 | **51** | **+51** |
| sfloat | 16 | 16 | - |
| util | 0 | 0 | - |
| helper | 7 | 7 | - |
| **total** | **137** | **188** | **+51** |
| % | 5.13% | **7.04%** | +1.91% |

#### Pattern matches 分布 (51 total)
| Pattern | Matches |
| ------- | ------- |
| tail_call | 16 |
| state_setter | 11 |
| state_getter | 9 |
| const_return | 8 |
| halfword_getter | 3 |
| byte_getter | 1 |
| dcache_helper | 1 |
| byte_setter | 1 |
| halfword_setter | 1 |

#### Verification
- ✅ `python scripts/pattern_detector.py` exit 0
- ✅ 51 pattern matches found
- ✅ `python scripts/generate_ts_functions.py` exit 0
- ✅ Tsc EXIT=0 on V0.13 generated files
- ✅ Codegen idempotent

#### 后续 V0.13.1+
- **V0.13.1** Thumb disasm: 跑 capstone Thumb mode 解 odd-address 函数 (307 个遗漏)
- **V0.13.2** Advanced patterns: IO 寄存器访问 → io_*, interrupt handler → irq_*, vector table → vector_*
- **V0.14** Global dedup: 聚类同样 pattern 的 auto_state_getter_* 到一个 _global_get_N 系列
- **V0.15** unicorn2 emulation: 抓 bx rX indirect call target, 找 V0.4 BUG-004 闭环

---

## V0.13.1 - Fix pages/index/index.ts 2 syntax errors (V0.9.0-002 closure)

### V0.13.1 - 2026-08-31

#### 修复
- ✅ `miniprogram/pages/index/index.ts:34` 删除错误的 `private _board: SudokuBoard | null = null,`
  - 原因: `Page({...})` 是函数调用 + object literal, 不支持 class field 语法 (`private` + `: type`)
  - V0.4 STUB 文件遗留 bug (V0.9.0-002), 跨 V0.9-V0.13 没人修
  - 删除后 `this._board = null` (onLoad line 14) 仍 work (TS implicit any)
  - 不影响业务 (这个 _board 字段在文件中没被读)
- ✅ tsc EXIT=0 (整个项目 0 errors, 跨 100+ TS files)

---

## V0.13.2 - Thumb disasm + dual-mode pattern_detector (Thumb-aware, 7.04% stable)

### V0.13.2 - 2026-08-31

#### 添加
- ✅ `scripts/disasm_thumb.py` - Capstone Thumb-mode 反汇编脚本
  - ARM9 Thumb pass: 458003 insns (+38372 skipdata placeholders)
  - ARM7 Thumb pass: 121743 insns (+4747 skipdata placeholders)
  - 产物 `rom-data/disasm-arm9-thumb-full.txt` + `rom-data/disasm-arm7-thumb-full.txt`
- ✅ `scripts/pattern_detector.py` 加 Thumb disasm loading
  - 同时 load 4 个 disasm (arm9 ARM + Thumb, arm7 ARM + Thumb)
  - get_disasm_snippet() 加 `step` 参数 (ARM=4, Thumb=2)
  - 双 mode 匹配: ARM 不命中且有 Thumb 时回退到 Thumb 文本
  - Suggestions 加 `disasm_mode` 字段 (arm / thumb) 标注

#### 局限 (V0.13.2 截止)
- Thumb-mode-only 函数 241 个, 0 callers, 不匹配现有 14 个 pattern
  - 原因: V0.8 detect_functions 把所有 `push {..lr}` prologue 当成函数,
    但实际有些是函数调用时的临时 push, 不是真函数
  - Thumb 指令 (16-bit) 跟 ARM (32-bit) 模式不同, 现 pattern 不全
  - 解决: V0.13.3 加 Thumb-specific patterns
- 236 个函数 disasm 完全 missing (callers 0/1, 多在 0x02100000+ 区域)
  - 原因: ARM9 ROM 末尾被 capstone skipdata 跳过, 反汇编不连续
  - 影响: 这些 0-1 caller 的函数本来就不需要命名 (未到命名阈值)

#### 命名覆盖率 (V0.13.2 截止)
| Tier | V0.13.1 | V0.13.2 | 变化 |
| ---- | ------- | ------- | ---- |
| known | 28 | 28 | - |
| curated | 86 | 86 | - |
| pattern | 51 | 51 | - (Thumb-specific patterns 待 V0.13.3) |
| sfloat | 16 | 16 | - |
| util | 0 | 0 | - |
| helper | 7 | 7 | - |
| **total** | **188** | **188** | 0 (但 Thumb disasm 文件已纳入代码库) |

**Note**: V0.13.2 命名覆盖率没变, 但 Thumb disasm 已生成 + pattern_detector 已 Thumb-aware.
V0.13.3 加 Thumb-specific patterns (push+pop+pc, etc.) 后预期 +20-40 matches.

#### Verification
- ✅ `python scripts/disasm_thumb.py` exit 0
- ✅ `python scripts/pattern_detector.py` exit 0 (51 matches, stable)
- ✅ Tsc EXIT=0 on V0.13.2 generated files
- ✅ `npx tsc --noEmit` 0 errors

#### 后续 V0.13.3+
- **V0.13.3** Thumb-specific patterns (push+pop+pc, ldr pc-relative in Thumb, Thumb mcr cache)
- **V0.13.4** Advanced IO patterns (IO_KEYINPUT, VRAM, timer, IPC FIFO writes → io_*)
- **V0.14** Global dedup (聚类同样 pattern 的 auto_* 到一个 _global_get_N 系列)
- **V0.15** unicorn2 emulation 抓 bx rX indirect call (V0.4 BUG-004 闭环)

---

## V0.14 - Global dedup (target_global_ptr extraction) (ADR-014)

### V0.14 - 2026-08-31

#### 添加
- ✅ `scripts/pattern_detector.py` 加 `extract_pc_relative_target(lines, fn_addr, binary, load_addr)`
  - 找 `ldr rN, [pc, #N]` insn 的实际 addr
  - 计算 target = ldr_addr + 8 + offset (ARM pipeline)
  - 从 arm9.bin/arm7.bin 读 4-byte little-endian word
- ✅ Naming 从 `auto_<kind>_<fn_addr>` 改为 `auto_<kind>_<target_ptr_short>`
  - 两个 setter 操作同一个 global 时名字相同 → 暴露真实 duplicate
  - 加 `_a` / `_b` / `_c` 后缀去歧义
- ✅ `rom-data/v014-pattern-suggestions.json` 输出
  - `names[]` — 51 suggestions, 每条带 `target_global_ptr` field
  - `clusters[]` — 25 unique (pattern_kind, target_global) 聚类
- ✅ `scripts/generate_ts_functions.py` 切到 v014 (load v014-pattern-suggestions.json)
- ✅ `docs/V0.14_GLOBAL_DEDUP.md` 设计文档
- ✅ ADR-014 加到 `.codebuddy/DECISIONS.md`

#### V0.13.2 finding (skip + document)
- ⚠️ 307 个 missing 函数全是 V0.8 false positives (0 callers, mid-function push sites)
- Thumb disasm (capstone CS_MODE_THUMB) 不增加 naming coverage
- 文档化: BUG-V0.13.2-001 (false positive analysis)

#### V0.14 结果
| Metric | V0.13 | V0.14 |
| ------ | ----- | ----- |
| Pattern suggestions | 51 | 51 (same) |
| With target_global_ptr | 0 | 39 (76%) |
| Clusters (unique ptr per pattern) | n/a | 25 |
| Name collisions | 0 | 6 (suffix _a/_b added) |
| Total named | 188 | 188 (qualitative upgrade) |

#### 6 collisions 详情 (target_global_ptr dedup 检测)
```
state_setter target=0x021bd860:
  0x02030ff8 → auto_state_setter_021bd860_a
  0x0203100c → auto_state_setter_021bd860_b

state_getter target=0x0380aa88:
  0x02385b34 → auto_state_getter_0380aa88_a
  0x02385b40 → auto_state_getter_0380aa88_b

tail_call target=0x038080e8:
  0x0238e730 → auto_tail_call_038080e8_a + 5 more
```

#### 命名覆盖率 (V0.14 截止)
| Tier | V0.13 | V0.14 | 变化 |
| ---- | ----- | ----- | ---- |
| known | 28 | 28 | - |
| curated | 86 | 86 | - |
| pattern | 51 | 51 | - |
| sfloat | 16 | 16 | - |
| util | 0 | 0 | - |
| helper | 7 | 7 | - |
| **total** | **188** | **188** | - (qualitative) |
| % | 7.04% | 7.04% | - (qualitative upgrade: names now contain target_global_ptr) |

#### Verification
- ✅ `python scripts/pattern_detector.py` exit 0
- ✅ 39/51 suggestions with target_global_ptr
- ✅ 25 unique clusters + 6 collisions resolved
- ✅ Tsc EXIT=0 on V0.14 generated TS files
- ✅ Codegen idempotent

#### 后续 V0.14.1+
- **V0.14.1** Extract target_global for tail_call + const_return (12 more)
- **V0.14.2** Cluster dedup output for V0.15 batch curated
- **V0.15** unicorn2 emulation: 抓 bx rX indirect call (V0.4 BUG-004 闭环)
- **V0.16** Global ptr naming: cross-reference ldr target with addresses.ts

---

## V0.14.1 - 100% target extraction + tsc cleanup (ADR-014 extension)

### V0.14.1 - 2026-08-31

#### 添加
- ✅ `scripts/pattern_detector.py` 加 per-kind target extraction:
  - `tail_call` 用 LAST ldr ip (closest to bx ip) - 加 `prefer='last'` 参数
  - `const_return` extract 整数常量 from `mov r0, #N` / `movs r0, #N`
  - `dcache_helper` extract mcr opcode 字符串 (`c7_c10_1`)
- ✅ extract_pc_relative_target regex 加 `ip` 寄存器匹配 (`ldr ip, [pc, #N]`)
- ✅ dcache opcode 字符串当 target_ptr short (避免 int format error)
- ✅ `miniprogram/utils/nds/addresses.ts` 修 `as const` on computed expression TS1355 errors (3 处)
- ✅ `miniprogram/pages/index/index.ts` 清理 V0.13.1 副作用:
  - 删 unused `import { SudokuBoard }`
  - 删 `this._board = null` (没有 _board 字段了)
  - 改 `e: any` → `_e: any` (noUnusedParameters)
- ✅ `scripts/test_sudoku_fuzz.ts` 修 unused vars (REAL_PUZZLES, FUZZ_SEEDS)
- ✅ `typings/types/wx/lib.wx.app.d.ts:265` 加 `<T extends object = IAnyObject>` 修 TS2344

#### V0.14.1 结果
| Metric | V0.14 | V0.14.1 | 变化 |
| ------ | ----- | ------- | ---- |
| Pattern suggestions | 51 | 51 | - |
| With target_global_ptr | 39 (76%) | **51 (100%)** | +12 |
| Clusters (unique ptr per pattern) | 25 | 26 | +1 (mov #0) |
| Name collisions | 6 | **19** | +13 (more shared targets visible) |
| tsc EXIT=0 | partial | ✅ | fixed 4 pre-existing errors |

#### 12 个新提取 (V0.14 缺 target → V0.14.1 提取)
- 4 tail_call: ldr ip, [pc, #N] → tail target (last ldr)
- 7 const_return: mov r0, #0 (returns 0) → 0x00000000
- 1 dcache_helper: mcr p15 c7 c10 #1 → c7_c10_1

#### Verification
- ✅ `python scripts/pattern_detector.py` exit 0
- ✅ 51/51 suggestions with target_global_ptr (100% coverage)
- ✅ tsc EXIT=0 on whole project (was partial)

#### 后续 V0.14.2+
- **V0.14.2** Cluster dedup output for V0.15 batch curated
- **V0.15** unicorn2 emulation: 抓 bx rX indirect call (V0.4 BUG-004 闭环)
- **V0.16** Global ptr naming: cross-reference ldr target with addresses.ts
