import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationDelete } from '../../../shared/services/relationsManager/RelationDelete';
import { prisma } from '../../prisma';

export const deleteSale = async (id: string): Promise<Boolean | Error> => {
  try {
    const getSaleProductRelations = await prisma.productSaleRelations.findMany({
      where: { saleId: id },
    });

    for (let i = 0; i < getSaleProductRelations.length; i++) {
      const deletedProductSaleRelations = await relationDelete(
        getSaleProductRelations[i].id,
        'ProductSaleRelations'
      );
      if (deletedProductSaleRelations instanceof Error) {
        return new Error(deletedProductSaleRelations.message);
      }
    }

    const saleDeleted: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Sales',
      errorsCrudService.deleteMessage('Sales')
    );

    return saleDeleted;
  } catch (error) {
    return new Error(errorsProvider.deleteMessage('Sales'));
  }
};
