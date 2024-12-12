import { IClient } from './ClientModel';

export interface SaleModel {
  id: string;
  numeroDaVenda: string;
  desconto: number;
  precoTotal: number;
  usuarioId: string;
  clienteId: string;
  clientes?: IClient;
}
