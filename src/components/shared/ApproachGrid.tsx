import { Handshake, Megaphone, MessagesSquare, Search, type LucideIcon } from "lucide-react";

import { APPROACHES, type Approach } from "@/content/site";

const ICONS: Record<Approach["icon"], LucideIcon> = {
  search: Search,
  megaphone: Megaphone,
  messages: MessagesSquare,
  handshake: Handshake,
};

/** IoU's four ways of working, shared by the home and about pages. */
export function ApproachGrid() {
  return (
    <ol className="grid gap-5 sm:grid-cols-2">
      {APPROACHES.map((approach, index) => {
        const Icon = ICONS[approach.icon];
        return (
          <li
            key={approach.title}
            className="reveal group relative overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-forest-900/5 transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-900/10 motion-reduce:hover:translate-y-0"
          >
            <span
              aria-hidden
              className="absolute -top-4 -right-2 font-display text-8xl font-semibold text-leaf-100 transition-colors duration-500 group-hover:text-leaf-200"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="relative grid size-12 place-items-center rounded-2xl bg-leaf-700 text-white transition-transform duration-500 group-hover:-rotate-6">
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="relative mt-6 text-xl font-semibold text-forest-900">{approach.title}</h3>
            <p className="relative mt-2 leading-relaxed text-muted">{approach.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
