fn = 'roms/extracted/fap_d/3100310_house.fap'
d = open(fn, 'rb').read()
print('house.fap size', len(d))
print('all bytes:', list(d))

h, w = d[0], d[1]
print('h,w =', h, w)
body = d[6:6+h*w] if len(d) >= 6+h*w else d[6:]
print('body len', len(body))
if len(body) == h*w:
    print('unique vals:', sorted(set(body)))
    for y in range(h):
        row = ''
        for x in range(w):
            v = body[y*w+x]
            row += {0: '.', 1: '#', 2: '+', 3: '-', 4: '|'}.get(v, '?')
        print(row)
else:
    print('NOT a h*w grid. tail:', list(d[-20:]))
