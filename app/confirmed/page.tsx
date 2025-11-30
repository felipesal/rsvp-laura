export default function ConfirmedPage() {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-pink-100 to-purple-200">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Obrigado pela confirmação! 💖
          </h1>
  
          <p className="text-gray-700 text-lg mb-6">
            Sua presença foi registrada com sucesso.
          </p>
  
          <p className="text-gray-600 mb-8">
            Lalá vai ficar muito feliz em ter você nesse dia especial.
          </p>
  
          <div className="flex justify-center">
            <a
              href="/"
              className="px-6 py-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition shadow-lg"
            >
              Voltar ao início
            </a>
          </div>
        </div>
      </div>
    );
  }