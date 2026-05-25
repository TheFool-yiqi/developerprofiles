# Portfolio integration reference (developerprofiles)

## Port allocation

| Port | Project |
|------|---------|
| 3000 | developerprofiles (`npm run dev`) |
| 3001 | student_ddl |
| 3002 | startrail_notes |
| 3003 | traveler_weather |
| **3004+** | **Next new sub-app** (increment if user already uses 3004) |

## Subpath naming

- URL path: kebab-case, no trailing ambiguity — `/student-ddl/`, `/startrail-notes/`, `/traveler-weather/`
- `dist/` folder name matches URL segment (not always repo name): `student-ddl` vs repo `student_ddl`

## Environment variable convention

Pattern for project #N:

```bash
# .env.development
VITE_{UPPER_SNAKE}_URL=http://127.0.0.1:{port}/

# .env.root / .env.gitee / edgeone.json
VITE_{UPPER_SNAKE}_URL=/{kebab-path}/
```

Example (4th project): `VITE_TRAVELER_WEATHER_URL`

In code:

```typescript
// src/config/projectUrls.ts
export const fooUrl =
  import.meta.env.VITE_FOO_URL ?? "http://127.0.0.1:3004/";
```

## build-site.mjs block template

Add after the last sub-app block, before final `console.log`:

```javascript
const fooLocal = path.resolve(root, "../foo_repo");
const fooTmp = path.join(root, ".tmp", "foo_repo");
const fooRepo =
  process.env.FOO_REPO ?? "https://github.com/TheFool-yiqi/foo_repo.git";
const fooBranch = process.env.FOO_BRANCH ?? "main";

const fooDir = resolveProjectDir(
  fooLocal,
  fooTmp,
  fooRepo,
  fooBranch,
  path.join(fooLocal, "src", "main.tsx"), // adjust marker if not Vite/React
);

console.log("[build-site] N/M 构建 foo_repo (build:portfolio)…");
buildSubApp(fooDir, "build:portfolio");
copyDir(path.join(fooDir, "dist"), path.join(root, "dist", "kebab-path"));
```

Update step labels (`1/5` → `1/6` etc.) and final log line listing all `dist/` children.

## Sub-project `package.json` scripts (typical)

```json
{
  "scripts": {
    "dev": "vite --port 3004",
    "build": "tsc -b && vite build",
    "build:portfolio": "tsc -b && vite build --base /kebab-path/"
  }
}
```

`vite.config.ts`: read `base` from mode or `--base` flag; expose `VITE_PORTFOLIO_URL` in `.env.portfolio` as `/`.

## Files to touch (checklist)

```text
developerprofiles/
  docs/{slug}-PLAN.md          # new
  docs/PROJECT-LINKS.md        # ports + dist paths
  public/projects/*-cover.png  # new
  src/data/profile.ts          # projects[] append
  src/config/projectUrls.ts    # new export
  .env.development             # local preview URL
  .env.root                    # production subpath
  .env.gitee                   # if used
  edgeone.json                 # EdgeOne Pages 构建配置
  scripts/build-site.mjs       # clone + build + copy

sub-repo/ (if embedded preview)
  package.json                 # dev port, build:portfolio
  vite.config.ts               # base path
  .env.portfolio               # VITE_PORTFOLIO_URL=/
  src/...                      # 「返回作品集」 link in shell/header
```

## Deployment (unchanged platform)

- **Platform**: EdgeOne Pages (see `docs/DEPLOY-CN.md`, `docs/DEPLOY-EDGEONE-PAGES.md`)
- **Build command**: `npm run build:site` (not `build:root` when bundling sub-apps)
- **Output**: `dist/`
- **Code host**: GitHub `TheFool-yiqi/developerprofiles`

## Project type decision tree

```text
Has runnable demo the recruiter should open?
├─ Yes, SPA in separate repo → build:portfolio + link + build-site
├─ Yes, hosted elsewhere → link only (full URL in env); optional skip build-site
└─ No demo yet → repo only (like developerprofiles card #1); omit link until ready
```

## Description tone (examples)

Good (specific + Agent angle):

> 面向旅行规划的多 Agent 协作应用：意图识别与工具编排生成行程草案，RAG 增强目的地知识，会话状态持久化；作为 Agent 应用开发的端到端工程样例。

Avoid:

> 一个很好的 AI 旅游应用，功能强大，体验优秀。
