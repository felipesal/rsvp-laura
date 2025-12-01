import Link from "next/link";
import { auth } from "@/auth";

export default async function LoggedNavBar() {
  const session = await auth(); // se existir = usuário logado

  if (!session) return null; // não renderiza nada

  return (
    <nav className="w-full p-4 bg-black/40 backdrop-blur-xl text-white flex justify-between items-center fixed top-0 left-0 z-50 shadow-lg mb-8">
      <Link href="/" className="font-bold text-xl tracking-wide">
        🎉 Laura Party
      </Link>

      <div className="flex gap-6 text-lg">
        <Link
          href="/admin/guests"
          className="hover:text-pink-300 transition font-semibold"
        >
          Convidados
        </Link>
      </div>
    </nav>
  );
}
