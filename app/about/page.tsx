"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PartyInfoPage() {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-pink-500 via-purple-600 to-indigo-700 text-white relative overflow-hidden p-6 flex flex-col items-center">
    <div className="min-h-screen bg-[url('/background.png')] text-center bg-cover bg-center bg-black/50 bg-blend-multiply text-white p-6 relative overflow-hidden flex flex-col items-center mt-8">
      {/* Fundo com estrelas */}
      <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-40 mix-blend-screen pointer-events-none" />

      {/* Elementos flutuantes */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 opacity-70"
      >
        <Sparkles size={60} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-14 right-12 opacity-70"
      >
        <Star size={55} />
      </motion.div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-2xl text-center space-y-6 mt-10 mb-10 flex flex-col items-center">

        <motion.h1
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold drop-shadow-lg"
        >
          O que vai rolar ✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90"
        >
          A Laura está completando <span className="font-semibold text-yellow-300">8 anos</span> e organizou uma festa cheia de brilho, magia e energia no estilo das{" "}
          <span className="font-semibold text-pink-300">Guerreiras do K-Pop</span>!
          <br /><br />
          Vai ter muita diversão, música, surpresas e momentos inesquecíveis.  
          Ela está super animada e <span className="font-bold text-yellow-200">espera muito pela sua presença!</span>
        </motion.p>

        {/* Card principal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-lg bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 mt-10 border border-white/30 space-y-6"
      >
            <div className="space-y-4 text-white">
                <div className="flex items-center gap-3">
                    <Calendar className="text-pink-300" />
                    <p className="text-lg"><strong>Data:</strong> 19 de Dezembro de 2025</p>
                </div>

                <div className="flex items-center gap-3">
                    <Clock className="text-purple-300" />
                    <p className="text-lg"><strong>Horário:</strong> 19h30</p>
                </div>

                <div className="flex items-start gap-3">
                    <MapPin className="text-yellow-300 mt-1" />
                    <p className="text-lg">
                    <strong>Local:</strong> Condomínio Vila Santa Inês<br />
                    Av. Rui Braga Ribeiro, 1575 – Vila Velha, ES
                    </p>
                </div>
            </div>
        </motion.div>

        {/* MAPA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 mt-8"
        >
          <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7481.278742122681!2d-40.31837822229004!3d-20.356511500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb83d23e9106e19%3A0x4b49f2e9cf53dd56!2sVilla%20Santa%20In%C3%AAs%20Residencial%20Clube%20-%20Entrada%20de%20Ve%C3%ADculos!5e0!3m2!1spt-BR!2sbr!4v1764475000490!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="250" 
                loading="lazy"
                allowFullScreen
                className="border-0"
                >

            </iframe>
        </motion.div>

        {/* Botão voltar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pt-6"
        >
          <Link href="/">
            <Button className="px-6 py-4 bg-pink-600 hover:bg-pink-700 rounded-2xl text-lg font-bold shadow-lg hover:shadow-pink-400/40">
              Voltar ao início 💖
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Rodapé */}
      <footer className="absolute bottom-4 text-xs md:text-sm text-white/80 z-10 mt-8 pt-8">
        Criado com brilho para a Laura 💜✨
      </footer>
    </div>
  );
}
