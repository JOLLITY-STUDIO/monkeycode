import { readFileSync } from 'fs';
const c = readFileSync(process.argv[2], 'utf-8');

// Simplest possible test
const re1 = /function CODE_/g;
let m1, c1 = 0;
while ((m1 = re1.exec(c)) !== null) { c1++; }
console.log('function CODE_:', c1);

// Match return [ ... ];
const re2 = /return \[/g;
let m2, c2 = 0;
while ((m2 = re2.exec(c)) !== null) { c2++; }
console.log('return [:', c2);

// Full test - simpler
const re3 = /function (CODE_[\w_$]+)/g;
let m3, c3 = 0;
while ((m3 = re3.exec(c)) !== null) {
  console.log('  func:', m3[1]);
  c3++;
}
console.log('total funcs:', c3);
