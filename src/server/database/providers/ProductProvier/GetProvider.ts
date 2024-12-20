import { RawMaterials } from '@prisma/client';
import { crudService } from '../../../shared/services/CRUD';
import { errorsCrudService } from '../../../shared/services/messageErrors';
import { IProducts } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';
import { IRawMaterials } from '../../models/RawMaterialsInterface';

type IQuery = {
  id?: string;
  nome?: string | object;
};

export const get = async (query: IQuery): Promise<IProducts | Error> => {
  try {
    const rawMaterialList: IRawMaterials[] = [];
    const getProduct: IProducts | Error = await crudService.getInDatabase(
      query,
      'Products',
      errorsCrudService.getMessage('Products')
    );

    if (getProduct instanceof Error) {
      return new Error(getProduct.message);
    }

    const getRawMaterialsRelations: IRawMaterialProductRelations[] | Error =
      await crudService.getInDatabase(
        {
          id: getProduct.id,
        },
        'RawMaterialProductRelations',
        errorsCrudService.getMessage('RawMaterialProductRelations')
      );
    if (getRawMaterialsRelations instanceof Error) {
      return new Error(getRawMaterialsRelations.message);
    }
    for (let i = 0; i < getRawMaterialsRelations.length; i++) {
      const getRawMaterial: RawMaterials | Error =
        await crudService.getInDatabase(
          { id: getRawMaterialsRelations[i].rawMaterialId },
          'RawMaterials',
          errorsCrudService.getMessage('RawMaterials')
        );
      if (getRawMaterial instanceof Error) {
        return new Error(getRawMaterial.message);
      }

      rawMaterialList.push(getRawMaterial);
    }
    console.log(rawMaterialList);
    getProduct.rawMaterials = rawMaterialList;
    return getProduct;
  } catch (error) {
    return new Error('Erro ao consultar a base de dados de produtos');
  }
};
