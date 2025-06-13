const About = () => {
  return (
    <div className="min-h-screen px-6 py-12 lg:pl-64 bg-gradient-to-br from-[#e8f2ff] via-[#e9faff] to-[#edf6ff] text-gray-800 transition-all duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <div className="text-center lg:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Sobre o <span className="text-blue-600">DocStack</span>
          </h1>
          <p className="text-lg text-gray-700">
            Uma plataforma criada para transformar a forma como você gera
            relatórios fotográficos.
          </p>
        </div>

        {/* Bloco de introdução */}
        <div className="mb-16 space-y-5 text-lg leading-relaxed">
          <p>
            <strong>DocStack</strong> é uma solução moderna e intuitiva
            desenvolvida para facilitar a criação e o gerenciamento de
            documentos profissionais com agilidade e eficiência.
          </p>
          <p>
            Voltado a usuários que lidam com registros visuais, o sistema
            permite compilar conteúdos de forma organizada e personalizada,
            garantindo qualidade e padronização nos relatórios gerados.
          </p>
          <p>
            Sua interface simples e funcional contribui para a produtividade de
            profissionais de diversas áreas, promovendo praticidade na geração e
            adaptação de arquivos em diferentes formatos.
          </p>
        </div>

        {/* Funcionalidades */}
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          Funcionalidades principais
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Upload rápido",
              desc: "Carregue imagens com facilidade e em lote com suporte a múltiplos formatos.",
            },
            {
              title: "Customização de layout",
              desc: "Adicione logomarcas no cabeçalho e rodapé do relatório.",
            },
            {
              title: "Relatório em DOCX",
              desc: "Gere relatórios em formato profissional, prontos para envio ou impressão.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Valores da plataforma */}
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          Nossos valores
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold mb-2">Praticidade</h3>
            <p className="text-gray-700">
              Foco na usabilidade para garantir uma experiência eficiente.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold mb-2">Padronização</h3>
            <p className="text-gray-700">
              Relatórios consistentes e com identidade visual clara.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold mb-2">Agilidade</h3>
            <p className="text-gray-700">
              Geração automática de documentos com poucos cliques.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold mb-2">Profissionalismo</h3>
            <p className="text-gray-700">
              Resultados com aparência profissional e confiável.
            </p>
          </div>
        </div>

        {/* Seção opcional: equipe ou missão */}
        <div className="text-center text-gray-500 text-sm">
          Desenvolvido com ❤️ por Nogueira.
        </div>
      </div>
    </div>
  );
};

export default About;
