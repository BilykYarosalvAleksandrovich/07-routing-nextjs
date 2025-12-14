"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

interface Props {
  id: string;
}

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <Modal onClose={() => router.back()}>
      <article>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <p>Tag: {data.tag}</p>
      </article>
    </Modal>
  );
}
