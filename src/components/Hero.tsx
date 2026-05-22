import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "../data/types";
import { hasProjects } from "../utils/sectionVisibility";
import { publicUrl } from "../utils/publicUrl";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const avatarSrc = profile.avatar ? publicUrl(profile.avatar) : undefined;
  const resumeSrc = profile.resumeUrl ? publicUrl(profile.resumeUrl) : undefined;
  const projectsHref = hasProjects(profile) ? "#projects" : "#about";
  const initial = profile.name.trim().charAt(0) || "?";

  return (
    <section
      id="home"
      className="scroll-mt-24 border-b border-white/10 pb-20 pt-28 md:pb-28 md:pt-32"
    >
      <motion.div
        className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[auto_1fr] md:items-center md:gap-14"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center md:justify-start">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={`${profile.name} 的头像`}
              className="h-36 w-36 rounded-full border-2 border-cyan-400/40 object-cover md:h-44 md:w-44"
            />
          ) : (
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-dashed border-white/20 bg-white/5 text-4xl font-semibold text-cyan-300 md:h-44 md:w-44"
              aria-hidden
            >
              {initial}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            个人资料
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-neutral-300 md:text-xl">{profile.role}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-neutral-400">
            {profile.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={projectsHref}
              className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-cyan-300"
            >
              查看项目
            </a>
            {resumeSrc ? (
              <a
                href={resumeSrc}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition hover:border-cyan-400/50 hover:text-cyan-300"
              >
                下载简历
              </a>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {profile.socials?.github ? (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="打开 GitHub"
                className="rounded-full border border-white/15 p-2.5 text-neutral-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <Github size={20} />
              </a>
            ) : null}
            {profile.socials?.linkedin ? (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="打开 LinkedIn"
                className="rounded-full border border-white/15 p-2.5 text-neutral-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <Linkedin size={20} />
              </a>
            ) : null}
            <a
              href={`mailto:${profile.email}`}
              aria-label="发送邮件"
              className="rounded-full border border-white/15 p-2.5 text-neutral-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
