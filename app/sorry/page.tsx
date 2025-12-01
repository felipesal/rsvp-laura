"use client";

import { motion } from "framer-motion";
import { ArrowLeft, HeartCrack, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SorryPage() {
  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-black/50 bg-blend-multiply text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">

      {/* brilho no fundo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center mix-blend-screen pointer-events-none"
      />

      {/* Ícone animado */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <HeartCrack size={90} className="text-pink-300 drop-shadow-2xl" />
      </motion.div>

      {/* Título */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-2xl mb-4"
      >
        Poxa... que pena 😢
      </motion.h1>

      {/* Texto */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="max-w-xl text-center text-lg md:text-xl text-white/90 leading-relaxed"
      >
        A Laura vai sentir sua falta na festa, mas entende totalmente ❤️  
        A energia especial das{" "}
        <span className="font-semibold text-pink-300">Guerreiras do K-Pop</span>{" "}
        ainda vai estar lá por você ✨  
        <br />  
        Obrigado por avisar!
      </motion.p>

      {/* Botão de voltar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10"
      >
        <Link href="/">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl shadow-lg gap-2">
            <ArrowLeft size={18} /> Voltar
          </Button>
        </Link>
      </motion.div>

      {/* Rodapé */}
      <footer className="absolute bottom-5 text-white/70 text-xs">
        Criado com amor para a Laura 💖
      </footer>
    </div>
  );
}
