// G37 验证: tsc 零错误 + TaskIndex 旧名无残留 + resetEntry case 映射
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const out = [];
const log = (s) => { out.push(s); };

try {
  // 1. tsc 编译
  let tscOk = true;
  let tscErr = '';
  try {
    execSync('npx tsc -p tsconfig.json --noEmit', { cwd: root, stdio: 'pipe', encoding: 'utf8' });
  } catch (e) {
    tscOk = false;
    tscErr = (e.stdout || '') + (e.stderr || '');
  }
  log('TSC: ' + (tscOk ? 'OK (exit 0)' : 'FAIL'));

  // 2. TaskIndex 旧枚举名残留
  const br = fs.readFileSync(path.join(root, 'src/game/prg/code/system/BootRouter.ts'), 'utf8');
  const oldNames = [
    'SCENE_00_INIT', 'SCENE_01_ADDR_8559', 'SCENE_02_ADDR_857B', 'SCENE_03_ADDR_8581',
    'SCENE_04_ADDR_85A2', 'SCENE_05_ADDR_85A8', 'SCENE_06_ADDR_85B0', 'SCENE_07_ADDR_85B8',
    'SCENE_08_ADDR_85BF', 'SCENE_09_ADDR_85CD', 'SCENE_10_ADDR_85DB', 'SCENE_11_ADDR_85E8',
    'SCENE_12_ADDR_8602', 'SCENE_13_ADDR_861C', 'SCENE_14_ADDR_8629', 'SCENE_15_ADDR_8650',
    'SCENE_16_ADDR_869C', 'SCENE_17_ADDR_877A', 'SCENE_18_ADDR_8782', 'SCENE_19_ADDR_878D',
    'SCENE_20_ADDR_87BD', 'SCENE_21_ADDR_87CE', 'SCENE_22_ADDR_87D6',
  ];
  const leftover = oldNames.filter((n) => br.includes(n));
  log('TaskIndex 旧名残留: ' + (leftover.length === 0 ? '无 (PASS)' : leftover.join(',')));

  // 3. 新枚举名齐全 (24 项)
  const newNames = [
    'SCENE_00_PASSWORD_INIT', 'SCENE_01_ANGLE_CALC', 'SCENE_02_AUX_9B91', 'SCENE_03_NT_FILL',
    'SCENE_04_OAM_CLEAR', 'SCENE_05_SPRITE_9F96', 'SCENE_06_SPRITE_9F89', 'SCENE_07_FLAG_0099',
    'SCENE_08_BIT6_CLEAR', 'SCENE_09_BIT6_SET', 'SCENE_10_ROSTER_LOAD0', 'SCENE_11_ROSTER_LOAD10',
    'SCENE_12_ROSTER_LOAD30', 'SCENE_13_ROSTER_LOAD20', 'SCENE_14_SPRITE_SCROLL',
    'SCENE_15_CONTINUE_LOAD', 'SCENE_16_MATCH_ROSTER', 'SCENE_17_ROSTER_LOAD80',
    'SCENE_18_WAIT_OAM_COPY', 'SCENE_19_SPRITE_ATTR_BIT3', 'SCENE_20_SPRITE_ATTR',
    'SCENE_21_ROSTER_LOAD81', 'SCENE_22_SPRITE_ATTR_BIT2', 'SCENE_23_PASSWORD_CHECK',
  ];
  const missing = newNames.filter((n) => !br.includes(n));
  log('新枚举名缺失: ' + (missing.length === 0 ? '无 (PASS)' : missing.join(',')));

  // 4. SceneController.resetEntry case 映射
  const sc = fs.readFileSync(path.join(root, 'src/game/prg/code/scene/SceneController.ts'), 'utf8');
  log('SceneController case 23 映射: ' + (sc.includes('SCENE_23_PASSWORD_CHECK') ? 'PASS' : 'FAIL'));
  log('SceneController case 4 残留: ' + (/\bcase 4\b/.test(sc) ? 'FAIL(残留)' : 'PASS(无)'));

  if (!tscOk) log(tscErr.slice(0, 3000));
  log(tscOk && leftover.length === 0 && missing.length === 0 ? '=== G37 全部 PASS ===' : '=== G37 有 FAIL ===');
} catch (err) {
  log('SCRIPT ERROR: ' + err.message);
}

fs.writeFileSync(path.join(root, '_g37_verify_log.txt'), out.join('\n'), 'utf8');
