# 作品集 ↔ student_ddl 联动

个人简历站（本仓库）「项目」区第二个卡片指向 **学生 DDL 助手**。

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

浏览器打开作品集 → 项目 → 第二个卡片 **预览**，应跳转到 `http://127.0.0.1:3001/`。

## 国内线上（Webify 推荐：一次构建、一次部署）

在 **developerprofiles** 仓库根目录执行（CI 已配置为 `npm run build:site`）：

```bash
npm run build:site
```

会生成：

- `dist/` — 作品集（根路径 `/`）
- `dist/student-ddl/` — DDL 助手（`/student-ddl/`）

Webify 将 `dist` 部署到 `/` 后，「预览」即可用，**无需单独部署第二个仓库**。

控制台构建命令请设为 **`npm run build:site`**（与 `cloudbaserc.json` 一致），不要只用 `build:root`。

若 DDL 使用**独立域名**，在 Webify 环境变量把 `VITE_STUDENT_DDL_URL` 改为完整 URL，并改回 `npm run build:root` 构建。

## student_ddl 返回作品集

student_ddl 页头提供「返回作品集」链接，地址由 `VITE_PORTFOLIO_URL` 配置（默认同域 `/`）。
