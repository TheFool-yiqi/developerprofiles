/**
 * 构建作品集静态站（仅根站，不含子项目子路径）
 */
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

console.log("[build-site] 构建作品集 (build:root)…");
execSync("npm run build:root", { cwd: root, stdio: "inherit", env: process.env });
console.log("[build-site] 完成 → dist/");
