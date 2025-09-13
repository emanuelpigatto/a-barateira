
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Plus } from 'lucide-react';

const Promocoes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    produto: '',
    preco_normal: '',
    preco_promocional: '',
    data_inicio: '',
    data_fim: ''
  });

  const promocoes = [
    {
      id: 1,
      produto: 'Tylenol 500mg',
      preco_normal: 12.90,
      preco_promocional: 9.90,
      data_inicio: '2024-01-15',
      data_fim: '2024-01-31',
      ativo: true
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova promoção:', formData);
    // Aqui você adicionaria a lógica para salvar a promoção
    setIsOpen(false);
    setFormData({
      produto: '',
      preco_normal: '',
      preco_promocional: '',
      data_inicio: '',
      data_fim: ''
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Promoções</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Promoção
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Nova Promoção</SheetTitle>
              <SheetDescription>
                Preencha os dados para criar uma nova promoção.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="produto">Produto</Label>
                <Input
                  id="produto"
                  name="produto"
                  value={formData.produto}
                  onChange={handleInputChange}
                  placeholder="Nome do produto"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco_normal">Preço Normal (R$)</Label>
                <Input
                  id="preco_normal"
                  name="preco_normal"
                  type="number"
                  step="0.01"
                  value={formData.preco_normal}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco_promocional">Preço Promocional (R$)</Label>
                <Input
                  id="preco_promocional"
                  name="preco_promocional"
                  type="number"
                  step="0.01"
                  value={formData.preco_promocional}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_inicio">Data de Início</Label>
                <Input
                  id="data_inicio"
                  name="data_inicio"
                  type="date"
                  value={formData.data_inicio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_fim">Data de Fim</Label>
                <Input
                  id="data_fim"
                  name="data_fim"
                  type="date"
                  value={formData.data_fim}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Criar Promoção
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promoções Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Preço Normal</TableHead>
                <TableHead>Preço Promocional</TableHead>
                <TableHead>Desconto</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promocoes.map((promocao) => {
                const desconto = ((promocao.preco_normal - promocao.preco_promocional) / promocao.preco_normal * 100).toFixed(0);
                return (
                  <TableRow key={promocao.id}>
                    <TableCell className="font-medium">{promocao.produto}</TableCell>
                    <TableCell>R$ {promocao.preco_normal.toFixed(2)}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      R$ {promocao.preco_promocional.toFixed(2)}
                    </TableCell>
                    <TableCell className="font-semibold text-red-600">
                      -{desconto}%
                    </TableCell>
                    <TableCell>{new Date(promocao.data_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(promocao.data_fim).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        promocao.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {promocao.ativo ? 'Ativa' : 'Inativa'}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Promocoes;
