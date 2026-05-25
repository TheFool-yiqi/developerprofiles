---
name: portfolio-new-project
description: >-
  Onboards a new showcase project into the developerprofiles personal portfolio:
  reads requirement, architecture, and AGENTS docs; clarifies ambiguities;
  writes a confirmed integration plan; wires the next project card and Webify
  build:site deployment like existing student_ddl / startrail_notes /
  traveler_weather entries. Use when adding a fifth (or next) portfolio project,
  旅伴AI, 作品栏, 新项目展示, or when the user provides 需求文档 + 技术架构文档 + AGENTS.md
  for developerprofiles.
---

# Portfolio New Project

Add the **next** project to [developerprofiles](https://github.com/TheFool-yiqi/developerprofiles) using the same pattern as projects 2–4 (sub-app + `build:site` + profile card).

## Prerequisites

- Workspace is `developerprofiles` (or user will open it before wiring).
- User provides **three inputs** (paths or pasted content):
  1. **需求文档** — product scope, personas, MVP/P0/P1
  2. **技术架构文档** — stack, modules, deployment, data flow
  3. **AGENTS.md** — agent roles, tools, repo conventions, commands

If any file is missing, ask once for it before planning.

## Workflow overview

```text
Read docs → Draft plan → Clarify (AskQuestion) → User confirms
    → Implement sub-project (if needed) → Wire portfolio → Verify build:site
```

Copy this checklist and update as you go:

```text
- [ ] Phase 1: Read 需求 / 架构 / AGENTS
- [ ] Phase 2: Draft docs/{slug}-PLAN.md
- [ ] Phase 3: Clarify & lock decisions (user confirmed)
- [ ] Phase 4: Sub-project repo (build:portfolio, 返回作品集)
- [ ] Phase 5: Portfolio wiring (profile, env, build-site, cover, PROJECT-LINKS)
- [ ] Phase 6: Local + build:site verification
```

---

## Phase 1 — Understand the new project

1. Read all three documents end-to-end.
2. Extract and keep in working notes:

| Field | Source hints |
|-------|----------------|
| Display title (中/英) | 需求文档 title, branding |
| One-line pitch | 需求 summary |
| MVP for **first showcase** | P0 only vs P0+P1 — may differ from full roadmap |
| Tech stack tags | 架构文档 frontend/backend/AI |
| Repo slug | AGENTS.md or user convention (`snake_case`) |
| Agent angle for resume | Multi-agent, RAG, MCP, tool use, etc. |
| External APIs / data | For description accuracy |
| Sub-app vs link-only | Full SPA preview vs repo-only card |

3. Count existing portfolio entries in [`src/data/profile.ts`](../../src/data/profile.ts). The new item is **index = length + 1** (currently 5th slot when length is 4).

4. Read prior integration plans for tone and structure:
   - [`docs/TRAVELER-WEATHER-PLAN.md`](../../docs/TRAVELER-WEATHER-PLAN.md)
   - [`docs/STARTRAIL-NOTES-PLAN.md`](../../docs/STARTRAIL-NOTES-PLAN.md)

---

## Phase 2 — Draft integration plan

Create **`docs/{slug}-PLAN.md`** (slug = kebab-case English, e.g. `travel-companion-ai` for 旅伴AI).

Use the template in [plan-template.md](plan-template.md). Fill every **已确认决策** row only after Phase 3; until then mark tentative rows with `(待确认)`.

**Resume card copy rules** (match existing projects):

- **description**: 2–3 sentences; lead with user value; end with why it fits an Agent 应用开发工程师 portfolio (编排、RAG、工具调用、工程化落地 — pick what is true).
- **tech**: 5–10 tags from real stack; prefer concrete libs over buzzwords.
- **title**: `中文名（English Name）` when both exist.

---

## Phase 3 — Clarify ambiguities

Do **not** implement portfolio wiring until the user confirms the plan.

Use **AskQuestion** (or concise numbered questions) for anything not explicit in the three docs. Prioritize:

1. **GitHub repo** — org/user + repo name; create now or link later?
2. **Local sibling directory** — default `../{repo_slug}` next to `developerprofiles`
3. **URL subpath** — default `/{kebab-slug}/` under same domain (e.g. `/travel-companion/`)
4. **Local dev port** — next free port after 3003 → see [reference.md](reference.md#port-allocation)
5. **First showcase scope** — MVP subset for v1 card vs full PRD
6. **Preview type** — embedded sub-app (`build:portfolio`) vs external URL only vs repo-only (no 预览 button)
7. **Cover image** — user supplies screenshot vs generate; filename `public/projects/{slug}-cover.png`
8. **Resume emphasis** — Agent/RAG/backend vs pure frontend demo

After answers, update `docs/{slug}-PLAN.md` **已确认决策** table and ask: **「方案已更新，确认后我开始改代码」**.

---

## Phase 4 — Sub-project (when preview is embedded)

Skip to Phase 5 if the card is **repo-only** (no `link`, like project 1).

For embedded previews, the sub-repo must support portfolio deployment:

1. **Vite base** — `build:portfolio` script with `base: '/{subpath}/'` (copy pattern from `student_ddl`, `startrail_notes`, or `traveler_weather`).
2. **返回作品集** — header link using `import.meta.env.VITE_PORTFOLIO_URL` defaulting to `/`.
3. **Local dev port** — unique (e.g. `3004` for 5th project).
4. Implement MVP per confirmed plan; follow **AGENTS.md** for structure and agent boundaries.

---

## Phase 5 — Wire developerprofiles

Follow the file checklist in [reference.md](reference.md). Minimum set:

| File | Action |
|------|--------|
| `docs/{slug}-PLAN.md` | Final confirmed plan |
| `public/projects/{asset}-cover.png` | Cover image |
| `src/data/profile.ts` | Append `projects[]` entry; import URL helper if `link` |
| `src/config/projectUrls.ts` | `export const {camel}Url = import.meta.env.VITE_…` |
| `.env.development` | `http://127.0.0.1:{port}/` |
| `.env.root` / `.env.gitee` | `/{subpath}/` |
| `cloudbaserc.json` | Add `VITE_*_URL` under `envVariables` |
| `scripts/build-site.mjs` | Clone/build/copy block → `dist/{subpath}/` |
| `docs/PROJECT-LINKS.md` | Local ports table + `build:site` output list |

**profile.ts entry shape** ([`Project`](../../src/data/types.ts)):

```typescript
{
  title: "中文名（English）",
  description: "…",
  tech: ["…"],
  image: "/projects/{slug}-cover.png",
  link: {camel}Url,      // omit if no preview
  repo: "https://github.com/TheFool-yiqi/{repo}",
}
```

**build-site.mjs**: mirror an existing block (DDL / notes / weather); use env overrides `{SLUG}_REPO` / `{SLUG}_BRANCH` for CI clones.

---

## Phase 6 — Verify

1. **Sub-app alone**: `npm run dev` in sub-repo → port responds.
2. **Portfolio local**: `developerprofiles` `npm run dev` → new card **预览** opens sub-app URL from `.env.development`.
3. **Production bundle**: `npm run build:site` from repo root → `dist/{subpath}/` exists; no clone/build errors.
4. **Card UX**: cover loads, 预览 + 源码 links work, copy matches plan.
5. Update `docs/{slug}-PLAN.md` acceptance checklist — check completed items.

Deployment (user operates Webify): push GitHub → Webify runs `npm run build:site` per [`cloudbaserc.json`](../../cloudbaserc.json) and [`docs/PROJECT-LINKS.md`](../../docs/PROJECT-LINKS.md). Do not change deploy platform unless user asks.

---

## What not to do

- Do not paraphrase user-provided doc titles or product names without reason.
- Do not add a project card before plan confirmation.
- Do not use port 3001–3003 for a new app (already assigned).
- Do not commit or push unless the user explicitly requests it.
- Do not switch Webify to `build:root` if the new project uses same-domain subpath preview.

---

## Additional resources

- Integration file list and port table: [reference.md](reference.md)
- Plan document skeleton: [plan-template.md](plan-template.md)
