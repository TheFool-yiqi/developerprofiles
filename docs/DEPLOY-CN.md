# 国内部署指南

本站为纯静态站点（Vite 构建的 `dist/`），主要面向**中国大陆**访问。  
GitHub Pages 在国内常出现**慢、不稳定或无法打开**，因此**不推荐作为国内主站点**。

## 推荐方案（按优先级）

| 方案 | 国内访问 | 费用 | 适合场景 |
|------|----------|------|----------|
| **Gitee Pages** | 较好 | 免费 | 个人作品集、开源仓库展示 |
| **腾讯云静态网站托管 / Webify** | 很好 | 有免费额度 | 需要更稳定、可绑域名 |
| **阿里云 OSS + CDN** | 很好 | 按量 | 已有阿里云、要自定义域名 |
| GitHub Pages | 一般 / 不稳定 | 免费 | **备用镜像**，非国内主站 |
| Vercel / Netlify | 较差 | 免费 | 不推荐作为国内主站 |

---

## 方案 A：Gitee Pages（推荐首选）

### 1. 准备仓库

1. 在 [Gitee](https://gitee.com/) 创建仓库，名称建议仍为 `developerprofiles`。
2. 将本仓库推送到 Gitee（可与 GitHub 双远程并存）。

```bash
git remote add gitee https://gitee.com/<你的用户名>/developerprofiles.git
git push gitee master
```

### 2. 构建

```bash
npm install
npm run build:gitee
```

产物在 `dist/` 目录。`VITE_BASE=/developerprofiles/` 与 Gitee 子路径一致。

### 3. 开启 Gitee Pages

1. 打开仓库 → **服务** → **Gitee Pages**
2. 部署方式选择上传 **`dist` 目录内容** 或使用 **Gitee Go / CI** 自动构建（按页面提示配置）
3. 构建命令：`npm install && npm run build:gitee`
4. 发布目录：`dist`

### 4. 访问地址

一般为：

```text
https://<你的用户名>.gitee.io/developerprofiles/
```

在 `profile.ts` 或简历分享时使用上述链接。

---

## 方案 B：独立域名 + 国内 CDN（根路径部署）

若已购买域名并完成**工信部备案**（使用国内节点时通常需要），可将站点挂在域名根路径：

```bash
npm run build:root
```

此时 `VITE_BASE=/`，访问形如 `https://profile.example.com/`。

将 `dist/` 内所有文件上传到：

- 腾讯云静态网站托管 / Webify
- 或阿里云 OSS 静态网站 + CDN 加速域名

---

## 方案 C：GitHub Pages（备用）

仅作代码托管与海外访问备用，**不要作为国内招聘链接的主地址**。

```bash
npm run build
# 将 dist 发布到 gh-pages 分支或 Actions
```

访问：`https://<username>.github.io/developerprofiles/`（国内可能较慢）。

---

## 构建命令对照

| 命令 | `base` 路径 | 典型访问 URL |
|------|-------------|----------------|
| `npm run build:gitee` | `/developerprofiles/` | `*.gitee.io/developerprofiles/` |
| `npm run build` | `/developerprofiles/` | 同 Gitee / GitHub 子路径 |
| `npm run build:root` | `/` | 独立域名根路径 |

本地预览：

```bash
npm run preview:gitee
# 打开终端提示的 /developerprofiles/ 地址
```

---

## 验收（国内）

- [ ] 用手机 4G/5G（非仅 WiFi）打开主站 URL，3 秒内首屏可见
- [ ] 头像 `avatar.png` 可加载
- [ ] 刷新、锚点跳转正常
- [ ] 无混合内容 / 控制台 404

---

## 备案说明（简要）

- 使用 **Gitee Pages 默认子域名**：通常无需自行备案。
- 使用 **自有域名 + 国内云厂商 CDN**：需按厂商要求完成 **ICP 备案**。
