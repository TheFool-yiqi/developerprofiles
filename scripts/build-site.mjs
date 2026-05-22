/**
 * 构建作品集 + 将 student_ddl 产出合并到 dist/student-ddl/（Webify 单次部署即可访问预览）
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ddlLocal = path.resolve(root, "../student_ddl");
const ddlTmp = path.join(root, ".tmp", "student_ddl");
const ddlRepo =
  process.env.STUDENT_DDL_REPO ??
  "https://github.com/TheFool-yiqi/student_ddl.git";
const ddlBranch = process.env.STUDENT_DDL_BRANCH ?? "main";

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

console.log("[build-site] 1/3 构建作品集 (build:root)…");
run("npm run build:root", root);

let ddlDir = ddlLocal;
if (!fs.existsSync(path.join(ddlLocal, "src", "main.tsx"))) {
  console.log(
    `[build-site] 2/3 克隆 student_ddl (${ddlBranch})…`,
  );
  fs.rmSync(ddlTmp, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(ddlTmp), { recursive: true });
  run(`git clone --depth 1 -b ${ddlBranch} ${ddlRepo} ${ddlTmp}`, root);
  ddlDir = ddlTmp;
} else {
  console.log("[build-site] 2/3 使用本地 ../student_ddl …");
}

console.log("[build-site] 3/3 构建 student_ddl (build:portfolio)…");
if (fs.existsSync(path.join(ddlDir, "package-lock.json"))) {
  run("npm ci", ddlDir);
} else {
  run("npm install", ddlDir);
}
run("npm run build:portfolio", ddlDir);

const ddlDist = path.join(ddlDir, "dist");
const target = path.join(root, "dist", "student-ddl");
fs.rmSync(target, { recursive: true, force: true });
copyDir(ddlDist, target);

console.log("[build-site] 完成 → dist/ 与 dist/student-ddl/");
