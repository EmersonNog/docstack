import mascot from "../assets/mascot.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f2ff] via-[#e9faff] to-[#edf6ff] flex flex-col items-center justify-center px-6 py-12">
      <img src={mascot} alt="Mascote DocStack" className="h-80 w-auto mb-8" />

      {/* Título e descrição */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-4">
        Bem-vindo ao <span className="text-blue-600">DocStack</span>
      </h1>

      <p className="text-gray-600 text-lg text-center max-w-2xl mb-8">
        Uma plataforma inteligente e moderna para organizar conteúdos visuais e
        gerar documentos com qualidade e agilidade.
      </p>
    </div>
  );
};

export default Home;
