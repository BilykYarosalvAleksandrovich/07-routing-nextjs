"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

interface Props {
  children: ReactNode;
}

export default function ModalClient({ children }: Props) {
  const router = useRouter();

  return <Modal onClose={() => router.back()}>{children}</Modal>;
}
