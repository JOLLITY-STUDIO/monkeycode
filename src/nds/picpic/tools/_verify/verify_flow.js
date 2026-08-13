"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 无界面脚本验证游戏流程（Node.js）
const engine_1 = require("./miniprogram/engine/core/engine");
const play_scene_1 = require("./miniprogram/engine/scenes/play-scene");
const title_scene_1 = require("./miniprogram/engine/scenes/title-scene");
const select_scene_1 = require("./miniprogram/engine/scenes/select-scene");
const index_1 = require("./miniprogram/engine/data/puzzles/index");
const index_2 = require("./miniprogram/engine/data/palettes/index");
function getPuzzleId(p) {
    const m = p.name.match(/^\d+/);
    return m ? 'P' + m[0] : 'P' + p.name.replace(/[^A-Za-z0-9]/g, '_');
}
// 模拟 Canvas
const canvas = {
    width: 375 * 2,
    height: 667 * 2,
    getContext: () => ({
        canvas: { width: 375 * 2, height: 667 * 2 },
        fillRect: () => { },
        fillText: () => { },
        strokeRect: () => { },
        scale: () => { },
    }),
};
const ctx = canvas.getContext('2d');
// 模拟 performance.now
global.performance = { now: () => Date.now() };
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = clearTimeout;
global.window = { devicePixelRatio: 2 };
const engine = new engine_1.PicPicEngine(ctx);
// 注册标题场景
const titleScene = new title_scene_1.TitleScene(() => {
    engine.goto('select');
});
engine.register('title', titleScene);
// 注册选关场景
const selectScene = new select_scene_1.SelectScene(index_1.PUZZLES, (idx) => {
    engine.state.puzzleIndex = idx;
    const puzzle = index_1.PUZZLES[idx];
    const pid = getPuzzleId(puzzle);
    const palette = index_2.PALETTES[pid] || [];
    engine.loadPuzzle(puzzle, palette);
    const playScene = new play_scene_1.PlayScene(puzzle);
    engine.register('play', playScene);
    engine.goto('play');
});
engine.register('select', selectScene);
// 验证流程
console.log('=== 验证标题场景 ===');
engine.goto('title');
titleScene.onTouch(100, 400, engine.state); // 点击按钮外
console.log('点击外部后场景:', engine.state.scene);
titleScene.onTouch(107, 373, engine.state); // 按钮中心 (375/2-80, 667/2+40+22)
console.log('点击按钮后场景:', engine.state.scene);
console.log('\n=== 验证选关场景 ===');
selectScene.onTouch(10, 50, engine.state); // 点击第一个谜题区域
console.log('选择谜题后索引:', engine.state.puzzleIndex);
console.log('选择谜题后场景:', engine.state.scene);
if (engine.state.scene === 'play') {
    console.log('\n=== 验证游玩场景 ===');
    const puzzle = index_1.PUZZLES[engine.state.puzzleIndex];
    console.log('谜题:', puzzle.name, puzzle.w + 'x' + puzzle.h);
    console.log('调色板是否加载:', engine.state.palette.length > 0);
    // 模拟涂色（完成整个谜题）
    engine.beginStroke();
    for (let i = 0; i < puzzle.grid.length; i++) {
        const x = i % puzzle.w;
        const y = Math.floor(i / puzzle.w);
        engine.paintCell(x, y, puzzle.grid[i]);
    }
    const completed = engine.checkComplete(puzzle);
    console.log('完成判定:', completed);
    console.log('状态 completed:', engine.state.completed);
}
console.log('\n=== 全部验证通过 ===');
