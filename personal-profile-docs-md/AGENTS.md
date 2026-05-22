# AGENTS.md

> 本文档约束 AI 编程助手、自动化 Agent 与协作者在本仓库中的行为。  
> 项目：React + TypeScript + Vite + Tailwind CSS 个人资料网站（`developerprofiles`）  
> 必读：[REQUIREMENTS.md](./REQUIREMENTS.md) · [TECHNICAL_DESIGN.md](./TECHNICAL_DESIGN.md)

---

## 1. 项目原则

### 1.1 核心目标

1. 构建**全中文**单页滚动式个人资料网站。  
2. 使用 **TypeScript** + React 组件化实现。  
3. 个人资料集中在 `src/data/profile.ts`。  
4. 对照参考站验收**布局结构**，禁止抄袭代码、素材与文案。  
5. 首版使用**占位数据**；头像、简历 PDF 可后期放入 `public/`。  
6. 部署目标：**代码托管在 GitHub**；**站点部署在国内静态托管**（`build:root`）；GitHub Pages 仅备用。见 [docs/DEPLOY-CN.md](../docs/DEPLOY-CN.md)。

### 1.2 参考网站边界

**允许**：布局结构、信息组织、模块顺序、交互思路。  
**禁止**：复制 HTML/CSS/JS、图片、Logo、原文案、品牌冒充。

参考站：https://aashay-dev-ed.develop.my.site.com/AashayWase/s/

---

## 2. 首版冻结（与需求一致）

| 项 | 约定 |
|---|---|
| 语言 | TypeScript |
| 文案 | 全中文 |
| 移动导航 | 汉堡 + 抽屉 |
| Experience | 可选；`type`: work / internship / education / project；`YYYY-MM` 排序 |
| Projects 为空 | 隐藏模块 + 导航项 |
| Experience 为空 | 隐藏模块 + 导航项 |
| Contact | 仅链接，无表单 |
| education | `profile.education` 可选字段 |
| framer-motion | 安装；仅轻量进入动画 + 抽屉 |
| 包管理器 | 仅 npm |
| base | `'/developerprofiles/'` |

---

## 3. 技术栈约束

### 3.1 必须使用

- React、Vite、TypeScript、Tailwind CSS  
- `lucide-react`、`framer-motion`  

### 3.2 必须使用（工程）

- ESLint + Prettier（`npm run lint` 须可通过）

### 3.3 默认不要使用

除非用户明确要求：Redux、Zustand、React Router、Next.js、后端、数据库、大型 UI 库、CSS-in-JS、jQuery。

---

## 4. 目录结构

```text
developerprofiles/
  public/
    avatar.jpg      # 可选
    resume.pdf      # 可选
  src/
    components/
    data/
      profile.ts
      types.ts
    utils/
    App.tsx
    main.tsx
    index.css
  vite.config.ts    # base: '/developerprofiles/'
  README.md
```

规则：

1. 页面模块 → `src/components/`。  
2. 数据与类型 → `src/data/`。  
3. 排序、格式化、模块显隐 → `src/utils/`。  
4. 勿在根目录堆放无关文件。

---

## 5. 数据配置约束

### 5.1 单一数据源

以 `export const profile: Profile` 为准，类型定义在 `types.ts`。

### 5.2 禁止重复硬编码

不得在多个组件重复写：姓名、邮箱、头像路径、外链、技能/项目/经历数组。

### 5.3 空状态（必须遵守）

| 条件 | 行为 |
|---|---|
| `projects` 空或未定义 | 不渲染 Projects；导航无「项目」 |
| `experience` 空或未定义 | 不渲染 Experience；导航无「经历」 |
| `skills` 空 | 不渲染 Skills（首版） |
| `resumeUrl` 空 | 无「下载简历」按钮 |
| `avatar` 空 | 占位头像，不报错 |
| `socials.*` 空 | 隐藏对应链接 |
| `education` 空 | About 不显示教育行 |

### 5.4 经历字段

- 必填：`type`, `title`, `company`, `startDate`, `endDate`, `description`  
- `startDate` / `endDate`：`YYYY-MM`；进行中用 `present`  
- 展示前必须 `sortExperience()`（见技术文档）

### 5.5 项目按钮

- `link` → 「预览」  
- `repo` → 「源码」  
- 无链接则不渲染按钮

---

## 6. 组件规范

| 组件 | 职责 |
|---|---|
| `Navbar` | 顶栏 + 触发抽屉 |
| `MobileDrawer` | 移动端导航抽屉 |
| `Hero` | 首屏、主 CTA、社交图标 |
| `About` | 简介、所在地、education |
| `Skills` | 技能标签 |
| `Projects` | 项目列表（条件渲染） |
| `Experience` | 经历列表（条件渲染） |
| `Contact` | 仅链接 |
| `Footer` | 版权 |
| `ProjectCard` / `SkillTag` / `ExperienceItem` / `SectionHeading` | 子组件 |

要求：函数组件、PascalCase 文件名、`key` 稳定、外链 `target="_blank"` `rel="noreferrer"`、图片 `alt`、图标链 `aria-label`（中文）。

---

## 7. 样式与响应式

- Tailwind 优先；`index.css` 仅全局与 `scroll-behavior`。  
- 深色主题：`neutral-950` 背景、`cyan-400` 强调。  
- `max-w-6xl mx-auto px-6`。  
- 移动端：Hero 上下布局、项目单列、**抽屉导航**、无横向滚动。

---

## 8. 动画（framer-motion）

- 允许：`section` `whileInView` 淡入、抽屉 `AnimatePresence`。  
- 禁止：全屏炫动、阻塞阅读的循环动画。  
- 按钮/卡片 hover 优先 CSS。

---

## 9. 可访问性与 SEO

- 全页一个 `h1`。  
- 每模块 `section` + 标题。  
- v0.1：`title`、`meta description`、`favicon`、`og:title`、`og:description`。  

---

## 10. 性能与安全

- 不引入未使用的大型库。  
- 头像 &lt; 500KB；项目图压缩。  
- 不提交密钥、`.env`、私密信息。  
- 不提交 `node_modules/`。

---

## 11. 开发命令

修改后执行：

```bash
npm install
npm run lint
npm run build
npm run preview   # 验证 /developerprofiles/ 子路径
```

无法执行须说明原因，**不得虚假声称已通过**。

---

## 12. 工作流程

1. 阅读 REQUIREMENTS + TECHNICAL_DESIGN。  
2. 确认目录与 `profile.ts` 现状。  
3. 最小范围修改。  
4. `lint` + `build`（+ `preview` 若改 base 或 public 资源）。  
5. 说明修改文件、验证结果、用户待补充资源。

---

## 13. 任务顺序（首版）

1. 初始化 `developerprofiles`（react-ts、Tailwind、base、eslint）  
2. `types.ts` + 占位 `profile.ts`  
3. `utils`（排序、显隐、formatPeriod）  
4. `App` 骨架 + 各 section  
5. Navbar + MobileDrawer  
6. 各区块组件 + 空状态  
7. framer-motion  
8. README + 部署说明  

不要在一次提交中无关重构全站。

---

## 14. 文案

- **全中文**（导航、按钮、标签、aria-label）。  
- 占位文案须明显可替换；不夸大、不虚构、不抄参考站。

---

## 15. Git 与 GitHub 同步（必须遵守）

**每完成一项可独立验收的功能后**，必须立即执行一次本地提交并推送到 GitHub，不得累积多个功能再一次性提交。

### 15.1 什么算「一项功能」

示例（每项单独一轮 commit + push）：

- 初始化 Vite + TypeScript + Tailwind + `base` 路径
- 添加 `profile.ts` 类型与占位数据
- 完成 Navbar + 移动抽屉
- 完成 Hero 区块
- 完成 Projects 空状态隐藏
- 文档修订（若单独一批验收，可单独 `docs:` 提交）

### 15.2 标准流程

```bash
git status
git add <本次功能相关文件>
git commit -m "<type>: <简短说明>"
git push origin <当前分支>
```

### 15.3 提交信息格式

```text
feat: add hero section
feat: add mobile drawer navigation
fix: hide projects section when empty
docs: update requirements for experience types
chore: configure eslint and prettier
style: adjust project card spacing
```

### 15.4 推送要求

1. 远程：`origin` → `https://github.com/TheFool-yiqi/developerprofiles.git`
2. 首 push 使用：`git push -u origin master`（若改用 `main` 则分支名一致即可）
3. **禁止**在未通过 `lint` / `build`（若适用）时推送明显损坏的构建（文档纯改动除外）
4. **禁止**提交：`node_modules/`、`.env`、密钥、未忽略的大体积临时文件
5. 交付说明中须写明：**commit hash 或提交说明** + **是否已 push**

### 15.5 推送失败时

- 说明失败原因（鉴权、冲突、网络等）
- 不得声称「已同步 GitHub」
- 给出用户可执行的修复步骤（如 `gh auth login`）

---

## 16. 发布前检查（首版整体完成时）

- [ ] `npm run lint` 通过  
- [ ] `npm run build` 通过  
- [ ] 子路径 `preview` 下资源正常  
- [ ] 抽屉与锚点可用  
- [ ] 空 projects/experience 时模块隐藏  
- [ ] 经历排序正确  
- [ ] 无参考站抄袭  
- [ ] README 含运行与部署说明  

---

## 17. 需求不明确时的默认

| 项 | 默认 |
|---|---|
| 多页面 | 单页 |
| 后台 / 博客 / 表单 | 无 |
| 语言 | 全中文 |
| TS / JS | TypeScript |
| 主题 | 深色 |
| 多语言 | 无 |
| Projects 空 | 隐藏模块 |
| Experience 空 | 隐藏模块 |
| 联系 | 仅链接 |

---

## 18. 禁止行为

1. 擅自换栈或加后端。  
2. 抄参考站代码/素材。  
3. 硬编码分散个人资料。  
4. Projects/Experience 为空仍渲染空区块。  
5. Contact 加表单（首版）。  
6. 忽略 `lint`/`build` 失败。  
7. 忘记 `base: '/developerprofiles/'`。  
8. 用 `div` 冒充无语义可点击控件。

---

## 19. 交付说明模板

```text
已完成：
- ...

修改文件：
- src/...

验证：
- npm run lint ✓
- npm run build ✓

Git：
- commit: <hash 或 message>
- push: origin/<branch> ✓

需用户补充：
- public/avatar.jpg（可选）
- public/resume.pdf（可选）
- profile.ts 真实文案
```
