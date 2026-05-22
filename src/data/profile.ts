import type { Profile } from "./types";

export const profile: Profile = {
  name: "你的名字",
  role: "前端开发工程师",
  location: "城市，国家",
  email: "your@email.com",
  intro: "专注于 React 与现代 Web 体验的个人开发者（占位文案，上线前请替换）。",
  about:
    "这里写你的详细介绍：技术背景、兴趣方向、正在寻找的机会等。当前为占位内容，可在 src/data/profile.ts 中一键替换。",
  education: "某某大学 · 计算机相关专业（可选）",
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Vite",
    "Node.js",
    "Git",
  ],
  projects: [
    {
      title: "个人资料网站",
      description:
        "基于 React、TypeScript 与 Tailwind CSS 的响应式单页作品集（本项目）。",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      repo: "https://github.com/TheFool-yiqi/developerprofiles",
    },
    {
      title: "示例项目 B",
      description: "占位项目描述，用于展示卡片布局与技术标签。",
      tech: ["React", "Framer Motion"],
      link: "#",
      repo: "https://github.com/yourname",
    },
  ],
  experience: [
    {
      type: "internship",
      title: "前端实习生",
      company: "示例科技有限公司",
      startDate: "2024-06",
      endDate: "2024-12",
      description: "参与组件开发与页面响应式适配（占位经历）。",
    },
    {
      type: "education",
      title: "计算机科学",
      company: "示例大学",
      startDate: "2020-09",
      endDate: "2024-06",
      description: "主修软件工程相关课程（占位经历）。",
    },
  ],
  socials: {
    github: "https://github.com/TheFool-yiqi",
    linkedin: "https://linkedin.com/in/yourname",
  },
};
