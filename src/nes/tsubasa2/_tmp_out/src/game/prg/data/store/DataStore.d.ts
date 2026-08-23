/**
 * DataStore — 运行时数据中心 (翻译版无 CPU 的内存替代品)
 *
 * 直接复用 `src/core/ram.ts` 的 RamStore (Redis 风格 KV + byte 总线)：
 *   - KV:        store.set('player.01', {...}) / store.get('player.01')
 *   - byte 总线: store.read('ram_005E') / store.write('ram_005E', 0)
 *   - NES 外设:  oam / oamShadow / sprites / paletteTable / nt0 / nt1 / zp
 *
 * 所有 bank Service 统一注入本类，禁止直接操作裸地址 PRG_BANK。
 */
import { RamStore } from '../../../../core/ram';
export declare class DataStore extends RamStore {
    constructor();
}
export default DataStore;
