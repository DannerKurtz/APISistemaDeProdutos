import { IRawMaterialProductRelations } from '../../../database/models/RawMaterialProductRelationsInterface';
import { IRawMaterials } from '../../../database/models/RawMaterialsInterface';
import { crudService } from '../prismaHelpers/CRUD';
import { errorsCrudService } from '../messageErrors';

export const calculateProductPrice = async (
  rawMaterialProductRelation: IRawMaterialProductRelations[]
): Promise<{ sumRawMaterialsValue: number; finalWeight: number } | Error> => {
  let sumRawMaterialsValue: number = 0;
  let finalWeight: number = 0;

  try {
    for (let i = 0; i < rawMaterialProductRelation.length; i++) {
      const rawMaterial: IRawMaterials | Error =
        await crudService.getInDatabase(
          { id: rawMaterialProductRelation[i].rawMaterialId },
          'RawMaterials',
          errorsCrudService.getMessage('RawMaterials')
        );

      if (rawMaterial instanceof Error) return new Error(rawMaterial.message);

      const totalWeight: number =
        rawMaterialProductRelation[i].rawMaterialQuantity *
        rawMaterial.unitWeight;

      const unitPrice: number = totalWeight * rawMaterial.price;

      finalWeight += totalWeight;
      sumRawMaterialsValue += unitPrice;
    }

    const result = { sumRawMaterialsValue, finalWeight };

    return result;
  } catch (e) {
    return new Error('Error calculating product price or weight.');
  }
};
