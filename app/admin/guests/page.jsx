"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function GuestListPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/guests");
        const data = await res.json();
        setGuests(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
        <div className="w-full flex justify-end mb-6">
            <a
                href="/admin/guests/new"
                className="bg-pink-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:bg-pink-700 transition"
            >
                + Adicionar Convidado
            </a>
        </div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center text-pink-700 drop-shadow-lg mb-10"
      >
        Lista de Convidados — Niver da Lalá
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader2 className="animate-spin w-10 h-10 text-pink-700" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guests.map((guest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="rounded-2xl shadow-xl border-2 border-pink-300 bg-white/70 backdrop-blur-md">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-purple-700">{guest.name}</h2>
                    <Badge
                      className={`${statusColor(
                        guest.status
                      )} text-white px-3 py-1 rounded-full`}
                    >
                      {guest.status}
                    </Badge>
                  </div>

                  {guest.companions && guest.companions.length > 0 ? (
                    <div>
                      <h3 className="text-sm font-semibold text-pink-600 mb-2">
                        Acompanhantes:
                      </h3>
                      <ul className="space-y-2">
                        {guest.companions.map((c, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-center bg-white/60 rounded-xl px-3 py-1 shadow-sm"
                          >
                            <span className="text-purple-700 font-medium">{c.name}</span>
                            <span
                              className={`text-xs font-bold text-white px-2 py-1 rounded-full ${statusColor(
                                c.status
                              )}`}
                            >
                              {c.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Nenhum acompanhante cadastrado.
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
