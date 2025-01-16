import { FinalProductPriceCalculator } from '../../../shared/services/Calculations/FinalProductPriceCalculator';
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { processProductMaterialRelations } from '../../../shared/services/ProcessProductMaterialRelations';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';

export const create = async (
  data: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const { rawMaterialProductRelation, ...productWithoutRawMaterial } = data;
    let listProductRawMaterialRelations: IRawMaterialProductRelations[] = [];
    const newProduct: IProducts | Error = await crudService.createInDatabase(
      productWithoutRawMaterial,
      'Products',
      errorsCrudService.createMessage('Products')
    );
    if (newProduct instanceof Error) return new Error(newProduct.message);

    const createProductRawMateriaRelations =
      await processProductMaterialRelations(
        rawMaterialProductRelation as IRawMaterialProductRelations[],
        newProduct.id
      );

    if (createProductRawMateriaRelations instanceof Error) {
      return new Error(createProductRawMateriaRelations.message);
    }

    listProductRawMaterialRelations = createProductRawMateriaRelations;

    const createdNewProduct: IProducts = {
      ...newProduct,
      rawMaterialProductRelation: listProductRawMaterialRelations,
    };

    if (createdNewProduct.rawMaterialProductRelation) {
      const calculateRawMaterialTotals = await FinalProductPriceCalculator(
        createdNewProduct.rawMaterialProductRelation,
        createdNewProduct.percentage
      );

      if (calculateRawMaterialTotals instanceof Error)
        return new Error(calculateRawMaterialTotals.message);

      createdNewProduct.price = calculateRawMaterialTotals.finalPrice;
      createdNewProduct.weight = calculateRawMaterialTotals.finalWeight;
    }

    return createdNewProduct;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Products'));
  }
};

