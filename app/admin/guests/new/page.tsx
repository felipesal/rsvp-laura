"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Companion {
  name: string,
  status: string;
}

export default function NewGuestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companions, setCompanions] = useState<Companion[]>([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function addCompanion() {
    setCompanions([...companions, { name: "", status: "pending" }]);
  }

  function updateCompanion(index:number, field: keyof Companion, value: any) {
    const updated = [...companions];
    updated[index][field] = value;
    setCompanions(updated);
  }

  function removeCompanion(index: number) {
    setCompanions(companions.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: any) {
    console.log(companions);
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, companions }),
      });
      console.log(res.json);

      if (!res.ok) throw new Error("Falha ao cadastrar convidado.");

      setSuccess(true);
      setName("");
      setPhone("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6 flex justify-center items-start pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="rounded-2xl shadow-xl border-2 border-pink-300 bg-white/70 backdrop-blur-md">
          <CardContent className="p-8">
            <h1 className="text-3xl font-extrabold text-center text-pink-700 mb-6">
              Novo Convidado
            </h1>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Nome */}
              <div>
                <label className="block mb-1 text-purple-700 font-semibold">Nome</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do convidado"
                  required
                  className="rounded-xl"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block mb-1 text-purple-700 font-semibold">Telefone</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(XX)XXXXX-XXXX"
                  required
                  className="rounded-xl"
                />
              </div>

              {/* Acompanhantes */}
              <div>
                <h3 className="text-lg font-bold text-pink-700 mb-2">Acompanhantes</h3>

                <div className="space-y-4">
                  {companions.map((comp, index) => (
                    <div key={index} className="p-4 bg-white/60 border border-pink-200 rounded-xl">
                      <Input
                        type="text"
                        placeholder="Nome do acompanhante"
                        value={comp.name}
                        onChange={(e) => updateCompanion(index, "name", e.target.value)}
                        className="rounded-xl mb-2"
                      />

                      {companions.length > 0 && (
                        <button
                          type="button"
                          onClick={() => removeCompanion(index)}
                          className="mt-2 text-sm text-red-500 hover:underline"
                        >
                          Remover acompanhante
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={addCompanion}
                  className="mt-3 bg-purple-500 hover:bg-purple-600 text-white w-full rounded-xl"
                >
                  + Adicionar acompanhante
                </Button>
              </div>

              {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
              {success && <p className="text-green-600 text-sm font-semibold">Convidado cadastrado!</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold py-2 shadow-md"
              >
                {loading ? "Salvando..." : "Cadastrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
