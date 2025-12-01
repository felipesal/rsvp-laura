// app/(auth)/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);
    if (res.ok) router.push("/login");
    else alert("Erro ao registrar");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
        />

        <Button className="w-full" onClick={handleRegister} disabled={loading}>
          {loading ? "Carregando..." : "Registrar"}
        </Button>
      </div>
    </div>
  );
}