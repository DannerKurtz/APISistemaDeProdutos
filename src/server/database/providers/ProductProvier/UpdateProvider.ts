import { FinalProductPriceCalculator } from '../../../shared/services/Calculations/FinalProductPriceCalculator';
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { updateRelations } from '../../../shared/services/relationsManager/RelationUpdate';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';

export const update = async (
  id: string,
  body: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const { rawMaterialProductRelation, ...data } = body;

    const productUpdated: IProducts | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'Products',
        errorsCrudService.updateMessage('Products')
      );

    if (productUpdated instanceof Error)
      return new Error(productUpdated.message);

    const listRelationsWithProductId = (
      rawMaterialProductRelation as IRawMaterialProductRelations[]
    ).map((relations) => ({
      ...relations,
      productId: id,
    }));

    console.log(listRelationsWithProductId);

    const rawMaterialProductRelationUpdate: IRawMaterialProductRelations[] =
      await updateRelations(
        'RawMaterialProductRelations',
        { productId: id },
        listRelationsWithProductId
      );

    if (rawMaterialProductRelationUpdate) {
      const calculateRawMaterialTotals = await FinalProductPriceCalculator(
        rawMaterialProductRelationUpdate,
        productUpdated.percentage
      );

      if (calculateRawMaterialTotals instanceof Error)
        return new Error(calculateRawMaterialTotals.message);

      productUpdated.price = calculateRawMaterialTotals.finalPrice;
      productUpdated.weight = calculateRawMaterialTotals.finalWeight;
    }

    productUpdated.rawMaterialProductRelation =
      rawMaterialProductRelationUpdate;

    return productUpdated;
  } catch (error) {
    console.error('Erro desconhecido no update:', error);
    return new Error(errorsProvider.updateMessage('Products'));
  }
};
