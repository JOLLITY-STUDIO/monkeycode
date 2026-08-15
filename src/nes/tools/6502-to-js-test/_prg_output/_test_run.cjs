const { createRequire } = require('module');
const req = createRequire(__dirname + '/');
const Module = req('./core.cjs');

Module.onRuntimeInitialized = () => {
    console.log('init OK');

    // 列出 Module 上所有 key
    const keys = Object.keys(Module).sort();
    console.log('Module keys:', keys.join(', '));

    // 找包含 "heap" 或 "mem" 的
    const memKeys = keys.filter(k => /heap|mem|HEAP|Mem|buf/i.test(k));
    console.log('mem-related keys:', memKeys.join(', '));

    // 试几种常见的
    console.log('typeof Module.HEAP8:', typeof Module.HEAP8);
    console.log('typeof Module.HEAPU8:', typeof Module.HEAPU8);
    console.log('typeof Module.buffer:', typeof Module.buffer);
    console.log('typeof Module.wasmMemory:', typeof Module.wasmMemory);

    // 如果有 wasmMemory
    if (Module.wasmMemory) {
        console.log('wasmMemory exists, buffer:', Module.wasmMemory.buffer);
        const buf = new Uint8Array(Module.wasmMemory.buffer);
        console.log('memory[0x2000]:', buf[0x2000]);
    }

    console.log('\nexports:', Object.keys(Module).filter(k => !k.startsWith('_')).join(', '));

    // 跑帧
    console.log('\nrunning _update_frame()...');
    const t0 = Date.now();
    Module._update_frame();
    const t1 = Date.now();
    console.log('frame 1 done, ' + (t1 - t0) + 'ms');

    // 再跑几帧
    for (let f = 2; f <= 5; f++) {
        const t = Date.now();
        Module._update_frame();
        console.log('frame ' + f + ' done, ' + (Date.now() - t) + 'ms');
    }

    console.log('TEST PASSED');
};
