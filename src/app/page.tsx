import Link from "next/link";
import { Suspense } from "react";
import { ContactList } from "@/components/contact-list";
import { SearchBox } from "@/components/search-box";

function ListSkeleton() {
  return (
    <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 px-4 py-3">
          <div className="h-5 w-5 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-3 w-24 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </li>
      ))}
    </ul>
  );
}

async function Results({
  searchParams,
}: {
  searchParams: PageProps<"/">["searchParams"];
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  return <ContactList query={q} />;
}

export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">내 연락처</h1>
        <Link
          href="/contacts/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + 추가
        </Link>
      </div>

      <div className="mb-4">
        <Suspense fallback={null}>
          <SearchBox />
        </Suspense>
      </div>

      <Suspense fallback={<ListSkeleton />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
