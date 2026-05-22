# 个人资料网站技术文档

> 项目名称：个人资料网站（Personal Profile Website）  
> 仓库 / 包名：`developerprofiles`  
> 当前版本：v0.1  
> 技术栈：React + TypeScript + Vite + Tailwind CSS + framer-motion  
> 目标形态：单页滚动式个人资料网站  
> 部署：GitHub Pages 子路径 `/developerprofiles/`  
> 关联文档：[REQUIREMENTS.md](./REQUIREMENTS.md) · [AGENTS.md](./AGENTS.md)

---

## 1. 首版技术冻结

| 项 | 约定 |
|---|---|
| 语言 | TypeScript（`react-ts` 模板） |
| 样式 | Tailwind CSS v4 + `@tailwindcss/vite` |
| 图标 | `lucide-react` |
| 动画 | `framer-motion`（模块进入动画；hover 仍用 CSS） |
| 路由 | 无 React Router（单页锚点） |
| 数据 | `src/data/profile.ts` + 导出类型 |
| 移动导航 | 汉堡 + 抽屉（React state 控制） |
| 包管理 | 仅 npm |
| 代码质量 | ESLint + Prettier |
| 部署 base | `'/developerprofiles/'` |

---

## 2. 技术选型

### 2.1 核心依赖

| 依赖 | 用途 | 必需 |
|---|---|:---:|
| react / react-dom | UI | 是 |
| vite | 构建 | 是 |
| typescript | 类型 | 是 |
| tailwindcss / @tailwindcss/vite | 样式 | 是 |
| lucide-react | 图标 | 是 |
| framer-motion | 轻量进入动画 | 是 |

### 2.2 开发依赖（推荐）

| 依赖 | 用途 |
|---|---|
| eslint | 代码检查 |
| typescript-eslint | TS ESLint |
| prettier | 格式化 |
| eslint-config-prettier | 与 ESLint 协同 |

### 2.3 首版不引入

Redux、Zustand、React Router、Next.js、后端、数据库、大型 UI 库、CSS-in-JS。

---

## 3. 项目初始化

### 3.1 创建项目

```bash
npm create vite@latest developerprofiles -- --template react-ts
cd developerprofiles
npm install
```

### 3.2 安装样式与 UI

```bash
npm install tailwindcss @tailwindcss/vite lucide-react framer-motion
```

### 3.3 安装代码质量工具

```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh prettier eslint-config-prettier
```

### 3.4 package.json scripts（建议）

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

---

## 4. 目录结构

```text
developerprofiles/
  public/
    avatar.jpg          # 可选，后期添加
    resume.pdf          # 可选，后期添加
    favicon.ico
  src/
    assets/
    components/
      Navbar.tsx
      MobileDrawer.tsx
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Contact.tsx
      Footer.tsx
      SectionHeading.tsx
      ProjectCard.tsx
      SkillTag.tsx
      ExperienceItem.tsx
    data/
      profile.ts
      types.ts
    utils/
      sortExperience.ts
      formatPeriod.ts
      sectionVisibility.ts
    App.tsx
    index.css
    main.tsx
  index.html
  package.json
  vite.config.ts
  eslint.config.js
  README.md
```

---

## 5. 数据模型设计

### 5.1 types.ts

```ts
export type ExperienceType = "work" | "internship" | "education" | "project";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface Project {
  title: string;
  description: string;
  tech?: string[];
  link?: string;
  repo?: string;
  image?: string;
}

export interface Experience {
  type: ExperienceType;
  title: string;
  company: string;
  startDate: string; // YYYY-MM
  endDate: string;   // YYYY-MM | present
  description: string;
}

export interface Profile {
  name: string;
  role: string;
  location?: string;
  email: string;
  avatar?: string;
  resumeUrl?: string;
  intro: string;
  about: string;
  education?: string;
  skills: string[];
  projects?: Project[];
  experience?: Experience[];
  socials?: SocialLinks;
}
```

### 5.2 经历类型中文标签

```ts
export const experienceTypeLabels: Record<ExperienceType, string> = {
  work: "工作",
  internship: "实习",
  education: "教育",
  project: "项目",
};
```

### 5.3 profile.ts 占位示例（首版）

```ts
import type { Profile } from "./types";

export const profile: Profile = {
  name: "你的名字",
  role: "前端开发工程师",
  location: "城市，国家",
  email: "your@email.com",
  // avatar: "/avatar.jpg",
  // resumeUrl: "/resume.pdf",
  intro: "这里是首屏简短介绍（占位文案）。",
  about: "这里是详细介绍，可包含背景、方向与优势（占位文案）。",
  education: "某某大学 · 计算机相关（可选，占位）",
  skills: ["React", "TypeScript", "Tailwind CSS", "Vite", "Git"],
  projects: [
    {
      title: "示例项目",
      description: "占位项目描述，上线前替换为真实项目。",
      tech: ["React", "TypeScript"],
      repo: "https://github.com/yourname/example",
    },
  ],
  experience: [
    {
      type: "internship",
      title: "前端实习生",
      company: "示例公司",
      startDate: "2024-06",
      endDate: "2024-12",
      description: "占位经历描述。",
    },
  ],
  socials: {
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
  },
};
```

首版允许 `projects: []` 或省略以验证「隐藏模块」；上线前替换为真实数据。

### 5.4 排序规则（sortExperience.ts）

1. 将 `endDate === 'present'` 视为 `9999-12` 以便排在最前（进行中优先）。
2. 按 `startDate` **字符串降序**（`YYYY-MM` 格式可直接比较）。
3. 若 `startDate` 相同，按 `endDate` 降序。

```ts
export function sortExperience(items: Experience[]): Experience[] {
  const normalizeEnd = (end: string) =>
    end === "present" ? "9999-12" : end;
  return [...items].sort((a, b) => {
    const startCmp = b.startDate.localeCompare(a.startDate);
    if (startCmp !== 0) return startCmp;
    return normalizeEnd(b.endDate).localeCompare(normalizeEnd(a.endDate));
  });
}
```

### 5.5 展示用时间（formatPeriod.ts）

```ts
// 2024-06 + present → "2024-06 — 至今"
```

### 5.6 模块可见性（sectionVisibility.ts）

```ts
export const hasProjects = (p: Profile) => (p.projects?.length ?? 0) > 0;
export const hasExperience = (p: Profile) => (p.experience?.length ?? 0) > 0;
export const hasSkills = (p: Profile) => (p.skills?.length ?? 0) > 0;
```

`App.tsx` 根据上述结果条件渲染区块；`Navbar` 导航项同步过滤。

### 5.7 数据使用规范

1. 禁止在组件中硬编码姓名、邮箱、外链等。
2. 列表必须 `map` 渲染，`key` 稳定（如 `title + startDate`）。
3. 空字段隐藏对应 UI，不渲染空按钮。

---

## 6. 关键组件设计

> 对应需求：[REQUIREMENTS.md §7](./REQUIREMENTS.md)。

### 6.1 Navbar + MobileDrawer

- **Navbar**：桌面 `nav` 横排；`< md` 显示菜单按钮。
- **MobileDrawer**：`framer-motion` 滑入面板 + 遮罩；点击链接或遮罩关闭。
- 导航项根据 `sectionVisibility` 动态生成（无 Projects 则无「项目」）。
- 锚点：`#home` `#about` `#skills` `#projects` `#experience` `#contact`。

```ts
const allNavItems = [
  { label: "首页", href: "#home" },
  { label: "关于", href: "#about" },
  { label: "技能", href: "#skills" },
  { label: "项目", href: "#projects", show: hasProjects },
  { label: "经历", href: "#experience", show: hasExperience },
  { label: "联系", href: "#contact" },
];
```

### 6.2 Hero

- 数据：`name`, `role`, `intro`, `avatar?`, `resumeUrl?`, `socials`, `email`
- 社交：**仅 Hero** 展示 GitHub / LinkedIn / Email 图标（Contact 可重复邮箱与外链列表，职责见下）
- `framer-motion`：首屏区块 `fadeIn` + 轻微 `y` 位移
- 无 `avatar`：圆形占位（姓名首字）
- 无 `resumeUrl`：隐藏「下载简历」

### 6.3 About

- `about`, `location?`, `education?`

### 6.4 Skills

- `profile.skills`；空则隐藏（与需求一致）

### 6.5 Projects

- 条件渲染：`hasProjects(profile)`
- `ProjectCard`：按钮「预览」「源码」

### 6.6 Experience

- 条件渲染：`hasExperience(profile)`
- `ExperienceItem`：显示 `experienceTypeLabels[type]` + `formatPeriod(...)`
- 列表使用 `sortExperience(profile.experience!)`

### 6.7 Contact

- **仅链接**：`mailto:email`、socials 各项
- 无表单、无 CTA 提交按钮

### 6.8 Footer

- `new Date().getFullYear()` + `profile.name`

---

## 7. Hero 与 Contact 职责划分

| 内容 | Hero | Contact |
|---|---|---|
| Email 图标/链接 | ✓ | ✓（文字链接即可） |
| GitHub / LinkedIn | ✓ 图标 | ✓ 列表链接 |
| 个人网站 | 可选图标 | ✓ |
| 下载简历 | ✓ 按钮 | ✗ |

避免重复堆砌：Contact 以文字链为主，Hero 以图标与主 CTA 为主。

---

## 8. 样式方案

### 8.1 index.css

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

### 8.2 vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/developerprofiles/",
  plugins: [react(), tailwindcss()],
});
```

### 8.3 视觉基调（深色）

- 背景：`bg-neutral-950`
- 主文字：`text-white`
- 次级：`text-neutral-400`
- 强调：`text-cyan-400` / `bg-cyan-400`
- 卡片：`bg-white/5` + `border-white/10`
- 布局：`max-w-6xl mx-auto px-6`，区块 `py-20 md:py-24`

### 8.4 framer-motion 使用约束

- 每个 `section` 可使用 `motion.section` + `whileInView` 一次淡入
- 禁止全页连续复杂动画
- 抽屉使用 `AnimatePresence`

---

## 9. 可访问性与 SEO

### 9.1 a11y

- 全页单一 `h1`（Hero 姓名）
- 模块 `section` + `aria-labelledby`
- 图标链接 `aria-label`（中文，如「打开 GitHub」）
- 抽屉打开时焦点陷阱（可选增强）

### 9.2 index.html（v0.1 最小集）

```html
<title>你的名字 - 个人资料</title>
<meta name="description" content="个人资料网站，展示技能、项目与联系方式。" />
<meta property="og:title" content="你的名字 - 个人资料" />
<meta property="og:description" content="..." />
<link rel="icon" href="/developerprofiles/favicon.ico" />
```

有头像后可设 `og:image` 为绝对 URL。

---

## 10. 构建、预览与部署

```bash
npm run dev          # 开发（根路径 /）
npm run build
npm run preview      # 验证 base 子路径资源
```

### 10.1 GitHub Pages

1. `vite.config.ts` 中 `base: '/developerprofiles/'`
2. GitHub Actions 或 `gh-pages` 发布 `dist`
3. 仓库设置 Pages 源为 `gh-pages` 或 Actions 产物
4. 访问：`https://<username>.github.io/developerprofiles/`

### 10.2 静态资源路径

- `public/avatar.jpg` → 配置 `avatar: "/avatar.jpg"`（Vite 会加 base 前缀于构建引用；`<img src>` 使用 `import.meta.env.BASE_URL + 'avatar.jpg'` 或放在 public 根相对 base）

**推荐写法**：

```tsx
const avatarSrc = profile.avatar
  ? `${import.meta.env.BASE_URL}${profile.avatar.replace(/^\//, "")}`
  : undefined;
```

简历同理：`resumeUrl: "/resume.pdf"`。

---

## 11. 测试策略

### 11.1 手动测试

- 子路径下首页、CSS、JS、图片、PDF 均可加载
- 抽屉开闭、锚点滚动
- 空 `projects` / `experience` 时模块与导航隐藏
- 控制台无报错

### 11.2 提交前

```bash
npm run lint
npm run build
npm run preview
```

### 11.3 Lighthouse

Performance ≥ 85，Accessibility ≥ 90（见需求文档）。

---

## 12. 安全与合规

1. 不复制参考站源码与素材。  
2. 不在仓库提交 API 密钥。  
3. 外链为用户配置的可信地址。  

---

## 13. 首版开发任务拆分

### 13.1 基础工程

- [ ] Vite react-ts + Tailwind + base 路径
- [ ] ESLint + Prettier + `npm run lint`
- [ ] `types.ts` + 占位 `profile.ts`
- [ ] `utils/*` 排序与可见性

### 13.2 组件

- [ ] Navbar + MobileDrawer
- [ ] Hero、About、Skills、Projects、Experience、Contact、Footer
- [ ] 子组件 ProjectCard、SkillTag、ExperienceItem、SectionHeading

### 13.3 联调

- [ ] 条件渲染与导航联动
- [ ] framer-motion 进入动画
- [ ] 响应式与参考站结构对照

### 13.4 发布

- [ ] README（运行 / 替换资料 / 部署）
- [ ] GitHub Pages 部署
- [ ] Lighthouse 抽检

---

## 14. Git 提交建议

```text
feat: init developerprofiles with vite react-ts
feat: add profile types and placeholder data
feat: add mobile drawer navigation
fix: hide projects section when empty
chore: configure eslint and prettier
```
