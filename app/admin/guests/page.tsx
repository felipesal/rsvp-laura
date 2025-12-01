"use client";

import { useEffect, useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Defina os tipos de dados esperados:

interface Companion {
  name: string;
  status: 'confirmed' | 'canceled' | 'pending' | 'cancelled';
  // Adicione outras propriedades se existirem
}

interface Guest {
  name: string;
  status: 'confirmed' | 'canceled' | 'pending' | 'cancelled';

  companions?: Companion[];
  // Adicione outras propriedades se existirem
}

interface GuestRow {
  nome: string;
  status: 'confirmed' | 'canceled' | 'pending' | 'cancelled';
  tipo: "principal" | "acompanhante";
}

export default function GuestListPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("todos");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/guests");
        const data = await res.json();
        setGuests(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 🔄 Flatten para exibir principais + acompanhantes como linhas
  const rows = useMemo(() => {
    const out: GuestRow[] = [];

    guests.forEach((g: Guest) => {
      out.push({
        nome: g.name,
        status: g.status,
        tipo: "principal",
      });

      g.companions?.forEach((a) => {
        out.push({
          nome: a.name,
          status: a.status,
          tipo: "acompanhante",
        });
      });
    });

    return out;
  }, [guests]);

  console.log(guests);

  // 🎛 Aplicação dos filtros
  const filtered = useMemo(() => {
    return rows.filter((item: GuestRow) => {
      if (statusFilter !== "todos" && item.status !== statusFilter) return false;
      if (typeFilter !== "todos" && item.tipo !== typeFilter) return false;
      if (search.trim() !== "" && !item.nome.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [rows, statusFilter, typeFilter, search]);

  const statusColor = (s: string) => {
    switch (s) {
      case "confirmed":
        return "bg-green-600";
      case "cancelled":
        return "bg-red-600"
      case "pending":
        return "bg-yellow-600";
      default:
        return "";
    }
  };

  const statusLabel = (s:string) => {
    switch(s) {
      case "confirmed":
        return "Confirmado";
      case "cancelled":
        return "Cancelado";
      case "pending":
        return "Pendente"
    }
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Lista de Convidados</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Buscar */}
        <Input
          placeholder="Buscar por nome..."
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="confirmed">Confirmados</SelectItem>
            <SelectItem value="cancelled">Não confirmados</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
          </SelectContent>
        </Select>

        {/* Tipo */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="min-w-[160px] w-full sm:w-[160px]">
              <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Principais + Acompanhantes</SelectItem>
            <SelectItem value="principal">Somente Principais</SelectItem>
            <SelectItem value="acompanhante">Somente Acompanhantes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/guests/new">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold">
            Criar Convidado
          </Button>
        </Link>
      </div>


      {/* Tabela */}
      <div className="border rounded-lg overflow-x-auto">  {/* <<< Scroll só dentro da tabela */}
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left p-3 font-medium">Nome</th>
              <th className="text-left p-3 font-medium">Tipo</th>
              <th className="text-left p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">{item.nome}</td>
                <td className="p-3 capitalize">{item.tipo}</td>
                <td className="p-3">
                  <Badge className={`${statusColor(item.status)} text-white`}>
                    {statusLabel(item.status)}
                  </Badge>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-muted-foreground">
                  Nenhum convidado encontrado com esses filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
