# 연락처 (전화번호 관리)

Next.js 16 + Supabase 로 만든 전화번호 관리 웹사이트입니다. Vercel 에 배포합니다.

## 기능

- 이메일/비밀번호 회원가입 및 로그인 (Supabase Auth)
- 연락처 추가 · 수정 · 삭제
- 이름 / 전화번호 / 그룹 검색
- 즐겨찾기 (목록 상단 고정)
- 전화번호 자동 하이픈 포맷 (한국 번호 형식)
- Row Level Security 로 사용자별 데이터 분리

## 1. Supabase 설정

1. https://supabase.com 에서 새 프로젝트를 만듭니다.
2. **SQL Editor** 에서 `supabase/schema.sql` 내용을 붙여넣고 실행합니다.
3. **Authentication > Providers > Email** 에서 Email 이 켜져 있는지 확인합니다.
   - 테스트 중이라면 **Confirm email** 을 끄면 가입 즉시 로그인됩니다.
4. **Project Settings > API** 에서 `Project URL` 과 `anon public` 키를 복사합니다.

## 2. 로컬 실행

```bash
cp .env.example .env.local   # 복사한 뒤 값을 채웁니다
npm install
npm run dev
```

`.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

http://localhost:3000 에서 확인합니다.

## 3. Vercel 배포

1. 이 폴더를 GitHub 저장소에 push 합니다.
2. https://vercel.com/new 에서 저장소를 import 합니다.
3. **Environment Variables** 에 아래 두 값을 추가합니다.
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy 를 누릅니다.
5. 배포 후 Supabase **Authentication > URL Configuration** 에서
   `Site URL` 을 Vercel 주소(예: `https://내앱.vercel.app`)로 바꿔 주면
   가입 확인 메일 링크가 올바르게 동작합니다.

## 구조

```
src/
  proxy.ts                     세션 갱신 + 로그인 안 된 사용자 /login 으로
  lib/supabase/{client,server,proxy}.ts
  lib/phone.ts                 전화번호 포맷/검증
  app/page.tsx                 연락처 목록 + 검색
  app/login/                   로그인 / 회원가입
  app/contacts/actions.ts      생성·수정·삭제·즐겨찾기 Server Actions
  app/contacts/new/            새 연락처
  app/contacts/[id]/edit/      연락처 수정
  components/                  Header, ContactList, ContactForm, SearchBox
supabase/schema.sql            테이블 + RLS 정책
```
