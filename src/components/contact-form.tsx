"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Contact } from "@/lib/types";
import type { ContactFormState } from "@/app/contacts/actions";

type Props = {
  action: (prev: ContactFormState, formData: FormData) => Promise<ContactFormState>;
  contact?: Contact;
  submitLabel: string;
};

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950";

export function ContactForm({ action, contact, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(
    action,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={contact?.name}
          className={inputClass}
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          전화번호 <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          placeholder="010-1234-5678"
          defaultValue={contact?.phone}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={contact?.email ?? ""}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="group" className="mb-1 block text-sm font-medium">
          그룹
        </label>
        <input
          id="group"
          name="group"
          placeholder="가족, 친구, 회사 등"
          defaultValue={contact?.group ?? ""}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="memo" className="mb-1 block text-sm font-medium">
          메모
        </label>
        <textarea
          id="memo"
          name="memo"
          rows={3}
          defaultValue={contact?.memo ?? ""}
          className={inputClass}
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="favorite"
          defaultChecked={contact?.favorite}
          className="h-4 w-4 accent-blue-600"
        />
        즐겨찾기
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {state.error}
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "저장 중..." : submitLabel}
        </button>
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
