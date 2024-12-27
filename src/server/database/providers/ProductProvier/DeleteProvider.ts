import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationDelete } from '../../../shared/services/relationsManager/RelationDelete';
import { prisma } from '../../prisma';

export const deleteProduct = async (id: string): Promise<Boolean | Error> => {
  try {
    const getRawMaterialProductRelations =
      await prisma.rawMaterialProductRelations.findMany({
        where: { productId: id },
      });

    for (let i = 0; i < getRawMaterialProductRelations.length; i++) {
      const deletedRawMaterialRelations = await relationDelete(
        getRawMaterialProductRelations[i].id,
        'rawMaterialProductRelations'
      );
      if (deletedRawMaterialRelations instanceof Error) {
        return new Error(deletedRawMaterialRelations.message);
      }
    }

    const deleteProduct: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Products',
      errorsCrudService.deleteMessage('Products')
    );

    return deleteProduct;
  } catch (error) {
    return new Error(errorsProvider.deleteMessage('Products'));
  }
};
