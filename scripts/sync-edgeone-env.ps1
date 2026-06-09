# 同步 EdgeOne 环境变量并提示重新部署
# 用法:
#   $env:EDGEONE_API_TOKEN = "<控制台 API Token>"
#   .\scripts\sync-edgeone-env.ps1
#
# 若 CLI 未 link 项目，请改用手动：复制根目录 edgeone.env 到控制台批量粘贴。

$ErrorActionPreference = "Stop"

if (-not $env:EDGEONE_API_TOKEN) {
  Write-Host @"

未设置 EDGEONE_API_TOKEN，请用手动方式（约 1 分钟）：

1. 打开 https://console.cloud.tencent.com/edgeone/pages/project/pages-wjws62vhjy4i/settings/env
2. 删除旧子项目变量（VITE_STUDENT_DDL_URL 等，若有）
3. 将仓库根目录 edgeone.env 的内容整段粘贴到环境变量输入框并保存
4. 在项目列表点击「重新部署」，或执行: git commit --allow-empty -m "chore: redeploy" && git push

"@
  exit 1
}

$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Leaf
Set-Location (Join-Path $PSScriptRoot "..")

if (-not (Test-Path ".edgeone\project.json")) {
  @'
{"projectName":"developerprofiles","projectId":"pages-wjws62vhjy4i"}
'@ | Set-Content -Path ".edgeone\project.json" -Encoding UTF8
}

$vars = @{
  VITE_BASE = "/"
  VITE_ICP_BEIAN = "粤ICP备2026068982号"
  VITE_GONGAN_BEIAN = "粤公网安备44030002013359号"
  VITE_GONGAN_BEIAN_URL = "https://beian.mps.gov.cn/#/query/webSearch?code=44030002013359"
}

$remove = @(
  "VITE_STUDENT_DDL_URL",
  "VITE_STARTRAIL_NOTES_URL",
  "VITE_TRAVELER_WEATHER_URL",
  "VITE_TRAVELER_AI_URL",
  "VITE_PORTFOLIO_URL"
)

$t = $env:EDGEONE_API_TOKEN
foreach ($k in $vars.Keys) {
  Write-Host "set $k ..."
  npx -y edgeone pages env set $k $vars[$k] -t $t
}
foreach ($k in $remove) {
  Write-Host "rm $k (if exists) ..."
  npx -y edgeone pages env rm $k -t $t 2>$null
}

Write-Host "`n当前环境变量:"
npx -y edgeone pages env ls -t $t
Write-Host "`n请在 EdgeOne 控制台点击「重新部署」，或 push 代码触发 Git 构建。"
