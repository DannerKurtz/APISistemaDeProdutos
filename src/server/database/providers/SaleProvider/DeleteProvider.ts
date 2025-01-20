// Necessary imports
import { prisma } from '../../prisma';
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationDelete } from '../../../shared/services/prismaHelpers/relationsManager/RelationDelete';
import { IProductSaleRelations } from '../../models/ProductSaleRelationsInterface';

// Export of the function responsible for deleting the sale
export const deleteSale = async (id: string): Promise<Boolean | Error> => {
  try {
    // Calls prisma to find all relations that have the saleId
    const getSaleProductRelations: IProductSaleRelations[] =
      await prisma.productSaleRelations.findMany({
        where: { saleId: id },
      });

    // Loops through the relations array and deletes each relation linked to the sale
    for (let i = 0; i < getSaleProductRelations.length; i++) {
      const deletedProductSaleRelations = await relationDelete(
        getSaleProductRelations[i].id,
        'ProductSaleRelations'
      );
      if (deletedProductSaleRelations instanceof Error) {
        return new Error(deletedProductSaleRelations.message);
      }
    }

    // Calls the crudService function responsible for deleting the sale
    const saleDeleted: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Sales',
      errorsCrudService.deleteMessage('Sales')
    );

    // Returns whether the sale was deleted or if there was an error
    return saleDeleted;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(errorsProvider.deleteMessage('Sales'));
  }
};
