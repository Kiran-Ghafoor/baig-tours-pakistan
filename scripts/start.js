const { spawn } = require("node:child_process");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const frontendDir = path.join(rootDir, "baig-tours");
const backendDir = path.join(rootDir, "backend");

const port = process.env.PORT || "3000";
const backendPort = process.env.BACKEND_PORT || "4000";

const nextBin = path.join(frontendDir, "node_modules", "next", "dist", "bin", "next");

const backend = spawn(process.execPath, ["dist/app.js"], {
  cwd: backendDir,
  env: { ...process.env, BACKEND_PORT: backendPort },
  stdio: "inherit",
});

const frontend = spawn(process.execPath, [nextBin, "start", "-p", port], {
  cwd: frontendDir,
  env: process.env,
  stdio: "inherit",
});

let shuttingDown = false;
function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  if (!backend.killed) backend.kill("SIGTERM");
  if (!frontend.killed) frontend.kill("SIGTERM");
  setTimeout(() => process.exit(code ?? 0), 500);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

backend.on("exit", (code) => {
  if (code && code !== 0) shutdown(code);
});
frontend.on("exit", (code) => {
  if (code && code !== 0) shutdown(code);
});

console.log(`[start] Backend  → ${backendDir} on port ${backendPort}`);
console.log(`[start] Frontend → ${frontendDir} on port ${port}`);
