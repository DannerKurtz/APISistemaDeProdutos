import { RawMaterials } from '@prisma/client';
import { crudService } from '../../../shared/services/CRUD';
import { errorsCrudService } from '../../../shared/services/messageErrors';
import { IProducts } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';
import { IRawMaterials } from '../../models/RawMaterialsInterface';
import { prisma } from '../../prisma';

type IQuery = {
  id?: string;
  nome?: string | object;
};

interface IRawMaterialProductRelationsIncludeRawMaterial
  extends IRawMaterialProductRelations {
  rawMaterial: IRawMaterials;
}

export const get = async (query: IQuery): Promise<IProducts[] | Error> => {
  try {
    const getRawMaterialProductRelations = [];
    const getProduct: IProducts[] | Error = await crudService.getInDatabase(
      query,
      'Products',
      errorsCrudService.getMessage('Products')
    );

    if (getProduct instanceof Error) {
      return new Error(getProduct.message);
    }

    for (let i = 0; i < getProduct.length; i++) {
      const rawMaterialProductRelationsIncludeRawMaterial: IRawMaterialProductRelationsIncludeRawMaterial[] =
        await prisma.rawMaterialProductRelations.findMany({
          where: { productId: getProduct[i].id },
          include: { rawMaterial: true },
        });
      const arrayRawMaterials: IRawMaterials[] = [];

      for (
        let i = 0;
        i < rawMaterialProductRelationsIncludeRawMaterial.length;
        i++
      ) {
        arrayRawMaterials.push(
          rawMaterialProductRelationsIncludeRawMaterial[i].rawMaterial
        );
      }

      getProduct[i].rawMaterials = arrayRawMaterials;
    }

    return getProduct;
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar a base de dados de produtos');
  }
};
