# 作品集 ↔ 子项目联动

个人简历站「项目」区包含三个作品，其中 **student_ddl**、**startrail_notes** 通过同域子路径预览。

## 本地联调

终端 1（作品集，端口 3000）：

```bash
cd developerprofiles
npm run dev
```

终端 2（DDL 助手，端口 3001）：

```bash
cd ../student_ddl
npm run dev
```

终端 3（星辉笔记，端口 3002）：

```bash
cd ../startrail_notes
npm run dev
```

浏览器打开作品集 → 项目 → 各卡片 **预览**：

| 项目 | 默认本地地址 |
|------|----------------|
| 学生 DDL 助手 | `http://127.0.0.1:3001/` |
| 星辉笔记 | `http://127.0.0.1:3002/` |

## 国内线上（Webify 推荐：一次构建、一次部署）

在 **developerprofiles** 仓库根目录执行（CI 已配置为 `npm run build:site`）：

```bash
npm run build:site
```

会生成：

- `dist/` — 作品集（根路径 `/`）
- `dist/student-ddl/` — DDL 助手（`/student-ddl/`）
- `dist/startrail-notes/` — 星辉笔记（`/startrail-notes/`）

Webify 将 `dist` 部署到 `/` 后，「预览」即可用，**无需单独部署子项目仓库**。

控制台构建命令请设为 **`npm run build:site`**（与 `cloudbaserc.json` 一致），不要只用 `build:root`。

环境变量（`cloudbaserc.json` 已包含）：

| 变量 | 值 |
|------|-----|
| `VITE_BASE` | `/` |
| `VITE_STUDENT_DDL_URL` | `/student-ddl/` |
| `VITE_STARTRAIL_NOTES_URL` | `/startrail-notes/` |

若子项目使用**独立域名**，在 Webify 环境变量改为完整 URL，并改回 `npm run build:root` 构建作品集。

## 子项目返回作品集

- **student_ddl** 页头「返回作品集」：`VITE_PORTFOLIO_URL`（默认同域 `/`）
- **startrail_notes** 页头「返回作品集」：同上

## 项目封面图

封面位于 `public/projects/`：

- `developerprofiles-cover.png`
- `student-ddl-cover.png`
- `startrail-notes-cover.png`

在 `src/data/profile.ts` 的 `image` 字段引用。
