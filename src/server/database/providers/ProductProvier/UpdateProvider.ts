import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';
import { prisma } from '../../prisma';

export const update = async (
  id: string,
  body: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const { rawMaterialProductRelation, ...data }: IProductsWithoutId = body;
    const rawMaterialProductRelationList = [];
    const productUpdate: IProducts | Error = await crudService.updateInDatabase(
      id,
      data,
      'Products',
      errorsCrudService.updateMessage('Products')
    );

    if (productUpdate instanceof Error) return new Error(productUpdate.message);

    if (!rawMaterialProductRelation) return productUpdate;

    for (let i = 0; i < rawMaterialProductRelation.length; i++) {
      const rawMaterialProductRelationGet =
        await prisma.rawMaterialProductRelations.findMany({
          where: {
            productId: productUpdate.id,
          },
        });

      for (let j = 0; j < rawMaterialProductRelationGet.length; j++) {
        const rawMaterialProductRelationUpdate =
          await prisma.rawMaterialProductRelations.update({
            where: { id: rawMaterialProductRelationGet[j].id },
            data: rawMaterialProductRelation[i],
          });
        rawMaterialProductRelationList.push(rawMaterialProductRelationUpdate);
      }
    }
    productUpdate.rawMaterialProductRelation =
      rawMaterialProductRelationList as IRawMaterialProductRelations[];
    return productUpdate;
  } catch (error) {
    return new Error(errorsProvider.updateMessage('Products'));
  }
};
