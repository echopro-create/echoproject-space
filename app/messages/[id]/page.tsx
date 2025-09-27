import { notFound } from "next/navigation";

export default async function MessagePage({ params }: any) {
  const id = params?.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/messages?id=eq.${id}`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      },
      cache: "no-store"
    }
  );

  if (!res.ok) return notFound();
  const data = await res.json();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Послание #{id}</h1>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}