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

## 国内线上（与 Webify 同域）

1. 作品集：`npm run build:root`，部署到 CloudBase 托管路径 `/`。
2. student_ddl：`npm run build:portfolio`（`base=/student-ddl/`），将 `dist` 部署到同环境路径 `/student-ddl/`：

   ```bash
   tcb hosting deploy ./dist /student-ddl -e <envId>
   ```

3. 本仓库 `.env.root` 已设置 `VITE_STUDENT_DDL_URL=/student-ddl/`，重新构建作品集后，「预览」即指向同域子应用。

若 DDL 助手使用**独立域名**，在 Webify 构建环境变量中把 `VITE_STUDENT_DDL_URL` 改为完整 URL（如 `https://ddl.example.com/`）。

## student_ddl 返回作品集

student_ddl 页头提供「返回作品集」链接，地址由 `VITE_PORTFOLIO_URL` 配置（默认同域 `/`）。
