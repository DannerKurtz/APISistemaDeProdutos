// necessary imports
import { FinalProductPriceCalculator } from '../../../shared/services/Calculations/FinalProductPriceCalculator';
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { updateRelations } from '../../../shared/services/prismaHelpers/relationsManager/RelationUpdate'; 
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';

// export of the function responsible for updating the product
export const update = async (
  id: string,
  body: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    // destructuring the body
    const { rawMaterialProductRelation, ...data } = body;

    // validation if there is rawMaterialProductRelation to calculate the product's price
    if (rawMaterialProductRelation) {
      const calculateRawMaterialTotals = await FinalProductPriceCalculator(
        rawMaterialProductRelation,
        data.percentage
      );

      if (calculateRawMaterialTotals instanceof Error)
        return new Error(calculateRawMaterialTotals.message);

      data.price = calculateRawMaterialTotals.finalPrice;
      data.weight = calculateRawMaterialTotals.finalWeight;
    }

    // call to the crudService to update in the database
    const productUpdated: IProducts | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'Products',
        errorsCrudService.updateMessage('Products')
      );

    // validates if it's an error and returns the message
    if (productUpdated instanceof Error)
      return new Error(productUpdated.message);

    // lists all raw materials and adds the productId
    const listRelationsWithProductId = (
      rawMaterialProductRelation as IRawMaterialProductRelations[]
    ).map((relations) => ({
      ...relations,
      productId: id,
    }));

    // call to the updateRelations function to update the relationships
    const rawMaterialProductRelationUpdate: IRawMaterialProductRelations[] =
      await updateRelations(
        'RawMaterialProductRelations',
        { productId: id },
        listRelationsWithProductId
      );

    // adds the updated raw materials to the product
    productUpdated.rawMaterialProductRelation =
      rawMaterialProductRelationUpdate;

    // returns the updated product
    return productUpdated;
  } catch (error) {
    console.error('Erro desconhecido no update:', error);
    // returns the error if there's an exception
    return new Error(errorsProvider.updateMessage('Products'));
  }
};
