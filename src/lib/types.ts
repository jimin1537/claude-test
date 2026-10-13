export type Contact = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  email: string | null;
  group: string | null;
  memo: string | null;
  favorite: boolean;
  created_at: string;
  updated_at: string;
};
