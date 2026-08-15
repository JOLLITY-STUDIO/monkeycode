import os

# Search for 'house'
print("=== Files containing 'house' ===")
for root, dirs, files in os.walk('roms/extracted'):
    for f in files:
        if 'house' in f.lower():
            print(os.path.join(root, f), os.path.getsize(os.path.join(root, f)))

print("\n=== MAP file sample ===")
fn = 'roms/extracted/map_d/4000101_Cat & mouse.map'
d = open(fn, 'rb').read()
print('size', len(d), 'first 40 bytes:', list(d[:40]))

print("\n=== FAP file sample ===")
fn2 = 'roms/extracted/fap_d/2000102_Chessboard.fap'
d2 = open(fn2, 'rb').read()
print('size', len(d2), 'all bytes:', list(d2))

print("\n=== LAP file sample ===")
fn3 = 'roms/extracted/lap_d/1_dat/2000203_Coffee maker.lap'
d3 = open(fn3, 'rb').read()
print('size', len(d3), 'first 40 bytes:', list(d3[:40]))
