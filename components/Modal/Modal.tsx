"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  // Пошук #modal-root тільки на клієнті
  useEffect(() => {
    const root = document.querySelector("#modal-root") as HTMLElement | null;
    setModalRoot(root);
  }, []);

  // Блокуємо скрол сторінки
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Закриття по ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Закриття по кліку на бекдроп
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  // Чекаємо, поки зʼявиться modal-root
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
