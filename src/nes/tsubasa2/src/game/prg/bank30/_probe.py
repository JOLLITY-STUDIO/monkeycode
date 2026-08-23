import os
base = os.path.dirname(os.path.abspath(__file__))
f = os.path.join(base, '_full.s')
lines = open(f, encoding='utf8', errors='replace').read().splitlines()
# We know C53C->F30F, C51E->CD0D, C527->CE08, C560->CF72
# These are defined as function-start labels in _full.s. Find them.
targets = ['$F30F', '$CD0D', '$CE08', '$CF72', '$CB99', '$CD3C', '$CB0F', '$CDC9']
out = []
for i, ln in enumerate(lines):
    t = ln.strip()
    for tg in targets:
        if t == '; ' + tg:
            out.append('==== %s (line %d)' % (t, i))
            for l in lines[i:i+70]:
                out.append(l)
            out.append('')
            break
open(os.path.join(base, '_probe_out.txt'), 'w', encoding='utf8').write('\n'.join(out))
print('done', len(out))
