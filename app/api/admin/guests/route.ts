import db from "@/lib/db";
import { getBaseUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

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

    const message = `Eeei ${data.name}, é com grande alegria que estamos te convidando para a festa da Laurinha, no dia 19/12 às 19:30hhs. Clique no link e confirme a sua presença.
    Gostaria de pedir que, se possível, confirme até o dia 17/12 pois precisamos fechar a lista de convidados. Laurinha tá ansiosa pela sua presença! Até lá!`;

    console.log(message);

    const response = await fetch('https://v2-api.gzappy.com/message/send-link', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GZAPPY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: `55${data.phone}`,
        link: confirmUrl,
        thumbnail_url: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/08/Kpop-Demon-Hunters.png?w=1024",
        title: "Confirme sua presença no aniversario da Laura",
        message: message
      })
    });

    return NextResponse.json(guest);
}