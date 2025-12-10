import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import css from "./Page.module.css";

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await fetchNoteById(params.id);

  return (
    <div className={css.wrapper}>
      <NotePreview note={note} />
    </div>
  );
}
