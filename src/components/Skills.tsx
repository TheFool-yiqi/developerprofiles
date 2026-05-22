import { motion } from "framer-motion";
import type { Profile } from "../data/types";
import SectionHeading from "./SectionHeading";
import SkillTag from "./SkillTag";

interface SkillsProps {
  profile: Profile;
}

export default function Skills({ profile }: SkillsProps) {
  return (
    <motion.section
      id="skills"
      className="scroll-mt-24 border-b border-neutral-800 bg-black py-20 text-neutral-100 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="技能" subtitle="技术栈与工具" variant="dark" />
        <ul className="flex flex-wrap gap-3">
          {profile.skills.map((skill) => (
            <li key={skill}>
              <SkillTag label={skill} variant="dark" />
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
