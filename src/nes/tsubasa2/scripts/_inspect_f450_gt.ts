import { OPENING_FRAMES } from '../src/game/prg/data/scene/OpeningFrameTable';

const fr450 = OPENING_FRAMES[450 - 10];
console.log('s', JSON.stringify(fr450?.s));
console.log('c', JSON.stringify(fr450?.c));
console.log('p', JSON.stringify(fr450?.p));
console.log('oCount', fr450?.o?.length);
console.log('nCount', fr450?.n?.length);
console.log('aCount', fr450?.a?.length);
