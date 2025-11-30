import HomeClient from "@/components/home-client";

export default function HomePage() {
  return (
    <>
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center" />

      {/* Camada escura */}
      <div className="absolute inset-0 bg-black/50" />

      <HomeClient />
    </>
  );
}
