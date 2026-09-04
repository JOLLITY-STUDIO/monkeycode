// components/scenes/title-scene/title-scene.ts — 启动标题场景组件
// V0.48 封面内容全删 (视觉背景交给全局 bg-fx 糖果动态背景):
//   - bg-fx 负责背景层: 浅色糖果渐变 + 满屏漂浮大数字 1-9 (number 玩法)
//                       + 3×3/4×4/5×5/6×6 小网格方块 (picture 玩法) + 呼吸柔光
//   - title-scene 只保留: 顶部品牌标题 + Press START + 版权两行
//                        (背景透明, bg-fx 透出, 不再有中央 9×9 封面框)
//   点击 → triggerEvent('start') → index _switchScene('menu')

import { audioService } from '../../../utils/audio/audioService';

Component({
  options: { virtualHost: false },
  data: {
    pulse: false,
    /** TS 私有字段声明 (非渲染数据) */
    _pulseTimer: 0 as number,
  },

  lifetimes: {
    attached() {
      console.log('[title-scene] attached -> instance created');
      this.data._pulseTimer = setTimeout(() => {
        this.setData({ pulse: true });
      }, 600);
    },
    detached() {
      if (this.data._pulseTimer) {
        clearTimeout(this.data._pulseTimer);
        this.data._pulseTimer = 0;
      }
    },
  },

  methods: {
    /** 点击任意处 → 通知页面进入主菜单.
        V0.53.2: triggerEvent 放在最前, 不被 playSe 阻塞/异常拦住. */
    onTapStart() {
      console.log('[title-scene] onTapStart -> trigger start');
      this.triggerEvent('start');
      try {
        audioService.playSe('start');
      } catch (_e) {
        // 音频异常不阻断跳转
      }
    },
  },
});
