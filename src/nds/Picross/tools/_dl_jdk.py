import os, sys, time, zipfile, urllib.request

URL = "https://mirrors.tuna.tsinghua.edu.cn/Adoptium/21/jdk/x64/windows/OpenJDK21U-jdk_x64_windows_hotspot_21.0.12_8.zip"
P = r"D:\dev\jdk21.zip"
LOG = r"D:\dev\_jdk_dl.log"

def log(msg):
    with open(LOG, "a", encoding="utf-8") as f:
        f.write("%s %s\n" % (time.strftime("%H:%M:%S"), msg))

def download(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r, open(path, "wb") as out:
        total = int(r.headers.get("Content-Length") or 0)
        log("start total=%d" % total)
        done = 0
        while True:
            chunk = r.read(1 << 16)
            if not chunk:
                break
            out.write(chunk)
            done += len(chunk)
            if done // (1 << 20) % 10 == 0:
                log("downloaded %d MB" % (done >> 20))
    return done

if os.path.exists(P):
    os.remove(P)
try:
    done = download(URL, P)
    log("download done %d" % done)
    log("zip_ok=%s" % zipfile.is_zipfile(P))
except Exception as e:
    log("ERROR %r" % e)
    sys.exit(1)
