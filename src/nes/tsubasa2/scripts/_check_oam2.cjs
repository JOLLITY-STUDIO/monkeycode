// _check_oam2.cjs - quick check using existing bundle's Tsubasa2 etc
const path = require('path');
process.chdir('d:/studio/github/monkeycode/src/nes/tsubasa2');
const { HeadlessRuntime } = require('./_verify_300frame_bundle.cjs');
// Find a way... actually let's just modify _verify to also dump shadow oam
