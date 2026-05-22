# developerprofiles

全中文、单页滚动式个人资料网站（React + TypeScript + Vite + Tailwind CSS）。

> **主要展示在中国大陆**：国内访问请优先使用 **Gitee Pages** 或国内云静态托管，详见 [docs/DEPLOY-CN.md](docs/DEPLOY-CN.md)。

## 本地运行

```bash
npm install
npm run dev
```

开发地址：**http://127.0.0.1:3000/developerprofiles/**（须带 `base` 子路径）。

## 替换个人资料

编辑 [`src/data/profile.ts`](src/data/profile.ts)。可选静态资源：

- `public/avatar.png` — 头像
- `public/resume.pdf` — 简历，并设置 `resumeUrl: "/resume.pdf"`

## 构建与检查

```bash
npm run lint
npm run build:gitee    # 国内 Gitee Pages（推荐）
npm run build:root     # 独立域名根路径
npm run preview:gitee
```

## 部署（国内优先）

| 场景 | 命令 | 说明 |
|------|------|------|
| **国内主站** | `npm run build:gitee` | 发布 `dist/` 到 [Gitee Pages](https://gitee.com/) |
| 独立域名 | `npm run build:root` | 腾讯云 / 阿里云静态托管 + CDN |
| 备用 | `npm run build` | GitHub Pages（国内访问不稳定） |

完整步骤：[docs/DEPLOY-CN.md](docs/DEPLOY-CN.md)

## 文档

需求与设计：[personal-profile-docs-md/](personal-profile-docs-md/)
