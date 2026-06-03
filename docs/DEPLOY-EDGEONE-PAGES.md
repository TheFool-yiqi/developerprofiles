# EdgeOne Pages 部署指南（已选定）

> **代码托管**：GitHub `TheFool-yiqi/developerprofiles`（`master`）  
> **站点部署**：[EdgeOne Pages](https://console.cloud.tencent.com/edgeone/pages) 控制台 **GitHub 导入**（自动构建发布）  
> **CI 校验**：GitHub Actions 仅跑 `build:site`，不上传产物（见 [GITHUB-AUTO-DEPLOY.md](./GITHUB-AUTO-DEPLOY.md)）

## 一、控制台 Git 导入（生产部署，推荐）

项目类型须为 **GitHub / Git 导入**（Provider: Github），与仓库根目录 [`edgeone.json`](../edgeone.json) 一致：

| 配置项 | 填写值 |
|--------|--------|
| 仓库 | `TheFool-yiqi/developerprofiles` |
| 分支 | `master` |
| 安装命令 | `npm ci` |
| 构建命令 | `npm run build:site` |
| 输出目录 | `dist` |
| Node 版本 | 22.17.1（见 [`edgeone.json`](../edgeone.json)、[`.nvmrc`](../.nvmrc)；Vite 8 需 20.19+ 或 22.12+） |

### 环境变量（控制台「环境变量」页，必填）

| 变量名 | 值 |
|--------|-----|
| `VITE_BASE` | `/` |
| `VITE_STUDENT_DDL_URL` | `/student-ddl/` |
| `VITE_STARTRAIL_NOTES_URL` | `/startrail-notes/` |
| `VITE_TRAVELER_WEATHER_URL` | `/traveler-weather/` |
| `VITE_TRAVELER_AI_URL` | `/traveler-ai/` |
| `VITE_ICP_BEIAN` | `粤ICP备2026068982号` |

站点挂在域名**根路径** `/`；不要用 `/developerprofiles` 子路径部署。

### 触发部署

```bash
git push origin master
```

EdgeOne 控制台 → 项目 **部署记录** 中查看构建是否成功。  
**不要**同时使用 `npx edgeone pages deploy` CLI（Git 导入型项目不支持文件夹上传）。

### 首次 / 变更检查清单

- [ ] 控制台已授权 GitHub 并选中 `master` 分支
- [ ] 构建命令为 `npm run build:site`（不是仅 `build:root`）
- [ ] 环境变量含上表全部 `VITE_*`（含备案号）
- [ ] 已绑定自定义域名且 HTTPS 已配置
- [ ] 控制台无重复的 Upload 型同名项目冲突

---

## 二、GitHub Actions（仅构建校验）

[`.github/workflows/build-site.yml`](../.github/workflows/build-site.yml) 在 push 时验证 `npm run build:site` 能否通过，**不发布**到 EdgeOne。

不再需要 GitHub Secret `EDGEONE_API_TOKEN`（可删除）。

---

## 三、本地构建（可选）

```bash
npm ci
npm run build:site
```

生产变量可写入 `.env.root`（见 [`.env.example`](../.env.example)），勿提交。

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

- [ ] 自定义域名打开，首屏显示「刁雪猛」与头像
- [ ] 页脚有 **粤ICP备2026068982号** 且链到 [beian.miit.gov.cn](https://beian.miit.gov.cn/)
- [ ] 项目区各卡片「预览」可打开对应子路径
- [ ] 手机 4G 访问正常
- [ ] `git push` 后 EdgeOne 部署记录成功且线上更新

---

## 六、访问与 401 说明

EdgeOne 的 `*.edgeone.cool` **项目域名**在国内可能 **401**；已绑定**自定义域名**后应使用自定义域名访问。

临时预览：EdgeOne 控制台项目概览 → **预览**（带 `eo_token`，约 3 小时有效）。

---

## 七、常见问题

**Q：Actions 报 `Provider 'Github' does not support direct folder deployment`？**  
项目为 Git 导入型，属正常。已改为仅 CI 构建；生产部署只看 EdgeOne 控制台部署记录。

**Q：push 了但线上没更新？**  
查 EdgeOne **部署记录**是否失败；核对环境变量与 `build:site` 命令。

**Q：页脚没有备案号？**  
在 EdgeOne 控制台环境变量添加 `VITE_ICP_BEIAN=粤ICP备2026068982号` 后重新部署。

**Q：打开站点 401？**  
使用已备案的自定义域名，不要只用裸 `*.edgeone.cool`。

**Q：本地开发环境变量？**  
复制 [`.env.example`](../.env.example) 为 `.env.development` 或 `.env.root`，勿提交 `.env*`。

**Q：如何悬挂 ICP 备案号？**  
见 [腾讯云备案号悬挂说明](https://cloud.tencent.com/document/product/243/61412)。广东省填 **主体备案号** `粤ICP备2026068982号`（不带 `-1`）。
