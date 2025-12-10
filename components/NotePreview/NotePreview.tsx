import css from "./NotePreview.module.css";

export default function NotePreview({ note }: any) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
