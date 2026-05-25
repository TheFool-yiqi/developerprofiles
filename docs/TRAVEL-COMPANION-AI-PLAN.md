# 旅伴 AI · 实施方案（已确认）

> 关联仓库：`TheFool-yiqi/traveler_ai`  
> 作品集集成：`developerprofiles` → `npm run build:site`  
> 线上预览路径：`/traveler-ai/`

## 已确认决策

| 类别 | 决策 |
|------|------|
| 仓库名 | `traveler_ai` |
| 子路径 | `/traveler-ai/` |
| 本地目录 | `../traveler_ai` |
| 本地端口 | `3004` |
| 首版范围 | AGENTS 推荐首版 10 项（Mock 演示为主） |
| 测试 | Vitest（基础用例，可扩展） |
| 技术栈 | Vite + React 19 + TypeScript + Tailwind CSS 4 + Zustand + react-router-dom + react-markdown |
| 视觉 | 幻想冒险主题（星空 / 羊皮纸 / 金色描边） |
| 简历表述 | LLM 应用前端工程：流式、模式 Prompt、持久化、Mock/代理分层 |
| 预览方式 | 同域子路径 + `build:portfolio` |

## 作品集卡片文案（profile.ts）

- **标题**：旅伴 AI（Travel Companion AI）
- **描述**：见 `src/data/profile.ts` 第五条

## 验收清单（首版展示）

- [x] 幻想主题主界面 + 多会话
- [x] Mock 流式 + Markdown + 停止生成
- [x] LocalStorage 持久化
- [x] 收藏页 + 导出 Markdown + 设置页
- [x] 移动端 Drawer
- [x] 作品集第五卡片 + `build:site` 集成
- [x] 「返回作品集」链接
- [ ] 自定义封面图（当前为占位图，可替换 `traveler-ai-cover.png`）
- [ ] GitHub 推送 `traveler_ai` 仓库后 CI 克隆构建

## 本地开发

```bash
cd traveler_ai && npm run dev
cd ../developerprofiles && npm run dev
```

## 后续

- 接入真实 `/api/chat` 后端代理
- 重命名/删除/会话对话框、Vitest 覆盖 Store
- 替换作品集封面为真实截图
