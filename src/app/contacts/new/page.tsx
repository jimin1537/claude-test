import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { createContact } from "../actions";

export const metadata: Metadata = { title: "새 연락처 · 연락처" };

export default function NewContactPage() {
  return (
    <main className="mx-auto w-full max-w-lg px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">새 연락처</h1>
      <ContactForm action={createContact} submitLabel="추가" />
    </main>
  );
}
