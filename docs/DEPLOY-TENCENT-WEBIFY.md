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
| Node 版本 | 18 或 20（日志里用 24 也可通过） |
| 框架类型 | 选 **Vite** 或 React（自定义构建命令时影响小） |

环境变量（如有单独配置页）：

| 变量名 | 值 |
|--------|-----|
| `VITE_BASE` | `/` |

### 3.1 部署路径（易错）

| 配置项 | 正确值 | 错误示例 |
|--------|--------|----------|
| **部署目录 / 挂载路径** | `/` | `/developerprofiles` |

> 使用 `build:root` 时站点在域名**根路径**访问；若部署到 `/developerprofiles` 会导致资源 404、页面空白。

### 3.2 cloudbaserc.json 中的 envId

仓库内 [`cloudbaserc.json`](../cloudbaserc.json) 必须填写有效的 `envId`（在 Webify 控制台 → 环境设置中查看，形如 `react-xxxxxxxx`）。

若 `envId` 为空，部署阶段会报错：

```text
无效的配置文件，配置文件必须包含环境 Id(envId) 字段
```

当前仓库已配置为本环境 ID，若你新建了其他 CloudBase 环境，请改为你自己的 `envId`。

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

## 四、挂载 student_ddl（作品集第二个项目）

作品集「项目」区第二个卡片的 **预览** 默认跳转 `/student-ddl/`。需将 [student_ddl](https://github.com/TheFool-yiqi/student_ddl) 用 `npm run build:portfolio` 构建后，部署到**同一 CloudBase 环境**：

```bash
tcb hosting deploy ./dist /student-ddl -e <你的-envId>
```

详细联调与本地双端口说明见 [PROJECT-LINKS.md](./PROJECT-LINKS.md)。

## 五、验收清单

- [ ] 浏览器打开 Webify 域名，首屏显示「刁雪猛」与头像
- [ ] 项目区第二个卡片「预览」可打开 student_ddl
- [ ] 手机 4G 访问速度正常
- [ ] `avatar.png`、CSS、JS 无 404（F12 网络面板）
- [ ] 导航锚点、移动抽屉正常
- [ ] `git push` 后 5–10 分钟内线上更新（自动部署开启时）

---

## 六、常见问题

**Q：构建成功但部署报 `envId` 无效？**  
打开 `cloudbaserc.json`，将 `envId` 改为控制台里你的 CloudBase 环境 ID（不能为空字符串）。

**Q：部署命令是 `tcb hosting deploy ./dist /developerprofiles`？**  
把最后的挂载路径改成 `/`：

```bash
tcb hosting deploy ./dist / -e <你的-envId>
```

**Q：构建失败 `tsc` 或 `lint`？**  
本地先执行 `npm run build:root` 确保通过，再查看 Webify 构建日志。

**Q：页面空白？**  
检查：① `build:root` + 部署路径 `/`；② `VITE_BASE=/`；③ 不要混用子路径 `/developerprofiles`。

**Q：还想保留 GitHub Pages？**  
可以，仅作备用：`npm run build` + GitHub Pages，不要写进面向国内的主链接。
