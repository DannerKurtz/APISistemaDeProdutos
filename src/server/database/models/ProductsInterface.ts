import { IProductSaleRelations } from './ProductSaleRelationsInterface';
import { IRawMaterialProductRelations } from './RawMaterialProductRelationsInterface';

export interface IProducts {
  id: string;
  name: string;
  percentage: number;
  price: number;
  quantity: number;
  RawMaterialProductRelations?: IRawMaterialProductRelations[];
  ProductSaleRelations?: IProductSaleRelations[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductsWithoutId extends Omit<IProducts, 'id'> {}
