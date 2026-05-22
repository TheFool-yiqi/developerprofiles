interface FooterProps {
  name: string;
}

export default function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-neutral-500">
        <p>
          © {year} {name}. 保留所有权利。
        </p>
      </div>
    </footer>
  );
}
