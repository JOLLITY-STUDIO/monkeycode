// pages/index/index.ts — 单页场景控制器 + 场景过渡动画
// 唯一页面: 所有场景组件通过双 stage 交叉过渡切换, 路由由本页自建 (无 wx.navigateTo)
// 场景: title / menu / select / options / sudoku / picture / staff / about / tutorial / pictList
// 过渡: 切换时旧场景 (leavingScene) 播放离场动画, 新场景 (scene) 播放进场动画,
//       动画结束后定时器移除 leavingScene 层 (wx:if 卸载组件)
// 效果按场景流向自动选择 (SCENE_TRANSITIONS), 未配置的流向默认 fade

import { audioService } from '../../utils/audio/audioService';
import type { AudioScene } from '../../utils/audio/soundManifest';

type SceneName =
  | 'title'
  | 'menu'
  | 'select'
  | 'options'
  | 'sudoku'
  | 'picture'
  | 'pictureMode'
  | 'staff'
  | 'about'
  | 'tutorial'
  | 'pictList';

/** 过渡效果类型 (对应 index.wxss 关键帧) */
type SceneEffect = 'fade' | 'forward' | 'back' | 'drill' | 'retreat';

/** 离场动画最长时长 (ms) + 80ms 缓冲 = leavingScene 清理定时器 */
const LEAVE_ANIM_MS = 350;

/** 场景流向 → 过渡效果表 (key: 'from-to') */
const SCENE_TRANSITIONS: Record<string, SceneEffect> = {
  // 平级切换: 淡入淡出
  'title-menu': 'fade',
  'menu-title': 'fade',
  'menu-tutorial': 'fade',
  'tutorial-menu': 'fade',
  'menu-staff': 'fade',
  'staff-menu': 'fade',
  'menu-about': 'fade',
  'about-menu': 'fade',
  // 进入下级: 新场景从右滑入, 旧场景向左滑出
  'menu-select': 'forward',
  'menu-pictList': 'forward',
  'menu-pictureMode': 'forward',
  'menu-options': 'forward',
  'options-staff': 'forward',
  'options-about': 'forward',
  'pictureMode-pictList': 'forward',
  'pictureMode-picture': 'forward',
  // 返回上级: 反向
  'select-menu': 'back',
  'pictList-menu': 'back',
  'pictList-pictureMode': 'back',
  'pictureMode-menu': 'back',
  'options-menu': 'back',
  'staff-options': 'back',
  'about-options': 'back',
  'picture-pictureMode': 'back',
  // 下钻进对局: 新场景从下滑入, 旧场景向上滑出
  'select-sudoku': 'drill',
  'pictList-picture': 'drill',
  // 退出对局: 反向
  'sudoku-select': 'retreat',
  'picture-pictList': 'retreat',
};

Page({
  data: {
    scene: 'title' as SceneName,
    /** 正在退场的旧场景 (动画播放中, 结束后清空) */
    leavingScene: '' as SceneName | '',
    /** 当前过渡效果 (驱动 stage-enter-{{effect}} / stage-leave-{{effect}}) */
    effect: 'fade' as SceneEffect,
    puzzleId: '', // sudoku 场景: 选题页传入的题目 id (numpleX.data_NNN)
    fileKey: '', // picture 场景: 类别 key (numcloX.data)
    puzzleIdx: 0, // picture 场景: 类别内题号 (0-based)
    /** TS 私有字段声明 (非渲染数据): 离场动画清理定时器 */
    _leaveTimer: null as number | null,
  },

  onLoad(query?: any) {
    // 支持外部直达: ?id=numpleX.data_NNN → 直接进数独; ?file=xxx&idx=N → 进图画
    // 首屏直达无需过渡 (title 从未显示过)
    if (query && query.id) {
      this.setData({ scene: 'sudoku', puzzleId: String(query.id) });
      audioService.playBgmForScene('sudoku');
    } else if (query && query.file) {
      this.setData({
        scene: 'picture',
        fileKey: String(query.file),
        puzzleIdx: Number(query.idx || 0),
      });
      audioService.playBgmForScene('picture');
    } else {
      audioService.playBgmForScene('title');
    }
  },

  onUnload() {
    this._clearLeaveTimer();
    audioService.destroy();
  },

  /** 场景过渡切换引擎: 旧场景进入离场动画, 新场景进入进场动画 */
  _switchScene(next: SceneName, extra?: Record<string, any>) {
    const cur = this.data.scene;
    if (cur === next) return;
    const effect = SCENE_TRANSITIONS[`${cur}-${next}`] || 'fade';
    const leaving = cur;
    this.setData({
      scene: next,
      leavingScene: leaving,
      effect,
      ...(extra || {}),
    });
    audioService.playBgmForScene(next as AudioScene);
    // 离场动画结束后移除 leaving 层 (定时器兜底, animationend 在部分平台不可靠)
    this._clearLeaveTimer();
    this.data._leaveTimer = setTimeout(() => {
      if (this.data.leavingScene === leaving) {
        this.setData({ leavingScene: '' });
      }
    }, LEAVE_ANIM_MS + 80);
  },

  _clearLeaveTimer() {
    if (this.data._leaveTimer) {
      clearTimeout(this.data._leaveTimer);
      this.data._leaveTimer = null;
    }
  },

  // ---- title-scene: start → 主菜单 ----
  onTitleStart() {
    console.log('[index] onTitleStart -> switch menu, cur scene =', this.data.scene);
    this._switchScene('menu');
  },

  // ---- menu-scene 路由 ----
  onMenuOpenNumber() {
    this._switchScene('select');
  },
  onMenuOpenPicture() {
    this._switchScene('pictureMode');
  },
  onMenuOpenTutorial() {
    this._switchScene('tutorial');
  },
  onMenuOpenStaff() {
    this._switchScene('staff');
  },
  onMenuOpenOptions() {
    this._switchScene('options');
  },
  onMenuBackTitle() {
    this._switchScene('title');
  },

  // ---- select-scene: start({ id, no }) → 数独对局; back → 主菜单 ----
  onSelectStart(e: any) {
    const id = e.detail && e.detail.id;
    if (!id) {
      wx.showToast({ title: '题目不存在', icon: 'none' });
      return;
    }
    this._switchScene('sudoku', { puzzleId: String(id) });
  },
  onSelectBack() {
    this._switchScene('menu');
  },

  // ---- options-scene: 制作/关于/返回 ----
  onOptionsOpenStaff() {
    this._switchScene('staff');
  },
  onOptionsOpenAbout() {
    this._switchScene('about');
  },
  onOptionsBack() {
    this._switchScene('menu');
  },

  // ---- tutorial / staff / about: back → 主菜单 ----
  onTutorialBack() {
    this._switchScene('menu');
  },
  onStaffBack() {
    this._switchScene('menu');
  },
  onAboutBack() {
    this._switchScene('menu');
  },

  // ---- picture-mode-scene: 子模式选择 ----
  onPictureModeBack() {
    this._switchScene('menu');
  },
  onPictureModeOpenNankuro() {
    this._switchScene('pictList');
  },
  onPictureModeOpenTutorial() {
    this._switchScene('picture', { fileKey: 'numclo_tu.data', puzzleIdx: 0 });
  },

  // ---- pict-list-scene: open({ key }) → 图画对局; back → 子模式选择 ----
  onPictListOpen(e: any) {
    const key = e.detail && e.detail.key;
    if (!key) return;
    this._switchScene('picture', { fileKey: String(key), puzzleIdx: 0 });
  },
  onPictListBack() {
    this._switchScene('pictureMode');
  },

  // ---- picture-scene: back → 子模式选择 ----
  onPictureBack() {
    this._switchScene('pictureMode');
  },

  // ---- sudoku-scene: back → 选题页 ----
  onSudokuBack() {
    this._switchScene('select');
  },
});
