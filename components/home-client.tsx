"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeClient() {
  return (
    <div className="min-h-dvh text-white flex flex-col items-center justify-center overflow-hidden relative p-6">

      {/* Efeitos de brilho no fundo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center mix-blend-screen pointer-events-none"
      />

      {/* Elementos flutuantes */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 opacity-60"
      >
        <Sparkles size={60} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-12 right-10 opacity-70"
      >
        <Star size={50} />
      </motion.div>

      {/* Conteúdo principal */}
      <motion.h1
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold drop-shadow-2xl text-center mb-4"
      >
        Aniversário da <span className="text-yellow-300">Laura</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-center text-lg md:text-xl max-w-xl mb-8"
      >
        Entre na atmosfera mágica inspirada em{" "}
        <span className="text-pink-300 font-semibold">Guerreiras do K-Pop</span>,
        cheia de brilho, energia e poder.
      </motion.p>

      {/* Botão principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Link href="/about">
            <Button
            size="lg"
            className="cursor-pointer px-8 py-6 rounded-2xl text-lg font-bold bg-pink-600 hover:bg-pink-700 shadow-2xl hover:shadow-pink-400/40 transition duration-300"
            >
                O que vai rolar? ✨
            </Button> 
        </Link>
      </motion.div>

      {/* Rodapé */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-4 text-xs md:text-sm text-white/80"
      >
        Criado com amor para a Laura 💖
      </motion.footer>
    </div>
  );
}
