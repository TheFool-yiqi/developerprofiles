import { footerBar } from "../utils/theme";
import {
  gonganBeian,
  gonganBeianUrl,
  icpBeian,
  icpBeianUrl,
} from "../config/siteMeta";

interface FooterProps {
  name: string;
}

export default function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear();
  const hasBeian = Boolean(icpBeian || gonganBeian);

  return (
    <footer className={`py-10 ${footerBar}`}>
      <div className="mx-auto max-w-6xl px-6 text-center text-sm">
        <p>
          © {year} {name}. 保留所有权利。
        </p>
        {hasBeian ? (
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs opacity-80">
            {icpBeian ? (
              <a
                href={icpBeianUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {icpBeian}
              </a>
            ) : null}
            {icpBeian && gonganBeian ? (
              <span aria-hidden="true">|</span>
            ) : null}
            {gonganBeian ? (
              <a
                href={gonganBeianUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {gonganBeian}
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
