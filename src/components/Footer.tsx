import { footerBar } from "../utils/theme";

interface FooterProps {
  name: string;
}

export default function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={`py-10 ${footerBar}`}>
      <div className="mx-auto max-w-6xl px-6 text-center text-sm">
        <p>
          © {year} {name}. 保留所有权利。
        </p>
      </div>
    </footer>
  );
}
