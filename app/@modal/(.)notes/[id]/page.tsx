import ModalClient from "@/components/Modal/ModalClient";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";

interface Props {
  params: { id: string };
}

export default async function NoteModalPage({ params }: Props) {
  const note = await fetchNoteById(params.id);

  return (
    <ModalClient>
      <NotePreview note={note} />
    </ModalClient>
  );
}
