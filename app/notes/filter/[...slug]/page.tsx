import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@/components/TanStackProvider/TanStackProvider";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface Props {
  params: {
    slug?: string[];
  };
}

export default async function NotesPage({ params }: Props) {
  const tag = params.slug?.[0] ?? "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, 1, ""],
    queryFn: () =>
      fetchNotes({
        tag,
        page: 1,
        perPage: 10,
        search: "",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
