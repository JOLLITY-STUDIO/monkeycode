import time, os, zipfile, sys

p = r"D:\dev\jdk21.zip"
t0 = time.time()
prev = -1
while time.time() - t0 < 600:
    if not os.path.exists(p):
        print("no-file"); time.sleep(5); continue
    s = os.path.getsize(p)
    if s != prev:
        prev = s
        print("size=%d MB=%.1f" % (s, s / 1048576), flush=True)
    if zipfile.is_zipfile(p):
        print("ZIP_OK size=%d" % s, flush=True)
        sys.exit(0)
    time.sleep(5)
print("TIMEOUT size=%d" % prev, flush=True)
sys.exit(1)
