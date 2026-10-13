"use client";

import { useActionState, useState } from "react";
import { login, signup, type AuthState } from "./actions";

export function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginState, loginAction, loginPending] = useActionState<AuthState, FormData>(login, undefined);
  const [signupState, signupAction, signupPending] = useActionState<AuthState, FormData>(signup, undefined);

  const isLogin = mode === "login";
  const state = isLogin ? loginState : signupState;
  const pending = isLogin ? loginPending : signupPending;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-5 grid grid-cols-2 rounded-lg bg-zinc-100 p-1 text-sm dark:bg-zinc-800">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-md py-1.5 font-medium transition ${isLogin ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded-md py-1.5 font-medium transition ${!isLogin ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}
        >
          회원가입
        </button>
      </div>

      <form action={isLogin ? loginAction : signupAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {state.error}
          </p>
        )}
        {state?.message && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "처리 중…" : isLogin ? "로그인" : "회원가입"}
        </button>
      </form>
    </div>
  );
}
