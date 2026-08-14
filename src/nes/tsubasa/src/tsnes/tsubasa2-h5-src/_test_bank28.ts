import { DataStore } from './src/data/DataStore';
import { Bank28MatchService } from './src/game/index';

const store = new DataStore();
const b28 = new Bank28MatchService(store);

// 测试数据访问
console.log('level(0):', b28.getLevel(0));
console.log('level(100):', b28.getLevel(100));
console.log('role type 0:', b28.getRoleType(0));
console.log('zone 0:', b28.getZoneCoord(0));
console.log('scene ptr 0:', b28.getSceneDataPtr(0).toString(16));

// 测试等级入口
store.write('ram_0032', 50);
b28.entryLevelMap();
console.log('level map result:', store.read('ram_0032'));

// 测试区域检查
store.write('ram_043C', 0);
store.write('ram_0635', 0x0c);
store.write('ram_0637', 0x00);
store.write('ram_05FB', 1);
b28.entryZoneCheck();
console.log('zone check result:', store.read('ram_0628').toString(16));

// 测试对阵配置加载
store.write('ram_043B', 0);
store.write('ram_043C', 0);
store.write('ram_044E', 0);
b28.entryHomeMatchConfig();
console.log('home cfg 0444:', store.read('ram_0444').toString(16));
console.log('home cfg 043F:', store.read('ram_043F').toString(16));
console.log('home cfg 0440:', store.read('ram_0440').toString(16));
console.log('home cfg 0443:', store.read('ram_0443').toString(16));

// 测试 OAM 初始化
b28.entryOamInit();
console.log('oam done, 0515:', store.read('ram_0515').toString(16));

console.log('bank28 smoke test passed');
