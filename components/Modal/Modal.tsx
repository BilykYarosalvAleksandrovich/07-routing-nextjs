"use client";

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const modalRoot = document.querySelector("#modal-root") as HTMLElement;

  // Закриття модалки
  const close = () => router.back();

  // ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Клік по бекдропу
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) close();
  };

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={css.backdrop} ref={backdropRef} onClick={handleClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
