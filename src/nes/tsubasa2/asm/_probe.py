import os
out = []
base = os.path.dirname(os.path.abspath(__file__))
f = os.path.join(base, 'bank30', '_full.s')
lines = open(f, encoding='utf8', errors='replace').read().splitlines()
for i, ln in enumerate(lines):
    t = ln.strip()
    if 'CB99' in t or 'CD0D' in t or 'CE08' in t or 'CF72' in t or 'F30F' in t:
        out.append('%d: %s' % (i, t))
open(os.path.join(base, '_probe_out.txt'), 'w', encoding='utf8').write('\n'.join(out))
print('done', len(out))
