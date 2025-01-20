import { calculateTotalSalePrice } from '../../../shared/services/Calculations/CalculateTotalSalePrice';
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { updateRelations } from '../../../shared/services/relationsManager/RelationUpdate';
import { IProductSaleRelations } from '../../models/ProductSaleRelationsInterface';
import { ISales, ISalesWithoutId } from '../../models/SalesInterface';
import { prisma } from '../../prisma';

export const update = async (id: string, body: ISalesWithoutId) => {
  try {
    let { productSaleRelations, ...data } = body;

    if (productSaleRelations)
      data = await calculateTotalSalePrice(data, productSaleRelations);

    const listRelationsWithSaleId = (
      productSaleRelations as IProductSaleRelations[]
    ).map((relation) => ({ ...relation, saleId: id }));

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

    if (saleUpdated instanceof Error) {
      return new Error(saleUpdated.message);
    }

    saleUpdated.productSaleRelations = productSaleRelationsUpdated;

    return saleUpdated;
  } catch (error) {
    console.error('Error in update function:', error);
    return new Error(errorsProvider.updateMessage('Sales'));
  }
};
