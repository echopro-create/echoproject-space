import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase.server";

export default async function MessagesPage() {
  const supabase = await createSupabaseServerClient(); // РїС—Р…РїС—Р…РїС—Р… РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect("/login");

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">РїС—Р…РїС—Р…РїС—Р…РїС—Р… РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…</h1>
      <p>РїС—Р… РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р…РїС—Р… РїС—Р…РїС—Р…РїС—Р…: <b>{user.email}</b></p>
    </main>
  );
}





