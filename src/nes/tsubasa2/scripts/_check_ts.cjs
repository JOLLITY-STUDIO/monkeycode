/* 全量 TS 诊断（等价 tsc --noEmit），node scripts/_check_ts.cjs */
let ts;
try {
  ts = require('typescript');
} catch {
  ts = require('d:/Users/yangyp/AppData/Roaming/nvm/v18.17.0/node_modules/typescript');
}
const path = require('path');

const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'tsconfig.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) {
  console.error('readConfigFile error', configFile.error);
  process.exit(2);
}
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const diags = ts.getPreEmitDiagnostics(program);

const fmt = ts.formatDiagnosticsWithColorAndContext(diags, {
  getCanonicalFileName: (f) => f,
  getCurrentDirectory: () => root,
  getNewLine: () => '\n',
});
console.log(fmt);
console.log(`\nTOTAL=${diags.length}`);
process.exit(diags.length ? 1 : 0);
