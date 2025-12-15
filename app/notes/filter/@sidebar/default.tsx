import Link from "next/link";
import type { NotesTag } from "@/types/note";
import css from "./SidebarNotes.module.css";

const tags: NotesTag[] = [
  "all",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export default function Sidebar() {
  return (
    <aside>
      <nav aria-label="Notes filter">
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag === "all" ? "All notes" : tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
