import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { updateRelations } from '../../../shared/services/relationsManager/RelationUpdate';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';
import { prisma } from '../../prisma';

export const update = async (
  id: string,
  body: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const { rawMaterialProductRelation, ...data }: IProductsWithoutId = body;

    const productUpdate: IProducts | Error = await crudService.updateInDatabase(
      id,
      data,
      'Products',
      errorsCrudService.updateMessage('Products')
    );

    if (productUpdate instanceof Error) return new Error(productUpdate.message);
    if (!rawMaterialProductRelation) return productUpdate;

    // Atualizar relações de materiais brutos
    const rawMaterialProductRelationList: IRawMaterialProductRelations[] =
      await updateRelations<IRawMaterialProductRelations>(
        'rawMaterialProductRelations',
        { productId: productUpdate.id },
        rawMaterialProductRelation
      );

    productUpdate.rawMaterialProductRelation = rawMaterialProductRelationList;
    return productUpdate;
  } catch (error) {
    return new Error(errorsProvider.updateMessage('Products'));
  }
};
