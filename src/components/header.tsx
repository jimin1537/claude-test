import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";

async function UserMenu() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-zinc-500 sm:inline">{user.email}</span>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">
            ☎
          </span>
          연락처
        </Link>
        <Suspense fallback={null}>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}
