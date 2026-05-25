# developerprofiles

全中文、单页滚动式个人资料网站（React + TypeScript + Vite + Tailwind CSS）。

## 架构

| 层级 | 位置 |
|------|------|
| **代码托管** | GitHub（唯一源仓库） |
| **站点部署** | **EdgeOne Pages**（国内边缘加速） |

部署步骤：[docs/DEPLOY-EDGEONE-PAGES.md](docs/DEPLOY-EDGEONE-PAGES.md) · 总览：[docs/DEPLOY-CN.md](docs/DEPLOY-CN.md)

## 本地运行

```bash
npm install
npm run dev
```

开发地址：**http://127.0.0.1:3000/developerprofiles/**

## 替换个人资料

编辑 [`src/data/profile.ts`](src/data/profile.ts)。

## 构建

```bash
npm run lint
npm run build:root     # 国内主站（域名根路径，推荐）
npm run build          # GitHub Pages 子路径备用
```

## 部署流程（摘要）

1. 在 GitHub 正常开发：`git push origin master`
2. 按 [docs/DEPLOY-EDGEONE-PAGES.md](docs/DEPLOY-EDGEONE-PAGES.md) 配置 **EdgeOne Pages**（GitHub Actions 或控制台 Git 导入）
3. 对外分享 **EdgeOne 分配的域名**，不要用 GitHub Pages 作为国内主链接

## 文档

[personal-profile-docs-md/](personal-profile-docs-md/)
