import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import RecoveredInviteForm from "@/components/recovered-invite-form";
import { getBaseUrl } from "@/lib/utils";
import { Invite } from "@/types/types";
import { Button } from "@/components/ui/button";

async function getInvite(token: string) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/guests/validate?token=${token}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ValidateInvitePage({ params }: { params: { token: string } }) {
  const token = (await params).token;
  console.log(token);
  const invite = await getInvite(token);
  console.log(invite);
  if (!invite) return notFound();

  function directToInvite() {
    redirect("/about");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('/background.png')] bg-cover bg-center bg-black/50 bg-blend-multiply">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Detalhes do Convite</h1>
          <p>A festa ocorrerá no dia 19/12/2025 às 19:30hs.</p>
          <RecoveredInviteForm invite={invite as Invite} token={token} />
        </CardContent>
      </Card>
    </div>
  );
}
