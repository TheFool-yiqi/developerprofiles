/** ICP 备案号（工信部），页脚悬挂并链至 beian.miit.gov.cn */
export const icpBeian = import.meta.env.VITE_ICP_BEIAN?.trim() || "";

/** 公安备案号（全国互联网安全管理平台），审核通过后再填 */
export const gonganBeian = import.meta.env.VITE_GONGAN_BEIAN?.trim() || "";

/** 公安备案查询链接（按平台下发的链接填写，无则留空用默认） */
export const gonganBeianUrl =
  import.meta.env.VITE_GONGAN_BEIAN_URL?.trim() ||
  "https://www.beian.gov.cn/portal/registerSystemInfo";

export const icpBeianUrl = "https://beian.miit.gov.cn/";
