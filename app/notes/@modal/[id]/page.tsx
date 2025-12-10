"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { useEffect, useState } from "react";

export default function NoteModalPage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    fetchNoteById(params.id).then(setNote);
  }, [params.id]);

  if (!note) return null;

  return (
    <Modal onClose={() => history.back()}>
      <NotePreview note={note} />
    </Modal>
  );
}
