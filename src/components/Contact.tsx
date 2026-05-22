import { motion } from "framer-motion";
import { Github, Mail, MessageCircle, Phone } from "lucide-react";
import type { Profile } from "../data/types";
import { cardOnLight } from "../utils/theme";
import SectionHeading from "./SectionHeading";

interface ContactProps {
  profile: Profile;
}

type ContactEntry =
  | {
      key: string;
      label: string;
      display: string;
      href: string;
      external: boolean;
      icon: typeof Github;
    }
  | {
      key: string;
      label: string;
      display: string;
      icon: typeof MessageCircle;
      external?: never;
      href?: never;
    };

export default function Contact({ profile }: ContactProps) {
  const entries: ContactEntry[] = [];

  if (profile.socials?.github) {
    entries.push({
      key: "github",
      label: "GitHub",
      display: profile.socials.github.replace(/^https?:\/\/(www\.)?github\.com\//i, "@"),
      href: profile.socials.github,
      external: true,
      icon: Github,
    });
  }

  entries.push({
    key: "email",
    label: "邮箱",
    display: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    icon: Mail,
  });

  if (profile.socials?.wechat) {
    entries.push({
      key: "wechat",
      label: "微信",
      display: profile.socials.wechat,
      icon: MessageCircle,
    });
  }

  if (profile.socials?.phone) {
    const phone = profile.socials.phone.replace(/\s/g, "");
    entries.push({
      key: "phone",
      label: "手机号",
      display: profile.socials.phone,
      href: `tel:${phone}`,
      external: false,
      icon: Phone,
    });
  }

  return (
    <motion.section
      id="contact"
      className="scroll-mt-24 border-t border-neutral-300 bg-neutral-100 py-20 text-neutral-900 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="联系"
          subtitle="GitHub、邮箱、微信与手机号"
          variant="light"
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {entries.map((entry) => {
            const Icon = entry.icon;
            const content = (
              <>
                <Icon size={20} className="shrink-0 text-neutral-700" />
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    {entry.label}
                  </p>
                  <p className="truncate text-sm font-medium text-neutral-900">
                    {entry.display}
                  </p>
                </div>
              </>
            );

            return (
              <li key={entry.key}>
                {"href" in entry && entry.href ? (
                  <a
                    href={entry.href}
                    {...(entry.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className={`flex min-h-[72px] items-center gap-3 px-5 py-4 transition hover:border-neutral-900 ${cardOnLight}`}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    className={`flex min-h-[72px] items-center gap-3 px-5 py-4 ${cardOnLight}`}
                  >
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.section>
  );
}
