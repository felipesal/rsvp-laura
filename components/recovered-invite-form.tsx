"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Invite } from "@/types/types";
import { useRouter } from "next/navigation";

interface InviteProps {
    invite: Invite,
    token: String
}

export default function RecoveredInviteForm(inviteProps: InviteProps) {
    const router = useRouter();
    console.log(inviteProps);
    
    const [guestStatus, setGuestStatus] = useState(
        inviteProps.invite.status === "confirmed"
    );
    
    const [companions, setCompanions] = useState(
    inviteProps.invite.companions || []
    );
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    
    
    
    async function handleSave() {
        setSaving(true);
        setSaved(false);
        
        const res = await fetch("/api/guests/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: inviteProps.token,
                status: guestStatus ? "confirmed" : "cancelled",
                companions: companions.map((c: any) => ({
                    name: c.name,
                    status: c.status
                }))
            })
        });
        
        setSaving(false);
        if(res.ok) {
            setSaved(true);
            if(guestStatus) {
                router.push("/confirmed")
            } else {
              router.push("/sorry");
            }
        }
    }
    
    function toggleCompanion(index: number) {
      setCompanions((prev: any[]) =>
        prev.map((c, i) =>
          i === index ? { ...c, status: c.status === "confirmed" ? "cancelled" : "confirmed" } : c
        )
      );
    }

    return (
      <div className="space-y-6 ">
        {/* Convidado principal */}
        <div className="flex justify-between items-center">
          <span className="font-bold">{inviteProps.invite.name}</span>
          <div className="flex justify-between items-center">
              <div className="flex items-center justify-between">
                <Switch
                    checked={guestStatus}
                    onCheckedChange={(v) => {
                    setGuestStatus(v);
                    setSaved(false);
                    }}
                    className="data-[state=checked]:bg-pink-600 data-[state=unchecked]:bg-black/50"
                />  
                <label htmlFor="presenca" className="text-sm text-gray-700 ml-2">
                  Confirmado
                </label>          
              </div>
          </div>
        </div>
    
        {/* Acompanhantes */}
        {companions.length > 0 && (
          <div className="pt-4 border-t space-y-3">
            <h2 className="font-semibold">Acompanhantes</h2>
    
            {companions.map((c: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center bg-muted p-2 rounded-lg"
              >
                <span className="font-bold">{c.name}</span>
                <div className="flex items-center justify-between">
                  <Switch
                    id="presenca"
                    checked={c.status === "confirmed"}
                    onCheckedChange={() => {
                      toggleCompanion(index);
                      setSaved(false);
                    }}
                    className="data-[state=checked]:bg-pink-600 data-[state=unchecked]:bg-black/50"
                  />
                  <label htmlFor="presenca" className="text-sm text-gray-700 ml-2">
                    Confirmado
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
    
        {/* Botão de salvar */}
        <Button
          disabled={saving}
          onClick={handleSave}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white"
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </Button>
    
        {saved && (
          <p className="text-green-600 text-center font-semibold">
            Informações atualizadas!
          </p>
        )}
      </div>
    );
}
