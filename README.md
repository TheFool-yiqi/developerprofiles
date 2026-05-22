# developerprofiles

全中文、单页滚动式个人资料网站（React + TypeScript + Vite + Tailwind CSS）。

## 本地运行

```bash
npm install
npm run dev
```

## 替换个人资料

编辑 [`src/data/profile.ts`](src/data/profile.ts)。可选静态资源：

- `public/avatar.jpg` — 头像，配置 `avatar: "/avatar.jpg"`
- `public/resume.pdf` — 简历，配置 `resumeUrl: "/resume.pdf"`

## 构建与检查

```bash
npm run lint
npm run build
npm run preview
```

预览子路径部署时请访问终端提示的 `/developerprofiles/` 地址。

## 部署（GitHub Pages）

- Vite `base` 已设为 `/developerprofiles/`
- 构建输出目录：`dist`
- 将 `dist` 发布到 GitHub Pages（Actions 或 `gh-pages` 分支）

## 文档

需求与设计说明见 [`personal-profile-docs-md/`](personal-profile-docs-md/)。
