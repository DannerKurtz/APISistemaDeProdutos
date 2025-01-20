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
    const { productSaleRelations, ...data } = body;

    let priceOfProducts: number = 0;
    if (productSaleRelations) {
      for (let i = 0; i < productSaleRelations.length; i++) {
        const getProductPrice = await prisma.products.findUnique({
          where: { id: productSaleRelations[i].productId },
        });
        console.log('produtos: ', getProductPrice);
        priceOfProducts +=
          (getProductPrice?.price as number) * productSaleRelations[i].quantity;
      }
      if (data.discount && !data.totalPrice) {
        console.log('entrou aqui');
        const finalPrice =
          priceOfProducts - priceOfProducts * (data.discount / 100);

        data.totalPrice = parseFloat(finalPrice.toFixed(2));
        console.log('preço total: ', data.totalPrice);
      } else if (data.totalPrice && !data.discount) {
        const finalDiscount =
          ((priceOfProducts - data.totalPrice) / priceOfProducts) * 100;
        if (finalDiscount < 0) {
          data.discount = 0;
        }
        data.discount = parseFloat(finalDiscount.toFixed(2));
      } else {
        data.totalPrice = parseFloat(priceOfProducts.toFixed(2));
        data.discount = 0;
      }
    }

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
