import axios, { isAxiosError } from "axios";
import type { Note, NoteTag } from "@/types/note";

// Токен з .env
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  console.error(
    "❌ NEXT_PUBLIC_NOTEHUB_TOKEN is missing. Add it to .env.local and restart the server."
  );
  throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is missing");
}

/* ============================
   Axios instance
============================ */
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

/* ============================
   Types
============================ */

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string; // <-- додано спеціально для фільтрації
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content?: string;
  tag: NoteTag;
}

/* ============================
   API Functions
============================ */

// Отримання списку нотаток (з фільтром за тегом)
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  try {
    const res = await api.get<FetchNotesResponse>("/notes", {
      params: {
        page: params.page,
        perPage: params.perPage,
        search: params.search,
        tag: params.tag || undefined, // якщо тег "" → не відправляємо
      },
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error("❌ 401 Unauthorized when fetching notes");
    }
    throw error;
  }
};

// Отримання нотатки за ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error("❌ 401 Unauthorized when fetching note by ID");
    }
    throw error;
  }
};

// Створення нової нотатки
export const createNote = async (dto: CreateNoteDto): Promise<Note> => {
  try {
    const res = await api.post<Note>("/notes", dto);
    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error("❌ 401 Unauthorized when creating note");
    }
    throw error;
  }
};

// Видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const res = await api.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error("❌ 401 Unauthorized when deleting note");
    }
    throw error;
  }
};
