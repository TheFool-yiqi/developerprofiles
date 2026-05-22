import { motion } from "framer-motion";
import { Github, Mail, MessageCircle, Phone } from "lucide-react";
import type { Profile } from "../data/types";
import { hasProjects } from "../utils/sectionVisibility";
import { publicUrl } from "../utils/publicUrl";
import { btnPrimary, btnSecondaryDark } from "../utils/theme";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const avatarSrc = profile.avatar ? publicUrl(profile.avatar) : undefined;
  const resumeSrc = profile.resumeUrl ? publicUrl(profile.resumeUrl) : undefined;
  const projectsHref = hasProjects(profile) ? "#projects" : "#about";
  const avatarFallback = profile.initials;

  return (
    <section
      id="home"
      className="scroll-mt-24 border-b border-neutral-800 bg-black pb-20 pt-28 text-neutral-100 md:pb-28 md:pt-32"
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
              className="h-36 w-36 rounded-full border-2 border-neutral-500 object-cover md:h-44 md:w-44"
            />
          ) : (
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-neutral-600 bg-neutral-900 text-3xl font-bold tracking-widest text-white md:h-44 md:w-44"
              aria-hidden
            >
              {avatarFallback}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
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
            <a href={projectsHref} className={btnPrimary}>
              查看项目
            </a>
            {resumeSrc ? (
              <a
                href={resumeSrc}
                target="_blank"
                rel="noreferrer"
                className={btnSecondaryDark}
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
                className="rounded-full border border-neutral-600 p-2.5 text-neutral-300 transition hover:border-white hover:text-white"
              >
                <Github size={20} />
              </a>
            ) : null}
            <a
              href={`mailto:${profile.email}`}
              aria-label="发送邮件"
              className="rounded-full border border-neutral-600 p-2.5 text-neutral-300 transition hover:border-white hover:text-white"
            >
              <Mail size={20} />
            </a>
            {profile.socials?.wechat ? (
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-600 px-3 py-2 text-sm text-neutral-300"
                title={`微信：${profile.socials.wechat}`}
              >
                <MessageCircle size={18} />
                微信
              </span>
            ) : null}
            {profile.socials?.phone ? (
              <a
                href={`tel:${profile.socials.phone.replace(/\s/g, "")}`}
                aria-label="拨打电话"
                className="rounded-full border border-neutral-600 p-2.5 text-neutral-300 transition hover:border-white hover:text-white"
              >
                <Phone size={20} />
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
