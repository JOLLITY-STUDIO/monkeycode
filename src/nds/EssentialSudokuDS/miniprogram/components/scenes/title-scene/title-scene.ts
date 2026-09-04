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
    /** tap 双路径 (press-start 直绑 + tap-catcher 直绑 + 根冒泡) 去重时间戳 */
    _lastTapTs: 0 as number,
  },

  lifetimes: {
    attached() {
      console.log('[title-scene] attached -> instance created');
      this.data._pulseTimer = setTimeout(() => {
        this.setData({ pulse: true });
      }, 600);
      // V0.53.3: 布局诊断 — 确认命中层真实尺寸 (Skyline 宿主高度塌陷会让 tap-catcher
      // 命中面积为 0 → 点击穿透到下层无人处理, 现象即"看到但点了没反应")
      this._logHitbox();
    },
    detached() {
      if (this.data._pulseTimer) {
        clearTimeout(this.data._pulseTimer);
        this.data._pulseTimer = 0;
      }
    },
  },

  methods: {
    /** V0.53.3: 首帧后量 tap-catcher / title-page 命中盒尺寸并打日志 (仅诊断, 不阻断). */
    _logHitbox() {
      try {
        const q = this.createSelectorQuery();
        q.select('.tap-catcher').boundingClientRect((r: any) => {
          console.log('[title-scene] hitbox .tap-catcher =', r ? `${r.width}x${r.height} @(${r.top},${r.left})` : 'null');
        });
        q.select('.title-page').boundingClientRect((r: any) => {
          console.log('[title-scene] hitbox .title-page =', r ? `${r.width}x${r.height} @(${r.top},${r.left})` : 'null');
        });
        q.exec();
      } catch (_e) {
        // 诊断失败不阻断
      }
    },

    /** 点击任意处 → 通知页面进入主菜单.
        V0.53.2: triggerEvent 放在最前, 不被 playSe 阻塞/异常拦住.
        V0.53.3: 同一事件路径上 press-start / tap-catcher / 根 title-page 三处都可能触发,
        Skyline 冒泡到根时会在路径中触发一次直绑 → 用 300ms 去重保证最多 fire 一次. */
    onTapStart() {
      const now = Date.now();
      if (now - this.data._lastTapTs < 300) return;
      this.data._lastTapTs = now;
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
