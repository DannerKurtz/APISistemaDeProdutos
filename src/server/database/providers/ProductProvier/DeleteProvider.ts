// Necessary import
import { prisma } from '../../prisma';
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationDelete } from '../../../shared/services/prismaHelpers/relationsManager/RelationDelete';

// Exporting the function that deletes the product
export const deleteProduct = async (id: string): Promise<Boolean | Error> => {
  try {
    // Calling Prisma to fetch the relations that have the product ID
    const getRawMaterialProductRelations =
      await prisma.rawMaterialProductRelations.findMany({
        where: { productId: id },
      });

    // Iterating through the rawMaterialProductRelations array and calling
    // the relationDelete function to delete the product and raw material relations.
    // If an error occurs, return immediately.
    for (let i = 0; i < getRawMaterialProductRelations.length; i++) {
      const deletedRawMaterialRelations = await relationDelete(
        getRawMaterialProductRelations[i].id,
        'rawMaterialProductRelations'
      );
      if (deletedRawMaterialRelations instanceof Error) {
        return new Error(deletedRawMaterialRelations.message);
      }
    }

    // Calling the crudService to delete the product from the database
    const deleteProduct: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Products',
      errorsCrudService.deleteMessage('Products')
    );

    // Returning if the product was successfully deleted
    return deleteProduct;
  } catch (error) {
    // Returning if an exception occurs
    return new Error(errorsProvider.deleteMessage('Products'));
  }
};
