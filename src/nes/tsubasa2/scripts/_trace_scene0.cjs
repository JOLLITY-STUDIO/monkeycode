// Trace Scene0 phase using bundle
global.window = global;
global.self = global;
global.document = { getElementById: () => null };
global.wx = { createWebAudioContext: () => null };

// Hook console.log for capture
const logs = [];
const origLog = console.log;
console.log = (...args) => { logs.push(args.join(' ')); };

let frameCount = 0;
let lastPhase = -1;
let game, rt, Scene0;

try {
  const bundle = require('../scripts/_verify_300frame_bundle.cjs');
  // The bundle has exported Tsubasa2 (let's check)
  // Try export names
  if (global.Tsubasa2 || globalThis.Tsubasa2) {
    game = globalThis.Tsubasa2;
    rt = new (globalThis.HeadlessRuntime || global.HeadlessRuntime)();
  } else {
    // Search for export pattern in bundle
    throw new Error('Need to inspect bundle exports');
  }
} catch (e) {
  console.log('LOAD failed:', e.message);
  process.exit(0);
}
