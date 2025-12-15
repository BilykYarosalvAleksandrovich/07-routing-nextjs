import Link from "next/link";
import type { NotesTag } from "@/types/note";
import css from "./SidebarNotes.module.css";

const tags: NotesTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Sidebar() {
  return (
    <aside>
      <nav aria-label="Notes filter">
      <ul className={css.menuList}>
  <li className={css.menuItem}>
    <Link className={css.menuLink} href="/notes/filter/all">
      All notes
    </Link>
  </li>
</ul>
      </nav>
    </aside>
  );
}
