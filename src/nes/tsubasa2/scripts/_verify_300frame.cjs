const path = require("path");
require("esbuild").buildSync({
  entryPoints: [path.join(__dirname, "_verify_300frame.ts")],
  bundle: true, format: "cjs", platform: "node",
  outfile: path.join(__dirname, "_verify_300frame_bundle.cjs"),
  logLevel: "silent",
});
require(path.join(__dirname, "_verify_300frame_bundle.cjs"));
