import db from "@/lib/db";
import { Phone } from "lucide-react";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
  
    if (!token) {
      return Response.json({ error: "Token ausente" }, { status: 400 });
    }
  
    const guest = await db.guest.findUnique({ where: { token } });
  
    if (!guest) {
      return Response.json({ valid: false, error: "Token inválido" }, { status: 404 });
    }
  
    return Response.json({
      valid: true,
      name: guest.name,
      status: guest.status,
      companions: guest.companions ?? [],
    });
  }