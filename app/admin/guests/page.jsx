import GuestCard from "@/components/guest-card"
import db from "@/lib/db";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function GuestListPage() {

  const guests = await db.guest.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      {/* Top bar */}
      <div className="w-full flex justify-end mb-6">
        <Link
          href="/admin/guests/new"
          className="bg-pink-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:bg-pink-700 transition"
        >
          + Adicionar Convidado
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold text-center text-pink-700 drop-shadow-lg mb-10">
        Lista de Convidados — Niver da Lalá
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guests.map((guest, index) => (
          <GuestCard key={guest.id} guest={guest} index={index} />
        ))}
      </div>
    </div>
  );
}
