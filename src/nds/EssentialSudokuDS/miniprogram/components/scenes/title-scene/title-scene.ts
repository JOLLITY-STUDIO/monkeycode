// components/scenes/title-scene/title-scene.ts — 启动标题场景组件
// 全屏 title.nbm (横幅图合规) + "点击开始" 脉冲提示
// 点击 → triggerEvent('start') → index 场景控制器 _switchScene('menu') (无页面跳转)

import { audioService } from '../../../utils/audio/audioService';

Component({
  data: {
    pulse: false,
    /** TS 私有字段声明 (非渲染数据): 脉冲动画启动定时器句柄 */
    _pulseTimer: 0,
  },

  lifetimes: {
    attached() {
      // 1s 后开始脉冲提示动画
      this.data._pulseTimer = setTimeout(() => {
        this.setData({ pulse: true });
      }, 1000);
    },
    detached() {
      if (this.data._pulseTimer) {
        clearTimeout(this.data._pulseTimer);
        this.data._pulseTimer = 0;
      }
    },
  },

  methods: {
    /** 点击任意处 → 通知页面进入主菜单 */
    onTapStart() {
      try {
        audioService.playSe('start');
      } catch (_e) {
        // 音频异常不阻断跳转
      }
      console.log('[title-scene] onTapStart -> trigger start');
      this.triggerEvent('start');
    },
  },
});
