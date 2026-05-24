/**
 * 构建作品集 + 将 student_ddl、startrail_notes、traveler_weather 产出合并到 dist 子路径（Webify 单次部署）
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: "inherit", env: process.env });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    if (fs.statSync(from).isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function resolveProjectDir(localDir, tmpDir, repo, branch, markerPath) {
  if (fs.existsSync(markerPath)) {
    console.log(`[build-site] 使用本地 ${localDir} …`);
    return localDir;
  }
  console.log(`[build-site] 克隆 ${path.basename(localDir)} (${branch})…`);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(tmpDir), { recursive: true });
  run(`git clone --depth 1 -b ${branch} ${repo} ${tmpDir}`, root);
  return tmpDir;
}

function buildSubApp(projectDir, buildScript) {
  if (fs.existsSync(path.join(projectDir, "package-lock.json"))) {
    run("npm ci", projectDir);
  } else {
    run("npm install", projectDir);
  }
  run(`npm run ${buildScript}`, projectDir);
}

console.log("[build-site] 1/5 构建作品集 (build:root)…");
run("npm run build:root", root);

const ddlLocal = path.resolve(root, "../student_ddl");
const ddlTmp = path.join(root, ".tmp", "student_ddl");
const ddlRepo =
  process.env.STUDENT_DDL_REPO ??
  "https://github.com/TheFool-yiqi/student_ddl.git";
const ddlBranch = process.env.STUDENT_DDL_BRANCH ?? "main";

const ddlDir = resolveProjectDir(
  ddlLocal,
  ddlTmp,
  ddlRepo,
  ddlBranch,
  path.join(ddlLocal, "src", "main.tsx"),
);

console.log("[build-site] 2/5 构建 student_ddl (build:portfolio)…");
buildSubApp(ddlDir, "build:portfolio");
copyDir(
  path.join(ddlDir, "dist"),
  path.join(root, "dist", "student-ddl"),
);

const notesLocal = path.resolve(root, "../startrail_notes");
const notesTmp = path.join(root, ".tmp", "startrail_notes");
const notesRepo =
  process.env.STARTRAIL_NOTES_REPO ??
  "https://github.com/TheFool-yiqi/startrail_notes.git";
const notesBranch = process.env.STARTRAIL_NOTES_BRANCH ?? "main";

const notesDir = resolveProjectDir(
  notesLocal,
  notesTmp,
  notesRepo,
  notesBranch,
  path.join(notesLocal, "src", "main.tsx"),
);

console.log("[build-site] 3/5 构建 startrail_notes (build:portfolio)…");
buildSubApp(notesDir, "build:portfolio");
copyDir(
  path.join(notesDir, "dist"),
  path.join(root, "dist", "startrail-notes"),
);

const weatherLocal = path.resolve(root, "../traveler_weather");
const weatherTmp = path.join(root, ".tmp", "traveler_weather");
const weatherRepo =
  process.env.TRAVELER_WEATHER_REPO ??
  "https://github.com/TheFool-yiqi/traveler_weather.git";
const weatherBranch = process.env.TRAVELER_WEATHER_BRANCH ?? "main";

const weatherDir = resolveProjectDir(
  weatherLocal,
  weatherTmp,
  weatherRepo,
  weatherBranch,
  path.join(weatherLocal, "src", "main.tsx"),
);

console.log("[build-site] 4/5 构建 traveler_weather (build:portfolio)…");
buildSubApp(weatherDir, "build:portfolio");
copyDir(
  path.join(weatherDir, "dist"),
  path.join(root, "dist", "traveler-weather"),
);

console.log("[build-site] 5/5 合并完成");
console.log(
  "[build-site] 完成 → dist/、dist/student-ddl/、dist/startrail-notes/、dist/traveler-weather/",
);
