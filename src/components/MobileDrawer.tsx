import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

interface MobileDrawerProps {
  open: boolean;
  items: NavItem[];
  onClose: () => void;
}

export default function MobileDrawer({ open, items, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="关闭菜单"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            className="fixed right-0 top-0 z-50 flex h-full w-[min(85vw,320px)] flex-col border-l border-neutral-700 bg-black p-6 text-neutral-100 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            aria-label="移动端导航"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-400">菜单</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-neutral-300 hover:bg-neutral-800"
                aria-label="关闭菜单"
              >
                <X size={22} />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-xl px-4 py-3 text-base text-neutral-200 hover:bg-neutral-900 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}
