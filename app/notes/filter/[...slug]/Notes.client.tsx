"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./FilterPage.module.css";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // 🔥 обовʼязково для GoIT
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        tag,
        page,
        perPage: 10,
        search: debouncedSearch,
      }),
    placeholderData: (previousData) => previousData,
  });

  return (
    <>
      <SearchBox value={search} onChange={handleSearchChange} />

      <button onClick={() => setIsModalOpen(true)}>Create note</button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          current={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onClose={() => setIsModalOpen(false)}
            onNoteCreated={() => {
              setSearch("");
              setPage(1);
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
