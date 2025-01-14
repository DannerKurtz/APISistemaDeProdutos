import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { updateRelations } from '../../../shared/services/relationsManager/RelationUpdate';
import { IProductSaleRelations } from '../../models/ProductSaleRelationsInterface';
import { ISales, ISalesWithoutId } from '../../models/SalesInterface';

export const update = async (id: string, body: ISalesWithoutId) => {
  try {
    console.log('Start update function');
    console.log('Input ID:', id);
    console.log('Input Body:', body);

    const { productSaleRelations, ...data } = body;

    console.log('Extracted productSaleRelations:', productSaleRelations);
    console.log('Extracted data for update:', data);

    const saleUpdated: ISales | Error = await crudService.updateInDatabase(
      id,
      data,
      'Sales',
      errorsCrudService.updateMessage('Sales')
    );

    if (saleUpdated instanceof Error) {
      console.error('Error updating Sales:', saleUpdated);
      return new Error(saleUpdated.message);
    }

    console.log('Sale updated successfully:', saleUpdated);

    const listRelationsWithSaleId = (
      productSaleRelations as IProductSaleRelations[]
    ).map((relation) => ({ ...relation, saleId: id }));

    console.log('Mapped listRelationsWithSaleId:', listRelationsWithSaleId);

    const productSaleRelationsUpdated: IProductSaleRelations[] =
      await updateRelations(
        'ProductSaleRelations',
        { saleId: id },
        listRelationsWithSaleId
      );

    console.log('Updated productSaleRelations:', productSaleRelationsUpdated);

    saleUpdated.productSaleRelations = productSaleRelationsUpdated;

    console.log('Final updated sale:', saleUpdated);

    return saleUpdated;
  } catch (error) {
    console.error('Error in update function:', error);
    return new Error(errorsProvider.updateMessage('Sales'));
  }
};
