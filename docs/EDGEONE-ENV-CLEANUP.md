# EdgeOne 环境变量清理

移除子项目后，控制台只需保留 **2 个** 构建用变量。

## 应保留

| 变量 | 值 |
|------|-----|
| `VITE_BASE` | `/` |
| `VITE_ICP_BEIAN` | `粤ICP备2026068982号` |

## 应删除（在控制台逐条删）

| 变量 | 说明 |
|------|------|
| `VITE_STUDENT_DDL_URL` | 子项目预览，已下线 |
| `VITE_STARTRAIL_NOTES_URL` | 同上 |
| `VITE_TRAVELER_WEATHER_URL` | 同上 |
| `VITE_TRAVELER_AI_URL` | 同上 |
| `VITE_PORTFOLIO_URL` | 若曾配置，可删 |

## 方式一：控制台（推荐）

1. 打开 [EdgeOne Pages](https://console.cloud.tencent.com/edgeone/pages) → 项目 **developerprofiles**
2. **项目设置** → **环境变量**
3. 对上述 4～5 项点 **删除**，确认保留 `VITE_BASE` 与 `VITE_ICP_BEIAN`
4. **重新部署** 一次（或 push 代码触发 Git 构建）

## 方式二：EdgeOne CLI

在 [API Token](https://console.cloud.tencent.com/edgeone/pages) 创建令牌后：

```powershell
$env:EDGEONE_API_TOKEN = "<你的 Token>"
cd D:\public-project\developerprofiles
.\scripts\remove-edgeone-subapp-env.ps1
```

脚本会删除子项目相关变量并列出当前配置。

## 删除后验收

- 环境变量列表仅 2 项（或仅含上述保留项）
- 新部署成功
- 站点无项目区，页脚备案号正常
