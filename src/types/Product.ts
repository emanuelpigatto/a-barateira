// Define as interfaces para os diferentes modelos de dados do seu sistema.
// Estes tipos refletem a estrutura das suas tabelas no banco de dados Supabase.

// Interface Product (exemplo, talvez não esteja em uso ativo no momento)
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

// Interface Medicamento: Mapeia a tabela 'medicamentos' do Supabase
// Ajustes:
// - id: string (para UUIDs do Supabase)
// - nome: string (corrigido para coincidir com a coluna 'nome' no DB)
// - quantidade: number | null (CORRIGIDO para coincidir com a coluna 'quantidade' no DB)
// - estoque_minimo: number | null (corrigido para coincidir com a coluna 'estoque_minimo' no DB)
// - Campos que podem ser NULL no DB agora são 'Tipo | null'
// - Campos 'created_at' e 'updated_at' podem ser opcionais ou null
export interface Medicamento {
  id: string; // O ID gerado pelo Supabase é um UUID (string)
  nome: string; // Nome da marca (coluna 'nome' no DB)
  principio_ativo: string | null; // Pode ser null no DB
  descricao: string | null; // Pode ser null no DB
  preco_compra: number | null; // Permitir null se o campo não é obrigatório no DB
  preco_venda: number | null;   // Permitir null se o campo não é obrigatório no DB
  codigo_barras: string | null; // Pode ser null no DB
  validade: string | null; // Pode ser null no DB (ou talvez um Date)
  lote: string | null; // Pode ser null no DB
  fabricante: string | null; // Pode ser null no DB
  categoria: string | null; // Pode ser null no DB
  fornecedor_id: string | null; // ID de outra tabela (UUID), pode ser null no DB
  
  quantidade: number | null; // <-- CORRIGIDO AQUI! DEVE SER 'quantidade', NÃO 'quantidade_estoque'
  estoque_minimo: number | null; // Nome da coluna no DB é 'estoque_minimo'
  
  ativo: boolean | null; // Pode ser null no DB
  created_at?: string; // Gerado automaticamente, pode ser opcional ao criar
  updated_at?: string | null; // Pode ser nulo no DB ou opcional
}

// NOVAS INTERFACES EXPORTADAS PARA USO NOS HOOKS E FORMULÁRIOS
// Representa um Medicamento antes de ter ID e created_at/updated_at (que são gerados pelo DB)
export type NewMedicamento = Omit<Medicamento, 'id' | 'created_at' | 'updated_at'>;
// Representa as propriedades que podem ser atualizadas em um Medicamento existente
export type UpdateMedicamento = Partial<Omit<Medicamento, 'id' | 'created_at' | 'updated_at'>>;


// Interface Venda: Mapeia a tabela 'vendas'
export interface Venda {
  id: string;
  numero_venda: string;
  cliente_nome: string;
  cliente_cpf: string | null;
  cliente_telefone: string | null;
  medicamento_id: string | null;
  medicamento_nome: string;
  quantidade: number;
  preco_unitario: number;
  preco_total: number;
  desconto: number;
  filial_id: string | null;
  vendedor_nome: string | null;
  forma_pagamento: string | null;
  data_venda: string; // Assumindo formato string como 'YYYY-MM-DD'
  created_at?: string;
}

// Interface EstoqueFilial: Mapeia a tabela 'estoque_filiais'
export interface EstoqueFilial {
  id: string;
  medicamento_id: string; // ID de medicamento (UUID)
  filial_id: string; // ID de filial (UUID)
  quantidade: number;
  estoque_minimo: number;
  ultima_atualizacao: string; // Assumindo formato string
}

// Interface Fornecedor: Mapeia a tabela 'fornecedores'
export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  contato_responsavel: string | null;
  created_at?: string;
  updated_at?: string;
}

// Interface Promocao: Mapeia a tabela 'promocoes'
export interface Promocao {
  id: string;
  medicamento_id: string | null;
  titulo: string;
  descricao: string | null;
  tipo_desconto: 'percentual' | 'valor_fixo'; // Tipos literais para opções
  valor_desconto: number;
  preco_promocional: number | null;
  data_inicio: string;
  data_fim: string;
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
}

// Interface Filial: Mapeia a tabela 'filiais'
export interface Filial {
  id: string;
  nome: string;
  endereco: string;
  telefone: string | null;
  created_at?: string;
  updated_at?: string;
}

// Interface Profile: Mapeia a tabela 'profiles' (geralmente usada para usuários)
export interface Profile {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'gerente' | 'vendedor'; // Tipos literais para papéis
  filial_id: string | null;
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
}

// Interfaces básicas para autenticação (se o seu sistema usar)
export interface User {
  id: string; // ID de usuário do Supabase é string (UUID)
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}