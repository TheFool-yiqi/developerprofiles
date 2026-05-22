# developerprofiles

全中文、单页滚动式个人资料网站（React + TypeScript + Vite + Tailwind CSS）。

## 架构

| 层级 | 位置 |
|------|------|
| **代码托管** | GitHub（唯一源仓库） |
| **站点部署** | 国内静态托管（腾讯云 Webify / 阿里云 OSS+CDN 等） |

国内访问部署说明：[docs/DEPLOY-CN.md](docs/DEPLOY-CN.md)

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
2. 国内平台 **关联该 GitHub 仓库**（如腾讯云 Webify），或本地 `build:root` 后上传 `dist/` 到 OSS/COS
3. 对外分享 **国内托管域名**，不要用 GitHub Pages 作为国内主链接

详见 [docs/DEPLOY-CN.md](docs/DEPLOY-CN.md)

## 文档

[personal-profile-docs-md/](personal-profile-docs-md/)
