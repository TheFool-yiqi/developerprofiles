import type { Profile } from "./types";

export const profile: Profile = {
  name: "刁雪猛",
  initials: "DXM",
  role: "Agent 应用开发工程师",
  location: "上海",
  email: "845278588@qq.com",
  intro: "紧跟时代潮流，关注 AI 前沿，专注于 Agent 应用开发。",
  about:
    "我是刁雪猛，上海海洋大学计算机技术专业硕士研究生（2025 级，预计 2028 年毕业）。读研期间持续关注人工智能前沿，将主要精力投入 Agent 应用开发，涵盖智能体架构、工具调用编排、RAG 知识增强与工程化落地等方向。已系统修读人工智能、深度学习、机器学习、并行计算等课程，注重把理论能力转化为可交付的智能体应用方案。",
  education: "上海海洋大学 · 计算机技术硕士（2025—2028）",
  skills: [
    "Python",
    "FastAPI",
    "LangChain",
    "RAG",
    "向量检索",
    "LLM 应用",
    "Prompt Engineering",
    "Agent 工作流",
    "MCP",
    "Docker",
    "Git",
    "React",
    "TypeScript",
  ],
  projects: [
    {
      title: "个人资料网站（developerprofiles）",
      description:
        "基于 React、TypeScript 与 Tailwind CSS 构建的响应式个人作品集站点，用于展示 Agent 应用开发相关技能、项目与教育背景。",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
      repo: "https://github.com/TheFool-yiqi/developerprofiles",
    },
  ],
  experience: [
    {
      type: "education",
      title: "计算机技术 硕士研究生",
      company: "上海海洋大学",
      startDate: "2025-09",
      endDate: "2028-06",
      description:
        "主修计算机技术，系统学习人工智能、深度学习、机器学习、并行计算等与 AI 密切相关的课程；研究方向聚焦于 Agent 应用开发与工程实践。",
    },
  ],
  socials: {
    github: "https://github.com/TheFool-yiqi",
    wechat: "13314207284",
    phone: "13314207284",
  },
};
