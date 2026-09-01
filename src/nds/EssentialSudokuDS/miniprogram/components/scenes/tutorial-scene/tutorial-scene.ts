// components/scenes/tutorial-scene/tutorial-scene.ts — 玩法说明场景组件

Component({
  methods: {
    /** 返回主菜单 */
    onBack() {
      this.triggerEvent('back');
    },
  },
});
