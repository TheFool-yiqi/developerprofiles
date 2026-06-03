# GitHub Actions 构建校验（CI）

> **线上部署**：由 [EdgeOne Pages 控制台 Git 导入](DEPLOY-EDGEONE-PAGES.md) 负责，**不在** GitHub Actions 里 CLI 上传。

本仓库的 [`.github/workflows/build-site.yml`](../.github/workflows/build-site.yml) 仅在 `push` / PR 时执行 `npm run build:site`，用于提前发现构建错误。

## 与 EdgeOne 的关系

| 环节 | 负责方 |
|------|--------|
| 代码托管 | GitHub `master` |
| **生产部署** | EdgeOne 控制台 → 项目已绑定 GitHub → push 后自动构建发布 |
| **构建校验** | GitHub Actions `Build site (CI)`（可选参考，失败不代表 EdgeOne 一定失败，但通常应一致） |

若 Actions 报 `Provider 'Github' does not support CLI deploy`，说明项目类型为 **Git 导入**，应使用本方案，**不要**再跑 `npx edgeone pages deploy`。

## 查看 CI 结果

```bash
gh run list -R TheFool-yiqi/developerprofiles --workflow build-site.yml
```

完整部署配置见 [DEPLOY-EDGEONE-PAGES.md](./DEPLOY-EDGEONE-PAGES.md)。
