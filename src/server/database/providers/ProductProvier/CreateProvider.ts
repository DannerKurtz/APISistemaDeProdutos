// Necessary imports
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';
import { crudService } from '../../../shared/services/CRUD';
import { FinalProductPriceCalculator } from '../../../shared/services/Calculations/FinalProductPriceCalculator';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { processProductMaterialRelations } from '../../../shared/services/ProcessProductMaterialRelations';

// Exporting the function responsible for creating the product
export const create = async (
  body: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    // Destructuring the body to separate rawMaterialProductRelation from product
    const { rawMaterialProductRelation, ...productWithoutRawMaterial } = body;

    // Calling the crudService.createInDatabase function to create the new product
    const newProduct: IProducts | Error = await crudService.createInDatabase(
      productWithoutRawMaterial,
      'Products',
      errorsCrudService.createMessage('Products')
    );

    // Checking if newProduct is an instance of Error; if so, return the error
    if (newProduct instanceof Error) return new Error(newProduct.message);

    // Calling the function that processes the creation of relationships between the product and raw materials
    const createProductRawMateriaRelations =
      await processProductMaterialRelations(
        rawMaterialProductRelation as IRawMaterialProductRelations[],
        newProduct.id
      );

    // Checking if createProductRawMaterialRelations is an instance of Error; if so, return the error message
    if (createProductRawMateriaRelations instanceof Error) {
      return new Error(createProductRawMateriaRelations.message);
    }

    // Creating a variable to combine the product and the raw materials that compose it
    const createdNewProduct: IProducts = {
      ...newProduct,
      rawMaterialProductRelation: createProductRawMateriaRelations,
    };

    /**
     * Checking if createdNewProduct has rawMaterialProductRelation; if so,
     * calling FinalProductPriceCalculator to calculate the product's cost and weight.
     * Verifying if there's no error; if an error exists, return the message. If everything is correct,
     * add the price and weight to createdNewProduct.
     */
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

    // Returning the newly created product
    return createdNewProduct;
  } catch (error) {
    // Returning the error if an exception occurs
    return new Error(errorsProvider.createMessage('Products'));
  }
};
