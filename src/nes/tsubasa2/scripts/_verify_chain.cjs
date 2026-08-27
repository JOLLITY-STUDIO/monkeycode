/**
 * _verify_chain.cjs — 触发完整链路 boot → Opening(100) → 按 START →
 * TitleMenu(200) → 按 A → Scene14→...→Meeting(300) → 按 START →
 * MatchStart(400) → 启动比赛
 *
 * 输出:
 *   output/chain-verify.json (frame→scene 推进时间线)
 *   output/chain-verify.log (人类可读)
 */
const path = require("path");
require("esbuild").buildSync({
  entryPoints: [path.join(__dirname, "_verify_chain.ts")],
  bundle: true, format: "cjs", platform: "node",
  outfile: path.join(__dirname, "_verify_chain_bundle.cjs"),
  logLevel: "silent",
});
require(path.join(__dirname, "_verify_chain_bundle.cjs"));
