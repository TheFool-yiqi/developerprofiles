# EdgeOne Pages 部署指南（已选定）

> **代码托管**：GitHub `TheFool-yiqi/developerprofiles`（不变）  
> **站点部署**：[EdgeOne Pages](https://pages.edgeone.ai/)（腾讯云边缘加速，国内访问友好）

## 一、控制台配置（可选：Git 导入）

若使用 EdgeOne 控制台 **从 GitHub 导入仓库**，构建配置须与仓库一致（也可直接依赖根目录 [`edgeone.json`](../edgeone.json)）：

| 配置项 | 填写值 |
|--------|--------|
| 安装命令 | `npm ci` |
| 构建命令 | `npm run build:site` |
| 输出目录 | `dist` |
| Node 版本 | 20 |

环境变量（控制台「环境变量」页，与 `.env.root` 一致）：

| 变量名 | 值 |
|--------|-----|
| `VITE_BASE` | `/` |
| `VITE_STUDENT_DDL_URL` | `/student-ddl/` |
| `VITE_STARTRAIL_NOTES_URL` | `/startrail-notes/` |
| `VITE_TRAVELER_WEATHER_URL` | `/traveler-weather/` |
| `VITE_TRAVELER_AI_URL` | `/traveler-ai/` |

站点挂在域名**根路径** `/`；不要用 `/developerprofiles` 子路径部署。

---

## 二、GitHub Actions 自动部署（推荐）

本仓库已配置 [`.github/workflows/deploy-edgeone.yml`](../.github/workflows/deploy-edgeone.yml)：每次 `push` 到 `master` 时执行 `npm run build:site` 并发布 `dist/`。

### 1. 获取 API Token

1. 登录 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages) 或 [Global 控制台](https://pages.edgeone.ai/)
2. 进入 **API Token** 文档页创建令牌：[API Token 说明](https://pages.edgeone.ai/document/177158578324279296)

### 2. 写入 GitHub Secret

仓库 **Settings → Secrets and variables → Actions** 添加：

| Secret 名称 | 值 |
|-------------|-----|
| `EDGEONE_API_TOKEN` | EdgeOne Pages API Token |

CLI 示例：

```bash
gh secret set EDGEONE_API_TOKEN -R TheFool-yiqi/developerprofiles --body "<你的Token>"
```

### 3. 触发部署

```bash
git push origin master
```

在 GitHub **Actions** 中确认 `Deploy to EdgeOne Pages` 工作流成功。部署命令等价于：

```bash
npx edgeone pages deploy ./dist -n developerprofiles -t "$EDGEONE_API_TOKEN" -e production
```

### 4. 与控制台 Git 绑定的关系

- **GitHub Actions（本方案）**：push 后由 Actions 构建并 CLI 部署，不依赖控制台 Git 授权。
- **控制台 Git 导入**（可选）：二者选其一即可，避免重复部署。

若此前使用腾讯云 Webify，请在 Webify 控制台**关闭**该仓库的自动部署，并删除 GitHub Secrets `TENCENT_SECRET_ID` / `TENCENT_SECRET_KEY`（可选）。

---

## 三、本地 CLI 部署（可选）

```bash
npm ci
npm run build:site
npx edgeone pages deploy ./dist -n developerprofiles -t "<EDGEONE_API_TOKEN>" -e production
```

---

## 四、子项目预览（已并入构建）

构建命令 **`npm run build:site`** 会把子项目产出与作品集一并部署到 `/`：

| 子项目 | 路径 | 作品集卡片 |
|--------|------|------------|
| [student_ddl](https://github.com/TheFool-yiqi/student_ddl) | `/student-ddl/` | 第二个 |
| [startrail_notes](https://github.com/TheFool-yiqi/startrail_notes) | `/startrail-notes/` | 第三个 |
| [traveler_weather](https://github.com/TheFool-yiqi/traveler_weather) | `/traveler-weather/` | 第四个 |
| [traveler_ai](https://github.com/TheFool-yiqi/traveler_ai) | `/traveler-ai/` | 第五个 |

本地联调见 [PROJECT-LINKS.md](./PROJECT-LINKS.md)。

---

## 五、验收清单

- [ ] 浏览器打开 EdgeOne 分配的域名，首屏显示「刁雪猛」与头像
- [ ] 项目区各卡片「预览」可打开对应子路径
- [ ] 手机 4G 访问速度正常
- [ ] `avatar.png`、CSS、JS 无 404（F12 网络面板）
- [ ] 导航锚点、移动抽屉正常
- [ ] `git push` 后 Actions 部署成功且线上更新

---

## 六、常见问题

**Q：构建成功但部署报 Token 无效？**  
检查 GitHub Secret 名称必须为 `EDGEONE_API_TOKEN`，且 Token 未过期。

**Q：页面空白或资源 404？**  
确认使用 `build:site`（或 `build:root` 仅作品集时）且 `VITE_BASE=/`，部署目录为 `dist` 根路径。

**Q：还想保留 GitHub Pages？**  
可以，仅作备用：`npm run build` + GitHub Pages，不要写进面向国内 HR 的主链接。

**Q：旧版 Webify 配置在哪？**  
历史文档见 [DEPLOY-TENCENT-WEBIFY.md](./DEPLOY-TENCENT-WEBIFY.md)（已弃用）。仓库已移除 `cloudbaserc.json`，Webify CloudApp 与静态托管文件已清空。
