import { getBaseUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    console.log("data:", data.phone);

    //envia o email(msg no whatsapp)
    const baseUrl = getBaseUrl();

    const message = `Eeei ${data.name}, passando pra lembrar do aniversário da Laurinha, sexta-feira, às 19:30.
    Se quiser mais detalhes, pode clicar no link que vai ter tudo o que você precisa pra curtir a festinha dela. Te vejo lá.`

    console.log(message);

    const response = await fetch('https://v2-api.gzappy.com/message/send-link', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GZAPPY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: `55${data.phone}`,
        link: "https://festa-da-laura.com.br/about",
        thumbnail_url: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/08/Kpop-Demon-Hunters.png?w=1024",
        title: "Lembrete para o aniversário da Laurinha",
        message: message
      })
    });

    return NextResponse.json("Lembrete enviado com sucesso");
}