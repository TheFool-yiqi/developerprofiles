import { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import type { Profile } from "../data/types";
import {
  hasExperience,
  hasProjects,
  hasSkills,
} from "../utils/sectionVisibility";
import { navBar } from "../utils/theme";
import MobileDrawer, { type NavItem } from "./MobileDrawer";

interface NavbarProps {
  profile: Profile;
}

export default function Navbar({ profile }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(() => {
    const items: NavItem[] = [
      { label: "首页", href: "#home" },
      { label: "关于", href: "#about" },
    ];
    if (hasSkills(profile)) items.push({ label: "技能", href: "#skills" });
    if (hasProjects(profile)) items.push({ label: "项目", href: "#projects" });
    if (hasExperience(profile))
      items.push({ label: "经历", href: "#experience" });
    items.push({ label: "联系", href: "#contact" });
    return items;
  }, [profile]);

  return (
    <header className={`fixed inset-x-0 top-0 z-30 ${navBar}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          className="flex h-9 min-w-9 items-center justify-center rounded-md border border-panda-gray bg-panda-white px-2 text-sm font-bold tracking-widest text-panda-black"
          aria-label={`${profile.name}，返回首页`}
        >
          {profile.initials}
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-panda-gray transition hover:text-panda-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-lg p-2 text-panda-cream hover:bg-panda-charcoal md:hidden"
          aria-label="打开菜单"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>
      </div>
      <MobileDrawer
        open={open}
        items={navItems}
        onClose={() => setOpen(false)}
      />
    </header>
  );
}
