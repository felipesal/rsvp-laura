import db from "@/lib/db";
import { getBaseUrl } from "@/lib/utils";
import { NextResponse } from "next/server";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET() {
    const guests = await db.guest.findMany({
        select: {
            name:true,
            status: true,
            companions: true
        },
        orderBy: {name:'asc'}
    });

    const guestsDto = [];



    return NextResponse.json(guests);
}

export async function POST(req: Request) {
    const data = await req.json();

    const token = crypto.randomUUID();

    const email = data.email;

    const guest = await db.guest.create({
        data: {
            name: data.name,
            email: email,
            phone: data.phone,
            token: token,
            companions: data.companions
        }
    })

    //envia o email(msg no whatsapp)
    const baseUrl = getBaseUrl();

    // 3. gerar link
    const confirmUrl = `${baseUrl}/confirm/${token}`;
  
    // 4. enviar e-mail/whatsapp
    await resend.emails.send({
      from: "Niver da Lalá <onboarding@resend.dev>",
      to: email,
      subject: "Você foi convidado!",
      html: `
        <p>Clique no link abaixo para confirmar sua presença:</p>
        <a href="${confirmUrl}">${confirmUrl}</a>
      `,
    });

    return NextResponse.json(guest);
}