// pages/index/index.ts — 单页场景控制器
// 唯一页面: 所有场景组件通过 wx:if/elif 切换, 路由由本页自建 (无 wx.navigateTo 页面跳转)
// 场景: title / menu / select / options / sudoku / picture / staff / about / tutorial / pictList
// 场景组件通过 triggerEvent 通知本页, 本页负责 scene 状态切换 + 场景间数据透传

type SceneName =
  | 'title'
  | 'menu'
  | 'select'
  | 'options'
  | 'sudoku'
  | 'picture'
  | 'staff'
  | 'about'
  | 'tutorial'
  | 'pictList';

Page({
  data: {
    scene: 'title' as SceneName,
    puzzleId: '', // sudoku 场景: 选题页传入的题目 id (numpleX.data_NNN)
    fileKey: '', // picture 场景: 类别 key (numcloX.data)
    puzzleIdx: 0, // picture 场景: 类别内题号 (0-based)
  },

  onLoad(query?: any) {
    // 支持外部直达: ?id=numpleX.data_NNN → 直接进数独; ?file=xxx&idx=N → 进图画
    if (query && query.id) {
      this.setData({ scene: 'sudoku', puzzleId: String(query.id) });
    } else if (query && query.file) {
      this.setData({
        scene: 'picture',
        fileKey: String(query.file),
        puzzleIdx: Number(query.idx || 0),
      });
    }
  },

  // ---- title-scene: start → 主菜单 ----
  onTitleStart() {
    this.setData({ scene: 'menu' });
  },

  // ---- menu-scene 路由 ----
  onMenuOpenNumber() {
    this.setData({ scene: 'select' });
  },
  onMenuOpenPicture() {
    this.setData({ scene: 'pictList' });
  },
  onMenuOpenTutorial() {
    this.setData({ scene: 'tutorial' });
  },
  onMenuOpenStaff() {
    this.setData({ scene: 'staff' });
  },
  onMenuOpenOptions() {
    this.setData({ scene: 'options' });
  },
  onMenuBackTitle() {
    this.setData({ scene: 'title' });
  },

  // ---- select-scene: start({ id, no }) → 数独对局; back → 主菜单 ----
  onSelectStart(e: any) {
    const id = e.detail && e.detail.id;
    if (!id) {
      wx.showToast({ title: '题目不存在', icon: 'none' });
      return;
    }
    this.setData({ scene: 'sudoku', puzzleId: String(id) });
  },
  onSelectBack() {
    this.setData({ scene: 'menu' });
  },

  // ---- options-scene: 制作/关于/返回 ----
  onOptionsOpenStaff() {
    this.setData({ scene: 'staff' });
  },
  onOptionsOpenAbout() {
    this.setData({ scene: 'about' });
  },
  onOptionsBack() {
    this.setData({ scene: 'menu' });
  },

  // ---- tutorial / staff / about: back → 主菜单 ----
  onTutorialBack() {
    this.setData({ scene: 'menu' });
  },
  onStaffBack() {
    this.setData({ scene: 'menu' });
  },
  onAboutBack() {
    this.setData({ scene: 'menu' });
  },

  // ---- pict-list-scene: open({ key }) → 图画对局; back → 主菜单 ----
  onPictListOpen(e: any) {
    const key = e.detail && e.detail.key;
    if (!key) return;
    this.setData({ scene: 'picture', fileKey: String(key), puzzleIdx: 0 });
  },
  onPictListBack() {
    this.setData({ scene: 'menu' });
  },

  // ---- picture-scene: back → 类别列表 ----
  onPictureBack() {
    this.setData({ scene: 'pictList' });
  },

  // ---- sudoku-scene: back → 选题页 ----
  onSudokuBack() {
    this.setData({ scene: 'select' });
  },
});
