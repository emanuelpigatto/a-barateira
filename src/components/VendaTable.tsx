
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Venda } from '@/types/Product';

interface VendaTableProps {
  vendas: Venda[];
  isLoading: boolean;
}

const VendaTable: React.FC<VendaTableProps> = ({ vendas, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-4">Carregando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Nota Fiscal</TableHead>
          <TableHead>Valor Total</TableHead>
          <TableHead>Comissão</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendas.map((venda) => (
          <TableRow key={venda.id}>
            <TableCell>{venda.nome_cliente}</TableCell>
            <TableCell>{venda.produto_nome}</TableCell>
            <TableCell>{venda.quantidade}</TableCell>
            <TableCell>{venda.nota_fiscal}</TableCell>
            <TableCell className="font-semibold text-green-600">
              R$ {venda.valor_total.toFixed(2)}
            </TableCell>
            <TableCell>R$ {venda.comissao_balconista.toFixed(2)}</TableCell>
            <TableCell>{new Date(venda.data_venda).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VendaTable;
