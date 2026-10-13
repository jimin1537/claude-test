import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-lg px-4 py-16 text-center">
      <h1 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-sm text-zinc-500">연락처가 삭제되었거나 주소가 잘못되었습니다.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline">
        목록으로 돌아가기
      </Link>
    </main>
  );
}
