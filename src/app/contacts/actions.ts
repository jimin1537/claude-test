"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPhone, isValidPhone } from "@/lib/phone";

export type ContactFormState = { error?: string } | undefined;

function parseContactForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const group = String(formData.get("group") ?? "").trim() || null;
  const memo = String(formData.get("memo") ?? "").trim() || null;
  const favorite = formData.get("favorite") === "on";

  if (!name) return { error: "이름을 입력하세요." } as const;
  if (!isValidPhone(phone)) return { error: "올바른 전화번호를 입력하세요." } as const;

  return { data: { name, phone: formatPhone(phone), email, group, memo, favorite } } as const;
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function createContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = parseContactForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("contacts")
    .insert({ ...parsed.data, user_id: user.id });
  if (error) return { error: "저장에 실패했습니다. 잠시 후 다시 시도하세요." };

  revalidatePath("/");
  redirect("/");
}

export async function updateContact(
  id: string,
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = parseContactForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("contacts")
    .update(parsed.data)
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) return { error: "수정에 실패했습니다. 잠시 후 다시 시도하세요." };

  revalidatePath("/");
  redirect("/");
}

export async function deleteContact(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase, user } = await requireUser();
  await supabase.from("contacts").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/");
}

export async function toggleFavorite(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const next = formData.get("favorite") === "true";
  if (!id) return;

  const { supabase, user } = await requireUser();
  await supabase
    .from("contacts")
    .update({ favorite: next })
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/");
}
