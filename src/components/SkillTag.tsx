interface SkillTagProps {
  label: string;
  variant?: "dark" | "light";
}

export default function SkillTag({ label, variant = "dark" }: SkillTagProps) {
  const isLight = variant === "light";

  return (
    <span
      className={
        isLight
          ? "rounded-full border border-panda-gray bg-panda-white px-4 py-2 text-sm text-panda-black"
          : "rounded-full border border-panda-charcoal bg-panda-charcoal px-4 py-2 text-sm text-panda-cream"
      }
    >
      {label}
    </span>
  );
}
