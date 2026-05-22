interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  variant?: "dark" | "light";
}

export default function SectionHeading({
  title,
  subtitle,
  variant = "dark",
}: SectionHeadingProps) {
  const isLight = variant === "light";

  return (
    <div className="mb-10 md:mb-12">
      <h2
        className={`text-2xl font-semibold tracking-tight md:text-3xl ${
          isLight ? "text-panda-black" : "text-panda-white"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-2 max-w-2xl ${
            isLight ? "text-panda-black/60" : "text-panda-gray"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
