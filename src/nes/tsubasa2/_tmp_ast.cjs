const ts = require('typescript');
const fs = require('fs');
const file = 'src/core/ppu/index.ts';
const src = fs.readFileSync(file, 'utf8');
const sf = ts.createSourceFile(file, src, ts.ScriptTarget.ES2020, true);
console.log('statements:', sf.statements.length);
for (const st of sf.statements) {
  console.log('stmt kind:', ts.SyntaxKind[st.kind], 'pos:', st.pos, 'end:', st.end);
  if (st.kind === ts.SyntaxKind.ClassDeclaration) {
    console.log('  class name:', st.name ? st.name.text : '(anon)');
    console.log('  members:', st.members.length);
    for (const m of st.members) {
      console.log('    member kind:', ts.SyntaxKind[m.kind], 'name:', m.name ? m.name.getText(sf) : '(none)', 'pos:', m.pos);
    }
  }
}
