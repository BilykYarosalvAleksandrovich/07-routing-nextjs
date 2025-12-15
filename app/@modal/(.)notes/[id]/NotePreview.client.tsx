"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        {/* 🔥 ОБОВʼЯЗКОВА кнопка закриття */}
        <button
          type="button"
          className={css.closeButton}
          onClick={() => router.back()}
        >
          ✕
        </button>

        {isLoading && <p>Loading note...</p>}
        {isError && <p>Failed to load note</p>}

        {note && (
          <>
            <h2 className={css.title}>{note.title}</h2>

            <p className={css.meta}>
              <span className={css.tag}>{note.tag}</span>
              <span className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </p>

            <p className={css.content}>{note.content}</p>
          </>
        )}
      </div>
    </Modal>
  );
}
