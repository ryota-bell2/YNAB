import { supabase } from "../lib/supabase/client";
export default function Home() {
  console.log(supabase);
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        YNAB式家計管理アプリ
      </h1>

      <p className="mt-4">
        開発環境構築完了
      </p>
      <p>
        supabaseの接続確認
      </p>
    </main>
  );
}