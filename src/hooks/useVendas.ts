
import { useState } from 'react';
import { Venda } from '@/types/Product';

const mockVendas: Venda[] = [
  {
    id: 1,
    nome_cliente: 'João Silva',
    produto_id: 1,
    produto_nome: 'Tylenol 500mg',
    quantidade: 2,
    nota_fiscal: 'NF001234',
    valor_total: 25.80,
    comissao_balconista: 1.29,
    data_venda: '2024-01-20',
    created_at: '2024-01-20'
  }
];

export const useVendas = () => {
  const [vendas, setVendas] = useState<Venda[]>(mockVendas);
  const [isLoading, setIsLoading] = useState(false);

  const createVenda = async (venda: Omit<Venda, 'id' | 'comissao_balconista' | 'created_at'>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const comissao_balconista = venda.valor_total * 0.05; // 5% de comissão
    
    const newVenda: Venda = {
      ...venda,
      id: Date.now(),
      comissao_balconista,
      created_at: new Date().toISOString()
    };
    
    setVendas(prev => [...prev, newVenda]);
    setIsLoading(false);
    return newVenda;
  };

  const getVendasByFilter = (filter: { cliente?: string; produto?: string; data?: string }) => {
    return vendas.filter(venda => {
      if (filter.cliente && !venda.nome_cliente.toLowerCase().includes(filter.cliente.toLowerCase())) {
        return false;
      }
      if (filter.produto && !venda.produto_nome?.toLowerCase().includes(filter.produto.toLowerCase())) {
        return false;
      }
      if (filter.data && !venda.data_venda.includes(filter.data)) {
        return false;
      }
      return true;
    });
  };

  return {
    vendas,
    isLoading,
    createVenda,
    getVendasByFilter,
  };
};
