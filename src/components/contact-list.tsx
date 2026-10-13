import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Contact } from "@/lib/types";
import { deleteContact, toggleFavorite } from "@/app/contacts/actions";

function escapeLike(value: string) {
  return value.replace(/[%_\\]/g, (m) => `\\${m}`);
}

export async function ContactList({ query }: { query: string }) {
  const supabase = await createClient();

  let request = supabase
    .from("contacts")
    .select("*")
    .order("favorite", { ascending: false })
    .order("name", { ascending: true });

  const q = query.trim();
  if (q) {
    const like = `%${escapeLike(q)}%`;
    const digits = q.replace(/\D/g, "");
    const filters = [`name.ilike.${like}`, `phone.ilike.${like}`, `group.ilike.${like}`];
    if (digits && digits !== q) filters.push(`phone.ilike.%${digits}%`);
    request = request.or(filters.join(","));
  }

  const { data, error } = await request;

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
        연락처를 불러오지 못했습니다. Supabase 설정과 SQL 스키마가 적용되었는지 확인하세요.
      </p>
    );
  }

  const contacts = (data ?? []) as Contact[];

  if (contacts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-700">
        <p className="text-sm text-zinc-500">
          {q ? "검색 결과가 없습니다." : "아직 저장된 연락처가 없습니다."}
        </p>
        {!q && (
          <Link
            href="/contacts/new"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            첫 연락처 추가하기
          </Link>
        )}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
      {contacts.map((c) => (
        <li key={c.id} className="flex items-center gap-3 px-4 py-3">
          <form action={toggleFavorite}>
            <input type="hidden" name="id" value={c.id} />
            <input type="hidden" name="favorite" value={String(!c.favorite)} />
            <button
              type="submit"
              aria-label={c.favorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              className={`text-xl leading-none ${c.favorite ? "text-amber-400" : "text-zinc-300 hover:text-amber-300 dark:text-zinc-600"}`}
            >
              {c.favorite ? "★" : "☆"}
            </button>
          </form>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {c.name.slice(0, 1)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="truncate font-medium">{c.name}</span>
              {c.group && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {c.group}
                </span>
              )}
            </div>
            <a
              href={`tel:${c.phone.replace(/\D/g, "")}`}
              className="text-sm text-zinc-600 hover:text-blue-600 hover:underline dark:text-zinc-400"
            >
              {c.phone}
            </a>
            {c.memo && (
              <p className="mt-0.5 truncate text-xs text-zinc-400">{c.memo}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Link
              href={`/contacts/${c.id}/edit`}
              className="rounded-md px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              수정
            </Link>
            <form action={deleteContact}>
              <input type="hidden" name="id" value={c.id} />
              <button
                type="submit"
                className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                삭제
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
