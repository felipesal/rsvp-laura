// app/api/guests/confirm/route.ts

import db from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.json();

  const token = data.token;

  if (!token) {
    return Response.json({ error: "Token ausente" }, { status: 400 });
  }

  const guest = await db.guest.findUnique({ where: { token } });

  if (!guest) {
    return Response.json({ error: "Token inválido" }, { status: 404 });
  }

  // Atualiza confirmação
  await db.guest.update({
    where: { token },
    data: {
      status: data.status,
      companions: data.companions ?? [],
    }
  });

  return Response.json({ success: true });
}
