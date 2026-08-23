// 扫描 H5 场景背景渲染链路: $FA opcode / sceneLoad / BootBackgroundRenderer 调用点
const fs = require('fs');
const files = [
  'src/game/prg/code/story/ScriptEngine.ts',
  'src/game/prg/code/system/GameSystemService.ts',
  'src/game/prg/code/system/BootRouter.ts',
  'src/game/prg/code/scene/BootBackgroundRenderer.ts',
  'src/game/prg/code/scene/scene_opening.controller.ts',
  'src/game/prg/index.ts',
  'src/game/index.ts',
];
const pat = /0xfa|0xFA|FA\]|sceneLoad|BootBackgroundRenderer|SCENE_|renderScene|opScene|loadScene|opScen|sceneBg|SceneBackground/i;
files.forEach((f) => {
  const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/' + f;
  if (!fs.existsSync(p)) { console.log('MISSING ' + f); return; }
  const c = fs.readFileSync(p, 'utf8');
  const ls = c.split('\n');
  ls.forEach((l, i) => {
    const t = l.trim();
    if (!pat.test(l)) return;
    if (t.startsWith('*') || t.startsWith('//')) return;
    console.log(f + ':' + (i + 1) + ': ' + t.slice(0, 115));
  });
});
