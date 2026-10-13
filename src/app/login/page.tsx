import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "로그인 · 연락처" };

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
            ☎
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">연락처</h1>
          <p className="mt-1 text-sm text-zinc-500">전화번호를 안전하게 관리하세요.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
