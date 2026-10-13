import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { ContactForm } from "@/components/contact-form";
import type { Contact } from "@/lib/types";
import { updateContact } from "../../actions";

export const metadata: Metadata = { title: "연락처 수정 · 연락처" };

async function EditForm({
  params,
}: {
  params: PageProps<"/contacts/[id]/edit">["params"];
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  const contact = data as Contact;
  const action = updateContact.bind(null, contact.id);

  return <ContactForm action={action} contact={contact} submitLabel="저장" />;
}

export default function EditContactPage({
  params,
}: PageProps<"/contacts/[id]/edit">) {
  return (
    <main className="mx-auto w-full max-w-lg px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">연락처 수정</h1>
      <Suspense fallback={<p className="text-sm text-zinc-500">불러오는 중...</p>}>
        <EditForm params={params} />
      </Suspense>
    </main>
  );
}
