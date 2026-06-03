# 作品集部署说明

当前主页**不展示子项目卡片**，EdgeOne 仅部署作品集根站。

## 本地开发

```bash
cp .env.example .env.development   # 首次
cd developerprofiles
npm run dev
```

默认地址：`http://127.0.0.1:3000/`（`VITE_BASE=/developerprofiles/`）

## 生产构建

```bash
npm ci
npm run build:site   # 仅输出 dist/ 作品集
```

## EdgeOne 环境变量

仅保留两项，删除说明见 [EDGEONE-ENV-CLEANUP.md](./EDGEONE-ENV-CLEANUP.md)：

| 变量 | 值 |
|------|-----|
| `VITE_BASE` | `/` |
| `VITE_ICP_BEIAN` | `粤ICP备2026068982号` |

完整部署见 [DEPLOY-EDGEONE-PAGES.md](./DEPLOY-EDGEONE-PAGES.md)。
