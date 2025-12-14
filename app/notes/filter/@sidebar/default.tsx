import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/notes/filter/all">All notes</Link>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag.toLowerCase()}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
