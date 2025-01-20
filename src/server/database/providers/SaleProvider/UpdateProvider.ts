// Necessary imports
import { calculateTotalSalePrice } from '../../../shared/services/Calculations/CalculateTotalSalePrice';
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { updateRelations } from '../../../shared/services/relationsManager/RelationUpdate';
import { IProductSaleRelations } from '../../models/ProductSaleRelationsInterface';
import { ISales, ISalesWithoutId } from '../../models/SalesInterface';

// Export of the function responsible for updating the sale
export const update = async (id: string, body: ISalesWithoutId) => {
  try {
    // Destructuring the body into productSaleRelations and the remaining as data
    let { productSaleRelations, ...data } = body;

    // Validates if there's a relation and calculates the final price
    if (productSaleRelations)
      data = await calculateTotalSalePrice(data, productSaleRelations);

    // Loops through the relations array and adds the saleId to each
    const listRelationsWithSaleId = (
      productSaleRelations as IProductSaleRelations[]
    ).map((relation) => ({ ...relation, saleId: id }));

    // Calls the function responsible for updating all relations and updating the sale
    const productSaleRelationsUpdated: IProductSaleRelations[] =
      await updateRelations(
        'ProductSaleRelations',
        { saleId: id },
        listRelationsWithSaleId
      );
    const saleUpdated: ISales | Error = await crudService.updateInDatabase(
      id,
      data,
      'Sales',
      errorsCrudService.updateMessage('Sales')
    );

    // Handles any error, returning a message
    if (saleUpdated instanceof Error) {
      return new Error(saleUpdated.message);
    }

    // Adds all the relations to the updated sale
    saleUpdated.productSaleRelations = productSaleRelationsUpdated;

    // Returns the updated sale
    return saleUpdated;
  } catch (error) {
    // Returns error in case of exception
    return new Error(errorsProvider.updateMessage('Sales'));
  }
};
