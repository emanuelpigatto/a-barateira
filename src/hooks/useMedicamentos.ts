import { useState, useEffect } from 'react';
// Importa Medicamento, NewMedicamento e UpdateMedicamento do Product.ts
import { Medicamento, NewMedicamento, UpdateMedicamento } from '@/types/Product';
// Importa o cliente Supabase. Ajuste o caminho se necessário.
import { supabase } from '../integrations/supabase/client'; 

export const useMedicamentos = () => {
  // Estado para armazenar a lista de medicamentos
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  
  // Estado para controlar o carregamento dos dados
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar todos os medicamentos do Supabase
  const fetchMedicamentos = async () => {
    setIsLoading(true);
    try {
      // Faz a requisição SELECT na tabela 'medicamentos'
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*'); // Seleciona todas as colunas para garantir que o objeto retornado seja completo

      if (error) {
        console.error('Erro ao buscar medicamentos:', error.message);
      } else {
        // Converte os dados para o tipo Medicamento[] e atualiza o estado
        setMedicamentos(data as Medicamento[] || []); 
      }
    } catch (e) {
      console.error('Erro inesperado ao buscar medicamentos:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect para carregar os medicamentos quando o componente que usa este hook for montado
  useEffect(() => {
    fetchMedicamentos();
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

  // Função para criar (inserir) um novo medicamento no Supabase
  const createMedicamento = async (medicamentoData: NewMedicamento) => { 
    setIsLoading(true);
    try {
      // Faz a requisição INSERT na tabela 'medicamentos'
      const { data, error } = await supabase
        .from('medicamentos')
        .insert([medicamentoData]) // Insere apenas os dados fornecidos
        .select('*'); // Retorna o item inserido com o ID real do DB

      if (error) {
        console.error('Erro ao criar medicamento:', error.message, error.details, error.hint);
        throw error; 
      } else {
        if (data && data.length > 0) {
          setMedicamentos(prev => [...prev, data[0] as Medicamento]);
          return data[0] as Medicamento;
        } else {
          console.warn('createMedicamento: Inserção bem-sucedida, mas nenhum dado retornado. Re-buscando...');
          await fetchMedicamentos(); 
          return null; 
        }
      }
    } catch (e) {
      console.error('createMedicamento: Erro inesperado no try-catch:', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para atualizar um medicamento existente no Supabase
  const updateMedicamento = async (id: string, updates: UpdateMedicamento) => {
    setIsLoading(true);
    try {
      // Faz a requisição UPDATE na tabela 'medicamentos'
      const { data, error } = await supabase
        .from('medicamentos')
        .update(updates) // As atualizações a serem aplicadas
        .eq('id', id) // Condição: onde o 'id' da coluna é igual ao 'id' do medicamento
        .select('*'); // Retorna o item atualizado com todos os campos

      if (error) {
        console.error('Erro ao atualizar medicamento:', error.message);
        throw error;
      } else {
        if (data && data.length > 0) {
            setMedicamentos(prev => 
                prev.map(med => (med.id === id ? { ...med, ...data[0]} : med))
            );
            return data[0] as Medicamento;
        } else {
            console.warn('updateMedicamento: Atualização bem-sucedida, mas nenhum dado retornado. Re-buscando...');
            await fetchMedicamentos();
            return null;
        }
      }
    } catch (e) {
      console.error('Erro inesperado ao atualizar medicamento:', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMedicamento = async (id: string) => {
    setIsLoading(true);
    try {
      // Faz a requisição DELETE na tabela 'medicamentos'
      const { error } = await supabase
        .from('medicamentos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar medicamento:', error.message);
        throw error;
      } else {
        setMedicamentos(prev => prev.filter(med => med.id !== id));
      }
    } catch (e) {
      console.error('Erro inesperado ao deletar medicamento:', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // Retorna os dados e funções para serem usados pelos componentes
  return {
    medicamentos,
    isLoading,
    createMedicamento,
    updateMedicamento,
    deleteMedicamento,
  };
};