// Necessary imports
import { calculateTotalSalePrice } from '../../../shared/services/Calculations/CalculateTotalSalePrice';
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationCreator } from '../../../shared/services/prismaHelpers/relationsManager/RelationCreator';
import { ISalesWithoutId, ISales } from '../../models/SalesInterface';
import { generateSaleNumber } from '../../../shared/services/generateSaleNumber';
import { searchSales } from '../../../shared/services/prismaHelpers/searchSales';

// Export of the function responsible for creating the sale
export const create = async (
  data: ISalesWithoutId
): Promise<ISales | Error> => {
  try {
    // Destructuring the data separating userId, customerId, and productSaleRelations
    const { userId, customerId } = data;
    let { productSaleRelations, ...newData } = data;
    let productPrice: number[] = [];
    const generateNumber = await generateSaleNumber(newData.status);

    if (generateNumber instanceof Error) return generateNumber;

    newData.saleNumber = generateNumber.toString();

    // Checks if userId and customerId exist, calling crudService to look for these details in the database
    const validateUserIdExists = await crudService.getInDatabase(
      { id: userId, name: undefined },
      'Users',
      errorsCrudService.getMessage('Users')
    );
    const validateClientIdExists = await crudService.getInDatabase(
      { id: customerId, name: undefined },
      'Customers',
      errorsCrudService.getMessage('Customers')
    );

    // Checks if the user or the customer exists and returns an error if not
    if (validateUserIdExists === null) return new Error('User not exists');
    if (validateClientIdExists === null)
      return new Error('Customer not exists');

    // If productSaleRelations exists, it calls the function responsible for calculating the total sale price.
    if (productSaleRelations) {
      ({ data: newData, productPrice } = await calculateTotalSalePrice(
        newData,
        productSaleRelations
      ));
    }

    // Calls the crudService to create the sale in the database
    const newSale: ISales | Error = await crudService.createInDatabase(
      newData,
      'Sales',
      errorsCrudService.createMessage('Sales')
    );

    // Checks if the new sale resulted in an error and returns the error message
    if (newSale instanceof Error) return new Error(newSale.message);

    // If relations exist, it calls the relationCreator function in a loop to ensure all relations are created
    if (productSaleRelations) {
      for (let i = 0; i < productSaleRelations.length; i++) {
        const createSaleProductRelations = await relationCreator(
          productSaleRelations[i],
          {
            saleId: newSale.id as string,
            productId: productSaleRelations[i].productId,
            quantity: productSaleRelations[i].quantity,
            color: productSaleRelations[i].color,
            customEngraving: productSaleRelations[i].customEngraving,
            productNote: productSaleRelations[i].productNote,
            productPrice: productPrice[i],
          },
          'ProductSaleRelations',
          'Products'
        );

        if (createSaleProductRelations instanceof Error)
          return new Error(createSaleProductRelations.message);
      }
    }

    // Returns the new sale or error
    const getNewSale = await searchSales({ id: newSale.id });
    if (getNewSale instanceof Error)
      return new Error(errorsCrudService.getMessage('GetNewSale'));

    return getNewSale as ISales;
  } catch (error) {
    // Returns error if an exception occurs
    return new Error(errorsProvider.createMessage('Sales'));
  }
};
