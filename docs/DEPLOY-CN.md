# 国内部署指南

## 架构说明（请先读）

本项目采用 **「代码托管」与「站点部署」分离**：

```text
┌─────────────────────────────────────┐
│  代码托管：GitHub（唯一源仓库）        │
│  https://github.com/TheFool-yiqi/     │
│           developerprofiles           │
└──────────────┬──────────────────────┘
               │  git push origin
               │  （不在此文档要求迁移到 Gitee）
               ▼
┌─────────────────────────────────────┐
│  构建：本地或 GitHub Actions          │
│  npm run build:root / build:github    │
└──────────────┬──────────────────────┘
               │ 上传 dist/
               ▼
┌─────────────────────────────────────┐
│  站点部署：国内静态托管节点            │
│  （机房 / CDN 在中国大陆）             │
└──────────────┬──────────────────────┘
               ▼
         国内访客访问
```

- **代码**：始终放在 GitHub，开发、协作、版本历史不变。
- **访问**：把构建后的 `dist/` 发布到**国内云静态托管**，访客从国内节点加载页面。

GitHub Pages 仅适合备用预览，**不要**作为国内招聘/分享的主链接。

---

## 推荐部署位置（国内机房）

| 方案 | 国内访问 | 与 GitHub 关系 | 费用（概览） |
|------|----------|----------------|--------------|
| **腾讯云 Webify** | 很好 | 控制台 **导入 GitHub 仓库** 自动构建部署 | 有免费额度 |
| **腾讯云 COS 静态网站 + CDN** | 很好 | Actions 或本地上传 `dist` | 按量，个人站很低 |
| **阿里云 OSS 静态网站 + CDN** | 很好 | Actions 或本地上传 `dist` | 按量 |
| GitHub Pages | 差 / 不稳定 | 同仓库，海外节点 | 免费，仅备用 |
| Gitee Pages | 视平台政策 | 需镜像代码到 Gitee，**非本方案默认** | 以 Gitee 为准 |

> 本方案 **不要求** 把仓库从 GitHub 迁到 Gitee；Gitee 仅在你愿意镜像代码时作为可选项。

---

## 方案 A：腾讯云 Webify（推荐，代码仍在 GitHub）

1. 登录 [腾讯云 Webify](https://cloud.tencent.com/product/webify)（或云开发静态托管）。
2. **新建应用** → 选择 **从 GitHub 导入** → 授权并选择 `developerprofiles` 仓库。
3. 构建配置示例：
   - 构建命令：`npm install && npm run build:root`
   - 发布目录：`dist`
   - Node 版本：18 或 20（按控制台可选）
4. 使用平台提供的**国内访问域名**（或绑定已备案的自定义域名）。
5. 每次 `git push` 到 GitHub 后，由 Webify 自动拉取并部署（以控制台实际功能为准）。

**构建命令用 `build:root`**：站点挂在域名根路径，`VITE_BASE=/`。

---

## 方案 B：阿里云 OSS + CDN（代码在 GitHub，手动/CI 上传）

### 手动发布

```bash
npm install
npm run build:root
```

将 `dist/` 内**全部文件**上传到 OSS Bucket（开启「静态网站托管」），CDN 加速域名指向该 Bucket。

### 可选：GitHub Actions 自动上传

在 GitHub 仓库 Settings → Secrets 配置云厂商密钥后，可用 Actions 在 `push` 时自动 `build` 并上传到 OSS（需自行按阿里云文档配置 workflow，本仓库不预置你的密钥）。

---

## 方案 C：腾讯云 COS + CDN

与方案 B 类似：`npm run build:root` → 上传 `dist/` 到 COS 静态网站 → CDN 域名对外。

---

## 方案 D：GitHub Pages（仅备用，非国内主站）

代码仍在 GitHub，但 Pages 节点在**海外**，国内访问慢。

```bash
npm run build
# base 为 /developerprofiles/，对应 github.io 子路径
```

访问：`https://TheFool-yiqi.github.io/developerprofiles/`  
可用于海外或临时预览，**不要**写进面向国内 HR 的主链接。

---

## 构建命令对照

| 命令 | `VITE_BASE` | 适用部署地址 |
|------|-------------|--------------|
| `npm run build:root` | `/` | 国内域名根路径（**推荐主站**） |
| `npm run build` | `/developerprofiles/` | GitHub Pages 子路径备用 |
| `npm run build:gitee` | `/developerprofiles/` | 仅当站点部署在 `*.gitee.io/<repo>/` 时 |

本地预览根路径构建：

```bash
npm run build:root
npx vite preview --mode root
```

---

## 验收（国内）

- [ ] 代码仓库仍为 GitHub，未误删 `origin` 远程
- [ ] 主站 URL 使用**国内托管**提供的域名
- [ ] 手机 4G/5G 打开主站，首屏 3 秒内可见
- [ ] `avatar.png`、CSS、JS 无 404
- [ ] 锚点导航、抽屉菜单正常

---

## 备案说明

- 使用云厂商提供的**测试域名**（未备案）：适合个人作品集试用。
- 绑定**自己的域名**并走国内 CDN：通常需要 **ICP 备案**（以云厂商要求为准）。
