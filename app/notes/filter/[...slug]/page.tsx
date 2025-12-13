import { fetchNotes } from "@/lib/api";
import NotesList from "@/components/NotesList/NotesList";
import css from "./FilterPage.module.css";

interface Props {
  params: { slug: string[] };
}

export default async function FilterPage({ params }: Props) {
  const tag = params.slug?.[0];

  const { notes } = await fetchNotes({
    page: 1,
    perPage: 20,
    tag: tag === "all" ? undefined : tag,
  });

  return (
    <div className={css.container}>
      <NotesList notes={notes} />
    </div>
  );
}
