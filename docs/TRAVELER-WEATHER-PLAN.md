# 旅行者校园天气助手 · 实施方案（已确认）

> 关联仓库：`TheFool-yiqi/traveler_weather`  
> 作品集集成：`developerprofiles` → `npm run build:site`  
> 线上预览路径：`/traveler-weather/`

## 已确认决策

| 类别 | 决策 |
|------|------|
| 仓库名 | `traveler_weather` |
| 子路径 | `/traveler-weather/` |
| 本地目录 | `../traveler_weather`（与 `student_ddl`、`startrail_notes` 同级） |
| 本地端口 | `3003` |
| 首版范围 | MVP 1.0 全部 P0 + P1 |
| 测试 | Vitest（elementMapper、adviceGenerator、weatherCode） |
| 技术栈 | Vite 8 + React 19 + TypeScript + Tailwind CSS 4 + Zustand |
| 视觉 | 完整幻想元素风（渐变 + 玻璃拟态 + Framer Motion） |
| 简历表述 | 偏 Agent/前端工程（Open-Meteo 数据流、元素映射、LocalStorage 闭环） |

## 部署架构

```text
GitHub push
    → Webify: npm run build:site
        → dist/
        → dist/student-ddl/
        → dist/startrail-notes/
        → dist/traveler-weather/
    → 国内 CDN 同域访问
```

## 本地开发

```bash
# 旅行者天气助手独立开发
cd traveler_weather
npm install
npm run dev          # http://127.0.0.1:3003

# 与作品集联调
cd ../developerprofiles && npm run dev   # :3000
```

## 作品集卡片文案（profile.ts）

- **标题**：旅行者校园天气助手（Traveler Weather）
- **描述**：面向学生场景的纯前端天气应用；Open-Meteo 预报、元素状态映射与校园行动建议，LocalStorage 收藏锚点。

## 验收清单（MVP）

- [x] 城市搜索、浏览器定位、当前天气展示
- [x] 24 小时与 7 日预报
- [x] 元素天气映射与学生建议卡
- [x] 收藏锚点增删与 localStorage 持久化
- [x] 响应式布局与错误/加载态
- [x] Vitest 纯函数测试
- [x] 作品集第四卡片预览 → `/traveler-weather/`
- [x] 「返回作品集」链接

## 后续版本（见 traveler_weather/docs）

- V1.1：空气质量、日出日落卡片、主题切换
- V1.2：PWA、离线缓存、搜索历史
- V2.0：课程表联动、天气提醒、自定义锚点别名
