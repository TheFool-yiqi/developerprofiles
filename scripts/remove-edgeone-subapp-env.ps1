# 删除 EdgeOne Pages 上已废弃的子项目环境变量
# 用法: $env:EDGEONE_API_TOKEN = "<token>"; .\scripts\remove-edgeone-subapp-env.ps1

$ErrorActionPreference = "Stop"

if (-not $env:EDGEONE_API_TOKEN) {
  Write-Error "请先设置环境变量 EDGEONE_API_TOKEN（EdgeOne 控制台 → API Token）"
}

$toRemove = @(
  "VITE_STUDENT_DDL_URL",
  "VITE_STARTRAIL_NOTES_URL",
  "VITE_TRAVELER_WEATHER_URL",
  "VITE_TRAVELER_AI_URL",
  "VITE_PORTFOLIO_URL"
)

Write-Host "当前环境变量:"
npx -y edgeone pages env ls

foreach ($key in $toRemove) {
  Write-Host "删除 $key ..."
  npx -y edgeone pages env rm $key 2>&1
}

Write-Host "`n删除后环境变量:"
npx -y edgeone pages env ls

Write-Host "`n请确认保留: VITE_BASE=/、VITE_ICP_BEIAN、VITE_GONGAN_BEIAN、VITE_GONGAN_BEIAN_URL"
Write-Host "然后在控制台触发一次重新部署。"
