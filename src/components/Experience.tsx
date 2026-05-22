import { motion } from "framer-motion";
import type { Profile } from "../data/types";
import { sortExperience } from "../utils/sortExperience";
import SectionHeading from "./SectionHeading";
import ExperienceItem from "./ExperienceItem";

interface ExperienceProps {
  profile: Profile;
}

export default function Experience({ profile }: ExperienceProps) {
  const items = sortExperience(profile.experience ?? []);

  return (
    <motion.section
      id="experience"
      className="scroll-mt-24 py-20 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="经历"
          subtitle="工作、实习、教育与项目相关经历"
        />
        <ul className="grid gap-6">
          {items.map((item) => (
            <li key={`${item.type}-${item.title}-${item.startDate}`}>
              <ExperienceItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
