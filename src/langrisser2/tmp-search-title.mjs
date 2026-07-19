import fs from 'fs';
const s = fs.readFileSync('game-old/data/TitleScreenData.ts', 'utf8');
const lines = s.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/export const/.test(lines[i])) {
    console.log(i + 1, lines[i].slice(0, 120));
  }
}
