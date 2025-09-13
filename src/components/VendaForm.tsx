
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface VendaFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const VendaForm: React.FC<VendaFormProps> = ({ onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    nome_cliente: '',
    produto_id: 1,
    produto_nome: 'Tylenol 500mg',
    quantidade: 1,
    nota_fiscal: '',
    valor_total: 0,
    data_venda: new Date().toISOString().split('T')[0],
  });

  const [precoUnitario, setPrecoUnitario] = useState(12.90);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Recalcular valor total quando quantidade muda
      if (field === 'quantidade') {
        updated.valor_total = Number(value) * precoUnitario;
      }
      
      return updated;
    });
  };

  const comissaoCalculada = formData.valor_total * 0.05;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Nova Venda</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados da Venda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome_cliente">Nome do Cliente</Label>
                <Input
                  id="nome_cliente"
                  value={formData.nome_cliente}
                  onChange={(e) => handleChange('nome_cliente', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="produto_nome">Produto</Label>
                <Input
                  id="produto_nome"
                  value={formData.produto_nome}
                  onChange={(e) => handleChange('produto_nome', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  type="number"
                  min="1"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', Number(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nota_fiscal">Nota Fiscal</Label>
                <Input
                  id="nota_fiscal"
                  value={formData.nota_fiscal}
                  onChange={(e) => handleChange('nota_fiscal', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data_venda">Data da Venda</Label>
                <Input
                  id="data_venda"
                  type="date"
                  value={formData.data_venda}
                  onChange={(e) => handleChange('data_venda', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Preço Unitário</Label>
                <div className="text-lg font-semibold text-green-600">
                  R$ {precoUnitario.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-lg">
                <span>Valor Total:</span>
                <span className="font-bold text-green-600">R$ {formData.valor_total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Comissão do Balconista (5%):</span>
                <span>R$ {comissaoCalculada.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processando...' : 'Finalizar Venda'}
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

export default VendaForm;
