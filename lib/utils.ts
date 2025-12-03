import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl(){
    if (typeof window !== "undefined") {
      // Rodando no client
      return "";
    }
  
    if (process.env.VERCEL_URL) {
      // Preview ou produção na Vercel
      return `https://festa-da-laura.com.br`;
    }
  
    // Ambiente local
    return "http://localhost:3000";
  }
