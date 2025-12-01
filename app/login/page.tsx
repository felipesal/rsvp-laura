// app/(auth)/login/page.tsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    if (res?.ok) window.location.href = "/";
    else alert("Credenciais incorretas");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>

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

        <Button className="w-full" onClick={handleLogin} disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </div>
    </div>
  );
}
