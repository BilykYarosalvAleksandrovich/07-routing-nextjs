import Link from "next/link";
import type { NotesTag } from "@/types/note";

const tags: NotesTag[] = [
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
        <ul>
          <li>
            <Link href="/notes/filter/all">All notes</Link>
          </li>

          {tags.map((tag) => (
            <li key={tag}>
              {/* 🔥 БЕЗ toLowerCase */}
              <Link href={`/notes/filter/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}