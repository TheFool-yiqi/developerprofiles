import { motion } from "framer-motion";
import type { Profile } from "../data/types";
import SectionHeading from "./SectionHeading";

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  return (
    <motion.section
      id="about"
      className="scroll-mt-24 border-y border-neutral-300 bg-neutral-100 py-20 text-neutral-900 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="关于我"
          subtitle="更完整的背景介绍与职业方向"
          variant="light"
        />
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-neutral-700">
          <p>{profile.about}</p>
          {profile.location ? (
            <p>
              <span className="font-medium text-neutral-500">所在地：</span>
              {profile.location}
            </p>
          ) : null}
          {profile.education ? (
            <p>
              <span className="font-medium text-neutral-500">教育背景：</span>
              {profile.education}
            </p>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}
