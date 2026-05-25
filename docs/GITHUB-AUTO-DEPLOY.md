# GitHub 自动部署到 EdgeOne Pages

本仓库已配置 GitHub Actions：每次 `push` 到 `master` 分支时，自动执行 `npm run build:site` 并发布到 EdgeOne Pages。

## 一次性配置（仅需做一次）

### 1. 创建 EdgeOne API Token

1. 登录 [EdgeOne Pages](https://console.cloud.tencent.com/edgeone/pages)（或 [Global](https://pages.edgeone.ai/)）
2. 按 [API Token 文档](https://pages.edgeone.ai/document/177158578324279296) 创建令牌

### 2. 写入 GitHub Secret

在仓库 **Settings → Secrets and variables → Actions** 中添加：

| Secret 名称 | 值 |
|-------------|-----|
| `EDGEONE_API_TOKEN` | EdgeOne Pages API Token |

或使用 CLI（在本机执行，替换为真实值）：

```bash
gh secret set EDGEONE_API_TOKEN -R TheFool-yiqi/developerprofiles --body "<你的Token>"
```

### 3. 验证

```bash
git push origin master
```

打开 GitHub **Actions** 页，确认 `Deploy to EdgeOne Pages` 工作流成功。日志末尾会输出部署 URL。

### 4. 停用旧 Webify 流水线（若曾启用）

- 删除或停用 Webify 控制台对该仓库的 Git 自动构建
- 可移除 GitHub Secrets：`TENCENT_SECRET_ID`、`TENCENT_SECRET_KEY`

## 工作流文件

`.github/workflows/deploy-edgeone.yml`

完整步骤见 [DEPLOY-EDGEONE-PAGES.md](./DEPLOY-EDGEONE-PAGES.md)。
