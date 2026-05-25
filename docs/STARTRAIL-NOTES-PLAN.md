# 星辉笔记 · 实施方案（已确认）

> 关联仓库：`TheFool-yiqi/startrail_notes`  
> 作品集集成：`developerprofiles` → `npm run build:site`  
> 线上预览路径：`/startrail-notes/`

## 已确认决策

| 类别 | 决策 |
|------|------|
| 仓库名 | `startrail_notes` |
| 子路径 | `/startrail-notes/` |
| 本地目录 | `../startrail_notes`（与 `student_ddl` 同级） |
| 项目封面 | 三个项目均配置 `public/projects/*-cover.png` |
| 首版范围 | PRD 全部 P0 |
| 测试 | Vitest（搜索、存储规范化、语言别名） |
| 技术栈 | Vite 8 + React 19 + TypeScript |
| 视觉 | 完整奇幻元素风（白昼璃光 / 星夜秘境） |
| 简历表述 | 偏 Agent/前端工程（组件化、渲染链路、本地持久化闭环） |

## 部署架构

```text
GitHub push
    → EdgeOne Pages: npm run build:site
        → dist/
        → dist/student-ddl/
        → dist/startrail-notes/
    → 国内 CDN 同域访问
```

## 本地开发

```bash
# 星辉笔记独立开发
cd startrail_notes
npm install
npm run dev          # http://127.0.0.1:3002

# 与作品集联调
cd ../developerprofiles && npm run dev   # :3000
```

## 作品集卡片文案（profile.ts）

- **标题**：星辉笔记（Startrail Notes）
- **描述**：面向学习场景的纯前端 Markdown 笔记应用；强调组件化编辑/预览、GFM、代码高亮、LocalStorage 与导入导出，作为 Agent 辅助开发的前端工程样例。

## 验收清单（P0）

- [ ] 笔记 CRUD、标题搜索、明暗主题
- [ ] Markdown 实时预览（GFM 表格/任务列表）
- [ ] 多语言代码块高亮 + 复制 + 行号
- [ ] 导入/导出 `.md`
- [ ] LocalStorage 持久化与损坏回退
- [ ] 响应式：xl 侧栏 + 主区，2xl 编辑/预览双栏
- [ ] 作品集第三卡片预览 → `/startrail-notes/`
- [ ] 「返回作品集」链接正常

## 后续 P1（可选）

删除确认弹窗、标签、回收站、PWA、IndexedDB 迁移等见 PRD / Agent 规范文档。
