# GitHub 自动部署到腾讯云 Webify

本仓库已配置 GitHub Actions：每次 `push` 到 `master` 分支时，自动执行 `npm run build:site` 并上传到静态托管。

## 一次性配置（仅需做一次）

### 1. 创建腾讯云 API 密钥

1. 登录 [腾讯云 API 密钥管理](https://console.cloud.tencent.com/cam/capi)
2. 新建密钥，记录 **SecretId** 与 **SecretKey**
3. 确保该账号对 CloudBase 环境 `cursor-d2gitn6fg62fef67d` 有静态托管写入权限

### 2. 写入 GitHub Secrets

在仓库 **Settings → Secrets and variables → Actions** 中添加：

| Secret 名称 | 值 |
|-------------|-----|
| `TENCENT_SECRET_ID` | 腾讯云 SecretId |
| `TENCENT_SECRET_KEY` | 腾讯云 SecretKey |

或使用 CLI（在本机执行，替换为真实值）：

```bash
gh secret set TENCENT_SECRET_ID -R TheFool-yiqi/developerprofiles --body "<你的SecretId>"
gh secret set TENCENT_SECRET_KEY -R TheFool-yiqi/developerprofiles --body "<你的SecretKey>"
```

工作流使用 **CloudBase CLI**（`tcb hosting deploy ./dist /`）发布到静态托管，需 CAM **API 密钥**（SecretId 通常以 `AKID` 开头）。  
勿再用 `coscli sync` 直传桶：对静态托管桶 HEAD 会 403，Actions 会误报成功但线上不更新。

### 3. 验证

```bash
git push origin master
```

打开 GitHub **Actions** 页，确认 `Deploy to Tencent Webify` 工作流成功。

部署完成后访问：

- 作品集：https://cursor-d2gitn6fg62fef67d-1435930849.tcloudbaseapp.com/
- 旅行者天气：https://cursor-d2gitn6fg62fef67d-1435930849.tcloudbaseapp.com/traveler-weather/

## 与 Webify 控制台 Git 绑定的关系

- **GitHub Actions（本方案）**：push 后由 Actions 构建并 `tcb hosting deploy`，不依赖 Webify 控制台 Git 授权。
- **Webify 原生 Git 绑定**（可选）：在 [Webify 控制台](https://console.cloud.tencent.com/webify?envId=cursor-d2gitn6fg62fef67d) 将应用与 `TheFool-yiqi/developerprofiles` 仓库关联，由平台云端构建。若已启用 Actions，二者选其一即可，避免重复部署。

## 工作流文件

`.github/workflows/deploy-webify.yml`
