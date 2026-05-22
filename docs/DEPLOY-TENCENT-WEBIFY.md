# 腾讯云 Webify 部署指南（已选定）

> **代码托管**：GitHub `TheFool-yiqi/developerprofiles`（不变）  
> **站点部署**：腾讯云 Webify（国内节点）

## 一、控制台配置（首次）

### 1. 注册与开通

1. 登录 [腾讯云](https://cloud.tencent.com/) 并完成**实名认证**。
2. 打开 [云开发 Webify / 静态网站托管](https://cloud.tencent.com/product/webify) 或 [Webify 文档站](https://webify.cloudbase.net/docs/quick-start)。
3. 开通 **CloudBase / Webify** 环境（按页面引导选择地域，建议选离用户近的，如上海 `ap-shanghai`）。

### 2. 从 GitHub 导入仓库

1. **新建应用** → **从 GitHub 导入**。
2. 授权 GitHub，选择仓库：`TheFool-yiqi/developerprofiles`。
3. 分支：`master`（或你的默认分支）。
4. 框架：选择 **Vite**（或自定义构建，见下表）。

### 3. 构建配置（必须与项目一致）

| 配置项 | 填写值 |
|--------|--------|
| 安装命令 | `npm install` |
| 构建命令 | `npm run build:root` |
| 输出目录 | `dist` |
| Node 版本 | 18 或 20 |

环境变量（如有单独配置页）：

| 变量名 | 值 |
|--------|-----|
| `VITE_BASE` | `/` |

> 使用 `build:root` 是因为 Webify 分配的访问域名为**根路径**，不是 `github.io/仓库名/` 子路径。

### 4. 部署与访问

1. 点击 **部署**，等待构建成功。
2. 记录平台分配的域名，形如：`https://<应用名>-<id>.<region>.app.tcloudbase.com/`。
3. 在简历、社交简介中使用该 **国内域名** 作为主站链接。

### 5. 自动部署

之后每次执行：

```bash
git push origin master
```

Webify 会拉取 GitHub 最新代码并自动构建部署（需在控制台开启「Git 推送触发部署」）。

---

## 二、可选：CLI 部署

已提供根目录 [`cloudbaserc.json`](../cloudbaserc.json)。在填入 `envId` 后：

```bash
npm install -g @cloudbase/cli
tcb login
tcb app deploy --framework vite -e <你的-envId>
```

---

## 三、费用与代金券

- Webify 按用量计费，个人低流量站点费用很低（约几毛/天量级，以账单为准）。
- 可申请 **Webify 个人站点扶持计划**（约 300 元代金券），见 [个人站点扶持说明](https://webify.cloudbase.net/blog/personal-site-plan)。

---

## 四、验收清单

- [ ] 浏览器打开 Webify 域名，首屏显示「刁雪猛」与头像
- [ ] 手机 4G 访问速度正常
- [ ] `avatar.png`、CSS、JS 无 404（F12 网络面板）
- [ ] 导航锚点、移动抽屉正常
- [ ] `git push` 后 5–10 分钟内线上更新（自动部署开启时）

---

## 五、常见问题

**Q：构建失败 `tsc` 或 `lint`？**  
本地先执行 `npm run build:root` 确保通过，再查看 Webify 构建日志。

**Q：页面空白？**  
检查是否误用 `build`（子路径）而非 `build:root`；应用根路径部署必须用 `VITE_BASE=/`。

**Q：还想保留 GitHub Pages？**  
可以，仅作备用：`npm run build` + GitHub Pages，不要写进面向国内的主链接。
