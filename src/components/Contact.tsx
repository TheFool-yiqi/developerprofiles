import { motion } from "framer-motion";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "../data/types";
import SectionHeading from "./SectionHeading";

interface ContactProps {
  profile: Profile;
}

export default function Contact({ profile }: ContactProps) {
  const links = [
    {
      label: "邮箱",
      href: `mailto:${profile.email}`,
      icon: Mail,
      external: false,
    },
    profile.socials?.github
      ? {
          label: "GitHub",
          href: profile.socials.github,
          icon: Github,
          external: true,
        }
      : null,
    profile.socials?.linkedin
      ? {
          label: "LinkedIn",
          href: profile.socials.linkedin,
          icon: Linkedin,
          external: true,
        }
      : null,
    profile.socials?.website
      ? {
          label: "个人网站",
          href: profile.socials.website,
          icon: ExternalLink,
          external: true,
        }
      : null,
  ].filter(Boolean) as {
    label: string;
    href: string;
    icon: typeof Mail;
    external: boolean;
  }[];

  return (
    <motion.section
      id="contact"
      className="scroll-mt-24 py-20 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="联系" subtitle="通过以下方式与我取得联系" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-neutral-200 transition hover:border-cyan-400/30 hover:text-white"
                >
                  <Icon size={20} className="text-cyan-400" />
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.section>
  );
}
