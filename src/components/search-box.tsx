"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) params.set("q", value.trim());
      else params.delete("q");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 250);
    return () => clearTimeout(handle);
    // searchParams 를 의존성에 넣으면 입력마다 루프가 생기므로 value 만 감시합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="이름, 전화번호, 그룹으로 검색"
      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900"
    />
  );
}
