"use client";

import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface Props {
  note: Note;
}

export default function NotePreviewClient({ note }: Props) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Created: {new Date(note.createdAt).toLocaleDateString("uk-UA")}
      </p>
    </div>
  );
}
