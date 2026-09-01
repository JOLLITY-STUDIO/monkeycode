// components/scenes/staff-scene/staff-scene.ts — 制作人员场景组件
import { NBM_GROUP_STAFF } from '../../../utils/sudoku/nbmAssets';

Component({
  data: {
    staffImages: NBM_GROUP_STAFF,
  },

  methods: {
    /** 返回 */
    onBack() {
      this.triggerEvent('back');
    },
  },
});
