// 临时编译检查：bank7-streams 引用是否存在
const fs = require('fs');
const path = require('path');
const ts = require(path.join(__dirname, '..', 'node_modules', 'typescript'));

const configPath = path.join(__dirname, '..', 'tsconfig.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.join(__dirname, '..'));

// 检查 bank7-streams 是否被引用
const refFile = 'src/game/prg/code/system/RenderingPrimitivesService.ts';
const refSrc = fs.readFileSync(path.join(__dirname, '..', refFile), 'utf8');
console.log('refs bank7-streams:', refSrc.includes('bank7-streams'));
console.log('file exists:', fs.existsSync(path.join(__dirname, '..', 'src/game/prg/data/scene/bank7-streams.ts')));

// 编译
const program = ts.createProgram(parsed.fileNames, {
  ...parsed.options,
  noEmit: true,
});
const diags = ts.getPreEmitDiagnostics(program);
const errs = diags.filter(d => d.category === ts.DiagnosticCategory.Error);
console.log('total diags:', diags.length, 'errors:', errs.length);
for (const e of errs.slice(0, 20)) {
  const msg = ts.flattenDiagnosticMessageText(e.messageText, '\n');
  const f = e.file ? e.file.fileName : '';
  console.log('  ', f, e.start, msg.slice(0, 120));
}
