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
          ? "rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800"
          : "rounded-full border border-neutral-600 bg-neutral-900 px-4 py-2 text-sm text-neutral-200"
      }
    >
      {label}
    </span>
  );
}
