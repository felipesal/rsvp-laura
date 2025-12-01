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
    // await resend.emails.send({
    //   from: "Niver da Lalá <onboarding@resend.dev>",
    //   to: email,
    //   subject: "Você foi convidado!",
    //   html: `
    //     <p>Clique no link abaixo para confirmar sua presença:</p>
    //     <a href="${confirmUrl}">${confirmUrl}</a>
    //   `,
    // });

    const response = await fetch('https://v2-api.gzappy.com/message/send-link', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GZAPPY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: `55${data.phone}`,
        link: confirmUrl,
        thumnail_url: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/08/Kpop-Demon-Hunters.png?w=1024",
        title: "Confirme sua presença no aniversario da Laura",
        message: `Olá, é com grande alegria que estamos te convidando para a festa da Laurinha. Clique no link e confirme a sua presença`
      })
    });

    return NextResponse.json(guest);
}