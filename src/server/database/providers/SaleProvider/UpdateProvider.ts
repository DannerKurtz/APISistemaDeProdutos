import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { updateRelations } from '../../../shared/services/relationsManager/RelationUpdate';
import { IProductSaleRelations } from '../../models/ProductSaleRelationsInterface';
import { ISalesWithoutId } from '../../models/SalesInterface';

export const update = async (id: string, data: ISalesWithoutId) => {
  try {
    const { productSaleRelations, ...dataWithoutProductSaleRelations } = data;
    const updateSale = await crudService.updateInDatabase(
      id,
      dataWithoutProductSaleRelations,
      'Sales',
      errorsCrudService.updateMessage('Sales')
    );

    const relationUpdated = await updateRelations(
      'ProductSaleRelations',
      {
        saleId: updateSale.id,
      },
      productSaleRelations as IProductSaleRelations[]
    );

    data = updateSale;
    data.productSaleRelations = relationUpdated;

    return data;
  } catch (error) {
    return new Error(errorsProvider.updateMessage('Sales'));
  }
};
