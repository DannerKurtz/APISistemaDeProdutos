import { ProductModel } from './ProductModel';
import { SaleModel } from './SaleModel';

export interface ProductSaleRelationModel {
  id: string;
  vendaId: string;
  vendas?: SaleModel;
  produtoId: string;
  produtos?: ProductModel;
  quantidade: number;
}
