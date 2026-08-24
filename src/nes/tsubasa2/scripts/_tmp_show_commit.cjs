const { execSync } = require('child_process');
const out = execSync('git show --name-status HEAD', { encoding: 'utf8' });
const all = out.split(/\r?\n/).filter(Boolean);
// skip first 4 lines (commit hash, author, date, blank)
const fileLines = all.slice(4);
let adds = 0, dels = 0, mods = 0, totalFiles = 0;
const addedFiles = [];
for (const l of fileLines) {
  // first tab char is the status
  const tab = l.indexOf('\t');
  if (tab < 0) continue;
  const status = l.slice(0, tab);
  const file = l.slice(tab + 1);
  totalFiles++;
  if (status.startsWith('A') || status === '??') { adds++; addedFiles.push(file); }
  else if (status.startsWith('D')) dels++;
  else if (status.startsWith('M')) mods++;
}
console.log('total files in commit:', totalFiles);
console.log('added:', adds, 'deleted:', dels, 'modified:', mods);
console.log('first 5 added:', addedFiles.slice(0, 5));
console.log('last 5 added:', addedFiles.slice(-5));
const bank67 = addedFiles.filter(f => /bank[67]|bank6|bank7/.test(f));
console.log('bank6/7 added:', bank67.length);
console.log('sample bank67:', bank67.slice(0, 3));
