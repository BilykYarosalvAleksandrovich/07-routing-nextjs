import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import css from "./FilterPage.module.css";

export default async function FilterPage({
  params,
}: {
  params: { tag: string[] };
}) {
  const rawTag = params.tag?.[0]; // Work / Shopping / all
  const tag = rawTag === "all" ? "" : rawTag;

  const notesData = await fetchNotes({
    page: 1,
    perPage: 100,
    search: "",
    tag: tag, // якщо "", бекенд поверне всі
  });

  return (
    <div className={css.container}>
      <NoteList notes={notesData.notes} />
    </div>
  );
}
