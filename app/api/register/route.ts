import { NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts";
import db from "@/lib/db";

interface User {
    name:string,
    email: string,
    password: string
}

export async function POST(req: Request) {
  const data = await req.json();
  const newUser = data as User
  
  // Exemplo de validação simples
  if (!data.email || !data.password) {
    return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: {
      email: newUser.email,
    },
  })

  if(user) {
    return NextResponse.json({error:"Usuário já existe"}, {status:422});
  }

  await db.user.create({
    data: {
      name: newUser.name,
      email: newUser.email,
      password: hashSync(newUser.password)
    }
  })
  console.log(newUser.name);

  // Aqui você poderia salvar no banco, ex:
  // await prisma.user.create({ data });

  return NextResponse.json({ message: "Usuário criado com sucesso!" });
}