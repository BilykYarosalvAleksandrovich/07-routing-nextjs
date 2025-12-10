"use client";

import css from "./SidebarNotes.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <a
            className={css.menuLink}
            href={`/notes/filter/${tag === "All" ? "all" : tag}`}
          >
            {tag === "All" ? "All notes" : tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
