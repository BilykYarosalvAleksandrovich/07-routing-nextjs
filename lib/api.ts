import axios, { isAxiosError } from "axios";
import type { Note, NoteTag } from "@/types/note";

/* ============================
   ENV TOKEN
============================ */

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  throw new Error(
    "❌ NEXT_PUBLIC_NOTEHUB_TOKEN is missing. Add it to .env.local"
  );
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
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string; // "all" обробляємо окремо
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
   API FUNCTIONS
============================ */

// ✅ Отримання списку нотаток
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  try {
    const res = await api.get<FetchNotesResponse>("/notes", {
      params: {
        page: params.page,
        perPage: params.perPage,
        search: params.search,
        // 🔥 якщо tag === "all" — НЕ передаємо
        tag: params.tag && params.tag !== "all" ? params.tag : undefined,
      },
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("❌ fetchNotes error:", error.response?.data);
    }
    throw error;
  }
};

// ✅ Отримання нотатки за ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("❌ fetchNoteById error:", error.response?.data);
    }
    throw error;
  }
};

// ✅ Створення нотатки
export const createNote = async (dto: CreateNoteDto): Promise<Note> => {
  try {
    const res = await api.post<Note>("/notes", dto);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("❌ createNote error:", error.response?.data);
    }
    throw error;
  }
};

// ✅ Видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const res = await api.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("❌ deleteNote error:", error.response?.data);
    }
    throw error;
  }
};
