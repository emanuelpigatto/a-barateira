
import { useState } from 'react';
import { Fornecedor } from '@/types/Product';

const mockFornecedores: Fornecedor[] = [
  {
    id: 1,
    nome: 'Distribuidora Pharma Ltda',
    cnpj: '12.345.678/0001-90',
    telefone: '(11) 3456-7890',
    email: 'contato@pharmaltda.com.br',
    created_at: '2024-01-10'
  }
];

export const useFornecedores = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(mockFornecedores);
  const [isLoading, setIsLoading] = useState(false);

  const createFornecedor = async (fornecedor: Omit<Fornecedor, 'id' | 'created_at'>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newFornecedor: Fornecedor = {
      ...fornecedor,
      id: Date.now(),
      created_at: new Date().toISOString()
    };
    
    setFornecedores(prev => [...prev, newFornecedor]);
    setIsLoading(false);
    return newFornecedor;
  };

  const updateFornecedor = async (id: number, updates: Partial<Fornecedor>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFornecedores(prev => 
      prev.map(forn => forn.id === id ? { ...forn, ...updates } : forn)
    );
    setIsLoading(false);
  };

  const deleteFornecedor = async (id: number) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFornecedores(prev => prev.filter(forn => forn.id !== id));
    setIsLoading(false);
  };

  return {
    fornecedores,
    isLoading,
    createFornecedor,
    updateFornecedor,
    deleteFornecedor,
  };
};
