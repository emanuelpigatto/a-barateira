Farmácia Barateira
"Farmácia Barateira" é um sistema completo e moderno para a gestão eficiente de farmácias. Desenvolvido como um trabalho da disciplina de Engenharia de Software do 3º ano, este projeto demonstra a aplicação de boas práticas de programação, arquitetura de software e uso de uma stack tecnológica atual e robusta.

Visão Geral do Projeto
O sistema foi projetado para otimizar processos internos de uma farmácia, abrangendo desde o controle de estoque de medicamentos e produtos até a gestão de vendas e relatórios de desempenho. O objetivo é fornecer uma ferramenta intuitiva e performática, que contribua para a redução de erros e o aumento da eficiência operacional.

 Funcionalidades Principais
Gestão de Estoque: Controle de entrada e saída de medicamentos.

Gerenciamento de Vendas: Interface para registro de vendas e visualização de históricos.

Autenticação de Usuários: Sistema de login e controle de acesso para diferentes perfis (administrador, funcionário, etc.).

Relatórios e Dashboards: Visualizações gráficas para análise de dados de vendas e desempenho.

Responsividade: Interface adaptável para diferentes tamanhos de tela (desktop e mobile).

 Tecnologias Utilizadas
Este projeto foi construído utilizando uma stack moderna e otimizada para garantir performance, segurança e escalabilidade.

Frontend
React 18 + TypeScript: Framework e tipagem.

Vite: Build tool e dev server de alta performance.

Tailwind CSS: Framework CSS para estilização rápida e responsiva.

shadcn/ui + Radix UI: Componentes de UI acessíveis e de alta qualidade.

React Query: Gerenciamento de estado e cache de dados do servidor.

React Hook Form + Zod: Gerenciamento e validação de formulários.

Backend & Banco de Dados
Supabase: Backend-as-a-Service (BaaS) que oferece PostgreSQL (banco de dados), autenticação e RLS (Row Level Security) Como Executar o Projeto
Para rodar este projeto em seu ambiente local, siga os passos abaixo:

1. Pré-requisitos
Certifique-se de ter o Node.js e o npm (ou Yarn) instalados em sua máquina.

2. Configuração do Ambiente
Este projeto utiliza o Supabase. Você precisará de uma URL de projeto e uma chave de API para conectar a aplicação ao banco de dados.

Crie uma conta no Supabase e um novo projeto.

No painel do seu projeto, vá em Settings > API para encontrar sua URL e sua chave anon public.

Crie um arquivo .env na raiz do seu projeto com o seguinte conteúdo, substituindo pelos seus dados:

NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_PROJETO
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
3. Instalação e Execução
Na pasta raiz do projeto, execute os seguintes comandos no seu terminal:

Instale as dependências:

Bash

npm install
Inicie o servidor de desenvolvimento:

Bash

npm run dev
A aplicação estará disponível em http://localhost:5173 (ou em outra porta, caso a 5173 já esteja em uso).

👨‍💻 Contribuições
Este projeto foi desenvolvido para fins acadêmicos. Fique à vontade para inspecionar o código, sugerir melhorias ou adaptá-lo para seus próprios projetos.

📄 Licença
Este projeto está licenciado sob a Licença MIT.

🎓 Autores
Emanuel Pigatto Soares - Estudante de Engenharia de Software