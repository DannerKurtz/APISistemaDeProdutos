import { IRawMaterialProductRelations } from '../../../database/models/RawMaterialProductRelationsInterface';
import { IRawMaterials } from '../../../database/models/RawMaterialsInterface';
import { crudService } from '../CRUD';
import { errorsCrudService } from '../messageErrors';

export const calculateProductPrice = async (
  rawMaterialProductRelation: IRawMaterialProductRelations[]
): Promise<number | Error> => {
  let sumRawMaterialsValue: number = 0;

  for (let i = 0; i < rawMaterialProductRelation.length; i++) {
    const rawMaterial: IRawMaterials | Error = await crudService.getInDatabase(
      { id: rawMaterialProductRelation[i].rawMaterialId },
      'RawMaterials',
      errorsCrudService.getMessage('RawMaterials')
    );

    if (rawMaterial instanceof Error) return new Error(rawMaterial.message);

    sumRawMaterialsValue +=
      rawMaterial.price * rawMaterialProductRelation[i].rawMaterialQuantity;

    console.log(sumRawMaterialsValue);
  }

  return sumRawMaterialsValue;
};
