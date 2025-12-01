"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GuestCard({ guest, index }: any) {
  const statusColor = (status: any) => {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="rounded-2xl shadow-xl border-2 border-pink-300 bg-white/70 backdrop-blur-md">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-purple-700">{guest.name}</h2>
            <Badge
              className={`${statusColor(guest.status)} text-white px-3 py-1 rounded-full`}
            >
              {guest.status}
            </Badge>
          </div>

          {guest.companions?.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold text-pink-600 mb-2">
                Acompanhantes:
              </h3>
              <ul className="space-y-2">
                {guest.companions.map((c: any, i: any) => (
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
  );
}
