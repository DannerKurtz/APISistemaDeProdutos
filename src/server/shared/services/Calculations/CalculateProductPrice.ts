// Necessary imports
import { IRawMaterialProductRelations } from '../../../database/models/RawMaterialProductRelationsInterface';
import { IRawMaterials } from '../../../database/models/RawMaterialsInterface';
import { crudService } from '../prismaHelpers/CRUD';
import { errorsCrudService } from '../messageErrors';

// Exporting the function that calculates the product's price and weight
export const calculateProductPrice = async (
  rawMaterialProductRelation: IRawMaterialProductRelations[]
): Promise<{ sumRawMaterialsValue: number; finalWeight: number } | Error> => {
  // Definitions of variables for the sum of raw material values and final weight
  let sumRawMaterialsValue: number = 0;
  let finalWeight: number = 0;

  try {
    // Loops through the relations array
    for (let i = 0; i < rawMaterialProductRelation.length; i++) {
      // Fetches the raw materials
      const rawMaterial: IRawMaterials | Error =
        await crudService.getInDatabase(
          { id: rawMaterialProductRelation[i].rawMaterialId },
          'RawMaterials',
          errorsCrudService.getMessage('RawMaterials')
        );

      // Validates if there was an error and returns the message immediately
      if (rawMaterial instanceof Error) return new Error(rawMaterial.message);

      // Calculates the total weight based on the quantity of raw material * the unit weight of that raw material
      const totalWeight: number =
        rawMaterialProductRelation[i].rawMaterialQuantity *
        rawMaterial.unitWeight;

      // Calculates the unit price based on the total weight * the price of the raw material
      const unitPrice: number = totalWeight * rawMaterial.price;

      // Adds and assigns each total weight and unit price
      finalWeight += totalWeight;
      sumRawMaterialsValue += unitPrice;
    }

    // Defines a result, returning an object with the sum of raw materials and the final weight
    const result = { sumRawMaterialsValue, finalWeight };
    return result;
  } catch (e) {
    // In case of an exception, returns the error immediately
    return new Error('Error calculating product price or weight.');
  }
};
