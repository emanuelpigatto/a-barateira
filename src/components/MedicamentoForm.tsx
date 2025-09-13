import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Medicamento, NewMedicamento } from '@/types/Product'; // Importa os tipos Medicamento e NewMedicamento

// Interfaces auxiliares para o estado do formulário
interface FormDataMedicamento {
  principio_ativo: string;
  nome: string; 
  quantidade: number | ''; 
  estoque_minimo: number | '';     
  preco_compra: number | '';       
  preco_venda: number | '';        
  descricao: string;
  codigo_barras: string;
  validade: string;
  lote: string;
  fabricante: string;
  categoria: string;
  fornecedor_id: string; 
  ativo: boolean;
}

// Props para o componente MedicamentoForm
interface MedicamentoFormProps {
  medicamento?: Medicamento | null;
  // onSave agora aceita o tipo NewMedicamento diretamente,
  // pois o formulário já filtra o ID para novas criações
  onSave: (data: NewMedicamento | Medicamento) => void; 
  onCancel: () => void;
  isLoading: boolean;
}

// Definição do componente funcional MedicamentoForm
const MedicamentoForm: React.FC<MedicamentoFormProps> = ({
  medicamento,
  onSave,
  onCancel,
  isLoading
}) => {
  // Estado do formulário
  const [formData, setFormData] = useState<FormDataMedicamento>({
    principio_ativo: '',
    nome: '',
    quantidade: '', 
    estoque_minimo: '',     
    preco_compra: '',       
    preco_venda: '',        
    descricao: '', 
    codigo_barras: '', 
    validade: '', 
    lote: '', 
    fabricante: '', 
    categoria: '', 
    fornecedor_id: '', 
    ativo: false, 
  });

  // Efeito para preencher o formulário quando um medicamento é passado (edição)
  useEffect(() => {
    if (medicamento) {
      setFormData({
        principio_ativo: medicamento.principio_ativo || '',
        nome: medicamento.nome || '',
        quantidade: medicamento.quantidade ?? '', 
        estoque_minimo: medicamento.estoque_minimo ?? '',
        preco_compra: medicamento.preco_compra ?? '',
        preco_venda: medicamento.preco_venda ?? '',
        descricao: medicamento.descricao || '',
        codigo_barras: medicamento.codigo_barras || '',
        validade: medicamento.validade || '',
        lote: medicamento.lote || '',
        fabricante: medicamento.fabricante || '',
        categoria: medicamento.categoria || '',
        fornecedor_id: medicamento.fornecedor_id || '',
        ativo: medicamento.ativo ?? false,
      });
    } else {
      // Limpa o formulário para um novo cadastro
      setFormData({
        principio_ativo: '',
        nome: '',
        quantidade: '', 
        estoque_minimo: '',
        preco_compra: '',
        preco_venda: '',
        descricao: '',
        codigo_barras: '',
        validade: '',
        lote: '',
        fabricante: '',
        categoria: '',
        fornecedor_id: '',
        ativo: false,
      });
    }
  }, [medicamento]);

  // Lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preparação dos dados base, convertendo tipos conforme necessário
    const baseData = { 
        principio_ativo: formData.principio_ativo,
        nome: formData.nome,
        quantidade: Number(formData.quantidade), 
        estoque_minimo: Number(formData.estoque_minimo),
        preco_compra: Number(formData.preco_compra),
        preco_venda: Number(formData.preco_venda),
        descricao: formData.descricao,
        codigo_barras: formData.codigo_barras,
        validade: formData.validade,
        lote: formData.lote,
        fabricante: formData.fabricante,
        categoria: formData.categoria,
        fornecedor_id: formData.fornecedor_id,
        ativo: Boolean(formData.ativo), 
    };

    let dataToSend: NewMedicamento | Medicamento;

    if (medicamento) {
      // Se estiver editando, inclua o ID existente e use o tipo Medicamento
      dataToSend = {
        ...baseData,
        id: medicamento.id, // ID do medicamento existente
        created_at: medicamento.created_at, // Manter o created_at original
        updated_at: new Date().toISOString(), // Atualizar updated_at
      } as Medicamento;
    } else {
      // Se for um novo medicamento, NÃO inclua 'id', 'created_at', 'updated_at'
      // O Supabase irá gerar esses campos automaticamente.
      dataToSend = baseData as NewMedicamento;
    }

    onSave(dataToSend);
  };

  // Lidar com a mudança nos campos do formulário
  const handleChange = (field: keyof FormDataMedicamento, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          {medicamento ? 'Editar Medicamento' : 'Novo Medicamento'}
        </h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados do Medicamento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="principio_ativo">Princípio Ativo</Label>
                <Input
                  id="principio_ativo"
                  value={formData.principio_ativo}
                  onChange={(e) => handleChange('principio_ativo', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Marca</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                />
              </div>

              {/* Adicionar campos para as outras colunas */}
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo_barras">Código de Barras</Label>
                <Input
                  id="codigo_barras"
                  value={formData.codigo_barras}
                  onChange={(e) => handleChange('codigo_barras', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="validade">Validade</Label>
                <Input
                  id="validade"
                  type="date"
                  value={formData.validade}
                  onChange={(e) => handleChange('validade', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lote">Lote</Label>
                <Input
                  id="lote"
                  value={formData.lote}
                  onChange={(e) => handleChange('lote', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fabricante">Fabricante</Label>
                <Input
                  id="fabricante"
                  value={formData.fabricante}
                  onChange={(e) => handleChange('fabricante', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => handleChange('categoria', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fornecedor_id">ID Fornecedor</Label>
                <Input
                  id="fornecedor_id"
                  value={formData.fornecedor_id}
                  onChange={(e) => handleChange('fornecedor_id', e.target.value)}
                />
              </div>

              {/* Campos de quantidade e estoque mínimo */}
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade em Estoque</Label>
                <Input
                  id="quantidade" 
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', e.target.value)} 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estoque_minimo">Estoque Mínimo</Label>
                <Input
                  id="estoque_minimo"
                  type="number"
                  value={formData.estoque_minimo}
                  onChange={(e) => handleChange('estoque_minimo', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preco_compra">Preço de Compra (R$)</Label>
                <Input
                  id="preco_compra"
                  type="number"
                  step="0.01"
                  value={formData.preco_compra}
                  onChange={(e) => handleChange('preco_compra', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preco_venda">Preço de Venda (R$)</Label>
                <Input
                  id="preco_venda"
                  type="number"
                  step="0.01"
                  value={formData.preco_venda}
                  onChange={(e) => handleChange('preco_venda', e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ativo"
                  checked={formData.ativo}
                  onChange={(e) => handleChange('ativo', e.target.checked)}
                />
                <Label htmlFor="ativo">Ativo</Label>
              </div>

            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicamentoForm;