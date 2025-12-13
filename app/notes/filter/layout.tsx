import { ReactNode } from "react";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className="flex gap-6">
      <aside className="w-64">{sidebar}</aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}
