"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string } | undefined;

function getCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  return { email, password };
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = getCredentials(formData);
  if (!email || !password) return { error: "이메일과 비밀번호를 입력하세요." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };

  redirect("/");
}

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = getCredentials(formData);
  if (!email || !password) return { error: "이메일과 비밀번호를 입력하세요." };
  if (password.length < 6) return { error: "비밀번호는 6자 이상이어야 합니다." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };

  // 이메일 확인이 꺼져 있으면 세션이 바로 생성됩니다.
  if (data.session) redirect("/");

  return { message: "가입 확인 메일을 보냈습니다. 메일함을 확인한 뒤 로그인하세요." };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
