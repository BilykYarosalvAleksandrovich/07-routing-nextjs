"use client";

import { useState } from "react";
import {
  useQuery,
  DehydratedState,
  HydrationBoundary,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { PER_PAGE } from "@/config";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import css from "./Notes.module.css";

interface Props {
  dehydratedState?: DehydratedState | null;
}

export default function NotesClient({ dehydratedState }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>(
    {
      queryKey: ["notes", page, debouncedSearch],
      queryFn: () =>
        fetchNotes({
          page,
          perPage: PER_PAGE,
          search: debouncedSearch,
        }),
      placeholderData: (prev) => prev,
    }
  );

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={css.container}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={setSearch} />

          {data && data.totalPages > 1 && (
            <Pagination
              current={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </header>

        <main>
          {isLoading && <p>Loading notes...</p>}
          {isFetching && !isLoading && <p>Updating results...</p>}
          {isError && <p>Something went wrong</p>}

          {data?.notes?.length ? (
            <NoteList notes={data.notes} />
          ) : (
            !isLoading && <p>No notes found</p>
          )}
        </main>
      </div>
    </HydrationBoundary>
  );
}
